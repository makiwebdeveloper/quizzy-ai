"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { LayoutGrid, LogOut, ScrollText } from "lucide-react";

export default function UserAccountNav({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="relative w-10 h-10">
          <Image
            src={user.image!}
            alt={`User: ${user.name}`}
            fill
            className="object-cover rounded-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white mt-2" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700 dark:text-zinc-500">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <LayoutGrid className="w-4 h-4 mr-2" /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/about" className="cursor-pointer">
            <ScrollText className="w-4 h-4 mr-2" /> About project
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signOut().catch(console.error);
          }}
          className="text-red-600 cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
