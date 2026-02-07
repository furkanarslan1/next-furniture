import type { Metadata } from "next";
import { getProductDetail } from "@/app/(actions)/product/getProductDetail";
import ProductAttirubutes from "@/components/product/ProductAttributes";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInformations from "@/components/product/ProductInformations";
import SimilarProducts from "@/components/product/SimilarProducts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatSlug } from "@/utils/string";
import { notFound } from "next/navigation";

interface ProductDetailProps {
  params: Promise<{
    slug: string;
    typeSlug: string;
    productSlug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductDetailProps): Promise<Metadata> {
  const { slug, typeSlug, productSlug } = await params;
  const product = await getProductDetail(productSlug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const categoryName = formatSlug(slug);
  const description =
    product.description?.slice(0, 160) ||
    `${product.title} - Quality ${categoryName.toLowerCase()} furniture at Next Furniture.`;

  return {
    title: product.title,
    description,
    alternates: {
      canonical: `/categories/${slug}/${typeSlug}/${productSlug}`,
    },
    openGraph: {
      title: product.title,
      description,
      type: "website",
      images:
        product.images?.map((img) => ({
          url: img.url,
          width: 800,
          height: 600,
          alt: product.title,
        })) || [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description,
      images: product.images?.[0]?.url ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const { slug, typeSlug, productSlug } = await params;
  const product = await getProductDetail(productSlug);
  if (!product) {
    notFound();
  }
  return (
    <div className="max-w-7xl mx-auto overflow-hidden space-y-4 p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/categories/${slug}`}>
              {formatSlug(slug)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <BreadcrumbLink href={`/categories/${slug}/${typeSlug}`}>
                {formatSlug(typeSlug)}
              </BreadcrumbLink>
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{formatSlug(productSlug)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* PRODUCT IMAGES */}
        <div className="w-full md:w-3/5">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* PRODUCT DETAIL */}

        <div className="w-full md:w-1/2 md:sticky md:top-4">
          <ProductInformations product={product} />
        </div>
      </div>
      <div className="space-y-6">
        {/*PRODUCTS ATTIRBUTES*/}
        <ProductAttirubutes attributes={product.attributes} />
        {/* SIMILAR PRODUCTS */}
        <SimilarProducts category={slug} />
      </div>
    </div>
  );
}
