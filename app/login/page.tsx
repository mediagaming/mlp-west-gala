import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">GALA Admin</h1>
          <p className="text-foreground/70">Sign in to access the admin dashboard</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
