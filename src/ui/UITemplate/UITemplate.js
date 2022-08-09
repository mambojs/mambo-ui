class Template extends HTMLElement {
	constructor(initOptions) {
		super();
		// Define constants
		const self = this;
		const m_utils = new ui.utils();
		const m_theme = ui.theme(ui.g_defaultTheme);
		// Define member variables
		let m_config;

		// Define tag member variables
		let m_parentTag;

		// Define public functions
		this.install = installSelf;
		this.setup = setup;

		if (initOptions) setup(initOptions);

		function setup(options) {
			configure(options);
			installDom();
		}

		function installDom() {
			// Logic

			// Install component into parent
			if (m_config.install) installSelf(m_parentTag, m_config.installPrepend);
		}

		function installSelf(parentTag, prepend) {
			m_parentTag = parentTag ? parentTag : m_parentTag;
		}

		function configure(options) {
			m_config = {
				parentTag: undefined,
				install: true,
				installPrepend: false,
				theme: "default",
			};

			// If options provided, override default config
			if (options) m_config = m_utils.extend(true, m_config, options);

			if (m_config.parentTag) {
				m_parentTag = dom.getTag(m_config.parentTag);
			}

			m_config.css = m_utils.extend(
				true,
				m_theme.getTheme({
					name: m_config.theme,
					control: "template",
				}),
				m_config.css
			);
		}
	}
}
// Must ALWAYS define the new element as a Native Web Component
customElements.define("mambo-template", Template);
