import { getProductDetail } from "@/app/(actions)/product/getProductDetail";
import ProductGallery from "@/components/product/ProductGallery";
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
    <div className="max-w-7xl mx-auto">
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
            <BreadcrumbPage>{formatSlug(typeSlug)}</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{formatSlug(productSlug)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        {/* PRODUCT IMAGES */}
        <div>
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* PRODUCT DETAIL */}
        <div></div>
      </div>
      <div>{/* SIMILAR PRODUCTS */}</div>
    </div>
  );
}
