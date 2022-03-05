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
 *  File : MamboFileChooser.js
 *******************************************/
function MamboFileChooser(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error(`ScFileChooser: requied parentTag parameter were not passed in.`);
        return;
    }

    const self = this;
    const m_utils = g_mamboObjMgr.get("MamboUtilities");

    // HTML tag variables
    let m_wrapperTag;
    let m_inputTag;

    let m_config;

    // Configure public methods
    this.destroy = destroyFileChooser;
    this.getInputTag = () => m_inputTag;
    this.getParentTag = () => m_wrapperTag;

    // Configure
    configure();

    setup();

    function setup() {
        installDOMTags();
    }

    function installDOMTags() {
        const parent = domJS.getTag(parentTag);
        if (!parent) {
            console.error(`File Chooser: domJS. parent tag ${parent} was not found.`);
            return;
        }

        m_wrapperTag = domJS.createTag(m_config.tag.parent, { class: m_config.css.parent });

        domJS.append(parent, m_wrapperTag);

        switch (m_config.buttonOnly) {
            case true:
                installButtonOnly();
                break;

            default:
                installInput();
                break;
        }
    }

    function installButtonOnly() {
        installInput(true);

        const config = {
            text: m_config.textButton,
            fnClick: () => {
                m_inputTag.getTag().click();
            },
            css: {
                button: m_config.css.button
            }
        };

        new MamboButton(m_wrapperTag, config);
    }

    function installInput(hidden) {
        let inputConfig = {
            labelText: m_config.textLabel,
            attr: m_config.attr,
            css: {
                inputWrapper: m_config.css.wrapper
            },
            events: [{
                name: 'change',
                fn: (context) => {
                    m_config.fnUpload({ files: context.input.getTag().files, ev: context.ev });
                }
            }],
            fnComplete: () => {
                if (m_config.fnComplete) {
                    m_config.fnComplete({ fileChooser: self });
                }
            }
        };

        if (hidden) {
            inputConfig.hidden = true;
        }

        m_inputTag = new MamboInput(m_wrapperTag, inputConfig);
    }

    function destroyFileChooser() {
        domJS.remove(m_wrapperTag);
    }

    function configure() {

        m_config = {
            buttonOnly: false,
            textButton: "Button Only - Select File",
            textLabel: "Choose files to upload",
            attr: {
                type: "file"
            },
            prop: {},
            css: {
                parent: "file-chooser-parent",
                label: "file-chooser-label",
                input: "file-chooser-input",
                button: "file-chooser-button",
                wrapper: "file-chooser-input-wrapper"
            },
            tag: {
                parent: "sc-file-chooser"
            },
            fnUpload: (context) => {
                // Provide your callback function
            }
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }

    }
}