"use client";

import Header from "@/components/Header";
import EmployeesBoardView from "@/app/departments/EmployeesBoardView";
import TeamCard from "@/components/TeamCard";
import DepartmentCard from "@/components/DepartmentCard";
import { useSearchQuery } from "@/app/state/api";
import { useDebounce } from "@/hooks/useDebounce";
import React, { useState } from "react";

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
          placeholder="Search employees, teams, or departments..."
          className="w-full max-w-2xl rounded border p-3 shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading && <p className="py-8 text-center">Searching...</p>}
      {isError && (
        <p className="py-8 text-center text-red-500">Error searching</p>
      )}

      {!isLoading && !isError && results && (
        <div className="space-y-8">
          {results.employees?.length > 0 && (
            <section>
              <h2 className="mb-3 text-xl font-semibold">Employees</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <EmployeesBoardView
                  departmentId="search"
                  employees={results.employees}
                  isLoading={false}
                  setIsModalNewEmployeeOpen={() => {}}
                />
              </div>
            </section>
          )}

          {/* Teams Section */}
          {/* {results.teams?.length > 0 && (
            <section>
              <h2 className="mb-3 text-xl font-semibold">Teams</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {results.teams.map((team) => (
                  <TeamCard key={team.id} team={team} />
                ))}
              </div>
            </section>
          )} */}

          {/* Departments Section */}
          {/* {results.departments?.length > 0 && (
            <section>
              <h2 className="mb-3 text-xl font-semibold">Departments</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {results.departments.map((department) => (
                  <DepartmentCard key={department.id} department={department} />
                ))}
              </div>
            </section>
          )} */}

          {/* No results */}
          {!results.employees?.length &&
            !results.teams?.length &&
            !results.departments?.length &&
            debouncedSearchTerm && (
              <p className="py-8 text-center text-muted-foreground">
                No results found for "{searchTerm}"
              </p>
            )}
        </div>
      )}
    </div>
  );
};

export default Search;
