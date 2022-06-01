//: Draggable
//@
demoDraggable("demo-draggable")

function demoDraggable(parentEle) {


    withContainer();
    withoutContainer();
    horizontal();
    vertical();
    step();

    function withContainer() {
        let container = dom.createTag("div", { class: "draggable-container" });
        dom.append(parentEle, container);

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

        let draggable = new ui.draggable(container, container, config);
        let text = dom.createTag("span", { class: "draggable-text", text: "Drag Inside" });
        dom.append(draggable.getParentTag(), text);
    }

    function withoutContainer() {
        let container = dom.createTag("div", { class: "draggable-container" });
        dom.append(parentEle, container);

        const config = {
            css: {
                draggable: "draggable-element"
            },
            tag: {
                draggable: "draggable-element"
            }
        };

        let draggable = new ui.draggable(container, null, config);
        let text = dom.createTag("span", { class: "draggable-text", text: "Drag Everywhere" });
        dom.append(draggable.getParentTag(), text);
    }

    function horizontal() {
        let container = dom.createTag("div", { class: "draggable-container" });
        dom.append(parentEle, container);

        const config = {
            css: {
                draggable: "draggable-element"
            },
            tag: {
                draggable: "draggable-element"
            },
            axis: "x"
        };

        let draggable = new ui.draggable(container, container, config);
        let text = dom.createTag("span", { class: "draggable-text", text: "Drag Horizontally" });
        dom.append(draggable.getParentTag(), text);
    }

    function vertical() {
        let container = dom.createTag("div", { class: "draggable-container" });
        dom.append(parentEle, container);

        const config = {
            css: {
                draggable: "draggable-element"
            },
            tag: {
                draggable: "draggable-element"
            },
            axis: "y"
        };

        let draggable = new ui.draggable(container, container, config);
        let text = dom.createTag("span", { class: "draggable-text", text: "Drag Vertically" });
        dom.append(draggable.getParentTag(), text);
    }

    function step() {
        let container = dom.createTag("div", { class: "draggable-container" });
        dom.append(parentEle, container);

        const config = {
            css: {
                draggable: "draggable-element"
            },
            tag: {
                draggable: "draggable-element"
            },
            grid: [30, 30]
        };

        let draggable = new ui.draggable(container, container, config);
        let text = dom.createTag("span", { class: "draggable-text", text: "Drag Steps" });
        dom.append(draggable.getParentTag(), text);
    }
}
//!