"use client"

import { useState, useMemo } from "react"
import { GemstoneFilters } from "@/components/gemstone-filters"
import { GemstoneCard } from "@/components/gemstone-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Grid, List, SlidersHorizontal } from "lucide-react"

// Sample ruby data
const sampleRubies = [
  {
    id: "rub-001",
    name: "Pigeon Blood Ruby",
    shape: "Oval",
    carat: 2.15,
    color: "Pigeon Blood",
    clarity: "VS",
    treatment: "Heated",
    origin: "Myanmar",
    price: 12500,
    image: "/placeholder.svg?height=300&width=300&text=Pigeon+Blood+Ruby",
    dimensions: "8.1 x 6.2 x 4.5 mm",
    gemType: "rubies",
  },
  {
    id: "rub-002",
    name: "Mozambique Ruby",
    shape: "Cushion",
    carat: 3.45,
    color: "Red",
    clarity: "SI",
    treatment: "Heated",
    origin: "Mozambique",
    price: 8900,
    image: "/placeholder.svg?height=300&width=300&text=Mozambique+Ruby",
    dimensions: "9.2 x 8.1 x 5.8 mm",
    gemType: "rubies",
  },
  {
    id: "rub-003",
    name: "Thai Ruby",
    shape: "Round",
    carat: 1.89,
    color: "Purplish Red",
    clarity: "VS",
    treatment: "Heated",
    origin: "Thailand",
    price: 4200,
    image: "/placeholder.svg?height=300&width=300&text=Thai+Ruby",
    dimensions: "7.8 x 7.8 x 4.9 mm",
    gemType: "rubies",
  },
  {
    id: "rub-004",
    name: "Unheated Ruby",
    shape: "Pear",
    carat: 1.67,
    color: "Red",
    clarity: "VVS",
    treatment: "Unheated",
    origin: "Myanmar",
    price: 15800,
    image: "/placeholder.svg?height=300&width=300&text=Unheated+Ruby",
    dimensions: "8.5 x 6.1 x 4.2 mm",
    gemType: "rubies",
  },
]

export default function RubySearchPage() {
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

  const filteredRubies = useMemo(() => {
    return sampleRubies.filter((ruby) => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
          ruby.name.toLowerCase().includes(searchLower) ||
          ruby.color.toLowerCase().includes(searchLower) ||
          ruby.origin.toLowerCase().includes(searchLower) ||
          ruby.shape.toLowerCase().includes(searchLower)

        if (!matchesSearch) return false
      }

      // Apply other filters
      if (filters.shapes?.length > 0 && !filters.shapes.includes(ruby.shape)) return false
      if (filters.caratRange && (ruby.carat < filters.caratRange[0] || ruby.carat > filters.caratRange[1])) return false
      if (filters.colors?.length > 0 && !filters.colors.includes(ruby.color)) return false
      if (filters.treatments?.length > 0 && !filters.treatments.includes(ruby.treatment)) return false
      if (filters.origins?.length > 0 && !filters.origins.includes(ruby.origin)) return false
      if (filters.priceRange && (ruby.price < filters.priceRange[0] || ruby.price > filters.priceRange[1])) return false

      return true
    })
  }, [filters, searchTerm])

  return (
    <div className="min-h-screen bg-gray-50/30 pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-tight">Rubies</h1>
          <p className="text-xl text-gray-600 font-light">
            Premium rubies for wholesale — {filteredRubies.length} stones available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <GemstoneFilters onFiltersChange={setFilters} gemType="rubies" />
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
                    placeholder="Search rubies..."
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
                <GemstoneFilters onFiltersChange={setFilters} gemType="rubies" />
              </div>
            )}

            {/* Results */}
            {filteredRubies.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-16 text-center">
                <div className="text-gray-400 mb-6">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No rubies found</h3>
                <p className="text-gray-600 font-light">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div
                className={`grid gap-8 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredRubies.map((ruby) => (
                  <GemstoneCard key={ruby.id} gemstone={ruby} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
