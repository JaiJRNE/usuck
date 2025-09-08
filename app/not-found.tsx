import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Gem, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="mb-6">
            <Gem className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
            <p className="text-gray-600">The gemstone or page you're looking for doesn't exist.</p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/test-navigation">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Test Navigation
              </Link>
            </Button>

            <div className="grid grid-cols-1 gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/sapphires/basic-search">Browse Sapphires</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/rubies/basic-search">Browse Rubies</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/emeralds/basic-search">Browse Emeralds</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
