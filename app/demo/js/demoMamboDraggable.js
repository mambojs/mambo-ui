function demoDraggable(parentEle) {


    withContainer();
    withoutContainer();
    horizontal();
    vertical();
    step();

    function withContainer() {
        let container = g_domJS.createTag("div", { class: "draggable-container" });
        g_domJS.append(parentEle, container);

        const config = {
            css: {
                draggable: "draggable-element"
            },
            tag: {
                draggable: "draggable-element"
            },
            fnDragStart: (context) => {
                console.log("Drag started");
            },
            fnDragEnd: (context) => {
                console.log("Drag ended");
            },
            fnDrag: (context) => {
                console.log("Dragging");
            }
        };

        let draggable = new MamboDraggable(container, container, config);
        let text = g_domJS.createTag("span", { class: "draggable-text", text: "Drag Inside" });
        g_domJS.append(draggable.getParentTag(), text);
    }

    function withoutContainer() {
        let container = g_domJS.createTag("div", { class: "draggable-container" });
        g_domJS.append(parentEle, container);

        const config = {
            css: {
                draggable: "draggable-element"
            },
            tag: {
                draggable: "draggable-element"
            }
        };

        let draggable = new MamboDraggable(container, null, config);
        let text = g_domJS.createTag("span", { class: "draggable-text", text: "Drag Everywhere" });
        g_domJS.append(draggable.getParentTag(), text);
    }

    function horizontal() {
        let container = g_domJS.createTag("div", { class: "draggable-container" });
        g_domJS.append(parentEle, container);

        const config = {
            css: {
                draggable: "draggable-element"
            },
            tag: {
                draggable: "draggable-element"
            },
            axis: "x"
        };

        let draggable = new MamboDraggable(container, container, config);
        let text = g_domJS.createTag("span", { class: "draggable-text", text: "Drag Horizontally" });
        g_domJS.append(draggable.getParentTag(), text);
    }

    function vertical() {
        let container = g_domJS.createTag("div", { class: "draggable-container" });
        g_domJS.append(parentEle, container);

        const config = {
            css: {
                draggable: "draggable-element"
            },
            tag: {
                draggable: "draggable-element"
            },
            axis: "y"
        };

        let draggable = new MamboDraggable(container, container, config);
        let text = g_domJS.createTag("span", { class: "draggable-text", text: "Drag Vertically" });
        g_domJS.append(draggable.getParentTag(), text);
    }

    function step() {
        let container = g_domJS.createTag("div", { class: "draggable-container" });
        g_domJS.append(parentEle, container);

        const config = {
            css: {
                draggable: "draggable-element"
            },
            tag: {
                draggable: "draggable-element"
            },
            grid: [30, 30]
        };

        let draggable = new MamboDraggable(container, container, config);
        let text = g_domJS.createTag("span", { class: "draggable-text", text: "Drag Steps" });
        g_domJS.append(draggable.getParentTag(), text);
    }
}