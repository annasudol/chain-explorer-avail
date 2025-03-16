import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const ActionsDemoAlert = () => {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Demo Mode</AlertTitle>
      <AlertDescription>
        This is a simulation. No actual transactions will be sent to the
        blockchain.
      </AlertDescription>
    </Alert>
  );
};

export default ActionsDemoAlert;
