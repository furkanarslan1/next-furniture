import { getCategoryStatsAction } from "@/app/(actions)/admin/getCategoryStats";
import React from "react";
import { CategoryChart } from "./_components/CategoryChart";

export default async function AdminPage() {
  const categoryData = await getCategoryStatsAction();
  return (
    <div>
      <CategoryChart data={categoryData} />
    </div>
  );
}
