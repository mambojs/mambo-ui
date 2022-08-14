ui.class.Combobox = class Combobox extends HTMLElement {
	constructor(props) {
		super();
	}
};

ui.combobox = (props) => new ui.class.Combobox(props);
customElements.define("mambo-combobox", ui.class.Combobox);
