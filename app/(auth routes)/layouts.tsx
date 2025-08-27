"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default AuthLayout;
