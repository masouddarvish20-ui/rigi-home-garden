# Design Rules

The RIGI website should feel like a premium California architecture and construction brand.

## Visual direction

- Cinematic, minimal, modern, and luxurious
- Image-driven layouts with architectural photography as the primary visual language
- Dark and warm neutral palette with restrained gold brand accents
- Generous spacing, precise typography, and calm transitions
- Clear hierarchy with concise copy and confident calls to action
- Motion should feel polished and intentional, never distracting

## Typography and motion system

- Manrope is the primary display and body family, loaded through `next/font`; Georgia is reserved only for the small RIGI wordmark treatment on project pages.
- Major headings use controlled word-level perspective reveals. Body copy remains calm and readable.
- Eyebrows may use a short animated gold rule; gold accents remain sparse.
- Images use restrained masks, scale, and depth movement. Architecture must never tilt or feel unstable.
- The custom cursor is limited to precise desktop pointers and uses VIEW, OPEN, DRAG, LINK, and START states.
- Magnetic movement is limited to primary CTAs and project exploration links, with a maximum displacement of approximately 4–8px.
- Touch and reduced-motion contexts disable cursor, magnetic, pointer-depth, and strong perspective effects.

## Guardrails

- Avoid a generic corporate-template appearance
- Avoid clutter, excessive decoration, and unnecessary interface elements
- Preserve realistic architecture, materials, lighting, and proportions
- Keep visual effects subtle enough to support the project imagery
- Maintain consistency across desktop and responsive layouts
