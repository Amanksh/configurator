"use client";

import React, { createContext, useContext, useState } from "react";

interface PreviewContextType {
  previewImage: string | null;
  setPreviewImage: (image: string | null) => void;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export const PreviewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <PreviewContext.Provider value={{ previewImage, setPreviewImage }}>
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreview = () => {
  const context = useContext(PreviewContext);
  if (context === undefined) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }
  return context;
};
