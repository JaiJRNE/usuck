'use client'

import { useState } from 'react'
import { JewelrySpecs, JewelryType, Material, Gemstone, Style, Size } from '@/types/jewelry'
import { Sparkles, DollarSign, Clock, Wand2 } from 'lucide-react'

interface JewelryDesignFormProps {
  onGenerate: (specs: JewelrySpecs) => void
  isGenerating: boolean
}

export function JewelryDesignForm({ onGenerate, isGenerating }: JewelryDesignFormProps) {
  const [specs, setSpecs] = useState<JewelrySpecs>({
    type: 'ring',
    material: 'gold',
    gemstone: 'diamond',
    style: 'modern',
    size: 'M',
    description: '',
    budget: 1000,
    urgency: 'medium'
  })

  const [estimatedCost, setEstimatedCost] = useState(0.08)

  const jewelryTypes: { value: JewelryType; label: string; icon: string }[] = [
    { value: 'ring', label: 'Ring', icon: '💍' },
    { value: 'pendant', label: 'Pendant', icon: '📿' },
    { value: 'necklace', label: 'Necklace', icon: '📿' },
    { value: 'earrings', label: 'Earrings', icon: '👂' },
    { value: 'bracelet', label: 'Bracelet', icon: '📿' },
    { value: 'brooch', label: 'Brooch', icon: '🔖' },
    { value: 'cufflinks', label: 'Cufflinks', icon: '👔' },
    { value: 'anklet', label: 'Anklet', icon: '🦵' }
  ]

  const materials: { value: Material; label: string; color: string }[] = [
    { value: 'gold', label: '18K Gold', color: 'bg-yellow-400' },
    { value: 'silver', label: 'Sterling Silver', color: 'bg-gray-300' },
    { value: 'platinum', label: 'Platinum', color: 'bg-gray-400' },
    { value: 'rose-gold', label: 'Rose Gold', color: 'bg-pink-300' },
    { value: 'white-gold', label: 'White Gold', color: 'bg-gray-200' },
    { value: 'titanium', label: 'Titanium', color: 'bg-gray-500' },
    { value: 'stainless-steel', label: 'Stainless Steel', color: 'bg-gray-600' }
  ]

  const gemstones: { value: Gemstone; label: string; color: string }[] = [
    { value: 'diamond', label: 'Diamond', color: 'bg-white border-2 border-gray-300' },
    { value: 'sapphire', label: 'Sapphire', color: 'bg-blue-500' },
    { value: 'ruby', label: 'Ruby', color: 'bg-red-500' },
    { value: 'emerald', label: 'Emerald', color: 'bg-green-500' },
    { value: 'pearl', label: 'Pearl', color: 'bg-gray-100 border border-gray-300' },
    { value: 'opal', label: 'Opal', color: 'bg-gradient-to-r from-pink-300 to-blue-300' },
    { value: 'amethyst', label: 'Amethyst', color: 'bg-purple-500' },
    { value: 'topaz', label: 'Topaz', color: 'bg-yellow-300' },
    { value: 'garnet', label: 'Garnet', color: 'bg-red-700' },
    { value: 'turquoise', label: 'Turquoise', color: 'bg-cyan-400' },
    { value: 'none', label: 'No Gemstone', color: 'bg-gray-200' }
  ]

  const styles: { value: Style; label: string; description: string }[] = [
    { value: 'minimalist', label: 'Minimalist', description: 'Clean, simple lines' },
    { value: 'vintage', label: 'Vintage', description: 'Classic, timeless appeal' },
    { value: 'modern', label: 'Modern', description: 'Contemporary design' },
    { value: 'gothic', label: 'Gothic', description: 'Dark, dramatic elements' },
    { value: 'bohemian', label: 'Bohemian', description: 'Free-spirited, artistic' },
    { value: 'luxury', label: 'Luxury', description: 'Opulent, prestigious' },
    { value: 'art-deco', label: 'Art Deco', description: 'Geometric, 1920s inspired' },
    { value: 'nature-inspired', label: 'Nature', description: 'Organic, botanical motifs' },
    { value: 'geometric', label: 'Geometric', description: 'Mathematical patterns' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(specs)
  }

  const updateSpecs = (updates: Partial<JewelrySpecs>) => {
    setSpecs(prev => ({ ...prev, ...updates }))
    // Update estimated cost based on selections
    calculateEstimatedCost({ ...specs, ...updates })
  }

  const calculateEstimatedCost = (currentSpecs: JewelrySpecs) => {
    let cost = 0.04 // Base cost
    
    // Add cost based on quality and complexity
    if (currentSpecs.gemstone !== 'none') cost += 0.02
    if (currentSpecs.style === 'luxury') cost += 0.03
    if (currentSpecs.description.length > 100) cost += 0.01
    
    setEstimatedCost(Math.round(cost * 100) / 100)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <Wand2 className="w-8 h-8 mx-auto mb-2 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900">Design Your Jewelry</h2>
        <p className="text-gray-600">Describe your perfect piece and watch AI bring it to life</p>
      </div>

      {/* Jewelry Type Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">Jewelry Type</label>
        <div className="grid grid-cols-4 gap-3">
          {jewelryTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => updateSpecs({ type: type.value })}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                specs.type === type.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{type.icon}</div>
              <div className="text-xs font-medium">{type.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Material Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">Material</label>
        <div className="grid grid-cols-3 gap-3">
          {materials.map((material) => (
            <button
              key={material.value}
              type="button"
              onClick={() => updateSpecs({ material: material.value })}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                specs.material === material.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full mx-auto mb-2 ${material.color}`}></div>
              <div className="text-xs font-medium">{material.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Gemstone Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">Gemstone</label>
        <div className="grid grid-cols-4 gap-3">
          {gemstones.map((stone) => (
            <button
              key={stone.value}
              type="button"
              onClick={() => updateSpecs({ gemstone: stone.value })}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                specs.gemstone === stone.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full mx-auto mb-2 ${stone.color}`}></div>
              <div className="text-xs font-medium">{stone.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Style Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">Style</label>
        <div className="grid grid-cols-3 gap-3">
          {styles.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => updateSpecs({ style: style.value })}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                specs.style === style.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm">{style.label}</div>
              <div className="text-xs text-gray-500">{style.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Description
          <span className="text-gray-500 font-normal"> (Optional)</span>
        </label>
        <textarea
          value={specs.description}
          onChange={(e) => updateSpecs({ description: e.target.value })}
          placeholder="Describe your vision... e.g., 'a delicate rose with thorns, suitable for everyday wear'"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      {/* Engraving */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Engraving
          <span className="text-gray-500 font-normal"> (Optional)</span>
        </label>
        <input
          type="text"
          value={specs.engraving || ''}
          onChange={(e) => updateSpecs({ engraving: e.target.value })}
          placeholder="Custom engraving text..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Cost Estimate */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-semibold text-gray-700">Estimated Cost</span>
          </div>
          <span className="text-lg font-bold text-green-600">${estimatedCost}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>~30-60 seconds generation time</span>
        </div>
      </div>

      {/* Generate Button */}
      <button
        type="submit"
        disabled={isGenerating || !specs.description.trim()}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isGenerating ? (
          <>
            <div className="loading-spinner w-5 h-5 mr-3"></div>
            Generating Design...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Jewelry Design
          </>
        )}
      </button>
    </form>
  )
}