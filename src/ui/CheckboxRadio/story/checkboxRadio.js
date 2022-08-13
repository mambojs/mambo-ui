function storyCheckboxRadio(selectedStory) {
	//: Checkbox Radio
	//@
	checkbox();
	radio();

	function checkbox() {
		const config = {
			parentTag: selectedStory.parentTag,
			id: 1,
			text: "Checkbox",
			fnClick: (context) => {
				alert(`Checkbox id: ${context.checkboxRadio.getId()} ${context.checkboxRadio.select() ? "checked" : "not checked"}.`);
			},
		};

		ui.checkboxRadio(config);
	}

	function radio() {
		const config = {
			parentTag: selectedStory.parentTag,
			id: 2,
			text: "Radio",
			attr: {
				type: "radio",
			},
			fnClick: (context) => {
				alert(`Radio id: ${context.checkboxRadio.getId()} ${context.checkboxRadio.select() ? "checked" : "not checked"}.`);
			},
		};

		ui.checkboxRadio(config);
	}
	//!
}
