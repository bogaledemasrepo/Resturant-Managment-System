import { AdminLayoutShell } from "@/components/layout-shell";
import { Toaster } from "@/components/ui/sonner";
import { isAdmin } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authorized = await isAdmin();

  if (!authorized) {
    // Redirect to home or a 403 unauthorized page
    redirect("/login");
  }

  return (
    <>
      <AdminLayoutShell>{children}</AdminLayoutShell>
      <Toaster position="top-right" richColors />
    </>
  );
}