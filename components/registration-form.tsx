"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle } from "lucide-react"

interface FormData {
  firstName: string
  lastName: string
  email: string
  mobile: string
  dateOfBirth: string
  division: string
  school: string
}

interface FormErrors {
  [key: string]: string
}

const DIVISIONS = ["Science", "Commerce", "Humanities", "Other"]
const SCHOOLS = ["Central School", "St. Mary's Academy", "Delhi Public School", "Kendriya Vidyalaya", "Other"]

export function RegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dateOfBirth: "",
    division: "",
    school: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [successMessage, setSuccessMessage] = useState("")
  const [ticketId, setTicketId] = useState("")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Validate mobile (10 digits)
    const mobileRegex = /^[0-9]{10}$/
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required"
    } else if (!mobileRegex.test(formData.mobile.replace(/\D/g, ""))) {
      newErrors.mobile = "Mobile number must be 10 digits"
    }

    // Validate date of birth
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    } else {
      const dob = new Date(formData.dateOfBirth)
      const today = new Date()
      let age = today.getFullYear() - dob.getFullYear()
      const monthDiff = today.getMonth() - dob.getMonth()

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--
      }

      if (age < 14) {
        newErrors.dateOfBirth = "You must be at least 14 years old to register"
      }
      if (age > 25) {
        newErrors.dateOfBirth = "Age must be between 14 and 25 for higher secondary students"
      }
    }

    // Validate division
    if (!formData.division) {
      newErrors.division = "Division is required"
    }

    // Validate school
    if (!formData.school) {
      newErrors.school = "School is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      const data = await response.json()
      setTicketId(data.ticketId)
      setSubmitStatus("success")
      setSuccessMessage(`Registration successful! Your ticket ID: ${data.ticketId}`)

      // Redirect to ticket page after 2 seconds
      setTimeout(() => {
        router.push(`/ticket?id=${data.ticketId}`)
      }, 2000)

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        dateOfBirth: "",
        division: "",
        school: "",
      })
    } catch (error) {
      setSubmitStatus("error")
      console.error("Registration error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-8 border border-border">
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900">Registration Successful!</h3>
            <p className="text-green-800 text-sm mt-1">{successMessage}</p>
            <p className="text-green-800 text-sm mt-2">Redirecting to your ticket...</p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Registration Failed</h3>
            <p className="text-red-800 text-sm mt-1">Please try again or contact support.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Mobile and DOB */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="9876543210"
              maxLength="10"
              className={errors.mobile ? "border-red-500" : ""}
            />
            {errors.mobile && <p className="text-sm text-red-600">{errors.mobile}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className={errors.dateOfBirth ? "border-red-500" : ""}
            />
            {errors.dateOfBirth && <p className="text-sm text-red-600">{errors.dateOfBirth}</p>}
          </div>
        </div>

        {/* Division and School */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="division">Division *</Label>
            <Select value={formData.division} onValueChange={(value) => handleSelectChange("division", value)}>
              <SelectTrigger id="division" className={errors.division ? "border-red-500" : ""}>
                <SelectValue placeholder="Select division" />
              </SelectTrigger>
              <SelectContent>
                {DIVISIONS.map((div) => (
                  <SelectItem key={div} value={div}>
                    {div}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.division && <p className="text-sm text-red-600">{errors.division}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="school">School *</Label>
            <Select value={formData.school} onValueChange={(value) => handleSelectChange("school", value)}>
              <SelectTrigger id="school" className={errors.school ? "border-red-500" : ""}>
                <SelectValue placeholder="Select school" />
              </SelectTrigger>
              <SelectContent>
                {SCHOOLS.map((school) => (
                  <SelectItem key={school} value={school}>
                    {school}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.school && <p className="text-sm text-red-600">{errors.school}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold"
        >
          {isSubmitting ? "Registering..." : "Complete Registration"}
        </Button>

        <p className="text-sm text-foreground/60 text-center">By registering, you agree to our terms and conditions</p>
      </form>
    </Card>
  )
}
