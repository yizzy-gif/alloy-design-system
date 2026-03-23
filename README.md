# Alloy Design System

A React + TypeScript component library and design system providing reusable UI primitives, design tokens, and patterns.

## Project Structure

```
AlloyDesignSystem/
├── src/                         # Component library source
│   ├── components/              # UI components
│   │   ├── Alert/
│   │   ├── Badge/
│   │   ├── Breadcrumb/
│   │   ├── Button/
│   │   ├── DropdownMenu/
│   │   ├── FileUploader/
│   │   ├── Input/
│   │   ├── ListItem/
│   │   ├── Pagination/
│   │   ├── SegmentedControl/
│   │   ├── StatusTag/
│   │   ├── Tabs/
│   │   ├── Tag/
│   │   ├── ToggleButton/
│   │   └── icons/
│   ├── tokens/                  # Design tokens (colors, typography, shadows, gradients)
│   ├── styles/                  # CSS custom properties (tokens.css, typography.css, artwork.css)
│   └── index.ts                 # Main library entry point
├── preview/                     # Component preview / documentation app
│   ├── src/
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── ComponentPreview.jsx
│   │   └── *Preview.jsx         # One preview file per component
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Run the component preview

```bash
cd preview
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Build the library

```bash
npm install
npm run build
```

## Components

| Component | Description |
|---|---|
| Alert | Notification banners for error, warning, success, info, and feature states |
| Badge | Compact pill for counts, labels, and semantic state indicators |
| Breadcrumb | Navigation trail with slash or chevron separators |
| Button | Primary, secondary, tertiary, ghost, destructive variants in five sizes |
| DropdownMenu | Floating panel with grouped options, toggle actions, and custom trailing slots |
| FileUploader | Drag-and-drop area and inline input-row upload control |
| Input | TextField, TextArea, SelectField, PasswordField, SearchField, EmailField, NumberField |
| ListItem | Flexible row for menus, settings panels, and lists with rich trailing actions |
| Pagination | Page navigation with optional rows-per-page and go-to-page controls |
| SegmentedControl | Mutually-exclusive radio-style selection with sliding indicator |
| StatusTag | Semantic status indicator with dot and label |
| Tabs | Underline and background variants with sliding indicator |
| Tag | Multi-color, multi-variant labeling chip with optional dismiss |
| ToggleButton | Pressed/unpressed toggle wrapping Button with fill or border selection styles |

## Token System

Alloy uses a two-layer token architecture:

**Layer 1 — Palette** (`--Alloy-{color}-{number}`)
Raw named values for every color in the system. 11 hues x up to 13 stops.

**Layer 2 — Usage tokens** (`:root` in `src/styles/tokens.css`)
Role-based semantic aliases consumed by components: `--color-bg-*`, `--color-content-*`, `--color-border-*`, `--color-success-*`, `--color-warning-*`, `--color-error-*`, `--color-info-*`. Dark mode is supported via `@media (prefers-color-scheme: dark)` and manual `.dark` / `.light` class overrides.

## Typefaces

Alloy uses **Geist** (`--font-sans`) and **Geist Mono** (`--font-mono`) exclusively. Install the font package and import the typography stylesheet:

```bash
npm install geist
```

```css
@import 'path/to/alloy/src/styles/tokens.css';
@import 'path/to/alloy/src/styles/typography.css';
```
