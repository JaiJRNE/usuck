import { CloudinaryVideoHero } from "@/components/cloudinary-video-hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gem, Shield, Globe, Award, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Cloudinary Video Hero Section - Autoplay on load */}
      <CloudinaryVideoHero publicId="Vico_Video_pilktq" />

      {/* Features Section */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-light text-vico-primary mb-6 tracking-tight">Why choose VICO</h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Excellence in every facet of our business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Ethical Sourcing",
                description: "Every gemstone is ethically sourced with complete traceability and fair trade practices.",
              },
              {
                icon: Award,
                title: "Certified Quality",
                description: "GIA and GRS certified gemstones with authenticity guarantees and detailed documentation.",
              },
              {
                icon: Globe,
                title: "Global Network",
                description: "Direct relationships with mines across Thailand, Sri Lanka, Myanmar, and beyond.",
              },
              {
                icon: Gem,
                title: "B2B Expertise",
                description: "25+ years serving manufacturers, retailers, and designers with wholesale solutions.",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-none bg-white/60 backdrop-blur-sm card-hover">
                <CardContent className="p-8 text-center">
                  <feature.icon className="h-12 w-12 text-vico-accent mx-auto mb-6" />
                  <h3 className="text-lg font-semibold text-vico-primary mb-4">{feature.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gemstone Categories */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-light text-vico-primary mb-6 tracking-tight">Our collection</h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Discover premium gemstones curated for discerning professionals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sapphires",
                description: "Premium blue, pink, yellow, and fancy colored sapphires from the world's finest sources.",
                badge: "Premium Quality",
                badgeColor: "bg-vico-accent text-white",
                href: "/sapphires/basic-search",
                image: "/placeholder.svg?height=400&width=600&text=Premium+Sapphires",
              },
              {
                name: "Rubies",
                description: "Exceptional rubies including rare pigeon blood varieties from Myanmar and Mozambique.",
                badge: "Pigeon Blood",
                badgeColor: "bg-red-600 text-white",
                href: "/rubies/basic-search",
                image: "/placeholder.svg?height=400&width=600&text=Premium+Rubies",
              },
              {
                name: "Emeralds",
                description: "Vivid green emeralds with exceptional clarity from Colombia, Zambia, and Brazil.",
                badge: "Colombian",
                badgeColor: "bg-green-600 text-white",
                href: "/emeralds/basic-search",
                image: "/placeholder.svg?height=400&width=600&text=Premium+Emeralds",
              },
            ].map((gem, index) => (
              <Card key={index} className="group border-0 shadow-sm bg-white card-hover overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={gem.image || "/placeholder.svg"}
                      alt={`${gem.name} Collection`}
                      width={600}
                      height={400}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <Badge className={`absolute top-6 left-6 ${gem.badgeColor} border-0 font-medium`}>
                      {gem.badge}
                    </Badge>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-vico-primary mb-4">{gem.name}</h3>
                    <p className="text-gray-600 font-light leading-relaxed mb-6">{gem.description}</p>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-vico-primary text-vico-primary hover:bg-vico-primary hover:text-white font-medium rounded-full bg-transparent smooth-transition"
                    >
                      <Link href={gem.href}>
                        Explore {gem.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-vico-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-vico-primary via-vico-primary-light to-vico-primary" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight">
            Ready to source premium gemstones?
          </h2>
          <p className="text-xl text-gray-200 font-light mb-12 max-w-2xl mx-auto">
            Connect with our B2B team for wholesale pricing and custom sourcing solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-vico-primary hover:bg-gray-100 px-8 py-4 text-base font-medium rounded-full smooth-transition"
            >
              <Link href="/contact">Get Quote</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-base font-medium rounded-full smooth-transition bg-transparent"
            >
              <a href="https://wa.me/6622674124">WhatsApp Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
