ui.class.Switch = class Switch extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();

		// HTML tag variables
		let m_parentTag;
		let m_switchParentTag;
		let m_inputTag;
		let m_containerTag;

		let m_props;
		let m_enable = true;
		let m_checked = false;

		// Configure public methods
		this.check = check;
		this.checked = () => m_checked;
		this.configure = configure;
		this.destroy = destroySwitch;
		this.enable = enable;
		this.getParentTag = () => m_switchParentTag;
		this.install = installSelf;
		this.setup = setup;
		this.toggle = toggle;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			setOptionValues();
			installDOM();
			setupEventHandler();
			finishSetup();
		}

		function setOptionValues() {
			m_enable = m_props.enable;
			m_checked = m_props.checked;
		}

		function installDOM() {
			m_switchParentTag = dom.createTag(m_props.tags.switch, {
				class: m_props.css.parent,
			});

			self.appendChild(m_switchParentTag);

			const tagConfig = {
				class: m_props.css.input,
				attr: { type: "checkbox" },
				prop: { checked: m_checked },
			};

			m_inputTag = dom.createTag("input", tagConfig);

			m_containerTag = dom.createTag(m_props.tags.container, {
				class: m_props.css.container,
			});

			dom.append(m_switchParentTag, m_inputTag);
			dom.append(m_switchParentTag, m_containerTag);
			installLabels();
		}

		function installLabels() {
			let onTag = dom.createTag(m_props.tags.on, {
				class: m_props.css.on,
				text: m_props.messages.checked,
			});
			let offTag = dom.createTag(m_props.tags.off, {
				class: m_props.css.off,
				text: m_props.messages.unchecked,
			});
			let handleTag = dom.createTag(m_props.tags.handle, {
				class: m_props.css.handle,
			});

			dom.append(m_containerTag, onTag);
			dom.append(m_containerTag, offTag);
			dom.append(m_containerTag, handleTag);

			setEnable(m_enable);
		}

		function setupEventHandler() {
			m_switchParentTag.addEventListener("click", handleClick);
		}

		function handleClick(ev) {
			if (m_enable) {
				toggleSwitch(ev);
			}
		}

		function toggleSwitch(ev) {
			m_checked = !m_checked;
			setChecked(ev);
		}

		function setChecked(ev) {
			dom.setProps(m_inputTag, { checked: m_checked });

			if (m_props.fnChange) {
				m_props.fnChange({ Switch: self, ev: ev });
			}
		}

		function enable(context = {}) {
			if (typeof context.enable === "undefined") {
				return m_enable;
			} else {
				setEnable(context.enable);
			}
		}

		function toggle() {
			toggleSwitch();
		}

		function check(context = {}) {
			if (typeof context.checked === "boolean") {
				m_checked = context.checked;
				setChecked();
			}
		}

		function setEnable(enable) {
			m_enable = enable;
			m_enable ? dom.removeClass(m_switchParentTag, m_props.css.disabled) : dom.addClass(m_switchParentTag, m_props.css.disabled);
		}

		function destroySwitch() {
			dom.remove(m_switchParentTag);
		}

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
			if (m_props.fnComplete) m_props.fnComplete({ Switch: self });
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
				enable: true,
				messages: {
					checked: "ON",
					unchecked: "OFF",
				},
				fnChange: (context) => {
					// Nothing executes by default
				},
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "switch" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "switch" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.switch = (props) => new ui.class.Switch(props);

customElements.define("mambo-switch", ui.class.Switch);
