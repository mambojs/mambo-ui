//: Switch
//@
demoSwitch("demo-switch")

function demoSwitch(parentEle) {
	defaultSwitch();
	checkedSwitch();
	customTextSwitch();
	disabledSwitch();

	function defaultSwitch() {
		const config = {
			parentTag: parentEle,
			fnChange: context => {
				alert(context.switch.checked());
			},
		};

		new ui.switch(config);
	}

	function checkedSwitch() {
		const config = {
            parentTag: parentEle,
			checked: true,
			fnChange: context => {
				alert(context.switch.checked());
			},
		};

		new ui.switch(config);
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
				alert(context.switch.checked());
			},
		};

		new ui.switch(config);
	}

	function disabledSwitch() {
		const config = {
            parentTag: parentEle,
			enable: false,
			fnChange: context => {
				alert(context.switch.checked());
			},
		};

		new ui.switch(config);
	}
}
//!