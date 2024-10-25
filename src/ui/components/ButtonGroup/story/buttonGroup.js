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
					fnClick: (context) => {},
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
			fnClick: (context) => {},
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
					fnClick: (context) => {},
					icon: [
						{
							attr: {
								class: "fa-solid fa-star",
							},
						},
						{
							attr: {
								"data-feather": "star",
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
								class: "fa-solid fa-star",
							},
						},
						{
							attr: {
								"data-feather": "star",
							},
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
								"data-feather": "star",
							},
						},
					],
				},
			],
			fnClick: (context) => {},
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
					fnClick: (context) => {},
					type: "primary",
					size: "large",
				},
				{
					id: 2,
					text: "Button Two",
					type: "primary",
					size: "large",
				},
				{
					id: 3,
					text: "Button Three",
					type: "primary",
					size: "large",
				},
			],
			fnClick: (context) => {},
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
					fnClick: (context) => {},
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
								"data-feather": "star",
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
								"data-feather": "star",
							},
						},
					],
				},
			],
			fnClick: (context) => {},
		};

		ui.buttonGroup(btnGroupProps);
	}
}
