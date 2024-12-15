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

#### Public Properties (m_props)

- `tag` (string): Defines tag set to use. Default: "default"
- `theme` (string): Defines visual theme. Default: "default"
- `parentTag` (HTMLElement): Parent element where button will mount
- `text` (string): Button text content
- `enable` (boolean): Enable/disable state. Default: true
- `selected` (boolean): Selected state. Default: false
- `icon` (Object): Icon configuration
    - `class` (string): Icon CSS class
    - `size` (string): Icon size class
    - `attr` (Object): Additional icon attributes
- `img` (Object): Image configuration
    - `src` (string): Image source URL
    - `attr` (Object): Additional image attributes
- `onClick` (Function): Click event handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Reference to parent element
- `m_buttonTag` (HTMLElement): Reference to button element
- `m_props` (Object): Component configuration storage
- `m_enable` (boolean): Current enable state
- `m_selected` (boolean): Current selected state

#### Public Methods

- `setup(props)`: Configures button with given properties
    - `props` (Object): Configuration object matching m_props structure
- `enable(context)`: Gets/sets enable state
    - `context` (Object):
        - `enable` (boolean): New enable state
- `selected(context)`: Gets/sets selected state
    - `context` (Object):
        - `selected` (boolean): New selected state
- `getId()`: Returns button ID
- `getText()`: Returns button text

#### Private Functions

- `configure(customProps)`: Sets initial configuration
    - `customProps` (Object): Custom properties to override defaults
- `setupDOM()`: Creates and configures DOM structure
- `handleClick(ev)`: Handles click events
- `setEnable()`: Updates enable state visually and logically
- `setSelected()`: Updates selected state visually and logically

## ButtonGroup

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `buttons` (Array): Button configurations
- `multiSelect` (boolean): Allows multiple selection. Default: false
- `onClick` (Function): Click event handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_buttons` (Array): Button instances
- `m_selectedButtons` (Array): Currently selected buttons

#### Public Methods

- `setup(props)`: Configures button group
- `getButtons()`: Returns button instances
- `getSelectedButtons()`: Returns selected buttons

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `installButtons()`: Creates button instances
- `handleButtonClick()`: Manages button selection logic

## Calendar

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `depth` (string): View depth ('month'|'year'|'decade'|'century'). Default: 'month'
- `min` (Date): Minimum selectable date
- `max` (Date): Maximum selectable date
- `value` (Date): Selected date
- `format` (string): Date format. Default: "MM/DD/YYYY"
- `onChange` (Function): Selection change handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_bodyTag` (HTMLElement): Calendar body element
- `m_bodyContentTag` (HTMLElement): Content container
- `m_bodyHeaderTag` (HTMLElement): Header container
- `m_props` (Object): Configuration storage
- `m_depth` (string): Current view depth
- `m_value` (Date): Current selected date
- `m_currentDate` (Date): Currently displayed date

#### Public Methods

- `setup(props)`: Configures calendar
- `value(context)`: Gets/sets selected date
    - `context` (Object):
        - `value` (Date): New date value

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `installHeader()`: Sets up calendar header
- `installContent()`: Sets up content based on depth
- `installDates()`: Renders month view
- `installMonths()`: Renders months view
- `installYears()`: Renders years view
- `installDecades()`: Renders decades view

## Combobox

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `data` (Array): Combobox options
- `value` (string): Initial value
- `filter` (boolean): Enables filtering. Default: true
- `filterType` (string): Filter method ('contains'|'equals'). Default: 'contains'
- `onSelect` (Function): Selection handler
- `onChange` (Function): Value change handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_dropdown` (Object): Dropdown instance
- `m_input` (Object): Input instance
- `m_buttonGroup` (Object): Button group instance
- `m_value` (string): Current value
- `m_filteredData` (Array): Filtered options

#### Public Methods

- `setup(props)`: Configures combobox
- `value(context)`: Gets/sets value
    - `context` (Object):
        - `value` (string): New value
- `destroy()`: Removes component

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupDropdown()`: Configures dropdown
- `setupInput()`: Configures input field
- `setupButtonGroup()`: Configures button group
- `filterData(searchText)`: Filters options based on input
    - `searchText` (string): Search term
- `handleSelect(item)`: Handles item selection
    - `item` (Object): Selected item

## DatePicker

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `format` (string): Date format. Default: "MM/DD/YYYY"
- `min` (Date): Minimum selectable date
- `max` (Date): Maximum selectable date
- `value` (Date): Initial date value
- `onSelect` (Function): Selection handler
- `onChange` (Function): Value change handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_dropdown` (Object): Dropdown instance
- `m_calendar` (Object): Calendar instance
- `m_input` (Object): Input instance
- `m_value` (Date): Current date value

#### Public Methods

- `setup(props)`: Configures datepicker
- `value(context)`: Gets/sets date value
    - `context` (Object):
        - `value` (Date): New date value
- `destroy()`: Removes component

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupDropdown()`: Configures dropdown
- `setupCalendar()`: Configures calendar
- `setupInput()`: Configures input field
- `setValue(value)`: Updates date value
    - `value` (Date): New date

