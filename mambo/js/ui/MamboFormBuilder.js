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
 *  File : MamboFormBuilder.js
 *******************************************/
 class MamboFormBuilder extends HTMLElement {
	constructor(initOptions) {

		super();

		const self = this;
		const m_utils = g_mamboUtils;
		const m_colsMaxPxWidth = [];
		const m_componentsMapById = {};
		const m_componentsMapByColNbr = [];

		// HTML tag variables
		let m_formParentTag;
		let m_formBodyTag;
		let m_formBodyRowTagName;
		let m_rowIndexAttrName;
		let m_parentTag;

		let m_config;
		let m_formData = initOptions.data;
		let m_formDataChanged;
		let m_colStylesId;

		// Configure public methods
		this.commitDataChange = commitDataChange;
		this.dataChanged = () => m_formDataChanged;
		this.getCellComponentByIdByRow = getCellComponentByIdByRow;
		this.getCellComponentByColNbrByRow = getCellComponentByColNbrByRow;
		this.getCellComponentsById = () => m_componentsMapById;
		this.getCellComponentsByColNbr = () => m_componentsMapByColNbr;
		this.getFormData = getFormData;
		this.getId = () => m_config.id;
		this.getRowIndex = getRowIndex;
        this.install = installSelf;
		this.removeColsStyles = removeColsStyles;
        this.setup = setup;

        if (initOptions) setup(initOptions);

		function setup(options) {
            
            configure(options);

            installGrid();
		}

		function installGrid() {
			m_formParentTag = g_mamboDomJS.createTag(m_config.tag.formParent, { class: m_config.css.formParent });
			m_formBodyTag = g_mamboDomJS.createTag(m_config.tag.formBody, { class: m_config.css.formBody });
			m_formBodyRowTagName = 'data-form-row';
			m_rowIndexAttrName = 'data-form-row-index';

			// Install grid parent tag
			g_mamboDomJS.append(m_formParentTag, m_formBodyTag);

			//Give it a millisecond for the g_mamboDomJS. to calculate tags
			setTimeout(() => {
				installRows();
			}, 1);
            self.appendChild(m_formParentTag);
		}

		async function installRows() {
			if (!validateGridData()) {
				return;
			}

			m_formData.forEach((rowData, rowIndex) => {
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
				let rowTag = g_mamboDomJS.createTag(m_config.tag.row, {
					class: m_config.css.row,
					attr: { m_rowIndexAttrName: rowIndex },
				});
				g_mamboDomJS.append(m_formBodyTag, rowTag);
				// Loop through the header configuration
				m_config.columns.forEach((column, colIndex) => {
					// Create cell parent
					const parentTag = g_mamboDomJS.createTag(m_config.tag.colCell, { class: m_config.css.colCell });
					applyColCellElStyles(column, parentTag);
					g_mamboDomJS.append(rowTag, parentTag);

					const context = {
						column: column,
						parentTag: parentTag,
						colIndex: colIndex,
						rowIndex: rowIndex,
						rowData: rowData,
					};

					// Install the cells for each column
					switch (column.type) {
						case 'button':
							installButtonCell(context);
							break;

						case 'button-group':
							installButtonGroupCell(context);
							break;

						case 'text':
							installTextCell(context);
							break;

						case 'input':
							installInputCell(context);
							break;

						case 'file-chooser':
							installFileChooserCell(context);
							break;

						case 'dialog':
							installDialogCell(context);
							break;

						case 'slideout':
							installSlideoutCell(context);
							break;

						case 'drag-drop':
							installDragDropCell(context);
							break;

						case 'tree-view':
							installTreeViewCell(context);
							break;

						case 'dropdown':
							installDropdownCell(context);
							break;

						case 'combobox':
							installComboboxCell(context);
							break;

						case 'time-picker':
							installTimePickerCell(context);
							break;

						case 'calendar':
							installCalendarCell(context);
							break;

						case 'date-picker':
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
			const text =
				context.column.dataKey in context.rowData ? context.rowData[context.column.dataKey] : context.column.text;
			const tagConfig = {
				class: m_config.css.text,
				prop: context.column.prop,
				attr: context.column.attr,
				text,
			};
			const textTag = g_mamboDomJS.createTag('text', tagConfig);
			g_mamboDomJS.append(context.parentTag, textTag);

			addComponentToMap({ column: context.column, colIndex: context.colIndex, component: textTag });

			// Save body cols pixel widths
			saveCellTagWidth({ colIndex: context.colIndex, tag: textTag, parentTag: context.parentTag });
		}

		function installButtonCell(context) {
			let buttonConfig = {
				id: context.rowIndex,
				css: {
					button: m_config.css.button,
				},
                parentTag:context.parentTag
			};

			// Extend with header configuration
			buttonConfig = m_utils.extend(true, buttonConfig, context.column);
			buttonConfig.fnClick = (contextClick) => {
				if (context.column.fnClick) {
					context.column.fnClick({
						rowIndex: context.rowIndex,
						rowData: context.rowData,
						parentTag: context.parentTag,
						ev: contextClick.ev,
					});
				}
			};
			buttonConfig.fnComplete = (contextComplete) => {
				// Save body cols pixel widths
				saveCellTagWidth({
					colIndex: context.colIndex,
					tag: contextComplete.button.getTag(),
					parentTag: context.parentTag,
				});
			};

			const buttonTag = new MamboButton(buttonConfig);
			addComponentToMap({ column: context.column, colIndex: context.colIndex, component: buttonTag });
		}

		function installInputCell(context) {
			let inputConfig = {
				css: {
					input: m_config.css.input,
					button: m_config.css.button,
				},
				value:
					context.column.dataKey in context.rowData ? context.rowData[context.column.dataKey] : context.column.text,
			};

			inputConfig = m_utils.extend(true, inputConfig, context.column);

			inputConfig.events = [
				{
					name: 'change',
					fn: (contextEvent) => {
						inputElChangeEvent({
							input: contextEvent.input,
							column: context.column,
							rowIndex: context.rowIndex,
							rowData: context.rowData,
							ev: contextEvent.ev,
						});
					},
				},
			];
			inputConfig.fnDataValidationChange = (contextValidation) => {
				inputElChangeEvent({
					input: contextValidation.input,
					column: context.column,
					rowIndex: context.rowIndex,
					rowData: context.rowData,
					ev: contextValidation.ev,
				});
			};
			inputConfig.fnComplete = (contextComplete) => {
				// Save body cols pixel widths
				saveCellTagWidth({
					colIndex: context.colIndex,
					tag: contextComplete.input.getTag(),
					parentTag: context.parentTag,
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
				textButton: 'Upload File',
				attr: {
					multiple: true,
				},
				fnComplete: (contextComplete) => {
					// Save body cols pixel widths
					saveCellTagWidth({
						colIndex: context.colIndex,
						tag: contextComplete.fileChooser.getParentTag(),
						parentTag: context.parentTag,
					});
				},
			};

			chooserConfig = m_utils.extend(true, chooserConfig, context.column);
			const fileChooserTag = new MamboFileChooser(context.parentTag, chooserConfig);
			addComponentToMap({ column: context.column, colIndex: context.colIndex, component: fileChooserTag });
		}

		function installDialogCell(context) {
			const dialogDefaultConfig = {
				title: 'Dialog Title',
				css: {
					button: m_config.css.button,
				},
                parentTag:context.parentTag
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
							rowIndex: context.rowIndex,
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
						rowIndex: context.rowIndex,
					});
				}
			};

			const buttonConfig = m_utils.extend(true, {}, dialogConfig);
			buttonConfig.fnComplete = (contextComplete) => {
				saveCellTagWidth({
					colIndex: context.colIndex,
					tag: contextComplete.button.getTag(),
					parentTag: context.parentTag,
				});
			};

			const buttonTag = new MamboButton(buttonConfig);
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
				slideoutParentTag: 'body',
				text: 'Open',
				css: {
					button: m_config.css.button,
				},
                parentTag:context.parentTag
			};

			const config = m_utils.extend(true, defaultConfig, context.column);
			config.fnClick = () => {
				slideoutTag.open();
			};
			const buttonTag = new MamboButton(config);

			const slideoutConfig = m_utils.extend(true, {}, config);
			slideoutConfig.fnComplete = config.fnInstallContent;
			slideoutTag = new MamboSlideout(config.slideoutParentTag, slideoutConfig);
			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: { button: buttonTag, slideout: slideoutTag },
			});
		}

		function installDragDropCell(context) {
			const defaultConfig = {
				dropText: 'Drop Files',
				fnDrop: handleDropEvent,
				css: {
					parent: m_config.css.dropParent,
					imgDropIcon: m_config.css.dropImgDropIcon,
					dropText: m_config.css.dropText,
				},
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
					treeViewParent: m_config.css.treeViewParent,
				},
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
					open: 'open',
					button: {
						button: m_config.css.button,
					},
				},
				button: {
					text: 'Open Dropdown',
				},
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
						container: m_config.css.comboboxDropDownContainer,
					},
				},
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
							container: m_config.css.timePickerDropDownContainer,
						},
					},
				},
			};

			const config = m_utils.extend(true, defaultConfig, context.column);
			const timePickerTag = new MamboTimePicker(context.parentTag, config);

			addComponentToMap({ column: context.column, colIndex: context.colIndex, component: timePickerTag });
		}

		function installCalendarCell(context) {
			const defaultConfig = {
				css: {
					parent: m_config.css.calendarParent,
				},
			};

			const config = m_utils.extend(true, defaultConfig, context.column);
			const calendarTag = new MamboCalendar(context.parentTag, config);

			addComponentToMap({ column: context.column, colIndex: context.colIndex, component: calendarTag });
		}

		function installDatePickerCell(context) {
			const defaultConfig = {
				css: {
					parent: m_config.css.datePickerParent,
				},
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
				ev: context.ev,
			});
			updateGridData({ value: context.input.value(), column: context.column, rowIndex: context.rowIndex });
		}

		function updateGridData(context) {
			m_formDataChanged = true;
			m_formData[context.rowIndex][context.column.dataKey] = context.value;
		}

		function getFormData() {
			return m_formData;
		}

		function saveCellTagWidth(context) {
			if (!m_config.maxColWidth) {
				return;
			}
			// Save largest width value
			const tagWidth = g_mamboDomJS.computeTagWidth(context.tag, context.parentTag);
			m_colsMaxPxWidth[context.colIndex] =
				tagWidth > m_colsMaxPxWidth[context.colIndex] ? tagWidth : m_colsMaxPxWidth[context.colIndex];
		}

		function setColsWidth() {
			// Declare style tag
			m_colStylesId = m_utils.getUniqueId();
			let styleEl = g_mamboDomJS.createTag('style', { attr: { id: m_colStylesId } });

			m_colsMaxPxWidth.forEach((width, index) => {
				// Create width adjustment style
				const adjWidth = width + m_config.colWidthAdj;
				let bodySelector =
					m_parentTag.tagName.toLowerCase() +
					' ' +
					m_formBodyTag.tagName.toLowerCase() +
					' ' +
					m_formBodyRowTagName +
					' > *:nth-child(' +
					(index + 1) +
					')';
				let style = `{
                    min-width:${adjWidth}px;
                    width:${adjWidth}px;
                    max-width:${adjWidth}px;
                }`;
				g_mamboDomJS.append(styleEl, document.createTextNode(`${bodySelector}${style}`));
			});

			// Append to HTML HEAD tag
			g_mamboDomJS.append('head', styleEl);
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
			m_formDataChanged = null;
			m_componentsMapById.forEach((input) => {
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
			if (!m_formData || !Array.isArray(m_formData)) {
				console.error('Data Grid alert: grid data not found or is not data type Array -->');
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

            installDom();
		}

        function installDom() {
            // Logic

            // Install component into parent
            if (m_config.install) installSelf(m_parentTag, m_config.installPrepend);
        }

        function installSelf(parentTag, prepend) {
            m_parentTag = parentTag ? parentTag : m_parentTag;
            m_parentTag = g_mamboDomJS.appendSelfToParentTag(m_parentTag, self, prepend);
        }

		function configure(options) {
			m_config = {
				css: {
					formParent: 'form-parent',
					formBody: 'form-body',
					row: 'form-row',
					cell: 'form-cell',
					colCell: 'form-col-cell',
					text: 'form-text-cell',
					input: 'form-input-cell',
					button: 'form-button-cell',
					dropParent: 'form-drag-drop-parent',
					dropImgDropIcon: 'form-drag-drop-icon',
					dropText: 'form-drag-drop-text',
					treeViewParent: 'form-tree-view-parent',
					dropDownParent: 'form-dropdown-parent',
					dropDownContainer: 'form-dropdown-container',
					comboboxParent: 'form-combobox-parent',
					comboboxDropDownContainer: 'form-combobox-dropdown-container',
					timePickerParent: 'form-time-picker-parent',
					timePickerDropDownContainer: 'form-time-picker-dropdown-container',
					calendarParent: 'form-calendar-parent',
					datePickerParent: 'form-date-picker-parent',
				},
				tag: {
					formParent: 'sc-grid',
					formBody: 'form-body',
					colCell: 'col-cell',
					row: 'data-form-row',
				},
				events: {
					inputChange: (context) => {
						// example on how global event listener configuration works
						// 'input' is the g_mamboDomJS. tag name. 'Change' is the addEventListener name
					},
				},
                parentTag: undefined,
                install: true,
                installPrepend: false,
				maxColWidth: false,
				colWidthAdj: 5,
			};

			// If options provided, override default config
			if (options) {
				m_config = m_utils.extend(true, m_config, options);
			}

            if (m_config.parentTag) {
                m_parentTag = g_mamboDomJS.getTag(m_config.parentTag);
            }

		}
	}
}
customElements.define('mambo-form-builder', MamboFormBuilder);