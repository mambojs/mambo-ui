function storyToaster(selectedStory) {
	const activeToasters = {
		closeIfExists: function (toasterId) {
			if (this[toasterId]) {
				this[toasterId].close();
				delete this[toasterId];

				return true;
			}

			return false;
		},
	};

	const configButton = {
		text: "Tooltip with Mambo Button",
		parentTag: selectedStory.parentTag,
		onClick: () => {
			if (activeToasters.closeIfExists("toaster-with-mambo-button")) {
				return;
			}

			let toasterConfig = {
				parentTag: selectedStory.parentTag,
				closeButton: false,
				open: true,
				message: "Mambo Tooltip Successfully Completed",
				size: "large",
				type: "success",
				onClosed: (context) => {
					if (activeToasters["toaster-with-mambo-button"]) {
						delete activeToasters["toaster-with-mambo-button"];
					}
				},
				onComplete: (context) => {
					context.Toaster.getBodyTag().innerHTML = `
									<div style="display: flex; align-items: start; flex-direction: column;">
										<span style="font-size: var(--m-font-size-m);"> Titulo: </span>
										<span>Mambo Toaster + Mambo Button</span>
									</div>
									<mambo-button style="padding-left: 1rem; pointer-events: auto;" id='btn-undo-mambo-button'></mambo-button>`;
					const buttonUndo = document.getElementById("btn-undo-mambo-button");
					let timeout = null;

					if (!toasterConfig.autoHideDuration) {
						timeout = setTimeout(() => {
							context.Toaster.close();
						}, 1500);
					}

					buttonUndo.setup({
						text: "Cancel",
						type: "secondary",
						size: "small",
						onClick: () => {
							if (!toasterConfig.autoHideDuration) {
								clearTimeout(timeout);
								timeout = null;
							}

							context.Toaster.close();

							if (activeToasters["toaster-with-mambo-button"]) {
								delete activeToasters["toaster-with-mambo-button"];
							}
						},
					});
				},
			};

			activeToasters["toaster-with-mambo-button"] = ui.toaster(toasterConfig);
		},
	};

	ui.button(configButton);

	const normalVariants = [
		{
			h: "center",
			v: "top",
			type: "success",
			size: "medium",
			animation: "top-bottom",
			autoHideDuration: 1500,
		},
	];

	const persistentVariants = [
		{ h: "left", v: "top", type: "info", size: "small", animation: "top-bottom", autoHideDuration: 1500 },
		{ h: "right", v: "top", type: "error", size: "large", animation: "top-bottom", autoHideDuration: 1500 },
		{ h: "left", v: "center", type: "warning", size: "small", animation: "top-bottom", autoHideDuration: 1500 },
		{ h: "center", v: "center", type: "info", size: "medium", animation: "top-bottom", autoHideDuration: 1500 },
		{ h: "right", v: "center", type: "success", size: "large", animation: "top-bottom", autoHideDuration: 1500 },
		{ h: "left", v: "bottom", type: "error", size: "small", animation: "bottom-top", autoHideDuration: 1500 },
		{ h: "center", v: "bottom", type: "warning", size: "medium", animation: "bottom-top", autoHideDuration: 1500 },
		{ h: "right", v: "bottom", type: "success", size: "large", animation: "bottom-top", autoHideDuration: 1500 },
	];

	normalVariants.forEach((variant) => {
		const config = {
			text: `Toaster ${variant.h}-${variant.v}`,
			parentTag: selectedStory.parentTag,
			onClick: () => {
				if (activeToasters.closeIfExists(`${variant.h}-${variant.v}`)) {
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
					autoHideDuration: variant.autoHideDuration,
					type: variant.type,
					size: variant.size,
					animation: { name: variant.animation },
					persist: false,
					onClose: (context) => {
						context.Toaster.close();
						console.log("Toaster Button Close");
						delete activeToasters[`${variant.h}-${variant.v}`];
					},
					onComplete: (context) => {},
					onClosed: (context) => {
						console.log("Toaster Closed");
						delete activeToasters[`${variant.h}-${variant.v}`];
					},
				};

				activeToasters[`${variant.h}-${variant.v}`] = ui.toaster(toasterConfig);
			},
		};

		ui.button(config);
	});

	let toasterInstance = null;
	let timeout = null;

	const createToaster = (context) => {
		const baseConfig = {
			message: `<div style="display: flex; flex-direction: column;">
								<span style="font-size: 0.85rem; font-weight: 400;">Persistent Toaster Created!</span>
								</div>`,
			closeButton: true,
			autoHideDuration: 500,
			open: context.open,
			persist: true,
			distance: { y: "1rem", x: "0rem" },
			onClose: (context) => {
				console.log("Toaster Button Close");
				context.Toaster.close();
			},
			onComplete: (context) => {},
			onClosed: (context) => {
				console.log("Toaster Closed");
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
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}

				if (!toasterInstance) {
					createToaster();
				} else {
					if (activeToasters.closeIfExists(`${variant.h}-${variant.v}`)) {
						return;
					}

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
						autoHideDuration: variant.autoHideDuration,
						type: variant.type,
						size: variant.size,
						animation: { name: variant.animation },
						persist: true,
						onComplete: (context) => {},
						onClosed: (context) => {
							console.log("Toaster Closed");
							delete activeToasters[`${variant.h}-${variant.v}`];
						},
						onClose: (context) => {
							console.log("Button Clicked");
							context.Toaster.close();
						},
					};

					activeToasters[`${variant.h}-${variant.v}`] = await toasterInstance.restart(toasterConfig);
				}
			},
		};

		ui.button(buttonConfig);
	});
}
