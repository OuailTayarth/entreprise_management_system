"use client";
import React from "react";
import Header from "@/components/Header";
import { HiringTrendsChart } from "@/components/charts/HiringTrendsChart";

const Reports = () => {
  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="Reports" isSmallText />
      </div>
      <HiringTrendsChart />
    </div>
  );
};

export default Reports;
