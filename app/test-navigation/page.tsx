import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestNavigationPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Navigation Test Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h2 className="text-lg font-semibold">Test All Navigation Links:</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Base Routes (should redirect):</h3>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/sapphires">Sapphires Base</Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/rubies">Rubies Base</Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/emeralds">Emeralds Base</Link>
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Search Routes:</h3>
                <Button asChild className="w-full">
                  <Link href="/sapphires/basic-search">Sapphires Search</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/rubies/basic-search">Rubies Search</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/emeralds/basic-search">Emeralds Search</Link>
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Detail Routes:</h3>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/sapphires/detail/sap-001">Sapphire Detail</Link>
                </Button>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/rubies/detail/rub-001">Ruby Detail</Link>
                </Button>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/emeralds/detail/em-001">Emerald Detail</Link>
                </Button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded">
              <h3 className="font-medium mb-2">Current URL Test:</h3>
              <p className="text-sm text-gray-600">
                Check the debug info in the bottom-left corner to see the current pathname.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
