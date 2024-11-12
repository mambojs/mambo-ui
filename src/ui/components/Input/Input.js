ui.class.Input = class Input extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_iconList = [];

		// HTML tag variables
		let m_required;
		let m_parentTag;
		let m_inputTag;
		let m_labelTag;
		let m_clearButton;
		let m_leftButton;
		let m_props;
		let m_dataChanged;
		let m_containerTag;
		let m_requiredTextTag;
		let m_iconRequiredTag;

		// Configure public methods
		this.commitDataChange = () => (m_dataChanged = null);
		this.clear = clearInput;
		this.clearButton = () => m_clearButton;
		this.dataChanged = () => m_dataChanged;
		this.getIconTagById = getIconTagById;
		this.getTag = () => m_inputTag;
		this.leftButton = () => m_leftButton;
		this.setup = setup;
		this.setAttr = setAttribute;
		this.showRequired = showRequired;
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
				self.classList.add(m_props.css.self);
				m_containerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
				self.appendChild(m_containerTag);

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
				tagConfig.attr.id = m_props.name;
				m_inputTag = ui.d.createTag(tagConfig);
				m_containerTag.appendChild(m_inputTag);

				if (m_props.icon) {
					insertIcon();
				}

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
					m_containerTag.appendChild(m_labelTag);
				}

				if (m_props?.validate?.onStart) {
					validate();
				}

				installLeftButton().then(resolve);
				installClearInput().then(resolve);

				if (m_props.required) {
					m_iconRequiredTag = ui.d.createTag({ ...m_props.tags.iconRequired, class: m_props.css.iconRequired });
					m_iconList.push(m_iconRequiredTag);
					m_containerTag.appendChild(m_iconRequiredTag);
					m_requiredTextTag = ui.d.createTag({ ...m_props.tags.textRequired, class: m_props.css.textRequired });
					if (m_props.requiredText) m_requiredTextTag.innerText = m_props.requiredText;
					self.appendChild(m_requiredTextTag);
				}
			});
		}

		function setAttribute(context) {
			for (const attr in context) {
				if (attr) {
					m_inputTag.setAttribute(attr, context[attr]);
				}
			}
		}

		function insertIcon() {
			if (Array.isArray(m_props.icon)) {
				m_props.icon.forEach((icon) => {
					addIcon(icon);
				});
			} else {
				addIcon(m_props.icon);
			}

			function addIcon(icon) {
				const cssClasses = [m_props.css.icon, icon.attr.class, icon.size].filter(Boolean).join(" ");

				const tagConfig = {
					class: cssClasses,
					prop: icon.prop,
					attr: icon.attr,
				};

				let iconTag = ui.d.createTag("i", tagConfig);
				m_iconList.push(iconTag);

				if (icon.position === "right") {
					m_containerTag.appendChild(iconTag);
				} else {
					m_containerTag.insertBefore(iconTag, m_inputTag);
				}
			}
		}

		function installClearInput() {
			return new Promise((resolve) => {
				if (m_props.enableClear) {
					const buttonConfig = {
						...m_props.clearButton,
						css: m_props.css.clearButton,
						parentTag: m_containerTag,
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

					m_clearButton = ui.button(buttonConfig);
				}
			});
		}

		function installLeftButton() {
			return new Promise((resolve) => {
				if (m_props.enableLeftButton) {
					const buttonConfig = {
						...m_props.leftButton,
						css: m_props.css.leftButton,
						parentTag: m_containerTag,
						fnComplete: resolve,
						fnMouseDown: (context) => {
							if (m_props.fnMouseDown) {
								m_props.fnMouseDown({
									Input: self,
									Button: context.Button,
									ev: context.ev,
								});
							}
						},
						fnMouseUp: (context) => {
							if (m_props.fnMouseUp) {
								m_props.fnMouseUp({
									Input: self,
									Button: context.Button,
									ev: context.ev,
								});
							}
						},
					};
					m_leftButton = ui.button(buttonConfig);
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
					Button: m_clearButton,
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

		function getIconTagById(id) {
			return m_iconList.find((icon) => icon.id === id);
		}

		function showRequired() {
			if (m_iconRequiredTag && m_props.required && m_inputTag.value === "") {
				m_iconRequiredTag.classList.remove("hidden");
				m_requiredTextTag.classList.remove("hidden");
			} else {
				m_iconRequiredTag.classList.add("hidden");
				m_requiredTextTag.classList.add("hidden");
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
					clearButton: { text: "" },
					leftButton: { text: "" },
					icon: [],
					requiredText: "This is a required field.",
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
