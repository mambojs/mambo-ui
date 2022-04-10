function demoSwitch(parentEle) {
	defaultSwitch();
	checkedSwitch();
	customTextSwitch();
	disabledSwitch();

	function defaultSwitch() {
		const config = {
			parentTag: parentEle,
			fnChange: context => {
				console.log(context.switch.checked());
			},
		};

		new MamboSwitch(config);
	}

	function checkedSwitch() {
		const config = {
            parentTag: parentEle,
			checked: true,
			fnChange: context => {
				console.log(context.switch.checked());
			},
		};

		new MamboSwitch(config);
	}

	function customTextSwitch() {
		const config = {
            parentTag: parentEle,
			checked: true,
			messages: {
				checked: 'YES',
				unchecked: 'NO',
			},
			fnChange: context => {
				console.log(context.switch.checked());
			},
		};

		new MamboSwitch(config);
	}

	function disabledSwitch() {
		const config = {
            parentTag: parentEle,
			enable: false,
			fnChange: context => {
				console.log(context.switch.checked());
			},
		};

		new MamboSwitch(config);
	}
}
