"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ToolCropAreaProps {
  imageUrl: string;
  aspectRatio: number | null; // null = free crop
  onCropChange: (crop: CropArea) => void;
}

export default function ToolCropArea({
  imageUrl,
  aspectRatio,
  onCropChange,
}: ToolCropAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [crop, setCrop] = useState<CropArea>({ x: 0, y: 0, width: 100, height: 100 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const container = containerRef.current;
      if (!container) return;
      const maxW = container.clientWidth;
      const maxH = 400;
      const scale = Math.min(maxW / img.width, maxH / img.height, 1);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      setImageSize({ width: w, height: h });
      setCrop({ x: 0, y: 0, width: w, height: h });
    };
    img.src = imageUrl;
  }, [imageUrl]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setIsDragging(true);
    setStartPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      const dx = currentX - startPos.x;
      const dy = currentY - startPos.y;

let newW = crop.width + dx;
      let newH = crop.height + dy;

      newW = Math.max(50, Math.min(imageSize.width - crop.x, newW));
      newH = Math.max(50, Math.min(imageSize.height - crop.y, newH));

      if (aspectRatio) {
        newH = newW / aspectRatio;
        if (crop.y + newH > imageSize.height) {
          newH = imageSize.height - crop.y;
          newW = newH * aspectRatio;
        }
      }

      const finalCrop = {
        x: crop.x,
        y: crop.y,
        width: Math.round(newW),
        height: Math.round(newH),
      };
      setCrop(finalCrop);
      onCropChange(finalCrop);
    },
    [isDragging, startPos, crop, imageSize, aspectRatio, onCropChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Selection handles for corners
  const handleSize = 12;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto overflow-hidden rounded-lg border border-border bg-muted/10"
      style={{ maxWidth: imageSize.width || "100%", height: imageSize.height || 400 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Crop preview"
        className="block h-full w-full select-none object-contain"
        draggable={false}
      />

      {/* Crop overlay */}
      {imageSize.width > 0 && (
        <div
          className="absolute cursor-nwse-resize"
          style={{
            left: crop.x,
            top: crop.y,
            width: crop.width,
            height: crop.height,
            border: "2px dashed #fff",
            background: "rgba(255,255,255,0.1)",
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.4)",
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Corner handles */}
          <div
            className="absolute -bottom-1.5 -right-1.5 h-3 w-3 cursor-se-resize rounded-full border-2 border-white bg-primary shadow"
          />
          <div
            className="absolute -bottom-1.5 -left-1.5 h-3 w-3 cursor-sw-resize rounded-full border-2 border-white bg-primary shadow"
          />
          <div
            className="absolute -top-1.5 -right-1.5 h-3 w-3 cursor-ne-resize rounded-full border-2 border-white bg-primary shadow"
          />
          <div
            className="absolute -top-1.5 -left-1.5 h-3 w-3 cursor-nw-resize rounded-full border-2 border-white bg-primary shadow"
          />
          {/* Center info */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
            {crop.width} × {crop.height}
          </div>
        </div>
      )}
    </div>
  );
}

export type { CropArea };

