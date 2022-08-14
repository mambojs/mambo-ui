ui.class.TimePicker = class TimePicker extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();
		const m_dateMgr = ui.date();

		// HTML tag variables
		let m_parentTag;
		let m_comboBox;

		let m_props;
		let m_value = null;

		// Configure public methods
		this.destroy = destroyTimePicker;
		this.getParentTag = () => m_comboBox.getParentTag();
		this.install = installSelf;
		this.setup = setup;
		this.value = value;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			setupDOM();
		}

		function setupDOM() {
			setupComboBox();
		}

		function setupComboBox() {
			const combobox = m_utils.extend(true, {}, m_props.combobox);
			combobox.parentTag = m_parentTag;
			combobox.data = createComboBoxData();

			if (m_props.value) {
				let value = m_dateMgr.getDate(m_props.value, m_props.format);
				if (value) {
					combobox.value = m_dateMgr.format(value, m_props.format);
				}
			}

			combobox.fnSelect = (context) => {
				selectTime(context);
				if (m_props.combobox.fnSelect) {
					m_props.combobox.fnSelect(context);
				}
			};

			m_comboBox = ui.combobox(combobox);
			loadDOM();
		}

		function createComboBoxData() {
			let min = m_dateMgr.getDate(m_props.min, m_props.format);
			let max = m_dateMgr.getDate(m_props.max, m_props.format);

			if (m_dateMgr.isSameOrAfter(min, max)) {
				m_dateMgr.add(max, 1, "d");
			}

			return m_dateMgr.createInterval(m_props.interval, "m", min, max, m_props.format);
		}

		function selectTime(context) {
			m_value = context.Button ? m_dateMgr.createDate(context.Button.text(), m_props.format) : null;

			if (m_props.fnSelect) {
				m_props.fnSelect({
					TimePicker: self,
					button: context.Button,
					ev: context.ev,
				});
			}
		}

		function setValue(value) {
			let time = m_dateMgr.getDate(value, m_props.format);
			m_value = m_dateMgr.cloneDate(time);
			m_comboBox.value({ value: m_dateMgr.format(time, m_props.format) });
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

		function loadDOM() {
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			if (m_props.fnComplete) m_props.fnComplete({ TimePicker: self });
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
				min: m_dateMgr.getToday(),
				max: m_dateMgr.getToday(),
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "timePicker" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "timePicker" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.timePicker = (props) => new ui.class.TimePicker(props);

customElements.define("mambo-time-picker", ui.class.TimePicker);
