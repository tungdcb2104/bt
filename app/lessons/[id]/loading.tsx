import { Layout } from "@/components/layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function LessonLoading() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-6" />
        <Skeleton className="h-80 w-full mb-4" />
        <div className="flex justify-between">
          <Skeleton className="h-10 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </Layout>
  )
}
