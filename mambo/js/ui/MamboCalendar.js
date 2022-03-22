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
 *  File : MamboCalendar.js
 *******************************************/
function MamboCalendar(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error(`Calendar: parentTag parameter was not passed in.`);
        return;
    }

    const self = this;
    const m_utils = g_mamboUtils;
    const m_dateMgr = g_mamboDateManager;

    // HTML tag variables
    let m_parentTag;
    let m_calendarParentTag;
    let m_headerButtonGroup;
    let m_headerButtonsList = [];
    let m_bodyTag;
    let m_bodyHeaderTag;
    let m_bodyContentTag;
    let m_datesHeaderGrid;
    let m_datesButtonGroup;

    let m_config;
    let m_idFormat = "YYYY/M/D";
    let m_value;
    let m_viewDate;
    let m_depths = { month: 0, year: 1, decade: 2, century: 3 };
    let m_depth = 0;
    let m_minDepth = 0;
    let m_minDate;
    let m_maxDate;

    // Configure public methods
    this.destroy = destroyCalendar;
    this.navigateToFuture = navigateToFuture;
    this.navigateToPast = navigateToPast;
    this.navigateUp = navigateUp;
    this.getParentTag = () => m_calendarParentTag;
    this.value = value;

    // Config default values
    configure();

    // Begin setup
    setup();

    function setup() {
        m_parentTag = g_mamboDomJS.getTag(parentTag);

        if (!m_parentTag) {
            console.error(`Calendar: g_mamboDomJS. parent tag ${parentTag} was not found.`);
            return;
        }

        setOptionValues();
        installDOM();
    }

    function setOptionValues() {
        m_depth = typeof m_depths[m_config.start] !== "undefined" ? m_depths[m_config.start] : 0;
        m_minDepth = typeof m_depths[m_config.depth] !== "undefined" ? m_depths[m_config.depth] : 0;
        m_minDepth = m_minDepth > m_depth ? m_depth : m_minDepth;

        m_minDate = m_dateMgr.getDate(m_config.min, m_config.format);
        m_maxDate = m_dateMgr.getDate(m_config.max, m_config.format);

        m_value = getDefaultValue();
        setViewDate(m_value);
    }

    function installDOM() {
        m_calendarParentTag = g_mamboDomJS.createTag(m_config.tag.parent, { class: m_config.css.parent });

        m_parentTag.innerHTML = '';
        g_mamboDomJS.append(m_parentTag, m_calendarParentTag);

        installHeader();
        installBody();
        installFooter();

        finishSetup();
    }

    //Header

    function installHeader() {
        let buttonGroup = m_utils.extend(true, {}, m_config.headerButtonGroup);
        buttonGroup.css = m_utils.extend(true, m_config.css.headerButtonGroup, buttonGroup.css);

        buttonGroup.buttons.forEach((button, index) => {
            button.fnComplete = (context) => {
                m_headerButtonsList[index] = context.button;
                if (m_config.headerButtonGroup.buttons[index].fnComplete) {
                    m_config.headerButtonGroup.buttons[index].fnComplete(context);
                }
            };
        });

        m_headerButtonGroup = new MamboButtonGroup(m_calendarParentTag, buttonGroup);
    }

    function navigate(number) {
        switch (m_depth) {
            case 0: //month
                m_dateMgr.add(m_viewDate, number, 'months');
                break;
            case 1: //year
                m_dateMgr.add(m_viewDate, number, 'years');
                break;
            case 2: //decade
                m_dateMgr.add(m_viewDate, number * 10, 'years');
                break;
            case 3: //century
                m_dateMgr.add(m_viewDate, number * 100, 'years');
                break;
        }
        installBodyContent();
    }

    function setHeaderButtonsEnabled() {
        m_headerButtonsList.forEach((button, index) => {
            if (m_config.headerButtonGroup.buttons[index].fnEnabled) {
                button.enable({ enable: m_config.headerButtonGroup.buttons[index].fnEnabled() });
            }
        });
    }

    function canNavigateUp() {
        return m_depth < 3;
    }

    function canNavigatePast() {
        return !m_dateMgr.isSameOrBefore(m_viewDate, m_minDate);
    }

    function canNavigateFuture() {
        let lastViewDate = m_dateMgr.cloneDate(m_viewDate);
        switch (m_depth) {
            case 0: //month
                m_dateMgr.endOf(lastViewDate, 'month');
                break;
            case 1: //year
                m_dateMgr.endOf(lastViewDate, 'year');
                break;
            case 2: //decade
                m_dateMgr.endOf(lastViewDate, 'decade');
                break;
            case 3: //century
                m_dateMgr.endOf(lastViewDate, 'century');
                break;
        }
        return !m_dateMgr.isSameOrAfter(lastViewDate, m_maxDate);
    }

    function setHeaderButtonsText() {
        m_headerButtonsList.forEach((button, index) => {
            if (m_config.headerButtonGroup.buttons[index].fnText) {
                button.text({ text: m_config.headerButtonGroup.buttons[index].fnText() });
            }
        });
    }

    function getDepthButtonText() {
        switch (m_depth) {
            case 0: //month
                return m_dateMgr.format(m_viewDate, "MMMM YYYY");
            case 1: //year
                return m_dateMgr.format(m_viewDate, "YYYY");
            case 2: //decade
                return `${m_viewDate.getFullYear()}-${m_viewDate.getFullYear() + 9}`;
            case 3: //century
                return `${m_viewDate.getFullYear()}-${m_viewDate.getFullYear() + 99}`;
        }
    }

    //Body

    function installBody() {
        m_bodyTag = g_mamboDomJS.createTag(m_config.tag.body, { class: m_config.css.body });
        g_mamboDomJS.append(m_calendarParentTag, m_bodyTag);

        m_bodyHeaderTag = g_mamboDomJS.createTag(m_config.tag.bodyHeader, { class: m_config.css.bodyHeader });
        g_mamboDomJS.append(m_bodyTag, m_bodyHeaderTag);

        m_bodyContentTag = g_mamboDomJS.createTag(m_config.tag.bodyContent, { class: m_config.css.bodyContent });
        g_mamboDomJS.append(m_bodyTag, m_bodyContentTag);

        installBodyContent();
    }

    function installBodyContent() {
        m_bodyHeaderTag.innerHTML = '';
        m_bodyContentTag.innerHTML = '';

        switch (m_depth) {
            case 0: //month
                installDatesHeader();
                installDates();
                break;
            case 1: //year
                installMonths();
                break;
            case 2: //decade
                installYears();
                break;
            case 3: //century
                installDecades();
                break;
        }

        setHeaderButtonsText();
        setHeaderButtonsEnabled();
    }

    //Body: Dates

    function installDatesHeader() {
        let grid = m_utils.extend(true, {}, m_config.datesHeader);
        grid.css = m_utils.extend(true, m_config.css.datesHeader, grid.css);
        grid.data = [];

        for (let i = 0; i < 7; i++) {
            let dayName = m_dateMgr.getDayName(i);
            grid.data.push({
                Name: dayName,
                ShortName: dayName.substring(0, 2).toUpperCase()
            });
        }

        m_datesHeaderGrid = new MamboGrid(m_bodyHeaderTag, grid);
    }

    function installDates() {
        let buttonGroup = m_utils.extend(true, {}, m_config.datesButtonGroup);
        buttonGroup.css = m_utils.extend(true, m_config.css.datesButtonGroup, buttonGroup.css);
        generateDates(buttonGroup);

        m_datesButtonGroup = new MamboButtonGroup(m_bodyContentTag, buttonGroup);
        m_datesButtonGroup.select({ id: m_dateMgr.format(m_value, m_idFormat), notTrigger: true });
    }

    function generateDates(buttonGroup) {
        buttonGroup.buttons = [];
        let today = m_dateMgr.getToday();
        let value = m_dateMgr.cloneDate(m_viewDate);
        m_dateMgr.startOf(value, 'week');

        for (let i = 0; i < 42; i++) {
            let button = {
                id: m_dateMgr.format(value, m_idFormat),
                text: value.getDate(),
                attr: { title: m_dateMgr.format(value, "dddd, MMMM DD, YYYY") },
                fnClick: (context) => {
                    buttonClick(context, m_config.datesButtonGroup);
                }
            };
            if (!isValidButton(value)) {
                button.enable = false;
            } else if (m_dateMgr.isSame(value, today)) {
                button.css = { button: m_config.css.currentDate };
            } else if (value.getMonth() !== m_viewDate.getMonth()) {
                button.css = { button: m_config.css.otherMonth };
            }
            buttonGroup.buttons.push(button);
            m_dateMgr.add(value, 1, 'days');
        }
    }

    //Body Months

    function installMonths() {
        let buttonGroup = m_utils.extend(true, {}, m_config.monthsButtonGroup);
        buttonGroup.css = m_utils.extend(true, m_config.css.monthsButtonGroup, buttonGroup.css);
        generateMonths(buttonGroup);

        m_datesButtonGroup = new MamboButtonGroup(m_bodyContentTag, buttonGroup);

        let selectedMonth = m_dateMgr.cloneDate(m_value);
        m_dateMgr.startOf(selectedMonth, 'month');
        m_datesButtonGroup.select({ id: m_dateMgr.format(selectedMonth, m_idFormat), notTrigger: true });
    }

    function generateMonths(buttonGroup) {
        buttonGroup.buttons = [];
        let value = m_dateMgr.cloneDate(m_viewDate);

        for (let i = 0; i < 12; i++) {
            let button = {
                id: m_dateMgr.format(value, m_idFormat),
                text: m_dateMgr.format(value, "MMM"),
                attr: { title: m_dateMgr.format(value, "MMMM") },
                fnClick: (context) => {
                    buttonClick(context, m_config.monthsButtonGroup);
                }
            };
            if (!isValidButton(value)) {
                button.enable = false;
            }
            buttonGroup.buttons.push(button);
            m_dateMgr.add(value, 1, 'months');
        }
    }


    //Body Years

    function installYears() {
        let buttonGroup = m_utils.extend(true, {}, m_config.yearsButtonGroup);
        buttonGroup.css = m_utils.extend(true, m_config.css.yearsButtonGroup, buttonGroup.css);
        generateYears(buttonGroup);

        m_datesButtonGroup = new MamboButtonGroup(m_bodyContentTag, buttonGroup);

        let selectedYear = m_dateMgr.cloneDate(m_value);
        m_dateMgr.startOf(selectedYear, 'year');
        m_datesButtonGroup.select({ id: m_dateMgr.format(selectedYear, m_idFormat), notTrigger: true });
    }

    function generateYears(buttonGroup) {
        buttonGroup.buttons = [];
        let value = m_dateMgr.cloneDate(m_viewDate);
        m_dateMgr.add(value, -1, 'years');

        for (let i = 0; i < 12; i++) {
            let button = {
                id: m_dateMgr.format(value, m_idFormat),
                text: m_dateMgr.format(value, "YYYY"),
                fnClick: (context) => {
                    buttonClick(context, m_config.yearsButtonGroup);
                }
            };
            if (!isValidButton(value)) {
                button.enable = false;
            } else if (i === 0 || i === 11) {
                button.css = { button: m_config.css.otherDecade };
            }
            buttonGroup.buttons.push(button);
            m_dateMgr.add(value, 1, 'years');
        }
    }

    //Body Decades

    function installDecades() {
        let buttonGroup = m_utils.extend(true, {}, m_config.decadesButtonGroup);
        buttonGroup.css = m_utils.extend(true, m_config.css.decadesButtonGroup, buttonGroup.css);
        generateDecades(buttonGroup);

        m_datesButtonGroup = new MamboButtonGroup(m_bodyContentTag, buttonGroup);

        let selectedDecade = m_dateMgr.cloneDate(m_value);
        m_dateMgr.startOf(selectedDecade, 'decade');
        m_datesButtonGroup.select({ id: m_dateMgr.format(selectedDecade, m_idFormat), notTrigger: true });
    }

    function generateDecades(buttonGroup) {
        buttonGroup.buttons = [];
        let value = m_dateMgr.cloneDate(m_viewDate);
        m_dateMgr.add(value, -10, 'years');

        for (let i = 0; i < 12; i++) {
            let button = {
                id: m_dateMgr.format(value, m_idFormat),
                text: `${value.getFullYear()}-${value.getFullYear() + 9}`,
                fnClick: (context) => {
                    buttonClick(context, m_config.decadesButtonGroup);
                }
            };
            if (!isValidButton(value)) {
                button.enable = false;
            } else if (i === 0 || i === 11) {
                button.css = { button: m_config.css.otherCentury };
            }
            buttonGroup.buttons.push(button);
            m_dateMgr.add(value, 10, 'years');
        }
    }

    //Footer

    function installFooter() {
        if (m_config.footer) {
            let button = m_utils.extend(true, {}, m_config.footerButton);
            button.css = m_utils.extend(true, m_config.css.footerButton, button.css);

            let today = m_dateMgr.getToday();
            button.id = m_dateMgr.format(today, m_idFormat);
            button.text = m_dateMgr.format(today, m_config.footer);
            button.parentTag = m_calendarParentTag;

            if (m_dateMgr.isBefore(today, m_minDate) || m_dateMgr.isAfter(today, m_maxDate)) {
                button.enable = false;
            }

            button.fnClick = (context) => {
                m_depth = m_minDepth;
                selectValue(context.button, context.ev);
                if (m_config.footerButton.fnClick) {
                    m_config.footerButton.fnClick(context);
                }
            };

            new MamboButton(button);
        }
    }

    //Private methods

    function isValidButton(value) {
        return !m_dateMgr.isBefore(value, m_minDate) && !m_dateMgr.isAfter(value, m_maxDate);
    }

    function buttonClick(context, buttonGroup) {
        selectValue(context.button, context.ev);
        if (buttonGroup.fnClick) {
            buttonGroup.fnClick(context);
        }
    }

    function selectValue(button, ev) {
        let value = m_dateMgr.createDate(button.getId(), m_idFormat);
        if (m_depth <= m_minDepth) {
            setValue(value);
            if (m_config.fnSelect) {
                m_config.fnSelect({ calendar: self, ev: ev });
            }
        } else {
            --m_depth;
            setViewDate(value);
            installBodyContent();
        }
        setHeaderButtonsEnabled();
    }

    function getDefaultValue() {
        let optionValue = m_config.value ? m_dateMgr.getDate(m_config.value, m_config.format) : null;
        optionValue = optionValue ? optionValue : m_dateMgr.getToday();
        return getInRangeDate(optionValue);
    }

    function getInRangeDate(value) {
        if (!m_dateMgr.isDate(value)) {
            return null;
        }

        if (m_dateMgr.isBefore(value, m_minDate)) {
            return m_dateMgr.cloneDate(m_minDate);
        } else if (m_dateMgr.isAfter(value, m_maxDate)) {
            return m_dateMgr.cloneDate(m_maxDate);
        }
        return m_dateMgr.cloneDate(value);
    }

    function setValue(value) {
        m_value = getInRangeDate(value);
        m_depth = m_minDepth;
        setViewDate(m_value);
        installBodyContent();
    }

    function setViewDate(value) {
        m_viewDate = value === null ? m_dateMgr.getToday() : m_dateMgr.cloneDate(value);
        switch (m_depth) {
            case 0: //month
                m_dateMgr.startOf(m_viewDate, "month");
                break;
            case 1: //year
                m_dateMgr.startOf(m_viewDate, "year");
                break;
            case 2: //decade
                m_dateMgr.startOf(m_viewDate, 'decade');
                break;
            case 3: //century
                m_dateMgr.startOf(m_viewDate, 'century');
                break;
        }
    }

    //Public methods

    function value(context = {}) {
        if (typeof context.value === 'undefined') {
            return m_value;
        } else {
            setValue(m_dateMgr.getDate(context.value, m_config.format));
        }
    }

    function navigateToPast() {
        navigate(-1);
    }

    function navigateToFuture() {
        navigate(1);
    }
    function navigateUp() {
        if (canNavigateUp()) {
            ++m_depth;
            setViewDate(m_value);
            installBodyContent();
        }
    }

    function destroyCalendar() {
        g_mamboDomJS.remove(m_calendarParentTag);
    }

    function finishSetup() {
        // Execute complete callback function
        if (m_config.fnComplete) {
            m_config.fnComplete({ calendar: self });
        }
    }

    function configure() {
        m_config = {
            css: {
                parent: "calendar-parent",
                body: "calendar-body",
                bodyHeader: "calendar-body-header",
                bodyContent: "calendar-body-content",
                currentDate: "current-date",
                otherMonth: "other-month",
                otherDecade: "other-decade",
                otherCentury: "other-century",
                headerButtonGroup: {
                    parent: "calendar-header"
                },
                datesHeader: {
                    tilesParent: "dates-header-parent",
                    tileItem: "dates-header-day",
                },
                datesButtonGroup: {
                    parent: "dates-button-group",
                    button: "dates-button-group-button",
                    disabled: "dates-button-group-button-disabled"
                },
                monthsButtonGroup: {
                    parent: "months-button-group",
                    button: "months-button-group-button",
                    disabled: "months-button-group-button-disabled"
                },
                yearsButtonGroup: {
                    parent: "years-button-group",
                    button: "years-button-group-button",
                    disabled: "years-button-group-button-disabled"
                },
                decadesButtonGroup: {
                    parent: "decades-button-group",
                    button: "decades-button-group-button",
                    disabled: "decades-button-group-button-disabled"
                },
                footerButton: {
                    button: "calendar-footer-button",
                    disabled: "calendar-footer-button-disabled"
                }
            },
            tag: {
                parent: "sc-calendar",
                body: "calendar-body",
                bodyHeader: "calendar-body-header",
                bodyContent: "calendar-body-content",
            },
            headerButtonGroup: {
                buttons: [
                    {
                        text: "",
                        css: {
                            button: "prev-button",
                            disabled: "calendar-header-button-disabled"
                        },
                        fnClick: navigateToPast,
                        fnEnabled: canNavigatePast
                    },
                    {
                        text: "",
                        css: {
                            button: "fast-button",
                            disabled: "calendar-header-button-disabled"
                        },
                        fnClick: navigateUp,
                        fnEnabled: canNavigateUp,
                        fnText: getDepthButtonText
                    },
                    {
                        text: "",
                        css: {
                            button: "next-button",
                            disabled: "calendar-header-button-disabled"
                        },
                        fnClick: navigateToFuture,
                        fnEnabled: canNavigateFuture
                    }
                ]
            },
            datesHeader: {
                layout: "tile",
                tileHTML: `<span class="dates-header-day-name" title="{Name}">{ShortName}</span>`
            },
            datesButtonGroup: {},
            monthsButtonGroup: {},
            yearsButtonGroup: {},
            decadesButtonGroup: {},
            footerButton: {
                tag: "a"
            },
            format: "M/D/YYYY",
            value: null,
            footer: "dddd, MMMM D, YYYY",
            start: "month",
            depth: "month",
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31),
            fnSelect: (context) => {
                // Nothing executes by default
            },
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}