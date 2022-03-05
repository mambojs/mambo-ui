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
 *  File : MamboSlider.js
 *******************************************/
function MamboSlider(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error(`Slider: parentEle parameter not passed in.`);
        return;
    }

    const self = this;
    const m_utils = g_mamboObjMgr.get("MamboUtilities");

    // HTML tag variables
    let m_parentTag;
    let m_sliderParentTag;
    let m_sliderWrapperTag;
    let m_trackTag;
    let m_selectionTag;
    let m_handleTag;
    let m_stepTags = [];

    let m_config;
    let m_horizontal = true;
    let m_css;
    let m_enable = true;
    let m_value = 0;
    let m_stepLength;

    // Configure public methods
    this.destroy = destroySlider;
    this.enable = enable;
    this.getParentTag = () => m_sliderParentTag;
    this.value = value;

    // Config default values
    configure();

    // Begin setup
    setup();

    function setup() {
        m_parentTag = domJS.getTag(parentTag);

        if (!m_parentTag) {
            console.error(`Slider: domJS. parent tag ${parentTag} was not found.`);
            return;
        }

        setOptionValues();
        installDOM();
    }

    function setOptionValues() {
        m_enable = m_config.enable;
        m_value = m_config.value;
        m_horizontal = m_config.orientation !== "vertical";
        m_css = m_horizontal ? m_config.css.horizontal : m_config.css.vertical;
    }

    function installDOM() {
        installTags();
        finishSetup();
    }

    function installTags() {
        m_sliderParentTag = domJS.createTag(m_config.tag.slider, { class: m_css.parent });
        domJS.append(m_parentTag, m_sliderParentTag);
        m_sliderWrapperTag = domJS.createTag(m_config.tag.wrapper, { class: m_css.wrapper });

        if (m_config.showButtons) {
            if (m_horizontal) {
                installButton(m_config.decreaseButton, m_css.decreaseButton, decrease);
            } else {
                installButton(m_config.increaseButton, m_css.increaseButton, increase);
            }
        }

        domJS.append(m_sliderParentTag, m_sliderWrapperTag);

        if (m_config.showButtons) {
            if (m_horizontal) {
                installButton(m_config.increaseButton, m_css.increaseButton, increase);
            } else {
                installButton(m_config.decreaseButton, m_css.decreaseButton, decrease);
            }
        }

        installTrack();
        installHandle();
        setEnable(m_enable);
        setValue(m_value);
    }

    function installButton(config, css, fnClick) {
        let button = m_utils.extend(true, {}, config);
        button.css = m_utils.extend(true, css, button.css);

        button.fnClick = (context) => {
            fnClick();

            if (m_config.fnSelect) {
                m_config.fnSelect({ slider: self, ev: context.ev });
            }

            if (config.fnClick) {
                config.fnClick(context);
            }
        };

        new MamboButton(m_sliderParentTag, button);
    }

    function decrease() {
        setValue(m_value - m_config.step);
    }

    function increase() {
        setValue(m_value + m_config.step);
    }

    function installTrack() {
        m_trackTag = domJS.createTag(m_config.tag.track, { class: m_css.track });
        domJS.append(m_sliderWrapperTag, m_trackTag);

        m_selectionTag = domJS.createTag(m_config.tag.selection, { class: m_css.selection });
        domJS.append(m_sliderWrapperTag, m_selectionTag);

        installSteps();
    }

    function installSteps() {
        let stepsTag = domJS.createTag(m_config.tag.stepsContainer, { class: m_css.stepsContainer });
        domJS.prepend(m_sliderWrapperTag, stepsTag);

        const trackLength = m_horizontal ? m_trackTag.clientWidth : m_trackTag.clientHeight;
        const steps = Math.floor((m_config.max - m_config.min) / m_config.step);
        m_stepLength = trackLength / steps;

        for (let i = 0; i <= steps; i++) {
            let stepTag = null;
            const value = (i * m_config.step) + m_config.min;

            if ((i * m_config.step) % m_config.largeStep === 0) {
                stepTag = installLargeStep(stepsTag, value);
            } else {
                stepTag = installSmallStep(stepsTag);
            }

            stepTag.id = value;
            m_stepTags.push(stepTag);
        }
    }

    function installLargeStep(stepsTag, value) {
        let stepTag = domJS.createTag(m_config.tag.stepLarge, { class: m_css.stepLarge });
        let textTag = domJS.createTag("span", { class: m_css.stepLargeSpan, text: value.toString() });
        domJS.append(stepTag, textTag);

        if (m_horizontal) {
            domJS.append(stepsTag, stepTag);
            stepTag.style.width = m_stepLength + "px";
        } else {
            domJS.prepend(stepsTag, stepTag);
            stepTag.style.height = m_stepLength + "px";
        }

        return stepTag;
    }

    function installSmallStep(stepsTag) {
        let stepTag = domJS.createTag(m_config.tag.step, { class: m_css.step });

        if (m_horizontal) {
            domJS.append(stepsTag, stepTag);
            stepTag.style.width = m_stepLength + "px";
        } else {
            domJS.prepend(stepsTag, stepTag);
            stepTag.style.height = m_stepLength + "px";
        }

        return stepTag;
    }

    function installHandle() {
        const config = {
            css: {
                draggable: m_css.handle
            },
            tag: {
                draggable: m_config.tag.handle
            },
            axis: m_horizontal ? "x" : "y",
            grid: m_horizontal ? [m_stepLength, 0] : [0, m_stepLength],
            attr: {
                title: m_config.handleTitle
            },
            fnDragStart: (context) => {
                if (m_config.fnSlideStart) {
                    m_config.fnSlideStart({ slider: self, ev: context.ev });
                }
            },
            fnDragEnd: updateValue,
            fnDrag: updateSelection
        };

        m_handleTag = new MamboDraggable(m_sliderWrapperTag, m_sliderWrapperTag, config);
    }

    function updateValue(context) {
        m_value = Number(m_stepTags[getSelectedIndex()].id);
        setHandlePosition();

        if (m_config.fnSelect) {
            m_config.fnSelect({ slider: self, ev: context.ev });
        }
    }

    function updateSelection(context) {
        setSelectionPosition();

        if (m_config.fnSlide) {
            m_config.fnSlide({ slider: self, ev: context.ev });
        }
    }

    function getSelectedIndex() {
        let handleOffset = m_horizontal ? m_handleTag.getParentTag().offsetLeft : (m_sliderWrapperTag.clientHeight - m_handleTag.getParentTag().offsetTop);

        for (let i = 0; i < m_stepTags.length; i++) {
            let stepOffset = m_horizontal ? m_stepTags[i].offsetLeft : (m_sliderWrapperTag.clientHeight - m_stepTags[i].offsetTop);
            if (handleOffset <= stepOffset) {
                if ((stepOffset - handleOffset) > m_stepLength / 2 && i > 0) {
                    return i - 1;
                }
                return i;
            }
        }

        return 0;
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
        m_enable ? domJS.removeClass(m_sliderParentTag, m_config.css.disabled) : domJS.addClass(m_sliderParentTag, m_config.css.disabled);
        m_handleTag.enable({ enable: enable });
    }

    function value(context = {}) {
        if (typeof context.value === 'undefined') {
            return m_value;
        } else {
            setValue(context.value);
        }
    }

    function setValue(value) {
        m_value = getValidValue(value);
        setHandlePosition();
    }

    function setHandlePosition() {
        let stepTag = m_stepTags.find(tag => tag.id === m_value.toString());
        let handleTag = m_handleTag.getParentTag();

        if (m_horizontal) {
            const length = stepTag.getBoundingClientRect().left - m_sliderWrapperTag.getBoundingClientRect().left - (handleTag.clientWidth / 2);
            handleTag.style.left = length + "px";
        } else {
            const length = stepTag.getBoundingClientRect().top - m_sliderWrapperTag.getBoundingClientRect().top - (handleTag.clientHeight / 2);
            handleTag.style.top = length + "px";
        }

        setSelectionPosition();
    }

    function setSelectionPosition() {
        let handleTag = m_handleTag.getParentTag();

        if (m_horizontal) {
            m_selectionTag.style.width = handleTag.offsetLeft + "px";
        } else {
            const length = m_sliderWrapperTag.getBoundingClientRect().bottom - handleTag.getBoundingClientRect().bottom;
            m_selectionTag.style.height = length + "px";
        }
    }

    function getValidValue(value) {
        if (value < m_config.min)
            return m_config.min;
        if (value > m_config.max)
            return m_config.max;
        if ((value - m_config.min) % m_config.step !== 0) {
            let steps = Math.floor((value - m_config.min) / m_config.step);
            return m_config.min + steps * m_config.step;
        }
        return value;
    }

    function destroySlider() {
        domJS.remove(m_sliderParentTag);
    }

    function finishSetup() {
        // Execute complete callback function
        if (m_config.fnComplete) {
            m_config.fnComplete({ slider: self });
        }
    }

    function configure() {
        m_config = {
            css: {
                horizontal: {
                    parent: "slider-parent-horizontal",
                    wrapper: "slider-wrapper-horizontal",
                    track: "slider-track-horizontal",
                    handle: "slider-handle-horizontal",
                    stepsContainer: "slider-steps-container-horizontal",
                    step: "slider-step-horizontal",
                    stepLarge: "slider-step-large-horizontal",
                    stepLargeSpan: "slider-step-large-span-horizontal",
                    selection: "slider-selection-horizontal",
                    decreaseButton: {
                        button: "slider-button-decrease-horizontal"
                    },
                    increaseButton: {
                        button: "slider-button-increase-horizontal"
                    }
                },
                vertical: {
                    parent: "slider-parent-vertical",
                    wrapper: "slider-wrapper-vertical",
                    track: "slider-track-vertical",
                    handle: "slider-handle-vertical",
                    stepsContainer: "slider-steps-container-vertical",
                    step: "slider-step-vertical",
                    stepLarge: "slider-step-large-vertical",
                    stepLargeSpan: "slider-step-large-span-vertical",
                    selection: "slider-selection-vertical",
                    decreaseButton: {
                        button: "slider-button-decrease-vertical"
                    },
                    increaseButton: {
                        button: "slider-button-increase-vertical"
                    }
                },
                disabled: "slider-disabled"
            },
            tag: {
                slider: "sc-slider",
                wrapper: "slider-wrapper",
                track: "slider-track",
                handle: "slider-handle",
                stepsContainer: "slider-steps-container",
                step: "slider-step",
                stepLarge: "slider-step-large",
                selection: "slider-selection",
            },
            value: 0,
            min: -10,
            max: 10,
            step: 1,
            largeStep: 5,
            orientation: "horizontal",
            handleTitle: "drag",
            enable: true,
            showButtons: true,
            decreaseButton: {
                attr: {
                    title: "Decrease"
                }
            },
            increaseButton: {
                attr: {
                    title: "Increase"
                }
            },
            fnSelect: (context) => {
                // Nothing executes by default
            },
            fnSlideStart: (context) => {
                // Nothing executes by default
            },
            fnSlide: (context) => {
                // Nothing executes by default
            }
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}
