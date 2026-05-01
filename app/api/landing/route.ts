import { NextResponse } from "next/server";
import { getLandingData } from "@/lib/data";

export async function GET() {
  const data = getLandingData();
  return NextResponse.json(data);
}
