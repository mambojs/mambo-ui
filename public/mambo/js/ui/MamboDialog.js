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
 *  File : MamboDialog.js
 *******************************************/
function MamboDialog(parentTag, options, fnReady) {
    "use strict";

    // Config default values
    const self = this;
    const m_utils = g_mamboObjMgr.get("MamboUtilities");

    // HTML tag variables
    let m_overlayTag;
    let m_overlayHdrTag;
    let m_overlayBodyTag;

    let m_config;

    // Configure public methods
    this.close = closeDialog;
    this.getParentTag = () => m_overlayTag;

    configure();

    // Begin setup
    setup();

    function setup() {
        installDialog();
    }

    function installDialog() {
        m_overlayTag = domJS.createTag(m_config.tag.parent, { class: m_config.css.parent });
        m_overlayBodyTag = domJS.createTag(m_config.tag.dialogBody, { class: m_config.css.dialogBody });
        let headerContent = m_config.title ? domJS.createTag('h3', { class: m_config.css.hdrTitle, text: m_config.title }) : m_config.hdrHtml;

        const overlayHdrLeft = domJS.createTag('dialog-header-left', { class: m_config.css.dialogHdrLeft });

        if (m_config.closeButton) {
            installCloseButton(overlayHdrLeft);
        }

        const overlayHdrCenter = domJS.createTag('dialog-header-center', { class: m_config.css.dialogHdrCenter });
        domJS.append(overlayHdrCenter, headerContent);
        const overlayHdrRight = domJS.createTag('dialog-header-right', { class: m_config.css.dialogHdrRight });

        m_overlayHdrTag = domJS.createTag('dialog-header', { class: m_config.css.dialogHdr });
        domJS.append(m_overlayHdrTag, overlayHdrLeft);
        domJS.append(m_overlayHdrTag, overlayHdrCenter);
        domJS.append(m_overlayHdrTag, overlayHdrRight);

        domJS.append(m_overlayTag, m_overlayHdrTag);
        domJS.append(m_overlayTag, m_overlayBodyTag);

        // Determine where to install dialog
        domJS.append(parentTag ? parentTag : 'body', m_overlayTag);

        // Continue to install all event handlers
        installEventHandlers();
    }

    function installCloseButton(headerLeftTag) {
        const btnConfig = {
            text: m_config.closeText,
            css: {
                button: m_config.css.hdrCloseBtn
            },
            attr: {
                type: "button"
            },
            fnClick: () => {
                if (m_config.fnClose) {
                    m_config.fnClose({ dialog: self });
                } else {
                    close();
                }
            }
        };

        new MamboButton(headerLeftTag, btnConfig);
    }

    function installEventHandlers() {
        // Invoke call back when installation is completed
        if (fnReady) {
            fnReady({ dialog: self, dialogContentTag: m_overlayBodyTag });
        }
    }

    function closeDialog() {
        close();
    }

    function close() {
        domJS.remove(m_overlayTag);
    }

    function configure() {

        m_config = {
            closeButton: true,
            closeText: "close",
            css: {
                parent: "dialog-parent",
                dialogHdr: "dialog-header",
                dialogHdrLeft: "dialog-header-left",
                dialogHdrCenter: "dialog-header-center",
                dialogHdrRight: "dialog-header-right",
                dialogBody: "dialog-body",
                hdrCloseBtn: "dialog-header-close",
                hdrTitle: "dialog-header-title"
            },
            tag: {
                parent: "sc-dialog",
                dialogBody: "dialog-body"
            }
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}