"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CloudinaryImage } from "../cloudinary-image"
import { Upload, X, CheckCircle, ImageIcon, Gem } from "lucide-react"

interface UploadedGemstone {
  publicId: string
  url: string
  gemType: string
  name: string
  id: string
  thumbnailUrl?: string
}

export function GemstoneUploader() {
  const [uploading, setUploading] = useState(false)
  const [uploadedGemstones, setUploadedGemstones] = useState<UploadedGemstone[]>([])
  const [formData, setFormData] = useState({
    gemType: "",
    name: "",
    id: "",
    shape: "",
    carat: "",
    color: "",
    clarity: "",
    treatment: "",
    origin: "",
    price: "",
    description: "",
  })

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!formData.gemType || !formData.name) {
        alert("Please fill in gemstone type and name first")
        return
      }

      setUploading(true)

      for (const file of acceptedFiles) {
        try {
          const uploadFormData = new FormData()
          uploadFormData.append("file", file)
          uploadFormData.append("gemType", formData.gemType)
          uploadFormData.append("name", formData.name)
          uploadFormData.append("gemId", formData.id || `${formData.gemType}-${Date.now()}`)

          const response = await fetch("/api/upload-gemstone", {
            method: "POST",
            body: uploadFormData,
          })

          const result = await response.json()

          if (result.success) {
            setUploadedGemstones((prev) => [
              ...prev,
              {
                publicId: result.publicId,
                url: result.url,
                gemType: formData.gemType,
                name: formData.name,
                id: formData.id || `${formData.gemType}-${Date.now()}`,
                thumbnailUrl: result.urls?.thumbnail,
              },
            ])
          } else {
            alert(`Upload failed: ${result.error}`)
          }
        } catch (error) {
          console.error("Upload failed:", error)
          alert("Upload failed. Please try again.")
        }
      }

      setUploading(false)
    },
    [formData],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const removeGemstone = (publicId: string) => {
    setUploadedGemstones((prev) => prev.filter((gem) => gem.publicId !== publicId))
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">VICO Gemstone Uploader</h1>
        <p className="text-gray-600">Upload and manage your premium gemstone collection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gem className="h-5 w-5 mr-2 text-blue-600" />
              Gemstone Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gemType">Gemstone Type *</Label>
                <Select value={formData.gemType} onValueChange={(value) => updateFormData("gemType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sapphires">Sapphires</SelectItem>
                    <SelectItem value="rubies">Rubies</SelectItem>
                    <SelectItem value="emeralds">Emeralds</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="name">Gemstone Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  placeholder="e.g., Ceylon Blue Sapphire"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="id">Gemstone ID</Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) => updateFormData("id", e.target.value)}
                  placeholder="Auto-generated if empty"
                />
              </div>
              <div>
                <Label htmlFor="shape">Shape</Label>
                <Select value={formData.shape} onValueChange={(value) => updateFormData("shape", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shape" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oval">Oval</SelectItem>
                    <SelectItem value="round">Round</SelectItem>
                    <SelectItem value="cushion">Cushion</SelectItem>
                    <SelectItem value="emerald">Emerald Cut</SelectItem>
                    <SelectItem value="pear">Pear</SelectItem>
                    <SelectItem value="princess">Princess</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="carat">Carat Weight</Label>
                <Input
                  id="carat"
                  value={formData.carat}
                  onChange={(e) => updateFormData("carat", e.target.value)}
                  placeholder="2.45"
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => updateFormData("color", e.target.value)}
                  placeholder="Blue"
                />
              </div>
              <div>
                <Label htmlFor="clarity">Clarity</Label>
                <Input
                  id="clarity"
                  value={formData.clarity}
                  onChange={(e) => updateFormData("clarity", e.target.value)}
                  placeholder="VS"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="treatment">Treatment</Label>
                <Input
                  id="treatment"
                  value={formData.treatment}
                  onChange={(e) => updateFormData("treatment", e.target.value)}
                  placeholder="Heated"
                />
              </div>
              <div>
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => updateFormData("origin", e.target.value)}
                  placeholder="Sri Lanka"
                />
              </div>
              <div>
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => updateFormData("price", e.target.value)}
                  placeholder="3500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Detailed description of the gemstone..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />
              Upload Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragActive
                  ? "border-blue-500 bg-blue-50 scale-105"
                  : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? "text-blue-500" : "text-gray-400"}`} />
              {isDragActive ? (
                <p className="text-blue-600 font-medium">Drop the gemstone images here...</p>
              ) : (
                <div>
                  <p className="text-gray-600 font-medium mb-2">Drag & drop gemstone images</p>
                  <p className="text-sm text-gray-500">or click to select files</p>
                  <p className="text-xs text-gray-400 mt-2">JPEG, PNG, WebP (max 10MB each)</p>
                </div>
              )}
            </div>

            {uploading && (
              <div className="mt-6 flex items-center justify-center text-blue-600 py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                <span className="font-medium">Uploading to Cloudinary...</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Uploaded Gemstones */}
      {uploadedGemstones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Uploaded Gemstones ({uploadedGemstones.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {uploadedGemstones.map((gemstone) => (
                <div key={gemstone.publicId} className="relative group">
                  <CloudinaryImage
                    publicId={gemstone.publicId}
                    alt={gemstone.name}
                    transformation="card"
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg shadow-sm"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    onClick={() => removeGemstone(gemstone.publicId)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-3 rounded-b-lg">
                    <p className="text-sm font-semibold truncate">{gemstone.name}</p>
                    <p className="text-xs text-gray-200 capitalize">{gemstone.gemType}</p>
                    <p className="text-xs text-gray-300 font-mono">{gemstone.id}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cloudinary URLs for Reference */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-3 text-gray-900">Cloudinary Public IDs:</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {uploadedGemstones.map((gemstone) => (
                  <div
                    key={gemstone.publicId}
                    className="text-xs font-mono bg-white p-3 rounded border flex justify-between items-center"
                  >
                    <span className="text-gray-700">{gemstone.publicId}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigator.clipboard.writeText(gemstone.publicId)}
                      className="h-6 px-2 text-xs"
                    >
                      Copy
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
