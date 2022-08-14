ui.class.Tab = class Tab extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();

		// Define member variables
		let m_props;
		let m_selectedId;

		// Define tag member variables
		let m_parentTag;
		let m_tabsTag;
		let m_tabsGroup;
		let m_contentParentTag;
		const m_contentTagsMap = {};

		// Define public functions
		this.install = installSelf;
		this.setup = setup;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			installDOM();
			finishSetup();
		}

		function installDOM() {
			// Add CSS class to parent
			dom.addClass(self, m_props.css.parent);
			// Create content parent tag
			const eleConfig = {
				class: m_props.css.contentParent,
			};
			m_contentParentTag = dom.createTag(m_props.tags.contentParent, eleConfig);

			m_tabsTag = dom.createTag(m_props.tags.tabs, {
				class: m_props.css.tabs,
			});

			installTabs(m_props.tabs);
			installContent();

			// Append all childs
			self.appendChild(m_tabsTag);
			self.appendChild(m_contentParentTag);
		}

		function installContent() {
			m_props.tabs.buttons.forEach((button, index) => {
				const contentTag = dom.createTag(m_props.tags.content, {
					class: m_props.css.content,
				});

				if (m_selectedId === button.id) {
					// Set to show default selected Tab
					dom.addClass(contentTag, m_props.css.selectedTab);
				} else if (!m_selectedId && index === 0) {
					// Set to show first tab as selected Tab
					dom.addClass(contentTag, m_props.css.selectedTab);
				}

				m_contentTagsMap[button.id] = contentTag;

				// Check if content already exists for this Tab
				if (m_props.contents[index]) {
					contentTag.appendChild(m_props.contents[index]);
				}

				m_contentParentTag.appendChild(contentTag);
				// Invoke Tab installed callback
				handleTabReady(contentTag, button);
			});
		}

		function installTabs(tabsConfig) {
			const tabConfig = m_utils.extend(true, tabsConfig, {});
			tabConfig.fnClick = toggleTabContent;
			tabConfig.parentTag = m_tabsTag;
			m_tabsGroup = ui.buttonGroup(tabConfig);
		}

		function toggleTabContent(clickedBtn) {
			// Remove selected class from ALL content tags
			dom.removeClassAll(m_contentTagsMap, m_props.css.selectedTab);
			// Add class to newly selected Tab content tag
			const tabId = clickedBtn.Button.getId();
			const selectedTab = m_contentTagsMap[tabId];
			selectedTab.classList.add(m_props.css.selectedTab);
			// Invoke outside listener
			if (m_props.tabs.fnClick) {
				m_props.tabs.fnClick(clickedBtn);
			}
		}

		function handleTabReady(contentTag, tab) {
			if (m_props.fnTabComplete) m_props.fnTabComplete(contentTag, tab);
		}

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
			if (m_props.fnComplete) m_props.fnComplete({ Tab: self });
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
				tabs: {
					// Expects a ButtonGroup config
				},
				contents: [],
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "tab" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "tab" });
			m_props.css = m_utils.extend(true, css, m_props.css);

			// Must check that ButtonGroup config have IDs
			// If not, create them
			m_props.tabs.buttons.forEach((button) => {
				if (!button.id) button.id = Math.round(Math.random() * 1000);
			});
		}
	}

	setup(options) {
		this.setup(options);
	}
};

ui.tab = (options) => new ui.class.Tab(options);

// Must ALWAYS define the new element as a Native Web Component
customElements.define("mambo-tab", ui.class.Tab);
