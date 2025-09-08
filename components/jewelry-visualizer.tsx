"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { CloudinaryImage } from "./cloudinary-image"
import { Gem, BellRingIcon as Ring, Heart, Star, Crown, Sparkles, MessageCircle, Download } from "lucide-react"
import Image from "next/image"

interface JewelryVisualizerProps {
  gemstone: {
    id: string
    name: string
    shape: string
    carat: number
    color: string
    price: number
    cloudinaryId?: string
    image: string
    gemType: string
  }
}

interface JewelryStyle {
  id: string
  name: string
  category: "rings" | "necklaces" | "earrings" | "bracelets"
  basePrice: number
  image: string
  description: string
  icon: any
}

const jewelryStyles: JewelryStyle[] = [
  // Rings
  {
    id: "solitaire-ring",
    name: "Classic Solitaire Ring",
    category: "rings",
    basePrice: 800,
    image: "/placeholder.svg?height=300&width=300&text=Solitaire+Ring",
    description: "Timeless elegance with a single center stone",
    icon: Ring,
  },
  {
    id: "halo-ring",
    name: "Halo Ring",
    category: "rings",
    basePrice: 1200,
    image: "/placeholder.svg?height=300&width=300&text=Halo+Ring",
    description: "Center stone surrounded by smaller diamonds",
    icon: Crown,
  },
  {
    id: "three-stone-ring",
    name: "Three Stone Ring",
    category: "rings",
    basePrice: 1500,
    image: "/placeholder.svg?height=300&width=300&text=Three+Stone+Ring",
    description: "Past, present, and future symbolism",
    icon: Gem,
  },
  {
    id: "vintage-ring",
    name: "Vintage Style Ring",
    category: "rings",
    basePrice: 1000,
    image: "/placeholder.svg?height=300&width=300&text=Vintage+Ring",
    description: "Art deco inspired design with intricate details",
    icon: Star,
  },

  // Necklaces
  {
    id: "pendant-necklace",
    name: "Pendant Necklace",
    category: "necklaces",
    basePrice: 600,
    image: "/placeholder.svg?height=300&width=300&text=Pendant+Necklace",
    description: "Simple and elegant pendant design",
    icon: Heart,
  },
  {
    id: "tennis-necklace",
    name: "Tennis Necklace",
    category: "necklaces",
    basePrice: 2500,
    image: "/placeholder.svg?height=300&width=300&text=Tennis+Necklace",
    description: "Continuous line of matched gemstones",
    icon: Sparkles,
  },

  // Earrings
  {
    id: "stud-earrings",
    name: "Stud Earrings",
    category: "earrings",
    basePrice: 400,
    image: "/placeholder.svg?height=300&width=300&text=Stud+Earrings",
    description: "Classic and versatile everyday wear",
    icon: Gem,
  },
  {
    id: "drop-earrings",
    name: "Drop Earrings",
    category: "earrings",
    basePrice: 800,
    image: "/placeholder.svg?height=300&width=300&text=Drop+Earrings",
    description: "Elegant dangling design",
    icon: Heart,
  },
]

const metalOptions = [
  { id: "white-gold", name: "18K White Gold", price: 0, color: "#E8E8E8" },
  { id: "yellow-gold", name: "18K Yellow Gold", price: 100, color: "#FFD700" },
  { id: "rose-gold", name: "18K Rose Gold", price: 150, color: "#E8B4A0" },
  { id: "platinum", name: "Platinum", price: 500, color: "#E5E4E2" },
]

