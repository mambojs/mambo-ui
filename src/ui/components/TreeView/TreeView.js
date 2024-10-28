ui.class.TreeView = class TreeView extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;

		let m_props;
		const m_dataMapById = {};

		// Configure public methods
		this.destroy = destroyTreeView;
		this.getItemData = getItemData;
		this.getParentTag = () => self;
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
				self.classList.add(m_props.css.self);
				processTreeData(props.data, self).then(resolve);
			});
		}

		function processTreeData(groupData, parentTag) {
			return new Promise((resolve) => {
				const itemPromises = groupData.map((itemData) => {
					return processItem(itemData, parentTag);
				});
				Promise.all(itemPromises).then(resolve);
			});
		}

		function processItem(itemData, parentTag) {
			return new Promise((resolve) => {
				let itemTag = ui.d.createTag({ ...m_props.tags.item, class: m_props.css.item });
				parentTag.appendChild(itemTag);

				let itemId = m_props.idField in itemData ? itemData[m_props.idField] : ui.utils.getUniqueId();
				let idAtt = {};
				idAtt[m_props.itemIdAttrName] = itemId;
				m_dataMapById[itemId] = ui.utils.clone(itemData);
				delete m_dataMapById[itemId][m_props.itemsField];

				const topTag = ui.d.createTag({ ...m_props.tags.itemTop, class: m_props.css.itemTop });

				const itemInAttr = { ...m_props.tags.itemIn.attr, ...idAtt };
				const itemInConfig = {
					...m_props.tags.itemIn,
					class: m_props.css.in,
					attr: itemInAttr,
					text: itemData[m_props.textField],
				};

				const inTag = ui.d.createTag(itemInConfig);

				topTag.appendChild(inTag);
				itemTag.appendChild(topTag);
				setupItemEventListeners(inTag, itemData).then(() => {
					const items = itemData[m_props.itemsField];

					if (items && Array.isArray(items) && items.length > 0) {
						let groupTag = processGroup(items, itemTag);
						installIcon(topTag, groupTag, itemData).then(resolve);
					} else {
						resolve();
					}
				});
			});
		}

		function processGroup(groupData, parentTag) {
			let groupTag = ui.d.createTag({ ...m_props.tags.group, class: m_props.css.group });
			parentTag.appendChild(groupTag);
			processTreeData(groupData, groupTag);
			return groupTag;
		}

		function installIcon(parentTag, groupTag, itemData) {
			return new Promise((resolve) => {
				const expanded = "expanded" in itemData ? itemData.expanded : m_props.expanded;
				const iconTag = ui.d.createTag({
					...m_props.tags.icon,
					class: m_props.css.icon,
					event: {
						click: () => {
							toggleExpand(groupTag, iconTag);
						},
					},
				});
				iconTag.classList.add(m_props.css.iconExpand);
				ui.d.prepend(parentTag, iconTag);

				if (expanded) {
					toggleExpand(groupTag, iconTag);
				}
				resolve();
			});
		}

		function clearSelected() {
			let selected = ui.d.getTags(`.${m_props.css.selected}`, self);
			if (selected && selected.length > 0) {
				for (let index = 0; index < selected.length; index++) {
					selected[index].classList.remove(m_props.css.selected);
				}
			}
		}

		function setupItemEventListeners(inTag, itemData) {
			return new Promise((resolve) => {
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
						inTag.classList.add(m_props.css.selected);
					}
				});

				inTag.addEventListener("mouseenter", () => {
					if (!ui.d.hasClass(inTag, m_props.css.selected)) {
						inTag.classList.add(m_props.css.hover);
					}
				});

				inTag.addEventListener("mouseleave", () => {
					inTag.classList.remove(m_props.css.hover);
				});
				resolve();
			});
		}

		function toggleExpand(groupTag, iconTag) {
			groupTag.classList.toggle(m_props.css.expanded);
			iconTag.classList.toggle(m_props.css.iconCollapse);
			iconTag.classList.toggle(m_props.css.iconExpand);
		}

		function getItemData(tag) {
			let itemId = tag.getAttribute(m_props.itemIdAttrName);
			return m_dataMapById[itemId];
		}

		function destroyTreeView() {
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ TreeView: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					data: [],
					tag: "default",
					theme: "default",
					idField: "id",
					textField: "text",
					itemsField: "items",
					itemIdAttrName: "data-tree-view-item-id",
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "treeView" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "treeView" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.treeView = (props) => new ui.class.TreeView(props);
customElements.define("mambo-tree-view", ui.class.TreeView);
