"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function DebugNavigation() {
  const pathname = usePathname()

  useEffect(() => {
    console.log("Current pathname:", pathname)
  }, [pathname])

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return <div className="fixed bottom-4 left-4 bg-black text-white p-2 rounded text-xs z-50">Path: {pathname}</div>
}
