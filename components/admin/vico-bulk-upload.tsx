"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Upload, FileText, CheckCircle, AlertCircle, Info, Database } from "lucide-react"
import { parseVicoCSV, generateVicoCSVTemplate } from "@/lib/vico-csv-parser"
import type { Gemstone } from "@/lib/types/gemstone"

export function VicoBulkUpload() {
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [products, setProducts] = useState<Gemstone[]>([])
  const [uploadResult, setUploadResult] = useState<any>(null)
  const [testResult, setTestResult] = useState<any>(null)

  const csvUrl = "https://blob.v0.app/vKojd.csv"

  const testDatabase = async () => {
    setTesting(true)
    setTestResult(null)
    try {
      console.log("[v0] Testing database connection...")
      const response = await fetch("/api/test-db")
      const result = await response.json()
      console.log("[v0] Database test result:", result)
      setTestResult(result)
    } catch (error) {
      console.error("[v0] Database test failed:", error)
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setTesting(false)
    }
  }

  const loadMasterCSV = async () => {
    setLoading(true)
    setUploadResult(null)
    try {
      console.log("[v0] Loading master CSV from:", csvUrl)

      const response = await fetch(csvUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`)
      }

      const text = await response.text()

      console.log("[v0] CSV loaded successfully")
      console.log("[v0] CSV length:", text.length, "characters")
      console.log("[v0] First 200 chars:", text.substring(0, 200))

      const parsedProducts = parseVicoCSV(text)

      console.log("[v0] Parsed products:", {
        total: parsedProducts.length,
        byType: parsedProducts.reduce(
          (acc, p) => {
            acc[p.gemType] = (acc[p.gemType] || 0) + 1
            return acc
          },
          {} as Record<string, number>,
        ),
        firstProduct: parsedProducts[0],
      })

      if (parsedProducts.length === 0) {
        throw new Error("No products found in CSV. Please check the CSV format.")
      }

      setProducts(parsedProducts)
      alert(`Successfully loaded ${parsedProducts.length} products from CSV!`)

      console.log(`[v0] ✓ Loaded ${parsedProducts.length} products from master CSV`)
    } catch (error) {
      console.error("[v0] Failed to load master CSV:", error)
      alert(`Failed to load CSV: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleBulkUpload = async () => {
    if (products.length === 0) {
      alert("Please load products first by clicking 'Load Master CSV'")
      return
    }

    const confirmed = confirm(
      `Are you sure you want to upload ${products.length} products to the database? This will overwrite any existing products with the same IDs.`,
    )

    if (!confirmed) return

    setUploading(true)
    setProgress(0)
    setUploadResult(null)

    try {
      console.log("[v0] ========================================")
      console.log("[v0] Starting bulk upload of", products.length, "products")
      console.log("[v0] ========================================")

      setProgress(10)

      // Call the actual API endpoint
      const response = await fetch("/api/vico-bulk-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gemstones: products }),
      })

      setProgress(50)

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()

      console.log("[v0] ========================================")
      console.log("[v0] Upload response:", result)
      console.log("[v0] ========================================")

      setProgress(100)
      setUploadResult(result)

      if (result.success) {
        alert(
          `Upload complete! ${result.results?.success || 0} products uploaded successfully. ${result.results?.failed || 0} failed.`,
        )
      } else {
        alert(`Upload failed: ${result.error}`)
      }
    } catch (error) {
      console.error("[v0] Upload failed:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      setUploadResult({
        success: false,
        error: errorMessage,
      })
      alert(`Upload failed: ${errorMessage}`)
    } finally {
      setUploading(false)
    }
  }

  // Group products by type
  const productsByType = products.reduce(
    (acc, product) => {
      const type = product.gemType
      if (!acc[type]) acc[type] = []
      acc[type].push(product)
      return acc
    },
    {} as Record<string, Gemstone[]>,
  )

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">VICO Master Inventory Upload</h1>
        <p className="text-gray-600">Load and import products from your master CSV file</p>
      </div>

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm text-blue-900">
              <p className="font-semibold">How to upload your products:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>
                  <strong>Test Database</strong> - Click "Test Database Connection" to verify everything is working
                </li>
                <li>
                  <strong>Load CSV</strong> - Click "Load Master CSV" to fetch your inventory
                </li>
                <li>
                  <strong>Review</strong> - Check the products that were loaded
                </li>
                <li>
                  <strong>Upload</strong> - Click "Upload to Database" to save all products
                </li>
                <li>
                  <strong>Verify</strong> - Visit your Sapphires/Rubies/Emeralds pages to see the products
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Test */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2 text-purple-600" />
            Step 0: Test Database Connection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">Verify that the database connection is working correctly</p>

          <Button onClick={testDatabase} disabled={testing} variant="outline">
            <Database className="h-4 w-4 mr-2" />
            {testing ? "Testing..." : "Test Database Connection"}
          </Button>

          {testResult && (
            <Alert className={testResult.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
              {testResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription>
                {testResult.success ? (
                  <div>
                    <p className="font-semibold text-green-900">Database connection successful!</p>
                    <p className="text-xs text-green-700 mt-1">You can proceed with uploading products.</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold text-red-900">Database connection failed</p>
                    <p className="text-xs text-red-700 mt-1">{testResult.error}</p>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Load Master CSV */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Step 1: Load Master Inventory
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">Load products from your master CSV file</p>

          <div className="flex gap-3">
            <Button onClick={loadMasterCSV} disabled={loading} size="lg">
              <Download className="h-4 w-4 mr-2" />
              {loading ? "Loading..." : "Load Master CSV"}
            </Button>

            <Button onClick={downloadTemplate} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>

          {products.length > 0 && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <p className="font-semibold text-green-900">Loaded {products.length} products</p>
                <div className="mt-2 text-xs space-y-1 text-green-700">
                  {Object.entries(productsByType).map(([type, items]) => (
                    <div key={type}>
                      • {type}: {items.length} products
                    </div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Product Preview */}
      {products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Step 2: Review Products ({products.length})</span>
              <Button
                onClick={handleBulkUpload}
                disabled={uploading}
                size="lg"
                className="bg-green-600 hover:bg-green-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? "Uploading..." : `Upload ${products.length} Products to Database`}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {uploading && (
              <div className="mb-6">
                <Progress value={progress} className="w-full mb-2" />
                <p className="text-sm text-gray-600 text-center">
                  Uploading products to Supabase... {Math.round(progress)}%
                </p>
              </div>
            )}

            <div className="space-y-6">
              {Object.entries(productsByType).map(([type, items]) => (
                <div key={type}>
                  <h3 className="text-lg font-semibold mb-3 capitalize">
                    {type} ({items.length})
                  </h3>
                  <div className="grid gap-3">
                    {items.slice(0, 5).map((product) => (
                      <Card key={product.id} className="bg-gray-50">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm text-gray-600">{product.id}</span>
                                <span className="font-semibold">{product.name}</span>
                              </div>
                              <div className="text-sm text-gray-600">
                                {product.carat}ct • {product.shape} • {product.color} • {product.clarity}
                              </div>
                              <div className="text-xs text-gray-500">
                                {product.treatment} • {product.origin}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {items.length > 5 && (
                      <p className="text-sm text-gray-500 text-center">
                        ... and {items.length - 5} more {type}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p className="font-semibold text-green-900">Successfully uploaded products to database!</p>
                      <div className="text-sm text-green-700">
                        <p>✓ Success: {uploadResult.results?.success || 0} products</p>
                        {uploadResult.results?.failed > 0 && (
                          <p className="text-red-600">✗ Failed: {uploadResult.results.failed} products</p>
                        )}
                      </div>
                      <p className="text-xs text-green-600 mt-2">
                        Your products are now live! Visit the Sapphires, Rubies, or Emeralds pages to see them.
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>

                {uploadResult.results?.errors && uploadResult.results.errors.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm mb-2">Errors:</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {uploadResult.results.errors.map((err: any, i: number) => (
                        <div key={i} className="text-xs bg-red-50 p-2 rounded border border-red-200">
                          <span className="font-mono">{err.id}</span>: {err.error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription>
                  <p className="font-semibold text-red-900">Upload failed</p>
                  <p className="text-sm text-red-700 mt-1">{uploadResult.error}</p>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )

  function downloadTemplate() {
    const template = generateVicoCSVTemplate()
    const blob = new Blob([template], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "vico-template.csv"
    a.click()
    URL.revokeObjectURL(url)
  }
}
