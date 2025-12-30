import { useState, useEffect, RefObject, useCallback } from 'react';
import { A4_WIDTH_PX, PREVIEW_CONTAINER_PADDING } from '@/constants/ui';

/**
 * Custom hook to calculate the scale factor for the resume preview.
 * 
 * Ensures the A4-sized resume preview (A4_WIDTH_PX) fits within its container's
 * available width, accounting for padding. Uses ResizeObserver for efficient
 * and accurate container measurement.
 * 
 * @param {RefObject<HTMLDivElement | null>} containerRef - Reference to the container element
 * @param {boolean} isClient - Whether the component is rendered on the client
 * @returns {number} The scale factor (0 to 1) to apply via CSS transform: scale()
 * 
 * @example
 * const containerRef = useRef<HTMLDivElement>(null);
 * const scale = useBuilderScale(containerRef, true);
 * <div style={{ transform: `scale(${scale})` }}>...</div>
 */
export function useBuilderScale(
  containerRef: RefObject<HTMLDivElement | null>,
  isClient: boolean
): number {
  const [scale, setScale] = useState(1);

  const calculateScale = useCallback(() => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const availableWidth = containerWidth - PREVIEW_CONTAINER_PADDING;
    
    const newScale = availableWidth < A4_WIDTH_PX 
      ? availableWidth / A4_WIDTH_PX 
      : 1;

    // Use a small threshold to avoid unnecessary re-renders for sub-pixel changes
    setScale((prevScale) => {
      if (Math.abs(prevScale - newScale) < 0.001) return prevScale;
      return newScale;
    });
  }, [containerRef]);

  useEffect(() => {
    if (!isClient) return;

    // Initial calculation
    calculateScale();

    // ResizeObserver handles container size changes efficiently
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(calculateScale);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [isClient, containerRef, calculateScale]);

  return scale;
}
