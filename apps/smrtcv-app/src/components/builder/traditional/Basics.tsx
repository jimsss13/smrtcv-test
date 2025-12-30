import React, { memo } from "react";
import Image from "next/image";
import { Basics } from '@/types/resume'; // <-- Use the new MASTER type

/**
 * Properties for the BasicsSection component.
 */
interface Props {
  /** The basic personal information to render. */
  basics: Basics;
}

/**
 * The header section for the traditional resume layout.
 * Displays the profile photo, name, title, and contact information.
 * 
 * @param props - The component properties.
 */
const BasicsSection = memo(({ basics }: Props) => {
  // Build location string, filtering out empty parts
  const locationParts = [
    basics.location?.address,
    basics.location?.city,
    basics.location?.region,
    basics.location?.postalCode,
    basics.location?.countryCode,
  ].filter(part => part?.trim());

  const locationString = locationParts.join(" ");

  return (
    <header className="flex flex-col md:flex-row" aria-label="Resume Header">
      {/* Photo */}
      <div className="md:w-1/4 bg-gray-200 flex items-center justify-center p-6">
        {basics.image ? (
          <div className="relative w-40 h-40">
            <Image
              src={basics.image}
              alt={basics.name || "Profile Photo"}
              fill
              className="object-cover rounded-full"
              sizes="(max-width: 768px) 160px, 160px"
            />
          </div>
        ) : (
          <div 
            className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-gray-500">Photo</span>
          </div>
        )}
      </div>
      {/* Contact Info */}
      <div className="md:w-3/4 bg-[var(--trad-primary-color)] text-[var(--trad-text-light)] p-6 md:p-8">
        <h1 className="text-4xl font-bold">{basics.name}</h1>
        <h2 className="text-2xl font-light">{basics.label}</h2>
        <div className="mt-4 space-y-1 text-sm">
          {/* Only show location if it has content */}
          {locationString && <p aria-label="Location">{locationString}</p>}
          
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {basics.phone?.trim() && <p aria-label="Phone Number">{basics.phone}</p>}
            {basics.email?.trim() && <p aria-label="Email Address">{basics.email}</p>}
          </div>
          {basics.url?.trim() && (
            <p aria-label="Website">
              <a href={basics.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {basics.url}
              </a>
            </p>
          )}
        </div>
      </div>
    </header>
  );
});

BasicsSection.displayName = 'BasicsSection';

export { BasicsSection };
export default BasicsSection;