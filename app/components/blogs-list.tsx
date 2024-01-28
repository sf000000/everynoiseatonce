"use client";

import { cn } from "@/lib/utils";
import { ComponentProps, useState, useEffect } from "react";

import axios from "axios";
import { BlogPost } from "@/interfaces";
import BlogListItem from "./blog-list-item";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
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
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <motion.div
      {...props}
      className={cn("", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col space-y-2">
        {blogs.map((blog) => (
          <motion.div key={blog.slug} variants={itemVariants}>
            <BlogListItem className="" blog={blog} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
