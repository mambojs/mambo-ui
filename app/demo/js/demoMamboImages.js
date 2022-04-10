function demoImages(parentEle) {

    const m_graphics = g_mamboGraphics;

    installImagesGrid();
    appendFetchedImage();

    function installImagesGrid() {
        const images = m_graphics.getImages();
        const data = [];
        for (const name in images) {
            data.push({ name: name, image: images[name] });
        }

        let config = {
            parentTag: parentEle,
            data: data,
            layout: "tile",
            tileHTML: `<img src="{image}" alt="{name}" /><span>{name}</span>`
        };

        new MamboGrid(config);
    }

    function appendFetchedImage() {
        getImageFromServer("app/images/cat1.png");
    }

    async function getImageFromServer(url) {
        try {
            let file = await g_API.getImage(url);
            const imgTag = g_domJS.createTag("img");
            imgTag.src = URL.createObjectURL(file);
            parentEle.appendChild(imgTag);
        }
        catch (xhr) {
            console.log(xhr.responseText);
        }
    }

}