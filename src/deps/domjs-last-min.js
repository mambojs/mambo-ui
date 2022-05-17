(()=>{var s=(t,e)=>()=>(t&&(e=t(t=0)),e);var ee={};var P=s(()=>{window.dom.addClass=(t,e)=>{let n=dom.getTag(t);return dom.hasClass(n,e)||n.classList.add(e),dom}});var te={};var v=s(()=>{window.dom.append=(t,e,n)=>{let i=window.dom,r=i.utils;if(!e||!t){console.error("DOM.addChild(): missing parameter 'selector', 'content' or both.");return}if(typeof e=="string"&&(e=i.parse(e)),r.hasSingleID(t))return t=t.replace("#",""),r.append(document.getElementById(t),e,n),i;if(r.hasSingleClass(t)){let l=document.getElementsByClassName(t);return l&&l.length>0&&r.appendChildAll(l,e,n),i}if(r.isString(t)){let l=document.querySelectorAll(t);return l&&l.length>0&&r.appendChildAll(l,e,n),i}if(r.isElement(t)||r.isNode(t))return r.append(t,e,n),i;if(r.isNodeList(t)||r.isHTMLCollection(t)||r.isArray(t))return r.appendChildAll(t,e,n),i}});var ie={};var V=s(()=>{window.dom.appendSelfToParentTag=(t,e,n)=>{let i=dom.getTag(t);return i?(dom.append(i,e,n),i):`${e.localName}: parentTag element not found. DOM install failed.`}});var ne={};var b=s(()=>{window.dom.appendSVG=(t,e,n)=>{if(!e||!t){console.error("DOM.addSVGChild(): missing parameter 'selector', 'content' or both.");return}if(typeof e=="string"){let i=document.createElement("div"),r="<svg>"+e+"</svg>";i.innerHTML=""+r,Array.prototype.slice.call(i.childNodes[0].childNodes).forEach(function(l){dom.append(t,l,n)})}else dom.append(t,el,n)}});var oe={};var M=s(()=>{window.dom.computeTagHeight=t=>{let e=window.dom.utils,n=window.getComputedStyle(t,null);if(!n)return;let i=n.getPropertyValue("padding-top"),r=n.getPropertyValue("padding-bottom"),l=n.getPropertyValue("margin-top"),u=n.getPropertyValue("margin-bottom"),p=e.getStyleNumValue(i)+e.getStyleNumValue(r),f=e.getStyleNumValue(l)+e.getStyleNumValue(u);return p+f+t.clientHeight}});var re={};var x=s(()=>{window.dom.computeTagWidth=(t,e)=>{let n=window.dom.utils,i=window.getComputedStyle(t,null);if(!i)return;let r=i.getPropertyValue("padding-left"),l=i.getPropertyValue("padding-right"),u=i.getPropertyValue("margin-left"),p=i.getPropertyValue("margin-right"),f=n.getStyleNumValue(r)+n.getStyleNumValue(l),w=n.getStyleNumValue(u)+n.getStyleNumValue(p),c=0;if(e){let h=window.getComputedStyle(e,null);if(h){let S=h.getPropertyValue("padding-left"),N=h.getPropertyValue("padding-right");c+=n.getStyleNumValue(S)+n.getStyleNumValue(N)+w}}return c+=f+w+t.clientWidth,c}});var se={};var O=s(()=>{window.dom.createSVGTag=(t,e)=>{let n=window.dom.utils,i=n.createTagNS(t,"SVG");if(!(!e||!n.isObject(e)))return dom.setProps(i,e.prop),dom.setAttr(i,e.attr),n.setEvent(i,e.event),e.children&&Array.isArray(e.children)&&e.children.forEach(r=>{let l=dom.createSVGTag(r.name,r.props,r.attrs,r.children);n.append(i,l)}),i}});var le={};var L=s(()=>{window.dom.createTag=(t,e)=>{let n=window.dom.utils,i=n.createTagNS(t);if(!e||!n.isObject(e))return i;switch(t){case"input":case"textarea":case"select":case"option":case"output":i.value=e.text?e.text:"";break;default:i.innerText=e.text?e.text:"";break}return dom.setProps(i,e.prop),dom.setAttr(i,e.attr),n.setEvent(i,e.event),e.class&&e.class!==""&&(i.className=e.class),i}});var ae={};var B=s(()=>{window.dom.empty=t=>{let e=dom.getTag(t);return e.innerHTML="",self}});var de={};var D=s(()=>{window.dom.getTag=(t,e)=>{let n=window.dom.utils;if(typeof t!="string")return t;let i=e||document;return typeof i=="string"&&(i=n.getElement(i)),n.hasSingleID(t)?i.getElementById(t.replace("#","")):n.hasSingleClass(t)?i.getElementsByClassName(t.replace(".",""))[0]:n.hasSingleTagName(t)?i.getElementsByTagName(t)[0]:i.querySelector(t)}});var me={};var I=s(()=>{window.dom.getTags=(t,e)=>{let n=window.dom.utils;if(typeof t!="string")return t;if(n.hasSingleID(t))return"For a single #id selector use getTag() method instead (expects a single tag return, not a list).";let i=e||document;return n.hasSingleClass(t)?i.getElementsByClassName(t.replace(".","")):n.hasSingleTagName(t)?i.getElementsByTagName(t):(console.log("DOM.getTags(): you have used document.querySelectorAll('') that returns DOM tags that are not 'LIVE' therefore won't automatically stay in sync with the browser therefore, it's not recommended. Try a direct String selector."),i.querySelectorAll(t))}});var ue={};var j=s(()=>{window.dom.hasClass=(t,e)=>t.className.indexOf(e)!==-1});var ge={};var H=s(()=>{window.dom.parse=t=>{var e=document.createElement("template");return t=t.trim(),e.innerHTML=t,e.content}});var pe={};var k=s(()=>{window.dom.prepend=(t,e)=>{dom.append(t,e,!0)}});var fe={};var G=s(()=>{window.dom.remove=t=>{let e=window.dom.utils;return typeof t=="string"?e.hasSingleID(t)?n(getTag(t)):dom.removeAll(getTags(t)):n(t),self;function n(i){i.parentNode.removeChild&&i.parentNode.removeChild(i)}}});var we={};var q=s(()=>{window.dom.removeAll=t=>{for(let e=0;e<t.length;e++)dom.remove(t[e])}});var ce={};var W=s(()=>{window.dom.removeAttrs=(t,e)=>{let n=window.dom.utils,i=dom.getTag(t);return i&&!n.isString(i)&&e&&Array.isArray(e)&&e.forEach(r=>{i.removeAttribute(r)}),dom}});var he={};var R=s(()=>{window.dom.removeAttrsAll=(t,e)=>{let n=window.dom.utils,i=dom.getTags(t);if(i&&!n.isString(i)&&e&&Array.isArray(e))for(let r=0;r<i.length;r++)e.forEach(l=>{i[r].removeAttribute(l)});return dom}});var ye={};var F=s(()=>{window.dom.removeClass=(t,e)=>(dom.getTag(t).classList.remove(e),dom)});var Se={};var $=s(()=>{window.dom.removeClassAll=(t,e)=>{let n=window.dom.utils;if(n.isArray(t))for(let i=0;i<t.length;i++)dom.removeClass(t[i],e);else if(n.isObject(t))for(let i in t)dom.removeClass(t[i],e)}});var Ne={};var z=s(()=>{window.dom.setAttr=(t,e)=>{let n=window.dom.utils,i=dom.getTag(t);if(i&&!n.isString(i)&&e&&n.isObject(e))for(let r in e)i.setAttribute(r,e[r]);return dom}});var Te={};var J=s(()=>{window.dom.setAttrAll=(t,e)=>{let n=window.dom.utils,i=dom.getTags(t);if(i&&!n.isString(i)&&e&&n.isObject(e))for(let r=0;r<i.length;r++)for(let l in e)i[r].setAttribute(l,e[l]);return dom}});var Ce={};var K=s(()=>{window.dom.setProps=(t,e)=>{let n=window.dom.utils,i=dom.getTag(t);if(i&&!n.isString(i)&&e&&n.isObject(e))for(let r in e)i[r]=e[r];return dom}});var Ae={};var Q=s(()=>{window.dom.setPropsAll=(t,e)=>{let n=window.dom.utils,i=dom.getTags(t);if(i&&!n.isString(i)&&e&&n.isObject(e))for(let r=0;r<i.length;r++)for(let l in e)i[r][l]=e[l];return dom}});var Ee={};var U=s(()=>{window.dom.supplantHTML=(t,e)=>t.replace(/{([^{}]*)}/g,function(n,i){let r=dom.utils.getProperty(i,e);return typeof r=="string"||typeof r=="number"?r:n})});var Pe={};var X=s(()=>{window.dom.toggleClass=(t,e)=>(dom.getTag(t).classList.toggle(e),dom)});var ve={};var Y=s(()=>{window.dom.utils=new function(){"use strict";this.append=t,this.appendChildAll=e,this.createTagNS=n,this.getElement=i,this.getProperty=r,this.getStyleNumValue=l,this.hasColon=u,this.hasSingleClass=p,this.hasSingleID=f,this.hasSingleTagName=w,this.isArray=c,this.isElement=h,this.isHTMLCollection=S,this.isNode=N,this.isNodeList=T,this.isObject=C,this.isString=g,this.setEvent=Z,this.singleHashChar=A,this.singlePeriodChar=E;function t(o,a,d){a&&o&&(d&&o.firstChild?o.insertBefore(a,o.firstChild):o.appendChild(a))}function e(o,a,d){for(let m=0;m<o.length;m++)t(o[m],a,d)}function n(o,a){switch(a){case"SVG":return document.createElementNS("http://www.w3.org/2000/svg",o);case"MathML":return document.createElementNS("http://www.w3.org/1998/Math/MathML",o);default:return document.createElementNS("http://www.w3.org/1999/xhtml",o)}}function i(o){return typeof o!="string"?o:f(o)?document.getElementById(o.replace("#","")):p(o)?document.getElementsByClassName(o.replace(".",""))[0]:w(o)?document.getElementsByTagName(o)[0]:document.querySelector(o)}function r(o,a){let d=o.split("."),m=a;for(let y=0,_=d.length;y<_;y++){if(!(d[y]in m))return"";m=m[d[y]]}return m}function l(o){return parseInt(o.replace("px",""))}function u(o){if(g(o))return o.includes(":")}function p(o){if(g(o))return o.startsWith(".")&&E(o)&&!u(o)&&!o.includes("#")&&!o.includes(" ")}function f(o){if(g(o))return o.startsWith("#")&&A(o)&&!u(o)&&!o.includes(".")&&!o.includes(" ")}function w(o){if(g(o))return!o.includes("#")&&!o.includes(".")&&!o.includes(" ")&&!u(o)}function c(o){return Array.isArray(o)}function h(o){return o instanceof Element}function S(o){return HTMLCollection.prototype.isPrototypeOf(o)}function N(o){return o instanceof Node}function T(o){return NodeList.prototype.isPrototypeOf(o)}function C(o){return typeof o=="object"}function g(o){return typeof o=="string"}function Z(o,a){let d=dom.getTag(o);if(d&&!g(d)&&a&&C(a))for(let m in a)d.addEventListener(m,a[m]);return self}function A(o){if(g(o))return(o.match(RegExp("#","g"))||[]).length===1}function E(o){if(g(o))return(o.match(RegExp("\\.","g"))||[]).length===1}}});window.mambo||(window.mambo={develop:!1});window.dom||(window.dom={},Promise.resolve().then(()=>P()),Promise.resolve().then(()=>v()),Promise.resolve().then(()=>V()),Promise.resolve().then(()=>b()),Promise.resolve().then(()=>M()),Promise.resolve().then(()=>x()),Promise.resolve().then(()=>O()),Promise.resolve().then(()=>L()),Promise.resolve().then(()=>B()),Promise.resolve().then(()=>D()),Promise.resolve().then(()=>I()),Promise.resolve().then(()=>j()),Promise.resolve().then(()=>H()),Promise.resolve().then(()=>k()),Promise.resolve().then(()=>G()),Promise.resolve().then(()=>q()),Promise.resolve().then(()=>W()),Promise.resolve().then(()=>R()),Promise.resolve().then(()=>F()),Promise.resolve().then(()=>$()),Promise.resolve().then(()=>z()),Promise.resolve().then(()=>J()),Promise.resolve().then(()=>K()),Promise.resolve().then(()=>Q()),Promise.resolve().then(()=>U()),Promise.resolve().then(()=>X()),Promise.resolve().then(()=>(Y(),ve)));})();
//# sourceMappingURL=domjs-last-min.js.map