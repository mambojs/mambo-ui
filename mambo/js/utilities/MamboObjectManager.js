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

class MamboObjectManager {
    constructor(){
       // Object library
        this.store = {};
          
    }
       get(name){
       return this.store[name];
       } 
   
       save(){
           this.saveObject();
       } 
       remove(name){
            delete this.store[name];
       }
       getLibrary(){
           return this.store;
       } 
       clearLibrary(){
           this.store = {};
       }  
   
       saveObject(object, name) {
           const objName = name ? name : object.constructor.name;
           store[objName] = object;
       }
   }
