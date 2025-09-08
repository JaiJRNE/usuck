import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Globe, Award, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">About VICO</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              For over 25 years, Vaibhav International has been a trusted name in the global gemstone industry,
              specializing in ethically sourced premium sapphires, rubies, and emeralds.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 1999 in Bangkok, Thailand, VICO by Vaibhav International began as a small family business
                  with a vision to connect the world's finest gemstones with discerning manufacturers and retailers
                  globally. Located in the heart of Bangkok's jewelry district at the Jewellery Trade Center on Silom
                  Road, we are strategically positioned at the center of Southeast Asia's gemstone trade.
                </p>
                <p>
                  Today, we are proud to be one of Thailand's leading B2B gemstone suppliers, with direct relationships
                  with mines across Southeast Asia, Africa, and South America. Our commitment to ethical sourcing and
                  exceptional quality has earned us the trust of jewelry manufacturers, retailers, and designers in over
                  40 countries.
                </p>
                <p>
                  Every gemstone in our collection is carefully selected for its beauty, authenticity, and ethical
                  provenance. We believe that the true value of a gemstone lies not just in its physical beauty, but in
                  the story of its journey from mine to market.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Ethical Gemstone Sourcing"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Ethical Sourcing</h3>
                <p className="text-gray-600">
                  We maintain strict ethical standards in our sourcing practices, ensuring fair trade and supporting
                  local mining communities while protecting the environment.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Award className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Quality Assurance</h3>
                <p className="text-gray-600">
                  Every gemstone undergoes rigorous quality control and certification processes. We work with leading
                  gemological institutes to guarantee authenticity and quality.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Users className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Partnership Focus</h3>
                <p className="text-gray-600">
                  We build long-term relationships with our B2B clients, providing personalized service, competitive
                  pricing, and reliable supply chains for sustainable business growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Sourcing Network</h2>
            <p className="text-xl text-gray-600">Direct relationships with mines and suppliers worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Sri Lanka</h3>
                <p className="text-sm text-gray-600">Premium sapphires from the gem capital of the world</p>
                <Badge className="mt-2">Sapphires</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Myanmar</h3>
                <p className="text-sm text-gray-600">Exceptional rubies including pigeon blood varieties</p>
                <Badge className="mt-2 bg-red-600">Rubies</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Colombia</h3>
                <p className="text-sm text-gray-600">World-renowned emeralds with vivid green color</p>
                <Badge className="mt-2 bg-green-600">Emeralds</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Madagascar</h3>
                <p className="text-sm text-gray-600">Diverse range of colored gemstones and sapphires</p>
                <Badge className="mt-2">Multi-Gem</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications & Partnerships</h2>
            <p className="text-xl text-gray-600">Trusted by leading gemological institutes</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="GIA Certification"
                  width={120}
                  height={80}
                  className="mx-auto"
                />
              </div>
              <p className="mt-2 text-sm font-medium">GIA Certified</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="GRS Certification"
                  width={120}
                  height={80}
                  className="mx-auto"
                />
              </div>
              <p className="mt-2 text-sm font-medium">GRS Certified</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="AIGS Certification"
                  width={120}
                  height={80}
                  className="mx-auto"
                />
              </div>
              <p className="mt-2 text-sm font-medium">AIGS Certified</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="Ethical Trade"
                  width={120}
                  height={80}
                  className="mx-auto"
                />
              </div>
              <p className="mt-2 text-sm font-medium">Ethical Trade</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership</h2>
            <p className="text-xl text-gray-600">Experienced professionals dedicated to excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Vaibhav Sharma"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Vaibhav Sharma</h3>
                <p className="text-blue-600 font-medium mb-2">Founder & CEO</p>
                <p className="text-sm text-gray-600">
                  25+ years in gemstone trading with expertise in Asian and African markets
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Dr. Priya Patel"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Dr. Priya Patel</h3>
                <p className="text-blue-600 font-medium mb-2">Chief Gemologist</p>
                <p className="text-sm text-gray-600">
                  GIA Graduate Gemologist with specialization in colored stone identification
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Michael Chen"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Michael Chen</h3>
                <p className="text-blue-600 font-medium mb-2">Head of Operations</p>
                <p className="text-sm text-gray-600">
                  International trade expert managing global supply chain and logistics
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
