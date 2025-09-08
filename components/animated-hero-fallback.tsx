"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Play, Pause } from "lucide-react"
import Image from "next/image"

export function AnimatedHeroFallback() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const gemstoneImages = [
    "/placeholder.svg?height=1080&width=1920&text=Premium+Blue+Sapphires&color=1e40af",
    "/placeholder.svg?height=1080&width=1920&text=Exquisite+Rubies&color=dc2626",
    "/placeholder.svg?height=1080&width=1920&text=Vivid+Emeralds&color=059669",
    "/placeholder.svg?height=1080&width=1920&text=Rare+Padparadscha&color=f59e0b",
  ]

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % gemstoneImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPlaying, gemstoneImages.length])

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Images */}
      <div className="absolute inset-0">
        {gemstoneImages.map((image, index) => (
          <Image
            key={index}
            src={image || "/placeholder.svg"}
            alt={`Gemstone ${index + 1}`}
            fill
            className={`object-cover transition-all duration-2000 ease-in-out ${
              index === currentImage ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
            priority={index === 0}
            style={{
              filter: "brightness(0.7) contrast(1.1)",
            }}
          />
        ))}
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />

      {/* Animation Control */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleAnimation}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm rounded-full"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8 border border-white/20">
            <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
            Premium B2B Gemstone Collection
          </div>

          <h1 className="text-5xl lg:text-7xl font-light text-white mb-8 tracking-tight text-balance drop-shadow-2xl">
            Ethically sourced
            <span className="block font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              precious gemstones
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-white/95 mb-12 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            Discover our curated collection of sapphires, rubies, and emeralds. Trusted by manufacturers and retailers
            worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 px-8 py-4 text-base font-medium rounded-full smooth-transition shadow-xl transform transition-all duration-200"
            >
              <Link href="/sapphires/basic-search">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 hover:scale-105 px-8 py-4 text-base font-medium rounded-full smooth-transition backdrop-blur-sm bg-transparent transform transition-all duration-200"
            >
              <Link href="/contact">Request Catalog</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {gemstoneImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImage ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
