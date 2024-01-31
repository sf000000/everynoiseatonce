import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { TopArtist, Track } from "@/interfaces";

const LASTFM_BASE_URL = "https://ws.audioscrobbler.com/2.0/";
const SPOTIFY_ACCOUNTS_BASE_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

async function getSpotifyAccessToken(clientId: string, clientSecret: string) {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const { data } = await axios.post(
    SPOTIFY_ACCOUNTS_BASE_URL,
    params.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
    }
  );

  return data.access_token;
}

async function getTopArtists(lastFmApiKey: string, username: string) {
  const response = await axios.get(`${LASTFM_BASE_URL}`, {
    params: {
      method: "user.gettopartists",
      user: username,
      api_key: lastFmApiKey,
      format: "json",
      limit: 4,
    },
  });

  return response.data.topartists.artist;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const lastFmApiKey = process.env.LASTFM_API_KEY;
  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
  const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  try {
    const spotifyAccessToken = await getSpotifyAccessToken(
      spotifyClientId as string,
      spotifyClientSecret as string
    );

    const [lastFmTracks, topArtists] = await Promise.all([
      axios.get(`${LASTFM_BASE_URL}`, {
        params: {
          method: "user.getrecenttracks",
          user: username,
          api_key: lastFmApiKey,
          format: "json",
          limit: 4,
        },
      }),
      getTopArtists(lastFmApiKey as string, username as string),
    ]);

    const tracks = lastFmTracks.data.recenttracks.track;

    const trackPromises = tracks.map(async (track: Track) => {
      const query = `${track.artist["#text"]} ${track.name}`;
      const spotifyResponse = await axios.get(
        `${SPOTIFY_API_BASE_URL}/search`,
        {
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
          },
          params: {
            q: query,
            type: "track",
            limit: 1,
          },
        }
      );

      if (spotifyResponse.data.tracks.items.length > 0) {
        const spotifyTrack = spotifyResponse.data.tracks.items[0];
        const spotifyId = spotifyTrack.id;
        const artwork = spotifyTrack.album.images[0]?.url;
        return { ...track, spotifyId, artwork };
      } else {
        return { ...track, spotifyId: null, artwork: null };
      }
    });

    const artistPromises = topArtists.map(async (artist: TopArtist) => {
      const spotifyResponse = await axios.get(
        `${SPOTIFY_API_BASE_URL}/search`,
        {
          headers: {
            Authorization: `Bearer ${spotifyAccessToken}`,
          },
          params: {
            q: artist.name,
            type: "artist",
            limit: 1,
          },
        }
      );

      if (spotifyResponse.data.artists.items.length > 0) {
        const spotifyArtist = spotifyResponse.data.artists.items[0];
        const artwork = spotifyArtist.images[0]?.url;
        return { ...artist, spotifyId: spotifyArtist.id, artwork };
      } else {
        return { ...artist, spotifyId: null, artwork: null };
      }
    });

    const [results, artistResults] = await Promise.all([
      Promise.all(trackPromises),
      Promise.all(artistPromises),
    ]);

    lastFmTracks.data.recenttracks.track = results;

    const response = {
      tracks: lastFmTracks.data,
      topArtists: artistResults,
    };

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
