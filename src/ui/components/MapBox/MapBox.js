ui.class.Mapbox = class Mapbox extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		let m_parentTag;
		let m_containerTag;

		let m_props;
		let m_map;

		this.addPoints = addPoints;
		this.setup = setup;

		if (props) {
			setup(props);
		}

		async function setup(props) {
			checkMapboxLibraries();
			await configure(props);
			await ui.utils.installUIComponent({ self, m_parentTag, m_props });
			await setupDOM();
			await renderMap();
			await getUserLocation();
			setupComplete();
		}

		function setupDOM() {
			return new Promise((resolve) => {
				m_containerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
				self.classList.add(m_props.css.self);
				ui.d.append(self, m_containerTag);
				resolve();
			});
		}

		function getUserLocation() {
			return new Promise((resolve) => {
				navigator.geolocation.getCurrentPosition(
					(s) => {
						const lng = s.coords.longitude;
						const lat = s.coords.latitude;
						onMoveEnd(removeWait);
						jumpTo(lng, lat);
						addCurrentPositionMarked(lng, lat);
						resolve();
					},
					() => {
						geolocationError();
						resolve();
					}
				);
			});
		}

		function jumpTo(lng, lat) {
			m_map.jumpTo({
				center: [lng, lat],
				zoom: m_props.zoom,
			});
		}

		function geolocationError(e) {
			removeWait();
		}

		function renderMap() {
			return new Promise((resolve) => {
				m_map = new mapboxgl.Map({
					container: m_props.tags.container.attr.id,
					style: m_props.mapStyle,
					zoom: 0.01,
				});

				if (m_props.controls) {
					if (m_props.controls.fullscreen) {
						m_map.addControl(new mapboxgl.FullscreenControl(), m_props.controls.fullscreen.position || "top-right");
					}

					if (m_props.controls.navigation) {
						m_map.addControl(new mapboxgl.NavigationControl(), m_props.controls.navigation.position || "top-right");
					}

					if (m_props.controls.search) {
						m_map.addControl(
							new MapboxGeocoder({
								accessToken: mapboxgl.accessToken,
								mapboxgl: mapboxgl,
							}),
							m_props.controls.search.position || "top-left"
						);
					}
				}

				m_map.on("load", resolve);
			});
		}

		function addCurrentPositionMarked(lng, lat) {
			const point = ui.d.createTag({ ...m_props.tags.currentPoint, class: m_props.css.currentPoint });
			setMarker([{ lng, lat }], point);
		}

		function setMarker(arrCoords, marker) {
			arrCoords.forEach(({ lat, lng }) => {
				let config = marker || m_props.marker;
				new mapboxgl.Marker(config).setLngLat([lng, lat]).addTo(m_map);
			});
		}

		function onMoveEnd(done) {
			m_map.once("moveend", done);
		}

		function removeWait() {
			m_containerTag.classList.add(m_props.css.hidewait);
		}

		function addPoints(points) {
			setMarker(points);
		}

		function checkMapboxLibraries() {
			if (!window.mapboxgl) {
				throw "Please, add Mapbox GL JS library to document";
			}

			if (!window.MapboxGeocoder) {
				throw "Please, add Mapbox GL Geocoder library to document. See: 'https://github.com/mapbox/mapbox-gl-geocoder'";
			}
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Mapbox: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					marker: { color: "orange" },
					mapStyle: "mapbox://styles/mapbox/streets-v11",
					tag: "default",
					theme: "default",
					zoom: 16,
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				mapboxgl.accessToken = m_props.accessToken;
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "mapbox" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "mapbox" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.mapbox = (props) => new ui.class.Mapbox(props);
customElements.define("mambo-mapbox", ui.class.Mapbox);
