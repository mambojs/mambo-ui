function storyRadioGroup(selectedStory) {
	const config = {
		parentTag: selectedStory.parentTag,
		radio: { position: "left" }, // Configuration that applies to all radio instances
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
				fnClick: (context) => {},
			},
			{
				text: "Radio Three",
				checked: false,
				fnClick: (context) => {},
			},
		],
		fnClick: (context) => {},
		fnGroupClick: (context) => {},
	};

	ui.radioGroup(config);
}
