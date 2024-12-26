ui.class.ListMenu = class ListMenu extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_iconList = [];

		let m_containerTag;
		let m_data;
		let m_parentTag;
		let m_props;

		this.addToList = addToList;
		this.destroy = destroyListMenu;
		this.replaceList = replaceList;
		this.setup = setup;
		this.toggleChildren = toggleChildren;
		this.getIconTagById = getIconTagById;

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
				const itemId = "item-" + Math.random().toString(36).substr(2, 9);

				const itemWrapperTag = ui.d.createTag({
					name: m_props.tags.wrapper.name,
					class: m_props.css.wrapper,
				});

				if (parentId) {
					itemWrapperTag.setAttribute("data-parent-id", parentId);
					itemWrapperTag.classList.add("child-item");
					itemWrapperTag.style.display = "none";
				}

				itemWrapperTag.setAttribute("data-item-id", itemId);

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

				insertIcon({ data: itemData, parentTag: itemWrapperTag });

				m_containerTag.appendChild(itemWrapperTag);

				if (itemData.child && itemData.child.length > 0) {
					itemWrapperTag.classList.add("has-children");

					installItems(itemData.child, itemId).then(() => {
						setupItemEventListeners(itemWrapperTag, itemData).then(resolve);
					});
				} else {
					setupItemEventListeners(itemWrapperTag, itemData).then(resolve);
				}
			});
		}

		function insertIcon(context) {
			if (Array.isArray(context.data.icon)) {
				context.data.icon.forEach((icon) => {
					addIcon({ icon: icon, parentTag: context.parentTag });
				});
			}

			function addIcon(context) {
				const cssClasses = [m_props.css.icon, context.icon.attr.class, context.icon.size].filter(Boolean).join(" ");

				const tagConfig = {
					class: cssClasses,
					prop: context.icon.prop,
					attr: context.icon.attr,
				};
				let iconTag = ui.d.createTag("i", tagConfig);
				m_iconList.push(iconTag);

				if (context.icon.position === "left") {
					context.parentTag.insertBefore(iconTag, context.parentTag.firstChild);
				} else {
					context.parentTag.appendChild(iconTag);
				}
			}
		}

		function getIconTagById(id) {
			return m_iconList.find((icon) => icon.id === id);
		}

		function toggleChildren(parentItem) {
			const parentId = parentItem.getAttribute("data-item-id");
			const childItems = m_containerTag.querySelectorAll(`[data-parent-id="${parentId}"]`);
			const isExpanded = parentItem.getAttribute("data-expanded") === "true";

			childItems.forEach((child) => {
				child.style.display = isExpanded ? "none" : "flex";
			});

			parentItem.setAttribute("data-expanded", !isExpanded);

			const arrowIcon = parentItem.querySelector(".fa-caret-right");

			if (arrowIcon) {
				arrowIcon.style.transform = isExpanded ? "rotate(0deg)" : "rotate(90deg)";
			}
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

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
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
