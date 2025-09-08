"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight, RotateCcw } from "lucide-react"
import Image from "next/image"
import { buildCloudinaryVideoUrl, buildCloudinaryVideoPoster } from "@/lib/cloudinary-video"

interface CloudinaryVideoHeroProps {
  publicId?: string
  fallbackImage?: string
}

export function CloudinaryVideoHero({
  publicId = "Vico_Video_pilktq",
  fallbackImage = "/placeholder.svg?height=1080&width=1920&text=VICO+Premium+Gemstones",
}: CloudinaryVideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [showControls, setShowControls] = useState(false)

  // Generate optimized video URLs
  const videoUrl = buildCloudinaryVideoUrl(publicId, "w_1920,h_1080,c_fill,q_auto:good,f_auto,br_2000k")
  const mobileVideoUrl = buildCloudinaryVideoUrl(publicId, "w_768,h_432,c_fill,q_auto:good,f_auto,br_1000k")
  const posterUrl = buildCloudinaryVideoPoster(publicId)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Set video properties for autoplay
    video.muted = true
    video.playsInline = true
    video.autoplay = true

    const handleCanPlayThrough = () => {
      console.log("Video ready to play")
      setVideoLoaded(true)
      setVideoError(false)

      // Force autoplay
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video autoplay successful")
            setIsPlaying(true)
          })
          .catch((error) => {
            console.log("Autoplay failed, but video is ready:", error)
            setIsPlaying(false)
          })
      }
    }

    const handleError = (e: Event) => {
      console.error("Video error:", e)
      setVideoError(true)
      setVideoLoaded(false)
    }

    const handleLoadedData = () => {
      console.log("Video data loaded")
      // Try to play as soon as data is loaded
      if (video.readyState >= 3) {
        // HAVE_FUTURE_DATA
        handleCanPlayThrough()
      }
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    // Add event listeners
    video.addEventListener("canplaythrough", handleCanPlayThrough)
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("error", handleError)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    // Force load the video immediately
    video.load()

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlayThrough)
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("error", handleError)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [videoUrl])

  const togglePlayPause = () => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play().catch(console.error)
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
      video.play().catch(console.error)
    }
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-vico-primary"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Background - Always behind content */}
      <div className="absolute inset-0 z-0">
        {!videoError && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            loop
            muted
            playsInline
            autoPlay
            preload="auto"
            poster={posterUrl}
            style={{
              filter: "brightness(0.5) contrast(1.2) saturate(1.1)",
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={mobileVideoUrl} type="video/mp4" media="(max-width: 768px)" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Fallback Image - Only show if video fails */}
        {videoError && (
          <Image
            src={fallbackImage || "/placeholder.svg"}
            alt="VICO Premium Gemstones"
            fill
            className="object-cover"
            priority
            style={{
              filter: "brightness(0.5) contrast(1.2)",
            }}
          />
        )}
      </div>

      {/* Gradient Overlays - Above video, below content */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-vico-primary/30 via-transparent to-vico-primary/50" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-vico-primary/60 via-transparent to-vico-primary/20" />

      {/* Video Controls - Top layer */}
      {videoLoaded && !videoError && (
        <div
          className={`absolute top-6 right-6 z-30 flex gap-3 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlayPause}
            className="bg-black/30 border-white/30 text-white hover:bg-black/50 backdrop-blur-md rounded-full transition-all duration-200 hover:scale-110"
            title={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleMute}
            className="bg-black/30 border-white/30 text-white hover:bg-black/50 backdrop-blur-md rounded-full transition-all duration-200 hover:scale-110"
            title={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={restartVideo}
            className="bg-black/30 border-white/30 text-white hover:bg-black/50 backdrop-blur-md rounded-full transition-all duration-200 hover:scale-110"
            title="Restart video"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Hero Content - Top layer, always visible */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/15 backdrop-blur-md text-white text-sm font-medium mb-8 border border-white/30 animate-fade-in shadow-lg">
            <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
            Premium B2B Gemstone Collection
          </div>

          <h1 className="text-5xl lg:text-7xl font-light text-white mb-8 tracking-tight text-balance drop-shadow-2xl animate-slide-up">
            Thailand's Premier Gemstone Supplier
          </h1>

          <p className="text-xl lg:text-2xl text-white/95 mb-12 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-lg animate-slide-up-delay">
            Discover our curated collection of sapphires, rubies, and emeralds. Trusted by manufacturers and retailers
            worldwide for over 25 years.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay-2">
            <Button
              asChild
              size="lg"
              className="bg-white text-vico-primary hover:bg-gray-100 hover:scale-105 px-8 py-4 text-base font-medium rounded-full smooth-transition shadow-xl transform transition-all duration-200"
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
              className="border-white/50 text-white hover:bg-white/15 hover:scale-105 px-8 py-4 text-base font-medium rounded-full smooth-transition backdrop-blur-md bg-white/10 transform transition-all duration-200"
            >
              <Link href="/contact">Request Catalog</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Loading Indicator - Only show while video is loading */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 z-25 bg-vico-primary/70 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-6"></div>
            <p className="text-xl font-light">Loading VICO experience...</p>
            <p className="text-sm text-white/70 mt-2">Powered by Cloudinary</p>
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Subtle floating elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full opacity-60 animate-pulse z-15" />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/15 rounded-full opacity-40 animate-pulse delay-1000 z-15" />
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-white/10 rounded-full opacity-30 animate-pulse delay-500 z-15" />

      {/* Debug Info (development only) */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute bottom-6 left-6 z-30 text-white text-xs bg-black/60 p-3 rounded-lg backdrop-blur-sm">
          <div>Video: {videoLoaded ? "✅ Loaded" : "⏳ Loading"}</div>
          <div>Playing: {isPlaying ? "▶️ Yes" : "⏸️ No"}</div>
          <div>Error: {videoError ? "❌ Yes" : "✅ No"}</div>
          <div>Public ID: {publicId}</div>
        </div>
      )}
    </section>
  )
}
