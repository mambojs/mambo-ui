function storySlider(selectedStory) {
	const horizontalParentTag = dom.createTag("slider-horizontal");
	const verticalParentTag = dom.createTag("slider-vertical");
	selectedStory.parentTag.appendChild(horizontalParentTag);
	selectedStory.parentTag.appendChild(verticalParentTag);
	defaultSlider();
	verticalSlider();

	function defaultSlider() {
		const config = {
			parentTag: horizontalParentTag,
			fnSelect: (context) => {},
		};

		ui.slider(config);
	}

	function verticalSlider() {
		const config = {
			parentTag: verticalParentTag,
			orientation: "vertical",
			fnSelect: (context) => {},
		};

		ui.slider(config);
	}
}
