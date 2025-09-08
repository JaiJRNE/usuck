import { put } from "@vercel/blob"

export async function uploadToVercelBlob(file: File) {
  try {
    const blob = await put(file.name, file, {
      access: "public",
    })

    return {
      success: true,
      url: blob.url,
      downloadUrl: blob.downloadUrl,
    }
  } catch (error) {
    console.error("Upload failed:", error)
    return {
      success: false,
      error: "Upload failed",
    }
  }
}
