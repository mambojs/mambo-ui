ui.class.ComboboxNew = class ComboboxNew extends HTMLElement {
	constructor(props) {
		super();
	}
};

ui.combobox = (props) => new ui.class.ComboboxNew(props);
customElements.define("mambo-combobox", ui.class.ComboboxNew);
