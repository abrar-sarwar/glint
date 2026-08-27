import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "reactflow/dist/style.css";
import { Sidebar } from "@/components/shell/Sidebar";
import { StatusBar } from "@/components/shell/StatusBar";
import { SourceDrawerProvider } from "@/components/intel/SourceDrawer";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { caseStatus } from "@/data/case";

const sans = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "LEEK · CyberLeek / GTA VI",
    template: "%s · LEEK",
  },
  description:
    "LEEK is a living, evidence-driven reconstruction of the CyberLeek GTA VI leak campaign: what happened, what the evidence proves, and what remains unknown.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} dark`}>
      <body className="bg-bg-base font-sans text-ink-primary antialiased">
        <SourceDrawerProvider>
          <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <StatusBar
                caseName={caseStatus.name}
                latestSync={caseStatus.latestSync}
                latestVerified={caseStatus.latestVerifiedEventDate}
              />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </div>
          <CommandPalette />
        </SourceDrawerProvider>
      </body>
    </html>
  );
}
