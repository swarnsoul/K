import type { Metadata } from "next";
import { InfluCrushPage } from "@/components/case-study/InfluCrushPage";

export const metadata: Metadata = {
  title: "InfluCrush — 0→1 Design Case Study | Kanak Prajapati",
  description:
    "A 0→1 creator-fan marketplace app designed for deep community engagement, private drops, and seamless creator monetization.",
};

export default function Page() {
  return <InfluCrushPage />;
}
