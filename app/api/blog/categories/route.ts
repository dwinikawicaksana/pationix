import { NextResponse } from "next/server";
import { BLOG_CATEGORIES } from "@/lib/blogCategories";

export async function GET() {
  return NextResponse.json(BLOG_CATEGORIES);
}
