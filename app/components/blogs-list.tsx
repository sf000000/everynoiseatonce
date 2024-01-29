import { ComponentProps, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/interfaces";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

export default function BlogsList({
  className,
  ...props
}: ComponentProps<typeof motion.div>) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs");
        const sortedBlogs = response.data.sort((a: any, b: any) => {
          const dateA = new Date(a.meta.date);
          const dateB = new Date(b.meta.date);
          return dateB.getTime() - dateA.getTime();
        });
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <motion.div
      {...props}
      className={className}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col space-y-2">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.slug}
            custom={index}
            variants={itemVariants}
            initial="hidden"
          >
            <Link
              href={`/blogs/${blog.slug}`}
              className="flex items-center justify-between text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <h4 className="text-sm font-medium">{blog.meta.title}</h4>
              <span className="text-sm">{blog.meta.date}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
