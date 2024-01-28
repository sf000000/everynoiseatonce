import { NextResponse, NextRequest } from "next/server";
import { Track } from "@/interfaces";

import axios from "axios";

const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const apiKey = process.env.LASTFM_API_KEY;

  try {
    const lastFmResponse = await axios.get(`${BASE_URL}`, {
      params: {
        method: "user.getrecenttracks",
        user: username,
        api_key: apiKey,
        format: "json",
        limit: 3,
      },
    });

    const data = lastFmResponse.data;
    const tracks: Track[] = data.recenttracks.track;

    const promises = tracks.map(async (track) => {
      const query = `artist:"${track.artist["#text"]}" track:"${track.name}"`;
      const deezerResponse = await axios.get(`https://api.deezer.com/search`, {
        params: {
          q: encodeURIComponent(query),
        },
      });

      const artwork = deezerResponse?.data?.data[0]?.album?.cover_small;
      return { ...track, artwork };
    });

    const results = await Promise.all(promises);

    data.recenttracks.track = results;

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
