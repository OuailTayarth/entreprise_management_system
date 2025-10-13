"use client";
import React from "react";
import Header from "@/components/Header";
import { TeamProductivityChart } from "@/components/charts/TeamProductivityChart";
import { PerformanceTrendChart } from "@/components/charts/PerformanceTrendChart";

const Reports = () => {
  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="Reports" isSmallText />
      </div>

      <TeamProductivityChart />

      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-4xl px-2">
          <PerformanceTrendChart />
        </div>
      </div>
    </div>
  );
};

export default Reports;
