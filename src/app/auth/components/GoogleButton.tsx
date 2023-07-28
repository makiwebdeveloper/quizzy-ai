"use client";

import { Button } from "@/components/ui/Button";
import GoogleIcon from "./GoogleIcon";
import { signIn } from "next-auth/react";

export default function GoogleButton() {
  return (
    <Button
      className="w-full"
      onClick={() => {
        signIn("google").catch((err) => {
          console.log(err);
        });
      }}
    >
      <GoogleIcon className="w-5 h-5 mr-2" /> Sign in with Google
    </Button>
  );
}
