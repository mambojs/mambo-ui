function demoDragDrop(parentEle) {

    let config = {
        dropText: "Drop files here.",
        allowKind: ["text/plain"],
        fnDrop: handleDropEvent
    };

    new MamboDragDrop(parentEle, config);

    // Handle the drop event and process the data files
    // @param {object} dataTransfer Event from the drop event
    function handleDropEvent(context) {
        // Process the files data and model it for the grid
        console.table(context.dataTransfer.files);
    }

}