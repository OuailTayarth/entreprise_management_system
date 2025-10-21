"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import { useGetDepartmentsQuery, useGetDocumentsQuery } from "@/app/state/api";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { signOut } from "aws-amplify/auth";
import { useCognitoProfile } from "@/hooks/useCognitoProfile";

import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Building,
  FileText,
  Briefcase,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  CircleUserRound,
  LogIn,
  LogOut,
  Cog,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { data: departments } = useGetDepartmentsQuery();
  const [showDepartments, setShowDepartments] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(true);
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const profile = useCognitoProfile();

  const { user } = useAuthenticator((context) => [context.user]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error sign out: ", error);
    }
  };

  const sidebarClassNames = `fixed flex flex-col h-screen justify-between shadow-xl
  transition-all duration-300 z-40 dark:bg-black overflow-hidden bg-white
  ${isSidebarCollapsed ? "w-0 -translate-x-full" : "w-64"}`;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-full w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            HR Admin
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image
            src={profile?.avatar ?? "/placeholder.jpg"}
            alt="Logo"
            width={50}
            height={50}
            className="rounded object-cover"
          />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              {profile?.name}
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>

        {/* NAVBAR LINKS */}
        <nav className="z-10 w-full">
          <SidebarLink icon={LayoutDashboard} label="Dashboard" href="/" />
          <SidebarLink
            icon={ChartNoAxesCombined}
            label="Reports"
            href="/reports"
          />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={User} label="Employees" href="/employees" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>
        {/* DEPARTMENT SECTION */}
        <button
          onClick={() => setShowDepartments((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span>Departments</span>
          {showDepartments ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {/* Departments List */}
        {showDepartments &&
          departments?.map((department) => (
            <SidebarLink
              key={department.id}
              icon={Building}
              label={department.name}
              href={`/departments/${department.id}`}
            />
          ))}

        <button
          onClick={() => setShowUserMenu((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span>Account</span>
          {showUserMenu ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {/* Accounts */}
        {showUserMenu && (
          <>
            <SidebarLink icon={Settings} label="Settings" href="/settings" />
            {user ? (
              <button onClick={handleSignOut} className="w-full text-left">
                <div className="relative flex cursor-pointer items-center justify-start gap-3 px-8 py-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
                  <LogOut className="h-6 w-6 text-gray-800 dark:text-gray-100" />
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    SignOut
                  </span>
                </div>
              </button>
            ) : (
              <Link
                href={{ pathname: "/login", query: { next: pathname || "/" } }}
                className="w-full text-left"
              >
                <div className="relative flex cursor-pointer items-center justify-start gap-3 px-8 py-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
                  <LogIn className="h-6 w-6 text-gray-800 dark:text-gray-100" />
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    Sign In
                  </span>
                </div>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-[5px] bg-blue-200" />
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
