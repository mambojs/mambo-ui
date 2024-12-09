function storyRadioGroup(selectedStory) {
	const config = {
		parentTag: selectedStory.parentTag,
		radio: { position: "left" }, // Configuration that applies to all radio instances
		radios: [
			// List of Radio configurations
			{
				text: "Radio One",
				checked: true,
				onClick: (context) => {},
			},
			{
				text: "Radio Two",
				checked: true,
				onClick: (context) => {},
			},
			{
				text: "Radio Three",
				checked: false,
				onClick: (context) => {},
			},
		],
		onClick: (context) => {},
		onGroupClick: (context) => {},
	};

	ui.radioGroup(config);
}
