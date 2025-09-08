import { type NextRequest, NextResponse } from "next/server"
import { uploadToVercelBlob } from "@/lib/vercel-blob-upload"
// import { uploadToSupabase } from '@/lib/supabase-upload'
// import { uploadToCloudinary } from '@/lib/cloudinary-upload'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" })
    }

    // Choose your preferred upload method
    const result = await uploadToVercelBlob(file)
    // const result = await uploadToSupabase(file)
    // const result = await uploadToCloudinary(file)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Upload API error:", error)
    return NextResponse.json({ success: false, error: "Server error" })
  }
}
