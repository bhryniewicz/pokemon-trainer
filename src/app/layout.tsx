"use client";

import Providers from "@/app/providers/queryProvider";
import { Navbar } from "@/components/Navbar";
import { globalStyles } from "@/theme/globalStyles";
import { darkTheme, lightTheme } from "@/theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { useState } from "react";

export type ModeTypes = "dark" | "light";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mode, setMode] = useState<ModeTypes>("dark");

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider
            theme={mode === "dark" ? darkTheme : lightTheme}
            disableTransitionOnChange
          >
            <CssBaseline />
            {globalStyles}
            <>
              <Navbar setMode={setMode} />
            </>
            <Providers>{children}</Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
