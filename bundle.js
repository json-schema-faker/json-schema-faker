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
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/lib/vendor.mjs
  var vendor_exports = {};
  __export(vendor_exports, {
    getDependencies: () => getDependencies,
    setDependencies: () => setDependencies
  });
  var DEPENDENCIES, getDependencies, setDependencies;
  var init_vendor = __esm({
    "src/lib/vendor.mjs"() {
      DEPENDENCIES = {};
      getDependencies = () => {
        return DEPENDENCIES;
      };
      setDependencies = (value) => {
        Object.assign(DEPENDENCIES, value);
      };
    }
  });

  // src/lib/class/Registry.mjs
  var Registry, Registry_default;
  var init_Registry = __esm({
    "src/lib/class/Registry.mjs"() {
      Registry = class {
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
      Registry_default = Registry;
    }
  });

  // src/lib/api/defaults.mjs
  var defaults, defaults_default;
  var init_defaults = __esm({
    "src/lib/api/defaults.mjs"() {
      defaults = {};
      defaults_default = defaults;
      defaults.defaultInvalidTypeProduct = void 0;
      defaults.defaultRandExpMax = 10;
      defaults.pruneProperties = [];
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
      defaults.omitNulls = false;
      defaults.minItems = 0;
      defaults.maxItems = null;
      defaults.minLength = 0;
      defaults.maxLength = null;
      defaults.resolveJsonPath = false;
      defaults.reuseProperties = false;
      defaults.fillProperties = true;
      defaults.sortProperties = null;
      defaults.replaceEmptyByRandomValue = false;
      defaults.random = Math.random;
      defaults.renderTitle = true;
      defaults.renderDescription = true;
      defaults.renderComment = false;
    }
  });

  // src/lib/class/OptionRegistry.mjs
  var OptionRegistry, OptionRegistry_default;
  var init_OptionRegistry = __esm({
    "src/lib/class/OptionRegistry.mjs"() {
      init_Registry();
      init_defaults();
      OptionRegistry = class extends Registry_default {
        constructor() {
          super();
          this.data = { ...defaults_default };
          this._defaults = defaults_default;
        }
        get defaults() {
          return { ...this._defaults };
        }
      };
      OptionRegistry_default = OptionRegistry;
    }
  });

  // src/lib/api/option.mjs
  function optionAPI(nameOrOptionMap, optionalValue) {
    if (typeof nameOrOptionMap === "string") {
      if (typeof optionalValue !== "undefined") {
        return registry.register(nameOrOptionMap, optionalValue);
      }
      return registry.get(nameOrOptionMap);
    }
    return registry.registerMany(nameOrOptionMap);
  }
  var registry, option_default;
  var init_option = __esm({
    "src/lib/api/option.mjs"() {
      init_OptionRegistry();
      registry = new OptionRegistry_default();
      optionAPI.getDefaults = () => registry.defaults;
      option_default = optionAPI;
    }
  });

  // src/lib/core/constants.mjs
  var ALLOWED_TYPES, SCALAR_TYPES, ALL_TYPES, MOST_NEAR_DATETIME, MIN_INTEGER, MAX_INTEGER, MIN_NUMBER, MAX_NUMBER, constants_default;
  var init_constants = __esm({
    "src/lib/core/constants.mjs"() {
      ALLOWED_TYPES = ["integer", "number", "string", "boolean"];
      SCALAR_TYPES = ALLOWED_TYPES.concat(["null"]);
      ALL_TYPES = ["array", "object"].concat(SCALAR_TYPES);
      MOST_NEAR_DATETIME = 2524608e6;
      MIN_INTEGER = -1e8;
      MAX_INTEGER = 1e8;
      MIN_NUMBER = -100;
      MAX_NUMBER = 100;
      constants_default = {
        ALLOWED_TYPES,
        SCALAR_TYPES,
        ALL_TYPES,
        MIN_NUMBER,
        MAX_NUMBER,
        MIN_INTEGER,
        MAX_INTEGER,
        MOST_NEAR_DATETIME
      };
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
      var types2 = require_types();
      var INTS = () => [{ type: types2.RANGE, from: 48, to: 57 }];
      var WORDS = () => {
        return [
          { type: types2.CHAR, value: 95 },
          { type: types2.RANGE, from: 97, to: 122 },
          { type: types2.RANGE, from: 65, to: 90 }
        ].concat(INTS());
      };
      var WHITESPACE = () => {
        return [
          { type: types2.CHAR, value: 9 },
          { type: types2.CHAR, value: 10 },
          { type: types2.CHAR, value: 11 },
          { type: types2.CHAR, value: 12 },
          { type: types2.CHAR, value: 13 },
          { type: types2.CHAR, value: 32 },
          { type: types2.CHAR, value: 160 },
          { type: types2.CHAR, value: 5760 },
          { type: types2.RANGE, from: 8192, to: 8202 },
          { type: types2.CHAR, value: 8232 },
          { type: types2.CHAR, value: 8233 },
          { type: types2.CHAR, value: 8239 },
          { type: types2.CHAR, value: 8287 },
          { type: types2.CHAR, value: 12288 },
          { type: types2.CHAR, value: 65279 }
        ];
      };
      var NOTANYCHAR = () => {
        return [
          { type: types2.CHAR, value: 10 },
          { type: types2.CHAR, value: 13 },
          { type: types2.CHAR, value: 8232 },
          { type: types2.CHAR, value: 8233 }
        ];
      };
      exports.words = () => ({ type: types2.SET, set: WORDS(), not: false });
      exports.notWords = () => ({ type: types2.SET, set: WORDS(), not: true });
      exports.ints = () => ({ type: types2.SET, set: INTS(), not: false });
      exports.notInts = () => ({ type: types2.SET, set: INTS(), not: true });
      exports.whitespace = () => ({ type: types2.SET, set: WHITESPACE(), not: false });
      exports.notWhitespace = () => ({ type: types2.SET, set: WHITESPACE(), not: true });
      exports.anyChar = () => ({ type: types2.SET, set: NOTANYCHAR(), not: true });
    }
  });

  // node_modules/ret/lib/util.js
  var require_util = __commonJS({
    "node_modules/ret/lib/util.js"(exports) {
      var types2 = require_types();
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
              type: types2.RANGE,
              from: (rs[8] || rs[9]).charCodeAt(0),
              to: rs[10].charCodeAt(0)
            });
          } else if (c = rs[12]) {
            tokens.push({
              type: types2.CHAR,
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
      var types2 = require_types();
      exports.wordBoundary = () => ({ type: types2.POSITION, value: "b" });
      exports.nonWordBoundary = () => ({ type: types2.POSITION, value: "B" });
      exports.begin = () => ({ type: types2.POSITION, value: "^" });
      exports.end = () => ({ type: types2.POSITION, value: "$" });
    }
  });

  // node_modules/ret/lib/index.js
  var require_lib = __commonJS({
    "node_modules/ret/lib/index.js"(exports, module) {
      var util = require_util();
      var types2 = require_types();
      var sets = require_sets();
      var positions = require_positions();
      module.exports = (regexpStr) => {
        var i = 0, l, c, start = { type: types2.ROOT, stack: [] }, lastGroup = start, last = start.stack, groupStack = [];
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
                    last.push({ type: types2.REFERENCE, value: parseInt(c, 10) });
                  } else {
                    last.push({ type: types2.CHAR, value: c.charCodeAt(0) });
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
                type: types2.SET,
                set: classTokens[0],
                not
              });
              break;
            case ".":
              last.push(sets.anyChar());
              break;
            case "(":
              var group = {
                type: types2.GROUP,
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
                  util.error(
                    regexpStr,
                    `Invalid group, character '${c}' after '?' at column ${i - 1}`
                  );
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
                  type: types2.REPETITION,
                  min,
                  max,
                  value: last.pop()
                });
              } else {
                last.push({
                  type: types2.CHAR,
                  value: 123
                });
              }
              break;
            case "?":
              if (last.length === 0) {
                repeatErr(i);
              }
              last.push({
                type: types2.REPETITION,
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
                type: types2.REPETITION,
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
                type: types2.REPETITION,
                min: 0,
                max: Infinity,
                value: last.pop()
              });
              break;
            default:
              last.push({
                type: types2.CHAR,
                value: c.charCodeAt(0)
              });
          }
        }
        if (groupStack.length !== 0) {
          util.error(regexpStr, "Unterminated group");
        }
        return start;
      };
      module.exports.types = types2;
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
          return new SubRange(
            Math.min(this.low, range.low),
            Math.max(this.high, range.high)
          );
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
      var types2 = ret.types;
      module.exports = class RandExp2 {
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
          this.max = regexp.max != null ? regexp.max : RandExp2.prototype.max != null ? RandExp2.prototype.max : 100;
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
            case types2.ROOT:
            case types2.GROUP:
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
            case types2.POSITION:
              return "";
            case types2.SET:
              var expandedSet = this._expand(token);
              if (!expandedSet.length) {
                return "";
              }
              return String.fromCharCode(this._randSelect(expandedSet));
            case types2.REPETITION:
              n = this.randInt(
                token.min,
                token.max === Infinity ? token.min + this.max : token.max
              );
              str = "";
              for (i = 0; i < n; i++) {
                str += this._gen(token.value, groups);
              }
              return str;
            case types2.REFERENCE:
              return groups[token.value - 1] || "";
            case types2.CHAR:
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
            randexp = new RandExp2(regexp, m);
            regexp._randexp = randexp;
          } else {
            randexp = regexp._randexp;
            randexp._setDefaults(regexp);
          }
          return randexp.gen();
        }
        static sugar() {
          RegExp.prototype.gen = function() {
            return RandExp2.randexp(this);
          };
        }
      };
    }
  });

  // src/lib/core/random.mjs
  function getRandomInteger(min, max) {
    min = typeof min === "undefined" ? constants_default.MIN_INTEGER : min;
    max = typeof max === "undefined" ? constants_default.MAX_INTEGER : max;
    return Math.floor(option_default("random")() * (max - min + 1)) + min;
  }
  function _randexp(value) {
    import_randexp.default.prototype.max = option_default("defaultRandExpMax");
    import_randexp.default.prototype.randInt = (a, b) => a + Math.floor(option_default("random")() * (1 + (b - a)));
    const re = new import_randexp.default(value);
    return re.gen();
  }
  function pick(collection) {
    return collection[Math.floor(option_default("random")() * collection.length)];
  }
  function shuffle(collection) {
    let tmp;
    let key;
    let length = collection.length;
    const copy = collection.slice();
    for (; length > 0; ) {
      key = Math.floor(option_default("random")() * length);
      length -= 1;
      tmp = copy[length];
      copy[length] = copy[key];
      copy[key] = tmp;
    }
    return copy;
  }
  function getRandom(min, max) {
    return option_default("random")() * (max - min) + min;
  }
  function number(min, max, defMin, defMax, hasPrecision = false) {
    defMin = typeof defMin === "undefined" ? constants_default.MIN_NUMBER : defMin;
    defMax = typeof defMax === "undefined" ? constants_default.MAX_NUMBER : defMax;
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
    const days = number(-1e3, constants_default.MOST_NEAR_DATETIME);
    now.setTime(now.getTime() - days);
    return now;
  }
  var import_randexp, random_default;
  var init_random = __esm({
    "src/lib/core/random.mjs"() {
      import_randexp = __toESM(require_randexp(), 1);
      init_option();
      init_constants();
      random_default = {
        pick,
        date,
        shuffle,
        number,
        randexp: _randexp
      };
    }
  });

  // src/lib/core/utils.mjs
  function getLocalRef(obj, path, refs) {
    path = decodeURIComponent(path);
    if (refs && refs[path])
      return clone(refs[path]);
    const keyElements = path.replace("#/", "/").split("/");
    let schema = obj.$ref && refs && refs[obj.$ref] || obj;
    if (!schema && !keyElements[0]) {
      keyElements[0] = obj.$ref.split("#/")[0];
    }
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
  function isNumeric(value) {
    return typeof value === "string" && RE_NUMERIC.test(value);
  }
  function isScalar(value) {
    return ["number", "boolean"].includes(typeof value);
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
    month = `0${Math.max(1, Math.min(12, month))}`.slice(-2);
    day = `0${Math.max(1, Math.min(31, day))}`.slice(-2);
    return `${year}-${month}-${day}`;
  }
  function clampDateTime(value) {
    if (value.includes(" ")) {
      return new Date(value).toISOString().substr(0, 10);
    }
    let [year, month, day] = value.split("T")[0].split("-");
    let [hour, minute, second] = value.split("T")[1].split(".")[0].split(":");
    month = `0${Math.max(1, Math.min(12, month))}`.slice(-2);
    day = `0${Math.max(1, Math.min(31, day))}`.slice(-2);
    hour = `0${Math.max(1, Math.min(23, hour))}`.slice(-2);
    minute = `0${Math.max(1, Math.min(59, minute))}`.slice(-2);
    second = `0${Math.max(1, Math.min(59, second))}`.slice(-2);
    return `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`;
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
        params.minLength = option_default("minLength") || 0;
        params.maxLength = option_default("maxLength") || Number.MAX_SAFE_INTEGER;
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
        value = isNumeric(value) ? parseFloat(value) : value;
        break;
      case "integer":
        value = isNumeric(value) ? parseInt(value, 10) : value;
        break;
      case "boolean":
        value = !!value;
        break;
      case "string": {
        if (isScalar(value)) {
          return value;
        }
        value = String(value);
        const min = Math.max(params.minLength || 0, 0);
        const max = Math.min(params.maxLength || Infinity, Infinity);
        let prev;
        let noChangeCount = 0;
        while (value.length < min) {
          prev = value;
          if (!schema.pattern) {
            value += `${random_default.pick([" ", "/", "_", "-", "+", "=", "@", "^"])}${value}`;
          } else {
            value += random_default.randexp(schema.pattern);
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
            value = new Date(clampDateTime(value)).toISOString().replace(/([0-9])0+Z$/, "$1Z");
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
        b[key].forEach((value, i) => {
          if (a.type === "array" && b.type === "array") {
            a[key][i] = merge(a[key][i] || {}, value, true);
          } else if (Array.isArray(a[key]) && a[key].indexOf(value) === -1) {
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
  function clone(obj, cache = /* @__PURE__ */ new Map()) {
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
    return random_default.pick([
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
  function hasValue(schema, value) {
    if (schema.enum)
      return schema.enum.includes(value);
    if (schema.const)
      return schema.const === value;
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
      copy.type = random_default.pick(constants_default.SCALAR_TYPES.filter((x) => {
        const types2 = Array.isArray(schema.type) ? schema.type : [schema.type];
        return types2.every((type) => {
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
  var RE_NUMERIC, utils_default;
  var init_utils = __esm({
    "src/lib/core/utils.mjs"() {
      init_option();
      init_constants();
      init_random();
      RE_NUMERIC = /^(0|[1-9][0-9]*)$/;
      utils_default = {
        hasProperties,
        getLocalRef,
        omitProps,
        typecast,
        merge,
        clone,
        short,
        hasValue,
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
    }
  });

  // src/lib/class/Container.mjs
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
        value = value.apply(ctx, args.map((x) => utils_default.template(x, rootSchema)));
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
  var Container, Container_default;
  var init_Container = __esm({
    "src/lib/class/Container.mjs"() {
      init_utils();
      Container = class {
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
      Container_default = Container;
    }
  });

  // src/lib/api/format.mjs
  function formatAPI(nameOrFormatMap, callback) {
    if (typeof nameOrFormatMap === "undefined") {
      return registry2.list();
    }
    if (typeof nameOrFormatMap === "string") {
      if (typeof callback === "function") {
        registry2.register(nameOrFormatMap, callback);
      } else if (callback === null || callback === false) {
        registry2.unregister(nameOrFormatMap);
      } else {
        return registry2.get(nameOrFormatMap);
      }
    } else {
      registry2.registerMany(nameOrFormatMap);
    }
  }
  var registry2, format_default;
  var init_format = __esm({
    "src/lib/api/format.mjs"() {
      init_Registry();
      registry2 = new Registry_default();
      format_default = formatAPI;
    }
  });

  // src/lib/core/error.mjs
  var ParseError, error_default;
  var init_error = __esm({
    "src/lib/core/error.mjs"() {
      ParseError = class extends Error {
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
      error_default = ParseError;
    }
  });

  // src/lib/core/infer.mjs
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
  var inferredProperties, subschemaProperties, infer_default;
  var init_infer = __esm({
    "src/lib/core/infer.mjs"() {
      inferredProperties = {
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
      subschemaProperties = [
        "additionalItems",
        "items",
        "additionalProperties",
        "dependencies",
        "patternProperties",
        "properties"
      ];
      infer_default = inferType;
    }
  });

  // src/lib/generators/boolean.mjs
  function booleanGenerator() {
    return option_default("random")() > 0.5;
  }
  var boolean_default;
  var init_boolean = __esm({
    "src/lib/generators/boolean.mjs"() {
      init_option();
      boolean_default = booleanGenerator;
    }
  });

  // src/lib/types/boolean.mjs
  var booleanType, boolean_default2;
  var init_boolean2 = __esm({
    "src/lib/types/boolean.mjs"() {
      init_boolean();
      booleanType = boolean_default;
      boolean_default2 = booleanType;
    }
  });

  // src/lib/generators/null.mjs
  function nullGenerator() {
    return null;
  }
  var null_default;
  var init_null = __esm({
    "src/lib/generators/null.mjs"() {
      null_default = nullGenerator;
    }
  });

  // src/lib/types/null.mjs
  var nullType, null_default2;
  var init_null2 = __esm({
    "src/lib/types/null.mjs"() {
      init_null();
      nullType = null_default;
      null_default2 = nullType;
    }
  });

  // src/lib/types/array.mjs
  function unique(path, items, value, sample, resolve2, traverseCallback) {
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
      if (!walk(traverseCallback(value.items || sample, path, resolve2))) {
        limit -= 1;
      }
      if (!limit) {
        break;
      }
    }
    return tmp;
  }
  function arrayType(value, path, resolve2, traverseCallback) {
    const items = [];
    if (!(value.items || value.additionalItems)) {
      if (utils_default.hasProperties(value, "minItems", "maxItems", "uniqueItems")) {
        throw new error_default(`missing items for ${utils_default.short(value)}`, path);
      }
      return items;
    }
    if (Array.isArray(value.items)) {
      return value.items.map((item, key) => {
        const itemSubpath = path.concat(["items", key]);
        return traverseCallback(item, itemSubpath, resolve2);
      });
    }
    let minItems = value.minItems;
    let maxItems = value.maxItems;
    const defaultMinItems = option_default("minItems");
    const defaultMaxItems = option_default("maxItems");
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
    const optionalsProbability = option_default("alwaysFakeOptionals") === true ? 1 : option_default("optionalsProbability");
    const fixedProbabilities = option_default("alwaysFakeOptionals") || option_default("fixedProbabilities") || false;
    let length = random_default.number(minItems, maxItems, 1, 5);
    if (optionalsProbability !== null) {
      length = Math.max(fixedProbabilities ? Math.round((maxItems || length) * optionalsProbability) : Math.abs(random_default.number(minItems, maxItems) * optionalsProbability), minItems || 0);
    }
    const sample = typeof value.additionalItems === "object" ? value.additionalItems : {};
    for (let current = items.length; current < length; current += 1) {
      const itemSubpath = path.concat(["items", current]);
      const element = traverseCallback(value.items || sample, itemSubpath, resolve2);
      items.push(element);
    }
    if (value.contains && length > 0) {
      const idx = random_default.number(0, length - 1);
      items[idx] = traverseCallback(value.contains, path.concat(["items", idx]), resolve2);
    }
    if (value.uniqueItems) {
      return unique(path.concat(["items"]), items, value, sample, resolve2, traverseCallback);
    }
    return items;
  }
  var array_default;
  var init_array = __esm({
    "src/lib/types/array.mjs"() {
      init_random();
      init_utils();
      init_error();
      init_option();
      array_default = arrayType;
    }
  });

  // src/lib/types/number.mjs
  function numberType(value) {
    let min = typeof value.minimum === "undefined" || value.minimum === -Number.MAX_VALUE ? constants_default.MIN_INTEGER : value.minimum;
    let max = typeof value.maximum === "undefined" || value.maximum === Number.MAX_VALUE ? constants_default.MAX_INTEGER : value.maximum;
    const multipleOf = value.multipleOf;
    const decimals = multipleOf && String(multipleOf).match(/e-(\d)|\.(\d+)$/);
    if (decimals) {
      const number2 = (Math.random() * random_default.number(0, 10) + 1) * multipleOf;
      const truncate = decimals[1] || decimals[2].length;
      const result = parseFloat(number2.toFixed(truncate));
      const base = random_default.number(min, max - 1);
      if (!String(result).includes(".")) {
        return (base + result).toExponential();
      }
      return base + result;
    }
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
      let base = random_default.number(Math.floor(min / multipleOf), Math.floor(max / multipleOf)) * multipleOf;
      while (base < min) {
        base += multipleOf;
      }
      return base;
    }
    return random_default.number(min, max, void 0, void 0, true);
  }
  var number_default;
  var init_number = __esm({
    "src/lib/types/number.mjs"() {
      init_random();
      init_constants();
      number_default = numberType;
    }
  });

  // src/lib/types/integer.mjs
  function integerType(value) {
    return Math.floor(number_default({ ...value }));
  }
  var integer_default;
  var init_integer = __esm({
    "src/lib/types/integer.mjs"() {
      init_number();
      integer_default = integerType;
    }
  });

  // src/lib/generators/words.mjs
  function wordsGenerator(length) {
    const words = random_default.shuffle(LIPSUM_WORDS);
    return words.slice(0, length);
  }
  var LIPSUM_WORDS, words_default;
  var init_words = __esm({
    "src/lib/generators/words.mjs"() {
      init_random();
      LIPSUM_WORDS = `Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore
et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est
laborum`.split(/\W/);
      words_default = wordsGenerator;
    }
  });

  // src/lib/types/object.mjs
  function objectType(value, path, resolve2, traverseCallback) {
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
    if (!allowsAdditional && propertyKeys.length === 0 && patternPropertyKeys.length === 0 && utils_default.hasProperties(value, "minProperties", "maxProperties", "dependencies", "required")) {
      return null;
    }
    if (option_default("requiredOnly") === true) {
      requiredProperties.forEach((key) => {
        if (properties[key]) {
          props[key] = properties[key];
        }
      });
      return traverseCallback(props, path.concat(["properties"]), resolve2, value);
    }
    const optionalsProbability = option_default("alwaysFakeOptionals") === true ? 1 : option_default("optionalsProbability");
    const fixedProbabilities = option_default("alwaysFakeOptionals") || option_default("fixedProbabilities") || false;
    const ignoreProperties = option_default("ignoreProperties") || [];
    const reuseProps = option_default("reuseProperties");
    const fillProps = option_default("fillProperties");
    const max = value.maxProperties || allProperties.length + (allowsAdditional ? random_default.number(1, 5) : 0);
    let min = Math.max(value.minProperties || 0, requiredProperties.length);
    let neededExtras = Math.max(0, allProperties.length - min);
    if (allProperties.length === 1 && !requiredProperties.length) {
      min = Math.max(random_default.number(fillProps ? 1 : 0, max), min);
    }
    if (optionalsProbability !== null) {
      if (fixedProbabilities === true) {
        neededExtras = Math.round(min - requiredProperties.length + optionalsProbability * (allProperties.length - min));
      } else {
        neededExtras = random_default.number(min - requiredProperties.length, optionalsProbability * (allProperties.length - min));
      }
    }
    const extraPropertiesRandomOrder = random_default.shuffle(optionalProperties).slice(0, neededExtras);
    const extraProperties = optionalProperties.filter((_item) => {
      return extraPropertiesRandomOrder.indexOf(_item) !== -1;
    });
    const _limit = optionalsProbability !== null || requiredProperties.length === max ? max : random_default.number(0, max);
    const _props = requiredProperties.concat(random_default.shuffle(extraProperties).slice(0, _limit)).slice(0, max);
    const _defns = [];
    const _deps = [];
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
          } else if (Array.isArray(_required.oneOf || _required.anyOf)) {
            const values = _required.oneOf || _required.anyOf;
            _deps.push({ prop, values });
          } else {
            _defns.push(_required);
          }
        }
      });
      if (_defns.length) {
        delete value.dependencies;
        return traverseCallback({
          allOf: _defns.concat(value)
        }, path.concat(["properties"]), resolve2, value);
      }
    }
    const skipped = [];
    const missing = [];
    _props.forEach((key) => {
      if (properties[key] && ["{}", "true"].includes(JSON.stringify(properties[key].not))) {
        return;
      }
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
            utils_default.merge(props[key], patternProperties[_key]);
          } else {
            props[random_default.randexp(key)] = patternProperties[_key];
          }
        }
      });
      if (!found) {
        const subschema = patternProperties[key] || additionalProperties;
        if (subschema && additionalProperties !== false) {
          props[patternProperties[key] ? random_default.randexp(key) : key] = properties[key] || subschema;
        } else {
          missing.push(key);
        }
      }
    });
    let current = Object.keys(props).length + (fillProps ? 0 : skipped.length);
    const hash = (suffix) => random_default.randexp(`_?[_a-f\\d]{1,3}${suffix ? "\\$?" : ""}`);
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
      minProps = Math.max(optionalsProbability === null || additionalProperties ? random_default.number(fillProps ? 1 : 0, max) : 0, min);
    }
    if (!extraProperties.length && !neededExtras && allowsAdditional && fixedProbabilities === true) {
      const limit = random_default.number(0, max);
      for (let i = 0; i <= limit; i += 1) {
        props[words_default(1) + hash(limit[i])] = anyType;
      }
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
            key = get(requiredProperties) || random_default.pick(propertyKeys);
          } while (typeof props[key] !== "undefined");
          if (typeof props[key] === "undefined") {
            props[key] = properties[key];
            current += 1;
          }
        } else if (patternPropertyKeys.length && !additionalProperties) {
          const prop = random_default.pick(patternPropertyKeys);
          const word = random_default.randexp(prop);
          if (!props[word]) {
            props[word] = patternProperties[prop];
            current += 1;
          }
        } else {
          const word = get(requiredProperties) || words_default(1) + hash();
          if (!props[word]) {
            props[word] = additionalProperties || anyType;
            current += 1;
          }
        }
      }
      for (let i = 0; current < min && i < patternPropertyKeys.length; i += 1) {
        const _key = patternPropertyKeys[i];
        const word = random_default.randexp(_key);
        if (!props[word]) {
          props[word] = patternProperties[_key];
          current += 1;
        }
      }
    }
    if (requiredProperties.length === 0 && (!allowsAdditional || optionalsProbability === false)) {
      const maximum = random_default.number(min, max);
      for (; current < maximum; ) {
        const word = get(propertyKeys);
        if (word) {
          props[word] = properties[word];
        }
        current += 1;
      }
    }
    let sortedObj = props;
    if (option_default("sortProperties") !== null) {
      const originalKeys = Object.keys(properties);
      const sortedKeys = Object.keys(props).sort((a, b) => {
        return option_default("sortProperties") ? a.localeCompare(b) : originalKeys.indexOf(b) - originalKeys.indexOf(a);
      });
      sortedObj = sortedKeys.reduce((memo, key) => {
        memo[key] = props[key];
        return memo;
      }, {});
    }
    const result = traverseCallback(sortedObj, path.concat(["properties"]), resolve2, value);
    _deps.forEach((dep) => {
      for (const sub of dep.values) {
        if (utils_default.hasValue(sub.properties[dep.prop], result.value[dep.prop])) {
          Object.keys(sub.properties).forEach((next) => {
            if (next !== dep.prop) {
              utils_default.merge(result.value, traverseCallback(sub.properties, path.concat(["properties"]), resolve2, value).value);
            }
          });
          break;
        }
      }
    });
    return result;
  }
  var anyType, object_default;
  var init_object = __esm({
    "src/lib/types/object.mjs"() {
      init_constants();
      init_random();
      init_words();
      init_utils();
      init_option();
      anyType = { type: constants_default.ALLOWED_TYPES };
      object_default = objectType;
    }
  });

  // src/lib/generators/thunk.mjs
  function produce() {
    const length = random_default.number(1, 5);
    return words_default(length).join(" ");
  }
  function thunkGenerator(min = 0, max = 140) {
    const _min = Math.max(0, min);
    const _max = random_default.number(_min, max);
    let result = produce();
    while (result.length < _min) {
      result += produce();
    }
    if (result.length > _max) {
      result = result.substr(0, _max);
    }
    return result;
  }
  var thunk_default;
  var init_thunk = __esm({
    "src/lib/generators/thunk.mjs"() {
      init_words();
      init_random();
      thunk_default = thunkGenerator;
    }
  });

  // src/lib/generators/ipv4.mjs
  function ipv4Generator() {
    return [0, 0, 0, 0].map(() => {
      return random_default.number(0, 255);
    }).join(".");
  }
  var ipv4_default;
  var init_ipv4 = __esm({
    "src/lib/generators/ipv4.mjs"() {
      init_random();
      ipv4_default = ipv4Generator;
    }
  });

  // src/lib/generators/dateTime.mjs
  function dateTimeGenerator() {
    return random_default.date().toISOString();
  }
  var dateTime_default;
  var init_dateTime = __esm({
    "src/lib/generators/dateTime.mjs"() {
      init_random();
      dateTime_default = dateTimeGenerator;
    }
  });

  // src/lib/generators/date.mjs
  function dateGenerator() {
    return dateTime_default().slice(0, 10);
  }
  var date_default;
  var init_date = __esm({
    "src/lib/generators/date.mjs"() {
      init_dateTime();
      date_default = dateGenerator;
    }
  });

  // src/lib/generators/time.mjs
  function timeGenerator() {
    return dateTime_default().slice(11);
  }
  var time_default;
  var init_time = __esm({
    "src/lib/generators/time.mjs"() {
      init_dateTime();
      time_default = timeGenerator;
    }
  });

  // src/lib/generators/coreFormat.mjs
  function coreFormatGenerator(coreFormat) {
    return random_default.randexp(regexps[coreFormat]).replace(ALLOWED_FORMATS, (match, key) => {
      return random_default.randexp(regexps[key]);
    });
  }
  var FRAGMENT, URI_PATTERN, PARAM_PATTERN, regexps, ALLOWED_FORMATS, coreFormat_default;
  var init_coreFormat = __esm({
    "src/lib/generators/coreFormat.mjs"() {
      init_random();
      FRAGMENT = "[a-zA-Z][a-zA-Z0-9+-.]*";
      URI_PATTERN = `https?://{hostname}(?:${FRAGMENT})+`;
      PARAM_PATTERN = "(?:\\?([a-z]{1,7}(=\\w{1,5})?&){0,3})?";
      regexps = {
        email: "[a-zA-Z\\d][a-zA-Z\\d-]{1,13}[a-zA-Z\\d]@{hostname}",
        hostname: "[a-zA-Z]{1,33}\\.[a-z]{2,4}",
        ipv6: "[a-f\\d]{4}(:[a-f\\d]{4}){7}",
        uri: URI_PATTERN,
        slug: "[a-zA-Z\\d_-]+",
        "uri-reference": `${URI_PATTERN}${PARAM_PATTERN}`,
        "uri-template": URI_PATTERN.replace("(?:", "(?:/\\{[a-z][:a-zA-Z0-9-]*\\}|"),
        "json-pointer": `(/(?:${FRAGMENT.replace("]*", "/]*")}|~[01]))+`,
        uuid: "^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$",
        duration: "^P(?!$)((\\d+Y)?(\\d+M)?(\\d+D)?(T(?=\\d)(\\d+H)?(\\d+M)?(\\d+S)?)?|(\\d+W)?)$"
      };
      regexps.iri = regexps["uri-reference"];
      regexps["iri-reference"] = regexps["uri-reference"];
      regexps["idn-email"] = regexps.email;
      regexps["idn-hostname"] = regexps.hostname;
      ALLOWED_FORMATS = new RegExp(`\\{(${Object.keys(regexps).join("|")})\\}`);
      coreFormat_default = coreFormatGenerator;
    }
  });

  // src/lib/types/string.mjs
  function generateFormat(value, invalid) {
    const callback = format_default(value.format);
    if (typeof callback === "function") {
      return callback(value);
    }
    switch (value.format) {
      case "date-time":
      case "datetime":
        return dateTime_default();
      case "date":
        return date_default();
      case "time":
        return time_default();
      case "ipv4":
        return ipv4_default();
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
      case "duration":
        return coreFormat_default(value.format);
      default:
        if (typeof callback === "undefined") {
          if (option_default("failOnInvalidFormat")) {
            throw new Error(`unknown registry key ${utils_default.short(value.format)}`);
          } else {
            return invalid();
          }
        }
        throw new Error(`unsupported format '${value.format}'`);
    }
  }
  function stringType(value) {
    const output = utils_default.typecast("string", value, (opts) => {
      if (value.format) {
        return generateFormat(value, () => thunk_default(opts.minLength, opts.maxLength));
      }
      if (value.pattern) {
        return random_default.randexp(value.pattern);
      }
      return thunk_default(opts.minLength, opts.maxLength);
    });
    return output;
  }
  var string_default;
  var init_string = __esm({
    "src/lib/types/string.mjs"() {
      init_thunk();
      init_ipv4();
      init_dateTime();
      init_date();
      init_time();
      init_coreFormat();
      init_option();
      init_format();
      init_random();
      init_utils();
      string_default = stringType;
    }
  });

  // src/lib/types/index.mjs
  var typeMap, types_default;
  var init_types = __esm({
    "src/lib/types/index.mjs"() {
      init_boolean2();
      init_null2();
      init_array();
      init_integer();
      init_number();
      init_object();
      init_string();
      typeMap = {
        boolean: boolean_default2,
        null: null_default2,
        array: array_default,
        integer: integer_default,
        number: number_default,
        object: object_default,
        string: string_default
      };
      types_default = typeMap;
    }
  });

  // src/lib/core/traverse.mjs
  function getMeta({ $comment: comment, title, description }) {
    return Object.entries({ comment, title, description }).filter(([, value]) => value).reduce((memo, [k, v]) => {
      memo[k] = v;
      return memo;
    }, {});
  }
  function traverse(schema, path, resolve2, rootSchema) {
    schema = resolve2(schema, null, path);
    if (schema && (schema.oneOf || schema.anyOf || schema.allOf)) {
      schema = resolve2(schema, null, path);
    }
    if (!schema) {
      throw new Error(`Cannot traverse at '${path.join(".")}', given '${JSON.stringify(rootSchema)}'`);
    }
    const context = {
      ...getMeta(schema),
      schemaPath: path
    };
    if (path[path.length - 1] !== "properties") {
      if (option_default("useExamplesValue") && Array.isArray(schema.examples)) {
        const fixedExamples = schema.examples.concat("default" in schema ? [schema.default] : []);
        return { value: utils_default.typecast(null, schema, () => random_default.pick(fixedExamples)), context };
      }
      if (option_default("useExamplesValue") && schema.example) {
        return { value: utils_default.typecast(null, schema, () => schema.example), context };
      }
      if (option_default("useDefaultValue") && "default" in schema) {
        if (schema.default !== "" || !option_default("replaceEmptyByRandomValue")) {
          return { value: schema.default, context };
        }
      }
      if ("template" in schema) {
        return { value: utils_default.template(schema.template, rootSchema), context };
      }
      if ("const" in schema) {
        return { value: schema.const, context };
      }
    }
    if (schema.not && typeof schema.not === "object") {
      schema = utils_default.notValue(schema.not, utils_default.omitProps(schema, ["not"]));
      if (schema.type && schema.type === "object") {
        const { value, context: innerContext } = traverse(schema, path.concat(["not"]), resolve2, rootSchema);
        return { value: utils_default.clean(value, schema, false), context: { ...context, items: innerContext } };
      }
    }
    if (typeof schema.thunk === "function") {
      const { value, context: innerContext } = traverse(schema.thunk(rootSchema), path, resolve2);
      return { value, context: { ...context, items: innerContext } };
    }
    if (schema.jsonPath) {
      return { value: schema, context };
    }
    let type = schema.type;
    if (Array.isArray(type)) {
      type = random_default.pick(type);
    } else if (typeof type === "undefined") {
      type = infer_default(schema, path) || type;
      if (type) {
        schema.type = type;
      }
    }
    if (typeof schema.generate === "function") {
      const retVal = utils_default.typecast(null, schema, () => schema.generate(rootSchema, path));
      const retType = retVal === null ? "null" : typeof retVal;
      if (retType === type || retType === "number" && type === "integer" || Array.isArray(retVal) && type === "array") {
        return { value: retVal, context };
      }
    }
    if (typeof schema.pattern === "string") {
      return { value: utils_default.typecast("string", schema, () => random_default.randexp(schema.pattern)), context };
    }
    if (Array.isArray(schema.enum)) {
      return { value: utils_default.typecast(null, schema, () => random_default.pick(schema.enum)), context };
    }
    if (typeof type === "string") {
      if (!types_default[type]) {
        if (option_default("failOnInvalidTypes")) {
          throw new error_default(`unknown primitive ${utils_default.short(type)}`, path.concat(["type"]));
        } else {
          const value = option_default("defaultInvalidTypeProduct");
          if (typeof value === "string" && types_default[value]) {
            return { value: types_default[value](schema, path, resolve2, traverse), context };
          }
          return { value, context };
        }
      } else {
        try {
          const innerResult = types_default[type](schema, path, resolve2, traverse);
          if (type === "array") {
            return {
              value: innerResult.map(({ value }) => value),
              context: {
                ...context,
                items: innerResult.map(
                  Array.isArray(schema.items) ? ({ context: c }) => c : ({ context: c }) => ({
                    ...c,
                    schemaPath: c.schemaPath.slice(0, -1)
                  })
                )
              }
            };
          }
          if (type === "object") {
            return innerResult !== null ? { value: innerResult.value, context: { ...context, items: innerResult.context } } : { value: {}, context };
          }
          return { value: innerResult, context };
        } catch (e) {
          if (typeof e.path === "undefined") {
            throw new error_default(e.stack, path);
          }
          throw e;
        }
      }
    }
    let valueCopy = {};
    let contextCopy = { ...context };
    if (Array.isArray(schema)) {
      valueCopy = [];
    }
    const pruneProperties = option_default("pruneProperties") || [];
    Object.keys(schema).forEach((prop) => {
      if (pruneProperties.includes(prop))
        return;
      if (schema[prop] === null)
        return;
      if (typeof schema[prop] === "object" && prop !== "definitions") {
        const { value, context: innerContext } = traverse(schema[prop], path.concat([prop]), resolve2, valueCopy);
        valueCopy[prop] = utils_default.clean(value, schema[prop], false);
        contextCopy[prop] = innerContext;
        if (valueCopy[prop] === null && option_default("omitNulls")) {
          delete valueCopy[prop];
          delete contextCopy[prop];
        }
      } else {
        valueCopy[prop] = schema[prop];
      }
    });
    return { value: valueCopy, context: contextCopy };
  }
  var traverse_default;
  var init_traverse = __esm({
    "src/lib/core/traverse.mjs"() {
      init_utils();
      init_random();
      init_error();
      init_infer();
      init_types();
      init_option();
      traverse_default = traverse;
    }
  });

  // src/lib/core/buildResolveSchema.mjs
  var buildResolveSchema, buildResolveSchema_default;
  var init_buildResolveSchema = __esm({
    "src/lib/core/buildResolveSchema.mjs"() {
      init_option();
      init_random();
      init_utils();
      buildResolveSchema = ({
        refs,
        schema,
        container: container2,
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
                return utils_default.getLocalRef(schema, sub.$ref, synchronous && refs);
              }
              delete sub.$ref;
              return sub;
            }
            if (typeof seenRefs[sub.$ref] === "undefined") {
              seenRefs[sub.$ref] = random_default.number(refDepthMin, refDepthMax) - 1;
            }
            lastPath = rootPath;
            lastRef = sub.$ref;
            let ref;
            if (sub.$ref.indexOf("#/") === -1) {
              ref = refs[sub.$ref] || null;
            } else {
              ref = utils_default.getLocalRef(schema, sub.$ref, synchronous && refs) || null;
            }
            let fixed;
            if (typeof ref !== "undefined") {
              if (!ref && option_default("ignoreMissingRefs") !== true) {
                throw new Error(`Reference not found: ${sub.$ref}`);
              }
              seenRefs[sub.$ref] -= 1;
              utils_default.merge(sub, ref || {});
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
              utils_default.merge(sub, typeof _sub.thunk === "function" ? _sub.thunk(sub) : _sub);
              if (Array.isArray(sub.allOf)) {
                recursiveUtil.resolveSchema(sub, index, rootPath);
              }
            });
          }
          if (Array.isArray(sub.oneOf || sub.anyOf) && rootPath[rootPath.length - 2] !== "dependencies") {
            const mix = sub.oneOf || sub.anyOf;
            if (sub.enum && sub.oneOf) {
              sub.enum = sub.enum.filter((x) => utils_default.validate(x, mix));
            }
            return {
              thunk(rootSchema) {
                const copy = utils_default.omitProps(sub, ["anyOf", "oneOf"]);
                const fixed = random_default.pick(mix);
                utils_default.merge(copy, fixed);
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
            if ((Array.isArray(sub[prop]) || typeof sub[prop] === "object") && !utils_default.isKey(prop)) {
              sub[prop] = recursiveUtil.resolveSchema(sub[prop], prop, rootPath.concat(prop));
            }
          });
          if (rootPath) {
            const lastProp = rootPath[rootPath.length - 1];
            if (lastProp === "properties" || lastProp === "items") {
              return sub;
            }
          }
          return container2.wrap(sub);
        };
        return recursiveUtil;
      };
      buildResolveSchema_default = buildResolveSchema;
    }
  });

  // src/lib/core/run.mjs
  function pick2(data) {
    return Array.isArray(data) ? random_default.pick(data) : data;
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
      return pick2(values[key]);
    }
    Object.keys(obj).forEach((k) => {
      obj[k] = resolve(obj[k], data, values, k);
    });
    return obj;
  }
  function run(refs, schema, container2, synchronous) {
    if (Object.prototype.toString.call(schema) !== "[object Object]") {
      throw new Error(`Invalid input, expecting object but given ${typeof schema}`);
    }
    const refDepthMin = option_default("refDepthMin") || 0;
    const refDepthMax = option_default("refDepthMax") || 3;
    try {
      const { resolveSchema } = buildResolveSchema_default({
        refs,
        schema,
        container: container2,
        synchronous,
        refDepthMin,
        refDepthMax
      });
      const result = traverse_default(utils_default.clone(schema), [], resolveSchema);
      if (option_default("resolveJsonPath")) {
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
  var run_default;
  var init_run = __esm({
    "src/lib/core/run.mjs"() {
      init_vendor();
      init_option();
      init_traverse();
      init_random();
      init_utils();
      init_buildResolveSchema();
      run_default = run;
    }
  });

  // src/lib/renderers/js.mjs
  function renderJS(res) {
    return res.value;
  }
  var js_default;
  var init_js = __esm({
    "src/lib/renderers/js.mjs"() {
      js_default = renderJS;
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
      var Node2 = class {
        static addStringTerminator(src, offset, str) {
          if (str[str.length - 1] === "\n")
            return str;
          const next = Node2.endOfWhiteSpace(src, offset);
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
          const inEnd = Node2.endOfIndent(src, lineStart);
          if (inEnd > lineStart + indent) {
            return inEnd;
          } else {
            const wsEnd = Node2.endOfWhiteSpace(src, inEnd);
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
          return !ch ? offset : ch !== "\n" && src[offset - 1] === "\n" ? offset - 1 : Node2.endOfWhiteSpace(src, offset);
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
                offset = Node2.endOfWhiteSpace(src, offset + 2) - 1;
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
          return start !== end || Node2.atBlank(src, end - 1);
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
            const end = Node2.endOfLine(src, start + 1);
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
          return Node2.addStringTerminator(src, range.end, str);
        }
      };
      var YAMLError = class extends Error {
        constructor(name, source, message) {
          if (!message || !(source instanceof Node2))
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
      var PlainValue = class extends Node2 {
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
              } = Node2.foldNewline(src, i, -1);
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
            if (Node2.atDocumentBoundary(src, offset + 1))
              break;
            const end = Node2.endOfBlockIndent(src, indent, offset + 1);
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
          offset = Node2.endOfWhiteSpace(src, offset);
          offset = this.parseComment(offset);
          if (!this.hasComment || this.valueRange.isEmpty()) {
            offset = this.parseBlockValue(offset);
          }
          return offset;
        }
      };
      exports.Char = Char;
      exports.Node = Node2;
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
      var Node2 = class {
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
      var Scalar2 = class extends Node2 {
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
      var Collection2 = class extends Node2 {
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
            if (node instanceof Collection2)
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
          if (node instanceof Collection2)
            return node.deleteIn(rest);
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
        getIn([key, ...rest], keepScalar) {
          const node = this.get(key, true);
          if (rest.length === 0)
            return !keepScalar && node instanceof Scalar2 ? node.value : node;
          else
            return node instanceof Collection2 ? node.getIn(rest, keepScalar) : void 0;
        }
        hasAllNullValues() {
          return this.items.every((node) => {
            if (!node || node.type !== "PAIR")
              return false;
            const n = node.value;
            return n == null || n instanceof Scalar2 && n.value == null && !n.commentBefore && !n.comment && !n.tag;
          });
        }
        hasIn([key, ...rest]) {
          if (rest.length === 0)
            return this.has(key);
          const node = this.get(key, true);
          return node instanceof Collection2 ? node.hasIn(rest) : false;
        }
        setIn([key, ...rest], value) {
          if (rest.length === 0) {
            this.set(key, value);
          } else {
            const node = this.get(key, true);
            if (node instanceof Collection2)
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
            if (hasItemWithNewLine || strings.reduce((sum, str2) => sum + str2.length + 2, 2) > Collection2.maxFlowStringSingleLineLength) {
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
      PlainValue._defineProperty(Collection2, "maxFlowStringSingleLineLength", 60);
      function asItemIndex(key) {
        let idx = key instanceof Scalar2 ? key.value : key;
        if (idx && typeof idx === "string")
          idx = Number(idx);
        return Number.isInteger(idx) && idx >= 0 ? idx : null;
      }
      var YAMLSeq2 = class extends Collection2 {
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
          return !keepScalar && it instanceof Scalar2 ? it.value : it;
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
        if (key instanceof Node2 && ctx && ctx.doc)
          return key.toString({
            anchors: /* @__PURE__ */ Object.create(null),
            doc: ctx.doc,
            indent: "",
            indentStep: ctx.indentStep,
            inFlow: true,
            inStringifyKey: true,
            stringify: ctx.stringify
          });
        return JSON.stringify(jsKey);
      };
      var Pair2 = class extends Node2 {
        constructor(key, value = null) {
          super();
          this.key = key;
          this.value = value;
          this.type = Pair2.Type.PAIR;
        }
        get commentBefore() {
          return this.key instanceof Node2 ? this.key.commentBefore : void 0;
        }
        set commentBefore(cb) {
          if (this.key == null)
            this.key = new Scalar2(null);
          if (this.key instanceof Node2)
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
          const pair = ctx && ctx.mapAsMap ? /* @__PURE__ */ new Map() : {};
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
          let keyComment = key instanceof Node2 && key.comment;
          if (simpleKeys) {
            if (keyComment) {
              throw new Error("With simple keys, key nodes cannot have comments");
            }
            if (key instanceof Collection2) {
              const msg = "With simple keys, collection cannot be used as a key value";
              throw new Error(msg);
            }
          }
          let explicitKey = !simpleKeys && (!key || keyComment || (key instanceof Node2 ? key instanceof Collection2 || key.type === PlainValue.Type.BLOCK_FOLDED || key.type === PlainValue.Type.BLOCK_LITERAL : typeof key === "object"));
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
          if (value instanceof Node2) {
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
          if (!explicitKey && !this.comment && value instanceof Scalar2)
            ctx.indentAtStart = str.length + 1;
          chompKeep = false;
          if (!indentSeq && indentSize >= 2 && !ctx.inFlow && !explicitKey && value instanceof YAMLSeq2 && value.type !== PlainValue.Type.FLOW_SEQ && !value.tag && !doc.anchors.getName(value)) {
            ctx.indent = ctx.indent.substr(2);
          }
          const valueStr = stringify(value, ctx, () => valueComment = null, () => chompKeep = true);
          let ws = " ";
          if (vcb || this.comment) {
            ws = `${vcb}
${ctx.indent}`;
          } else if (!explicitKey && value instanceof Collection2) {
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
      PlainValue._defineProperty(Pair2, "Type", {
        PAIR: "PAIR",
        MERGE_PAIR: "MERGE_PAIR"
      });
      var getAliasCount = (node, anchors) => {
        if (node instanceof Alias2) {
          const anchor = anchors.get(node.source);
          return anchor.count * anchor.aliasCount;
        } else if (node instanceof Collection2) {
          let count = 0;
          for (const item of node.items) {
            const c = getAliasCount(item, anchors);
            if (c > count)
              count = c;
          }
          return count;
        } else if (node instanceof Pair2) {
          const kc = getAliasCount(node.key, anchors);
          const vc = getAliasCount(node.value, anchors);
          return Math.max(kc, vc);
        }
        return 1;
      };
      var Alias2 = class extends Node2 {
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
          return Alias2.stringify(this, ctx);
        }
      };
      PlainValue._defineProperty(Alias2, "default", true);
      function findPair(items, key) {
        const k = key instanceof Scalar2 ? key.value : key;
        for (const it of items) {
          if (it instanceof Pair2) {
            if (it.key === key || it.key === k)
              return it;
            if (it.key && it.key.value === k)
              return it;
          }
        }
        return void 0;
      }
      var YAMLMap2 = class extends Collection2 {
        add(pair, overwrite) {
          if (!pair)
            pair = new Pair2(pair);
          else if (!(pair instanceof Pair2))
            pair = new Pair2(pair.key || pair, pair.value);
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
          return !keepScalar && node instanceof Scalar2 ? node.value : node;
        }
        has(key) {
          return !!findPair(this.items, key);
        }
        set(key, value) {
          this.add(new Pair2(key, value), true);
        }
        toJSON(_, ctx, Type) {
          const map = Type ? new Type() : ctx && ctx.mapAsMap ? /* @__PURE__ */ new Map() : {};
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
            if (!(item instanceof Pair2))
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
      var Merge2 = class extends Pair2 {
        constructor(pair) {
          if (pair instanceof Pair2) {
            let seq = pair.value;
            if (!(seq instanceof YAMLSeq2)) {
              seq = new YAMLSeq2();
              seq.items.push(pair.value);
              seq.range = pair.value.range;
            }
            super(pair.key, seq);
            this.range = pair.range;
          } else {
            super(new Scalar2(MERGE_KEY), new YAMLSeq2());
          }
          this.type = Pair2.Type.MERGE_PAIR;
        }
        addToJSMap(ctx, map) {
          for (const {
            source
          } of this.value.items) {
            if (!(source instanceof YAMLMap2))
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
      var binaryOptions2 = {
        defaultType: PlainValue.Type.BLOCK_LITERAL,
        lineWidth: 76
      };
      var boolOptions2 = {
        trueStr: "true",
        falseStr: "false"
      };
      var intOptions2 = {
        asBigInt: false
      };
      var nullOptions2 = {
        nullStr: "null"
      };
      var strOptions2 = {
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
          resolve: resolve2
        } of tags) {
          if (test) {
            const match = str.match(test);
            if (match) {
              let res = resolve2.apply(null, match);
              if (!(res instanceof Scalar2))
                res = new Scalar2(res);
              if (format)
                res.format = format;
              return res;
            }
          }
        }
        if (scalarFallback)
          str = scalarFallback(str);
        return new Scalar2(str);
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
      }, strOptions2.fold) : strOptions2.fold;
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
        } = strOptions2.doubleQuoted;
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
        const literal = type === PlainValue.Type.BLOCK_FOLDED ? false : type === PlainValue.Type.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, strOptions2.fold.lineWidth, indent.length);
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
        const body = foldFlowLines(`${wsStart}${value}${wsEnd}`, indent, FOLD_BLOCK, strOptions2.fold);
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
        } = strOptions2;
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
              return res instanceof Collection2 ? res : new Scalar2(res);
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
          const res = new Alias2(src);
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
        const map = new YAMLMap2();
        map.items = items;
        resolveComments(map, comments);
        let hasCollectionKey = false;
        for (let i = 0; i < items.length; ++i) {
          const {
            key: iKey
          } = items[i];
          if (iKey instanceof Collection2)
            hasCollectionKey = true;
          if (doc.schema.merge && iKey && iKey.value === MERGE_KEY) {
            items[i] = new Merge2(items[i]);
            const sources = items[i].value.items;
            let error = null;
            sources.some((node) => {
              if (node instanceof Alias2) {
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
                items.push(new Pair2(key));
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
                const pair = new Pair2(key, resolveNode(doc, valueNode));
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
                items.push(new Pair2(key));
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
          items.push(new Pair2(key));
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
                items.push(new Pair2(key));
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
            items.push(new Pair2(key, resolveNode(doc, item)));
            key = void 0;
            explicitKey = false;
          }
        }
        checkFlowCollectionEnd(doc.errors, cst);
        if (key !== void 0)
          items.push(new Pair2(key));
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
        const seq = new YAMLSeq2();
        seq.items = items;
        resolveComments(seq, comments);
        if (!doc.options.mapAsMap && items.some((it) => it instanceof Pair2 && it.key instanceof Collection2)) {
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
              items.push(new Pair2(key));
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
                if (key instanceof Pair2) {
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
              items.push(new Pair2(key, value));
              key = void 0;
            }
            keyStart = item.range.start;
            next = ",";
          }
        }
        checkFlowCollectionEnd(doc.errors, cst);
        if (key !== void 0)
          items.push(new Pair2(key));
        return {
          comments,
          items
        };
      }
      exports.Alias = Alias2;
      exports.Collection = Collection2;
      exports.Merge = Merge2;
      exports.Node = Node2;
      exports.Pair = Pair2;
      exports.Scalar = Scalar2;
      exports.YAMLMap = YAMLMap2;
      exports.YAMLSeq = YAMLSeq2;
      exports.addComment = addComment;
      exports.binaryOptions = binaryOptions2;
      exports.boolOptions = boolOptions2;
      exports.findPair = findPair;
      exports.intOptions = intOptions2;
      exports.isEmptyPath = isEmptyPath;
      exports.nullOptions = nullOptions2;
      exports.resolveMap = resolveMap;
      exports.resolveNode = resolveNode;
      exports.resolveSeq = resolveSeq;
      exports.resolveString = resolveString;
      exports.strOptions = strOptions2;
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
          const map = /* @__PURE__ */ new Map();
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
          let date2 = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec || 0);
          if (tz && tz !== "Z") {
            let d = parseSexagesimal(tz[0], tz.slice(1));
            if (Math.abs(d) < 30)
              d *= 60;
            date2 -= 6e4 * d;
          }
          return new Date(date2);
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
      var Schema2 = class {
        constructor({
          customTags,
          merge: merge2,
          schema,
          sortMapEntries,
          tags: deprecatedCustomTags
        }) {
          this.merge = !!merge2;
          this.name = schema;
          this.sortMapEntries = sortMapEntries === true ? sortMapEntriesByKey : sortMapEntries || null;
          if (!customTags && deprecatedCustomTags)
            warnings.warnOptionDeprecation("tags", "customTags");
          this.tags = getSchemaTags(schemas, tags, customTags || deprecatedCustomTags, schema);
        }
        createNode(value, wrapScalars, tagName, ctx) {
          const baseCtx = {
            defaultPrefix: Schema2.defaultPrefix,
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
      PlainValue._defineProperty(Schema2, "defaultPrefix", PlainValue.defaultTagPrefix);
      PlainValue._defineProperty(Schema2, "defaultTags", PlainValue.defaultTags);
      exports.Schema = Schema2;
    }
  });

  // node_modules/yaml/dist/types.js
  var require_types2 = __commonJS({
    "node_modules/yaml/dist/types.js"(exports) {
      "use strict";
      var resolveSeq = require_resolveSeq_d03cb037();
      var Schema2 = require_Schema_88e323a7();
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
      exports.Schema = Schema2.Schema;
    }
  });

  // node_modules/yaml/types.mjs
  var import_types2, binaryOptions, boolOptions, intOptions, nullOptions, strOptions, Schema, Alias, Collection, Merge, Node, Pair, Scalar, YAMLMap, YAMLSeq;
  var init_types2 = __esm({
    "node_modules/yaml/types.mjs"() {
      import_types2 = __toESM(require_types2(), 1);
      binaryOptions = import_types2.default.binaryOptions;
      boolOptions = import_types2.default.boolOptions;
      intOptions = import_types2.default.intOptions;
      nullOptions = import_types2.default.nullOptions;
      strOptions = import_types2.default.strOptions;
      Schema = import_types2.default.Schema;
      Alias = import_types2.default.Alias;
      Collection = import_types2.default.Collection;
      Merge = import_types2.default.Merge;
      Node = import_types2.default.Node;
      Pair = import_types2.default.Pair;
      Scalar = import_types2.default.Scalar;
      YAMLMap = import_types2.default.YAMLMap;
      YAMLSeq = import_types2.default.YAMLSeq;
    }
  });

  // src/lib/renderers/yaml.mjs
  function getIn(obj, path) {
    return path.reduce((v, k) => k in v ? v[k] : {}, obj);
  }
  function addComments(context, path, commentNode, iterNode = commentNode) {
    const { title, description, comment } = getIn(context, path);
    const lines = [];
    if (option_default("renderTitle") && title) {
      lines.push(` ${title}`, "");
    }
    if (option_default("renderDescription") && description) {
      lines.push(` ${description}`);
    }
    if (option_default("renderComment") && comment) {
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
    const nodes = yaml_default.createNode(value);
    addComments(context, [], nodes);
    const doc = new yaml_default.Document();
    doc.contents = nodes;
    return doc.toString();
  }
  var yaml_default;
  var init_yaml = __esm({
    "src/lib/renderers/yaml.mjs"() {
      init_yaml();
      init_types2();
      init_option();
      yaml_default = renderYAML;
    }
  });

  // src/lib/renderers/index.mjs
  var init_renderers = __esm({
    "src/lib/renderers/index.mjs"() {
      init_js();
      init_yaml();
    }
  });

  // src/lib/index.mjs
  var lib_exports = {};
  __export(lib_exports, {
    JSONSchemaFaker: () => JSONSchemaFaker,
    default: () => lib_default
  });
  function setupKeywords() {
    container.define("autoIncrement", function autoIncrement(value, schema) {
      if (!this.offset) {
        const min = schema.minimum || 1;
        const max = min + constants_default.MAX_NUMBER;
        const offset = value.initialOffset || schema.initialOffset;
        this.offset = offset || random_default.number(min, max);
      }
      if (value === true) {
        return this.offset++;
      }
      return schema;
    });
    container.define("sequentialDate", function sequentialDate(value, schema) {
      if (!this.now) {
        this.now = random_default.date();
      }
      if (value) {
        schema = this.now.toISOString();
        value = value === true ? "days" : value;
        if (["seconds", "minutes", "hours", "days", "weeks", "months", "years"].indexOf(value) === -1) {
          throw new Error(`Unsupported increment by ${utils_default.short(value)}`);
        }
        this.now.setTime(this.now.getTime() + random_default.date(value));
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
  var container, jsf, JSONSchemaFaker, lib_default;
  var init_lib = __esm({
    "src/lib/index.mjs"() {
      init_vendor();
      init_Container();
      init_format();
      init_option();
      init_constants();
      init_random();
      init_utils();
      init_run();
      init_renderers();
      container = new Container_default();
      jsf = (schema, refs, cwd) => {
        console.debug("[json-schema-faker] calling JSONSchemaFaker() is deprecated, call either .generate() or .resolve()");
        if (cwd) {
          console.debug("[json-schema-faker] local references are only supported by calling .resolve()");
        }
        return jsf.generate(schema, refs);
      };
      jsf.generateWithContext = (schema, refs) => {
        const $refs = getRefs(refs, schema);
        return run_default($refs, schema, container, true);
      };
      jsf.generate = (schema, refs) => js_default(
        jsf.generateWithContext(schema, refs)
      );
      jsf.generateYAML = (schema, refs) => yaml_default(
        jsf.generateWithContext(schema, refs)
      );
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
        }).then((sub) => run_default($refs, sub, container)).catch((e) => {
          throw new Error(`Error while resolving schema (${e.message})`);
        });
      };
      jsf.resolve = (schema, refs, cwd) => jsf.resolveWithContext(schema, refs, cwd).then(js_default);
      jsf.resolveYAML = (schema, refs, cwd) => jsf.resolveWithContext(schema, refs, cwd).then(yaml_default);
      setupKeywords();
      jsf.format = format_default;
      jsf.option = option_default;
      jsf.random = random_default;
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
      jsf.VERSION = "0.5.0-rcv.45";
      JSONSchemaFaker = { ...jsf };
      lib_default = jsf;
    }
  });

  // main.iife.js
  var require_main_iife = __commonJS({
    "main.iife.js"(exports, module) {
      var { setDependencies: setDependencies2 } = (init_vendor(), __toCommonJS(vendor_exports));
      var JSONSchemaFaker2 = (init_lib(), __toCommonJS(lib_exports)).default;
      if (typeof window !== "undefined") {
        setDependencies2({
          ...window.JSONPath,
          $RefParser: window.$RefParser
        });
        window.JSONSchemaFaker = JSONSchemaFaker2;
      }
      module.exports = JSONSchemaFaker2;
      module.exports.JSONSchemaFaker = JSONSchemaFaker2;
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

