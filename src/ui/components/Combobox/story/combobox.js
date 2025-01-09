function storyCombobox(selectedStory) {
	const config1 = {
		parentTag: selectedStory.parentTag,
		value: "mambo-combobox",
		labelText: "Select Item",
		data: [
			{ text: "Item 1", id: "1" },
			{ text: "Item 2", id: "2" },
			{ text: "Item 3", id: "3" },
			{ text: "Item 4", id: "4" },
		],
	};

	const config2 = {
		parentTag: selectedStory.parentTag,
		value: "mambo-combobox",
		data: [
			{ text: "Item 1", id: "1" },
			{ text: "Item 2", id: "2" },
			{ text: "Item 3", id: "3" },
			{ text: "Item 4", id: "4" },
		],
	};

	const config3 = {
		parentTag: selectedStory.parentTag,
		value: "mambo-combobox",
		labelText: "Select Item",
		data: [
			{ text: "Item 1", id: "1" },
			{ text: "Item 2", id: "2" },
			{ text: "Item 3", id: "3" },
			{ text: "Item 4", id: "4" },
		],
	};

	ui.combobox(config1);
	ui.combobox(config2);
	ui.combobox(config3);
}
