function storyMapBox(selectedStory) {
	const token = "pk.eyJ1Ijoic2NvdHRpYWxlamFuZHJvIiwiYSI6ImNsNWJxNGo1YzAxOXUzZHE5b2k1OWxhZ3AifQ.O39Uy9OX7tjnNGJxAnEoiw";

	sendPointsToMap();

	function userPositionMark() {
		const config = {
			accessToken: token,
			parentTag: selectedStory.parentTag,
			autoLocation: true,
			tags: {
				container: {
					attr: {
						id: "simplemap",
					},
				},
			},
		};
		ui.mapbox(config);
	}

	function sendPointsToMap() {
		const config = {
			accessToken: token,
			controls: {
				fullscreen: true,
				navigation: true,
				search: true,
			},
			marker: { color: "#E50087" },
			loadingMessage: "Cargando mapa...",
			parentTag: selectedStory.parentTag,
			tags: {
				container: {
					attr: {
						id: "searcheventsmap",
					},
				},
			},
			onComplete: (component) => {
				addPoints(component);
			},
		};
		ui.mapbox(config);

		function addPoints(component) {
			const pointsArr = [
				{
					lng: -58.485783,
					lat: -34.576503,
				},
				{
					lng: -58.493848,
					lat: -34.602807,
				},
				{
					lng: -58.498737,
					lat: -34.584316,
				},
				{
					lng: -58.476967,
					lat: -34.569271,
				},
			];
			component.Mapbox.addPoints(pointsArr);
		}
	}
}
