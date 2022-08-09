ui.class.DragDrop = class DragDrop extends HTMLElement {
	constructor(parentTag, options) {
		super();

		if (!parentTag) {
			console.error("DragDrop: required parentEle parameter was not passed in.");
			return;
		}

		// Config default values
		const m_utils = new ui.utils();

		// HTML tag variables
		let m_parentTag;
		let m_dragDropTag;

		let m_config;

		// Public methods
		this.destroy = destroyDragDrop;
		this.getParentTag = () => m_dragDropTag;

		// Configure
		configure();

		// Begin setup
		setup();

		function setup() {
			m_parentTag = dom.getTag(parentTag);

			if (m_config.hidden) {
				// Install event handlers only
				m_dragDropTag = m_parentTag;
			} else {
				installDOMTags();
			}

			setupEventHandlers();
		}

		function installDOMTags() {
			m_dragDropTag = dom.createTag("div", { class: m_config.css.parent });
			const tagConfig = {
				class: m_config.css.imgDropIcon,
				attr: { src: m_config.baseUrl + m_config.imgDropIcon },
			};
			let imgEle = dom.createTag("img", tagConfig);
			let textEle = dom.createTag("text", {
				class: m_config.css.dropText,
				text: m_config.dropText,
			});

			dom.append(m_dragDropTag, imgEle).append(m_dragDropTag, textEle);
			dom.append(m_parentTag, m_dragDropTag);
		}

		function setupEventHandlers() {
			// on drop
			m_dragDropTag.addEventListener("drop", handleDrop);

			// on drag over
			m_dragDropTag.addEventListener("dragover", (ev) => {
				// Prevent default behavior (Prevent file from being opened)
				ev.preventDefault();

				if (m_config.fnDragover) {
					m_config.fnDragover({ ev: ev });
				}
			});

			// On mouseenter mouseleave
			m_dragDropTag.addEventListener("mouseenter mouseleave", (ev) => {
				if (m_config.fnMouseenterMouseleave) {
					m_config.fnMouseenterMouseleave({ ev: ev });
				}
			});
		}

		function handleDrop(ev) {
			// Prevent default behavior (Prevent file from being opened)
			ev.preventDefault();
			ev.stopPropagation();

			if (!m_config.fnDrop) {
				return;
			}

			// Get file types
			let items = ev.dataTransfer.items;

			// Return if no items were dropped
			if (!items || items.length === 0) {
				m_config.fnDrop({ error: "No items dropped", dataTransfer: {} });
				return;
			}

			// Return if drop count is larger than allowed
			if (m_config.maxFileCount && items.length > m_config.maxFileCount) {
				m_config.fnDrop({ error: "maxFileCount", dataTransfer: {} });
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
			m_config.fnDrop({ dataTransfer: ev.dataTransfer, ev: ev });
		}

		function checkFileKindAllowed(type) {
			let valid = true;

			// Check property exists and it is an Array
			if (m_config.allowKind && Array.isArray(m_config.allowKind)) {
				m_config.allowKind.some((allowedKind) => {
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

		function configure() {
			m_config = {
				imgDropIcon: ui.graphics.getImage({ name: "arrow-down-box-black" }),
				dropText: "Drop Here",
				hidden: false,
				baseUrl: "",
				maxFileCount: null,
				theme: "default"
			};

			// If options provided, override default config
			if (options) {
				m_config = m_utils.extend(true, m_config, options);
			}
		}
	}
};

ui.dragDrop = (parentTag, options) => new ui.class.DragDrop(parentTag, options);

customElements.define("mambo-dragdrop", ui.class.DragDrop);
