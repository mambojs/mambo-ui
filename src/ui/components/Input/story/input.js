function storyInput(selectedStory) {
	const inputConfig = {
		parentTag: selectedStory.parentTag,
		enableClear: false,
	};

	ui.input(inputConfig);

	inputConfig.enableClear = true;
	inputConfig.value = "My value";

	ui.input(inputConfig);
}
