ui.class.DragDrop = class DragDrop extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = new ui.utils();
		const m_theme = ui.theme(ui.defaultTheme);
		const m_tags = ui.tagNames(ui.defaultTagNames);

		// HTML tag variables
		let m_parentTag;
		let m_dragDropTag;

		let m_props;

		// Public methods
		this.destroy = destroyDragDrop;
		this.getParentTag = () => m_dragDropTag;
		this.install = installSelf;
		this.setup = setup;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			setupEventHandlers();
			installDOM();
		}

		function installDOM() {
			m_dragDropTag = dom.createTag("div", { class: m_props.css.parent });
			const tagConfig = {
				class: m_props.css.imgDropIcon,
				attr: { src: m_props.baseUrl + m_props.imgDropIcon },
			};
			let imgEle = dom.createTag("img", tagConfig);
			let textEle = dom.createTag("text", {
				class: m_props.css.dropText,
				text: m_props.dropText,
			});

			dom.append(m_dragDropTag, imgEle).append(m_dragDropTag, textEle);
			self.appendChild(m_dragDropTag);

			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
		}

		function setupEventHandlers() {
			// on drop
			m_dragDropTag.addEventListener("drop", handleDrop);

			// on drag over
			m_dragDropTag.addEventListener("dragover", (ev) => {
				// Prevent default behavior (Prevent file from being opened)
				ev.preventDefault();

				if (m_props.fnDragover) {
					m_props.fnDragover({ ev: ev });
				}
			});

			// On mouseenter mouseleave
			m_dragDropTag.addEventListener("mouseenter mouseleave", (ev) => {
				if (m_props.fnMouseenterMouseleave) {
					m_props.fnMouseenterMouseleave({ ev: ev });
				}
			});
		}

		function handleDrop(ev) {
			// Prevent default behavior (Prevent file from being opened)
			ev.preventDefault();
			ev.stopPropagation();

			if (!m_props.fnDrop) {
				return;
			}

			// Get file types
			let items = ev.dataTransfer.items;

			// Return if no items were dropped
			if (!items || items.length === 0) {
				m_props.fnDrop({ error: "No items dropped", dataTransfer: {} });
				return;
			}

			// Return if drop count is larger than allowed
			if (m_props.maxFileCount && items.length > m_props.maxFileCount) {
				m_props.fnDrop({ error: "maxFileCount", dataTransfer: {} });
				return;
			}

			// Check all file kinds are allowed
			for (let i = 0; i < items.length; i++) {
				if (!checkFileKindAllowed(items[i].type)) {
					console.error("DragDrop: one or more file formats are not allowed.");
					return;
				}
			}

			// Return results
			m_props.fnDrop({ dataTransfer: ev.dataTransfer, ev: ev });
		}

		function checkFileKindAllowed(type) {
			let valid = true;

			// Check property exists and it is an Array
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
			m_parentTag.removeChild(m_dragDropTag);
		}

		function installSelf(parentTag, prepend) {
			m_parentTag = parentTag ? parentTag : m_parentTag;
			m_parentTag = dom.getTag(m_parentTag);
			dom.append(m_parentTag, self, prepend);
		}

		function configure(customProps) {
			m_props = {
				install: true,
				imgDropIcon: ui.graphics.getImage({ name: "arrow-down-box-black" }),
				dropText: "Drop Here",
				hidden: false,
				baseUrl: "",
				maxFileCount: null,
				tag: "default",
				theme: "default",
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names names
			m_props.tags = m_utils.extend(
				true,
				m_tags.getTags({
					name: m_props.tag,
					component: "dragDrop",
				}),
				m_props.tags
			);
			// Extend CSS class names
			m_props.css = m_utils.extend(
				true,
				m_theme.getTheme({
					name: m_props.theme,
					component: "dragDrop",
				}),
				m_props.css
			);
		}
	}
};

ui.dragDrop = (parentTag, options) => new ui.class.DragDrop(parentTag, options);

customElements.define("mambo-dragdrop", ui.class.DragDrop);
