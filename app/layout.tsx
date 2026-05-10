import type { Metadata } from "next";
import {
  IBM_Plex_Sans,
  JetBrains_Mono,
  Newsreader,
  Special_Elite,
} from "next/font/google";
import "./globals.css";
import "reactflow/dist/style.css";
import { Sidebar } from "@/components/shell/Sidebar";
import { StatusBar } from "@/components/shell/StatusBar";
import { daysUntilCanvasDeadline } from "@/lib/utils";

const sans = IBM_Plex_Sans({
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

const display = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const stamp = Special_Elite({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-stamp",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "GLINT · ShinyHunters cluster",
  description:
    "GLINT tracks ShinyHunters and the Scattered LAPSUS$ Hunters cluster: campaigns, kill chains, detections, and ATT&CK coverage.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const days = daysUntilCanvasDeadline();
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable} ${stamp.variable} dark`}
    >
      <body className="bg-bg-base font-sans text-ink-primary antialiased">
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar daysToDeadline={days} />
          <div className="flex flex-1 flex-col overflow-hidden">
            <StatusBar daysToDeadline={days} />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
