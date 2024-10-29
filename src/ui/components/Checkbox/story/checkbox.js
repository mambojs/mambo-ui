function storyCheckbox(selectedStory) {
	const config = {
		parentTag: selectedStory.parentTag,
		text: "Checkbox",
		position: "right",
	};

	ui.checkbox(config);

	const configCheckboxLeft = {
		parentTag: selectedStory.parentTag,
		text: "Checkbox",
		position: "left",
	};

	ui.checkbox(configCheckboxLeft);
}
