ui.class.DatePicker = class DatePicker extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();
		const m_dateMgr = ui.date();

		// HTML tag variables
		let m_parentTag;
		let m_datePickerParentTag;
		let m_input;
		let m_dropdownWrapperTag;
		let m_dropdown;
		let m_calendar;

		let m_props;
		let m_value = null;
		let m_previous_text = "";

		// Configure public methods
		this.destroy = destroyDatePicker;
		this.getParentTag = () => m_datePickerParentTag;
		this.install = installSelf;
		this.setup = setup;
		this.value = value;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			setupDOM();
		}

		function setupDOM() {
			m_datePickerParentTag = dom.createTag(m_props.tags.parent, {
				class: m_props.css.parent,
			});

			self.appendChild(m_datePickerParentTag);
			setupInput();
			setupDropdown();
		}

		function setupInput() {
			let input = m_utils.extend(true, {}, m_props.input);
			input.css = m_utils.extend(true, m_props.css.input, input.css);
			input.parentTag = m_datePickerParentTag;
			m_input = ui.input(input);
		}

		function setupDropdown() {
			m_dropdownWrapperTag = dom.createTag("div", {
				class: m_props.css.dropdownWrapper,
			});

			dom.append(m_datePickerParentTag, m_dropdownWrapperTag);
			let dropdown = m_utils.extend(true, {}, m_props.dropdown);
			dropdown.css = m_utils.extend(true, m_props.css.dropdown, dropdown.css);

			dropdown.fnBeforeClose = (context) => {
				const result = m_props.dropdown.fnBeforeClose ? m_props.dropdown.fnBeforeClose(context) : true;
				return (!context.ev || !m_input.getTag().contains(context.ev.target)) && result;
			};
			dropdown.fnComplete = (context) => {
				installCalendar(context.Dropdown);
				if (m_props.dropdown.fnComplete) {
					m_props.dropdown.fnComplete(context);
				}
			};
			dropdown.parentTag = m_dropdownWrapperTag;
			m_dropdown = ui.dropdown(dropdown);
			loadDOM();
		}

		function installCalendar(dropdown) {
			const contentTag = dropdown.getContentTag();
			contentTag.innerHTML = "";
			let calendar = m_utils.extend(true, {}, m_props.calendar);
			calendar.css = m_utils.extend(true, m_props.css.calendar, calendar.css);
			calendar.format = m_props.format;
			calendar.footer = m_props.footer;
			calendar.start = m_props.start;
			calendar.depth = m_props.depth;
			calendar.min = m_props.min;
			calendar.max = m_props.max;

			calendar.fnSelect = (context) => {
				m_value = context.Calendar.value();
				let text = m_dateMgr.format(m_value, m_props.format);
				m_input.value({ value: text });
				m_previous_text = text;
				dropdown.close();
				if (m_props.calendar.fnSelect) m_props.calendar.fnSelect(context);
				if (m_props.fnSelect) m_props.fnSelect({ DatePicker: self, ev: context.ev });
			};

			calendar.parentTag = contentTag;
			m_calendar = ui.calendar(calendar);
			if (m_props.value) setValue(m_props.value);
		}

		function value(context = {}) {
			if (typeof context.value === "undefined") {
				return m_value;
			} else {
				setValue(context.value);
			}
		}

		function setValue(value) {
			let date = m_dateMgr.getDate(value, m_props.format);
			m_calendar.value({ value: date });

			m_value = m_calendar.value();
			let text = m_dateMgr.format(m_value, m_props.format);
			m_input.value({ value: text });
			m_previous_text = text;
		}

		function handleBlur(ev) {
			let text = m_input.value();
			if (m_previous_text !== text) {
				setValue(text);

				if (m_props.fnSelect) {
					m_props.fnSelect({ DatePicker: self, ev: ev });
				}
			}
		}

		function destroyDatePicker() {
			dom.remove(m_datePickerParentTag);
		}

		function loadDOM() {
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			if (m_props.fnComplete) m_props.fnComplete({ DatePicker: self });
		}

		function installSelf(parentTag, prepend) {
			m_parentTag = parentTag ? parentTag : m_parentTag;
			m_parentTag = dom.getTag(m_parentTag);
			dom.append(m_parentTag, self, prepend);
		}

		function configure(customProps) {
			m_props = {
				install: true,
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
				dropdown: {
					button: {
						text: "calIcon",
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
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "datePicker" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "datePicker" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.datePicker = (props) => new ui.class.DatePicker(props);

customElements.define("mambo-date-picker", ui.class.DatePicker);
