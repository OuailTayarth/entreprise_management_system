"use client";

import React, { useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import DarkVeil from "@/components/DarkVeil";
import { useRouter } from "next/navigation";
import { configureAmplify } from "@/app/amplify-client";

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

configureAmplify();

export default function LoginPage() {
  const router = useRouter();
  const { route } = useAuthenticator((context) => [context.route]);

  useEffect(() => {
    if (route === "authenticated") {
      router.push("/");
    }
  }, [route, router]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0.3}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
          resolutionScale={2}
        />
      </div>

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
