import { type NextRequest, NextResponse } from "next/server"

// Mock database for check-ins
const checkinDatabase: Record<string, { checkedInAt: string }> = {}

// Mock attendee database
const attendeeDatabase: Record<string, any> = {
  "GALA-1234567890-ABC123DEF": {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    division: "Science",
    school: "Central School",
  },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ticketId } = body

    if (!ticketId) {
      return NextResponse.json({ success: false, message: "Ticket ID is required" }, { status: 400 })
    }

    // Check if ticket exists
    const attendee = attendeeDatabase[ticketId]
    if (!attendee) {
      return NextResponse.json({ success: false, message: "Ticket not found" }, { status: 404 })
    }

    // Check if already checked in
    if (checkinDatabase[ticketId]) {
      return NextResponse.json(
        {
          success: false,
          message: "Already checked in",
          attendee: {
            name: `${attendee.firstName} ${attendee.lastName}`,
            email: attendee.email,
            division: attendee.division,
            school: attendee.school,
          },
        },
        { status: 409 },
      )
    }

    // Mark as checked in
    checkinDatabase[ticketId] = {
      checkedInAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: "Check-in successful",
      attendee: {
        name: `${attendee.firstName} ${attendee.lastName}`,
        email: attendee.email,
        division: attendee.division,
        school: attendee.school,
      },
    })
  } catch (error) {
    console.error("Check-in error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
