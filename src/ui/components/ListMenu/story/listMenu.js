function storyListMenu(selectedStory) {
	const emptyIcons = [
		{
			attr: {
				class: "fa-solid",
			},
			size: "large",
			position: "left",
		},
		{
			attr: {
				class: "fa-solid",
			},
			size: "large",
			position: "right",
		},
	];

	simpleListMenu();

	function simpleListMenu() {
		const data = [
			{
				title: "List Item 1",
				subtitle: "Supporting line text",
				icon: [
					{
						attr: {
							class: "fa-solid fa-person",
						},
						size: "large",
						position: "left",
					},
					{
						attr: {
							class: "fa-solid fa-caret-right",
						},
						size: "large",
						position: "right",
					},
				],
				child: [
					{
						title: "List Item 1-1",
						subtitle: "Supporting line text",
						icon: emptyIcons,
					},
				],
			},
			{
				title: "Help and Support",
				subtitle: "Contact us",
				icon: [
					{
						attr: {
							class: "fa-solid fa-headset",
						},
						size: "medium",
						position: "left",
					},
					{
						attr: {
							class: "fa-solid fa-caret-right",
						},
						size: "large",
						position: "right",
					},
				],
				child: [
					{
						title: "About",
						subtitle: "App Information",
						icon: emptyIcons,
					},
					{
						title: "Help",
						subtitle: "Contact us",
						icon: emptyIcons,
					},
					{
						title: "Feedback",
						subtitle: "Send us your feedback",
						icon: emptyIcons,
					},
				],
			},
		];

		const config = {
			data,
			onSelect: (e) => console.log(e),
			parentTag: selectedStory.parentTag,
		};

		ui.listMenu(config);
	}
}
