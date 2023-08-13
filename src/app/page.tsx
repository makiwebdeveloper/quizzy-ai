import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container">
      <div className="flex justify-between items-center gap-3">
        <h1 className="title">Top Quizzes</h1>
        <Link
          href="/dashboard"
          className={buttonVariants({ className: "flex gap-1" })}
        >
          <span className="hidden md:block">Go to</span> Dashboard{" "}
          <div className="relative w-5 h-5">
            <Image src="/nerd-face.png" alt="Emoji with glasses" fill />
          </div>
        </Link>
      </div>
    </main>
  );
}
