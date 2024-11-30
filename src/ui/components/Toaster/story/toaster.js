function storyToaster(selectedStory) {
	const activeToasters = {};

	const configButton = {
		text: "Toaster with Mambo Button",
		parentTag: selectedStory.parentTag,
		fnClick: () => {
			if (activeToasters["toaster-with-mambo-button"]) {
				activeToasters["toaster-with-mambo-button"].close();
				delete activeToasters["toaster-with-mambo-button"];

				return;
			}

			let toasterConfig = {
				parentTag: selectedStory.parentTag,
				closeButton: false,
				open: true,
				message: "Mambo Toaster Successfully Completed",
				autoHideDuration: 5000,
				size: "large",
				type: "success",
				fnClose: (context) => {
					context.Toaster.close();
					delete activeToasters["toaster-with-mambo-button"];
				},
				fnComplete: (context) => {
					context.Toaster.getBodyTag().innerHTML = `
									<div style="display: flex; align-items: start; flex-direction: column;">
										<span style="font-size: var(--m-font-size-m);"> Titulo: </span>
										<span>Mambo Toaster + Mambo Button</span>
									</div>
									<mambo-button style="padding-left: 1rem;" id='btn-undo-mambo-button'></mambo-button>`;
					const buttonUndo = document.getElementById("btn-undo-mambo-button");
					const timeOut = setTimeout(() => {
						context.Toaster.close();
						delete activeToasters["toaster-with-mambo-button"];
					}, context.Toaster.autoHideDuration());
					buttonUndo.setup({
						text: "Cancel",
						type: "secondary",
						size: "small",
						fnClick: () => {
							clearTimeout(timeOut);
							context.Toaster.close();
							delete activeToasters["toaster-with-mambo-button"];
						},
					});
				},
			};

			activeToasters["toaster-with-mambo-button"] = ui.toaster(toasterConfig);
		},
	};

	ui.button(configButton);

	const variants = [
		{ h: "left", v: "top", type: "info", size: "small" },
		{ h: "center", v: "top", type: "success", size: "medium" },
		{ h: "right", v: "top", type: "error", size: "large" },
		{ h: "left", v: "center", type: "warning", size: "small" },
		{ h: "center", v: "center", type: "info", size: "medium" },
		{ h: "right", v: "center", type: "success", size: "large" },
		{ h: "left", v: "bottom", type: "error", size: "small" },
		{ h: "center", v: "bottom", type: "warning", size: "medium" },
		{ h: "right", v: "bottom", type: "success", size: "large" },
	];

	variants.forEach((variant) => {
		const config = {
			text: `Toaster ${variant.h}-${variant.v}`,
			parentTag: selectedStory.parentTag,
			fnClick: () => {
				if (activeToasters[`${variant.h}-${variant.v}`]) {
					activeToasters[`${variant.h}-${variant.v}`].close();
					delete activeToasters[`${variant.h}-${variant.v}`];

					return;
				}

				let toasterConfig = {
					closeButton: true,
					anchorOrigin: { horizontal: variant.h, vertical: variant.v },
					open: true,
					message:
						variant.size === "small"
							? `<div style="display: flex; flex-direction: column;">
							   <span style="font-size: 0.85rem; font-weight: 400;">Toaster: ${variant.h}-${variant.v}</span>
							    </div>`
							: `<div style="display: flex; flex-direction: column;">
								 <span style="font-size: 1rem; font-weight: 600;">Title:</span>
								 <span style="font-size: 0.85rem; font-weight: 400;">toaster: ${variant.h}-${variant.v}</span>
							    </div>`,
					autoHideDuration: 5000,
					type: variant.type,
					size: variant.size,
					fnClose: (context) => {
						context.Toaster.close();
						delete activeToasters[`${variant.h}-${variant.v}`];
					},
					fnComplete: (context) => {
						const timeOut = setTimeout(() => {
							context.Toaster.close();
							delete activeToasters[`${variant.h}-${variant.v}`];
						}, context.Toaster.autoHideDuration());
					},
				};

				activeToasters[`${variant.h}-${variant.v}`] = ui.toaster(toasterConfig);
			},
		};

		ui.button(config);
	});
}
