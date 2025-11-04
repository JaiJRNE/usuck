"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [gemstonesOpen, setGemstonesOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/vico-logo.webp" alt="VICO Fine Gemstones" width={120} height={40} className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-vico-primary transition-colors">
              Home
            </Link>

            {/* Gemstones Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center text-gray-700 hover:text-vico-primary transition-colors"
                onMouseEnter={() => setGemstonesOpen(true)}
                onMouseLeave={() => setGemstonesOpen(false)}
              >
                Gemstones
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {gemstonesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                  onMouseEnter={() => setGemstonesOpen(true)}
                  onMouseLeave={() => setGemstonesOpen(false)}
                >
                  <Link
                    href="/sapphires/basic-search"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-vico-primary"
                  >
                    Sapphires
                  </Link>
                  <Link
                    href="/rubies/basic-search"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-vico-primary"
                  >
                    Rubies
                  </Link>
                  <Link
                    href="/emeralds/basic-search"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-vico-primary"
                  >
                    Emeralds
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about" className="text-gray-700 hover:text-vico-primary transition-colors">
              About
            </Link>

            <Link href="/contact" className="text-gray-700 hover:text-vico-primary transition-colors">
              Contact
            </Link>

            <Button asChild className="bg-vico-primary hover:bg-vico-primary-light text-white rounded-full">
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/" className="block py-2 text-gray-700 hover:text-vico-primary">
              Home
            </Link>
            <Link href="/sapphires/basic-search" className="block py-2 text-gray-700 hover:text-vico-primary">
              Sapphires
            </Link>
            <Link href="/rubies/basic-search" className="block py-2 text-gray-700 hover:text-vico-primary">
              Rubies
            </Link>
            <Link href="/emeralds/basic-search" className="block py-2 text-gray-700 hover:text-vico-primary">
              Emeralds
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-vico-primary">
              About
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-vico-primary">
              Contact
            </Link>
            <Button asChild className="w-full mt-4 bg-vico-primary hover:bg-vico-primary-light text-white">
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
