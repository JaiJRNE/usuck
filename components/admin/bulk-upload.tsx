"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Upload, FileText, CheckCircle, AlertCircle, Trash2 } from "lucide-react"
import { parseCSV, generateCSVTemplate } from "@/lib/csv-parser"
import type { Gemstone, BulkUploadResult } from "@/lib/types/gemstone"

export function BulkUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<BulkUploadResult | null>(null)
  const [previewData, setPreviewData] = useState<Gemstone[]>([])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    try {
      const content = await file.text()
      const parsed = parseCSV(content)
      setPreviewData(parsed)
      setResult(null)
    } catch (error) {
      console.error("Failed to parse CSV:", error)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"],
    },
    multiple: false,
  })

  const handleBulkUpload = async () => {
    if (!previewData.length) return

    setUploading(true)
    setProgress(0)

    try {
      const response = await fetch("/api/gemstones/bulk-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gemstones: previewData }),
      })

      const result: BulkUploadResult = await response.json()
      setResult(result)

      if (result.success) {
        setPreviewData([])
      }
    } catch (error) {
      console.error("Bulk upload failed:", error)
      setResult({
        success: false,
        processed: 0,
        errors: [{ row: 0, error: "Upload failed" }],
        imported: [],
      })
    } finally {
      setUploading(false)
      setProgress(100)
    }
  }

  const downloadTemplate = () => {
    const template = generateCSVTemplate()
    const blob = new Blob([template], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "vico-gemstones-template.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bulk Gemstone Upload</h1>
        <p className="text-gray-600">Upload multiple gemstones at once using CSV format</p>
      </div>

      {/* Template Download */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Step 1: Download Template
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Download our CSV template to ensure your data is formatted correctly.</p>
          <Button onClick={downloadTemplate} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download CSV Template
          </Button>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Step 2: Upload Your CSV
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            <input {...getInputProps()} />
            <FileText className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? "text-blue-500" : "text-gray-400"}`} />
            {isDragActive ? (
              <p className="text-blue-600 font-medium">Drop your CSV file here...</p>
            ) : (
              <div>
                <p className="text-gray-600 font-medium mb-2">Drag & drop your CSV file here</p>
                <p className="text-sm text-gray-500">or click to select a file</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Preview Data */}
      {previewData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Step 3: Preview & Upload ({previewData.length} items)
              </span>
              <Button onClick={() => setPreviewData([])} variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="max-h-64 overflow-y-auto border rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="p-2 text-left">ID</th>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Type</th>
                      <th className="p-2 text-left">Carat</th>
                      <th className="p-2 text-left">Price</th>
                      <th className="p-2 text-left">Origin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.slice(0, 10).map((gem, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2 font-mono text-xs">{gem.id}</td>
                        <td className="p-2">{gem.name}</td>
                        <td className="p-2 capitalize">{gem.gemType}</td>
                        <td className="p-2">{gem.carat} ct</td>
                        <td className="p-2">${gem.price.toLocaleString()}</td>
                        <td className="p-2">{gem.origin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {previewData.length > 10 && (
                <p className="text-sm text-gray-500 mt-2">
                  Showing first 10 items. {previewData.length - 10} more items will be uploaded.
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <Button onClick={handleBulkUpload} disabled={uploading} className="flex-1">
                {uploading ? "Uploading..." : `Upload ${previewData.length} Gemstones`}
              </Button>
            </div>

            {uploading && (
              <div className="mt-4">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-gray-600 mt-2">Processing gemstones...</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {result.success ? (
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
              )}
              Upload Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{result.processed}</div>
                <div className="text-sm text-blue-600">Processed</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{result.imported.length}</div>
                <div className="text-sm text-green-600">Imported</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{result.errors.length}</div>
                <div className="text-sm text-red-600">Errors</div>
              </div>
            </div>

            {result.errors.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-medium mb-2">Errors encountered:</div>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {result.errors.map((error, index) => (
                      <div key={index} className="text-sm">
                        Row {error.row}: {error.error}
                      </div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
