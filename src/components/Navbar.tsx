import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import UserAccountNav from "./UserAccountNav";
import { getCurrentUser } from "@/services/users";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="fixed inset-x-0 bg-white top-0 z-[10] py-2 h-fit border-b border-zinc-200">
      <div className="flex items-center justify-between container">
        <Link href="/" className="text-3xl font-bold">
          Quizzy AI
        </Link>
        {user ? (
          <div>
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
