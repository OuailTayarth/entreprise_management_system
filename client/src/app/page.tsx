"use client";

import Header from "@/components/Header";
import AiGrid from "@/components/AiGrid";
import { StatsCards } from "@/components/StatsCards";

const Dashboard = () => {
  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="Welcome" />
      </div>

      <StatsCards />
      <AiGrid />
    </div>
  );
};

export default Dashboard;
