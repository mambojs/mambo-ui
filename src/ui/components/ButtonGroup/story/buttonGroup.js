function storyButtonGroup(selectedStory) {
	demoButtonGroup();
	demoButtonGroupIcon();
	demoPrimaryButtonGroup();
	demoSecondaryButtonGroupIcon();

	function demoButtonGroup() {
		let btnGroupProps = {
			parentTag: selectedStory.parentTag,
			buttons: [
				{
					id: 1,
					text: "Button One",
					onClick: (context) => {},
				},
				{
					id: 2,
					text: "Button Two",
				},
				{
					id: 3,
					text: "Button Three",
				},
			],
			onClick: (context) => {},
		};

		ui.buttonGroup(btnGroupProps);
	}

	function demoButtonGroupIcon() {
		let btnGroupProps = {
			parentTag: selectedStory.parentTag,
			buttons: [
				{
					id: 1,
					text: "Button One",
					onClick: (context) => {},
					icon: [
						{
							attr: {
								class: "fa-solid fa-star",
							},
						},
						{
							attr: {
								class: "fa-solid fa-star",
							},
						},
					],
				},
				{
					id: 2,
					text: "Button Two",
					icon: [
						{
							attr: {
								class: "fa-solid fa-compass",
							},
							size: "medium",
						},
					],
				},
				{
					id: 3,
					text: "Button Three",
					icon: [
						{
							attr: {
								class: "fa-solid fa-star",
							},
						},
						{
							attr: {
								class: "fa-solid fa-star",
							},
						},
					],
				},
			],
			onClick: (context) => {
				console.log(context.Button.getId());
			},
		};

		ui.buttonGroup(btnGroupProps);
	}

	function demoPrimaryButtonGroup() {
		let btnGroupProps = {
			parentTag: selectedStory.parentTag,
			buttons: [
				{
					id: 1,
					text: "Button One",
					onClick: (context) => {},
					type: "primary",
					size: "small",
				},
				{
					id: 2,
					text: "Button Two",
					type: "primary",
					size: "medium",
				},
				{
					id: 3,
					text: "Button Three",
					type: "primary",
					size: "small",
				},
			],
			onClick: (context) => {},
		};

		ui.buttonGroup(btnGroupProps);
	}

	function demoSecondaryButtonGroupIcon() {
		let btnGroupProps = {
			parentTag: selectedStory.parentTag,
			buttons: [
				{
					id: 1,
					text: "Button One",
					type: "secondary",
					size: "small",
					onClick: (context) => {},
					icon: [
						{
							attr: {
								class: "fa-solid fa-star",
							},
							position: "left",
							size: "small",
						},
						{
							attr: {
								class: "fa-solid fa-star",
							},
							position: "left",
							size: "small",
						},
					],
				},
				{
					id: 2,
					text: "Button Two",
					type: "secondary",
					size: "large",
					icon: [
						{
							attr: {
								class: "fa-solid fa-star",
							},
							position: "left",
							size: "large",
						},
						{
							attr: {
								class: "fa-solid fa-star",
							},
							position: "right",
							size: "large",
						},
					],
				},
				{
					id: 3,
					text: "Button Three",
					type: "secondary",
					size: "small",
					icon: [
						{
							attr: {
								class: "fa-solid fa-star",
							},
						},
						{
							attr: {
								class: "fa-solid fa-star",
							},
						},
					],
				},
			],
			onClick: (context) => {},
		};

		ui.buttonGroup(btnGroupProps);
	}
}
