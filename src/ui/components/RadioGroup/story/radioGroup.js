function storyRadioGroup(selectedStory) {
	const config = {
		parentTag: selectedStory.parentTag,
		radio: {}, // Configuration that applies to all radio instances
		radios: [
			// List of Radio configurations
			{
				text: "Radio One",
				checked: true,
				fnClick: (context) => {},
			},
			{
				text: "Radio Two",
				checked: true,
			},
			{
				text: "Radio Three",
				checked: false,
			},
		],
		fnClick: (context) => {},
		fnGroupClick: (context) => {},
	};

	ui.radioGroup(config);
}
