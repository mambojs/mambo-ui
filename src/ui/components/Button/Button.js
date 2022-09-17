ui.class.Button = class Button extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_imageList = [];

		let m_parentTag;
		let m_props;
		let m_buttonTag;
		let m_text = "";
		let m_enable = true;

		this.deselect = deselectBtn;
		this.enable = enable;
		this.getConfig = () => m_props;
		this.getId = () => m_props.id;
		this.getImageTagById = getImageTagById;
		this.getParentTag = () => m_parentTag;
		this.getTag = () => m_buttonTag;
		this.text = text;
		this.select = handleExternalSelect;
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
				const tagConfig = { ...m_props.tags.button };
				tagConfig.class = m_props.css.button;
				tagConfig.text = m_props.text;
				tagConfig.event = {
					click: handleClick,
					mouseenter: () => {
						mouseEnterOverButton();
						mouseEnterOverImage();
					},
					mouseleave: () => {
						mouseLeaveOverButton();
						mouseLeaveOverImage();
					},
				};

				m_buttonTag = ui.d.createTag(tagConfig);

				if (m_props.img) {
					insertGraphic(m_props.img);
				}

				self.classList.add(m_props.css.self);
				self.appendChild(m_buttonTag);
				setEnable();
				resolve();
			});
		}

		function insertGraphic() {
			//checking if the img is an array
			if (Array.isArray(m_props.img)) {
				m_props.img.forEach((img) => {
					addImg(img);
				});
			} else {
				addImg(m_props.img);
			}

			function addImg(img) {
				img.css = img.css ? img.css : m_props.css.img;
				const tagConfig = {
					class: img.css,
					prop: img.prop,
					attr: img.attr,
				};
				let imgTag = ui.d.createTag("img", tagConfig);
				m_imageList.push(imgTag);
				m_buttonTag.appendChild(imgTag);
			}
		}

		function getImageTagById(id) {
			return m_imageList.find((img) => img.id === id);
		}

		function handleClick(ev) {
			if (m_enable) {
				selectBtn();

				if (m_props.preventDefault) {
					ev.preventDefault();
				}

				if (m_props.stopPropagation) {
					ev.stopPropagation();
				}

				// Invoke callback for each button
				if (m_props.fnClick) {
					m_props.fnClick({
						Button: self,
						ev: ev,
					});
				}

				// Invoke callback for group
				if (m_props.fnGroupClick) {
					m_props.fnGroupClick({
						Button: self,
						ev: ev,
					});
				}
			}
		}

		function mouseEnterOverImage() {
			if (m_props.img && Array.isArray(m_props.img)) {
				m_props.img.forEach((img, i) => {
					if (img.hover) {
						setSrcAttr(m_imageList[i], img.hover);
					}
				});
			} else if (m_props.img && m_props.img.hover) {
				ui.d.setAttr(m_imageList[0], { src: m_props.img.hover });
			}
		}

		function mouseLeaveOverImage() {
			if (m_props.img && Array.isArray(m_props.img)) {
				m_props.img.forEach((img, i) => {
					if (img.hover) {
						setSrcAttr(m_imageList[i], img.attr.src);
					}
				});
			} else if (m_props.img && m_props.img.hover) {
				ui.d.setAttr(m_imageList[0], { src: m_props.img.attr.src });
			}
		}

		function mouseEnterOverButton() {
			if (!ui.d.hasClass(m_buttonTag, m_props.css.selected)) {
				m_buttonTag.classList.add(m_props.css.hover);
			}
		}

		function mouseLeaveOverButton() {
			m_buttonTag.classList.remove(m_props.css.hover);
		}

		function setSrcAttr(tag, src) {
			ui.d.setAttr(tag, { src: src });
		}

		function handleExternalSelect(context) {
			if (m_enable) {
				if (context.notTrigger) {
					selectBtn();
				} else {
					m_buttonTag.click();
				}
			}
		}

		function selectBtn() {
			m_buttonTag.classList.add(m_props.css.selected);
		}

		function deselectBtn() {
			m_buttonTag.classList.remove(m_props.css.selected);
		}

		function text(text) {
			if (!text) {
				return m_text;
			} else {
				m_buttonTag.innerText = text;
				m_text = text;
			}
		}

		function enable(enable) {
			m_enable = enable;
			setEnable();
		}

		function setEnable() {
			m_buttonTag.classList.toggle(m_props.css.disabled, !m_enable);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Button: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					enable: true,
					preventDefault: true,
					stopPropagation: true,
					text: "Button",
					tag: "default",
					theme: "default",
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "button" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "button" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				m_text = m_props.text;
				m_enable = m_props.enable;
				resolve();
			});
		}
	}
};

ui.button = (props) => new ui.class.Button(props);
customElements.define("mambo-button", ui.class.Button);
