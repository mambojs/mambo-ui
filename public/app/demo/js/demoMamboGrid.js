function demoGrid(parentEle) {

    const m_demoGraphics = new DemoGraphics();

    let firstGrid = domJS.createTag(`${parentEle.tagName.toLowerCase()}-first`, { class: "first-grid" });
    let secondGrid = domJS.createTag(`${parentEle.tagName.toLowerCase()}-second`, { class: "second-grid" });

    domJS.append(parentEle, firstGrid);
    domJS.append(parentEle, secondGrid);

    //First Grid
    const data = [
        {
            input: "Red",
            text: "Green",
            hidden: "hidden"
        }, {
            input: "Purple",
            text: "Brown",
            hidden: "hidden"
        }
    ];

    const columnsConfig = [{
        id: "button",
        name: "Button",
        type: "button",
        attr: {
            type: "button"
        },
        text: "Open",
        img: {
            attr: {
                src: m_demoGraphics.getImage("arrow-up-circle"),
                alt: "Open"
            }
        },
        fnClick: handleButtonClick
    }, {
        id: "",
        name: "Button Group",
        type: "button-group",
        buttons: [{
            id: 1,
            text: "1"
        }, {
            id: 2,
            text: "2"
        }, {
            id: 3,
            tag: "a",
            text: "3",
            attr: {
                href: "#"
            }
        }],
        fnClick: handleButtonClick
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
    }, {
        id: "text",
        name: "Text",
        type: "text",
        dataKey: "text"
    }, {
        id: "hidden",
        name: "Hidden",
        type: "text",
        dataKey: "hidden",
        hide: true
    }, {
        id: "fileChooser",
        name: "File Chooser",
        type: "file-chooser",
        fnUpload: (context) => {
            console.log(context.files, context.ev);
        }
    }, {
        id: "dialog",
        name: "Dialog",
        type: "dialog",
        img: {
            attr: {
                src: m_demoGraphics.getImage("popup"),
                alt: "More"
            }
        },
        fnOpen: (context) => {
            // Callback when the dialog is opened
            domJS.append(context.dialogContentTag, "<p style='padding:3em;'>Your Dialog content will go here</p>");
        },
        fnClose: (context) => {
            // Callback when the dialog is closed
        }
    }, {
        id: "slideout",
        name: "Slideout",
        type: "slideout",
        text: null,
        img: {
            attr: {
                src: m_demoGraphics.getImage("hamburger-drawer-black"),
                alt: "Open Drawer Slideout"
            }
        },
        fnInstallContent: (context) => {
            // Get the slideout content, header and body tags
            // Insert your own HTML content
            // You can replace the entire contents of the slideout area
            const contentTag = context.slideout.getContentTag();

            // Insert Header content
            const headerTag = context.slideout.getHeaderTag();
            domJS.append(headerTag, "<h3>My Header Content</h3>");

            // Insert Body content
            const bodyTag = context.slideout.getBodyTag();
            domJS.append(bodyTag, "<p style='padding:1em;'>Here goes your content</p>");
        }
    }, {
        id: "dragDrop",
        type: "drag-drop",
        name: "Drag & Drop",
        dropText: "Drop Files",
        fnDrop: (context) => {
            console.log(context.dataTransfer.files);
        }
    }];

    let config = {
        data: data,
        columns: columnsConfig,
        maxColWidth: true,
        fnPostRow: handleGridPostRow,
        fnComplete: (context) => {
            // Execute when grid installation is complete
            console.log(context.grid.getCellComponentsById());
            console.log(context.grid.getCellComponentsByColNbr());
        }
    };

    new MamboGrid(firstGrid, config);

    function handleGridPostRow(context) {
        // Callback executed every time a new row has completed installing
    }

    function handleButtonClick(context) {
        // Click fn handler example
        alert('Button Clicked');
    }

    //Second Grid
    const data2 = [
        {}
    ];

    const columnsConfig2 = [{
        id: "treeView",
        name: "Tree View",
        type: "tree-view",
        style: {
            'min-width': '150px',
            'width': '150px',
            'max-width': '150px'
        },
        data: [
            {
                text: "Item 1",
                items: [
                    { text: "Item 1-1" },
                    { text: "Item 1-2" },
                    {
                        text: "Item 1-3",
                        items: [
                            { text: "Item 1-3-1" },
                            { text: "Item 1-3-2" }
                        ]
                    }
                ]
            },
            {
                text: "Item 2",
                items: [
                    { text: "Item 2-1" },
                    { text: "Item 2-2" }
                ]
            }
        ],
        fnSelect: (context) => {
            console.log(context.itemData);
        }
    }, {
        id: "dropdown",
        name: "Dropdown",
        type: "dropdown",
        style: {
            'min-width': '130px',
            'width': '130px',
            'max-width': '130px'
        },
        fnComplete: (context) => {
            const contentTag = context.dropdown.getContentTag();
            domJS.append(contentTag, "<p style='padding:1em;'>Here goes your content</p>");
        }
    }, {
        id: "combobox",
        name: "Combobox",
        type: "combobox",
        style: {
            'min-width': '130px',
            'width': '130px',
            'max-width': '130px'
        },
        data: [
            { text: "Item 1", id: "1" },
            { text: "Item 2", id: "2" },
            { text: "Item 3", id: "3" },
            { text: "Item 4", id: "4" }
        ],
        fnSelect: (context) => {
            console.log(context.combobox.value());
        }
    }, {
        id: "timePicker",
        name: "Time Picker",
        type: "time-picker",
        style: {
            'min-width': '130px',
            'width': '130px',
            'max-width': '130px'
        },
        fnSelect: (context) => {
            console.log(context.timePicker.value());
        }
    }, {
        id: "datePicker",
        name: "Date Picker",
        type: "date-picker",
        style: {
            'min-width': '130px',
            'width': '130px',
            'max-width': '130px'
        },
        fnSelect: (context) => {
            console.log(context.datePicker.value());
        }
    }];

    let config2 = {
        data: data2,
        columns: columnsConfig2,
        maxColWidth: true,
        fnComplete: (context) => {
            // Execute when grid installation is complete
            console.log(context.grid.getCellComponentsById());
            console.log(context.grid.getCellComponentsByColNbr());
        }
    };

    new MamboGrid(secondGrid, config2);
}
