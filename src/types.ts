export type LEDType = "indoor" | "outdoor"

export type PixelPitch = "p-1.8" | "p-2.5" | "p-2.9" | "p-3.91" | "p-6" | "p-8" | "p-10"

export interface LEDConfig {
  type: LEDType
  pixelPitch: PixelPitch | null
  width: number // in mm
  height: number // in mm
  roomWidth?: number // in meters (only for indoor)
  roomHeight?: number // in meters (only for indoor)
}
