"use client"

import type React from "react"
import { useConfigurator } from "../context/ConfiguratorContext"
import type { LEDType } from "../types"
import { MonitorIcon, CloudSun } from "lucide-react"

const TypeSelector: React.FC = () => {
  const { config, setType } = useConfigurator()

  const handleTypeSelect = (type: LEDType) => {
    setType(type)
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Display Type</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => handleTypeSelect("indoor")}
          className={`flex-1 flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 ${
            config.type === "indoor"
              ? "bg-blue-500 text-white shadow-lg transform scale-105"
              : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow"
          }`}
        >
          <MonitorIcon className="w-12 h-12 mb-2" />
          <span className="text-lg font-medium">Indoor</span>
          <p className="text-sm mt-2 opacity-80">Suitable for indoor environments with close viewing distances</p>
        </button>

        <button
          onClick={() => handleTypeSelect("outdoor")}
          className={`flex-1 flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 ${
            config.type === "outdoor"
              ? "bg-blue-500 text-white shadow-lg transform scale-105"
              : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow"
          }`}
        >
          <CloudSun className="w-12 h-12 mb-2" />
          <span className="text-lg font-medium">Outdoor</span>
          <p className="text-sm mt-2 opacity-80">High brightness for outdoor visibility in direct sunlight</p>
        </button>
      </div>
    </div>
  )
}

export default TypeSelector
