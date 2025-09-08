import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, MessageCircle, Phone, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Emerald data
const getEmeraldById = (id: string) => {
  const emeralds = {
    "em-001": {
      id: "em-001",
      name: "Colombian Emerald",
      shape: "Emerald Cut",
      carat: 2.85,
      color: "Vivid Green",
      clarity: "VS",
      treatment: "Oil Treatment",
      origin: "Colombia",
      price: 9500,
      images: [
        "/placeholder.svg?height=600&width=600&text=Colombian+Emerald",
        "/placeholder.svg?height=600&width=600&text=Emerald+View+2",
        "/placeholder.svg?height=600&width=600&text=Emerald+View+3",
      ],
      dimensions: "8.5 x 6.8 x 5.2 mm",
      gemType: "emeralds",
      certification: "GRS Certificate #4234567890",
      description:
        "This exceptional Colombian emerald displays the coveted vivid green color with excellent transparency. Oil-treated to enhance clarity, representing the finest quality from the legendary Muzo mines.",
      specifications: {
        "Carat Weight": "2.85 ct",
        Dimensions: "8.5 x 6.8 x 5.2 mm",
        Shape: "Emerald Cut",
        Color: "Vivid Green",
        Clarity: "VS (Very Slightly Included)",
        Treatment: "Oil Treatment",
        Origin: "Colombia",
        Certification: "GRS",
        Fluorescence: "None",
        Polish: "Very Good",
        Symmetry: "Good",
      },
    },
    "em-002": {
      id: "em-002",
      name: "Zambian Emerald",
      shape: "Oval",
      carat: 3.12,
      color: "Bluish Green",
      clarity: "SI",
      treatment: "Oil Treatment",
      origin: "Zambia",
      price: 6800,
      images: [
        "/placeholder.svg?height=600&width=600&text=Zambian+Emerald",
        "/placeholder.svg?height=600&width=600&text=Zambian+View+2",
        "/placeholder.svg?height=600&width=600&text=Zambian+View+3",
      ],
      dimensions: "9.1 x 7.2 x 5.8 mm",
      gemType: "emeralds",
      certification: "GIA Certificate #4234567891",
      description:
        "This beautiful Zambian emerald offers excellent value with its distinctive bluish green color. Known for their clarity and brilliance, Zambian emeralds are highly sought after.",
      specifications: {
        "Carat Weight": "3.12 ct",
        Dimensions: "9.1 x 7.2 x 5.8 mm",
        Shape: "Oval",
        Color: "Bluish Green",
        Clarity: "SI (Slightly Included)",
        Treatment: "Oil Treatment",
        Origin: "Zambia",
        Certification: "GIA",
        Fluorescence: "None",
        Polish: "Good",
        Symmetry: "Very Good",
      },
    },
    "em-003": {
      id: "em-003",
      name: "Brazilian Emerald",
      shape: "Cushion",
      carat: 2.45,
      color: "Medium Green",
      clarity: "VS",
      treatment: "Oil Treatment",
      origin: "Brazil",
      price: 4200,
      images: [
        "/placeholder.svg?height=600&width=600&text=Brazilian+Emerald",
        "/placeholder.svg?height=600&width=600&text=Brazilian+View+2",
        "/placeholder.svg?height=600&width=600&text=Brazilian+View+3",
      ],
      dimensions: "8.2 x 7.8 x 5.1 mm",
      gemType: "emeralds",
      certification: "AIGS Certificate #4234567892",
      description:
        "This Brazilian emerald displays a beautiful medium green color with good clarity. An excellent choice for jewelry manufacturers seeking quality emeralds at competitive prices.",
      specifications: {
        "Carat Weight": "2.45 ct",
        Dimensions: "8.2 x 7.8 x 5.1 mm",
        Shape: "Cushion",
        Color: "Medium Green",
        Clarity: "VS (Very Slightly Included)",
        Treatment: "Oil Treatment",
        Origin: "Brazil",
        Certification: "AIGS",
        Fluorescence: "None",
        Polish: "Very Good",
        Symmetry: "Good",
      },
    },
  }
  return emeralds[id as keyof typeof emeralds]
}

export default function EmeraldDetailPage({ params }: { params: { id: string } }) {
  const emerald = getEmeraldById(params.id)

  if (!emerald) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Emerald Not Found</h1>
          <p className="text-gray-600 mb-4">Emerald ID "{params.id}" not found in our current collection.</p>
          <p className="text-sm text-gray-500 mb-6">Available IDs: em-001, em-002, em-003</p>
          <Link href="/emeralds/basic-search">
            <Button>Browse All Emeralds</Button>
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
          <Link href="/emeralds/basic-search" className="flex items-center text-green-600 hover:text-green-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Emeralds
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden">
              <Image
                src={emerald.images[0] || "/placeholder.svg"}
                alt={emerald.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {emerald.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${emerald.name} view ${index + 2}`}
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{emerald.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-green-600">{emerald.treatment}</Badge>
                    <Badge variant="outline">{emerald.origin}</Badge>
                    {emerald.price > 5000 && <Badge className="bg-yellow-600">Premium</Badge>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">${emerald.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">per piece (wholesale)</div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{emerald.description}</p>
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
                    <div className="font-semibold">{emerald.carat} ct</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Shape</div>
                    <div className="font-semibold">{emerald.shape}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Color</div>
                    <div className="font-semibold">{emerald.color}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Clarity</div>
                    <div className="font-semibold">{emerald.clarity}</div>
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
                {Object.entries(emerald.specifications).map(([key, value]) => (
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
