import { JewelryVisualizer } from "@/components/jewelry-visualizer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// This would typically fetch from your database
const getGemstoneById = (id: string) => {
  const gemstones = {
    "sap-001": {
      id: "sap-001",
      name: "Ceylon Blue Sapphire",
      shape: "Oval",
      carat: 2.45,
      color: "Blue",
      price: 3500,
      image: "/placeholder.svg?height=300&width=300&text=Ceylon+Blue+Sapphire",
      gemType: "sapphires",
      cloudinaryId: "vico-gemstones/sapphires/sap-001",
    },
    "rub-001": {
      id: "rub-001",
      name: "Pigeon Blood Ruby",
      shape: "Oval",
      carat: 2.15,
      color: "Pigeon Blood",
      price: 12500,
      image: "/placeholder.svg?height=300&width=300&text=Pigeon+Blood+Ruby",
      gemType: "rubies",
      cloudinaryId: "vico-gemstones/rubies/rub-001",
    },
    "em-001": {
      id: "em-001",
      name: "Colombian Emerald",
      shape: "Emerald Cut",
      carat: 2.85,
      color: "Vivid Green",
      price: 9500,
      image: "/placeholder.svg?height=300&width=300&text=Colombian+Emerald",
      gemType: "emeralds",
      cloudinaryId: "vico-gemstones/emeralds/em-001",
    },
  }
  return gemstones[id as keyof typeof gemstones]
}

export default function JewelryVisualizerPage({ params }: { params: { gemstoneId: string } }) {
  const gemstone = getGemstoneById(params.gemstoneId)

  if (!gemstone) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Gemstone Not Found</h1>
          <p className="text-gray-600 mb-6">The gemstone you're looking for is not available.</p>
          <Link href="/sapphires/basic-search">
            <Button>Browse Gemstones</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link
          href={`/${gemstone.gemType}/detail/${gemstone.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {gemstone.name}
        </Link>
      </div>

      <JewelryVisualizer gemstone={gemstone} />
    </div>
  )
}
