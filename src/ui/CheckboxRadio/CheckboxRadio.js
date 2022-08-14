ui.class.CheckboxRadio = class CheckboxRadio extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();

		// HTML tag variables
		let m_parentTag;
		let m_checkboxRadioParentTag;
		let m_checkboxRadioTag;
		let m_checkboxRadioSpanTag;

		let m_props;
		let m_type = 1; //1:checkbox 2:radio
		let m_enable = true;
		let m_checked = false;

		// Configure public methods
		this.destroy = destroyCheckboxRadio;
		this.enable = enable;
		this.getId = () => m_props.id;
		this.getParentTag = () => m_checkboxRadioParentTag;
		this.install = installSelf;
		this.isCheckbox = isCheckbox;
		this.isRadio = isRadio;
		this.select = select;
		this.setup = setup;
		this.value = value;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			setOptionValues();
			installDOM();
			setupEventHandler();
			finishSetup();
		}

		function setOptionValues() {
			m_enable = m_props.enable;
		}

		function installDOM() {
			installTags();
		}

		function installTags() {
			// Install checkbox / radio parent tag
			m_checkboxRadioParentTag = dom.createTag("label", {
				class: m_props.css.checkboxRadioParent,
			});

			self.appendChild(m_checkboxRadioParentTag);

			let textTag = dom.createTag("span", {
				class: m_props.css.checkboxRadioText,
				text: m_props.text,
			});
			m_checkboxRadioParentTag.appendChild(textTag);

			m_type = m_props.attr["type"] === "checkbox" ? 1 : 2;
			let css = m_type === 1 ? m_props.css.checkbox : m_props.css.radio;

			const tagConfig = {
				class: css.input,
				prop: m_props.prop,
				attr: m_props.attr,
				text: m_props.value,
			};
			m_checkboxRadioTag = dom.createTag("input", tagConfig);
			m_checkboxRadioSpanTag = dom.createTag("span", { class: css.span });

			m_checkboxRadioParentTag.appendChild(m_checkboxRadioTag);
			m_checkboxRadioParentTag.appendChild(m_checkboxRadioSpanTag);

			m_checked = m_props.prop["checked"];
			setEnable(m_enable);
		}

		function setupEventHandler() {
			m_checkboxRadioTag.addEventListener("click", handleClick);
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

				// Invoke callback for group
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
					dom.setProps(m_checkboxRadioTag, { checked: m_checked });
				} else {
					m_checkboxRadioTag.click();
				}
			}
		}

		function enable(context = {}) {
			if (typeof context.enable === "undefined") {
				return m_enable;
			} else {
				setEnable(context.enable);
			}
		}

		function setEnable(enable) {
			m_enable = enable;
			m_enable
				? dom.removeClass(m_checkboxRadioParentTag, m_props.css.disabled)
				: dom.addClass(m_checkboxRadioParentTag, m_props.css.disabled);
		}

		function value(context = {}) {
			if (typeof context.value === "undefined") {
				return m_checkboxRadioTag.value;
			} else {
				m_checkboxRadioTag.value = context.value;
			}
		}

		function isCheckbox() {
			return m_type === 1;
		}

		function isRadio() {
			return m_type === 2;
		}

		function destroyCheckboxRadio() {
			dom.remove(m_checkboxRadioParentTag);
		}

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
			if (m_props.fnComplete) m_props.fnComplete({ CheckboxRadio: self });
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
				enable: true,
				attr: {
					type: "checkbox",
					name: Math.random().toString(36).slice(2),
				},
				prop: {
					checked: false,
				},
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "checkboxRadio" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "checkboxRadio" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.checkboxRadio = (props) => new ui.class.CheckboxRadio(props);

customElements.define("mambo-checkbox-radio", ui.class.CheckboxRadio);
