'use client'

import { useState } from 'react'
import { JewelryDesignForm } from '@/components/JewelryDesignForm'
import { ImageUpload } from '@/components/ImageUpload'
import { GenerationResults } from '@/components/GenerationResults'
import { Header } from '@/components/Header'
import { JewelrySpecs, GeneratedJewelry, UploadedImage } from '@/types/jewelry'
import { Gem, Sparkles, Image as ImageIcon } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationResults, setGenerationResults] = useState<GeneratedJewelry | null>(null)
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null)

  const handleTextGeneration = async (specs: JewelrySpecs) => {
    setIsGenerating(true)
    try {
      // Simulate generation process
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const mockResult: GeneratedJewelry = {
        id: `gen_${Date.now()}`,
        specs,
        images: {
          main: '/api/placeholder/1024/1024',
          variations: [
            '/api/placeholder/1024/1024',
            '/api/placeholder/1024/1024',
            '/api/placeholder/1024/1024'
          ],
          lifestyle: ['/api/placeholder/1024/1024'],
          technical: ['/api/placeholder/1024/1024']
        },
        model3D: {
          preview: '/api/placeholder/800/600',
          downloadUrls: {
            obj: '/downloads/jewelry.obj',
            stl: '/downloads/jewelry.stl',
            gltf: '/downloads/jewelry.gltf'
          }
        },
        metadata: {
          createdAt: new Date(),
          processingTime: 3000,
          cost: 0.12,
          prompt: `A stunning ${specs.type} in ${specs.material} with ${specs.gemstone}`,
          aiModel: 'DALL-E 3'
        }
      }
      
      setGenerationResults(mockResult)
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleImageGeneration = async (image: UploadedImage, specs: JewelrySpecs) => {
    setIsGenerating(true)
    try {
      // Simulate image analysis and generation
      await new Promise(resolve => setTimeout(resolve, 4000))
      
      const mockResult: GeneratedJewelry = {
        id: `gen_img_${Date.now()}`,
        specs,
        images: {
          main: '/api/placeholder/1024/1024',
          variations: [
            '/api/placeholder/1024/1024',
            '/api/placeholder/1024/1024'
          ]
        },
        metadata: {
          createdAt: new Date(),
          processingTime: 4000,
          cost: 0.16,
          prompt: `Jewelry inspired by uploaded image: ${image.filename}`,
          aiModel: 'GPT-4 Vision + DALL-E 3'
        }
      }
      
      setGenerationResults(mockResult)
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Design Your Perfect
            <span className="text-transparent bg-clip-text jewelry-gradient"> Jewelry</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Create stunning custom jewelry designs using AI. Transform your ideas or images 
            into professional-quality jewelry concepts ready for manufacturing.
          </p>
        </div>

        {/* Generation Mode Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg border">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex items-center px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'text'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Text to Jewelry
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`flex items-center px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'image'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Image to Jewelry
            </button>
          </div>
        </div>

        {/* Generation Interface */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {activeTab === 'text' ? (
              <JewelryDesignForm 
                onGenerate={handleTextGeneration}
                isGenerating={isGenerating}
              />
            ) : (
              <ImageUpload
                onImageAnalyzed={setUploadedImage}
                onGenerate={handleImageGeneration}
                isGenerating={isGenerating}
              />
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-96">
                <div className="loading-spinner mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Creating Your Jewelry Design
                </h3>
                <p className="text-gray-600 text-center">
                  AI is analyzing your request and generating stunning designs...
                </p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            ) : generationResults ? (
              <GenerationResults results={generationResults} />
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                <Gem className="w-16 h-16 mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Ready to Create</h3>
                <p className="text-center">
                  Your AI-generated jewelry designs will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg jewelry-card">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Design</h3>
            <p className="text-gray-600">
              Advanced AI creates unique jewelry designs from your descriptions or images
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg jewelry-card">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gem className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
            <p className="text-gray-600">
              Get 2D renders, 3D models, and CAD files ready for manufacturing
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg jewelry-card">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Image Analysis</h3>
            <p className="text-gray-600">
              Upload any image and watch it transform into wearable jewelry
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}