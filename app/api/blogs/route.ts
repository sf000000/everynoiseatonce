import { NextResponse, NextRequest } from "next/server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET(req: NextRequest) {
  try {
    const blogDir = "blogs";

    const files = fs.readdirSync(path.join(process.cwd(), "blogs"));

    const blogs = files.map((filename) => {
      const fileContent = fs.readFileSync(
        path.join(blogDir, filename),
        "utf-8"
      );
      const { data: frontMatter } = matter(fileContent);

      return {
        meta: frontMatter,
        slug: filename.replace(".mdx", ""),
      };
    });

    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
