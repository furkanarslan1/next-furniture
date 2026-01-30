import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { StepHeroProps, StepProps } from "@/types/StepPropsType";
import { SelectContent, SelectTrigger } from "@radix-ui/react-select";
import React from "react";

export default function StepHeroInfos({ form }: StepHeroProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g Big Furniture sale" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="subtitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtitle</FormLabel>
            <FormControl>
              <Input placeholder="subtitle" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="target_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL</FormLabel>
            <FormControl>
              <Input
                placeholder="https://example.com"
                inputMode="url"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="is_active"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 w-fit">
            <div className="space-y-0.5">
              <FormLabel>Active</FormLabel>
              <p className="text-sm text-muted-foreground">
                Hero will be visible on the website
              </p>
            </div>
            <FormControl>
              <Switch
                id="hero-active-swtich"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
