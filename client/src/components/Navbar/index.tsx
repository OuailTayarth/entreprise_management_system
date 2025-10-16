import React from "react";
import { Menu, Search, Settings, Sun, Moon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import Link from "next/link";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/app/state";
import { signOut } from "aws-amplify/auth";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error sign out: ", error);
    }
  };
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* CHANGED: Removed search bar, kept menu button */}
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-8 w-8 dark:text-white" />
          </button>
        )}
        {/* Search bar removed */}
      </div>

      {/* Icons - unchanged */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={`rounded p-2 ${isDarkMode ? "dark:hover:bg-gray-700" : "hover:bg-gray-100"}`}
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer text-yellow-300" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer text-gray-700" />
          )}
        </button>
        <Link
          href="/"
          className="h-min w-min rounded p-2 dark:hover:bg-gray-700"
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
};

export default Navbar;
