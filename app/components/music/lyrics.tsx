"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { motion } from "framer-motion";

interface LyricsProps extends React.ComponentProps<"div"> {
  trackId: string;
}

interface LyricsResponse {
  error: boolean;
  syncType: string;
  lines: Line[];
}

interface Line {
  startTimeMs: string;
  words: string;
  syllables: any[];
  endTimeMs: string;
}

const Lyrics: React.FC<LyricsProps> = ({ trackId, className, ...props }) => {
  const [lyrics, setLyrics] = useState<LyricsResponse>();
  const [currentLine, setCurrentLine] = useState<string>("");

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const { data } = await axios.get(
          `https://spotify-lyrics-api-sigma.vercel.app/?trackid=${trackId}`
        );
        setLyrics(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLyrics();
  }, [trackId]);

  useEffect(() => {
    if (!lyrics) return;

    lyrics.lines.forEach((line, index) => {
      const startTime = parseInt(line.startTimeMs, 10);
      setTimeout(() => {
        setCurrentLine(line.words);
      }, startTime);
    });

    // Cleanup function to clear timeouts if component unmounts
    return () => {
      lyrics.lines.forEach((line) => {
        const startTime = parseInt(line.startTimeMs, 10);
        clearTimeout(startTime);
      });
    };
  }, [lyrics]);

  return (
    <div className={className} {...props}>
      <motion.div
        key={currentLine}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1,
          delay: 0.5,
        }}
      >
        {lyrics && <p>♪ {currentLine} ♪</p>}
      </motion.div>
    </div>
  );
};

export default Lyrics;
