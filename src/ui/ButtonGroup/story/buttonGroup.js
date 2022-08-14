function storyButtonGroup(selectedStory) {
	//: Look at the single Button demo configuration for a complete breakdown of all individual button options
	//@
	demoButtonGroup();

	function demoButtonGroup() {
		// Look at the single Button demo configuration for a complete breakdown of all individual button options
		// A Button Group is simply a collection of individual Buttons

		let btnGroupProps = {
			parentTag: selectedStory.parentTag,
			buttons: [
				{
					id: 1,
					text: "Button One",
					fnClick: (context) => {
						// You can declare individual event handlers for each button
					},
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
			fnClick: (context) => {
				// You can declare a single event handler for all buttons
				alert(`'Button clicked: ' ${context.Button.getId()}`);
			},
		};

		ui.buttonGroup(btnGroupProps);
	}
	//!
}
