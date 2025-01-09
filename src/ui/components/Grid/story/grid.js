function storyGrid(selectedStory) {
	const firstGridParentTag = dom.createTag(`${selectedStory.id}-first`, { class: "first-grid" });
	selectedStory.parentTag.appendChild(firstGridParentTag);
	const secondGridParentTag = dom.createTag(`${selectedStory.id}-second`, { class: "second-grid" });
	selectedStory.parentTag.appendChild(secondGridParentTag);
	//First Grid
	const data = [
		{
			input: "Red",
			text: "Green",
			hidden: "hidden",
		},
		{
			input: "Purple",
			text: "Brown",
			hidden: "hidden",
		},
	];

	const columnsConfig = [
		{
			id: "button",
			name: "Button",
			tagType: "button",
			type: "primary",
			size: "small",
			attr: {
				type: "button",
			},
			text: "Open",
			icon: [
				{
					attr: {
						class: "fa-regular fa-file",
					},
					size: "large",
				},
			],
			onClick: handleButtonClick,
		},
		{
			id: "",
			name: "Button Group",
			tagType: "button-group",
			buttons: [
				{
					id: 1,
					text: "1",
					type: "secondary",
					size: "small",
				},
				{
					id: 2,
					text: "2",
					type: "secondary",
					size: "medium",
				},
				{
					id: 3,
					text: "3",
					type: "secondary",
					size: "large",
				},
			],
			onClick: handleButtonClick,
		},
		{
			id: "input",
			name: "Input",
			tagType: "input",
			dataKey: "input",
			enableClear: true,
			attr: {},
			enableLeftButton: true,
			onMouseDown: (context) => {
				context.Input.setAttr({ type: "text" });
				context.Button.getTag().classList.toggle("fa-eye", true);
				context.Button.getTag().classList.toggle("fa-eye-slash", false);
			},
			onMouseUp: (context) => {
				context.Input.setAttr({ type: "password" });
				context.Button.getTag().classList.toggle("fa-eye-slash", true);
				context.Button.getTag().classList.toggle("fa-eye", false);
			},
			onComplete: (context) => {
				context.Input.setAttr({ type: "password" });
			},
		},
		{
			id: "text",
			name: "Text",
			tagType: "text",
			dataKey: "text",
		},
		{
			id: "hidden",
			name: "Hidden",
			tagType: "text",
			dataKey: "hidden",
			hide: true,
		},
		{
			id: "fileChooser",
			name: "File Chooser",
			tagType: "file-chooser",
			onUpload: (context) => {},
		},
		{
			id: "dialog",
			name: "Dialog",
			tagType: "dialog",
			title: "Dialog",
			text: "Open Dialog",
			icon: [
				{
					attr: {
						class: "fa-regular fa-file",
					},
					size: "large",
				},
			],
			onOpen: (context) => {
				context.Dialog.getBodyTag().innerHTML = "<p style='padding:3em; text-align: center;'>Your Dialog content will go here</p>";
				context.Dialog.getFooterTag().innerHTML = "Thank you for your attention";
			},
			onClose: (context) => {},
		},
		{
			id: "slideout",
			name: "Slideout",
			tagType: "slideout",
			text: null,
			type: "secondary",
			icon: [
				{
					attr: {
						class: "fa-solid fa-bars",
					},
					size: "large",
				},
			],
			onInstallContent: (context) => {
				// Get the slideout content, header and body tags
				// Insert your own HTML content
				// You can replace the entire contents of the slideout area
				const contentTag = context.Slideout.getContentTag();

				// Insert Header content
				const headerTag = context.Slideout.getHeaderTag();
				dom.append(headerTag, "<h3>My Header Content</h3>");

				// Insert Body content
				const bodyTag = context.Slideout.getBodyTag();
				dom.append(bodyTag, "<p style='padding:1em;'>Here goes your content</p>");
			},
		},
		{
			id: "dragDrop",
			tagType: "drag-drop",
			name: "Drag & Drop",
			dropText: "Drop Files",
			onDrop: (context) => {},
		},
	];

	let config = {
		parentTag: firstGridParentTag,
		data: data,
		columns: columnsConfig,
		maxColWidth: true,
		onPostRow: handleGridPostRow,
		onComplete: (context) => {},
	};

	ui.grid(config);

	function handleGridPostRow(context) {
		// Callback executed every time a new row has completed installing
	}

	function handleButtonClick(context) {
		// Click fn handler example
		alert("Button Clicked");
	}

	//Second Grid
	const data2 = [{}];

	const columnsConfig2 = [
		{
			id: "treeView",
			name: "Tree View",
			tagType: "tree-view",
			style: {
				"min-width": "150px",
				width: "150px",
				"max-width": "150px",
			},
			data: [
				{
					text: "Item 1",
					items: [
						{
							text: "Item 1-1",
						},
						{
							text: "Item 1-2",
						},
						{
							text: "Item 1-3",
							items: [
								{
									text: "Item 1-3-1",
								},
								{
									text: "Item 1-3-2",
								},
							],
						},
					],
				},
				{
					text: "Item 2",
					items: [
						{
							text: "Item 2-1",
						},
						{
							text: "Item 2-2",
						},
					],
				},
			],
			onSelect: (context) => {},
		},
		{
			id: "dropdown",
			name: "Dropdown",
			tagType: "dropdown",
			style: {
				"min-width": "160px",
				width: "160px",
				"max-width": "160px",
			},
			onComplete: (context) => {
				const contentTag = context.Dropdown.getContentTag();
				dom.append(contentTag, "<p style='padding:1em;'>Here goes your content</p>");
			},
		},
		{
			id: "combobox",
			name: "Combobox",
			tagType: "combobox",
			style: {
				"min-width": "130px",
			},
			value: "mambo-combobox",
			data: [
				{
					text: "Item 1",
					id: "1",
				},
				{
					text: "Item 2",
					id: "2",
				},
				{
					text: "Item 3",
					id: "3",
				},
				{
					text: "Item 4",
					id: "4",
				},
			],
			onSelect: (context) => {},
		},
		{
			id: "timePicker",
			name: "Time Picker",
			tagType: "time-picker",
			style: {
				"min-width": "160px",
				width: "160px",
				"max-width": "160px",
			},
			onSelect: (context) => {},
		},
		{
			id: "datePicker",
			name: "Date Picker",
			tagType: "date-picker",
			style: {
				"min-width": "160px",
				width: "160px",
				"max-width": "160px",
			},
			onSelect: (context) => {},
		},
	];

	let config2 = {
		parentTag: secondGridParentTag,
		data: data2,
		columns: columnsConfig2,
		maxColWidth: true,
		onComplete: (context) => {},
	};

	ui.grid(config2);
}
