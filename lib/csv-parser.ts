import type { Gemstone } from "./types/gemstone"

export function parseCSV(csvContent: string): Gemstone[] {
  const lines = csvContent.split("\n")
  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

  const gemstones: Gemstone[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const values = parseCSVLine(line)
    if (values.length !== headers.length) continue

    const gemstone: any = {}

    headers.forEach((header, index) => {
      const value = values[index]?.trim().replace(/"/g, "") || ""

      switch (header.toLowerCase()) {
        case "id":
          gemstone.id = value
          break
        case "name":
          gemstone.name = value
          break
        case "gemtype":
        case "gem_type":
          gemstone.gemType = value.toLowerCase()
          break
        case "shape":
          gemstone.shape = value
          break
        case "carat":
        case "carat_weight":
          gemstone.carat = Number.parseFloat(value) || 0
          break
        case "color":
          gemstone.color = value
          break
        case "clarity":
          gemstone.clarity = value
          break
        case "treatment":
          gemstone.treatment = value
          break
        case "origin":
          gemstone.origin = value
          break
        case "price":
          gemstone.price = Number.parseInt(value.replace(/[,$]/g, "")) || 0
          break
        case "dimensions":
          gemstone.dimensions = value
          break
        case "description":
          gemstone.description = value
          break
        case "cloudinary_id":
        case "cloudinaryid":
          gemstone.cloudinaryId = value
          break
        case "certification":
          gemstone.certification = value
          break
        default:
          // Handle specifications
          if (value) {
            if (!gemstone.specifications) gemstone.specifications = {}
            gemstone.specifications[header] = value
          }
      }
    })

    // Validate required fields
    if (gemstone.id && gemstone.name && gemstone.gemType) {
      gemstones.push(gemstone as Gemstone)
    }
  }

  return gemstones
}

function parseCSVLine(line: string): string[] {
  const result = []
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

export function generateCSVTemplate(): string {
  const headers = [
    "id",
    "name",
    "gemType",
    "shape",
    "carat",
    "color",
    "clarity",
    "treatment",
    "origin",
    "price",
    "dimensions",
    "description",
    "cloudinaryId",
    "certification",
    "polish",
    "symmetry",
    "fluorescence",
  ]

  const sampleData = [
    "sap-001",
    "Ceylon Blue Sapphire",
    "sapphires",
    "Oval",
    "2.45",
    "Blue",
    "VS",
    "Heated",
    "Sri Lanka",
    "3500",
    "8.2 x 6.1 x 4.8 mm",
    "Exceptional Ceylon blue sapphire with vivid color",
    "vico-gemstones/sapphires/sap-001",
    "GIA Certificate #2234567890",
    "Excellent",
    "Very Good",
    "None",
  ]

  return [headers.join(","), sampleData.join(",")].join("\n")
}
