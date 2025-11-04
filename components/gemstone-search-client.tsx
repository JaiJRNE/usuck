"use client"

import { useState, useMemo } from "react"
import { GemstoneFilters } from "@/components/gemstone-filters"
import { GemstoneCard } from "@/components/gemstone-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Grid, List, SlidersHorizontal } from "lucide-react"

interface Gemstone {
  id: string
  name: string
  gemType: "sapphires" | "rubies" | "emeralds"
  shape: string
  carat: number
  color: string
  clarity: string
  treatment: string
  origin: string
  price: number
  dimensions: string
  description: string
  image: string
  cloudinaryId?: string
  specifications?: any
}

interface GemstoneSearchClientProps {
  gemstones: Gemstone[]
  gemType: "sapphires" | "rubies" | "emeralds"
  title: string
  subtitle: string
}

export function GemstoneSearchClient({ gemstones, gemType, title, subtitle }: GemstoneSearchClientProps) {
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

  const filteredGemstones = useMemo(() => {
    return gemstones.filter((gemstone) => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
          gemstone.name.toLowerCase().includes(searchLower) ||
          gemstone.color.toLowerCase().includes(searchLower) ||
          gemstone.origin.toLowerCase().includes(searchLower) ||
          gemstone.shape.toLowerCase().includes(searchLower)

        if (!matchesSearch) return false
      }

      // Shape filter
      if (filters.shapes && filters.shapes.length > 0 && !filters.shapes.includes(gemstone.shape)) {
        return false
      }

      // Carat range filter
      if (filters.caratRange && filters.caratRange.length === 2) {
        if (gemstone.carat < filters.caratRange[0] || gemstone.carat > filters.caratRange[1]) {
          return false
        }
      }

      // Color filter
      if (filters.colors && filters.colors.length > 0 && !filters.colors.includes(gemstone.color)) {
        return false
      }

      // Treatment filter
      if (filters.treatments && filters.treatments.length > 0 && !filters.treatments.includes(gemstone.treatment)) {
        return false
      }

      // Origin filter
      if (filters.origins && filters.origins.length > 0 && !filters.origins.includes(gemstone.origin)) {
        return false
      }

      // Price range filter
      if (filters.priceRange && filters.priceRange.length === 2) {
        if (gemstone.price < filters.priceRange[0] || gemstone.price > filters.priceRange[1]) {
          return false
        }
      }

      return true
    })
  }, [gemstones, filters, searchTerm])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-vico-primary mb-2">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
          <p className="text-sm text-gray-500 mt-2">{filteredGemstones.length} stones available</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <GemstoneFilters onFiltersChange={setFilters} gemstones={gemstones} gemType={gemType} />
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
                    placeholder={`Search ${gemType}...`}
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
                <GemstoneFilters onFiltersChange={setFilters} gemstones={gemstones} gemType={gemType} />
              </div>
            )}

            {/* Results */}
            {filteredGemstones.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-16 text-center">
                <div className="text-gray-400 mb-6">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No {gemType} found</h3>
                <p className="text-gray-600 font-light">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div
                className={`grid gap-8 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredGemstones.map((gemstone) => (
                  <GemstoneCard key={gemstone.id} gemstone={gemstone} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
