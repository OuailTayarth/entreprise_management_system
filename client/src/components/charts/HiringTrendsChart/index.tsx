"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "Hiring trends chart";

const chartData = [
  { date: "2024-04-01", hires: 5 },
  { date: "2024-04-02", hires: 7 },
  { date: "2024-04-03", hires: 3 },
  { date: "2024-04-04", hires: 10 },
  { date: "2024-04-05", hires: 8 },
  { date: "2024-04-06", hires: 12 },
  { date: "2024-04-07", hires: 6 },
  { date: "2024-04-08", hires: 15 },
  { date: "2024-04-09", hires: 4 },
  { date: "2024-04-10", hires: 9 },
  { date: "2024-04-11", hires: 11 },
  { date: "2024-04-12", hires: 7 },
  { date: "2024-04-13", hires: 14 },
  { date: "2024-04-14", hires: 5 },
  { date: "2024-04-15", hires: 6 },
  { date: "2024-04-16", hires: 8 },
  { date: "2024-04-17", hires: 16 },
  { date: "2024-04-18", hires: 10 },
  { date: "2024-04-19", hires: 7 },
  { date: "2024-04-20", hires: 3 },
  { date: "2024-04-21", hires: 9 },
  { date: "2024-04-22", hires: 12 },
  { date: "2024-04-23", hires: 5 },
  { date: "2024-04-24", hires: 11 },
  { date: "2024-04-25", hires: 8 },
  { date: "2024-04-26", hires: 4 },
  { date: "2024-04-27", hires: 13 },
  { date: "2024-04-28", hires: 6 },
  { date: "2024-04-29", hires: 10 },
  { date: "2024-04-30", hires: 9 },
  { date: "2024-05-01", hires: 7 },
  { date: "2024-05-02", hires: 14 },
  { date: "2024-05-03", hires: 5 },
  { date: "2024-05-04", hires: 12 },
  { date: "2024-05-05", hires: 10 },
  { date: "2024-05-06", hires: 15 },
  { date: "2024-05-07", hires: 8 },
  { date: "2024-05-08", hires: 6 },
  { date: "2024-05-09", hires: 9 },
  { date: "2024-05-10", hires: 11 },
  { date: "2024-05-11", hires: 7 },
  { date: "2024-05-12", hires: 13 },
  { date: "2024-05-13", hires: 4 },
  { date: "2024-05-14", hires: 10 },
  { date: "2024-05-15", hires: 8 },
  { date: "2024-05-16", hires: 12 },
  { date: "2024-05-17", hires: 14 },
  { date: "2024-05-18", hires: 9 },
  { date: "2024-05-19", hires: 7 },
  { date: "2024-05-20", hires: 5 },
  { date: "2024-05-21", hires: 8 },
  { date: "2024-05-22", hires: 6 },
  { date: "2024-05-23", hires: 11 },
  { date: "2024-05-24", hires: 10 },
  { date: "2024-05-25", hires: 7 },
  { date: "2024-05-26", hires: 9 },
  { date: "2024-05-27", hires: 13 },
  { date: "2024-05-28", hires: 6 },
  { date: "2024-05-29", hires: 5 },
  { date: "2024-05-30", hires: 10 },
  { date: "2024-05-31", hires: 8 },
  { date: "2024-06-01", hires: 7 },
  { date: "2024-06-02", hires: 12 },
  { date: "2024-06-03", hires: 4 },
  { date: "2024-06-04", hires: 11 },
  { date: "2024-06-05", hires: 6 },
  { date: "2024-06-06", hires: 9 },
  { date: "2024-06-07", hires: 10 },
  { date: "2024-06-08", hires: 8 },
  { date: "2024-06-09", hires: 14 },
  { date: "2024-06-10", hires: 7 },
  { date: "2024-06-11", hires: 5 },
  { date: "2024-06-12", hires: 13 },
  { date: "2024-06-13", hires: 6 },
  { date: "2024-06-14", hires: 11 },
  { date: "2024-06-15", hires: 9 },
  { date: "2024-06-16", hires: 8 },
  { date: "2024-06-17", hires: 15 },
  { date: "2024-06-18", hires: 4 },
  { date: "2024-06-19", hires: 7 },
  { date: "2024-06-20", hires: 10 },
  { date: "2024-06-21", hires: 6 },
  { date: "2024-06-22", hires: 9 },
  { date: "2024-06-23", hires: 12 },
  { date: "2024-06-24", hires: 5 },
  { date: "2024-06-25", hires: 8 },
  { date: "2024-06-26", hires: 11 },
  { date: "2024-06-27", hires: 10 },
  { date: "2024-06-28", hires: 7 },
  { date: "2024-06-29", hires: 6 },
  { date: "2024-06-30", hires: 9 },
];

const chartConfig = {
  hires: {
    label: "New Hires",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function HiringTrendsChart() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Hiring Trends</CardTitle>
          <CardDescription>
            Showing new hires for the last 3 months{" "}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillHires" x1="0" y1="0" x2="0" y2="1">
                {" "}
                <stop
                  offset="5%"
                  stopColor="var(--color-hires)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-hires)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="hires"
              type="natural"
              fill="url(#fillHires)"
              stroke="var(--color-hires)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
