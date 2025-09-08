import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: "df501lz8c",
  api_key: "498795378121457",
  api_secret: "sM5c4Fl6YioihetF1f7IlESHDAs",
})

export async function uploadGemstoneToCloudinary(
  file: File,
  gemstoneData: {
    type: string
    name: string
    id?: string
  },
) {
  try {
    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")
    const dataURI = `data:${file.type};base64,${base64}`

    // Create organized folder structure
    const folder = `vico-gemstones/${gemstoneData.type}`
    const publicId = gemstoneData.id ? `${folder}/${gemstoneData.id}` : undefined

    const result = await cloudinary.uploader.upload(dataURI, {
      folder,
      public_id: publicId,
      transformation: [
        { quality: "auto:best", fetch_format: "auto" },
        { width: 2000, height: 2000, crop: "limit" },
        { effect: "sharpen:100" }, // Enhance gemstone details
      ],
      // Add comprehensive tags for organization
      tags: ["vico", "gemstone", gemstoneData.type, "b2b", "wholesale"],
      // Add context for better searchability
      context: {
        gemstone_type: gemstoneData.type,
        gemstone_name: gemstoneData.name,
        uploaded_by: "vico_admin",
        category: "inventory",
      },
      // Enable AI features
      detection: "adv_face",
      auto_tagging: 0.8,
      categorization: "google_tagging,imagga_tagging",
    })

    return {
      success: true,
      publicId: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      // Generate different sized URLs immediately
      urls: {
        thumbnail: `https://res.cloudinary.com/df501lz8c/image/upload/w_300,h_300,c_fill,f_auto,q_auto/${result.public_id}`,
        card: `https://res.cloudinary.com/df501lz8c/image/upload/w_600,h_600,c_fill,f_auto,q_auto/${result.public_id}`,
        detail: `https://res.cloudinary.com/df501lz8c/image/upload/w_1200,h_1200,c_limit,f_auto,q_auto:best/${result.public_id}`,
      },
    }
  } catch (error) {
    console.error("Cloudinary upload failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    }
  }
}

export async function deleteGemstoneFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return { success: result.result === "ok" }
  } catch (error) {
    console.error("Cloudinary delete failed:", error)
    return { success: false, error: "Delete failed" }
  }
}

// Get all images from a specific gemstone folder
export async function getGemstoneImages(gemType: string) {
  try {
    const result = await cloudinary.search
      .expression(`folder:vico-gemstones/${gemType}`)
      .sort_by([["created_at", "desc"]])
      .max_results(100)
      .execute()

    return {
      success: true,
      images: result.resources.map((resource: any) => ({
        publicId: resource.public_id,
        url: resource.secure_url,
        width: resource.width,
        height: resource.height,
        format: resource.format,
        createdAt: resource.created_at,
        tags: resource.tags,
        context: resource.context,
      })),
    }
  } catch (error) {
    console.error("Failed to fetch images:", error)
    return { success: false, error: "Failed to fetch images" }
  }
}
