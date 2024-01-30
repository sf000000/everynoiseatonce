"use client";

import { ComponentProps, useEffect, useState } from "react";

import { BlogPost } from "@/interfaces";
import { cn } from "@/lib/utils";

import axios from "axios";
import Link from "next/link";

import { truncate } from "@/lib/utils";

export default function LatestBlogs({
  className,
  ...props
}: ComponentProps<"div">) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className={cn("mt-5", className)} {...props}>
      <h1 className="font-medium mb-4 text-lg">Latest Blogs</h1>
      <div className="flex flex-col space-y-2">
        {blogs.slice(0, 3).map((blog) => (
          <div className="flex items-center justify-between" key={blog.slug}>
            <Link
              className="text-sm font-medium hover:underline truncate w-2/3 sm:w-full"
              href={`/blogs/${blog.slug}`}
            >
              {blog.meta.title}
            </Link>
            <span className="text-muted-foreground text-sm">
              {blog.meta.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
