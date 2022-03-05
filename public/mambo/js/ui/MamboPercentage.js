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
 *  File : MamboPercentage.js
 *******************************************/
function MamboPercentage(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error(`Percentage: parentEle parameter not passed in.`);
        return;
    }

    const self = this;
    const m_utils = g_mamboObjMgr.get("MamboUtilities");

    // HTML tag variables
    let m_parentTag;
    let m_percentageParentTag;
    let m_percentageBarTag;
    let m_percentageTextTag;

    let m_config;
    let m_value = 0;

    // Configure public methods
    this.destroy = destroyPercentage;
    this.getParentTag = () => m_percentageParentTag;
    this.value = value;

    // Config default values
    configure();

    // Begin setup
    setup();

    function setup() {
        m_parentTag = domJS.getTag(parentTag);

        if (!m_parentTag) {
            console.error(`Percentage: domJS. parent tag ${parentTag} was not found.`);
            return;
        }

        setOptionValues();
        installDOM();
    }

    function setOptionValues() {
        m_value = m_config.value;
    }

    function installDOM() {
        installTags();
        finishSetup();
    }

    function installTags() {
        m_percentageParentTag = domJS.createTag(m_config.tag.percentage, { class: m_config.css.parent });
        domJS.append(m_parentTag, m_percentageParentTag);

        m_percentageBarTag = domJS.createTag(m_config.tag.bar, { class: m_config.css.bar });
        domJS.append(m_percentageParentTag, m_percentageBarTag);

        m_percentageTextTag = domJS.createTag(m_config.tag.text, { class: m_config.css.text });
        domJS.append(m_percentageBarTag, m_percentageTextTag);

        setValue(m_value);
    }

    function value(context = {}) {
        if (typeof context.value === 'undefined') {
            return m_value;
        } else {
            setValue(context.value);
        }
    }

    function setValue(value) {
        m_value = value;
        setText();
        setRange();
        setBarWidth();
    }

    function setText() {
        m_percentageTextTag.innerText = m_utils.formatPercentage(m_value, m_config.decimals);
    }

    function setBarWidth() {
        let width = m_percentageParentTag.clientWidth * Math.min(Math.max(0, m_value), 1);
        m_percentageBarTag.style.width = width + "px";
    }

    function setRange() {
        if (m_utils.isArray(m_config.ranges) && m_config.ranges.length > 0) {
            let range = m_config.ranges.find(range => {
                return m_value >= range.min && m_value <= range.max;
            });
            if (range && range.css) {
                clearRangeClasses();
                domJS.addClass(m_percentageBarTag, range.css);
            }
        }
    }

    function clearRangeClasses() {
        m_config.ranges.forEach(range => {
            domJS.removeClass(m_percentageBarTag, range.css);
        });
    }

    function destroyPercentage() {
        domJS.remove(m_percentageParentTag);
    }

    function finishSetup() {
        // Execute complete callback function
        if (m_config.fnComplete) {
            m_config.fnComplete({ percentage: self });
        }
    }

    function configure() {
        m_config = {
            css: {
                parent: "percentage-parent",
                bar: "percentage-bar",
                text: "percentage-text"
            },
            tag: {
                percentage: "sc-percentage",
                bar: "percentage-bar",
                text: "percentage-text"
            },
            value: 0,
            min: 0,
            max: 1,
            decimals: 0,
            ranges: [
                {
                    min: 0,
                    max: 0.5,
                    css: "percentage-range-low"
                },
                {
                    min: 0.5,
                    max: 1,
                    css: "percentage-range-high"
                }
            ]
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}