"use client";

import { useState, useEffect, ComponentProps } from "react";

import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import moment from "moment";
import { Play, ExternalLink } from "lucide-react";
import { FaLastfm } from "react-icons/fa6";

import { CardBody, CardContainer, CardItem } from "@/components/three-d-card";
import Lyrics from "@/app/components/music/lyrics";
import NowPlayingDots from "@/components/now-playing-dots";
import { MusicCardSkeleton } from "@/app/components/skeletons/music-card-skeleton";

import { cn, truncate } from "@/lib/utils";
import { Profile, TopArtist, Track } from "@/interfaces";
import { motion } from "framer-motion";
import TopArtists from "./top-artists";

export default function Music({ className, ...props }: ComponentProps<"div">) {
  const [profile, setProfile] = useState<Profile>();
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<TopArtist[]>([]);
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
        setRecentTracks(recentTracksRes.data.tracks.recenttracks.track);
        setTopArtists(recentTracksRes.data.topArtists);
        console.log(recentTracksRes.data.topArtists);
      } catch (error) {
        console.error("[fetchData]", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        className={cn(
          "flex items-center justify-center w-full h-full",
          className
        )}
      >
        <MusicCardSkeleton />
      </div>
    );
  }

  return (
    <div className={cn("", className)} {...props}>
      <div className="flex items-center gap-x-2 w-full">
        <CardContainer className="inter-var select-none">
          <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-indigo-500/[0.1] bg-secondary/5 w-full sm:w-full h-auto rounded-xl p-6 border">
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
                <div className="flex gap-2 flex-col">
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
                      <span className="text-xs hidden sm:block text-muted-foreground">
                        {track["@attr"]?.nowplaying && (
                          <Lyrics trackId={track.spotifyId} />
                        )}
                      </span>
                      <span className="text-xs hidden sm:block  text-muted-foreground">
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
            <div className="absolute top-0 right-0 p-4">
              <FaLastfm className="w-8 h-8 text-zinc-100" />
            </div>
          </CardBody>
        </CardContainer>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TopArtists className="mt-4" artists={topArtists} />
      </motion.div>
    </div>
  );
}
