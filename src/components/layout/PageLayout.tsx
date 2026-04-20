import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AIChatWidget } from "@/components/AIChatWidget";

export const PageLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main id="main" className="flex-1 animate-fade-in">{children}</main>
    <Footer />
    <AIChatWidget />
  </div>
);
