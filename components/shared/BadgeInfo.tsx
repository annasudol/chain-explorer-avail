import { Check, X } from "lucide-react";

interface BadgeInfoProps {
  success: boolean;
}

const BadgeInfo = ({ success }: BadgeInfoProps) => {
  return (
    <div className="flex items-center gap-2">
      {success ? (
        <span className="inline-flex items-center text-xs font-medium text-green-600">
          <Check className="mr-1 size-3" /> Success
        </span>
      ) : (
        <span className="inline-flex items-center text-xs font-medium text-red-600">
          <X className="mr-1 size-3" /> Failed
        </span>
      )}
    </div>
  );
};

export default BadgeInfo;
