# MAMBO.JS - UI Components Documentation

### Table of Contents

1. [Button](#button)
2. [ButtonSVG](#buttonsvg)
3. [ButtonGroup](#buttongroup)
4. [Calendar](#calendar)
5. [CheckboxGroup](#checkboxgroup)
6. [Combobox](#combobox)
7. [Checkbox](#checkbox)
8. [DatePicker](#datepicker)
9. [Dialog](#dialog)
10. [DragDrop](#dragdrop)
11. [Draggable](#draggable)
12. [Dropdown](#dropdown)
13. [FileChooser](#filechooser)
14. [Grid](#grid)
15. [Input](#input)
16. [Listbox](#listbox)
17. [MapBox](#mapbox)
18. [Percentage](#percentage)
19. [Player](#player)
20. [Radio](#radio)
21. [RadioGroup](#radiogroup)
22. [Rating](#rating)
23. [Slideout](#slideout)
24. [Slider](#slider)
25. [Switch](#switch)
26. [Tab](#tab)
27. [Textarea](#textarea)
28. [TimePicker](#timepicker)
29. [TreeView](#treeview)
30. [VideoPlayer](#videoplayer)

## Button

### Public Properties

- `deselect`: Function to deselect the button
- `enable`: Function to enable or disable the button
- `getConfig`: Function to get the button configuration
- `getId`: Function to get the button ID
- `getImageTagById`: Function to get an image tag by ID
- `getParentTag`: Function to get the parent tag
- `getTag`: Function to get the button tag
- `text`: Function to get or set the button text
- `select`: Function to select the button
- `setup`: Function to set up the button

### Public Methods (API)

#### setup(props)
Sets up the button with the given properties.
- `props`: Object containing button configuration

#### deselect()
Deselects the button.

#### enable(enable)
Enables or disables the button.
- `enable`: Boolean indicating whether to enable or disable the button

#### getConfig()
Returns the button configuration.

#### getId()
Returns the button ID.

#### getImageTagById(id)
Returns an image tag by ID.
- `id`: String representing the image ID

#### getParentTag()
Returns the parent tag of the button.

#### getTag()
Returns the button tag.

#### text(context)
Gets or sets the button text.
- `context`: Object containing the text to set (optional)
  - `text`: String representing the new button text

#### select(context)
Selects the button.
- `context`: Object containing selection options
  - `notTrigger`: Boolean indicating whether to trigger the click event

### Private Properties

- `m_imageList`: Array of image tags
- `m_parentTag`: Parent tag of the button
- `m_props`: Button configuration properties
- `m_buttonTag`: Button tag
- `m_text`: Button text
- `m_enable`: Boolean indicating if the button is enabled

### Private Functions

#### configure(customProps)
Configures the button with default and custom properties.
- `customProps`: Object containing custom properties to override defaults

#### setupDOM()
Sets up the DOM structure for the button.

#### insertGraphic(graphic, func)
Inserts a graphic (image or SVG) into the button.
- `graphic`: Object or array of objects representing the graphic(s) to insert
- `func`: Function to add the graphic (addImg or addSVG)

#### addImg(img)
Adds an image to the button.
- `img`: Object containing image properties

#### addSVG(svg)
Adds an SVG to the button.
- `svg`: Object containing SVG properties

#### handleClick(ev)
Handles the click event on the button.
- `ev`: Click event object

#### mouseEnterOverImage()
Handles mouse enter event for images.

#### mouseLeaveOverImage()
Handles mouse leave event for images.

#### mouseEnterOverButton()
Handles mouse enter event for the button.

#### mouseLeaveOverButton()
Handles mouse leave event for the button.

#### setSrcAttr(tag, src)
Sets the src attribute of an image tag.
- `tag`: Image tag to update
- `src`: New source URL for the image

#### handleExternalSelect(context)
Handles external selection of the button.
- `context`: Object containing selection options
  - `notTrigger`: Boolean indicating whether to trigger the click event

#### selectBtn()
Selects the button.

#### deselectBtn()
Deselects the button.

#### setEnable()
Sets the enabled/disabled state of the button.

#### setupComplete()
Calls the completion callback after setup is finished.

### m_props Configuration

The `m_props` object contains the following default properties:

- `enable`: Boolean, default `true`
- `preventDefault`: Boolean, default `true`
- `stopPropagation`: Boolean, default `true`
- `tag`: String, default `"default"`
- `theme`: String, default `"default"`

Additional properties can be added or overridden when instantiating the Button class.

## ButtonSVG

The ButtonSVG class extends the functionality of the Button class to specifically handle SVG buttons. It inherits all properties and methods from the Button class and adds or modifies the following:

### Public Properties

Inherits all public properties from Button class.

### Public Methods (API)

Inherits all public methods from Button class.

### Private Properties

Inherits all private properties from Button class, with the addition of:

- `m_imageList`: Array of image tags for SVG elements

### Private Functions

Inherits all private functions from Button class, with the addition of:

#### addSVG(svg)
Adds an SVG element to the button.
- `svg`: Object containing SVG properties and paths

### m_props Configuration

Inherits the same default configuration as the Button class, with potential additional SVG-specific properties that can be added when instantiating the ButtonSVG class.

## ButtonGroup

### Public Properties

- `deselect`: Function to deselect all buttons in the group
- `destroy`: Function to destroy the button group
- `getConfigById`: Function to get a button configuration by ID
- `getParentTag`: Function to get the parent tag of the button group
- `getSelected`: Function to get the selected button
- `getTag`: Function to get a button tag by ID
- `select`: Function to select a button in the group
- `setup`: Function to set up the button group

### Public Methods (API)

#### setup(props)
Sets up the button group with the given properties.
- `props`: Object containing button group configuration

#### deselect()
Deselects all buttons in the group.

#### destroy()
Destroys the button group and removes it from the DOM.

#### getConfigById(context)
Returns the configuration of a button by its ID.
- `context`: Object containing the button ID
  - `id`: String representing the button ID

#### getParentTag()
Returns the parent tag of the button group.

#### getSelected()
Returns the currently selected button.

#### getTag(context)
Returns a button tag by its ID.
- `context`: Object containing the button ID
  - `id`: String representing the button ID

#### select(context)
Selects a button in the group.
- `context`: Object containing selection options
  - `id`: String or Array of strings representing button ID(s) to select
  - `notTrigger`: Boolean indicating whether to trigger the click event

### Private Properties

- `m_buttonsList`: Array of button instances in the group
- `m_parentTag`: Parent tag of the button group
- `m_props`: Button group configuration properties
- `m_selectedButtonTag`: Currently selected button tag

### Private Functions

#### configure(customProps)
Configures the button group with default and custom properties.
- `customProps`: Object containing custom properties to override defaults

#### setupDOM()
Sets up the DOM structure for the button group.

#### installButton(button)
Installs a button in the group.
- `button`: Object containing button configuration

#### handleGroupBtnClick(context)
Handles the click event for buttons in the group.
- `context`: Object containing click event details

#### getTag(id)
Returns a button tag by its ID.
- `id`: String representing the button ID

#### destroyButtonGroup()
Destroys the button group and removes it from the DOM.

#### setupComplete()
Calls the completion callback after setup is finished.

### m_props Configuration

The `m_props` object contains the following default properties:

- `buttons`: Array of button configurations, default `[]`
- `tag`: String, default `"default"`
- `theme`: String, default `"default"`
- `fnGroupClick`: Function, default handler for group button clicks

Additional properties can be added or overridden when instantiating the ButtonGroup class.

## Calendar

### Public Properties

- `destroy`: Function to destroy the calendar
- `getParentTag`: Function to get the parent tag of the calendar
- `navigateToFuture`: Function to navigate to the future
- `navigateToPast`: Function to navigate to the past
- `navigateUp`: Function to navigate up in the calendar view
- `setup`: Function to set up the calendar
- `value`: Function to get or set the calendar value

### Public Methods (API)

#### setup(props)
Sets up the calendar with the given properties.
- `props`: Object containing calendar configuration

#### destroy()
Destroys the calendar and removes it from the DOM.

#### getParentTag()
Returns the parent tag of the calendar.

#### navigateToFuture()
Navigates to the future in the calendar view.

#### navigateToPast()
Navigates to the past in the calendar view.

#### navigateUp()
Navigates up in the calendar view (e.g., from days to months).

#### value(context)
Gets or sets the calendar value.
- `context`: Object containing the value to set (optional)
  - `value`: Date object or string representing the new calendar value

### Private Properties

- `m_parentTag`: Parent tag of the calendar
- `m_headerButtonGroup`: Button group for the calendar header
- `m_headerButtonsList`: List of header buttons
- `m_bodyTag`: Body tag of the calendar
- `m_bodyHeaderTag`: Header tag of the calendar body
- `m_bodyContentTag`: Content tag of the calendar body
- `m_datesHeaderGrid`: Grid for date headers
- `m_datesButtonGroup`: Button group for dates
- `m_props`: Calendar configuration properties
- `m_value`: Current calendar value
- `m_viewDate`: Current view date
- `m_depth`: Current depth of the calendar view
- `m_minDepth`: Minimum depth of the calendar view
- `m_minDate`: Minimum selectable date
- `m_maxDate`: Maximum selectable date

### Private Functions

#### configure(customProps)
Configures the calendar with default and custom properties.
- `customProps`: Object containing custom properties to override defaults

#### setupDOM()
Sets up the DOM structure for the calendar.

#### setupHeader()
Sets up the calendar header.

#### setupBody()
Sets up the calendar body.

#### setupFooter()
Sets up the calendar footer.

#### navigate(number)
Navigates the calendar by a specified number of units.
- `number`: Number of units to navigate

#### setupBodyContent()
Sets up the content of the calendar body based on the current view.

#### setHeaderButtonsEnabled()
Sets the enabled state of header buttons.

#### setHeaderButtonsText()
Sets the text of header buttons.

#### installDatesHeader()
Installs the header for dates view.

#### installDates()
Installs the dates in the calendar view.

#### generateDates(buttonGroup)
Generates date buttons for the calendar.
- `buttonGroup`: Button group configuration for dates

#### installMonths()
Installs the months in the calendar view.

#### generateMonths(buttonGroup)
Generates month buttons for the calendar.
- `buttonGroup`: Button group configuration for months

#### installYears()
Installs the years in the calendar view.

#### generateYears(buttonGroup)
Generates year buttons for the calendar.
- `buttonGroup`: Button group configuration for years

#### installDecades()
Installs the decades in the calendar view.

#### generateDecades(buttonGroup)
Generates decade buttons for the calendar.
- `buttonGroup`: Button group configuration for decades

#### isValidButton(value)
Checks if a date button is valid based on min and max dates.
- `value`: Date to check

#### buttonClick(context, buttonGroup)
Handles button clicks in the calendar.
- `context`: Click event context
- `buttonGroup`: Button group configuration

#### selectValue(button, ev)
Selects a value in the calendar.
- `button`: Selected button
- `ev`: Click event object

#### getDefaultValue()
Gets the default value for the calendar.

#### getInRangeDate(value)
Gets a date within the allowed range.
- `value`: Date to check and adjust if necessary

#### setValue(value)
Sets the calendar value.
- `value`: New calendar value

#### setViewDate(value)
Sets the view date of the calendar.
- `value`: New view date

#### setupComplete()
Calls the completion callback after setup is finished.

### m_props Configuration

The `m_props` object contains the following default properties:

- `tag`: String, default `"default"`
- `theme`: String, default `"default"`
- `headerButtonGroup`: Object, configuration for header buttons
- `datesHeader`: Object, configuration for dates header
- `format`: String, default `"M/D/YYYY"`
- `footer`: String, default `"dddd, MMMM D, YYYY"`
- `start`: String, default `"month"`
- `depth`: String, default `"month"`
- `min`: Date object, default `new Date(1900, 0, 1)`
- `max`: Date object, default `new Date(2099, 11, 31)`

Additional properties can be added or overridden when instantiating the Calendar class.

## CheckboxGroup

### Public Properties

- `clear`: Function to clear all checkbox selections
- `destroy`: Function to destroy the checkbox group
- `getParentTag`: Function to get the parent tag of the checkbox group
- `getTag`: Function to get a checkbox tag by ID
- `select`: Function to select checkboxes
- `setup`: Function to set up the checkbox group

### Public Methods (API)

#### setup(props)
Sets up the checkbox group with the given properties.
- `props`: Object containing checkbox group configuration

#### clear()
Clears all checkbox selections in the group.

#### destroy()
Destroys the checkbox group and removes it from the DOM.

#### getParentTag()
Returns the parent tag of the checkbox group.

#### getTag(context)
Returns a checkbox tag by its ID.
- `context`: Object containing the checkbox ID
  - `id`: String representing the checkbox ID

#### select(context)
Selects or gets selected checkboxes in the group.
- `context`: Object containing selection options
  - `id`: String or Array of strings representing checkbox ID(s) to select (optional)
  - `notTrigger`: Boolean indicating whether to trigger the click event (optional)

### Private Properties

- `m_checkboxList`: Array of checkbox instances in the group
- `m_parentTag`: Parent tag of the checkbox group
- `m_props`: Checkbox group configuration properties

### Private Functions

#### configure(customProps)
Configures the checkbox group with default and custom properties.
- `customProps`: Object containing custom properties to override defaults

#### setupDOM()
Sets up the DOM structure for the checkbox group.

#### processCheckbox(checkbox, index)
Processes and installs a checkbox in the group.
- `checkbox`: Object containing checkbox configuration
- `index`: Index of the checkbox in the group

#### handleGroupClick(context)
Handles the click event for checkboxes in the group.
- `context`: Object containing click event details

#### getTag(id)
Returns a checkbox tag by its ID.
- `id`: String representing the checkbox ID

#### getSelected()
Returns an array of selected checkboxes.

#### selectTag(tag, notTrigger)
Selects a checkbox tag.
- `tag`: Checkbox tag to select
- `notTrigger`: Boolean indicating whether to trigger the click event

#### destroyCheckboxGroup()
Destroys the checkbox group and removes it from the DOM.

#### setupComplete()
Calls the completion callback after setup is finished.

### m_props Configuration

The `m_props` object contains the following default properties:

- `tag`: String, default `"default"`
- `theme`: String, default `"default"`
- `name`: String, default randomly generated
- `checkboxes`: Array of checkbox configurations, default `[]`

Additional properties can be added or overridden when instantiating the CheckboxGroup class.

## Combobox

### Public Properties

- `destroy`: Function to destroy the combobox
- `getParentTag`: Function to get the parent tag of the combobox
- `getSelected`: Function to get the selected item
- `setup`: Function to set up the combobox
- `value`: Function to get or set the combobox value

### Public Methods (API)

#### setup(props)
Sets up the combobox with the given properties.
- `props`: Object containing combobox configuration

#### destroy()
Destroys the combobox and removes it from the DOM.

#### getParentTag()
Returns the parent tag of the combobox.

#### getSelected()
Returns the selected item in the combobox.

#### value(context)
Gets or sets the combobox value.
- `context`: Object containing the value to set (optional)
  - `value`: String representing the new combobox value

### Private Properties

- `m_parentTag`: Parent tag of the combobox
- `m_input`: Input component of the combobox
- `m_dropdownWrapperTag`: Wrapper tag for the dropdown
- `m_dropdown`: Dropdown component of the combobox
- `m_buttonGroup`: Button group for dropdown items
- `m_props`: Combobox configuration properties
- `m_comboBoxData`: Data for combobox items
- `m_value`: Current combobox value
- `m_previous_text`: Previous input text

### Private Functions

#### configure(customProps)
Configures the combobox with default and custom properties.
- `customProps`: Object containing custom properties to override defaults

#### setupDOM()
Sets up the DOM structure for the combobox.

#### setupInput()
Sets up the input component of the combobox.

#### setupDropdown()
Sets up the dropdown component of the combobox.

#### installButtonGroup(dropdown, data)
Installs the button group for dropdown items.
- `dropdown`: Dropdown component
- `data`: Array of combobox item data

#### processItemData(itemData)
Processes item data for the button group.
- `itemData`: Object or string representing an item

#### filterItems()
Filters combobox items based on input value.

#### setValue(value, ev)
Sets the combobox value.
- `value`: New combobox value
- `ev`: Event object (optional)

#### getItemDataId(itemData)
Gets the ID of an item from its data.
- `itemData`: Object or string representing an item

#### getItemDataText(itemData)
Gets the text of an item from its data.
- `itemData`: Object or string representing an item

#### handleKeyUp()
Handles key up event on the input.

#### handleBlur(ev)
Handles blur event on the input.
- `ev`: Blur event object

#### destroyComboBox()
Destroys the combobox and removes it from the DOM.

#### setupComplete()
Calls the completion callback after setup is finished.

### m_props Configuration

The `m_props` object contains the following default properties:

- `tag`: String, default `"default"`
- `theme`: String, default `"default"`
- `input`: Object, configuration for input component
- `dropdown`: Object, configuration for dropdown component
- `buttonGroup`: Object, configuration for button group
- `idField`: String, default `"id"`
- `textField`: String, default `"text"`
- `filter`: Boolean, default `true`
- `value`: String, default `""`

Additional properties can be added or overridden when instantiating the Combobox class.

## Checkbox

### Public Properties

- `destroy`: Function to destroy the checkbox
- `enable`: Function to enable or disable the checkbox
- `getId`: Function to get the checkbox ID
- `getParentTag`: Function to get the parent tag of the checkbox
- `select`: Function to select or deselect the checkbox
- `setup`: Function to set up the checkbox
- `value`: Function to get or set the checkbox value

### Public Methods (API)

#### setup(props)
Sets up the checkbox with the given properties.
- `props`: Object containing checkbox configuration

#### destroy()
Destroys the checkbox and removes it from the DOM.

#### enable(context)
Enables or disables the checkbox.
- `context`: Object containing enable options
  - `enable`: Boolean indicating whether to enable or disable the checkbox

#### getId()
Returns the checkbox ID.

#### getParentTag()
Returns the parent tag of the checkbox.

#### select(context)
Selects or deselects the checkbox, or gets the current selection state.
- `context`: Object containing selection options (optional)
  - `value`: Boolean indicating whether to select or deselect the checkbox
  - `notTrigger`: Boolean indicating whether to trigger the click event

#### value(context)
Gets or sets the checkbox value.
- `context`: Object containing the value to set (optional)
  - `value`: String representing the new checkbox value

### Private Properties

- `m_parentTag`: Parent tag of the checkbox
- `m_containerTag`: Container tag for the checkbox
- `m_inputTag`: Input tag of the checkbox
- `m_spanTag`: Span tag for the checkbox style
- `m_props`: Checkbox configuration properties
- `m_enabled`: Boolean indicating if the checkbox is enabled
- `m_checked`: Boolean indicating if the checkbox is checked

### Private Functions

#### configure(customProps)
Configures the checkbox with default and custom properties.
- `customProps`: Object containing custom properties to override defaults

#### setupDOM()
Sets up the DOM structure for the checkbox.

#### handleClick(ev)
Handles the click event on the checkbox.
- `ev`: Click event object

#### checkInput(value, notTrigger)
Checks or unchecks the checkbox input.
- `value`: Boolean indicating whether to check or uncheck
- `notTrigger`: Boolean indicating whether to trigger the click event

#### setEnable()
Sets the enabled/disabled state of the checkbox.

#### destroyCheckbox()
Destroys the checkbox and removes it from the DOM.

#### setupComplete()
Calls the completion callback after setup is finished.

### m_props Configuration

The `m_props` object contains the following default properties:

- `enable`: Boolean, default `true`
- `name`: String, default randomly generated
- `tag`: String, default `"default"`
- `theme`: String, default `"default"`

Additional properties can be added or overridden when instantiating the Checkbox class.

## DatePicker

### Public Properties

- `destroy`: Function to destroy the date picker
- `getParentTag`: Function to get the parent tag of the date picker
- `setup`: Function to set up the date picker
- `value`: Function to get or set the date picker value

### Public Methods (API)

#### setup(props)
Sets up the date picker with the given properties.
- `props`: Object containing date picker configuration

#### destroy()
Destroys the date picker and removes it from the DOM.

#### getParentTag()
Returns the parent tag of the date picker.

#### value(context)
Gets or sets the date picker value.
- `context`: Object containing the value to set (optional)
  - `value`: Date object or string representing the new date picker value

### Private Properties

- `m_parentTag`: Parent tag of the date picker
- `m_input`: Input component of the date picker
- `m_dropdownWrapperTag`: Wrapper tag for the dropdown
- `m_dropdown`: Dropdown component of the date picker
- `m_calendar`: Calendar component of the date picker
- `m_props`: Date picker configuration properties
- `m_value`: Current date picker value
- `m_previous_text`: Previous input text

### Private Functions

#### configure(customProps)
Configures the date picker with default and custom properties.
- `customProps`: Object containing custom properties to override defaults

#### setupDOM()
Sets up the DOM structure for the date picker.

#### setupInput()
Sets up the input component of the date picker.

#### setupDropdown()
Sets up the dropdown component of the date picker.

#### installCalendar(dropdown)
Installs the calendar component in the dropdown.
- `dropdown`: Dropdown component

#### setValue(value)
Sets the date picker value.
- `value`: New date picker value

#### handleBlur(ev)
Handles blur event on the input.
- `ev`: Blur event object

#### destroyDatePicker()
Destroys the date picker and removes it from the DOM.

#### setupComplete()
Calls the completion callback after setup is finished.

### m_props Configuration

The `m_props` object contains the following default properties:

- `theme`: String, default `"default"`
- `tag`: String, default `"default"`
- `input`: Object, configuration for input component
- `calendar`: Object, configuration for calendar component
- `format`: String, default `"M/D/YYYY"`
- `value`: Date object or null, default `null`
- `footer`: String, default `"dddd, MMMM D, YYYY"`
- `start`: String, default `"month"`
- `depth`: String, default `"month"`
- `min`: Date object, default `new Date(1900, 0, 1)`
- `max`: Date object, default `new Date(2099, 11, 31)`

Additional properties can be added or overridden when instantiating the DatePicker class.

## Dialog

### Public Properties

- `close`: Function to close the dialog
- `getParentTag`: Function to get the parent tag of the dialog
- `getBodyTag`: Function to get the body tag of the dialog
- `getHeaderTag`: Function to get the header tag of the dialog
- `setup`: Function to set up the dialog

### Public Methods (API)

#### setup(props)
Sets up the dialog with the given properties.
- `props`: Object containing dialog configuration

#### close()
Closes the dialog and removes it from the DOM.

#### getParentTag()
Returns the parent tag of the dialog.

#### getBodyTag()
Returns the body tag of the dialog.

#### getHeaderTag()
Returns the header tag of the dialog.

### Private Properties

- `m_props`: Dialog configuration properties
- `m_parentTag`: Parent tag of the dialog
- `m_dialogHdrTag`: Header tag of the dialog
- `m_dialogBodyTag`: Body tag of the dialog

### Private Functions

#### configure(customProps)
Configures the dialog with default and custom properties.
- `customProps`: Object containing custom properties to override defaults

#### setupDOM()
Sets up the DOM structure for the dialog.

#### installCloseButton(headerLeftTag)
Installs the close button in the dialog header.
- `headerLeftTag`: Left section of the header tag

#### closeDialog()
Closes the dialog.

#### close()
Removes the dialog from the DOM.

#### setupComplete()
Calls the completion callback after setup is finished.

### m_props Configuration

The `m_props` object contains the following default properties:

- `parentTag`: String, default `"body"`
- `closeButton`: Boolean, default `true`
- `closeText`: String, default `"close"`
- `theme`: String, default `"default"`
- `tag`: String, default `"default"`

Additional properties can be added or overridden when instantiating the Dialog class.

## DragDrop

### Public Properties

- `destroy`: Function to destroy the drag and drop component
- `getParentTag`: Function to get the parent tag of the component
- `setup`: Function to set up the drag and drop component

### Public Methods (API)

#### setup(props)
Sets up the drag and drop component with the given properties.
- `props`: Object containing drag and drop configuration

#### destroy()
Destroys the drag and drop component and removes it from the DOM.

#### getParentTag()
Returns the parent tag of the drag and drop component.

### Private Properties

- `m_parentTag`: Parent tag of the drag and drop component
- `m_props`: Drag and drop configuration properties

### Private Functions

#### configure(customProps)
Configures the drag and drop component with default and custom properties.
- `customProps`: Object containing custom properties to override defaults

#### setupDOM()
Sets up the DOM structure for the drag and drop component.

#### setupEventListener()
Sets up event listeners for drag and drop functionality.

#### handleMouseEnterLeave(ev)
Handles mouse enter and leave events.
- `ev`: Mouse event object

#### handleDragover(ev)
Handles dragover event.
- `ev`: Dragover event object

#### handleDrop(ev)
Handles drop event.
- `ev`: Drop event object

#### checkFileKindAllowed(type)
Checks if a file type is allowed for dropping.
- `type`: String representing the file type

#### destroyDragDrop()
Destroys the drag and drop component and removes it from the DOM.

#### setupComplete()
Calls the completion callback after setup is finished.

### m_props Configuration

The `m_props` object contains the following default properties:

- `dropText`: String, default `"Drop Here"`
- `tag`: String, default `"default"`
- `theme`: String, default `"default"`

Additional properties can be added or overridden when instantiating the DragDrop class.

## Draggable

### Public Properties

- `destroy`: Function to destroy the draggable component
- `enable`: Function to enable or disable dragging
- `getParentTag`: Function to get the parent tag of the component
- `getHandleWidth`: Function to get the width of the draggable handle
- `getHandleHeight`: Function to get the height of the draggable handle
- `setPosition`: Function to set the position of the draggable element
- `setup`: Function to set up the draggable component

### Public Methods (API)

#### setup(props)
Sets up the draggable component with the given properties.
- `props`: Object containing draggable configuration

#### destroy()
Destroys the draggable component and removes it from the DOM.

#### enable(enable)
Enables or disables dragging.
- `enable`: Boolean indicating whether to enable or disable dragging

#### getParentTag()
Returns the parent tag of the draggable component.

#### getHandleWidth()
Returns the width of the draggable handle.

#### getHandleHeight()
Returns the height of the draggable handle.

#### setPosition(xPos, yPos)
Sets the position of the draggable element.
- `xPos`: Number representing the x-position
- `yPos`: Number representing the y-position

### Private Properties

- `m_parentTag`: Parent tag of the draggable component
- `m_draggableTag`: Draggable element tag
- `m_props`: Draggable configuration properties
- `m_enable`: Boolean indicating if dragging is enabled
- `m_active`: Boolean indicating if dragging is active
- `m_axis`: Number indicating the drag axis (null: no axis, 0: x, 1: y)
- `m_initialX`: Initial x-position of the drag
- `m_initialY`: Initial y-position of the drag
- `m_xOffset`: X-offset of the draggable element
- `m_yOffset`: Y-offset of the draggable element
- `m_bounding`: Bounding rectangle for containment

### Private Functions

#### configure(customProps)
Configures the draggable component with default and custom properties.
- `customProps`: Object containing custom properties to override defaults

#### setupDOM()
Sets up the DOM structure for the draggable component.

#### setupEventHandler()
Sets up event handlers for dragging functionality.

#### dragStart(ev)
Handles the start of a drag operation.
- `ev`: Mouse or touch event object

#### dragEnd(ev)
Handles the end of a drag operation.
- `ev`: Mouse or touch event object

#### drag(ev)
Handles the drag operation.
- `ev`: Mouse or touch event object

#### getAxisStep(current, step, min, max)
Calculates the step for grid-based dragging.
- `current`: Current position
- `step`: Step size
- `min`: Minimum allowed position
- `max`: Maximum allowed position

#### setEnable(enable)
Sets the enabled state of the draggable component.
- `enable`: Boolean indicating whether to enable or disable dragging

#### destroyDraggable()
Destroys the draggable component and removes it from the DOM.

#### setupComplete()
Calls the completion callback after setup is finished.

### m_props Configuration

The `m_props` object contains the following default properties:

- `tag`: String, default `"default"`
- `theme`: String, default `"default"`
- `enable`: Boolean, default `true`

Additional properties can be added or overridden when instantiating the Draggable class.

## 11. Dropdown

### Properties (m_props)

- `tag` (string): Specifies the tag configuration to use.
- `theme` (string): Specifies the theme configuration to use.
- `css` (object): Contains CSS class names for various elements.
- `tags` (object): Contains tag configurations for different elements.
- `button` (object): Configuration for the dropdown button.
- `disableButton` (boolean): If true, disables the dropdown button.
- `positionTag` (HTMLElement): Reference to a tag used for positioning the dropdown.
- `fnOpen` (function): Callback function called when the dropdown is opened.
- `fnBeforeClose` (function): Callback function called before the dropdown is closed.
- `fnClose` (function): Callback function called when the dropdown is closed.
- `fnComplete` (function): Callback function called when the dropdown setup is complete.

### Private Properties

- `m_parentTag` (HTMLElement): Reference to the parent element.
- `m_dropdownContainerTag` (HTMLElement): Reference to the dropdown container element.
- `m_open` (boolean): Indicates whether the dropdown is open or closed.

### Public Methods

- `close(context)`: Closes the dropdown. `context` is an optional object with an `ev` property for the event that triggered the close.
- `destroy()`: Removes the dropdown from the DOM.
- `getContentTag()`: Returns the dropdown container element.
- `getParentTag()`: Returns the parent element of the dropdown.
- `open()`: Opens the dropdown.
- `setup(props)`: Initializes the dropdown with the given properties.

### Private Functions

- `configure(customProps)`: Merges default properties with custom properties.
- `setupDOM()`: Sets up the DOM structure for the dropdown.
- `setupOpenButton()`: Creates and configures the dropdown button.
- `setupContainer()`: Creates and configures the dropdown container.
- `setupEventHandler()`: Sets up event listeners for closing the dropdown when clicking outside.
- `openAnimation()`: Handles the animation and logic for opening the dropdown.
- `closeAnimation(ev)`: Handles the animation and logic for closing the dropdown. `ev` is the event that triggered the close.
- `setupComplete()`: Calls the completion callback function.

## 12. FileChooser

### Properties (m_props)

- `tag` (string): Specifies the tag configuration to use.
- `theme` (string): Specifies the theme configuration to use.
- `css` (object): Contains CSS class names for various elements.
- `button` (object): Configuration for the file chooser button.
- `input` (object): Configuration for the file input element.
- `buttonOnly` (boolean): If true, only shows a button instead of an input field.
- `fnUpload` (function): Callback function called when files are selected.
- `fnComplete` (function): Callback function called when the file chooser setup is complete.

### Private Properties

- `m_parentTag` (HTMLElement): Reference to the parent element.
- `m_inputTag` (HTMLElement): Reference to the file input element.

### Public Methods

- `destroy()`: Removes the file chooser from the DOM.
- `getInputTag()`: Returns the file input element.
- `getParentTag()`: Returns the parent element of the file chooser.
- `setup(props)`: Initializes the file chooser with the given properties.

### Private Functions

- `configure(customProps)`: Merges default properties with custom properties.
- `setupDOM()`: Sets up the DOM structure for the file chooser.
- `installButton()`: Creates and configures the file chooser button.
- `installInput(hidden)`: Creates and configures the file input element. If `hidden` is true, the input is hidden.
- `setupComplete()`: Calls the completion callback function.

## 13. Grid

### Properties (m_props)

- `tag` (string): Specifies the tag configuration to use.
- `theme` (string): Specifies the theme configuration to use.
- `css` (object): Contains CSS class names for various elements.
- `tags` (object): Contains tag configurations for different elements.
- `id` (string): Unique identifier for the grid.
- `data` (array): The data to be displayed in the grid.
- `columns` (array): Configuration for grid columns.
- `layout` (string): Specifies the grid layout ('grid' or 'tile').
- `maxColWidth` (boolean): If true, sets a maximum width for columns.
- `colWidthAdj` (number): Adjustment value for column widths.
- `tileHTML` (string): HTML template for tile layout.
- `fnPostRow` (function): Callback function called after each row is processed.
- `fnPostTile` (function): Callback function called after each tile is processed.
- `fnComplete` (function): Callback function called when the grid setup is complete.

### Private Properties

- `m_colsMaxPxWidth` (array): Stores the maximum width for each column.
- `m_componentsMapById` (object): Maps grid components by their IDs.
- `m_componentsMapByColNbr` (array): Maps grid components by column number.
- `m_gridWrapperTag` (HTMLElement): Reference to the grid wrapper element.
- `m_gridHdrTag` (HTMLElement): Reference to the grid header element.
- `m_gridBodyTag` (HTMLElement): Reference to the grid body element.
- `m_gridBodyRowTagName` (string): Tag name for grid body rows.
- `m_rowIndexAttrName` (string): Attribute name for row index.
- `m_parentTag` (HTMLElement): Reference to the parent element.
- `m_tileParentTag` (HTMLElement): Reference to the parent element for tiles.
- `m_tileParentTags` (array): Array of tile parent elements.
- `m_gridData` (array): Stores the grid data.
- `m_gridDataChanged` (boolean): Indicates if the grid data has changed.
- `m_colStylesId` (string): ID for column styles.
- `m_tileIndexAttrName` (string): Attribute name for tile index.

### Public Methods

- `commitDataChange()`: Commits changes made to the grid data.
- `dataChanged()`: Returns whether the grid data has changed.
- `getCellComponentByIdByRow(context)`: Returns a cell component by ID and row. `context` is an object with `columnId` and `rowIndex` properties.
- `getCellComponentsById()`: Returns all cell components mapped by their IDs.
- `getCellComponentByColNbrByRow(context)`: Returns a cell component by column number and row. `context` is an object with `colNbr` and `rowIndex` properties.
- `getCellComponentsByColNbr()`: Returns all cell components mapped by column number.
- `getGridData()`: Returns the current grid data.
- `getId()`: Returns the grid's ID.
- `getRowIndex(context)`: Returns the row index for a given row element. `context` is an object with a `rowTag` property.
- `removeColsStyles()`: Removes column styles from the DOM.
- `setup(props)`: Initializes the grid with the given properties.

### Private Functions

- `configure(customProps)`: Merges default properties with custom properties.
- `setupDOM()`: Sets up the DOM structure for the grid.
- `setupTilesDOM()`: Sets up the DOM structure for tile layout.
- `setupGridDOM()`: Sets up the DOM structure for grid layout.
- `installHdr()`: Installs the grid header.
- `installRows()`: Installs the grid rows.
- `processRow(rowData, rowIndex)`: Processes a single row of data.
- `installCell(context)`: Installs a cell based on its type. `context` is an object containing column and row information.
- `addComponentToMap(context)`: Adds a component to the component maps. `context` is an object with `column`, `colIndex`, and `component` properties.
- `saveCellTagWidth(context)`: Saves the width of a cell. `context` is an object with `colIndex`, `tag`, and `parentTag` properties.
- `setColsWidth()`: Sets the width for all columns.
- `validateGridData()`: Validates the grid data.
- `setupComplete()`: Calls the completion callback function.

## 14. Input

### Properties (m_props)

- `tag` (string): Specifies the tag configuration to use.
- `theme` (string): Specifies the theme configuration to use.
- `css` (object): Contains CSS class names for various elements.
- `tags` (object): Contains tag configurations for different elements.
- `name` (string): Name attribute for the input element.
- `value` (string): Initial value of the input.
- `labelText` (string): Text for the input label.
- `hidden` (boolean): If true, hides the input.
- `enableClear` (boolean): If true, adds a clear button to the input.
- `button` (object): Configuration for the clear button.
- `validate` (object): Configuration for input validation.
- `fnBlur` (function): Callback function for blur event.
- `fnChange` (function): Callback function for change event.
- `fnKeyup` (function): Callback function for keyup event.
- `fnClear` (function): Callback function for clear button click.
- `fnDataValidationChange` (function): Callback function for data validation changes.
- `fnComplete` (function): Callback function called when the input setup is complete.

### Private Properties

- `m_parentTag` (HTMLElement): Reference to the parent element.
- `m_inputTag` (HTMLElement): Reference to the input element.
- `m_labelTag` (HTMLElement): Reference to the label element.
- `m_button` (object): Reference to the clear button component.
- `m_dataChanged` (boolean): Indicates if the input data has changed.

### Public Methods

- `clear()`: Clears the input value.
- `commitDataChange()`: Resets the data changed flag.
- `dataChanged()`: Returns whether the input data has changed.
- `getTag()`: Returns the input element.
- `setup(props)`: Initializes the input with the given properties.
- `value(context)`: Gets or sets the input value. If `context.value` is provided, it sets the value; otherwise, it returns the current value.

### Private Functions

- `configure(customProps)`: Merges default properties with custom properties.
- `setupDOM()`: Sets up the DOM structure for the input.
- `installClearInput()`: Installs the clear button if enabled.
- `handleOnBlur(ev)`: Handles the blur event.
- `handleOnChange(ev)`: Handles the change event.
- `handleOnKeyup(ev)`: Handles the keyup event.
- `validate(ev)`: Performs input validation.
- `validateMinLength(config, ev)`: Validates minimum length of input.
- `setupComplete()`: Calls the completion callback function.

## 15. Listbox

### Properties (m_props)

- `tag` (string): Specifies the tag configuration to use.
- `theme` (string): Specifies the theme configuration to use.
- `css` (object): Contains CSS class names for various elements.
- `tags` (object): Contains tag configurations for different elements.
- `displayKey` (string): Key to use for displaying item text.
- `data` (array): Array of items to display in the listbox.
- `fnSelect` (function): Callback function for item selection.
- `fnHover` (function): Callback function for item hover.
- `fnLeave` (function): Callback function for item leave.
- `fnComplete` (function): Callback function called when the listbox setup is complete.

### Private Properties

- `m_parentTag` (HTMLElement): Reference to the parent element.
- `m_listboxContainerTag` (HTMLElement): Reference to the listbox container element.
- `m_listboxData` (array): Stores the listbox data.

### Public Methods

- `addToList(data)`: Adds new items to the listbox.
- `destroy()`: Removes the listbox from the DOM.
- `replaceList(data)`: Replaces the entire list with new data.
- `setup(props)`: Initializes the listbox with the given properties.

### Private Functions

- `configure(customProps)`: Merges default properties with custom properties.
- `setupDOM()`: Sets up the DOM structure for the listbox.
- `installItems(data)`: Installs listbox items from the provided data.
- `processItem(itemData)`: Processes a single item and adds it to the listbox.
- `setupItemEventListeners(item, data)`: Sets up event listeners for a listbox item.
- `clearData()`: Clears all items from the listbox.
- `setupComplete()`: Calls the completion callback function.

## 16. MapBox

### Properties (m_props)

- `tag` (string): Specifies the tag configuration to use.
- `theme` (string): Specifies the theme configuration to use.
- `css` (object): Contains CSS class names for various elements.
- `tags` (object): Contains tag configurations for different elements.
- `accessToken` (string): Mapbox access token.
- `mapStyle` (string): Mapbox map style URL.
- `zoom` (number): Initial zoom level of the map.
- `marker` (object): Configuration for map markers.
- `controls` (object): Configuration for map controls (fullscreen, navigation, search).
- `fnComplete` (function): Callback function called when the map setup is complete.

### Private Properties

- `m_parentTag` (HTMLElement): Reference to the parent element.
- `m_containerTag` (HTMLElement): Reference to the map container element.
- `m_map` (object): Mapbox map instance.
- `m_markers` (array): Array of map markers.

### Public Methods

- `addPoints(points)`: Adds markers to the map. `points` is an array of coordinate objects.
- `fitBounds(props)`: Fits the map view to the given bounds. `props` is an object with `southwestern` and `northeastern` coordinates.
- `getMarker(coords)`: Returns a marker at the given coordinates.
- `getMarkers()`: Returns all markers on the map.
- `jumpTo(lng, lat)`: Moves the map to the specified coordinates.
- `setup(props)`: Initializes the map with the given properties.

### Private Functions

- `configure(customProps)`: Merges default properties with custom properties.
- `setupDOM()`: Sets up the DOM structure for the map.
- `getUserLocation()`: Attempts to get the user's current location.
- `renderMap()`: Creates and renders the Mapbox map.
- `addCurrentPositionMarked(lng, lat)`: Adds a marker for the current position.
- `setMarker(arrCoords, marker)`: Adds markers to the map.
- `onMoveEnd(done)`: Sets up a callback for when the map stops moving.
- `removeWait()`: Removes the waiting state from the map container.
- `checkMapboxLibraries()`: Checks if required Mapbox libraries are loaded.
- `setupComplete()`: Calls the completion callback function.

## 17. Percentage

### Properties (m_props)

- `tag` (string): Specifies the tag configuration to use.
- `theme` (string): Specifies the theme configuration to use.
- `css` (object): Contains CSS class names for various elements.
- `tags` (object): Contains tag configurations for different elements.
- `value` (number): Initial percentage value.
- `min` (number): Minimum value (default: 0).
- `max` (number): Maximum value (default: 1).
- `decimals` (number): Number of decimal places to display.
- `ranges` (array): Array of range objects for styling based on value.
- `fnComplete` (function): Callback function called when the percentage setup is complete.

### Private Properties

- `m_parentTag` (HTMLElement): Reference to the parent element.
- `m_percentageBarTag` (HTMLElement): Reference to the percentage bar element.
- `m_percentageTextTag` (HTMLElement): Reference to the percentage text element.
- `m_value` (number): Current percentage value.
- `m_enable` (boolean): Indicates if the percentage component is enabled.

### Public Methods

- `destroy()`: Removes the percentage component from the DOM.
- `enable(enable)`: Enables or disables the percentage component.
- `getParentTag()`: Returns the parent element of the percentage component.
- `setup(props)`: Initializes the percentage component with the given properties.
- `value(context)`: Gets or sets the percentage value. If `context.value` is provided, it sets the value; otherwise, it returns the current value.

### Private Functions

- `configure(customProps)`: Merges default properties with custom properties.
- `setupDOM()`: Sets up the DOM structure for the percentage component.
- `installLayers()`: Creates and installs the different layers of the percentage component.
- `setValue(value)`: Sets the percentage value and updates the display.
- `setText()`: Updates the displayed percentage text.
- `setBarWidth()`: Updates the width of the percentage bar.
- `setRange()`: Applies CSS classes based on the current value and defined ranges.
- `clearRangeClasses()`: Removes all range-related CSS classes.
- `setEnable()`: Applies or removes the disabled CSS class based on the enabled state.
- `setupComplete()`: Calls the completion callback function.

## 18. Player

### Properties (m_props)

- `tag` (string): Specifies the tag configuration to use.
- `theme` (string): Specifies the theme configuration to use.
- `css` (object): Contains CSS class names for various elements.
- `tags` (object): Contains tag configurations for different elements.
- `progressBar` (boolean): If true, shows a progress bar.
- `controls` (array): Configuration for player controls.
- `fnComplete` (function): Callback function called when the player setup is complete.

### Private Properties

- `m_buttonGroups` (array): Array of button group components.
- `m_timeInfo` (object): Stores time information for the player.
- `m_progressBar` (object): Reference to the progress bar component.
- `m_parentTag` (HTMLElement): Reference to the parent element.
- `m_playerTag` (HTMLElement): Reference to the player element.

### Public Methods

- `getTag()`: Returns the player element.
- `setup(props)`: Initializes the player with the given properties.

### Private Functions

- `configure(customProps)`: Merges default properties with custom properties.
- `setupDOM()`: Sets up the DOM structure for the player.
- `setupComplete()`: Calls the completion callback function.

## 19. Radio

### Properties (m_props)

- `tag` (string): Specifies the tag configuration to use.
- `theme` (string): Specifies the theme configuration to use.
- `css` (object): Contains CSS class names for various elements.
- `tags` (object): Contains tag configurations for different elements.
- `id` (string): Unique identifier for the radio button.
- `name` (string): Name attribute for the radio input.
- `text` (string): Label text for the radio button.
- `value` (string): Value of the radio button.
- `enable` (boolean): If true, the radio button is enabled.
- `fnClick` (function): Callback function for click event.
- `fnGroupClick` (function): Callback function for group click event.
- `fnComplete` (function): Callback function called when the radio setup is complete.

### Private Properties

- `m_parentTag` (HTMLElement): Reference to the parent element.
- `m_labelTag` (HTMLElement): Reference to the label element.
- `m_inputTag` (HTMLElement): Reference to the input element.
- `m_spanTag` (HTMLElement): Reference to the span element (for styling).
- `m_enable` (boolean): Indicates if the radio button is enabled.
- `m_checked` (boolean): Indicates if the radio button is checked.

### Public Methods

- `destroy()`: Removes the radio button from the DOM.
- `enable({ enable })`: Enables or disables the radio button.
- `getId()`: Returns the radio button's ID.
- `getParentTag()`: Returns the parent element of the radio button.
- `select(context)`: Gets or sets the checked state of the radio button. If `context.value` is provided, it sets the state; otherwise, it returns the current state.
- `setup(props)`: Initializes the radio button with the given properties.
- `value(context)`: Gets or sets the radio button value. If `context.value` is provided, it sets the value; otherwise, it returns the current value.

### Private Functions

- `configure(customProps)`: Merges default properties with custom properties.
- `setupDOM()`: Sets up the DOM structure for the radio button.
- `handleClick(ev)`: Handles the click event on the radio button.
- `checkInput(value, notTrigger)`: Updates the checked state of the radio button.
- `setEnable()`: Applies or removes the disabled CSS class based on the enabled state.
- `setupComplete()`: Calls the completion callback function.

## 20. RadioGroup

### Properties (m_props)

- `tag` (string): Specifies the tag configuration to use.
- `theme` (string): Specifies the theme configuration to use.
- `css` (object): Contains CSS class names for various elements.
- `name` (string): Name attribute for the radio group.
- `radios` (array): Array of radio button configurations.
- `radio` (object): Default configuration for radio buttons.
- `fnClick` (function): Callback function for individual radio button clicks.
- `fnGroupClick` (function): Callback function for group-level clicks.
- `fnComplete` (function): Callback function called when the radio group setup is complete.

### Private Properties

- `m_radioList` (array): Array of radio button components.
- `m_parentTag` (HTMLElement): Reference to the parent element.

### Public Methods

- `clear()`: Deselects all radio buttons in the group.
- `destroy()`: Removes the radio group from the DOM.
- `getParentTag()`: Returns the parent element of the radio group.
- `getTag(context)`: Returns a radio button by ID. `context` is an object with an `id` property.
- `select(context)`: Selects radio button(s) or returns the selected radio button(s). `context` can have `id` (string or array) and `notTrigger` (boolean) properties.
- `setup(props)`: Initializes the radio group with the given properties.

### Private Functions

- `configure(customProps)`: Merges default properties with custom properties.
- `setupDOM()`: Sets up the DOM structure for the radio group.
- `processRadio(radio, index)`: Processes and creates a single radio button.
- `handleGroupClick(context)`: Handles clicks on individual radio buttons within the group.
- `getTag(id)`: Returns a radio button component by ID.
- `getSelected()`: Returns an array of selected radio buttons.
- `selectTag(tag, notTrigger)`: Selects a specific radio button.
- `deselectRadios()`: Deselects all radio buttons in the group.
- `setupComplete()`: Calls the completion callback function.

## 21. Rating

### Properties (m_props)

- `tag` (string): Specifies the tag configuration to use.
- `theme` (string): Specifies the theme configuration to use.
- `css` (object): Contains CSS class names for various elements.
- `tags` (object): Contains tag configurations for different elements.
- `value` (number): Initial rating value.
- `max` (number): Maximum rating value (number of stars).
- `enable` (boolean): If true, the rating component is interactive.
- `fnSelect` (function): Callback function when a rating is selected.
- `fnComplete` (function): Callback function called when the rating setup is complete.

### Private Properties

- `m_parentTag` (HTMLElement): Reference to the parent element.
- `m_ratingEmptyTag` (HTMLElement): Reference to the empty stars container.
- `m_ratingSelectedTag` (HTMLElement): Reference to the selected stars container.
- `m_ratingHoverTag` (HTMLElement): Reference to the hover stars container.
- `m_value` (number): Current rating value.
- `m_enable` (boolean): Indicates if the rating component is enabled.

### Public Methods

- `destroy()`: Removes the rating component from the DOM.
- `enable(enable)`: Enables or disables the rating component.
- `getParentTag()`: Returns the parent element of the rating component.
- `setup(props)`: Initializes the rating component with the given properties.
- `value(context)`: Gets or sets the rating value. If `context.value` is provided, it sets the value; otherwise, it returns the current value.

### Private Functions

- `configure(customProps)`: Merges default properties with custom properties.
- `setupDOM()`: Sets up the DOM structure for the rating component.
- `installLayers()`: Creates and installs the different layers of the rating component.
- `installStars()`: Creates and installs individual star elements.
- `setupEventListener()`: Sets up event listeners for the rating component.
- `selectValue(ev)`: Handles the selection of a rating value.
- `setHoverValue(ev)`: Handles the hover effect on the rating stars.
- `hideHoverLayer(ev)`: Hides the hover layer when the mouse leaves the component.
- `getStarWidth()`: Calculates the width of a single star.
- `getLeftPosition(ev)`: Calculates the left position of the mouse relative to the component.
- `getHoverValue(ev)`: Calculates the rating value based on the mouse position.
- `setValue(value)`: Sets the rating value and updates the display.
- `setEnable()`: Applies or removes the disabled CSS class based on the enabled state.
- `setupComplete()`: Calls the completion callback function.

## 23. Slideout

### Properties (m_props)

- `tag` (string): Specifies the tag name for the component.
- `theme` (string): Specifies the theme name for the component.
- `enableCloseButton` (boolean): Determines if a close button should be displayed.
- `tags` (object): Contains tag configurations for various elements of the slideout.
- `css` (object): Contains CSS class names for styling the slideout.
- `closeButton` (object): Configuration for the close button.
- `fnOpen` (function): Callback function called when the slideout is opened.
- `fnClose` (function): Callback function called when the slideout is closed.
- `fnComplete` (function): Callback function called when the slideout setup is complete.

### Private Properties

- `m_parentTag`: The parent element of the slideout.
- `m_slideoutHeaderTag`: The header element of the slideout.
- `m_slideoutBodyTag`: The body element of the slideout.
- `m_slideoutOverlayTag`: The overlay element of the slideout.

### Public Methods

- `close()`: Closes the slideout.
- `destroy()`: Removes the slideout from the DOM.
- `getContentTag()`: Returns the slideout element.
- `getHeaderTag()`: Returns the header element of the slideout.
- `getBodyTag()`: Returns the body element of the slideout.
- `open()`: Opens the slideout.
- `setup(props)`: Sets up the slideout with the given properties.

### Private Functions

- `setup(props)`: Initializes the slideout with the given properties.
- `setupDOM()`: Creates and sets up the DOM structure for the slideout.
- `installCloseButton()`: Installs the close button if enabled.
- `openAnimation()`: Handles the opening animation of the slideout.
- `closeAnimation()`: Handles the closing animation of the slideout.
- `destroySlideout()`: Removes the slideout from the DOM.
- `setupComplete()`: Calls the completion callback function.
- `configure(customProps)`: Configures the slideout properties.

## 24. Slider

### Properties (m_props)

- `tag` (string): Specifies the tag name for the component.
- `theme` (string): Specifies the theme name for the component.
- `value` (number): The initial value of the slider.
- `min` (number): The minimum value of the slider.
- `max` (number): The maximum value of the slider.
- `step` (number): The step size between values.
- `largeStep` (number): The step size for large increments.
- `orientation` (string): The orientation of the slider ("horizontal" or "vertical").
- `enable` (boolean): Determines if the slider is enabled.
- `showButtons` (boolean): Determines if increment/decrement buttons should be shown.
- `tags` (object): Contains tag configurations for various elements of the slider.
- `css` (object): Contains CSS class names for styling the slider.
- `decreaseButton` (object): Configuration for the decrease button.
- `increaseButton` (object): Configuration for the increase button.
- `fnSelect` (function): Callback function called when a value is selected.
- `fnSlideStart` (function): Callback function called when sliding starts.
- `fnSlide` (function): Callback function called during sliding.
- `fnComplete` (function): Callback function called when the slider setup is complete.

### Private Properties

- `m_parentTag`: The parent element of the slider.
- `m_wrapperTag`: The wrapper element of the slider.
- `m_trackTag`: The track element of the slider.
- `m_selectionTag`: The selection element of the slider.
- `m_draggable`: The draggable handle of the slider.
- `m_stepTags`: An array of step elements.
- `m_horizontal`: Boolean indicating if the slider is horizontal.
- `m_css`: CSS classes for the current orientation.
- `m_enable`: Boolean indicating if the slider is enabled.
- `m_value`: The current value of the slider.
- `m_stepLength`: The length of each step.

### Public Methods

- `destroy()`: Removes the slider from the DOM.
- `enable(context)`: Enables or disables the slider.
- `getParentTag()`: Returns the slider element.
- `setup(props)`: Sets up the slider with the given properties.
- `value(context)`: Gets or sets the value of the slider.

### Private Functions

- `setup(props)`: Initializes the slider with the given properties.
- `setupDOM()`: Creates and sets up the DOM structure for the slider.
- `continueSetupDOM()`: Continues setting up the DOM structure.
- `installDecreaseButton()`: Installs the decrease button.
- `installIncreaseButton()`: Installs the increase button.
- `installButton(config, css, fnClick)`: Installs a button with the given configuration.
- `installTrack()`: Installs the track and selection elements.
- `installSteps()`: Installs the step elements.
- `installHandle()`: Installs the draggable handle.
- `updateValue(context)`: Updates the slider value.
- `updateSelection(context)`: Updates the selection position.
- `getSelectedIndex()`: Gets the index of the currently selected step.
- `setEnable(enable)`: Enables or disables the slider.
- `setValue(value)`: Sets the value of the slider.
- `setHandlePosition()`: Sets the position of the handle.
- `setSelectionPosition()`: Sets the position of the selection.
- `getValidValue(value)`: Gets a valid value within the slider's range.
- `setupComplete()`: Calls the completion callback function.
- `configure(customProps)`: Configures the slider properties.

## 25. Switch

### Properties (m_props)

- `tag` (string): Specifies the tag name for the component.
- `theme` (string): Specifies the theme name for the component.
- `enable` (boolean): Determines if the switch is enabled.
- `checked` (boolean): Determines if the switch is checked.
- `messages` (object): Contains text messages for the switch states.
  - `checked` (string): Text for the checked state.
  - `unchecked` (string): Text for the unchecked state.
- `tags` (object): Contains tag configurations for various elements of the switch.
- `css` (object): Contains CSS class names for styling the switch.
- `fnChange` (function): Callback function called when the switch state changes.
- `fnComplete` (function): Callback function called when the switch setup is complete.

### Private Properties

- `m_parentTag`: The parent element of the switch.
- `m_inputTag`: The input element of the switch.
- `m_containerTag`: The container element of the switch.
- `m_enable`: Boolean indicating if the switch is enabled.
- `m_checked`: Boolean indicating if the switch is checked.

### Public Methods

- `check(context)`: Checks or unchecks the switch.
- `checked()`: Returns the current checked state of the switch.
- `configure(customProps)`: Configures the switch properties.
- `destroy()`: Removes the switch from the DOM.
- `enable(context)`: Enables or disables the switch.
- `getParentTag()`: Returns the switch element.
- `setup(props)`: Sets up the switch with the given properties.
- `toggle()`: Toggles the switch state.

### Private Functions

- `setup(props)`: Initializes the switch with the given properties.
- `setupDOM()`: Creates and sets up the DOM structure for the switch.
- `installLabels()`: Installs the labels for the switch states.
- `setupEventListener()`: Sets up the click event listener.
- `setEnable()`: Sets the enabled/disabled state of the switch.
- `handleClick(ev)`: Handles the click event on the switch.
- `toggleSwitch(ev)`: Toggles the switch state.
- `setChecked(ev)`: Sets the checked state and triggers the change callback.
- `setupComplete()`: Calls the completion callback function.
- `configure(customProps)`: Configures the switch properties.

## 26. Tab

### Properties (m_props)

- `tag` (string): Specifies the tag name for the component.
- `theme` (string): Specifies the theme name for the component.
- `tabs` (object): Configuration for the tab buttons.
- `contents` (array): Array of content elements for each tab.
- `tags` (object): Contains tag configurations for various elements of the tab component.
- `css` (object): Contains CSS class names for styling the tab component.
- `fnTabComplete` (function): Callback function called when a tab is completed.
- `fnComplete` (function): Callback function called when the tab setup is complete.

### Private Properties

- `m_parentTag`: The parent element of the tab component.
- `m_tabsTag`: The container element for the tab buttons.
- `m_tabsGroup`: The button group for the tab buttons.
- `m_contentTag`: The container element for the tab contents.
- `m_contentTagsMap`: An object mapping tab IDs to their content elements.
- `m_selectedId`: The ID of the currently selected tab.

### Public Methods

- `setup(props)`: Sets up the tab component with the given properties.

### Private Functions

- `setup(props)`: Initializes the tab component with the given properties.
- `setupDOM()`: Creates and sets up the DOM structure for the tab component.
- `installTabs()`: Installs the tab buttons.
- `installContent()`: Installs the content for each tab.
- `toggleTabContent(clickedBtn)`: Toggles the visibility of tab content when a tab is clicked.
- `setupComplete()`: Calls the completion callback function.
- `configure(customProps)`: Configures the tab component properties.

## 27. Textarea

### Properties (m_props)

- `tag` (string): Specifies the tag name for the component.
- `theme` (string): Specifies the theme name for the component.
- `name` (string): The name attribute for the textarea.
- `value` (string): The initial value of the textarea.
- `labelText` (string): The text for the label element.
- `hidden` (boolean): Determines if the textarea should be hidden.
- `enableClear` (boolean): Determines if a clear button should be shown.
- `button` (object): Configuration for the clear button.
- `validate` (object): Configuration for validation rules.
- `tags` (object): Contains tag configurations for various elements of the textarea.
- `css` (object): Contains CSS class names for styling the textarea.
- `fnBlur` (function): Callback function called on blur event.
- `fnChange` (function): Callback function called on change event.
- `fnKeyup` (function): Callback function called on keyup event.
- `fnClear` (function): Callback function called when the textarea is cleared.
- `fnDataValidationChange` (function): Callback function called when data validation changes.
- `fnComplete` (function): Callback function called when the textarea setup is complete.

### Private Properties

- `m_parentTag`: The parent element of the textarea.
- `m_textareaTag`: The textarea element.
- `m_labelTag`: The label element for the textarea.
- `m_button`: The clear button element.
- `m_dataChanged`: Boolean indicating if the data has changed due to validation.

### Public Methods

- `clear()`: Clears the textarea.
- `commitDataChange()`: Resets the data changed flag.
- `dataChanged()`: Returns whether the data has changed due to validation.
- `getTag()`: Returns the textarea element.
- `setup(props)`: Sets up the textarea with the given properties.
- `value(context)`: Gets or sets the value of the textarea.

### Private Functions

- `setup(props)`: Initializes the textarea with the given properties.
- `setupDOM()`: Creates and sets up the DOM structure for the textarea.
- `installClearTextarea()`: Installs the clear button if enabled.
- `handleOnBlur(ev)`: Handles the blur event.
- `handleOnChange(ev)`: Handles the change event.
- `handleOnKeyup(ev)`: Handles the keyup event.
- `validate(ev)`: Performs validation on the textarea value.
- `validateMinLength(config, ev)`: Validates the minimum length of the textarea value.
- `clearTextarea()`: Clears the textarea value.
- `setupComplete()`: Calls the completion callback function.
- `configure(customProps)`: Configures the textarea properties.

## 28. TimePicker

### Properties (m_props)

- `tag` (string): Specifies the tag name for the component.
- `theme` (string): Specifies the theme name for the component.
- `combobox` (object): Configuration for the combobox component.
- `value` (string): The initial value of the time picker.
- `interval` (number): The interval between time options in minutes.
- `format` (string): The format string for displaying time.
- `min` (Date): The minimum selectable time.
- `max` (Date): The maximum selectable time.
- `tags` (object): Contains tag configurations for various elements of the time picker.
- `css` (object): Contains CSS class names for styling the time picker.
- `fnSelect` (function): Callback function called when a time is selected.
- `fnComplete` (function): Callback function called when the time picker setup is complete.

### Private Properties

- `m_parentTag`: The parent element of the time picker.
- `m_comboBox`: The combobox component used for time selection.
- `m_value`: The current selected time value.

### Public Methods

- `destroy()`: Removes the time picker from the DOM.
- `getParentTag()`: Returns the time picker element.
- `setup(props)`: Sets up the time picker with the given properties.
- `value(context)`: Gets or sets the value of the time picker.

### Private Functions

- `setup(props)`: Initializes the time picker with the given properties.
- `setupDOM()`: Creates and sets up the DOM structure for the time picker.
- `setupComboBox()`: Sets up the combobox component for time selection.
- `createComboBoxData()`: Creates the data for the combobox options.
- `selectTime(context)`: Handles the time selection.
- `setValue(value)`: Sets the value of the time picker.
- `setupComplete()`: Calls the completion callback function.
- `configure(customProps)`: Configures the time picker properties.

## 29. TreeView

### Properties (m_props)

- `tag` (string): Specifies the tag name for the component.
- `theme` (string): Specifies the theme name for the component.
- `data` (array): The tree data structure.
- `idField` (string): The field name for item IDs.
- `textField` (string): The field name for item text.
- `itemsField` (string): The field name for child items.
- `itemIdAttrName` (string): The attribute name for storing item IDs in the DOM.
- `expanded` (boolean): Determines if tree nodes should be expanded by default.
- `tags` (object): Contains tag configurations for various elements of the tree view.
- `css` (object): Contains CSS class names for styling the tree view.
- `fnSelect` (function): Callback function called when an item is selected.
- `fnComplete` (function): Callback function called when the tree view setup is complete.

### Private Properties

- `m_parentTag`: The parent element of the tree view.
- `m_dataMapById`: An object mapping item IDs to their data.

### Public Methods

- `destroy()`: Removes the tree view from the DOM.
- `getItemData(tag)`: Returns the data for a given item tag.
- `getParentTag()`: Returns the tree view element.
- `setup(props)`: Sets up the tree view with the given properties.

### Private Functions

- `setup(props)`: Initializes the tree view with the given properties.
- `setupDOM()`: Creates and sets up the DOM structure for the tree view.
- `processTreeData(groupData, parentTag)`: Processes the tree data and creates the DOM structure.
- `processItem(itemData, parentTag)`: Processes a single item and creates its DOM structure.
- `processGroup(groupData, parentTag)`: Processes a group of items and creates its DOM structure.
- `installIcon(parentTag, groupTag, itemData)`: Installs the expand/collapse icon for a group.
- `clearSelected()`: Clears the selected state from all items.
- `setupItemEventListeners(inTag, itemData)`: Sets up event listeners for an item.
- `toggleExpand(groupTag, iconTag)`: Toggles the expanded state of a group.
- `setupComplete()`: Calls the completion callback function.
- `configure(customProps)`: Configures the tree view properties.

## 30. VideoPlayer

### Properties (m_props)

- `tag` (string): Specifies the tag name for the component.
- `theme` (string): Specifies the theme name for the component.
- `player` (object): Configuration for the video player.
  - `attr` (object): Attributes for the video element.
	- `controls` (boolean): Determines if player controls should be shown.
- `tags` (object): Contains tag configurations for various elements of the video player.
- `css` (object): Contains CSS class names for styling the video player.
- `fnComplete` (function): Callback function called when the video player setup is complete.

### Private Properties

- `m_parentTag`: The parent element of the video player.
- `m_player`: The video player instance.

### Public Methods

- `getPlayer()`: Returns the video player instance.
- `getPlayerTag()`: Returns the video element.
- `setup(props)`: Sets up the video player with the given properties.

### Private Functions

- `setup(props)`: Initializes the video player with the given properties.
- `setupDOM()`: Creates and sets up the DOM structure for the video player.
- `setupComplete()`: Calls the completion callback function.
- `configure(customProps)`: Configures the video player properties.
