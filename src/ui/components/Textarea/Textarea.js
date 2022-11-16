ui.class.Textarea = class Textarea extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_textareaTag;
		let m_labelTag;
		let m_button;
		let m_props;
		let m_dataChanged;

		// Configure public methods
		this.clear = clearTextarea;
		this.commitDataChange = () => (m_dataChanged = null);
		this.dataChanged = () => m_dataChanged;
		this.getTag = () => m_textareaTag;
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
				self.classList.add(m_props.css.self);

				const tagConfig = {
					...m_props.tags.textarea,
					class: m_props.css.textarea,
					text: m_props.value,
					event: {
						blur: handleOnBlur,
						change: handleOnChange,
						keyup: handleOnKeyup,
					},
				};

				tagConfig.attr.name = m_props.name;
				m_textareaTag = ui.d.createTag(tagConfig);
				self.appendChild(m_textareaTag);

				if (m_props.hidden) {
					self.style.display = "none";
				} else if (ui.utils.isString(m_props.labelText)) {
					const labelTagConfig = {
						name: "label",
						class: m_props.css.label,
						prop: m_props.prop,
						attr: { for: m_props.name },
						text: m_props.labelText,
					};

					m_labelTag = ui.d.createTag(labelTagConfig);
					self.appendChild(m_labelTag);
				}

				if (m_props?.validate?.onStart) {
					validate();
				}

				installClearTextarea().then(resolve);
			});
		}

		function installClearTextarea() {
			return new Promise((resolve) => {
				if (m_props.enableClear) {
					const buttonConfig = {
						...m_props.button,
						css: m_props.css.button,
						parentTag: self,
						fnComplete: resolve,
						fnClick: (context) => {
							clearTextarea();

							if (m_props.fnClear) {
								m_props.fnClear({
									Textarea: self,
									Button: context.Button,
									ev: context.ev,
								});
							}
						},
					};

					ui.button(buttonConfig);
				}
			});
		}

		function handleOnBlur(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			validate(ev);

			if (m_props.fnBlur) {
				m_props.fnBlur({
					Textarea: self,
					value: m_textareaTag.value,
					ev: ev,
				});
			}
		}

		function handleOnChange(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			validate(ev);

			if (m_props.fnChange) {
				m_props.fnChange({
					Textarea: self,
					value: m_textareaTag.value,
					ev: ev,
				});
			}
		}

		function handleOnKeyup(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			validate(ev);

			if (m_props.fnKeyup) {
				m_props.fnKeyup({
					Textarea: self,
					value: m_textareaTag.value,
					Button: m_button,
					ev: ev,
				});
			}
		}

		function validate(ev) {
			if (Array.isArray(m_props.validate?.types)) {
				m_props.validate.types.forEach((validate) => {
					const keys = Object.keys(validate);
					keys.forEach((key) => {
						switch (key) {
							case "minLength":
								validateMinLength(validate.minLength, ev);
								break;
						}
					});
				});
			}
		}

		function validateMinLength(config, ev) {
			const curLen = m_textareaTag.value.length;
			if (typeof config.value === "string") {
				const length = config.len - curLen;
				if (length > 0) {
					const padding = config.value.repeat(length);
					m_dataChanged = true;
					m_textareaTag.value = config.dir === "right" ? m_textareaTag.value + padding : padding + m_textareaTag.value;

					if (m_props.fnDataValidationChange) {
						m_props.fnDataValidationChange({
							Textarea: self,
							ev: ev,
						});
					}
				}
			}
		}

		function clearTextarea() {
			m_textareaTag.value = "";
		}

		function value(context = {}) {
			if (typeof context.value === "undefined") {
				return m_textareaTag.value;
			} else {
				m_textareaTag.value = context.value;
			}
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Textarea: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
					name: Math.random().toString(36).slice(2),
					button: { text: "" },
				};

				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "textarea" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "textarea" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.textarea = (props) => new ui.class.Textarea(props);
customElements.define("mambo-textarea", ui.class.Textarea);
