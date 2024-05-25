import { GeistSans } from "geist/font/sans";
import { createClient } from "@/utils/supabase/server";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "BlockMates",
  description: "Help each other and organise together in your block",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="flex flex-col items-center min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
