import Providers from "@/providers/queryProvider";
import { Navbar } from "@/components/Navbar";
import { globalStyles } from "@/theme/globalStyles";
import { darkTheme, lightTheme } from "@/theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { cookies } from "next/headers";

export type ThemeTypes = "dark" | "light";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = cookies();
  const theme = cookiesStore.get("theme")
    ? cookiesStore.get("theme")!.value
    : "light";

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
            <CssBaseline />
            {globalStyles}
            <Navbar theme={theme as ThemeTypes} />
            <Providers>{children}</Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
