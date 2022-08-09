ui.class.DatePicker = class DatePicker extends HTMLElement {
	constructor(initOptions) {
		super();
		const self = this;
		const m_utils = new ui.utils();
		const m_theme = ui.theme(ui.g_defaultTheme);
		const m_dateMgr = new ui.date();

		// HTML tag variables
		let m_parentTag;
		let m_datePickerParentTag;
		let m_input;
		let m_dropdownWrapperTag;
		let m_dropdown;
		let m_calendar;

		let m_config;
		let m_value = null;
		let m_previous_text = "";

		// Configure public methods
		this.destroy = destroyDatePicker;
		this.getParentTag = () => m_datePickerParentTag;
		this.value = value;
		this.setup = setup;
		this.insta = installSelf;

		if (initOptions) setup(initOptions);

		function setup() {
			m_parentTag = dom.getTag(initOptions.parentTag);
			configure();
			installDOM();
		}

		function installDOM() {
			m_datePickerParentTag = dom.createTag(m_config.tag.parent, {
				class: m_config.css.parent,
			});

			dom.append(m_parentTag, m_datePickerParentTag);

			installInput();
			installDropdown();
			finishSetup();
		}

		function installInput() {
			let input = m_utils.extend(true, {}, m_config.input);
			input.css = m_utils.extend(true, m_config.css.input, input.css);
			input.parentTag = m_datePickerParentTag;
			m_input = ui.input(input);
		}

		function installDropdown() {
			//create the wrapper div container for the input
			m_dropdownWrapperTag = dom.createTag("div", {
				class: m_config.css.dropdownWrapper,
			});
			dom.append(m_datePickerParentTag, m_dropdownWrapperTag);

			let dropdown = m_utils.extend(true, {}, m_config.dropdown);
			dropdown.css = m_utils.extend(true, m_config.css.dropdown, dropdown.css);

			dropdown.fnBeforeClose = (context) => {
				const result = m_config.dropdown.fnBeforeClose ? m_config.dropdown.fnBeforeClose(context) : true;
				return (!context.ev || !m_input.getTag().contains(context.ev.target)) && result;
			};
			dropdown.fnComplete = (context) => {
				installCalendar(context.dropdown);

				if (m_config.dropdown.fnComplete) {
					m_config.dropdown.fnComplete(context);
				}
			};
			dropdown.parentTag = m_dropdownWrapperTag;

			m_dropdown = ui.dropdown(dropdown);
		}

		function installCalendar(dropdown) {
			const contentTag = dropdown.getContentTag();
			contentTag.innerHTML = "";

			let calendar = m_utils.extend(true, {}, m_config.calendar);
			calendar.css = m_utils.extend(true, m_config.css.calendar, calendar.css);

			calendar.format = m_config.format;
			calendar.footer = m_config.footer;
			calendar.start = m_config.start;
			calendar.depth = m_config.depth;
			calendar.min = m_config.min;
			calendar.max = m_config.max;
			calendar.fnSelect = (context) => {
				m_value = context.calendar.value();
				let text = m_dateMgr.format(m_value, m_config.format);
				m_input.value({ value: text });
				m_previous_text = text;
				dropdown.close();

				if (m_config.calendar.fnSelect) {
					m_config.calendar.fnSelect(context);
				}

				if (m_config.fnSelect) {
					m_config.fnSelect({ datePicker: self, ev: context.ev });
				}
			};
			calendar.parentTag = contentTag;

			m_calendar = ui.calendar(calendar);

			if (m_config.value) {
				setValue(m_config.value);
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
			let date = m_dateMgr.getDate(value, m_config.format);
			m_calendar.value({ value: date });

			m_value = m_calendar.value();
			let text = m_dateMgr.format(m_value, m_config.format);
			m_input.value({ value: text });
			m_previous_text = text;
		}

		function handleBlur(ev) {
			let text = m_input.value();
			if (m_previous_text !== text) {
				setValue(text);

				if (m_config.fnSelect) {
					m_config.fnSelect({ datePicker: self, ev: ev });
				}
			}
		}

		function destroyDatePicker() {
			dom.remove(m_datePickerParentTag);
		}

		function finishSetup() {
			// Execute complete callback function
			if (m_config.fnComplete) {
				installSelf(m_parentTag, m_config.installPrepend);
				m_config.fnComplete({ timePicker: self });
			}
		}
		function installSelf(parentTag, prepend) {
			m_parentTag = parentTag ? parentTag : m_parentTag;
			m_parentTag = dom.appendSelfToParentTag(m_parentTag, self, prepend);
		}

		function configure() {
			m_config = {
				theme: "default",
				tag: {
					parent: "sc-date-picker",
				},
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
				dropdown: {
					button: {
						text: "",
						svg: {
							element: ui.graphics.getSVG({ name: "calendar" }),
						},
					},
				},
				calendar: {},
				format: "M/D/YYYY",
				value: null,
				footer: "dddd, MMMM D, YYYY",
				start: "month",
				depth: "month",
				min: new Date(1900, 0, 1),
				max: new Date(2099, 11, 31),
				fnSelect: (context) => {
					// Nothing executes by default
				},
			};

			// If initOptions provided, override default config
			if (initOptions) {
				m_config = m_utils.extend(true, m_config, initOptions);
			}

			m_config.css = m_utils.extend(
				true,
				m_theme.getTheme({
					name: m_config.theme,
					control: "date-picker",
				}),
				m_config.css
			);
		}
	}
};

ui.datePicker = (props) => new ui.class.DatePicker(props);

customElements.define("mambo-date-picker", ui.class.DatePicker);
