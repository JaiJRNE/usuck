"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface FilterProps {
  onFiltersChange: (filters: any) => void
  gemType: "sapphires" | "rubies" | "emeralds"
}

export function GemstoneFilters({ onFiltersChange, gemType }: FilterProps) {
  const [filters, setFilters] = useState({
    shapes: [] as string[],
    caratRange: [0.5, 10] as number[],
    colors: [] as string[],
    treatments: [] as string[],
    origins: [] as string[],
    priceRange: [100, 50000] as number[],
  })

  useEffect(() => {
    onFiltersChange(filters)
  }, [])

  const shapes = ["Oval", "Cushion", "Round", "Emerald Cut", "Pear", "Princess", "Marquise", "Heart"]

  const colorsByGem = {
    sapphires: ["Blue", "Pink", "Yellow", "White", "Padparadscha", "Purple", "Green"],
    rubies: ["Pigeon Blood", "Red", "Pinkish Red", "Purplish Red"],
    emeralds: ["Vivid Green", "Bluish Green", "Yellowish Green", "Medium Green"],
  }

  const treatments = ["Heated", "Unheated", "None", "Oil Treatment", "Fracture Filled"]
  const origins = ["Thailand", "Sri Lanka", "Myanmar", "Madagascar", "Mozambique", "Colombia", "Zambia", "Brazil"]

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const toggleArrayFilter = (key: string, value: string) => {
    const currentArray = filters[key as keyof typeof filters] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  const clearFilters = () => {
    const clearedFilters = {
      shapes: [],
      caratRange: [0.5, 10],
      colors: [],
      treatments: [],
      origins: [],
      priceRange: [100, 50000],
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters =
    filters.shapes.length > 0 ||
    filters.colors.length > 0 ||
    filters.treatments.length > 0 ||
    filters.origins.length > 0

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Shape Filter */}
      <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-900">Shape</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {shapes.map((shape) => (
            <div key={shape} className="flex items-center space-x-3">
              <Checkbox
                id={`shape-${shape}`}
                checked={filters.shapes.includes(shape)}
                onCheckedChange={() => toggleArrayFilter("shapes", shape)}
                className="rounded-sm"
              />
              <Label htmlFor={`shape-${shape}`} className="text-sm font-medium text-gray-700">
                {shape}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Carat Range */}
      <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-900">Carat Weight</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.caratRange}
              onValueChange={(value) => updateFilter("caratRange", value)}
              max={10}
              min={0.1}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <span>{filters.caratRange[0]} ct</span>
              <span>{filters.caratRange[1]} ct</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Filter */}
      <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-900">Color</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {colorsByGem[gemType].map((color) => (
            <div key={color} className="flex items-center space-x-3">
              <Checkbox
                id={`color-${color}`}
                checked={filters.colors.includes(color)}
                onCheckedChange={() => toggleArrayFilter("colors", color)}
                className="rounded-sm"
              />
              <Label htmlFor={`color-${color}`} className="text-sm font-medium text-gray-700">
                {color}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Treatment Filter */}
      <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-900">Treatment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {treatments.map((treatment) => (
            <div key={treatment} className="flex items-center space-x-3">
              <Checkbox
                id={`treatment-${treatment}`}
                checked={filters.treatments.includes(treatment)}
                onCheckedChange={() => toggleArrayFilter("treatments", treatment)}
                className="rounded-sm"
              />
              <Label htmlFor={`treatment-${treatment}`} className="text-sm font-medium text-gray-700">
                {treatment}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Origin Filter */}
      <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-900">Origin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {origins.map((origin) => (
            <div key={origin} className="flex items-center space-x-3">
              <Checkbox
                id={`origin-${origin}`}
                checked={filters.origins.includes(origin)}
                onCheckedChange={() => toggleArrayFilter("origins", origin)}
                className="rounded-sm"
              />
              <Label htmlFor={`origin-${origin}`} className="text-sm font-medium text-gray-700">
                {origin}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-900">Price Range (USD)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
              max={50000}
              min={50}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <span>${filters.priceRange[0].toLocaleString()}</span>
              <span>${filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
