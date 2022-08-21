function storyDialog(selectedStory) {
	const props = {
		parentTag: selectedStory.parentTag,
		text: "Click to trigger Dialog instance",
		fnClick: () => {
			let dialogConfig = {
				title: "Dialog Title",
				fnComplete: (context) => {
					context.Dialog.getBodyTag().innerHTML = "<p style='padding:3em;'>Your Dialog content will go here</p>";
				},
			};

			ui.dialog(dialogConfig);
		},
	};

	ui.button(props);
}
