# Planning Guide

An interactive educational tool that helps developers learn Android development concepts by visualizing and editing AndroidManifest.xml files and exploring Android project structure in a browser-based environment.

**Experience Qualities**:
1. **Educational** - Clear explanations and visual feedback make Android concepts approachable for learners
2. **Interactive** - Real-time editing and validation provide immediate understanding of manifest structure
3. **Professional** - Clean interface with proper syntax highlighting presents information like a real IDE

**Complexity Level**: Light Application (multiple features with basic state)
- This app provides manifest editing, validation, and visualization with persistent state, making it more than a single tool but not requiring complex backend functionality.

## Essential Features

### Feature 1: AndroidManifest.xml Editor
- **Functionality**: Syntax-highlighted code editor for creating and modifying Android manifest files
- **Purpose**: Allows learners to write and experiment with manifest configurations in a safe environment
- **Trigger**: User types in the editor panel
- **Progression**: Open editor → Type/modify XML → See syntax highlighting → Changes auto-save
- **Success criteria**: XML displays with proper syntax highlighting, changes persist across sessions

### Feature 2: Visual Manifest Builder
- **Functionality**: Form-based interface for setting common manifest properties (package name, permissions, activities, etc.)
- **Purpose**: Helps beginners understand manifest structure without memorizing XML syntax
- **Trigger**: User clicks on visual builder tab or form fields
- **Progression**: Select builder tab → Fill form fields → See XML update in real-time → Validate structure
- **Success criteria**: Form changes immediately reflect in XML editor, all standard Android elements available

### Feature 3: Manifest Validation
- **Functionality**: Real-time XML validation with helpful error messages
- **Purpose**: Teaches proper manifest syntax and catches common mistakes
- **Trigger**: User modifies manifest content (either editor or builder)
- **Progression**: Edit content → Validation runs automatically → Errors display with line numbers → Suggestions shown
- **Success criteria**: Invalid XML shows clear error messages, valid XML shows success indicator

### Feature 4: Project Structure Viewer
- **Functionality**: Tree view showing typical Android project file structure with the manifest highlighted
- **Purpose**: Provides context for where AndroidManifest.xml fits in a real Android project
- **Trigger**: Automatically visible on page load
- **Progression**: View project tree → Click manifest file → See it highlighted → Understand project organization
- **Success criteria**: Tree structure matches standard Android project layout (Gradle-based)

### Feature 5: Permission Explorer
- **Functionality**: Searchable list of Android permissions with descriptions and usage examples
- **Purpose**: Helps learners discover and understand Android permissions system
- **Trigger**: User opens permission palette or searches permissions
- **Progression**: Open permission list → Search/browse → Click permission → See description → Add to manifest
- **Success criteria**: All common permissions available, descriptions clear, one-click add to manifest

## Edge Case Handling

- **Malformed XML**: Parser catches syntax errors and shows specific line/column, prevents breaking the app
- **Empty Manifest**: Provides starter template with minimum required elements when user starts fresh
- **Invalid Permission Names**: Autocomplete and validation prevent typos in permission strings
- **Browser Refresh**: All work automatically persists to KV store, nothing lost on refresh
- **Large Manifests**: Scroll areas handle long files, performance remains smooth

## Design Direction

The design should feel educational yet professional - like a lightweight IDE or documentation site. It should balance approachability for beginners with the credibility of a serious development tool. The interface should feel clean and focused, avoiding clutter while providing rich functionality. Think VS Code meets Android Studio documentation.

## Color Selection

Triadic color scheme evoking Android's green brand while maintaining professional IDE aesthetics with complementary accent colors for different UI zones.

