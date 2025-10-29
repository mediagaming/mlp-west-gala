"use client"

import { useSearchParams } from "next/navigation"
import { TicketDisplay } from "@/components/ticket-display"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TicketPage() {
  const searchParams = useSearchParams()
  const ticketId = searchParams.get("id")

  if (!ticketId) {
    return (
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Ticket Not Found</h1>
            <p className="text-foreground/70 mb-6">Please register first to get your ticket.</p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/register">Go to Registration</Link>
            </Button>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Gala Ticket</h1>
          <p className="text-foreground/70">Save or share your ticket for the event</p>
        </div>
        <TicketDisplay ticketId={ticketId} />
      </div>
    </main>
  )
}
