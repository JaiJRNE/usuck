// Client-side Cloudinary configuration and helpers
export const CLOUDINARY_CONFIG = {
  cloudName: "df501lz8c",
}

// Cloudinary transformation presets optimized for gemstones
export const GEMSTONE_TRANSFORMATIONS = {
  hero: "w_1920,h_1080,c_fill,f_auto,q_auto:good,e_sharpen:100",
  card: "w_600,h_600,c_fill,f_auto,q_auto:good,e_sharpen:80",
  thumbnail: "w_300,h_300,c_fill,f_auto,q_auto:good,e_sharpen:60",
  detail: "w_1200,h_1200,c_limit,f_auto,q_auto:best,e_sharpen:120",
  gallery: "w_800,h_800,c_fill,f_auto,q_auto:good,e_sharpen:100",
  // Special transformations for gemstones
  enhanced: "w_800,h_800,c_fill,f_auto,q_auto:best,e_sharpen:150,e_vibrance:20,e_auto_contrast",
  watermarked: "w_800,h_800,c_fill,f_auto,q_auto:good,l_text:Arial_40:VICO,g_south_east,o_30",
}

// Helper function to build Cloudinary URLs
export function buildCloudinaryUrl(publicId: string, transformation: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${transformation}/${publicId}`
}

// Get optimized URL for different use cases
export function getGemstoneImageUrl(publicId: string, type: keyof typeof GEMSTONE_TRANSFORMATIONS = "card") {
  return buildCloudinaryUrl(publicId, GEMSTONE_TRANSFORMATIONS[type])
}
