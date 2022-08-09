//: Dialog
//@
demoDialog();

function demoDialog() {
	// Install button to trigger the dialog installation
	const buttonConfig = {
		parentTag: "storyboard-dialog",
		text: "Click to trigger Dialog instance",
		fnClick: () => {
			let dialogConfig = {
				title: "Dialog Title",
			};

			// Install Dialog window
			// First argument is the g_domJS. element where to install the Dialog. If null, the dialog will append into the BODY tag
			ui.dialog(null, dialogConfig, (context) => {
				dom.append(context.dialogContentTag, "<p style='padding:3em;'>Your Dialog content will go here</p>");
			});
		},
	};

	ui.button(buttonConfig);
}
//!
