import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Field({
  label,
  error,
  hint,
  id,
  type = "text",
  className = "",
  showLabel,
  hideLabel,
  ...rest
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && show ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5 text-start">
      <label htmlFor={id} className="text-sm font-semibold text-[#001809]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          className={`h-10 w-full rounded-lg border bg-white px-3 text-sm text-[#001809] outline-none transition-colors placeholder:text-[#9CA3AF] focus-visible:ring-2 ${
            error
              ? "border-red-500 focus-visible:ring-red-500/30"
              : "border-[#D7DDD7] focus-visible:border-primary focus-visible:ring-primary/40"
          } ${isPassword ? "pe-10" : ""} ${className}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            aria-label={show ? hideLabel : showLabel}
            className="absolute inset-y-0 end-3 my-auto flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] transition-colors hover:text-[#001809]"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-[#6B7280]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
