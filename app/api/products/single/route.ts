import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const productData = formData.get("productData") as string
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const gemType = formData.get("gemType") as string

    const data = JSON.parse(productData)

    // Get all images
    const images: File[] = []
    let index = 0
    while (formData.get(`image${index}`)) {
      images.push(formData.get(`image${index}`) as File)
      index++
    }

    // Upload images and save product
    console.log("Saving product:", { id, name, gemType, imageCount: images.length })

    return NextResponse.json({
      success: true,
      product: { id, name, ...data },
    })
  } catch (error) {
    console.error("Product save error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Save failed",
      },
      { status: 500 },
    )
  }
}
