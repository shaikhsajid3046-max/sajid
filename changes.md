# Changelog

All modifications to the Sajid Shaikh portfolio site are recorded here.

---

## [2026-07-16] Round 8: ScrollTrigger Custom pinSpacer Optimization

### Summary
Fixed the client-side routing crash (`NotFoundError: Failed to execute 'removeChild' on 'Node'`) on navigation away from pinned elements by configuring a custom static `pinSpacer` element, avoiding dynamic wrapping.

---

### Files Modified

| # | File | Change Type | Description |
|---|------|-------------|-------------|
| 1 | `components/sections/SelectedWork.tsx` | MODIFIED | Implemented `spacerRef` and set `pinSpacer: spacerRef.current` inside the ScrollTrigger config, instructing GSAP to use the existing static container instead of wrapping elements dynamically. |

---

## [2026-07-16] Round 7: SplitText Child Extraction & Hydration Polish

### Summary
Resolved a client-side navigation exception caused by React attempting to track mutated child nodes in `SplitText` when `children` is an array or nested react nodes.

---

### Files Modified

| # | File | Change Type | Description |
|---|------|-------------|-------------|
| 1 | `components/ui/SplitText.tsx` | MODIFIED | Implemented a recursive `getTextFromChildren` helper to extract plain strings from any React children setup, and changed the rendering behavior to always write via `dangerouslySetInnerHTML`. This stops React from tracking DOM nodes, eliminating unmount crashes during routing. |

---

## [2026-07-16] Round 6: Pinning Route Transition Crash & WebGL Leaks

### Summary
Fixed a critical routing error (`NotFoundError: Failed to execute 'removeChild' on 'Node'`) during unmounts of pinned elements, and resolved asynchronous mount/unmount memory leaks in the Three.js Canvas.

---

### Files Modified

| # | File | Change Type | Description |
|---|------|-------------|-------------|
| 1 | `components/sections/SelectedWork.tsx` | MODIFIED | Wrapped the pinned `<section>` in a static `selected-work-wrapper` div container so React can cleanly remove the wrapper without crashing over DOM elements relocated inside the ScrollTrigger pin-spacer wrapper. |
| 2 | `components/ui/WebGLHero.tsx` | MODIFIED | Tracked an `isUnmounted` flag in the async Three.js load thread to cancel WebGL instantiation if the route changes before dependencies load, preventing memory leaks and DOM conflicts. |

---

## [2026-07-16] Round 5: Tool Logos & Tooltips

### Summary
Replaced text-based tool pills on project details pages with high-fidelity vector logos (SVGs) and premium, centered hover tooltips.

---

### Files Modified

| # | File | Change Type | Description |
|---|------|-------------|-------------|
| 1 | `app/work/[slug]/page.tsx` | MODIFIED | Added a `ToolLogo` helper component rendering custom SVGs for Adobe CC suite, Figma, Framer, Blender, Cinema 4D, DaVinci Resolve, Maze, Glyphs, and Capture One. Replaced textual labels inside the Tools section with logo cards and animated hover tooltips. |

---

## [2026-07-16] Round 4: DOM Hydration / SplitText Bugfix

### Summary
Fixed a critical runtime error (`NotFoundError: Failed to execute 'removeChild' on 'Node'`) that occurred during page transitions.

---

### Files Modified

| # | File | Change Type | Description |
|---|------|-------------|-------------|
| 1 | `components/ui/SplitText.tsx` | MODIFIED | Rendered string-based children using `dangerouslySetInnerHTML` to stop React from tracking dynamic text nodes mutated by GSAP/DOM split effects |

---

## [2026-07-16] Round 3: Responsiveness Upgrades

### Summary
Optimized the visual structure, layout styling, and interaction design of components across mobile and narrow screens to ensure perfect responsiveness.

---

### Files Modified

| # | File | Change Type | Description |
|---|------|-------------|-------------|
| 1 | `styles/globals.css` | MODIFIED | Added responsive clamp-based typography and spacing, touch-target optimizations, image height fixes, and overflow safety controls |
| 2 | `components/layout/Navbar.tsx` | MODIFIED | Re-architected mobile hamburger button to use centered flex layout with explicit 44x44px clickable space and hover backdrops |
| 3 | `components/layout/MenuOverlay.tsx` | MODIFIED | Updated mobile close button structure to align elements cleanly with visual hover feedback |
| 4 | `components/sections/FooterCTA.tsx` | MODIFIED | Applied break-all class to prevent text spillover on small screens |
| 5 | `components/layout/Footer.tsx` | MODIFIED | Re-styled footer social links to support flex-wrapping, preventing overflow on narrow mobile views |
| 6 | `app/work/[slug]/page.tsx` | MODIFIED | Redesigned next project link container to support flex-wrap on narrow screens |
| 7 | `app/contact/page.tsx` | MODIFIED | Added break-all class to email link and flex-wrap spacing to socials to prevent mobile overlap |
| 8 | `components/project/ProjectGrid.tsx` | MODIFIED | Added no-scrollbar helper to the mobile horizontal filter bar to hide default browser scroll bars |

