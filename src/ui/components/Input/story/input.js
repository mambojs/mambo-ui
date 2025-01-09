function storyInput(selectedStory) {
	inputWithClearButton();
	inputWithLeftButton();
	inputWithIcon();

	function inputWithClearButton() {
		const config = {
			parentTag: selectedStory.parentTag,
			value: "My value",
			enableClear: true,
			labelText: "Email",
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

	const togglePasswordVisibility = (context, showPassword) => {
		context.Input.setAttr({ type: showPassword ? "text" : "password" });
		context.Button.getTag().classList.toggle("fa-eye", showPassword);
		context.Button.getTag().classList.toggle("fa-eye-slash", !showPassword);
	};

	function inputWithLeftButton() {
		const config = {
			parentTag: selectedStory.parentTag,
			value: "My value",
			enableClear: false,
			enableLeftButton: true,
			labelText: "Password",
			onMouseDown: (context) => togglePasswordVisibility(context, true),
			onTouchStart: (context) => togglePasswordVisibility(context, true),
			onMouseUp: (context) => togglePasswordVisibility(context, false),
			onTouchEnd: (context) => togglePasswordVisibility(context, false),
			onComplete: (context) => context.Input.setAttr({ type: "password" }),
		};

		ui.input(config);
	}

	function inputWithIcon() {
		const config = {
			parentTag: selectedStory.parentTag,
			labelText: "Email",
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
