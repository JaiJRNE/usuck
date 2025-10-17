// Analyze the VICO inventory CSV structure
const csvUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VICO%20Inventory%20-%20MASTER-dDKdbjtsrlUxE4iaDJmBFyvsqev47p.csv"

async function analyzeCSV() {
  try {
    console.log("Fetching CSV from:", csvUrl)
    const response = await fetch(csvUrl)
    const text = await response.text()

    const lines = text.split("\n").filter((line) => line.trim())
    console.log(`\nTotal lines: ${lines.length}`)

    // Show first 5 rows
    console.log("\n=== First 5 rows ===")
    lines.slice(0, 5).forEach((line, i) => {
      console.log(`\nRow ${i}:`)
      const values = line.split(",")
      values.forEach((val, j) => {
        console.log(`  Column ${j}: ${val}`)
      })
    })

    // Detect if first row is headers
    const firstRow = lines[0].split(",")
    console.log("\n=== First row analysis ===")
    console.log("Values:", firstRow)

    // Check for numeric values in second row (indicates first row is headers)
    if (lines.length > 1) {
      const secondRow = lines[1].split(",")
      console.log("\n=== Second row analysis ===")
      console.log("Values:", secondRow)

      // Check if column 4 (carat) is numeric
      const caratValue = secondRow[4]
      const isNumeric = !isNaN(Number.parseFloat(caratValue))
      console.log(`\nCarat column (${caratValue}) is numeric: ${isNumeric}`)
    }

    // Count products by type
    const productTypes: Record<string, number> = {}
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",")
      const type = values[1]?.trim().toUpperCase()
      if (type) {
        productTypes[type] = (productTypes[type] || 0) + 1
      }
    }

    console.log("\n=== Product counts by type ===")
    Object.entries(productTypes).forEach(([type, count]) => {
      console.log(`${type}: ${count}`)
    })
  } catch (error) {
    console.error("Error analyzing CSV:", error)
  }
}

analyzeCSV()
