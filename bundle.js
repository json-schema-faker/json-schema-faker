/*!
 * JSON Schema $Ref Parser v6.1.0 (February 21st 2019)
 * 
 * https://apidevtools.org/json-schema-ref-parser/
 * 
 * @author  James Messinger (https://jamesmessinger.com)
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$RefParser=f()}})(function(){var define,module,exports;return function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r}()({1:[function(require,module,exports){"use strict";var $Ref=require("./ref"),Pointer=require("./pointer"),url=require("./util/url");function bundle(e,r){var n=[];crawl(e,"schema",e.$refs._root$Ref.path+"#","#",0,n,e.$refs,r),remap(n)}function crawl(e,r,n,t,i,o,f,a){var l=null===r?e:e[r];l&&"object"==typeof l&&($Ref.isAllowed$Ref(l)?inventory$Ref(e,r,n,t,i,o,f,a):Object.keys(l).sort(function(e,r){return"definitions"===e?-1:"definitions"===r?1:e.length-r.length}).forEach(function(e){var r=Pointer.join(n,e),h=Pointer.join(t,e),u=l[e];$Ref.isAllowed$Ref(u)?inventory$Ref(l,e,n,h,i,o,f,a):crawl(l,e,r,h,i,o,f,a)}))}function inventory$Ref(e,r,n,t,i,o,f,a){var l=null===r?e:e[r],h=url.resolve(n,l.$ref),u=f._resolve(h,a),s=Pointer.parse(t).length,c=url.stripHash(u.path),d=url.getHash(u.path),p=c!==f._root$Ref.path,$=$Ref.isExtended$Ref(l);i+=u.indirections;var v=findInInventory(o,e,r);if(v){if(!(s<v.depth||i<v.indirections))return;removeFromInventory(o,v)}o.push({$ref:l,parent:e,key:r,pathFromRoot:t,depth:s,file:c,hash:d,value:u.value,circular:u.circular,extended:$,external:p,indirections:i}),crawl(u.value,null,u.path,t,i+1,o,f,a)}function remap(e){var r,n,t;e.sort(function(e,r){if(e.file!==r.file)return e.file<r.file?-1:1;if(e.hash!==r.hash)return e.hash<r.hash?-1:1;if(e.circular!==r.circular)return e.circular?-1:1;if(e.extended!==r.extended)return e.extended?1:-1;if(e.indirections!==r.indirections)return e.indirections-r.indirections;if(e.depth!==r.depth)return e.depth-r.depth;var n=e.pathFromRoot.lastIndexOf("/definitions"),t=r.pathFromRoot.lastIndexOf("/definitions");return n!==t?t-n:e.pathFromRoot.length-r.pathFromRoot.length}),e.forEach(function(e){e.external?e.file===r&&e.hash===n?e.$ref.$ref=t:e.file===r&&0===e.hash.indexOf(n+"/")?e.$ref.$ref=Pointer.join(t,Pointer.parse(e.hash.replace(n,"#"))):(r=e.file,n=e.hash,t=e.pathFromRoot,e.$ref=e.parent[e.key]=$Ref.dereference(e.$ref,e.value),e.circular&&(e.$ref.$ref=e.pathFromRoot)):e.$ref.$ref=e.hash})}function findInInventory(e,r,n){for(var t=0;t<e.length;t++){var i=e[t];if(i.parent===r&&i.key===n)return i}}function removeFromInventory(e,r){var n=e.indexOf(r);e.splice(n,1)}module.exports=bundle},{"./pointer":11,"./ref":12,"./util/url":18}],2:[function(require,module,exports){"use strict";var $Ref=require("./ref"),Pointer=require("./pointer"),ono=require("ono"),url=require("./util/url");function dereference(e,r){var c=crawl(e.schema,e.$refs._root$Ref.path,"#",[],e.$refs,r);e.$refs.circular=c.circular,e.schema=c.value}function crawl(e,r,c,u,a,f){var i,l={value:e,circular:!1};return e&&"object"==typeof e&&(u.push(e),$Ref.isAllowed$Ref(e,f)?(i=dereference$Ref(e,r,c,u,a,f),l.circular=i.circular,l.value=i.value):Object.keys(e).forEach(function(n){var o=Pointer.join(r,n),t=Pointer.join(c,n),v=e[n],d=!1;$Ref.isAllowed$Ref(v,f)?(d=(i=dereference$Ref(v,o,t,u,a,f)).circular,e[n]=i.value):-1===u.indexOf(v)?(d=(i=crawl(v,o,t,u,a,f)).circular,e[n]=i.value):d=foundCircularReference(o,a,f),l.circular=l.circular||d}),u.pop()),l}function dereference$Ref(e,r,c,u,a,f){var i=url.resolve(r,e.$ref),l=a._resolve(i,f),n=l.circular,o=n||-1!==u.indexOf(l.value);o&&foundCircularReference(r,a,f);var t=$Ref.dereference(e,l.value);if(!o){var v=crawl(t,l.path,c,u,a,f);o=v.circular,t=v.value}return o&&!n&&"ignore"===f.dereference.circular&&(t=e),n&&(t.$ref=c),{circular:o,value:t}}function foundCircularReference(e,r,c){if(r.circular=!0,!c.dereference.circular)throw ono.reference("Circular $ref pointer found at %s",e);return!0}module.exports=dereference},{"./pointer":11,"./ref":12,"./util/url":18,ono:64}],3:[function(require,module,exports){(function(Buffer){"use strict";var Options=require("./options"),$Refs=require("./refs"),parse=require("./parse"),normalizeArgs=require("./normalize-args"),resolveExternal=require("./resolve-external"),bundle=require("./bundle"),dereference=require("./dereference"),url=require("./util/url"),maybe=require("call-me-maybe"),ono=require("ono");function $RefParser(){this.schema=null,this.$refs=new $Refs}module.exports=$RefParser,module.exports.YAML=require("./util/yaml"),$RefParser.parse=function(e,r,t,a){var s=new this;return s.parse.apply(s,arguments)},$RefParser.prototype.parse=function(e,r,t,a){var s,n=normalizeArgs(arguments);if(!n.path&&!n.schema){var o=ono("Expected a file path, URL, or object. Got %s",n.path||n.schema);return maybe(n.callback,Promise.reject(o))}this.schema=null,this.$refs=new $Refs;var i="http";if(url.isFileSystemPath(n.path)&&(n.path=url.fromFileSystemPath(n.path),i="file"),n.path=url.resolve(url.cwd(),n.path),n.schema&&"object"==typeof n.schema){var c=this.$refs._add(n.path);c.value=n.schema,c.pathType=i,s=Promise.resolve(n.schema)}else s=parse(n.path,this.$refs,n.options);var l=this;return s.then(function(e){if(!e||"object"!=typeof e||Buffer.isBuffer(e))throw ono.syntax('"%s" is not a valid JSON Schema',l.$refs._root$Ref.path||e);return l.schema=e,maybe(n.callback,Promise.resolve(l.schema))}).catch(function(e){return maybe(n.callback,Promise.reject(e))})},$RefParser.resolve=function(e,r,t,a){var s=new this;return s.resolve.apply(s,arguments)},$RefParser.prototype.resolve=function(e,r,t,a){var s=this,n=normalizeArgs(arguments);return this.parse(n.path,n.schema,n.options).then(function(){return resolveExternal(s,n.options)}).then(function(){return maybe(n.callback,Promise.resolve(s.$refs))}).catch(function(e){return maybe(n.callback,Promise.reject(e))})},$RefParser.bundle=function(e,r,t,a){var s=new this;return s.bundle.apply(s,arguments)},$RefParser.prototype.bundle=function(e,r,t,a){var s=this,n=normalizeArgs(arguments);return this.resolve(n.path,n.schema,n.options).then(function(){return bundle(s,n.options),maybe(n.callback,Promise.resolve(s.schema))}).catch(function(e){return maybe(n.callback,Promise.reject(e))})},$RefParser.dereference=function(e,r,t,a){var s=new this;return s.dereference.apply(s,arguments)},$RefParser.prototype.dereference=function(e,r,t,a){var s=this,n=normalizeArgs(arguments);return this.resolve(n.path,n.schema,n.options).then(function(){return dereference(s,n.options),maybe(n.callback,Promise.resolve(s.schema))}).catch(function(e){return maybe(n.callback,Promise.reject(e))})}}).call(this,{isBuffer:require("../node_modules/is-buffer/index.js")})},{"../node_modules/is-buffer/index.js":32,"./bundle":1,"./dereference":2,"./normalize-args":4,"./options":5,"./parse":6,"./refs":13,"./resolve-external":14,"./util/url":18,"./util/yaml":19,"call-me-maybe":25,ono:64}],4:[function(require,module,exports){"use strict";var Options=require("./options");function normalizeArgs(o){var t,e,n,r;return"function"==typeof(o=Array.prototype.slice.call(o))[o.length-1]&&(r=o.pop()),"string"==typeof o[0]?(t=o[0],"object"==typeof o[2]?(e=o[1],n=o[2]):(e=void 0,n=o[1])):(t="",e=o[0],n=o[1]),n instanceof Options||(n=new Options(n)),{path:t,schema:e,options:n,callback:r}}module.exports=normalizeArgs},{"./options":5}],5:[function(require,module,exports){"use strict";var jsonParser=require("./parsers/json"),yamlParser=require("./parsers/yaml"),textParser=require("./parsers/text"),binaryParser=require("./parsers/binary"),fileResolver=require("./resolvers/file"),httpResolver=require("./resolvers/http");function $RefParserOptions(e){merge(this,$RefParserOptions.defaults),merge(this,e)}function merge(e,r){if(isMergeable(r))for(var s=Object.keys(r),a=0;a<s.length;a++){var t=s[a],i=r[t],n=e[t];isMergeable(i)?e[t]=merge(n||{},i):void 0!==i&&(e[t]=i)}return e}function isMergeable(e){return e&&"object"==typeof e&&!Array.isArray(e)&&!(e instanceof RegExp)&&!(e instanceof Date)}module.exports=$RefParserOptions,$RefParserOptions.defaults={parse:{json:jsonParser,yaml:yamlParser,text:textParser,binary:binaryParser},resolve:{file:fileResolver,http:httpResolver,external:!0},dereference:{circular:!0}}},{"./parsers/binary":7,"./parsers/json":8,"./parsers/text":9,"./parsers/yaml":10,"./resolvers/file":15,"./resolvers/http":16}],6:[function(require,module,exports){(function(Buffer){"use strict";var ono=require("ono"),url=require("./util/url"),plugins=require("./util/plugins");function parse(r,n,e){try{r=url.stripHash(r);var t=n._add(r),s={url:r,extension:url.getExtension(r)};return readFile(s,e).then(function(r){return t.pathType=r.plugin.name,s.data=r.result,parseFile(s,e)}).then(function(r){return t.value=r.result,r.result})}catch(r){return Promise.reject(r)}}function readFile(r,n){return new Promise(function(e,t){var s=plugins.all(n.resolve);s=plugins.filter(s,"canRead",r),plugins.sort(s),plugins.run(s,"read",r).then(e,function(n){!n||n instanceof SyntaxError?t(ono.syntax('Unable to resolve $ref pointer "%s"',r.url)):t(n)})})}function parseFile(r,n){return new Promise(function(e,t){var s=plugins.all(n.parse),u=plugins.filter(s,"canParse",r),i=u.length>0?u:s;plugins.sort(i),plugins.run(i,"parse",r).then(function(n){!n.plugin.allowEmpty&&isEmpty(n.result)?t(ono.syntax('Error parsing "%s" as %s. \nParsed value is empty',r.url,n.plugin.name)):e(n)},function(n){n?(n=n instanceof Error?n:new Error(n),t(ono.syntax(n,"Error parsing %s",r.url))):t(ono.syntax("Unable to parse %s",r.url))})})}function isEmpty(r){return void 0===r||"object"==typeof r&&0===Object.keys(r).length||"string"==typeof r&&0===r.trim().length||Buffer.isBuffer(r)&&0===r.length}module.exports=parse}).call(this,{isBuffer:require("../node_modules/is-buffer/index.js")})},{"../node_modules/is-buffer/index.js":32,"./util/plugins":17,"./util/url":18,ono:64}],7:[function(require,module,exports){(function(Buffer){"use strict";var BINARY_REGEXP=/\.(jpeg|jpg|gif|png|bmp|ico)$/i;module.exports={order:400,allowEmpty:!0,canParse:function(r){return Buffer.isBuffer(r.data)&&BINARY_REGEXP.test(r.url)},parse:function(r){return Buffer.isBuffer(r.data)?r.data:new Buffer(r.data)}}}).call(this,require("buffer").Buffer)},{buffer:23}],8:[function(require,module,exports){(function(Buffer){"use strict";module.exports={order:100,allowEmpty:!0,canParse:".json",parse:function(r){return new Promise(function(e,t){var n=r.data;Buffer.isBuffer(n)&&(n=n.toString()),"string"==typeof n?0===n.trim().length?e(void 0):e(JSON.parse(n)):e(n)})}}}).call(this,{isBuffer:require("../../node_modules/is-buffer/index.js")})},{"../../node_modules/is-buffer/index.js":32}],9:[function(require,module,exports){(function(Buffer){"use strict";var TEXT_REGEXP=/\.(txt|htm|html|md|xml|js|min|map|css|scss|less|svg)$/i;module.exports={order:300,allowEmpty:!0,encoding:"utf8",canParse:function(t){return("string"==typeof t.data||Buffer.isBuffer(t.data))&&TEXT_REGEXP.test(t.url)},parse:function(t){if("string"==typeof t.data)return t.data;if(Buffer.isBuffer(t.data))return t.data.toString(this.encoding);throw new Error("data is not text")}}}).call(this,{isBuffer:require("../../node_modules/is-buffer/index.js")})},{"../../node_modules/is-buffer/index.js":32}],10:[function(require,module,exports){(function(Buffer){"use strict";var YAML=require("../util/yaml");module.exports={order:200,allowEmpty:!0,canParse:[".yaml",".yml",".json"],parse:function(r){return new Promise(function(e,t){var a=r.data;Buffer.isBuffer(a)&&(a=a.toString()),e("string"==typeof a?YAML.parse(a):a)})}}}).call(this,{isBuffer:require("../../node_modules/is-buffer/index.js")})},{"../../node_modules/is-buffer/index.js":32,"../util/yaml":19}],11:[function(require,module,exports){"use strict";module.exports=Pointer;var $Ref=require("./ref"),url=require("./util/url"),ono=require("ono"),slashes=/\//g,tildes=/~/g,escapedSlash=/~1/g,escapedTilde=/~0/g;function Pointer(e,r,t){this.$ref=e,this.path=r,this.originalPath=t||r,this.value=void 0,this.circular=!1,this.indirections=0}function resolveIf$Ref(e,r){if($Ref.isAllowed$Ref(e.value,r)){var t=url.resolve(e.path,e.value.$ref);if(t!==e.path){var i=e.$ref.$refs._resolve(t,r);return e.indirections+=i.indirections+1,$Ref.isExtended$Ref(e.value)?(e.value=$Ref.dereference(e.value,i.value),!1):(e.$ref=i.$ref,e.path=i.path,e.value=i.value,!0)}e.circular=!0}}function setValue(e,r,t){if(!e.value||"object"!=typeof e.value)throw ono.syntax('Error assigning $ref pointer "%s". \nCannot set "%s" of a non-object.',e.path,r);return"-"===r&&Array.isArray(e.value)?e.value.push(t):e.value[r]=t,t}Pointer.prototype.resolve=function(e,r){var t=Pointer.parse(this.path);this.value=e;for(var i=0;i<t.length;i++){resolveIf$Ref(this,r)&&(this.path=Pointer.join(this.path,t.slice(i)));var s=t[i];if(void 0===this.value[s])throw ono.syntax('Error resolving $ref pointer "%s". \nToken "%s" does not exist.',this.originalPath,s);this.value=this.value[s]}return resolveIf$Ref(this,r),this},Pointer.prototype.set=function(e,r,t){var i,s=Pointer.parse(this.path);if(0===s.length)return this.value=r,r;this.value=e;for(var a=0;a<s.length-1;a++)resolveIf$Ref(this,t),i=s[a],this.value&&void 0!==this.value[i]?this.value=this.value[i]:this.value=setValue(this,i,{});return resolveIf$Ref(this,t),setValue(this,i=s[s.length-1],r),e},Pointer.parse=function(e){var r=url.getHash(e).substr(1);if(!r)return[];r=r.split("/");for(var t=0;t<r.length;t++)r[t]=decodeURIComponent(r[t].replace(escapedSlash,"/").replace(escapedTilde,"~"));if(""!==r[0])throw ono.syntax('Invalid $ref pointer "%s". Pointers must begin with "#/"',r);return r.slice(1)},Pointer.join=function(e,r){-1===e.indexOf("#")&&(e+="#"),r=Array.isArray(r)?r:[r];for(var t=0;t<r.length;t++){var i=r[t];e+="/"+encodeURIComponent(i.replace(tildes,"~0").replace(slashes,"~1"))}return e}},{"./ref":12,"./util/url":18,ono:64}],12:[function(require,module,exports){"use strict";module.exports=$Ref;var Pointer=require("./pointer");function $Ref(){this.path=void 0,this.value=void 0,this.$refs=void 0,this.pathType=void 0}$Ref.prototype.exists=function(e,t){try{return this.resolve(e,t),!0}catch(e){return!1}},$Ref.prototype.get=function(e,t){return this.resolve(e,t).value},$Ref.prototype.resolve=function(e,t,r){return new Pointer(this,e,r).resolve(this.value,t)},$Ref.prototype.set=function(e,t){var r=new Pointer(this,e);this.value=r.set(this.value,t)},$Ref.is$Ref=function(e){return e&&"object"==typeof e&&"string"==typeof e.$ref&&e.$ref.length>0},$Ref.isExternal$Ref=function(e){return $Ref.is$Ref(e)&&"#"!==e.$ref[0]},$Ref.isAllowed$Ref=function(e,t){if($Ref.is$Ref(e)){if("#/"===e.$ref.substr(0,2)||"#"===e.$ref)return!0;if("#"!==e.$ref[0]&&(!t||t.resolve.external))return!0}},$Ref.isExtended$Ref=function(e){return $Ref.is$Ref(e)&&Object.keys(e).length>1},$Ref.dereference=function(e,t){if(t&&"object"==typeof t&&$Ref.isExtended$Ref(e)){var r={};return Object.keys(e).forEach(function(t){"$ref"!==t&&(r[t]=e[t])}),Object.keys(t).forEach(function(e){e in r||(r[e]=t[e])}),r}return t}},{"./pointer":11}],13:[function(require,module,exports){"use strict";var ono=require("ono"),$Ref=require("./ref"),url=require("./util/url");function $Refs(){this.circular=!1,this._$refs={},this._root$Ref=null}function getPaths(e,r){var t=Object.keys(e);return(r=Array.isArray(r[0])?r[0]:Array.prototype.slice.call(r)).length>0&&r[0]&&(t=t.filter(function(t){return-1!==r.indexOf(e[t].pathType)})),t.map(function(r){return{encoded:r,decoded:"file"===e[r].pathType?url.toFileSystemPath(r,!0):r}})}module.exports=$Refs,$Refs.prototype.paths=function(e){return getPaths(this._$refs,arguments).map(function(e){return e.decoded})},$Refs.prototype.values=function(e){var r=this._$refs;return getPaths(r,arguments).reduce(function(e,t){return e[t.decoded]=r[t.encoded].value,e},{})},$Refs.prototype.toJSON=$Refs.prototype.values,$Refs.prototype.exists=function(e,r){try{return this._resolve(e,r),!0}catch(e){return!1}},$Refs.prototype.get=function(e,r){return this._resolve(e,r).value},$Refs.prototype.set=function(e,r){var t=url.resolve(this._root$Ref.path,e),o=url.stripHash(t),s=this._$refs[o];if(!s)throw ono('Error resolving $ref pointer "%s". \n"%s" not found.',e,o);s.set(t,r)},$Refs.prototype._add=function(e){var r=url.stripHash(e),t=new $Ref;return t.path=r,t.$refs=this,this._$refs[r]=t,this._root$Ref=this._root$Ref||t,t},$Refs.prototype._resolve=function(e,r){var t=url.resolve(this._root$Ref.path,e),o=url.stripHash(t),s=this._$refs[o];if(!s)throw ono('Error resolving $ref pointer "%s". \n"%s" not found.',e,o);return s.resolve(t,r,e)},$Refs.prototype._get$Ref=function(e){e=url.resolve(this._root$Ref.path,e);var r=url.stripHash(e);return this._$refs[r]}},{"./ref":12,"./util/url":18,ono:64}],14:[function(require,module,exports){"use strict";var $Ref=require("./ref"),Pointer=require("./pointer"),parse=require("./parse"),url=require("./util/url");function resolveExternal(e,r){if(!r.resolve.external)return Promise.resolve();try{var t=crawl(e.schema,e.$refs._root$Ref.path+"#",e.$refs,r);return Promise.all(t)}catch(e){return Promise.reject(e)}}function crawl(e,r,t,o){var s=[];return e&&"object"==typeof e&&($Ref.isExternal$Ref(e)?s.push(resolve$Ref(e,r,t,o)):Object.keys(e).forEach(function(l){var a=Pointer.join(r,l),n=e[l];$Ref.isExternal$Ref(n)?s.push(resolve$Ref(n,a,t,o)):s=s.concat(crawl(n,a,t,o))})),s}function resolve$Ref(e,r,t,o){var s=url.resolve(r,e.$ref),l=url.stripHash(s);return(e=t._$refs[l])?Promise.resolve(e.value):parse(s,t,o).then(function(e){var r=crawl(e,l+"#",t,o);return Promise.all(r)})}module.exports=resolveExternal},{"./parse":6,"./pointer":11,"./ref":12,"./util/url":18}],15:[function(require,module,exports){"use strict";var fs=require("fs"),ono=require("ono"),url=require("../util/url");module.exports={order:100,canRead:function(r){return url.isFileSystemPath(r.url)},read:function(r){return new Promise(function(e,o){var n;try{n=url.toFileSystemPath(r.url)}catch(e){o(ono.uri(e,"Malformed URI: %s",r.url))}try{fs.readFile(n,function(r,u){r?o(ono(r,'Error opening file "%s"',n)):e(u)})}catch(r){o(ono(r,'Error opening file "%s"',n))}})}}},{"../util/url":18,fs:21,ono:64}],16:[function(require,module,exports){(function(process,Buffer){"use strict";var http=require("http"),https=require("https"),ono=require("ono"),url=require("../util/url");function download(t,o,e){return new Promise(function(r,n){t=url.parse(t),(e=e||[]).push(t.href),get(t,o).then(function(s){if(s.statusCode>=400)throw ono({status:s.statusCode},"HTTP ERROR %d",s.statusCode);if(s.statusCode>=300)if(e.length>o.redirects)n(ono({status:s.statusCode},"Error downloading %s. \nToo many redirects: \n  %s",e[0],e.join(" \n  ")));else{if(!s.headers.location)throw ono({status:s.statusCode},"HTTP %d redirect with no location header",s.statusCode);download(url.resolve(t,s.headers.location),o,e).then(r,n)}else r(s.body||new Buffer(0))}).catch(function(o){n(ono(o,"Error downloading",t.href))})})}function get(t,o){return new Promise(function(e,r){var n=("https:"===t.protocol?https:http).get({hostname:t.hostname,port:t.port,path:t.path,auth:t.auth,protocol:t.protocol,headers:o.headers||{},withCredentials:o.withCredentials});"function"==typeof n.setTimeout&&n.setTimeout(o.timeout),n.on("timeout",function(){n.abort()}),n.on("error",r),n.once("response",function(t){t.body=new Buffer(0),t.on("data",function(o){t.body=Buffer.concat([t.body,new Buffer(o)])}),t.on("error",r),t.on("end",function(){e(t)})})})}module.exports={order:200,headers:null,timeout:5e3,redirects:5,withCredentials:!1,canRead:function(t){return url.isHttp(t.url)},read:function(t){var o=url.parse(t.url);return process.browser&&!o.protocol&&(o.protocol=url.parse(location.href).protocol),download(o,this)}}}).call(this,require("_process"),require("buffer").Buffer)},{"../util/url":18,_process:66,buffer:23,http:80,https:29,ono:64}],17:[function(require,module,exports){"use strict";function getResult(t,n,r,e){var u=t[n];if("function"==typeof u)return u.apply(t,[r,e]);if(!e){if(u instanceof RegExp)return u.test(r.url);if("string"==typeof u)return u===r.extension;if(Array.isArray(u))return-1!==u.indexOf(r.extension)}return u}exports.all=function(t){return Object.keys(t).filter(function(n){return"object"==typeof t[n]}).map(function(n){return t[n].name=n,t[n]})},exports.filter=function(t,n,r){return t.filter(function(t){return!!getResult(t,n,r)})},exports.sort=function(t){return t.forEach(function(t){t.order=t.order||Number.MAX_SAFE_INTEGER}),t.sort(function(t,n){return t.order-n.order})},exports.run=function(t,n,r){var e,u,o=0;return new Promise(function(i,f){function c(){if(!(e=t[o++]))return f(u);try{var i=getResult(e,n,r,s);i&&"function"==typeof i.then?i.then(p,a):void 0!==i&&p(i)}catch(t){a(t)}}function s(t,n){t?a(t):p(n)}function p(t){i({plugin:e,result:t})}function a(t){u=t,c()}c()})}},{}],18:[function(require,module,exports){(function(process){"use strict";var isWindows=/^win/.test(process.platform),forwardSlashPattern=/\//g,protocolPattern=/^(\w{2,}):\/\//i,url=module.exports,urlEncodePatterns=[/\?/g,"%3F",/\#/g,"%23"],urlDecodePatterns=[/\%23/g,"#",/\%24/g,"$",/\%26/g,"&",/\%2C/g,",",/\%40/g,"@"];exports.parse=require("url").parse,exports.resolve=require("url").resolve,exports.cwd=function(){return process.browser?location.href:process.cwd()+"/"},exports.getProtocol=function(r){var e=protocolPattern.exec(r);if(e)return e[1].toLowerCase()},exports.getExtension=function(r){var e=r.lastIndexOf(".");return e>=0?r.substr(e).toLowerCase():""},exports.getHash=function(r){var e=r.indexOf("#");return e>=0?r.substr(e):"#"},exports.stripHash=function(r){var e=r.indexOf("#");return e>=0&&(r=r.substr(0,e)),r},exports.isHttp=function(r){var e=url.getProtocol(r);return"http"===e||"https"===e||void 0===e&&process.browser},exports.isFileSystemPath=function(r){if(process.browser)return!1;var e=url.getProtocol(r);return void 0===e||"file"===e},exports.fromFileSystemPath=function(r){isWindows&&(r=r.replace(/\\/g,"/")),r=encodeURI(r);for(var e=0;e<urlEncodePatterns.length;e+=2)r=r.replace(urlEncodePatterns[e],urlEncodePatterns[e+1]);return r},exports.toFileSystemPath=function(r,e){r=decodeURI(r);for(var t=0;t<urlDecodePatterns.length;t+=2)r=r.replace(urlDecodePatterns[t],urlDecodePatterns[t+1]);var s="file://"===r.substr(0,7).toLowerCase();return s&&(r="/"===r[7]?r.substr(8):r.substr(7),isWindows&&"/"===r[1]&&(r=r[0]+":"+r.substr(1)),e?r="file:///"+r:(s=!1,r=isWindows?r:"/"+r)),isWindows&&!s&&":\\"===(r=r.replace(forwardSlashPattern,"\\")).substr(1,2)&&(r=r[0].toUpperCase()+r.substr(1)),r}}).call(this,require("_process"))},{_process:66,url:87}],19:[function(require,module,exports){"use strict";var yaml=require("js-yaml"),ono=require("ono");module.exports={parse:function(r,e){try{return yaml.safeLoad(r)}catch(r){throw r instanceof Error?r:ono(r,r.message)}},stringify:function(r,e,o){try{var t=("string"==typeof o?o.length:o)||2;return yaml.safeDump(r,{indent:t})}catch(r){throw r instanceof Error?r:ono(r,r.message)}}}},{"js-yaml":34,ono:64}],20:[function(require,module,exports){"use strict";exports.byteLength=byteLength,exports.toByteArray=toByteArray,exports.fromByteArray=fromByteArray;for(var lookup=[],revLookup=[],Arr="undefined"!=typeof Uint8Array?Uint8Array:Array,code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,len=code.length;i<len;++i)lookup[i]=code[i],revLookup[code.charCodeAt(i)]=i;function getLens(o){var r=o.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=o.indexOf("=");return-1===e&&(e=r),[e,e===r?0:4-e%4]}function byteLength(o){var r=getLens(o),e=r[0],t=r[1];return 3*(e+t)/4-t}function _byteLength(o,r,e){return 3*(r+e)/4-e}function toByteArray(o){for(var r,e=getLens(o),t=e[0],n=e[1],u=new Arr(_byteLength(o,t,n)),p=0,a=n>0?t-4:t,h=0;h<a;h+=4)r=revLookup[o.charCodeAt(h)]<<18|revLookup[o.charCodeAt(h+1)]<<12|revLookup[o.charCodeAt(h+2)]<<6|revLookup[o.charCodeAt(h+3)],u[p++]=r>>16&255,u[p++]=r>>8&255,u[p++]=255&r;return 2===n&&(r=revLookup[o.charCodeAt(h)]<<2|revLookup[o.charCodeAt(h+1)]>>4,u[p++]=255&r),1===n&&(r=revLookup[o.charCodeAt(h)]<<10|revLookup[o.charCodeAt(h+1)]<<4|revLookup[o.charCodeAt(h+2)]>>2,u[p++]=r>>8&255,u[p++]=255&r),u}function tripletToBase64(o){return lookup[o>>18&63]+lookup[o>>12&63]+lookup[o>>6&63]+lookup[63&o]}function encodeChunk(o,r,e){for(var t,n=[],u=r;u<e;u+=3)t=(o[u]<<16&16711680)+(o[u+1]<<8&65280)+(255&o[u+2]),n.push(tripletToBase64(t));return n.join("")}function fromByteArray(o){for(var r,e=o.length,t=e%3,n=[],u=0,p=e-t;u<p;u+=16383)n.push(encodeChunk(o,u,u+16383>p?p:u+16383));return 1===t?(r=o[e-1],n.push(lookup[r>>2]+lookup[r<<4&63]+"==")):2===t&&(r=(o[e-2]<<8)+o[e-1],n.push(lookup[r>>10]+lookup[r>>4&63]+lookup[r<<2&63]+"=")),n.join("")}revLookup["-".charCodeAt(0)]=62,revLookup["_".charCodeAt(0)]=63},{}],21:[function(require,module,exports){},{}],22:[function(require,module,exports){(function(global){
/*! https://mths.be/punycode v1.4.1 by @mathias */
!function(e){var o="object"==typeof exports&&exports&&!exports.nodeType&&exports,n="object"==typeof module&&module&&!module.nodeType&&module,t="object"==typeof global&&global;t.global!==t&&t.window!==t&&t.self!==t||(e=t);var r,u,i=2147483647,f=36,c=1,l=26,s=38,d=700,p=72,a=128,h="-",v=/^xn--/,g=/[^\x20-\x7E]/,w=/[\x2E\u3002\uFF0E\uFF61]/g,x={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},b=f-c,y=Math.floor,C=String.fromCharCode;function m(e){throw new RangeError(x[e])}function j(e,o){for(var n=e.length,t=[];n--;)t[n]=o(e[n]);return t}function A(e,o){var n=e.split("@"),t="";return n.length>1&&(t=n[0]+"@",e=n[1]),t+j((e=e.replace(w,".")).split("."),o).join(".")}function I(e){for(var o,n,t=[],r=0,u=e.length;r<u;)(o=e.charCodeAt(r++))>=55296&&o<=56319&&r<u?56320==(64512&(n=e.charCodeAt(r++)))?t.push(((1023&o)<<10)+(1023&n)+65536):(t.push(o),r--):t.push(o);return t}function E(e){return j(e,function(e){var o="";return e>65535&&(o+=C((e-=65536)>>>10&1023|55296),e=56320|1023&e),o+=C(e)}).join("")}function F(e,o){return e+22+75*(e<26)-((0!=o)<<5)}function O(e,o,n){var t=0;for(e=n?y(e/d):e>>1,e+=y(e/o);e>b*l>>1;t+=f)e=y(e/b);return y(t+(b+1)*e/(e+s))}function S(e){var o,n,t,r,u,s,d,v,g,w,x,b=[],C=e.length,j=0,A=a,I=p;for((n=e.lastIndexOf(h))<0&&(n=0),t=0;t<n;++t)e.charCodeAt(t)>=128&&m("not-basic"),b.push(e.charCodeAt(t));for(r=n>0?n+1:0;r<C;){for(u=j,s=1,d=f;r>=C&&m("invalid-input"),((v=(x=e.charCodeAt(r++))-48<10?x-22:x-65<26?x-65:x-97<26?x-97:f)>=f||v>y((i-j)/s))&&m("overflow"),j+=v*s,!(v<(g=d<=I?c:d>=I+l?l:d-I));d+=f)s>y(i/(w=f-g))&&m("overflow"),s*=w;I=O(j-u,o=b.length+1,0==u),y(j/o)>i-A&&m("overflow"),A+=y(j/o),j%=o,b.splice(j++,0,A)}return E(b)}function T(e){var o,n,t,r,u,s,d,v,g,w,x,b,j,A,E,S=[];for(b=(e=I(e)).length,o=a,n=0,u=p,s=0;s<b;++s)(x=e[s])<128&&S.push(C(x));for(t=r=S.length,r&&S.push(h);t<b;){for(d=i,s=0;s<b;++s)(x=e[s])>=o&&x<d&&(d=x);for(d-o>y((i-n)/(j=t+1))&&m("overflow"),n+=(d-o)*j,o=d,s=0;s<b;++s)if((x=e[s])<o&&++n>i&&m("overflow"),x==o){for(v=n,g=f;!(v<(w=g<=u?c:g>=u+l?l:g-u));g+=f)E=v-w,A=f-w,S.push(C(F(w+E%A,0))),v=y(E/A);S.push(C(F(v,0))),u=O(n,j,t==r),n=0,++t}++n,++o}return S.join("")}if(r={version:"1.4.1",ucs2:{decode:I,encode:E},decode:S,encode:T,toASCII:function(e){return A(e,function(e){return g.test(e)?"xn--"+T(e):e})},toUnicode:function(e){return A(e,function(e){return v.test(e)?S(e.slice(4).toLowerCase()):e})}},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return r});else if(o&&n)if(module.exports==o)n.exports=r;else for(u in r)r.hasOwnProperty(u)&&(o[u]=r[u]);else e.punycode=r}(this)}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],23:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
"use strict";var base64=require("base64-js"),ieee754=require("ieee754");exports.Buffer=Buffer,exports.SlowBuffer=SlowBuffer,exports.INSPECT_MAX_BYTES=50;var K_MAX_LENGTH=2147483647;function typedArraySupport(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()}catch(e){return!1}}function createBuffer(e){if(e>K_MAX_LENGTH)throw new RangeError('The value "'+e+'" is invalid for option "size"');var t=new Uint8Array(e);return t.__proto__=Buffer.prototype,t}function Buffer(e,t,r){if("number"==typeof e){if("string"==typeof t)throw new TypeError('The "string" argument must be of type string. Received type number');return allocUnsafe(e)}return from(e,t,r)}function from(e,t,r){if("string"==typeof e)return fromString(e,t);if(ArrayBuffer.isView(e))return fromArrayLike(e);if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(isInstance(e,ArrayBuffer)||e&&isInstance(e.buffer,ArrayBuffer))return fromArrayBuffer(e,t,r);if("number"==typeof e)throw new TypeError('The "value" argument must not be of type number. Received type number');var n=e.valueOf&&e.valueOf();if(null!=n&&n!==e)return Buffer.from(n,t,r);var f=fromObject(e);if(f)return f;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return Buffer.from(e[Symbol.toPrimitive]("string"),t,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function assertSize(e){if("number"!=typeof e)throw new TypeError('"size" argument must be of type number');if(e<0)throw new RangeError('The value "'+e+'" is invalid for option "size"')}function alloc(e,t,r){return assertSize(e),e<=0?createBuffer(e):void 0!==t?"string"==typeof r?createBuffer(e).fill(t,r):createBuffer(e).fill(t):createBuffer(e)}function allocUnsafe(e){return assertSize(e),createBuffer(e<0?0:0|checked(e))}function fromString(e,t){if("string"==typeof t&&""!==t||(t="utf8"),!Buffer.isEncoding(t))throw new TypeError("Unknown encoding: "+t);var r=0|byteLength(e,t),n=createBuffer(r),f=n.write(e,t);return f!==r&&(n=n.slice(0,f)),n}function fromArrayLike(e){for(var t=e.length<0?0:0|checked(e.length),r=createBuffer(t),n=0;n<t;n+=1)r[n]=255&e[n];return r}function fromArrayBuffer(e,t,r){if(t<0||e.byteLength<t)throw new RangeError('"offset" is outside of buffer bounds');if(e.byteLength<t+(r||0))throw new RangeError('"length" is outside of buffer bounds');var n;return(n=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r)).__proto__=Buffer.prototype,n}function fromObject(e){if(Buffer.isBuffer(e)){var t=0|checked(e.length),r=createBuffer(t);return 0===r.length?r:(e.copy(r,0,0,t),r)}return void 0!==e.length?"number"!=typeof e.length||numberIsNaN(e.length)?createBuffer(0):fromArrayLike(e):"Buffer"===e.type&&Array.isArray(e.data)?fromArrayLike(e.data):void 0}function checked(e){if(e>=K_MAX_LENGTH)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+K_MAX_LENGTH.toString(16)+" bytes");return 0|e}function SlowBuffer(e){return+e!=e&&(e=0),Buffer.alloc(+e)}function byteLength(e,t){if(Buffer.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||isInstance(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof e);var r=e.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;for(var f=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return utf8ToBytes(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return base64ToBytes(e).length;default:if(f)return n?-1:utf8ToBytes(e).length;t=(""+t).toLowerCase(),f=!0}}function slowToString(e,t,r){var n=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(t>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return hexSlice(this,t,r);case"utf8":case"utf-8":return utf8Slice(this,t,r);case"ascii":return asciiSlice(this,t,r);case"latin1":case"binary":return latin1Slice(this,t,r);case"base64":return base64Slice(this,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,t,r);default:if(n)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),n=!0}}function swap(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function bidirectionalIndexOf(e,t,r,n,f){if(0===e.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),numberIsNaN(r=+r)&&(r=f?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(f)return-1;r=e.length-1}else if(r<0){if(!f)return-1;r=0}if("string"==typeof t&&(t=Buffer.from(t,n)),Buffer.isBuffer(t))return 0===t.length?-1:arrayIndexOf(e,t,r,n,f);if("number"==typeof t)return t&=255,"function"==typeof Uint8Array.prototype.indexOf?f?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):arrayIndexOf(e,[t],r,n,f);throw new TypeError("val must be string, number or Buffer")}function arrayIndexOf(e,t,r,n,f){var i,o=1,u=e.length,s=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return-1;o=2,u/=2,s/=2,r/=2}function a(e,t){return 1===o?e[t]:e.readUInt16BE(t*o)}if(f){var h=-1;for(i=r;i<u;i++)if(a(e,i)===a(t,-1===h?0:i-h)){if(-1===h&&(h=i),i-h+1===s)return h*o}else-1!==h&&(i-=i-h),h=-1}else for(r+s>u&&(r=u-s),i=r;i>=0;i--){for(var c=!0,l=0;l<s;l++)if(a(e,i+l)!==a(t,l)){c=!1;break}if(c)return i}return-1}function hexWrite(e,t,r,n){r=Number(r)||0;var f=e.length-r;n?(n=Number(n))>f&&(n=f):n=f;var i=t.length;n>i/2&&(n=i/2);for(var o=0;o<n;++o){var u=parseInt(t.substr(2*o,2),16);if(numberIsNaN(u))return o;e[r+o]=u}return o}function utf8Write(e,t,r,n){return blitBuffer(utf8ToBytes(t,e.length-r),e,r,n)}function asciiWrite(e,t,r,n){return blitBuffer(asciiToBytes(t),e,r,n)}function latin1Write(e,t,r,n){return asciiWrite(e,t,r,n)}function base64Write(e,t,r,n){return blitBuffer(base64ToBytes(t),e,r,n)}function ucs2Write(e,t,r,n){return blitBuffer(utf16leToBytes(t,e.length-r),e,r,n)}function base64Slice(e,t,r){return 0===t&&r===e.length?base64.fromByteArray(e):base64.fromByteArray(e.slice(t,r))}function utf8Slice(e,t,r){r=Math.min(e.length,r);for(var n=[],f=t;f<r;){var i,o,u,s,a=e[f],h=null,c=a>239?4:a>223?3:a>191?2:1;if(f+c<=r)switch(c){case 1:a<128&&(h=a);break;case 2:128==(192&(i=e[f+1]))&&(s=(31&a)<<6|63&i)>127&&(h=s);break;case 3:i=e[f+1],o=e[f+2],128==(192&i)&&128==(192&o)&&(s=(15&a)<<12|(63&i)<<6|63&o)>2047&&(s<55296||s>57343)&&(h=s);break;case 4:i=e[f+1],o=e[f+2],u=e[f+3],128==(192&i)&&128==(192&o)&&128==(192&u)&&(s=(15&a)<<18|(63&i)<<12|(63&o)<<6|63&u)>65535&&s<1114112&&(h=s)}null===h?(h=65533,c=1):h>65535&&(h-=65536,n.push(h>>>10&1023|55296),h=56320|1023&h),n.push(h),f+=c}return decodeCodePointsArray(n)}exports.kMaxLength=K_MAX_LENGTH,Buffer.TYPED_ARRAY_SUPPORT=typedArraySupport(),Buffer.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(Buffer.prototype,"parent",{enumerable:!0,get:function(){if(Buffer.isBuffer(this))return this.buffer}}),Object.defineProperty(Buffer.prototype,"offset",{enumerable:!0,get:function(){if(Buffer.isBuffer(this))return this.byteOffset}}),"undefined"!=typeof Symbol&&null!=Symbol.species&&Buffer[Symbol.species]===Buffer&&Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),Buffer.poolSize=8192,Buffer.from=function(e,t,r){return from(e,t,r)},Buffer.prototype.__proto__=Uint8Array.prototype,Buffer.__proto__=Uint8Array,Buffer.alloc=function(e,t,r){return alloc(e,t,r)},Buffer.allocUnsafe=function(e){return allocUnsafe(e)},Buffer.allocUnsafeSlow=function(e){return allocUnsafe(e)},Buffer.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==Buffer.prototype},Buffer.compare=function(e,t){if(isInstance(e,Uint8Array)&&(e=Buffer.from(e,e.offset,e.byteLength)),isInstance(t,Uint8Array)&&(t=Buffer.from(t,t.offset,t.byteLength)),!Buffer.isBuffer(e)||!Buffer.isBuffer(t))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;for(var r=e.length,n=t.length,f=0,i=Math.min(r,n);f<i;++f)if(e[f]!==t[f]){r=e[f],n=t[f];break}return r<n?-1:n<r?1:0},Buffer.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return Buffer.alloc(0);var r;if(void 0===t)for(t=0,r=0;r<e.length;++r)t+=e[r].length;var n=Buffer.allocUnsafe(t),f=0;for(r=0;r<e.length;++r){var i=e[r];if(isInstance(i,Uint8Array)&&(i=Buffer.from(i)),!Buffer.isBuffer(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(n,f),f+=i.length}return n},Buffer.byteLength=byteLength,Buffer.prototype._isBuffer=!0,Buffer.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)swap(this,t,t+1);return this},Buffer.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)swap(this,t,t+3),swap(this,t+1,t+2);return this},Buffer.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)swap(this,t,t+7),swap(this,t+1,t+6),swap(this,t+2,t+5),swap(this,t+3,t+4);return this},Buffer.prototype.toString=function(){var e=this.length;return 0===e?"":0===arguments.length?utf8Slice(this,0,e):slowToString.apply(this,arguments)},Buffer.prototype.toLocaleString=Buffer.prototype.toString,Buffer.prototype.equals=function(e){if(!Buffer.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===Buffer.compare(this,e)},Buffer.prototype.inspect=function(){var e="",t=exports.INSPECT_MAX_BYTES;return e=this.toString("hex",0,t).replace(/(.{2})/g,"$1 ").trim(),this.length>t&&(e+=" ... "),"<Buffer "+e+">"},Buffer.prototype.compare=function(e,t,r,n,f){if(isInstance(e,Uint8Array)&&(e=Buffer.from(e,e.offset,e.byteLength)),!Buffer.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===f&&(f=this.length),t<0||r>e.length||n<0||f>this.length)throw new RangeError("out of range index");if(n>=f&&t>=r)return 0;if(n>=f)return-1;if(t>=r)return 1;if(this===e)return 0;for(var i=(f>>>=0)-(n>>>=0),o=(r>>>=0)-(t>>>=0),u=Math.min(i,o),s=this.slice(n,f),a=e.slice(t,r),h=0;h<u;++h)if(s[h]!==a[h]){i=s[h],o=a[h];break}return i<o?-1:o<i?1:0},Buffer.prototype.includes=function(e,t,r){return-1!==this.indexOf(e,t,r)},Buffer.prototype.indexOf=function(e,t,r){return bidirectionalIndexOf(this,e,t,r,!0)},Buffer.prototype.lastIndexOf=function(e,t,r){return bidirectionalIndexOf(this,e,t,r,!1)},Buffer.prototype.write=function(e,t,r,n){if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var f=this.length-t;if((void 0===r||r>f)&&(r=f),e.length>0&&(r<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var i=!1;;)switch(n){case"hex":return hexWrite(this,e,t,r);case"utf8":case"utf-8":return utf8Write(this,e,t,r);case"ascii":return asciiWrite(this,e,t,r);case"latin1":case"binary":return latin1Write(this,e,t,r);case"base64":return base64Write(this,e,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,e,t,r);default:if(i)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),i=!0}},Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var MAX_ARGUMENTS_LENGTH=4096;function decodeCodePointsArray(e){var t=e.length;if(t<=MAX_ARGUMENTS_LENGTH)return String.fromCharCode.apply(String,e);for(var r="",n=0;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=MAX_ARGUMENTS_LENGTH));return r}function asciiSlice(e,t,r){var n="";r=Math.min(e.length,r);for(var f=t;f<r;++f)n+=String.fromCharCode(127&e[f]);return n}function latin1Slice(e,t,r){var n="";r=Math.min(e.length,r);for(var f=t;f<r;++f)n+=String.fromCharCode(e[f]);return n}function hexSlice(e,t,r){var n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);for(var f="",i=t;i<r;++i)f+=toHex(e[i]);return f}function utf16leSlice(e,t,r){for(var n=e.slice(t,r),f="",i=0;i<n.length;i+=2)f+=String.fromCharCode(n[i]+256*n[i+1]);return f}function checkOffset(e,t,r){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>r)throw new RangeError("Trying to access beyond buffer length")}function checkInt(e,t,r,n,f,i){if(!Buffer.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>f||t<i)throw new RangeError('"value" argument is out of bounds');if(r+n>e.length)throw new RangeError("Index out of range")}function checkIEEE754(e,t,r,n,f,i){if(r+n>e.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function writeFloat(e,t,r,n,f){return t=+t,r>>>=0,f||checkIEEE754(e,t,r,4,3.4028234663852886e38,-3.4028234663852886e38),ieee754.write(e,t,r,n,23,4),r+4}function writeDouble(e,t,r,n,f){return t=+t,r>>>=0,f||checkIEEE754(e,t,r,8,1.7976931348623157e308,-1.7976931348623157e308),ieee754.write(e,t,r,n,52,8),r+8}Buffer.prototype.slice=function(e,t){var r=this.length;(e=~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),(t=void 0===t?r:~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),t<e&&(t=e);var n=this.subarray(e,t);return n.__proto__=Buffer.prototype,n},Buffer.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=this[e],f=1,i=0;++i<t&&(f*=256);)n+=this[e+i]*f;return n},Buffer.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=this[e+--t],f=1;t>0&&(f*=256);)n+=this[e+--t]*f;return n},Buffer.prototype.readUInt8=function(e,t){return e>>>=0,t||checkOffset(e,1,this.length),this[e]},Buffer.prototype.readUInt16LE=function(e,t){return e>>>=0,t||checkOffset(e,2,this.length),this[e]|this[e+1]<<8},Buffer.prototype.readUInt16BE=function(e,t){return e>>>=0,t||checkOffset(e,2,this.length),this[e]<<8|this[e+1]},Buffer.prototype.readUInt32LE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},Buffer.prototype.readUInt32BE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},Buffer.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=this[e],f=1,i=0;++i<t&&(f*=256);)n+=this[e+i]*f;return n>=(f*=128)&&(n-=Math.pow(2,8*t)),n},Buffer.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||checkOffset(e,t,this.length);for(var n=t,f=1,i=this[e+--n];n>0&&(f*=256);)i+=this[e+--n]*f;return i>=(f*=128)&&(i-=Math.pow(2,8*t)),i},Buffer.prototype.readInt8=function(e,t){return e>>>=0,t||checkOffset(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},Buffer.prototype.readInt16LE=function(e,t){e>>>=0,t||checkOffset(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt16BE=function(e,t){e>>>=0,t||checkOffset(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt32LE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},Buffer.prototype.readInt32BE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},Buffer.prototype.readFloatLE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),ieee754.read(this,e,!0,23,4)},Buffer.prototype.readFloatBE=function(e,t){return e>>>=0,t||checkOffset(e,4,this.length),ieee754.read(this,e,!1,23,4)},Buffer.prototype.readDoubleLE=function(e,t){return e>>>=0,t||checkOffset(e,8,this.length),ieee754.read(this,e,!0,52,8)},Buffer.prototype.readDoubleBE=function(e,t){return e>>>=0,t||checkOffset(e,8,this.length),ieee754.read(this,e,!1,52,8)},Buffer.prototype.writeUIntLE=function(e,t,r,n){(e=+e,t>>>=0,r>>>=0,n)||checkInt(this,e,t,r,Math.pow(2,8*r)-1,0);var f=1,i=0;for(this[t]=255&e;++i<r&&(f*=256);)this[t+i]=e/f&255;return t+r},Buffer.prototype.writeUIntBE=function(e,t,r,n){(e=+e,t>>>=0,r>>>=0,n)||checkInt(this,e,t,r,Math.pow(2,8*r)-1,0);var f=r-1,i=1;for(this[t+f]=255&e;--f>=0&&(i*=256);)this[t+f]=e/i&255;return t+r},Buffer.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,1,255,0),this[t]=255&e,t+1},Buffer.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},Buffer.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},Buffer.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},Buffer.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},Buffer.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var f=Math.pow(2,8*r-1);checkInt(this,e,t,r,f-1,-f)}var i=0,o=1,u=0;for(this[t]=255&e;++i<r&&(o*=256);)e<0&&0===u&&0!==this[t+i-1]&&(u=1),this[t+i]=(e/o>>0)-u&255;return t+r},Buffer.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var f=Math.pow(2,8*r-1);checkInt(this,e,t,r,f-1,-f)}var i=r-1,o=1,u=0;for(this[t+i]=255&e;--i>=0&&(o*=256);)e<0&&0===u&&0!==this[t+i+1]&&(u=1),this[t+i]=(e/o>>0)-u&255;return t+r},Buffer.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},Buffer.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},Buffer.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},Buffer.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},Buffer.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||checkInt(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},Buffer.prototype.writeFloatLE=function(e,t,r){return writeFloat(this,e,t,!0,r)},Buffer.prototype.writeFloatBE=function(e,t,r){return writeFloat(this,e,t,!1,r)},Buffer.prototype.writeDoubleLE=function(e,t,r){return writeDouble(this,e,t,!0,r)},Buffer.prototype.writeDoubleBE=function(e,t,r){return writeDouble(this,e,t,!1,r)},Buffer.prototype.copy=function(e,t,r,n){if(!Buffer.isBuffer(e))throw new TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var f=n-r;if(this===e&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(t,r,n);else if(this===e&&r<t&&t<n)for(var i=f-1;i>=0;--i)e[i+t]=this[i+r];else Uint8Array.prototype.set.call(e,this.subarray(r,n),t);return f},Buffer.prototype.fill=function(e,t,r,n){if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!Buffer.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===e.length){var f=e.charCodeAt(0);("utf8"===n&&f<128||"latin1"===n)&&(e=f)}}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<r)throw new RangeError("Out of range index");if(r<=t)return this;var i;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(i=t;i<r;++i)this[i]=e;else{var o=Buffer.isBuffer(e)?e:Buffer.from(e,n),u=o.length;if(0===u)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(i=0;i<r-t;++i)this[i+t]=o[i%u]}return this};var INVALID_BASE64_RE=/[^+\/0-9A-Za-z-_]/g;function base64clean(e){if((e=(e=e.split("=")[0]).trim().replace(INVALID_BASE64_RE,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}function toHex(e){return e<16?"0"+e.toString(16):e.toString(16)}function utf8ToBytes(e,t){var r;t=t||1/0;for(var n=e.length,f=null,i=[],o=0;o<n;++o){if((r=e.charCodeAt(o))>55295&&r<57344){if(!f){if(r>56319){(t-=3)>-1&&i.push(239,191,189);continue}if(o+1===n){(t-=3)>-1&&i.push(239,191,189);continue}f=r;continue}if(r<56320){(t-=3)>-1&&i.push(239,191,189),f=r;continue}r=65536+(f-55296<<10|r-56320)}else f&&(t-=3)>-1&&i.push(239,191,189);if(f=null,r<128){if((t-=1)<0)break;i.push(r)}else if(r<2048){if((t-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return i}function asciiToBytes(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}function utf16leToBytes(e,t){for(var r,n,f,i=[],o=0;o<e.length&&!((t-=2)<0);++o)n=(r=e.charCodeAt(o))>>8,f=r%256,i.push(f),i.push(n);return i}function base64ToBytes(e){return base64.toByteArray(base64clean(e))}function blitBuffer(e,t,r,n){for(var f=0;f<n&&!(f+r>=t.length||f>=e.length);++f)t[f+r]=e[f];return f}function isInstance(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}function numberIsNaN(e){return e!=e}},{"base64-js":20,ieee754:30}],24:[function(require,module,exports){module.exports={100:"Continue",101:"Switching Protocols",102:"Processing",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a teapot",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Unordered Collection",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",451:"Unavailable For Legal Reasons",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",509:"Bandwidth Limit Exceeded",510:"Not Extended",511:"Network Authentication Required"}},{}],25:[function(require,module,exports){(function(process,global){"use strict";var next=global.process&&process.nextTick||global.setImmediate||function(n){setTimeout(n,0)};module.exports=function(n,t){return n?void t.then(function(t){next(function(){n(null,t)})},function(t){next(function(){n(t)})}):t}}).call(this,require("_process"),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{_process:66}],26:[function(require,module,exports){(function(Buffer){function isArray(r){return Array.isArray?Array.isArray(r):"[object Array]"===objectToString(r)}function isBoolean(r){return"boolean"==typeof r}function isNull(r){return null===r}function isNullOrUndefined(r){return null==r}function isNumber(r){return"number"==typeof r}function isString(r){return"string"==typeof r}function isSymbol(r){return"symbol"==typeof r}function isUndefined(r){return void 0===r}function isRegExp(r){return"[object RegExp]"===objectToString(r)}function isObject(r){return"object"==typeof r&&null!==r}function isDate(r){return"[object Date]"===objectToString(r)}function isError(r){return"[object Error]"===objectToString(r)||r instanceof Error}function isFunction(r){return"function"==typeof r}function isPrimitive(r){return null===r||"boolean"==typeof r||"number"==typeof r||"string"==typeof r||"symbol"==typeof r||void 0===r}function objectToString(r){return Object.prototype.toString.call(r)}exports.isArray=isArray,exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isString=isString,exports.isSymbol=isSymbol,exports.isUndefined=isUndefined,exports.isRegExp=isRegExp,exports.isObject=isObject,exports.isDate=isDate,exports.isError=isError,exports.isFunction=isFunction,exports.isPrimitive=isPrimitive,exports.isBuffer=Buffer.isBuffer}).call(this,{isBuffer:require("../../is-buffer/index.js")})},{"../../is-buffer/index.js":32}],27:[function(require,module,exports){var objectCreate=Object.create||objectCreatePolyfill,objectKeys=Object.keys||objectKeysPolyfill,bind=Function.prototype.bind||functionBindPolyfill;function EventEmitter(){this._events&&Object.prototype.hasOwnProperty.call(this,"_events")||(this._events=objectCreate(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0}module.exports=EventEmitter,EventEmitter.EventEmitter=EventEmitter,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0;var hasDefineProperty,defaultMaxListeners=10;try{var o={};Object.defineProperty&&Object.defineProperty(o,"x",{value:0}),hasDefineProperty=0===o.x}catch(e){hasDefineProperty=!1}function $getMaxListeners(e){return void 0===e._maxListeners?EventEmitter.defaultMaxListeners:e._maxListeners}function emitNone(e,t,n){if(t)e.call(n);else for(var r=e.length,i=arrayClone(e,r),s=0;s<r;++s)i[s].call(n)}function emitOne(e,t,n,r){if(t)e.call(n,r);else for(var i=e.length,s=arrayClone(e,i),o=0;o<i;++o)s[o].call(n,r)}function emitTwo(e,t,n,r,i){if(t)e.call(n,r,i);else for(var s=e.length,o=arrayClone(e,s),a=0;a<s;++a)o[a].call(n,r,i)}function emitThree(e,t,n,r,i,s){if(t)e.call(n,r,i,s);else for(var o=e.length,a=arrayClone(e,o),l=0;l<o;++l)a[l].call(n,r,i,s)}function emitMany(e,t,n,r){if(t)e.apply(n,r);else for(var i=e.length,s=arrayClone(e,i),o=0;o<i;++o)s[o].apply(n,r)}function _addListener(e,t,n,r){var i,s,o;if("function"!=typeof n)throw new TypeError('"listener" argument must be a function');if((s=e._events)?(s.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),s=e._events),o=s[t]):(s=e._events=objectCreate(null),e._eventsCount=0),o){if("function"==typeof o?o=s[t]=r?[n,o]:[o,n]:r?o.unshift(n):o.push(n),!o.warned&&(i=$getMaxListeners(e))&&i>0&&o.length>i){o.warned=!0;var a=new Error("Possible EventEmitter memory leak detected. "+o.length+' "'+String(t)+'" listeners added. Use emitter.setMaxListeners() to increase limit.');a.name="MaxListenersExceededWarning",a.emitter=e,a.type=t,a.count=o.length,"object"==typeof console&&console.warn&&console.warn("%s: %s",a.name,a.message)}}else o=s[t]=n,++e._eventsCount;return e}function onceWrapper(){if(!this.fired)switch(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length){case 0:return this.listener.call(this.target);case 1:return this.listener.call(this.target,arguments[0]);case 2:return this.listener.call(this.target,arguments[0],arguments[1]);case 3:return this.listener.call(this.target,arguments[0],arguments[1],arguments[2]);default:for(var e=new Array(arguments.length),t=0;t<e.length;++t)e[t]=arguments[t];this.listener.apply(this.target,e)}}function _onceWrap(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},i=bind.call(onceWrapper,r);return i.listener=n,r.wrapFn=i,i}function _listeners(e,t,n){var r=e._events;if(!r)return[];var i=r[t];return i?"function"==typeof i?n?[i.listener||i]:[i]:n?unwrapListeners(i):arrayClone(i,i.length):[]}function listenerCount(e){var t=this._events;if(t){var n=t[e];if("function"==typeof n)return 1;if(n)return n.length}return 0}function spliceOne(e,t){for(var n=t,r=n+1,i=e.length;r<i;n+=1,r+=1)e[n]=e[r];e.pop()}function arrayClone(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}function unwrapListeners(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}function objectCreatePolyfill(e){var t=function(){};return t.prototype=e,new t}function objectKeysPolyfill(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return n}function functionBindPolyfill(e){var t=this;return function(){return t.apply(e,arguments)}}hasDefineProperty?Object.defineProperty(EventEmitter,"defaultMaxListeners",{enumerable:!0,get:function(){return defaultMaxListeners},set:function(e){if("number"!=typeof e||e<0||e!=e)throw new TypeError('"defaultMaxListeners" must be a positive number');defaultMaxListeners=e}}):EventEmitter.defaultMaxListeners=defaultMaxListeners,EventEmitter.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||isNaN(e))throw new TypeError('"n" argument must be a positive number');return this._maxListeners=e,this},EventEmitter.prototype.getMaxListeners=function(){return $getMaxListeners(this)},EventEmitter.prototype.emit=function(e){var t,n,r,i,s,o,a="error"===e;if(o=this._events)a=a&&null==o.error;else if(!a)return!1;if(a){if(arguments.length>1&&(t=arguments[1]),t instanceof Error)throw t;var l=new Error('Unhandled "error" event. ('+t+")");throw l.context=t,l}if(!(n=o[e]))return!1;var u="function"==typeof n;switch(r=arguments.length){case 1:emitNone(n,u,this);break;case 2:emitOne(n,u,this,arguments[1]);break;case 3:emitTwo(n,u,this,arguments[1],arguments[2]);break;case 4:emitThree(n,u,this,arguments[1],arguments[2],arguments[3]);break;default:for(i=new Array(r-1),s=1;s<r;s++)i[s-1]=arguments[s];emitMany(n,u,this,i)}return!0},EventEmitter.prototype.addListener=function(e,t){return _addListener(this,e,t,!1)},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.prependListener=function(e,t){return _addListener(this,e,t,!0)},EventEmitter.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');return this.on(e,_onceWrap(this,e,t)),this},EventEmitter.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');return this.prependListener(e,_onceWrap(this,e,t)),this},EventEmitter.prototype.removeListener=function(e,t){var n,r,i,s,o;if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');if(!(r=this._events))return this;if(!(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=objectCreate(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(i=-1,s=n.length-1;s>=0;s--)if(n[s]===t||n[s].listener===t){o=n[s].listener,i=s;break}if(i<0)return this;0===i?n.shift():spliceOne(n,i),1===n.length&&(r[e]=n[0]),r.removeListener&&this.emit("removeListener",e,o||t)}return this},EventEmitter.prototype.removeAllListeners=function(e){var t,n,r;if(!(n=this._events))return this;if(!n.removeListener)return 0===arguments.length?(this._events=objectCreate(null),this._eventsCount=0):n[e]&&(0==--this._eventsCount?this._events=objectCreate(null):delete n[e]),this;if(0===arguments.length){var i,s=objectKeys(n);for(r=0;r<s.length;++r)"removeListener"!==(i=s[r])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=objectCreate(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},EventEmitter.prototype.listeners=function(e){return _listeners(this,e,!0)},EventEmitter.prototype.rawListeners=function(e){return _listeners(this,e,!1)},EventEmitter.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):listenerCount.call(e,t)},EventEmitter.prototype.listenerCount=listenerCount,EventEmitter.prototype.eventNames=function(){return this._eventsCount>0?Reflect.ownKeys(this._events):[]}},{}],28:[function(require,module,exports){function format(e){var r=Array.prototype.slice.call(arguments,1);return r.length&&(e=e.replace(/(%?)(%([jds]))/g,function(e,t,a,n){var s=r.shift();switch(n){case"s":s=""+s;break;case"d":s=Number(s);break;case"j":s=JSON.stringify(s)}return t?(r.unshift(s),e):s})),r.length&&(e+=" "+r.join(" ")),""+(e=e.replace(/%{2,2}/g,"%"))}module.exports=format},{}],29:[function(require,module,exports){var http=require("http"),url=require("url"),https=module.exports;for(var key in http)http.hasOwnProperty(key)&&(https[key]=http[key]);function validateParams(t){if("string"==typeof t&&(t=url.parse(t)),t.protocol||(t.protocol="https:"),"https:"!==t.protocol)throw new Error('Protocol "'+t.protocol+'" not supported. Expected "https:"');return t}https.request=function(t,r){return t=validateParams(t),http.request.call(this,t,r)},https.get=function(t,r){return t=validateParams(t),http.get.call(this,t,r)}},{http:80,url:87}],30:[function(require,module,exports){exports.read=function(a,o,t,r,h){var M,p,w=8*h-r-1,f=(1<<w)-1,e=f>>1,i=-7,N=t?h-1:0,n=t?-1:1,s=a[o+N];for(N+=n,M=s&(1<<-i)-1,s>>=-i,i+=w;i>0;M=256*M+a[o+N],N+=n,i-=8);for(p=M&(1<<-i)-1,M>>=-i,i+=r;i>0;p=256*p+a[o+N],N+=n,i-=8);if(0===M)M=1-e;else{if(M===f)return p?NaN:1/0*(s?-1:1);p+=Math.pow(2,r),M-=e}return(s?-1:1)*p*Math.pow(2,M-r)},exports.write=function(a,o,t,r,h,M){var p,w,f,e=8*M-h-1,i=(1<<e)-1,N=i>>1,n=23===h?Math.pow(2,-24)-Math.pow(2,-77):0,s=r?0:M-1,u=r?1:-1,l=o<0||0===o&&1/o<0?1:0;for(o=Math.abs(o),isNaN(o)||o===1/0?(w=isNaN(o)?1:0,p=i):(p=Math.floor(Math.log(o)/Math.LN2),o*(f=Math.pow(2,-p))<1&&(p--,f*=2),(o+=p+N>=1?n/f:n*Math.pow(2,1-N))*f>=2&&(p++,f/=2),p+N>=i?(w=0,p=i):p+N>=1?(w=(o*f-1)*Math.pow(2,h),p+=N):(w=o*Math.pow(2,N-1)*Math.pow(2,h),p=0));h>=8;a[t+s]=255&w,s+=u,w/=256,h-=8);for(p=p<<h|w,e+=h;e>0;a[t+s]=255&p,s+=u,p/=256,e-=8);a[t+s-u]|=128*l}},{}],31:[function(require,module,exports){"function"==typeof Object.create?module.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:module.exports=function(t,e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t}},{}],32:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
function isBuffer(f){return!!f.constructor&&"function"==typeof f.constructor.isBuffer&&f.constructor.isBuffer(f)}function isSlowBuffer(f){return"function"==typeof f.readFloatLE&&"function"==typeof f.slice&&isBuffer(f.slice(0,0))}module.exports=function(f){return null!=f&&(isBuffer(f)||isSlowBuffer(f)||!!f._isBuffer)}},{}],33:[function(require,module,exports){var toString={}.toString;module.exports=Array.isArray||function(r){return"[object Array]"==toString.call(r)}},{}],34:[function(require,module,exports){"use strict";var yaml=require("./lib/js-yaml.js");module.exports=yaml},{"./lib/js-yaml.js":35}],35:[function(require,module,exports){"use strict";var loader=require("./js-yaml/loader"),dumper=require("./js-yaml/dumper");function deprecated(e){return function(){throw new Error("Function "+e+" is deprecated and cannot be used.")}}module.exports.Type=require("./js-yaml/type"),module.exports.Schema=require("./js-yaml/schema"),module.exports.FAILSAFE_SCHEMA=require("./js-yaml/schema/failsafe"),module.exports.JSON_SCHEMA=require("./js-yaml/schema/json"),module.exports.CORE_SCHEMA=require("./js-yaml/schema/core"),module.exports.DEFAULT_SAFE_SCHEMA=require("./js-yaml/schema/default_safe"),module.exports.DEFAULT_FULL_SCHEMA=require("./js-yaml/schema/default_full"),module.exports.load=loader.load,module.exports.loadAll=loader.loadAll,module.exports.safeLoad=loader.safeLoad,module.exports.safeLoadAll=loader.safeLoadAll,module.exports.dump=dumper.dump,module.exports.safeDump=dumper.safeDump,module.exports.YAMLException=require("./js-yaml/exception"),module.exports.MINIMAL_SCHEMA=require("./js-yaml/schema/failsafe"),module.exports.SAFE_SCHEMA=require("./js-yaml/schema/default_safe"),module.exports.DEFAULT_SCHEMA=require("./js-yaml/schema/default_full"),module.exports.scan=deprecated("scan"),module.exports.parse=deprecated("parse"),module.exports.compose=deprecated("compose"),module.exports.addConstructor=deprecated("addConstructor")},{"./js-yaml/dumper":37,"./js-yaml/exception":38,"./js-yaml/loader":39,"./js-yaml/schema":41,"./js-yaml/schema/core":42,"./js-yaml/schema/default_full":43,"./js-yaml/schema/default_safe":44,"./js-yaml/schema/failsafe":45,"./js-yaml/schema/json":46,"./js-yaml/type":47}],36:[function(require,module,exports){"use strict";function isNothing(e){return null==e}function isObject(e){return"object"==typeof e&&null!==e}function toArray(e){return Array.isArray(e)?e:isNothing(e)?[]:[e]}function extend(e,t){var r,o,n,i;if(t)for(r=0,o=(i=Object.keys(t)).length;r<o;r+=1)e[n=i[r]]=t[n];return e}function repeat(e,t){var r,o="";for(r=0;r<t;r+=1)o+=e;return o}function isNegativeZero(e){return 0===e&&Number.NEGATIVE_INFINITY===1/e}module.exports.isNothing=isNothing,module.exports.isObject=isObject,module.exports.toArray=toArray,module.exports.repeat=repeat,module.exports.isNegativeZero=isNegativeZero,module.exports.extend=extend},{}],37:[function(require,module,exports){"use strict";var common=require("./common"),YAMLException=require("./exception"),DEFAULT_FULL_SCHEMA=require("./schema/default_full"),DEFAULT_SAFE_SCHEMA=require("./schema/default_safe"),_toString=Object.prototype.toString,_hasOwnProperty=Object.prototype.hasOwnProperty,CHAR_TAB=9,CHAR_LINE_FEED=10,CHAR_SPACE=32,CHAR_EXCLAMATION=33,CHAR_DOUBLE_QUOTE=34,CHAR_SHARP=35,CHAR_PERCENT=37,CHAR_AMPERSAND=38,CHAR_SINGLE_QUOTE=39,CHAR_ASTERISK=42,CHAR_COMMA=44,CHAR_MINUS=45,CHAR_COLON=58,CHAR_GREATER_THAN=62,CHAR_QUESTION=63,CHAR_COMMERCIAL_AT=64,CHAR_LEFT_SQUARE_BRACKET=91,CHAR_RIGHT_SQUARE_BRACKET=93,CHAR_GRAVE_ACCENT=96,CHAR_LEFT_CURLY_BRACKET=123,CHAR_VERTICAL_LINE=124,CHAR_RIGHT_CURLY_BRACKET=125,ESCAPE_SEQUENCES={0:"\\0",7:"\\a",8:"\\b",9:"\\t",10:"\\n",11:"\\v",12:"\\f",13:"\\r",27:"\\e",34:'\\"',92:"\\\\",133:"\\N",160:"\\_",8232:"\\L",8233:"\\P"},DEPRECATED_BOOLEANS_SYNTAX=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"];function compileStyleMap(e,t){var n,i,r,o,a,l,s;if(null===t)return{};for(n={},r=0,o=(i=Object.keys(t)).length;r<o;r+=1)a=i[r],l=String(t[a]),"!!"===a.slice(0,2)&&(a="tag:yaml.org,2002:"+a.slice(2)),(s=e.compiledTypeMap.fallback[a])&&_hasOwnProperty.call(s.styleAliases,l)&&(l=s.styleAliases[l]),n[a]=l;return n}function encodeHex(e){var t,n,i;if(t=e.toString(16).toUpperCase(),e<=255)n="x",i=2;else if(e<=65535)n="u",i=4;else{if(!(e<=4294967295))throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");n="U",i=8}return"\\"+n+common.repeat("0",i-t.length)+t}function State(e){this.schema=e.schema||DEFAULT_FULL_SCHEMA,this.indent=Math.max(1,e.indent||2),this.noArrayIndent=e.noArrayIndent||!1,this.skipInvalid=e.skipInvalid||!1,this.flowLevel=common.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=compileStyleMap(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.lineWidth=e.lineWidth||80,this.noRefs=e.noRefs||!1,this.noCompatMode=e.noCompatMode||!1,this.condenseFlow=e.condenseFlow||!1,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function indentString(e,t){for(var n,i=common.repeat(" ",t),r=0,o=-1,a="",l=e.length;r<l;)-1===(o=e.indexOf("\n",r))?(n=e.slice(r),r=l):(n=e.slice(r,o+1),r=o+1),n.length&&"\n"!==n&&(a+=i),a+=n;return a}function generateNextLine(e,t){return"\n"+common.repeat(" ",e.indent*t)}function testImplicitResolving(e,t){var n,i;for(n=0,i=e.implicitTypes.length;n<i;n+=1)if(e.implicitTypes[n].resolve(t))return!0;return!1}function isWhitespace(e){return e===CHAR_SPACE||e===CHAR_TAB}function isPrintable(e){return 32<=e&&e<=126||161<=e&&e<=55295&&8232!==e&&8233!==e||57344<=e&&e<=65533&&65279!==e||65536<=e&&e<=1114111}function isPlainSafe(e){return isPrintable(e)&&65279!==e&&e!==CHAR_COMMA&&e!==CHAR_LEFT_SQUARE_BRACKET&&e!==CHAR_RIGHT_SQUARE_BRACKET&&e!==CHAR_LEFT_CURLY_BRACKET&&e!==CHAR_RIGHT_CURLY_BRACKET&&e!==CHAR_COLON&&e!==CHAR_SHARP}function isPlainSafeFirst(e){return isPrintable(e)&&65279!==e&&!isWhitespace(e)&&e!==CHAR_MINUS&&e!==CHAR_QUESTION&&e!==CHAR_COLON&&e!==CHAR_COMMA&&e!==CHAR_LEFT_SQUARE_BRACKET&&e!==CHAR_RIGHT_SQUARE_BRACKET&&e!==CHAR_LEFT_CURLY_BRACKET&&e!==CHAR_RIGHT_CURLY_BRACKET&&e!==CHAR_SHARP&&e!==CHAR_AMPERSAND&&e!==CHAR_ASTERISK&&e!==CHAR_EXCLAMATION&&e!==CHAR_VERTICAL_LINE&&e!==CHAR_GREATER_THAN&&e!==CHAR_SINGLE_QUOTE&&e!==CHAR_DOUBLE_QUOTE&&e!==CHAR_PERCENT&&e!==CHAR_COMMERCIAL_AT&&e!==CHAR_GRAVE_ACCENT}function needIndentIndicator(e){return/^\n* /.test(e)}var STYLE_PLAIN=1,STYLE_SINGLE=2,STYLE_LITERAL=3,STYLE_FOLDED=4,STYLE_DOUBLE=5;function chooseScalarStyle(e,t,n,i,r){var o,a,l=!1,s=!1,c=-1!==i,u=-1,d=isPlainSafeFirst(e.charCodeAt(0))&&!isWhitespace(e.charCodeAt(e.length-1));if(t)for(o=0;o<e.length;o++){if(!isPrintable(a=e.charCodeAt(o)))return STYLE_DOUBLE;d=d&&isPlainSafe(a)}else{for(o=0;o<e.length;o++){if((a=e.charCodeAt(o))===CHAR_LINE_FEED)l=!0,c&&(s=s||o-u-1>i&&" "!==e[u+1],u=o);else if(!isPrintable(a))return STYLE_DOUBLE;d=d&&isPlainSafe(a)}s=s||c&&o-u-1>i&&" "!==e[u+1]}return l||s?n>9&&needIndentIndicator(e)?STYLE_DOUBLE:s?STYLE_FOLDED:STYLE_LITERAL:d&&!r(e)?STYLE_PLAIN:STYLE_SINGLE}function writeScalar(e,t,n,i){e.dump=function(){if(0===t.length)return"''";if(!e.noCompatMode&&-1!==DEPRECATED_BOOLEANS_SYNTAX.indexOf(t))return"'"+t+"'";var r=e.indent*Math.max(1,n),o=-1===e.lineWidth?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-r),a=i||e.flowLevel>-1&&n>=e.flowLevel;switch(chooseScalarStyle(t,a,e.indent,o,function(t){return testImplicitResolving(e,t)})){case STYLE_PLAIN:return t;case STYLE_SINGLE:return"'"+t.replace(/'/g,"''")+"'";case STYLE_LITERAL:return"|"+blockHeader(t,e.indent)+dropEndingNewline(indentString(t,r));case STYLE_FOLDED:return">"+blockHeader(t,e.indent)+dropEndingNewline(indentString(foldString(t,o),r));case STYLE_DOUBLE:return'"'+escapeString(t,o)+'"';default:throw new YAMLException("impossible error: invalid scalar style")}}()}function blockHeader(e,t){var n=needIndentIndicator(e)?String(t):"",i="\n"===e[e.length-1];return n+(i&&("\n"===e[e.length-2]||"\n"===e)?"+":i?"":"-")+"\n"}function dropEndingNewline(e){return"\n"===e[e.length-1]?e.slice(0,-1):e}function foldString(e,t){for(var n,i,r,o=/(\n+)([^\n]*)/g,a=(n=-1!==(n=e.indexOf("\n"))?n:e.length,o.lastIndex=n,foldLine(e.slice(0,n),t)),l="\n"===e[0]||" "===e[0];r=o.exec(e);){var s=r[1],c=r[2];i=" "===c[0],a+=s+(l||i||""===c?"":"\n")+foldLine(c,t),l=i}return a}function foldLine(e,t){if(""===e||" "===e[0])return e;for(var n,i,r=/ [^ ]/g,o=0,a=0,l=0,s="";n=r.exec(e);)(l=n.index)-o>t&&(i=a>o?a:l,s+="\n"+e.slice(o,i),o=i+1),a=l;return s+="\n",e.length-o>t&&a>o?s+=e.slice(o,a)+"\n"+e.slice(a+1):s+=e.slice(o),s.slice(1)}function escapeString(e){for(var t,n,i,r="",o=0;o<e.length;o++)(t=e.charCodeAt(o))>=55296&&t<=56319&&(n=e.charCodeAt(o+1))>=56320&&n<=57343?(r+=encodeHex(1024*(t-55296)+n-56320+65536),o++):r+=!(i=ESCAPE_SEQUENCES[t])&&isPrintable(t)?e[o]:i||encodeHex(t);return r}function writeFlowSequence(e,t,n){var i,r,o="",a=e.tag;for(i=0,r=n.length;i<r;i+=1)writeNode(e,t,n[i],!1,!1)&&(0!==i&&(o+=","+(e.condenseFlow?"":" ")),o+=e.dump);e.tag=a,e.dump="["+o+"]"}function writeBlockSequence(e,t,n,i){var r,o,a="",l=e.tag;for(r=0,o=n.length;r<o;r+=1)writeNode(e,t+1,n[r],!0,!0)&&(i&&0===r||(a+=generateNextLine(e,t)),e.dump&&CHAR_LINE_FEED===e.dump.charCodeAt(0)?a+="-":a+="- ",a+=e.dump);e.tag=l,e.dump=a||"[]"}function writeFlowMapping(e,t,n){var i,r,o,a,l,s="",c=e.tag,u=Object.keys(n);for(i=0,r=u.length;i<r;i+=1)l=e.condenseFlow?'"':"",0!==i&&(l+=", "),a=n[o=u[i]],writeNode(e,t,o,!1,!1)&&(e.dump.length>1024&&(l+="? "),l+=e.dump+(e.condenseFlow?'"':"")+":"+(e.condenseFlow?"":" "),writeNode(e,t,a,!1,!1)&&(s+=l+=e.dump));e.tag=c,e.dump="{"+s+"}"}function writeBlockMapping(e,t,n,i){var r,o,a,l,s,c,u="",d=e.tag,p=Object.keys(n);if(!0===e.sortKeys)p.sort();else if("function"==typeof e.sortKeys)p.sort(e.sortKeys);else if(e.sortKeys)throw new YAMLException("sortKeys must be a boolean or a function");for(r=0,o=p.length;r<o;r+=1)c="",i&&0===r||(c+=generateNextLine(e,t)),l=n[a=p[r]],writeNode(e,t+1,a,!0,!0,!0)&&((s=null!==e.tag&&"?"!==e.tag||e.dump&&e.dump.length>1024)&&(e.dump&&CHAR_LINE_FEED===e.dump.charCodeAt(0)?c+="?":c+="? "),c+=e.dump,s&&(c+=generateNextLine(e,t)),writeNode(e,t+1,l,!0,s)&&(e.dump&&CHAR_LINE_FEED===e.dump.charCodeAt(0)?c+=":":c+=": ",u+=c+=e.dump));e.tag=d,e.dump=u||"{}"}function detectType(e,t,n){var i,r,o,a,l,s;for(o=0,a=(r=n?e.explicitTypes:e.implicitTypes).length;o<a;o+=1)if(((l=r[o]).instanceOf||l.predicate)&&(!l.instanceOf||"object"==typeof t&&t instanceof l.instanceOf)&&(!l.predicate||l.predicate(t))){if(e.tag=n?l.tag:"?",l.represent){if(s=e.styleMap[l.tag]||l.defaultStyle,"[object Function]"===_toString.call(l.represent))i=l.represent(t,s);else{if(!_hasOwnProperty.call(l.represent,s))throw new YAMLException("!<"+l.tag+'> tag resolver accepts not "'+s+'" style');i=l.represent[s](t,s)}e.dump=i}return!0}return!1}function writeNode(e,t,n,i,r,o){e.tag=null,e.dump=n,detectType(e,n,!1)||detectType(e,n,!0);var a=_toString.call(e.dump);i&&(i=e.flowLevel<0||e.flowLevel>t);var l,s,c="[object Object]"===a||"[object Array]"===a;if(c&&(s=-1!==(l=e.duplicates.indexOf(n))),(null!==e.tag&&"?"!==e.tag||s||2!==e.indent&&t>0)&&(r=!1),s&&e.usedDuplicates[l])e.dump="*ref_"+l;else{if(c&&s&&!e.usedDuplicates[l]&&(e.usedDuplicates[l]=!0),"[object Object]"===a)i&&0!==Object.keys(e.dump).length?(writeBlockMapping(e,t,e.dump,r),s&&(e.dump="&ref_"+l+e.dump)):(writeFlowMapping(e,t,e.dump),s&&(e.dump="&ref_"+l+" "+e.dump));else if("[object Array]"===a){var u=e.noArrayIndent?t-1:t;i&&0!==e.dump.length?(writeBlockSequence(e,u,e.dump,r),s&&(e.dump="&ref_"+l+e.dump)):(writeFlowSequence(e,u,e.dump),s&&(e.dump="&ref_"+l+" "+e.dump))}else{if("[object String]"!==a){if(e.skipInvalid)return!1;throw new YAMLException("unacceptable kind of an object to dump "+a)}"?"!==e.tag&&writeScalar(e,e.dump,t,o)}null!==e.tag&&"?"!==e.tag&&(e.dump="!<"+e.tag+"> "+e.dump)}return!0}function getDuplicateReferences(e,t){var n,i,r=[],o=[];for(inspectNode(e,r,o),n=0,i=o.length;n<i;n+=1)t.duplicates.push(r[o[n]]);t.usedDuplicates=new Array(i)}function inspectNode(e,t,n){var i,r,o;if(null!==e&&"object"==typeof e)if(-1!==(r=t.indexOf(e)))-1===n.indexOf(r)&&n.push(r);else if(t.push(e),Array.isArray(e))for(r=0,o=e.length;r<o;r+=1)inspectNode(e[r],t,n);else for(r=0,o=(i=Object.keys(e)).length;r<o;r+=1)inspectNode(e[i[r]],t,n)}function dump(e,t){var n=new State(t=t||{});return n.noRefs||getDuplicateReferences(e,n),writeNode(n,0,e,!0,!0)?n.dump+"\n":""}function safeDump(e,t){return dump(e,common.extend({schema:DEFAULT_SAFE_SCHEMA},t))}module.exports.dump=dump,module.exports.safeDump=safeDump},{"./common":36,"./exception":38,"./schema/default_full":43,"./schema/default_safe":44}],38:[function(require,module,exports){"use strict";function YAMLException(t,r){Error.call(this),this.name="YAMLException",this.reason=t,this.mark=r,this.message=(this.reason||"(unknown reason)")+(this.mark?" "+this.mark.toString():""),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack||""}YAMLException.prototype=Object.create(Error.prototype),YAMLException.prototype.constructor=YAMLException,YAMLException.prototype.toString=function(t){var r=this.name+": ";return r+=this.reason||"(unknown reason)",!t&&this.mark&&(r+=" "+this.mark.toString()),r},module.exports=YAMLException},{}],39:[function(require,module,exports){"use strict";var common=require("./common"),YAMLException=require("./exception"),Mark=require("./mark"),DEFAULT_SAFE_SCHEMA=require("./schema/default_safe"),DEFAULT_FULL_SCHEMA=require("./schema/default_full"),_hasOwnProperty=Object.prototype.hasOwnProperty,CONTEXT_FLOW_IN=1,CONTEXT_FLOW_OUT=2,CONTEXT_BLOCK_IN=3,CONTEXT_BLOCK_OUT=4,CHOMPING_CLIP=1,CHOMPING_STRIP=2,CHOMPING_KEEP=3,PATTERN_NON_PRINTABLE=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,PATTERN_NON_ASCII_LINE_BREAKS=/[\x85\u2028\u2029]/,PATTERN_FLOW_INDICATORS=/[,\[\]\{\}]/,PATTERN_TAG_HANDLE=/^(?:!|!!|![a-z\-]+!)$/i,PATTERN_TAG_URI=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function is_EOL(e){return 10===e||13===e}function is_WHITE_SPACE(e){return 9===e||32===e}function is_WS_OR_EOL(e){return 9===e||32===e||10===e||13===e}function is_FLOW_INDICATOR(e){return 44===e||91===e||93===e||123===e||125===e}function fromHexCode(e){var t;return 48<=e&&e<=57?e-48:97<=(t=32|e)&&t<=102?t-97+10:-1}function escapedHexLen(e){return 120===e?2:117===e?4:85===e?8:0}function fromDecimalCode(e){return 48<=e&&e<=57?e-48:-1}function simpleEscapeSequence(e){return 48===e?"\0":97===e?"":98===e?"\b":116===e?"\t":9===e?"\t":110===e?"\n":118===e?"\v":102===e?"\f":114===e?"\r":101===e?"":32===e?" ":34===e?'"':47===e?"/":92===e?"\\":78===e?"":95===e?" ":76===e?"\u2028":80===e?"\u2029":""}function charFromCodepoint(e){return e<=65535?String.fromCharCode(e):String.fromCharCode(55296+(e-65536>>10),56320+(e-65536&1023))}for(var simpleEscapeCheck=new Array(256),simpleEscapeMap=new Array(256),i=0;i<256;i++)simpleEscapeCheck[i]=simpleEscapeSequence(i)?1:0,simpleEscapeMap[i]=simpleEscapeSequence(i);function State(e,t){this.input=e,this.filename=t.filename||null,this.schema=t.schema||DEFAULT_FULL_SCHEMA,this.onWarning=t.onWarning||null,this.legacy=t.legacy||!1,this.json=t.json||!1,this.listener=t.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.documents=[]}function generateError(e,t){return new YAMLException(t,new Mark(e.filename,e.input,e.position,e.line,e.position-e.lineStart))}function throwError(e,t){throw generateError(e,t)}function throwWarning(e,t){e.onWarning&&e.onWarning.call(null,generateError(e,t))}var directiveHandlers={YAML:function(e,t,n){var i,o,r;null!==e.version&&throwError(e,"duplication of %YAML directive"),1!==n.length&&throwError(e,"YAML directive accepts exactly one argument"),null===(i=/^([0-9]+)\.([0-9]+)$/.exec(n[0]))&&throwError(e,"ill-formed argument of the YAML directive"),o=parseInt(i[1],10),r=parseInt(i[2],10),1!==o&&throwError(e,"unacceptable YAML version of the document"),e.version=n[0],e.checkLineBreaks=r<2,1!==r&&2!==r&&throwWarning(e,"unsupported YAML version of the document")},TAG:function(e,t,n){var i,o;2!==n.length&&throwError(e,"TAG directive accepts exactly two arguments"),i=n[0],o=n[1],PATTERN_TAG_HANDLE.test(i)||throwError(e,"ill-formed tag handle (first argument) of the TAG directive"),_hasOwnProperty.call(e.tagMap,i)&&throwError(e,'there is a previously declared suffix for "'+i+'" tag handle'),PATTERN_TAG_URI.test(o)||throwError(e,"ill-formed tag prefix (second argument) of the TAG directive"),e.tagMap[i]=o}};function captureSegment(e,t,n,i){var o,r,a,s;if(t<n){if(s=e.input.slice(t,n),i)for(o=0,r=s.length;o<r;o+=1)9===(a=s.charCodeAt(o))||32<=a&&a<=1114111||throwError(e,"expected valid JSON character");else PATTERN_NON_PRINTABLE.test(s)&&throwError(e,"the stream contains non-printable characters");e.result+=s}}function mergeMappings(e,t,n,i){var o,r,a,s;for(common.isObject(n)||throwError(e,"cannot merge mappings; the provided source object is unacceptable"),a=0,s=(o=Object.keys(n)).length;a<s;a+=1)r=o[a],_hasOwnProperty.call(t,r)||(t[r]=n[r],i[r]=!0)}function storeMappingPair(e,t,n,i,o,r,a,s){var p,c;if(o=String(o),null===t&&(t={}),"tag:yaml.org,2002:merge"===i)if(Array.isArray(r))for(p=0,c=r.length;p<c;p+=1)mergeMappings(e,t,r[p],n);else mergeMappings(e,t,r,n);else e.json||_hasOwnProperty.call(n,o)||!_hasOwnProperty.call(t,o)||(e.line=a||e.line,e.position=s||e.position,throwError(e,"duplicated mapping key")),t[o]=r,delete n[o];return t}function readLineBreak(e){var t;10===(t=e.input.charCodeAt(e.position))?e.position++:13===t?(e.position++,10===e.input.charCodeAt(e.position)&&e.position++):throwError(e,"a line break is expected"),e.line+=1,e.lineStart=e.position}function skipSeparationSpace(e,t,n){for(var i=0,o=e.input.charCodeAt(e.position);0!==o;){for(;is_WHITE_SPACE(o);)o=e.input.charCodeAt(++e.position);if(t&&35===o)do{o=e.input.charCodeAt(++e.position)}while(10!==o&&13!==o&&0!==o);if(!is_EOL(o))break;for(readLineBreak(e),o=e.input.charCodeAt(e.position),i++,e.lineIndent=0;32===o;)e.lineIndent++,o=e.input.charCodeAt(++e.position)}return-1!==n&&0!==i&&e.lineIndent<n&&throwWarning(e,"deficient indentation"),i}function testDocumentSeparator(e){var t,n=e.position;return!(45!==(t=e.input.charCodeAt(n))&&46!==t||t!==e.input.charCodeAt(n+1)||t!==e.input.charCodeAt(n+2)||(n+=3,0!==(t=e.input.charCodeAt(n))&&!is_WS_OR_EOL(t)))}function writeFoldedLines(e,t){1===t?e.result+=" ":t>1&&(e.result+=common.repeat("\n",t-1))}function readPlainScalar(e,t,n){var i,o,r,a,s,p,c,l,u=e.kind,d=e.result;if(is_WS_OR_EOL(l=e.input.charCodeAt(e.position))||is_FLOW_INDICATOR(l)||35===l||38===l||42===l||33===l||124===l||62===l||39===l||34===l||37===l||64===l||96===l)return!1;if((63===l||45===l)&&(is_WS_OR_EOL(i=e.input.charCodeAt(e.position+1))||n&&is_FLOW_INDICATOR(i)))return!1;for(e.kind="scalar",e.result="",o=r=e.position,a=!1;0!==l;){if(58===l){if(is_WS_OR_EOL(i=e.input.charCodeAt(e.position+1))||n&&is_FLOW_INDICATOR(i))break}else if(35===l){if(is_WS_OR_EOL(e.input.charCodeAt(e.position-1)))break}else{if(e.position===e.lineStart&&testDocumentSeparator(e)||n&&is_FLOW_INDICATOR(l))break;if(is_EOL(l)){if(s=e.line,p=e.lineStart,c=e.lineIndent,skipSeparationSpace(e,!1,-1),e.lineIndent>=t){a=!0,l=e.input.charCodeAt(e.position);continue}e.position=r,e.line=s,e.lineStart=p,e.lineIndent=c;break}}a&&(captureSegment(e,o,r,!1),writeFoldedLines(e,e.line-s),o=r=e.position,a=!1),is_WHITE_SPACE(l)||(r=e.position+1),l=e.input.charCodeAt(++e.position)}return captureSegment(e,o,r,!1),!!e.result||(e.kind=u,e.result=d,!1)}function readSingleQuotedScalar(e,t){var n,i,o;if(39!==(n=e.input.charCodeAt(e.position)))return!1;for(e.kind="scalar",e.result="",e.position++,i=o=e.position;0!==(n=e.input.charCodeAt(e.position));)if(39===n){if(captureSegment(e,i,e.position,!0),39!==(n=e.input.charCodeAt(++e.position)))return!0;i=e.position,e.position++,o=e.position}else is_EOL(n)?(captureSegment(e,i,o,!0),writeFoldedLines(e,skipSeparationSpace(e,!1,t)),i=o=e.position):e.position===e.lineStart&&testDocumentSeparator(e)?throwError(e,"unexpected end of the document within a single quoted scalar"):(e.position++,o=e.position);throwError(e,"unexpected end of the stream within a single quoted scalar")}function readDoubleQuotedScalar(e,t){var n,i,o,r,a,s;if(34!==(s=e.input.charCodeAt(e.position)))return!1;for(e.kind="scalar",e.result="",e.position++,n=i=e.position;0!==(s=e.input.charCodeAt(e.position));){if(34===s)return captureSegment(e,n,e.position,!0),e.position++,!0;if(92===s){if(captureSegment(e,n,e.position,!0),is_EOL(s=e.input.charCodeAt(++e.position)))skipSeparationSpace(e,!1,t);else if(s<256&&simpleEscapeCheck[s])e.result+=simpleEscapeMap[s],e.position++;else if((a=escapedHexLen(s))>0){for(o=a,r=0;o>0;o--)(a=fromHexCode(s=e.input.charCodeAt(++e.position)))>=0?r=(r<<4)+a:throwError(e,"expected hexadecimal character");e.result+=charFromCodepoint(r),e.position++}else throwError(e,"unknown escape sequence");n=i=e.position}else is_EOL(s)?(captureSegment(e,n,i,!0),writeFoldedLines(e,skipSeparationSpace(e,!1,t)),n=i=e.position):e.position===e.lineStart&&testDocumentSeparator(e)?throwError(e,"unexpected end of the document within a double quoted scalar"):(e.position++,i=e.position)}throwError(e,"unexpected end of the stream within a double quoted scalar")}function readFlowCollection(e,t){var n,i,o,r,a,s,p,c,l,u,d=!0,h=e.tag,f=e.anchor,_={};if(91===(u=e.input.charCodeAt(e.position)))o=93,s=!1,i=[];else{if(123!==u)return!1;o=125,s=!0,i={}}for(null!==e.anchor&&(e.anchorMap[e.anchor]=i),u=e.input.charCodeAt(++e.position);0!==u;){if(skipSeparationSpace(e,!0,t),(u=e.input.charCodeAt(e.position))===o)return e.position++,e.tag=h,e.anchor=f,e.kind=s?"mapping":"sequence",e.result=i,!0;d||throwError(e,"missed comma between flow collection entries"),l=null,r=a=!1,63===u&&is_WS_OR_EOL(e.input.charCodeAt(e.position+1))&&(r=a=!0,e.position++,skipSeparationSpace(e,!0,t)),n=e.line,composeNode(e,t,CONTEXT_FLOW_IN,!1,!0),c=e.tag,p=e.result,skipSeparationSpace(e,!0,t),u=e.input.charCodeAt(e.position),!a&&e.line!==n||58!==u||(r=!0,u=e.input.charCodeAt(++e.position),skipSeparationSpace(e,!0,t),composeNode(e,t,CONTEXT_FLOW_IN,!1,!0),l=e.result),s?storeMappingPair(e,i,_,c,p,l):r?i.push(storeMappingPair(e,null,_,c,p,l)):i.push(p),skipSeparationSpace(e,!0,t),44===(u=e.input.charCodeAt(e.position))?(d=!0,u=e.input.charCodeAt(++e.position)):d=!1}throwError(e,"unexpected end of the stream within a flow collection")}function readBlockScalar(e,t){var n,i,o,r,a=CHOMPING_CLIP,s=!1,p=!1,c=t,l=0,u=!1;if(124===(r=e.input.charCodeAt(e.position)))i=!1;else{if(62!==r)return!1;i=!0}for(e.kind="scalar",e.result="";0!==r;)if(43===(r=e.input.charCodeAt(++e.position))||45===r)CHOMPING_CLIP===a?a=43===r?CHOMPING_KEEP:CHOMPING_STRIP:throwError(e,"repeat of a chomping mode identifier");else{if(!((o=fromDecimalCode(r))>=0))break;0===o?throwError(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):p?throwError(e,"repeat of an indentation width identifier"):(c=t+o-1,p=!0)}if(is_WHITE_SPACE(r)){do{r=e.input.charCodeAt(++e.position)}while(is_WHITE_SPACE(r));if(35===r)do{r=e.input.charCodeAt(++e.position)}while(!is_EOL(r)&&0!==r)}for(;0!==r;){for(readLineBreak(e),e.lineIndent=0,r=e.input.charCodeAt(e.position);(!p||e.lineIndent<c)&&32===r;)e.lineIndent++,r=e.input.charCodeAt(++e.position);if(!p&&e.lineIndent>c&&(c=e.lineIndent),is_EOL(r))l++;else{if(e.lineIndent<c){a===CHOMPING_KEEP?e.result+=common.repeat("\n",s?1+l:l):a===CHOMPING_CLIP&&s&&(e.result+="\n");break}for(i?is_WHITE_SPACE(r)?(u=!0,e.result+=common.repeat("\n",s?1+l:l)):u?(u=!1,e.result+=common.repeat("\n",l+1)):0===l?s&&(e.result+=" "):e.result+=common.repeat("\n",l):e.result+=common.repeat("\n",s?1+l:l),s=!0,p=!0,l=0,n=e.position;!is_EOL(r)&&0!==r;)r=e.input.charCodeAt(++e.position);captureSegment(e,n,e.position,!1)}}return!0}function readBlockSequence(e,t){var n,i,o=e.tag,r=e.anchor,a=[],s=!1;for(null!==e.anchor&&(e.anchorMap[e.anchor]=a),i=e.input.charCodeAt(e.position);0!==i&&45===i&&is_WS_OR_EOL(e.input.charCodeAt(e.position+1));)if(s=!0,e.position++,skipSeparationSpace(e,!0,-1)&&e.lineIndent<=t)a.push(null),i=e.input.charCodeAt(e.position);else if(n=e.line,composeNode(e,t,CONTEXT_BLOCK_IN,!1,!0),a.push(e.result),skipSeparationSpace(e,!0,-1),i=e.input.charCodeAt(e.position),(e.line===n||e.lineIndent>t)&&0!==i)throwError(e,"bad indentation of a sequence entry");else if(e.lineIndent<t)break;return!!s&&(e.tag=o,e.anchor=r,e.kind="sequence",e.result=a,!0)}function readBlockMapping(e,t,n){var i,o,r,a,s,p=e.tag,c=e.anchor,l={},u={},d=null,h=null,f=null,_=!1,A=!1;for(null!==e.anchor&&(e.anchorMap[e.anchor]=l),s=e.input.charCodeAt(e.position);0!==s;){if(i=e.input.charCodeAt(e.position+1),r=e.line,a=e.position,63!==s&&58!==s||!is_WS_OR_EOL(i)){if(!composeNode(e,n,CONTEXT_FLOW_OUT,!1,!0))break;if(e.line===r){for(s=e.input.charCodeAt(e.position);is_WHITE_SPACE(s);)s=e.input.charCodeAt(++e.position);if(58===s)is_WS_OR_EOL(s=e.input.charCodeAt(++e.position))||throwError(e,"a whitespace character is expected after the key-value separator within a block mapping"),_&&(storeMappingPair(e,l,u,d,h,null),d=h=f=null),A=!0,_=!1,o=!1,d=e.tag,h=e.result;else{if(!A)return e.tag=p,e.anchor=c,!0;throwError(e,"can not read an implicit mapping pair; a colon is missed")}}else{if(!A)return e.tag=p,e.anchor=c,!0;throwError(e,"can not read a block mapping entry; a multiline key may not be an implicit key")}}else 63===s?(_&&(storeMappingPair(e,l,u,d,h,null),d=h=f=null),A=!0,_=!0,o=!0):_?(_=!1,o=!0):throwError(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,s=i;if((e.line===r||e.lineIndent>t)&&(composeNode(e,t,CONTEXT_BLOCK_OUT,!0,o)&&(_?h=e.result:f=e.result),_||(storeMappingPair(e,l,u,d,h,f,r,a),d=h=f=null),skipSeparationSpace(e,!0,-1),s=e.input.charCodeAt(e.position)),e.lineIndent>t&&0!==s)throwError(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return _&&storeMappingPair(e,l,u,d,h,null),A&&(e.tag=p,e.anchor=c,e.kind="mapping",e.result=l),A}function readTagProperty(e){var t,n,i,o,r=!1,a=!1;if(33!==(o=e.input.charCodeAt(e.position)))return!1;if(null!==e.tag&&throwError(e,"duplication of a tag property"),60===(o=e.input.charCodeAt(++e.position))?(r=!0,o=e.input.charCodeAt(++e.position)):33===o?(a=!0,n="!!",o=e.input.charCodeAt(++e.position)):n="!",t=e.position,r){do{o=e.input.charCodeAt(++e.position)}while(0!==o&&62!==o);e.position<e.length?(i=e.input.slice(t,e.position),o=e.input.charCodeAt(++e.position)):throwError(e,"unexpected end of the stream within a verbatim tag")}else{for(;0!==o&&!is_WS_OR_EOL(o);)33===o&&(a?throwError(e,"tag suffix cannot contain exclamation marks"):(n=e.input.slice(t-1,e.position+1),PATTERN_TAG_HANDLE.test(n)||throwError(e,"named tag handle cannot contain such characters"),a=!0,t=e.position+1)),o=e.input.charCodeAt(++e.position);i=e.input.slice(t,e.position),PATTERN_FLOW_INDICATORS.test(i)&&throwError(e,"tag suffix cannot contain flow indicator characters")}return i&&!PATTERN_TAG_URI.test(i)&&throwError(e,"tag name cannot contain such characters: "+i),r?e.tag=i:_hasOwnProperty.call(e.tagMap,n)?e.tag=e.tagMap[n]+i:"!"===n?e.tag="!"+i:"!!"===n?e.tag="tag:yaml.org,2002:"+i:throwError(e,'undeclared tag handle "'+n+'"'),!0}function readAnchorProperty(e){var t,n;if(38!==(n=e.input.charCodeAt(e.position)))return!1;for(null!==e.anchor&&throwError(e,"duplication of an anchor property"),n=e.input.charCodeAt(++e.position),t=e.position;0!==n&&!is_WS_OR_EOL(n)&&!is_FLOW_INDICATOR(n);)n=e.input.charCodeAt(++e.position);return e.position===t&&throwError(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(t,e.position),!0}function readAlias(e){var t,n,i;if(42!==(i=e.input.charCodeAt(e.position)))return!1;for(i=e.input.charCodeAt(++e.position),t=e.position;0!==i&&!is_WS_OR_EOL(i)&&!is_FLOW_INDICATOR(i);)i=e.input.charCodeAt(++e.position);return e.position===t&&throwError(e,"name of an alias node must contain at least one character"),n=e.input.slice(t,e.position),e.anchorMap.hasOwnProperty(n)||throwError(e,'unidentified alias "'+n+'"'),e.result=e.anchorMap[n],skipSeparationSpace(e,!0,-1),!0}function composeNode(e,t,n,i,o){var r,a,s,p,c,l,u,d,h=1,f=!1,_=!1;if(null!==e.listener&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,r=a=s=CONTEXT_BLOCK_OUT===n||CONTEXT_BLOCK_IN===n,i&&skipSeparationSpace(e,!0,-1)&&(f=!0,e.lineIndent>t?h=1:e.lineIndent===t?h=0:e.lineIndent<t&&(h=-1)),1===h)for(;readTagProperty(e)||readAnchorProperty(e);)skipSeparationSpace(e,!0,-1)?(f=!0,s=r,e.lineIndent>t?h=1:e.lineIndent===t?h=0:e.lineIndent<t&&(h=-1)):s=!1;if(s&&(s=f||o),1!==h&&CONTEXT_BLOCK_OUT!==n||(u=CONTEXT_FLOW_IN===n||CONTEXT_FLOW_OUT===n?t:t+1,d=e.position-e.lineStart,1===h?s&&(readBlockSequence(e,d)||readBlockMapping(e,d,u))||readFlowCollection(e,u)?_=!0:(a&&readBlockScalar(e,u)||readSingleQuotedScalar(e,u)||readDoubleQuotedScalar(e,u)?_=!0:readAlias(e)?(_=!0,null===e.tag&&null===e.anchor||throwError(e,"alias node should not have any properties")):readPlainScalar(e,u,CONTEXT_FLOW_IN===n)&&(_=!0,null===e.tag&&(e.tag="?")),null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)):0===h&&(_=s&&readBlockSequence(e,d))),null!==e.tag&&"!"!==e.tag)if("?"===e.tag){for(p=0,c=e.implicitTypes.length;p<c;p+=1)if((l=e.implicitTypes[p]).resolve(e.result)){e.result=l.construct(e.result),e.tag=l.tag,null!==e.anchor&&(e.anchorMap[e.anchor]=e.result);break}}else _hasOwnProperty.call(e.typeMap[e.kind||"fallback"],e.tag)?(l=e.typeMap[e.kind||"fallback"][e.tag],null!==e.result&&l.kind!==e.kind&&throwError(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+l.kind+'", not "'+e.kind+'"'),l.resolve(e.result)?(e.result=l.construct(e.result),null!==e.anchor&&(e.anchorMap[e.anchor]=e.result)):throwError(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")):throwError(e,"unknown tag !<"+e.tag+">");return null!==e.listener&&e.listener("close",e),null!==e.tag||null!==e.anchor||_}function readDocument(e){var t,n,i,o,r=e.position,a=!1;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap={},e.anchorMap={};0!==(o=e.input.charCodeAt(e.position))&&(skipSeparationSpace(e,!0,-1),o=e.input.charCodeAt(e.position),!(e.lineIndent>0||37!==o));){for(a=!0,o=e.input.charCodeAt(++e.position),t=e.position;0!==o&&!is_WS_OR_EOL(o);)o=e.input.charCodeAt(++e.position);for(i=[],(n=e.input.slice(t,e.position)).length<1&&throwError(e,"directive name must not be less than one character in length");0!==o;){for(;is_WHITE_SPACE(o);)o=e.input.charCodeAt(++e.position);if(35===o){do{o=e.input.charCodeAt(++e.position)}while(0!==o&&!is_EOL(o));break}if(is_EOL(o))break;for(t=e.position;0!==o&&!is_WS_OR_EOL(o);)o=e.input.charCodeAt(++e.position);i.push(e.input.slice(t,e.position))}0!==o&&readLineBreak(e),_hasOwnProperty.call(directiveHandlers,n)?directiveHandlers[n](e,n,i):throwWarning(e,'unknown document directive "'+n+'"')}skipSeparationSpace(e,!0,-1),0===e.lineIndent&&45===e.input.charCodeAt(e.position)&&45===e.input.charCodeAt(e.position+1)&&45===e.input.charCodeAt(e.position+2)?(e.position+=3,skipSeparationSpace(e,!0,-1)):a&&throwError(e,"directives end mark is expected"),composeNode(e,e.lineIndent-1,CONTEXT_BLOCK_OUT,!1,!0),skipSeparationSpace(e,!0,-1),e.checkLineBreaks&&PATTERN_NON_ASCII_LINE_BREAKS.test(e.input.slice(r,e.position))&&throwWarning(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&testDocumentSeparator(e)?46===e.input.charCodeAt(e.position)&&(e.position+=3,skipSeparationSpace(e,!0,-1)):e.position<e.length-1&&throwError(e,"end of the stream or a document separator is expected")}function loadDocuments(e,t){t=t||{},0!==(e=String(e)).length&&(10!==e.charCodeAt(e.length-1)&&13!==e.charCodeAt(e.length-1)&&(e+="\n"),65279===e.charCodeAt(0)&&(e=e.slice(1)));var n=new State(e,t);for(n.input+="\0";32===n.input.charCodeAt(n.position);)n.lineIndent+=1,n.position+=1;for(;n.position<n.length-1;)readDocument(n);return n.documents}function loadAll(e,t,n){var i,o,r=loadDocuments(e,n);if("function"!=typeof t)return r;for(i=0,o=r.length;i<o;i+=1)t(r[i])}function load(e,t){var n=loadDocuments(e,t);if(0!==n.length){if(1===n.length)return n[0];throw new YAMLException("expected a single document in the stream, but found more")}}function safeLoadAll(e,t,n){if("function"!=typeof t)return loadAll(e,common.extend({schema:DEFAULT_SAFE_SCHEMA},n));loadAll(e,t,common.extend({schema:DEFAULT_SAFE_SCHEMA},n))}function safeLoad(e,t){return load(e,common.extend({schema:DEFAULT_SAFE_SCHEMA},t))}module.exports.loadAll=loadAll,module.exports.load=load,module.exports.safeLoadAll=safeLoadAll,module.exports.safeLoad=safeLoad},{"./common":36,"./exception":38,"./mark":40,"./schema/default_full":43,"./schema/default_safe":44}],40:[function(require,module,exports){"use strict";var common=require("./common");function Mark(t,i,n,e,r){this.name=t,this.buffer=i,this.position=n,this.line=e,this.column=r}Mark.prototype.getSnippet=function(t,i){var n,e,r,o,s;if(!this.buffer)return null;for(t=t||4,i=i||75,n="",e=this.position;e>0&&-1==="\0\r\n\u2028\u2029".indexOf(this.buffer.charAt(e-1));)if(e-=1,this.position-e>i/2-1){n=" ... ",e+=5;break}for(r="",o=this.position;o<this.buffer.length&&-1==="\0\r\n\u2028\u2029".indexOf(this.buffer.charAt(o));)if((o+=1)-this.position>i/2-1){r=" ... ",o-=5;break}return s=this.buffer.slice(e,o),common.repeat(" ",t)+n+s+r+"\n"+common.repeat(" ",t+this.position-e+n.length)+"^"},Mark.prototype.toString=function(t){var i,n="";return this.name&&(n+='in "'+this.name+'" '),n+="at line "+(this.line+1)+", column "+(this.column+1),t||(i=this.getSnippet())&&(n+=":\n"+i),n},module.exports=Mark},{"./common":36}],41:[function(require,module,exports){"use strict";var common=require("./common"),YAMLException=require("./exception"),Type=require("./type");function compileList(i,e,t){var c=[];return i.include.forEach(function(i){t=compileList(i,e,t)}),i[e].forEach(function(i){t.forEach(function(e,t){e.tag===i.tag&&e.kind===i.kind&&c.push(t)}),t.push(i)}),t.filter(function(i,e){return-1===c.indexOf(e)})}function compileMap(){var i,e,t={scalar:{},sequence:{},mapping:{},fallback:{}};function c(i){t[i.kind][i.tag]=t.fallback[i.tag]=i}for(i=0,e=arguments.length;i<e;i+=1)arguments[i].forEach(c);return t}function Schema(i){this.include=i.include||[],this.implicit=i.implicit||[],this.explicit=i.explicit||[],this.implicit.forEach(function(i){if(i.loadKind&&"scalar"!==i.loadKind)throw new YAMLException("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.")}),this.compiledImplicit=compileList(this,"implicit",[]),this.compiledExplicit=compileList(this,"explicit",[]),this.compiledTypeMap=compileMap(this.compiledImplicit,this.compiledExplicit)}Schema.DEFAULT=null,Schema.create=function(){var i,e;switch(arguments.length){case 1:i=Schema.DEFAULT,e=arguments[0];break;case 2:i=arguments[0],e=arguments[1];break;default:throw new YAMLException("Wrong number of arguments for Schema.create function")}if(i=common.toArray(i),e=common.toArray(e),!i.every(function(i){return i instanceof Schema}))throw new YAMLException("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");if(!e.every(function(i){return i instanceof Type}))throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");return new Schema({include:i,explicit:e})},module.exports=Schema},{"./common":36,"./exception":38,"./type":47}],42:[function(require,module,exports){"use strict";var Schema=require("../schema");module.exports=new Schema({include:[require("./json")]})},{"../schema":41,"./json":46}],43:[function(require,module,exports){"use strict";var Schema=require("../schema");module.exports=Schema.DEFAULT=new Schema({include:[require("./default_safe")],explicit:[require("../type/js/undefined"),require("../type/js/regexp"),require("../type/js/function")]})},{"../schema":41,"../type/js/function":52,"../type/js/regexp":53,"../type/js/undefined":54,"./default_safe":44}],44:[function(require,module,exports){"use strict";var Schema=require("../schema");module.exports=new Schema({include:[require("./core")],implicit:[require("../type/timestamp"),require("../type/merge")],explicit:[require("../type/binary"),require("../type/omap"),require("../type/pairs"),require("../type/set")]})},{"../schema":41,"../type/binary":48,"../type/merge":56,"../type/omap":58,"../type/pairs":59,"../type/set":61,"../type/timestamp":63,"./core":42}],45:[function(require,module,exports){"use strict";var Schema=require("../schema");module.exports=new Schema({explicit:[require("../type/str"),require("../type/seq"),require("../type/map")]})},{"../schema":41,"../type/map":55,"../type/seq":60,"../type/str":62}],46:[function(require,module,exports){"use strict";var Schema=require("../schema");module.exports=new Schema({include:[require("./failsafe")],implicit:[require("../type/null"),require("../type/bool"),require("../type/int"),require("../type/float")]})},{"../schema":41,"../type/bool":49,"../type/float":50,"../type/int":51,"../type/null":57,"./failsafe":45}],47:[function(require,module,exports){"use strict";var YAMLException=require("./exception"),TYPE_CONSTRUCTOR_OPTIONS=["kind","resolve","construct","instanceOf","predicate","represent","defaultStyle","styleAliases"],YAML_NODE_KINDS=["scalar","sequence","mapping"];function compileStyleAliases(e){var t={};return null!==e&&Object.keys(e).forEach(function(n){e[n].forEach(function(e){t[String(e)]=n})}),t}function Type(e,t){if(t=t||{},Object.keys(t).forEach(function(t){if(-1===TYPE_CONSTRUCTOR_OPTIONS.indexOf(t))throw new YAMLException('Unknown option "'+t+'" is met in definition of "'+e+'" YAML type.')}),this.tag=e,this.kind=t.kind||null,this.resolve=t.resolve||function(){return!0},this.construct=t.construct||function(e){return e},this.instanceOf=t.instanceOf||null,this.predicate=t.predicate||null,this.represent=t.represent||null,this.defaultStyle=t.defaultStyle||null,this.styleAliases=compileStyleAliases(t.styleAliases||null),-1===YAML_NODE_KINDS.indexOf(this.kind))throw new YAMLException('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')}module.exports=Type},{"./exception":38}],48:[function(require,module,exports){"use strict";var NodeBuffer;try{var _require=require;NodeBuffer=_require("buffer").Buffer}catch(r){}var Type=require("../type"),BASE64_MAP="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";function resolveYamlBinary(r){if(null===r)return!1;var e,n,u=0,f=r.length,t=BASE64_MAP;for(n=0;n<f;n++)if(!((e=t.indexOf(r.charAt(n)))>64)){if(e<0)return!1;u+=6}return u%8==0}function constructYamlBinary(r){var e,n,u=r.replace(/[\r\n=]/g,""),f=u.length,t=BASE64_MAP,a=0,i=[];for(e=0;e<f;e++)e%4==0&&e&&(i.push(a>>16&255),i.push(a>>8&255),i.push(255&a)),a=a<<6|t.indexOf(u.charAt(e));return 0===(n=f%4*6)?(i.push(a>>16&255),i.push(a>>8&255),i.push(255&a)):18===n?(i.push(a>>10&255),i.push(a>>2&255)):12===n&&i.push(a>>4&255),NodeBuffer?NodeBuffer.from?NodeBuffer.from(i):new NodeBuffer(i):i}function representYamlBinary(r){var e,n,u="",f=0,t=r.length,a=BASE64_MAP;for(e=0;e<t;e++)e%3==0&&e&&(u+=a[f>>18&63],u+=a[f>>12&63],u+=a[f>>6&63],u+=a[63&f]),f=(f<<8)+r[e];return 0===(n=t%3)?(u+=a[f>>18&63],u+=a[f>>12&63],u+=a[f>>6&63],u+=a[63&f]):2===n?(u+=a[f>>10&63],u+=a[f>>4&63],u+=a[f<<2&63],u+=a[64]):1===n&&(u+=a[f>>2&63],u+=a[f<<4&63],u+=a[64],u+=a[64]),u}function isBinary(r){return NodeBuffer&&NodeBuffer.isBuffer(r)}module.exports=new Type("tag:yaml.org,2002:binary",{kind:"scalar",resolve:resolveYamlBinary,construct:constructYamlBinary,predicate:isBinary,represent:representYamlBinary})},{"../type":47}],49:[function(require,module,exports){"use strict";var Type=require("../type");function resolveYamlBoolean(e){if(null===e)return!1;var r=e.length;return 4===r&&("true"===e||"True"===e||"TRUE"===e)||5===r&&("false"===e||"False"===e||"FALSE"===e)}function constructYamlBoolean(e){return"true"===e||"True"===e||"TRUE"===e}function isBoolean(e){return"[object Boolean]"===Object.prototype.toString.call(e)}module.exports=new Type("tag:yaml.org,2002:bool",{kind:"scalar",resolve:resolveYamlBoolean,construct:constructYamlBoolean,predicate:isBoolean,represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"})},{"../type":47}],50:[function(require,module,exports){"use strict";var common=require("../common"),Type=require("../type"),YAML_FLOAT_PATTERN=new RegExp("^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function resolveYamlFloat(e){return null!==e&&!(!YAML_FLOAT_PATTERN.test(e)||"_"===e[e.length-1])}function constructYamlFloat(e){var r,t,a,n;return t="-"===(r=e.replace(/_/g,"").toLowerCase())[0]?-1:1,n=[],"+-".indexOf(r[0])>=0&&(r=r.slice(1)),".inf"===r?1===t?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:".nan"===r?NaN:r.indexOf(":")>=0?(r.split(":").forEach(function(e){n.unshift(parseFloat(e,10))}),r=0,a=1,n.forEach(function(e){r+=e*a,a*=60}),t*r):t*parseFloat(r,10)}var SCIENTIFIC_WITHOUT_DOT=/^[-+]?[0-9]+e/;function representYamlFloat(e,r){var t;if(isNaN(e))switch(r){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(r){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(r){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(common.isNegativeZero(e))return"-0.0";return t=e.toString(10),SCIENTIFIC_WITHOUT_DOT.test(t)?t.replace("e",".e"):t}function isFloat(e){return"[object Number]"===Object.prototype.toString.call(e)&&(e%1!=0||common.isNegativeZero(e))}module.exports=new Type("tag:yaml.org,2002:float",{kind:"scalar",resolve:resolveYamlFloat,construct:constructYamlFloat,predicate:isFloat,represent:representYamlFloat,defaultStyle:"lowercase"})},{"../common":36,"../type":47}],51:[function(require,module,exports){"use strict";var common=require("../common"),Type=require("../type");function isHexCode(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function isOctCode(e){return 48<=e&&e<=55}function isDecCode(e){return 48<=e&&e<=57}function resolveYamlInteger(e){if(null===e)return!1;var r,t=e.length,n=0,i=!1;if(!t)return!1;if("-"!==(r=e[n])&&"+"!==r||(r=e[++n]),"0"===r){if(n+1===t)return!0;if("b"===(r=e[++n])){for(n++;n<t;n++)if("_"!==(r=e[n])){if("0"!==r&&"1"!==r)return!1;i=!0}return i&&"_"!==r}if("x"===r){for(n++;n<t;n++)if("_"!==(r=e[n])){if(!isHexCode(e.charCodeAt(n)))return!1;i=!0}return i&&"_"!==r}for(;n<t;n++)if("_"!==(r=e[n])){if(!isOctCode(e.charCodeAt(n)))return!1;i=!0}return i&&"_"!==r}if("_"===r)return!1;for(;n<t;n++)if("_"!==(r=e[n])){if(":"===r)break;if(!isDecCode(e.charCodeAt(n)))return!1;i=!0}return!(!i||"_"===r)&&(":"!==r||/^(:[0-5]?[0-9])+$/.test(e.slice(n)))}function constructYamlInteger(e){var r,t,n=e,i=1,o=[];return-1!==n.indexOf("_")&&(n=n.replace(/_/g,"")),"-"!==(r=n[0])&&"+"!==r||("-"===r&&(i=-1),r=(n=n.slice(1))[0]),"0"===n?0:"0"===r?"b"===n[1]?i*parseInt(n.slice(2),2):"x"===n[1]?i*parseInt(n,16):i*parseInt(n,8):-1!==n.indexOf(":")?(n.split(":").forEach(function(e){o.unshift(parseInt(e,10))}),n=0,t=1,o.forEach(function(e){n+=e*t,t*=60}),i*n):i*parseInt(n,10)}function isInteger(e){return"[object Number]"===Object.prototype.toString.call(e)&&e%1==0&&!common.isNegativeZero(e)}module.exports=new Type("tag:yaml.org,2002:int",{kind:"scalar",resolve:resolveYamlInteger,construct:constructYamlInteger,predicate:isInteger,represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0"+e.toString(8):"-0"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}})},{"../common":36,"../type":47}],52:[function(require,module,exports){"use strict";var esprima;try{var _require=require;esprima=_require("esprima")}catch(e){"undefined"!=typeof window&&(esprima=window.esprima)}var Type=require("../../type");function resolveJavascriptFunction(e){if(null===e)return!1;try{var r="("+e+")",n=esprima.parse(r,{range:!0});return"Program"===n.type&&1===n.body.length&&"ExpressionStatement"===n.body[0].type&&("ArrowFunctionExpression"===n.body[0].expression.type||"FunctionExpression"===n.body[0].expression.type)}catch(e){return!1}}function constructJavascriptFunction(e){var r,n="("+e+")",t=esprima.parse(n,{range:!0}),o=[];if("Program"!==t.type||1!==t.body.length||"ExpressionStatement"!==t.body[0].type||"ArrowFunctionExpression"!==t.body[0].expression.type&&"FunctionExpression"!==t.body[0].expression.type)throw new Error("Failed to resolve function");return t.body[0].expression.params.forEach(function(e){o.push(e.name)}),r=t.body[0].expression.body.range,"BlockStatement"===t.body[0].expression.body.type?new Function(o,n.slice(r[0]+1,r[1]-1)):new Function(o,"return "+n.slice(r[0],r[1]))}function representJavascriptFunction(e){return e.toString()}function isFunction(e){return"[object Function]"===Object.prototype.toString.call(e)}module.exports=new Type("tag:yaml.org,2002:js/function",{kind:"scalar",resolve:resolveJavascriptFunction,construct:constructJavascriptFunction,predicate:isFunction,represent:representJavascriptFunction})},{"../../type":47}],53:[function(require,module,exports){"use strict";var Type=require("../../type");function resolveJavascriptRegExp(e){if(null===e)return!1;if(0===e.length)return!1;var r=e,t=/\/([gim]*)$/.exec(e),n="";if("/"===r[0]){if(t&&(n=t[1]),n.length>3)return!1;if("/"!==r[r.length-n.length-1])return!1}return!0}function constructJavascriptRegExp(e){var r=e,t=/\/([gim]*)$/.exec(e),n="";return"/"===r[0]&&(t&&(n=t[1]),r=r.slice(1,r.length-n.length-1)),new RegExp(r,n)}function representJavascriptRegExp(e){var r="/"+e.source+"/";return e.global&&(r+="g"),e.multiline&&(r+="m"),e.ignoreCase&&(r+="i"),r}function isRegExp(e){return"[object RegExp]"===Object.prototype.toString.call(e)}module.exports=new Type("tag:yaml.org,2002:js/regexp",{kind:"scalar",resolve:resolveJavascriptRegExp,construct:constructJavascriptRegExp,predicate:isRegExp,represent:representJavascriptRegExp})},{"../../type":47}],54:[function(require,module,exports){"use strict";var Type=require("../../type");function resolveJavascriptUndefined(){return!0}function constructJavascriptUndefined(){}function representJavascriptUndefined(){return""}function isUndefined(e){return void 0===e}module.exports=new Type("tag:yaml.org,2002:js/undefined",{kind:"scalar",resolve:resolveJavascriptUndefined,construct:constructJavascriptUndefined,predicate:isUndefined,represent:representJavascriptUndefined})},{"../../type":47}],55:[function(require,module,exports){"use strict";var Type=require("../type");module.exports=new Type("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return null!==e?e:{}}})},{"../type":47}],56:[function(require,module,exports){"use strict";var Type=require("../type");function resolveYamlMerge(e){return"<<"===e||null===e}module.exports=new Type("tag:yaml.org,2002:merge",{kind:"scalar",resolve:resolveYamlMerge})},{"../type":47}],57:[function(require,module,exports){"use strict";var Type=require("../type");function resolveYamlNull(l){if(null===l)return!0;var e=l.length;return 1===e&&"~"===l||4===e&&("null"===l||"Null"===l||"NULL"===l)}function constructYamlNull(){return null}function isNull(l){return null===l}module.exports=new Type("tag:yaml.org,2002:null",{kind:"scalar",resolve:resolveYamlNull,construct:constructYamlNull,predicate:isNull,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"}},defaultStyle:"lowercase"})},{"../type":47}],58:[function(require,module,exports){"use strict";var Type=require("../type"),_hasOwnProperty=Object.prototype.hasOwnProperty,_toString=Object.prototype.toString;function resolveYamlOmap(r){if(null===r)return!0;var t,e,n,o,u,a=[],l=r;for(t=0,e=l.length;t<e;t+=1){if(n=l[t],u=!1,"[object Object]"!==_toString.call(n))return!1;for(o in n)if(_hasOwnProperty.call(n,o)){if(u)return!1;u=!0}if(!u)return!1;if(-1!==a.indexOf(o))return!1;a.push(o)}return!0}function constructYamlOmap(r){return null!==r?r:[]}module.exports=new Type("tag:yaml.org,2002:omap",{kind:"sequence",resolve:resolveYamlOmap,construct:constructYamlOmap})},{"../type":47}],59:[function(require,module,exports){"use strict";var Type=require("../type"),_toString=Object.prototype.toString;function resolveYamlPairs(r){if(null===r)return!0;var e,t,n,l,o,a=r;for(o=new Array(a.length),e=0,t=a.length;e<t;e+=1){if(n=a[e],"[object Object]"!==_toString.call(n))return!1;if(1!==(l=Object.keys(n)).length)return!1;o[e]=[l[0],n[l[0]]]}return!0}function constructYamlPairs(r){if(null===r)return[];var e,t,n,l,o,a=r;for(o=new Array(a.length),e=0,t=a.length;e<t;e+=1)n=a[e],l=Object.keys(n),o[e]=[l[0],n[l[0]]];return o}module.exports=new Type("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:resolveYamlPairs,construct:constructYamlPairs})},{"../type":47}],60:[function(require,module,exports){"use strict";var Type=require("../type");module.exports=new Type("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return null!==e?e:[]}})},{"../type":47}],61:[function(require,module,exports){"use strict";var Type=require("../type"),_hasOwnProperty=Object.prototype.hasOwnProperty;function resolveYamlSet(e){if(null===e)return!0;var r,t=e;for(r in t)if(_hasOwnProperty.call(t,r)&&null!==t[r])return!1;return!0}function constructYamlSet(e){return null!==e?e:{}}module.exports=new Type("tag:yaml.org,2002:set",{kind:"mapping",resolve:resolveYamlSet,construct:constructYamlSet})},{"../type":47}],62:[function(require,module,exports){"use strict";var Type=require("../type");module.exports=new Type("tag:yaml.org,2002:str",{kind:"scalar",construct:function(r){return null!==r?r:""}})},{"../type":47}],63:[function(require,module,exports){"use strict";var Type=require("../type"),YAML_DATE_REGEXP=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),YAML_TIMESTAMP_REGEXP=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function resolveYamlTimestamp(e){return null!==e&&(null!==YAML_DATE_REGEXP.exec(e)||null!==YAML_TIMESTAMP_REGEXP.exec(e))}function constructYamlTimestamp(e){var t,r,n,l,a,m,s,T,i=0,E=null;if(null===(t=YAML_DATE_REGEXP.exec(e))&&(t=YAML_TIMESTAMP_REGEXP.exec(e)),null===t)throw new Error("Date resolve error");if(r=+t[1],n=+t[2]-1,l=+t[3],!t[4])return new Date(Date.UTC(r,n,l));if(a=+t[4],m=+t[5],s=+t[6],t[7]){for(i=t[7].slice(0,3);i.length<3;)i+="0";i=+i}return t[9]&&(E=6e4*(60*+t[10]+ +(t[11]||0)),"-"===t[9]&&(E=-E)),T=new Date(Date.UTC(r,n,l,a,m,s,i)),E&&T.setTime(T.getTime()-E),T}function representYamlTimestamp(e){return e.toISOString()}module.exports=new Type("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:resolveYamlTimestamp,construct:constructYamlTimestamp,instanceOf:Date,represent:representYamlTimestamp})},{"../type":47}],64:[function(require,module,exports){"use strict";var format=require("format-util"),slice=Array.prototype.slice,protectedProperties=["name","message","stack"],errorPrototypeProperties=["name","message","description","number","code","fileName","lineNumber","columnNumber","sourceURL","line","column","stack"];function create(e){return function(r,t,o,n){var a=[],c="";"string"==typeof r?(a=slice.call(arguments),r=t=void 0):"string"==typeof t?(a=slice.call(arguments,1),t=void 0):"string"==typeof o&&(a=slice.call(arguments,2)),a.length>0&&(c=module.exports.formatter.apply(null,a)),r&&r.message&&(c+=(c?" \n":"")+r.message);var i=new e(c);return extendError(i,r),extendToJSON(i),extend(i,t),i}}function extendError(e,r){extendStack(e,r),extend(e,r)}function extendToJSON(e){e.toJSON=errorToJSON,e.inspect=errorToString}function extend(e,r){if(r&&"object"==typeof r)for(var t=Object.keys(r),o=0;o<t.length;o++){var n=t[o];if(!(protectedProperties.indexOf(n)>=0))try{e[n]=r[n]}catch(e){}}}function errorToJSON(){var e={},r=Object.keys(this);r=r.concat(errorPrototypeProperties);for(var t=0;t<r.length;t++){var o=r[t],n=this[o],a=typeof n;"undefined"!==a&&"function"!==a&&(e[o]=n)}return e}function errorToString(){return JSON.stringify(this,null,2).replace(/\\n/g,"\n")}function extendStack(e,r){hasLazyStack(e)?r?lazyJoinStacks(e,r):lazyPopStack(e):e.stack=r?joinStacks(e.stack,r.stack):popStack(e.stack)}function joinStacks(e,r){return(e=popStack(e))&&r?e+"\n\n"+r:e||r}function popStack(e){if(e){var r=e.split("\n");if(r.length<2)return e;for(var t=0;t<r.length;t++){if(r[t].indexOf("onoFactory")>=0)return r.splice(t,1),r.join("\n")}return e}}module.exports=create(Error),module.exports.error=create(Error),module.exports.eval=create(EvalError),module.exports.range=create(RangeError),module.exports.reference=create(ReferenceError),module.exports.syntax=create(SyntaxError),module.exports.type=create(TypeError),module.exports.uri=create(URIError),module.exports.formatter=format;var supportsLazyStack=!(!Object.getOwnPropertyDescriptor||!Object.defineProperty||"undefined"!=typeof navigator&&/Android/.test(navigator.userAgent));function hasLazyStack(e){if(!supportsLazyStack)return!1;var r=Object.getOwnPropertyDescriptor(e,"stack");return!!r&&"function"==typeof r.get}function lazyJoinStacks(e,r){var t=Object.getOwnPropertyDescriptor(e,"stack");Object.defineProperty(e,"stack",{get:function(){return joinStacks(t.get.apply(e),r.stack)},enumerable:!1,configurable:!0})}function lazyPopStack(e){var r=Object.getOwnPropertyDescriptor(e,"stack");Object.defineProperty(e,"stack",{get:function(){return popStack(r.get.apply(e))},enumerable:!1,configurable:!0})}},{"format-util":28}],65:[function(require,module,exports){(function(process){"use strict";function nextTick(e,n,c,r){if("function"!=typeof e)throw new TypeError('"callback" argument must be a function');var s,t,o=arguments.length;switch(o){case 0:case 1:return process.nextTick(e);case 2:return process.nextTick(function(){e.call(null,n)});case 3:return process.nextTick(function(){e.call(null,n,c)});case 4:return process.nextTick(function(){e.call(null,n,c,r)});default:for(s=new Array(o-1),t=0;t<s.length;)s[t++]=arguments[t];return process.nextTick(function(){e.apply(null,s)})}}!process.version||0===process.version.indexOf("v0.")||0===process.version.indexOf("v1.")&&0!==process.version.indexOf("v1.8.")?module.exports={nextTick:nextTick}:module.exports=process}).call(this,require("_process"))},{_process:66}],66:[function(require,module,exports){var cachedSetTimeout,cachedClearTimeout,process=module.exports={};function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}function runTimeout(e){if(cachedSetTimeout===setTimeout)return setTimeout(e,0);if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout)return cachedSetTimeout=setTimeout,setTimeout(e,0);try{return cachedSetTimeout(e,0)}catch(t){try{return cachedSetTimeout.call(null,e,0)}catch(t){return cachedSetTimeout.call(this,e,0)}}}function runClearTimeout(e){if(cachedClearTimeout===clearTimeout)return clearTimeout(e);if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout)return cachedClearTimeout=clearTimeout,clearTimeout(e);try{return cachedClearTimeout(e)}catch(t){try{return cachedClearTimeout.call(null,e)}catch(t){return cachedClearTimeout.call(this,e)}}}!function(){try{cachedSetTimeout="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){cachedSetTimeout=defaultSetTimout}try{cachedClearTimeout="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){cachedClearTimeout=defaultClearTimeout}}();var currentQueue,queue=[],draining=!1,queueIndex=-1;function cleanUpNextTick(){draining&&currentQueue&&(draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue())}function drainQueue(){if(!draining){var e=runTimeout(cleanUpNextTick);draining=!0;for(var t=queue.length;t;){for(currentQueue=queue,queue=[];++queueIndex<t;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,t=queue.length}currentQueue=null,draining=!1,runClearTimeout(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}process.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];queue.push(new Item(e,t)),1!==queue.length||draining||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.prependListener=noop,process.prependOnceListener=noop,process.listeners=function(e){return[]},process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0}},{}],67:[function(require,module,exports){"use strict";function hasOwnProperty(r,e){return Object.prototype.hasOwnProperty.call(r,e)}module.exports=function(r,e,t,n){e=e||"&",t=t||"=";var o={};if("string"!=typeof r||0===r.length)return o;var a=/\+/g;r=r.split(e);var s=1e3;n&&"number"==typeof n.maxKeys&&(s=n.maxKeys);var p=r.length;s>0&&p>s&&(p=s);for(var y=0;y<p;++y){var u,c,i,l,f=r[y].replace(a,"%20"),v=f.indexOf(t);v>=0?(u=f.substr(0,v),c=f.substr(v+1)):(u=f,c=""),i=decodeURIComponent(u),l=decodeURIComponent(c),hasOwnProperty(o,i)?isArray(o[i])?o[i].push(l):o[i]=[o[i],l]:o[i]=l}return o};var isArray=Array.isArray||function(r){return"[object Array]"===Object.prototype.toString.call(r)}},{}],68:[function(require,module,exports){"use strict";var stringifyPrimitive=function(r){switch(typeof r){case"string":return r;case"boolean":return r?"true":"false";case"number":return isFinite(r)?r:"";default:return""}};module.exports=function(r,e,t,n){return e=e||"&",t=t||"=",null===r&&(r=void 0),"object"==typeof r?map(objectKeys(r),function(n){var i=encodeURIComponent(stringifyPrimitive(n))+t;return isArray(r[n])?map(r[n],function(r){return i+encodeURIComponent(stringifyPrimitive(r))}).join(e):i+encodeURIComponent(stringifyPrimitive(r[n]))}).join(e):n?encodeURIComponent(stringifyPrimitive(n))+t+encodeURIComponent(stringifyPrimitive(r)):""};var isArray=Array.isArray||function(r){return"[object Array]"===Object.prototype.toString.call(r)};function map(r,e){if(r.map)return r.map(e);for(var t=[],n=0;n<r.length;n++)t.push(e(r[n],n));return t}var objectKeys=Object.keys||function(r){var e=[];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&e.push(t);return e}},{}],69:[function(require,module,exports){"use strict";exports.decode=exports.parse=require("./decode"),exports.encode=exports.stringify=require("./encode")},{"./decode":67,"./encode":68}],70:[function(require,module,exports){"use strict";var pna=require("process-nextick-args"),objectKeys=Object.keys||function(e){var t=[];for(var r in e)t.push(r);return t};module.exports=Duplex;var util=require("core-util-is");util.inherits=require("inherits");var Readable=require("./_stream_readable"),Writable=require("./_stream_writable");util.inherits(Duplex,Readable);for(var keys=objectKeys(Writable.prototype),v=0;v<keys.length;v++){var method=keys[v];Duplex.prototype[method]||(Duplex.prototype[method]=Writable.prototype[method])}function Duplex(e){if(!(this instanceof Duplex))return new Duplex(e);Readable.call(this,e),Writable.call(this,e),e&&!1===e.readable&&(this.readable=!1),e&&!1===e.writable&&(this.writable=!1),this.allowHalfOpen=!0,e&&!1===e.allowHalfOpen&&(this.allowHalfOpen=!1),this.once("end",onend)}function onend(){this.allowHalfOpen||this._writableState.ended||pna.nextTick(onEndNT,this)}function onEndNT(e){e.end()}Object.defineProperty(Duplex.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),Object.defineProperty(Duplex.prototype,"destroyed",{get:function(){return void 0!==this._readableState&&void 0!==this._writableState&&(this._readableState.destroyed&&this._writableState.destroyed)},set:function(e){void 0!==this._readableState&&void 0!==this._writableState&&(this._readableState.destroyed=e,this._writableState.destroyed=e)}}),Duplex.prototype._destroy=function(e,t){this.push(null),this.end(),pna.nextTick(t,e)}},{"./_stream_readable":72,"./_stream_writable":74,"core-util-is":26,inherits:31,"process-nextick-args":65}],71:[function(require,module,exports){"use strict";module.exports=PassThrough;var Transform=require("./_stream_transform"),util=require("core-util-is");function PassThrough(r){if(!(this instanceof PassThrough))return new PassThrough(r);Transform.call(this,r)}util.inherits=require("inherits"),util.inherits(PassThrough,Transform),PassThrough.prototype._transform=function(r,s,i){i(null,r)}},{"./_stream_transform":73,"core-util-is":26,inherits:31}],72:[function(require,module,exports){(function(process,global){"use strict";var pna=require("process-nextick-args");module.exports=Readable;var Duplex,isArray=require("isarray");Readable.ReadableState=ReadableState;var EE=require("events").EventEmitter,EElistenerCount=function(e,t){return e.listeners(t).length},Stream=require("./internal/streams/stream"),Buffer=require("safe-buffer").Buffer,OurUint8Array=global.Uint8Array||function(){};function _uint8ArrayToBuffer(e){return Buffer.from(e)}function _isUint8Array(e){return Buffer.isBuffer(e)||e instanceof OurUint8Array}var util=require("core-util-is");util.inherits=require("inherits");var debugUtil=require("util"),debug=void 0;debug=debugUtil&&debugUtil.debuglog?debugUtil.debuglog("stream"):function(){};var StringDecoder,BufferList=require("./internal/streams/BufferList"),destroyImpl=require("./internal/streams/destroy");util.inherits(Readable,Stream);var kProxyEvents=["error","close","destroy","pause","resume"];function prependListener(e,t,r){if("function"==typeof e.prependListener)return e.prependListener(t,r);e._events&&e._events[t]?isArray(e._events[t])?e._events[t].unshift(r):e._events[t]=[r,e._events[t]]:e.on(t,r)}function ReadableState(e,t){e=e||{};var r=t instanceof(Duplex=Duplex||require("./_stream_duplex"));this.objectMode=!!e.objectMode,r&&(this.objectMode=this.objectMode||!!e.readableObjectMode);var n=e.highWaterMark,a=e.readableHighWaterMark,i=this.objectMode?16:16384;this.highWaterMark=n||0===n?n:r&&(a||0===a)?a:i,this.highWaterMark=Math.floor(this.highWaterMark),this.buffer=new BufferList,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.destroyed=!1,this.defaultEncoding=e.defaultEncoding||"utf8",this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,e.encoding&&(StringDecoder||(StringDecoder=require("string_decoder/").StringDecoder),this.decoder=new StringDecoder(e.encoding),this.encoding=e.encoding)}function Readable(e){if(Duplex=Duplex||require("./_stream_duplex"),!(this instanceof Readable))return new Readable(e);this._readableState=new ReadableState(e,this),this.readable=!0,e&&("function"==typeof e.read&&(this._read=e.read),"function"==typeof e.destroy&&(this._destroy=e.destroy)),Stream.call(this)}function readableAddChunk(e,t,r,n,a){var i,d=e._readableState;null===t?(d.reading=!1,onEofChunk(e,d)):(a||(i=chunkInvalid(d,t)),i?e.emit("error",i):d.objectMode||t&&t.length>0?("string"==typeof t||d.objectMode||Object.getPrototypeOf(t)===Buffer.prototype||(t=_uint8ArrayToBuffer(t)),n?d.endEmitted?e.emit("error",new Error("stream.unshift() after end event")):addChunk(e,d,t,!0):d.ended?e.emit("error",new Error("stream.push() after EOF")):(d.reading=!1,d.decoder&&!r?(t=d.decoder.write(t),d.objectMode||0!==t.length?addChunk(e,d,t,!1):maybeReadMore(e,d)):addChunk(e,d,t,!1))):n||(d.reading=!1));return needMoreData(d)}function addChunk(e,t,r,n){t.flowing&&0===t.length&&!t.sync?(e.emit("data",r),e.read(0)):(t.length+=t.objectMode?1:r.length,n?t.buffer.unshift(r):t.buffer.push(r),t.needReadable&&emitReadable(e)),maybeReadMore(e,t)}function chunkInvalid(e,t){var r;return _isUint8Array(t)||"string"==typeof t||void 0===t||e.objectMode||(r=new TypeError("Invalid non-string/buffer chunk")),r}function needMoreData(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||0===e.length)}Object.defineProperty(Readable.prototype,"destroyed",{get:function(){return void 0!==this._readableState&&this._readableState.destroyed},set:function(e){this._readableState&&(this._readableState.destroyed=e)}}),Readable.prototype.destroy=destroyImpl.destroy,Readable.prototype._undestroy=destroyImpl.undestroy,Readable.prototype._destroy=function(e,t){this.push(null),t(e)},Readable.prototype.push=function(e,t){var r,n=this._readableState;return n.objectMode?r=!0:"string"==typeof e&&((t=t||n.defaultEncoding)!==n.encoding&&(e=Buffer.from(e,t),t=""),r=!0),readableAddChunk(this,e,t,!1,r)},Readable.prototype.unshift=function(e){return readableAddChunk(this,e,null,!0,!1)},Readable.prototype.isPaused=function(){return!1===this._readableState.flowing},Readable.prototype.setEncoding=function(e){return StringDecoder||(StringDecoder=require("string_decoder/").StringDecoder),this._readableState.decoder=new StringDecoder(e),this._readableState.encoding=e,this};var MAX_HWM=8388608;function computeNewHighWaterMark(e){return e>=MAX_HWM?e=MAX_HWM:(e--,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e++),e}function howMuchToRead(e,t){return e<=0||0===t.length&&t.ended?0:t.objectMode?1:e!=e?t.flowing&&t.length?t.buffer.head.data.length:t.length:(e>t.highWaterMark&&(t.highWaterMark=computeNewHighWaterMark(e)),e<=t.length?e:t.ended?t.length:(t.needReadable=!0,0))}function onEofChunk(e,t){if(!t.ended){if(t.decoder){var r=t.decoder.end();r&&r.length&&(t.buffer.push(r),t.length+=t.objectMode?1:r.length)}t.ended=!0,emitReadable(e)}}function emitReadable(e){var t=e._readableState;t.needReadable=!1,t.emittedReadable||(debug("emitReadable",t.flowing),t.emittedReadable=!0,t.sync?pna.nextTick(emitReadable_,e):emitReadable_(e))}function emitReadable_(e){debug("emit readable"),e.emit("readable"),flow(e)}function maybeReadMore(e,t){t.readingMore||(t.readingMore=!0,pna.nextTick(maybeReadMore_,e,t))}function maybeReadMore_(e,t){for(var r=t.length;!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark&&(debug("maybeReadMore read 0"),e.read(0),r!==t.length);)r=t.length;t.readingMore=!1}function pipeOnDrain(e){return function(){var t=e._readableState;debug("pipeOnDrain",t.awaitDrain),t.awaitDrain&&t.awaitDrain--,0===t.awaitDrain&&EElistenerCount(e,"data")&&(t.flowing=!0,flow(e))}}function nReadingNextTick(e){debug("readable nexttick read 0"),e.read(0)}function resume(e,t){t.resumeScheduled||(t.resumeScheduled=!0,pna.nextTick(resume_,e,t))}function resume_(e,t){t.reading||(debug("resume read 0"),e.read(0)),t.resumeScheduled=!1,t.awaitDrain=0,e.emit("resume"),flow(e),t.flowing&&!t.reading&&e.read(0)}function flow(e){var t=e._readableState;for(debug("flow",t.flowing);t.flowing&&null!==e.read(););}function fromList(e,t){return 0===t.length?null:(t.objectMode?r=t.buffer.shift():!e||e>=t.length?(r=t.decoder?t.buffer.join(""):1===t.buffer.length?t.buffer.head.data:t.buffer.concat(t.length),t.buffer.clear()):r=fromListPartial(e,t.buffer,t.decoder),r);var r}function fromListPartial(e,t,r){var n;return e<t.head.data.length?(n=t.head.data.slice(0,e),t.head.data=t.head.data.slice(e)):n=e===t.head.data.length?t.shift():r?copyFromBufferString(e,t):copyFromBuffer(e,t),n}function copyFromBufferString(e,t){var r=t.head,n=1,a=r.data;for(e-=a.length;r=r.next;){var i=r.data,d=e>i.length?i.length:e;if(d===i.length?a+=i:a+=i.slice(0,e),0===(e-=d)){d===i.length?(++n,r.next?t.head=r.next:t.head=t.tail=null):(t.head=r,r.data=i.slice(d));break}++n}return t.length-=n,a}function copyFromBuffer(e,t){var r=Buffer.allocUnsafe(e),n=t.head,a=1;for(n.data.copy(r),e-=n.data.length;n=n.next;){var i=n.data,d=e>i.length?i.length:e;if(i.copy(r,r.length-e,0,d),0===(e-=d)){d===i.length?(++a,n.next?t.head=n.next:t.head=t.tail=null):(t.head=n,n.data=i.slice(d));break}++a}return t.length-=a,r}function endReadable(e){var t=e._readableState;if(t.length>0)throw new Error('"endReadable()" called on non-empty stream');t.endEmitted||(t.ended=!0,pna.nextTick(endReadableNT,t,e))}function endReadableNT(e,t){e.endEmitted||0!==e.length||(e.endEmitted=!0,t.readable=!1,t.emit("end"))}function indexOf(e,t){for(var r=0,n=e.length;r<n;r++)if(e[r]===t)return r;return-1}Readable.prototype.read=function(e){debug("read",e),e=parseInt(e,10);var t=this._readableState,r=e;if(0!==e&&(t.emittedReadable=!1),0===e&&t.needReadable&&(t.length>=t.highWaterMark||t.ended))return debug("read: emitReadable",t.length,t.ended),0===t.length&&t.ended?endReadable(this):emitReadable(this),null;if(0===(e=howMuchToRead(e,t))&&t.ended)return 0===t.length&&endReadable(this),null;var n,a=t.needReadable;return debug("need readable",a),(0===t.length||t.length-e<t.highWaterMark)&&debug("length less than watermark",a=!0),t.ended||t.reading?debug("reading or ended",a=!1):a&&(debug("do read"),t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1,t.reading||(e=howMuchToRead(r,t))),null===(n=e>0?fromList(e,t):null)?(t.needReadable=!0,e=0):t.length-=e,0===t.length&&(t.ended||(t.needReadable=!0),r!==e&&t.ended&&endReadable(this)),null!==n&&this.emit("data",n),n},Readable.prototype._read=function(e){this.emit("error",new Error("_read() is not implemented"))},Readable.prototype.pipe=function(e,t){var r=this,n=this._readableState;switch(n.pipesCount){case 0:n.pipes=e;break;case 1:n.pipes=[n.pipes,e];break;default:n.pipes.push(e)}n.pipesCount+=1,debug("pipe count=%d opts=%j",n.pipesCount,t);var a=(!t||!1!==t.end)&&e!==process.stdout&&e!==process.stderr?d:b;function i(t,a){debug("onunpipe"),t===r&&a&&!1===a.hasUnpiped&&(a.hasUnpiped=!0,debug("cleanup"),e.removeListener("close",f),e.removeListener("finish",p),e.removeListener("drain",o),e.removeListener("error",h),e.removeListener("unpipe",i),r.removeListener("end",d),r.removeListener("end",b),r.removeListener("data",s),u=!0,!n.awaitDrain||e._writableState&&!e._writableState.needDrain||o())}function d(){debug("onend"),e.end()}n.endEmitted?pna.nextTick(a):r.once("end",a),e.on("unpipe",i);var o=pipeOnDrain(r);e.on("drain",o);var u=!1;var l=!1;function s(t){debug("ondata"),l=!1,!1!==e.write(t)||l||((1===n.pipesCount&&n.pipes===e||n.pipesCount>1&&-1!==indexOf(n.pipes,e))&&!u&&(debug("false write response, pause",r._readableState.awaitDrain),r._readableState.awaitDrain++,l=!0),r.pause())}function h(t){debug("onerror",t),b(),e.removeListener("error",h),0===EElistenerCount(e,"error")&&e.emit("error",t)}function f(){e.removeListener("finish",p),b()}function p(){debug("onfinish"),e.removeListener("close",f),b()}function b(){debug("unpipe"),r.unpipe(e)}return r.on("data",s),prependListener(e,"error",h),e.once("close",f),e.once("finish",p),e.emit("pipe",r),n.flowing||(debug("pipe resume"),r.resume()),e},Readable.prototype.unpipe=function(e){var t=this._readableState,r={hasUnpiped:!1};if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,t.flowing=!1,e&&e.emit("unpipe",this,r),this);if(!e){var n=t.pipes,a=t.pipesCount;t.pipes=null,t.pipesCount=0,t.flowing=!1;for(var i=0;i<a;i++)n[i].emit("unpipe",this,r);return this}var d=indexOf(t.pipes,e);return-1===d?this:(t.pipes.splice(d,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this,r),this)},Readable.prototype.on=function(e,t){var r=Stream.prototype.on.call(this,e,t);if("data"===e)!1!==this._readableState.flowing&&this.resume();else if("readable"===e){var n=this._readableState;n.endEmitted||n.readableListening||(n.readableListening=n.needReadable=!0,n.emittedReadable=!1,n.reading?n.length&&emitReadable(this):pna.nextTick(nReadingNextTick,this))}return r},Readable.prototype.addListener=Readable.prototype.on,Readable.prototype.resume=function(){var e=this._readableState;return e.flowing||(debug("resume"),e.flowing=!0,resume(this,e)),this},Readable.prototype.pause=function(){return debug("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(debug("pause"),this._readableState.flowing=!1,this.emit("pause")),this},Readable.prototype.wrap=function(e){var t=this,r=this._readableState,n=!1;for(var a in e.on("end",function(){if(debug("wrapped end"),r.decoder&&!r.ended){var e=r.decoder.end();e&&e.length&&t.push(e)}t.push(null)}),e.on("data",function(a){(debug("wrapped data"),r.decoder&&(a=r.decoder.write(a)),r.objectMode&&null==a)||(r.objectMode||a&&a.length)&&(t.push(a)||(n=!0,e.pause()))}),e)void 0===this[a]&&"function"==typeof e[a]&&(this[a]=function(t){return function(){return e[t].apply(e,arguments)}}(a));for(var i=0;i<kProxyEvents.length;i++)e.on(kProxyEvents[i],this.emit.bind(this,kProxyEvents[i]));return this._read=function(t){debug("wrapped _read",t),n&&(n=!1,e.resume())},this},Object.defineProperty(Readable.prototype,"readableHighWaterMark",{enumerable:!1,get:function(){return this._readableState.highWaterMark}}),Readable._fromList=fromList}).call(this,require("_process"),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./_stream_duplex":70,"./internal/streams/BufferList":75,"./internal/streams/destroy":76,"./internal/streams/stream":77,_process:66,"core-util-is":26,events:27,inherits:31,isarray:33,"process-nextick-args":65,"safe-buffer":79,"string_decoder/":84,util:21}],73:[function(require,module,exports){"use strict";module.exports=Transform;var Duplex=require("./_stream_duplex"),util=require("core-util-is");function afterTransform(r,t){var n=this._transformState;n.transforming=!1;var e=n.writecb;if(!e)return this.emit("error",new Error("write callback called multiple times"));n.writechunk=null,n.writecb=null,null!=t&&this.push(t),e(r);var i=this._readableState;i.reading=!1,(i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}function Transform(r){if(!(this instanceof Transform))return new Transform(r);Duplex.call(this,r),this._transformState={afterTransform:afterTransform.bind(this),needTransform:!1,transforming:!1,writecb:null,writechunk:null,writeencoding:null},this._readableState.needReadable=!0,this._readableState.sync=!1,r&&("function"==typeof r.transform&&(this._transform=r.transform),"function"==typeof r.flush&&(this._flush=r.flush)),this.on("prefinish",prefinish)}function prefinish(){var r=this;"function"==typeof this._flush?this._flush(function(t,n){done(r,t,n)}):done(this,null,null)}function done(r,t,n){if(t)return r.emit("error",t);if(null!=n&&r.push(n),r._writableState.length)throw new Error("Calling transform done when ws.length != 0");if(r._transformState.transforming)throw new Error("Calling transform done when still transforming");return r.push(null)}util.inherits=require("inherits"),util.inherits(Transform,Duplex),Transform.prototype.push=function(r,t){return this._transformState.needTransform=!1,Duplex.prototype.push.call(this,r,t)},Transform.prototype._transform=function(r,t,n){throw new Error("_transform() is not implemented")},Transform.prototype._write=function(r,t,n){var e=this._transformState;if(e.writecb=n,e.writechunk=r,e.writeencoding=t,!e.transforming){var i=this._readableState;(e.needTransform||i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}},Transform.prototype._read=function(r){var t=this._transformState;null!==t.writechunk&&t.writecb&&!t.transforming?(t.transforming=!0,this._transform(t.writechunk,t.writeencoding,t.afterTransform)):t.needTransform=!0},Transform.prototype._destroy=function(r,t){var n=this;Duplex.prototype._destroy.call(this,r,function(r){t(r),n.emit("close")})}},{"./_stream_duplex":70,"core-util-is":26,inherits:31}],74:[function(require,module,exports){(function(process,global,setImmediate){"use strict";var pna=require("process-nextick-args");function WriteReq(e,t,r){this.chunk=e,this.encoding=t,this.callback=r,this.next=null}function CorkedRequest(e){var t=this;this.next=null,this.entry=null,this.finish=function(){onCorkedFinish(t,e)}}module.exports=Writable;var Duplex,asyncWrite=!process.browser&&["v0.10","v0.9."].indexOf(process.version.slice(0,5))>-1?setImmediate:pna.nextTick;Writable.WritableState=WritableState;var util=require("core-util-is");util.inherits=require("inherits");var internalUtil={deprecate:require("util-deprecate")},Stream=require("./internal/streams/stream"),Buffer=require("safe-buffer").Buffer,OurUint8Array=global.Uint8Array||function(){};function _uint8ArrayToBuffer(e){return Buffer.from(e)}function _isUint8Array(e){return Buffer.isBuffer(e)||e instanceof OurUint8Array}var realHasInstance,destroyImpl=require("./internal/streams/destroy");function nop(){}function WritableState(e,t){Duplex=Duplex||require("./_stream_duplex"),e=e||{};var r=t instanceof Duplex;this.objectMode=!!e.objectMode,r&&(this.objectMode=this.objectMode||!!e.writableObjectMode);var i=e.highWaterMark,n=e.writableHighWaterMark,o=this.objectMode?16:16384;this.highWaterMark=i||0===i?i:r&&(n||0===n)?n:o,this.highWaterMark=Math.floor(this.highWaterMark),this.finalCalled=!1,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1,this.destroyed=!1;var a=!1===e.decodeStrings;this.decodeStrings=!a,this.defaultEncoding=e.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){onwrite(t,e)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.bufferedRequestCount=0,this.corkedRequestsFree=new CorkedRequest(this)}function Writable(e){if(Duplex=Duplex||require("./_stream_duplex"),!(realHasInstance.call(Writable,this)||this instanceof Duplex))return new Writable(e);this._writableState=new WritableState(e,this),this.writable=!0,e&&("function"==typeof e.write&&(this._write=e.write),"function"==typeof e.writev&&(this._writev=e.writev),"function"==typeof e.destroy&&(this._destroy=e.destroy),"function"==typeof e.final&&(this._final=e.final)),Stream.call(this)}function writeAfterEnd(e,t){var r=new Error("write after end");e.emit("error",r),pna.nextTick(t,r)}function validChunk(e,t,r,i){var n=!0,o=!1;return null===r?o=new TypeError("May not write null values to stream"):"string"==typeof r||void 0===r||t.objectMode||(o=new TypeError("Invalid non-string/buffer chunk")),o&&(e.emit("error",o),pna.nextTick(i,o),n=!1),n}function decodeChunk(e,t,r){return e.objectMode||!1===e.decodeStrings||"string"!=typeof t||(t=Buffer.from(t,r)),t}function writeOrBuffer(e,t,r,i,n,o){if(!r){var a=decodeChunk(t,i,n);i!==a&&(r=!0,n="buffer",i=a)}var s=t.objectMode?1:i.length;t.length+=s;var f=t.length<t.highWaterMark;if(f||(t.needDrain=!0),t.writing||t.corked){var u=t.lastBufferedRequest;t.lastBufferedRequest={chunk:i,encoding:n,isBuf:r,callback:o,next:null},u?u.next=t.lastBufferedRequest:t.bufferedRequest=t.lastBufferedRequest,t.bufferedRequestCount+=1}else doWrite(e,t,!1,s,i,n,o);return f}function doWrite(e,t,r,i,n,o,a){t.writelen=i,t.writecb=a,t.writing=!0,t.sync=!0,r?e._writev(n,t.onwrite):e._write(n,o,t.onwrite),t.sync=!1}function onwriteError(e,t,r,i,n){--t.pendingcb,r?(pna.nextTick(n,i),pna.nextTick(finishMaybe,e,t),e._writableState.errorEmitted=!0,e.emit("error",i)):(n(i),e._writableState.errorEmitted=!0,e.emit("error",i),finishMaybe(e,t))}function onwriteStateUpdate(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}function onwrite(e,t){var r=e._writableState,i=r.sync,n=r.writecb;if(onwriteStateUpdate(r),t)onwriteError(e,r,i,t,n);else{var o=needFinish(r);o||r.corked||r.bufferProcessing||!r.bufferedRequest||clearBuffer(e,r),i?asyncWrite(afterWrite,e,r,o,n):afterWrite(e,r,o,n)}}function afterWrite(e,t,r,i){r||onwriteDrain(e,t),t.pendingcb--,i(),finishMaybe(e,t)}function onwriteDrain(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1,e.emit("drain"))}function clearBuffer(e,t){t.bufferProcessing=!0;var r=t.bufferedRequest;if(e._writev&&r&&r.next){var i=t.bufferedRequestCount,n=new Array(i),o=t.corkedRequestsFree;o.entry=r;for(var a=0,s=!0;r;)n[a]=r,r.isBuf||(s=!1),r=r.next,a+=1;n.allBuffers=s,doWrite(e,t,!0,t.length,n,"",o.finish),t.pendingcb++,t.lastBufferedRequest=null,o.next?(t.corkedRequestsFree=o.next,o.next=null):t.corkedRequestsFree=new CorkedRequest(t),t.bufferedRequestCount=0}else{for(;r;){var f=r.chunk,u=r.encoding,l=r.callback;if(doWrite(e,t,!1,t.objectMode?1:f.length,f,u,l),r=r.next,t.bufferedRequestCount--,t.writing)break}null===r&&(t.lastBufferedRequest=null)}t.bufferedRequest=r,t.bufferProcessing=!1}function needFinish(e){return e.ending&&0===e.length&&null===e.bufferedRequest&&!e.finished&&!e.writing}function callFinal(e,t){e._final(function(r){t.pendingcb--,r&&e.emit("error",r),t.prefinished=!0,e.emit("prefinish"),finishMaybe(e,t)})}function prefinish(e,t){t.prefinished||t.finalCalled||("function"==typeof e._final?(t.pendingcb++,t.finalCalled=!0,pna.nextTick(callFinal,e,t)):(t.prefinished=!0,e.emit("prefinish")))}function finishMaybe(e,t){var r=needFinish(t);return r&&(prefinish(e,t),0===t.pendingcb&&(t.finished=!0,e.emit("finish"))),r}function endWritable(e,t,r){t.ending=!0,finishMaybe(e,t),r&&(t.finished?pna.nextTick(r):e.once("finish",r)),t.ended=!0,e.writable=!1}function onCorkedFinish(e,t,r){var i=e.entry;for(e.entry=null;i;){var n=i.callback;t.pendingcb--,n(r),i=i.next}t.corkedRequestsFree?t.corkedRequestsFree.next=e:t.corkedRequestsFree=e}util.inherits(Writable,Stream),WritableState.prototype.getBuffer=function(){for(var e=this.bufferedRequest,t=[];e;)t.push(e),e=e.next;return t},function(){try{Object.defineProperty(WritableState.prototype,"buffer",{get:internalUtil.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.","DEP0003")})}catch(e){}}(),"function"==typeof Symbol&&Symbol.hasInstance&&"function"==typeof Function.prototype[Symbol.hasInstance]?(realHasInstance=Function.prototype[Symbol.hasInstance],Object.defineProperty(Writable,Symbol.hasInstance,{value:function(e){return!!realHasInstance.call(this,e)||this===Writable&&(e&&e._writableState instanceof WritableState)}})):realHasInstance=function(e){return e instanceof this},Writable.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"))},Writable.prototype.write=function(e,t,r){var i=this._writableState,n=!1,o=!i.objectMode&&_isUint8Array(e);return o&&!Buffer.isBuffer(e)&&(e=_uint8ArrayToBuffer(e)),"function"==typeof t&&(r=t,t=null),o?t="buffer":t||(t=i.defaultEncoding),"function"!=typeof r&&(r=nop),i.ended?writeAfterEnd(this,r):(o||validChunk(this,i,e,r))&&(i.pendingcb++,n=writeOrBuffer(this,i,o,e,t,r)),n},Writable.prototype.cork=function(){this._writableState.corked++},Writable.prototype.uncork=function(){var e=this._writableState;e.corked&&(e.corked--,e.writing||e.corked||e.finished||e.bufferProcessing||!e.bufferedRequest||clearBuffer(this,e))},Writable.prototype.setDefaultEncoding=function(e){if("string"==typeof e&&(e=e.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((e+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+e);return this._writableState.defaultEncoding=e,this},Object.defineProperty(Writable.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),Writable.prototype._write=function(e,t,r){r(new Error("_write() is not implemented"))},Writable.prototype._writev=null,Writable.prototype.end=function(e,t,r){var i=this._writableState;"function"==typeof e?(r=e,e=null,t=null):"function"==typeof t&&(r=t,t=null),null!=e&&this.write(e,t),i.corked&&(i.corked=1,this.uncork()),i.ending||i.finished||endWritable(this,i,r)},Object.defineProperty(Writable.prototype,"destroyed",{get:function(){return void 0!==this._writableState&&this._writableState.destroyed},set:function(e){this._writableState&&(this._writableState.destroyed=e)}}),Writable.prototype.destroy=destroyImpl.destroy,Writable.prototype._undestroy=destroyImpl.undestroy,Writable.prototype._destroy=function(e,t){this.end(),t(e)}}).call(this,require("_process"),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{},require("timers").setImmediate)},{"./_stream_duplex":70,"./internal/streams/destroy":76,"./internal/streams/stream":77,_process:66,"core-util-is":26,inherits:31,"process-nextick-args":65,"safe-buffer":79,timers:85,"util-deprecate":89}],75:[function(require,module,exports){"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var Buffer=require("safe-buffer").Buffer,util=require("util");function copyBuffer(t,e,i){t.copy(e,i)}module.exports=function(){function t(){_classCallCheck(this,t),this.head=null,this.tail=null,this.length=0}return t.prototype.push=function(t){var e={data:t,next:null};this.length>0?this.tail.next=e:this.head=e,this.tail=e,++this.length},t.prototype.unshift=function(t){var e={data:t,next:this.head};0===this.length&&(this.tail=e),this.head=e,++this.length},t.prototype.shift=function(){if(0!==this.length){var t=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,t}},t.prototype.clear=function(){this.head=this.tail=null,this.length=0},t.prototype.join=function(t){if(0===this.length)return"";for(var e=this.head,i=""+e.data;e=e.next;)i+=t+e.data;return i},t.prototype.concat=function(t){if(0===this.length)return Buffer.alloc(0);if(1===this.length)return this.head.data;for(var e=Buffer.allocUnsafe(t>>>0),i=this.head,n=0;i;)copyBuffer(i.data,e,n),n+=i.data.length,i=i.next;return e},t}(),util&&util.inspect&&util.inspect.custom&&(module.exports.prototype[util.inspect.custom]=function(){var t=util.inspect({length:this.length});return this.constructor.name+" "+t})},{"safe-buffer":79,util:21}],76:[function(require,module,exports){"use strict";var pna=require("process-nextick-args");function destroy(t,e){var r=this,a=this._readableState&&this._readableState.destroyed,i=this._writableState&&this._writableState.destroyed;return a||i?(e?e(t):!t||this._writableState&&this._writableState.errorEmitted||pna.nextTick(emitErrorNT,this,t),this):(this._readableState&&(this._readableState.destroyed=!0),this._writableState&&(this._writableState.destroyed=!0),this._destroy(t||null,function(t){!e&&t?(pna.nextTick(emitErrorNT,r,t),r._writableState&&(r._writableState.errorEmitted=!0)):e&&e(t)}),this)}function undestroy(){this._readableState&&(this._readableState.destroyed=!1,this._readableState.reading=!1,this._readableState.ended=!1,this._readableState.endEmitted=!1),this._writableState&&(this._writableState.destroyed=!1,this._writableState.ended=!1,this._writableState.ending=!1,this._writableState.finished=!1,this._writableState.errorEmitted=!1)}function emitErrorNT(t,e){t.emit("error",e)}module.exports={destroy:destroy,undestroy:undestroy}},{"process-nextick-args":65}],77:[function(require,module,exports){module.exports=require("events").EventEmitter},{events:27}],78:[function(require,module,exports){exports=module.exports=require("./lib/_stream_readable.js"),exports.Stream=exports,exports.Readable=exports,exports.Writable=require("./lib/_stream_writable.js"),exports.Duplex=require("./lib/_stream_duplex.js"),exports.Transform=require("./lib/_stream_transform.js"),exports.PassThrough=require("./lib/_stream_passthrough.js")},{"./lib/_stream_duplex.js":70,"./lib/_stream_passthrough.js":71,"./lib/_stream_readable.js":72,"./lib/_stream_transform.js":73,"./lib/_stream_writable.js":74}],79:[function(require,module,exports){var buffer=require("buffer"),Buffer=buffer.Buffer;function copyProps(f,r){for(var e in f)r[e]=f[e]}function SafeBuffer(f,r,e){return Buffer(f,r,e)}Buffer.from&&Buffer.alloc&&Buffer.allocUnsafe&&Buffer.allocUnsafeSlow?module.exports=buffer:(copyProps(buffer,exports),exports.Buffer=SafeBuffer),copyProps(Buffer,SafeBuffer),SafeBuffer.from=function(f,r,e){if("number"==typeof f)throw new TypeError("Argument must not be a number");return Buffer(f,r,e)},SafeBuffer.alloc=function(f,r,e){if("number"!=typeof f)throw new TypeError("Argument must be a number");var u=Buffer(f);return void 0!==r?"string"==typeof e?u.fill(r,e):u.fill(r):u.fill(0),u},SafeBuffer.allocUnsafe=function(f){if("number"!=typeof f)throw new TypeError("Argument must be a number");return Buffer(f)},SafeBuffer.allocUnsafeSlow=function(f){if("number"!=typeof f)throw new TypeError("Argument must be a number");return buffer.SlowBuffer(f)}},{buffer:23}],80:[function(require,module,exports){(function(global){var ClientRequest=require("./lib/request"),response=require("./lib/response"),extend=require("xtend"),statusCodes=require("builtin-status-codes"),url=require("url"),http=exports;http.request=function(e,t){e="string"==typeof e?url.parse(e):extend(e);var r=-1===global.location.protocol.search(/^https?:$/)?"http:":"",s=e.protocol||r,n=e.hostname||e.host,o=e.port,p=e.path||"/";n&&-1!==n.indexOf(":")&&(n="["+n+"]"),e.url=(n?s+"//"+n:"")+(o?":"+o:"")+p,e.method=(e.method||"GET").toUpperCase(),e.headers=e.headers||{};var u=new ClientRequest(e);return t&&u.on("response",t),u},http.get=function(e,t){var r=http.request(e,t);return r.end(),r},http.ClientRequest=ClientRequest,http.IncomingMessage=response.IncomingMessage,http.Agent=function(){},http.Agent.defaultMaxSockets=4,http.globalAgent=new http.Agent,http.STATUS_CODES=statusCodes,http.METHODS=["CHECKOUT","CONNECT","COPY","DELETE","GET","HEAD","LOCK","M-SEARCH","MERGE","MKACTIVITY","MKCOL","MOVE","NOTIFY","OPTIONS","PATCH","POST","PROPFIND","PROPPATCH","PURGE","PUT","REPORT","SEARCH","SUBSCRIBE","TRACE","UNLOCK","UNSUBSCRIBE"]}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./lib/request":82,"./lib/response":83,"builtin-status-codes":24,url:87,xtend:90}],81:[function(require,module,exports){(function(global){exports.fetch=isFunction(global.fetch)&&isFunction(global.ReadableStream),exports.writableStream=isFunction(global.WritableStream),exports.abortController=isFunction(global.AbortController),exports.blobConstructor=!1;try{new Blob([new ArrayBuffer(1)]),exports.blobConstructor=!0}catch(r){}var xhr;function getXHR(){if(void 0!==xhr)return xhr;if(global.XMLHttpRequest){xhr=new global.XMLHttpRequest;try{xhr.open("GET",global.XDomainRequest?"/":"https://example.com")}catch(r){xhr=null}}else xhr=null;return xhr}function checkTypeSupport(r){var e=getXHR();if(!e)return!1;try{return e.responseType=r,e.responseType===r}catch(r){}return!1}var haveArrayBuffer=void 0!==global.ArrayBuffer,haveSlice=haveArrayBuffer&&isFunction(global.ArrayBuffer.prototype.slice);function isFunction(r){return"function"==typeof r}exports.arraybuffer=exports.fetch||haveArrayBuffer&&checkTypeSupport("arraybuffer"),exports.msstream=!exports.fetch&&haveSlice&&checkTypeSupport("ms-stream"),exports.mozchunkedarraybuffer=!exports.fetch&&haveArrayBuffer&&checkTypeSupport("moz-chunked-arraybuffer"),exports.overrideMimeType=exports.fetch||!!getXHR()&&isFunction(getXHR().overrideMimeType),exports.vbArray=isFunction(global.VBArray),xhr=null}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],82:[function(require,module,exports){(function(process,global,Buffer){var capability=require("./capability"),inherits=require("inherits"),response=require("./response"),stream=require("readable-stream"),toArrayBuffer=require("to-arraybuffer"),IncomingMessage=response.IncomingMessage,rStates=response.readyStates;function decideMode(e,t){return capability.fetch&&t?"fetch":capability.mozchunkedarraybuffer?"moz-chunked-arraybuffer":capability.msstream?"ms-stream":capability.arraybuffer&&e?"arraybuffer":capability.vbArray&&e?"text:vbarray":"text"}var ClientRequest=module.exports=function(e){var t,r=this;stream.Writable.call(r),r._opts=e,r._body=[],r._headers={},e.auth&&r.setHeader("Authorization","Basic "+new Buffer(e.auth).toString("base64")),Object.keys(e.headers).forEach(function(t){r.setHeader(t,e.headers[t])});var o=!0;if("disable-fetch"===e.mode||"requestTimeout"in e&&!capability.abortController)o=!1,t=!0;else if("prefer-streaming"===e.mode)t=!1;else if("allow-wrong-content-type"===e.mode)t=!capability.overrideMimeType;else{if(e.mode&&"default"!==e.mode&&"prefer-fast"!==e.mode)throw new Error("Invalid value for opts.mode");t=!0}r._mode=decideMode(t,o),r._fetchTimer=null,r.on("finish",function(){r._onFinish()})};function statusValid(e){try{var t=e.status;return null!==t&&0!==t}catch(e){return!1}}inherits(ClientRequest,stream.Writable),ClientRequest.prototype.setHeader=function(e,t){var r=e.toLowerCase();-1===unsafeHeaders.indexOf(r)&&(this._headers[r]={name:e,value:t})},ClientRequest.prototype.getHeader=function(e){var t=this._headers[e.toLowerCase()];return t?t.value:null},ClientRequest.prototype.removeHeader=function(e){delete this._headers[e.toLowerCase()]},ClientRequest.prototype._onFinish=function(){var e=this;if(!e._destroyed){var t=e._opts,r=e._headers,o=null;"GET"!==t.method&&"HEAD"!==t.method&&(o=capability.arraybuffer?toArrayBuffer(Buffer.concat(e._body)):capability.blobConstructor?new global.Blob(e._body.map(function(e){return toArrayBuffer(e)}),{type:(r["content-type"]||{}).value||""}):Buffer.concat(e._body).toString());var n=[];if(Object.keys(r).forEach(function(e){var t=r[e].name,o=r[e].value;Array.isArray(o)?o.forEach(function(e){n.push([t,e])}):n.push([t,o])}),"fetch"===e._mode){var i=null;if(capability.abortController){var s=new AbortController;i=s.signal,e._fetchAbortController=s,"requestTimeout"in t&&0!==t.requestTimeout&&(e._fetchTimer=global.setTimeout(function(){e.emit("requestTimeout"),e._fetchAbortController&&e._fetchAbortController.abort()},t.requestTimeout))}global.fetch(e._opts.url,{method:e._opts.method,headers:n,body:o||void 0,mode:"cors",credentials:t.withCredentials?"include":"same-origin",signal:i}).then(function(t){e._fetchResponse=t,e._connect()},function(t){global.clearTimeout(e._fetchTimer),e._destroyed||e.emit("error",t)})}else{var a=e._xhr=new global.XMLHttpRequest;try{a.open(e._opts.method,e._opts.url,!0)}catch(t){return void process.nextTick(function(){e.emit("error",t)})}"responseType"in a&&(a.responseType=e._mode.split(":")[0]),"withCredentials"in a&&(a.withCredentials=!!t.withCredentials),"text"===e._mode&&"overrideMimeType"in a&&a.overrideMimeType("text/plain; charset=x-user-defined"),"requestTimeout"in t&&(a.timeout=t.requestTimeout,a.ontimeout=function(){e.emit("requestTimeout")}),n.forEach(function(e){a.setRequestHeader(e[0],e[1])}),e._response=null,a.onreadystatechange=function(){switch(a.readyState){case rStates.LOADING:case rStates.DONE:e._onXHRProgress()}},"moz-chunked-arraybuffer"===e._mode&&(a.onprogress=function(){e._onXHRProgress()}),a.onerror=function(){e._destroyed||e.emit("error",new Error("XHR error"))};try{a.send(o)}catch(t){return void process.nextTick(function(){e.emit("error",t)})}}}},ClientRequest.prototype._onXHRProgress=function(){statusValid(this._xhr)&&!this._destroyed&&(this._response||this._connect(),this._response._onXHRProgress())},ClientRequest.prototype._connect=function(){var e=this;e._destroyed||(e._response=new IncomingMessage(e._xhr,e._fetchResponse,e._mode,e._fetchTimer),e._response.on("error",function(t){e.emit("error",t)}),e.emit("response",e._response))},ClientRequest.prototype._write=function(e,t,r){this._body.push(e),r()},ClientRequest.prototype.abort=ClientRequest.prototype.destroy=function(){this._destroyed=!0,global.clearTimeout(this._fetchTimer),this._response&&(this._response._destroyed=!0),this._xhr?this._xhr.abort():this._fetchAbortController&&this._fetchAbortController.abort()},ClientRequest.prototype.end=function(e,t,r){"function"==typeof e&&(r=e,e=void 0),stream.Writable.prototype.end.call(this,e,t,r)},ClientRequest.prototype.flushHeaders=function(){},ClientRequest.prototype.setTimeout=function(){},ClientRequest.prototype.setNoDelay=function(){},ClientRequest.prototype.setSocketKeepAlive=function(){};var unsafeHeaders=["accept-charset","accept-encoding","access-control-request-headers","access-control-request-method","connection","content-length","cookie","cookie2","date","dnt","expect","host","keep-alive","origin","referer","te","trailer","transfer-encoding","upgrade","via"]}).call(this,require("_process"),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{},require("buffer").Buffer)},{"./capability":81,"./response":83,_process:66,buffer:23,inherits:31,"readable-stream":78,"to-arraybuffer":86}],83:[function(require,module,exports){(function(process,global,Buffer){var capability=require("./capability"),inherits=require("inherits"),stream=require("readable-stream"),rStates=exports.readyStates={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4},IncomingMessage=exports.IncomingMessage=function(e,r,t,a){var s=this;if(stream.Readable.call(s),s._mode=t,s.headers={},s.rawHeaders=[],s.trailers={},s.rawTrailers=[],s.on("end",function(){process.nextTick(function(){s.emit("close")})}),"fetch"===t){if(s._fetchResponse=r,s.url=r.url,s.statusCode=r.status,s.statusMessage=r.statusText,r.headers.forEach(function(e,r){s.headers[r.toLowerCase()]=e,s.rawHeaders.push(r,e)}),capability.writableStream){var o=new WritableStream({write:function(e){return new Promise(function(r,t){s._destroyed?t():s.push(new Buffer(e))?r():s._resumeFetch=r})},close:function(){global.clearTimeout(a),s._destroyed||s.push(null)},abort:function(e){s._destroyed||s.emit("error",e)}});try{return void r.body.pipeTo(o).catch(function(e){global.clearTimeout(a),s._destroyed||s.emit("error",e)})}catch(e){}}var n=r.body.getReader();!function e(){n.read().then(function(r){if(!s._destroyed){if(r.done)return global.clearTimeout(a),void s.push(null);s.push(new Buffer(r.value)),e()}}).catch(function(e){global.clearTimeout(a),s._destroyed||s.emit("error",e)})}()}else{if(s._xhr=e,s._pos=0,s.url=e.responseURL,s.statusCode=e.status,s.statusMessage=e.statusText,e.getAllResponseHeaders().split(/\r?\n/).forEach(function(e){var r=e.match(/^([^:]+):\s*(.*)/);if(r){var t=r[1].toLowerCase();"set-cookie"===t?(void 0===s.headers[t]&&(s.headers[t]=[]),s.headers[t].push(r[2])):void 0!==s.headers[t]?s.headers[t]+=", "+r[2]:s.headers[t]=r[2],s.rawHeaders.push(r[1],r[2])}}),s._charset="x-user-defined",!capability.overrideMimeType){var i=s.rawHeaders["mime-type"];if(i){var u=i.match(/;\s*charset=([^;])(;|$)/);u&&(s._charset=u[1].toLowerCase())}s._charset||(s._charset="utf-8")}}};inherits(IncomingMessage,stream.Readable),IncomingMessage.prototype._read=function(){var e=this._resumeFetch;e&&(this._resumeFetch=null,e())},IncomingMessage.prototype._onXHRProgress=function(){var e=this,r=e._xhr,t=null;switch(e._mode){case"text:vbarray":if(r.readyState!==rStates.DONE)break;try{t=new global.VBArray(r.responseBody).toArray()}catch(e){}if(null!==t){e.push(new Buffer(t));break}case"text":try{t=r.responseText}catch(r){e._mode="text:vbarray";break}if(t.length>e._pos){var a=t.substr(e._pos);if("x-user-defined"===e._charset){for(var s=new Buffer(a.length),o=0;o<a.length;o++)s[o]=255&a.charCodeAt(o);e.push(s)}else e.push(a,e._charset);e._pos=t.length}break;case"arraybuffer":if(r.readyState!==rStates.DONE||!r.response)break;t=r.response,e.push(new Buffer(new Uint8Array(t)));break;case"moz-chunked-arraybuffer":if(t=r.response,r.readyState!==rStates.LOADING||!t)break;e.push(new Buffer(new Uint8Array(t)));break;case"ms-stream":if(t=r.response,r.readyState!==rStates.LOADING)break;var n=new global.MSStreamReader;n.onprogress=function(){n.result.byteLength>e._pos&&(e.push(new Buffer(new Uint8Array(n.result.slice(e._pos)))),e._pos=n.result.byteLength)},n.onload=function(){e.push(null)},n.readAsArrayBuffer(t)}e._xhr.readyState===rStates.DONE&&"ms-stream"!==e._mode&&e.push(null)}}).call(this,require("_process"),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{},require("buffer").Buffer)},{"./capability":81,_process:66,buffer:23,inherits:31,"readable-stream":78}],84:[function(require,module,exports){"use strict";var Buffer=require("safe-buffer").Buffer,isEncoding=Buffer.isEncoding||function(t){switch((t=""+t)&&t.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}};function _normalizeEncoding(t){if(!t)return"utf8";for(var e;;)switch(t){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return t;default:if(e)return;t=(""+t).toLowerCase(),e=!0}}function normalizeEncoding(t){var e=_normalizeEncoding(t);if("string"!=typeof e&&(Buffer.isEncoding===isEncoding||!isEncoding(t)))throw new Error("Unknown encoding: "+t);return e||t}function StringDecoder(t){var e;switch(this.encoding=normalizeEncoding(t),this.encoding){case"utf16le":this.text=utf16Text,this.end=utf16End,e=4;break;case"utf8":this.fillLast=utf8FillLast,e=4;break;case"base64":this.text=base64Text,this.end=base64End,e=3;break;default:return this.write=simpleWrite,void(this.end=simpleEnd)}this.lastNeed=0,this.lastTotal=0,this.lastChar=Buffer.allocUnsafe(e)}function utf8CheckByte(t){return t<=127?0:t>>5==6?2:t>>4==14?3:t>>3==30?4:t>>6==2?-1:-2}function utf8CheckIncomplete(t,e,s){var i=e.length-1;if(i<s)return 0;var n=utf8CheckByte(e[i]);return n>=0?(n>0&&(t.lastNeed=n-1),n):--i<s||-2===n?0:(n=utf8CheckByte(e[i]))>=0?(n>0&&(t.lastNeed=n-2),n):--i<s||-2===n?0:(n=utf8CheckByte(e[i]))>=0?(n>0&&(2===n?n=0:t.lastNeed=n-3),n):0}function utf8CheckExtraBytes(t,e,s){if(128!=(192&e[0]))return t.lastNeed=0,"�";if(t.lastNeed>1&&e.length>1){if(128!=(192&e[1]))return t.lastNeed=1,"�";if(t.lastNeed>2&&e.length>2&&128!=(192&e[2]))return t.lastNeed=2,"�"}}function utf8FillLast(t){var e=this.lastTotal-this.lastNeed,s=utf8CheckExtraBytes(this,t,e);return void 0!==s?s:this.lastNeed<=t.length?(t.copy(this.lastChar,e,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):(t.copy(this.lastChar,e,0,t.length),void(this.lastNeed-=t.length))}function utf8Text(t,e){var s=utf8CheckIncomplete(this,t,e);if(!this.lastNeed)return t.toString("utf8",e);this.lastTotal=s;var i=t.length-(s-this.lastNeed);return t.copy(this.lastChar,0,i),t.toString("utf8",e,i)}function utf8End(t){var e=t&&t.length?this.write(t):"";return this.lastNeed?e+"�":e}function utf16Text(t,e){if((t.length-e)%2==0){var s=t.toString("utf16le",e);if(s){var i=s.charCodeAt(s.length-1);if(i>=55296&&i<=56319)return this.lastNeed=2,this.lastTotal=4,this.lastChar[0]=t[t.length-2],this.lastChar[1]=t[t.length-1],s.slice(0,-1)}return s}return this.lastNeed=1,this.lastTotal=2,this.lastChar[0]=t[t.length-1],t.toString("utf16le",e,t.length-1)}function utf16End(t){var e=t&&t.length?this.write(t):"";if(this.lastNeed){var s=this.lastTotal-this.lastNeed;return e+this.lastChar.toString("utf16le",0,s)}return e}function base64Text(t,e){var s=(t.length-e)%3;return 0===s?t.toString("base64",e):(this.lastNeed=3-s,this.lastTotal=3,1===s?this.lastChar[0]=t[t.length-1]:(this.lastChar[0]=t[t.length-2],this.lastChar[1]=t[t.length-1]),t.toString("base64",e,t.length-s))}function base64End(t){var e=t&&t.length?this.write(t):"";return this.lastNeed?e+this.lastChar.toString("base64",0,3-this.lastNeed):e}function simpleWrite(t){return t.toString(this.encoding)}function simpleEnd(t){return t&&t.length?this.write(t):""}exports.StringDecoder=StringDecoder,StringDecoder.prototype.write=function(t){if(0===t.length)return"";var e,s;if(this.lastNeed){if(void 0===(e=this.fillLast(t)))return"";s=this.lastNeed,this.lastNeed=0}else s=0;return s<t.length?e?e+this.text(t,s):this.text(t,s):e||""},StringDecoder.prototype.end=utf8End,StringDecoder.prototype.text=utf8Text,StringDecoder.prototype.fillLast=function(t){if(this.lastNeed<=t.length)return t.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal);t.copy(this.lastChar,this.lastTotal-this.lastNeed,0,t.length),this.lastNeed-=t.length}},{"safe-buffer":79}],85:[function(require,module,exports){(function(setImmediate,clearImmediate){var nextTick=require("process/browser.js").nextTick,apply=Function.prototype.apply,slice=Array.prototype.slice,immediateIds={},nextImmediateId=0;function Timeout(e,t){this._id=e,this._clearFn=t}exports.setTimeout=function(){return new Timeout(apply.call(setTimeout,window,arguments),clearTimeout)},exports.setInterval=function(){return new Timeout(apply.call(setInterval,window,arguments),clearInterval)},exports.clearTimeout=exports.clearInterval=function(e){e.close()},Timeout.prototype.unref=Timeout.prototype.ref=function(){},Timeout.prototype.close=function(){this._clearFn.call(window,this._id)},exports.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},exports.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},exports._unrefActive=exports.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},exports.setImmediate="function"==typeof setImmediate?setImmediate:function(e){var t=nextImmediateId++,i=!(arguments.length<2)&&slice.call(arguments,1);return immediateIds[t]=!0,nextTick(function(){immediateIds[t]&&(i?e.apply(null,i):e.call(null),exports.clearImmediate(t))}),t},exports.clearImmediate="function"==typeof clearImmediate?clearImmediate:function(e){delete immediateIds[e]}}).call(this,require("timers").setImmediate,require("timers").clearImmediate)},{"process/browser.js":66,timers:85}],86:[function(require,module,exports){var Buffer=require("buffer").Buffer;module.exports=function(e){if(e instanceof Uint8Array){if(0===e.byteOffset&&e.byteLength===e.buffer.byteLength)return e.buffer;if("function"==typeof e.buffer.slice)return e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}if(Buffer.isBuffer(e)){for(var f=new Uint8Array(e.length),r=e.length,t=0;t<r;t++)f[t]=e[t];return f.buffer}throw new Error("Argument must be a Buffer")}},{buffer:23}],87:[function(require,module,exports){"use strict";var punycode=require("punycode"),util=require("./util");function Url(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}exports.parse=urlParse,exports.resolve=urlResolve,exports.resolveObject=urlResolveObject,exports.format=urlFormat,exports.Url=Url;var protocolPattern=/^([a-z0-9.+-]+:)/i,portPattern=/:[0-9]*$/,simplePathPattern=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,delims=["<",">",'"',"`"," ","\r","\n","\t"],unwise=["{","}","|","\\","^","`"].concat(delims),autoEscape=["'"].concat(unwise),nonHostChars=["%","/","?",";","#"].concat(autoEscape),hostEndingChars=["/","?","#"],hostnameMaxLen=255,hostnamePartPattern=/^[+a-z0-9A-Z_-]{0,63}$/,hostnamePartStart=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,unsafeProtocol={javascript:!0,"javascript:":!0},hostlessProtocol={javascript:!0,"javascript:":!0},slashedProtocol={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},querystring=require("querystring");function urlParse(t,s,e){if(t&&util.isObject(t)&&t instanceof Url)return t;var h=new Url;return h.parse(t,s,e),h}function urlFormat(t){return util.isString(t)&&(t=urlParse(t)),t instanceof Url?t.format():Url.prototype.format.call(t)}function urlResolve(t,s){return urlParse(t,!1,!0).resolve(s)}function urlResolveObject(t,s){return t?urlParse(t,!1,!0).resolveObject(s):s}Url.prototype.parse=function(t,s,e){if(!util.isString(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var h=t.indexOf("?"),r=-1!==h&&h<t.indexOf("#")?"?":"#",a=t.split(r);a[0]=a[0].replace(/\\/g,"/");var o=t=a.join(r);if(o=o.trim(),!e&&1===t.split("#").length){var n=simplePathPattern.exec(o);if(n)return this.path=o,this.href=o,this.pathname=n[1],n[2]?(this.search=n[2],this.query=s?querystring.parse(this.search.substr(1)):this.search.substr(1)):s&&(this.search="",this.query={}),this}var i=protocolPattern.exec(o);if(i){var l=(i=i[0]).toLowerCase();this.protocol=l,o=o.substr(i.length)}if(e||i||o.match(/^\/\/[^@\/]+@[^@\/]+/)){var u="//"===o.substr(0,2);!u||i&&hostlessProtocol[i]||(o=o.substr(2),this.slashes=!0)}if(!hostlessProtocol[i]&&(u||i&&!slashedProtocol[i])){for(var p,c,f=-1,m=0;m<hostEndingChars.length;m++){-1!==(v=o.indexOf(hostEndingChars[m]))&&(-1===f||v<f)&&(f=v)}-1!==(c=-1===f?o.lastIndexOf("@"):o.lastIndexOf("@",f))&&(p=o.slice(0,c),o=o.slice(c+1),this.auth=decodeURIComponent(p)),f=-1;for(m=0;m<nonHostChars.length;m++){var v;-1!==(v=o.indexOf(nonHostChars[m]))&&(-1===f||v<f)&&(f=v)}-1===f&&(f=o.length),this.host=o.slice(0,f),o=o.slice(f),this.parseHost(),this.hostname=this.hostname||"";var g="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!g)for(var y=this.hostname.split(/\./),P=(m=0,y.length);m<P;m++){var d=y[m];if(d&&!d.match(hostnamePartPattern)){for(var b="",q=0,O=d.length;q<O;q++)d.charCodeAt(q)>127?b+="x":b+=d[q];if(!b.match(hostnamePartPattern)){var j=y.slice(0,m),x=y.slice(m+1),U=d.match(hostnamePartStart);U&&(j.push(U[1]),x.unshift(U[2])),x.length&&(o="/"+x.join(".")+o),this.hostname=j.join(".");break}}}this.hostname.length>hostnameMaxLen?this.hostname="":this.hostname=this.hostname.toLowerCase(),g||(this.hostname=punycode.toASCII(this.hostname));var C=this.port?":"+this.port:"",A=this.hostname||"";this.host=A+C,this.href+=this.host,g&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==o[0]&&(o="/"+o))}if(!unsafeProtocol[l])for(m=0,P=autoEscape.length;m<P;m++){var w=autoEscape[m];if(-1!==o.indexOf(w)){var E=encodeURIComponent(w);E===w&&(E=escape(w)),o=o.split(w).join(E)}}var I=o.indexOf("#");-1!==I&&(this.hash=o.substr(I),o=o.slice(0,I));var R=o.indexOf("?");if(-1!==R?(this.search=o.substr(R),this.query=o.substr(R+1),s&&(this.query=querystring.parse(this.query)),o=o.slice(0,R)):s&&(this.search="",this.query={}),o&&(this.pathname=o),slashedProtocol[l]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){C=this.pathname||"";var S=this.search||"";this.path=C+S}return this.href=this.format(),this},Url.prototype.format=function(){var t=this.auth||"";t&&(t=(t=encodeURIComponent(t)).replace(/%3A/i,":"),t+="@");var s=this.protocol||"",e=this.pathname||"",h=this.hash||"",r=!1,a="";this.host?r=t+this.host:this.hostname&&(r=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(r+=":"+this.port)),this.query&&util.isObject(this.query)&&Object.keys(this.query).length&&(a=querystring.stringify(this.query));var o=this.search||a&&"?"+a||"";return s&&":"!==s.substr(-1)&&(s+=":"),this.slashes||(!s||slashedProtocol[s])&&!1!==r?(r="//"+(r||""),e&&"/"!==e.charAt(0)&&(e="/"+e)):r||(r=""),h&&"#"!==h.charAt(0)&&(h="#"+h),o&&"?"!==o.charAt(0)&&(o="?"+o),s+r+(e=e.replace(/[?#]/g,function(t){return encodeURIComponent(t)}))+(o=o.replace("#","%23"))+h},Url.prototype.resolve=function(t){return this.resolveObject(urlParse(t,!1,!0)).format()},Url.prototype.resolveObject=function(t){if(util.isString(t)){var s=new Url;s.parse(t,!1,!0),t=s}for(var e=new Url,h=Object.keys(this),r=0;r<h.length;r++){var a=h[r];e[a]=this[a]}if(e.hash=t.hash,""===t.href)return e.href=e.format(),e;if(t.slashes&&!t.protocol){for(var o=Object.keys(t),n=0;n<o.length;n++){var i=o[n];"protocol"!==i&&(e[i]=t[i])}return slashedProtocol[e.protocol]&&e.hostname&&!e.pathname&&(e.path=e.pathname="/"),e.href=e.format(),e}if(t.protocol&&t.protocol!==e.protocol){if(!slashedProtocol[t.protocol]){for(var l=Object.keys(t),u=0;u<l.length;u++){var p=l[u];e[p]=t[p]}return e.href=e.format(),e}if(e.protocol=t.protocol,t.host||hostlessProtocol[t.protocol])e.pathname=t.pathname;else{for(var c=(t.pathname||"").split("/");c.length&&!(t.host=c.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==c[0]&&c.unshift(""),c.length<2&&c.unshift(""),e.pathname=c.join("/")}if(e.search=t.search,e.query=t.query,e.host=t.host||"",e.auth=t.auth,e.hostname=t.hostname||t.host,e.port=t.port,e.pathname||e.search){var f=e.pathname||"",m=e.search||"";e.path=f+m}return e.slashes=e.slashes||t.slashes,e.href=e.format(),e}var v=e.pathname&&"/"===e.pathname.charAt(0),g=t.host||t.pathname&&"/"===t.pathname.charAt(0),y=g||v||e.host&&t.pathname,P=y,d=e.pathname&&e.pathname.split("/")||[],b=(c=t.pathname&&t.pathname.split("/")||[],e.protocol&&!slashedProtocol[e.protocol]);if(b&&(e.hostname="",e.port=null,e.host&&(""===d[0]?d[0]=e.host:d.unshift(e.host)),e.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===c[0]?c[0]=t.host:c.unshift(t.host)),t.host=null),y=y&&(""===c[0]||""===d[0])),g)e.host=t.host||""===t.host?t.host:e.host,e.hostname=t.hostname||""===t.hostname?t.hostname:e.hostname,e.search=t.search,e.query=t.query,d=c;else if(c.length)d||(d=[]),d.pop(),d=d.concat(c),e.search=t.search,e.query=t.query;else if(!util.isNullOrUndefined(t.search)){if(b)e.hostname=e.host=d.shift(),(U=!!(e.host&&e.host.indexOf("@")>0)&&e.host.split("@"))&&(e.auth=U.shift(),e.host=e.hostname=U.shift());return e.search=t.search,e.query=t.query,util.isNull(e.pathname)&&util.isNull(e.search)||(e.path=(e.pathname?e.pathname:"")+(e.search?e.search:"")),e.href=e.format(),e}if(!d.length)return e.pathname=null,e.search?e.path="/"+e.search:e.path=null,e.href=e.format(),e;for(var q=d.slice(-1)[0],O=(e.host||t.host||d.length>1)&&("."===q||".."===q)||""===q,j=0,x=d.length;x>=0;x--)"."===(q=d[x])?d.splice(x,1):".."===q?(d.splice(x,1),j++):j&&(d.splice(x,1),j--);if(!y&&!P)for(;j--;j)d.unshift("..");!y||""===d[0]||d[0]&&"/"===d[0].charAt(0)||d.unshift(""),O&&"/"!==d.join("/").substr(-1)&&d.push("");var U,C=""===d[0]||d[0]&&"/"===d[0].charAt(0);b&&(e.hostname=e.host=C?"":d.length?d.shift():"",(U=!!(e.host&&e.host.indexOf("@")>0)&&e.host.split("@"))&&(e.auth=U.shift(),e.host=e.hostname=U.shift()));return(y=y||e.host&&d.length)&&!C&&d.unshift(""),d.length?e.pathname=d.join("/"):(e.pathname=null,e.path=null),util.isNull(e.pathname)&&util.isNull(e.search)||(e.path=(e.pathname?e.pathname:"")+(e.search?e.search:"")),e.auth=t.auth||e.auth,e.slashes=e.slashes||t.slashes,e.href=e.format(),e},Url.prototype.parseHost=function(){var t=this.host,s=portPattern.exec(t);s&&(":"!==(s=s[0])&&(this.port=s.substr(1)),t=t.substr(0,t.length-s.length)),t&&(this.hostname=t)}},{"./util":88,punycode:22,querystring:69}],88:[function(require,module,exports){"use strict";module.exports={isString:function(n){return"string"==typeof n},isObject:function(n){return"object"==typeof n&&null!==n},isNull:function(n){return null===n},isNullOrUndefined:function(n){return null==n}}},{}],89:[function(require,module,exports){(function(global){function deprecate(r,e){if(config("noDeprecation"))return r;var o=!1;return function(){if(!o){if(config("throwDeprecation"))throw new Error(e);config("traceDeprecation")?console.trace(e):console.warn(e),o=!0}return r.apply(this,arguments)}}function config(r){try{if(!global.localStorage)return!1}catch(r){return!1}var e=global.localStorage[r];return null!=e&&"true"===String(e).toLowerCase()}module.exports=deprecate}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],90:[function(require,module,exports){module.exports=extend;var hasOwnProperty=Object.prototype.hasOwnProperty;function extend(){for(var r={},e=0;e<arguments.length;e++){var t=arguments[e];for(var n in t)hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r}},{}]},{},[3])(3)});
//# sourceMappingURL=ref-parser.min.js.map
//# sourceMappingURL=ref-parser.min.js.map
!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((t="undefined"!=typeof globalThis?globalThis:t||self).JSONPath={})}(this,(function(t){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function e(t){return(e=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function n(t,r){return(n=Object.setPrototypeOf||function(t,r){return t.__proto__=r,t})(t,r)}function a(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function o(t,r,e){return(o=a()?Reflect.construct:function(t,r,e){var a=[null];a.push.apply(a,r);var o=new(Function.bind.apply(t,a));return e&&n(o,e.prototype),o}).apply(null,arguments)}function u(t){var r="function"==typeof Map?new Map:void 0;return(u=function(t){if(null===t||(a=t,-1===Function.toString.call(a).indexOf("[native code]")))return t;var a;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==r){if(r.has(t))return r.get(t);r.set(t,u)}function u(){return o(t,arguments,e(this).constructor)}return u.prototype=Object.create(t.prototype,{constructor:{value:u,enumerable:!1,writable:!0,configurable:!0}}),n(u,t)})(t)}function i(t,r){return!r||"object"!=typeof r&&"function"!=typeof r?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):r}function c(t){return function(t){if(Array.isArray(t))return s(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||l(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t,r){if(t){if("string"==typeof t)return s(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?s(t,r):void 0}}function s(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}var p=Object.prototype.hasOwnProperty;function f(t,r){return(t=t.slice()).push(r),t}function h(t,r){return(r=r.slice()).unshift(t),r}var y=function(t){!function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),r&&n(t,r)}(c,t);var r,o,u=(r=c,o=a(),function(){var t,n=e(r);if(o){var a=e(this).constructor;t=Reflect.construct(n,arguments,a)}else t=n.apply(this,arguments);return i(this,t)});function c(t){var r;return function(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,c),(r=u.call(this,'JSONPath should not be called with "new" (it prevents return of (unwrapped) scalar values)')).avoidNew=!0,r.value=t,r.name="NewError",r}return c}(u(Error));function v(t,e,n,a,o){if(!(this instanceof v))try{return new v(t,e,n,a,o)}catch(t){if(!t.avoidNew)throw t;return t.value}"string"==typeof t&&(o=a,a=n,n=e,e=t,t=null);var u=t&&"object"===r(t);if(t=t||{},this.json=t.json||n,this.path=t.path||e,this.resultType=t.resultType||"value",this.flatten=t.flatten||!1,this.wrap=!p.call(t,"wrap")||t.wrap,this.sandbox=t.sandbox||{},this.preventEval=t.preventEval||!1,this.parent=t.parent||null,this.parentProperty=t.parentProperty||null,this.callback=t.callback||a||null,this.otherTypeCallback=t.otherTypeCallback||o||function(){throw new TypeError("You must supply an otherTypeCallback callback option with the @other() operator.")},!1!==t.autostart){var i={path:u?t.path:e};u?"json"in t&&(i.json=t.json):i.json=n;var c=this.evaluate(i);if(!c||"object"!==r(c))throw new y(c);return c}}v.prototype.evaluate=function(t,e,n,a){var o=this,u=this.parent,i=this.parentProperty,c=this.flatten,l=this.wrap;if(this.currResultType=this.resultType,this.currPreventEval=this.preventEval,this.currSandbox=this.sandbox,n=n||this.callback,this.currOtherTypeCallback=a||this.otherTypeCallback,e=e||this.json,(t=t||this.path)&&"object"===r(t)&&!Array.isArray(t)){if(!t.path&&""!==t.path)throw new TypeError('You must supply a "path" property when providing an object argument to JSONPath.evaluate().');if(!p.call(t,"json"))throw new TypeError('You must supply a "json" property when providing an object argument to JSONPath.evaluate().');e=t.json,c=p.call(t,"flatten")?t.flatten:c,this.currResultType=p.call(t,"resultType")?t.resultType:this.currResultType,this.currSandbox=p.call(t,"sandbox")?t.sandbox:this.currSandbox,l=p.call(t,"wrap")?t.wrap:l,this.currPreventEval=p.call(t,"preventEval")?t.preventEval:this.currPreventEval,n=p.call(t,"callback")?t.callback:n,this.currOtherTypeCallback=p.call(t,"otherTypeCallback")?t.otherTypeCallback:this.currOtherTypeCallback,u=p.call(t,"parent")?t.parent:u,i=p.call(t,"parentProperty")?t.parentProperty:i,t=t.path}if(u=u||null,i=i||null,Array.isArray(t)&&(t=v.toPathString(t)),(t||""===t)&&e){var s=v.toPathArray(t);"$"===s[0]&&s.length>1&&s.shift(),this._hasParentSelector=null;var f=this._trace(s,e,["$"],u,i,n).filter((function(t){return t&&!t.isParentSelector}));return f.length?l||1!==f.length||f[0].hasArrExpr?f.reduce((function(t,r){var e=o._getPreferredOutput(r);return c&&Array.isArray(e)?t=t.concat(e):t.push(e),t}),[]):this._getPreferredOutput(f[0]):l?[]:void 0}},v.prototype._getPreferredOutput=function(t){var r=this.currResultType;switch(r){case"all":var e=Array.isArray(t.path)?t.path:v.toPathArray(t.path);return t.pointer=v.toPointer(e),t.path="string"==typeof t.path?t.path:v.toPathString(t.path),t;case"value":case"parent":case"parentProperty":return t[r];case"path":return v.toPathString(t[r]);case"pointer":return v.toPointer(t.path);default:throw new TypeError("Unknown result type")}},v.prototype._handleCallback=function(t,r,e){if(r){var n=this._getPreferredOutput(t);t.path="string"==typeof t.path?t.path:v.toPathString(t.path),r(n,e,t)}},v.prototype._trace=function(t,e,n,a,o,u,i,c){var s,y=this;if(!t.length)return s={path:n,value:e,parent:a,parentProperty:o,hasArrExpr:i},this._handleCallback(s,u,"value"),s;var v=t[0],b=t.slice(1),F=[];function d(t){Array.isArray(t)?t.forEach((function(t){F.push(t)})):F.push(t)}if(("string"!=typeof v||c)&&e&&p.call(e,v))d(this._trace(b,e[v],f(n,v),e,v,u,i));else if("*"===v)this._walk(v,b,e,n,a,o,u,(function(t,r,e,n,a,o,u,i){d(y._trace(h(t,e),n,a,o,u,i,!0,!0))}));else if(".."===v)d(this._trace(b,e,n,a,o,u,i)),this._walk(v,b,e,n,a,o,u,(function(t,e,n,a,o,u,i,c){"object"===r(a[t])&&d(y._trace(h(e,n),a[t],f(o,t),a,t,c,!0))}));else{if("^"===v)return this._hasParentSelector=!0,{path:n.slice(0,-1),expr:b,isParentSelector:!0};if("~"===v)return s={path:f(n,v),value:o,parent:a,parentProperty:null},this._handleCallback(s,u,"property"),s;if("$"===v)d(this._trace(b,e,n,null,null,u,i));else if(/^(\x2D?[0-9]*):(\x2D?[0-9]*):?([0-9]*)$/.test(v))d(this._slice(v,b,e,n,a,o,u));else if(0===v.indexOf("?(")){if(this.currPreventEval)throw new Error("Eval [?(expr)] prevented in JSONPath expression.");this._walk(v,b,e,n,a,o,u,(function(t,r,e,n,a,o,u,i){y._eval(r.replace(/^\?\(((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?)\)$/,"$1"),n[t],t,a,o,u)&&d(y._trace(h(t,e),n,a,o,u,i,!0))}))}else if("("===v[0]){if(this.currPreventEval)throw new Error("Eval [(expr)] prevented in JSONPath expression.");d(this._trace(h(this._eval(v,e,n[n.length-1],n.slice(0,-1),a,o),b),e,n,a,o,u,i))}else if("@"===v[0]){var g=!1,_=v.slice(1,-2);switch(_){case"scalar":e&&["object","function"].includes(r(e))||(g=!0);break;case"boolean":case"string":case"undefined":case"function":r(e)===_&&(g=!0);break;case"integer":!Number.isFinite(e)||e%1||(g=!0);break;case"number":Number.isFinite(e)&&(g=!0);break;case"nonFinite":"number"!=typeof e||Number.isFinite(e)||(g=!0);break;case"object":e&&r(e)===_&&(g=!0);break;case"array":Array.isArray(e)&&(g=!0);break;case"other":g=this.currOtherTypeCallback(e,n,a,o);break;case"null":null===e&&(g=!0);break;default:throw new TypeError("Unknown value type "+_)}if(g)return s={path:n,value:e,parent:a,parentProperty:o},this._handleCallback(s,u,"value"),s}else if("`"===v[0]&&e&&p.call(e,v.slice(1))){var w=v.slice(1);d(this._trace(b,e[w],f(n,w),e,w,u,i,!0))}else if(v.includes(",")){var m,P=function(t,r){var e="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!e){if(Array.isArray(t)||(e=l(t))||r&&t&&"number"==typeof t.length){e&&(t=e);var n=0,a=function(){};return{s:a,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,u=!0,i=!1;return{s:function(){e=e.call(t)},n:function(){var t=e.next();return u=t.done,t},e:function(t){i=!0,o=t},f:function(){try{u||null==e.return||e.return()}finally{if(i)throw o}}}}(v.split(","));try{for(P.s();!(m=P.n()).done;){var D=m.value;d(this._trace(h(D,b),e,n,a,o,u,!0))}}catch(t){P.e(t)}finally{P.f()}}else!c&&e&&p.call(e,v)&&d(this._trace(b,e[v],f(n,v),e,v,u,i,!0))}if(this._hasParentSelector)for(var x=0;x<F.length;x++){var S=F[x];if(S&&S.isParentSelector){var E=this._trace(S.expr,e,S.path,a,o,u,i);if(Array.isArray(E)){F[x]=E[0];for(var A=E.length,j=1;j<A;j++)x++,F.splice(x,0,E[j])}else F[x]=E}}return F},v.prototype._walk=function(t,e,n,a,o,u,i,c){if(Array.isArray(n))for(var l=n.length,s=0;s<l;s++)c(s,t,e,n,a,o,u,i);else n&&"object"===r(n)&&Object.keys(n).forEach((function(r){c(r,t,e,n,a,o,u,i)}))},v.prototype._slice=function(t,r,e,n,a,o,u){if(Array.isArray(e)){var i=e.length,c=t.split(":"),l=c[2]&&Number.parseInt(c[2])||1,s=c[0]&&Number.parseInt(c[0])||0,p=c[1]&&Number.parseInt(c[1])||i;s=s<0?Math.max(0,s+i):Math.min(i,s),p=p<0?Math.max(0,p+i):Math.min(i,p);for(var f=[],y=s;y<p;y+=l){this._trace(h(y,r),e,n,a,o,u,!0).forEach((function(t){f.push(t)}))}return f}},v.prototype._eval=function(t,r,e,n,a,o){t.includes("@parentProperty")&&(this.currSandbox._$_parentProperty=o,t=t.replace(/@parentProperty/g,"_$_parentProperty")),t.includes("@parent")&&(this.currSandbox._$_parent=a,t=t.replace(/@parent/g,"_$_parent")),t.includes("@property")&&(this.currSandbox._$_property=e,t=t.replace(/@property/g,"_$_property")),t.includes("@path")&&(this.currSandbox._$_path=v.toPathString(n.concat([e])),t=t.replace(/@path/g,"_$_path")),t.includes("@root")&&(this.currSandbox._$_root=this.json,t=t.replace(/@root/g,"_$_root")),/@([\t-\r \)\.\[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/.test(t)&&(this.currSandbox._$_v=r,t=t.replace(/@([\t-\r \)\.\[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/g,"_$_v$1"));try{return this.vm.runInNewContext(t,this.currSandbox)}catch(r){throw console.log(r),new Error("jsonPath: "+r.message+": "+t)}},v.cache={},v.toPathString=function(t){for(var r=t,e=r.length,n="$",a=1;a<e;a++)/^(~|\^|@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\(\))$/.test(r[a])||(n+=/^[\*0-9]+$/.test(r[a])?"["+r[a]+"]":"['"+r[a]+"']");return n},v.toPointer=function(t){for(var r=t,e=r.length,n="",a=1;a<e;a++)/^(~|\^|@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\(\))$/.test(r[a])||(n+="/"+r[a].toString().replace(/~/g,"~0").replace(/\//g,"~1"));return n},v.toPathArray=function(t){var r=v.cache;if(r[t])return r[t].concat();var e=[],n=t.replace(/@(?:null|boolean|number|string|integer|undefined|nonFinite|scalar|array|object|function|other)\(\)/g,";$&;").replace(/['\[](\??\((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\))['\]]/g,(function(t,r){return"[#"+(e.push(r)-1)+"]"})).replace(/\[["']((?:(?!['\]])[\s\S])*)["']\]/g,(function(t,r){return"['"+r.replace(/\./g,"%@%").replace(/~/g,"%%@@%%")+"']"})).replace(/~/g,";~;").replace(/["']?\.["']?(?!(?:(?!\[)[\s\S])*\])|\[["']?/g,";").replace(/%@%/g,".").replace(/%%@@%%/g,"~").replace(/(?:;)?(\^+)(?:;)?/g,(function(t,r){return";"+r.split("").join(";")+";"})).replace(/;;;|;;/g,";..;").replace(/;$|'?\]|'$/g,"").split(";").map((function(t){var r=t.match(/#([0-9]+)/);return r&&r[1]?e[r[1]]:t}));return r[t]=n,r[t].concat()};v.prototype.vm={runInNewContext:function(t,r){var e=Object.keys(r),n=[];!function(t,r,e){for(var n=t.length,a=0;a<n;a++)e(t[a])&&r.push(t.splice(a--,1)[0])}(e,n,(function(t){return"function"==typeof r[t]}));var a=e.map((function(t,e){return r[t]})),u=n.reduce((function(t,e){var n=r[e].toString();return/function/.test(n)||(n="function "+n),"var "+e+"="+n+";"+t}),"");/(["'])use strict\1/.test(t=u+t)||e.includes("arguments")||(t="var arguments = undefined;"+t);var i=(t=t.replace(/;[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$/,"")).lastIndexOf(";"),l=i>-1?t.slice(0,i+1)+" return "+t.slice(i+1):" return "+t;return o(Function,c(e).concat([l])).apply(void 0,c(a))}},t.JSONPath=v,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=index-browser-umd.min.js.map

var JSONSchemaFaker = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // src/lib/vendor.js
  var require_vendor = __commonJS({
    "src/lib/vendor.js"(exports, module) {
      var DEPENDENCIES = {};
      var getDependencies = () => {
        return DEPENDENCIES;
      };
      var setDependencies = (value) => {
        Object.assign(DEPENDENCIES, value);
      };
      Object.assign(module.exports, { getDependencies, setDependencies });
    }
  });

  // src/lib/class/Registry.js
  var require_Registry = __commonJS({
    "src/lib/class/Registry.js"(exports, module) {
      var Registry = class {
        constructor() {
          this.data = {};
        }
        unregister(name) {
          if (!name) {
            this.data = {};
          } else {
            delete this.data[name];
          }
        }
        register(name, callback) {
          this.data[name] = callback;
        }
        registerMany(formats) {
          Object.keys(formats).forEach((name) => {
            this.data[name] = formats[name];
          });
        }
        get(name) {
          const format = this.data[name];
          return format;
        }
        list() {
          return this.data;
        }
      };
      var Registry_default = Registry;
      module.exports = Registry_default;
    }
  });

  // src/lib/api/defaults.js
  var require_defaults = __commonJS({
    "src/lib/api/defaults.js"(exports, module) {
      var defaults = {};
      var defaults_default = defaults;
      defaults.defaultInvalidTypeProduct = void 0;
      defaults.defaultRandExpMax = 10;
      defaults.ignoreProperties = [];
      defaults.ignoreMissingRefs = false;
      defaults.failOnInvalidTypes = true;
      defaults.failOnInvalidFormat = true;
      defaults.alwaysFakeOptionals = false;
      defaults.optionalsProbability = null;
      defaults.fixedProbabilities = false;
      defaults.useExamplesValue = false;
      defaults.useDefaultValue = false;
      defaults.requiredOnly = false;
      defaults.minItems = 0;
      defaults.maxItems = null;
      defaults.minLength = 0;
      defaults.maxLength = null;
      defaults.resolveJsonPath = false;
      defaults.reuseProperties = false;
      defaults.fillProperties = true;
      defaults.replaceEmptyByRandomValue = false;
      defaults.random = Math.random;
      defaults.renderTitle = true;
      defaults.renderDescription = true;
      defaults.renderComment = false;
      module.exports = defaults_default;
    }
  });

  // src/lib/class/OptionRegistry.js
  var require_OptionRegistry = __commonJS({
    "src/lib/class/OptionRegistry.js"(exports, module) {
      var Registry = require_Registry();
      var defaults = require_defaults();
      var OptionRegistry = class extends Registry {
        constructor() {
          super();
          this.data = __spreadValues({}, defaults);
          this._defaults = defaults;
        }
        get defaults() {
          return __spreadValues({}, this._defaults);
        }
      };
      var OptionRegistry_default = OptionRegistry;
      module.exports = OptionRegistry_default;
    }
  });

  // src/lib/api/option.js
  var require_option = __commonJS({
    "src/lib/api/option.js"(exports, module) {
      var OptionRegistry = require_OptionRegistry();
      var registry = new OptionRegistry();
      function optionAPI(nameOrOptionMap, optionalValue) {
        if (typeof nameOrOptionMap === "string") {
          if (typeof optionalValue !== "undefined") {
            return registry.register(nameOrOptionMap, optionalValue);
          }
          return registry.get(nameOrOptionMap);
        }
        return registry.registerMany(nameOrOptionMap);
      }
      optionAPI.getDefaults = () => registry.defaults;
      var option_default = optionAPI;
      module.exports = option_default;
    }
  });

  // src/lib/core/constants.js
  var require_constants = __commonJS({
    "src/lib/core/constants.js"(exports, module) {
      var ALLOWED_TYPES = ["integer", "number", "string", "boolean"];
      var SCALAR_TYPES = ALLOWED_TYPES.concat(["null"]);
      var ALL_TYPES = ["array", "object"].concat(SCALAR_TYPES);
      var MOST_NEAR_DATETIME = 2524608e6;
      var MIN_INTEGER = -1e8;
      var MAX_INTEGER = 1e8;
      var MIN_NUMBER = -100;
      var MAX_NUMBER = 100;
      var constants_default = {
        ALLOWED_TYPES,
        SCALAR_TYPES,
        ALL_TYPES,
        MIN_NUMBER,
        MAX_NUMBER,
        MIN_INTEGER,
        MAX_INTEGER,
        MOST_NEAR_DATETIME
      };
      module.exports = constants_default;
    }
  });

  // node_modules/ret/lib/types.js
  var require_types = __commonJS({
    "node_modules/ret/lib/types.js"(exports, module) {
      module.exports = {
        ROOT: 0,
        GROUP: 1,
        POSITION: 2,
        SET: 3,
        RANGE: 4,
        REPETITION: 5,
        REFERENCE: 6,
        CHAR: 7
      };
    }
  });

  // node_modules/ret/lib/sets.js
  var require_sets = __commonJS({
    "node_modules/ret/lib/sets.js"(exports) {
      var types = require_types();
      var INTS = () => [{ type: types.RANGE, from: 48, to: 57 }];
      var WORDS = () => {
        return [
          { type: types.CHAR, value: 95 },
          { type: types.RANGE, from: 97, to: 122 },
          { type: types.RANGE, from: 65, to: 90 }
        ].concat(INTS());
      };
      var WHITESPACE = () => {
        return [
          { type: types.CHAR, value: 9 },
          { type: types.CHAR, value: 10 },
          { type: types.CHAR, value: 11 },
          { type: types.CHAR, value: 12 },
          { type: types.CHAR, value: 13 },
          { type: types.CHAR, value: 32 },
          { type: types.CHAR, value: 160 },
          { type: types.CHAR, value: 5760 },
          { type: types.RANGE, from: 8192, to: 8202 },
          { type: types.CHAR, value: 8232 },
          { type: types.CHAR, value: 8233 },
          { type: types.CHAR, value: 8239 },
          { type: types.CHAR, value: 8287 },
          { type: types.CHAR, value: 12288 },
          { type: types.CHAR, value: 65279 }
        ];
      };
      var NOTANYCHAR = () => {
        return [
          { type: types.CHAR, value: 10 },
          { type: types.CHAR, value: 13 },
          { type: types.CHAR, value: 8232 },
          { type: types.CHAR, value: 8233 }
        ];
      };
      exports.words = () => ({ type: types.SET, set: WORDS(), not: false });
      exports.notWords = () => ({ type: types.SET, set: WORDS(), not: true });
      exports.ints = () => ({ type: types.SET, set: INTS(), not: false });
      exports.notInts = () => ({ type: types.SET, set: INTS(), not: true });
      exports.whitespace = () => ({ type: types.SET, set: WHITESPACE(), not: false });
      exports.notWhitespace = () => ({ type: types.SET, set: WHITESPACE(), not: true });
      exports.anyChar = () => ({ type: types.SET, set: NOTANYCHAR(), not: true });
    }
  });

  // node_modules/ret/lib/util.js
  var require_util = __commonJS({
    "node_modules/ret/lib/util.js"(exports) {
      var types = require_types();
      var sets = require_sets();
      var CTRL = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?";
      var SLSH = { "0": 0, "t": 9, "n": 10, "v": 11, "f": 12, "r": 13 };
      exports.strToChars = function(str) {
        var chars_regex = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
        str = str.replace(chars_regex, function(s, b, lbs, a16, b16, c8, dctrl, eslsh) {
          if (lbs) {
            return s;
          }
          var code = b ? 8 : a16 ? parseInt(a16, 16) : b16 ? parseInt(b16, 16) : c8 ? parseInt(c8, 8) : dctrl ? CTRL.indexOf(dctrl) : SLSH[eslsh];
          var c = String.fromCharCode(code);
          if (/[[\]{}^$.|?*+()]/.test(c)) {
            c = "\\" + c;
          }
          return c;
        });
        return str;
      };
      exports.tokenizeClass = (str, regexpStr) => {
        var tokens = [];
        var regexp = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g;
        var rs, c;
        while ((rs = regexp.exec(str)) != null) {
          if (rs[1]) {
            tokens.push(sets.words());
          } else if (rs[2]) {
            tokens.push(sets.ints());
          } else if (rs[3]) {
            tokens.push(sets.whitespace());
          } else if (rs[4]) {
            tokens.push(sets.notWords());
          } else if (rs[5]) {
            tokens.push(sets.notInts());
          } else if (rs[6]) {
            tokens.push(sets.notWhitespace());
          } else if (rs[7]) {
            tokens.push({
              type: types.RANGE,
              from: (rs[8] || rs[9]).charCodeAt(0),
              to: rs[10].charCodeAt(0)
            });
          } else if (c = rs[12]) {
            tokens.push({
              type: types.CHAR,
              value: c.charCodeAt(0)
            });
          } else {
            return [tokens, regexp.lastIndex];
          }
        }
        exports.error(regexpStr, "Unterminated character class");
      };
      exports.error = (regexp, msg) => {
        throw new SyntaxError("Invalid regular expression: /" + regexp + "/: " + msg);
      };
    }
  });

  // node_modules/ret/lib/positions.js
  var require_positions = __commonJS({
    "node_modules/ret/lib/positions.js"(exports) {
      var types = require_types();
      exports.wordBoundary = () => ({ type: types.POSITION, value: "b" });
      exports.nonWordBoundary = () => ({ type: types.POSITION, value: "B" });
      exports.begin = () => ({ type: types.POSITION, value: "^" });
      exports.end = () => ({ type: types.POSITION, value: "$" });
    }
  });

  // node_modules/ret/lib/index.js
  var require_lib = __commonJS({
    "node_modules/ret/lib/index.js"(exports, module) {
      var util = require_util();
      var types = require_types();
      var sets = require_sets();
      var positions = require_positions();
      module.exports = (regexpStr) => {
        var i = 0, l, c, start = { type: types.ROOT, stack: [] }, lastGroup = start, last = start.stack, groupStack = [];
        var repeatErr = (i2) => {
          util.error(regexpStr, `Nothing to repeat at column ${i2 - 1}`);
        };
        var str = util.strToChars(regexpStr);
        l = str.length;
        while (i < l) {
          c = str[i++];
          switch (c) {
            case "\\":
              c = str[i++];
              switch (c) {
                case "b":
                  last.push(positions.wordBoundary());
                  break;
                case "B":
                  last.push(positions.nonWordBoundary());
                  break;
                case "w":
                  last.push(sets.words());
                  break;
                case "W":
                  last.push(sets.notWords());
                  break;
                case "d":
                  last.push(sets.ints());
                  break;
                case "D":
                  last.push(sets.notInts());
                  break;
                case "s":
                  last.push(sets.whitespace());
                  break;
                case "S":
                  last.push(sets.notWhitespace());
                  break;
                default:
                  if (/\d/.test(c)) {
                    last.push({ type: types.REFERENCE, value: parseInt(c, 10) });
                  } else {
                    last.push({ type: types.CHAR, value: c.charCodeAt(0) });
                  }
              }
              break;
            case "^":
              last.push(positions.begin());
              break;
            case "$":
              last.push(positions.end());
              break;
            case "[":
              var not;
              if (str[i] === "^") {
                not = true;
                i++;
              } else {
                not = false;
              }
              var classTokens = util.tokenizeClass(str.slice(i), regexpStr);
              i += classTokens[1];
              last.push({
                type: types.SET,
                set: classTokens[0],
                not
              });
              break;
            case ".":
              last.push(sets.anyChar());
              break;
            case "(":
              var group = {
                type: types.GROUP,
                stack: [],
                remember: true
              };
              c = str[i];
              if (c === "?") {
                c = str[i + 1];
                i += 2;
                if (c === "=") {
                  group.followedBy = true;
                } else if (c === "!") {
                  group.notFollowedBy = true;
                } else if (c !== ":") {
                  util.error(regexpStr, `Invalid group, character '${c}' after '?' at column ${i - 1}`);
                }
                group.remember = false;
              }
              last.push(group);
              groupStack.push(lastGroup);
              lastGroup = group;
              last = group.stack;
              break;
            case ")":
              if (groupStack.length === 0) {
                util.error(regexpStr, `Unmatched ) at column ${i - 1}`);
              }
              lastGroup = groupStack.pop();
              last = lastGroup.options ? lastGroup.options[lastGroup.options.length - 1] : lastGroup.stack;
              break;
            case "|":
              if (!lastGroup.options) {
                lastGroup.options = [lastGroup.stack];
                delete lastGroup.stack;
              }
              var stack = [];
              lastGroup.options.push(stack);
              last = stack;
              break;
            case "{":
              var rs = /^(\d+)(,(\d+)?)?\}/.exec(str.slice(i)), min, max;
              if (rs !== null) {
                if (last.length === 0) {
                  repeatErr(i);
                }
                min = parseInt(rs[1], 10);
                max = rs[2] ? rs[3] ? parseInt(rs[3], 10) : Infinity : min;
                i += rs[0].length;
                last.push({
                  type: types.REPETITION,
                  min,
                  max,
                  value: last.pop()
                });
              } else {
                last.push({
                  type: types.CHAR,
                  value: 123
                });
              }
              break;
            case "?":
              if (last.length === 0) {
                repeatErr(i);
              }
              last.push({
                type: types.REPETITION,
                min: 0,
                max: 1,
                value: last.pop()
              });
              break;
            case "+":
              if (last.length === 0) {
                repeatErr(i);
              }
              last.push({
                type: types.REPETITION,
                min: 1,
                max: Infinity,
                value: last.pop()
              });
              break;
            case "*":
              if (last.length === 0) {
                repeatErr(i);
              }
              last.push({
                type: types.REPETITION,
                min: 0,
                max: Infinity,
                value: last.pop()
              });
              break;
            default:
              last.push({
                type: types.CHAR,
                value: c.charCodeAt(0)
              });
          }
        }
        if (groupStack.length !== 0) {
          util.error(regexpStr, "Unterminated group");
        }
        return start;
      };
      module.exports.types = types;
    }
  });

  // node_modules/drange/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/drange/lib/index.js"(exports, module) {
      "use strict";
      var SubRange = class {
        constructor(low, high) {
          this.low = low;
          this.high = high;
          this.length = 1 + high - low;
        }
        overlaps(range) {
          return !(this.high < range.low || this.low > range.high);
        }
        touches(range) {
          return !(this.high + 1 < range.low || this.low - 1 > range.high);
        }
        add(range) {
          return new SubRange(Math.min(this.low, range.low), Math.max(this.high, range.high));
        }
        subtract(range) {
          if (range.low <= this.low && range.high >= this.high) {
            return [];
          } else if (range.low > this.low && range.high < this.high) {
            return [
              new SubRange(this.low, range.low - 1),
              new SubRange(range.high + 1, this.high)
            ];
          } else if (range.low <= this.low) {
            return [new SubRange(range.high + 1, this.high)];
          } else {
            return [new SubRange(this.low, range.low - 1)];
          }
        }
        toString() {
          return this.low == this.high ? this.low.toString() : this.low + "-" + this.high;
        }
      };
      var DRange = class {
        constructor(a, b) {
          this.ranges = [];
          this.length = 0;
          if (a != null)
            this.add(a, b);
        }
        _update_length() {
          this.length = this.ranges.reduce((previous, range) => {
            return previous + range.length;
          }, 0);
        }
        add(a, b) {
          var _add = (subrange) => {
            var i = 0;
            while (i < this.ranges.length && !subrange.touches(this.ranges[i])) {
              i++;
            }
            var newRanges = this.ranges.slice(0, i);
            while (i < this.ranges.length && subrange.touches(this.ranges[i])) {
              subrange = subrange.add(this.ranges[i]);
              i++;
            }
            newRanges.push(subrange);
            this.ranges = newRanges.concat(this.ranges.slice(i));
            this._update_length();
          };
          if (a instanceof DRange) {
            a.ranges.forEach(_add);
          } else {
            if (b == null)
              b = a;
            _add(new SubRange(a, b));
          }
          return this;
        }
        subtract(a, b) {
          var _subtract = (subrange) => {
            var i = 0;
            while (i < this.ranges.length && !subrange.overlaps(this.ranges[i])) {
              i++;
            }
            var newRanges = this.ranges.slice(0, i);
            while (i < this.ranges.length && subrange.overlaps(this.ranges[i])) {
              newRanges = newRanges.concat(this.ranges[i].subtract(subrange));
              i++;
            }
            this.ranges = newRanges.concat(this.ranges.slice(i));
            this._update_length();
          };
          if (a instanceof DRange) {
            a.ranges.forEach(_subtract);
          } else {
            if (b == null)
              b = a;
            _subtract(new SubRange(a, b));
          }
          return this;
        }
        intersect(a, b) {
          var newRanges = [];
          var _intersect = (subrange) => {
            var i = 0;
            while (i < this.ranges.length && !subrange.overlaps(this.ranges[i])) {
              i++;
            }
            while (i < this.ranges.length && subrange.overlaps(this.ranges[i])) {
              var low = Math.max(this.ranges[i].low, subrange.low);
              var high = Math.min(this.ranges[i].high, subrange.high);
              newRanges.push(new SubRange(low, high));
              i++;
            }
          };
          if (a instanceof DRange) {
            a.ranges.forEach(_intersect);
          } else {
            if (b == null)
              b = a;
            _intersect(new SubRange(a, b));
          }
          this.ranges = newRanges;
          this._update_length();
          return this;
        }
        index(index) {
          var i = 0;
          while (i < this.ranges.length && this.ranges[i].length <= index) {
            index -= this.ranges[i].length;
            i++;
          }
          return this.ranges[i].low + index;
        }
        toString() {
          return "[ " + this.ranges.join(", ") + " ]";
        }
        clone() {
          return new DRange(this);
        }
        numbers() {
          return this.ranges.reduce((result, subrange) => {
            var i = subrange.low;
            while (i <= subrange.high) {
              result.push(i);
              i++;
            }
            return result;
          }, []);
        }
        subranges() {
          return this.ranges.map((subrange) => ({
            low: subrange.low,
            high: subrange.high,
            length: 1 + subrange.high - subrange.low
          }));
        }
      };
      module.exports = DRange;
    }
  });

  // node_modules/randexp/lib/randexp.js
  var require_randexp = __commonJS({
    "node_modules/randexp/lib/randexp.js"(exports, module) {
      var ret = require_lib();
      var DRange = require_lib2();
      var types = ret.types;
      module.exports = class RandExp {
        constructor(regexp, m) {
          this._setDefaults(regexp);
          if (regexp instanceof RegExp) {
            this.ignoreCase = regexp.ignoreCase;
            this.multiline = regexp.multiline;
            regexp = regexp.source;
          } else if (typeof regexp === "string") {
            this.ignoreCase = m && m.indexOf("i") !== -1;
            this.multiline = m && m.indexOf("m") !== -1;
          } else {
            throw new Error("Expected a regexp or string");
          }
          this.tokens = ret(regexp);
        }
        _setDefaults(regexp) {
          this.max = regexp.max != null ? regexp.max : RandExp.prototype.max != null ? RandExp.prototype.max : 100;
          this.defaultRange = regexp.defaultRange ? regexp.defaultRange : this.defaultRange.clone();
          if (regexp.randInt) {
            this.randInt = regexp.randInt;
          }
        }
        gen() {
          return this._gen(this.tokens, []);
        }
        _gen(token, groups) {
          var stack, str, n, i, l;
          switch (token.type) {
            case types.ROOT:
            case types.GROUP:
              if (token.followedBy || token.notFollowedBy) {
                return "";
              }
              if (token.remember && token.groupNumber === void 0) {
                token.groupNumber = groups.push(null) - 1;
              }
              stack = token.options ? this._randSelect(token.options) : token.stack;
              str = "";
              for (i = 0, l = stack.length; i < l; i++) {
                str += this._gen(stack[i], groups);
              }
              if (token.remember) {
                groups[token.groupNumber] = str;
              }
              return str;
            case types.POSITION:
              return "";
            case types.SET:
              var expandedSet = this._expand(token);
              if (!expandedSet.length) {
                return "";
              }
              return String.fromCharCode(this._randSelect(expandedSet));
            case types.REPETITION:
              n = this.randInt(token.min, token.max === Infinity ? token.min + this.max : token.max);
              str = "";
              for (i = 0; i < n; i++) {
                str += this._gen(token.value, groups);
              }
              return str;
            case types.REFERENCE:
              return groups[token.value - 1] || "";
            case types.CHAR:
              var code = this.ignoreCase && this._randBool() ? this._toOtherCase(token.value) : token.value;
              return String.fromCharCode(code);
          }
        }
        _toOtherCase(code) {
          return code + (97 <= code && code <= 122 ? -32 : 65 <= code && code <= 90 ? 32 : 0);
        }
        _randBool() {
          return !this.randInt(0, 1);
        }
        _randSelect(arr) {
          if (arr instanceof DRange) {
            return arr.index(this.randInt(0, arr.length - 1));
          }
          return arr[this.randInt(0, arr.length - 1)];
        }
        _expand(token) {
          if (token.type === ret.types.CHAR) {
            return new DRange(token.value);
          } else if (token.type === ret.types.RANGE) {
            return new DRange(token.from, token.to);
          } else {
            let drange = new DRange();
            for (let i = 0; i < token.set.length; i++) {
              let subrange = this._expand(token.set[i]);
              drange.add(subrange);
              if (this.ignoreCase) {
                for (let j = 0; j < subrange.length; j++) {
                  let code = subrange.index(j);
                  let otherCaseCode = this._toOtherCase(code);
                  if (code !== otherCaseCode) {
                    drange.add(otherCaseCode);
                  }
                }
              }
            }
            if (token.not) {
              return this.defaultRange.clone().subtract(drange);
            } else {
              return this.defaultRange.clone().intersect(drange);
            }
          }
        }
        randInt(a, b) {
          return a + Math.floor(Math.random() * (1 + b - a));
        }
        get defaultRange() {
          return this._range = this._range || new DRange(32, 126);
        }
        set defaultRange(range) {
          this._range = range;
        }
        static randexp(regexp, m) {
          var randexp;
          if (typeof regexp === "string") {
            regexp = new RegExp(regexp, m);
          }
          if (regexp._randexp === void 0) {
            randexp = new RandExp(regexp, m);
            regexp._randexp = randexp;
          } else {
            randexp = regexp._randexp;
            randexp._setDefaults(regexp);
          }
          return randexp.gen();
        }
        static sugar() {
          RegExp.prototype.gen = function() {
            return RandExp.randexp(this);
          };
        }
      };
    }
  });

  // src/lib/core/random.js
  var require_random = __commonJS({
    "src/lib/core/random.js"(exports, module) {
      var RandExp = require_randexp();
      var optionAPI = require_option();
      var env = require_constants();
      function getRandomInteger(min, max) {
        min = typeof min === "undefined" ? env.MIN_INTEGER : min;
        max = typeof max === "undefined" ? env.MAX_INTEGER : max;
        return Math.floor(optionAPI("random")() * (max - min + 1)) + min;
      }
      function _randexp(value) {
        RandExp.prototype.max = optionAPI("defaultRandExpMax");
        RandExp.prototype.randInt = (a, b) => a + Math.floor(optionAPI("random")() * (1 + (b - a)));
        const re = new RandExp(value);
        return re.gen();
      }
      function pick(collection) {
        return collection[Math.floor(optionAPI("random")() * collection.length)];
      }
      function shuffle(collection) {
        let tmp;
        let key;
        let length = collection.length;
        const copy = collection.slice();
        for (; length > 0; ) {
          key = Math.floor(optionAPI("random")() * length);
          length -= 1;
          tmp = copy[length];
          copy[length] = copy[key];
          copy[key] = tmp;
        }
        return copy;
      }
      function getRandom(min, max) {
        return optionAPI("random")() * (max - min) + min;
      }
      function number(min, max, defMin, defMax, hasPrecision = false) {
        defMin = typeof defMin === "undefined" ? env.MIN_NUMBER : defMin;
        defMax = typeof defMax === "undefined" ? env.MAX_NUMBER : defMax;
        min = typeof min === "undefined" ? defMin : min;
        max = typeof max === "undefined" ? defMax : max;
        if (max < min) {
          max += min;
        }
        if (hasPrecision) {
          return getRandom(min, max);
        }
        return getRandomInteger(min, max);
      }
      function by(type) {
        switch (type) {
          case "seconds":
            return number(0, 60) * 60;
          case "minutes":
            return number(15, 50) * 612;
          case "hours":
            return number(12, 72) * 36123;
          case "days":
            return number(7, 30) * 86412345;
          case "weeks":
            return number(4, 52) * 604812345;
          case "months":
            return number(2, 13) * 2592012345;
          case "years":
            return number(1, 20) * 31104012345;
          default:
            break;
        }
      }
      function date(step) {
        if (step) {
          return by(step);
        }
        const now = new Date();
        const days = number(-1e3, env.MOST_NEAR_DATETIME);
        now.setTime(now.getTime() - days);
        return now;
      }
      var random_default = {
        pick,
        date,
        shuffle,
        number,
        randexp: _randexp
      };
      module.exports = random_default;
    }
  });

  // src/lib/core/utils.js
  var require_utils = __commonJS({
    "src/lib/core/utils.js"(exports, module) {
      var optionAPI = require_option();
      var env = require_constants();
      var random = require_random();
      function getLocalRef(obj, path, refs) {
        const keyElements = path.replace("#/", "/").split("/");
        let schema = obj.$ref && refs ? refs[obj.$ref] : obj;
        if (refs && path.includes("#/") && refs[keyElements[0]]) {
          schema = refs[keyElements.shift()];
        }
        if (!keyElements[0])
          keyElements.shift();
        while (schema && keyElements.length > 0) {
          const prop = keyElements.shift();
          if (!schema[prop]) {
            throw new Error(`Prop not found: ${prop} (${path})`);
          }
          schema = schema[prop];
        }
        return schema;
      }
      function hasProperties(obj, ...properties) {
        return properties.filter((key) => {
          return typeof obj[key] !== "undefined";
        }).length > 0;
      }
      function clampDate(value) {
        if (value.includes(" ")) {
          return new Date(value).toISOString().substr(0, 10);
        }
        let [year, month, day] = value.split("T")[0].split("-");
        month = Math.max(1, Math.min(12, month));
        day = Math.max(1, Math.min(31, day));
        return `${year}-${month}-${day}`;
      }
      function typecast(type, schema, callback) {
        const params = {};
        switch (type || schema.type) {
          case "integer":
          case "number":
            if (typeof schema.minimum !== "undefined") {
              params.minimum = schema.minimum;
            }
            if (typeof schema.maximum !== "undefined") {
              params.maximum = schema.maximum;
            }
            if (schema.enum) {
              let min = Math.max(params.minimum || 0, 0);
              let max = Math.min(params.maximum || Infinity, Infinity);
              if (schema.exclusiveMinimum && min === schema.minimum) {
                min += schema.multipleOf || 1;
              }
              if (schema.exclusiveMaximum && max === schema.maximum) {
                max -= schema.multipleOf || 1;
              }
              if (min || max !== Infinity) {
                schema.enum = schema.enum.filter((x) => {
                  if (x >= min && x <= max) {
                    return true;
                  }
                  return false;
                });
              }
            }
            break;
          case "string": {
            params.minLength = optionAPI("minLength") || 0;
            params.maxLength = optionAPI("maxLength") || Number.MAX_SAFE_INTEGER;
            if (typeof schema.minLength !== "undefined") {
              params.minLength = Math.max(params.minLength, schema.minLength);
            }
            if (typeof schema.maxLength !== "undefined") {
              params.maxLength = Math.min(params.maxLength, schema.maxLength);
            }
            break;
          }
          default:
            break;
        }
        let value = callback(params);
        if (value === null || value === void 0) {
          return null;
        }
        switch (type || schema.type) {
          case "number":
            value = parseFloat(value);
            break;
          case "integer":
            value = parseInt(value, 10);
            break;
          case "boolean":
            value = !!value;
            break;
          case "string": {
            value = String(value);
            const min = Math.max(params.minLength || 0, 0);
            const max = Math.min(params.maxLength || Infinity, Infinity);
            let prev;
            let noChangeCount = 0;
            while (value.length < min) {
              prev = value;
              if (!schema.pattern) {
                value += `${random.pick([" ", "/", "_", "-", "+", "=", "@", "^"])}${value}`;
              } else {
                value += random.randexp(schema.pattern);
              }
              if (value === prev) {
                noChangeCount += 1;
                if (noChangeCount === 3) {
                  break;
                }
              } else {
                noChangeCount = 0;
              }
            }
            if (value.length > max) {
              value = value.substr(0, max);
            }
            switch (schema.format) {
              case "date-time":
              case "datetime":
                value = new Date(clampDate(value)).toISOString().replace(/([0-9])0+Z$/, "$1Z");
                break;
              case "full-date":
              case "date":
                value = new Date(clampDate(value)).toISOString().substr(0, 10);
                break;
              case "time":
                value = new Date(`1969-01-01 ${value}`).toISOString().substr(11);
                break;
              default:
                break;
            }
            break;
          }
          default:
            break;
        }
        return value;
      }
      function merge(a, b) {
        Object.keys(b).forEach((key) => {
          if (typeof b[key] !== "object" || b[key] === null) {
            a[key] = b[key];
          } else if (Array.isArray(b[key])) {
            a[key] = a[key] || [];
            b[key].forEach((value) => {
              if (Array.isArray(a[key]) && a[key].indexOf(value) === -1) {
                a[key].push(value);
              }
            });
          } else if (typeof a[key] !== "object" || a[key] === null || Array.isArray(a[key])) {
            a[key] = merge({}, b[key]);
          } else {
            a[key] = merge(a[key], b[key]);
          }
        });
        return a;
      }
      function clone(obj, cache = new Map()) {
        if (!obj || typeof obj !== "object") {
          return obj;
        }
        if (cache.has(obj)) {
          return cache.get(obj);
        }
        if (Array.isArray(obj)) {
          const arr = [];
          cache.set(obj, arr);
          arr.push(...obj.map((x) => clone(x, cache)));
          return arr;
        }
        const clonedObj = {};
        cache.set(obj, clonedObj);
        return Object.keys(obj).reduce((prev, cur) => {
          prev[cur] = clone(obj[cur], cache);
          return prev;
        }, clonedObj);
      }
      function short(schema) {
        const s = JSON.stringify(schema);
        const l = JSON.stringify(schema, null, 2);
        return s.length > 400 ? `${l.substr(0, 400)}...` : l;
      }
      function anyValue() {
        return random.pick([
          false,
          true,
          null,
          -1,
          NaN,
          Math.PI,
          Infinity,
          void 0,
          [],
          {},
          Math.random(),
          Math.random().toString(36).substr(2)
        ]);
      }
      function notValue(schema, parent) {
        const copy = merge({}, parent);
        if (typeof schema.minimum !== "undefined") {
          copy.maximum = schema.minimum;
          copy.exclusiveMaximum = true;
        }
        if (typeof schema.maximum !== "undefined") {
          copy.minimum = schema.maximum > copy.maximum ? 0 : schema.maximum;
          copy.exclusiveMinimum = true;
        }
        if (typeof schema.minLength !== "undefined") {
          copy.maxLength = schema.minLength;
        }
        if (typeof schema.maxLength !== "undefined") {
          copy.minLength = schema.maxLength > copy.maxLength ? 0 : schema.maxLength;
        }
        if (schema.type) {
          copy.type = random.pick(env.SCALAR_TYPES.filter((x) => {
            const types = Array.isArray(schema.type) ? schema.type : [schema.type];
            return types.every((type) => {
              if (x === "number" || x === "integer") {
                return type !== "number" && type !== "integer";
              }
              return x !== type;
            });
          }));
        } else if (schema.enum) {
          let value;
          do {
            value = anyValue();
          } while (schema.enum.indexOf(value) !== -1);
          copy.enum = [value];
        }
        if (schema.required && copy.properties) {
          schema.required.forEach((prop) => {
            delete copy.properties[prop];
          });
        }
        return copy;
      }
      function validateValueForSchema(value, schema) {
        const schemaHasMin = schema.minimum !== void 0;
        const schemaHasMax = schema.maximum !== void 0;
        return (schemaHasMin || schemaHasMax) && (!schemaHasMin || value >= schema.minimum) && (!schemaHasMax || value <= schema.maximum);
      }
      function validate(value, schemas) {
        return !schemas.every((schema) => validateValueForSchema(value, schema));
      }
      function validateValueForOneOf(value, oneOf) {
        const validCount = oneOf.reduce((count, schema) => count + (validateValueForSchema(value, schema) ? 1 : 0), 0);
        return validCount === 1;
      }
      function isKey(prop) {
        return ["enum", "const", "default", "examples", "required", "definitions", "items", "properties"].includes(prop);
      }
      function omitProps(obj, props) {
        return Object.keys(obj).filter((key) => !props.includes(key)).reduce((copy, k) => {
          if (Array.isArray(obj[k])) {
            copy[k] = obj[k].slice();
          } else {
            copy[k] = obj[k] instanceof Object ? merge({}, obj[k]) : obj[k];
          }
          return copy;
        }, {});
      }
      function template(value, schema) {
        if (Array.isArray(value)) {
          return value.map((x) => template(x, schema));
        }
        if (typeof value === "string") {
          value = value.replace(/#\{([\w.-]+)\}/g, (_, $1) => schema[$1]);
        }
        return value;
      }
      function isEmpty(value) {
        return Object.prototype.toString.call(value) === "[object Object]" && !Object.keys(value).length;
      }
      function shouldClean(key, schema) {
        const isRequired = Array.isArray(schema.required) && schema.required.includes(key);
        const wasCleaned = typeof schema.thunk === "function" || schema.additionalProperties && typeof schema.additionalProperties.thunk === "function";
        return !isRequired && !wasCleaned;
      }
      function clean(obj, schema, isArray = false) {
        if (!obj || typeof obj !== "object") {
          return obj;
        }
        if (Array.isArray(obj)) {
          return obj.map((value) => clean(value, schema, true)).filter((value) => typeof value !== "undefined");
        }
        Object.keys(obj).forEach((k) => {
          if (isEmpty(obj[k])) {
            if (shouldClean(k, schema)) {
              delete obj[k];
            }
          } else {
            const value = clean(obj[k], schema);
            if (!isEmpty(value)) {
              obj[k] = value;
            }
          }
          if (typeof obj[k] === "undefined") {
            delete obj[k];
          }
        });
        if (!Object.keys(obj).length && isArray) {
          return void 0;
        }
        return obj;
      }
      var utils_default = {
        hasProperties,
        getLocalRef,
        omitProps,
        typecast,
        merge,
        clone,
        short,
        notValue,
        anyValue,
        validate,
        validateValueForSchema,
        validateValueForOneOf,
        isKey,
        template,
        shouldClean,
        clean,
        isEmpty,
        clampDate
      };
      module.exports = utils_default;
    }
  });

  // src/lib/class/Container.js
  var require_Container = __commonJS({
    "src/lib/class/Container.js"(exports, module) {
      var import_utils = __toModule(require_utils());
      function proxy(gen) {
        return (value, schema, property, rootSchema) => {
          let fn = value;
          let args = [];
          if (typeof value === "object") {
            fn = Object.keys(value)[0];
            if (Array.isArray(value[fn])) {
              args = value[fn];
            } else {
              args.push(value[fn]);
            }
          }
          const props = fn.split(".");
          let ctx = gen();
          while (props.length > 1) {
            ctx = ctx[props.shift()];
          }
          value = typeof ctx === "object" ? ctx[props[0]] : ctx;
          if (typeof value === "function") {
            value = value.apply(ctx, args.map((x) => import_utils.default.template(x, rootSchema)));
          }
          if (Object.prototype.toString.call(value) === "[object Object]") {
            Object.keys(value).forEach((key) => {
              if (typeof value[key] === "function") {
                throw new Error(`Cannot resolve value for '${property}: ${fn}', given: ${value}`);
              }
            });
          }
          return value;
        };
      }
      var Container = class {
        constructor() {
          this.registry = {};
          this.support = {};
        }
        reset(name) {
          if (!name) {
            this.registry = {};
            this.support = {};
          } else {
            delete this.registry[name];
            delete this.support[name];
          }
        }
        extend(name, callback) {
          this.registry[name] = callback(this.registry[name]);
          if (!this.support[name]) {
            this.support[name] = proxy(() => this.registry[name]);
          }
        }
        define(name, callback) {
          this.support[name] = callback;
        }
        get(name) {
          if (typeof this.registry[name] === "undefined") {
            throw new ReferenceError(`'${name}' dependency doesn't exist.`);
          }
          return this.registry[name];
        }
        wrap(schema) {
          if (!("generate" in schema)) {
            const keys = Object.keys(schema);
            const context = {};
            let length = keys.length;
            while (length--) {
              const fn = keys[length].replace(/^x-/, "");
              const gen = this.support[fn];
              if (typeof gen === "function") {
                Object.defineProperty(schema, "generate", {
                  configurable: false,
                  enumerable: false,
                  writable: false,
                  value: (rootSchema, key) => gen.call(context, schema[keys[length]], schema, keys[length], rootSchema, key.slice())
                });
                break;
              }
            }
          }
          return schema;
        }
      };
      var Container_default = Container;
      module.exports = Container_default;
    }
  });

  // src/lib/api/format.js
  var require_format = __commonJS({
    "src/lib/api/format.js"(exports, module) {
      var Registry = require_Registry();
      var registry = new Registry();
      function formatAPI(nameOrFormatMap, callback) {
        if (typeof nameOrFormatMap === "undefined") {
          return registry.list();
        }
        if (typeof nameOrFormatMap === "string") {
          if (typeof callback === "function") {
            registry.register(nameOrFormatMap, callback);
          } else if (callback === null || callback === false) {
            registry.unregister(nameOrFormatMap);
          } else {
            return registry.get(nameOrFormatMap);
          }
        } else {
          registry.registerMany(nameOrFormatMap);
        }
      }
      var format_default = formatAPI;
      module.exports = format_default;
    }
  });

  // src/lib/core/error.js
  var require_error = __commonJS({
    "src/lib/core/error.js"(exports, module) {
      var ParseError = class extends Error {
        constructor(message, path) {
          super();
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
          this.name = "ParseError";
          this.message = message;
          this.path = path;
        }
      };
      var error_default = ParseError;
      module.exports = error_default;
    }
  });

  // src/lib/core/infer.js
  var require_infer = __commonJS({
    "src/lib/core/infer.js"(exports, module) {
      var inferredProperties = {
        array: [
          "additionalItems",
          "items",
          "maxItems",
          "minItems",
          "uniqueItems"
        ],
        integer: [
          "exclusiveMaximum",
          "exclusiveMinimum",
          "maximum",
          "minimum",
          "multipleOf"
        ],
        object: [
          "additionalProperties",
          "dependencies",
          "maxProperties",
          "minProperties",
          "patternProperties",
          "properties",
          "required"
        ],
        string: [
          "maxLength",
          "minLength",
          "pattern",
          "format"
        ]
      };
      inferredProperties.number = inferredProperties.integer;
      var subschemaProperties = [
        "additionalItems",
        "items",
        "additionalProperties",
        "dependencies",
        "patternProperties",
        "properties"
      ];
      function matchesType(obj, lastElementInPath, inferredTypeProperties) {
        return Object.keys(obj).filter((prop) => {
          const isSubschema = subschemaProperties.indexOf(lastElementInPath) > -1;
          const inferredPropertyFound = inferredTypeProperties.indexOf(prop) > -1;
          if (inferredPropertyFound && !isSubschema) {
            return true;
          }
          return false;
        }).length > 0;
      }
      function inferType(obj, schemaPath) {
        const keys = Object.keys(inferredProperties);
        for (let i = 0; i < keys.length; i += 1) {
          const typeName = keys[i];
          const lastElementInPath = schemaPath[schemaPath.length - 1];
          if (matchesType(obj, lastElementInPath, inferredProperties[typeName])) {
            return typeName;
          }
        }
      }
      var infer_default = inferType;
      module.exports = infer_default;
    }
  });

  // src/lib/generators/boolean.js
  var require_boolean = __commonJS({
    "src/lib/generators/boolean.js"(exports, module) {
      var optionAPI = require_option();
      function booleanGenerator() {
        return optionAPI("random")() > 0.5;
      }
      var boolean_default = booleanGenerator;
      module.exports = boolean_default;
    }
  });

  // src/lib/types/boolean.js
  var require_boolean2 = __commonJS({
    "src/lib/types/boolean.js"(exports, module) {
      var booleanGenerator = require_boolean();
      var booleanType = booleanGenerator;
      var boolean_default = booleanType;
      module.exports = boolean_default;
    }
  });

  // src/lib/generators/null.js
  var require_null = __commonJS({
    "src/lib/generators/null.js"(exports, module) {
      function nullGenerator() {
        return null;
      }
      var null_default = nullGenerator;
      module.exports = null_default;
    }
  });

  // src/lib/types/null.js
  var require_null2 = __commonJS({
    "src/lib/types/null.js"(exports, module) {
      var nullGenerator = require_null();
      var nullType = nullGenerator;
      var null_default = nullType;
      module.exports = null_default;
    }
  });

  // src/lib/types/array.js
  var require_array = __commonJS({
    "src/lib/types/array.js"(exports, module) {
      var random = require_random();
      var utils = require_utils();
      var ParseError = require_error();
      var optionAPI = require_option();
      function unique(path, items, value, sample, resolve, traverseCallback) {
        const tmp = [];
        const seen = [];
        function walk(obj) {
          const json = JSON.stringify(obj.value);
          if (seen.indexOf(json) === -1) {
            seen.push(json);
            tmp.push(obj);
            return true;
          }
          return false;
        }
        items.forEach(walk);
        let limit = 100;
        while (tmp.length !== items.length) {
          if (!walk(traverseCallback(value.items || sample, path, resolve))) {
            limit -= 1;
          }
          if (!limit) {
            break;
          }
        }
        return tmp;
      }
      function arrayType(value, path, resolve, traverseCallback) {
        const items = [];
        if (!(value.items || value.additionalItems)) {
          if (utils.hasProperties(value, "minItems", "maxItems", "uniqueItems")) {
            throw new ParseError(`missing items for ${utils.short(value)}`, path);
          }
          return items;
        }
        if (Array.isArray(value.items)) {
          return value.items.map((item, key) => {
            const itemSubpath = path.concat(["items", key]);
            return traverseCallback(item, itemSubpath, resolve);
          });
        }
        let minItems = value.minItems;
        let maxItems = value.maxItems;
        const defaultMinItems = optionAPI("minItems");
        const defaultMaxItems = optionAPI("maxItems");
        if (defaultMinItems) {
          minItems = typeof minItems === "undefined" ? defaultMinItems : Math.min(defaultMinItems, minItems);
        }
        if (defaultMaxItems) {
          maxItems = typeof maxItems === "undefined" ? defaultMaxItems : Math.min(defaultMaxItems, maxItems);
          if (maxItems && maxItems > defaultMaxItems) {
            maxItems = defaultMaxItems;
          }
          if (minItems && minItems > defaultMaxItems) {
            minItems = maxItems;
          }
        }
        const optionalsProbability = optionAPI("alwaysFakeOptionals") === true ? 1 : optionAPI("optionalsProbability");
        const fixedProbabilities = optionAPI("alwaysFakeOptionals") || optionAPI("fixedProbabilities") || false;
        let length = random.number(minItems, maxItems, 1, 5);
        if (optionalsProbability !== null) {
          length = Math.max(fixedProbabilities ? Math.round((maxItems || length) * optionalsProbability) : Math.abs(random.number(minItems, maxItems) * optionalsProbability), minItems || 0);
        }
        const sample = typeof value.additionalItems === "object" ? value.additionalItems : {};
        for (let current = items.length; current < length; current += 1) {
          const itemSubpath = path.concat(["items", current]);
          const element = traverseCallback(value.items || sample, itemSubpath, resolve);
          items.push(element);
        }
        if (value.contains && length > 0) {
          const idx = random.number(0, length - 1);
          items[idx] = traverseCallback(value.contains, path.concat(["items", idx]), resolve);
        }
        if (value.uniqueItems) {
          return unique(path.concat(["items"]), items, value, sample, resolve, traverseCallback);
        }
        return items;
      }
      var array_default = arrayType;
      module.exports = array_default;
    }
  });

  // src/lib/types/number.js
  var require_number = __commonJS({
    "src/lib/types/number.js"(exports, module) {
      var random = require_random();
      var env = require_constants();
      function numberType(value) {
        let min = typeof value.minimum === "undefined" ? env.MIN_INTEGER : value.minimum;
        let max = typeof value.maximum === "undefined" ? env.MAX_INTEGER : value.maximum;
        const multipleOf = value.multipleOf;
        if (multipleOf) {
          max = Math.floor(max / multipleOf) * multipleOf;
          min = Math.ceil(min / multipleOf) * multipleOf;
        }
        if (value.exclusiveMinimum && min === value.minimum) {
          min += multipleOf || 1;
        }
        if (value.exclusiveMaximum && max === value.maximum) {
          max -= multipleOf || 1;
        }
        if (min > max) {
          return NaN;
        }
        if (multipleOf) {
          if (String(multipleOf).indexOf(".") === -1) {
            let base = random.number(Math.floor(min / multipleOf), Math.floor(max / multipleOf)) * multipleOf;
            while (base < min) {
              base += value.multipleOf;
            }
            return base;
          }
          const boundary = (max - min) / multipleOf;
          let num;
          let fix;
          do {
            num = random.number(0, boundary) * multipleOf;
            fix = num / multipleOf % 1;
          } while (fix !== 0);
          return min + num;
        }
        return random.number(min, max, void 0, void 0, true);
      }
      var number_default = numberType;
      module.exports = number_default;
    }
  });

  // src/lib/types/integer.js
  var require_integer = __commonJS({
    "src/lib/types/integer.js"(exports, module) {
      var number = require_number();
      function integerType(value) {
        return number(__spreadValues({ multipleOf: 1 }, value));
      }
      var integer_default = integerType;
      module.exports = integer_default;
    }
  });

  // src/lib/generators/words.js
  var require_words = __commonJS({
    "src/lib/generators/words.js"(exports, module) {
      var random = require_random();
      var LIPSUM_WORDS = `Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore
et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est
laborum`.split(/\W/);
      function wordsGenerator(length) {
        const words = random.shuffle(LIPSUM_WORDS);
        return words.slice(0, length);
      }
      var words_default = wordsGenerator;
      module.exports = words_default;
    }
  });

  // src/lib/types/object.js
  var require_object = __commonJS({
    "src/lib/types/object.js"(exports, module) {
      var constants = require_constants();
      var random = require_random();
      var words = require_words();
      var utils = require_utils();
      var optionAPI = require_option();
      var anyType = { type: constants.ALLOWED_TYPES };
      function objectType(value, path, resolve, traverseCallback) {
        const props = {};
        const properties = value.properties || {};
        const patternProperties = value.patternProperties || {};
        const requiredProperties = typeof value.required === "boolean" ? [] : (value.required || []).slice();
        const allowsAdditional = value.additionalProperties !== false;
        const propertyKeys = Object.keys(properties);
        const patternPropertyKeys = Object.keys(patternProperties);
        const optionalProperties = propertyKeys.concat(patternPropertyKeys).reduce((_response, _key) => {
          if (requiredProperties.indexOf(_key) === -1)
            _response.push(_key);
          return _response;
        }, []);
        const allProperties = requiredProperties.concat(optionalProperties);
        const additionalProperties = allowsAdditional ? value.additionalProperties === true ? anyType : value.additionalProperties : value.additionalProperties;
        if (!allowsAdditional && propertyKeys.length === 0 && patternPropertyKeys.length === 0 && utils.hasProperties(value, "minProperties", "maxProperties", "dependencies", "required")) {
          return null;
        }
        if (optionAPI("requiredOnly") === true) {
          requiredProperties.forEach((key) => {
            if (properties[key]) {
              props[key] = properties[key];
            }
          });
          return traverseCallback(props, path.concat(["properties"]), resolve, value);
        }
        const optionalsProbability = optionAPI("alwaysFakeOptionals") === true ? 1 : optionAPI("optionalsProbability");
        const fixedProbabilities = optionAPI("alwaysFakeOptionals") || optionAPI("fixedProbabilities") || false;
        const ignoreProperties = optionAPI("ignoreProperties") || [];
        const reuseProps = optionAPI("reuseProperties");
        const fillProps = optionAPI("fillProperties");
        const max = value.maxProperties || allProperties.length + (allowsAdditional ? random.number(1, 5) : 0);
        let min = Math.max(value.minProperties || 0, requiredProperties.length);
        let neededExtras = Math.max(0, allProperties.length - min);
        if (allProperties.length === 1 && !requiredProperties.length) {
          min = Math.max(random.number(fillProps ? 1 : 0, max), min);
        }
        if (optionalsProbability !== null) {
          if (fixedProbabilities === true) {
            neededExtras = Math.round(min - requiredProperties.length + optionalsProbability * (allProperties.length - min));
          } else {
            neededExtras = random.number(min - requiredProperties.length, optionalsProbability * (allProperties.length - min));
          }
        }
        const extraPropertiesRandomOrder = random.shuffle(optionalProperties).slice(0, neededExtras);
        const extraProperties = optionalProperties.filter((_item) => {
          return extraPropertiesRandomOrder.indexOf(_item) !== -1;
        });
        const _limit = optionalsProbability !== null || requiredProperties.length === max ? max : random.number(0, max);
        const _props = requiredProperties.concat(random.shuffle(extraProperties).slice(0, _limit)).slice(0, max);
        const _defns = [];
        if (value.dependencies) {
          Object.keys(value.dependencies).forEach((prop) => {
            const _required = value.dependencies[prop];
            if (_props.indexOf(prop) !== -1) {
              if (Array.isArray(_required)) {
                _required.forEach((sub) => {
                  if (_props.indexOf(sub) === -1) {
                    _props.push(sub);
                  }
                });
              } else {
                _defns.push(_required);
              }
            }
          });
          if (_defns.length) {
            delete value.dependencies;
            return traverseCallback({
              allOf: _defns.concat(value)
            }, path.concat(["properties"]), resolve, value);
          }
        }
        const skipped = [];
        const missing = [];
        _props.forEach((key) => {
          for (let i = 0; i < ignoreProperties.length; i += 1) {
            if (ignoreProperties[i] instanceof RegExp && ignoreProperties[i].test(key) || typeof ignoreProperties[i] === "string" && ignoreProperties[i] === key || typeof ignoreProperties[i] === "function" && ignoreProperties[i](properties[key], key)) {
              skipped.push(key);
              return;
            }
          }
          if (additionalProperties === false) {
            if (requiredProperties.indexOf(key) !== -1) {
              props[key] = properties[key];
            }
          }
          if (properties[key]) {
            props[key] = properties[key];
          }
          let found;
          patternPropertyKeys.forEach((_key) => {
            if (key.match(new RegExp(_key))) {
              found = true;
              if (props[key]) {
                utils.merge(props[key], patternProperties[_key]);
              } else {
                props[random.randexp(key)] = patternProperties[_key];
              }
            }
          });
          if (!found) {
            const subschema = patternProperties[key] || additionalProperties;
            if (subschema && additionalProperties !== false) {
              props[patternProperties[key] ? random.randexp(key) : key] = properties[key] || subschema;
            } else {
              missing.push(key);
            }
          }
        });
        let current = Object.keys(props).length + (fillProps ? 0 : skipped.length);
        const hash = (suffix) => random.randexp(`_?[_a-f\\d]{1,3}${suffix ? "\\$?" : ""}`);
        function get(from) {
          let one;
          do {
            if (!from.length)
              break;
            one = from.shift();
          } while (props[one]);
          return one;
        }
        let minProps = min;
        if (allowsAdditional && !requiredProperties.length) {
          minProps = Math.max(optionalsProbability === null || additionalProperties ? random.number(fillProps ? 1 : 0, max) : 0, min);
        }
        while (fillProps) {
          if (!(patternPropertyKeys.length || allowsAdditional)) {
            break;
          }
          if (current >= minProps) {
            break;
          }
          if (allowsAdditional) {
            if (reuseProps && propertyKeys.length - current > minProps) {
              let count = 0;
              let key;
              do {
                count += 1;
                if (count > 1e3) {
                  break;
                }
                key = get(requiredProperties) || random.pick(propertyKeys);
              } while (typeof props[key] !== "undefined");
              if (typeof props[key] === "undefined") {
                props[key] = properties[key];
                current += 1;
              }
            } else if (patternPropertyKeys.length && !additionalProperties) {
              const prop = random.pick(patternPropertyKeys);
              const word = random.randexp(prop);
              if (!props[word]) {
                props[word] = patternProperties[prop];
                current += 1;
              }
            } else {
              const word = get(requiredProperties) || words(1) + hash();
              if (!props[word]) {
                props[word] = additionalProperties || anyType;
                current += 1;
              }
            }
          }
          for (let i = 0; current < min && i < patternPropertyKeys.length; i += 1) {
            const _key = patternPropertyKeys[i];
            const word = random.randexp(_key);
            if (!props[word]) {
              props[word] = patternProperties[_key];
              current += 1;
            }
          }
        }
        if (requiredProperties.length === 0 && (!allowsAdditional || optionalsProbability === false)) {
          const maximum = random.number(min, max);
          for (; current < maximum; ) {
            const word = get(propertyKeys);
            if (word) {
              props[word] = properties[word];
            }
            current += 1;
          }
        }
        return traverseCallback(props, path.concat(["properties"]), resolve, value);
      }
      var object_default = objectType;
      module.exports = object_default;
    }
  });

  // src/lib/generators/thunk.js
  var require_thunk = __commonJS({
    "src/lib/generators/thunk.js"(exports, module) {
      var words = require_words();
      var random = require_random();
      function produce() {
        const length = random.number(1, 5);
        return words(length).join(" ");
      }
      function thunkGenerator(min = 0, max = 140) {
        const _min = Math.max(0, min);
        const _max = random.number(_min, max);
        let result = produce();
        while (result.length < _min) {
          result += produce();
        }
        if (result.length > _max) {
          result = result.substr(0, _max);
        }
        return result;
      }
      var thunk_default = thunkGenerator;
      module.exports = thunk_default;
    }
  });

  // src/lib/generators/ipv4.js
  var require_ipv4 = __commonJS({
    "src/lib/generators/ipv4.js"(exports, module) {
      var random = require_random();
      function ipv4Generator() {
        return [0, 0, 0, 0].map(() => {
          return random.number(0, 255);
        }).join(".");
      }
      var ipv4_default = ipv4Generator;
      module.exports = ipv4_default;
    }
  });

  // src/lib/generators/dateTime.js
  var require_dateTime = __commonJS({
    "src/lib/generators/dateTime.js"(exports, module) {
      var random = require_random();
      function dateTimeGenerator() {
        return random.date().toISOString();
      }
      var dateTime_default = dateTimeGenerator;
      module.exports = dateTime_default;
    }
  });

  // src/lib/generators/date.js
  var require_date = __commonJS({
    "src/lib/generators/date.js"(exports, module) {
      var dateTimeGenerator = require_dateTime();
      function dateGenerator() {
        return dateTimeGenerator().slice(0, 10);
      }
      var date_default = dateGenerator;
      module.exports = date_default;
    }
  });

  // src/lib/generators/time.js
  var require_time = __commonJS({
    "src/lib/generators/time.js"(exports, module) {
      var dateTimeGenerator = require_dateTime();
      function timeGenerator() {
        return dateTimeGenerator().slice(11);
      }
      var time_default = timeGenerator;
      module.exports = time_default;
    }
  });

  // src/lib/generators/coreFormat.js
  var require_coreFormat = __commonJS({
    "src/lib/generators/coreFormat.js"(exports, module) {
      var random = require_random();
      var FRAGMENT = "[a-zA-Z][a-zA-Z0-9+-.]*";
      var URI_PATTERN = `https?://{hostname}(?:${FRAGMENT})+`;
      var PARAM_PATTERN = "(?:\\?([a-z]{1,7}(=\\w{1,5})?&){0,3})?";
      var regexps = {
        email: "[a-zA-Z\\d][a-zA-Z\\d-]{1,13}[a-zA-Z\\d]@{hostname}",
        hostname: "[a-zA-Z]{1,33}\\.[a-z]{2,4}",
        ipv6: "[a-f\\d]{4}(:[a-f\\d]{4}){7}",
        uri: URI_PATTERN,
        slug: "[a-zA-Z\\d_-]+",
        "uri-reference": `${URI_PATTERN}${PARAM_PATTERN}`,
        "uri-template": URI_PATTERN.replace("(?:", "(?:/\\{[a-z][:a-zA-Z0-9-]*\\}|"),
        "json-pointer": `(/(?:${FRAGMENT.replace("]*", "/]*")}|~[01]))+`,
        uuid: "^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$"
      };
      regexps.iri = regexps["uri-reference"];
      regexps["iri-reference"] = regexps["uri-reference"];
      regexps["idn-email"] = regexps.email;
      regexps["idn-hostname"] = regexps.hostname;
      var ALLOWED_FORMATS = new RegExp(`\\{(${Object.keys(regexps).join("|")})\\}`);
      function coreFormatGenerator(coreFormat) {
        return random.randexp(regexps[coreFormat]).replace(ALLOWED_FORMATS, (match, key) => {
          return random.randexp(regexps[key]);
        });
      }
      var coreFormat_default = coreFormatGenerator;
      module.exports = coreFormat_default;
    }
  });

  // src/lib/types/string.js
  var require_string = __commonJS({
    "src/lib/types/string.js"(exports, module) {
      var thunk = require_thunk();
      var ipv4 = require_ipv4();
      var dateTime = require_dateTime();
      var date = require_date();
      var time = require_time();
      var coreFormat = require_coreFormat();
      var optionAPI = require_option();
      var format = require_format();
      var random = require_random();
      var utils = require_utils();
      function generateFormat(value, invalid) {
        const callback = format(value.format);
        if (typeof callback === "function") {
          return callback(value);
        }
        switch (value.format) {
          case "date-time":
          case "datetime":
            return dateTime();
          case "date":
            return date();
          case "time":
            return time();
          case "ipv4":
            return ipv4();
          case "regex":
            return ".+?";
          case "email":
          case "hostname":
          case "ipv6":
          case "uri":
          case "uri-reference":
          case "iri":
          case "iri-reference":
          case "idn-email":
          case "idn-hostname":
          case "json-pointer":
          case "slug":
          case "uri-template":
          case "uuid":
            return coreFormat(value.format);
          default:
            if (typeof callback === "undefined") {
              if (optionAPI("failOnInvalidFormat")) {
                throw new Error(`unknown registry key ${utils.short(value.format)}`);
              } else {
                return invalid();
              }
            }
            throw new Error(`unsupported format '${value.format}'`);
        }
      }
      function stringType(value) {
        const output = utils.typecast("string", value, (opts) => {
          if (value.format) {
            return generateFormat(value, () => thunk(opts.minLength, opts.maxLength));
          }
          if (value.pattern) {
            return random.randexp(value.pattern);
          }
          return thunk(opts.minLength, opts.maxLength);
        });
        return output;
      }
      var string_default = stringType;
      module.exports = string_default;
    }
  });

  // src/lib/types/index.js
  var require_types2 = __commonJS({
    "src/lib/types/index.js"(exports, module) {
      var _boolean = require_boolean2();
      var _null = require_null2();
      var _array = require_array();
      var _integer = require_integer();
      var _number = require_number();
      var _object = require_object();
      var _string = require_string();
      var typeMap = {
        boolean: _boolean,
        null: _null,
        array: _array,
        integer: _integer,
        number: _number,
        object: _object,
        string: _string
      };
      var types_default = typeMap;
      module.exports = types_default;
    }
  });

  // src/lib/core/traverse.js
  var require_traverse = __commonJS({
    "src/lib/core/traverse.js"(exports, module) {
      var utils = require_utils();
      var random = require_random();
      var ParseError = require_error();
      var inferType = require_infer();
      var types = require_types2();
      var optionAPI = require_option();
      function getMeta({ $comment: comment, title, description }) {
        return Object.entries({ comment, title, description }).filter(([, value]) => value).reduce((memo, [k, v]) => {
          memo[k] = v;
          return memo;
        }, {});
      }
      function traverse(schema, path, resolve, rootSchema) {
        schema = resolve(schema, null, path);
        if (schema && (schema.oneOf || schema.anyOf || schema.allOf)) {
          schema = resolve(schema, null, path);
        }
        if (!schema) {
          return;
        }
        const context = __spreadProps(__spreadValues({}, getMeta(schema)), {
          schemaPath: path
        });
        if (path[path.length - 1] !== "properties") {
          if (optionAPI("useExamplesValue") && Array.isArray(schema.examples)) {
            const fixedExamples = schema.examples.concat("default" in schema ? [schema.default] : []);
            return { value: utils.typecast(null, schema, () => random.pick(fixedExamples)), context };
          }
          if (optionAPI("useDefaultValue") && "default" in schema) {
            if (schema.default !== "" || !optionAPI("replaceEmptyByRandomValue")) {
              return { value: schema.default, context };
            }
          }
          if ("template" in schema) {
            return { value: utils.template(schema.template, rootSchema), context };
          }
          if ("const" in schema) {
            return { value: schema.const, context };
          }
        }
        if (schema.not && typeof schema.not === "object") {
          schema = utils.notValue(schema.not, utils.omitProps(schema, ["not"]));
          if (schema.type && schema.type === "object") {
            const { value, context: innerContext } = traverse(schema, path.concat(["not"]), resolve, rootSchema);
            return { value: utils.clean(value, schema, false), context: __spreadProps(__spreadValues({}, context), { items: innerContext }) };
          }
        }
        if (typeof schema.thunk === "function") {
          const { value, context: innerContext } = traverse(schema.thunk(rootSchema), path, resolve);
          return { value, context: __spreadProps(__spreadValues({}, context), { items: innerContext }) };
        }
        if (typeof schema.generate === "function") {
          const retval = utils.typecast(null, schema, () => schema.generate(rootSchema, path));
          const type2 = retval === null ? "null" : typeof retval;
          if (type2 === schema.type || Array.isArray(schema.type) && schema.type.includes(type2) || type2 === "number" && schema.type === "integer" || Array.isArray(retval) && schema.type === "array") {
            return { value: retval, context };
          }
        }
        if (typeof schema.pattern === "string") {
          return { value: utils.typecast("string", schema, () => random.randexp(schema.pattern)), context };
        }
        if (Array.isArray(schema.enum)) {
          return { value: utils.typecast(null, schema, () => random.pick(schema.enum)), context };
        }
        if (schema.jsonPath) {
          return { value: schema, context };
        }
        let type = schema.type;
        if (Array.isArray(type)) {
          type = random.pick(type);
        } else if (typeof type === "undefined") {
          type = inferType(schema, path) || type;
          if (type) {
            schema.type = type;
          }
        }
        if (typeof type === "string") {
          if (!types[type]) {
            if (optionAPI("failOnInvalidTypes")) {
              throw new ParseError(`unknown primitive ${utils.short(type)}`, path.concat(["type"]));
            } else {
              const value = optionAPI("defaultInvalidTypeProduct");
              if (typeof value === "string" && types[value]) {
                return { value: types[value](schema, path, resolve, traverse), context };
              }
              return { value, context };
            }
          } else {
            try {
              const innerResult = types[type](schema, path, resolve, traverse);
              if (type === "array") {
                return {
                  value: innerResult.map(({ value }) => value),
                  context: __spreadProps(__spreadValues({}, context), {
                    items: innerResult.map(Array.isArray(schema.items) ? ({ context: c }) => c : ({ context: c }) => __spreadProps(__spreadValues({}, c), {
                      schemaPath: c.schemaPath.slice(0, -1)
                    }))
                  })
                };
              }
              if (type === "object") {
                return { value: innerResult.value, context: __spreadProps(__spreadValues({}, context), { items: innerResult.context }) };
              }
              return { value: innerResult, context };
            } catch (e) {
              if (typeof e.path === "undefined") {
                throw new ParseError(e.stack, path);
              }
              throw e;
            }
          }
        }
        let valueCopy = {};
        let contextCopy = __spreadValues({}, context);
        if (Array.isArray(schema)) {
          valueCopy = [];
        }
        Object.keys(schema).forEach((prop) => {
          if (typeof schema[prop] === "object" && prop !== "definitions") {
            const { value, context: innerContext } = traverse(schema[prop], path.concat([prop]), resolve, valueCopy);
            valueCopy[prop] = utils.clean(value, schema[prop], false);
            contextCopy[prop] = innerContext;
          } else {
            valueCopy[prop] = schema[prop];
          }
        });
        return { value: valueCopy, context: contextCopy };
      }
      var traverse_default = traverse;
      module.exports = traverse_default;
    }
  });

  // src/lib/core/buildResolveSchema.js
  var require_buildResolveSchema = __commonJS({
    "src/lib/core/buildResolveSchema.js"(exports, module) {
      var optionAPI = require_option();
      var random = require_random();
      var utils = require_utils();
      var buildResolveSchema = ({
        refs,
        schema,
        container,
        synchronous,
        refDepthMax,
        refDepthMin
      }) => {
        const recursiveUtil = {};
        const seenRefs = {};
        let depth = 0;
        let lastRef;
        let lastPath;
        recursiveUtil.resolveSchema = (sub, index, rootPath) => {
          if (sub === null || sub === void 0) {
            return null;
          }
          if (typeof sub.generate === "function") {
            return sub;
          }
          const _id = sub.$id || sub.id;
          if (typeof _id === "string") {
            delete sub.id;
            delete sub.$id;
            delete sub.$schema;
          }
          if (typeof sub.$ref === "string") {
            const maxDepth = Math.max(refDepthMin, refDepthMax) - 1;
            if (sub.$ref === "#" || seenRefs[sub.$ref] < 0 || lastRef === sub.$ref && ++depth > maxDepth) {
              if (sub.$ref !== "#" && lastPath && lastPath.length === rootPath.length) {
                return utils.getLocalRef(schema, sub.$ref, synchronous && refs);
              }
              delete sub.$ref;
              return sub;
            }
            if (typeof seenRefs[sub.$ref] === "undefined") {
              seenRefs[sub.$ref] = random.number(refDepthMin, refDepthMax) - 1;
            }
            lastPath = rootPath;
            lastRef = sub.$ref;
            let ref;
            if (sub.$ref.indexOf("#/") === -1) {
              ref = refs[sub.$ref] || null;
            } else {
              ref = utils.getLocalRef(schema, sub.$ref, synchronous && refs) || null;
            }
            let fixed;
            if (typeof ref !== "undefined") {
              if (!ref && optionAPI("ignoreMissingRefs") !== true) {
                throw new Error(`Reference not found: ${sub.$ref}`);
              }
              seenRefs[sub.$ref] -= 1;
              utils.merge(sub, ref || {});
              fixed = synchronous && ref && ref.$ref;
            }
            if (!fixed)
              delete sub.$ref;
            return sub;
          }
          if (Array.isArray(sub.allOf)) {
            const schemas = sub.allOf;
            delete sub.allOf;
            schemas.forEach((subSchema) => {
              const _sub = recursiveUtil.resolveSchema(subSchema, null, rootPath);
              utils.merge(sub, typeof _sub.thunk === "function" ? _sub.thunk(sub) : _sub);
              if (Array.isArray(sub.allOf)) {
                recursiveUtil.resolveSchema(sub, index, rootPath);
              }
            });
          }
          if (Array.isArray(sub.oneOf || sub.anyOf)) {
            const mix = sub.oneOf || sub.anyOf;
            if (sub.enum && sub.oneOf) {
              sub.enum = sub.enum.filter((x) => utils.validate(x, mix));
            }
            return {
              thunk(rootSchema) {
                const copy = utils.omitProps(sub, ["anyOf", "oneOf"]);
                const fixed = random.pick(mix);
                utils.merge(copy, fixed);
                mix.forEach((omit) => {
                  if (omit.required && omit !== fixed) {
                    omit.required.forEach((key) => {
                      const includesKey = copy.required && copy.required.includes(key);
                      if (copy.properties && !includesKey) {
                        delete copy.properties[key];
                      }
                      if (rootSchema && rootSchema.properties) {
                        delete rootSchema.properties[key];
                      }
                    });
                  }
                });
                return copy;
              }
            };
          }
          Object.keys(sub).forEach((prop) => {
            if ((Array.isArray(sub[prop]) || typeof sub[prop] === "object") && !utils.isKey(prop)) {
              sub[prop] = recursiveUtil.resolveSchema(sub[prop], prop, rootPath.concat(prop));
            }
          });
          if (rootPath) {
            const lastProp = rootPath[rootPath.length - 1];
            if (lastProp === "properties" || lastProp === "items") {
              return sub;
            }
          }
          return container.wrap(sub);
        };
        return recursiveUtil;
      };
      var buildResolveSchema_default = buildResolveSchema;
      module.exports = buildResolveSchema_default;
    }
  });

  // src/lib/core/run.js
  var require_run = __commonJS({
    "src/lib/core/run.js"(exports, module) {
      var { getDependencies } = require_vendor();
      var optionAPI = require_option();
      var traverse = require_traverse();
      var random = require_random();
      var utils = require_utils();
      var buildResolveSchema = require_buildResolveSchema();
      function pick(data) {
        return Array.isArray(data) ? random.pick(data) : data;
      }
      function cycle(data, reverse) {
        if (!Array.isArray(data)) {
          return data;
        }
        const value = reverse ? data.pop() : data.shift();
        if (reverse) {
          data.unshift(value);
        } else {
          data.push(value);
        }
        return value;
      }
      function resolve(obj, data, values, property) {
        if (!obj || typeof obj !== "object") {
          return obj;
        }
        if (!values) {
          values = {};
        }
        if (!data) {
          data = obj;
        }
        if (Array.isArray(obj)) {
          return obj.map((x) => resolve(x, data, values, property));
        }
        if (obj.jsonPath) {
          const { JSONPath } = getDependencies();
          const params = typeof obj.jsonPath !== "object" ? { path: obj.jsonPath } : obj.jsonPath;
          params.group = obj.group || params.group || property;
          params.cycle = obj.cycle || params.cycle || false;
          params.reverse = obj.reverse || params.reverse || false;
          params.count = obj.count || params.count || 1;
          const key = `${params.group}__${params.path}`;
          if (!values[key]) {
            if (params.count > 1) {
              values[key] = JSONPath(params.path, data).slice(0, params.count);
            } else {
              values[key] = JSONPath(params.path, data);
            }
          }
          if (params.cycle || params.reverse) {
            return cycle(values[key], params.reverse);
          }
          return pick(values[key]);
        }
        Object.keys(obj).forEach((k) => {
          obj[k] = resolve(obj[k], data, values, k);
        });
        return obj;
      }
      function run(refs, schema, container, synchronous) {
        if (Object.prototype.toString.call(schema) !== "[object Object]") {
          throw new Error(`Invalid input, expecting object but given ${typeof schema}`);
        }
        const refDepthMin = optionAPI("refDepthMin") || 0;
        const refDepthMax = optionAPI("refDepthMax") || 3;
        try {
          const { resolveSchema } = buildResolveSchema({
            refs,
            schema,
            container,
            synchronous,
            refDepthMin,
            refDepthMax
          });
          const result = traverse(utils.clone(schema), [], resolveSchema);
          if (optionAPI("resolveJsonPath")) {
            return {
              value: resolve(result.value),
              context: result.context
            };
          }
          return result;
        } catch (e) {
          if (e.path) {
            throw new Error(`${e.message} in /${e.path.join("/")}`);
          } else {
            throw e;
          }
        }
      }
      var run_default = run;
      module.exports = run_default;
    }
  });

  // src/lib/renderers/js.js
  var require_js = __commonJS({
    "src/lib/renderers/js.js"(exports, module) {
      function renderJS(res) {
        return res.value;
      }
      var js_default = renderJS;
      module.exports = js_default;
    }
  });

  // node_modules/yaml/dist/PlainValue-ec8e588e.js
  var require_PlainValue_ec8e588e = __commonJS({
    "node_modules/yaml/dist/PlainValue-ec8e588e.js"(exports) {
      "use strict";
      var Char = {
        ANCHOR: "&",
        COMMENT: "#",
        TAG: "!",
        DIRECTIVES_END: "-",
        DOCUMENT_END: "."
      };
      var Type = {
        ALIAS: "ALIAS",
        BLANK_LINE: "BLANK_LINE",
        BLOCK_FOLDED: "BLOCK_FOLDED",
        BLOCK_LITERAL: "BLOCK_LITERAL",
        COMMENT: "COMMENT",
        DIRECTIVE: "DIRECTIVE",
        DOCUMENT: "DOCUMENT",
        FLOW_MAP: "FLOW_MAP",
        FLOW_SEQ: "FLOW_SEQ",
        MAP: "MAP",
        MAP_KEY: "MAP_KEY",
        MAP_VALUE: "MAP_VALUE",
        PLAIN: "PLAIN",
        QUOTE_DOUBLE: "QUOTE_DOUBLE",
        QUOTE_SINGLE: "QUOTE_SINGLE",
        SEQ: "SEQ",
        SEQ_ITEM: "SEQ_ITEM"
      };
      var defaultTagPrefix = "tag:yaml.org,2002:";
      var defaultTags = {
        MAP: "tag:yaml.org,2002:map",
        SEQ: "tag:yaml.org,2002:seq",
        STR: "tag:yaml.org,2002:str"
      };
      function findLineStarts(src) {
        const ls = [0];
        let offset = src.indexOf("\n");
        while (offset !== -1) {
          offset += 1;
          ls.push(offset);
          offset = src.indexOf("\n", offset);
        }
        return ls;
      }
      function getSrcInfo(cst) {
        let lineStarts, src;
        if (typeof cst === "string") {
          lineStarts = findLineStarts(cst);
          src = cst;
        } else {
          if (Array.isArray(cst))
            cst = cst[0];
          if (cst && cst.context) {
            if (!cst.lineStarts)
              cst.lineStarts = findLineStarts(cst.context.src);
            lineStarts = cst.lineStarts;
            src = cst.context.src;
          }
        }
        return {
          lineStarts,
          src
        };
      }
      function getLinePos(offset, cst) {
        if (typeof offset !== "number" || offset < 0)
          return null;
        const {
          lineStarts,
          src
        } = getSrcInfo(cst);
        if (!lineStarts || !src || offset > src.length)
          return null;
        for (let i = 0; i < lineStarts.length; ++i) {
          const start = lineStarts[i];
          if (offset < start) {
            return {
              line: i,
              col: offset - lineStarts[i - 1] + 1
            };
          }
          if (offset === start)
            return {
              line: i + 1,
              col: 1
            };
        }
        const line = lineStarts.length;
        return {
          line,
          col: offset - lineStarts[line - 1] + 1
        };
      }
      function getLine(line, cst) {
        const {
          lineStarts,
          src
        } = getSrcInfo(cst);
        if (!lineStarts || !(line >= 1) || line > lineStarts.length)
          return null;
        const start = lineStarts[line - 1];
        let end = lineStarts[line];
        while (end && end > start && src[end - 1] === "\n")
          --end;
        return src.slice(start, end);
      }
      function getPrettyContext({
        start,
        end
      }, cst, maxWidth = 80) {
        let src = getLine(start.line, cst);
        if (!src)
          return null;
        let {
          col
        } = start;
        if (src.length > maxWidth) {
          if (col <= maxWidth - 10) {
            src = src.substr(0, maxWidth - 1) + "\u2026";
          } else {
            const halfWidth = Math.round(maxWidth / 2);
            if (src.length > col + halfWidth)
              src = src.substr(0, col + halfWidth - 1) + "\u2026";
            col -= src.length - maxWidth;
            src = "\u2026" + src.substr(1 - maxWidth);
          }
        }
        let errLen = 1;
        let errEnd = "";
        if (end) {
          if (end.line === start.line && col + (end.col - start.col) <= maxWidth + 1) {
            errLen = end.col - start.col;
          } else {
            errLen = Math.min(src.length + 1, maxWidth) - col;
            errEnd = "\u2026";
          }
        }
        const offset = col > 1 ? " ".repeat(col - 1) : "";
        const err = "^".repeat(errLen);
        return `${src}
${offset}${err}${errEnd}`;
      }
      var Range = class {
        static copy(orig) {
          return new Range(orig.start, orig.end);
        }
        constructor(start, end) {
          this.start = start;
          this.end = end || start;
        }
        isEmpty() {
          return typeof this.start !== "number" || !this.end || this.end <= this.start;
        }
        setOrigRange(cr, offset) {
          const {
            start,
            end
          } = this;
          if (cr.length === 0 || end <= cr[0]) {
            this.origStart = start;
            this.origEnd = end;
            return offset;
          }
          let i = offset;
          while (i < cr.length) {
            if (cr[i] > start)
              break;
            else
              ++i;
          }
          this.origStart = start + i;
          const nextOffset = i;
          while (i < cr.length) {
            if (cr[i] >= end)
              break;
            else
              ++i;
          }
          this.origEnd = end + i;
          return nextOffset;
        }
      };
      var Node = class {
        static addStringTerminator(src, offset, str) {
          if (str[str.length - 1] === "\n")
            return str;
          const next = Node.endOfWhiteSpace(src, offset);
          return next >= src.length || src[next] === "\n" ? str + "\n" : str;
        }
        static atDocumentBoundary(src, offset, sep) {
          const ch0 = src[offset];
          if (!ch0)
            return true;
          const prev = src[offset - 1];
          if (prev && prev !== "\n")
            return false;
          if (sep) {
            if (ch0 !== sep)
              return false;
          } else {
            if (ch0 !== Char.DIRECTIVES_END && ch0 !== Char.DOCUMENT_END)
              return false;
          }
          const ch1 = src[offset + 1];
          const ch2 = src[offset + 2];
          if (ch1 !== ch0 || ch2 !== ch0)
            return false;
          const ch3 = src[offset + 3];
          return !ch3 || ch3 === "\n" || ch3 === "	" || ch3 === " ";
        }
        static endOfIdentifier(src, offset) {
          let ch = src[offset];
          const isVerbatim = ch === "<";
          const notOk = isVerbatim ? ["\n", "	", " ", ">"] : ["\n", "	", " ", "[", "]", "{", "}", ","];
          while (ch && notOk.indexOf(ch) === -1)
            ch = src[offset += 1];
          if (isVerbatim && ch === ">")
            offset += 1;
          return offset;
        }
        static endOfIndent(src, offset) {
          let ch = src[offset];
          while (ch === " ")
            ch = src[offset += 1];
          return offset;
        }
        static endOfLine(src, offset) {
          let ch = src[offset];
          while (ch && ch !== "\n")
            ch = src[offset += 1];
          return offset;
        }
        static endOfWhiteSpace(src, offset) {
          let ch = src[offset];
          while (ch === "	" || ch === " ")
            ch = src[offset += 1];
          return offset;
        }
        static startOfLine(src, offset) {
          let ch = src[offset - 1];
          if (ch === "\n")
            return offset;
          while (ch && ch !== "\n")
            ch = src[offset -= 1];
          return offset + 1;
        }
        static endOfBlockIndent(src, indent, lineStart) {
          const inEnd = Node.endOfIndent(src, lineStart);
          if (inEnd > lineStart + indent) {
            return inEnd;
          } else {
            const wsEnd = Node.endOfWhiteSpace(src, inEnd);
            const ch = src[wsEnd];
            if (!ch || ch === "\n")
              return wsEnd;
          }
          return null;
        }
        static atBlank(src, offset, endAsBlank) {
          const ch = src[offset];
          return ch === "\n" || ch === "	" || ch === " " || endAsBlank && !ch;
        }
        static nextNodeIsIndented(ch, indentDiff, indicatorAsIndent) {
          if (!ch || indentDiff < 0)
            return false;
          if (indentDiff > 0)
            return true;
          return indicatorAsIndent && ch === "-";
        }
        static normalizeOffset(src, offset) {
          const ch = src[offset];
          return !ch ? offset : ch !== "\n" && src[offset - 1] === "\n" ? offset - 1 : Node.endOfWhiteSpace(src, offset);
        }
        static foldNewline(src, offset, indent) {
          let inCount = 0;
          let error = false;
          let fold = "";
          let ch = src[offset + 1];
          while (ch === " " || ch === "	" || ch === "\n") {
            switch (ch) {
              case "\n":
                inCount = 0;
                offset += 1;
                fold += "\n";
                break;
              case "	":
                if (inCount <= indent)
                  error = true;
                offset = Node.endOfWhiteSpace(src, offset + 2) - 1;
                break;
              case " ":
                inCount += 1;
                offset += 1;
                break;
            }
            ch = src[offset + 1];
          }
          if (!fold)
            fold = " ";
          if (ch && inCount <= indent)
            error = true;
          return {
            fold,
            offset,
            error
          };
        }
        constructor(type, props, context) {
          Object.defineProperty(this, "context", {
            value: context || null,
            writable: true
          });
          this.error = null;
          this.range = null;
          this.valueRange = null;
          this.props = props || [];
          this.type = type;
          this.value = null;
        }
        getPropValue(idx, key, skipKey) {
          if (!this.context)
            return null;
          const {
            src
          } = this.context;
          const prop = this.props[idx];
          return prop && src[prop.start] === key ? src.slice(prop.start + (skipKey ? 1 : 0), prop.end) : null;
        }
        get anchor() {
          for (let i = 0; i < this.props.length; ++i) {
            const anchor = this.getPropValue(i, Char.ANCHOR, true);
            if (anchor != null)
              return anchor;
          }
          return null;
        }
        get comment() {
          const comments = [];
          for (let i = 0; i < this.props.length; ++i) {
            const comment = this.getPropValue(i, Char.COMMENT, true);
            if (comment != null)
              comments.push(comment);
          }
          return comments.length > 0 ? comments.join("\n") : null;
        }
        commentHasRequiredWhitespace(start) {
          const {
            src
          } = this.context;
          if (this.header && start === this.header.end)
            return false;
          if (!this.valueRange)
            return false;
          const {
            end
          } = this.valueRange;
          return start !== end || Node.atBlank(src, end - 1);
        }
        get hasComment() {
          if (this.context) {
            const {
              src
            } = this.context;
            for (let i = 0; i < this.props.length; ++i) {
              if (src[this.props[i].start] === Char.COMMENT)
                return true;
            }
          }
          return false;
        }
        get hasProps() {
          if (this.context) {
            const {
              src
            } = this.context;
            for (let i = 0; i < this.props.length; ++i) {
              if (src[this.props[i].start] !== Char.COMMENT)
                return true;
            }
          }
          return false;
        }
        get includesTrailingLines() {
          return false;
        }
        get jsonLike() {
          const jsonLikeTypes = [Type.FLOW_MAP, Type.FLOW_SEQ, Type.QUOTE_DOUBLE, Type.QUOTE_SINGLE];
          return jsonLikeTypes.indexOf(this.type) !== -1;
        }
        get rangeAsLinePos() {
          if (!this.range || !this.context)
            return void 0;
          const start = getLinePos(this.range.start, this.context.root);
          if (!start)
            return void 0;
          const end = getLinePos(this.range.end, this.context.root);
          return {
            start,
            end
          };
        }
        get rawValue() {
          if (!this.valueRange || !this.context)
            return null;
          const {
            start,
            end
          } = this.valueRange;
          return this.context.src.slice(start, end);
        }
        get tag() {
          for (let i = 0; i < this.props.length; ++i) {
            const tag = this.getPropValue(i, Char.TAG, false);
            if (tag != null) {
              if (tag[1] === "<") {
                return {
                  verbatim: tag.slice(2, -1)
                };
              } else {
                const [_, handle, suffix] = tag.match(/^(.*!)([^!]*)$/);
                return {
                  handle,
                  suffix
                };
              }
            }
          }
          return null;
        }
        get valueRangeContainsNewline() {
          if (!this.valueRange || !this.context)
            return false;
          const {
            start,
            end
          } = this.valueRange;
          const {
            src
          } = this.context;
          for (let i = start; i < end; ++i) {
            if (src[i] === "\n")
              return true;
          }
          return false;
        }
        parseComment(start) {
          const {
            src
          } = this.context;
          if (src[start] === Char.COMMENT) {
            const end = Node.endOfLine(src, start + 1);
            const commentRange = new Range(start, end);
            this.props.push(commentRange);
            return end;
          }
          return start;
        }
        setOrigRanges(cr, offset) {
          if (this.range)
            offset = this.range.setOrigRange(cr, offset);
          if (this.valueRange)
            this.valueRange.setOrigRange(cr, offset);
          this.props.forEach((prop) => prop.setOrigRange(cr, offset));
          return offset;
        }
        toString() {
          const {
            context: {
              src
            },
            range,
            value
          } = this;
          if (value != null)
            return value;
          const str = src.slice(range.start, range.end);
          return Node.addStringTerminator(src, range.end, str);
        }
      };
      var YAMLError = class extends Error {
        constructor(name, source, message) {
          if (!message || !(source instanceof Node))
            throw new Error(`Invalid arguments for new ${name}`);
          super();
          this.name = name;
          this.message = message;
          this.source = source;
        }
        makePretty() {
          if (!this.source)
            return;
          this.nodeType = this.source.type;
          const cst = this.source.context && this.source.context.root;
          if (typeof this.offset === "number") {
            this.range = new Range(this.offset, this.offset + 1);
            const start = cst && getLinePos(this.offset, cst);
            if (start) {
              const end = {
                line: start.line,
                col: start.col + 1
              };
              this.linePos = {
                start,
                end
              };
            }
            delete this.offset;
          } else {
            this.range = this.source.range;
            this.linePos = this.source.rangeAsLinePos;
          }
          if (this.linePos) {
            const {
              line,
              col
            } = this.linePos.start;
            this.message += ` at line ${line}, column ${col}`;
            const ctx = cst && getPrettyContext(this.linePos, cst);
            if (ctx)
              this.message += `:

${ctx}
`;
          }
          delete this.source;
        }
      };
      var YAMLReferenceError = class extends YAMLError {
        constructor(source, message) {
          super("YAMLReferenceError", source, message);
        }
      };
      var YAMLSemanticError = class extends YAMLError {
        constructor(source, message) {
          super("YAMLSemanticError", source, message);
        }
      };
      var YAMLSyntaxError = class extends YAMLError {
        constructor(source, message) {
          super("YAMLSyntaxError", source, message);
        }
      };
      var YAMLWarning = class extends YAMLError {
        constructor(source, message) {
          super("YAMLWarning", source, message);
        }
      };
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      var PlainValue = class extends Node {
        static endOfLine(src, start, inFlow) {
          let ch = src[start];
          let offset = start;
          while (ch && ch !== "\n") {
            if (inFlow && (ch === "[" || ch === "]" || ch === "{" || ch === "}" || ch === ","))
              break;
            const next = src[offset + 1];
            if (ch === ":" && (!next || next === "\n" || next === "	" || next === " " || inFlow && next === ","))
              break;
            if ((ch === " " || ch === "	") && next === "#")
              break;
            offset += 1;
            ch = next;
          }
          return offset;
        }
        get strValue() {
          if (!this.valueRange || !this.context)
            return null;
          let {
            start,
            end
          } = this.valueRange;
          const {
            src
          } = this.context;
          let ch = src[end - 1];
          while (start < end && (ch === "\n" || ch === "	" || ch === " "))
            ch = src[--end - 1];
          let str = "";
          for (let i = start; i < end; ++i) {
            const ch2 = src[i];
            if (ch2 === "\n") {
              const {
                fold,
                offset
              } = Node.foldNewline(src, i, -1);
              str += fold;
              i = offset;
            } else if (ch2 === " " || ch2 === "	") {
              const wsStart = i;
              let next = src[i + 1];
              while (i < end && (next === " " || next === "	")) {
                i += 1;
                next = src[i + 1];
              }
              if (next !== "\n")
                str += i > wsStart ? src.slice(wsStart, i + 1) : ch2;
            } else {
              str += ch2;
            }
          }
          const ch0 = src[start];
          switch (ch0) {
            case "	": {
              const msg = "Plain value cannot start with a tab character";
              const errors = [new YAMLSemanticError(this, msg)];
              return {
                errors,
                str
              };
            }
            case "@":
            case "`": {
              const msg = `Plain value cannot start with reserved character ${ch0}`;
              const errors = [new YAMLSemanticError(this, msg)];
              return {
                errors,
                str
              };
            }
            default:
              return str;
          }
        }
        parseBlockValue(start) {
          const {
            indent,
            inFlow,
            src
          } = this.context;
          let offset = start;
          let valueEnd = start;
          for (let ch = src[offset]; ch === "\n"; ch = src[offset]) {
            if (Node.atDocumentBoundary(src, offset + 1))
              break;
            const end = Node.endOfBlockIndent(src, indent, offset + 1);
            if (end === null || src[end] === "#")
              break;
            if (src[end] === "\n") {
              offset = end;
            } else {
              valueEnd = PlainValue.endOfLine(src, end, inFlow);
              offset = valueEnd;
            }
          }
          if (this.valueRange.isEmpty())
            this.valueRange.start = start;
          this.valueRange.end = valueEnd;
          return valueEnd;
        }
        parse(context, start) {
          this.context = context;
          const {
            inFlow,
            src
          } = context;
          let offset = start;
          const ch = src[offset];
          if (ch && ch !== "#" && ch !== "\n") {
            offset = PlainValue.endOfLine(src, start, inFlow);
          }
          this.valueRange = new Range(start, offset);
          offset = Node.endOfWhiteSpace(src, offset);
          offset = this.parseComment(offset);
          if (!this.hasComment || this.valueRange.isEmpty()) {
            offset = this.parseBlockValue(offset);
          }
          return offset;
        }
      };
      exports.Char = Char;
      exports.Node = Node;
      exports.PlainValue = PlainValue;
      exports.Range = Range;
      exports.Type = Type;
      exports.YAMLError = YAMLError;
      exports.YAMLReferenceError = YAMLReferenceError;
      exports.YAMLSemanticError = YAMLSemanticError;
      exports.YAMLSyntaxError = YAMLSyntaxError;
      exports.YAMLWarning = YAMLWarning;
      exports._defineProperty = _defineProperty;
      exports.defaultTagPrefix = defaultTagPrefix;
      exports.defaultTags = defaultTags;
    }
  });

  // node_modules/yaml/dist/resolveSeq-d03cb037.js
  var require_resolveSeq_d03cb037 = __commonJS({
    "node_modules/yaml/dist/resolveSeq-d03cb037.js"(exports) {
      "use strict";
      var PlainValue = require_PlainValue_ec8e588e();
      function addCommentBefore(str, indent, comment) {
        if (!comment)
          return str;
        const cc = comment.replace(/[\s\S]^/gm, `$&${indent}#`);
        return `#${cc}
${indent}${str}`;
      }
      function addComment(str, indent, comment) {
        return !comment ? str : comment.indexOf("\n") === -1 ? `${str} #${comment}` : `${str}
` + comment.replace(/^/gm, `${indent || ""}#`);
      }
      var Node = class {
      };
      function toJSON(value, arg, ctx) {
        if (Array.isArray(value))
          return value.map((v, i) => toJSON(v, String(i), ctx));
        if (value && typeof value.toJSON === "function") {
          const anchor = ctx && ctx.anchors && ctx.anchors.get(value);
          if (anchor)
            ctx.onCreate = (res2) => {
              anchor.res = res2;
              delete ctx.onCreate;
            };
          const res = value.toJSON(arg, ctx);
          if (anchor && ctx.onCreate)
            ctx.onCreate(res);
          return res;
        }
        if ((!ctx || !ctx.keep) && typeof value === "bigint")
          return Number(value);
        return value;
      }
      var Scalar = class extends Node {
        constructor(value) {
          super();
          this.value = value;
        }
        toJSON(arg, ctx) {
          return ctx && ctx.keep ? this.value : toJSON(this.value, arg, ctx);
        }
        toString() {
          return String(this.value);
        }
      };
      function collectionFromPath(schema, path, value) {
        let v = value;
        for (let i = path.length - 1; i >= 0; --i) {
          const k = path[i];
          if (Number.isInteger(k) && k >= 0) {
            const a = [];
            a[k] = v;
            v = a;
          } else {
            const o = {};
            Object.defineProperty(o, k, {
              value: v,
              writable: true,
              enumerable: true,
              configurable: true
            });
            v = o;
          }
        }
        return schema.createNode(v, false);
      }
      var isEmptyPath = (path) => path == null || typeof path === "object" && path[Symbol.iterator]().next().done;
      var Collection = class extends Node {
        constructor(schema) {
          super();
          PlainValue._defineProperty(this, "items", []);
          this.schema = schema;
        }
        addIn(path, value) {
          if (isEmptyPath(path))
            this.add(value);
          else {
            const [key, ...rest] = path;
            const node = this.get(key, true);
            if (node instanceof Collection)
              node.addIn(rest, value);
            else if (node === void 0 && this.schema)
              this.set(key, collectionFromPath(this.schema, rest, value));
            else
              throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
          }
        }
        deleteIn([key, ...rest]) {
          if (rest.length === 0)
            return this.delete(key);
          const node = this.get(key, true);
          if (node instanceof Collection)
            return node.deleteIn(rest);
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
        getIn([key, ...rest], keepScalar) {
          const node = this.get(key, true);
          if (rest.length === 0)
            return !keepScalar && node instanceof Scalar ? node.value : node;
          else
            return node instanceof Collection ? node.getIn(rest, keepScalar) : void 0;
        }
        hasAllNullValues() {
          return this.items.every((node) => {
            if (!node || node.type !== "PAIR")
              return false;
            const n = node.value;
            return n == null || n instanceof Scalar && n.value == null && !n.commentBefore && !n.comment && !n.tag;
          });
        }
        hasIn([key, ...rest]) {
          if (rest.length === 0)
            return this.has(key);
          const node = this.get(key, true);
          return node instanceof Collection ? node.hasIn(rest) : false;
        }
        setIn([key, ...rest], value) {
          if (rest.length === 0) {
            this.set(key, value);
          } else {
            const node = this.get(key, true);
            if (node instanceof Collection)
              node.setIn(rest, value);
            else if (node === void 0 && this.schema)
              this.set(key, collectionFromPath(this.schema, rest, value));
            else
              throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
          }
        }
        toJSON() {
          return null;
        }
        toString(ctx, {
          blockItem,
          flowChars,
          isMap,
          itemIndent
        }, onComment, onChompKeep) {
          const {
            indent,
            indentStep,
            stringify
          } = ctx;
          const inFlow = this.type === PlainValue.Type.FLOW_MAP || this.type === PlainValue.Type.FLOW_SEQ || ctx.inFlow;
          if (inFlow)
            itemIndent += indentStep;
          const allNullValues = isMap && this.hasAllNullValues();
          ctx = Object.assign({}, ctx, {
            allNullValues,
            indent: itemIndent,
            inFlow,
            type: null
          });
          let chompKeep = false;
          let hasItemWithNewLine = false;
          const nodes = this.items.reduce((nodes2, item, i) => {
            let comment;
            if (item) {
              if (!chompKeep && item.spaceBefore)
                nodes2.push({
                  type: "comment",
                  str: ""
                });
              if (item.commentBefore)
                item.commentBefore.match(/^.*$/gm).forEach((line) => {
                  nodes2.push({
                    type: "comment",
                    str: `#${line}`
                  });
                });
              if (item.comment)
                comment = item.comment;
              if (inFlow && (!chompKeep && item.spaceBefore || item.commentBefore || item.comment || item.key && (item.key.commentBefore || item.key.comment) || item.value && (item.value.commentBefore || item.value.comment)))
                hasItemWithNewLine = true;
            }
            chompKeep = false;
            let str2 = stringify(item, ctx, () => comment = null, () => chompKeep = true);
            if (inFlow && !hasItemWithNewLine && str2.includes("\n"))
              hasItemWithNewLine = true;
            if (inFlow && i < this.items.length - 1)
              str2 += ",";
            str2 = addComment(str2, itemIndent, comment);
            if (chompKeep && (comment || inFlow))
              chompKeep = false;
            nodes2.push({
              type: "item",
              str: str2
            });
            return nodes2;
          }, []);
          let str;
          if (nodes.length === 0) {
            str = flowChars.start + flowChars.end;
          } else if (inFlow) {
            const {
              start,
              end
            } = flowChars;
            const strings = nodes.map((n) => n.str);
            if (hasItemWithNewLine || strings.reduce((sum, str2) => sum + str2.length + 2, 2) > Collection.maxFlowStringSingleLineLength) {
              str = start;
              for (const s of strings) {
                str += s ? `
${indentStep}${indent}${s}` : "\n";
              }
              str += `
${indent}${end}`;
            } else {
              str = `${start} ${strings.join(" ")} ${end}`;
            }
          } else {
            const strings = nodes.map(blockItem);
            str = strings.shift();
            for (const s of strings)
              str += s ? `
${indent}${s}` : "\n";
          }
          if (this.comment) {
            str += "\n" + this.comment.replace(/^/gm, `${indent}#`);
            if (onComment)
              onComment();
          } else if (chompKeep && onChompKeep)
            onChompKeep();
          return str;
        }
      };
      PlainValue._defineProperty(Collection, "maxFlowStringSingleLineLength", 60);
      function asItemIndex(key) {
        let idx = key instanceof Scalar ? key.value : key;
        if (idx && typeof idx === "string")
          idx = Number(idx);
        return Number.isInteger(idx) && idx >= 0 ? idx : null;
      }
      var YAMLSeq = class extends Collection {
        add(value) {
          this.items.push(value);
        }
        delete(key) {
          const idx = asItemIndex(key);
          if (typeof idx !== "number")
            return false;
          const del = this.items.splice(idx, 1);
          return del.length > 0;
        }
        get(key, keepScalar) {
          const idx = asItemIndex(key);
          if (typeof idx !== "number")
            return void 0;
          const it = this.items[idx];
          return !keepScalar && it instanceof Scalar ? it.value : it;
        }
        has(key) {
          const idx = asItemIndex(key);
          return typeof idx === "number" && idx < this.items.length;
        }
        set(key, value) {
          const idx = asItemIndex(key);
          if (typeof idx !== "number")
            throw new Error(`Expected a valid index, not ${key}.`);
          this.items[idx] = value;
        }
        toJSON(_, ctx) {
          const seq = [];
          if (ctx && ctx.onCreate)
            ctx.onCreate(seq);
          let i = 0;
          for (const item of this.items)
            seq.push(toJSON(item, String(i++), ctx));
          return seq;
        }
        toString(ctx, onComment, onChompKeep) {
          if (!ctx)
            return JSON.stringify(this);
          return super.toString(ctx, {
            blockItem: (n) => n.type === "comment" ? n.str : `- ${n.str}`,
            flowChars: {
              start: "[",
              end: "]"
            },
            isMap: false,
            itemIndent: (ctx.indent || "") + "  "
          }, onComment, onChompKeep);
        }
      };
      var stringifyKey = (key, jsKey, ctx) => {
        if (jsKey === null)
          return "";
        if (typeof jsKey !== "object")
          return String(jsKey);
        if (key instanceof Node && ctx && ctx.doc)
          return key.toString({
            anchors: Object.create(null),
            doc: ctx.doc,
            indent: "",
            indentStep: ctx.indentStep,
            inFlow: true,
            inStringifyKey: true,
            stringify: ctx.stringify
          });
        return JSON.stringify(jsKey);
      };
      var Pair = class extends Node {
        constructor(key, value = null) {
          super();
          this.key = key;
          this.value = value;
          this.type = Pair.Type.PAIR;
        }
        get commentBefore() {
          return this.key instanceof Node ? this.key.commentBefore : void 0;
        }
        set commentBefore(cb) {
          if (this.key == null)
            this.key = new Scalar(null);
          if (this.key instanceof Node)
            this.key.commentBefore = cb;
          else {
            const msg = "Pair.commentBefore is an alias for Pair.key.commentBefore. To set it, the key must be a Node.";
            throw new Error(msg);
          }
        }
        addToJSMap(ctx, map) {
          const key = toJSON(this.key, "", ctx);
          if (map instanceof Map) {
            const value = toJSON(this.value, key, ctx);
            map.set(key, value);
          } else if (map instanceof Set) {
            map.add(key);
          } else {
            const stringKey = stringifyKey(this.key, key, ctx);
            const value = toJSON(this.value, stringKey, ctx);
            if (stringKey in map)
              Object.defineProperty(map, stringKey, {
                value,
                writable: true,
                enumerable: true,
                configurable: true
              });
            else
              map[stringKey] = value;
          }
          return map;
        }
        toJSON(_, ctx) {
          const pair = ctx && ctx.mapAsMap ? new Map() : {};
          return this.addToJSMap(ctx, pair);
        }
        toString(ctx, onComment, onChompKeep) {
          if (!ctx || !ctx.doc)
            return JSON.stringify(this);
          const {
            indent: indentSize,
            indentSeq,
            simpleKeys
          } = ctx.doc.options;
          let {
            key,
            value
          } = this;
          let keyComment = key instanceof Node && key.comment;
          if (simpleKeys) {
            if (keyComment) {
              throw new Error("With simple keys, key nodes cannot have comments");
            }
            if (key instanceof Collection) {
              const msg = "With simple keys, collection cannot be used as a key value";
              throw new Error(msg);
            }
          }
          let explicitKey = !simpleKeys && (!key || keyComment || (key instanceof Node ? key instanceof Collection || key.type === PlainValue.Type.BLOCK_FOLDED || key.type === PlainValue.Type.BLOCK_LITERAL : typeof key === "object"));
          const {
            doc,
            indent,
            indentStep,
            stringify
          } = ctx;
          ctx = Object.assign({}, ctx, {
            implicitKey: !explicitKey,
            indent: indent + indentStep
          });
          let chompKeep = false;
          let str = stringify(key, ctx, () => keyComment = null, () => chompKeep = true);
          str = addComment(str, ctx.indent, keyComment);
          if (!explicitKey && str.length > 1024) {
            if (simpleKeys)
              throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
            explicitKey = true;
          }
          if (ctx.allNullValues && !simpleKeys) {
            if (this.comment) {
              str = addComment(str, ctx.indent, this.comment);
              if (onComment)
                onComment();
            } else if (chompKeep && !keyComment && onChompKeep)
              onChompKeep();
            return ctx.inFlow && !explicitKey ? str : `? ${str}`;
          }
          str = explicitKey ? `? ${str}
${indent}:` : `${str}:`;
          if (this.comment) {
            str = addComment(str, ctx.indent, this.comment);
            if (onComment)
              onComment();
          }
          let vcb = "";
          let valueComment = null;
          if (value instanceof Node) {
            if (value.spaceBefore)
              vcb = "\n";
            if (value.commentBefore) {
              const cs = value.commentBefore.replace(/^/gm, `${ctx.indent}#`);
              vcb += `
${cs}`;
            }
            valueComment = value.comment;
          } else if (value && typeof value === "object") {
            value = doc.schema.createNode(value, true);
          }
          ctx.implicitKey = false;
          if (!explicitKey && !this.comment && value instanceof Scalar)
            ctx.indentAtStart = str.length + 1;
          chompKeep = false;
          if (!indentSeq && indentSize >= 2 && !ctx.inFlow && !explicitKey && value instanceof YAMLSeq && value.type !== PlainValue.Type.FLOW_SEQ && !value.tag && !doc.anchors.getName(value)) {
            ctx.indent = ctx.indent.substr(2);
          }
          const valueStr = stringify(value, ctx, () => valueComment = null, () => chompKeep = true);
          let ws = " ";
          if (vcb || this.comment) {
            ws = `${vcb}
${ctx.indent}`;
          } else if (!explicitKey && value instanceof Collection) {
            const flow = valueStr[0] === "[" || valueStr[0] === "{";
            if (!flow || valueStr.includes("\n"))
              ws = `
${ctx.indent}`;
          } else if (valueStr[0] === "\n")
            ws = "";
          if (chompKeep && !valueComment && onChompKeep)
            onChompKeep();
          return addComment(str + ws + valueStr, ctx.indent, valueComment);
        }
      };
      PlainValue._defineProperty(Pair, "Type", {
        PAIR: "PAIR",
        MERGE_PAIR: "MERGE_PAIR"
      });
      var getAliasCount = (node, anchors) => {
        if (node instanceof Alias) {
          const anchor = anchors.get(node.source);
          return anchor.count * anchor.aliasCount;
        } else if (node instanceof Collection) {
          let count = 0;
          for (const item of node.items) {
            const c = getAliasCount(item, anchors);
            if (c > count)
              count = c;
          }
          return count;
        } else if (node instanceof Pair) {
          const kc = getAliasCount(node.key, anchors);
          const vc = getAliasCount(node.value, anchors);
          return Math.max(kc, vc);
        }
        return 1;
      };
      var Alias = class extends Node {
        static stringify({
          range,
          source
        }, {
          anchors,
          doc,
          implicitKey,
          inStringifyKey
        }) {
          let anchor = Object.keys(anchors).find((a) => anchors[a] === source);
          if (!anchor && inStringifyKey)
            anchor = doc.anchors.getName(source) || doc.anchors.newName();
          if (anchor)
            return `*${anchor}${implicitKey ? " " : ""}`;
          const msg = doc.anchors.getName(source) ? "Alias node must be after source node" : "Source node not found for alias node";
          throw new Error(`${msg} [${range}]`);
        }
        constructor(source) {
          super();
          this.source = source;
          this.type = PlainValue.Type.ALIAS;
        }
        set tag(t) {
          throw new Error("Alias nodes cannot have tags");
        }
        toJSON(arg, ctx) {
          if (!ctx)
            return toJSON(this.source, arg, ctx);
          const {
            anchors,
            maxAliasCount
          } = ctx;
          const anchor = anchors.get(this.source);
          if (!anchor || anchor.res === void 0) {
            const msg = "This should not happen: Alias anchor was not resolved?";
            if (this.cstNode)
              throw new PlainValue.YAMLReferenceError(this.cstNode, msg);
            else
              throw new ReferenceError(msg);
          }
          if (maxAliasCount >= 0) {
            anchor.count += 1;
            if (anchor.aliasCount === 0)
              anchor.aliasCount = getAliasCount(this.source, anchors);
            if (anchor.count * anchor.aliasCount > maxAliasCount) {
              const msg = "Excessive alias count indicates a resource exhaustion attack";
              if (this.cstNode)
                throw new PlainValue.YAMLReferenceError(this.cstNode, msg);
              else
                throw new ReferenceError(msg);
            }
          }
          return anchor.res;
        }
        toString(ctx) {
          return Alias.stringify(this, ctx);
        }
      };
      PlainValue._defineProperty(Alias, "default", true);
      function findPair(items, key) {
        const k = key instanceof Scalar ? key.value : key;
        for (const it of items) {
          if (it instanceof Pair) {
            if (it.key === key || it.key === k)
              return it;
            if (it.key && it.key.value === k)
              return it;
          }
        }
        return void 0;
      }
      var YAMLMap = class extends Collection {
        add(pair, overwrite) {
          if (!pair)
            pair = new Pair(pair);
          else if (!(pair instanceof Pair))
            pair = new Pair(pair.key || pair, pair.value);
          const prev = findPair(this.items, pair.key);
          const sortEntries = this.schema && this.schema.sortMapEntries;
          if (prev) {
            if (overwrite)
              prev.value = pair.value;
            else
              throw new Error(`Key ${pair.key} already set`);
          } else if (sortEntries) {
            const i = this.items.findIndex((item) => sortEntries(pair, item) < 0);
            if (i === -1)
              this.items.push(pair);
            else
              this.items.splice(i, 0, pair);
          } else {
            this.items.push(pair);
          }
        }
        delete(key) {
          const it = findPair(this.items, key);
          if (!it)
            return false;
          const del = this.items.splice(this.items.indexOf(it), 1);
          return del.length > 0;
        }
        get(key, keepScalar) {
          const it = findPair(this.items, key);
          const node = it && it.value;
          return !keepScalar && node instanceof Scalar ? node.value : node;
        }
        has(key) {
          return !!findPair(this.items, key);
        }
        set(key, value) {
          this.add(new Pair(key, value), true);
        }
        toJSON(_, ctx, Type) {
          const map = Type ? new Type() : ctx && ctx.mapAsMap ? new Map() : {};
          if (ctx && ctx.onCreate)
            ctx.onCreate(map);
          for (const item of this.items)
            item.addToJSMap(ctx, map);
          return map;
        }
        toString(ctx, onComment, onChompKeep) {
          if (!ctx)
            return JSON.stringify(this);
          for (const item of this.items) {
            if (!(item instanceof Pair))
              throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
          }
          return super.toString(ctx, {
            blockItem: (n) => n.str,
            flowChars: {
              start: "{",
              end: "}"
            },
            isMap: true,
            itemIndent: ctx.indent || ""
          }, onComment, onChompKeep);
        }
      };
      var MERGE_KEY = "<<";
      var Merge = class extends Pair {
        constructor(pair) {
          if (pair instanceof Pair) {
            let seq = pair.value;
            if (!(seq instanceof YAMLSeq)) {
              seq = new YAMLSeq();
              seq.items.push(pair.value);
              seq.range = pair.value.range;
            }
            super(pair.key, seq);
            this.range = pair.range;
          } else {
            super(new Scalar(MERGE_KEY), new YAMLSeq());
          }
          this.type = Pair.Type.MERGE_PAIR;
        }
        addToJSMap(ctx, map) {
          for (const {
            source
          } of this.value.items) {
            if (!(source instanceof YAMLMap))
              throw new Error("Merge sources must be maps");
            const srcMap = source.toJSON(null, ctx, Map);
            for (const [key, value] of srcMap) {
              if (map instanceof Map) {
                if (!map.has(key))
                  map.set(key, value);
              } else if (map instanceof Set) {
                map.add(key);
              } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
                Object.defineProperty(map, key, {
                  value,
                  writable: true,
                  enumerable: true,
                  configurable: true
                });
              }
            }
          }
          return map;
        }
        toString(ctx, onComment) {
          const seq = this.value;
          if (seq.items.length > 1)
            return super.toString(ctx, onComment);
          this.value = seq.items[0];
          const str = super.toString(ctx, onComment);
          this.value = seq;
          return str;
        }
      };
      var binaryOptions = {
        defaultType: PlainValue.Type.BLOCK_LITERAL,
        lineWidth: 76
      };
      var boolOptions = {
        trueStr: "true",
        falseStr: "false"
      };
      var intOptions = {
        asBigInt: false
      };
      var nullOptions = {
        nullStr: "null"
      };
      var strOptions = {
        defaultType: PlainValue.Type.PLAIN,
        doubleQuoted: {
          jsonEncoding: false,
          minMultiLineLength: 40
        },
        fold: {
          lineWidth: 80,
          minContentWidth: 20
        }
      };
      function resolveScalar(str, tags, scalarFallback) {
        for (const {
          format,
          test,
          resolve
        } of tags) {
          if (test) {
            const match = str.match(test);
            if (match) {
              let res = resolve.apply(null, match);
              if (!(res instanceof Scalar))
                res = new Scalar(res);
              if (format)
                res.format = format;
              return res;
            }
          }
        }
        if (scalarFallback)
          str = scalarFallback(str);
        return new Scalar(str);
      }
      var FOLD_FLOW = "flow";
      var FOLD_BLOCK = "block";
      var FOLD_QUOTED = "quoted";
      var consumeMoreIndentedLines = (text, i) => {
        let ch = text[i + 1];
        while (ch === " " || ch === "	") {
          do {
            ch = text[i += 1];
          } while (ch && ch !== "\n");
          ch = text[i + 1];
        }
        return i;
      };
      function foldFlowLines(text, indent, mode, {
        indentAtStart,
        lineWidth = 80,
        minContentWidth = 20,
        onFold,
        onOverflow
      }) {
        if (!lineWidth || lineWidth < 0)
          return text;
        const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
        if (text.length <= endStep)
          return text;
        const folds = [];
        const escapedFolds = {};
        let end = lineWidth - indent.length;
        if (typeof indentAtStart === "number") {
          if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
            folds.push(0);
          else
            end = lineWidth - indentAtStart;
        }
        let split = void 0;
        let prev = void 0;
        let overflow = false;
        let i = -1;
        let escStart = -1;
        let escEnd = -1;
        if (mode === FOLD_BLOCK) {
          i = consumeMoreIndentedLines(text, i);
          if (i !== -1)
            end = i + endStep;
        }
        for (let ch; ch = text[i += 1]; ) {
          if (mode === FOLD_QUOTED && ch === "\\") {
            escStart = i;
            switch (text[i + 1]) {
              case "x":
                i += 3;
                break;
              case "u":
                i += 5;
                break;
              case "U":
                i += 9;
                break;
              default:
                i += 1;
            }
            escEnd = i;
          }
          if (ch === "\n") {
            if (mode === FOLD_BLOCK)
              i = consumeMoreIndentedLines(text, i);
            end = i + endStep;
            split = void 0;
          } else {
            if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
              const next = text[i + 1];
              if (next && next !== " " && next !== "\n" && next !== "	")
                split = i;
            }
            if (i >= end) {
              if (split) {
                folds.push(split);
                end = split + endStep;
                split = void 0;
              } else if (mode === FOLD_QUOTED) {
                while (prev === " " || prev === "	") {
                  prev = ch;
                  ch = text[i += 1];
                  overflow = true;
                }
                const j = i > escEnd + 1 ? i - 2 : escStart - 1;
                if (escapedFolds[j])
                  return text;
                folds.push(j);
                escapedFolds[j] = true;
                end = j + endStep;
                split = void 0;
              } else {
                overflow = true;
              }
            }
          }
          prev = ch;
        }
        if (overflow && onOverflow)
          onOverflow();
        if (folds.length === 0)
          return text;
        if (onFold)
          onFold();
        let res = text.slice(0, folds[0]);
        for (let i2 = 0; i2 < folds.length; ++i2) {
          const fold = folds[i2];
          const end2 = folds[i2 + 1] || text.length;
          if (fold === 0)
            res = `
${indent}${text.slice(0, end2)}`;
          else {
            if (mode === FOLD_QUOTED && escapedFolds[fold])
              res += `${text[fold]}\\`;
            res += `
${indent}${text.slice(fold + 1, end2)}`;
          }
        }
        return res;
      }
      var getFoldOptions = ({
        indentAtStart
      }) => indentAtStart ? Object.assign({
        indentAtStart
      }, strOptions.fold) : strOptions.fold;
      var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
      function lineLengthOverLimit(str, lineWidth, indentLength) {
        if (!lineWidth || lineWidth < 0)
          return false;
        const limit = lineWidth - indentLength;
        const strLen = str.length;
        if (strLen <= limit)
          return false;
        for (let i = 0, start = 0; i < strLen; ++i) {
          if (str[i] === "\n") {
            if (i - start > limit)
              return true;
            start = i + 1;
            if (strLen - start <= limit)
              return false;
          }
        }
        return true;
      }
      function doubleQuotedString(value, ctx) {
        const {
          implicitKey
        } = ctx;
        const {
          jsonEncoding,
          minMultiLineLength
        } = strOptions.doubleQuoted;
        const json = JSON.stringify(value);
        if (jsonEncoding)
          return json;
        const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
        let str = "";
        let start = 0;
        for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
          if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
            str += json.slice(start, i) + "\\ ";
            i += 1;
            start = i;
            ch = "\\";
          }
          if (ch === "\\")
            switch (json[i + 1]) {
              case "u":
                {
                  str += json.slice(start, i);
                  const code = json.substr(i + 2, 4);
                  switch (code) {
                    case "0000":
                      str += "\\0";
                      break;
                    case "0007":
                      str += "\\a";
                      break;
                    case "000b":
                      str += "\\v";
                      break;
                    case "001b":
                      str += "\\e";
                      break;
                    case "0085":
                      str += "\\N";
                      break;
                    case "00a0":
                      str += "\\_";
                      break;
                    case "2028":
                      str += "\\L";
                      break;
                    case "2029":
                      str += "\\P";
                      break;
                    default:
                      if (code.substr(0, 2) === "00")
                        str += "\\x" + code.substr(2);
                      else
                        str += json.substr(i, 6);
                  }
                  i += 5;
                  start = i + 1;
                }
                break;
              case "n":
                if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
                  i += 1;
                } else {
                  str += json.slice(start, i) + "\n\n";
                  while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
                    str += "\n";
                    i += 2;
                  }
                  str += indent;
                  if (json[i + 2] === " ")
                    str += "\\";
                  i += 1;
                  start = i + 1;
                }
                break;
              default:
                i += 1;
            }
        }
        str = start ? str + json.slice(start) : json;
        return implicitKey ? str : foldFlowLines(str, indent, FOLD_QUOTED, getFoldOptions(ctx));
      }
      function singleQuotedString(value, ctx) {
        if (ctx.implicitKey) {
          if (/\n/.test(value))
            return doubleQuotedString(value, ctx);
        } else {
          if (/[ \t]\n|\n[ \t]/.test(value))
            return doubleQuotedString(value, ctx);
        }
        const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
        const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
        return ctx.implicitKey ? res : foldFlowLines(res, indent, FOLD_FLOW, getFoldOptions(ctx));
      }
      function blockString({
        comment,
        type,
        value
      }, ctx, onComment, onChompKeep) {
        if (/\n[\t ]+$/.test(value) || /^\s*$/.test(value)) {
          return doubleQuotedString(value, ctx);
        }
        const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
        const indentSize = indent ? "2" : "1";
        const literal = type === PlainValue.Type.BLOCK_FOLDED ? false : type === PlainValue.Type.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, strOptions.fold.lineWidth, indent.length);
        let header = literal ? "|" : ">";
        if (!value)
          return header + "\n";
        let wsStart = "";
        let wsEnd = "";
        value = value.replace(/[\n\t ]*$/, (ws) => {
          const n = ws.indexOf("\n");
          if (n === -1) {
            header += "-";
          } else if (value === ws || n !== ws.length - 1) {
            header += "+";
            if (onChompKeep)
              onChompKeep();
          }
          wsEnd = ws.replace(/\n$/, "");
          return "";
        }).replace(/^[\n ]*/, (ws) => {
          if (ws.indexOf(" ") !== -1)
            header += indentSize;
          const m = ws.match(/ +$/);
          if (m) {
            wsStart = ws.slice(0, -m[0].length);
            return m[0];
          } else {
            wsStart = ws;
            return "";
          }
        });
        if (wsEnd)
          wsEnd = wsEnd.replace(/\n+(?!\n|$)/g, `$&${indent}`);
        if (wsStart)
          wsStart = wsStart.replace(/\n+/g, `$&${indent}`);
        if (comment) {
          header += " #" + comment.replace(/ ?[\r\n]+/g, " ");
          if (onComment)
            onComment();
        }
        if (!value)
          return `${header}${indentSize}
${indent}${wsEnd}`;
        if (literal) {
          value = value.replace(/\n+/g, `$&${indent}`);
          return `${header}
${indent}${wsStart}${value}${wsEnd}`;
        }
        value = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
        const body = foldFlowLines(`${wsStart}${value}${wsEnd}`, indent, FOLD_BLOCK, strOptions.fold);
        return `${header}
${indent}${body}`;
      }
      function plainString(item, ctx, onComment, onChompKeep) {
        const {
          comment,
          type,
          value
        } = item;
        const {
          actualString,
          implicitKey,
          indent,
          inFlow
        } = ctx;
        if (implicitKey && /[\n[\]{},]/.test(value) || inFlow && /[[\]{},]/.test(value)) {
          return doubleQuotedString(value, ctx);
        }
        if (!value || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
          return implicitKey || inFlow || value.indexOf("\n") === -1 ? value.indexOf('"') !== -1 && value.indexOf("'") === -1 ? singleQuotedString(value, ctx) : doubleQuotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
        }
        if (!implicitKey && !inFlow && type !== PlainValue.Type.PLAIN && value.indexOf("\n") !== -1) {
          return blockString(item, ctx, onComment, onChompKeep);
        }
        if (indent === "" && containsDocumentMarker(value)) {
          ctx.forceBlockIndent = true;
          return blockString(item, ctx, onComment, onChompKeep);
        }
        const str = value.replace(/\n+/g, `$&
${indent}`);
        if (actualString) {
          const {
            tags
          } = ctx.doc.schema;
          const resolved = resolveScalar(str, tags, tags.scalarFallback).value;
          if (typeof resolved !== "string")
            return doubleQuotedString(value, ctx);
        }
        const body = implicitKey ? str : foldFlowLines(str, indent, FOLD_FLOW, getFoldOptions(ctx));
        if (comment && !inFlow && (body.indexOf("\n") !== -1 || comment.indexOf("\n") !== -1)) {
          if (onComment)
            onComment();
          return addCommentBefore(body, indent, comment);
        }
        return body;
      }
      function stringifyString(item, ctx, onComment, onChompKeep) {
        const {
          defaultType
        } = strOptions;
        const {
          implicitKey,
          inFlow
        } = ctx;
        let {
          type,
          value
        } = item;
        if (typeof value !== "string") {
          value = String(value);
          item = Object.assign({}, item, {
            value
          });
        }
        const _stringify = (_type) => {
          switch (_type) {
            case PlainValue.Type.BLOCK_FOLDED:
            case PlainValue.Type.BLOCK_LITERAL:
              return blockString(item, ctx, onComment, onChompKeep);
            case PlainValue.Type.QUOTE_DOUBLE:
              return doubleQuotedString(value, ctx);
            case PlainValue.Type.QUOTE_SINGLE:
              return singleQuotedString(value, ctx);
            case PlainValue.Type.PLAIN:
              return plainString(item, ctx, onComment, onChompKeep);
            default:
              return null;
          }
        };
        if (type !== PlainValue.Type.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f]/.test(value)) {
          type = PlainValue.Type.QUOTE_DOUBLE;
        } else if ((implicitKey || inFlow) && (type === PlainValue.Type.BLOCK_FOLDED || type === PlainValue.Type.BLOCK_LITERAL)) {
          type = PlainValue.Type.QUOTE_DOUBLE;
        }
        let res = _stringify(type);
        if (res === null) {
          res = _stringify(defaultType);
          if (res === null)
            throw new Error(`Unsupported default string type ${defaultType}`);
        }
        return res;
      }
      function stringifyNumber({
        format,
        minFractionDigits,
        tag,
        value
      }) {
        if (typeof value === "bigint")
          return String(value);
        if (!isFinite(value))
          return isNaN(value) ? ".nan" : value < 0 ? "-.inf" : ".inf";
        let n = JSON.stringify(value);
        if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^\d/.test(n)) {
          let i = n.indexOf(".");
          if (i < 0) {
            i = n.length;
            n += ".";
          }
          let d = minFractionDigits - (n.length - i - 1);
          while (d-- > 0)
            n += "0";
        }
        return n;
      }
      function checkFlowCollectionEnd(errors, cst) {
        let char, name;
        switch (cst.type) {
          case PlainValue.Type.FLOW_MAP:
            char = "}";
            name = "flow map";
            break;
          case PlainValue.Type.FLOW_SEQ:
            char = "]";
            name = "flow sequence";
            break;
          default:
            errors.push(new PlainValue.YAMLSemanticError(cst, "Not a flow collection!?"));
            return;
        }
        let lastItem;
        for (let i = cst.items.length - 1; i >= 0; --i) {
          const item = cst.items[i];
          if (!item || item.type !== PlainValue.Type.COMMENT) {
            lastItem = item;
            break;
          }
        }
        if (lastItem && lastItem.char !== char) {
          const msg = `Expected ${name} to end with ${char}`;
          let err;
          if (typeof lastItem.offset === "number") {
            err = new PlainValue.YAMLSemanticError(cst, msg);
            err.offset = lastItem.offset + 1;
          } else {
            err = new PlainValue.YAMLSemanticError(lastItem, msg);
            if (lastItem.range && lastItem.range.end)
              err.offset = lastItem.range.end - lastItem.range.start;
          }
          errors.push(err);
        }
      }
      function checkFlowCommentSpace(errors, comment) {
        const prev = comment.context.src[comment.range.start - 1];
        if (prev !== "\n" && prev !== "	" && prev !== " ") {
          const msg = "Comments must be separated from other tokens by white space characters";
          errors.push(new PlainValue.YAMLSemanticError(comment, msg));
        }
      }
      function getLongKeyError(source, key) {
        const sk = String(key);
        const k = sk.substr(0, 8) + "..." + sk.substr(-8);
        return new PlainValue.YAMLSemanticError(source, `The "${k}" key is too long`);
      }
      function resolveComments(collection, comments) {
        for (const {
          afterKey,
          before,
          comment
        } of comments) {
          let item = collection.items[before];
          if (!item) {
            if (comment !== void 0) {
              if (collection.comment)
                collection.comment += "\n" + comment;
              else
                collection.comment = comment;
            }
          } else {
            if (afterKey && item.value)
              item = item.value;
            if (comment === void 0) {
              if (afterKey || !item.commentBefore)
                item.spaceBefore = true;
            } else {
              if (item.commentBefore)
                item.commentBefore += "\n" + comment;
              else
                item.commentBefore = comment;
            }
          }
        }
      }
      function resolveString(doc, node) {
        const res = node.strValue;
        if (!res)
          return "";
        if (typeof res === "string")
          return res;
        res.errors.forEach((error) => {
          if (!error.source)
            error.source = node;
          doc.errors.push(error);
        });
        return res.str;
      }
      function resolveTagHandle(doc, node) {
        const {
          handle,
          suffix
        } = node.tag;
        let prefix = doc.tagPrefixes.find((p) => p.handle === handle);
        if (!prefix) {
          const dtp = doc.getDefaults().tagPrefixes;
          if (dtp)
            prefix = dtp.find((p) => p.handle === handle);
          if (!prefix)
            throw new PlainValue.YAMLSemanticError(node, `The ${handle} tag handle is non-default and was not declared.`);
        }
        if (!suffix)
          throw new PlainValue.YAMLSemanticError(node, `The ${handle} tag has no suffix.`);
        if (handle === "!" && (doc.version || doc.options.version) === "1.0") {
          if (suffix[0] === "^") {
            doc.warnings.push(new PlainValue.YAMLWarning(node, "YAML 1.0 ^ tag expansion is not supported"));
            return suffix;
          }
          if (/[:/]/.test(suffix)) {
            const vocab = suffix.match(/^([a-z0-9-]+)\/(.*)/i);
            return vocab ? `tag:${vocab[1]}.yaml.org,2002:${vocab[2]}` : `tag:${suffix}`;
          }
        }
        return prefix.prefix + decodeURIComponent(suffix);
      }
      function resolveTagName(doc, node) {
        const {
          tag,
          type
        } = node;
        let nonSpecific = false;
        if (tag) {
          const {
            handle,
            suffix,
            verbatim
          } = tag;
          if (verbatim) {
            if (verbatim !== "!" && verbatim !== "!!")
              return verbatim;
            const msg = `Verbatim tags aren't resolved, so ${verbatim} is invalid.`;
            doc.errors.push(new PlainValue.YAMLSemanticError(node, msg));
          } else if (handle === "!" && !suffix) {
            nonSpecific = true;
          } else {
            try {
              return resolveTagHandle(doc, node);
            } catch (error) {
              doc.errors.push(error);
            }
          }
        }
        switch (type) {
          case PlainValue.Type.BLOCK_FOLDED:
          case PlainValue.Type.BLOCK_LITERAL:
          case PlainValue.Type.QUOTE_DOUBLE:
          case PlainValue.Type.QUOTE_SINGLE:
            return PlainValue.defaultTags.STR;
          case PlainValue.Type.FLOW_MAP:
          case PlainValue.Type.MAP:
            return PlainValue.defaultTags.MAP;
          case PlainValue.Type.FLOW_SEQ:
          case PlainValue.Type.SEQ:
            return PlainValue.defaultTags.SEQ;
          case PlainValue.Type.PLAIN:
            return nonSpecific ? PlainValue.defaultTags.STR : null;
          default:
            return null;
        }
      }
      function resolveByTagName(doc, node, tagName) {
        const {
          tags
        } = doc.schema;
        const matchWithTest = [];
        for (const tag of tags) {
          if (tag.tag === tagName) {
            if (tag.test)
              matchWithTest.push(tag);
            else {
              const res = tag.resolve(doc, node);
              return res instanceof Collection ? res : new Scalar(res);
            }
          }
        }
        const str = resolveString(doc, node);
        if (typeof str === "string" && matchWithTest.length > 0)
          return resolveScalar(str, matchWithTest, tags.scalarFallback);
        return null;
      }
      function getFallbackTagName({
        type
      }) {
        switch (type) {
          case PlainValue.Type.FLOW_MAP:
          case PlainValue.Type.MAP:
            return PlainValue.defaultTags.MAP;
          case PlainValue.Type.FLOW_SEQ:
          case PlainValue.Type.SEQ:
            return PlainValue.defaultTags.SEQ;
          default:
            return PlainValue.defaultTags.STR;
        }
      }
      function resolveTag(doc, node, tagName) {
        try {
          const res = resolveByTagName(doc, node, tagName);
          if (res) {
            if (tagName && node.tag)
              res.tag = tagName;
            return res;
          }
        } catch (error) {
          if (!error.source)
            error.source = node;
          doc.errors.push(error);
          return null;
        }
        try {
          const fallback = getFallbackTagName(node);
          if (!fallback)
            throw new Error(`The tag ${tagName} is unavailable`);
          const msg = `The tag ${tagName} is unavailable, falling back to ${fallback}`;
          doc.warnings.push(new PlainValue.YAMLWarning(node, msg));
          const res = resolveByTagName(doc, node, fallback);
          res.tag = tagName;
          return res;
        } catch (error) {
          const refError = new PlainValue.YAMLReferenceError(node, error.message);
          refError.stack = error.stack;
          doc.errors.push(refError);
          return null;
        }
      }
      var isCollectionItem = (node) => {
        if (!node)
          return false;
        const {
          type
        } = node;
        return type === PlainValue.Type.MAP_KEY || type === PlainValue.Type.MAP_VALUE || type === PlainValue.Type.SEQ_ITEM;
      };
      function resolveNodeProps(errors, node) {
        const comments = {
          before: [],
          after: []
        };
        let hasAnchor = false;
        let hasTag = false;
        const props = isCollectionItem(node.context.parent) ? node.context.parent.props.concat(node.props) : node.props;
        for (const {
          start,
          end
        } of props) {
          switch (node.context.src[start]) {
            case PlainValue.Char.COMMENT: {
              if (!node.commentHasRequiredWhitespace(start)) {
                const msg = "Comments must be separated from other tokens by white space characters";
                errors.push(new PlainValue.YAMLSemanticError(node, msg));
              }
              const {
                header,
                valueRange
              } = node;
              const cc = valueRange && (start > valueRange.start || header && start > header.start) ? comments.after : comments.before;
              cc.push(node.context.src.slice(start + 1, end));
              break;
            }
            case PlainValue.Char.ANCHOR:
              if (hasAnchor) {
                const msg = "A node can have at most one anchor";
                errors.push(new PlainValue.YAMLSemanticError(node, msg));
              }
              hasAnchor = true;
              break;
            case PlainValue.Char.TAG:
              if (hasTag) {
                const msg = "A node can have at most one tag";
                errors.push(new PlainValue.YAMLSemanticError(node, msg));
              }
              hasTag = true;
              break;
          }
        }
        return {
          comments,
          hasAnchor,
          hasTag
        };
      }
      function resolveNodeValue(doc, node) {
        const {
          anchors,
          errors,
          schema
        } = doc;
        if (node.type === PlainValue.Type.ALIAS) {
          const name = node.rawValue;
          const src = anchors.getNode(name);
          if (!src) {
            const msg = `Aliased anchor not found: ${name}`;
            errors.push(new PlainValue.YAMLReferenceError(node, msg));
            return null;
          }
          const res = new Alias(src);
          anchors._cstAliases.push(res);
          return res;
        }
        const tagName = resolveTagName(doc, node);
        if (tagName)
          return resolveTag(doc, node, tagName);
        if (node.type !== PlainValue.Type.PLAIN) {
          const msg = `Failed to resolve ${node.type} node here`;
          errors.push(new PlainValue.YAMLSyntaxError(node, msg));
          return null;
        }
        try {
          const str = resolveString(doc, node);
          return resolveScalar(str, schema.tags, schema.tags.scalarFallback);
        } catch (error) {
          if (!error.source)
            error.source = node;
          errors.push(error);
          return null;
        }
      }
      function resolveNode(doc, node) {
        if (!node)
          return null;
        if (node.error)
          doc.errors.push(node.error);
        const {
          comments,
          hasAnchor,
          hasTag
        } = resolveNodeProps(doc.errors, node);
        if (hasAnchor) {
          const {
            anchors
          } = doc;
          const name = node.anchor;
          const prev = anchors.getNode(name);
          if (prev)
            anchors.map[anchors.newName(name)] = prev;
          anchors.map[name] = node;
        }
        if (node.type === PlainValue.Type.ALIAS && (hasAnchor || hasTag)) {
          const msg = "An alias node must not specify any properties";
          doc.errors.push(new PlainValue.YAMLSemanticError(node, msg));
        }
        const res = resolveNodeValue(doc, node);
        if (res) {
          res.range = [node.range.start, node.range.end];
          if (doc.options.keepCstNodes)
            res.cstNode = node;
          if (doc.options.keepNodeTypes)
            res.type = node.type;
          const cb = comments.before.join("\n");
          if (cb) {
            res.commentBefore = res.commentBefore ? `${res.commentBefore}
${cb}` : cb;
          }
          const ca = comments.after.join("\n");
          if (ca)
            res.comment = res.comment ? `${res.comment}
${ca}` : ca;
        }
        return node.resolved = res;
      }
      function resolveMap(doc, cst) {
        if (cst.type !== PlainValue.Type.MAP && cst.type !== PlainValue.Type.FLOW_MAP) {
          const msg = `A ${cst.type} node cannot be resolved as a mapping`;
          doc.errors.push(new PlainValue.YAMLSyntaxError(cst, msg));
          return null;
        }
        const {
          comments,
          items
        } = cst.type === PlainValue.Type.FLOW_MAP ? resolveFlowMapItems(doc, cst) : resolveBlockMapItems(doc, cst);
        const map = new YAMLMap();
        map.items = items;
        resolveComments(map, comments);
        let hasCollectionKey = false;
        for (let i = 0; i < items.length; ++i) {
          const {
            key: iKey
          } = items[i];
          if (iKey instanceof Collection)
            hasCollectionKey = true;
          if (doc.schema.merge && iKey && iKey.value === MERGE_KEY) {
            items[i] = new Merge(items[i]);
            const sources = items[i].value.items;
            let error = null;
            sources.some((node) => {
              if (node instanceof Alias) {
                const {
                  type
                } = node.source;
                if (type === PlainValue.Type.MAP || type === PlainValue.Type.FLOW_MAP)
                  return false;
                return error = "Merge nodes aliases can only point to maps";
              }
              return error = "Merge nodes can only have Alias nodes as values";
            });
            if (error)
              doc.errors.push(new PlainValue.YAMLSemanticError(cst, error));
          } else {
            for (let j = i + 1; j < items.length; ++j) {
              const {
                key: jKey
              } = items[j];
              if (iKey === jKey || iKey && jKey && Object.prototype.hasOwnProperty.call(iKey, "value") && iKey.value === jKey.value) {
                const msg = `Map keys must be unique; "${iKey}" is repeated`;
                doc.errors.push(new PlainValue.YAMLSemanticError(cst, msg));
                break;
              }
            }
          }
        }
        if (hasCollectionKey && !doc.options.mapAsMap) {
          const warn = "Keys with collection values will be stringified as YAML due to JS Object restrictions. Use mapAsMap: true to avoid this.";
          doc.warnings.push(new PlainValue.YAMLWarning(cst, warn));
        }
        cst.resolved = map;
        return map;
      }
      var valueHasPairComment = ({
        context: {
          lineStart,
          node,
          src
        },
        props
      }) => {
        if (props.length === 0)
          return false;
        const {
          start
        } = props[0];
        if (node && start > node.valueRange.start)
          return false;
        if (src[start] !== PlainValue.Char.COMMENT)
          return false;
        for (let i = lineStart; i < start; ++i)
          if (src[i] === "\n")
            return false;
        return true;
      };
      function resolvePairComment(item, pair) {
        if (!valueHasPairComment(item))
          return;
        const comment = item.getPropValue(0, PlainValue.Char.COMMENT, true);
        let found = false;
        const cb = pair.value.commentBefore;
        if (cb && cb.startsWith(comment)) {
          pair.value.commentBefore = cb.substr(comment.length + 1);
          found = true;
        } else {
          const cc = pair.value.comment;
          if (!item.node && cc && cc.startsWith(comment)) {
            pair.value.comment = cc.substr(comment.length + 1);
            found = true;
          }
        }
        if (found)
          pair.comment = comment;
      }
      function resolveBlockMapItems(doc, cst) {
        const comments = [];
        const items = [];
        let key = void 0;
        let keyStart = null;
        for (let i = 0; i < cst.items.length; ++i) {
          const item = cst.items[i];
          switch (item.type) {
            case PlainValue.Type.BLANK_LINE:
              comments.push({
                afterKey: !!key,
                before: items.length
              });
              break;
            case PlainValue.Type.COMMENT:
              comments.push({
                afterKey: !!key,
                before: items.length,
                comment: item.comment
              });
              break;
            case PlainValue.Type.MAP_KEY:
              if (key !== void 0)
                items.push(new Pair(key));
              if (item.error)
                doc.errors.push(item.error);
              key = resolveNode(doc, item.node);
              keyStart = null;
              break;
            case PlainValue.Type.MAP_VALUE:
              {
                if (key === void 0)
                  key = null;
                if (item.error)
                  doc.errors.push(item.error);
                if (!item.context.atLineStart && item.node && item.node.type === PlainValue.Type.MAP && !item.node.context.atLineStart) {
                  const msg = "Nested mappings are not allowed in compact mappings";
                  doc.errors.push(new PlainValue.YAMLSemanticError(item.node, msg));
                }
                let valueNode = item.node;
                if (!valueNode && item.props.length > 0) {
                  valueNode = new PlainValue.PlainValue(PlainValue.Type.PLAIN, []);
                  valueNode.context = {
                    parent: item,
                    src: item.context.src
                  };
                  const pos = item.range.start + 1;
                  valueNode.range = {
                    start: pos,
                    end: pos
                  };
                  valueNode.valueRange = {
                    start: pos,
                    end: pos
                  };
                  if (typeof item.range.origStart === "number") {
                    const origPos = item.range.origStart + 1;
                    valueNode.range.origStart = valueNode.range.origEnd = origPos;
                    valueNode.valueRange.origStart = valueNode.valueRange.origEnd = origPos;
                  }
                }
                const pair = new Pair(key, resolveNode(doc, valueNode));
                resolvePairComment(item, pair);
                items.push(pair);
                if (key && typeof keyStart === "number") {
                  if (item.range.start > keyStart + 1024)
                    doc.errors.push(getLongKeyError(cst, key));
                }
                key = void 0;
                keyStart = null;
              }
              break;
            default:
              if (key !== void 0)
                items.push(new Pair(key));
              key = resolveNode(doc, item);
              keyStart = item.range.start;
              if (item.error)
                doc.errors.push(item.error);
              next:
                for (let j = i + 1; ; ++j) {
                  const nextItem = cst.items[j];
                  switch (nextItem && nextItem.type) {
                    case PlainValue.Type.BLANK_LINE:
                    case PlainValue.Type.COMMENT:
                      continue next;
                    case PlainValue.Type.MAP_VALUE:
                      break next;
                    default: {
                      const msg = "Implicit map keys need to be followed by map values";
                      doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
                      break next;
                    }
                  }
                }
              if (item.valueRangeContainsNewline) {
                const msg = "Implicit map keys need to be on a single line";
                doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
              }
          }
        }
        if (key !== void 0)
          items.push(new Pair(key));
        return {
          comments,
          items
        };
      }
      function resolveFlowMapItems(doc, cst) {
        const comments = [];
        const items = [];
        let key = void 0;
        let explicitKey = false;
        let next = "{";
        for (let i = 0; i < cst.items.length; ++i) {
          const item = cst.items[i];
          if (typeof item.char === "string") {
            const {
              char,
              offset
            } = item;
            if (char === "?" && key === void 0 && !explicitKey) {
              explicitKey = true;
              next = ":";
              continue;
            }
            if (char === ":") {
              if (key === void 0)
                key = null;
              if (next === ":") {
                next = ",";
                continue;
              }
            } else {
              if (explicitKey) {
                if (key === void 0 && char !== ",")
                  key = null;
                explicitKey = false;
              }
              if (key !== void 0) {
                items.push(new Pair(key));
                key = void 0;
                if (char === ",") {
                  next = ":";
                  continue;
                }
              }
            }
            if (char === "}") {
              if (i === cst.items.length - 1)
                continue;
            } else if (char === next) {
              next = ":";
              continue;
            }
            const msg = `Flow map contains an unexpected ${char}`;
            const err = new PlainValue.YAMLSyntaxError(cst, msg);
            err.offset = offset;
            doc.errors.push(err);
          } else if (item.type === PlainValue.Type.BLANK_LINE) {
            comments.push({
              afterKey: !!key,
              before: items.length
            });
          } else if (item.type === PlainValue.Type.COMMENT) {
            checkFlowCommentSpace(doc.errors, item);
            comments.push({
              afterKey: !!key,
              before: items.length,
              comment: item.comment
            });
          } else if (key === void 0) {
            if (next === ",")
              doc.errors.push(new PlainValue.YAMLSemanticError(item, "Separator , missing in flow map"));
            key = resolveNode(doc, item);
          } else {
            if (next !== ",")
              doc.errors.push(new PlainValue.YAMLSemanticError(item, "Indicator : missing in flow map entry"));
            items.push(new Pair(key, resolveNode(doc, item)));
            key = void 0;
            explicitKey = false;
          }
        }
        checkFlowCollectionEnd(doc.errors, cst);
        if (key !== void 0)
          items.push(new Pair(key));
        return {
          comments,
          items
        };
      }
      function resolveSeq(doc, cst) {
        if (cst.type !== PlainValue.Type.SEQ && cst.type !== PlainValue.Type.FLOW_SEQ) {
          const msg = `A ${cst.type} node cannot be resolved as a sequence`;
          doc.errors.push(new PlainValue.YAMLSyntaxError(cst, msg));
          return null;
        }
        const {
          comments,
          items
        } = cst.type === PlainValue.Type.FLOW_SEQ ? resolveFlowSeqItems(doc, cst) : resolveBlockSeqItems(doc, cst);
        const seq = new YAMLSeq();
        seq.items = items;
        resolveComments(seq, comments);
        if (!doc.options.mapAsMap && items.some((it) => it instanceof Pair && it.key instanceof Collection)) {
          const warn = "Keys with collection values will be stringified as YAML due to JS Object restrictions. Use mapAsMap: true to avoid this.";
          doc.warnings.push(new PlainValue.YAMLWarning(cst, warn));
        }
        cst.resolved = seq;
        return seq;
      }
      function resolveBlockSeqItems(doc, cst) {
        const comments = [];
        const items = [];
        for (let i = 0; i < cst.items.length; ++i) {
          const item = cst.items[i];
          switch (item.type) {
            case PlainValue.Type.BLANK_LINE:
              comments.push({
                before: items.length
              });
              break;
            case PlainValue.Type.COMMENT:
              comments.push({
                comment: item.comment,
                before: items.length
              });
              break;
            case PlainValue.Type.SEQ_ITEM:
              if (item.error)
                doc.errors.push(item.error);
              items.push(resolveNode(doc, item.node));
              if (item.hasProps) {
                const msg = "Sequence items cannot have tags or anchors before the - indicator";
                doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
              }
              break;
            default:
              if (item.error)
                doc.errors.push(item.error);
              doc.errors.push(new PlainValue.YAMLSyntaxError(item, `Unexpected ${item.type} node in sequence`));
          }
        }
        return {
          comments,
          items
        };
      }
      function resolveFlowSeqItems(doc, cst) {
        const comments = [];
        const items = [];
        let explicitKey = false;
        let key = void 0;
        let keyStart = null;
        let next = "[";
        let prevItem = null;
        for (let i = 0; i < cst.items.length; ++i) {
          const item = cst.items[i];
          if (typeof item.char === "string") {
            const {
              char,
              offset
            } = item;
            if (char !== ":" && (explicitKey || key !== void 0)) {
              if (explicitKey && key === void 0)
                key = next ? items.pop() : null;
              items.push(new Pair(key));
              explicitKey = false;
              key = void 0;
              keyStart = null;
            }
            if (char === next) {
              next = null;
            } else if (!next && char === "?") {
              explicitKey = true;
            } else if (next !== "[" && char === ":" && key === void 0) {
              if (next === ",") {
                key = items.pop();
                if (key instanceof Pair) {
                  const msg = "Chaining flow sequence pairs is invalid";
                  const err = new PlainValue.YAMLSemanticError(cst, msg);
                  err.offset = offset;
                  doc.errors.push(err);
                }
                if (!explicitKey && typeof keyStart === "number") {
                  const keyEnd = item.range ? item.range.start : item.offset;
                  if (keyEnd > keyStart + 1024)
                    doc.errors.push(getLongKeyError(cst, key));
                  const {
                    src
                  } = prevItem.context;
                  for (let i2 = keyStart; i2 < keyEnd; ++i2)
                    if (src[i2] === "\n") {
                      const msg = "Implicit keys of flow sequence pairs need to be on a single line";
                      doc.errors.push(new PlainValue.YAMLSemanticError(prevItem, msg));
                      break;
                    }
                }
              } else {
                key = null;
              }
              keyStart = null;
              explicitKey = false;
              next = null;
            } else if (next === "[" || char !== "]" || i < cst.items.length - 1) {
              const msg = `Flow sequence contains an unexpected ${char}`;
              const err = new PlainValue.YAMLSyntaxError(cst, msg);
              err.offset = offset;
              doc.errors.push(err);
            }
          } else if (item.type === PlainValue.Type.BLANK_LINE) {
            comments.push({
              before: items.length
            });
          } else if (item.type === PlainValue.Type.COMMENT) {
            checkFlowCommentSpace(doc.errors, item);
            comments.push({
              comment: item.comment,
              before: items.length
            });
          } else {
            if (next) {
              const msg = `Expected a ${next} in flow sequence`;
              doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
            }
            const value = resolveNode(doc, item);
            if (key === void 0) {
              items.push(value);
              prevItem = item;
            } else {
              items.push(new Pair(key, value));
              key = void 0;
            }
            keyStart = item.range.start;
            next = ",";
          }
        }
        checkFlowCollectionEnd(doc.errors, cst);
        if (key !== void 0)
          items.push(new Pair(key));
        return {
          comments,
          items
        };
      }
      exports.Alias = Alias;
      exports.Collection = Collection;
      exports.Merge = Merge;
      exports.Node = Node;
      exports.Pair = Pair;
      exports.Scalar = Scalar;
      exports.YAMLMap = YAMLMap;
      exports.YAMLSeq = YAMLSeq;
      exports.addComment = addComment;
      exports.binaryOptions = binaryOptions;
      exports.boolOptions = boolOptions;
      exports.findPair = findPair;
      exports.intOptions = intOptions;
      exports.isEmptyPath = isEmptyPath;
      exports.nullOptions = nullOptions;
      exports.resolveMap = resolveMap;
      exports.resolveNode = resolveNode;
      exports.resolveSeq = resolveSeq;
      exports.resolveString = resolveString;
      exports.strOptions = strOptions;
      exports.stringifyNumber = stringifyNumber;
      exports.stringifyString = stringifyString;
      exports.toJSON = toJSON;
    }
  });

  // node_modules/yaml/dist/warnings-1000a372.js
  var require_warnings_1000a372 = __commonJS({
    "node_modules/yaml/dist/warnings-1000a372.js"(exports) {
      "use strict";
      var PlainValue = require_PlainValue_ec8e588e();
      var resolveSeq = require_resolveSeq_d03cb037();
      var binary = {
        identify: (value) => value instanceof Uint8Array,
        default: false,
        tag: "tag:yaml.org,2002:binary",
        resolve: (doc, node) => {
          const src = resolveSeq.resolveString(doc, node);
          if (typeof Buffer === "function") {
            return Buffer.from(src, "base64");
          } else if (typeof atob === "function") {
            const str = atob(src.replace(/[\n\r]/g, ""));
            const buffer = new Uint8Array(str.length);
            for (let i = 0; i < str.length; ++i)
              buffer[i] = str.charCodeAt(i);
            return buffer;
          } else {
            const msg = "This environment does not support reading binary tags; either Buffer or atob is required";
            doc.errors.push(new PlainValue.YAMLReferenceError(node, msg));
            return null;
          }
        },
        options: resolveSeq.binaryOptions,
        stringify: ({
          comment,
          type,
          value
        }, ctx, onComment, onChompKeep) => {
          let src;
          if (typeof Buffer === "function") {
            src = value instanceof Buffer ? value.toString("base64") : Buffer.from(value.buffer).toString("base64");
          } else if (typeof btoa === "function") {
            let s = "";
            for (let i = 0; i < value.length; ++i)
              s += String.fromCharCode(value[i]);
            src = btoa(s);
          } else {
            throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
          }
          if (!type)
            type = resolveSeq.binaryOptions.defaultType;
          if (type === PlainValue.Type.QUOTE_DOUBLE) {
            value = src;
          } else {
            const {
              lineWidth
            } = resolveSeq.binaryOptions;
            const n = Math.ceil(src.length / lineWidth);
            const lines = new Array(n);
            for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
              lines[i] = src.substr(o, lineWidth);
            }
            value = lines.join(type === PlainValue.Type.BLOCK_LITERAL ? "\n" : " ");
          }
          return resolveSeq.stringifyString({
            comment,
            type,
            value
          }, ctx, onComment, onChompKeep);
        }
      };
      function parsePairs(doc, cst) {
        const seq = resolveSeq.resolveSeq(doc, cst);
        for (let i = 0; i < seq.items.length; ++i) {
          let item = seq.items[i];
          if (item instanceof resolveSeq.Pair)
            continue;
          else if (item instanceof resolveSeq.YAMLMap) {
            if (item.items.length > 1) {
              const msg = "Each pair must have its own sequence indicator";
              throw new PlainValue.YAMLSemanticError(cst, msg);
            }
            const pair = item.items[0] || new resolveSeq.Pair();
            if (item.commentBefore)
              pair.commentBefore = pair.commentBefore ? `${item.commentBefore}
${pair.commentBefore}` : item.commentBefore;
            if (item.comment)
              pair.comment = pair.comment ? `${item.comment}
${pair.comment}` : item.comment;
            item = pair;
          }
          seq.items[i] = item instanceof resolveSeq.Pair ? item : new resolveSeq.Pair(item);
        }
        return seq;
      }
      function createPairs(schema, iterable, ctx) {
        const pairs2 = new resolveSeq.YAMLSeq(schema);
        pairs2.tag = "tag:yaml.org,2002:pairs";
        for (const it of iterable) {
          let key, value;
          if (Array.isArray(it)) {
            if (it.length === 2) {
              key = it[0];
              value = it[1];
            } else
              throw new TypeError(`Expected [key, value] tuple: ${it}`);
          } else if (it && it instanceof Object) {
            const keys = Object.keys(it);
            if (keys.length === 1) {
              key = keys[0];
              value = it[key];
            } else
              throw new TypeError(`Expected { key: value } tuple: ${it}`);
          } else {
            key = it;
          }
          const pair = schema.createPair(key, value, ctx);
          pairs2.items.push(pair);
        }
        return pairs2;
      }
      var pairs = {
        default: false,
        tag: "tag:yaml.org,2002:pairs",
        resolve: parsePairs,
        createNode: createPairs
      };
      var YAMLOMap = class extends resolveSeq.YAMLSeq {
        constructor() {
          super();
          PlainValue._defineProperty(this, "add", resolveSeq.YAMLMap.prototype.add.bind(this));
          PlainValue._defineProperty(this, "delete", resolveSeq.YAMLMap.prototype.delete.bind(this));
          PlainValue._defineProperty(this, "get", resolveSeq.YAMLMap.prototype.get.bind(this));
          PlainValue._defineProperty(this, "has", resolveSeq.YAMLMap.prototype.has.bind(this));
          PlainValue._defineProperty(this, "set", resolveSeq.YAMLMap.prototype.set.bind(this));
          this.tag = YAMLOMap.tag;
        }
        toJSON(_, ctx) {
          const map = new Map();
          if (ctx && ctx.onCreate)
            ctx.onCreate(map);
          for (const pair of this.items) {
            let key, value;
            if (pair instanceof resolveSeq.Pair) {
              key = resolveSeq.toJSON(pair.key, "", ctx);
              value = resolveSeq.toJSON(pair.value, key, ctx);
            } else {
              key = resolveSeq.toJSON(pair, "", ctx);
            }
            if (map.has(key))
              throw new Error("Ordered maps must not include duplicate keys");
            map.set(key, value);
          }
          return map;
        }
      };
      PlainValue._defineProperty(YAMLOMap, "tag", "tag:yaml.org,2002:omap");
      function parseOMap(doc, cst) {
        const pairs2 = parsePairs(doc, cst);
        const seenKeys = [];
        for (const {
          key
        } of pairs2.items) {
          if (key instanceof resolveSeq.Scalar) {
            if (seenKeys.includes(key.value)) {
              const msg = "Ordered maps must not include duplicate keys";
              throw new PlainValue.YAMLSemanticError(cst, msg);
            } else {
              seenKeys.push(key.value);
            }
          }
        }
        return Object.assign(new YAMLOMap(), pairs2);
      }
      function createOMap(schema, iterable, ctx) {
        const pairs2 = createPairs(schema, iterable, ctx);
        const omap2 = new YAMLOMap();
        omap2.items = pairs2.items;
        return omap2;
      }
      var omap = {
        identify: (value) => value instanceof Map,
        nodeClass: YAMLOMap,
        default: false,
        tag: "tag:yaml.org,2002:omap",
        resolve: parseOMap,
        createNode: createOMap
      };
      var YAMLSet = class extends resolveSeq.YAMLMap {
        constructor() {
          super();
          this.tag = YAMLSet.tag;
        }
        add(key) {
          const pair = key instanceof resolveSeq.Pair ? key : new resolveSeq.Pair(key);
          const prev = resolveSeq.findPair(this.items, pair.key);
          if (!prev)
            this.items.push(pair);
        }
        get(key, keepPair) {
          const pair = resolveSeq.findPair(this.items, key);
          return !keepPair && pair instanceof resolveSeq.Pair ? pair.key instanceof resolveSeq.Scalar ? pair.key.value : pair.key : pair;
        }
        set(key, value) {
          if (typeof value !== "boolean")
            throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
          const prev = resolveSeq.findPair(this.items, key);
          if (prev && !value) {
            this.items.splice(this.items.indexOf(prev), 1);
          } else if (!prev && value) {
            this.items.push(new resolveSeq.Pair(key));
          }
        }
        toJSON(_, ctx) {
          return super.toJSON(_, ctx, Set);
        }
        toString(ctx, onComment, onChompKeep) {
          if (!ctx)
            return JSON.stringify(this);
          if (this.hasAllNullValues())
            return super.toString(ctx, onComment, onChompKeep);
          else
            throw new Error("Set items must all have null values");
        }
      };
      PlainValue._defineProperty(YAMLSet, "tag", "tag:yaml.org,2002:set");
      function parseSet(doc, cst) {
        const map = resolveSeq.resolveMap(doc, cst);
        if (!map.hasAllNullValues())
          throw new PlainValue.YAMLSemanticError(cst, "Set items must all have null values");
        return Object.assign(new YAMLSet(), map);
      }
      function createSet(schema, iterable, ctx) {
        const set2 = new YAMLSet();
        for (const value of iterable)
          set2.items.push(schema.createPair(value, null, ctx));
        return set2;
      }
      var set = {
        identify: (value) => value instanceof Set,
        nodeClass: YAMLSet,
        default: false,
        tag: "tag:yaml.org,2002:set",
        resolve: parseSet,
        createNode: createSet
      };
      var parseSexagesimal = (sign, parts) => {
        const n = parts.split(":").reduce((n2, p) => n2 * 60 + Number(p), 0);
        return sign === "-" ? -n : n;
      };
      var stringifySexagesimal = ({
        value
      }) => {
        if (isNaN(value) || !isFinite(value))
          return resolveSeq.stringifyNumber(value);
        let sign = "";
        if (value < 0) {
          sign = "-";
          value = Math.abs(value);
        }
        const parts = [value % 60];
        if (value < 60) {
          parts.unshift(0);
        } else {
          value = Math.round((value - parts[0]) / 60);
          parts.unshift(value % 60);
          if (value >= 60) {
            value = Math.round((value - parts[0]) / 60);
            parts.unshift(value);
          }
        }
        return sign + parts.map((n) => n < 10 ? "0" + String(n) : String(n)).join(":").replace(/000000\d*$/, "");
      };
      var intTime = {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:int",
        format: "TIME",
        test: /^([-+]?)([0-9][0-9_]*(?::[0-5]?[0-9])+)$/,
        resolve: (str, sign, parts) => parseSexagesimal(sign, parts.replace(/_/g, "")),
        stringify: stringifySexagesimal
      };
      var floatTime = {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        format: "TIME",
        test: /^([-+]?)([0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*)$/,
        resolve: (str, sign, parts) => parseSexagesimal(sign, parts.replace(/_/g, "")),
        stringify: stringifySexagesimal
      };
      var timestamp = {
        identify: (value) => value instanceof Date,
        default: true,
        tag: "tag:yaml.org,2002:timestamp",
        test: RegExp("^(?:([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?)$"),
        resolve: (str, year, month, day, hour, minute, second, millisec, tz) => {
          if (millisec)
            millisec = (millisec + "00").substr(1, 3);
          let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec || 0);
          if (tz && tz !== "Z") {
            let d = parseSexagesimal(tz[0], tz.slice(1));
            if (Math.abs(d) < 30)
              d *= 60;
            date -= 6e4 * d;
          }
          return new Date(date);
        },
        stringify: ({
          value
        }) => value.toISOString().replace(/((T00:00)?:00)?\.000Z$/, "")
      };
      function shouldWarn(deprecation) {
        const env = typeof process !== "undefined" && process.env || {};
        if (deprecation) {
          if (typeof YAML_SILENCE_DEPRECATION_WARNINGS !== "undefined")
            return !YAML_SILENCE_DEPRECATION_WARNINGS;
          return !env.YAML_SILENCE_DEPRECATION_WARNINGS;
        }
        if (typeof YAML_SILENCE_WARNINGS !== "undefined")
          return !YAML_SILENCE_WARNINGS;
        return !env.YAML_SILENCE_WARNINGS;
      }
      function warn(warning, type) {
        if (shouldWarn(false)) {
          const emit = typeof process !== "undefined" && process.emitWarning;
          if (emit)
            emit(warning, type);
          else {
            console.warn(type ? `${type}: ${warning}` : warning);
          }
        }
      }
      function warnFileDeprecation(filename) {
        if (shouldWarn(true)) {
          const path = filename.replace(/.*yaml[/\\]/i, "").replace(/\.js$/, "").replace(/\\/g, "/");
          warn(`The endpoint 'yaml/${path}' will be removed in a future release.`, "DeprecationWarning");
        }
      }
      var warned = {};
      function warnOptionDeprecation(name, alternative) {
        if (!warned[name] && shouldWarn(true)) {
          warned[name] = true;
          let msg = `The option '${name}' will be removed in a future release`;
          msg += alternative ? `, use '${alternative}' instead.` : ".";
          warn(msg, "DeprecationWarning");
        }
      }
      exports.binary = binary;
      exports.floatTime = floatTime;
      exports.intTime = intTime;
      exports.omap = omap;
      exports.pairs = pairs;
      exports.set = set;
      exports.timestamp = timestamp;
      exports.warn = warn;
      exports.warnFileDeprecation = warnFileDeprecation;
      exports.warnOptionDeprecation = warnOptionDeprecation;
    }
  });

  // node_modules/yaml/dist/Schema-88e323a7.js
  var require_Schema_88e323a7 = __commonJS({
    "node_modules/yaml/dist/Schema-88e323a7.js"(exports) {
      "use strict";
      var PlainValue = require_PlainValue_ec8e588e();
      var resolveSeq = require_resolveSeq_d03cb037();
      var warnings = require_warnings_1000a372();
      function createMap(schema, obj, ctx) {
        const map2 = new resolveSeq.YAMLMap(schema);
        if (obj instanceof Map) {
          for (const [key, value] of obj)
            map2.items.push(schema.createPair(key, value, ctx));
        } else if (obj && typeof obj === "object") {
          for (const key of Object.keys(obj))
            map2.items.push(schema.createPair(key, obj[key], ctx));
        }
        if (typeof schema.sortMapEntries === "function") {
          map2.items.sort(schema.sortMapEntries);
        }
        return map2;
      }
      var map = {
        createNode: createMap,
        default: true,
        nodeClass: resolveSeq.YAMLMap,
        tag: "tag:yaml.org,2002:map",
        resolve: resolveSeq.resolveMap
      };
      function createSeq(schema, obj, ctx) {
        const seq2 = new resolveSeq.YAMLSeq(schema);
        if (obj && obj[Symbol.iterator]) {
          for (const it of obj) {
            const v = schema.createNode(it, ctx.wrapScalars, null, ctx);
            seq2.items.push(v);
          }
        }
        return seq2;
      }
      var seq = {
        createNode: createSeq,
        default: true,
        nodeClass: resolveSeq.YAMLSeq,
        tag: "tag:yaml.org,2002:seq",
        resolve: resolveSeq.resolveSeq
      };
      var string = {
        identify: (value) => typeof value === "string",
        default: true,
        tag: "tag:yaml.org,2002:str",
        resolve: resolveSeq.resolveString,
        stringify(item, ctx, onComment, onChompKeep) {
          ctx = Object.assign({
            actualString: true
          }, ctx);
          return resolveSeq.stringifyString(item, ctx, onComment, onChompKeep);
        },
        options: resolveSeq.strOptions
      };
      var failsafe = [map, seq, string];
      var intIdentify$2 = (value) => typeof value === "bigint" || Number.isInteger(value);
      var intResolve$1 = (src, part, radix) => resolveSeq.intOptions.asBigInt ? BigInt(src) : parseInt(part, radix);
      function intStringify$1(node, radix, prefix) {
        const {
          value
        } = node;
        if (intIdentify$2(value) && value >= 0)
          return prefix + value.toString(radix);
        return resolveSeq.stringifyNumber(node);
      }
      var nullObj = {
        identify: (value) => value == null,
        createNode: (schema, value, ctx) => ctx.wrapScalars ? new resolveSeq.Scalar(null) : null,
        default: true,
        tag: "tag:yaml.org,2002:null",
        test: /^(?:~|[Nn]ull|NULL)?$/,
        resolve: () => null,
        options: resolveSeq.nullOptions,
        stringify: () => resolveSeq.nullOptions.nullStr
      };
      var boolObj = {
        identify: (value) => typeof value === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
        resolve: (str) => str[0] === "t" || str[0] === "T",
        options: resolveSeq.boolOptions,
        stringify: ({
          value
        }) => value ? resolveSeq.boolOptions.trueStr : resolveSeq.boolOptions.falseStr
      };
      var octObj = {
        identify: (value) => intIdentify$2(value) && value >= 0,
        default: true,
        tag: "tag:yaml.org,2002:int",
        format: "OCT",
        test: /^0o([0-7]+)$/,
        resolve: (str, oct) => intResolve$1(str, oct, 8),
        options: resolveSeq.intOptions,
        stringify: (node) => intStringify$1(node, 8, "0o")
      };
      var intObj = {
        identify: intIdentify$2,
        default: true,
        tag: "tag:yaml.org,2002:int",
        test: /^[-+]?[0-9]+$/,
        resolve: (str) => intResolve$1(str, str, 10),
        options: resolveSeq.intOptions,
        stringify: resolveSeq.stringifyNumber
      };
      var hexObj = {
        identify: (value) => intIdentify$2(value) && value >= 0,
        default: true,
        tag: "tag:yaml.org,2002:int",
        format: "HEX",
        test: /^0x([0-9a-fA-F]+)$/,
        resolve: (str, hex) => intResolve$1(str, hex, 16),
        options: resolveSeq.intOptions,
        stringify: (node) => intStringify$1(node, 16, "0x")
      };
      var nanObj = {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^(?:[-+]?\.inf|(\.nan))$/i,
        resolve: (str, nan) => nan ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
        stringify: resolveSeq.stringifyNumber
      };
      var expObj = {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        format: "EXP",
        test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
        resolve: (str) => parseFloat(str),
        stringify: ({
          value
        }) => Number(value).toExponential()
      };
      var floatObj = {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^[-+]?(?:\.([0-9]+)|[0-9]+\.([0-9]*))$/,
        resolve(str, frac1, frac2) {
          const frac = frac1 || frac2;
          const node = new resolveSeq.Scalar(parseFloat(str));
          if (frac && frac[frac.length - 1] === "0")
            node.minFractionDigits = frac.length;
          return node;
        },
        stringify: resolveSeq.stringifyNumber
      };
      var core = failsafe.concat([nullObj, boolObj, octObj, intObj, hexObj, nanObj, expObj, floatObj]);
      var intIdentify$1 = (value) => typeof value === "bigint" || Number.isInteger(value);
      var stringifyJSON = ({
        value
      }) => JSON.stringify(value);
      var json = [map, seq, {
        identify: (value) => typeof value === "string",
        default: true,
        tag: "tag:yaml.org,2002:str",
        resolve: resolveSeq.resolveString,
        stringify: stringifyJSON
      }, {
        identify: (value) => value == null,
        createNode: (schema, value, ctx) => ctx.wrapScalars ? new resolveSeq.Scalar(null) : null,
        default: true,
        tag: "tag:yaml.org,2002:null",
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
      }, {
        identify: (value) => typeof value === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^true|false$/,
        resolve: (str) => str === "true",
        stringify: stringifyJSON
      }, {
        identify: intIdentify$1,
        default: true,
        tag: "tag:yaml.org,2002:int",
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str) => resolveSeq.intOptions.asBigInt ? BigInt(str) : parseInt(str, 10),
        stringify: ({
          value
        }) => intIdentify$1(value) ? value.toString() : JSON.stringify(value)
      }, {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: (str) => parseFloat(str),
        stringify: stringifyJSON
      }];
      json.scalarFallback = (str) => {
        throw new SyntaxError(`Unresolved plain scalar ${JSON.stringify(str)}`);
      };
      var boolStringify = ({
        value
      }) => value ? resolveSeq.boolOptions.trueStr : resolveSeq.boolOptions.falseStr;
      var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
      function intResolve(sign, src, radix) {
        let str = src.replace(/_/g, "");
        if (resolveSeq.intOptions.asBigInt) {
          switch (radix) {
            case 2:
              str = `0b${str}`;
              break;
            case 8:
              str = `0o${str}`;
              break;
            case 16:
              str = `0x${str}`;
              break;
          }
          const n2 = BigInt(str);
          return sign === "-" ? BigInt(-1) * n2 : n2;
        }
        const n = parseInt(str, radix);
        return sign === "-" ? -1 * n : n;
      }
      function intStringify(node, radix, prefix) {
        const {
          value
        } = node;
        if (intIdentify(value)) {
          const str = value.toString(radix);
          return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
        }
        return resolveSeq.stringifyNumber(node);
      }
      var yaml11 = failsafe.concat([{
        identify: (value) => value == null,
        createNode: (schema, value, ctx) => ctx.wrapScalars ? new resolveSeq.Scalar(null) : null,
        default: true,
        tag: "tag:yaml.org,2002:null",
        test: /^(?:~|[Nn]ull|NULL)?$/,
        resolve: () => null,
        options: resolveSeq.nullOptions,
        stringify: () => resolveSeq.nullOptions.nullStr
      }, {
        identify: (value) => typeof value === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
        resolve: () => true,
        options: resolveSeq.boolOptions,
        stringify: boolStringify
      }, {
        identify: (value) => typeof value === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/i,
        resolve: () => false,
        options: resolveSeq.boolOptions,
        stringify: boolStringify
      }, {
        identify: intIdentify,
        default: true,
        tag: "tag:yaml.org,2002:int",
        format: "BIN",
        test: /^([-+]?)0b([0-1_]+)$/,
        resolve: (str, sign, bin) => intResolve(sign, bin, 2),
        stringify: (node) => intStringify(node, 2, "0b")
      }, {
        identify: intIdentify,
        default: true,
        tag: "tag:yaml.org,2002:int",
        format: "OCT",
        test: /^([-+]?)0([0-7_]+)$/,
        resolve: (str, sign, oct) => intResolve(sign, oct, 8),
        stringify: (node) => intStringify(node, 8, "0")
      }, {
        identify: intIdentify,
        default: true,
        tag: "tag:yaml.org,2002:int",
        test: /^([-+]?)([0-9][0-9_]*)$/,
        resolve: (str, sign, abs) => intResolve(sign, abs, 10),
        stringify: resolveSeq.stringifyNumber
      }, {
        identify: intIdentify,
        default: true,
        tag: "tag:yaml.org,2002:int",
        format: "HEX",
        test: /^([-+]?)0x([0-9a-fA-F_]+)$/,
        resolve: (str, sign, hex) => intResolve(sign, hex, 16),
        stringify: (node) => intStringify(node, 16, "0x")
      }, {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^(?:[-+]?\.inf|(\.nan))$/i,
        resolve: (str, nan) => nan ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
        stringify: resolveSeq.stringifyNumber
      }, {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        format: "EXP",
        test: /^[-+]?([0-9][0-9_]*)?(\.[0-9_]*)?[eE][-+]?[0-9]+$/,
        resolve: (str) => parseFloat(str.replace(/_/g, "")),
        stringify: ({
          value
        }) => Number(value).toExponential()
      }, {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^[-+]?(?:[0-9][0-9_]*)?\.([0-9_]*)$/,
        resolve(str, frac) {
          const node = new resolveSeq.Scalar(parseFloat(str.replace(/_/g, "")));
          if (frac) {
            const f = frac.replace(/_/g, "");
            if (f[f.length - 1] === "0")
              node.minFractionDigits = f.length;
          }
          return node;
        },
        stringify: resolveSeq.stringifyNumber
      }], warnings.binary, warnings.omap, warnings.pairs, warnings.set, warnings.intTime, warnings.floatTime, warnings.timestamp);
      var schemas = {
        core,
        failsafe,
        json,
        yaml11
      };
      var tags = {
        binary: warnings.binary,
        bool: boolObj,
        float: floatObj,
        floatExp: expObj,
        floatNaN: nanObj,
        floatTime: warnings.floatTime,
        int: intObj,
        intHex: hexObj,
        intOct: octObj,
        intTime: warnings.intTime,
        map,
        null: nullObj,
        omap: warnings.omap,
        pairs: warnings.pairs,
        seq,
        set: warnings.set,
        timestamp: warnings.timestamp
      };
      function findTagObject(value, tagName, tags2) {
        if (tagName) {
          const match = tags2.filter((t) => t.tag === tagName);
          const tagObj = match.find((t) => !t.format) || match[0];
          if (!tagObj)
            throw new Error(`Tag ${tagName} not found`);
          return tagObj;
        }
        return tags2.find((t) => (t.identify && t.identify(value) || t.class && value instanceof t.class) && !t.format);
      }
      function createNode(value, tagName, ctx) {
        if (value instanceof resolveSeq.Node)
          return value;
        const {
          defaultPrefix,
          onTagObj,
          prevObjects,
          schema,
          wrapScalars
        } = ctx;
        if (tagName && tagName.startsWith("!!"))
          tagName = defaultPrefix + tagName.slice(2);
        let tagObj = findTagObject(value, tagName, schema.tags);
        if (!tagObj) {
          if (typeof value.toJSON === "function")
            value = value.toJSON();
          if (!value || typeof value !== "object")
            return wrapScalars ? new resolveSeq.Scalar(value) : value;
          tagObj = value instanceof Map ? map : value[Symbol.iterator] ? seq : map;
        }
        if (onTagObj) {
          onTagObj(tagObj);
          delete ctx.onTagObj;
        }
        const obj = {
          value: void 0,
          node: void 0
        };
        if (value && typeof value === "object" && prevObjects) {
          const prev = prevObjects.get(value);
          if (prev) {
            const alias = new resolveSeq.Alias(prev);
            ctx.aliasNodes.push(alias);
            return alias;
          }
          obj.value = value;
          prevObjects.set(value, obj);
        }
        obj.node = tagObj.createNode ? tagObj.createNode(ctx.schema, value, ctx) : wrapScalars ? new resolveSeq.Scalar(value) : value;
        if (tagName && obj.node instanceof resolveSeq.Node)
          obj.node.tag = tagName;
        return obj.node;
      }
      function getSchemaTags(schemas2, knownTags, customTags, schemaId) {
        let tags2 = schemas2[schemaId.replace(/\W/g, "")];
        if (!tags2) {
          const keys = Object.keys(schemas2).map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown schema "${schemaId}"; use one of ${keys}`);
        }
        if (Array.isArray(customTags)) {
          for (const tag of customTags)
            tags2 = tags2.concat(tag);
        } else if (typeof customTags === "function") {
          tags2 = customTags(tags2.slice());
        }
        for (let i = 0; i < tags2.length; ++i) {
          const tag = tags2[i];
          if (typeof tag === "string") {
            const tagObj = knownTags[tag];
            if (!tagObj) {
              const keys = Object.keys(knownTags).map((key) => JSON.stringify(key)).join(", ");
              throw new Error(`Unknown custom tag "${tag}"; use one of ${keys}`);
            }
            tags2[i] = tagObj;
          }
        }
        return tags2;
      }
      var sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
      var Schema = class {
        constructor({
          customTags,
          merge,
          schema,
          sortMapEntries,
          tags: deprecatedCustomTags
        }) {
          this.merge = !!merge;
          this.name = schema;
          this.sortMapEntries = sortMapEntries === true ? sortMapEntriesByKey : sortMapEntries || null;
          if (!customTags && deprecatedCustomTags)
            warnings.warnOptionDeprecation("tags", "customTags");
          this.tags = getSchemaTags(schemas, tags, customTags || deprecatedCustomTags, schema);
        }
        createNode(value, wrapScalars, tagName, ctx) {
          const baseCtx = {
            defaultPrefix: Schema.defaultPrefix,
            schema: this,
            wrapScalars
          };
          const createCtx = ctx ? Object.assign(ctx, baseCtx) : baseCtx;
          return createNode(value, tagName, createCtx);
        }
        createPair(key, value, ctx) {
          if (!ctx)
            ctx = {
              wrapScalars: true
            };
          const k = this.createNode(key, ctx.wrapScalars, null, ctx);
          const v = this.createNode(value, ctx.wrapScalars, null, ctx);
          return new resolveSeq.Pair(k, v);
        }
      };
      PlainValue._defineProperty(Schema, "defaultPrefix", PlainValue.defaultTagPrefix);
      PlainValue._defineProperty(Schema, "defaultTags", PlainValue.defaultTags);
      exports.Schema = Schema;
    }
  });

  // node_modules/yaml/dist/types.js
  var require_types3 = __commonJS({
    "node_modules/yaml/dist/types.js"(exports) {
      "use strict";
      var resolveSeq = require_resolveSeq_d03cb037();
      var Schema = require_Schema_88e323a7();
      require_PlainValue_ec8e588e();
      require_warnings_1000a372();
      exports.Alias = resolveSeq.Alias;
      exports.Collection = resolveSeq.Collection;
      exports.Merge = resolveSeq.Merge;
      exports.Node = resolveSeq.Node;
      exports.Pair = resolveSeq.Pair;
      exports.Scalar = resolveSeq.Scalar;
      exports.YAMLMap = resolveSeq.YAMLMap;
      exports.YAMLSeq = resolveSeq.YAMLSeq;
      exports.binaryOptions = resolveSeq.binaryOptions;
      exports.boolOptions = resolveSeq.boolOptions;
      exports.intOptions = resolveSeq.intOptions;
      exports.nullOptions = resolveSeq.nullOptions;
      exports.strOptions = resolveSeq.strOptions;
      exports.Schema = Schema.Schema;
    }
  });

  // node_modules/yaml/types.js
  var require_types4 = __commonJS({
    "node_modules/yaml/types.js"(exports) {
      var types = require_types3();
      exports.binaryOptions = types.binaryOptions;
      exports.boolOptions = types.boolOptions;
      exports.intOptions = types.intOptions;
      exports.nullOptions = types.nullOptions;
      exports.strOptions = types.strOptions;
      exports.Schema = types.Schema;
      exports.Alias = types.Alias;
      exports.Collection = types.Collection;
      exports.Merge = types.Merge;
      exports.Node = types.Node;
      exports.Pair = types.Pair;
      exports.Scalar = types.Scalar;
      exports.YAMLMap = types.YAMLMap;
      exports.YAMLSeq = types.YAMLSeq;
    }
  });

  // src/lib/renderers/yaml.js
  var require_yaml = __commonJS({
    "src/lib/renderers/yaml.js"(exports, module) {
      var yaml = require_yaml();
      var { YAMLMap, YAMLSeq } = require_types4();
      var optionAPI = require_option();
      function getIn(obj, path) {
        return path.reduce((v, k) => k in v ? v[k] : {}, obj);
      }
      function addComments(context, path, commentNode, iterNode = commentNode) {
        const { title, description, comment } = getIn(context, path);
        const lines = [];
        if (optionAPI("renderTitle") && title) {
          lines.push(` ${title}`, "");
        }
        if (optionAPI("renderDescription") && description) {
          lines.push(` ${description}`);
        }
        if (optionAPI("renderComment") && comment) {
          lines.push(` ${comment}`);
        }
        commentNode.commentBefore = lines.join("\n");
        if (iterNode instanceof YAMLMap) {
          iterNode.items.forEach((n) => {
            addComments(context, [...path, "items", n.key.value], n.key, n.value);
          });
        } else if (iterNode instanceof YAMLSeq) {
          iterNode.items.forEach((n, i) => {
            addComments(context, [...path, "items", i], n);
          });
        }
      }
      function renderYAML({ value, context }) {
        const nodes = yaml.createNode(value);
        addComments(context, [], nodes);
        const doc = new yaml.Document();
        doc.contents = nodes;
        return doc.toString();
      }
      var yaml_default = renderYAML;
      module.exports = yaml_default;
    }
  });

  // src/lib/renderers/index.js
  var require_renderers = __commonJS({
    "src/lib/renderers/index.js"(exports, module) {
      var renderJS = require_js();
      var renderYAML = require_yaml();
      Object.assign(module.exports, { renderJS, renderYAML });
    }
  });

  // src/lib/index.js
  var require_lib3 = __commonJS({
    "src/lib/index.js"(exports, module) {
      var { getDependencies } = require_vendor();
      var Container = require_Container();
      var format = require_format();
      var option = require_option();
      var env = require_constants();
      var random = require_random();
      var utils = require_utils();
      var run = require_run();
      var { renderJS, renderYAML } = require_renderers();
      var container = new Container();
      function setupKeywords() {
        container.define("autoIncrement", function autoIncrement(value, schema) {
          if (!this.offset) {
            const min = schema.minimum || 1;
            const max = min + env.MAX_NUMBER;
            const offset = value.initialOffset || schema.initialOffset;
            this.offset = offset || random.number(min, max);
          }
          if (value === true) {
            return this.offset++;
          }
          return schema;
        });
        container.define("sequentialDate", function sequentialDate(value, schema) {
          if (!this.now) {
            this.now = random.date();
          }
          if (value) {
            schema = this.now.toISOString();
            value = value === true ? "days" : value;
            if (["seconds", "minutes", "hours", "days", "weeks", "months", "years"].indexOf(value) === -1) {
              throw new Error(`Unsupported increment by ${utils.short(value)}`);
            }
            this.now.setTime(this.now.getTime() + random.date(value));
          }
          return schema;
        });
      }
      function getRefs(refs, schema) {
        let $refs = {};
        if (Array.isArray(refs)) {
          refs.forEach((_schema) => {
            $refs[_schema.$id || _schema.id] = _schema;
          });
        } else {
          $refs = refs || {};
        }
        function walk(obj) {
          if (!obj || typeof obj !== "object")
            return;
          if (Array.isArray(obj))
            return obj.forEach(walk);
          const _id = obj.$id || obj.id;
          if (typeof _id === "string" && !$refs[_id]) {
            $refs[_id] = obj;
          }
          Object.keys(obj).forEach((key) => {
            walk(obj[key]);
          });
        }
        walk(refs);
        walk(schema);
        return $refs;
      }
      var jsf = (schema, refs, cwd) => {
        console.log("[json-schema-faker] calling JsonSchemaFaker() is deprecated, call either .generate() or .resolve()");
        if (cwd) {
          console.log("[json-schema-faker] references are only supported by calling .resolve()");
        }
        return jsf.generate(schema, refs);
      };
      jsf.generateWithContext = (schema, refs) => {
        const $refs = getRefs(refs, schema);
        return run($refs, schema, container, true);
      };
      jsf.generate = (schema, refs) => renderJS(jsf.generateWithContext(schema, refs));
      jsf.generateYAML = (schema, refs) => renderYAML(jsf.generateWithContext(schema, refs));
      jsf.resolveWithContext = (schema, refs, cwd) => {
        if (typeof refs === "string") {
          cwd = refs;
          refs = {};
        }
        cwd = cwd || (typeof process !== "undefined" ? process.cwd() : "");
        cwd = `${cwd.replace(/\/+$/, "")}/`;
        const $refs = getRefs(refs, schema);
        const fixedRefs = {
          order: 1,
          canRead(file) {
            const key = file.url.replace("/:", ":");
            return $refs[key] || $refs[key.split("/").pop()];
          },
          read(file, callback) {
            try {
              callback(null, this.canRead(file));
            } catch (e) {
              callback(e);
            }
          }
        };
        const { $RefParser } = getDependencies();
        return $RefParser.bundle(cwd, schema, {
          resolve: {
            file: { order: 100 },
            http: { order: 200 },
            fixedRefs
          },
          dereference: {
            circular: "ignore"
          }
        }).then((sub) => run($refs, sub, container)).catch((e) => {
          throw new Error(`Error while resolving schema (${e.message})`);
        });
      };
      jsf.resolve = (schema, refs, cwd) => jsf.resolveWithContext(schema, refs, cwd).then(renderJS);
      jsf.resolveYAML = (schema, refs, cwd) => jsf.resolveWithContext(schema, refs, cwd).then(renderYAML);
      setupKeywords();
      jsf.format = format;
      jsf.option = option;
      jsf.random = random;
      jsf.extend = (name, cb) => {
        container.extend(name, cb);
        return jsf;
      };
      jsf.define = (name, cb) => {
        container.define(name, cb);
        return jsf;
      };
      jsf.reset = (name) => {
        container.reset(name);
        setupKeywords();
        return jsf;
      };
      jsf.locate = (name) => {
        return container.get(name);
      };
      var VERSION = "0.5.0-rcv.35";
      if (typeof VERSION !== "undefined") {
        jsf.VERSION = VERSION;
      }
      var lib_default = jsf;
      module.exports = lib_default;
    }
  });

  // src/main.iife.js
  var require_main_iife = __commonJS({
    "src/main.iife.js"(exports, module) {
      var { setDependencies } = require_vendor();
      var JSONSchemaFaker = require_lib3();
      if (typeof window !== "undefined") {
        setDependencies(__spreadProps(__spreadValues({}, window.JSONPath), {
          $RefParser: window.$RefParser
        }));
        window.JSONSchemaFaker = JSONSchemaFaker;
      }
      module.exports = JSONSchemaFaker;
    }
  });
  return require_main_iife();
})();
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.JSONSchemaFaker = factory();
  }
}(typeof self !== 'undefined' ? self : this, () => JSONSchemaFaker));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL3ZlbmRvci5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY2xhc3MvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NsYXNzL1JlZ2lzdHJ5LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9hcGkvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2FwaS9kZWZhdWx0cy5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY2xhc3MvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NsYXNzL09wdGlvblJlZ2lzdHJ5LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9hcGkvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2FwaS9vcHRpb24uanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvY29uc3RhbnRzLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL3JldC9saWIvdHlwZXMuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMvcmV0L2xpYi9zZXRzLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL3JldC9saWIvdXRpbC5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL25vZGVfbW9kdWxlcy9yZXQvbGliL3Bvc2l0aW9ucy5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL25vZGVfbW9kdWxlcy9yZXQvbGliL2luZGV4LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL2RyYW5nZS9saWIvaW5kZXguanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMvcmFuZGV4cC9saWIvcmFuZGV4cC5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS9yYW5kb20uanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvdXRpbHMuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NsYXNzL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9jbGFzcy9Db250YWluZXIuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2FwaS9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvYXBpL2Zvcm1hdC5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS9lcnJvci5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvY29yZS9pbmZlci5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9ib29sZWFuLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi90eXBlcy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvYm9vbGVhbi5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9udWxsLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi90eXBlcy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvbnVsbC5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL3R5cGVzL2FycmF5LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi90eXBlcy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvbnVtYmVyLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi90eXBlcy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvaW50ZWdlci5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy93b3Jkcy5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL3R5cGVzL29iamVjdC5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy90aHVuay5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9pcHY0LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9nZW5lcmF0b3JzL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9nZW5lcmF0b3JzL2RhdGVUaW1lLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9nZW5lcmF0b3JzL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9nZW5lcmF0b3JzL2RhdGUuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2dlbmVyYXRvcnMvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2dlbmVyYXRvcnMvdGltZS5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvZ2VuZXJhdG9ycy9jb3JlRm9ybWF0LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi90eXBlcy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvc3RyaW5nLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi90eXBlcy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvdHlwZXMvaW5kZXguanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvdHJhdmVyc2UuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL2NvcmUvYnVpbGRSZXNvbHZlU2NoZW1hLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9jb3JlL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9jb3JlL3J1bi5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvcmVuZGVyZXJzL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9yZW5kZXJlcnMvanMuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMveWFtbC9kaXN0L1BsYWluVmFsdWUtZWM4ZTU4OGUuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMveWFtbC9kaXN0L3Jlc29sdmVTZXEtZDAzY2IwMzcuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMveWFtbC9kaXN0L3dhcm5pbmdzLTEwMDBhMzcyLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL3lhbWwvZGlzdC9TY2hlbWEtODhlMzIzYTcuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMveWFtbC9kaXN0L3R5cGVzLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL3lhbWwvdHlwZXMuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL3JlbmRlcmVycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvcmVuZGVyZXJzL3lhbWwuanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbGliL3JlbmRlcmVycy9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvcmVuZGVyZXJzL2luZGV4LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL2xpYi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy9saWIvaW5kZXguanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvbWFpbi5paWZlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERFUEVOREVOQ0lFUyA9IHt9O1xuXG5leHBvcnQgY29uc3QgZ2V0RGVwZW5kZW5jaWVzID0gKCkgPT4ge1xuICByZXR1cm4gREVQRU5ERU5DSUVTO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldERlcGVuZGVuY2llcyA9IHZhbHVlID0+IHtcbiAgT2JqZWN0LmFzc2lnbihERVBFTkRFTkNJRVMsIHZhbHVlKTtcbn07XG4iLCIvKipcbiAqIFRoaXMgY2xhc3MgZGVmaW5lcyBhIHJlZ2lzdHJ5IGZvciBjdXN0b20gZm9ybWF0cyB1c2VkIHdpdGhpbiBKU0YuXG4gKi9cbmNsYXNzIFJlZ2lzdHJ5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gZW1wdHkgYnkgZGVmYXVsdFxuICAgIHRoaXMuZGF0YSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVucmVnaXN0ZXJzIGN1c3RvbSBmb3JtYXQocylcbiAgICogQHBhcmFtIG5hbWVcbiAgICovXG4gIHVucmVnaXN0ZXIobmFtZSkge1xuICAgIGlmICghbmFtZSkge1xuICAgICAgdGhpcy5kYXRhID0ge307XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmRhdGFbbmFtZV07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjdXN0b20gZm9ybWF0XG4gICAqL1xuICByZWdpc3RlcihuYW1lLCBjYWxsYmFjaykge1xuICAgIHRoaXMuZGF0YVtuYW1lXSA9IGNhbGxiYWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIG1hbnkgZm9ybWF0cyBhdCBvbmUgc2hvdFxuICAgKi9cbiAgcmVnaXN0ZXJNYW55KGZvcm1hdHMpIHtcbiAgICBPYmplY3Qua2V5cyhmb3JtYXRzKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgdGhpcy5kYXRhW25hbWVdID0gZm9ybWF0c1tuYW1lXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGVsZW1lbnQgYnkgcmVnaXN0cnkga2V5XG4gICAqL1xuICBnZXQobmFtZSkge1xuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMuZGF0YVtuYW1lXTtcblxuICAgIHJldHVybiBmb3JtYXQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2hvbGUgcmVnaXN0cnkgY29udGVudFxuICAgKi9cbiAgbGlzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlZ2lzdHJ5O1xuIiwiY29uc3QgZGVmYXVsdHMgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7XG5cbmRlZmF1bHRzLmRlZmF1bHRJbnZhbGlkVHlwZVByb2R1Y3QgPSB1bmRlZmluZWQ7XG5kZWZhdWx0cy5kZWZhdWx0UmFuZEV4cE1heCA9IDEwO1xuXG5kZWZhdWx0cy5pZ25vcmVQcm9wZXJ0aWVzID0gW107XG5kZWZhdWx0cy5pZ25vcmVNaXNzaW5nUmVmcyA9IGZhbHNlO1xuZGVmYXVsdHMuZmFpbE9uSW52YWxpZFR5cGVzID0gdHJ1ZTtcbmRlZmF1bHRzLmZhaWxPbkludmFsaWRGb3JtYXQgPSB0cnVlO1xuXG5kZWZhdWx0cy5hbHdheXNGYWtlT3B0aW9uYWxzID0gZmFsc2U7XG5kZWZhdWx0cy5vcHRpb25hbHNQcm9iYWJpbGl0eSA9IG51bGw7XG5kZWZhdWx0cy5maXhlZFByb2JhYmlsaXRpZXMgPSBmYWxzZTtcbmRlZmF1bHRzLnVzZUV4YW1wbGVzVmFsdWUgPSBmYWxzZTtcbmRlZmF1bHRzLnVzZURlZmF1bHRWYWx1ZSA9IGZhbHNlO1xuZGVmYXVsdHMucmVxdWlyZWRPbmx5ID0gZmFsc2U7XG5cbmRlZmF1bHRzLm1pbkl0ZW1zID0gMDtcbmRlZmF1bHRzLm1heEl0ZW1zID0gbnVsbDtcbmRlZmF1bHRzLm1pbkxlbmd0aCA9IDA7XG5kZWZhdWx0cy5tYXhMZW5ndGggPSBudWxsO1xuXG5kZWZhdWx0cy5yZXNvbHZlSnNvblBhdGggPSBmYWxzZTtcbmRlZmF1bHRzLnJldXNlUHJvcGVydGllcyA9IGZhbHNlO1xuZGVmYXVsdHMuZmlsbFByb3BlcnRpZXMgPSB0cnVlO1xuZGVmYXVsdHMucmVwbGFjZUVtcHR5QnlSYW5kb21WYWx1ZSA9IGZhbHNlO1xuXG5kZWZhdWx0cy5yYW5kb20gPSBNYXRoLnJhbmRvbTtcblxuZGVmYXVsdHMucmVuZGVyVGl0bGUgPSB0cnVlO1xuZGVmYXVsdHMucmVuZGVyRGVzY3JpcHRpb24gPSB0cnVlO1xuZGVmYXVsdHMucmVuZGVyQ29tbWVudCA9IGZhbHNlO1xuIiwiaW1wb3J0IFJlZ2lzdHJ5IGZyb20gJy4vUmVnaXN0cnknO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2FwaS9kZWZhdWx0cyc7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBkZWZpbmVzIGEgcmVnaXN0cnkgZm9yIGN1c3RvbSBzZXR0aW5ncyB1c2VkIHdpdGhpbiBKU0YuXG4gKi9cbmNsYXNzIE9wdGlvblJlZ2lzdHJ5IGV4dGVuZHMgUmVnaXN0cnkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZGF0YSA9IHsgLi4uZGVmYXVsdHMgfTtcbiAgICB0aGlzLl9kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICB9XG5cbiAgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7IC4uLnRoaXMuX2RlZmF1bHRzIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT3B0aW9uUmVnaXN0cnk7XG4iLCJpbXBvcnQgT3B0aW9uUmVnaXN0cnkgZnJvbSAnLi4vY2xhc3MvT3B0aW9uUmVnaXN0cnknO1xuXG4vLyBpbnN0YW50aWF0ZVxuY29uc3QgcmVnaXN0cnkgPSBuZXcgT3B0aW9uUmVnaXN0cnkoKTtcblxuLyoqXG4gKiBDdXN0b20gb3B0aW9uIEFQSVxuICpcbiAqIEBwYXJhbSBuYW1lT3JPcHRpb25NYXBcbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIG9wdGlvbkFQSShuYW1lT3JPcHRpb25NYXAsIG9wdGlvbmFsVmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBuYW1lT3JPcHRpb25NYXAgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25hbFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHJlZ2lzdHJ5LnJlZ2lzdGVyKG5hbWVPck9wdGlvbk1hcCwgb3B0aW9uYWxWYWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZ2lzdHJ5LmdldChuYW1lT3JPcHRpb25NYXApO1xuICB9XG5cbiAgcmV0dXJuIHJlZ2lzdHJ5LnJlZ2lzdGVyTWFueShuYW1lT3JPcHRpb25NYXApO1xufVxuXG5vcHRpb25BUEkuZ2V0RGVmYXVsdHMgPSAoKSA9PiByZWdpc3RyeS5kZWZhdWx0cztcblxuZXhwb3J0IGRlZmF1bHQgb3B0aW9uQVBJO1xuIiwiY29uc3QgQUxMT1dFRF9UWVBFUyA9IFsnaW50ZWdlcicsICdudW1iZXInLCAnc3RyaW5nJywgJ2Jvb2xlYW4nXTtcbmNvbnN0IFNDQUxBUl9UWVBFUyA9IEFMTE9XRURfVFlQRVMuY29uY2F0KFsnbnVsbCddKTtcbmNvbnN0IEFMTF9UWVBFUyA9IFsnYXJyYXknLCAnb2JqZWN0J10uY29uY2F0KFNDQUxBUl9UWVBFUyk7XG5cbmNvbnN0IE1PU1RfTkVBUl9EQVRFVElNRSA9IDI1MjQ2MDgwMDAwMDA7XG5cbmNvbnN0IE1JTl9JTlRFR0VSID0gLTEwMDAwMDAwMDtcbmNvbnN0IE1BWF9JTlRFR0VSID0gMTAwMDAwMDAwO1xuXG5jb25zdCBNSU5fTlVNQkVSID0gLTEwMDtcbmNvbnN0IE1BWF9OVU1CRVIgPSAxMDA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQUxMT1dFRF9UWVBFUyxcbiAgU0NBTEFSX1RZUEVTLFxuICBBTExfVFlQRVMsXG4gIE1JTl9OVU1CRVIsXG4gIE1BWF9OVU1CRVIsXG4gIE1JTl9JTlRFR0VSLFxuICBNQVhfSU5URUdFUixcbiAgTU9TVF9ORUFSX0RBVEVUSU1FLFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBST09UICAgICAgIDogMCxcbiAgR1JPVVAgICAgICA6IDEsXG4gIFBPU0lUSU9OICAgOiAyLFxuICBTRVQgICAgICAgIDogMyxcbiAgUkFOR0UgICAgICA6IDQsXG4gIFJFUEVUSVRJT04gOiA1LFxuICBSRUZFUkVOQ0UgIDogNixcbiAgQ0hBUiAgICAgICA6IDcsXG59O1xuIiwiY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyk7XG5cbmNvbnN0IElOVFMgPSAoKSA9PiBbeyB0eXBlOiB0eXBlcy5SQU5HRSAsIGZyb206IDQ4LCB0bzogNTcgfV07XG5cbmNvbnN0IFdPUkRTID0gKCkgPT4ge1xuICByZXR1cm4gW1xuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDk1IH0sXG4gICAgeyB0eXBlOiB0eXBlcy5SQU5HRSwgZnJvbTogOTcsIHRvOiAxMjIgfSxcbiAgICB7IHR5cGU6IHR5cGVzLlJBTkdFLCBmcm9tOiA2NSwgdG86IDkwIH1cbiAgXS5jb25jYXQoSU5UUygpKTtcbn07XG5cbmNvbnN0IFdISVRFU1BBQ0UgPSAoKSA9PiB7XG4gIHJldHVybiBbXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogOSB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDEwIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogMTEgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiAxMiB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDEzIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogMzIgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiAxNjAgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiA1NzYwIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5SQU5HRSwgZnJvbTogODE5MiwgdG86IDgyMDIgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiA4MjMyIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogODIzMyB9LFxuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDgyMzkgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiA4Mjg3IH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogMTIyODggfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiA2NTI3OSB9XG4gIF07XG59O1xuXG5jb25zdCBOT1RBTllDSEFSID0gKCkgPT4ge1xuICByZXR1cm4gW1xuICAgIHsgdHlwZTogdHlwZXMuQ0hBUiwgdmFsdWU6IDEwIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogMTMgfSxcbiAgICB7IHR5cGU6IHR5cGVzLkNIQVIsIHZhbHVlOiA4MjMyIH0sXG4gICAgeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogODIzMyB9LFxuICBdO1xufTtcblxuLy8gUHJlZGVmaW5lZCBjbGFzcyBvYmplY3RzLlxuZXhwb3J0cy53b3JkcyA9ICgpID0+ICh7IHR5cGU6IHR5cGVzLlNFVCwgc2V0OiBXT1JEUygpLCBub3Q6IGZhbHNlIH0pO1xuZXhwb3J0cy5ub3RXb3JkcyA9ICgpID0+ICh7IHR5cGU6IHR5cGVzLlNFVCwgc2V0OiBXT1JEUygpLCBub3Q6IHRydWUgfSk7XG5leHBvcnRzLmludHMgPSAoKSA9PiAoeyB0eXBlOiB0eXBlcy5TRVQsIHNldDogSU5UUygpLCBub3Q6IGZhbHNlIH0pO1xuZXhwb3J0cy5ub3RJbnRzID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuU0VULCBzZXQ6IElOVFMoKSwgbm90OiB0cnVlIH0pO1xuZXhwb3J0cy53aGl0ZXNwYWNlID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuU0VULCBzZXQ6IFdISVRFU1BBQ0UoKSwgbm90OiBmYWxzZSB9KTtcbmV4cG9ydHMubm90V2hpdGVzcGFjZSA9ICgpID0+ICh7IHR5cGU6IHR5cGVzLlNFVCwgc2V0OiBXSElURVNQQUNFKCksIG5vdDogdHJ1ZSB9KTtcbmV4cG9ydHMuYW55Q2hhciA9ICgpID0+ICh7IHR5cGU6IHR5cGVzLlNFVCwgc2V0OiBOT1RBTllDSEFSKCksIG5vdDogdHJ1ZSB9KTtcbiIsImNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpO1xuY29uc3Qgc2V0cyAgPSByZXF1aXJlKCcuL3NldHMnKTtcblxuXG5jb25zdCBDVFJMID0gJ0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXFxcXV4gPyc7XG5jb25zdCBTTFNIID0geyAnMCc6IDAsICd0JzogOSwgJ24nOiAxMCwgJ3YnOiAxMSwgJ2YnOiAxMiwgJ3InOiAxMyB9O1xuXG4vKipcbiAqIEZpbmRzIGNoYXJhY3RlciByZXByZXNlbnRhdGlvbnMgaW4gc3RyIGFuZCBjb252ZXJ0IGFsbCB0b1xuICogdGhlaXIgcmVzcGVjdGl2ZSBjaGFyYWN0ZXJzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLnN0clRvQ2hhcnMgPSBmdW5jdGlvbihzdHIpIHtcbiAgLyoganNoaW50IG1heGxlbjogZmFsc2UgKi9cbiAgdmFyIGNoYXJzX3JlZ2V4ID0gLyhcXFtcXFxcYlxcXSl8KFxcXFwpP1xcXFwoPzp1KFtBLUYwLTldezR9KXx4KFtBLUYwLTldezJ9KXwoMD9bMC03XXsyfSl8YyhbQEEtWltcXFxcXFxdXj9dKXwoWzB0bnZmcl0pKS9nO1xuICBzdHIgPSBzdHIucmVwbGFjZShjaGFyc19yZWdleCwgZnVuY3Rpb24ocywgYiwgbGJzLCBhMTYsIGIxNiwgYzgsIGRjdHJsLCBlc2xzaCkge1xuICAgIGlmIChsYnMpIHtcbiAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIHZhciBjb2RlID0gYiA/IDggOlxuICAgICAgYTE2ICAgPyBwYXJzZUludChhMTYsIDE2KSA6XG4gICAgICBiMTYgICA/IHBhcnNlSW50KGIxNiwgMTYpIDpcbiAgICAgIGM4ICAgID8gcGFyc2VJbnQoYzgsICAgOCkgOlxuICAgICAgZGN0cmwgPyBDVFJMLmluZGV4T2YoZGN0cmwpIDpcbiAgICAgIFNMU0hbZXNsc2hdO1xuXG4gICAgdmFyIGMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuXG4gICAgLy8gRXNjYXBlIHNwZWNpYWwgcmVnZXggY2hhcmFjdGVycy5cbiAgICBpZiAoL1tbXFxde31eJC58PyorKCldLy50ZXN0KGMpKSB7XG4gICAgICBjID0gJ1xcXFwnICsgYztcbiAgICB9XG5cbiAgICByZXR1cm4gYztcbiAgfSk7XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLyoqXG4gKiB0dXJucyBjbGFzcyBpbnRvIHRva2Vuc1xuICogcmVhZHMgc3RyIHVudGlsIGl0IGVuY291bnRlcnMgYSBdIG5vdCBwcmVjZWVkZWQgYnkgYSBcXFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWdleHBTdHJcbiAqIEByZXR1cm4ge0FycmF5LjxBcnJheS48T2JqZWN0PiwgTnVtYmVyPn1cbiAqL1xuZXhwb3J0cy50b2tlbml6ZUNsYXNzID0gKHN0ciwgcmVnZXhwU3RyKSA9PiB7XG4gIC8qIGpzaGludCBtYXhsZW46IGZhbHNlICovXG4gIHZhciB0b2tlbnMgPSBbXTtcbiAgdmFyIHJlZ2V4cCA9IC9cXFxcKD86KHcpfChkKXwocyl8KFcpfChEKXwoUykpfCgoPzooPzpcXFxcKSguKXwoW15cXF1cXFxcXSkpLSg/OlxcXFwpPyhbXlxcXV0pKXwoXFxdKXwoPzpcXFxcKT8oW15dKS9nO1xuICB2YXIgcnMsIGM7XG5cblxuICB3aGlsZSAoKHJzID0gcmVnZXhwLmV4ZWMoc3RyKSkgIT0gbnVsbCkge1xuICAgIGlmIChyc1sxXSkge1xuICAgICAgdG9rZW5zLnB1c2goc2V0cy53b3JkcygpKTtcblxuICAgIH0gZWxzZSBpZiAocnNbMl0pIHtcbiAgICAgIHRva2Vucy5wdXNoKHNldHMuaW50cygpKTtcblxuICAgIH0gZWxzZSBpZiAocnNbM10pIHtcbiAgICAgIHRva2Vucy5wdXNoKHNldHMud2hpdGVzcGFjZSgpKTtcblxuICAgIH0gZWxzZSBpZiAocnNbNF0pIHtcbiAgICAgIHRva2Vucy5wdXNoKHNldHMubm90V29yZHMoKSk7XG5cbiAgICB9IGVsc2UgaWYgKHJzWzVdKSB7XG4gICAgICB0b2tlbnMucHVzaChzZXRzLm5vdEludHMoKSk7XG5cbiAgICB9IGVsc2UgaWYgKHJzWzZdKSB7XG4gICAgICB0b2tlbnMucHVzaChzZXRzLm5vdFdoaXRlc3BhY2UoKSk7XG5cbiAgICB9IGVsc2UgaWYgKHJzWzddKSB7XG4gICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IHR5cGVzLlJBTkdFLFxuICAgICAgICBmcm9tOiAocnNbOF0gfHwgcnNbOV0pLmNoYXJDb2RlQXQoMCksXG4gICAgICAgIHRvOiByc1sxMF0uY2hhckNvZGVBdCgwKSxcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICgoYyA9IHJzWzEyXSkpIHtcbiAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogdHlwZXMuQ0hBUixcbiAgICAgICAgdmFsdWU6IGMuY2hhckNvZGVBdCgwKSxcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbdG9rZW5zLCByZWdleHAubGFzdEluZGV4XTtcbiAgICB9XG4gIH1cblxuICBleHBvcnRzLmVycm9yKHJlZ2V4cFN0ciwgJ1VudGVybWluYXRlZCBjaGFyYWN0ZXIgY2xhc3MnKTtcbn07XG5cblxuLyoqXG4gKiBTaG9ydGN1dCB0byB0aHJvdyBlcnJvcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJlZ2V4cFxuICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuICovXG5leHBvcnRzLmVycm9yID0gKHJlZ2V4cCwgbXNnKSA9PiB7XG4gIHRocm93IG5ldyBTeW50YXhFcnJvcignSW52YWxpZCByZWd1bGFyIGV4cHJlc3Npb246IC8nICsgcmVnZXhwICsgJy86ICcgKyBtc2cpO1xufTtcbiIsImNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpO1xuZXhwb3J0cy53b3JkQm91bmRhcnkgPSAoKSA9PiAoeyB0eXBlOiB0eXBlcy5QT1NJVElPTiwgdmFsdWU6ICdiJyB9KTtcbmV4cG9ydHMubm9uV29yZEJvdW5kYXJ5ID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuUE9TSVRJT04sIHZhbHVlOiAnQicgfSk7XG5leHBvcnRzLmJlZ2luID0gKCkgPT4gKHsgdHlwZTogdHlwZXMuUE9TSVRJT04sIHZhbHVlOiAnXicgfSk7XG5leHBvcnRzLmVuZCA9ICgpID0+ICh7IHR5cGU6IHR5cGVzLlBPU0lUSU9OLCB2YWx1ZTogJyQnIH0pO1xuIiwiY29uc3QgdXRpbCAgICAgID0gcmVxdWlyZSgnLi91dGlsJyk7XG5jb25zdCB0eXBlcyAgICAgPSByZXF1aXJlKCcuL3R5cGVzJyk7XG5jb25zdCBzZXRzICAgICAgPSByZXF1aXJlKCcuL3NldHMnKTtcbmNvbnN0IHBvc2l0aW9ucyA9IHJlcXVpcmUoJy4vcG9zaXRpb25zJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAocmVnZXhwU3RyKSA9PiB7XG4gIHZhciBpID0gMCwgbCwgYyxcbiAgICBzdGFydCA9IHsgdHlwZTogdHlwZXMuUk9PVCwgc3RhY2s6IFtdfSxcblxuICAgIC8vIEtlZXAgdHJhY2sgb2YgbGFzdCBjbGF1c2UvZ3JvdXAgYW5kIHN0YWNrLlxuICAgIGxhc3RHcm91cCA9IHN0YXJ0LFxuICAgIGxhc3QgPSBzdGFydC5zdGFjayxcbiAgICBncm91cFN0YWNrID0gW107XG5cblxuICB2YXIgcmVwZWF0RXJyID0gKGkpID0+IHtcbiAgICB1dGlsLmVycm9yKHJlZ2V4cFN0ciwgYE5vdGhpbmcgdG8gcmVwZWF0IGF0IGNvbHVtbiAke2kgLSAxfWApO1xuICB9O1xuXG4gIC8vIERlY29kZSBhIGZldyBlc2NhcGVkIGNoYXJhY3RlcnMuXG4gIHZhciBzdHIgPSB1dGlsLnN0clRvQ2hhcnMocmVnZXhwU3RyKTtcbiAgbCA9IHN0ci5sZW5ndGg7XG5cbiAgLy8gSXRlcmF0ZSB0aHJvdWdoIGVhY2ggY2hhcmFjdGVyIGluIHN0cmluZy5cbiAgd2hpbGUgKGkgPCBsKSB7XG4gICAgYyA9IHN0cltpKytdO1xuXG4gICAgc3dpdGNoIChjKSB7XG4gICAgICAvLyBIYW5kbGUgZXNjYXBlZCBjaGFyYWN0ZXJzLCBpbmNsdWVzIGEgZmV3IHNldHMuXG4gICAgICBjYXNlICdcXFxcJzpcbiAgICAgICAgYyA9IHN0cltpKytdO1xuXG4gICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgIGNhc2UgJ2InOlxuICAgICAgICAgICAgbGFzdC5wdXNoKHBvc2l0aW9ucy53b3JkQm91bmRhcnkoKSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ0InOlxuICAgICAgICAgICAgbGFzdC5wdXNoKHBvc2l0aW9ucy5ub25Xb3JkQm91bmRhcnkoKSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ3cnOlxuICAgICAgICAgICAgbGFzdC5wdXNoKHNldHMud29yZHMoKSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ1cnOlxuICAgICAgICAgICAgbGFzdC5wdXNoKHNldHMubm90V29yZHMoKSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgbGFzdC5wdXNoKHNldHMuaW50cygpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgICBsYXN0LnB1c2goc2V0cy5ub3RJbnRzKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgIGxhc3QucHVzaChzZXRzLndoaXRlc3BhY2UoKSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ1MnOlxuICAgICAgICAgICAgbGFzdC5wdXNoKHNldHMubm90V2hpdGVzcGFjZSgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGMgaXMgaW50ZWdlci5cbiAgICAgICAgICAgIC8vIEluIHdoaWNoIGNhc2UgaXQncyBhIHJlZmVyZW5jZS5cbiAgICAgICAgICAgIGlmICgvXFxkLy50ZXN0KGMpKSB7XG4gICAgICAgICAgICAgIGxhc3QucHVzaCh7IHR5cGU6IHR5cGVzLlJFRkVSRU5DRSwgdmFsdWU6IHBhcnNlSW50KGMsIDEwKSB9KTtcblxuICAgICAgICAgICAgLy8gRXNjYXBlZCBjaGFyYWN0ZXIuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsYXN0LnB1c2goeyB0eXBlOiB0eXBlcy5DSEFSLCB2YWx1ZTogYy5jaGFyQ29kZUF0KDApIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cblxuICAgICAgLy8gUG9zaXRpb25hbHMuXG4gICAgICBjYXNlICdeJzpcbiAgICAgICAgbGFzdC5wdXNoKHBvc2l0aW9ucy5iZWdpbigpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJyQnOlxuICAgICAgICBsYXN0LnB1c2gocG9zaXRpb25zLmVuZCgpKTtcbiAgICAgICAgYnJlYWs7XG5cblxuICAgICAgLy8gSGFuZGxlIGN1c3RvbSBzZXRzLlxuICAgICAgY2FzZSAnWyc6XG4gICAgICAgIC8vIENoZWNrIGlmIHRoaXMgY2xhc3MgaXMgJ2FudGknIGkuZS4gW15hYmNdLlxuICAgICAgICB2YXIgbm90O1xuICAgICAgICBpZiAoc3RyW2ldID09PSAnXicpIHtcbiAgICAgICAgICBub3QgPSB0cnVlO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub3QgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBhbGwgdGhlIGNoYXJhY3RlcnMgaW4gY2xhc3MuXG4gICAgICAgIHZhciBjbGFzc1Rva2VucyA9IHV0aWwudG9rZW5pemVDbGFzcyhzdHIuc2xpY2UoaSksIHJlZ2V4cFN0cik7XG5cbiAgICAgICAgLy8gSW5jcmVhc2UgaW5kZXggYnkgbGVuZ3RoIG9mIGNsYXNzLlxuICAgICAgICBpICs9IGNsYXNzVG9rZW5zWzFdO1xuICAgICAgICBsYXN0LnB1c2goe1xuICAgICAgICAgIHR5cGU6IHR5cGVzLlNFVCxcbiAgICAgICAgICBzZXQ6IGNsYXNzVG9rZW5zWzBdLFxuICAgICAgICAgIG5vdCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYnJlYWs7XG5cblxuICAgICAgLy8gQ2xhc3Mgb2YgYW55IGNoYXJhY3RlciBleGNlcHQgXFxuLlxuICAgICAgY2FzZSAnLic6XG4gICAgICAgIGxhc3QucHVzaChzZXRzLmFueUNoYXIoKSk7XG4gICAgICAgIGJyZWFrO1xuXG5cbiAgICAgIC8vIFB1c2ggZ3JvdXAgb250byBzdGFjay5cbiAgICAgIGNhc2UgJygnOlxuICAgICAgICAvLyBDcmVhdGUgZ3JvdXAuXG4gICAgICAgIHZhciBncm91cCA9IHtcbiAgICAgICAgICB0eXBlOiB0eXBlcy5HUk9VUCxcbiAgICAgICAgICBzdGFjazogW10sXG4gICAgICAgICAgcmVtZW1iZXI6IHRydWUsXG4gICAgICAgIH07XG5cbiAgICAgICAgYyA9IHN0cltpXTtcblxuICAgICAgICAvLyBJZiBpZiB0aGlzIGlzIGEgc3BlY2lhbCBraW5kIG9mIGdyb3VwLlxuICAgICAgICBpZiAoYyA9PT0gJz8nKSB7XG4gICAgICAgICAgYyA9IHN0cltpICsgMV07XG4gICAgICAgICAgaSArPSAyO1xuXG4gICAgICAgICAgLy8gTWF0Y2ggaWYgZm9sbG93ZWQgYnkuXG4gICAgICAgICAgaWYgKGMgPT09ICc9Jykge1xuICAgICAgICAgICAgZ3JvdXAuZm9sbG93ZWRCeSA9IHRydWU7XG5cbiAgICAgICAgICAvLyBNYXRjaCBpZiBub3QgZm9sbG93ZWQgYnkuXG4gICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnIScpIHtcbiAgICAgICAgICAgIGdyb3VwLm5vdEZvbGxvd2VkQnkgPSB0cnVlO1xuXG4gICAgICAgICAgfSBlbHNlIGlmIChjICE9PSAnOicpIHtcbiAgICAgICAgICAgIHV0aWwuZXJyb3IocmVnZXhwU3RyLFxuICAgICAgICAgICAgICBgSW52YWxpZCBncm91cCwgY2hhcmFjdGVyICcke2N9J2AgK1xuICAgICAgICAgICAgICBgIGFmdGVyICc/JyBhdCBjb2x1bW4gJHtpIC0gMX1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBncm91cC5yZW1lbWJlciA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5zZXJ0IHN1Ymdyb3VwIGludG8gY3VycmVudCBncm91cCBzdGFjay5cbiAgICAgICAgbGFzdC5wdXNoKGdyb3VwKTtcblxuICAgICAgICAvLyBSZW1lbWJlciB0aGUgY3VycmVudCBncm91cCBmb3Igd2hlbiB0aGUgZ3JvdXAgY2xvc2VzLlxuICAgICAgICBncm91cFN0YWNrLnB1c2gobGFzdEdyb3VwKTtcblxuICAgICAgICAvLyBNYWtlIHRoaXMgbmV3IGdyb3VwIHRoZSBjdXJyZW50IGdyb3VwLlxuICAgICAgICBsYXN0R3JvdXAgPSBncm91cDtcbiAgICAgICAgbGFzdCA9IGdyb3VwLnN0YWNrO1xuICAgICAgICBicmVhaztcblxuXG4gICAgICAvLyBQb3AgZ3JvdXAgb3V0IG9mIHN0YWNrLlxuICAgICAgY2FzZSAnKSc6XG4gICAgICAgIGlmIChncm91cFN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHV0aWwuZXJyb3IocmVnZXhwU3RyLCBgVW5tYXRjaGVkICkgYXQgY29sdW1uICR7aSAtIDF9YCk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdEdyb3VwID0gZ3JvdXBTdGFjay5wb3AoKTtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGlzIGdyb3VwIGhhcyBhIFBJUEUuXG4gICAgICAgIC8vIFRvIGdldCBiYWNrIHRoZSBjb3JyZWN0IGxhc3Qgc3RhY2suXG4gICAgICAgIGxhc3QgPSBsYXN0R3JvdXAub3B0aW9ucyA/XG4gICAgICAgICAgbGFzdEdyb3VwLm9wdGlvbnNbbGFzdEdyb3VwLm9wdGlvbnMubGVuZ3RoIC0gMV0gOiBsYXN0R3JvdXAuc3RhY2s7XG4gICAgICAgIGJyZWFrO1xuXG5cbiAgICAgIC8vIFVzZSBwaXBlIGNoYXJhY3RlciB0byBnaXZlIG1vcmUgY2hvaWNlcy5cbiAgICAgIGNhc2UgJ3wnOlxuICAgICAgICAvLyBDcmVhdGUgYXJyYXkgd2hlcmUgb3B0aW9ucyBhcmUgaWYgdGhpcyBpcyB0aGUgZmlyc3QgUElQRVxuICAgICAgICAvLyBpbiB0aGlzIGNsYXVzZS5cbiAgICAgICAgaWYgKCFsYXN0R3JvdXAub3B0aW9ucykge1xuICAgICAgICAgIGxhc3RHcm91cC5vcHRpb25zID0gW2xhc3RHcm91cC5zdGFja107XG4gICAgICAgICAgZGVsZXRlIGxhc3RHcm91cC5zdGFjaztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBzdGFjayBhbmQgYWRkIHRvIG9wdGlvbnMgZm9yIHJlc3Qgb2YgY2xhdXNlLlxuICAgICAgICB2YXIgc3RhY2sgPSBbXTtcbiAgICAgICAgbGFzdEdyb3VwLm9wdGlvbnMucHVzaChzdGFjayk7XG4gICAgICAgIGxhc3QgPSBzdGFjaztcbiAgICAgICAgYnJlYWs7XG5cblxuICAgICAgLy8gUmVwZXRpdGlvbi5cbiAgICAgIC8vIEZvciBldmVyeSByZXBldGl0aW9uLCByZW1vdmUgbGFzdCBlbGVtZW50IGZyb20gbGFzdCBzdGFja1xuICAgICAgLy8gdGhlbiBpbnNlcnQgYmFjayBhIFJBTkdFIG9iamVjdC5cbiAgICAgIC8vIFRoaXMgZGVzaWduIGlzIGNob3NlbiBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG1vcmUgdGhhblxuICAgICAgLy8gb25lIHJlcGV0aXRpb24gc3ltYm9scyBpbiBhIHJlZ2V4IGkuZS4gYGE/K3syLDN9YC5cbiAgICAgIGNhc2UgJ3snOlxuICAgICAgICB2YXIgcnMgPSAvXihcXGQrKSgsKFxcZCspPyk/XFx9Ly5leGVjKHN0ci5zbGljZShpKSksIG1pbiwgbWF4O1xuICAgICAgICBpZiAocnMgIT09IG51bGwpIHtcbiAgICAgICAgICBpZiAobGFzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJlcGVhdEVycihpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWluID0gcGFyc2VJbnQocnNbMV0sIDEwKTtcbiAgICAgICAgICBtYXggPSByc1syXSA/IHJzWzNdID8gcGFyc2VJbnQocnNbM10sIDEwKSA6IEluZmluaXR5IDogbWluO1xuICAgICAgICAgIGkgKz0gcnNbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgbGFzdC5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGVzLlJFUEVUSVRJT04sXG4gICAgICAgICAgICBtaW4sXG4gICAgICAgICAgICBtYXgsXG4gICAgICAgICAgICB2YWx1ZTogbGFzdC5wb3AoKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsYXN0LnB1c2goe1xuICAgICAgICAgICAgdHlwZTogdHlwZXMuQ0hBUixcbiAgICAgICAgICAgIHZhbHVlOiAxMjMsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJz8nOlxuICAgICAgICBpZiAobGFzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXBlYXRFcnIoaSk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdC5wdXNoKHtcbiAgICAgICAgICB0eXBlOiB0eXBlcy5SRVBFVElUSU9OLFxuICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICBtYXg6IDEsXG4gICAgICAgICAgdmFsdWU6IGxhc3QucG9wKCksXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnKyc6XG4gICAgICAgIGlmIChsYXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJlcGVhdEVycihpKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0LnB1c2goe1xuICAgICAgICAgIHR5cGU6IHR5cGVzLlJFUEVUSVRJT04sXG4gICAgICAgICAgbWluOiAxLFxuICAgICAgICAgIG1heDogSW5maW5pdHksXG4gICAgICAgICAgdmFsdWU6IGxhc3QucG9wKCksXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnKic6XG4gICAgICAgIGlmIChsYXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJlcGVhdEVycihpKTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0LnB1c2goe1xuICAgICAgICAgIHR5cGU6IHR5cGVzLlJFUEVUSVRJT04sXG4gICAgICAgICAgbWluOiAwLFxuICAgICAgICAgIG1heDogSW5maW5pdHksXG4gICAgICAgICAgdmFsdWU6IGxhc3QucG9wKCksXG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuXG4gICAgICAvLyBEZWZhdWx0IGlzIGEgY2hhcmFjdGVyIHRoYXQgaXMgbm90IGBcXFtdKCl7fT8rKl4kYC5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxhc3QucHVzaCh7XG4gICAgICAgICAgdHlwZTogdHlwZXMuQ0hBUixcbiAgICAgICAgICB2YWx1ZTogYy5jaGFyQ29kZUF0KDApLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFueSBncm91cHMgaGF2ZSBub3QgYmVlbiBjbG9zZWQuXG4gIGlmIChncm91cFN0YWNrLmxlbmd0aCAhPT0gMCkge1xuICAgIHV0aWwuZXJyb3IocmVnZXhwU3RyLCAnVW50ZXJtaW5hdGVkIGdyb3VwJyk7XG4gIH1cblxuICByZXR1cm4gc3RhcnQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy50eXBlcyA9IHR5cGVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50IGluZGVudDogNCAqL1xuXG5cbi8vIFByaXZhdGUgaGVscGVyIGNsYXNzXG5jbGFzcyBTdWJSYW5nZSB7XG4gICAgY29uc3RydWN0b3IobG93LCBoaWdoKSB7XG4gICAgICAgIHRoaXMubG93ID0gbG93O1xuICAgICAgICB0aGlzLmhpZ2ggPSBoaWdoO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IDEgKyBoaWdoIC0gbG93O1xuICAgIH1cblxuICAgIG92ZXJsYXBzKHJhbmdlKSB7XG4gICAgICAgIHJldHVybiAhKHRoaXMuaGlnaCA8IHJhbmdlLmxvdyB8fCB0aGlzLmxvdyA+IHJhbmdlLmhpZ2gpO1xuICAgIH1cblxuICAgIHRvdWNoZXMocmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuICEodGhpcy5oaWdoICsgMSA8IHJhbmdlLmxvdyB8fCB0aGlzLmxvdyAtIDEgPiByYW5nZS5oaWdoKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIGluY2x1c2l2ZSBjb21iaW5hdGlvbiBvZiBTdWJSYW5nZXMgYXMgYSBTdWJSYW5nZS5cbiAgICBhZGQocmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJSYW5nZShcbiAgICAgICAgICAgIE1hdGgubWluKHRoaXMubG93LCByYW5nZS5sb3cpLFxuICAgICAgICAgICAgTWF0aC5tYXgodGhpcy5oaWdoLCByYW5nZS5oaWdoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgc3VidHJhY3Rpb24gb2YgU3ViUmFuZ2VzIGFzIGFuIGFycmF5IG9mIFN1YlJhbmdlcy5cbiAgICAvLyAoVGhlcmUncyBhIGNhc2Ugd2hlcmUgc3VidHJhY3Rpb24gZGl2aWRlcyBpdCBpbiAyKVxuICAgIHN1YnRyYWN0KHJhbmdlKSB7XG4gICAgICAgIGlmIChyYW5nZS5sb3cgPD0gdGhpcy5sb3cgJiYgcmFuZ2UuaGlnaCA+PSB0aGlzLmhpZ2gpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSBlbHNlIGlmIChyYW5nZS5sb3cgPiB0aGlzLmxvdyAmJiByYW5nZS5oaWdoIDwgdGhpcy5oaWdoKSB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIG5ldyBTdWJSYW5nZSh0aGlzLmxvdywgcmFuZ2UubG93IC0gMSksXG4gICAgICAgICAgICAgICAgbmV3IFN1YlJhbmdlKHJhbmdlLmhpZ2ggKyAxLCB0aGlzLmhpZ2gpXG4gICAgICAgICAgICBdO1xuICAgICAgICB9IGVsc2UgaWYgKHJhbmdlLmxvdyA8PSB0aGlzLmxvdykge1xuICAgICAgICAgICAgcmV0dXJuIFtuZXcgU3ViUmFuZ2UocmFuZ2UuaGlnaCArIDEsIHRoaXMuaGlnaCldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtuZXcgU3ViUmFuZ2UodGhpcy5sb3csIHJhbmdlLmxvdyAtIDEpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb3cgPT0gdGhpcy5oaWdoID9cbiAgICAgICAgICAgIHRoaXMubG93LnRvU3RyaW5nKCkgOiB0aGlzLmxvdyArICctJyArIHRoaXMuaGlnaDtcbiAgICB9XG59XG5cblxuY2xhc3MgRFJhbmdlIHtcbiAgICBjb25zdHJ1Y3RvcihhLCBiKSB7XG4gICAgICAgIHRoaXMucmFuZ2VzID0gW107XG4gICAgICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICAgICAgaWYgKGEgIT0gbnVsbCkgdGhpcy5hZGQoYSwgYik7XG4gICAgfVxuXG4gICAgX3VwZGF0ZV9sZW5ndGgoKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5yYW5nZXMucmVkdWNlKChwcmV2aW91cywgcmFuZ2UpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91cyArIHJhbmdlLmxlbmd0aDtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgYWRkKGEsIGIpIHtcbiAgICAgICAgdmFyIF9hZGQgPSAoc3VicmFuZ2UpID0+IHtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgdGhpcy5yYW5nZXMubGVuZ3RoICYmICFzdWJyYW5nZS50b3VjaGVzKHRoaXMucmFuZ2VzW2ldKSkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuZXdSYW5nZXMgPSB0aGlzLnJhbmdlcy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgdGhpcy5yYW5nZXMubGVuZ3RoICYmIHN1YnJhbmdlLnRvdWNoZXModGhpcy5yYW5nZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgc3VicmFuZ2UgPSBzdWJyYW5nZS5hZGQodGhpcy5yYW5nZXNbaV0pO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1Jhbmdlcy5wdXNoKHN1YnJhbmdlKTtcbiAgICAgICAgICAgIHRoaXMucmFuZ2VzID0gbmV3UmFuZ2VzLmNvbmNhdCh0aGlzLnJhbmdlcy5zbGljZShpKSk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVfbGVuZ3RoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIERSYW5nZSkge1xuICAgICAgICAgICAgYS5yYW5nZXMuZm9yRWFjaChfYWRkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChiID09IG51bGwpIGIgPSBhO1xuICAgICAgICAgICAgX2FkZChuZXcgU3ViUmFuZ2UoYSwgYikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN1YnRyYWN0KGEsIGIpIHtcbiAgICAgICAgdmFyIF9zdWJ0cmFjdCA9IChzdWJyYW5nZSkgPT4ge1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJhbmdlcy5sZW5ndGggJiYgIXN1YnJhbmdlLm92ZXJsYXBzKHRoaXMucmFuZ2VzW2ldKSkge1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuZXdSYW5nZXMgPSB0aGlzLnJhbmdlcy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgdGhpcy5yYW5nZXMubGVuZ3RoICYmIHN1YnJhbmdlLm92ZXJsYXBzKHRoaXMucmFuZ2VzW2ldKSkge1xuICAgICAgICAgICAgICAgIG5ld1JhbmdlcyA9IG5ld1Jhbmdlcy5jb25jYXQodGhpcy5yYW5nZXNbaV0uc3VidHJhY3Qoc3VicmFuZ2UpKTtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJhbmdlcyA9IG5ld1Jhbmdlcy5jb25jYXQodGhpcy5yYW5nZXMuc2xpY2UoaSkpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlX2xlbmd0aCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChhIGluc3RhbmNlb2YgRFJhbmdlKSB7XG4gICAgICAgICAgICBhLnJhbmdlcy5mb3JFYWNoKF9zdWJ0cmFjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYiA9PSBudWxsKSBiID0gYTtcbiAgICAgICAgICAgIF9zdWJ0cmFjdChuZXcgU3ViUmFuZ2UoYSwgYikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGludGVyc2VjdChhLCBiKSB7XG4gICAgICAgIHZhciBuZXdSYW5nZXMgPSBbXTtcbiAgICAgICAgdmFyIF9pbnRlcnNlY3QgPSAoc3VicmFuZ2UpID0+IHtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgdGhpcy5yYW5nZXMubGVuZ3RoICYmICFzdWJyYW5nZS5vdmVybGFwcyh0aGlzLnJhbmdlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoaSA8IHRoaXMucmFuZ2VzLmxlbmd0aCAmJiBzdWJyYW5nZS5vdmVybGFwcyh0aGlzLnJhbmdlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbG93ID0gTWF0aC5tYXgodGhpcy5yYW5nZXNbaV0ubG93LCBzdWJyYW5nZS5sb3cpO1xuICAgICAgICAgICAgICAgIHZhciBoaWdoID0gTWF0aC5taW4odGhpcy5yYW5nZXNbaV0uaGlnaCwgc3VicmFuZ2UuaGlnaCk7XG4gICAgICAgICAgICAgICAgbmV3UmFuZ2VzLnB1c2gobmV3IFN1YlJhbmdlKGxvdywgaGlnaCkpO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIERSYW5nZSkge1xuICAgICAgICAgICAgYS5yYW5nZXMuZm9yRWFjaChfaW50ZXJzZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChiID09IG51bGwpIGIgPSBhO1xuICAgICAgICAgICAgX2ludGVyc2VjdChuZXcgU3ViUmFuZ2UoYSwgYikpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmFuZ2VzID0gbmV3UmFuZ2VzO1xuICAgICAgICB0aGlzLl91cGRhdGVfbGVuZ3RoKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGluZGV4KGluZGV4KSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnJhbmdlcy5sZW5ndGggJiYgdGhpcy5yYW5nZXNbaV0ubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgICAgICBpbmRleCAtPSB0aGlzLnJhbmdlc1tpXS5sZW5ndGg7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VzW2ldLmxvdyArIGluZGV4O1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gJ1sgJyArIHRoaXMucmFuZ2VzLmpvaW4oJywgJykgKyAnIF0nO1xuICAgIH1cblxuICAgIGNsb25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IERSYW5nZSh0aGlzKTtcbiAgICB9XG5cbiAgICBudW1iZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZXMucmVkdWNlKChyZXN1bHQsIHN1YnJhbmdlKSA9PiB7XG4gICAgICAgICAgICB2YXIgaSA9IHN1YnJhbmdlLmxvdztcbiAgICAgICAgICAgIHdoaWxlIChpIDw9IHN1YnJhbmdlLmhpZ2gpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpKTtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgc3VicmFuZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZXMubWFwKChzdWJyYW5nZSkgPT4gKHtcbiAgICAgICAgICAgIGxvdzogc3VicmFuZ2UubG93LFxuICAgICAgICAgICAgaGlnaDogc3VicmFuZ2UuaGlnaCxcbiAgICAgICAgICAgIGxlbmd0aDogMSArIHN1YnJhbmdlLmhpZ2ggLSBzdWJyYW5nZS5sb3dcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEUmFuZ2U7XG4iLCJjb25zdCByZXQgICAgPSByZXF1aXJlKCdyZXQnKTtcbmNvbnN0IERSYW5nZSA9IHJlcXVpcmUoJ2RyYW5nZScpO1xuY29uc3QgdHlwZXMgID0gcmV0LnR5cGVzO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgUmFuZEV4cCB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtSZWdFeHB8U3RyaW5nfSByZWdleHBcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1cbiAgICovXG4gIGNvbnN0cnVjdG9yKHJlZ2V4cCwgbSkge1xuICAgIHRoaXMuX3NldERlZmF1bHRzKHJlZ2V4cCk7XG4gICAgaWYgKHJlZ2V4cCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgdGhpcy5pZ25vcmVDYXNlID0gcmVnZXhwLmlnbm9yZUNhc2U7XG4gICAgICB0aGlzLm11bHRpbGluZSA9IHJlZ2V4cC5tdWx0aWxpbmU7XG4gICAgICByZWdleHAgPSByZWdleHAuc291cmNlO1xuXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVnZXhwID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5pZ25vcmVDYXNlID0gbSAmJiBtLmluZGV4T2YoJ2knKSAhPT0gLTE7XG4gICAgICB0aGlzLm11bHRpbGluZSA9IG0gJiYgbS5pbmRleE9mKCdtJykgIT09IC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgcmVnZXhwIG9yIHN0cmluZycpO1xuICAgIH1cblxuICAgIHRoaXMudG9rZW5zID0gcmV0KHJlZ2V4cCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgc29tZSBjdXN0b20gcHJvcGVydGllcyBoYXZlIGJlZW4gc2V0IGZvciB0aGlzIHJlZ2V4cC5cbiAgICpcbiAgICogQHBhcmFtIHtSYW5kRXhwfSByYW5kZXhwXG4gICAqIEBwYXJhbSB7UmVnRXhwfSByZWdleHBcbiAgICovXG4gIF9zZXREZWZhdWx0cyhyZWdleHApIHtcbiAgICAvLyBXaGVuIGEgcmVwZXRpdGlvbmFsIHRva2VuIGhhcyBpdHMgbWF4IHNldCB0byBJbmZpbml0ZSxcbiAgICAvLyByYW5kZXhwIHdvbid0IGFjdHVhbGx5IGdlbmVyYXRlIGEgcmFuZG9tIGFtb3VudCBiZXR3ZWVuIG1pbiBhbmQgSW5maW5pdGVcbiAgICAvLyBpbnN0ZWFkIGl0IHdpbGwgc2VlIEluZmluaXRlIGFzIG1pbiArIDEwMC5cbiAgICB0aGlzLm1heCA9IHJlZ2V4cC5tYXggIT0gbnVsbCA/IHJlZ2V4cC5tYXggOlxuICAgICAgUmFuZEV4cC5wcm90b3R5cGUubWF4ICE9IG51bGwgPyBSYW5kRXhwLnByb3RvdHlwZS5tYXggOiAxMDA7XG5cbiAgICAvLyBUaGlzIGFsbG93cyBleHBhbmRpbmcgdG8gaW5jbHVkZSBhZGRpdGlvbmFsIGNoYXJhY3RlcnNcbiAgICAvLyBmb3IgaW5zdGFuY2U6IFJhbmRFeHAuZGVmYXVsdFJhbmdlLmFkZCgwLCA2NTUzNSk7XG4gICAgdGhpcy5kZWZhdWx0UmFuZ2UgPSByZWdleHAuZGVmYXVsdFJhbmdlID9cbiAgICAgIHJlZ2V4cC5kZWZhdWx0UmFuZ2UgOiB0aGlzLmRlZmF1bHRSYW5nZS5jbG9uZSgpO1xuXG4gICAgaWYgKHJlZ2V4cC5yYW5kSW50KSB7XG4gICAgICB0aGlzLnJhbmRJbnQgPSByZWdleHAucmFuZEludDtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgdGhlIHJhbmRvbSBzdHJpbmcuXG4gICAqXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIGdlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2VuKHRoaXMudG9rZW5zLCBbXSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSByYW5kb20gc3RyaW5nIG1vZGVsZWQgYWZ0ZXIgZ2l2ZW4gdG9rZW5zLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9rZW5cbiAgICogQHBhcmFtIHtBcnJheS48U3RyaW5nPn0gZ3JvdXBzXG4gICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICovXG4gIF9nZW4odG9rZW4sIGdyb3Vwcykge1xuICAgIHZhciBzdGFjaywgc3RyLCBuLCBpLCBsO1xuXG4gICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG4gICAgICBjYXNlIHR5cGVzLlJPT1Q6XG4gICAgICBjYXNlIHR5cGVzLkdST1VQOlxuICAgICAgICAvLyBJZ25vcmUgbG9va2FoZWFkcyBmb3Igbm93LlxuICAgICAgICBpZiAodG9rZW4uZm9sbG93ZWRCeSB8fCB0b2tlbi5ub3RGb2xsb3dlZEJ5KSB7IHJldHVybiAnJzsgfVxuXG4gICAgICAgIC8vIEluc2VydCBwbGFjZWhvbGRlciB1bnRpbCBncm91cCBzdHJpbmcgaXMgZ2VuZXJhdGVkLlxuICAgICAgICBpZiAodG9rZW4ucmVtZW1iZXIgJiYgdG9rZW4uZ3JvdXBOdW1iZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRva2VuLmdyb3VwTnVtYmVyID0gZ3JvdXBzLnB1c2gobnVsbCkgLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhY2sgPSB0b2tlbi5vcHRpb25zID9cbiAgICAgICAgICB0aGlzLl9yYW5kU2VsZWN0KHRva2VuLm9wdGlvbnMpIDogdG9rZW4uc3RhY2s7XG5cbiAgICAgICAgc3RyID0gJyc7XG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBzdGFjay5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBzdHIgKz0gdGhpcy5fZ2VuKHN0YWNrW2ldLCBncm91cHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRva2VuLnJlbWVtYmVyKSB7XG4gICAgICAgICAgZ3JvdXBzW3Rva2VuLmdyb3VwTnVtYmVyXSA9IHN0cjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuXG4gICAgICBjYXNlIHR5cGVzLlBPU0lUSU9OOlxuICAgICAgICAvLyBEbyBub3RoaW5nIGZvciBub3cuXG4gICAgICAgIHJldHVybiAnJztcblxuICAgICAgY2FzZSB0eXBlcy5TRVQ6XG4gICAgICAgIHZhciBleHBhbmRlZFNldCA9IHRoaXMuX2V4cGFuZCh0b2tlbik7XG4gICAgICAgIGlmICghZXhwYW5kZWRTZXQubGVuZ3RoKSB7IHJldHVybiAnJzsgfVxuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLl9yYW5kU2VsZWN0KGV4cGFuZGVkU2V0KSk7XG5cbiAgICAgIGNhc2UgdHlwZXMuUkVQRVRJVElPTjpcbiAgICAgICAgLy8gUmFuZG9tbHkgZ2VuZXJhdGUgbnVtYmVyIGJldHdlZW4gbWluIGFuZCBtYXguXG4gICAgICAgIG4gPSB0aGlzLnJhbmRJbnQodG9rZW4ubWluLFxuICAgICAgICAgIHRva2VuLm1heCA9PT0gSW5maW5pdHkgPyB0b2tlbi5taW4gKyB0aGlzLm1heCA6IHRva2VuLm1heCk7XG5cbiAgICAgICAgc3RyID0gJyc7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzdHIgKz0gdGhpcy5fZ2VuKHRva2VuLnZhbHVlLCBncm91cHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0cjtcblxuICAgICAgY2FzZSB0eXBlcy5SRUZFUkVOQ0U6XG4gICAgICAgIHJldHVybiBncm91cHNbdG9rZW4udmFsdWUgLSAxXSB8fCAnJztcblxuICAgICAgY2FzZSB0eXBlcy5DSEFSOlxuICAgICAgICB2YXIgY29kZSA9IHRoaXMuaWdub3JlQ2FzZSAmJiB0aGlzLl9yYW5kQm9vbCgpID9cbiAgICAgICAgICB0aGlzLl90b090aGVyQ2FzZSh0b2tlbi52YWx1ZSkgOiB0b2tlbi52YWx1ZTtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogSWYgY29kZSBpcyBhbHBoYWJldGljLCBjb252ZXJ0cyB0byBvdGhlciBjYXNlLlxuICAgKiBJZiBub3QgYWxwaGFiZXRpYywgcmV0dXJucyBiYWNrIGNvZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlXG4gICAqIEByZXR1cm4ge051bWJlcn1cbiAgICovXG4gIF90b090aGVyQ2FzZShjb2RlKSB7XG4gICAgcmV0dXJuIGNvZGUgKyAoOTcgPD0gY29kZSAmJiBjb2RlIDw9IDEyMiA/IC0zMiA6XG4gICAgICA2NSA8PSBjb2RlICYmIGNvZGUgPD0gOTAgID8gIDMyIDogMCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBSYW5kb21seSByZXR1cm5zIGEgdHJ1ZSBvciBmYWxzZSB2YWx1ZS5cbiAgICpcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIF9yYW5kQm9vbCgpIHtcbiAgICByZXR1cm4gIXRoaXMucmFuZEludCgwLCAxKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFJhbmRvbWx5IHNlbGVjdHMgYW5kIHJldHVybnMgYSB2YWx1ZSBmcm9tIHRoZSBhcnJheS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheS48T2JqZWN0Pn0gYXJyXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIF9yYW5kU2VsZWN0KGFycikge1xuICAgIGlmIChhcnIgaW5zdGFuY2VvZiBEUmFuZ2UpIHtcbiAgICAgIHJldHVybiBhcnIuaW5kZXgodGhpcy5yYW5kSW50KDAsIGFyci5sZW5ndGggLSAxKSk7XG4gICAgfVxuICAgIHJldHVybiBhcnJbdGhpcy5yYW5kSW50KDAsIGFyci5sZW5ndGggLSAxKV07XG4gIH1cblxuXG4gIC8qKlxuICAgKiBleHBhbmRzIGEgdG9rZW4gdG8gYSBEaXNjb250aW51b3VzUmFuZ2Ugb2YgY2hhcmFjdGVycyB3aGljaCBoYXMgYVxuICAgKiBsZW5ndGggYW5kIGFuIGluZGV4IGZ1bmN0aW9uIChmb3IgcmFuZG9tIHNlbGVjdGluZylcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRva2VuXG4gICAqIEByZXR1cm4ge0Rpc2NvbnRpbnVvdXNSYW5nZX1cbiAgICovXG4gIF9leHBhbmQodG9rZW4pIHtcbiAgICBpZiAodG9rZW4udHlwZSA9PT0gcmV0LnR5cGVzLkNIQVIpIHtcbiAgICAgIHJldHVybiBuZXcgRFJhbmdlKHRva2VuLnZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHJldC50eXBlcy5SQU5HRSkge1xuICAgICAgcmV0dXJuIG5ldyBEUmFuZ2UodG9rZW4uZnJvbSwgdG9rZW4udG8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZHJhbmdlID0gbmV3IERSYW5nZSgpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbi5zZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHN1YnJhbmdlID0gdGhpcy5fZXhwYW5kKHRva2VuLnNldFtpXSk7XG4gICAgICAgIGRyYW5nZS5hZGQoc3VicmFuZ2UpO1xuICAgICAgICBpZiAodGhpcy5pZ25vcmVDYXNlKSB7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdWJyYW5nZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgbGV0IGNvZGUgPSBzdWJyYW5nZS5pbmRleChqKTtcbiAgICAgICAgICAgIGxldCBvdGhlckNhc2VDb2RlID0gdGhpcy5fdG9PdGhlckNhc2UoY29kZSk7XG4gICAgICAgICAgICBpZiAoY29kZSAhPT0gb3RoZXJDYXNlQ29kZSkge1xuICAgICAgICAgICAgICBkcmFuZ2UuYWRkKG90aGVyQ2FzZUNvZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRva2VuLm5vdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0UmFuZ2UuY2xvbmUoKS5zdWJ0cmFjdChkcmFuZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJhbmdlLmNsb25lKCkuaW50ZXJzZWN0KGRyYW5nZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogUmFuZG9tbHkgZ2VuZXJhdGVzIGFuZCByZXR1cm5zIGEgbnVtYmVyIGJldHdlZW4gYSBhbmQgYiAoaW5jbHVzaXZlKS5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGFcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cbiAgcmFuZEludChhLCBiKSB7XG4gICAgcmV0dXJuIGEgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIGIgLSBhKSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHJhbmdlIG9mIGNoYXJhY3RlcnMgdG8gZ2VuZXJhdGUgZnJvbS5cbiAgICovXG4gIGdldCBkZWZhdWx0UmFuZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JhbmdlID0gdGhpcy5fcmFuZ2UgfHwgbmV3IERSYW5nZSgzMiwgMTI2KTtcbiAgfVxuXG4gIHNldCBkZWZhdWx0UmFuZ2UocmFuZ2UpIHtcbiAgICB0aGlzLl9yYW5nZSA9IHJhbmdlO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogRW5hYmxlcyB1c2Ugb2YgcmFuZGV4cCB3aXRoIGEgc2hvcnRlciBjYWxsLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlZ0V4cHxTdHJpbmd8IHJlZ2V4cH1cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1cbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIHJhbmRleHAocmVnZXhwLCBtKSB7XG4gICAgdmFyIHJhbmRleHA7XG4gICAgaWYodHlwZW9mIHJlZ2V4cCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJlZ2V4cCA9IG5ldyBSZWdFeHAocmVnZXhwLCBtKTtcbiAgICB9XG5cbiAgICBpZiAocmVnZXhwLl9yYW5kZXhwID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJhbmRleHAgPSBuZXcgUmFuZEV4cChyZWdleHAsIG0pO1xuICAgICAgcmVnZXhwLl9yYW5kZXhwID0gcmFuZGV4cDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZGV4cCA9IHJlZ2V4cC5fcmFuZGV4cDtcbiAgICAgIHJhbmRleHAuX3NldERlZmF1bHRzKHJlZ2V4cCk7XG4gICAgfVxuICAgIHJldHVybiByYW5kZXhwLmdlbigpO1xuICB9XG5cblxuICAvKipcbiAgICogRW5hYmxlcyBzdWdhcnkgL3JlZ2V4cC8uZ2VuIHN5bnRheC5cbiAgICovXG4gIHN0YXRpYyBzdWdhcigpIHtcbiAgICAvKiBlc2hpbnQgZnJlZXplOmZhbHNlICovXG4gICAgUmVnRXhwLnByb3RvdHlwZS5nZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBSYW5kRXhwLnJhbmRleHAodGhpcyk7XG4gICAgfTtcbiAgfVxufTtcbiIsImltcG9ydCBSYW5kRXhwIGZyb20gJ3JhbmRleHAnO1xuXG5pbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24nO1xuaW1wb3J0IGVudiBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUludGVnZXIobWluLCBtYXgpIHtcbiAgbWluID0gdHlwZW9mIG1pbiA9PT0gJ3VuZGVmaW5lZCcgPyBlbnYuTUlOX0lOVEVHRVIgOiBtaW47XG4gIG1heCA9IHR5cGVvZiBtYXggPT09ICd1bmRlZmluZWQnID8gZW52Lk1BWF9JTlRFR0VSIDogbWF4O1xuXG4gIHJldHVybiBNYXRoLmZsb29yKG9wdGlvbkFQSSgncmFuZG9tJykoKSAqICgobWF4IC0gbWluKSArIDEpKSArIG1pbjtcbn1cblxuZnVuY3Rpb24gX3JhbmRleHAodmFsdWUpIHtcbiAgLy8gc2V0IG1heGltdW0gZGVmYXVsdCwgc2VlICMxOTNcbiAgUmFuZEV4cC5wcm90b3R5cGUubWF4ID0gb3B0aW9uQVBJKCdkZWZhdWx0UmFuZEV4cE1heCcpO1xuXG4gIC8vIHNhbWUgaW1wbGVtZW50YXRpb24gYXMgdGhlIG9yaWdpbmFsIGV4Y2VwdCB1c2luZyBvdXIgcmFuZG9tXG4gIFJhbmRFeHAucHJvdG90eXBlLnJhbmRJbnQgPSAoYSwgYikgPT4gYSArIE1hdGguZmxvb3Iob3B0aW9uQVBJKCdyYW5kb20nKSgpICogKDEgKyAoYiAtIGEpKSk7XG5cbiAgY29uc3QgcmUgPSBuZXcgUmFuZEV4cCh2YWx1ZSk7XG5cbiAgcmV0dXJuIHJlLmdlbigpO1xufVxuXG4vKipcbiAqIFJldHVybnMgcmFuZG9tIGVsZW1lbnQgb2YgYSBjb2xsZWN0aW9uXG4gKlxuICogQHBhcmFtIGNvbGxlY3Rpb25cbiAqIEByZXR1cm5zIHtUfVxuICovXG5mdW5jdGlvbiBwaWNrKGNvbGxlY3Rpb24pIHtcbiAgcmV0dXJuIGNvbGxlY3Rpb25bTWF0aC5mbG9vcihvcHRpb25BUEkoJ3JhbmRvbScpKCkgKiBjb2xsZWN0aW9uLmxlbmd0aCldO1xufVxuXG4vKipcbiAqIFJldHVybnMgc2h1ZmZsZWQgY29sbGVjdGlvbiBvZiBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSBjb2xsZWN0aW9uXG4gKiBAcmV0dXJucyB7VFtdfVxuICovXG5mdW5jdGlvbiBzaHVmZmxlKGNvbGxlY3Rpb24pIHtcbiAgbGV0IHRtcDtcbiAgbGV0IGtleTtcbiAgbGV0IGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuXG4gIGNvbnN0IGNvcHkgPSBjb2xsZWN0aW9uLnNsaWNlKCk7XG5cbiAgZm9yICg7IGxlbmd0aCA+IDA7KSB7XG4gICAga2V5ID0gTWF0aC5mbG9vcihvcHRpb25BUEkoJ3JhbmRvbScpKCkgKiBsZW5ndGgpO1xuICAgIC8vIHN3YXBcbiAgICBsZW5ndGggLT0gMTtcbiAgICB0bXAgPSBjb3B5W2xlbmd0aF07XG4gICAgY29weVtsZW5ndGhdID0gY29weVtrZXldO1xuICAgIGNvcHlba2V5XSA9IHRtcDtcbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufVxuXG5cbi8qKlxuICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGluY2x1c2l2ZSlcbiAqIFVzaW5nIE1hdGgucm91bmQoKSB3aWxsIGdpdmUgeW91IGEgbm9uLXVuaWZvcm0gZGlzdHJpYnV0aW9uIVxuICogQHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNTI3ODIwLzc2OTM4NFxuICovXG5mdW5jdGlvbiBnZXRSYW5kb20obWluLCBtYXgpIHtcbiAgcmV0dXJuIChvcHRpb25BUEkoJ3JhbmRvbScpKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIHJhbmRvbSBudW1iZXIgYWNjb3JkaW5nIHRvIHBhcmFtZXRlcnMgcGFzc2VkXG4gKlxuICogQHBhcmFtIG1pblxuICogQHBhcmFtIG1heFxuICogQHBhcmFtIGRlZk1pblxuICogQHBhcmFtIGRlZk1heFxuICogQHBhcmFtIGhhc1ByZWNpc2lvblxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gbnVtYmVyKG1pbiwgbWF4LCBkZWZNaW4sIGRlZk1heCwgaGFzUHJlY2lzaW9uID0gZmFsc2UpIHtcbiAgZGVmTWluID0gdHlwZW9mIGRlZk1pbiA9PT0gJ3VuZGVmaW5lZCcgPyBlbnYuTUlOX05VTUJFUiA6IGRlZk1pbjtcbiAgZGVmTWF4ID0gdHlwZW9mIGRlZk1heCA9PT0gJ3VuZGVmaW5lZCcgPyBlbnYuTUFYX05VTUJFUiA6IGRlZk1heDtcblxuICBtaW4gPSB0eXBlb2YgbWluID09PSAndW5kZWZpbmVkJyA/IGRlZk1pbiA6IG1pbjtcbiAgbWF4ID0gdHlwZW9mIG1heCA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZNYXggOiBtYXg7XG5cbiAgaWYgKG1heCA8IG1pbikge1xuICAgIG1heCArPSBtaW47XG4gIH1cblxuICBpZiAoaGFzUHJlY2lzaW9uKSB7XG4gICAgcmV0dXJuIGdldFJhbmRvbShtaW4sIG1heCk7XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tSW50ZWdlcihtaW4sIG1heCk7XG59XG5cbmZ1bmN0aW9uIGJ5KHR5cGUpIHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICByZXR1cm4gbnVtYmVyKDAsIDYwKSAqIDYwO1xuXG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgICByZXR1cm4gbnVtYmVyKDE1LCA1MCkgKiA2MTI7XG5cbiAgICBjYXNlICdob3Vycyc6XG4gICAgICByZXR1cm4gbnVtYmVyKDEyLCA3MikgKiAzNjEyMztcblxuICAgIGNhc2UgJ2RheXMnOlxuICAgICAgcmV0dXJuIG51bWJlcig3LCAzMCkgKiA4NjQxMjM0NTtcblxuICAgIGNhc2UgJ3dlZWtzJzpcbiAgICAgIHJldHVybiBudW1iZXIoNCwgNTIpICogNjA0ODEyMzQ1O1xuXG4gICAgY2FzZSAnbW9udGhzJzpcbiAgICAgIHJldHVybiBudW1iZXIoMiwgMTMpICogMjU5MjAxMjM0NTtcblxuICAgIGNhc2UgJ3llYXJzJzpcbiAgICAgIHJldHVybiBudW1iZXIoMSwgMjApICogMzExMDQwMTIzNDU7XG5cbiAgICBkZWZhdWx0OiBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBkYXRlKHN0ZXApIHtcbiAgaWYgKHN0ZXApIHtcbiAgICByZXR1cm4gYnkoc3RlcCk7XG4gIH1cblxuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBkYXlzID0gbnVtYmVyKC0xMDAwLCBlbnYuTU9TVF9ORUFSX0RBVEVUSU1FKTtcblxuICBub3cuc2V0VGltZShub3cuZ2V0VGltZSgpIC0gZGF5cyk7XG5cbiAgcmV0dXJuIG5vdztcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBwaWNrLFxuICBkYXRlLFxuICBzaHVmZmxlLFxuICBudW1iZXIsXG4gIHJhbmRleHA6IF9yYW5kZXhwLFxufTtcbiIsImltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbic7XG5pbXBvcnQgZW52IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20nO1xuXG5mdW5jdGlvbiBnZXRMb2NhbFJlZihvYmosIHBhdGgsIHJlZnMpIHtcbiAgY29uc3Qga2V5RWxlbWVudHMgPSBwYXRoLnJlcGxhY2UoJyMvJywgJy8nKS5zcGxpdCgnLycpO1xuXG4gIGxldCBzY2hlbWEgPSBvYmouJHJlZiAmJiByZWZzID8gcmVmc1tvYmouJHJlZl0gOiBvYmo7XG4gIGlmIChyZWZzICYmIHBhdGguaW5jbHVkZXMoJyMvJykgJiYgcmVmc1trZXlFbGVtZW50c1swXV0pIHtcbiAgICBzY2hlbWEgPSByZWZzW2tleUVsZW1lbnRzLnNoaWZ0KCldO1xuICB9XG5cbiAgaWYgKCFrZXlFbGVtZW50c1swXSkga2V5RWxlbWVudHMuc2hpZnQoKTtcblxuICB3aGlsZSAoc2NoZW1hICYmIGtleUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBwcm9wID0ga2V5RWxlbWVudHMuc2hpZnQoKTtcblxuICAgIGlmICghc2NoZW1hW3Byb3BdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFByb3Agbm90IGZvdW5kOiAke3Byb3B9ICgke3BhdGh9KWApO1xuICAgIH1cblxuICAgIHNjaGVtYSA9IHNjaGVtYVtwcm9wXTtcbiAgfVxuICByZXR1cm4gc2NoZW1hO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZS9mYWxzZSB3aGV0aGVyIHRoZSBvYmplY3QgcGFyYW1ldGVyIGhhcyBpdHMgb3duIHByb3BlcnRpZXMgZGVmaW5lZFxuICpcbiAqIEBwYXJhbSBvYmpcbiAqIEBwYXJhbSBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaGFzUHJvcGVydGllcyhvYmosIC4uLnByb3BlcnRpZXMpIHtcbiAgcmV0dXJuIHByb3BlcnRpZXMuZmlsdGVyKGtleSA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmpba2V5XSAhPT0gJ3VuZGVmaW5lZCc7XG4gIH0pLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogTm9ybWFsaXplIGdlbmVyYXRlZCBkYXRlIFlZWVktTU0tREQgdG8gbm90IGhhdmVcbiAqIG91dCBvZiByYW5nZSB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGNsYW1wRGF0ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUuaW5jbHVkZXMoJyAnKSkge1xuICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSkudG9JU09TdHJpbmcoKS5zdWJzdHIoMCwgMTApO1xuICB9XG5cbiAgbGV0IFt5ZWFyLCBtb250aCwgZGF5XSA9IHZhbHVlLnNwbGl0KCdUJylbMF0uc3BsaXQoJy0nKTtcblxuICBtb250aCA9IE1hdGgubWF4KDEsIE1hdGgubWluKDEyLCBtb250aCkpO1xuICBkYXkgPSBNYXRoLm1heCgxLCBNYXRoLm1pbigzMSwgZGF5KSk7XG5cbiAgcmV0dXJuIGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWA7XG59XG5cbi8qKlxuICogUmV0dXJucyB0eXBlY2FzdGVkIHZhbHVlLlxuICogRXh0ZXJuYWwgZ2VuZXJhdG9ycyAoZmFrZXIsIGNoYW5jZSwgY2FzdWFsKSBtYXkgcmV0dXJuIGRhdGEgaW4gbm9uLWV4cGVjdGVkIGZvcm1hdHMsIHN1Y2ggYXMgc3RyaW5nLCB3aGVuIHlvdSBtaWdodCBleHBlY3QgYW5cbiAqIGludGVnZXIuIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBmb3JjZSB0aGUgdHlwZWNhc3QuIFRoaXMgaXMgdGhlIGJhc2UgZm9ybWF0dGVyIGZvciBhbGwgcmVzdWx0IHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0gdHlwZVxuICogQHBhcmFtIHNjaGVtYVxuICogQHBhcmFtIGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiB0eXBlY2FzdCh0eXBlLCBzY2hlbWEsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHBhcmFtcyA9IHt9O1xuXG4gIC8vIG5vcm1hbGl6ZSBjb25zdHJhaW50c1xuICBzd2l0Y2ggKHR5cGUgfHwgc2NoZW1hLnR5cGUpIHtcbiAgICBjYXNlICdpbnRlZ2VyJzpcbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgaWYgKHR5cGVvZiBzY2hlbWEubWluaW11bSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcGFyYW1zLm1pbmltdW0gPSBzY2hlbWEubWluaW11bTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBzY2hlbWEubWF4aW11bSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcGFyYW1zLm1heGltdW0gPSBzY2hlbWEubWF4aW11bTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjaGVtYS5lbnVtKSB7XG4gICAgICAgIGxldCBtaW4gPSBNYXRoLm1heChwYXJhbXMubWluaW11bSB8fCAwLCAwKTtcbiAgICAgICAgbGV0IG1heCA9IE1hdGgubWluKHBhcmFtcy5tYXhpbXVtIHx8IEluZmluaXR5LCBJbmZpbml0eSk7XG5cbiAgICAgICAgaWYgKHNjaGVtYS5leGNsdXNpdmVNaW5pbXVtICYmIG1pbiA9PT0gc2NoZW1hLm1pbmltdW0pIHtcbiAgICAgICAgICBtaW4gKz0gc2NoZW1hLm11bHRpcGxlT2YgfHwgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY2hlbWEuZXhjbHVzaXZlTWF4aW11bSAmJiBtYXggPT09IHNjaGVtYS5tYXhpbXVtKSB7XG4gICAgICAgICAgbWF4IC09IHNjaGVtYS5tdWx0aXBsZU9mIHx8IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkaXNjYXJkIG91dC1vZi1ib3VuZHMgZW51bWVyYXRpb25zXG4gICAgICAgIGlmIChtaW4gfHwgbWF4ICE9PSBJbmZpbml0eSkge1xuICAgICAgICAgIHNjaGVtYS5lbnVtID0gc2NoZW1hLmVudW0uZmlsdGVyKHggPT4ge1xuICAgICAgICAgICAgaWYgKHggPj0gbWluICYmIHggPD0gbWF4KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdzdHJpbmcnOiB7XG4gICAgICBwYXJhbXMubWluTGVuZ3RoID0gb3B0aW9uQVBJKCdtaW5MZW5ndGgnKSB8fCAwO1xuICAgICAgcGFyYW1zLm1heExlbmd0aCA9IG9wdGlvbkFQSSgnbWF4TGVuZ3RoJykgfHwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cbiAgICAgIGlmICh0eXBlb2Ygc2NoZW1hLm1pbkxlbmd0aCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcGFyYW1zLm1pbkxlbmd0aCA9IE1hdGgubWF4KHBhcmFtcy5taW5MZW5ndGgsIHNjaGVtYS5taW5MZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHNjaGVtYS5tYXhMZW5ndGggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHBhcmFtcy5tYXhMZW5ndGggPSBNYXRoLm1pbihwYXJhbXMubWF4TGVuZ3RoLCBzY2hlbWEubWF4TGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZGVmYXVsdDogYnJlYWs7XG4gIH1cblxuICAvLyBleGVjdXRlIGdlbmVyYXRvclxuICBsZXQgdmFsdWUgPSBjYWxsYmFjayhwYXJhbXMpO1xuXG4gIC8vIGFsbG93IG51bGwgdmFsdWVzIHRvIGJlIHJldHVybmVkXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBub3JtYWxpemUgb3V0cHV0IHZhbHVlXG4gIHN3aXRjaCAodHlwZSB8fCBzY2hlbWEudHlwZSkge1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdpbnRlZ2VyJzpcbiAgICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3N0cmluZyc6IHtcbiAgICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKTtcblxuICAgICAgY29uc3QgbWluID0gTWF0aC5tYXgocGFyYW1zLm1pbkxlbmd0aCB8fCAwLCAwKTtcbiAgICAgIGNvbnN0IG1heCA9IE1hdGgubWluKHBhcmFtcy5tYXhMZW5ndGggfHwgSW5maW5pdHksIEluZmluaXR5KTtcblxuICAgICAgbGV0IHByZXY7XG4gICAgICBsZXQgbm9DaGFuZ2VDb3VudCA9IDA7XG5cbiAgICAgIHdoaWxlICh2YWx1ZS5sZW5ndGggPCBtaW4pIHtcbiAgICAgICAgcHJldiA9IHZhbHVlO1xuXG4gICAgICAgIGlmICghc2NoZW1hLnBhdHRlcm4pIHtcbiAgICAgICAgICB2YWx1ZSArPSBgJHtyYW5kb20ucGljayhbJyAnLCAnLycsICdfJywgJy0nLCAnKycsICc9JywgJ0AnLCAnXiddKX0ke3ZhbHVlfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWUgKz0gcmFuZG9tLnJhbmRleHAoc2NoZW1hLnBhdHRlcm4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXZvaWQgaW5maW5pdGUtbG9vcHMgd2hpbGUgZmlsbGluZyBzdHJpbmdzLCBpZiBubyBjaGFuZ2VzXG4gICAgICAgIC8vIGFyZSBtYWRlIHdlIGp1c3QgYnJlYWsgdGhlIGxvb3AuLi4gc2VlICM1NDBcbiAgICAgICAgaWYgKHZhbHVlID09PSBwcmV2KSB7XG4gICAgICAgICAgbm9DaGFuZ2VDb3VudCArPSAxO1xuICAgICAgICAgIGlmIChub0NoYW5nZUNvdW50ID09PSAzKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbm9DaGFuZ2VDb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IG1heCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cigwLCBtYXgpO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKHNjaGVtYS5mb3JtYXQpIHtcbiAgICAgICAgY2FzZSAnZGF0ZS10aW1lJzpcbiAgICAgICAgY2FzZSAnZGF0ZXRpbWUnOlxuICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUoY2xhbXBEYXRlKHZhbHVlKSkudG9JU09TdHJpbmcoKS5yZXBsYWNlKC8oWzAtOV0pMCtaJC8sICckMVonKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdmdWxsLWRhdGUnOlxuICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKGNsYW1wRGF0ZSh2YWx1ZSkpLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDAsIDEwKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKGAxOTY5LTAxLTAxICR7dmFsdWV9YCkudG9JU09TdHJpbmcoKS5zdWJzdHIoMTEpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBkZWZhdWx0OiBicmVhaztcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBPYmplY3Qua2V5cyhiKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgaWYgKHR5cGVvZiBiW2tleV0gIT09ICdvYmplY3QnIHx8IGJba2V5XSA9PT0gbnVsbCkge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShiW2tleV0pKSB7XG4gICAgICBhW2tleV0gPSBhW2tleV0gfHwgW107XG4gICAgICAvLyBmaXggIzI5MiAtIHNraXAgZHVwbGljYXRlZCB2YWx1ZXMgZnJvbSBtZXJnZSBvYmplY3QgKGIpXG4gICAgICBiW2tleV0uZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFba2V5XSkgJiYgYVtrZXldLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgICAgIGFba2V5XS5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYVtrZXldICE9PSAnb2JqZWN0JyB8fCBhW2tleV0gPT09IG51bGwgfHwgQXJyYXkuaXNBcnJheShhW2tleV0pKSB7XG4gICAgICBhW2tleV0gPSBtZXJnZSh7fSwgYltrZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gbWVyZ2UoYVtrZXldLCBiW2tleV0pO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGE7XG59XG5cbmZ1bmN0aW9uIGNsb25lKG9iaiwgY2FjaGUgPSBuZXcgTWFwKCkpIHtcbiAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgaWYgKGNhY2hlLmhhcyhvYmopKSB7XG4gICAgcmV0dXJuIGNhY2hlLmdldChvYmopO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGNhY2hlLnNldChvYmosIGFycik7XG5cbiAgICBhcnIucHVzaCguLi5vYmoubWFwKHggPT4gY2xvbmUoeCwgY2FjaGUpKSk7XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGNvbnN0IGNsb25lZE9iaiA9IHt9O1xuICBjYWNoZS5zZXQob2JqLCBjbG9uZWRPYmopO1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnJlZHVjZSgocHJldiwgY3VyKSA9PiB7XG4gICAgcHJldltjdXJdID0gY2xvbmUob2JqW2N1cl0sIGNhY2hlKTtcbiAgICByZXR1cm4gcHJldjtcbiAgfSwgY2xvbmVkT2JqKTtcbn1cblxuZnVuY3Rpb24gc2hvcnQoc2NoZW1hKSB7XG4gIGNvbnN0IHMgPSBKU09OLnN0cmluZ2lmeShzY2hlbWEpO1xuICBjb25zdCBsID0gSlNPTi5zdHJpbmdpZnkoc2NoZW1hLCBudWxsLCAyKTtcblxuICByZXR1cm4gcy5sZW5ndGggPiA0MDAgPyBgJHtsLnN1YnN0cigwLCA0MDApfS4uLmAgOiBsO1xufVxuXG5mdW5jdGlvbiBhbnlWYWx1ZSgpIHtcbiAgcmV0dXJuIHJhbmRvbS5waWNrKFtcbiAgICBmYWxzZSxcbiAgICB0cnVlLFxuICAgIG51bGwsXG4gICAgLTEsXG4gICAgTmFOLFxuICAgIE1hdGguUEksXG4gICAgSW5maW5pdHksXG4gICAgdW5kZWZpbmVkLFxuICAgIFtdLFxuICAgIHt9LFxuICAgIC8vIEZJWE1FOiB1c2UgYnVpbHQtaW4gcmFuZG9tP1xuICAgIE1hdGgucmFuZG9tKCksXG4gICAgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIpLFxuICBdKTtcbn1cblxuZnVuY3Rpb24gbm90VmFsdWUoc2NoZW1hLCBwYXJlbnQpIHtcbiAgY29uc3QgY29weSA9IG1lcmdlKHt9LCBwYXJlbnQpO1xuXG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1pbmltdW0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29weS5tYXhpbXVtID0gc2NoZW1hLm1pbmltdW07XG4gICAgY29weS5leGNsdXNpdmVNYXhpbXVtID0gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1heGltdW0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29weS5taW5pbXVtID0gc2NoZW1hLm1heGltdW0gPiBjb3B5Lm1heGltdW0gPyAwIDogc2NoZW1hLm1heGltdW07XG4gICAgY29weS5leGNsdXNpdmVNaW5pbXVtID0gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1pbkxlbmd0aCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb3B5Lm1heExlbmd0aCA9IHNjaGVtYS5taW5MZW5ndGg7XG4gIH1cblxuICBpZiAodHlwZW9mIHNjaGVtYS5tYXhMZW5ndGggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29weS5taW5MZW5ndGggPSBzY2hlbWEubWF4TGVuZ3RoID4gY29weS5tYXhMZW5ndGggPyAwIDogc2NoZW1hLm1heExlbmd0aDtcbiAgfVxuXG4gIGlmIChzY2hlbWEudHlwZSkge1xuICAgIGNvcHkudHlwZSA9IHJhbmRvbS5waWNrKGVudi5TQ0FMQVJfVFlQRVMuZmlsdGVyKHggPT4ge1xuICAgICAgY29uc3QgdHlwZXMgPSBBcnJheS5pc0FycmF5KHNjaGVtYS50eXBlKSA/IHNjaGVtYS50eXBlIDogW3NjaGVtYS50eXBlXTtcblxuICAgICAgcmV0dXJuIHR5cGVzLmV2ZXJ5KHR5cGUgPT4ge1xuICAgICAgICAvLyB0cmVhdCBib3RoIHR5cGVzIGFzIF9zaW1pbGFyIGVub3VnaF8gdG8gYmUgc2tpcHBlZCBlcXVhbFxuICAgICAgICBpZiAoeCA9PT0gJ251bWJlcicgfHwgeCA9PT0gJ2ludGVnZXInKSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGUgIT09ICdudW1iZXInICYmIHR5cGUgIT09ICdpbnRlZ2VyJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB4ICE9PSB0eXBlO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9IGVsc2UgaWYgKHNjaGVtYS5lbnVtKSB7XG4gICAgbGV0IHZhbHVlO1xuXG4gICAgZG8ge1xuICAgICAgdmFsdWUgPSBhbnlWYWx1ZSgpO1xuICAgIH0gd2hpbGUgKHNjaGVtYS5lbnVtLmluZGV4T2YodmFsdWUpICE9PSAtMSk7XG5cbiAgICBjb3B5LmVudW0gPSBbdmFsdWVdO1xuICB9XG5cbiAgaWYgKHNjaGVtYS5yZXF1aXJlZCAmJiBjb3B5LnByb3BlcnRpZXMpIHtcbiAgICBzY2hlbWEucmVxdWlyZWQuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIGRlbGV0ZSBjb3B5LnByb3BlcnRpZXNbcHJvcF07XG4gICAgfSk7XG4gIH1cblxuICAvLyBUT0RPOiBleHBsb3JlIG1vcmUgc2NlbmFyaW9zXG5cbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVmFsdWVGb3JTY2hlbWEodmFsdWUsIHNjaGVtYSkge1xuICBjb25zdCBzY2hlbWFIYXNNaW4gPSBzY2hlbWEubWluaW11bSAhPT0gdW5kZWZpbmVkO1xuICBjb25zdCBzY2hlbWFIYXNNYXggPSBzY2hlbWEubWF4aW11bSAhPT0gdW5kZWZpbmVkO1xuXG4gIHJldHVybiAoXG4gICAgKHNjaGVtYUhhc01pbiB8fCBzY2hlbWFIYXNNYXgpXG4gICAgJiYgKCFzY2hlbWFIYXNNaW4gfHwgdmFsdWUgPj0gc2NoZW1hLm1pbmltdW0pXG4gICAgJiYgKCFzY2hlbWFIYXNNYXggfHwgdmFsdWUgPD0gc2NoZW1hLm1heGltdW0pXG4gICk7XG59XG5cbi8vIEZJWE1FOiBldmFsdWF0ZSBtb3JlIGNvbnN0cmFpbnRzP1xuZnVuY3Rpb24gdmFsaWRhdGUodmFsdWUsIHNjaGVtYXMpIHtcbiAgcmV0dXJuICFzY2hlbWFzLmV2ZXJ5KHNjaGVtYSA9PiB2YWxpZGF0ZVZhbHVlRm9yU2NoZW1hKHZhbHVlLCBzY2hlbWEpKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVWYWx1ZUZvck9uZU9mKHZhbHVlLCBvbmVPZikge1xuICBjb25zdCB2YWxpZENvdW50ID0gb25lT2YucmVkdWNlKChjb3VudCwgc2NoZW1hKSA9PiAoY291bnQgKyAoKHZhbGlkYXRlVmFsdWVGb3JTY2hlbWEodmFsdWUsIHNjaGVtYSkpID8gMSA6IDApKSwgMCk7XG4gIHJldHVybiB2YWxpZENvdW50ID09PSAxO1xufVxuXG5mdW5jdGlvbiBpc0tleShwcm9wKSB7XG4gIHJldHVybiBbJ2VudW0nLCAnY29uc3QnLCAnZGVmYXVsdCcsICdleGFtcGxlcycsICdyZXF1aXJlZCcsICdkZWZpbml0aW9ucycsICdpdGVtcycsICdwcm9wZXJ0aWVzJ10uaW5jbHVkZXMocHJvcCk7XG59XG5cbmZ1bmN0aW9uIG9taXRQcm9wcyhvYmosIHByb3BzKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopXG4gICAgLmZpbHRlcihrZXkgPT4gIXByb3BzLmluY2x1ZGVzKGtleSkpXG4gICAgLnJlZHVjZSgoY29weSwgaykgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICBjb3B5W2tdID0gb2JqW2tdLnNsaWNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb3B5W2tdID0gb2JqW2tdIGluc3RhbmNlb2YgT2JqZWN0XG4gICAgICAgICAgPyBtZXJnZSh7fSwgb2JqW2tdKVxuICAgICAgICAgIDogb2JqW2tdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29weTtcbiAgICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKHZhbHVlLCBzY2hlbWEpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLm1hcCh4ID0+IHRlbXBsYXRlKHgsIHNjaGVtYSkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyNcXHsoW1xcdy4tXSspXFx9L2csIChfLCAkMSkgPT4gc2NoZW1hWyQxXSk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGdpdmVuIG9iamVjdCBpcyBlbXB0eSAoaGFzIG5vIHByb3BlcnRpZXMpXG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgIU9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGg7XG59XG5cbi8qKlxuICogQ2hlY2tzIGdpdmVuIGtleSBpcyByZXF1aXJlZCBvciBpZiBzb3VyY2Ugb2JqZWN0IHdhcyBjcmVhdGVkIGJ5IGEgc3Vicm91dGluZSAoYWxyZWFkeSBjbGVhbmVkKVxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBzY2hlbWFcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBzaG91bGRDbGVhbihrZXksIHNjaGVtYSkge1xuICBjb25zdCBpc1JlcXVpcmVkID0gQXJyYXkuaXNBcnJheShzY2hlbWEucmVxdWlyZWQpICYmIHNjaGVtYS5yZXF1aXJlZC5pbmNsdWRlcyhrZXkpO1xuICBjb25zdCB3YXNDbGVhbmVkID0gdHlwZW9mIHNjaGVtYS50aHVuayA9PT0gJ2Z1bmN0aW9uJyB8fCAoc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzICYmIHR5cGVvZiBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMudGh1bmsgPT09ICdmdW5jdGlvbicpO1xuXG4gIHJldHVybiAhaXNSZXF1aXJlZCAmJiAhd2FzQ2xlYW5lZDtcbn1cblxuLyoqXG4gKiBDbGVhbnMgdXAgdGhlIHNvdXJjZSBvYmplY3QgcmVtb3ZpbmcgZW1wdHkgb2JqZWN0cyBhbmQgdW5kZWZpbmVkIHZhbHVlc1xuICogV2lsbCBub3QgcmVtb3ZlIHZhbHVlcyB3aGljaCBhcmUgc3BlY2lmaWVkIGFzIGByZXF1aXJlZGBcbiAqXG4gKiBAcGFyYW0gb2JqXG4gKiBAcGFyYW0gc2NoZW1hXG4gKiBAcGFyYW0gaXNBcnJheVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gY2xlYW4ob2JqLCBzY2hlbWEsIGlzQXJyYXkgPSBmYWxzZSkge1xuICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9ialxuICAgICAgLm1hcCh2YWx1ZSA9PiBjbGVhbih2YWx1ZSwgc2NoZW1hLCB0cnVlKSlcbiAgICAgIC5maWx0ZXIodmFsdWUgPT4gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyk7XG4gIH1cblxuICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goayA9PiB7XG4gICAgaWYgKGlzRW1wdHkob2JqW2tdKSkge1xuICAgICAgaWYgKHNob3VsZENsZWFuKGssIHNjaGVtYSkpIHtcbiAgICAgICAgZGVsZXRlIG9ialtrXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdmFsdWUgPSBjbGVhbihvYmpba10sIHNjaGVtYSk7XG5cbiAgICAgIGlmICghaXNFbXB0eSh2YWx1ZSkpIHtcbiAgICAgICAgb2JqW2tdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb2JqW2tdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZGVsZXRlIG9ialtrXTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICghT2JqZWN0LmtleXMob2JqKS5sZW5ndGggJiYgaXNBcnJheSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGhhc1Byb3BlcnRpZXMsXG4gIGdldExvY2FsUmVmLFxuICBvbWl0UHJvcHMsXG4gIHR5cGVjYXN0LFxuICBtZXJnZSxcbiAgY2xvbmUsXG4gIHNob3J0LFxuICBub3RWYWx1ZSxcbiAgYW55VmFsdWUsXG4gIHZhbGlkYXRlLFxuICB2YWxpZGF0ZVZhbHVlRm9yU2NoZW1hLFxuICB2YWxpZGF0ZVZhbHVlRm9yT25lT2YsXG4gIGlzS2V5LFxuICB0ZW1wbGF0ZSxcbiAgc2hvdWxkQ2xlYW4sXG4gIGNsZWFuLFxuICBpc0VtcHR5LFxuICBjbGFtcERhdGUsXG59O1xuIiwiaW1wb3J0IHV0aWwgZnJvbSAnLi4vY29yZS91dGlscyc7XG5cbi8vIGR5bmFtaWMgcHJveHkgZm9yIGN1c3RvbSBnZW5lcmF0b3JzXG5mdW5jdGlvbiBwcm94eShnZW4pIHtcbiAgcmV0dXJuICh2YWx1ZSwgc2NoZW1hLCBwcm9wZXJ0eSwgcm9vdFNjaGVtYSkgPT4ge1xuICAgIGxldCBmbiA9IHZhbHVlO1xuICAgIGxldCBhcmdzID0gW107XG5cbiAgICAvLyBzdXBwb3J0IGZvciBuZXN0ZWQgb2JqZWN0LCBmaXJzdC1rZXkgaXMgdGhlIGdlbmVyYXRvclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBmbiA9IE9iamVjdC5rZXlzKHZhbHVlKVswXTtcblxuICAgICAgLy8gdHJlYXQgdGhlIGdpdmVuIGFycmF5IGFzIGFyZ3VtZW50cyxcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlW2ZuXSkpIHtcbiAgICAgICAgLy8gaWYgdGhlIGdlbmVyYXRvciBpcyBleHBlY3RpbmcgYXJyYXlzIHRoZXkgc2hvdWxkIGJlIG5lc3RlZCwgZS5nLiBgW1sxLCAyLCAzXSwgdHJ1ZSwgLi4uXWBcbiAgICAgICAgYXJncyA9IHZhbHVlW2ZuXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZ3MucHVzaCh2YWx1ZVtmbl0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHN1cHBvcnQgZm9yIGtleXBhdGhzLCBlLmcuIFwiaW50ZXJuZXQuZW1haWxcIlxuICAgIGNvbnN0IHByb3BzID0gZm4uc3BsaXQoJy4nKTtcblxuICAgIC8vIHJldHJpZXZlIGEgZnJlc2ggZGVwZW5kZW5jeVxuICAgIGxldCBjdHggPSBnZW4oKTtcblxuICAgIHdoaWxlIChwcm9wcy5sZW5ndGggPiAxKSB7XG4gICAgICBjdHggPSBjdHhbcHJvcHMuc2hpZnQoKV07XG4gICAgfVxuXG4gICAgLy8gcmV0cmlldmUgbGFzdCB2YWx1ZSBmcm9tIGNvbnRleHQgb2JqZWN0XG4gICAgdmFsdWUgPSB0eXBlb2YgY3R4ID09PSAnb2JqZWN0JyA/IGN0eFtwcm9wc1swXV0gOiBjdHg7XG5cbiAgICAvLyBpbnZva2UgZHluYW1pYyBnZW5lcmF0b3JzXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5hcHBseShjdHgsIGFyZ3MubWFwKHggPT4gdXRpbC50ZW1wbGF0ZSh4LCByb290U2NoZW1hKSkpO1xuICAgIH1cblxuICAgIC8vIHRlc3QgZm9yIHBlbmRpbmcgY2FsbGJhY2tzXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCByZXNvbHZlIHZhbHVlIGZvciAnJHtwcm9wZXJ0eX06ICR7Zm59JywgZ2l2ZW46ICR7dmFsdWV9YCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDb250YWluZXIgaXMgdXNlZCB0byB3cmFwIGV4dGVybmFsIGdlbmVyYXRvcnMgKGZha2VyLCBjaGFuY2UsIGNhc3VhbCwgZXRjLikgYW5kIGl0cyBkZXBlbmRlbmNpZXMuXG4gKlxuICogLSBganNmLmV4dGVuZCgnZmFrZXInKWAgd2lsbCBlbmhhbmNlIG9yIGRlZmluZSB0aGUgZ2l2ZW4gZGVwZW5kZW5jeS5cbiAqIC0gYGpzZi5kZWZpbmUoJ2Zha2VyJylgIHdpbGwgcHJvdmlkZSB0aGUgXCJmYWtlclwiIGtleXdvcmQgc3VwcG9ydC5cbiAqXG4gKiBSYW5kRXhwIGlzIG5vdCBsb25nZXIgY29uc2lkZXJlZCBhbiBcImV4dGVuc2lvblwiLlxuICovXG5jbGFzcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBkeW5hbWljIHJlcXVpcmVzIC0gaGFuZGxlIGFsbCBkZXBlbmRlbmNpZXNcbiAgICAvLyB0aGV5IHdpbGwgTk9UIGJlIGluY2x1ZGVkIG9uIHRoZSBidW5kbGVcbiAgICB0aGlzLnJlZ2lzdHJ5ID0ge307XG4gICAgdGhpcy5zdXBwb3J0ID0ge307XG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlciBleHRlbnNpb25zXG4gICAqIEBwYXJhbSBuYW1lXG4gICAqL1xuICByZXNldChuYW1lKSB7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aGlzLnJlZ2lzdHJ5ID0ge307XG4gICAgICB0aGlzLnN1cHBvcnQgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHRoaXMucmVnaXN0cnlbbmFtZV07XG4gICAgICBkZWxldGUgdGhpcy5zdXBwb3J0W25hbWVdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSBkZXBlbmRlbmN5IGdpdmVuIGJ5IG5hbWVcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBleHRlbmQobmFtZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlZ2lzdHJ5W25hbWVdID0gY2FsbGJhY2sodGhpcy5yZWdpc3RyeVtuYW1lXSk7XG5cbiAgICAvLyBidWlsdC1pbiBwcm94eSAoY2FuIGJlIG92ZXJyaWRkZW4pXG4gICAgaWYgKCF0aGlzLnN1cHBvcnRbbmFtZV0pIHtcbiAgICAgIHRoaXMuc3VwcG9ydFtuYW1lXSA9IHByb3h5KCgpID0+IHRoaXMucmVnaXN0cnlbbmFtZV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQga2V5d29yZCBzdXBwb3J0IGJ5IG5hbWVcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBkZWZpbmUobmFtZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnN1cHBvcnRbbmFtZV0gPSBjYWxsYmFjaztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGRlcGVuZGVuY3kgZ2l2ZW4gYnkgbmFtZVxuICAgKiBAcGFyYW0gbmFtZVxuICAgKiBAcmV0dXJucyB7RGVwZW5kZW5jeX1cbiAgICovXG4gIGdldChuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnJlZ2lzdHJ5W25hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGAnJHtuYW1lfScgZGVwZW5kZW5jeSBkb2Vzbid0IGV4aXN0LmApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeVtuYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSBhIGN1c3RvbSBrZXl3b3JkXG4gICAqIEBwYXJhbSBzY2hlbWFcbiAgICovXG4gIHdyYXAoc2NoZW1hKSB7XG4gICAgaWYgKCEoJ2dlbmVyYXRlJyBpbiBzY2hlbWEpKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc2NoZW1hKTtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB7fTtcblxuICAgICAgbGV0IGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBjb25zdCBmbiA9IGtleXNbbGVuZ3RoXS5yZXBsYWNlKC9eeC0vLCAnJyk7XG4gICAgICAgIGNvbnN0IGdlbiA9IHRoaXMuc3VwcG9ydFtmbl07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBnZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NoZW1hLCAnZ2VuZXJhdGUnLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogKHJvb3RTY2hlbWEsIGtleSkgPT4gZ2VuLmNhbGwoY29udGV4dCwgc2NoZW1hW2tleXNbbGVuZ3RoXV0sIHNjaGVtYSwga2V5c1tsZW5ndGhdLCByb290U2NoZW1hLCBrZXkuc2xpY2UoKSksIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2NoZW1hO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lcjtcbiIsImltcG9ydCBSZWdpc3RyeSBmcm9tICcuLi9jbGFzcy9SZWdpc3RyeSc7XG5cbi8vIGluc3RhbnRpYXRlXG5jb25zdCByZWdpc3RyeSA9IG5ldyBSZWdpc3RyeSgpO1xuXG4vKipcbiAqIEN1c3RvbSBmb3JtYXQgQVBJXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vanNvbi1zY2hlbWEtZmFrZXIvanNvbi1zY2hlbWEtZmFrZXIjY3VzdG9tLWZvcm1hdHNcbiAqIEBwYXJhbSBuYW1lT3JGb3JtYXRNYXBcbiAqIEBwYXJhbSBjYWxsYmFja1xuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gZm9ybWF0QVBJKG5hbWVPckZvcm1hdE1hcCwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBuYW1lT3JGb3JtYXRNYXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHJlZ2lzdHJ5Lmxpc3QoKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbmFtZU9yRm9ybWF0TWFwID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlZ2lzdHJ5LnJlZ2lzdGVyKG5hbWVPckZvcm1hdE1hcCwgY2FsbGJhY2spO1xuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2sgPT09IG51bGwgfHwgY2FsbGJhY2sgPT09IGZhbHNlKSB7XG4gICAgICByZWdpc3RyeS51bnJlZ2lzdGVyKG5hbWVPckZvcm1hdE1hcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZWdpc3RyeS5nZXQobmFtZU9yRm9ybWF0TWFwKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVnaXN0cnkucmVnaXN0ZXJNYW55KG5hbWVPckZvcm1hdE1hcCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZm9ybWF0QVBJO1xuIiwiY2xhc3MgUGFyc2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSwgcGF0aCkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICB9XG4gICAgdGhpcy5uYW1lID0gJ1BhcnNlRXJyb3InO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYXJzZUVycm9yO1xuIiwiY29uc3QgaW5mZXJyZWRQcm9wZXJ0aWVzID0ge1xuICBhcnJheTogW1xuICAgICdhZGRpdGlvbmFsSXRlbXMnLFxuICAgICdpdGVtcycsXG4gICAgJ21heEl0ZW1zJyxcbiAgICAnbWluSXRlbXMnLFxuICAgICd1bmlxdWVJdGVtcycsXG4gIF0sXG4gIGludGVnZXI6IFtcbiAgICAnZXhjbHVzaXZlTWF4aW11bScsXG4gICAgJ2V4Y2x1c2l2ZU1pbmltdW0nLFxuICAgICdtYXhpbXVtJyxcbiAgICAnbWluaW11bScsXG4gICAgJ211bHRpcGxlT2YnLFxuICBdLFxuICBvYmplY3Q6IFtcbiAgICAnYWRkaXRpb25hbFByb3BlcnRpZXMnLFxuICAgICdkZXBlbmRlbmNpZXMnLFxuICAgICdtYXhQcm9wZXJ0aWVzJyxcbiAgICAnbWluUHJvcGVydGllcycsXG4gICAgJ3BhdHRlcm5Qcm9wZXJ0aWVzJyxcbiAgICAncHJvcGVydGllcycsXG4gICAgJ3JlcXVpcmVkJyxcbiAgXSxcbiAgc3RyaW5nOiBbXG4gICAgJ21heExlbmd0aCcsXG4gICAgJ21pbkxlbmd0aCcsXG4gICAgJ3BhdHRlcm4nLFxuICAgICdmb3JtYXQnLFxuICBdLFxufTtcblxuaW5mZXJyZWRQcm9wZXJ0aWVzLm51bWJlciA9IGluZmVycmVkUHJvcGVydGllcy5pbnRlZ2VyO1xuXG5jb25zdCBzdWJzY2hlbWFQcm9wZXJ0aWVzID0gW1xuICAnYWRkaXRpb25hbEl0ZW1zJyxcbiAgJ2l0ZW1zJyxcbiAgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJyxcbiAgJ2RlcGVuZGVuY2llcycsXG4gICdwYXR0ZXJuUHJvcGVydGllcycsXG4gICdwcm9wZXJ0aWVzJyxcbl07XG5cbi8qKlxuICogSXRlcmF0ZXMgdGhyb3VnaCBhbGwga2V5cyBvZiBgb2JqYCBhbmQ6XG4gKiAtIGNoZWNrcyB3aGV0aGVyIHRob3NlIGtleXMgbWF0Y2ggcHJvcGVydGllcyBvZiBhIGdpdmVuIGluZmVycmVkIHR5cGVcbiAqIC0gbWFrZXMgc3VyZSB0aGF0IGBvYmpgIGlzIG5vdCBhIHN1YnNjaGVtYTsgX0RvIG5vdCBhdHRlbXB0IHRvIGluZmVyIHByb3BlcnRpZXMgbmFtZWQgYXMgc3Vic2NoZW1hIGNvbnRhaW5lcnMuIFRoZVxuICogcmVhc29uIGZvciB0aGlzIGlzIHRoYXQgYW55IHByb3BlcnR5IG5hbWUgd2l0aGluIHRob3NlIGNvbnRhaW5lcnMgdGhhdCBtYXRjaGVzIG9uZSBvZiB0aGUgcHJvcGVydGllcyB1c2VkIGZvclxuICogaW5mZXJyaW5nIG1pc3NpbmcgdHlwZSB2YWx1ZXMgY2F1c2VzIHRoZSBjb250YWluZXIgaXRzZWxmIHRvIGdldCBwcm9jZXNzZWQgd2hpY2ggbGVhZHMgdG8gaW52YWxpZCBvdXRwdXQuIChJc3N1ZSA2MilfXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIG1hdGNoZXNUeXBlKG9iaiwgbGFzdEVsZW1lbnRJblBhdGgsIGluZmVycmVkVHlwZVByb3BlcnRpZXMpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikuZmlsdGVyKHByb3AgPT4ge1xuICAgIGNvbnN0IGlzU3Vic2NoZW1hID0gc3Vic2NoZW1hUHJvcGVydGllcy5pbmRleE9mKGxhc3RFbGVtZW50SW5QYXRoKSA+IC0xO1xuICAgIGNvbnN0IGluZmVycmVkUHJvcGVydHlGb3VuZCA9IGluZmVycmVkVHlwZVByb3BlcnRpZXMuaW5kZXhPZihwcm9wKSA+IC0xO1xuXG4gICAgaWYgKGluZmVycmVkUHJvcGVydHlGb3VuZCAmJiAhaXNTdWJzY2hlbWEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciBnaXZlbiBgb2JqYCB0eXBlIG1pZ2h0IGJlIGluZmVycmVkLiBUaGUgbWVjaGFuaXNtIGl0ZXJhdGVzIHRocm91Z2ggYWxsIGluZmVycmVkIHR5cGVzIGRlZmluaXRpb25zLFxuICogdHJpZXMgdG8gbWF0Y2ggYWxsb3dlZCBwcm9wZXJ0aWVzIHdpdGggcHJvcGVydGllcyBvZiBnaXZlbiBgb2JqYC4gUmV0dXJucyB0eXBlIG5hbWUsIGlmIGluZmVycmVkLCBvciBudWxsLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH1cbiAqL1xuZnVuY3Rpb24gaW5mZXJUeXBlKG9iaiwgc2NoZW1hUGF0aCkge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoaW5mZXJyZWRQcm9wZXJ0aWVzKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCB0eXBlTmFtZSA9IGtleXNbaV07XG4gICAgY29uc3QgbGFzdEVsZW1lbnRJblBhdGggPSBzY2hlbWFQYXRoW3NjaGVtYVBhdGgubGVuZ3RoIC0gMV07XG5cbiAgICBpZiAobWF0Y2hlc1R5cGUob2JqLCBsYXN0RWxlbWVudEluUGF0aCwgaW5mZXJyZWRQcm9wZXJ0aWVzW3R5cGVOYW1lXSkpIHtcbiAgICAgIHJldHVybiB0eXBlTmFtZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5mZXJUeXBlO1xuIiwiaW1wb3J0IG9wdGlvbkFQSSBmcm9tICcuLi9hcGkvb3B0aW9uJztcblxuLyoqXG4gKiBHZW5lcmF0ZXMgcmFuZG9taXplZCBib29sZWFuIHZhbHVlLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBib29sZWFuR2VuZXJhdG9yKCkge1xuICByZXR1cm4gb3B0aW9uQVBJKCdyYW5kb20nKSgpID4gMC41O1xufVxuXG5leHBvcnQgZGVmYXVsdCBib29sZWFuR2VuZXJhdG9yO1xuIiwiaW1wb3J0IGJvb2xlYW5HZW5lcmF0b3IgZnJvbSAnLi4vZ2VuZXJhdG9ycy9ib29sZWFuJztcblxuY29uc3QgYm9vbGVhblR5cGUgPSBib29sZWFuR2VuZXJhdG9yO1xuXG5leHBvcnQgZGVmYXVsdCBib29sZWFuVHlwZTtcbiIsIi8qKlxuICogR2VuZXJhdGVzIG51bGwgdmFsdWUuXG4gKlxuICogQHJldHVybnMge251bGx9XG4gKi9cbmZ1bmN0aW9uIG51bGxHZW5lcmF0b3IoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBudWxsR2VuZXJhdG9yO1xuIiwiaW1wb3J0IG51bGxHZW5lcmF0b3IgZnJvbSAnLi4vZ2VuZXJhdG9ycy9udWxsJztcblxuY29uc3QgbnVsbFR5cGUgPSBudWxsR2VuZXJhdG9yO1xuXG5leHBvcnQgZGVmYXVsdCBudWxsVHlwZTtcbiIsImltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20nO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL2NvcmUvdXRpbHMnO1xuaW1wb3J0IFBhcnNlRXJyb3IgZnJvbSAnLi4vY29yZS9lcnJvcic7XG5pbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24nO1xuXG4vLyBUT0RPIHByb3ZpZGUgdHlwZXNcbmZ1bmN0aW9uIHVuaXF1ZShwYXRoLCBpdGVtcywgdmFsdWUsIHNhbXBsZSwgcmVzb2x2ZSwgdHJhdmVyc2VDYWxsYmFjaykge1xuICBjb25zdCB0bXAgPSBbXTtcbiAgY29uc3Qgc2VlbiA9IFtdO1xuXG4gIGZ1bmN0aW9uIHdhbGsob2JqKSB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KG9iai52YWx1ZSk7XG5cbiAgICBpZiAoc2Vlbi5pbmRleE9mKGpzb24pID09PSAtMSkge1xuICAgICAgc2Vlbi5wdXNoKGpzb24pO1xuICAgICAgdG1wLnB1c2gob2JqKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXRlbXMuZm9yRWFjaCh3YWxrKTtcblxuICAvLyBUT0RPOiBmaW5kIGEgYmV0dGVyIHNvbHV0aW9uP1xuICBsZXQgbGltaXQgPSAxMDA7XG5cbiAgd2hpbGUgKHRtcC5sZW5ndGggIT09IGl0ZW1zLmxlbmd0aCkge1xuICAgIGlmICghd2Fsayh0cmF2ZXJzZUNhbGxiYWNrKHZhbHVlLml0ZW1zIHx8IHNhbXBsZSwgcGF0aCwgcmVzb2x2ZSkpKSB7XG4gICAgICBsaW1pdCAtPSAxO1xuICAgIH1cblxuICAgIGlmICghbGltaXQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0bXA7XG59XG5cbi8vIFRPRE8gcHJvdmlkZSB0eXBlc1xuZnVuY3Rpb24gYXJyYXlUeXBlKHZhbHVlLCBwYXRoLCByZXNvbHZlLCB0cmF2ZXJzZUNhbGxiYWNrKSB7XG4gIGNvbnN0IGl0ZW1zID0gW107XG5cbiAgaWYgKCEodmFsdWUuaXRlbXMgfHwgdmFsdWUuYWRkaXRpb25hbEl0ZW1zKSkge1xuICAgIGlmICh1dGlscy5oYXNQcm9wZXJ0aWVzKHZhbHVlLCAnbWluSXRlbXMnLCAnbWF4SXRlbXMnLCAndW5pcXVlSXRlbXMnKSkge1xuICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoYG1pc3NpbmcgaXRlbXMgZm9yICR7dXRpbHMuc2hvcnQodmFsdWUpfWAsIHBhdGgpO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZS5pdGVtcykpIHtcbiAgICByZXR1cm4gdmFsdWUuaXRlbXMubWFwKChpdGVtLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1TdWJwYXRoID0gcGF0aC5jb25jYXQoWydpdGVtcycsIGtleV0pO1xuXG4gICAgICByZXR1cm4gdHJhdmVyc2VDYWxsYmFjayhpdGVtLCBpdGVtU3VicGF0aCwgcmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuICBsZXQgbWluSXRlbXMgPSB2YWx1ZS5taW5JdGVtcztcbiAgbGV0IG1heEl0ZW1zID0gdmFsdWUubWF4SXRlbXM7XG5cbiAgY29uc3QgZGVmYXVsdE1pbkl0ZW1zID0gb3B0aW9uQVBJKCdtaW5JdGVtcycpO1xuICBjb25zdCBkZWZhdWx0TWF4SXRlbXMgPSBvcHRpb25BUEkoJ21heEl0ZW1zJyk7XG5cbiAgaWYgKGRlZmF1bHRNaW5JdGVtcykge1xuICAgIC8vIGZpeCBib3VuZGFyaWVzXG4gICAgbWluSXRlbXMgPSB0eXBlb2YgbWluSXRlbXMgPT09ICd1bmRlZmluZWQnXG4gICAgICA/IGRlZmF1bHRNaW5JdGVtc1xuICAgICAgOiBNYXRoLm1pbihkZWZhdWx0TWluSXRlbXMsIG1pbkl0ZW1zKTtcbiAgfVxuXG4gIGlmIChkZWZhdWx0TWF4SXRlbXMpIHtcbiAgICBtYXhJdGVtcyA9IHR5cGVvZiBtYXhJdGVtcyA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgID8gZGVmYXVsdE1heEl0ZW1zXG4gICAgICA6IE1hdGgubWluKGRlZmF1bHRNYXhJdGVtcywgbWF4SXRlbXMpO1xuXG4gICAgLy8gRG9uJ3QgYWxsb3cgdXNlciB0byBzZXQgbWF4IGl0ZW1zIGFib3ZlIG91ciBtYXhpbXVtXG4gICAgaWYgKG1heEl0ZW1zICYmIG1heEl0ZW1zID4gZGVmYXVsdE1heEl0ZW1zKSB7XG4gICAgICBtYXhJdGVtcyA9IGRlZmF1bHRNYXhJdGVtcztcbiAgICB9XG5cbiAgICAvLyBEb24ndCBhbGxvdyB1c2VyIHRvIHNldCBtaW4gaXRlbXMgYWJvdmUgb3VyIG1heGltdW1cbiAgICBpZiAobWluSXRlbXMgJiYgbWluSXRlbXMgPiBkZWZhdWx0TWF4SXRlbXMpIHtcbiAgICAgIG1pbkl0ZW1zID0gbWF4SXRlbXM7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgb3B0aW9uYWxzUHJvYmFiaWxpdHkgPSBvcHRpb25BUEkoJ2Fsd2F5c0Zha2VPcHRpb25hbHMnKSA9PT0gdHJ1ZSA/IDEuMCA6IG9wdGlvbkFQSSgnb3B0aW9uYWxzUHJvYmFiaWxpdHknKTtcbiAgY29uc3QgZml4ZWRQcm9iYWJpbGl0aWVzID0gb3B0aW9uQVBJKCdhbHdheXNGYWtlT3B0aW9uYWxzJykgfHwgb3B0aW9uQVBJKCdmaXhlZFByb2JhYmlsaXRpZXMnKSB8fCBmYWxzZTtcblxuICBsZXQgbGVuZ3RoID0gcmFuZG9tLm51bWJlcihtaW5JdGVtcywgbWF4SXRlbXMsIDEsIDUpO1xuXG4gIGlmIChvcHRpb25hbHNQcm9iYWJpbGl0eSAhPT0gbnVsbCkge1xuICAgIGxlbmd0aCA9IE1hdGgubWF4KGZpeGVkUHJvYmFiaWxpdGllc1xuICAgICAgPyBNYXRoLnJvdW5kKChtYXhJdGVtcyB8fCBsZW5ndGgpICogb3B0aW9uYWxzUHJvYmFiaWxpdHkpXG4gICAgICA6IE1hdGguYWJzKHJhbmRvbS5udW1iZXIobWluSXRlbXMsIG1heEl0ZW1zKSAqIG9wdGlvbmFsc1Byb2JhYmlsaXR5KSwgbWluSXRlbXMgfHwgMCk7XG4gIH1cblxuICAvLyBUT0RPIGJlbG93IGxvb2tzIGJhZC4gU2hvdWxkIGFkZGl0aW9uYWxJdGVtcyBiZSBjb3BpZWQgYXMtaXM/XG4gIGNvbnN0IHNhbXBsZSA9IHR5cGVvZiB2YWx1ZS5hZGRpdGlvbmFsSXRlbXMgPT09ICdvYmplY3QnID8gdmFsdWUuYWRkaXRpb25hbEl0ZW1zIDoge307XG5cbiAgZm9yIChsZXQgY3VycmVudCA9IGl0ZW1zLmxlbmd0aDsgY3VycmVudCA8IGxlbmd0aDsgY3VycmVudCArPSAxKSB7XG4gICAgY29uc3QgaXRlbVN1YnBhdGggPSBwYXRoLmNvbmNhdChbJ2l0ZW1zJywgY3VycmVudF0pO1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0cmF2ZXJzZUNhbGxiYWNrKHZhbHVlLml0ZW1zIHx8IHNhbXBsZSwgaXRlbVN1YnBhdGgsIHJlc29sdmUpO1xuXG4gICAgaXRlbXMucHVzaChlbGVtZW50KTtcbiAgfVxuXG4gIGlmICh2YWx1ZS5jb250YWlucyAmJiBsZW5ndGggPiAwKSB7XG4gICAgY29uc3QgaWR4ID0gcmFuZG9tLm51bWJlcigwLCBsZW5ndGggLSAxKTtcblxuICAgIGl0ZW1zW2lkeF0gPSB0cmF2ZXJzZUNhbGxiYWNrKHZhbHVlLmNvbnRhaW5zLCBwYXRoLmNvbmNhdChbJ2l0ZW1zJywgaWR4XSksIHJlc29sdmUpO1xuICB9XG5cbiAgaWYgKHZhbHVlLnVuaXF1ZUl0ZW1zKSB7XG4gICAgcmV0dXJuIHVuaXF1ZShwYXRoLmNvbmNhdChbJ2l0ZW1zJ10pLCBpdGVtcywgdmFsdWUsIHNhbXBsZSwgcmVzb2x2ZSwgdHJhdmVyc2VDYWxsYmFjayk7XG4gIH1cblxuICByZXR1cm4gaXRlbXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5VHlwZTtcbiIsImltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20nO1xuaW1wb3J0IGVudiBmcm9tICcuLi9jb3JlL2NvbnN0YW50cyc7XG5cbmZ1bmN0aW9uIG51bWJlclR5cGUodmFsdWUpIHtcbiAgbGV0IG1pbiA9IHR5cGVvZiB2YWx1ZS5taW5pbXVtID09PSAndW5kZWZpbmVkJyA/IGVudi5NSU5fSU5URUdFUiA6IHZhbHVlLm1pbmltdW07XG4gIGxldCBtYXggPSB0eXBlb2YgdmFsdWUubWF4aW11bSA9PT0gJ3VuZGVmaW5lZCcgPyBlbnYuTUFYX0lOVEVHRVIgOiB2YWx1ZS5tYXhpbXVtO1xuXG4gIGNvbnN0IG11bHRpcGxlT2YgPSB2YWx1ZS5tdWx0aXBsZU9mO1xuXG4gIGlmIChtdWx0aXBsZU9mKSB7XG4gICAgbWF4ID0gTWF0aC5mbG9vcihtYXggLyBtdWx0aXBsZU9mKSAqIG11bHRpcGxlT2Y7XG4gICAgbWluID0gTWF0aC5jZWlsKG1pbiAvIG11bHRpcGxlT2YpICogbXVsdGlwbGVPZjtcbiAgfVxuXG4gIGlmICh2YWx1ZS5leGNsdXNpdmVNaW5pbXVtICYmIG1pbiA9PT0gdmFsdWUubWluaW11bSkge1xuICAgIG1pbiArPSBtdWx0aXBsZU9mIHx8IDE7XG4gIH1cblxuICBpZiAodmFsdWUuZXhjbHVzaXZlTWF4aW11bSAmJiBtYXggPT09IHZhbHVlLm1heGltdW0pIHtcbiAgICBtYXggLT0gbXVsdGlwbGVPZiB8fCAxO1xuICB9XG5cbiAgaWYgKG1pbiA+IG1heCkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICBpZiAobXVsdGlwbGVPZikge1xuICAgIGlmIChTdHJpbmcobXVsdGlwbGVPZikuaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgbGV0IGJhc2UgPSByYW5kb20ubnVtYmVyKE1hdGguZmxvb3IobWluIC8gbXVsdGlwbGVPZiksIE1hdGguZmxvb3IobWF4IC8gbXVsdGlwbGVPZikpICogbXVsdGlwbGVPZjtcblxuICAgICAgd2hpbGUgKGJhc2UgPCBtaW4pIHtcbiAgICAgICAgYmFzZSArPSB2YWx1ZS5tdWx0aXBsZU9mO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYmFzZTtcbiAgICB9XG5cbiAgICBjb25zdCBib3VuZGFyeSA9IChtYXggLSBtaW4pIC8gbXVsdGlwbGVPZjtcblxuICAgIGxldCBudW07XG4gICAgbGV0IGZpeDtcblxuICAgIGRvIHtcbiAgICAgIG51bSA9IHJhbmRvbS5udW1iZXIoMCwgYm91bmRhcnkpICogbXVsdGlwbGVPZjtcbiAgICAgIGZpeCA9IChudW0gLyBtdWx0aXBsZU9mKSAlIDE7XG4gICAgfSB3aGlsZSAoZml4ICE9PSAwKTtcblxuICAgIC8vIEZJWE1FOiBodHRwczovL2dpdGh1Yi5jb20vanNvbi1zY2hlbWEtZmFrZXIvanNvbi1zY2hlbWEtZmFrZXIvaXNzdWVzLzM3OVxuXG4gICAgcmV0dXJuIG1pbiArIG51bTtcbiAgfVxuXG4gIHJldHVybiByYW5kb20ubnVtYmVyKG1pbiwgbWF4LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG51bWJlclR5cGU7XG4iLCJpbXBvcnQgbnVtYmVyIGZyb20gJy4vbnVtYmVyJztcblxuLy8gVGhlIGBpbnRlZ2VyYCB0eXBlIGlzIGp1c3QgYSB3cmFwcGVyIGZvciB0aGUgYG51bWJlcmAgdHlwZS4gVGhlIGBudW1iZXJgIHR5cGVcbi8vIHJldHVybnMgZmxvYXRpbmcgcG9pbnQgbnVtYmVycywgYW5kIGBpbnRlZ2VyYCB0eXBlIHRydW5jYXRlcyB0aGUgZnJhY3Rpb25cbi8vIHBhcnQsIGxlYXZpbmcgdGhlIHJlc3VsdCBhcyBhbiBpbnRlZ2VyLlxuXG5mdW5jdGlvbiBpbnRlZ2VyVHlwZSh2YWx1ZSkge1xuICByZXR1cm4gbnVtYmVyKHsgbXVsdGlwbGVPZjogMSwgLi4udmFsdWUgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGludGVnZXJUeXBlO1xuIiwiaW1wb3J0IHJhbmRvbSBmcm9tICcuLi9jb3JlL3JhbmRvbSc7XG5cbmNvbnN0IExJUFNVTV9XT1JEUyA9IGBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0IHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZVxuZXQgZG9sb3JlIG1hZ25hIGFsaXF1YSBVdCBlbmltIGFkIG1pbmltIHZlbmlhbSBxdWlzIG5vc3RydWQgZXhlcmNpdGF0aW9uIHVsbGFtY28gbGFib3JpcyBuaXNpIHV0IGFsaXF1aXAgZXggZWFcbmNvbW1vZG8gY29uc2VxdWF0IER1aXMgYXV0ZSBpcnVyZSBkb2xvciBpbiByZXByZWhlbmRlcml0IGluIHZvbHVwdGF0ZSB2ZWxpdCBlc3NlIGNpbGx1bSBkb2xvcmUgZXUgZnVnaWF0IG51bGxhXG5wYXJpYXR1ciBFeGNlcHRldXIgc2ludCBvY2NhZWNhdCBjdXBpZGF0YXQgbm9uIHByb2lkZW50IHN1bnQgaW4gY3VscGEgcXVpIG9mZmljaWEgZGVzZXJ1bnQgbW9sbGl0IGFuaW0gaWQgZXN0XG5sYWJvcnVtYC5zcGxpdCgvXFxXLyk7XG5cbi8qKlxuICogR2VuZXJhdGVzIHJhbmRvbWl6ZWQgYXJyYXkgb2Ygc2luZ2xlIGxvcmVtIGlwc3VtIHdvcmRzLlxuICpcbiAqIEBwYXJhbSBsZW5ndGhcbiAqIEByZXR1cm5zIHtBcnJheS48c3RyaW5nPn1cbiAqL1xuZnVuY3Rpb24gd29yZHNHZW5lcmF0b3IobGVuZ3RoKSB7XG4gIGNvbnN0IHdvcmRzID0gcmFuZG9tLnNodWZmbGUoTElQU1VNX1dPUkRTKTtcblxuICByZXR1cm4gd29yZHMuc2xpY2UoMCwgbGVuZ3RoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd29yZHNHZW5lcmF0b3I7XG4iLCJpbXBvcnQgY29uc3RhbnRzIGZyb20gJy4uL2NvcmUvY29uc3RhbnRzJztcbmltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20nO1xuaW1wb3J0IHdvcmRzIGZyb20gJy4uL2dlbmVyYXRvcnMvd29yZHMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL2NvcmUvdXRpbHMnO1xuaW1wb3J0IG9wdGlvbkFQSSBmcm9tICcuLi9hcGkvb3B0aW9uJztcblxuLy8gZmFsbGJhY2sgZ2VuZXJhdG9yXG5jb25zdCBhbnlUeXBlID0geyB0eXBlOiBjb25zdGFudHMuQUxMT1dFRF9UWVBFUyB9O1xuXG4vLyBUT0RPIHByb3ZpZGUgdHlwZXNcbmZ1bmN0aW9uIG9iamVjdFR5cGUodmFsdWUsIHBhdGgsIHJlc29sdmUsIHRyYXZlcnNlQ2FsbGJhY2spIHtcbiAgY29uc3QgcHJvcHMgPSB7fTtcblxuICBjb25zdCBwcm9wZXJ0aWVzID0gdmFsdWUucHJvcGVydGllcyB8fCB7fTtcbiAgY29uc3QgcGF0dGVyblByb3BlcnRpZXMgPSB2YWx1ZS5wYXR0ZXJuUHJvcGVydGllcyB8fCB7fTtcbiAgY29uc3QgcmVxdWlyZWRQcm9wZXJ0aWVzID0gdHlwZW9mIHZhbHVlLnJlcXVpcmVkID09PSAnYm9vbGVhbicgPyBbXSA6ICh2YWx1ZS5yZXF1aXJlZCB8fCBbXSkuc2xpY2UoKTtcbiAgY29uc3QgYWxsb3dzQWRkaXRpb25hbCA9IHZhbHVlLmFkZGl0aW9uYWxQcm9wZXJ0aWVzICE9PSBmYWxzZTtcblxuICBjb25zdCBwcm9wZXJ0eUtleXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTtcbiAgY29uc3QgcGF0dGVyblByb3BlcnR5S2V5cyA9IE9iamVjdC5rZXlzKHBhdHRlcm5Qcm9wZXJ0aWVzKTtcbiAgY29uc3Qgb3B0aW9uYWxQcm9wZXJ0aWVzID0gcHJvcGVydHlLZXlzLmNvbmNhdChwYXR0ZXJuUHJvcGVydHlLZXlzKS5yZWR1Y2UoKF9yZXNwb25zZSwgX2tleSkgPT4ge1xuICAgIGlmIChyZXF1aXJlZFByb3BlcnRpZXMuaW5kZXhPZihfa2V5KSA9PT0gLTEpIF9yZXNwb25zZS5wdXNoKF9rZXkpO1xuICAgIHJldHVybiBfcmVzcG9uc2U7XG4gIH0sIFtdKTtcbiAgY29uc3QgYWxsUHJvcGVydGllcyA9IHJlcXVpcmVkUHJvcGVydGllcy5jb25jYXQob3B0aW9uYWxQcm9wZXJ0aWVzKTtcblxuICBjb25zdCBhZGRpdGlvbmFsUHJvcGVydGllcyA9IGFsbG93c0FkZGl0aW9uYWwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgID8gKHZhbHVlLmFkZGl0aW9uYWxQcm9wZXJ0aWVzID09PSB0cnVlID8gYW55VHlwZSA6IHZhbHVlLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKVxuICAgIDogdmFsdWUuYWRkaXRpb25hbFByb3BlcnRpZXM7XG5cbiAgaWYgKCFhbGxvd3NBZGRpdGlvbmFsXG4gICAgJiYgcHJvcGVydHlLZXlzLmxlbmd0aCA9PT0gMFxuICAgICYmIHBhdHRlcm5Qcm9wZXJ0eUtleXMubGVuZ3RoID09PSAwXG4gICAgJiYgdXRpbHMuaGFzUHJvcGVydGllcyh2YWx1ZSwgJ21pblByb3BlcnRpZXMnLCAnbWF4UHJvcGVydGllcycsICdkZXBlbmRlbmNpZXMnLCAncmVxdWlyZWQnKVxuICApIHtcbiAgICAvLyBqdXN0IG5vdGhpbmdcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChvcHRpb25BUEkoJ3JlcXVpcmVkT25seScpID09PSB0cnVlKSB7XG4gICAgcmVxdWlyZWRQcm9wZXJ0aWVzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChwcm9wZXJ0aWVzW2tleV0pIHtcbiAgICAgICAgcHJvcHNba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0cmF2ZXJzZUNhbGxiYWNrKHByb3BzLCBwYXRoLmNvbmNhdChbJ3Byb3BlcnRpZXMnXSksIHJlc29sdmUsIHZhbHVlKTtcbiAgfVxuXG4gIGNvbnN0IG9wdGlvbmFsc1Byb2JhYmlsaXR5ID0gb3B0aW9uQVBJKCdhbHdheXNGYWtlT3B0aW9uYWxzJykgPT09IHRydWUgPyAxLjAgOiBvcHRpb25BUEkoJ29wdGlvbmFsc1Byb2JhYmlsaXR5Jyk7XG4gIGNvbnN0IGZpeGVkUHJvYmFiaWxpdGllcyA9IG9wdGlvbkFQSSgnYWx3YXlzRmFrZU9wdGlvbmFscycpIHx8IG9wdGlvbkFQSSgnZml4ZWRQcm9iYWJpbGl0aWVzJykgfHwgZmFsc2U7XG4gIGNvbnN0IGlnbm9yZVByb3BlcnRpZXMgPSBvcHRpb25BUEkoJ2lnbm9yZVByb3BlcnRpZXMnKSB8fCBbXTtcbiAgY29uc3QgcmV1c2VQcm9wcyA9IG9wdGlvbkFQSSgncmV1c2VQcm9wZXJ0aWVzJyk7XG4gIGNvbnN0IGZpbGxQcm9wcyA9IG9wdGlvbkFQSSgnZmlsbFByb3BlcnRpZXMnKTtcblxuICBjb25zdCBtYXggPSB2YWx1ZS5tYXhQcm9wZXJ0aWVzIHx8IChhbGxQcm9wZXJ0aWVzLmxlbmd0aCArIChhbGxvd3NBZGRpdGlvbmFsID8gcmFuZG9tLm51bWJlcigxLCA1KSA6IDApKTtcblxuICBsZXQgbWluID0gTWF0aC5tYXgodmFsdWUubWluUHJvcGVydGllcyB8fCAwLCByZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoKTtcbiAgbGV0IG5lZWRlZEV4dHJhcyA9IE1hdGgubWF4KDAsIGFsbFByb3BlcnRpZXMubGVuZ3RoIC0gbWluKTtcblxuICBpZiAoYWxsUHJvcGVydGllcy5sZW5ndGggPT09IDEgJiYgIXJlcXVpcmVkUHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICBtaW4gPSBNYXRoLm1heChyYW5kb20ubnVtYmVyKGZpbGxQcm9wcyA/IDEgOiAwLCBtYXgpLCBtaW4pO1xuICB9XG5cbiAgaWYgKG9wdGlvbmFsc1Byb2JhYmlsaXR5ICE9PSBudWxsKSB7XG4gICAgaWYgKGZpeGVkUHJvYmFiaWxpdGllcyA9PT0gdHJ1ZSkge1xuICAgICAgbmVlZGVkRXh0cmFzID0gTWF0aC5yb3VuZCgobWluIC0gcmVxdWlyZWRQcm9wZXJ0aWVzLmxlbmd0aCkgKyAob3B0aW9uYWxzUHJvYmFiaWxpdHkgKiAoYWxsUHJvcGVydGllcy5sZW5ndGggLSBtaW4pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5lZWRlZEV4dHJhcyA9IHJhbmRvbS5udW1iZXIobWluIC0gcmVxdWlyZWRQcm9wZXJ0aWVzLmxlbmd0aCwgb3B0aW9uYWxzUHJvYmFiaWxpdHkgKiAoYWxsUHJvcGVydGllcy5sZW5ndGggLSBtaW4pKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBleHRyYVByb3BlcnRpZXNSYW5kb21PcmRlciA9IHJhbmRvbS5zaHVmZmxlKG9wdGlvbmFsUHJvcGVydGllcykuc2xpY2UoMCwgbmVlZGVkRXh0cmFzKTtcbiAgY29uc3QgZXh0cmFQcm9wZXJ0aWVzID0gb3B0aW9uYWxQcm9wZXJ0aWVzLmZpbHRlcihfaXRlbSA9PiB7XG4gICAgcmV0dXJuIGV4dHJhUHJvcGVydGllc1JhbmRvbU9yZGVyLmluZGV4T2YoX2l0ZW0pICE9PSAtMTtcbiAgfSk7XG5cbiAgLy8gcHJvcGVydGllcyBhcmUgcmVhZCBmcm9tIHJpZ2h0LXRvLWxlZnRcbiAgY29uc3QgX2xpbWl0ID0gb3B0aW9uYWxzUHJvYmFiaWxpdHkgIT09IG51bGwgfHwgcmVxdWlyZWRQcm9wZXJ0aWVzLmxlbmd0aCA9PT0gbWF4ID8gbWF4IDogcmFuZG9tLm51bWJlcigwLCBtYXgpO1xuICBjb25zdCBfcHJvcHMgPSByZXF1aXJlZFByb3BlcnRpZXMuY29uY2F0KHJhbmRvbS5zaHVmZmxlKGV4dHJhUHJvcGVydGllcykuc2xpY2UoMCwgX2xpbWl0KSkuc2xpY2UoMCwgbWF4KTtcbiAgY29uc3QgX2RlZm5zID0gW107XG5cbiAgaWYgKHZhbHVlLmRlcGVuZGVuY2llcykge1xuICAgIE9iamVjdC5rZXlzKHZhbHVlLmRlcGVuZGVuY2llcykuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIGNvbnN0IF9yZXF1aXJlZCA9IHZhbHVlLmRlcGVuZGVuY2llc1twcm9wXTtcblxuICAgICAgaWYgKF9wcm9wcy5pbmRleE9mKHByb3ApICE9PSAtMSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShfcmVxdWlyZWQpKSB7XG4gICAgICAgICAgLy8gcHJvcGVydHktZGVwZW5kZW5jaWVzXG4gICAgICAgICAgX3JlcXVpcmVkLmZvckVhY2goc3ViID0+IHtcbiAgICAgICAgICAgIGlmIChfcHJvcHMuaW5kZXhPZihzdWIpID09PSAtMSkge1xuICAgICAgICAgICAgICBfcHJvcHMucHVzaChzdWIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9kZWZucy5wdXNoKF9yZXF1aXJlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHNjaGVtYS1kZXBlbmRlbmNpZXNcbiAgICBpZiAoX2RlZm5zLmxlbmd0aCkge1xuICAgICAgZGVsZXRlIHZhbHVlLmRlcGVuZGVuY2llcztcblxuICAgICAgcmV0dXJuIHRyYXZlcnNlQ2FsbGJhY2soe1xuICAgICAgICBhbGxPZjogX2RlZm5zLmNvbmNhdCh2YWx1ZSksXG4gICAgICB9LCBwYXRoLmNvbmNhdChbJ3Byb3BlcnRpZXMnXSksIHJlc29sdmUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBza2lwcGVkID0gW107XG4gIGNvbnN0IG1pc3NpbmcgPSBbXTtcblxuICBfcHJvcHMuZm9yRWFjaChrZXkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWdub3JlUHJvcGVydGllcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKChpZ25vcmVQcm9wZXJ0aWVzW2ldIGluc3RhbmNlb2YgUmVnRXhwICYmIGlnbm9yZVByb3BlcnRpZXNbaV0udGVzdChrZXkpKVxuICAgICAgICB8fCAodHlwZW9mIGlnbm9yZVByb3BlcnRpZXNbaV0gPT09ICdzdHJpbmcnICYmIGlnbm9yZVByb3BlcnRpZXNbaV0gPT09IGtleSlcbiAgICAgICAgfHwgKHR5cGVvZiBpZ25vcmVQcm9wZXJ0aWVzW2ldID09PSAnZnVuY3Rpb24nICYmIGlnbm9yZVByb3BlcnRpZXNbaV0ocHJvcGVydGllc1trZXldLCBrZXkpKSkge1xuICAgICAgICBza2lwcGVkLnB1c2goa2V5KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gZmFsc2UpIHtcbiAgICAgIGlmIChyZXF1aXJlZFByb3BlcnRpZXMuaW5kZXhPZihrZXkpICE9PSAtMSkge1xuICAgICAgICBwcm9wc1trZXldID0gcHJvcGVydGllc1trZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9wZXJ0aWVzW2tleV0pIHtcbiAgICAgIHByb3BzW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XG4gICAgfVxuXG4gICAgbGV0IGZvdW5kO1xuXG4gICAgLy8gdGhlbiB0cnkgcGF0dGVyblByb3BlcnRpZXNcbiAgICBwYXR0ZXJuUHJvcGVydHlLZXlzLmZvckVhY2goX2tleSA9PiB7XG4gICAgICBpZiAoa2V5Lm1hdGNoKG5ldyBSZWdFeHAoX2tleSkpKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcblxuICAgICAgICBpZiAocHJvcHNba2V5XSkge1xuICAgICAgICAgIHV0aWxzLm1lcmdlKHByb3BzW2tleV0sIHBhdHRlcm5Qcm9wZXJ0aWVzW19rZXldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wc1tyYW5kb20ucmFuZGV4cChrZXkpXSA9IHBhdHRlcm5Qcm9wZXJ0aWVzW19rZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAvLyB0cnkgcGF0dGVyblByb3BlcnRpZXMgYWdhaW4sXG4gICAgICBjb25zdCBzdWJzY2hlbWEgPSBwYXR0ZXJuUHJvcGVydGllc1trZXldIHx8IGFkZGl0aW9uYWxQcm9wZXJ0aWVzO1xuXG4gICAgICAvLyBGSVhNRTogYWxsb3cgYW55VHlwZSBhcyBmYWxsYmFjayB3aGVuIG5vIHN1YnNjaGVtYSBpcyBnaXZlbj9cblxuICAgICAgaWYgKHN1YnNjaGVtYSAmJiBhZGRpdGlvbmFsUHJvcGVydGllcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgLy8gb3RoZXJ3aXNlIHdlIGNhbiB1c2UgYWRkaXRpb25hbFByb3BlcnRpZXM/XG4gICAgICAgIHByb3BzW3BhdHRlcm5Qcm9wZXJ0aWVzW2tleV0gPyByYW5kb20ucmFuZGV4cChrZXkpIDoga2V5XSA9IHByb3BlcnRpZXNba2V5XSB8fCBzdWJzY2hlbWE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtaXNzaW5nLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8vIGRpc2NhcmQgYWxyZWFkeSBpZ25vcmVkIHByb3BzIGlmIHRoZXkncmUgbm90IHJlcXVpcmVkIHRvIGJlIGZpbGxlZC4uLlxuICBsZXQgY3VycmVudCA9IE9iamVjdC5rZXlzKHByb3BzKS5sZW5ndGggKyAoZmlsbFByb3BzID8gMCA6IHNraXBwZWQubGVuZ3RoKTtcblxuICAvLyBnZW5lcmF0ZSBkeW5hbWljIHN1ZmZpeCBmb3IgYWRkaXRpb25hbCBwcm9wcy4uLlxuICBjb25zdCBoYXNoID0gc3VmZml4ID0+IHJhbmRvbS5yYW5kZXhwKGBfP1tfYS1mXFxcXGRdezEsM30ke3N1ZmZpeCA/ICdcXFxcJD8nIDogJyd9YCk7XG5cbiAgZnVuY3Rpb24gZ2V0KGZyb20pIHtcbiAgICBsZXQgb25lO1xuXG4gICAgZG8ge1xuICAgICAgaWYgKCFmcm9tLmxlbmd0aCkgYnJlYWs7XG4gICAgICBvbmUgPSBmcm9tLnNoaWZ0KCk7XG4gICAgfSB3aGlsZSAocHJvcHNbb25lXSk7XG5cbiAgICByZXR1cm4gb25lO1xuICB9XG5cbiAgbGV0IG1pblByb3BzID0gbWluO1xuICBpZiAoYWxsb3dzQWRkaXRpb25hbCAmJiAhcmVxdWlyZWRQcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgIG1pblByb3BzID0gTWF0aC5tYXgob3B0aW9uYWxzUHJvYmFiaWxpdHkgPT09IG51bGwgfHwgYWRkaXRpb25hbFByb3BlcnRpZXMgPyByYW5kb20ubnVtYmVyKGZpbGxQcm9wcyA/IDEgOiAwLCBtYXgpIDogMCwgbWluKTtcbiAgfVxuXG4gIHdoaWxlIChmaWxsUHJvcHMpIHtcbiAgICBpZiAoIShwYXR0ZXJuUHJvcGVydHlLZXlzLmxlbmd0aCB8fCBhbGxvd3NBZGRpdGlvbmFsKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnQgPj0gbWluUHJvcHMpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChhbGxvd3NBZGRpdGlvbmFsKSB7XG4gICAgICBpZiAocmV1c2VQcm9wcyAmJiAoKHByb3BlcnR5S2V5cy5sZW5ndGggLSBjdXJyZW50KSA+IG1pblByb3BzKSkge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBsZXQga2V5O1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBjb3VudCArPSAxO1xuXG4gICAgICAgICAgLy8gc2tpcCBsYXJnZSBvYmplY3RzXG4gICAgICAgICAgaWYgKGNvdW50ID4gMTAwMCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAga2V5ID0gZ2V0KHJlcXVpcmVkUHJvcGVydGllcykgfHwgcmFuZG9tLnBpY2socHJvcGVydHlLZXlzKTtcbiAgICAgICAgfSB3aGlsZSAodHlwZW9mIHByb3BzW2tleV0gIT09ICd1bmRlZmluZWQnKTtcblxuICAgICAgICBpZiAodHlwZW9mIHByb3BzW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcHJvcHNba2V5XSA9IHByb3BlcnRpZXNba2V5XTtcbiAgICAgICAgICBjdXJyZW50ICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGF0dGVyblByb3BlcnR5S2V5cy5sZW5ndGggJiYgIWFkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSByYW5kb20ucGljayhwYXR0ZXJuUHJvcGVydHlLZXlzKTtcbiAgICAgICAgY29uc3Qgd29yZCA9IHJhbmRvbS5yYW5kZXhwKHByb3ApO1xuXG4gICAgICAgIGlmICghcHJvcHNbd29yZF0pIHtcbiAgICAgICAgICBwcm9wc1t3b3JkXSA9IHBhdHRlcm5Qcm9wZXJ0aWVzW3Byb3BdO1xuICAgICAgICAgIGN1cnJlbnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgd29yZCA9IGdldChyZXF1aXJlZFByb3BlcnRpZXMpIHx8ICh3b3JkcygxKSArIGhhc2goKSk7XG5cbiAgICAgICAgaWYgKCFwcm9wc1t3b3JkXSkge1xuICAgICAgICAgIHByb3BzW3dvcmRdID0gYWRkaXRpb25hbFByb3BlcnRpZXMgfHwgYW55VHlwZTtcbiAgICAgICAgICBjdXJyZW50ICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgY3VycmVudCA8IG1pbiAmJiBpIDwgcGF0dGVyblByb3BlcnR5S2V5cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgX2tleSA9IHBhdHRlcm5Qcm9wZXJ0eUtleXNbaV07XG4gICAgICBjb25zdCB3b3JkID0gcmFuZG9tLnJhbmRleHAoX2tleSk7XG5cblxuICAgICAgaWYgKCFwcm9wc1t3b3JkXSkge1xuICAgICAgICBwcm9wc1t3b3JkXSA9IHBhdHRlcm5Qcm9wZXJ0aWVzW19rZXldO1xuICAgICAgICBjdXJyZW50ICs9IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gZmlsbCB1cC10byB0aGlzIHZhbHVlIGFuZCBubyBtb3JlIVxuICBpZiAocmVxdWlyZWRQcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMCAmJiAoIWFsbG93c0FkZGl0aW9uYWwgfHwgb3B0aW9uYWxzUHJvYmFiaWxpdHkgPT09IGZhbHNlKSkge1xuICAgIGNvbnN0IG1heGltdW0gPSByYW5kb20ubnVtYmVyKG1pbiwgbWF4KTtcblxuICAgIGZvciAoOyBjdXJyZW50IDwgbWF4aW11bTspIHtcbiAgICAgIGNvbnN0IHdvcmQgPSBnZXQocHJvcGVydHlLZXlzKTtcblxuICAgICAgaWYgKHdvcmQpIHtcbiAgICAgICAgcHJvcHNbd29yZF0gPSBwcm9wZXJ0aWVzW3dvcmRdO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50ICs9IDE7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRyYXZlcnNlQ2FsbGJhY2socHJvcHMsIHBhdGguY29uY2F0KFsncHJvcGVydGllcyddKSwgcmVzb2x2ZSwgdmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUeXBlO1xuIiwiaW1wb3J0IHdvcmRzIGZyb20gJy4vd29yZHMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuLi9jb3JlL3JhbmRvbSc7XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHVzZWQgYnkgdGh1bmtHZW5lcmF0b3IgdG8gcHJvZHVjZSBzb21lIHdvcmRzIGZvciB0aGUgZmluYWwgcmVzdWx0LlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHByb2R1Y2UoKSB7XG4gIGNvbnN0IGxlbmd0aCA9IHJhbmRvbS5udW1iZXIoMSwgNSk7XG5cbiAgcmV0dXJuIHdvcmRzKGxlbmd0aCkuam9pbignICcpO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyByYW5kb21pemVkIGNvbmNhdGVuYXRlZCBzdHJpbmcgYmFzZWQgb24gd29yZHMgZ2VuZXJhdG9yLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHRodW5rR2VuZXJhdG9yKG1pbiA9IDAsIG1heCA9IDE0MCkge1xuICBjb25zdCBfbWluID0gTWF0aC5tYXgoMCwgbWluKTtcbiAgY29uc3QgX21heCA9IHJhbmRvbS5udW1iZXIoX21pbiwgbWF4KTtcblxuICBsZXQgcmVzdWx0ID0gcHJvZHVjZSgpO1xuXG4gIC8vIGFwcGVuZCB1bnRpbCBsZW5ndGggaXMgcmVhY2hlZFxuICB3aGlsZSAocmVzdWx0Lmxlbmd0aCA8IF9taW4pIHtcbiAgICByZXN1bHQgKz0gcHJvZHVjZSgpO1xuICB9XG5cbiAgLy8gY3V0IGlmIG5lZWRlZFxuICBpZiAocmVzdWx0Lmxlbmd0aCA+IF9tYXgpIHtcbiAgICByZXN1bHQgPSByZXN1bHQuc3Vic3RyKDAsIF9tYXgpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGh1bmtHZW5lcmF0b3I7XG4iLCJpbXBvcnQgcmFuZG9tIGZyb20gJy4uL2NvcmUvcmFuZG9tJztcblxuLyoqXG4gKiBHZW5lcmF0ZXMgcmFuZG9taXplZCBpcHY0IGFkZHJlc3MuXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gaXB2NEdlbmVyYXRvcigpIHtcbiAgcmV0dXJuIFswLCAwLCAwLCAwXS5tYXAoKCkgPT4ge1xuICAgIHJldHVybiByYW5kb20ubnVtYmVyKDAsIDI1NSk7XG4gIH0pLmpvaW4oJy4nKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXB2NEdlbmVyYXRvcjtcbiIsImltcG9ydCByYW5kb20gZnJvbSAnLi4vY29yZS9yYW5kb20nO1xuXG4vKipcbiAqIEdlbmVyYXRlcyByYW5kb21pemVkIGRhdGUgdGltZSBJU08gZm9ybWF0IHN0cmluZy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBkYXRlVGltZUdlbmVyYXRvcigpIHtcbiAgcmV0dXJuIHJhbmRvbS5kYXRlKCkudG9JU09TdHJpbmcoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGF0ZVRpbWVHZW5lcmF0b3I7XG4iLCJpbXBvcnQgZGF0ZVRpbWVHZW5lcmF0b3IgZnJvbSAnLi9kYXRlVGltZSc7XG5cbi8qKlxuICogR2VuZXJhdGVzIHJhbmRvbWl6ZWQgZGF0ZSBmb3JtYXQgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGRhdGVHZW5lcmF0b3IoKSB7XG4gIHJldHVybiBkYXRlVGltZUdlbmVyYXRvcigpLnNsaWNlKDAsIDEwKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGF0ZUdlbmVyYXRvcjtcbiIsImltcG9ydCBkYXRlVGltZUdlbmVyYXRvciBmcm9tICcuL2RhdGVUaW1lJztcblxuLyoqXG4gKiBHZW5lcmF0ZXMgcmFuZG9taXplZCB0aW1lIGZvcm1hdCBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gdGltZUdlbmVyYXRvcigpIHtcbiAgcmV0dXJuIGRhdGVUaW1lR2VuZXJhdG9yKCkuc2xpY2UoMTEpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0aW1lR2VuZXJhdG9yO1xuIiwiaW1wb3J0IHJhbmRvbSBmcm9tICcuLi9jb3JlL3JhbmRvbSc7XG5cbmNvbnN0IEZSQUdNRU5UID0gJ1thLXpBLVpdW2EtekEtWjAtOSstLl0qJztcbmNvbnN0IFVSSV9QQVRURVJOID0gYGh0dHBzPzovL3tob3N0bmFtZX0oPzoke0ZSQUdNRU5UfSkrYDtcbmNvbnN0IFBBUkFNX1BBVFRFUk4gPSAnKD86XFxcXD8oW2Etel17MSw3fSg9XFxcXHd7MSw1fSk/Jil7MCwzfSk/JztcblxuLyoqXG4gKiBQcmVkZWZpbmVkIGNvcmUgZm9ybWF0c1xuICogQHR5cGUge1trZXk6IHN0cmluZ106IHN0cmluZ31cbiAqL1xuY29uc3QgcmVnZXhwcyA9IHtcbiAgZW1haWw6ICdbYS16QS1aXFxcXGRdW2EtekEtWlxcXFxkLV17MSwxM31bYS16QS1aXFxcXGRdQHtob3N0bmFtZX0nLFxuICBob3N0bmFtZTogJ1thLXpBLVpdezEsMzN9XFxcXC5bYS16XXsyLDR9JyxcbiAgaXB2NjogJ1thLWZcXFxcZF17NH0oOlthLWZcXFxcZF17NH0pezd9JyxcbiAgdXJpOiBVUklfUEFUVEVSTixcbiAgc2x1ZzogJ1thLXpBLVpcXFxcZF8tXSsnLFxuXG4gIC8vIHR5cGVzIGZyb20gZHJhZnQtMFs2N10gKD8pXG4gICd1cmktcmVmZXJlbmNlJzogYCR7VVJJX1BBVFRFUk59JHtQQVJBTV9QQVRURVJOfWAsXG4gICd1cmktdGVtcGxhdGUnOiBVUklfUEFUVEVSTi5yZXBsYWNlKCcoPzonLCAnKD86L1xcXFx7W2Etel1bOmEtekEtWjAtOS1dKlxcXFx9fCcpLFxuICAnanNvbi1wb2ludGVyJzogYCgvKD86JHtGUkFHTUVOVC5yZXBsYWNlKCddKicsICcvXSonKX18flswMV0pKStgLFxuXG4gIC8vIHNvbWUgdHlwZXMgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vT0FJL09wZW5BUEktU3BlY2lmaWNhdGlvbi9ibG9iL21hc3Rlci92ZXJzaW9ucy8zLjAuMS5tZCNkYXRhLXR5cGVzICg/KVxuICB1dWlkOiAnXlswLTlhLWZdezh9LSg/OlswLTlhLWZdezR9LSl7M31bMC05YS1mXXsxMn0kJyxcbn07XG5cbnJlZ2V4cHMuaXJpID0gcmVnZXhwc1sndXJpLXJlZmVyZW5jZSddO1xucmVnZXhwc1snaXJpLXJlZmVyZW5jZSddID0gcmVnZXhwc1sndXJpLXJlZmVyZW5jZSddO1xuXG5yZWdleHBzWydpZG4tZW1haWwnXSA9IHJlZ2V4cHMuZW1haWw7XG5yZWdleHBzWydpZG4taG9zdG5hbWUnXSA9IHJlZ2V4cHMuaG9zdG5hbWU7XG5cbmNvbnN0IEFMTE9XRURfRk9STUFUUyA9IG5ldyBSZWdFeHAoYFxcXFx7KCR7T2JqZWN0LmtleXMocmVnZXhwcykuam9pbignfCcpfSlcXFxcfWApO1xuXG4vKipcbiAqIEdlbmVyYXRlcyByYW5kb21pemVkIHN0cmluZyBiYXNpbmcgb24gYSBidWlsdC1pbiByZWdleCBmb3JtYXRcbiAqXG4gKiBAcGFyYW0gY29yZUZvcm1hdFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gY29yZUZvcm1hdEdlbmVyYXRvcihjb3JlRm9ybWF0KSB7XG4gIHJldHVybiByYW5kb20ucmFuZGV4cChyZWdleHBzW2NvcmVGb3JtYXRdKS5yZXBsYWNlKEFMTE9XRURfRk9STUFUUywgKG1hdGNoLCBrZXkpID0+IHtcbiAgICByZXR1cm4gcmFuZG9tLnJhbmRleHAocmVnZXhwc1trZXldKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvcmVGb3JtYXRHZW5lcmF0b3I7XG4iLCJpbXBvcnQgdGh1bmsgZnJvbSAnLi4vZ2VuZXJhdG9ycy90aHVuayc7XG5pbXBvcnQgaXB2NCBmcm9tICcuLi9nZW5lcmF0b3JzL2lwdjQnO1xuaW1wb3J0IGRhdGVUaW1lIGZyb20gJy4uL2dlbmVyYXRvcnMvZGF0ZVRpbWUnO1xuaW1wb3J0IGRhdGUgZnJvbSAnLi4vZ2VuZXJhdG9ycy9kYXRlJztcbmltcG9ydCB0aW1lIGZyb20gJy4uL2dlbmVyYXRvcnMvdGltZSc7XG5pbXBvcnQgY29yZUZvcm1hdCBmcm9tICcuLi9nZW5lcmF0b3JzL2NvcmVGb3JtYXQnO1xuaW1wb3J0IG9wdGlvbkFQSSBmcm9tICcuLi9hcGkvb3B0aW9uJztcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vYXBpL2Zvcm1hdCc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4uL2NvcmUvcmFuZG9tJztcbmltcG9ydCB1dGlscyBmcm9tICcuLi9jb3JlL3V0aWxzJztcblxuZnVuY3Rpb24gZ2VuZXJhdGVGb3JtYXQodmFsdWUsIGludmFsaWQpIHtcbiAgY29uc3QgY2FsbGJhY2sgPSBmb3JtYXQodmFsdWUuZm9ybWF0KTtcblxuICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKHZhbHVlKTtcbiAgfVxuXG4gIHN3aXRjaCAodmFsdWUuZm9ybWF0KSB7XG4gICAgY2FzZSAnZGF0ZS10aW1lJzpcbiAgICBjYXNlICdkYXRldGltZSc6XG4gICAgICByZXR1cm4gZGF0ZVRpbWUoKTtcbiAgICBjYXNlICdkYXRlJzpcbiAgICAgIHJldHVybiBkYXRlKCk7XG4gICAgY2FzZSAndGltZSc6XG4gICAgICByZXR1cm4gdGltZSgpO1xuICAgIGNhc2UgJ2lwdjQnOlxuICAgICAgcmV0dXJuIGlwdjQoKTtcbiAgICBjYXNlICdyZWdleCc6XG4gICAgICAvLyBUT0RPOiBkaXNjdXNzXG4gICAgICByZXR1cm4gJy4rPyc7XG4gICAgY2FzZSAnZW1haWwnOlxuICAgIGNhc2UgJ2hvc3RuYW1lJzpcbiAgICBjYXNlICdpcHY2JzpcbiAgICBjYXNlICd1cmknOlxuICAgIGNhc2UgJ3VyaS1yZWZlcmVuY2UnOlxuICAgIGNhc2UgJ2lyaSc6XG4gICAgY2FzZSAnaXJpLXJlZmVyZW5jZSc6XG4gICAgY2FzZSAnaWRuLWVtYWlsJzpcbiAgICBjYXNlICdpZG4taG9zdG5hbWUnOlxuICAgIGNhc2UgJ2pzb24tcG9pbnRlcic6XG4gICAgY2FzZSAnc2x1Zyc6XG4gICAgY2FzZSAndXJpLXRlbXBsYXRlJzpcbiAgICBjYXNlICd1dWlkJzpcbiAgICAgIHJldHVybiBjb3JlRm9ybWF0KHZhbHVlLmZvcm1hdCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChvcHRpb25BUEkoJ2ZhaWxPbkludmFsaWRGb3JtYXQnKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biByZWdpc3RyeSBrZXkgJHt1dGlscy5zaG9ydCh2YWx1ZS5mb3JtYXQpfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBmb3JtYXQgJyR7dmFsdWUuZm9ybWF0fSdgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdHJpbmdUeXBlKHZhbHVlKSB7XG4gIC8vIGhlcmUgd2UgbmVlZCB0byBmb3JjZSB0eXBlIHRvIGZpeCAjNDY3XG4gIGNvbnN0IG91dHB1dCA9IHV0aWxzLnR5cGVjYXN0KCdzdHJpbmcnLCB2YWx1ZSwgb3B0cyA9PiB7XG4gICAgaWYgKHZhbHVlLmZvcm1hdCkge1xuICAgICAgcmV0dXJuIGdlbmVyYXRlRm9ybWF0KHZhbHVlLCAoKSA9PiB0aHVuayhvcHRzLm1pbkxlbmd0aCwgb3B0cy5tYXhMZW5ndGgpKTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUucGF0dGVybikge1xuICAgICAgcmV0dXJuIHJhbmRvbS5yYW5kZXhwKHZhbHVlLnBhdHRlcm4pO1xuICAgIH1cblxuICAgIHJldHVybiB0aHVuayhvcHRzLm1pbkxlbmd0aCwgb3B0cy5tYXhMZW5ndGgpO1xuICB9KTtcblxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdUeXBlO1xuIiwiaW1wb3J0IF9ib29sZWFuIGZyb20gJy4vYm9vbGVhbic7XG5pbXBvcnQgX251bGwgZnJvbSAnLi9udWxsJztcbmltcG9ydCBfYXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgX2ludGVnZXIgZnJvbSAnLi9pbnRlZ2VyJztcbmltcG9ydCBfbnVtYmVyIGZyb20gJy4vbnVtYmVyJztcbmltcG9ydCBfb2JqZWN0IGZyb20gJy4vb2JqZWN0JztcbmltcG9ydCBfc3RyaW5nIGZyb20gJy4vc3RyaW5nJztcblxuY29uc3QgdHlwZU1hcCA9IHtcbiAgYm9vbGVhbjogX2Jvb2xlYW4sXG4gIG51bGw6IF9udWxsLFxuICBhcnJheTogX2FycmF5LFxuICBpbnRlZ2VyOiBfaW50ZWdlcixcbiAgbnVtYmVyOiBfbnVtYmVyLFxuICBvYmplY3Q6IF9vYmplY3QsXG4gIHN0cmluZzogX3N0cmluZyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVNYXA7XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vcmFuZG9tJztcbmltcG9ydCBQYXJzZUVycm9yIGZyb20gJy4vZXJyb3InO1xuaW1wb3J0IGluZmVyVHlwZSBmcm9tICcuL2luZmVyJztcbmltcG9ydCB0eXBlcyBmcm9tICcuLi90eXBlcy9pbmRleCc7XG5pbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24nO1xuXG5mdW5jdGlvbiBnZXRNZXRhKHsgJGNvbW1lbnQ6IGNvbW1lbnQsIHRpdGxlLCBkZXNjcmlwdGlvbiB9KSB7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyh7IGNvbW1lbnQsIHRpdGxlLCBkZXNjcmlwdGlvbiB9KVxuICAgIC5maWx0ZXIoKFssIHZhbHVlXSkgPT4gdmFsdWUpXG4gICAgLnJlZHVjZSgobWVtbywgW2ssIHZdKSA9PiB7XG4gICAgICBtZW1vW2tdID0gdjtcbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH0sIHt9KTtcbn1cblxuLy8gVE9ETyBwcm92aWRlIHR5cGVzXG5mdW5jdGlvbiB0cmF2ZXJzZShzY2hlbWEsIHBhdGgsIHJlc29sdmUsIHJvb3RTY2hlbWEpIHtcbiAgc2NoZW1hID0gcmVzb2x2ZShzY2hlbWEsIG51bGwsIHBhdGgpO1xuXG4gIGlmIChzY2hlbWEgJiYgKHNjaGVtYS5vbmVPZiB8fCBzY2hlbWEuYW55T2YgfHwgc2NoZW1hLmFsbE9mKSkge1xuICAgIHNjaGVtYSA9IHJlc29sdmUoc2NoZW1hLCBudWxsLCBwYXRoKTtcbiAgfVxuXG4gIGlmICghc2NoZW1hKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY29udGV4dCA9IHtcbiAgICAuLi5nZXRNZXRhKHNjaGVtYSksXG4gICAgc2NoZW1hUGF0aDogcGF0aCxcbiAgfTtcblxuICAvLyBkZWZhdWx0IHZhbHVlcyBoYXMgaGlnaGVyIHByZWNlZGVuY2VcbiAgaWYgKHBhdGhbcGF0aC5sZW5ndGggLSAxXSAhPT0gJ3Byb3BlcnRpZXMnKSB7XG4gICAgLy8gZXhhbXBsZSB2YWx1ZXMgaGF2ZSBoaWdoZXN0IHByZWNlZGVuY2VcbiAgICBpZiAob3B0aW9uQVBJKCd1c2VFeGFtcGxlc1ZhbHVlJykgJiYgQXJyYXkuaXNBcnJheShzY2hlbWEuZXhhbXBsZXMpKSB7XG4gICAgICAvLyBpbmNsdWRlIGBkZWZhdWx0YCB2YWx1ZSBhcyBleGFtcGxlIHRvb1xuICAgICAgY29uc3QgZml4ZWRFeGFtcGxlcyA9IHNjaGVtYS5leGFtcGxlc1xuICAgICAgICAuY29uY2F0KCdkZWZhdWx0JyBpbiBzY2hlbWEgPyBbc2NoZW1hLmRlZmF1bHRdIDogW10pO1xuXG4gICAgICByZXR1cm4geyB2YWx1ZTogdXRpbHMudHlwZWNhc3QobnVsbCwgc2NoZW1hLCAoKSA9PiByYW5kb20ucGljayhmaXhlZEV4YW1wbGVzKSksIGNvbnRleHQgfTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9uQVBJKCd1c2VEZWZhdWx0VmFsdWUnKSAmJiAnZGVmYXVsdCcgaW4gc2NoZW1hKSB7XG4gICAgICBpZiAoc2NoZW1hLmRlZmF1bHQgIT09ICcnIHx8ICFvcHRpb25BUEkoJ3JlcGxhY2VFbXB0eUJ5UmFuZG9tVmFsdWUnKSkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogc2NoZW1hLmRlZmF1bHQsIGNvbnRleHQgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoJ3RlbXBsYXRlJyBpbiBzY2hlbWEpIHtcbiAgICAgIHJldHVybiB7IHZhbHVlOiB1dGlscy50ZW1wbGF0ZShzY2hlbWEudGVtcGxhdGUsIHJvb3RTY2hlbWEpLCBjb250ZXh0IH07XG4gICAgfVxuXG4gICAgaWYgKCdjb25zdCcgaW4gc2NoZW1hKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogc2NoZW1hLmNvbnN0LCBjb250ZXh0IH07XG4gICAgfVxuICB9XG5cbiAgaWYgKHNjaGVtYS5ub3QgJiYgdHlwZW9mIHNjaGVtYS5ub3QgPT09ICdvYmplY3QnKSB7XG4gICAgc2NoZW1hID0gdXRpbHMubm90VmFsdWUoc2NoZW1hLm5vdCwgdXRpbHMub21pdFByb3BzKHNjaGVtYSwgWydub3QnXSkpO1xuXG4gICAgLy8gYnVpbGQgbmV3IG9iamVjdCB2YWx1ZSBmcm9tIG5vdC1zY2hlbWEhXG4gICAgaWYgKHNjaGVtYS50eXBlICYmIHNjaGVtYS50eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3QgeyB2YWx1ZSwgY29udGV4dDogaW5uZXJDb250ZXh0IH0gPSB0cmF2ZXJzZShzY2hlbWEsIHBhdGguY29uY2F0KFsnbm90J10pLCByZXNvbHZlLCByb290U2NoZW1hKTtcbiAgICAgIHJldHVybiB7IHZhbHVlOiB1dGlscy5jbGVhbih2YWx1ZSwgc2NoZW1hLCBmYWxzZSksIGNvbnRleHQ6IHsgLi4uY29udGV4dCwgaXRlbXM6IGlubmVyQ29udGV4dCB9IH07XG4gICAgfVxuICB9XG5cbiAgLy8gdGh1bmtzIGNhbiByZXR1cm4gc3ViLXNjaGVtYXNcbiAgaWYgKHR5cGVvZiBzY2hlbWEudGh1bmsgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyByZXN1bHQgaXMgYWxyZWFkeSBjbGVhbmVkIGluIHRodW5rXG4gICAgY29uc3QgeyB2YWx1ZSwgY29udGV4dDogaW5uZXJDb250ZXh0IH0gPSB0cmF2ZXJzZShzY2hlbWEudGh1bmsocm9vdFNjaGVtYSksIHBhdGgsIHJlc29sdmUpO1xuICAgIHJldHVybiB7IHZhbHVlLCBjb250ZXh0OiB7IC4uLmNvbnRleHQsIGl0ZW1zOiBpbm5lckNvbnRleHQgfSB9O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEuZ2VuZXJhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCByZXR2YWwgPSB1dGlscy50eXBlY2FzdChudWxsLCBzY2hlbWEsICgpID0+IHNjaGVtYS5nZW5lcmF0ZShyb290U2NoZW1hLCBwYXRoKSk7XG4gICAgY29uc3QgdHlwZSA9IHJldHZhbCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiByZXR2YWw7XG4gICAgaWYgKHR5cGUgPT09IHNjaGVtYS50eXBlXG4gICAgICB8fCAoQXJyYXkuaXNBcnJheShzY2hlbWEudHlwZSkgJiYgc2NoZW1hLnR5cGUuaW5jbHVkZXModHlwZSkpXG4gICAgICB8fCAodHlwZSA9PT0gJ251bWJlcicgJiYgc2NoZW1hLnR5cGUgPT09ICdpbnRlZ2VyJylcbiAgICAgIHx8IChBcnJheS5pc0FycmF5KHJldHZhbCkgJiYgc2NoZW1hLnR5cGUgPT09ICdhcnJheScpKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogcmV0dmFsLCBjb250ZXh0IH07XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEucGF0dGVybiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdXRpbHMudHlwZWNhc3QoJ3N0cmluZycsIHNjaGVtYSwgKCkgPT4gcmFuZG9tLnJhbmRleHAoc2NoZW1hLnBhdHRlcm4pKSwgY29udGV4dCB9O1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLmVudW0pKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHV0aWxzLnR5cGVjYXN0KG51bGwsIHNjaGVtYSwgKCkgPT4gcmFuZG9tLnBpY2soc2NoZW1hLmVudW0pKSwgY29udGV4dCB9O1xuICB9XG5cbiAgLy8gc2hvcnQtY2lyY3VpdCBhcyB3ZSBkb24ndCBwbGFuIGdlbmVyYXRlIG1vcmUgdmFsdWVzIVxuICBpZiAoc2NoZW1hLmpzb25QYXRoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHNjaGVtYSwgY29udGV4dCB9O1xuICB9XG5cbiAgLy8gVE9ETyByZW1vdmUgdGhlIHVnbHkgb3ZlcmNvbWVcbiAgbGV0IHR5cGUgPSBzY2hlbWEudHlwZTtcblxuICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgIHR5cGUgPSByYW5kb20ucGljayh0eXBlKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBBdHRlbXB0IHRvIGluZmVyIHRoZSB0eXBlXG4gICAgdHlwZSA9IGluZmVyVHlwZShzY2hlbWEsIHBhdGgpIHx8IHR5cGU7XG5cbiAgICBpZiAodHlwZSkge1xuICAgICAgc2NoZW1hLnR5cGUgPSB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoIXR5cGVzW3R5cGVdKSB7XG4gICAgICBpZiAob3B0aW9uQVBJKCdmYWlsT25JbnZhbGlkVHlwZXMnKSkge1xuICAgICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihgdW5rbm93biBwcmltaXRpdmUgJHt1dGlscy5zaG9ydCh0eXBlKX1gLCBwYXRoLmNvbmNhdChbJ3R5cGUnXSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25BUEkoJ2RlZmF1bHRJbnZhbGlkVHlwZVByb2R1Y3QnKTtcblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB0eXBlc1t2YWx1ZV0pIHtcbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdHlwZXNbdmFsdWVdKHNjaGVtYSwgcGF0aCwgcmVzb2x2ZSwgdHJhdmVyc2UpLCBjb250ZXh0IH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyB2YWx1ZSwgY29udGV4dCB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpbm5lclJlc3VsdCA9IHR5cGVzW3R5cGVdKHNjaGVtYSwgcGF0aCwgcmVzb2x2ZSwgdHJhdmVyc2UpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogaW5uZXJSZXN1bHQubWFwKCh7IHZhbHVlIH0pID0+IHZhbHVlKSxcbiAgICAgICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgLi4uY29udGV4dCxcbiAgICAgICAgICAgICAgaXRlbXM6IGlubmVyUmVzdWx0Lm1hcChcbiAgICAgICAgICAgICAgICBBcnJheS5pc0FycmF5KHNjaGVtYS5pdGVtcylcbiAgICAgICAgICAgICAgICAgID8gKHsgY29udGV4dDogYyB9KSA9PiBjXG4gICAgICAgICAgICAgICAgICA6ICh7IGNvbnRleHQ6IGMgfSkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYyxcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byByZW1vdmUgdGhlIGluZGV4IGZyb20gdGhlIHBhdGggdG8gZ2V0IHRoZSByZWFsIHNjaGVtYSBwYXRoXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtYVBhdGg6IGMuc2NoZW1hUGF0aC5zbGljZSgwLCAtMSksXG4gICAgICAgICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGlubmVyUmVzdWx0LnZhbHVlLCBjb250ZXh0OiB7IC4uLmNvbnRleHQsIGl0ZW1zOiBpbm5lclJlc3VsdC5jb250ZXh0IH0gfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB2YWx1ZTogaW5uZXJSZXN1bHQsIGNvbnRleHQgfTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlLnBhdGggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoZS5zdGFjaywgcGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsZXQgdmFsdWVDb3B5ID0ge307XG4gIGxldCBjb250ZXh0Q29weSA9IHsgLi4uY29udGV4dCB9O1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYSkpIHtcbiAgICB2YWx1ZUNvcHkgPSBbXTtcbiAgfVxuXG4gIE9iamVjdC5rZXlzKHNjaGVtYSkuZm9yRWFjaChwcm9wID0+IHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYVtwcm9wXSA9PT0gJ29iamVjdCcgJiYgcHJvcCAhPT0gJ2RlZmluaXRpb25zJykge1xuICAgICAgY29uc3QgeyB2YWx1ZSwgY29udGV4dDogaW5uZXJDb250ZXh0IH0gPSB0cmF2ZXJzZShzY2hlbWFbcHJvcF0sIHBhdGguY29uY2F0KFtwcm9wXSksIHJlc29sdmUsIHZhbHVlQ29weSk7XG4gICAgICB2YWx1ZUNvcHlbcHJvcF0gPSB1dGlscy5jbGVhbih2YWx1ZSwgc2NoZW1hW3Byb3BdLCBmYWxzZSk7XG4gICAgICBjb250ZXh0Q29weVtwcm9wXSA9IGlubmVyQ29udGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWVDb3B5W3Byb3BdID0gc2NoZW1hW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlQ29weSwgY29udGV4dDogY29udGV4dENvcHkgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdHJhdmVyc2U7XG4iLCJpbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24nO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbSc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IGJ1aWxkUmVzb2x2ZVNjaGVtYSA9ICh7XG4gIHJlZnMsXG4gIHNjaGVtYSxcbiAgY29udGFpbmVyLFxuICBzeW5jaHJvbm91cyxcbiAgcmVmRGVwdGhNYXgsXG4gIHJlZkRlcHRoTWluLFxufSkgPT4ge1xuICBjb25zdCByZWN1cnNpdmVVdGlsID0ge307XG4gIGNvbnN0IHNlZW5SZWZzID0ge307XG5cbiAgbGV0IGRlcHRoID0gMDtcbiAgbGV0IGxhc3RSZWY7XG4gIGxldCBsYXN0UGF0aDtcblxuICByZWN1cnNpdmVVdGlsLnJlc29sdmVTY2hlbWEgPSAoc3ViLCBpbmRleCwgcm9vdFBhdGgpID0+IHtcbiAgICAvLyBwcmV2ZW50IG51bGwgc3ViIGZyb20gZGVmYXVsdC9leGFtcGxlIG51bGwgdmFsdWVzIHRvIHRocm93XG4gICAgaWYgKHN1YiA9PT0gbnVsbCB8fCBzdWIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzdWIuZ2VuZXJhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBzdWI7XG4gICAgfVxuXG4gICAgLy8gY2xlYW51cFxuICAgIGNvbnN0IF9pZCA9IHN1Yi4kaWQgfHwgc3ViLmlkO1xuXG4gICAgaWYgKHR5cGVvZiBfaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkZWxldGUgc3ViLmlkO1xuICAgICAgZGVsZXRlIHN1Yi4kaWQ7XG4gICAgICBkZWxldGUgc3ViLiRzY2hlbWE7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzdWIuJHJlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IG1heERlcHRoID0gTWF0aC5tYXgocmVmRGVwdGhNaW4sIHJlZkRlcHRoTWF4KSAtIDE7XG5cbiAgICAgIC8vIGluY3JlYXNpbmcgZGVwdGggb25seSBmb3IgcmVwZWF0ZWQgcmVmcyBzZWVtcyB0byBiZSBmaXhpbmcgIzI1OFxuICAgICAgaWYgKHN1Yi4kcmVmID09PSAnIycgfHwgc2VlblJlZnNbc3ViLiRyZWZdIDwgMCB8fCAobGFzdFJlZiA9PT0gc3ViLiRyZWYgJiYgKytkZXB0aCA+IG1heERlcHRoKSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIGlmIChzdWIuJHJlZiAhPT0gJyMnICYmIGxhc3RQYXRoICYmIGxhc3RQYXRoLmxlbmd0aCA9PT0gcm9vdFBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHV0aWxzLmdldExvY2FsUmVmKHNjaGVtYSwgc3ViLiRyZWYsIHN5bmNocm9ub3VzICYmIHJlZnMpO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdWIuJHJlZjtcbiAgICAgICAgcmV0dXJuIHN1YjtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBzZWVuUmVmc1tzdWIuJHJlZl0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHNlZW5SZWZzW3N1Yi4kcmVmXSA9IHJhbmRvbS5udW1iZXIocmVmRGVwdGhNaW4sIHJlZkRlcHRoTWF4KSAtIDE7XG4gICAgICB9XG5cbiAgICAgIGxhc3RQYXRoID0gcm9vdFBhdGg7XG4gICAgICBsYXN0UmVmID0gc3ViLiRyZWY7XG5cbiAgICAgIGxldCByZWY7XG5cbiAgICAgIGlmIChzdWIuJHJlZi5pbmRleE9mKCcjLycpID09PSAtMSkge1xuICAgICAgICByZWYgPSByZWZzW3N1Yi4kcmVmXSB8fCBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVmID0gdXRpbHMuZ2V0TG9jYWxSZWYoc2NoZW1hLCBzdWIuJHJlZiwgc3luY2hyb25vdXMgJiYgcmVmcykgfHwgbnVsbDtcbiAgICAgIH1cblxuICAgICAgbGV0IGZpeGVkO1xuICAgICAgaWYgKHR5cGVvZiByZWYgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICghcmVmICYmIG9wdGlvbkFQSSgnaWdub3JlTWlzc2luZ1JlZnMnKSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVmZXJlbmNlIG5vdCBmb3VuZDogJHtzdWIuJHJlZn1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlZW5SZWZzW3N1Yi4kcmVmXSAtPSAxO1xuICAgICAgICB1dGlscy5tZXJnZShzdWIsIHJlZiB8fCB7fSk7XG4gICAgICAgIGZpeGVkID0gc3luY2hyb25vdXMgJiYgcmVmICYmIHJlZi4kcmVmO1xuICAgICAgfVxuXG4gICAgICAvLyBqdXN0IHJlbW92ZSB0aGUgcmVmZXJlbmNlXG4gICAgICBpZiAoIWZpeGVkKSBkZWxldGUgc3ViLiRyZWY7XG4gICAgICByZXR1cm4gc3ViO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHN1Yi5hbGxPZikpIHtcbiAgICAgIGNvbnN0IHNjaGVtYXMgPSBzdWIuYWxsT2Y7XG5cbiAgICAgIGRlbGV0ZSBzdWIuYWxsT2Y7XG5cbiAgICAgIC8vIHRoaXMgaXMgdGhlIG9ubHkgY2FzZSB3aGVyZSBhbGwgc3ViLXNjaGVtYXNcbiAgICAgIC8vIG11c3QgYmUgcmVzb2x2ZWQgYmVmb3JlIGFueSBtZXJnZVxuICAgICAgc2NoZW1hcy5mb3JFYWNoKHN1YlNjaGVtYSA9PiB7XG4gICAgICAgIGNvbnN0IF9zdWIgPSByZWN1cnNpdmVVdGlsLnJlc29sdmVTY2hlbWEoc3ViU2NoZW1hLCBudWxsLCByb290UGF0aCk7XG5cbiAgICAgICAgLy8gY2FsbCBnaXZlbiB0aHVua3MgaWYgcHJlc2VudFxuICAgICAgICB1dGlscy5tZXJnZShzdWIsIHR5cGVvZiBfc3ViLnRodW5rID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyBfc3ViLnRodW5rKHN1YilcbiAgICAgICAgICA6IF9zdWIpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzdWIuYWxsT2YpKSB7XG4gICAgICAgICAgcmVjdXJzaXZlVXRpbC5yZXNvbHZlU2NoZW1hKHN1YiwgaW5kZXgsIHJvb3RQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3ViLm9uZU9mIHx8IHN1Yi5hbnlPZikpIHtcbiAgICAgIGNvbnN0IG1peCA9IHN1Yi5vbmVPZiB8fCBzdWIuYW55T2Y7XG5cbiAgICAgIC8vIHRlc3QgZXZlcnkgdmFsdWUgZnJvbSB0aGUgZW51bSBhZ2FpbnN0IGVhY2gtb25lT2ZcbiAgICAgIC8vIHNjaGVtYSwgb25seSB2YWx1ZXMgdGhhdCB2YWxpZGF0ZSBvbmNlIGFyZSBrZXB0XG4gICAgICBpZiAoc3ViLmVudW0gJiYgc3ViLm9uZU9mKSB7XG4gICAgICAgIHN1Yi5lbnVtID0gc3ViLmVudW0uZmlsdGVyKHggPT4gdXRpbHMudmFsaWRhdGUoeCwgbWl4KSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRodW5rKHJvb3RTY2hlbWEpIHtcbiAgICAgICAgICBjb25zdCBjb3B5ID0gdXRpbHMub21pdFByb3BzKHN1YiwgWydhbnlPZicsICdvbmVPZiddKTtcbiAgICAgICAgICBjb25zdCBmaXhlZCA9IHJhbmRvbS5waWNrKG1peCk7XG5cbiAgICAgICAgICB1dGlscy5tZXJnZShjb3B5LCBmaXhlZCk7XG5cbiAgICAgICAgICAvLyByZW1vdmUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGZyb20gbWVyZ2VkIHNjaGVtYXNcbiAgICAgICAgICBtaXguZm9yRWFjaChvbWl0ID0+IHtcbiAgICAgICAgICAgIGlmIChvbWl0LnJlcXVpcmVkICYmIG9taXQgIT09IGZpeGVkKSB7XG4gICAgICAgICAgICAgIG9taXQucmVxdWlyZWQuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluY2x1ZGVzS2V5ID0gY29weS5yZXF1aXJlZCAmJiBjb3B5LnJlcXVpcmVkLmluY2x1ZGVzKGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvcHkucHJvcGVydGllcyAmJiAhaW5jbHVkZXNLZXkpIHtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjb3B5LnByb3BlcnRpZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocm9vdFNjaGVtYSAmJiByb290U2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZSByb290U2NoZW1hLnByb3BlcnRpZXNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKHN1YikuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIGlmICgoQXJyYXkuaXNBcnJheShzdWJbcHJvcF0pIHx8IHR5cGVvZiBzdWJbcHJvcF0gPT09ICdvYmplY3QnKSAmJiAhdXRpbHMuaXNLZXkocHJvcCkpIHtcbiAgICAgICAgc3ViW3Byb3BdID0gcmVjdXJzaXZlVXRpbC5yZXNvbHZlU2NoZW1hKHN1Yltwcm9wXSwgcHJvcCwgcm9vdFBhdGguY29uY2F0KHByb3ApKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGF2b2lkIGV4dHJhIGNhbGxzIG9uIHN1Yi1zY2hlbWFzLCBmaXhlcyAjNDU4XG4gICAgaWYgKHJvb3RQYXRoKSB7XG4gICAgICBjb25zdCBsYXN0UHJvcCA9IHJvb3RQYXRoW3Jvb3RQYXRoLmxlbmd0aCAtIDFdO1xuXG4gICAgICBpZiAobGFzdFByb3AgPT09ICdwcm9wZXJ0aWVzJyB8fCBsYXN0UHJvcCA9PT0gJ2l0ZW1zJykge1xuICAgICAgICByZXR1cm4gc3ViO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb250YWluZXIud3JhcChzdWIpO1xuICB9O1xuXG4gIHJldHVybiByZWN1cnNpdmVVdGlsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRSZXNvbHZlU2NoZW1hO1xuIiwiaW1wb3J0IHsgZ2V0RGVwZW5kZW5jaWVzIH0gZnJvbSAnLi4vdmVuZG9yJztcbmltcG9ydCBvcHRpb25BUEkgZnJvbSAnLi4vYXBpL29wdGlvbic7XG5pbXBvcnQgdHJhdmVyc2UgZnJvbSAnLi90cmF2ZXJzZSc7XG5pbXBvcnQgcmFuZG9tIGZyb20gJy4vcmFuZG9tJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBidWlsZFJlc29sdmVTY2hlbWEgZnJvbSAnLi9idWlsZFJlc29sdmVTY2hlbWEnO1xuXG5mdW5jdGlvbiBwaWNrKGRhdGEpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZGF0YSlcbiAgICA/IHJhbmRvbS5waWNrKGRhdGEpXG4gICAgOiBkYXRhO1xufVxuXG5mdW5jdGlvbiBjeWNsZShkYXRhLCByZXZlcnNlKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgY29uc3QgdmFsdWUgPSByZXZlcnNlXG4gICAgPyBkYXRhLnBvcCgpXG4gICAgOiBkYXRhLnNoaWZ0KCk7XG5cbiAgaWYgKHJldmVyc2UpIHtcbiAgICBkYXRhLnVuc2hpZnQodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIGRhdGEucHVzaCh2YWx1ZSk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmUob2JqLCBkYXRhLCB2YWx1ZXMsIHByb3BlcnR5KSB7XG4gIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGlmICghdmFsdWVzKSB7XG4gICAgdmFsdWVzID0ge307XG4gIH1cblxuICBpZiAoIWRhdGEpIHtcbiAgICBkYXRhID0gb2JqO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmoubWFwKHggPT4gcmVzb2x2ZSh4LCBkYXRhLCB2YWx1ZXMsIHByb3BlcnR5KSk7XG4gIH1cblxuICBpZiAob2JqLmpzb25QYXRoKSB7XG4gICAgY29uc3QgeyBKU09OUGF0aCB9ID0gZ2V0RGVwZW5kZW5jaWVzKCk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSB0eXBlb2Ygb2JqLmpzb25QYXRoICE9PSAnb2JqZWN0J1xuICAgICAgPyB7IHBhdGg6IG9iai5qc29uUGF0aCB9XG4gICAgICA6IG9iai5qc29uUGF0aDtcblxuICAgIHBhcmFtcy5ncm91cCA9IG9iai5ncm91cCB8fCBwYXJhbXMuZ3JvdXAgfHwgcHJvcGVydHk7XG4gICAgcGFyYW1zLmN5Y2xlID0gb2JqLmN5Y2xlIHx8IHBhcmFtcy5jeWNsZSB8fCBmYWxzZTtcbiAgICBwYXJhbXMucmV2ZXJzZSA9IG9iai5yZXZlcnNlIHx8IHBhcmFtcy5yZXZlcnNlIHx8IGZhbHNlO1xuICAgIHBhcmFtcy5jb3VudCA9IG9iai5jb3VudCB8fCBwYXJhbXMuY291bnQgfHwgMTtcblxuICAgIGNvbnN0IGtleSA9IGAke3BhcmFtcy5ncm91cH1fXyR7cGFyYW1zLnBhdGh9YDtcblxuICAgIGlmICghdmFsdWVzW2tleV0pIHtcbiAgICAgIGlmIChwYXJhbXMuY291bnQgPiAxKSB7XG4gICAgICAgIHZhbHVlc1trZXldID0gSlNPTlBhdGgocGFyYW1zLnBhdGgsIGRhdGEpLnNsaWNlKDAsIHBhcmFtcy5jb3VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZXNba2V5XSA9IEpTT05QYXRoKHBhcmFtcy5wYXRoLCBkYXRhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmN5Y2xlIHx8IHBhcmFtcy5yZXZlcnNlKSB7XG4gICAgICByZXR1cm4gY3ljbGUodmFsdWVzW2tleV0sIHBhcmFtcy5yZXZlcnNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGljayh2YWx1ZXNba2V5XSk7XG4gIH1cblxuICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goayA9PiB7XG4gICAgb2JqW2tdID0gcmVzb2x2ZShvYmpba10sIGRhdGEsIHZhbHVlcywgayk7XG4gIH0pO1xuXG4gIHJldHVybiBvYmo7XG59XG5cbi8vIFRPRE8gcHJvdmlkZSB0eXBlcz9cbmZ1bmN0aW9uIHJ1bihyZWZzLCBzY2hlbWEsIGNvbnRhaW5lciwgc3luY2hyb25vdXMpIHtcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzY2hlbWEpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbnB1dCwgZXhwZWN0aW5nIG9iamVjdCBidXQgZ2l2ZW4gJHt0eXBlb2Ygc2NoZW1hfWApO1xuICB9XG5cbiAgY29uc3QgcmVmRGVwdGhNaW4gPSBvcHRpb25BUEkoJ3JlZkRlcHRoTWluJykgfHwgMDtcbiAgY29uc3QgcmVmRGVwdGhNYXggPSBvcHRpb25BUEkoJ3JlZkRlcHRoTWF4JykgfHwgMztcblxuICB0cnkge1xuICAgIGNvbnN0IHsgcmVzb2x2ZVNjaGVtYSB9ID0gYnVpbGRSZXNvbHZlU2NoZW1hKHtcbiAgICAgIHJlZnMsXG4gICAgICBzY2hlbWEsXG4gICAgICBjb250YWluZXIsXG4gICAgICBzeW5jaHJvbm91cyxcbiAgICAgIHJlZkRlcHRoTWluLFxuICAgICAgcmVmRGVwdGhNYXgsXG4gICAgfSk7XG4gICAgY29uc3QgcmVzdWx0ID0gdHJhdmVyc2UodXRpbHMuY2xvbmUoc2NoZW1hKSwgW10sIHJlc29sdmVTY2hlbWEpO1xuXG4gICAgaWYgKG9wdGlvbkFQSSgncmVzb2x2ZUpzb25QYXRoJykpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiByZXNvbHZlKHJlc3VsdC52YWx1ZSksXG4gICAgICAgIGNvbnRleHQ6IHJlc3VsdC5jb250ZXh0LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUucGF0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2UubWVzc2FnZX0gaW4gLyR7ZS5wYXRoLmpvaW4oJy8nKX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcnVuO1xuIiwiZnVuY3Rpb24gcmVuZGVySlMocmVzKSB7XG4gIHJldHVybiByZXMudmFsdWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlbmRlckpTO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDaGFyID0ge1xuICBBTkNIT1I6ICcmJyxcbiAgQ09NTUVOVDogJyMnLFxuICBUQUc6ICchJyxcbiAgRElSRUNUSVZFU19FTkQ6ICctJyxcbiAgRE9DVU1FTlRfRU5EOiAnLidcbn07XG5jb25zdCBUeXBlID0ge1xuICBBTElBUzogJ0FMSUFTJyxcbiAgQkxBTktfTElORTogJ0JMQU5LX0xJTkUnLFxuICBCTE9DS19GT0xERUQ6ICdCTE9DS19GT0xERUQnLFxuICBCTE9DS19MSVRFUkFMOiAnQkxPQ0tfTElURVJBTCcsXG4gIENPTU1FTlQ6ICdDT01NRU5UJyxcbiAgRElSRUNUSVZFOiAnRElSRUNUSVZFJyxcbiAgRE9DVU1FTlQ6ICdET0NVTUVOVCcsXG4gIEZMT1dfTUFQOiAnRkxPV19NQVAnLFxuICBGTE9XX1NFUTogJ0ZMT1dfU0VRJyxcbiAgTUFQOiAnTUFQJyxcbiAgTUFQX0tFWTogJ01BUF9LRVknLFxuICBNQVBfVkFMVUU6ICdNQVBfVkFMVUUnLFxuICBQTEFJTjogJ1BMQUlOJyxcbiAgUVVPVEVfRE9VQkxFOiAnUVVPVEVfRE9VQkxFJyxcbiAgUVVPVEVfU0lOR0xFOiAnUVVPVEVfU0lOR0xFJyxcbiAgU0VROiAnU0VRJyxcbiAgU0VRX0lURU06ICdTRVFfSVRFTSdcbn07XG5jb25zdCBkZWZhdWx0VGFnUHJlZml4ID0gJ3RhZzp5YW1sLm9yZywyMDAyOic7XG5jb25zdCBkZWZhdWx0VGFncyA9IHtcbiAgTUFQOiAndGFnOnlhbWwub3JnLDIwMDI6bWFwJyxcbiAgU0VROiAndGFnOnlhbWwub3JnLDIwMDI6c2VxJyxcbiAgU1RSOiAndGFnOnlhbWwub3JnLDIwMDI6c3RyJ1xufTtcblxuZnVuY3Rpb24gZmluZExpbmVTdGFydHMoc3JjKSB7XG4gIGNvbnN0IGxzID0gWzBdO1xuICBsZXQgb2Zmc2V0ID0gc3JjLmluZGV4T2YoJ1xcbicpO1xuXG4gIHdoaWxlIChvZmZzZXQgIT09IC0xKSB7XG4gICAgb2Zmc2V0ICs9IDE7XG4gICAgbHMucHVzaChvZmZzZXQpO1xuICAgIG9mZnNldCA9IHNyYy5pbmRleE9mKCdcXG4nLCBvZmZzZXQpO1xuICB9XG5cbiAgcmV0dXJuIGxzO1xufVxuXG5mdW5jdGlvbiBnZXRTcmNJbmZvKGNzdCkge1xuICBsZXQgbGluZVN0YXJ0cywgc3JjO1xuXG4gIGlmICh0eXBlb2YgY3N0ID09PSAnc3RyaW5nJykge1xuICAgIGxpbmVTdGFydHMgPSBmaW5kTGluZVN0YXJ0cyhjc3QpO1xuICAgIHNyYyA9IGNzdDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjc3QpKSBjc3QgPSBjc3RbMF07XG5cbiAgICBpZiAoY3N0ICYmIGNzdC5jb250ZXh0KSB7XG4gICAgICBpZiAoIWNzdC5saW5lU3RhcnRzKSBjc3QubGluZVN0YXJ0cyA9IGZpbmRMaW5lU3RhcnRzKGNzdC5jb250ZXh0LnNyYyk7XG4gICAgICBsaW5lU3RhcnRzID0gY3N0LmxpbmVTdGFydHM7XG4gICAgICBzcmMgPSBjc3QuY29udGV4dC5zcmM7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBsaW5lU3RhcnRzLFxuICAgIHNyY1xuICB9O1xufVxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMaW5lUG9zIC0gT25lLWluZGV4ZWQgcG9zaXRpb24gaW4gdGhlIHNvdXJjZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxpbmVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjb2xcbiAqL1xuXG4vKipcbiAqIERldGVybWluZSB0aGUgbGluZS9jb2wgcG9zaXRpb24gbWF0Y2hpbmcgYSBjaGFyYWN0ZXIgb2Zmc2V0LlxuICpcbiAqIEFjY2VwdHMgYSBzb3VyY2Ugc3RyaW5nIG9yIGEgQ1NUIGRvY3VtZW50IGFzIHRoZSBzZWNvbmQgcGFyYW1ldGVyLiBXaXRoXG4gKiB0aGUgbGF0dGVyLCBzdGFydGluZyBpbmRpY2VzIGZvciBsaW5lcyBhcmUgY2FjaGVkIGluIHRoZSBkb2N1bWVudCBhc1xuICogYGxpbmVTdGFydHM6IG51bWJlcltdYC5cbiAqXG4gKiBSZXR1cm5zIGEgb25lLWluZGV4ZWQgYHsgbGluZSwgY29sIH1gIGxvY2F0aW9uIGlmIGZvdW5kLCBvclxuICogYHVuZGVmaW5lZGAgb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcbiAqIEBwYXJhbSB7c3RyaW5nfERvY3VtZW50fERvY3VtZW50W119IGNzdFxuICogQHJldHVybnMgez9MaW5lUG9zfVxuICovXG5cblxuZnVuY3Rpb24gZ2V0TGluZVBvcyhvZmZzZXQsIGNzdCkge1xuICBpZiAodHlwZW9mIG9mZnNldCAhPT0gJ251bWJlcicgfHwgb2Zmc2V0IDwgMCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHtcbiAgICBsaW5lU3RhcnRzLFxuICAgIHNyY1xuICB9ID0gZ2V0U3JjSW5mbyhjc3QpO1xuICBpZiAoIWxpbmVTdGFydHMgfHwgIXNyYyB8fCBvZmZzZXQgPiBzcmMubGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVTdGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBzdGFydCA9IGxpbmVTdGFydHNbaV07XG5cbiAgICBpZiAob2Zmc2V0IDwgc3RhcnQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxpbmU6IGksXG4gICAgICAgIGNvbDogb2Zmc2V0IC0gbGluZVN0YXJ0c1tpIC0gMV0gKyAxXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChvZmZzZXQgPT09IHN0YXJ0KSByZXR1cm4ge1xuICAgICAgbGluZTogaSArIDEsXG4gICAgICBjb2w6IDFcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgbGluZSA9IGxpbmVTdGFydHMubGVuZ3RoO1xuICByZXR1cm4ge1xuICAgIGxpbmUsXG4gICAgY29sOiBvZmZzZXQgLSBsaW5lU3RhcnRzW2xpbmUgLSAxXSArIDFcbiAgfTtcbn1cbi8qKlxuICogR2V0IGEgc3BlY2lmaWVkIGxpbmUgZnJvbSB0aGUgc291cmNlLlxuICpcbiAqIEFjY2VwdHMgYSBzb3VyY2Ugc3RyaW5nIG9yIGEgQ1NUIGRvY3VtZW50IGFzIHRoZSBzZWNvbmQgcGFyYW1ldGVyLiBXaXRoXG4gKiB0aGUgbGF0dGVyLCBzdGFydGluZyBpbmRpY2VzIGZvciBsaW5lcyBhcmUgY2FjaGVkIGluIHRoZSBkb2N1bWVudCBhc1xuICogYGxpbmVTdGFydHM6IG51bWJlcltdYC5cbiAqXG4gKiBSZXR1cm5zIHRoZSBsaW5lIGFzIGEgc3RyaW5nIGlmIGZvdW5kLCBvciBgbnVsbGAgb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lIE9uZS1pbmRleGVkIGxpbmUgbnVtYmVyXG4gKiBAcGFyYW0ge3N0cmluZ3xEb2N1bWVudHxEb2N1bWVudFtdfSBjc3RcbiAqIEByZXR1cm5zIHs/c3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIGdldExpbmUobGluZSwgY3N0KSB7XG4gIGNvbnN0IHtcbiAgICBsaW5lU3RhcnRzLFxuICAgIHNyY1xuICB9ID0gZ2V0U3JjSW5mbyhjc3QpO1xuICBpZiAoIWxpbmVTdGFydHMgfHwgIShsaW5lID49IDEpIHx8IGxpbmUgPiBsaW5lU3RhcnRzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHN0YXJ0ID0gbGluZVN0YXJ0c1tsaW5lIC0gMV07XG4gIGxldCBlbmQgPSBsaW5lU3RhcnRzW2xpbmVdOyAvLyB1bmRlZmluZWQgZm9yIGxhc3QgbGluZTsgdGhhdCdzIG9rIGZvciBzbGljZSgpXG5cbiAgd2hpbGUgKGVuZCAmJiBlbmQgPiBzdGFydCAmJiBzcmNbZW5kIC0gMV0gPT09ICdcXG4nKSAtLWVuZDtcblxuICByZXR1cm4gc3JjLnNsaWNlKHN0YXJ0LCBlbmQpO1xufVxuLyoqXG4gKiBQcmV0dHktcHJpbnQgdGhlIHN0YXJ0aW5nIGxpbmUgZnJvbSB0aGUgc291cmNlIGluZGljYXRlZCBieSB0aGUgcmFuZ2UgYHBvc2BcbiAqXG4gKiBUcmltcyBvdXRwdXQgdG8gYG1heFdpZHRoYCBjaGFycyB3aGlsZSBrZWVwaW5nIHRoZSBzdGFydGluZyBjb2x1bW4gdmlzaWJsZSxcbiAqIHVzaW5nIGDigKZgIGF0IGVpdGhlciBlbmQgdG8gaW5kaWNhdGUgZHJvcHBlZCBjaGFyYWN0ZXJzLlxuICpcbiAqIFJldHVybnMgYSB0d28tbGluZSBzdHJpbmcgKG9yIGBudWxsYCkgd2l0aCBgXFxuYCBhcyBzZXBhcmF0b3I7IHRoZSBzZWNvbmQgbGluZVxuICogd2lsbCBob2xkIGFwcHJvcHJpYXRlbHkgaW5kZW50ZWQgYF5gIG1hcmtzIGluZGljYXRpbmcgdGhlIGNvbHVtbiByYW5nZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9zXG4gKiBAcGFyYW0ge0xpbmVQb3N9IHBvcy5zdGFydFxuICogQHBhcmFtIHtMaW5lUG9zfSBbcG9zLmVuZF1cbiAqIEBwYXJhbSB7c3RyaW5nfERvY3VtZW50fERvY3VtZW50W10qfSBjc3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4V2lkdGg9ODBdXG4gKiBAcmV0dXJucyB7P3N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiBnZXRQcmV0dHlDb250ZXh0KHtcbiAgc3RhcnQsXG4gIGVuZFxufSwgY3N0LCBtYXhXaWR0aCA9IDgwKSB7XG4gIGxldCBzcmMgPSBnZXRMaW5lKHN0YXJ0LmxpbmUsIGNzdCk7XG4gIGlmICghc3JjKSByZXR1cm4gbnVsbDtcbiAgbGV0IHtcbiAgICBjb2xcbiAgfSA9IHN0YXJ0O1xuXG4gIGlmIChzcmMubGVuZ3RoID4gbWF4V2lkdGgpIHtcbiAgICBpZiAoY29sIDw9IG1heFdpZHRoIC0gMTApIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHIoMCwgbWF4V2lkdGggLSAxKSArICfigKYnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBoYWxmV2lkdGggPSBNYXRoLnJvdW5kKG1heFdpZHRoIC8gMik7XG4gICAgICBpZiAoc3JjLmxlbmd0aCA+IGNvbCArIGhhbGZXaWR0aCkgc3JjID0gc3JjLnN1YnN0cigwLCBjb2wgKyBoYWxmV2lkdGggLSAxKSArICfigKYnO1xuICAgICAgY29sIC09IHNyYy5sZW5ndGggLSBtYXhXaWR0aDtcbiAgICAgIHNyYyA9ICfigKYnICsgc3JjLnN1YnN0cigxIC0gbWF4V2lkdGgpO1xuICAgIH1cbiAgfVxuXG4gIGxldCBlcnJMZW4gPSAxO1xuICBsZXQgZXJyRW5kID0gJyc7XG5cbiAgaWYgKGVuZCkge1xuICAgIGlmIChlbmQubGluZSA9PT0gc3RhcnQubGluZSAmJiBjb2wgKyAoZW5kLmNvbCAtIHN0YXJ0LmNvbCkgPD0gbWF4V2lkdGggKyAxKSB7XG4gICAgICBlcnJMZW4gPSBlbmQuY29sIC0gc3RhcnQuY29sO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJMZW4gPSBNYXRoLm1pbihzcmMubGVuZ3RoICsgMSwgbWF4V2lkdGgpIC0gY29sO1xuICAgICAgZXJyRW5kID0gJ+KApic7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgb2Zmc2V0ID0gY29sID4gMSA/ICcgJy5yZXBlYXQoY29sIC0gMSkgOiAnJztcbiAgY29uc3QgZXJyID0gJ14nLnJlcGVhdChlcnJMZW4pO1xuICByZXR1cm4gYCR7c3JjfVxcbiR7b2Zmc2V0fSR7ZXJyfSR7ZXJyRW5kfWA7XG59XG5cbmNsYXNzIFJhbmdlIHtcbiAgc3RhdGljIGNvcHkob3JpZykge1xuICAgIHJldHVybiBuZXcgUmFuZ2Uob3JpZy5zdGFydCwgb3JpZy5lbmQpO1xuICB9XG5cbiAgY29uc3RydWN0b3Ioc3RhcnQsIGVuZCkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmVuZCA9IGVuZCB8fCBzdGFydDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLnN0YXJ0ICE9PSAnbnVtYmVyJyB8fCAhdGhpcy5lbmQgfHwgdGhpcy5lbmQgPD0gdGhpcy5zdGFydDtcbiAgfVxuICAvKipcbiAgICogU2V0IGBvcmlnU3RhcnRgIGFuZCBgb3JpZ0VuZGAgdG8gcG9pbnQgdG8gdGhlIG9yaWdpbmFsIHNvdXJjZSByYW5nZSBmb3JcbiAgICogdGhpcyBub2RlLCB3aGljaCBtYXkgZGlmZmVyIGR1ZSB0byBkcm9wcGVkIENSIGNoYXJhY3RlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyW119IGNyIC0gUG9zaXRpb25zIG9mIGRyb3BwZWQgQ1IgY2hhcmFjdGVyc1xuICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IC0gU3RhcnRpbmcgaW5kZXggb2YgYGNyYCBmcm9tIHRoZSBsYXN0IGNhbGxcbiAgICogQHJldHVybnMge251bWJlcn0gLSBUaGUgbmV4dCBvZmZzZXQsIG1hdGNoaW5nIHRoZSBvbmUgZm91bmQgZm9yIGBvcmlnU3RhcnRgXG4gICAqL1xuXG5cbiAgc2V0T3JpZ1JhbmdlKGNyLCBvZmZzZXQpIHtcbiAgICBjb25zdCB7XG4gICAgICBzdGFydCxcbiAgICAgIGVuZFxuICAgIH0gPSB0aGlzO1xuXG4gICAgaWYgKGNyLmxlbmd0aCA9PT0gMCB8fCBlbmQgPD0gY3JbMF0pIHtcbiAgICAgIHRoaXMub3JpZ1N0YXJ0ID0gc3RhcnQ7XG4gICAgICB0aGlzLm9yaWdFbmQgPSBlbmQ7XG4gICAgICByZXR1cm4gb2Zmc2V0O1xuICAgIH1cblxuICAgIGxldCBpID0gb2Zmc2V0O1xuXG4gICAgd2hpbGUgKGkgPCBjci5sZW5ndGgpIHtcbiAgICAgIGlmIChjcltpXSA+IHN0YXJ0KSBicmVhaztlbHNlICsraTtcbiAgICB9XG5cbiAgICB0aGlzLm9yaWdTdGFydCA9IHN0YXJ0ICsgaTtcbiAgICBjb25zdCBuZXh0T2Zmc2V0ID0gaTtcblxuICAgIHdoaWxlIChpIDwgY3IubGVuZ3RoKSB7XG4gICAgICAvLyBpZiBlbmQgd2FzIGF0IFxcbiwgaXQgc2hvdWxkIG5vdyBiZSBhdCBcXHJcbiAgICAgIGlmIChjcltpXSA+PSBlbmQpIGJyZWFrO2Vsc2UgKytpO1xuICAgIH1cblxuICAgIHRoaXMub3JpZ0VuZCA9IGVuZCArIGk7XG4gICAgcmV0dXJuIG5leHRPZmZzZXQ7XG4gIH1cblxufVxuXG4vKiogUm9vdCBjbGFzcyBvZiBhbGwgbm9kZXMgKi9cblxuY2xhc3MgTm9kZSB7XG4gIHN0YXRpYyBhZGRTdHJpbmdUZXJtaW5hdG9yKHNyYywgb2Zmc2V0LCBzdHIpIHtcbiAgICBpZiAoc3RyW3N0ci5sZW5ndGggLSAxXSA9PT0gJ1xcbicpIHJldHVybiBzdHI7XG4gICAgY29uc3QgbmV4dCA9IE5vZGUuZW5kT2ZXaGl0ZVNwYWNlKHNyYywgb2Zmc2V0KTtcbiAgICByZXR1cm4gbmV4dCA+PSBzcmMubGVuZ3RoIHx8IHNyY1tuZXh0XSA9PT0gJ1xcbicgPyBzdHIgKyAnXFxuJyA6IHN0cjtcbiAgfSAvLyBeKC0tLXwuLi4pXG5cblxuICBzdGF0aWMgYXREb2N1bWVudEJvdW5kYXJ5KHNyYywgb2Zmc2V0LCBzZXApIHtcbiAgICBjb25zdCBjaDAgPSBzcmNbb2Zmc2V0XTtcbiAgICBpZiAoIWNoMCkgcmV0dXJuIHRydWU7XG4gICAgY29uc3QgcHJldiA9IHNyY1tvZmZzZXQgLSAxXTtcbiAgICBpZiAocHJldiAmJiBwcmV2ICE9PSAnXFxuJykgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKHNlcCkge1xuICAgICAgaWYgKGNoMCAhPT0gc2VwKSByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjaDAgIT09IENoYXIuRElSRUNUSVZFU19FTkQgJiYgY2gwICE9PSBDaGFyLkRPQ1VNRU5UX0VORCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGNoMSA9IHNyY1tvZmZzZXQgKyAxXTtcbiAgICBjb25zdCBjaDIgPSBzcmNbb2Zmc2V0ICsgMl07XG4gICAgaWYgKGNoMSAhPT0gY2gwIHx8IGNoMiAhPT0gY2gwKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgY2gzID0gc3JjW29mZnNldCArIDNdO1xuICAgIHJldHVybiAhY2gzIHx8IGNoMyA9PT0gJ1xcbicgfHwgY2gzID09PSAnXFx0JyB8fCBjaDMgPT09ICcgJztcbiAgfVxuXG4gIHN0YXRpYyBlbmRPZklkZW50aWZpZXIoc3JjLCBvZmZzZXQpIHtcbiAgICBsZXQgY2ggPSBzcmNbb2Zmc2V0XTtcbiAgICBjb25zdCBpc1ZlcmJhdGltID0gY2ggPT09ICc8JztcbiAgICBjb25zdCBub3RPayA9IGlzVmVyYmF0aW0gPyBbJ1xcbicsICdcXHQnLCAnICcsICc+J10gOiBbJ1xcbicsICdcXHQnLCAnICcsICdbJywgJ10nLCAneycsICd9JywgJywnXTtcblxuICAgIHdoaWxlIChjaCAmJiBub3RPay5pbmRleE9mKGNoKSA9PT0gLTEpIGNoID0gc3JjW29mZnNldCArPSAxXTtcblxuICAgIGlmIChpc1ZlcmJhdGltICYmIGNoID09PSAnPicpIG9mZnNldCArPSAxO1xuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBzdGF0aWMgZW5kT2ZJbmRlbnQoc3JjLCBvZmZzZXQpIHtcbiAgICBsZXQgY2ggPSBzcmNbb2Zmc2V0XTtcblxuICAgIHdoaWxlIChjaCA9PT0gJyAnKSBjaCA9IHNyY1tvZmZzZXQgKz0gMV07XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgc3RhdGljIGVuZE9mTGluZShzcmMsIG9mZnNldCkge1xuICAgIGxldCBjaCA9IHNyY1tvZmZzZXRdO1xuXG4gICAgd2hpbGUgKGNoICYmIGNoICE9PSAnXFxuJykgY2ggPSBzcmNbb2Zmc2V0ICs9IDFdO1xuXG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxuXG4gIHN0YXRpYyBlbmRPZldoaXRlU3BhY2Uoc3JjLCBvZmZzZXQpIHtcbiAgICBsZXQgY2ggPSBzcmNbb2Zmc2V0XTtcblxuICAgIHdoaWxlIChjaCA9PT0gJ1xcdCcgfHwgY2ggPT09ICcgJykgY2ggPSBzcmNbb2Zmc2V0ICs9IDFdO1xuXG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxuXG4gIHN0YXRpYyBzdGFydE9mTGluZShzcmMsIG9mZnNldCkge1xuICAgIGxldCBjaCA9IHNyY1tvZmZzZXQgLSAxXTtcbiAgICBpZiAoY2ggPT09ICdcXG4nKSByZXR1cm4gb2Zmc2V0O1xuXG4gICAgd2hpbGUgKGNoICYmIGNoICE9PSAnXFxuJykgY2ggPSBzcmNbb2Zmc2V0IC09IDFdO1xuXG4gICAgcmV0dXJuIG9mZnNldCArIDE7XG4gIH1cbiAgLyoqXG4gICAqIEVuZCBvZiBpbmRlbnRhdGlvbiwgb3IgbnVsbCBpZiB0aGUgbGluZSdzIGluZGVudCBsZXZlbCBpcyBub3QgbW9yZVxuICAgKiB0aGFuIGBpbmRlbnRgXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGVudFxuICAgKiBAcGFyYW0ge251bWJlcn0gbGluZVN0YXJ0XG4gICAqIEByZXR1cm5zIHs/bnVtYmVyfVxuICAgKi9cblxuXG4gIHN0YXRpYyBlbmRPZkJsb2NrSW5kZW50KHNyYywgaW5kZW50LCBsaW5lU3RhcnQpIHtcbiAgICBjb25zdCBpbkVuZCA9IE5vZGUuZW5kT2ZJbmRlbnQoc3JjLCBsaW5lU3RhcnQpO1xuXG4gICAgaWYgKGluRW5kID4gbGluZVN0YXJ0ICsgaW5kZW50KSB7XG4gICAgICByZXR1cm4gaW5FbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHdzRW5kID0gTm9kZS5lbmRPZldoaXRlU3BhY2Uoc3JjLCBpbkVuZCk7XG4gICAgICBjb25zdCBjaCA9IHNyY1t3c0VuZF07XG4gICAgICBpZiAoIWNoIHx8IGNoID09PSAnXFxuJykgcmV0dXJuIHdzRW5kO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3RhdGljIGF0Qmxhbmsoc3JjLCBvZmZzZXQsIGVuZEFzQmxhbmspIHtcbiAgICBjb25zdCBjaCA9IHNyY1tvZmZzZXRdO1xuICAgIHJldHVybiBjaCA9PT0gJ1xcbicgfHwgY2ggPT09ICdcXHQnIHx8IGNoID09PSAnICcgfHwgZW5kQXNCbGFuayAmJiAhY2g7XG4gIH1cblxuICBzdGF0aWMgbmV4dE5vZGVJc0luZGVudGVkKGNoLCBpbmRlbnREaWZmLCBpbmRpY2F0b3JBc0luZGVudCkge1xuICAgIGlmICghY2ggfHwgaW5kZW50RGlmZiA8IDApIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaW5kZW50RGlmZiA+IDApIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBpbmRpY2F0b3JBc0luZGVudCAmJiBjaCA9PT0gJy0nO1xuICB9IC8vIHNob3VsZCBiZSBhdCBsaW5lIG9yIHN0cmluZyBlbmQsIG9yIGF0IG5leHQgbm9uLXdoaXRlc3BhY2UgY2hhclxuXG5cbiAgc3RhdGljIG5vcm1hbGl6ZU9mZnNldChzcmMsIG9mZnNldCkge1xuICAgIGNvbnN0IGNoID0gc3JjW29mZnNldF07XG4gICAgcmV0dXJuICFjaCA/IG9mZnNldCA6IGNoICE9PSAnXFxuJyAmJiBzcmNbb2Zmc2V0IC0gMV0gPT09ICdcXG4nID8gb2Zmc2V0IC0gMSA6IE5vZGUuZW5kT2ZXaGl0ZVNwYWNlKHNyYywgb2Zmc2V0KTtcbiAgfSAvLyBmb2xkIHNpbmdsZSBuZXdsaW5lIGludG8gc3BhY2UsIG11bHRpcGxlIG5ld2xpbmVzIHRvIE4gLSAxIG5ld2xpbmVzXG4gIC8vIHByZXN1bWVzIHNyY1tvZmZzZXRdID09PSAnXFxuJ1xuXG5cbiAgc3RhdGljIGZvbGROZXdsaW5lKHNyYywgb2Zmc2V0LCBpbmRlbnQpIHtcbiAgICBsZXQgaW5Db3VudCA9IDA7XG4gICAgbGV0IGVycm9yID0gZmFsc2U7XG4gICAgbGV0IGZvbGQgPSAnJztcbiAgICBsZXQgY2ggPSBzcmNbb2Zmc2V0ICsgMV07XG5cbiAgICB3aGlsZSAoY2ggPT09ICcgJyB8fCBjaCA9PT0gJ1xcdCcgfHwgY2ggPT09ICdcXG4nKSB7XG4gICAgICBzd2l0Y2ggKGNoKSB7XG4gICAgICAgIGNhc2UgJ1xcbic6XG4gICAgICAgICAgaW5Db3VudCA9IDA7XG4gICAgICAgICAgb2Zmc2V0ICs9IDE7XG4gICAgICAgICAgZm9sZCArPSAnXFxuJztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdcXHQnOlxuICAgICAgICAgIGlmIChpbkNvdW50IDw9IGluZGVudCkgZXJyb3IgPSB0cnVlO1xuICAgICAgICAgIG9mZnNldCA9IE5vZGUuZW5kT2ZXaGl0ZVNwYWNlKHNyYywgb2Zmc2V0ICsgMikgLSAxO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgIGluQ291bnQgKz0gMTtcbiAgICAgICAgICBvZmZzZXQgKz0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2ggPSBzcmNbb2Zmc2V0ICsgMV07XG4gICAgfVxuXG4gICAgaWYgKCFmb2xkKSBmb2xkID0gJyAnO1xuICAgIGlmIChjaCAmJiBpbkNvdW50IDw9IGluZGVudCkgZXJyb3IgPSB0cnVlO1xuICAgIHJldHVybiB7XG4gICAgICBmb2xkLFxuICAgICAgb2Zmc2V0LFxuICAgICAgZXJyb3JcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IodHlwZSwgcHJvcHMsIGNvbnRleHQpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbnRleHQnLCB7XG4gICAgICB2YWx1ZTogY29udGV4dCB8fCBudWxsLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICB0aGlzLmVycm9yID0gbnVsbDtcbiAgICB0aGlzLnJhbmdlID0gbnVsbDtcbiAgICB0aGlzLnZhbHVlUmFuZ2UgPSBudWxsO1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcyB8fCBbXTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICB9XG5cbiAgZ2V0UHJvcFZhbHVlKGlkeCwga2V5LCBza2lwS2V5KSB7XG4gICAgaWYgKCF0aGlzLmNvbnRleHQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHtcbiAgICAgIHNyY1xuICAgIH0gPSB0aGlzLmNvbnRleHQ7XG4gICAgY29uc3QgcHJvcCA9IHRoaXMucHJvcHNbaWR4XTtcbiAgICByZXR1cm4gcHJvcCAmJiBzcmNbcHJvcC5zdGFydF0gPT09IGtleSA/IHNyYy5zbGljZShwcm9wLnN0YXJ0ICsgKHNraXBLZXkgPyAxIDogMCksIHByb3AuZW5kKSA6IG51bGw7XG4gIH1cblxuICBnZXQgYW5jaG9yKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3QgYW5jaG9yID0gdGhpcy5nZXRQcm9wVmFsdWUoaSwgQ2hhci5BTkNIT1IsIHRydWUpO1xuICAgICAgaWYgKGFuY2hvciAhPSBudWxsKSByZXR1cm4gYW5jaG9yO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0IGNvbW1lbnQoKSB7XG4gICAgY29uc3QgY29tbWVudHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5sZW5ndGg7ICsraSkge1xuICAgICAgY29uc3QgY29tbWVudCA9IHRoaXMuZ2V0UHJvcFZhbHVlKGksIENoYXIuQ09NTUVOVCwgdHJ1ZSk7XG4gICAgICBpZiAoY29tbWVudCAhPSBudWxsKSBjb21tZW50cy5wdXNoKGNvbW1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBjb21tZW50cy5sZW5ndGggPiAwID8gY29tbWVudHMuam9pbignXFxuJykgOiBudWxsO1xuICB9XG5cbiAgY29tbWVudEhhc1JlcXVpcmVkV2hpdGVzcGFjZShzdGFydCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNyY1xuICAgIH0gPSB0aGlzLmNvbnRleHQ7XG4gICAgaWYgKHRoaXMuaGVhZGVyICYmIHN0YXJ0ID09PSB0aGlzLmhlYWRlci5lbmQpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXRoaXMudmFsdWVSYW5nZSkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHtcbiAgICAgIGVuZFxuICAgIH0gPSB0aGlzLnZhbHVlUmFuZ2U7XG4gICAgcmV0dXJuIHN0YXJ0ICE9PSBlbmQgfHwgTm9kZS5hdEJsYW5rKHNyYywgZW5kIC0gMSk7XG4gIH1cblxuICBnZXQgaGFzQ29tbWVudCgpIHtcbiAgICBpZiAodGhpcy5jb250ZXh0KSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHNyY1xuICAgICAgfSA9IHRoaXMuY29udGV4dDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChzcmNbdGhpcy5wcm9wc1tpXS5zdGFydF0gPT09IENoYXIuQ09NTUVOVCkgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGhhc1Byb3BzKCkge1xuICAgIGlmICh0aGlzLmNvbnRleHQpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc3JjXG4gICAgICB9ID0gdGhpcy5jb250ZXh0O1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHNyY1t0aGlzLnByb3BzW2ldLnN0YXJ0XSAhPT0gQ2hhci5DT01NRU5UKSByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgaW5jbHVkZXNUcmFpbGluZ0xpbmVzKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBqc29uTGlrZSgpIHtcbiAgICBjb25zdCBqc29uTGlrZVR5cGVzID0gW1R5cGUuRkxPV19NQVAsIFR5cGUuRkxPV19TRVEsIFR5cGUuUVVPVEVfRE9VQkxFLCBUeXBlLlFVT1RFX1NJTkdMRV07XG4gICAgcmV0dXJuIGpzb25MaWtlVHlwZXMuaW5kZXhPZih0aGlzLnR5cGUpICE9PSAtMTtcbiAgfVxuXG4gIGdldCByYW5nZUFzTGluZVBvcygpIHtcbiAgICBpZiAoIXRoaXMucmFuZ2UgfHwgIXRoaXMuY29udGV4dCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBzdGFydCA9IGdldExpbmVQb3ModGhpcy5yYW5nZS5zdGFydCwgdGhpcy5jb250ZXh0LnJvb3QpO1xuICAgIGlmICghc3RhcnQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgZW5kID0gZ2V0TGluZVBvcyh0aGlzLnJhbmdlLmVuZCwgdGhpcy5jb250ZXh0LnJvb3QpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGFydCxcbiAgICAgIGVuZFxuICAgIH07XG4gIH1cblxuICBnZXQgcmF3VmFsdWUoKSB7XG4gICAgaWYgKCF0aGlzLnZhbHVlUmFuZ2UgfHwgIXRoaXMuY29udGV4dCkgcmV0dXJuIG51bGw7XG4gICAgY29uc3Qge1xuICAgICAgc3RhcnQsXG4gICAgICBlbmRcbiAgICB9ID0gdGhpcy52YWx1ZVJhbmdlO1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQuc3JjLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICB9XG5cbiAgZ2V0IHRhZygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IHRhZyA9IHRoaXMuZ2V0UHJvcFZhbHVlKGksIENoYXIuVEFHLCBmYWxzZSk7XG5cbiAgICAgIGlmICh0YWcgIT0gbnVsbCkge1xuICAgICAgICBpZiAodGFnWzFdID09PSAnPCcpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVyYmF0aW06IHRhZy5zbGljZSgyLCAtMSlcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICAgICAgICAgIGNvbnN0IFtfLCBoYW5kbGUsIHN1ZmZpeF0gPSB0YWcubWF0Y2goL14oLiohKShbXiFdKikkLyk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhhbmRsZSxcbiAgICAgICAgICAgIHN1ZmZpeFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldCB2YWx1ZVJhbmdlQ29udGFpbnNOZXdsaW5lKCkge1xuICAgIGlmICghdGhpcy52YWx1ZVJhbmdlIHx8ICF0aGlzLmNvbnRleHQpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCB7XG4gICAgICBzdGFydCxcbiAgICAgIGVuZFxuICAgIH0gPSB0aGlzLnZhbHVlUmFuZ2U7XG4gICAgY29uc3Qge1xuICAgICAgc3JjXG4gICAgfSA9IHRoaXMuY29udGV4dDtcblxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICBpZiAoc3JjW2ldID09PSAnXFxuJykgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcGFyc2VDb21tZW50KHN0YXJ0KSB7XG4gICAgY29uc3Qge1xuICAgICAgc3JjXG4gICAgfSA9IHRoaXMuY29udGV4dDtcblxuICAgIGlmIChzcmNbc3RhcnRdID09PSBDaGFyLkNPTU1FTlQpIHtcbiAgICAgIGNvbnN0IGVuZCA9IE5vZGUuZW5kT2ZMaW5lKHNyYywgc3RhcnQgKyAxKTtcbiAgICAgIGNvbnN0IGNvbW1lbnRSYW5nZSA9IG5ldyBSYW5nZShzdGFydCwgZW5kKTtcbiAgICAgIHRoaXMucHJvcHMucHVzaChjb21tZW50UmFuZ2UpO1xuICAgICAgcmV0dXJuIGVuZDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnQ7XG4gIH1cbiAgLyoqXG4gICAqIFBvcHVsYXRlcyB0aGUgYG9yaWdTdGFydGAgYW5kIGBvcmlnRW5kYCB2YWx1ZXMgb2YgYWxsIHJhbmdlcyBmb3IgdGhpc1xuICAgKiBub2RlLiBFeHRlbmRlZCBieSBjaGlsZCBjbGFzc2VzIHRvIGhhbmRsZSBkZXNjZW5kYW50IG5vZGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcltdfSBjciAtIFBvc2l0aW9ucyBvZiBkcm9wcGVkIENSIGNoYXJhY3RlcnNcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCAtIFN0YXJ0aW5nIGluZGV4IG9mIGBjcmAgZnJvbSB0aGUgbGFzdCBjYWxsXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IC0gVGhlIG5leHQgb2Zmc2V0LCBtYXRjaGluZyB0aGUgb25lIGZvdW5kIGZvciBgb3JpZ1N0YXJ0YFxuICAgKi9cblxuXG4gIHNldE9yaWdSYW5nZXMoY3IsIG9mZnNldCkge1xuICAgIGlmICh0aGlzLnJhbmdlKSBvZmZzZXQgPSB0aGlzLnJhbmdlLnNldE9yaWdSYW5nZShjciwgb2Zmc2V0KTtcbiAgICBpZiAodGhpcy52YWx1ZVJhbmdlKSB0aGlzLnZhbHVlUmFuZ2Uuc2V0T3JpZ1JhbmdlKGNyLCBvZmZzZXQpO1xuICAgIHRoaXMucHJvcHMuZm9yRWFjaChwcm9wID0+IHByb3Auc2V0T3JpZ1JhbmdlKGNyLCBvZmZzZXQpKTtcbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgY29uc3Qge1xuICAgICAgY29udGV4dDoge1xuICAgICAgICBzcmNcbiAgICAgIH0sXG4gICAgICByYW5nZSxcbiAgICAgIHZhbHVlXG4gICAgfSA9IHRoaXM7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHJldHVybiB2YWx1ZTtcbiAgICBjb25zdCBzdHIgPSBzcmMuc2xpY2UocmFuZ2Uuc3RhcnQsIHJhbmdlLmVuZCk7XG4gICAgcmV0dXJuIE5vZGUuYWRkU3RyaW5nVGVybWluYXRvcihzcmMsIHJhbmdlLmVuZCwgc3RyKTtcbiAgfVxuXG59XG5cbmNsYXNzIFlBTUxFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobmFtZSwgc291cmNlLCBtZXNzYWdlKSB7XG4gICAgaWYgKCFtZXNzYWdlIHx8ICEoc291cmNlIGluc3RhbmNlb2YgTm9kZSkpIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhcmd1bWVudHMgZm9yIG5ldyAke25hbWV9YCk7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gIH1cblxuICBtYWtlUHJldHR5KCkge1xuICAgIGlmICghdGhpcy5zb3VyY2UpIHJldHVybjtcbiAgICB0aGlzLm5vZGVUeXBlID0gdGhpcy5zb3VyY2UudHlwZTtcbiAgICBjb25zdCBjc3QgPSB0aGlzLnNvdXJjZS5jb250ZXh0ICYmIHRoaXMuc291cmNlLmNvbnRleHQucm9vdDtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5vZmZzZXQgPT09ICdudW1iZXInKSB7XG4gICAgICB0aGlzLnJhbmdlID0gbmV3IFJhbmdlKHRoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArIDEpO1xuICAgICAgY29uc3Qgc3RhcnQgPSBjc3QgJiYgZ2V0TGluZVBvcyh0aGlzLm9mZnNldCwgY3N0KTtcblxuICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgIGNvbnN0IGVuZCA9IHtcbiAgICAgICAgICBsaW5lOiBzdGFydC5saW5lLFxuICAgICAgICAgIGNvbDogc3RhcnQuY29sICsgMVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxpbmVQb3MgPSB7XG4gICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgZW5kXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZSB0aGlzLm9mZnNldDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yYW5nZSA9IHRoaXMuc291cmNlLnJhbmdlO1xuICAgICAgdGhpcy5saW5lUG9zID0gdGhpcy5zb3VyY2UucmFuZ2VBc0xpbmVQb3M7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGluZVBvcykge1xuICAgICAgY29uc3Qge1xuICAgICAgICBsaW5lLFxuICAgICAgICBjb2xcbiAgICAgIH0gPSB0aGlzLmxpbmVQb3Muc3RhcnQ7XG4gICAgICB0aGlzLm1lc3NhZ2UgKz0gYCBhdCBsaW5lICR7bGluZX0sIGNvbHVtbiAke2NvbH1gO1xuICAgICAgY29uc3QgY3R4ID0gY3N0ICYmIGdldFByZXR0eUNvbnRleHQodGhpcy5saW5lUG9zLCBjc3QpO1xuICAgICAgaWYgKGN0eCkgdGhpcy5tZXNzYWdlICs9IGA6XFxuXFxuJHtjdHh9XFxuYDtcbiAgICB9XG5cbiAgICBkZWxldGUgdGhpcy5zb3VyY2U7XG4gIH1cblxufVxuY2xhc3MgWUFNTFJlZmVyZW5jZUVycm9yIGV4dGVuZHMgWUFNTEVycm9yIHtcbiAgY29uc3RydWN0b3Ioc291cmNlLCBtZXNzYWdlKSB7XG4gICAgc3VwZXIoJ1lBTUxSZWZlcmVuY2VFcnJvcicsIHNvdXJjZSwgbWVzc2FnZSk7XG4gIH1cblxufVxuY2xhc3MgWUFNTFNlbWFudGljRXJyb3IgZXh0ZW5kcyBZQU1MRXJyb3Ige1xuICBjb25zdHJ1Y3Rvcihzb3VyY2UsIG1lc3NhZ2UpIHtcbiAgICBzdXBlcignWUFNTFNlbWFudGljRXJyb3InLCBzb3VyY2UsIG1lc3NhZ2UpO1xuICB9XG5cbn1cbmNsYXNzIFlBTUxTeW50YXhFcnJvciBleHRlbmRzIFlBTUxFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHNvdXJjZSwgbWVzc2FnZSkge1xuICAgIHN1cGVyKCdZQU1MU3ludGF4RXJyb3InLCBzb3VyY2UsIG1lc3NhZ2UpO1xuICB9XG5cbn1cbmNsYXNzIFlBTUxXYXJuaW5nIGV4dGVuZHMgWUFNTEVycm9yIHtcbiAgY29uc3RydWN0b3Ioc291cmNlLCBtZXNzYWdlKSB7XG4gICAgc3VwZXIoJ1lBTUxXYXJuaW5nJywgc291cmNlLCBtZXNzYWdlKTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5jbGFzcyBQbGFpblZhbHVlIGV4dGVuZHMgTm9kZSB7XG4gIHN0YXRpYyBlbmRPZkxpbmUoc3JjLCBzdGFydCwgaW5GbG93KSB7XG4gICAgbGV0IGNoID0gc3JjW3N0YXJ0XTtcbiAgICBsZXQgb2Zmc2V0ID0gc3RhcnQ7XG5cbiAgICB3aGlsZSAoY2ggJiYgY2ggIT09ICdcXG4nKSB7XG4gICAgICBpZiAoaW5GbG93ICYmIChjaCA9PT0gJ1snIHx8IGNoID09PSAnXScgfHwgY2ggPT09ICd7JyB8fCBjaCA9PT0gJ30nIHx8IGNoID09PSAnLCcpKSBicmVhaztcbiAgICAgIGNvbnN0IG5leHQgPSBzcmNbb2Zmc2V0ICsgMV07XG4gICAgICBpZiAoY2ggPT09ICc6JyAmJiAoIW5leHQgfHwgbmV4dCA9PT0gJ1xcbicgfHwgbmV4dCA9PT0gJ1xcdCcgfHwgbmV4dCA9PT0gJyAnIHx8IGluRmxvdyAmJiBuZXh0ID09PSAnLCcpKSBicmVhaztcbiAgICAgIGlmICgoY2ggPT09ICcgJyB8fCBjaCA9PT0gJ1xcdCcpICYmIG5leHQgPT09ICcjJykgYnJlYWs7XG4gICAgICBvZmZzZXQgKz0gMTtcbiAgICAgIGNoID0gbmV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgZ2V0IHN0clZhbHVlKCkge1xuICAgIGlmICghdGhpcy52YWx1ZVJhbmdlIHx8ICF0aGlzLmNvbnRleHQpIHJldHVybiBudWxsO1xuICAgIGxldCB7XG4gICAgICBzdGFydCxcbiAgICAgIGVuZFxuICAgIH0gPSB0aGlzLnZhbHVlUmFuZ2U7XG4gICAgY29uc3Qge1xuICAgICAgc3JjXG4gICAgfSA9IHRoaXMuY29udGV4dDtcbiAgICBsZXQgY2ggPSBzcmNbZW5kIC0gMV07XG5cbiAgICB3aGlsZSAoc3RhcnQgPCBlbmQgJiYgKGNoID09PSAnXFxuJyB8fCBjaCA9PT0gJ1xcdCcgfHwgY2ggPT09ICcgJykpIGNoID0gc3JjWy0tZW5kIC0gMV07XG5cbiAgICBsZXQgc3RyID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgY29uc3QgY2ggPSBzcmNbaV07XG5cbiAgICAgIGlmIChjaCA9PT0gJ1xcbicpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGZvbGQsXG4gICAgICAgICAgb2Zmc2V0XG4gICAgICAgIH0gPSBOb2RlLmZvbGROZXdsaW5lKHNyYywgaSwgLTEpO1xuICAgICAgICBzdHIgKz0gZm9sZDtcbiAgICAgICAgaSA9IG9mZnNldDtcbiAgICAgIH0gZWxzZSBpZiAoY2ggPT09ICcgJyB8fCBjaCA9PT0gJ1xcdCcpIHtcbiAgICAgICAgLy8gdHJpbSB0cmFpbGluZyB3aGl0ZXNwYWNlXG4gICAgICAgIGNvbnN0IHdzU3RhcnQgPSBpO1xuICAgICAgICBsZXQgbmV4dCA9IHNyY1tpICsgMV07XG5cbiAgICAgICAgd2hpbGUgKGkgPCBlbmQgJiYgKG5leHQgPT09ICcgJyB8fCBuZXh0ID09PSAnXFx0JykpIHtcbiAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgbmV4dCA9IHNyY1tpICsgMV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dCAhPT0gJ1xcbicpIHN0ciArPSBpID4gd3NTdGFydCA/IHNyYy5zbGljZSh3c1N0YXJ0LCBpICsgMSkgOiBjaDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciArPSBjaDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaDAgPSBzcmNbc3RhcnRdO1xuXG4gICAgc3dpdGNoIChjaDApIHtcbiAgICAgIGNhc2UgJ1xcdCc6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBtc2cgPSAnUGxhaW4gdmFsdWUgY2Fubm90IHN0YXJ0IHdpdGggYSB0YWIgY2hhcmFjdGVyJztcbiAgICAgICAgICBjb25zdCBlcnJvcnMgPSBbbmV3IFlBTUxTZW1hbnRpY0Vycm9yKHRoaXMsIG1zZyldO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlcnJvcnMsXG4gICAgICAgICAgICBzdHJcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgIGNhc2UgJ0AnOlxuICAgICAgY2FzZSAnYCc6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBtc2cgPSBgUGxhaW4gdmFsdWUgY2Fubm90IHN0YXJ0IHdpdGggcmVzZXJ2ZWQgY2hhcmFjdGVyICR7Y2gwfWA7XG4gICAgICAgICAgY29uc3QgZXJyb3JzID0gW25ldyBZQU1MU2VtYW50aWNFcnJvcih0aGlzLCBtc2cpXTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXJyb3JzLFxuICAgICAgICAgICAgc3RyXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlQmxvY2tWYWx1ZShzdGFydCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGluZGVudCxcbiAgICAgIGluRmxvdyxcbiAgICAgIHNyY1xuICAgIH0gPSB0aGlzLmNvbnRleHQ7XG4gICAgbGV0IG9mZnNldCA9IHN0YXJ0O1xuICAgIGxldCB2YWx1ZUVuZCA9IHN0YXJ0O1xuXG4gICAgZm9yIChsZXQgY2ggPSBzcmNbb2Zmc2V0XTsgY2ggPT09ICdcXG4nOyBjaCA9IHNyY1tvZmZzZXRdKSB7XG4gICAgICBpZiAoTm9kZS5hdERvY3VtZW50Qm91bmRhcnkoc3JjLCBvZmZzZXQgKyAxKSkgYnJlYWs7XG4gICAgICBjb25zdCBlbmQgPSBOb2RlLmVuZE9mQmxvY2tJbmRlbnQoc3JjLCBpbmRlbnQsIG9mZnNldCArIDEpO1xuICAgICAgaWYgKGVuZCA9PT0gbnVsbCB8fCBzcmNbZW5kXSA9PT0gJyMnKSBicmVhaztcblxuICAgICAgaWYgKHNyY1tlbmRdID09PSAnXFxuJykge1xuICAgICAgICBvZmZzZXQgPSBlbmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZUVuZCA9IFBsYWluVmFsdWUuZW5kT2ZMaW5lKHNyYywgZW5kLCBpbkZsb3cpO1xuICAgICAgICBvZmZzZXQgPSB2YWx1ZUVuZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy52YWx1ZVJhbmdlLmlzRW1wdHkoKSkgdGhpcy52YWx1ZVJhbmdlLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy52YWx1ZVJhbmdlLmVuZCA9IHZhbHVlRW5kO1xuICAgIHJldHVybiB2YWx1ZUVuZDtcbiAgfVxuICAvKipcbiAgICogUGFyc2VzIGEgcGxhaW4gdmFsdWUgZnJvbSB0aGUgc291cmNlXG4gICAqXG4gICAqIEFjY2VwdGVkIGZvcm1zIGFyZTpcbiAgICogYGBgXG4gICAqICNjb21tZW50XG4gICAqXG4gICAqIGZpcnN0IGxpbmVcbiAgICpcbiAgICogZmlyc3QgbGluZSAjY29tbWVudFxuICAgKlxuICAgKiBmaXJzdCBsaW5lXG4gICAqIGJsb2NrXG4gICAqIGxpbmVzXG4gICAqXG4gICAqICNjb21tZW50XG4gICAqIGJsb2NrXG4gICAqIGxpbmVzXG4gICAqIGBgYFxuICAgKiB3aGVyZSBibG9jayBsaW5lcyBhcmUgZW1wdHkgb3IgaGF2ZSBhbiBpbmRlbnQgbGV2ZWwgZ3JlYXRlciB0aGFuIGBpbmRlbnRgLlxuICAgKlxuICAgKiBAcGFyYW0ge1BhcnNlQ29udGV4dH0gY29udGV4dFxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgLSBJbmRleCBvZiBmaXJzdCBjaGFyYWN0ZXJcbiAgICogQHJldHVybnMge251bWJlcn0gLSBJbmRleCBvZiB0aGUgY2hhcmFjdGVyIGFmdGVyIHRoaXMgc2NhbGFyLCBtYXkgYmUgYFxcbmBcbiAgICovXG5cblxuICBwYXJzZShjb250ZXh0LCBzdGFydCkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgY29uc3Qge1xuICAgICAgaW5GbG93LFxuICAgICAgc3JjXG4gICAgfSA9IGNvbnRleHQ7XG4gICAgbGV0IG9mZnNldCA9IHN0YXJ0O1xuICAgIGNvbnN0IGNoID0gc3JjW29mZnNldF07XG5cbiAgICBpZiAoY2ggJiYgY2ggIT09ICcjJyAmJiBjaCAhPT0gJ1xcbicpIHtcbiAgICAgIG9mZnNldCA9IFBsYWluVmFsdWUuZW5kT2ZMaW5lKHNyYywgc3RhcnQsIGluRmxvdyk7XG4gICAgfVxuXG4gICAgdGhpcy52YWx1ZVJhbmdlID0gbmV3IFJhbmdlKHN0YXJ0LCBvZmZzZXQpO1xuICAgIG9mZnNldCA9IE5vZGUuZW5kT2ZXaGl0ZVNwYWNlKHNyYywgb2Zmc2V0KTtcbiAgICBvZmZzZXQgPSB0aGlzLnBhcnNlQ29tbWVudChvZmZzZXQpO1xuXG4gICAgaWYgKCF0aGlzLmhhc0NvbW1lbnQgfHwgdGhpcy52YWx1ZVJhbmdlLmlzRW1wdHkoKSkge1xuICAgICAgb2Zmc2V0ID0gdGhpcy5wYXJzZUJsb2NrVmFsdWUob2Zmc2V0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbn1cblxuZXhwb3J0cy5DaGFyID0gQ2hhcjtcbmV4cG9ydHMuTm9kZSA9IE5vZGU7XG5leHBvcnRzLlBsYWluVmFsdWUgPSBQbGFpblZhbHVlO1xuZXhwb3J0cy5SYW5nZSA9IFJhbmdlO1xuZXhwb3J0cy5UeXBlID0gVHlwZTtcbmV4cG9ydHMuWUFNTEVycm9yID0gWUFNTEVycm9yO1xuZXhwb3J0cy5ZQU1MUmVmZXJlbmNlRXJyb3IgPSBZQU1MUmVmZXJlbmNlRXJyb3I7XG5leHBvcnRzLllBTUxTZW1hbnRpY0Vycm9yID0gWUFNTFNlbWFudGljRXJyb3I7XG5leHBvcnRzLllBTUxTeW50YXhFcnJvciA9IFlBTUxTeW50YXhFcnJvcjtcbmV4cG9ydHMuWUFNTFdhcm5pbmcgPSBZQU1MV2FybmluZztcbmV4cG9ydHMuX2RlZmluZVByb3BlcnR5ID0gX2RlZmluZVByb3BlcnR5O1xuZXhwb3J0cy5kZWZhdWx0VGFnUHJlZml4ID0gZGVmYXVsdFRhZ1ByZWZpeDtcbmV4cG9ydHMuZGVmYXVsdFRhZ3MgPSBkZWZhdWx0VGFncztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFBsYWluVmFsdWUgPSByZXF1aXJlKCcuL1BsYWluVmFsdWUtZWM4ZTU4OGUuanMnKTtcblxuZnVuY3Rpb24gYWRkQ29tbWVudEJlZm9yZShzdHIsIGluZGVudCwgY29tbWVudCkge1xuICBpZiAoIWNvbW1lbnQpIHJldHVybiBzdHI7XG4gIGNvbnN0IGNjID0gY29tbWVudC5yZXBsYWNlKC9bXFxzXFxTXV4vZ20sIGAkJiR7aW5kZW50fSNgKTtcbiAgcmV0dXJuIGAjJHtjY31cXG4ke2luZGVudH0ke3N0cn1gO1xufVxuZnVuY3Rpb24gYWRkQ29tbWVudChzdHIsIGluZGVudCwgY29tbWVudCkge1xuICByZXR1cm4gIWNvbW1lbnQgPyBzdHIgOiBjb21tZW50LmluZGV4T2YoJ1xcbicpID09PSAtMSA/IGAke3N0cn0gIyR7Y29tbWVudH1gIDogYCR7c3RyfVxcbmAgKyBjb21tZW50LnJlcGxhY2UoL14vZ20sIGAke2luZGVudCB8fCAnJ30jYCk7XG59XG5cbmNsYXNzIE5vZGUge31cblxuZnVuY3Rpb24gdG9KU09OKHZhbHVlLCBhcmcsIGN0eCkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiB2YWx1ZS5tYXAoKHYsIGkpID0+IHRvSlNPTih2LCBTdHJpbmcoaSksIGN0eCkpO1xuXG4gIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgYW5jaG9yID0gY3R4ICYmIGN0eC5hbmNob3JzICYmIGN0eC5hbmNob3JzLmdldCh2YWx1ZSk7XG4gICAgaWYgKGFuY2hvcikgY3R4Lm9uQ3JlYXRlID0gcmVzID0+IHtcbiAgICAgIGFuY2hvci5yZXMgPSByZXM7XG4gICAgICBkZWxldGUgY3R4Lm9uQ3JlYXRlO1xuICAgIH07XG4gICAgY29uc3QgcmVzID0gdmFsdWUudG9KU09OKGFyZywgY3R4KTtcbiAgICBpZiAoYW5jaG9yICYmIGN0eC5vbkNyZWF0ZSkgY3R4Lm9uQ3JlYXRlKHJlcyk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGlmICgoIWN0eCB8fCAhY3R4LmtlZXApICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ2JpZ2ludCcpIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmNsYXNzIFNjYWxhciBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgdG9KU09OKGFyZywgY3R4KSB7XG4gICAgcmV0dXJuIGN0eCAmJiBjdHgua2VlcCA/IHRoaXMudmFsdWUgOiB0b0pTT04odGhpcy52YWx1ZSwgYXJnLCBjdHgpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIFN0cmluZyh0aGlzLnZhbHVlKTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIGNvbGxlY3Rpb25Gcm9tUGF0aChzY2hlbWEsIHBhdGgsIHZhbHVlKSB7XG4gIGxldCB2ID0gdmFsdWU7XG5cbiAgZm9yIChsZXQgaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICBjb25zdCBrID0gcGF0aFtpXTtcblxuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGspICYmIGsgPj0gMCkge1xuICAgICAgY29uc3QgYSA9IFtdO1xuICAgICAgYVtrXSA9IHY7XG4gICAgICB2ID0gYTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbyA9IHt9O1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGssIHtcbiAgICAgICAgdmFsdWU6IHYsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgdiA9IG87XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNjaGVtYS5jcmVhdGVOb2RlKHYsIGZhbHNlKTtcbn0gLy8gbnVsbCwgdW5kZWZpbmVkLCBvciBhbiBlbXB0eSBub24tc3RyaW5nIGl0ZXJhYmxlIChlLmcuIFtdKVxuXG5cbmNvbnN0IGlzRW1wdHlQYXRoID0gcGF0aCA9PiBwYXRoID09IG51bGwgfHwgdHlwZW9mIHBhdGggPT09ICdvYmplY3QnICYmIHBhdGhbU3ltYm9sLml0ZXJhdG9yXSgpLm5leHQoKS5kb25lO1xuY2xhc3MgQ29sbGVjdGlvbiBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihzY2hlbWEpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkodGhpcywgXCJpdGVtc1wiLCBbXSk7XG5cbiAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcbiAgfVxuXG4gIGFkZEluKHBhdGgsIHZhbHVlKSB7XG4gICAgaWYgKGlzRW1wdHlQYXRoKHBhdGgpKSB0aGlzLmFkZCh2YWx1ZSk7ZWxzZSB7XG4gICAgICBjb25zdCBba2V5LCAuLi5yZXN0XSA9IHBhdGg7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5nZXQoa2V5LCB0cnVlKTtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQ29sbGVjdGlvbikgbm9kZS5hZGRJbihyZXN0LCB2YWx1ZSk7ZWxzZSBpZiAobm9kZSA9PT0gdW5kZWZpbmVkICYmIHRoaXMuc2NoZW1hKSB0aGlzLnNldChrZXksIGNvbGxlY3Rpb25Gcm9tUGF0aCh0aGlzLnNjaGVtYSwgcmVzdCwgdmFsdWUpKTtlbHNlIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgWUFNTCBjb2xsZWN0aW9uIGF0ICR7a2V5fS4gUmVtYWluaW5nIHBhdGg6ICR7cmVzdH1gKTtcbiAgICB9XG4gIH1cblxuICBkZWxldGVJbihba2V5LCAuLi5yZXN0XSkge1xuICAgIGlmIChyZXN0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRoaXMuZGVsZXRlKGtleSk7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0KGtleSwgdHJ1ZSk7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDb2xsZWN0aW9uKSByZXR1cm4gbm9kZS5kZWxldGVJbihyZXN0KTtlbHNlIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgWUFNTCBjb2xsZWN0aW9uIGF0ICR7a2V5fS4gUmVtYWluaW5nIHBhdGg6ICR7cmVzdH1gKTtcbiAgfVxuXG4gIGdldEluKFtrZXksIC4uLnJlc3RdLCBrZWVwU2NhbGFyKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuZ2V0KGtleSwgdHJ1ZSk7XG4gICAgaWYgKHJlc3QubGVuZ3RoID09PSAwKSByZXR1cm4gIWtlZXBTY2FsYXIgJiYgbm9kZSBpbnN0YW5jZW9mIFNjYWxhciA/IG5vZGUudmFsdWUgOiBub2RlO2Vsc2UgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBDb2xsZWN0aW9uID8gbm9kZS5nZXRJbihyZXN0LCBrZWVwU2NhbGFyKSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGhhc0FsbE51bGxWYWx1ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMuZXZlcnkobm9kZSA9PiB7XG4gICAgICBpZiAoIW5vZGUgfHwgbm9kZS50eXBlICE9PSAnUEFJUicpIHJldHVybiBmYWxzZTtcbiAgICAgIGNvbnN0IG4gPSBub2RlLnZhbHVlO1xuICAgICAgcmV0dXJuIG4gPT0gbnVsbCB8fCBuIGluc3RhbmNlb2YgU2NhbGFyICYmIG4udmFsdWUgPT0gbnVsbCAmJiAhbi5jb21tZW50QmVmb3JlICYmICFuLmNvbW1lbnQgJiYgIW4udGFnO1xuICAgIH0pO1xuICB9XG5cbiAgaGFzSW4oW2tleSwgLi4ucmVzdF0pIHtcbiAgICBpZiAocmVzdC5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLmhhcyhrZXkpO1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldChrZXksIHRydWUpO1xuICAgIHJldHVybiBub2RlIGluc3RhbmNlb2YgQ29sbGVjdGlvbiA/IG5vZGUuaGFzSW4ocmVzdCkgOiBmYWxzZTtcbiAgfVxuXG4gIHNldEluKFtrZXksIC4uLnJlc3RdLCB2YWx1ZSkge1xuICAgIGlmIChyZXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmdldChrZXksIHRydWUpO1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBDb2xsZWN0aW9uKSBub2RlLnNldEluKHJlc3QsIHZhbHVlKTtlbHNlIGlmIChub2RlID09PSB1bmRlZmluZWQgJiYgdGhpcy5zY2hlbWEpIHRoaXMuc2V0KGtleSwgY29sbGVjdGlvbkZyb21QYXRoKHRoaXMuc2NoZW1hLCByZXN0LCB2YWx1ZSkpO2Vsc2UgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBZQU1MIGNvbGxlY3Rpb24gYXQgJHtrZXl9LiBSZW1haW5pbmcgcGF0aDogJHtyZXN0fWApO1xuICAgIH1cbiAgfSAvLyBvdmVycmlkZGVuIGluIGltcGxlbWVudGF0aW9uc1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cblxuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB0b1N0cmluZyhjdHgsIHtcbiAgICBibG9ja0l0ZW0sXG4gICAgZmxvd0NoYXJzLFxuICAgIGlzTWFwLFxuICAgIGl0ZW1JbmRlbnRcbiAgfSwgb25Db21tZW50LCBvbkNob21wS2VlcCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGluZGVudCxcbiAgICAgIGluZGVudFN0ZXAsXG4gICAgICBzdHJpbmdpZnlcbiAgICB9ID0gY3R4O1xuICAgIGNvbnN0IGluRmxvdyA9IHRoaXMudHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkZMT1dfTUFQIHx8IHRoaXMudHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkZMT1dfU0VRIHx8IGN0eC5pbkZsb3c7XG4gICAgaWYgKGluRmxvdykgaXRlbUluZGVudCArPSBpbmRlbnRTdGVwO1xuICAgIGNvbnN0IGFsbE51bGxWYWx1ZXMgPSBpc01hcCAmJiB0aGlzLmhhc0FsbE51bGxWYWx1ZXMoKTtcbiAgICBjdHggPSBPYmplY3QuYXNzaWduKHt9LCBjdHgsIHtcbiAgICAgIGFsbE51bGxWYWx1ZXMsXG4gICAgICBpbmRlbnQ6IGl0ZW1JbmRlbnQsXG4gICAgICBpbkZsb3csXG4gICAgICB0eXBlOiBudWxsXG4gICAgfSk7XG4gICAgbGV0IGNob21wS2VlcCA9IGZhbHNlO1xuICAgIGxldCBoYXNJdGVtV2l0aE5ld0xpbmUgPSBmYWxzZTtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMuaXRlbXMucmVkdWNlKChub2RlcywgaXRlbSwgaSkgPT4ge1xuICAgICAgbGV0IGNvbW1lbnQ7XG5cbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGlmICghY2hvbXBLZWVwICYmIGl0ZW0uc3BhY2VCZWZvcmUpIG5vZGVzLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICdjb21tZW50JyxcbiAgICAgICAgICBzdHI6ICcnXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaXRlbS5jb21tZW50QmVmb3JlKSBpdGVtLmNvbW1lbnRCZWZvcmUubWF0Y2goL14uKiQvZ20pLmZvckVhY2gobGluZSA9PiB7XG4gICAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAnY29tbWVudCcsXG4gICAgICAgICAgICBzdHI6IGAjJHtsaW5lfWBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpdGVtLmNvbW1lbnQpIGNvbW1lbnQgPSBpdGVtLmNvbW1lbnQ7XG4gICAgICAgIGlmIChpbkZsb3cgJiYgKCFjaG9tcEtlZXAgJiYgaXRlbS5zcGFjZUJlZm9yZSB8fCBpdGVtLmNvbW1lbnRCZWZvcmUgfHwgaXRlbS5jb21tZW50IHx8IGl0ZW0ua2V5ICYmIChpdGVtLmtleS5jb21tZW50QmVmb3JlIHx8IGl0ZW0ua2V5LmNvbW1lbnQpIHx8IGl0ZW0udmFsdWUgJiYgKGl0ZW0udmFsdWUuY29tbWVudEJlZm9yZSB8fCBpdGVtLnZhbHVlLmNvbW1lbnQpKSkgaGFzSXRlbVdpdGhOZXdMaW5lID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY2hvbXBLZWVwID0gZmFsc2U7XG4gICAgICBsZXQgc3RyID0gc3RyaW5naWZ5KGl0ZW0sIGN0eCwgKCkgPT4gY29tbWVudCA9IG51bGwsICgpID0+IGNob21wS2VlcCA9IHRydWUpO1xuICAgICAgaWYgKGluRmxvdyAmJiAhaGFzSXRlbVdpdGhOZXdMaW5lICYmIHN0ci5pbmNsdWRlcygnXFxuJykpIGhhc0l0ZW1XaXRoTmV3TGluZSA9IHRydWU7XG4gICAgICBpZiAoaW5GbG93ICYmIGkgPCB0aGlzLml0ZW1zLmxlbmd0aCAtIDEpIHN0ciArPSAnLCc7XG4gICAgICBzdHIgPSBhZGRDb21tZW50KHN0ciwgaXRlbUluZGVudCwgY29tbWVudCk7XG4gICAgICBpZiAoY2hvbXBLZWVwICYmIChjb21tZW50IHx8IGluRmxvdykpIGNob21wS2VlcCA9IGZhbHNlO1xuICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdpdGVtJyxcbiAgICAgICAgc3RyXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBub2RlcztcbiAgICB9LCBbXSk7XG4gICAgbGV0IHN0cjtcblxuICAgIGlmIChub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHN0ciA9IGZsb3dDaGFycy5zdGFydCArIGZsb3dDaGFycy5lbmQ7XG4gICAgfSBlbHNlIGlmIChpbkZsb3cpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIGVuZFxuICAgICAgfSA9IGZsb3dDaGFycztcbiAgICAgIGNvbnN0IHN0cmluZ3MgPSBub2Rlcy5tYXAobiA9PiBuLnN0cik7XG5cbiAgICAgIGlmIChoYXNJdGVtV2l0aE5ld0xpbmUgfHwgc3RyaW5ncy5yZWR1Y2UoKHN1bSwgc3RyKSA9PiBzdW0gKyBzdHIubGVuZ3RoICsgMiwgMikgPiBDb2xsZWN0aW9uLm1heEZsb3dTdHJpbmdTaW5nbGVMaW5lTGVuZ3RoKSB7XG4gICAgICAgIHN0ciA9IHN0YXJ0O1xuXG4gICAgICAgIGZvciAoY29uc3QgcyBvZiBzdHJpbmdzKSB7XG4gICAgICAgICAgc3RyICs9IHMgPyBgXFxuJHtpbmRlbnRTdGVwfSR7aW5kZW50fSR7c31gIDogJ1xcbic7XG4gICAgICAgIH1cblxuICAgICAgICBzdHIgKz0gYFxcbiR7aW5kZW50fSR7ZW5kfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBgJHtzdGFydH0gJHtzdHJpbmdzLmpvaW4oJyAnKX0gJHtlbmR9YDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3RyaW5ncyA9IG5vZGVzLm1hcChibG9ja0l0ZW0pO1xuICAgICAgc3RyID0gc3RyaW5ncy5zaGlmdCgpO1xuXG4gICAgICBmb3IgKGNvbnN0IHMgb2Ygc3RyaW5ncykgc3RyICs9IHMgPyBgXFxuJHtpbmRlbnR9JHtzfWAgOiAnXFxuJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb21tZW50KSB7XG4gICAgICBzdHIgKz0gJ1xcbicgKyB0aGlzLmNvbW1lbnQucmVwbGFjZSgvXi9nbSwgYCR7aW5kZW50fSNgKTtcbiAgICAgIGlmIChvbkNvbW1lbnQpIG9uQ29tbWVudCgpO1xuICAgIH0gZWxzZSBpZiAoY2hvbXBLZWVwICYmIG9uQ2hvbXBLZWVwKSBvbkNob21wS2VlcCgpO1xuXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG59XG5cblBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KENvbGxlY3Rpb24sIFwibWF4Rmxvd1N0cmluZ1NpbmdsZUxpbmVMZW5ndGhcIiwgNjApO1xuXG5mdW5jdGlvbiBhc0l0ZW1JbmRleChrZXkpIHtcbiAgbGV0IGlkeCA9IGtleSBpbnN0YW5jZW9mIFNjYWxhciA/IGtleS52YWx1ZSA6IGtleTtcbiAgaWYgKGlkeCAmJiB0eXBlb2YgaWR4ID09PSAnc3RyaW5nJykgaWR4ID0gTnVtYmVyKGlkeCk7XG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKGlkeCkgJiYgaWR4ID49IDAgPyBpZHggOiBudWxsO1xufVxuXG5jbGFzcyBZQU1MU2VxIGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gIGFkZCh2YWx1ZSkge1xuICAgIHRoaXMuaXRlbXMucHVzaCh2YWx1ZSk7XG4gIH1cblxuICBkZWxldGUoa2V5KSB7XG4gICAgY29uc3QgaWR4ID0gYXNJdGVtSW5kZXgoa2V5KTtcbiAgICBpZiAodHlwZW9mIGlkeCAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBkZWwgPSB0aGlzLml0ZW1zLnNwbGljZShpZHgsIDEpO1xuICAgIHJldHVybiBkZWwubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGdldChrZXksIGtlZXBTY2FsYXIpIHtcbiAgICBjb25zdCBpZHggPSBhc0l0ZW1JbmRleChrZXkpO1xuICAgIGlmICh0eXBlb2YgaWR4ICE9PSAnbnVtYmVyJykgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBpdCA9IHRoaXMuaXRlbXNbaWR4XTtcbiAgICByZXR1cm4gIWtlZXBTY2FsYXIgJiYgaXQgaW5zdGFuY2VvZiBTY2FsYXIgPyBpdC52YWx1ZSA6IGl0O1xuICB9XG5cbiAgaGFzKGtleSkge1xuICAgIGNvbnN0IGlkeCA9IGFzSXRlbUluZGV4KGtleSk7XG4gICAgcmV0dXJuIHR5cGVvZiBpZHggPT09ICdudW1iZXInICYmIGlkeCA8IHRoaXMuaXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICBjb25zdCBpZHggPSBhc0l0ZW1JbmRleChrZXkpO1xuICAgIGlmICh0eXBlb2YgaWR4ICE9PSAnbnVtYmVyJykgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhIHZhbGlkIGluZGV4LCBub3QgJHtrZXl9LmApO1xuICAgIHRoaXMuaXRlbXNbaWR4XSA9IHZhbHVlO1xuICB9XG5cbiAgdG9KU09OKF8sIGN0eCkge1xuICAgIGNvbnN0IHNlcSA9IFtdO1xuICAgIGlmIChjdHggJiYgY3R4Lm9uQ3JlYXRlKSBjdHgub25DcmVhdGUoc2VxKTtcbiAgICBsZXQgaSA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5pdGVtcykgc2VxLnB1c2godG9KU09OKGl0ZW0sIFN0cmluZyhpKyspLCBjdHgpKTtcblxuICAgIHJldHVybiBzZXE7XG4gIH1cblxuICB0b1N0cmluZyhjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgICBpZiAoIWN0eCkgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMpO1xuICAgIHJldHVybiBzdXBlci50b1N0cmluZyhjdHgsIHtcbiAgICAgIGJsb2NrSXRlbTogbiA9PiBuLnR5cGUgPT09ICdjb21tZW50JyA/IG4uc3RyIDogYC0gJHtuLnN0cn1gLFxuICAgICAgZmxvd0NoYXJzOiB7XG4gICAgICAgIHN0YXJ0OiAnWycsXG4gICAgICAgIGVuZDogJ10nXG4gICAgICB9LFxuICAgICAgaXNNYXA6IGZhbHNlLFxuICAgICAgaXRlbUluZGVudDogKGN0eC5pbmRlbnQgfHwgJycpICsgJyAgJ1xuICAgIH0sIG9uQ29tbWVudCwgb25DaG9tcEtlZXApO1xuICB9XG5cbn1cblxuY29uc3Qgc3RyaW5naWZ5S2V5ID0gKGtleSwganNLZXksIGN0eCkgPT4ge1xuICBpZiAoanNLZXkgPT09IG51bGwpIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiBqc0tleSAhPT0gJ29iamVjdCcpIHJldHVybiBTdHJpbmcoanNLZXkpO1xuICBpZiAoa2V5IGluc3RhbmNlb2YgTm9kZSAmJiBjdHggJiYgY3R4LmRvYykgcmV0dXJuIGtleS50b1N0cmluZyh7XG4gICAgYW5jaG9yczogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICBkb2M6IGN0eC5kb2MsXG4gICAgaW5kZW50OiAnJyxcbiAgICBpbmRlbnRTdGVwOiBjdHguaW5kZW50U3RlcCxcbiAgICBpbkZsb3c6IHRydWUsXG4gICAgaW5TdHJpbmdpZnlLZXk6IHRydWUsXG4gICAgc3RyaW5naWZ5OiBjdHguc3RyaW5naWZ5XG4gIH0pO1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoanNLZXkpO1xufTtcblxuY2xhc3MgUGFpciBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihrZXksIHZhbHVlID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMudHlwZSA9IFBhaXIuVHlwZS5QQUlSO1xuICB9XG5cbiAgZ2V0IGNvbW1lbnRCZWZvcmUoKSB7XG4gICAgcmV0dXJuIHRoaXMua2V5IGluc3RhbmNlb2YgTm9kZSA/IHRoaXMua2V5LmNvbW1lbnRCZWZvcmUgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBzZXQgY29tbWVudEJlZm9yZShjYikge1xuICAgIGlmICh0aGlzLmtleSA9PSBudWxsKSB0aGlzLmtleSA9IG5ldyBTY2FsYXIobnVsbCk7XG4gICAgaWYgKHRoaXMua2V5IGluc3RhbmNlb2YgTm9kZSkgdGhpcy5rZXkuY29tbWVudEJlZm9yZSA9IGNiO2Vsc2Uge1xuICAgICAgY29uc3QgbXNnID0gJ1BhaXIuY29tbWVudEJlZm9yZSBpcyBhbiBhbGlhcyBmb3IgUGFpci5rZXkuY29tbWVudEJlZm9yZS4gVG8gc2V0IGl0LCB0aGUga2V5IG11c3QgYmUgYSBOb2RlLic7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG4gIH1cblxuICBhZGRUb0pTTWFwKGN0eCwgbWFwKSB7XG4gICAgY29uc3Qga2V5ID0gdG9KU09OKHRoaXMua2V5LCAnJywgY3R4KTtcblxuICAgIGlmIChtYXAgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdG9KU09OKHRoaXMudmFsdWUsIGtleSwgY3R4KTtcbiAgICAgIG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChtYXAgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgIG1hcC5hZGQoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3RyaW5nS2V5ID0gc3RyaW5naWZ5S2V5KHRoaXMua2V5LCBrZXksIGN0eCk7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRvSlNPTih0aGlzLnZhbHVlLCBzdHJpbmdLZXksIGN0eCk7XG4gICAgICBpZiAoc3RyaW5nS2V5IGluIG1hcCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1hcCwgc3RyaW5nS2V5LCB7XG4gICAgICAgIHZhbHVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KTtlbHNlIG1hcFtzdHJpbmdLZXldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG4gIHRvSlNPTihfLCBjdHgpIHtcbiAgICBjb25zdCBwYWlyID0gY3R4ICYmIGN0eC5tYXBBc01hcCA/IG5ldyBNYXAoKSA6IHt9O1xuICAgIHJldHVybiB0aGlzLmFkZFRvSlNNYXAoY3R4LCBwYWlyKTtcbiAgfVxuXG4gIHRvU3RyaW5nKGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCkge1xuICAgIGlmICghY3R4IHx8ICFjdHguZG9jKSByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcyk7XG4gICAgY29uc3Qge1xuICAgICAgaW5kZW50OiBpbmRlbnRTaXplLFxuICAgICAgaW5kZW50U2VxLFxuICAgICAgc2ltcGxlS2V5c1xuICAgIH0gPSBjdHguZG9jLm9wdGlvbnM7XG4gICAgbGV0IHtcbiAgICAgIGtleSxcbiAgICAgIHZhbHVlXG4gICAgfSA9IHRoaXM7XG4gICAgbGV0IGtleUNvbW1lbnQgPSBrZXkgaW5zdGFuY2VvZiBOb2RlICYmIGtleS5jb21tZW50O1xuXG4gICAgaWYgKHNpbXBsZUtleXMpIHtcbiAgICAgIGlmIChrZXlDb21tZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignV2l0aCBzaW1wbGUga2V5cywga2V5IG5vZGVzIGNhbm5vdCBoYXZlIGNvbW1lbnRzJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChrZXkgaW5zdGFuY2VvZiBDb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9ICdXaXRoIHNpbXBsZSBrZXlzLCBjb2xsZWN0aW9uIGNhbm5vdCBiZSB1c2VkIGFzIGEga2V5IHZhbHVlJztcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGV4cGxpY2l0S2V5ID0gIXNpbXBsZUtleXMgJiYgKCFrZXkgfHwga2V5Q29tbWVudCB8fCAoa2V5IGluc3RhbmNlb2YgTm9kZSA/IGtleSBpbnN0YW5jZW9mIENvbGxlY3Rpb24gfHwga2V5LnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5CTE9DS19GT0xERUQgfHwga2V5LnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5CTE9DS19MSVRFUkFMIDogdHlwZW9mIGtleSA9PT0gJ29iamVjdCcpKTtcbiAgICBjb25zdCB7XG4gICAgICBkb2MsXG4gICAgICBpbmRlbnQsXG4gICAgICBpbmRlbnRTdGVwLFxuICAgICAgc3RyaW5naWZ5XG4gICAgfSA9IGN0eDtcbiAgICBjdHggPSBPYmplY3QuYXNzaWduKHt9LCBjdHgsIHtcbiAgICAgIGltcGxpY2l0S2V5OiAhZXhwbGljaXRLZXksXG4gICAgICBpbmRlbnQ6IGluZGVudCArIGluZGVudFN0ZXBcbiAgICB9KTtcbiAgICBsZXQgY2hvbXBLZWVwID0gZmFsc2U7XG4gICAgbGV0IHN0ciA9IHN0cmluZ2lmeShrZXksIGN0eCwgKCkgPT4ga2V5Q29tbWVudCA9IG51bGwsICgpID0+IGNob21wS2VlcCA9IHRydWUpO1xuICAgIHN0ciA9IGFkZENvbW1lbnQoc3RyLCBjdHguaW5kZW50LCBrZXlDb21tZW50KTtcblxuICAgIGlmICghZXhwbGljaXRLZXkgJiYgc3RyLmxlbmd0aCA+IDEwMjQpIHtcbiAgICAgIGlmIChzaW1wbGVLZXlzKSB0aHJvdyBuZXcgRXJyb3IoJ1dpdGggc2ltcGxlIGtleXMsIHNpbmdsZSBsaW5lIHNjYWxhciBtdXN0IG5vdCBzcGFuIG1vcmUgdGhhbiAxMDI0IGNoYXJhY3RlcnMnKTtcbiAgICAgIGV4cGxpY2l0S2V5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoY3R4LmFsbE51bGxWYWx1ZXMgJiYgIXNpbXBsZUtleXMpIHtcbiAgICAgIGlmICh0aGlzLmNvbW1lbnQpIHtcbiAgICAgICAgc3RyID0gYWRkQ29tbWVudChzdHIsIGN0eC5pbmRlbnQsIHRoaXMuY29tbWVudCk7XG4gICAgICAgIGlmIChvbkNvbW1lbnQpIG9uQ29tbWVudCgpO1xuICAgICAgfSBlbHNlIGlmIChjaG9tcEtlZXAgJiYgIWtleUNvbW1lbnQgJiYgb25DaG9tcEtlZXApIG9uQ2hvbXBLZWVwKCk7XG5cbiAgICAgIHJldHVybiBjdHguaW5GbG93ICYmICFleHBsaWNpdEtleSA/IHN0ciA6IGA/ICR7c3RyfWA7XG4gICAgfVxuXG4gICAgc3RyID0gZXhwbGljaXRLZXkgPyBgPyAke3N0cn1cXG4ke2luZGVudH06YCA6IGAke3N0cn06YDtcblxuICAgIGlmICh0aGlzLmNvbW1lbnQpIHtcbiAgICAgIC8vIGV4cGVjdGVkIChidXQgbm90IHN0cmljdGx5IHJlcXVpcmVkKSB0byBiZSBhIHNpbmdsZS1saW5lIGNvbW1lbnRcbiAgICAgIHN0ciA9IGFkZENvbW1lbnQoc3RyLCBjdHguaW5kZW50LCB0aGlzLmNvbW1lbnQpO1xuICAgICAgaWYgKG9uQ29tbWVudCkgb25Db21tZW50KCk7XG4gICAgfVxuXG4gICAgbGV0IHZjYiA9ICcnO1xuICAgIGxldCB2YWx1ZUNvbW1lbnQgPSBudWxsO1xuXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgaWYgKHZhbHVlLnNwYWNlQmVmb3JlKSB2Y2IgPSAnXFxuJztcblxuICAgICAgaWYgKHZhbHVlLmNvbW1lbnRCZWZvcmUpIHtcbiAgICAgICAgY29uc3QgY3MgPSB2YWx1ZS5jb21tZW50QmVmb3JlLnJlcGxhY2UoL14vZ20sIGAke2N0eC5pbmRlbnR9I2ApO1xuICAgICAgICB2Y2IgKz0gYFxcbiR7Y3N9YDtcbiAgICAgIH1cblxuICAgICAgdmFsdWVDb21tZW50ID0gdmFsdWUuY29tbWVudDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhbHVlID0gZG9jLnNjaGVtYS5jcmVhdGVOb2RlKHZhbHVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjdHguaW1wbGljaXRLZXkgPSBmYWxzZTtcbiAgICBpZiAoIWV4cGxpY2l0S2V5ICYmICF0aGlzLmNvbW1lbnQgJiYgdmFsdWUgaW5zdGFuY2VvZiBTY2FsYXIpIGN0eC5pbmRlbnRBdFN0YXJ0ID0gc3RyLmxlbmd0aCArIDE7XG4gICAgY2hvbXBLZWVwID0gZmFsc2U7XG5cbiAgICBpZiAoIWluZGVudFNlcSAmJiBpbmRlbnRTaXplID49IDIgJiYgIWN0eC5pbkZsb3cgJiYgIWV4cGxpY2l0S2V5ICYmIHZhbHVlIGluc3RhbmNlb2YgWUFNTFNlcSAmJiB2YWx1ZS50eXBlICE9PSBQbGFpblZhbHVlLlR5cGUuRkxPV19TRVEgJiYgIXZhbHVlLnRhZyAmJiAhZG9jLmFuY2hvcnMuZ2V0TmFtZSh2YWx1ZSkpIHtcbiAgICAgIC8vIElmIGluZGVudFNlcSA9PT0gZmFsc2UsIGNvbnNpZGVyICctICcgYXMgcGFydCBvZiBpbmRlbnRhdGlvbiB3aGVyZSBwb3NzaWJsZVxuICAgICAgY3R4LmluZGVudCA9IGN0eC5pbmRlbnQuc3Vic3RyKDIpO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlU3RyID0gc3RyaW5naWZ5KHZhbHVlLCBjdHgsICgpID0+IHZhbHVlQ29tbWVudCA9IG51bGwsICgpID0+IGNob21wS2VlcCA9IHRydWUpO1xuICAgIGxldCB3cyA9ICcgJztcblxuICAgIGlmICh2Y2IgfHwgdGhpcy5jb21tZW50KSB7XG4gICAgICB3cyA9IGAke3ZjYn1cXG4ke2N0eC5pbmRlbnR9YDtcbiAgICB9IGVsc2UgaWYgKCFleHBsaWNpdEtleSAmJiB2YWx1ZSBpbnN0YW5jZW9mIENvbGxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IGZsb3cgPSB2YWx1ZVN0clswXSA9PT0gJ1snIHx8IHZhbHVlU3RyWzBdID09PSAneyc7XG4gICAgICBpZiAoIWZsb3cgfHwgdmFsdWVTdHIuaW5jbHVkZXMoJ1xcbicpKSB3cyA9IGBcXG4ke2N0eC5pbmRlbnR9YDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlU3RyWzBdID09PSAnXFxuJykgd3MgPSAnJztcblxuICAgIGlmIChjaG9tcEtlZXAgJiYgIXZhbHVlQ29tbWVudCAmJiBvbkNob21wS2VlcCkgb25DaG9tcEtlZXAoKTtcbiAgICByZXR1cm4gYWRkQ29tbWVudChzdHIgKyB3cyArIHZhbHVlU3RyLCBjdHguaW5kZW50LCB2YWx1ZUNvbW1lbnQpO1xuICB9XG5cbn1cblxuUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkoUGFpciwgXCJUeXBlXCIsIHtcbiAgUEFJUjogJ1BBSVInLFxuICBNRVJHRV9QQUlSOiAnTUVSR0VfUEFJUidcbn0pO1xuXG5jb25zdCBnZXRBbGlhc0NvdW50ID0gKG5vZGUsIGFuY2hvcnMpID0+IHtcbiAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBbGlhcykge1xuICAgIGNvbnN0IGFuY2hvciA9IGFuY2hvcnMuZ2V0KG5vZGUuc291cmNlKTtcbiAgICByZXR1cm4gYW5jaG9yLmNvdW50ICogYW5jaG9yLmFsaWFzQ291bnQ7XG4gIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIENvbGxlY3Rpb24pIHtcbiAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIG5vZGUuaXRlbXMpIHtcbiAgICAgIGNvbnN0IGMgPSBnZXRBbGlhc0NvdW50KGl0ZW0sIGFuY2hvcnMpO1xuICAgICAgaWYgKGMgPiBjb3VudCkgY291bnQgPSBjO1xuICAgIH1cblxuICAgIHJldHVybiBjb3VudDtcbiAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgUGFpcikge1xuICAgIGNvbnN0IGtjID0gZ2V0QWxpYXNDb3VudChub2RlLmtleSwgYW5jaG9ycyk7XG4gICAgY29uc3QgdmMgPSBnZXRBbGlhc0NvdW50KG5vZGUudmFsdWUsIGFuY2hvcnMpO1xuICAgIHJldHVybiBNYXRoLm1heChrYywgdmMpO1xuICB9XG5cbiAgcmV0dXJuIDE7XG59O1xuXG5jbGFzcyBBbGlhcyBleHRlbmRzIE5vZGUge1xuICBzdGF0aWMgc3RyaW5naWZ5KHtcbiAgICByYW5nZSxcbiAgICBzb3VyY2VcbiAgfSwge1xuICAgIGFuY2hvcnMsXG4gICAgZG9jLFxuICAgIGltcGxpY2l0S2V5LFxuICAgIGluU3RyaW5naWZ5S2V5XG4gIH0pIHtcbiAgICBsZXQgYW5jaG9yID0gT2JqZWN0LmtleXMoYW5jaG9ycykuZmluZChhID0+IGFuY2hvcnNbYV0gPT09IHNvdXJjZSk7XG4gICAgaWYgKCFhbmNob3IgJiYgaW5TdHJpbmdpZnlLZXkpIGFuY2hvciA9IGRvYy5hbmNob3JzLmdldE5hbWUoc291cmNlKSB8fCBkb2MuYW5jaG9ycy5uZXdOYW1lKCk7XG4gICAgaWYgKGFuY2hvcikgcmV0dXJuIGAqJHthbmNob3J9JHtpbXBsaWNpdEtleSA/ICcgJyA6ICcnfWA7XG4gICAgY29uc3QgbXNnID0gZG9jLmFuY2hvcnMuZ2V0TmFtZShzb3VyY2UpID8gJ0FsaWFzIG5vZGUgbXVzdCBiZSBhZnRlciBzb3VyY2Ugbm9kZScgOiAnU291cmNlIG5vZGUgbm90IGZvdW5kIGZvciBhbGlhcyBub2RlJztcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bXNnfSBbJHtyYW5nZX1dYCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihzb3VyY2UpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgIHRoaXMudHlwZSA9IFBsYWluVmFsdWUuVHlwZS5BTElBUztcbiAgfVxuXG4gIHNldCB0YWcodCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQWxpYXMgbm9kZXMgY2Fubm90IGhhdmUgdGFncycpO1xuICB9XG5cbiAgdG9KU09OKGFyZywgY3R4KSB7XG4gICAgaWYgKCFjdHgpIHJldHVybiB0b0pTT04odGhpcy5zb3VyY2UsIGFyZywgY3R4KTtcbiAgICBjb25zdCB7XG4gICAgICBhbmNob3JzLFxuICAgICAgbWF4QWxpYXNDb3VudFxuICAgIH0gPSBjdHg7XG4gICAgY29uc3QgYW5jaG9yID0gYW5jaG9ycy5nZXQodGhpcy5zb3VyY2UpO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuXG4gICAgaWYgKCFhbmNob3IgfHwgYW5jaG9yLnJlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBtc2cgPSAnVGhpcyBzaG91bGQgbm90IGhhcHBlbjogQWxpYXMgYW5jaG9yIHdhcyBub3QgcmVzb2x2ZWQ/JztcbiAgICAgIGlmICh0aGlzLmNzdE5vZGUpIHRocm93IG5ldyBQbGFpblZhbHVlLllBTUxSZWZlcmVuY2VFcnJvcih0aGlzLmNzdE5vZGUsIG1zZyk7ZWxzZSB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IobXNnKTtcbiAgICB9XG5cbiAgICBpZiAobWF4QWxpYXNDb3VudCA+PSAwKSB7XG4gICAgICBhbmNob3IuY291bnQgKz0gMTtcbiAgICAgIGlmIChhbmNob3IuYWxpYXNDb3VudCA9PT0gMCkgYW5jaG9yLmFsaWFzQ291bnQgPSBnZXRBbGlhc0NvdW50KHRoaXMuc291cmNlLCBhbmNob3JzKTtcblxuICAgICAgaWYgKGFuY2hvci5jb3VudCAqIGFuY2hvci5hbGlhc0NvdW50ID4gbWF4QWxpYXNDb3VudCkge1xuICAgICAgICBjb25zdCBtc2cgPSAnRXhjZXNzaXZlIGFsaWFzIGNvdW50IGluZGljYXRlcyBhIHJlc291cmNlIGV4aGF1c3Rpb24gYXR0YWNrJztcbiAgICAgICAgaWYgKHRoaXMuY3N0Tm9kZSkgdGhyb3cgbmV3IFBsYWluVmFsdWUuWUFNTFJlZmVyZW5jZUVycm9yKHRoaXMuY3N0Tm9kZSwgbXNnKTtlbHNlIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihtc2cpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhbmNob3IucmVzO1xuICB9IC8vIE9ubHkgY2FsbGVkIHdoZW4gc3RyaW5naWZ5aW5nIGFuIGFsaWFzIG1hcHBpbmcga2V5IHdoaWxlIGNvbnN0cnVjdGluZ1xuICAvLyBPYmplY3Qgb3V0cHV0LlxuXG5cbiAgdG9TdHJpbmcoY3R4KSB7XG4gICAgcmV0dXJuIEFsaWFzLnN0cmluZ2lmeSh0aGlzLCBjdHgpO1xuICB9XG5cbn1cblxuUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkoQWxpYXMsIFwiZGVmYXVsdFwiLCB0cnVlKTtcblxuZnVuY3Rpb24gZmluZFBhaXIoaXRlbXMsIGtleSkge1xuICBjb25zdCBrID0ga2V5IGluc3RhbmNlb2YgU2NhbGFyID8ga2V5LnZhbHVlIDoga2V5O1xuXG4gIGZvciAoY29uc3QgaXQgb2YgaXRlbXMpIHtcbiAgICBpZiAoaXQgaW5zdGFuY2VvZiBQYWlyKSB7XG4gICAgICBpZiAoaXQua2V5ID09PSBrZXkgfHwgaXQua2V5ID09PSBrKSByZXR1cm4gaXQ7XG4gICAgICBpZiAoaXQua2V5ICYmIGl0LmtleS52YWx1ZSA9PT0gaykgcmV0dXJuIGl0O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5jbGFzcyBZQU1MTWFwIGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gIGFkZChwYWlyLCBvdmVyd3JpdGUpIHtcbiAgICBpZiAoIXBhaXIpIHBhaXIgPSBuZXcgUGFpcihwYWlyKTtlbHNlIGlmICghKHBhaXIgaW5zdGFuY2VvZiBQYWlyKSkgcGFpciA9IG5ldyBQYWlyKHBhaXIua2V5IHx8IHBhaXIsIHBhaXIudmFsdWUpO1xuICAgIGNvbnN0IHByZXYgPSBmaW5kUGFpcih0aGlzLml0ZW1zLCBwYWlyLmtleSk7XG4gICAgY29uc3Qgc29ydEVudHJpZXMgPSB0aGlzLnNjaGVtYSAmJiB0aGlzLnNjaGVtYS5zb3J0TWFwRW50cmllcztcblxuICAgIGlmIChwcmV2KSB7XG4gICAgICBpZiAob3ZlcndyaXRlKSBwcmV2LnZhbHVlID0gcGFpci52YWx1ZTtlbHNlIHRocm93IG5ldyBFcnJvcihgS2V5ICR7cGFpci5rZXl9IGFscmVhZHkgc2V0YCk7XG4gICAgfSBlbHNlIGlmIChzb3J0RW50cmllcykge1xuICAgICAgY29uc3QgaSA9IHRoaXMuaXRlbXMuZmluZEluZGV4KGl0ZW0gPT4gc29ydEVudHJpZXMocGFpciwgaXRlbSkgPCAwKTtcbiAgICAgIGlmIChpID09PSAtMSkgdGhpcy5pdGVtcy5wdXNoKHBhaXIpO2Vsc2UgdGhpcy5pdGVtcy5zcGxpY2UoaSwgMCwgcGFpcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXRlbXMucHVzaChwYWlyKTtcbiAgICB9XG4gIH1cblxuICBkZWxldGUoa2V5KSB7XG4gICAgY29uc3QgaXQgPSBmaW5kUGFpcih0aGlzLml0ZW1zLCBrZXkpO1xuICAgIGlmICghaXQpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBkZWwgPSB0aGlzLml0ZW1zLnNwbGljZSh0aGlzLml0ZW1zLmluZGV4T2YoaXQpLCAxKTtcbiAgICByZXR1cm4gZGVsLmxlbmd0aCA+IDA7XG4gIH1cblxuICBnZXQoa2V5LCBrZWVwU2NhbGFyKSB7XG4gICAgY29uc3QgaXQgPSBmaW5kUGFpcih0aGlzLml0ZW1zLCBrZXkpO1xuICAgIGNvbnN0IG5vZGUgPSBpdCAmJiBpdC52YWx1ZTtcbiAgICByZXR1cm4gIWtlZXBTY2FsYXIgJiYgbm9kZSBpbnN0YW5jZW9mIFNjYWxhciA/IG5vZGUudmFsdWUgOiBub2RlO1xuICB9XG5cbiAgaGFzKGtleSkge1xuICAgIHJldHVybiAhIWZpbmRQYWlyKHRoaXMuaXRlbXMsIGtleSk7XG4gIH1cblxuICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIHRoaXMuYWRkKG5ldyBQYWlyKGtleSwgdmFsdWUpLCB0cnVlKTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHsqfSBhcmcgaWdub3JlZFxuICAgKiBAcGFyYW0geyp9IGN0eCBDb252ZXJzaW9uIGNvbnRleHQsIG9yaWdpbmFsbHkgc2V0IGluIERvY3VtZW50I3RvSlNPTigpXG4gICAqIEBwYXJhbSB7Q2xhc3N9IFR5cGUgSWYgc2V0LCBmb3JjZXMgdGhlIHJldHVybmVkIGNvbGxlY3Rpb24gdHlwZVxuICAgKiBAcmV0dXJucyB7Kn0gSW5zdGFuY2Ugb2YgVHlwZSwgTWFwLCBvciBPYmplY3RcbiAgICovXG5cblxuICB0b0pTT04oXywgY3R4LCBUeXBlKSB7XG4gICAgY29uc3QgbWFwID0gVHlwZSA/IG5ldyBUeXBlKCkgOiBjdHggJiYgY3R4Lm1hcEFzTWFwID8gbmV3IE1hcCgpIDoge307XG4gICAgaWYgKGN0eCAmJiBjdHgub25DcmVhdGUpIGN0eC5vbkNyZWF0ZShtYXApO1xuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuaXRlbXMpIGl0ZW0uYWRkVG9KU01hcChjdHgsIG1hcCk7XG5cbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgdG9TdHJpbmcoY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKSB7XG4gICAgaWYgKCFjdHgpIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzKTtcblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLml0ZW1zKSB7XG4gICAgICBpZiAoIShpdGVtIGluc3RhbmNlb2YgUGFpcikpIHRocm93IG5ldyBFcnJvcihgTWFwIGl0ZW1zIG11c3QgYWxsIGJlIHBhaXJzOyBmb3VuZCAke0pTT04uc3RyaW5naWZ5KGl0ZW0pfSBpbnN0ZWFkYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLnRvU3RyaW5nKGN0eCwge1xuICAgICAgYmxvY2tJdGVtOiBuID0+IG4uc3RyLFxuICAgICAgZmxvd0NoYXJzOiB7XG4gICAgICAgIHN0YXJ0OiAneycsXG4gICAgICAgIGVuZDogJ30nXG4gICAgICB9LFxuICAgICAgaXNNYXA6IHRydWUsXG4gICAgICBpdGVtSW5kZW50OiBjdHguaW5kZW50IHx8ICcnXG4gICAgfSwgb25Db21tZW50LCBvbkNob21wS2VlcCk7XG4gIH1cblxufVxuXG5jb25zdCBNRVJHRV9LRVkgPSAnPDwnO1xuY2xhc3MgTWVyZ2UgZXh0ZW5kcyBQYWlyIHtcbiAgY29uc3RydWN0b3IocGFpcikge1xuICAgIGlmIChwYWlyIGluc3RhbmNlb2YgUGFpcikge1xuICAgICAgbGV0IHNlcSA9IHBhaXIudmFsdWU7XG5cbiAgICAgIGlmICghKHNlcSBpbnN0YW5jZW9mIFlBTUxTZXEpKSB7XG4gICAgICAgIHNlcSA9IG5ldyBZQU1MU2VxKCk7XG4gICAgICAgIHNlcS5pdGVtcy5wdXNoKHBhaXIudmFsdWUpO1xuICAgICAgICBzZXEucmFuZ2UgPSBwYWlyLnZhbHVlLnJhbmdlO1xuICAgICAgfVxuXG4gICAgICBzdXBlcihwYWlyLmtleSwgc2VxKTtcbiAgICAgIHRoaXMucmFuZ2UgPSBwYWlyLnJhbmdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlcihuZXcgU2NhbGFyKE1FUkdFX0tFWSksIG5ldyBZQU1MU2VxKCkpO1xuICAgIH1cblxuICAgIHRoaXMudHlwZSA9IFBhaXIuVHlwZS5NRVJHRV9QQUlSO1xuICB9IC8vIElmIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggYSBtZXJnZSBrZXkgaXMgYSBzaW5nbGUgbWFwcGluZyBub2RlLCBlYWNoIG9mXG4gIC8vIGl0cyBrZXkvdmFsdWUgcGFpcnMgaXMgaW5zZXJ0ZWQgaW50byB0aGUgY3VycmVudCBtYXBwaW5nLCB1bmxlc3MgdGhlIGtleVxuICAvLyBhbHJlYWR5IGV4aXN0cyBpbiBpdC4gSWYgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUgbWVyZ2Uga2V5IGlzIGFcbiAgLy8gc2VxdWVuY2UsIHRoZW4gdGhpcyBzZXF1ZW5jZSBpcyBleHBlY3RlZCB0byBjb250YWluIG1hcHBpbmcgbm9kZXMgYW5kIGVhY2hcbiAgLy8gb2YgdGhlc2Ugbm9kZXMgaXMgbWVyZ2VkIGluIHR1cm4gYWNjb3JkaW5nIHRvIGl0cyBvcmRlciBpbiB0aGUgc2VxdWVuY2UuXG4gIC8vIEtleXMgaW4gbWFwcGluZyBub2RlcyBlYXJsaWVyIGluIHRoZSBzZXF1ZW5jZSBvdmVycmlkZSBrZXlzIHNwZWNpZmllZCBpblxuICAvLyBsYXRlciBtYXBwaW5nIG5vZGVzLiAtLSBodHRwOi8veWFtbC5vcmcvdHlwZS9tZXJnZS5odG1sXG5cblxuICBhZGRUb0pTTWFwKGN0eCwgbWFwKSB7XG4gICAgZm9yIChjb25zdCB7XG4gICAgICBzb3VyY2VcbiAgICB9IG9mIHRoaXMudmFsdWUuaXRlbXMpIHtcbiAgICAgIGlmICghKHNvdXJjZSBpbnN0YW5jZW9mIFlBTUxNYXApKSB0aHJvdyBuZXcgRXJyb3IoJ01lcmdlIHNvdXJjZXMgbXVzdCBiZSBtYXBzJyk7XG4gICAgICBjb25zdCBzcmNNYXAgPSBzb3VyY2UudG9KU09OKG51bGwsIGN0eCwgTWFwKTtcblxuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2Ygc3JjTWFwKSB7XG4gICAgICAgIGlmIChtYXAgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICBpZiAoIW1hcC5oYXMoa2V5KSkgbWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXAgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgICBtYXAuYWRkKGtleSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtYXAsIGtleSkpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobWFwLCBrZXksIHtcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgdG9TdHJpbmcoY3R4LCBvbkNvbW1lbnQpIHtcbiAgICBjb25zdCBzZXEgPSB0aGlzLnZhbHVlO1xuICAgIGlmIChzZXEuaXRlbXMubGVuZ3RoID4gMSkgcmV0dXJuIHN1cGVyLnRvU3RyaW5nKGN0eCwgb25Db21tZW50KTtcbiAgICB0aGlzLnZhbHVlID0gc2VxLml0ZW1zWzBdO1xuICAgIGNvbnN0IHN0ciA9IHN1cGVyLnRvU3RyaW5nKGN0eCwgb25Db21tZW50KTtcbiAgICB0aGlzLnZhbHVlID0gc2VxO1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxufVxuXG5jb25zdCBiaW5hcnlPcHRpb25zID0ge1xuICBkZWZhdWx0VHlwZTogUGxhaW5WYWx1ZS5UeXBlLkJMT0NLX0xJVEVSQUwsXG4gIGxpbmVXaWR0aDogNzZcbn07XG5jb25zdCBib29sT3B0aW9ucyA9IHtcbiAgdHJ1ZVN0cjogJ3RydWUnLFxuICBmYWxzZVN0cjogJ2ZhbHNlJ1xufTtcbmNvbnN0IGludE9wdGlvbnMgPSB7XG4gIGFzQmlnSW50OiBmYWxzZVxufTtcbmNvbnN0IG51bGxPcHRpb25zID0ge1xuICBudWxsU3RyOiAnbnVsbCdcbn07XG5jb25zdCBzdHJPcHRpb25zID0ge1xuICBkZWZhdWx0VHlwZTogUGxhaW5WYWx1ZS5UeXBlLlBMQUlOLFxuICBkb3VibGVRdW90ZWQ6IHtcbiAgICBqc29uRW5jb2Rpbmc6IGZhbHNlLFxuICAgIG1pbk11bHRpTGluZUxlbmd0aDogNDBcbiAgfSxcbiAgZm9sZDoge1xuICAgIGxpbmVXaWR0aDogODAsXG4gICAgbWluQ29udGVudFdpZHRoOiAyMFxuICB9XG59O1xuXG5mdW5jdGlvbiByZXNvbHZlU2NhbGFyKHN0ciwgdGFncywgc2NhbGFyRmFsbGJhY2spIHtcbiAgZm9yIChjb25zdCB7XG4gICAgZm9ybWF0LFxuICAgIHRlc3QsXG4gICAgcmVzb2x2ZVxuICB9IG9mIHRhZ3MpIHtcbiAgICBpZiAodGVzdCkge1xuICAgICAgY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2godGVzdCk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBsZXQgcmVzID0gcmVzb2x2ZS5hcHBseShudWxsLCBtYXRjaCk7XG4gICAgICAgIGlmICghKHJlcyBpbnN0YW5jZW9mIFNjYWxhcikpIHJlcyA9IG5ldyBTY2FsYXIocmVzKTtcbiAgICAgICAgaWYgKGZvcm1hdCkgcmVzLmZvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoc2NhbGFyRmFsbGJhY2spIHN0ciA9IHNjYWxhckZhbGxiYWNrKHN0cik7XG4gIHJldHVybiBuZXcgU2NhbGFyKHN0cik7XG59XG5cbmNvbnN0IEZPTERfRkxPVyA9ICdmbG93JztcbmNvbnN0IEZPTERfQkxPQ0sgPSAnYmxvY2snO1xuY29uc3QgRk9MRF9RVU9URUQgPSAncXVvdGVkJzsgLy8gcHJlc3VtZXMgaSsxIGlzIGF0IHRoZSBzdGFydCBvZiBhIGxpbmVcbi8vIHJldHVybnMgaW5kZXggb2YgbGFzdCBuZXdsaW5lIGluIG1vcmUtaW5kZW50ZWQgYmxvY2tcblxuY29uc3QgY29uc3VtZU1vcmVJbmRlbnRlZExpbmVzID0gKHRleHQsIGkpID0+IHtcbiAgbGV0IGNoID0gdGV4dFtpICsgMV07XG5cbiAgd2hpbGUgKGNoID09PSAnICcgfHwgY2ggPT09ICdcXHQnKSB7XG4gICAgZG8ge1xuICAgICAgY2ggPSB0ZXh0W2kgKz0gMV07XG4gICAgfSB3aGlsZSAoY2ggJiYgY2ggIT09ICdcXG4nKTtcblxuICAgIGNoID0gdGV4dFtpICsgMV07XG4gIH1cblxuICByZXR1cm4gaTtcbn07XG4vKipcbiAqIFRyaWVzIHRvIGtlZXAgaW5wdXQgYXQgdXAgdG8gYGxpbmVXaWR0aGAgY2hhcmFjdGVycywgc3BsaXR0aW5nIG9ubHkgb24gc3BhY2VzXG4gKiBub3QgZm9sbG93ZWQgYnkgbmV3bGluZXMgb3Igc3BhY2VzIHVubGVzcyBgbW9kZWAgaXMgYCdxdW90ZWQnYC4gTGluZXMgYXJlXG4gKiB0ZXJtaW5hdGVkIHdpdGggYFxcbmAgYW5kIHN0YXJ0ZWQgd2l0aCBgaW5kZW50YC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICogQHBhcmFtIHtzdHJpbmd9IGluZGVudFxuICogQHBhcmFtIHtzdHJpbmd9IFttb2RlPSdmbG93J10gYCdibG9jaydgIHByZXZlbnRzIG1vcmUtaW5kZW50ZWQgbGluZXNcbiAqICAgZnJvbSBiZWluZyBmb2xkZWQ7IGAncXVvdGVkJ2AgYWxsb3dzIGZvciBgXFxgIGVzY2FwZXMsIGluY2x1ZGluZyBlc2NhcGVkXG4gKiAgIG5ld2xpbmVzXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmluZGVudEF0U3RhcnRdIEFjY291bnRzIGZvciBsZWFkaW5nIGNvbnRlbnRzIG9uXG4gKiAgIHRoZSBmaXJzdCBsaW5lLCBkZWZhdWx0aW5nIHRvIGBpbmRlbnQubGVuZ3RoYFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmxpbmVXaWR0aD04MF1cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5taW5Db250ZW50V2lkdGg9MjBdIEFsbG93IGhpZ2hseSBpbmRlbnRlZCBsaW5lcyB0b1xuICogICBzdHJldGNoIHRoZSBsaW5lIHdpZHRoIG9yIGluZGVudCBjb250ZW50IGZyb20gdGhlIHN0YXJ0XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLm9uRm9sZCBDYWxsZWQgb25jZSBpZiB0aGUgdGV4dCBpcyBmb2xkZWRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMub25Gb2xkIENhbGxlZCBvbmNlIGlmIGFueSBsaW5lIG9mIHRleHQgZXhjZWVkc1xuICogICBsaW5lV2lkdGggY2hhcmFjdGVyc1xuICovXG5cblxuZnVuY3Rpb24gZm9sZEZsb3dMaW5lcyh0ZXh0LCBpbmRlbnQsIG1vZGUsIHtcbiAgaW5kZW50QXRTdGFydCxcbiAgbGluZVdpZHRoID0gODAsXG4gIG1pbkNvbnRlbnRXaWR0aCA9IDIwLFxuICBvbkZvbGQsXG4gIG9uT3ZlcmZsb3dcbn0pIHtcbiAgaWYgKCFsaW5lV2lkdGggfHwgbGluZVdpZHRoIDwgMCkgcmV0dXJuIHRleHQ7XG4gIGNvbnN0IGVuZFN0ZXAgPSBNYXRoLm1heCgxICsgbWluQ29udGVudFdpZHRoLCAxICsgbGluZVdpZHRoIC0gaW5kZW50Lmxlbmd0aCk7XG4gIGlmICh0ZXh0Lmxlbmd0aCA8PSBlbmRTdGVwKSByZXR1cm4gdGV4dDtcbiAgY29uc3QgZm9sZHMgPSBbXTtcbiAgY29uc3QgZXNjYXBlZEZvbGRzID0ge307XG4gIGxldCBlbmQgPSBsaW5lV2lkdGggLSBpbmRlbnQubGVuZ3RoO1xuXG4gIGlmICh0eXBlb2YgaW5kZW50QXRTdGFydCA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAoaW5kZW50QXRTdGFydCA+IGxpbmVXaWR0aCAtIE1hdGgubWF4KDIsIG1pbkNvbnRlbnRXaWR0aCkpIGZvbGRzLnB1c2goMCk7ZWxzZSBlbmQgPSBsaW5lV2lkdGggLSBpbmRlbnRBdFN0YXJ0O1xuICB9XG5cbiAgbGV0IHNwbGl0ID0gdW5kZWZpbmVkO1xuICBsZXQgcHJldiA9IHVuZGVmaW5lZDtcbiAgbGV0IG92ZXJmbG93ID0gZmFsc2U7XG4gIGxldCBpID0gLTE7XG4gIGxldCBlc2NTdGFydCA9IC0xO1xuICBsZXQgZXNjRW5kID0gLTE7XG5cbiAgaWYgKG1vZGUgPT09IEZPTERfQkxPQ0spIHtcbiAgICBpID0gY29uc3VtZU1vcmVJbmRlbnRlZExpbmVzKHRleHQsIGkpO1xuICAgIGlmIChpICE9PSAtMSkgZW5kID0gaSArIGVuZFN0ZXA7XG4gIH1cblxuICBmb3IgKGxldCBjaDsgY2ggPSB0ZXh0W2kgKz0gMV07KSB7XG4gICAgaWYgKG1vZGUgPT09IEZPTERfUVVPVEVEICYmIGNoID09PSAnXFxcXCcpIHtcbiAgICAgIGVzY1N0YXJ0ID0gaTtcblxuICAgICAgc3dpdGNoICh0ZXh0W2kgKyAxXSkge1xuICAgICAgICBjYXNlICd4JzpcbiAgICAgICAgICBpICs9IDM7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAndSc6XG4gICAgICAgICAgaSArPSA1O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ1UnOlxuICAgICAgICAgIGkgKz0gOTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGkgKz0gMTtcbiAgICAgIH1cblxuICAgICAgZXNjRW5kID0gaTtcbiAgICB9XG5cbiAgICBpZiAoY2ggPT09ICdcXG4nKSB7XG4gICAgICBpZiAobW9kZSA9PT0gRk9MRF9CTE9DSykgaSA9IGNvbnN1bWVNb3JlSW5kZW50ZWRMaW5lcyh0ZXh0LCBpKTtcbiAgICAgIGVuZCA9IGkgKyBlbmRTdGVwO1xuICAgICAgc3BsaXQgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjaCA9PT0gJyAnICYmIHByZXYgJiYgcHJldiAhPT0gJyAnICYmIHByZXYgIT09ICdcXG4nICYmIHByZXYgIT09ICdcXHQnKSB7XG4gICAgICAgIC8vIHNwYWNlIHN1cnJvdW5kZWQgYnkgbm9uLXNwYWNlIGNhbiBiZSByZXBsYWNlZCB3aXRoIG5ld2xpbmUgKyBpbmRlbnRcbiAgICAgICAgY29uc3QgbmV4dCA9IHRleHRbaSArIDFdO1xuICAgICAgICBpZiAobmV4dCAmJiBuZXh0ICE9PSAnICcgJiYgbmV4dCAhPT0gJ1xcbicgJiYgbmV4dCAhPT0gJ1xcdCcpIHNwbGl0ID0gaTtcbiAgICAgIH1cblxuICAgICAgaWYgKGkgPj0gZW5kKSB7XG4gICAgICAgIGlmIChzcGxpdCkge1xuICAgICAgICAgIGZvbGRzLnB1c2goc3BsaXQpO1xuICAgICAgICAgIGVuZCA9IHNwbGl0ICsgZW5kU3RlcDtcbiAgICAgICAgICBzcGxpdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIGlmIChtb2RlID09PSBGT0xEX1FVT1RFRCkge1xuICAgICAgICAgIC8vIHdoaXRlLXNwYWNlIGNvbGxlY3RlZCBhdCBlbmQgbWF5IHN0cmV0Y2ggcGFzdCBsaW5lV2lkdGhcbiAgICAgICAgICB3aGlsZSAocHJldiA9PT0gJyAnIHx8IHByZXYgPT09ICdcXHQnKSB7XG4gICAgICAgICAgICBwcmV2ID0gY2g7XG4gICAgICAgICAgICBjaCA9IHRleHRbaSArPSAxXTtcbiAgICAgICAgICAgIG92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgICB9IC8vIEFjY291bnQgZm9yIG5ld2xpbmUgZXNjYXBlLCBidXQgZG9uJ3QgYnJlYWsgcHJlY2VkaW5nIGVzY2FwZVxuXG5cbiAgICAgICAgICBjb25zdCBqID0gaSA+IGVzY0VuZCArIDEgPyBpIC0gMiA6IGVzY1N0YXJ0IC0gMTsgLy8gQmFpbCBvdXQgaWYgbGluZVdpZHRoICYgbWluQ29udGVudFdpZHRoIGFyZSBzaG9ydGVyIHRoYW4gYW4gZXNjYXBlIHN0cmluZ1xuXG4gICAgICAgICAgaWYgKGVzY2FwZWRGb2xkc1tqXSkgcmV0dXJuIHRleHQ7XG4gICAgICAgICAgZm9sZHMucHVzaChqKTtcbiAgICAgICAgICBlc2NhcGVkRm9sZHNbal0gPSB0cnVlO1xuICAgICAgICAgIGVuZCA9IGogKyBlbmRTdGVwO1xuICAgICAgICAgIHNwbGl0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG92ZXJmbG93ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHByZXYgPSBjaDtcbiAgfVxuXG4gIGlmIChvdmVyZmxvdyAmJiBvbk92ZXJmbG93KSBvbk92ZXJmbG93KCk7XG4gIGlmIChmb2xkcy5sZW5ndGggPT09IDApIHJldHVybiB0ZXh0O1xuICBpZiAob25Gb2xkKSBvbkZvbGQoKTtcbiAgbGV0IHJlcyA9IHRleHQuc2xpY2UoMCwgZm9sZHNbMF0pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm9sZHMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBmb2xkID0gZm9sZHNbaV07XG4gICAgY29uc3QgZW5kID0gZm9sZHNbaSArIDFdIHx8IHRleHQubGVuZ3RoO1xuICAgIGlmIChmb2xkID09PSAwKSByZXMgPSBgXFxuJHtpbmRlbnR9JHt0ZXh0LnNsaWNlKDAsIGVuZCl9YDtlbHNlIHtcbiAgICAgIGlmIChtb2RlID09PSBGT0xEX1FVT1RFRCAmJiBlc2NhcGVkRm9sZHNbZm9sZF0pIHJlcyArPSBgJHt0ZXh0W2ZvbGRdfVxcXFxgO1xuICAgICAgcmVzICs9IGBcXG4ke2luZGVudH0ke3RleHQuc2xpY2UoZm9sZCArIDEsIGVuZCl9YDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG5jb25zdCBnZXRGb2xkT3B0aW9ucyA9ICh7XG4gIGluZGVudEF0U3RhcnRcbn0pID0+IGluZGVudEF0U3RhcnQgPyBPYmplY3QuYXNzaWduKHtcbiAgaW5kZW50QXRTdGFydFxufSwgc3RyT3B0aW9ucy5mb2xkKSA6IHN0ck9wdGlvbnMuZm9sZDsgLy8gQWxzbyBjaGVja3MgZm9yIGxpbmVzIHN0YXJ0aW5nIHdpdGggJSwgYXMgcGFyc2luZyB0aGUgb3V0cHV0IGFzIFlBTUwgMS4xIHdpbGxcbi8vIHByZXN1bWUgdGhhdCdzIHN0YXJ0aW5nIGEgbmV3IGRvY3VtZW50LlxuXG5cbmNvbnN0IGNvbnRhaW5zRG9jdW1lbnRNYXJrZXIgPSBzdHIgPT4gL14oJXwtLS18XFwuXFwuXFwuKS9tLnRlc3Qoc3RyKTtcblxuZnVuY3Rpb24gbGluZUxlbmd0aE92ZXJMaW1pdChzdHIsIGxpbmVXaWR0aCwgaW5kZW50TGVuZ3RoKSB7XG4gIGlmICghbGluZVdpZHRoIHx8IGxpbmVXaWR0aCA8IDApIHJldHVybiBmYWxzZTtcbiAgY29uc3QgbGltaXQgPSBsaW5lV2lkdGggLSBpbmRlbnRMZW5ndGg7XG4gIGNvbnN0IHN0ckxlbiA9IHN0ci5sZW5ndGg7XG4gIGlmIChzdHJMZW4gPD0gbGltaXQpIHJldHVybiBmYWxzZTtcblxuICBmb3IgKGxldCBpID0gMCwgc3RhcnQgPSAwOyBpIDwgc3RyTGVuOyArK2kpIHtcbiAgICBpZiAoc3RyW2ldID09PSAnXFxuJykge1xuICAgICAgaWYgKGkgLSBzdGFydCA+IGxpbWl0KSByZXR1cm4gdHJ1ZTtcbiAgICAgIHN0YXJ0ID0gaSArIDE7XG4gICAgICBpZiAoc3RyTGVuIC0gc3RhcnQgPD0gbGltaXQpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZG91YmxlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpIHtcbiAgY29uc3Qge1xuICAgIGltcGxpY2l0S2V5XG4gIH0gPSBjdHg7XG4gIGNvbnN0IHtcbiAgICBqc29uRW5jb2RpbmcsXG4gICAgbWluTXVsdGlMaW5lTGVuZ3RoXG4gIH0gPSBzdHJPcHRpb25zLmRvdWJsZVF1b3RlZDtcbiAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgaWYgKGpzb25FbmNvZGluZykgcmV0dXJuIGpzb247XG4gIGNvbnN0IGluZGVudCA9IGN0eC5pbmRlbnQgfHwgKGNvbnRhaW5zRG9jdW1lbnRNYXJrZXIodmFsdWUpID8gJyAgJyA6ICcnKTtcbiAgbGV0IHN0ciA9ICcnO1xuICBsZXQgc3RhcnQgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwLCBjaCA9IGpzb25baV07IGNoOyBjaCA9IGpzb25bKytpXSkge1xuICAgIGlmIChjaCA9PT0gJyAnICYmIGpzb25baSArIDFdID09PSAnXFxcXCcgJiYganNvbltpICsgMl0gPT09ICduJykge1xuICAgICAgLy8gc3BhY2UgYmVmb3JlIG5ld2xpbmUgbmVlZHMgdG8gYmUgZXNjYXBlZCB0byBub3QgYmUgZm9sZGVkXG4gICAgICBzdHIgKz0ganNvbi5zbGljZShzdGFydCwgaSkgKyAnXFxcXCAnO1xuICAgICAgaSArPSAxO1xuICAgICAgc3RhcnQgPSBpO1xuICAgICAgY2ggPSAnXFxcXCc7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAnXFxcXCcpIHN3aXRjaCAoanNvbltpICsgMV0pIHtcbiAgICAgIGNhc2UgJ3UnOlxuICAgICAgICB7XG4gICAgICAgICAgc3RyICs9IGpzb24uc2xpY2Uoc3RhcnQsIGkpO1xuICAgICAgICAgIGNvbnN0IGNvZGUgPSBqc29uLnN1YnN0cihpICsgMiwgNCk7XG5cbiAgICAgICAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJzAwMDAnOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFwwJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzAwMDcnOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFxhJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzAwMGInOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFx2JztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzAwMWInOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFxlJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzAwODUnOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFxOJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzAwYTAnOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFxfJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzIwMjgnOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFxMJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzIwMjknOlxuICAgICAgICAgICAgICBzdHIgKz0gJ1xcXFxQJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGlmIChjb2RlLnN1YnN0cigwLCAyKSA9PT0gJzAwJykgc3RyICs9ICdcXFxceCcgKyBjb2RlLnN1YnN0cigyKTtlbHNlIHN0ciArPSBqc29uLnN1YnN0cihpLCA2KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpICs9IDU7XG4gICAgICAgICAgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbic6XG4gICAgICAgIGlmIChpbXBsaWNpdEtleSB8fCBqc29uW2kgKyAyXSA9PT0gJ1wiJyB8fCBqc29uLmxlbmd0aCA8IG1pbk11bHRpTGluZUxlbmd0aCkge1xuICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBmb2xkaW5nIHdpbGwgZWF0IGZpcnN0IG5ld2xpbmVcbiAgICAgICAgICBzdHIgKz0ganNvbi5zbGljZShzdGFydCwgaSkgKyAnXFxuXFxuJztcblxuICAgICAgICAgIHdoaWxlIChqc29uW2kgKyAyXSA9PT0gJ1xcXFwnICYmIGpzb25baSArIDNdID09PSAnbicgJiYganNvbltpICsgNF0gIT09ICdcIicpIHtcbiAgICAgICAgICAgIHN0ciArPSAnXFxuJztcbiAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzdHIgKz0gaW5kZW50OyAvLyBzcGFjZSBhZnRlciBuZXdsaW5lIG5lZWRzIHRvIGJlIGVzY2FwZWQgdG8gbm90IGJlIGZvbGRlZFxuXG4gICAgICAgICAgaWYgKGpzb25baSArIDJdID09PSAnICcpIHN0ciArPSAnXFxcXCc7XG4gICAgICAgICAgaSArPSAxO1xuICAgICAgICAgIHN0YXJ0ID0gaSArIDE7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaSArPSAxO1xuICAgIH1cbiAgfVxuXG4gIHN0ciA9IHN0YXJ0ID8gc3RyICsganNvbi5zbGljZShzdGFydCkgOiBqc29uO1xuICByZXR1cm4gaW1wbGljaXRLZXkgPyBzdHIgOiBmb2xkRmxvd0xpbmVzKHN0ciwgaW5kZW50LCBGT0xEX1FVT1RFRCwgZ2V0Rm9sZE9wdGlvbnMoY3R4KSk7XG59XG5cbmZ1bmN0aW9uIHNpbmdsZVF1b3RlZFN0cmluZyh2YWx1ZSwgY3R4KSB7XG4gIGlmIChjdHguaW1wbGljaXRLZXkpIHtcbiAgICBpZiAoL1xcbi8udGVzdCh2YWx1ZSkpIHJldHVybiBkb3VibGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gc2luZ2xlIHF1b3RlZCBzdHJpbmcgY2FuJ3QgaGF2ZSBsZWFkaW5nIG9yIHRyYWlsaW5nIHdoaXRlc3BhY2UgYXJvdW5kIG5ld2xpbmVcbiAgICBpZiAoL1sgXFx0XVxcbnxcXG5bIFxcdF0vLnRlc3QodmFsdWUpKSByZXR1cm4gZG91YmxlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpO1xuICB9XG5cbiAgY29uc3QgaW5kZW50ID0gY3R4LmluZGVudCB8fCAoY29udGFpbnNEb2N1bWVudE1hcmtlcih2YWx1ZSkgPyAnICAnIDogJycpO1xuICBjb25zdCByZXMgPSBcIidcIiArIHZhbHVlLnJlcGxhY2UoLycvZywgXCInJ1wiKS5yZXBsYWNlKC9cXG4rL2csIGAkJlxcbiR7aW5kZW50fWApICsgXCInXCI7XG4gIHJldHVybiBjdHguaW1wbGljaXRLZXkgPyByZXMgOiBmb2xkRmxvd0xpbmVzKHJlcywgaW5kZW50LCBGT0xEX0ZMT1csIGdldEZvbGRPcHRpb25zKGN0eCkpO1xufVxuXG5mdW5jdGlvbiBibG9ja1N0cmluZyh7XG4gIGNvbW1lbnQsXG4gIHR5cGUsXG4gIHZhbHVlXG59LCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgLy8gMS4gQmxvY2sgY2FuJ3QgZW5kIGluIHdoaXRlc3BhY2UgdW5sZXNzIHRoZSBsYXN0IGxpbmUgaXMgbm9uLWVtcHR5LlxuICAvLyAyLiBTdHJpbmdzIGNvbnNpc3Rpbmcgb2Ygb25seSB3aGl0ZXNwYWNlIGFyZSBiZXN0IHJlbmRlcmVkIGV4cGxpY2l0bHkuXG4gIGlmICgvXFxuW1xcdCBdKyQvLnRlc3QodmFsdWUpIHx8IC9eXFxzKiQvLnRlc3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGRvdWJsZVF1b3RlZFN0cmluZyh2YWx1ZSwgY3R4KTtcbiAgfVxuXG4gIGNvbnN0IGluZGVudCA9IGN0eC5pbmRlbnQgfHwgKGN0eC5mb3JjZUJsb2NrSW5kZW50IHx8IGNvbnRhaW5zRG9jdW1lbnRNYXJrZXIodmFsdWUpID8gJyAgJyA6ICcnKTtcbiAgY29uc3QgaW5kZW50U2l6ZSA9IGluZGVudCA/ICcyJyA6ICcxJzsgLy8gcm9vdCBpcyBhdCAtMVxuXG4gIGNvbnN0IGxpdGVyYWwgPSB0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfRk9MREVEID8gZmFsc2UgOiB0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfTElURVJBTCA/IHRydWUgOiAhbGluZUxlbmd0aE92ZXJMaW1pdCh2YWx1ZSwgc3RyT3B0aW9ucy5mb2xkLmxpbmVXaWR0aCwgaW5kZW50Lmxlbmd0aCk7XG4gIGxldCBoZWFkZXIgPSBsaXRlcmFsID8gJ3wnIDogJz4nO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gaGVhZGVyICsgJ1xcbic7XG4gIGxldCB3c1N0YXJ0ID0gJyc7XG4gIGxldCB3c0VuZCA9ICcnO1xuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1tcXG5cXHQgXSokLywgd3MgPT4ge1xuICAgIGNvbnN0IG4gPSB3cy5pbmRleE9mKCdcXG4nKTtcblxuICAgIGlmIChuID09PSAtMSkge1xuICAgICAgaGVhZGVyICs9ICctJzsgLy8gc3RyaXBcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSB3cyB8fCBuICE9PSB3cy5sZW5ndGggLSAxKSB7XG4gICAgICBoZWFkZXIgKz0gJysnOyAvLyBrZWVwXG5cbiAgICAgIGlmIChvbkNob21wS2VlcCkgb25DaG9tcEtlZXAoKTtcbiAgICB9XG5cbiAgICB3c0VuZCA9IHdzLnJlcGxhY2UoL1xcbiQvLCAnJyk7XG4gICAgcmV0dXJuICcnO1xuICB9KS5yZXBsYWNlKC9eW1xcbiBdKi8sIHdzID0+IHtcbiAgICBpZiAod3MuaW5kZXhPZignICcpICE9PSAtMSkgaGVhZGVyICs9IGluZGVudFNpemU7XG4gICAgY29uc3QgbSA9IHdzLm1hdGNoKC8gKyQvKTtcblxuICAgIGlmIChtKSB7XG4gICAgICB3c1N0YXJ0ID0gd3Muc2xpY2UoMCwgLW1bMF0ubGVuZ3RoKTtcbiAgICAgIHJldHVybiBtWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB3c1N0YXJ0ID0gd3M7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9KTtcbiAgaWYgKHdzRW5kKSB3c0VuZCA9IHdzRW5kLnJlcGxhY2UoL1xcbisoPyFcXG58JCkvZywgYCQmJHtpbmRlbnR9YCk7XG4gIGlmICh3c1N0YXJ0KSB3c1N0YXJ0ID0gd3NTdGFydC5yZXBsYWNlKC9cXG4rL2csIGAkJiR7aW5kZW50fWApO1xuXG4gIGlmIChjb21tZW50KSB7XG4gICAgaGVhZGVyICs9ICcgIycgKyBjb21tZW50LnJlcGxhY2UoLyA/W1xcclxcbl0rL2csICcgJyk7XG4gICAgaWYgKG9uQ29tbWVudCkgb25Db21tZW50KCk7XG4gIH1cblxuICBpZiAoIXZhbHVlKSByZXR1cm4gYCR7aGVhZGVyfSR7aW5kZW50U2l6ZX1cXG4ke2luZGVudH0ke3dzRW5kfWA7XG5cbiAgaWYgKGxpdGVyYWwpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcbisvZywgYCQmJHtpbmRlbnR9YCk7XG4gICAgcmV0dXJuIGAke2hlYWRlcn1cXG4ke2luZGVudH0ke3dzU3RhcnR9JHt2YWx1ZX0ke3dzRW5kfWA7XG4gIH1cblxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcbisvZywgJ1xcbiQmJykucmVwbGFjZSgvKD86XnxcXG4pKFtcXHQgXS4qKSg/OihbXFxuXFx0IF0qKVxcbig/IVtcXG5cXHQgXSkpPy9nLCAnJDEkMicpIC8vIG1vcmUtaW5kZW50ZWQgbGluZXMgYXJlbid0IGZvbGRlZFxuICAvLyAgICAgICAgIF4gaW5kLmxpbmUgIF4gZW1wdHkgICAgIF4gY2FwdHVyZSBuZXh0IGVtcHR5IGxpbmVzIG9ubHkgYXQgZW5kIG9mIGluZGVudFxuICAucmVwbGFjZSgvXFxuKy9nLCBgJCYke2luZGVudH1gKTtcbiAgY29uc3QgYm9keSA9IGZvbGRGbG93TGluZXMoYCR7d3NTdGFydH0ke3ZhbHVlfSR7d3NFbmR9YCwgaW5kZW50LCBGT0xEX0JMT0NLLCBzdHJPcHRpb25zLmZvbGQpO1xuICByZXR1cm4gYCR7aGVhZGVyfVxcbiR7aW5kZW50fSR7Ym9keX1gO1xufVxuXG5mdW5jdGlvbiBwbGFpblN0cmluZyhpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgY29uc3Qge1xuICAgIGNvbW1lbnQsXG4gICAgdHlwZSxcbiAgICB2YWx1ZVxuICB9ID0gaXRlbTtcbiAgY29uc3Qge1xuICAgIGFjdHVhbFN0cmluZyxcbiAgICBpbXBsaWNpdEtleSxcbiAgICBpbmRlbnQsXG4gICAgaW5GbG93XG4gIH0gPSBjdHg7XG5cbiAgaWYgKGltcGxpY2l0S2V5ICYmIC9bXFxuW1xcXXt9LF0vLnRlc3QodmFsdWUpIHx8IGluRmxvdyAmJiAvW1tcXF17fSxdLy50ZXN0KHZhbHVlKSkge1xuICAgIHJldHVybiBkb3VibGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCk7XG4gIH1cblxuICBpZiAoIXZhbHVlIHx8IC9eW1xcblxcdCAsW1xcXXt9IyYqIXw+J1wiJUBgXXxeWz8tXSR8Xls/LV1bIFxcdF18W1xcbjpdWyBcXHRdfFsgXFx0XVxcbnxbXFxuXFx0IF0jfFtcXG5cXHQgOl0kLy50ZXN0KHZhbHVlKSkge1xuICAgIC8vIG5vdCBhbGxvd2VkOlxuICAgIC8vIC0gZW1wdHkgc3RyaW5nLCAnLScgb3IgJz8nXG4gICAgLy8gLSBzdGFydCB3aXRoIGFuIGluZGljYXRvciBjaGFyYWN0ZXIgKGV4Y2VwdCBbPzotXSkgb3IgL1s/LV0gL1xuICAgIC8vIC0gJ1xcbiAnLCAnOiAnIG9yICcgXFxuJyBhbnl3aGVyZVxuICAgIC8vIC0gJyMnIG5vdCBwcmVjZWRlZCBieSBhIG5vbi1zcGFjZSBjaGFyXG4gICAgLy8gLSBlbmQgd2l0aCAnICcgb3IgJzonXG4gICAgcmV0dXJuIGltcGxpY2l0S2V5IHx8IGluRmxvdyB8fCB2YWx1ZS5pbmRleE9mKCdcXG4nKSA9PT0gLTEgPyB2YWx1ZS5pbmRleE9mKCdcIicpICE9PSAtMSAmJiB2YWx1ZS5pbmRleE9mKFwiJ1wiKSA9PT0gLTEgPyBzaW5nbGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCkgOiBkb3VibGVRdW90ZWRTdHJpbmcodmFsdWUsIGN0eCkgOiBibG9ja1N0cmluZyhpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApO1xuICB9XG5cbiAgaWYgKCFpbXBsaWNpdEtleSAmJiAhaW5GbG93ICYmIHR5cGUgIT09IFBsYWluVmFsdWUuVHlwZS5QTEFJTiAmJiB2YWx1ZS5pbmRleE9mKCdcXG4nKSAhPT0gLTEpIHtcbiAgICAvLyBXaGVyZSBhbGxvd2VkICYgdHlwZSBub3Qgc2V0IGV4cGxpY2l0bHksIHByZWZlciBibG9jayBzdHlsZSBmb3IgbXVsdGlsaW5lIHN0cmluZ3NcbiAgICByZXR1cm4gYmxvY2tTdHJpbmcoaXRlbSwgY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKTtcbiAgfVxuXG4gIGlmIChpbmRlbnQgPT09ICcnICYmIGNvbnRhaW5zRG9jdW1lbnRNYXJrZXIodmFsdWUpKSB7XG4gICAgY3R4LmZvcmNlQmxvY2tJbmRlbnQgPSB0cnVlO1xuICAgIHJldHVybiBibG9ja1N0cmluZyhpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApO1xuICB9XG5cbiAgY29uc3Qgc3RyID0gdmFsdWUucmVwbGFjZSgvXFxuKy9nLCBgJCZcXG4ke2luZGVudH1gKTsgLy8gVmVyaWZ5IHRoYXQgb3V0cHV0IHdpbGwgYmUgcGFyc2VkIGFzIGEgc3RyaW5nLCBhcyBlLmcuIHBsYWluIG51bWJlcnMgYW5kXG4gIC8vIGJvb2xlYW5zIGdldCBwYXJzZWQgd2l0aCB0aG9zZSB0eXBlcyBpbiB2MS4yIChlLmcuICc0MicsICd0cnVlJyAmICcwLjllLTMnKSxcbiAgLy8gYW5kIG90aGVycyBpbiB2MS4xLlxuXG4gIGlmIChhY3R1YWxTdHJpbmcpIHtcbiAgICBjb25zdCB7XG4gICAgICB0YWdzXG4gICAgfSA9IGN0eC5kb2Muc2NoZW1hO1xuICAgIGNvbnN0IHJlc29sdmVkID0gcmVzb2x2ZVNjYWxhcihzdHIsIHRhZ3MsIHRhZ3Muc2NhbGFyRmFsbGJhY2spLnZhbHVlO1xuICAgIGlmICh0eXBlb2YgcmVzb2x2ZWQgIT09ICdzdHJpbmcnKSByZXR1cm4gZG91YmxlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpO1xuICB9XG5cbiAgY29uc3QgYm9keSA9IGltcGxpY2l0S2V5ID8gc3RyIDogZm9sZEZsb3dMaW5lcyhzdHIsIGluZGVudCwgRk9MRF9GTE9XLCBnZXRGb2xkT3B0aW9ucyhjdHgpKTtcblxuICBpZiAoY29tbWVudCAmJiAhaW5GbG93ICYmIChib2R5LmluZGV4T2YoJ1xcbicpICE9PSAtMSB8fCBjb21tZW50LmluZGV4T2YoJ1xcbicpICE9PSAtMSkpIHtcbiAgICBpZiAob25Db21tZW50KSBvbkNvbW1lbnQoKTtcbiAgICByZXR1cm4gYWRkQ29tbWVudEJlZm9yZShib2R5LCBpbmRlbnQsIGNvbW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGJvZHk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVN0cmluZyhpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApIHtcbiAgY29uc3Qge1xuICAgIGRlZmF1bHRUeXBlXG4gIH0gPSBzdHJPcHRpb25zO1xuICBjb25zdCB7XG4gICAgaW1wbGljaXRLZXksXG4gICAgaW5GbG93XG4gIH0gPSBjdHg7XG4gIGxldCB7XG4gICAgdHlwZSxcbiAgICB2YWx1ZVxuICB9ID0gaXRlbTtcblxuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKTtcbiAgICBpdGVtID0gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSwge1xuICAgICAgdmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IF9zdHJpbmdpZnkgPSBfdHlwZSA9PiB7XG4gICAgc3dpdGNoIChfdHlwZSkge1xuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfRk9MREVEOlxuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfTElURVJBTDpcbiAgICAgICAgcmV0dXJuIGJsb2NrU3RyaW5nKGl0ZW0sIGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCk7XG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLlFVT1RFX0RPVUJMRTpcbiAgICAgICAgcmV0dXJuIGRvdWJsZVF1b3RlZFN0cmluZyh2YWx1ZSwgY3R4KTtcblxuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuUVVPVEVfU0lOR0xFOlxuICAgICAgICByZXR1cm4gc2luZ2xlUXVvdGVkU3RyaW5nKHZhbHVlLCBjdHgpO1xuXG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5QTEFJTjpcbiAgICAgICAgcmV0dXJuIHBsYWluU3RyaW5nKGl0ZW0sIGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcblxuICBpZiAodHlwZSAhPT0gUGxhaW5WYWx1ZS5UeXBlLlFVT1RFX0RPVUJMRSAmJiAvW1xceDAwLVxceDA4XFx4MGItXFx4MWZcXHg3Zi1cXHg5Zl0vLnRlc3QodmFsdWUpKSB7XG4gICAgLy8gZm9yY2UgZG91YmxlIHF1b3RlcyBvbiBjb250cm9sIGNoYXJhY3RlcnNcbiAgICB0eXBlID0gUGxhaW5WYWx1ZS5UeXBlLlFVT1RFX0RPVUJMRTtcbiAgfSBlbHNlIGlmICgoaW1wbGljaXRLZXkgfHwgaW5GbG93KSAmJiAodHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkJMT0NLX0ZPTERFRCB8fCB0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfTElURVJBTCkpIHtcbiAgICAvLyBzaG91bGQgbm90IGhhcHBlbjsgYmxvY2tzIGFyZSBub3QgdmFsaWQgaW5zaWRlIGZsb3cgY29udGFpbmVyc1xuICAgIHR5cGUgPSBQbGFpblZhbHVlLlR5cGUuUVVPVEVfRE9VQkxFO1xuICB9XG5cbiAgbGV0IHJlcyA9IF9zdHJpbmdpZnkodHlwZSk7XG5cbiAgaWYgKHJlcyA9PT0gbnVsbCkge1xuICAgIHJlcyA9IF9zdHJpbmdpZnkoZGVmYXVsdFR5cGUpO1xuICAgIGlmIChyZXMgPT09IG51bGwpIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZGVmYXVsdCBzdHJpbmcgdHlwZSAke2RlZmF1bHRUeXBlfWApO1xuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5TnVtYmVyKHtcbiAgZm9ybWF0LFxuICBtaW5GcmFjdGlvbkRpZ2l0cyxcbiAgdGFnLFxuICB2YWx1ZVxufSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnYmlnaW50JykgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gIGlmICghaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gaXNOYU4odmFsdWUpID8gJy5uYW4nIDogdmFsdWUgPCAwID8gJy0uaW5mJyA6ICcuaW5mJztcbiAgbGV0IG4gPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG5cbiAgaWYgKCFmb3JtYXQgJiYgbWluRnJhY3Rpb25EaWdpdHMgJiYgKCF0YWcgfHwgdGFnID09PSAndGFnOnlhbWwub3JnLDIwMDI6ZmxvYXQnKSAmJiAvXlxcZC8udGVzdChuKSkge1xuICAgIGxldCBpID0gbi5pbmRleE9mKCcuJyk7XG5cbiAgICBpZiAoaSA8IDApIHtcbiAgICAgIGkgPSBuLmxlbmd0aDtcbiAgICAgIG4gKz0gJy4nO1xuICAgIH1cblxuICAgIGxldCBkID0gbWluRnJhY3Rpb25EaWdpdHMgLSAobi5sZW5ndGggLSBpIC0gMSk7XG5cbiAgICB3aGlsZSAoZC0tID4gMCkgbiArPSAnMCc7XG4gIH1cblxuICByZXR1cm4gbjtcbn1cblxuZnVuY3Rpb24gY2hlY2tGbG93Q29sbGVjdGlvbkVuZChlcnJvcnMsIGNzdCkge1xuICBsZXQgY2hhciwgbmFtZTtcblxuICBzd2l0Y2ggKGNzdC50eXBlKSB7XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuRkxPV19NQVA6XG4gICAgICBjaGFyID0gJ30nO1xuICAgICAgbmFtZSA9ICdmbG93IG1hcCc7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkZMT1dfU0VROlxuICAgICAgY2hhciA9ICddJztcbiAgICAgIG5hbWUgPSAnZmxvdyBzZXF1ZW5jZSc7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBlcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihjc3QsICdOb3QgYSBmbG93IGNvbGxlY3Rpb24hPycpKTtcbiAgICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBsYXN0SXRlbTtcblxuICBmb3IgKGxldCBpID0gY3N0Lml0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgY29uc3QgaXRlbSA9IGNzdC5pdGVtc1tpXTtcblxuICAgIGlmICghaXRlbSB8fCBpdGVtLnR5cGUgIT09IFBsYWluVmFsdWUuVHlwZS5DT01NRU5UKSB7XG4gICAgICBsYXN0SXRlbSA9IGl0ZW07XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAobGFzdEl0ZW0gJiYgbGFzdEl0ZW0uY2hhciAhPT0gY2hhcikge1xuICAgIGNvbnN0IG1zZyA9IGBFeHBlY3RlZCAke25hbWV9IHRvIGVuZCB3aXRoICR7Y2hhcn1gO1xuICAgIGxldCBlcnI7XG5cbiAgICBpZiAodHlwZW9mIGxhc3RJdGVtLm9mZnNldCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGVyciA9IG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGNzdCwgbXNnKTtcbiAgICAgIGVyci5vZmZzZXQgPSBsYXN0SXRlbS5vZmZzZXQgKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnIgPSBuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihsYXN0SXRlbSwgbXNnKTtcbiAgICAgIGlmIChsYXN0SXRlbS5yYW5nZSAmJiBsYXN0SXRlbS5yYW5nZS5lbmQpIGVyci5vZmZzZXQgPSBsYXN0SXRlbS5yYW5nZS5lbmQgLSBsYXN0SXRlbS5yYW5nZS5zdGFydDtcbiAgICB9XG5cbiAgICBlcnJvcnMucHVzaChlcnIpO1xuICB9XG59XG5mdW5jdGlvbiBjaGVja0Zsb3dDb21tZW50U3BhY2UoZXJyb3JzLCBjb21tZW50KSB7XG4gIGNvbnN0IHByZXYgPSBjb21tZW50LmNvbnRleHQuc3JjW2NvbW1lbnQucmFuZ2Uuc3RhcnQgLSAxXTtcblxuICBpZiAocHJldiAhPT0gJ1xcbicgJiYgcHJldiAhPT0gJ1xcdCcgJiYgcHJldiAhPT0gJyAnKSB7XG4gICAgY29uc3QgbXNnID0gJ0NvbW1lbnRzIG11c3QgYmUgc2VwYXJhdGVkIGZyb20gb3RoZXIgdG9rZW5zIGJ5IHdoaXRlIHNwYWNlIGNoYXJhY3RlcnMnO1xuICAgIGVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGNvbW1lbnQsIG1zZykpO1xuICB9XG59XG5mdW5jdGlvbiBnZXRMb25nS2V5RXJyb3Ioc291cmNlLCBrZXkpIHtcbiAgY29uc3Qgc2sgPSBTdHJpbmcoa2V5KTtcbiAgY29uc3QgayA9IHNrLnN1YnN0cigwLCA4KSArICcuLi4nICsgc2suc3Vic3RyKC04KTtcbiAgcmV0dXJuIG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKHNvdXJjZSwgYFRoZSBcIiR7a31cIiBrZXkgaXMgdG9vIGxvbmdgKTtcbn1cbmZ1bmN0aW9uIHJlc29sdmVDb21tZW50cyhjb2xsZWN0aW9uLCBjb21tZW50cykge1xuICBmb3IgKGNvbnN0IHtcbiAgICBhZnRlcktleSxcbiAgICBiZWZvcmUsXG4gICAgY29tbWVudFxuICB9IG9mIGNvbW1lbnRzKSB7XG4gICAgbGV0IGl0ZW0gPSBjb2xsZWN0aW9uLml0ZW1zW2JlZm9yZV07XG5cbiAgICBpZiAoIWl0ZW0pIHtcbiAgICAgIGlmIChjb21tZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGNvbGxlY3Rpb24uY29tbWVudCkgY29sbGVjdGlvbi5jb21tZW50ICs9ICdcXG4nICsgY29tbWVudDtlbHNlIGNvbGxlY3Rpb24uY29tbWVudCA9IGNvbW1lbnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhZnRlcktleSAmJiBpdGVtLnZhbHVlKSBpdGVtID0gaXRlbS52YWx1ZTtcblxuICAgICAgaWYgKGNvbW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYWZ0ZXJLZXkgfHwgIWl0ZW0uY29tbWVudEJlZm9yZSkgaXRlbS5zcGFjZUJlZm9yZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXRlbS5jb21tZW50QmVmb3JlKSBpdGVtLmNvbW1lbnRCZWZvcmUgKz0gJ1xcbicgKyBjb21tZW50O2Vsc2UgaXRlbS5jb21tZW50QmVmb3JlID0gY29tbWVudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gb24gZXJyb3IsIHdpbGwgcmV0dXJuIHsgc3RyOiBzdHJpbmcsIGVycm9yczogRXJyb3JbXSB9XG5mdW5jdGlvbiByZXNvbHZlU3RyaW5nKGRvYywgbm9kZSkge1xuICBjb25zdCByZXMgPSBub2RlLnN0clZhbHVlO1xuICBpZiAoIXJlcykgcmV0dXJuICcnO1xuICBpZiAodHlwZW9mIHJlcyA9PT0gJ3N0cmluZycpIHJldHVybiByZXM7XG4gIHJlcy5lcnJvcnMuZm9yRWFjaChlcnJvciA9PiB7XG4gICAgaWYgKCFlcnJvci5zb3VyY2UpIGVycm9yLnNvdXJjZSA9IG5vZGU7XG4gICAgZG9jLmVycm9ycy5wdXNoKGVycm9yKTtcbiAgfSk7XG4gIHJldHVybiByZXMuc3RyO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlVGFnSGFuZGxlKGRvYywgbm9kZSkge1xuICBjb25zdCB7XG4gICAgaGFuZGxlLFxuICAgIHN1ZmZpeFxuICB9ID0gbm9kZS50YWc7XG4gIGxldCBwcmVmaXggPSBkb2MudGFnUHJlZml4ZXMuZmluZChwID0+IHAuaGFuZGxlID09PSBoYW5kbGUpO1xuXG4gIGlmICghcHJlZml4KSB7XG4gICAgY29uc3QgZHRwID0gZG9jLmdldERlZmF1bHRzKCkudGFnUHJlZml4ZXM7XG4gICAgaWYgKGR0cCkgcHJlZml4ID0gZHRwLmZpbmQocCA9PiBwLmhhbmRsZSA9PT0gaGFuZGxlKTtcbiAgICBpZiAoIXByZWZpeCkgdGhyb3cgbmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3Iobm9kZSwgYFRoZSAke2hhbmRsZX0gdGFnIGhhbmRsZSBpcyBub24tZGVmYXVsdCBhbmQgd2FzIG5vdCBkZWNsYXJlZC5gKTtcbiAgfVxuXG4gIGlmICghc3VmZml4KSB0aHJvdyBuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihub2RlLCBgVGhlICR7aGFuZGxlfSB0YWcgaGFzIG5vIHN1ZmZpeC5gKTtcblxuICBpZiAoaGFuZGxlID09PSAnIScgJiYgKGRvYy52ZXJzaW9uIHx8IGRvYy5vcHRpb25zLnZlcnNpb24pID09PSAnMS4wJykge1xuICAgIGlmIChzdWZmaXhbMF0gPT09ICdeJykge1xuICAgICAgZG9jLndhcm5pbmdzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFdhcm5pbmcobm9kZSwgJ1lBTUwgMS4wIF4gdGFnIGV4cGFuc2lvbiBpcyBub3Qgc3VwcG9ydGVkJykpO1xuICAgICAgcmV0dXJuIHN1ZmZpeDtcbiAgICB9XG5cbiAgICBpZiAoL1s6L10vLnRlc3Qoc3VmZml4KSkge1xuICAgICAgLy8gd29yZC9mb28gLT4gdGFnOndvcmQueWFtbC5vcmcsMjAwMjpmb29cbiAgICAgIGNvbnN0IHZvY2FiID0gc3VmZml4Lm1hdGNoKC9eKFthLXowLTktXSspXFwvKC4qKS9pKTtcbiAgICAgIHJldHVybiB2b2NhYiA/IGB0YWc6JHt2b2NhYlsxXX0ueWFtbC5vcmcsMjAwMjoke3ZvY2FiWzJdfWAgOiBgdGFnOiR7c3VmZml4fWA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHByZWZpeC5wcmVmaXggKyBkZWNvZGVVUklDb21wb25lbnQoc3VmZml4KTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVRhZ05hbWUoZG9jLCBub2RlKSB7XG4gIGNvbnN0IHtcbiAgICB0YWcsXG4gICAgdHlwZVxuICB9ID0gbm9kZTtcbiAgbGV0IG5vblNwZWNpZmljID0gZmFsc2U7XG5cbiAgaWYgKHRhZykge1xuICAgIGNvbnN0IHtcbiAgICAgIGhhbmRsZSxcbiAgICAgIHN1ZmZpeCxcbiAgICAgIHZlcmJhdGltXG4gICAgfSA9IHRhZztcblxuICAgIGlmICh2ZXJiYXRpbSkge1xuICAgICAgaWYgKHZlcmJhdGltICE9PSAnIScgJiYgdmVyYmF0aW0gIT09ICchIScpIHJldHVybiB2ZXJiYXRpbTtcbiAgICAgIGNvbnN0IG1zZyA9IGBWZXJiYXRpbSB0YWdzIGFyZW4ndCByZXNvbHZlZCwgc28gJHt2ZXJiYXRpbX0gaXMgaW52YWxpZC5gO1xuICAgICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKG5vZGUsIG1zZykpO1xuICAgIH0gZWxzZSBpZiAoaGFuZGxlID09PSAnIScgJiYgIXN1ZmZpeCkge1xuICAgICAgbm9uU3BlY2lmaWMgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZVRhZ0hhbmRsZShkb2MsIG5vZGUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZG9jLmVycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5CTE9DS19GT0xERUQ6XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfTElURVJBTDpcbiAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5RVU9URV9ET1VCTEU6XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuUVVPVEVfU0lOR0xFOlxuICAgICAgcmV0dXJuIFBsYWluVmFsdWUuZGVmYXVsdFRhZ3MuU1RSO1xuXG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuRkxPV19NQVA6XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuTUFQOlxuICAgICAgcmV0dXJuIFBsYWluVmFsdWUuZGVmYXVsdFRhZ3MuTUFQO1xuXG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuRkxPV19TRVE6XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuU0VROlxuICAgICAgcmV0dXJuIFBsYWluVmFsdWUuZGVmYXVsdFRhZ3MuU0VRO1xuXG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuUExBSU46XG4gICAgICByZXR1cm4gbm9uU3BlY2lmaWMgPyBQbGFpblZhbHVlLmRlZmF1bHRUYWdzLlNUUiA6IG51bGw7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUJ5VGFnTmFtZShkb2MsIG5vZGUsIHRhZ05hbWUpIHtcbiAgY29uc3Qge1xuICAgIHRhZ3NcbiAgfSA9IGRvYy5zY2hlbWE7XG4gIGNvbnN0IG1hdGNoV2l0aFRlc3QgPSBbXTtcblxuICBmb3IgKGNvbnN0IHRhZyBvZiB0YWdzKSB7XG4gICAgaWYgKHRhZy50YWcgPT09IHRhZ05hbWUpIHtcbiAgICAgIGlmICh0YWcudGVzdCkgbWF0Y2hXaXRoVGVzdC5wdXNoKHRhZyk7ZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHRhZy5yZXNvbHZlKGRvYywgbm9kZSk7XG4gICAgICAgIHJldHVybiByZXMgaW5zdGFuY2VvZiBDb2xsZWN0aW9uID8gcmVzIDogbmV3IFNjYWxhcihyZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN0ciA9IHJlc29sdmVTdHJpbmcoZG9jLCBub2RlKTtcbiAgaWYgKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnICYmIG1hdGNoV2l0aFRlc3QubGVuZ3RoID4gMCkgcmV0dXJuIHJlc29sdmVTY2FsYXIoc3RyLCBtYXRjaFdpdGhUZXN0LCB0YWdzLnNjYWxhckZhbGxiYWNrKTtcbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldEZhbGxiYWNrVGFnTmFtZSh7XG4gIHR5cGVcbn0pIHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuRkxPV19NQVA6XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuTUFQOlxuICAgICAgcmV0dXJuIFBsYWluVmFsdWUuZGVmYXVsdFRhZ3MuTUFQO1xuXG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuRkxPV19TRVE6XG4gICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuU0VROlxuICAgICAgcmV0dXJuIFBsYWluVmFsdWUuZGVmYXVsdFRhZ3MuU0VRO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBQbGFpblZhbHVlLmRlZmF1bHRUYWdzLlNUUjtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlVGFnKGRvYywgbm9kZSwgdGFnTmFtZSkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlcyA9IHJlc29sdmVCeVRhZ05hbWUoZG9jLCBub2RlLCB0YWdOYW1lKTtcblxuICAgIGlmIChyZXMpIHtcbiAgICAgIGlmICh0YWdOYW1lICYmIG5vZGUudGFnKSByZXMudGFnID0gdGFnTmFtZTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghZXJyb3Iuc291cmNlKSBlcnJvci5zb3VyY2UgPSBub2RlO1xuICAgIGRvYy5lcnJvcnMucHVzaChlcnJvcik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGZhbGxiYWNrID0gZ2V0RmFsbGJhY2tUYWdOYW1lKG5vZGUpO1xuICAgIGlmICghZmFsbGJhY2spIHRocm93IG5ldyBFcnJvcihgVGhlIHRhZyAke3RhZ05hbWV9IGlzIHVuYXZhaWxhYmxlYCk7XG4gICAgY29uc3QgbXNnID0gYFRoZSB0YWcgJHt0YWdOYW1lfSBpcyB1bmF2YWlsYWJsZSwgZmFsbGluZyBiYWNrIHRvICR7ZmFsbGJhY2t9YDtcbiAgICBkb2Mud2FybmluZ3MucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MV2FybmluZyhub2RlLCBtc2cpKTtcbiAgICBjb25zdCByZXMgPSByZXNvbHZlQnlUYWdOYW1lKGRvYywgbm9kZSwgZmFsbGJhY2spO1xuICAgIHJlcy50YWcgPSB0YWdOYW1lO1xuICAgIHJldHVybiByZXM7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgcmVmRXJyb3IgPSBuZXcgUGxhaW5WYWx1ZS5ZQU1MUmVmZXJlbmNlRXJyb3Iobm9kZSwgZXJyb3IubWVzc2FnZSk7XG4gICAgcmVmRXJyb3Iuc3RhY2sgPSBlcnJvci5zdGFjaztcbiAgICBkb2MuZXJyb3JzLnB1c2gocmVmRXJyb3IpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmNvbnN0IGlzQ29sbGVjdGlvbkl0ZW0gPSBub2RlID0+IHtcbiAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHtcbiAgICB0eXBlXG4gIH0gPSBub2RlO1xuICByZXR1cm4gdHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLk1BUF9LRVkgfHwgdHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLk1BUF9WQUxVRSB8fCB0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuU0VRX0lURU07XG59O1xuXG5mdW5jdGlvbiByZXNvbHZlTm9kZVByb3BzKGVycm9ycywgbm9kZSkge1xuICBjb25zdCBjb21tZW50cyA9IHtcbiAgICBiZWZvcmU6IFtdLFxuICAgIGFmdGVyOiBbXVxuICB9O1xuICBsZXQgaGFzQW5jaG9yID0gZmFsc2U7XG4gIGxldCBoYXNUYWcgPSBmYWxzZTtcbiAgY29uc3QgcHJvcHMgPSBpc0NvbGxlY3Rpb25JdGVtKG5vZGUuY29udGV4dC5wYXJlbnQpID8gbm9kZS5jb250ZXh0LnBhcmVudC5wcm9wcy5jb25jYXQobm9kZS5wcm9wcykgOiBub2RlLnByb3BzO1xuXG4gIGZvciAoY29uc3Qge1xuICAgIHN0YXJ0LFxuICAgIGVuZFxuICB9IG9mIHByb3BzKSB7XG4gICAgc3dpdGNoIChub2RlLmNvbnRleHQuc3JjW3N0YXJ0XSkge1xuICAgICAgY2FzZSBQbGFpblZhbHVlLkNoYXIuQ09NTUVOVDpcbiAgICAgICAge1xuICAgICAgICAgIGlmICghbm9kZS5jb21tZW50SGFzUmVxdWlyZWRXaGl0ZXNwYWNlKHN0YXJ0KSkge1xuICAgICAgICAgICAgY29uc3QgbXNnID0gJ0NvbW1lbnRzIG11c3QgYmUgc2VwYXJhdGVkIGZyb20gb3RoZXIgdG9rZW5zIGJ5IHdoaXRlIHNwYWNlIGNoYXJhY3RlcnMnO1xuICAgICAgICAgICAgZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3Iobm9kZSwgbXNnKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgaGVhZGVyLFxuICAgICAgICAgICAgdmFsdWVSYW5nZVxuICAgICAgICAgIH0gPSBub2RlO1xuICAgICAgICAgIGNvbnN0IGNjID0gdmFsdWVSYW5nZSAmJiAoc3RhcnQgPiB2YWx1ZVJhbmdlLnN0YXJ0IHx8IGhlYWRlciAmJiBzdGFydCA+IGhlYWRlci5zdGFydCkgPyBjb21tZW50cy5hZnRlciA6IGNvbW1lbnRzLmJlZm9yZTtcbiAgICAgICAgICBjYy5wdXNoKG5vZGUuY29udGV4dC5zcmMuc2xpY2Uoc3RhcnQgKyAxLCBlbmQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgLy8gQWN0dWFsIGFuY2hvciAmIHRhZyByZXNvbHV0aW9uIGlzIGhhbmRsZWQgYnkgc2NoZW1hLCBoZXJlIHdlIGp1c3QgY29tcGxhaW5cblxuICAgICAgY2FzZSBQbGFpblZhbHVlLkNoYXIuQU5DSE9SOlxuICAgICAgICBpZiAoaGFzQW5jaG9yKSB7XG4gICAgICAgICAgY29uc3QgbXNnID0gJ0Egbm9kZSBjYW4gaGF2ZSBhdCBtb3N0IG9uZSBhbmNob3InO1xuICAgICAgICAgIGVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKG5vZGUsIG1zZykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaGFzQW5jaG9yID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5DaGFyLlRBRzpcbiAgICAgICAgaWYgKGhhc1RhZykge1xuICAgICAgICAgIGNvbnN0IG1zZyA9ICdBIG5vZGUgY2FuIGhhdmUgYXQgbW9zdCBvbmUgdGFnJztcbiAgICAgICAgICBlcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihub2RlLCBtc2cpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhhc1RhZyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY29tbWVudHMsXG4gICAgaGFzQW5jaG9yLFxuICAgIGhhc1RhZ1xuICB9O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlTm9kZVZhbHVlKGRvYywgbm9kZSkge1xuICBjb25zdCB7XG4gICAgYW5jaG9ycyxcbiAgICBlcnJvcnMsXG4gICAgc2NoZW1hXG4gIH0gPSBkb2M7XG5cbiAgaWYgKG5vZGUudHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkFMSUFTKSB7XG4gICAgY29uc3QgbmFtZSA9IG5vZGUucmF3VmFsdWU7XG4gICAgY29uc3Qgc3JjID0gYW5jaG9ycy5nZXROb2RlKG5hbWUpO1xuXG4gICAgaWYgKCFzcmMpIHtcbiAgICAgIGNvbnN0IG1zZyA9IGBBbGlhc2VkIGFuY2hvciBub3QgZm91bmQ6ICR7bmFtZX1gO1xuICAgICAgZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFJlZmVyZW5jZUVycm9yKG5vZGUsIG1zZykpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSAvLyBMYXp5IHJlc29sdXRpb24gZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXNcblxuXG4gICAgY29uc3QgcmVzID0gbmV3IEFsaWFzKHNyYyk7XG5cbiAgICBhbmNob3JzLl9jc3RBbGlhc2VzLnB1c2gocmVzKTtcblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBjb25zdCB0YWdOYW1lID0gcmVzb2x2ZVRhZ05hbWUoZG9jLCBub2RlKTtcbiAgaWYgKHRhZ05hbWUpIHJldHVybiByZXNvbHZlVGFnKGRvYywgbm9kZSwgdGFnTmFtZSk7XG5cbiAgaWYgKG5vZGUudHlwZSAhPT0gUGxhaW5WYWx1ZS5UeXBlLlBMQUlOKSB7XG4gICAgY29uc3QgbXNnID0gYEZhaWxlZCB0byByZXNvbHZlICR7bm9kZS50eXBlfSBub2RlIGhlcmVgO1xuICAgIGVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTeW50YXhFcnJvcihub2RlLCBtc2cpKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3Qgc3RyID0gcmVzb2x2ZVN0cmluZyhkb2MsIG5vZGUpO1xuICAgIHJldHVybiByZXNvbHZlU2NhbGFyKHN0ciwgc2NoZW1hLnRhZ3MsIHNjaGVtYS50YWdzLnNjYWxhckZhbGxiYWNrKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoIWVycm9yLnNvdXJjZSkgZXJyb3Iuc291cmNlID0gbm9kZTtcbiAgICBlcnJvcnMucHVzaChlcnJvcik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn0gLy8gc2V0cyBub2RlLnJlc29sdmVkIG9uIHN1Y2Nlc3NcblxuXG5mdW5jdGlvbiByZXNvbHZlTm9kZShkb2MsIG5vZGUpIHtcbiAgaWYgKCFub2RlKSByZXR1cm4gbnVsbDtcbiAgaWYgKG5vZGUuZXJyb3IpIGRvYy5lcnJvcnMucHVzaChub2RlLmVycm9yKTtcbiAgY29uc3Qge1xuICAgIGNvbW1lbnRzLFxuICAgIGhhc0FuY2hvcixcbiAgICBoYXNUYWdcbiAgfSA9IHJlc29sdmVOb2RlUHJvcHMoZG9jLmVycm9ycywgbm9kZSk7XG5cbiAgaWYgKGhhc0FuY2hvcikge1xuICAgIGNvbnN0IHtcbiAgICAgIGFuY2hvcnNcbiAgICB9ID0gZG9jO1xuICAgIGNvbnN0IG5hbWUgPSBub2RlLmFuY2hvcjtcbiAgICBjb25zdCBwcmV2ID0gYW5jaG9ycy5nZXROb2RlKG5hbWUpOyAvLyBBdCB0aGlzIHBvaW50LCBhbGlhc2VzIGZvciBhbnkgcHJlY2VkaW5nIG5vZGUgd2l0aCB0aGUgc2FtZSBhbmNob3JcbiAgICAvLyBuYW1lIGhhdmUgYWxyZWFkeSBiZWVuIHJlc29sdmVkLCBzbyBpdCBtYXkgc2FmZWx5IGJlIHJlbmFtZWQuXG5cbiAgICBpZiAocHJldikgYW5jaG9ycy5tYXBbYW5jaG9ycy5uZXdOYW1lKG5hbWUpXSA9IHByZXY7IC8vIER1cmluZyBwYXJzaW5nLCB3ZSBuZWVkIHRvIHN0b3JlIHRoZSBDU1Qgbm9kZSBpbiBhbmNob3JzLm1hcCBhc1xuICAgIC8vIGFuY2hvcnMgbmVlZCB0byBiZSBhdmFpbGFibGUgZHVyaW5nIHJlc29sdXRpb24gdG8gYWxsb3cgZm9yXG4gICAgLy8gY2lyY3VsYXIgcmVmZXJlbmNlcy5cblxuICAgIGFuY2hvcnMubWFwW25hbWVdID0gbm9kZTtcbiAgfVxuXG4gIGlmIChub2RlLnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5BTElBUyAmJiAoaGFzQW5jaG9yIHx8IGhhc1RhZykpIHtcbiAgICBjb25zdCBtc2cgPSAnQW4gYWxpYXMgbm9kZSBtdXN0IG5vdCBzcGVjaWZ5IGFueSBwcm9wZXJ0aWVzJztcbiAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3Iobm9kZSwgbXNnKSk7XG4gIH1cblxuICBjb25zdCByZXMgPSByZXNvbHZlTm9kZVZhbHVlKGRvYywgbm9kZSk7XG5cbiAgaWYgKHJlcykge1xuICAgIHJlcy5yYW5nZSA9IFtub2RlLnJhbmdlLnN0YXJ0LCBub2RlLnJhbmdlLmVuZF07XG4gICAgaWYgKGRvYy5vcHRpb25zLmtlZXBDc3ROb2RlcykgcmVzLmNzdE5vZGUgPSBub2RlO1xuICAgIGlmIChkb2Mub3B0aW9ucy5rZWVwTm9kZVR5cGVzKSByZXMudHlwZSA9IG5vZGUudHlwZTtcbiAgICBjb25zdCBjYiA9IGNvbW1lbnRzLmJlZm9yZS5qb2luKCdcXG4nKTtcblxuICAgIGlmIChjYikge1xuICAgICAgcmVzLmNvbW1lbnRCZWZvcmUgPSByZXMuY29tbWVudEJlZm9yZSA/IGAke3Jlcy5jb21tZW50QmVmb3JlfVxcbiR7Y2J9YCA6IGNiO1xuICAgIH1cblxuICAgIGNvbnN0IGNhID0gY29tbWVudHMuYWZ0ZXIuam9pbignXFxuJyk7XG4gICAgaWYgKGNhKSByZXMuY29tbWVudCA9IHJlcy5jb21tZW50ID8gYCR7cmVzLmNvbW1lbnR9XFxuJHtjYX1gIDogY2E7XG4gIH1cblxuICByZXR1cm4gbm9kZS5yZXNvbHZlZCA9IHJlcztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZU1hcChkb2MsIGNzdCkge1xuICBpZiAoY3N0LnR5cGUgIT09IFBsYWluVmFsdWUuVHlwZS5NQVAgJiYgY3N0LnR5cGUgIT09IFBsYWluVmFsdWUuVHlwZS5GTE9XX01BUCkge1xuICAgIGNvbnN0IG1zZyA9IGBBICR7Y3N0LnR5cGV9IG5vZGUgY2Fubm90IGJlIHJlc29sdmVkIGFzIGEgbWFwcGluZ2A7XG4gICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTeW50YXhFcnJvcihjc3QsIG1zZykpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qge1xuICAgIGNvbW1lbnRzLFxuICAgIGl0ZW1zXG4gIH0gPSBjc3QudHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkZMT1dfTUFQID8gcmVzb2x2ZUZsb3dNYXBJdGVtcyhkb2MsIGNzdCkgOiByZXNvbHZlQmxvY2tNYXBJdGVtcyhkb2MsIGNzdCk7XG4gIGNvbnN0IG1hcCA9IG5ldyBZQU1MTWFwKCk7XG4gIG1hcC5pdGVtcyA9IGl0ZW1zO1xuICByZXNvbHZlQ29tbWVudHMobWFwLCBjb21tZW50cyk7XG4gIGxldCBoYXNDb2xsZWN0aW9uS2V5ID0gZmFsc2U7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGtleTogaUtleVxuICAgIH0gPSBpdGVtc1tpXTtcbiAgICBpZiAoaUtleSBpbnN0YW5jZW9mIENvbGxlY3Rpb24pIGhhc0NvbGxlY3Rpb25LZXkgPSB0cnVlO1xuXG4gICAgaWYgKGRvYy5zY2hlbWEubWVyZ2UgJiYgaUtleSAmJiBpS2V5LnZhbHVlID09PSBNRVJHRV9LRVkpIHtcbiAgICAgIGl0ZW1zW2ldID0gbmV3IE1lcmdlKGl0ZW1zW2ldKTtcbiAgICAgIGNvbnN0IHNvdXJjZXMgPSBpdGVtc1tpXS52YWx1ZS5pdGVtcztcbiAgICAgIGxldCBlcnJvciA9IG51bGw7XG4gICAgICBzb3VyY2VzLnNvbWUobm9kZSA9PiB7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgQWxpYXMpIHtcbiAgICAgICAgICAvLyBEdXJpbmcgcGFyc2luZywgYWxpYXMgc291cmNlcyBhcmUgQ1NUIG5vZGVzOyB0byBhY2NvdW50IGZvclxuICAgICAgICAgIC8vIGNpcmN1bGFyIHJlZmVyZW5jZXMgdGhlaXIgcmVzb2x2ZWQgdmFsdWVzIGNhbid0IGJlIHVzZWQgaGVyZS5cbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB0eXBlXG4gICAgICAgICAgfSA9IG5vZGUuc291cmNlO1xuICAgICAgICAgIGlmICh0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuTUFQIHx8IHR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5GTE9XX01BUCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIHJldHVybiBlcnJvciA9ICdNZXJnZSBub2RlcyBhbGlhc2VzIGNhbiBvbmx5IHBvaW50IHRvIG1hcHMnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVycm9yID0gJ01lcmdlIG5vZGVzIGNhbiBvbmx5IGhhdmUgQWxpYXMgbm9kZXMgYXMgdmFsdWVzJztcbiAgICAgIH0pO1xuICAgICAgaWYgKGVycm9yKSBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoY3N0LCBlcnJvcikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCBpdGVtcy5sZW5ndGg7ICsraikge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAga2V5OiBqS2V5XG4gICAgICAgIH0gPSBpdGVtc1tqXTtcblxuICAgICAgICBpZiAoaUtleSA9PT0gaktleSB8fCBpS2V5ICYmIGpLZXkgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGlLZXksICd2YWx1ZScpICYmIGlLZXkudmFsdWUgPT09IGpLZXkudmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBtc2cgPSBgTWFwIGtleXMgbXVzdCBiZSB1bmlxdWU7IFwiJHtpS2V5fVwiIGlzIHJlcGVhdGVkYDtcbiAgICAgICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoY3N0LCBtc2cpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChoYXNDb2xsZWN0aW9uS2V5ICYmICFkb2Mub3B0aW9ucy5tYXBBc01hcCkge1xuICAgIGNvbnN0IHdhcm4gPSAnS2V5cyB3aXRoIGNvbGxlY3Rpb24gdmFsdWVzIHdpbGwgYmUgc3RyaW5naWZpZWQgYXMgWUFNTCBkdWUgdG8gSlMgT2JqZWN0IHJlc3RyaWN0aW9ucy4gVXNlIG1hcEFzTWFwOiB0cnVlIHRvIGF2b2lkIHRoaXMuJztcbiAgICBkb2Mud2FybmluZ3MucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MV2FybmluZyhjc3QsIHdhcm4pKTtcbiAgfVxuXG4gIGNzdC5yZXNvbHZlZCA9IG1hcDtcbiAgcmV0dXJuIG1hcDtcbn1cblxuY29uc3QgdmFsdWVIYXNQYWlyQ29tbWVudCA9ICh7XG4gIGNvbnRleHQ6IHtcbiAgICBsaW5lU3RhcnQsXG4gICAgbm9kZSxcbiAgICBzcmNcbiAgfSxcbiAgcHJvcHNcbn0pID0+IHtcbiAgaWYgKHByb3BzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCB7XG4gICAgc3RhcnRcbiAgfSA9IHByb3BzWzBdO1xuICBpZiAobm9kZSAmJiBzdGFydCA+IG5vZGUudmFsdWVSYW5nZS5zdGFydCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoc3JjW3N0YXJ0XSAhPT0gUGxhaW5WYWx1ZS5DaGFyLkNPTU1FTlQpIHJldHVybiBmYWxzZTtcblxuICBmb3IgKGxldCBpID0gbGluZVN0YXJ0OyBpIDwgc3RhcnQ7ICsraSkgaWYgKHNyY1tpXSA9PT0gJ1xcbicpIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIHJlc29sdmVQYWlyQ29tbWVudChpdGVtLCBwYWlyKSB7XG4gIGlmICghdmFsdWVIYXNQYWlyQ29tbWVudChpdGVtKSkgcmV0dXJuO1xuICBjb25zdCBjb21tZW50ID0gaXRlbS5nZXRQcm9wVmFsdWUoMCwgUGxhaW5WYWx1ZS5DaGFyLkNPTU1FTlQsIHRydWUpO1xuICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgY29uc3QgY2IgPSBwYWlyLnZhbHVlLmNvbW1lbnRCZWZvcmU7XG5cbiAgaWYgKGNiICYmIGNiLnN0YXJ0c1dpdGgoY29tbWVudCkpIHtcbiAgICBwYWlyLnZhbHVlLmNvbW1lbnRCZWZvcmUgPSBjYi5zdWJzdHIoY29tbWVudC5sZW5ndGggKyAxKTtcbiAgICBmb3VuZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgY2MgPSBwYWlyLnZhbHVlLmNvbW1lbnQ7XG5cbiAgICBpZiAoIWl0ZW0ubm9kZSAmJiBjYyAmJiBjYy5zdGFydHNXaXRoKGNvbW1lbnQpKSB7XG4gICAgICBwYWlyLnZhbHVlLmNvbW1lbnQgPSBjYy5zdWJzdHIoY29tbWVudC5sZW5ndGggKyAxKTtcbiAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoZm91bmQpIHBhaXIuY29tbWVudCA9IGNvbW1lbnQ7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVCbG9ja01hcEl0ZW1zKGRvYywgY3N0KSB7XG4gIGNvbnN0IGNvbW1lbnRzID0gW107XG4gIGNvbnN0IGl0ZW1zID0gW107XG4gIGxldCBrZXkgPSB1bmRlZmluZWQ7XG4gIGxldCBrZXlTdGFydCA9IG51bGw7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjc3QuaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBpdGVtID0gY3N0Lml0ZW1zW2ldO1xuXG4gICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkJMQU5LX0xJTkU6XG4gICAgICAgIGNvbW1lbnRzLnB1c2goe1xuICAgICAgICAgIGFmdGVyS2V5OiAhIWtleSxcbiAgICAgICAgICBiZWZvcmU6IGl0ZW1zLmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkNPTU1FTlQ6XG4gICAgICAgIGNvbW1lbnRzLnB1c2goe1xuICAgICAgICAgIGFmdGVyS2V5OiAhIWtleSxcbiAgICAgICAgICBiZWZvcmU6IGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICBjb21tZW50OiBpdGVtLmNvbW1lbnRcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5NQVBfS0VZOlxuICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIGl0ZW1zLnB1c2gobmV3IFBhaXIoa2V5KSk7XG4gICAgICAgIGlmIChpdGVtLmVycm9yKSBkb2MuZXJyb3JzLnB1c2goaXRlbS5lcnJvcik7XG4gICAgICAgIGtleSA9IHJlc29sdmVOb2RlKGRvYywgaXRlbS5ub2RlKTtcbiAgICAgICAga2V5U3RhcnQgPSBudWxsO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBQbGFpblZhbHVlLlR5cGUuTUFQX1ZBTFVFOlxuICAgICAgICB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSBrZXkgPSBudWxsO1xuICAgICAgICAgIGlmIChpdGVtLmVycm9yKSBkb2MuZXJyb3JzLnB1c2goaXRlbS5lcnJvcik7XG5cbiAgICAgICAgICBpZiAoIWl0ZW0uY29udGV4dC5hdExpbmVTdGFydCAmJiBpdGVtLm5vZGUgJiYgaXRlbS5ub2RlLnR5cGUgPT09IFBsYWluVmFsdWUuVHlwZS5NQVAgJiYgIWl0ZW0ubm9kZS5jb250ZXh0LmF0TGluZVN0YXJ0KSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSAnTmVzdGVkIG1hcHBpbmdzIGFyZSBub3QgYWxsb3dlZCBpbiBjb21wYWN0IG1hcHBpbmdzJztcbiAgICAgICAgICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihpdGVtLm5vZGUsIG1zZykpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCB2YWx1ZU5vZGUgPSBpdGVtLm5vZGU7XG5cbiAgICAgICAgICBpZiAoIXZhbHVlTm9kZSAmJiBpdGVtLnByb3BzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIENvbW1lbnRzIG9uIGFuIGVtcHR5IG1hcHBpbmcgdmFsdWUgbmVlZCB0byBiZSBwcmVzZXJ2ZWQsIHNvIHdlXG4gICAgICAgICAgICAvLyBuZWVkIHRvIGNvbnN0cnVjdCBhIG1pbmltYWwgZW1wdHkgbm9kZSBoZXJlIHRvIHVzZSBpbnN0ZWFkIG9mIHRoZVxuICAgICAgICAgICAgLy8gbWlzc2luZyBgaXRlbS5ub2RlYC4gLS0gZWVtZWxpL3lhbWwjMTlcbiAgICAgICAgICAgIHZhbHVlTm9kZSA9IG5ldyBQbGFpblZhbHVlLlBsYWluVmFsdWUoUGxhaW5WYWx1ZS5UeXBlLlBMQUlOLCBbXSk7XG4gICAgICAgICAgICB2YWx1ZU5vZGUuY29udGV4dCA9IHtcbiAgICAgICAgICAgICAgcGFyZW50OiBpdGVtLFxuICAgICAgICAgICAgICBzcmM6IGl0ZW0uY29udGV4dC5zcmNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBpdGVtLnJhbmdlLnN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHZhbHVlTm9kZS5yYW5nZSA9IHtcbiAgICAgICAgICAgICAgc3RhcnQ6IHBvcyxcbiAgICAgICAgICAgICAgZW5kOiBwb3NcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YWx1ZU5vZGUudmFsdWVSYW5nZSA9IHtcbiAgICAgICAgICAgICAgc3RhcnQ6IHBvcyxcbiAgICAgICAgICAgICAgZW5kOiBwb3NcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5yYW5nZS5vcmlnU3RhcnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG9yaWdQb3MgPSBpdGVtLnJhbmdlLm9yaWdTdGFydCArIDE7XG4gICAgICAgICAgICAgIHZhbHVlTm9kZS5yYW5nZS5vcmlnU3RhcnQgPSB2YWx1ZU5vZGUucmFuZ2Uub3JpZ0VuZCA9IG9yaWdQb3M7XG4gICAgICAgICAgICAgIHZhbHVlTm9kZS52YWx1ZVJhbmdlLm9yaWdTdGFydCA9IHZhbHVlTm9kZS52YWx1ZVJhbmdlLm9yaWdFbmQgPSBvcmlnUG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHBhaXIgPSBuZXcgUGFpcihrZXksIHJlc29sdmVOb2RlKGRvYywgdmFsdWVOb2RlKSk7XG4gICAgICAgICAgcmVzb2x2ZVBhaXJDb21tZW50KGl0ZW0sIHBhaXIpO1xuICAgICAgICAgIGl0ZW1zLnB1c2gocGFpcik7XG5cbiAgICAgICAgICBpZiAoa2V5ICYmIHR5cGVvZiBrZXlTdGFydCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLnJhbmdlLnN0YXJ0ID4ga2V5U3RhcnQgKyAxMDI0KSBkb2MuZXJyb3JzLnB1c2goZ2V0TG9uZ0tleUVycm9yKGNzdCwga2V5KSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAga2V5ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGtleVN0YXJ0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSBpdGVtcy5wdXNoKG5ldyBQYWlyKGtleSkpO1xuICAgICAgICBrZXkgPSByZXNvbHZlTm9kZShkb2MsIGl0ZW0pO1xuICAgICAgICBrZXlTdGFydCA9IGl0ZW0ucmFuZ2Uuc3RhcnQ7XG4gICAgICAgIGlmIChpdGVtLmVycm9yKSBkb2MuZXJyb3JzLnB1c2goaXRlbS5lcnJvcik7XG5cbiAgICAgICAgbmV4dDogZm9yIChsZXQgaiA9IGkgKyAxOzsgKytqKSB7XG4gICAgICAgICAgY29uc3QgbmV4dEl0ZW0gPSBjc3QuaXRlbXNbal07XG5cbiAgICAgICAgICBzd2l0Y2ggKG5leHRJdGVtICYmIG5leHRJdGVtLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkJMQU5LX0xJTkU6XG4gICAgICAgICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5DT01NRU5UOlxuICAgICAgICAgICAgICBjb250aW51ZSBuZXh0O1xuXG4gICAgICAgICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5NQVBfVkFMVUU6XG4gICAgICAgICAgICAgIGJyZWFrIG5leHQ7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSAnSW1wbGljaXQgbWFwIGtleXMgbmVlZCB0byBiZSBmb2xsb3dlZCBieSBtYXAgdmFsdWVzJztcbiAgICAgICAgICAgICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoaXRlbSwgbXNnKSk7XG4gICAgICAgICAgICAgICAgYnJlYWsgbmV4dDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtLnZhbHVlUmFuZ2VDb250YWluc05ld2xpbmUpIHtcbiAgICAgICAgICBjb25zdCBtc2cgPSAnSW1wbGljaXQgbWFwIGtleXMgbmVlZCB0byBiZSBvbiBhIHNpbmdsZSBsaW5lJztcbiAgICAgICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoaXRlbSwgbXNnKSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIGlmIChrZXkgIT09IHVuZGVmaW5lZCkgaXRlbXMucHVzaChuZXcgUGFpcihrZXkpKTtcbiAgcmV0dXJuIHtcbiAgICBjb21tZW50cyxcbiAgICBpdGVtc1xuICB9O1xufVxuXG5mdW5jdGlvbiByZXNvbHZlRmxvd01hcEl0ZW1zKGRvYywgY3N0KSB7XG4gIGNvbnN0IGNvbW1lbnRzID0gW107XG4gIGNvbnN0IGl0ZW1zID0gW107XG4gIGxldCBrZXkgPSB1bmRlZmluZWQ7XG4gIGxldCBleHBsaWNpdEtleSA9IGZhbHNlO1xuICBsZXQgbmV4dCA9ICd7JztcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNzdC5pdGVtcy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGl0ZW0gPSBjc3QuaXRlbXNbaV07XG5cbiAgICBpZiAodHlwZW9mIGl0ZW0uY2hhciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2hhcixcbiAgICAgICAgb2Zmc2V0XG4gICAgICB9ID0gaXRlbTtcblxuICAgICAgaWYgKGNoYXIgPT09ICc/JyAmJiBrZXkgPT09IHVuZGVmaW5lZCAmJiAhZXhwbGljaXRLZXkpIHtcbiAgICAgICAgZXhwbGljaXRLZXkgPSB0cnVlO1xuICAgICAgICBuZXh0ID0gJzonO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYXIgPT09ICc6Jykge1xuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIGtleSA9IG51bGw7XG5cbiAgICAgICAgaWYgKG5leHQgPT09ICc6Jykge1xuICAgICAgICAgIG5leHQgPSAnLCc7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChleHBsaWNpdEtleSkge1xuICAgICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCAmJiBjaGFyICE9PSAnLCcpIGtleSA9IG51bGw7XG4gICAgICAgICAgZXhwbGljaXRLZXkgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGl0ZW1zLnB1c2gobmV3IFBhaXIoa2V5KSk7XG4gICAgICAgICAga2V5ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgaWYgKGNoYXIgPT09ICcsJykge1xuICAgICAgICAgICAgbmV4dCA9ICc6JztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhciA9PT0gJ30nKSB7XG4gICAgICAgIGlmIChpID09PSBjc3QuaXRlbXMubGVuZ3RoIC0gMSkgY29udGludWU7XG4gICAgICB9IGVsc2UgaWYgKGNoYXIgPT09IG5leHQpIHtcbiAgICAgICAgbmV4dCA9ICc6JztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1zZyA9IGBGbG93IG1hcCBjb250YWlucyBhbiB1bmV4cGVjdGVkICR7Y2hhcn1gO1xuICAgICAgY29uc3QgZXJyID0gbmV3IFBsYWluVmFsdWUuWUFNTFN5bnRheEVycm9yKGNzdCwgbXNnKTtcbiAgICAgIGVyci5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICBkb2MuZXJyb3JzLnB1c2goZXJyKTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkJMQU5LX0xJTkUpIHtcbiAgICAgIGNvbW1lbnRzLnB1c2goe1xuICAgICAgICBhZnRlcktleTogISFrZXksXG4gICAgICAgIGJlZm9yZTogaXRlbXMubGVuZ3RoXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkNPTU1FTlQpIHtcbiAgICAgIGNoZWNrRmxvd0NvbW1lbnRTcGFjZShkb2MuZXJyb3JzLCBpdGVtKTtcbiAgICAgIGNvbW1lbnRzLnB1c2goe1xuICAgICAgICBhZnRlcktleTogISFrZXksXG4gICAgICAgIGJlZm9yZTogaXRlbXMubGVuZ3RoLFxuICAgICAgICBjb21tZW50OiBpdGVtLmNvbW1lbnRcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChuZXh0ID09PSAnLCcpIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihpdGVtLCAnU2VwYXJhdG9yICwgbWlzc2luZyBpbiBmbG93IG1hcCcpKTtcbiAgICAgIGtleSA9IHJlc29sdmVOb2RlKGRvYywgaXRlbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChuZXh0ICE9PSAnLCcpIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihpdGVtLCAnSW5kaWNhdG9yIDogbWlzc2luZyBpbiBmbG93IG1hcCBlbnRyeScpKTtcbiAgICAgIGl0ZW1zLnB1c2gobmV3IFBhaXIoa2V5LCByZXNvbHZlTm9kZShkb2MsIGl0ZW0pKSk7XG4gICAgICBrZXkgPSB1bmRlZmluZWQ7XG4gICAgICBleHBsaWNpdEtleSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrRmxvd0NvbGxlY3Rpb25FbmQoZG9jLmVycm9ycywgY3N0KTtcbiAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSBpdGVtcy5wdXNoKG5ldyBQYWlyKGtleSkpO1xuICByZXR1cm4ge1xuICAgIGNvbW1lbnRzLFxuICAgIGl0ZW1zXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTZXEoZG9jLCBjc3QpIHtcbiAgaWYgKGNzdC50eXBlICE9PSBQbGFpblZhbHVlLlR5cGUuU0VRICYmIGNzdC50eXBlICE9PSBQbGFpblZhbHVlLlR5cGUuRkxPV19TRVEpIHtcbiAgICBjb25zdCBtc2cgPSBgQSAke2NzdC50eXBlfSBub2RlIGNhbm5vdCBiZSByZXNvbHZlZCBhcyBhIHNlcXVlbmNlYDtcbiAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFN5bnRheEVycm9yKGNzdCwgbXNnKSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCB7XG4gICAgY29tbWVudHMsXG4gICAgaXRlbXNcbiAgfSA9IGNzdC50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuRkxPV19TRVEgPyByZXNvbHZlRmxvd1NlcUl0ZW1zKGRvYywgY3N0KSA6IHJlc29sdmVCbG9ja1NlcUl0ZW1zKGRvYywgY3N0KTtcbiAgY29uc3Qgc2VxID0gbmV3IFlBTUxTZXEoKTtcbiAgc2VxLml0ZW1zID0gaXRlbXM7XG4gIHJlc29sdmVDb21tZW50cyhzZXEsIGNvbW1lbnRzKTtcblxuICBpZiAoIWRvYy5vcHRpb25zLm1hcEFzTWFwICYmIGl0ZW1zLnNvbWUoaXQgPT4gaXQgaW5zdGFuY2VvZiBQYWlyICYmIGl0LmtleSBpbnN0YW5jZW9mIENvbGxlY3Rpb24pKSB7XG4gICAgY29uc3Qgd2FybiA9ICdLZXlzIHdpdGggY29sbGVjdGlvbiB2YWx1ZXMgd2lsbCBiZSBzdHJpbmdpZmllZCBhcyBZQU1MIGR1ZSB0byBKUyBPYmplY3QgcmVzdHJpY3Rpb25zLiBVc2UgbWFwQXNNYXA6IHRydWUgdG8gYXZvaWQgdGhpcy4nO1xuICAgIGRvYy53YXJuaW5ncy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxXYXJuaW5nKGNzdCwgd2FybikpO1xuICB9XG5cbiAgY3N0LnJlc29sdmVkID0gc2VxO1xuICByZXR1cm4gc2VxO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlQmxvY2tTZXFJdGVtcyhkb2MsIGNzdCkge1xuICBjb25zdCBjb21tZW50cyA9IFtdO1xuICBjb25zdCBpdGVtcyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY3N0Lml0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgaXRlbSA9IGNzdC5pdGVtc1tpXTtcblxuICAgIHN3aXRjaCAoaXRlbS50eXBlKSB7XG4gICAgICBjYXNlIFBsYWluVmFsdWUuVHlwZS5CTEFOS19MSU5FOlxuICAgICAgICBjb21tZW50cy5wdXNoKHtcbiAgICAgICAgICBiZWZvcmU6IGl0ZW1zLmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLkNPTU1FTlQ6XG4gICAgICAgIGNvbW1lbnRzLnB1c2goe1xuICAgICAgICAgIGNvbW1lbnQ6IGl0ZW0uY29tbWVudCxcbiAgICAgICAgICBiZWZvcmU6IGl0ZW1zLmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgUGxhaW5WYWx1ZS5UeXBlLlNFUV9JVEVNOlxuICAgICAgICBpZiAoaXRlbS5lcnJvcikgZG9jLmVycm9ycy5wdXNoKGl0ZW0uZXJyb3IpO1xuICAgICAgICBpdGVtcy5wdXNoKHJlc29sdmVOb2RlKGRvYywgaXRlbS5ub2RlKSk7XG5cbiAgICAgICAgaWYgKGl0ZW0uaGFzUHJvcHMpIHtcbiAgICAgICAgICBjb25zdCBtc2cgPSAnU2VxdWVuY2UgaXRlbXMgY2Fubm90IGhhdmUgdGFncyBvciBhbmNob3JzIGJlZm9yZSB0aGUgLSBpbmRpY2F0b3InO1xuICAgICAgICAgIGRvYy5lcnJvcnMucHVzaChuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihpdGVtLCBtc2cpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoaXRlbS5lcnJvcikgZG9jLmVycm9ycy5wdXNoKGl0ZW0uZXJyb3IpO1xuICAgICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFN5bnRheEVycm9yKGl0ZW0sIGBVbmV4cGVjdGVkICR7aXRlbS50eXBlfSBub2RlIGluIHNlcXVlbmNlYCkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY29tbWVudHMsXG4gICAgaXRlbXNcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUZsb3dTZXFJdGVtcyhkb2MsIGNzdCkge1xuICBjb25zdCBjb21tZW50cyA9IFtdO1xuICBjb25zdCBpdGVtcyA9IFtdO1xuICBsZXQgZXhwbGljaXRLZXkgPSBmYWxzZTtcbiAgbGV0IGtleSA9IHVuZGVmaW5lZDtcbiAgbGV0IGtleVN0YXJ0ID0gbnVsbDtcbiAgbGV0IG5leHQgPSAnWyc7XG4gIGxldCBwcmV2SXRlbSA9IG51bGw7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjc3QuaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBpdGVtID0gY3N0Lml0ZW1zW2ldO1xuXG4gICAgaWYgKHR5cGVvZiBpdGVtLmNoYXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNoYXIsXG4gICAgICAgIG9mZnNldFxuICAgICAgfSA9IGl0ZW07XG5cbiAgICAgIGlmIChjaGFyICE9PSAnOicgJiYgKGV4cGxpY2l0S2V5IHx8IGtleSAhPT0gdW5kZWZpbmVkKSkge1xuICAgICAgICBpZiAoZXhwbGljaXRLZXkgJiYga2V5ID09PSB1bmRlZmluZWQpIGtleSA9IG5leHQgPyBpdGVtcy5wb3AoKSA6IG51bGw7XG4gICAgICAgIGl0ZW1zLnB1c2gobmV3IFBhaXIoa2V5KSk7XG4gICAgICAgIGV4cGxpY2l0S2V5ID0gZmFsc2U7XG4gICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICAgICAga2V5U3RhcnQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hhciA9PT0gbmV4dCkge1xuICAgICAgICBuZXh0ID0gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoIW5leHQgJiYgY2hhciA9PT0gJz8nKSB7XG4gICAgICAgIGV4cGxpY2l0S2V5ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAobmV4dCAhPT0gJ1snICYmIGNoYXIgPT09ICc6JyAmJiBrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAobmV4dCA9PT0gJywnKSB7XG4gICAgICAgICAga2V5ID0gaXRlbXMucG9wKCk7XG5cbiAgICAgICAgICBpZiAoa2V5IGluc3RhbmNlb2YgUGFpcikge1xuICAgICAgICAgICAgY29uc3QgbXNnID0gJ0NoYWluaW5nIGZsb3cgc2VxdWVuY2UgcGFpcnMgaXMgaW52YWxpZCc7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgUGxhaW5WYWx1ZS5ZQU1MU2VtYW50aWNFcnJvcihjc3QsIG1zZyk7XG4gICAgICAgICAgICBlcnIub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgZG9jLmVycm9ycy5wdXNoKGVycik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFleHBsaWNpdEtleSAmJiB0eXBlb2Yga2V5U3RhcnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlFbmQgPSBpdGVtLnJhbmdlID8gaXRlbS5yYW5nZS5zdGFydCA6IGl0ZW0ub2Zmc2V0O1xuICAgICAgICAgICAgaWYgKGtleUVuZCA+IGtleVN0YXJ0ICsgMTAyNCkgZG9jLmVycm9ycy5wdXNoKGdldExvbmdLZXlFcnJvcihjc3QsIGtleSkpO1xuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICBzcmNcbiAgICAgICAgICAgIH0gPSBwcmV2SXRlbS5jb250ZXh0O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0ga2V5U3RhcnQ7IGkgPCBrZXlFbmQ7ICsraSkgaWYgKHNyY1tpXSA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgY29uc3QgbXNnID0gJ0ltcGxpY2l0IGtleXMgb2YgZmxvdyBzZXF1ZW5jZSBwYWlycyBuZWVkIHRvIGJlIG9uIGEgc2luZ2xlIGxpbmUnO1xuICAgICAgICAgICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IocHJldkl0ZW0sIG1zZykpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAga2V5ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGtleVN0YXJ0ID0gbnVsbDtcbiAgICAgICAgZXhwbGljaXRLZXkgPSBmYWxzZTtcbiAgICAgICAgbmV4dCA9IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKG5leHQgPT09ICdbJyB8fCBjaGFyICE9PSAnXScgfHwgaSA8IGNzdC5pdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IGBGbG93IHNlcXVlbmNlIGNvbnRhaW5zIGFuIHVuZXhwZWN0ZWQgJHtjaGFyfWA7XG4gICAgICAgIGNvbnN0IGVyciA9IG5ldyBQbGFpblZhbHVlLllBTUxTeW50YXhFcnJvcihjc3QsIG1zZyk7XG4gICAgICAgIGVyci5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIGRvYy5lcnJvcnMucHVzaChlcnIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQkxBTktfTElORSkge1xuICAgICAgY29tbWVudHMucHVzaCh7XG4gICAgICAgIGJlZm9yZTogaXRlbXMubGVuZ3RoXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gUGxhaW5WYWx1ZS5UeXBlLkNPTU1FTlQpIHtcbiAgICAgIGNoZWNrRmxvd0NvbW1lbnRTcGFjZShkb2MuZXJyb3JzLCBpdGVtKTtcbiAgICAgIGNvbW1lbnRzLnB1c2goe1xuICAgICAgICBjb21tZW50OiBpdGVtLmNvbW1lbnQsXG4gICAgICAgIGJlZm9yZTogaXRlbXMubGVuZ3RoXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgY29uc3QgbXNnID0gYEV4cGVjdGVkIGEgJHtuZXh0fSBpbiBmbG93IHNlcXVlbmNlYDtcbiAgICAgICAgZG9jLmVycm9ycy5wdXNoKG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGl0ZW0sIG1zZykpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWx1ZSA9IHJlc29sdmVOb2RlKGRvYywgaXRlbSk7XG5cbiAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpdGVtcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgcHJldkl0ZW0gPSBpdGVtO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbXMucHVzaChuZXcgUGFpcihrZXksIHZhbHVlKSk7XG4gICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAga2V5U3RhcnQgPSBpdGVtLnJhbmdlLnN0YXJ0O1xuICAgICAgbmV4dCA9ICcsJztcbiAgICB9XG4gIH1cblxuICBjaGVja0Zsb3dDb2xsZWN0aW9uRW5kKGRvYy5lcnJvcnMsIGNzdCk7XG4gIGlmIChrZXkgIT09IHVuZGVmaW5lZCkgaXRlbXMucHVzaChuZXcgUGFpcihrZXkpKTtcbiAgcmV0dXJuIHtcbiAgICBjb21tZW50cyxcbiAgICBpdGVtc1xuICB9O1xufVxuXG5leHBvcnRzLkFsaWFzID0gQWxpYXM7XG5leHBvcnRzLkNvbGxlY3Rpb24gPSBDb2xsZWN0aW9uO1xuZXhwb3J0cy5NZXJnZSA9IE1lcmdlO1xuZXhwb3J0cy5Ob2RlID0gTm9kZTtcbmV4cG9ydHMuUGFpciA9IFBhaXI7XG5leHBvcnRzLlNjYWxhciA9IFNjYWxhcjtcbmV4cG9ydHMuWUFNTE1hcCA9IFlBTUxNYXA7XG5leHBvcnRzLllBTUxTZXEgPSBZQU1MU2VxO1xuZXhwb3J0cy5hZGRDb21tZW50ID0gYWRkQ29tbWVudDtcbmV4cG9ydHMuYmluYXJ5T3B0aW9ucyA9IGJpbmFyeU9wdGlvbnM7XG5leHBvcnRzLmJvb2xPcHRpb25zID0gYm9vbE9wdGlvbnM7XG5leHBvcnRzLmZpbmRQYWlyID0gZmluZFBhaXI7XG5leHBvcnRzLmludE9wdGlvbnMgPSBpbnRPcHRpb25zO1xuZXhwb3J0cy5pc0VtcHR5UGF0aCA9IGlzRW1wdHlQYXRoO1xuZXhwb3J0cy5udWxsT3B0aW9ucyA9IG51bGxPcHRpb25zO1xuZXhwb3J0cy5yZXNvbHZlTWFwID0gcmVzb2x2ZU1hcDtcbmV4cG9ydHMucmVzb2x2ZU5vZGUgPSByZXNvbHZlTm9kZTtcbmV4cG9ydHMucmVzb2x2ZVNlcSA9IHJlc29sdmVTZXE7XG5leHBvcnRzLnJlc29sdmVTdHJpbmcgPSByZXNvbHZlU3RyaW5nO1xuZXhwb3J0cy5zdHJPcHRpb25zID0gc3RyT3B0aW9ucztcbmV4cG9ydHMuc3RyaW5naWZ5TnVtYmVyID0gc3RyaW5naWZ5TnVtYmVyO1xuZXhwb3J0cy5zdHJpbmdpZnlTdHJpbmcgPSBzdHJpbmdpZnlTdHJpbmc7XG5leHBvcnRzLnRvSlNPTiA9IHRvSlNPTjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFBsYWluVmFsdWUgPSByZXF1aXJlKCcuL1BsYWluVmFsdWUtZWM4ZTU4OGUuanMnKTtcbnZhciByZXNvbHZlU2VxID0gcmVxdWlyZSgnLi9yZXNvbHZlU2VxLWQwM2NiMDM3LmpzJyk7XG5cbi8qIGdsb2JhbCBhdG9iLCBidG9hLCBCdWZmZXIgKi9cbmNvbnN0IGJpbmFyeSA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHZhbHVlIGluc3RhbmNlb2YgVWludDhBcnJheSxcbiAgLy8gQnVmZmVyIGluaGVyaXRzIGZyb20gVWludDhBcnJheVxuICBkZWZhdWx0OiBmYWxzZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6YmluYXJ5JyxcblxuICAvKipcbiAgICogUmV0dXJucyBhIEJ1ZmZlciBpbiBub2RlIGFuZCBhbiBVaW50OEFycmF5IGluIGJyb3dzZXJzXG4gICAqXG4gICAqIFRvIHVzZSB0aGUgcmVzdWx0aW5nIGJ1ZmZlciBhcyBhbiBpbWFnZSwgeW91J2xsIHdhbnQgdG8gZG8gc29tZXRoaW5nIGxpa2U6XG4gICAqXG4gICAqICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtidWZmZXJdLCB7IHR5cGU6ICdpbWFnZS9qcGVnJyB9KVxuICAgKiAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwaG90bycpLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICovXG4gIHJlc29sdmU6IChkb2MsIG5vZGUpID0+IHtcbiAgICBjb25zdCBzcmMgPSByZXNvbHZlU2VxLnJlc29sdmVTdHJpbmcoZG9jLCBub2RlKTtcblxuICAgIGlmICh0eXBlb2YgQnVmZmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gQnVmZmVyLmZyb20oc3JjLCAnYmFzZTY0Jyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXRvYiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gT24gSUUgMTEsIGF0b2IoKSBjYW4ndCBoYW5kbGUgbmV3bGluZXNcbiAgICAgIGNvbnN0IHN0ciA9IGF0b2Ioc3JjLnJlcGxhY2UoL1tcXG5cXHJdL2csICcnKSk7XG4gICAgICBjb25zdCBidWZmZXIgPSBuZXcgVWludDhBcnJheShzdHIubGVuZ3RoKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIGJ1ZmZlcltpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICByZXR1cm4gYnVmZmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtc2cgPSAnVGhpcyBlbnZpcm9ubWVudCBkb2VzIG5vdCBzdXBwb3J0IHJlYWRpbmcgYmluYXJ5IHRhZ3M7IGVpdGhlciBCdWZmZXIgb3IgYXRvYiBpcyByZXF1aXJlZCc7XG4gICAgICBkb2MuZXJyb3JzLnB1c2gobmV3IFBsYWluVmFsdWUuWUFNTFJlZmVyZW5jZUVycm9yKG5vZGUsIG1zZykpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9LFxuICBvcHRpb25zOiByZXNvbHZlU2VxLmJpbmFyeU9wdGlvbnMsXG4gIHN0cmluZ2lmeTogKHtcbiAgICBjb21tZW50LFxuICAgIHR5cGUsXG4gICAgdmFsdWVcbiAgfSwgY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKSA9PiB7XG4gICAgbGV0IHNyYztcblxuICAgIGlmICh0eXBlb2YgQnVmZmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzcmMgPSB2YWx1ZSBpbnN0YW5jZW9mIEJ1ZmZlciA/IHZhbHVlLnRvU3RyaW5nKCdiYXNlNjQnKSA6IEJ1ZmZlci5mcm9tKHZhbHVlLmJ1ZmZlcikudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGxldCBzID0gJyc7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyArK2kpIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh2YWx1ZVtpXSk7XG5cbiAgICAgIHNyYyA9IGJ0b2Eocyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBlbnZpcm9ubWVudCBkb2VzIG5vdCBzdXBwb3J0IHdyaXRpbmcgYmluYXJ5IHRhZ3M7IGVpdGhlciBCdWZmZXIgb3IgYnRvYSBpcyByZXF1aXJlZCcpO1xuICAgIH1cblxuICAgIGlmICghdHlwZSkgdHlwZSA9IHJlc29sdmVTZXEuYmluYXJ5T3B0aW9ucy5kZWZhdWx0VHlwZTtcblxuICAgIGlmICh0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuUVVPVEVfRE9VQkxFKSB7XG4gICAgICB2YWx1ZSA9IHNyYztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qge1xuICAgICAgICBsaW5lV2lkdGhcbiAgICAgIH0gPSByZXNvbHZlU2VxLmJpbmFyeU9wdGlvbnM7XG4gICAgICBjb25zdCBuID0gTWF0aC5jZWlsKHNyYy5sZW5ndGggLyBsaW5lV2lkdGgpO1xuICAgICAgY29uc3QgbGluZXMgPSBuZXcgQXJyYXkobik7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBvID0gMDsgaSA8IG47ICsraSwgbyArPSBsaW5lV2lkdGgpIHtcbiAgICAgICAgbGluZXNbaV0gPSBzcmMuc3Vic3RyKG8sIGxpbmVXaWR0aCk7XG4gICAgICB9XG5cbiAgICAgIHZhbHVlID0gbGluZXMuam9pbih0eXBlID09PSBQbGFpblZhbHVlLlR5cGUuQkxPQ0tfTElURVJBTCA/ICdcXG4nIDogJyAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzb2x2ZVNlcS5zdHJpbmdpZnlTdHJpbmcoe1xuICAgICAgY29tbWVudCxcbiAgICAgIHR5cGUsXG4gICAgICB2YWx1ZVxuICAgIH0sIGN0eCwgb25Db21tZW50LCBvbkNob21wS2VlcCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHBhcnNlUGFpcnMoZG9jLCBjc3QpIHtcbiAgY29uc3Qgc2VxID0gcmVzb2x2ZVNlcS5yZXNvbHZlU2VxKGRvYywgY3N0KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlcS5pdGVtcy5sZW5ndGg7ICsraSkge1xuICAgIGxldCBpdGVtID0gc2VxLml0ZW1zW2ldO1xuICAgIGlmIChpdGVtIGluc3RhbmNlb2YgcmVzb2x2ZVNlcS5QYWlyKSBjb250aW51ZTtlbHNlIGlmIChpdGVtIGluc3RhbmNlb2YgcmVzb2x2ZVNlcS5ZQU1MTWFwKSB7XG4gICAgICBpZiAoaXRlbS5pdGVtcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9ICdFYWNoIHBhaXIgbXVzdCBoYXZlIGl0cyBvd24gc2VxdWVuY2UgaW5kaWNhdG9yJztcbiAgICAgICAgdGhyb3cgbmV3IFBsYWluVmFsdWUuWUFNTFNlbWFudGljRXJyb3IoY3N0LCBtc2cpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYWlyID0gaXRlbS5pdGVtc1swXSB8fCBuZXcgcmVzb2x2ZVNlcS5QYWlyKCk7XG4gICAgICBpZiAoaXRlbS5jb21tZW50QmVmb3JlKSBwYWlyLmNvbW1lbnRCZWZvcmUgPSBwYWlyLmNvbW1lbnRCZWZvcmUgPyBgJHtpdGVtLmNvbW1lbnRCZWZvcmV9XFxuJHtwYWlyLmNvbW1lbnRCZWZvcmV9YCA6IGl0ZW0uY29tbWVudEJlZm9yZTtcbiAgICAgIGlmIChpdGVtLmNvbW1lbnQpIHBhaXIuY29tbWVudCA9IHBhaXIuY29tbWVudCA/IGAke2l0ZW0uY29tbWVudH1cXG4ke3BhaXIuY29tbWVudH1gIDogaXRlbS5jb21tZW50O1xuICAgICAgaXRlbSA9IHBhaXI7XG4gICAgfVxuICAgIHNlcS5pdGVtc1tpXSA9IGl0ZW0gaW5zdGFuY2VvZiByZXNvbHZlU2VxLlBhaXIgPyBpdGVtIDogbmV3IHJlc29sdmVTZXEuUGFpcihpdGVtKTtcbiAgfVxuXG4gIHJldHVybiBzZXE7XG59XG5mdW5jdGlvbiBjcmVhdGVQYWlycyhzY2hlbWEsIGl0ZXJhYmxlLCBjdHgpIHtcbiAgY29uc3QgcGFpcnMgPSBuZXcgcmVzb2x2ZVNlcS5ZQU1MU2VxKHNjaGVtYSk7XG4gIHBhaXJzLnRhZyA9ICd0YWc6eWFtbC5vcmcsMjAwMjpwYWlycyc7XG5cbiAgZm9yIChjb25zdCBpdCBvZiBpdGVyYWJsZSkge1xuICAgIGxldCBrZXksIHZhbHVlO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXQpKSB7XG4gICAgICBpZiAoaXQubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGtleSA9IGl0WzBdO1xuICAgICAgICB2YWx1ZSA9IGl0WzFdO1xuICAgICAgfSBlbHNlIHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIFtrZXksIHZhbHVlXSB0dXBsZTogJHtpdH1gKTtcbiAgICB9IGVsc2UgaWYgKGl0ICYmIGl0IGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoaXQpO1xuXG4gICAgICBpZiAoa2V5cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAga2V5ID0ga2V5c1swXTtcbiAgICAgICAgdmFsdWUgPSBpdFtrZXldO1xuICAgICAgfSBlbHNlIHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIHsga2V5OiB2YWx1ZSB9IHR1cGxlOiAke2l0fWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBrZXkgPSBpdDtcbiAgICB9XG5cbiAgICBjb25zdCBwYWlyID0gc2NoZW1hLmNyZWF0ZVBhaXIoa2V5LCB2YWx1ZSwgY3R4KTtcbiAgICBwYWlycy5pdGVtcy5wdXNoKHBhaXIpO1xuICB9XG5cbiAgcmV0dXJuIHBhaXJzO1xufVxuY29uc3QgcGFpcnMgPSB7XG4gIGRlZmF1bHQ6IGZhbHNlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpwYWlycycsXG4gIHJlc29sdmU6IHBhcnNlUGFpcnMsXG4gIGNyZWF0ZU5vZGU6IGNyZWF0ZVBhaXJzXG59O1xuXG5jbGFzcyBZQU1MT01hcCBleHRlbmRzIHJlc29sdmVTZXEuWUFNTFNlcSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBQbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImFkZFwiLCByZXNvbHZlU2VxLllBTUxNYXAucHJvdG90eXBlLmFkZC5iaW5kKHRoaXMpKTtcblxuICAgIFBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KHRoaXMsIFwiZGVsZXRlXCIsIHJlc29sdmVTZXEuWUFNTE1hcC5wcm90b3R5cGUuZGVsZXRlLmJpbmQodGhpcykpO1xuXG4gICAgUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkodGhpcywgXCJnZXRcIiwgcmVzb2x2ZVNlcS5ZQU1MTWFwLnByb3RvdHlwZS5nZXQuYmluZCh0aGlzKSk7XG5cbiAgICBQbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImhhc1wiLCByZXNvbHZlU2VxLllBTUxNYXAucHJvdG90eXBlLmhhcy5iaW5kKHRoaXMpKTtcblxuICAgIFBsYWluVmFsdWUuX2RlZmluZVByb3BlcnR5KHRoaXMsIFwic2V0XCIsIHJlc29sdmVTZXEuWUFNTE1hcC5wcm90b3R5cGUuc2V0LmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy50YWcgPSBZQU1MT01hcC50YWc7XG4gIH1cblxuICB0b0pTT04oXywgY3R4KSB7XG4gICAgY29uc3QgbWFwID0gbmV3IE1hcCgpO1xuICAgIGlmIChjdHggJiYgY3R4Lm9uQ3JlYXRlKSBjdHgub25DcmVhdGUobWFwKTtcblxuICAgIGZvciAoY29uc3QgcGFpciBvZiB0aGlzLml0ZW1zKSB7XG4gICAgICBsZXQga2V5LCB2YWx1ZTtcblxuICAgICAgaWYgKHBhaXIgaW5zdGFuY2VvZiByZXNvbHZlU2VxLlBhaXIpIHtcbiAgICAgICAga2V5ID0gcmVzb2x2ZVNlcS50b0pTT04ocGFpci5rZXksICcnLCBjdHgpO1xuICAgICAgICB2YWx1ZSA9IHJlc29sdmVTZXEudG9KU09OKHBhaXIudmFsdWUsIGtleSwgY3R4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGtleSA9IHJlc29sdmVTZXEudG9KU09OKHBhaXIsICcnLCBjdHgpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFwLmhhcyhrZXkpKSB0aHJvdyBuZXcgRXJyb3IoJ09yZGVyZWQgbWFwcyBtdXN0IG5vdCBpbmNsdWRlIGR1cGxpY2F0ZSBrZXlzJyk7XG4gICAgICBtYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXA7XG4gIH1cblxufVxuXG5QbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eShZQU1MT01hcCwgXCJ0YWdcIiwgJ3RhZzp5YW1sLm9yZywyMDAyOm9tYXAnKTtcblxuZnVuY3Rpb24gcGFyc2VPTWFwKGRvYywgY3N0KSB7XG4gIGNvbnN0IHBhaXJzID0gcGFyc2VQYWlycyhkb2MsIGNzdCk7XG4gIGNvbnN0IHNlZW5LZXlzID0gW107XG5cbiAgZm9yIChjb25zdCB7XG4gICAga2V5XG4gIH0gb2YgcGFpcnMuaXRlbXMpIHtcbiAgICBpZiAoa2V5IGluc3RhbmNlb2YgcmVzb2x2ZVNlcS5TY2FsYXIpIHtcbiAgICAgIGlmIChzZWVuS2V5cy5pbmNsdWRlcyhrZXkudmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9ICdPcmRlcmVkIG1hcHMgbXVzdCBub3QgaW5jbHVkZSBkdXBsaWNhdGUga2V5cyc7XG4gICAgICAgIHRocm93IG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGNzdCwgbXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlZW5LZXlzLnB1c2goa2V5LnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgWUFNTE9NYXAoKSwgcGFpcnMpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPTWFwKHNjaGVtYSwgaXRlcmFibGUsIGN0eCkge1xuICBjb25zdCBwYWlycyA9IGNyZWF0ZVBhaXJzKHNjaGVtYSwgaXRlcmFibGUsIGN0eCk7XG4gIGNvbnN0IG9tYXAgPSBuZXcgWUFNTE9NYXAoKTtcbiAgb21hcC5pdGVtcyA9IHBhaXJzLml0ZW1zO1xuICByZXR1cm4gb21hcDtcbn1cblxuY29uc3Qgb21hcCA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHZhbHVlIGluc3RhbmNlb2YgTWFwLFxuICBub2RlQ2xhc3M6IFlBTUxPTWFwLFxuICBkZWZhdWx0OiBmYWxzZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6b21hcCcsXG4gIHJlc29sdmU6IHBhcnNlT01hcCxcbiAgY3JlYXRlTm9kZTogY3JlYXRlT01hcFxufTtcblxuY2xhc3MgWUFNTFNldCBleHRlbmRzIHJlc29sdmVTZXEuWUFNTE1hcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy50YWcgPSBZQU1MU2V0LnRhZztcbiAgfVxuXG4gIGFkZChrZXkpIHtcbiAgICBjb25zdCBwYWlyID0ga2V5IGluc3RhbmNlb2YgcmVzb2x2ZVNlcS5QYWlyID8ga2V5IDogbmV3IHJlc29sdmVTZXEuUGFpcihrZXkpO1xuICAgIGNvbnN0IHByZXYgPSByZXNvbHZlU2VxLmZpbmRQYWlyKHRoaXMuaXRlbXMsIHBhaXIua2V5KTtcbiAgICBpZiAoIXByZXYpIHRoaXMuaXRlbXMucHVzaChwYWlyKTtcbiAgfVxuXG4gIGdldChrZXksIGtlZXBQYWlyKSB7XG4gICAgY29uc3QgcGFpciA9IHJlc29sdmVTZXEuZmluZFBhaXIodGhpcy5pdGVtcywga2V5KTtcbiAgICByZXR1cm4gIWtlZXBQYWlyICYmIHBhaXIgaW5zdGFuY2VvZiByZXNvbHZlU2VxLlBhaXIgPyBwYWlyLmtleSBpbnN0YW5jZW9mIHJlc29sdmVTZXEuU2NhbGFyID8gcGFpci5rZXkudmFsdWUgOiBwYWlyLmtleSA6IHBhaXI7XG4gIH1cblxuICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdib29sZWFuJykgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBib29sZWFuIHZhbHVlIGZvciBzZXQoa2V5LCB2YWx1ZSkgaW4gYSBZQU1MIHNldCwgbm90ICR7dHlwZW9mIHZhbHVlfWApO1xuICAgIGNvbnN0IHByZXYgPSByZXNvbHZlU2VxLmZpbmRQYWlyKHRoaXMuaXRlbXMsIGtleSk7XG5cbiAgICBpZiAocHJldiAmJiAhdmFsdWUpIHtcbiAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKHRoaXMuaXRlbXMuaW5kZXhPZihwcmV2KSwgMSk7XG4gICAgfSBlbHNlIGlmICghcHJldiAmJiB2YWx1ZSkge1xuICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyByZXNvbHZlU2VxLlBhaXIoa2V5KSk7XG4gICAgfVxuICB9XG5cbiAgdG9KU09OKF8sIGN0eCkge1xuICAgIHJldHVybiBzdXBlci50b0pTT04oXywgY3R4LCBTZXQpO1xuICB9XG5cbiAgdG9TdHJpbmcoY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKSB7XG4gICAgaWYgKCFjdHgpIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzKTtcbiAgICBpZiAodGhpcy5oYXNBbGxOdWxsVmFsdWVzKCkpIHJldHVybiBzdXBlci50b1N0cmluZyhjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApO2Vsc2UgdGhyb3cgbmV3IEVycm9yKCdTZXQgaXRlbXMgbXVzdCBhbGwgaGF2ZSBudWxsIHZhbHVlcycpO1xuICB9XG5cbn1cblxuUGxhaW5WYWx1ZS5fZGVmaW5lUHJvcGVydHkoWUFNTFNldCwgXCJ0YWdcIiwgJ3RhZzp5YW1sLm9yZywyMDAyOnNldCcpO1xuXG5mdW5jdGlvbiBwYXJzZVNldChkb2MsIGNzdCkge1xuICBjb25zdCBtYXAgPSByZXNvbHZlU2VxLnJlc29sdmVNYXAoZG9jLCBjc3QpO1xuICBpZiAoIW1hcC5oYXNBbGxOdWxsVmFsdWVzKCkpIHRocm93IG5ldyBQbGFpblZhbHVlLllBTUxTZW1hbnRpY0Vycm9yKGNzdCwgJ1NldCBpdGVtcyBtdXN0IGFsbCBoYXZlIG51bGwgdmFsdWVzJyk7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBZQU1MU2V0KCksIG1hcCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNldChzY2hlbWEsIGl0ZXJhYmxlLCBjdHgpIHtcbiAgY29uc3Qgc2V0ID0gbmV3IFlBTUxTZXQoKTtcblxuICBmb3IgKGNvbnN0IHZhbHVlIG9mIGl0ZXJhYmxlKSBzZXQuaXRlbXMucHVzaChzY2hlbWEuY3JlYXRlUGFpcih2YWx1ZSwgbnVsbCwgY3R4KSk7XG5cbiAgcmV0dXJuIHNldDtcbn1cblxuY29uc3Qgc2V0ID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdmFsdWUgaW5zdGFuY2VvZiBTZXQsXG4gIG5vZGVDbGFzczogWUFNTFNldCxcbiAgZGVmYXVsdDogZmFsc2UsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOnNldCcsXG4gIHJlc29sdmU6IHBhcnNlU2V0LFxuICBjcmVhdGVOb2RlOiBjcmVhdGVTZXRcbn07XG5cbmNvbnN0IHBhcnNlU2V4YWdlc2ltYWwgPSAoc2lnbiwgcGFydHMpID0+IHtcbiAgY29uc3QgbiA9IHBhcnRzLnNwbGl0KCc6JykucmVkdWNlKChuLCBwKSA9PiBuICogNjAgKyBOdW1iZXIocCksIDApO1xuICByZXR1cm4gc2lnbiA9PT0gJy0nID8gLW4gOiBuO1xufTsgLy8gaGhoaDptbTpzcy5zc3NcblxuXG5jb25zdCBzdHJpbmdpZnlTZXhhZ2VzaW1hbCA9ICh7XG4gIHZhbHVlXG59KSA9PiB7XG4gIGlmIChpc05hTih2YWx1ZSkgfHwgIWlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIHJlc29sdmVTZXEuc3RyaW5naWZ5TnVtYmVyKHZhbHVlKTtcbiAgbGV0IHNpZ24gPSAnJztcblxuICBpZiAodmFsdWUgPCAwKSB7XG4gICAgc2lnbiA9ICctJztcbiAgICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKTtcbiAgfVxuXG4gIGNvbnN0IHBhcnRzID0gW3ZhbHVlICUgNjBdOyAvLyBzZWNvbmRzLCBpbmNsdWRpbmcgbXNcblxuICBpZiAodmFsdWUgPCA2MCkge1xuICAgIHBhcnRzLnVuc2hpZnQoMCk7IC8vIGF0IGxlYXN0IG9uZSA6IGlzIHJlcXVpcmVkXG4gIH0gZWxzZSB7XG4gICAgdmFsdWUgPSBNYXRoLnJvdW5kKCh2YWx1ZSAtIHBhcnRzWzBdKSAvIDYwKTtcbiAgICBwYXJ0cy51bnNoaWZ0KHZhbHVlICUgNjApOyAvLyBtaW51dGVzXG5cbiAgICBpZiAodmFsdWUgPj0gNjApIHtcbiAgICAgIHZhbHVlID0gTWF0aC5yb3VuZCgodmFsdWUgLSBwYXJ0c1swXSkgLyA2MCk7XG4gICAgICBwYXJ0cy51bnNoaWZ0KHZhbHVlKTsgLy8gaG91cnNcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2lnbiArIHBhcnRzLm1hcChuID0+IG4gPCAxMCA/ICcwJyArIFN0cmluZyhuKSA6IFN0cmluZyhuKSkuam9pbignOicpLnJlcGxhY2UoLzAwMDAwMFxcZCokLywgJycpIC8vICUgNjAgbWF5IGludHJvZHVjZSBlcnJvclxuICA7XG59O1xuXG5jb25zdCBpbnRUaW1lID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgZm9ybWF0OiAnVElNRScsXG4gIHRlc3Q6IC9eKFstK10/KShbMC05XVswLTlfXSooPzo6WzAtNV0/WzAtOV0pKykkLyxcbiAgcmVzb2x2ZTogKHN0ciwgc2lnbiwgcGFydHMpID0+IHBhcnNlU2V4YWdlc2ltYWwoc2lnbiwgcGFydHMucmVwbGFjZSgvXy9nLCAnJykpLFxuICBzdHJpbmdpZnk6IHN0cmluZ2lmeVNleGFnZXNpbWFsXG59O1xuY29uc3QgZmxvYXRUaW1lID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6ZmxvYXQnLFxuICBmb3JtYXQ6ICdUSU1FJyxcbiAgdGVzdDogL14oWy0rXT8pKFswLTldWzAtOV9dKig/OjpbMC01XT9bMC05XSkrXFwuWzAtOV9dKikkLyxcbiAgcmVzb2x2ZTogKHN0ciwgc2lnbiwgcGFydHMpID0+IHBhcnNlU2V4YWdlc2ltYWwoc2lnbiwgcGFydHMucmVwbGFjZSgvXy9nLCAnJykpLFxuICBzdHJpbmdpZnk6IHN0cmluZ2lmeVNleGFnZXNpbWFsXG59O1xuY29uc3QgdGltZXN0YW1wID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjp0aW1lc3RhbXAnLFxuICAvLyBJZiB0aGUgdGltZSB6b25lIGlzIG9taXR0ZWQsIHRoZSB0aW1lc3RhbXAgaXMgYXNzdW1lZCB0byBiZSBzcGVjaWZpZWQgaW4gVVRDLiBUaGUgdGltZSBwYXJ0XG4gIC8vIG1heSBiZSBvbWl0dGVkIGFsdG9nZXRoZXIsIHJlc3VsdGluZyBpbiBhIGRhdGUgZm9ybWF0LiBJbiBzdWNoIGEgY2FzZSwgdGhlIHRpbWUgcGFydCBpc1xuICAvLyBhc3N1bWVkIHRvIGJlIDAwOjAwOjAwWiAoc3RhcnQgb2YgZGF5LCBVVEMpLlxuICB0ZXN0OiBSZWdFeHAoJ14oPzonICsgJyhbMC05XXs0fSktKFswLTldezEsMn0pLShbMC05XXsxLDJ9KScgKyAvLyBZWVlZLU1tLURkXG4gICcoPzooPzp0fFR8WyBcXFxcdF0rKScgKyAvLyB0IHwgVCB8IHdoaXRlc3BhY2VcbiAgJyhbMC05XXsxLDJ9KTooWzAtOV17MSwyfSk6KFswLTldezEsMn0oXFxcXC5bMC05XSspPyknICsgLy8gSGg6TW06U3MoLnNzKT9cbiAgJyg/OlsgXFxcXHRdKihafFstK11bMDEyXT9bMC05XSg/OjpbMC05XXsyfSk/KSk/JyArIC8vIFogfCArNSB8IC0wMzozMFxuICAnKT8nICsgJykkJyksXG4gIHJlc29sdmU6IChzdHIsIHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNlYywgdHopID0+IHtcbiAgICBpZiAobWlsbGlzZWMpIG1pbGxpc2VjID0gKG1pbGxpc2VjICsgJzAwJykuc3Vic3RyKDEsIDMpO1xuICAgIGxldCBkYXRlID0gRGF0ZS5VVEMoeWVhciwgbW9udGggLSAxLCBkYXksIGhvdXIgfHwgMCwgbWludXRlIHx8IDAsIHNlY29uZCB8fCAwLCBtaWxsaXNlYyB8fCAwKTtcblxuICAgIGlmICh0eiAmJiB0eiAhPT0gJ1onKSB7XG4gICAgICBsZXQgZCA9IHBhcnNlU2V4YWdlc2ltYWwodHpbMF0sIHR6LnNsaWNlKDEpKTtcbiAgICAgIGlmIChNYXRoLmFicyhkKSA8IDMwKSBkICo9IDYwO1xuICAgICAgZGF0ZSAtPSA2MDAwMCAqIGQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUpO1xuICB9LFxuICBzdHJpbmdpZnk6ICh7XG4gICAgdmFsdWVcbiAgfSkgPT4gdmFsdWUudG9JU09TdHJpbmcoKS5yZXBsYWNlKC8oKFQwMDowMCk/OjAwKT9cXC4wMDBaJC8sICcnKVxufTtcblxuLyogZ2xvYmFsIGNvbnNvbGUsIHByb2Nlc3MsIFlBTUxfU0lMRU5DRV9ERVBSRUNBVElPTl9XQVJOSU5HUywgWUFNTF9TSUxFTkNFX1dBUk5JTkdTICovXG5mdW5jdGlvbiBzaG91bGRXYXJuKGRlcHJlY2F0aW9uKSB7XG4gIGNvbnN0IGVudiA9IHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVudiB8fCB7fTtcblxuICBpZiAoZGVwcmVjYXRpb24pIHtcbiAgICBpZiAodHlwZW9mIFlBTUxfU0lMRU5DRV9ERVBSRUNBVElPTl9XQVJOSU5HUyAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiAhWUFNTF9TSUxFTkNFX0RFUFJFQ0FUSU9OX1dBUk5JTkdTO1xuICAgIHJldHVybiAhZW52LllBTUxfU0lMRU5DRV9ERVBSRUNBVElPTl9XQVJOSU5HUztcbiAgfVxuXG4gIGlmICh0eXBlb2YgWUFNTF9TSUxFTkNFX1dBUk5JTkdTICE9PSAndW5kZWZpbmVkJykgcmV0dXJuICFZQU1MX1NJTEVOQ0VfV0FSTklOR1M7XG4gIHJldHVybiAhZW52LllBTUxfU0lMRU5DRV9XQVJOSU5HUztcbn1cblxuZnVuY3Rpb24gd2Fybih3YXJuaW5nLCB0eXBlKSB7XG4gIGlmIChzaG91bGRXYXJuKGZhbHNlKSkge1xuICAgIGNvbnN0IGVtaXQgPSB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbWl0V2FybmluZzsgLy8gVGhpcyB3aWxsIHRocm93IGluIEplc3QgaWYgYHdhcm5pbmdgIGlzIGFuIEVycm9yIGluc3RhbmNlIGR1ZSB0b1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9qZXN0L2lzc3Vlcy8yNTQ5XG5cbiAgICBpZiAoZW1pdCkgZW1pdCh3YXJuaW5nLCB0eXBlKTtlbHNlIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4odHlwZSA/IGAke3R5cGV9OiAke3dhcm5pbmd9YCA6IHdhcm5pbmcpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gd2FybkZpbGVEZXByZWNhdGlvbihmaWxlbmFtZSkge1xuICBpZiAoc2hvdWxkV2Fybih0cnVlKSkge1xuICAgIGNvbnN0IHBhdGggPSBmaWxlbmFtZS5yZXBsYWNlKC8uKnlhbWxbL1xcXFxdL2ksICcnKS5yZXBsYWNlKC9cXC5qcyQvLCAnJykucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xuICAgIHdhcm4oYFRoZSBlbmRwb2ludCAneWFtbC8ke3BhdGh9JyB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgcmVsZWFzZS5gLCAnRGVwcmVjYXRpb25XYXJuaW5nJyk7XG4gIH1cbn1cbmNvbnN0IHdhcm5lZCA9IHt9O1xuZnVuY3Rpb24gd2Fybk9wdGlvbkRlcHJlY2F0aW9uKG5hbWUsIGFsdGVybmF0aXZlKSB7XG4gIGlmICghd2FybmVkW25hbWVdICYmIHNob3VsZFdhcm4odHJ1ZSkpIHtcbiAgICB3YXJuZWRbbmFtZV0gPSB0cnVlO1xuICAgIGxldCBtc2cgPSBgVGhlIG9wdGlvbiAnJHtuYW1lfScgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHJlbGVhc2VgO1xuICAgIG1zZyArPSBhbHRlcm5hdGl2ZSA/IGAsIHVzZSAnJHthbHRlcm5hdGl2ZX0nIGluc3RlYWQuYCA6ICcuJztcbiAgICB3YXJuKG1zZywgJ0RlcHJlY2F0aW9uV2FybmluZycpO1xuICB9XG59XG5cbmV4cG9ydHMuYmluYXJ5ID0gYmluYXJ5O1xuZXhwb3J0cy5mbG9hdFRpbWUgPSBmbG9hdFRpbWU7XG5leHBvcnRzLmludFRpbWUgPSBpbnRUaW1lO1xuZXhwb3J0cy5vbWFwID0gb21hcDtcbmV4cG9ydHMucGFpcnMgPSBwYWlycztcbmV4cG9ydHMuc2V0ID0gc2V0O1xuZXhwb3J0cy50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG5leHBvcnRzLndhcm4gPSB3YXJuO1xuZXhwb3J0cy53YXJuRmlsZURlcHJlY2F0aW9uID0gd2FybkZpbGVEZXByZWNhdGlvbjtcbmV4cG9ydHMud2Fybk9wdGlvbkRlcHJlY2F0aW9uID0gd2Fybk9wdGlvbkRlcHJlY2F0aW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUGxhaW5WYWx1ZSA9IHJlcXVpcmUoJy4vUGxhaW5WYWx1ZS1lYzhlNTg4ZS5qcycpO1xudmFyIHJlc29sdmVTZXEgPSByZXF1aXJlKCcuL3Jlc29sdmVTZXEtZDAzY2IwMzcuanMnKTtcbnZhciB3YXJuaW5ncyA9IHJlcXVpcmUoJy4vd2FybmluZ3MtMTAwMGEzNzIuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlTWFwKHNjaGVtYSwgb2JqLCBjdHgpIHtcbiAgY29uc3QgbWFwID0gbmV3IHJlc29sdmVTZXEuWUFNTE1hcChzY2hlbWEpO1xuXG4gIGlmIChvYmogaW5zdGFuY2VvZiBNYXApIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBvYmopIG1hcC5pdGVtcy5wdXNoKHNjaGVtYS5jcmVhdGVQYWlyKGtleSwgdmFsdWUsIGN0eCkpO1xuICB9IGVsc2UgaWYgKG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iaikpIG1hcC5pdGVtcy5wdXNoKHNjaGVtYS5jcmVhdGVQYWlyKGtleSwgb2JqW2tleV0sIGN0eCkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEuc29ydE1hcEVudHJpZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBtYXAuaXRlbXMuc29ydChzY2hlbWEuc29ydE1hcEVudHJpZXMpO1xuICB9XG5cbiAgcmV0dXJuIG1hcDtcbn1cblxuY29uc3QgbWFwID0ge1xuICBjcmVhdGVOb2RlOiBjcmVhdGVNYXAsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIG5vZGVDbGFzczogcmVzb2x2ZVNlcS5ZQU1MTWFwLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjptYXAnLFxuICByZXNvbHZlOiByZXNvbHZlU2VxLnJlc29sdmVNYXBcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlcShzY2hlbWEsIG9iaiwgY3R4KSB7XG4gIGNvbnN0IHNlcSA9IG5ldyByZXNvbHZlU2VxLllBTUxTZXEoc2NoZW1hKTtcblxuICBpZiAob2JqICYmIG9ialtTeW1ib2wuaXRlcmF0b3JdKSB7XG4gICAgZm9yIChjb25zdCBpdCBvZiBvYmopIHtcbiAgICAgIGNvbnN0IHYgPSBzY2hlbWEuY3JlYXRlTm9kZShpdCwgY3R4LndyYXBTY2FsYXJzLCBudWxsLCBjdHgpO1xuICAgICAgc2VxLml0ZW1zLnB1c2godik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNlcTtcbn1cblxuY29uc3Qgc2VxID0ge1xuICBjcmVhdGVOb2RlOiBjcmVhdGVTZXEsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIG5vZGVDbGFzczogcmVzb2x2ZVNlcS5ZQU1MU2VxLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpzZXEnLFxuICByZXNvbHZlOiByZXNvbHZlU2VxLnJlc29sdmVTZXFcbn07XG5cbmNvbnN0IHN0cmluZyA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOnN0cicsXG4gIHJlc29sdmU6IHJlc29sdmVTZXEucmVzb2x2ZVN0cmluZyxcblxuICBzdHJpbmdpZnkoaXRlbSwgY3R4LCBvbkNvbW1lbnQsIG9uQ2hvbXBLZWVwKSB7XG4gICAgY3R4ID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhY3R1YWxTdHJpbmc6IHRydWVcbiAgICB9LCBjdHgpO1xuICAgIHJldHVybiByZXNvbHZlU2VxLnN0cmluZ2lmeVN0cmluZyhpdGVtLCBjdHgsIG9uQ29tbWVudCwgb25DaG9tcEtlZXApO1xuICB9LFxuXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEuc3RyT3B0aW9uc1xufTtcblxuY29uc3QgZmFpbHNhZmUgPSBbbWFwLCBzZXEsIHN0cmluZ107XG5cbi8qIGdsb2JhbCBCaWdJbnQgKi9cblxuY29uc3QgaW50SWRlbnRpZnkkMiA9IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2JpZ2ludCcgfHwgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG5cbmNvbnN0IGludFJlc29sdmUkMSA9IChzcmMsIHBhcnQsIHJhZGl4KSA9PiByZXNvbHZlU2VxLmludE9wdGlvbnMuYXNCaWdJbnQgPyBCaWdJbnQoc3JjKSA6IHBhcnNlSW50KHBhcnQsIHJhZGl4KTtcblxuZnVuY3Rpb24gaW50U3RyaW5naWZ5JDEobm9kZSwgcmFkaXgsIHByZWZpeCkge1xuICBjb25zdCB7XG4gICAgdmFsdWVcbiAgfSA9IG5vZGU7XG4gIGlmIChpbnRJZGVudGlmeSQyKHZhbHVlKSAmJiB2YWx1ZSA+PSAwKSByZXR1cm4gcHJlZml4ICsgdmFsdWUudG9TdHJpbmcocmFkaXgpO1xuICByZXR1cm4gcmVzb2x2ZVNlcS5zdHJpbmdpZnlOdW1iZXIobm9kZSk7XG59XG5cbmNvbnN0IG51bGxPYmogPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB2YWx1ZSA9PSBudWxsLFxuICBjcmVhdGVOb2RlOiAoc2NoZW1hLCB2YWx1ZSwgY3R4KSA9PiBjdHgud3JhcFNjYWxhcnMgPyBuZXcgcmVzb2x2ZVNlcS5TY2FsYXIobnVsbCkgOiBudWxsLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpudWxsJyxcbiAgdGVzdDogL14oPzp+fFtObl11bGx8TlVMTCk/JC8sXG4gIHJlc29sdmU6ICgpID0+IG51bGwsXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEubnVsbE9wdGlvbnMsXG4gIHN0cmluZ2lmeTogKCkgPT4gcmVzb2x2ZVNlcS5udWxsT3B0aW9ucy5udWxsU3RyXG59O1xuY29uc3QgYm9vbE9iaiA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpib29sJyxcbiAgdGVzdDogL14oPzpbVHRdcnVlfFRSVUV8W0ZmXWFsc2V8RkFMU0UpJC8sXG4gIHJlc29sdmU6IHN0ciA9PiBzdHJbMF0gPT09ICd0JyB8fCBzdHJbMF0gPT09ICdUJyxcbiAgb3B0aW9uczogcmVzb2x2ZVNlcS5ib29sT3B0aW9ucyxcbiAgc3RyaW5naWZ5OiAoe1xuICAgIHZhbHVlXG4gIH0pID0+IHZhbHVlID8gcmVzb2x2ZVNlcS5ib29sT3B0aW9ucy50cnVlU3RyIDogcmVzb2x2ZVNlcS5ib29sT3B0aW9ucy5mYWxzZVN0clxufTtcbmNvbnN0IG9jdE9iaiA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IGludElkZW50aWZ5JDIodmFsdWUpICYmIHZhbHVlID49IDAsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsXG4gIGZvcm1hdDogJ09DVCcsXG4gIHRlc3Q6IC9eMG8oWzAtN10rKSQvLFxuICByZXNvbHZlOiAoc3RyLCBvY3QpID0+IGludFJlc29sdmUkMShzdHIsIG9jdCwgOCksXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEuaW50T3B0aW9ucyxcbiAgc3RyaW5naWZ5OiBub2RlID0+IGludFN0cmluZ2lmeSQxKG5vZGUsIDgsICcwbycpXG59O1xuY29uc3QgaW50T2JqID0ge1xuICBpZGVudGlmeTogaW50SWRlbnRpZnkkMixcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgdGVzdDogL15bLStdP1swLTldKyQvLFxuICByZXNvbHZlOiBzdHIgPT4gaW50UmVzb2x2ZSQxKHN0ciwgc3RyLCAxMCksXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEuaW50T3B0aW9ucyxcbiAgc3RyaW5naWZ5OiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlclxufTtcbmNvbnN0IGhleE9iaiA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IGludElkZW50aWZ5JDIodmFsdWUpICYmIHZhbHVlID49IDAsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsXG4gIGZvcm1hdDogJ0hFWCcsXG4gIHRlc3Q6IC9eMHgoWzAtOWEtZkEtRl0rKSQvLFxuICByZXNvbHZlOiAoc3RyLCBoZXgpID0+IGludFJlc29sdmUkMShzdHIsIGhleCwgMTYpLFxuICBvcHRpb25zOiByZXNvbHZlU2VxLmludE9wdGlvbnMsXG4gIHN0cmluZ2lmeTogbm9kZSA9PiBpbnRTdHJpbmdpZnkkMShub2RlLCAxNiwgJzB4Jylcbn07XG5jb25zdCBuYW5PYmogPSB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcsXG4gIHRlc3Q6IC9eKD86Wy0rXT9cXC5pbmZ8KFxcLm5hbikpJC9pLFxuICByZXNvbHZlOiAoc3RyLCBuYW4pID0+IG5hbiA/IE5hTiA6IHN0clswXSA9PT0gJy0nID8gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZIDogTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLFxuICBzdHJpbmdpZnk6IHJlc29sdmVTZXEuc3RyaW5naWZ5TnVtYmVyXG59O1xuY29uc3QgZXhwT2JqID0ge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6ZmxvYXQnLFxuICBmb3JtYXQ6ICdFWFAnLFxuICB0ZXN0OiAvXlstK10/KD86XFwuWzAtOV0rfFswLTldKyg/OlxcLlswLTldKik/KVtlRV1bLStdP1swLTldKyQvLFxuICByZXNvbHZlOiBzdHIgPT4gcGFyc2VGbG9hdChzdHIpLFxuICBzdHJpbmdpZnk6ICh7XG4gICAgdmFsdWVcbiAgfSkgPT4gTnVtYmVyKHZhbHVlKS50b0V4cG9uZW50aWFsKClcbn07XG5jb25zdCBmbG9hdE9iaiA9IHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0JyxcbiAgdGVzdDogL15bLStdPyg/OlxcLihbMC05XSspfFswLTldK1xcLihbMC05XSopKSQvLFxuXG4gIHJlc29sdmUoc3RyLCBmcmFjMSwgZnJhYzIpIHtcbiAgICBjb25zdCBmcmFjID0gZnJhYzEgfHwgZnJhYzI7XG4gICAgY29uc3Qgbm9kZSA9IG5ldyByZXNvbHZlU2VxLlNjYWxhcihwYXJzZUZsb2F0KHN0cikpO1xuICAgIGlmIChmcmFjICYmIGZyYWNbZnJhYy5sZW5ndGggLSAxXSA9PT0gJzAnKSBub2RlLm1pbkZyYWN0aW9uRGlnaXRzID0gZnJhYy5sZW5ndGg7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH0sXG5cbiAgc3RyaW5naWZ5OiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlclxufTtcbmNvbnN0IGNvcmUgPSBmYWlsc2FmZS5jb25jYXQoW251bGxPYmosIGJvb2xPYmosIG9jdE9iaiwgaW50T2JqLCBoZXhPYmosIG5hbk9iaiwgZXhwT2JqLCBmbG9hdE9ial0pO1xuXG4vKiBnbG9iYWwgQmlnSW50ICovXG5cbmNvbnN0IGludElkZW50aWZ5JDEgPSB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdiaWdpbnQnIHx8IE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xuXG5jb25zdCBzdHJpbmdpZnlKU09OID0gKHtcbiAgdmFsdWVcbn0pID0+IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcblxuY29uc3QganNvbiA9IFttYXAsIHNlcSwge1xuICBpZGVudGlmeTogdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6c3RyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVNlcS5yZXNvbHZlU3RyaW5nLFxuICBzdHJpbmdpZnk6IHN0cmluZ2lmeUpTT05cbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHZhbHVlID09IG51bGwsXG4gIGNyZWF0ZU5vZGU6IChzY2hlbWEsIHZhbHVlLCBjdHgpID0+IGN0eC53cmFwU2NhbGFycyA/IG5ldyByZXNvbHZlU2VxLlNjYWxhcihudWxsKSA6IG51bGwsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOm51bGwnLFxuICB0ZXN0OiAvXm51bGwkLyxcbiAgcmVzb2x2ZTogKCkgPT4gbnVsbCxcbiAgc3RyaW5naWZ5OiBzdHJpbmdpZnlKU09OXG59LCB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6Ym9vbCcsXG4gIHRlc3Q6IC9edHJ1ZXxmYWxzZSQvLFxuICByZXNvbHZlOiBzdHIgPT4gc3RyID09PSAndHJ1ZScsXG4gIHN0cmluZ2lmeTogc3RyaW5naWZ5SlNPTlxufSwge1xuICBpZGVudGlmeTogaW50SWRlbnRpZnkkMSxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6aW50JyxcbiAgdGVzdDogL14tPyg/OjB8WzEtOV1bMC05XSopJC8sXG4gIHJlc29sdmU6IHN0ciA9PiByZXNvbHZlU2VxLmludE9wdGlvbnMuYXNCaWdJbnQgPyBCaWdJbnQoc3RyKSA6IHBhcnNlSW50KHN0ciwgMTApLFxuICBzdHJpbmdpZnk6ICh7XG4gICAgdmFsdWVcbiAgfSkgPT4gaW50SWRlbnRpZnkkMSh2YWx1ZSkgPyB2YWx1ZS50b1N0cmluZygpIDogSlNPTi5zdHJpbmdpZnkodmFsdWUpXG59LCB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcsXG4gIHRlc3Q6IC9eLT8oPzowfFsxLTldWzAtOV0qKSg/OlxcLlswLTldKik/KD86W2VFXVstK10/WzAtOV0rKT8kLyxcbiAgcmVzb2x2ZTogc3RyID0+IHBhcnNlRmxvYXQoc3RyKSxcbiAgc3RyaW5naWZ5OiBzdHJpbmdpZnlKU09OXG59XTtcblxuanNvbi5zY2FsYXJGYWxsYmFjayA9IHN0ciA9PiB7XG4gIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5yZXNvbHZlZCBwbGFpbiBzY2FsYXIgJHtKU09OLnN0cmluZ2lmeShzdHIpfWApO1xufTtcblxuLyogZ2xvYmFsIEJpZ0ludCAqL1xuXG5jb25zdCBib29sU3RyaW5naWZ5ID0gKHtcbiAgdmFsdWVcbn0pID0+IHZhbHVlID8gcmVzb2x2ZVNlcS5ib29sT3B0aW9ucy50cnVlU3RyIDogcmVzb2x2ZVNlcS5ib29sT3B0aW9ucy5mYWxzZVN0cjtcblxuY29uc3QgaW50SWRlbnRpZnkgPSB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdiaWdpbnQnIHx8IE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xuXG5mdW5jdGlvbiBpbnRSZXNvbHZlKHNpZ24sIHNyYywgcmFkaXgpIHtcbiAgbGV0IHN0ciA9IHNyYy5yZXBsYWNlKC9fL2csICcnKTtcblxuICBpZiAocmVzb2x2ZVNlcS5pbnRPcHRpb25zLmFzQmlnSW50KSB7XG4gICAgc3dpdGNoIChyYWRpeCkge1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzdHIgPSBgMGIke3N0cn1gO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA4OlxuICAgICAgICBzdHIgPSBgMG8ke3N0cn1gO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAxNjpcbiAgICAgICAgc3RyID0gYDB4JHtzdHJ9YDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgbiA9IEJpZ0ludChzdHIpO1xuICAgIHJldHVybiBzaWduID09PSAnLScgPyBCaWdJbnQoLTEpICogbiA6IG47XG4gIH1cblxuICBjb25zdCBuID0gcGFyc2VJbnQoc3RyLCByYWRpeCk7XG4gIHJldHVybiBzaWduID09PSAnLScgPyAtMSAqIG4gOiBuO1xufVxuXG5mdW5jdGlvbiBpbnRTdHJpbmdpZnkobm9kZSwgcmFkaXgsIHByZWZpeCkge1xuICBjb25zdCB7XG4gICAgdmFsdWVcbiAgfSA9IG5vZGU7XG5cbiAgaWYgKGludElkZW50aWZ5KHZhbHVlKSkge1xuICAgIGNvbnN0IHN0ciA9IHZhbHVlLnRvU3RyaW5nKHJhZGl4KTtcbiAgICByZXR1cm4gdmFsdWUgPCAwID8gJy0nICsgcHJlZml4ICsgc3RyLnN1YnN0cigxKSA6IHByZWZpeCArIHN0cjtcbiAgfVxuXG4gIHJldHVybiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlcihub2RlKTtcbn1cblxuY29uc3QgeWFtbDExID0gZmFpbHNhZmUuY29uY2F0KFt7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB2YWx1ZSA9PSBudWxsLFxuICBjcmVhdGVOb2RlOiAoc2NoZW1hLCB2YWx1ZSwgY3R4KSA9PiBjdHgud3JhcFNjYWxhcnMgPyBuZXcgcmVzb2x2ZVNlcS5TY2FsYXIobnVsbCkgOiBudWxsLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpudWxsJyxcbiAgdGVzdDogL14oPzp+fFtObl11bGx8TlVMTCk/JC8sXG4gIHJlc29sdmU6ICgpID0+IG51bGwsXG4gIG9wdGlvbnM6IHJlc29sdmVTZXEubnVsbE9wdGlvbnMsXG4gIHN0cmluZ2lmeTogKCkgPT4gcmVzb2x2ZVNlcS5udWxsT3B0aW9ucy5udWxsU3RyXG59LCB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyxcbiAgZGVmYXVsdDogdHJ1ZSxcbiAgdGFnOiAndGFnOnlhbWwub3JnLDIwMDI6Ym9vbCcsXG4gIHRlc3Q6IC9eKD86WXx5fFtZeV1lc3xZRVN8W1R0XXJ1ZXxUUlVFfFtPb11ufE9OKSQvLFxuICByZXNvbHZlOiAoKSA9PiB0cnVlLFxuICBvcHRpb25zOiByZXNvbHZlU2VxLmJvb2xPcHRpb25zLFxuICBzdHJpbmdpZnk6IGJvb2xTdHJpbmdpZnlcbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpib29sJyxcbiAgdGVzdDogL14oPzpOfG58W05uXW98Tk98W0ZmXWFsc2V8RkFMU0V8W09vXWZmfE9GRikkL2ksXG4gIHJlc29sdmU6ICgpID0+IGZhbHNlLFxuICBvcHRpb25zOiByZXNvbHZlU2VxLmJvb2xPcHRpb25zLFxuICBzdHJpbmdpZnk6IGJvb2xTdHJpbmdpZnlcbn0sIHtcbiAgaWRlbnRpZnk6IGludElkZW50aWZ5LFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjppbnQnLFxuICBmb3JtYXQ6ICdCSU4nLFxuICB0ZXN0OiAvXihbLStdPykwYihbMC0xX10rKSQvLFxuICByZXNvbHZlOiAoc3RyLCBzaWduLCBiaW4pID0+IGludFJlc29sdmUoc2lnbiwgYmluLCAyKSxcbiAgc3RyaW5naWZ5OiBub2RlID0+IGludFN0cmluZ2lmeShub2RlLCAyLCAnMGInKVxufSwge1xuICBpZGVudGlmeTogaW50SWRlbnRpZnksXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsXG4gIGZvcm1hdDogJ09DVCcsXG4gIHRlc3Q6IC9eKFstK10/KTAoWzAtN19dKykkLyxcbiAgcmVzb2x2ZTogKHN0ciwgc2lnbiwgb2N0KSA9PiBpbnRSZXNvbHZlKHNpZ24sIG9jdCwgOCksXG4gIHN0cmluZ2lmeTogbm9kZSA9PiBpbnRTdHJpbmdpZnkobm9kZSwgOCwgJzAnKVxufSwge1xuICBpZGVudGlmeTogaW50SWRlbnRpZnksXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsXG4gIHRlc3Q6IC9eKFstK10/KShbMC05XVswLTlfXSopJC8sXG4gIHJlc29sdmU6IChzdHIsIHNpZ24sIGFicykgPT4gaW50UmVzb2x2ZShzaWduLCBhYnMsIDEwKSxcbiAgc3RyaW5naWZ5OiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlclxufSwge1xuICBpZGVudGlmeTogaW50SWRlbnRpZnksXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsXG4gIGZvcm1hdDogJ0hFWCcsXG4gIHRlc3Q6IC9eKFstK10/KTB4KFswLTlhLWZBLUZfXSspJC8sXG4gIHJlc29sdmU6IChzdHIsIHNpZ24sIGhleCkgPT4gaW50UmVzb2x2ZShzaWduLCBoZXgsIDE2KSxcbiAgc3RyaW5naWZ5OiBub2RlID0+IGludFN0cmluZ2lmeShub2RlLCAxNiwgJzB4Jylcbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0JyxcbiAgdGVzdDogL14oPzpbLStdP1xcLmluZnwoXFwubmFuKSkkL2ksXG4gIHJlc29sdmU6IChzdHIsIG5hbikgPT4gbmFuID8gTmFOIDogc3RyWzBdID09PSAnLScgPyBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFkgOiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXG4gIHN0cmluZ2lmeTogcmVzb2x2ZVNlcS5zdHJpbmdpZnlOdW1iZXJcbn0sIHtcbiAgaWRlbnRpZnk6IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gIGRlZmF1bHQ6IHRydWUsXG4gIHRhZzogJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0JyxcbiAgZm9ybWF0OiAnRVhQJyxcbiAgdGVzdDogL15bLStdPyhbMC05XVswLTlfXSopPyhcXC5bMC05X10qKT9bZUVdWy0rXT9bMC05XSskLyxcbiAgcmVzb2x2ZTogc3RyID0+IHBhcnNlRmxvYXQoc3RyLnJlcGxhY2UoL18vZywgJycpKSxcbiAgc3RyaW5naWZ5OiAoe1xuICAgIHZhbHVlXG4gIH0pID0+IE51bWJlcih2YWx1ZSkudG9FeHBvbmVudGlhbCgpXG59LCB7XG4gIGlkZW50aWZ5OiB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLFxuICBkZWZhdWx0OiB0cnVlLFxuICB0YWc6ICd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcsXG4gIHRlc3Q6IC9eWy0rXT8oPzpbMC05XVswLTlfXSopP1xcLihbMC05X10qKSQvLFxuXG4gIHJlc29sdmUoc3RyLCBmcmFjKSB7XG4gICAgY29uc3Qgbm9kZSA9IG5ldyByZXNvbHZlU2VxLlNjYWxhcihwYXJzZUZsb2F0KHN0ci5yZXBsYWNlKC9fL2csICcnKSkpO1xuXG4gICAgaWYgKGZyYWMpIHtcbiAgICAgIGNvbnN0IGYgPSBmcmFjLnJlcGxhY2UoL18vZywgJycpO1xuICAgICAgaWYgKGZbZi5sZW5ndGggLSAxXSA9PT0gJzAnKSBub2RlLm1pbkZyYWN0aW9uRGlnaXRzID0gZi5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH0sXG5cbiAgc3RyaW5naWZ5OiByZXNvbHZlU2VxLnN0cmluZ2lmeU51bWJlclxufV0sIHdhcm5pbmdzLmJpbmFyeSwgd2FybmluZ3Mub21hcCwgd2FybmluZ3MucGFpcnMsIHdhcm5pbmdzLnNldCwgd2FybmluZ3MuaW50VGltZSwgd2FybmluZ3MuZmxvYXRUaW1lLCB3YXJuaW5ncy50aW1lc3RhbXApO1xuXG5jb25zdCBzY2hlbWFzID0ge1xuICBjb3JlLFxuICBmYWlsc2FmZSxcbiAganNvbixcbiAgeWFtbDExXG59O1xuY29uc3QgdGFncyA9IHtcbiAgYmluYXJ5OiB3YXJuaW5ncy5iaW5hcnksXG4gIGJvb2w6IGJvb2xPYmosXG4gIGZsb2F0OiBmbG9hdE9iaixcbiAgZmxvYXRFeHA6IGV4cE9iaixcbiAgZmxvYXROYU46IG5hbk9iaixcbiAgZmxvYXRUaW1lOiB3YXJuaW5ncy5mbG9hdFRpbWUsXG4gIGludDogaW50T2JqLFxuICBpbnRIZXg6IGhleE9iaixcbiAgaW50T2N0OiBvY3RPYmosXG4gIGludFRpbWU6IHdhcm5pbmdzLmludFRpbWUsXG4gIG1hcCxcbiAgbnVsbDogbnVsbE9iaixcbiAgb21hcDogd2FybmluZ3Mub21hcCxcbiAgcGFpcnM6IHdhcm5pbmdzLnBhaXJzLFxuICBzZXEsXG4gIHNldDogd2FybmluZ3Muc2V0LFxuICB0aW1lc3RhbXA6IHdhcm5pbmdzLnRpbWVzdGFtcFxufTtcblxuZnVuY3Rpb24gZmluZFRhZ09iamVjdCh2YWx1ZSwgdGFnTmFtZSwgdGFncykge1xuICBpZiAodGFnTmFtZSkge1xuICAgIGNvbnN0IG1hdGNoID0gdGFncy5maWx0ZXIodCA9PiB0LnRhZyA9PT0gdGFnTmFtZSk7XG4gICAgY29uc3QgdGFnT2JqID0gbWF0Y2guZmluZCh0ID0+ICF0LmZvcm1hdCkgfHwgbWF0Y2hbMF07XG4gICAgaWYgKCF0YWdPYmopIHRocm93IG5ldyBFcnJvcihgVGFnICR7dGFnTmFtZX0gbm90IGZvdW5kYCk7XG4gICAgcmV0dXJuIHRhZ09iajtcbiAgfSAvLyBUT0RPOiBkZXByZWNhdGUvcmVtb3ZlIGNsYXNzIGNoZWNrXG5cblxuICByZXR1cm4gdGFncy5maW5kKHQgPT4gKHQuaWRlbnRpZnkgJiYgdC5pZGVudGlmeSh2YWx1ZSkgfHwgdC5jbGFzcyAmJiB2YWx1ZSBpbnN0YW5jZW9mIHQuY2xhc3MpICYmICF0LmZvcm1hdCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGUodmFsdWUsIHRhZ05hbWUsIGN0eCkge1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiByZXNvbHZlU2VxLk5vZGUpIHJldHVybiB2YWx1ZTtcbiAgY29uc3Qge1xuICAgIGRlZmF1bHRQcmVmaXgsXG4gICAgb25UYWdPYmosXG4gICAgcHJldk9iamVjdHMsXG4gICAgc2NoZW1hLFxuICAgIHdyYXBTY2FsYXJzXG4gIH0gPSBjdHg7XG4gIGlmICh0YWdOYW1lICYmIHRhZ05hbWUuc3RhcnRzV2l0aCgnISEnKSkgdGFnTmFtZSA9IGRlZmF1bHRQcmVmaXggKyB0YWdOYW1lLnNsaWNlKDIpO1xuICBsZXQgdGFnT2JqID0gZmluZFRhZ09iamVjdCh2YWx1ZSwgdGFnTmFtZSwgc2NoZW1hLnRhZ3MpO1xuXG4gIGlmICghdGFnT2JqKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZS50b0pTT04gPT09ICdmdW5jdGlvbicpIHZhbHVlID0gdmFsdWUudG9KU09OKCk7XG4gICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSByZXR1cm4gd3JhcFNjYWxhcnMgPyBuZXcgcmVzb2x2ZVNlcS5TY2FsYXIodmFsdWUpIDogdmFsdWU7XG4gICAgdGFnT2JqID0gdmFsdWUgaW5zdGFuY2VvZiBNYXAgPyBtYXAgOiB2YWx1ZVtTeW1ib2wuaXRlcmF0b3JdID8gc2VxIDogbWFwO1xuICB9XG5cbiAgaWYgKG9uVGFnT2JqKSB7XG4gICAgb25UYWdPYmoodGFnT2JqKTtcbiAgICBkZWxldGUgY3R4Lm9uVGFnT2JqO1xuICB9IC8vIERldGVjdCBkdXBsaWNhdGUgcmVmZXJlbmNlcyB0byB0aGUgc2FtZSBvYmplY3QgJiB1c2UgQWxpYXMgbm9kZXMgZm9yIGFsbFxuICAvLyBhZnRlciBmaXJzdC4gVGhlIGBvYmpgIHdyYXBwZXIgYWxsb3dzIGZvciBjaXJjdWxhciByZWZlcmVuY2VzIHRvIHJlc29sdmUuXG5cblxuICBjb25zdCBvYmogPSB7XG4gICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICBub2RlOiB1bmRlZmluZWRcbiAgfTtcblxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiBwcmV2T2JqZWN0cykge1xuICAgIGNvbnN0IHByZXYgPSBwcmV2T2JqZWN0cy5nZXQodmFsdWUpO1xuXG4gICAgaWYgKHByZXYpIHtcbiAgICAgIGNvbnN0IGFsaWFzID0gbmV3IHJlc29sdmVTZXEuQWxpYXMocHJldik7IC8vIGxlYXZlcyBzb3VyY2UgZGlydHk7IG11c3QgYmUgY2xlYW5lZCBieSBjYWxsZXJcblxuICAgICAgY3R4LmFsaWFzTm9kZXMucHVzaChhbGlhcyk7IC8vIGRlZmluZWQgYWxvbmcgd2l0aCBwcmV2T2JqZWN0c1xuXG4gICAgICByZXR1cm4gYWxpYXM7XG4gICAgfVxuXG4gICAgb2JqLnZhbHVlID0gdmFsdWU7XG4gICAgcHJldk9iamVjdHMuc2V0KHZhbHVlLCBvYmopO1xuICB9XG5cbiAgb2JqLm5vZGUgPSB0YWdPYmouY3JlYXRlTm9kZSA/IHRhZ09iai5jcmVhdGVOb2RlKGN0eC5zY2hlbWEsIHZhbHVlLCBjdHgpIDogd3JhcFNjYWxhcnMgPyBuZXcgcmVzb2x2ZVNlcS5TY2FsYXIodmFsdWUpIDogdmFsdWU7XG4gIGlmICh0YWdOYW1lICYmIG9iai5ub2RlIGluc3RhbmNlb2YgcmVzb2x2ZVNlcS5Ob2RlKSBvYmoubm9kZS50YWcgPSB0YWdOYW1lO1xuICByZXR1cm4gb2JqLm5vZGU7XG59XG5cbmZ1bmN0aW9uIGdldFNjaGVtYVRhZ3Moc2NoZW1hcywga25vd25UYWdzLCBjdXN0b21UYWdzLCBzY2hlbWFJZCkge1xuICBsZXQgdGFncyA9IHNjaGVtYXNbc2NoZW1hSWQucmVwbGFjZSgvXFxXL2csICcnKV07IC8vICd5YW1sLTEuMScgLT4gJ3lhbWwxMSdcblxuICBpZiAoIXRhZ3MpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc2NoZW1hcykubWFwKGtleSA9PiBKU09OLnN0cmluZ2lmeShrZXkpKS5qb2luKCcsICcpO1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBzY2hlbWEgXCIke3NjaGVtYUlkfVwiOyB1c2Ugb25lIG9mICR7a2V5c31gKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGN1c3RvbVRhZ3MpKSB7XG4gICAgZm9yIChjb25zdCB0YWcgb2YgY3VzdG9tVGFncykgdGFncyA9IHRhZ3MuY29uY2F0KHRhZyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGN1c3RvbVRhZ3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0YWdzID0gY3VzdG9tVGFncyh0YWdzLnNsaWNlKCkpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWdzLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgdGFnID0gdGFnc1tpXTtcblxuICAgIGlmICh0eXBlb2YgdGFnID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgdGFnT2JqID0ga25vd25UYWdzW3RhZ107XG5cbiAgICAgIGlmICghdGFnT2JqKSB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhrbm93blRhZ3MpLm1hcChrZXkgPT4gSlNPTi5zdHJpbmdpZnkoa2V5KSkuam9pbignLCAnKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGN1c3RvbSB0YWcgXCIke3RhZ31cIjsgdXNlIG9uZSBvZiAke2tleXN9YCk7XG4gICAgICB9XG5cbiAgICAgIHRhZ3NbaV0gPSB0YWdPYmo7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhZ3M7XG59XG5cbmNvbnN0IHNvcnRNYXBFbnRyaWVzQnlLZXkgPSAoYSwgYikgPT4gYS5rZXkgPCBiLmtleSA/IC0xIDogYS5rZXkgPiBiLmtleSA/IDEgOiAwO1xuXG5jbGFzcyBTY2hlbWEge1xuICAvLyBUT0RPOiByZW1vdmUgaW4gdjJcbiAgLy8gVE9ETzogcmVtb3ZlIGluIHYyXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBjdXN0b21UYWdzLFxuICAgIG1lcmdlLFxuICAgIHNjaGVtYSxcbiAgICBzb3J0TWFwRW50cmllcyxcbiAgICB0YWdzOiBkZXByZWNhdGVkQ3VzdG9tVGFnc1xuICB9KSB7XG4gICAgdGhpcy5tZXJnZSA9ICEhbWVyZ2U7XG4gICAgdGhpcy5uYW1lID0gc2NoZW1hO1xuICAgIHRoaXMuc29ydE1hcEVudHJpZXMgPSBzb3J0TWFwRW50cmllcyA9PT0gdHJ1ZSA/IHNvcnRNYXBFbnRyaWVzQnlLZXkgOiBzb3J0TWFwRW50cmllcyB8fCBudWxsO1xuICAgIGlmICghY3VzdG9tVGFncyAmJiBkZXByZWNhdGVkQ3VzdG9tVGFncykgd2FybmluZ3Mud2Fybk9wdGlvbkRlcHJlY2F0aW9uKCd0YWdzJywgJ2N1c3RvbVRhZ3MnKTtcbiAgICB0aGlzLnRhZ3MgPSBnZXRTY2hlbWFUYWdzKHNjaGVtYXMsIHRhZ3MsIGN1c3RvbVRhZ3MgfHwgZGVwcmVjYXRlZEN1c3RvbVRhZ3MsIHNjaGVtYSk7XG4gIH1cblxuICBjcmVhdGVOb2RlKHZhbHVlLCB3cmFwU2NhbGFycywgdGFnTmFtZSwgY3R4KSB7XG4gICAgY29uc3QgYmFzZUN0eCA9IHtcbiAgICAgIGRlZmF1bHRQcmVmaXg6IFNjaGVtYS5kZWZhdWx0UHJlZml4LFxuICAgICAgc2NoZW1hOiB0aGlzLFxuICAgICAgd3JhcFNjYWxhcnNcbiAgICB9O1xuICAgIGNvbnN0IGNyZWF0ZUN0eCA9IGN0eCA/IE9iamVjdC5hc3NpZ24oY3R4LCBiYXNlQ3R4KSA6IGJhc2VDdHg7XG4gICAgcmV0dXJuIGNyZWF0ZU5vZGUodmFsdWUsIHRhZ05hbWUsIGNyZWF0ZUN0eCk7XG4gIH1cblxuICBjcmVhdGVQYWlyKGtleSwgdmFsdWUsIGN0eCkge1xuICAgIGlmICghY3R4KSBjdHggPSB7XG4gICAgICB3cmFwU2NhbGFyczogdHJ1ZVxuICAgIH07XG4gICAgY29uc3QgayA9IHRoaXMuY3JlYXRlTm9kZShrZXksIGN0eC53cmFwU2NhbGFycywgbnVsbCwgY3R4KTtcbiAgICBjb25zdCB2ID0gdGhpcy5jcmVhdGVOb2RlKHZhbHVlLCBjdHgud3JhcFNjYWxhcnMsIG51bGwsIGN0eCk7XG4gICAgcmV0dXJuIG5ldyByZXNvbHZlU2VxLlBhaXIoaywgdik7XG4gIH1cblxufVxuXG5QbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eShTY2hlbWEsIFwiZGVmYXVsdFByZWZpeFwiLCBQbGFpblZhbHVlLmRlZmF1bHRUYWdQcmVmaXgpO1xuXG5QbGFpblZhbHVlLl9kZWZpbmVQcm9wZXJ0eShTY2hlbWEsIFwiZGVmYXVsdFRhZ3NcIiwgUGxhaW5WYWx1ZS5kZWZhdWx0VGFncyk7XG5cbmV4cG9ydHMuU2NoZW1hID0gU2NoZW1hO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVzb2x2ZVNlcSA9IHJlcXVpcmUoJy4vcmVzb2x2ZVNlcS1kMDNjYjAzNy5qcycpO1xudmFyIFNjaGVtYSA9IHJlcXVpcmUoJy4vU2NoZW1hLTg4ZTMyM2E3LmpzJyk7XG5yZXF1aXJlKCcuL1BsYWluVmFsdWUtZWM4ZTU4OGUuanMnKTtcbnJlcXVpcmUoJy4vd2FybmluZ3MtMTAwMGEzNzIuanMnKTtcblxuXG5cbmV4cG9ydHMuQWxpYXMgPSByZXNvbHZlU2VxLkFsaWFzO1xuZXhwb3J0cy5Db2xsZWN0aW9uID0gcmVzb2x2ZVNlcS5Db2xsZWN0aW9uO1xuZXhwb3J0cy5NZXJnZSA9IHJlc29sdmVTZXEuTWVyZ2U7XG5leHBvcnRzLk5vZGUgPSByZXNvbHZlU2VxLk5vZGU7XG5leHBvcnRzLlBhaXIgPSByZXNvbHZlU2VxLlBhaXI7XG5leHBvcnRzLlNjYWxhciA9IHJlc29sdmVTZXEuU2NhbGFyO1xuZXhwb3J0cy5ZQU1MTWFwID0gcmVzb2x2ZVNlcS5ZQU1MTWFwO1xuZXhwb3J0cy5ZQU1MU2VxID0gcmVzb2x2ZVNlcS5ZQU1MU2VxO1xuZXhwb3J0cy5iaW5hcnlPcHRpb25zID0gcmVzb2x2ZVNlcS5iaW5hcnlPcHRpb25zO1xuZXhwb3J0cy5ib29sT3B0aW9ucyA9IHJlc29sdmVTZXEuYm9vbE9wdGlvbnM7XG5leHBvcnRzLmludE9wdGlvbnMgPSByZXNvbHZlU2VxLmludE9wdGlvbnM7XG5leHBvcnRzLm51bGxPcHRpb25zID0gcmVzb2x2ZVNlcS5udWxsT3B0aW9ucztcbmV4cG9ydHMuc3RyT3B0aW9ucyA9IHJlc29sdmVTZXEuc3RyT3B0aW9ucztcbmV4cG9ydHMuU2NoZW1hID0gU2NoZW1hLlNjaGVtYTtcbiIsImNvbnN0IHR5cGVzID0gcmVxdWlyZSgnLi9kaXN0L3R5cGVzJylcblxuZXhwb3J0cy5iaW5hcnlPcHRpb25zID0gdHlwZXMuYmluYXJ5T3B0aW9uc1xuZXhwb3J0cy5ib29sT3B0aW9ucyA9IHR5cGVzLmJvb2xPcHRpb25zXG5leHBvcnRzLmludE9wdGlvbnMgPSB0eXBlcy5pbnRPcHRpb25zXG5leHBvcnRzLm51bGxPcHRpb25zID0gdHlwZXMubnVsbE9wdGlvbnNcbmV4cG9ydHMuc3RyT3B0aW9ucyA9IHR5cGVzLnN0ck9wdGlvbnNcblxuZXhwb3J0cy5TY2hlbWEgPSB0eXBlcy5TY2hlbWFcbmV4cG9ydHMuQWxpYXMgPSB0eXBlcy5BbGlhc1xuZXhwb3J0cy5Db2xsZWN0aW9uID0gdHlwZXMuQ29sbGVjdGlvblxuZXhwb3J0cy5NZXJnZSA9IHR5cGVzLk1lcmdlXG5leHBvcnRzLk5vZGUgPSB0eXBlcy5Ob2RlXG5leHBvcnRzLlBhaXIgPSB0eXBlcy5QYWlyXG5leHBvcnRzLlNjYWxhciA9IHR5cGVzLlNjYWxhclxuZXhwb3J0cy5ZQU1MTWFwID0gdHlwZXMuWUFNTE1hcFxuZXhwb3J0cy5ZQU1MU2VxID0gdHlwZXMuWUFNTFNlcVxuIiwiaW1wb3J0IHlhbWwgZnJvbSAneWFtbCc7XG5pbXBvcnQgeyBZQU1MTWFwLCBZQU1MU2VxIH0gZnJvbSAneWFtbC90eXBlcyc7XG5pbXBvcnQgb3B0aW9uQVBJIGZyb20gJy4uL2FwaS9vcHRpb24nO1xuXG5mdW5jdGlvbiBnZXRJbihvYmosIHBhdGgpIHtcbiAgcmV0dXJuIHBhdGgucmVkdWNlKCh2LCBrKSA9PiAoayBpbiB2ID8gdltrXSA6IHt9KSwgb2JqKTtcbn1cblxuZnVuY3Rpb24gYWRkQ29tbWVudHMoY29udGV4dCwgcGF0aCwgY29tbWVudE5vZGUsIGl0ZXJOb2RlID0gY29tbWVudE5vZGUpIHtcbiAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGNvbW1lbnQgfSA9IGdldEluKGNvbnRleHQsIHBhdGgpO1xuICBjb25zdCBsaW5lcyA9IFtdO1xuXG4gIGlmIChvcHRpb25BUEkoJ3JlbmRlclRpdGxlJykgJiYgdGl0bGUpIHtcbiAgICBsaW5lcy5wdXNoKGAgJHt0aXRsZX1gLCAnJyk7XG4gIH1cbiAgaWYgKG9wdGlvbkFQSSgncmVuZGVyRGVzY3JpcHRpb24nKSAmJiBkZXNjcmlwdGlvbikge1xuICAgIGxpbmVzLnB1c2goYCAke2Rlc2NyaXB0aW9ufWApO1xuICB9XG4gIGlmIChvcHRpb25BUEkoJ3JlbmRlckNvbW1lbnQnKSAmJiBjb21tZW50KSB7XG4gICAgbGluZXMucHVzaChgICR7Y29tbWVudH1gKTtcbiAgfVxuXG4gIGNvbW1lbnROb2RlLmNvbW1lbnRCZWZvcmUgPSBsaW5lcy5qb2luKCdcXG4nKTtcblxuICBpZiAoaXRlck5vZGUgaW5zdGFuY2VvZiBZQU1MTWFwKSB7XG4gICAgaXRlck5vZGUuaXRlbXMuZm9yRWFjaChuID0+IHtcbiAgICAgIGFkZENvbW1lbnRzKGNvbnRleHQsIFsuLi5wYXRoLCAnaXRlbXMnLCBuLmtleS52YWx1ZV0sIG4ua2V5LCBuLnZhbHVlKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChpdGVyTm9kZSBpbnN0YW5jZW9mIFlBTUxTZXEpIHtcbiAgICBpdGVyTm9kZS5pdGVtcy5mb3JFYWNoKChuLCBpKSA9PiB7XG4gICAgICBhZGRDb21tZW50cyhjb250ZXh0LCBbLi4ucGF0aCwgJ2l0ZW1zJywgaV0sIG4pO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKiBSZW5kZXIgWUFNTCBzdHJpbmcgZnJvbSB0aGUgZ2VuZXJhdGVkIHZhbHVlIGFuZCBjb250ZXh0XG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gY29udGV4dFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcmVuZGVyWUFNTCh7IHZhbHVlLCBjb250ZXh0IH0pIHtcbiAgY29uc3Qgbm9kZXMgPSB5YW1sLmNyZWF0ZU5vZGUodmFsdWUpO1xuXG4gIGFkZENvbW1lbnRzKGNvbnRleHQsIFtdLCBub2Rlcyk7XG5cbiAgY29uc3QgZG9jID0gbmV3IHlhbWwuRG9jdW1lbnQoKTtcbiAgZG9jLmNvbnRlbnRzID0gbm9kZXM7XG5cbiAgcmV0dXJuIGRvYy50b1N0cmluZygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJZQU1MO1xuIiwiaW1wb3J0IHJlbmRlckpTIGZyb20gJy4vanMnO1xuaW1wb3J0IHJlbmRlcllBTUwgZnJvbSAnLi95YW1sJztcblxuZXhwb3J0IHtcbiAgcmVuZGVySlMsXG4gIHJlbmRlcllBTUwsXG59O1xuIiwiaW1wb3J0IHsgZ2V0RGVwZW5kZW5jaWVzIH0gZnJvbSAnLi92ZW5kb3InO1xuaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL2NsYXNzL0NvbnRhaW5lcic7XG5pbXBvcnQgZm9ybWF0IGZyb20gJy4vYXBpL2Zvcm1hdCc7XG5pbXBvcnQgb3B0aW9uIGZyb20gJy4vYXBpL29wdGlvbic7XG5pbXBvcnQgZW52IGZyb20gJy4vY29yZS9jb25zdGFudHMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL2NvcmUvcmFuZG9tJztcbmltcG9ydCB1dGlscyBmcm9tICcuL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHJ1biBmcm9tICcuL2NvcmUvcnVuJztcbmltcG9ydCB7IHJlbmRlckpTLCByZW5kZXJZQU1MIH0gZnJvbSAnLi9yZW5kZXJlcnMnO1xuXG5jb25zdCBjb250YWluZXIgPSBuZXcgQ29udGFpbmVyKCk7XG5cbmZ1bmN0aW9uIHNldHVwS2V5d29yZHMoKSB7XG4gIC8vIHNhZmUgYXV0by1pbmNyZW1lbnQgdmFsdWVzXG4gIGNvbnRhaW5lci5kZWZpbmUoJ2F1dG9JbmNyZW1lbnQnLCBmdW5jdGlvbiBhdXRvSW5jcmVtZW50KHZhbHVlLCBzY2hlbWEpIHtcbiAgICBpZiAoIXRoaXMub2Zmc2V0KSB7XG4gICAgICBjb25zdCBtaW4gPSBzY2hlbWEubWluaW11bSB8fCAxO1xuICAgICAgY29uc3QgbWF4ID0gbWluICsgZW52Lk1BWF9OVU1CRVI7XG4gICAgICBjb25zdCBvZmZzZXQgPSB2YWx1ZS5pbml0aWFsT2Zmc2V0IHx8IHNjaGVtYS5pbml0aWFsT2Zmc2V0O1xuXG4gICAgICB0aGlzLm9mZnNldCA9IG9mZnNldCB8fCByYW5kb20ubnVtYmVyKG1pbiwgbWF4KTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0aGlzLm9mZnNldCsrOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfVxuXG4gICAgcmV0dXJuIHNjaGVtYTtcbiAgfSk7XG5cbiAgLy8gc2FmZS1hbmQtc2VxdWVudGlhbCBkYXRlc1xuICBjb250YWluZXIuZGVmaW5lKCdzZXF1ZW50aWFsRGF0ZScsIGZ1bmN0aW9uIHNlcXVlbnRpYWxEYXRlKHZhbHVlLCBzY2hlbWEpIHtcbiAgICBpZiAoIXRoaXMubm93KSB7XG4gICAgICB0aGlzLm5vdyA9IHJhbmRvbS5kYXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBzY2hlbWEgPSB0aGlzLm5vdy50b0lTT1N0cmluZygpO1xuICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICdkYXlzJ1xuICAgICAgICA6IHZhbHVlO1xuXG4gICAgICBpZiAoWydzZWNvbmRzJywgJ21pbnV0ZXMnLCAnaG91cnMnLCAnZGF5cycsICd3ZWVrcycsICdtb250aHMnLCAneWVhcnMnXS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBpbmNyZW1lbnQgYnkgJHt1dGlscy5zaG9ydCh2YWx1ZSl9YCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubm93LnNldFRpbWUodGhpcy5ub3cuZ2V0VGltZSgpICsgcmFuZG9tLmRhdGUodmFsdWUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2NoZW1hO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVmcyhyZWZzLCBzY2hlbWEpIHtcbiAgbGV0ICRyZWZzID0ge307XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocmVmcykpIHtcbiAgICByZWZzLmZvckVhY2goX3NjaGVtYSA9PiB7XG4gICAgICAkcmVmc1tfc2NoZW1hLiRpZCB8fCBfc2NoZW1hLmlkXSA9IF9zY2hlbWE7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgJHJlZnMgPSByZWZzIHx8IHt9O1xuICB9XG5cbiAgZnVuY3Rpb24gd2FsayhvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgcmV0dXJuO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHJldHVybiBvYmouZm9yRWFjaCh3YWxrKTtcblxuICAgIGNvbnN0IF9pZCA9IG9iai4kaWQgfHwgb2JqLmlkO1xuXG4gICAgaWYgKHR5cGVvZiBfaWQgPT09ICdzdHJpbmcnICYmICEkcmVmc1tfaWRdKSB7XG4gICAgICAkcmVmc1tfaWRdID0gb2JqO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgd2FsayhvYmpba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICB3YWxrKHJlZnMpO1xuICB3YWxrKHNjaGVtYSk7XG5cbiAgcmV0dXJuICRyZWZzO1xufVxuXG5jb25zdCBqc2YgPSAoc2NoZW1hLCByZWZzLCBjd2QpID0+IHtcbiAgY29uc29sZS5sb2coJ1tqc29uLXNjaGVtYS1mYWtlcl0gY2FsbGluZyBKc29uU2NoZW1hRmFrZXIoKSBpcyBkZXByZWNhdGVkLCBjYWxsIGVpdGhlciAuZ2VuZXJhdGUoKSBvciAucmVzb2x2ZSgpJyk7XG5cbiAgaWYgKGN3ZCkge1xuICAgIGNvbnNvbGUubG9nKCdbanNvbi1zY2hlbWEtZmFrZXJdIHJlZmVyZW5jZXMgYXJlIG9ubHkgc3VwcG9ydGVkIGJ5IGNhbGxpbmcgLnJlc29sdmUoKScpO1xuICB9XG5cbiAgcmV0dXJuIGpzZi5nZW5lcmF0ZShzY2hlbWEsIHJlZnMpO1xufTtcblxuanNmLmdlbmVyYXRlV2l0aENvbnRleHQgPSAoc2NoZW1hLCByZWZzKSA9PiB7XG4gIGNvbnN0ICRyZWZzID0gZ2V0UmVmcyhyZWZzLCBzY2hlbWEpO1xuXG4gIHJldHVybiBydW4oJHJlZnMsIHNjaGVtYSwgY29udGFpbmVyLCB0cnVlKTtcbn07XG5cbmpzZi5nZW5lcmF0ZSA9IChzY2hlbWEsIHJlZnMpID0+IHJlbmRlckpTKFxuICAgIGpzZi5nZW5lcmF0ZVdpdGhDb250ZXh0KHNjaGVtYSwgcmVmcyksXG4gICk7XG5cbmpzZi5nZW5lcmF0ZVlBTUwgPSAoc2NoZW1hLCByZWZzKSA9PiByZW5kZXJZQU1MKFxuICAgIGpzZi5nZW5lcmF0ZVdpdGhDb250ZXh0KHNjaGVtYSwgcmVmcyksXG4gICk7XG5cbmpzZi5yZXNvbHZlV2l0aENvbnRleHQgPSAoc2NoZW1hLCByZWZzLCBjd2QpID0+IHtcbiAgaWYgKHR5cGVvZiByZWZzID09PSAnc3RyaW5nJykge1xuICAgIGN3ZCA9IHJlZnM7XG4gICAgcmVmcyA9IHt9O1xuICB9XG5cbiAgLy8gbm9ybWFsaXplIGJhc2VkaXIgKGJyb3dzZXIgYXdhcmUpXG4gIGN3ZCA9IGN3ZCB8fCAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnID8gcHJvY2Vzcy5jd2QoKSA6ICcnKTtcbiAgY3dkID0gYCR7Y3dkLnJlcGxhY2UoL1xcLyskLywgJycpfS9gO1xuXG4gIGNvbnN0ICRyZWZzID0gZ2V0UmVmcyhyZWZzLCBzY2hlbWEpO1xuXG4gIC8vIGlkZW50aWNhbCBzZXR1cCBhcyBqc29uLXNjaGVtYS1zZXF1ZWxpemVyXG4gIGNvbnN0IGZpeGVkUmVmcyA9IHtcbiAgICBvcmRlcjogMSxcbiAgICBjYW5SZWFkKGZpbGUpIHtcbiAgICAgIGNvbnN0IGtleSA9IGZpbGUudXJsLnJlcGxhY2UoJy86JywgJzonKTtcblxuICAgICAgcmV0dXJuICRyZWZzW2tleV0gfHwgJHJlZnNba2V5LnNwbGl0KCcvJykucG9wKCldO1xuICAgIH0sXG4gICAgcmVhZChmaWxlLCBjYWxsYmFjaykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgdGhpcy5jYW5SZWFkKGZpbGUpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FsbGJhY2soZSk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICBjb25zdCB7ICRSZWZQYXJzZXIgfSA9IGdldERlcGVuZGVuY2llcygpO1xuXG4gIHJldHVybiAkUmVmUGFyc2VyXG4gICAgLmJ1bmRsZShjd2QsIHNjaGVtYSwge1xuICAgICAgcmVzb2x2ZToge1xuICAgICAgICBmaWxlOiB7IG9yZGVyOiAxMDAgfSxcbiAgICAgICAgaHR0cDogeyBvcmRlcjogMjAwIH0sXG4gICAgICAgIGZpeGVkUmVmcyxcbiAgICAgIH0sXG4gICAgICBkZXJlZmVyZW5jZToge1xuICAgICAgICBjaXJjdWxhcjogJ2lnbm9yZScsXG4gICAgICB9LFxuICAgIH0pLnRoZW4oc3ViID0+IHJ1bigkcmVmcywgc3ViLCBjb250YWluZXIpKVxuICAgIC5jYXRjaChlID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2hpbGUgcmVzb2x2aW5nIHNjaGVtYSAoJHtlLm1lc3NhZ2V9KWApO1xuICAgIH0pO1xufTtcblxuanNmLnJlc29sdmUgPSAoc2NoZW1hLCByZWZzLCBjd2QpID0+IGpzZi5yZXNvbHZlV2l0aENvbnRleHQoc2NoZW1hLCByZWZzLCBjd2QpLnRoZW4ocmVuZGVySlMpO1xuXG5qc2YucmVzb2x2ZVlBTUwgPSAoc2NoZW1hLCByZWZzLCBjd2QpID0+IGpzZi5yZXNvbHZlV2l0aENvbnRleHQoc2NoZW1hLCByZWZzLCBjd2QpLnRoZW4ocmVuZGVyWUFNTCk7XG5cbnNldHVwS2V5d29yZHMoKTtcblxuanNmLmZvcm1hdCA9IGZvcm1hdDtcbmpzZi5vcHRpb24gPSBvcHRpb247XG5qc2YucmFuZG9tID0gcmFuZG9tO1xuXG4vLyByZXR1cm5zIGl0c2VsZiBmb3IgY2hhaW5pbmdcbmpzZi5leHRlbmQgPSAobmFtZSwgY2IpID0+IHtcbiAgY29udGFpbmVyLmV4dGVuZChuYW1lLCBjYik7XG4gIHJldHVybiBqc2Y7XG59O1xuXG5qc2YuZGVmaW5lID0gKG5hbWUsIGNiKSA9PiB7XG4gIGNvbnRhaW5lci5kZWZpbmUobmFtZSwgY2IpO1xuICByZXR1cm4ganNmO1xufTtcblxuanNmLnJlc2V0ID0gbmFtZSA9PiB7XG4gIGNvbnRhaW5lci5yZXNldChuYW1lKTtcbiAgc2V0dXBLZXl3b3JkcygpO1xuICByZXR1cm4ganNmO1xufTtcblxuanNmLmxvY2F0ZSA9IG5hbWUgPT4ge1xuICByZXR1cm4gY29udGFpbmVyLmdldChuYW1lKTtcbn07XG5cbnZhciBWRVJTSU9OPVwiMC41LjAtcmN2LjM1XCI7XG5pZiAodHlwZW9mIFZFUlNJT04gIT09ICd1bmRlZmluZWQnKSB7XG4gIGpzZi5WRVJTSU9OID0gVkVSU0lPTjtcbn1cblxuZXhwb3J0IGRlZmF1bHQganNmO1xuIiwiLyoqXG4gLS0tXG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgXG4gICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAtLS1cbiAqL1xuXG5jb25zdCB7IHNldERlcGVuZGVuY2llcyB9ID0gcmVxdWlyZSgnLi9saWIvdmVuZG9yJyk7XG5jb25zdCBKU09OU2NoZW1hRmFrZXIgPSByZXF1aXJlKCcuL2xpYicpO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgc2V0RGVwZW5kZW5jaWVzKHtcbiAgICAuLi53aW5kb3cuSlNPTlBhdGgsXG4gICAgJFJlZlBhcnNlcjogd2luZG93LiRSZWZQYXJzZXIsXG4gIH0pO1xuXG4gIHdpbmRvdy5KU09OU2NoZW1hRmFrZXIgPSBKU09OU2NoZW1hRmFrZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSlNPTlNjaGVtYUZha2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztVQUFNLGVBQWU7QUFFZCxVQUFNLGtCQUFrQixNQUFNO0FBQ25DLGVBQU87O0FBR0YsVUFBTSxrQkFBa0IsQ0FBQSxVQUFTO0FBQ3RDLGVBQU8sT0FBTyxjQUFjOzs7Ozs7O0FDSjlCOzsyQkFBZTtRQUNiLGNBQWM7QUFFWixlQUFLLE9BQU87O1FBT2QsV0FBVyxNQUFNO0FBQ2YsY0FBSSxDQUFDLE1BQU07QUFDVCxpQkFBSyxPQUFPO2lCQUNQO0FBQ0wsbUJBQU8sS0FB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
