ui.class.ButtonGroup = class ButtonGroup extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = new ui.utils();
		const m_theme = ui.theme(ui.defaultTheme);
		const m_tags = ui.tagNames(ui.defaultTagNames);

		// HTML tag variables
		const m_buttonsList = [];
		let m_buttonGroupTag;
		let m_parentTag;

		let m_props;
		let m_selectedButtonTag;

		// Public methods
		this.deselect = deselect;
		this.destroy = destroyButtonGroup;
		this.getConfigById = getConfigById;
		this.getParentTag = () => m_buttonGroupTag;
		this.getSelected = getSelected;
		this.getTag = getButtonTagById;
		this.install = installSelf;
		this.select = selectBtn;
		this.setup = setup;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			installDOM();
			finishSetup();
		}

		function installDOM() {
			m_buttonGroupTag = dom.createTag(m_props.tag.parent, {
				class: m_props.css.parent,
			});

			self.appendChild(m_buttonGroupTag);
			// Loop through all the buttons
			if (m_props.buttons) {
				m_props.buttons.forEach(installButton);
			}
		}

		function deselect() {
			deselectBtns();
		}

		function deselectBtns() {
			m_buttonsList.forEach((button) => {
				button.deselect();
			});
			m_selectedButtonTag = null;
		}

		function installButton(button) {
			button.css = button.css ? m_utils.extend(true, m_props.css, button.css) : m_props.css;
			button.fnGroupClick = m_props.fnGroupClick;
			button.parentTag = m_buttonGroupTag;
			m_buttonsList.push(ui.button(button));
		}

		function handleGroupBtnClick(context) {
			// Deselect all buttons
			deselectBtns();

			// If same callback for all buttons
			if (m_props.fnClick) {
				m_props.fnClick(context);
			}

			// Select clicked button
			context.button.select({ notTrigger: true });
			m_selectedButtonTag = context.button;
		}

		function selectBtn(context = {}) {
			let buttonTag = getTag(context.id);
			if (buttonTag) {
				buttonTag.select(context);
				m_selectedButtonTag = buttonTag;
			}
		}

		function getButtonTagById(context = {}) {
			return getTag(context.id);
		}

		function getTag(id) {
			return m_buttonsList.find((btn) => btn.getId() === id);
		}

		function getConfigById(context = {}) {
			return m_buttonsList.find((btn) => btn.getConfig().id === context.id);
		}

		function getSelected() {
			return m_selectedButtonTag;
		}

		function destroyButtonGroup() {
			dom.remove(m_buttonGroupTag);
		}

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
			if (m_props.fnComplete) m_props.fnComplete({ ButtonGroup: self });
		}

		function installSelf(parentTag, prepend) {
			m_parentTag = parentTag ? parentTag : m_parentTag;
			m_parentTag = dom.getTag(m_parentTag);
			dom.append(m_parentTag, self, prepend);
		}

		function configure(customProps) {
			m_props = {
				install: true,
				tag: "default",
				theme: "default",
				fnGroupClick: handleGroupBtnClick,
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
					component: "buttonGroup",
				}),
				m_props.tags
			);
			// Extend CSS class names
			m_props.css = m_utils.extend(
				true,
				m_theme.getTheme({
					name: m_props.theme,
					component: "buttonGroup",
				}),
				m_props.css
			);
		}
	}
};

ui.buttonGroup = (parentTag, options) => new ui.class.ButtonGroup(parentTag, options);

customElements.define("mambo-button-group", ui.class.ButtonGroup);
