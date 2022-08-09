ui.class.Input = class Input extends HTMLElement {
	constructor(initOptions) {
		super();
		// Config default values
		const self = this;
		const m_utils = new ui.utils();
		const m_theme = ui.theme(ui.defaultTheme);

		// HTML tag variables
		let m_parentTag;
		let m_inputTag;
		let m_labelTag;
		let m_wrapperTag;

		let m_config;
		let m_dataChanged;

		// Configure public methods
		this.clear = clearInput;
		this.commitDataChange = () => (m_dataChanged = null);
		this.dataChanged = () => m_dataChanged;
		this.getTag = () => m_inputTag;
		this.install = installSelf;
		this.setup = setup;
		this.value = value;

		if (initOptions) setup(initOptions);

		function setup(options) {
			configure(options);
			installDOM();
			setupEventListeners();
		}

		function installDOM() {
			//create the wrapper div container for the input
			m_wrapperTag = dom.createTag("div", {
				class: m_config.css.inputWrapper,
			});
			const tagConfig = {
				class: m_config.css.input,
				prop: m_config.prop,
				attr: m_config.attr,
				text: m_config.value,
			};
			m_inputTag = dom.createTag(m_config.tag, tagConfig);

			if (m_config.hidden) {
				m_wrapperTag.style.display = "none";
			} else if (typeof m_config.labelText === "string") {
				const labelTagConfig = {
					class: m_config.css.label,
					prop: m_config.prop,
					attr: {
						for: m_config.attr.name,
					},
					text: m_config.labelText,
				};
				m_labelTag = dom.createTag("label", labelTagConfig);
				// dom.append(m_parentTag, m_labelTag);
				self.appendChild(m_labelTag);
			}

			// Append wrapper
			// dom.append(m_parentTag, m_wrapperTag);
			self.appendChild(m_wrapperTag);

			//if leftSide and rigthSide are false we create a common input
			if (!m_config.leftSide && !m_config.rightSide) {
				appendInputElement(m_wrapperTag);
			} else {
				//we check that we have components on the left side
				if (m_config.leftSide) {
					//if leftSide is an Array we iterate over all the elements and we then added to the wrapper
					//if not then we install the object into the wrapper
					if (Array.isArray(m_config.leftSide)) {
						m_config.leftSide.forEach(installComponentInsideWrapper);
					} else {
						installComponentInsideWrapper(m_config.leftSide);
					}
				}
				//appending the input component into the wrapper
				appendInputElement(m_wrapperTag);

				//we check that we have component on the right side
				if (m_config.rightSide) {
					//if rigthSide is an Array we iterate over all the elements and we then added to the wrapper
					//if not then we install the object into the wrapper
					if (Array.isArray(m_config.rightSide)) {
						m_config.rightSide.forEach(installComponentInsideWrapper);
					} else {
						installComponentInsideWrapper(m_config.rightSide);
					}
				}
			}

			if (m_config.validate.onStart) {
				validate();
			}

			finishSetup();
		}

		function appendInputElement(parent) {
			dom.append(parent, m_inputTag);

			if (m_config.maxLenWidth && !m_config.leftSide && !m_config.rightSide) {
				const width = `${m_config.attr.maxLength + m_config.maxLenWidthAdj}${m_config.maxLenWidthUnit}`;
				m_inputTag.style.width = width;
				m_inputTag.style.minWidth = width;
				m_inputTag.style.maxWidth = width;
			} else if (m_config.maxLenWidth) {
				const width = `${m_config.attr.maxLength + m_config.maxLenWidthAdj}${m_config.maxLenWidthUnit}`;
				m_wrapperTag.style.width = width;
				m_wrapperTag.style.minWidth = width;
				m_wrapperTag.style.maxWidth = width;
			}
		}

		function installComponentInsideWrapper(item) {
			let componentConfig;
			if ("button" in item) {
				componentConfig = item.button;
				componentConfig.parentTag = m_wrapperTag;
				if (!componentConfig.css) {
					componentConfig.css = m_config.css;
				}
				componentConfig.fnClick = (context) => {
					if (m_config.fnClick) {
						m_config.fnClick({
							input: self,
							button: context.button,
							ev: context.ev,
						});
					}
				};
				ui.button(componentConfig);
			} else {
				componentConfig = item.img;
				if (!componentConfig.css) {
					componentConfig.css = m_config.css.img;
				}
				const tagConfig = {
					class: componentConfig.css,
					prop: componentConfig.prop,
					attr: componentConfig.attr,
				};
				let component = dom.createTag("img", tagConfig);
				dom.append(m_wrapperTag, component);
			}
		}

		function setupEventListeners() {
			if (m_config.events && Array.isArray(m_config.events)) {
				m_config.events.forEach((event) => {
					m_inputTag.addEventListener(event.name, (ev) => {
						event.fn({
							input: self,
							ev: ev,
						});
					});
				});
			}
			// Always handle onBlur internally
			m_inputTag.addEventListener("blur", handleOnBlur);
		}

		function handleOnBlur(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			validate(ev);
		}

		function validate(ev) {
			if (!Array.isArray(m_config.validate.types)) {
				return;
			}

			m_config.validate.types.forEach((validate) => {
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

					if (m_config.fnDataValidationChange) {
						m_config.fnDataValidationChange({
							input: self,
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

		function finishSetup() {
			// Install component into parent
			if (m_config.install) installSelf(m_parentTag, m_config.installPrepend);

			// Execute complete callback function
			if (m_config.fnComplete) {
				m_config.fnComplete({
					input: self,
				});
			}
		}

		function installSelf(parentTag, prepend) {
			m_parentTag = parentTag ? parentTag : m_parentTag;
			m_parentTag = dom.appendSelfToParentTag(m_parentTag, self, prepend);
		}

		function configure(options) {
			m_config = {
				parentTag: undefined,
				install: true,
				installPrepend: false,
				tag: "input",
				value: "",
				css: {
					input: "input-input",
					label: "input-label",
					inputWrapper: "input-wrapper",
					button: "input-button",
					img: "input-img",
				},
				validate: [
					{
						//Used for configuring field validations
					},
				],
				attr: {
					type: "text",
					name: Math.random().toString(36).slice(2),
				},
				prop: {},
				events: [
					{
						name: "input",
						fn: (context) => {},
					},
				],
				maxLenWidthAdj: 1,
				maxLenWidthUnit: "ch",
				theme: "default",
			};

			// If options provided, override default config
			if (options) {
				m_config = m_utils.extend(true, m_config, options);
			}

			if (m_config.parentTag) {
				m_parentTag = dom.getTag(m_config.parentTag);
			}

			m_config.css = m_utils.extend(
				true,
				m_theme.getTheme({
					name: m_config.theme,
					control: "mambo-input",
				}),
				m_config.css
			);
		}
	}
};

ui.input = (options) => new ui.class.Input(options);

// Must ALWAYS define the new element as a Native Web Component
customElements.define("mambo-input", ui.class.Input);
