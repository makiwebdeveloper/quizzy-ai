import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import UserAccountNav from "./UserAccountNav";
import { getCurrentUser } from "@/services/users.service";
import { ToggleThemeButton } from "./ToggleThemeButton";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="fixed inset-x-0 bg-white dark:bg-zinc-950 top-0 z-[10] py-2 h-fit border-b border-zinc-200 dark:border-zinc-700">
      <div className="flex items-center justify-between container">
        <Link href="/" className="text-3xl font-bold">
          Quizzy AI
        </Link>
        {user ? (
          <div className="flex items-center gap-5">
            <ToggleThemeButton />
            <UserAccountNav user={user} />
          </div>
        ) : (
          <Link href="/auth" className={buttonVariants()}>
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
