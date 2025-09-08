"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CloudinaryImage } from "./cloudinary-image"
import { Upload, X, CheckCircle, ImageIcon } from "lucide-react"

interface UploadedImage {
  publicId: string
  url: string
  gemType?: string
  name?: string
}

export function GemstoneUpload() {
  const [uploading, setUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [gemType, setGemType] = useState("")
  const [gemstoneName, setGemstoneName] = useState("")

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!gemType) {
        alert("Please select a gemstone type first")
        return
      }

      setUploading(true)

      for (const file of acceptedFiles) {
        try {
          const formData = new FormData()
          formData.append("file", file)
          formData.append("gemType", gemType)
          formData.append("name", gemstoneName || file.name)

          const response = await fetch("/api/upload-gemstone", {
            method: "POST",
            body: formData,
          })

          const result = await response.json()

          if (result.success) {
            setUploadedImages((prev) => [
              ...prev,
              {
                publicId: result.publicId,
                url: result.url,
                gemType,
                name: gemstoneName || file.name,
              },
            ])
          }
        } catch (error) {
          console.error("Upload failed:", error)
        }
      }

      setUploading(false)
      setGemstoneName("")
    },
    [gemType, gemstoneName],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
  })

  const removeImage = (publicId: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.publicId !== publicId))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ImageIcon className="h-5 w-5 mr-2" />
            Upload Gemstone Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Gemstone Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gemType">Gemstone Type *</Label>
              <Select value={gemType} onValueChange={setGemType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gemstone type" />
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
              <Label htmlFor="name">Gemstone Name (Optional)</Label>
              <Input
                id="name"
                value={gemstoneName}
                onChange={(e) => setGemstoneName(e.target.value)}
                placeholder="e.g., Ceylon Blue Sapphire"
              />
            </div>
          </div>

          {/* Upload Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-blue-600 font-medium">Drop the images here...</p>
            ) : (
              <div>
                <p className="text-gray-600 font-medium mb-2">Drag & drop gemstone images here, or click to select</p>
                <p className="text-sm text-gray-500">Supports JPEG, PNG, WebP (max 10MB each)</p>
              </div>
            )}
          </div>

          {/* Upload Status */}
          {uploading && (
            <div className="flex items-center justify-center text-blue-600 py-4">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
              Uploading to Cloudinary...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Uploaded Images ({uploadedImages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedImages.map((image) => (
                <div key={image.publicId} className="relative group">
                  <CloudinaryImage
                    publicId={image.publicId}
                    alt={image.name || "Gemstone"}
                    transformation="thumbnail"
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(image.publicId)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 rounded-b-lg">
                    <p className="text-sm font-medium truncate">{image.name}</p>
                    <p className="text-xs text-gray-300">{image.gemType}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Copy URLs */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Cloudinary URLs:</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {uploadedImages.map((image) => (
                  <div key={image.publicId} className="text-xs font-mono bg-white p-2 rounded border">
                    <span className="text-gray-600">Public ID:</span> {image.publicId}
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
