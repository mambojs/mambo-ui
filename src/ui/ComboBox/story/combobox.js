function storyComboboxNew(selectedStory) {
	const config = {
		parentTag: selectedStory.parentTag,
		data: [
			{ text: "Item 1", id: "1" },
			{ text: "Item 2", id: "2" },
			{ text: "Item 3", id: "3" },
			{ text: "Item 4", id: "4" },
		],
	};

	ui.combobox(config);
}
