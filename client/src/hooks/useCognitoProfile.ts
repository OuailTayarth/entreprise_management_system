"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";

type Profile = { name: string; email: string; avatar: string };

export const useCognitoProfile = () => {
  const { user } = useAuthenticator((ctx) => [ctx.user]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const DEFAULT_PROFILE: Profile = {
    name: "Eugene An",
    email: "eugene@gmail.com",
    avatar: "/assets/profile.jpeg",
  };

  useEffect(() => {
    if (!user) {
      setProfile(DEFAULT_PROFILE);
      return;
    }
    (async () => {
      const { username } = await getCurrentUser();
      const userDetails = await fetchUserAttributes();
      setProfile({
        name: username ?? "",
        email: userDetails?.email ?? "",
        avatar: DEFAULT_PROFILE.avatar,
      });
    })();
  }, [user]);

  return profile;
};
