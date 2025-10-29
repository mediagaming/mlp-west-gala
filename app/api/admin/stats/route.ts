import { type NextRequest, NextResponse } from "next/server"

// Mock data - in production, fetch from database
const mockAttendees = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    division: "Science",
    school: "Central School",
    registeredAt: new Date(Date.now() - 86400000).toISOString(),
    checkedIn: true,
    checkedInAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    division: "Commerce",
    school: "St. Mary's Academy",
    registeredAt: new Date(Date.now() - 172800000).toISOString(),
    checkedIn: false,
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike@example.com",
    division: "Science",
    school: "Delhi Public School",
    registeredAt: new Date(Date.now() - 259200000).toISOString(),
    checkedIn: true,
    checkedInAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah@example.com",
    division: "Humanities",
    school: "Kendriya Vidyalaya",
    registeredAt: new Date(Date.now() - 345600000).toISOString(),
    checkedIn: false,
  },
  {
    id: "5",
    firstName: "Alex",
    lastName: "Brown",
    email: "alex@example.com",
    division: "Science",
    school: "Central School",
    registeredAt: new Date(Date.now() - 432000000).toISOString(),
    checkedIn: true,
    checkedInAt: new Date(Date.now() - 1800000).toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const totalRegistrations = mockAttendees.length
    const checkedIn = mockAttendees.filter((a) => a.checkedIn).length
    const pending = totalRegistrations - checkedIn

    // Division breakdown
    const divisionMap: Record<string, number> = {}
    mockAttendees.forEach((a) => {
      divisionMap[a.division] = (divisionMap[a.division] || 0) + 1
    })
    const divisionBreakdown = Object.entries(divisionMap).map(([name, value]) => ({ name, value }))

    // School breakdown
    const schoolMap: Record<string, number> = {}
    mockAttendees.forEach((a) => {
      schoolMap[a.school] = (schoolMap[a.school] || 0) + 1
    })
    const schoolBreakdown = Object.entries(schoolMap).map(([name, value]) => ({ name, value }))

    return NextResponse.json({
      stats: {
        totalRegistrations,
        checkedIn,
        pending,
        divisionBreakdown,
        schoolBreakdown,
      },
      attendees: mockAttendees,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
