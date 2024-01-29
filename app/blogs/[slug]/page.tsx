"use client";

import { Check, ChevronLeftIcon, ShareIcon } from "lucide-react";
import Link from "next/link";

import BlogPost from "@/app/components/blog-post";
import { useState } from "react";
import { LuTwitter } from "react-icons/lu";

export default function Page({ params }: { params: { slug: string } }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyLinkToClipboard = () => {
    const url = `${window.location.origin}/blogs/${params.slug}`;
    navigator.clipboard.writeText(url);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  return (
    <main className="flex items-center justify-between w-full flex-col p-8 min-h-screen">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between">
          <Link className="flex items-center gap-x-2" href="/">
            <ChevronLeftIcon className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <div className="flex items-center">
            <button
              disabled={isCopied}
              className="text-sm rounded-full bg-neutral-950/60 p-2"
              onClick={copyLinkToClipboard}
            >
              {isCopied ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShareIcon className="h-4 w-4" />
              )}
            </button>
            <Link
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `Check out this blog post: ${window.location.origin}/blogs/${params.slug}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm ml-2 rounded-full bg-neutral-950/60 p-2"
            >
              <LuTwitter className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <BlogPost slug={params.slug} />
      </div>
    </main>
  );
}
