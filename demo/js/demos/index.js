"localhost:8002"===location.host&&(new EventSource("http://localhost:8010").onmessage=()=>location.reload()),window.demoui={},window.demoui.components=[{alias:"button",component:"MamboButton.js",custom:"demo-button",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",name:"MamboButton",script:"//: Test Code\n//@\nfunction demoButton(eleName) {\n    const config = {\n        parentTag: eleName,\n        id: 1,\n        text: \"Single button\",\n        fnClick: (context) => {\n            console.log(context)\n        }\n    };\n    new ui.button(config);\n}\n\ndemoButton('demo-button');\n//!",code:[{comment:"Test Code",script:"\nfunction demoButton(eleName) {\n    const config = {\n        parentTag: eleName,\n        id: 1,\n        text: \"Single button\",\n        fnClick: (context) => {\n            console.log(context)\n        }\n    };\n    new ui.button(config);\n}\n\ndemoButton('demo-button');\n"}]}],mambo.develop=!0;const OUTPUT_PATH="/demo",AREAS=["area","area-desc","area-code"],TYPES=["script","description","code"];window.demoui.manager={route:{name:"UIHomeDemo",path:OUTPUT_PATH,action:()=>{AREAS.forEach((e=>{demoui.manager.clearArea(e)}))}},createHTMLbase:function(){const e=`\n        <div id="app">\n            <div id="sidebar">\n                Lista de componentes\n            </div>\n            <div id="main">\n                <section>\n                    <h3>Descripcion</h3>\n                    <div id="${AREAS[1]}"></div>\n                </section>\n                <section>\n                    <h3>Demo</h3>\n                    <div id="${AREAS[0]}"></div>\n                    <h3>Codigo</h3>\n                    <div id="${AREAS[2]}"></div>\n                </section>\n            </div>\n        </div>\n        `;let n=(new DOMParser).parseFromString(e,"text/html");document.body.prepend(n.body.firstChild)},showComponentsList:e=>{let n=document.getElementById("sidebar"),o=document.createElement("ul");e.forEach((e=>{let n=document.createElement("li");n.innerText=e.name,n.onclick=()=>{tools.router.push({path:`${OUTPUT_PATH}/${e.name.toLowerCase()}`})},o.appendChild(n)})),n.appendChild(o)},runComponent:e=>{[{area:AREAS[0],component:e,id:e.custom,type:TYPES[0]},{area:AREAS[1],component:e,id:`${e.custom}-desc`,type:TYPES[1]},{area:AREAS[2],component:e,id:`${e.custom}-code`,type:TYPES[2]}].forEach((e=>{demoui.manager.hidrateArea(e)}))},hidrateArea:e=>{let n=document.getElementById(e.area),o=document.createElement("div");switch(o.id=e.id,demoui.manager.clearArea(e.area),n.appendChild(o),e.type){case TYPES[0]:demoui.manager.applyScript(e.component[e.type],e.id);break;case TYPES[1]:demoui.manager.applyDesc(e.component[e.type],e.id);break;case TYPES[2]:demoui.manager.applyCode(e.component[e.type],e.id)}},clearArea:e=>{document.getElementById(e).innerHTML=""},applyScript:(script,custom)=>{eval(script)},applyDesc:(e,n)=>{document.getElementById(n).innerHTML=e},applyCode:(e,n)=>{if(null!==e){let o=document.getElementById(n),t=e.map((e=>`<h4>${e.comment}</h4><pre>${e.script}</pre>`));o.innerHTML=t.join("")}},addRoutes:e=>{let n=e.map((e=>({name:e.name,path:`${OUTPUT_PATH}/${e.name.toLowerCase()}`,action:()=>{demoui.manager.runComponent(e)}})));n.push(demoui.manager.route),tools.router.routes(n)}},demoui.manager.createHTMLbase(),demoui.manager.showComponentsList(demoui.components),demoui.manager.addRoutes(demoui.components);
//# sourceMappingURL=index.js.map
