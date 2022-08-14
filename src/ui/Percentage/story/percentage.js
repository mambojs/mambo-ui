function storyPercentage(selectedStory) {
	lowPercentage();
	highPercentage();
	fullPercentage();

	function lowPercentage() {
		const config = {
			parentTag: selectedStory.parentTag,
			value: 0.3,
		};

		ui.percentage(config);
	}

	function highPercentage() {
		const config = {
			parentTag: selectedStory.parentTag,
			value: 0.8,
		};

		ui.percentage(config);
	}

	function fullPercentage() {
		const config = {
			parentTag: selectedStory.parentTag,
			value: 1,
		};

		ui.percentage(config);
	}
}
