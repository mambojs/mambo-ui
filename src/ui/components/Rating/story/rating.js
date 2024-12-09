function storyRating(selectedStory) {
	defaultRating();
	tenStars();
	disabled();

	function defaultRating() {
		const config = {
			parentTag: selectedStory.parentTag,
			onSelect: (context) => {},
		};

		ui.rating(config);
	}

	function tenStars() {
		const config = {
			parentTag: selectedStory.parentTag,
			css: {
				parent: "rating-parent rating-parent-ten",
			},
			value: 5,
			max: 10,
			onSelect: (context) => {},
		};

		ui.rating(config);
	}

	function disabled() {
		const config = {
			parentTag: selectedStory.parentTag,
			value: 3,
			enable: false,
		};

		ui.rating(config);
	}
}
