function storyTimePicker(selectedStory) {
	const config = {
		parentTag: selectedStory.parentTag,
	};

	ui.timePicker(config);
}
