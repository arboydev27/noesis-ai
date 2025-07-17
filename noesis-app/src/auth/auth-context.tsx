"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

  // Check with backend if already logged in
  useEffect(() => {
    fetch(`${API_URL}/auth/check`, {
      credentials: "include", // Include cookies for session management
    }).then((res) => {
      setIsAuthenticated(res.ok);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated: setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
