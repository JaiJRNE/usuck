"use client"

import { useState, useMemo } from "react"
import { GemstoneFilters } from "@/components/gemstone-filters"
import { GemstoneCard } from "@/components/gemstone-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Grid, List, SlidersHorizontal } from 'lucide-react'

// Sample sapphire data with real images
const sampleSapphires = [
  {
    id: "sap-001",
    name: "Ceylon Blue Sapphire",
    shape: "Oval",
    carat: 2.45,
    color: "Blue",
    clarity: "VS",
    treatment: "Heated",
    origin: "Sri Lanka",
    price: 3500,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ceylon%20Blue%20Sapphire-lT1K3fUD0nbOHB3Lg4uVxlASSq3Eqv.jpeg",
    dimensions: "8.2 x 6.1 x 4.8 mm",
    gemType: "sapphires",
  },
  {
    id: "sap-002",
    name: "Padparadscha Sapphire",
    shape: "Cushion",
    carat: 1.85,
    color: "Padparadscha",
    clarity: "VVS",
    treatment: "Unheated",
    origin: "Madagascar",
    price: 8500,
    image: "/placeholder.svg?height=300&width=300&text=Padparadscha+Sapphire",
    dimensions: "7.1 x 6.8 x 4.2 mm",
    gemType: "sapphires",
  },
  {
    id: "sap-003",
    name: "Yellow Sapphire",
    shape: "Round",
    carat: 3.12,
    color: "Yellow",
    clarity: "VS",
    treatment: "Heated",
    origin: "Thailand",
    price: 2800,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yellow%20Sapphire-2iP82g2GvtBKwY56NmNHPNyHeDbFKP.jpeg",
    dimensions: "8.8 x 8.8 x 5.4 mm",
    gemType: "sapphires",
  },
  {
    id: "sap-004",
    name: "Pink Sapphire",
    shape: "Pear",
    carat: 1.67,
    color: "Pink",
    clarity: "VVS",
    treatment: "Unheated",
    origin: "Myanmar",
    price: 6200,
    image: "/placeholder.svg?height=300&width=300&text=Pink+Sapphire",
    dimensions: "8.9 x 6.2 x 4.1 mm",
    gemType: "sapphires",
  },
  {
    id: "sap-005",
    name: "White Sapphire",
    shape: "Princess",
    carat: 2.89,
    color: "White",
    clarity: "VVS",
    treatment: "None",
    origin: "Sri Lanka",
    price: 1800,
    image: "/placeholder.svg?height=300&width=300&text=White+Sapphire",
    dimensions: "7.5 x 7.5 x 5.2 mm",
    gemType: "sapphires",
  },
  {
    id: "sap-006",
    name: "Purple Sapphire",
    shape: "Emerald Cut",
    carat: 2.23,
    color: "Purple",
    clarity: "VS",
    treatment: "Heated",
    origin: "Madagascar",
    price: 4100,
    image: "/placeholder.svg?height=300&width=300&text=Purple+Sapphire",
    dimensions: "8.1 x 6.3 x 4.7 mm",
    gemType: "sapphires",
  },
]

export default function SapphireSearchPage() {
  const [filters, setFilters] = useState<any>({
    shapes: [],
    caratRange: [0.5, 10],
    colors: [],
    treatments: [],
    origins: [],
    priceRange: [100, 50000],
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredSapphires = useMemo(() => {
    return sampleSapphires.filter((sapphire) => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
          sapphire.name.toLowerCase().includes(searchLower) ||
          sapphire.color.toLowerCase().includes(searchLower) ||
          sapphire.origin.toLowerCase().includes(searchLower) ||
          sapphire.shape.toLowerCase().includes(searchLower)

        if (!matchesSearch) return false
      }

      // Shape filter
      if (filters.shapes && filters.shapes.length > 0 && !filters.shapes.includes(sapphire.shape)) {
        return false
      }

      // Carat range filter
      if (filters.caratRange && filters.caratRange.length === 2) {
        if (sapphire.carat < filters.caratRange[0] || sapphire.carat > filters.caratRange[1]) {
          return false
        }
      }

      // Color filter
      if (filters.colors && filters.colors.length > 0 && !filters.colors.includes(sapphire.color)) {
        return false
      }

      // Treatment filter
      if (filters.treatments && filters.treatments.length > 0 && !filters.treatments.includes(sapphire.treatment)) {
        return false
      }

      // Origin filter
      if (filters.origins && filters.origins.length > 0 && !filters.origins.includes(sapphire.origin)) {
        return false
      }

      // Price range filter
      if (filters.priceRange && filters.priceRange.length === 2) {
        if (sapphire.price < filters.priceRange[0] || sapphire.price > filters.priceRange[1]) {
          return false
        }
      }

      return true
    })
  }, [filters, searchTerm])

  return (
    <div className="min-h-screen bg-gray-50/30 pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-tight">Sapphires</h1>
          <p className="text-xl text-gray-600 font-light">
            Premium sapphires for wholesale — {filteredSapphires.length} stones available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <GemstoneFilters onFiltersChange={setFilters} gemType="sapphires" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and View Controls */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search sapphires..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 border-0 bg-gray-50 rounded-full h-12 text-base"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden border-gray-200 rounded-full"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-full h-8 w-8 p-0"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-full h-8 w-8 p-0"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-8">
                <GemstoneFilters onFiltersChange={setFilters} gemType="sapphires" />
              </div>
            )}

            {/* Results */}
            {filteredSapphires.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-16 text-center">
                <div className="text-gray-400 mb-6">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No sapphires found</h3>
                <p className="text-gray-600 font-light">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div
                className={`grid gap-8 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredSapphires.map((sapphire) => (
                  <GemstoneCard key={sapphire.id} gemstone={sapphire} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
