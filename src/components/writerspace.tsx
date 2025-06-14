"use client"

import { ScrollText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

interface WriterSpaceProps {
  isOpen: boolean
  onToggle: () => void
}

export function WriterSpace({ isOpen, onToggle }: WriterSpaceProps) {
  const [thought, setThought] = useState("")

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <div className="lg:hidden fixed top-20 right-4 z-40">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggle}
          className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg"
        >
          <ScrollText className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar Writer */}
      <div
        className={`
          fixed lg:relative top-0 right-0 h-full lg:h-auto w-full lg:w-80 
          bg-white/95 backdrop-blur-sm 
          border-l lg:border border-stone-200 lg:rounded-2xl 
          shadow-xl lg:shadow-lg
          transform transition-transform duration-300 ease-in-out z-30
          ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
      >
        <Card className="h-full lg:h-auto border-0 lg:border shadow-none lg:shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-light text-stone-800 flex items-center gap-2">
                <ScrollText className="h-5 w-5 text-pink-500" />
                Whisper Space
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={onToggle} className="lg:hidden w-8 h-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-stone-500 italic">Write something and let it go 🌸</div>
          </CardHeader>

          <CardContent className="pt-0 h-full flex flex-col">
            <textarea
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              placeholder="Type your thoughts here…"
              className="resize-none p-4 text-stone-700 text-sm rounded-md border bg-white border-stone-200 h-72 lg:h-60 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent placeholder:text-stone-400"
            />
            <div className="text-right mt-2 text-xs text-stone-400">
              Nothing is saved. It's just for your peace 🌿
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && <div className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-20" onClick={onToggle} />}
    </>
  )
}
