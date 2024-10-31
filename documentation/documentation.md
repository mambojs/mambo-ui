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
18. [Percentage](#percentage)
19. [Player](#player)
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
- `text` (string): Default "Mambo Button". The button's display text
- `enable` (boolean): Default `true`. Controls button interactivity
- `preventDefault` (boolean): Default `true`. Prevents default event behavior
- `stopPropagation` (boolean): Default `true`. Stops event bubbling
- `tag` (string): Default "default". Template tag configuration name
- `theme` (string): Default "default". Theme configuration name
- `css` (object): CSS class names for styling
  - `button` (string): Main button class
  - `pressed` (string): Class when button is pressed
  - `selected` (string): Class when button is selected
  - `hover` (string): Class when button is hovered
  - `disabled` (string): Class when button is disabled
- `img` (object|array): Optional image configuration(s)
  - `css` (string): Image CSS class
  - `prop` (object): HTML properties
  - `attr` (object): HTML attributes
  - `hover` (string): Hover state image URL
  - `position` (string): Image position ("left"|"right")
- `icon` (object|array): Optional icon configuration(s)
  - `attr` (object): Icon attributes including class
  - `size` (string): Icon size class
  - `position` (string): Icon position ("left"|"right")

### Private Properties
- `m_imageList` (array): Stores image tag references
- `m_iconList` (array): Stores icon tag references
- `m_parentTag` (HTMLElement): Parent element reference
- `m_buttonTag` (HTMLElement): Main button element reference
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
- `configure(customProps: object)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `insertGraphic()`: Handles image insertion
- `insertIcon()`: Handles icon insertion
- `handleClick(ev: Event)`: Processes click events
- `handleMouseDown(ev: Event)`: Handles mouse down state
- `handleMouseUp(ev: Event)`: Handles mouse up state
- `mouseEnterOverButton()`: Handles mouse enter on button
- `mouseLeaveOverButton()`: Handles mouse leave on button
- `mouseEnterOverImage()`: Handles mouse enter on image
- `mouseLeaveOverImage()`: Handles mouse leave on image
- `selectBtn()`: Applies selected state
- `setEnable()`: Updates enabled/disabled state
## ButtonSVG

### Public Properties (m_props)
- `enable` (boolean): Default `true`. Controls button interactivity
- `preventDefault` (boolean): Default `true`. Prevents default event behavior
- `stopPropagation` (boolean): Default `true`. Stops event bubbling
- `tag` (string): Default "default". Template tag configuration name
- `theme` (string): Default "default". Theme configuration name
- `css` (object): CSS class names for styling
  - `button` (string): Main button class
  - `selected` (string): Class when button is selected
  - `hover` (string): Class when button is hovered
  - `disabled` (string): Class when button is disabled
  - `img` (object): Image-specific CSS classes
- `img` (object|array): Optional image configuration(s)
  - `css` (string): Image CSS class
  - `prop` (object): HTML properties
  - `attr` (object): HTML attributes
  - `hover` (string): Hover state image URL
- `svg` (object|array): Optional SVG configuration(s)
  - `element` (object): SVG element configuration
    - `attr` (object): SVG attributes
    - `paths` (array): Array of SVG path data
  - `prop` (object): SVG properties
  - `attr` (object): SVG attributes

### Private Properties
- `m_imageList` (array): Stores image tag references
- `m_parentTag` (HTMLElement): Parent element reference
- `m_buttonTag` (HTMLElement): Main button element reference
- `m_text` (string): Current button text
- `m_enable` (boolean): Current enabled state

### Public Methods
- `deselect()`: Removes selected state from button
- `enable(enable: boolean)`: Sets button enabled state
- `getConfig()`: Returns m_props configuration object
- `getId()`: Returns button ID from m_props
- `getImageTagById(id: string)`: Returns image tag by ID
- `getParentTag()`: Returns parent element
- `getTag()`: Returns button element
- `text(context: object)`: Gets/sets button text
  - `context.text` (string): New text to set
- `select(context: object)`: Handles external selection
  - `context.notTrigger` (boolean): If true, only updates visual state
- `setup(props: object)`: Initializes button with configuration

### Private Functions
- `configure(customProps: object)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `insertGraphic(graphic: object|array, func: Function)`: Generic graphic insertion handler
- `addImg(img: object)`: Handles image element creation
- `addSVG(svg: object)`: Handles SVG element creation
- `handleClick(ev: Event)`: Processes click events
- `mouseEnterOverButton()`: Handles mouse enter on button
- `mouseLeaveOverButton()`: Handles mouse leave on button
- `mouseEnterOverImage()`: Handles mouse enter on image
- `mouseLeaveOverImage()`: Handles mouse leave on image
- `selectBtn()`: Applies selected state
- `setEnable()`: Updates enabled/disabled state

## ButtonGroup

### Public Properties (m_props)
- `buttons` (array): Default `[]`. Array of button configurations
- `tag` (string): Default "default". Template tag configuration name
- `theme` (string): Default "default". Theme configuration name
- `fnGroupClick` (Function): Default handler for group button clicks
- `css` (object): CSS class names for styling
  - `self` (string): Container class
  - `button` (object): Button-specific CSS classes

### Private Properties
- `m_buttonsList` (array): Stores button component references
- `m_parentTag` (HTMLElement): Parent element reference
- `m_selectedButtonTag` (HTMLElement): Currently selected button reference

### Public Methods
- `deselect()`: Deselects all buttons in group
- `destroy()`: Removes button group from DOM
- `getConfigById(context: object)`: Returns button config by ID
  - `context.id` (string): Button ID to find
- `getParentTag()`: Returns group container element
- `getSelected()`: Returns currently selected button
- `getTag(context: object)`: Returns button element by ID
  - `context.id` (string): Button ID to find
- `select(context: object)`: Selects button by ID
  - `context.id` (string): Button ID to select
  - `context.notTrigger` (boolean): If true, only updates visual state
- `setup(props: object)`: Initializes button group with configuration

### Private Functions
- `configure(customProps: object)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `installButton(button: object)`: Creates individual button components
- `handleGroupBtnClick(context: object)`: Handles button click within group
  - `context.Button` (object): Clicked button reference
  - `context.ev` (Event): Click event object
- `deselectBtns()`: Deselects all buttons in group
- `getTag(id: string)`: Internal helper to find button by ID

## Calendar

### Public Properties (m_props)
- `theme` (string): Default "default". Theme configuration name
- `tag` (string): Default "default". Template tag configuration name
- `headerButtonGroup` (object): Configuration for header navigation buttons
  - `buttons` (array): Array of button configs for prev, title, next buttons
- `datesHeader` (object): Configuration for weekday headers
  - `layout` (string): Default "tile". Layout type
  - `tileHTML` (string): Template for header tiles
- `format` (string): Default "M/D/YYYY". Date format pattern
- `footer` (string): Default "dddd, MMMM D, YYYY". Footer date format
- `start` (string): Default "month". Initial view ("month"|"year"|"decade"|"century")
- `depth` (string): Default "month". Minimum navigation depth
- `min` (Date): Default 1900/1/1. Minimum selectable date
- `max` (Date): Default 2099/12/31. Maximum selectable date

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_headerButtonGroup` (ButtonGroup): Header navigation buttons component
- `m_headerButtonsList` (array): References to header buttons
- `m_bodyTag` (HTMLElement): Calendar body container
- `m_bodyHeaderTag` (HTMLElement): Calendar header container
- `m_bodyContentTag` (HTMLElement): Calendar content container
- `m_datesHeaderGrid` (Grid): Weekday headers grid component
- `m_datesButtonGroup` (ButtonGroup): Date buttons component
- `m_value` (Date): Currently selected date
- `m_viewDate` (Date): Currently displayed month/year
- `m_depths` (object): Depth level mappings
- `m_depth` (number): Current navigation depth
- `m_minDepth` (number): Minimum allowed depth
- `m_minDate` (Date): Minimum date boundary
- `m_maxDate` (Date): Maximum date boundary

### Public Methods
- `destroy()`: Removes calendar from DOM
- `getParentTag()`: Returns calendar container element
- `navigateToFuture()`: Moves view forward one period
- `navigateToPast()`: Moves view back one period
- `navigateUp()`: Moves to higher view level (month->year->decade->century)
- `setup(props: object)`: Initializes calendar with configuration
- `value(context: object)`: Gets/sets selected date
  - `context.value` (Date|string): Date to set

### Private Functions
- `configure(customProps: object)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `setupHeader()`: Creates navigation header
- `setupBody()`: Creates calendar body structure
- `setupFooter()`: Creates footer (today button)
- `setupBodyContent()`: Updates calendar content based on current view
- `installDatesHeader()`: Creates weekday header grid
- `installDates()`: Creates date buttons for month view
- `installMonths()`: Creates month buttons for year view
- `installYears()`: Creates year buttons for decade view
- `installDecades()`: Creates decade buttons for century view
- `navigate(number: number)`: Handles navigation between periods
- `selectValue(button: Button, ev: Event)`: Handles date selection
- `setValue(value: Date)`: Updates selected date
- `setViewDate(value: Date)`: Updates displayed period
- `isValidButton(value: Date)`: Checks if date is within bounds
- `getDefaultValue()`: Gets initial date value
- `getInRangeDate(value: Date)`: Ensures date is within bounds

## CheckboxGroup

### Public Properties (m_props)
- `tag` (string): Default "default". Template tag configuration name
- `theme` (string): Default "default". Theme configuration name
- `name` (string): Default random string. Input group name
- `checkboxes` (array): Default `[]`. Array of checkbox configurations
- `position` (string): Default "right". Label position ("left"|"right")
- `css` (object): CSS class names for styling
  - `self` (string): Container class
  - `checkbox` (object): Checkbox-specific CSS classes

### Private Properties
- `m_checkboxList` (array): Stores checkbox component references
- `m_parentTag` (HTMLElement): Parent element reference

### Public Methods
- `clear()`: Deselects all checkboxes
- `destroy()`: Removes checkbox group from DOM
- `getParentTag()`: Returns group container element
- `getTag(context: object)`: Returns checkbox by ID
  - `context.id` (string): Checkbox ID to find
- `select(context: object)`: Selects checkbox(es) by ID
  - `context.id` (string|array): ID(s) to select
  - `context.notTrigger` (boolean): If true, only updates visual state
- `setup(props: object)`: Initializes checkbox group with configuration

### Private Functions
- `configure(customProps: object)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `processCheckbox(checkbox: object, index: number)`: Creates individual checkboxes
- `handleGroupClick(context: object)`: Handles checkbox clicks within group
  - `context.Checkbox` (object): Clicked checkbox reference
  - `context.ev` (Event): Click event object
- `getTag(id: string)`: Internal helper to find checkbox by ID
- `getSelected()`: Returns array of selected checkboxes
- `selectTag(tag: Checkbox, notTrigger: boolean)`: Selects individual checkbox

## Combobox

### Public Properties (m_props)
- `tag` (string): Default "default". Template tag configuration name
- `theme` (string): Default "default". Theme configuration name
- `input` (object): Input field configuration
  - `events` (array): Input event handlers
- `dropdown` (object): Dropdown menu configuration
  - `button` (object): Dropdown button configuration
    - `text` (string): Button text
- `buttonGroup` (object): Button group configuration for dropdown items
- `idField` (string): Default "id". Field name for item IDs
- `textField` (string): Default "text". Field name for item display text
- `filter` (boolean): Default `true`. Enable filtering
- `value` (string): Default "". Initial value

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_input` (Input): Input component reference
- `m_dropdownWrapperTag` (HTMLElement): Dropdown container
- `m_dropdown` (Dropdown): Dropdown component reference
- `m_buttonGroup` (ButtonGroup): Button group for options
- `m_comboBoxData` (array): Data items for dropdown
- `m_value` (string): Current selected value
- `m_previous_text` (string): Previous input text value

### Public Methods
- `destroy()`: Removes combobox from DOM
- `getParentTag()`: Returns combobox container
- `getSelected()`: Returns selected button from dropdown
- `setup(props: object)`: Initializes combobox with configuration
- `value(context: object)`: Gets/sets current value
  - `context.value` (string): Value to set

### Private Functions
- `configure(customProps: object)`: Merges default and custom properties
- `setupDOM()`: Creates main structure
- `setupInput()`: Creates input component
- `setupDropdown()`: Creates dropdown component
- `installButtonGroup(dropdown: Dropdown, data: array)`: Creates option buttons
- `processItemData(itemData: object)`: Formats data item for button
- `filterItems()`: Filters dropdown options based on input
- `setValue(value: string, ev: Event)`: Updates selected value
- `getItemDataId(itemData: object)`: Extracts item ID
- `getItemDataText(itemData: object)`: Extracts item display text
- `handleKeyUp()`: Handles input key events
- `handleBlur(ev: Event)`: Handles input blur events

## Checkbox

### Public Properties (m_props)
- `enable` (boolean): Default `true`. Controls checkbox interactivity
- `name` (string): Default random string. Input name attribute
- `tag` (string): Default "default". Template tag configuration name
- `theme` (string): Default "default". Theme configuration name
- `position` (string): Default "left". Label position ("left"|"right")
- `text` (string): Checkbox label text
- `checked` (boolean): Initial checked state
- `css` (object): CSS class names for styling
  - `container` (string): Container class
  - `self` (string): Component root class
  - `text` (string): Label text class
  - `input` (string): Input element class
  - `span` (string): Custom checkbox class
  - `disabled` (string): Disabled state class

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_containerTag` (HTMLElement): Container element reference
- `m_inputTag` (HTMLElement): Input element reference
- `m_spanTag` (HTMLElement): Custom checkbox element reference
- `m_enabled` (boolean): Current enabled state
- `m_checked` (boolean): Current checked state

### Public Methods
- `destroy()`: Removes checkbox from DOM
- `enable(context)`: Sets enabled state
  - `context.enable` (boolean): Enable/disable checkbox
- `getId()`: Returns checkbox ID from m_props
- `getParentTag()`: Returns container element
- `select(context)`: Gets/sets checked state
  - `context.value` (boolean): Checked state to set
  - `context.notTrigger` (boolean): If true, only updates visual state
- `setup(props)`: Initializes checkbox with configuration
- `value(context)`: Gets/sets input value
  - `context.value` (string): Value to set

### Private Functions
- `configure(customProps)`: Merges default and custom properties
  - `customProps` (object): Custom configuration to merge
- `setupDOM()`: Creates and configures DOM elements
- `handleClick(ev)`: Processes click events
  - `ev` (Event): Click event object
- `checkInput(value, notTrigger)`: Updates checked state
  - `value` (boolean): New checked state
  - `notTrigger` (boolean): If true, only updates visual state
- `setEnable()`: Updates enabled/disabled state



## DatePicker

### Public Properties (m_props)
- `theme` (string): Default "default". Theme configuration name
- `tag` (string): Default "default". Template tag configuration name
- `input` (object): Input field configuration
  - `events` (array): Input event handlers
- `calendar` (object): Calendar component configuration
- `format` (string): Default "M/D/YYYY". Date format pattern
- `value` (Date|null): Default `null`. Initial date value
- `footer` (string): Default "dddd, MMMM D, YYYY". Calendar footer format
- `start` (string): Default "month". Initial calendar view
- `depth` (string): Default "month". Minimum calendar depth
- `min` (Date): Default 1900/1/1. Minimum date
- `max` (Date): Default 2099/12/31. Maximum date

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_input` (Input): Input component reference
- `m_dropdownWrapperTag` (HTMLElement): Dropdown container
- `m_dropdown` (Dropdown): Dropdown component reference
- `m_calendar` (Calendar): Calendar component reference
- `m_value` (Date|null): Current selected date
- `m_previous_text` (string): Previous input text value

### Public Methods
- `destroy()`: Removes datepicker from DOM
- `getParentTag()`: Returns datepicker container
- `setup(props: object)`: Initializes datepicker with configuration
- `value(context: object)`: Gets/sets current date
  - `context.value` (Date|string): Date to set

### Private Functions
- `configure(customProps: object)`: Merges default and custom properties
- `setupDOM()`: Creates main structure
- `setupInput()`: Creates input component
- `setupDropdown()`: Creates dropdown component
- `installCalendar(dropdown: Dropdown)`: Creates calendar component
- `setValue(value: Date|string)`: Updates selected date
- `handleBlur(ev: Event)`: Handles input blur events

## Dialog

### Public Properties (m_props)
- `parentTag` (string): Default "body". Parent element selector
- `closeButton` (boolean): Default `true`. Show close button
- `closeText` (string): Default "close". Close button text
- `theme` (string): Default "default". Theme configuration name
- `tag` (string): Default "default". Template tag configuration name
- `title` (string): Dialog title text
- `hdrHtml` (HTMLElement): Optional custom header content

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_dialogHdrTag` (HTMLElement): Dialog header container
- `m_dialogBodyTag` (HTMLElement): Dialog body container

### Public Methods
- `close()`: Closes and removes dialog
- `getParentTag()`: Returns dialog container
- `getBodyTag()`: Returns dialog body element
- `getHeaderTag()`: Returns dialog header element
- `setup(props: object)`: Initializes dialog with configuration

### Private Functions
- `configure(customProps: object)`: Merges default and custom properties
- `setupDOM()`: Creates dialog structure
- `installCloseButton(headerLeftTag: HTMLElement)`: Creates close button
- `closeDialog()`: Internal close handler
- `setPosition(xPos: number, yPos: number)`: Updates element position

## DragDrop

### Public Properties (m_props)
- `dropText` (string): Default "Drop Here". Displayed text
- `tag` (string): Default "default". Template tag configuration name
- `theme` (string): Default "default". Theme configuration name
- `maxFileCount` (number): Maximum allowed files
- `allowKind` (array): Allowed file types
- `css` (object): CSS class names for styling
  - `self` (string): Component root class
  - `dropIcon` (string): Drop icon class
  - `dropText` (string): Text class

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_props` (object): Component configuration

### Public Methods
- `destroy()`: Removes component from DOM
- `getParentTag()`: Returns component root element
- `setup(props)`: Initializes component with configuration

### Private Functions
- `configure(customProps)`: Merges default and custom properties
  - `customProps` (object): Custom configuration to merge
- `setupDOM()`: Creates and configures DOM elements
- `setupEventListener()`: Sets up drag and drop events
- `handleMouseEnterLeave(ev)`: Handles mouse enter/leave events
  - `ev` (Event): Mouse event object
- `handleDragover(ev)`: Handles dragover events
  - `ev` (Event): Dragover event object
- `handleDrop(ev)`: Handles drop events
  - `ev` (Event): Drop event object
- `checkFileKindAllowed(type)`: Validates file type
  - `type` (string): File MIME type



## Draggable

### Public Properties (m_props)
- `tag` (string): Default "default". Template tag configuration name
- `theme` (string): Default "default". Theme configuration name
- `enable` (boolean): Default `true`. Controls draggable state
- `axis` (string): Constrains movement ("x"|"y"|null)
- `grid` (array): Snap to grid [x, y] increments
- `containerTag` (string): Bounding container selector
- `css` (object): CSS class names for styling
  - `self` (string): Component root class
  - `draggable` (string): Draggable element class

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_draggableTag` (HTMLElement): Draggable element reference
- `m_enable` (boolean): Current enabled state
- `m_active` (boolean): Currently dragging state
- `m_axis` (number): Movement constraint (0: x, 1: y, null: none)
- `m_initialX` (number): Initial X position
- `m_initialY` (number): Initial Y position
- `m_xOffset` (number): Current X offset
- `m_yOffset` (number): Current Y offset
- `m_bounding` (DOMRect): Bounding container dimensions

### Public Methods
- `destroy()`: Removes component from DOM
- `enable(enable)`: Sets enabled state
  - `enable` (boolean): Enable/disable dragging
- `getParentTag()`: Returns draggable element
- `getHandleWidth()`: Returns handle width
- `getHandleHeight()`: Returns handle height
- `setPosition(xPos, yPos)`: Sets element position
  - `xPos` (number): X position
  - `yPos` (number): Y position
- `setup(props)`: Initializes component with configuration

### Private Functions
- `configure(customProps)`: Merges default and custom properties
  - `customProps` (object): Custom configuration to merge
- `setupDOM()`: Creates and configures DOM elements
- `setupEventHandler()`: Sets up drag events
- `dragStart(ev)`: Handles drag start
  - `ev` (Event): Mouse/touch event
- `drag(ev)`: Handles dragging
  - `ev` (Event): Mouse/touch event
- `dragEnd(ev)`: Handles drag end
  - `ev` (Event): Mouse/touch event
- `getAxisStep(current, step, min, max)`: Calculates grid snap position
  - `current` (number): Current position
  - `step` (number): Grid increment
  - `min` (number): Minimum bound
  - `max` (number): Maximum bound



## Dropdown

### Public Properties (m_props)
- `tag` (string): Defines the component tag template. Default: "default"
- `theme` (string): Defines the component theme template. Default: "default"
- `fnBeforeClose` (function): Callback before dropdown closes. Returns boolean. Default: returns true
- `button` (object): Button configuration
  - `text` (string): Button text
  - `css` (object): Button CSS classes
  - `fnClick` (function): Button click handler
- `css` (object): Component CSS classes merged with theme
- `tags` (object): Component HTML tags merged with template

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_dropdownContainerTag` (HTMLElement): Dropdown container element
- `m_props` (object): Component configuration
- `m_open` (boolean): Dropdown open state

### Public Methods
- `close(context)`: Closes the dropdown
  - `context.ev` (Event): Optional event object
- `destroy()`: Removes dropdown from DOM
- `getContentTag()`: Returns dropdown container element
- `getParentTag()`: Returns component root element
- `open()`: Opens the dropdown
- `setup(props)`: Initializes the component with given properties

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `setupOpenButton()`: Creates and configures dropdown trigger button
- `setupContainer()`: Creates dropdown content container
- `setupEventHandler()`: Sets up click outside handler
- `openAnimation()`: Shows dropdown and triggers open callback
- `closeAnimation(ev)`: Hides dropdown and triggers close callback
- `setupComplete()`: Triggers completion callback



## FileChooser

### Public Properties (m_props)
- `tag` (string): Component tag template. Default: "default"
- `theme` (string): Component theme template. Default: "default"
- `button` (object): Button configuration
  - `text` (string): Button text. Default: "Select File"
- `input` (object): Input configuration
  - `labelText` (string): Input label. Default: "Choose files to upload"
  - `tags.input.attr.type` (string): Input type. Default: "file"
- `buttonOnly` (boolean): Show only button interface
- `fnUpload` (function): File selection callback

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_inputTag` (HTMLElement): File input element
- `m_props` (object): Component configuration

### Public Methods
- `destroy()`: Removes component from DOM
- `getInputTag()`: Returns file input element
- `getParentTag()`: Returns component root element
- `setup(props)`: Initializes component with given properties

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `installButton()`: Creates button interface
- `installInput(hidden)`: Creates file input element
- `setupComplete()`: Triggers completion callback



## Grid

### Public Properties (m_props)
- `tag` (string): Component tag template. Default: "default"
- `theme` (string): Component theme template. Default: "default"
- `layout` (string): Grid layout type. Default: "grid"
- `columns` (array): Column configurations
- `data` (array): Grid data
- `maxColWidth` (boolean): Enable column width calculation
- `colWidthAdj` (number): Column width adjustment
- `fnPostRow` (function): Row creation callback
- `fnPostTile` (function): Tile creation callback

### Private Properties
- `m_colsMaxPxWidth` (array): Column maximum widths
- `m_componentsMapById` (object): Components mapped by ID
- `m_componentsMapByColNbr` (array): Components mapped by column number
- `m_gridData` (array): Grid data reference
- `m_gridDataChanged` (boolean): Data change flag

### Public Methods
- `commitDataChange()`: Commits data changes
- `dataChanged()`: Returns data change state
- `getCellComponentByIdByRow(context)`: Returns cell component by ID and row
- `getCellComponentsById()`: Returns all components by ID
- `getCellComponentByColNbrByRow(context)`: Returns cell component by column number and row
- `getCellComponentsByColNbr()`: Returns all components by column number
- `getGridData()`: Returns grid data
- `getId()`: Returns grid ID
- `getRowIndex(context)`: Returns row index
- `removeColsStyles()`: Removes column styles
- `setup(props)`: Initializes component

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `setupGridDOM()`: Creates grid layout
- `setupTilesDOM()`: Creates tiles layout
- `installHdr()`: Creates grid header
- `installRows()`: Creates grid rows
- `processRow(rowData, rowIndex)`: Processes single row
- `installCell(context)`: Creates grid cell
- Multiple cell type installation functions (text, button, input, etc.)



## Input

### Public Properties (m_props)
- `tag` (string): Component tag template. Default: "default"
- `theme` (string): Component theme template. Default: "default"
- `name` (string): Input name attribute. Default: random string
- `value` (string): Input value
- `validate` (object): Validation configuration
  - `onStart` (boolean): Validate on initialization
  - `types` (array): Validation rules
- `fnChange` (function): Change event callback
- `fnBlur` (function): Blur event callback
- `fnKeyup` (function): Keyup event callback
- `fnDataValidationChange` (function): Validation change callback

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_inputTag` (HTMLElement): Input element
- `m_labelTag` (HTMLElement): Label element
- `m_props` (object): Component configuration
- `m_dataChanged` (boolean): Data change flag

### Public Methods
- `clear()`: Clears input value
- `commitDataChange()`: Commits data changes
- `dataChanged()`: Returns data change state
- `getTag()`: Returns input element
- `setup(props)`: Initializes component
- `value(context)`: Gets/sets input value

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `handleOnBlur(ev)`: Blur event handler
- `handleOnChange(ev)`: Change event handler
- `handleOnKeyup(ev)`: Keyup event handler
- `validate(ev)`: Validates input value
- `validateMinLength(config, ev)`: Minimum length validation



## Listbox

### Public Properties (m_props)
- `tag` (string): Component tag template. Default: "default"
- `theme` (string): Component theme template. Default: "default"
- `displayKey` (string): Data display property. Default: "displayName"
- `data` (array): Listbox items
- `fnSelect` (function): Item selection callback
- `fnHover` (function): Item hover callback
- `fnLeave` (function): Item leave callback

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_listboxContainerTag` (HTMLElement): Container element
- `m_props` (object): Component configuration
- `m_listboxData` (array): Listbox data reference

### Public Methods
- `addToList(data)`: Adds items to list
- `destroy()`: Removes component from DOM
- `replaceList(data)`: Replaces all items
- `setup(props)`: Initializes component

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `installItems(data)`: Creates list items
- `processItem(itemData)`: Creates single item
- `setupItemEventListeners(item, data)`: Sets up item events
- `clearData()`: Removes all items



## MapBox

### Public Properties (m_props)
- `tag` (string): Component tag template. Default: "default"
- `theme` (string): Component theme template. Default: "default"
- `accessToken` (string): Mapbox access token
- `mapStyle` (string): Map style URL. Default: "mapbox://styles/mapbox/streets-v11"
- `zoom` (number): Default zoom level. Default: 16
- `marker` (object): Default marker configuration
  - `color` (string): Marker color. Default: "orange"
- `controls` (object): Map controls configuration
  - `fullscreen` (object): Fullscreen control
  - `navigation` (object): Navigation control
  - `search` (object): Search control

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_containerTag` (HTMLElement): Map container element
- `m_props` (object): Component configuration
- `m_map` (object): Mapbox map instance
- `m_markers` (array): Map markers

### Public Methods
- `addPoints(points)`: Adds markers to map
- `fitBounds(props)`: Fits map to bounds
- `getMarker(coords)`: Returns marker at coordinates
- `getMarkers()`: Returns all markers
- `jumpTo(lng, lat)`: Centers map on coordinates
- `setup(props)`: Initializes component

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `renderMap()`: Creates map instance
- `getUserLocation()`: Gets user location
- `addCurrentPositionMarked(lng, lat)`: Adds user location marker
- `setMarker(arrCoords, marker)`: Creates map markers
- `checkMapboxLibraries()`: Validates required libraries



## Percentage

### Public Properties (m_props)
- `tag` (string): Component tag template. Default: "default"
- `theme` (string): Component theme template. Default: "default"
- `value` (number): Initial value. Default: 0
- `min` (number): Minimum value. Default: 0
- `max` (number): Maximum value. Default: 1
- `decimals` (number): Decimal places. Default: 0
- `ranges` (array): Value ranges configuration
  - `min` (number): Range minimum
  - `max` (number): Range maximum
  - `css` (string): Range CSS class

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_percentageBarTag` (HTMLElement): Progress bar element
- `m_percentageTextTag` (HTMLElement): Text element
- `m_props` (object): Component configuration
- `m_value` (number): Current value

### Public Methods
- `destroy()`: Removes component from DOM
- `getParentTag()`: Returns component root element
- `setup(props)`: Initializes component
- `value(context)`: Gets/sets percentage value

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `setValue(value)`: Updates percentage value
- `setText()`: Updates percentage text
- `setBarWidth()`: Updates progress bar width
- `setRange()`: Applies range styling
- `clearRangeClasses()`: Removes range styles



## Player

### Public Properties (m_props)
- `tag` (string): Component tag template. Default: "default"
- `theme` (string): Component theme template. Default: "default"
- `progressBar` (boolean): Show progress bar. Default: true
- `controls` (array): Player controls configuration

### Private Properties
- `m_buttonGroups` (array): Control button groups
- `m_parentTag` (HTMLElement): Parent element reference
- `m_playerTag` (HTMLElement): Video player element
- `m_props` (object): Component configuration

### Public Methods
- `getTag()`: Returns player element
- `setup(props)`: Initializes component

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `setSource(source)`: Sets video source
- `installControls()`: Creates player controls
- `installButtonGroup(buttons)`: Creates control buttons



## Radio

### Public Properties (m_props)
- `tag` (string): Component tag template. Default: "default"
- `theme` (string): Component theme template. Default: "default"
- `enable` (boolean): Radio enabled state. Default: true
- `position` (string): Label position. Default: "left"
- `text` (string): Radio label text
- `fnClick` (function): Click event callback
- `fnGroupClick` (function): Group click callback

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_labelTag` (HTMLElement): Label element
- `m_inputTag` (HTMLElement): Radio input element
- `m_spanTag` (HTMLElement): Custom radio element
- `m_props` (object): Component configuration
- `m_enable` (boolean): Enabled state
- `m_checked` (boolean): Checked state

### Public Methods
- `destroy()`: Removes component from DOM
- `enable(context)`: Gets/sets enabled state
- `getId()`: Returns radio ID
- `getParentTag()`: Returns label element
- `select(context)`: Gets/sets checked state
- `setup(props)`: Initializes component
- `value(context)`: Gets/sets radio value

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `handleClick(ev)`: Click event handler
- `checkInput(value, notTrigger)`: Updates checked state
- `setEnable()`: Updates enabled state



## RadioGroup

### Public Properties (m_props)
- `tag` (string): Component tag template. Default: "default"
- `theme` (string): Component theme template. Default: "default"
- `name` (string): Group name. Default: random string
- `radios` (array): Radio button configurations
- `fnClick` (function): Radio click callback
- `fnGroupClick` (function): Group click callback

### Private Properties
- `m_radioList` (array): Radio button instances
- `m_parentTag` (HTMLElement): Parent element reference
- `m_props` (object): Component configuration

### Public Methods
- `clear()`: Clears all selections
- `destroy()`: Removes component from DOM
- `getParentTag()`: Returns component root element
- `getTag(context)`: Returns radio by ID
- `select(context)`: Gets/sets radio selection
- `setup(props)`: Initializes component

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `processRadio(radio, index)`: Creates radio button
- `handleGroupClick(context)`: Group click handler
- `selectTag(tag, notTrigger)`: Updates radio selection
- `deselectRadios()`: Clears all selections



## Rating

### Public Properties (m_props)
- `tag` (string): Component tag template. Default: "default"
- `theme` (string): Component theme template. Default: "default"
- `value` (number): Initial value. Default: 0
- `max` (number): Maximum rating. Default: 5
- `enable` (boolean): Rating enabled state. Default: true
- `fnSelect` (function): Selection callback

### Private Properties
- `m_parentTag` (HTMLElement): Parent element reference
- `m_ratingEmptyTag` (HTMLElement): Empty stars container
- `m_ratingSelectedTag` (HTMLElement): Selected stars container
- `m_ratingHoverTag` (HTMLElement): Hover stars container
- `m_props` (object): Component configuration
- `m_value` (number): Current value
- `m_enable` (boolean): Enabled state

### Public Methods
- `destroy()`: Removes component from DOM
- `enable(enable)`: Sets enabled state
- `getParentTag()`: Returns component root element
- `setup(props)`: Initializes component
- `value(context)`: Gets/sets rating value

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates and configures DOM elements
- `installLayers()`: Creates rating layers
- `installStars()`: Creates star elements
- `setupEventListener()`: Sets up interactions
- `selectValue(ev)`: Updates rating value
- `setHoverValue(ev)`: Updates hover state
- `hideHoverLayer(ev)`: Removes hover state
- `setValue(value)`: Updates rating value



## Search

### Public Properties (m_props)
- `firedIn` (Number): Minimum number of characters required before triggering search. Default: 1
- `tag` (String): Tag identifier for component styling. Default: "default"
- `theme` (String): Theme identifier for component styling. Default: "default"
- `input` (Object): Configuration for the input element
  - `tags` (Object): HTML tag configurations
    - `input` (Object): Input element properties
      - `prop` (Object): HTML properties
        - `placeholder` (String): Input placeholder text. Default: "Search"

### Private Properties
- `m_parentTag` (HTMLElement): Reference to parent container element
- `m_inputContainer` (HTMLElement): Container for search input
- `m_input` (HTMLElement): Search input element
- `m_dropdownWrapperTag` (HTMLElement): Wrapper for dropdown suggestions
- `m_dropdown` (Object): Dropdown component instance
- `m_listbox` (Object): Listbox component instance
- `m_searchButton` (Object): Search button component instance
- `m_value` (String): Current search input value

### Public Methods
- `destroy()`: Removes the search component from DOM
- `setup(props)`: Initializes the search component with given properties
- `suggest(data)`: Updates suggestion list with provided data

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates initial DOM structure
- `setupInput()`: Configures input element and its events
- `setupButton()`: Configures search button
- `setupDropdown()`: Configures suggestion dropdown
- `setupComplete()`: Executes completion callback



## Slideout

### Public Properties (m_props)
- `enableCloseButton` (Boolean): Controls visibility of close button. Default: true
- `tag` (String): Tag identifier for component styling. Default: "default"
- `theme` (String): Theme identifier for component styling. Default: "default"

### Private Properties
- `m_parentTag` (HTMLElement): Reference to parent container element
- `m_slideoutHeaderTag` (HTMLElement): Header section of slideout
- `m_slideoutBodyTag` (HTMLElement): Body section of slideout
- `m_slideoutOverlayTag` (HTMLElement): Overlay element behind slideout

### Public Methods
- `close()`: Closes the slideout
- `destroy()`: Removes slideout from DOM
- `getContentTag()`: Returns slideout element
- `getHeaderTag()`: Returns header element
- `getBodyTag()`: Returns body element
- `open()`: Opens the slideout
- `setup(props)`: Initializes slideout with given properties

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates initial DOM structure
- `installCloseButton()`: Adds close button if enabled
- `openAnimation()`: Handles opening animation
- `closeAnimation()`: Handles closing animation
- `setupComplete()`: Executes completion callback



## Slider

### Public Properties (m_props)
- `tag` (String): Tag identifier for component styling. Default: "default"
- `theme` (String): Theme identifier for component styling. Default: "default"
- `value` (Number): Initial slider value. Default: 0
- `min` (Number): Minimum value. Default: -10
- `max` (Number): Maximum value. Default: 10
- `step` (Number): Step increment. Default: 1
- `largeStep` (Number): Large step increment. Default: 5
- `orientation` (String): Slider orientation. Default: "horizontal"
- `enable` (Boolean): Initial enabled state. Default: true
- `showButtons` (Boolean): Show increment/decrement buttons. Default: true

### Private Properties
- `m_parentTag` (HTMLElement): Reference to parent container
- `m_wrapperTag` (HTMLElement): Wrapper element
- `m_trackTag` (HTMLElement): Track element
- `m_selectionTag` (HTMLElement): Selection indicator
- `m_draggable` (Object): Draggable handle component
- `m_stepTags` (Array): Collection of step elements
- `m_horizontal` (Boolean): Orientation state
- `m_enable` (Boolean): Enabled state
- `m_value` (Number): Current value
- `m_stepLength` (Number): Calculated step length

### Public Methods
- `destroy()`: Removes slider from DOM
- `enable(context)`: Sets enabled state
- `getParentTag()`: Returns slider element
- `setup(props)`: Initializes slider with properties
- `value(context)`: Gets/sets slider value

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates initial DOM structure
- `installTrack()`: Creates track elements
- `installSteps()`: Creates step indicators
- `installHandle()`: Creates draggable handle
- `setValue(value)`: Updates slider value
- `updateValue(context)`: Handles value updates
- `setupComplete()`: Executes completion callback



## Switch

### Public Properties (m_props)
- `tag` (String): Tag identifier for component styling. Default: "default"
- `theme` (String): Theme identifier for component styling. Default: "default"
- `enable` (Boolean): Initial enabled state. Default: true
- `messages` (Object): Switch text labels
  - `checked` (String): Text for checked state. Default: "ON"
  - `unchecked` (String): Text for unchecked state. Default: "OFF"

### Private Properties
- `m_parentTag` (HTMLElement): Reference to parent container
- `m_inputTag` (HTMLElement): Input element
- `m_containerTag` (HTMLElement): Container element
- `m_enable` (Boolean): Enabled state
- `m_checked` (Boolean): Checked state

### Public Methods
- `check(context)`: Sets checked state
- `checked()`: Returns current checked state
- `configure(props)`: Updates configuration
- `destroy()`: Removes switch from DOM
- `enable(context)`: Sets enabled state
- `getParentTag()`: Returns switch element
- `setup(props)`: Initializes switch
- `toggle()`: Toggles checked state

### Private Functions
- `setupDOM()`: Creates initial DOM structure
- `installLabels()`: Creates label elements
- `setupEventListener()`: Binds event handlers
- `setEnable()`: Updates enabled state
- `handleClick(ev)`: Handles click events
- `toggleSwitch(ev)`: Toggles switch state
- `setupComplete()`: Executes completion callback



## Tab

### Public Properties (m_props)
- `theme` (String): Theme identifier for component styling. Default: "default"
- `tag` (String): Tag identifier for component styling. Default: "default"
- `contents` (Array): Tab content elements. Default: []

### Private Properties
- `m_parentTag` (HTMLElement): Reference to parent container
- `m_tabsTag` (HTMLElement): Tabs container element
- `m_tabsGroup` (Object): Button group component
- `m_contentTag` (HTMLElement): Content container element
- `m_contentTagsMap` (Object): Map of content elements
- `m_selectedId` (String): Currently selected tab ID

### Public Methods
- `setup(props)`: Initializes tab component with properties

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates initial DOM structure
- `installTabs()`: Creates tab buttons
- `installContent()`: Creates content containers
- `toggleTabContent(clickedBtn)`: Handles tab switching
- `setupComplete()`: Executes completion callback



## Textarea

### Public Properties (m_props)
- `tag` (String): Tag identifier for component styling. Default: "default"
- `theme` (String): Theme identifier for component styling. Default: "default"
- `name` (String): Input name attribute. Default: Random string
- `button` (Object): Clear button configuration. Default: { text: "" }

### Private Properties
- `m_parentTag` (HTMLElement): Reference to parent container
- `m_textareaTag` (HTMLElement): Textarea element
- `m_labelTag` (HTMLElement): Label element
- `m_button` (Object): Clear button component
- `m_dataChanged` (Boolean): Data change flag

### Public Methods
- `clear()`: Clears textarea content
- `commitDataChange()`: Resets data change flag
- `dataChanged()`: Returns data change state
- `getTag()`: Returns textarea element
- `setup(props)`: Initializes textarea
- `value(context)`: Gets/sets textarea value

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates initial DOM structure
- `installClearTextarea()`: Adds clear button
- `validate(ev)`: Validates input
- `setupComplete()`: Executes completion callback



## TimePicker

### Public Properties (m_props)
- `tag` (String): Tag identifier for component styling. Default: "default"
- `theme` (String): Theme identifier for component styling. Default: "default"
- `combobox` (Object): Combobox configuration. Default: { filter: false }
- `value` (String): Initial time value. Default: ""
- `interval` (Number): Time interval in minutes. Default: 30
- `format` (String): Time format string. Default: "h:mm A"
- `min` (Date): Minimum selectable time. Default: Today
- `max` (Date): Maximum selectable time. Default: Today

### Private Properties
- `m_parentTag` (HTMLElement): Reference to parent container
- `m_comboBox` (Object): Combobox component instance
- `m_value` (Date): Current selected time

### Public Methods
- `destroy()`: Removes time picker from DOM
- `getParentTag()`: Returns component element
- `setup(props)`: Initializes time picker
- `value(context)`: Gets/sets time value

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates initial DOM structure
- `setupComboBox()`: Configures combobox component
- `createComboBoxData()`: Generates time options
- `selectTime(context)`: Handles time selection
- `setupComplete()`: Executes completion callback



## TreeView

### Public Properties (m_props)
- `data` (Array): Tree structure data. Default: []
- `tag` (String): Tag identifier for component styling. Default: "default"
- `theme` (String): Theme identifier for component styling. Default: "default"
- `idField` (String): ID field name in data. Default: "id"
- `textField` (String): Text field name in data. Default: "text"
- `itemsField` (String): Children field name in data. Default: "items"
- `itemIdAttrName` (String): Item ID attribute name. Default: "data-tree-view-item-id"

### Private Properties
- `m_parentTag` (HTMLElement): Reference to parent container
- `m_dataMapById` (Object): Map of items by ID

### Public Methods
- `destroy()`: Removes tree view from DOM
- `getItemData(tag)`: Returns item data by tag
- `getParentTag()`: Returns component element
- `setup(props)`: Initializes tree view

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates initial DOM structure
- `processTreeData(groupData, parentTag)`: Processes tree data
- `processItem(itemData, parentTag)`: Creates tree items
- `processGroup(groupData, parentTag)`: Creates item groups
- `installIcon(parentTag, groupTag, itemData)`: Adds expand/collapse icons
- `setupItemEventListeners(inTag, itemData)`: Binds item events
- `toggleExpand(groupTag, iconTag)`: Handles expansion state
- `setupComplete()`: Executes completion callback



## VideoPlayer

### Public Properties (m_props)
- `tag` (String): Tag identifier for component styling. Default: "default"
- `theme` (String): Theme identifier for component styling. Default: "default"
- `player` (Object): Video player configuration
  - `attr` (Object): Player attributes
    - `controls` (Boolean): Show player controls. Default: true

### Private Properties
- `m_parentTag` (HTMLElement): Reference to parent container
- `m_player` (Object): Player component instance

### Public Methods
- `getPlayer()`: Returns player instance
- `getPlayerTag()`: Returns player element
- `setup(props)`: Initializes video player

### Private Functions
- `configure(customProps)`: Merges default and custom properties
- `setupDOM()`: Creates initial DOM structure
- `setupComplete()`: Executes completion callback


