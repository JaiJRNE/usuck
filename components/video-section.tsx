"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface VideoSectionProps {
  videoId?: string
  title?: string
  description?: string
}

export function VideoSection({
  videoId = "zxdmP_vXY18",
  title = "Discover VICO's Gemstone Collection",
  description = "Watch our exclusive video showcasing the finest sapphires, rubies, and emeralds from our premium collection.",
}: VideoSectionProps) {
  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">Our Story</h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">{description}</p>
        </div>

        <Card className="max-w-4xl mx-auto border-0 shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-gray-900">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={title}
              />
            </div>
            <div className="p-8 bg-white">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                Experience the craftsmanship and dedication that goes into every gemstone in our collection. From
                ethical sourcing to expert curation, see why VICO is trusted by professionals worldwide.
              </p>
              <div className="flex gap-4">
                <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium">
                  <a href={`https://youtu.be/${videoId}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Watch on YouTube
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
