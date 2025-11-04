import { supabase } from "@/lib/supabase-client"
import { GemstoneSearchClient } from "@/components/gemstone-search-client"

export const revalidate = 60

async function getRubies() {
  console.log("[v0] Fetching rubies from database...")

  const { data, error } = await supabase
    .from("gemstones")
    .select("*")
    .eq("gem_type", "rubies")
    .order("created_at", { ascending: false })

  console.log("[v0] Rubies query result:", {
    dataCount: data?.length || 0,
    error: error?.message,
    sampleData: data?.[0],
  })

  if (error) {
    console.error("[v0] Error fetching rubies:", error)
    return []
  }

  return (
    data?.map((gem) => ({
      id: gem.id,
      name: gem.name,
      gemType: gem.gem_type as "rubies",
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

export default async function RubiesSearchPage() {
  const rubies = await getRubies()

  console.log("[v0] Rendering rubies page with", rubies.length, "stones")

  return (
    <GemstoneSearchClient
      gemstones={rubies}
      gemType="rubies"
      title="Premium Rubies"
      subtitle="Discover our collection of certified natural rubies"
    />
  )
}
