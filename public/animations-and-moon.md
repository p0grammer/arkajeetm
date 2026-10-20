# Animation and Moon Scene

This document describes the portfolio's current motion system and interactive Moon scene. It is served from the site's public root, so it is available at [`/animations-and-moon.md`](https://arkajeetm.vercel.app/animations-and-moon.md) after deployment.

## Motion architecture

The site separates motion by responsibility:

- **GSAP + ScrollTrigger** in `src/App.tsx` controls the page's scroll-linked choreography. It is initialized in `HomePage`'s `useLayoutEffect`, scoped to the page root with `gsap.context`, and reverted during cleanup.
- **Framer Motion** handles local interface feedback such as nav and CTA entrance, hover, and press states. The shared spring uses stiffness `500` and damping `30`.
- **React Three Fiber** runs the Moon's continuous float, idle spin, scroll-speed spin boost, and pointer drag in `src/components/HeroScene.tsx`.

### Scroll choreography

As visitors move through the page, ScrollTrigger animates:

- The hero scroll cue into view and the Moon canvas with a small parallax, rotation, and scale change.
- The identity heading and section labels through 3D translation and rotation, scrubbed to scroll position.
- Intro copy and stats with staggered upward entrances.
- Practice heading, cards, and detail rows with perspective movement, rotation, and stagger.
- The manifesto with slow vertical and glow parallax, followed by the timeline connectors drawing across the page.
- Contact heading, actions, and footer elements with staggered 3D entrances.

The GSAP timeline setup is skipped when `prefers-reduced-motion: reduce` is active. The continuous R3F Moon float and spin are currently separate from that check.

## Moon model

The Moon is a Three.js sphere mesh, rather than the full source GLB model. This keeps runtime rendering focused on the textured sphere while retaining the supplied Moon surface map.

- **Geometry:** sphere radius `1.05`, with `128 × 128` segments for a smooth silhouette.
- **Texture:** `src/moon_textures/nasa_moon_albedo.jpg`, loaded with `useTexture`; the texture is marked sRGB and uses anisotropy `8`.
- **Material:** standard, non-metallic, fully rough surface (`metalness: 0`, `roughness: 1`).
- **Lighting:** warm key light from the upper left, a low ambient fill, and a subtle cool fill light.
- **Float:** Drei `Float` uses speed `0.7`, rotation intensity `0.12`, and float intensity `0.25`.
- **Attribution:** NASA CGI Moon Kit by Thomas Flynn, licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). The source is credited on the site's Terms page.

## Moon controls

- The Moon rotates at an idle rate of `0.075` radians per second.
- Downward scroll velocity adds a temporary spin boost, capped at `0.32` radians per second and eased with damping. The boost returns to zero shortly after scrolling stops.
- Pointer dragging rotates the sphere horizontally and vertically. Vertical rotation is clamped to avoid flipping it over.
- The canvas uses `touch-action: pan-y`, allowing normal vertical page scrolling on phones while pointer/touch drags manipulate the Moon.
- The scene displays a loading label while the Moon texture is pending and includes a Canvas fallback message when the 3D renderer cannot be created.

## Editing guide

- Adjust page scroll motion in the `HomePage` GSAP context in `src/App.tsx`.
- Adjust Moon geometry, texture, material, lighting, and controls in `src/components/HeroScene.tsx`.
- Adjust pointer cursor and mobile touch behavior in the `.hero-canvas canvas` rules in `src/styles.css`.
- Keep this file in `public/` so the deployed site continues to serve it as a public Markdown document.
