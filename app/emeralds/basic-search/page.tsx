"use client"

import { useState, useMemo } from "react"
import { GemstoneFilters } from "@/components/gemstone-filters"
import { GemstoneCard } from "@/components/gemstone-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Grid, List, SlidersHorizontal } from "lucide-react"

// Sample emerald data
const sampleEmeralds = [
  {
    id: "em-001",
    name: "Colombian Emerald",
    shape: "Emerald Cut",
    carat: 2.85,
    color: "Vivid Green",
    clarity: "VS",
    treatment: "Oil Treatment",
    origin: "Colombia",
    price: 9500,
    image: "/placeholder.svg?height=300&width=300&text=Colombian+Emerald",
    dimensions: "8.5 x 6.8 x 5.2 mm",
    gemType: "emeralds",
  },
  {
    id: "em-002",
    name: "Zambian Emerald",
    shape: "Oval",
    carat: 3.12,
    color: "Bluish Green",
    clarity: "SI",
    treatment: "Oil Treatment",
    origin: "Zambia",
    price: 6800,
    image: "/placeholder.svg?height=300&width=300&text=Zambian+Emerald",
    dimensions: "9.1 x 7.2 x 5.8 mm",
    gemType: "emeralds",
  },
  {
    id: "em-003",
    name: "Brazilian Emerald",
    shape: "Cushion",
    carat: 2.45,
    color: "Medium Green",
    clarity: "VS",
    treatment: "Oil Treatment",
    origin: "Brazil",
    price: 4200,
    image: "/placeholder.svg?height=300&width=300&text=Brazilian+Emerald",
    dimensions: "8.2 x 7.8 x 5.1 mm",
    gemType: "emeralds",
  },
]

export default function EmeraldSearchPage() {
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

  const filteredEmeralds = useMemo(() => {
    return sampleEmeralds.filter((emerald) => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
          emerald.name.toLowerCase().includes(searchLower) ||
          emerald.color.toLowerCase().includes(searchLower) ||
          emerald.origin.toLowerCase().includes(searchLower) ||
          emerald.shape.toLowerCase().includes(searchLower)

        if (!matchesSearch) return false
      }

      // Apply other filters
      if (filters.shapes?.length > 0 && !filters.shapes.includes(emerald.shape)) return false
      if (filters.caratRange && (emerald.carat < filters.caratRange[0] || emerald.carat > filters.caratRange[1]))
        return false
      if (filters.colors?.length > 0 && !filters.colors.includes(emerald.color)) return false
      if (filters.treatments?.length > 0 && !filters.treatments.includes(emerald.treatment)) return false
      if (filters.origins?.length > 0 && !filters.origins.includes(emerald.origin)) return false
      if (filters.priceRange && (emerald.price < filters.priceRange[0] || emerald.price > filters.priceRange[1]))
        return false

      return true
    })
  }, [filters, searchTerm])

  return (
    <div className="min-h-screen bg-gray-50/30 pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-tight">Emeralds</h1>
          <p className="text-xl text-gray-600 font-light">
            Premium emeralds for wholesale — {filteredEmeralds.length} stones available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <GemstoneFilters onFiltersChange={setFilters} gemType="emeralds" />
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
                    placeholder="Search emeralds..."
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
                <GemstoneFilters onFiltersChange={setFilters} gemType="emeralds" />
              </div>
            )}

            {/* Results */}
            {filteredEmeralds.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-16 text-center">
                <div className="text-gray-400 mb-6">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No emeralds found</h3>
                <p className="text-gray-600 font-light">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div
                className={`grid gap-8 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredEmeralds.map((emerald) => (
                  <GemstoneCard key={emerald.id} gemstone={emerald} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
