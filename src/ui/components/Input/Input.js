ui.class.Input = class Input extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_inputTag;
		let m_labelTag;
		let m_button;
		let m_props;
		let m_dataChanged;

		// Configure public methods
		this.clear = clearInput;
		this.commitDataChange = () => (m_dataChanged = null);
		this.dataChanged = () => m_dataChanged;
		this.getTag = () => m_inputTag;
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
					...m_props.tags.input,
					class: m_props.css.input,
					text: m_props.value,
					event: {
						blur: handleOnBlur,
						change: handleOnChange,
						keyup: handleOnKeyup,
					},
				};

				tagConfig.attr.name = m_props.name;
				m_inputTag = ui.d.createTag(tagConfig);
				self.appendChild(m_inputTag);

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

				installClearInput().then(resolve);
			});
		}

		function installClearInput() {
			return new Promise((resolve) => {
				if (m_props.enableClear) {
					const buttonConfig = {
						...m_props.button,
						css: m_props.css.button,
						parentTag: self,
						fnComplete: resolve,
						fnClick: (context) => {
							clearInput();

							if (m_props.fnClear) {
								m_props.fnClear({
									Input: self,
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
					Input: self,
					value: m_inputTag.value,
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
					Input: self,
					value: m_inputTag.value,
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
					Input: self,
					value: m_inputTag.value,
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
			const curLen = m_inputTag.value.length;
			if (typeof config.value === "string") {
				const length = config.len - curLen;
				if (length > 0) {
					const padding = config.value.repeat(length);
					m_dataChanged = true;
					m_inputTag.value = config.dir === "right" ? m_inputTag.value + padding : padding + m_inputTag.value;

					if (m_props.fnDataValidationChange) {
						m_props.fnDataValidationChange({
							Input: self,
							ev: ev,
						});
					}
				}
			}
		}

		function clearInput() {
			m_inputTag.value = "";
		}

		function value(context = {}) {
			if (typeof context.value === "undefined") {
				return m_inputTag.value;
			} else {
				m_inputTag.value = context.value;
			}
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Input: self });
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
				const tags = ui.tags.getTags({ name: m_props.tag, component: "input" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "input" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.input = (props) => new ui.class.Input(props);
customElements.define("mambo-input", ui.class.Input);
