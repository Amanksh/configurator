import React from "react";
import { useConfigurator } from "../context/ConfiguratorContext";

const OutdoorPreview: React.FC = () => {
  const { config } = useConfigurator();
  const [poleHeight, setPoleHeight] = React.useState(280); // Default height in pixels

  // Calculate display dimensions in meters for visualization
  const displayWidthM = config.width / 1000; // mm to meters
  const displayHeightM = config.height / 1000; // mm to meters

  // Scale for visualization (1 meter = x pixels in our visualization)
  const scaleFactor = 50;

  // Calculate positions
  const displayWidthPx = displayWidthM * scaleFactor;
  const displayHeightPx = displayHeightM * scaleFactor;

  // Calculate cabinet grid
  const cabinetSize = 960; // in mm for outdoor
  const cabinetsWide = Math.ceil(config.width / cabinetSize);
  const cabinetsHigh = Math.ceil(config.height / cabinetSize);

  // Convert pole height from pixels to meters for display
  const poleHeightM = (poleHeight / scaleFactor).toFixed(1);

  // Calculate minimum container height needed
  const minContainerHeight = Math.max(
    400, // Minimum height
    displayHeightPx + poleHeight + 100 // Display height + pole height + extra space
  );

  return (
    <div
      className={`mb-8 ${
        !config.pixelPitch ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Outdoor Preview
      </h2>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        {/* Pole Height Control */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pole Height: {poleHeightM} meters
          </label>
          <input
            type="range"
            min="200"
            max="400"
            value={poleHeight}
            onChange={(e) => setPoleHeight(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div
          className="relative overflow-hidden bg-gray-100 rounded-lg"
          style={{
            width: "100%",
            height: `${minContainerHeight}px`,
          }}
        >
          {/* Sky and ground */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-100"
              style={{ height: "60%" }}
            ></div>
            <div
              className="absolute bottom-0 bg-gradient-to-b from-gray-300 to-gray-400"
              style={{ height: "40%", width: "100%" }}
            ></div>
          </div>

          {/* Road */}
          <div
            className="absolute bottom-0 bg-gray-700"
            style={{ height: "20%", width: "100%" }}
          >
            <div
              className="absolute top-1/2 w-full h-2 bg-gray-200"
              style={{ transform: "translateY(-50%)" }}
            >
              <div className="flex w-full h-full">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full bg-gray-200 mx-2"
                    style={{ width: "20px" }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Pole */}
          <div
            className="absolute bg-gray-600"
            style={{
              width: "20px",
              height: `${poleHeight}px`,
              bottom: "20%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {/* Height indicator */}
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 font-medium">
              {poleHeightM}m
            </div>
          </div>

          {/* LED Display with cabinet grid */}
          <div
            className="absolute bg-black shadow-xl"
            style={{
              width: `${displayWidthPx}px`,
              height: `${displayHeightPx}px`,
              bottom: "50%",
              left: "50%",
              transform: "translate(-50%, 0%)",
            }}
          >
            {/* Cabinet grid */}
            <div
              className="absolute inset-0 grid gap-0.5 bg-gray-700"
              style={{
                gridTemplateColumns: `repeat(${cabinetsWide}, 1fr)`,
                gridTemplateRows: `repeat(${cabinetsHigh}, 1fr)`,
              }}
            >
              {Array.from({ length: cabinetsWide * cabinetsHigh }).map(
                (_, i) => (
                  <div key={i} className="bg-black">
                    <div className="w-full h-full border border-gray-700 bg-gradient-to-br from-gray-800 to-black"></div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutdoorPreview;
