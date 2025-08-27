"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await checkSession();
      if (res) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearAuth();
      }
    };
    fetchSession();
  }, [clearAuth, setUser]);

  //
  return children;
};

export default AuthProvider;
