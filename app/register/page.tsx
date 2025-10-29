import { RegistrationForm } from "@/components/registration-form"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Register for the Gala</h1>
          <p className="text-foreground/70">Secure your spot at the most anticipated event of the year</p>
        </div>
        <RegistrationForm />
      </div>
    </main>
  )
}
