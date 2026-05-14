import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.statusText}` },
        { status: response.status },
      );
    }

    const html = await response.text();

    // Parse OG tags using simple regex
    const titleMatch = html.match(
      /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i,
    );
    const imageMatch = html.match(
      /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i,
    );
    const descriptionMatch = html.match(
      /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i,
    );

    // Fallback to standard meta tags if OG tags not found
    const fallbackTitleMatch =
      html.match(/<title[^>]*>([^<]+)<\/title>/i) || [];
    const fallbackDescriptionMatch = html.match(
      /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i,
    );

    const preview = {
      title: titleMatch?.[1] || fallbackTitleMatch?.[1] || "No title",
      image: imageMatch?.[1] || null,
      description:
        descriptionMatch?.[1] || fallbackDescriptionMatch?.[1] || null,
      url,
    };

    return NextResponse.json(preview);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to preview URL: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    );
  }
}
