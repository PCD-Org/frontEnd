import { Loader2 } from "lucide-react";

const styles = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary/40",
  secondary:
    "border border-[#D7DDD7] bg-white text-[#001809] hover:bg-surface-card focus-visible:ring-[#C2C8C0]/50",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600/40",
  ghost: "text-[#424842] hover:bg-surface-card focus-visible:ring-[#C2C8C0]/50",
};

const sizes = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon: Icon,
  className = "",
  children,
  disabled,
  ...rest
}) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading}
      className={`inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
      ) : Icon ? (
        <Icon size={16} aria-hidden="true" />
      ) : null}
      {children}
    </button>
  );
}
