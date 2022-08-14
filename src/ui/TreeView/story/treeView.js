function storyTreeView(selectedStory) {
	const props = {
		parentTag: selectedStory.parentTag,
		data: [
			{
				text: "Item 1",
				expanded: true,
				items: [
					{ text: "Item 1-1" },
					{ text: "Item 1-2" },
					{
						text: "Item 1-3",
						items: [{ text: "Item 1-3-1" }, { text: "Item 1-3-2" }, { text: "Item 1-3-3" }],
					},
				],
			},
			{
				text: "Item 2",
				items: [{ text: "Item 2-1" }, { text: "Item 2-2" }, { text: "Item 2-3" }, { text: "Item 2-4" }],
			},
		],
		fnSelect: (context) => {},
	};

	ui.treeView(props);
}
