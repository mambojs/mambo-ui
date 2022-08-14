ui.class.Dialog = class Dialog extends HTMLElement {
	constructor(props) {
		super();

		// Config default values
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();

		// HTML tag variables
		let m_parentTag;
		let m_dialogTag;
		let m_dialogHdrTag;
		let m_dialogBodyTag;

		let m_props;

		// Configure public methods
		this.close = closeDialog;
		this.getParentTag = () => m_dialogTag;
		this.getBodyTag = () => m_dialogBodyTag;
		this.getHeaderTag = () => m_dialogHdrTag;
		this.install = installSelf;
		this.setup = setup;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			setupDOM();
		}

		function setupDOM() {
			m_dialogTag = dom.createTag(m_props.tags.parent, {
				class: m_props.css.parent,
			});

			m_dialogBodyTag = dom.createTag(m_props.tags.dialogBody, {
				class: m_props.css.dialogBody,
			});

			const dialogHdrLeft = dom.createTag("dialog-header-left", {
				class: m_props.css.dialogHdrLeft,
			});

			if (m_props.closeButton) {
				installCloseButton(dialogHdrLeft);
			}

			const overlayHdrCenter = dom.createTag("dialog-header-center", {
				class: m_props.css.dialogHdrCenter,
			});

			if (m_props.title) {
				const h3Tag = dom.createTag("h3", {
					class: m_props.css.hdrTitle,
					text: m_props.title,
				});
				dom.append(overlayHdrCenter, h3Tag);
			} else {
				dom.append(overlayHdrCenter, m_props.hdrHtml);
			}

			const overlayHdrRight = dom.createTag("dialog-header-right", {
				class: m_props.css.dialogHdrRight,
			});

			m_dialogHdrTag = dom.createTag("dialog-header", {
				class: m_props.css.dialogHdr,
			});

			dom.append(m_dialogHdrTag, dialogHdrLeft);
			dom.append(m_dialogHdrTag, overlayHdrCenter);
			dom.append(m_dialogHdrTag, overlayHdrRight);
			dom.append(m_dialogTag, m_dialogHdrTag);
			dom.append(m_dialogTag, m_dialogBodyTag);
			self.appendChild(m_dialogTag);
			loadDOM();
		}

		function installCloseButton(headerLeftTag) {
			const btnConfig = {
				parentTag: headerLeftTag,
				text: m_props.closeText,
				css: {
					button: m_props.css.hdrCloseBtn,
				},
				attr: {
					type: "button",
				},
				fnClick: () => {
					if (m_props.fnClose) {
						m_props.fnClose({ dialog: self });
					} else {
						close();
					}
				},
			};

			ui.button(btnConfig);
		}

		function closeDialog() {
			close();
		}

		function close() {
			dom.remove(m_dialogTag);
		}

		function loadDOM() {
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			if (m_props.fnComplete) m_props.fnComplete({ Dialog: self });
		}

		function installSelf(parentTag, prepend) {
			m_parentTag = parentTag ? parentTag : m_parentTag;
			m_parentTag = dom.getTag(m_parentTag);
			dom.append(m_parentTag, self, prepend);
		}

		function configure(customProps) {
			m_props = {
				install: true,
				parentTag: "body",
				closeButton: true,
				closeText: "close",
				theme: "default",
				tag: "default",
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "dialog" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "dialog" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.dialog = (props) => new ui.class.Dialog(props);

customElements.define("mambo-dialog", ui.class.Dialog);
