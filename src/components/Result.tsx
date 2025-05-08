import type React from "react"
import { useConfigurator } from "../context/ConfiguratorContext"

const Result: React.FC = () => {
  const { config } = useConfigurator()

  if (!config.pixelPitch) {
    return null
  }

  // Calculate additional information
  const cabinetSize = config.type === "indoor" ? 576 : 960 // in mm
  const cabinetsWide = Math.round(config.width / cabinetSize)
  const cabinetsHigh = Math.round(config.height / cabinetSize)
  const totalCabinets = cabinetsWide * cabinetsHigh

  // Calculate approximate resolution based on pixel pitch (p-1.8 = 1.8mm between pixels)
  const pitchValue = Number.parseFloat(config.pixelPitch.substring(2))
  const pixelsPerMeter = 1000 / pitchValue
  const widthResolution = Math.round((config.width / 1000) * pixelsPerMeter)
  const heightResolution = Math.round((config.height / 1000) * pixelsPerMeter)
  const totalPixels = widthResolution * heightResolution
  const megaPixels = (totalPixels / 1000000).toFixed(2)

  // Calculate pixel density per square meter
  const displayAreaSqM = (config.width / 1000) * (config.height / 1000)
  const pixelDensity = Math.round(totalPixels / displayAreaSqM)

  // Calculate power consumption (estimated values)
  // These are approximate values - in a real application, these would be based on actual specifications
  const maxPowerPerSqM = config.type === "indoor" ? 600 : 800 // watts per square meter
  const avgPowerPerSqM = maxPowerPerSqM * 0.4 // average is typically 30-50% of max

  const maxPowerConsumption = Math.round(displayAreaSqM * maxPowerPerSqM)
  const avgPowerConsumption = Math.round(displayAreaSqM * avgPowerPerSqM)

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Configuration Summary</h2>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Display Specifications</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-2 text-gray-600">Display Type</td>
                  <td className="py-2 font-medium">{config.type.toUpperCase()} LED</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Pixel Pitch</td>
                  <td className="py-2 font-medium">
                    {config.pixelPitch?.toUpperCase()} ({pitchValue}mm)
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Dimensions</td>
                  <td className="py-2 font-medium">
                    {config.width} × {config.height} mm
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Power Consumption</td>
                  <td className="py-2 font-medium">{maxPowerConsumption} watts (max)</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Avg. Power Consumption</td>
                  <td className="py-2 font-medium">{avgPowerConsumption} watts (avg)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-3">Technical Specifications</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-2 text-gray-600">Resolution</td>
                  <td className="py-2 font-medium">
                    {widthResolution} × {heightResolution} pixels
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Total Pixels</td>
                  <td className="py-2 font-medium">
                    {totalPixels.toLocaleString()} ({megaPixels} MP)
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Cabinet Size</td>
                  <td className="py-2 font-medium">
                    {cabinetSize} × {cabinetSize} mm
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Pixel Density</td>
                  <td className="py-2 font-medium">{pixelDensity} pixels per m²</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between">
            <h3 className="font-medium text-gray-800">Estimated Cost</h3>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300">
              Request Quotation
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Contact our sales team for accurate pricing based on your configuration.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Result
