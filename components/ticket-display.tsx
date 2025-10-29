"use client"

import { useEffect, useRef, useState } from "react"
import QRCode from "qrcode.react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2, Copy, Check } from "lucide-react"
import html2canvas from "html2canvas"

interface TicketData {
  ticketId: string
  firstName: string
  lastName: string
  email: string
  division: string
  school: string
  registeredAt: string
}

export function TicketDisplay({ ticketId }: { ticketId: string }) {
  const [ticketData, setTicketData] = useState<TicketData | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const ticketRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch ticket data
    const fetchTicket = async () => {
      try {
        const response = await fetch(`/api/ticket/${ticketId}`)
        if (response.ok) {
          const data = await response.json()
          setTicketData(data)
        }
      } catch (error) {
        console.error("Error fetching ticket:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTicket()
  }, [ticketId])

  const handleDownload = async () => {
    if (!ticketRef.current) return

    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      })
      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = `gala-ticket-${ticketId}.png`
      link.click()
    } catch (error) {
      console.error("Error downloading ticket:", error)
    }
  }

  const handleShare = async () => {
    const ticketUrl = `${window.location.origin}/ticket?id=${ticketId}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Gala Event Ticket",
          text: "Check out my ticket for the Higher Secondary Students' Gala!",
          url: ticketUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(ticketUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleCopyLink = () => {
    const ticketUrl = `${window.location.origin}/ticket?id=${ticketId}`
    navigator.clipboard.writeText(ticketUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <Card className="p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-4"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </Card>
    )
  }

  if (!ticketData) {
    return (
      <Card className="p-8 text-center">
        <p className="text-foreground/70">Ticket not found. Please check your ticket ID.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Ticket Card */}
      <div
        ref={ticketRef}
        className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary rounded-2xl overflow-hidden shadow-lg"
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-dashed border-primary/30">
            <div>
              <h2 className="text-3xl font-bold text-primary">GALA</h2>
              <p className="text-sm text-foreground/60">Higher Secondary Students' Event</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-foreground/60 uppercase tracking-wider">Ticket ID</p>
              <p className="text-lg font-mono font-bold text-primary">{ticketId}</p>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Attendee Info */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <p className="text-xs text-foreground/60 uppercase tracking-wider mb-1">Attendee Name</p>
                <p className="text-2xl font-bold">
                  {ticketData.firstName} {ticketData.lastName}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wider mb-1">Division</p>
                  <p className="font-semibold">{ticketData.division}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wider mb-1">School</p>
                  <p className="font-semibold">{ticketData.school}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-foreground/60 uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm">{ticketData.email}</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg border-2 border-primary/20">
              <QRCode value={ticketId} size={150} level="H" includeMargin={true} />
              <p className="text-xs text-foreground/60 mt-2 text-center">Scan for check-in</p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-dashed border-primary/30 pt-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-foreground/60 uppercase tracking-wider mb-1">Registered</p>
              <p className="text-sm font-semibold">{new Date(ticketData.registeredAt).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-foreground/60 uppercase tracking-wider mb-1">Event Date</p>
              <p className="text-sm font-semibold">TBD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleDownload} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Download className="w-4 h-4 mr-2" />
          Download Ticket
        </Button>
        <Button onClick={handleShare} variant="outline" className="flex-1 bg-transparent">
          <Share2 className="w-4 h-4 mr-2" />
          Share Ticket
        </Button>
        <Button onClick={handleCopyLink} variant="outline" className="flex-1 bg-transparent">
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? "Copied!" : "Copy Link"}
        </Button>
      </div>

      {/* Info Box */}
      <Card className="p-4 bg-secondary/5 border border-secondary/20">
        <h3 className="font-semibold mb-2">Important Information</h3>
        <ul className="text-sm text-foreground/70 space-y-1">
          <li>• Keep your ticket safe and bring it to the event</li>
          <li>• Your QR code will be scanned at check-in</li>
          <li>• You can download or share your ticket anytime</li>
          <li>• Check your email for event updates and details</li>
        </ul>
      </Card>
    </div>
  )
}
