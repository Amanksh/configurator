"use client"

import type React from "react"
import { useConfigurator } from "../context/ConfiguratorContext"
import TypeSelector from "./TypeSelector"
import PitchSelector from "./PitchSelector"
import SizeConfigurator from "./SizeConfigurator"
import IndoorPreview from "./IndoorPreview"
import OutdoorPreview from "./OutdoorPreview"
import Result from "./Result"

const LEDConfigurator: React.FC = () => {
  const { config, resetConfig } = useConfigurator()

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">LED Display Configurator</h1>
        <button onClick={resetConfig} className="text-sm text-gray-600 hover:text-blue-500 flex items-center gap-1">
          Reset Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <TypeSelector />
        <PitchSelector />
        <SizeConfigurator />

        {config.type === "indoor" ? <IndoorPreview /> : <OutdoorPreview />}

        <Result />
      </div>
    </div>
  )
}

export default LEDConfigurator
