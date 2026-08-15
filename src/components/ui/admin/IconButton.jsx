export default function IconButton({
  title,
  onClick,
  danger = false,
  children,
  disabled,
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-md p-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50 ${
        danger
          ? "text-[#6B7280] hover:bg-red-50 hover:text-red-600"
          : "text-[#6B7280] hover:bg-surface-card hover:text-[#001809]"
      }`}
    >
      {children}
    </button>
  );
}
