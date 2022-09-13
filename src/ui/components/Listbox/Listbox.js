ui.class.Listbox = class Listbox extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		let m_parentTag;
		let m_listboxContainerTag;
		let m_props;
		let m_listboxData;

		this.addToList = addToList;
		this.destroy = destroyListbox;
		this.replaceList = replaceList;
		this.setup = setup;

		if (props) {
			setup(props);
		}

		async function setup(props) {
			await configure(props);
			await ui.utils.installUIComponent({ self, m_parentTag, m_props });
			await setupDOM();
			setupComplete();
		}

		function setupDOM() {
			return new Promise((resolve) => {

				const tagContainerConfig = {
					class: m_props.css.container,
					prop: m_props.prop,
				};

				m_listboxContainerTag = ui.d.createTag(m_props.tags.container, tagContainerConfig);
				self.classList.add(m_props.css.self);

				installItems(m_listboxData).then(() => {
					self.appendChild(m_listboxContainerTag);
					resolve();
				});

			});
		}

		function installItems(data) {
			return new Promise((resolve) => {
				const itemPromises = data.map((itemData) => {
					return processItem(itemData);
				});
				Promise.all(itemPromises).then(resolve);
			});
		}

		function processItem(itemData) {
			return new Promise((resolve) => {
				const itemConfig = {
					class: m_props.css.item,
					text: itemData[m_props.displayKey]
				}

				let itemTag = ui.d.createTag(m_props.tags.item, itemConfig);
				m_listboxContainerTag.appendChild(itemTag);

				setupItemEventListeners(itemTag, itemData).then(resolve);
			});
		}

		function setupItemEventListeners(item, data) {
			return new Promise((resolve) => {
				item.addEventListener("click", ev => {
					if (m_props.fnSelect) {
						m_props.fnSelect({
							ev,
							data,
							item,
							Listbox: self
						});
					}
				});
				resolve();
			});
		}

		function addToList(data) {
			m_listboxData = data;
			installItems(m_listboxData).then();
		}

		function replaceList(data) {
			clearData();
			m_listboxData = data;
			installItems(m_listboxData).then();
		}

		function clearData() {
			m_listboxContainerTag.innerHTML = "";
		}

		function destroyListbox() {
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Listbox: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					displayKey: "displayName",
					tag: "default",
					theme: "default",
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				m_listboxData = customProps.data;
				const tags = ui.tags.getTags({ name: m_props.tag, component: "listbox" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "listbox" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
}

ui.listbox = (props) => new ui.class.Listbox(props);
customElements.define("mambo-listbox", ui.class.Listbox);
