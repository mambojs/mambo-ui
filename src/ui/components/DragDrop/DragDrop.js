ui.class.DragDrop = class DragDrop extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		let m_parentTag;
		let m_props;

		// Public methods
		this.destroy = destroyDragDrop;
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
				let imgTag = ui.d.createTag({ name: "i", class: m_props.css.dropIcon });

				let textTag = ui.d.createTag({
					...m_props.tags.dropText,
					class: m_props.css.dropText,
					text: m_props.dropText,
				});

				self.classList.add(m_props.css.self);
				self.appendChild(imgTag);
				self.appendChild(textTag);
				setupEventListener().then(resolve);
			});
		}

		function setupEventListener() {
			return new Promise((resolve) => {
				self.addEventListener("drop", handleDrop);
				self.addEventListener("dragover", handleDragover);
				self.addEventListener("mouseenter", handleMouseEnterLeave);
				self.addEventListener("mouseleave", handleMouseEnterLeave);
				resolve();
			});
		}

		function handleMouseEnterLeave(ev) {
			if (m_props.onMouseenterMouseleave) {
				m_props.onMouseenterMouseleave({ ev: ev });
			}
		}

		function handleDragover(ev) {
			ev.preventDefault();

			if (m_props.onDragover) {
				m_props.onDragover({ ev: ev });
			}
		}

		function handleDrop(ev) {
			ev.preventDefault();
			ev.stopPropagation();

			if (!m_props.onDrop) {
				return;
			}

			let items = ev.dataTransfer.items;

			if (!items || items.length === 0) {
				m_props.onDrop({ error: "No items dropped", dataTransfer: {} });

				return;
			}

			if (m_props.maxFileCount && items.length > m_props.maxFileCount) {
				m_props.onDrop({ error: "maxFileCount", dataTransfer: {} });

				return;
			}

			for (let i = 0; i < items.length; i++) {
				if (!checkFileKindAllowed(items[i].type)) {
					console.error("DragDrop() one or more file formats are not allowed.");

					return;
				}
			}

			m_props.onDrop({ dataTransfer: ev.dataTransfer, ev: ev });
		}

		function checkFileKindAllowed(type) {
			let valid = true;

			if (m_props.allowKind && Array.isArray(m_props.allowKind)) {
				m_props.allowKind.some((allowedKind) => {
					// Check if file type is allowed
					if (allowedKind !== type) {
						valid = false;

						return true;
					}
				});
			}

			return valid;
		}

		function destroyDragDrop() {
			m_parentTag.removeChild(self);
		}

		function setupComplete() {
			if (m_props.onComplete) {
				m_props.onComplete({ Button: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					dropText: "Drop Here",
					tag: "default",
					theme: "default",
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "dragDrop" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "dragDrop" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.dragDrop = (props) => new ui.class.DragDrop(props);
customElements.define(ui.defaultTags.dragDrop.self.name, ui.class.DragDrop);
