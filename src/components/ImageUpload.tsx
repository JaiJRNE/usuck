'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { JewelrySpecs, UploadedImage, JewelryType } from '@/types/jewelry'
import { Upload, Image as ImageIcon, Sparkles, X, Eye } from 'lucide-react'

interface ImageUploadProps {
  onImageAnalyzed: (image: UploadedImage) => void
  onGenerate: (image: UploadedImage, specs: JewelrySpecs) => void
  isGenerating: boolean
}

export function ImageUpload({ onImageAnalyzed, onGenerate, isGenerating }: ImageUploadProps) {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedJewelryType, setSelectedJewelryType] = useState<JewelryType>('pendant')
  const [analysisResults, setAnalysisResults] = useState<{
    description: string
    suggestedTypes: JewelryType[]
    confidence: number
  } | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setIsAnalyzing(true)

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      
      const uploaded: UploadedImage = {
        id: `img_${Date.now()}`,
        url: previewUrl,
        filename: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date()
      }

      setUploadedImage(uploaded)
      onImageAnalyzed(uploaded)

      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000))

      const mockAnalysis = {
        description: "This image shows a beautiful floral design with delicate petals and organic curves. The composition suggests elegant, nature-inspired jewelry with flowing lines and botanical elements.",
        suggestedTypes: ['pendant', 'earrings', 'brooch'] as JewelryType[],
        confidence: 0.87
      }

      setAnalysisResults(mockAnalysis)

    } catch (error) {
      console.error('Error analyzing image:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }, [onImageAnalyzed])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const handleGenerate = () => {
    if (!uploadedImage) return

    const specs: JewelrySpecs = {
      type: selectedJewelryType,
      material: 'gold',
      gemstone: 'diamond',
      style: 'nature-inspired',
      size: 'M',
      description: analysisResults?.description || 'Jewelry inspired by uploaded image'
    }

    onGenerate(uploadedImage, specs)
  }

  const clearImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage.url)
    }
    setUploadedImage(null)
    setAnalysisResults(null)
  }

  const jewelryTypes: { value: JewelryType; label: string; icon: string }[] = [
    { value: 'ring', label: 'Ring', icon: '💍' },
    { value: 'pendant', label: 'Pendant', icon: '📿' },
    { value: 'necklace', label: 'Necklace', icon: '📿' },
    { value: 'earrings', label: 'Earrings', icon: '👂' },
    { value: 'bracelet', label: 'Bracelet', icon: '📿' },
    { value: 'brooch', label: 'Brooch', icon: '🔖' }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <ImageIcon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900">Upload Your Inspiration</h2>
        <p className="text-gray-600">Transform any image into beautiful jewelry</p>
      </div>

      {!uploadedImage ? (
        /* Upload Area */
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
              isDragActive ? 'bg-blue-500' : 'bg-gray-100'
            }`}>
              <Upload className={`w-8 h-8 ${isDragActive ? 'text-white' : 'text-gray-400'}`} />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {isDragActive ? 'Drop your image here' : 'Upload an image'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Drag & drop or click to browse • JPG, PNG, GIF up to 10MB
              </p>
            </div>
            <div className="text-xs text-gray-400">
              Supported: Photos, sketches, artwork, fashion images
            </div>
          </div>
        </div>
      ) : (
        /* Image Preview and Analysis */
        <div className="space-y-6">
          {/* Image Preview */}
          <div className="relative">
            <img
              src={uploadedImage.url}
              alt="Uploaded inspiration"
              className="w-full h-64 object-cover rounded-xl border"
            />
            <button
              onClick={clearImage}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            <div className="absolute bottom-3 left-3 bg-white rounded-lg px-3 py-1 shadow-lg">
              <p className="text-sm font-medium text-gray-700">{uploadedImage.filename}</p>
              <p className="text-xs text-gray-500">{(uploadedImage.size / 1024 / 1024).toFixed(1)} MB</p>
            </div>
          </div>

          {/* Analysis Results */}
          {isAnalyzing ? (
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="loading-spinner mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Analyzing Image</h3>
              <p className="text-blue-600">AI is studying your image to understand design elements...</p>
            </div>
          ) : analysisResults ? (
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <Eye className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-800">AI Analysis Complete</h3>
                <span className="ml-auto text-sm text-green-600 font-medium">
                  {Math.round(analysisResults.confidence * 100)}% confidence
                </span>
              </div>
              <p className="text-green-700 mb-4">{analysisResults.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-green-800 mb-2">Suggested Jewelry Types:</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResults.suggestedTypes.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {/* Jewelry Type Selection */}
          {analysisResults && (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Choose Jewelry Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {jewelryTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setSelectedJewelryType(type.value)}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      selectedJewelryType === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${
                      analysisResults.suggestedTypes.includes(type.value)
                        ? 'ring-2 ring-green-200'
                        : ''
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-xs font-medium">{type.label}</div>
                    {analysisResults.suggestedTypes.includes(type.value) && (
                      <div className="text-xs text-green-600 font-medium">Recommended</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Generate Button */}
          {analysisResults && (
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 focus:ring-4 focus:ring-purple-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <div className="loading-spinner w-5 h-5 mr-3"></div>
                  Creating Design...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Jewelry from Image
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">💡 Tips for Better Results</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Use high-quality, well-lit images</li>
          <li>• Clear subjects work better than busy backgrounds</li>
          <li>• Sketches, nature photos, and artwork are ideal</li>
          <li>• The AI will extract colors, shapes, and patterns</li>
        </ul>
      </div>
    </div>
  )
}