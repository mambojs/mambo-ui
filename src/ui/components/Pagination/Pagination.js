ui.class.Pagination = class Pagination extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		let m_props;
		let m_currentPage = 1;
		let m_totalPages;

		let m_parentTag;
		let m_paginationTag;
		let m_buttonsGroup;

		this.setup = setup;
		this.getCurrentPage = () => m_currentPage;
		this.setCurrentPage = setCurrentPage;

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
				m_paginationTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
				self.classList.add(m_props.css.self);
				self.appendChild(m_paginationTag);
				installPaginationButtons().then(resolve);
			});
		}

		function installPaginationButtons() {
			return new Promise((resolve) => {
				const buttonsConfig = createPaginationButtons();

				if (!m_buttonsGroup) {
					m_buttonsGroup = ui.buttonGroup({
						buttons: buttonsConfig,
						onClick: handlePageClick,
						parentTag: m_paginationTag,
						onComplete: (context) => {
							updateButtonSelected();
						},
					});
				} else {
					const buttons = m_buttonsGroup.getButtons();

					buttonsConfig.forEach((btnConfig, index) => {
						if (buttons[index]) {
							buttons[index].text(btnConfig.text);
							buttons[index].setId(btnConfig.id);
							buttons[index].enable(!btnConfig.disabled);
						}
					});
				}

				resolve();
			});
		}

		function createPaginationButtons() {
			m_totalPages = m_props.totalPages || 1;
			const buttons = [];

			if (m_totalPages > 7)
				buttons.push({
					id: "prev",
					text: m_props.previousButton.text,
					disabled: m_currentPage === 1,
					icon: m_props.previousButton.icon,
				});

			const addEllipsis = () => {
				buttons.push({
					id: "ellipsis",
					text: "...",
					disabled: false,
				});
			};

			const createNumberButton = (number) => ({
				id: number.toString(),
				text: number.toString(),
				disabled: false,
			});

			if (m_totalPages <= 7) {
				for (let i = 1; i <= m_totalPages; i++) {
					buttons.push(createNumberButton(i));
				}
			} else {
				buttons.push(createNumberButton(1));

				if (m_currentPage <= 3) {
					for (let i = 2; i <= 5; i++) {
						buttons.push(createNumberButton(i));
					}

					addEllipsis();
					buttons.push(createNumberButton(m_totalPages));
				} else if (m_currentPage >= m_totalPages - 3) {
					addEllipsis();

					for (let i = m_totalPages - 4; i <= m_totalPages; i++) {
						buttons.push(createNumberButton(i));
					}
				} else {
					addEllipsis();

					for (let i = m_currentPage - 1; i <= m_currentPage + 1; i++) {
						buttons.push(createNumberButton(i));
					}

					addEllipsis();
					buttons.push(createNumberButton(m_totalPages));
				}

				buttons.push({
					id: "next",
					text: m_props.nextButton.text,
					disabled: m_currentPage === m_totalPages,
					icon: m_props.nextButton.icon,
				});
			}

			return buttons;
		}

		async function handlePageClick(clickedBtn) {
			const btnId = clickedBtn.Button.getId();

			if (btnId === "ellipsis") {
				setCurrentPage(m_currentPage);

				return;
			}

			if (btnId === "prev" && m_currentPage > 1) {
				setCurrentPage(m_currentPage - 1);
			} else if (btnId === "next" && m_currentPage < m_totalPages) {
				setCurrentPage(m_currentPage + 1);
			} else if (btnId !== "prev" && btnId !== "next" && btnId !== "ellipsis") {
				setCurrentPage(parseInt(clickedBtn.Button.text()));
			}
		}

		async function setCurrentPage(page) {
			if (isNaN(page)) return;
			m_currentPage = page;
			await installPaginationButtons();

			const prevButton = m_buttonsGroup.getTag({ id: "prev" });
			const nextButton = m_buttonsGroup.getTag({ id: "next" });

			if (prevButton) prevButton.enable(m_currentPage !== 1);
			if (nextButton) nextButton.enable(m_currentPage !== m_totalPages);

			updateButtonSelected();

			if (m_props.onPageChange) {
				m_props.onPageChange({ Pagination: self });
			}
		}

		function updateButtonSelected() {
			m_buttonsGroup.deselect();
			const buttons = m_buttonsGroup.getButtons();
			const btn = buttons.find((btn) => btn.getTag().innerText === m_currentPage.toString());
			btn.select({ notTrigger: true });
		}

		function setupComplete() {
			if (m_props.onComplete) {
				m_props.onComplete({ Pagination: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					theme: "default",
					tag: "default",
					totalPages: 1,
					currentPage: 1,
					previousButton: {
						text: "previous",
					},
					nextButton: {
						text: "next",
					},
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_currentPage = m_props.currentPage;
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "pagination" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "pagination" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.pagination = (options) => new ui.class.Pagination(options);
customElements.define(ui.defaultTags.pagination.self.name, ui.class.Pagination);
