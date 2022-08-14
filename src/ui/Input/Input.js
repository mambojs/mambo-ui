ui.class.Input = class Input extends HTMLElement {
	constructor(props) {
		super();
		// Config default values
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();

		// HTML tag variables
		let m_parentTag;
		let m_inputTag;
		let m_labelTag;
		let m_wrapperTag;

		let m_props;
		let m_dataChanged;

		// Configure public methods
		this.clear = clearInput;
		this.commitDataChange = () => (m_dataChanged = null);
		this.dataChanged = () => m_dataChanged;
		this.getTag = () => m_inputTag;
		this.install = installSelf;
		this.setup = setup;
		this.value = value;

		if (props) setup(props);

		function setup(options) {
			configure(options);
			installDOM();
			setupEventListeners();
			finishSetup();
		}

		function installDOM() {
			//create the wrapper div container for the input
			m_wrapperTag = dom.createTag("div", {
				class: m_props.css.inputWrapper,
			});

			const tagConfig = {
				class: m_props.css.input,
				prop: m_props.prop,
				attr: m_props.attr,
				text: m_props.value,
			};

			m_inputTag = dom.createTag(m_props.tags.parent, tagConfig);

			if (m_props.hidden) {
				m_wrapperTag.style.display = "none";
			} else if (typeof m_props.labelText === "string") {
				const labelTagConfig = {
					class: m_props.css.label,
					prop: m_props.prop,
					attr: {
						for: m_props.attr.name,
					},
					text: m_props.labelText,
				};
				m_labelTag = dom.createTag("label", labelTagConfig);
				// dom.append(m_parentTag, m_labelTag);
				self.appendChild(m_labelTag);
			}

			self.appendChild(m_wrapperTag);

			//if leftSide and rigthSide are false we create a common input
			if (!m_props.leftSide && !m_props.rightSide) {
				appendInputElement(m_wrapperTag);
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
				appendInputElement(m_wrapperTag);

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
		}

		function appendInputElement(parent) {
			dom.append(parent, m_inputTag);

			if (m_props.maxLenWidth && !m_props.leftSide && !m_props.rightSide) {
				const width = `${m_props.attr.maxLength + m_props.maxLenWidthAdj}${m_props.maxLenWidthUnit}`;
				m_inputTag.style.width = width;
				m_inputTag.style.minWidth = width;
				m_inputTag.style.maxWidth = width;
			} else if (m_props.maxLenWidth) {
				const width = `${m_props.attr.maxLength + m_props.maxLenWidthAdj}${m_props.maxLenWidthUnit}`;
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
				let component = dom.createTag("img", tagConfig);
				dom.append(m_wrapperTag, component);
			}
		}

		function setupEventListeners() {
			if (m_props.events && Array.isArray(m_props.events)) {
				m_props.events.forEach((event) => {
					m_inputTag.addEventListener(event.name, (ev) => {
						event.fn({
							Input: self,
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

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
			if (m_props.fnComplete) m_props.fnComplete({ Input: self });
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
				events: [
					{
						name: "input",
						fn: (context) => {},
					},
				],
				maxLenWidthAdj: 1,
				maxLenWidthUnit: "ch",
			};

			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "input" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "input" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.input = (props) => new ui.class.Input(props);

// Must ALWAYS define the new element as a Native Web Component
customElements.define("mambo-input", ui.class.Input);
