import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">GALA</div>
          <div className="flex items-center gap-6">
            <Link href="#events" className="text-foreground hover:text-primary transition">
              Events
            </Link>
            <Link href="#about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/register" className="text-foreground hover:text-primary transition">
              Register
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/register">Get Tickets</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">
                <span className="text-primary">Higher Secondary</span> Students'{" "}
                <span className="text-secondary">Gala</span>
              </h1>
              <p className="text-xl text-foreground/80 text-balance leading-relaxed">
                Join us for an unforgettable evening celebrating excellence, talent, and community. Experience
                world-class performances and connect with peers from across the region.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/register">Register Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#events">Learn More</Link>
                </Button>
              </div>
              <div className="flex gap-8 pt-8 text-sm">
                <div>
                  <div className="font-bold text-primary text-lg">500+</div>
                  <div className="text-foreground/60">Expected Attendees</div>
                </div>
                <div>
                  <div className="font-bold text-secondary text-lg">10+</div>
                  <div className="text-foreground/60">Performances</div>
                </div>
                <div>
                  <div className="font-bold text-primary text-lg">1 Night</div>
                  <div className="text-foreground/60">Unforgettable</div>
                </div>
              </div>
            </div>
            <div className="relative h-96 sm:h-full min-h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎭</div>
                <p className="text-foreground/60">Premium Event Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 sm:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Event Highlights</h2>
            <p className="text-xl text-foreground/70">Experience the best performances and activities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Opening Ceremony",
                description: "Grand opening with spectacular performances and welcome address",
                icon: "🎪",
                color: "primary",
              },
              {
                title: "Dance Performances",
                description: "Contemporary and classical dance performances by talented students",
                icon: "💃",
                color: "secondary",
              },
              {
                title: "Music Showcase",
                description: "Live band performances and solo artists showcasing their talent",
                icon: "🎵",
                color: "primary",
              },
              {
                title: "Drama & Theater",
                description: "Engaging theatrical performances and comedy sketches",
                icon: "🎬",
                color: "secondary",
              },
              {
                title: "Talent Hunt",
                description: "Discover hidden talents with our interactive talent competition",
                icon: "⭐",
                color: "primary",
              },
              {
                title: "Networking & Dinner",
                description: "Enjoy delicious food and connect with peers and mentors",
                icon: "🍽️",
                color: "secondary",
              },
            ].map((event, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow border border-border">
                <div className="text-4xl mb-4">{event.icon}</div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-foreground/70">{event.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-foreground/70 mb-8 text-balance">
            Secure your spot at the most anticipated event of the year. Limited tickets available!
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/register">Get Your Ticket Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">GALA</h3>
              <p className="text-foreground/60">Celebrating excellence and talent</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-foreground/60">
                <li>
                  <Link href="#events" className="hover:text-primary transition">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-primary transition">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-foreground/60">Email: info@gala.event</p>
              <p className="text-foreground/60">Phone: +1 (555) 123-4567</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4 text-foreground/60">
                <Link href="#" className="hover:text-primary transition">
                  Twitter
                </Link>
                <Link href="#" className="hover:text-primary transition">
                  Instagram
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-foreground/60">
            <p>&copy; 2025 Higher Secondary Students' Gala. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
