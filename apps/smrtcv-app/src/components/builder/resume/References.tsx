import React, { memo } from "react";
import { Reference } from "@/types/resume";

/**
 * Properties for the References component.
 */
interface ReferencesProps {
  /** Array of reference entries. */
  references: Reference[] | undefined;
}

/**
 * Helper function to check if a reference entry is empty.
 * Trims strings and checks for meaningful content in name or reference details.
 * 
 * @param ref - The reference entry to check.
 * @returns True if the reference entry is considered empty.
 */
function isReferenceEmpty(ref: Reference) {
  if (!ref) return true;
  return !ref.name?.trim() && !ref.reference?.trim();
}

/**
 * A component that renders the references section of a resume.
 * Displays a list of professional references with their names and contact details.
 * Automatically filters out empty entries and hides the section if no entries exist.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <References 
 *   references={[
 *     { name: "Jane Smith", reference: "Manager at Tech Corp - jane@example.com" }
 *   ]} 
 * />
 * 
 * @param props - The component properties including an array of references.
 */
export const References = memo(function References({ references }: ReferencesProps) {
  const filteredReferences = (references || []).filter(r => !isReferenceEmpty(r));
  
  if (filteredReferences.length === 0) return null;
  
  return (
    <section className="break-inside-avoid">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        References
      </h2>
      {filteredReferences.map((ref, index) => (
        <div key={index} className="text-sm mb-2">
          <p className="font-semibold">{ref.name}</p>
          <p>{ref.reference}</p>
        </div>
      ))}
    </section>
  );
});