import Link from "next/link";
import { buttonVariants } from "./ui/Button";

export default function Navbar() {
  const session = false;

  return (
    <nav className="fixed inset-x-0 bg-white top-0 z-[10] py-4 h-fit border-b border-zinc-200">
      <div className="flex items-center justify-between container">
        <p className="text-3xl font-bold">Quizzy AI</p>
        {session ? (
          <div>
            <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
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
