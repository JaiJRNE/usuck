'use client'

import { useState } from 'react'
import { GeneratedJewelry } from '@/types/jewelry'
import { Download, Eye, Share2, Heart, Zap, Clock, DollarSign, Layers, Grid, List } from 'lucide-react'

interface GenerationResultsProps {
  results: GeneratedJewelry
}

export function GenerationResults({ results }: GenerationResultsProps) {
  const [activeTab, setActiveTab] = useState<'main' | 'variations' | 'lifestyle' | 'technical' | '3d'>('main')
  const [selectedImage, setSelectedImage] = useState<string>(results.images.main)
  const [isFavorited, setIsFavorited] = useState(false)

  const handleDownload = (url: string, filename: string) => {
    // In a real app, this would trigger the actual download
    console.log(`Downloading: ${filename} from ${url}`)
  }

  const handleShare = () => {
    // In a real app, this would open share dialog
    console.log('Sharing design...')
  }

  const tabs = [
    { id: 'main', label: 'Main', icon: Eye, count: 1 },
    { id: 'variations', label: 'Variations', icon: Grid, count: results.images.variations.length },
    { id: 'lifestyle', label: 'Lifestyle', icon: Heart, count: results.images.lifestyle?.length || 0 },
    { id: 'technical', label: 'Technical', icon: List, count: results.images.technical?.length || 0 },
    { id: '3d', label: '3D Model', icon: Layers, count: results.model3D ? 1 : 0 }
  ]

  const getActiveImages = () => {
    switch (activeTab) {
      case 'main':
        return [results.images.main]
      case 'variations':
        return results.images.variations
      case 'lifestyle':
        return results.images.lifestyle || []
      case 'technical':
        return results.images.technical || []
      case '3d':
        return results.model3D ? [results.model3D.preview] : []
      default:
        return [results.images.main]
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Design</h2>
          <p className="text-gray-600">
            {results.specs.type.charAt(0).toUpperCase() + results.specs.type.slice(1)} in {results.specs.material}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`p-2 rounded-lg transition-colors ${
              isFavorited ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            const isDisabled = tab.count === 0
            
            return (
              <button
                key={tab.id}
                onClick={() => !isDisabled && setActiveTab(tab.id as any)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : isDisabled
                    ? 'border-transparent text-gray-400 cursor-not-allowed'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                disabled={isDisabled}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Image Display */}
      <div className="space-y-4">
        <div className="relative bg-gray-50 rounded-xl overflow-hidden">
          <img
            src={selectedImage}
            alt="Generated jewelry design"
            className="w-full h-96 object-contain"
          />
          {activeTab === '3d' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center text-white">
                <Layers className="w-12 h-12 mx-auto mb-2" />
                <p className="text-lg font-semibold">3D Model Preview</p>
                <p className="text-sm opacity-75">Interactive 3D viewer would load here</p>
              </div>
            </div>
          )}
        </div>

        {/* Image Thumbnails */}
        {getActiveImages().length > 1 && (
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {getActiveImages().map((imageUrl, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(imageUrl)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === imageUrl ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={imageUrl}
                  alt={`View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Specs Display */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Design Specifications</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{results.specs.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Material:</span>
              <span className="font-medium">{results.specs.material}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gemstone:</span>
              <span className="font-medium">{results.specs.gemstone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Style:</span>
              <span className="font-medium">{results.specs.style}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Size:</span>
              <span className="font-medium">{results.specs.size}</span>
            </div>
            {results.specs.engraving && (
              <div className="flex justify-between">
                <span className="text-gray-600">Engraving:</span>
                <span className="font-medium">"{results.specs.engraving}"</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">AI Model:</span>
              <span className="font-medium">{results.metadata.aiModel}</span>
            </div>
          </div>
        </div>
        
        {results.specs.description && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Description:</h4>
            <p className="text-gray-600 text-sm">{results.specs.description}</p>
          </div>
        )}
      </div>

      {/* Metadata */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg p-4 text-center">
          <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {(results.metadata.processingTime / 1000).toFixed(1)}s
          </div>
          <div className="text-sm text-gray-600">Generation Time</div>
        </div>
        
        <div className="bg-white border rounded-lg p-4 text-center">
          <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            ${results.metadata.cost.toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">Generation Cost</div>
        </div>
        
        <div className="bg-white border rounded-lg p-4 text-center">
          <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {results.images.variations.length + 1}
          </div>
          <div className="text-sm text-gray-600">Total Images</div>
        </div>
      </div>

      {/* Downloads */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Files</h3>
        
        {/* Image Downloads */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-semibold text-gray-700">Images</h4>
          <div className="grid md:grid-cols-2 gap-3">
            <button
              onClick={() => handleDownload(results.images.main, 'main-design.png')}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium">Main Design (PNG)</span>
              <Download className="w-4 h-4 text-gray-600" />
            </button>
            
            {results.images.variations.length > 0 && (
              <button
                onClick={() => handleDownload('#', 'variations.zip')}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium">All Variations (ZIP)</span>
                <Download className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* 3D Model Downloads */}
        {results.model3D && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700">3D Models</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {Object.entries(results.model3D.downloadUrls).map(([format, url]) => (
                url && (
                  <button
                    key={format}
                    onClick={() => handleDownload(url, `jewelry.${format}`)}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium">
                      {format.toUpperCase()} Model
                    </span>
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}