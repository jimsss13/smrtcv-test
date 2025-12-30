import { ComponentType } from "react";
import { Resume } from "@/types/resume";
import { BasicsForm } from "@/components/builder/form/BasicsForm";
import { WorkForm } from "@/components/builder/form/WorkForm";
import { EducationForm } from "@/components/builder/form/EducationForm";
import { AdvisoryForm } from "@/components/builder/form/AdvisoryForm";
import { SkillsForm } from "@/components/builder/form/SkillsForm";
import { LanguagesForm } from "@/components/builder/form/LanguagesForm";
import { InterestsForm } from "@/components/builder/form/InterestsForm";
import { ProjectsForm } from "@/components/builder/form/ProjectsForm";
import { AwardsForm } from "@/components/builder/form/AwardsForm";
import { CertificatesForm } from "@/components/builder/form/CertificatesForm";
import { PublicationsForm } from "@/components/builder/form/PublicationsForm";
import { VolunteerForm } from "@/components/builder/form/VolunteerForm";
import { ReferencesForm } from "@/components/builder/form/ReferencesForm";

/**
 * Interface for section configuration details.
 */
interface SectionConfigItem {
  /** The human-readable title of the section. */
  title: string;
  /** The React component responsible for editing this section. */
  component: ComponentType<{ selectedTemplate: string }>;
}

/**
 * Centralized configuration for all resume builder sections.
 * Maps resume data keys to their respective titles and editor components.
 */
export const SECTION_CONFIG: Record<keyof Resume, SectionConfigItem> = {
  basics: { title: "Personal Details", component: BasicsForm },
  work: { title: "Employment History", component: WorkForm },
  education: { title: "Education", component: EducationForm },
  skills: { title: "Skills", component: SkillsForm },
  projects: { title: "Projects", component: ProjectsForm },
  awards: { title: "Awards", component: AwardsForm },
  certificates: { title: "Certificates", component: CertificatesForm },
  languages: { title: "Languages", component: LanguagesForm },
  interests: { title: "Interests", component: InterestsForm },
  publications: { title: "Publications", component: PublicationsForm },
  volunteer: { title: "Volunteer Experience", component: VolunteerForm },
  references: { title: "References", component: ReferencesForm },
  advisory: { title: "Advisory Roles", component: AdvisoryForm },
};
