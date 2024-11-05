function storyButton(selectedStory) {
	singleButton();
	textIcon();
	textImage();
	primaryLarge();
	primaryMedium();
	primarySmall();
	secondaryLarge();
	secondaryMedium();
	secondarySmall();
	primaryDisabled();
	secondaryDisabled();
	buttonImgWithHover();

	function singleButton() {
		const config = {
			parentTag: selectedStory.parentTag,
			id: 8,
			text: "Single Button",
			enable: true,
		};
		ui.button(config);
	}
	function primaryLarge() {
		const config = {
			parentTag: selectedStory.parentTag,
			id: 3,
			text: "Button",
			size: "large",
			type: "primary",
			icon: [
				{
					attr: {
						"data-feather": "plus",
					},
					size: "large",
				},
			],
		};
		ui.button(config);
	}

	function primaryMedium() {
		const config = {
			parentTag: selectedStory.parentTag,
			id: 2,
			text: "",
			size: "medium",
			type: "primary",
			icon: [
				{
					attr: {
						"data-feather": "plus",
					},
					size: "medium",
				},
			],
		};
		ui.button(config);
	}

	function primarySmall() {
		const config = {
			parentTag: selectedStory.parentTag,
			id: 1,
			text: "Button",
			size: "small",
			type: "primary",
			icon: [
				{
					attr: {
						"data-feather": "plus",
					},
					size: "small",
					position: "left",
				},
			],
			fnClick: (context) => {
				console.log(`${context.Button.text()} clicked.`);
			},
		};

		ui.button(config);
	}

	function secondaryLarge() {
		const config = {
			parentTag: selectedStory.parentTag,
			id: 4,
			text: "Button",
			size: "large",
			type: "secondary",
		};
		ui.button(config);
	}

	function secondaryMedium() {
		const config = {
			parentTag: selectedStory.parentTag,
			id: 5,
			text: "Button",
			size: "medium",
			type: "secondary",
			icon: [
				{
					attr: {
						"data-feather": "plus",
					},
					size: "medium",
					position: "left",
				},
			],
		};
		ui.button(config);
	}

	function secondarySmall() {
		const config = {
			parentTag: selectedStory.parentTag,
			id: 6,
			text: "Button",
			size: "small",
			type: "secondary",
		};
		ui.button(config);
	}

	function primaryDisabled() {
		const config = {
			parentTag: selectedStory.parentTag,
			id: 7,
			text: "Primary",
			size: "medium",
			type: "primary",
			enable: false,
			icon: [
				{
					attr: {
						"data-feather": "plus",
					},
					size: "medium",
					position: "right",
				},
			],
		};
		ui.button(config);
	}

	function secondaryDisabled() {
		const config = {
			parentTag: selectedStory.parentTag,
			id: 8,
			text: "Mambo Button",
			size: "medium",
			type: "secondary",
			enable: false,
		};
		ui.button(config);
	}

	function textImage() {
		const config = {
			parentTag: selectedStory.parentTag,
			img: {
				attr: {
					src: "src/img/storyboard/home-icon.svg",
					alt: "home",
				},
				position: "left",
			},
			id: 2,
			text: "Image Button",
			fnClick: (context) => {
				console.log(`${context.Button.text()} clicked.`);
			},
		};

		ui.button(config);
	}

	function buttonImgWithHover() {
		const config = {
			parentTag: selectedStory.parentTag,
			id: 5,
			text: "Hover Button",
			img: {
				attr: {
					src: "src/img/storyboard/home-icon.svg",
					alt: "home",
				},
				hover: "src/img/storyboard/star.png",
			},
			fnClick: (context) => {
				console.log(`${context.Button.text()} clicked.`);
			},
		};
		ui.button(config);
	}

	function textIcon() {
		const config = {
			parentTag: selectedStory.parentTag,
			id: 3,
			text: "Icon Button",
			icon: [
				{
					attr: {
						class: "fa-solid fa-star",
					},
				},
				{
					attr: {
						"data-feather": "circle",
					},
				},
			],

			fnMouseDown: (context) => {
				console.log(`${context.Button.text()} Mouse Down.`);
			},
			fnMouseUp: (context) => {
				console.log(`${context.Button.text()} Mouse Up.`);
			},
		};
		ui.button(config);
	}
}
