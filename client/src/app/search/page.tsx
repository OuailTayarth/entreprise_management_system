"use client";

import Header from "@/components/Header";
import React, { useState } from "react";
import EmployeeSearchCard from "@/components/EmployeeSearchCard";
import TeamSearchCard from "@/components/TeamSearchCard";
import { useSearchQuery } from "@/app/state/api";
import { useDebounce } from "@/hooks/useDebounce";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm);

  const {
    data: results,
    isLoading,
    isError,
  } = useSearchQuery(
    { q: debouncedSearchTerm },
    {
      skip: !debouncedSearchTerm,
    },
  );

  return (
    <div className="p-8">
      <Header name="Search" />
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search employees, or teams..."
          className="w-full max-w-2xl rounded border p-3 shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading && <p className="py-8 text-center">Searching...</p>}
      {isError && (
        <p className="py-8 text-center text-red-500">Error searching</p>
      )}

      {!isLoading && !isError && results && debouncedSearchTerm && (
        <div className="space-y-8">
          {results.employees?.length > 0 && (
            <section>
              <h2 className="mb-5 text-xl font-semibold dark:text-white">
                Employees
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {results.employees.map((employee) => (
                  <EmployeeSearchCard key={employee.id} employee={employee} />
                ))}
              </div>
            </section>
          )}

          {results.teams?.length > 0 && (
            <section>
              <h2 className="mb-3 text-xl font-semibold dark:text-white">
                Teams
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {results.teams.map((team) => (
                  <TeamSearchCard key={team.id} team={team} />
                ))}
              </div>
            </section>
          )}

          {!results.employees?.length &&
            !results.teams?.length &&
            !results.departments?.length &&
            debouncedSearchTerm && (
              <p className="py-8 text-center text-muted-foreground dark:text-white">
                No results found for &quot;{searchTerm}&quot;
              </p>
            )}
        </div>
      )}
    </div>
  );
};

export default Search;
