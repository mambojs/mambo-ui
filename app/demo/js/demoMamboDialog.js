function demoDialog() {

    // Install button to trigger the dialog installation
    const buttonConfig = {
        parentTag: 'demo-dialog',
        text: 'Click to trigger Dialog instance',
        fnClick: () => {
            let dialogConfig = {
                title: 'Dialog Title'
            };

            // Install Dialog window
            // First argument is the g_domJS. element where to install the Dialog. If null, the dialog will append into the BODY tag
            new MamboDialog(null, dialogConfig, (context) => {
                g_domJS.append(context.dialogContentTag, "<p style='padding:3em;'>Your Dialog content will go here</p>");
            });
        }
    };

    new MamboButton(buttonConfig);

}
