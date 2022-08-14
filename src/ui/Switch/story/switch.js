function storySwitch(selectedStory) {
	defaultSwitch();
	checkedSwitch();
	customTextSwitch();
	disabledSwitch();

	function defaultSwitch() {
		const config = {
			parentTag: selectedStory.parentTag,
			fnChange: (context) => {},
		};

		ui.switch(config);
	}

	function checkedSwitch() {
		const config = {
			parentTag: selectedStory.parentTag,
			checked: true,
			fnChange: (context) => {},
		};

		ui.switch(config);
	}

	function customTextSwitch() {
		const config = {
			parentTag: selectedStory.parentTag,
			checked: true,
			messages: {
				checked: "YES",
				unchecked: "NO",
			},
			fnChange: (context) => {},
		};

		ui.switch(config);
	}

	function disabledSwitch() {
		const config = {
			parentTag: selectedStory.parentTag,
			enable: false,
			fnChange: (context) => {},
		};

		ui.switch(config);
	}
}
//!
