function storyInput(selectedStory) {
	inputWithoutClear();
	inputWithClear();
	inputWithIcon();

	function inputWithoutClear() {
		const config = {
			parentTag: selectedStory.parentTag,
			enableClear: false,
			icon: [
				{
					attr: {
						"data-feather": "search",
					},
					size: "small",
					position: "left",
				},
			],
		};

		ui.input(config);
	}

	function inputWithClear() {
		const config = {
			parentTag: selectedStory.parentTag,
			value: "My value",
			enableClear: true,
			icon: [
				{
					attr: {
						"data-feather": "star",
					},
					size: "small",
					position: "left",
				},
			],
		};

		ui.input(config);
	}

	function inputWithIcon() {
		const config = {
			parentTag: selectedStory.parentTag,
			icon: [
				{
					attr: {
						"data-feather": "eye",
					},
					size: "small",
					position: "right",
				},
			],
		};

		ui.input(config);
	}
}
