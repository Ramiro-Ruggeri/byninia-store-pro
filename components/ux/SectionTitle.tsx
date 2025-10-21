
export default function SectionTitle({ title, eyebrow }:{ title:string, eyebrow?:string }){
  return (
    <div className="mb-6">
      {eyebrow && <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">{eyebrow}</div>}
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
    </div>
  )
}
