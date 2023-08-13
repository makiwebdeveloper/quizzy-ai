import { buttonVariants } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function MyQuizzesHeader() {
  return (
    <div className="flex justify-between items-center gap-3">
      <h1 className="title">My Quizzes</h1>
      <Link
        href="/dashboard"
        className={buttonVariants({ className: "flex gap-1" })}
      >
        <span className="hidden md:block">Go to</span> Dashboard{" "}
        <div className="relative w-5 h-5">
          <Image src="/mage.png" alt="Emoji with glasses" fill />
        </div>
      </Link>
    </div>
  );
}
