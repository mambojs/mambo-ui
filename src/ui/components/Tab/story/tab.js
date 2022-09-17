function storyTab(selectedStory) {
	installWithFnCallback();
	//installWithContentProp();

	function installWithFnCallback() {
		let tabConfig = {
			parentTag: selectedStory.parentTag,
			tabs: {
				buttons: [
					{
						text: "Tab 1",
						fnClick: (context) => {},
					},
					{
						text: "Tab 2",
					},
					{
						text: "Tab 3",
					},
				],
				fnClick: (context) => {},
			},
			fnTabComplete: (contentTag, tab) => {
				contentTag.appendChild(dom.createTag("div", { text: `Tab name: ${tab.text}` }));
			},
		};

		ui.tab(tabConfig);
	}

	function installWithContentProp() {
		const btnGroupConfig = {
			buttons: [
				{
					id: 4,
					text: "Tab 4",
					fnClick: (context) => {},
				},
				{
					id: 5,
					text: "Tab 5",
				},
				{
					id: 6,
					text: "Tab 6",
				},
			],
			fnClick: (buttonContext) => {},
		};

		const contentList = btnGroupConfig.buttons.map((btn) => {
			return dom.createTag("div", {
				text: `This is content for Tab id: ${btn.id} name: ${btn.text}`,
			});
		});

		let tabConfig = {
			parentTag: selectedStory.parentTag,
			tabs: btnGroupConfig,
			contents: contentList,
		};

		ui.tab(tabConfig);
	}
}
