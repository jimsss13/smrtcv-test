import React, { memo } from "react";
import { Certificate } from "@/types/resume";

/**
 * Properties for the Certificates component.
 */
interface CertificatesProps {
  /** Array of certificate entries. */
  certificates: Certificate[] | undefined;
}

/**
 * Helper function to check if a certificate entry is empty.
 * Trims strings and checks for meaningful content in name, issuer, or date.
 * 
 * @param cert - The certificate entry to check.
 * @returns True if the certificate entry is considered empty.
 */
function isCertificateEmpty(cert: Certificate) {
  if (!cert) return true;
  return !cert.name?.trim() && 
         !cert.issuer?.trim() && 
         !cert.date?.trim();
}

/**
 * A component that renders the certificates section of a resume.
 * Displays a list of certificates with their names, issuers, and dates.
 * Automatically filters out empty entries and hides the section if no entries exist.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <Certificates 
 *   certificates={[
 *     { name: "AWS Certified Developer", issuer: "Amazon Web Services", date: "2023-01" }
 *   ]} 
 * />
 * 
 * @param props - The component properties including an array of certificates.
 */
export const Certificates = memo(function Certificates({ certificates }: CertificatesProps) {
  const filteredCertificates = certificates?.filter(cert => !isCertificateEmpty(cert));
  
  if (!filteredCertificates || filteredCertificates.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Certificates
      </h2>
      {filteredCertificates.map((cert, index) => (
        <div key={index} className="mb-2">
          <h3 className="font-semibold">{cert.name}</h3>
          <p className="text-sm">
            {cert.issuer} – {cert.date}
          </p>
        </div>
      ))}
    </section>
  );
});