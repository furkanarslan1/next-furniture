import React, { useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { FurnitureFormInput } from "../FurnitureAddForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, CATEGORIES_ARRAY } from "@/lib/constants/categories";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface StepBasicProps {
  form: UseFormReturn<FurnitureFormInput>;
}

export default function StepBasicInfo({ form }: StepBasicProps) {
  const category = form.watch("categorySlug");
  const selectedCategory = CATEGORIES_ARRAY.find(
    (cat) => cat.slug === category,
  );
  const types = selectedCategory?.types ?? [];
  const prevCategoryRef = useRef<string | null>(null);

  useEffect(() => {
    const prevCategory = prevCategoryRef.current;
    if (prevCategory === null) {
      prevCategoryRef.current = category;
      return;
    }

    if (prevCategory !== category) {
      form.setValue("typeSlug", "");
      form.clearErrors("typeSlug");
    }

    prevCategoryRef.current = category;
  }, [category, form]);
  return (
    <div className="space-y-6 ">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Furniture Title</FormLabel>
            <FormControl>
              <Input
                id="furniture-title"
                placeholder="e.g luxury kitchen big table"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                id="furniture-description"
                placeholder="Please enter description about product"
                className="min-h-37.5 resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="categorySlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORIES_ARRAY?.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.slug}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="typeSlug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={!category || types.length === 0}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      !category
                        ? "Select category first"
                        : types.length === 0
                          ? "No types for this category"
                          : "Select type"
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type.slug} value={type.slug}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Please enter a amount"
                {...field}
                className="w-fit"
                value={field.value as number | string}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="discountRate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discount Rate %</FormLabel>
            <FormControl>
              <Input
                placeholder="Please enter a rate"
                type="number"
                className="w-fit"
                {...field}
                value={field.value as number | string}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="isActive"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 w-fit">
            <div className="space-y-0.5">
              <FormLabel>Active</FormLabel>
              <p className="text-sm text-muted-foreground">
                Product will be visible on the website
              </p>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                className=""
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
