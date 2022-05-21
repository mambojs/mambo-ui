//: Grid
//@
demoGrid("demo-grid")

function demoGrid(parentEle) {

    let firstGrid = dom.createTag(`${parentEle.tagName.toLowerCase()}-first`, {
        class: "first-grid"
    });
    let secondGrid = dom.createTag(`${parentEle.tagName.toLowerCase()}-second`, {
        class: "second-grid"
    });

    dom.append(parentEle, firstGrid);
    dom.append(parentEle, secondGrid);

    //First Grid
    const data = [{
        input: "Red",
        text: "Green",
        hidden: "hidden"
    }, {
        input: "Purple",
        text: "Brown",
        hidden: "hidden"
    }];

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
                src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAwIDEwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPG1ldGFkYXRhPiBTdmcgVmVjdG9yIEljb25zIDogaHR0cDovL3d3dy5vbmxpbmV3ZWJmb250cy5jb20vaWNvbiA8L21ldGFkYXRhPg0KPGc+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNTEyLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSI+PHBhdGggZD0iTTQ3MzIuMyw1MDEzLjlDMzEwNi42LDQ5MjUuNywxNjEzLjIsNDAxNyw3NzcuNCwyNjA0LjFjLTkzNy41LTE1ODMuNS04OTkuMS0zNTgzLDk3LjgtNTEzMC4xYzE4Ny45LTI5MS40LDM5MS4xLTU0MC42LDY2NS4yLTgxNC44YzIxMzkuNS0yMTQ1LjIsNTY2NS0xODU1LjcsNzQ0NCw2MDkuNmMxMTI5LjIsMTU2Mi40LDEyMjEuMiwzNjc1LDIzNS44LDUzMzkuMWMtNDEyLjIsNjk3LjgtMTAzMy4zLDEzMTktMTczMS4xLDE3MzEuMUM2NjYwLjksNDgyOS44LDU2OTQuNyw1MDY3LjUsNDczMi4zLDUwMTMuOXogTTU1ODEuNiw0NjEzLjJDNzM0Ny4yLDQ0MDQuMiw4ODU0LDMxMDQuNSw5MzYyLDEzNTYuMWMxMTUtNDAwLjcsMTY0LjktNzc0LjUsMTY0LjktMTIzNi41YzAtNzI4LjUtMTQxLjktMTM0Ny43LTQ2Mi0yMDAzLjNjLTcxMS4yLTE0NTMuMS0yMTc3LjgtMjQyNS4xLTM3OTUuOC0yNTE5Yy0xNjk2LjYtOTcuOC0zMjc2LjMsNzM4LjEtNDE2MC4xLDIyMDIuN0M4MDAuNC0xNjg4LjIsNTgzLjgtMTA2OSw1MDUuMi00NjUuMWMtNDAuMywzMTAuNi00MC4zLDg1MS4yLDAsMTE2OS40YzIzNS44LDE4MjcsMTU3MiwzMzM3LjYsMzM2OC4zLDM4MDUuNEM0NDE5LjgsNDY1MS41LDQ5NzAsNDY4Niw1NTgxLjYsNDYxMy4yeiIvPjxwYXRoIGQ9Ik0zNzM1LjQsNDM1LjljLTExNzcuMS0xMTc3LjEtMTE3OS0xMTc3LjEtMTE3OS0xMjU3LjZjMC02NS4yLDExLjUtODguMiw2NS4yLTEzNi4xYzEzMC40LTExNi45LDc4LjYtMTU5LjEsMTI5MC4yLDEwNTIuNWwxMDg4LjksMTA4OC45TDYwOTMuNCw5MC44QzcxNjguOS05ODQuNyw3MTg2LjItMTAwMS45LDcyNjAuOS0xMDAxLjljMTM4LDAsMjI4LjEsMTM4LDE2Ni44LDI1My4xYy0xNS4zLDI4LjgtNTQ4LjMsNTczLjItMTE4NC43LDEyMDkuN0w1MDg3LDE2MTQuOWgtODYuM2gtODYuM0wzNzM1LjQsNDM1Ljl6Ii8+PC9nPjwvZz4NCjwvc3ZnPg==",
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
            button: {
                id: "input-clear",
                img: {
                    attr: {
                        src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAwIDEwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPG1ldGFkYXRhPiBTdmcgVmVjdG9yIEljb25zIDogaHR0cDovL3d3dy5vbmxpbmV3ZWJmb250cy5jb20vaWNvbiA8L21ldGFkYXRhPg0KPGc+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNTEyLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSI+PHBhdGggZD0iTTYzMC4yLDQ0ODkuOEwxMDAsMzk1Ny43bDE5MTcuOS0xOTE3LjlMMzkzNy43LDEyMEwyMDE3LjktMTc5OS44TDEwMC0zNzE3LjdsNTMwLjItNTMyLjFsNTMyLjEtNTMwLjJsMTkxNy45LDE5MTcuOUw1MDAwLTk0Mi4zbDE5MTkuOC0xOTE5LjhMODgzNy43LTQ3ODBsNTMyLjEsNTMwLjJsNTMwLjIsNTMyLjFMNzk4Mi4xLTE3OTkuOEw2MDYyLjMsMTIwbDE5MTkuOCwxOTE5LjhMOTkwMCwzOTU3LjdsLTUzMC4yLDUzMi4xTDg4MzcuNyw1MDIwTDY5MTkuOCwzMTAyLjFMNTAwMCwxMTgyLjNMMzA4MC4yLDMxMDIuMUwxMTYyLjMsNTAyMEw2MzAuMiw0NDg5Ljh6Ii8+PC9nPjwvZz4NCjwvc3ZnPg==",
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
                src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAwIDEwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPG1ldGFkYXRhPiBTdmcgVmVjdG9yIEljb25zIDogaHR0cDovL3d3dy5vbmxpbmV3ZWJmb250cy5jb20vaWNvbiA8L21ldGFkYXRhPg0KPGc+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNTExLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSI+PHBhdGggZD0iTTI1NjIsMTM0MXYtMzY2OWgzNjY5aDM2Njl2MzY2OXYzNjY5SDYyMzFIMjU2MlYxMzQxeiBNOTQ5My43LDEzNDF2LTMyNjIuN0g2MjMxSDI5NjguM1YxMzQxdjMyNjIuN0g2MjMxaDMyNjIuN1YxMzQxeiIvPjxwYXRoIGQ9Ik02MjE5LDM5OTQuMVYzNzkxaDEwODAuNGgxMDgyLjhMNjQ3MCwxODc4LjhMNDU1Ny44LTMzLjRsMTQzLjQtMTQzLjRsMTQzLjQtMTQzLjRsMTkwNSwxOTA1bDE5MDcuNCwxOTA3LjRsNC44LTEwNzUuNkw4NjY5LDEzNDFsMTk4LjQtNy4ybDE5Ni03LjJsMi40LDEyMS45YzAsNjQuNSwwLDY3NC4xLDAsMTM1MC41czAsMTI2OS4yLDAsMTMxNC42bC0yLjQsODMuN0g3NjQxLjJINjIxOVYzOTk0LjF6Ii8+PHBhdGggZD0iTTEwMCwyMTQxLjd2LTQwNi4zaDIwMy4yaDIwMy4ydjIwMy4ydjIwMy4yaDIwMy4yaDIwMy4ydjIwMy4yVjI1NDhINTA2LjNIMTAwVjIxNDEuN3oiLz48cGF0aCBkPSJNMTMyMy44LDIzNTJsNy4yLTE5OC40aDQwNi4zaDQwNi4zbDcuMiwxOTguNGw3LjIsMTk2aC00MjAuN2gtNDIwLjdMMTMyMy44LDIzNTJ6Ii8+PHBhdGggZD0iTTEwMCw5MjIuN1Y1MTYuM2gyMDMuMmgyMDMuMnY0MDYuM1YxMzI5SDMwMy4ySDEwMFY5MjIuN3oiLz48cGF0aCBkPSJNMTAwLTI5Ni4zdi00MDYuM2gyMDMuMmgyMDMuMnY0MDYuM1YxMTBIMzAzLjJIMTAwVi0yOTYuM3oiLz48cGF0aCBkPSJNMTAwLTE1MTUuNHYtNDA2LjNoMjAzLjJoMjAzLjJ2NDA2LjN2NDA2LjNIMzAzLjJIMTAwVi0xNTE1LjR6Ii8+PHBhdGggZD0iTTExNi43LTIzNDQuOGMtOS42LTcuMi0xNi43LTI4Ni44LTE2LjctNjIxLjVWLTM1NzFoMjAzLjJoMjAzLjJ2NjIxLjV2NjIxLjVIMzE5LjlDMjE3LjEtMjMyOCwxMjMuOS0yMzM1LjIsMTE2LjctMjM0NC44eiIvPjxwYXRoIGQ9Ik03MDQxLjMtMjc2NS41Yy00LjgtMTYuNy03LjItMjAzLjItNC44LTQxMS4xbDcuMi0zODIuNGwxOTguNC03LjJsMTk2LTcuMnY0MjAuN3Y0MTguM2gtMTkxLjJDNzExMC42LTI3MzQuNCw3MDUwLjgtMjc0NCw3MDQxLjMtMjc2NS41eiIvPjxwYXRoIGQ9Ik0xMDAtNDM4My43Vi00NzkwaDQwNi4zaDQwNi4zdjIwMy4ydjIwMy4ySDcwOS41SDUwNi4zdjIwMy4ydjIwMy4ySDMwMy4ySDEwMFYtNDM4My43eiIvPjxwYXRoIGQ9Ik03MDMxLjctNDE4MC41di0yMDMuMmgtMjAzLjJoLTIwMy4ydi0yMDMuMlYtNDc5MGg0MDYuM0g3NDM4djQwNi4zdjQwNi4zaC0yMDMuMmgtMjAzLjJWLTQxODAuNXoiLz48cGF0aCBkPSJNMTMyMy44LTQ1NzkuN2w3LjItMTk4LjRoNjA5LjVIMjU1MGw3LjIsMTk4LjRsNy4yLDE5NmgtNjIzLjloLTYyMy45TDEzMjMuOC00NTc5Ljd6Ii8+PHBhdGggZD0iTTI5NjguMy00NTg2LjhWLTQ3OTBoNDA2LjNIMzc4MXYyMDMuMnYyMDMuMmgtNDA2LjNoLTQwNi4zVi00NTg2Ljh6Ii8+PHBhdGggZD0iTTQxODcuMy00NTg2LjhWLTQ3OTBoNDA2LjNINTAwMHYyMDMuMnYyMDMuMmgtNDA2LjNoLTQwNi4zVi00NTg2Ljh6Ii8+PHBhdGggZD0iTTU0MDYuMy00NTg2LjhWLTQ3OTBoNDA2LjNINjIxOXYyMDMuMnYyMDMuMmgtNDA2LjNoLTQwNi4zVi00NTg2Ljh6Ii8+PC9nPjwvZz4NCjwvc3ZnPg==",
                alt: "More"
            }
        },
        fnOpen: (context) => {
            // Callback when the dialog is opened
            dom.append(context.dialogContentTag, "<p style='padding:3em;'>Your Dialog content will go here</p>");
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
                src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gU3ZnIFZlY3RvciBJY29ucyA6IGh0dHA6Ly93d3cub25saW5ld2ViZm9udHMuY29tL2ljb24gLS0+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAwIDEwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPG1ldGFkYXRhPiBTdmcgVmVjdG9yIEljb25zIDogaHR0cDovL3d3dy5vbmxpbmV3ZWJmb250cy5jb20vaWNvbiA8L21ldGFkYXRhPg0KPGc+PHBhdGggZD0iTTU2LjcsMTUwaDg4Ni43YzI1LjgsMCw0Ni43LTIwLjksNDYuNy00Ni43YzAtMjUuOC0yMC45LTQ2LjctNDYuNy00Ni43SDU2LjdDMzAuOSw1Ni43LDEwLDc3LjYsMTAsMTAzLjNDMTAsMTI5LjEsMzAuOSwxNTAsNTYuNywxNTB6IE05NDMuMyw0NTMuM0g1Ni43QzMwLjksNDUzLjMsMTAsNDc0LjIsMTAsNTAwYzAsMjUuOCwyMC45LDQ2LjcsNDYuNyw0Ni43aDg4Ni43YzI1LjgsMCw0Ni43LTIwLjksNDYuNy00Ni43Qzk5MCw0NzQuMiw5NjkuMSw0NTMuMyw5NDMuMyw0NTMuM3ogTTk0My4zLDg1MEg1Ni43QzMwLjksODUwLDEwLDg3MC45LDEwLDg5Ni43czIwLjksNDYuNyw0Ni43LDQ2LjdoODg2LjdjMjUuOCwwLDQ2LjctMjAuOSw0Ni43LTQ2LjdTOTY5LjEsODUwLDk0My4zLDg1MHoiLz48L2c+DQo8L3N2Zz4=",
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
            dom.append(headerTag, "<h3>My Header Content</h3>");

            // Insert Body content
            const bodyTag = context.slideout.getBodyTag();
            dom.append(bodyTag, "<p style='padding:1em;'>Here goes your content</p>");
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
        },
        parentTag: firstGrid
    };

    new ui.grid(config);

    function handleGridPostRow(context) {
        // Callback executed every time a new row has completed installing
    }

    function handleButtonClick(context) {
        // Click fn handler example
        alert('Button Clicked');
    }

    //Second Grid
    const data2 = [{}];

    const columnsConfig2 = [{
        id: "treeView",
        name: "Tree View",
        type: "tree-view",
        style: {
            'min-width': '150px',
            'width': '150px',
            'max-width': '150px'
        },
        data: [{
                text: "Item 1",
                items: [{
                        text: "Item 1-1"
                    },
                    {
                        text: "Item 1-2"
                    },
                    {
                        text: "Item 1-3",
                        items: [{
                                text: "Item 1-3-1"
                            },
                            {
                                text: "Item 1-3-2"
                            }
                        ]
                    }
                ]
            },
            {
                text: "Item 2",
                items: [{
                        text: "Item 2-1"
                    },
                    {
                        text: "Item 2-2"
                    }
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
            dom.append(contentTag, "<p style='padding:1em;'>Here goes your content</p>");
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
        data: [{
                text: "Item 1",
                id: "1"
            },
            {
                text: "Item 2",
                id: "2"
            },
            {
                text: "Item 3",
                id: "3"
            },
            {
                text: "Item 4",
                id: "4"
            }
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
        },
        parentTag: secondGrid
    };

    new ui.grid(config2);
}
//!