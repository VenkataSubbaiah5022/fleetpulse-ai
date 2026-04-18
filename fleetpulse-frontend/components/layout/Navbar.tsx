"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <header className="h-14 border-b flex items-center justify-between px-4 bg-background">
      {/* Search */}
      <div className="flex items-center gap-2 w-1/3">
        <Search size={18} />
        <Input placeholder="Search vehicles, drivers..." />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer" />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-8 h-8 rounded-full bg-gray-400 cursor-pointer" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
