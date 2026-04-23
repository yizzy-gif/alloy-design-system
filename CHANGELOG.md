# Changelog

All notable changes to the Alloy Design System are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.2.0] — 2026-04-23

### Added

**Components**
- `AILoader` — new `state` prop (`'loading' | 'ready'`, default `'loading'`). `ready` renders a static star with a slow 3.2 s breathing pulse for end-of-turn / awaiting-input moments; sets `aria-label="AI ready for input"` and `aria-live="polite"`. Both states collapse to a static star under `prefers-reduced-motion: reduce`. New `AILoaderState` type exported.

**Icons (+192 — total now 274)**

Bulk addition sourced from the shared icon set. All follow the existing component pattern (24×24 viewBox, `size` / `color` / `strokeWidth` props, auto-scaled stroke).

- **Buildings & places** — `Building01Icon`–`Building08Icon`, `Home01Icon`/`Home03Icon`/`Home04Icon`/`Home05Icon`/`HomeSmileIcon`, `AnchorIcon`
- **Check family** — `CheckCircleBrokenIcon`, `CheckDone01Icon`/`CheckDone02Icon`, `CheckHeartIcon`, `CheckSmallIcon`, `CheckSquareIcon`/`CheckSquareBrokenIcon`, `CheckVerified01Icon`–`CheckVerified03Icon`
- **Copy, edit, save** — `Copy01Icon`–`Copy07Icon`, `Edit01Icon`/`Edit02Icon`/`Edit04Icon`/`Edit05Icon`, `Save01Icon`–`Save03Icon`
- **Bookmarks** — `BookmarkAddIcon`, `BookmarkCheckIcon`, `BookmarkMinusIcon`, `BookmarkXIcon`
- **Hearts** — `HeartIcon`, `HeartsIcon`, `HeartCircleIcon`, `HeartHandIcon`, `HeartHexagonIcon`, `HeartOctagonIcon`, `HeartRoundedIcon`, `HeartSquareIcon`, `ActivityHeartIcon`, `ActivityIcon`
- **Status shapes** — `HelpCircleIcon`/`HelpHexagonIcon`/`HelpOctagonIcon`/`HelpSquareIcon`, `InfoHexagonIcon`/`InfoOctagonIcon`/`InfoSquareIcon`, `SlashCircle01Icon`/`SlashCircle02Icon`/`SlashOctagonIcon`/`SlashDividerIcon`, `XCircleIcon`/`XCloseIcon`/`XSquareIcon`, `MinusIcon`/`MinusCircleIcon`/`MinusSmallIcon`/`MinusSquareIcon`, `PlusCircleIcon`, `Asterisk01Icon`/`Asterisk02Icon`
- **Toggles & settings** — `Toggle01LeftIcon`/`Toggle01RightIcon`/`Toggle02LeftIcon`/`Toggle02RightIcon`/`Toggle03LeftIcon`/`Toggle03RightIcon`, `Settings01Icon`–`Settings04Icon`, `Tool01Icon`/`Tool02Icon`
- **Menus & dots** — `Menu01Icon`–`Menu05Icon`, `DotsGridIcon`/`DotsGrid2x3Icon`/`DotsGrid2x3SIcon`, `DotsHorizontalIcon`/`DotsVerticalIcon`, `DotIcon`/`DotSmallIcon`, `CircleDotIcon`
- **Upload / download** — `Upload01Icon`–`Upload04Icon`, `UploadCloud01Icon`/`UploadCloud02Icon`, `Download01Icon`–`Download04Icon`, `DownloadCloud01Icon`/`DownloadCloud02Icon`
- **Auth & identity** — `LogIn01Icon`–`LogIn04Icon`, `LogOut01Icon`–`LogOut04Icon`, `AtSignIcon`, `Hash01Icon`/`Hash02Icon`
- **Links & share** — `Link01Icon`–`Link05Icon`, `LinkBroken01Icon`/`LinkBroken02Icon`, `LinkExternal01Icon`/`LinkExternal02Icon`, `Share01Icon`–`Share07Icon`
- **Zap, speed, loading** — `ZapIcon`/`ZapCircleIcon`/`ZapFastIcon`/`ZapOffIcon`/`ZapSquareIcon`, `Speedometer01Icon`–`Speedometer04Icon`, `Loading01Icon`–`Loading03Icon`
- **Math & format** — `EqualIcon`/`EqualNotIcon`, `Divide01Icon`–`Divide03Icon`, `Percent01Icon`–`Percent03Icon`, `Translate01Icon`/`Translate02Icon`
- **Files & layout** — `ArchiveIcon`, `Inbox01Icon`, `NotificationBoxIcon`, `LayoutAlt03Icon`, `PlaceholderIcon`
- **Pointers & targets** — `Pin01Icon`/`Pin02Icon`, `Target01Icon`–`Target03Icon`/`Target05Icon`, `SearchLgIcon`/`SearchMdIcon`/`SearchRefractionIcon`
- **Trash** — `Trash01Icon`/`Trash02Icon`/`Trash04Icon`
- **Clouds & cards** — `CloudBlank01Icon`/`CloudBlank02Icon`, `ReceiptCheckIcon`
- **Filters** — `FilterFunnel01Icon`/`FilterFunnel02Icon`
- **Medical & misc** — `MedicalCircleIcon`/`MedicalCrossIcon`/`MedicalSquareIcon`, `LifeBuoy01Icon`/`LifeBuoy02Icon`, `VirusIcon`, `GoogleChromeIcon`, `Moon01Icon`, `MessageCircle02Icon`, `ZoomInIcon`/`ZoomOutIcon`

