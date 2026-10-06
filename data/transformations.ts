export type TransformationPair = {
  id: string;
  projectId: 'DE-01' | 'DE-03';
  title: string;
  location: string;
  category: string;
  context: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  detailPath: string;
  aligned: boolean;
  rotateAfter?: boolean;
};

export const featuredTransformation: TransformationPair = {
  id: 'blue-feature-bathroom',
  projectId: 'DE-03',
  title: 'Blue Feature Bathroom',
  location: 'Germany',
  category: 'Interior Renovation',
  context: 'The same feature wall, documented during precision installation and after the completed bathroom fit-out.',
  before: '/projects/germany/de-03/before-after/BA-DE03-02_Blue_Feature_Bathroom/before.webp',
  after: '/projects/germany/de-03/before-after/BA-DE03-02_Blue_Feature_Bathroom/after.webp',
  beforeAlt: 'Blue stone feature wall during bathroom tile installation',
  afterAlt: 'Completed bathroom with blue stone feature wall and shower fixtures',
  detailPath: '/projects/germany/luxury-interior-bathroom-flooring',
  aligned: true,
  rotateAfter: true,
};

export const supportingTransformations: TransformationPair[] = [
  {
    id: 'whole-house-facade',
    projectId: 'DE-01',
    title: 'Whole House Exterior',
    location: 'Germany',
    category: 'Whole Home Renovation',
    context: 'Construction condition and completed street elevation, shown as separate documentary viewpoints.',
    before: '/projects/germany/de-01/before-after/BA-DE01-01_Facade/before.webp',
    after: '/projects/germany/de-01/before-after/BA-DE01-01_Facade/after.webp',
    beforeAlt: 'House exterior during façade reconstruction',
    afterAlt: 'Completed modern black and white house exterior',
    detailPath: '/projects/germany/whole-house-garden-renovation',
    aligned: false,
  },
  {
    id: 'back-garden',
    projectId: 'DE-01',
    title: 'Back Garden & Terrace',
    location: 'Germany',
    category: 'Landscape + Outdoor Living',
    context: 'A cleared construction site transformed into a composed terrace, lawn, and outdoor gathering space.',
    before: '/projects/germany/de-01/before-after/BA-DE01-02_Back_Garden/before.webp',
    after: '/projects/germany/de-01/before-after/BA-DE01-02_Back_Garden/after.webp',
    beforeAlt: 'Back garden during demolition and site preparation',
    afterAlt: 'Completed back garden with terrace, lawn, and outdoor dining',
    detailPath: '/projects/germany/whole-house-garden-renovation',
    aligned: false,
  },
  {
    id: 'garage-floor',
    projectId: 'DE-03',
    title: 'Garage Floor Finish',
    location: 'Germany',
    category: 'Specialty Flooring',
    context: 'The original concrete surface and completed high-build finish, retained as the project’s supplied documentation.',
    before: '/projects/germany/de-03/before-after/BA-DE03-01_Garage_Floor/before.webp',
    after: '/projects/germany/de-03/before-after/BA-DE03-01_Garage_Floor/after.webp',
    beforeAlt: 'Supplied garage floor comparison documenting the original concrete and new coating',
    afterAlt: 'Completed reflective garage floor coating',
    detailPath: '/projects/germany/luxury-interior-bathroom-flooring',
    aligned: false,
  },
];
