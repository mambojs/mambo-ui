ui.class.Grid = class Grid extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();

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

		let m_props;
		let m_gridData = props.data;
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
		this.install = installSelf;
		this.removeColsStyles = removeColsStyles;
		this.setup = setup;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			// Validate grid layout
			switch (m_props.layout) {
				case "tile":
					installTiles();
					break;

				case "grid":
					installGrid();
					break;
			}

			finishSetup();
		}

		function installTiles() {
			m_tileParentTag = dom.createTag(m_props.tags.tilesParent, {
				class: m_props.css.tilesParent,
			});
			m_tileIndexAttrName = "data-grid-tile-index";
			self.appendChild(m_tileParentTag);

			if (!validateGridData()) {
				return;
			}

			m_gridData.forEach((tileData, tileIndex) => {
				installTile(tileData, tileIndex);
			});
		}

		function installTile(tileData, tileIndex) {
			// Create tile parent tag
			let tileTag = dom.createTag(m_props.tags.tileItem, {
				class: m_props.css.tileItem,
				attr: { m_tileIndexAttrName: tileIndex },
			});
			dom.append(m_tileParentTag, tileTag);
			m_tileParentTags[tileIndex] = tileTag;

			processTile(tileData, tileIndex, tileTag);
		}

		function processTile(tileData, tileIndex, tileTag) {
			if (m_props.tileHTML) {
				let content = dom.supplantHTML(m_props.tileHTML, tileData);
				dom.append(tileTag, content);
			}

			// Invoke callback for each completed tile
			if (m_props.fnPostTile) {
				m_props.fnPostTile({
					tileIndex: tileIndex,
					tileTag: tileTag,
					tileData: tileData,
				});
			}
		}

		function installGrid() {
			m_gridParentTag = dom.createTag(m_props.tags.gridParent, {
				class: m_props.css.gridParent,
			});
			m_gridHdrTag = dom.createTag(m_props.tags.gridHdr, {
				class: m_props.css.gridHdr,
			});
			m_gridBodyTag = dom.createTag(m_props.tags.gridBody, {
				class: m_props.css.gridBody,
			});
			m_gridBodyRowTagName = "data-grid-row";
			m_rowIndexAttrName = "data-grid-row-index";

			// Install grid parent tag
			dom.append(m_gridParentTag, m_gridHdrTag).append(m_gridParentTag, m_gridBodyTag);
			self.appendChild(m_gridParentTag);

			// Install the header tags
			installHdr();
		}

		function installHdr() {
			m_props.columns.forEach((column) => {
				let parentTag = dom.createTag(m_props.tags.colCell, {
					class: m_props.css.colCell,
				});
				applyColCellElStyles(column, parentTag);

				const txtEl = dom.createTag("text", {
					text: column.title ? column.title : column.name,
				});
				dom.append(parentTag, txtEl);
				dom.append(m_gridHdrTag, parentTag);

				//Give it a millisecond for the dom. to calculate .clientWidth
				setTimeout(() => {
					m_colsMaxPxWidth.push(dom.computeTagWidth(txtEl));
				}, 1);
			});

			//Give it a millisecond for the dom. to calculate tags
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

			if (m_props.maxColWidth) {
				setTimeout(() => {
					setColsWidth();
				}, 1);
			} else {
				finishSetup();
			}

			function processRow(rowData, rowIndex) {
				// Create row parent tag
				let rowTag = dom.createTag(m_props.tags.row, {
					class: m_props.css.row,
					attr: { m_rowIndexAttrName: rowIndex },
				});
				dom.append(m_gridBodyTag, rowTag);

				// Loop through the header configuration
				m_props.columns.forEach((column, colIndex) => {
					// Create cell parent
					const parentTag = dom.createTag(m_props.tags.colCell, {
						class: m_props.css.colCell,
					});
					applyColCellElStyles(column, parentTag);
					dom.append(rowTag, parentTag);

					const context = {
						column: column,
						parentTag: parentTag,
						colIndex: colIndex,
						rowIndex: rowIndex,
						rowData: rowData,
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
				if (m_props.fnPostRow) {
					m_props.fnPostRow({
						rowIndex: rowIndex,
						rowTag: rowTag,
						rowData: rowData,
					});
				}
			}
		}

		function installTextCell(context) {
			const text = context.column.dataKey in context.rowData ? context.rowData[context.column.dataKey] : context.column.text;
			const tagConfig = {
				class: m_props.css.text,
				prop: context.column.prop,
				attr: context.column.attr,
				text,
			};
			const textTag = dom.createTag("text", tagConfig);
			dom.append(context.parentTag, textTag);

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
					input: m_props.css.input,
					button: m_props.css.button,
				},
				value: context.column.dataKey in context.rowData ? context.rowData[context.column.dataKey] : context.column.text,
			};

			inputConfig = m_utils.extend(true, inputConfig, context.column);

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

			chooserConfig = m_utils.extend(true, chooserConfig, context.column);
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
				title: "Dialog Title",
				css: {
					button: m_props.css.button,
				},
			};

			const dialogConfig = m_utils.extend(true, dialogDefaultConfig, context.column);
			dialogConfig.fnClick = () => {
				ui.dialog(dialogConfig.parentTag, dialogConfig, (contextReady) => {
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
			let buttonGroupConfig = m_utils.extend(true, { css: { button: m_props.css.button } }, context.column);
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

			const config = m_utils.extend(true, defaultConfig, context.column);
			config.fnClick = () => {
				slideoutTag.open();
			};

			config.parentTag = context.parentTag;
			const buttonTag = ui.button(config);

			const slideoutConfig = m_utils.extend(true, {}, config);
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

			const config = m_utils.extend(true, defaultConfig, context.column);
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
					treeViewParent: m_props.css.treeViewParent,
				},
			};

			const config = m_utils.extend(true, defaultConfig, context.column);
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

			const config = m_utils.extend(true, defaultConfig, context.column);
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

			const config = m_utils.extend(true, defaultConfig, context.column);
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

			const config = m_utils.extend(true, defaultConfig, context.column);
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

			const config = m_utils.extend(true, defaultConfig, context.column);
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

			const config = m_utils.extend(true, defaultConfig, context.column);
			config.parentTag = context.parentTag;
			const datePickerTag = ui.datePicker(config);

			addComponentToMap({
				column: context.column,
				colIndex: context.colIndex,
				component: datePickerTag,
			});
		}

		function inputElChangeEvent(context) {
			m_props.events.inputChange({
				input: context.Input,
				column: context.column,
				rowIndex: context.rowIndex,
				rowData: context.rowData,
				ev: context.ev,
			});
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
			const tagWidth = dom.computeTagWidth(context.tag, context.parentTag);
			m_colsMaxPxWidth[context.colIndex] =
				tagWidth > m_colsMaxPxWidth[context.colIndex] ? tagWidth : m_colsMaxPxWidth[context.colIndex];
		}

		function setColsWidth() {
			// Declare style tag
			m_colStylesId = m_utils.getUniqueId();
			let styleEl = dom.createTag("style", { attr: { id: m_colStylesId } });

			m_colsMaxPxWidth.forEach((width, index) => {
				// Create width adjustment style
				const adjWidth = width + m_props.colWidthAdj;
				let hdrSelector =
					m_parentTag.tagName.toLowerCase() + " " + m_gridHdrTag.tagName.toLowerCase() + " > *:nth-child(" + (index + 1) + ")";
				let bodySelector =
					m_parentTag.tagName.toLowerCase() +
					" " +
					m_gridBodyTag.tagName.toLowerCase() +
					" " +
					m_gridBodyRowTagName +
					" > *:nth-child(" +
					(index + 1) +
					")";
				let style = `{
                        min-width:${adjWidth}px;
                        width:${adjWidth}px;
                        max-width:${adjWidth}px;
                    }`;
				dom.append(styleEl, document.createTextNode(`${hdrSelector},${bodySelector}${style}`));
			});

			// Append to HTML HEAD tag
			dom.append("head", styleEl);

			finishSetup();
		}

		function getRowIndex(context = {}) {
			return context.rowTag.getAttribute(m_rowIndexAttrName);
		}

		function applyColCellElStyles(columnConfig, tag) {
			tag.style.display = columnConfig.hide ? "none" : "";

			if (columnConfig.style && m_utils.isObject(columnConfig.style)) {
				for (let key in columnConfig.style) {
					tag.style[key] = columnConfig.style[key];
				}
			}
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
				finishSetup();
				return false;
			}

			return true;
		}

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
			if (m_props.fnComplete) m_props.fnComplete({ Grid: self });
		}

		function installSelf(parentTag, prepend) {
			m_parentTag = parentTag ? parentTag : m_parentTag;
			m_parentTag = dom.getTag(m_parentTag);
			dom.append(m_parentTag, self, prepend);
		}

		function configure(customProps) {
			m_props = {
				install: true,
				tag: "default",
				theme: "default",
				events: {
					inputChange: (context) => {
						// example on how global event listener configuration works
						// 'input' is the dom. tag name. 'Change' is the addEventListener name
					},
				},
				maxColWidth: false,
				colWidthAdj: 5,
				layout: "grid",
				tileHTML: "",
				tilesWidth: "300px",
				tilesFillUp: true,
				tilesDense: false,
				tilesConfig: [],
			};

			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "grid" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "grid" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.grid = (props) => new ui.class.Grid(props);

customElements.define("mambo-grid", ui.class.Grid);
