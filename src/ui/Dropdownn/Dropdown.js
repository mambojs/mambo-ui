ui.class.Dropdown = class Dropdown extends HTMLElement {
	constructor(props) {
		super();
	}
};

ui.dropdown = (props) => new ui.class.Dropdown(props);
customElements.define("dropdown-combobox", ui.class.Dropdown);