## Dialog

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `title` (string): Dialog title
- `content` (string|HTMLElement): Dialog content
- `showClose` (boolean): Show close button. Default: true
- `modal` (boolean): Modal behavior. Default: true
- `draggable` (boolean): Enable dragging. Default: false
- `onClose` (Function): Close handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_containerTag` (HTMLElement): Dialog container
- `m_headerTag` (HTMLElement): Header element
- `m_bodyTag` (HTMLElement): Body element
- `m_footerTag` (HTMLElement): Footer element
- `m_closeButton` (Object): Close button instance

#### Public Methods

- `setup(props)`: Configures dialog
- `open()`: Opens dialog
- `close()`: Closes dialog
- `getBodyTag()`: Returns body element

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupHeader()`: Configures header
- `setupBody()`: Configures body
- `setupFooter()`: Configures footer
- `handleClose()`: Handles close action

## DragDrop

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `accept` (string): Accepted file types
- `multiple` (boolean): Allow multiple files. Default: false
- `onDrop` (Function): Drop handler
- `onChange` (Function): File selection handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_dropZone` (HTMLElement): Drop zone element
- `m_fileInput` (HTMLElement): Hidden file input

#### Public Methods

- `setup(props)`: Configures component
- `getFiles()`: Returns selected files

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `handleDrop(ev)`: Processes dropped files
- `handleDragOver(ev)`: Handles drag over state
- `handleFileSelect(ev)`: Handles file selection

## Grid

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `data` (Array): Grid data
- `columns` (Array): Column configurations
    - `field` (string): Data field name
    - `title` (string): Column header text
    - `width` (number): Column width
    - `template` (Function): Cell template function
- `view` (string): Display mode ('grid'|'tiles'). Default: 'grid'
- `onRowClick` (Function): Row click handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_headerTag` (HTMLElement): Header element
- `m_bodyTag` (HTMLElement): Body element
- `m_rows` (Array): Row elements

#### Public Methods

- `setup(props)`: Configures grid
- `refresh()`: Refreshes grid display
- `getData()`: Returns grid data
- `getRows()`: Returns row elements

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupHeader()`: Creates header
- `setupBody()`: Creates body
- `renderRows()`: Renders data rows
- `renderTiles()`: Renders tile view

## Input

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `type` (string): Input type. Default: "text"
- `value` (string): Initial value
- `placeholder` (string): Placeholder text
- `required` (boolean): Required field. Default: false
- `validate` (Object): Validation rules
- `onChange` (Function): Value change handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_inputTag` (HTMLElement): Input element
- `m_containerTag` (HTMLElement): Container element
- `m_value` (string): Current value

#### Public Methods

- `setup(props)`: Configures input
- `value(context)`: Gets/sets value
    - `context` (Object):
        - `value` (string): New value
- `validate()`: Performs validation

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `handleChange(ev)`: Handles value changes
- `handleValidation()`: Processes validation
- `setRequired()`: Updates required state

## Listbox

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `data` (Array): List items
- `multiSelect` (boolean): Multiple selection. Default: false
- `onSelect` (Function): Selection handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_containerTag` (HTMLElement): Container element
- `m_items` (Array): Item elements
- `m_selectedItems` (Array): Selected items

#### Public Methods

- `setup(props)`: Configures listbox
- `getSelectedItems()`: Returns selected items
- `refresh(data)`: Updates list data

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `renderItems()`: Creates list items
- `handleSelect(item)`: Processes selection
- `clearSelection()`: Clears current selection

## Mapbox

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `accessToken` (string): Mapbox access token
- `center` (Object): Initial map center
    - `lat` (number): Latitude
    - `lng` (number): Longitude
- `zoom` (number): Initial zoom level
- `markers` (Array): Map markers
- `onClick` (Function): Map click handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_containerTag` (HTMLElement): Map container
- `m_map` (Object): Mapbox instance
- `m_markers` (Array): Marker instances

#### Public Methods

- `setup(props)`: Configures map
- `addMarker(marker)`: Adds new marker
- `removeMarker(marker)`: Removes marker
- `fitBounds(bounds)`: Adjusts view to bounds
- `getMap()`: Returns map instance

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `initializeMap()`: Initializes Mapbox
- `setupMarkers()`: Creates markers
- `handleMapClick(ev)`: Processes map clicks

## Percentage

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `value` (number): Percentage value
- `min` (number): Minimum value. Default: 0
- `max` (number): Maximum value. Default: 100
- `showText` (boolean): Show percentage text. Default: true
- `onChange` (Function): Value change handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_barTag` (HTMLElement): Progress bar element
- `m_textTag` (HTMLElement): Text element
- `m_value` (number): Current value

#### Public Methods

- `setup(props)`: Configures component
- `value(context)`: Gets/sets value
    - `context` (Object):
        - `value` (number): New value

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `updateBar()`: Updates progress bar
- `updateText()`: Updates percentage text

## Player

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `src` (string): Media source URL
- `autoplay` (boolean): Auto-play media. Default: false
- `controls` (boolean): Show controls. Default: true
- `loop` (boolean): Loop playback. Default: false
- `onPlay` (Function): Play event handler
- `onPause` (Function): Pause event handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_playerTag` (HTMLElement): Media element
- `m_controlsTag` (HTMLElement): Controls container
- `m_timeTag` (HTMLElement): Time display

