"use client";

import React from "react";
import { motion } from "motion/react";
import { useGetEmployeesQuery } from "@/app/state/api";
import { keyToUrl } from "@/lib/utils";
import Image from "next/image";

export function TopEmployees() {
  const { data: employees = [] } = useGetEmployeesQuery();
  const topEmployees = employees.slice(0, 10);

  return (
    <div className="h-full">
      <section className="py-3 xl:py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-5">
          <div className="h-full">
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="cursor-pointer overflow-hidden rounded-xl border border-neutral-200/50 bg-gradient-to-b from-neutral-50/80 to-neutral-50 shadow transition-all duration-300 hover:border-neutral-400/30 hover:shadow-lg hover:shadow-neutral-200/20 dark:border-neutral-800/50 dark:from-neutral-900/80 dark:to-neutral-900 dark:hover:border-neutral-600/30 dark:hover:shadow-neutral-900/20 md:col-span-1"
            >
              <div className="flex h-full flex-col p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                    Top 10 Employees of the Year
                  </h3>
                </div>
                <p className="mb-4 text-sm tracking-tight text-neutral-600 dark:text-neutral-400">
                  Our most valuable contributors across all departments
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {topEmployees.map((employee, index) => (
                    <motion.div
                      key={employee.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-200/50 bg-gradient-to-b from-neutral-100/80 to-neutral-100 p-3 transition-all duration-300 hover:border-neutral-300 dark:border-neutral-700/50 dark:from-neutral-800/80 dark:to-neutral-800 dark:hover:border-neutral-600"
                    >
                      <div className="relative flex items-center justify-center">
                        {employee.profilePictureUrl ? (
                          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white dark:border-dark-tertiary sm:h-12 sm:w-12">
                            <Image
                              src={keyToUrl(employee.profilePictureUrl)}
                              alt={employee.username || "Employee"}
                              width={40}
                              height={40}
                              quality={100}
                              className="h-full w-full object-cover"
                              priority
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white dark:border-dark-tertiary">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {employee.firstName[0]}
                              {employee.lastName[0]}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-center text-xs font-medium text-neutral-600 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                        {employee.firstName} {employee.lastName}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
