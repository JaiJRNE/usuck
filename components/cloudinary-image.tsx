"use client"

import Image from "next/image"
import { useState } from "react"

// Client-side URL builder
function buildCloudinaryUrl(publicId: string, transformation: string) {
  return `https://res.cloudinary.com/df501lz8c/image/upload/${transformation}/${publicId}`
}

const GEMSTONE_TRANSFORMATIONS = {
  hero: "w_1920,h_1080,c_fill,f_auto,q_auto:good,e_sharpen:100",
  card: "w_600,h_600,c_fill,f_auto,q_auto:good,e_sharpen:80",
  thumbnail: "w_300,h_300,c_fill,f_auto,q_auto:good,e_sharpen:60",
  detail: "w_1200,h_1200,c_limit,f_auto,q_auto:best,e_sharpen:120",
  gallery: "w_800,h_800,c_fill,f_auto,q_auto:good,e_sharpen:100",
  enhanced: "w_800,h_800,c_fill,f_auto,q_auto:best,e_sharpen:150,e_vibrance:20,e_auto_contrast",
  watermarked: "w_800,h_800,c_fill,f_auto,q_auto:good,l_text:Arial_40:VICO,g_south_east,o_30",
}

function getGemstoneImageUrl(publicId: string, type: keyof typeof GEMSTONE_TRANSFORMATIONS = "card") {
  return buildCloudinaryUrl(publicId, GEMSTONE_TRANSFORMATIONS[type])
}

interface CloudinaryImageProps {
  publicId: string
  alt: string
  transformation?: "hero" | "card" | "thumbnail" | "detail" | "gallery" | "enhanced" | "watermarked"
  width?: number
  height?: number
  className?: string
  priority?: boolean
  onClick?: () => void
}

export function CloudinaryImage({
  publicId,
  alt,
  transformation = "card",
  width = 600,
  height = 600,
  className = "",
  priority = false,
  onClick,
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const imageUrl = getGemstoneImageUrl(publicId, transformation)

  if (hasError) {
    return (
      <div
        className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-gray-400 text-center">
          <div className="text-4xl mb-2">💎</div>
          <div className="text-sm font-medium">VICO</div>
          <div className="text-xs">Image unavailable</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={onClick}>
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`transition-all duration-500 ${
          isLoading ? "blur-sm scale-110" : "blur-0 scale-100"
        } ${onClick ? "cursor-pointer hover:scale-105" : ""}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <div className="text-xs font-medium">Loading...</div>
          </div>
        </div>
      )}
    </div>
  )
}
