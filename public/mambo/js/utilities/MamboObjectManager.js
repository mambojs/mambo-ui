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
 *  File : MamboObjectManager.js
 *******************************************/
function MamboObjectManager() {
    'use strict';

    const instanceName = `ScObjectManager-${getName()}`;
    window[instanceName] = {};

    this.get = getObject;
    this.save = saveObject;
    this.remove = removeObject;
    this.getLibrary = () => window[instanceName];
    this.clearLibrary = () => { window[instanceName] = {}; };

    function saveObject(object, name) {
        const objName = name ? name : object.constructor.name;
        window[instanceName][objName] = object;
    }

    function getObject(name) {
        return window[instanceName][name];
    }

    function removeObject(name) {
        delete window[instanceName][name];
    }

    function getName() {
        const chars = "abcdefghijklmnopqrstuvwxyz";
        const one = chars[Math.floor(Math.random() * chars.length)];
        const two = chars[Math.floor(Math.random() * chars.length)];
        const three = chars[Math.floor(Math.random() * chars.length)];
        const four = chars[Math.floor(Math.random() * chars.length)];
        const five = chars[Math.floor(Math.random() * chars.length)];
        return `${one}${two}${three}${four}${five}`;
    }

}