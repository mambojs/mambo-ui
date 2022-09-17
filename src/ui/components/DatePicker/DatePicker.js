ui.class.DatePicker = class DatePicker extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_input;
		let m_dropdownWrapperTag;
		let m_dropdown;
		let m_calendar;

		let m_props;
		let m_value = null;
		let m_previous_text = "";

		// Configure public methods
		this.destroy = destroyDatePicker;
		this.getParentTag = () => self;
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
				setupInput().then(setupDropdown).then(resolve);
			});
		}

		function setupInput() {
			return new Promise((resolve) => {
				const input = ui.utils.extend(true, {}, m_props.input);
				input.css = ui.utils.extend(true, m_props.css.input, input.css);
				input.parentTag = self;
				m_input = ui.input(input);
				resolve();
			});
		}

		function setupDropdown() {
			return new Promise((resolve) => {
				m_dropdownWrapperTag = ui.d.createTag({ ...m_props.tags.wrapper, class: m_props.css.dropdownWrapper });
				self.appendChild(m_dropdownWrapperTag);
				const dropdownConfig = ui.utils.extend(true, {}, m_props.dropdown);
				dropdownConfig.css = ui.utils.extend(true, m_props.css.dropdown, dropdownConfig.css);

				dropdownConfig.fnBeforeClose = (context) => {
					const result = m_props.dropdown?.fnBeforeClose ? m_props.dropdown.fnBeforeClose(context) : true;
					return (!context.ev || !m_input.getTag().contains(context.ev.target)) && result;
				};

				dropdownConfig.fnComplete = (context) => {
					installCalendar(context.Dropdown);
					resolve();
					if (m_props.dropdown?.fnComplete) {
						m_props.dropdown.fnComplete(context);
					}
				};

				dropdownConfig.parentTag = m_dropdownWrapperTag;
				m_dropdown = ui.dropdown(dropdownConfig);
			});
		}

		function installCalendar(dropdown) {
			const contentTag = dropdown.getContentTag();
			contentTag.innerHTML = null;
			const calendar = ui.utils.extend(true, {}, m_props.calendar);
			calendar.css = ui.utils.extend(true, m_props.css.calendar, calendar.css);
			calendar.format = m_props.format;
			calendar.footer = m_props.footer;
			calendar.start = m_props.start;
			calendar.depth = m_props.depth;
			calendar.min = m_props.min;
			calendar.max = m_props.max;

			calendar.fnSelect = (context) => {
				m_value = context.Calendar.value();
				const text = ui.date.format(m_value, m_props.format);
				m_input.value({ value: text });
				m_previous_text = text;
				dropdown.close();
				if (m_props.calendar.fnSelect) {
					m_props.calendar.fnSelect(context);
				}
				if (m_props.fnSelect) {
					m_props.fnSelect({ DatePicker: self, ev: context.ev });
				}
			};

			calendar.parentTag = contentTag;
			m_calendar = ui.calendar(calendar);

			if (m_props.value) {
				setValue(m_props.value);
			}
		}

		function value(context = {}) {
			if (typeof context.value === "undefined") {
				return m_value;
			} else {
				setValue(context.value);
			}
		}

		function setValue(value) {
			const date = ui.date.getDate(value, m_props.format);
			m_calendar.value({ value: date });

			m_value = m_calendar.value();
			const text = ui.date.format(m_value, m_props.format);
			m_input.value({ value: text });
			m_previous_text = text;
		}

		function handleBlur(ev) {
			const text = m_input.value();
			if (m_previous_text !== text) {
				setValue(text);

				if (m_props.fnSelect) {
					m_props.fnSelect({ DatePicker: self, ev: ev });
				}
			}
		}

		function destroyDatePicker() {
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ DatePicker: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					theme: "default",
					tag: "default",
					input: {
						events: [
							{
								name: "blur",
								fn: (context) => {
									handleBlur(context.ev);
								},
							},
						],
					},
					calendar: {},
					format: "M/D/YYYY",
					value: null,
					footer: "dddd, MMMM D, YYYY",
					start: "month",
					depth: "month",
					min: new Date(1900, 0, 1),
					max: new Date(2099, 11, 31),
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "datePicker" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "datePicker" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.datePicker = (props) => new ui.class.DatePicker(props);
customElements.define("mambo-date-picker", ui.class.DatePicker);
