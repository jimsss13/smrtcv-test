"use client";

import React, { memo, ReactNode, RefObject } from "react";

/**
 * Properties for the ResumePreviewContainer component.
 */
interface ResumePreviewContainerProps {
  /** Reference to the container element for measurement and scaling. */
  containerRef: RefObject<HTMLDivElement | null>;
  /** The scale factor to apply to the resume preview for fitting. */
  scale: number;
  /** The resume content to render within the container. */
  children: ReactNode;
}

/**
 * A container component for the resume preview.
 * Handles the scaling and centering of the A4 paper representation.
 * Optimized with React.memo to avoid re-renders when parent state changes.
 * 
 * @example
 * <ResumePreviewContainer containerRef={ref} scale={0.8}>
 *   <ModernTemplate data={resumeData} />
 * </ResumePreviewContainer>
 * 
 * @param props - Component properties.
 */
export const ResumePreviewContainer = memo(function ResumePreviewContainer({
  containerRef,
  scale,
  children,
}: ResumePreviewContainerProps) {
  return (
    <div 
      ref={containerRef}
      className="md:w-2/3 flex justify-center overflow-y-auto bg-gray-500/10 rounded-xl p-8 relative"
    >
      {/* A4 PAPER WRAPPER */}
      <div
        className="origin-top transition-transform duration-200 ease-out bg-white shadow-2xl print:shadow-none print:transform-none print:m-0"
        style={{ 
          transform: `scale(${scale})`,
          width: '210mm',
          minHeight: '297mm'
        }}
      >
        {children}
      </div>
    </div>
  );
});
