ui.class.CheckboxRadioGroup = class CheckboxRadioGroup extends HTMLElement {
	constructor(parentTag, options) {
		super();
		const self = this;
		const m_utils = new ui.utils();
		const m_theme = ui.theme(ui.g_defaultTheme);

		// HTML tag variables
		const m_checkboxRadiosList = [];
		let m_checkboxRadioGroupTag;
		let m_parentTag;

		let m_config;

		// Configure public methods
		this.clear = clear;
		this.destroy = destroyCheckboxRadioGroup;
		this.getParentTag = () => m_checkboxRadioGroupTag;
		this.getTag = getTagById;
		this.select = select;

		// Config default values
		configure();

		// Begin setup
		setup();

		function setup() {
			m_parentTag = dom.getTag(parentTag);
			if (!m_parentTag) {
				console.error(`Checkbox Group: dom. tag ${parentTag} not found.`);
				return;
			}

			m_checkboxRadioGroupTag = dom.createTag(m_config.tag.parent, {
				class: m_config.css.parent,
			});

			dom.append(m_parentTag, m_checkboxRadioGroupTag);

			// Loop through all the checkbox
			if (m_config.checkboxes) {
				m_config.checkboxes.forEach(installCheckbox);
			}

			// Loop through all the radios
			if (m_config.radios) {
				m_config.radios.forEach(installRadio);
			}
		}

		function installCheckbox(checkbox) {
			installTag(checkbox, "checkbox");
		}

		function installRadio(radio) {
			installTag(radio, "radio");
		}

		function installTag(tag, type) {
			tag.css = tag.css ? m_utils.extend(true, m_config.css, tag.css) : m_config.css;
			const attr = {
				type: type,
				name: m_config.name,
			};
			tag.attr = m_utils.extend(true, attr, tag.attr);
			tag.fnGroupClick = handleGroupClick;

			m_checkboxRadiosList.push(ui.checkboxRadio(m_checkboxRadioGroupTag, tag));
		}

		function handleGroupClick(context) {
			if (context.checkboxRadio.isRadio()) {
				selectTag(context.checkboxRadio, true);
			}

			// If same callback for all checkboxes / radios
			if (m_config.fnClick) {
				m_config.fnClick(context);
			}

			if (m_config.fnGroupClick) {
				m_config.fnGroupClick({
					checkboxRadioGroup: self,
					checkboxRadio: context.checkboxRadio,
					ev: context.ev,
				});
			}
		}

		function getTag(id) {
			return m_checkboxRadiosList.find((tag) => tag.getId() === id);
		}

		function getSelected() {
			return m_checkboxRadiosList.filter((tag) => tag.select());
		}

		function selectTag(tag, notTrigger) {
			if (tag) {
				if (tag.isCheckbox()) {
					tag.select({ value: true, notTrigger: notTrigger });
				}
				if (tag.isRadio()) {
					deselectRadios();
					tag.select({ value: true, notTrigger: notTrigger });
				}
			}
		}

		function deselectRadios() {
			m_checkboxRadiosList.forEach((tag) => {
				if (tag.isRadio()) {
					tag.select({ value: false, notTrigger: true });
				}
			});
		}

		function getTagById(context = {}) {
			return getTag(context.id);
		}

		function clear() {
			m_checkboxRadiosList.forEach((tag) => {
				tag.select({ value: false, notTrigger: true });
			});
		}

		function select(context = {}) {
			if (typeof context.id === "undefined") {
				return getSelected();
			} else {
				if (Array.isArray(context.id)) {
					context.id.forEach((id) => {
						selectTag(getTag(id), context.notTrigger);
					});
				} else {
					selectTag(getTag(context.id), context.notTrigger);
				}
			}
		}

		function destroyCheckboxRadioGroup() {
			dom.remove(m_checkboxRadioGroupTag);
		}

		function configure() {
			m_config = {
				tag: "default",
				theme: "default",
				name: Math.random().toString(36).slice(2),
				checkboxes: [],
				radios: [],
				fnGroupClick: (context) => {},
			};

			// If options provided, override default config
			if (options) {
				m_config = m_utils.extend(true, m_config, options);
			}

			m_config.css = m_utils.extend(
				true,
				m_theme.getTheme({
					name: m_config.theme,
					control: "checkboxRadioGroup",
				}),
				m_config.css
			);
		}
	}
};

ui.checkboxRadioGroup = (parentTag, options) => new ui.class.CheckboxRadioGroup(parentTag, options);

customElements.define("mambo-checkbox-radio-group", ui.class.CheckboxRadioGroup);
