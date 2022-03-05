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
 *  File : MamboButton.js
 *******************************************/
function MamboButton(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error(`Button: parentEle parameter not passed in.`);
        return;
    }

    const self = this;
    const m_utils = g_mamboObjMgr.get("MamboUtilities");
    const m_themes = g_mamboObjMgr.get("MamboTheme");
    const m_imageList = [];

    let m_parentTag;
    let m_config;
    let m_buttonTag;
    let m_text = "";
    let m_enable = true;

    this.deselect = deselectBtn;
    this.enable = enable;
    this.getConfig = () => m_config;
    this.getId = () => m_config.id;
    this.getImageTagById = getImageTagById;
    this.getParentTag = () => m_parentTag;
    this.getTag = () => m_buttonTag;
    this.text = text;
    this.select = handleExternalSelect;

    // Config default values
    configure();

    // Begin setup
    setup();

    function setup() {
        setOptionValues();
        installDOM();
    }

    function setOptionValues() {
        m_text = m_config.text;
        m_enable = m_config.enable;
    }

    function installDOM() {
        m_parentTag = domJS.getTag(parentTag);

        if (!m_parentTag) {
            console.error(`Button: domJS. parent tag ${parentTag} was not found.`);
            return;
        }

        installTag();
        finishSetup();
    }

    function installTag() {
        const tagConfig = {
            class: m_config.css.button,
            prop: m_config.prop,
            attr: m_config.attr,
            text: m_config.text,
            event: {
                click: handleClick,
                mouseenter: () => {
                    mouseEnterOverButton(m_buttonTag);
                    mouseEnterOverImage();
                },
                mouseleave: () => {
                    mouseLeaveOverButton(m_buttonTag);
                    mouseLeaveOverImage();
                }
            }
        };
        m_buttonTag = domJS.createTag(m_config.tag, tagConfig);

        //check if an img was provided
        if (m_config.img) {
            insertGraphic(m_config.img, addImg);
        }

        //check if an svg was provided
        if (m_config.svg) {
            insertGraphic(m_config.svg, addSVG);
        }

        domJS.append(m_parentTag, m_buttonTag);
        setEnable(m_enable);
    }

    function insertGraphic(graphic, func) {
        //checking if the img is an array
        if (Array.isArray(graphic)) {
            graphic.forEach((graphic => {
                func(graphic);
            }));
        } else {
            func(graphic);
        }
    }

    function addImg(img) {
        img.css = img.css ? img.css : m_config.css;
        const tagConfig = {
            class: img.css.img,
            prop: img.prop,
            attr: img.attr
        };
        let imgTag = domJS.createTag("img", tagConfig);
        m_imageList.push(imgTag);
        domJS.append(m_buttonTag, imgTag);
    }

    function addSVG(svg) {
        svg.attr = m_utils.extend(true, svg.element.attr, svg.attr);
        let children = [];
        svg.element.paths.forEach((path => {
            children.push({
                name: "path",
                attrs: { d: path }
            });
        }));
        const tagConfig = {
            prop: svg.prop,
            attr: svg.attr,
            children
        };
        let svgTag = domJS.createSVGTag("svg", tagConfig);
        domJS.append(m_buttonTag, svgTag);
    }

    function getImageTagById(id) {
        return m_imageList.find(img => img.id === id);
    }

    function handleClick(ev) {
        if (m_enable) {
            selectBtn();

            if (m_config.preventDefault) {
                ev.preventDefault();
            }

            if (m_config.stopPropagation) {
                ev.stopPropagation();
            }

            // Invoke callback for each button
            if (m_config.fnClick) {
                m_config.fnClick({
                    button: self,
                    ev: ev
                });
            }

            // Invoke callback for group
            if (m_config.fnGroupClick) {
                m_config.fnGroupClick({
                    button: self,
                    ev: ev
                });
            }
        }
    }

    function mouseEnterOverImage() {
        if (m_config.img && Array.isArray(m_config.img)) {
            m_config.img.forEach((img, i) => {
                if (img.hover) {
                    setSrcAttr(m_imageList[i], img.hover);
                }
            });
        } else if (m_config.img && m_config.img.hover) {
            domJS.setAttr(m_imageList[0], { "src": m_config.img.hover });
        }
    }

    function mouseLeaveOverImage() {
        if (m_config.img && Array.isArray(m_config.img)) {
            m_config.img.forEach((img, i) => {
                if (img.hover) {
                    setSrcAttr(m_imageList[i], img.attr.src);
                }
            });
        } else if (m_config.img && m_config.img.hover) {
            domJS.setAttr(m_imageList[0], { "src": m_config.img.attr.src });
        }
    }

    function mouseEnterOverButton(tag) {
        if (!domJS.hasClass(tag, m_config.css.selected)) {
            domJS.addClass(tag, m_config.css.hover);
        }
    }

    function mouseLeaveOverButton(tag) {
        domJS.removeClass(tag, m_config.css.hover);
    }

    function setSrcAttr(tag, src) {
        domJS.setAttr(tag, { "src": src });
    }

    function handleExternalSelect(context) {
        if (m_enable) {
            if (context.notTrigger) {
                selectBtn();
            } else {
                m_buttonTag.click();
            }
        }
    }

    function selectBtn() {
        domJS.addClass(m_buttonTag, m_config.css.selected);
    }

    function deselectBtn() {
        domJS.removeClass(m_buttonTag, m_config.css.selected);
    }

    function text(context) {
        if (typeof context.text === 'undefined') {
            return m_text;
        } else {
            m_buttonTag.innerText = context.text;
            m_text = context.text;
        }
    }

    function enable(enable) {
        if (!enable) {
            return m_enable;
        } else {
            setEnable(enable);
        }
    }

    function setEnable(enable) {
        m_enable = enable;
        m_enable ? domJS.removeClass(m_buttonTag, m_config.css.disabled) : domJS.addClass(m_buttonTag, m_config.css.disabled);
    }

    function finishSetup() {
        // Execute complete callback function
        if (m_config.fnComplete) {
            m_config.fnComplete({ button: self });
        }
    }

    function configure() {
        m_config = {
            tag: "button",
            id: "Button ID was not specified",
            text: "",
            enable: true,
            theme: "default",
            preventDefault: true,
            stopPropagation: true
        };

        // If options provided, override default config
        if (options) {
            if (options.tag === "a") {
                m_config.preventDefault = false;
                m_config.stopPropagation = false;
            }

            m_config = m_utils.extend(true, m_config, options);
        }

        m_config.css = m_utils.extend(true, m_themes.getTheme({
            name: m_config.theme,
            control: "button"
        }), m_config.css);
    }
}
