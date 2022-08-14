ui.class.Combobox = class Combobox extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_string = ui.string();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();

		// HTML tag variables
		let m_parentTag;
		let m_comboBoxParentTag;
		let m_input;
		let m_dropdownWrapperTag;
		let m_dropdown;
		let m_buttonGroup;

		let m_props;
		let m_comboBoxData = props.data;
		let m_value = "";
		let m_previous_text = "";

		// Configure public methods
		this.destroy = destroyComboBox;
		this.getParentTag = () => m_comboBoxParentTag;
		this.getSelected = () => m_buttonGroup.getSelected();
		this.install = installSelf;
		this.setup = setup;
		this.value = value;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			setupDOM();
		}

		function setupDOM() {
			m_comboBoxParentTag = dom.createTag(m_props.tags.parent, {
				class: m_props.css.parent,
			});
			self.appendChild(m_comboBoxParentTag);
			setupInput();
			setupDropdown();
		}

		function setupInput() {
			let input = m_utils.extend(true, {}, m_props.input);
			input.css = m_utils.extend(true, m_props.css.input, input.css);
			input.parentTag = m_comboBoxParentTag;
			m_input = ui.input(input);
		}

		function setupDropdown() {
			m_dropdownWrapperTag = dom.createTag("div", {
				class: m_props.css.dropdownWrapper,
			});
			dom.append(m_comboBoxParentTag, m_dropdownWrapperTag);

			let dropdown = m_utils.extend(true, {}, m_props.dropdown);
			dropdown.css = m_utils.extend(true, m_props.css.dropdown, dropdown.css);

			dropdown.fnBeforeClose = (context) => {
				const result = m_props.dropdown.fnBeforeClose ? m_props.dropdown.fnBeforeClose(context) : true;
				return (!context.ev || !m_input.getTag().contains(context.ev.target)) && result;
			};
			dropdown.fnComplete = (context) => {
				installButtonGroup(context.Dropdown, m_comboBoxData);

				if (m_props.dropdown.fnComplete) {
					m_props.dropdown.fnComplete(context);
				}
			};
			dropdown.parentTag = m_dropdownWrapperTag;
			m_dropdown = ui.dropdown(dropdown);
			loadDOM();
		}

		function installButtonGroup(dropdown, data) {
			if (!data || !Array.isArray(data)) {
				console.error("Data ComboBox alert: combobox data not found or is not data type Array -->", m_parentTag);
				return;
			}

			const contentTag = dropdown.getContentTag();
			contentTag.innerHTML = "";

			let buttonGroup = m_utils.extend(true, {}, m_props.buttonGroup);
			buttonGroup.parentTag = contentTag;
			buttonGroup.css = m_utils.extend(true, m_props.css.buttonGroup, buttonGroup.css);

			buttonGroup.buttons = data.map(processItemData);
			buttonGroup.fnClick = (context) => {
				let text = context.Button.text();
				m_input.value({ value: text });
				m_previous_text = text;
				m_value = context.Button.getId();
				dropdown.close();

				if (m_props.fnSelect) {
					m_props.fnSelect({
						Combobox: self,
						button: context.Button,
						ev: context.ev,
					});
				}

				if (m_props.buttonGroup.fnClick) {
					m_props.buttonGroup.fnClick(context);
				}
			};

			m_buttonGroup = ui.buttonGroup(buttonGroup);

			if (m_props.value) {
				setValue(m_props.value);
			}
		}

		function processItemData(itemData) {
			return {
				id: getItemDataId(itemData),
				text: getItemDataText(itemData),
			};
		}

		function filterItems() {
			if (m_props.filter) {
				const data = m_string.filterArray(m_comboBoxData, m_input.value(), getItemDataText, "contains");
				installButtonGroup(m_dropdown, data);
			}
		}

		function value(context = {}) {
			if (typeof context.value === "undefined") {
				return m_value;
			} else {
				setValue(context.value, context.ev);
			}
		}

		function setValue(value, ev) {
			m_input.value({ value: value });
			const item = m_string.findInArray(m_comboBoxData, value, getItemDataText, "equals");

			if (item) {
				m_buttonGroup.getTag({ id: getItemDataId(item) }).select();
			} else {
				m_previous_text = value;
				m_value = value;
				if (m_props.fnSelect) {
					m_props.fnSelect({ Combobox: self, ev: ev });
				}
			}
		}

		function getItemDataId(itemData) {
			return typeof itemData === "string" ? itemData : itemData[m_props.idField];
		}

		function getItemDataText(itemData) {
			return typeof itemData === "string" ? itemData : itemData[m_props.textField];
		}

		function handleKeyUp() {
			filterItems();
			m_buttonGroup.deselect();
			m_dropdown.open();
		}

		function handleBlur(ev) {
			if (!m_buttonGroup.getSelected() && m_previous_text !== m_input.value()) {
				setValue(m_input.value(), ev);
			}
		}

		function destroyComboBox() {
			dom.remove(m_comboBoxParentTag);
		}

		function loadDOM() {
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			if (m_props.fnComplete) m_props.fnComplete({ Combobox: self });
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
				input: {
					events: [
						{
							name: "keyup",
							fn: () => {
								handleKeyUp();
							},
						},
						{
							name: "blur",
							fn: (context) => {
								handleBlur(context.ev);
							},
						},
					],
				},
				dropdown: {
					button: {
						text: "",
					},
				},
				buttonGroup: {},
				idField: "id",
				textField: "text",
				filter: true,
				value: "",
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "combobox" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "combobox" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.combobox = (props) => new ui.class.Combobox(props);
customElements.define("mambo-combobox", ui.class.Combobox);
