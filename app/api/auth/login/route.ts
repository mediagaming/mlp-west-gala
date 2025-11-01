import { type NextRequest, NextResponse } from "next/server";

// Mock admin credentials - in production, use a real database
const users = [
  {
    email: "admin@gala.event",
    password: "admin123",
    role: "admin",
  },
  {
    email: "checkadmin@gala.event",
    password: "checkadmin123",
    role: "check",
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    // Validate credentials
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create response with auth cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        role: user.role,
      },
      { status: 200 }
    );

    // Set auth cookie (in production, use secure, httpOnly cookies)
    response.cookies.set(
      "auth_token",
      (user.role === "admin" ? "gala_admin_token_" : "gala_check_token_") +
        Date.now(),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86400 * 7, // 7 days
      }
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
