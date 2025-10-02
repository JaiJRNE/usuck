"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from "lucide-react"
import Image from "next/image"

export function SimpleProductForm() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    gemType: "",
    shape: "",
    carat: "",
    color: "",
    clarity: "",
    treatment: "",
    origin: "",
    price: "",
    dimensions: "",
    description: "",
  })
  const [images, setImages] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages((prev) => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("productData", JSON.stringify(formData))
      formDataToSend.append("id", formData.id)
      formDataToSend.append("name", formData.name)
      formDataToSend.append("gemType", formData.gemType)

      images.forEach((image, index) => {
        formDataToSend.append(`image${index}`, image)
      })

      const response = await fetch("/api/products/single", {
        method: "POST",
        body: formDataToSend,
      })

      const result = await response.json()

      if (result.success) {
        alert("Product added successfully!")
        // Reset form
        setFormData({
          id: "",
          name: "",
          gemType: "",
          shape: "",
          carat: "",
          color: "",
          clarity: "",
          treatment: "",
          origin: "",
          price: "",
          dimensions: "",
          description: "",
        })
        setImages([])
      } else {
        alert("Failed to add product: " + result.error)
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to add product")
    } finally {
      setSubmitting(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Single Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="id">Product ID *</Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) => updateField("id", e.target.value)}
                  placeholder="e.g., sap-001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g., Ceylon Blue Sapphire"
                  required
                />
              </div>
            </div>

            {/* Gem Type & Shape */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gemType">Gemstone Type *</Label>
                <Select value={formData.gemType} onValueChange={(value) => updateField("gemType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sapphires">Sapphires</SelectItem>
                    <SelectItem value="rubies">Rubies</SelectItem>
                    <SelectItem value="emeralds">Emeralds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="shape">Shape</Label>
                <Input
                  id="shape"
                  value={formData.shape}
                  onChange={(e) => updateField("shape", e.target.value)}
                  placeholder="e.g., Oval"
                />
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="carat">Carat Weight</Label>
                <Input
                  id="carat"
                  value={formData.carat}
                  onChange={(e) => updateField("carat", e.target.value)}
                  placeholder="2.45"
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => updateField("color", e.target.value)}
                  placeholder="Blue"
                />
              </div>
              <div>
                <Label htmlFor="clarity">Clarity</Label>
                <Input
                  id="clarity"
                  value={formData.clarity}
                  onChange={(e) => updateField("clarity", e.target.value)}
                  placeholder="VS"
                />
              </div>
            </div>

            {/* Treatment, Origin, Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="treatment">Treatment</Label>
                <Input
                  id="treatment"
                  value={formData.treatment}
                  onChange={(e) => updateField("treatment", e.target.value)}
                  placeholder="Heated"
                />
              </div>
              <div>
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => updateField("origin", e.target.value)}
                  placeholder="Sri Lanka"
                />
              </div>
              <div>
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  placeholder="3500"
                />
              </div>
            </div>

            {/* Dimensions & Description */}
            <div>
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                value={formData.dimensions}
                onChange={(e) => updateField("dimensions", e.target.value)}
                placeholder="8.2 x 6.1 x 4.8 mm"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Detailed product description..."
                rows={4}
              />
            </div>

            {/* Images */}
            <div>
              <Label>Product Images</Label>
              <div className="mt-2 space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={URL.createObjectURL(image) || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50">
                    <div className="text-center">
                      <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-xs text-gray-500">Add Image</span>
                    </div>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={submitting} className="w-full" size="lg">
              {submitting ? "Adding Product..." : "Add Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
