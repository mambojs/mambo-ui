function storyTab(selectedStory) {
	installWithFnCallback();
	installWithContentProp();

	function installWithFnCallback() {
		let tabConfig = {
			parentTag: selectedStory.parentTag,
			tabs: {
				buttons: [
					{
						text: "Mail",
						size: "small",
						icon: {
							attr: {
								class: "fa-solid fa-envelope",
							},
						},
						onClick: (context) => {},
					},
					{
						text: "Star",
						size: "small",
						icon: {
							attr: {
								class: "fa-solid fa-star",
							},
						},
					},
					{
						text: "Compass",
						size: "small",
						icon: {
							attr: {
								class: "fa-solid fa-compass",
							},
						},
					},
				],
				onClick: (context) => {},
			},
			onTabComplete: (contentTag, tab) => {
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
					onClick: (context) => {},
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
			onClick: (buttonContext) => {},
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