---

## [2026-07-16] Round 2: Remove About, Add Tools, Social Icons, Name/Email Update

### Summary
Removed the About page, added the SelectedWork section to the Work page, added a Tools & Software section to project detail pages, updated name spelling from Sheikh to Shaikh globally, changed email to shaikhsajid3046@gmail.com, and redesigned the footer with full social links and SVG icons.

---

### Files Modified

| # | File | Change Type | Description |
|---|------|-------------|-------------|
| 1 | `app/about/page.tsx` | DELETED | About page removed entirely |
| 2 | `app/layout.tsx` | MODIFIED | Updated all name references from Sheikh to Shaikh, updated domain |
| 3 | `types/project.ts` | MODIFIED | Added optional `tools` string array to Project interface |
| 4 | `lib/data/mockData.ts` | MODIFIED | Updated email, added tools to all mock projects, removed em-dashes from titles and overviews |
| 5 | `lib/sanity/queries.ts` | MODIFIED | Added `tools` field to all GROQ project queries |
| 6 | `components/layout/Navbar.tsx` | MODIFIED | Removed About link, updated logo text to "Sajid Shaikh", improved active route matching |
| 7 | `components/layout/MenuOverlay.tsx` | MODIFIED | Removed About from nav links array |
| 8 | `components/layout/Footer.tsx` | MODIFIED | Full social names with SVG icons (Instagram, Behance, LinkedIn, Mail), updated name and email |
| 9 | `components/sections/Preloader.tsx` | MODIFIED | Updated name from SAJID SHEIKH to SAJID SHAIKH |
| 10 | `app/work/page.tsx` | MODIFIED | Added SelectedWork horizontal scroll section above the project grid |
| 11 | `app/work/[slug]/page.tsx` | MODIFIED | Added Tools & Software section with pill tags, replaced em-dashes with slashes and colons, replaced arrow text with SVG icon |
| 12 | `app/contact/page.tsx` | MODIFIED | Updated name and fallback email |

---

## [2026-07-16] Round 1: Works Page Enhancement and Visual Polish

### Summary
Added a premium "Works" page with animated header, improved project grid, better project cards, navigation fixes, and new CSS utilities. All changes follow a no-emoji, no-em-dash, icons-only approach.

---

### Files Modified

| # | File | Change Type | Description |
|---|------|-------------|-------------|
| 1 | `styles/animations.css` | MODIFIED | Added filter underline, arrow slide, stagger fade, and gradient divider animation classes |
| 2 | `styles/globals.css` | MODIFIED | Added dot-icon indicator, project-count badge, and arrow-icon utility styles |
| 3 | `components/sections/WorkPageHeader.tsx` | NEW | Premium animated header for the Works page with GSAP stagger reveal and project count |
| 4 | `app/work/page.tsx` | MODIFIED | Redesigned with WorkPageHeader, gradient divider, and improved layout structure |
| 5 | `components/project/ProjectGrid.tsx` | MODIFIED | Redesigned filter bar with accent underline, per-discipline counts, and smoother transitions |
| 6 | `components/project/ProjectCard.tsx` | MODIFIED | Made titles always visible, added hover arrow icon, added client name display |
| 7 | `components/layout/Navbar.tsx` | MODIFIED | Fixed CTA link to /contact, added active route indicator dot |
| 8 | `components/layout/MenuOverlay.tsx` | MODIFIED | Updated to accept social URL props instead of hardcoded href="#" |
| 9 | `changes.md` | NEW | This changelog file |

---

### Design Decisions

- **Icons over emojis**: All visual indicators use inline SVG elements or CSS-generated shapes (dots, arrows, lines). No emoji characters are used anywhere.
- **No em-dashes**: All separators use vertical bars (|), slashes (/), colons (:), dots, or visual spacing instead of em-dash characters.
- **Accent color consistency**: All interactive indicators (active filter, hover arrows, count badges, tool tags) use the existing `--accent` (#BFA46D) color token.
- **Animation restraint**: All new animations respect `prefers-reduced-motion` via the existing global media query in globals.css.
- **Social icons**: Footer uses inline SVG icons for Instagram, Behance, LinkedIn, and Mail instead of abbreviated text labels.
