"use client"

import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play } from "lucide-react"
import { getCloudinaryPlayerUrl } from "@/lib/cloudinary-video"

interface CloudinaryVideoSectionProps {
  publicId?: string
  title?: string
  description?: string
}

export function CloudinaryVideoSection({
  publicId = "Vico_Video_pilktq",
  title = "Discover VICO's Gemstone Excellence",
  description = "Watch our exclusive video showcasing the finest sapphires, rubies, and emeralds from our premium collection, sourced ethically from around the world.",
}: CloudinaryVideoSectionProps) {
  const playerUrl = getCloudinaryPlayerUrl(publicId)

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">Our Story</h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">{description}</p>
        </div>

        <Card className="max-w-5xl mx-auto border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-gray-900">
              <iframe
                src={playerUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                title={title}
                style={{
                  border: "none",
                }}
              />
            </div>
            <div className="p-8 bg-white">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Experience the craftsmanship and dedication that goes into every gemstone in our collection. From
                    ethical sourcing in the mines of Sri Lanka, Myanmar, and Colombia to expert curation in Bangkok, see
                    why VICO is trusted by jewelry professionals worldwide.
                  </p>
                </div>
                <div className="ml-6 flex-shrink-0">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <Play className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium px-6">
                  <a href={playerUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Screen
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-gray-200 hover:bg-gray-50 rounded-full font-medium px-6 bg-transparent"
                >
                  <Link href="/about">Learn More About VICO</Link>
                </Button>
              </div>

              {/* Video Stats */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">25+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">40+</div>
                    <div className="text-sm text-gray-600">Countries Served</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">1000+</div>
                    <div className="text-sm text-gray-600">Premium Gemstones</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
