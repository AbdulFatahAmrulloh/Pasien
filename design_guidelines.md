# Hospital Inpatient Module Design Guidelines

## Design Approach
**Selected Approach**: Design System Approach (Material Design influenced)
**Justification**: This is a utility-focused healthcare application where efficiency, clarity, and usability are paramount. Medical interfaces require trust, consistency, and error prevention over visual flair.

## Core Design Elements

### A. Color Palette
**Light Mode:**
- Primary: 217 91% 60% (Medical blue for trust and professionalism)
- Secondary: 217 91% 85% (Light blue for backgrounds)
- Success: 142 76% 36% (Green for confirmations)
- Warning: 38 92% 50% (Amber for alerts)
- Error: 0 84% 60% (Red for validation errors)
- Neutral: 220 14% 96% (Light gray backgrounds)
- Text Primary: 220 39% 11%
- Text Secondary: 220 9% 46%

**Dark Mode:**
- Primary: 217 91% 70%
- Secondary: 217 50% 25%
- Success: 142 76% 46%
- Warning: 38 92% 60%
- Error: 0 84% 70%
- Neutral: 220 39% 11%
- Text Primary: 220 14% 96%
- Text Secondary: 220 9% 54%

### B. Typography
- **Primary Font**: Inter (Google Fonts) - Clean, readable, medical-appropriate
- **Headings**: Font weights 600-700, sizes from text-lg to text-3xl
- **Body Text**: Font weight 400-500, text-sm to text-base
- **Labels**: Font weight 500, text-sm, uppercase for form labels

### C. Layout System
**Spacing Units**: Consistent use of Tailwind units 2, 4, 6, 8, 12, 16
- **Micro spacing**: p-2, m-2 (8px) for tight elements
- **Standard spacing**: p-4, m-4 (16px) for general layout
- **Section spacing**: p-6, m-6 (24px) for form sections
- **Major spacing**: p-8, m-8 (32px) for page sections
- **Large spacing**: p-12, m-12 (48px) for major breaks
- **XL spacing**: p-16, m-16 (64px) for page-level spacing

### D. Component Library

**Navigation**
- Clean header with module title and navigation tabs
- Breadcrumb navigation for deep pages
- Active state indicators with primary color

**Forms**
- Grouped form sections with subtle background (neutral color)
- Required field indicators with asterisks
- Inline validation with error states
- Success feedback for completed actions
- Clear, descriptive labels above inputs

**Data Display**
- Clean table design with alternating row backgrounds
- Sortable column headers with subtle hover states
- Search bar with clear visual prominence
- Pagination controls with accessible design
- Empty states with helpful guidance text

**Feedback Components**
- Loading spinners with medical blue primary color
- Toast notifications for success/error feedback
- Modal dialogs for confirmation actions
- Progress indicators for multi-step processes

**Buttons**
- Primary: Filled with primary color for main actions
- Secondary: Outline style for secondary actions
- Danger: Red background for destructive actions
- Disabled: Reduced opacity with clear visual feedback

### E. Specific Healthcare UX Patterns

**Patient Information Display**
- Consistent patient card layouts
- Clear hierarchy: Name → ID → Medical details
- Status indicators for patient conditions
- Room and doctor information prominently displayed

**Form Validation**
- Real-time validation for critical fields (NIK format)
- Clear error messaging with specific guidance
- Required field indicators
- Success confirmation for form submissions

**Data Safety**
- Confirmation dialogs for patient data changes
- Clear visual distinction between active/inactive patients
- Auto-save indicators where appropriate

## Visual Hierarchy
1. **Critical Information**: Patient names and medical IDs get highest visual priority
2. **Actions**: Primary buttons clearly distinguished from secondary actions
3. **Status Information**: Color-coded status indicators without overwhelming the interface
4. **Navigation**: Clean, predictable navigation patterns

## Accessibility Considerations
- High contrast ratios for all text (WCAG AA compliance)
- Consistent dark mode implementation across all components
- Keyboard navigation support for all interactive elements
- Screen reader friendly labels and descriptions
- Focus indicators clearly visible in both light and dark modes

This design approach prioritizes clarity, efficiency, and trust - essential qualities for medical software where accuracy and usability directly impact patient care.