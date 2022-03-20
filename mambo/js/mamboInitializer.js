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
 *  File : MamboInitializer.js
 *******************************************/
// Do not change load order
const g_mamboDomJS = new DomJS();
const g_mamboObjMgr = new MamboObjectManager();
const g_mamboUtils = new MamboUtilities();
const g_mamboGraphics = new MamboGraphics();
const g_mamboDateManager = new MamboDateManager();
const g_mamboString = new MamboString();

// Mambo Default theme from mamboDefaultTheme.js
const g_mamboTheme = new MamboTheme(g_mamboDefaultTheme);



// Configure IPFS
/* Ipfs.create({ repo: 'sc-ipfs-' + Math.random() }).then((ipfsInstance) => {
    mamboObjManager.save(ipfsInstance, "ipfs");
}); */
