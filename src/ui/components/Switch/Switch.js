ui.class.Switch = class Switch extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
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
		this.getParentTag = () => self;
		this.setup = setup;
		this.toggle = toggle;

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
				const tagConfig = {
					name: "input",
					class: m_props.css.input,
					attr: { type: "checkbox" },
					prop: { checked: m_checked },
				};

				m_inputTag = ui.d.createTag(tagConfig);
				m_containerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
				self.classList.add(m_props.css.self);
				self.appendChild(m_inputTag);
				self.appendChild(m_containerTag);
				installLabels().then(setupEventListener).then(resolve);
			});
		}

		function installLabels() {
			return new Promise((resolve) => {
				const onTag = ui.d.createTag({
					...m_props.tags.on,
					class: m_props.css.on,
					text: m_props.messages.checked,
				});

				const offTag = ui.d.createTag({
					...m_props.tags.off,
					class: m_props.css.off,
					text: m_props.messages.unchecked,
				});

				const handleTag = ui.d.createTag({
					...m_props.tags.handle,
					class: m_props.css.handle,
				});

				m_containerTag.appendChild(onTag);
				m_containerTag.appendChild(offTag);
				m_containerTag.appendChild(handleTag);
				setEnable();
				resolve();
			});
		}

		function setupEventListener() {
			return new Promise((resolve) => {
				self.addEventListener("click", handleClick);
				resolve();
			});
		}

		function setEnable() {
			self.classList.toggle(m_props.css.disabled, !m_enable);
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
			ui.d.setProps(m_inputTag, { checked: m_checked });

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

		function destroySwitch() {
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Switch: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
					enable: true,
					messages: {
						checked: "ON",
						unchecked: "OFF",
					},
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				m_enable = m_props.enable;
				m_checked = m_props.checked;
				const tags = ui.tags.getTags({ name: m_props.tag, component: "switch" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "switch" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.switch = (props) => new ui.class.Switch(props);
customElements.define(ui.defaultTags.switch.self.name, ui.class.Switch);
