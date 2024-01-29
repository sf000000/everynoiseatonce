"use client";

import { BlogPost } from "@/interfaces";
import { cn } from "@/lib/utils";
import { ComponentProps, useState, useEffect } from "react";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import rehypeHighlight from "rehype-highlight";

import "@/styles/highlight-js/ir-black.css";

import { motion } from "framer-motion";
import { postProcess, preProcess } from "@/lib/rehype-pre-raw";

import { InfiniteSlider } from "@/app/components/mdx/infinite-slider";
import { Pre } from "@/app/components/mdx/pre";
import { AnimatedTextGradientTW } from "@/app/components/mdx/animated-text-gradient";

import { ExternalLink } from "lucide-react";

interface BlogPostProps extends ComponentProps<"div"> {
  slug: string;
}

export default function BlogPost({ slug, className, ...props }: BlogPostProps) {
  const [blog, setBlog] = useState<BlogPost>();
  const [source, setSource] = useState<any>();

  const options = {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [preProcess, rehypeHighlight, postProcess],
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
              rehypePlugins: [preProcess, rehypeHighlight as any, postProcess],
            },
          });
          setSource(serializedContent);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog();
  }, [slug]);

  if (!source) return null;

  const custom = {
    pre: (props: any) => <Pre {...props} />,
    a: (props: any) => (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-x-1"
        {...props}
      >
        {props.children}
        <ExternalLink className="w-4 h-4" />
      </a>
    ),
  };

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
            AnimatedTextGradientTW,
            ...custom,
          }}
          options={options}
          {...source}
        />
      </motion.article>
    </div>
  );
}
