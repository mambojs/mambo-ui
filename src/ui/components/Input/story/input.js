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
			enableClear: false,
			enableLeftButton: true,
			validate: {
				show: false,
				types: [
					{
						required: {
							message: "Password is required",
						},
					},
					{
						custom: {
							validator: (value) => value.length >= 8,
							message: "Enter at least 8 characters",
						},
					},
					{
						custom: {
							validator: (value) => /[A-Z]/.test(value),
							message: "Enter at least one uppercase letter",
						},
					},
					{
						custom: {
							validator: (value) => /[0-9]/.test(value),
							message: "Enter at least one number",
						},
					},
				],
			},
			required: true,
			labelText: "Password",
			onMouseDown: (context) => togglePasswordVisibility(context, true),
			onTouchStart: (context) => togglePasswordVisibility(context, true),
			onMouseUp: (context) => togglePasswordVisibility(context, false),
			onTouchEnd: (context) => togglePasswordVisibility(context, false),
			onKeyup: (context) => console.log(context.Input.isValid()),
			onDataValidationChange: (context) => console.log(context.errorMessage),
			onComplete: (context) => context.Input.setAttr({ type: "password" }),
		};

		ui.input(config);
	}

	function inputWithIcon() {
		const config = {
			parentTag: selectedStory.parentTag,
			labelText: "Email",
			validate: {
				types: [
					{
						required: {
							message: "Email field is required",
						},
					},
					{
						custom: {
							validator: (value) => {
								return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
							},
							message: "Please enter a valid email",
						},
					},
				],
			},
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
						placeholder: "Enter your email",
					},
				},
			},
			required: true,
			onKeyup: (context) => console.log(context.Input.isValid()),
			onDataValidationChange: (context) => console.log(context.errorMessage),
		};

		ui.input(config);
	}
}
