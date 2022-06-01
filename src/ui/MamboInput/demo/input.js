//: Input
//@
demoInput("demo-input")

function demoInput(parentEle) {

    let inputField;

    let inputConfig = {
        parentTag: parentEle,
        value: "My Input Element Value",
        labelText: "Input Element Label",
        attr: {
            maxLength: 25
        },
        events: [{
            name: 'change',
            fn: (context) => {
                console.log(context.input.value());
            }
        }],
        fnDataValidationChange: (context) => {
            console.log(context.input);
        },
        fnComplete: (context) => {
            console.log(context.input);
        }
    };

    // Configure automatic field validation
    inputConfig.validate = {
        onStart: true,
        types: [{
            minLength: {
                len: 20,
                value: "-"// Character to use to fill in minimum length requirement
            }
        }]
    };
    inputConfig.maxLenWidthUnit = "ch";// Character based width style
    inputConfig.maxLenWidth = 30;// Width of the element
    inputConfig.maxLenWidthAdj = 2;// Adjust the width - helpful when the element width is set dynamically

    inputField = new ui.input(inputConfig);



    //adding an input field with images inside of it.
    inputConfig = {
        parentTag: parentEle,
        value: "My Input Element Value",
        labelText: "Input Element With Images",
        attr: {
            maxLength: 25
        },
        events: [{
            name: 'change',
            fn: (context) => {
                console.log(context.input.value());
            }
        }],
        fnDataValidationChange: (context) => {
            console.log(context.input);
        },
        fnComplete: (context) => {
            console.log(context.input);
        },
        leftSide: [
            {
                button:
                {
                    id: 1,
                    text: "B",
                    fnClick: (context) => {
                        alert(`Button id: ${context.button.getId()} clicked.`);
                    }
                }
            },
            {
                button:
                {
                    tag: "a",
                    id: 2,
                    text: "A",
                    fnClick: (context) => {
                        alert(`Button id: ${context.button.getId()} clicked.`);
                    }
                }

            },
            {
                img:
                {
                    attr: {
                        src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQwOHB4IiBoZWlnaHQ9IjQwOHB4IiB2aWV3Qm94PSIwIDAgNDA4IDQwOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDA4IDQwODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9Im1vcmUtdmVydCI+DQoJCTxwYXRoIGQ9Ik0yMDQsMTAyYzI4LjA1LDAsNTEtMjIuOTUsNTEtNTFTMjMyLjA1LDAsMjA0LDBzLTUxLDIyLjk1LTUxLDUxUzE3NS45NSwxMDIsMjA0LDEwMnogTTIwNCwxNTNjLTI4LjA1LDAtNTEsMjIuOTUtNTEsNTENCgkJCXMyMi45NSw1MSw1MSw1MXM1MS0yMi45NSw1MS01MVMyMzIuMDUsMTUzLDIwNCwxNTN6IE0yMDQsMzA2Yy0yOC4wNSwwLTUxLDIyLjk1LTUxLDUxczIyLjk1LDUxLDUxLDUxczUxLTIyLjk1LDUxLTUxDQoJCQlTMjMyLjA1LDMwNiwyMDQsMzA2eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K",
                    }
                }
            }
        ],
        rightSide: [
            {
                button:
                {
                    id: 3,
                    text: "B",
                    fnClick: (context) => {
                        const val = inputField.value();
                        // Execute whatever with the value
                    }
                }

            },
            {
                button:
                {
                    tag: "a",
                    id: 4,
                    text: "A",
                    fnClick: (context) => {
                        alert(`Button id: ${context.button.getId()} clicked.`);
                    }
                }
            },
            {
                img:
                {
                    attr: {
                        src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQwOHB4IiBoZWlnaHQ9IjQwOHB4IiB2aWV3Qm94PSIwIDAgNDA4IDQwOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDA4IDQwODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9Im1vcmUtdmVydCI+DQoJCTxwYXRoIGQ9Ik0yMDQsMTAyYzI4LjA1LDAsNTEtMjIuOTUsNTEtNTFTMjMyLjA1LDAsMjA0LDBzLTUxLDIyLjk1LTUxLDUxUzE3NS45NSwxMDIsMjA0LDEwMnogTTIwNCwxNTNjLTI4LjA1LDAtNTEsMjIuOTUtNTEsNTENCgkJCXMyMi45NSw1MSw1MSw1MXM1MS0yMi45NSw1MS01MVMyMzIuMDUsMTUzLDIwNCwxNTN6IE0yMDQsMzA2Yy0yOC4wNSwwLTUxLDIyLjk1LTUxLDUxczIyLjk1LDUxLDUxLDUxczUxLTIyLjk1LDUxLTUxDQoJCQlTMjMyLjA1LDMwNiwyMDQsMzA2eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K",
                    }
                }
            }
        ]
    };

    // Configure automatic field validation
    inputConfig.validate = {
        onStart: true,
        types: [{
            minLength: {
                len: 20,
                value: "-"// Character to use to fill in minimum length requirement
            }
        }]
    };
    inputConfig.maxLenWidthUnit = "ch";// Character based width style
    inputConfig.maxLenWidth = 30;// Width of the element
    inputConfig.maxLenWidthAdj = 2;// Adjust the width - helpful when the element width is set dynamically

    inputField = new ui.input(inputConfig);
}
//!