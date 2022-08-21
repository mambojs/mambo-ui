ui.class.TimePicker = class TimePicker extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_comboBox;

		let m_props;
		let m_value = null;

		// Configure public methods
		this.destroy = destroyTimePicker;
		this.getParentTag = () => m_comboBox.getParentTag();
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
				setupComboBox().then(resolve);
			});
		}

		function setupComboBox() {
			return new Promise((resolve) => {
				const combobox = ui.utils.extend(true, {}, m_props.combobox);
				combobox.parentTag = self;
				combobox.data = createComboBoxData();

				if (m_props.value) {
					let value = ui.date.getDate(m_props.value, m_props.format);
					if (value) {
						combobox.value = ui.date.format(value, m_props.format);
					}
				}

				combobox.fnSelect = (context) => {
					selectTime(context);
					if (m_props.combobox.fnSelect) {
						m_props.combobox.fnSelect(context);
					}
				};

				m_comboBox = ui.combobox(combobox);
				resolve();
			});
		}

		function createComboBoxData() {
			let min = ui.date.getDate(m_props.min, m_props.format);
			let max = ui.date.getDate(m_props.max, m_props.format);

			if (ui.date.isSameOrAfter(min, max)) {
				ui.date.add(max, 1, "d");
			}

			return ui.date.createInterval(m_props.interval, "m", min, max, m_props.format);
		}

		function selectTime(context) {
			m_value = context.Button ? ui.date.createDate(context.Button.text(), m_props.format) : null;

			if (m_props.fnSelect) {
				m_props.fnSelect({
					TimePicker: self,
					button: context.Button,
					ev: context.ev,
				});
			}
		}

		function setValue(value) {
			let time = ui.date.getDate(value, m_props.format);
			m_value = ui.date.cloneDate(time);
			m_comboBox.value({ value: ui.date.format(time, m_props.format) });
		}

		function value(context = {}) {
			if (typeof context.value === "undefined") {
				return m_value;
			} else {
				setValue(context.value);
			}
		}

		function destroyTimePicker() {
			m_comboBox.destroy();
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ TimePicker: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
					combobox: {
						filter: false,
						dropdown: {
							button: {
								text: "watchIcon",
							},
						},
					},
					value: "",
					interval: 30,
					format: "h:mm A",
					min: ui.date.getToday(),
					max: ui.date.getToday(),
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "timePicker" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "timePicker" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.timePicker = (props) => new ui.class.TimePicker(props);
customElements.define("mambo-time-picker", ui.class.TimePicker);
