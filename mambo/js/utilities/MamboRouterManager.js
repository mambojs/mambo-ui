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
        setRoute();
    });

    let historyManager;
    let routesList = [];

    this.current = {
        state: history.state,
        name: "",
        path: "",
        from: {
            name: "",
            path: ""
        },
        to: {
            name: "",
            path: ""
        },
        params: {},
        query: ""
    }
    
    this.hash = "";
    this.push = routerPush;
    this.replace = routerReplace;
    this.go = routerGo;
    this.back = routerBack;
    this.next = routerForward;
    this.routes = getSetRoutes;

    function getSetRoutes(args) {

        // Get

        if (!args) {
            return routesList
        }

        // Set
        // Check objects format, Check duplicated name or path, Add routes to list, Init router/history

        if (Array.isArray(args) && args.length) {

            if(!checkRoutesFormat(args)) {
                return;
            }

            if(!checkRoutesDuplicated(args)) {
                return;
            }  

            routesList = args

            init()

            return;
            
        }
        
        // Developer mode

        if (mambo.$develop) {
            alert(`MamboRouter: .routes() expected an Array object`)
        }
        
    }

    function checkRoutesFormat(args) {

        const isValidFormat = args.every( obj => 
                                            obj.constructor.name === 'Object'
                                            && 'path' in obj
                                            && typeof obj.path === 'string' 
                                            && obj.path.trim() !== '' 
                                        )

        if(!isValidFormat) {

            if (mambo.$develop) {
                alert(`MamboRouter: .routes() expected an object with valid path`)
            }

            return false

        }

        return true

    }

    function checkRoutesDuplicated(args) {

        const uniqueByName = [...new Map(args.map(item => [item['name'], item])).values()]
        const uniqueByPath = [...new Map(args.map(item => [item['path'], item])).values()]
        
        if ( uniqueByName.length < args.length || uniqueByPath.length < args.length ) {

            if (mambo.$develop) alert(`MamboRouter: .routes() no duplicate name or path parameter in route object`)

            return false

        }

        return true

    }

    function init() {

        const { matched, path } = matchedRouteBy({ path: location.pathname })

        if (matched) {
            historyManager =  new MamboHistoryManager(path)
        }

    }

    function routerPush(routeObject) {

        if (isValidRouteObject(routeObject, 'push')) {

            const { matched, path } = matchedRouteBy(routeObject)

            if (matched) {
                historyManager.pushState(path, "", path)
            }
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

    function isValidRouteObject(args, type) {

        // Check if .rutes() is empty, Check if args is Object

        if (!routesList.length) {

            if (mambo.$develop) {
                alert(`MamboRouter: .routes() is empty. Please, set a route`)
            }

            return false
        }

        if (args && args.constructor.name === 'Object') {
            
            // Allow path/name/params/query/hash, Only strings & object values

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

            if (isAllKeysValid) {
                return true
            } else {
                if (mambo.$develop) alert(`MamboRouter: ${wrongKeysValues} is not valid in ${type}(${JSON.stringify(args)})`)
                return  false
            }

        }

        if (mambo.$develop) alert(`MamboRouter: .${type}() expected a valid Object `)

        return false
        
    }

    function matchedRouteBy(routeObject) {

        const routeMatched = routesList.find( route => 
                                                route.path === routeObject.path 
                                                || route.path === routeObject.path + '/' 
                                                || route.name === routeObject.name
                                            )

        if (routeMatched) {
            return { matched: true, path: routeMatched.path }
        }

        if (mambo.$develop) alert(`MamboRouter: ${JSON.stringify(routeObject)} route do not exist`)

        return { matched: false }

    }

    function setRoute() {

        const currentRouteObject = routesList.find( route => route.path === history.state )

        updateCurrent(currentRouteObject);

        runAction()

    }

    function updateCurrent(currentRouteObject) {

        self.current = currentRouteObject

    }

    function runAction() {

        if(self.current.hasOwnProperty("action")) {

            if(self.current.action.constructor.name === "Function") {
                self.current.action()
            } else {

                if (mambo.$develop) {
                    alert(`MamboRouter: action should be a function `)
                }

            }

        }

    }

}

