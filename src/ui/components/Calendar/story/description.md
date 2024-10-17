# Calendar Class Documentation

The `Calendar` class is a custom HTML element that extends `HTMLElement`. It provides a flexible and customizable calendar component for user interfaces.

## Properties

- `m_parentTag`: HTMLElement - The parent tag of the calendar.
- `m_headerButtonGroup`: ButtonGroup - The button group for the calendar header.
- `m_headerButtonsList`: Array - Stores the header buttons.
- `m_bodyTag`: HTMLElement - The main body tag of the calendar.
- `m_bodyHeaderTag`: HTMLElement - The header tag within the calendar body.
- `m_bodyContentTag`: HTMLElement - The content tag within the calendar body.
- `m_datesHeaderGrid`: Grid - The grid for displaying day names.
- `m_datesButtonGroup`: ButtonGroup - The button group for date selection.
- `m_props`: Object - Configuration properties for the calendar.
- `m_idFormat`: String - The format used for button IDs (default: "YYYY/M/D").
- `m_value`: Date - The currently selected date.
- `m_viewDate`: Date - The date currently being viewed.
- `m_depths`: Object - Defines depth levels for different views.
- `m_depth`: Number - The current depth level of the calendar view.
- `m_minDepth`: Number - The minimum depth level allowed.
- `m_minDate`: Date - The minimum selectable date.
- `m_maxDate`: Date - The maximum selectable date.

## Internal API

- `destroy()`: void - Removes the calendar from the DOM.
- `getParentTag()`: HTMLElement - Returns the parent tag of the calendar.
- `navigateToFuture()`: void - Navigates the calendar view to the future.
- `navigateToPast()`: void - Navigates the calendar view to the past.
- `navigateUp()`: void - Navigates up to a higher depth level (e.g., from month to year view).
- `setup(props: Object)`: Promise<void> - Sets up the calendar with the provided properties.
- `value(context: { value?: Date | string })`: Date | void - Gets or sets the selected date of the calendar.

The `Calendar` class provides a comprehensive set of features for date selection and navigation, supporting various view depths (month, year, decade, century) and customizable styling options.