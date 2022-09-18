ui.class.CheckboxGroup = class CheckboxGroup extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_checkboxList = [];

		// HTML tag variables
		let m_parentTag;
		let m_props;

		// Configure public methods
		this.clear = clear;
		this.destroy = destroyCheckboxGroup;
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
				const checkboxPromises = [];

				m_props.checkboxes.forEach((checkbox, index) => {
					checkboxPromises.push(processCheckbox(checkbox, index));
				});

				Promise.all(checkboxPromises).then(resolve);
			});
		}

		function processCheckbox(item, index) {
			return new Promise((resolve) => {
				item.id = item.id ? item.id : index;

				const checkboxConfig = {
					...m_props.checkbox,
					class: m_props.css.checkbox,
					...item,
					name: m_props.name,
					parentTag: self,
					fnGroupClick: handleGroupClick,
					fnComplete: resolve,
				};

				m_checkboxList.push(ui.checkbox(checkboxConfig));
			});
		}

		function handleGroupClick(context) {
			if (m_props.fnClick) {
				m_props.fnClick(context);
			}

			if (m_props.fnGroupClick) {
				m_props.fnGroupClick({
					CheckboxGroup: self,
					Checkbox: context.Checkbox,
					ev: context.ev,
				});
			}
		}

		function getTag(id) {
			return m_checkboxList.find((tag) => tag.getId() === id);
		}

		function getSelected() {
			return m_checkboxList.filter((tag) => tag.select());
		}

		function selectTag(tag, notTrigger) {
			if (tag) {
				tag.select({ value: true, notTrigger: notTrigger });
			}
		}

		function getTagById(context = {}) {
			return getTag(context.id);
		}

		function clear() {
			m_checkboxList.forEach((tag) => {
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

		function destroyCheckboxGroup() {
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
				};

				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "checkboxGroup" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.checkboxGroup = (props) => new ui.class.CheckboxGroup(props);
customElements.define("mambo-checkbox-group", ui.class.CheckboxGroup);
