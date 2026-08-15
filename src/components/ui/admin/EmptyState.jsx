export default function EmptyState({ icon: Icon, title, hint, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#D7DDD7] bg-white px-6 py-14 text-center">
      {Icon && (
        <span className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-mint text-primary">
          <Icon size={22} aria-hidden="true" />
        </span>
      )}
      <h3 className="text-base font-bold text-[#001809]">{title}</h3>
      {hint && <p className="max-w-sm text-sm text-[#6B7280]">{hint}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
