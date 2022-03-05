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
 *  File : MamboDragDrop.js
 *******************************************/
function MamboDragDrop(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error("DragDrop: required parentEle parameter was not passed in.");
        return;
    }

    // Config default values
    const m_utils = g_mamboObjMgr.get("MamboUtilities");
    const m_graphics = g_mamboObjMgr.get("MamboGraphics");

    // HTML tag variables
    let m_parentTag;
    let m_dragDropTag;

    let m_config;

    // Public methods
    this.destroy = destroyDragDrop;
    this.getParentTag = () => m_dragDropTag;

    // Configure
    configure();

    // Begin setup
    setup();

    function setup() {
        m_parentTag = domJS.getTag(parentTag);

        if (m_config.hidden) {
            // Install event handlers only
            m_dragDropTag = m_parentTag;
        } else {
            installDOMTags();
        }

        setupEventHandlers();
    }

    function installDOMTags() {
        m_dragDropTag = domJS.createTag('div', { class: m_config.css.parent });
        const tagConfig = {
            class: m_config.css.imgDropIcon,
            attr: { src: m_config.baseUrl + m_config.imgDropIcon }
        };
        let imgEle = domJS.createTag('img', tagConfig);
        let textEle = domJS.createTag('text', { class: m_config.css.dropText, text: m_config.dropText });

        domJS.append(m_dragDropTag, imgEle).append(m_dragDropTag, textEle);
        domJS.append(m_parentTag, m_dragDropTag);
    }

    function setupEventHandlers() {
        // on drop
        m_dragDropTag.addEventListener('drop', handleDrop);

        // on drag over
        m_dragDropTag.addEventListener('dragover', (ev) => {
            // Prevent default behavior (Prevent file from being opened)
            ev.preventDefault();

            if (m_config.fnDragover) {
                m_config.fnDragover({ ev: ev });
            }
        });

        // On mouseenter mouseleave
        m_dragDropTag.addEventListener('mouseenter mouseleave', (ev) => {
            if (m_config.fnMouseenterMouseleave) {
                m_config.fnMouseenterMouseleave({ ev: ev });
            }
        });
    }

    function handleDrop(ev) {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
        ev.stopPropagation();

        if (!m_config.fnDrop) {
            return;
        }

        // Get file types
        let items = ev.dataTransfer.items;

        // Return if no items were dropped
        if (!items || items.length === 0) {
            m_config.fnDrop({ error: "No items dropped", dataTransfer: {} });
            return;
        }

        // Return if drop count is larger than allowed
        if (m_config.maxFileCount && items.length > m_config.maxFileCount) {
            m_config.fnDrop({ error: "maxFileCount", dataTransfer: {} });
            return;
        }

        // Check all file kinds are allowed
        for (let i = 0; i < items.length; i++) {
            if (!checkFileKindAllowed(items[i].type)) {
                console.error("DragDrop: one or more file formats are not allowed.");
                return;
            }
        }

        // Return results
        m_config.fnDrop({ dataTransfer: ev.dataTransfer, ev: ev });
    }

    function checkFileKindAllowed(type) {
        let valid = true;

        // Check property exists and it is an Array
        if (m_config.allowKind && Array.isArray(m_config.allowKind)) {

            m_config.allowKind.some(allowedKind => {
                // Check if file type is allowed
                if (allowedKind !== type) {
                    valid = false;
                    return true;
                }
            });
        }

        return valid;
    }

    function destroyDragDrop() {
        m_parentTag.removeChild(m_dragDropTag);
    }

    function configure() {
        m_config = {
            imgDropIcon: m_graphics.getImage({ name: "arrow-down-box-black" }),
            dropText: "Drop Here",
            hidden: false,
            baseUrl: '',
            maxFileCount: null,
            css: {
                parent: "drag-drop-parent",
                imgDropIcon: "drag-drop-icon",
                dropText: "drag-drop-text"
            }
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}