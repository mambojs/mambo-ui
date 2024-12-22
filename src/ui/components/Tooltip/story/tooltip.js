function storyTooltip(selectedStory) {
	const demoContainer = document.createElement("div");
	demoContainer.style.cssText = "display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem; padding: 2rem;";
	selectedStory.parentTag.appendChild(demoContainer);

	const configButton = {
		text: "Hover me for Custom Tooltip",
		parentTag: demoContainer,
		onClick: () => {
			console.log("Button clicked");
		},
		onComplete: () => {
			ui.tooltip({
				anchorTag: customButton.getTag(),
				position: "top",
				onComplete: (context) => {
					context.Tooltip.getBodyTag().innerHTML = `<div style="display: flex; align-items: start; flex-direction: column;">
										<span style="font-size: 1rem;">Custom Tooltip</span>
										<span>With multiple lines of content</span>
										</div>`;
					const container = ui.d.getTag("storyboard-component");
					container.addEventListener("scroll", () => {
						context.Tooltip.updatePosition();
					});
				},
				onShow: (context) => {
					console.log("Tooltip shown", context);
				},
				onHide: (context) => {
					console.log("Tooltip hidden", context);
				},
				onMouseOver: (context) => {
					context.Tooltip.show();
				},
				onMouseOut: (context) => {
					context.Tooltip.hide();
				},
				onFocus: (context) => {
					context.Tooltip.show();
				},
				onBlur: (context) => {
					context.Tooltip.hide();
				},
			});
		},
	};

	const customButton = ui.button(configButton);

	const variants = [
		{ position: "top", content: "Tooltip on top" },
		{ position: "bottom", content: "Tooltip on bottom" },
		{ position: "left", content: "Tooltip on left" },
		{ position: "right", content: "Tooltip on right" },
		{ position: "top", content: "Top tooltip" },
		{ position: "bottom", content: "Another bottom tooltip" },
		{ position: "left", content: "Another left tooltip" },
		{ position: "right", content: "Another right tooltip" },
		{ position: "top", content: "Final top tooltip" },
	];

	variants.forEach((variant, index) => {
		const buttonConfig = {
			text: `tooltip (${variant.position})`,
			parentTag: demoContainer,
			onClick: () => {
				console.log(`Button ${index} clicked`);
			},
			onComplete: () => {
				let tooltipConfig = {
					anchorTag: button.getTag(),
					position: variant.position,
					onComplete: (context) => {
						context.Tooltip.getBodyTag().innerHTML = variant.content;
						const container = ui.d.getTag("storyboard-component");
						container.addEventListener("scroll", () => {
							context.Tooltip.updatePosition();
						});
					},
					onMouseOver: (context) => {
						context.Tooltip.show();
					},
					onMouseOut: (context) => {
						context.Tooltip.hide();
					},
					onFocus: (context) => {
						context.Tooltip.show();
					},
					onBlur: (context) => {
						context.Tooltip.hide();
					},
					onShow: (context) => {
						console.log(`Tooltip ${index} shown`);
					},
					onHide: (context) => {
						console.log(`Tooltip ${index} hidden`);
					},
				};
				ui.tooltip(tooltipConfig);
			},
		};
		const button = ui.button(buttonConfig);
	});

	const richButton = ui.button({
		text: "Hover for Rich Content",
		parentTag: demoContainer,
		type: "primary",
		onComplete: () => {
			ui.tooltip({
				anchorTag: richButton.getTag(),
				position: "top",
				onComplete: (context) => {
					context.Tooltip.getBodyTag().innerHTML = `<div style="display: flex; flex-direction: column; gap: 0.5rem;">
        		<strong style="font-size: 1rem;">Rich Content Tooltip</strong>
        		<p style="margin: 0;">This tooltip contains formatted content with:</p>
        		<ul style="margin: 0; padding-left: 1.5rem;">
          	<li>Multiple lines</li>
          	<li>Formatted text</li>
          	<li>Different styles</li>
        		</ul>
      			</div>`;
					const container = ui.d.getTag("storyboard-component");
					container.addEventListener("scroll", () => {
						context.Tooltip.updatePosition();
					});
				},
				onMouseOver: (context) => {
					context.Tooltip.show();
				},
				onMouseOut: (context) => {
					context.Tooltip.hide();
				},
				onFocus: (context) => {
					context.Tooltip.show();
				},
				onBlur: (context) => {
					context.Tooltip.hide();
				},
			});
		},
	});

	const accessibleButton = ui.button({
		text: "Hover or Focus me",
		parentTag: demoContainer,
		type: "secondary",
		onComplete: () => {
			ui.tooltip({
				anchorTag: accessibleButton.getTag(),
				position: "bottom",
				onComplete: (context) => {
					context.Tooltip.getBodyTag().innerHTML = "This tooltip shows on hover and focus for better accessibility";
				},
				onMouseOver: (context) => {
					context.Tooltip.show();
				},
				onMouseOut: (context) => {
					context.Tooltip.hide();
				},
				onFocus: (context) => {
					context.Tooltip.show();
				},
				onBlur: (context) => {
					context.Tooltip.hide();
				},
			});
		},
	});
}
