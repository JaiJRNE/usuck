import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jewelry Designer AI | Custom Jewelry Generation',
  description: 'Create stunning custom jewelry designs from text descriptions or images using AI. Generate rings, pendants, earrings, and more with professional-quality results.',
  keywords: 'jewelry design, AI jewelry, custom jewelry, jewelry generator, rings, pendants, earrings',
  authors: [{ name: 'Jewelry Designer AI' }],
  openGraph: {
    title: 'Jewelry Designer AI | Custom Jewelry Generation',
    description: 'Create stunning custom jewelry designs from text descriptions or images using AI.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          {children}
        </div>
      </body>
    </html>
  )
}