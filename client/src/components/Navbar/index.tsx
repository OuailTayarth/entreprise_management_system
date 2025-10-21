import React from "react";
import { Menu, Search, Settings, Sun, Moon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/app/state";
import { signOut } from "aws-amplify/auth";
import ProfileDropdown from "@/components/kokonutui/profile-dropdown";
import { useCognitoProfile } from "@/hooks/useCognitoProfile";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const profile = useCognitoProfile();

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
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-8 w-8 dark:text-white" />
          </button>
        )}
      </div>

      <div className="flex items-center">
        {profile && (
          <ProfileDropdown
            onSignOut={handleSignOut}
            avatar={profile.avatar}
            name={profile.name}
            email={profile.email}
            className="ml-2"
          />
        )}
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={`ml-3 rounded p-2 ${isDarkMode ? "dark:hover:bg-gray-700" : "hover:bg-gray-100"}`}
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer text-yellow-300" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
