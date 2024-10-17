# ButtonSVG Class Documentation

The `ButtonSVG` class is a custom HTML element that extends `HTMLElement`. It provides a flexible and customizable button component for user interfaces, with support for SVG and image elements.

## Properties

- `m_imageList`: Array - Stores image tags associated with the button.
- `m_parentTag`: HTMLElement - The parent tag of the button.
- `m_props`: Object - Configuration properties for the button. Default values include:
  - `enable`: Boolean - Default `true`
  - `preventDefault`: Boolean - Default `true`
  - `stopPropagation`: Boolean - Default `true`
  - `tag`: String - Default `"default"`
  - `theme`: String - Default `"default"`
- `m_buttonTag`: HTMLElement - The main button tag.
- `m_text`: String - The text content of the button.
- `m_enable`: Boolean - Indicates whether the button is enabled.

## Internal API

- `deselect()`: void - Removes the selected state from the button.
- `enable(enable: boolean)`: void - Enables or disables the button.
- `getConfig()`: Object - Returns the configuration properties of the button.
- `getId()`: string - Returns the ID of the button.
- `getImageTagById(id: string)`: HTMLImageElement | undefined - Returns an image tag associated with the button by its ID.
- `getParentTag()`: HTMLElement - Returns the parent tag of the button.
- `getTag()`: HTMLElement - Returns the main button tag.
- `text(context?: { text: string })`: string | void - Gets or sets the text content of the button.
- `select(context: { notTrigger?: boolean })`: void - Handles external selection of the button.
- `setup(props: Object)`: Promise<void> - Sets up the button with the provided properties.

## Additional Features

- Supports both image and SVG elements within the button.
- Handles hover effects for images.
- Provides callbacks for click events on individual buttons and button groups.
- Allows for custom CSS classes and themes.