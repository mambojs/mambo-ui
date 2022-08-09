function installStoryboard() {
	const cevt = new CustomEvent("compiler-ready", {
		bubbles: true,
		cancelable: true,
		detail: {},
	});

	const demoui = {};
	demoui.html = "&nbsp;";
	demoui.components = [];
	const demoFiles = [
		{ alias: "button", name: "MamboButton" },
		{ alias: "button-group", name: "MamboButtonGroup" },
		{ alias: "calendar", name: "MamboCalendar" },
		{ alias: "checkbox-radio", name: "MamboCheckboxRadio" },
		{ alias: "checkbox-radio-group", name: "MamboCheckboxRadioGroup" },
		{ alias: "combobox", name: "MamboCombobox" },
		{ alias: "date-picker", name: "MamboDatePicker" },
		{ alias: "dialog", name: "MamboDialog" },
		{ alias: "drag-drop", name: "MamboDragDrop" },
		{ alias: "draggable", name: "MamboDraggable" },
		{ alias: "dropdown", name: "MamboDropdown" },
		{ alias: "file-chooser", name: "MamboFileChooser" },
		{ alias: "grid", name: "MamboGrid" },
		{ alias: "input", name: "MamboInput" },
		{ alias: "percentage", name: "MamboPercentage" },
		{ alias: "player", name: "MamboPlayer" },
		{ alias: "rating", name: "MamboRating" },
		{ alias: "slideout", name: "MamboSlideout" },
		{ alias: "slider", name: "MamboSlider" },
		{ alias: "switch", name: "MamboSwitch" },
		{ alias: "tab", name: "MamboTab" },
		{ alias: "time-picker", name: "MamboTimePicker" },
		{ alias: "tree-view", name: "MamboTreeView" },
	];

	const getModules = Promise.all(
		demoFiles.map(async ({ name, alias }) => {
			const demoContent = await getScript(`src/ui/${name}/demo/${alias}.js`);
			const mdContent = await getScript(`src/ui/${name}/demo/description.md`);
			demoui.components.push({
				alias,
				code: demoContent.code,
				component: `${name}.js`,
				custom: `demo-${alias}`,
				description: mdContent.fullcontent,
				name,
				script: demoContent.fullcontent,
			});
		})
	);

	getModules.then(() => {
		demoui.components.sort((a, b) => {
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
			return 0;
		});

		getHtml();
	});

	async function getHtml() {
		const html = await getScript(`src/demos/demos.html`);
		demoui.html = html.fullcontent;
		window.dispatchEvent(cevt);
	}

	async function getScript(path) {
		const file = await (await fetch(path)).text();

		const htmlEntities = (html) => {
			return html.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
				return "&#" + i.charCodeAt(0) + ";";
			});
		};

		const object = {
			content: "",
			fullcontent: file,
			code: null,
		};

		if (path.endsWith(".js")) {
			object.content = object.fullcontent.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, "$1");

			const codeList = object.fullcontent.match(/\/\/\:([\s\S]*?)\/\/\!/gm);

			if (null !== codeList) {
				object.code = codeList.map((code) => {
					return {
						comment: htmlEntities(code.match(/(?<=\/\/\:)(.*)/gm)[0].trim()),
						script: code.match(/(?<=\/\/\@)([\s\S]*?)(?=\/\/\!)/gm)[0],
					};
				});
			}
		}

		return object;
	}

	window.addEventListener("compiler-ready", () => {
		demoui.manager = new (function demoManager() {
			const OUTPUT_PATH = "/";
			const AREAS = ["area", "area-desc", "area-code"];
			const TYPES = ["script", "description", "code"];

			const ROUTE = {
				name: "UIHomeDemo",
				path: OUTPUT_PATH,
				action: () => {
					AREAS.forEach((area) => {
						clearArea(area);
					});
				},
			};

			setup();

			function setup() {
				createHTMLbase();
				showComponentsList(demoui.components);
				addRoutes(demoui.components);
			}

			function addRoutes(components) {
				let routes = components.map((component) => {
					return {
						name: component.name,
						path: `${OUTPUT_PATH}${component.name.toLowerCase()}`,
						action: () => {
							runComponent(component);
						},
					};
				});

				routes.push(ROUTE);

				router.routes(routes);
			}

			function applyCode(code, custom) {
				if (null !== code) {
					let area = document.getElementsByTagName(custom)[0];

					let printCodes = code.map((code) => {
						return `<h4>${code.comment}</h4><pre>${code.script}</pre>`;
					});

					area.innerHTML = printCodes.join("");
				}
			}

			function applyDescription(desc, custom, name) {
				let area = document.getElementsByTagName(custom)[0];
				area.innerHTML = desc;
			}

			function applyScript(script, custom) {
				eval(script);
			}

			function clearArea(area) {
				let element = document.getElementById(area);
				element.innerHTML = "";
			}

			function createHTMLbase() {
				const html = eval("`" + demoui.html + "`");
				let parser = new DOMParser().parseFromString(html, "text/html");
				document.querySelector(".web-content").prepend(parser.body.firstChild);

				createTabs("#main");
			}

			function createTabs(id) {
				let tabConfig = {
					parentTag: id,
					tabs: {
						buttons: [
							{
								text: "Que es Mambo UI?",
								area: AREAS[1],
								fnClick: (context) => {
									// You can declare individual event handlers for tab clicks
								},
							},
							{
								text: "Como lo uso?",
								area: AREAS[2],
							},
							{
								text: "Demos",
								area: AREAS[0],
							},
						],
						fnClick: (buttonContext) => {
							// You can declare a single event handler for all tab clicks
						},
					},
					fnTabReady: (contentTag, tab) => {
						const content = dom.createTag("div", {
							text: `This is content for Tab id: ${tab.id} name: ${tab.text}`,
							attr: { id: tab.area },
						});
						contentTag.appendChild(content);
					},
				};

				ui.tab(tabConfig);
			}

			function hidrateArea(object) {
				let area = document.getElementById(object.area);
				let customTag = document.createElement(object.id);

				clearArea(object.area);

				area.appendChild(customTag);

				switch (object.type) {
					case TYPES[0]:
						applyScript(object.component[object.type], object.id);
						break;

					case TYPES[1]:
						applyDescription(object.component[object.type], object.id, object.component.name);
						break;

					case TYPES[2]:
						applyCode(object.component[object.type], object.id);
						break;
				}
			}

			function runComponent(component) {
				const options = [
					{ area: AREAS[0], component, id: component.custom, type: TYPES[0] },
					{
						area: AREAS[1],
						component,
						id: `${component.custom}-desc`,
						type: TYPES[1],
					},
					{
						area: AREAS[2],
						component,
						id: `${component.custom}-code`,
						type: TYPES[2],
					},
				];

				options.forEach((option) => {
					hidrateArea(option);
				});
			}

			function showComponentsList(components) {
				let sidebar = document.getElementById("sidebar");
				let list = document.createElement("ul");

				components.forEach((component) => {
					let item = document.createElement("li");
					item.innerText = component.name;
					item.onclick = () => {
						router.push({
							path: `${OUTPUT_PATH}${component.name.toLowerCase()}`,
						});
					};
					list.appendChild(item);
				});

				sidebar.appendChild(list);
			}
		})();
	});
}
