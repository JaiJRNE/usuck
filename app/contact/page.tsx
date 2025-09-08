"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, MessageCircle, Clock, Globe } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    gemType: "",
    quantity: "",
    budget: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Thank you for your inquiry! We'll get back to you within 24 hours.")
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to source premium gemstones for your business? Get in touch with our B2B team for wholesale pricing,
            custom sourcing, and expert consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">VICO by Vaibhav International</p>
                  <p className="text-gray-600">2nd Floor, Room 241</p>
                  <p className="text-gray-600">Jewellery Trade Center Bldg</p>
                  <p className="text-gray-600">Silom Rd, Bang Rak</p>
                  <p className="text-gray-600">Bangkok 10500, Thailand</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-blue-600" />
                  Phone & WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Main Office</p>
                    <p className="text-gray-600">+66 2 267 4124</p>
                  </div>
                  <div>
                    <p className="font-medium">WhatsApp (24/7)</p>
                    <p className="text-gray-600">+66 2 267 4124</p>
                    <Button asChild size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                      <a href="https://wa.me/6622674124">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-600" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium">General Inquiries</p>
                    <p className="text-gray-600">info@vico-gems.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Sales Team</p>
                    <p className="text-gray-600">sales@vico-gems.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">* WhatsApp support available 24/7 for urgent inquiries</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us an Inquiry</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and our team will respond within 24 hours with pricing and availability.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="gemType">Gemstone Interest</Label>
                      <Select onValueChange={(value) => handleChange("gemType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gemstone type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sapphires">Sapphires</SelectItem>
                          <SelectItem value="rubies">Rubies</SelectItem>
                          <SelectItem value="emeralds">Emeralds</SelectItem>
                          <SelectItem value="mixed">Mixed Collection</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Estimated Quantity</Label>
                      <Select onValueChange={(value) => handleChange("quantity", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select quantity range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 pieces</SelectItem>
                          <SelectItem value="11-50">11-50 pieces</SelectItem>
                          <SelectItem value="51-100">51-100 pieces</SelectItem>
                          <SelectItem value="100+">100+ pieces</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget Range (USD)</Label>
                      <Select onValueChange={(value) => handleChange("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-5k">Under $5,000</SelectItem>
                          <SelectItem value="5k-25k">$5,000 - $25,000</SelectItem>
                          <SelectItem value="25k-100k">$25,000 - $100,000</SelectItem>
                          <SelectItem value="100k+">$100,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Please describe your specific requirements, including preferred shapes, sizes, colors, treatments, and any other details that would help us provide you with the best selection..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Inquiry
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    By submitting this form, you agree to our privacy policy. We'll only use your information to respond
                    to your inquiry.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Global Shipping</h3>
              <p className="text-sm text-gray-600">Secure worldwide shipping with full insurance and tracking</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">WhatsApp support available around the clock for urgent needs</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Quick Response</h3>
              <p className="text-sm text-gray-600">All inquiries answered within 24 hours with detailed quotes</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
