"use client";

import { BlogPost } from "@/interfaces";
import { cn } from "@/lib/utils";
import { ComponentProps, useState, useEffect } from "react";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import rehypeHighlight from "rehype-highlight";

import "@/styles/highlight-js/ir-black.css";

import { InfiniteSlider } from "@/app/components/mdx/infinite-slider";

import { motion } from "framer-motion";

interface BlogPostProps extends ComponentProps<"div"> {
  slug: string;
}

export default function BlogPost({ slug, className, ...props }: BlogPostProps) {
  const [blog, setBlog] = useState<BlogPost>();
  const [source, setSource] = useState<any>();

  const options = {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypeHighlight],
    },
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        const data = await response.json();
        setBlog(data);
        if (data.content) {
          const serializedContent = await serialize(data.content, {
            mdxOptions: {
              development: process.env.NODE_ENV === "development",
              remarkPlugins: [],
              rehypePlugins: [rehypeHighlight as any],
            },
          });
          setSource(serializedContent);
          console.log(serializedContent);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog();
  }, [slug]);

  if (!source) return null;

  return (
    <div className={cn("mt-8", className)} {...props}>
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="prose prose-neutral mx-auto min-w-full pb-12 dark:prose-dark prose-h1:text-xl prose-h1:font-medium prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-a:font-normal prose-figcaption:text-center prose-strong:font-semibold prose-img:mb-0 prose-video:mb-0 !prose-invert prose-code:bg-indigo-500/10 prose-code:rounded prose-code:px-0.5 prose-code:py-0.5 prose-code:text-indigo-500 prose-a:no-underline prose-a:text-indigo-500"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold m-0">{blog?.meta.title}</h1>
          <span className="text-sm text-muted-foreground self-center">
            {blog?.meta.date}
          </span>
        </div>
        <MDXRemote
          components={{
            InfiniteSlider,
          }}
          options={options}
          {...source}
        />
      </motion.article>
    </div>
  );
}
