"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === "/"
  const shouldUseTransparentNav = isHomePage && !scrolled

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        shouldUseTransparentNav
          ? "bg-transparent backdrop-blur-sm"
          : "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                src="/vico-logo.webp"
                alt="VICO by Vaibhav International"
                width={120}
                height={40}
                className={`h-10 w-auto transition-all duration-300 ${
                  shouldUseTransparentNav ? "brightness-0 invert drop-shadow-lg" : "brightness-100 contrast-100"
                }`}
                priority
              />
              <div className="sr-only">
                <div
                  className={`text-2xl font-semibold tracking-tight transition-colors duration-300 ${
                    shouldUseTransparentNav ? "text-white drop-shadow-lg" : "text-vico-primary"
                  }`}
                >
                  VICO
                </div>
                <div
                  className={`ml-2 text-sm font-medium transition-colors duration-300 ${
                    shouldUseTransparentNav ? "text-white/90 drop-shadow-md" : "text-gray-600"
                  }`}
                >
                  by Vaibhav
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium text-sm smooth-transition ${
                shouldUseTransparentNav
                  ? "text-white/90 hover:text-white drop-shadow-md"
                  : "text-gray-700 hover:text-vico-primary"
              }`}
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center font-medium text-sm smooth-transition ${
                  shouldUseTransparentNav
                    ? "text-white/90 hover:text-white drop-shadow-md"
                    : "text-gray-700 hover:text-vico-primary"
                }`}
              >
                Gemstones
                <ChevronDown className="ml-1 h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 bg-white/95 backdrop-blur-xl border-0 shadow-xl rounded-xl">
                <DropdownMenuItem asChild className="hover:bg-gray-50/80 rounded-lg mx-1">
                  <Link href="/sapphires/basic-search" className="font-medium text-gray-700 hover:text-vico-primary">
                    Sapphires
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-gray-50/80 rounded-lg mx-1">
                  <Link href="/rubies/basic-search" className="font-medium text-gray-700 hover:text-vico-primary">
                    Rubies
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-gray-50/80 rounded-lg mx-1">
                  <Link href="/emeralds/basic-search" className="font-medium text-gray-700 hover:text-vico-primary">
                    Emeralds
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/about"
              className={`font-medium text-sm smooth-transition ${
                shouldUseTransparentNav
                  ? "text-white/90 hover:text-white drop-shadow-md"
                  : "text-gray-700 hover:text-vico-primary"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`font-medium text-sm smooth-transition ${
                shouldUseTransparentNav
                  ? "text-white/90 hover:text-white drop-shadow-md"
                  : "text-gray-700 hover:text-vico-primary"
              }`}
            >
              Contact
            </Link>

            {/* Admin Dropdown - Always visible */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center font-medium text-sm smooth-transition ${
                  shouldUseTransparentNav
                    ? "text-white/90 hover:text-white drop-shadow-md"
                    : "text-gray-700 hover:text-vico-primary"
                }`}
              >
                Admin
                <ChevronDown className="ml-1 h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 bg-white/95 backdrop-blur-xl border-0 shadow-xl rounded-xl">
                <DropdownMenuItem asChild className="hover:bg-gray-50/80 rounded-lg mx-1">
                  <Link
                    href="/admin/bulk-products"
                    className="font-medium text-gray-700 hover:text-vico-primary flex items-center"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Bulk Upload
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-gray-50/80 rounded-lg mx-1">
                  <Link href="/admin/add-product" className="font-medium text-gray-700 hover:text-vico-primary">
                    Add Single Product
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              asChild
              className={`rounded-full px-6 font-medium transition-all duration-300 ${
                shouldUseTransparentNav
                  ? "bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md hover:scale-105"
                  : "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              <Link href="/contact">Get Quote</Link>
            </Button>
          </nav>

          {/* Mobile Navigation Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden transition-colors duration-300 ${
              shouldUseTransparentNav
                ? "text-white hover:text-white hover:bg-white/20"
                : "text-gray-700 hover:text-vico-primary hover:bg-gray-100"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100/50 shadow-lg">
          <div className="px-6 py-6 space-y-4">
            <div className="flex justify-center pb-4 border-b border-gray-200">
              <Image
                src="/vico-logo.webp"
                alt="VICO by Vaibhav International"
                width={100}
                height={33}
                className="h-8 w-auto"
              />
            </div>

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-red-600 font-medium smooth-transition"
            >
              Home
            </Link>
            <div className="space-y-3">
              <div className="text-red-600 font-semibold">Gemstones</div>
              <div className="pl-4 space-y-3">
                <Link
                  href="/sapphires/basic-search"
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-600 hover:text-red-600 smooth-transition"
                >
                  Sapphires
                </Link>
                <Link
                  href="/rubies/basic-search"
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-600 hover:text-red-600 smooth-transition"
                >
                  Rubies
                </Link>
                <Link
                  href="/emeralds/basic-search"
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-600 hover:text-red-600 smooth-transition"
                >
                  Emeralds
                </Link>
              </div>
            </div>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-red-600 font-medium smooth-transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-red-600 font-medium smooth-transition"
            >
              Contact
            </Link>

            {/* Admin Links - Mobile */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="text-red-600 font-semibold">Admin</div>
              <div className="pl-4 space-y-3">
                <Link
                  href="/admin/bulk-products"
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-600 hover:text-red-600 smooth-transition flex items-center"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Upload
                </Link>
                <Link
                  href="/admin/add-product"
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-600 hover:text-red-600 smooth-transition"
                >
                  Add Single Product
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button
                asChild
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full font-medium shadow-lg"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Get Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
