"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import StoreProvider from "./redux";
import { useAppSelector } from "@/app/redux";
import { ThemeProvider, Authenticator } from "@aws-amplify/ui-react";
import { myTheme } from "./theme";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-gray-50 text-gray-900">
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50 transition-all duration-300 dark:bg-dark-bg ${
          isSidebarCollapsed ? "md:pl-0" : "md:pl-64"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const LayoutShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLogin = pathname?.startsWith("/login");
  return isLogin ? (
    <>{children}</>
  ) : (
    <DashboardLayout>{children}</DashboardLayout>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <ThemeProvider theme={myTheme}>
        <Authenticator.Provider>
          <LayoutShell>{children}</LayoutShell>
        </Authenticator.Provider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default DashboardWrapper;
