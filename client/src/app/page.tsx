"use client";

import Header from "@/components/Header";
import AiGrid from "@/components/AiGrid";
import { StatsCards } from "@/components/StatsCards";
import { TopEmployees } from "@/components/TopEmployees";
import { PerformanceTrendChartArea } from "@/components/charts/PerformanceTrendChartArea";

const Dashboard = () => {
  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="Welcome" />
      </div>

      <StatsCards />

      <section className="mb-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="grid grid-rows-2 gap-6">
              <div>
                <PerformanceTrendChartArea />
              </div>
              <div>
                <AiGrid />
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <TopEmployees />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
