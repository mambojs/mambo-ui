ui.class.Checkbox = class Checkbox extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_containerTag;
		let m_inputTag;
		let m_spanTag;

		let m_props;
		let m_enable;
		let m_checked;

		// Configure public methods
		this.destroy = destroyCheckbox;
		this.enable = enable;
		this.getId = () => m_props.id;
		this.getParentTag = () => m_containerTag;
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
				m_containerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
				self.classList.add(m_props.css.self);
				self.appendChild(m_containerTag);

				const textTag = ui.d.createTag({
					...m_props.tags.text,
					class: m_props.css.text,
					text: m_props.text,
				});

				const tagConfig = {
					...m_props.tags.input,
					class: m_props.css.input,
					text: m_props.value,
					event: {
						click: handleClick,
					},
				};

				tagConfig.attr.name = Math.random().toString(36).slice(2);
				m_inputTag = ui.d.createTag(tagConfig);
				m_spanTag = ui.d.createTag({ ...m_props.tags.radioSpan, class: m_props.css.radioSpan });
				m_containerTag.appendChild(textTag);
				m_containerTag.appendChild(m_inputTag);
				m_containerTag.appendChild(m_spanTag);
				m_checked = m_props.prop?.checked;
				setEnable();
				resolve();
			});
		}

		function handleClick(ev) {
			if (m_enable) {
				m_checked = !m_checked;

				if (m_props.fnClick) {
					m_props.fnClick({ Checkbox: self, ev: ev });
				}

				if (m_props.fnGroupClick) {
					m_props.fnGroupClick({ Checkbox: self, ev: ev });
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
				if (notTrigger) {
					m_inputTag.click();
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
			m_containerTag.classList.toggle(m_props.css.disabled, !m_enable);
		}

		function value(context = {}) {
			if (typeof context.value === "undefined") {
				return m_inputTag.value;
			} else {
				m_inputTag.value = context.value;
			}
		}

		function destroyCheckbox() {
			ui.d.remove(m_containerTag);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Checkbox: self });
			}
		}

		function configure(customProps = {}) {
			m_props = {
				tag: "default",
				theme: "default",
				enable: true,
			};
			m_props = ui.utils.extend(true, m_props, customProps);
			m_parentTag = ui.d.getTag(m_props.parentTag);
			m_enable = m_props.enable;
			const tags = ui.tags.getTags({ name: m_props.tag, component: "checkbox" });
			m_props.tags = ui.utils.extend(true, tags, m_props.tags);
			const css = ui.theme.getTheme({ name: m_props.theme, component: "checkbox" });
			m_props.css = ui.utils.extend(true, css, m_props.css);
		}
	}
};

ui.checkbox = (props) => new ui.class.Checkbox(props);
customElements.define("mambo-checkbox", ui.class.Checkbox);
