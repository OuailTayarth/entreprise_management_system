"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Threads from "@/components/Threads";
import { configureAmplify } from "@/app/amplify-client";

configureAmplify();

const formFields = {
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      required: true,
    },
    email: {
      order: 2,
      placeholder: "Enter your email address",
      label: "Email",
      required: true,
      type: "email",
    },
    password: {
      order: 3,
      placeholder: "Enter your password",
      label: "Password",
      required: true,
      type: "password",
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      required: true,
      type: "password",
    },
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { route } = useAuthenticator((c) => [c.route]);
  const next = useSearchParams().get("next") || "/";

  useEffect(() => {
    if (route === "authenticated") router.replace(next);
  }, [route, next, router]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <nav className="fixed left-2 top-2 z-30">
        <Button asChild variant="ghost" className="group px-2 py-2">
          <Link href={next} aria-label="Back to Home">
            <ArrowLeft
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-0.5"
            />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </Button>
      </nav>

      <div className="absolute inset-0 z-0"></div>

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <Authenticator formFields={formFields}>
          {({ user }) => (
            <div className="mt-4 text-center text-sm text-gray-500">
              Welcome, {user?.username}! Redirecting...
            </div>
          )}
        </Authenticator>
      </div>
    </div>
  );
}
