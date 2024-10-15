function storyButtonGroup(selectedStory) {
	demoButtonGroup();
	demoButtonGroupIcon();

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
}
