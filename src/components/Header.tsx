'use client'

import { Gem, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <Gem className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Jewelry Designer AI</h1>
              <p className="text-xs text-gray-500">Powered by AI</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
              Gallery
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
              API
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
              About
            </a>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Sign In
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium py-2">
                Gallery
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium py-2">
                Pricing
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium py-2">
                API
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium py-2">
                About
              </a>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full mt-4">
                Sign In
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}