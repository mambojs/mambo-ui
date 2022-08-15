ui.class.Button = class Button extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();
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
		this.install = installSelf;
		this.text = text;
		this.select = handleExternalSelect;
		this.setup = setup;

		if (props) setup(props);

		async function setup(props) {
			await configure(props);
			await setOptionValues();
			await setupDOM();
			loadDOM();
		}

		function setOptionValues() {
			return new Promise((resolve) => {
				m_text = m_props.text;
				m_enable = m_props.enable;
				resolve();
			});
		}

		function setupDOM() {
			return new Promise((resolve) => {
				const tagConfig = {
					class: m_props.css.button,
					prop: m_props.prop,
					attr: m_props.attr,
					text: m_props.text,
					event: {
						click: handleClick,
						mouseenter: () => {
							mouseEnterOverButton(m_buttonTag);
							mouseEnterOverImage();
						},
						mouseleave: () => {
							mouseLeaveOverButton(m_buttonTag);
							mouseLeaveOverImage();
						},
					},
				};

				m_buttonTag = dom.createTag(m_props.tags.button, tagConfig);

				if (m_props.img) {
					insertGraphic(m_props.img, addImg);
				}

				if (m_props.svg) {
					insertGraphic(m_props.svg, addSVG);
				}
				self.appendChild(m_buttonTag);
				setEnable(m_enable);
				resolve();
			});
		}

		function insertGraphic(graphic, func) {
			//checking if the img is an array
			if (Array.isArray(graphic)) {
				graphic.forEach((graphic) => {
					func(graphic);
				});
			} else {
				func(graphic);
			}
		}

		function addImg(img) {
			img.css = img.css ? img.css : m_props.css;
			const tagConfig = {
				class: img.css.img,
				prop: img.prop,
				attr: img.attr,
			};
			let imgTag = dom.createTag("img", tagConfig);
			m_imageList.push(imgTag);
			dom.append(m_buttonTag, imgTag);
		}

		function addSVG(svg) {
			svg.attr = m_utils.extend(true, svg.element.attr, svg.attr);
			let children = [];
			svg.element.paths.forEach((path) => {
				children.push({
					name: "path",
					attrs: { d: path },
				});
			});
			const tagConfig = {
				prop: svg.prop,
				attr: svg.attr,
				children,
			};
			let svgTag = dom.createSVGTag("svg", tagConfig);
			dom.append(m_buttonTag, svgTag);
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
				dom.setAttr(m_imageList[0], { src: m_props.img.hover });
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
				dom.setAttr(m_imageList[0], { src: m_props.img.attr.src });
			}
		}

		function mouseEnterOverButton(tag) {
			if (!dom.hasClass(tag, m_props.css.selected)) {
				dom.addClass(tag, m_props.css.hover);
			}
		}

		function mouseLeaveOverButton(tag) {
			dom.removeClass(tag, m_props.css.hover);
		}

		function setSrcAttr(tag, src) {
			dom.setAttr(tag, { src: src });
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
			dom.addClass(m_buttonTag, m_props.css.selected);
		}

		function deselectBtn() {
			dom.removeClass(m_buttonTag, m_props.css.selected);
		}

		function text(context) {
			if (!context) {
				return m_text;
			} else {
				m_buttonTag.innerText = context.text;
				m_text = context.text;
			}
		}

		function enable(enable) {
			if (!enable) {
				return m_enable;
			} else {
				setEnable(enable);
			}
		}

		function setEnable(enable) {
			m_enable = enable;
			m_enable ? dom.removeClass(m_buttonTag, m_props.css.disabled) : dom.addClass(m_buttonTag, m_props.css.disabled);
		}

		function loadDOM() {
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			if (m_props.fnComplete) m_props.fnComplete({ Button: self });
		}

		function installSelf(parentTag, prepend) {
			m_parentTag = parentTag ? parentTag : m_parentTag;
			m_parentTag = dom.getTag(m_parentTag);
			dom.append(m_parentTag, self, prepend);
		}

		function configure(customProps) {
			return new Promise((resolve) => {
				m_props = {
					enable: true,
					install: true,
					preventDefault: true,
					stopPropagation: true,
					tag: "default",
					theme: "default",
				};
				// If options provided, override default config
				if (customProps) m_props = m_utils.extend(true, m_props, customProps);
				// Resolve parent tag
				if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
				// Extend tag names
				const tags = m_tags.getTags({ name: m_props.tag, component: "button" });
				m_props.tags = m_utils.extend(true, tags, m_props.tags);
				// Extend css class names
				const css = m_theme.getTheme({ name: m_props.theme, component: "button" });
				m_props.css = m_utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.button = (props) => new ui.class.Button(props);

// Must ALWAYS define the new element as a Native Web Component
customElements.define("mambo-button", ui.class.Button);
