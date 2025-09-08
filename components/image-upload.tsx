"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ImageIcon, CheckCircle, AlertCircle } from "lucide-react"

export function ImageUpload() {
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<any>(null)

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      setUploadResult(result)
    } catch (error) {
      setUploadResult({ success: false, error: "Upload failed" })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="text-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Gemstone Image</h3>
          <p className="text-gray-600 text-sm mb-4">Upload high-quality images for your gemstone collection</p>

          <div className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="cursor-pointer"
            />

            {uploading && (
              <div className="flex items-center justify-center text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Uploading...
              </div>
            )}

            {uploadResult && (
              <div
                className={`flex items-center justify-center ${
                  uploadResult.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {uploadResult.success ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Upload successful!
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {uploadResult.error}
                  </>
                )}
              </div>
            )}

            {uploadResult?.success && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 break-all">URL: {uploadResult.url}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
