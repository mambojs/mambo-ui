ui.class.Input = class Input extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_inputTag;
		let m_labelTag;

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
					class: m_props.css.input,
					prop: m_props.prop,
					attr: m_props.attr,
					text: m_props.value,
					event: {
						blur: handleOnBlur,
					},
				};

				m_inputTag = ui.d.createTag(m_props.tags.input, tagConfig);

				if (m_props.hidden) {
					self.style.display = "none";
				} else if (typeof m_props.labelText === "string") {
					const labelTagConfig = {
						class: m_props.css.label,
						prop: m_props.prop,
						attr: {
							for: m_props.attr.name,
						},
						text: m_props.labelText,
					};
					m_labelTag = ui.d.createTag("label", labelTagConfig);
					self.appendChild(m_labelTag);
				}

				//if leftSide and rigthSide are false we create a common input
				if (!m_props.leftSide && !m_props.rightSide) {
					appendInputElement(self);
				} else {
					//we check that we have components on the left side
					if (m_props.leftSide) {
						//if leftSide is an Array we iterate over all the elements and we then added to the wrapper
						//if not then we install the object into the wrapper
						if (Array.isArray(m_props.leftSide)) {
							m_props.leftSide.forEach(installComponentInsideWrapper);
						} else {
							installComponentInsideWrapper(m_props.leftSide);
						}
					}
					//appending the input component into the wrapper
					appendInputElement(self);

					//we check that we have component on the right side
					if (m_props.rightSide) {
						//if rigthSide is an Array we iterate over all the elements and we then added to the wrapper
						//if not then we install the object into the wrapper
						if (Array.isArray(m_props.rightSide)) {
							m_props.rightSide.forEach(installComponentInsideWrapper);
						} else {
							installComponentInsideWrapper(m_props.rightSide);
						}
					}
				}

				if (m_props.validate.onStart) {
					validate();
				}
				resolve();
			});
		}

		function appendInputElement(parent) {
			parent.appendChild(m_inputTag);

			if (m_props.maxLenWidth && !m_props.leftSide && !m_props.rightSide) {
				const width = `${m_props.attr.maxLength + m_props.maxLenWidthAdj}${m_props.maxLenWidthUnit}`;
				m_inputTag.style.width = width;
				m_inputTag.style.minWidth = width;
				m_inputTag.style.maxWidth = width;
			} else if (m_props.maxLenWidth) {
				const width = `${m_props.attr.maxLength + m_props.maxLenWidthAdj}${m_props.maxLenWidthUnit}`;
				self.style.width = width;
				self.style.minWidth = width;
				self.style.maxWidth = width;
			}
		}

		function installComponentInsideWrapper(item) {
			let componentConfig;
			if ("button" in item) {
				componentConfig = item.button;
				componentConfig.parentTag = self;
				if (!componentConfig.css) {
					componentConfig.css = m_props.css;
				}
				componentConfig.fnClick = (context) => {
					if (m_props.fnClick) {
						m_props.fnClick({
							Input: self,
							Button: context.Button,
							ev: context.ev,
						});
					}
				};
				ui.button(componentConfig);
			} else {
				componentConfig = item.img;
				if (!componentConfig.css) {
					componentConfig.css = m_props.css.img;
				}
				const tagConfig = {
					class: componentConfig.css,
					prop: componentConfig.prop,
					attr: componentConfig.attr,
				};
				let component = ui.d.createTag("img", tagConfig);
				self.appendChild(component);
			}
		}

		function handleOnBlur(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			validate(ev);
		}

		function validate(ev) {
			if (!Array.isArray(m_props.validate.types)) {
				return;
			}

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
					value: "",
					validate: [
						{
							//Used for configuring field validations
						},
					],
					attr: {
						type: "text",
						name: Math.random().toString(36).slice(2),
					},
					maxLenWidthAdj: 1,
					maxLenWidthUnit: "ch",
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
