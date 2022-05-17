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
class MamboDropdown extends HTMLElement {
    constructor(initOptions) {

        super();
        const self = this;
        const m_utils = g_mamboUtils;

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
        this.install = installSelf;
        this.open = open;
        this.setup = setup;

        initOptions && setup(initOptions); //if component has config options then begin the setup...

        function setup(options) {

            configure(options)
            installDOM();

            // installEventHandler();
        }

        function installDOM() {
            // m_parentTag = parentTag ? parentTag : m_parentTag;  

            // m_parentTag = 'demo-dropdown'; 
            // installContainer();
            installEventHandler();
            installOpenButton();
            g_mamboDomJS.addClass(self, m_config.css.parent);

            m_config.install && installSelf(m_parentTag, m_config.installPrepend); //install = true then install

            finishSetup();  
        }


        function installOpenButton() {
            let button = m_utils.extend(true, {}, m_config.button);
            button.css = m_utils.extend(true, m_config.css.button, button.css);
            button.parentTag = m_dropDownParentTag;

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

            new MamboButton(button);
        }

        function installContainer() {
            m_dropdownContainerTag = g_mamboDomJS.createTag(m_config.tag.container, { class: m_config.css.container });
            g_mamboDomJS.append(m_dropDownParentTag, m_dropdownContainerTag);
        }

        function open() {
            openAnimation();
        }

        function openAnimation() {
            g_mamboDomJS.addClass(m_dropdownContainerTag, m_config.css.open);
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

            g_mamboDomJS.removeClass(m_dropdownContainerTag, m_config.css.open);
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
            g_mamboDomJS.remove(m_dropDownParentTag);
        }

        function finishSetup() {
            // Install component into parent
            if (m_config.install) installSelf(m_parentTag, m_config.installPrepend);
            // Execute complete callback function
            if (m_config.fnComplete) {
                m_config.fnComplete({ dropdown: self });
            }
        }

        function installSelf(parentTag, prepend) {
            m_parentTag = parentTag ? parentTag : m_parentTag;

            m_parentTag = g_mamboDomJS.appendSelfToParentTag(m_parentTag, self, prepend);
        }


        function configure(options) {
            m_config = {
                install: "true",
                installPrepend: "true",
                // parentTag: "undefined",
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

            if (m_config.parentTag) {
                m_parentTag = g_mamboDomJS.getTag(m_config.parentTag)
            }
        }
    }
}

//Custom element as a native web component definition:
customElements.define('mambo-dropdown', MamboDropdown)