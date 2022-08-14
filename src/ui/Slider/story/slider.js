function storySlider(selectedStory) {
	defaultSlider();
	verticalSlider();

	function defaultSlider() {
		const config = {
			parentTag: selectedStory.parentTag,
			fnSelect: (context) => {},
		};

		ui.slider(config);
	}

	function verticalSlider() {
		const config = {
			parentTag: selectedStory.parentTag,
			orientation: "vertical",
			fnSelect: (context) => {},
		};

		ui.slider(config);
	}
}
//!
