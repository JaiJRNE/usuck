"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Trash2,
  ImageIcon,
  FileSpreadsheet,
  Info,
} from "lucide-react"
import Image from "next/image"

interface UploadedProduct {
  id: string
  name: string
  gemType: string
  image?: File
  imageUrl?: string
  data: any
}

export function BulkProductUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [products, setProducts] = useState<UploadedProduct[]>([])
  const [uploadResult, setUploadResult] = useState<any>(null)

  // CSV Upload
  const onCsvDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setCsvFile(file)

    try {
      const text = await file.text()
      const parsedProducts = parseCSV(text)
      setProducts(parsedProducts)
      setUploadResult(null)
    } catch (error) {
      console.error("Failed to parse CSV:", error)
    }
  }, [])

  // Image Upload
  const onImageDrop = useCallback(
    (acceptedFiles: File[]) => {
      setImageFiles((prev) => [...prev, ...acceptedFiles])

      // Auto-match images to products by filename
      const updatedProducts = products.map((product) => {
        const matchingImage = acceptedFiles.find((file) => file.name.toLowerCase().includes(product.id.toLowerCase()))

        if (matchingImage) {
          return {
            ...product,
            image: matchingImage,
            imageUrl: URL.createObjectURL(matchingImage),
          }
        }
        return product
      })

      setProducts(updatedProducts)
    },
    [products],
  )

  const {
    getRootProps: getCsvRootProps,
    getInputProps: getCsvInputProps,
    isDragActive: isCsvDragActive,
  } = useDropzone({
    onDrop: onCsvDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"],
    },
    multiple: false,
  })

  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
    isDragActive: isImageDragActive,
  } = useDropzone({
    onDrop: onImageDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
  })

  const parseCSV = (text: string): UploadedProduct[] => {
    const lines = text.split("\n").filter((line) => line.trim())
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

    const products: UploadedProduct[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))
      const product: any = { data: {} }

      headers.forEach((header, index) => {
        const value = values[index] || ""
        const key = header.toLowerCase().replace(/\s+/g, "_")

        if (key === "id") product.id = value
        else if (key === "name") product.name = value
        else if (key === "gemtype" || key === "gem_type") product.gemType = value
        else product.data[header] = value
      })

      if (product.id && product.name) {
        products.push(product)
      }
    }

    return products
  }

  const handleBulkUpload = async () => {
    if (products.length === 0) {
      alert("Please upload a CSV file first")
      return
    }

    setUploading(true)
    setProgress(0)

    try {
      const results = []
      const total = products.length

      for (let i = 0; i < products.length; i++) {
        const product = products[i]
        setProgress(((i + 1) / total) * 100)

        const formData = new FormData()
        formData.append("productData", JSON.stringify(product.data))
        formData.append("id", product.id)
        formData.append("name", product.name)
        formData.append("gemType", product.gemType)

        if (product.image) {
          formData.append("image", product.image)
        }

        const response = await fetch("/api/products/bulk-upload", {
          method: "POST",
          body: formData,
        })

        const result = await response.json()
        results.push({ product: product.name, ...result })
      }

      setUploadResult({
        success: true,
        total: total,
        results: results,
      })

      // Clear after successful upload
      setProducts([])
      setCsvFile(null)
      setImageFiles([])
    } catch (error) {
      console.error("Upload failed:", error)
      setUploadResult({
        success: false,
        error: "Upload failed",
      })
    } finally {
      setUploading(false)
    }
  }

  const downloadTemplate = () => {
    const template = `id,name,gemType,shape,carat,color,clarity,treatment,origin,price,dimensions,description
sap-001,Ceylon Blue Sapphire,sapphires,Oval,2.45,Blue,VS,Heated,Sri Lanka,3500,"8.2 x 6.1 x 4.8 mm","Exceptional Ceylon blue sapphire with vivid color"
rub-001,Pigeon Blood Ruby,rubies,Oval,2.15,Pigeon Blood,VS,Heated,Myanmar,12500,"8.1 x 6.2 x 4.5 mm","Rare pigeon blood ruby from Myanmar"
em-001,Colombian Emerald,emeralds,Emerald Cut,2.85,Vivid Green,VS,Oil Treatment,Colombia,9500,"8.5 x 6.8 x 5.2 mm","Beautiful Colombian emerald"`

    const blob = new Blob([template], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "vico-products-template.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bulk Product Upload</h1>
        <p className="text-gray-600">Upload multiple products at once with CSV + Images</p>
      </div>

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm text-blue-900">
              <p className="font-semibold">How to use:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Download the CSV template and fill in your product data</li>
                <li>Name your product images with the product ID (e.g., "sap-001.jpg", "rub-001.png")</li>
                <li>Upload the CSV file first, then upload all product images</li>
                <li>Review the products and click "Upload All" to import</li>
              </ol>
              <p className="text-xs text-blue-700 mt-2">
                💡 Tip: Images will automatically match to products based on the ID in the filename
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Products</TabsTrigger>
          <TabsTrigger value="preview">Preview & Review</TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          {/* Step 1: Download Template */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileSpreadsheet className="h-5 w-5 mr-2 text-green-600" />
                Step 1: Download CSV Template
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Download our template to ensure correct data format</p>
              <Button onClick={downloadTemplate} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </CardContent>
          </Card>

          {/* Step 2: Upload CSV */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Step 2: Upload Product Data (CSV)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                {...getCsvRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isCsvDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <input {...getCsvInputProps()} />
                <FileText className={`h-12 w-12 mx-auto mb-4 ${isCsvDragActive ? "text-blue-500" : "text-gray-400"}`} />
                {csvFile ? (
                  <div>
                    <p className="text-green-600 font-medium mb-2">✓ {csvFile.name}</p>
                    <p className="text-sm text-gray-500">{products.length} products detected</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 font-medium mb-2">Drop CSV file here or click to select</p>
                    <p className="text-sm text-gray-500">One CSV file with all product data</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Upload Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2 text-purple-600" />
                Step 3: Upload Product Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                {...getImageRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isImageDragActive
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <input {...getImageInputProps()} />
                <ImageIcon
                  className={`h-12 w-12 mx-auto mb-4 ${isImageDragActive ? "text-purple-500" : "text-gray-400"}`}
                />
                {imageFiles.length > 0 ? (
                  <div>
                    <p className="text-green-600 font-medium mb-2">✓ {imageFiles.length} images uploaded</p>
                    <p className="text-sm text-gray-500">Drop more images or click to add</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 font-medium mb-2">Drop images here or click to select</p>
                    <p className="text-sm text-gray-500">Upload all product images at once</p>
                    <p className="text-xs text-gray-400 mt-2">Name files with product ID (e.g., sap-001.jpg)</p>
                  </div>
                )}
              </div>

              {imageFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-6 gap-2">
                  {imageFiles.map((file, index) => (
                    <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={file.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 truncate">
                        {file.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          {products.length === 0 ? (
            <Card>
              <CardContent className="p-16 text-center">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No products uploaded yet</p>
                <p className="text-sm text-gray-400 mt-2">Upload a CSV file to see product preview</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{products.length} Products Ready</h3>
                  <p className="text-sm text-gray-600">
                    {products.filter((p) => p.image).length} with images, {products.filter((p) => !p.image).length}{" "}
                    without images
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setProducts([])} className="bg-transparent">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                  <Button onClick={handleBulkUpload} disabled={uploading} size="lg">
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? "Uploading..." : `Upload ${products.length} Products`}
                  </Button>
                </div>
              </div>

              {uploading && (
                <Card>
                  <CardContent className="p-6">
                    <Progress value={progress} className="w-full mb-2" />
                    <p className="text-sm text-gray-600 text-center">Uploading products... {Math.round(progress)}%</p>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product, index) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-gray-100 relative">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center text-gray-400">
                              <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                              <p className="text-sm">No image</p>
                            </div>
                          </div>
                        )}
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => removeProduct(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">ID: {product.id}</p>
                        <div className="text-xs text-gray-500 space-y-1">
                          <p>Type: {product.gemType}</p>
                          {product.data.carat && <p>Carat: {product.data.carat}</p>}
                          {product.data.price && <p>Price: ${product.data.price}</p>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Results */}
      {uploadResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {uploadResult.success ? (
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
              )}
              Upload Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {uploadResult.success ? (
              <div>
                <Alert className="bg-green-50 border-green-200 mb-4">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>Successfully uploaded {uploadResult.total} products!</AlertDescription>
                </Alert>
                <div className="space-y-2">
                  {uploadResult.results.map((result: any, index: number) => (
                    <div key={index} className="text-sm flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>{result.product}</span>
                      <span className="text-green-600">✓ Uploaded</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription>Upload failed: {uploadResult.error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
