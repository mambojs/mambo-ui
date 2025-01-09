function storyButtonSVG(selectedStory) {
	textImage();
	buttonImgWithHover();

	function textImage() {
		const config = {
			parentTag: selectedStory.parentTag,
			img: {
				attr: {
					src: "img/storyboard/home-icon.svg",
					alt: "home",
				},
			},
			id: 2,
			text: "Image Button",
			onClick: (context) => {
				alert(`${context.Button.text()} clicked.`);
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
					src: "img/storyboard/home-icon.svg",
					alt: "home",
				},
				hover: "img/storyboard/star.png",
			},
			onClick: (context) => {
				alert(`${context.Button.text()} clicked.`);
			},
		};

		ui.button(config);
	}
}
