import { ImageResponse } from "next/og";
import path from "path";
import { readFileSync } from "fs";

export const alt = "Paitonix — Digital Product Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const imagePath = path.join(process.cwd(), "public/assets/images/meta-img.png");
  const imageBuffer = readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");

  return new ImageResponse(
    <img
      src={`data:image/png;base64,${base64Image}`}
      style={{
        width: "100%",
        height: "100%",
      }}
      alt="Paitonix — Digital Product Studio"
    />
  );
}
