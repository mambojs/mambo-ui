ui.class.Grid = class Grid extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_colsMaxPxWidth = [];
		const m_componentsMapById = {};
		const m_componentsMapByColNbr = [];

		// HTML tag variables
		let m_gridWrapperTag;
		let m_gridHdrTag;
		let m_gridBodyTag;
		let m_gridBodyRowTagName;
		let m_rowIndexAttrName;
		let m_parentTag;
		let m_tileParentTag;
		let m_tileParentTags = [];

		let m_props;
		let m_gridData;
		let m_gridDataChanged;
		let m_colStylesId;
		let m_tileIndexAttrName;

		// Configure public methods
		this.commitDataChange = commitDataChange;
		this.dataChanged = () => m_gridDataChanged;
		this.getCellComponentByIdByRow = getCellComponentByIdByRow;
		this.getCellComponentsById = () => m_componentsMapById;
		this.getCellComponentByColNbrByRow = getCellComponentByColNbrByRow;
		this.getCellComponentsByColNbr = () => m_componentsMapByColNbr;
		this.getGridData = getGridData;
		this.getId = () => m_props.id;
		this.getRowIndex = getRowIndex;
		this.removeColsStyles = removeColsStyles;
		this.setup = setup;

		if (props) {
			if (props.data) m_gridData = props.data;
			setup(props);
		}

		async function setup(props) {
			await configure(props);

			if (!self.isConnected) {
				await ui.utils.installUIComponent({ self, m_parentTag, m_props });
			}

			await setupDOM();
			setupComplete();
		}

		function setupDOM() {
			return new Promise((resolve) => {
				self.classList.add(m_props.css.self);

				switch (m_props.layout) {
					case "tile":
						setupTilesDOM().then(resolve);
						break;
					default:
						setupGridDOM().then(resolve);
						break;
				}
			});
		}

		function setupTilesDOM() {
			return new Promise((resolve) => {
				m_tileParentTag = ui.d.createTag({ ...m_props.tags.tiles, class: m_props.css.tiles });
				m_tileIndexAttrName = "data-grid-tile-index";
				self.appendChild(m_tileParentTag);

				if (!validateGridData()) {
					resolve();

					return;
				}

				const tilePromises = m_gridData.map((tileData, tileIndex) => {
					return installTile(tileData, tileIndex);
				});

				Promise.all(tilePromises).then(resolve);
			});
		}

		function installTile(tileData, tileIndex) {
			return new Promise((resolve) => {
				const tileTagConfig = { ...m_props.tags.tileItem, class: m_props.css.tileItem };
				tileTagConfig.attr[m_tileIndexAttrName] = tileIndex;
				const tileTag = ui.d.createTag(tileTagConfig);

				m_tileParentTag.appendChild(tileTag);
				m_tileParentTags[tileIndex] = tileTag;
				processTile(tileData, tileIndex, tileTag).then(resolve);
			});
		}

		function processTile(tileData, tileIndex, tileTag) {
			return new Promise((resolve) => {
				if (m_props.tileHTML) {
					let content = ui.d.supplantHTML(m_props.tileHTML, tileData);
					ui.d.append(tileTag, content);
				}

				if (m_props.fnPostTile) {
					m_props.fnPostTile({
						tileIndex: tileIndex,
						tileTag: tileTag,
						tileData: tileData,
					});
				}

				resolve();
			});
		}

		function setupGridDOM() {
			return new Promise((resolve) => {
				m_gridWrapperTag = ui.d.createTag({ ...m_props.tags.grid, class: m_props.css.grid });
				m_gridHdrTag = ui.d.createTag({ ...m_props.tags.header, class: m_props.css.header });
				m_gridBodyTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
				m_gridBodyRowTagName = "data-grid-row";
				m_rowIndexAttrName = "data-grid-row-index";
				m_gridWrapperTag.appendChild(m_gridHdrTag);
				m_gridWrapperTag.appendChild(m_gridBodyTag);
				self.appendChild(m_gridWrapperTag);
				installHdr().then(resolve);
			});
		}

		function installHdr() {
			return new Promise((resolve) => {
				const colPromises = m_props.columns.map((column) => {
					return new Promise((resolve) => {
						let parentTag = ui.d.createTag({ ...m_props.tags.colCell, class: m_props.css.colCell });

						applyColCellElStyles(column, parentTag).then(() => {
							const txtEl = ui.d.createTag({
								...m_props.tags.headerTitle,
								text: column.title ? column.title : column.name,
								css: m_props.css.headerTitle,
							});
							parentTag.appendChild(txtEl);
							m_gridHdrTag.appendChild(parentTag);
							ui.d.computeTagWidth(txtEl).then((value) => m_colsMaxPxWidth.push(value));
						});
						resolve();
					});
				});

				Promise.all(colPromises).then(installRows).then(resolve);
			});
		}

		async function installRows() {
			return new Promise((resolve, reject) => {
				if (!validateGridData()) {
					reject();

					return;
				}

				const rowPromises = m_gridData.map((rowData, rowIndex) => {
					return processRow(rowData, rowIndex);
				});

				Promise.all(rowPromises).then(() => {
					if (m_props.maxColWidth) {
						setColsWidth().then(resolve);
					} else {
						resolve();
					}
				});
			});

			function processRow(rowData, rowIndex) {
				return new Promise((resolve) => {
					const rowTagConfig = { ...m_props.tags.row, class: m_props.css.row };
					rowTagConfig.attr[m_rowIndexAttrName] = rowIndex;
					let rowTag = ui.d.createTag(rowTagConfig);
					m_gridBodyTag.appendChild(rowTag);

					// Loop through the header configuration
					const rowPromises = m_props.columns.map((column, colIndex) => {
						return new Promise((resolve) => {
							// Create cell parent
							const parentTag = ui.d.createTag({ ...m_props.tags.colCell, class: m_props.css.colCell });
							applyColCellElStyles(column, parentTag).then(installCell);

							function installCell() {
								rowTag.appendChild(parentTag);

								const context = {
									column: column,
									parentTag: parentTag,
									colIndex: colIndex,
									rowIndex: rowIndex,
									rowData: rowData,
								};

								// Install the cells for each column
								switch (column.tagType) {
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

								resolve();
							}

							resolve();
						});
					});

					Promise.all(rowPromises).then(() => {
						// Invoke callback for each completed row
						if (m_props.fnPostRow) {
							m_props.fnPostRow({
								rowIndex: rowIndex,
								rowTag: rowTag,
								rowData: rowData,
							});
						}

						resolve();
					});
				});
			}
		}

		function installTextCell(context) {
			const text = context.column.dataKey in context.rowData ? context.rowData[context.column.dataKey] : context.column.text;
			const tagConfig = {
				...m_props.tags.text,
				class: m_props.css.text,
				text,
			};

			const textTag = ui.d.createTag(tagConfig);
			context.parentTag.appendChild(textTag);

			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: textTag,
			});

			// Save body cols pixel widths
			saveCellTagWidth({
				colIndex: context.colIndex,
				tag: textTag,
				parentTag: context.parentTag,
			});
		}

		function installButtonCell(context) {
			let buttonConfig = {
				id: context.rowIndex,
				css: {
					button: m_props.css.button,
				},
			};

			// Extend with header configuration
			buttonConfig = ui.utils.extend(true, buttonConfig, context.column);

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
					tag: contextComplete.Button.getTag(),
					parentTag: context.parentTag,
				});
			};

			buttonConfig.parentTag = context.parentTag;
			const buttonTag = ui.button(buttonConfig);
			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: buttonTag,
			});
		}

		function installInputCell(context) {
			let inputConfig = {
				css: {
					button: m_props.css.button,
					input: m_props.css.input,
					container: m_props.css.inputContainer,
				},
				value: context.column.dataKey in context.rowData ? context.rowData[context.column.dataKey] : context.column.text,
			};

			inputConfig = ui.utils.extend(true, inputConfig, context.column);

			inputConfig.events = [
				{
					name: "change",
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
					tag: contextComplete.Input.getTag(),
					parentTag: context.parentTag,
				});

				if (context.column.fnComplete) {
					context.column.fnComplete(contextComplete);
				}
			};

			inputConfig.fnClick = (contextClick) => {
				if (context.column.fnClick) {
					context.column.fnClick(contextClick);
				}
			};

			inputConfig.parentTag = context.parentTag;
			const inputTag = ui.input(inputConfig);
			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: inputTag,
			});
		}

		function installFileChooserCell(context) {
			let chooserConfig = {
				buttonOnly: true,
				textButton: "Upload File",
				attr: {
					multiple: true,
				},
				fnComplete: (contextComplete) => {
					// Save body cols pixel widths
					saveCellTagWidth({
						colIndex: context.colIndex,
						tag: contextComplete.FileChooser.getParentTag(),
						parentTag: context.parentTag,
					});
				},
			};

			chooserConfig = ui.utils.extend(true, chooserConfig, context.column);
			chooserConfig.parentTag = context.parentTag;
			const fileChooserTag = ui.fileChooser(chooserConfig);
			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: fileChooserTag,
			});
		}

		function installDialogCell(context) {
			const dialogDefaultConfig = {
				title: "Default Title",
				css: {
					button: m_props.css.button,
				},
			};

			const dialogConfig = ui.utils.extend(true, dialogDefaultConfig, context.column);

			dialogConfig.fnClick = () => {
				ui.dialog({
					title: dialogConfig.title,
					fnComplete: context.column.fnOpen,
					fnClose: context.column.fnClose,
				});
			};

			const buttonConfig = ui.utils.extend(true, {}, dialogConfig);
			buttonConfig.fnComplete = (contextComplete) => {
				saveCellTagWidth({
					colIndex: context.colIndex,
					tag: contextComplete.Button.getTag(),
					parentTag: context.parentTag,
				});
			};

			buttonConfig.parentTag = context.parentTag;
			const buttonTag = ui.button(buttonConfig);
			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: buttonTag,
			});
		}

		function installButtonGroupCell(context) {
			// Extend with header configuration
			let buttonGroupConfig = ui.utils.extend(true, { css: { button: { button: m_props.css.button } } }, context.column);
			buttonGroupConfig.id = context.rowIndex;
			buttonGroupConfig.parentTag = context.parentTag;

			const buttonGroupTag = ui.buttonGroup(buttonGroupConfig);
			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: buttonGroupTag,
			});
		}

		function installSlideoutCell(context) {
			let slideoutTag;

			const defaultConfig = {
				slideoutParentTag: "body",
				text: "Open",
				css: {
					button: m_props.css.button,
				},
			};

			const config = ui.utils.extend(true, defaultConfig, context.column);
			config.fnClick = () => {
				slideoutTag.open();
			};

			config.parentTag = context.parentTag;
			const buttonTag = ui.button(config);

			const slideoutConfig = ui.utils.extend(true, {}, config);
			slideoutConfig.fnComplete = config.fnInstallContent;
			slideoutConfig.parentTag = config.slideoutParentTag;
			slideoutTag = ui.slideout(slideoutConfig);
			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: { button: buttonTag, slideout: slideoutTag },
			});
		}

		function installDragDropCell(context) {
			const defaultConfig = {
				parentTag: context.parentTag,
				dropText: "Drop Files",
				fnDrop: handleDropEvent,
				css: {
					parent: m_props.css.dropParent,
					imgDropIcon: m_props.css.dropImgDropIcon,
					dropText: m_props.css.dropText,
				},
			};

			const config = ui.utils.extend(true, defaultConfig, context.column);
			const dragDropTag = ui.dragDrop(config);

			function handleDropEvent(contextDragDrop) {
				// Process the files data and model it for the grid
				console.table(contextDragDrop.dataTransfer.files);
			}

			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: dragDropTag,
			});
		}

		function installTreeViewCell(context) {
			const defaultConfig = {
				parentTag: context.parentTag,
				css: {
					self: m_props.css.treeViewParent,
				},
			};

			const config = ui.utils.extend(true, defaultConfig, context.column);
			const treeViewTag = ui.treeView(config);

			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: treeViewTag,
			});
		}

		function installDropdownCell(context) {
			const defaultConfig = {
				css: {
					parent: m_props.css.dropDownParent,
					container: m_props.css.dropDownContainer,
					open: "open",
					button: {
						button: m_props.css.button,
					},
				},
				button: {
					text: "Open Dropdown",
				},
			};

			const config = ui.utils.extend(true, defaultConfig, context.column);
			config.parentTag = context.parentTag;
			const dropdownTag = ui.dropdown(config);

			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: dropdownTag,
			});
		}

		function installComboboxCell(context) {
			const defaultConfig = {
				css: {
					parent: m_props.css.comboboxParent,
					dropdown: {
						container: m_props.css.comboboxDropDownContainer,
					},
				},
			};

			const config = ui.utils.extend(true, defaultConfig, context.column);
			config.parentTag = context.parentTag;
			const comboboxTag = ui.combobox(config);

			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: comboboxTag,
			});
		}

		function installTimePickerCell(context) {
			const defaultConfig = {
				css: {
					combobox: {
						parent: m_props.css.timePickerParent,
						dropdown: {
							container: m_props.css.timePickerDropDownContainer,
						},
					},
				},
			};

			const config = ui.utils.extend(true, defaultConfig, context.column);
			config.parentTag = context.parentTag;
			const timePickerTag = ui.timePicker(config);

			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: timePickerTag,
			});
		}

		function installCalendarCell(context) {
			const defaultConfig = {
				css: {
					parent: m_props.css.calendarParent,
				},
			};

			const config = ui.utils.extend(true, defaultConfig, context.column);
			config.parentTag = context.parentTag;
			const calendarTag = ui.calendar(config);

			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: calendarTag,
			});
		}

		function installDatePickerCell(context) {
			const defaultConfig = {
				css: {
					parent: m_props.css.datePickerParent,
				},
			};

			const config = ui.utils.extend(true, defaultConfig, context.column);
			config.parentTag = context.parentTag;
			const datePickerTag = ui.datePicker(config);

			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: datePickerTag,
			});
		}

		function inputElChangeEvent(context) {
			updateGridData({
				value: context.Input.value(),
				column: context.column,
				rowIndex: context.rowIndex,
			});
		}

		function updateGridData(context) {
			m_gridDataChanged = true;
			m_gridData[context.rowIndex][context.column.dataKey] = context.value;
		}

		function getGridData() {
			return m_gridData;
		}

		function saveCellTagWidth(context) {
			if (!m_props.maxColWidth) {
				return;
			}

			// Save largest width value
			const tagWidth = ui.d.computeTagWidth(context.tag, context.parentTag);
			m_colsMaxPxWidth[context.colIndex] =
				tagWidth > m_colsMaxPxWidth[context.colIndex] ? tagWidth : m_colsMaxPxWidth[context.colIndex];
		}

		function setColsWidth() {
			return new Promise((resolve) => {
				m_colStylesId = ui.utils.getUniqueId();
				const styleTagConfig = { name: "style", attr: { id: m_colStylesId } };
				let styleEl = ui.d.createTag(styleTagConfig);

				const colsPromises = m_colsMaxPxWidth.map((width, index) => {
					return new Promise((resolve) => {
						// Create width adjustment style
						const adjWidth = width + m_props.colWidthAdj;

						let hdrSelector =
							m_parentTag.tagName.toLowerCase() +
							" " +
							m_gridHdrTag.tagName.toLowerCase() +
							" > *:nth-child(" +
							(index + 1) +
							")";

						let bodySelector =
							m_parentTag.tagName.toLowerCase() +
							" " +
							m_gridBodyTag.tagName.toLowerCase() +
							" " +
							m_gridBodyRowTagName +
							" > *:nth-child(" +
							(index + 1) +
							")";

						let style = `{ min-width:${adjWidth}px; width:${adjWidth}px; max-width:${adjWidth}px; }`;

						styleEl.appendChild(document.createTextNode(`${hdrSelector},${bodySelector}${style}`));
						resolve();
					});
				});

				Promise.all(colsPromises)
					.then(() => ui.d.append("head", styleEl))
					.then(resolve);
			});
		}

		function getRowIndex(context = {}) {
			return context.rowTag.getAttribute(m_rowIndexAttrName);
		}

		function applyColCellElStyles(columnConfig, tag) {
			return new Promise((resolve) => {
				tag.style.display = columnConfig.hide ? "none" : "";

				if (columnConfig.style && ui.utils.isObject(columnConfig.style)) {
					for (let key in columnConfig.style) {
						tag.style[key] = columnConfig.style[key];
					}
				}

				resolve();
			});
		}

		function commitDataChange() {
			m_gridDataChanged = null;
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
			if (!m_gridData || !Array.isArray(m_gridData)) {
				console.error("Data Grid alert: grid data not found or is not data type Array -->", m_parentTag);

				return false;
			}

			return true;
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Grid: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
					colWidthAdj: 5,
					layout: "grid",
					tilesWidth: "300px",
					tilesFillUp: true,
					tilesConfig: [],
				};

				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "grid" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "grid" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.grid = (props) => new ui.class.Grid(props);
customElements.define(ui.defaultTags.grid.self.name, ui.class.Grid);
