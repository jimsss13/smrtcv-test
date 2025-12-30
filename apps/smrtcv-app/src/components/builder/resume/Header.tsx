import React, { memo } from "react";
import { Resume } from "@/types/resume";

/**
 * Properties for the Header component.
 */
interface HeaderProps {
  /** The basic personal information for the resume header. */
  basics: Resume["basics"];
}

/**
 * A component that renders the header section of a resume.
 * Displays the person's name, contact information (email, phone, location), and a professional summary.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <Header 
 *   basics={{ 
 *     name: "John Doe", 
 *     email: "john@example.com", 
 *     phone: "123-456-7890", 
 *     location: { city: "New York", region: "NY" }, 
 *     summary: "Experienced developer." 
 *   }} 
 * />
 * 
 * @param props - The component properties including the basics object.
 */
export const Header = memo(function Header({ basics }: HeaderProps) {
  const { email, phone, location, summary, name } = basics;

  // 1. Build the location string (e.g., "San Francisco, CA" or just "San Francisco")
  const locationString = [location?.city, location?.region]
    .filter(Boolean) // Removes empty strings
    .join(", ");

  // 2. Build the full contact string, filtering out any empty values
  const contactParts = [email, phone, locationString]
    .filter(Boolean); // This removes any empty strings
    
  const contactString = contactParts.join(" | ");

  return (
    <header className="mb-8">
      {/* 3. Only show name if it exists */}
      {name && (
        <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
      )}
      
      {/* 4. Only show the contact <p> tag if the built string is not empty */}
      {contactString && (
        <p className="text-sm text-gray-700 mt-1">
          {contactString}
        </p>
      )}

      {/* This summary logic was already correct */}
      {summary && <p className="text-sm mt-3">{summary}</p>}
    </header>
  );
});