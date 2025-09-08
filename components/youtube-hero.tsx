"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Play, ExternalLink } from "lucide-react"

interface YouTubeHeroProps {
  videoId?: string
  title?: string
}

export function YouTubeHero({ videoId = "zxdmP_vXY18", title = "VICO Gemstone Collection" }: YouTubeHeroProps) {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* YouTube Video Embed */}
      {showVideo && (
        <div className="absolute inset-0 z-10">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
            className="w-full h-full object-cover"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{
              filter: "brightness(0.6) contrast(1.1)",
              pointerEvents: "none",
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-32">
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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

          {/* Video Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!showVideo ? (
              <Button
                onClick={() => setShowVideo(true)}
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10 px-6 py-3 text-sm font-medium rounded-full smooth-transition backdrop-blur-sm bg-transparent"
              >
                <Play className="h-4 w-4 mr-2" />
                Watch Our Story
              </Button>
            ) : (
              <Button
                onClick={() => setShowVideo(false)}
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10 px-6 py-3 text-sm font-medium rounded-full smooth-transition backdrop-blur-sm bg-transparent"
              >
                Hide Video
              </Button>
            )}

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-white/80 hover:text-white px-6 py-3 text-sm font-medium rounded-full smooth-transition"
            >
              <a
                href={`https://youtu.be/${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on YouTube
              </a>
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
    </section>
  )
}
