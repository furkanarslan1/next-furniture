import { getProductDetail } from "@/app/(actions)/product/getProductDetail";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInformations from "@/components/product/ProductInformations";
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

interface ProductDetaiProps {
  params: Promise<{
    slug: string;
    typeSlug: string;
    productSlug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetaiProps) {
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
      <div>{/* SIMILAR PRODUCTS */}</div>
    </div>
  );
}
