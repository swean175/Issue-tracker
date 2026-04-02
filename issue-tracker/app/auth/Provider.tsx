'use client';
import React from 'react';
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div>
      <SessionProvider>{children}  </SessionProvider>   
    </div>
  );
};

export default AuthProvider;