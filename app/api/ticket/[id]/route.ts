import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, use a real database
const ticketsDatabase: Record<string, any> = {
  "GALA-1234567890-ABC123DEF": {
    ticketId: "GALA-1234567890-ABC123DEF",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    division: "Science",
    school: "Central School",
    registeredAt: new Date().toISOString(),
  },
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ticketId = params.id

    // In production, fetch from database
    const ticket = ticketsDatabase[ticketId]

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    return NextResponse.json(ticket)
  } catch (error) {
    console.error("Error fetching ticket:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
