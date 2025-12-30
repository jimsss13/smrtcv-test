import React, { memo } from "react";
import { Publication } from "@/types/resume";

/**
 * Properties for the Publications component.
 */
interface PublicationsProps {
  /** Array of publication entries. */
  publications: Publication[] | undefined;
}

/**
 * Helper function to check if a publication entry is empty.
 * Trims strings and checks for meaningful content in name, publisher, or releaseDate.
 * 
 * @param pub - The publication entry to check.
 * @returns True if the publication entry is considered empty.
 */
function isPublicationEmpty(pub: Publication) {
  if (!pub) return true;
  return !pub.name?.trim() && 
         !pub.publisher?.trim() && 
         !pub.releaseDate?.trim();
}

/**
 * A component that renders the publications section of a resume.
 * Displays a list of publications with their names, publishers, release dates, and optional URLs.
 * Automatically filters out empty entries and hides the section if no entries exist.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <Publications 
 *   publications={[
 *     { name: "The Art of Code", publisher: "Tech Press", releaseDate: "2023-12-30", url: "https://example.com" }
 *   ]} 
 * />
 * 
 * @param props - The component properties including an array of publications.
 */
export const Publications = memo(function Publications({ publications }: PublicationsProps) {
  const filteredPublications = (publications || []).filter(p => !isPublicationEmpty(p));

  if (filteredPublications.length === 0) return null;
  
  return (
    <section className="mb-8 break-inside-avoid">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Publications
      </h2>
      {filteredPublications.map((pub, index) => (
        <div key={index} className="mb-3">
          <h3 className="font-semibold">{pub.name}</h3>
          <p className="text-sm">
            <span className="italic">{pub.publisher}</span>, {pub.releaseDate}
          </p>
          {pub.url && (
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline"
            >
              {pub.url}
            </a>
          )}
        </div>
      ))}
    </section>
  );
});