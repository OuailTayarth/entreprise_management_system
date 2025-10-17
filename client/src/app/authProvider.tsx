import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import DarkVeil from "@/components/DarkVeil";

// todo have the Authenticator in a seperate file or keep it here?
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
    },
  },
});

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

const AuthProvider = ({ children }: any) => {
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
          {({ user }: any) =>
            user ? <div>{children}</div> : <div>Please sign in below</div>
          }
        </Authenticator>
      </div>
    </div>
  );
};

export default AuthProvider;
