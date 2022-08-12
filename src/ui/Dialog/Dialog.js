ui.class.Dialog = class Dialog extends HTMLElement {
	constructor(props) {
		super();

		// Config default values
		const self = this;
		const m_utils = new ui.utils();
		const m_theme = ui.theme(ui.defaultTheme);
		const m_tags = ui.tagNames(ui.defaultTagNames);

		// HTML tag variables
		let m_parentTag;
		let m_overlayTag;
		let m_overlayHdrTag;
		let m_overlayBodyTag;

		let m_props;

		// Configure public methods
		this.close = closeDialog;
		this.getParentTag = () => m_overlayTag;
		this.install = installSelf;
		this.setup = setup;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			installDOM();
			installEventHandlers();
			finishSetup();
		}

		function installDOM() {
			m_overlayTag = dom.createTag(m_props.tag.parent, {
				class: m_props.css.parent,
			});

			m_overlayBodyTag = dom.createTag(m_props.tag.dialogBody, {
				class: m_props.css.dialogBody,
			});

			const overlayHdrLeft = dom.createTag("dialog-header-left", {
				class: m_props.css.dialogHdrLeft,
			});

			if (m_props.closeButton) {
				installCloseButton(overlayHdrLeft);
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

			m_overlayHdrTag = dom.createTag("dialog-header", {
				class: m_props.css.dialogHdr,
			});
			dom.append(m_overlayHdrTag, overlayHdrLeft);
			dom.append(m_overlayHdrTag, overlayHdrCenter);
			dom.append(m_overlayHdrTag, overlayHdrRight);

			dom.append(m_overlayTag, m_overlayHdrTag);
			dom.append(m_overlayTag, m_overlayBodyTag);

			// Determine where to install dialog
			self.appendChild(m_overlayTag);
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

		function installEventHandlers() {
			// Invoke call back when installation is completed
			if (m_props.fnReady) {
				m_props.fnReady({ dialog: self, dialogContentTag: m_overlayBodyTag });
			}
		}

		function closeDialog() {
			close();
		}

		function close() {
			dom.remove(m_overlayTag);
		}

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
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
			// Extend tag names names
			m_props.tags = m_utils.extend(
				true,
				m_tags.getTags({
					name: m_props.tag,
					component: "dialog",
				}),
				m_props.tags
			);
			// Extend CSS class names
			m_props.css = m_utils.extend(
				true,
				m_theme.getTheme({
					name: m_props.theme,
					component: "dialog",
				}),
				m_props.css
			);
		}
	}
};

ui.dialog = (parentTag, options, fnReady) => new ui.class.Dialog(parentTag, options, fnReady);

customElements.define("mambo-dialog", ui.class.Dialog);
