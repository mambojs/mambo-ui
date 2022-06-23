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
            parentTag: parentEle,
            textLabel: "Choose a single .txt file.",
            attr: {
                accept: ".txt"
            },
            fnUpload: handleFileSelection
        };
        new ui.fileChooser(config);
    }

    function multipleFiles() {
        const config = {
            parentTag: parentEle,
            attr: {
                multiple: true
            },
            fnUpload: handleFileSelection
        };
        new ui.fileChooser(config);
    }

    function noLabel() {
        const config = {
            parentTag: parentEle,
            textLabel: false,
            attr: {
                multiple: true
            },
            fnUpload: handleFileSelection
        };
        new ui.fileChooser(config);
    }

    function buttonOnly() {
        const config = {
            parentTag: parentEle,
            buttonOnly: true,
            textButton: "Button-only Example",
            fnUpload: handleFileSelection
        };
        new ui.fileChooser(config);
    }

    function handleFileSelection(context) {
        console.log(context.files);
    }

}
//!