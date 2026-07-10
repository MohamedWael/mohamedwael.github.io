# Design

## Theme

**Precision Minimal**. A high-end, professional interface that communicates "Expert Confidence." It emphasizes clean hierarchy, intentional whitespace, and refined typography. Supports both **Light** and **Dark** modes with a seamless transition.

## Color Palette (OKLCH)

Using a "Restrained" strategy with adaptive tokens.

### Light Mode
- **Background**: `oklch(1.00 0.000 0)` (Pure White)
- **Surface**: `oklch(0.98 0.01 60.0)` (Soft Warm Tint)
- **Ink**: `oklch(0.18 0.01 60.0)` (Deep Charcoal)
- **Muted**: `oklch(0.55 0.01 60.0)` (Soft Slate)

### Dark Mode
- **Background**: `oklch(0.12 0.00 0)` (Pure Black)
- **Surface**: `oklch(0.18 0.01 60.0)` (Darker Slate)
- **Ink**: `oklch(0.95 0.01 60.0)` (Off White)
- **Muted**: `oklch(0.65 0.01 60.0)` (Light Slate)

### Shared
- **Primary**: `oklch(0.65 0.146 60.0)` (Seed Gold)
- **Accent**: `oklch(0.55 0.15 250.0)` (Android Blue)

## Typography

- **Headings**: A geometric sans-serif (e.g., *Geist* or *Inter*) with tight tracking and balanced wrapping for a modern, "Sleek" look.
- **Body**: A highly legible sans-serif for professional readability, capped at `65ch`.
- **Accents**: Monospace used sparingly for dates or technical keywords to signal your engineering background without being overwhelming.

## Components & Layout

- **Structural Grid**: Use a 12-column grid with generous gutters. Sections should have clear, rhythmic vertical spacing.
- **Technical Accents**: Use 1px solid borders (`--surface` or slightly darker) instead of shadows for a flatter, more "engineered" look.
- **Data Visualization**: Use simple, clean markers or bar charts (1px stroke) to represent skills or proficiency, avoiding "Hero Metrics" clichés.
- **Cards**: Minimal rounding (`8px`) with no shadows. Group content using background tints or subtle borders.

## Motion

- **Systematic Reveals**: Sections should fade and slide up slightly using a clean `ease-out-expo` curve.
- **Micro-interactions**: Links and buttons should have immediate, crisp transitions (no bounce).
- **Reduced Motion**: All entrance animations cross-fade instantly when `prefers-reduced-motion` is active.
