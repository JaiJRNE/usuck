import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, MessageCircle, Phone, ArrowLeft } from 'lucide-react'
import Link from "next/link"

// Updated sapphire data with real images
const getSapphireById = (id: string) => {
  const sapphires = {
    "sap-001": {
      id: "sap-001",
      name: "Ceylon Blue Sapphire",
      shape: "Oval",
      carat: 2.45,
      color: "Blue",
      clarity: "VS",
      treatment: "Heated",
      origin: "Sri Lanka",
      price: 3500,
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ceylon%20Blue%20Sapphire-lT1K3fUD0nbOHB3Lg4uVxlASSq3Eqv.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ceylon%20Blue%20Sapphire-lT1K3fUD0nbOHB3Lg4uVxlASSq3Eqv.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ceylon%20Blue%20Sapphire-lT1K3fUD0nbOHB3Lg4uVxlASSq3Eqv.jpeg",
      ],
      dimensions: "8.2 x 6.1 x 4.8 mm",
      gemType: "sapphires",
      certification: "GIA Certificate #2234567890",
      description:
        "This exceptional Ceylon blue sapphire displays a vivid cornflower blue color with excellent transparency and brilliance. The stone has been carefully heat-treated to enhance its natural beauty, a standard practice in the industry. Sourced directly from the gem fields of Sri Lanka, this sapphire represents excellent value for jewelry manufacturers and retailers.",
      specifications: {
        "Carat Weight": "2.45 ct",
        Dimensions: "8.2 x 6.1 x 4.8 mm",
        Shape: "Oval",
        Color: "Blue",
        Clarity: "VS (Very Slightly Included)",
        Treatment: "Heated",
        Origin: "Sri Lanka (Ceylon)",
        Certification: "GIA",
        Fluorescence: "None",
        Polish: "Excellent",
        Symmetry: "Very Good",
      },
    },
    "sap-003": {
      id: "sap-003",
      name: "Yellow Sapphire",
      shape: "Round",
      carat: 3.12,
      color: "Yellow",
      clarity: "VS",
      treatment: "Heated",
      origin: "Thailand",
      price: 2800,
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yellow%20Sapphire-2iP82g2GvtBKwY56NmNHPNyHeDbFKP.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yellow%20Sapphire-2iP82g2GvtBKwY56NmNHPNyHeDbFKP.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yellow%20Sapphire-2iP82g2GvtBKwY56NmNHPNyHeDbFKP.jpeg",
      ],
      dimensions: "8.8 x 8.8 x 5.4 mm",
      gemType: "sapphires",
      certification: "AIGS Certificate #2234567892",
      description:
        "This vibrant yellow sapphire showcases excellent color saturation and brilliance. Heat-treated to enhance its natural beauty, perfect for high-end jewelry applications.",
      specifications: {
        "Carat Weight": "3.12 ct",
        Dimensions: "8.8 x 8.8 x 5.4 mm",
        Shape: "Round",
        Color: "Yellow",
        Clarity: "VS (Very Slightly Included)",
        Treatment: "Heated",
        Origin: "Thailand",
        Certification: "AIGS",
        Fluorescence: "None",
        Polish: "Very Good",
        Symmetry: "Very Good",
      },
    },
  }
  return sapphires[id as keyof typeof sapphires]
}

export default function SapphireDetailPage({ params }: { params: { id: string } }) {
  const sapphire = getSapphireById(params.id)

  if (!sapphire) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sapphire Not Found</h1>
          <p className="text-gray-600 mb-4">Sapphire ID "{params.id}" not found in our current collection.</p>
          <p className="text-sm text-gray-500 mb-6">Available IDs: sap-001, sap-003</p>
          <Link href="/sapphires/basic-search">
            <Button>Browse All Sapphires</Button>
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
          <Link href="/sapphires/basic-search" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sapphires
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden">
              <Image
                src={sapphire.images[0] || "/placeholder.svg"}
                alt={sapphire.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {sapphire.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${sapphire.name} view ${index + 2}`}
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{sapphire.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-blue-600">{sapphire.treatment}</Badge>
                    <Badge variant="outline">{sapphire.origin}</Badge>
                    {sapphire.price > 5000 && <Badge className="bg-yellow-600">Premium</Badge>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">${sapphire.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">per piece (wholesale)</div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{sapphire.description}</p>
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
                    <div className="font-semibold">{sapphire.carat} ct</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Shape</div>
                    <div className="font-semibold">{sapphire.shape}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Color</div>
                    <div className="font-semibold">{sapphire.color}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Clarity</div>
                    <div className="font-semibold">{sapphire.clarity}</div>
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
                {Object.entries(sapphire.specifications).map(([key, value]) => (
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
