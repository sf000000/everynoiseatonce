import { NextResponse, NextRequest } from "next/server";

const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const apiKey = process.env.LASTFM_API_KEY;

  try {
    const res = await fetch(
      `${BASE_URL}?method=user.getinfo&user=${username}&api_key=${apiKey}&format=json`
    );
    let data = await res.json();

    if (data.user && data.user.image) {
      data.user.image = data.user.image.map((img: any) => ({
        ...img,
        url: img["#text"],
        size: img.size,
      }));
      data.user.image.forEach((img: any) => delete img["#text"]);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
