class MamboTab extends HTMLElement {
    constructor(initOptions) {
        super();
        // Define constants
        const self = this;
        const m_utils = g_mamboUtils;
        const m_theme = g_mamboTheme;

        // Define member variables
        let m_config;
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

        if (initOptions) setup(initOptions);

        function setup(options) {
            configure(options);
            installDom();
        }

        function installDom() {
            // Add CSS class to parent
            g_mamboDomJS.addClass(self, m_config.css.parent);
            // Create content parent tag
            const eleConfig = {
                class: m_config.css.contentParent
            };
            m_contentParentTag = g_mamboDomJS.createTag(m_config.tag.contentParent, eleConfig);

            m_tabsTag = g_mamboDomJS.createTag(m_config.tag.tabs, { class: m_config.css.tabs });

            installTabs(m_config.tabs);
            installContent();

            // Append all childs
            self.appendChild(m_tabsTag);
            self.appendChild(m_contentParentTag);
            // Install component into parent
            if (m_config.install) installSelf(m_parentTag, m_config.installPrepend);
        }

        function installContent() {
            m_config.tabs.buttons.forEach((button, index) => {
                const contentTag = g_mamboDomJS.createTag(m_config.tag.content, { class: m_config.css.content });

                if (m_selectedId === button.id) {
                    // Set to show default selected Tab
                    g_mamboDomJS.addClass(contentTag, m_config.css.selectedTab);
                } else if (!m_selectedId && index === 0) {
                    // Set to show first tab as selected Tab
                    g_mamboDomJS.addClass(contentTag, m_config.css.selectedTab);
                }

                m_contentTagsMap[button.id] = contentTag;

                // Check if content already exists for this Tab
                if (m_config.contents[index]) {
                    contentTag.appendChild(m_config.contents[index]);
                }

                m_contentParentTag.appendChild(contentTag);
                // Invoke Tab installed callback
                handleTabReady(contentTag, button);
            });
        }

        function installTabs(tabsConfig) {
            const tabConfig = m_utils.extend(true, tabsConfig, {});
            tabConfig.fnClick = toggleTabContent;
            m_tabsGroup = new MamboButtonGroup(m_tabsTag, tabConfig);
        }

        function toggleTabContent(clickedBtn) {
            // Remove selected class from ALL content tags
            g_mamboDomJS.removeClassAll(m_contentTagsMap, m_config.css.selectedTab);
            // Add class to newly selected Tab content tag
            const tabId = clickedBtn.button.getId();
            const selectedTab = m_contentTagsMap[tabId];
            selectedTab.classList.add(m_config.css.selectedTab);
            // Invoke outside listener
            if (m_config.tabs.fnClick) {
                m_config.tabs.fnClick(clickedBtn);
            }
        }

        function handleTabReady(contentTag, tab) {
            m_config.fnTabReady(contentTag, tab);
        }

        function installSelf(parentTag, prepend) {
            m_parentTag = parentTag ? parentTag : m_parentTag;
            m_parentTag = g_mamboDomJS.appendSelfToParentTag(parentTag, self, prepend);
        }

        function configure(options) {
            m_config = {
                // Expects a list of native DOM elements
                contents: [],
                fnTabReady: () => { },
                id: undefined,
                install: true,
                installPrepend: false,
                parentTag: undefined,
                selectedId: undefined,
                tabs: {
                    // Expects a ButtonGroup config
                },
                tag: {
                    tabs: "mambo-tabs",
                    contentParent: "mambo-tab-contents",
                    content: "mambo-tab-content",
                },
                theme: "default",
            };

            // If options provided, override default config
            if (options) m_config = m_utils.extend(true, m_config, options);
            // Set defaults
            m_selectedId = m_config.selectedId;
            if (m_config.parentTag) {
                m_parentTag = g_mamboDomJS.getTag(m_config.parentTag);
            }

            // Must check that ButtonGroup config have IDs
            // If not, create them
            m_config.tabs.buttons.forEach((button) => {
                if (!button.id) button.id = (Math.round(Math.random() * 1000));
            });

            m_config.css = m_utils.extend(true, m_theme.getTheme({
                name: m_config.theme,
                control: "mambo-tab"
            }), m_config.css);
        }
    }
}
// Must ALWAYS define the new element as a Native Web Component
customElements.define('mambo-tab', MamboTab);