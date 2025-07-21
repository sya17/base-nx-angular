# Data Management Feature

A comprehensive data management feature built with Angular that demonstrates advanced table functionality and form handling.

## Features

- **Advanced Data Table**: 
  - Sortable columns
  - Pagination with configurable page sizes
  - Row selection (single and bulk)
  - Custom cell rendering
  - Loading and empty states
  - Responsive design

- **Data Form**:
  - Reactive forms with validation
  - Real-time validation feedback
  - Modal-based entry and editing
  - Form field components integration

- **Data Management**:
  - CRUD operations (Create, Read, Update, Delete)
  - Bulk operations
  - CSV export functionality
  - Statistics dashboard

- **User Experience**:
  - Professional UI design
  - Accessible components
  - Mobile-responsive layout
  - Loading states and feedback

## Components Used

This feature utilizes the following shared UI components:
- `Table` - Advanced data table with sorting and pagination
- `FormField` & `TextField` - Form input components
- `Modal` - Popup dialogs for forms
- `Card` - Container components
- `Button` - Action buttons
- `Badge` - Status indicators
- `Icon` - Icon display

## Usage

```typescript
import { DataManagement } from '@base-nx-angular/features/data-management';

@Component({
  imports: [DataManagement]
})
export class MyComponent {}
```

## Data Structure

The feature works with employee data containing:
- ID (number)
- Name (string)
- Email (string)
- Department (string)
- Position (string)
- Salary (number)
- Start Date (date)
- Status (active | pending | inactive)

## Customization

The table and form components are highly customizable:
- Configure table columns and their properties
- Adjust pagination settings
- Customize validation rules
- Modify styling through SCSS variables