import type { Gemstone } from "./types/gemstone"

export interface VicoCSVRow {
  id: string // Column 0: S-1872
  type: string // Column 1: SAPPHIRE
  shape: string // Column 2: OVAL
  carat: string // Column 3: 4.11
  color: string // Column 4: ROYAL BLUE
  clarity: string // Column 5: VS
  treatment: string // Column 6: HEATED
  origin: string // Column 7: SRI LANKA
  price: string // Column 8: 0
  dimensions: string // Column 9: 10X8.51X5.08
  description: string // Column 10: Beautiful royal blue sapphire
  imageLink?: string // Column 11: Google Drive link
  videoLink?: string // Column 12: Google Drive link
}

export function parseVicoCSV(csvContent: string): Gemstone[] {
  const lines = csvContent.split("\n").filter((line) => line.trim())

  const dataLines = lines.slice(1)

  const gemstones: Gemstone[] = []

  for (const line of dataLines) {
    try {
      const values = parseCSVLine(line)

      // New format: id, name, shape, carat, color, clarity, treatment, origin, price, dimensions, description, Image Link 1, Video Link 1
      const id = values[0]?.trim() || ""
      const typeRaw = values[1]?.trim().toUpperCase() || "" // Column 1: RUBY, SAPPHIRE, etc.
      const shape = values[2]?.trim() || "" // Column 2: shape
      const caratStr = values[3]?.trim() || "0" // Column 3: carat
      const color = values[4]?.trim() || "" // Column 4: color
      const clarity = values[5]?.trim() || "" // Column 5: clarity
      const treatment = values[6]?.trim() || "" // Column 6: treatment
      const origin = values[7]?.trim() || "" // Column 7: origin
      const priceStr = values[8]?.trim() || "0" // Column 8: price
      const dimensions = values[9]?.trim() || "" // Column 9: dimensions
      const description = values[10]?.trim() || "" // Column 10: description
      const imageLink = values[11]?.trim() || "" // Column 11: Image Link 1
      const videoLink = values[12]?.trim() || "" // Column 12: Video Link 1

      // Skip if no ID
      if (!id) continue

      // Convert type to our gemType format
      const gemType = mapGemType(typeRaw)
      if (!gemType) continue

      // Parse carat as number
      const carat = Number.parseFloat(caratStr) || 0

      // Parse price as number
      const price = Number.parseFloat(priceStr) || 0

      // Create gemstone name
      const name = `${origin} ${color} ${typeRaw} ${carat}ct`

      // Use provided description or create one
      const finalDescription =
        description ||
        `${shape} cut ${color.toLowerCase()} ${typeRaw.toLowerCase()} from ${origin}. ${treatment} treatment. ${dimensions} mm.`

      const gemstone: Gemstone = {
        id,
        name,
        gemType,
        shape,
        carat,
        color,
        clarity,
        treatment,
        origin,
        price,
        dimensions,
        description: finalDescription,
        specifications: {
          "Image Link": imageLink,
          "Video Link": videoLink,
          Shape: shape,
          Treatment: treatment,
          Origin: origin,
        },
        createdAt: new Date().toISOString(),
      }

      gemstones.push(gemstone)
    } catch (error) {
      console.error("Error parsing line:", line, error)
    }
  }

  return gemstones
}

function mapGemType(type: string): "sapphires" | "rubies" | "emeralds" | null {
  const normalized = type.toUpperCase()

  if (normalized.includes("SAPPHIRE")) return "sapphires"
  if (normalized.includes("RUBY") || normalized.includes("RUBIES")) return "rubies"
  if (normalized.includes("EMERALD")) return "emeralds"

  return null
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current)
      current = ""
    } else {
      current += char
    }
  }

  result.push(current)
  return result
}

export function generateVicoCSVTemplate(): string {
  const headers = [
    "id",
    "name",
    "shape",
    "carat",
    "color",
    "clarity",
    "treatment",
    "origin",
    "price",
    "dimensions",
    "description",
    "Image Link 1",
    "Video Link 1",
  ]

  const sampleData = [
    "S-1872",
    "SAPPHIRE",
    "OVAL",
    "4.11",
    "ROYAL BLUE",
    "VS",
    "HEATED",
    "SRI LANKA",
    "0",
    "10X8.51X5.08",
    "Beautiful royal blue sapphire",
    "https://drive.google.com/file/d/xxxxx",
    "https://drive.google.com/file/d/yyyyy",
  ]

  return [headers.join(","), sampleData.join(",")].join("\n")
}

// Helper to extract Google Drive file ID from URL
export function extractGoogleDriveId(url: string): string | null {
  if (!url) return null

  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  return match ? match[1] : null
}

// Helper to convert Google Drive URL to direct image URL
export function getGoogleDriveImageUrl(url: string): string | null {
  const fileId = extractGoogleDriveId(url)
  if (!fileId) return null

  return `https://drive.google.com/uc?export=view&id=${fileId}`
}
