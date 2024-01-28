import { NextResponse, NextRequest } from "next/server";

const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const apiKey = process.env.LASTFM_API_KEY;

  try {
    const res = await fetch(
      `${BASE_URL}?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=3`
    );
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
