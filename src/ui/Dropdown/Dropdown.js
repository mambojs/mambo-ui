ui.class.Dropdown = class Dropdown extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();

		// HTML tag variables
		let m_parentTag;
		let m_dropDownParentTag;
		let m_dropdownContainerTag;

		let m_props;
		let m_open = false;

		// Configure public methods
		this.close = close;
		this.destroy = destroyDropdown;
		this.getContentTag = () => m_dropdownContainerTag;
		this.getParentTag = () => m_dropDownParentTag;
		this.install = installSelf;
		this.open = open;
		this.setup = setup;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			installEventHandler();
			installDOM();
		}

		function installDOM() {
			m_dropDownParentTag = dom.createTag(m_props.tags.parent, {
				class: m_props.css.parent,
			});

			self.appendChild(m_dropDownParentTag);
			installOpenButton();
			installContainer();
			finishSetup();
		}

		function installOpenButton() {
			let button = m_utils.extend(true, {}, m_props.button);
			button.css = m_utils.extend(true, m_props.css.button, button.css);
			button.parentTag = m_dropDownParentTag;

			button.fnClick = (context) => {
				if (m_open) {
					closeAnimation(context.ev);
				} else {
					openAnimation();
				}
				if (m_props.button.fnClick) {
					m_props.button.fnClick(context);
				}
			};

			ui.button(button);
		}

		function installContainer() {
			m_dropdownContainerTag = dom.createTag(m_props.tags.container, {
				class: m_props.css.container,
			});
			dom.append(m_dropDownParentTag, m_dropdownContainerTag);
		}

		function open() {
			openAnimation();
		}

		function openAnimation() {
			dom.addClass(m_dropdownContainerTag, m_props.css.open);
			m_open = true;
			if (m_props.fnOpen) {
				m_props.fnOpen({ dropdown: self });
			}
		}

		function close(context = {}) {
			closeAnimation(context.ev);
		}

		function closeAnimation(ev) {
			if (m_props.fnBeforeClose && !m_props.fnBeforeClose({ ev: ev })) {
				return;
			}

			dom.removeClass(m_dropdownContainerTag, m_props.css.open);
			m_open = false;
			if (m_props.fnClose) {
				m_props.fnClose({ dropdown: self });
			}
		}

		function installEventHandler() {
			window.addEventListener("click", function (ev) {
				if (m_open && !m_dropdownContainerTag.contains(ev.target)) {
					closeAnimation(ev);
				}
			});
		}

		function destroyDropdown() {
			dom.remove(m_dropDownParentTag);
		}

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
			if (m_props.fnComplete) m_props.fnComplete({ Dropdown: self });
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
				button: {
					text: "Open Dropdown",
				},
				fnClose: (context) => {
					// Nothing executes by default
				},
				fnOpen: (context) => {
					// Nothing executes by default
				},
				fnBeforeClose: (context) => {
					return true;
				},
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "dropdown" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "dropdown" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.dropdown = (props) => new ui.class.Dropdown(props);
customElements.define("dropdown-combobox", ui.class.Dropdown);
