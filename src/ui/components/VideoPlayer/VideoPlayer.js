ui.class.VideoPlayer = class VideoPlayer extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;

		let m_props;
		let m_player;

		// Configure public methods
		this.getPlayer = () => m_player;
		this.getPlayerTag = () => m_player.getTag();
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
				self.classList.add(m_props.css.self);
				m_props.player.parentTag = self;
				m_player = ui.player(m_props.player);
				resolve();
			});
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ VideoPlayer: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
					player: {
						attr: {
							controls: true,
						},
					},
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "videoPlayer" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "videoPlayer" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.videoPlayer = (props) => new ui.class.VideoPlayer(props);
customElements.define(ui.defaultTags.videoPlayer.self.name, ui.class.VideoPlayer);
