import { type NextRequest, NextResponse } from "next/server"

// Mock admin credentials - in production, use a real database
const ADMIN_CREDENTIALS = {
  email: "admin@gala.event",
  password: "admin123",
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Validate credentials
    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Create response with auth cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
      },
      { status: 200 },
    )

    // Set auth cookie (in production, use secure, httpOnly cookies)
    response.cookies.set("auth_token", "gala_admin_token_" + Date.now(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
