function storyListbox(selectedStory) {
	simpleListbox();

	function simpleListbox() {
		const data = [
			{ displayName: "Av. Mosconi 2345" },
			{ displayName: "Test 2" }
		];
		const config = {
			data,
			fnSelect: e => console.log(e),
			parentTag: selectedStory.parentTag,
			prop: { id: "simplelistbox" },
		}
		ui.listbox(config);
	}
}
