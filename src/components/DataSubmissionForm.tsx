import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

const DataSubmissionForm = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) {
      toast({
        title: "Validation Error",
        description: "Please enter a message to submit",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate submitting data to the blockchain
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Data Submitted",
        description: "Your message has been submitted to the Avail network",
      });

      // Reset form
      setMessage("");
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-avail-blue" />
          Submit Data
        </CardTitle>
        <CardDescription>
          Submit arbitrary data to the Avail network
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitData} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Input
              id="message"
              placeholder="Enter a message to store on Avail"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              This will be permanently stored on the Avail blockchain
            </p>
          </div>

          <Separator />

          <Button
            type="submit"
            className="w-full bg-avail-blue hover:bg-avail-indigo"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Data"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DataSubmissionForm;
