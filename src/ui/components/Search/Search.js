ui.class.Search = class Search extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_inputContainer;
		let m_input;
		let m_dropdownWrapperTag;
		let m_dropdown;
		let m_listbox;
		let m_searchButton;

		let m_props;
		let m_value = "";

		// Configure public methods
		this.destroy = destroySearch;
		this.setup = setup;
		this.suggest = suggest;

		if (props) {
			setup(props);
		}

		async function setup(props) {
			await configure(props);
			await ui.utils.installUIComponent({ self, m_parentTag, m_props });
			await setupDOM();
			await setupInput();
			await setupButton();
			await setupDropdown();
			setupComplete();
		}

		async function setupDOM() {
			return new Promise((resolve) => {
				m_inputContainer = ui.d.createTag({ ...m_props.tags.inputContainer, class: m_props.css.inputContainer });
				self.classList.add(m_props.css.self);
				self.appendChild(m_inputContainer);
				resolve();
			});
		}

		function setupInput() {
			return new Promise((resolve) => {
				let input = ui.utils.extend(true, {}, m_props.input);
				input.css = ui.utils.extend(true, m_props.css.input, input.css);
				input.parentTag = m_inputContainer;
				input.fnClear = (context) => {
					m_value = "";
					if (m_dropdown) m_dropdown.close();
				}
				input.fnKeyup = (context) => {
					if (m_props.input?.fnKeyup) {
						m_value = context.value;

						if (m_value.length >= m_props.firedIn) {
							m_props.input.fnKeyup(m_value);
						} else {
							if (m_dropdown) m_dropdown.close();
						}
					}
				}

				m_input = ui.input(input);
				resolve();
			});
		}

		function setupButton() {
			return new Promise((resolve) => {
				let button = ui.utils.extend(true, {}, m_props.button);
				button.css = ui.utils.extend(true, m_props.css.searchButton, button.css);
				button.parentTag = self;
				button.fnComplete = resolve;

				button.fnClick = (context) => {
					if (m_props.button?.fnClick && m_value?.length >= m_props.firedIn) {
						m_props.button.fnClick(m_value);
					}
				}

				m_searchButton = ui.button(button);
			});
		}

		function setupDropdown() {
			return new Promise((resolve) => {
				if (m_props.suggest) {
					m_dropdownWrapperTag = ui.d.createTag({ ...m_props.tags.wrapper, class: m_props.css.wrapper });
					self.appendChild(m_dropdownWrapperTag);
					let dropdown = ui.utils.extend(true, {}, m_props.dropdown);
					dropdown.css = ui.utils.extend(true, m_props.css.dropdown, dropdown.css);

					dropdown.fnComplete = (context) => {
						installListbox(context.Dropdown);
					}

					dropdown.disableButton = true;
					dropdown.positionTag = m_input;
					dropdown.parentTag = m_dropdownWrapperTag;
					m_dropdown = ui.dropdown(dropdown);
				}
				resolve();
			});
		}

		function installListbox(dropdown) {
			return new Promise((resolve) => {
				let listbox = ui.utils.extend(true, {}, m_props.suggest);
				listbox.css = ui.utils.extend(true, m_props.css.listbox, listbox.css);
				let contentTag = dropdown.getContentTag();
				listbox.parentTag = contentTag;
				listbox.data = [];
				m_listbox = ui.listbox(listbox);
				resolve();
			});
		}

		function suggest(data) {
			if (m_props.suggest) {
				m_listbox.replaceList(data);
				m_dropdown.open();
			}
		}

		function destroySearch() {
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Search: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					firedIn: 1,
					tag: "default",
					theme: "default",
					input: {
						tags: {
							input: {
								prop: {
									placeholder: "Search"
								},
							},
						},
					},
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "search" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "search" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.search = (props) => new ui.class.Search(props);
customElements.define("mambo-search", ui.class.Search);
