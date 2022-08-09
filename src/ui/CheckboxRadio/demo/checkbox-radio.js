//: Checkbox Radio
//@
demoCheckboxRadio("demo-checkbox-radio");

function demoCheckboxRadio(parentEle) {
	checkbox();
	radio();

	function checkbox() {
		const config = {
			id: 1,
			text: "Checkbox",
			fnClick: (context) => {
				alert(`Checkbox id: ${context.checkboxRadio.getId()} ${context.checkboxRadio.select() ? "checked" : "not checked"}.`);
			},
		};

		ui.checkboxRadio(parentEle, config);
	}

	function radio() {
		const config = {
			id: 2,
			text: "Radio",
			attr: {
				type: "radio",
			},
			fnClick: (context) => {
				alert(`Radio id: ${context.checkboxRadio.getId()} ${context.checkboxRadio.select() ? "checked" : "not checked"}.`);
			},
		};

		ui.checkboxRadio(parentEle, config);
	}
}
//!
