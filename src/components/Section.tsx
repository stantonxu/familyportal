type SectionProps = {
  title: string;
  eyebrow?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export function Section({ title, eyebrow, action, children }: SectionProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/25 backdrop-blur md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.2em] text-sun-200">{eyebrow}</p>
          ) : null}
          <h2 className="mt-1 text-2xl font-semibold text-white">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
