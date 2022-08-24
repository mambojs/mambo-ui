ui.class.CheckboxRadio = class CheckboxRadio extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_checkboxLabelParentTag;
		let m_checkboxInputTag;
		let m_checkboxRadioSpanTag;

		let m_props;
		let m_type = 1; //1:checkbox 2:radio
		let m_enable = true;
		let m_checked = false;

		// Configure public methods
		this.destroy = destroyCheckboxRadio;
		this.enable = enable;
		this.getId = () => m_props.id;
		this.getParentTag = () => m_checkboxLabelParentTag;
		this.isCheckbox = isCheckbox;
		this.isRadio = isRadio;
		this.select = select;
		this.setup = setup;
		this.value = value;

		if (props) {
			setup(props);
		}

		async function setup(props) {
			await configure(props);
			await ui.utils.installUIComponent({ self, m_parentTag, m_props });
			await setupDOM();
			setupComplete();
		}

		function setupDOM() {
			return new Promise((resolve) => {
				m_checkboxLabelParentTag = ui.d.createTag(m_props.tags.label, {
					class: m_props.css.radioParent,
				});

				let textTag = ui.d.createTag(m_props.tags.radioText, {
					class: m_props.css.radioText,
					text: m_props.text,
				});

				m_type = m_props.attr.type === "checkbox" ? 1 : 2;
				let css = m_type === 1 ? m_props.css.checkbox : m_props.css.radio;

				const tagConfig = {
					class: css.input,
					prop: m_props.prop,
					attr: m_props.attr,
					text: m_props.value,
					event: {
						click: handleClick,
					},
				};

				m_checkboxInputTag = ui.d.createTag(m_props.tags.inputTag, tagConfig);
				m_checkboxRadioSpanTag = ui.d.createTag(m_props.tags.radioSpanTag, { class: css.span });
				m_checkboxLabelParentTag.appendChild(textTag);
				m_checkboxLabelParentTag.appendChild(m_checkboxInputTag);
				m_checkboxLabelParentTag.appendChild(m_checkboxRadioSpanTag);
				m_checked = m_props.prop?.checked;
				setEnable();
				self.classList.add(m_props.css.self);
				self.appendChild(m_checkboxLabelParentTag);
				resolve();
			});
		}

		function handleClick(ev) {
			if (m_enable) {
				switch (m_type) {
					case 1: //checkbox
						m_checked = !m_checked;
						break;
					case 2: //radio
						m_checked = true;
						break;
				}

				if (m_props.fnClick) {
					m_props.fnClick({ CheckboxRadio: self, ev: ev });
				}

				if (m_props.fnGroupClick) {
					m_props.fnGroupClick({ CheckboxRadio: self, ev: ev });
				}
			} else {
				ev.preventDefault();
			}
		}

		function select(context = {}) {
			if (typeof context.value === "undefined") {
				return m_checked;
			} else {
				checkInput(context.value, context.notTrigger);
			}
		}

		function checkInput(value, notTrigger) {
			if (m_enable) {
				if (notTrigger || m_type === 2) {
					m_checked = value;
					ui.d.setProps(m_checkboxInputTag, { checked: m_checked });
				} else {
					m_checkboxInputTag.click();
				}
			}
		}

		function enable({ enable }) {
			if (!enable) {
				return m_enable;
			} else {
				m_enable = enable;
				setEnable();
			}
		}

		function setEnable() {
			m_checkboxLabelParentTag.classList.toggle(m_props.css.disabled, !m_enable);
		}

		function value(context = {}) {
			if (typeof context.value === "undefined") {
				return m_checkboxInputTag.value;
			} else {
				m_checkboxInputTag.value = context.value;
			}
		}

		function isCheckbox() {
			return m_type === 1;
		}

		function isRadio() {
			return m_type === 2;
		}

		function destroyCheckboxRadio() {
			ui.d.remove(m_checkboxLabelParentTag);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ CheckboxRadio: self });
			}
		}

		function configure(customProps = {}) {
			m_props = {
				tag: "default",
				theme: "default",
				enable: true,
				attr: {
					type: "checkbox",
					name: Math.random().toString(36).slice(2),
				},
			};
			m_props = ui.utils.extend(true, m_props, customProps);
			m_parentTag = ui.d.getTag(m_props.parentTag);
			m_enable = m_props.enable;
			const tags = ui.tags.getTags({ name: m_props.tag, component: "checkboxRadio" });
			m_props.tags = ui.utils.extend(true, tags, m_props.tags);
			const css = ui.theme.getTheme({ name: m_props.theme, component: "checkboxRadio" });
			m_props.css = ui.utils.extend(true, css, m_props.css);
		}
	}
};

ui.checkboxRadio = (props) => new ui.class.CheckboxRadio(props);
customElements.define("mambo-checkbox-radio", ui.class.CheckboxRadio);
