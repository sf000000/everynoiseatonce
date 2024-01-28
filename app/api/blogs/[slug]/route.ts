import { NextResponse, NextRequest } from "next/server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET(req: NextRequest) {
  const slug = new URL(req.url).pathname.split("/").pop();

  try {
    const markdownFile = fs.readFileSync(
      path.join(process.cwd() + "/blogs", slug + ".mdx"),
      "utf-8"
    );

    const { data: meta, content } = matter(markdownFile);

    return NextResponse.json({
      meta,
      content,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: `[app/api/blogs/[slug]/route.ts]: ${error}`,
    });
  }
}
