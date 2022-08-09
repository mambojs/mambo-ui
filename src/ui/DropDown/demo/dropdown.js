//: Dropdown
//@
demoDropdown("demo-dropdown");

function demoDropdown(parentEle) {
	let config = {
		parentTag: parentEle,
		button: {
			img: {
				attr: {
					src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADxElEQVRoQ9WZS+hVVRTGv1+ZL3Jg9kAqKKU0CHrQwwaWSlEgggi9KBLRQVKzIIheVtAkaBAoBilFTSpqFBFhD5pkFFQWUUEvKAhpYCBZ/qsvluwb19u5d+9z7jn/7l2Te+Cuvdb37fXYLzTlQpf4bZ8gaR5wpCs/XRNYL2k58NS0EvhU0unA0qkjkNLnT0kR5YVdpVFnKWR7naS30sxvB3Z3EYUuCeyXdGUC/RNw1tQQsB0T81dKnx7u+cAfbZPoJAK2V0l6fwDsFuDZaSHwjqQ1A2C/B86deAIpfaL7xCI2KHOBmTZJtJ5Cti+S9MkQkDcDL006gdckxQpcJV8DKyadQKTPiSNAzgGiQ7UiraaQ7ZjdLzPINgARpVakbQKR3zdmkB0Aok5akbYJHJV0UgaZJUUa/d0Gg9YI2D5H0neFoNYBsVaMLdi+RNL8vsILUr0i7P8OZ9HbBwu0N+PbJG0oRBTb7IeS7uC6EJHpL/L4jqiF9H+H3kwQCFAxG1cXOp8UtWgWF/+bQrbvkPTcpKDL4LgfeDx0jqsB20skfSUpfidR4mx9IfBtD1xlEduOXePmCWOwT9L1g91raBeyvVrSu0M2ZbPJLQr4VuDFKqcj26jteZIOSDp/NhH3+TooaQVwaJj/onXA9g5JD88yib3A1pzPIgJhxPZKSdG/5+aMjvl/9Pe1wHsldooJJBJzJH0g6dIS4w10fpB0QZ0rmFoEeoBs3yfpWB9uUXYD2+vaa0QgRSO6VFGYC0BtBfYW6P1HZRwCD0h6rInTijEvAzc1sTUOgV9aXLFngEbNoREB2wsk/dZkxkaMORv4sa7NpgSi2HbVdZbRfxq4s67NpgRips6s6yyjfwRYWNdmbQK2I1dbv+NMwE8DoraKpQmB2yU9X+hhT2q1peeMJ4B7C20fU2tC4BtJyzJOIkKXA5+lNePUdM44JTPuMLCoMwK2YyuRu9uM4+m1VbcOtl+QdFsG4OJRu8/BsbUiYHuTpFeGAIh9+y25u0/b10h6e8Q5YwfwSGkU6hL4IjZbFcZ/lrQS+LXEse24BYlzxnkV+oeAxSV2atVAur2outPcBdxV6rBfz/aDkh6tGLsIOFxiszgCtq+T9Gaf0bjEvQr4qMTRMB3b8ejxebxk9uncAzxZYrcOgQ8lXZaMfizpCiBIjC3pUeR1STckYweBM0oMFxEYeLS7G9hZYryuju2Nkl5N7X0B8HvORimBeLR7IxVqFGxnYvtkSdEsohtlzwilBDYDpatpK+RsbwOeyRkrIpAz8n/+/w9yPSt2FCZ6UwAAAABJRU5ErkJggg==",
				},
			},
		},
		fnComplete: installDropdownContent,
	};
	ui.dropdown(config);

	function installDropdownContent(context) {
		// Get the dropDown content
		// Insert your own HTML content

		// You can replace the entire contents of the dropdown area
		const contentTag = context.dropdown.getContentTag();

		// Insert content
		dom.append(contentTag, "<p style='padding:1em;'>Here goes your content</p>");
	}
}
//!
