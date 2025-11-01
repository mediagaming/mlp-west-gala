import type React from "react";
import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/auth";
import { AdminHeader } from "@/components/admin-header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAuthToken();

  if (!token || !token.startsWith("gala_admin_token_")) {
    redirect("/login");
  }

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
