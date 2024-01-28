"use client";

import { useState, useEffect, ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import moment from "moment";
import { Loader2, Play, ExternalLink } from "lucide-react";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/app/components/three-d-card";
import Lyrics from "@/app/components/lyrics";
import NowPlayingDots from "@/components/now-playing-dots";
import { cn, truncate } from "@/lib/utils";
import { Profile, Track } from "@/interfaces";

export default function Music({ className, ...props }: ComponentProps<"div">) {
  const [profile, setProfile] = useState<Profile>();
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = axios.get(
      "/api/lastfm/profile?username=evrynoiseatonce"
    );
    const fetchRecentTracks = axios.get(
      "/api/lastfm/recent-tracks?username=evrynoiseatonce"
    );

    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileRes, recentTracksRes] = await Promise.all([
          fetchProfile,
          fetchRecentTracks,
        ]);
        setProfile(profileRes.data.user);
        setRecentTracks(recentTracksRes.data.recenttracks.track);
      } catch (error) {
        console.error("[fetchData]", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );

  return (
    <div
      {...props}
      className={cn("flex items-center gap-x-2 w-full", className)}
    >
      <CardContainer className="inter-var select-none">
        <CardBody className="group/card dark:hover:shadow-2xl dark:hover:shadow-indigo-500/[0.1] dark:border-white/[0.2] border-black/[0.1] bg-secondary/5 w-full sm:w-full h-auto rounded-xl p-6 border">
          <CardItem
            translateZ="100"
            className="w-full flex flex-col sm:flex-row items-center"
          >
            <Image
              src={profile?.image[3].url || "/images/placeholder.png"}
              height="250"
              width="250"
              className="h-40 w-40 object-cover opacity-0 transition-opacity duration-300 rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
              loading="lazy"
              onLoad={(e) => {
                e.currentTarget.classList.add("opacity-100");
              }}
            />
            <div className="flex flex-col ml-4">
              <div className="flex items-center gap-x-2">
                <h1 className="text-2xl font-bold">{profile?.name}</h1>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={profile?.url || ""}
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>
              <span className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start">
                <Play className="mr-1 w-[14px] h-[14px]" />
                {Number(profile?.playcount).toLocaleString()} plays
              </span>
            </div>
          </CardItem>
          <div>
            <CardItem
              translateZ="50"
              as="div"
              className="px-4 py-2 rounded-xl text-xs font-normal w-full"
            >
              <h2 className="text-sm">Recent Tracks</h2>
              <div className="border-b w-full my-2"></div>
              <div className="flex flex-col">
                {recentTracks.map((track) => (
                  <div
                    key={track.url}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Image
                        src={track.artwork || "/images/placeholder.png"}
                        height="30"
                        width="30"
                        className="h-8 w-8 object-cover rounded-full opacity-0 transition-opacity duration-300"
                        alt="thumbnail"
                        loading="lazy"
                        onLoad={(e) => {
                          e.currentTarget.classList.add("opacity-100");
                        }}
                      />
                      <div className="flex flex-col ml-2">
                        <span className="text-sm">
                          {truncate(track.name, 20)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {track.artist["#text"]}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {track["@attr"]?.nowplaying && (
                        <Lyrics trackId={track.spotifyId} />
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {track["@attr"]?.nowplaying ? (
                        <NowPlayingDots />
                      ) : (
                        moment.unix(Number(track.date?.uts)).fromNow()
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
