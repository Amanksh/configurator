"use client"

import type React from "react"
import { useConfigurator } from "../context/ConfiguratorContext"
import type { PixelPitch } from "../types"

const PitchSelector: React.FC = () => {
  const { config, setPixelPitch } = useConfigurator()

  // Define available pixel pitches based on the selected type
  const availablePitches: PixelPitch[] =
    config.type === "indoor" ? ["p-1.8", "p-2.5", "p-2.9", "p-3.91"] : ["p-3.91", "p-6", "p-8", "p-10"]

  // Display helper text based on selected type
  const getHelperText = (pitch: PixelPitch) => {
    const pitchMap: Record<PixelPitch, string> = {
      "p-1.8": "Ultra-HD (1.8mm) - Highest resolution for close viewing",
      "p-2.5": "Super-HD (2.5mm) - Excellent for control rooms",
      "p-2.9": "HD+ (2.9mm) - Ideal for corporate lobbies",
      "p-3.91":
        config.type === "indoor"
          ? "HD (3.91mm) - Good for retail and exhibition"
          : "Outdoor HD (3.91mm) - High-definition outdoor",
      "p-6": "Standard (6mm) - Common for billboards",
      "p-8": "Economy (8mm) - Distance viewing",
      "p-10": "Basic (10mm) - Long-distance viewing only",
    }
    return pitchMap[pitch]
  }

  return (
    <div className={`mb-8 ${!config.type ? "opacity-50 pointer-events-none" : ""}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Pixel Pitch</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {availablePitches.map((pitch) => (
          <button
            key={pitch}
            onClick={() => setPixelPitch(pitch)}
            className={`p-4 rounded-lg transition-all duration-300 text-center ${
              config.pixelPitch === pitch
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow"
            }`}
          >
            <div className="font-bold text-xl mb-1">{pitch.toUpperCase()}</div>
            <div className="text-xs">{pitch.replace("p-", "")}mm pitch</div>
            <div className="mt-2 text-xs">{getHelperText(pitch)}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PitchSelector
