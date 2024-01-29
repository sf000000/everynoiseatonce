"use client";

import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

import BlogPost from "@/app/components/blog-post";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <main className="flex items-center justify-between w-full flex-col p-8 min-h-screen">
      <div className="w-full max-w-3xl">
        <Link className="flex items-center gap-x-2" href="/">
          <ChevronLeftIcon className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <BlogPost slug={params.slug} />
      </div>
    </main>
  );
}
