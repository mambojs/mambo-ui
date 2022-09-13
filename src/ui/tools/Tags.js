ui.defaultTags = {
	button: {
		button: "button",
	},
	buttonGroup: {},
	buttonSVG: {
		button: "button",
	},
	calendar: {
		body: "m-calendar-body",
		bodyContent: "m-calendar-body-content",
		bodyHeader: "m-calendar-body-header",
	},
	checkboxRadio: {
		inputTag: "input",
		label: "label",
		radioText: "span",
		radioSpanTag: "span",
	},
	checkboxRadioGroup: {},
	combobox: {
		wrapper: "m-combobox-wrapper",
	},
	datePicker: {
		wrapper: "m-date-picker-wrapper",
	},
	dialog: {
		body: "m-dialog-body",
		header: "m-dialog-header",
		headerCenter: "m-dialog-header-center",
		headerLeft: "m-dialog-header-left",
		headerRight: "m-dialog-header-right",
		headerTitle: "h3",
	},
	dragDrop: {
		dropText: "m-drag-drop-text",
	},
	draggable: {
		draggable: "m-draggable",
	},
	dropdown: {
		container: "m-dropdown-container",
	},
	fileChooser: {},
	grid: {
		colCell: "m-col-cell",
		body: "m-grid-body",
		header: "m-grid-header",
		headerTitle: "m-title",
		grid: "m-grid",
		row: "m-data-grid-row",
		text: "m-text",
		tileItem: "m-tile-item",
		tiles: "m-tiles",
	},
	input: {
		input: "input",
	},
	listbox: {
		container: "m-listbox-container",
		item: "m-listbox-item",
	},
	mapbox: {
		container: "div",
		currentPoint: "m-mapbox-current-point"
	},
	percentage: {
		bar: "m-percentage-bar",
		text: "m-percentage-text",
	},
	player: {
		controls: "m-controls",
		time: "m-time-stats",
	},
	rating: {
		empty: "m-rating-empty",
		emptyStar: "m-rating-empty-star",
		hover: "m-rating-hover",
		hoverStar: "m-rating-hover-star",
		selected: "m-rating-selected",
		selectedStar: "m-rating-selected-star",
	},
	slideout: {
		body: "m-slideout-body",
		header: "m-slideout-header",
		overlay: "m-slideout-overlay",
	},
	slider: {
		handle: "m-slider-handle",
		selection: "m-slider-selection",
		step: "m-slider-step",
		stepLarge: "m-slider-step-large",
		stepsContainer: "m-slider-steps-container",
		track: "m-slider-track",
		wrapper: "m-slider-wrapper",
	},
	switch: {
		container: "m-switch-container",
		handle: "m-switch-handle",
		off: "m-switch-label-off",
		on: "m-switch-label-on",
	},
	tab: {
		content: "m-tab-content",
		body: "m-tab-body",
		tabs: "m-tabs",
	},
	timePicker: {},
	treeView: {
		group: "m-tree-view-group",
		icon: "icon",
		item: "m-tree-view-item",
		itemIn: "m-tree-view-item-in",
		itemTop: "m-tree-view-item-top",
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
