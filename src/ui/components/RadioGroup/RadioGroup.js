ui.class.RadioGroup = class RadioGroup extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_radioList = [];

		// HTML tag variables
		let m_parentTag;
		let m_props;

		// Configure public methods
		this.clear = clear;
		this.destroy = destroyRadioGroup;
		this.getParentTag = () => self;
		this.getTag = getTagById;
		this.select = select;
		this.setup = setup;

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
				const radioPromises = [];

				m_props.radios.forEach((radio, index) => {
					radioPromises.push(processRadio(radio, index));
				});

				Promise.all(radioPromises).then(resolve);
			});
		}

		function processRadio(radio, index) {
			return new Promise((resolve) => {
				radio.id = radio.id ? radio.id : index;

				const radioConfig = {
					...m_props.radio,
					class: m_props.css.radio,
					...radio,
					name: m_props.name,
					parentTag: self,
					fnGroupClick: handleGroupClick,
					fnComplete: resolve,
				};

				m_radioList.push(ui.radio(radioConfig));
			});
		}

		function handleGroupClick(context) {
			selectTag(context.Radio, true);

			if (m_props.fnClick) {
				m_props.fnClick(context);
			}

			if (m_props.fnGroupClick) {
				m_props.fnGroupClick({
					RadioGroup: self,
					Radio: context.Radio,
					ev: context.ev,
				});
			}
		}

		function getTag(id) {
			return m_radioList.find((tag) => tag.getId() === id);
		}

		function getSelected() {
			return m_radioList.filter((tag) => tag.select());
		}

		function selectTag(tag, notTrigger) {
			if (tag) {
				deselectRadios();
				tag.select({ value: true, notTrigger });
			}
		}

		function deselectRadios() {
			m_radioList.forEach((radio) => {
				radio.select({ value: false, notTrigger: true });
			});
		}

		function getTagById(context = {}) {
			return getTag(context.id);
		}

		function clear() {
			m_radioList.forEach((tag) => {
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

		function destroyRadioGroup() {
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
					radios: [],
				};

				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "radioGroup" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.radioGroup = (props) => new ui.class.RadioGroup(props);
customElements.define("mambo-radio-group", ui.class.RadioGroup);
