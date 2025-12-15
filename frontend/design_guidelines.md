# Design Guidelines for Vibe Task Garden

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern productivity tools (Notion, Linear) with a whimsical, gamification twist similar to Habitica or Forest app's growth mechanics.

## Core Design Principles
- **Delightful & Playful**: The plant growth mechanic should feel rewarding and magical
- **Clean & Focused**: Minimal distractions to support task completion
- **Progressive Disclosure**: Visual feedback that grows with user progress

## Typography
- **Headings**: Modern sans-serif, medium weight for titles
- **Body Text**: Clean, readable font for task items
- **Hierarchy**: Clear distinction between app title, subtitle, and task text

## Layout System
**Spacing**: Use Tailwind units of 2, 4, 6, and 8 (p-2, p-4, p-6, p-8, etc.)
- Consistent padding within cards
- Generous spacing between sections for breathing room
- Responsive margins that scale appropriately

## Component Library

### Header Section
- App title: "Vibe Task Garden" - prominent, welcoming
- Subtitle: "Grow your plant as you complete tasks" - lighter weight, smaller
- Centered layout with max-width constraint

### Card Components
**Two primary cards**:

1. **Plant & Progress Card**
   - Plant visualization takes center stage
   - Horizontal progress bar below plant
   - Progress text: "Completed X of Y tasks (Z%)"
   - Gradient progress fill that intensifies with completion

2. **Task Management Card**
   - Task input field with "Add Task" button
   - Task list with clear visual hierarchy
   - Each task shows: checkbox, title, delete button

### Plant Growth Component
**5 distinct stages** (0%, 1-33%, 34-66%, 67-99%, 100%):
- Stage 1 (0%): Seed in soil - minimal, anticipatory
- Stage 2 (1-33%): Small sprout - first signs of growth
- Stage 3 (34-66%): Medium plant - visible progress
- Stage 4 (67-99%): Big plant - almost complete
- Stage 5 (100%): Full tree with sparkles ✨ + congratulatory message

**Transitions**: Smooth CSS transitions between stages for delightful progression

### Task List Items
- **Active tasks**: Full opacity, normal weight
- **Completed tasks**: Dimmed (opacity-50 or similar), line-through text
- Checkbox: Clear interactive state
- Delete button: Trash icon or simple button, subtle until hover

### Progress Bar
- Background: Light gray full-width track
- Fill: Gradient that shifts/intensifies as progress increases
- Rounded corners for modern feel
- Text overlay or adjacent showing percentage

## Color Palette
**Light, modern, nature-inspired**:
- Soft backgrounds for cards
- Fresh green accents for growth/completion states
- Subtle grays for neutral elements
- Gradient progression in progress bar (subtle to vibrant)

## Interactions & States
- **Loading state**: Show on initial data fetch
- **Empty state**: Encourage adding first task
- **Success feedback**: Subtle transitions when tasks update
- **Smooth animations**: Plant growth transitions, progress bar fills

## Layout Structure
```
Max-width centered container (max-w-4xl or similar)
├── Header (title + subtitle)
├── Plant & Progress Card
│   ├── Plant visualization
│   ├── Progress bar
│   └── Stats text
└── Task Management Card
    ├── Input + Add button
    └── Task list (scrollable if needed)
```

## Responsive Considerations
- Single column layout on mobile
- Cards stack vertically
- Adequate touch targets for mobile interactions
- Readable text at all viewport sizes

## Special Features
- **100% completion celebration**: Special visual treatment when tree is fully grown
- **Validation feedback**: Prevent adding empty tasks with subtle indication
- **Error handling**: Graceful display of any API errors

## Images
No hero images or photography needed - the plant visualization serves as the primary visual element and personality driver for this app.