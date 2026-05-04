"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BookOpenIcon,
  Settings2Icon,
  SearchIcon,
  HistoryIcon,
  UserIcon,
  LayoutDashboardIcon,
  LibraryIcon,
  PlusSquareIcon,
  BarChartIcon,
  ShieldCheckIcon,
  UsersIcon,
  ListOrderedIcon,
  MonitorIcon,
  LogOut,
} from "lucide-react";
import { User } from "@/lib/types";
import { logoutAction } from "@/server-action/auth.service";

const navStudent = [
  {
    title: "Browse Library",
    url: "/dashboard",
    icon: <SearchIcon />,
  },
  {
    title: "My Borrows",
    url: "/dashboard/my-rents",
    icon: <BookOpenIcon />,
  },
  {
    title: "Purchase History",
    url: "/dashboard/my-purchases",
    icon: <HistoryIcon />,
  },
  {
    title: "My Profile",
    url: "/dashboard/profile",
    icon: <UserIcon />,
  },
];

const navSeller = [
  {
    title: "Dashboard Overview",
    url: "/dashboard/seller",
    icon: <LayoutDashboardIcon />,
  },
  {
    title: "My Books",
    url: "/dashboard/seller/books",
    icon: <LibraryIcon />,
  },
  {
    title: "Add New Book",
    url: "/dashboard/seller/add-book",
    icon: <PlusSquareIcon />,
  },
  {
    title: "Sales Report",
    url: "/dashboard/seller/sales",
    icon: <BarChartIcon />,
  },
];

const navAdmin = [
  {
    title: "Admin Home",
    url: "/dashboard/admin",
    icon: <ShieldCheckIcon />,
  },
  {
    title: "Manage Users",
    url: "/dashboard/admin/users",
    icon: <UsersIcon />,
  },
  {
    title: "All Transactions",
    url: "/dashboard/admin/transactions",
    icon: <ListOrderedIcon />,
  },
  {
    title: "System Sessions",
    url: "/dashboard/admin/sessions",
    icon: <MonitorIcon />, // এখানে আপনার তৈরি সেশন ডাটাগুলো দেখাবেন
  },
  {
    title: "Global Settings",
    url: "/dashboard/admin/settings",
    icon: <Settings2Icon />,
  },
];
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: User;
}
export function AppSidebar({ user, ...props }: AppSidebarProps) {
 

  let menuItems = navStudent;

  if (user?.role === "ADMIN") {
    menuItems = navAdmin;
  } else if (user?.role === "SELLER") {
    menuItems = navSeller;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-4 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-extrabold text-base shadow-sm">
            {user?.name?.substring(0, 2).toUpperCase() || "LB"}
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2 overflow-hidden">
              <h2 className="truncate font-semibold text-sm tracking-tight text-sidebar-foreground">
                {user?.name}
              </h2>
              <span className="flex-shrink-0 rounded-md bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-400">
                {user?.role}
              </span>
            </div>

            <p className="truncate text-[11px] text-sidebar-foreground/60 leading-tight mt-0.5">
              {user?.email}
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className="p-4 border-t border-sidebar-border/50">
        <div className="flex flex-col gap-2">
          {/* লগআউট বাটন */}
          <button
            onClick={async () => {
              await logoutAction(); // তোমার লগআউট ফাংশনটি কল করো
            }}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all duration-200 group">
            <div className="flex items-center justify-center size-8 rounded-full bg-red-100 dark:bg-red-900/20 group-hover:bg-red-200 dark:group-hover:bg-red-900/40 transition-colors">
              <LogOut className="size-4" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span>Sign Out</span>
              <span className="text-[10px] text-red-400 font-normal">
                End your session
              </span>
            </div>
          </button>
        </div>
      </SidebarFooter>{" "}
    </Sidebar>
  );
}
