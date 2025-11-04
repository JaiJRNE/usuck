import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET() {
  try {
    console.log("[v0] Testing database connection...")

    // Test 1: Check if we can connect
    const { data: testData, error: testError } = await supabaseAdmin.from("gemstones").select("count").limit(1)

    if (testError) {
      console.error("[v0] Database connection test failed:", testError)
      return NextResponse.json({
        success: false,
        error: "Database connection failed: " + testError.message,
      })
    }

    // Test 2: Try to insert a test record
    const testGemstone = {
      id: "TEST-" + Date.now(),
      name: "Test Sapphire",
      gem_type: "sapphires",
      shape: "Round",
      carat: 1.0,
      color: "Blue",
      clarity: "VS",
      treatment: "Heated",
      origin: "Test",
      price: 100,
      dimensions: "6x6x4",
      description: "Test gemstone",
      updated_at: new Date().toISOString(),
    }

    const { data: insertData, error: insertError } = await supabaseAdmin.from("gemstones").insert(testGemstone).select()

    if (insertError) {
      console.error("[v0] Test insert failed:", insertError)
      return NextResponse.json({
        success: false,
        error: "Insert test failed: " + insertError.message,
        details: insertError,
      })
    }

    // Test 3: Delete the test record
    await supabaseAdmin.from("gemstones").delete().eq("id", testGemstone.id)

    console.log("[v0] Database test successful!")

    return NextResponse.json({
      success: true,
      message: "Database connection and operations working correctly",
      testData: insertData,
    })
  } catch (error) {
    console.error("[v0] Database test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
