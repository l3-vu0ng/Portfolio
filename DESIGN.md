# Design System: Vo Le Vuong — Liquid Glass Portfolio

## 1. Visual Theme & Atmosphere

An **immersive, cinematic dark-tech portfolio** fused with Apple's Liquid Glass design language. The atmosphere is "a holographic command deck floating in deep space" — layers of translucent crystal-blue glass panels drift over an ultra-deep void background, refracting light as the user moves their cursor. Every interaction feels physical — glass panels tilt, particles scatter, elements orbit the hero like digital constellations.

**Density: Cinematic Airy (3/10)** — massive breathing room between sections, letting the Liquid Glass effects and particle systems dominate visual attention.

**Variance: Artsy Asymmetric (8/10)** — bold split-screen hero, staggered grids, orbital particle layouts that break conventional grid expectations.

**Motion: Cinematic Choreography (9/10)** — GSAP ScrollTrigger-powered scroll animations, cursor-following particle constellation, spring-physics card interactions, perpetual floating glass orbs, parallax depth layers, typewriter hero text reveal, and staggered cascade reveals on every section entry.

The overall impression: a portfolio that feels like walking through a sci-fi interface from a Spielberg film — but refined, professional, and grounded in real engineering substance.

## 2. Color Palette & Roles

### Dark Mode Foundation
- **Abyss** (#06080D) — Primary background, the deepest void layer. Near-black with a blue undertone
- **Obsidian Surface** (#0D1117) — Card backgrounds, section containers, elevated panels
- **Slate Glass** (#161B22) — Hover states, active panels, secondary elevated surfaces
- **Frosted Edge** (rgba(91, 156, 246, 0.08)) — Liquid Glass panel backgrounds, ultra-subtle tinted containers
- **Glass Border** (rgba(91, 156, 246, 0.15)) — Structural borders for glass panels, 1px dividers
- **Glass Border Bright** (rgba(91, 156, 246, 0.30)) — Hover border state, active glass panel edges

### Text Hierarchy
- **Pure White** (#F0F6FC) — Primary headlines, H1/H2, hero name, maximum contrast
- **Cool Silver** (#B0BAC6) — Body text, descriptions, paragraph content
- **Slate Mist** (#6E7681) — Metadata, timestamps, tertiary labels, placeholders

### Accent System (Single Accent — Crystal Azure)
- **Crystal Azure** (#5B9CF6) — Primary CTA fills, active nav indicators, focus rings, accent highlights. Saturation ~68%, luminous but never neon
- **Azure Glow** (rgba(91, 156, 246, 0.20)) — Hover backgrounds, tag fills, subtle highlight zones, glass panel tints
- **Azure Mist** (rgba(91, 156, 246, 0.10)) — Section background tints, particle trail colors, glass ambient glow
- **Azure Frost** (rgba(91, 156, 246, 0.05)) — Ultra-subtle glass panel fills, background depth layers

### Liquid Glass Material Colors
- **Glass Panel Light** (rgba(255, 255, 255, 0.04)) — Base glass panel fill
- **Glass Panel Medium** (rgba(255, 255, 255, 0.07)) — Elevated glass containers
- **Glass Highlight** (rgba(255, 255, 255, 0.12)) — Glass edge highlights, top-border shine effect
- **Glass Refraction** (rgba(91, 156, 246, 0.06)) — Blue-tinted refraction layer inside glass panels

### Semantic Colors
- **Success Emerald** (#3FB950) — Form success states, positive indicators
- **Error Coral** (#F85149) — Form errors, validation warnings

### Banned
- Pure black (#000000) — never. Use Abyss (#06080D)
- Any purple/violet (#7C3AED, #8B5CF6) — never
- Neon cyan/electric blue (#00FFFF, #00BFFF) — never. Crystal Azure is luminous but NOT neon
- Oversaturated colors above 80% saturation — never
- Any amber/yellow/orange accent — replaced entirely by Crystal Azure blue

## 3. Typography Rules

### Font Stack
- **Display / Headlines:** `Outfit` — Variable weight (300–800). Track-tight (`letter-spacing: -0.03em` for hero, `-0.02em` for H1). Weight-driven hierarchy: Hero at 800, H1 at 700, H2 at 600, H3 at 500. Used for hero name, section titles.
- **Body / UI:** `Sora` — Modern geometric sans-serif with optical precision. Regular 400 for body, Medium 500 for labels and nav items. Line-height 1.7 for body paragraphs. Max-width 65ch for readability. Sora's geometric clarity pairs perfectly with Liquid Glass aesthetics.
- **Monospace / Code:** `JetBrains Mono` — For tech tags, skill labels, code snippets, metadata, dates. Weight 400. Used inside tag pills and project tech stacks.

### Scale (Desktop to Mobile via clamp())
| Level | Size | Weight | Tracking | Usage |
|-------|------|--------|----------|-------|
| Hero Name | clamp(3rem, 6vw, 5.5rem) | 800 | -0.03em | Name in hero — BIGGER than before |
| H1 | clamp(2rem, 4vw, 3.5rem) | 700 | -0.02em | Section titles |
| H2 | clamp(1.5rem, 3vw, 2rem) | 600 | -0.01em | Sub-section headers |
| H3 | clamp(1.125rem, 2vw, 1.5rem) | 500 | 0 | Card titles |
| Body | 1rem (16px) | 400 | 0 | Paragraph text |
| Small | 0.875rem (14px) | 400 | 0.01em | Metadata, captions |
| Mono Tag | 0.8125rem (13px) | 400 | 0.02em | Tech tags, code |

### Banned Fonts
- `Inter` — generic, overused
- `Satoshi` — replaced by Sora for this design
- `Times New Roman`, `Georgia`, `Garamond`, `Palatino` — generic serifs
- System font stack as primary — only as fallback

## 4. Liquid Glass Material System

### Glass Panel Definition
Every "glass" surface in this design follows Apple's Liquid Glass principles:
```
.liquid-glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(24px) saturate(1.2);
  -webkit-backdrop-filter: blur(24px) saturate(1.2);
  border: 1px solid rgba(91, 156, 246, 0.15);
  border-radius: 24px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),    /* top-edge glass shine */
    0 8px 32px rgba(0, 0, 0, 0.4),                /* depth shadow */
    0 0 80px rgba(91, 156, 246, 0.04);             /* ambient azure glow */
}
```

### Glass Variations
- **Nav Glass:** backdrop-filter: blur(20px), background: rgba(6, 8, 13, 0.75), border-bottom: 1px Glass Border. Fixed top, z-index 1000.
- **Card Glass:** backdrop-filter: blur(16px), background: Glass Panel Medium, border: 1px Glass Border. On hover: border brightens to Glass Border Bright, translateY(-6px), shadow deepens with Azure Mist ambient.
- **Hero Glass Orbs:** backdrop-filter: blur(40px), background: Azure Frost, border: 1px Glass Highlight, border-radius: 50%. Floating, rotating, parallax-reactive.
- **Form Glass:** backdrop-filter: blur(12px), background: Glass Panel Light, border: 1px Glass Border. Focus: Crystal Azure border with 4px Azure Glow ring.

### Refraction Effect
Glass panels have a subtle top-edge highlight (inset box-shadow) that simulates light refraction — creating the illusion that light bends as it passes through the glass surface. This is the signature Apple Liquid Glass detail.

## 5. Component Stylings

### Navigation Bar (Liquid Glass Nav)
- Fixed top, liquid-glass material with blur(20px), background: rgba(6,8,13,0.75)
- Height: 72px desktop, 64px mobile
- Logo/name "VLV" on the left in `Outfit` weight 700, Crystal Azure color
- Nav links in `Sora` weight 500, Cool Silver color
- Active link: Pure White color with a 2px Crystal Azure bottom indicator line + soft pulse animation
- Hover: color transitions to Pure White over 200ms ease
- Mobile: hamburger menu with slide-in liquid glass panel from right, full-height overlay
- Scroll behavior: nav becomes more opaque (0.90) when user scrolls past hero

### Buttons
- **Primary CTA:** Crystal Azure fill, Abyss text, weight 600. Border-radius: 14px. Padding: 16px 32px. Liquid Glass inset shine on top edge. On hover: brightness(1.15) + translateY(-2px) + Azure Glow box-shadow. On active: translateY(0) — tactile push. No neon outer glow.
- **Secondary/Ghost:** Transparent fill, 1px Glass Border, Pure White text. On hover: Glass Panel Medium background fill + border brightens to Glass Border Bright. Liquid Glass backdrop-filter: blur(8px).
- **Icon Button:** 48px x 48px minimum. Liquid Glass circle with icon centered.

### Cards (Project Cards — Liquid Glass)
- Background: Glass Panel Medium with backdrop-filter: blur(16px)
- Border: 1px Glass Border
- Border-radius: 24px (generous, glass-like)
- Padding: 28px
- Shadow: 0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 Glass Highlight
- Hover state: border brightens to Glass Border Bright, translateY(-6px) with spring-physics timing (cubic-bezier(0.34, 1.56, 0.64, 1)), shadow expands with Azure Mist ambient glow
- Image area: top of card, border-radius: 16px, aspect-ratio 16/9, object-fit: cover, with Obsidian Surface placeholder
- Tech tags: inline pills — Azure Glow background, Crystal Azure text, JetBrains Mono 13px, border-radius: 8px, padding: 5px 12px
- GitHub link: ghost liquid glass button at card bottom with GitHub icon + "View Source"

### Skill Tags / Badges
- Background: Azure Glow (rgba(91,156,246,0.20))
- Text: Crystal Azure, JetBrains Mono, 13px
- Border: 1px rgba(91,156,246,0.25)
- Border-radius: 10px
- Padding: 6px 16px
- Hover: background intensifies to rgba(91,156,246,0.30), shimmer sweep animation 800ms

### Form Inputs (Contact Section — Liquid Glass)
- Background: Glass Panel Light with backdrop-filter: blur(12px)
- Border: 1px Glass Border, transitions to Crystal Azure on focus
- Border-radius: 14px
- Padding: 16px 18px
- Label: above input, Sora weight 500, Cool Silver color, 14px
- Placeholder: Slate Mist color
- Focus: Crystal Azure border + 0 0 0 4px Azure Glow ring + backdrop-filter intensifies to blur(20px)
- Error: Error Coral border + error text below in Error Coral, 14px
- Textarea: same styling, min-height: 160px, resize: vertical

### Timeline (Experience Section)
- Vertical line: 2px wide, Glass Border color, left-aligned
- Timeline nodes: 14px diameter circle, Crystal Azure fill with Azure Glow box-shadow (0 0 12px), centered on the line
- Content cards: liquid glass panels branching right with 32px left margin
- Date labels: JetBrains Mono, Slate Mist, 13px

## 6. Layout Principles

### Grid Architecture
- Max container width: 1200px, centered with auto margins
- Section horizontal padding: clamp(1.5rem, 5vw, 4rem)
- Section vertical spacing: clamp(5rem, 12vw, 10rem) — BIGGER gaps for cinematic breathing
- CSS Grid for all multi-column layouts

### Hero Section (SHOWSTOPPER — Maximum Impact)
- Full viewport height: min-height: 100dvh
- Split-screen asymmetric: 55% text / 45% image on desktop
- **Particle Constellation Background:** Canvas-based particle system with 60-80 floating dots connected by thin lines. Particles follow cursor with elastic physics (cursor acts as gravity attractor). Particles are Crystal Azure at low opacity (0.2-0.4), connection lines at Azure Mist opacity. Performance: requestAnimationFrame, canvas element behind content.
- **Floating Glass Orbs:** 4-6 liquid glass circles (sizes 40px-120px) floating with perpetual orbit animations at different speeds. Each orb has backdrop-filter: blur(40px), Azure Frost fill, Glass Highlight border. Orbs respond to cursor proximity with subtle repel/attract physics.
- **Text Block (left 55%):** vertically centered
  - Small uppercase label: "SOFTWARE ENGINEER" in Sora 500, Crystal Azure, letter-spacing: 0.15em, 14px
  - Name: "VO LE VUONG" in Outfit 800, Pure White, hero scale (clamp(3rem,6vw,5.5rem)). Entrance: typewriter character reveal with cursor blink, 80ms per character
  - Slogan: "Work hard, Play hard!" in Sora 400, Cool Silver, 1.25rem. Entrance: fade in after name completes (400ms delay)
  - CTAs: Primary "View My Projects" (Crystal Azure fill, liquid glass shine) + Ghost "Contact Me" (glass border). Entrance: slide up from 30px with 600ms delay after slogan
- **Photo Block (right 45%):** Profile photo with border-radius: 28px, inside a liquid glass frame (larger glass panel with 4px padding). Subtle perpetual float animation (translateY 0 to -10px, 5s). Photo has a soft Azure ambient glow behind it (box-shadow: 0 0 100px rgba(91,156,246,0.15)). Entrance: scale from 0.9 to 1.0, opacity fade, 800ms.
- NO centered layout. NO overlapping text on image. NO "scroll to explore."

### About Section
- Two-column asymmetric: 40% glass accent panel / 60% text content
- Left panel: Liquid Glass panel with large decorative "< />" code symbol in Crystal Azure at 15% opacity
- Text content: bio paragraph + GPA highlight in a small Azure Glow badge with JetBrains Mono
- Scroll entrance: left panel slides in from left, text fades in from right with 200ms stagger

### Skills Section
- Grouped by category (Languages, Databases, Knowledge, Tools)
- Each group: H3 title + horizontally wrapped liquid glass tag pills
- Layout: 2-column grid on desktop, single column on mobile
- NO progress bars, NO percentage circles — just clean glass tag pills
- Scroll entrance: categories cascade in with 150ms stagger, tags within each category stagger with 60ms delay

### Projects Section
- 2-column grid on desktop (NOT 3-column)
- First project card spans full width as featured
- Each card is a Liquid Glass panel
- Scroll entrance: cards reveal with translateY(40px) to 0, opacity fade, 200ms cascade between cards. Cards tilt slightly toward cursor on hover (3D perspective transform).

### Experience Section
- Vertical timeline with liquid glass cards
- Timeline line draws itself on scroll (stroke-dashoffset animation)
- Each entry reveals as user scrolls past its position
- Nodes pulse with Crystal Azure glow when they enter viewport

### Contact Section
- Split: 40% social links liquid glass panel / 60% contact form liquid glass panel
- Social links: large liquid glass circle buttons (GitHub, LinkedIn, Facebook) with icon + label
- Form: Liquid Glass inputs stacked vertically
- Scroll entrance: panels slide in from opposite sides and converge

### Footer
- Minimal: centered text, Slate Mist color, Sora 14px
- "Built with passion by Vo Le Vuong" + copyright 2026
- Top border: 1px Glass Border
- Subtle particle constellation continues in footer background

### Responsive Breakpoints
- Desktop: >= 1024px — full grid layouts, particle system active, glass orbs visible
- Tablet: 768px – 1023px — reduced columns, simplified particles (30 dots), smaller orbs
- Mobile: < 768px — single column, particle system disabled (performance), glass orbs hidden, cursor effects disabled
- All multi-column layouts collapse to single column below 768px
- No horizontal scroll on any viewport — critical failure
- All interactive elements: minimum 44px touch target
- Cursor-following effects: hidden on touch devices (no pointer: coarse)

## 7. Motion & Interaction — CINEMATIC LEVEL

### Hero Entrance Choreography (Sequential, Not Simultaneous)
1. **T+0ms:** Background particle constellation fades in (opacity 0 to 0.6, 1200ms)
2. **T+300ms:** Glass orbs drift in from edges with spring physics (1000ms)
3. **T+500ms:** Typewriter effect starts on "VO LE VUONG" (80ms per character, ~880ms total)
4. **T+600ms:** "SOFTWARE ENGINEER" label fades in (400ms)
5. **T+1400ms:** Slogan "Work hard, Play hard!" fades in (400ms)
6. **T+1800ms:** CTA buttons slide up from 30px (600ms, spring easing)
7. **T+1000ms:** Photo scales in from 0.9 with opacity fade (800ms, spring easing)
8. **T+2400ms:** Nav bar slides down from -72px (400ms)

### Cursor-Following Systems (Desktop Only)
- **Particle Gravity:** Cursor position acts as a gravity well. Particles within 200px radius gently drift toward cursor with elastic spring physics (stiffness: 80, damping: 15). On mouse leave, particles slowly return to original orbits.
- **Glass Orb Parallax:** Each floating glass orb moves at a different parallax factor (0.02 to 0.08) relative to cursor position, creating depth illusion.
- **Card Tilt:** Project cards apply a subtle 3D perspective tilt (max 5deg) toward cursor position when hovered. Transform: perspective(1000px) rotateX(Xdeg) rotateY(Ydeg). Resets with spring animation on mouse leave.
- **Custom Cursor:** Default cursor replaced with a 12px Crystal Azure dot with Azure Glow halo (24px). On hovering interactive elements, cursor scales to 48px with "VIEW" or "CLICK" text inside. Disabled on touch devices.

### Scroll-Triggered Animations (GSAP ScrollTrigger)
- **Section Title Reveal:** Each section H1 animates with clipPath reveal (rect from left to right) + translateY(20px) to 0. Triggered at 20% viewport intersection.
- **Stagger Cascade:** All child elements within a section stagger with 80ms delay, translateY(30px) to 0 + opacity 0 to 1. Timing: cubic-bezier(0.25, 0.46, 0.45, 0.94), 700ms.
- **Parallax Depth:** Background decorative elements (glass orbs, particle clusters) move at 0.3x scroll speed, creating depth separation from content at 1.0x.
- **Timeline Draw:** The experience timeline vertical line animates its height from 0 to 100% as user scrolls through the section, using GSAP ScrollTrigger with scrub: 1.
- **Progress Indicator:** A thin 2px Crystal Azure line at the top of the viewport fills left-to-right based on total page scroll progress.

### Perpetual Micro-Interactions
- **Glass Orb Float:** Each orb has a unique infinite oscillation: translateY(0 to -Npx to 0) with random duration (3s-6s) and rotate(0 to 360deg) at very slow speed (20s+). Creates "alive" feeling.
- **Nav Active Pulse:** Active nav indicator softly pulses opacity 1 to 0.5 to 1, 2.5s loop, Crystal Azure color.
- **Tag Shimmer:** Skill tags have a diagonal gradient shimmer sweep on hover (linear-gradient moving left-to-right), 1000ms.
- **Particle Twinkle:** Random particles periodically increase opacity from 0.2 to 0.8 then back, creating a "twinkling" star effect. 10% of particles twinkle at any given time.
- **Card Glass Refraction:** On hover, cards display a subtle moving light reflection (pseudo-element with gradient) that follows cursor position within the card.

### Performance Constraints
- Animate ONLY via transform and opacity — never top, left, width, height
- Particle system: Canvas 2D (not WebGL) with requestAnimationFrame, max 80 particles on desktop, 30 on tablet, 0 on mobile
- will-change: transform on actively animated elements only, remove after animation
- backdrop-filter: use contain: strict on glass panels to isolate paint
- Respect prefers-reduced-motion: disable ALL animations, particles, cursor effects. Show final states immediately.
- GSAP: use lazy: true for ScrollTrigger to defer calculation
- Images: lazy-load below fold, use loading="lazy" attribute

## 8. Anti-Patterns (Banned — NEVER DO)

### Visual
- No emojis anywhere in the UI
- No Inter font — use Outfit + Sora + JetBrains Mono only
- No generic serif fonts
- No pure black (#000000) — use Abyss (#06080D) as darkest
- No neon outer-glow box-shadows — only diffused, blue-tinted ambient glows
- No oversaturated accent colors (saturation > 80%)
- No purple/violet/neon-cyan accent themes
- No amber/yellow/orange colors — fully replaced by Crystal Azure blue system
- No excessive gradient text on large headers
- No custom mouse cursors that replace the OS cursor entirely — use a supplementary cursor dot overlay

### Layout
- No centered Hero sections — use asymmetric split-screen
- No 3-column equal card grids — use 2-column or asymmetric
- No overlapping text on images — clean spatial separation
- No h-screen — use min-height: 100dvh
- No horizontal scroll on mobile — critical failure
- No calc() percentage flexbox hacks — use CSS Grid

### Content
- No generic placeholder names
- No fake round numbers
- No AI copywriting cliches ("Elevate", "Seamless", "Unleash", "Next-Gen")
- No filler UI text: "Scroll to explore", "Swipe down", scroll arrows
- No broken image links — use local assets
- No Lorem ipsum — use real content

### Technical
- No position: absolute stacking for layout — only for decorative/particle layers
- No animating top, left, width, height
- No circular loading spinners — use skeletal shimmer loaders
- No floating labels on form inputs — label always above
- No WebGL for particles — Canvas 2D is sufficient and more performant
- No blocking the main thread with heavy JS — use requestIdleCallback for non-critical animations
