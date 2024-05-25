import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sb = createClient();

  try {
    await sb.auth.signUp({
      email: "i@siah.sg",
      password: "apples",
    });
  } catch (err) {
    console.error(err);
  }

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
