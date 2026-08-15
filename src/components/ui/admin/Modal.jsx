import { useEffect, useRef, useId } from "react";
import { X } from "lucide-react";

const sizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeLabel,
}) {
  const titleId = useId();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative flex max-h-[90vh] w-full ${sizes[size]} flex-col overflow-hidden rounded-2xl bg-white shadow-xl`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#EDF0ED] px-5 py-4">
          <h2
            id={titleId}
            className="text-base font-bold text-[#001809]"
          >
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="rounded-md p-1 text-[#6B7280] transition-colors hover:bg-surface-card hover:text-[#001809]"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-[#EDF0ED] px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
