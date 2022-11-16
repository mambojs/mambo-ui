function storyTextarea(selectedStory) {
	const textareaConfig = {
		parentTag: selectedStory.parentTag,
		enableClear: false,
	};

	ui.textarea(textareaConfig);

	textareaConfig.enableClear = true;
	textareaConfig.value = "My teextarea value";

	ui.textarea(textareaConfig);
}
