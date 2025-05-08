"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { LEDConfig, LEDType, PixelPitch } from "../types"

interface ConfiguratorContextType {
  config: LEDConfig
  setType: (type: LEDType) => void
  setPixelPitch: (pitch: PixelPitch) => void
  setDimensions: (width: number, height: number) => void
  setRoomDimensions: (width: number, height: number) => void
  resetConfig: () => void
}

const defaultConfig: LEDConfig = {
  type: "indoor",
  pixelPitch: null,
  width: 576, // default for indoor
  height: 576, // default for indoor
  roomWidth: 5, // default 5 meters
  roomHeight: 3, // default 3 meters
}

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined)

export const useConfigurator = () => {
  const context = useContext(ConfiguratorContext)
  if (!context) {
    throw new Error("useConfigurator must be used within a ConfiguratorProvider")
  }
  return context
}

export const ConfiguratorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<LEDConfig>(defaultConfig)

  const setType = (type: LEDType) => {
    setConfig((prev) => ({
      ...prev,
      type,
      pixelPitch: null, // Reset pixel pitch when type changes
      width: type === "indoor" ? 576 : 960,
      height: type === "indoor" ? 576 : 960,
    }))
  }

  const setPixelPitch = (pixelPitch: PixelPitch) => {
    setConfig((prev) => ({ ...prev, pixelPitch }))
  }

  const setDimensions = (width: number, height: number) => {
    // For indoor displays, ensure dimensions don't exceed room size
    if (config.type === "indoor") {
      const roomWidthMm = (config.roomWidth || 5) * 1000
      const roomHeightMm = (config.roomHeight || 3) * 1000

      const adjustedWidth = width
      const adjustedHeight = height

      setConfig((prev) => ({ ...prev, width: adjustedWidth, height: adjustedHeight }))
    } else {
      // For outdoor, no restrictions
      setConfig((prev) => ({ ...prev, width, height }))
    }
  }

  const setRoomDimensions = (width: number, height: number) => {
    setConfig((prev) => ({ ...prev, roomWidth: width, roomHeight: height }))
  }

  const resetConfig = () => {
    setConfig(defaultConfig)
  }

  return (
    <ConfiguratorContext.Provider
      value={{
        config,
        setType,
        setPixelPitch,
        setDimensions,
        setRoomDimensions,
        resetConfig,
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  )
}
