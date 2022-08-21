ui.class.CheckboxRadioGroup = class CheckboxRadioGroup extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		const m_checkboxRadiosList = [];
		let m_parentTag;
		let m_props;

		// Configure public methods
		this.clear = clear;
		this.destroy = destroyCheckboxRadioGroup;
		this.getParentTag = () => self;
		this.getTag = getTagById;
		this.select = select;
		this.setup = setup;

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

				if (m_props.checkboxes) {
					m_props.checkboxes.forEach(setupCheckbox);
				}

				if (m_props.radios) {
					m_props.radios.forEach(setupRadio);
				}
				resolve();
			});
		}

		function setupCheckbox(checkbox) {
			setupTag(checkbox, "checkbox");
		}

		function setupRadio(radio) {
			setupTag(radio, "radio");
		}

		function setupTag(tag, type) {
			const attr = {
				type: type,
				name: m_props.name,
			};

			tag.css = ui.utils.extend(true, m_props.css[type], tag.css);
			tag.attr = ui.utils.extend(true, attr, tag.attr);
			tag.fnGroupClick = handleGroupClick;
			tag.parentTag = self;
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
			if (!context.id) {
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
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ CheckboxRadioGroup: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
					name: Math.random().toString(36).slice(2),
					checkboxes: [],
					radios: [],
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "checkboxRadioGroup" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "checkboxRadioGroup" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.checkboxRadioGroup = (props) => new ui.class.CheckboxRadioGroup(props);
customElements.define("mambo-checkbox-radio-group", ui.class.CheckboxRadioGroup);
