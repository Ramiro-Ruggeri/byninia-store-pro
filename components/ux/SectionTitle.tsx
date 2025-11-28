// components/ux/SectionTitle.tsx
type Props = {
  title: string;
  eyebrow?: string;
};

export default function SectionTitle({ title, eyebrow }: Props) {
  return (
    <div className="mb-5 md:mb-6 space-y-1">
      {eyebrow && (
        <div className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-zinc-500">
          {eyebrow}
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-balance">
        {title}
      </h2>
    </div>
  );
}
