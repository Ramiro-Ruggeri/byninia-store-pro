
"use client"
import { motion } from "framer-motion"
export default function Marquee({ items }: { items: string[] }){
  return (
    <div className="overflow-hidden border-y border-white/10 py-3">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap text-zinc-400">
        {[...items, ...items].map((t,i)=> <span key={i} className="tracking-wide">{t}</span>)}
      </motion.div>
    </div>
  )
}
