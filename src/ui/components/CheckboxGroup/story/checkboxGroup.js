function storyCheckboxGroup(selectedStory) {
	const config = {
		parentTag: selectedStory.parentTag,
		checkbox: {
			position: "right",
		}, // Configuration that applies to all checkbox instances
		checkboxes: [
			// List of checkbox configurations
			{
				text: "Checkbox One",
				checked: true,
				fnClick: (context) => {},
				position: "left",
			},
			{
				text: "Checkbox Two",
				checked: true,
			},
			{
				text: "Checkbox Three",
				checked: false,
				position: "right",
			},
		],
		fnClick: (context) => {},
		fnGroupClick: (context) => {},
	};

	ui.checkboxGroup(config);
}
