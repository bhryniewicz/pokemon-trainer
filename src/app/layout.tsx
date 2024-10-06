import type { Metadata } from "next";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/theme/theme";
import { globalStyles } from "@/theme/globalStyles";

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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {globalStyles}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
