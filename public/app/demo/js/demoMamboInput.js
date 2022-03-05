function demoInput(parentEle) {

    const m_demoGraphics = new DemoGraphics();

    let inputField;

    let inputConfig = {
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

    inputField = new MamboInput(parentEle, inputConfig);



    //adding an input field with images inside of it.
    inputConfig = {
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
                        src: m_demoGraphics.getImage("three-dots-icon-black"),
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
                        src: m_demoGraphics.getImage("three-dots-icon-black"),
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

    inputField = new MamboInput(parentEle, inputConfig);
}