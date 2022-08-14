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
			fnClick: (context) => {},
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
			fnClick: (context) => {},
		};

		ui.checkboxRadio(config);
	}
	//!
}
