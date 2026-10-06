# Content Plan

## Site structure

1. Hero — cinematic scroll-driven introduction and completed-home reveal
2. Header — brand identity and primary navigation
3. Projects — large editorial introductions to verified work, linking to complete project archives
4. Services — building, remodeling, commercial, residential, and outdoor living capabilities
5. Why RIGI — credentials, process, craftsmanship, and client value
6. Before & After — visual transformations and project outcomes
7. About — company story, team, and Orange County presence
8. Contact — consultation prompt and project inquiry
9. Footer — company details, licensing, navigation, and contact information

## Project organization

- California — `public/projects/california`
- Dubai — `public/projects/dubai`
- Germany — `public/projects/germany`

Project content should prioritize strong finished photography, concise context, and clear location labeling.

## Portfolio system

- The homepage portfolio is the visual entrance to four verified projects across Germany and Dubai.
- Each verified project has a dedicated route under `/projects/[country]/[slug]`.
- Project pages expose the complete available process archive in Before, During, After, and Before & After phases.
- Phase galleries are generated from the organized folders under `public/projects` so newly added legitimate phase photography can be included without duplicating homepage data.
- California project CA-01 remains in the data model with `needsVerification: true` and is not publicly promoted or routed until confirmed.
