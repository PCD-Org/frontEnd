export default function Spinner({ className = "", label }) {
  return (
    <span
      role="status"
      className={`inline-flex items-center gap-2 text-sm text-[#6B7280] ${className}`}
    >
      <span
        className="h-5 w-5 animate-spin rounded-full border-2 border-[#D7DDD7] border-t-primary"
        aria-hidden="true"
      />
      {label && <span>{label}</span>}
    </span>
  );
}
