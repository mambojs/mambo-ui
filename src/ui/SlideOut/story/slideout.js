function storySlideout(selectedStory) {
	let m_slideout;
	installOpenButton();
	installSlideout();

	function installOpenButton() {
		const buttonConfig = {
			parentTag: selectedStory.parentTag,
			id: 1,
			text: "Open Slideout",
			fnClick: () => {
				m_slideout.open();
			},
		};

		ui.button(buttonConfig);
	}

	function installSlideout() {
		const slideoutConfig = {
			parentTag: "body",
			fnComplete: installSlideoutContent,
		};
		m_slideout = ui.slideout(slideoutConfig);
	}

	function installSlideoutContent(context) {
		const headerTag = context.Slideout.getHeaderTag();
		dom.append(headerTag, "<h3>My Header Content</h3>");
		// Insert Body content
		const bodyTag = context.Slideout.getBodyTag();
		dom.append(bodyTag, "<p style='padding:1em;'>Here goes your content</p>");
	}
}
//!
