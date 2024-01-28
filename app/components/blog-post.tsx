"use client";

import { BlogPost } from "@/interfaces";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Image from "next/image";
import { ComponentProps, useState, useEffect } from "react";

interface BlogPostProps extends ComponentProps<"div"> {
  slug: string;
}

export default function BlogPost({ slug, className, ...props }: BlogPostProps) {
  const [blog, setBlog] = useState<BlogPost>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        const data = await response.json();
        setBlog(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog();
  }, []);

  return (
    <div className={cn("mt-8", className)} {...props}>
      <h1 className="text-2xl font-semibold mt-4">{blog?.meta.title}</h1>
      <span className="text-sm text-muted-foreground">{blog?.meta.date}</span>
    </div>
  );
}
