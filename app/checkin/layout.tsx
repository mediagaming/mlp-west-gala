import type React from "react"
import { redirect } from "next/navigation"
import { getAuthToken } from "@/lib/auth"

export default async function CheckinLayout({ children }: { children: React.ReactNode }) {
  const token = await getAuthToken()

  if (!token) {
    redirect("/login")
  }

  return <>{children}</>
}
