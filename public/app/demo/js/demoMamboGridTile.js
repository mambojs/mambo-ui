function demoGridTile(parentEle) {

    const m_demoGraphics = new DemoGraphics();

    const data = [
        {
            employee: {
                name: "Ryder Short",
                position: "Application Development Director",
                phoneNumer: "+1-202-555-0112",
                email: "rshort@mail.com"
            }
        },
        {
            employee: {
                name: "Donovan Skinner",
                position: "Chief Technology Officer",
                phoneNumer: "+1-202-555-0112",
                email: "dskinner@mail.com"
            }
        },
        {
            employee: {
                name: "Emaan Alfaro",
                position: "Computer Operations Manager",
                phoneNumer: "+1-202-555-0112",
                email: "ealfaro@mail.com"
            }
        },
        {
            employee: {
                name: "Vickie Wright",
                position: "Computer Security Manager",
                phoneNumer: "+1-202-555-0112",
                email: "vwright@mail.com"
            }
        },
        {
            employee: {
                name: "Edgar Mcconnell",
                position: "Data Operations Director",
                phoneNumer: "+1-202-555-0112",
                email: "emcconnell@mail.com"
            }
        },
        {
            employee: {
                name: "Allan Barrera",
                position: "Data Processing Manager",
                phoneNumer: "+1-202-555-0112",
                email: "abarrera@mail.com"
            }
        },
        {
            employee: {
                name: "Malikah Brock",
                position: "Information Systems Director",
                phoneNumer: "+1-202-555-0112",
                email: "mbrock@mail.com"
            }
        },
        {
            employee: {
                name: "Anita Gross",
                position: "Information Technology Director",
                phoneNumer: "+1-202-555-0112",
                email: "agross@mail.com"
            }
        },
        {
            employee: {
                name: "Mathew Senior",
                position: "Internet Technology Manager",
                phoneNumer: "+1-202-555-0112",
                email: "msenior@mail.com"
            }
        },
        {
            employee: {
                name: "Eben Haynes",
                position: "MIS Director",
                phoneNumer: "+1-202-555-0112",
                email: "ehaynes@mail.com"
            }
        }
    ];

    let config = {
        data: data,
        layout: "tile",
        tileHTML: `<div class="profile">
                        <div class="photo"></div>
                        <div class="file-chooser"></div>
                    </div>
                    <div class="data">
                        <span>{employee.name}</span>
                        <span>{employee.position}</span>
                        <span>{employee.phoneNumer}</span>
                        <span>{employee.email}</span>
                    </div>`,
        fnPostTile: handleGridPostTile,
        fnComplete: (context) => {
            // Execute when grid installation is complete
        }
    };

    new MamboGrid(parentEle, config);

    function handleGridPostTile(context) {
        addPhoto(context.tileTag);
        addFileChooser(context.tileTag);
    }

    function addPhoto(tileEle) {
        let photoTag = g_domJS.getTag('.photo', tileEle);
        let svg = m_demoGraphics.getSVG("user");
        let children = [];
        svg.paths.forEach((path => {
            children.push({ name: "path", attrs: { d: path } });
        }));
        const tagConfig = {
            prop: svg.prop,
            attr: svg.attr,
            children
        };
        let newSVG = g_domJS.createSVGTag("svg", tagConfig);
        g_domJS.append(photoTag, newSVG);
    }

    function addFileChooser(tileEle) {
        let fileChooserTag = g_domJS.getTag('.file-chooser', tileEle);
        const config = {
            buttonOnly: true,
            textButton: "Upload Picture",
            attr: {
                accept: "image/*"
            }
        };
        new MamboFileChooser(fileChooserTag, config);
    }
}