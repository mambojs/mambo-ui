ui.class.Combobox = class Combobox extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
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
		this.getParentTag = () => self;
		this.getSelected = () => m_buttonGroup.getSelected();
		this.setup = setup;
		this.value = value;

		if (props) {
			setup(props);
		}

		async function setup(props) {
			await configure(props);
			await ui.utils.installUIComponent({ self, m_parentTag, m_props });
			await setupDOM();
			await setupInput();
			await setupDropdown();
			setupComplete();
		}

		async function setupDOM() {
			return new Promise((resolve) => {
				self.classList.add(m_props.css.self);
				resolve();
			});
		}

		function setupInput() {
			return new Promise((resolve) => {
				let input = ui.utils.extend(true, {}, m_props.input);
				input.css = ui.utils.extend(true, m_props.css.input, input.css);
				input.parentTag = self;
				m_input = ui.input(input);
				resolve();
			});
		}

		function setupDropdown() {
			return new Promise((resolve) => {
				m_dropdownWrapperTag = ui.d.createTag(m_props.tags.wrapper, {
					class: m_props.css.wrapper,
				});
				self.appendChild(m_dropdownWrapperTag);

				let dropdown = ui.utils.extend(true, {}, m_props.dropdown);
				dropdown.css = ui.utils.extend(true, m_props.css.dropdown, dropdown.css);

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
				resolve();
			});
		}

		function installButtonGroup(dropdown, data) {
			const contentTag = dropdown.getContentTag();
			contentTag.innerHTML = null;

			let buttonGroup = ui.utils.extend(true, {}, m_props.buttonGroup);
			buttonGroup.parentTag = contentTag;
			buttonGroup.css = ui.utils.extend(true, m_props.css.buttonGroup, buttonGroup.css);

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
				const data = ui.string.filterArray(m_comboBoxData, m_input.value(), getItemDataText, "contains");
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
			const item = ui.string.findInArray(m_comboBoxData, value, getItemDataText, "equals");

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
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Combobox: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
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
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "combobox" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "combobox" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.combobox = (props) => new ui.class.Combobox(props);
customElements.define("mambo-combobox", ui.class.Combobox);
