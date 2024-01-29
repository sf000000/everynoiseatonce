"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import InfoSection from "@/app/components/info-section";
import Experience from "@/app/components/experience";
import Projects from "@/app/components/projects";
import LatestBlogs from "@/app/components/latest-blogs";
import Music from "@/app/components/music";
import BlogsList from "@/app/components/blogs-list";

import { motion } from "framer-motion";
import { DistortedText } from "./components/lab/distorted-text";
import { ButtonShadowSpotlight } from "./components/lab/button-shadow-spotlight";
import { ButtonFlickeringLight } from "./components/lab/button-flickering";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function Home() {
  return (
    <main className="flex items-center justify-between w-full flex-col p-8 min-h-screen">
      <div className="w-full max-w-3xl">
        <div>
          <InfoSection />
          <div className="border-b  w-full my-8"></div>
          <Tabs defaultValue="about" className="">
            <TabsList className="dark:bg-secondary/5 border">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="music">Music</TabsTrigger>
              <TabsTrigger value="lab">Lab</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div className="mt-4" variants={itemVariants}>
                  <p className="text-base text-muted-foreground">
                    Passionate about building things for the web. I&apos;m a
                    self-taught developer who enjoys learning new things and
                    solving problems. I&apos;m currently working as a freelance
                    developer.
                  </p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Experience />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Projects />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <LatestBlogs />
                </motion.div>
              </motion.div>
            </TabsContent>
            <TabsContent value="blogs">
              <BlogsList className="mt-4" />
            </TabsContent>
            <TabsContent value="music">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={itemVariants}>
                  <Music />
                </motion.div>
              </motion.div>
            </TabsContent>
            <TabsContent className="flex flex-col" value="lab">
              <motion.div
                className="flex flex-col gap-y-4 mt-2"
                initial="hidden"
                animate="show"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <ButtonShadowSpotlight />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <DistortedText />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <ButtonFlickeringLight />
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
