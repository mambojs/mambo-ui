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
 *  File : MamboDropdown.js
 *******************************************/
function MamboDropdown(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error(`Dropdown: parentTag parameter was not passed in.`);
        return;
    }

    const self = this;
    const m_utils = g_mamboObjMgr.get("MamboUtilities");

    // HTML tag variables
    let m_parentTag;
    let m_dropDownParentTag;
    let m_dropdownContainerTag;

    let m_config;
    let m_open = false;

    // Configure public methods
    this.close = close;
    this.destroy = destroyDropdown;
    this.getContentTag = () => m_dropdownContainerTag;
    this.getParentTag = () => m_dropDownParentTag;
    this.open = open;

    // Config default values
    configure();

    // Begin setup
    setup();

    function setup() {
        m_parentTag = domJS.getTag(parentTag);

        if (!m_parentTag) {
            console.error(`Dropdown: domJS. parent tag ${parentTag} was not found.`);
            return;
        }

        installDOM();
        installEventHandler();
    }

    function installDOM() {
        m_dropDownParentTag = domJS.createTag(m_config.tag.parent, { class: m_config.css.parent });

        m_parentTag.innerHTML = '';
        domJS.append(m_parentTag, m_dropDownParentTag);

        installOpenButton();
        installContainer();
        finishSetup();
    }

    function installOpenButton() {
        let button = m_utils.extend(true, {}, m_config.button);
        button.css = m_utils.extend(true, m_config.css.button, button.css);

        button.fnClick = (context) => {
            if (m_open) {
                closeAnimation(context.ev);
            } else {
                openAnimation();
            }
            if (m_config.button.fnClick) {
                m_config.button.fnClick(context);
            }
        };

        new MamboButton(m_dropDownParentTag, button);
    }

    function installContainer() {
        m_dropdownContainerTag = domJS.createTag(m_config.tag.container, { class: m_config.css.container });
        domJS.append(m_dropDownParentTag, m_dropdownContainerTag);
    }

    function open() {
        openAnimation();
    }

    function openAnimation() {
        domJS.addClass(m_dropdownContainerTag, m_config.css.open);
        m_open = true;
        if (m_config.fnOpen) {
            m_config.fnOpen({ dropdown: self });
        }
    }

    function close(context = {}) {
        closeAnimation(context.ev);
    }

    function closeAnimation(ev) {
        if (m_config.fnBeforeClose && !m_config.fnBeforeClose({ ev: ev })) {
            return;
        }

        domJS.removeClass(m_dropdownContainerTag, m_config.css.open);
        m_open = false;
        if (m_config.fnClose) {
            m_config.fnClose({ dropdown: self });
        }
    }

    function installEventHandler() {
        window.addEventListener("click", function (ev) {
            if (m_open && !m_dropdownContainerTag.contains(ev.target)) {
                closeAnimation(ev);
            }
        });
    }

    function destroyDropdown() {
        domJS.remove(m_dropDownParentTag);
    }

    function finishSetup() {
        // Execute complete callback function
        if (m_config.fnComplete) {
            m_config.fnComplete({ dropdown: self });
        }
    }

    function configure() {
        m_config = {
            css: {
                parent: "dropdown-parent",
                container: "dropdown-container",
                open: "open",
                button: {
                    button: "dropdown-button",
                }
            },
            tag: {
                parent: "sc-dropdown",
                container: "dropdown-container"
            },
            button: {
                text: "Open Dropdown"
            },
            fnClose: (context) => {
                // Nothing executes by default
            },
            fnOpen: (context) => {
                // Nothing executes by default
            },
            fnBeforeClose: (context) => {
                return true;
            }
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}