import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const CSV_URL = "https://blob.v0.app/FEHOk.csv"

interface Product {
  id: string
  gem_type: string
  shape: string
  carat: number
  color: string
  clarity: string
  treatment: string
  origin: string
  price: number | null
  dimensions: string
  description: string | null
  image_url: string | null
  video_url: string | null
}

function mapGemType(name: string): string {
  const normalized = name.trim().toUpperCase()
  if (normalized.includes("SAPPHIRE")) return "sapphires"
  if (normalized.includes("RUBY")) return "rubies"
  if (normalized.includes("EMERALD")) return "emeralds"
  return "other"
}

function parseCSV(text: string): Product[] {
  const lines = text.split("\n").filter((line) => line.trim())
  const products: Product[] = []

  // Skip header row (index 0)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    const columns = line.split(",").map((col) => col.trim())

    if (columns.length < 10) continue

    const id = columns[0]
    const name = columns[1]
    const shape = columns[2]
    const carat = Number.parseFloat(columns[3]) || 0
    const color = columns[4]
    const clarity = columns[5]
    const treatment = columns[6]
    const origin = columns[7]
    const price = columns[8] ? Number.parseFloat(columns[8]) : null
    const dimensions = columns[9]
    const description = columns[10] || null
    const imageUrl = columns[11] || null
    const videoUrl = columns[12] || null

    if (!id || !name) continue

    products.push({
      id,
      gem_type: mapGemType(name),
      shape,
      carat,
      color,
      clarity,
      treatment,
      origin,
      price,
      dimensions,
      description,
      image_url: imageUrl,
      video_url: videoUrl,
    })
  }

  return products
}

async function main() {
  console.log("[v0] Starting product upload...")
  console.log("[v0] Supabase URL:", SUPABASE_URL)
  console.log("[v0] CSV URL:", CSV_URL)

  // Create admin client
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  console.log("[v0] Fetching CSV...")
  const response = await fetch(CSV_URL)
  const csvText = await response.text()
  console.log("[v0] CSV fetched, size:", csvText.length, "bytes")

  console.log("[v0] Parsing CSV...")
  const products = parseCSV(csvText)
  console.log("[v0] Parsed", products.length, "products")

  // Group by type
  const sapphires = products.filter((p) => p.gem_type === "sapphires")
  const rubies = products.filter((p) => p.gem_type === "rubies")
  const emeralds = products.filter((p) => p.gem_type === "emeralds")

  console.log("[v0] Sapphires:", sapphires.length)
  console.log("[v0] Rubies:", rubies.length)
  console.log("[v0] Emeralds:", emeralds.length)

  // Clear existing data
  console.log("[v0] Clearing existing products...")
  const { error: deleteError } = await supabase.from("gemstones").delete().neq("id", "")

  if (deleteError) {
    console.error("[v0] Error clearing products:", deleteError)
  } else {
    console.log("[v0] Existing products cleared")
  }

  // Insert products in batches
  console.log("[v0] Inserting products...")
  const batchSize = 50
  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize)
    const { data, error } = await supabase.from("gemstones").insert(batch).select()

    if (error) {
      console.error(`[v0] Error inserting batch ${i / batchSize + 1}:`, error)
      errorCount += batch.length
    } else {
      successCount += batch.length
      console.log(`[v0] Inserted batch ${i / batchSize + 1}: ${batch.length} products`)
    }
  }

  console.log("[v0] Upload complete!")
  console.log("[v0] Success:", successCount)
  console.log("[v0] Errors:", errorCount)

  // Verify the data
  console.log("[v0] Verifying data...")
  const { data: allProducts, error: verifyError } = await supabase.from("gemstones").select("gem_type")

  if (verifyError) {
    console.error("[v0] Error verifying:", verifyError)
  } else {
    const counts = {
      sapphires: allProducts?.filter((p) => p.gem_type === "sapphires").length || 0,
      rubies: allProducts?.filter((p) => p.gem_type === "rubies").length || 0,
      emeralds: allProducts?.filter((p) => p.gem_type === "emeralds").length || 0,
    }
    console.log("[v0] Database now contains:")
    console.log("[v0]   Sapphires:", counts.sapphires)
    console.log("[v0]   Rubies:", counts.rubies)
    console.log("[v0]   Emeralds:", counts.emeralds)
  }
}

main().catch(console.error)