export function JewelryVisualizer({ gemstone }: JewelryVisualizerProps) {
  const [selectedCategory, setSelectedCategory] = useState<"rings" | "necklaces" | "earrings" | "bracelets">("rings")
  const [selectedStyle, setSelectedStyle] = useState<JewelryStyle | null>(null)
  const [selectedMetal, setSelectedMetal] = useState(metalOptions[0])
  const [ringSize, setRingSize] = useState([6])
  const [chainLength, setChainLength] = useState([18])
  const [showCustomization, setShowCustomization] = useState(false)

  const filteredStyles = jewelryStyles.filter((style) => style.category === selectedCategory)

  const calculateTotalPrice = () => {
    if (!selectedStyle) return gemstone.price
    return gemstone.price + selectedStyle.basePrice + selectedMetal.price
  }

  const handleStyleSelect = (style: JewelryStyle) => {
    setSelectedStyle(style)
    setShowCustomization(true)
  }

  const handleRequestQuote = () => {
    const customization = {
      gemstone: gemstone.name,
      gemstoneId: gemstone.id,
      jewelryStyle: selectedStyle?.name,
      metal: selectedMetal.name,
      ringSize: selectedCategory === "rings" ? ringSize[0] : undefined,
      chainLength: selectedCategory === "necklaces" ? chainLength[0] : undefined,
      estimatedPrice: calculateTotalPrice(),
    }

    // Here you would typically send this to your backend or open a contact form
    console.log("Quote request:", customization)

    // For now, we'll create a WhatsApp message
    const message = `Hi VICO! I'm interested in a custom jewelry piece:

Gemstone: ${gemstone.name} (${gemstone.carat}ct)
Jewelry Style: ${selectedStyle?.name}
Metal: ${selectedMetal.name}
${selectedCategory === "rings" ? `Ring Size: ${ringSize[0]}` : ""}
${selectedCategory === "necklaces" ? `Chain Length: ${chainLength[0]}"` : ""}

Estimated Price: $${calculateTotalPrice().toLocaleString()}

Please provide a detailed quote and timeline.`

    const whatsappUrl = `https://wa.me/6622674124?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Jewelry Visualizer</h1>
        <p className="text-gray-600">See how your {gemstone.name} will look in custom jewelry</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gemstone Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gem className="h-5 w-5 mr-2 text-blue-600" />
              Selected Gemstone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                {gemstone.cloudinaryId ? (
                  <CloudinaryImage
                    publicId={gemstone.cloudinaryId}
                    alt={gemstone.name}
                    transformation="thumbnail"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={gemstone.image || "/placeholder.svg"}
                    alt={gemstone.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{gemstone.name}</h3>
                <p className="text-gray-600">
                  {gemstone.carat} carat • {gemstone.shape}
                </p>
                <p className="text-gray-600">{gemstone.color}</p>
                <p className="font-semibold text-blue-600">${gemstone.price.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visualization Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedStyle ? (
              <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={selectedStyle.image || "/placeholder.svg"}
                    alt={selectedStyle.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    style={{
                      filter: `hue-rotate(${selectedMetal.id === "yellow-gold" ? "45deg" : selectedMetal.id === "rose-gold" ? "15deg" : "0deg"})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">{selectedMetal.name}</Badge>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{selectedStyle.name}</h3>
                  <p className="text-gray-600 text-sm">{selectedStyle.description}</p>
                  <p className="font-semibold text-green-600 text-xl mt-2">
                    Total: ${calculateTotalPrice().toLocaleString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Gem className="h-16 w-16 mx-auto mb-4" />
                  <p>Select a jewelry style to see preview</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Jewelry Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Jewelry Style</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="rings" className="flex items-center">
                <Ring className="h-4 w-4 mr-2" />
                Rings
              </TabsTrigger>
              <TabsTrigger value="necklaces" className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Necklaces
              </TabsTrigger>
              <TabsTrigger value="earrings" className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Earrings
              </TabsTrigger>
              <TabsTrigger value="bracelets" className="flex items-center">
                <Crown className="h-4 w-4 mr-2" />
                Bracelets
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStyles.map((style) => (
                  <Card
                    key={style.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedStyle?.id === style.id ? "ring-2 ring-blue-500 shadow-lg" : ""
                    }`}
                    onClick={() => handleStyleSelect(style)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <Image
                          src={style.image || "/placeholder.svg"}
                          alt={style.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold mb-2">{style.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{style.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-blue-600">+${style.basePrice}</span>
                        <style.icon className="h-5 w-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Customization Options */}
      {showCustomization && selectedStyle && (
        <Card>
          <CardHeader>
            <CardTitle>Customization Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Metal Selection */}
            <div>
              <Label className="text-base font-medium mb-3 block">Metal Type</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {metalOptions.map((metal) => (
                  <Card
                    key={metal.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedMetal.id === metal.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedMetal(metal)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ backgroundColor: metal.color }} />
                      <p className="text-sm font-medium">{metal.name}</p>
                      <p className="text-xs text-gray-600">{metal.price > 0 ? `+$${metal.price}` : "Included"}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Size/Length Options */}
            {selectedCategory === "rings" && (
              <div>
                <Label className="text-base font-medium mb-3 block">Ring Size: {ringSize[0]}</Label>
                <Slider
                  value={ringSize}
                  onValueChange={setRingSize}
                  max={12}
                  min={4}
                  step={0.5}
                  className="w-full max-w-md"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2 max-w-md">
                  <span>Size 4</span>
                  <span>Size 12</span>
                </div>
              </div>
            )}

            {selectedCategory === "necklaces" && (
              <div>
                <Label className="text-base font-medium mb-3 block">Chain Length: {chainLength[0]}"</Label>
                <Slider
                  value={chainLength}
                  onValueChange={setChainLength}
                  max={24}
                  min={14}
                  step={1}
                  className="w-full max-w-md"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2 max-w-md">
                  <span>14"</span>
                  <span>24"</span>
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Price Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>
                    {gemstone.name} ({gemstone.carat}ct)
                  </span>
                  <span>${gemstone.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>{selectedStyle.name}</span>
                  <span>${selectedStyle.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>{selectedMetal.name}</span>
                  <span>{selectedMetal.price > 0 ? `$${selectedMetal.price}` : "Included"}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-base">
                  <span>Total Estimated Price</span>
                  <span className="text-green-600">${calculateTotalPrice().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleRequestQuote} className="flex-1" size="lg">
                <MessageCircle className="h-5 w-5 mr-2" />
                Request Custom Quote
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" size="lg">
                <Download className="h-5 w-5 mr-2" />
                Download Specification
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>
                This is an estimated price. Final pricing may vary based on specific requirements and current market
                rates.
              </p>
              <p className="mt-1">Our team will provide a detailed quote within 24 hours.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
