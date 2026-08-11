export const SectionTitle = ({
  title,
  subtitle,
  breadcrumbs = [],
  align = 'right', // 'right' | 'center' | 'left'
  className = '',
}) => {
  const alignmentClasses = {
    right: 'text-right items-start',
    center: 'text-center items-center',
    left: 'text-left items-end',
  };

  return (
    <div className={`flex flex-col gap-2 my-4 mx-32 ${alignmentClasses[align]} ${className}`}>
      {breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-1">
          <ol className="flex items-center gap-6 text-sm text-gray-500">
            <li>
              <a href="/" className="hover:text-emerald-700 transition-colors">
                الرئيسية
              </a>
            </li>
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                {item.link ? (
                  <a href={item.link} className="hover:text-emerald-700 transition-colors">
                    {item.label}
                  </a>
                ) : (
                  <span className="font-semibold text-emerald-800">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Subtitle / Tagline اختيارية */}
      {subtitle && (
        <span className="text-emerald-700 font-semibold text-sm tracking-wide">
          {subtitle}
        </span>
      )}



    </div>
  );
};