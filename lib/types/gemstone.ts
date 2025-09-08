export interface Gemstone {
  id: string
  name: string
  gemType: "sapphires" | "rubies" | "emeralds"
  shape: string
  carat: number
  color: string
  clarity: string
  treatment: string
  origin: string
  price: number
  dimensions: string
  description?: string
  cloudinaryId?: string
  certification?: string
  specifications?: Record<string, string>
  createdAt?: string
  updatedAt?: string
}

export interface BulkUploadResult {
  success: boolean
  processed: number
  errors: Array<{
    row: number
    error: string
    data?: any
  }>
  imported: Gemstone[]
}
