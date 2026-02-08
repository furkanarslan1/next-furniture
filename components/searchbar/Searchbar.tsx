"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  price: number;
  slug: string;
  images: { url: string; alt?: string }[];
}

const supabase = createClient();

export default function Searchbar() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  // Cmd+K / Ctrl+K keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Search with debounce + AbortController
  React.useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      setError(null);
      return;
    }

    const abortController = new AbortController();

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("products")
        .select("id,title,price,slug,images")
        // .textSearch("fts_vector", `'${query}':*`, {
        //   config: "english",
        //   type: "plain",
        // }) it is better for big databases
        .ilike("title", `%${query}%`) // it is good for smal datebases
        .eq("is_active", true)
        .limit(6)
        .abortSignal(abortController.signal);

      if (abortController.signal.aborted) return;

      if (fetchError) {
        setError("An error occurred during the search.");
        setResults([]);
      } else {
        setResults((data as Product[]) || []);
      }
      setIsLoading(false);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [query]);

  // Reset state on dialog close
  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setQuery("");
      setResults([]);
      setError(null);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Desktop */}
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="hidden md:flex w-64 justify-between text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <Search size={16} />
          <span>Search for products...</span>
        </div>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* Mobile */}
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        size="icon"
        className="md:hidden"
      >
        <Search size={20} />
      </Button>

      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <CommandInput
          placeholder="Search for products..."
          onValueChange={(v) => setQuery(v)}
        />
        <CommandList>
          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}

          {error && (
            <div className="py-6 text-center text-sm text-destructive">
              {error}
            </div>
          )}

          {!isLoading && !error && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {results.length > 0 && (
            <CommandGroup heading="Products">
              {results.map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.title}
                  onSelect={() => {
                    handleOpenChange(false);
                    router.push(`/products/${product.slug}`);
                  }}
                  className="flex items-center gap-3 p-2 cursor-pointer"
                >
                  <div className="relative h-10 w-10 overflow-hidden rounded bg-gray-100 shrink-0">
                    <Image
                      src={product.images?.[0]?.url || "/product.webp"}
                      alt={product.images?.[0]?.alt || product.title}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-medium truncate">
                      {product.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
