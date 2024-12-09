function storyDialog(selectedStory) {
	const buttonConfig1 = {
		text: "Open Dialog With Mambo Buttons",
		parentTag: selectedStory.parentTag,
		header: "Dialog Title",
		body: "<p style='padding:3em;'>Your Dialog content will go here</p>",
		footer: "<mambo-button></mambo-button>",
		onClick: () => {
			let dialogConfig = {
				title: "Dialog Title",
				closeButton: false,
				onComplete: (context) => {
					context.Dialog.getBodyTag().innerHTML = "<p style='padding:3em;'>Your Dialog content will go here</p>";
					context.Dialog.getFooterTag().innerHTML = `<div style='display:flex;gap:1em;'>
							<mambo-button id='btnCancel'></mambo-button>
							<mambo-button id='btnConfirm'></mambo-button>
						 </div>`;
					const buttonConfirm = document.getElementById("btnConfirm");
					const buttonCancel = document.getElementById("btnCancel");
					buttonCancel.setup({
						text: "Cancel",
						type: "primary",
						size: "small",
						icon: [
							{
								attr: {
									class: "fa-solid fa-xmark",
								},
							},
						],
						onClick: () => {
							context.Dialog.close();
						},
					});
					buttonConfirm.setup({
						text: "Confirm",
						type: "primary",
						size: "small",
						icon: [
							{
								attr: {
									class: "fa-solid fa-check",
								},
							},
						],
						onClick: () => {
							context.Dialog.close();
						},
					});
				},
			};

			ui.dialog(dialogConfig);
		},
	};

	ui.button(buttonConfig1);

	const buttonConfig2 = {
		text: "Open Dialog with Close Button",
		parentTag: selectedStory.parentTag,
		header: "Dialog Title",
		body: "<p style='padding:3em;'>Your Dialog content will go here</p>",
		footer: "<mambo-button></mambo-button>",
		onClick: () => {
			let dialogConfig = {
				title: "Dialog Title",
				onComplete: (context) => {
					context.Dialog.getBodyTag().innerHTML =
						"<p style='padding:3em; text-align: center;'>Your Dialog content will go here</p>";
					context.Dialog.getFooterTag().innerHTML = "Thank you for your attention";
				},
			};

			ui.dialog(dialogConfig);
		},
	};

	ui.button(buttonConfig2);
}
