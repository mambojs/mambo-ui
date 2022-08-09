//: Percentage
//@
demoPercentage("demo-percentage");

function demoPercentage(parentEle) {
	lowPercentage();
	highPercentage();
	fullPercentage();

	function lowPercentage() {
		const config = {
			parentTag: parentEle,
			value: 0.3,
		};

		ui.percentage(config);
	}

	function highPercentage() {
		const config = {
			parentTag: parentEle,
			value: 0.8,
		};

		ui.percentage(config);
	}

	function fullPercentage() {
		const config = {
			parentTag: parentEle,
			value: 1,
		};

		ui.percentage(config);
	}
}
//!
