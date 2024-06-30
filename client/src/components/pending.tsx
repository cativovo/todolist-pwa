import { Loader2 } from "lucide-react";

export default function Pending() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
