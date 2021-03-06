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
 *  File : MamboCheckboxRadio.js
 *******************************************/
import styles from './MamboCheckboxRadio.css';

ui.checkboxRadio = class MamboCheckboxRadio extends HTMLElement {
    constructor(parentTag, options) {
        super();

        if (!parentTag) {
            console.error(`Checkbox: parentEle parameter not passed in.`);
            return;
        }

        const self = this;
        const m_utils = tools.utils;

        // HTML tag variables
        let m_parentTag;
        let m_checkboxRadioParentTag;
        let m_checkboxRadioTag;
        let m_checkboxRadioSpanTag;

        let m_config;
        let m_type = 1; //1:checkbox 2:radio
        let m_enable = true;
        let m_checked = false;

        // Configure public methods
        this.destroy = destroyCheckboxRadio;
        this.enable = enable;
        this.getId = () => m_config.id;
        this.getParentTag = () => m_checkboxRadioParentTag;
        this.isCheckbox = isCheckbox;
        this.isRadio = isRadio;
        this.select = select;
        this.value = value;

        // Config default values
        configure();

        // Begin setup
        setup();

        function setup() {
            m_parentTag = dom.getTag(parentTag);

            if (!m_parentTag) {
                console.error(`Checkbox: dom. parent tag ${parentTag} was not found.`);
                return;
            }

            setOptionValues();
            installDOM();
        }

        function setOptionValues() {
            m_enable = m_config.enable;
        }

        function installDOM() {
            installTags();
            setupEventHandler();
            finishSetup();
        }

        function installTags() {
            // Install checkbox / radio parent tag
            m_checkboxRadioParentTag = dom.createTag('label', { class: m_config.css.checkboxRadioParent });
            dom.append(m_parentTag, m_checkboxRadioParentTag);

            let textTag = dom.createTag('span', { class: m_config.css.checkboxRadioText, text: m_config.text });
            dom.append(m_checkboxRadioParentTag, textTag);

            m_type = m_config.attr["type"] === "checkbox" ? 1 : 2;
            let css = m_type === 1 ? m_config.css.checkbox : m_config.css.radio;

            const tagConfig = {
                class: css.input,
                prop: m_config.prop,
                attr: m_config.attr,
                text: m_config.value
            };
            m_checkboxRadioTag = dom.createTag('input', tagConfig);
            m_checkboxRadioSpanTag = dom.createTag('span', { class: css.span });

            dom.append(m_checkboxRadioParentTag, m_checkboxRadioTag);
            dom.append(m_checkboxRadioParentTag, m_checkboxRadioSpanTag);

            m_checked = m_config.prop["checked"];
            setEnable(m_enable);
        }

        function setupEventHandler() {
            m_checkboxRadioTag.addEventListener("click", handleClick);
        }

        function handleClick(ev) {
            if (m_enable) {
                switch (m_type) {
                    case 1: //checkbox
                        m_checked = !m_checked;
                        break;
                    case 2: //radio
                        m_checked = true;
                        break;
                }

                if (m_config.fnClick) {
                    m_config.fnClick({ checkboxRadio: self, ev: ev });
                }

                // Invoke callback for group
                if (m_config.fnGroupClick) {
                    m_config.fnGroupClick({ checkboxRadio: self, ev: ev });
                }
            } else {
                ev.preventDefault();
            }
        }

        function select(context = {}) {
            if (typeof context.value === 'undefined') {
                return m_checked;
            } else {
                checkInput(context.value, context.notTrigger);
            }
        }

        function checkInput(value, notTrigger) {
            if (m_enable) {
                if (notTrigger || m_type === 2) {
                    m_checked = value;
                    dom.setProps(m_checkboxRadioTag, { checked: m_checked });
                } else {
                    m_checkboxRadioTag.click();
                }
            }
        }

        function enable(context = {}) {
            if (typeof context.enable === 'undefined') {
                return m_enable;
            } else {
                setEnable(context.enable);
            }
        }

        function setEnable(enable) {
            m_enable = enable;
            m_enable ? dom.removeClass(m_checkboxRadioParentTag, m_config.css.disabled) : dom.addClass(m_checkboxRadioParentTag, m_config.css.disabled);
        }

        function value(context = {}) {
            if (typeof context.value === 'undefined') {
                return m_checkboxRadioTag.value;
            } else {
                m_checkboxRadioTag.value = context.value;
            }
        }

        function isCheckbox() {
            return m_type === 1;
        }

        function isRadio() {
            return m_type === 2;
        }

        function destroyCheckboxRadio() {
            dom.remove(m_checkboxRadioParentTag);
        }

        function finishSetup() {
            // Execute complete callback function
            if (m_config.fnComplete) {
                m_config.fnComplete({ checkboxRadio: self });
            }
        }

        function configure() {
            m_config = {
                css: {
                    checkboxRadioParent: "checkbox-radio-parent",
                    checkboxRadioText: "checkbox-radio-text-span",
                    checkbox: {
                        input: "checkbox-input",
                        span: "checkbox-span"
                    },
                    radio: {
                        input: "radio-input",
                        span: "radio-span"
                    },
                    disabled: "checkbox-radio-disabled"
                },
                id: "CheckboxRadio ID was not specified",
                text: "",
                value: "",
                enable: true,
                attr: {
                    type: "checkbox",
                    name: Math.random().toString(36).slice(2)
                },
                prop: {
                    checked: false
                }
            };

            // If options provided, override default config
            if (options) {
                m_config = m_utils.extend(true, m_config, options);
            }
        }
    }
}

customElements.define('mambo-checkbox-radio', ui.checkboxRadio);
