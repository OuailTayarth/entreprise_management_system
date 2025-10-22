"use client";

import Header from "@/components/Header";
import AiGrid from "@/components/AiGrid";
import { StatsCards } from "@/components/StatsCards";
import { TopEmployees } from "@/components/TopEmployees";
import { PerformanceTrendChartArea } from "@/components/charts/PerformanceTrendChartArea";
import { useCognitoProfile } from "@/hooks/useCognitoProfile";

const Dashboard = () => {
  const profile = useCognitoProfile();
  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="pt-5">
        <Header name={profile?.name ? `Welcome ${profile.name}` : "Welcome"} />
      </div>

      <StatsCards />

      <section className="mb-14">
        <div className="grid grid-cols-1 gap-y-4 sm:gap-x-6 sm:gap-y-6 xl:grid-cols-3 xl:gap-x-8">
          <div className="xl:col-span-2">
            <div className="mt-3 grid grid-cols-1 gap-6">
              <div>
                <h2 className="mb-0 pb-2 text-xl font-medium dark:text-white">
                  Our Upcoming AI Products
                </h2>
                <AiGrid />
              </div>
              <div>
                <PerformanceTrendChartArea />
              </div>
            </div>
          </div>

          <div className="mt-1 xl:col-span-1 xl:mt-0">
            <TopEmployees />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
