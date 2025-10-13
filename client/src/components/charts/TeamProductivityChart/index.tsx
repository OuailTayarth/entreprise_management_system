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
import {
  useGetTeamProductivityTrendsQuery,
  useGetAvgPerformanceByMonthQuery,
} from "@/app/state/api";

const chartConfig = {
  productivity: {
    label: "Team Productivity",
  },
  fullStack: {
    label: "Full-Stack Dev",
    color: "var(--chart-1)",
  },
  talent: {
    label: "Talent Dev",
    color: "var(--chart-2)",
  },
  growth: {
    label: "Growth & Marketing",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function TeamProductivityChart() {
  const {
    data: chartData,
    isLoading,
    isError,
  } = useGetTeamProductivityTrendsQuery();
  const { data: productivityData } = useGetAvgPerformanceByMonthQuery();
  const [timeRange, setTimeRange] = React.useState("30d");
  console.log("productivityData", productivityData);
  console.log("chartData", chartData);

  if (isLoading) {
    return (
      <Card className="pt-0">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle>Team Productivity</CardTitle>
            <CardDescription>Loading team data...</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex h-[250px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-primary" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !chartData) {
    return (
      <Card className="pt-0">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle>Team Productivity</CardTitle>
            <CardDescription>Error loading data</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex h-[250px] items-center justify-center">
          <div className="text-center text-red-500">
            Failed to load team productivity data
          </div>
        </CardContent>
      </Card>
    );
  }

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 30;
    if (timeRange === "14d") {
      daysToSubtract = 14;
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
          <CardTitle>Team Productivity Trends</CardTitle>
          <CardDescription>
            Productivity scores across teams (0-100 scale, last 30 days)
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 30 days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="14d" className="rounded-lg">
              Last 14 days
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
              <linearGradient id="fillFullStack" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-fullStack)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-fullStack)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTalent" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-talent)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-talent)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillGrowth" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-growth)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-growth)"
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
              dataKey="fullStack"
              type="natural"
              fill="url(#fillFullStack)"
              stroke="var(--color-fullStack)"
              stackId="a"
            />
            <Area
              dataKey="talent"
              type="natural"
              fill="url(#fillTalent)"
              stroke="var(--color-talent)"
              stackId="a"
            />
            <Area
              dataKey="growth"
              type="natural"
              fill="url(#fillGrowth)"
              stroke="var(--color-growth)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
