ui.class.Dialog = class Dialog extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		let m_props;

		// HTML tag variables
		let m_parentTag;
		let m_dialogHdrTag;
		let m_dialogBodyTag;

		// Configure public methods
		this.close = closeDialog;
		this.getParentTag = () => self;
		this.getBodyTag = () => m_dialogBodyTag;
		this.getHeaderTag = () => m_dialogHdrTag;
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
				m_dialogBodyTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
				const dialogHdrLeft = ui.d.createTag({ ...m_props.tags.headerLeft, class: m_props.css.headerLeft });

				if (m_props.closeButton) {
					installCloseButton(dialogHdrLeft);
				}

				const overlayHdrCenter = ui.d.createTag({ ...m_props.tags.headerCenter, class: m_props.css.headerCenter });

				if (m_props.title) {
					const h3Tag = ui.d.createTag({
						...m_props.tags.headerTitle,
						class: m_props.css.headerTitle,
						text: m_props.title,
					});
					overlayHdrCenter.appendChild(h3Tag);
				} else {
					overlayHdrCenter.appendChild(m_props.hdrHtml);
				}

				const overlayHdrRight = ui.d.createTag({ ...m_props.tags.headerRight, class: m_props.css.headerRight });
				m_dialogHdrTag = ui.d.createTag({ ...m_props.tags.header, class: m_props.css.header });
				m_dialogHdrTag.appendChild(dialogHdrLeft);
				m_dialogHdrTag.appendChild(overlayHdrCenter);
				m_dialogHdrTag.appendChild(overlayHdrRight);
				self.classList.add(m_props.css.self);
				self.appendChild(m_dialogHdrTag);
				self.appendChild(m_dialogBodyTag);
				resolve();
			});
		}

		function installCloseButton(headerLeftTag) {
			const btnConfig = {
				parentTag: headerLeftTag,
				text: m_props.closeText,
				css: {
					button: m_props.css.headerCloseButton,
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
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Dialog: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					parentTag: "body",
					closeButton: true,
					closeText: "close",
					theme: "default",
					tag: "default",
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "dialog" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "dialog" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.dialog = (props) => new ui.class.Dialog(props);
customElements.define("mambo-dialog", ui.class.Dialog);
