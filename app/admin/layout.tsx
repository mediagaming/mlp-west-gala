import type React from "react"
import { redirect } from "next/navigation"
import { getAuthToken } from "@/lib/auth"
import { AdminHeader } from "@/components/admin-header"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = await getAuthToken()

  if (!token) {
    redirect("/login")
  }

  return (
    <>
      <AdminHeader />
      {children}
    </>
  )
}
