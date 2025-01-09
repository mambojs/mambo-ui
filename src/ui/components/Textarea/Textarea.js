ui.class.Textarea = class Textarea extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_iconList = [];

		// HTML tag variables
		let m_buttonsContainerTag;
		let m_cancelButton;
		let m_containerDownTag;
		let m_containerUpTag;
		let m_checkButton;
		let m_dataChanged;
		let m_editButton;
		let m_editable;
		let m_footerTag;
		let m_iconsContainerTag;
		let m_iconRequiredTag;
		let m_labelTag;
		let m_parentTag;
		let m_props;
		let m_required;
		let m_spanTag;
		let m_textareaTag;
		let m_textRequiredTag;

		// Configure public methods
		this.commitDataChange = () => (m_dataChanged = null);
		this.dataChanged = () => m_dataChanged;
		this.editable = () => m_editable;
		this.getIconTagById = getIconTagById;
		this.getTag = () => m_textareaTag;
		this.showRequired = showRequired;
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
				self.classList.add(m_props.css.self);
				m_containerUpTag = ui.d.createTag({ ...m_props.tags.containerUp, class: m_props.css.containerUp });
				self.appendChild(m_containerUpTag);
				m_containerDownTag = ui.d.createTag({ ...m_props.tags.containerDown, class: m_props.css.containerDown });
				self.appendChild(m_containerDownTag);

				const tagConfig = {
					...m_props.tags.textarea,
					class: m_props.css.textarea,
					text: m_props.value,
					attr: m_props.attr.textarea,
					event: {
						blur: handleOnBlur,
						change: handleOnChange,
						keyup: handleOnKeyup,
					},
				};

				tagConfig.attr.name = m_props.name;
				m_textareaTag = ui.d.createTag(tagConfig);
				m_containerUpTag.appendChild(m_textareaTag);

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
					m_containerUpTag.appendChild(m_labelTag);
				}

				if (m_props?.validate?.onStart) {
					validate();
				}

				m_spanTag = ui.d.createTag({ ...m_props.tags.span, class: m_props.css.span, event: { click: handleClick } });
				m_containerUpTag.appendChild(m_spanTag);
				m_footerTag = ui.d.createTag({ ...m_props.tags.footer, class: m_props.css.footer });
				m_containerUpTag.appendChild(m_footerTag);
				m_buttonsContainerTag = ui.d.createTag({
					...m_props.tags.buttonsContainer,
					class: m_props.css.buttonsContainer,
				});
				m_footerTag.appendChild(m_buttonsContainerTag);
				m_iconsContainerTag = ui.d.createTag({ ...m_props.tags.iconsContainer, class: m_props.css.iconsContainer });
				m_footerTag.appendChild(m_iconsContainerTag);
				m_iconRequiredTag = ui.d.createTag({ ...m_props.tags.iconRequired, class: m_props.css.iconRequired });
				m_iconList.push(m_iconRequiredTag);
				m_footerTag.appendChild(m_iconRequiredTag);
				m_textRequiredTag = ui.d.createTag({ ...m_props.tags.textRequired, class: m_props.css.textRequired });
				m_textRequiredTag.innerText = m_props.requiredText;
				m_containerDownTag.appendChild(m_textRequiredTag);

				if (m_props.icon) {
					insertIcon();
				}

				if (m_props.editable) {
					installButtons().then(resolve);
					enableSpan();
				}

				if (m_props.required) {
					m_required = m_props.required;
				}
			});
		}

		function installButtons() {
			return new Promise((resolve) => {
				installEditButton().then(resolve);
				installCancelButton().then(resolve);
				installCheckButton().then(resolve);
			});
		}

		function installCancelButton() {
			return new Promise((resolve) => {
				if (m_props.editable) {
					const buttonConfig = {
						...m_props.cancelButton,
						css: m_props.css.cancelButton,
						parentTag: m_buttonsContainerTag,
						onComplete: resolve,
						onClick: (context) => {
							enableSpan();

							if (m_props.onClear) {
								m_props.onClear({
									Textarea: self,
									Button: context.Button,
									ev: context.ev,
								});
							}
						},
					};

					m_cancelButton = ui.button(buttonConfig);
				}
			});
		}

		function installEditButton() {
			return new Promise((resolve) => {
				if (m_props.editable) {
					const buttonConfig = {
						...m_props.editButton,
						css: m_props.css.editButton,
						parentTag: m_buttonsContainerTag,
						onComplete: resolve,
						onClick: (context) => {
							enableTextarea();

							if (m_props.onClick) {
								m_props.onClick({
									Textarea: self,
									Button: context.Button,
									ev: context.ev,
								});
							}
						},
					};

					m_editButton = ui.button(buttonConfig);
				}
			});
		}

		function installCheckButton() {
			return new Promise((resolve) => {
				if (m_props.editable) {
					const buttonConfig = {
						...m_props.checkButton,
						css: m_props.css.checkButton,
						parentTag: m_buttonsContainerTag,
						onComplete: resolve,
						onClick: (context) => {
							saveTextareaValue();

							if (m_props.onClick) {
								m_props.onClick({
									Textarea: self,
									Button: context.Button,
									ev: context.ev,
								});
							}
						},
					};

					m_checkButton = ui.button(buttonConfig);
				}
			});
		}

		function handleClick(ev) {
			if (m_props.preventDefault) {
				ev.preventDefault();
			}

			if (m_props.stopPropagation) {
				ev.stopPropagation();
			}

			if (!m_editable) enableTextarea();
		}

		function handleOnBlur(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			validate(ev);

			if (m_props.onBlur) {
				m_props.onBlur({
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

			if (m_props.onChange) {
				m_props.onChange({
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

			if (m_props.onKeyup) {
				m_props.onKeyup({
					Textarea: self,
					value: m_textareaTag.value,
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

					if (m_props.onDataValidationChange) {
						m_props.onDataValidationChange({
							Textarea: self,
							ev: ev,
						});
					}
				}
			}
		}

		function value(context = {}) {
			if (typeof context.value === "undefined") {
				return m_textareaTag.value;
			} else {
				m_textareaTag.value = context.value;
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
				m_iconsContainerTag.appendChild(iconTag);
			}
		}

		function getIconTagById(id) {
			return m_iconList.find((icon) => icon.id === id);
		}

		function enableTextarea() {
			m_editable = true;
			m_textareaTag.value = m_spanTag.innerText;
			m_textareaTag.style.display = "block";
			m_spanTag.style.display = "none";
			m_checkButton.style.display = "block";
			m_editButton.style.display = "none";
			m_cancelButton.style.display = "block";
			m_textareaTag.focus();
		}

		function saveTextareaValue() {
			m_spanTag.innerText = m_textareaTag.value;
			enableSpan();
		}

		function enableSpan() {
			m_editable = false;
			m_textareaTag.style.display = "none";
			m_spanTag.style.display = "inline-block";
			m_spanTag.scrollTop = 0;
			m_checkButton.style.display = "none";
			m_editButton.style.display = "block";
			m_cancelButton.style.display = "none";
		}

		function showRequired() {
			if (m_iconRequiredTag && m_props.required && m_textareaTag.value === "") {
				m_iconRequiredTag.classList.remove("hidden");
				m_textRequiredTag.classList.remove("hidden");
			} else {
				m_iconRequiredTag.classList.add("hidden");
				m_textRequiredTag.classList.add("hidden");
			}
		}

		function setupComplete() {
			if (m_props.onComplete) {
				m_props.onComplete({ Textarea: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
					id: Math.random().toString(36).slice(2),
					editButton: { text: "" },
					cancelButton: { text: "" },
					checkButton: { text: "" },
					icon: [],
					requiredText: "This is a required field.",
				};

				m_props = ui.utils.extend(true, m_props, customProps);
				m_editable = m_props.editable;
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
customElements.define(ui.defaultTags.textarea.self.name, ui.class.Textarea);
