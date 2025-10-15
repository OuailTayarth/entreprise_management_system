"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useGetAvgPerformanceByMonthQuery } from "@/app/state/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function PerformanceTrendChartArea() {
  const { data: chartData = [], isLoading } =
    useGetAvgPerformanceByMonthQuery();

  if (isLoading)
    return (
      <Card>
        <CardContent>Loading...</CardContent>
      </Card>
    );

  const chartConfig = {
    performance: {
      label: "Performance",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="rounded-xl border border-neutral-200/60 bg-gradient-to-b from-neutral-50/60 via-neutral-50/40 to-neutral-50/30 p-5 transition-all hover:shadow-lg dark:border-neutral-800/60 dark:from-neutral-900/60 dark:via-neutral-900/40 dark:to-neutral-900/30">
      <CardHeader>
        <CardTitle>Employee Performance Trend</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 5, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="performance"
              type="natural"
              fill="var(--color-performance)"
              fillOpacity={0.4}
              stroke="var(--color-performance)"
              strokeWidth={2}
              activeDot={{
                r: 6,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {chartData.length > 0 && (
            <>
              {chartData[chartData.length - 1].performance >
              chartData[0].performance
                ? "↑"
                : "↓"}
              {Math.abs(
                chartData[chartData.length - 1].performance -
                  chartData[0].performance,
              ).toFixed(1)}
              % this period
              <TrendingUp className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Average performance score across all employees
        </div>
      </CardFooter>
    </Card>
  );
}
