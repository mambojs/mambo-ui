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
 *  File : MamboTimePicker.js
 *******************************************/
function MamboTimePicker(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error(`TimePicker: parentTag parameter was not passed in.`);
        return;
    }

    const self = this;
    const m_utils = g_mamboObjMgr.get("MamboUtilities");
    const m_graphics = g_mamboObjMgr.get("MamboGraphics");
    const m_dateMgr = g_mamboObjMgr.get("MamboDateManager");

    // HTML tag variables
    let m_parentTag;
    let m_comboBox;

    let m_config;
    let m_value = null;

    // Configure public methods
    this.destroy = destroyTimePicker;
    this.getParentTag = () => m_comboBox.getParentTag();
    this.value = value;

    // Config default values
    configure();

    // Begin setup
    setup();

    function setup() {
        m_parentTag = domJS.getTag(parentTag);

        if (!m_parentTag) {
            console.error(`TimePicker: domJS. parent tag ${parentTag} was not found.`);
            return;
        }

        installDOM();
    }

    function installDOM() {
        installComboBox();

        finishSetup();
    }

    function installComboBox() {
        let combobox = {
            tag: {
                parent: m_config.tag.parent
            }
        };
        combobox = m_utils.extend(true, combobox, m_config.combobox);
        combobox.css = m_utils.extend(true, m_config.css.combobox, combobox.css);
        combobox.data = createComboBoxData();

        if (m_config.value) {
            let value = m_dateMgr.getDate(m_config.value, m_config.format);
            if (value) {
                combobox.value = m_dateMgr.format(value, m_config.format);
            }
        }

        combobox.fnSelect = (context) => {
            selectTime(context);

            if (m_config.combobox.fnSelect) {
                m_config.combobox.fnSelect(context);
            }
        };

        m_parentTag.innerHTML = '';
        m_comboBox = new MamboCombobox(m_parentTag, combobox);
    }

    function createComboBoxData() {
        let min = m_dateMgr.getDate(m_config.min, m_config.format);
        let max = m_dateMgr.getDate(m_config.max, m_config.format);

        if (m_dateMgr.isSameOrAfter(min, max)) {
            m_dateMgr.add(max, 1, 'd');
        }

        return m_dateMgr.createInterval(m_config.interval, 'm', min, max, m_config.format);
    }

    function selectTime(context) {
        m_value = context.button ? m_dateMgr.createDate(context.button.text(), m_config.format) : null;

        if (m_config.fnSelect) {
            m_config.fnSelect({ timePicker: self, button: context.button, ev: context.ev });
        }
    }

    function setValue(value) {
        let time = m_dateMgr.getDate(value, m_config.format);
        m_value = m_dateMgr.cloneDate(time);
        m_comboBox.value({ value: m_dateMgr.format(time, m_config.format) });
    }

    function value(context = {}) {
        if (typeof context.value === 'undefined') {
            return m_value;
        } else {
            setValue(context.value);
        }
    }

    function destroyTimePicker() {
        m_comboBox.destroy();
    }

    function finishSetup() {
        // Execute complete callback function
        if (m_config.fnComplete) {
            m_config.fnComplete({ timePicker: self });
        }
    }

    function configure() {
        m_config = {
            css: {
                combobox: {
                    parent: "time-picker-parent",
                    dropdown: {
                        container: "time-picker-dropdown-container",
                        button: {
                            button: "time-picker-combobox-button"
                        }
                    }
                }
            },
            tag: {
                parent: "sc-time-picker"
            },
            combobox: {
                filter: false,
                dropdown: {
                    button: {
                        text: "",
                        svg: {
                            element: m_graphics.getSVG({ name: "watch" })
                        }
                    }
                },
            },
            value: "",
            interval: 30,
            format: "h:mm A",
            min: m_dateMgr.getToday(),
            max: m_dateMgr.getToday()
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}