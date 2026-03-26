function SkeletonCell({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-[#E9ECEF] ${className ?? "h-4 w-24"}`}
    />
  );
}

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-[#e2e2e2] border-l-4 border-l-transparent">
          <td className="w-12 py-4 pl-5 pr-2">
            <div className="h-[22px] w-[22px] animate-pulse rounded-[4px] bg-[#E9ECEF]" />
          </td>

          <td className="p-4">
            <div className="flex min-w-0 items-center gap-4">
              <div className="h-12 w-12 shrink-0 animate-pulse rounded-lg bg-[#E9ECEF]" />
              <div className="min-w-0 space-y-2">
                <SkeletonCell className="h-5 w-[220px] max-w-full" />
                <SkeletonCell className="h-4 w-[140px]" />
              </div>
            </div>
          </td>

          <td className="p-4 text-center whitespace-nowrap">
            <SkeletonCell className="mx-auto h-5 w-24" />
          </td>

          <td className="p-4 text-center whitespace-nowrap">
            <SkeletonCell className="mx-auto h-5 w-24" />
          </td>

          <td className="p-4 text-center whitespace-nowrap">
            <SkeletonCell className="mx-auto h-5 w-16" />
          </td>

          <td className="p-4 text-center whitespace-nowrap">
            <SkeletonCell className="mx-auto h-5 w-20" />
          </td>

          <td className="py-3 pr-3 whitespace-nowrap">
            <div className="flex items-center gap-8">
              <div className="h-[27px] w-[52px] animate-pulse rounded-3xl bg-[#E9ECEF]" />
              <div className="h-8 w-8 animate-pulse rounded-full bg-[#E9ECEF]" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
