import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function uploadToSupabase(file: File, bucket = "images") {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file)

    if (error) throw error

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(fileName)

    return {
      success: true,
      url: publicUrl,
      path: data.path,
    }
  } catch (error) {
    console.error("Upload failed:", error)
    return {
      success: false,
      error: "Upload failed",
    }
  }
}
