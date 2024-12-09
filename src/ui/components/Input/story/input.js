function storyInput(selectedStory) {
	inputWithClearButton();
	inputWithIcon();
	inputWithLeftButton();

	function inputWithClearButton() {
		const config = {
			parentTag: selectedStory.parentTag,
			value: "My value",
			enableClear: true,
			icon: [
				{
					attr: {
						class: "fa-regular fa-envelope",
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
			enableLeftButton: true,
			onMouseDown: (context) => {
				context.Input.setAttr({ type: "text" });
				context.Button.getTag().classList.toggle("fa-eye", true);
				context.Button.getTag().classList.toggle("fa-eye-slash", false);
			},
			onMouseUp: (context) => {
				context.Input.setAttr({ type: "password" });
				context.Button.getTag().classList.toggle("fa-eye-slash", true);
				context.Button.getTag().classList.toggle("fa-eye", false);
			},
			onComplete: (context) => {
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
						class: "fa-regular fa-envelope",
					},
					size: "small",
					position: "left",
				},
			],
			tags: {
				input: {
					prop: {
						placeholder: "Ingresa tu email",
					},
				},
			},
			required: true,
			onBlur: ({ Input }) => {
				Input.showRequired();
			},
		};

		ui.input(config);
	}
}
