"use client";
import { deleteProductAction } from "@/app/(actions)/product/deleteProductAction";
import { Product } from "@/types/ProductType";
import React from "react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ProductsTableProps {
  products: Product[];
  currentCategory: string;
}

export default function ProductsTable({
  products,
  currentCategory,
}: ProductsTableProps) {
  const handleDelete = async (id: string, images: { url: string }[] | null) => {
    const isConfirmed = confirm(
      "Are you sure? This will delete the product and all its images permanently.",
    );

    if (!isConfirmed) return;

    const loadingToast = toast.loading("Processing your request..");

    try {
      const imageUrls = images ? images.map((img) => img.url) : null;
      const result = await deleteProductAction(id, imageUrls);

      toast.dismiss(loadingToast);

      if (result?.success) {
        toast.success("Product deleted successfully");
      } else {
        toast.error(`Error:${result?.error}`);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Client-side delete error:", error);
      toast.error("An unexpected error occurred during deletion.");
    }
  };
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <th className="w-20 px-4 py-3 font-medium">Image</th>
            <TableHead className="font-medium">Product Details</TableHead>
            <TableHead className="font-medium">Category & Type</TableHead>
            <TableHead className="font-medium">Price</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="text-right font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                No products found in this category.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id} className="group transition-colors">
                {/* Image */}
                <TableCell className="px-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg border shadow-sm">
                    <img
                      src={product.images[0]?.url}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                </TableCell>

                {/* Title & Slug */}
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">
                      {product.title}
                    </span>
                    <span className="text-xs text-muted-foreground italic truncate max-w-37.5">
                      {product.slug}
                    </span>
                  </div>
                </TableCell>

                {/* Categories */}
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge
                      variant="secondary"
                      className="w-fit text-[10px] uppercase tracking-wider"
                    >
                      {product.category_slug}
                    </Badge>
                    <span className="text-sm text-muted-foreground ml-1">
                      {product.typeSlug}
                    </span>
                  </div>
                </TableCell>

                {/* Price & Discount */}
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-mono font-bold">
                      ${product.price}
                    </span>
                    {product.discountRate > 0 && (
                      <span className="text-[10px] font-bold text-green-600">
                        {product.discountRate}% OFF
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge variant={product.isActive ? "default" : "destructive"}>
                    {product.isActive ? "Active" : "Draft"}
                  </Badge>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-blue-500 hover:text-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(product.id, product.images)}
                      className="h-8 w-8 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
