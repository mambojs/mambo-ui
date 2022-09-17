function storyDragDrop(selectedStory) {
	let props = {
		parentTag: selectedStory.parentTag,
		fnDrop: (context) => {
			console.table(context?.dataTransfer?.files);
		},
	};

	ui.dragDrop(props);
}
