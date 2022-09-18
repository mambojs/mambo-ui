function storyCheckboxGroup(selectedStory) {
	const config = {
		parentTag: selectedStory.parentTag,
		checkbox: {}, // Configuration that applies to all checkbox instances
		checkboxes: [
			// List of checkbox configurations
			{
				text: "Checkbox One",
				checked: true,
				fnClick: (context) => {},
			},
			{
				text: "Checkbox Two",
				checked: true,
			},
			{
				text: "Checkbox Three",
				checked: false,
			},
		],
		fnClick: (context) => {},
		fnGroupClick: (context) => {},
	};

	ui.checkboxGroup(config);
}
