function SkeletonCell({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-[#E9ECEF] ${className ?? 'h-4 w-24'}`} />
  )
}

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-border border-l-4 border-l-transparent">
          <td className="w-10 py-3 pl-4 pr-2">
            <div className="h-4 w-4 animate-pulse rounded bg-[#E9ECEF]" />
          </td>
          <td className="w-12 py-3 pr-3">
            <div className="h-10 w-10 animate-pulse rounded-lg bg-[#E9ECEF]" />
          </td>
          <td className="py-3 pr-4">
            <div className="space-y-1.5">
              <SkeletonCell className="h-3.5 w-36" />
              <SkeletonCell className="h-3 w-20" />
            </div>
          </td>
          <td className="py-3 pr-4">
            <SkeletonCell className="h-3.5 w-20" />
          </td>
          <td className="py-3 pr-4">
            <SkeletonCell className="h-3.5 w-20" />
          </td>
          <td className="py-3 pr-4">
            <SkeletonCell className="h-3.5 w-12" />
          </td>
          <td className="py-3 pr-4">
            <SkeletonCell className="h-3.5 w-20" />
          </td>
          <td className="py-3 pr-4">
            <div className="flex gap-2">
              <div className="h-8 w-8 animate-pulse rounded-lg bg-[#E9ECEF]" />
              <div className="h-8 w-8 animate-pulse rounded-full bg-[#E9ECEF]" />
            </div>
          </td>
        </tr>
      ))}
    </>
  )
}
