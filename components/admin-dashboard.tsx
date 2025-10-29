"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Download, Search, Users, CheckCircle, Clock } from "lucide-react"

interface Attendee {
  id: string
  firstName: string
  lastName: string
  email: string
  division: string
  school: string
  registeredAt: string
  checkedIn: boolean
  checkedInAt?: string
}

interface Stats {
  totalRegistrations: number
  checkedIn: number
  pending: number
  divisionBreakdown: Array<{ name: string; value: number }>
  schoolBreakdown: Array<{ name: string; value: number }>
}

const COLORS = ["#dc2626", "#2563eb", "#16a34a", "#ea580c", "#7c3aed", "#0891b2"]

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalRegistrations: 0,
    checkedIn: 0,
    pending: 0,
    divisionBreakdown: [],
    schoolBreakdown: [],
  })
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [filteredAttendees, setFilteredAttendees] = useState<Attendee[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch dashboard data
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data.stats)
          setAttendees(data.attendees)
          setFilteredAttendees(data.attendees)
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const filtered = attendees.filter(
      (attendee) =>
        attendee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredAttendees(filtered)
  }, [searchTerm, attendees])

  const handleExportCSV = () => {
    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Division",
      "School",
      "Registered At",
      "Checked In",
      "Checked In At",
    ]
    const rows = attendees.map((a) => [
      a.firstName,
      a.lastName,
      a.email,
      a.division,
      a.school,
      new Date(a.registeredAt).toLocaleString(),
      a.checkedIn ? "Yes" : "No",
      a.checkedInAt ? new Date(a.checkedInAt).toLocaleString() : "-",
    ])

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `gala-attendees-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-foreground/70">Event analytics and attendee management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/60 mb-1">Total Registrations</p>
              <p className="text-4xl font-bold">{stats.totalRegistrations}</p>
            </div>
            <Users className="w-12 h-12 text-primary/20" />
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/60 mb-1">Checked In</p>
              <p className="text-4xl font-bold text-green-600">{stats.checkedIn}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-600/20" />
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-secondary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/60 mb-1">Pending Check-in</p>
              <p className="text-4xl font-bold text-secondary">{stats.pending}</p>
            </div>
            <Clock className="w-12 h-12 text-secondary/20" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Division Breakdown */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Registrations by Division</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.divisionBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.divisionBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* School Breakdown */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Registrations by School</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.schoolBreakdown}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Attendee List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Attendee List</h3>
          <Button onClick={handleExportCSV} className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-foreground/40" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Name</th>
                <th className="text-left py-3 px-4 font-semibold">Email</th>
                <th className="text-left py-3 px-4 font-semibold">Division</th>
                <th className="text-left py-3 px-4 font-semibold">School</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Registered</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendees.map((attendee) => (
                <tr key={attendee.id} className="border-b border-border hover:bg-muted/50 transition">
                  <td className="py-3 px-4">
                    {attendee.firstName} {attendee.lastName}
                  </td>
                  <td className="py-3 px-4 text-foreground/70">{attendee.email}</td>
                  <td className="py-3 px-4">{attendee.division}</td>
                  <td className="py-3 px-4">{attendee.school}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        attendee.checkedIn ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {attendee.checkedIn ? "Checked In" : "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-foreground/70">
                    {new Date(attendee.registeredAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAttendees.length === 0 && (
          <div className="text-center py-8 text-foreground/60">
            <p>No attendees found matching your search.</p>
          </div>
        )}

        <div className="mt-4 text-sm text-foreground/60">
          Showing {filteredAttendees.length} of {attendees.length} attendees
        </div>
      </Card>
    </div>
  )
}
