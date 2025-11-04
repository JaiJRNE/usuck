import { supabase } from "@/lib/supabase-client"
import { GemstoneSearchClient } from "@/components/gemstone-search-client"

export const revalidate = 60

async function getEmeralds() {
  console.log("[v0] Fetching emeralds from database...")

  const { data, error } = await supabase
    .from("gemstones")
    .select("*")
    .eq("gem_type", "emeralds")
    .order("created_at", { ascending: false })

  console.log("[v0] Emeralds query result:", {
    dataCount: data?.length || 0,
    error: error?.message,
    sampleData: data?.[0],
  })

  if (error) {
    console.error("[v0] Error fetching emeralds:", error)
    return []
  }

  return (
    data?.map((gem) => ({
      id: gem.id,
      name: gem.name,
      gemType: gem.gem_type as "emeralds",
      shape: gem.shape,
      carat: Number(gem.carat),
      color: gem.color,
      clarity: gem.clarity,
      treatment: gem.treatment,
      origin: gem.origin,
      price: Number(gem.price),
      dimensions: gem.dimensions || "",
      description: gem.description || "",
      image: gem.image || "/placeholder.svg?height=400&width=400",
      cloudinaryId: gem.cloudinary_id || undefined,
      specifications: gem.specifications || undefined,
    })) || []
  )
}

export default async function EmeraldsSearchPage() {
  const emeralds = await getEmeralds()

  console.log("[v0] Rendering emeralds page with", emeralds.length, "stones")

  return (
    <GemstoneSearchClient
      gemstones={emeralds}
      gemType="emeralds"
      title="Premium Emeralds"
      subtitle="Discover our collection of certified natural emeralds"
    />
  )
}
