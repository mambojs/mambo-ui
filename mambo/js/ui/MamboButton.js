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
class MamboButton extends HTMLElement {
    constructor(initOptions) {
        super();
        const self = this;
        const m_utils = g_mamboUtils;
        const m_theme = g_mamboTheme;
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
        this.install = installSelf;
        this.text = text;
        this.select = handleExternalSelect;
        this.setup = setup;

        if (initOptions) setup(initOptions);

        function setup(options) {
            configure(options);
            setOptionValues();
            installDOM();
        }

        function setOptionValues() {
            m_text = m_config.text;
            m_enable = m_config.enable;
        }

        function installDOM() {
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
            m_buttonTag = g_mamboDomJS.createTag(m_config.tag, tagConfig);

            //check if an img was provided
            if (m_config.img) {
                insertGraphic(m_config.img, addImg);
            }

            //check if an svg was provided
            if (m_config.svg) {
                insertGraphic(m_config.svg, addSVG);
            }
            self.appendChild(m_buttonTag);
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
            let imgTag = g_mamboDomJS.createTag("img", tagConfig);
            m_imageList.push(imgTag);
            g_mamboDomJS.append(m_buttonTag, imgTag);
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
            let svgTag = g_mamboDomJS.createSVGTag("svg", tagConfig);
            g_mamboDomJS.append(m_buttonTag, svgTag);
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
                g_mamboDomJS.setAttr(m_imageList[0], { "src": m_config.img.hover });
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
                g_mamboDomJS.setAttr(m_imageList[0], { "src": m_config.img.attr.src });
            }
        }

        function mouseEnterOverButton(tag) {
            if (!g_mamboDomJS.hasClass(tag, m_config.css.selected)) {
                g_mamboDomJS.addClass(tag, m_config.css.hover);
            }
        }

        function mouseLeaveOverButton(tag) {
            g_mamboDomJS.removeClass(tag, m_config.css.hover);
        }

        function setSrcAttr(tag, src) {
            g_mamboDomJS.setAttr(tag, { "src": src });
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
            g_mamboDomJS.addClass(m_buttonTag, m_config.css.selected);
        }

        function deselectBtn() {
            g_mamboDomJS.removeClass(m_buttonTag, m_config.css.selected);
        }

        function text(context) {
            if (!context) {
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
            m_enable ? g_mamboDomJS.removeClass(m_buttonTag, m_config.css.disabled) : g_mamboDomJS.addClass(m_buttonTag, m_config.css.disabled);
        }

        function finishSetup() {
            // Install component into parent
            if (m_config.install) installSelf(m_parentTag, m_config.installPrepend);

            // Execute complete callback function
            if (m_config.fnComplete) {
                m_config.fnComplete({ button: self });
            }
        }

        function installSelf(parentTag, prepend) {
            m_parentTag = parentTag ? parentTag : m_parentTag;
            m_parentTag = g_mamboDomJS.appendSelfToParentTag(m_parentTag, self, prepend);
        }

        function configure(options) {
            m_config = {
                enable: true,
                id: "Button ID was not specified",
                install: true,
                installPrepend: false,
                parentTag: undefined,
                preventDefault: true,
                stopPropagation: true,
                tag: "button",
                text: "",
                theme: "default",
            };

            // If options provided, override default config
            if (options) {
                if (options.tag === "a") {
                    m_config.preventDefault = false;
                    m_config.stopPropagation = false;
                }

                m_config = m_utils.extend(true, m_config, options);
            }

            if (m_config.parentTag) {
                m_parentTag = g_mamboDomJS.getTag(m_config.parentTag);
            }

            m_config.css = m_utils.extend(true, m_theme.getTheme({
                name: m_config.theme,
                control: "mambo-button"
            }), m_config.css);
        }
    }
}
// Must ALWAYS define the new element as a Native Web Component
customElements.define('mambo-button', MamboButton);