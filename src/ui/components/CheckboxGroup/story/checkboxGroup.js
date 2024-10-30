function storyCheckboxGroup(selectedStory) {
	const config = {
		parentTag: selectedStory.parentTag,
		checkbox: {
			position: "right",
		}, // Configuration that applies to all checkbox instances
		checkboxes: [
			// List of checkbox configurations
			{
				text: "",
				checked: true,
				fnClick: (context) => {},
				position: "right",
			},
			{
				text: "CheckBox 1",
				checked: true,
			},
			{
				text: "CheckBox 2",
				checked: false,
				position: "right",
			},
		],
		fnClick: (context) => {},
		fnGroupClick: (context) => {},
	};

	ui.checkboxGroup(config);
}
