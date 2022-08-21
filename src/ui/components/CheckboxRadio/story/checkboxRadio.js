function storyCheckboxRadio(selectedStory) {
	checkbox();
	radio();

	function checkbox() {
		const config = {
			parentTag: selectedStory.parentTag,
			text: "Checkbox",
		};

		ui.checkboxRadio(config);
	}

	function radio() {
		const config = {
			parentTag: selectedStory.parentTag,
			text: "Radio",
			attr: {
				type: "radio",
			},
		};

		ui.checkboxRadio(config);
	}
}
