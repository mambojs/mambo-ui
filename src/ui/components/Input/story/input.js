function storyInput(selectedStory) {
	inputWithClearButton();
	inputWithLeftButton();
	inputWithIcon();

	function inputWithClearButton() {
		const config = {
			parentTag: selectedStory.parentTag,
			value: "My value",
			enableClear: true,
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

	function inputWithLeftButton() {
		const config = {
			parentTag: selectedStory.parentTag,
			value: "My value",
			enableClear: false,
			enablePressButton: true,
			fnMouseDown: (context) => {
				context.Input.setAttr({ type: "text" });
				context.Button.getTag().classList.toggle("fa-eye", true);
				context.Button.getTag().classList.toggle("fa-eye-slash", false);
			},
			fnMouseUp: (context) => {
				context.Input.setAttr({ type: "password" });
				context.Button.getTag().classList.toggle("fa-eye-slash", true);
				context.Button.getTag().classList.toggle("fa-eye", false);
			},
			fnComplete: (context) => {
				context.Input.setAttr({ type: "password" });
			},
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
