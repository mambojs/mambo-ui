ui.defaultTags = {
	button: {
		button: { name: "button" },
	},
	buttonGroup: {},
	buttonSVG: {
		button: { name: "button" },
	},
	calendar: {
		body: { name: "m-calendar-body" },
		bodyContent: { name: "m-calendar-body-content" },
		bodyHeader: { name: "m-calendar-body-header" },
	},
	checkboxRadio: {
		inputTag: { name: "input", attr: { type: "checkbox" } },
		label: { name: "label" },
		radioText: { name: "span" },
		radioSpanTag: { name: "span" },
	},
	checkbox: {
		container: { name: "label" },
		input: { name: "input", attr: { type: "checkbox" } },
		span: { name: "span" },
		text: { name: "span" },
	},
	combobox: {
		wrapper: { name: "m-combobox-wrapper" },
	},
	datePicker: {
		wrapper: { name: "m-date-picker-wrapper" },
	},
	dialog: {
		body: { name: "m-dialog-body" },
		header: { name: "m-dialog-header" },
		headerCenter: { name: "m-dialog-header-center" },
		headerLeft: { name: "m-dialog-header-left" },
		headerRight: { name: "m-dialog-header-right" },
		headerTitle: { name: "h3" },
	},
	dragDrop: {
		dropText: { name: "m-drag-drop-text" },
	},
	draggable: {
		draggable: { name: "m-draggable" },
	},
	dropdown: {
		container: { name: "m-dropdown-container" },
	},
	fileChooser: {},
	grid: {
		colCell: { name: "m-col-cell" },
		body: { name: "m-grid-body" },
		header: { name: "m-grid-header" },
		headerTitle: { name: "m-title" },
		grid: { name: "m-grid" },
		row: { name: "m-data-grid-row", attr: {} },
		text: { name: "m-text" },
		tileItem: { name: "m-tile-item", attr: {} },
		tiles: { name: "m-tiles" },
	},
	input: {
		input: { name: "input", attr: { type: "text" } },
	},
	listbox: {
		container: { name: "m-listbox-container" },
		item: { name: "m-listbox-item" },
	},
	mapbox: {
		container: { name: "div" },
		currentPoint: { name: "m-mapbox-current-point" },
	},
	percentage: {
		bar: { name: "m-percentage-bar" },
		text: { name: "m-percentage-text" },
	},
	player: {
		controls: { name: "m-controls" },
		time: { name: "m-time-stats" },
		player: { name: "video" },
	},
	radio: {
		container: { name: "label" },
		input: { name: "input", attr: { type: "radio" } },
		span: { name: "span" },
		text: { name: "span" },
	},
	rating: {
		empty: { name: "m-rating-empty" },
		emptyStar: { name: "m-rating-empty-star" },
		hover: { name: "m-rating-hover" },
		hoverStar: { name: "m-rating-hover-star" },
		selected: { name: "m-rating-selected" },
		selectedStar: { name: "m-rating-selected-star" },
	},
	slideout: {
		body: { name: "m-slideout-body" },
		header: { name: "m-slideout-header" },
		overlay: { name: "m-slideout-overlay" },
	},
	slider: {
		handle: { name: "m-slider-handle" },
		selection: { name: "m-slider-selection" },
		step: { name: "m-slider-step" },
		stepLarge: { name: "m-slider-step-large" },
		stepsContainer: { name: "m-slider-steps-container" },
		track: { name: "m-slider-track" },
		wrapper: { name: "m-slider-wrapper" },
	},
	switch: {
		container: { name: "m-switch-container" },
		handle: { name: "m-switch-handle" },
		off: { name: "m-switch-label-off" },
		on: { name: "m-switch-label-on" },
	},
	tab: {
		content: { name: "m-tab-content" },
		body: { name: "m-tab-body" },
		tabs: { name: "m-tabs" },
	},
	timePicker: {},
	treeView: {
		group: { name: "m-tree-view-group" },
		icon: { name: "icon" },
		item: { name: "m-tree-view-item" },
		itemIn: { name: "m-tree-view-item-in" },
		itemTop: { name: "m-tree-view-item-top" },
	},
};

ui.class.Tags = class Tags {
	constructor() {
		this.m_tags = {
			default: ui.defaultTags,
		};
	}

	getTags(context) {
		if (context && context.name && context.component) {
			if (context.name in this.m_tags) {
				return this.m_tags[context.name][context.component];
			}
		}
	}

	addTags(context) {
		if (!context || !context.name || !context.tags) {
			throw "Tags() you invoked addTags() but failed to define the tags name.";
		}

		if (this.m_tags[context.name] && !this.m_tags[context.override]) {
			throw `Tags() you have attempted to override the tags name ${context.name}. Please add the property 'override:true' to succesfully override the tags.`;
		}

		this.m_tags[context.name] = context.theme;
	}
};

ui.tags = new ui.class.Tags();
