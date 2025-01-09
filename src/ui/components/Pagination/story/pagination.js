function storyPagination(selectedStory) {
	const config1 = {
		parentTag: selectedStory.parentTag,
		totalPages: 5,
		currentPage: 1,
		onPageChange: (context) => {
			console.log(`Page ${context.Pagination.getCurrentPage()}`);
		},
	};

	ui.pagination(config1);

	const config2 = {
		parentTag: selectedStory.parentTag,
		totalPages: 10,
		currentPage: 5,
		previousButton: {
			text: "",
			icon: [
				{
					attr: {
						class: "fa-solid fa-arrow-left",
					},
				},
			],
		},
		nextButton: {
			text: "",
			icon: [
				{
					attr: {
						class: "fa-solid fa-arrow-right",
					},
				},
			],
		},
		onPageChange: (context) => {
			console.log(`Page ${context.Pagination.getCurrentPage()}`);
		},
	};

	ui.pagination(config2);

	const config3 = {
		parentTag: selectedStory.parentTag,
		totalPages: 20,
		currentPage: 10,
		previousButton: {
			text: "Previous",
		},
		nextButton: {
			text: "Next",
		},
		onPageChange: (context) => {
			console.log(`Page ${context.Pagination.getCurrentPage()}`);
		},
	};

	ui.pagination(config3);

	const config4 = {
		parentTag: selectedStory.parentTag,
		totalPages: 2,
		currentPage: 1,
		onPageChange: (context) => {
			console.log(`Page ${context.Pagination.getCurrentPage()}`);
		},
	};

	ui.pagination(config4);
}
