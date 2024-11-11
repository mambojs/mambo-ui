<!--
******************************************
*  Copyright 2024 Alejandro Sebastian Scotti, Scotti Corp.
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
*  @version 0.0.2
******************************************
-->

# MAMBO.JS - UI Components Documentation - Version 0.0.2

### Table of Contents

1. [Button](#button)
2. [ButtonSVG](#buttonsvg)
3. [ButtonGroup](#buttongroup)
4. [Calendar](#calendar)
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
17. [MapBox](#mapbox)
18. [Percentage](#percentage)19. 
20. [Radio](#radio)
21. [RadioGroup](#radiogroup)
22. [Rating](#rating)
23. [Search](#search)
24. [Slideout](#slideout)
25. [Slider](#slider)
26. [Switch](#switch)
27. [Tab](#tab)
28. [Textarea](#textarea)
29. [TimePicker](#timepicker)
30. [TreeView](#treeview)
31. [VideoPlayer](#videoplayer)

## Button

### Public Properties (m_props)
- `text` (string): Default "Mambo Button". Button display text
- `enable` (boolean): Default true. Controls button enabled state
- `preventDefault` (boolean): Default true. Prevents default event behavior
- `stopPropagation` (boolean): Default true. Stops event propagation
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `img` (object|array): Optional image configuration(s)
  - `css` (string): CSS class for image
  - `prop` (object): HTML properties
  - `attr` (object): HTML attributes
  - `position` (string): "left"|"right" image position
  - `hover` (string): Hover state image URL
- `icon` (object|array): Optional icon configuration(s)
  - `css` (string): CSS class for icon
  - `prop` (object): HTML properties 
  - `attr` (object): HTML attributes
  - `position` (string): "left"|"right" icon position
  - `size` (string): Icon size class

### Private Properties
- `m_imageList` (array): Stores image tag references
- `m_iconList` (array): Stores icon tag references
- `m_parentTag` (HTMLElement): Parent element reference
- `m_buttonTag` (HTMLElement): Button element reference
- `m_text` (string): Current button text
- `m_enable` (boolean): Current enabled state

### Public Methods
- `deselect()`: Removes selected state from button
- `enable(enable: boolean)`: Sets button enabled state
- `getConfig()`: Returns m_props configuration object
- `getId()`: Returns button ID from m_props
- `getImageTagById(id: string)`: Returns image tag by ID
- `getIconTagById(id: string)`: Returns icon tag by ID
- `getParentTag()`: Returns parent element
- `getTag()`: Returns button element
- `text(text: string)`: Gets/sets button text
- `select(context: object)`: Handles external selection
  - `context.notTrigger` (boolean): If true, only updates visual state
- `setup(props: object)`: Initializes button with configuration

### Private Functions
- `setupDOM()`: Creates button DOM structure
- `insertGraphic()`: Adds images to button
- `insertIcon()`: Adds icons to button
- `handleClick(ev: Event)`: Processes click events
- `handleMouseDown(ev: Event)`: Handles mouse down state
- `handleMouseUp(ev: Event)`: Handles mouse up state
- `mouseEnterOverImage()`: Updates image on hover
- `mouseLeaveOverImage()`: Reverts image on hover end
- `mouseEnterOverButton()`: Adds hover class
- `mouseLeaveOverButton()`: Removes hover class
- `handleExternalSelect(context: object)`: Processes external selection
  - `context.notTrigger` (boolean): If true, only updates visual state
- `configure(customProps: object)`: Sets up initial configuration

## ButtonGroup

### Public Properties (m_props)
- `buttons` (array): Default []. Array of button configurations
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `fnGroupClick` (function): Default handleGroupBtnClick. Group click handler

### Private Properties
- `m_buttonsList` (array): Stores button component references
- `m_parentTag` (HTMLElement): Parent element reference
- `m_selectedButtonTag` (HTMLElement): Currently selected button

### Public Methods
- `deselect()`: Deselects all buttons
- `destroy()`: Removes button group
- `getConfigById(context: object)`: Returns button config by ID
  - `context.id` (string): Button ID
- `getParentTag()`: Returns group element
- `getSelected()`: Returns selected button
- `getTag(context: object)`: Returns button by ID
  - `context.id` (string): Button ID
- `select(context: object)`: Selects button by ID
  - `context.id` (string): Button ID
  - `context.notTrigger` (boolean): If true, only updates visual state
- `setup(props: object)`: Initializes group with configuration

### Private Functions
- `setupDOM()`: Creates button group structure
- `installButton(button: object)`: Creates individual buttons
- `handleGroupBtnClick(context: object)`: Processes group click events
  - `context.Button` (object): Clicked button reference
  - `context.ev` (Event): Click event
- `configure(customProps: object)`: Sets up initial configuration

## ButtonSVG

### Public Properties (m_props)
- `enable` (boolean): Default true. Controls button enabled state
- `preventDefault` (boolean): Default true. Prevents default event behavior
- `stopPropagation` (boolean): Default true. Stops event propagation
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `img` (object|array): Optional image configuration(s)
  - `css` (string): CSS class for image
  - `prop` (object): HTML properties
  - `attr` (object): HTML attributes
  - `hover` (string): Hover state image URL
- `svg` (object|array): Optional SVG configuration(s)
  - `element` (object): SVG element properties
    - `attr` (object): SVG attributes
    - `paths` (array): SVG path data
  - `prop` (object): HTML properties
  - `attr` (object): HTML attributes

### Private Properties
- `m_imageList` (array): Stores image tag references
- `m_parentTag` (HTMLElement): Parent element reference
- `m_buttonTag` (HTMLElement): Button element reference
- `m_text` (string): Current button text
- `m_enable` (boolean): Current enabled state

### Public Methods
- `deselect()`: Removes selected state
- `enable(enable: boolean)`: Sets enabled state
- `getConfig()`: Returns m_props configuration
- `getId()`: Returns button ID
- `getImageTagById(id: string)`: Returns image tag by ID
- `getParentTag()`: Returns parent element
- `getTag()`: Returns button element
- `text(context: object)`: Gets/sets button text
  - `context.text` (string): New text value
- `select(context: object)`: Handles external selection
  - `context.notTrigger` (boolean): If true, only updates visual state
- `setup(props: object)`: Initializes with configuration

### Private Functions
- `setupDOM()`: Creates button structure
- `insertGraphic(graphic: object|array, func: function)`: Adds graphics
- `addImg(img: object)`: Adds image element
- `addSVG(svg: object)`: Adds SVG element
- `handleClick(ev: Event)`: Processes click events
- `mouseEnterOverImage()`: Updates image on hover
- `mouseLeaveOverImage()`: Reverts image on hover end
- `mouseEnterOverButton()`: Adds hover class
- `mouseLeaveOverButton()`: Removes hover class
- `configure(customProps: object)`: Sets up initial configuration

## Calendar

### Public Properties (m_props)
- `theme` (string): Default "default". Theme name
- `tag` (string): Default "default". Tag template name
- `headerButtonGroup` (object): Header navigation buttons configuration
- `datesHeader` (object): Days of week header configuration
- `format` (string): Default "M/D/YYYY". Date format
- `footer` (string): Default "dddd, MMMM D, YYYY". Footer format
- `start` (string): Default "month". Initial view ("month"|"year"|"decade"|"century")
- `depth` (string): Default "month". Minimum depth
- `min` (Date): Default 1900/1/1. Minimum selectable date
- `max` (Date): Default 2099/12/31. Maximum selectable date

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_headerButtonGroup` (ButtonGroup): Navigation buttons
- `m_headerButtonsList` (array): Navigation button references
- `m_bodyTag` (HTMLElement): Calendar body container
- `m_bodyHeaderTag` (HTMLElement): Calendar header container
- `m_bodyContentTag` (HTMLElement): Calendar content container
- `m_datesHeaderGrid` (Grid): Days of week header
- `m_datesButtonGroup` (ButtonGroup): Date buttons
- `m_value` (Date): Currently selected date
- `m_viewDate` (Date): Currently displayed month/year
- `m_depth` (number): Current view depth
- `m_minDepth` (number): Minimum allowed depth
- `m_minDate` (Date): Minimum allowed date
- `m_maxDate` (Date): Maximum allowed date

### Public Methods
- `destroy()`: Removes calendar
- `getParentTag()`: Returns calendar element
- `navigateToFuture()`: Moves to next period
- `navigateToPast()`: Moves to previous period
- `navigateUp()`: Moves up one view level
- `setup(props: object)`: Initializes with configuration
- `value(context: object)`: Gets/sets selected date
  - `context.value` (Date|string): New date value

### Private Functions
- `setupDOM()`: Creates calendar structure
- `setupHeader()`: Sets up navigation header
- `setupBody()`: Sets up calendar body
- `setupFooter()`: Sets up footer (today button)
- `navigate(number: number)`: Handles date navigation
- `setupBodyContent()`: Updates calendar content
- `installDatesHeader()`: Creates weekday header
- `installDates()`: Creates date buttons
- `installMonths()`: Creates month buttons
- `installYears()`: Creates year buttons
- `installDecades()`: Creates decade buttons
- `configure(customProps: object)`: Sets up initial configuration

## Checkbox

### Public Properties (m_props)
- `enable` (boolean): Default true. Controls checkbox enabled state
- `name` (string): Default random string. Input name attribute
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `position` (string): Default "left". Label position ("left"|"right")
- `text` (string): Checkbox label text
- `checked` (boolean): Initial checked state
- `value` (string): Input value attribute

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_containerTag` (HTMLElement): Checkbox container
- `m_inputTag` (HTMLElement): Input element
- `m_spanTag` (HTMLElement): Custom checkbox indicator
- `m_enabled` (boolean): Current enabled state
- `m_checked` (boolean): Current checked state

### Public Methods
- `destroy()`: Removes checkbox
- `enable(context: object)`: Sets enabled state
  - `context.enable` (boolean): New enabled state
- `getId()`: Returns checkbox ID
- `getParentTag()`: Returns container element
- `select(context: object)`: Gets/sets checked state
  - `context.value` (boolean): New checked state
  - `context.notTrigger` (boolean): If true, only updates visual state
- `setup(props: object)`: Initializes with configuration
- `value(context: object)`: Gets/sets input value
  - `context.value` (string): New value

### Private Functions
- `setupDOM()`: Creates checkbox structure
- `handleClick(ev: Event)`: Processes click events
- `checkInput(value: boolean, notTrigger: boolean)`: Updates checked state
- `setEnable()`: Updates enabled visual state
- `configure(customProps: object)`: Sets up initial configuration

## CheckboxGroup

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `name` (string): Default random string. Input name for all checkboxes
- `checkboxes` (array): Array of checkbox configurations
- `position` (string): Default "right". Label position for all checkboxes

### Private Properties
- `m_checkboxList` (array): Stores checkbox component references
- `m_parentTag` (HTMLElement): Parent element reference

### Public Methods
- `clear()`: Unchecks all checkboxes
- `destroy()`: Removes checkbox group
- `getParentTag()`: Returns group element
- `getTag(context: object)`: Returns checkbox by ID
  - `context.id` (string): Checkbox ID
- `select(context: object)`: Gets/sets checked states
  - `context.id` (string|array): Checkbox ID(s) to check
  - `context.notTrigger` (boolean): If true, only updates visual state
- `setup(props: object)`: Initializes with configuration

### Private Functions
- `setupDOM()`: Creates checkbox group structure
- `processCheckbox(checkbox: object, index: number)`: Creates individual checkboxes
- `handleGroupClick(context: object)`: Processes group click events
  - `context.Checkbox` (object): Clicked checkbox reference
  - `context.ev` (Event): Click event
- `getTag(id: string)`: Returns checkbox by ID
- `getSelected()`: Returns array of checked checkboxes
- `selectTag(tag: object, notTrigger: boolean)`: Updates checkbox state
- `configure(customProps: object)`: Sets up initial configuration

## Combobox

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `input` (object): Input configuration
- `dropdown` (object): Dropdown configuration
- `buttonGroup` (object): Button group configuration
- `idField` (string): Default "id". ID field in data items
- `textField` (string): Default "text". Text field in data items
- `filter` (boolean): Default true. Enable filtering
- `value` (string): Default "". Initial value
- `data` (array): Data items for dropdown

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_input` (Input): Input component
- `m_dropdownWrapperTag` (HTMLElement): Dropdown container
- `m_dropdown` (Dropdown): Dropdown component
- `m_buttonGroup` (ButtonGroup): Button group component
- `m_comboBoxData` (array): Stored data items
- `m_value` (string): Current value
- `m_previous_text` (string): Previous input value

### Public Methods
- `destroy()`: Removes combobox
- `getParentTag()`: Returns combobox element
- `getSelected()`: Returns selected button
- `setup(props: object)`: Initializes with configuration
- `value(context: object)`: Gets/sets value
  - `context.value` (string): New value

### Private Functions
- `setupDOM()`: Creates combobox structure
- `setupInput()`: Creates input component
- `setupDropdown()`: Creates dropdown component
- `installButtonGroup(dropdown: object, data: array)`: Creates button group
- `processItemData(itemData: object)`: Formats data item
- `filterItems()`: Filters dropdown items
- `setValue(value: string, ev: Event)`: Updates selected value
- `getItemDataId(itemData: object)`: Gets item ID
- `getItemDataText(itemData: object)`: Gets item text
- `handleKeyUp()`: Handles input changes
- `handleBlur(ev: Event)`: Handles input blur
- `configure(customProps: object)`: Sets up initial configuration

## DatePicker

### Public Properties (m_props)
- `theme` (string): Default "default". Theme name
- `tag` (string): Default "default". Tag template name
- `input` (object): Input configuration with events
- `calendar` (object): Calendar component configuration
- `format` (string): Default "M/D/YYYY". Date format
- `value` (Date|null): Default null. Initial date value
- `footer` (string): Default "dddd, MMMM D, YYYY". Calendar footer format
- `start` (string): Default "month". Initial calendar view
- `depth` (string): Default "month". Minimum calendar depth
- `min` (Date): Default 1900/1/1. Minimum selectable date
- `max` (Date): Default 2099/12/31. Maximum selectable date

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_input` (Input): Input component
- `m_dropdownWrapperTag` (HTMLElement): Dropdown container
- `m_dropdown` (Dropdown): Dropdown component
- `m_calendar` (Calendar): Calendar component
- `m_value` (Date|null): Current selected date
- `m_previous_text` (string): Previous input value

### Public Methods
- `destroy()`: Removes datepicker
- `getParentTag()`: Returns datepicker element
- `setup(props: object)`: Initializes with configuration
- `value(context: object)`: Gets/sets selected date
  - `context.value` (Date|string): New date value

### Private Functions
- `setupDOM()`: Creates datepicker structure
- `setupInput()`: Creates input component
- `setupDropdown()`: Creates dropdown component
- `installCalendar(dropdown: object)`: Creates calendar component
- `setValue(value: Date|string)`: Updates selected date
- `handleBlur(ev: Event)`: Handles input blur
- `configure(customProps: object)`: Sets up initial configuration

## Dialog

### Public Properties (m_props)
- `parentTag` (string): Default "body". Parent element selector
- `closeButton` (boolean): Default true. Show close button
- `closeText` (string): Default "close". Close button text
- `theme` (string): Default "default". Theme name
- `tag` (string): Default "default". Tag template name
- `title` (string): Dialog title text
- `hdrHtml` (HTMLElement): Custom header HTML

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_dialogHdrTag` (HTMLElement): Header container
- `m_dialogBodyTag` (HTMLElement): Body container

### Public Methods
- `close()`: Closes dialog
- `getParentTag()`: Returns dialog element
- `getBodyTag()`: Returns body container
- `getHeaderTag()`: Returns header container
- `setup(props: object)`: Initializes with configuration

### Private Functions
- `setupDOM()`: Creates dialog structure
- `installCloseButton(headerLeftTag: HTMLElement)`: Creates close button
- `configure(customProps: object)`: Sets up initial configuration

## DragDrop

### Public Properties (m_props)
- `dropText` (string): Default "Drop Here". Drop zone text
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `maxFileCount` (number): Maximum files allowed
- `allowKind` (array): Allowed file types
- `fnDrop` (function): Drop event handler
- `fnDragover` (function): Dragover event handler
- `fnMouseenterMouseleave` (function): Mouse enter/leave handler

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference

### Public Methods
- `destroy()`: Removes drag drop zone
- `getParentTag()`: Returns drag drop element
- `setup(props: object)`: Initializes with configuration

### Private Functions
- `setupDOM()`: Creates drag drop structure
- `setupEventListener()`: Sets up event handlers
- `handleMouseEnterLeave(ev: Event)`: Handles mouse events
- `handleDragover(ev: Event)`: Handles dragover event
- `handleDrop(ev: Event)`: Handles drop event
- `checkFileKindAllowed(type: string)`: Validates file type
- `configure(customProps: object)`: Sets up initial configuration

## Draggable

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `enable` (boolean): Default true. Enable dragging
- `axis` (string): Constrain movement ("x"|"y")
- `grid` (array): Snap to grid [x, y]
- `containerTag` (string): Boundary container selector

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_draggableTag` (HTMLElement): Draggable element
- `m_enable` (boolean): Current enabled state
- `m_active` (boolean): Currently dragging
- `m_axis` (number|null): Movement constraint
- `m_initialX` (number): Initial X position
- `m_initialY` (number): Initial Y position
- `m_xOffset` (number): X offset from origin
- `m_yOffset` (number): Y offset from origin
- `m_bounding` (DOMRect|null): Boundary rectangle

### Public Methods
- `destroy()`: Removes draggable
- `enable(enable: boolean)`: Sets enabled state
- `getParentTag()`: Returns draggable element
- `getHandleWidth()`: Returns element width
- `getHandleHeight()`: Returns element height
- `setPosition(xPos: number, yPos: number)`: Sets position
- `setup(props: object)`: Initializes with configuration

### Private Functions
- `setupDOM()`: Creates draggable structure
- `setupEventHandler()`: Sets up event handlers
- `dragStart(ev: Event)`: Handles drag start
- `dragEnd(ev: Event)`: Handles drag end
- `drag(ev: Event)`: Handles dragging
- `getAxisStep(current: number, step: number, min: number|null, max: number|null)`: Calculates grid position
- `configure(customProps: object)`: Sets up initial configuration

## Dropdown

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `disableButton` (boolean): If true, disables the dropdown button
- `button` (object): Configuration for dropdown button
  - `text` (string): Button text
  - `css` (object): Button CSS classes
  - `fnClick` (function): Custom click handler
- `positionTag` (HTMLElement): Optional element for positioning dropdown
- `css` (object): CSS class overrides
- `tags` (object): HTML tag configuration

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_dropdownContainerTag` (HTMLElement): Dropdown container element
- `m_open` (boolean): Current open/closed state

### Public Methods
- `close(context: object)`: Closes dropdown
  - `context.ev` (Event): Optional event object
- `destroy()`: Removes dropdown from DOM
- `getContentTag()`: Returns dropdown container element
- `getParentTag()`: Returns parent element
- `open()`: Opens dropdown
- `setup(props: object)`: Initializes dropdown with configuration

### Private Functions
- `setupDOM()`: Creates dropdown structure
- `setupOpenButton()`: Creates and configures dropdown button
- `setupContainer()`: Creates dropdown container
- `setupEventHandler()`: Sets up click event handlers
- `openAnimation()`: Handles opening animation
- `closeAnimation(ev: Event)`: Handles closing animation
- `configure(customProps: object)`: Sets up initial configuration



## FileChooser

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `buttonOnly` (boolean): If true, shows only button interface
- `button` (object): Configuration for file select button
  - `text` (string): Default "Select File"
- `input` (object): Configuration for file input
  - `labelText` (string): Default "Choose files to upload"
  - `tags` (object): Input tag configuration
- `fnUpload` (function): File upload handler

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_inputTag` (Input): Input component instance

### Public Methods
- `destroy()`: Removes file chooser
- `getInputTag()`: Returns input element
- `getParentTag()`: Returns parent element
- `setup(props: object)`: Initializes with configuration

### Private Functions
- `setupDOM()`: Creates file chooser structure
- `installButton()`: Creates button interface
- `installInput(hidden: boolean)`: Creates file input element
- `configure(customProps: object)`: Sets up initial configuration



## Grid

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `layout` (string): Default "grid". Grid layout type ("grid"|"tile")
- `tilesWidth` (string): Default "300px". Tile width for tile layout
- `tilesFillUp` (boolean): Default true. Fill remaining space in tile layout
- `tilesConfig` (array): Default []. Tile configuration array
- `colWidthAdj` (number): Default 5. Column width adjustment
- `data` (array): Grid data items
- `tileHTML` (string): HTML template for tiles
- `fnPostTile` (function): Post-tile creation handler

### Private Properties
- `m_colsMaxPxWidth` (array): Column maximum widths
- `m_componentsMapById` (object): Component map by ID
- `m_componentsMapByColNbr` (array): Component map by column number
- `m_gridWrapperTag` (HTMLElement): Grid wrapper element
- `m_gridHdrTag` (HTMLElement): Grid header element
- `m_gridBodyTag` (HTMLElement): Grid body element
- `m_tileParentTag` (HTMLElement): Tile container element
- `m_tileParentTags` (array): Array of tile elements
- `m_gridData` (array): Grid data storage
- `m_gridDataChanged` (boolean): Data change flag

### Public Methods
- `commitDataChange()`: Commits data changes
- `dataChanged()`: Returns data changed state
- `getCellComponentByIdByRow(context: object)`: Gets cell component by ID and row
  - `context.columnId` (string): Column ID
  - `context.rowIndex` (number): Row index
- `getCellComponentsById()`: Returns component map by ID
- `getCellComponentByColNbrByRow(context: object)`: Gets cell component by column number and row
  - `context.colNbr` (number): Column number
  - `context.rowIndex` (number): Row index
- `getCellComponentsByColNbr()`: Returns component map by column number
- `getGridData()`: Returns grid data
- `getId()`: Returns grid ID
- `getRowIndex(context: object)`: Returns row index
  - `context.rowTag` (HTMLElement): Row element
- `removeColsStyles()`: Removes column styles
- `setup(props: object)`: Initializes grid with configuration

### Private Functions
- `setupDOM()`: Creates grid structure
- `setupTilesDOM()`: Creates tile layout structure
- `setupGridDOM()`: Creates grid layout structure
- `installTile(tileData: object, tileIndex: number)`: Creates individual tile
- `processTile(tileData: object, tileIndex: number, tileTag: HTMLElement)`: Processes tile data
- `validateGridData()`: Validates grid data
- `configure(customProps: object)`: Sets up initial configuration



## Input

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `name` (string): Default random string. Input name attribute
- `labelText` (string): Label text
- `value` (string): Input value
- `hidden` (boolean): If true, hides input
- `required` (boolean): If true, marks as required
- `requiredText` (string): Default "This is a required field"
- `enableClear` (boolean): If true, shows clear button
- `enableLeftButton` (boolean): If true, shows left button
- `icon` (object|array): Icon configuration(s)
- `validate` (object): Validation configuration
- `clearButton` (object): Clear button configuration
- `leftButton` (object): Left button configuration

### Private Properties
- `m_iconList` (array): Stores icon elements
- `m_parentTag` (HTMLElement): Parent element reference
- `m_inputTag` (HTMLElement): Input element
- `m_labelTag` (HTMLElement): Label element
- `m_clearButton` (Button): Clear button component
- `m_leftButton` (Button): Left button component
- `m_containerTag` (HTMLElement): Container element
- `m_requiredTextTag` (HTMLElement): Required text element
- `m_iconRequiredTag` (HTMLElement): Required icon element
- `m_dataChanged` (boolean): Data change flag

### Public Methods
- `commitDataChange()`: Commits data changes
- `clear()`: Clears input value
- `clearButton()`: Returns clear button component
- `dataChanged()`: Returns data changed state
- `getIconTagById(id: string)`: Returns icon by ID
- `getTag()`: Returns input element
- `leftButton()`: Returns left button component
- `setup(props: object)`: Initializes input with configuration
- `setAttr(context: object)`: Sets input attributes
- `showRequired()`: Shows/hides required indicator
- `value(context: object)`: Gets/sets input value
  - `context.value` (string): New value

### Private Functions
- `setupDOM()`: Creates input structure
- `insertIcon()`: Adds icons to input
- `installClearInput()`: Creates clear button
- `installLeftButton()`: Creates left button
- `handleOnBlur(ev: Event)`: Handles blur event
- `handleOnChange(ev: Event)`: Handles change event
- `handleOnKeyup(ev: Event)`: Handles keyup event
- `validate(ev: Event)`: Performs validation
- `configure(customProps: object)`: Sets up initial configuration



## Listbox

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `displayKey` (string): Default "displayName". Data item display field
- `data` (array): Listbox items data

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_listboxContainerTag` (HTMLElement): Listbox container element
- `m_listboxData` (array): Stored listbox data

### Public Methods
- `addToList(data: array)`: Adds items to listbox
- `destroy()`: Removes listbox
- `replaceList(data: array)`: Replaces all items
- `setup(props: object)`: Initializes with configuration

### Private Functions
- `setupDOM()`: Creates listbox structure
- `installItems(data: array)`: Creates listbox items
- `processItem(itemData: object)`: Creates individual item
- `setupItemEventListeners(item: HTMLElement, data: object)`: Sets up item events
- `clearData()`: Removes all items
- `configure(customProps: object)`: Sets up initial configuration



## MapBox

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `marker` (object): Default {color: "orange"}. Marker configuration
- `mapStyle` (string): Default "mapbox://styles/mapbox/streets-v11". Map style URL
- `zoom` (number): Default 16. Initial zoom level
- `accessToken` (string): Mapbox access token
- `controls` (object): Map controls configuration
  - `fullscreen` (object): Fullscreen control config
  - `navigation` (object): Navigation control config
  - `search` (object): Search control config

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_containerTag` (HTMLElement): Map container element
- `m_map` (mapboxgl.Map): Mapbox map instance
- `m_markers` (array): Stored map markers

### Public Methods
- `addPoints(points: array)`: Adds markers to map
- `fitBounds(props: object)`: Fits map to bounds
  - `props.southwestern` (array): Southwest coordinates
  - `props.northeastern` (array): Northeast coordinates
  - `props.config` (object): Bounds options
- `getMarker(coords: object)`: Returns marker by coordinates
  - `coords.lng` (number): Longitude
  - `coords.lat` (number): Latitude
- `getMarkers()`: Returns all markers
- `jumpTo(lng: number, lat: number)`: Centers map on coordinates
- `setup(props: object)`: Initializes with configuration

### Private Functions
- `setupDOM()`: Creates map structure
- `getUserLocation()`: Gets user's location
- `renderMap()`: Creates Mapbox map
- `addCurrentPositionMarked(lng: number, lat: number)`: Adds user location marker
- `setMarker(arrCoords: array, marker: object)`: Creates map markers
- `checkMapboxLibraries()`: Validates required libraries
- `configure(customProps: object)`: Sets up initial configuration



## Percentage

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `value` (number): Default 0. Initial value
- `min` (number): Default 0. Minimum value
- `max` (number): Default 1. Maximum value
- `decimals` (number): Default 0. Decimal places
- `ranges` (array): Value ranges configuration
  - Default ranges: 0-0.5 (low), 0.5-1 (high)

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_percentageBarTag` (HTMLElement): Progress bar element
- `m_percentageTextTag` (HTMLElement): Percentage text element
- `m_value` (number): Current value

### Public Methods
- `destroy()`: Removes percentage bar
- `getParentTag()`: Returns parent element
- `setup(props: object)`: Initializes with configuration
- `value(context: object)`: Gets/sets value
  - `context.value` (number): New value

### Private Functions
- `setupDOM()`: Creates percentage bar structure
- `setValue(value: number)`: Updates value
- `setText()`: Updates percentage text
- `setBarWidth()`: Updates bar width
- `setRange()`: Updates range styling
- `clearRangeClasses()`: Removes range classes
- `configure(customProps: object)`: Sets up initial configuration

## Radio

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `enable` (boolean): Default true. Controls enabled state
- `position` (string): Default "left". Label position
- `text` (string): Radio label text
- `id` (string|number): Radio identifier
- `name` (string): Input name attribute

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_labelTag` (HTMLElement): Label container element
- `m_inputTag` (HTMLElement): Input element
- `m_spanTag` (HTMLElement): Custom radio indicator
- `m_enable` (boolean): Current enabled state
- `m_checked` (boolean): Current checked state

### Public Methods
- `destroy()`: Removes radio
- `enable(context: object)`: Sets enabled state
  - `context.enable` (boolean): New enabled state
- `getId()`: Returns radio ID
- `getParentTag()`: Returns parent element
- `select(context: object)`: Gets/sets checked state
  - `context.value` (boolean): New checked state
  - `context.notTrigger` (boolean): If true, only updates visual state
- `setup(props: object)`: Initializes with configuration
- `value(context: object)`: Gets/sets input value
  - `context.value` (string): New value

### Private Functions
- `setupDOM()`: Creates radio structure
- `handleClick(ev: Event)`: Processes click events
- `checkInput(value: boolean, notTrigger: boolean)`: Updates checked state
- `setEnable()`: Updates enabled visual state
- `configure(customProps: object)`: Sets up initial configuration

## RadioGroup

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `name` (string): Default random string. Input name for all radios
- `radios` (array): Radio button configurations
- `radio` (object): Default configuration for all radios

### Private Properties
- `m_radioList` (array): Stored radio components
- `m_parentTag` (HTMLElement): Parent element reference

### Public Methods
- `clear()`: Unchecks all radios
- `destroy()`: Removes radio group
- `getParentTag()`: Returns parent element
- `getTag(context: object)`: Returns radio by ID
  - `context.id` (string): Radio ID
- `select(context: object)`: Gets/sets checked states
  - `context.id` (string|array): Radio ID(s) to check
  - `context.notTrigger` (boolean): If true, only updates visual state
- `setup(props: object)`: Initializes with configuration

### Private Functions
- `setupDOM()`: Creates radio group structure
- `processRadio(radio: object, index: number)`: Creates individual radios
- `handleGroupClick(context: object)`: Processes group click events
- `getTag(id: string)`: Returns radio by ID
- `getSelected()`: Returns checked radios
- `selectTag(tag: object, notTrigger: boolean)`: Updates radio state
- `deselectRadios()`: Unchecks all radios
- `configure(customProps: object)`: Sets up initial configuration

## Rating

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `value` (number): Default 0. Initial rating value
- `max` (number): Default 5. Maximum rating value
- `enable` (boolean): Default true. Controls enabled state

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_ratingEmptyTag` (HTMLElement): Empty stars container
- `m_ratingSelectedTag` (HTMLElement): Selected stars container
- `m_ratingHoverTag` (HTMLElement): Hover stars container
- `m_value` (number): Current rating value
- `m_enable` (boolean): Current enabled state

### Public Methods
- `destroy()`: Removes rating
- `enable(enable: boolean)`: Sets enabled state
- `getParentTag()`: Returns parent element
- `setup(props: object)`: Initializes with configuration
- `value(context: object)`: Gets/sets rating value
  - `context.value` (number): New value

### Private Functions
- `setupDOM()`: Creates rating structure
- `installLayers()`: Creates rating layers
- `installStars()`: Creates star elements
- `setupEventListener()`: Sets up event handlers
- `selectValue(ev: Event)`: Handles star selection
- `setHoverValue(ev: Event)`: Updates hover state
- `hideHoverLayer(ev: Event)`: Removes hover state
- `getStarWidth()`: Calculates star width
- `setValue(value: number)`: Updates rating value
- `setEnable()`: Updates enabled visual state
- `configure(customProps: object)`: Sets up initial configuration

## Search

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `firedIn` (number): Default 1. Minimum characters before triggering search
- `input` (object): Input configuration
  - `tags.input.prop.placeholder` (string): Default "Search". Input placeholder
- `suggest` (object): Suggestion listbox configuration
- `button` (object): Search button configuration
- `dropdown` (object): Dropdown configuration

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_inputContainer` (HTMLElement): Input container element
- `m_input` (Input): Input component instance
- `m_dropdownWrapperTag` (HTMLElement): Dropdown wrapper element
- `m_dropdown` (Dropdown): Dropdown component instance
- `m_listbox` (Listbox): Suggestion listbox component
- `m_searchButton` (Button): Search button component
- `m_value` (string): Current search value

### Public Methods
- `destroy()`: Removes search component
- `setup(props: object)`: Initializes with configuration
- `suggest(data: array)`: Updates suggestion list

### Private Functions
- `setupDOM()`: Creates search structure
- `setupInput()`: Creates input component
- `setupButton()`: Creates search button
- `setupDropdown()`: Creates dropdown component
- `installListbox(dropdown: object)`: Creates suggestion listbox
- `configure(customProps: object)`: Sets up initial configuration

## TimePicker

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `combobox` (object): Combobox configuration
  - `filter` (boolean): Default false. Enable filtering
- `value` (string): Default "". Initial time value
- `interval` (number): Default 30. Minutes between time options
- `format` (string): Default "h:mm A". Time format
- `min` (Date): Default today. Minimum time
- `max` (Date): Default today. Maximum time

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_comboBox` (Combobox): Combobox component instance
- `m_value` (Date|null): Current selected time

### Public Methods
- `destroy()`: Removes time picker
- `setup(props: object)`: Initializes with configuration
- `value(context: object)`: Gets/sets time value
  - `context.value` (string): New time value

### Private Functions
- `setupDOM()`: Creates time picker structure
- `setValue(value: string)`: Updates selected time
- `configure(customProps: object)`: Sets up initial configuration

## TreeView

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `data` (array): Default []. Tree data items
- `idField` (string): Default "id". ID field in data items
- `textField` (string): Default "text". Text field in data items
- `itemsField` (string): Default "items". Children field in data items
- `itemIdAttrName` (string): Default "data-tree-view-item-id". Item ID attribute

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_dataMapById` (object): Data items mapped by ID

### Public Methods
- `destroy()`: Removes tree view
- `getItemData(tag: HTMLElement)`: Returns item data by element
- `getParentTag()`: Returns parent element
- `setup(props: object)`: Initializes with configuration

### Private Functions
- `setupDOM()`: Creates tree view structure
- `processTreeData(groupData: array, parentTag: HTMLElement)`: Processes tree data
- `processItem(itemData: object, parentTag: HTMLElement)`: Creates tree item
- `processGroup(groupData: array, parentTag: HTMLElement)`: Creates item group
- `installIcon(parentTag: HTMLElement, groupTag: HTMLElement, itemData: object)`: Creates expand/collapse icon
- `clearSelected()`: Clears selected items
- `setupItemEventListeners(inTag: HTMLElement, itemData: object)`: Sets up item events
- `toggleExpand(groupTag: HTMLElement, iconTag: HTMLElement)`: Toggles group expansion
- `configure(customProps: object)`: Sets up initial configuration

## VideoPlayer

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `player` (object): Player configuration
  - `attr` (object): Player attributes
    - `controls` (boolean): Default true. Show player controls

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_player` (Player): Player component instance

### Public Methods
- `getPlayer()`: Returns player component
- `getPlayerTag()`: Returns player element
- `setup(props: object)`: Initializes with configuration

### Private Functions
- `setupDOM()`: Creates video player structure
- `configure(customProps: object)`: Sets up initial configuration

## Slideout

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `title` (string): Slideout header title
- `position` (string): Default "right". Slideout position ("left"|"right")
- `width` (string): Default "300px". Slideout width
- `overlay` (boolean): Default true. Show overlay background

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_slideoutHeaderTag` (HTMLElement): Header container
- `m_slideoutBodyTag` (HTMLElement): Body container
- `m_slideoutOverlayTag` (HTMLElement): Overlay element

### Public Methods
- `close()`: Closes slideout
- `getBodyTag()`: Returns body container
- `getHeaderTag()`: Returns header container
- `getParentTag()`: Returns slideout element
- `open()`: Opens slideout
- `setup(props: object)`: Initializes with configuration

### Private Functions
- `setupDOM()`: Creates slideout structure
- `setupEventHandler()`: Sets up event handlers
- `openAnimation()`: Handles opening animation
- `closeAnimation()`: Handles closing animation
- `configure(customProps: object)`: Sets up initial configuration

## Slider

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `orientation` (string): Default "horizontal". Slider orientation ("horizontal"|"vertical")
- `min` (number): Default 0. Minimum value
- `max` (number): Default 100. Maximum value
- `step` (number): Default 1. Step increment
- `largeStep` (number): Default 10. Large step increment
- `value` (number): Default 0. Initial value
- `enable` (boolean): Default true. Enable slider
- `showButtons` (boolean): Default true. Show increment/decrement buttons

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_wrapperTag` (HTMLElement): Slider wrapper element
- `m_trackTag` (HTMLElement): Track element
- `m_selectionTag` (HTMLElement): Selection indicator
- `m_draggable` (Draggable): Draggable handle component
- `m_stepTags` (array): Step marker elements
- `m_horizontal` (boolean): Current orientation state
- `m_enable` (boolean): Current enabled state
- `m_value` (number): Current value
- `m_stepLength` (number): Pixel length per step

### Public Methods
- `destroy()`: Removes slider
- `enable(enable: boolean)`: Sets enabled state
- `getParentTag()`: Returns slider element
- `setup(props: object)`: Initializes with configuration
- `value(context: object)`: Gets/sets value
  - `context.value` (number): New value

### Private Functions
- `setupDOM()`: Creates slider structure
- `installTrack()`: Creates track element
- `installSteps()`: Creates step markers
- `installLargeStep(container: HTMLElement, value: number)`: Creates large step marker
- `installSmallStep(container: HTMLElement)`: Creates small step marker
- `handleDecrease()`: Handles decrease button click
- `handleIncrease()`: Handles increase button click
- `setValue(value: number)`: Updates slider value
- `configure(customProps: object)`: Sets up initial configuration

## Switch

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `enable` (boolean): Default true. Enable switch
- `messages` (object): Switch state labels
  - `checked` (string): Default "ON". Checked state text
  - `unchecked` (string): Default "OFF". Unchecked state text

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_inputTag` (HTMLElement): Input element
- `m_containerTag` (HTMLElement): Switch container
- `m_enable` (boolean): Current enabled state
- `m_checked` (boolean): Current checked state

### Public Methods
- `check(checked: boolean)`: Sets checked state
- `checked()`: Returns checked state
- `destroy()`: Removes switch
- `enable(enable: boolean)`: Sets enabled state
- `getParentTag()`: Returns switch element
- `setup(props: object)`: Initializes with configuration
- `toggle()`: Toggles checked state

### Private Functions
- `setupDOM()`: Creates switch structure
- `handleClick()`: Handles click events
- `setEnable()`: Updates enabled visual state
- `configure(customProps: object)`: Sets up initial configuration

## Tab

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `contents` (array): Default []. Tab content configurations
- `tabs` (object): Tab button configurations
  - `fnClick` (function): Tab click handler

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_tabsTag` (HTMLElement): Tabs container
- `m_tabsGroup` (ButtonGroup): Tab buttons component
- `m_contentTag` (HTMLElement): Content container
- `m_contentTagsMap` (object): Content elements by tab ID
- `m_selectedId` (string): Currently selected tab ID

### Public Methods
- `setup(props: object)`: Initializes with configuration

### Private Functions
- `setupDOM()`: Creates tab structure
- `installTabs()`: Creates tab buttons
- `installContent(content: object)`: Creates tab content
- `toggleTabContent(clickedBtn: object)`: Handles tab selection
- `configure(customProps: object)`: Sets up initial configuration

## Textarea

### Public Properties (m_props)
- `tag` (string): Default "default". Tag template name
- `theme` (string): Default "default". Theme name
- `name` (string): Default random string. Textarea name
- `labelText` (string): Label text
- `value` (string): Initial value
- `editable` (boolean): Enable editing
- `required` (boolean): Mark as required
- `requiredText` (string): Default "This is a required field"
- `editButton` (object): Edit button configuration
- `cancelButton` (object): Cancel button configuration
- `checkButton` (object): Check button configuration
- `icon` (array): Icon configurations

### Private Properties
- `m_iconList` (array): Icon elements
- `m_buttonsContainerTag` (HTMLElement): Buttons container
- `m_cancelButton` (Button): Cancel button component
- `m_checkButton` (Button): Check button component
- `m_editButton` (Button): Edit button component
- `m_containerDownTag` (HTMLElement): Bottom container
- `m_containerUpTag` (HTMLElement): Top container
- `m_footerTag` (HTMLElement): Footer container
- `m_iconsContainerTag` (HTMLElement): Icons container
- `m_iconRequiredTag` (HTMLElement): Required icon
- `m_labelTag` (HTMLElement): Label element
- `m_textareaTag` (HTMLElement): Textarea element
- `m_textRequiredTag` (HTMLElement): Required text element
- `m_dataChanged` (boolean): Data change flag
- `m_editable` (boolean): Current editable state
- `m_required` (boolean): Current required state

### Public Methods
- `commitDataChange()`: Commits data changes
- `dataChanged()`: Returns data changed state
- `editable()`: Returns editable state
- `getIconTagById(id: string)`: Returns icon by ID
- `getTag()`: Returns textarea element
- `showRequired()`: Shows/hides required indicator
- `setup(props: object)`: Initializes with configuration
- `value(context: object)`: Gets/sets value
  - `context.value` (string): New value

### Private Functions
- `setupDOM()`: Creates textarea structure
- `installButtons()`: Creates control buttons
- `installIcons()`: Creates icons
- `handleEdit()`: Handles edit mode
- `handleCancel()`: Handles cancel edit
- `handleCheck()`: Handles save changes
- `configure(customProps: object)`: Sets up initial configuration