#### Public Methods

- `setup(props)`: Configures player
- `play()`: Starts playback
- `pause()`: Pauses playback
- `getCurrentTime()`: Returns current time
- `getDuration()`: Returns total duration

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupControls()`: Creates control buttons
- `updateTime()`: Updates time display
- `handleTimeUpdate()`: Processes time updates

## Rating

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `value` (number): Initial rating value
- `max` (number): Maximum rating value. Default: 5
- `readOnly` (boolean): Read-only state. Default: false
- `onChange` (Function): Rating change handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_stars` (Array): Star elements
- `m_value` (number): Current rating value
- `m_hoveredValue` (number): Currently hovered value

#### Public Methods

- `setup(props)`: Configures rating
- `value(context)`: Gets/sets rating value
    - `context` (Object):
        - `value` (number): New rating value
- `setReadOnly(state)`: Sets read-only state

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `createStars()`: Creates star elements
- `handleHover(value)`: Processes hover state
- `handleClick(value)`: Processes rating selection

## Search

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `placeholder` (string): Input placeholder
- `data` (Array): Search data source
- `filterType` (string): Filter method ('contains'|'equals')
- `onSearch` (Function): Search handler
- `onSelect` (Function): Selection handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_inputTag` (HTMLElement): Input element
- `m_dropdown` (Object): Dropdown instance
- `m_value` (string): Current search value

#### Public Methods

- `setup(props)`: Configures search
- `value(context)`: Gets/sets search value
    - `context` (Object):
        - `value` (string): New search value
- `clear()`: Clears search input

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupInput()`: Configures input
- `setupDropdown()`: Configures dropdown
- `filterResults(text)`: Filters search results

## Slider

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `value` (number): Initial value
- `min` (number): Minimum value. Default: 0
- `max` (number): Maximum value. Default: 100
- `step` (number): Step increment. Default: 1
- `orientation` (string): Layout ('horizontal'|'vertical')
- `showSteps` (boolean): Show step markers
- `onChange` (Function): Value change handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_trackTag` (HTMLElement): Track element
- `m_handleTag` (HTMLElement): Handle element
- `m_value` (number): Current value

#### Public Methods

- `setup(props)`: Configures slider
- `value(context)`: Gets/sets slider value
    - `context` (Object):
        - `value` (number): New value

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupTrack()`: Creates track
- `setupHandle()`: Creates handle
- `setupSteps()`: Creates step markers
- `updatePosition()`: Updates handle position

## Switch

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `checked` (boolean): Initial state. Default: false
- `labels` (Object): Switch labels
    - `on` (string): On state label
    - `off` (string): Off state label
- `enable` (boolean): Enable state. Default: true
- `onChange` (Function): State change handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_containerTag` (HTMLElement): Container element
- `m_handleTag` (HTMLElement): Handle element
- `m_checked` (boolean): Current state

#### Public Methods

- `setup(props)`: Configures switch
- `checked(context)`: Gets/sets checked state
    - `context` (Object):
        - `checked` (boolean): New state
- `enable(context)`: Gets/sets enable state

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `handleClick()`: Processes state changes
- `updateState()`: Updates visual state

## Tab

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `tabs` (Array): Tab configurations
    - `id` (string): Tab identifier
    - `title` (string): Tab title
    - `content` (string|HTMLElement): Tab content
- `selected` (string): Initially selected tab ID
- `onChange` (Function): Tab change handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_tabsTag` (HTMLElement): Tabs container
- `m_contentTag` (HTMLElement): Content container
- `m_selectedTab` (string): Current tab ID

#### Public Methods

- `setup(props)`: Configures tabs
- `selectTab(tabId)`: Selects specified tab
- `getSelectedTab()`: Returns selected tab ID

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `createTabs()`: Creates tab elements
- `createContent()`: Creates content panels
- `handleTabClick()`: Processes tab selection

## TimePicker

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `format` (string): Time format. Default: "HH:mm"
- `interval` (number): Time interval in minutes. Default: 30
- `min` (Date): Minimum time
- `max` (Date): Maximum time
- `value` (Date): Initial time
- `onSelect` (Function): Selection handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_comboBox` (Object): Combobox instance
- `m_value` (Date): Current time value

#### Public Methods

- `setup(props)`: Configures time picker
- `value(context)`: Gets/sets time value
    - `context` (Object):
        - `value` (Date): New time value
- `destroy()`: Removes component

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupComboBox()`: Configures combobox
- `createTimeList()`: Generates time options
- `formatTime(date)`: Formats time value

