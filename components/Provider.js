"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Next13ProgressBar } from "next13-progressbar";

const Provider = ({ children, session }) => (
  <SessionProvider session={session}>
    <ThemeProvider enableSystem={false}>{children}</ThemeProvider>
    <Next13ProgressBar
      color="#22c55e"
      options={{ showSpinner: false }}
      showOnShallow
    />
  </SessionProvider>
);

export default Provider;
