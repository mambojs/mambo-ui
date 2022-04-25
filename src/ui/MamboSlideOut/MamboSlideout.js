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
 *  File : MamboSlideout.js
 *******************************************/
function MamboSlideout(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error(`Button: parentEle parameter not passed in.`);
        return;
    }

    const self = this;
    const m_utils = g_mamboUtils;
    const m_graphics = g_mamboGraphics;

    // HTML tag variables
    let m_parentTag;
    let m_slideoutContentTag;
    let m_slideoutHeaderTag;
    let m_slideoutBodyTag;
    let m_slideoutOverlayTag;

    let m_config;

    this.close = close;
    this.getContentTag = () => m_slideoutContentTag;
    this.getHeaderTag = () => m_slideoutHeaderTag;
    this.getBodyTag = () => m_slideoutBodyTag;
    this.destroy = destroySlideout;
    this.open = openAnimation;

    configure();

    setup();

    function setup() {
        m_parentTag = g_mamboDomJS.getTag(parentTag);

        if (!m_parentTag) {
            console.error(`Slideout: g_mamboDomJS. parent tag ${parentTag} was not found.`);
            return;
        }

        installDOM();
        installCloseButton();
        installEventHandler();
    }

    function installDOM() {
        m_slideoutHeaderTag = g_mamboDomJS.createTag(m_config.tag.header, { class: m_config.css.header });
        m_slideoutBodyTag = g_mamboDomJS.createTag(m_config.tag.body, { class: m_config.css.body });
        m_slideoutContentTag = g_mamboDomJS.createTag(m_config.tag.content, { class: m_config.css.content });
        g_mamboDomJS.append(m_slideoutContentTag, m_slideoutHeaderTag).append(m_slideoutContentTag, m_slideoutBodyTag);

        m_slideoutOverlayTag = g_mamboDomJS.createTag(m_config.tag.overlay, { class: m_config.css.overlay });
        g_mamboDomJS.append(m_parentTag, m_slideoutContentTag).append(m_parentTag, m_slideoutOverlayTag);

        finishSetup();
    }

    function openAnimation() {
        g_mamboDomJS.addClass(m_slideoutContentTag, "open");
        g_mamboDomJS.addClass(m_slideoutOverlayTag, "fade-in");
        if (m_config.fnOpen) {
            m_config.fnOpen({ slideout: self });
        }
    }

    function close() {
        closeAnimation();
    }

    function closeAnimation() {
        g_mamboDomJS.removeClass(m_slideoutContentTag, "open");
        g_mamboDomJS.removeClass(m_slideoutOverlayTag, "fade-in");
        if (m_config.fnClose) {
            m_config.fnClose({ slideout: self });
        }
    }

    function destroySlideout() {
        g_mamboDomJS.remove(m_slideoutContentTag).remove(m_slideoutOverlayTag);
    }

    function installCloseButton() {
        if (!m_config.closeButton) {
            return;
        }

        const config = m_config.closeButton;
        config.parentTag = m_slideoutHeaderTag;
        config.fnClick = () => {
            closeAnimation();
        };

        new MamboButton(config);
    }

    function installEventHandler() {
        m_slideoutOverlayTag.addEventListener("click", (ev) => {
            closeAnimation();
        });
    }

    function finishSetup() {
        // Execute complete callback function
        if (m_config.fnComplete) {
            m_config.fnComplete({ slideout: self });
        }
    }

    function configure() {
        m_config = {
            css: {
                overlay: "slideout-overlay",
                content: "slideout-content",
                header: "slideout-header",
                body: "slideout-body"
            },
            tag: {
                overlay: "slideout-overlay",
                content: "slideout-content",
                header: "slideout-header",
                body: "slideout-body"
            },
            closeButton: {
                attr: {
                    type: "button"
                },
                img: {
                    attr: {
                        src: m_graphics.getImage({ name: "x-black" })
                    }
                },
                css: {
                    button: "slideout-close-button"
                }
            },
            fnClose: (context) => {
                // Nothing executes by default
            },
            fnOpen: (context) => {
                // Nothing executes by default
            }
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}