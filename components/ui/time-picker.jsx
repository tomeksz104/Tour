import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TimePicker() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Select Time</CardTitle>
        <CardDescription>Choose a suitable time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <ClockIcon className="w-5 h-5" />
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="time">Time</Label>
            <Input
              aria-label="Choose time"
              className="w-full"
              id="time"
              type="time"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Time</Button>
      </CardFooter>
    </Card>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
