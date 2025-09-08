import Link from "next/link"
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-vico-primary text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="text-2xl font-semibold text-white tracking-tight">VICO</div>
              <div className="ml-2 text-sm text-gray-300 font-medium">by Vaibhav International</div>
            </div>
            <p className="text-gray-300 font-light leading-relaxed mb-8 max-w-md">
              Premium ethically sourced gemstones for wholesale. Specializing in sapphires, rubies, and emeralds from
              Thailand and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/6622674124"
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium smooth-transition"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </a>
              <a
                href="tel:+6622674124"
                className="inline-flex items-center px-4 py-2 border border-gray-600 hover:bg-vico-primary-light text-white rounded-full font-medium smooth-transition"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Gemstones</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/sapphires/basic-search"
                  className="text-gray-300 hover:text-white font-light smooth-transition"
                >
                  Sapphires
                </Link>
              </li>
              <li>
                <Link
                  href="/rubies/basic-search"
                  className="text-gray-300 hover:text-white font-light smooth-transition"
                >
                  Rubies
                </Link>
              </li>
              <li>
                <Link
                  href="/emeralds/basic-search"
                  className="text-gray-300 hover:text-white font-light smooth-transition"
                >
                  Emeralds
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white font-light smooth-transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
            <div className="space-y-4 text-gray-300 font-light">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p>2nd Floor, Room 241</p>
                  <p>Jewellery Trade Center Bldg</p>
                  <p>Silom Rd, Bang Rak</p>
                  <p>Bangkok 10500, Thailand</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                <p>+66 2 267 4124</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                <p>info@vico-gems.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 font-light text-sm">
              &copy; 2024 VICO by Vaibhav International. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm font-light smooth-transition">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm font-light smooth-transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
