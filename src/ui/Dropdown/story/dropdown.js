function storyDropdown(selectedStory) {
	let config = {
		parentTag: selectedStory.parentTag,
		fnComplete: installDropdownContent,
	};
	ui.dropdown(config);

	function installDropdownContent(context) {
		const contentTag = context.Dropdown.getContentTag();
		dom.append(contentTag, "<p style='padding:1em;'>Here goes your content</p>");
	}
}
