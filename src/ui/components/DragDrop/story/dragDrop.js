function storyDragDrop(selectedStory) {
	let props = {
		parentTag: selectedStory.parentTag,
		onDrop: (context) => {
			console.table(context?.dataTransfer?.files);
		},
	};

	ui.dragDrop(props);
}
