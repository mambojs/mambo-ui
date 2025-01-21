function storyInput(selectedStory) {
	inputWithClearButton();
	inputWithLeftButton();
	inputWithIcon();
	inputWithIconOnlyNumbers();

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
		let visited = false;

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
			onComplete: (context) => context.Input.setAttr({ type: "password" }),
			onKeyup: (context) => {
				if (!visited) return;
				context.Input.validate();
				console.log("is valid?: ", context.Input.isValid());
			},
			onFocus: (context) => {
				if (!visited) return;
				context.Input.validate();
			},
			onBlur: (context) => {
				if (!visited) visited = true;
				context.Input.validate();
			},
			onDataValidationChange: (context) => console.log(context.errorMessage),
		};

		ui.input(config);
	}

	function inputWithIcon() {
		let visited = false;
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
			onKeyup: (context) => {
				if (!visited) return;
				context.Input.validate();
				console.log("is valid?: ", context.Input.isValid());
			},
			onFocus: (context) => {
				if (!visited) return;
				context.Input.validate();
			},
			onBlur: (context) => {
				if (!visited) visited = true;
				context.Input.validate();
			},
			onDataValidationChange: (context) => console.log(context.errorMessage),
		};

		ui.input(config);
	}

	function inputWithIconOnlyNumbers() {
		const config = {
			parentTag: selectedStory.parentTag,
			labelText: "Secret Code",
			validate: {
				types: [
					{
						required: {
							message: "Secrete Code is required",
						},
						custom: {
							validator: (value) => value.length >= 8,
							message: "Enter at least 8 characters",
						},
					},
				],
			},
			icon: [
				{
					attr: {
						class: "fa-regular fa-smile",
					},
					size: "small",
					position: "left",
				},
			],
			tags: {
				input: {
					prop: {
						placeholder: "Enter only numbers",
					},
				},
			},
			required: true,
			validateEvents: ["keyup", "keydown", "blur", "change", "focus"],
			onDataValidationChange: (context) => console.log(context.errorMessage),
			onKeydown: (context) => {
				if (!/[0-9]/.test(context.ev.key) && context.ev.key.length === 1) {
					context.ev.preventDefault();
				}
			},
			onComplete: (context) => {
				context.Input.focus();
			},
		};

		const input = ui.input(config);
	}
}
