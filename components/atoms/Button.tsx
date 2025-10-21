
"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/motion"

export default function Button({ className, children, ...props }: any){
  return (
    <motion.button
      whileHover={{ scale: 1.03, boxShadow: "0 0 24px #ffffff22" }}
      whileTap={{ scale: 0.98 }}
      className={cn("rounded-3xl px-5 py-3 bg-white text-black font-medium", className)}
      {...props}
    >{children}</motion.button>
  )
}
