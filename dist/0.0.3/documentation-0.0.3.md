<!--
******************************************
*  Copyright 2025 Alejandro Sebastian Scotti, Scotti Corp.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License.
*
*  @version 0.0.3
******************************************
-->

# MAMBO.JS - UI Components Documentation - Version 0.0.3

### Table of Contents

1. [Button](#button)
2. [ButtonSVG](#buttonsvg)
3. [ButtonGroup](#buttongroup)
4. [Calendar](#calendar)
5. [Card](#card)
5. [Combobox](#combobox)
6. [Checkbox](#checkbox)
7. [CheckboxGroup](#checkboxgroup)
8. [DatePicker](#datepicker)
9. [Dialog](#dialog)
10. [DragDrop](#dragdrop)
11. [Draggable](#draggable)
12. [Dropdown](#dropdown)
13. [FileChooser](#filechooser)
14. [Grid](#grid)
15. [Input](#input)
16. [Listbox](#listbox)
17. [ListMenu](#listmenu)
17. [MapBox](#mapbox)
18. [Percentage](#percentage)
19. [Radio](#radio)
20. [RadioGroup](#radiogroup)
21. [Rating](#rating)
22. [Search](#search)
23. [Slideout](#slideout)
24. [Slider](#slider)
25. [Switch](#switch)
26. [Tab](#tab)
27. [Textarea](#textarea)
28. [TimePicker](#timepicker)
29. [Toaster](#toaster)
29. [TreeView](#treeview)
30. [VideoPlayer](#videoplayer)

## Button

The `Button` component, which extends `HTMLElement`, has several public and private properties, along with public and
private methods.

**Public Properties (m\_props):**

* `tag` (string): Defines the tag set to use, with a default of "default".
* `theme` (string): Defines the visual theme, with a default of "default".
* `parentTag` (HTMLElement): The parent element where the button will mount.
* `text` (string): The button's text content.
* `enable` (boolean): Sets the enable/disable state, with a default of true.
* `selected` (boolean): Sets the selected state, with a default of false.
* `icon` (Object): Configuration for an icon, including:
    * `class` (string): The icon's CSS class.
    * `size` (string): The icon's size class.
    * `attr` (Object): Additional icon attributes.
* `img` (Object): Configuration for an image, including:
    * `src` (string): The image's source URL.
    * `attr` (Object): Additional image attributes.
* `onClick` (Function): A click event handler.
* `onComplete` (Function): A setup completion callback.
* `preventDefault` (boolean): Indicates if the default action should be prevented, defaults to true.
* `stopPropagation` (boolean): Indicates if event propagation should be stopped, defaults to true.
* `size` (string): Defines the size of the button.
* `type` (string): Defines the type of the button.
* `onMouseDown` (Function): A function called when the mouse is pressed down
* `onMouseUp` (Function): A function called when the mouse is released

**Private Properties:**

* `m_parentTag` (HTMLElement): Reference to the parent element.
* `m_buttonTag` (HTMLElement): Reference to the button element.
* `m_props` (Object): Storage for component configuration.
* `m_enable` (boolean): Current enable state.
* `m_selected` (boolean): Current selected state.
* `m_imageList` (Array): An array to hold image tags.
* `m_iconList` (Array): An array to hold icon tags.
* `m_text` (string): The current text of the button

**Public Methods:**

* `setup(props)`: Configures the button using a configuration object matching `m_props`.
* `enable(context)`: Gets or sets the enable state using a context object with an `enable` boolean property.
* `selected(context)`: Gets or sets the selected state using a context object with a `selected` boolean property.
* `getId()`: Returns the button ID.
* `getText()`: Returns the button text.
* `deselect()`: Deselects the button.
* `getConfig()`: Returns the configuration of the button.
* `getImageTagById(id)`: Returns an image tag given an ID.
* `getParentTag()`: Returns the parent tag of the button
* `getTag()`: Returns the button tag.
* `text(text)`: Gets or sets the text of the button
* `select(context)`: Selects the button.

**Private Functions:**

* `configure(customProps)`: Sets initial configuration using an object to override default properties.
* `setupDOM()`: Creates and configures the DOM structure of the button.
* `handleClick(ev)`: Handles click events.
* `handleMouseDown(ev)`: Handles mousedown events
* `handleMouseUp(ev)`: Handles mouseup events
* `mouseEnterOverButton()`: Handles mouseenter events.
* `mouseLeaveOverButton()`: Handles mouseleave events.
* `setEnable()`: Updates the visual and logical enable state.
* `setSelected()`: Updates the visual and logical selected state.
* `insertGraphic()`: Inserts an image into the button
* `insertIcon()`: Inserts an icon into the button
* `getImageTagById(id)`: Returns an image tag by its ID
* `getIconTagById(id)`: Returns an icon tag by its ID
* `setSrcAttr(tag, src)`: Sets the src attribute of a given tag
* `handleExternalSelect(context)`: Handles external selection of the button
* `selectBtn()`: Visually selects the button.
* `deselectBtn()`: Visually deselects the button.
* `setupComplete()`: Handles setup completion tasks.

The `Button` class is part of a larger `mamboUI` framework, which includes a `domJS` property to manipulate DOM
elements, along with `ui.tags` for managing tag names and `ui.theme` for managing default themes. The `ui.utils`
property has methods to extend objects and install components.

The `Button` class is registered as a custom element using `customElements.define`.

## ButtonSVG

The `ButtonSVG` component, which extends `HTMLElement`, is designed to render buttons with SVG graphics.

**Public Properties (m\_props):**

* `tag` (string): Defines the tag set to use, default is "default".
* `theme` (string): Defines the visual theme, default is "default".
* `parentTag` (HTMLElement): The parent element where the button will mount.
* `text` (string): The button's text content.
* `enable` (boolean): Enable/disable state, default is true.
* `selected` (boolean): Selected state, default is false.
* `img` (Object): Image configuration object:
    * `css` (string): CSS class for the image.
    * `prop` (Object): Properties for the image tag.
    * `attr` (Object): Additional attributes for the image tag.
* `svg` (Object): SVG configuration object:
    * `element` (Object):
        * `attr` (Object): Attributes for the svg tag.
        * `paths` (Array): Array of path definitions.
    * `prop` (Object): Properties for the SVG tag.
    * `attr` (Object): Additional attributes for the SVG tag.
* `onClick` (Function): Click event handler.
* `onComplete` (Function): Setup completion callback.
* `preventDefault` (boolean): Prevent default action, default is true.
* `stopPropagation` (boolean): Stop event propagation, default is true.
* `onGroupClick` (Function): Group click handler
* `size` (string): A string that defines the size of the button
* `type` (string): A string that defines the type of the button

**Private Properties:**

* `m_parentTag` (HTMLElement): Parent element reference.
* `m_props` (Object): Configuration storage.
* `m_buttonTag` (HTMLElement): The button element.
* `m_imageList` (Array): Array of image tags.
* `m_enable` (boolean): Current enable state.
* `m_text` (string): Current text.

**Public Methods:**

* `setup(props)`: Configures the button with the given properties.
* `enable(enable2)`: Enables or disables the button, where enable2 is a boolean.
* `deselect()`: Deselects the button.
* `getConfig()`: Returns the button configuration.
* `getId()`: Returns the button ID.
* `getImageTagById(id)`: Returns an image tag by ID.
* `text(context)`: Gets or sets the text of the button.
* `getParentTag()`: Returns the parent tag of the button

**Private Functions:**

* `configure(customProps)`: Sets initial configuration.
* `setupDOM()`: Creates the DOM structure.
* `insertGraphic(graphic, func)`: Inserts a graphic (image or SVG) into the button.
* `addImg(img)`: Adds an image to the button.
* `addSVG(svg)`: Adds an SVG to the button.
* `handleClick(ev)`: Handles click events
* `selectBtn()`: Visually selects the button.
* `deselectBtn()`: Visually deselects the button.
* `setEnable()`: Updates the visual and logical enable state.
* `setupComplete()`: Handles setup completion tasks.

The `ButtonSVG` class is registered as a custom element using `customElements.define`.

## ButtonGroup

The `ButtonGroup` component, which extends `HTMLElement`, manages a group of buttons.

**Public Properties (m\_props):**

* `buttons` (Array): An array of button configurations.
* `tag` (string): Defines the tag set to use, default is "default".
* `theme` (string): Defines the visual theme, default is "default".
* `parentTag` (HTMLElement): The parent element where the button group will mount.
* `onClick` (Function): A click event handler for the group.
* `onGroupClick` (Function): A click event handler for the group's buttons

**Private Properties:**

* `m_parentTag` (HTMLElement): Reference to the parent element.
* `m_props` (Object): Configuration storage.
* `m_buttonsList` (Array): Array of button instances.
* `m_selectedButtonTag` (HTMLElement): Currently selected button.

**Public Methods:**

* `setup(props)`: Configures the button group.
* `deselect()`: Deselects all buttons in the group.
* `destroy()`: Removes the component.
* `getTag(context)`: Gets a button tag by ID
* `select(context)`: Selects a button
* `getParentTag()`: Returns the parent tag of the button group

**Private Functions:**

* `configure(customProps)`: Sets initial configuration.
* `setupDOM()`: Creates the DOM structure.
* `deselectBtns()`: Deselects all buttons
* `installButton(button)`: Creates and installs a button in the group.
* `handleGroupBtnClick(context)`: Handles clicks on group buttons
* `selectBtn(context)`: Selects a button
* `setupComplete()`: Handles setup completion tasks.

The `ButtonGroup` class is registered as a custom element using `customElements.define`.

## Calendar

The `Calendar` component, which extends `HTMLElement`, provides a calendar interface for date selection.

**Public Properties (m\_props):**

* `tag` (string): Defines the tag set to use, default is "default".
* `theme` (string): Defines the visual theme, default is "default".
* `parentTag` (HTMLElement): The parent element where the calendar will mount.
* `header` (Object): Configuration for the calendar header.
* `datesHeader` (Object): Configuration for the dates header.
* `datesButtonGroup` (Object): Configuration for the button group of dates.
* `monthsButtonGroup` (Object): Configuration for the button group of months.
* `value` (Date): Initial selected date.
* `min` (Date): Minimum selectable date
* `max` (Date): Maximum selectable date
* `start` (string): Initial view to be displayed `month`, `year`, `decade`
* `depth` (string): Minimum view that can be displayed `month`, `year`, `decade`

**Private Properties:**

* `m_parentTag` (HTMLElement): Reference to the parent element.
* `m_props` (Object): Configuration storage.
* `m_headerButtonGroup` (Object): Button group for the header.
* `m_headerButtonsList` (Array): Array of header buttons.
* `m_bodyTag` (HTMLElement): Calendar body element.
* `m_bodyHeaderTag` (HTMLElement): Calendar body header element.
* `m_bodyContentTag` (HTMLElement): Calendar body content element.
* `m_datesHeaderGrid` (Object): Grid for the dates header.
* `m_datesButtonGroup` (Object): Button group for dates.
* `m_idFormat` (string): The id format of the buttons
* `m_value` (Date): Selected date value.
* `m_viewDate` (Date): The currently viewed date.
* `m_depths` (Object): An object of possible depths.
* `m_depth` (number): Current calendar depth.
* `m_minDepth` (number): Min calendar depth.
* `m_minDate` (Date): Min selectable date.
* `m_maxDate` (Date): Max selectable date.

**Public Methods:**

* `setup(props)`: Configures the calendar.
* `value(context)`: Gets or sets the selected date using a context object with a `value` (Date) property.
* `destroy()`: Removes the component
* `getParentTag()`: Returns the parent tag of the component
* `navigateToFuture()`: Navigates to the next view (month, year, etc.).
* `navigateToPast()`: Navigates to the previous view.
* `navigateUp()`: Navigates up one level of depth

**Private Functions:**

* `configure(customProps)`: Sets initial configuration.
* `setupDOM()`: Creates the DOM structure.
* `installHeader()`: Sets up the calendar header.
* `installDatesHeader()`: Sets up the header for dates.
* `generateDates(buttonGroup)`: Generates date buttons.
* `buttonClick(context, buttonGroup)`: Handles clicks on date buttons.
* `isValidButton(value)`: Checks if a date is valid and selectable
* `generateMonths(buttonGroup)`: Generates month buttons
* `getDepthButtonText(button)`: Gets the text for depth button
* `setupComplete()`: Handles setup completion tasks.

The `Calendar` class is registered as a custom element using `customElements.define`.

## Card

The `Card` component, which extends `HTMLElement`, is a container for displaying content.

**Public Properties (m\_props):**

* `tag` (string): Defines the tag set to use, default is "default".
* `theme` (string): Defines the visual theme, default is "default".
* `parentTag` (HTMLElement): The parent element where the card will mount.
* `content` (string|HTMLElement): The content of the card.
* `onComplete` (Function): Setup completion callback.

**Private Properties:**

* `m_parentTag` (HTMLElement): Reference to the parent element.
* `m_bodyTag` (HTMLElement): Reference to the body of the card.
* `m_props` (Object): Configuration storage.

**Public Methods:**

* `setup(props)`: Configures the card.

**Private Functions:**

* `configure(customProps)`: Sets initial configuration.
* `setupDOM()`: Creates the DOM structure.
* `setupComplete()`: Handles setup completion tasks.

The `Card` class is registered as a custom element using `customElements.define`.

## Checkbox

The `Checkbox` component, which extends `HTMLElement`, provides a checkbox input.

**Public Properties (m\_props):**

* `tag` (string): Defines the tag set to use, default is "default".
* `theme` (string): Defines the visual theme, default is "default".
* `parentTag` (HTMLElement): The parent element where the checkbox will mount.
* `text` (string): The text associated with the checkbox.
* `name` (string): The name attribute of the checkbox input.
* `value` (string): The value attribute of the checkbox input.
* `checked` (boolean): Initial checked state, default is false.
* `enable` (boolean): Enable/disable state, default is true.
* `position` (string): The position of the checkbox relative to the text `left` or `right`. Default `left`
* `onClick` (Function): Click event handler.
* `onGroupClick` (Function): Group click handler.

**Private Properties:**

* `m_parentTag` (HTMLElement): Reference to the parent element.
* `m_containerTag` (HTMLElement): The container element for the checkbox.
* `m_inputTag` (HTMLElement): The actual checkbox input element.
* `m_spanTag` (HTMLElement): Span element.
* `m_props` (Object): Configuration storage.
* `m_enabled` (boolean): Current enable state.
* `m_checked` (boolean): Current checked state.

**Public Methods:**

* `setup(props)`: Configures the checkbox.
* `destroy()`: Removes the component
* `getParentTag()`: Gets the parent tag of the component
* `check(state)`: Sets the checked state of the checkbox

**Private Functions:**

* `configure(customProps)`: Sets initial configuration.
* `setupDOM()`: Creates the DOM structure.
* `handleClick(ev)`: Handles click events.
* `setEnable()`: Sets the enable/disable state of the checkbox
* `setupComplete()`: Handles setup completion tasks.

The `Checkbox` class is registered as a custom element using `customElements.define`.

## CheckboxGroup

The `CheckboxGroup` component, which extends `HTMLElement`, manages a group of checkboxes.

**Public Properties (m\_props):**

* `checkboxes` (Array): An array of checkbox configurations.
* `tag` (string): Defines the tag set to use, default is "default".
* `theme` (string): Defines the visual theme, default is "default".
* `parentTag` (HTMLElement): The parent element where the group will mount.
* `onClick` (Function): A click event handler for the group.
* `name` (string): The name attribute for all checkboxes

**Private Properties:**

* `m_parentTag` (HTMLElement): Reference to the parent element.
* `m_props` (Object): Configuration storage.
* `m_checkboxList` (Array): Array of checkbox instances.

**Public Methods:**

* `setup(props)`: Configures the checkbox group.
* `clear()`: Clears all the checkboxes in the group
* `destroy()`: Removes the component.
* `getTag(id)`: Gets a checkbox tag by ID
* `select(context)`: Selects a checkbox in the group
* `getParentTag()`: Returns the parent tag of the group

**Private Functions:**

* `configure(customProps)`: Sets initial configuration
* `setupDOM()`: Creates the DOM structure.
* `installCheckboxes()`: Creates and installs checkboxes in the group.
* `handleCheckboxChange(context)`: Handles changes to checkboxes.
* `setupComplete()`: Handles setup completion tasks.

The `CheckboxGroup` class is registered as a custom element using `customElements.define`.

## Combobox

The `Combobox` component, which extends `HTMLElement`, provides a combination of an input field and a dropdown list for
selection.

**Public Properties (m\_props):**

* `tag` (string): Defines the tag set to use, default is "default".
* `theme` (string): Defines the visual theme, default is "default".
* `parentTag` (HTMLElement): The parent element where the combobox will mount.
* `labelText` (string): The text for the label associated to the combobox
* `data` (Array): The data for the combobox options.
* `value` (string): The initial selected value.
* `filter` (boolean): Enables filtering of options, default is true.
* `idField` (string): The key of the item id in the data object. Default is `id`
* `textField` (string): The key of the item text in the data object. Default is `text`
* `onSelect` (Function): Selection handler.
* `dropdown` (Object): Dropdown configuration
    * `onComplete` (Function): A setup completion callback for the dropdown
* `buttonGroup` (Object): ButtonGroup configuration.
    * `onClick` (Function): A click event handler for the buttons
* `input` (Object): Input configuration.

**Private Properties:**

* `m_parentTag` (HTMLElement): Reference to the parent element.
* `m_containerTag` (HTMLElement): The container element of the combobox.
* `m_labelTag` (HTMLElement): The label element of the combobox.
* `m_input` (Object): Input instance.
* `m_dropdownWrapperTag` (HTMLElement): Wrapper for the dropdown.
* `m_dropdown` (Object): Dropdown instance.
* `m_buttonGroup` (Object): Button group instance.
* `m_props` (Object): Configuration storage.
* `m_comboBoxData` (Array): The combobox data.
* `m_value` (string): Current value.
* `m_previous_text` (string): Previous text.

**Public Methods:**

* `setup(props)`: Configures the combobox.
* `value(context)`: Gets or sets the combobox value with a context object that has a `value` property.
* `destroy()`: Removes the component
* `getParentTag()`: Returns the parent tag of the component
* `getSelected()`: Gets the selected button.

**Private Functions:**

* `configure(customProps)`: Sets initial configuration.
* `setupDOM()`: Creates the DOM structure.
* `setupContainer()`: Sets up the container element.
* `setupLabel()`: Sets up the label element.
* `setupInput()`: Sets up the input field.
* `setupDropdown()`: Configures the dropdown.
* `installButtonGroup(dropdown, data)`: Installs a button group inside the dropdown
* `processItemData(itemData)`: Process item data into a button configuration object.
* `filterItems()`: Filters the items of the combobox.
* `getItemDataId(itemData)`: Gets the id of the combobox item
* `getItemDataText(itemData)`: Gets the text of the combobox item
* `setValue(value2, ev)`: Sets the value of the combobox.
* `handleKeyUp()`: Handles keyup events on the input.
* `handleBlur(ev)`: Handles blur events on the input.
* `setupLabelForAttr()`: Sets up the for attribute of the label
* `setupComplete()`: Handles setup completion tasks.

The `Combobox` class is registered as a custom element using `customElements.define`.

## DatePicker

The `DatePicker` component, which extends `HTMLElement`, provides a date selection input with a calendar dropdown.

**Public Properties (m\_props):**

* `tag` (string): Defines the tag set to use, default is "default".
* `theme` (string): Defines the visual theme, default is "default".
* `parentTag` (HTMLElement): The parent element where the date picker will mount.
* `format` (string): The date format.
* `value` (Date): Initial selected date.
* `min` (Date): Minimum selectable date.
* `max` (Date): Maximum selectable date.
* `start` (string): Initial view to be displayed `month`, `year`, `decade`
* `depth` (string): Minimum view that can be displayed `month`, `year`, `decade`

**Private Properties:**

* `m_parentTag` (HTMLElement): Reference to the parent element.
* `m_input` (Object): Input instance.
* `m_dropdownWrapperTag` (HTMLElement): Wrapper for the dropdown.
* `m_dropdown` (Object): Dropdown instance.
* `m_calendar` (Object): Calendar instance.
* `m_props` (Object): Configuration storage.
* `m_value` (Date): Current selected date.
* `m_previous_text` (string): Previous text.

**Public Methods:**

* `setup(props)`: Configures the date picker.
* `value(context)`: Gets or sets the selected date using a context object with a `value` (Date) property.
* `destroy()`: Removes the component
* `getParentTag()`: Returns the parent tag of the component

**Private Functions:**

* `configure(customProps)`: Sets initial configuration.
* `setupDOM()`: Creates the DOM structure.
* `setupComplete()`: Handles setup completion tasks.

The `DatePicker` class is registered as a custom element using `customElements.define`.

## Dialog

The `Dialog` component, which extends `HTMLElement`, creates a modal dialog.

**Public Properties (m\_props):**

* `tag` (string): Defines the tag set to use, default is "default".
* `theme` (string): Defines the visual theme, default is "default".
* `parentTag` (HTMLElement): The parent element where the dialog will mount.
* `header` (Object): Header configuration.
    * `content` (string|HTMLElement): Custom header content.
* `body` (string|HTMLElement): Dialog content.
* `footer` (string|HTMLElement): Dialog footer content.
* `closeButton` (boolean): Show close button, default is true.
* `onClose` (Function): Close event handler.
* `onComplete` (Function): Setup completion callback.

**Private Properties:**

* `m_parentTag` (HTMLElement): Reference to the parent element.
* `m_containerTag` (HTMLElement): Container for the dialog.
* `m_dialogHdrTag` (HTMLElement): Header element of the dialog.
* `m_dialogBodyTag` (HTMLElement): Body element of the dialog
* `m_dialogFtrTag` (HTMLElement): Footer element of the dialog.
* `m_props` (Object): Configuration storage.

**Public Methods:**

* `setup(props)`: Configures the dialog.
* `destroy()`: Removes the component.
* `getParentTag()`: Gets the parent tag of the component

**Private Functions:**

* `configure(customProps)`: Sets initial configuration.
* `setupDOM()`: Creates the DOM structure.
* `installCloseButton()`: Creates and installs the close button.
* `setupComplete()`: Handles setup completion tasks.

The `Dialog` class is registered as a custom element using `customElements.define`.

## DragDrop

The `DragDrop` component, which extends `HTMLElement`, allows files to be dropped into it.

**Public Properties (m\_props):**

* `tag` (string): Defines the tag set to use, default is "default".
* `theme` (string): Defines the visual theme, default is "default".
* `parentTag` (HTMLElement): The parent element where the drag drop area will mount.
* `onComplete` (Function): Setup completion callback.
* `onDrop` (Function): Drop event handler.

**Private Properties:**

* `m_parentTag` (HTMLElement): Reference to the parent element.
* `m_props` (Object): Configuration storage.

**Public Methods:**

* `setup(props)`: Configures the drag drop area.
* `getFiles()`: Returns the files.

**Private Functions:**

* `configure(customProps)`: Sets initial configuration.
* `setupDOM()`: Creates the DOM structure.
* `handleDrop(ev)`: Handles dropped files.
* `handleDragOver(ev)`: Handles drag over state.
* `handleFileSelect(ev)`: Handles file selection
* `setupComplete()`: Handles setup completion tasks.

The `DragDrop` class is registered as a custom element using `customElements.define`.

## Draggable

The `Draggable` component, which extends `HTMLElement`, makes an element draggable.

**Public Properties (m\_props):**

* `tag` (string): Defines the tag set to use, default is "default".
* `theme` (string): Defines the visual theme, default is "default".
* `parentTag` (HTMLElement): The parent element where the draggable element will mount.
* `axis` (string):  Defines the axis in which the element can be dragged `x`, `y`.
* `enable` (boolean): Enables/disables dragging, default is true
* `onDragStart` (Function): Drag start event handler.
* `onDrag` (Function): Drag event handler.
* `onDragEnd` (Function): Drag end event handler.
* `onComplete` (Function): Setup completion callback.

**Private Properties:**

* `m_parentTag` (HTMLElement): Reference to the parent element.
* `m_draggableTag` (HTMLElement): The draggable element.
* `m_props` (Object): Configuration storage.
* `m_enable` (boolean): Current enable state.
* `m_active` (boolean): Current active state.
* `m_axis` (string): The axis that the element can be dragged

**Public Methods:**

* `setup(props)`: Configures the draggable element.
* `enable(state)`: Enables or disables dragging, with the new state.
* `getParentTag()`: Returns the parent tag of the component

**Private Functions:**

* `configure(customProps)`: Sets initial configuration.
* `setupDOM()`: Creates the DOM structure.
* `handleMouseDown(ev)`: Handles mouse down events.
* `handleMouseMove(ev)`: Handles mouse move events.
* `handleMouseUp(ev)`: Handles mouse up events.
* `setupComplete()`: Handles setup completion tasks.

The `Draggable` class is registered as a custom element using `customElements.define`.

## Dropdown

The `Dropdown` component, which extends `HTMLElement`, creates a dropdown menu.

**Public Properties (m\_props):**

* `tag` (string): Defines the tag set to use, default is "default".
* `theme` (string): Defines the visual theme, default is "default".
* `parentTag` (HTMLElement): The parent element where the dropdown will mount.
* `content` (string|HTMLElement): The content of the dropdown.
* `open` (boolean): Initial open state, default is false.
* `onOpen` (Function): Open event handler.
* `onClose` (Function): Close event handler.
* `onComplete` (Function): Setup completion callback.

**Private Properties:**

* `m_parentTag` (HTMLElement): Reference to the parent element.
* `m_dropdownContainerTag` (HTMLElement): Container for the dropdown.
* `m_props` (Object): Configuration storage.
* `m_open` (boolean): Current open state.

**Public Methods:**

* `setup(props)`: Configures the dropdown.
* `close()`: Closes the dropdown.
* `destroy()`: Removes the component.
* `getContentTag()`: Returns the content tag of the component
* `getParentTag()`: Returns the parent tag of the component
* `open()`: Opens the dropdown.

**Private Functions:**

* `configure(customProps)`: Sets initial configuration.
* `setupDOM()`: Creates the DOM structure.
* `handleDocumentClick(ev)`: Handles clicks outside the dropdown.
* `setupComplete()`: Handles setup completion tasks.

The `Dropdown` class is registered as a custom element using `customElements.define`.

## FileChooser

The `FileChooser` component, which extends `HTMLElement`, provides a file selection input.

**Public Properties (m\_props):**

* `tag` (string): Defines the tag set to use, default is "default".
* `theme` (string): Defines the visual theme, default is "default".
* `parentTag` (HTMLElement): The parent element where the file chooser will mount.
* `button` (Object): Button configuration.
    * `text` (string): Button text.
* `input` (Object): Input configuration.
    * `labelText` (string): Input label text.
* `onComplete` (Function): Setup completion callback.
* `onChange` (Function): Change event handler.

**Private Properties:**

* `m_parentTag` (HTMLElement): Reference to the parent element.
* `m_inputTag` (HTMLElement): Input element of the file chooser.
* `m_props` (Object): Configuration storage.

**Public Methods:**

* `setup(props)`: Configures the file chooser.
* `getFiles()`: Returns selected files.

**Private Functions:**

* `configure(customProps)`: Sets initial configuration.
* `setupDOM()`: Creates the DOM structure.
* `handleFileSelect(ev)`: Handles file selection.
* `setupComplete()`: Handles setup completion tasks.

The `FileChooser` class is registered as a custom element using `customElements.define`.

## Grid

* **Purpose:** Displays data in a tabular format or as tiles.
* **Public Properties (m\_props):**
    * `tag` (string): Defines tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): The parent element where the grid will mount.
    * `data` (Array):  The data to display in the grid.
    * `columns` (Array): Configuration for each column including `field`, `title`, `width`, and `template`.
    * `view` (string): Display mode ('grid' or 'tiles'), default is 'grid'.
    * `onRowClick` (Function): Handler for row clicks.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the grid.
    * `commitDataChange()`: Commits any changes to data in the grid.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM structure of the grid.
    * `setupTilesDOM()`: Sets up the DOM for tile layout.
    * `setupGridDOM()`: Sets up the DOM for grid layout.
    * `installCell()`: Handles rendering each cell.
* **Key Features:** Supports different display modes ('grid' and 'tiles'), column configurations including custom
  templates, and row click handlers. It dynamically creates columns using configuration.

## Input

* **Purpose**: Provides a basic input field with support for icons, labels, clear buttons and validation.
* **Public Properties (m\_props):**
    * `tag` (string): Defines the tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `name` (string): The input name attribute.
    * `value` (string): Initial input value.
    * `labelText` (string): Label text for the input.
    * `icon` (Object or Array): Icon configuration, can specify the `class`, `size`, `position`, and other `attributes`.
    * `required` (boolean):  Marks the field as required and shows an error if not completed.
    * `requiredText` (string):  The error text to display if the required input is not completed.
    * `enableClear` (boolean): Shows or hides the clear button.
    * `onBlur` (Function): Handler for when the input loses focus.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the input.
    * `clear()`: Clears the input value.
    * `value(context)`: Gets or sets the input's value.
    * `setAttr(context)`: Sets additional HTML attributes on the input tag.
    * `showRequired()`: Shows the required field indicator on the input.
    * `commitDataChange()`:  Used to reset a data-changed flag.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM elements for the input.
    * `insertIcon()`: Creates the DOM elements for icons in the input.
    * `handleOnBlur()`: Manages blur events on the input.
    * `validate()`: Handles validating the input and displaying errors.
* **Key Features:** Supports clearable inputs, icons, and labels. It includes built-in validation and can show a
  required field indicator.

## Listbox

* **Purpose:**  Displays a list of selectable items.
* **Public Properties (m\_props):**
    * `tag` (string): Defines the tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `data` (Array): The list of items to display.
    * `onSelect` (Function): Handler for item selection.
    * `onHover` (Function): Handler for when an item is hovered over.
    * `onLeave` (Function): Handler for when the mouse leaves an item.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the listbox.
    * `addToList(items)`: Adds items to the listbox.
    * `replaceList(items)`: Replaces the current list with new items.
    * `destroy()`: Removes the listbox.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM for the listbox.
    * `createItemTag()`: Creates the DOM for an individual item.
    * `setupItemEventListeners()`: Sets up event listeners for each list item.
* **Key Features:** Items can be selected, hovered over, and mouseleave events handled. Used internally by other
  components like the Combobox.

## ListMenu

* **Purpose**: A component for displaying a list of items, possibly with sub-lists.
* **Public Properties (m\_props):**
    * `tag` (string): Defines the tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `data` (Array): The list of items to display.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the list menu.
    * `addToList(items)`: Adds items to the list.
    * `replaceList(items)`: Replaces the current list.
    * `toggleChildren(item)`: Expands or collapses a sublist under a given item.
    * `getIconTagById(id)`: Retrieves an icon tag by its ID.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM structure.
* **Key Features**:  Allows for nested lists and provides a method for toggling sublists, as well as managing associated
  icons.

## MapBox

* **Purpose**: Embeds a map using the Mapbox API.
* **Public Properties (m\_props):**
    * `tag` (string): Defines the tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `accessToken` (string): Mapbox API access token.
    * `options` (Object): Mapbox map options.
    * `markerOptions` (Object): Mapbox marker options.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the map.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM for the map.
* **Key Features:** Uses the Mapbox API, allows for custom map options and markers.

## Percentage

* **Purpose**:  Displays a progress bar with a percentage value.
* **Public Properties (m\_props):**
    * `tag` (string): Defines the tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `value` (number): The percentage value.
    * `showText` (boolean): Shows or hides the percentage value text.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the percentage display.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM elements.
* **Key Features:** Displays a progress bar and percentage value, and can control whether or not the text is shown.

## Pagination

* **Purpose**: Provides a set of buttons for navigating through pages of content.
* **Public Properties (m\_props):**
    * `tag` (string): Defines the tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `totalPages` (number): Total number of pages.
    * `currentPage` (number): The current active page.
    * `maxButtons` (number): The maximum number of page number buttons displayed, default is `7`.
    * `onPageChange` (Function): Callback when a page is selected.
    * `previousButton` (Object): Configuration for the previous button.
    * `nextButton` (Object): Configuration for the next button.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the pagination component.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM structure.
    * `installButtons()`: Installs the pagination buttons.
* **Key Features:**  Allows for navigation through pages, and handles different display logic depending on the total
  number of pages and current page.

## Radio

* **Purpose**: Provides a radio button input, which can be grouped so that only one radio in a group can be selected at
  a time.
* **Public Properties (m\_props):**
    * `tag` (string): Defines tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `value` (string): Value of the radio button.
    * `text` (string): Label text for the radio button.
    * `checked` (boolean): Initial checked state.
    * `position` (string): Position of label, either 'left' or 'right'.
    * `onClick` (Function):  Click event handler.
    * `onGroupClick` (Function): Handles clicks when the radio is part of a group.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the radio button.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM structure.
    * `handleClick()`: Handles clicks on the radio button.
* **Key Features**: Creates a standard radio button with label, and integrates with radio groups.

## RadioGroup

* **Purpose:** Manages a group of radio buttons, ensuring only one is selected at a time.
* **Public Properties (m\_props):**
    * `tag` (string): Defines the tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `name` (string):  Name for the radio group.
    * `radios` (Array): Array of configurations for the individual radio buttons.
    * `onClick` (Function): Click event handler for radio buttons in the group.
    * `onGroupClick` (Function): Handles clicks when the radio is part of a group.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the radio group.
    * `clear()`: Clears the selection.
    * `select(id)`: Selects a radio button by its ID.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM structure for the radio group.
    * `processRadio()`: Processes and renders each radio button.
    * `handleGroupClick()`: Manages selection logic for radio buttons in the group.
* **Key Features:**  Manages a collection of radio buttons, ensuring mutual exclusivity in selection.

## Rating

* **Purpose:**  Allows users to give a rating using a star system.
* **Public Properties (m\_props):**
    * `tag` (string): Defines the tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `value` (number): Initial rating value.
    * `max` (number):  Maximum rating value (number of stars).
    * `enable` (boolean): Enable/disable the rating.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the rating component.
    * `value(context)`: Gets or sets the rating value.
    * `enable(enable)`: Enables or disables the rating component.
    * `destroy()`: Removes the rating component from the DOM.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM elements for the rating component.
    * `installStars()`: Creates the individual star elements.
    * `handleClick()`: Handles click events on the stars.
    * `setEnable()`: Updates the component's enabled state.
* **Key Features:**  Displays a rating using a star system, can be enabled or disabled and supports setting the initial
  rating.

## Search

* **Purpose:**  Provides a search input field with an optional dropdown for suggestions.
* **Public Properties (m\_props):**
    * `tag` (string): Defines the tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `input` (Object): Configuration for the input field.
    * `onSearch` (Function): Callback when the search input changes.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the search component.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM structure for the search component.
    * `setupInput()`: Configures the search input field.
    * `setupButton()`:  Sets up the button group used to render a clear button.
    * `setupDropdown()`: Sets up the listbox for suggestions.
* **Key Features:**  Combines an input field with a dropdown for suggestions, and a button for clearing the search term.

## Slideout

* **Purpose:**  Creates a panel that slides out from the edge of the screen.
* **Public Properties (m\_props):**
    * `tag` (string): Defines tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `position` (string): Position of the panel ('left'|'right'|'top'|'bottom'), default is 'right'.
    * `size` (Object): Panel dimensions (`width` and `height`).
    * `overlay` (boolean): Shows a background overlay, default is `true`.
    * `closeOnOverlay` (boolean): Closes the panel when clicking the overlay, default is `true`.
    * `showClose` (boolean): Shows the close button, default is `true`.
    * `header` (Object): Configuration of header (`show`, `title`, `content`).
    * `content` (string|HTMLElement): Content of the slideout.
    * `onOpen` (Function): Handler for when the panel opens.
    * `onClose` (Function): Handler for when the panel closes.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the slideout panel.
    * `open()`: Opens the slideout panel.
    * `close()`: Closes the slideout panel.
    * `destroy()`: Removes the slideout component.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM elements.
    * `installCloseButton()`: Creates the close button.
    * `openAnimation()`: Handles the open animation.
    * `closeAnimation()`: Handles the close animation.
* **Key Features:** Creates a slide-out panel with customizable position, size, and content with optional overlay and
  close button.

## Slider

* **Purpose**: Allows users to select a value within a range by dragging a handle.
* **Public Properties (m\_props):**
    * `tag` (string): Defines tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `min` (number): Minimum value for the slider.
    * `max` (number): Maximum value for the slider.
    * `step` (number): Increment value for the slider.
    * `value` (number): Initial value of the slider.
    * `orientation` (string): Orientation of the slider ('horizontal'|'vertical'), default is 'horizontal'.
    * `showButtons` (boolean): Show or hide the increase and decrease buttons.
    * `enable` (boolean): Enable/disable the slider.
    * `onSelect` (Function): Handler for slider value changes.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the slider.
    * `value(context)`: Gets or sets the current slider value.
    * `enable(enable)`: Enables or disables the slider.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM structure for the slider.
    * `installDecreaseButton()`: Creates the button to decrease the value.
    * `installIncreaseButton()`: Creates the button to increase the value.
    * `installTrack()`: Creates the slider track.
    * `installDraggable()`: Creates a Draggable object for the slider handle.
    * `installSteps()`: Creates the steps on the slider track.
* **Key Features:**  Supports horizontal and vertical orientations and custom steps, buttons to increase or decrease
  slider value.

## Switch

* **Purpose:** A toggle switch that can be checked or unchecked.
* **Public Properties (m\_props):**
    * `tag` (string): Defines the tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `checked` (boolean):  Initial checked state of the switch.
    * `enable` (boolean):  Enable/disable state of the switch.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the switch.
    * `check()`: Sets the checked state of the switch.
    * `toggle()`: Toggles the switch state.
    * `enable(enable)`: Sets the enabled state of the switch.
    * `checked()`: Returns the current checked state.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM elements.
    * `handleClick()`: Handles click events on the switch.
* **Key Features:** Provides a toggle switch, can set its initial state, and handles enabling/disabling.

## Tab

* **Purpose**: Creates a tabbed interface with different content areas.
* **Public Properties (m\_props):**
    * `tag` (string): Defines tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `tabs` (Object): Configuration of the tabs including `buttons` and click handler.
    * `contents` (Array): An array of content associated with the tabs.
    * `onTabComplete` (Function): Callback for when each tab is complete.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the tabbed interface.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM elements for the tab.
    * `installTabs()`: Creates the buttons for each tab.
    * `installContent()`: Creates the content areas for the tabs.
    * `toggleTabContent()`: Manages the display of tab content when clicked.
* **Key Features**: Manages a set of tabs, each with corresponding content. It handles which tab is active when
  selected.

## Textarea

* **Purpose**: Provides a multiline text input field with optional buttons, icons and validation.
* **Public Properties (m\_props):**
    * `tag` (string): Defines tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `id` (string): The unique identifier of the textarea.
    * `value` (string):  Initial value of the textarea.
    * `labelText` (string):  Label text for the textarea.
    * `editButton` (Object): Configuration for the edit button.
    * `cancelButton` (Object):  Configuration for the cancel button.
    * `checkButton` (Object): Configuration for the check button.
    * `icon` (Object or Array): Configuration for icons on the textarea.
    * `required` (boolean): Marks the field as required.
    * `requiredText` (string): Error text if the field is required and not filled.
    * `onBlur` (Function): Handler for when the textarea loses focus.
    * `onChange` (Function): Handler for when the textarea content changes.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the textarea.
    * `commitDataChange()`: Used to reset a data-changed flag.
    * `value(context)`: Gets or sets the textarea value.
    * `showRequired()`: Shows the required field indicator on the textarea.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM structure.
    * `installButtons()`: Creates the edit, cancel, and check buttons.
    * `handleClick()`: Handles clicks on the textarea or its buttons.
    * `validate()`: Handles validating the textarea input.
* **Key Features**: Provides a multiline text input, which can include buttons, labels, icons and built in validation.

## Toaster

* **Purpose:** Displays temporary messages or notifications.
* **Public Properties (m\_props):**
    * `tag` (string): Defines tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element, defaults to 'body'.
    * `message` (string): The message to display.
    * `type` (string): Type of toast ('success'|'error'|'warning'|'info').
    * `position` (Object): Toast position (`vertical` and `horizontal`).
    * `autoHideDuration` (number): Auto-hide delay in milliseconds.
    * `anchorOrigin` (Object): Position relative to an anchor element.
    * `closeButton` (boolean): Shows the close button, default is `true`.
    * `onClose` (Function): Handler for when the toast is closed.
    * `size` (string): Size of the toast.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the toaster.
    * `close()`:  Closes the toaster.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM elements for the toaster.
    * `installCloseButton()`: Creates the close button.
    * `addIcon()`: Adds an icon to the toaster based on its type.
* **Key Features:**  Displays temporary messages, supports different types (success, error, etc), positions, auto-hide,
  and close button.

## Tooltip

* **Purpose:**  Displays a tooltip when hovering over or focusing an element.
* **Public Properties (m\_props):**
    * `tag` (string): Defines tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `anchorTag` (HTMLElement):  The element the tooltip is anchored to.
    * `content` (string|HTMLElement):  The content of the tooltip.
    * `position` (string):  The position of the tooltip ('top', 'bottom', 'left', 'right').
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the tooltip.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM elements.
    * `setupEventListeners()`: Sets up event listeners for the anchor tag.
    * `handleMouseOver()`: Manages mouseover events.
    * `handleMouseOut()`: Manages mouseout events.
    * `handleFocus()`: Manages focus events.
    * `handleBlur()`: Manages blur events.
* **Key Features:**  Displays a tooltip message when hovering or focusing on an element, with customizable content and
  position.

## TimePicker

* **Purpose**:  Allows users to select a time using a combobox.
* **Public Properties (m\_props):**
    * `tag` (string): Defines tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `combobox` (Object): Configuration options for the underlying combobox.
    * `value` (string): Initial time value.
    * `format` (string): Time format string for displaying time.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the time picker.
    * `value(context)`: Gets or sets the selected time.
    * `destroy()`: Removes the time picker from the DOM.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM structure.
    * `setupComboBox()`: Sets up the internal combobox to handle time selection.
    * `createComboBoxData()`: Generates data for the combobox based on time increments.
* **Key Features**: Uses a combobox for selecting a time, supports a format for display, and can retrieve or set the
  time selected.

## TreeView

* **Purpose**: Displays hierarchical data in a tree structure.
* **Public Properties (m\_props):**
    * `tag` (string): Defines tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `data` (Array): Data for the tree structure.
    * `itemsField` (string): Name of property in data that contains child items.
    * `textField` (string): Name of the property to display as item text.
    * `itemIdAttrName` (string): Name of the HTML attribute to store item ID.
    * `onSelect` (Function): Handler when an item is selected.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the tree view.
    * `getItemData(tag)`: Retrieves data associated with an item given a tag.
    * `destroy()`: Removes the tree view component.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM elements.
    * `processGroup()`: Recursively creates tree view groups.
    * `installItem()`: Creates the DOM for an item in the tree.
    * `installIcon()`: Creates the toggle icon for an item.
    * `setupItemEventListeners()`: Adds event handlers for item interaction.
    * `toggleExpand()`: Expands or collapses a tree item.
    * `clearSelected()`: Clears the selected state for any previously selected item.
* **Key Features**: Displays a hierarchical data structure with expandable/collapsible nodes, and allows item selection.

## VideoPlayer

* **Purpose**: Provides a video player with basic controls.
* **Public Properties (m\_props):**
    * `tag` (string): Defines tag set.
    * `theme` (string): Defines the theme.
    * `parentTag` (HTMLElement): Parent element.
    * `player` (Object): Configuration for the video player, such as attributes.
    * `onComplete` (Function): Callback after setup is complete.
* **Public Methods:**
    * `setup(props)`: Configures the video player.
    * `getPlayer()`: Returns the player instance.
    * `getPlayerTag()`: Returns the player element.
* **Private Functions:**
    * `setupDOM()`: Creates the DOM structure.
    * `configure()`: Configures the player's attributes.
* **Key Features**: Renders a video player with basic control properties.