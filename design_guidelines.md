# RiskMap Educational Dashboard Design Guidelines

## Design Approach: Design System (Material-UI + Tailwind)
**Selected Approach**: Design System approach using Material-UI components with Tailwind CSS styling
**Justification**: This is a utility-focused educational dashboard prioritizing functionality, data visualization, and consistent user experience across multiple complex interfaces.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Primary Blue: 210 85% 45% (professional education branding)
- Secondary Blue: 210 70% 35% (darker variant for navigation)

**Status Colors:**
- Success Green: 142 76% 36% (positive metrics, high performance)
- Warning Orange: 38 92% 50% (moderate risk levels)
- Error Red: 0 84% 60% (high risk indicators)

**Neutral Palette:**
- Background: 220 13% 97% (light mode), 220 13% 8% (dark mode)
- Surface: White/220 13% 12%
- Text Primary: 220 9% 15%/220 9% 85%

### B. Typography
**Font Stack**: Inter via Google Fonts CDN
- Headers: Inter 600 (semibold) - 24px, 20px, 18px
- Body text: Inter 400 (regular) - 14px, 16px
- Data/metrics: Inter 500 (medium) - emphasis on numbers
- Small text: Inter 400 - 12px for labels and captions

### C. Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6
- Section margins: m-8, m-12
- Grid gaps: gap-4, gap-6
- Icon spacing: mr-2, ml-2

### D. Component Library

**Navigation:**
- Persistent sidebar (240px width) with collapsible mobile drawer
- Top navbar with user profile dropdown and notifications
- Active state highlighting with primary color background

**Data Visualization:**
- Recharts library for all charts and graphs
- Card containers (Material-UI Card) with subtle shadows
- Progress bars and circular progress indicators
- Risk level badges with color-coded backgrounds

**Forms & Inputs:**
- Material-UI outlined inputs with consistent styling
- Login form: centered card layout with 400px max-width
- Dropdowns and selectors with clear labeling

**Tables & Lists:**
- At-risk students table with sortable columns
- Assignment cards with due date indicators
- Document grid with hover states

**Interactive Elements:**
- Floating Action Button for document upload
- Filter chips for table views
- Expandable sections for detailed information

### E. Page-Specific Layouts

**Login Page:**
- Centered card design with RiskMap logo
- User type selection (Parent/Student) with radio buttons
- Clean, minimal background

**Dashboard Pages:**
- Two-column layout with sidebar navigation
- Widget-based dashboard with responsive grid
- Consistent page headers with breadcrumbs

**Data Dense Pages:**
- Full-width tables with sticky headers
- Filter panels in sidebar or top sections
- Export and action buttons positioned top-right

### F. Accessibility & Interaction
- High contrast ratios for all text (WCAG AA compliance)
- Keyboard navigation support through Material-UI components
- Screen reader friendly labels and ARIA attributes
- Consistent focus states using primary color outline

### G. Responsive Behavior
- Mobile-first approach with collapsible sidebar
- Chart responsiveness with proper scaling
- Touch-friendly button sizes (minimum 44px)
- Optimized table views for mobile with horizontal scrolling

## Visual Hierarchy Principles
1. **Data First**: Charts and metrics get primary visual weight
2. **Status Clarity**: Color-coded risk levels immediately recognizable
3. **Navigation Consistency**: Persistent wayfinding across all pages
4. **Information Density**: Balanced data presentation without overwhelming users