import type { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "../providers/theme-provider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
