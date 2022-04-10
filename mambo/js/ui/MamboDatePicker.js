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
 *  File : MamboDatePicker.js
 *******************************************/
class MamboDatePicker extends HTMLElement {
    constructor(initOptions){
        super();
        const self = this;
        const m_utils = g_mamboUtils;
        const m_theme = g_mamboTheme;
        const m_graphics = g_mamboGraphics;
        const m_dateMgr = g_mamboDateManager;

        // HTML tag variables
        let m_parentTag;
        let m_datePickerParentTag;
        let m_input;
        let m_dropdownWrapperTag;
        let m_dropdown;
        let m_calendar;

        let m_config;
        let m_value = null;
        let m_previous_text = "";

        // Configure public methods
        this.destroy = destroyDatePicker;
        this.getParentTag = () => m_datePickerParentTag;
        this.value = value;
        this.setup = setup;
        this.insta = installSelf;

        if (initOptions) setup(initOptions);

        function setup() {
            
            m_parentTag = g_mamboDomJS.getTag(initOptions.parentTag);
            configure();
            installDOM();
        }

        function installDOM() {

            m_datePickerParentTag = g_mamboDomJS.createTag(m_config.tag.parent, { class: m_config.css.parent });
            

            g_mamboDomJS.append(m_parentTag,m_datePickerParentTag);

            installInput();
            installDropdown();
            finishSetup();
        }

        function installInput() {
            let input = m_utils.extend(true, {}, m_config.input);
            input.css = m_utils.extend(true, m_config.css.input, input.css);
            m_input = new MamboInput(m_datePickerParentTag, input);
        }

        function installDropdown() {
            //create the wrapper div container for the input
            m_dropdownWrapperTag = g_mamboDomJS.createTag("div", { class: m_config.css.dropdownWrapper });
            g_mamboDomJS.append(m_datePickerParentTag, m_dropdownWrapperTag);

            let dropdown = m_utils.extend(true, {}, m_config.dropdown);
            dropdown.css = m_utils.extend(true, m_config.css.dropdown, dropdown.css);

            dropdown.fnBeforeClose = (context) => {
                const result = m_config.dropdown.fnBeforeClose ? m_config.dropdown.fnBeforeClose(context) : true;
                return (!context.ev || !m_input.getTag().contains(context.ev.target)) && result;
            };
            dropdown.fnComplete = (context) => {
                installCalendar(context.dropdown);

                if (m_config.dropdown.fnComplete) {
                    m_config.dropdown.fnComplete(context);
                }
            };

            m_dropdown = new MamboDropdown(m_dropdownWrapperTag, dropdown);
        }

        function installCalendar(dropdown) {
            const contentTag = dropdown.getContentTag();
            contentTag.innerHTML = '';

            let calendar = m_utils.extend(true, {}, m_config.calendar);
            calendar.css = m_utils.extend(true, m_config.css.calendar, calendar.css);

            calendar.format = m_config.format;
            calendar.footer = m_config.footer;
            calendar.start = m_config.start;
            calendar.depth = m_config.depth;
            calendar.min = m_config.min;
            calendar.max = m_config.max;
            calendar.fnSelect = (context) => {
                m_value = context.calendar.value();
                let text = m_dateMgr.format(m_value, m_config.format);
                m_input.value({ value: text });
                m_previous_text = text;
                dropdown.close();

                if (m_config.calendar.fnSelect) {
                    m_config.calendar.fnSelect(context);
                }

                if (m_config.fnSelect) {
                    m_config.fnSelect({ datePicker: self, ev: context.ev });
                }
            };

            m_calendar = new MamboCalendar(contentTag, calendar);

            if (m_config.value) {
                setValue(m_config.value);
            }
        }

        function value(context = {}) {
            if (typeof context.value === 'undefined') {
                return m_value;
            } else {
                setValue(context.value);
            }
        }

        function setValue(value) {
            let date = m_dateMgr.getDate(value, m_config.format);
            m_calendar.value({ value: date });

            m_value = m_calendar.value();
            let text = m_dateMgr.format(m_value, m_config.format);
            m_input.value({ value: text });
            m_previous_text = text;
        }

        function handleBlur(ev) {
            let text = m_input.value();
            if (m_previous_text !== text) {
                setValue(text);

                if (m_config.fnSelect) {
                    m_config.fnSelect({ datePicker: self, ev: ev });
                }
            }
        }

        function destroyDatePicker() {
            g_mamboDomJS.remove(m_datePickerParentTag);
        }

        function finishSetup() {
            // Execute complete callback function
            if (m_config.fnComplete) {
                installSelf(m_parentTag, m_config.installPrepend);
                m_config.fnComplete({ timePicker: self });
            }
        }
        function installSelf(parentTag, prepend) {
            m_parentTag = parentTag ? parentTag : m_parentTag;
            m_parentTag = g_mamboDomJS.appendSelfToParentTag(m_parentTag, self, prepend);
        }

        function configure() {
            m_config = {
                theme: "default",
                tag: {
                    parent: "sc-date-picker",
                },
                input: {
                    events: [
                        {
                            name: 'blur',
                            fn: (context) => {
                                handleBlur(context.ev);
                            }
                        },
                    ]
                },
                dropdown: {
                    button: {
                        text: "",
                        svg: {
                            element: m_graphics.getSVG({ name: "calendar" })
                        }
                    }
                },
                calendar: {},
                format: "M/D/YYYY",
                value: null,
                footer: "dddd, MMMM D, YYYY",
                start: "month",
                depth: "month",
                min: new Date(1900, 0, 1),
                max: new Date(2099, 11, 31),
                fnSelect: (context) => {
                    // Nothing executes by default
                }
            };

            // If initOptions provided, override default config
            if (initOptions) {
                m_config = m_utils.extend(true, m_config, initOptions);
            }

            m_config.css = m_utils.extend(true, m_theme.getTheme({
                name: m_config.theme,
                control: "mambo-date-picker"
            }), m_config.css);
        }

    }
    
}
customElements.define('mambo-date-picker', MamboDatePicker);