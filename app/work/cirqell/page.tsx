import type { Metadata } from "next";
import { CirqellPage } from "@/components/case-study/CirqellPage";

export const metadata: Metadata = {
  title: "Cirqell — 0→1 Design Case Study | Kanak Prajapati",
  description:
    "Designing a meaningful social networking experience for creators, builders, and thinkers on Cirqell.",
};

export default function Page() {
  return <CirqellPage />;
}
