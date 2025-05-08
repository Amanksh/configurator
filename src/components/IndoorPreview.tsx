"use client"

import type React from "react"
import { useConfigurator } from "../context/ConfiguratorContext"

const IndoorPreview: React.FC = () => {
  const { config, setRoomDimensions } = useConfigurator()

  // Make sure roomWidth and roomHeight have values
  const roomWidth = config.roomWidth || 5 // default 5 meters
  const roomHeight = config.roomHeight || 3 // default 3 meters

  // Calculate display dimensions in meters for visualization
  const displayWidthM = config.width / 1000 // mm to meters
  const displayHeightM = config.height / 1000 // mm to meters

  // Check if display exceeds room dimensions
  const exceedsRoomWidth = displayWidthM > roomWidth
  const exceedsRoomHeight = displayHeightM > roomHeight

  // Scale for visualization (1 meter = x pixels in our visualization)
  const scaleFactor = 100

  // Calculate positions
  const roomWidthPx = roomWidth * scaleFactor
  const roomHeightPx = roomHeight * scaleFactor
  const displayWidthPx = displayWidthM * scaleFactor
  const displayHeightPx = displayHeightM * scaleFactor

  // Calculate cabinet grid
  const cabinetSize = config.type === "indoor" ? 576 : 960 // in mm
  const cabinetsWide = Math.ceil(config.width / cabinetSize)
  const cabinetsHigh = Math.ceil(config.height / cabinetSize)

  // Handle room dimension changes
  const handleRoomWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = Number.parseFloat(e.target.value)
    setRoomDimensions(width, roomHeight)
  }

  const handleRoomHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = Number.parseFloat(e.target.value)
    setRoomDimensions(roomWidth, height)
  }

  return (
    <div className={`mb-8 ${!config.pixelPitch ? "opacity-50 pointer-events-none" : ""}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Indoor Preview</h2>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Room Width (m)</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min={3}
                  max={15}
                  step={0.5}
                  value={roomWidth}
                  onChange={handleRoomWidthChange}
                  className="w-full mr-4"
                />
                <span className="w-16 text-right">{roomWidth.toFixed(1)} m</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Room Height (m)</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min={2.5}
                  max={10}
                  step={0.5}
                  value={roomHeight}
                  onChange={handleRoomHeightChange}
                  className="w-full mr-4"
                />
                <span className="w-16 text-right">{roomHeight.toFixed(1)} m</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative overflow-hidden bg-gray-100 rounded-lg"
          style={{
            width: "100%",
            height: "400px",
          }}
        >
          {/* Room */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div
              className="relative bg-gray-200 border border-gray-300"
              style={{
                width: `${roomWidthPx}px`,
                height: `${roomHeightPx}px`,
                maxWidth: "100%",
                maxHeight: "100%",
                transform: "scale(0.9)",
              }}
            >
              {/* Room dimensions */}
              <div className="absolute -top-6 left-0 w-full flex justify-center">
                <span className="bg-blue-100 px-2 py-1 rounded text-sm">Width: {roomWidth.toFixed(1)}m</span>
              </div>
              <div className="absolute -right-16 top-0 h-full flex items-center">
                <span className="bg-blue-100 px-2 py-1 rounded text-sm transform rotate-90">
                  Height: {roomHeight.toFixed(1)}m
                </span>
              </div>

              {/* Walls and floor with perspective */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200"></div>
                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-gray-300 to-transparent"></div>
                <div className="absolute left-0 w-1/3 h-full bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>

              {/* LED Display with cabinet grid */}
              <div
                className={`absolute bg-black shadow-xl ${exceedsRoomWidth || exceedsRoomHeight ? "border-2 border-red-500" : ""}`}
                style={{
                  width: `${displayWidthPx}px`,
                  height: `${displayHeightPx}px`,
                  left: "50%",
                  top: "40%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Warning message if display exceeds room dimensions */}
                {(exceedsRoomWidth || exceedsRoomHeight) && (
                  <div className="absolute -top-8 left-0 w-full text-center">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                      Display exceeds room dimensions!
                    </span>
                  </div>
                )}

                {/* Cabinet grid */}
                <div
                  className="absolute inset-0 grid gap-0.5 bg-gray-700"
                  style={{
                    gridTemplateColumns: `repeat(${cabinetsWide}, 1fr)`,
                    gridTemplateRows: `repeat(${cabinetsHigh}, 1fr)`,
                  }}
                >
                  {Array.from({ length: cabinetsWide * cabinetsHigh }).map((_, i) => (
                    <div key={i} className="bg-black">
                      <div className="w-full h-full border border-gray-700 bg-gradient-to-br from-gray-800 to-black"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndoorPreview
