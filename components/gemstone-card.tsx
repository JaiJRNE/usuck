import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from 'lucide-react'
import { CloudinaryImage } from "./cloudinary-image"

interface Gemstone {
  id: string
  name: string
  shape: string
  carat: number
  color: string
  clarity: string
  treatment: string
  origin: string
  price: number
  cloudinaryId?: string
  image: string
  dimensions: string
  gemType: string
}

interface GemstoneCardProps {
  gemstone: Gemstone
}

export function GemstoneCard({ gemstone }: GemstoneCardProps) {
  return (
    <Card className="group border-0 shadow-sm bg-white card-hover overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-square">
          {gemstone.cloudinaryId ? (
            <CloudinaryImage
              publicId={gemstone.cloudinaryId}
              alt={gemstone.name}
              transformation="card"
              width={600}
              height={600}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <Image
              src={gemstone.image || "/placeholder.svg?height=300&width=300"}
              alt={gemstone.name}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          )}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-white/95 text-vico-primary border-0 font-medium backdrop-blur-sm shadow-sm">
              {gemstone.treatment}
            </Badge>
            {gemstone.price > 5000 && <Badge className="bg-vico-gold text-white border-0 font-medium shadow-sm">Premium</Badge>}
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-vico-primary mb-1">{gemstone.name}</h3>
              <p className="text-sm text-gray-500 font-medium">{gemstone.origin}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-semibold text-vico-primary">${gemstone.price.toLocaleString()}</div>
              <div className="text-xs text-gray-500">per piece</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Shape</div>
              <div className="text-sm font-medium text-gray-900">{gemstone.shape}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Carat</div>
              <div className="text-sm font-medium text-gray-900">{gemstone.carat} ct</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Color</div>
              <div className="text-sm font-medium text-gray-900">{gemstone.color}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Clarity</div>
              <div className="text-sm font-medium text-gray-900">{gemstone.clarity}</div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              asChild
              className="w-full bg-vico-primary hover:bg-vico-primary-light text-white rounded-full font-medium h-12 text-sm shadow-sm hover:shadow-md transition-all duration-200"
              size="default"
            >
              <Link href={`/${gemstone.gemType}/detail/${gemstone.id}`}>
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                asChild
                variant="outline"
                size="default"
                className="border-vico-accent text-vico-accent hover:bg-vico-accent hover:text-white rounded-full font-medium bg-transparent h-12 text-sm smooth-transition shadow-sm hover:shadow-md"
              >
                <Link href={`/jewelry-visualizer/${gemstone.id}`}>
                  <Sparkles className="h-4 w-4 mr-1" />
                  Visualize
                </Link>
              </Button>
              <Button
                variant="outline"
                size="default"
                className="border-vico-primary text-vico-primary hover:bg-vico-primary hover:text-white rounded-full font-medium bg-transparent h-12 text-sm smooth-transition shadow-sm hover:shadow-md"
              >
                Quote
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
