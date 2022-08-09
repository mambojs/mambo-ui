ui.class.Switch = class Switch extends HTMLElement {
	constructor(initOptions) {
		super();
		const self = this;
		const m_utils = new ui.utils();

		// HTML tag variables
		let m_parentTag;
		let m_switchParentTag;
		let m_inputTag;
		let m_containerTag;

		let m_config;
		let m_enable = true;
		let m_checked = false;

		// Configure public methods
		this.install = installSelf;
		this.setup = setup;
		this.check = check;
		this.checked = () => m_checked;
		this.destroy = destroySwitch;
		this.enable = enable;
		this.getParentTag = () => m_switchParentTag;
		this.toggle = toggle;
		this.configure = configure;

		if (initOptions) setup(initOptions);
		function setup(options) {
			configure(options);
			setOptionValues();
			installDOM();
		}

		function setOptionValues() {
			m_enable = m_config.enable;
			m_checked = m_config.checked;
		}

		function installDOM() {
			installTags();
			setupEventHandler();
			finishSetup();
		}

		// Begin setup

		function installTags() {
			m_switchParentTag = dom.createTag(m_config.tag.switch, {
				class: m_config.css.parent,
			});
			dom.append(m_parentTag, m_switchParentTag);

			const tagConfig = {
				class: m_config.css.input,
				attr: { type: "checkbox" },
				prop: { checked: m_checked },
			};
			m_inputTag = dom.createTag("input", tagConfig);
			m_containerTag = dom.createTag(m_config.tag.container, {
				class: m_config.css.container,
			});

			dom.append(m_switchParentTag, m_inputTag);
			dom.append(m_switchParentTag, m_containerTag);

			installLabels();
		}

		function installLabels() {
			let onTag = dom.createTag(m_config.tag.on, {
				class: m_config.css.on,
				text: m_config.messages.checked,
			});
			let offTag = dom.createTag(m_config.tag.off, {
				class: m_config.css.off,
				text: m_config.messages.unchecked,
			});
			let handleTag = dom.createTag(m_config.tag.handl, {
				class: m_config.css.handle,
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

			if (m_config.fnChange) {
				m_config.fnChange({ switch: self, ev: ev });
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
			m_enable ? dom.removeClass(m_switchParentTag, m_config.css.disabled) : dom.addClass(m_switchParentTag, m_config.css.disabled);
		}

		function destroySwitch() {
			dom.remove(m_switchParentTag);
		}

		function finishSetup() {
			// Execute complete callback function
			// Install component into parent
			if (m_config.install) installSelf(m_parentTag, m_config.installPrepend);
			if (m_config.fnComplete) {
				m_config.fnComplete({ switch: self });
			}
		}
		function installSelf(parentTag, prepend) {
			m_parentTag = parentTag ? parentTag : m_parentTag;
			m_parentTag = dom.appendSelfToParentTag(m_parentTag, self, prepend);
		}

		function configure(options) {
			m_config = {
				css: {
					parent: "switch-parent",
					input: "switch-input",
					container: "switch-container",
					parentTag: undefined,
					install: true,
					installPrepend: false,
					on: "switch-label-on",
					off: "switch-label-off",
					handle: "switch-handle",
					disabled: "switch-disabled",
				},
				tag: {
					switch: "sc-switch",
					container: "switch-container",
					on: "switch-label-on",
					off: "switch-label-off",
					handle: "switch-handle",
				},
				enable: true,
				checked: false,
				messages: {
					checked: "ON",
					unchecked: "OFF",
				},
				fnChange: (context) => {
					// Nothing executes by default
				},
			};

			// If options provided, override default config
			if (options) {
				m_config = m_utils.extend(true, m_config, options);
			}
			if (m_config.parentTag) {
				m_parentTag = dom.getTag(m_config.parentTag);
			}
		}
	}
};

ui.switch = (props) => new ui.class.Switch(props);

customElements.define("mambo-switch", ui.class.Switch);
