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

    const self = this;

    window.addEventListener("locationchange", (ev) => {
        updateCurrent();
        getRoute();
    });

    let historyManager;
    let routesList = [];

    this.current = history.state
    this.name = "";
    this.path = "";
    this.from = {
        name: "",
        path: ""
    };
    this.to = {
        name: "",
        path: ""
    };
    this.params = {};
    this.query = "";
    this.hash = "";
    this.push = routerPush;
    this.replace = routerReplace;
    this.go = routerGo;
    this.back = routerBack;
    this.next = routerForward;
    this.routes = getSetRoutes;

    //getSetRoutes();

    function getSetRoutes(args) {
        // Get
        if (!args) {
            return routesList
        }
        // Set
        if (Array.isArray(args) && args.length) {
            // Check objects
            if(!args.every( obj => 
                obj.constructor.name === 'Object'
                && 'path' in obj
                && typeof obj.path === 'string' 
                && obj.path.trim() !== '' )) {
                    if (mambo.$develop) alert(`MamboRouter: .routes() expected an object with valid path`)
                    return
            }
            routesList = args
            historyManager =  new MamboHistoryManager()
        } else {
            if (mambo.$develop) alert(`MamboRouter: .routes() expected an Array object`)
        }
    }

    function routerPush(args) {
        const { status, value } = isValidRoute(args, 'push')
        if (status) {
            historyManager.pushState(value, "", value.path)
        } 
    }

    function routerReplace(args) {
        historyManager.replaceState(args, "", args.path)
    }

    function routerGo(args) {
        if (!Number.isInteger(args)) {
            if (mambo.$develop) alert(`MamboRouter: .go() expected a integer number`)
            return;
        }
        historyManager.go(args)
    }

    function routerBack() {
        historyManager.back()
    }

    function routerForward() {
        historyManager.forward()
    }

    function isValidRoute(args, type) {

        let status = false;
        let value = args;

        // Check if rutes() is empty
        if (!routesList.length) {
            if (mambo.$develop) alert(`MamboRouter: .routes() is empty. Please, set a route`)

            return { status, value };
        }

        // Check if args is String
        if (typeof args === 'string' && args.trim() !== '') {
            // Search route by name
            const route = routesList.find(route => route.name === args )
            if (route) {
                status = true;
                value = { path: route.path };
            } else {
                if (mambo.$develop) alert(`MamboRouter: .${type}("${args}") route do not exist`)
            }
            return { status, value }
        }

        // Check if args is Object
        if (args && args.constructor.name === 'Object') {
            // Search route by path
            // Allow path/name/params/query/hash
            // Only strings & object values
            const allowedKeysList = [
                { name:'path', type:'String' },
                { name:'name', type:'String' },
                { name:'params', type:'Object' },
                { name:'query', type:'String' },
                { name:'hash', type:'String' }
            ];
            let wrongKeysValues = [] 

            const isAllKeysValid = Object.entries(args)
                .every( arr => 
                    {
                        let allowed = allowedKeysList.filter( obj => 
                            obj.name === arr[0] && obj.type === arr[1].constructor.name )
                        
                        if (!allowed.length) {
                            wrongKeysValues.push( arr )
                        }
                        
                        return allowed.length > 0
                    }
                )

            if(isAllKeysValid) {
                return { status: true, value }
            } else {
                if (mambo.$develop) alert(`MamboRouter: ${wrongKeysValues} is not valid in ${type}(${JSON.stringify(args)})`)
                return { status, value }
            }

        }

        if (mambo.$develop) alert(`MamboRouter: .${type}() expected a valid String or Object `)

        return { status, value }
        
    }

    function getRoute() {
        let similarStatePath = "";

        if (history.state.path.slice(-1)==="/") {
            similarStatePath = history.state.path.slice(0,-1)
        } else {
            similarStatePath = history.state.path+"/"
        }

        const routeMatched = routesList.find( route => route.path === history.state.path || route.path === similarStatePath )

        if (!routeMatched) {
            if (mambo.$develop) alert(`MamboRouter: Location ${location.pathname} not found `)
            return;
        }

       runAction(routeMatched)
    }

    function updateCurrent() {
        self.current = history.state
    }

    function runAction(routeMatched) {
        if(routeMatched.hasOwnProperty("action")) {
            if(routeMatched.action.constructor.name === "Function") {
                routeMatched.action()
            } else {
                if (mambo.$develop) alert(`MamboRouter: action should be a function `)
            }
        }
    }

}

