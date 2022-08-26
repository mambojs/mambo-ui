function storyDragDrop(selectedStory) {
	let props = {
		parentTag: selectedStory.parentTag,
		dropText: "Drop files here",
		allowKind: ["text/plain"],
		fnDrop: handleDropEvent,
	};

	ui.dragDrop(props);

	function handleDropEvent(context) {
		console.table(context.dataTransfer.files);
	}
}
