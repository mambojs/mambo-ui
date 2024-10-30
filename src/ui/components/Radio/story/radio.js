function storyRadio(selectedStory) {
	const config1 = {
		parentTag: selectedStory.parentTag,
		text: "Radio",
		position: "right",
	};

	ui.radio(config1);

	const config2 = {
		parentTag: selectedStory.parentTag,
		text: "Radio",
		position: "left",
	};

	ui.radio(config2);
}
