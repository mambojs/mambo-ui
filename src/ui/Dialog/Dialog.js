ui.class.Dialog = class Dialog extends HTMLElement {
	constructor(parentTag, options, fnReady) {
		super();

		// Config default values
		const self = this;
		const m_utils = new ui.utils();

		// HTML tag variables
		let m_overlayTag;
		let m_overlayHdrTag;
		let m_overlayBodyTag;

		let m_config;

		// Configure public methods
		this.close = closeDialog;
		this.getParentTag = () => m_overlayTag;

		configure();

		// Begin setup
		setup();

		function setup() {
			installDialog();
		}

		function installDialog() {
			m_overlayTag = dom.createTag(m_config.tag.parent, {
				class: m_config.css.parent,
			});
			m_overlayBodyTag = dom.createTag(m_config.tag.dialogBody, {
				class: m_config.css.dialogBody,
			});

			const overlayHdrLeft = dom.createTag("dialog-header-left", {
				class: m_config.css.dialogHdrLeft,
			});

			if (m_config.closeButton) {
				installCloseButton(overlayHdrLeft);
			}

			const overlayHdrCenter = dom.createTag("dialog-header-center", {
				class: m_config.css.dialogHdrCenter,
			});

			if (m_config.title) {
				const h3Tag = dom.createTag("h3", {
					class: m_config.css.hdrTitle,
					text: m_config.title,
				});
				dom.append(overlayHdrCenter, h3Tag);
			} else {
				dom.append(overlayHdrCenter, m_config.hdrHtml);
			}

			const overlayHdrRight = dom.createTag("dialog-header-right", {
				class: m_config.css.dialogHdrRight,
			});

			m_overlayHdrTag = dom.createTag("dialog-header", {
				class: m_config.css.dialogHdr,
			});
			dom.append(m_overlayHdrTag, overlayHdrLeft);
			dom.append(m_overlayHdrTag, overlayHdrCenter);
			dom.append(m_overlayHdrTag, overlayHdrRight);

			dom.append(m_overlayTag, m_overlayHdrTag);
			dom.append(m_overlayTag, m_overlayBodyTag);

			// Determine where to install dialog
			dom.append(parentTag ? parentTag : "body", m_overlayTag);

			// Continue to install all event handlers
			installEventHandlers();
		}

		function installCloseButton(headerLeftTag) {
			const btnConfig = {
				parentTag: headerLeftTag,
				text: m_config.closeText,
				css: {
					button: m_config.css.hdrCloseBtn,
				},
				attr: {
					type: "button",
				},
				fnClick: () => {
					if (m_config.fnClose) {
						m_config.fnClose({ dialog: self });
					} else {
						close();
					}
				},
			};

			ui.button(btnConfig);
		}

		function installEventHandlers() {
			// Invoke call back when installation is completed
			if (fnReady) {
				fnReady({ dialog: self, dialogContentTag: m_overlayBodyTag });
			}
		}

		function closeDialog() {
			close();
		}

		function close() {
			dom.remove(m_overlayTag);
		}

		function configure() {
			m_config = {
				closeButton: true,
				closeText: "close",
				theme: "default",
				tag: "default",
			};

			// If options provided, override default config
			if (options) {
				m_config = m_utils.extend(true, m_config, options);
			}
		}
	}
};

ui.dialog = (parentTag, options, fnReady) => new ui.class.Dialog(parentTag, options, fnReady);

customElements.define("mambo-dialog", ui.class.Dialog);
