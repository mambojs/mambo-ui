ui.class.TreeView = class TreeView extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme(ui.defaultTheme);
		const m_tags = ui.tagNames(ui.defaultTagNames);

		// HTML tag variables
		let m_parentTag;
		let m_treeViewParentTag;

		let m_props;
		let m_treeViewData = props.data;
		const m_dataMapById = {};

		// Configure public methods
		this.destroy = destroyTreeView;
		this.getItemData = getItemData;
		this.getParentTag = () => m_treeViewParentTag;
		this.install = installSelf;
		this.setup = setup;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			installDOM();
			finishSetup();
		}

		function installDOM() {
			m_treeViewParentTag = dom.createTag(m_props.tags.treeView, {
				class: m_props.css.treeViewParent,
			});

			self.appendChild(m_treeViewParentTag);
			installItems(m_treeViewData, m_treeViewParentTag);
		}

		function installItems(groupData, groupTag) {
			groupData.forEach((itemData) => {
				processItem(itemData, groupTag);
			});
		}

		function processItem(itemData, parentTag) {
			// Create item tag
			let itemTag = dom.createTag(m_props.tags.treeViewItem, {
				class: m_props.css.item,
			});
			dom.append(parentTag, itemTag);

			let itemId = m_props.idField in itemData ? itemData[m_props.idField] : m_utils.getUniqueId();
			let idAtt = {};
			idAtt[m_props.itemIdAttrName] = itemId;
			m_dataMapById[itemId] = m_utils.clone(itemData);
			delete m_dataMapById[itemId][m_props.itemsField];

			const topTag = dom.createTag(m_props.tags.treeViewItemTop, {
				class: m_props.css.top,
			});
			const inTag = dom.createTag(m_props.tags.treeViewItemIn, {
				class: m_props.css.in,
				attr: idAtt,
				text: itemData[m_props.textField],
			});
			dom.append(topTag, inTag).append(itemTag, topTag);

			setupItemEventListeners(inTag, itemData);

			const items = itemData[m_props.itemsField];
			if (items && Array.isArray(items) && items.length > 0) {
				let groupTag = processGroup(items, itemTag);
				installIcon(topTag, groupTag, itemData);
			}
		}

		function processGroup(groupData, parentTag) {
			// Create group tag
			let groupTag = dom.createTag(m_props.tags.treeViewGroup, {
				class: m_props.css.group,
			});
			dom.append(parentTag, groupTag);

			installItems(groupData, groupTag);

			return groupTag;
		}

		function installIcon(parentTag, groupTag, itemData) {
			const expanded = "expanded" in itemData ? itemData.expanded : m_props.expanded;
			const iconTag = dom.createTag("icon", { class: m_props.css.icon });
			dom.addClass(iconTag, m_props.css.iconExpand);
			dom.prepend(parentTag, iconTag);

			setupIconEventListeners(groupTag, iconTag);

			if (expanded) {
				toggleExpand(groupTag, iconTag);
			}
		}

		function clearSelected() {
			let selected = dom.getTags(`.${m_props.css.selected}`, m_treeViewParentTag);
			if (selected && selected.length > 0) {
				for (let index = 0; index < selected.length; index++) {
					dom.removeClass(selected[index], m_props.css.selected);
				}
			}
		}

		function setupItemEventListeners(inTag, itemData) {
			inTag.addEventListener("click", (ev) => {
				if (m_props.fnSelect) {
					m_props.fnSelect({
						TreeView: self,
						tag: inTag,
						itemData: itemData,
						ev: ev,
					});
				}

				if (!ev.defaultPrevented) {
					clearSelected();
					dom.addClass(inTag, m_props.css.selected);
				}
			});

			inTag.addEventListener("mouseenter", () => {
				if (!dom.hasClass(inTag, m_props.css.selected)) {
					dom.addClass(inTag, m_props.css.hover);
				}
			});

			inTag.addEventListener("mouseleave", () => {
				dom.removeClass(inTag, m_props.css.hover);
			});
		}

		function setupIconEventListeners(groupTag, iconTag) {
			iconTag.addEventListener("click", (ev) => {
				let iconTag = ev.target;
				toggleExpand(groupTag, iconTag);
			});
		}

		function toggleExpand(groupTag, iconTag) {
			dom.toggleClass(groupTag, m_props.css.expanded);
			dom.toggleClass(iconTag, m_props.css.iconCollapse).toggleClass(iconTag, m_props.css.iconExpand);
		}

		function getItemData(tag) {
			let itemId = tag.getAttribute(m_props.itemIdAttrName);
			return m_dataMapById[itemId];
		}

		function destroyTreeView() {
			dom.remove(m_treeViewParentTag);
		}

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
			if (m_props.fnComplete) m_props.fnComplete({ TreeView: self });
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
				idField: "id",
				textField: "text",
				itemsField: "items",
				itemIdAttrName: "data-tree-view-item-id",
				fnSelect: (context) => {
					// Nothing executes by default
				},
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "treeView" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "treeView" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.treeView = (props) => new ui.class.TreeView(props);

customElements.define("mambo-tree-view", ui.class.TreeView);
