function storyCheckboxRadioGroup(selectedStory) {
	checkboxGroup();
	radioGroup();

	function checkboxGroup() {
		const config = {
			parentTag: selectedStory.parentTag,
			checkboxes: [
				{
					id: 1,
					text: "Checkbox One",
					value: "One",
					fnClick: (context) => {},
				},
				{
					id: 2,
					text: "Checkbox Two",
					value: "Two",
				},
				{
					id: 3,
					text: "Checkbox Three",
					value: "Three",
				},
			],
			fnClick: (context) => {},
			fnGroupClick: (context) => {},
		};

		ui.checkboxRadioGroup(config);
	}

	function radioGroup() {
		const config = {
			parentTag: selectedStory.parentTag,
			radios: [
				{
					id: 1,
					text: "Radio One",
					value: "One",
					fnClick: (context) => {},
				},
				{
					id: 2,
					text: "Radio Two",
					value: "Two",
				},
				{
					id: 3,
					text: "Radio Three",
					value: "Three",
				},
			],
			fnClick: (context) => {},
			fnGroupClick: (context) => {},
		};

		ui.checkboxRadioGroup(config);
	}
	//!
}
