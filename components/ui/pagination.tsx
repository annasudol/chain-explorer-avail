import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { PageInfoType } from "@/types";

type PaginationProps = {
  cursor?: string;
  setCursor: (cursor?: string) => void;
  pageInfo?: PageInfoType | null;
};

const Pagination = ({ cursor, setCursor, pageInfo }: PaginationProps) => (
  <div className="mt-4 flex items-center justify-end space-x-2">
    <Button
      variant="outline"
      size="sm"
      onClick={() => setCursor(undefined)}
      disabled={!cursor}
    >
      <ChevronLeft className="mr-1 size-4" /> First Page
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        if (pageInfo?.hasNextPage && pageInfo?.endCursor) {
          setCursor(pageInfo.endCursor);
        }
      }}
      disabled={!pageInfo?.hasNextPage}
    >
      Next Page <ChevronRight className="ml-1 size-4" />
    </Button>
  </div>
);

export { Pagination };
