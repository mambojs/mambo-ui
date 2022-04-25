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
 *  File : MamboRating.js
 *******************************************/
function MamboRating(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error(`Rating: parentEle parameter not passed in.`);
        return;
    }

    const self = this;
    const m_utils = g_mamboUtils;

    // HTML tag variables
    let m_parentTag;
    let m_ratingParentTag;
    let m_ratingEmptyTag;
    let m_ratingSelectedTag;
    let m_ratingHoverTag;

    let m_config;
    let m_value = 0;
    let m_enable = true;

    // Configure public methods
    this.destroy = destroyRating;
    this.enable = enable;
    this.getParentTag = () => m_ratingParentTag;
    this.value = value;

    // Config default values
    configure();

    // Begin setup
    setup();

    function setup() {
        m_parentTag = g_mamboDomJS.getTag(parentTag);

        if (!m_parentTag) {
            console.error(`Rating: g_mamboDomJS. parent tag ${parentTag} was not found.`);
            return;
        }

        setOptionValues();
        installDOM();
    }

    function setOptionValues() {
        m_value = m_config.value;
        m_enable = m_config.enable;
    }

    function installDOM() {
        installTags();
        finishSetup();
    }

    function installTags() {
        m_ratingParentTag = g_mamboDomJS.createTag(m_config.tag.rating, { class: m_config.css.parent });
        g_mamboDomJS.append(m_parentTag, m_ratingParentTag);

        installLayers();
        setupEventHandler();

        setValue(m_value);
        setEnable(m_enable);
    }

    function installLayers() {
        m_ratingEmptyTag = g_mamboDomJS.createTag(m_config.tag.empty, { class: m_config.css.empty });
        g_mamboDomJS.append(m_ratingParentTag, m_ratingEmptyTag);

        m_ratingSelectedTag = g_mamboDomJS.createTag(m_config.tag.selected, { class: m_config.css.selected });
        g_mamboDomJS.append(m_ratingParentTag, m_ratingSelectedTag);

        m_ratingHoverTag = g_mamboDomJS.createTag(m_config.tag.hover, { class: m_config.css.hover });
        g_mamboDomJS.append(m_ratingParentTag, m_ratingHoverTag);

        installStars();
    }

    function installStars() {
        for (let i = 0; i < m_config.max; i++) {
            let emptyStarTag = g_mamboDomJS.createTag(m_config.tag.emptyStar, { class: m_config.css.emptyStar });
            g_mamboDomJS.append(m_ratingEmptyTag, emptyStarTag);

            let selectedStarTag = g_mamboDomJS.createTag(m_config.tag.selectedStar, { class: m_config.css.selectedStar });
            g_mamboDomJS.append(m_ratingSelectedTag, selectedStarTag);

            let hoverStarTag = g_mamboDomJS.createTag(m_config.tag.hoverStar, { class: m_config.css.hoverStar });
            g_mamboDomJS.append(m_ratingHoverTag, hoverStarTag);
        }
    }

    function setupEventHandler() {
        m_ratingParentTag.addEventListener("click", selectValue);
        m_ratingParentTag.addEventListener("mouseenter", setHoverValue);
        m_ratingParentTag.addEventListener("mousemove", setHoverValue);
        m_ratingParentTag.addEventListener("mouseleave", hideHoverLayer);
    }

    function selectValue(ev) {
        if (m_enable) {
            setValue(getHoverValue(ev));

            if (m_config.fnSelect) {
                m_config.fnSelect({ rating: self, ev: ev });
            }
        }
    }

    function setHoverValue(ev) {
        if (m_enable) {
            m_ratingSelectedTag.style.display = "none";
            m_ratingHoverTag.style.display = "block";
            m_ratingHoverTag.style.width = getStarWidth() * getHoverValue(ev) + "px";
        }
    }

    function hideHoverLayer(ev) {
        if (m_enable) {
            m_ratingHoverTag.style.display = "none";
            m_ratingSelectedTag.style.display = "block";
        }
    }

    function getStarWidth() {
        return m_ratingEmptyTag.clientWidth / m_config.max;
    }

    function getLeftPosition(ev) {
        return ev.clientX - m_ratingParentTag.getBoundingClientRect().left;
    }

    function getHoverValue(ev) {
        return Math.ceil(getLeftPosition(ev) / getStarWidth());
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
        m_ratingSelectedTag.style.display = "block";
        m_ratingHoverTag.style.display = "none";
        m_ratingSelectedTag.style.width = getStarWidth() * m_value + "px";
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
        m_enable ? g_mamboDomJS.removeClass(m_ratingParentTag, m_config.css.disabled) : g_mamboDomJS.addClass(m_ratingParentTag, m_config.css.disabled);
    }

    function destroyRating() {
        g_mamboDomJS.remove(m_ratingParentTag);
    }

    function finishSetup() {
        // Execute complete callback function
        if (m_config.fnComplete) {
            m_config.fnComplete({ rating: self });
        }
    }

    function configure() {
        m_config = {
            css: {
                parent: "rating-parent",
                empty: "rating-empty",
                selected: "rating-selected",
                hover: "rating-hover",
                emptyStar: "rating-empty-star",
                selectedStar: "rating-selected-star",
                hoverStar: "rating-hover-star",
                disabled: "rating-disabled"
            },
            tag: {
                rating: "sc-rating",
                empty: "rating-empty",
                selected: "rating-selected",
                hover: "rating-hover",
                emptyStar: "rating-empty-star",
                selectedStar: "rating-selected-star",
                hoverStar: "rating-hover-star"
            },
            value: 0,
            max: 5,
            enable: true
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}