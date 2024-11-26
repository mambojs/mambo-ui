function storySwitch(selectedStory) {
	defaultSwitchLeft();
	defaultSwitchRight();
	checkedSwitch();
	customTextSwitch();
	disabledSwitch();
	disabledSwitchNoLabels();

	function defaultSwitchLeft() {
		const config = {
			parentTag: selectedStory.parentTag,
			text: "Option",
			position: "left",
			messages: {
				checked: "",
				unchecked: "",
			},
			fnChange: (context) => {},
		};

		ui.switch(config);
	}

	function defaultSwitchRight() {
		const config = {
			parentTag: selectedStory.parentTag,
			text: "Option",
			position: "right",
			messages: {
				checked: "",
				unchecked: "",
			},
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

	function disabledSwitchNoLabels() {
		const config = {
			parentTag: selectedStory.parentTag,
			enable: false,
			messages: {
				checked: "",
				unchecked: "",
			},
			fnChange: (context) => {},
		};

		ui.switch(config);
	}
}
