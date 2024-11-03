function storyButtonSVG(selectedStory) {
	textImage();
	buttonImgWithHover();

	function textImage() {
		const config = {
			parentTag: selectedStory.parentTag,
			img: {
				attr: {
					src: "src/img/storyboard/home-icon.svg",
					alt: "home",
				},
			},
			id: 2,
			text: "Image Button",
			fnClick: (context) => {
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
					src: "src/img/storyboard/home-icon.svg",
					alt: "home",
				},
				hover: "src/img/storyboard/star.png",
			},
			fnClick: (context) => {
				alert(`${context.Button.text()} clicked.`);
			},
		};

		ui.button(config);
	}
}
