"use client";
import React from "react";
import Header from "@/components/Header";
import { HiringTrendsChart } from "@/components/charts/HiringTrendsChart";
import { ChartPieInteractive } from "@/components/charts/ChartPieInteractive";
import { ChartRadialSimple } from "@/components/charts/ChartRadialSimple";
import { ChartRadarGridCircle } from "@/components/charts/ChartRadarGridCircle";

const Reports = () => {
  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="Reports" isSmallText />
      </div>

      <HiringTrendsChart />

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ChartPieInteractive />
        <ChartRadarGridCircle />
        <ChartRadialSimple />
      </div>
    </div>
  );
};

export default Reports;
