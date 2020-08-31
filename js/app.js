(function () {
    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function is_promise(value) {
        return value && typeof value === 'object' && typeof value.then === 'function';
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if (typeof $$scope.dirty === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value' || descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.data !== data)
            text.data = data;
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function handle_promise(promise, info) {
        const token = info.token = {};
        function update(type, index, key, value) {
            if (info.token !== token)
                return;
            info.resolved = value;
            let child_ctx = info.ctx;
            if (key !== undefined) {
                child_ctx = child_ctx.slice();
                child_ctx[key] = value;
            }
            const block = type && (info.current = type)(child_ctx);
            let needs_flush = false;
            if (info.block) {
                if (info.blocks) {
                    info.blocks.forEach((block, i) => {
                        if (i !== index && block) {
                            group_outros();
                            transition_out(block, 1, 1, () => {
                                info.blocks[i] = null;
                            });
                            check_outros();
                        }
                    });
                }
                else {
                    info.block.d(1);
                }
                block.c();
                transition_in(block, 1);
                block.m(info.mount(), info.anchor);
                needs_flush = true;
            }
            info.block = block;
            if (info.blocks)
                info.blocks[index] = block;
            if (needs_flush) {
                flush();
            }
        }
        if (is_promise(promise)) {
            const current_component = get_current_component();
            promise.then(value => {
                set_current_component(current_component);
                update(info.then, 1, info.value, value);
                set_current_component(null);
            }, error => {
                set_current_component(current_component);
                update(info.catch, 2, info.error, error);
                set_current_component(null);
            });
            // if we previously had a then/catch block, destroy it
            if (info.current !== info.pending) {
                update(info.pending, 0);
                return true;
            }
        }
        else {
            if (info.current !== info.then) {
                update(info.then, 1, info.value, promise);
                return true;
            }
            info.resolved = promise;
        }
    }

    const globals = (typeof window !== 'undefined' ? window : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    var BASE_URL = 'https://github.com';
    var API_URL = 'https://api.github.com';

    var AUTH_ID="9685733337524132a430", AUTH_SECRET="bb8e95e2d20291d29eda90f8a35e0572092b37f9", PROXY_URL="https://cors-anywhere.herokuapp.com/";
    

    var data = window.localStorage._DATA;

    // shared state
    var loggedIn = writable(!!data);
    var session = writable(data ? JSON.parse(data) : {});
    var schemas = writable([]);
    var current = writable({});

    // builds a fixed URL for github.api calls
    function getUrl(x, path, params) {
      var url = "" + x + path + "?client_id=" + AUTH_ID + "&client_secret=" + AUTH_SECRET;
      var redirect = "redirect_uri=" + (encodeURIComponent(((location.protocol) + "//" + (location.host) + "/")));

      return params
        ? (url + "&" + (Object.keys(params).map(function (k) { return (k + "=" + (params[k])); }).join('&')) + "&" + redirect)
        : ("" + url + (params !== false ? ("&" + redirect) : ''));
    }

    function getJSON(path, params, options) {
      return fetch(("" + PROXY_URL + (getUrl(API_URL, path, options))), Object.assign({}, params,
        {headers: {
          Authorization: ("bearer " + (window.localStorage._AUTH)),
        }})).then(function (res) { return res.json(); });
    }

    function loadFrom(uri) {
      var tmp = uri.replace('#', '').split('/');

      if (tmp.length === 1) {
        // old style URI-based schema - supported for backward compatibility
        // example: http://json-schema-faker.js.org/#%7B%22type%22%3A%22string%22%2C%22chance%22%3A%7B%22first%22%3A%7B%22nationality%22%3A%22en%22%7D%7D%7D
        return Promise.resolve({
          files: {
            // legacy and ugly
            'schema.json': {
              content: decodeURIComponent(tmp[0]),
            },
          },
        });
      }

      var type = tmp[0];
      var hash = tmp[1];

      switch (type) {
        case 'gist':
          // example: http://json-schema-faker.js.org/#gist/c347f2f6083fe81a1fe43d17b83125d7
          return fetch(getUrl(API_URL, ("/gists/" + hash)))
            .then(function (res) { return res.json(); });

        case 'uri':
          // example: http://json-schema-faker.js.org/#uri/%7B%22type%22%3A%22string%22%2C%22chance%22%3A%7B%22first%22%3A%7B%22nationality%22%3A%22en%22%7D%7D%7D
          return Promise.resolve({
            files: {
              Example: {
                content: decodeURIComponent(hash),
              },
            },
          });

        default:
          throw new Error('Unknown storage type');
      }
    }

    function auth(tokenId, callback) {
      window.localStorage._AUTH = '';

      var url = getUrl(BASE_URL, '/login/oauth/access_token', {
        code: tokenId,
      });

      fetch(("" + PROXY_URL + url), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }).then(function (res) { return res.json(); })
        .then(function (result) {
          if (result.access_token) {
            window.localStorage._AUTH = result.access_token;
            setTimeout(callback, 120);
          }
        });
    }

    function url() {
      return getUrl(BASE_URL, '/login/oauth/authorize', {
        scope: 'gist,read:user',
      });
    }

    function all() {
      return getJSON('/gists');
    }

    function me() {
      return getJSON('/user');
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var strictUriEncode = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

    var token = '%[a-f0-9]{2}';
    var singleMatcher = new RegExp(token, 'gi');
    var multiMatcher = new RegExp('(' + token + ')+', 'gi');

    function decodeComponents(components, split) {
    	try {
    		// Try to decode the entire string first
    		return decodeURIComponent(components.join(''));
    	} catch (err) {
    		// Do nothing
    	}

    	if (components.length === 1) {
    		return components;
    	}

    	split = split || 1;

    	// Split the array in 2 parts
    	var left = components.slice(0, split);
    	var right = components.slice(split);

    	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
    }

    function decode(input) {
    	try {
    		return decodeURIComponent(input);
    	} catch (err) {
    		var tokens = input.match(singleMatcher);

    		for (var i = 1; i < tokens.length; i++) {
    			input = decodeComponents(tokens, i).join('');

    			tokens = input.match(singleMatcher);
    		}

    		return input;
    	}
    }

    function customDecodeURIComponent(input) {
    	// Keep track of all the replacements and prefill the map with the `BOM`
    	var replaceMap = {
    		'%FE%FF': '\uFFFD\uFFFD',
    		'%FF%FE': '\uFFFD\uFFFD'
    	};

    	var match = multiMatcher.exec(input);
    	while (match) {
    		try {
    			// Decode as big chunks as possible
    			replaceMap[match[0]] = decodeURIComponent(match[0]);
    		} catch (err) {
    			var result = decode(match[0]);

    			if (result !== match[0]) {
    				replaceMap[match[0]] = result;
    			}
    		}

    		match = multiMatcher.exec(input);
    	}

    	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
    	replaceMap['%C2'] = '\uFFFD';

    	var entries = Object.keys(replaceMap);

    	for (var i = 0; i < entries.length; i++) {
    		// Replace all decoded components
    		var key = entries[i];
    		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
    	}

    	return input;
    }

    var decodeUriComponent = function (encodedURI) {
    	if (typeof encodedURI !== 'string') {
    		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
    	}

    	try {
    		encodedURI = encodedURI.replace(/\+/g, ' ');

    		// Try the built in decoder first
    		return decodeURIComponent(encodedURI);
    	} catch (err) {
    		// Fallback to a more advanced decoder
    		return customDecodeURIComponent(encodedURI);
    	}
    };

    var splitOnFirst = (string, separator) => {
    	if (!(typeof string === 'string' && typeof separator === 'string')) {
    		throw new TypeError('Expected the arguments to be of type `string`');
    	}

    	if (separator === '') {
    		return [string];
    	}

    	const separatorIndex = string.indexOf(separator);

    	if (separatorIndex === -1) {
    		return [string];
    	}

    	return [
    		string.slice(0, separatorIndex),
    		string.slice(separatorIndex + separator.length)
    	];
    };

    var queryString = createCommonjsModule(function (module, exports) {




    function encoderForArrayFormat(options) {
    	switch (options.arrayFormat) {
    		case 'index':
    			return key => (result, value) => {
    				const index = result.length;
    				if (value === undefined || (options.skipNull && value === null)) {
    					return result;
    				}

    				if (value === null) {
    					return [...result, [encode(key, options), '[', index, ']'].join('')];
    				}

    				return [
    					...result,
    					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
    				];
    			};

    		case 'bracket':
    			return key => (result, value) => {
    				if (value === undefined || (options.skipNull && value === null)) {
    					return result;
    				}

    				if (value === null) {
    					return [...result, [encode(key, options), '[]'].join('')];
    				}

    				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
    			};

    		case 'comma':
    		case 'separator':
    			return key => (result, value) => {
    				if (value === null || value === undefined || value.length === 0) {
    					return result;
    				}

    				if (result.length === 0) {
    					return [[encode(key, options), '=', encode(value, options)].join('')];
    				}

    				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
    			};

    		default:
    			return key => (result, value) => {
    				if (value === undefined || (options.skipNull && value === null)) {
    					return result;
    				}

    				if (value === null) {
    					return [...result, encode(key, options)];
    				}

    				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
    			};
    	}
    }

    function parserForArrayFormat(options) {
    	let result;

    	switch (options.arrayFormat) {
    		case 'index':
    			return (key, value, accumulator) => {
    				result = /\[(\d*)\]$/.exec(key);

    				key = key.replace(/\[\d*\]$/, '');

    				if (!result) {
    					accumulator[key] = value;
    					return;
    				}

    				if (accumulator[key] === undefined) {
    					accumulator[key] = {};
    				}

    				accumulator[key][result[1]] = value;
    			};

    		case 'bracket':
    			return (key, value, accumulator) => {
    				result = /(\[\])$/.exec(key);
    				key = key.replace(/\[\]$/, '');

    				if (!result) {
    					accumulator[key] = value;
    					return;
    				}

    				if (accumulator[key] === undefined) {
    					accumulator[key] = [value];
    					return;
    				}

    				accumulator[key] = [].concat(accumulator[key], value);
    			};

    		case 'comma':
    		case 'separator':
    			return (key, value, accumulator) => {
    				const isArray = typeof value === 'string' && value.split('').indexOf(options.arrayFormatSeparator) > -1;
    				const newValue = isArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
    				accumulator[key] = newValue;
    			};

    		default:
    			return (key, value, accumulator) => {
    				if (accumulator[key] === undefined) {
    					accumulator[key] = value;
    					return;
    				}

    				accumulator[key] = [].concat(accumulator[key], value);
    			};
    	}
    }

    function validateArrayFormatSeparator(value) {
    	if (typeof value !== 'string' || value.length !== 1) {
    		throw new TypeError('arrayFormatSeparator must be single character string');
    	}
    }

    function encode(value, options) {
    	if (options.encode) {
    		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
    	}

    	return value;
    }

    function decode(value, options) {
    	if (options.decode) {
    		return decodeUriComponent(value);
    	}

    	return value;
    }

    function keysSorter(input) {
    	if (Array.isArray(input)) {
    		return input.sort();
    	}

    	if (typeof input === 'object') {
    		return keysSorter(Object.keys(input))
    			.sort((a, b) => Number(a) - Number(b))
    			.map(key => input[key]);
    	}

    	return input;
    }

    function removeHash(input) {
    	const hashStart = input.indexOf('#');
    	if (hashStart !== -1) {
    		input = input.slice(0, hashStart);
    	}

    	return input;
    }

    function getHash(url) {
    	let hash = '';
    	const hashStart = url.indexOf('#');
    	if (hashStart !== -1) {
    		hash = url.slice(hashStart);
    	}

    	return hash;
    }

    function extract(input) {
    	input = removeHash(input);
    	const queryStart = input.indexOf('?');
    	if (queryStart === -1) {
    		return '';
    	}

    	return input.slice(queryStart + 1);
    }

    function parseValue(value, options) {
    	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
    		value = Number(value);
    	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
    		value = value.toLowerCase() === 'true';
    	}

    	return value;
    }

    function parse(input, options) {
    	options = Object.assign({
    		decode: true,
    		sort: true,
    		arrayFormat: 'none',
    		arrayFormatSeparator: ',',
    		parseNumbers: false,
    		parseBooleans: false
    	}, options);

    	validateArrayFormatSeparator(options.arrayFormatSeparator);

    	const formatter = parserForArrayFormat(options);

    	// Create an object with no prototype
    	const ret = Object.create(null);

    	if (typeof input !== 'string') {
    		return ret;
    	}

    	input = input.trim().replace(/^[?#&]/, '');

    	if (!input) {
    		return ret;
    	}

    	for (const param of input.split('&')) {
    		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

    		// Missing `=` should be `null`:
    		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    		value = value === undefined ? null : options.arrayFormat === 'comma' ? value : decode(value, options);
    		formatter(decode(key, options), value, ret);
    	}

    	for (const key of Object.keys(ret)) {
    		const value = ret[key];
    		if (typeof value === 'object' && value !== null) {
    			for (const k of Object.keys(value)) {
    				value[k] = parseValue(value[k], options);
    			}
    		} else {
    			ret[key] = parseValue(value, options);
    		}
    	}

    	if (options.sort === false) {
    		return ret;
    	}

    	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
    		const value = ret[key];
    		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
    			// Sort object keys, not values
    			result[key] = keysSorter(value);
    		} else {
    			result[key] = value;
    		}

    		return result;
    	}, Object.create(null));
    }

    exports.extract = extract;
    exports.parse = parse;

    exports.stringify = (object, options) => {
    	if (!object) {
    		return '';
    	}

    	options = Object.assign({
    		encode: true,
    		strict: true,
    		arrayFormat: 'none',
    		arrayFormatSeparator: ','
    	}, options);

    	validateArrayFormatSeparator(options.arrayFormatSeparator);

    	const formatter = encoderForArrayFormat(options);

    	const objectCopy = Object.assign({}, object);
    	if (options.skipNull) {
    		for (const key of Object.keys(objectCopy)) {
    			if (objectCopy[key] === undefined || objectCopy[key] === null) {
    				delete objectCopy[key];
    			}
    		}
    	}

    	const keys = Object.keys(objectCopy);

    	if (options.sort !== false) {
    		keys.sort(options.sort);
    	}

    	return keys.map(key => {
    		const value = object[key];

    		if (value === undefined) {
    			return '';
    		}

    		if (value === null) {
    			return encode(key, options);
    		}

    		if (Array.isArray(value)) {
    			return value
    				.reduce(formatter(key), [])
    				.join('&');
    		}

    		return encode(key, options) + '=' + encode(value, options);
    	}).filter(x => x.length > 0).join('&');
    };

    exports.parseUrl = (input, options) => {
    	return {
    		url: removeHash(input).split('?')[0] || '',
    		query: parse(extract(input), options)
    	};
    };

    exports.stringifyUrl = (input, options) => {
    	const url = removeHash(input.url).split('?')[0] || '';
    	const queryFromUrl = exports.extract(input.url);
    	const parsedQueryFromUrl = exports.parse(queryFromUrl);
    	const hash = getHash(input.url);
    	const query = Object.assign(parsedQueryFromUrl, input.query);
    	let queryString = exports.stringify(query, options);
    	if (queryString) {
    		queryString = `?${queryString}`;
    	}

    	return `${url}${queryString}${hash}`;
    };
    });
    var queryString_1 = queryString.extract;
    var queryString_2 = queryString.parse;
    var queryString_3 = queryString.stringify;
    var queryString_4 = queryString.parseUrl;
    var queryString_5 = queryString.stringifyUrl;

    var defaultExport = /*@__PURE__*/(function (Error) {
      function defaultExport(route, path) {
        var message = "Unreachable '" + route + "', segment '" + path + "' is not defined";
        Error.call(this, message);
        this.message = message;
      }

      if ( Error ) defaultExport.__proto__ = Error;
      defaultExport.prototype = Object.create( Error && Error.prototype );
      defaultExport.prototype.constructor = defaultExport;

      return defaultExport;
    }(Error));

    function buildMatcher(path, parent) {
      var regex;

      var _isSplat;

      var _priority = -100;

      var keys = [];
      regex = path.replace(/[-$.]/g, '\\$&').replace(/\(/g, '(?:').replace(/\)/g, ')?').replace(/([:*]\w+)(?:<([^<>]+?)>)?/g, function (_, key, expr) {
        keys.push(key.substr(1));

        if (key.charAt() === ':') {
          _priority += 100;
          return ("((?!#)" + (expr || '[^#/]+?') + ")");
        }

        _isSplat = true;
        _priority += 500;
        return ("((?!#)" + (expr || '[^#]+?') + ")");
      });

      try {
        regex = new RegExp(("^" + regex + "$"));
      } catch (e) {
        throw new TypeError(("Invalid route expression, given '" + parent + "'"));
      }

      var _hashed = path.includes('#') ? 0.5 : 1;

      var _depth = path.length * _priority * _hashed;

      return {
        keys: keys,
        regex: regex,
        _depth: _depth,
        _isSplat: _isSplat
      };
    }
    var PathMatcher = function PathMatcher(path, parent) {
      var ref = buildMatcher(path, parent);
      var keys = ref.keys;
      var regex = ref.regex;
      var _depth = ref._depth;
      var _isSplat = ref._isSplat;
      return {
        _isSplat: _isSplat,
        _depth: _depth,
        match: function (value) {
          var matches = value.match(regex);

          if (matches) {
            return keys.reduce(function (prev, cur, i) {
              prev[cur] = typeof matches[i + 1] === 'string' ? decodeURIComponent(matches[i + 1]) : null;
              return prev;
            }, {});
          }
        }
      };
    };

    PathMatcher.push = function push (key, prev, leaf, parent) {
      var root = prev[key] || (prev[key] = {});

      if (!root.pattern) {
        root.pattern = new PathMatcher(key, parent);
        root.route = (leaf || '').replace(/\/$/, '') || '/';
      }

      prev.keys = prev.keys || [];

      if (!prev.keys.includes(key)) {
        prev.keys.push(key);
        PathMatcher.sort(prev);
      }

      return root;
    };

    PathMatcher.sort = function sort (root) {
      root.keys.sort(function (a, b) {
        return root[a].pattern._depth - root[b].pattern._depth;
      });
    };

    function merge(path, parent) {
      return ("" + (parent && parent !== '/' ? parent : '') + (path || ''));
    }
    function walk(path, cb) {
      var matches = path.match(/<[^<>]*\/[^<>]*>/);

      if (matches) {
        throw new TypeError(("RegExp cannot contain slashes, given '" + matches + "'"));
      }

      var parts = path.split(/(?=\/|#)/);
      var root = [];

      if (parts[0] !== '/') {
        parts.unshift('/');
      }

      parts.some(function (x, i) {
        var parent = root.slice(1).concat(x).join('') || null;
        var segment = parts.slice(i + 1).join('') || null;
        var retval = cb(x, parent, segment ? ("" + (x !== '/' ? x : '') + segment) : null);
        root.push(x);
        return retval;
      });
    }
    function reduce(key, root, _seen) {
      var params = {};
      var out = [];
      var splat;
      walk(key, function (x, leaf, extra) {
        var found;

        if (!root.keys) {
          throw new defaultExport(key, x);
        }

        root.keys.some(function (k) {
          if (_seen.includes(k)) { return false; }
          var ref = root[k].pattern;
          var match = ref.match;
          var _isSplat = ref._isSplat;
          var matches = match(_isSplat ? extra || x : x);

          if (matches) {
            Object.assign(params, matches);

            if (root[k].route) {
              var routeInfo = Object.assign({}, root[k].info); // properly handle exact-routes!

              var hasMatch = false;

              if (routeInfo.exact) {
                hasMatch = extra === null;
              } else {
                hasMatch = !(x && leaf === null) || x === leaf || _isSplat || !extra;
              }

              routeInfo.matches = hasMatch;
              routeInfo.params = Object.assign({}, params);
              routeInfo.route = root[k].route;
              routeInfo.path = _isSplat && extra || leaf || x;
              out.push(routeInfo);
            }

            if (extra === null && !root[k].keys) {
              return true;
            }

            if (k !== '/') { _seen.push(k); }
            splat = _isSplat;
            root = root[k];
            found = true;
            return true;
          }

          return false;
        });

        if (!(found || root.keys.some(function (k) { return root[k].pattern.match(x); }))) {
          throw new defaultExport(key, x);
        }

        return splat || !found;
      });
      return out;
    }
    function find(path, routes, retries) {
      var get = reduce.bind(null, path, routes);
      var set = [];

      while (retries > 0) {
        retries -= 1;

        try {
          return get(set);
        } catch (e) {
          if (retries > 0) {
            return get(set);
          }

          throw e;
        }
      }
    }
    function add(path, routes, parent, routeInfo) {
      var fullpath = merge(path, parent);
      var root = routes;
      var key;

      if (routeInfo && routeInfo.nested !== true) {
        key = routeInfo.key;
        delete routeInfo.key;
      }

      walk(fullpath, function (x, leaf) {
        root = PathMatcher.push(x, root, leaf, fullpath);

        if (x !== '/') {
          root.info = root.info || Object.assign({}, routeInfo);
        }
      });
      root.info = root.info || Object.assign({}, routeInfo);

      if (key) {
        root.info.key = key;
      }

      return fullpath;
    }
    function rm(path, routes, parent) {
      var fullpath = merge(path, parent);
      var root = routes;
      var leaf = null;
      var key = null;
      walk(fullpath, function (x) {
        if (!root) {
          leaf = null;
          return true;
        }

        if (!root.keys) {
          throw new defaultExport(path, x);
        }

        key = x;
        leaf = root;
        root = root[key];
      });

      if (!(leaf && key)) {
        throw new defaultExport(path, key);
      }

      if (leaf === routes) {
        leaf = routes['/'];
      }

      if (leaf.route !== key) {
        var offset = leaf.keys.indexOf(key);

        if (offset === -1) {
          throw new defaultExport(path, key);
        }

        leaf.keys.splice(offset, 1);
        PathMatcher.sort(leaf);
        delete leaf[key];
      }

      if (root.route === leaf.route) {
        delete leaf.info;
      }
    }

    var Router = function Router() {
      var routes = {};
      var stack = [];
      return {
        resolve: function (path, cb) {
          var url = path.split('?')[0];
          var seen = [];
          walk(url, function (x, leaf, extra) {
            try {
              cb(null, find(leaf, routes, 1).filter(function (r) {
                if (!seen.includes(r.route)) {
                  seen.push(r.route);
                  return true;
                }

                return false;
              }));
            } catch (e) {
              cb(e, []);
            }
          });
        },
        mount: function (path, cb) {
          if (path !== '/') {
            stack.push(path);
          }

          cb();
          stack.pop();
        },
        find: function (path, retries) { return find(path, routes, retries === true ? 2 : retries || 1); },
        add: function (path, routeInfo) { return add(path, routes, stack.join(''), routeInfo); },
        rm: function (path) { return rm(path, routes, stack.join('')); }
      };
    };

    Router.matches = function matches (uri, path) {
      return buildMatcher(uri, path).regex.test(path);
    };

    const cache = {};
    const baseTag = document.getElementsByTagName('base');
    const basePrefix = (baseTag[0] && baseTag[0].href.replace(/\/$/, '')) || '/';

    const ROOT_URL = basePrefix.replace(window.location.origin, '');

    const router = writable({
      path: '/',
      query: {},
      params: {},
    });

    const CTX_ROUTER = {};
    const CTX_ROUTE = {};

    // use location.hash on embedded pages, e.g. Svelte REPL
    let HASHCHANGE = window.location.origin === 'null';

    function hashchangeEnable(value) {
      if (typeof value === 'boolean') {
        HASHCHANGE = !!value;
      }

      return HASHCHANGE;
    }

    function fixedLocation(path, callback, doFinally) {
      const baseUri = hashchangeEnable() ? window.location.hash.replace('#', '') : window.location.pathname;

      // this will rebase anchors to avoid location changes
      if (path.charAt() !== '/') {
        path = baseUri + path;
      }

      const currentURL = baseUri + window.location.hash + window.location.search;

      // do not change location et all...
      if (currentURL !== path) {
        callback(path);
      }

      // invoke final guard regardless of previous result
      if (typeof doFinally === 'function') {
        doFinally();
      }
    }

    function navigateTo(path, options) {
      const {
        reload, replace,
        params, queryParams,
      } = options || {};

      // If path empty or no string, throws error
      if (!path || typeof path !== 'string' || (path[0] !== '/' && path[0] !== '#')) {
        throw new Error(`Expecting '/${path}' or '#${path}', given '${path}'`);
      }

      if (params) {
        path = path.replace(/:([a-zA-Z][a-zA-Z0-9_-]*)/g, (_, key) => params[key]);
      }

      // rebase active URL
      if (ROOT_URL !== '/' && path.indexOf(ROOT_URL) !== 0) {
        path = ROOT_URL + path;
      }

      if (queryParams) {
        const qs = queryString.stringify(queryParams);

        if (qs) {
          path += `?${qs}`;
        }
      }

      if (hashchangeEnable()) {
        window.location.hash = path.replace(/^#/, '');
        return;
      }

      // If no History API support, fallbacks to URL redirect
      if (reload || !window.history.pushState || !window.dispatchEvent) {
        window.location.href = path;
        return;
      }

      // If has History API support, uses it
      fixedLocation(path, nextURL => {
        window.history[replace ? 'replaceState' : 'pushState'](null, '', nextURL);
        window.dispatchEvent(new Event('popstate'));
      });
    }

    function getProps(given, required) {
      const { props: sub, ...others } = given;

      // prune all declared props from this component
      required = !Array.isArray(required)
        ? Object.keys(required)
        : required;

      required.forEach(k => {
        delete others[k];
      });

      return {
        ...sub,
        ...others,
      };
    }

    function isActive(uri, path, exact) {
      if (!cache[[uri, path, exact]]) {
        if (exact !== true && path.indexOf(uri) === 0) {
          cache[[uri, path, exact]] = /^[#/?]?$/.test(path.substr(uri.length, 1));
        } else if (uri.includes('*') || uri.includes(':')) {
          cache[[uri, path, exact]] = Router.matches(uri, path);
        } else {
          cache[[uri, path, exact]] = path === uri;
        }
      }

      return cache[[uri, path, exact]];
    }

    const baseRouter = new Router();
    const routeInfo = writable({});

    // private registries
    const onError = {};
    const shared = {};

    let errors = [];
    let routers = 0;
    let interval;

    // take snapshot from current state...
    router.subscribe(value => { shared.router = value; });
    routeInfo.subscribe(value => { shared.routeInfo = value; });

    function doFallback(failure, fallback) {
      routeInfo.update(defaults => ({
        ...defaults,
        [fallback]: {
          ...shared.router,
          failure,
        },
      }));
    }

    function handleRoutes(map, params) {
      const keys = [];

      map.some(x => {
        if (x.key && x.matches && !x.fallback && !shared.routeInfo[x.key]) {
          if (x.redirect && (x.condition === null || x.condition(shared.router) !== true)) {
            if (x.exact && shared.router.path !== x.path) return false;
            navigateTo(x.redirect);
            return true;
          }

          if (x.exact) {
            keys.push(x.key);
          }

          // extend shared params...
          Object.assign(params, x.params);

          // upgrade matching routes!
          routeInfo.update(defaults => ({
            ...defaults,
            [x.key]: {
              ...shared.router,
              ...x,
            },
          }));
        }

        return false;
      });

      return keys;
    }

    function evtHandler() {
      let baseUri = !hashchangeEnable() ? window.location.href.replace(window.location.origin, '') : window.location.hash || '/';
      let failure;

      // unprefix active URL
      if (ROOT_URL !== '/') {
        baseUri = baseUri.replace(ROOT_URL, '');
      }

      const [fullpath, qs] = baseUri.replace('/#', '#').replace(/^#\//, '/').split('?');
      const query = queryString.parse(qs);
      const params = {};
      const keys = [];

      // reset current state
      routeInfo.set({});
      router.set({
        query,
        params,
        path: fullpath,
      });

      // load all matching routes...
      baseRouter.resolve(fullpath, (err, result) => {
        if (err) {
          failure = err;
          return;
        }

        // save exact-keys for deletion after failures!
        keys.push(...handleRoutes(result, params));
      });

      const toDelete = {};

      if (failure) {
        keys.reduce((prev, cur) => {
          prev[cur] = null;
          return prev;
        }, toDelete);
      }

      // clear previously failed handlers
      errors.forEach(cb => cb());
      errors = [];

      try {
        // clear routes that not longer matches!
        baseRouter.find(fullpath).forEach(sub => {
          if (sub.exact && !sub.matches) {
            toDelete[sub.key] = null;
          }
        });
      } catch (e) {
        // this is fine
      }

      // drop unwanted routes...
      routeInfo.update(defaults => ({
        ...defaults,
        ...toDelete,
      }));

      let fallback;

      // invoke error-handlers to clear out previous state!
      Object.keys(onError).forEach(root => {
        if (isActive(root, fullpath, false)) {
          const fn = onError[root].callback;

          fn(failure);
          errors.push(fn);
        }

        if (!fallback && onError[root].fallback) {
          fallback = onError[root].fallback;
        }
      });

      // handle unmatched fallbacks
      if (failure && fallback) {
        doFallback(failure, fallback);
      }
    }

    function findRoutes() {
      clearTimeout(interval);
      interval = setTimeout(evtHandler);
    }

    function addRouter(root, fallback, callback) {
      if (!routers) {
        window.addEventListener('popstate', findRoutes, false);
      }

      // register error-handlers
      onError[root] = { fallback, callback };
      routers += 1;

      return () => {
        delete onError[root];
        routers -= 1;

        if (!routers) {
          window.removeEventListener('popstate', findRoutes, false);
        }
      };
    }

    /* node_modules/yrv/src/Router.svelte generated by Svelte v3.19.1 */

    function add_css() {
    	var style = element("style");
    	style.id = "svelte-kx2cky-style";
    	style.textContent = "[data-failure].svelte-kx2cky{border:1px dashed silver}";
    	append(document.head, style);
    }

    // (99:0) {#if !disabled}
    function create_if_block_1(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[15].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 16384) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[14], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[14], dirty, null));
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    // (103:0) {#if failure && !fallback && !nofallback}
    function create_if_block(ctx) {
    	let fieldset;
    	let legend;
    	let t0;
    	let t1;
    	let t2;
    	let pre;
    	let t3;

    	return {
    		c() {
    			fieldset = element("fieldset");
    			legend = element("legend");
    			t0 = text("Router failure: ");
    			t1 = text(/*path*/ ctx[1]);
    			t2 = space();
    			pre = element("pre");
    			t3 = text(/*failure*/ ctx[3]);
    			attr(fieldset, "data-failure", "");
    			attr(fieldset, "class", "svelte-kx2cky");
    		},
    		m(target, anchor) {
    			insert(target, fieldset, anchor);
    			append(fieldset, legend);
    			append(legend, t0);
    			append(legend, t1);
    			append(fieldset, t2);
    			append(fieldset, pre);
    			append(pre, t3);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*path*/ 2) set_data(t1, /*path*/ ctx[1]);
    			if (dirty & /*failure*/ 8) set_data(t3, /*failure*/ ctx[3]);
    		},
    		d(detaching) {
    			if (detaching) detach(fieldset);
    		}
    	};
    }

    function create_fragment(ctx) {
    	let t;
    	let if_block1_anchor;
    	let current;
    	let if_block0 = !/*disabled*/ ctx[0] && create_if_block_1(ctx);
    	let if_block1 = /*failure*/ ctx[3] && !/*fallback*/ ctx[4] && !/*nofallback*/ ctx[2] && create_if_block(ctx);

    	return {
    		c() {
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		m(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert(target, t, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (!/*disabled*/ ctx[0]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    					transition_in(if_block0, 1);
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t.parentNode, t);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*failure*/ ctx[3] && !/*fallback*/ ctx[4] && !/*nofallback*/ ctx[2]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block0);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block0);
    			current = false;
    		},
    		d(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach(t);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach(if_block1_anchor);
    		}
    	};
    }

    function unassignRoute(route) {
    	baseRouter.rm(route);
    	findRoutes();
    }

    function instance($$self, $$props, $$invalidate) {
    	let $basePath;
    	let $router;
    	component_subscribe($$self, router, $$value => $$invalidate(9, $router = $$value));
    	let cleanup;
    	let failure;
    	let fallback;
    	let { path = "/" } = $$props;
    	let { disabled = false } = $$props;
    	let { condition = null } = $$props;
    	let { nofallback = false } = $$props;
    	const routerContext = getContext(CTX_ROUTER);
    	const basePath = routerContext ? routerContext.basePath : writable(path);
    	component_subscribe($$self, basePath, value => $$invalidate(8, $basePath = value));

    	const fixedRoot = $basePath !== path && $basePath !== "/"
    	? `${$basePath}${path !== "/" ? path : ""}`
    	: path;

    	try {
    		if (condition !== null && typeof condition !== "function") {
    			throw new TypeError(`Expecting condition to be a function, given '${condition}'`);
    		}

    		if (path.charAt() !== "#" && path.charAt() !== "/") {
    			throw new TypeError(`Expecting a leading slash or hash, given '${path}'`);
    		}
    	} catch(e) {
    		failure = e;
    	}

    	function assignRoute(key, route, detail) {
    		key = key || Math.random().toString(36).substr(2);

    		// consider as nested routes if they does not have any segment
    		const nested = !route.substr(1).includes("/");

    		const handler = { key, nested, ...detail };
    		let fullpath;

    		baseRouter.mount(fixedRoot, () => {
    			fullpath = baseRouter.add(route, handler);
    			$$invalidate(4, fallback = handler.fallback && key || fallback);
    		});

    		findRoutes();
    		return [key, fullpath];
    	}

    	function onError(err) {
    		$$invalidate(3, failure = err);

    		if (failure && fallback) {
    			doFallback(failure, fallback);
    		}
    	}

    	onMount(() => {
    		cleanup = addRouter(fixedRoot, fallback, onError);
    	});

    	onDestroy(() => {
    		if (cleanup) cleanup();
    	});

    	setContext(CTX_ROUTER, { basePath, assignRoute, unassignRoute });
    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ("path" in $$props) $$invalidate(1, path = $$props.path);
    		if ("disabled" in $$props) $$invalidate(0, disabled = $$props.disabled);
    		if ("condition" in $$props) $$invalidate(6, condition = $$props.condition);
    		if ("nofallback" in $$props) $$invalidate(2, nofallback = $$props.nofallback);
    		if ("$$scope" in $$props) $$invalidate(14, $$scope = $$props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*condition, $router*/ 576) {
    			 if (condition) {
    				$$invalidate(0, disabled = !condition($router));
    			}
    		}
    	};

    	return [
    		disabled,
    		path,
    		nofallback,
    		failure,
    		fallback,
    		basePath,
    		condition,
    		cleanup,
    		$basePath,
    		$router,
    		routerContext,
    		fixedRoot,
    		assignRoute,
    		onError,
    		$$scope,
    		$$slots
    	];
    }

    class Router$1 extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-kx2cky-style")) add_css();

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			path: 1,
    			disabled: 0,
    			condition: 6,
    			nofallback: 2
    		});
    	}
    }

    /* node_modules/yrv/src/Route.svelte generated by Svelte v3.19.1 */

    function add_css$1() {
    	var style = element("style");
    	style.id = "svelte-7lze0z-style";
    	style.textContent = "[data-failure].svelte-7lze0z{color:red}";
    	append(document.head, style);
    }

    const get_default_slot_changes = dirty => ({
    	router: dirty & /*activeRouter*/ 8,
    	props: dirty & /*activeProps*/ 16
    });

    const get_default_slot_context = ctx => ({
    	router: /*activeRouter*/ ctx[3],
    	props: /*activeProps*/ ctx[4]
    });

    // (84:0) {#if failure}
    function create_if_block_4(ctx) {
    	let p;
    	let t;

    	return {
    		c() {
    			p = element("p");
    			t = text(/*failure*/ ctx[5]);
    			attr(p, "data-failure", "");
    			attr(p, "class", "svelte-7lze0z");
    		},
    		m(target, anchor) {
    			insert(target, p, anchor);
    			append(p, t);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*failure*/ 32) set_data(t, /*failure*/ ctx[5]);
    		},
    		d(detaching) {
    			if (detaching) detach(p);
    		}
    	};
    }

    // (88:0) {#if activeRouter}
    function create_if_block$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$1, create_if_block_3, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*dynamic*/ ctx[0]) return 0;
    		if (/*component*/ ctx[2]) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	return {
    		c() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    // (98:4) {:else}
    function create_else_block(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[24].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[23], get_default_slot_context);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty & /*$$scope, activeRouter, activeProps*/ 8388632) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[23], get_default_slot_context), get_slot_changes(default_slot_template, /*$$scope*/ ctx[23], dirty, get_default_slot_changes));
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    // (96:4) {#if component}
    function create_if_block_3(ctx) {
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ router: /*activeRouter*/ ctx[3] }, /*activeProps*/ ctx[4]];
    	var switch_value = /*component*/ ctx[2];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return { props: switch_instance_props };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	return {
    		c() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*activeRouter, activeProps*/ 24)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*activeRouter*/ 8 && { router: /*activeRouter*/ ctx[3] },
    					dirty & /*activeProps*/ 16 && get_spread_object(/*activeProps*/ ctx[4])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[2])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};
    }

    // (89:2) {#if dynamic}
    function create_if_block_1$1(ctx) {
    	let await_block_anchor;
    	let promise;
    	let current;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		pending: create_pending_block,
    		then: create_then_block,
    		catch: create_catch_block,
    		value: 25,
    		blocks: [,,,]
    	};

    	handle_promise(promise = /*dynamic*/ ctx[0], info);

    	return {
    		c() {
    			await_block_anchor = empty();
    			info.block.c();
    		},
    		m(target, anchor) {
    			insert(target, await_block_anchor, anchor);
    			info.block.m(target, info.anchor = anchor);
    			info.mount = () => await_block_anchor.parentNode;
    			info.anchor = await_block_anchor;
    			current = true;
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			info.ctx = ctx;

    			if (dirty & /*dynamic*/ 1 && promise !== (promise = /*dynamic*/ ctx[0]) && handle_promise(promise, info)) ; else {
    				const child_ctx = ctx.slice();
    				child_ctx[25] = info.resolved;
    				info.block.p(child_ctx, dirty);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(info.block);
    			current = true;
    		},
    		o(local) {
    			for (let i = 0; i < 3; i += 1) {
    				const block = info.blocks[i];
    				transition_out(block);
    			}

    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(await_block_anchor);
    			info.block.d(detaching);
    			info.token = null;
    			info = null;
    		}
    	};
    }

    // (1:0) <script context="module">   import { writable }
    function create_catch_block(ctx) {
    	return {
    		c: noop,
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};
    }

    // (92:4) {:then c}
    function create_then_block(ctx) {
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ router: /*activeRouter*/ ctx[3] }, /*activeProps*/ ctx[4]];
    	var switch_value = /*c*/ ctx[25].default;

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return { props: switch_instance_props };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	return {
    		c() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*activeRouter, activeProps*/ 24)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*activeRouter*/ 8 && { router: /*activeRouter*/ ctx[3] },
    					dirty & /*activeProps*/ 16 && get_spread_object(/*activeProps*/ ctx[4])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*c*/ ctx[25].default)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};
    }

    // (90:20)        {#if pending}
    function create_pending_block(ctx) {
    	let if_block_anchor;
    	let if_block = /*pending*/ ctx[1] && create_if_block_2(ctx);

    	return {
    		c() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    		},
    		p(ctx, dirty) {
    			if (/*pending*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    // (91:6) {#if pending}
    function create_if_block_2(ctx) {
    	let t;

    	return {
    		c() {
    			t = text(/*pending*/ ctx[1]);
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*pending*/ 2) set_data(t, /*pending*/ ctx[1]);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    function create_fragment$1(ctx) {
    	let t;
    	let if_block1_anchor;
    	let current;
    	let if_block0 = /*failure*/ ctx[5] && create_if_block_4(ctx);
    	let if_block1 = /*activeRouter*/ ctx[3] && create_if_block$1(ctx);

    	return {
    		c() {
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		m(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert(target, t, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (/*failure*/ ctx[5]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_4(ctx);
    					if_block0.c();
    					if_block0.m(t.parentNode, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*activeRouter*/ ctx[3]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    					transition_in(if_block1, 1);
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach(t);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach(if_block1_anchor);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $routePath;
    	let $routeInfo;
    	component_subscribe($$self, routeInfo, $$value => $$invalidate(16, $routeInfo = $$value));
    	let { key = null } = $$props;
    	let { path = "/" } = $$props;
    	let { exact = null } = $$props;
    	let { dynamic = null } = $$props;
    	let { pending = null } = $$props;
    	let { disabled = false } = $$props;
    	let { fallback = null } = $$props;
    	let { component = null } = $$props;
    	let { condition = null } = $$props;
    	let { redirect = null } = $$props;
    	const routeContext = getContext(CTX_ROUTE);
    	const routerContext = getContext(CTX_ROUTER);
    	const { assignRoute, unassignRoute } = routerContext || {};
    	const routePath = routeContext ? routeContext.routePath : writable(path);
    	component_subscribe($$self, routePath, value => $$invalidate(15, $routePath = value));
    	let activeRouter = null;
    	let activeProps = {};
    	let fullpath;
    	let failure;

    	const fixedRoot = $routePath !== path && $routePath !== "/"
    	? `${$routePath}${path !== "/" ? path : ""}`
    	: path;

    	try {
    		if (redirect !== null && !(/^(?:\w+:\/\/|\/)/).test(redirect)) {
    			throw new TypeError(`Expecting valid URL to redirect, given '${redirect}'`);
    		}

    		if (condition !== null && typeof condition !== "function") {
    			throw new TypeError(`Expecting condition to be a function, given '${condition}'`);
    		}

    		if (path.charAt() !== "#" && path.charAt() !== "/") {
    			throw new TypeError(`Expecting a leading slash or hash, given '${path}'`);
    		}

    		if (!assignRoute) {
    			throw new TypeError(`Missing top-level <Router>, given route: ${path}`);
    		}

    		[key, fullpath] = assignRoute(key, fixedRoot, { condition, redirect, fallback, exact });
    	} catch(e) {
    		failure = e;
    	}

    	onDestroy(() => {
    		if (unassignRoute) {
    			unassignRoute(fullpath);
    		}
    	});

    	setContext(CTX_ROUTE, { routePath });
    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$new_props => {
    		$$invalidate(22, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("key" in $$new_props) $$invalidate(7, key = $$new_props.key);
    		if ("path" in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ("exact" in $$new_props) $$invalidate(9, exact = $$new_props.exact);
    		if ("dynamic" in $$new_props) $$invalidate(0, dynamic = $$new_props.dynamic);
    		if ("pending" in $$new_props) $$invalidate(1, pending = $$new_props.pending);
    		if ("disabled" in $$new_props) $$invalidate(10, disabled = $$new_props.disabled);
    		if ("fallback" in $$new_props) $$invalidate(11, fallback = $$new_props.fallback);
    		if ("component" in $$new_props) $$invalidate(2, component = $$new_props.component);
    		if ("condition" in $$new_props) $$invalidate(12, condition = $$new_props.condition);
    		if ("redirect" in $$new_props) $$invalidate(13, redirect = $$new_props.redirect);
    		if ("$$scope" in $$new_props) $$invalidate(23, $$scope = $$new_props.$$scope);
    	};

    	$$self.$$.update = () => {
    		 if (key) {
    			
    			$$invalidate(3, activeRouter = !disabled && $routeInfo[key]);

    			$$invalidate(4, activeProps = getProps($$props, arguments[0].$$.props));
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		dynamic,
    		pending,
    		component,
    		activeRouter,
    		activeProps,
    		failure,
    		routePath,
    		key,
    		path,
    		exact,
    		disabled,
    		fallback,
    		condition,
    		redirect,
    		fullpath,
    		$routePath,
    		$routeInfo,
    		routeContext,
    		routerContext,
    		assignRoute,
    		unassignRoute,
    		fixedRoot,
    		$$props,
    		$$scope,
    		$$slots
    	];
    }

    class Route extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document.getElementById("svelte-7lze0z-style")) add_css$1();

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			key: 7,
    			path: 8,
    			exact: 9,
    			dynamic: 0,
    			pending: 1,
    			disabled: 10,
    			fallback: 11,
    			component: 2,
    			condition: 12,
    			redirect: 13
    		});
    	}
    }

    /* node_modules/yrv/src/Link.svelte generated by Svelte v3.19.1 */

    function create_else_block$1(ctx) {
    	let a;
    	let current;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[18].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[17], null);

    	let a_levels = [
    		/*fixedProps*/ ctx[6],
    		{
    			href: /*fixedHref*/ ctx[5] || /*href*/ ctx[1]
    		},
    		{ class: /*cssClass*/ ctx[0] },
    		{ title: /*title*/ ctx[2] }
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	return {
    		c() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    		},
    		m(target, anchor) {
    			insert(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			/*a_binding*/ ctx[20](a);
    			current = true;
    			dispose = listen(a, "click", prevent_default(/*onClick*/ ctx[7]));
    		},
    		p(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 131072) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[17], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[17], dirty, null));
    			}

    			set_attributes(a, get_spread_update(a_levels, [
    				dirty & /*fixedProps*/ 64 && /*fixedProps*/ ctx[6],
    				dirty & /*fixedHref, href*/ 34 && {
    					href: /*fixedHref*/ ctx[5] || /*href*/ ctx[1]
    				},
    				dirty & /*cssClass*/ 1 && { class: /*cssClass*/ ctx[0] },
    				dirty & /*title*/ 4 && { title: /*title*/ ctx[2] }
    			]));
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(a);
    			if (default_slot) default_slot.d(detaching);
    			/*a_binding*/ ctx[20](null);
    			dispose();
    		}
    	};
    }

    // (91:0) {#if button}
    function create_if_block$2(ctx) {
    	let button_1;
    	let current;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[18].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[17], null);

    	let button_1_levels = [
    		/*fixedProps*/ ctx[6],
    		{ class: /*cssClass*/ ctx[0] },
    		{ title: /*title*/ ctx[2] }
    	];

    	let button_1_data = {};

    	for (let i = 0; i < button_1_levels.length; i += 1) {
    		button_1_data = assign(button_1_data, button_1_levels[i]);
    	}

    	return {
    		c() {
    			button_1 = element("button");
    			if (default_slot) default_slot.c();
    			set_attributes(button_1, button_1_data);
    		},
    		m(target, anchor) {
    			insert(target, button_1, anchor);

    			if (default_slot) {
    				default_slot.m(button_1, null);
    			}

    			/*button_1_binding*/ ctx[19](button_1);
    			current = true;
    			dispose = listen(button_1, "click", prevent_default(/*onClick*/ ctx[7]));
    		},
    		p(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 131072) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[17], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[17], dirty, null));
    			}

    			set_attributes(button_1, get_spread_update(button_1_levels, [
    				dirty & /*fixedProps*/ 64 && /*fixedProps*/ ctx[6],
    				dirty & /*cssClass*/ 1 && { class: /*cssClass*/ ctx[0] },
    				dirty & /*title*/ 4 && { title: /*title*/ ctx[2] }
    			]));
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(button_1);
    			if (default_slot) default_slot.d(detaching);
    			/*button_1_binding*/ ctx[19](null);
    			dispose();
    		}
    	};
    }

    function create_fragment$2(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$2, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*button*/ ctx[3]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	return {
    		c() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $router;
    	component_subscribe($$self, router, $$value => $$invalidate(14, $router = $$value));
    	let ref;
    	let active;
    	let { class: cssClass = "" } = $$props;
    	let fixedHref = null;
    	let { go = null } = $$props;
    	let { open = null } = $$props;
    	let { href = "/" } = $$props;
    	let { title = "" } = $$props;
    	let { button = false } = $$props;
    	let { exact = false } = $$props;
    	let { reload = false } = $$props;
    	let { replace = false } = $$props;
    	const dispatch = createEventDispatcher();

    	// this will enable `<Link on:click={...} />` calls
    	function onClick(e) {
    		if (typeof go === "string" && window.history.length > 1) {
    			if (go === "back") window.history.back(); else if (go === "fwd") window.history.forward(); else window.history.go(parseInt(go, 10));
    			return;
    		}

    		if (!fixedHref) {
    			if (open) {
    				let specs = typeof open === "string" ? open : "";
    				const wmatch = specs.match(/width=(\d+)/);
    				const hmatch = specs.match(/height=(\d+)/);
    				if (wmatch) specs += `,left=${(window.screen.width - wmatch[1]) / 2}`;
    				if (hmatch) specs += `,top=${(window.screen.height - hmatch[1]) / 2}`;

    				if (wmatch && !hmatch) {
    					specs += `,height=${wmatch[1]},top=${(window.screen.height - wmatch[1]) / 2}`;
    				}

    				const w = window.open(href, "", specs);

    				const t = setInterval(
    					() => {
    						if (w.closed) {
    							dispatch("close");
    							clearInterval(t);
    						}
    					},
    					120
    				);
    			} else window.location.href = href;

    			return;
    		}

    		fixedLocation(
    			href,
    			nextURL => {
    				navigateTo(nextURL, { reload, replace });
    			},
    			() => dispatch("click", e)
    		);
    	}

    	let { $$slots = {}, $$scope } = $$props;

    	function button_1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(4, ref = $$value);
    		});
    	}

    	function a_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(4, ref = $$value);
    		});
    	}

    	$$self.$set = $$new_props => {
    		$$invalidate(16, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("class" in $$new_props) $$invalidate(0, cssClass = $$new_props.class);
    		if ("go" in $$new_props) $$invalidate(8, go = $$new_props.go);
    		if ("open" in $$new_props) $$invalidate(9, open = $$new_props.open);
    		if ("href" in $$new_props) $$invalidate(1, href = $$new_props.href);
    		if ("title" in $$new_props) $$invalidate(2, title = $$new_props.title);
    		if ("button" in $$new_props) $$invalidate(3, button = $$new_props.button);
    		if ("exact" in $$new_props) $$invalidate(10, exact = $$new_props.exact);
    		if ("reload" in $$new_props) $$invalidate(11, reload = $$new_props.reload);
    		if ("replace" in $$new_props) $$invalidate(12, replace = $$new_props.replace);
    		if ("$$scope" in $$new_props) $$invalidate(17, $$scope = $$new_props.$$scope);
    	};

    	let fixedProps;

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*href*/ 2) {
    			// rebase active URL
    			 if (!(/^(\w+:)?\/\//).test(href)) {
    				$$invalidate(5, fixedHref = ROOT_URL + href);
    			}
    		}

    		if ($$self.$$.dirty & /*ref, $router, href, exact, active, button*/ 25626) {
    			 if (ref && $router.path) {
    				if (isActive(href, $router.path, exact)) {
    					if (!active) {
    						$$invalidate(13, active = true);
    						ref.setAttribute("aria-current", "page");

    						if (button) {
    							ref.setAttribute("disabled", true);
    						}
    					}
    				} else if (active) {
    					$$invalidate(13, active = false);
    					ref.removeAttribute("disabled");
    					ref.removeAttribute("aria-current");
    				}
    			}
    		}

    		// extract additional props
    		
    		 $$invalidate(6, fixedProps = getProps($$props, arguments[0].$$.props));
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		cssClass,
    		href,
    		title,
    		button,
    		ref,
    		fixedHref,
    		fixedProps,
    		onClick,
    		go,
    		open,
    		exact,
    		reload,
    		replace,
    		active,
    		$router,
    		dispatch,
    		$$props,
    		$$scope,
    		$$slots,
    		button_1_binding,
    		a_binding
    	];
    }

    class Link extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			class: 0,
    			go: 8,
    			open: 9,
    			href: 1,
    			title: 2,
    			button: 3,
    			exact: 10,
    			reload: 11,
    			replace: 12
    		});
    	}
    }

    Object.defineProperty(Router$1, 'hashchange', {
      set: value => hashchangeEnable(value),
      get: () => hashchangeEnable(),
      configurable: false,
      enumerable: false,
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /** Class to realize fetch interceptors */
    var FetchInterceptor = function () {
      function FetchInterceptor() {
        var _this = this;

        _classCallCheck(this, FetchInterceptor);

        this.interceptors = [];

        this.fetch = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _this.interceptorWrapper.apply(_this, [fetch].concat(args));
        };
      }

      /**
       * add new interceptors
       * @param {(Object|Object[])} interceptors
       */


      _createClass(FetchInterceptor, [{
        key: 'addInterceptors',
        value: function addInterceptors(interceptors) {
          var _this2 = this;

          var removeIndex = [];

          if (Array.isArray(interceptors)) {
            interceptors.map(function (interceptor) {
              removeIndex.push(_this2.interceptors.length);
              return _this2.interceptors.push(interceptor);
            });
          } else if (interceptors instanceof Object) {
            removeIndex.push(this.interceptors.length);
            this.interceptors.push(interceptors);
          }

          this.updateInterceptors();

          return function () {
            return _this2.removeInterceptors(removeIndex);
          };
        }

        /**
         * remove interceptors by indexes
         * @param {number[]} indexes 
         */

      }, {
        key: 'removeInterceptors',
        value: function removeInterceptors(indexes) {
          var _this3 = this;

          if (Array.isArray(indexes)) {
            indexes.map(function (index) {
              return _this3.interceptors.splice(index, 1);
            });
            this.updateInterceptors();
          }
        }

        /**
         * @private
         */

      }, {
        key: 'updateInterceptors',
        value: function updateInterceptors() {
          this.reversedInterceptors = this.interceptors.reduce(function (array, interceptor) {
            return [interceptor].concat(array);
          }, []);
        }

        /**
         * remove all interceptors
         */

      }, {
        key: 'clearInterceptors',
        value: function clearInterceptors() {
          this.interceptors = [];

          this.updateInterceptors();
        }

        /**
         * @private
         */

      }, {
        key: 'interceptorWrapper',
        value: function interceptorWrapper(fetch) {
          for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          var promise = Promise.resolve(args);

          this.reversedInterceptors.forEach(function (_ref) {
            var request = _ref.request,
                requestError = _ref.requestError;

            if (request || requestError) {
              promise = promise.then(function () {
                return request.apply(undefined, args);
              }, requestError);
            }
          });

          promise = promise.then(function () {
            return fetch.apply(undefined, args);
          });

          this.reversedInterceptors.forEach(function (_ref2) {
            var response = _ref2.response,
                responseError = _ref2.responseError;

            if (response || responseError) {
              promise = promise.then(response, responseError);
            }
          });

          return promise;
        }
      }]);

      return FetchInterceptor;
    }();

    /**
     * GraphQL client with fetch api.
     * @extends FetchInterceptor
     */


    var FetchQL = function (_FetchInterceptor) {
      _inherits(FetchQL, _FetchInterceptor);

      /**
       * Create a FetchQL instance.
       * @param {Object} options
       * @param {String} options.url - the server address of GraphQL
       * @param {(Object|Object[])=} options.interceptors
       * @param {{}=} options.headers - request headers
       * @param {FetchQL~requestQueueChanged=} options.onStart - callback function of a new request queue
       * @param {FetchQL~requestQueueChanged=} options.onEnd - callback function of request queue finished
       * @param {Boolean=} options.omitEmptyVariables - remove null props(null or '') from the variables
       * @param {Object=} options.requestOptions - addition options to fetch request(refer to fetch api)
       */
      function FetchQL(_ref3) {
        var url = _ref3.url,
            interceptors = _ref3.interceptors,
            headers = _ref3.headers,
            onStart = _ref3.onStart,
            onEnd = _ref3.onEnd,
            _ref3$omitEmptyVariab = _ref3.omitEmptyVariables,
            omitEmptyVariables = _ref3$omitEmptyVariab === undefined ? false : _ref3$omitEmptyVariab,
            _ref3$requestOptions = _ref3.requestOptions,
            requestOptions = _ref3$requestOptions === undefined ? {} : _ref3$requestOptions;

        _classCallCheck(this, FetchQL);

        var _this4 = _possibleConstructorReturn(this, (FetchQL.__proto__ || Object.getPrototypeOf(FetchQL)).call(this));

        _this4.requestObject = Object.assign({}, {
          method: 'POST',
          headers: Object.assign({}, {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }, headers),
          credentials: 'same-origin'
        }, requestOptions);

        _this4.url = url;

        _this4.omitEmptyVariables = omitEmptyVariables;

        // marker for request queue
        _this4.requestQueueLength = 0;

        // using for caching enums' type
        _this4.EnumMap = {};

        _this4.callbacks = {
          onStart: onStart,
          onEnd: onEnd
        };

        _this4.addInterceptors(interceptors);
        return _this4;
      }

      /**
       * operate a query
       * @param {Object} options
       * @param {String} options.operationName
       * @param {String} options.query
       * @param {Object=} options.variables
       * @param {Object=} options.opts - addition options(will not be passed to server)
       * @param {Boolean=} options.opts.omitEmptyVariables - remove null props(null or '') from the variables
       * @param {Object=} options.requestOptions - addition options to fetch request(refer to fetch api)
       * @returns {Promise}
       * @memberOf FetchQL
       */


      _createClass(FetchQL, [{
        key: 'query',
        value: function query(_ref4) {
          var _this5 = this;

          var operationName = _ref4.operationName,
              _query = _ref4.query,
              variables = _ref4.variables,
              _ref4$opts = _ref4.opts,
              opts = _ref4$opts === undefined ? {} : _ref4$opts,
              _ref4$requestOptions = _ref4.requestOptions,
              requestOptions = _ref4$requestOptions === undefined ? {} : _ref4$requestOptions;

          var options = Object.assign({}, this.requestObject, requestOptions);
          var vars = void 0;
          if (this.omitEmptyVariables || opts.omitEmptyVariables) {
            vars = this.doOmitEmptyVariables(variables);
          } else {
            vars = variables;
          }
          var body = {
            operationName: operationName,
            query: _query,
            variables: vars
          };
          options.body = JSON.stringify(body);

          this.onStart();

          return this.fetch(this.url, options).then(function (res) {
            if (res.ok) {
              return res.json();
            }
            // return an custom error stack if request error
            return {
              errors: [{
                message: res.statusText,
                stack: res
              }]
            };
          }).then(function (_ref5) {
            var data = _ref5.data,
                errors = _ref5.errors;
            return new Promise(function (resolve, reject) {
              _this5.onEnd();

              // if data in response is 'null'
              if (!data) {
                return reject(errors || [{}]);
              }
              // if all properties of data is 'null'
              var allDataKeyEmpty = Object.keys(data).every(function (key) {
                return !data[key];
              });
              if (allDataKeyEmpty) {
                return reject(errors);
              }
              return resolve({ data: data, errors: errors });
            });
          });
        }

        /**
         * get current server address
         * @returns {String}
         * @memberOf FetchQL
         */

      }, {
        key: 'getUrl',
        value: function getUrl() {
          return this.url;
        }

        /**
         * setting a new server address
         * @param {String} url
         * @memberOf FetchQL
         */

      }, {
        key: 'setUrl',
        value: function setUrl(url) {
          this.url = url;
        }

        /**
         * get information of enum type
         * @param {String[]} EnumNameList - array of enums' name
         * @returns {Promise}
         * @memberOf FetchQL
         */

      }, {
        key: 'getEnumTypes',
        value: function getEnumTypes(EnumNameList) {
          var _this6 = this;

          var fullData = {};

          // check cache status
          var unCachedEnumList = EnumNameList.filter(function (element) {
            if (_this6.EnumMap[element]) {
              // enum has been cached
              fullData[element] = _this6.EnumMap[element];
              return false;
            }
            return true;
          });

          // immediately return the data if all enums have been cached
          if (!unCachedEnumList.length) {
            return new Promise(function (resolve) {
              resolve({ data: fullData });
            });
          }

          // build query string for uncached enums
          var EnumTypeQuery = unCachedEnumList.map(function (type) {
            return type + ': __type(name: "' + type + '") {\n        ...EnumFragment\n      }';
          });

          var query = '\n      query {\n        ' + EnumTypeQuery.join('\n') + '\n      }\n      \n      fragment EnumFragment on __Type {\n        kind\n        description\n        enumValues {\n          name\n          description\n        }\n      }';

          var options = Object.assign({}, this.requestObject);
          options.body = JSON.stringify({ query: query });

          this.onStart();

          return this.fetch(this.url, options).then(function (res) {
            if (res.ok) {
              return res.json();
            }
            // return an custom error stack if request error
            return {
              errors: [{
                message: res.statusText,
                stack: res
              }]
            };
          }).then(function (_ref6) {
            var data = _ref6.data,
                errors = _ref6.errors;
            return new Promise(function (resolve, reject) {
              _this6.onEnd();

              // if data in response is 'null' and have any errors
              if (!data) {
                return reject(errors || [{ message: 'Do not get any data.' }]);
              }
              // if all properties of data is 'null'
              var allDataKeyEmpty = Object.keys(data).every(function (key) {
                return !data[key];
              });
              if (allDataKeyEmpty && errors && errors.length) {
                return reject(errors);
              }
              // merge enums' data
              var passData = Object.assign(fullData, data);
              // cache new enums' data
              Object.keys(data).map(function (key) {
                _this6.EnumMap[key] = data[key];
                return key;
              });
              return resolve({ data: passData, errors: errors });
            });
          });
        }

        /**
         * calling on a request starting
         * if the request belong to a new queue, call the 'onStart' method
         */

      }, {
        key: 'onStart',
        value: function onStart() {
          this.requestQueueLength++;
          if (this.requestQueueLength > 1 || !this.callbacks.onStart) {
            return;
          }
          this.callbacks.onStart(this.requestQueueLength);
        }

        /**
         * calling on a request ending
         * if current queue finished, calling the 'onEnd' method
         */

      }, {
        key: 'onEnd',
        value: function onEnd() {
          this.requestQueueLength--;
          if (this.requestQueueLength || !this.callbacks.onEnd) {
            return;
          }
          this.callbacks.onEnd(this.requestQueueLength);
        }

        /**
         * Callback of requests queue changes.(e.g. new queue or queue finished)
         * @callback FetchQL~requestQueueChanged
         * @param {number} queueLength - length of current request queue
         */

        /**
         * remove empty props(null or '') from object
         * @param {Object} input
         * @returns {Object}
         * @memberOf FetchQL
         * @private
         */

      }, {
        key: 'doOmitEmptyVariables',
        value: function doOmitEmptyVariables(input) {
          var _this7 = this;

          var nonEmptyObj = {};
          Object.keys(input).map(function (key) {
            var value = input[key];
            if (typeof value === 'string' && value.length === 0 || value === null || value === undefined) {
              return key;
            } else if (value instanceof Object) {
              nonEmptyObj[key] = _this7.doOmitEmptyVariables(value);
            } else {
              nonEmptyObj[key] = value;
            }
            return key;
          });
          return nonEmptyObj;
        }
      }]);

      return FetchQL;
    }(FetchInterceptor);

    const conn$ = writable({});

    /* node_modules/svql/src/components/In.svelte generated by Svelte v3.19.1 */

    const { document: document_1 } = globals;

    function add_css$2() {
    	var style = element("style");
    	style.id = "svelte-2jw0qk-style";
    	style.textContent = ".overlay.svelte-2jw0qk{top:0;left:0;width:100%;height:100%;display:flex;position:fixed;align-items:center;justify-content:center;background-color:rgba(0, 0, 0, .3)}.wrapper.svelte-2jw0qk{background-color:white;box-shadow:0 2px 3px rgba(0, 0, 0, .2)}.loading.svelte-2jw0qk{opacity:.3;pointer-events:none}.inline.svelte-2jw0qk{display:inline-block}form.svelte-2jw0qk{padding:10px}";
    	append(document_1.head, style);
    }

    const get_after_slot_changes = dirty => ({});
    const get_after_slot_context = ctx => ({});
    const get_before_slot_changes = dirty => ({});
    const get_before_slot_context = ctx => ({});

    // (135:0) {#if visible}
    function create_if_block$3(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let form;
    	let t1;
    	let div1_class_value;
    	let current;
    	let dispose;
    	const before_slot_template = /*$$slots*/ ctx[13].before;
    	const before_slot = create_slot(before_slot_template, ctx, /*$$scope*/ ctx[12], get_before_slot_context);
    	const default_slot_template = /*$$slots*/ ctx[13].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);
    	let form_levels = [/*fixedProps*/ ctx[3]];
    	let form_data = {};

    	for (let i = 0; i < form_levels.length; i += 1) {
    		form_data = assign(form_data, form_levels[i]);
    	}

    	const after_slot_template = /*$$slots*/ ctx[13].after;
    	const after_slot = create_slot(after_slot_template, ctx, /*$$scope*/ ctx[12], get_after_slot_context);

    	return {
    		c() {
    			div1 = element("div");
    			div0 = element("div");
    			if (before_slot) before_slot.c();
    			t0 = space();
    			form = element("form");
    			if (default_slot) default_slot.c();
    			t1 = space();
    			if (after_slot) after_slot.c();
    			set_attributes(form, form_data);
    			toggle_class(form, "loading", /*$conn$*/ ctx[4].loading);
    			toggle_class(form, "svelte-2jw0qk", true);
    			attr(div0, "class", "wrapper svelte-2jw0qk");
    			attr(div1, "class", div1_class_value = "" + (null_to_empty(/*fixedClass*/ ctx[2]) + " svelte-2jw0qk"));
    			attr(div1, "role", "dialog");
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);

    			if (before_slot) {
    				before_slot.m(div0, null);
    			}

    			append(div0, t0);
    			append(div0, form);

    			if (default_slot) {
    				default_slot.m(form, null);
    			}

    			append(div0, t1);

    			if (after_slot) {
    				after_slot.m(div0, null);
    			}

    			/*div1_binding*/ ctx[14](div1);
    			current = true;

    			dispose = [
    				listen(form, "submit", prevent_default(/*handleSubmit*/ ctx[5])),
    				listen(div1, "click", /*closeMe*/ ctx[6])
    			];
    		},
    		p(ctx, dirty) {
    			if (before_slot && before_slot.p && dirty & /*$$scope*/ 4096) {
    				before_slot.p(get_slot_context(before_slot_template, ctx, /*$$scope*/ ctx[12], get_before_slot_context), get_slot_changes(before_slot_template, /*$$scope*/ ctx[12], dirty, get_before_slot_changes));
    			}

    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 4096) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[12], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[12], dirty, null));
    			}

    			set_attributes(form, get_spread_update(form_levels, [dirty & /*fixedProps*/ 8 && /*fixedProps*/ ctx[3]]));
    			toggle_class(form, "loading", /*$conn$*/ ctx[4].loading);
    			toggle_class(form, "svelte-2jw0qk", true);

    			if (after_slot && after_slot.p && dirty & /*$$scope*/ 4096) {
    				after_slot.p(get_slot_context(after_slot_template, ctx, /*$$scope*/ ctx[12], get_after_slot_context), get_slot_changes(after_slot_template, /*$$scope*/ ctx[12], dirty, get_after_slot_changes));
    			}

    			if (!current || dirty & /*fixedClass*/ 4 && div1_class_value !== (div1_class_value = "" + (null_to_empty(/*fixedClass*/ ctx[2]) + " svelte-2jw0qk"))) {
    				attr(div1, "class", div1_class_value);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(before_slot, local);
    			transition_in(default_slot, local);
    			transition_in(after_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(before_slot, local);
    			transition_out(default_slot, local);
    			transition_out(after_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div1);
    			if (before_slot) before_slot.d(detaching);
    			if (default_slot) default_slot.d(detaching);
    			if (after_slot) after_slot.d(detaching);
    			/*div1_binding*/ ctx[14](null);
    			run_all(dispose);
    		}
    	};
    }

    function create_fragment$3(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*visible*/ ctx[0] && create_if_block$3(ctx);

    	return {
    		c() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (/*visible*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    					transition_in(if_block, 1);
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    const STACK = [];
    let is;
    let t;

    function isSearch(e) {
    	return e.target.tagName === "INPUT" && e.target.type === "search";
    }

    function update$1(e) {
    	if (isSearch(e)) {
    		is = e.target.value.length === 0;
    	}
    }

    function sync(e) {
    	if (e.keyCode === 27) {
    		if (isSearch(e)) {
    			if (is) pop(e);
    		} else pop(e);
    	}
    }

    function push(el, close, current) {
    	STACK.push({ el, close, current });
    }

    function pop(e) {
    	if (!STACK.length) return;
    	const { el, close, current } = STACK[STACK.length - 1];
    	setTimeout(() => current.focus(), 60);

    	if (e instanceof KeyboardEvent) {
    		close({ target: el });
    		return;
    	}

    	clearTimeout(t);
    	t = setTimeout(() => STACK.pop(), 120);
    }

    window.addEventListener("focus", update$1);
    window.addEventListener("keyup", update$1);
    window.addEventListener("keydown", sync);

    function instance$3($$self, $$props, $$invalidate) {
    	let $conn$;
    	component_subscribe($$self, conn$, $$value => $$invalidate(4, $conn$ = $$value));
    	let ref = null;
    	let { class: cssClass = "" } = $$props;
    	let fixedClass = "";
    	let { id = "" } = $$props;
    	let { modal = false } = $$props;
    	let { visible = null } = $$props;
    	let { autofocus = false } = $$props;
    	const dispatch = createEventDispatcher();

    	function handleSubmit(e) {
    		if (e.target.checkValidity()) {
    			dispatch("submit", e);
    			pop(e);
    		}
    	}

    	function closeMe(e) {
    		if (modal && ref === e.target) {
    			dispatch("cancel", e);
    			pop(e);
    		}
    	}

    	let { $$slots = {}, $$scope } = $$props;

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(1, ref = $$value);
    		});
    	}

    	$$self.$set = $$props => {
    		if ("class" in $$props) $$invalidate(7, cssClass = $$props.class);
    		if ("id" in $$props) $$invalidate(8, id = $$props.id);
    		if ("modal" in $$props) $$invalidate(9, modal = $$props.modal);
    		if ("visible" in $$props) $$invalidate(0, visible = $$props.visible);
    		if ("autofocus" in $$props) $$invalidate(10, autofocus = $$props.autofocus);
    		if ("$$scope" in $$props) $$invalidate(12, $$scope = $$props.$$scope);
    	};

    	let fixedProps;

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*ref, visible, autofocus*/ 1027) {
    			 if (ref) {
    				if (visible === false) pop();

    				if (visible) {
    					push(ref, closeMe, document.activeElement);

    					if (autofocus) setTimeout(
    						() => {
    							const nodes = ref.querySelectorAll("input,button,textarea");

    							for (let i = 0; i < nodes.length; i += 1) {
    								if (nodes[i].getAttribute("nofocus") === "" || nodes[i].dataset.nofocus === "") continue;
    								if (nodes[i].tagName === "INPUT" && nodes[i].type === "hidden") continue;
    								if (nodes[i].readOnly || nodes[i].disabled) continue;
    								nodes[i].focus();
    								break;
    							}
    						},
    						60
    					);
    				}
    			}
    		}

    		if ($$self.$$.dirty & /*modal*/ 512) {
    			 $$invalidate(2, fixedClass = modal ? "overlay" : "inline");
    		}

    		if ($$self.$$.dirty & /*id, cssClass*/ 384) {
    			 $$invalidate(3, fixedProps = { ...id ? { id } : null, class: cssClass });
    		}
    	};

    	return [
    		visible,
    		ref,
    		fixedClass,
    		fixedProps,
    		$conn$,
    		handleSubmit,
    		closeMe,
    		cssClass,
    		id,
    		modal,
    		autofocus,
    		dispatch,
    		$$scope,
    		$$slots,
    		div1_binding
    	];
    }

    class In extends SvelteComponent {
    	constructor(options) {
    		super();
    		if (!document_1.getElementById("svelte-2jw0qk-style")) add_css$2();

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			class: 7,
    			id: 8,
    			modal: 9,
    			visible: 0,
    			autofocus: 10
    		});
    	}
    }

    /* src/web/js/lib/Modal.svelte generated by Svelte v3.19.1 */

    function create_default_slot(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[0].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 4) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[2], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null));
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function create_fragment$4(ctx) {
    	let current;

    	const in_1 = new In({
    			props: {
    				autofocus: true,
    				visible: true,
    				modal: true,
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			}
    		});

    	in_1.$on("cancel", /*cancel_handler*/ ctx[1]);

    	return {
    		c() {
    			create_component(in_1.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(in_1, target, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			const in_1_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				in_1_changes.$$scope = { dirty, ctx };
    			}

    			in_1.$set(in_1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(in_1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(in_1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(in_1, detaching);
    		}
    	};
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots = {}, $$scope } = $$props;
    	const cancel_handler = () => navigateTo("/");

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	return [$$slots, cancel_handler, $$scope];
    }

    class Modal extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});
    	}
    }

    /* src/web/js/lib/Save.svelte generated by Svelte v3.19.1 */

    function create_default_slot$1(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Not yet implemented...");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    function create_fragment$5(ctx) {
    	let current;

    	const modal = new Modal({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(modal.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(modal, target, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			const modal_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			modal.$set(modal_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(modal, detaching);
    		}
    	};
    }

    class Save extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$5, safe_not_equal, {});
    	}
    }

    /* src/web/js/lib/Gists.svelte generated by Svelte v3.19.1 */

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i][0];
    	child_ctx[11] = list[i][1];
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    // (26:2) {#if $loggedIn}
    function create_if_block$4(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*pending*/ ctx[1]) return create_if_block_1$2;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	return {
    		c() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    		},
    		p(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    // (29:4) {:else}
    function create_else_block$2(ctx) {
    	let ol;
    	let each_value = /*filtered*/ ctx[3];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	return {
    		c() {
    			ol = element("ol");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(ol, "class", "lr zb max");
    		},
    		m(target, anchor) {
    			insert(target, ol, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ol, null);
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty & /*Object, filtered, navigateTo*/ 8) {
    				each_value = /*filtered*/ ctx[3];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ol, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(ol);
    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    // (27:4) {#if pending}
    function create_if_block_1$2(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Loading gists...");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		p: noop,
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (38:14) {#each Object.entries(item.files) as [file, info]}
    function create_each_block_1(ctx) {
    	let li;
    	let a;
    	let t0_value = /*file*/ ctx[10] + "";
    	let t0;
    	let t1;
    	let t2_value = (/*info*/ ctx[11].size / 1024).toFixed(2) + "";
    	let t2;
    	let t3;
    	let a_title_value;
    	let a_href_value;
    	let t4;

    	return {
    		c() {
    			li = element("li");
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = text(" — ");
    			t2 = text(t2_value);
    			t3 = text("KB");
    			t4 = space();
    			attr(a, "class", "bl");
    			attr(a, "title", a_title_value = "Type: " + /*info*/ ctx[11].type);
    			attr(a, "target", "_blank");
    			attr(a, "href", a_href_value = /*info*/ ctx[11].raw_url);
    			attr(li, "class", "ni");
    		},
    		m(target, anchor) {
    			insert(target, li, anchor);
    			append(li, a);
    			append(a, t0);
    			append(a, t1);
    			append(a, t2);
    			append(a, t3);
    			append(li, t4);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*filtered*/ 8 && t0_value !== (t0_value = /*file*/ ctx[10] + "")) set_data(t0, t0_value);
    			if (dirty & /*filtered*/ 8 && t2_value !== (t2_value = (/*info*/ ctx[11].size / 1024).toFixed(2) + "")) set_data(t2, t2_value);

    			if (dirty & /*filtered*/ 8 && a_title_value !== (a_title_value = "Type: " + /*info*/ ctx[11].type)) {
    				attr(a, "title", a_title_value);
    			}

    			if (dirty & /*filtered*/ 8 && a_href_value !== (a_href_value = /*info*/ ctx[11].raw_url)) {
    				attr(a, "href", a_href_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(li);
    		}
    	};
    }

    // (31:8) {#each filtered as item}
    function create_each_block(ctx) {
    	let li;
    	let div;
    	let a;
    	let t0_value = (/*item*/ ctx[7].description || /*item*/ ctx[7].id) + "";
    	let t0;
    	let a_href_value;
    	let t1;
    	let button;
    	let t3;
    	let ul;
    	let t4;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[6](/*item*/ ctx[7], ...args);
    	}

    	let each_value_1 = Object.entries(/*item*/ ctx[7].files);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	return {
    		c() {
    			li = element("li");
    			div = element("div");
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			button = element("button");
    			button.textContent = "Load gist";
    			t3 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			attr(a, "class", "tdn flx-a");
    			attr(a, "target", "_blank");
    			attr(a, "href", a_href_value = /*item*/ ctx[7].html_url);
    			attr(button, "class", "bu ml nosl");
    			attr(div, "class", "flx flx-c");
    			attr(ul, "class", "ml lr");
    			attr(li, "class", "mb ni");
    		},
    		m(target, anchor) {
    			insert(target, li, anchor);
    			append(li, div);
    			append(div, a);
    			append(a, t0);
    			append(div, t1);
    			append(div, button);
    			append(li, t3);
    			append(li, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append(li, t4);
    			dispose = listen(button, "click", click_handler);
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*filtered*/ 8 && t0_value !== (t0_value = (/*item*/ ctx[7].description || /*item*/ ctx[7].id) + "")) set_data(t0, t0_value);

    			if (dirty & /*filtered*/ 8 && a_href_value !== (a_href_value = /*item*/ ctx[7].html_url)) {
    				attr(a, "href", a_href_value);
    			}

    			if (dirty & /*Object, filtered*/ 8) {
    				each_value_1 = Object.entries(/*item*/ ctx[7].files);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(li);
    			destroy_each(each_blocks, detaching);
    			dispose();
    		}
    	};
    }

    // (21:0) <Modal>
    function create_default_slot$2(ctx) {
    	let label;
    	let span;
    	let t1;
    	let input;
    	let t2;
    	let if_block_anchor;
    	let dispose;
    	let if_block = /*$loggedIn*/ ctx[2] && create_if_block$4(ctx);

    	return {
    		c() {
    			label = element("label");
    			span = element("span");
    			span.textContent = "Filter gists:";
    			t1 = space();
    			input = element("input");
    			t2 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			attr(input, "class", "f txt ml flx-a");
    			attr(input, "type", "search");
    			attr(label, "class", "mb flx flx-c nosl");
    		},
    		m(target, anchor) {
    			insert(target, label, anchor);
    			append(label, span);
    			append(label, t1);
    			append(label, input);
    			set_input_value(input, /*term*/ ctx[0]);
    			insert(target, t2, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			dispose = listen(input, "input", /*input_input_handler*/ ctx[5]);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*term*/ 1) {
    				set_input_value(input, /*term*/ ctx[0]);
    			}

    			if (/*$loggedIn*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(label);
    			if (detaching) detach(t2);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    			dispose();
    		}
    	};
    }

    function create_fragment$6(ctx) {
    	let current;

    	const modal = new Modal({
    			props: {
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(modal.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(modal, target, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			const modal_changes = {};

    			if (dirty & /*$$scope, pending, filtered, $loggedIn, term*/ 16399) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			modal.$set(modal_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(modal, detaching);
    		}
    	};
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $loggedIn;
    	component_subscribe($$self, loggedIn, $$value => $$invalidate(2, $loggedIn = $$value));
    	let term = "";
    	let data = [];
    	let pending = true;

    	onMount(async () => {
    		if ($loggedIn) $$invalidate(4, data = await all());
    		$$invalidate(1, pending = false);
    	});

    	function input_input_handler() {
    		term = this.value;
    		$$invalidate(0, term);
    	}

    	const click_handler = item => navigateTo(`/#gist/${item.id}`);
    	let filtered;

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*data, term*/ 17) {
    			 $$invalidate(3, filtered = data.filter(x => !term || x.description.toLowerCase().includes(term.toLowerCase()) || Object.keys(x.files).some(k => k.toLowerCase().includes(term.toLowerCase()))));
    		}
    	};

    	return [term, pending, $loggedIn, filtered, data, input_input_handler, click_handler];
    }

    class Gists extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$5, create_fragment$6, safe_not_equal, {});
    	}
    }

    /* src/web/js/lib/Auth.svelte generated by Svelte v3.19.1 */

    const { window: window_1 } = globals;

    function create_else_block$3(ctx) {
    	let current;

    	const link = new Link({
    			props: {
    				open: "width=400,height=640",
    				href: url(),
    				class: "a github-icon",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			}
    		});

    	link.$on("close", /*done*/ ctx[2]);

    	return {
    		c() {
    			create_component(link.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(link, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const link_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(link, detaching);
    		}
    	};
    }

    // (58:0) {#if $loggedIn}
    function create_if_block$5(ctx) {
    	let span;
    	let t0_value = (/*$session*/ ctx[1].fullname || /*$session*/ ctx[1].username) + "";
    	let t0;
    	let t1;
    	let ul;
    	let li0;
    	let t2;
    	let li1;
    	let t3;
    	let li2;
    	let t4;
    	let li3;
    	let current;

    	const link0 = new Link({
    			props: {
    				href: "/save",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			}
    		});

    	const link1 = new Link({
    			props: {
    				href: "/",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			}
    		});

    	link1.$on("click", /*add*/ ctx[4]);

    	const link2 = new Link({
    			props: {
    				href: "/gists",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			}
    		});

    	const link3 = new Link({
    			props: {
    				href: "/logout",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			}
    		});

    	link3.$on("click", /*exit*/ ctx[3]);

    	return {
    		c() {
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			ul = element("ul");
    			li0 = element("li");
    			create_component(link0.$$.fragment);
    			t2 = space();
    			li1 = element("li");
    			create_component(link1.$$.fragment);
    			t3 = space();
    			li2 = element("li");
    			create_component(link2.$$.fragment);
    			t4 = space();
    			li3 = element("li");
    			create_component(link3.$$.fragment);
    			attr(span, "class", "nosl github-icon");
    			attr(ul, "class", "lr z2 nosl menu");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t0);
    			insert(target, t1, anchor);
    			insert(target, ul, anchor);
    			append(ul, li0);
    			mount_component(link0, li0, null);
    			append(ul, t2);
    			append(ul, li1);
    			mount_component(link1, li1, null);
    			append(ul, t3);
    			append(ul, li2);
    			mount_component(link2, li2, null);
    			append(ul, t4);
    			append(ul, li3);
    			mount_component(link3, li3, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if ((!current || dirty & /*$session*/ 2) && t0_value !== (t0_value = (/*$session*/ ctx[1].fullname || /*$session*/ ctx[1].username) + "")) set_data(t0, t0_value);
    			const link0_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);
    			const link1_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);
    			const link2_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				link2_changes.$$scope = { dirty, ctx };
    			}

    			link2.$set(link2_changes);
    			const link3_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				link3_changes.$$scope = { dirty, ctx };
    			}

    			link3.$set(link3_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(link0.$$.fragment, local);
    			transition_in(link1.$$.fragment, local);
    			transition_in(link2.$$.fragment, local);
    			transition_in(link3.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			transition_out(link2.$$.fragment, local);
    			transition_out(link3.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			if (detaching) detach(t1);
    			if (detaching) detach(ul);
    			destroy_component(link0);
    			destroy_component(link1);
    			destroy_component(link2);
    			destroy_component(link3);
    		}
    	};
    }

    // (67:2) <Link open="width=400,height=640" href={url()} on:close={done} class="a github-icon">
    function create_default_slot_5(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Share link? Log in");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (61:8) <Link href="/save">
    function create_default_slot_4(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Save project...");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (62:8) <Link href="/" on:click={add}>
    function create_default_slot_3(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("New project");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (63:8) <Link href="/gists">
    function create_default_slot_2(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Schemas");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (64:8) <Link href="/logout" on:click={exit}>
    function create_default_slot_1(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Log out");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (70:0) <Router>
    function create_default_slot$3(ctx) {
    	let t;
    	let current;

    	const route0 = new Route({
    			props: { path: "/gists", component: Gists }
    		});

    	const route1 = new Route({
    			props: { path: "/save", component: Save }
    		});

    	return {
    		c() {
    			create_component(route0.$$.fragment);
    			t = space();
    			create_component(route1.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(route0, target, anchor);
    			insert(target, t, anchor);
    			mount_component(route1, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(route0, detaching);
    			if (detaching) detach(t);
    			destroy_component(route1, detaching);
    		}
    	};
    }

    function create_fragment$7(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let t;
    	let current;
    	let dispose;
    	const if_block_creators = [create_if_block$5, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$loggedIn*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const router = new Router$1({
    			props: {
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			if_block.c();
    			t = space();
    			create_component(router.$$.fragment);
    		},
    		m(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert(target, t, anchor);
    			mount_component(router, target, anchor);
    			current = true;
    			dispose = listen(window_1, "change", set);
    		},
    		p(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(t.parentNode, t);
    			}

    			const router_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach(t);
    			destroy_component(router, detaching);
    			dispose();
    		}
    	};
    }

    function set(e) {
    	if (e.target.name.indexOf("jsfOptions.") === 0 && e.target.tagName === "INPUT") {
    		const opts = window.localStorage._OPTS
    		? JSON.parse(window.localStorage._OPTS)
    		: {};

    		const key = e.target.name.split(".")[1];

    		let val = e.target.type === "checkbox"
    		? e.target.checked
    		: e.target.value;

    		if (key === "ignoreProperties") {
    			val = val.split(/\W+/);
    		}

    		opts[key] = typeof val === "string" && (/^\d+(\.\d+)?$/).test(val)
    		? parseFloat(val)
    		: val;

    		window.localStorage._OPTS = JSON.stringify(opts);
    	}
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let $loggedIn;
    	let $session;
    	let $schemas;
    	let $current;
    	component_subscribe($$self, loggedIn, $$value => $$invalidate(0, $loggedIn = $$value));
    	component_subscribe($$self, session, $$value => $$invalidate(1, $session = $$value));
    	component_subscribe($$self, schemas, $$value => $$invalidate(5, $schemas = $$value));
    	component_subscribe($$self, current, $$value => $$invalidate(6, $current = $$value));

    	function done() {
    		me().then(data => {
    			set_store_value(loggedIn, $loggedIn = true);

    			set_store_value(session, $session = {
    				username: data.login,
    				fullname: data.name
    			});

    			window.localStorage._DATA = JSON.stringify($session);
    		});
    	}

    	function exit() {
    		window.localStorage._AUTH = "";
    		set_store_value(loggedIn, $loggedIn = null);
    		navigateTo("/");
    	}

    	function add() {
    		set_store_value(schemas, $schemas = []);
    		set_store_value(current, $current = null);
    		navigateTo("/");
    	}

    	return [$loggedIn, $session, done, exit, add];
    }

    class Auth extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$6, create_fragment$7, safe_not_equal, {});
    	}
    }

    /* src/web/js/lib/Ace.svelte generated by Svelte v3.19.1 */

    function create_fragment$8(ctx) {
    	let div1;
    	let div0;
    	let div0_class_value;
    	let t;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	return {
    		c() {
    			div1 = element("div");
    			div0 = element("div");
    			t = space();
    			if (default_slot) default_slot.c();
    			attr(div0, "class", div0_class_value = "Ace " + /*cssClass*/ ctx[0]);
    			attr(div1, "class", "Ace-wrapper rel z1");
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, div0);
    			/*div0_binding*/ ctx[10](div0);
    			append(div1, t);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (!current || dirty & /*cssClass*/ 1 && div0_class_value !== (div0_class_value = "Ace " + /*cssClass*/ ctx[0])) {
    				attr(div0, "class", div0_class_value);
    			}

    			if (default_slot && default_slot.p && dirty & /*$$scope*/ 256) {
    				default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[8], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null));
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div1);
    			/*div0_binding*/ ctx[10](null);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { class: cssClass = "" } = $$props;
    	let { mode = "javascript" } = $$props;
    	let { theme = "github" } = $$props;
    	let { value = "" } = $$props;
    	let { readonly = false } = $$props;
    	let target;
    	let targetElement;
    	const dispatch = createEventDispatcher();

    	
    	onMount(() => {
    		$$invalidate(6, targetElement = ace.edit(target));
    		targetElement.session.setTabSize(2);
    		targetElement.setShowPrintMargin(false);
    		targetElement.setOption("showLineNumbers", false);
    		if (readonly) targetElement.setReadOnly(true);

    		targetElement.session.on("change", () => {
    			dispatch("change", targetElement.getValue());
    		});

    		return () => targetElement.destroy();
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(1, target = $$value);
    		});
    	}

    	$$self.$set = $$props => {
    		if ("class" in $$props) $$invalidate(0, cssClass = $$props.class);
    		if ("mode" in $$props) $$invalidate(2, mode = $$props.mode);
    		if ("theme" in $$props) $$invalidate(3, theme = $$props.theme);
    		if ("value" in $$props) $$invalidate(4, value = $$props.value);
    		if ("readonly" in $$props) $$invalidate(5, readonly = $$props.readonly);
    		if ("$$scope" in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*targetElement, value, theme, mode*/ 92) {
    			 if (targetElement) {
    				if (targetElement.getValue() !== value) {
    					targetElement.setValue(value);
    					targetElement.clearSelection();
    				}

    				targetElement.setTheme(`ace/theme/${theme}`);
    				targetElement.session.setMode(`ace/mode/${mode}`);
    			}
    		}
    	};

    	return [
    		cssClass,
    		target,
    		mode,
    		theme,
    		value,
    		readonly,
    		targetElement,
    		dispatch,
    		$$scope,
    		$$slots,
    		div0_binding
    	];
    }

    class Ace extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$7, create_fragment$8, safe_not_equal, {
    			class: 0,
    			mode: 2,
    			theme: 3,
    			value: 4,
    			readonly: 5
    		});
    	}
    }

    /* src/web/js/lib/Editor.svelte generated by Svelte v3.19.1 */

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[28] = list[i];
    	return child_ctx;
    }

    // (185:2) {:else}
    function create_else_block$4(ctx) {
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let t2;
    	let current;
    	let each_value = /*$schemas*/ ctx[7];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	function select_block_type_3(ctx, dirty) {
    		if (/*isAdding*/ ctx[1]) return create_if_block_1$3;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type_3(ctx);
    	let if_block = current_block_type(ctx);

    	const ace0 = new Ace({
    			props: {
    				mode: outputMode,
    				value: /*editInput*/ ctx[4],
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			}
    		});

    	ace0.$on("change", /*sync*/ ctx[12]);

    	const ace1 = new Ace({
    			props: {
    				mode: outputMode,
    				value: /*objectOutput*/ ctx[5],
    				readonly: true,
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			if_block.c();
    			t1 = space();
    			div1 = element("div");
    			create_component(ace0.$$.fragment);
    			t2 = space();
    			create_component(ace1.$$.fragment);
    			attr(div0, "class", "flx Tabs");
    			attr(div1, "class", "md-flx");
    		},
    		m(target, anchor) {
    			insert(target, div0, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append(div0, t0);
    			if_block.m(div0, null);
    			insert(target, t1, anchor);
    			insert(target, div1, anchor);
    			mount_component(ace0, div1, null);
    			append(div1, t2);
    			mount_component(ace1, div1, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*remove, $schemas, input, update, isEditing, select, $current*/ 1989) {
    				each_value = /*$schemas*/ ctx[7];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (current_block_type === (current_block_type = select_block_type_3(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			}

    			const ace0_changes = {};
    			if (dirty[0] & /*editInput*/ 16) ace0_changes.value = /*editInput*/ ctx[4];

    			if (dirty[1] & /*$$scope*/ 1) {
    				ace0_changes.$$scope = { dirty, ctx };
    			}

    			ace0.$set(ace0_changes);
    			const ace1_changes = {};
    			if (dirty[0] & /*objectOutput*/ 32) ace1_changes.value = /*objectOutput*/ ctx[5];

    			if (dirty[1] & /*$$scope*/ 1) {
    				ace1_changes.$$scope = { dirty, ctx };
    			}

    			ace1.$set(ace1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(ace0.$$.fragment, local);
    			transition_in(ace1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(ace0.$$.fragment, local);
    			transition_out(ace1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div0);
    			destroy_each(each_blocks, detaching);
    			if_block.d();
    			if (detaching) detach(t1);
    			if (detaching) detach(div1);
    			destroy_component(ace0);
    			destroy_component(ace1);
    		}
    	};
    }

    // (183:2) {#if pending}
    function create_if_block$6(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Loading gist...");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (204:8) {:else}
    function create_else_block_3(ctx) {
    	let button;
    	let t_value = /*info*/ ctx[28].filename + "";
    	let t;
    	let dispose;

    	function click_handler_1(...args) {
    		return /*click_handler_1*/ ctx[26](/*info*/ ctx[28], ...args);
    	}

    	return {
    		c() {
    			button = element("button");
    			t = text(t_value);
    			attr(button, "class", "a");
    		},
    		m(target, anchor) {
    			insert(target, button, anchor);
    			append(button, t);
    			dispose = listen(button, "click", click_handler_1);
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*$schemas*/ 128 && t_value !== (t_value = /*info*/ ctx[28].filename + "")) set_data(t, t_value);
    		},
    		d(detaching) {
    			if (detaching) detach(button);
    			dispose();
    		}
    	};
    }

    // (188:8) {#if $current === info}
    function create_if_block_2$1(ctx) {
    	let span;
    	let t0;
    	let button;
    	let dispose;

    	function select_block_type_2(ctx, dirty) {
    		if (/*isEditing*/ ctx[2]) return create_if_block_3$1;
    		return create_else_block_2;
    	}

    	let current_block_type = select_block_type_2(ctx);
    	let if_block = current_block_type(ctx);

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[25](/*info*/ ctx[28], ...args);
    	}

    	return {
    		c() {
    			span = element("span");
    			if_block.c();
    			t0 = space();
    			button = element("button");
    			button.textContent = "×";
    			attr(button, "class", "a nb ml");
    			attr(span, "class", "sel");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			if_block.m(span, null);
    			append(span, t0);
    			append(span, button);
    			dispose = listen(button, "click", click_handler);
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (current_block_type === (current_block_type = select_block_type_2(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(span, t0);
    				}
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			if_block.d();
    			dispose();
    		}
    	};
    }

    // (199:12) {:else}
    function create_else_block_2(ctx) {
    	let span;
    	let t_value = /*info*/ ctx[28].filename + "";
    	let t;
    	let dispose;

    	function dblclick_handler(...args) {
    		return /*dblclick_handler*/ ctx[24](/*info*/ ctx[28], ...args);
    	}

    	return {
    		c() {
    			span = element("span");
    			t = text(t_value);
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, t);
    			dispose = listen(span, "dblclick", dblclick_handler);
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*$schemas*/ 128 && t_value !== (t_value = /*info*/ ctx[28].filename + "")) set_data(t, t_value);
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			dispose();
    		}
    	};
    }

    // (190:12) {#if isEditing}
    function create_if_block_3$1(ctx) {
    	let input_1;
    	let input_1_placeholder_value;
    	let dispose;

    	return {
    		c() {
    			input_1 = element("input");
    			attr(input_1, "class", "nb");
    			attr(input_1, "type", "text");
    			attr(input_1, "spellcheck", "false");
    			attr(input_1, "placeholder", input_1_placeholder_value = /*info*/ ctx[28].filename);
    		},
    		m(target, anchor) {
    			insert(target, input_1, anchor);
    			/*input_1_binding*/ ctx[23](input_1);
    			dispose = listen(input_1, "keyup", /*update*/ ctx[10]);
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*$schemas*/ 128 && input_1_placeholder_value !== (input_1_placeholder_value = /*info*/ ctx[28].filename)) {
    				attr(input_1, "placeholder", input_1_placeholder_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(input_1);
    			/*input_1_binding*/ ctx[23](null);
    			dispose();
    		}
    	};
    }

    // (187:6) {#each $schemas as info}
    function create_each_block$1(ctx) {
    	let if_block_anchor;

    	function select_block_type_1(ctx, dirty) {
    		if (/*$current*/ ctx[6] === /*info*/ ctx[28]) return create_if_block_2$1;
    		return create_else_block_3;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type(ctx);

    	return {
    		c() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    		},
    		p(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    // (219:8) {:else}
    function create_else_block_1(ctx) {
    	let span;
    	let button;
    	let dispose;

    	return {
    		c() {
    			span = element("span");
    			button = element("button");
    			button.textContent = "Add ...";
    			attr(button, "class", "a nb nbk");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, button);
    			dispose = listen(button, "click", /*add*/ ctx[13]);
    		},
    		p: noop,
    		d(detaching) {
    			if (detaching) detach(span);
    			dispose();
    		}
    	};
    }

    // (208:8) {#if isAdding}
    function create_if_block_1$3(ctx) {
    	let span;
    	let input_1;
    	let dispose;

    	return {
    		c() {
    			span = element("span");
    			input_1 = element("input");
    			attr(input_1, "class", "nb");
    			attr(input_1, "type", "text");
    			attr(input_1, "spellcheck", "false");
    			attr(input_1, "placeholder", "Add ...");
    			attr(span, "class", "sel");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, input_1);
    			/*input_1_binding_1*/ ctx[27](input_1);
    			dispose = listen(input_1, "keyup", /*submit*/ ctx[11]);
    		},
    		p: noop,
    		d(detaching) {
    			if (detaching) detach(span);
    			/*input_1_binding_1*/ ctx[27](null);
    			dispose();
    		}
    	};
    }

    // (226:6) <Ace mode={outputMode} value={editInput} on:change={sync}>
    function create_default_slot_1$1(ctx) {
    	return { c: noop, m: noop, d: noop };
    }

    // (231:6) <Ace mode={outputMode} value={objectOutput} readonly>
    function create_default_slot$4(ctx) {
    	let span;
    	let button;
    	let dispose;

    	return {
    		c() {
    			span = element("span");
    			button = element("button");
    			button.textContent = "Generate";
    			attr(button, "class", "bu");
    			attr(span, "class", "abs r0 t0 z1");
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			append(span, button);
    			dispose = listen(button, "click", /*gen*/ ctx[14]);
    		},
    		p: noop,
    		d(detaching) {
    			if (detaching) detach(span);
    			dispose();
    		}
    	};
    }

    function create_fragment$9(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$6, create_else_block$4];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*pending*/ ctx[3]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	return {
    		c() {
    			div = element("div");
    			if_block.c();
    			attr(div, "class", "nosl");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};
    }

    let outputMode = "json";

    function validate(e) {
    	const isValid = (/^[a-zA-Z0-9_#$%][\w.]*?$/).test(e.target.value);

    	if (isValid) {
    		e.target.classList.remove("invalid");
    		return true;
    	}

    	if (!e.target.classList.contains("invalid")) {
    		e.target.classList.add("invalid");
    		return false;
    	}
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $current;
    	let $schemas;
    	component_subscribe($$self, current, $$value => $$invalidate(6, $current = $$value));
    	component_subscribe($$self, schemas, $$value => $$invalidate(7, $schemas = $$value));
    	let data;
    	let input;
    	let buffer;
    	let isAdding;
    	let isEditing;
    	let selected;
    	let value = null;
    	let isYAML = false;
    	let Encoder = JSON;
    	let pending = true;
    	let editInput = "{}";
    	let objectOutput = "{}";

    	function select(e, edit) {
    		set_store_value(current, $current = e);
    		$$invalidate(1, isAdding = false);
    		$$invalidate(2, isEditing = !!edit);

    		if (edit) {
    			setTimeout(
    				() => {
    					input.focus();
    				},
    				60
    			);
    		}
    	}

    	function remove(e) {
    		if (!confirm("Are you sure?")) return;
    		const offset = $schemas.indexOf($current);
    		buffer = $$invalidate(4, editInput = "");
    		set_store_value(schemas, $schemas = $schemas.filter(x => x !== e));
    		set_store_value(current, $current = null);
    	}

    	function update(e) {
    		if (validate(e) && e.keyCode === 13) {
    			set_store_value(current, $current.filename = e.target.value, $current);
    			$$invalidate(2, isEditing = false);
    			e.target.value = "";
    		}

    		if (e.keyCode === 27) {
    			$$invalidate(2, isEditing = false);
    		}
    	}

    	function submit(e) {
    		if (validate(e) && e.keyCode === 13) {
    			set_store_value(schemas, $schemas = $schemas.concat({
    				filename: e.target.value,
    				content: buffer
    			}));

    			set_store_value(current, $current = $schemas[$schemas.length - 1]);
    			$$invalidate(1, isAdding = false);
    			e.target.value = "";
    		}

    		if (e.keyCode === 27) {
    			set_store_value(current, $current = selected);
    			$$invalidate(1, isAdding = false);
    		}
    	}

    	// FIXME: how formatting should work?
    	// it should not affect current state, just formatting!
    	function refresh() {
    		try {
    			$$invalidate(4, editInput = JSON.stringify(JSON.parse($current.content), null, 2));
    		} catch(e) {
    			$$invalidate(4, editInput = $current.content); // if (isYAML) {
    		} // outputMode = 'json';
    	}

    	function format(e) {
    		value = Encoder.parse($current.content);
    		isYAML = e.detail;
    		refresh();
    	}

    	function sync(e) {
    		buffer = e.detail;

    		if ($current) {
    			set_store_value(current, $current.content = buffer, $current);
    		}
    	}

    	function add() {
    		buffer = $$invalidate(4, editInput = "");
    		selected = $current;
    		$$invalidate(1, isAdding = true);
    		set_store_value(current, $current = null);

    		setTimeout(
    			() => {
    				input.focus();
    			},
    			60
    		);
    	}

    	function gen() {
    		const opts = JSON.parse(window.localStorage._OPTS);
    		const value = opts.random;
    		opts.random = value ? () => value : Math.random;
    		let schema = {};
    		let refs = [];

    		try {
    			schema = Encoder.parse($current.content);
    			refs = $schemas.map(x => Encoder.parse(x.content));
    		} catch(e) {
    			
    		} // do nothing

    		JSONSchemaFaker.option(opts);

    		JSONSchemaFaker.resolve(schema, refs).then(result => {
    			$$invalidate(5, objectOutput = Encoder.stringify(result, null, 2));
    		});
    	}

    	router.subscribe(async info => {
    		if (!window.location.hash) {
    			$$invalidate(3, pending = false);
    			return;
    		}

    		data = await loadFrom(info.path.substr(1));
    		buffer = $$invalidate(4, editInput = "");
    		$$invalidate(3, pending = false);
    		$$invalidate(1, isAdding = false);
    		$$invalidate(2, isEditing = false);

    		set_store_value(schemas, $schemas = Object.keys(data.files).filter(x => data.files[x].type === "text/plain").reduce(
    			(prev, cur) => {
    				prev.push(data.files[cur]);
    				return prev;
    			},
    			[]
    		));

    		set_store_value(current, $current = $schemas[0]);
    	});

    	function input_1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(0, input = $$value);
    		});
    	}

    	const dblclick_handler = info => select(info, true);
    	const click_handler = info => remove(info);
    	const click_handler_1 = info => select(info);

    	function input_1_binding_1($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			$$invalidate(0, input = $$value);
    		});
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*$current*/ 64) {
    			 if ($current) {
    				refresh();
    			} else {
    				$$invalidate(5, objectOutput = "{}");
    				buffer = $$invalidate(4, editInput = "");
    				set_store_value(current, $current = { content: "" });
    			}
    		}
    	};

    	return [
    		input,
    		isAdding,
    		isEditing,
    		pending,
    		editInput,
    		objectOutput,
    		$current,
    		$schemas,
    		select,
    		remove,
    		update,
    		submit,
    		sync,
    		add,
    		gen,
    		data,
    		buffer,
    		selected,
    		value,
    		isYAML,
    		Encoder,
    		refresh,
    		format,
    		input_1_binding,
    		dblclick_handler,
    		click_handler,
    		click_handler_1,
    		input_1_binding_1
    	];
    }

    class Editor extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$8, create_fragment$9, safe_not_equal, {}, [-1, -1]);
    	}
    }

    // handles authoentication through github-api
    if (window.location.search.includes('?code=')) {
      document.querySelector('.loading-overlay .tac').innerText = 'Authenticating...';

      auth(window.location.search.split('?code=')[1], function () {
        var cleanUrl = window.location.href.split('?')[0];

        window.history.replaceState(null, '', cleanUrl);

        if (window.opener) {
          window.close();
        }
      });
    } else {
      setTimeout(function () {
        document.querySelector('.loading-overlay').classList.add('fade-out');
        main();
      }, 1260);
    }

    // handles optiona menu nuances
    function resetOptions() {
      window.localStorage._OPTS = JSON.stringify(JSONSchemaFaker.option.getDefaults());
    }

    function reloadOptions() {
      var options = document.querySelectorAll('[name^=jsfOptions]');
      var defaults = JSON.parse(window.localStorage._OPTS);

      for (var i = 0, c = options.length; i < c; i++) {
        var key = options[i].name.replace('jsfOptions.', '');
        var val = defaults[key];

        if (key === 'ignoreProperties') { options[i].value = val.join(', '); }
        else if (typeof val === 'boolean') { options[i].checked = val; }
        else { options[i].value = val || ''; }
      }
    }

    function main() {
      if (typeof JSONSchemaFaker !== 'undefined') {
        JSONSchemaFaker.extend('faker', function () { return window.faker; });
        JSONSchemaFaker.extend('chance', function () { return window.chance; });

        if (!window.localStorage._OPTS) {
          resetOptions();
        }
      }

      reloadOptions();

      document.querySelector('[name="jsfOptions.reset"]').addEventListener('click', function () {
        resetOptions();
        reloadOptions();
      });

      // initialize modules
      new Auth({ target: document.getElementById('auth') });
      new Editor({ target: document.getElementById('editor') });
    }

}());
