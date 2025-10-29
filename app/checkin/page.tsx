import { QRScanner } from "@/components/qr-scanner"
import { Card } from "@/components/ui/card"

export default function CheckinPage() {
  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Event Check-in</h1>
          <p className="text-foreground/70">Scan QR codes to check in attendees</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scanner */}
          <div className="lg:col-span-2">
            <QRScanner />
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-foreground/60 mb-2">Total Checked In</h3>
              <p className="text-4xl font-bold text-primary">0</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-foreground/60 mb-2">Pending</h3>
              <p className="text-4xl font-bold text-secondary">0</p>
            </Card>
            <Card className="p-6 bg-blue-50 border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Tips</h3>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Ensure good lighting</li>
                <li>• Hold camera steady</li>
                <li>• Position QR code in frame</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
