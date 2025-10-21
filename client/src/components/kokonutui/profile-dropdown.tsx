"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProfileDropdownProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  email: string;
  avatar: string;
  onSignOut?: () => void;
  
};

export default function ProfileDropdown({
  name,
  email,
  avatar,
  onSignOut,
  className,
  ...props
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cn("relative", className)} {...props}>
      <DropdownMenu onOpenChange={setIsOpen}>
        <div className="group relative">
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-16 rounded-2xl border border-zinc-200/60 bg-white p-3 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50/80 hover:shadow-sm focus:outline-none dark:border-zinc-800/60 dark:bg-black dark:hover:border-zinc-700 dark:hover:bg-zinc-800/40"
            >
              <div className="flex-1 text-left">
                <div className="text-sm font-medium leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
                  {name}
                </div>
                <div className="text-xs leading-tight tracking-tight text-zinc-500 dark:text-zinc-400">
                  {email}
                </div>
              </div>
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-0.5">
                  <div className="h-full w-full overflow-hidden rounded-full bg-white dark:bg-zinc-900">
                    <Image
                      src={avatar}
                      alt={name}
                      width={36}
                      height={36}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="center"
            sideOffset={3}
            className="w-64 origin-top-right rounded-2xl border border-zinc-200/60 bg-white/95 p-2 shadow-xl shadow-zinc-900/5 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800/60 dark:bg-black dark:shadow-zinc-950/20"
          >
            <DropdownMenuItem asChild>
              <button
                type="button"
                className="group flex w-full cursor-pointer items-center gap-3 rounded-xl border border-transparent bg-red-500/10 p-3 transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/20 hover:shadow-sm"
                onClick={onSignOut}
              >
                <LogOut className="h-4 w-4 text-red-500 group-hover:text-red-600" />
                <span className="text-sm font-medium text-red-500 group-hover:text-red-600">
                  Sign Out
                </span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  );
}
