"use client"

import type React from "react"
import { useConfigurator } from "../context/ConfiguratorContext"

const SizeConfigurator: React.FC = () => {
  const { config, setDimensions } = useConfigurator()

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = Number.parseInt(e.target.value, 10)
    setDimensions(width, config.height)
  }

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = Number.parseInt(e.target.value, 10)
    setDimensions(config.width, height)
  }

  // Calculate LED panel size
  const cabinetSize = config.type === "indoor" ? 576 : 960 // in mm
  const widthInCabinets = Math.max(1, Math.round(config.width / cabinetSize))
  const heightInCabinets = Math.max(1, Math.round(config.height / cabinetSize))
  const actualWidth = widthInCabinets * cabinetSize
  const actualHeight = heightInCabinets * cabinetSize

  // For indoor displays, check if the display exceeds room dimensions
  const isIndoor = config.type === "indoor"
  const roomWidthMm = (config.roomWidth || 5) * 1000 // convert meters to mm
  const roomHeightMm = (config.roomHeight || 3) * 1000 // convert meters to mm
  const exceedsRoomWidth = isIndoor && actualWidth > roomWidthMm
  const exceedsRoomHeight = isIndoor && actualHeight > roomHeightMm

  return (
    <div className={`mb-8 ${!config.pixelPitch ? "opacity-50 pointer-events-none" : ""}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Configure Display Size</h2>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Width (mm)</label>
            <div className="flex items-center">
              <input
                type="range"
                min={cabinetSize}
                max={isIndoor ? roomWidthMm : 10000} // For indoor, limit to room width
                step={cabinetSize}
                value={config.width}
                onChange={handleWidthChange}
                className="w-full mr-4"
              />
              <span className={`w-20 text-right ${exceedsRoomWidth ? "text-red-500 font-bold" : ""}`}>
                {actualWidth} mm
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {widthInCabinets} x {cabinetSize}mm cabinets
              {exceedsRoomWidth && <span className="text-red-500 block">Exceeds room width!</span>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Height (mm)</label>
            <div className="flex items-center">
              <input
                type="range"
                min={cabinetSize}
                max={isIndoor ? roomHeightMm : 10000} // For indoor, limit to room height
                step={cabinetSize}
                value={config.height}
                onChange={handleHeightChange}
                className="w-full mr-4"
              />
              <span className={`w-20 text-right ${exceedsRoomHeight ? "text-red-500 font-bold" : ""}`}>
                {actualHeight} mm
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {heightInCabinets} x {cabinetSize}mm cabinets
              {exceedsRoomHeight && <span className="text-red-500 block">Exceeds room height!</span>}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-2">Display Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Width: {actualWidth}mm</p>
                <p className="text-sm text-gray-600">Total Height: {actualHeight}mm</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cabinets Wide: {widthInCabinets}</p>
                <p className="text-sm text-gray-600">Cabinets High: {heightInCabinets}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SizeConfigurator
