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
      {blog?.meta.image && (
        <Image
          src={blog?.meta.image as string}
          alt="Blog post image"
          width={1200}
          height={600}
          className="rounded w-full h-60 object-cover"
        />
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mt-4">{blog?.meta.title}</h1>
        <div className="flex items-center gap-x-2">
          <Heart className="w-4 h-4 fill-rose-500 stroke-none" />
          <span className="text-sm text-muted-foreground">13</span>
        </div>
      </div>
      <span className="text-sm text-muted-foreground">{blog?.meta.date}</span>
    </div>
  );
}
