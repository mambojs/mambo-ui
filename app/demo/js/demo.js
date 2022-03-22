/******************************************
 *  Copyright 2022 Alejandro Sebastian Scotti, Scotti Corp.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.

 *  Author : Alejandro Scotti
 *  Created On : Sat Feb 26 2022
 *  File : demo.js
 *******************************************/
function demo() {

    // Begin
    setup();

    /**
     * Begin setup
     */
    function setup() {
        loadHomeView();
    }

    function loadHomeView() {
        installDOM();
        installHomeButton();
        installTreeView();
    }

    function installDOM() {

        g_domJS.empty("app-body");
        const html = `
        <menu>
            <h5 class="title">Select the component that you would like demo.</h5>
            <ui-component-treeview></ui-component-treeview>
        </menu>
        <control></control>
        `;
        g_domJS.append("app-body", html);
    }

    /**
     * Install Home Button
     */
    function installHomeButton() {
        const parent = g_domJS.getTag("home-button");
        g_domJS.empty(parent);
        const config = {
            parentTag: parent,
            text: 'Home',
            fnClick: (context) => {
                demo();
                context.button.deselect();
            }
        };

        new MamboButton(config);
    }

    /**
     * Install Button Group
     */
    function installTreeView() {

        const components = [
            {
                text: "UI Components",
                items: [
                    { id: "button", text: "Button" },
                    { id: "button-group", text: "Button Group" },
                    { id: "input", text: "Input Field" },
                    { id: "dialog", text: "Dialog" },
                    { id: "slideout", text: "Slideout" },
                    { id: "file-chooser", text: "File Chooser" },
                    { id: "drag-drop", text: "Drag & Drop" },
                    { id: "html5-player", text: "HTML5 Player" },
                    { id: "grid", text: "Grid" },
                    { id: "grid-tile", text: "Grid (Tile)" },
                    { id: "tree-view", text: "TreeView" },
                    { id: "dropdown", text: "Dropdown" },
                    { id: "combobox", text: "Combobox" },
                    { id: "time-picker", text: "Time Picker" },
                    { id: "calendar", text: "Calendar" },
                    { id: "date-picker", text: "Date Picker" },
                    { id: "checkbox-radio", text: "Checkbox / Radio" },
                    { id: "checkbox-radio-group", text: "Checkbox / Radio Group" },
                    { id: "switch", text: "Switch" },
                    { id: "slider", text: "Slider" },
                    { id: "draggable", text: "Draggable" },
                    { id: "percentage", text: "Percentage" },
                    { id: "tab", text: "MamboTab" },
                    { id: "rating", text: "Rating" },
                    { id: "images", text: "Images" }
                ]
            },
            {
                text: "Non-UI Components",
                items: [
                    { id: "browser-router", text: "Browser Router" },
                    { id: "event-manager", text: "Event Manager" }
                ]
            }
        ];

        let treeViewConfig = {
            data: components,
            expanded: true,
            fnSelect: loadComponent
        };

        new MamboTreeView("ui-component-treeview", treeViewConfig);
    }

    function loadComponent(context) {
        if (!context.itemData.id) {
            context.ev.preventDefault();
            return;
        }

        let hdrText, eleName, codePath, componentParentTag;

        switch (context.itemData.id) {
            case "button":
                hdrText = "Button Component Demo";
                eleName = "demo-button";
                codePath = "demoMamboButton.js";
                installDOM();
                demoButton(componentParentTag);
                break;

            case "button-group":
                hdrText = "Button Group Component Demo";
                eleName = "demo-button-group";
                codePath = "demoMamboButtonGroup.js";
                installDOM();
                demoButtonGroup(componentParentTag);
                break;

            case "dialog":
                hdrText = "Dialog Component Demo";
                eleName = "demo-dialog";
                codePath = "demoMamboDialog.js";
                installDOM();
                demoDialog(componentParentTag);
                break;

            case "drag-drop":
                hdrText = "Drag & Drop Component Demo";
                eleName = "demo-drag-drop";
                codePath = "demoMamboDragDrop.js";
                installDOM();
                demoDragDrop(componentParentTag);
                break;

            case "grid":
                hdrText = "Grid Component Demo";
                eleName = "demo-grid";
                codePath = "demoMamboGrid.js";
                installDOM();
                demoGrid(componentParentTag);
                break;

            case "grid-tile":
                hdrText = "Grid Component Demo (Tile)";
                eleName = "demo-grid-tile";
                codePath = "demoMamboGridTile.js";
                installDOM();
                demoGridTile(componentParentTag);
                break;

            case "input":
                hdrText = "Input Component Demo";
                eleName = "demo-input";
                codePath = "demoMamboInput.js";
                installDOM();
                demoInput(componentParentTag);
                break;

            case "file-chooser":
                hdrText = "File Chooser Component Demo";
                eleName = "demo-file-chooser";
                codePath = "demoMamboFileChooser.js";
                installDOM();
                demoFileChooser(componentParentTag);
                break;

            case "slideout":
                hdrText = "Slideout Component Demo";
                eleName = "demo-slideout";
                codePath = "demoMamboSlideout.js";
                installDOM();
                demoSlideout(componentParentTag);
                break;

            case "tab":
                hdrText = "MamboTab Component Demo";
                eleName = "demo-mambo-tab";
                codePath = "demoMamboTab.js";
                installDOM();
                demoTab(componentParentTag);
                break;

            case "tree-view":
                hdrText = "TreeView Component Demo";
                eleName = "demo-tree-view";
                codePath = "demoMamboTreeView.js";
                installDOM();
                demoTreeView(componentParentTag);
                break;

            case "dropdown":
                hdrText = "Dropdown Component Demo";
                eleName = "demo-dropdown";
                codePath = "demoMamboDropdown.js";
                installDOM();
                demoDropdown(componentParentTag);
                break;

            case "combobox":
                hdrText = "Combobox Component Demo";
                eleName = "demo-combobox";
                codePath = "demoMamboCombobox.js";
                installDOM();
                demoComboBox(componentParentTag);
                break;

            case "time-picker":
                hdrText = "Time Picker Component Demo";
                eleName = "demo-time-picker";
                codePath = "demoMamboTimePicker.js";
                installDOM();
                demoTimePicker(componentParentTag);
                break;

            case "calendar":
                hdrText = "Calendar Component Demo";
                eleName = "demo-calendar";
                codePath = "demoMamboCalendar.js";
                installDOM();
                demoCalendar(componentParentTag);
                break;

            case "date-picker":
                hdrText = "Date Picker Component Demo";
                eleName = "demo-date-picker";
                codePath = "demoMamboDatePicker.js";
                installDOM();
                demoDatePicker(componentParentTag);
                break;

            case "checkbox-radio":
                hdrText = "Checkbox / Radio Component Demo";
                eleName = "demo-checkbox-radio";
                codePath = "demoMamboCheckboxRadio.js";
                installDOM();
                demoCheckboxRadio(componentParentTag);
                break;

            case "checkbox-radio-group":
                hdrText = "Checkbox / Radio Group Component Demo";
                eleName = "demo-checkbox-radio";
                codePath = "demoMamboCheckboxRadioGroup.js";
                installDOM();
                demoCheckboxRadioGroup(componentParentTag);
                break;

            case "switch":
                hdrText = "Switch Component Demo";
                eleName = "demo-switch";
                codePath = "demoMamboSwitch.js";
                installDOM();
                demoSwitch(componentParentTag);
                break;

            case "slider":
                hdrText = "Slider Component Demo";
                eleName = "demo-slider";
                codePath = "demoMamboSlider.js";
                installDOM();
                demoSlider(componentParentTag);
                break;

            case "draggable":
                hdrText = "Draggable Component Demo";
                eleName = "demo-draggable";
                codePath = "demoMamboDraggable.js";
                installDOM();
                demoDraggable(componentParentTag);
                break;

            case "percentage":
                hdrText = "Percentage Component Demo";
                eleName = "demo-percentage";
                codePath = "demoMamboPercentage.js";
                installDOM();
                demoPercentage(componentParentTag);
                break;

            case "rating":
                hdrText = "Rating Component Demo";
                eleName = "demo-rating";
                codePath = "demoMamboRating.js";
                installDOM();
                demoRating(componentParentTag);
                break;

            case "images":
                hdrText = "Images Component Demo";
                eleName = "demo-images";
                codePath = "demoMamboImages.js";
                installDOM();
                demoImages(componentParentTag);
                break;

            case "browser-router":
                hdrText = "Browser Router Component Demo";
                eleName = "demo-browser-router";
                codePath = "demoMamboHistoryManager.js";
                installDOM();
                demoBrowserRouter(componentParentTag);
                break;

            case "event-manager":
                hdrText = "Event Manager Component Demo";
                eleName = "demo-event-manager";
                codePath = "demoMamboEventManager.js";
                installDOM();
                demoEventManager();
                break;

            case "html5-player":
                hdrText = "HTML5 Player Component Demo";
                eleName = "demo-html5-player";
                codePath = "demoMamboPlayer.js";
                installDOM();
                demoHtml5player(componentParentTag);
                break;

        }

        function installDOM() {
            g_domJS.empty("control");
            g_domJS.append("control", g_domJS.createTag("h3", { class: "title", text: hdrText }));
            componentParentTag = g_domJS.createTag(eleName);
            g_domJS.append("control", componentParentTag);
        }

        outputCode(`app/demo/js/${codePath}`);
    }


    function outputCode(url) {
        g_API.getFile(url).then((file) => {
            const codeEle = g_domJS.createTag("code", { class: "prettyprint lang- basic", text: file });
            g_domJS.append("control", codeEle);
            PR.prettyPrint();
        }).catch(xhr => {
            console.log(xhr.responseText);
        });
    }

    const ROUTES = [
        {
            name: "Home",
            path: "/",
            alias: "/index.html",
            action: () => {
                const control = document.querySelector('control');
                control.innerHTML = "Home";
            }
        },
        {
            name: "Button",
            path: "/ui-components/button/",
            action: () => {
                g_domJS.empty("control");
                g_domJS.append("control", g_domJS.createTag("h3", { class: "title", text: "Button Component Demo" }));
                let componentParentTag = g_domJS.createTag("demo-button");
                g_domJS.append("control", componentParentTag);
                demoButton(componentParentTag);
                outputCode(`app/demo/js/demoMamboButton.js`);
            }
        },
        {
            name: "Not Found",
            path: "/not-found",
            notfound: true,
            action: () => {
                const control = document.querySelector('control');
                control.innerHTML = "404 Not Found";
            }
        }
    ];

    mambo.router.routes(ROUTES);

}