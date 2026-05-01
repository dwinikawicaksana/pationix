import { LandingData } from "@/types/landing";
import { getLandingData } from "@/lib/data";

// Server-side: import data directly (avoids self-referential fetch during build)
export async function fetchLandingData(): Promise<LandingData> {
  return getLandingData();
}
