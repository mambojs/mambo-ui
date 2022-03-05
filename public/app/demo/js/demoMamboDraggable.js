function demoDraggable(parentEle) {


    withContainer();
    withoutContainer();
    horizontal();
    vertical();
    step();

    function withContainer() {
        let container = domJS.createTag("div", { class: "draggable-container" });
        domJS.append(parentEle, container);

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
        let text = domJS.createTag("span", { class: "draggable-text", text: "Drag Inside" });
        domJS.append(draggable.getParentTag(), text);
    }

    function withoutContainer() {
        let container = domJS.createTag("div", { class: "draggable-container" });
        domJS.append(parentEle, container);

        const config = {
            css: {
                draggable: "draggable-element"
            },
            tag: {
                draggable: "draggable-element"
            }
        };

        let draggable = new MamboDraggable(container, null, config);
        let text = domJS.createTag("span", { class: "draggable-text", text: "Drag Everywhere" });
        domJS.append(draggable.getParentTag(), text);
    }

    function horizontal() {
        let container = domJS.createTag("div", { class: "draggable-container" });
        domJS.append(parentEle, container);

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
        let text = domJS.createTag("span", { class: "draggable-text", text: "Drag Horizontally" });
        domJS.append(draggable.getParentTag(), text);
    }

    function vertical() {
        let container = domJS.createTag("div", { class: "draggable-container" });
        domJS.append(parentEle, container);

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
        let text = domJS.createTag("span", { class: "draggable-text", text: "Drag Vertically" });
        domJS.append(draggable.getParentTag(), text);
    }

    function step() {
        let container = domJS.createTag("div", { class: "draggable-container" });
        domJS.append(parentEle, container);

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
        let text = domJS.createTag("span", { class: "draggable-text", text: "Drag Steps" });
        domJS.append(draggable.getParentTag(), text);
    }
}