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
 *  File : MamboGrid.js
 *******************************************/
function MamboGrid(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error(`Data Grid: parentTag parameter was not passed in.`);
        return;
    }

    if (!options.data) {
        console.error(`Data Grid: Data option was not passed in.`);
        return;
    }

    const self = this;
    const m_utils = g_mamboObjMgr.get("MamboUtilities");
    const m_colsMaxPxWidth = [];
    const m_componentsMapById = {};
    const m_componentsMapByColNbr = [];

    // HTML tag variables
    let m_gridParentTag;
    let m_gridHdrTag;
    let m_gridBodyTag;
    let m_gridBodyRowTagName;
    let m_rowIndexAttrName;
    let m_parentTag;
    let m_tileParentTag;
    let m_tileParentTags = [];

    let m_config;
    let m_gridData = options.data;
    let m_gridDataChanged;
    let m_colStylesId;
    let m_tileIndexAttrName;

    // Configure public methods
    this.getRowIndex = getRowIndex;
    this.getGridData = getGridData;
    this.dataChanged = () => m_gridDataChanged;
    this.commitDataChange = commitDataChange;
    this.getId = () => m_config.id;
    this.removeColsStyles = removeColsStyles;
    this.getCellComponentByIdByRow = getCellComponentByIdByRow;
    this.getCellComponentsById = () => m_componentsMapById;
    this.getCellComponentByColNbrByRow = getCellComponentByColNbrByRow;
    this.getCellComponentsByColNbr = () => m_componentsMapByColNbr;

    // Config default values
    configure();

    // Begin setup
    setup();

    function setup() {
        m_parentTag = domJS.getTag(parentTag);

        if (!m_parentTag) {
            console.error(`Data Grid: domJS. parent tag ${parentTag} was not found.`);
            return;
        }

        // Validate grid layout
        switch (m_config.layout) {
            case "tile":
                installTiles();
                break;

            case "grid":
                installGrid();
                break;
        }
    }

    function installTiles() {
        m_tileParentTag = domJS.createTag(m_config.tag.tilesParent, { class: m_config.css.tilesParent });
        m_tileIndexAttrName = 'data-grid-tile-index';

        // Set basic tile structure into parent tag
        m_parentTag.innerHTML = '';
        domJS.append(m_parentTag, m_tileParentTag);

        if (!validateGridData()) {
            return;
        }

        m_gridData.forEach((tileData, tileIndex) => {
            installTile(tileData, tileIndex);
        });
    }

    function installTile(tileData, tileIndex) {
        // Create tile parent tag
        let tileTag = domJS.createTag(m_config.tag.tileItem, { class: m_config.css.tileItem, attr: { m_tileIndexAttrName: tileIndex } });
        domJS.append(m_tileParentTag, tileTag);
        m_tileParentTags[tileIndex] = tileTag;

        processTile(tileData, tileIndex, tileTag);
    }

    function processTile(tileData, tileIndex, tileTag) {
        if (m_config.tileHTML) {
            let content = domJS.supplantHTML(m_config.tileHTML, tileData);
            domJS.append(tileTag, content);
        }

        // Invoke callback for each completed tile
        if (m_config.fnPostTile) {
            m_config.fnPostTile({ tileIndex: tileIndex, tileTag: tileTag, tileData: tileData });
        }
    }

    function installGrid() {
        m_gridParentTag = domJS.createTag(m_config.tag.gridParent, { class: m_config.css.gridParent });
        m_gridHdrTag = domJS.createTag(m_config.tag.gridHdr, { class: m_config.css.gridHdr });
        m_gridBodyTag = domJS.createTag(m_config.tag.gridBody, { class: m_config.css.gridBody });
        m_gridBodyRowTagName = 'data-grid-row';
        m_rowIndexAttrName = 'data-grid-row-index';

        // Install grid parent tag
        domJS.append(m_gridParentTag, m_gridHdrTag).append(m_gridParentTag, m_gridBodyTag);

        // Set basic grid structure into parent tag
        m_parentTag.innerHTML = '';
        domJS.append(m_parentTag, m_gridParentTag);

        // Install the header tags
        installHdr();
    }

    function installHdr() {
        m_config.columns.forEach(column => {
            let parentTag = domJS.createTag(m_config.tag.colCell, { class: m_config.css.colCell });
            applyColCellElStyles(column, parentTag);

            const txtEl = domJS.createTag('text', { text: (column.title ? column.title : column.name) });
            domJS.append(parentTag, txtEl);
            domJS.append(m_gridHdrTag, parentTag);

            //Give it a millisecond for the domJS. to calculate .clientWidth
            setTimeout(() => {
                m_colsMaxPxWidth.push(domJS.computeTagWidth(txtEl));
            }, 1);
        });

        //Give it a millisecond for the domJS. to calculate tags
        setTimeout(() => {
            installRows();
        }, 1);
    }

    async function installRows() {
        if (!validateGridData()) {
            return;
        }

        m_gridData.forEach((rowData, rowIndex) => {
            processRow(rowData, rowIndex);
        });

        if (m_config.maxColWidth) {
            setTimeout(() => {
                setColsWidth();
            }, 1);
        } else {
            finishSetup();
        }

        function processRow(rowData, rowIndex) {
            // Create row parent tag
            let rowTag = domJS.createTag(m_config.tag.row, { class: m_config.css.row, attr: { m_rowIndexAttrName: rowIndex } });
            domJS.append(m_gridBodyTag, rowTag);

            // Loop through the header configuration
            m_config.columns.forEach((column, colIndex) => {
                // Create cell parent
                const parentTag = domJS.createTag(m_config.tag.colCell, { class: m_config.css.colCell });
                applyColCellElStyles(column, parentTag);
                domJS.append(rowTag, parentTag);

                const context = {
                    column: column,
                    parentTag: parentTag,
                    colIndex: colIndex,
                    rowIndex: rowIndex,
                    rowData: rowData
                };

                // Install the cells for each column
                switch (column.type) {
                    case "button":
                        installButtonCell(context);
                        break;

                    case "button-group":
                        installButtonGroupCell(context);
                        break;

                    case "text":
                        installTextCell(context);
                        break;

                    case "input":
                        installInputCell(context);
                        break;

                    case "file-chooser":
                        installFileChooserCell(context);
                        break;

                    case "dialog":
                        installDialogCell(context);
                        break;

                    case "slideout":
                        installSlideoutCell(context);
                        break;

                    case "drag-drop":
                        installDragDropCell(context);
                        break;

                    case "tree-view":
                        installTreeViewCell(context);
                        break;

                    case "dropdown":
                        installDropdownCell(context);
                        break;

                    case "combobox":
                        installComboboxCell(context);
                        break;

                    case "time-picker":
                        installTimePickerCell(context);
                        break;

                    case "calendar":
                        installCalendarCell(context);
                        break;

                    case "date-picker":
                        installDatePickerCell(context);
                        break;
                }
            });

            // Invoke callback for each completed row
            if (m_config.fnPostRow) {
                m_config.fnPostRow({ rowIndex: rowIndex, rowTag: rowTag, rowData: rowData });
            }
        }
    }

    function installTextCell(context) {
        const text = context.column.dataKey in context.rowData ? context.rowData[context.column.dataKey] : context.column.text;
        const tagConfig = {
            class: m_config.css.text,
            prop: context.column.prop,
            attr: context.column.attr,
            text
        };
        const textTag = domJS.createTag('text', tagConfig);
        domJS.append(context.parentTag, textTag);

        addComponentToMap({ column: context.column, colIndex: context.colIndex, component: textTag });

        // Save body cols pixel widths
        saveCellTagWidth({ colIndex: context.colIndex, tag: textTag, parentTag: context.parentTag });
    }

    function installButtonCell(context) {
        let buttonConfig = {
            id: context.rowIndex,
            css: {
                button: m_config.css.button
            }
        };

        // Extend with header configuration
        buttonConfig = m_utils.extend(true, buttonConfig, context.column);
        buttonConfig.fnClick = (contextClick) => {
            if (context.column.fnClick) {
                context.column.fnClick({
                    rowIndex: context.rowIndex,
                    rowData: context.rowData,
                    parentTag: context.parentTag,
                    ev: contextClick.ev
                });
            }
        };
        buttonConfig.fnComplete = (contextComplete) => {
            // Save body cols pixel widths
            saveCellTagWidth({
                colIndex: context.colIndex,
                tag: contextComplete.button.getTag(),
                parentTag: context.parentTag
            });
        };

        const buttonTag = new MamboButton(context.parentTag, buttonConfig);
        addComponentToMap({ column: context.column, colIndex: context.colIndex, component: buttonTag });
    }

    function installInputCell(context) {
        let inputConfig = {
            css: {
                input: m_config.css.input,
                button: m_config.css.button
            },
            value: context.column.dataKey in context.rowData ? context.rowData[context.column.dataKey] : context.column.text
        };

        inputConfig = m_utils.extend(true, inputConfig, context.column);

        inputConfig.events = [{
            name: 'change',
            fn: (contextEvent) => {
                inputElChangeEvent({
                    input: contextEvent.input,
                    column: context.column,
                    rowIndex: context.rowIndex,
                    rowData: context.rowData,
                    ev: contextEvent.ev
                });
            }
        }];
        inputConfig.fnDataValidationChange = (contextValidation) => {
            inputElChangeEvent({
                input: contextValidation.input,
                column: context.column,
                rowIndex: context.rowIndex,
                rowData: context.rowData,
                ev: contextValidation.ev
            });
        };
        inputConfig.fnComplete = (contextComplete) => {
            // Save body cols pixel widths
            saveCellTagWidth({
                colIndex: context.colIndex,
                tag: contextComplete.input.getTag(),
                parentTag: context.parentTag
            });
        };
        inputConfig.fnClick = (contextClick) => {
            if (context.column.fnClick) {
                context.column.fnClick(contextClick);
            }
        };

        const inputTag = new MamboInput(context.parentTag, inputConfig);
        addComponentToMap({ column: context.column, colIndex: context.colIndex, component: inputTag });
    }

    function installFileChooserCell(context) {
        let chooserConfig = {
            buttonOnly: true,
            textButton: "Upload File",
            attr: {
                multiple: true
            },
            fnComplete: (contextComplete) => {
                // Save body cols pixel widths
                saveCellTagWidth({
                    colIndex: context.colIndex,
                    tag: contextComplete.fileChooser.getParentTag(),
                    parentTag: context.parentTag
                });
            }
        };

        chooserConfig = m_utils.extend(true, chooserConfig, context.column);
        const fileChooserTag = new MamboFileChooser(context.parentTag, chooserConfig);
        addComponentToMap({ column: context.column, colIndex: context.colIndex, component: fileChooserTag });
    }

    function installDialogCell(context) {
        const dialogDefaultConfig = {
            title: "Dialog Title",
            css: {
                button: m_config.css.button
            }
        };

        const dialogConfig = m_utils.extend(true, dialogDefaultConfig, context.column);
        dialogConfig.fnClick = () => {
            new MamboDialog(dialogConfig.parentTag, dialogConfig, (contextReady) => {
                if (dialogConfig.fnOpen) {
                    dialogConfig.fnOpen({
                        dialog: contextReady.dialog,
                        dialogContentTag: contextReady.dialogContentTag,
                        column: context.column,
                        parentTag: context.parentTag,
                        colIndex: context.colIndex,
                        rowIndex: context.rowIndex
                    });
                }
            });
        };

        dialogConfig.fnClose = (contextClose) => {
            contextClose.dialog.close();
            if (context.column.fnClose) {
                context.column.fnClose({
                    column: context.column,
                    parentTag: context.parentTag,
                    colIndex: context.colIndex,
                    rowIndex: context.rowIndex
                });
            }
        };

        const buttonConfig = m_utils.extend(true, {}, dialogConfig);
        buttonConfig.fnComplete = (contextComplete) => {
            saveCellTagWidth({
                colIndex: context.colIndex,
                tag: contextComplete.button.getTag(),
                parentTag: context.parentTag
            });
        };

        const buttonTag = new MamboButton(context.parentTag, buttonConfig);
        addComponentToMap({ column: context.column, colIndex: context.colIndex, component: buttonTag });
    }

    function installButtonGroupCell(context) {
        // Extend with header configuration
        let buttonGroupConfig = m_utils.extend(true, { css: { button: m_config.css.button } }, context.column);
        buttonGroupConfig.id = context.rowIndex;

        const buttonGroupTag = new MamboButtonGroup(context.parentTag, buttonGroupConfig);
        addComponentToMap({ column: context.column, colIndex: context.colIndex, component: buttonGroupTag });
    }

    function installSlideoutCell(context) {
        let slideoutTag;

        const defaultConfig = {
            slideoutParentTag: "body",
            text: "Open",
            css: {
                button: m_config.css.button
            }
        };

        const config = m_utils.extend(true, defaultConfig, context.column);
        config.fnClick = () => {
            slideoutTag.open();
        };
        const buttonTag = new MamboButton(context.parentTag, config);

        const slideoutConfig = m_utils.extend(true, {}, config);
        slideoutConfig.fnComplete = config.fnInstallContent;
        slideoutTag = new MamboSlideout(config.slideoutParentTag, slideoutConfig);
        addComponentToMap({
            column: context.column,
            colIndex: context.colIndex,
            component: { button: buttonTag, slideout: slideoutTag }
        });
    }

    function installDragDropCell(context) {
        const defaultConfig = {
            dropText: "Drop Files",
            fnDrop: handleDropEvent,
            css: {
                parent: m_config.css.dropParent,
                imgDropIcon: m_config.css.dropImgDropIcon,
                dropText: m_config.css.dropText
            }
        };

        const config = m_utils.extend(true, defaultConfig, context.column);
        const dragDropTag = new MamboDragDrop(context.parentTag, config);

        function handleDropEvent(contextDragDrop) {
            // Process the files data and model it for the grid
            console.table(contextDragDrop.dataTransfer.files);
        }

        addComponentToMap({ column: context.column, colIndex: context.colIndex, component: dragDropTag });
    }

    function installTreeViewCell(context) {
        const defaultConfig = {
            css: {
                treeViewParent: m_config.css.treeViewParent
            }
        };

        const config = m_utils.extend(true, defaultConfig, context.column);
        const treeViewTag = new MamboTreeView(context.parentTag, config);

        addComponentToMap({ column: context.column, colIndex: context.colIndex, component: treeViewTag });
    }

    function installDropdownCell(context) {
        const defaultConfig = {
            css: {
                parent: m_config.css.dropDownParent,
                container: m_config.css.dropDownContainer,
                open: "open",
                button: {
                    button: m_config.css.button,
                }
            },
            button: {
                text: "Open Dropdown"
            }
        };

        const config = m_utils.extend(true, defaultConfig, context.column);
        const dropdownTag = new MamboDropdown(context.parentTag, config);

        addComponentToMap({ column: context.column, colIndex: context.colIndex, component: dropdownTag });
    }

    function installComboboxCell(context) {
        const defaultConfig = {
            css: {
                parent: m_config.css.comboboxParent,
                dropdown: {
                    container: m_config.css.comboboxDropDownContainer
                },
            }
        };

        const config = m_utils.extend(true, defaultConfig, context.column);
        const comboboxTag = new MamboCombobox(context.parentTag, config);

        addComponentToMap({ column: context.column, colIndex: context.colIndex, component: comboboxTag });
    }

    function installTimePickerCell(context) {
        const defaultConfig = {
            css: {
                combobox: {
                    parent: m_config.css.timePickerParent,
                    dropdown: {
                        container: m_config.css.timePickerDropDownContainer
                    }
                }
            }
        };

        const config = m_utils.extend(true, defaultConfig, context.column);
        const timePickerTag = new MamboTimePicker(context.parentTag, config);

        addComponentToMap({ column: context.column, colIndex: context.colIndex, component: timePickerTag });
    }

    function installCalendarCell(context) {
        const defaultConfig = {
            css: {
                parent: m_config.css.calendarParent
            }
        };

        const config = m_utils.extend(true, defaultConfig, context.column);
        const calendarTag = new MamboCalendar(context.parentTag, config);

        addComponentToMap({ column: context.column, colIndex: context.colIndex, component: calendarTag });
    }

    function installDatePickerCell(context) {
        const defaultConfig = {
            css: {
                parent: m_config.css.datePickerParent
            }
        };

        const config = m_utils.extend(true, defaultConfig, context.column);
        const datePickerTag = new MamboDatePicker(context.parentTag, config);

        addComponentToMap({ column: context.column, colIndex: context.colIndex, component: datePickerTag });
    }

    function inputElChangeEvent(context) {
        m_config.events.inputChange({
            input: context.input,
            column: context.column,
            rowIndex: context.rowIndex,
            rowData: context.rowData,
            ev: context.ev
        });
        updateGridData({ value: context.input.value(), column: context.column, rowIndex: context.rowIndex });
    }

    function updateGridData(context) {
        m_gridDataChanged = true;
        m_gridData[context.rowIndex][context.column.dataKey] = context.value;
    }

    function getGridData() {
        return m_gridData;
    }

    function saveCellTagWidth(context) {
        if (!m_config.maxColWidth) {
            return;
        }
        // Save largest width value
        const tagWidth = domJS.computeTagWidth(context.tag, context.parentTag);
        m_colsMaxPxWidth[context.colIndex] = tagWidth > m_colsMaxPxWidth[context.colIndex] ? tagWidth : m_colsMaxPxWidth[context.colIndex];
    }

    function setColsWidth() {
        // Declare style tag
        m_colStylesId = m_utils.getUniqueId();
        let styleEl = domJS.createTag('style', { attr: { id: m_colStylesId } });

        m_colsMaxPxWidth.forEach((width, index) => {
            // Create width adjustment style
            const adjWidth = width + (m_config.colWidthAdj);
            let hdrSelector = m_parentTag.tagName.toLowerCase() + " " + m_gridHdrTag.tagName.toLowerCase() + " > *:nth-child(" + (index + 1) + ")";
            let bodySelector = m_parentTag.tagName.toLowerCase() + " " + m_gridBodyTag.tagName.toLowerCase() + " " + m_gridBodyRowTagName + " > *:nth-child(" + (index + 1) + ")";
            let style = `{
                    min-width:${adjWidth}px;
                    width:${adjWidth}px;
                    max-width:${adjWidth}px;
                }`;
            domJS.append(styleEl, document.createTextNode(`${hdrSelector},${bodySelector}${style}`));
        });

        // Append to HTML HEAD tag
        domJS.append('head', styleEl);

        finishSetup();
    }

    function getRowIndex(context = {}) {
        return context.rowTag.getAttribute(m_rowIndexAttrName);
    }

    function applyColCellElStyles(columnConfig, tag) {
        tag.style.display = columnConfig.hide ? 'none' : '';

        if (columnConfig.style && m_utils.isObject(columnConfig.style)) {
            for (let key in columnConfig.style) {
                tag.style[key] = columnConfig.style[key];
            }
        }
    }

    function commitDataChange() {
        m_gridDataChanged = null;
        m_componentsMapById.forEach(input => {
            input.commitDataChange();
        });
    }

    function removeColsStyles() {
        let tag = document.getElementById(m_colStylesId);
        if (tag) {
            tag.parentNode.removeChild(tag);
        }
    }

    function getCellComponentByIdByRow(context = {}) {
        return m_componentsMapById[context.columnId][context.rowIndex];
    }

    function getCellComponentByColNbrByRow(context = {}) {
        return m_componentsMapByColNbr[context.colNbr][context.rowIndex];
    }

    function addComponentToMap(context) {
        // Save Input component by ID
        if (context.column.id) {
            if (!(context.column.id in m_componentsMapById)) {
                m_componentsMapById[context.column.id] = [];
            }
            m_componentsMapById[context.column.id].push(context.component);
        }

        // Save Input component by Column Number
        if (!(context.colIndex in m_componentsMapByColNbr)) {
            m_componentsMapByColNbr[context.colIndex] = [];
        }
        m_componentsMapByColNbr[context.colIndex].push(context.component);
    }

    function validateGridData() {
        if (!m_gridData || !Array.isArray(m_gridData)) {
            console.error('Data Grid alert: grid data not found or is not data type Array -->', parentTag);
            finishSetup();
            return false;
        }

        return true;
    }

    function finishSetup() {
        // Execute complete callback function
        if (m_config.fnComplete) {
            m_config.fnComplete({ grid: self });
        }
    }

    function configure() {
        m_config = {
            css: {
                gridParent: "grid-parent",
                gridHdr: "grid-hdr",
                gridBody: "grid-body",
                row: "grid-row",
                cell: "grid-cell",
                colCell: "grid-col-cell",
                text: "grid-text-cell",
                input: "grid-input-cell",
                button: "grid-button-cell",
                dropParent: "grid-drag-drop-parent",
                dropImgDropIcon: "grid-drag-drop-icon",
                dropText: "grid-drag-drop-text",
                treeViewParent: "grid-tree-view-parent",
                dropDownParent: "grid-dropdown-parent",
                dropDownContainer: "grid-dropdown-container",
                comboboxParent: "grid-combobox-parent",
                comboboxDropDownContainer: "grid-combobox-dropdown-container",
                timePickerParent: "grid-time-picker-parent",
                timePickerDropDownContainer: "grid-time-picker-dropdown-container",
                calendarParent: "grid-calendar-parent",
                datePickerParent: "grid-date-picker-parent",
                tilesParent: "tiles-parent",
                tileItem: "tile-item",
            },
            tag: {
                gridParent: "sc-grid",
                gridHdr: "grid-hdr",
                gridBody: "grid-body",
                colCell: "col-cell",
                row: "data-grid-row",
                tilesParent: "sc-tiles",
                tileItem: "tile-item",
            },
            events: {
                inputChange: (context) => {
                    // example on how global event listener configuration works
                    // 'input' is the domJS. tag name. 'Change' is the addEventListener name
                }
            },
            maxColWidth: false,
            colWidthAdj: 5,
            layout: "grid",
            tileHTML: "",
            tilesWidth: "300px",
            tilesFillUp: true,
            tilesDense: false,
            tilesConfig: []
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }

    }
}