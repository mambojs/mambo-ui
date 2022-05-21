//: File Chooser
//@
demoFileChooser("demo-file-chooser")

function demoFileChooser(parentEle) {

    singleFile();
    multipleFiles();
    noLabel();
    buttonOnly();

    function singleFile() {
        const config = {
            textLabel: "Choose a single .txt file.",
            attr: {
                accept: ".txt"
            },
            fnUpload: handleFileSelection
        };
        new ui.fileChooser(parentEle, config);
    }

    function multipleFiles() {
        const config = {
            attr: {
                multiple: true
            },
            fnUpload: handleFileSelection
        };
        new ui.fileChooser(parentEle, config);
    }

    function noLabel() {
        const config = {
            textLabel: false,
            attr: {
                multiple: true
            },
            fnUpload: handleFileSelection
        };
        new ui.fileChooser(parentEle, config);
    }

    function buttonOnly() {
        const config = {
            buttonOnly: true,
            textButton: "Button-only Example",
            fnUpload: handleFileSelection
        };
        new ui.fileChooser(parentEle, config);
    }

    function handleFileSelection(context) {
        console.log(context.files);
    }

}
//!