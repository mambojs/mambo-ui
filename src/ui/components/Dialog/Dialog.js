ui.class.Dialog = class Dialog extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_button;
		let m_containerTag;
		let m_dialogHdrTag;
		let m_dialogBodyTag;
		let m_dialogFtrTag;
		let m_parentTag;
		let m_props;

		// Configure public methods
		this.close = closeDialog;
		this.button = () => m_button;
		this.getParentTag = () => self;
		this.getContainerTag = () => m_containerTag;
		this.getBodyTag = () => m_dialogBodyTag;
		this.getHeaderTag = () => m_dialogHdrTag;
		this.getFooterTag = () => m_dialogFtrTag;
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

				m_containerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
				self.appendChild(m_containerTag);

				m_dialogBodyTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
				const dialogHdrLeft = ui.d.createTag({ ...m_props.tags.headerLeft, class: m_props.css.headerLeft });

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
				installCloseButton();
				m_dialogHdrTag = ui.d.createTag({ ...m_props.tags.header, class: m_props.css.header });
				m_dialogHdrTag.appendChild(dialogHdrLeft);
				m_dialogHdrTag.appendChild(overlayHdrCenter);
				m_dialogHdrTag.appendChild(overlayHdrRight);
				m_dialogFtrTag = ui.d.createTag({ ...m_props.tags.footer, class: m_props.css.footer });
				self.classList.add(m_props.css.self);
				m_containerTag.appendChild(m_dialogHdrTag);
				m_containerTag.appendChild(m_dialogBodyTag);
				m_containerTag.appendChild(m_dialogFtrTag);
				resolve();
			});
		}

		function installCloseButton() {

			let propCss = m_props.css.button;

			if (m_props.closeButtonLeft) {
				m_props.closeButton = false;
				propCss = m_props.css.buttonLeft;
			}

			if (m_props.closeButton || m_props.closeButtonLeft) {
				const btnConfig = {
					...m_props.button,
					css: propCss,
					parentTag: m_containerTag,
					attr: {
						type: "button",
					},
					fnClick: (context) => {
						closeDialog();
						if (m_props.fnClose) {
							m_props.fnClose({
								Dialog: self,
								Button: context.Button,
								ev: context.ev
							});
						}
					},
				};
				m_button = ui.button(btnConfig);
			}
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
					button: {text: ""},
					closeText: "",
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
customElements.define(ui.defaultTags.dialog.self.name, ui.class.Dialog);
