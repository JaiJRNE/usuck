import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, MessageCircle, Phone, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Ruby data
const getRubyById = (id: string) => {
  const rubies = {
    "rub-001": {
      id: "rub-001",
      name: "Pigeon Blood Ruby",
      shape: "Oval",
      carat: 2.15,
      color: "Pigeon Blood",
      clarity: "VS",
      treatment: "Heated",
      origin: "Myanmar",
      price: 12500,
      images: [
        "/placeholder.svg?height=600&width=600&text=Pigeon+Blood+Ruby",
        "/placeholder.svg?height=600&width=600&text=Ruby+View+2",
        "/placeholder.svg?height=600&width=600&text=Ruby+View+3",
      ],
      dimensions: "8.1 x 6.2 x 4.5 mm",
      gemType: "rubies",
      certification: "GRS Certificate #3234567890",
      description:
        "This exceptional pigeon blood ruby displays the most coveted color in the ruby world. From the legendary mines of Myanmar, this stone represents the pinnacle of ruby quality.",
      specifications: {
        "Carat Weight": "2.15 ct",
        Dimensions: "8.1 x 6.2 x 4.5 mm",
        Shape: "Oval",
        Color: "Pigeon Blood",
        Clarity: "VS (Very Slightly Included)",
        Treatment: "Heated",
        Origin: "Myanmar",
        Certification: "GRS",
        Fluorescence: "Strong Red",
        Polish: "Excellent",
        Symmetry: "Very Good",
      },
    },
    "rub-002": {
      id: "rub-002",
      name: "Mozambique Ruby",
      shape: "Cushion",
      carat: 3.45,
      color: "Red",
      clarity: "SI",
      treatment: "Heated",
      origin: "Mozambique",
      price: 8900,
      images: [
        "/placeholder.svg?height=600&width=600&text=Mozambique+Ruby",
        "/placeholder.svg?height=600&width=600&text=Mozambique+View+2",
        "/placeholder.svg?height=600&width=600&text=Mozambique+View+3",
      ],
      dimensions: "9.2 x 8.1 x 5.8 mm",
      gemType: "rubies",
      certification: "GIA Certificate #3234567891",
      description:
        "This beautiful Mozambique ruby offers excellent value with vibrant red color and good clarity. Heat-treated to enhance its natural beauty.",
      specifications: {
        "Carat Weight": "3.45 ct",
        Dimensions: "9.2 x 8.1 x 5.8 mm",
        Shape: "Cushion",
        Color: "Red",
        Clarity: "SI (Slightly Included)",
        Treatment: "Heated",
        Origin: "Mozambique",
        Certification: "GIA",
        Fluorescence: "Medium Red",
        Polish: "Very Good",
        Symmetry: "Good",
      },
    },
    "rub-003": {
      id: "rub-003",
      name: "Thai Ruby",
      shape: "Round",
      carat: 1.89,
      color: "Purplish Red",
      clarity: "VS",
      treatment: "Heated",
      origin: "Thailand",
      price: 4200,
      images: [
        "/placeholder.svg?height=600&width=600&text=Thai+Ruby",
        "/placeholder.svg?height=600&width=600&text=Thai+View+2",
        "/placeholder.svg?height=600&width=600&text=Thai+View+3",
      ],
      dimensions: "7.8 x 7.8 x 4.9 mm",
      gemType: "rubies",
      certification: "AIGS Certificate #3234567892",
      description:
        "This Thai ruby displays a beautiful purplish red color with excellent clarity. A perfect choice for jewelry manufacturers seeking quality at competitive prices.",
      specifications: {
        "Carat Weight": "1.89 ct",
        Dimensions: "7.8 x 7.8 x 4.9 mm",
        Shape: "Round",
        Color: "Purplish Red",
        Clarity: "VS (Very Slightly Included)",
        Treatment: "Heated",
        Origin: "Thailand",
        Certification: "AIGS",
        Fluorescence: "Weak Red",
        Polish: "Good",
        Symmetry: "Very Good",
      },
    },
    "rub-004": {
      id: "rub-004",
      name: "Unheated Ruby",
      shape: "Pear",
      carat: 1.67,
      color: "Red",
      clarity: "VVS",
      treatment: "Unheated",
      origin: "Myanmar",
      price: 15800,
      images: [
        "/placeholder.svg?height=600&width=600&text=Unheated+Ruby",
        "/placeholder.svg?height=600&width=600&text=Unheated+View+2",
        "/placeholder.svg?height=600&width=600&text=Unheated+View+3",
      ],
      dimensions: "8.5 x 6.1 x 4.2 mm",
      gemType: "rubies",
      certification: "GRS Certificate #3234567893",
      description:
        "This exceptional unheated ruby represents the finest quality available. Natural and untreated, this stone displays exceptional color and clarity.",
      specifications: {
        "Carat Weight": "1.67 ct",
        Dimensions: "8.5 x 6.1 x 4.2 mm",
        Shape: "Pear",
        Color: "Red",
        Clarity: "VVS (Very Very Slightly Included)",
        Treatment: "Unheated",
        Origin: "Myanmar",
        Certification: "GRS",
        Fluorescence: "Strong Red",
        Polish: "Excellent",
        Symmetry: "Excellent",
      },
    },
  }
  return rubies[id as keyof typeof rubies]
}

export default function RubyDetailPage({ params }: { params: { id: string } }) {
  const ruby = getRubyById(params.id)

  if (!ruby) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ruby Not Available</h1>
          <p className="text-gray-600 mb-4">Ruby ID "{params.id}" not found in our current collection.</p>
          <p className="text-sm text-gray-500 mb-6">Available IDs: rub-001, rub-002, rub-003, rub-004</p>
          <Link href="/rubies/basic-search">
            <Button>Browse All Rubies</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/rubies/basic-search" className="flex items-center text-red-600 hover:text-red-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Rubies
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden">
              <Image
                src={ruby.images[0] || "/placeholder.svg"}
                alt={ruby.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {ruby.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${ruby.name} view ${index + 2}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{ruby.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-red-600">{ruby.treatment}</Badge>
                    <Badge variant="outline">{ruby.origin}</Badge>
                    {ruby.price > 5000 && <Badge className="bg-yellow-600">Premium</Badge>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-red-600">${ruby.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">per piece (wholesale)</div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{ruby.description}</p>
            </div>

            {/* Quick Specs */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Carat Weight</div>
                    <div className="font-semibold">{ruby.carat} ct</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Shape</div>
                    <div className="font-semibold">{ruby.shape}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Color</div>
                    <div className="font-semibold">{ruby.color}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Clarity</div>
                    <div className="font-semibold">{ruby.clarity}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <MessageCircle className="h-5 w-5 mr-2" />
                Send Inquiry
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <a href="https://wa.me/6622674124">
                    <Phone className="h-4 w-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">For wholesale inquiries contact:</div>
                  <div className="font-semibold">VICO by Vaibhav International</div>
                  <div className="text-sm text-gray-600">Jewellery Trade Center, Bangkok</div>
                  <div className="text-sm text-gray-600">+66 2 267 4124</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Specifications */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Complete Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(ruby.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
