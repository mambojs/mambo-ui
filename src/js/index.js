// Instantiate global Object Manager and required Object instances
const tools = mamboTools();
const object = tools.object();
object.save(tools.utils(), "utils");
object.save(tools.string(), "string");
object.save(tools.history(), "history");
object.save(tools.router({ historyManager: object.get("history") }), "router");
object.save(tools.api(), "api");
const dom = domJS();

// Begin Storyboard development installation
installStoryboard();

const observer = new MutationObserver((mutationsList, observer) => {
	for (const mutation of mutationsList) {
		if (mutation.type === "childList") {
			mutation.addedNodes.forEach((node) => {
				if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toUpperCase() === "BUTTON") {
					const icon = node.querySelector("i");
					if (icon) {
						feather.replace();
					}
				}
			});
		}
	}
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
});
