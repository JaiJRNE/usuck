"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight, RotateCcw, AlertCircle } from "lucide-react"
import Image from "next/image"

interface VideoHeroBackgroundProps {
  videoSrc?: string
  fallbackImage?: string
  posterImage?: string
}

export function VideoHeroBackground({
  videoSrc = "/hero-gemstone-video.mp4", // Replace with your actual video path
  fallbackImage = "/placeholder.svg?height=1080&width=1920&text=Premium+Gemstones+Collection",
  posterImage = "/placeholder.svg?height=1080&width=1920&text=Loading+Video...",
}: VideoHeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingTimeout, setLoadingTimeout] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Set a timeout to show fallback if video takes too long to load
    const timeout = setTimeout(() => {
      if (isLoading && !videoLoaded) {
        console.log("Video loading timeout - switching to fallback")
        setLoadingTimeout(true)
        setVideoError(true)
        setIsLoading(false)
      }
    }, 10000) // 10 second timeout

    const handleCanPlay = () => {
      console.log("Video can play")
      setVideoLoaded(true)
      setIsLoading(false)
      setVideoError(false)
      clearTimeout(timeout)

      // Auto-play after loading
      video
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.log("Auto-play failed:", error)
          setIsPlaying(false)
        })
    }

    const handleError = (e: Event) => {
      console.log("Video error:", e)
      setVideoError(true)
      setVideoLoaded(false)
      setIsLoading(false)
      clearTimeout(timeout)
    }

    const handleLoadStart = () => {
      console.log("Video load started")
      setIsLoading(true)
    }

    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded")
    }

    const handleLoadedData = () => {
      console.log("Video data loaded")
    }

    // Add event listeners
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)
    video.addEventListener("loadstart", handleLoadStart)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("loadeddata", handleLoadedData)

    // Try to load the video
    video.load()

    return () => {
      clearTimeout(timeout)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
      video.removeEventListener("loadstart", handleLoadStart)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("loadeddata", handleLoadedData)
    }
  }, [videoSrc])

  const togglePlayPause = () => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
        setIsPlaying(false)
      } else {
        video
          .play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.log("Play failed:", error)
            setVideoError(true)
          })
      }
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (video) {
      video.muted = !video.muted
      setIsMuted(video.muted)
    }
  }

  const restartVideo = () => {
    const video = videoRef.current
    if (video) {
      video.currentTime = 0
      video
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.log("Restart failed:", error)
          setVideoError(true)
        })
    }
  }

  const retryVideoLoad = () => {
    const video = videoRef.current
    if (video) {
      setVideoError(false)
      setIsLoading(true)
      setLoadingTimeout(false)
      video.load()
    }
  }

  // Show fallback immediately if there's no video source or if it's a placeholder
  const shouldShowFallback = !videoSrc || videoSrc.includes("placeholder") || videoError || loadingTimeout

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Background */}
      {!shouldShowFallback && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster={posterImage}
          style={{
            filter: "brightness(0.7) contrast(1.1)",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback Image - Always show if no video or error */}
      <Image
        src={fallbackImage || "/placeholder.svg"}
        alt="Premium Gemstones Collection"
        fill
        className={`object-cover transition-opacity duration-1000 ${shouldShowFallback ? "opacity-100" : "opacity-0"}`}
        priority
        style={{
          filter: "brightness(0.7) contrast(1.1)",
        }}
      />

      {/* Loading State */}
      {isLoading && !shouldShowFallback && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg font-light">Loading video...</p>
            <p className="text-sm text-white/70 mt-2">This may take a moment</p>
          </div>
        </div>
      )}

      {/* Dynamic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Video Controls */}
      {videoLoaded && !shouldShowFallback && (
        <div
          className={`absolute top-6 right-6 z-20 flex gap-2 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlayPause}
            className="bg-black/20 border-white/30 text-white hover:bg-black/40 backdrop-blur-md rounded-full transition-all duration-200 hover:scale-110"
            title={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleMute}
            className="bg-black/20 border-white/30 text-white hover:bg-black/40 backdrop-blur-md rounded-full transition-all duration-200 hover:scale-110"
            title={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={restartVideo}
            className="bg-black/20 border-white/30 text-white hover:bg-black/40 backdrop-blur-md rounded-full transition-all duration-200 hover:scale-110"
            title="Restart video"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Error State with Retry */}
      {(videoError || loadingTimeout) && (
        <div className="absolute top-6 left-6 z-20">
          <div className="bg-yellow-500/20 border border-yellow-500/30 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>Video unavailable</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={retryVideoLoad}
              className="text-white hover:bg-white/20 h-6 px-2 text-xs"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8 border border-white/20 animate-fade-in">
            <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
            Premium B2B Gemstone Collection
          </div>

          <h1 className="text-5xl lg:text-7xl font-light text-white mb-8 tracking-tight text-balance drop-shadow-2xl animate-slide-up">
            Ethically sourced
            <span className="block font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              precious gemstones
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-white/95 mb-12 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-lg animate-slide-up-delay">
            Discover our curated collection of sapphires, rubies, and emeralds. Trusted by manufacturers and retailers
            worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute bottom-6 right-6 z-20 text-white text-xs bg-black/50 p-2 rounded">
          <div>Video Src: {videoSrc}</div>
          <div>Loading: {isLoading.toString()}</div>
          <div>Loaded: {videoLoaded.toString()}</div>
          <div>Error: {videoError.toString()}</div>
          <div>Timeout: {loadingTimeout.toString()}</div>
        </div>
      )}
    </section>
  )
}
