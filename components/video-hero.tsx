"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight } from "lucide-react"
import Image from "next/image"

interface VideoHeroProps {
  videoSrc?: string
  fallbackImage?: string
}

export function VideoHero({
  videoSrc = "/hero-video.mp4",
  fallbackImage = "/placeholder.svg?height=1080&width=1920&text=Premium+Gemstones+Collection",
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Auto-play when component mounts
      video.play().catch(() => {
        setVideoError(true)
      })
    }
  }, [])

  const togglePlayPause = () => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (video) {
      video.muted = !video.muted
      setIsMuted(video.muted)
    }
  }

  const handleVideoLoad = () => {
    setVideoLoaded(true)
    setVideoError(false)
  }

  const handleVideoError = () => {
    setVideoError(true)
    setVideoLoaded(false)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      {!videoError && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback Image */}
      {(videoError || !videoLoaded) && (
        <Image
          src={fallbackImage || "/placeholder.svg"}
          alt="Premium Gemstones Collection"
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />

      {/* Video Controls */}
      {videoLoaded && !videoError && (
        <div className="absolute top-6 right-6 z-20 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlayPause}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm rounded-full"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMute}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm rounded-full"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8 border border-white/20">
            <Sparkles className="h-4 w-4 mr-2" />
            Premium B2B Gemstone Collection
          </div>

          <h1 className="text-5xl lg:text-7xl font-light text-white mb-8 tracking-tight text-balance drop-shadow-lg">
            Ethically sourced
            <span className="block font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              precious gemstones
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-white/90 mb-12 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Discover our curated collection of sapphires, rubies, and emeralds. Trusted by manufacturers and retailers
            worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-base font-medium rounded-full smooth-transition shadow-lg"
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
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-base font-medium rounded-full smooth-transition backdrop-blur-sm bg-transparent"
            >
              <Link href="/contact">Request Catalog</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="flex items-center space-x-2 text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="text-lg font-light">Loading...</span>
          </div>
        </div>
      )}

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full opacity-40 animate-pulse delay-1000" />
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-white/20 rounded-full opacity-30 animate-pulse delay-500" />
    </section>
  )
}
