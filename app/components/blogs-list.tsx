"use client";

import { cn } from "@/lib/utils";
import { ComponentProps, useState, useEffect } from "react";

import axios from "axios";
import { BlogPost } from "@/interfaces";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function BlogsList({
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
    <div {...props} className={cn("", className)}>
      <div className="flex flex-col">
        {blogs.map((blog) => (
          <Link
            className="bg-secondary/10 border h-24 px-4 py-2 rounded mt-2 flex items-center justify-between"
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
          >
            <div>
              <div className="flex items-center gap-x-2">
                <h3 className="text-lg font-semibold">{blog.meta.title}</h3>
                {blog.meta.tags.map((tag) => (
                  <Badge variant="outline" key={tag}>
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">
                {blog.meta.description}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {blog.meta.date}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
