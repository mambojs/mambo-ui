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
 *  File : MamboCombobox.js
 *******************************************/
function MamboCombobox(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error(`ComboBox: parentTag parameter was not passed in.`);
        return;
    }

    if (!options.data) {
        console.error(`ComboBox: Data option was not passed in.`);
        return;
    }

    const self = this;
    const m_utils = g_mamboObjMgr.get("MamboUtilities");
    const m_string = g_mamboObjMgr.get("MamboString");

    // HTML tag variables
    let m_parentTag;
    let m_comboBoxParentTag;
    let m_input;
    let m_dropdownWrapperTag;
    let m_dropdown;
    let m_buttonGroup;

    let m_config;
    let m_comboBoxData = options.data;
    let m_value = "";
    let m_previous_text = "";

    // Configure public methods
    this.destroy = destroyComboBox;
    this.getParentTag = () => m_comboBoxParentTag;
    this.getSelected = () => m_buttonGroup.getSelected();
    this.value = value;

    // Config default values
    configure();

    // Begin setup
    setup();

    function setup() {
        m_parentTag = domJS.getTag(parentTag);

        if (!m_parentTag) {
            console.error(`ComboBox: domJS. parent tag ${parentTag} was not found.`);
            return;
        }

        installDOM();
    }

    function installDOM() {
        m_comboBoxParentTag = domJS.createTag(m_config.tag.parent, { class: m_config.css.parent });

        m_parentTag.innerHTML = '';
        domJS.append(m_parentTag, m_comboBoxParentTag);

        installInput();
        installDropdown();

        finishSetup();
    }

    function installInput() {
        let input = m_utils.extend(true, {}, m_config.input);
        input.css = m_utils.extend(true, m_config.css.input, input.css);

        m_input = new MamboInput(m_comboBoxParentTag, input);
    }

    function installDropdown() {
        //create the wrapper div container for the input
        m_dropdownWrapperTag = domJS.createTag("div", { class: m_config.css.dropdownWrapper });
        domJS.append(m_comboBoxParentTag, m_dropdownWrapperTag);

        let dropdown = m_utils.extend(true, {}, m_config.dropdown);
        dropdown.css = m_utils.extend(true, m_config.css.dropdown, dropdown.css);

        dropdown.fnBeforeClose = (context) => {
            const result = m_config.dropdown.fnBeforeClose ? m_config.dropdown.fnBeforeClose(context) : true;
            return (!context.ev || !m_input.getTag().contains(context.ev.target)) && result;
        };
        dropdown.fnComplete = (context) => {
            installButtonGroup(context.dropdown, m_comboBoxData);

            if (m_config.dropdown.fnComplete) {
                m_config.dropdown.fnComplete(context);
            }
        };

        m_dropdown = new MamboDropdown(m_dropdownWrapperTag, dropdown);
    }

    function installButtonGroup(dropdown, data) {
        if (!data || !Array.isArray(data)) {
            console.error('Data ComboBox alert: combobox data not found or is not data type Array -->', parentTag);
            return;
        }

        const contentTag = dropdown.getContentTag();
        contentTag.innerHTML = '';

        let buttonGroup = m_utils.extend(true, {}, m_config.buttonGroup);
        buttonGroup.css = m_utils.extend(true, m_config.css.buttonGroup, buttonGroup.css);

        buttonGroup.buttons = data.map(processItemData);
        buttonGroup.fnClick = (context) => {
            let text = context.button.text();
            m_input.value({ value: text });
            m_previous_text = text;
            m_value = context.button.getId();
            dropdown.close();

            if (m_config.fnSelect) {
                m_config.fnSelect({ combobox: self, button: context.button, ev: context.ev });
            }

            if (m_config.buttonGroup.fnClick) {
                m_config.buttonGroup.fnClick(context);
            }
        };

        m_buttonGroup = new MamboButtonGroup(contentTag, buttonGroup);

        if (m_config.value) {
            setValue(m_config.value);
        }
    }

    function processItemData(itemData) {
        return {
            id: getItemDataId(itemData),
            text: getItemDataText(itemData)
        };
    }

    function filterItems() {
        if (m_config.filter) {
            const data = m_string.filterArray(m_comboBoxData, m_input.value(), getItemDataText, 'contains');
            installButtonGroup(m_dropdown, data);
        }
    }

    function value(context = {}) {
        if (typeof context.value === 'undefined') {
            return m_value;
        } else {
            setValue(context.value, context.ev);
        }
    }

    function setValue(value, ev) {
        m_input.value({ value: value });
        const item = m_string.findInArray(m_comboBoxData, value, getItemDataText, 'equals');

        if (item) {
            m_buttonGroup.getTag({ id: getItemDataId(item) }).select();
        } else {
            m_previous_text = value;
            m_value = value;
            if (m_config.fnSelect) {
                m_config.fnSelect({ combobox: self, ev: ev });
            }
        }

    }

    function getItemDataId(itemData) {
        return typeof itemData === "string" ? itemData : itemData[m_config.idField];
    }

    function getItemDataText(itemData) {
        return typeof itemData === "string" ? itemData : itemData[m_config.textField];
    }

    function handleKeyUp() {
        filterItems();
        m_buttonGroup.deselect();
        m_dropdown.open();
    }

    function handleBlur(ev) {
        if (!m_buttonGroup.getSelected() && m_previous_text !== m_input.value()) {
            setValue(m_input.value(), ev);
        }
    }

    function destroyComboBox() {
        domJS.remove(m_comboBoxParentTag);
    }

    function finishSetup() {
        // Execute complete callback function
        if (m_config.fnComplete) {
            m_config.fnComplete({ combobox: self });
        }
    }

    function configure() {
        m_config = {
            css: {
                parent: "combobox-parent",
                dropdownWrapper: "dropdown-wrapper",
                input: {
                    inputWrapper: "combobox-input-wrapper",
                    input: "combobox-input-input",
                },
                dropdown: {
                    parent: "combobox-dropdown-parent",
                    container: "combobox-dropdown-container",
                    button: {
                        button: "combobox-button"
                    }
                },
                buttonGroup: {
                    parent: "combobox-button-group",
                    button: "combobox-button-group-button"
                }
            },
            tag: {
                parent: "sc-combobox",
            },
            input: {
                events: [
                    {
                        name: 'keyup',
                        fn: () => {
                            handleKeyUp();
                        }
                    },
                    {
                        name: 'blur',
                        fn: (context) => {
                            handleBlur(context.ev);
                        }
                    },
                ]
            },
            dropdown: {
                button: {
                    text: ""
                }
            },
            buttonGroup: {},
            idField: "id",
            textField: "text",
            filter: true,
            value: "",
            fnSelect: (context) => {
                // Nothing executes by default
            },
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}