function storyButton(selectedStory) {
	singleButton();
	textIcon();
	testButton();
	textImage();
	primaryLarge();
	primaryMedium();
	primarySmall();
	secondaryLarge();
	secondaryMedium();
	secondarySmall();
	primaryDisabled();
	secondaryDisabled();

	function testButton() {
		const button = dom.getTag("#mamboButton");
		button.setup({ text: "Test Button" });
	}

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
					src: `data:image/svg+xml;base64,
                PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0
                JveD0iMCAwIDUwIDUwIj48dGl0bGU+aG9tZTwvdGl0bGU
                +PHBvbHlnb24gcG9pbnRzPSI0NyAyMy45OCAyNC41IDEuNDggMiAyMy45OCA4LjA5IDI0IDguMDkgNDguNTIgMTguM
                zYgNDguNTIgMTguMzYgMzUuMTIgMzAuNjQgMzUuMTIgMzAuNjQgNDguNTIgNDAuOTEgNDguNTIgNDAuOTEgMjQgNDc
                gMjMuOTgiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=`,
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
					src: `data:image/svg+xml;base64,
                PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0
                JveD0iMCAwIDUwIDUwIj48dGl0bGU+aG9tZTwvdGl0bGU
                +PHBvbHlnb24gcG9pbnRzPSI0NyAyMy45OCAyNC41IDEuNDggMiAyMy45OCA4LjA5IDI0IDguMDkgNDguNTIgMTguM
                zYgNDguNTIgMTguMzYgMzUuMTIgMzAuNjQgMzUuMTIgMzAuNjQgNDguNTIgNDAuOTEgNDguNTIgNDAuOTEgMjQgNDc
                gMjMuOTgiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=`,
					alt: "home",
				},
				hover: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADxElEQVRoQ9WZS
            +hVVRTGv1+ZL3Jg9kAqKKU0CHrQwwaWSlEgggi9KBLRQVKzIIheVtAkaBAoBilFTSpqFBFhD5pkFFQWUUEvKAhpYCBZ/
            qsvluwb19u5d+9z7jn/7l2Te+Cuvdb37fXYLzTlQpf4bZ8gaR5wpCs/
            XRNYL2k58NS0EvhU0unA0qkjkNLnT0kR5YVdpVFnKWR7naS30sxvB3Z3EYUuCeyXdGUC/RNw1tQQsB0T81dKnx7u
            +cAfbZPoJAK2V0l6fwDsFuDZaSHwjqQ1A2C/B86deAIpfaL7xCI2KHOBmTZJtJ5Cti
            +S9MkQkDcDL006gdckxQpcJV8DKyadQKTPiSNAzgGiQ7UiraaQ7ZjdLzPINgARpVakbQKR3zdmkB0Aok5akbYJHJV0UgaZ
            JUUa/d0Gg9YI2D5H0neFoNYBsVaMLdi+RNL8vsILUr0i7P8OZ9HbBwu0N+PbJG0oRBTb7IeS7uC6EJHpL/L4jqiF9H
            +H3kwQCFAxG1cXOp8UtWgWF/
            +bQrbvkPTcpKDL4LgfeDx0jqsB20skfSUpfidR4mx9IfBtD1xlEduOXePmCWOwT9L1g91raBeyvVrSu0M2ZbPJLQr4VuDF
            Kqcj26jteZIOSDp/NhH3+TooaQVwaJj/onXA9g5JD88yib3A1pzPIgJhxPZKSdG/5+aMjvl/
            9Pe1wHsldooJJBJzJH0g6dIS4w10fpB0QZ0rmFoEeoBs3yfpWB9uUXYD2
            +vaa0QgRSO6VFGYC0BtBfYW6P1HZRwCD0h6rInTijEvAzc1sTUOgV9aXLFngEbNoREB2wsk/
            dZkxkaMORv4sa7NpgSi2HbVdZbRfxq4s67NpgRips6s6yyjfwRYWNdmbQK2I1dbv+NMwE8DoraKpQmB2yU9X
            +hhT2q1peeMJ4B7C20fU2tC4BtJyzJOIkKXA5+lNePUdM44JTPuMLCoMwK2YyuRu9uM4+m1VbcOtl+QdFsG4OJRu8/
            BsbUiYHuTpFeGAIh9+y25u0/b10h6e8Q5YwfwSGkU6hL4IjZbFcZ/lrQS+LXEse24BYlzxnkV
            +oeAxSV2atVAur2outPcBdxV6rBfz/aDkh6tGLsIOFxiszgCtq
            +T9Gaf0bjEvQr4qMTRMB3b8ejxebxk9uncAzxZYrcOgQ8lXZaMfizpCiBIjC3pUeR1STckYweBM0oMFxEYeLS7G9hZYryu
            ju2Nkl5N7X0B8HvORimBeLR7IxVqFGxnYvtkSdEsohtlzwilBDYDpatpK+RsbwOeyRkrIpAz8n/+/
            w9yPSt2FCZ6UwAAAABJRU5ErkJggg==`,
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
			fnClick: (context) => {
				console.log(`${context.Button.text()} clicked.`);
			},
		};
		ui.button(config);
	}
}
