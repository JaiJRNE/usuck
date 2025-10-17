import type { Gemstone } from "./types/gemstone"

export interface VicoCSVRow {
  id: string // Column 0: S-1872
  type: string // Column 1: SAPPHIRE
  shape: string // Column 3: OVAL
  carat: string // Column 4: 4.11
  color: string // Column 5: ROYAL BLUE
  clarity: string // Column 6: VS
  treatment: string // Column 7: HEATED
  origin: string // Column 8: SRI LANKA
  dimensions: string // Column 10: 10X8.51X5.08
  videoLink1?: string // Column 12: Google Drive link
  videoLink2?: string // Column 13: Google Drive link
}

export function parseVicoCSV(csvContent: string): Gemstone[] {
  const lines = csvContent.split("\n").filter((line) => line.trim())

  // Skip header row (first row)
  const dataLines = lines.slice(1)

  const gemstones: Gemstone[] = []

  for (const line of dataLines) {
    try {
      const values = parseCSVLine(line)

      // Map CSV columns to gemstone object
      const id = values[0]?.trim() || ""
      const typeRaw = values[1]?.trim().toUpperCase() || ""
      const shape = values[3]?.trim() || ""
      const caratStr = values[4]?.trim() || "0"
      const color = values[5]?.trim() || ""
      const clarity = values[6]?.trim() || ""
      const treatment = values[7]?.trim() || ""
      const origin = values[8]?.trim() || ""
      const dimensions = values[10]?.trim() || ""
      const videoLink1 = values[12]?.trim() || ""
      const videoLink2 = values[13]?.trim() || ""

      // Skip if no ID
      if (!id) continue

      // Convert type to our gemType format
      const gemType = mapGemType(typeRaw)
      if (!gemType) continue

      // Parse carat as number
      const carat = Number.parseFloat(caratStr) || 0

      // Create gemstone name
      const name = `${origin} ${color} ${typeRaw} ${carat}ct`

      // Create description
      const description = `${shape} cut ${color.toLowerCase()} ${typeRaw.toLowerCase()} from ${origin}. ${treatment} treatment. ${dimensions} mm.`

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
        price: 0, // Price not in CSV, will be added manually
        dimensions,
        description,
        specifications: {
          "Video 1": videoLink1,
          "Video 2": videoLink2,
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
    "ID",
    "Type",
    "gemType",
    "Shape",
    "Carat",
    "Color",
    "Clarity",
    "Treatment",
    "Origin",
    "price",
    "Dimensions",
    "description",
    "Video Link 1",
    "Video Link 2",
  ]

  const sampleData = [
    "S-1872",
    "SAPPHIRE",
    "gemType",
    "OVAL",
    "4.11",
    "ROYAL BLUE",
    "VS",
    "HEATED",
    "SRI LANKA",
    "price",
    "10X8.51X5.08",
    "description",
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
