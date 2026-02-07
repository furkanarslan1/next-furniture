"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Grafiğe gelecek verinin tipi
// Type of data to be included in the graph
export interface CategoryData {
  category: string;
  count: number;
  fill: string;
}

interface CategoryChartProps {
  data: CategoryData[];
}

const chartConfig = {
  "living-room": { label: "Living Room", color: "#f97316" },
  bedroom: { label: "Bedroom", color: "#3b82f6" },
  "dining-room": { label: "Dining Room", color: "#22c55e" },
  "home-office": { label: "Home Office", color: "#8b5cf6" },
  "kids-room": { label: "Kids Room", color: "#ec4899" },
  outdoor: { label: "Outdoor", color: "#14b8a6" },
  "storage-organization": { label: "Storage", color: "#f59e0b" },
};

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <Card className="flex flex-col border-none shadow-none lg:border lg:shadow-sm">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category Distribution</CardTitle>
        <CardDescription>
          Analysis of products by furniture category
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          id="admin-category-chart"
          config={chartConfig}
          className="mx-auto aspect-square max-h-75"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="category"
              innerRadius={60}
              strokeWidth={8}
              //   // Üstüne gelmeden isimleri göstermek için label özelliği:
              //   // Label attribute to show names without hovering over them:
              //   label={({ payload }) => `${payload.category}: ${payload.count}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
