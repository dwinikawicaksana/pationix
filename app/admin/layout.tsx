import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Paitonix",
  description: "Paitonix admin dashboard",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
