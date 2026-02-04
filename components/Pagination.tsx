import React from "react";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  totalCount,
  totalPages,
  baseUrl,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => `${baseUrl}?page=${page}`;

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    // Aktif sayfanın etrafı
    // Around the active page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };
  const pageNumbers = getPageNumbers();
  return (
    <PaginationRoot className="mt-8">
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          {currentPage > 1 ? (
            <PaginationPrevious href={getPageUrl(currentPage - 1)} />
          ) : (
            <PaginationPrevious className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={getPageUrl(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {/* Next */}
        <PaginationItem>
          {currentPage < totalPages ? (
            <PaginationNext href={getPageUrl(currentPage + 1)} />
          ) : (
            <PaginationNext className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
