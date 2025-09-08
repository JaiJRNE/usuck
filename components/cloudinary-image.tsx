"use client"

import Image from "next/image"
import { useState } from "react"
import { getGemstoneImageUrl } from "@/lib/cloudinary-config"

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
