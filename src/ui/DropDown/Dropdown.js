ui.class.Dropdown = class Dropdown extends HTMLElement {
	constructor(initOptions) {
		super();
		const self = this;
		const m_utils = new ui.utils();

		// HTML tag variables
		let m_parentTag;
		let m_dropDownParentTag;
		let m_dropdownContainerTag;

		let m_config;
		let m_open = false;

		// Configure public methods
		this.close = close;
		this.destroy = destroyDropdown;
		this.getContentTag = () => m_dropdownContainerTag;
		this.getParentTag = () => m_dropDownParentTag;
		this.open = open;

		// Config default values
		configure();

		// Begin setup
		setup();

		function setup() {
			m_parentTag = dom.getTag(initOptions.parentTag);

			if (!m_parentTag) {
				console.error(`Dropdown: dom. parent tag ${initOptions.parentTag} was not found.`);
				return;
			}

			installDOM();
			installEventHandler();
		}

		function installDOM() {
			m_dropDownParentTag = dom.createTag(m_config.tag.parent, {
				class: m_config.css.parent,
			});

			m_parentTag.innerHTML = "";
			dom.append(m_parentTag, m_dropDownParentTag);

			installOpenButton();
			installContainer();
			finishSetup();
		}

		function installOpenButton() {
			let button = m_utils.extend(true, {}, m_config.button);
			button.css = m_utils.extend(true, m_config.css.button, button.css);
			button.parentTag = m_dropDownParentTag;

			button.fnClick = (context) => {
				if (m_open) {
					closeAnimation(context.ev);
				} else {
					openAnimation();
				}
				if (m_config.button.fnClick) {
					m_config.button.fnClick(context);
				}
			};

			ui.button(button);
		}

		function installContainer() {
			m_dropdownContainerTag = dom.createTag(m_config.tag.container, {
				class: m_config.css.container,
			});
			dom.append(m_dropDownParentTag, m_dropdownContainerTag);
		}

		function open() {
			openAnimation();
		}

		function openAnimation() {
			dom.addClass(m_dropdownContainerTag, m_config.css.open);
			m_open = true;
			if (m_config.fnOpen) {
				m_config.fnOpen({ dropdown: self });
			}
		}

		function close(context = {}) {
			closeAnimation(context.ev);
		}

		function closeAnimation(ev) {
			if (m_config.fnBeforeClose && !m_config.fnBeforeClose({ ev: ev })) {
				return;
			}

			dom.removeClass(m_dropdownContainerTag, m_config.css.open);
			m_open = false;
			if (m_config.fnClose) {
				m_config.fnClose({ dropdown: self });
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
			// Execute complete callback function
			if (m_config.fnComplete) {
				m_config.fnComplete({ dropdown: self });
			}
		}

		function configure() {
			m_config = {
				css: {
					parent: "dropdown-parent",
					container: "dropdown-container",
					open: "open",
					button: {
						button: "dropdown-button",
					},
				},
				tag: {
					parent: "sc-dropdown",
					container: "dropdown-container",
				},
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
			if (initOptions) {
				m_config = m_utils.extend(true, m_config, initOptions);
			}
		}
	}
};

ui.dropdown = (props) => new ui.class.Dropdown(props);

customElements.define("mambo-dropdown", ui.class.Dropdown);
