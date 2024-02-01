import { useEffect, useState } from "react";

import {
  Binary,
  Code,
  Film,
  FlaskConical,
  Heart,
  Music,
  Palette,
  PawPrint,
  Sparkles,
  Star,
  Swords,
  Utensils,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const messages = [
  {
    username: "goldbricki1",
    userColor: "text-blue-500",
    message: "Hello, World!",
    badges: [
      <Sparkles
        key="sparkles"
        className="text-yellow-500 bg-yellow-500/20 p-1 w-6 h-6 rounded"
      />,
      <Heart
        key="heart"
        className="fill-red-500 stroke-none bg-red-500/10 p-1 w-6 h-6 rounded"
      />,
    ],
  },
  {
    username: "user123",
    userColor: "text-green-500",
    message: "Hey there!",
    badges: [
      <Star
        key="star"
        className="text-yellow-500 bg-yellow-500/20 p-1 w-6 h-6 rounded"
      />,
    ],
  },
  {
    username: "chatlover55",
    userColor: "text-purple-500",
    message: "Good morning, everyone!",
    badges: [],
  },
  {
    username: "emoji_master",
    userColor: "text-pink-500",
    message: "😄👋 Hello, World!",
    badges: [],
  },
  {
    username: "coder123",
    userColor: "text-orange-500",
    message: "Coding is fun!",
    badges: [
      <Code
        key="code"
        className="text-blue-500 bg-blue-500/20 p-1 w-6 h-6 rounded"
      />,
      <Binary
        key="binary"
        className="text-green-500 bg-green-500/20 p-1 w-6 h-6 rounded"
      />,
    ],
  },
  {
    username: "designer567",
    userColor: "text-red-500",
    message: "I love creating beautiful designs!",
    badges: [
      <Palette
        key="palette"
        className="text-pink-500 bg-pink-500/20 p-1 w-6 h-6 rounded"
      />,
    ],
  },
  {
    username: "musiclover99",
    userColor: "text-yellow-500",
    message: "🎵 Music is life!",
    badges: [
      <Music
        key="music"
        className="text-green-500 bg-green-500/20 p-1 w-6 h-6 rounded"
      />,
    ],
  },
  {
    username: "gamerpro88",
    userColor: "text-blue-500",
    message: "Game on!",
    badges: [
      <Swords
        key="swords"
        className="text-purple-500 bg-purple-500/20 p-1 w-6 h-6 rounded"
      />,
    ],
  },
  {
    username: "bookworm42",
    userColor: "text-green-500",
    message: "Just finished a great book!",
    badges: [],
  },
  {
    username: "sunsetlover",
    userColor: "text-orange-500",
    message: "The sunset was breathtaking tonight!",
    badges: [],
  },
  {
    username: "fitnessguru",
    userColor: "text-green-500",
    message: "Just finished an intense workout 💪",
    badges: [],
  },
  {
    username: "foodie123",
    userColor: "text-red-500",
    message: "I had the most delicious meal today!",
    badges: [
      <Utensils
        key="utensils"
        className="text-blue-500 bg-blue-500/20 p-1 w-6 h-6 rounded"
      />,
    ],
  },
  {
    username: "travelbug",
    userColor: "text-yellow-500",
    message: "Wanderlust calling! ✈️🌍",
    badges: [],
  },
  {
    username: "doglover",
    userColor: "text-pink-500",
    message: "My dog is the cutest! 🐶❤️",
    badges: [
      <Heart
        key="heart1"
        className="fill-red-500 stroke-none bg-red-500/10 p-1 w-6 h-6 rounded"
      />,
    ],
  },
  {
    username: "catperson",
    userColor: "text-purple-500",
    message: "Cats rule! 🐱",
    badges: [
      <PawPrint
        key="pawprint"
        className="text-green-500 bg-green-500/20 p-1 w-6 h-6 rounded"
      />,
    ],
  },
  {
    username: "naturelover",
    userColor: "text-green-500",
    message: "Spent the day hiking in the mountains!",
    badges: [],
  },
  {
    username: "moviebuff",
    userColor: "text-red-500",
    message: "Just saw an amazing movie!",
    badges: [
      <Film
        key="film"
        className="text-yellow-500 bg-yellow-500/20 p-1 w-6 h-6 rounded"
      />,
    ],
  },
  {
    username: "sciencegeek",
    userColor: "text-blue-500",
    message: "Science is fascinating!",
    badges: [
      <FlaskConical
        key="flask"
        className="text-purple-500 bg-purple-500/20 p-1 w-6 h-6 rounded"
      />,
    ],
  },
  {
    username: "codingninja",
    userColor: "text-orange-500",
    message: "Another day, another code!",
    badges: [],
  },
];

interface Message {
  username: string;
  userColor: string;
  message: string;
  badges: JSX.Element[];
}

const TwitchChat = () => {
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [nextMessageIndex, setNextMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (nextMessageIndex < messages.length) {
        setDisplayedMessages((currentMessages) => {
          const updatedMessages = [
            ...currentMessages,
            messages[nextMessageIndex],
          ].slice(-6);
          return updatedMessages;
        });
        setNextMessageIndex(
          (currentIndex) => (currentIndex + 1) % messages.length
        );
      }
    }, 400);

    return () => clearInterval(timer);
  }, [nextMessageIndex]);

  const messageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="relative border p-4 rounded-lg h-[260px] overflow-hidden">
      <h2 className="text-lg font-bold">Chat</h2>

      <div className="flex items-center justify-center"></div>
      <AnimatePresence>
        <div className="mt-4 space-y-2">
          {displayedMessages.map((message, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={messageVariants}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-2"
            >
              <div className="flex items-center space-x-2">
                {message.badges.map((badge, badgeIndex) => (
                  <div key={badgeIndex}>{badge}</div>
                ))}
                <p className={cn("font-medium", message.userColor)}>
                  {message.username}
                  <span className="text-white">:</span>
                </p>
              </div>
              <p>{message.message}</p>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default TwitchChat;
