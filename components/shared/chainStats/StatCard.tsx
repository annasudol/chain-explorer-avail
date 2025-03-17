import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Skeleton } from "components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  isLoading: boolean;
}

const StatCard = ({ title, value, icon, isLoading }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <Skeleton className="h-7 w-full" />
      ) : (
        <div className="text-2xl font-bold">{value}</div>
      )}
    </CardContent>
  </Card>
);

export default StatCard;
