import { type NextRequest, NextResponse } from "next/server"
import { uploadGemstoneToCloudinary } from "@/lib/cloudinary-upload"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const gemType = formData.get("gemType") as string
    const name = formData.get("name") as string
    const gemId = formData.get("gemId") as string

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" })
    }

    if (!gemType) {
      return NextResponse.json({ success: false, error: "Gemstone type is required" })
    }

    const result = await uploadGemstoneToCloudinary(file, {
      type: gemType,
      name: name || file.name,
      id: gemId,
    })

    if (result.success) {
      console.log(`✅ Uploaded ${name} (${gemType}) to Cloudinary:`, result.publicId)

      // Here you could save to your database
      // await saveGemstoneToDatabase({
      //   id: gemId,
      //   name,
      //   type: gemType,
      //   cloudinaryId: result.publicId,
      //   imageUrl: result.url,
      //   thumbnailUrl: result.urls?.thumbnail,
      // })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Upload API error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Server error",
    })
  }
}
