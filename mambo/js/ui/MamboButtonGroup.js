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
 *  File : MamboButtonGroup.js
 *******************************************/
function MamboButtonGroup(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error("Button Group: parentEle parameter not passed in.");
        return;
    }

    const self = this;
    const m_utils = g_mamboUtils;

    // HTML tag variables
    const m_buttonsList = [];
    let m_buttonGroupTag;
    let m_parentTag;

    let m_config;
    let m_selectedButtonTag;

    // Public methods
    this.deselect = deselect;
    this.destroy = destroyButtonGroup;
    this.getConfigById = getConfigById;
    this.getParentTag = () => m_buttonGroupTag;
    this.getSelected = getSelected;
    this.getTag = getButtonTagById;
    this.select = selectBtn;

    // Config default values
    configure();

    // Begin setup
    setup();

    function setup() {
        m_parentTag = g_mamboDomJS.getTag(parentTag);
        if (!m_parentTag) {
            console.error(`Button Group: g_mamboDomJS. tag ${parentTag} not found.`);
            return;
        }

        m_buttonGroupTag = g_mamboDomJS.createTag(m_config.tag.parent, { class: m_config.css.parent });

        g_mamboDomJS.append(m_parentTag, m_buttonGroupTag);

        // Loop through all the buttons
        if (m_config.buttons) {
            m_config.buttons.forEach(installButton);
        }
    }

    function deselect() {
        deselectBtns();
    }

    function deselectBtns() {
        m_buttonsList.forEach(button => {
            button.deselect();
        });
        m_selectedButtonTag = null;
    }

    function installButton(button) {
        button.css = button.css ? m_utils.extend(true, m_config.css, button.css) : m_config.css;
        button.fnGroupClick = m_config.fnGroupClick;
        button.parentTag = m_buttonGroupTag;
        m_buttonsList.push(new MamboButton(button));
    }

    function handleGroupBtnClick(context) {
        // Deselect all buttons
        deselectBtns();

        // If same callback for all buttons
        if (m_config.fnClick) {
            m_config.fnClick(context);
        }

        // Select clicked button
        context.button.select({ notTrigger: true });
        m_selectedButtonTag = context.button;
    }

    function selectBtn(context = {}) {
        let buttonTag = getTag(context.id);
        if (buttonTag) {
            buttonTag.select(context);
            m_selectedButtonTag = buttonTag;
        }
    }

    function getButtonTagById(context = {}) {
        return getTag(context.id);
    }

    function getTag(id) {
        return m_buttonsList.find(btn => btn.getId() === id);
    }

    function getConfigById(context = {}) {
        return m_buttonsList.find(btn => btn.getConfig().id === context.id);
    }

    function getSelected() {
        return m_selectedButtonTag;
    }

    function destroyButtonGroup() {
        g_mamboDomJS.remove(m_buttonGroupTag);
    }

    function configure() {
        m_config = {
            css: {
                parent: "button-group",
                button: "button-group-button",
                img: "button-group-img",
            },
            tag: {
                parent: "button-group",
            },
            fnGroupClick: handleGroupBtnClick
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}