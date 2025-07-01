import { Layout } from "@/components/layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function LessonsLoading() {
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col gap-6">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>

          <Skeleton className="h-10 w-72 mb-6" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border bg-card">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-6" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
