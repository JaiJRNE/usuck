import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      gemstones: {
        Row: {
          id: string
          name: string
          gem_type: string
          shape: string
          carat: number
          color: string
          clarity: string
          treatment: string
          origin: string
          price: number
          dimensions: string | null
          description: string | null
          image: string | null
          cloudinary_id: string | null
          specifications: Record<string, any> | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          gem_type: string
          shape: string
          carat: number
          color: string
          clarity: string
          treatment: string
          origin: string
          price?: number
          dimensions?: string | null
          description?: string | null
          image?: string | null
          cloudinary_id?: string | null
          specifications?: Record<string, any> | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          gem_type?: string
          shape?: string
          carat?: number
          color?: string
          clarity?: string
          treatment?: string
          origin?: string
          price?: number
          dimensions?: string | null
          description?: string | null
          image?: string | null
          cloudinary_id?: string | null
          specifications?: Record<string, any> | null
          updated_at?: string
        }
      }
    }
  }
}
