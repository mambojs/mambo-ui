ui.class.CheckboxRadioGroup = class CheckboxRadioGroup extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();

		// HTML tag variables
		const m_checkboxRadiosList = [];
		let m_checkboxRadioGroupTag;
		let m_parentTag;

		let m_props;

		// Configure public methods
		this.clear = clear;
		this.destroy = destroyCheckboxRadioGroup;
		this.getParentTag = () => m_checkboxRadioGroupTag;
		this.getTag = getTagById;
		this.install = installSelf;
		this.select = select;
		this.setup = setup;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			setupDOM();
		}

		function setupDOM() {
			m_checkboxRadioGroupTag = dom.createTag(m_props.tags.parent, {
				class: m_props.css.parent,
			});

			self.appendChild(m_checkboxRadioGroupTag);

			if (m_props.checkboxes) {
				m_props.checkboxes.forEach(setupCheckbox);
			}

			if (m_props.radios) {
				m_props.radios.forEach(setupRadio);
			}

			loadDOM();
		}

		function setupCheckbox(checkbox) {
			setupTag(checkbox, "checkbox");
		}

		function setupRadio(radio) {
			setupTag(radio, "radio");
		}

		function setupTag(tag, type) {
			tag.css = tag.css ? m_utils.extend(true, m_props.css, tag.css) : m_props.css;
			const attr = {
				type: type,
				name: m_props.name,
			};
			tag.attr = m_utils.extend(true, attr, tag.attr);
			tag.fnGroupClick = handleGroupClick;
			tag.parentTag = m_checkboxRadioGroupTag;

			m_checkboxRadiosList.push(ui.checkboxRadio(tag));
		}

		function handleGroupClick(context) {
			if (context.CheckboxRadio.isRadio()) {
				selectTag(context.CheckboxRadio, true);
			}

			if (m_props.fnClick) {
				m_props.fnClick(context);
			}

			if (m_props.fnGroupClick) {
				m_props.fnGroupClick({
					CheckboxRadioGroup: self,
					CheckboxRadio: context.CheckboxRadio,
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

		function loadDOM() {
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			if (m_props.fnComplete) m_props.fnComplete({ CheckboxRadioGroup: self });
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
				name: Math.random().toString(36).slice(2),
				checkboxes: [],
				radios: [],
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "checkboxRadioGroup" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "checkboxRadioGroup" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.checkboxRadioGroup = (props) => new ui.class.CheckboxRadioGroup(props);

customElements.define("mambo-checkbox-radio-group", ui.class.CheckboxRadioGroup);
