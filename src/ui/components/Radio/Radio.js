ui.class.Radio = class Radio extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_labelTag;
		let m_inputTag;
		let m_spanTag;

		let m_props;
		let m_enable = true;
		let m_checked = false;

		// Configure public methods
		this.destroy = destroyRadio;
		this.enable = enable;
		this.getId = () => m_props.id;
		this.getParentTag = () => m_labelTag;
		this.select = select;
		this.setup = setup;
		this.value = value;

		if (props) {
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
				m_labelTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
				if (m_props.position === "right") {
					m_labelTag.classList.add("right");
				}

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
				m_spanTag = ui.d.createTag({ ...m_props.tags.span, class: m_props.css.span });

				if (m_props.position === "right") {
					m_labelTag.appendChild(textTag);
					m_labelTag.appendChild(m_inputTag);
					m_labelTag.appendChild(m_spanTag);
				} else {
					m_labelTag.appendChild(m_inputTag);
					m_labelTag.appendChild(m_spanTag);
					m_labelTag.appendChild(textTag);
				}

				m_checked = m_props.prop?.checked;
				setEnable();
				self.classList.add(m_props.css.self);
				self.appendChild(m_labelTag);
				resolve();
			});
		}

		function handleClick(ev) {
			if (m_enable) {
				m_checked = true;

				if (m_props.fnClick) {
					m_props.fnClick({ Radio: self, ev: ev });
				}

				if (m_props.fnGroupClick) {
					m_props.fnGroupClick({ Radio: self, ev: ev });
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
					m_checked = value;
					ui.d.setProps(m_inputTag, { checked: m_checked });
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
			m_labelTag.classList.toggle(m_props.css.disabled, !m_enable);
		}

		function value(context = {}) {
			if (typeof context.value === "undefined") {
				return m_inputTag.value;
			} else {
				m_inputTag.value = context.value;
			}
		}

		function destroyRadio() {
			ui.d.remove(m_labelTag);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Radio: self });
			}
		}

		function configure(customProps = {}) {
			m_props = {
				tag: "default",
				theme: "default",
				enable: true,
				position: "left",
			};
			m_props = ui.utils.extend(true, m_props, customProps);
			m_parentTag = ui.d.getTag(m_props.parentTag);
			m_enable = m_props.enable;
			const tags = ui.tags.getTags({ name: m_props.tag, component: "radio" });
			m_props.tags = ui.utils.extend(true, tags, m_props.tags);
			const css = ui.theme.getTheme({ name: m_props.theme, component: "radio" });
			m_props.css = ui.utils.extend(true, css, m_props.css);
		}
	}
};

ui.radio = (props) => new ui.class.Radio(props);
customElements.define(ui.defaultTags.radio.self.name, ui.class.Radio);
