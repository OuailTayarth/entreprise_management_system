"use client";

import React, { useRef } from "react";
import { Users, Building, TrendingUp, CheckCircle } from "lucide-react";
import { motion, useInView } from "motion/react";
import {
  useGetEmployeesQuery,
  useGetTeamsQuery,
  useGetAvgPerformanceByMonthQuery,
} from "@/app/state/api";

export function StatsCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { data: employees } = useGetEmployeesQuery();
  const { data: teams } = useGetTeamsQuery();
  const { data: performanceData } = useGetAvgPerformanceByMonthQuery();

  const totalEmployees = employees?.length || 0;
  const activeTeams = teams?.length || 0;
  const activeEmployees = employees?.filter((e) => !e.endDate).length || 0;
  const currentMonth = performanceData?.[performanceData.length - 1];
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const stats = [
    {
      value: totalEmployees,
      label: "Total Employees",
      description: `Last updated: ${lastUpdated}`,
      icon: "Users",
      trend: { value: "+12%", direction: "up" },
    },
    {
      value: activeTeams,
      label: "Active Teams",
      description: `Last updated: ${lastUpdated}`,
      icon: "Building",
      trend: { value: "+8%", direction: "up" },
    },
    {
      value: currentMonth ? `${currentMonth.performance}%` : "N/A",
      label: "Avg Performance",
      description: `Last updated: ${lastUpdated}`,
      icon: "TrendingUp",
      trend: { value: "+2%", direction: "up" },
    },
    {
      value: activeEmployees.toLocaleString(),
      label: "Active Employees",
      description: `Last updated: ${lastUpdated}`,
      icon: "CheckCircle",
      trend: { value: "+5%", direction: "up" },
    },
  ];

  return (
    <section className="py-5">
      <div className="max-w-8xl mx-auto px-6">
        <div
          ref={ref}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative cursor-pointer overflow-hidden rounded-xl border border-neutral-200/60 bg-gradient-to-b from-neutral-50/60 via-neutral-50/40 to-neutral-50/30 p-6 shadow transition-all hover:shadow-lg dark:border-neutral-800/60 dark:from-neutral-900/60 dark:via-neutral-900/40 dark:to-neutral-900/30"
            >
              <motion.div className="mb-2 text-3xl dark:text-gray-200">
                {stat.icon === "Users" ? (
                  <Users className="h-5 w-5" />
                ) : stat.icon === "Building" ? (
                  <Building className="h-5 w-5" />
                ) : stat.icon === "TrendingUp" ? (
                  <TrendingUp className="h-5 w-5" />
                ) : (
                  <CheckCircle className="h-5 w-5" />
                )}
              </motion.div>

              <motion.div className="mb-1 text-2xl font-bold text-foreground lg:text-2xl">
                {stat.value}
              </motion.div>

              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-foreground">
                {stat.label}
              </h3>

              {stat.description && (
                <p className="mb-3 text-xs text-foreground/70">
                  {stat.description}
                </p>
              )}

              {stat.trend && (
                <motion.div
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    stat.trend.direction === "up"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                  }
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                >
                  <span className="mr-1">
                    {stat.trend.direction === "up" ? "↗" : "↘"}
                  </span>
                  {stat.trend.value}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
