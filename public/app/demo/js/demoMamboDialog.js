function demoDialog() {

    // Install button to trigger the dialog installation
    const buttonConfig = {
        text: 'Click to trigger Dialog instance',
        fnClick: () => {
            let dialogConfig = {
                title: 'Dialog Title'
            };

            // Install Dialog window
            // First argument is the domJS. element where to install the Dialog. If null, the dialog will append into the BODY tag
            new MamboDialog(null, dialogConfig, (context) => {
                domJS.append(context.dialogContentTag, "<p style='padding:3em;'>Your Dialog content will go here</p>");
            });
        }
    };

    new MamboButton('demo-dialog', buttonConfig);

}
