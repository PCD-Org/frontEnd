export const PageHeader = ({
  title,
  description,
  variant = 'light',
  image,
  imageBadge,
  className = '',
}) => {
  const isDark = variant === 'dark';
  return (
    <div 
      className={`w-full py-16 md:py-18 transition-colors ${
        isDark ? 'bg-emerald-950 text-white' : 'bg-transparent text-gray-900'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className={`flex flex-col gap-4 ${
          image 
            ? 'w-full md:w-1/2' 
            : 'w-full max-w-3xl text-right' 
        }`}>
          {/* Title */}
          <h1 className={`text-4xl md:text-5xl font-black leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h1>
          {/* Description */}
          {description && (
            <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {description}
            </p>
          )}
        </div>
        {image && (
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <div className="overflow-hidden rounded-3xl shadow-sm border border-gray-100">
                <img 
                  src={image} 
                  alt={typeof title === 'string' ? title : 'Page Header Image'} 
                  className="w-full h-72 md:h-80 object-cover block" 
                />
              </div>

              {imageBadge && (
                <div className="absolute -bottom-4 right-0 transform translate-x-1/4 bg-[#fcd39d] text-[#6b3d16] px-4 py-3.5 rounded-2xl text-center shadow-md font-bold flex flex-col items-center justify-center leading-tight z-10">
                  <span>{typeof imageBadge === 'object' ? imageBadge.year : '2023'}</span>
                  <span className="text-[11px] font-normal opacity-90 mt-0.5">
                    {typeof imageBadge === 'object' 
                      ? imageBadge.text 
                      : imageBadge.replace(/[0-9]/g, '').trim()} 
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};