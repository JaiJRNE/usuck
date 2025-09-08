// Cloudinary video configuration and helpers
export const CLOUDINARY_CONFIG = {
  cloudName: "df501lz8c",
  apiKey: "498795378121457",
}

// Video transformation presets optimized for autoplay
export const VIDEO_TRANSFORMATIONS = {
  hero: "w_1920,h_1080,c_fill,q_auto:good,f_auto,br_2000k", // Higher bitrate for hero
  heroMobile: "w_768,h_432,c_fill,q_auto:good,f_auto,br_1000k", // Optimized for mobile
  compressed: "w_1920,h_1080,c_fill,q_auto:low,br_800k,f_auto", // Fallback for slow connections
  thumbnail: "w_400,h_225,c_fill,q_auto:good,f_auto",
}

// Build Cloudinary video URL with optimizations for autoplay
export function buildCloudinaryVideoUrl(publicId: string, transformation: string = VIDEO_TRANSFORMATIONS.hero) {
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/${transformation}/${publicId}`
}

// Build Cloudinary video poster (thumbnail) URL - taken from 2 seconds into video
export function buildCloudinaryVideoPoster(publicId: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/video/upload/w_1920,h_1080,c_fill,q_auto:good,f_jpg,so_2/${publicId}.jpg`
}

// Get video player embed URL
export function getCloudinaryPlayerUrl(publicId: string, profile = "cld-default") {
  return `https://player.cloudinary.com/embed/?cloud_name=${CLOUDINARY_CONFIG.cloudName}&public_id=${publicId}&profile=${profile}`
}

// Preload video for faster autoplay
export function preloadVideo(publicId: string): Promise<boolean> {
  return new Promise((resolve) => {
    const video = document.createElement("video")
    video.preload = "auto"
    video.muted = true
    video.playsInline = true

    video.oncanplaythrough = () => {
      console.log("Video preloaded successfully")
      resolve(true)
    }

    video.onerror = () => {
      console.log("Video preload failed")
      resolve(false)
    }

    // Set timeout for preload
    setTimeout(() => {
      console.log("Video preload timeout")
      resolve(false)
    }, 10000)

    video.src = buildCloudinaryVideoUrl(publicId)
  })
}
