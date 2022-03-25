function demoFormBuilder(parentEle) {

    const m_demoGraphics = new DemoGraphics();

    let mamboForm = g_domJS.createTag(`${parentEle.tagName.toLowerCase()}-first`, { class: "mambo-form" });

    g_domJS.append(parentEle, mamboForm);

    const data = [
        {
            input: "Your username",
            text: "User:",
            hidden: "hidden"
        },
        {
            input: "Your Password",
            text: "Password:",
            hidden: "hidden"
        }

    ];

    const columnsConfig = [ {
        id: "text",
        name: "Text",
        type: "text",
        dataKey: "text"
    }, {
        id: "input",
        name: "Input",
        type: "input",
        dataKey: "input",
        attr: {},
        rightSide: {
            button:
            {
                id: "input-clear",
                img:
                {
                    attr: {
                        src: m_demoGraphics.getImage("x-black"),
                    }
                },
                fnClick: (context) => {
                    // Callback from the button click
                }
            }

        },
        fnClick: (context) => {
            // Callback from the Input Button through the Input interface
            if (context.button.getId() === "input-clear") {
                context.input.clear();
            }
        }
    },
];

    let config = {
        data: data,
        columns: columnsConfig,
        maxColWidth: true,
        parentTag: mamboForm,
        fnPostRow: handleGridPostRow,
        fnComplete: (context) => {
            // // Execute when grid installation is complete
            // console.log(context.grid.getCellComponentsById());
            // console.log(context.grid.getCellComponentsByColNbr());
        }
    };

    new MamboFormBuilder(config);

    function handleGridPostRow(context) {
        // Callback executed every time a new row has completed installing
    }

    function handleButtonClick(context) {
        // Click fn handler example
        alert('Button Clicked');
    }

   
}
