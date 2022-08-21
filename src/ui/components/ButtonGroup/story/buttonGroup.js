function storyButtonGroup(selectedStory) {
	demoButtonGroup();

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
}
