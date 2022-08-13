function storyCheckboxRadioGroup(selectedStory) {
	//: Checkbox Radio Group
	//@

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
					fnClick: (context) => {
						// You can declare individual event handlers for each checkbox
					},
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
			fnClick: (context) => {
				// You can declare a single event handler for all checkboxes
				alert(`Checkbox id: ${context.checkboxRadio.getId()} ${context.checkboxRadio.select() ? "checked" : "not checked"}.`);
			},
			fnGroupClick: (context) => {
				// You can declare an event handler for the group
				const selected = context.checkboxRadioGroup.select();
				selected.forEach((checkbox) => alert(`${checkbox.value()}`));
			},
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
					fnClick: (context) => {
						// You can declare individual event handlers for each checkbox
					},
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
			fnClick: (context) => {
				// You can declare a single event handler for all checkboxes
				alert(`Radio id: ${context.checkboxRadio.getId()} ${context.checkboxRadio.select() ? "checked" : "not checked"}.`);
			},
			fnGroupClick: (context) => {
				// You can declare an event handler for the group
				alert(`Selected: ${context.checkboxRadioGroup.select()[0].value()}`);
			},
		};

		ui.checkboxRadioGroup(config);
	}
	//!
}
