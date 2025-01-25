ui.class.ListMenu = class ListMenu extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_iconList = [];

		let m_containerTag;
		let m_data;
		let m_parentTag;
		let m_props;
		let m_lastOpenParent = null;

		this.addToList = addToList;
		this.destroy = destroyListMenu;
		this.replaceList = replaceList;
		this.setup = setup;
		this.toggleChildren = toggleChildren;
		this.getIconTagById = getIconTagById;
		this.closeAllItems = closeAllItems;

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
				m_containerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
				self.classList.add(m_props.css.self);

				installItems(m_data).then(() => {
					self.appendChild(m_containerTag);
					resolve();
				});
			});
		}

		function installItems(data, parentId = null) {
			return new Promise((resolve) => {
				const itemPromises = data.map((item) => {
					return processItem(item, parentId);
				});
				Promise.all(itemPromises).then(resolve);
			});
		}

		function processItem(itemData, parentId) {
			return new Promise((resolve) => {
				const itemId = ui.utils.getUniqueId();

				const itemWrapperTag = ui.d.createTag({
					name: m_props.tags.wrapper.name,
					class: m_props.css.wrapper,
				});

				if (parentId) {
					itemWrapperTag.setAttribute(m_props.parentIdAttrName, parentId);
					itemWrapperTag.classList.add("child-item");
					itemWrapperTag.style.display = "none";
				}

				itemWrapperTag.setAttribute(m_props.itemIdAttrName, itemId);

				const bodyTag = ui.d.createTag({
					name: m_props.tags.body.name,
					class: m_props.css.body,
				});

				const titleTag = ui.d.createTag({
					name: m_props.tags.title.name,
					text: itemData.title,
					class: m_props.css.title,
				});

				const subtitleTag = ui.d.createTag({
					name: m_props.tags.subtitle.name,
					text: itemData.subtitle,
					class: m_props.css.subtitle,
				});

				itemWrapperTag.appendChild(bodyTag);
				bodyTag.appendChild(titleTag);
				bodyTag.appendChild(subtitleTag);

				const hasIcons = insertIcon({ data: itemData, parentTag: itemWrapperTag, bodyTag });

				if (!hasIcons.left) {
					bodyTag.classList.add(m_props.css.paddingLeft || "padding-left");
				}

				if (!hasIcons.right) {
					bodyTag.classList.add(m_props.css.paddingRight || "padding-right");
				}

				m_containerTag.appendChild(itemWrapperTag);

				if (itemData.children && Array.isArray(itemData.children) && itemData.children.length > 0) {
					itemWrapperTag.classList.add("has-children");

					installItems(itemData.children, itemId).then(() => {
						setupItemEventListeners(itemWrapperTag, itemData).then(resolve);
					});
				} else {
					setupItemEventListeners(itemWrapperTag, itemData).then(resolve);
				}
			});
		}

		function insertIcon(context) {
			const iconPresence = { left: false, right: false };

			if (Array.isArray(context.data.icon)) {
				context.data.icon.forEach((icon) => {
					const position = addIcon({
						icon: icon,
						parentTag: context.parentTag,
					});

					if (position) {
						iconPresence[position] = true;
					}
				});
			}

			return iconPresence;

			function addIcon(context) {
				const cssClasses = [m_props.css.icon, context.icon.attr.class, context.icon.size].filter(Boolean).join(" ");
				const props = {
					...context.icon.prop,
					position: context.icon.position,
					size: context.icon.size,
					rotatable: context.icon.rotatable,
				};

				const tagConfig = {
					class: cssClasses,
					prop: props,
					attr: context.icon.attr,
				};
				let iconTag = ui.d.createTag("i", tagConfig);
				m_iconList.push(iconTag);

				if (context.icon.position === "left") {
					context.parentTag.insertBefore(iconTag, context.parentTag.firstChild);

					return "left";
				} else {
					context.parentTag.appendChild(iconTag);

					return "right";
				}
			}
		}

		function getIconTagById(id) {
			return m_iconList.find((icon) => icon.id === id);
		}

		function toggleChildren(parentItem) {
			const isTopLevelParent = !parentItem.closest(".child-item");
			const parentId = parentItem.getAttribute(m_props.itemIdAttrName);
			const isExpanded = parentItem.getAttribute(m_props.dataExpanded) === "true";

			if (isTopLevelParent && m_props.autoCloseItems && m_lastOpenParent && m_lastOpenParent !== parentItem) {
				const lastParentId = m_lastOpenParent.getAttribute(m_props.itemIdAttrName);
				const lastAllDescendants = getAllDescendants(lastParentId);

				lastAllDescendants.forEach((child) => {
					child.style.display = "none";
					child.setAttribute(m_props.dataExpanded, "false");

					m_iconList.map((icon) => {
						if (icon.rotatable && child === icon.parentElement) icon.style.transform = "rotate(0deg)";
					});
				});

				m_lastOpenParent.setAttribute(m_props.dataExpanded, "false");
				m_iconList.map((icon) => {
					if (icon.rotatable && m_lastOpenParent === icon.parentElement) icon.style.transform = "rotate(0deg)";
				});
			}

			const allDescendants = getAllDescendants(parentId);

			if (isExpanded) {
				allDescendants.forEach((child) => {
					child.style.display = "none";
					child.setAttribute(m_props.dataExpanded, "false");

					m_iconList.map((icon) => {
						if (icon.rotatable && child === icon.parentElement) icon.style.transform = "rotate(0deg)";
					});
				});
			} else {
				const directChildren = Array.from(allDescendants).filter((child) => child.getAttribute(m_props.parentIdAttrName) === parentId);
				directChildren.forEach((child) => {
					child.style.display = "flex";
				});

				if (isTopLevelParent) {
					m_lastOpenParent = parentItem;
				}
			}

			allDescendants.forEach((child) => {
				child.setAttribute(m_props.dataExpanded, "false");
			});

			parentItem.setAttribute(m_props.dataExpanded, !isExpanded);

			m_iconList.map((icon) => {
				if (icon.rotatable && parentItem === icon.parentElement) icon.style.transform = isExpanded ? "rotate(0deg)" : "rotate(90deg)";
			});
		}

		function getAllDescendants(parentId) {
			const descendants = [];
			let currentLevel = m_containerTag.querySelectorAll(`[data-parent-id="${parentId}"]`);

			while (currentLevel.length > 0) {
				const nextLevel = [];
				currentLevel.forEach((child) => {
					descendants.push(child);
					const childId = child.getAttribute(m_props.itemIdAttrName);
					const childChildren = m_containerTag.querySelectorAll(`[data-parent-id="${childId}"]`);
					childChildren.forEach((grandChild) => nextLevel.push(grandChild));
				});
				currentLevel = nextLevel;
			}

			return descendants;
		}

		function setupItemEventListeners(item, data) {
			return new Promise((resolve) => {
				const listeners = [
					{ type: "click", fn: "onSelect" },
					{ type: "mouseover", fn: "onHover" },
					{ type: "mouseleave", fn: "onLeave" },
				];

				listeners.forEach((listener) => {
					item.addEventListener(listener.type, (ev) => {
						if (listener.type === "click" && item.classList.contains("has-children")) {
							toggleChildren(item);
						}

						if (m_props[listener.fn]) {
							m_props[listener.fn]({
								ev,
								data,
								item,
								ListMenu: self,
							});
						}
					});
				});
				resolve();
			});
		}

		function addToList(data) {
			m_data = data;
			installItems(m_data).then();
		}

		function replaceList(data) {
			clearData();
			m_data = data;
			installItems(m_data).then();
		}

		function clearData() {
			m_containerTag.innerHTML = "";
		}

		function destroyListMenu() {
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.onComplete) {
				m_props.onComplete({ ListMenu: self });
			}
		}

		function closeAllItems() {
			function recursiveClose(parentItem) {
				const parentId = parentItem.getAttribute(m_props.itemIdAttrName);
				const allDescendants = getAllDescendants(parentId);

				allDescendants.forEach((child) => {
					child.style.display = "none";
					child.setAttribute(m_props.dataExpanded, "false");

					if (child.classList.contains("has-children")) {
						recursiveClose(child);
					}
				});

				parentItem.setAttribute(m_props.dataExpanded, "false");

				m_iconList.map((icon) => {
					if (icon.rotatable && parentItem === icon.parentElement) icon.style.transform = "rotate(0deg)";
				});
			}

			const allParentItems = m_containerTag.querySelectorAll(".has-children");

			allParentItems.forEach((parentItem) => {
				recursiveClose(parentItem);
			});

			m_lastOpenParent = null;
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
					itemIdAttrName: "data-item-id",
					parentIdAttrName: "data-parent-id",
					dataExpanded: "data-expanded",
					autoCloseItems: true,
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				m_data = customProps.data;
				const tags = ui.tags.getTags({ name: m_props.tag, component: "listMenu" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "listMenu" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.listMenu = (props) => new ui.class.ListMenu(props);
customElements.define(ui.defaultTags.listMenu.self.name, ui.class.ListMenu);
