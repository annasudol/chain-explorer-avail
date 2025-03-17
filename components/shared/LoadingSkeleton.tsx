import { Skeleton } from "../ui/skeleton";

const LoadingSkeleton = () => (
  <>
    {Array(10)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="py-2">
          <Skeleton className="h-12 w-full" />
        </div>
      ))
    }
  </>
);
export default LoadingSkeleton;