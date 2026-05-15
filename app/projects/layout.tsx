import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Paitonix",
  description:
    "Explore our portfolio of successful digital product projects, from web applications to mobile apps and AI-powered solutions.",
  openGraph: {
    type: "website",
    url: "https://paitonix.com/projects",
    title: "Projects — Paitonix",
    description:
      "Explore our portfolio of successful digital product projects.",
    siteName: "Paitonix",
    images: [
      {
        url: "/assets/images/meta-img.png",
        width: 1200,
        height: 630,
        alt: "Paitonix Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Paitonix",
    description:
      "Explore our portfolio of successful digital product projects.",
    images: ["/assets/images/meta-img.png"],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
