function storySearch(selectedStory) {
	const config = {
		button: { text: "", fnClick: value => toMap(apiSearch(value)) },
		input: {
			fnKeyup: value => handleKeyUp(value),
			enableClear: true,
		},
		firedIn: 3,
		parentTag: selectedStory.parentTag,
		suggest: {
			displayKey: "displayName",
			fnSelect: e => toMap(e),
		}
	};

	const search = ui.search(config);

	function handleKeyUp(value) {
		// If suggest is true
		// console.log(apiSearch(value));

		search.suggest(apiSearch(value));
	}

	function apiSearch(value) {
		// Request API example: fetch(`https://api.sbc.com/places/?q=${value}`);

		// Response
		const testData = [
			{ displayName: "Text One", id: 1 },
			{ displayName: "Text Two", id: 2 },
			{ displayName: "Text Three", id: 3 },
			{ displayName: "Text Four", id: 4 },
			{ displayName: "Text Five", id: 5 },
		]

		// Emule API filter
		const expr = new RegExp(value, 'gi');
		return testData.filter(data => data.displayName.match(expr));
	}

	function toMap(ev) {
		console.log(ev);
	}
}
