export type ProjectCountry = 'California' | 'Germany' | 'Dubai';

export type ProjectPhaseCounts = { before: number; during: number; after: number; composite?: number };

export type Project = {
  id: string;
  slug: string;
  name: string;
  country: ProjectCountry;
  countrySlug: 'california' | 'germany' | 'dubai';
  location: string;
  type: string;
  category: string;
  description: string;
  heroImage: string;
  secondaryImage: string;
  heroAlt: string;
  detailPath: string;
  archivePath: string;
  phaseCounts: ProjectPhaseCounts;
  photoCount: number;
  needsVerification?: boolean;
  promoted: boolean;
};

export const projects: Project[] = [
  {
    id: 'DE-01', slug: 'whole-house-garden-renovation', name: 'Whole House & Garden Renovation', country: 'Germany', countrySlug: 'germany',
    location: 'Germany', type: 'Residential renovation', category: 'Whole Home + Landscape',
    description: 'A complete renovation documented from the existing condition through construction, landscape transformation, and final completion.',
    heroImage: '/projects/germany/de-01/selected/DE-01_Whole_House_and_Garden_Renovation__photo-060.webp',
    secondaryImage: '/projects/germany/de-01/selected/DE-01_Whole_House_and_Garden_Renovation__photo-059.webp',
    heroAlt: 'Completed garden and outdoor living renovation in Germany', detailPath: '/projects/germany/whole-house-garden-renovation',
    archivePath: 'germany/de-01', phaseCounts: { before: 8, during: 46, after: 55, composite: 3 }, photoCount: 112, promoted: true,
  },
  {
    id: 'DE-03', slug: 'luxury-interior-bathroom-flooring', name: 'Luxury Interior / Bathroom / Flooring', country: 'Germany', countrySlug: 'germany',
    location: 'Germany', type: 'Interior renovation', category: 'Interior + Bath',
    description: 'A detailed interior transformation spanning architectural finishes, custom bathrooms, flooring, lighting, and refined final spaces.',
    heroImage: '/projects/germany/de-03/selected/DE-03_Luxury_Interior_Bathroom_and_Flooring__photo-166.webp',
    secondaryImage: '/projects/germany/de-03/selected/DE-03_Luxury_Interior_Bathroom_and_Flooring__photo-172.webp',
    heroAlt: 'Completed luxury interior with polished flooring and architectural lighting', detailPath: '/projects/germany/luxury-interior-bathroom-flooring',
    archivePath: 'germany/de-03', phaseCounts: { before: 7, during: 22, after: 24 }, photoCount: 53, promoted: true,
  },
  {
    id: 'DE-02', slug: 'bungalow-driveway-front-yard', name: 'Bungalow Driveway & Front Yard', country: 'Germany', countrySlug: 'germany',
    location: 'Germany', type: 'Exterior renovation', category: 'Driveway + Front Yard',
    description: 'An exterior renovation tracing the property from its original approach through groundwork, hardscape construction, and the completed frontage.',
    heroImage: '/projects/germany/de-02/selected/DE-02_Bungalow_Driveway_and_Front_Yard__photo-135.webp',
    secondaryImage: '/projects/germany/de-02/selected/DE-02_Bungalow_Driveway_and_Front_Yard__photo-140.webp',
    heroAlt: 'Completed bungalow driveway and front yard renovation in Germany', detailPath: '/projects/germany/bungalow-driveway-front-yard',
    archivePath: 'germany/de-02', phaseCounts: { before: 5, during: 13, after: 7 }, photoCount: 25, promoted: true,
  },
  {
    id: 'DXB-01', slug: 'kam-vintage-car-showroom', name: 'KAM Vintage Car Showroom', country: 'Dubai', countrySlug: 'dubai',
    location: 'Dubai, UAE', type: 'Commercial renovation', category: 'Automotive Showroom',
    description: 'A commercial showroom transformation documented across the original space, intensive construction, specialist fit-out, and completed automotive environment.',
    heroImage: '/projects/dubai/dxb-01/selected/DXB-01_KAM_Car_Vintage_Showroom__photo-255.webp',
    secondaryImage: '/projects/dubai/dxb-01/selected/DXB-01_KAM_Car_Vintage_Showroom__photo-250.webp',
    heroAlt: 'Completed KAM vintage car showroom exterior in Dubai', detailPath: '/projects/dubai/kam-vintage-car-showroom',
    archivePath: 'dubai/dxb-01', phaseCounts: { before: 6, during: 31, after: 26 }, photoCount: 63, promoted: true,
  },
  {
    id: 'CA-01', slug: 'residential-remodeling-showcase', name: 'Residential Remodeling Showcase', country: 'California', countrySlug: 'california',
    location: 'California, USA', type: 'Residential remodeling', category: 'Outdoor Living',
    description: 'Residential remodeling archive pending final project verification.',
    heroImage: '/projects/california/ca-01/selected/CA-01_Residential_Remodeling_Showcase_NEEDS_VERIFICATION__photo-268.webp',
    secondaryImage: '/projects/california/ca-01/selected/CA-01_Residential_Remodeling_Showcase_NEEDS_VERIFICATION__photo-269.webp',
    heroAlt: 'California residential outdoor living remodel', detailPath: '/projects/california/residential-remodeling-showcase',
    archivePath: 'california/ca-01', phaseCounts: { before: 0, during: 0, after: 0, composite: 3 }, photoCount: 14,
    needsVerification: true, promoted: false,
  },
];

export const promotedProjects = projects.filter((project) => project.promoted && !project.needsVerification);

export function findProject(country: string, slug: string) {
  return projects.find((project) => project.countrySlug === country && project.slug === slug);
}
