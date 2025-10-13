"use client";

import React from "react";
import { TeamResp } from "@shared/validation";

const TeamSearchCard = ({ team }: { team: TeamResp }) => {
  return (
    <div className="mb-4 rounded-xl bg-white shadow-lg dark:bg-dark-secondary">
      <div className="p-5 md:p-7">
        <h3 className="mb-2 text-[16px] font-medium dark:text-white">
          {team.name}
        </h3>

        <div className="mb-4 space-y-3">
          <div className="text-sm font-[400] text-gray-800 dark:text-gray-200">
            Department #{team.departmentId}
          </div>

          <div className="flex space-x-2">
            <span className="rounded bg-blue-100 px-2 py-1 text-xs">
              Collaboration: {team.collaborationScore}
            </span>
            <span className="rounded bg-green-100 px-2 py-1 text-xs">
              Productivity: {team.productivityScore}
            </span>
            <span className="rounded bg-purple-100 px-2 py-1 text-xs">
              Quality: {team.qualityScore}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Team #{team.id}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSearchCard;