## Toaster

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element. Default: "body"
- `message` (string): Toast message
- `type` (string): Toast type ('success'|'error'|'warning'|'info')
- `position` (Object): Toast position
    - `vertical` (string): 'top'|'bottom'|'center'
    - `horizontal` (string): 'left'|'right'|'center'
- `autoHideDuration` (number): Auto-hide delay in ms
- `closeButton` (boolean): Show close button. Default: true
- `onClose` (Function): Close handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_bodyTag` (HTMLElement): Message container
- `m_buttonContainer` (HTMLElement): Button container
- `m_iconContainer` (HTMLElement): Icon container
- `m_iconList` (Array): Toast icons
- `m_open` (boolean): Toast visibility state

#### Public Methods

- `setup(props)`: Configures toaster
- `close()`: Closes toast message
- `getBodyTag()`: Returns body element
- `getMessage()`: Returns message text

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `installCloseButton()`: Creates close button
- `addIcon(iconClass)`: Adds icon to toast
- `handleClose()`: Processes close action

## TreeView

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `data` (Array): Tree structure data
- `idField` (string): ID field name. Default: "id"
- `textField` (string): Text field name. Default: "text"
- `itemsField` (string): Children field name. Default: "items"
- `expanded` (boolean): Initial expand state. Default: false
- `onSelect` (Function): Node selection handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_dataMapById` (Object): Node data map by ID

#### Public Methods

- `setup(props)`: Configures tree view
- `getItemData(tag)`: Returns node data by element
- `destroy()`: Removes component

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `processTreeData(data, parent)`: Processes tree data
- `processItem(itemData, parent)`: Creates tree node
- `installIcon(parent, group, data)`: Adds expand/collapse icon
- `toggleExpand(group, icon)`: Toggles node expansion

## VideoPlayer

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `player` (Object): Player configuration
    - `src` (string): Video source URL
    - `controls` (boolean): Show controls. Default: true
    - `autoplay` (boolean): Auto-play video. Default: false
    - `loop` (boolean): Loop video. Default: false
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_player` (Object): Player instance

#### Public Methods

- `setup(props)`: Configures video player
- `getPlayer()`: Returns player instance
- `getPlayerTag()`: Returns player element

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `configure(customProps)`: Sets initial configuration

## ButtonSVG

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element where button will mount
- `svg` (Object): SVG configuration
    - `src` (string): SVG source path
    - `class` (string): SVG CSS class
    - `size` (string): SVG size class
    - `attr` (Object): Additional SVG attributes
- `enable` (boolean): Enable/disable state. Default: true
- `selected` (boolean): Selected state. Default: false
- `onClick` (Function): Click event handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_buttonTag` (HTMLElement): Button element reference
- `m_props` (Object): Configuration storage
- `m_enable` (boolean): Current enable state
- `m_selected` (boolean): Current selected state
- `m_svgContent` (string): Cached SVG content

#### Public Methods

- `setup(props)`: Configures SVG button
    - `props` (Object): Configuration object matching m_props structure
- `enable(context)`: Gets/sets enable state
    - `context` (Object):
        - `enable` (boolean): New enable state
- `selected(context)`: Gets/sets selected state
    - `context` (Object):
        - `selected` (boolean): New selected state
- `getSvgContent()`: Returns current SVG content

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `loadSvg()`: Loads and injects SVG content
- `handleClick(ev)`: Processes click events
- `setEnable()`: Updates enable state
- `setSelected()`: Updates selected state
- `fetchSvg(url)`: Fetches SVG content from URL
    - `url` (string): SVG file URL
- `injectSvg(content)`: Injects SVG into button
    - `content` (string): SVG markup

## Card

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `header` (Object): Header configuration
    - `show` (boolean): Show header. Default: false
    - `title` (string): Header title
    - `content` (string|HTMLElement): Custom header content
    - `class` (string): Additional header CSS classes
- `body` (Object): Body configuration
    - `content` (string|HTMLElement): Body content
    - `class` (string): Additional body CSS classes
    - `padding` (boolean): Apply padding. Default: true
- `footer` (Object): Footer configuration
    - `show` (boolean): Show footer. Default: false
    - `content` (string|HTMLElement): Footer content
    - `class` (string): Additional footer CSS classes
- `elevation` (number): Card shadow elevation (1-5). Default: 1
- `hover` (boolean): Enable hover effect. Default: false
- `class` (string): Additional card CSS classes
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_containerTag` (HTMLElement): Card container
- `m_headerTag` (HTMLElement): Header container
- `m_bodyTag` (HTMLElement): Body container
- `m_footerTag` (HTMLElement): Footer container

#### Public Methods

- `setup(props)`: Configures card
    - `props` (Object): Configuration object matching m_props structure
- `getHeaderTag()`: Returns header container
- `getBodyTag()`: Returns body container
- `getFooterTag()`: Returns footer container
- `setContent(content)`: Updates body content
    - `content` (string|HTMLElement): New content
- `destroy()`: Removes component and cleans up

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupHeader()`: Configures header if enabled
- `setupBody()`: Configures body section
- `setupFooter()`: Configures footer if enabled
- `setElevation()`: Applies elevation classes
- `setHoverEffect()`: Applies hover effect classes
- `configure(customProps)`: Sets initial configuration
    - `customProps` (Object): Custom properties to override defaults

