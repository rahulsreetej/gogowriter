"use client"

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
