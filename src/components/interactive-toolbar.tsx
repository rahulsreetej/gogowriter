"use client"

import { Droplets, Scissors, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface InteractiveToolbarProps {
  onWater: () => void
  onPrune: () => void
  onViewProgress: () => void
  streak: number
}

export function InteractiveToolbar({ onWater, onPrune, onViewProgress, streak }: InteractiveToolbarProps) {
  return (
   
      <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-stone-200 p-2 pointer-none ">
        <div className="flex items-center space-x-2">
  
        </div>
      </div>
    
  )
}
