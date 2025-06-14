import { Leaf, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-BOLD text-stone-800 tracking-wide">GOGO WRITER</span>
          </div>
          {/* Right side */}
          <div className="flex items-center space-x-4">
            <Button  className="text-white hover:text-white-400 ">
              HELLO
            </Button>
            <Button variant="ghost" size="icon" className="text-stone-600 hover:text-stone-800">
              CIAO
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
