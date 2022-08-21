ui.class.String = function String() {
	const self = this;

	this.filterArray = filterArray;
	this.findInArray = findInArray;
	this.getSearchFunction = getSearchFunction;

	function filterArray(array, searchText, getItemTextFunc, filter) {
		let searchFunc = getSearchFunction(filter);
		return array.filter((item) => searchFunc(getItemTextFunc(item), searchText));
	}

	function findInArray(array, searchText, getItemTextFunc, filter) {
		let searchFunc = getSearchFunction(filter);
		return array.find((item) => searchFunc(getItemTextFunc(item), searchText));
	}

	function getSearchFunction(filter) {
		switch (filter) {
			case "contains":
				return contains;
			case "equals":
				return equals;
			default:
				return () => {
					return true;
				};
		}
	}

	function contains(itemText, searchText) {
		return itemText.toLowerCase().includes(searchText.toLowerCase());
	}

	function equals(itemText, searchText) {
		return itemText.toLowerCase() === searchText.toLowerCase();
	}
};

ui.string = new ui.class.String();
