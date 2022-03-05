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
 *  File : MamboSwitch.js
 *******************************************/
function MamboSwitch(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error(`Switch: parentEle parameter not passed in.`);
        return;
    }

    const self = this;
    const m_utils = g_mamboObjMgr.get("MamboUtilities");

    // HTML tag variables
    let m_parentTag;
    let m_switchParentTag;
    let m_inputTag;
    let m_containerTag;

    let m_config;
    let m_enable = true;
    let m_checked = false;

    // Configure public methods
    this.check = check;
    this.checked = () => m_checked;
    this.destroy = destroySwitch;
    this.enable = enable;
    this.getParentTag = () => m_switchParentTag;
    this.toggle = toggle;

    // Config default values
    configure();

    // Begin setup
    setup();

    function setup() {
        m_parentTag = domJS.getTag(parentTag);

        if (!m_parentTag) {
            console.error(`Switch: domJS. parent tag ${parentTag} was not found.`);
            return;
        }

        setOptionValues();
        installDOM();
    }

    function setOptionValues() {
        m_enable = m_config.enable;
        m_checked = m_config.checked;
    }

    function installDOM() {
        installTags();
        setupEventHandler();
        finishSetup();
    }

    function installTags() {
        m_switchParentTag = domJS.createTag(m_config.tag.switch, { class: m_config.css.parent });
        domJS.append(m_parentTag, m_switchParentTag);

        const tagConfig = {
            class: m_config.css.input,
            attr: { type: "checkbox" },
            prop: { checked: m_checked }
        };
        m_inputTag = domJS.createTag('input', tagConfig);
        m_containerTag = domJS.createTag(m_config.tag.container, { class: m_config.css.container });

        domJS.append(m_switchParentTag, m_inputTag);
        domJS.append(m_switchParentTag, m_containerTag);

        installLabels();
    }

    function installLabels() {
        let onTag = domJS.createTag(m_config.tag.on, { class: m_config.css.on, text: m_config.messages.checked });
        let offTag = domJS.createTag(m_config.tag.off, { class: m_config.css.off, text: m_config.messages.unchecked });
        let handleTag = domJS.createTag(m_config.tag.handle, { class: m_config.css.handle });

        domJS.append(m_containerTag, onTag);
        domJS.append(m_containerTag, offTag);
        domJS.append(m_containerTag, handleTag);

        setEnable(m_enable);
    }

    function setupEventHandler() {
        m_switchParentTag.addEventListener("click", handleClick);
    }

    function handleClick(ev) {
        if (m_enable) {
            toggleSwitch(ev);
        }
    }

    function toggleSwitch(ev) {
        m_checked = !m_checked;
        setChecked(ev);
    }

    function setChecked(ev) {
        domJS.setProps(m_inputTag, { checked: m_checked });

        if (m_config.fnChange) {
            m_config.fnChange({ switch: self, ev: ev });
        }

    }

    function enable(context = {}) {
        if (typeof context.enable === 'undefined') {
            return m_enable;
        } else {
            setEnable(context.enable);
        }
    }

    function toggle() {
        toggleSwitch();
    }

    function check(context = {}) {
        if (typeof context.checked === 'boolean') {
            m_checked = context.checked;
            setChecked();
        }
    }

    function setEnable(enable) {
        m_enable = enable;
        m_enable ? domJS.removeClass(m_switchParentTag, m_config.css.disabled) : domJS.addClass(m_switchParentTag, m_config.css.disabled);
    }

    function destroySwitch() {
        domJS.remove(m_switchParentTag);
    }

    function finishSetup() {
        // Execute complete callback function
        if (m_config.fnComplete) {
            m_config.fnComplete({ switch: self });
        }
    }

    function configure() {
        m_config = {
            css: {
                parent: "switch-parent",
                input: "switch-input",
                container: "switch-container",
                on: "switch-label-on",
                off: "switch-label-off",
                handle: "switch-handle",
                disabled: "switch-disabled"
            },
            tag: {
                switch: "sc-switch",
                container: "switch-container",
                on: "switch-label-on",
                off: "switch-label-off",
                handle: "switch-handle"
            },
            enable: true,
            checked: false,
            messages: {
                checked: "ON",
                unchecked: "OFF"
            },
            fnChange: (context) => {
                // Nothing executes by default
            },
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}
