export default function Badge({ tone = "muted", children }) {
  const tones = {
    success: "bg-mint text-primary-dark",
    muted: "bg-surface-card text-[#424842]",
    warn: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
