function storyDropdown(selectedStory) {
	let config = {
		parentTag: selectedStory.parentTag,
		button: {
			text: "Open",
		},
		onComplete: (context) => {
			const contentTag = context.Dropdown.getContentTag();
			dom.append(contentTag, "<p style='padding:1em;'>Here goes your content</p>");
		},
	};

	ui.dropdown(config);
}
