import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const CSV_URL = "https://blob.v0.app/rllPc.csv"

interface Product {
  id: string
  name: string
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
  image: string | null
  specifications: {
    video_url?: string
  }
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
      name,
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
      image: imageUrl,
      specifications: videoUrl ? { video_url: videoUrl } : {},
    })
  }

  return products
}

export async function GET() {
  try {
    console.log("[v0] Starting direct upload...")

    // Create admin client with service role key
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    console.log("[v0] Fetching CSV from:", CSV_URL)
    const response = await fetch(CSV_URL)
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`)
    }

    const csvText = await response.text()
    console.log("[v0] CSV fetched, size:", csvText.length, "bytes")

    console.log("[v0] Parsing CSV...")
    const products = parseCSV(csvText)
    console.log("[v0] Parsed", products.length, "products")

    if (products.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No products found in CSV",
      })
    }

    // Group by type for reporting
    const sapphires = products.filter((p) => p.gem_type === "sapphires")
    const rubies = products.filter((p) => p.gem_type === "rubies")
    const emeralds = products.filter((p) => p.gem_type === "emeralds")

    console.log("[v0] Product breakdown:")
    console.log("[v0]   Sapphires:", sapphires.length)
    console.log("[v0]   Rubies:", rubies.length)
    console.log("[v0]   Emeralds:", emeralds.length)

    // Clear existing data
    console.log("[v0] Clearing existing products...")
    const { error: deleteError } = await supabase.from("gemstones").delete().neq("id", "")

    if (deleteError) {
      console.error("[v0] Error clearing products:", deleteError)
      return NextResponse.json({
        success: false,
        error: `Failed to clear existing products: ${deleteError.message}`,
      })
    }

    console.log("[v0] Existing products cleared")

    // Insert products in batches
    console.log("[v0] Inserting products...")
    const batchSize = 50
    let successCount = 0
    const errors: string[] = []

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize)
      const { data, error } = await supabase.from("gemstones").insert(batch).select()

      if (error) {
        console.error(`[v0] Error inserting batch ${i / batchSize + 1}:`, error)
        errors.push(`Batch ${i / batchSize + 1}: ${error.message}`)
      } else {
        successCount += batch.length
        console.log(`[v0] Inserted batch ${i / batchSize + 1}: ${batch.length} products`)
      }
    }

    // Verify the data
    console.log("[v0] Verifying data...")
    const { data: allProducts, error: verifyError } = await supabase.from("gemstones").select("gem_type")

    if (verifyError) {
      console.error("[v0] Error verifying:", verifyError)
    }

    const counts = {
      sapphires: allProducts?.filter((p) => p.gem_type === "sapphires").length || 0,
      rubies: allProducts?.filter((p) => p.gem_type === "rubies").length || 0,
      emeralds: allProducts?.filter((p) => p.gem_type === "emeralds").length || 0,
      total: allProducts?.length || 0,
    }

    console.log("[v0] Upload complete!")
    console.log("[v0] Database now contains:")
    console.log("[v0]   Sapphires:", counts.sapphires)
    console.log("[v0]   Rubies:", counts.rubies)
    console.log("[v0]   Emeralds:", counts.emeralds)
    console.log("[v0]   Total:", counts.total)

    return NextResponse.json({
      success: true,
      message: "Products uploaded successfully",
      stats: {
        parsed: products.length,
        inserted: successCount,
        errors: errors.length,
        database: counts,
      },
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error) {
    console.error("[v0] Upload failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
