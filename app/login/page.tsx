import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { signInWithGoogle } from "./action";

export default async function LoginPage(props: { 
  searchParams: Promise<{ next?: string }> 
}) {
  const searchParams = await props.searchParams;
  const next = searchParams.next;

  // We use .bind to create a server-side "pre-filled" version of the action
  const signInAction = signInWithGoogle.bind(null, next);

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg border border-slate-200 text-center">
        <h1 className="text-2xl font-bold mb-2">Restaurant Management System</h1>
        <p className="text-slate-500 mb-8 text-sm">Admin Dashboard Access</p>
        
        {/* Pass the bound action directly to the form */}
        <form action={signInAction}>
          <Button variant="outline" type="submit" className="w-full flex items-center gap-3 py-6 text-lg">
            <Chrome className="w-5 h-5" />
            Sign in with Google
          </Button>
        </form>
        
        <p className="mt-6 text-xs text-slate-400">
          Authorized personnel only.
        </p>
      </div>
    </div>
  );
}