- **Primary Color**: Android Green (oklch(0.68 0.18 155)) - Represents the Android platform, used for primary actions and branding
- **Secondary Colors**: Deep Purple (oklch(0.45 0.15 285)) for editor chrome and code elements, maintaining developer tool familiarity
- **Accent Color**: Amber Orange (oklch(0.75 0.15 65)) for validation success, warnings, and interactive highlights
- **Foreground/Background Pairings**:
  - Background (Light Gray oklch(0.98 0 0)): Dark text oklch(0.2 0 0) - Ratio 14.8:1 ✓
  - Card (White oklch(1 0 0)): Dark text oklch(0.2 0 0) - Ratio 16.4:1 ✓
  - Primary (Android Green oklch(0.68 0.18 155)): White oklch(1 0 0) - Ratio 5.2:1 ✓
  - Secondary (Deep Purple oklch(0.45 0.15 285)): White oklch(1 0 0) - Ratio 7.8:1 ✓
  - Accent (Amber oklch(0.75 0.15 65)): Dark text oklch(0.2 0 0) - Ratio 6.1:1 ✓
  - Muted (Light Gray oklch(0.96 0 0)): Medium Gray oklch(0.5 0 0) - Ratio 7.2:1 ✓

## Font Selection

Fonts should convey technical precision while remaining highly readable - a combination of a clean geometric sans-serif for UI and a proper monospace font for code display. Using Inter for interface elements provides excellent readability at all sizes, while JetBrains Mono brings authentic IDE code display.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold / 32px / -0.02em letter spacing / High contrast
  - H2 (Section Headers): Inter Semibold / 20px / -0.01em / Primary color
  - H3 (Panel Titles): Inter Medium / 16px / normal / Foreground
  - Body (Descriptions): Inter Regular / 14px / 0 / Muted foreground / 1.5 line height
  - Code (XML Editor): JetBrains Mono Regular / 13px / monospace / Secondary background
  - Labels (Form Fields): Inter Medium / 13px / 0 / Foreground / uppercase

## Animations

Animations should be purposeful and subtle, reinforcing the educational nature without feeling frivolous. Quick micro-interactions confirm user actions while smooth transitions between editor and builder modes maintain spatial understanding. Motion should feel responsive and professional like a native development tool.

- **Purposeful Meaning**: Tab transitions slide horizontally to show mode switching, validation indicators pulse gently to draw attention to errors/success without being alarming
- **Hierarchy of Movement**: Primary focus on validation feedback (200ms pulse), secondary on tab transitions (300ms slide), minimal on hover states (100ms color fade)

## Component Selection

- **Components**: 
  - Tabs (switching between Editor/Builder/Permissions views)
  - Card (containing each major section - editor, project tree, permission list)
  - Textarea (for XML code editing with monospace font)
  - Input & Label (for manifest builder form fields)
  - Button (adding permissions, resetting manifest, validating)
  - Badge (showing permission categories and validation status)
  - ScrollArea (for long XML content and file tree)
  - Separator (dividing different functional zones)
  - Alert (displaying validation messages and tips)
  - Command (for searchable permission palette)
  - Collapsible (for project tree folders)

- **Customizations**: 
  - Code editor textarea with syntax highlighting via custom highlighting component
  - File tree with custom icons and indentation styling
  - Custom permission card component showing name, description, and protection level

- **States**:
  - Buttons: Default (primary green), hover (darker green), active (pressed), disabled (muted gray)
  - Inputs: Default (gray border), focus (primary ring), error (destructive red border), valid (accent amber glow)
  - Tabs: Inactive (muted), active (primary with bottom border), hover (slight background)
  - Editor: Normal, error highlight (red background on error lines), success (green border when valid)

- **Icon Selection**: 
  - File icons (@phosphor-icons: FileCode for XML, Folder for directories, FolderOpen for expanded)
  - Action icons (Plus for adding permissions, Check for validation, Warning for errors, ArrowClockwise for reset)
  - Navigation icons (Code for editor, Layout for builder, ShieldCheck for permissions)

- **Spacing**: 
  - Container padding: p-6
  - Card gaps: gap-4
  - Section spacing: space-y-6
  - Form field spacing: gap-2
  - Button padding: px-4 py-2
  - Inline elements: gap-2

- **Mobile**: 
  - Stack tabs vertically on mobile
  - Collapse sidebar project tree into drawer/sheet
  - Full-width editor and builder forms
  - Fixed bottom action bar for primary buttons
  - Touch-friendly button sizes (min 44px)
  - Scrollable content with sticky headers
