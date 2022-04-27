//: Test Code
//@
function demoButton(eleName) {
    const config = {
        parentTag: eleName,
        id: 1,
        text: "Single button",
        fnClick: (context) => {
            console.log(context)
        }
    };
    new ui.button(config);
}

demoButton('demo-button');
//!