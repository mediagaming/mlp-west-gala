import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, use a real database
const registrations: Record<string, any> = {}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { firstName, lastName, email, mobile, dateOfBirth, division, school } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !mobile || !dateOfBirth || !division || !school) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if already registered
    if (registrations[email]) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Generate ticket ID
    const ticketId = `GALA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Store registration
    registrations[email] = {
      firstName,
      lastName,
      email,
      mobile,
      dateOfBirth,
      division,
      school,
      ticketId,
      registeredAt: new Date().toISOString(),
    }

    return NextResponse.json(
      {
        success: true,
        ticketId,
        message: "Registration successful",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
