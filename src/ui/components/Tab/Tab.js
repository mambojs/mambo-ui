ui.class.Tab = class Tab extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// Define member variables
		let m_props;
		let m_selectedId;

		// Define tag member variables
		let m_parentTag;
		let m_tabsTag;
		let m_tabsGroup;
		let m_contentTag;
		const m_contentTagsMap = {};

		// Define public functions
		this.setup = setup;

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
				m_contentTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
				m_tabsTag = ui.d.createTag({ ...m_props.tags.tabs, class: m_props.css.tabs });
				self.classList.add(m_props.css.self);
				self.appendChild(m_tabsTag);
				self.appendChild(m_contentTag);
				installTabs().then(resolve);
			});
		}

		function installTabs() {
			return new Promise((resolve) => {
				const tabConfig = ui.utils.extend(true, m_props.tabs, {});
				tabConfig.fnClick = toggleTabContent;
				tabConfig.parentTag = m_tabsTag;
				m_tabsGroup = ui.buttonGroup(tabConfig);
				installContent().then(resolve);
			});
		}

		function installContent() {
			return new Promise((resolve) => {
				const tabPromises = m_props.tabs.buttons.map((button, index) => {
					return new Promise((resolve) => {
						const contentTag = ui.d.createTag({ ...m_props.tags.content, class: m_props.css.content });
						button.id = button.id ? button.id : index;

						if (m_selectedId === button.id) {
							// Set to show default selected Tab
							contentTag.classList.add(m_props.css.selectedTab);
						} else if (!m_selectedId && index === 0) {
							// Set to show first tab as selected Tab
							contentTag.classList.add(m_props.css.selectedTab);
						}

						m_contentTagsMap[button.id] = contentTag;

						// Check if content already exists for this Tab
						if (m_props.contents[index]) {
							contentTag.appendChild(m_props.contents[index]);
						}

						m_contentTag.appendChild(contentTag);

						if (m_props.fnTabComplete) {
							m_props.fnTabComplete(contentTag, button);
						}

						resolve();
					});
				});

				Promise.all(tabPromises).then(resolve);
			});
		}

		function toggleTabContent(clickedBtn) {
			// Remove selected class from ALL content tags
			ui.d.removeClassAll(m_contentTagsMap, m_props.css.selectedTab);
			// Add class to newly selected Tab content tag
			const tabId = clickedBtn.Button.getId();
			const selectedTab = m_contentTagsMap[tabId];
			selectedTab.classList.add(m_props.css.selectedTab);
			// Invoke outside listener
			if (m_props.tabs.fnClick) {
				m_props.tabs.fnClick(clickedBtn);
			}
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Tab: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					theme: "default",
					tag: "default",
					contents: [],
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "tab" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "tab" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.tab = (options) => new ui.class.Tab(options);
customElements.define(ui.defaultTags.tab.self.name, ui.class.Tab);
