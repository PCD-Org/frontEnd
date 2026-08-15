export default function AdminPageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-[#001809] sm:text-3xl">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-[#6B7280]">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
