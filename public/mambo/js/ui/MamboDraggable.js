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
 *  File : MamboDraggable.js
 *******************************************/
function MamboDraggable(parentTag, containerTag, options) {
    "use strict";

    if (!parentTag) {
        console.error(`Draggable: parentEle parameter not passed in.`);
        return;
    }

    const self = this;
    const m_utils = g_mamboObjMgr.get("MamboUtilities");

    // HTML tag variables
    let m_parentTag;
    let m_containerTag;
    let m_draggableTag;

    let m_config;
    let m_enable = true;
    let m_active = false;
    let m_axis; //null: no axis, 0: x, 1: y
    let m_initialX;
    let m_initialY;
    let m_xOffset;
    let m_yOffset;
    let m_bounding = null;

    // Configure public methods
    this.destroy = destroyDraggable;
    this.enable = enable;
    this.getParentTag = () => m_draggableTag;

    // Config default values
    configure();

    // Begin setup
    setup();

    function setup() {
        m_parentTag = domJS.getTag(parentTag);

        if (!m_parentTag) {
            console.error(`Draggable: domJS. parent tag ${parentTag} was not found.`);
            return;
        }

        m_containerTag = domJS.getTag(containerTag);
        setOptionValues();
        installDOM();
    }

    function setOptionValues() {
        m_enable = m_config.enable;
        m_axis = m_config.axis === "x" ? 0 : (m_config.axis === "y" ? 1 : null);
    }

    function installDOM() {
        const tagConfig = {
            class: m_config.css.draggable,
            prop: m_config.prop,
            attr: m_config.attr
        };
        m_draggableTag = domJS.createTag(m_config.tag.draggable, tagConfig);
        domJS.append(m_parentTag, m_draggableTag);
        setupEventHandler();
        setEnable(m_enable);
        finishSetup();
    }

    function setupEventHandler() {
        document.addEventListener("touchstart", dragStart, false);
        document.addEventListener("touchend", dragEnd, false);
        document.addEventListener("touchmove", drag, false);

        document.addEventListener("mousedown", dragStart, false);
        document.addEventListener("mouseup", dragEnd, false);
        document.addEventListener("mousemove", drag, false);
    }

    function dragStart(ev) {
        if (m_enable) {
            m_bounding = m_containerTag ? m_containerTag.getBoundingClientRect() : null;
            m_xOffset = m_draggableTag.offsetLeft;
            m_yOffset = m_draggableTag.offsetTop;

            let m_initialCenter = [];

            if (ev.type === "touchstart") {
                m_initialX = ev.touches[0].clientX;
                m_initialY = ev.touches[0].clientY;
            } else {
                m_initialX = ev.clientX;
                m_initialY = ev.clientY;
            }

            if (ev.target === m_draggableTag) { //|| ev.target.closest(m_config.tag.draggable)) {
                m_active = true;
            }

            if (m_active && m_config.fnDragStart) {
                m_config.fnDragStart({ draggable: self, ev: ev });
            }
        }
    }

    function dragEnd(ev) {
        if (m_enable) {
            if (m_active && m_config.fnDragEnd) {
                m_config.fnDragEnd({ draggable: self, ev: ev });
            }

            m_active = false;
        }
    }

    function drag(ev) {
        if (m_enable && m_active) {
            ev.preventDefault();

            let mouseEvent = ev.type === "touchmove" ? ev.touches[0] : ev;

            let clientX = mouseEvent.clientX;
            let clientY = mouseEvent.clientY;

            if (m_bounding) {
                clientX = Math.max(m_bounding.left, Math.min(clientX, m_bounding.right));
                clientY = Math.max(m_bounding.top, Math.min(clientY, m_bounding.bottom));
            }

            let currentX = m_axis !== 1 ? clientX - m_initialX : 0;
            let currentY = m_axis !== 0 ? clientY - m_initialY : 0;

            if (Array.isArray(m_config.grid) && m_config.grid.length === 2) {
                if (m_bounding) {
                    currentX = getAxisStep(currentX, m_config.grid[0], m_bounding.left - m_initialX, m_bounding.right - m_initialX);
                    currentY = getAxisStep(currentY, m_config.grid[1], m_bounding.top - m_initialY, m_bounding.bottom - m_initialY);
                } else {
                    currentX = getAxisStep(currentX, m_config.grid[0]);
                    currentY = getAxisStep(currentY, m_config.grid[1]);
                }
            }

            setPosition(currentX, currentY);

            if (m_config.fnDrag && (currentX !== 0 || currentY !== 0)) {
                m_config.fnDrag({ draggable: self, ev: ev });
            }
        }
    }

    function getAxisStep(current, step, min = null, max = null) {
        if (current !== 0) {
            if (step === 0) {
                return 0;
            } else {
                let value = Math.round(current / step);
                if (max !== null && value * step > max) {
                    return (value - 1) * step;
                }
                if (min !== null && value * step < min) {
                    return (value + 1) * step;
                }
                return value * step;
            }
        }
    }

    function setPosition(xPos, yPos) {
        m_draggableTag.style.left = m_xOffset + xPos + "px";
        m_draggableTag.style.top = m_yOffset + yPos + "px";
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
    }

    function destroyDraggable() {
        domJS.remove(m_draggableTag);
    }

    function finishSetup() {
        // Execute complete callback function
        if (m_config.fnComplete) {
            m_config.fnComplete({ draggable: self });
        }
    }

    function configure() {
        m_config = {
            css: {
                draggable: "draggable",
            },
            tag: {
                draggable: "draggable",
            },
            enable: true,
            axis: null,
            grid: null, //[x, y]
            attr: {},
            prop: {},
            fnDragStart: (context) => {
                // Nothing executes by default
            },
            fnDragEnd: (context) => {
                // Nothing executes by default
            },
            fnDrag: (context) => {
                // Nothing executes by default
            }
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}