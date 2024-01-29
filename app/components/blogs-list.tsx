import { ComponentProps, useEffect, useState } from "react";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
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
  const controls = useAnimation();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs");
        setBlogs(response.data);
        controls.start((i) => "visible");
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, [controls]);

  return (
    <motion.div {...props} className={className} initial="hidden">
      <div className="flex flex-col space-y-2">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.slug}
            custom={index} // Pass index to use in the variant
            variants={itemVariants}
            initial="hidden"
            animate={controls}
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
