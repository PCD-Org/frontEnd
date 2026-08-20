export default function ActivityCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading activity"
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
    >
      {/* Image Skeleton */}
      <div className="relative h-56 w-full animate-pulse bg-gray-200">
        {/* Category Badge Skeleton */}
        <div className="absolute top-4 left-4 h-7 w-20 rounded-full bg-gray-300" />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col p-6 text-start">
        {/* Date Skeleton */}
        <div className="mb-3 flex items-center gap-2">
          <div className="h-3.5 w-3.5 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
        </div>

        {/* Title Skeleton */}
        <div className="mb-2 h-6 w-3/4 rounded bg-gray-200 animate-pulse" />
        <div className="mb-4 h-6 w-1/2 rounded bg-gray-200 animate-pulse" />

        {/* Description Skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-4 w-full rounded bg-gray-100 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-gray-100 animate-pulse" />
          <div className="h-4 w-2/3 rounded bg-gray-100 animate-pulse" />
        </div>

        {/* Read More Link Skeleton */}
        <div className="mt-6 flex items-center gap-2">
          <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
