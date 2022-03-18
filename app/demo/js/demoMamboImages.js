function demoImages(parentEle) {

    const m_graphics = g_mamboGraphics;

    const images = m_graphics.getImages();
    const data = [];
    for (const name in images) {
        data.push({ name: name, image: images[name] });
    }

    let config = {
        data: data,
        layout: "tile",
        tileHTML: `<img src="{image}" alt="{name}" /><span>{name}</span>`
    };

    new MamboGrid(parentEle, config);
}