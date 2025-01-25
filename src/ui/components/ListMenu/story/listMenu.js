function storyListMenu(selectedStory) {
	simpleListMenu();

	function simpleListMenu() {
		const data = [
			{
				title: "List Item Parent 1",
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
						rotatable: true,
					},
				],
				children: [
					{
						title: "List Item First Child",
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
								rotatable: true,
							},
						],
						children: [
							{
								title: "List Item Child of First Child",
								subtitle: "Supporting line text",
							},
						],
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
						rotatable: true,
					},
				],
				children: [
					{
						title: "About",
						subtitle: "App Information",
					},
					{
						title: "Help",
						subtitle: "Contact us",
					},
					{
						title: "Feedback",
						subtitle: "Send us your feedback",
					},
				],
			},
		];

		const config = {
			data,
			onSelect: (e) => console.log(e),
			parentTag: selectedStory.parentTag,
			onComplete: (context) => {
				context.ListMenu.closeAllItems();
			},
		};

		ui.listMenu(config);
	}
}
