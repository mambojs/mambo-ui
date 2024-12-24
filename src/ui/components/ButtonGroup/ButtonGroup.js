ui.class.ButtonGroup = class ButtonGroup extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		const m_buttonsList = [];
		let m_parentTag;

		let m_props;
		let m_selectedButtonTag;

		// Public methods
		this.deselect = deselect;
		this.destroy = destroyButtonGroup;
		this.getConfigById = getConfigById;
		this.getParentTag = () => self;
		this.getSelected = getSelected;
		this.getTag = getButtonTagById;
		this.select = selectBtn;
		this.setup = setup;
		this.getButtons = () => m_buttonsList;

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
				self.classList.add(m_props.css.self);
				const buttonPromises = [];

				m_props.buttons.forEach((button, index) => {
					button.id = button.id ? button.id : index;
					buttonPromises.push(installButton(button));
				});

				Promise.all(buttonPromises).then(resolve);
			});
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
			return new Promise((resolve) => {
				button.css = ui.utils.extend(true, m_props.css.button, button.css);
				button.onGroupClick = m_props.onGroupClick;
				button.parentTag = self;
				m_buttonsList.push(ui.button(button));
				resolve();
			});
		}

		function handleGroupBtnClick(context) {
			// Deselect all buttons
			deselectBtns();

			// If same callback for all buttons
			if (m_props.onClick) {
				m_props.onClick(context);
			}

			// Select clicked button
			context.Button.select({ notTrigger: true });
			m_selectedButtonTag = context.Button;
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
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.onComplete) {
				m_props.onComplete({ ButtonGroup: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					buttons: [],
					tag: "default",
					theme: "default",
					onGroupClick: handleGroupBtnClick,
				};

				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "buttonGroup" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.buttonGroup = (props) => new ui.class.ButtonGroup(props);
customElements.define(ui.defaultTags.buttonGroup.self.name, ui.class.ButtonGroup);
