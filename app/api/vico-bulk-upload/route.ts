import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"
import type { Gemstone } from "@/lib/types/gemstone"

export async function POST(request: NextRequest) {
  try {
    const { gemstones }: { gemstones: Gemstone[] } = await request.json()

    console.log(`Processing ${gemstones.length} gemstones...`)

    const results = {
      success: 0,
      failed: 0,
      errors: [] as Array<{ id: string; error: string }>,
    }

    // Process in batches of 10 for better performance
    const batchSize = 10
    for (let i = 0; i < gemstones.length; i += batchSize) {
      const batch = gemstones.slice(i, i + batchSize)

      for (const gemstone of batch) {
        try {
          // Convert to database format
          const dbGemstone = {
            id: gemstone.id,
            name: gemstone.name,
            gem_type: gemstone.gemType,
            shape: gemstone.shape,
            carat: gemstone.carat,
            color: gemstone.color,
            clarity: gemstone.clarity,
            treatment: gemstone.treatment,
            origin: gemstone.origin,
            price: gemstone.price || 0,
            dimensions: gemstone.dimensions || null,
            description: gemstone.description || null,
            image: gemstone.image || null,
            cloudinary_id: gemstone.cloudinaryId || null,
            specifications: gemstone.specifications || null,
            updated_at: new Date().toISOString(),
          }

          // Upsert to handle duplicates
          const { error } = await supabase.from("gemstones").upsert(dbGemstone, {
            onConflict: "id",
          })

          if (error) {
            console.error(`Failed to insert ${gemstone.id}:`, error)
            results.failed++
            results.errors.push({
              id: gemstone.id,
              error: error.message,
            })
          } else {
            results.success++
          }
        } catch (error) {
          console.error(`Error processing ${gemstone.id}:`, error)
          results.failed++
          results.errors.push({
            id: gemstone.id,
            error: error instanceof Error ? error.message : "Unknown error",
          })
        }
      }

      // Small delay between batches
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    console.log(`Upload complete: ${results.success} success, ${results.failed} failed`)

    return NextResponse.json({
      success: true,
      total: gemstones.length,
      results,
    })
  } catch (error) {
    console.error("Bulk upload error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
