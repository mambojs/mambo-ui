function storyCalendar(selectedStory) {
	//: Calendar example
	//@
	demoCalendar();

	function demoCalendar() {
		let config = {
			parentTag: selectedStory.parentTag,
		};

		ui.calendar(config);
	}
	//!
}
