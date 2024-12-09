function storySlideout(selectedStory) {
	let m_slideout;
	installSlideout();
	installOpenButton();

	function installOpenButton() {
		const buttonConfig = {
			parentTag: selectedStory.parentTag,
			text: "Open Slideout",
			onClick: () => {
				m_slideout.open();
			},
		};

		ui.button(buttonConfig);
	}

	function installSlideout() {
		const slideoutConfig = {
			parentTag: "body",
			onComplete: installSlideoutContent,
		};
		m_slideout = ui.slideout(slideoutConfig);
	}

	function installSlideoutContent(context) {
		const headerTag = context.Slideout.getHeaderTag();
		dom.append(headerTag, "<h3>My Header Content</h3>");
		const bodyTag = context.Slideout.getBodyTag();
		dom.append(bodyTag, "<p style='padding:1em;'>Here goes your content</p>");
	}
}
