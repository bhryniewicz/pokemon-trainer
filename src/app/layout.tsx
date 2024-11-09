import Providers from "@/app/providers/queryProvider";
import { Navbar } from "@/components/Navbar";
import { globalStyles } from "@/theme/globalStyles";
import { theme } from "@/theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokemon trainer app",
  description: "App for creating custom pokemon trainer",
  keywords: ["pokemons", "trainer", "new trainer"],
  authors: [{ name: "Bartosz Hryneiwicz" }],
  openGraph: {
    title: "Pokemon trainer app",
    description: "App for creating custom pokemon trainer",
    siteName: "Pokemon trainer app",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {globalStyles}
            <Navbar />
            <Providers>{children}</Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
