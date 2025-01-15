function storyToaster(selectedStory) {
	const activeToasters = {};

	const configButton = {
		text: "Tooltip with Mambo Button",
		parentTag: selectedStory.parentTag,
		onClick: () => {
			if (activeToasters["toaster-with-mambo-button"]) {
				activeToasters["toaster-with-mambo-button"].close();
				delete activeToasters["toaster-with-mambo-button"];

				return;
			}

			let toasterConfig = {
				parentTag: selectedStory.parentTag,
				closeButton: false,
				open: true,
				message: "Mambo Tooltip Successfully Completed",
				autoHideDuration: 5000,
				size: "large",
				type: "success",
				onClose: (context) => {
					context.Toaster.close();
					delete activeToasters["toaster-with-mambo-button"];
				},
				onComplete: (context) => {
					context.Toaster.getBodyTag().innerHTML = `
									<div style="display: flex; align-items: start; flex-direction: column;">
										<span style="font-size: var(--m-font-size-m);"> Titulo: </span>
										<span>Mambo Toaster + Mambo Button</span>
									</div>
									<mambo-button style="padding-left: 1rem; pointer-events: auto;" id='btn-undo-mambo-button'></mambo-button>`;
					const buttonUndo = document.getElementById("btn-undo-mambo-button");
					const timeOut = setTimeout(() => {
						context.Toaster.close();
						delete activeToasters["toaster-with-mambo-button"];
					}, context.Toaster.autoHideDuration());
					buttonUndo.setup({
						text: "Cancel",
						type: "secondary",
						size: "small",
						onClick: () => {
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

	const normalVariants = [{ h: "center", v: "top", type: "success", size: "medium", animation: "top-bottom" }];

	const persistentVariants = [
		{ h: "left", v: "top", type: "info", size: "small", animation: "top-bottom" },
		{ h: "center", v: "top", type: "success", size: "medium", animation: "top-bottom" },
		{ h: "right", v: "top", type: "error", size: "large", animation: "top-bottom" },
		{ h: "left", v: "center", type: "warning", size: "small", animation: "top-bottom" },
		{ h: "center", v: "center", type: "info", size: "medium", animation: "top-bottom" },
		{ h: "right", v: "center", type: "success", size: "large", animation: "top-bottom" },
		{ h: "left", v: "bottom", type: "error", size: "small", animation: "bottom-top" },
		{ h: "center", v: "bottom", type: "warning", size: "medium", animation: "bottom-top" },
		{ h: "right", v: "bottom", type: "success", size: "large", animation: "bottom-top" },
	];

	normalVariants.forEach((variant) => {
		const config = {
			text: `Toaster ${variant.h}-${variant.v}`,
			parentTag: selectedStory.parentTag,
			onClick: () => {
				if (activeToasters[`${variant.h}-${variant.v}`]) {
					activeToasters[`${variant.h}-${variant.v}`].close();
					delete activeToasters[`${variant.h}-${variant.v}`];

					return;
				}

				let toasterConfig = {
					closeButton: true,
					anchorOrigin: { horizontal: variant.h, vertical: variant.v },
					message:
						variant.size === "small"
							? `<div style="display: flex; flex-direction: column;">
	 						   <span style="font-size: 0.85rem; font-weight: 400;">Toaster: ${variant.h}-${variant.v}</span>
	 						    </div>`
							: `<div style="display: flex; flex-direction: column;">
	 							 <span style="font-size: 1rem; font-weight: 600;">Title:</span>
	 							 <span style="font-size: 0.85rem; font-weight: 400;">toaster: ${variant.h}-${variant.v}</span>
	 						    </div>`,
					autoHideDuration: 1000,
					type: variant.type,
					size: variant.size,
					animation: { name: variant.animation },
					persist: false,
					onClose: (context) => {
						context.Toaster.close();
						delete activeToasters[`${variant.h}-${variant.v}`];
					},
					onComplete: (context) => {
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

	let toasterInstance = null;
	let currentTimeout = null;

	const createToaster = (context) => {
		const baseConfig = {
			message: `<div style="display: flex; flex-direction: column;">
								<span style="font-size: 0.85rem; font-weight: 400;">Persistent Toaster Created!</span>
								</div>`,
			closeButton: true,
			autoHideDuration: 1000,
			open: context.open,
			persist: true,
			distance: { y: "1rem", x: "0rem" },
			onClose: (context) => {
				context.Toaster.close();

				if (currentTimeout) {
					clearTimeout(currentTimeout);
					currentTimeout = null;
				}
			},
			onComplete: (context) => {
				currentTimeout = setTimeout(() => {
					context.Toaster.close();
					currentTimeout = null;
				}, context.Toaster.autoHideDuration());
			},
		};

		toasterInstance = ui.toaster(baseConfig);
	};

	createToaster({ open: true });

	persistentVariants.forEach((variant) => {
		const buttonConfig = {
			text: `Persistent Toaster ${variant.h}-${variant.v}`,
			parentTag: selectedStory.parentTag,
			onClick: async () => {
				if (currentTimeout) {
					clearTimeout(currentTimeout);
					currentTimeout = null;
				}

				if (!toasterInstance) {
					createToaster();
				} else {
					const toasterConfig = {
						closeButton: true,
						anchorOrigin: { horizontal: variant.h, vertical: variant.v },
						message:
							variant.size === "small"
								? `<div style="display: flex; flex-direction: column;">
                           <span style="font-size: 0.85rem; font-weight: 400;">Toaster: ${variant.h}-${variant.v}</span>
                           </div>`
								: `<div style="display: flex; flex-direction: column;">
                             <span style="font-size: 1rem; font-weight: 600;">Title:</span>
                             <span style="font-size: 0.85rem; font-weight: 400;">toaster: ${variant.h}-${variant.v}</span>
                           </div>`,
						autoHideDuration: 1000,
						type: variant.type,
						size: variant.size,
						animation: { name: variant.animation },
						persist: true,
						onComplete: (context) => {
							currentTimeout = setTimeout(() => {
								context.Toaster.close();
								currentTimeout = null;
							}, context.Toaster.autoHideDuration());
						},
					};

					await toasterInstance.restart(toasterConfig);
				}
			},
		};

		ui.button(buttonConfig);
	});
}