### Changed
- `README.md` — icon count updated from 78 → 274; full icon list refreshed

---

## [1.1.1] — 2026-04-23

### Changed
- `Button` dark mode — `secondary` variant fill lifted from `slate-900` to `slate-600` (hover `slate-500`) so the button stands forward of the dark page surface
- `Button` dark mode — `destructive-secondary` variant fill lifted from `red-950` to `red-800` with `red-100` label (hover `red-700`) for matching brighter emphasis

---

## [1.1.0] — 2026-03-31

### Added

**Components**
- `DataCard` — compact metric tile; 10 semantic badge color variants (green / yellow / matcha / purple / blue / azure / red / orange / pink / slate); label, heading value, and optional `change` slot
- `ValueChangeLabel` — inline change indicator, two modes:
  - `trend` — value text + directional arrow icon (up/down); color defaults to green (up) or red (down); override with `severity`
  - `text` — text-only, colored by `severity` (positive / warning / negative)
- `Divider` — horizontal or vertical separator using `--color-border-opaque`; `thickness` prop (1 | 2 px); `variant` prop (solid | dashed — 2 px dash / 2 px gap)
- `AILoader` — animated Teambridge AI star mark with star ↔ circle morph; 6 color variants (gradient, gradient-fill, inverse, inverse-light, stroke, stroke-light); 5 sizes (xs 16 px → xl 64 px); fixed 2.2 s ambient duration

**Icons**
- `ArrowNarrowDownIcon`, `ArrowNarrowUpIcon`
- `AlertTriangleIcon`, `BankNote01Icon`, `BookmarkIcon`, `BookOpen01Icon`, `Camera01Icon`
- `CheckCircleDashedIcon`, `Code02Icon`, `CoinsStacked03Icon`, `CurrencyDollarIcon`
- `Globe01Icon`, `Image01Icon`, `LineChartUp02Icon`, `Map01Icon`, `Microphone02Icon`
- `MessageDotsSquareIcon`, `MessageNotificationCircleIcon`, `MessageNotificationSquareIcon`
- `MoneyIcon`, `PackageIcon`, `PuzzlePiece01Icon`, `PuzzlePiece02Icon`, `QrCode01Icon`, `TeambridgeAIIcon`

**Preview**
- `ValueChangeLabelPreview` — all variants; in-table, in-chart-card, and in-data-card usage examples
- `DividerPreview` — solid/dashed variants, horizontal/vertical in-context examples
- Preview server migrated to `Alloy/preview/` as single source of truth (port 5180)

### Changed
- `DataCard` — removed `tag` / `tagColor` props; replaced with `change?: ReactNode` (breaking)
- `DataCard` value row — `align-items: center` → `align-items: baseline`
- `AILoader` — `speed` prop replaced by `variant` prop (breaking); gradient hex values moved to CSS custom properties (`--ai-grad-start`, `--ai-grad-mid`, `--ai-grad-end`)

---

## [1.0.0] — 2026-03-22

### Added

#### Charts Suite
- **BarChart** — Grouped, stacked, and horizontal bar charts with multi-series legend
- **LineChart** — Multi-line chart with smooth curves and legend
- **DonutChart** — Donut/pie chart with horizontal or vertical legend
- **HeatMap** — 2D cell matrix visualization for grid-based data
- **ChartCard** — Wrapper container with title, description, and footer slot

#### Form Controls
- **Checkbox** — Binary selection with indeterminate state; sm/md/lg sizes; error state; label + description
- **CheckboxGroup** — Grouped checkbox list with shared error and disabled state
- **Radio** — Single-select option; sm/md/lg sizes; error state; label + description
- **RadioGroup** — Managed radio button group from an options array
- **Switch** — Pill toggle for binary on/off settings; sm/md/lg sizes; label + description

#### Layout & Utility
- **FilterPill** — Removable filter chip with label and dismiss button; sm/md/lg sizes
- **ScrollArea** — Scrollable container with custom-styled scrollbars; horizontal/vertical/both orientations
- **Table** — Semantic HTML table with sm (40px) and md (48px) row size variants; TableHead, TableBody, TableRow, TableCell sub-components
- **Tooltip** — Hover/focus hint overlay; top/bottom/left/right placement; configurable delay

#### Tokens
- Added `--gradient-ai` (purple → blue gradient) to `tokens.css` for AI product accent fills

### Changed
- **Table.stories.tsx** — Updated to use Alloy `<Checkbox>` and `<Switch>` components instead of vanilla HTML inputs
- **src/index.ts** — All new components and their prop types added to public exports
- **package.json** — Bumped version `0.1.0` → `1.0.0`

---

## [0.1.0] — 2026-03-18

Initial release.

### Components
Alert, Badge, Breadcrumb, Button, DropdownMenu, FileUploader,
Input (TextField, TextArea, SelectField, MultiSelectField, PasswordField, SearchField, EmailField, NumberField),
ListItem, Pagination, SegmentedControl, StatusTag, Tabs, Tag, ToggleButton

### Foundation
- Two-layer design token system (palette + semantic usage tokens)
- Light/dark mode via `prefers-color-scheme` + `.dark`/`.light` class overrides
- Spacing, typography, radius, shadow, z-index, and motion token scales
- Geist + Geist Mono typefaces
- CSS Modules + CSS custom properties architecture