## Checkbox

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `name` (string): Checkbox input name
- `text` (string): Label text
- `checked` (boolean): Initial checked state. Default: false
- `enable` (boolean): Enable/disable state. Default: true
- `position` (string): Text position ('left'|'right'). Default: 'right'
- `required` (boolean): Required field state. Default: false
- `onChange` (Function): Change event handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_containerTag` (HTMLElement): Label container element
- `m_inputTag` (HTMLElement): Input element
- `m_spanTag` (HTMLElement): Custom checkbox span
- `m_textTag` (HTMLElement): Text label element
- `m_checked` (boolean): Current checked state
- `m_enable` (boolean): Current enable state

#### Public Methods

- `setup(props)`: Configures checkbox
    - `props` (Object): Configuration object matching m_props structure
- `check(context)`: Gets/sets checked state
    - `context` (Object):
        - `checked` (boolean): New checked state
- `enable(context)`: Gets/sets enable state
    - `context` (Object):
        - `enable` (boolean): New enable state
- `getInputTag()`: Returns input element
- `getContainerTag()`: Returns container element
- `getText()`: Returns label text

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `handleClick(ev)`: Processes click events
- `setChecked()`: Updates checked state visually and logically
- `setEnable()`: Updates enable state visually and logically
- `setPosition()`: Updates text position
- `setRequired()`: Updates required state
- `configure(customProps)`: Sets initial configuration
    - `customProps` (Object): Custom properties to override defaults

## CheckboxGroup

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `data` (Array): Array of checkbox configurations
    - Each item can contain:
        - `id` (string): Checkbox identifier
        - `text` (string): Checkbox label
        - `checked` (boolean): Initial checked state
        - `enable` (boolean): Initial enable state
- `name` (string): Group name for form submission
- `position` (string): Text position for all checkboxes ('left'|'right'). Default: 'right'
- `onChange` (Function): Group change handler
    - Receives: { CheckboxGroup, Checkbox, checked, ev }
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_checkboxes` (Array): Array of Checkbox instances
- `m_containerTag` (HTMLElement): Group container element

#### Public Methods

- `setup(props)`: Configures checkbox group
    - `props` (Object): Configuration object matching m_props structure
- `getCheckboxes()`: Returns array of all Checkbox instances
- `getCheckedCheckboxes()`: Returns array of checked Checkbox instances
- `getValue()`: Returns array of checked checkbox values
- `destroy()`: Removes component and cleans up

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `installCheckboxes()`: Creates individual checkboxes from data
- `handleCheckboxChange(context)`: Processes checkbox state changes
    - `context` (Object):
        - `Checkbox` (Object): Changed checkbox instance
        - `checked` (boolean): New checked state
        - `ev` (Event): Original event object
- `configure(customProps)`: Sets initial configuration
    - `customProps` (Object): Custom properties to override defaults

## Combobox Class

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `name` (string): Input name attribute
- `data` (Array): List of items to display
    - Each item can be string or object:
        - `text` (string): Display text
        - `value` (string): Item value
        - `disabled` (boolean): Item disabled state
- `value` (string): Initial selected value
- `placeholder` (string): Input placeholder text
- `filter` (boolean): Enable filtering. Default: true
- `filterType` (string): Filter method ('contains'|'startsWith'). Default: 'contains'
- `caseSensitive` (boolean): Case-sensitive filtering. Default: false
- `clearButton` (boolean): Show clear button. Default: true
- `dropdownButton` (boolean): Show dropdown button. Default: true
- `autoSelect` (boolean): Auto-select first filtered item. Default: false
- `disabled` (boolean): Disabled state. Default: false
- `readonly` (boolean): Read-only state. Default: false
- `required` (boolean): Required field state. Default: false
- `onSelect` (Function): Selection handler
    - Receives: { Combobox, item, value, text }
- `onChange` (Function): Value change handler
    - Receives: { Combobox, value, text }
- `onFilter` (Function): Filter handler
    - Receives: { Combobox, text, filteredData }
- `onDropdownOpen` (Function): Dropdown open handler
- `onDropdownClose` (Function): Dropdown close handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_containerTag` (HTMLElement): Main container
- `m_input` (Object): Input instance
- `m_dropdown` (Object): Dropdown instance
- `m_listbox` (Object): Listbox instance
- `m_buttonGroup` (Object): Button group instance
- `m_value` (string): Current value
- `m_text` (string): Current display text
- `m_filteredData` (Array): Filtered items
- `m_isOpen` (boolean): Dropdown state

#### Public Methods

- `setup(props)`: Configures combobox
    - `props` (Object): Configuration object matching m_props structure
- `value(context)`: Gets/sets value
    - `context` (Object):
        - `value` (string): New value
- `getText()`: Returns current display text
- `getData()`: Returns current data list
- `setData(data)`: Updates data list
    - `data` (Array): New data items
- `open()`: Opens dropdown
- `close()`: Closes dropdown
- `enable(state)`: Sets enabled state
    - `state` (boolean): Enable state
- `clear()`: Clears selection
- `destroy()`: Removes component and cleans up

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupInput()`: Configures input component
- `setupDropdown()`: Configures dropdown component
- `setupListbox()`: Configures listbox component
- `setupButtons()`: Configures button group
- `handleInput(text)`: Processes input changes
    - `text` (string): Input text
