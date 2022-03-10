/******************************************
 *  Copyright 2022 Alejandro Sebastian Scotti, Scotti Corp.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.

 *  Author : Alejandro Scotti
 *  Created On : Sat Feb 26 2022
 *  File : MamboRouterManager.js
 *******************************************/
function MamboRouterManager() {

    const routes = [
        { name: "Home", path: "/" },
        { name: "Button", path: "/ui-components/button/" }
    ]

    window.addEventListener("locationchange", (ev) => {
        
        let similarStatePath = "";

        if (history.state.path.slice(-1)==="/") {
            similarStatePath = history.state.path.slice(0,-1)
        } else {
            similarStatePath = history.state.path+"/"
        }

        const routeMatched = routes.filter( route => route.path = history.state.path || similarStatePath )

        if (!routeMatched.length) {
            console.log(`%c=> MamboJS: %c Location ${location.pathname} not found `, 'background: #000; color: #fff;', 'background: #000; color: red;')
            return;
        }

        console.log(routeMatched[0])
    });

}

