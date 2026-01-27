import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-5">
      <ShieldAlert size={64} className="text-red-500 mb-4" />
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p className="text-muted-foreground mt-2 max-w-sm">
        You do not have administrative privileges to access this area of EPIC Trading PLC.
      </p>
      <Button asChild className="mt-6">
        <Link href="/login">Back to Login</Link>
      </Button>
    </div>
  );
}