- `handleSelect(item)`: Processes item selection
    - `item` (Object): Selected item
- `filterData(text)`: Filters data list
    - `text` (string): Filter text
- `updateValue(value, text)`: Updates current value
    - `value` (string): New value
    - `text` (string): New display text
- `configure(customProps)`: Sets initial configuration
    - `customProps` (Object): Custom properties to override defaults

## Draggable

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `handle` (string|HTMLElement): Drag handle selector or element
- `axis` (string): Movement constraint ('x'|'y'|'both'). Default: 'both'
- `containment` (string|HTMLElement): Containment area selector or element
- `grid` (Array): Movement grid [x, y]. Example: [10, 10]
- `revert` (boolean): Return to initial position on drop. Default: false
- `zIndex` (number): Z-index while dragging. Default: 1000
- `enabled` (boolean): Enable/disable dragging. Default: true
- `onDragStart` (Function): Drag start handler
    - Receives: { Draggable, event, position }
- `onDrag` (Function): Drag handler
    - Receives: { Draggable, event, position }
- `onDragEnd` (Function): Drag end handler
    - Receives: { Draggable, event, position }
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_containerTag` (HTMLElement): Draggable container
- `m_handleTag` (HTMLElement): Handle element
- `m_isDragging` (boolean): Current drag state
- `m_initialPosition` (Object): Starting position
    - `x` (number): Initial X coordinate
    - `y` (number): Initial Y coordinate
- `m_currentPosition` (Object): Current position
    - `x` (number): Current X coordinate
    - `y` (number): Current Y coordinate
- `m_offset` (Object): Mouse offset from element
    - `x` (number): Offset X
    - `y` (number): Offset Y
- `m_bounds` (Object): Containment boundaries
    - `left` (number): Left boundary
    - `top` (number): Top boundary
    - `right` (number): Right boundary
    - `bottom` (number): Bottom boundary

#### Public Methods

- `setup(props)`: Configures draggable
    - `props` (Object): Configuration object matching m_props structure
- `enable()`: Enables dragging
- `disable()`: Disables dragging
- `isEnabled()`: Returns enabled state
- `getPosition()`: Returns current position
- `setPosition(x, y)`: Sets position
    - `x` (number): X coordinate
    - `y` (number): Y coordinate
- `reset()`: Returns to initial position
- `destroy()`: Removes component and cleans up

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupHandle()`: Configures drag handle
- `setupContainment()`: Calculates containment boundaries
- `handleDragStart(ev)`: Initializes drag operation
    - `ev` (MouseEvent): Mouse down event
- `handleDrag(ev)`: Processes drag movement
    - `ev` (MouseEvent): Mouse move event
- `handleDragEnd(ev)`: Finalizes drag operation
    - `ev` (MouseEvent): Mouse up event
- `calculatePosition(ev)`: Calculates new position
    - `ev` (MouseEvent): Mouse event
    - Returns: { x, y }
- `applyGrid(position)`: Snaps position to grid
    - `position` (Object): { x, y }
- `applyContainment(position)`: Enforces containment
    - `position` (Object): { x, y }
- `updatePosition(position)`: Updates element position
    - `position` (Object): { x, y }
- `configure(customProps)`: Sets initial configuration
    - `customProps` (Object): Custom properties to override defaults

## Dropdown

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `anchorTag` (HTMLElement): Element to anchor dropdown to
- `content` (string|HTMLElement): Dropdown content
- `position` (Object): Positioning configuration
    - `vertical` (string): 'top'|'bottom'|'center'. Default: 'bottom'
    - `horizontal` (string): 'left'|'right'|'center'. Default: 'left'
- `offset` (Object): Position offset
    - `x` (number): Horizontal offset. Default: 0
    - `y` (number): Vertical offset. Default: 0
- `open` (boolean): Initial open state. Default: false
- `closeOnClick` (boolean): Close when clicking outside. Default: true
- `closeOnScroll` (boolean): Close on page scroll. Default: true
- `onOpen` (Function): Open event handler
- `onClose` (Function): Close event handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_containerTag` (HTMLElement): Dropdown container
- `m_contentTag` (HTMLElement): Content container
- `m_isOpen` (boolean): Current open state
- `m_position` (Object): Current position coordinates
- `m_clickHandler` (Function): Document click handler reference
- `m_scrollHandler` (Function): Window scroll handler reference

#### Public Methods

- `setup(props)`: Configures dropdown
    - `props` (Object): Configuration object matching m_props structure
- `open()`: Opens dropdown
- `close()`: Closes dropdown
- `toggle()`: Toggles open state
- `isOpen()`: Returns current open state
- `updatePosition()`: Recalculates and updates position
- `destroy()`: Removes component and cleans up

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupContent()`: Initializes content
- `setupEventListeners()`: Sets up event handlers
- `removeEventListeners()`: Cleans up event handlers
- `calculatePosition()`: Calculates dropdown position
    - Returns: { top, left }
