function storyInput(selectedStory) {
	const inputConfig = {
		parentTag: selectedStory.parentTag,
		enableClear: false,
	};

	ui.input(inputConfig);

	inputConfig.enableClear = true;

	ui.input(inputConfig);
}
