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
 *  File : MamboCheckboxRadioGroup.js
 *******************************************/
function MamboCheckboxRadioGroup(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error("Checkbox Group: parentEle parameter not passed in.");
        return;
    }

    const self = this;
    const m_utils = g_mamboUtils;

    // HTML tag variables
    const m_checkboxRadiosList = [];
    let m_checkboxRadioGroupTag;
    let m_parentTag;

    let m_config;

    // Configure public methods
    this.clear = clear;
    this.destroy = destroyCheckboxRadioGroup;
    this.getParentTag = () => m_checkboxRadioGroupTag;
    this.getTag = getTagById;
    this.select = select;

    // Config default values
    configure();

    // Begin setup
    setup();

    function setup() {
        m_parentTag = g_mamboDomJS.getTag(parentTag);
        if (!m_parentTag) {
            console.error(`Checkbox Group: g_mamboDomJS. tag ${parentTag} not found.`);
            return;
        }

        m_checkboxRadioGroupTag = g_mamboDomJS.createTag(m_config.tag.parent, { class: m_config.css.parent });

        g_mamboDomJS.append(m_parentTag, m_checkboxRadioGroupTag);

        // Loop through all the checkbox
        if (m_config.checkboxes) {
            m_config.checkboxes.forEach(installCheckbox);
        }

        // Loop through all the radios
        if (m_config.radios) {
            m_config.radios.forEach(installRadio);
        }
    }

    function installCheckbox(checkbox) {
        installTag(checkbox, "checkbox");
    }

    function installRadio(radio) {
        installTag(radio, "radio");
    }

    function installTag(tag, type) {
        tag.css = tag.css ? m_utils.extend(true, m_config.css, tag.css) : m_config.css;
        const attr = {
            type: type,
            name: m_config.name
        };
        tag.attr = m_utils.extend(true, attr, tag.attr);
        tag.fnGroupClick = handleGroupClick;

        m_checkboxRadiosList.push(new MamboCheckboxRadio(m_checkboxRadioGroupTag, tag));
    }

    function handleGroupClick(context) {
        if (context.checkboxRadio.isRadio()) {
            selectTag(context.checkboxRadio, true);
        }

        // If same callback for all checkboxes / radios
        if (m_config.fnClick) {
            m_config.fnClick(context);
        }

        if (m_config.fnGroupClick) {
            m_config.fnGroupClick({ checkboxRadioGroup: self, checkboxRadio: context.checkboxRadio, ev: context.ev });
        }
    }

    function getTag(id) {
        return m_checkboxRadiosList.find(tag => tag.getId() === id);
    }

    function getSelected() {
        return m_checkboxRadiosList.filter(tag => tag.select());
    }

    function selectTag(tag, notTrigger) {
        if (tag) {
            if (tag.isCheckbox()) {
                tag.select({ value: true, notTrigger: notTrigger });
            }
            if (tag.isRadio()) {
                deselectRadios();
                tag.select({ value: true, notTrigger: notTrigger });
            }
        }
    }

    function deselectRadios() {
        m_checkboxRadiosList.forEach(tag => {
            if (tag.isRadio()) {
                tag.select({ value: false, notTrigger: true });
            }
        });
    }

    function getTagById(context = {}) {
        return getTag(context.id);
    }

    function clear() {
        m_checkboxRadiosList.forEach(tag => {
            tag.select({ value: false, notTrigger: true });
        });
    }

    function select(context = {}) {
        if (typeof context.id === 'undefined') {
            return getSelected();
        } else {
            if (Array.isArray(context.id)) {
                context.id.forEach((id) => {
                    selectTag(getTag(id), context.notTrigger);
                });
            } else {
                selectTag(getTag(context.id), context.notTrigger);
            }
        }
    }

    function destroyCheckboxRadioGroup() {
        g_mamboDomJS.remove(m_checkboxRadioGroupTag);
    }

    function configure() {
        m_config = {
            css: {
                parent: "checkbox-radio-group",
                checkboxRadioParent: "checkbox-radio-group-parent",
                checkbox: {
                    input: "checkbox-group-input",
                    span: "checkbox-group-span"
                },
                radio: {
                    input: "radio-group-input",
                    span: "radio-group-span"
                }
            },
            tag: {
                parent: "sc-checkbox-radio-group",
            },
            name: Math.random().toString(36).slice(2),
            checkboxes: [],
            radios: [],
            fnGroupClick: (context) => {
            }
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}