- `handleDocumentClick(ev)`: Processes outside clicks
    - `ev` (Event): Click event
- `handleScroll()`: Handles scroll events
- `setPosition()`: Updates dropdown position
- `configure(customProps)`: Sets initial configuration
    - `customProps` (Object): Custom properties to override defaults

## FileChooser

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `accept` (string): Accepted file types (e.g., ".jpg,.png")
- `multiple` (boolean): Allow multiple file selection. Default: false
- `showButton` (boolean): Show file selection button. Default: true
- `buttonText` (string): Custom button text
- `buttonIcon` (Object): Button icon configuration
    - `class` (string): Icon CSS class
    - `size` (string): Icon size class
- `dragDrop` (boolean): Enable drag and drop. Default: false
- `onChange` (Function): File selection handler
    - Receives: { FileChooser, files, ev }
- `onDrop` (Function): Drag and drop handler
    - Receives: { FileChooser, files, ev }
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_containerTag` (HTMLElement): Main container element
- `m_inputTag` (HTMLElement): Hidden file input element
- `m_button` (Object): Button instance (if showButton is true)
- `m_dragDrop` (Object): DragDrop instance (if dragDrop is true)
- `m_files` (Array): Currently selected files

#### Public Methods

- `setup(props)`: Configures file chooser
    - `props` (Object): Configuration object matching m_props structure
- `getFiles()`: Returns array of selected files
- `clearFiles()`: Clears selected files
- `destroy()`: Removes component and cleans up

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupInput()`: Creates and configures file input
- `setupButton()`: Creates file selection button
- `setupDragDrop()`: Sets up drag and drop functionality
- `handleFileSelect(ev)`: Processes file selection
    - `ev` (Event): File input change event
- `handleDrop(context)`: Processes dropped files
    - `context` (Object):
        - `files` (Array): Dropped files
        - `ev` (Event): Drop event
- `validateFiles(files)`: Validates file types
    - `files` (Array): Files to validate
- `configure(customProps)`: Sets initial configuration
    - `customProps` (Object): Custom properties to override defaults

## Radio

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `name` (string): Radio input name
- `value` (string): Radio input value
- `text` (string): Label text
- `checked` (boolean): Initial checked state. Default: false
- `enable` (boolean): Enable/disable state. Default: true
- `position` (string): Text position ('left'|'right'). Default: 'right'
- `required` (boolean): Required field state. Default: false
- `onChange` (Function): Change event handler
    - Receives: { Radio, checked, ev }
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_containerTag` (HTMLElement): Label container
- `m_inputTag` (HTMLElement): Radio input element
- `m_spanTag` (HTMLElement): Custom radio span
- `m_textTag` (HTMLElement): Text label element
- `m_checked` (boolean): Current checked state
- `m_enable` (boolean): Current enable state

#### Public Methods

- `setup(props)`: Configures radio
    - `props` (Object): Configuration object matching m_props structure
- `check(context)`: Gets/sets checked state
    - `context` (Object):
        - `checked` (boolean): New checked state
- `enable(context)`: Gets/sets enable state
    - `context` (Object):
        - `enable` (boolean): New enable state
- `getValue()`: Returns radio value
- `getInputTag()`: Returns input element

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `handleClick(ev)`: Processes click events
- `setChecked()`: Updates checked state
- `setEnable()`: Updates enable state
- `setPosition()`: Updates text position
- `configure(customProps)`: Sets initial configuration

## RadioGroup

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `data` (Array): Array of radio configurations
    - Each item can contain:
        - `value` (string): Radio value
        - `text` (string): Radio label
        - `checked` (boolean): Initial checked state
        - `enable` (boolean): Initial enable state
- `name` (string): Group name for form submission
- `position` (string): Text position for all radios ('left'|'right'). Default: 'right'
- `value` (string): Initially selected value
- `onChange` (Function): Group change handler
    - Receives: { RadioGroup, Radio, value, ev }
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_radios` (Array): Array of Radio instances
- `m_containerTag` (HTMLElement): Group container
- `m_value` (string): Currently selected value

#### Public Methods

- `setup(props)`: Configures radio group
    - `props` (Object): Configuration object matching m_props structure
- `getRadios()`: Returns array of Radio instances
- `getValue()`: Returns currently selected value
- `setValue(value)`: Sets selected value
- `destroy()`: Removes component and cleans up

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `installRadios()`: Creates individual radios from data
- `handleRadioChange(context)`: Processes radio selection
    - `context` (Object):
        - `Radio` (Object): Changed radio instance
        - `checked` (boolean): New checked state
        - `ev` (Event): Original event object
- `configure(customProps)`: Sets initial configuration

