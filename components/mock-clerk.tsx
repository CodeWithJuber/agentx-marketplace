'use client';

import React from 'react';

// Mock ClerkProvider for development without Clerk
export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SignedIn({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function UserButton() {
  return <div>User</div>;
}

export function SignIn() {
  return <div>Sign In Page</div>;
}

export function SignUp() {
  return <div>Sign Up Page</div>;
}