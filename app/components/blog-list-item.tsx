import { cn } from "@/lib/utils";
import Link from "next/link";

export default function BlogListItem({
  blog,
  className,
}: {
  blog: any;
  className: any;
}) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className={cn(
        "group relative grid overflow-hidden rounded p-4 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200 h-28",
        className
      )}
    >
      <span>
        <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%] group-hover:animate-flip group-hover:before:animate-rotate " />
      </span>
      <span className="backdrop absolute inset-[0.9px] rounded transition-colors duration-200 dark:bg-[#0b0b0c] dark:group-hover:bg-[#0b0b0c] bg-[#f4f4f5] group-hover:bg-[#f4f4f5]" />
      <div className="z-10">
        <h3 className="text-lg font-semibold">{blog.meta.title}</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          {blog.meta.description}
        </p>
      </div>
      <span className="absolute top-0 right-0 bg-accent text-xs font-medium m-[0.9px] py-1 px-3 rounded-bl-lg">
        {blog.meta.date}
      </span>
    </Link>
  );
}
