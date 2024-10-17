# ButtonGroup Class Documentation

The `ButtonGroup` class is a custom HTML element that extends `HTMLElement`. It provides a container for grouping and managing multiple button components.

## Properties

- `m_buttonsList`: Array - Stores the button instances within the group.
- `m_parentTag`: HTMLElement - The parent tag of the button group.
- `m_props`: Object - Configuration properties for the button group. Default values include:
  - `buttons`: Array - List of button configurations
  - `tag`: String - Default `"default"`
  - `theme`: String - Default `"default"`
  - `fnGroupClick`: Function - Default handler for group button clicks
- `m_selectedButtonTag`: HTMLElement | null - The currently selected button tag.

## Internal API

- `deselect()`: void - Deselects all buttons in the group.
- `destroy()`: void - Removes the button group from the DOM.
- `getConfigById(context: { id: string })`: Object | undefined - Returns the configuration of a button by its ID.
- `getParentTag()`: HTMLElement - Returns the button group element itself.
- `getSelected()`: HTMLElement | null - Returns the currently selected button tag.
- `getTag(id: string)`: HTMLElement | undefined - Returns a button tag by its ID.
- `select(context: { id: string, notTrigger?: boolean })`: void - Selects a button in the group by its ID.
- `setup(props: Object)`: Promise<void> - Sets up the button group with the provided properties.

## Additional Methods

- `setupDOM()`: Promise<void> - Sets up the DOM structure for the button group.
- `installButton(button: Object)`: Promise<void> - Installs a single button into the group.
- `handleGroupBtnClick(context: Object)`: void - Handles the click event for buttons in the group.
- `configure(customProps: Object)`: Promise<void> - Configures the button group with custom properties.