import 'server-only';

import { readdirSync } from 'node:fs';
import path from 'node:path';
import type { Project } from '@/data/projects';

export type GalleryPhase = {
  key: 'before' | 'during' | 'after' | 'before-after';
  label: string;
  description: string;
  images: string[];
};

const phaseDetails: Record<GalleryPhase['key'], { label: string; description: string }> = {
  before: { label: 'Before', description: 'The existing condition and the starting point for the work.' },
  during: { label: 'During', description: 'Construction, craft, coordination, and the transformation in progress.' },
  after: { label: 'After', description: 'The completed spaces, architectural details, and final result.' },
  'before-after': { label: 'Before & After', description: 'Direct visual comparisons of the transformation.' },
};

function readPhase(project: Project, phase: GalleryPhase['key']) {
  const folder = path.join(process.cwd(), 'public', 'projects', project.archivePath, phase);
  try {
    return readdirSync(folder, { withFileTypes: true })
      .filter((entry) => entry.isFile() && /\.(jpe?g|png|webp)$/i.test(entry.name))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((name) => `/projects/${project.archivePath}/${phase}/${name}`);
  } catch {
    return [];
  }
}

export function getProjectGallery(project: Project): GalleryPhase[] {
  return (['before', 'during', 'after', 'before-after'] as const)
    .map((key) => ({ key, ...phaseDetails[key], images: readPhase(project, key) }))
    .filter((phase) => phase.images.length > 0);
}
