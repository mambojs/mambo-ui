function storyRadio(selectedStory) {
	const config = {
		parentTag: selectedStory.parentTag,
		text: "Radio",
	};

	ui.radio(config);
}