## Slideout

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `position` (string): Panel position ('left'|'right'|'top'|'bottom'). Default: 'right'
- `size` (Object): Panel dimensions
    - `width` (string): Panel width (e.g., '300px', '50%')
    - `height` (string): Panel height (e.g., '100%', '500px')
- `overlay` (boolean): Show background overlay. Default: true
- `closeOnOverlay` (boolean): Close when clicking overlay. Default: true
- `showClose` (boolean): Show close button. Default: true
- `header` (Object): Header configuration
    - `show` (boolean): Show header. Default: true
    - `title` (string): Header title
    - `content` (string|HTMLElement): Custom header content
- `content` (string|HTMLElement): Panel content
- `onOpen` (Function): Open event handler
    - Receives: { Slideout }
- `onClose` (Function): Close event handler
    - Receives: { Slideout }
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_containerTag` (HTMLElement): Main container
- `m_overlayTag` (HTMLElement): Overlay element
- `m_panelTag` (HTMLElement): Panel container
- `m_headerTag` (HTMLElement): Header container
- `m_bodyTag` (HTMLElement): Body container
- `m_closeButton` (Object): Close button instance
- `m_isOpen` (boolean): Current open state

#### Public Methods

- `setup(props)`: Configures slideout
    - `props` (Object): Configuration object matching m_props structure
- `open()`: Opens the panel
- `close()`: Closes the panel
- `toggle()`: Toggles panel state
- `isOpen()`: Returns current open state
- `getBodyTag()`: Returns body container
- `getHeaderTag()`: Returns header container
- `destroy()`: Removes component and cleans up

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupPanel()`: Configures panel element
- `setupHeader()`: Configures header
- `setupOverlay()`: Configures overlay
- `setupCloseButton()`: Creates close button
- `handleOpen()`: Processes open action
    - Adds appropriate CSS classes
    - Triggers onOpen callback
- `handleClose()`: Processes close action
    - Removes CSS classes
    - Triggers onClose callback
- `handleOverlayClick(ev)`: Processes overlay clicks
- `setPosition()`: Updates panel position
- `configure(customProps)`: Sets initial configuration
    - `customProps` (Object): Custom properties to override defaults

## Textarea

#### Public Properties (m_props)

- `tag` (string): Defines tag set. Default: "default"
- `theme` (string): Defines theme. Default: "default"
- `parentTag` (HTMLElement): Parent element
- `name` (string): Textarea name attribute
- `value` (string): Initial text value
- `placeholder` (string): Placeholder text
- `rows` (number): Number of visible text rows. Default: 3
- `maxLength` (number): Maximum character length
- `resize` (string): Resize behavior ('none'|'both'|'horizontal'|'vertical'). Default: 'none'
- `readonly` (boolean): Read-only state. Default: false
- `disabled` (boolean): Disabled state. Default: false
- `required` (boolean): Required field state. Default: false
- `autoHeight` (boolean): Auto-adjust height to content. Default: false
- `minHeight` (string): Minimum height (e.g., '100px')
- `maxHeight` (string): Maximum height (e.g., '300px')
- `label` (Object): Label configuration
    - `text` (string): Label text
    - `position` (string): Label position ('top'|'left'). Default: 'top'
- `validation` (Object): Validation configuration
    - `pattern` (RegExp): Validation pattern
    - `message` (string): Error message
- `onChange` (Function): Value change handler
    - Receives: { Textarea, value, ev }
- `onFocus` (Function): Focus handler
- `onBlur` (Function): Blur handler
- `onComplete` (Function): Setup completion callback

#### Private Properties

- `m_parentTag` (HTMLElement): Parent reference
- `m_props` (Object): Configuration storage
- `m_containerTag` (HTMLElement): Main container
- `m_labelTag` (HTMLElement): Label element
- `m_textareaTag` (HTMLElement): Textarea element
- `m_errorTag` (HTMLElement): Error message element
- `m_value` (string): Current text value
- `m_isValid` (boolean): Current validation state

#### Public Methods

- `setup(props)`: Configures textarea
    - `props` (Object): Configuration object matching m_props structure
- `value(context)`: Gets/sets text value
    - `context` (Object):
        - `value` (string): New text value
- `focus()`: Sets focus to textarea
- `blur()`: Removes focus
- `validate()`: Performs validation
- `isValid()`: Returns validation state
- `enable(state)`: Sets enabled/disabled state
    - `state` (boolean): Enable state
- `readonly(state)`: Sets readonly state
    - `state` (boolean): Readonly state
- `clear()`: Clears text value
- `destroy()`: Removes component and cleans up

#### Private Functions

- `setupDOM()`: Creates DOM structure
- `setupLabel()`: Configures label if provided
- `setupTextarea()`: Configures textarea element
- `handleInput(ev)`: Processes input changes
- `handleFocus(ev)`: Handles focus event
- `handleBlur(ev)`: Handles blur event
- `adjustHeight()`: Updates height for autoHeight
- `validateValue()`: Performs value validation
- `showError(message)`: Displays error message
- `hideError()`: Removes error message
- `configure(customProps)`: Sets initial configuration
    - `customProps` (Object): Custom properties to override defaults
