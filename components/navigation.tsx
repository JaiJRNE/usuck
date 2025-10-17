"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image src="/vico-logo.webp" alt="VICO Gemstones" fill className="object-contain" priority />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">VICO</div>
              <div className="text-xs text-gray-600 -mt-1">Fine Gemstones</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>

            {/* Gemstones Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("gemstones")}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                Gemstones
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === "gemstones" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/sapphires"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Sapphires
                  </Link>
                  <Link
                    href="/rubies"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Rubies
                  </Link>
                  <Link
                    href="/emeralds"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Emeralds
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>

            {/* Admin Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("admin")}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                Admin
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === "admin" && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/admin/bulk-products"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setActiveDropdown(null)}
                  >
                    VICO Master Upload
                  </Link>
                  <Link
                    href="/admin/add-product"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Add Single Product
                  </Link>
                </div>
              )}
            </div>

            <Button size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <div className="space-y-2">
              <div className="font-semibold text-gray-900">Gemstones</div>
              <Link
                href="/sapphires"
                className="block pl-4 text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Sapphires
              </Link>
              <Link
                href="/rubies"
                className="block pl-4 text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Rubies
              </Link>
              <Link
                href="/emeralds"
                className="block pl-4 text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Emeralds
              </Link>
            </div>
            <Link href="/about" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <div className="space-y-2">
              <div className="font-semibold text-gray-900">Admin</div>
              <Link
                href="/admin/bulk-products"
                className="block pl-4 text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                VICO Master Upload
              </Link>
              <Link
                href="/admin/add-product"
                className="block pl-4 text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Add Single Product
              </Link>
            </div>
            <Button className="w-full" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
