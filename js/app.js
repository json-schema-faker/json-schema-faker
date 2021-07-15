var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// node_modules/svelte/internal/index.js
var require_internal = __commonJS({
  "node_modules/svelte/internal/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function noop2() {
    }
    var identity = (x) => x;
    function assign2(tar, src) {
      for (const k in src)
        tar[k] = src[k];
      return tar;
    }
    function is_promise(value) {
      return value && typeof value === "object" && typeof value.then === "function";
    }
    function add_location(element3, file, line, column, char) {
      element3.__svelte_meta = {
        loc: { file, line, column, char }
      };
    }
    function run2(fn) {
      return fn();
    }
    function blank_object2() {
      return Object.create(null);
    }
    function run_all2(fns) {
      fns.forEach(run2);
    }
    function is_function2(thing) {
      return typeof thing === "function";
    }
    function safe_not_equal2(a, b) {
      return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
    }
    function not_equal(a, b) {
      return a != a ? b == b : a !== b;
    }
    function is_empty2(obj) {
      return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
      if (store != null && typeof store.subscribe !== "function") {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
      }
    }
    function subscribe2(store, ...callbacks) {
      if (store == null) {
        return noop2;
      }
      const unsub = store.subscribe(...callbacks);
      return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value2(store) {
      let value;
      subscribe2(store, (_) => value = _)();
      return value;
    }
    function component_subscribe2(component, store, callback) {
      component.$$.on_destroy.push(subscribe2(store, callback));
    }
    function create_slot2(definition, ctx, $$scope, fn) {
      if (definition) {
        const slot_ctx = get_slot_context2(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
      }
    }
    function get_slot_context2(definition, ctx, $$scope, fn) {
      return definition[1] && fn ? assign2($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
    }
    function get_slot_changes2(definition, $$scope, dirty, fn) {
      if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === void 0) {
          return lets;
        }
        if (typeof lets === "object") {
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
    function update_slot2(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
      const slot_changes = get_slot_changes2(slot_definition, $$scope, dirty, get_slot_changes_fn);
      if (slot_changes) {
        const slot_context = get_slot_context2(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
      }
    }
    function update_slot_spread2(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_spread_changes_fn, get_slot_context_fn) {
      const slot_changes = get_slot_spread_changes_fn(dirty) | get_slot_changes2(slot_definition, $$scope, dirty, get_slot_changes_fn);
      if (slot_changes) {
        const slot_context = get_slot_context2(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
      }
    }
    function exclude_internal_props2(props) {
      const result = {};
      for (const k in props)
        if (k[0] !== "$")
          result[k] = props[k];
      return result;
    }
    function compute_rest_props(props, keys) {
      const rest = {};
      keys = new Set(keys);
      for (const k in props)
        if (!keys.has(k) && k[0] !== "$")
          rest[k] = props[k];
      return rest;
    }
    function compute_slots(slots) {
      const result = {};
      for (const key in slots) {
        result[key] = true;
      }
      return result;
    }
    function once(fn) {
      let ran = false;
      return function(...args) {
        if (ran)
          return;
        ran = true;
        fn.call(this, ...args);
      };
    }
    function null_to_empty(value) {
      return value == null ? "" : value;
    }
    function set_store_value2(store, ret, value = ret) {
      store.set(value);
      return ret;
    }
    var has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    function action_destroyer(action_result) {
      return action_result && is_function2(action_result.destroy) ? action_result.destroy : noop2;
    }
    var is_client = typeof window !== "undefined";
    exports.now = is_client ? () => window.performance.now() : () => Date.now();
    exports.raf = is_client ? (cb) => requestAnimationFrame(cb) : noop2;
    function set_now(fn) {
      exports.now = fn;
    }
    function set_raf(fn) {
      exports.raf = fn;
    }
    var tasks2 = new Set();
    function run_tasks(now) {
      tasks2.forEach((task) => {
        if (!task.c(now)) {
          tasks2.delete(task);
          task.f();
        }
      });
      if (tasks2.size !== 0)
        exports.raf(run_tasks);
    }
    function clear_loops() {
      tasks2.clear();
    }
    function loop(callback) {
      let task;
      if (tasks2.size === 0)
        exports.raf(run_tasks);
      return {
        promise: new Promise((fulfill) => {
          tasks2.add(task = { c: callback, f: fulfill });
        }),
        abort() {
          tasks2.delete(task);
        }
      };
    }
    var is_hydrating2 = false;
    function start_hydrating2() {
      is_hydrating2 = true;
    }
    function end_hydrating2() {
      is_hydrating2 = false;
    }
    function upper_bound2(low, high, key, value) {
      while (low < high) {
        const mid = low + (high - low >> 1);
        if (key(mid) <= value) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return low;
    }
    function init_hydrate2(target) {
      if (target.hydrate_init)
        return;
      target.hydrate_init = true;
      const children3 = target.childNodes;
      const m = new Int32Array(children3.length + 1);
      const p = new Int32Array(children3.length);
      m[0] = -1;
      let longest = 0;
      for (let i = 0; i < children3.length; i++) {
        const current3 = children3[i].claim_order;
        const seqLen = upper_bound2(1, longest + 1, (idx) => children3[m[idx]].claim_order, current3) - 1;
        p[i] = m[seqLen] + 1;
        const newLen = seqLen + 1;
        m[newLen] = i;
        longest = Math.max(newLen, longest);
      }
      const lis = [];
      const toMove = [];
      let last = children3.length - 1;
      for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
        lis.push(children3[cur - 1]);
        for (; last >= cur; last--) {
          toMove.push(children3[last]);
        }
        last--;
      }
      for (; last >= 0; last--) {
        toMove.push(children3[last]);
      }
      lis.reverse();
      toMove.sort((a, b) => a.claim_order - b.claim_order);
      for (let i = 0, j = 0; i < toMove.length; i++) {
        while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
          j++;
        }
        const anchor = j < lis.length ? lis[j] : null;
        target.insertBefore(toMove[i], anchor);
      }
    }
    function append2(target, node) {
      if (is_hydrating2) {
        init_hydrate2(target);
        if (target.actual_end_child === void 0 || target.actual_end_child !== null && target.actual_end_child.parentElement !== target) {
          target.actual_end_child = target.firstChild;
        }
        if (node !== target.actual_end_child) {
          target.insertBefore(node, target.actual_end_child);
        } else {
          target.actual_end_child = node.nextSibling;
        }
      } else if (node.parentNode !== target) {
        target.appendChild(node);
      }
    }
    function insert2(target, node, anchor) {
      if (is_hydrating2 && !anchor) {
        append2(target, node);
      } else if (node.parentNode !== target || anchor && node.nextSibling !== anchor) {
        target.insertBefore(node, anchor || null);
      }
    }
    function detach2(node) {
      node.parentNode.removeChild(node);
    }
    function destroy_each2(iterations, detaching) {
      for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
          iterations[i].d(detaching);
      }
    }
    function element2(name) {
      return document.createElement(name);
    }
    function element_is(name, is2) {
      return document.createElement(name, { is: is2 });
    }
    function object_without_properties(obj, exclude) {
      const target = {};
      for (const k in obj) {
        if (has_prop(obj, k) && exclude.indexOf(k) === -1) {
          target[k] = obj[k];
        }
      }
      return target;
    }
    function svg_element2(name) {
      return document.createElementNS("http://www.w3.org/2000/svg", name);
    }
    function text2(data) {
      return document.createTextNode(data);
    }
    function space2() {
      return text2(" ");
    }
    function empty2() {
      return text2("");
    }
    function listen2(node, event, handler, options3) {
      node.addEventListener(event, handler, options3);
      return () => node.removeEventListener(event, handler, options3);
    }
    function prevent_default2(fn) {
      return function(event) {
        event.preventDefault();
        return fn.call(this, event);
      };
    }
    function stop_propagation(fn) {
      return function(event) {
        event.stopPropagation();
        return fn.call(this, event);
      };
    }
    function self(fn) {
      return function(event) {
        if (event.target === this)
          fn.call(this, event);
      };
    }
    function attr2(node, attribute, value) {
      if (value == null)
        node.removeAttribute(attribute);
      else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
    }
    function set_attributes2(node, attributes) {
      const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
      for (const key in attributes) {
        if (attributes[key] == null) {
          node.removeAttribute(key);
        } else if (key === "style") {
          node.style.cssText = attributes[key];
        } else if (key === "__value") {
          node.value = node[key] = attributes[key];
        } else if (descriptors[key] && descriptors[key].set) {
          node[key] = attributes[key];
        } else {
          attr2(node, key, attributes[key]);
        }
      }
    }
    function set_svg_attributes(node, attributes) {
      for (const key in attributes) {
        attr2(node, key, attributes[key]);
      }
    }
    function set_custom_element_data(node, prop, value) {
      if (prop in node) {
        node[prop] = typeof node[prop] === "boolean" && value === "" ? true : value;
      } else {
        attr2(node, prop, value);
      }
    }
    function xlink_attr2(node, attribute, value) {
      node.setAttributeNS("http://www.w3.org/1999/xlink", attribute, value);
    }
    function get_binding_group_value(group, __value, checked) {
      const value = new Set();
      for (let i = 0; i < group.length; i += 1) {
        if (group[i].checked)
          value.add(group[i].__value);
      }
      if (!checked) {
        value.delete(__value);
      }
      return Array.from(value);
    }
    function to_number(value) {
      return value === "" ? null : +value;
    }
    function time_ranges_to_array(ranges) {
      const array = [];
      for (let i = 0; i < ranges.length; i += 1) {
        array.push({ start: ranges.start(i), end: ranges.end(i) });
      }
      return array;
    }
    function children2(element3) {
      return Array.from(element3.childNodes);
    }
    function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
      if (nodes.claim_info === void 0) {
        nodes.claim_info = { last_index: 0, total_claimed: 0 };
      }
      const resultNode = (() => {
        for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
          const node = nodes[i];
          if (predicate(node)) {
            processNode(node);
            nodes.splice(i, 1);
            if (!dontUpdateLastIndex) {
              nodes.claim_info.last_index = i;
            }
            return node;
          }
        }
        for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
          const node = nodes[i];
          if (predicate(node)) {
            processNode(node);
            nodes.splice(i, 1);
            if (!dontUpdateLastIndex) {
              nodes.claim_info.last_index = i;
            } else {
              nodes.claim_info.last_index--;
            }
            return node;
          }
        }
        return createNode();
      })();
      resultNode.claim_order = nodes.claim_info.total_claimed;
      nodes.claim_info.total_claimed += 1;
      return resultNode;
    }
    function claim_element(nodes, name, attributes, svg) {
      return claim_node(nodes, (node) => node.nodeName === name, (node) => {
        const remove = [];
        for (let j = 0; j < node.attributes.length; j++) {
          const attribute = node.attributes[j];
          if (!attributes[attribute.name]) {
            remove.push(attribute.name);
          }
        }
        remove.forEach((v) => node.removeAttribute(v));
      }, () => svg ? svg_element2(name) : element2(name));
    }
    function claim_text(nodes, data) {
      return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
        node.data = "" + data;
      }, () => text2(data), true);
    }
    function claim_space(nodes) {
      return claim_text(nodes, " ");
    }
    function find_comment(nodes, text3, start) {
      for (let i = start; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 8 && node.textContent.trim() === text3) {
          return i;
        }
      }
      return nodes.length;
    }
    function claim_html_tag(nodes) {
      const start_index = find_comment(nodes, "HTML_TAG_START", 0);
      const end_index = find_comment(nodes, "HTML_TAG_END", start_index);
      if (start_index === end_index) {
        return new HtmlTag();
      }
      const html_tag_nodes = nodes.splice(start_index, end_index + 1);
      detach2(html_tag_nodes[0]);
      detach2(html_tag_nodes[html_tag_nodes.length - 1]);
      return new HtmlTag(html_tag_nodes.slice(1, html_tag_nodes.length - 1));
    }
    function set_data2(text3, data) {
      data = "" + data;
      if (text3.wholeText !== data)
        text3.data = data;
    }
    function set_input_value2(input, value) {
      input.value = value == null ? "" : value;
    }
    function set_input_type(input, type) {
      try {
        input.type = type;
      } catch (e) {
      }
    }
    function set_style(node, key, value, important) {
      node.style.setProperty(key, value, important ? "important" : "");
    }
    function select_option(select, value) {
      for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
          option.selected = true;
          return;
        }
      }
    }
    function select_options(select, value) {
      for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
      }
    }
    function select_value(select) {
      const selected_option = select.querySelector(":checked") || select.options[0];
      return selected_option && selected_option.__value;
    }
    function select_multiple_value(select) {
      return [].map.call(select.querySelectorAll(":checked"), (option) => option.__value);
    }
    var crossorigin;
    function is_crossorigin() {
      if (crossorigin === void 0) {
        crossorigin = false;
        try {
          if (typeof window !== "undefined" && window.parent) {
            void window.parent.document;
          }
        } catch (error) {
          crossorigin = true;
        }
      }
      return crossorigin;
    }
    function add_resize_listener(node, fn) {
      const computed_style = getComputedStyle(node);
      if (computed_style.position === "static") {
        node.style.position = "relative";
      }
      const iframe = element2("iframe");
      iframe.setAttribute("style", "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;");
      iframe.setAttribute("aria-hidden", "true");
      iframe.tabIndex = -1;
      const crossorigin2 = is_crossorigin();
      let unsubscribe;
      if (crossorigin2) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>";
        unsubscribe = listen2(window, "message", (event) => {
          if (event.source === iframe.contentWindow)
            fn();
        });
      } else {
        iframe.src = "about:blank";
        iframe.onload = () => {
          unsubscribe = listen2(iframe.contentWindow, "resize", fn);
        };
      }
      append2(node, iframe);
      return () => {
        if (crossorigin2) {
          unsubscribe();
        } else if (unsubscribe && iframe.contentWindow) {
          unsubscribe();
        }
        detach2(iframe);
      };
    }
    function toggle_class2(element3, name, toggle) {
      element3.classList[toggle ? "add" : "remove"](name);
    }
    function custom_event2(type, detail) {
      const e = document.createEvent("CustomEvent");
      e.initCustomEvent(type, false, false, detail);
      return e;
    }
    function query_selector_all(selector, parent = document.body) {
      return Array.from(parent.querySelectorAll(selector));
    }
    var HtmlTag = class {
      constructor(claimed_nodes) {
        this.e = this.n = null;
        this.l = claimed_nodes;
      }
      m(html, target, anchor = null) {
        if (!this.e) {
          this.e = element2(target.nodeName);
          this.t = target;
          if (this.l) {
            this.n = this.l;
          } else {
            this.h(html);
          }
        }
        this.i(anchor);
      }
      h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
      }
      i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
          insert2(this.t, this.n[i], anchor);
        }
      }
      p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
      }
      d() {
        this.n.forEach(detach2);
      }
    };
    function attribute_to_object(attributes) {
      const result = {};
      for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
      }
      return result;
    }
    function get_custom_elements_slots(element3) {
      const result = {};
      element3.childNodes.forEach((node) => {
        result[node.slot || "default"] = true;
      });
      return result;
    }
    var active_docs2 = new Set();
    var active = 0;
    function hash(str) {
      let hash2 = 5381;
      let i = str.length;
      while (i--)
        hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
      return hash2 >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
      const step = 16.666 / duration;
      let keyframes = "{\n";
      for (let p = 0; p <= 1; p += step) {
        const t2 = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t2, 1 - t2)}}
`;
      }
      const rule = keyframes + `100% {${fn(b, 1 - b)}}
}`;
      const name = `__svelte_${hash(rule)}_${uid}`;
      const doc = node.ownerDocument;
      active_docs2.add(doc);
      const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element2("style")).sheet);
      const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
      if (!current_rules[name]) {
        current_rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
      }
      const animation = node.style.animation || "";
      node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
      active += 1;
      return name;
    }
    function delete_rule(node, name) {
      const previous = (node.style.animation || "").split(", ");
      const next = previous.filter(name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1);
      const deleted = previous.length - next.length;
      if (deleted) {
        node.style.animation = next.join(", ");
        active -= deleted;
        if (!active)
          clear_rules();
      }
    }
    function clear_rules() {
      exports.raf(() => {
        if (active)
          return;
        active_docs2.forEach((doc) => {
          const stylesheet = doc.__svelte_stylesheet;
          let i = stylesheet.cssRules.length;
          while (i--)
            stylesheet.deleteRule(i);
          doc.__svelte_rules = {};
        });
        active_docs2.clear();
      });
    }
    function create_animation(node, from, fn, params) {
      if (!from)
        return noop2;
      const to = node.getBoundingClientRect();
      if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
        return noop2;
      const {
        delay = 0,
        duration = 300,
        easing = identity,
        start: start_time = exports.now() + delay,
        end = start_time + duration,
        tick: tick3 = noop2,
        css
      } = fn(node, { from, to }, params);
      let running = true;
      let started = false;
      let name;
      function start() {
        if (css) {
          name = create_rule(node, 0, 1, duration, delay, easing, css);
        }
        if (!delay) {
          started = true;
        }
      }
      function stop() {
        if (css)
          delete_rule(node, name);
        running = false;
      }
      loop((now) => {
        if (!started && now >= start_time) {
          started = true;
        }
        if (started && now >= end) {
          tick3(1, 0);
          stop();
        }
        if (!running) {
          return false;
        }
        if (started) {
          const p = now - start_time;
          const t2 = 0 + 1 * easing(p / duration);
          tick3(t2, 1 - t2);
        }
        return true;
      });
      start();
      tick3(0, 1);
      return stop;
    }
    function fix_position(node) {
      const style = getComputedStyle(node);
      if (style.position !== "absolute" && style.position !== "fixed") {
        const { width, height } = style;
        const a = node.getBoundingClientRect();
        node.style.position = "absolute";
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
      }
    }
    function add_transform(node, a) {
      const b = node.getBoundingClientRect();
      if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === "none" ? "" : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
      }
    }
    function set_current_component2(component) {
      exports.current_component = component;
    }
    function get_current_component2() {
      if (!exports.current_component)
        throw new Error("Function called outside component initialization");
      return exports.current_component;
    }
    function beforeUpdate2(fn) {
      get_current_component2().$$.before_update.push(fn);
    }
    function onMount2(fn) {
      get_current_component2().$$.on_mount.push(fn);
    }
    function afterUpdate2(fn) {
      get_current_component2().$$.after_update.push(fn);
    }
    function onDestroy2(fn) {
      get_current_component2().$$.on_destroy.push(fn);
    }
    function createEventDispatcher2() {
      const component = get_current_component2();
      return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
          const event = custom_event2(type, detail);
          callbacks.slice().forEach((fn) => {
            fn.call(component, event);
          });
        }
      };
    }
    function setContext2(key, context) {
      get_current_component2().$$.context.set(key, context);
    }
    function getContext2(key) {
      return get_current_component2().$$.context.get(key);
    }
    function hasContext2(key) {
      return get_current_component2().$$.context.has(key);
    }
    function bubble2(component, event) {
      const callbacks = component.$$.callbacks[event.type];
      if (callbacks) {
        callbacks.slice().forEach((fn) => fn.call(this, event));
      }
    }
    var dirty_components2 = [];
    var intros = { enabled: false };
    var binding_callbacks2 = [];
    var render_callbacks2 = [];
    var flush_callbacks2 = [];
    var resolved_promise2 = Promise.resolve();
    var update_scheduled2 = false;
    function schedule_update2() {
      if (!update_scheduled2) {
        update_scheduled2 = true;
        resolved_promise2.then(flush2);
      }
    }
    function tick2() {
      schedule_update2();
      return resolved_promise2;
    }
    function add_render_callback2(fn) {
      render_callbacks2.push(fn);
    }
    function add_flush_callback(fn) {
      flush_callbacks2.push(fn);
    }
    var flushing2 = false;
    var seen_callbacks2 = new Set();
    function flush2() {
      if (flushing2)
        return;
      flushing2 = true;
      do {
        for (let i = 0; i < dirty_components2.length; i += 1) {
          const component = dirty_components2[i];
          set_current_component2(component);
          update3(component.$$);
        }
        set_current_component2(null);
        dirty_components2.length = 0;
        while (binding_callbacks2.length)
          binding_callbacks2.pop()();
        for (let i = 0; i < render_callbacks2.length; i += 1) {
          const callback = render_callbacks2[i];
          if (!seen_callbacks2.has(callback)) {
            seen_callbacks2.add(callback);
            callback();
          }
        }
        render_callbacks2.length = 0;
      } while (dirty_components2.length);
      while (flush_callbacks2.length) {
        flush_callbacks2.pop()();
      }
      update_scheduled2 = false;
      flushing2 = false;
      seen_callbacks2.clear();
    }
    function update3($$) {
      if ($$.fragment !== null) {
        $$.update();
        run_all2($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback2);
      }
    }
    var promise;
    function wait() {
      if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
          promise = null;
        });
      }
      return promise;
    }
    function dispatch(node, direction, kind) {
      node.dispatchEvent(custom_event2(`${direction ? "intro" : "outro"}${kind}`));
    }
    var outroing2 = new Set();
    var outros2;
    function group_outros2() {
      outros2 = {
        r: 0,
        c: [],
        p: outros2
      };
    }
    function check_outros2() {
      if (!outros2.r) {
        run_all2(outros2.c);
      }
      outros2 = outros2.p;
    }
    function transition_in2(block, local) {
      if (block && block.i) {
        outroing2.delete(block);
        block.i(local);
      }
    }
    function transition_out2(block, local, detach3, callback) {
      if (block && block.o) {
        if (outroing2.has(block))
          return;
        outroing2.add(block);
        outros2.c.push(() => {
          outroing2.delete(block);
          if (callback) {
            if (detach3)
              block.d(1);
            callback();
          }
        });
        block.o(local);
      }
    }
    var null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
      let config = fn(node, params);
      let running = false;
      let animation_name;
      let task;
      let uid = 0;
      function cleanup() {
        if (animation_name)
          delete_rule(node, animation_name);
      }
      function go() {
        const { delay = 0, duration = 300, easing = identity, tick: tick3 = noop2, css } = config || null_transition;
        if (css)
          animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick3(0, 1);
        const start_time = exports.now() + delay;
        const end_time = start_time + duration;
        if (task)
          task.abort();
        running = true;
        add_render_callback2(() => dispatch(node, true, "start"));
        task = loop((now) => {
          if (running) {
            if (now >= end_time) {
              tick3(1, 0);
              dispatch(node, true, "end");
              cleanup();
              return running = false;
            }
            if (now >= start_time) {
              const t2 = easing((now - start_time) / duration);
              tick3(t2, 1 - t2);
            }
          }
          return running;
        });
      }
      let started = false;
      return {
        start() {
          if (started)
            return;
          delete_rule(node);
          if (is_function2(config)) {
            config = config();
            wait().then(go);
          } else {
            go();
          }
        },
        invalidate() {
          started = false;
        },
        end() {
          if (running) {
            cleanup();
            running = false;
          }
        }
      };
    }
    function create_out_transition(node, fn, params) {
      let config = fn(node, params);
      let running = true;
      let animation_name;
      const group = outros2;
      group.r += 1;
      function go() {
        const { delay = 0, duration = 300, easing = identity, tick: tick3 = noop2, css } = config || null_transition;
        if (css)
          animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = exports.now() + delay;
        const end_time = start_time + duration;
        add_render_callback2(() => dispatch(node, false, "start"));
        loop((now) => {
          if (running) {
            if (now >= end_time) {
              tick3(0, 1);
              dispatch(node, false, "end");
              if (!--group.r) {
                run_all2(group.c);
              }
              return false;
            }
            if (now >= start_time) {
              const t2 = easing((now - start_time) / duration);
              tick3(1 - t2, t2);
            }
          }
          return running;
        });
      }
      if (is_function2(config)) {
        wait().then(() => {
          config = config();
          go();
        });
      } else {
        go();
      }
      return {
        end(reset) {
          if (reset && config.tick) {
            config.tick(1, 0);
          }
          if (running) {
            if (animation_name)
              delete_rule(node, animation_name);
            running = false;
          }
        }
      };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
      let config = fn(node, params);
      let t2 = intro ? 0 : 1;
      let running_program = null;
      let pending_program = null;
      let animation_name = null;
      function clear_animation() {
        if (animation_name)
          delete_rule(node, animation_name);
      }
      function init3(program, duration) {
        const d = program.b - t2;
        duration *= Math.abs(d);
        return {
          a: t2,
          b: program.b,
          d,
          duration,
          start: program.start,
          end: program.start + duration,
          group: program.group
        };
      }
      function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick: tick3 = noop2, css } = config || null_transition;
        const program = {
          start: exports.now() + delay,
          b
        };
        if (!b) {
          program.group = outros2;
          outros2.r += 1;
        }
        if (running_program || pending_program) {
          pending_program = program;
        } else {
          if (css) {
            clear_animation();
            animation_name = create_rule(node, t2, b, duration, delay, easing, css);
          }
          if (b)
            tick3(0, 1);
          running_program = init3(program, duration);
          add_render_callback2(() => dispatch(node, b, "start"));
          loop((now) => {
            if (pending_program && now > pending_program.start) {
              running_program = init3(pending_program, duration);
              pending_program = null;
              dispatch(node, running_program.b, "start");
              if (css) {
                clear_animation();
                animation_name = create_rule(node, t2, running_program.b, running_program.duration, 0, easing, config.css);
              }
            }
            if (running_program) {
              if (now >= running_program.end) {
                tick3(t2 = running_program.b, 1 - t2);
                dispatch(node, running_program.b, "end");
                if (!pending_program) {
                  if (running_program.b) {
                    clear_animation();
                  } else {
                    if (!--running_program.group.r)
                      run_all2(running_program.group.c);
                  }
                }
                running_program = null;
              } else if (now >= running_program.start) {
                const p = now - running_program.start;
                t2 = running_program.a + running_program.d * easing(p / running_program.duration);
                tick3(t2, 1 - t2);
              }
            }
            return !!(running_program || pending_program);
          });
        }
      }
      return {
        run(b) {
          if (is_function2(config)) {
            wait().then(() => {
              config = config();
              go(b);
            });
          } else {
            go(b);
          }
        },
        end() {
          clear_animation();
          running_program = pending_program = null;
        }
      };
    }
    function handle_promise(promise2, info) {
      const token = info.token = {};
      function update4(type, index, key, value) {
        if (info.token !== token)
          return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== void 0) {
          child_ctx = child_ctx.slice();
          child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
          if (info.blocks) {
            info.blocks.forEach((block2, i) => {
              if (i !== index && block2) {
                group_outros2();
                transition_out2(block2, 1, 1, () => {
                  if (info.blocks[i] === block2) {
                    info.blocks[i] = null;
                  }
                });
                check_outros2();
              }
            });
          } else {
            info.block.d(1);
          }
          block.c();
          transition_in2(block, 1);
          block.m(info.mount(), info.anchor);
          needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
          info.blocks[index] = block;
        if (needs_flush) {
          flush2();
        }
      }
      if (is_promise(promise2)) {
        const current_component2 = get_current_component2();
        promise2.then((value) => {
          set_current_component2(current_component2);
          update4(info.then, 1, info.value, value);
          set_current_component2(null);
        }, (error) => {
          set_current_component2(current_component2);
          update4(info.catch, 2, info.error, error);
          set_current_component2(null);
          if (!info.hasCatch) {
            throw error;
          }
        });
        if (info.current !== info.pending) {
          update4(info.pending, 0);
          return true;
        }
      } else {
        if (info.current !== info.then) {
          update4(info.then, 1, info.value, promise2);
          return true;
        }
        info.resolved = promise2;
      }
    }
    function update_await_block_branch(info, ctx, dirty) {
      const child_ctx = ctx.slice();
      const { resolved } = info;
      if (info.current === info.then) {
        child_ctx[info.value] = resolved;
      }
      if (info.current === info.catch) {
        child_ctx[info.error] = resolved;
      }
      info.block.p(child_ctx, dirty);
    }
    var globals2 = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
    function destroy_block(block, lookup) {
      block.d(1);
      lookup.delete(block.key);
    }
    function outro_and_destroy_block(block, lookup) {
      transition_out2(block, 1, 1, () => {
        lookup.delete(block.key);
      });
    }
    function fix_and_destroy_block(block, lookup) {
      block.f();
      destroy_block(block, lookup);
    }
    function fix_and_outro_and_destroy_block(block, lookup) {
      block.f();
      outro_and_destroy_block(block, lookup);
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block3, next, get_context) {
      let o = old_blocks.length;
      let n = list.length;
      let i = o;
      const old_indexes = {};
      while (i--)
        old_indexes[old_blocks[i].key] = i;
      const new_blocks = [];
      const new_lookup = new Map();
      const deltas = new Map();
      i = n;
      while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
          block = create_each_block3(key, child_ctx);
          block.c();
        } else if (dynamic) {
          block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
          deltas.set(key, Math.abs(i - old_indexes[key]));
      }
      const will_move = new Set();
      const did_move = new Set();
      function insert3(block) {
        transition_in2(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
      }
      while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
          next = new_block.first;
          o--;
          n--;
        } else if (!new_lookup.has(old_key)) {
          destroy(old_block, lookup);
          o--;
        } else if (!lookup.has(new_key) || will_move.has(new_key)) {
          insert3(new_block);
        } else if (did_move.has(old_key)) {
          o--;
        } else if (deltas.get(new_key) > deltas.get(old_key)) {
          did_move.add(new_key);
          insert3(new_block);
        } else {
          will_move.add(old_key);
          o--;
        }
      }
      while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
          destroy(old_block, lookup);
      }
      while (n)
        insert3(new_blocks[n - 1]);
      return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
      const keys = new Set();
      for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
          throw new Error("Cannot have duplicate keys in a keyed each");
        }
        keys.add(key);
      }
    }
    function get_spread_update2(levels, updates) {
      const update4 = {};
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
              update4[key] = n[key];
              accounted_for[key] = 1;
            }
          }
          levels[i] = n;
        } else {
          for (const key in o) {
            accounted_for[key] = 1;
          }
        }
      }
      for (const key in to_null_out) {
        if (!(key in update4))
          update4[key] = void 0;
      }
      return update4;
    }
    function get_spread_object2(spread_props) {
      return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
    }
    var boolean_attributes2 = new Set([
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]);
    var invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    function spread(args, classes_to_add) {
      const attributes = Object.assign({}, ...args);
      if (classes_to_add) {
        if (attributes.class == null) {
          attributes.class = classes_to_add;
        } else {
          attributes.class += " " + classes_to_add;
        }
      }
      let str = "";
      Object.keys(attributes).forEach((name) => {
        if (invalid_attribute_name_character.test(name))
          return;
        const value = attributes[name];
        if (value === true)
          str += " " + name;
        else if (boolean_attributes2.has(name.toLowerCase())) {
          if (value)
            str += " " + name;
        } else if (value != null) {
          str += ` ${name}="${value}"`;
        }
      });
      return str;
    }
    var escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    function escape(html) {
      return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
    }
    function escape_attribute_value(value) {
      return typeof value === "string" ? escape(value) : value;
    }
    function escape_object(obj) {
      const result = {};
      for (const key in obj) {
        result[key] = escape_attribute_value(obj[key]);
      }
      return result;
    }
    function each(items, fn) {
      let str = "";
      for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
      }
      return str;
    }
    var missing_component = {
      $$render: () => ""
    };
    function validate_component(component, name) {
      if (!component || !component.$$render) {
        if (name === "svelte:component")
          name += " this={...}";
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
      }
      return component;
    }
    function debug2(file, line, column, values) {
      console.log(`{@debug} ${file ? file + " " : ""}(${line}:${column})`);
      console.log(values);
      return "";
    }
    var on_destroy;
    function create_ssr_component(fn) {
      function $$render(result, props, bindings, slots, context) {
        const parent_component = exports.current_component;
        const $$ = {
          on_destroy,
          context: new Map(parent_component ? parent_component.$$.context : context || []),
          on_mount: [],
          before_update: [],
          after_update: [],
          callbacks: blank_object2()
        };
        set_current_component2({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component2(parent_component);
        return html;
      }
      return {
        render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
          on_destroy = [];
          const result = { title: "", head: "", css: new Set() };
          const html = $$render(result, props, {}, $$slots, context);
          run_all2(on_destroy);
          return {
            html,
            css: {
              code: Array.from(result.css).map((css) => css.code).join("\n"),
              map: null
            },
            head: result.title + result.head
          };
        },
        $$render
      };
    }
    function add_attribute(name, value, boolean) {
      if (value == null || boolean && !value)
        return "";
      return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
    }
    function add_classes(classes) {
      return classes ? ` class="${classes}"` : "";
    }
    function bind(component, name, callback) {
      const index = component.$$.props[name];
      if (index !== void 0) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
      }
    }
    function create_component2(block) {
      block && block.c();
    }
    function claim_component(block, parent_nodes) {
      block && block.l(parent_nodes);
    }
    function mount_component2(component, target, anchor, customElement) {
      const { fragment, on_mount, on_destroy: on_destroy2, after_update } = component.$$;
      fragment && fragment.m(target, anchor);
      if (!customElement) {
        add_render_callback2(() => {
          const new_on_destroy = on_mount.map(run2).filter(is_function2);
          if (on_destroy2) {
            on_destroy2.push(...new_on_destroy);
          } else {
            run_all2(new_on_destroy);
          }
          component.$$.on_mount = [];
        });
      }
      after_update.forEach(add_render_callback2);
    }
    function destroy_component2(component, detaching) {
      const $$ = component.$$;
      if ($$.fragment !== null) {
        run_all2($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
      }
    }
    function make_dirty2(component, i) {
      if (component.$$.dirty[0] === -1) {
        dirty_components2.push(component);
        schedule_update2();
        component.$$.dirty.fill(0);
      }
      component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
    }
    function init2(component, options3, instance12, create_fragment13, not_equal2, props, dirty = [-1]) {
      const parent_component = exports.current_component;
      set_current_component2(component);
      const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        props,
        update: noop2,
        not_equal: not_equal2,
        bound: blank_object2(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : options3.context || []),
        callbacks: blank_object2(),
        dirty,
        skip_bound: false
      };
      let ready = false;
      $$.ctx = instance12 ? instance12(component, options3.props || {}, (i, ret, ...rest) => {
        const value = rest.length ? rest[0] : ret;
        if ($$.ctx && not_equal2($$.ctx[i], $$.ctx[i] = value)) {
          if (!$$.skip_bound && $$.bound[i])
            $$.bound[i](value);
          if (ready)
            make_dirty2(component, i);
        }
        return ret;
      }) : [];
      $$.update();
      ready = true;
      run_all2($$.before_update);
      $$.fragment = create_fragment13 ? create_fragment13($$.ctx) : false;
      if (options3.target) {
        if (options3.hydrate) {
          start_hydrating2();
          const nodes = children2(options3.target);
          $$.fragment && $$.fragment.l(nodes);
          nodes.forEach(detach2);
        } else {
          $$.fragment && $$.fragment.c();
        }
        if (options3.intro)
          transition_in2(component.$$.fragment);
        mount_component2(component, options3.target, options3.anchor, options3.customElement);
        end_hydrating2();
        flush2();
      }
      set_current_component2(parent_component);
    }
    if (typeof HTMLElement === "function") {
      exports.SvelteElement = class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback() {
          const { on_mount } = this.$$;
          this.$$.on_disconnect = on_mount.map(run2).filter(is_function2);
          for (const key in this.$$.slotted) {
            this.appendChild(this.$$.slotted[key]);
          }
        }
        attributeChangedCallback(attr3, _oldValue, newValue) {
          this[attr3] = newValue;
        }
        disconnectedCallback() {
          run_all2(this.$$.on_disconnect);
        }
        $destroy() {
          destroy_component2(this, 1);
          this.$destroy = noop2;
        }
        $on(type, callback) {
          const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
          callbacks.push(callback);
          return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
              callbacks.splice(index, 1);
          };
        }
        $set($$props) {
          if (this.$$set && !is_empty2($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
          }
        }
      };
    }
    var SvelteComponent2 = class {
      $destroy() {
        destroy_component2(this, 1);
        this.$destroy = noop2;
      }
      $on(type, callback) {
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1)
            callbacks.splice(index, 1);
        };
      }
      $set($$props) {
        if (this.$$set && !is_empty2($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    };
    function dispatch_dev(type, detail) {
      document.dispatchEvent(custom_event2(type, Object.assign({ version: "3.38.3" }, detail)));
    }
    function append_dev(target, node) {
      dispatch_dev("SvelteDOMInsert", { target, node });
      append2(target, node);
    }
    function insert_dev(target, node, anchor) {
      dispatch_dev("SvelteDOMInsert", { target, node, anchor });
      insert2(target, node, anchor);
    }
    function detach_dev(node) {
      dispatch_dev("SvelteDOMRemove", { node });
      detach2(node);
    }
    function detach_between_dev(before, after) {
      while (before.nextSibling && before.nextSibling !== after) {
        detach_dev(before.nextSibling);
      }
    }
    function detach_before_dev(after) {
      while (after.previousSibling) {
        detach_dev(after.previousSibling);
      }
    }
    function detach_after_dev(before) {
      while (before.nextSibling) {
        detach_dev(before.nextSibling);
      }
    }
    function listen_dev(node, event, handler, options3, has_prevent_default, has_stop_propagation) {
      const modifiers = options3 === true ? ["capture"] : options3 ? Array.from(Object.keys(options3)) : [];
      if (has_prevent_default)
        modifiers.push("preventDefault");
      if (has_stop_propagation)
        modifiers.push("stopPropagation");
      dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
      const dispose = listen2(node, event, handler, options3);
      return () => {
        dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
        dispose();
      };
    }
    function attr_dev(node, attribute, value) {
      attr2(node, attribute, value);
      if (value == null)
        dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
      else
        dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function prop_dev(node, property, value) {
      node[property] = value;
      dispatch_dev("SvelteDOMSetProperty", { node, property, value });
    }
    function dataset_dev(node, property, value) {
      node.dataset[property] = value;
      dispatch_dev("SvelteDOMSetDataset", { node, property, value });
    }
    function set_data_dev(text3, data) {
      data = "" + data;
      if (text3.wholeText === data)
        return;
      dispatch_dev("SvelteDOMSetData", { node: text3, data });
      text3.data = data;
    }
    function validate_each_argument(arg) {
      if (typeof arg !== "string" && !(arg && typeof arg === "object" && "length" in arg)) {
        let msg = "{#each} only iterates over array-like objects.";
        if (typeof Symbol === "function" && arg && Symbol.iterator in arg) {
          msg += " You can use a spread to convert this iterable into an array.";
        }
        throw new Error(msg);
      }
    }
    function validate_slots(name, slot, keys) {
      for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
          console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
      }
    }
    var SvelteComponentDev2 = class extends SvelteComponent2 {
      constructor(options3) {
        if (!options3 || !options3.target && !options3.$$inline) {
          throw new Error("'target' is a required option");
        }
        super();
      }
      $destroy() {
        super.$destroy();
        this.$destroy = () => {
          console.warn("Component was already destroyed");
        };
      }
      $capture_state() {
      }
      $inject_state() {
      }
    };
    var SvelteComponentTyped2 = class extends SvelteComponentDev2 {
      constructor(options3) {
        super(options3);
      }
    };
    function loop_guard(timeout) {
      const start = Date.now();
      return () => {
        if (Date.now() - start > timeout) {
          throw new Error("Infinite loop detected");
        }
      };
    }
    exports.HtmlTag = HtmlTag;
    exports.SvelteComponent = SvelteComponent2;
    exports.SvelteComponentDev = SvelteComponentDev2;
    exports.SvelteComponentTyped = SvelteComponentTyped2;
    exports.action_destroyer = action_destroyer;
    exports.add_attribute = add_attribute;
    exports.add_classes = add_classes;
    exports.add_flush_callback = add_flush_callback;
    exports.add_location = add_location;
    exports.add_render_callback = add_render_callback2;
    exports.add_resize_listener = add_resize_listener;
    exports.add_transform = add_transform;
    exports.afterUpdate = afterUpdate2;
    exports.append = append2;
    exports.append_dev = append_dev;
    exports.assign = assign2;
    exports.attr = attr2;
    exports.attr_dev = attr_dev;
    exports.attribute_to_object = attribute_to_object;
    exports.beforeUpdate = beforeUpdate2;
    exports.bind = bind;
    exports.binding_callbacks = binding_callbacks2;
    exports.blank_object = blank_object2;
    exports.bubble = bubble2;
    exports.check_outros = check_outros2;
    exports.children = children2;
    exports.claim_component = claim_component;
    exports.claim_element = claim_element;
    exports.claim_html_tag = claim_html_tag;
    exports.claim_space = claim_space;
    exports.claim_text = claim_text;
    exports.clear_loops = clear_loops;
    exports.component_subscribe = component_subscribe2;
    exports.compute_rest_props = compute_rest_props;
    exports.compute_slots = compute_slots;
    exports.createEventDispatcher = createEventDispatcher2;
    exports.create_animation = create_animation;
    exports.create_bidirectional_transition = create_bidirectional_transition;
    exports.create_component = create_component2;
    exports.create_in_transition = create_in_transition;
    exports.create_out_transition = create_out_transition;
    exports.create_slot = create_slot2;
    exports.create_ssr_component = create_ssr_component;
    exports.custom_event = custom_event2;
    exports.dataset_dev = dataset_dev;
    exports.debug = debug2;
    exports.destroy_block = destroy_block;
    exports.destroy_component = destroy_component2;
    exports.destroy_each = destroy_each2;
    exports.detach = detach2;
    exports.detach_after_dev = detach_after_dev;
    exports.detach_before_dev = detach_before_dev;
    exports.detach_between_dev = detach_between_dev;
    exports.detach_dev = detach_dev;
    exports.dirty_components = dirty_components2;
    exports.dispatch_dev = dispatch_dev;
    exports.each = each;
    exports.element = element2;
    exports.element_is = element_is;
    exports.empty = empty2;
    exports.end_hydrating = end_hydrating2;
    exports.escape = escape;
    exports.escape_attribute_value = escape_attribute_value;
    exports.escape_object = escape_object;
    exports.escaped = escaped;
    exports.exclude_internal_props = exclude_internal_props2;
    exports.fix_and_destroy_block = fix_and_destroy_block;
    exports.fix_and_outro_and_destroy_block = fix_and_outro_and_destroy_block;
    exports.fix_position = fix_position;
    exports.flush = flush2;
    exports.getContext = getContext2;
    exports.get_binding_group_value = get_binding_group_value;
    exports.get_current_component = get_current_component2;
    exports.get_custom_elements_slots = get_custom_elements_slots;
    exports.get_slot_changes = get_slot_changes2;
    exports.get_slot_context = get_slot_context2;
    exports.get_spread_object = get_spread_object2;
    exports.get_spread_update = get_spread_update2;
    exports.get_store_value = get_store_value2;
    exports.globals = globals2;
    exports.group_outros = group_outros2;
    exports.handle_promise = handle_promise;
    exports.hasContext = hasContext2;
    exports.has_prop = has_prop;
    exports.identity = identity;
    exports.init = init2;
    exports.insert = insert2;
    exports.insert_dev = insert_dev;
    exports.intros = intros;
    exports.invalid_attribute_name_character = invalid_attribute_name_character;
    exports.is_client = is_client;
    exports.is_crossorigin = is_crossorigin;
    exports.is_empty = is_empty2;
    exports.is_function = is_function2;
    exports.is_promise = is_promise;
    exports.listen = listen2;
    exports.listen_dev = listen_dev;
    exports.loop = loop;
    exports.loop_guard = loop_guard;
    exports.missing_component = missing_component;
    exports.mount_component = mount_component2;
    exports.noop = noop2;
    exports.not_equal = not_equal;
    exports.null_to_empty = null_to_empty;
    exports.object_without_properties = object_without_properties;
    exports.onDestroy = onDestroy2;
    exports.onMount = onMount2;
    exports.once = once;
    exports.outro_and_destroy_block = outro_and_destroy_block;
    exports.prevent_default = prevent_default2;
    exports.prop_dev = prop_dev;
    exports.query_selector_all = query_selector_all;
    exports.run = run2;
    exports.run_all = run_all2;
    exports.safe_not_equal = safe_not_equal2;
    exports.schedule_update = schedule_update2;
    exports.select_multiple_value = select_multiple_value;
    exports.select_option = select_option;
    exports.select_options = select_options;
    exports.select_value = select_value;
    exports.self = self;
    exports.setContext = setContext2;
    exports.set_attributes = set_attributes2;
    exports.set_current_component = set_current_component2;
    exports.set_custom_element_data = set_custom_element_data;
    exports.set_data = set_data2;
    exports.set_data_dev = set_data_dev;
    exports.set_input_type = set_input_type;
    exports.set_input_value = set_input_value2;
    exports.set_now = set_now;
    exports.set_raf = set_raf;
    exports.set_store_value = set_store_value2;
    exports.set_style = set_style;
    exports.set_svg_attributes = set_svg_attributes;
    exports.space = space2;
    exports.spread = spread;
    exports.start_hydrating = start_hydrating2;
    exports.stop_propagation = stop_propagation;
    exports.subscribe = subscribe2;
    exports.svg_element = svg_element2;
    exports.text = text2;
    exports.tick = tick2;
    exports.time_ranges_to_array = time_ranges_to_array;
    exports.to_number = to_number;
    exports.toggle_class = toggle_class2;
    exports.transition_in = transition_in2;
    exports.transition_out = transition_out2;
    exports.update_await_block_branch = update_await_block_branch;
    exports.update_keyed_each = update_keyed_each;
    exports.update_slot = update_slot2;
    exports.update_slot_spread = update_slot_spread2;
    exports.validate_component = validate_component;
    exports.validate_each_argument = validate_each_argument;
    exports.validate_each_keys = validate_each_keys;
    exports.validate_slots = validate_slots;
    exports.validate_store = validate_store;
    exports.xlink_attr = xlink_attr2;
  }
});

// node_modules/svelte/store/index.js
var require_store = __commonJS({
  "node_modules/svelte/store/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var internal = require_internal();
    var subscriber_queue2 = [];
    function readable(value, start) {
      return {
        subscribe: writable2(value, start).subscribe
      };
    }
    function writable2(value, start = internal.noop) {
      let stop;
      const subscribers = [];
      function set(new_value) {
        if (internal.safe_not_equal(value, new_value)) {
          value = new_value;
          if (stop) {
            const run_queue = !subscriber_queue2.length;
            for (let i = 0; i < subscribers.length; i += 1) {
              const s = subscribers[i];
              s[1]();
              subscriber_queue2.push(s, value);
            }
            if (run_queue) {
              for (let i = 0; i < subscriber_queue2.length; i += 2) {
                subscriber_queue2[i][0](subscriber_queue2[i + 1]);
              }
              subscriber_queue2.length = 0;
            }
          }
        }
      }
      function update3(fn) {
        set(fn(value));
      }
      function subscribe2(run2, invalidate = internal.noop) {
        const subscriber = [run2, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
          stop = start(set) || internal.noop;
        }
        run2(value);
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
      return { set, update: update3, subscribe: subscribe2 };
    }
    function derived(stores, fn, initial_value) {
      const single = !Array.isArray(stores);
      const stores_array = single ? [stores] : stores;
      const auto = fn.length < 2;
      return readable(initial_value, (set) => {
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = internal.noop;
        const sync2 = () => {
          if (pending) {
            return;
          }
          cleanup();
          const result = fn(single ? values[0] : values, set);
          if (auto) {
            set(result);
          } else {
            cleanup = internal.is_function(result) ? result : internal.noop;
          }
        };
        const unsubscribers = stores_array.map((store, i) => internal.subscribe(store, (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (inited) {
            sync2();
          }
        }, () => {
          pending |= 1 << i;
        }));
        inited = true;
        sync2();
        return function stop() {
          internal.run_all(unsubscribers);
          cleanup();
        };
      });
    }
    Object.defineProperty(exports, "get", {
      enumerable: true,
      get: function() {
        return internal.get_store_value;
      }
    });
    exports.derived = derived;
    exports.readable = readable;
    exports.writable = writable2;
  }
});

// src/web/js/lib/gists.js
var require_gists = __commonJS({
  "src/web/js/lib/gists.js"(exports, module) {
    var { writable: writable2 } = require_store();
    var BASE_URL = "https://github.com";
    var API_URL = "https://api.github.com";
    var AUTH_ID = "fcfd0d144cddb6b070e7";
    var AUTH_SECRET = "2aaeecfab4de40d4db3fa7e7cc7466750a51dcdb";
    var PROXY_URL = "https://cors-anywhere.herokuapp.com/";
    var data = window.localStorage._DATA;
    var loggedIn3 = writable2(!!data);
    var session2 = writable2(data ? JSON.parse(data) : {});
    var schemas3 = writable2([]);
    var current3 = writable2({});
    var options3 = writable2(null);
    function getUrl(x, path, params) {
      const url22 = `${x}${path}?client_id=${AUTH_ID}&client_secret=${AUTH_SECRET}`;
      const redirect = `redirect_uri=${encodeURIComponent(`${location.protocol}//${location.host}/`)}`;
      return params ? `${url22}&${Object.keys(params).map((k) => `${k}=${params[k]}`).join("&")}&${redirect}` : `${url22}${params !== false ? `&${redirect}` : ""}`;
    }
    function getJSON(path, params, _options) {
      return fetch(`${PROXY_URL}${getUrl(API_URL, path, _options)}`, {
        ...params,
        headers: {
          Authorization: `bearer ${window.localStorage._AUTH}`
        }
      }).then((res) => res.json());
    }
    function loadFrom2(uri) {
      const tmp = uri.replace("#", "").split("/");
      if (tmp.length === 1) {
        return Promise.resolve({
          files: {
            "schema.json": {
              content: decodeURIComponent(tmp[0])
            }
          }
        });
      }
      const [type, hash] = tmp;
      switch (type) {
        case "gist":
          return fetch(getUrl(API_URL, `/gists/${hash}`)).then((res) => res.json());
        case "uri":
          return Promise.resolve({
            files: {
              Example: {
                content: decodeURIComponent(hash)
              }
            }
          });
        default:
          throw new Error("Unknown storage type");
      }
    }
    function save(schemas22) {
      const _files = {
        "_options.json": {
          content: JSON.stringify($options)
        }
      };
      Object.keys(schemas22).forEach((key) => {
        _files[key] = { content: schemas22[key].value };
      });
      const url22 = getUrl(API_URL, "/gists", false);
      const fixedUrl = `${PROXY_URL}${url22}`;
      return fetch(fixedUrl, {
        method: "POST",
        headers: {
          Authorization: `bearer ${tokenId}`,
          Accept: "application/json"
        },
        body: JSON.stringify({
          description: "Schemas created by http://json-schema-faker.js.org",
          files: _files
        })
      }).then((res) => res.json()).then((data2) => {
        if (data2.message) {
          throw new Error(data2.message);
        }
        return data2;
      });
    }
    function auth2(tokenId2, callback) {
      window.localStorage._AUTH = "";
      const url22 = getUrl(BASE_URL, "/login/oauth/access_token", {
        code: tokenId2
      });
      fetch(`${PROXY_URL}${url22}`, {
        method: "POST",
        headers: {
          Accept: "application/json"
        }
      }).then((res) => res.json()).then((result) => {
        if (result.access_token) {
          window.localStorage._AUTH = result.access_token;
          setTimeout(callback, 120);
        }
      });
    }
    function url2() {
      return getUrl(BASE_URL, "/login/oauth/authorize", {
        scope: "gist,read:user"
      });
    }
    function all2() {
      return getJSON("/gists");
    }
    function me2() {
      return getJSON("/user");
    }
    Object.assign(module.exports, { API_URL, BASE_URL, all: all2, auth: auth2, current: current3, getJSON, getUrl, loadFrom: loadFrom2, loggedIn: loggedIn3, me: me2, options: options3, save, schemas: schemas3, session: session2, url: url2 });
  }
});

// src/web/js/app.js
var import_gists5 = __toModule(require_gists());

// node_modules/svelte/internal/index.mjs
function noop() {
}
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
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
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
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
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
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
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
  const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function update_slot_spread(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_spread_changes_fn, get_slot_context_fn) {
  const slot_changes = get_slot_spread_changes_fn(dirty) | get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function exclude_internal_props(props) {
  const result = {};
  for (const k in props)
    if (k[0] !== "$")
      result[k] = props[k];
  return result;
}
function set_store_value(store, ret, value = ret) {
  store.set(value);
  return ret;
}
var tasks = new Set();
var is_hydrating = false;
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function upper_bound(low, high, key, value) {
  while (low < high) {
    const mid = low + (high - low >> 1);
    if (key(mid) <= value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
function init_hydrate(target) {
  if (target.hydrate_init)
    return;
  target.hydrate_init = true;
  const children2 = target.childNodes;
  const m = new Int32Array(children2.length + 1);
  const p = new Int32Array(children2.length);
  m[0] = -1;
  let longest = 0;
  for (let i = 0; i < children2.length; i++) {
    const current3 = children2[i].claim_order;
    const seqLen = upper_bound(1, longest + 1, (idx) => children2[m[idx]].claim_order, current3) - 1;
    p[i] = m[seqLen] + 1;
    const newLen = seqLen + 1;
    m[newLen] = i;
    longest = Math.max(newLen, longest);
  }
  const lis = [];
  const toMove = [];
  let last = children2.length - 1;
  for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
    lis.push(children2[cur - 1]);
    for (; last >= cur; last--) {
      toMove.push(children2[last]);
    }
    last--;
  }
  for (; last >= 0; last--) {
    toMove.push(children2[last]);
  }
  lis.reverse();
  toMove.sort((a, b) => a.claim_order - b.claim_order);
  for (let i = 0, j = 0; i < toMove.length; i++) {
    while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
      j++;
    }
    const anchor = j < lis.length ? lis[j] : null;
    target.insertBefore(toMove[i], anchor);
  }
}
function append(target, node) {
  if (is_hydrating) {
    init_hydrate(target);
    if (target.actual_end_child === void 0 || target.actual_end_child !== null && target.actual_end_child.parentElement !== target) {
      target.actual_end_child = target.firstChild;
    }
    if (node !== target.actual_end_child) {
      target.insertBefore(node, target.actual_end_child);
    } else {
      target.actual_end_child = node.nextSibling;
    }
  } else if (node.parentNode !== target) {
    target.appendChild(node);
  }
}
function insert(target, node, anchor) {
  if (is_hydrating && !anchor) {
    append(target, node);
  } else if (node.parentNode !== target || anchor && node.nextSibling !== anchor) {
    target.insertBefore(node, anchor || null);
  }
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
function svg_element(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options3) {
  node.addEventListener(event, handler, options3);
  return () => node.removeEventListener(event, handler, options3);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
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
  const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
  for (const key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === "style") {
      node.style.cssText = attributes[key];
    } else if (key === "__value") {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}
function xlink_attr(node, attribute, value) {
  node.setAttributeNS("http://www.w3.org/1999/xlink", attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function toggle_class(element2, name, toggle) {
  element2.classList[toggle ? "add" : "remove"](name);
}
function custom_event(type, detail) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, false, false, detail);
  return e;
}
var active_docs = new Set();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
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
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
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
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
var flushing = false;
var seen_callbacks = new Set();
function flush() {
  if (flushing)
    return;
  flushing = true;
  do {
    for (let i = 0; i < dirty_components.length; i += 1) {
      const component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
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
var outroing = new Set();
var outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
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
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
function get_spread_update(levels, updates) {
  const update3 = {};
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
          update3[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update3))
      update3[key] = void 0;
  }
  return update3;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, on_mount, on_destroy, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
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
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options3, instance12, create_fragment13, not_equal, props, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : options3.context || []),
    callbacks: blank_object(),
    dirty,
    skip_bound: false
  };
  let ready = false;
  $$.ctx = instance12 ? instance12(component, options3.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment13 ? create_fragment13($$.ctx) : false;
  if (options3.target) {
    if (options3.hydrate) {
      start_hydrating();
      const nodes = children(options3.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options3.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options3.target, options3.anchor, options3.customElement);
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const { on_mount } = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr2, _oldValue, newValue) {
      this[attr2] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}
var SvelteComponent = class {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
};

// node_modules/svelte/store/index.mjs
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
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
  function update3(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
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
  return { set, update: update3, subscribe: subscribe2 };
}

// node_modules/yrv/build/dist/lib/vendor.js
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf2 = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __markAsModule2 = (target) => __defProp2(target, "__esModule", { value: true });
var __commonJS2 = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport2 = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames2(module))
      if (!__hasOwnProp2.call(target, key) && key !== "default")
        __defProp2(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc2(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule2 = (module) => {
  return __reExport2(__markAsModule2(__defProp2(module != null ? __create2(__getProtoOf2(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};
var require_strict_uri_encode = __commonJS2({
  "node_modules/strict-uri-encode/index.js"(exports, module) {
    "use strict";
    module.exports = (str) => encodeURIComponent(str).replace(/[!'()*]/g, (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);
  }
});
var require_decode_uri_component = __commonJS2({
  "node_modules/decode-uri-component/index.js"(exports, module) {
    "use strict";
    var token = "%[a-f0-9]{2}";
    var singleMatcher = new RegExp(token, "gi");
    var multiMatcher = new RegExp("(" + token + ")+", "gi");
    function decodeComponents(components, split) {
      try {
        return decodeURIComponent(components.join(""));
      } catch (err) {
      }
      if (components.length === 1) {
        return components;
      }
      split = split || 1;
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
          input = decodeComponents(tokens, i).join("");
          tokens = input.match(singleMatcher);
        }
        return input;
      }
    }
    function customDecodeURIComponent(input) {
      var replaceMap = {
        "%FE%FF": "\uFFFD\uFFFD",
        "%FF%FE": "\uFFFD\uFFFD"
      };
      var match = multiMatcher.exec(input);
      while (match) {
        try {
          replaceMap[match[0]] = decodeURIComponent(match[0]);
        } catch (err) {
          var result = decode(match[0]);
          if (result !== match[0]) {
            replaceMap[match[0]] = result;
          }
        }
        match = multiMatcher.exec(input);
      }
      replaceMap["%C2"] = "\uFFFD";
      var entries = Object.keys(replaceMap);
      for (var i = 0; i < entries.length; i++) {
        var key = entries[i];
        input = input.replace(new RegExp(key, "g"), replaceMap[key]);
      }
      return input;
    }
    module.exports = function(encodedURI) {
      if (typeof encodedURI !== "string") {
        throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof encodedURI + "`");
      }
      try {
        encodedURI = encodedURI.replace(/\+/g, " ");
        return decodeURIComponent(encodedURI);
      } catch (err) {
        return customDecodeURIComponent(encodedURI);
      }
    };
  }
});
var require_split_on_first = __commonJS2({
  "node_modules/split-on-first/index.js"(exports, module) {
    "use strict";
    module.exports = (string, separator) => {
      if (!(typeof string === "string" && typeof separator === "string")) {
        throw new TypeError("Expected the arguments to be of type `string`");
      }
      if (separator === "") {
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
  }
});
var require_query_string = __commonJS2({
  "node_modules/query-string/index.js"(exports) {
    "use strict";
    var strictUriEncode = require_strict_uri_encode();
    var decodeComponent = require_decode_uri_component();
    var splitOnFirst = require_split_on_first();
    function encoderForArrayFormat(options3) {
      switch (options3.arrayFormat) {
        case "index":
          return (key) => (result, value) => {
            const index = result.length;
            if (value === void 0) {
              return result;
            }
            if (value === null) {
              return [...result, [encode(key, options3), "[", index, "]"].join("")];
            }
            return [
              ...result,
              [encode(key, options3), "[", encode(index, options3), "]=", encode(value, options3)].join("")
            ];
          };
        case "bracket":
          return (key) => (result, value) => {
            if (value === void 0) {
              return result;
            }
            if (value === null) {
              return [...result, [encode(key, options3), "[]"].join("")];
            }
            return [...result, [encode(key, options3), "[]=", encode(value, options3)].join("")];
          };
        case "comma":
          return (key) => (result, value, index) => {
            if (value === null || value === void 0 || value.length === 0) {
              return result;
            }
            if (index === 0) {
              return [[encode(key, options3), "=", encode(value, options3)].join("")];
            }
            return [[result, encode(value, options3)].join(",")];
          };
        default:
          return (key) => (result, value) => {
            if (value === void 0) {
              return result;
            }
            if (value === null) {
              return [...result, encode(key, options3)];
            }
            return [...result, [encode(key, options3), "=", encode(value, options3)].join("")];
          };
      }
    }
    function parserForArrayFormat(options3) {
      let result;
      switch (options3.arrayFormat) {
        case "index":
          return (key, value, accumulator) => {
            result = /\[(\d*)\]$/.exec(key);
            key = key.replace(/\[\d*\]$/, "");
            if (!result) {
              accumulator[key] = value;
              return;
            }
            if (accumulator[key] === void 0) {
              accumulator[key] = {};
            }
            accumulator[key][result[1]] = value;
          };
        case "bracket":
          return (key, value, accumulator) => {
            result = /(\[\])$/.exec(key);
            key = key.replace(/\[\]$/, "");
            if (!result) {
              accumulator[key] = value;
              return;
            }
            if (accumulator[key] === void 0) {
              accumulator[key] = [value];
              return;
            }
            accumulator[key] = [].concat(accumulator[key], value);
          };
        case "comma":
          return (key, value, accumulator) => {
            const isArray = typeof value === "string" && value.split("").indexOf(",") > -1;
            const newValue = isArray ? value.split(",") : value;
            accumulator[key] = newValue;
          };
        default:
          return (key, value, accumulator) => {
            if (accumulator[key] === void 0) {
              accumulator[key] = value;
              return;
            }
            accumulator[key] = [].concat(accumulator[key], value);
          };
      }
    }
    function encode(value, options3) {
      if (options3.encode) {
        return options3.strict ? strictUriEncode(value) : encodeURIComponent(value);
      }
      return value;
    }
    function decode(value, options3) {
      if (options3.decode) {
        return decodeComponent(value);
      }
      return value;
    }
    function keysSorter(input) {
      if (Array.isArray(input)) {
        return input.sort();
      }
      if (typeof input === "object") {
        return keysSorter(Object.keys(input)).sort((a, b) => Number(a) - Number(b)).map((key) => input[key]);
      }
      return input;
    }
    function removeHash(input) {
      const hashStart = input.indexOf("#");
      if (hashStart !== -1) {
        input = input.slice(0, hashStart);
      }
      return input;
    }
    function extract(input) {
      input = removeHash(input);
      const queryStart = input.indexOf("?");
      if (queryStart === -1) {
        return "";
      }
      return input.slice(queryStart + 1);
    }
    function parseValue(value, options3) {
      if (options3.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === "string" && value.trim() !== "")) {
        value = Number(value);
      } else if (options3.parseBooleans && value !== null && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
        value = value.toLowerCase() === "true";
      }
      return value;
    }
    function parse2(input, options3) {
      options3 = Object.assign({
        decode: true,
        sort: true,
        arrayFormat: "none",
        parseNumbers: false,
        parseBooleans: false
      }, options3);
      const formatter = parserForArrayFormat(options3);
      const ret = Object.create(null);
      if (typeof input !== "string") {
        return ret;
      }
      input = input.trim().replace(/^[?#&]/, "");
      if (!input) {
        return ret;
      }
      for (const param of input.split("&")) {
        let [key, value] = splitOnFirst(param.replace(/\+/g, " "), "=");
        value = value === void 0 ? null : decode(value, options3);
        formatter(decode(key, options3), value, ret);
      }
      for (const key of Object.keys(ret)) {
        const value = ret[key];
        if (typeof value === "object" && value !== null) {
          for (const k of Object.keys(value)) {
            value[k] = parseValue(value[k], options3);
          }
        } else {
          ret[key] = parseValue(value, options3);
        }
      }
      if (options3.sort === false) {
        return ret;
      }
      return (options3.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options3.sort)).reduce((result, key) => {
        const value = ret[key];
        if (Boolean(value) && typeof value === "object" && !Array.isArray(value)) {
          result[key] = keysSorter(value);
        } else {
          result[key] = value;
        }
        return result;
      }, Object.create(null));
    }
    exports.extract = extract;
    exports.parse = parse2;
    exports.stringify = (object, options3) => {
      if (!object) {
        return "";
      }
      options3 = Object.assign({
        encode: true,
        strict: true,
        arrayFormat: "none"
      }, options3);
      const formatter = encoderForArrayFormat(options3);
      const keys = Object.keys(object);
      if (options3.sort !== false) {
        keys.sort(options3.sort);
      }
      return keys.map((key) => {
        const value = object[key];
        if (value === void 0) {
          return "";
        }
        if (value === null) {
          return encode(key, options3);
        }
        if (Array.isArray(value)) {
          return value.reduce(formatter(key), []).join("&");
        }
        return encode(key, options3) + "=" + encode(value, options3);
      }).filter((x) => x.length > 0).join("&");
    };
    exports.parseUrl = (input, options3) => {
      return {
        url: removeHash(input).split("?")[0] || "",
        query: parse2(extract(input), options3)
      };
    };
  }
});
var require_dist = __commonJS2({
  "node_modules/abstract-nested-router/dist/index.js"(exports, module) {
    "use strict";
    var defaultExport = /* @__PURE__ */ function(Error2) {
      function defaultExport2(route, path) {
        var message = "Unreachable '" + (route !== "/" ? route.replace(/\/$/, "") : route) + "', segment '" + path + "' is not defined";
        Error2.call(this, message);
        this.message = message;
        this.route = route;
        this.path = path;
      }
      if (Error2)
        defaultExport2.__proto__ = Error2;
      defaultExport2.prototype = Object.create(Error2 && Error2.prototype);
      defaultExport2.prototype.constructor = defaultExport2;
      return defaultExport2;
    }(Error);
    function buildMatcher(path, parent) {
      var regex;
      var _isSplat;
      var _priority = -100;
      var keys = [];
      regex = path.replace(/[-$.]/g, "\\$&").replace(/\(/g, "(?:").replace(/\)/g, ")?").replace(/([:*]\w+)(?:<([^<>]+?)>)?/g, function(_, key, expr) {
        keys.push(key.substr(1));
        if (key.charAt() === ":") {
          _priority += 100;
          return "((?!#)" + (expr || "[^#/]+?") + ")";
        }
        _isSplat = true;
        _priority += 500;
        return "((?!#)" + (expr || "[^#]+?") + ")";
      });
      try {
        regex = new RegExp("^" + regex + "$");
      } catch (e) {
        throw new TypeError("Invalid route expression, given '" + parent + "'");
      }
      var _hashed = path.includes("#") ? 0.5 : 1;
      var _depth = path.length * _priority * _hashed;
      return {
        keys,
        regex,
        _depth,
        _isSplat
      };
    }
    var PathMatcher = function PathMatcher2(path, parent) {
      var ref = buildMatcher(path, parent);
      var keys = ref.keys;
      var regex = ref.regex;
      var _depth = ref._depth;
      var _isSplat = ref._isSplat;
      return {
        _isSplat,
        _depth,
        match: function(value) {
          var matches = value.match(regex);
          if (matches) {
            return keys.reduce(function(prev, cur, i) {
              prev[cur] = typeof matches[i + 1] === "string" ? decodeURIComponent(matches[i + 1]) : null;
              return prev;
            }, {});
          }
        }
      };
    };
    PathMatcher.push = function push2(key, prev, leaf, parent) {
      var root = prev[key] || (prev[key] = {});
      if (!root.pattern) {
        root.pattern = new PathMatcher(key, parent);
        root.route = (leaf || "").replace(/\/$/, "") || "/";
      }
      prev.keys = prev.keys || [];
      if (!prev.keys.includes(key)) {
        prev.keys.push(key);
        PathMatcher.sort(prev);
      }
      return root;
    };
    PathMatcher.sort = function sort(root) {
      root.keys.sort(function(a, b) {
        return root[a].pattern._depth - root[b].pattern._depth;
      });
    };
    function merge(path, parent) {
      return "" + (parent && parent !== "/" ? parent : "") + (path || "");
    }
    function walk(path, cb) {
      var matches = path.match(/<[^<>]*\/[^<>]*>/);
      if (matches) {
        throw new TypeError("RegExp cannot contain slashes, given '" + matches + "'");
      }
      var parts = path.split(/(?=\/|#)/);
      var root = [];
      if (parts[0] !== "/") {
        parts.unshift("/");
      }
      parts.some(function(x, i) {
        var parent = root.slice(1).concat(x).join("") || null;
        var segment = parts.slice(i + 1).join("") || null;
        var retval = cb(x, parent, segment ? "" + (x !== "/" ? x : "") + segment : null);
        root.push(x);
        return retval;
      });
    }
    function reduce(key, root, _seen) {
      var params = {};
      var out = [];
      var splat;
      walk(key, function(x, leaf, extra) {
        var found;
        if (!root.keys) {
          throw new defaultExport(key, x);
        }
        root.keys.some(function(k) {
          if (_seen.includes(k)) {
            return false;
          }
          var ref = root[k].pattern;
          var match = ref.match;
          var _isSplat = ref._isSplat;
          var matches = match(_isSplat ? extra || x : x);
          if (matches) {
            Object.assign(params, matches);
            if (root[k].route) {
              var routeInfo2 = Object.assign({}, root[k].info);
              var hasMatch = false;
              if (routeInfo2.exact) {
                hasMatch = extra === null;
              } else {
                hasMatch = !(x && leaf === null) || x === leaf || _isSplat || !extra;
              }
              routeInfo2.matches = hasMatch;
              routeInfo2.params = Object.assign({}, params);
              routeInfo2.route = root[k].route;
              routeInfo2.path = _isSplat && extra || leaf || x;
              out.push(routeInfo2);
            }
            if (extra === null && !root[k].keys) {
              return true;
            }
            if (k !== "/") {
              _seen.push(k);
            }
            splat = _isSplat;
            root = root[k];
            found = true;
            return true;
          }
          return false;
        });
        if (!(found || root.keys.some(function(k) {
          return root[k].pattern.match(x);
        }))) {
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
    function add(path, routes, parent, routeInfo2) {
      var fullpath = merge(path, parent);
      var root = routes;
      var key;
      if (routeInfo2 && routeInfo2.nested !== true) {
        key = routeInfo2.key;
        delete routeInfo2.key;
      }
      walk(fullpath, function(x, leaf) {
        root = PathMatcher.push(x, root, leaf, fullpath);
        if (x !== "/") {
          root.info = root.info || Object.assign({}, routeInfo2);
        }
      });
      root.info = root.info || Object.assign({}, routeInfo2);
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
      walk(fullpath, function(x) {
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
        leaf = routes["/"];
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
      if (root.route === leaf.route && (!root.info || root.info.key === leaf.info.key)) {
        delete leaf.info;
      }
    }
    var Router2 = function Router22() {
      var routes = {};
      var stack = [];
      return {
        resolve: function(path, cb) {
          var url2 = path.split("?")[0];
          var seen = [];
          walk(url2, function(x, leaf, extra) {
            try {
              cb(null, find(leaf, routes, 1).filter(function(r) {
                if (!seen.includes(r.path)) {
                  seen.push(r.path);
                  return true;
                }
                return false;
              }));
            } catch (e) {
              cb(e, []);
            }
          });
        },
        mount: function(path, cb) {
          if (path !== "/") {
            stack.push(path);
          }
          cb();
          stack.pop();
        },
        find: function(path, retries) {
          return find(path, routes, retries === true ? 2 : retries || 1);
        },
        add: function(path, routeInfo2) {
          return add(path, routes, stack.join(""), routeInfo2);
        },
        rm: function(path) {
          return rm(path, routes, stack.join(""));
        }
      };
    };
    Router2.matches = function matches(uri, path) {
      return buildMatcher(uri, path).regex.test(path);
    };
    module.exports = Router2;
  }
});
var import_query_string = __toModule2(require_query_string());
var import_abstract_nested_router = __toModule2(require_dist());
var export_Router = import_abstract_nested_router.default;
var export_parse = import_query_string.parse;
var export_stringify = import_query_string.stringify;

// node_modules/yrv/build/dist/lib/utils.js
var cache = {};
var baseTag = document.getElementsByTagName("base");
var basePrefix = baseTag[0] && baseTag[0].href || "/";
var ROOT_URL = basePrefix.replace(window.location.origin, "");
var router = writable({
  path: "/",
  query: {},
  params: {},
  initial: true
});
var CTX_ROUTER = {};
var CTX_ROUTE = {};
var HASHCHANGE = window.location.origin === "null";
function hashchangeEnable(value) {
  if (typeof value === "boolean") {
    HASHCHANGE = !!value;
  }
  return HASHCHANGE;
}
function fixedLocation(path, callback, doFinally) {
  const baseUri = HASHCHANGE ? window.location.hash.replace("#", "") : window.location.pathname;
  if (path.charAt() !== "/") {
    path = baseUri + path;
  }
  const currentURL2 = baseUri + window.location.hash + window.location.search;
  if (currentURL2 !== path) {
    callback(path);
  }
  if (typeof doFinally === "function") {
    doFinally();
  }
}
function cleanPath(uri, fix) {
  return uri !== "/" || fix ? uri.replace(/\/$/, "") : uri;
}
function navigateTo(path, options3) {
  const {
    reload,
    replace,
    params,
    queryParams
  } = options3 || {};
  if (!path || typeof path !== "string" || path[0] !== "/" && path[0] !== "#") {
    throw new Error(`Expecting '/${path}' or '#${path}', given '${path}'`);
  }
  if (params) {
    path = path.replace(/:([a-zA-Z][a-zA-Z0-9_-]*)/g, (_, key) => params[key]);
  }
  if (queryParams) {
    const qs = export_stringify(queryParams);
    if (qs) {
      path += `?${qs}`;
    }
  }
  if (HASHCHANGE) {
    let fixedURL = path.replace(/^#|#$/g, "");
    if (ROOT_URL !== "/") {
      fixedURL = fixedURL.replace(cleanPath(ROOT_URL), "");
    }
    window.location.hash = fixedURL !== "/" ? fixedURL : "";
    return;
  }
  if (reload || !window.history.pushState || !window.dispatchEvent) {
    window.location.href = path;
    return;
  }
  fixedLocation(path, (nextURL) => {
    window.history[replace ? "replaceState" : "pushState"](null, "", nextURL);
    window.dispatchEvent(new Event("popstate"));
  });
}
function getProps(given, required) {
  const { props: sub, ...others } = given;
  required.forEach((k) => {
    delete others[k];
  });
  return {
    ...sub,
    ...others
  };
}
function isActive(uri, path, exact) {
  if (!cache[[uri, path, exact]]) {
    if (exact !== true && path.indexOf(uri) === 0) {
      cache[[uri, path, exact]] = /^[#/?]?$/.test(path.substr(uri.length, 1));
    } else if (uri.includes("*") || uri.includes(":")) {
      cache[[uri, path, exact]] = export_Router.matches(uri, path);
    } else {
      cache[[uri, path, exact]] = cleanPath(path) === uri;
    }
  }
  return cache[[uri, path, exact]];
}
function isPromise(object) {
  return object && typeof object.then === "function";
}
function isSvelteComponent(object) {
  return object && object.prototype;
}

// node_modules/yrv/build/dist/lib/router.js
var baseRouter = new export_Router();
var routeInfo = writable({});
var onError = {};
var shared = {};
var errors = [];
var routers = 0;
var interval;
var currentURL;
router.subscribe((value) => {
  shared.router = value;
});
routeInfo.subscribe((value) => {
  shared.routeInfo = value;
});
function doFallback(failure, fallback) {
  routeInfo.update((defaults) => ({
    ...defaults,
    [fallback]: {
      ...shared.router,
      failure
    }
  }));
}
function handleRoutes(map, params) {
  const keys = [];
  map.some((x) => {
    if (x.key && x.matches && !shared.routeInfo[x.key]) {
      if (x.redirect && (x.condition === null || x.condition(shared.router) !== true)) {
        if (x.exact && shared.router.path !== x.path)
          return false;
        navigateTo(x.redirect);
        return true;
      }
      if (x.exact) {
        keys.push(x.key);
      }
      Object.assign(params, x.params);
      routeInfo.update((defaults) => ({
        ...defaults,
        [x.key]: {
          ...shared.router,
          ...x
        }
      }));
    }
    return false;
  });
  return keys;
}
function evtHandler() {
  let baseUri = !HASHCHANGE ? window.location.href.replace(window.location.origin, "") : window.location.hash || "/";
  let failure;
  if (ROOT_URL !== "/") {
    baseUri = baseUri.replace(cleanPath(ROOT_URL), "");
  }
  if (/^#[\w-]+$/.test(window.location.hash) && document.querySelector(window.location.hash) && currentURL === baseUri.split("#")[0])
    return;
  const [fixedUri, qs] = baseUri.replace("/#", "#").replace(/^#\//, "/").split("?");
  const fullpath = fixedUri.replace(/\/?$/, "/");
  const query = export_parse(qs);
  const params = {};
  const keys = [];
  routeInfo.set({});
  if (currentURL !== baseUri) {
    currentURL = baseUri;
    router.set({
      path: cleanPath(fullpath),
      query,
      params
    });
  }
  baseRouter.resolve(fullpath, (err, result) => {
    if (err) {
      failure = err;
      return;
    }
    keys.push(...handleRoutes(result, params));
  });
  const toDelete = {};
  if (failure && failure.path !== "/") {
    keys.reduce((prev, cur) => {
      prev[cur] = null;
      return prev;
    }, toDelete);
  } else {
    failure = null;
  }
  errors.forEach((cb) => cb());
  errors = [];
  try {
    baseRouter.find(cleanPath(fullpath)).forEach((sub) => {
      if (sub.exact && !sub.matches) {
        toDelete[sub.key] = null;
      }
    });
  } catch (e) {
  }
  routeInfo.update((defaults) => ({
    ...defaults,
    ...toDelete
  }));
  let fallback;
  Object.keys(onError).forEach((root) => {
    if (isActive(root, fullpath, false)) {
      const fn = onError[root].callback;
      fn(failure);
      errors.push(fn);
    }
    if (!fallback && onError[root].fallback) {
      fallback = onError[root].fallback;
    }
  });
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
    window.addEventListener("popstate", findRoutes, false);
  }
  if (!onError[root] || fallback) {
    onError[root] = { fallback, callback };
  }
  routers += 1;
  return () => {
    routers -= 1;
    if (!routers) {
      window.removeEventListener("popstate", findRoutes, false);
    }
  };
}

// node_modules/yrv/build/dist/lib/Router.svelte
function create_if_block(ctx) {
  let current3;
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[6], null);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current3 = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current3 || dirty & 64)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[6], !current3 ? -1 : dirty, null, null);
        }
      }
    },
    i(local) {
      if (current3)
        return;
      transition_in(default_slot, local);
      current3 = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current3 = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment(ctx) {
  let if_block_anchor;
  let current3;
  let if_block = !ctx[0] && create_if_block(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current3 = true;
    },
    p(ctx2, [dirty]) {
      if (!ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
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
      if (current3)
        return;
      transition_in(if_block);
      current3 = true;
    },
    o(local) {
      transition_out(if_block);
      current3 = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function unassignRoute(route) {
  try {
    baseRouter.rm(route);
  } catch (e) {
  }
  findRoutes();
}
function instance($$self, $$props, $$invalidate) {
  let $basePath;
  let $router;
  component_subscribe($$self, router, ($$value) => $$invalidate(5, $router = $$value));
  let { $$slots: slots = {}, $$scope } = $$props;
  let cleanup;
  let failure;
  let fallback;
  let { path = "/" } = $$props;
  let { pending = null } = $$props;
  let { disabled = false } = $$props;
  let { condition = null } = $$props;
  const routerContext = getContext(CTX_ROUTER);
  const basePath = routerContext ? routerContext.basePath : writable(path);
  component_subscribe($$self, basePath, (value) => $$invalidate(11, $basePath = value));
  const fixedRoot = $basePath !== path && $basePath !== "/" ? `${$basePath}${path !== "/" ? path : ""}` : path;
  function assignRoute(key, route, detail) {
    key = key || Math.random().toString(36).substr(2);
    const nested = !route.substr(1).includes("/");
    const handler = { key, nested, ...detail };
    let fullpath;
    baseRouter.mount(fixedRoot, () => {
      fullpath = baseRouter.add(route, handler);
      fallback = handler.fallback && key || fallback;
    });
    findRoutes();
    return [key, fullpath];
  }
  function onError2(err) {
    failure = err;
    if (failure && fallback) {
      doFallback(failure, fallback);
    }
  }
  onMount(() => {
    cleanup = addRouter(fixedRoot, fallback, onError2);
  });
  onDestroy(() => {
    if (cleanup)
      cleanup();
  });
  setContext(CTX_ROUTER, {
    basePath,
    assignRoute,
    unassignRoute,
    pendingComponent: pending
  });
  $$self.$$set = ($$props2) => {
    if ("path" in $$props2)
      $$invalidate(2, path = $$props2.path);
    if ("pending" in $$props2)
      $$invalidate(3, pending = $$props2.pending);
    if ("disabled" in $$props2)
      $$invalidate(0, disabled = $$props2.disabled);
    if ("condition" in $$props2)
      $$invalidate(4, condition = $$props2.condition);
    if ("$$scope" in $$props2)
      $$invalidate(6, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 48) {
      $:
        if (condition) {
          $$invalidate(0, disabled = !condition($router));
        }
    }
  };
  return [disabled, basePath, path, pending, condition, $router, $$scope, slots];
}
var Router = class extends SvelteComponent {
  constructor(options3) {
    super();
    init(this, options3, instance, create_fragment, safe_not_equal, {
      path: 2,
      pending: 3,
      disabled: 0,
      condition: 4
    });
  }
};
var Router_default = Router;

// node_modules/yrv/build/dist/lib/Route.svelte
var get_default_slot_spread_changes = (dirty) => dirty & 8 > 0 ? -1 : 0;
var get_default_slot_changes = (dirty) => ({});
var get_default_slot_context = (ctx) => ({ ...ctx[3] });
function create_if_block2(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current3;
  const if_block_creators = [create_if_block_1, create_if_block_5, create_else_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (!ctx2[4])
      return 0;
    if (ctx2[0])
      return 1;
    return 2;
  }
  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current3 = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current3)
        return;
      transition_in(if_block);
      current3 = true;
    },
    o(local) {
      transition_out(if_block);
      current3 = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block_1(ctx) {
  let current3;
  const default_slot_template = ctx[16].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[15], get_default_slot_context);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current3 = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current3 || dirty & 32776)) {
          update_slot_spread(default_slot, default_slot_template, ctx2, ctx2[15], !current3 ? -1 : dirty, get_default_slot_changes, get_default_slot_spread_changes, get_default_slot_context);
        }
      }
    },
    i(local) {
      if (current3)
        return;
      transition_in(default_slot, local);
      current3 = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current3 = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block_5(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current3;
  const switch_instance_spread_levels = [ctx[3]];
  var switch_value = ctx[0];
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert(target, switch_instance_anchor, anchor);
      current3 = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 8 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[3])]) : {};
      if (switch_value !== (switch_value = ctx2[0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
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
      if (current3)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block_1(ctx) {
  let if_block_anchor;
  let current3;
  let if_block = (ctx[1] || ctx[5]) && create_if_block_2(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current3 = true;
    },
    p(ctx2, dirty) {
      if (ctx2[1] || ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_2(ctx2);
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
      if (current3)
        return;
      transition_in(if_block);
      current3 = true;
    },
    o(local) {
      transition_out(if_block);
      current3 = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_2(ctx) {
  let show_if;
  let show_if_1;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current3;
  const if_block_creators = [create_if_block_3, create_if_block_4, create_else_block];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (dirty & 2)
      show_if = !!isSvelteComponent(ctx2[1]);
    if (show_if)
      return 0;
    if (show_if_1 == null)
      show_if_1 = !!isSvelteComponent(ctx2[5]);
    if (show_if_1)
      return 1;
    return 2;
  }
  current_block_type_index = select_block_type_1(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current3 = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current3)
        return;
      transition_in(if_block);
      current3 = true;
    },
    o(local) {
      transition_out(if_block);
      current3 = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block(ctx) {
  let t_value = (ctx[1] || ctx[5]) + "";
  let t2;
  return {
    c() {
      t2 = text(t_value);
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && t_value !== (t_value = (ctx2[1] || ctx2[5]) + ""))
        set_data(t2, t_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t2);
    }
  };
}
function create_if_block_4(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current3;
  const switch_instance_spread_levels = [ctx[3]];
  var switch_value = ctx[5];
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert(target, switch_instance_anchor, anchor);
      current3 = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 8 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[3])]) : {};
      if (switch_value !== (switch_value = ctx2[5])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
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
      if (current3)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block_3(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current3;
  const switch_instance_spread_levels = [ctx[3]];
  var switch_value = ctx[1];
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert(target, switch_instance_anchor, anchor);
      current3 = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 8 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[3])]) : {};
      if (switch_value !== (switch_value = ctx2[1])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
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
      if (current3)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_fragment2(ctx) {
  let if_block_anchor;
  let current3;
  let if_block = ctx[2] && create_if_block2(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current3 = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[2]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 4) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block2(ctx2);
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
      if (current3)
        return;
      transition_in(if_block);
      current3 = true;
    },
    o(local) {
      transition_out(if_block);
      current3 = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance2($$self, $$props, $$invalidate) {
  let $routePath;
  let $routeInfo;
  component_subscribe($$self, routeInfo, ($$value) => $$invalidate(14, $routeInfo = $$value));
  let { $$slots: slots = {}, $$scope } = $$props;
  let { key = null } = $$props;
  let { path = "/" } = $$props;
  let { exact = null } = $$props;
  let { pending = null } = $$props;
  let { disabled = false } = $$props;
  let { fallback = null } = $$props;
  let { component = null } = $$props;
  let { condition = null } = $$props;
  let { redirect = null } = $$props;
  const thisProps = [
    "key",
    "path",
    "exact",
    "pending",
    "disabled",
    "fallback",
    "component",
    "condition",
    "redirect"
  ];
  const routeContext = getContext(CTX_ROUTE);
  const routerContext = getContext(CTX_ROUTER);
  const { assignRoute, unassignRoute: unassignRoute2, pendingComponent } = routerContext || {};
  const routePath = routeContext ? routeContext.routePath : writable(path);
  component_subscribe($$self, routePath, (value) => $$invalidate(18, $routePath = value));
  let activeRouter = null;
  let activeProps = {};
  let fullpath;
  let hasLoaded;
  const fixedRoot = $routePath !== path && $routePath !== "/" ? `${$routePath}${path !== "/" ? path : ""}` : path;
  function resolve() {
    const fixedRoute = path !== fixedRoot && fixedRoot.substr(-1) !== "/" ? `${fixedRoot}/` : fixedRoot;
    $$invalidate(7, [key, fullpath] = assignRoute(key, fixedRoute, { condition, redirect, fallback, exact }), key);
  }
  resolve();
  onDestroy(() => {
    if (unassignRoute2) {
      unassignRoute2(fullpath);
    }
  });
  setContext(CTX_ROUTE, { routePath });
  $$self.$$set = ($$new_props) => {
    $$invalidate(26, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("key" in $$new_props)
      $$invalidate(7, key = $$new_props.key);
    if ("path" in $$new_props)
      $$invalidate(8, path = $$new_props.path);
    if ("exact" in $$new_props)
      $$invalidate(9, exact = $$new_props.exact);
    if ("pending" in $$new_props)
      $$invalidate(1, pending = $$new_props.pending);
    if ("disabled" in $$new_props)
      $$invalidate(10, disabled = $$new_props.disabled);
    if ("fallback" in $$new_props)
      $$invalidate(11, fallback = $$new_props.fallback);
    if ("component" in $$new_props)
      $$invalidate(0, component = $$new_props.component);
    if ("condition" in $$new_props)
      $$invalidate(12, condition = $$new_props.condition);
    if ("redirect" in $$new_props)
      $$invalidate(13, redirect = $$new_props.redirect);
    if ("$$scope" in $$new_props)
      $$invalidate(15, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $:
      if (key) {
        $$invalidate(2, activeRouter = !disabled && $routeInfo[key]);
        $$invalidate(3, activeProps = getProps($$props, thisProps));
        $$invalidate(3, activeProps.router = activeRouter, activeProps);
      }
    if ($$self.$$.dirty & 5) {
      $:
        if (activeRouter) {
          if (!component) {
            $$invalidate(4, hasLoaded = true);
          } else if (isSvelteComponent(component)) {
            $$invalidate(4, hasLoaded = true);
          } else if (isPromise(component)) {
            component.then((module) => {
              $$invalidate(0, component = module.default);
              $$invalidate(4, hasLoaded = true);
            });
          } else {
            component().then((module) => {
              $$invalidate(0, component = module.default);
              $$invalidate(4, hasLoaded = true);
            });
          }
        }
    }
  };
  $$props = exclude_internal_props($$props);
  return [
    component,
    pending,
    activeRouter,
    activeProps,
    hasLoaded,
    pendingComponent,
    routePath,
    key,
    path,
    exact,
    disabled,
    fallback,
    condition,
    redirect,
    $routeInfo,
    $$scope,
    slots
  ];
}
var Route = class extends SvelteComponent {
  constructor(options3) {
    super();
    init(this, options3, instance2, create_fragment2, safe_not_equal, {
      key: 7,
      path: 8,
      exact: 9,
      pending: 1,
      disabled: 10,
      fallback: 11,
      component: 0,
      condition: 12,
      redirect: 13
    });
  }
};
var Route_default = Route;

// node_modules/yrv/build/dist/lib/Link.svelte
function create_else_block2(ctx) {
  let a;
  let a_href_value;
  let current3;
  let mounted;
  let dispose;
  const default_slot_template = ctx[17].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[16], null);
  let a_levels = [
    ctx[6],
    {
      href: a_href_value = cleanPath(ctx[5] || ctx[1])
    },
    { class: ctx[0] },
    { title: ctx[2] }
  ];
  let a_data = {};
  for (let i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }
  return {
    c() {
      a = element("a");
      if (default_slot)
        default_slot.c();
      set_attributes(a, a_data);
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if (default_slot) {
        default_slot.m(a, null);
      }
      ctx[19](a);
      current3 = true;
      if (!mounted) {
        dispose = listen(a, "click", ctx[8]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current3 || dirty & 65536)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[16], !current3 ? -1 : dirty, null, null);
        }
      }
      set_attributes(a, a_data = get_spread_update(a_levels, [
        dirty & 64 && ctx2[6],
        (!current3 || dirty & 34 && a_href_value !== (a_href_value = cleanPath(ctx2[5] || ctx2[1]))) && { href: a_href_value },
        (!current3 || dirty & 1) && { class: ctx2[0] },
        (!current3 || dirty & 4) && { title: ctx2[2] }
      ]));
    },
    i(local) {
      if (current3)
        return;
      transition_in(default_slot, local);
      current3 = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current3 = false;
    },
    d(detaching) {
      if (detaching)
        detach(a);
      if (default_slot)
        default_slot.d(detaching);
      ctx[19](null);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block3(ctx) {
  let button_1;
  let current3;
  let mounted;
  let dispose;
  const default_slot_template = ctx[17].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[16], null);
  let button_1_levels = [
    ctx[6],
    { class: ctx[0] },
    { title: ctx[2] }
  ];
  let button_1_data = {};
  for (let i = 0; i < button_1_levels.length; i += 1) {
    button_1_data = assign(button_1_data, button_1_levels[i]);
  }
  return {
    c() {
      button_1 = element("button");
      if (default_slot)
        default_slot.c();
      set_attributes(button_1, button_1_data);
    },
    m(target, anchor) {
      insert(target, button_1, anchor);
      if (default_slot) {
        default_slot.m(button_1, null);
      }
      ctx[18](button_1);
      current3 = true;
      if (!mounted) {
        dispose = listen(button_1, "click", ctx[7]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current3 || dirty & 65536)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[16], !current3 ? -1 : dirty, null, null);
        }
      }
      set_attributes(button_1, button_1_data = get_spread_update(button_1_levels, [
        dirty & 64 && ctx2[6],
        (!current3 || dirty & 1) && { class: ctx2[0] },
        (!current3 || dirty & 4) && { title: ctx2[2] }
      ]));
    },
    i(local) {
      if (current3)
        return;
      transition_in(default_slot, local);
      current3 = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current3 = false;
    },
    d(detaching) {
      if (detaching)
        detach(button_1);
      if (default_slot)
        default_slot.d(detaching);
      ctx[18](null);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment3(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current3;
  const if_block_creators = [create_if_block3, create_else_block2];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[3])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current3 = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current3)
        return;
      transition_in(if_block);
      current3 = true;
    },
    o(local) {
      transition_out(if_block);
      current3 = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance3($$self, $$props, $$invalidate) {
  let fixedProps;
  let $router;
  component_subscribe($$self, router, ($$value) => $$invalidate(15, $router = $$value));
  let { $$slots: slots = {}, $$scope } = $$props;
  let ref;
  let active;
  let { class: cssClass = "" } = $$props;
  let fixedHref = null;
  let { go = null } = $$props;
  let { open = null } = $$props;
  let { href = "" } = $$props;
  let { title = "" } = $$props;
  let { button = false } = $$props;
  let { exact = false } = $$props;
  let { reload = false } = $$props;
  let { replace = false } = $$props;
  const thisProps = ["go", "open", "href", "class", "title", "button", "exact", "reload", "replace"];
  const dispatch = createEventDispatcher();
  function handleOnClick(e) {
    e.preventDefault();
    if (typeof go === "string" && window.history.length > 1) {
      if (go === "back")
        window.history.back();
      else if (go === "fwd")
        window.history.forward();
      else
        window.history.go(parseInt(go, 10));
      return;
    }
    if (!fixedHref && href !== "") {
      if (open) {
        let specs = typeof open === "string" ? open : "";
        const wmatch = specs.match(/width=(\d+)/);
        const hmatch = specs.match(/height=(\d+)/);
        if (wmatch)
          specs += `,left=${(window.screen.width - wmatch[1]) / 2}`;
        if (hmatch)
          specs += `,top=${(window.screen.height - hmatch[1]) / 2}`;
        if (wmatch && !hmatch) {
          specs += `,height=${wmatch[1]},top=${(window.screen.height - wmatch[1]) / 2}`;
        }
        const w = window.open(href, "", specs);
        const t2 = setInterval(() => {
          if (w.closed) {
            dispatch("close");
            clearInterval(t2);
          }
        }, 120);
      } else
        window.location.href = href;
      return;
    }
    fixedLocation(href, () => {
      navigateTo(fixedHref || "/", { reload, replace });
    }, () => dispatch("click", e));
  }
  function handleAnchorOnClick(e) {
    if (e.metaKey || e.ctrlKey || e.button !== 0) {
      return;
    }
    handleOnClick(e);
  }
  function button_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      ref = $$value;
      $$invalidate(4, ref);
    });
  }
  function a_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      ref = $$value;
      $$invalidate(4, ref);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$invalidate(22, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("class" in $$new_props)
      $$invalidate(0, cssClass = $$new_props.class);
    if ("go" in $$new_props)
      $$invalidate(9, go = $$new_props.go);
    if ("open" in $$new_props)
      $$invalidate(10, open = $$new_props.open);
    if ("href" in $$new_props)
      $$invalidate(1, href = $$new_props.href);
    if ("title" in $$new_props)
      $$invalidate(2, title = $$new_props.title);
    if ("button" in $$new_props)
      $$invalidate(3, button = $$new_props.button);
    if ("exact" in $$new_props)
      $$invalidate(11, exact = $$new_props.exact);
    if ("reload" in $$new_props)
      $$invalidate(12, reload = $$new_props.reload);
    if ("replace" in $$new_props)
      $$invalidate(13, replace = $$new_props.replace);
    if ("$$scope" in $$new_props)
      $$invalidate(16, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 2) {
      $:
        if (!/^(\w+:)?\/\//.test(href)) {
          $$invalidate(5, fixedHref = cleanPath(ROOT_URL, true) + cleanPath(HASHCHANGE ? `#${href}` : href));
        }
    }
    if ($$self.$$.dirty & 51226) {
      $:
        if (ref && $router.path) {
          if (isActive(href, $router.path, exact)) {
            if (!active) {
              $$invalidate(14, active = true);
              ref.setAttribute("aria-current", "page");
              if (button) {
                ref.setAttribute("disabled", true);
              }
            }
          } else if (active) {
            $$invalidate(14, active = false);
            ref.removeAttribute("disabled");
            ref.removeAttribute("aria-current");
          }
        }
    }
    $:
      $$invalidate(6, fixedProps = getProps($$props, thisProps));
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
    handleOnClick,
    handleAnchorOnClick,
    go,
    open,
    exact,
    reload,
    replace,
    active,
    $router,
    $$scope,
    slots,
    button_1_binding,
    a_binding
  ];
}
var Link = class extends SvelteComponent {
  constructor(options3) {
    super();
    init(this, options3, instance3, create_fragment3, safe_not_equal, {
      class: 0,
      go: 9,
      open: 10,
      href: 1,
      title: 2,
      button: 3,
      exact: 11,
      reload: 12,
      replace: 13
    });
  }
};
var Link_default = Link;

// node_modules/yrv/build/dist/index.js
Object.defineProperty(Router_default, "hashchange", {
  set: (value) => hashchangeEnable(value),
  get: () => hashchangeEnable(),
  configurable: false,
  enumerable: false
});

// src/web/js/lib/Auth.svelte
var import_gists3 = __toModule(require_gists());

// src/web/js/lib/Icon.svelte
function create_fragment4(ctx) {
  let svg;
  let use;
  let use_xlink_href_value;
  return {
    c() {
      svg = svg_element("svg");
      use = svg_element("use");
      xlink_attr(use, "xlink:href", use_xlink_href_value = "#icon-" + ctx[0]);
      attr(svg, "width", ctx[1]);
      attr(svg, "height", ctx[1]);
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, use);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1 && use_xlink_href_value !== (use_xlink_href_value = "#icon-" + ctx2[0])) {
        xlink_attr(use, "xlink:href", use_xlink_href_value);
      }
      if (dirty & 2) {
        attr(svg, "width", ctx2[1]);
      }
      if (dirty & 2) {
        attr(svg, "height", ctx2[1]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(svg);
    }
  };
}
function instance4($$self, $$props, $$invalidate) {
  let { name = null } = $$props;
  let { size = 16 } = $$props;
  $$self.$$set = ($$props2) => {
    if ("name" in $$props2)
      $$invalidate(0, name = $$props2.name);
    if ("size" in $$props2)
      $$invalidate(1, size = $$props2.size);
  };
  return [name, size];
}
var Icon = class extends SvelteComponent {
  constructor(options3) {
    super();
    init(this, options3, instance4, create_fragment4, safe_not_equal, { name: 0, size: 1 });
  }
};
var Icon_default = Icon;

// node_modules/smoo/build/components/Fence.svelte
var { document: document_1 } = globals;
function add_css() {
  var style = element("style");
  style.id = "svelte-1fad9tz-style";
  style.textContent = ".smoo-fence--overlay.svelte-1fad9tz{top:0;left:0;width:100%;height:100%;z-index:1;display:flex;position:fixed;align-items:center;justify-content:center;background-color:rgba(0, 0, 0, .3)}.smoo-fence--wrapper.svelte-1fad9tz{background-color:white;box-shadow:0 2px 3px rgba(0, 0, 0, .2)}.smoo-fence--loading.svelte-1fad9tz{opacity:.3;pointer-events:none}.smoo-fence--inline.svelte-1fad9tz{display:inline-block}.smoo-fence--form.svelte-1fad9tz{padding:10px}";
  append(document_1.head, style);
}
var get_after_slot_changes = (dirty) => ({});
var get_after_slot_context = (ctx) => ({});
var get_main_slot_changes = (dirty) => ({ props: dirty & 32 });
var get_main_slot_context = (ctx) => ({ props: ctx[5] });
var get_before_slot_changes = (dirty) => ({});
var get_before_slot_context = (ctx) => ({});
function create_if_block4(ctx) {
  let div1;
  let div0;
  let t0;
  let t1;
  let t2;
  let div1_class_value;
  let current3;
  let mounted;
  let dispose;
  const before_slot_template = ctx[13].before;
  const before_slot = create_slot(before_slot_template, ctx, ctx[12], get_before_slot_context);
  const main_slot_template = ctx[13].main;
  const main_slot = create_slot(main_slot_template, ctx, ctx[12], get_main_slot_context);
  let if_block = !ctx[0] && create_if_block_12(ctx);
  const after_slot_template = ctx[13].after;
  const after_slot = create_slot(after_slot_template, ctx, ctx[12], get_after_slot_context);
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      if (before_slot)
        before_slot.c();
      t0 = space();
      if (main_slot)
        main_slot.c();
      t1 = space();
      if (if_block)
        if_block.c();
      t2 = space();
      if (after_slot)
        after_slot.c();
      attr(div0, "class", "smoo-fence--wrapper svelte-1fad9tz");
      attr(div1, "class", div1_class_value = "smoo-fence--" + ctx[4] + " svelte-1fad9tz");
      attr(div1, "role", "dialog");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      if (before_slot) {
        before_slot.m(div0, null);
      }
      append(div0, t0);
      if (main_slot) {
        main_slot.m(div0, null);
      }
      append(div0, t1);
      if (if_block)
        if_block.m(div0, null);
      append(div0, t2);
      if (after_slot) {
        after_slot.m(div0, null);
      }
      ctx[14](div1);
      current3 = true;
      if (!mounted) {
        dispose = listen(div1, "click", ctx[7]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (before_slot) {
        if (before_slot.p && (!current3 || dirty & 4096)) {
          update_slot(before_slot, before_slot_template, ctx2, ctx2[12], !current3 ? -1 : dirty, get_before_slot_changes, get_before_slot_context);
        }
      }
      if (main_slot) {
        if (main_slot.p && (!current3 || dirty & 4128)) {
          update_slot(main_slot, main_slot_template, ctx2, ctx2[12], !current3 ? -1 : dirty, get_main_slot_changes, get_main_slot_context);
        }
      }
      if (!ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_12(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div0, t2);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (after_slot) {
        if (after_slot.p && (!current3 || dirty & 4096)) {
          update_slot(after_slot, after_slot_template, ctx2, ctx2[12], !current3 ? -1 : dirty, get_after_slot_changes, get_after_slot_context);
        }
      }
      if (!current3 || dirty & 16 && div1_class_value !== (div1_class_value = "smoo-fence--" + ctx2[4] + " svelte-1fad9tz")) {
        attr(div1, "class", div1_class_value);
      }
    },
    i(local) {
      if (current3)
        return;
      transition_in(before_slot, local);
      transition_in(main_slot, local);
      transition_in(if_block);
      transition_in(after_slot, local);
      current3 = true;
    },
    o(local) {
      transition_out(before_slot, local);
      transition_out(main_slot, local);
      transition_out(if_block);
      transition_out(after_slot, local);
      current3 = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      if (before_slot)
        before_slot.d(detaching);
      if (main_slot)
        main_slot.d(detaching);
      if (if_block)
        if_block.d();
      if (after_slot)
        after_slot.d(detaching);
      ctx[14](null);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_12(ctx) {
  let form;
  let current3;
  let mounted;
  let dispose;
  const default_slot_template = ctx[13].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[12], null);
  let form_levels = [ctx[5], { class: "smoo-fence--form" }];
  let form_data = {};
  for (let i = 0; i < form_levels.length; i += 1) {
    form_data = assign(form_data, form_levels[i]);
  }
  return {
    c() {
      form = element("form");
      if (default_slot)
        default_slot.c();
      set_attributes(form, form_data);
      toggle_class(form, "smoo-fence--loading", ctx[2]);
      toggle_class(form, "svelte-1fad9tz", true);
    },
    m(target, anchor) {
      insert(target, form, anchor);
      if (default_slot) {
        default_slot.m(form, null);
      }
      current3 = true;
      if (!mounted) {
        dispose = listen(form, "submit", prevent_default(ctx[6]));
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current3 || dirty & 4096)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[12], !current3 ? -1 : dirty, null, null);
        }
      }
      set_attributes(form, form_data = get_spread_update(form_levels, [
        dirty & 32 && ctx2[5],
        { class: "smoo-fence--form" }
      ]));
      toggle_class(form, "smoo-fence--loading", ctx2[2]);
      toggle_class(form, "svelte-1fad9tz", true);
    },
    i(local) {
      if (current3)
        return;
      transition_in(default_slot, local);
      current3 = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current3 = false;
    },
    d(detaching) {
      if (detaching)
        detach(form);
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment5(ctx) {
  let if_block_anchor;
  let current3;
  let if_block = ctx[1] && create_if_block4(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current3 = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[1]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block4(ctx2);
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
      if (current3)
        return;
      transition_in(if_block);
      current3 = true;
    },
    o(local) {
      transition_out(if_block);
      current3 = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
var STACK = [];
var is;
var t;
function isSearch(e) {
  return e.target.tagName === "INPUT" && e.target.type === "search";
}
function update2(e) {
  if (isSearch(e)) {
    is = e.target.value.length === 0;
  }
}
function push(el, close, current3, firstElement, lastElement, loadingCallback) {
  STACK.push({
    el,
    close,
    current: current3,
    firstElement,
    lastElement,
    loadingCallback
  });
}
function pop(e) {
  if (!STACK.length)
    return;
  const { el, close, current: current3 } = STACK[STACK.length - 1];
  setTimeout(() => current3.focus(), 60);
  if (e instanceof KeyboardEvent) {
    close({ target: el });
    return;
  }
  clearTimeout(t);
  t = setTimeout(() => STACK.pop(), 120);
}
function sync(e) {
  if (e.keyCode === 9 && STACK.length) {
    const { firstElement, lastElement, loadingCallback } = STACK[STACK.length - 1];
    if (loadingCallback()) {
      e.preventDefault();
    } else if (e.shiftKey && e.target === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && e.target === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
  if (e.keyCode === 27) {
    if (isSearch(e)) {
      if (is)
        pop(e);
    } else
      pop(e);
  }
}
window.addEventListener("focus", update2);
window.addEventListener("keyup", update2);
window.addEventListener("keydown", sync);
function instance5($$self, $$props, $$invalidate) {
  let fixedProps;
  let { $$slots: slots = {}, $$scope } = $$props;
  let ref = null;
  let { class: cssClass = "" } = $$props;
  let fixedClass = "";
  let { id = "" } = $$props;
  let { modal = false } = $$props;
  let { noform = false } = $$props;
  let { visible = null } = $$props;
  let { loading = false } = $$props;
  let { autofocus = false } = $$props;
  const dispatch = createEventDispatcher();
  function handleSubmit(e) {
    if (e.target.checkValidity()) {
      dispatch("submit", e);
    }
  }
  function closeMe(e) {
    if (modal && ref === e.target) {
      dispatch("cancel", e);
      pop(e);
    }
  }
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      ref = $$value;
      $$invalidate(3, ref);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("class" in $$props2)
      $$invalidate(8, cssClass = $$props2.class);
    if ("id" in $$props2)
      $$invalidate(9, id = $$props2.id);
    if ("modal" in $$props2)
      $$invalidate(10, modal = $$props2.modal);
    if ("noform" in $$props2)
      $$invalidate(0, noform = $$props2.noform);
    if ("visible" in $$props2)
      $$invalidate(1, visible = $$props2.visible);
    if ("loading" in $$props2)
      $$invalidate(2, loading = $$props2.loading);
    if ("autofocus" in $$props2)
      $$invalidate(11, autofocus = $$props2.autofocus);
    if ("$$scope" in $$props2)
      $$invalidate(12, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 2062) {
      $:
        if (ref) {
          if (visible === false)
            pop();
          if (visible) {
            const fix = "netscape" in window && / rv:/.test(navigator.userAgent) ? "" : ",a";
            const nodes = ref.querySelectorAll(`input,select,button,textarea,summary${fix}`);
            const children2 = [];
            for (let i = 0; i < nodes.length; i += 1) {
              if (nodes[i].getAttribute("nofocus") === "" || nodes[i].dataset.nofocus === "")
                continue;
              if (nodes[i].tagName === "INPUT" && nodes[i].type === "hidden")
                continue;
              if (nodes[i].readOnly || nodes[i].disabled)
                continue;
              if (nodes[i].tabIndex === -1)
                continue;
              children2.push(nodes[i]);
            }
            const lastNode = children2[children2.length - 1];
            const firstNode = children2[0];
            push(ref, closeMe, document.activeElement, firstNode, lastNode, () => loading);
            if (autofocus) {
              setTimeout(() => {
                if (firstNode && !loading)
                  firstNode.focus();
              }, 60);
            }
          }
        }
    }
    if ($$self.$$.dirty & 1024) {
      $:
        $$invalidate(4, fixedClass = modal ? "overlay" : "inline");
    }
    if ($$self.$$.dirty & 768) {
      $:
        $$invalidate(5, fixedProps = {
          ...id ? { id } : null,
          class: cssClass || null
        });
    }
  };
  return [
    noform,
    visible,
    loading,
    ref,
    fixedClass,
    fixedProps,
    handleSubmit,
    closeMe,
    cssClass,
    id,
    modal,
    autofocus,
    $$scope,
    slots,
    div1_binding
  ];
}
var Fence = class extends SvelteComponent {
  constructor(options3) {
    super();
    if (!document_1.getElementById("svelte-1fad9tz-style"))
      add_css();
    init(this, options3, instance5, create_fragment5, safe_not_equal, {
      class: 8,
      id: 9,
      modal: 10,
      noform: 0,
      visible: 1,
      loading: 2,
      autofocus: 11
    });
  }
};
var Fence_default = Fence;

// src/web/js/lib/Modal.svelte
var get_default_slot_changes2 = (dirty) => ({});
var get_default_slot_context2 = (ctx) => ({ back: ctx[0] });
function create_main_slot(ctx) {
  let div;
  let current3;
  const default_slot_template = ctx[1].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[2], get_default_slot_context2);
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      attr(div, "class", "formator p");
      attr(div, "slot", "main");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current3 = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current3 || dirty & 4)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[2], !current3 ? -1 : dirty, get_default_slot_changes2, get_default_slot_context2);
        }
      }
    },
    i(local) {
      if (current3)
        return;
      transition_in(default_slot, local);
      current3 = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current3 = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment6(ctx) {
  let fence;
  let current3;
  fence = new Fence_default({
    props: {
      noform: true,
      autofocus: true,
      visible: true,
      modal: true,
      $$slots: { main: [create_main_slot] },
      $$scope: { ctx }
    }
  });
  fence.$on("cancel", ctx[0]);
  return {
    c() {
      create_component(fence.$$.fragment);
    },
    m(target, anchor) {
      mount_component(fence, target, anchor);
      current3 = true;
    },
    p(ctx2, [dirty]) {
      const fence_changes = {};
      if (dirty & 4) {
        fence_changes.$$scope = { dirty, ctx: ctx2 };
      }
      fence.$set(fence_changes);
    },
    i(local) {
      if (current3)
        return;
      transition_in(fence.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      transition_out(fence.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      destroy_component(fence, detaching);
    }
  };
}
function instance6($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  function back() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    navigateTo("/");
  }
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(2, $$scope = $$props2.$$scope);
  };
  return [back, slots, $$scope];
}
var Modal = class extends SvelteComponent {
  constructor(options3) {
    super();
    init(this, options3, instance6, create_fragment6, safe_not_equal, {});
  }
};
var Modal_default = Modal;

// src/web/js/lib/Opts.svelte
var import_gists = __toModule(require_gists());
function create_default_slot(ctx) {
  let t0;
  let a0;
  let t2;
  let hr0;
  let t3;
  let h4;
  let t5;
  let hr1;
  let t6;
  let a1;
  let t8;
  let a2;
  let t10;
  let a3;
  let t12;
  let a4;
  let t14;
  let a5;
  let t16;
  let a6;
  let t18;
  let a7;
  let t20;
  let a8;
  let t22;
  let a9;
  let t24;
  let a10;
  let t26;
  let a11;
  let t28;
  let a12;
  let t30;
  let a13;
  let t32;
  let hr2;
  let t33;
  let a14;
  let t35;
  let a15;
  let t37;
  let a16;
  let t39;
  let a17;
  let t41;
  let a18;
  let t43;
  let a19;
  let t45;
  let a20;
  return {
    c() {
      t0 = text("Reference: ");
      a0 = element("a");
      a0.textContent = "available options";
      t2 = space();
      hr0 = element("hr");
      t3 = space();
      h4 = element("h4");
      h4.textContent = "Formator";
      t5 = space();
      hr1 = element("hr");
      t6 = space();
      a1 = element("a");
      a1.textContent = "boolean";
      t8 = text(" |\n  ");
      a2 = element("a");
      a2.textContent = "integer";
      t10 = text(" |\n  ");
      a3 = element("a");
      a3.textContent = "inner-references";
      t12 = text(" |\n  ");
      a4 = element("a");
      a4.textContent = "external-references";
      t14 = text(" |\n  ");
      a5 = element("a");
      a5.textContent = "enums";
      t16 = text(" |\n  ");
      a6 = element("a");
      a6.textContent = "fixed values";
      t18 = text(" |\n  ");
      a7 = element("a");
      a7.textContent = "n-times repeated";
      t20 = text(" |\n  ");
      a8 = element("a");
      a8.textContent = "faker-properties";
      t22 = text(" |\n  ");
      a9 = element("a");
      a9.textContent = "faker.fake()";
      t24 = text(" |\n  ");
      a10 = element("a");
      a10.textContent = "chance-guid";
      t26 = text(" |\n  ");
      a11 = element("a");
      a11.textContent = "chance-name";
      t28 = text(" |\n  ");
      a12 = element("a");
      a12.textContent = "chance-properties";
      t30 = text(" |\n  ");
      a13 = element("a");
      a13.textContent = "remote-schemas (^0.5.x)";
      t32 = space();
      hr2 = element("hr");
      t33 = space();
      a14 = element("a");
      a14.textContent = "JSON-Schema.org";
      t35 = text(" |\n  ");
      a15 = element("a");
      a15.textContent = "GitHub";
      t37 = text(" / ");
      a16 = element("a");
      a16.textContent = "CI";
      t39 = text(" |\n  ");
      a17 = element("a");
      a17.textContent = "Contribution";
      t41 = text(" |\n  ");
      a18 = element("a");
      a18.textContent = "AngularJS module";
      t43 = text(" |\n  ");
      a19 = element("a");
      a19.textContent = "Grunt plugin";
      t45 = text(" |\n  ");
      a20 = element("a");
      a20.textContent = "JSF Server";
      attr(a0, "href", "//github.com/json-schema-faker/json-schema-faker/tree/master/docs#available-options");
      attr(a0, "target", "_blank");
      attr(a1, "href", "#gist/da0af4611cb5622b54aff57283560da3");
      attr(a2, "href", "#gist/4199ca90fb5cd05337824b0695d17b5e");
      attr(a3, "href", "#gist/d9e27543d84157c1672f87e93ac250cc");
      attr(a4, "href", "#gist/5f81f118fbd4eac01ccacf23a061a8b9");
      attr(a5, "href", "#gist/cbb4871d1d2f44760ddafdaa056e1926");
      attr(a6, "href", "#gist/1f1196844bead96e021ffbd597edcffa");
      attr(a7, "href", "#gist/f4ad1818735f0d0babdc1f12b92013f1");
      attr(a8, "href", "#gist/1902737e7bef9573af02a3fc49761c13");
      attr(a9, "href", "#gist/1a7db173362b127a826a5c2fa7de7561");
      attr(a10, "href", "#gist/5dd364aad2d48729efff686c5f7c44b2");
      attr(a11, "href", "#gist/682f97a2e28e230b51810c55b92f4cdc");
      attr(a12, "href", "#gist/426c2d177243cd2c52594f92c1a7862e");
      attr(a13, "href", "#gist/d3e75b22ad33e4440df19e0cc060c9f3/0.5.0-rc3");
      attr(a14, "href", "http://json-schema.org");
      attr(a14, "target", "_blank");
      attr(a15, "href", "//github.com/json-schema-faker/json-schema-faker/");
      attr(a15, "target", "_blank");
      attr(a16, "href", "//travis-ci.org/json-schema-faker/json-schema-faker");
      attr(a16, "target", "_blank");
      attr(a17, "href", "//github.com/json-schema-faker/json-schema-faker/issues/new");
      attr(a17, "target", "_blank");
      attr(a18, "href", "//github.com/json-schema-faker/angular-jsf");
      attr(a18, "target", "_blank");
      attr(a19, "href", "//github.com/json-schema-faker/grunt-jsonschema-faker");
      attr(a19, "target", "_blank");
      attr(a20, "href", "//github.com/json-schema-faker/json-schema-server");
      attr(a20, "target", "_blank");
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, a0, anchor);
      insert(target, t2, anchor);
      insert(target, hr0, anchor);
      insert(target, t3, anchor);
      insert(target, h4, anchor);
      insert(target, t5, anchor);
      insert(target, hr1, anchor);
      insert(target, t6, anchor);
      insert(target, a1, anchor);
      insert(target, t8, anchor);
      insert(target, a2, anchor);
      insert(target, t10, anchor);
      insert(target, a3, anchor);
      insert(target, t12, anchor);
      insert(target, a4, anchor);
      insert(target, t14, anchor);
      insert(target, a5, anchor);
      insert(target, t16, anchor);
      insert(target, a6, anchor);
      insert(target, t18, anchor);
      insert(target, a7, anchor);
      insert(target, t20, anchor);
      insert(target, a8, anchor);
      insert(target, t22, anchor);
      insert(target, a9, anchor);
      insert(target, t24, anchor);
      insert(target, a10, anchor);
      insert(target, t26, anchor);
      insert(target, a11, anchor);
      insert(target, t28, anchor);
      insert(target, a12, anchor);
      insert(target, t30, anchor);
      insert(target, a13, anchor);
      insert(target, t32, anchor);
      insert(target, hr2, anchor);
      insert(target, t33, anchor);
      insert(target, a14, anchor);
      insert(target, t35, anchor);
      insert(target, a15, anchor);
      insert(target, t37, anchor);
      insert(target, a16, anchor);
      insert(target, t39, anchor);
      insert(target, a17, anchor);
      insert(target, t41, anchor);
      insert(target, a18, anchor);
      insert(target, t43, anchor);
      insert(target, a19, anchor);
      insert(target, t45, anchor);
      insert(target, a20, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(a0);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(hr0);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(h4);
      if (detaching)
        detach(t5);
      if (detaching)
        detach(hr1);
      if (detaching)
        detach(t6);
      if (detaching)
        detach(a1);
      if (detaching)
        detach(t8);
      if (detaching)
        detach(a2);
      if (detaching)
        detach(t10);
      if (detaching)
        detach(a3);
      if (detaching)
        detach(t12);
      if (detaching)
        detach(a4);
      if (detaching)
        detach(t14);
      if (detaching)
        detach(a5);
      if (detaching)
        detach(t16);
      if (detaching)
        detach(a6);
      if (detaching)
        detach(t18);
      if (detaching)
        detach(a7);
      if (detaching)
        detach(t20);
      if (detaching)
        detach(a8);
      if (detaching)
        detach(t22);
      if (detaching)
        detach(a9);
      if (detaching)
        detach(t24);
      if (detaching)
        detach(a10);
      if (detaching)
        detach(t26);
      if (detaching)
        detach(a11);
      if (detaching)
        detach(t28);
      if (detaching)
        detach(a12);
      if (detaching)
        detach(t30);
      if (detaching)
        detach(a13);
      if (detaching)
        detach(t32);
      if (detaching)
        detach(hr2);
      if (detaching)
        detach(t33);
      if (detaching)
        detach(a14);
      if (detaching)
        detach(t35);
      if (detaching)
        detach(a15);
      if (detaching)
        detach(t37);
      if (detaching)
        detach(a16);
      if (detaching)
        detach(t39);
      if (detaching)
        detach(a17);
      if (detaching)
        detach(t41);
      if (detaching)
        detach(a18);
      if (detaching)
        detach(t43);
      if (detaching)
        detach(a19);
      if (detaching)
        detach(t45);
      if (detaching)
        detach(a20);
    }
  };
}
function create_fragment7(ctx) {
  let modal;
  let current3;
  modal = new Modal_default({
    props: {
      $$slots: {
        default: [
          create_default_slot,
          ({ back }) => ({ 7: back }),
          ({ back }) => back ? 128 : 0
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(modal.$$.fragment);
    },
    m(target, anchor) {
      mount_component(modal, target, anchor);
      current3 = true;
    },
    p(ctx2, [dirty]) {
      const modal_changes = {};
      if (dirty & 256) {
        modal_changes.$$scope = { dirty, ctx: ctx2 };
      }
      modal.$set(modal_changes);
    },
    i(local) {
      if (current3)
        return;
      transition_in(modal.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      transition_out(modal.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      destroy_component(modal, detaching);
    }
  };
}
function instance7($$self, $$props, $$invalidate) {
  let $options2;
  component_subscribe($$self, import_gists.options, ($$value) => $$invalidate(0, $options2 = $$value));
  const defaults = JSONSchemaFaker.option.getDefaults();
  const opts = Object.keys(defaults).map((key) => getType(key, defaults[key]));
  const vals = [
    void 0,
    0,
    -1,
    null,
    true,
    false,
    "string",
    "number",
    "integer",
    "boolean",
    "object",
    "array"
  ];
  function getType(k, v) {
    const extraProps = {};
    let fixedType;
    if (typeof v === "boolean") {
      fixedType = "checkbox";
    }
    if (typeof v === "number") {
      fixedType = "number";
    }
    if (v === null || typeof v === "function") {
      if (k === "maxItems" || k === "maxLength") {
        fixedType = "number";
      }
      if (k === "random" || k === "optionalsProbability") {
        extraProps.step = k === "random" ? "0.01" : "0.1";
        fixedType = "number";
      }
    }
    if (Array.isArray(v)) {
      fixedType = "text";
    }
    const result = $options2 && $options2[k] || defaults[k];
    if (fixedType !== "checkbox") {
      extraProps.class = "f num";
      extraProps.value = result;
    } else {
      extraProps.checked = result;
    }
    if (fixedType) {
      extraProps.type = fixedType;
    }
    return { ...extraProps, name: k, id: k };
  }
  function update3(e, option) {
    if (!$options2)
      set_store_value(import_gists.options, $options2 = {}, $options2);
    if (option.type === "number") {
      set_store_value(import_gists.options, $options2[option.name] = parseFloat(e.target.value), $options2);
    } else if (option.type === "checkbox") {
      set_store_value(import_gists.options, $options2[option.name] = e.target.checked, $options2);
    } else {
      set_store_value(import_gists.options, $options2[option.name] = e.target.value, $options2);
    }
  }
  function reset() {
    set_store_value(import_gists.options, $options2 = null, $options2);
    Object.keys(defaults).forEach((key) => {
      const node = document.querySelector(`[name=${key}]`);
      const { type, value } = getType(key, defaults[key]);
      if (typeof value === "number") {
        node.value = value;
      } else if (Array.isArray(value)) {
        node.value = value.join(",");
      } else {
        node.value = "";
      }
    });
  }
  return [];
}
var Opts = class extends SvelteComponent {
  constructor(options3) {
    super();
    init(this, options3, instance7, create_fragment7, safe_not_equal, {});
  }
};
var Opts_default = Opts;

// src/web/js/lib/Save.svelte
function create_fragment8(ctx) {
  let t2;
  return {
    c() {
      t2 = text("Not yet implemented...");
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t2);
    }
  };
}
var Save = class extends SvelteComponent {
  constructor(options3) {
    super();
    init(this, options3, null, create_fragment8, safe_not_equal, {});
  }
};
var Save_default = Save;

// src/web/js/lib/Gists.svelte
var import_gists2 = __toModule(require_gists());
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i][0];
  child_ctx[11] = list[i][1];
  return child_ctx;
}
function create_if_block5(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (ctx2[1])
      return create_if_block_13;
    return create_else_block3;
  }
  let current_block_type = select_block_type(ctx, -1);
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
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block3(ctx) {
  let ol;
  let each_value = ctx[3];
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
    p(ctx2, dirty) {
      if (dirty & 8) {
        each_value = ctx2[3];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
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
      if (detaching)
        detach(ol);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_if_block_13(ctx) {
  let t2;
  return {
    c() {
      t2 = text("Loading gists...");
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(t2);
    }
  };
}
function create_each_block_1(ctx) {
  let li;
  let a;
  let t0_value = ctx[10] + "";
  let t0;
  let t1;
  let t2_value = (ctx[11].size / 1024).toFixed(2) + "";
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
      t1 = text(" \u2014 ");
      t2 = text(t2_value);
      t3 = text("KB");
      t4 = space();
      attr(a, "class", "arr bl");
      attr(a, "title", a_title_value = "Type: " + ctx[11].type);
      attr(a, "target", "_blank");
      attr(a, "href", a_href_value = ctx[11].raw_url);
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
    p(ctx2, dirty) {
      if (dirty & 8 && t0_value !== (t0_value = ctx2[10] + ""))
        set_data(t0, t0_value);
      if (dirty & 8 && t2_value !== (t2_value = (ctx2[11].size / 1024).toFixed(2) + ""))
        set_data(t2, t2_value);
      if (dirty & 8 && a_title_value !== (a_title_value = "Type: " + ctx2[11].type)) {
        attr(a, "title", a_title_value);
      }
      if (dirty & 8 && a_href_value !== (a_href_value = ctx2[11].raw_url)) {
        attr(a, "href", a_href_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(li);
    }
  };
}
function create_each_block(ctx) {
  let li;
  let div;
  let a;
  let t0_value = (ctx[7].description || ctx[7].id) + "";
  let t0;
  let a_href_value;
  let t1;
  let button;
  let t3;
  let ul;
  let t4;
  let mounted;
  let dispose;
  function click_handler() {
    return ctx[6](ctx[7]);
  }
  let each_value_1 = Object.entries(ctx[7].files);
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
      attr(a, "class", "tdn tr flx-a");
      attr(a, "target", "_blank");
      attr(a, "href", a_href_value = ctx[7].html_url);
      attr(button, "class", "bu min tr nosl");
      attr(div, "class", "flx flx-c");
      attr(ul, "class", "lr");
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
      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 8 && t0_value !== (t0_value = (ctx[7].description || ctx[7].id) + ""))
        set_data(t0, t0_value);
      if (dirty & 8 && a_href_value !== (a_href_value = ctx[7].html_url)) {
        attr(a, "href", a_href_value);
      }
      if (dirty & 8) {
        each_value_1 = Object.entries(ctx[7].files);
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
      if (detaching)
        detach(li);
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment9(ctx) {
  let label;
  let span;
  let t1;
  let input;
  let t2;
  let if_block_anchor;
  let mounted;
  let dispose;
  let if_block = ctx[2] && create_if_block5(ctx);
  return {
    c() {
      label = element("label");
      span = element("span");
      span.textContent = "Filter gists:";
      t1 = space();
      input = element("input");
      t2 = space();
      if (if_block)
        if_block.c();
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
      set_input_value(input, ctx[0]);
      insert(target, t2, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      if (!mounted) {
        dispose = listen(input, "input", ctx[5]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        set_input_value(input, ctx2[0]);
      }
      if (ctx2[2]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block5(ctx2);
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
      if (detaching)
        detach(label);
      if (detaching)
        detach(t2);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
      mounted = false;
      dispose();
    }
  };
}
function instance8($$self, $$props, $$invalidate) {
  let filtered;
  let $loggedIn;
  component_subscribe($$self, import_gists2.loggedIn, ($$value) => $$invalidate(2, $loggedIn = $$value));
  let term = "";
  let data = [];
  let pending = true;
  onMount(async () => {
    if ($loggedIn)
      $$invalidate(4, data = await (0, import_gists2.all)());
    $$invalidate(1, pending = false);
  });
  function input_input_handler() {
    term = this.value;
    $$invalidate(0, term);
  }
  const click_handler = (item) => navigateTo(`/#gist/${item.id}`);
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 17) {
      $:
        $$invalidate(3, filtered = data.filter((x) => !term || x.description.toLowerCase().includes(term.toLowerCase()) || Object.keys(x.files).some((k) => k.toLowerCase().includes(term.toLowerCase()))));
    }
  };
  return [term, pending, $loggedIn, filtered, data, input_input_handler, click_handler];
}
var Gists = class extends SvelteComponent {
  constructor(options3) {
    super();
    init(this, options3, instance8, create_fragment9, safe_not_equal, {});
  }
};
var Gists_default = Gists;

// src/web/js/lib/Auth.svelte
function create_default_slot_9(ctx) {
  let icon;
  let t2;
  let current3;
  icon = new Icon_default({ props: { name: "gear" } });
  return {
    c() {
      create_component(icon.$$.fragment);
      t2 = text(" Options");
    },
    m(target, anchor) {
      mount_component(icon, target, anchor);
      insert(target, t2, anchor);
      current3 = true;
    },
    p: noop,
    i(local) {
      if (current3)
        return;
      transition_in(icon.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      destroy_component(icon, detaching);
      if (detaching)
        detach(t2);
    }
  };
}
function create_else_block4(ctx) {
  let link;
  let current3;
  link = new Link_default({
    props: {
      open: "width=400,height=640",
      href: (0, import_gists3.url)(),
      class: "a",
      $$slots: { default: [create_default_slot_8] },
      $$scope: { ctx }
    }
  });
  link.$on("close", ctx[2]);
  return {
    c() {
      create_component(link.$$.fragment);
    },
    m(target, anchor) {
      mount_component(link, target, anchor);
      current3 = true;
    },
    p(ctx2, dirty) {
      const link_changes = {};
      if (dirty & 128) {
        link_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link.$set(link_changes);
    },
    i(local) {
      if (current3)
        return;
      transition_in(link.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      transition_out(link.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      destroy_component(link, detaching);
    }
  };
}
function create_if_block6(ctx) {
  let link;
  let current3;
  link = new Link_default({
    props: {
      href: "#session",
      class: "a nosl",
      title: ctx[1].fullname,
      $$slots: { default: [create_default_slot_7] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(link.$$.fragment);
    },
    m(target, anchor) {
      mount_component(link, target, anchor);
      current3 = true;
    },
    p(ctx2, dirty) {
      const link_changes = {};
      if (dirty & 2)
        link_changes.title = ctx2[1].fullname;
      if (dirty & 130) {
        link_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link.$set(link_changes);
    },
    i(local) {
      if (current3)
        return;
      transition_in(link.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      transition_out(link.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      destroy_component(link, detaching);
    }
  };
}
function create_default_slot_8(ctx) {
  let icon;
  let t2;
  let current3;
  icon = new Icon_default({ props: { name: "github" } });
  return {
    c() {
      create_component(icon.$$.fragment);
      t2 = text(" Share link? Log in");
    },
    m(target, anchor) {
      mount_component(icon, target, anchor);
      insert(target, t2, anchor);
      current3 = true;
    },
    p: noop,
    i(local) {
      if (current3)
        return;
      transition_in(icon.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      destroy_component(icon, detaching);
      if (detaching)
        detach(t2);
    }
  };
}
function create_default_slot_7(ctx) {
  let icon;
  let t0;
  let t1_value = ctx[1].username + "";
  let t1;
  let current3;
  icon = new Icon_default({ props: { name: "github" } });
  return {
    c() {
      create_component(icon.$$.fragment);
      t0 = space();
      t1 = text(t1_value);
    },
    m(target, anchor) {
      mount_component(icon, target, anchor);
      insert(target, t0, anchor);
      insert(target, t1, anchor);
      current3 = true;
    },
    p(ctx2, dirty) {
      if ((!current3 || dirty & 2) && t1_value !== (t1_value = ctx2[1].username + ""))
        set_data(t1, t1_value);
    },
    i(local) {
      if (current3)
        return;
      transition_in(icon.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      destroy_component(icon, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
    }
  };
}
function create_default_slot_6(ctx) {
  let t2;
  return {
    c() {
      t2 = text("New project");
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t2);
    }
  };
}
function create_default_slot_5(ctx) {
  let t2;
  return {
    c() {
      t2 = text("Log out");
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t2);
    }
  };
}
function create_default_slot_4(ctx) {
  let t2;
  return {
    c() {
      t2 = text("Save project...");
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t2);
    }
  };
}
function create_default_slot_3(ctx) {
  let t2;
  return {
    c() {
      t2 = text("Schemas");
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t2);
    }
  };
}
function create_default_slot_2(ctx) {
  let link0;
  let t0;
  let link1;
  let t1;
  let link2;
  let t2;
  let link3;
  let t3;
  let route0;
  let t4;
  let route1;
  let current3;
  link0 = new Link_default({
    props: {
      href: "/",
      $$slots: { default: [create_default_slot_6] },
      $$scope: { ctx }
    }
  });
  link0.$on("click", ctx[4]);
  link1 = new Link_default({
    props: {
      href: "/logout",
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    }
  });
  link1.$on("click", ctx[3]);
  link2 = new Link_default({
    props: {
      href: "#session/save",
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  link3 = new Link_default({
    props: {
      href: "#session/open",
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  route0 = new Route_default({
    props: { path: "/open", component: Gists_default }
  });
  route1 = new Route_default({
    props: { path: "/save", component: Save_default }
  });
  return {
    c() {
      create_component(link0.$$.fragment);
      t0 = text(" |\n      ");
      create_component(link1.$$.fragment);
      t1 = space();
      create_component(link2.$$.fragment);
      t2 = text(" |\n      ");
      create_component(link3.$$.fragment);
      t3 = text(" |\n      ");
      create_component(route0.$$.fragment);
      t4 = space();
      create_component(route1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(link0, target, anchor);
      insert(target, t0, anchor);
      mount_component(link1, target, anchor);
      insert(target, t1, anchor);
      mount_component(link2, target, anchor);
      insert(target, t2, anchor);
      mount_component(link3, target, anchor);
      insert(target, t3, anchor);
      mount_component(route0, target, anchor);
      insert(target, t4, anchor);
      mount_component(route1, target, anchor);
      current3 = true;
    },
    p(ctx2, dirty) {
      const link0_changes = {};
      if (dirty & 128) {
        link0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link0.$set(link0_changes);
      const link1_changes = {};
      if (dirty & 128) {
        link1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link1.$set(link1_changes);
      const link2_changes = {};
      if (dirty & 128) {
        link2_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link2.$set(link2_changes);
      const link3_changes = {};
      if (dirty & 128) {
        link3_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link3.$set(link3_changes);
    },
    i(local) {
      if (current3)
        return;
      transition_in(link0.$$.fragment, local);
      transition_in(link1.$$.fragment, local);
      transition_in(link2.$$.fragment, local);
      transition_in(link3.$$.fragment, local);
      transition_in(route0.$$.fragment, local);
      transition_in(route1.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      transition_out(link0.$$.fragment, local);
      transition_out(link1.$$.fragment, local);
      transition_out(link2.$$.fragment, local);
      transition_out(link3.$$.fragment, local);
      transition_out(route0.$$.fragment, local);
      transition_out(route1.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      destroy_component(link0, detaching);
      if (detaching)
        detach(t0);
      destroy_component(link1, detaching);
      if (detaching)
        detach(t1);
      destroy_component(link2, detaching);
      if (detaching)
        detach(t2);
      destroy_component(link3, detaching);
      if (detaching)
        detach(t3);
      destroy_component(route0, detaching);
      if (detaching)
        detach(t4);
      destroy_component(route1, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let modal;
  let current3;
  modal = new Modal_default({
    props: {
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(modal.$$.fragment);
    },
    m(target, anchor) {
      mount_component(modal, target, anchor);
      current3 = true;
    },
    p(ctx2, dirty) {
      const modal_changes = {};
      if (dirty & 128) {
        modal_changes.$$scope = { dirty, ctx: ctx2 };
      }
      modal.$set(modal_changes);
    },
    i(local) {
      if (current3)
        return;
      transition_in(modal.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      transition_out(modal.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      destroy_component(modal, detaching);
    }
  };
}
function create_default_slot2(ctx) {
  let route0;
  let t2;
  let route1;
  let current3;
  route0 = new Route_default({
    props: { path: "#options", component: Opts_default }
  });
  route1 = new Route_default({
    props: {
      path: "#session",
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(route0.$$.fragment);
      t2 = space();
      create_component(route1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(route0, target, anchor);
      insert(target, t2, anchor);
      mount_component(route1, target, anchor);
      current3 = true;
    },
    p(ctx2, dirty) {
      const route1_changes = {};
      if (dirty & 128) {
        route1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      route1.$set(route1_changes);
    },
    i(local) {
      if (current3)
        return;
      transition_in(route0.$$.fragment, local);
      transition_in(route1.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      transition_out(route0.$$.fragment, local);
      transition_out(route1.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      destroy_component(route0, detaching);
      if (detaching)
        detach(t2);
      destroy_component(route1, detaching);
    }
  };
}
function create_fragment10(ctx) {
  let ul;
  let li0;
  let link;
  let t0;
  let li1;
  let current_block_type_index;
  let if_block;
  let t1;
  let router2;
  let current3;
  link = new Link_default({
    props: {
      href: "#options",
      class: "a",
      $$slots: { default: [create_default_slot_9] },
      $$scope: { ctx }
    }
  });
  const if_block_creators = [create_if_block6, create_else_block4];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[0])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  router2 = new Router_default({
    props: {
      $$slots: { default: [create_default_slot2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      ul = element("ul");
      li0 = element("li");
      create_component(link.$$.fragment);
      t0 = space();
      li1 = element("li");
      if_block.c();
      t1 = space();
      create_component(router2.$$.fragment);
      attr(li0, "class", "sp pd dib nosl");
      attr(li1, "class", "ar dib");
      attr(ul, "class", "p lr ln mt rel jsf-about");
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      append(ul, li0);
      mount_component(link, li0, null);
      append(ul, t0);
      append(ul, li1);
      if_blocks[current_block_type_index].m(li1, null);
      insert(target, t1, anchor);
      mount_component(router2, target, anchor);
      current3 = true;
    },
    p(ctx2, [dirty]) {
      const link_changes = {};
      if (dirty & 128) {
        link_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link.$set(link_changes);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(li1, null);
      }
      const router_changes = {};
      if (dirty & 128) {
        router_changes.$$scope = { dirty, ctx: ctx2 };
      }
      router2.$set(router_changes);
    },
    i(local) {
      if (current3)
        return;
      transition_in(link.$$.fragment, local);
      transition_in(if_block);
      transition_in(router2.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      transition_out(link.$$.fragment, local);
      transition_out(if_block);
      transition_out(router2.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      if (detaching)
        detach(ul);
      destroy_component(link);
      if_blocks[current_block_type_index].d();
      if (detaching)
        detach(t1);
      destroy_component(router2, detaching);
    }
  };
}
function instance9($$self, $$props, $$invalidate) {
  let $loggedIn;
  let $session;
  let $schemas;
  let $current;
  component_subscribe($$self, import_gists3.loggedIn, ($$value) => $$invalidate(0, $loggedIn = $$value));
  component_subscribe($$self, import_gists3.session, ($$value) => $$invalidate(1, $session = $$value));
  component_subscribe($$self, import_gists3.schemas, ($$value) => $$invalidate(5, $schemas = $$value));
  component_subscribe($$self, import_gists3.current, ($$value) => $$invalidate(6, $current = $$value));
  function done() {
    (0, import_gists3.me)().then((data) => {
      if (!data.login)
        return;
      set_store_value(import_gists3.loggedIn, $loggedIn = true, $loggedIn);
      set_store_value(import_gists3.session, $session = {
        username: data.login,
        fullname: data.name
      }, $session);
      window.localStorage._DATA = JSON.stringify($session);
    });
  }
  function exit() {
    window.localStorage._AUTH = "";
    set_store_value(import_gists3.loggedIn, $loggedIn = null, $loggedIn);
    navigateTo("/");
  }
  function add() {
    set_store_value(import_gists3.schemas, $schemas = [], $schemas);
    set_store_value(import_gists3.current, $current = null, $current);
    navigateTo("/");
  }
  return [$loggedIn, $session, done, exit, add];
}
var Auth = class extends SvelteComponent {
  constructor(options3) {
    super();
    init(this, options3, instance9, create_fragment10, safe_not_equal, {});
  }
};
var Auth_default = Auth;

// src/web/js/lib/Ace.svelte
function create_fragment11(ctx) {
  let div1;
  let div0;
  let div0_class_value;
  let t2;
  let current3;
  const default_slot_template = ctx[8].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[7], null);
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      t2 = space();
      if (default_slot)
        default_slot.c();
      attr(div0, "class", div0_class_value = "Ace " + ctx[0]);
      attr(div1, "class", "Ace-wrapper rel");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      ctx[9](div0);
      append(div1, t2);
      if (default_slot) {
        default_slot.m(div1, null);
      }
      current3 = true;
    },
    p(ctx2, [dirty]) {
      if (!current3 || dirty & 1 && div0_class_value !== (div0_class_value = "Ace " + ctx2[0])) {
        attr(div0, "class", div0_class_value);
      }
      if (default_slot) {
        if (default_slot.p && (!current3 || dirty & 128)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[7], !current3 ? -1 : dirty, null, null);
        }
      }
    },
    i(local) {
      if (current3)
        return;
      transition_in(default_slot, local);
      current3 = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current3 = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      ctx[9](null);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance10($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
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
    if (readonly)
      targetElement.setReadOnly(true);
    targetElement.session.on("change", () => {
      dispatch("change", targetElement.getValue());
    });
    return () => targetElement.destroy();
  });
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      target = $$value;
      $$invalidate(1, target);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("class" in $$props2)
      $$invalidate(0, cssClass = $$props2.class);
    if ("mode" in $$props2)
      $$invalidate(2, mode = $$props2.mode);
    if ("theme" in $$props2)
      $$invalidate(3, theme = $$props2.theme);
    if ("value" in $$props2)
      $$invalidate(4, value = $$props2.value);
    if ("readonly" in $$props2)
      $$invalidate(5, readonly = $$props2.readonly);
    if ("$$scope" in $$props2)
      $$invalidate(7, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 92) {
      $:
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
    $$scope,
    slots,
    div0_binding
  ];
}
var Ace = class extends SvelteComponent {
  constructor(options3) {
    super();
    init(this, options3, instance10, create_fragment11, safe_not_equal, {
      class: 0,
      mode: 2,
      theme: 3,
      value: 4,
      readonly: 5
    });
  }
};
var Ace_default = Ace;

// src/web/js/lib/Editor.svelte
var import_gists4 = __toModule(require_gists());
function get_each_context2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[33] = list[i];
  return child_ctx;
}
function create_else_block5(ctx) {
  let div0;
  let t0;
  let current_block_type_index;
  let if_block;
  let t1;
  let div1;
  let ace0;
  let t2;
  let ace1;
  let current3;
  let each_value = ctx[7];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
  }
  const if_block_creators = [create_if_block_14, create_else_block_12];
  const if_blocks = [];
  function select_block_type_3(ctx2, dirty) {
    if (ctx2[2])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_3(ctx, [-1, -1]);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  ace0 = new Ace_default({
    props: {
      mode: outputMode,
      value: ctx[5]
    }
  });
  ace0.$on("change", ctx[13]);
  ace1 = new Ace_default({
    props: {
      mode: outputMode,
      value: ctx[6],
      readonly: true,
      $$slots: { default: [create_default_slot3] },
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
      if_blocks[current_block_type_index].m(div0, null);
      insert(target, t1, anchor);
      insert(target, div1, anchor);
      mount_component(ace0, div1, null);
      append(div1, t2);
      mount_component(ace1, div1, null);
      current3 = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & 3979) {
        each_value = ctx2[7];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div0, t0);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_3(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div0, null);
      }
      const ace0_changes = {};
      if (dirty[0] & 32)
        ace0_changes.value = ctx2[5];
      ace0.$set(ace0_changes);
      const ace1_changes = {};
      if (dirty[0] & 64)
        ace1_changes.value = ctx2[6];
      if (dirty[1] & 32) {
        ace1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      ace1.$set(ace1_changes);
    },
    i(local) {
      if (current3)
        return;
      transition_in(if_block);
      transition_in(ace0.$$.fragment, local);
      transition_in(ace1.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(ace0.$$.fragment, local);
      transition_out(ace1.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      destroy_each(each_blocks, detaching);
      if_blocks[current_block_type_index].d();
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
      destroy_component(ace0);
      destroy_component(ace1);
    }
  };
}
function create_if_block7(ctx) {
  let t2;
  return {
    c() {
      t2 = text("Loading gist...");
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t2);
    }
  };
}
function create_else_block_3(ctx) {
  let span;
  let button0;
  let t0_value = ctx[33].filename + "";
  let t0;
  let t1;
  let button1;
  let mounted;
  let dispose;
  function click_handler_1() {
    return ctx[19](ctx[33]);
  }
  function click_handler_2() {
    return ctx[20](ctx[33]);
  }
  return {
    c() {
      span = element("span");
      button0 = element("button");
      t0 = text(t0_value);
      t1 = space();
      button1 = element("button");
      button1.textContent = "\xD7";
      attr(button1, "class", "nb x-close");
      attr(span, "class", "flx");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, button0);
      append(button0, t0);
      append(span, t1);
      append(span, button1);
      if (!mounted) {
        dispose = [
          listen(button0, "click", click_handler_1),
          listen(button1, "click", click_handler_2)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & 128 && t0_value !== (t0_value = ctx[33].filename + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching)
        detach(span);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_22(ctx) {
  let span;
  let t0;
  let button;
  let mounted;
  let dispose;
  function select_block_type_2(ctx2, dirty) {
    if (ctx2[3])
      return create_if_block_32;
    return create_else_block_2;
  }
  let current_block_type = select_block_type_2(ctx, [-1, -1]);
  let if_block = current_block_type(ctx);
  function click_handler() {
    return ctx[18](ctx[33]);
  }
  return {
    c() {
      span = element("span");
      if_block.c();
      t0 = space();
      button = element("button");
      button.textContent = "\xD7";
      attr(button, "class", "nb x-close");
      attr(span, "class", "sel");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      if_block.m(span, null);
      append(span, t0);
      append(span, button);
      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (current_block_type === (current_block_type = select_block_type_2(ctx, dirty)) && if_block) {
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
      if (detaching)
        detach(span);
      if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function create_else_block_2(ctx) {
  let span;
  let t_value = ctx[33].filename + "";
  let t2;
  let mounted;
  let dispose;
  function dblclick_handler() {
    return ctx[17](ctx[33]);
  }
  return {
    c() {
      span = element("span");
      t2 = text(t_value);
      attr(span, "class", "dib");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t2);
      if (!mounted) {
        dispose = listen(span, "dblclick", dblclick_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & 128 && t_value !== (t_value = ctx[33].filename + ""))
        set_data(t2, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(span);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_32(ctx) {
  let input_1;
  let input_1_value_value;
  let mounted;
  let dispose;
  return {
    c() {
      input_1 = element("input");
      attr(input_1, "class", "nb");
      attr(input_1, "type", "text");
      attr(input_1, "spellcheck", "false");
      input_1.value = input_1_value_value = ctx[33].filename;
    },
    m(target, anchor) {
      insert(target, input_1, anchor);
      ctx[16](input_1);
      if (!mounted) {
        dispose = [
          listen(input_1, "blur", ctx[8]),
          listen(input_1, "keyup", ctx[11])
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & 128 && input_1_value_value !== (input_1_value_value = ctx2[33].filename) && input_1.value !== input_1_value_value) {
        input_1.value = input_1_value_value;
      }
    },
    d(detaching) {
      if (detaching)
        detach(input_1);
      ctx[16](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_each_block2(ctx) {
  let if_block_anchor;
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[0] === ctx2[33])
      return create_if_block_22;
    return create_else_block_3;
  }
  let current_block_type = select_block_type_1(ctx, [-1, -1]);
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
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_1(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block_12(ctx) {
  let span;
  let button;
  let icon;
  let current3;
  let mounted;
  let dispose;
  icon = new Icon_default({ props: { name: "plus" } });
  return {
    c() {
      span = element("span");
      button = element("button");
      create_component(icon.$$.fragment);
      attr(button, "class", "a nb nbk");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, button);
      mount_component(icon, button, null);
      current3 = true;
      if (!mounted) {
        dispose = listen(button, "click", ctx[14]);
        mounted = true;
      }
    },
    p: noop,
    i(local) {
      if (current3)
        return;
      transition_in(icon.$$.fragment, local);
      current3 = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current3 = false;
    },
    d(detaching) {
      if (detaching)
        detach(span);
      destroy_component(icon);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_14(ctx) {
  let span;
  let input_1;
  let mounted;
  let dispose;
  return {
    c() {
      span = element("span");
      input_1 = element("input");
      attr(input_1, "class", "nb");
      attr(input_1, "type", "text");
      attr(input_1, "spellcheck", "false");
      attr(span, "class", "sel");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, input_1);
      ctx[21](input_1);
      if (!mounted) {
        dispose = [
          listen(input_1, "blur", ctx[8]),
          listen(input_1, "keyup", ctx[12])
        ];
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(span);
      ctx[21](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_default_slot3(ctx) {
  let span;
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      span = element("span");
      button = element("button");
      button.textContent = "Generate";
      attr(button, "class", "bu");
      attr(span, "class", "abs r0 t0");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, button);
      if (!mounted) {
        dispose = listen(button, "click", ctx[15]);
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(span);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment12(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let current3;
  const if_block_creators = [create_if_block7, create_else_block5];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[4])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx, [-1, -1]);
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
      current3 = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div, null);
      }
    },
    i(local) {
      if (current3)
        return;
      transition_in(if_block);
      current3 = true;
    },
    o(local) {
      transition_out(if_block);
      current3 = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if_blocks[current_block_type_index].d();
    }
  };
}
var outputMode = "json";
function validate(e) {
  const isValid = /^[a-zA-Z0-9_#$%][\w.]*?$/.test(e.target.value);
  if (isValid) {
    e.target.classList.remove("invalid");
    return true;
  }
  if (!e.target.classList.contains("invalid")) {
    e.target.classList.add("invalid");
    return false;
  }
}
function instance11($$self, $$props, $$invalidate) {
  let $current;
  let $schemas;
  let $options2;
  component_subscribe($$self, import_gists4.current, ($$value) => $$invalidate(0, $current = $$value));
  component_subscribe($$self, import_gists4.schemas, ($$value) => $$invalidate(7, $schemas = $$value));
  component_subscribe($$self, import_gists4.options, ($$value) => $$invalidate(28, $options2 = $$value));
  const initialLocationHash = window.location.hash;
  let data;
  let input;
  let buffer;
  let selected;
  let isAdding;
  let isEditing;
  let previusURL;
  let value = null;
  let isYAML = false;
  let Encoder = JSON;
  let pending = true;
  let editInput = "{}";
  let objectOutput = "{}";
  function close(e) {
    if (input && (isAdding || isEditing)) {
      if (isAdding) {
        set_store_value(import_gists4.current, $current = selected || $schemas[$schemas.length - 1], $current);
      }
      $$invalidate(2, isAdding = false);
      $$invalidate(3, isEditing = false);
    }
  }
  function select(e, edit) {
    set_store_value(import_gists4.current, $current = selected = e, $current);
    $$invalidate(2, isAdding = false);
    $$invalidate(3, isEditing = !!edit);
    if (edit)
      setTimeout(() => input.select(), 60);
  }
  function remove(e) {
    if (!confirm(`This action will remove the '${e.filename}' file.

Are you sure?`.trim()))
      return;
    const offset = $schemas.indexOf(e);
    set_store_value(import_gists4.schemas, $schemas = $schemas.filter((x) => x !== e), $schemas);
    if (e.filename === $current.filename) {
      buffer = $$invalidate(5, editInput = "");
      set_store_value(import_gists4.current, $current = null, $current);
    }
  }
  function update3(e) {
    if (e.keyCode === 27)
      close();
    if (validate(e) && e.keyCode === 13) {
      set_store_value(import_gists4.current, $current.filename = e.target.value, $current);
      $$invalidate(3, isEditing = false);
      e.target.value = "";
    }
  }
  function submit(e) {
    if (e.keyCode === 27)
      close();
    if (validate(e) && e.keyCode === 13) {
      set_store_value(import_gists4.schemas, $schemas = $schemas.concat({
        filename: e.target.value,
        content: buffer
      }), $schemas);
      set_store_value(import_gists4.current, $current = $schemas[$schemas.length - 1], $current);
      $$invalidate(2, isAdding = false);
      e.target.value = "";
    }
  }
  function refresh() {
    try {
      $$invalidate(5, editInput = JSON.stringify(JSON.parse($current.content), null, 2));
    } catch (e) {
      $$invalidate(5, editInput = $current.content);
    }
  }
  function format(e) {
    value = Encoder.parse($current.content);
    isYAML = e.detail;
    refresh();
  }
  function sync2(e) {
    buffer = e.detail;
    if ($current)
      set_store_value(import_gists4.current, $current.content = buffer, $current);
  }
  function add() {
    buffer = $$invalidate(5, editInput = "");
    selected = $current;
    $$invalidate(2, isAdding = true);
    set_store_value(import_gists4.current, $current = null, $current);
    setTimeout(() => input.focus(), 60);
  }
  function gen() {
    const opts = { ...$options2 };
    const value2 = opts.random;
    opts.random = value2 ? () => value2 : Math.random;
    let schema = {};
    let refs = [];
    try {
      schema = Encoder.parse($current.content);
      refs = $schemas.map((x) => Encoder.parse(x.content));
    } catch (e) {
    }
    JSONSchemaFaker.option(opts);
    JSONSchemaFaker.resolve(schema, refs).then((result) => {
      $$invalidate(6, objectOutput = Encoder.stringify(result, null, 2));
    }).catch((error) => alert(error.message));
  }
  router.subscribe(async (info) => {
    if (!window.location.hash || window.location.hash.match(/^#(options|session)/)) {
      $$invalidate(4, pending = false);
      return;
    }
    if (info.path === previusURL)
      return;
    previusURL = info.path;
    data = await (0, import_gists4.loadFrom)(info.path.substr(1));
    buffer = $$invalidate(5, editInput = "");
    $$invalidate(4, pending = false);
    $$invalidate(2, isAdding = false);
    $$invalidate(3, isEditing = false);
    set_store_value(import_gists4.schemas, $schemas = Object.keys(data.files).filter((x) => ["text/plain", "application/json"].includes(data.files[x].type)).reduce((prev, cur) => {
      prev.push(data.files[cur]);
      return prev;
    }, []), $schemas);
    set_store_value(import_gists4.current, $current = $schemas[0], $current);
  });
  function input_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      input = $$value;
      $$invalidate(1, input);
    });
  }
  const dblclick_handler = (info) => select(info, true);
  const click_handler = (info) => remove(info);
  const click_handler_1 = (info) => select(info);
  const click_handler_2 = (info) => remove(info);
  function input_1_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      input = $$value;
      $$invalidate(1, input);
    });
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & 1) {
      $:
        if ($current) {
          refresh();
        } else {
          $$invalidate(6, objectOutput = "{}");
          buffer = $$invalidate(5, editInput = "");
          set_store_value(import_gists4.current, $current = { content: "" }, $current);
        }
    }
  };
  return [
    $current,
    input,
    isAdding,
    isEditing,
    pending,
    editInput,
    objectOutput,
    $schemas,
    close,
    select,
    remove,
    update3,
    submit,
    sync2,
    add,
    gen,
    input_1_binding,
    dblclick_handler,
    click_handler,
    click_handler_1,
    click_handler_2,
    input_1_binding_1
  ];
}
var Editor = class extends SvelteComponent {
  constructor(options3) {
    super();
    init(this, options3, instance11, create_fragment12, safe_not_equal, {}, [-1, -1]);
  }
};
var Editor_default = Editor;

// src/web/js/app.js
function main() {
  if (typeof window.JSONSchemaFaker !== "undefined") {
    window.JSONSchemaFaker.extend("faker", () => window.faker);
    window.JSONSchemaFaker.extend("chance", () => window.chance);
  }
  new Auth_default({ target: document.getElementById("auth") });
  new Editor_default({ target: document.getElementById("editor") });
}
function debug(msg) {
  document.querySelector(".loading-overlay .jsf-logo").classList.remove("float");
  document.querySelector(".loading-overlay .tac").innerHTML = `
    <p style="max-width:200px" class="mt mb cnt">${msg}</p>
    <button onclick="window.close()" class="bu">Close window</button>
  `;
}
if (window.location.search.includes("?code=")) {
  document.querySelector(".loading-overlay .tac").innerText = "Authenticating...";
  (0, import_gists5.auth)(window.location.search.split("?code=")[1], () => {
    const cleanUrl = window.location.href.split("?")[0];
    window.history.replaceState(null, "", cleanUrl);
    if (window.opener) {
      window.close();
    }
  });
} else if (window.location.search.includes("?error=")) {
  const message = window.location.search.split("error_description=")[1];
  const error = message.split("&")[0].replace(/\+/g, " ");
  debug(error);
} else {
  setTimeout(() => {
    document.querySelector(".loading-overlay").classList.add("fade-out");
    main();
  }, 1260);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL25vZGVfbW9kdWxlcy9zdmVsdGUvaW50ZXJuYWwvaW5kZXguanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMvc3ZlbHRlL3N0b3JlL2luZGV4LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL3dlYi9qcy9saWIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvd2ViL2pzL2xpYi9naXN0cy5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy93ZWIvanMvYXBwLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9pbnRlcm5hbC9pbmRleC5tanMiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMvc3ZlbHRlL3N0b3JlL2luZGV4Lm1qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL25vZGVfbW9kdWxlcy95cnYvYnVpbGQvZGlzdC9saWIvdmVuZG9yLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL3lydi9idWlsZC9kaXN0L2xpYi91dGlscy5qcyIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL25vZGVfbW9kdWxlcy95cnYvYnVpbGQvZGlzdC9saWIvcm91dGVyLmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL3lydi9idWlsZC9kaXN0L2xpYi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL25vZGVfbW9kdWxlcy95cnYvYnVpbGQvZGlzdC9saWIvUm91dGVyLnN2ZWx0ZSIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL25vZGVfbW9kdWxlcy95cnYvYnVpbGQvZGlzdC9saWIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMveXJ2L2J1aWxkL2Rpc3QvbGliL1JvdXRlLnN2ZWx0ZSIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL25vZGVfbW9kdWxlcy95cnYvYnVpbGQvZGlzdC9saWIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMveXJ2L2J1aWxkL2Rpc3QvbGliL0xpbmsuc3ZlbHRlIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL3lydi9idWlsZC9kaXN0L2luZGV4LmpzIiwiL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL3dlYi9qcy9saWIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvd2ViL2pzL2xpYi9BdXRoLnN2ZWx0ZSIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy93ZWIvanMvbGliL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL3dlYi9qcy9saWIvSWNvbi5zdmVsdGUiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9ub2RlX21vZHVsZXMvc21vby9idWlsZC9jb21wb25lbnRzL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvbm9kZV9tb2R1bGVzL3Ntb28vYnVpbGQvY29tcG9uZW50cy9GZW5jZS5zdmVsdGUiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvd2ViL2pzL2xpYi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy93ZWIvanMvbGliL01vZGFsLnN2ZWx0ZSIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy93ZWIvanMvbGliL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL3dlYi9qcy9saWIvT3B0cy5zdmVsdGUiLCIvVXNlcnMvYWx2YXJvL1dvcmtzcGFjZS9qc29uLXNjaGVtYS1mYWtlci9zcmMvd2ViL2pzL2xpYi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy93ZWIvanMvbGliL0dpc3RzLnN2ZWx0ZSIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy93ZWIvanMvbGliL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL3dlYi9qcy9saWIvQWNlLnN2ZWx0ZSIsIi9Vc2Vycy9hbHZhcm8vV29ya3NwYWNlL2pzb24tc2NoZW1hLWZha2VyL3NyYy93ZWIvanMvbGliL1VzZXJzL2FsdmFyby9Xb3Jrc3BhY2UvanNvbi1zY2hlbWEtZmFrZXIvc3JjL3dlYi9qcy9saWIvRWRpdG9yLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7IH1cbmNvbnN0IGlkZW50aXR5ID0geCA9PiB4O1xuZnVuY3Rpb24gYXNzaWduKHRhciwgc3JjKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGZvciAoY29uc3QgayBpbiBzcmMpXG4gICAgICAgIHRhcltrXSA9IHNyY1trXTtcbiAgICByZXR1cm4gdGFyO1xufVxuZnVuY3Rpb24gaXNfcHJvbWlzZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nO1xufVxuZnVuY3Rpb24gYWRkX2xvY2F0aW9uKGVsZW1lbnQsIGZpbGUsIGxpbmUsIGNvbHVtbiwgY2hhcikge1xuICAgIGVsZW1lbnQuX19zdmVsdGVfbWV0YSA9IHtcbiAgICAgICAgbG9jOiB7IGZpbGUsIGxpbmUsIGNvbHVtbiwgY2hhciB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHJ1bihmbikge1xuICAgIHJldHVybiBmbigpO1xufVxuZnVuY3Rpb24gYmxhbmtfb2JqZWN0KCkge1xuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKG51bGwpO1xufVxuZnVuY3Rpb24gcnVuX2FsbChmbnMpIHtcbiAgICBmbnMuZm9yRWFjaChydW4pO1xufVxuZnVuY3Rpb24gaXNfZnVuY3Rpb24odGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSAnZnVuY3Rpb24nO1xufVxuZnVuY3Rpb24gc2FmZV9ub3RfZXF1YWwoYSwgYikge1xuICAgIHJldHVybiBhICE9IGEgPyBiID09IGIgOiBhICE9PSBiIHx8ICgoYSAmJiB0eXBlb2YgYSA9PT0gJ29iamVjdCcpIHx8IHR5cGVvZiBhID09PSAnZnVuY3Rpb24nKTtcbn1cbmZ1bmN0aW9uIG5vdF9lcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGI7XG59XG5mdW5jdGlvbiBpc19lbXB0eShvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDA7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9zdG9yZShzdG9yZSwgbmFtZSkge1xuICAgIGlmIChzdG9yZSAhPSBudWxsICYmIHR5cGVvZiBzdG9yZS5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAnJHtuYW1lfScgaXMgbm90IGEgc3RvcmUgd2l0aCBhICdzdWJzY3JpYmUnIG1ldGhvZGApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHN1YnNjcmliZShzdG9yZSwgLi4uY2FsbGJhY2tzKSB7XG4gICAgaWYgKHN0b3JlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfVxuICAgIGNvbnN0IHVuc3ViID0gc3RvcmUuc3Vic2NyaWJlKC4uLmNhbGxiYWNrcyk7XG4gICAgcmV0dXJuIHVuc3ViLnVuc3Vic2NyaWJlID8gKCkgPT4gdW5zdWIudW5zdWJzY3JpYmUoKSA6IHVuc3ViO1xufVxuZnVuY3Rpb24gZ2V0X3N0b3JlX3ZhbHVlKHN0b3JlKSB7XG4gICAgbGV0IHZhbHVlO1xuICAgIHN1YnNjcmliZShzdG9yZSwgXyA9PiB2YWx1ZSA9IF8pKCk7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gY29tcG9uZW50X3N1YnNjcmliZShjb21wb25lbnQsIHN0b3JlLCBjYWxsYmFjaykge1xuICAgIGNvbXBvbmVudC4kJC5vbl9kZXN0cm95LnB1c2goc3Vic2NyaWJlKHN0b3JlLCBjYWxsYmFjaykpO1xufVxuZnVuY3Rpb24gY3JlYXRlX3Nsb3QoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbikge1xuICAgIGlmIChkZWZpbml0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNsb3RfY3R4ID0gZ2V0X3Nsb3RfY29udGV4dChkZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGZuKTtcbiAgICAgICAgcmV0dXJuIGRlZmluaXRpb25bMF0oc2xvdF9jdHgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbikge1xuICAgIHJldHVybiBkZWZpbml0aW9uWzFdICYmIGZuXG4gICAgICAgID8gYXNzaWduKCQkc2NvcGUuY3R4LnNsaWNlKCksIGRlZmluaXRpb25bMV0oZm4oY3R4KSkpXG4gICAgICAgIDogJCRzY29wZS5jdHg7XG59XG5mdW5jdGlvbiBnZXRfc2xvdF9jaGFuZ2VzKGRlZmluaXRpb24sICQkc2NvcGUsIGRpcnR5LCBmbikge1xuICAgIGlmIChkZWZpbml0aW9uWzJdICYmIGZuKSB7XG4gICAgICAgIGNvbnN0IGxldHMgPSBkZWZpbml0aW9uWzJdKGZuKGRpcnR5KSk7XG4gICAgICAgIGlmICgkJHNjb3BlLmRpcnR5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBsZXRzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbGV0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZCA9IFtdO1xuICAgICAgICAgICAgY29uc3QgbGVuID0gTWF0aC5tYXgoJCRzY29wZS5kaXJ0eS5sZW5ndGgsIGxldHMubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRbaV0gPSAkJHNjb3BlLmRpcnR5W2ldIHwgbGV0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtZXJnZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICQkc2NvcGUuZGlydHkgfCBsZXRzO1xuICAgIH1cbiAgICByZXR1cm4gJCRzY29wZS5kaXJ0eTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZV9zbG90KHNsb3QsIHNsb3RfZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBkaXJ0eSwgZ2V0X3Nsb3RfY2hhbmdlc19mbiwgZ2V0X3Nsb3RfY29udGV4dF9mbikge1xuICAgIGNvbnN0IHNsb3RfY2hhbmdlcyA9IGdldF9zbG90X2NoYW5nZXMoc2xvdF9kZWZpbml0aW9uLCAkJHNjb3BlLCBkaXJ0eSwgZ2V0X3Nsb3RfY2hhbmdlc19mbik7XG4gICAgaWYgKHNsb3RfY2hhbmdlcykge1xuICAgICAgICBjb25zdCBzbG90X2NvbnRleHQgPSBnZXRfc2xvdF9jb250ZXh0KHNsb3RfZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBnZXRfc2xvdF9jb250ZXh0X2ZuKTtcbiAgICAgICAgc2xvdC5wKHNsb3RfY29udGV4dCwgc2xvdF9jaGFuZ2VzKTtcbiAgICB9XG59XG5mdW5jdGlvbiB1cGRhdGVfc2xvdF9zcHJlYWQoc2xvdCwgc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGRpcnR5LCBnZXRfc2xvdF9jaGFuZ2VzX2ZuLCBnZXRfc2xvdF9zcHJlYWRfY2hhbmdlc19mbiwgZ2V0X3Nsb3RfY29udGV4dF9mbikge1xuICAgIGNvbnN0IHNsb3RfY2hhbmdlcyA9IGdldF9zbG90X3NwcmVhZF9jaGFuZ2VzX2ZuKGRpcnR5KSB8IGdldF9zbG90X2NoYW5nZXMoc2xvdF9kZWZpbml0aW9uLCAkJHNjb3BlLCBkaXJ0eSwgZ2V0X3Nsb3RfY2hhbmdlc19mbik7XG4gICAgaWYgKHNsb3RfY2hhbmdlcykge1xuICAgICAgICBjb25zdCBzbG90X2NvbnRleHQgPSBnZXRfc2xvdF9jb250ZXh0KHNsb3RfZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBnZXRfc2xvdF9jb250ZXh0X2ZuKTtcbiAgICAgICAgc2xvdC5wKHNsb3RfY29udGV4dCwgc2xvdF9jaGFuZ2VzKTtcbiAgICB9XG59XG5mdW5jdGlvbiBleGNsdWRlX2ludGVybmFsX3Byb3BzKHByb3BzKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBrIGluIHByb3BzKVxuICAgICAgICBpZiAoa1swXSAhPT0gJyQnKVxuICAgICAgICAgICAgcmVzdWx0W2tdID0gcHJvcHNba107XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGNvbXB1dGVfcmVzdF9wcm9wcyhwcm9wcywga2V5cykge1xuICAgIGNvbnN0IHJlc3QgPSB7fTtcbiAgICBrZXlzID0gbmV3IFNldChrZXlzKTtcbiAgICBmb3IgKGNvbnN0IGsgaW4gcHJvcHMpXG4gICAgICAgIGlmICgha2V5cy5oYXMoaykgJiYga1swXSAhPT0gJyQnKVxuICAgICAgICAgICAgcmVzdFtrXSA9IHByb3BzW2tdO1xuICAgIHJldHVybiByZXN0O1xufVxuZnVuY3Rpb24gY29tcHV0ZV9zbG90cyhzbG90cykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNsb3RzKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG9uY2UoZm4pIHtcbiAgICBsZXQgcmFuID0gZmFsc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIGlmIChyYW4pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHJhbiA9IHRydWU7XG4gICAgICAgIGZuLmNhbGwodGhpcywgLi4uYXJncyk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG51bGxfdG9fZW1wdHkodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG59XG5mdW5jdGlvbiBzZXRfc3RvcmVfdmFsdWUoc3RvcmUsIHJldCwgdmFsdWUgPSByZXQpIHtcbiAgICBzdG9yZS5zZXQodmFsdWUpO1xuICAgIHJldHVybiByZXQ7XG59XG5jb25zdCBoYXNfcHJvcCA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xuZnVuY3Rpb24gYWN0aW9uX2Rlc3Ryb3llcihhY3Rpb25fcmVzdWx0KSB7XG4gICAgcmV0dXJuIGFjdGlvbl9yZXN1bHQgJiYgaXNfZnVuY3Rpb24oYWN0aW9uX3Jlc3VsdC5kZXN0cm95KSA/IGFjdGlvbl9yZXN1bHQuZGVzdHJveSA6IG5vb3A7XG59XG5cbmNvbnN0IGlzX2NsaWVudCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuZXhwb3J0cy5ub3cgPSBpc19jbGllbnRcbiAgICA/ICgpID0+IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgIDogKCkgPT4gRGF0ZS5ub3coKTtcbmV4cG9ydHMucmFmID0gaXNfY2xpZW50ID8gY2IgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNiKSA6IG5vb3A7XG4vLyB1c2VkIGludGVybmFsbHkgZm9yIHRlc3RpbmdcbmZ1bmN0aW9uIHNldF9ub3coZm4pIHtcbiAgICBleHBvcnRzLm5vdyA9IGZuO1xufVxuZnVuY3Rpb24gc2V0X3JhZihmbikge1xuICAgIGV4cG9ydHMucmFmID0gZm47XG59XG5cbmNvbnN0IHRhc2tzID0gbmV3IFNldCgpO1xuZnVuY3Rpb24gcnVuX3Rhc2tzKG5vdykge1xuICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIGlmICghdGFzay5jKG5vdykpIHtcbiAgICAgICAgICAgIHRhc2tzLmRlbGV0ZSh0YXNrKTtcbiAgICAgICAgICAgIHRhc2suZigpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRhc2tzLnNpemUgIT09IDApXG4gICAgICAgIGV4cG9ydHMucmFmKHJ1bl90YXNrcyk7XG59XG4vKipcbiAqIEZvciB0ZXN0aW5nIHB1cnBvc2VzIG9ubHkhXG4gKi9cbmZ1bmN0aW9uIGNsZWFyX2xvb3BzKCkge1xuICAgIHRhc2tzLmNsZWFyKCk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdGFzayB0aGF0IHJ1bnMgb24gZWFjaCByYWYgZnJhbWVcbiAqIHVudGlsIGl0IHJldHVybnMgYSBmYWxzeSB2YWx1ZSBvciBpcyBhYm9ydGVkXG4gKi9cbmZ1bmN0aW9uIGxvb3AoY2FsbGJhY2spIHtcbiAgICBsZXQgdGFzaztcbiAgICBpZiAodGFza3Muc2l6ZSA9PT0gMClcbiAgICAgICAgZXhwb3J0cy5yYWYocnVuX3Rhc2tzKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlOiBuZXcgUHJvbWlzZShmdWxmaWxsID0+IHtcbiAgICAgICAgICAgIHRhc2tzLmFkZCh0YXNrID0geyBjOiBjYWxsYmFjaywgZjogZnVsZmlsbCB9KTtcbiAgICAgICAgfSksXG4gICAgICAgIGFib3J0KCkge1xuICAgICAgICAgICAgdGFza3MuZGVsZXRlKHRhc2spO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLy8gVHJhY2sgd2hpY2ggbm9kZXMgYXJlIGNsYWltZWQgZHVyaW5nIGh5ZHJhdGlvbi4gVW5jbGFpbWVkIG5vZGVzIGNhbiB0aGVuIGJlIHJlbW92ZWQgZnJvbSB0aGUgRE9NXG4vLyBhdCB0aGUgZW5kIG9mIGh5ZHJhdGlvbiB3aXRob3V0IHRvdWNoaW5nIHRoZSByZW1haW5pbmcgbm9kZXMuXG5sZXQgaXNfaHlkcmF0aW5nID0gZmFsc2U7XG5mdW5jdGlvbiBzdGFydF9oeWRyYXRpbmcoKSB7XG4gICAgaXNfaHlkcmF0aW5nID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGVuZF9oeWRyYXRpbmcoKSB7XG4gICAgaXNfaHlkcmF0aW5nID0gZmFsc2U7XG59XG5mdW5jdGlvbiB1cHBlcl9ib3VuZChsb3csIGhpZ2gsIGtleSwgdmFsdWUpIHtcbiAgICAvLyBSZXR1cm4gZmlyc3QgaW5kZXggb2YgdmFsdWUgbGFyZ2VyIHRoYW4gaW5wdXQgdmFsdWUgaW4gdGhlIHJhbmdlIFtsb3csIGhpZ2gpXG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgICAgY29uc3QgbWlkID0gbG93ICsgKChoaWdoIC0gbG93KSA+PiAxKTtcbiAgICAgICAgaWYgKGtleShtaWQpIDw9IHZhbHVlKSB7XG4gICAgICAgICAgICBsb3cgPSBtaWQgKyAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGlnaCA9IG1pZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbG93O1xufVxuZnVuY3Rpb24gaW5pdF9oeWRyYXRlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuaHlkcmF0ZV9pbml0KVxuICAgICAgICByZXR1cm47XG4gICAgdGFyZ2V0Lmh5ZHJhdGVfaW5pdCA9IHRydWU7XG4gICAgLy8gV2Uga25vdyB0aGF0IGFsbCBjaGlsZHJlbiBoYXZlIGNsYWltX29yZGVyIHZhbHVlcyBzaW5jZSB0aGUgdW5jbGFpbWVkIGhhdmUgYmVlbiBkZXRhY2hlZFxuICAgIGNvbnN0IGNoaWxkcmVuID0gdGFyZ2V0LmNoaWxkTm9kZXM7XG4gICAgLypcbiAgICAqIFJlb3JkZXIgY2xhaW1lZCBjaGlsZHJlbiBvcHRpbWFsbHkuXG4gICAgKiBXZSBjYW4gcmVvcmRlciBjbGFpbWVkIGNoaWxkcmVuIG9wdGltYWxseSBieSBmaW5kaW5nIHRoZSBsb25nZXN0IHN1YnNlcXVlbmNlIG9mXG4gICAgKiBub2RlcyB0aGF0IGFyZSBhbHJlYWR5IGNsYWltZWQgaW4gb3JkZXIgYW5kIG9ubHkgbW92aW5nIHRoZSByZXN0LiBUaGUgbG9uZ2VzdFxuICAgICogc3Vic2VxdWVuY2Ugc3Vic2VxdWVuY2Ugb2Ygbm9kZXMgdGhhdCBhcmUgY2xhaW1lZCBpbiBvcmRlciBjYW4gYmUgZm91bmQgYnlcbiAgICAqIGNvbXB1dGluZyB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlIG9mIC5jbGFpbV9vcmRlciB2YWx1ZXMuXG4gICAgKlxuICAgICogVGhpcyBhbGdvcml0aG0gaXMgb3B0aW1hbCBpbiBnZW5lcmF0aW5nIHRoZSBsZWFzdCBhbW91bnQgb2YgcmVvcmRlciBvcGVyYXRpb25zXG4gICAgKiBwb3NzaWJsZS5cbiAgICAqXG4gICAgKiBQcm9vZjpcbiAgICAqIFdlIGtub3cgdGhhdCwgZ2l2ZW4gYSBzZXQgb2YgcmVvcmRlcmluZyBvcGVyYXRpb25zLCB0aGUgbm9kZXMgdGhhdCBkbyBub3QgbW92ZVxuICAgICogYWx3YXlzIGZvcm0gYW4gaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSwgc2luY2UgdGhleSBkbyBub3QgbW92ZSBhbW9uZyBlYWNoIG90aGVyXG4gICAgKiBtZWFuaW5nIHRoYXQgdGhleSBtdXN0IGJlIGFscmVhZHkgb3JkZXJlZCBhbW9uZyBlYWNoIG90aGVyLiBUaHVzLCB0aGUgbWF4aW1hbFxuICAgICogc2V0IG9mIG5vZGVzIHRoYXQgZG8gbm90IG1vdmUgZm9ybSBhIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZS5cbiAgICAqL1xuICAgIC8vIENvbXB1dGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlXG4gICAgLy8gbTogc3Vic2VxdWVuY2UgbGVuZ3RoIGogPT4gaW5kZXggayBvZiBzbWFsbGVzdCB2YWx1ZSB0aGF0IGVuZHMgYW4gaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiBsZW5ndGggalxuICAgIGNvbnN0IG0gPSBuZXcgSW50MzJBcnJheShjaGlsZHJlbi5sZW5ndGggKyAxKTtcbiAgICAvLyBQcmVkZWNlc3NvciBpbmRpY2VzICsgMVxuICAgIGNvbnN0IHAgPSBuZXcgSW50MzJBcnJheShjaGlsZHJlbi5sZW5ndGgpO1xuICAgIG1bMF0gPSAtMTtcbiAgICBsZXQgbG9uZ2VzdCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gY2hpbGRyZW5baV0uY2xhaW1fb3JkZXI7XG4gICAgICAgIC8vIEZpbmQgdGhlIGxhcmdlc3Qgc3Vic2VxdWVuY2UgbGVuZ3RoIHN1Y2ggdGhhdCBpdCBlbmRzIGluIGEgdmFsdWUgbGVzcyB0aGFuIG91ciBjdXJyZW50IHZhbHVlXG4gICAgICAgIC8vIHVwcGVyX2JvdW5kIHJldHVybnMgZmlyc3QgZ3JlYXRlciB2YWx1ZSwgc28gd2Ugc3VidHJhY3Qgb25lXG4gICAgICAgIGNvbnN0IHNlcUxlbiA9IHVwcGVyX2JvdW5kKDEsIGxvbmdlc3QgKyAxLCBpZHggPT4gY2hpbGRyZW5bbVtpZHhdXS5jbGFpbV9vcmRlciwgY3VycmVudCkgLSAxO1xuICAgICAgICBwW2ldID0gbVtzZXFMZW5dICsgMTtcbiAgICAgICAgY29uc3QgbmV3TGVuID0gc2VxTGVuICsgMTtcbiAgICAgICAgLy8gV2UgY2FuIGd1YXJhbnRlZSB0aGF0IGN1cnJlbnQgaXMgdGhlIHNtYWxsZXN0IHZhbHVlLiBPdGhlcndpc2UsIHdlIHdvdWxkIGhhdmUgZ2VuZXJhdGVkIGEgbG9uZ2VyIHNlcXVlbmNlLlxuICAgICAgICBtW25ld0xlbl0gPSBpO1xuICAgICAgICBsb25nZXN0ID0gTWF0aC5tYXgobmV3TGVuLCBsb25nZXN0KTtcbiAgICB9XG4gICAgLy8gVGhlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiBub2RlcyAoaW5pdGlhbGx5IHJldmVyc2VkKVxuICAgIGNvbnN0IGxpcyA9IFtdO1xuICAgIC8vIFRoZSByZXN0IG9mIHRoZSBub2Rlcywgbm9kZXMgdGhhdCB3aWxsIGJlIG1vdmVkXG4gICAgY29uc3QgdG9Nb3ZlID0gW107XG4gICAgbGV0IGxhc3QgPSBjaGlsZHJlbi5sZW5ndGggLSAxO1xuICAgIGZvciAobGV0IGN1ciA9IG1bbG9uZ2VzdF0gKyAxOyBjdXIgIT0gMDsgY3VyID0gcFtjdXIgLSAxXSkge1xuICAgICAgICBsaXMucHVzaChjaGlsZHJlbltjdXIgLSAxXSk7XG4gICAgICAgIGZvciAoOyBsYXN0ID49IGN1cjsgbGFzdC0tKSB7XG4gICAgICAgICAgICB0b01vdmUucHVzaChjaGlsZHJlbltsYXN0XSk7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdC0tO1xuICAgIH1cbiAgICBmb3IgKDsgbGFzdCA+PSAwOyBsYXN0LS0pIHtcbiAgICAgICAgdG9Nb3ZlLnB1c2goY2hpbGRyZW5bbGFzdF0pO1xuICAgIH1cbiAgICBsaXMucmV2ZXJzZSgpO1xuICAgIC8vIFdlIHNvcnQgdGhlIG5vZGVzIGJlaW5nIG1vdmVkIHRvIGd1YXJhbnRlZSB0aGF0IHRoZWlyIGluc2VydGlvbiBvcmRlciBtYXRjaGVzIHRoZSBjbGFpbSBvcmRlclxuICAgIHRvTW92ZS5zb3J0KChhLCBiKSA9PiBhLmNsYWltX29yZGVyIC0gYi5jbGFpbV9vcmRlcik7XG4gICAgLy8gRmluYWxseSwgd2UgbW92ZSB0aGUgbm9kZXNcbiAgICBmb3IgKGxldCBpID0gMCwgaiA9IDA7IGkgPCB0b01vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgd2hpbGUgKGogPCBsaXMubGVuZ3RoICYmIHRvTW92ZVtpXS5jbGFpbV9vcmRlciA+PSBsaXNbal0uY2xhaW1fb3JkZXIpIHtcbiAgICAgICAgICAgIGorKztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbmNob3IgPSBqIDwgbGlzLmxlbmd0aCA/IGxpc1tqXSA6IG51bGw7XG4gICAgICAgIHRhcmdldC5pbnNlcnRCZWZvcmUodG9Nb3ZlW2ldLCBhbmNob3IpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFwcGVuZCh0YXJnZXQsIG5vZGUpIHtcbiAgICBpZiAoaXNfaHlkcmF0aW5nKSB7XG4gICAgICAgIGluaXRfaHlkcmF0ZSh0YXJnZXQpO1xuICAgICAgICBpZiAoKHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkID09PSB1bmRlZmluZWQpIHx8ICgodGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgIT09IG51bGwpICYmICh0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZC5wYXJlbnRFbGVtZW50ICE9PSB0YXJnZXQpKSkge1xuICAgICAgICAgICAgdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgPSB0YXJnZXQuZmlyc3RDaGlsZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZSAhPT0gdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQpIHtcbiAgICAgICAgICAgIHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUucGFyZW50Tm9kZSAhPT0gdGFyZ2V0KSB7XG4gICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChub2RlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbnNlcnQodGFyZ2V0LCBub2RlLCBhbmNob3IpIHtcbiAgICBpZiAoaXNfaHlkcmF0aW5nICYmICFhbmNob3IpIHtcbiAgICAgICAgYXBwZW5kKHRhcmdldCwgbm9kZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUucGFyZW50Tm9kZSAhPT0gdGFyZ2V0IHx8IChhbmNob3IgJiYgbm9kZS5uZXh0U2libGluZyAhPT0gYW5jaG9yKSkge1xuICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKG5vZGUsIGFuY2hvciB8fCBudWxsKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRhY2gobm9kZSkge1xuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbn1cbmZ1bmN0aW9uIGRlc3Ryb3lfZWFjaChpdGVyYXRpb25zLCBkZXRhY2hpbmcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGl0ZXJhdGlvbnNbaV0pXG4gICAgICAgICAgICBpdGVyYXRpb25zW2ldLmQoZGV0YWNoaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBlbGVtZW50KG5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRfaXMobmFtZSwgaXMpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lLCB7IGlzIH0pO1xufVxuZnVuY3Rpb24gb2JqZWN0X3dpdGhvdXRfcHJvcGVydGllcyhvYmosIGV4Y2x1ZGUpIHtcbiAgICBjb25zdCB0YXJnZXQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGsgaW4gb2JqKSB7XG4gICAgICAgIGlmIChoYXNfcHJvcChvYmosIGspXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAmJiBleGNsdWRlLmluZGV4T2YoaykgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0YXJnZXRba10gPSBvYmpba107XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIHN2Z19lbGVtZW50KG5hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIG5hbWUpO1xufVxuZnVuY3Rpb24gdGV4dChkYXRhKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRhdGEpO1xufVxuZnVuY3Rpb24gc3BhY2UoKSB7XG4gICAgcmV0dXJuIHRleHQoJyAnKTtcbn1cbmZ1bmN0aW9uIGVtcHR5KCkge1xuICAgIHJldHVybiB0ZXh0KCcnKTtcbn1cbmZ1bmN0aW9uIGxpc3Rlbihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucykge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgcmV0dXJuICgpID0+IG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG59XG5mdW5jdGlvbiBwcmV2ZW50X2RlZmF1bHQoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBzdG9wX3Byb3BhZ2F0aW9uKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHNlbGYoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcylcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICBlbHNlIGlmIChub2RlLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpICE9PSB2YWx1ZSlcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBzZXRfYXR0cmlidXRlcyhub2RlLCBhdHRyaWJ1dGVzKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMobm9kZS5fX3Byb3RvX18pO1xuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXNba2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ19fdmFsdWUnKSB7XG4gICAgICAgICAgICBub2RlLnZhbHVlID0gbm9kZVtrZXldID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0b3JzW2tleV0gJiYgZGVzY3JpcHRvcnNba2V5XS5zZXQpIHtcbiAgICAgICAgICAgIG5vZGVba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF0dHIobm9kZSwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X3N2Z19hdHRyaWJ1dGVzKG5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGF0dHIobm9kZSwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9jdXN0b21fZWxlbWVudF9kYXRhKG5vZGUsIHByb3AsIHZhbHVlKSB7XG4gICAgaWYgKHByb3AgaW4gbm9kZSkge1xuICAgICAgICBub2RlW3Byb3BdID0gdHlwZW9mIG5vZGVbcHJvcF0gPT09ICdib29sZWFuJyAmJiB2YWx1ZSA9PT0gJycgPyB0cnVlIDogdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhdHRyKG5vZGUsIHByb3AsIHZhbHVlKTtcbiAgICB9XG59XG5mdW5jdGlvbiB4bGlua19hdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBub2RlLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgYXR0cmlidXRlLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBnZXRfYmluZGluZ19ncm91cF92YWx1ZShncm91cCwgX192YWx1ZSwgY2hlY2tlZCkge1xuICAgIGNvbnN0IHZhbHVlID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGdyb3VwW2ldLmNoZWNrZWQpXG4gICAgICAgICAgICB2YWx1ZS5hZGQoZ3JvdXBbaV0uX192YWx1ZSk7XG4gICAgfVxuICAgIGlmICghY2hlY2tlZCkge1xuICAgICAgICB2YWx1ZS5kZWxldGUoX192YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHRvX251bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gJycgPyBudWxsIDogK3ZhbHVlO1xufVxuZnVuY3Rpb24gdGltZV9yYW5nZXNfdG9fYXJyYXkocmFuZ2VzKSB7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBhcnJheS5wdXNoKHsgc3RhcnQ6IHJhbmdlcy5zdGFydChpKSwgZW5kOiByYW5nZXMuZW5kKGkpIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG59XG5mdW5jdGlvbiBjaGlsZHJlbihlbGVtZW50KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKTtcbn1cbmZ1bmN0aW9uIGNsYWltX25vZGUobm9kZXMsIHByZWRpY2F0ZSwgcHJvY2Vzc05vZGUsIGNyZWF0ZU5vZGUsIGRvbnRVcGRhdGVMYXN0SW5kZXggPSBmYWxzZSkge1xuICAgIC8vIFRyeSB0byBmaW5kIG5vZGVzIGluIGFuIG9yZGVyIHN1Y2ggdGhhdCB3ZSBsZW5ndGhlbiB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlXG4gICAgaWYgKG5vZGVzLmNsYWltX2luZm8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBub2Rlcy5jbGFpbV9pbmZvID0geyBsYXN0X2luZGV4OiAwLCB0b3RhbF9jbGFpbWVkOiAwIH07XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdE5vZGUgPSAoKCkgPT4ge1xuICAgICAgICAvLyBXZSBmaXJzdCB0cnkgdG8gZmluZCBhbiBlbGVtZW50IGFmdGVyIHRoZSBwcmV2aW91cyBvbmVcbiAgICAgICAgZm9yIChsZXQgaSA9IG5vZGVzLmNsYWltX2luZm8ubGFzdF9pbmRleDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc05vZGUobm9kZSk7XG4gICAgICAgICAgICAgICAgbm9kZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGlmICghZG9udFVwZGF0ZUxhc3RJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5jbGFpbV9pbmZvLmxhc3RfaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2UsIHdlIHRyeSB0byBmaW5kIG9uZSBiZWZvcmVcbiAgICAgICAgLy8gV2UgaXRlcmF0ZSBpbiByZXZlcnNlIHNvIHRoYXQgd2UgZG9uJ3QgZ28gdG9vIGZhciBiYWNrXG4gICAgICAgIGZvciAobGV0IGkgPSBub2Rlcy5jbGFpbV9pbmZvLmxhc3RfaW5kZXggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShub2RlKSkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NOb2RlKG5vZGUpO1xuICAgICAgICAgICAgICAgIG5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBpZiAoIWRvbnRVcGRhdGVMYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHdlIHNwbGljZWQgYmVmb3JlIHRoZSBsYXN0X2luZGV4LCB3ZSBkZWNyZWFzZSBpdFxuICAgICAgICAgICAgICAgICAgICBub2Rlcy5jbGFpbV9pbmZvLmxhc3RfaW5kZXgtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgY2FuJ3QgZmluZCBhbnkgbWF0Y2hpbmcgbm9kZSwgd2UgY3JlYXRlIGEgbmV3IG9uZVxuICAgICAgICByZXR1cm4gY3JlYXRlTm9kZSgpO1xuICAgIH0pKCk7XG4gICAgcmVzdWx0Tm9kZS5jbGFpbV9vcmRlciA9IG5vZGVzLmNsYWltX2luZm8udG90YWxfY2xhaW1lZDtcbiAgICBub2Rlcy5jbGFpbV9pbmZvLnRvdGFsX2NsYWltZWQgKz0gMTtcbiAgICByZXR1cm4gcmVzdWx0Tm9kZTtcbn1cbmZ1bmN0aW9uIGNsYWltX2VsZW1lbnQobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMsIHN2Zykge1xuICAgIHJldHVybiBjbGFpbV9ub2RlKG5vZGVzLCAobm9kZSkgPT4gbm9kZS5ub2RlTmFtZSA9PT0gbmFtZSwgKG5vZGUpID0+IHtcbiAgICAgICAgY29uc3QgcmVtb3ZlID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBub2RlLmF0dHJpYnV0ZXNbal07XG4gICAgICAgICAgICBpZiAoIWF0dHJpYnV0ZXNbYXR0cmlidXRlLm5hbWVdKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlLnB1c2goYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlbW92ZS5mb3JFYWNoKHYgPT4gbm9kZS5yZW1vdmVBdHRyaWJ1dGUodikpO1xuICAgIH0sICgpID0+IHN2ZyA/IHN2Z19lbGVtZW50KG5hbWUpIDogZWxlbWVudChuYW1lKSk7XG59XG5mdW5jdGlvbiBjbGFpbV90ZXh0KG5vZGVzLCBkYXRhKSB7XG4gICAgcmV0dXJuIGNsYWltX25vZGUobm9kZXMsIChub2RlKSA9PiBub2RlLm5vZGVUeXBlID09PSAzLCAobm9kZSkgPT4ge1xuICAgICAgICBub2RlLmRhdGEgPSAnJyArIGRhdGE7XG4gICAgfSwgKCkgPT4gdGV4dChkYXRhKSwgdHJ1ZSAvLyBUZXh0IG5vZGVzIHNob3VsZCBub3QgdXBkYXRlIGxhc3QgaW5kZXggc2luY2UgaXQgaXMgbGlrZWx5IG5vdCB3b3J0aCBpdCB0byBlbGltaW5hdGUgYW4gaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiBhY3R1YWwgZWxlbWVudHNcbiAgICApO1xufVxuZnVuY3Rpb24gY2xhaW1fc3BhY2Uobm9kZXMpIHtcbiAgICByZXR1cm4gY2xhaW1fdGV4dChub2RlcywgJyAnKTtcbn1cbmZ1bmN0aW9uIGZpbmRfY29tbWVudChub2RlcywgdGV4dCwgc3RhcnQpIHtcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSA4IC8qIGNvbW1lbnQgbm9kZSAqLyAmJiBub2RlLnRleHRDb250ZW50LnRyaW0oKSA9PT0gdGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzLmxlbmd0aDtcbn1cbmZ1bmN0aW9uIGNsYWltX2h0bWxfdGFnKG5vZGVzKSB7XG4gICAgLy8gZmluZCBodG1sIG9wZW5pbmcgdGFnXG4gICAgY29uc3Qgc3RhcnRfaW5kZXggPSBmaW5kX2NvbW1lbnQobm9kZXMsICdIVE1MX1RBR19TVEFSVCcsIDApO1xuICAgIGNvbnN0IGVuZF9pbmRleCA9IGZpbmRfY29tbWVudChub2RlcywgJ0hUTUxfVEFHX0VORCcsIHN0YXJ0X2luZGV4KTtcbiAgICBpZiAoc3RhcnRfaW5kZXggPT09IGVuZF9pbmRleCkge1xuICAgICAgICByZXR1cm4gbmV3IEh0bWxUYWcoKTtcbiAgICB9XG4gICAgY29uc3QgaHRtbF90YWdfbm9kZXMgPSBub2Rlcy5zcGxpY2Uoc3RhcnRfaW5kZXgsIGVuZF9pbmRleCArIDEpO1xuICAgIGRldGFjaChodG1sX3RhZ19ub2Rlc1swXSk7XG4gICAgZGV0YWNoKGh0bWxfdGFnX25vZGVzW2h0bWxfdGFnX25vZGVzLmxlbmd0aCAtIDFdKTtcbiAgICByZXR1cm4gbmV3IEh0bWxUYWcoaHRtbF90YWdfbm9kZXMuc2xpY2UoMSwgaHRtbF90YWdfbm9kZXMubGVuZ3RoIC0gMSkpO1xufVxuZnVuY3Rpb24gc2V0X2RhdGEodGV4dCwgZGF0YSkge1xuICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gICAgaWYgKHRleHQud2hvbGVUZXh0ICE9PSBkYXRhKVxuICAgICAgICB0ZXh0LmRhdGEgPSBkYXRhO1xufVxuZnVuY3Rpb24gc2V0X2lucHV0X3ZhbHVlKGlucHV0LCB2YWx1ZSkge1xuICAgIGlucHV0LnZhbHVlID0gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG59XG5mdW5jdGlvbiBzZXRfaW5wdXRfdHlwZShpbnB1dCwgdHlwZSkge1xuICAgIHRyeSB7XG4gICAgICAgIGlucHV0LnR5cGUgPSB0eXBlO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X3N0eWxlKG5vZGUsIGtleSwgdmFsdWUsIGltcG9ydGFudCkge1xuICAgIG5vZGUuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSwgaW1wb3J0YW50ID8gJ2ltcG9ydGFudCcgOiAnJyk7XG59XG5mdW5jdGlvbiBzZWxlY3Rfb3B0aW9uKHNlbGVjdCwgdmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xuICAgICAgICBpZiAob3B0aW9uLl9fdmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gc2VsZWN0X29wdGlvbnMoc2VsZWN0LCB2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gc2VsZWN0Lm9wdGlvbnNbaV07XG4gICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IH52YWx1ZS5pbmRleE9mKG9wdGlvbi5fX3ZhbHVlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZWxlY3RfdmFsdWUoc2VsZWN0KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRfb3B0aW9uID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJzpjaGVja2VkJykgfHwgc2VsZWN0Lm9wdGlvbnNbMF07XG4gICAgcmV0dXJuIHNlbGVjdGVkX29wdGlvbiAmJiBzZWxlY3RlZF9vcHRpb24uX192YWx1ZTtcbn1cbmZ1bmN0aW9uIHNlbGVjdF9tdWx0aXBsZV92YWx1ZShzZWxlY3QpIHtcbiAgICByZXR1cm4gW10ubWFwLmNhbGwoc2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJzpjaGVja2VkJyksIG9wdGlvbiA9PiBvcHRpb24uX192YWx1ZSk7XG59XG4vLyB1bmZvcnR1bmF0ZWx5IHRoaXMgY2FuJ3QgYmUgYSBjb25zdGFudCBhcyB0aGF0IHdvdWxkbid0IGJlIHRyZWUtc2hha2VhYmxlXG4vLyBzbyB3ZSBjYWNoZSB0aGUgcmVzdWx0IGluc3RlYWRcbmxldCBjcm9zc29yaWdpbjtcbmZ1bmN0aW9uIGlzX2Nyb3Nzb3JpZ2luKCkge1xuICAgIGlmIChjcm9zc29yaWdpbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNyb3Nzb3JpZ2luID0gZmFsc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnBhcmVudCkge1xuICAgICAgICAgICAgICAgIHZvaWQgd2luZG93LnBhcmVudC5kb2N1bWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNyb3Nzb3JpZ2luID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3Jvc3NvcmlnaW47XG59XG5mdW5jdGlvbiBhZGRfcmVzaXplX2xpc3RlbmVyKG5vZGUsIGZuKSB7XG4gICAgY29uc3QgY29tcHV0ZWRfc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIGlmIChjb21wdXRlZF9zdHlsZS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgbm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgfVxuICAgIGNvbnN0IGlmcmFtZSA9IGVsZW1lbnQoJ2lmcmFtZScpO1xuICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6IGJsb2NrOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgJyArXG4gICAgICAgICdvdmVyZmxvdzogaGlkZGVuOyBib3JkZXI6IDA7IG9wYWNpdHk6IDA7IHBvaW50ZXItZXZlbnRzOiBub25lOyB6LWluZGV4OiAtMTsnKTtcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgaWZyYW1lLnRhYkluZGV4ID0gLTE7XG4gICAgY29uc3QgY3Jvc3NvcmlnaW4gPSBpc19jcm9zc29yaWdpbigpO1xuICAgIGxldCB1bnN1YnNjcmliZTtcbiAgICBpZiAoY3Jvc3NvcmlnaW4pIHtcbiAgICAgICAgaWZyYW1lLnNyYyA9IFwiZGF0YTp0ZXh0L2h0bWwsPHNjcmlwdD5vbnJlc2l6ZT1mdW5jdGlvbigpe3BhcmVudC5wb3N0TWVzc2FnZSgwLCcqJyl9PC9zY3JpcHQ+XCI7XG4gICAgICAgIHVuc3Vic2NyaWJlID0gbGlzdGVuKHdpbmRvdywgJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGlmcmFtZS5jb250ZW50V2luZG93KVxuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWZyYW1lLnNyYyA9ICdhYm91dDpibGFuayc7XG4gICAgICAgIGlmcmFtZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSA9IGxpc3RlbihpZnJhbWUuY29udGVudFdpbmRvdywgJ3Jlc2l6ZScsIGZuKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYXBwZW5kKG5vZGUsIGlmcmFtZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKGNyb3Nzb3JpZ2luKSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVuc3Vic2NyaWJlICYmIGlmcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGRldGFjaChpZnJhbWUpO1xuICAgIH07XG59XG5mdW5jdGlvbiB0b2dnbGVfY2xhc3MoZWxlbWVudCwgbmFtZSwgdG9nZ2xlKSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3RbdG9nZ2xlID8gJ2FkZCcgOiAncmVtb3ZlJ10obmFtZSk7XG59XG5mdW5jdGlvbiBjdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSwgZGV0YWlsKTtcbiAgICByZXR1cm4gZTtcbn1cbmZ1bmN0aW9uIHF1ZXJ5X3NlbGVjdG9yX2FsbChzZWxlY3RvciwgcGFyZW50ID0gZG9jdW1lbnQuYm9keSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG59XG5jbGFzcyBIdG1sVGFnIHtcbiAgICBjb25zdHJ1Y3RvcihjbGFpbWVkX25vZGVzKSB7XG4gICAgICAgIHRoaXMuZSA9IHRoaXMubiA9IG51bGw7XG4gICAgICAgIHRoaXMubCA9IGNsYWltZWRfbm9kZXM7XG4gICAgfVxuICAgIG0oaHRtbCwgdGFyZ2V0LCBhbmNob3IgPSBudWxsKSB7XG4gICAgICAgIGlmICghdGhpcy5lKSB7XG4gICAgICAgICAgICB0aGlzLmUgPSBlbGVtZW50KHRhcmdldC5ub2RlTmFtZSk7XG4gICAgICAgICAgICB0aGlzLnQgPSB0YXJnZXQ7XG4gICAgICAgICAgICBpZiAodGhpcy5sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uID0gdGhpcy5sO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oKGh0bWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaShhbmNob3IpO1xuICAgIH1cbiAgICBoKGh0bWwpIHtcbiAgICAgICAgdGhpcy5lLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgIHRoaXMubiA9IEFycmF5LmZyb20odGhpcy5lLmNoaWxkTm9kZXMpO1xuICAgIH1cbiAgICBpKGFuY2hvcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubi5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaW5zZXJ0KHRoaXMudCwgdGhpcy5uW2ldLCBhbmNob3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHAoaHRtbCkge1xuICAgICAgICB0aGlzLmQoKTtcbiAgICAgICAgdGhpcy5oKGh0bWwpO1xuICAgICAgICB0aGlzLmkodGhpcy5hKTtcbiAgICB9XG4gICAgZCgpIHtcbiAgICAgICAgdGhpcy5uLmZvckVhY2goZGV0YWNoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhdHRyaWJ1dGVfdG9fb2JqZWN0KGF0dHJpYnV0ZXMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGF0dHJpYnV0ZSBvZiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHJlc3VsdFthdHRyaWJ1dGUubmFtZV0gPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBnZXRfY3VzdG9tX2VsZW1lbnRzX3Nsb3RzKGVsZW1lbnQpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBlbGVtZW50LmNoaWxkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICByZXN1bHRbbm9kZS5zbG90IHx8ICdkZWZhdWx0J10gPSB0cnVlO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmNvbnN0IGFjdGl2ZV9kb2NzID0gbmV3IFNldCgpO1xubGV0IGFjdGl2ZSA9IDA7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZGFya3NreWFwcC9zdHJpbmctaGFzaC9ibG9iL21hc3Rlci9pbmRleC5qc1xuZnVuY3Rpb24gaGFzaChzdHIpIHtcbiAgICBsZXQgaGFzaCA9IDUzODE7XG4gICAgbGV0IGkgPSBzdHIubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pXG4gICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSBeIHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBoYXNoID4+PiAwO1xufVxuZnVuY3Rpb24gY3JlYXRlX3J1bGUobm9kZSwgYSwgYiwgZHVyYXRpb24sIGRlbGF5LCBlYXNlLCBmbiwgdWlkID0gMCkge1xuICAgIGNvbnN0IHN0ZXAgPSAxNi42NjYgLyBkdXJhdGlvbjtcbiAgICBsZXQga2V5ZnJhbWVzID0gJ3tcXG4nO1xuICAgIGZvciAobGV0IHAgPSAwOyBwIDw9IDE7IHAgKz0gc3RlcCkge1xuICAgICAgICBjb25zdCB0ID0gYSArIChiIC0gYSkgKiBlYXNlKHApO1xuICAgICAgICBrZXlmcmFtZXMgKz0gcCAqIDEwMCArIGAleyR7Zm4odCwgMSAtIHQpfX1cXG5gO1xuICAgIH1cbiAgICBjb25zdCBydWxlID0ga2V5ZnJhbWVzICsgYDEwMCUgeyR7Zm4oYiwgMSAtIGIpfX1cXG59YDtcbiAgICBjb25zdCBuYW1lID0gYF9fc3ZlbHRlXyR7aGFzaChydWxlKX1fJHt1aWR9YDtcbiAgICBjb25zdCBkb2MgPSBub2RlLm93bmVyRG9jdW1lbnQ7XG4gICAgYWN0aXZlX2RvY3MuYWRkKGRvYyk7XG4gICAgY29uc3Qgc3R5bGVzaGVldCA9IGRvYy5fX3N2ZWx0ZV9zdHlsZXNoZWV0IHx8IChkb2MuX19zdmVsdGVfc3R5bGVzaGVldCA9IGRvYy5oZWFkLmFwcGVuZENoaWxkKGVsZW1lbnQoJ3N0eWxlJykpLnNoZWV0KTtcbiAgICBjb25zdCBjdXJyZW50X3J1bGVzID0gZG9jLl9fc3ZlbHRlX3J1bGVzIHx8IChkb2MuX19zdmVsdGVfcnVsZXMgPSB7fSk7XG4gICAgaWYgKCFjdXJyZW50X3J1bGVzW25hbWVdKSB7XG4gICAgICAgIGN1cnJlbnRfcnVsZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgICBzdHlsZXNoZWV0Lmluc2VydFJ1bGUoYEBrZXlmcmFtZXMgJHtuYW1lfSAke3J1bGV9YCwgc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xuICAgIH1cbiAgICBjb25zdCBhbmltYXRpb24gPSBub2RlLnN0eWxlLmFuaW1hdGlvbiB8fCAnJztcbiAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IGAke2FuaW1hdGlvbiA/IGAke2FuaW1hdGlvbn0sIGAgOiAnJ30ke25hbWV9ICR7ZHVyYXRpb259bXMgbGluZWFyICR7ZGVsYXl9bXMgMSBib3RoYDtcbiAgICBhY3RpdmUgKz0gMTtcbiAgICByZXR1cm4gbmFtZTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZV9ydWxlKG5vZGUsIG5hbWUpIHtcbiAgICBjb25zdCBwcmV2aW91cyA9IChub2RlLnN0eWxlLmFuaW1hdGlvbiB8fCAnJykuc3BsaXQoJywgJyk7XG4gICAgY29uc3QgbmV4dCA9IHByZXZpb3VzLmZpbHRlcihuYW1lXG4gICAgICAgID8gYW5pbSA9PiBhbmltLmluZGV4T2YobmFtZSkgPCAwIC8vIHJlbW92ZSBzcGVjaWZpYyBhbmltYXRpb25cbiAgICAgICAgOiBhbmltID0+IGFuaW0uaW5kZXhPZignX19zdmVsdGUnKSA9PT0gLTEgLy8gcmVtb3ZlIGFsbCBTdmVsdGUgYW5pbWF0aW9uc1xuICAgICk7XG4gICAgY29uc3QgZGVsZXRlZCA9IHByZXZpb3VzLmxlbmd0aCAtIG5leHQubGVuZ3RoO1xuICAgIGlmIChkZWxldGVkKSB7XG4gICAgICAgIG5vZGUuc3R5bGUuYW5pbWF0aW9uID0gbmV4dC5qb2luKCcsICcpO1xuICAgICAgICBhY3RpdmUgLT0gZGVsZXRlZDtcbiAgICAgICAgaWYgKCFhY3RpdmUpXG4gICAgICAgICAgICBjbGVhcl9ydWxlcygpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNsZWFyX3J1bGVzKCkge1xuICAgIGV4cG9ydHMucmFmKCgpID0+IHtcbiAgICAgICAgaWYgKGFjdGl2ZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYWN0aXZlX2RvY3MuZm9yRWFjaChkb2MgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVzaGVldCA9IGRvYy5fX3N2ZWx0ZV9zdHlsZXNoZWV0O1xuICAgICAgICAgICAgbGV0IGkgPSBzdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pXG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldC5kZWxldGVSdWxlKGkpO1xuICAgICAgICAgICAgZG9jLl9fc3ZlbHRlX3J1bGVzID0ge307XG4gICAgICAgIH0pO1xuICAgICAgICBhY3RpdmVfZG9jcy5jbGVhcigpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVfYW5pbWF0aW9uKG5vZGUsIGZyb20sIGZuLCBwYXJhbXMpIHtcbiAgICBpZiAoIWZyb20pXG4gICAgICAgIHJldHVybiBub29wO1xuICAgIGNvbnN0IHRvID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoZnJvbS5sZWZ0ID09PSB0by5sZWZ0ICYmIGZyb20ucmlnaHQgPT09IHRvLnJpZ2h0ICYmIGZyb20udG9wID09PSB0by50b3AgJiYgZnJvbS5ib3R0b20gPT09IHRvLmJvdHRvbSlcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgXG4gICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBzaG91bGQgdGhpcyBiZSBzZXBhcmF0ZWQgZnJvbSBkZXN0cnVjdHVyaW5nPyBPciBzdGFydC9lbmQgYWRkZWQgdG8gcHVibGljIGFwaSBhbmQgZG9jdW1lbnRhdGlvbj9cbiAgICBzdGFydDogc3RhcnRfdGltZSA9IGV4cG9ydHMubm93KCkgKyBkZWxheSwgXG4gICAgLy8gQHRzLWlnbm9yZSB0b2RvOlxuICAgIGVuZCA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbiwgdGljayA9IG5vb3AsIGNzcyB9ID0gZm4obm9kZSwgeyBmcm9tLCB0byB9LCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcbiAgICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuICAgIGxldCBuYW1lO1xuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICBuYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMCwgMSwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIG5hbWUpO1xuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgaWYgKCFzdGFydGVkICYmIG5vdyA+PSBzdGFydF90aW1lKSB7XG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRlZCAmJiBub3cgPj0gZW5kKSB7XG4gICAgICAgICAgICB0aWNrKDEsIDApO1xuICAgICAgICAgICAgc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydGVkKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gbm93IC0gc3RhcnRfdGltZTtcbiAgICAgICAgICAgIGNvbnN0IHQgPSAwICsgMSAqIGVhc2luZyhwIC8gZHVyYXRpb24pO1xuICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgc3RhcnQoKTtcbiAgICB0aWNrKDAsIDEpO1xuICAgIHJldHVybiBzdG9wO1xufVxuZnVuY3Rpb24gZml4X3Bvc2l0aW9uKG5vZGUpIHtcbiAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgaWYgKHN0eWxlLnBvc2l0aW9uICE9PSAnYWJzb2x1dGUnICYmIHN0eWxlLnBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gc3R5bGU7XG4gICAgICAgIGNvbnN0IGEgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgbm9kZS5zdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICBub2RlLnN0eWxlLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgYWRkX3RyYW5zZm9ybShub2RlLCBhKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRfdHJhbnNmb3JtKG5vZGUsIGEpIHtcbiAgICBjb25zdCBiID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoYS5sZWZ0ICE9PSBiLmxlZnQgfHwgYS50b3AgIT09IGIudG9wKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtID09PSAnbm9uZScgPyAnJyA6IHN0eWxlLnRyYW5zZm9ybTtcbiAgICAgICAgbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgJHt0cmFuc2Zvcm19IHRyYW5zbGF0ZSgke2EubGVmdCAtIGIubGVmdH1weCwgJHthLnRvcCAtIGIudG9wfXB4KWA7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgZXhwb3J0cy5jdXJyZW50X2NvbXBvbmVudCA9IGNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGdldF9jdXJyZW50X2NvbXBvbmVudCgpIHtcbiAgICBpZiAoIWV4cG9ydHMuY3VycmVudF9jb21wb25lbnQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRnVuY3Rpb24gY2FsbGVkIG91dHNpZGUgY29tcG9uZW50IGluaXRpYWxpemF0aW9uJyk7XG4gICAgcmV0dXJuIGV4cG9ydHMuY3VycmVudF9jb21wb25lbnQ7XG59XG5mdW5jdGlvbiBiZWZvcmVVcGRhdGUoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5iZWZvcmVfdXBkYXRlLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gb25Nb3VudChmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLm9uX21vdW50LnB1c2goZm4pO1xufVxuZnVuY3Rpb24gYWZ0ZXJVcGRhdGUoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5hZnRlcl91cGRhdGUucHVzaChmbik7XG59XG5mdW5jdGlvbiBvbkRlc3Ryb3koZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9kZXN0cm95LnB1c2goZm4pO1xufVxuZnVuY3Rpb24gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCkge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IGdldF9jdXJyZW50X2NvbXBvbmVudCgpO1xuICAgIHJldHVybiAodHlwZSwgZGV0YWlsKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IGNvbXBvbmVudC4kJC5jYWxsYmFja3NbdHlwZV07XG4gICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgIC8vIFRPRE8gYXJlIHRoZXJlIHNpdHVhdGlvbnMgd2hlcmUgZXZlbnRzIGNvdWxkIGJlIGRpc3BhdGNoZWRcbiAgICAgICAgICAgIC8vIGluIGEgc2VydmVyIChub24tRE9NKSBlbnZpcm9ubWVudD9cbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCk7XG4gICAgICAgICAgICBjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgICAgICAgICBmbi5jYWxsKGNvbXBvbmVudCwgZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gc2V0Q29udGV4dChrZXksIGNvbnRleHQpIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LnNldChrZXksIGNvbnRleHQpO1xufVxuZnVuY3Rpb24gZ2V0Q29udGV4dChrZXkpIHtcbiAgICByZXR1cm4gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dC5nZXQoa2V5KTtcbn1cbmZ1bmN0aW9uIGhhc0NvbnRleHQoa2V5KSB7XG4gICAgcmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuaGFzKGtleSk7XG59XG4vLyBUT0RPIGZpZ3VyZSBvdXQgaWYgd2Ugc3RpbGwgd2FudCB0byBzdXBwb3J0XG4vLyBzaG9ydGhhbmQgZXZlbnRzLCBvciBpZiB3ZSB3YW50IHRvIGltcGxlbWVudFxuLy8gYSByZWFsIGJ1YmJsaW5nIG1lY2hhbmlzbVxuZnVuY3Rpb24gYnViYmxlKGNvbXBvbmVudCwgZXZlbnQpIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW2V2ZW50LnR5cGVdO1xuICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKGZuID0+IGZuLmNhbGwodGhpcywgZXZlbnQpKTtcbiAgICB9XG59XG5cbmNvbnN0IGRpcnR5X2NvbXBvbmVudHMgPSBbXTtcbmNvbnN0IGludHJvcyA9IHsgZW5hYmxlZDogZmFsc2UgfTtcbmNvbnN0IGJpbmRpbmdfY2FsbGJhY2tzID0gW107XG5jb25zdCByZW5kZXJfY2FsbGJhY2tzID0gW107XG5jb25zdCBmbHVzaF9jYWxsYmFja3MgPSBbXTtcbmNvbnN0IHJlc29sdmVkX3Byb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbmxldCB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG5mdW5jdGlvbiBzY2hlZHVsZV91cGRhdGUoKSB7XG4gICAgaWYgKCF1cGRhdGVfc2NoZWR1bGVkKSB7XG4gICAgICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICByZXNvbHZlZF9wcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRpY2soKSB7XG4gICAgc2NoZWR1bGVfdXBkYXRlKCk7XG4gICAgcmV0dXJuIHJlc29sdmVkX3Byb21pc2U7XG59XG5mdW5jdGlvbiBhZGRfcmVuZGVyX2NhbGxiYWNrKGZuKSB7XG4gICAgcmVuZGVyX2NhbGxiYWNrcy5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGFkZF9mbHVzaF9jYWxsYmFjayhmbikge1xuICAgIGZsdXNoX2NhbGxiYWNrcy5wdXNoKGZuKTtcbn1cbmxldCBmbHVzaGluZyA9IGZhbHNlO1xuY29uc3Qgc2Vlbl9jYWxsYmFja3MgPSBuZXcgU2V0KCk7XG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgICBpZiAoZmx1c2hpbmcpXG4gICAgICAgIHJldHVybjtcbiAgICBmbHVzaGluZyA9IHRydWU7XG4gICAgZG8ge1xuICAgICAgICAvLyBmaXJzdCwgY2FsbCBiZWZvcmVVcGRhdGUgZnVuY3Rpb25zXG4gICAgICAgIC8vIGFuZCB1cGRhdGUgY29tcG9uZW50c1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpcnR5X2NvbXBvbmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGRpcnR5X2NvbXBvbmVudHNbaV07XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShjb21wb25lbnQuJCQpO1xuICAgICAgICB9XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChudWxsKTtcbiAgICAgICAgZGlydHlfY29tcG9uZW50cy5sZW5ndGggPSAwO1xuICAgICAgICB3aGlsZSAoYmluZGluZ19jYWxsYmFja3MubGVuZ3RoKVxuICAgICAgICAgICAgYmluZGluZ19jYWxsYmFja3MucG9wKCkoKTtcbiAgICAgICAgLy8gdGhlbiwgb25jZSBjb21wb25lbnRzIGFyZSB1cGRhdGVkLCBjYWxsXG4gICAgICAgIC8vIGFmdGVyVXBkYXRlIGZ1bmN0aW9ucy4gVGhpcyBtYXkgY2F1c2VcbiAgICAgICAgLy8gc3Vic2VxdWVudCB1cGRhdGVzLi4uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyX2NhbGxiYWNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSByZW5kZXJfY2FsbGJhY2tzW2ldO1xuICAgICAgICAgICAgaWYgKCFzZWVuX2NhbGxiYWNrcy5oYXMoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgLy8gLi4uc28gZ3VhcmQgYWdhaW5zdCBpbmZpbml0ZSBsb29wc1xuICAgICAgICAgICAgICAgIHNlZW5fY2FsbGJhY2tzLmFkZChjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gICAgfSB3aGlsZSAoZGlydHlfY29tcG9uZW50cy5sZW5ndGgpO1xuICAgIHdoaWxlIChmbHVzaF9jYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICAgIGZsdXNoX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgIH1cbiAgICB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgZmx1c2hpbmcgPSBmYWxzZTtcbiAgICBzZWVuX2NhbGxiYWNrcy5jbGVhcigpO1xufVxuZnVuY3Rpb24gdXBkYXRlKCQkKSB7XG4gICAgaWYgKCQkLmZyYWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICQkLnVwZGF0ZSgpO1xuICAgICAgICBydW5fYWxsKCQkLmJlZm9yZV91cGRhdGUpO1xuICAgICAgICBjb25zdCBkaXJ0eSA9ICQkLmRpcnR5O1xuICAgICAgICAkJC5kaXJ0eSA9IFstMV07XG4gICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LnAoJCQuY3R4LCBkaXJ0eSk7XG4gICAgICAgICQkLmFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xuICAgIH1cbn1cblxubGV0IHByb21pc2U7XG5mdW5jdGlvbiB3YWl0KCkge1xuICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2gobm9kZSwgZGlyZWN0aW9uLCBraW5kKSB7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGN1c3RvbV9ldmVudChgJHtkaXJlY3Rpb24gPyAnaW50cm8nIDogJ291dHJvJ30ke2tpbmR9YCkpO1xufVxuY29uc3Qgb3V0cm9pbmcgPSBuZXcgU2V0KCk7XG5sZXQgb3V0cm9zO1xuZnVuY3Rpb24gZ3JvdXBfb3V0cm9zKCkge1xuICAgIG91dHJvcyA9IHtcbiAgICAgICAgcjogMCxcbiAgICAgICAgYzogW10sXG4gICAgICAgIHA6IG91dHJvcyAvLyBwYXJlbnQgZ3JvdXBcbiAgICB9O1xufVxuZnVuY3Rpb24gY2hlY2tfb3V0cm9zKCkge1xuICAgIGlmICghb3V0cm9zLnIpIHtcbiAgICAgICAgcnVuX2FsbChvdXRyb3MuYyk7XG4gICAgfVxuICAgIG91dHJvcyA9IG91dHJvcy5wO1xufVxuZnVuY3Rpb24gdHJhbnNpdGlvbl9pbihibG9jaywgbG9jYWwpIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2suaSkge1xuICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICBibG9jay5pKGxvY2FsKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uX291dChibG9jaywgbG9jYWwsIGRldGFjaCwgY2FsbGJhY2spIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2subykge1xuICAgICAgICBpZiAob3V0cm9pbmcuaGFzKGJsb2NrKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgb3V0cm9pbmcuYWRkKGJsb2NrKTtcbiAgICAgICAgb3V0cm9zLmMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRldGFjaClcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suZCgxKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYmxvY2subyhsb2NhbCk7XG4gICAgfVxufVxuY29uc3QgbnVsbF90cmFuc2l0aW9uID0geyBkdXJhdGlvbjogMCB9O1xuZnVuY3Rpb24gY3JlYXRlX2luX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gZmFsc2U7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGxldCB0YXNrO1xuICAgIGxldCB1aWQgPSAwO1xuICAgIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ28oKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MsIHVpZCsrKTtcbiAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IGV4cG9ydHMubm93KCkgKyBkZWxheTtcbiAgICAgICAgY29uc3QgZW5kX3RpbWUgPSBzdGFydF90aW1lICsgZHVyYXRpb247XG4gICAgICAgIGlmICh0YXNrKVxuICAgICAgICAgICAgdGFzay5hYm9ydCgpO1xuICAgICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCB0cnVlLCAnc3RhcnQnKSk7XG4gICAgICAgIHRhc2sgPSBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGljaygxLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgdHJ1ZSwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gZWFzaW5nKChub3cgLSBzdGFydF90aW1lKSAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0KCkge1xuICAgICAgICAgICAgaWYgKHN0YXJ0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSk7XG4gICAgICAgICAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xuICAgICAgICAgICAgICAgIHdhaXQoKS50aGVuKGdvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWRhdGUoKSB7XG4gICAgICAgICAgICBzdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfb3V0X3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcbiAgICBsZXQgYW5pbWF0aW9uX25hbWU7XG4gICAgY29uc3QgZ3JvdXAgPSBvdXRyb3M7XG4gICAgZ3JvdXAuciArPSAxO1xuICAgIGZ1bmN0aW9uIGdvKCkge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAxLCAwLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IGV4cG9ydHMubm93KCkgKyBkZWxheTtcbiAgICAgICAgY29uc3QgZW5kX3RpbWUgPSBzdGFydF90aW1lICsgZHVyYXRpb247XG4gICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgZmFsc2UsICdzdGFydCcpKTtcbiAgICAgICAgbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAobm93ID49IGVuZF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIGZhbHNlLCAnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghLS1ncm91cC5yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHdpbGwgcmVzdWx0IGluIGBlbmQoKWAgYmVpbmcgY2FsbGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc28gd2UgZG9uJ3QgbmVlZCB0byBjbGVhbiB1cCBoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgICBydW5fYWxsKGdyb3VwLmMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBzdGFydF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBlYXNpbmcoKG5vdyAtIHN0YXJ0X3RpbWUpIC8gZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aWNrKDEgLSB0LCB0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcnVubmluZztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChpc19mdW5jdGlvbihjb25maWcpKSB7XG4gICAgICAgIHdhaXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xuICAgICAgICAgICAgZ28oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnbygpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBlbmQocmVzZXQpIHtcbiAgICAgICAgICAgIGlmIChyZXNldCAmJiBjb25maWcudGljaykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy50aWNrKDEsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICAgICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlX2JpZGlyZWN0aW9uYWxfdHJhbnNpdGlvbihub2RlLCBmbiwgcGFyYW1zLCBpbnRybykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCB0ID0gaW50cm8gPyAwIDogMTtcbiAgICBsZXQgcnVubmluZ19wcm9ncmFtID0gbnVsbDtcbiAgICBsZXQgcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICBsZXQgYW5pbWF0aW9uX25hbWUgPSBudWxsO1xuICAgIGZ1bmN0aW9uIGNsZWFyX2FuaW1hdGlvbigpIHtcbiAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbml0KHByb2dyYW0sIGR1cmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGQgPSBwcm9ncmFtLmIgLSB0O1xuICAgICAgICBkdXJhdGlvbiAqPSBNYXRoLmFicyhkKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGE6IHQsXG4gICAgICAgICAgICBiOiBwcm9ncmFtLmIsXG4gICAgICAgICAgICBkLFxuICAgICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgICAgICBzdGFydDogcHJvZ3JhbS5zdGFydCxcbiAgICAgICAgICAgIGVuZDogcHJvZ3JhbS5zdGFydCArIGR1cmF0aW9uLFxuICAgICAgICAgICAgZ3JvdXA6IHByb2dyYW0uZ3JvdXBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ28oYikge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBjb25zdCBwcm9ncmFtID0ge1xuICAgICAgICAgICAgc3RhcnQ6IGV4cG9ydHMubm93KCkgKyBkZWxheSxcbiAgICAgICAgICAgIGJcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFiKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgcHJvZ3JhbS5ncm91cCA9IG91dHJvcztcbiAgICAgICAgICAgIG91dHJvcy5yICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbSB8fCBwZW5kaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgIHBlbmRpbmdfcHJvZ3JhbSA9IHByb2dyYW07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiB0aGlzIGlzIGFuIGludHJvLCBhbmQgdGhlcmUncyBhIGRlbGF5LCB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAvLyBhbiBpbml0aWFsIHRpY2sgYW5kL29yIGFwcGx5IENTUyBhbmltYXRpb24gaW1tZWRpYXRlbHlcbiAgICAgICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIHQsIGIsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGIpXG4gICAgICAgICAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IGluaXQocHJvZ3JhbSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCBiLCAnc3RhcnQnKSk7XG4gICAgICAgICAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBlbmRpbmdfcHJvZ3JhbSAmJiBub3cgPiBwZW5kaW5nX3Byb2dyYW0uc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gaW5pdChwZW5kaW5nX3Byb2dyYW0sIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgcnVubmluZ19wcm9ncmFtLmIsICdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgdCwgcnVubmluZ19wcm9ncmFtLmIsIHJ1bm5pbmdfcHJvZ3JhbS5kdXJhdGlvbiwgMCwgZWFzaW5nLCBjb25maWcuY3NzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub3cgPj0gcnVubmluZ19wcm9ncmFtLmVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGljayh0ID0gcnVubmluZ19wcm9ncmFtLmIsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHJ1bm5pbmdfcHJvZ3JhbS5iLCAnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBlbmRpbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlJ3JlIGRvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtLmIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW50cm8g4oCUIHdlIGNhbiB0aWR5IHVwIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3V0cm8g4oCUIG5lZWRzIHRvIGJlIGNvb3JkaW5hdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghLS1ydW5uaW5nX3Byb2dyYW0uZ3JvdXAucilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bl9hbGwocnVubmluZ19wcm9ncmFtLmdyb3VwLmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobm93ID49IHJ1bm5pbmdfcHJvZ3JhbS5zdGFydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcCA9IG5vdyAtIHJ1bm5pbmdfcHJvZ3JhbS5zdGFydDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQgPSBydW5uaW5nX3Byb2dyYW0uYSArIHJ1bm5pbmdfcHJvZ3JhbS5kICogZWFzaW5nKHAgLyBydW5uaW5nX3Byb2dyYW0uZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKHJ1bm5pbmdfcHJvZ3JhbSB8fCBwZW5kaW5nX3Byb2dyYW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcnVuKGIpIHtcbiAgICAgICAgICAgIGlmIChpc19mdW5jdGlvbihjb25maWcpKSB7XG4gICAgICAgICAgICAgICAgd2FpdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xuICAgICAgICAgICAgICAgICAgICBnbyhiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvKGIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbmQoKSB7XG4gICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfcHJvbWlzZShwcm9taXNlLCBpbmZvKSB7XG4gICAgY29uc3QgdG9rZW4gPSBpbmZvLnRva2VuID0ge307XG4gICAgZnVuY3Rpb24gdXBkYXRlKHR5cGUsIGluZGV4LCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmIChpbmZvLnRva2VuICE9PSB0b2tlbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaW5mby5yZXNvbHZlZCA9IHZhbHVlO1xuICAgICAgICBsZXQgY2hpbGRfY3R4ID0gaW5mby5jdHg7XG4gICAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2hpbGRfY3R4ID0gY2hpbGRfY3R4LnNsaWNlKCk7XG4gICAgICAgICAgICBjaGlsZF9jdHhba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJsb2NrID0gdHlwZSAmJiAoaW5mby5jdXJyZW50ID0gdHlwZSkoY2hpbGRfY3R4KTtcbiAgICAgICAgbGV0IG5lZWRzX2ZsdXNoID0gZmFsc2U7XG4gICAgICAgIGlmIChpbmZvLmJsb2NrKSB7XG4gICAgICAgICAgICBpZiAoaW5mby5ibG9ja3MpIHtcbiAgICAgICAgICAgICAgICBpbmZvLmJsb2Nrcy5mb3JFYWNoKChibG9jaywgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gaW5kZXggJiYgYmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwX291dHJvcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbl9vdXQoYmxvY2ssIDEsIDEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5mby5ibG9ja3NbaV0gPT09IGJsb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzW2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrX291dHJvcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbmZvLmJsb2NrLmQoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBibG9jay5jKCk7XG4gICAgICAgICAgICB0cmFuc2l0aW9uX2luKGJsb2NrLCAxKTtcbiAgICAgICAgICAgIGJsb2NrLm0oaW5mby5tb3VudCgpLCBpbmZvLmFuY2hvcik7XG4gICAgICAgICAgICBuZWVkc19mbHVzaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaW5mby5ibG9jayA9IGJsb2NrO1xuICAgICAgICBpZiAoaW5mby5ibG9ja3MpXG4gICAgICAgICAgICBpbmZvLmJsb2Nrc1tpbmRleF0gPSBibG9jaztcbiAgICAgICAgaWYgKG5lZWRzX2ZsdXNoKSB7XG4gICAgICAgICAgICBmbHVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpc19wcm9taXNlKHByb21pc2UpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfY29tcG9uZW50ID0gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCk7XG4gICAgICAgIHByb21pc2UudGhlbih2YWx1ZSA9PiB7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY3VycmVudF9jb21wb25lbnQpO1xuICAgICAgICAgICAgdXBkYXRlKGluZm8udGhlbiwgMSwgaW5mby52YWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY3VycmVudF9jb21wb25lbnQpO1xuICAgICAgICAgICAgdXBkYXRlKGluZm8uY2F0Y2gsIDIsIGluZm8uZXJyb3IsIGVycm9yKTtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChudWxsKTtcbiAgICAgICAgICAgIGlmICghaW5mby5oYXNDYXRjaCkge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gaWYgd2UgcHJldmlvdXNseSBoYWQgYSB0aGVuL2NhdGNoIGJsb2NrLCBkZXN0cm95IGl0XG4gICAgICAgIGlmIChpbmZvLmN1cnJlbnQgIT09IGluZm8ucGVuZGluZykge1xuICAgICAgICAgICAgdXBkYXRlKGluZm8ucGVuZGluZywgMCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGluZm8uY3VycmVudCAhPT0gaW5mby50aGVuKSB7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby50aGVuLCAxLCBpbmZvLnZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGluZm8ucmVzb2x2ZWQgPSBwcm9taXNlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZV9hd2FpdF9ibG9ja19icmFuY2goaW5mbywgY3R4LCBkaXJ0eSkge1xuICAgIGNvbnN0IGNoaWxkX2N0eCA9IGN0eC5zbGljZSgpO1xuICAgIGNvbnN0IHsgcmVzb2x2ZWQgfSA9IGluZm87XG4gICAgaWYgKGluZm8uY3VycmVudCA9PT0gaW5mby50aGVuKSB7XG4gICAgICAgIGNoaWxkX2N0eFtpbmZvLnZhbHVlXSA9IHJlc29sdmVkO1xuICAgIH1cbiAgICBpZiAoaW5mby5jdXJyZW50ID09PSBpbmZvLmNhdGNoKSB7XG4gICAgICAgIGNoaWxkX2N0eFtpbmZvLmVycm9yXSA9IHJlc29sdmVkO1xuICAgIH1cbiAgICBpbmZvLmJsb2NrLnAoY2hpbGRfY3R4LCBkaXJ0eSk7XG59XG5cbmNvbnN0IGdsb2JhbHMgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IHdpbmRvd1xuICAgIDogdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gZ2xvYmFsVGhpc1xuICAgICAgICA6IGdsb2JhbCk7XG5cbmZ1bmN0aW9uIGRlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmQoMSk7XG4gICAgbG9va3VwLmRlbGV0ZShibG9jay5rZXkpO1xufVxuZnVuY3Rpb24gb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIHRyYW5zaXRpb25fb3V0KGJsb2NrLCAxLCAxLCAoKSA9PiB7XG4gICAgICAgIGxvb2t1cC5kZWxldGUoYmxvY2sua2V5KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZpeF9hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZigpO1xuICAgIGRlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCk7XG59XG5mdW5jdGlvbiBmaXhfYW5kX291dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5mKCk7XG4gICAgb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCk7XG59XG5mdW5jdGlvbiB1cGRhdGVfa2V5ZWRfZWFjaChvbGRfYmxvY2tzLCBkaXJ0eSwgZ2V0X2tleSwgZHluYW1pYywgY3R4LCBsaXN0LCBsb29rdXAsIG5vZGUsIGRlc3Ryb3ksIGNyZWF0ZV9lYWNoX2Jsb2NrLCBuZXh0LCBnZXRfY29udGV4dCkge1xuICAgIGxldCBvID0gb2xkX2Jsb2Nrcy5sZW5ndGg7XG4gICAgbGV0IG4gPSBsaXN0Lmxlbmd0aDtcbiAgICBsZXQgaSA9IG87XG4gICAgY29uc3Qgb2xkX2luZGV4ZXMgPSB7fTtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICBvbGRfaW5kZXhlc1tvbGRfYmxvY2tzW2ldLmtleV0gPSBpO1xuICAgIGNvbnN0IG5ld19ibG9ja3MgPSBbXTtcbiAgICBjb25zdCBuZXdfbG9va3VwID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGRlbHRhcyA9IG5ldyBNYXAoKTtcbiAgICBpID0gbjtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkX2N0eCA9IGdldF9jb250ZXh0KGN0eCwgbGlzdCwgaSk7XG4gICAgICAgIGNvbnN0IGtleSA9IGdldF9rZXkoY2hpbGRfY3R4KTtcbiAgICAgICAgbGV0IGJsb2NrID0gbG9va3VwLmdldChrZXkpO1xuICAgICAgICBpZiAoIWJsb2NrKSB7XG4gICAgICAgICAgICBibG9jayA9IGNyZWF0ZV9lYWNoX2Jsb2NrKGtleSwgY2hpbGRfY3R4KTtcbiAgICAgICAgICAgIGJsb2NrLmMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkeW5hbWljKSB7XG4gICAgICAgICAgICBibG9jay5wKGNoaWxkX2N0eCwgZGlydHkpO1xuICAgICAgICB9XG4gICAgICAgIG5ld19sb29rdXAuc2V0KGtleSwgbmV3X2Jsb2Nrc1tpXSA9IGJsb2NrKTtcbiAgICAgICAgaWYgKGtleSBpbiBvbGRfaW5kZXhlcylcbiAgICAgICAgICAgIGRlbHRhcy5zZXQoa2V5LCBNYXRoLmFicyhpIC0gb2xkX2luZGV4ZXNba2V5XSkpO1xuICAgIH1cbiAgICBjb25zdCB3aWxsX21vdmUgPSBuZXcgU2V0KCk7XG4gICAgY29uc3QgZGlkX21vdmUgPSBuZXcgU2V0KCk7XG4gICAgZnVuY3Rpb24gaW5zZXJ0KGJsb2NrKSB7XG4gICAgICAgIHRyYW5zaXRpb25faW4oYmxvY2ssIDEpO1xuICAgICAgICBibG9jay5tKG5vZGUsIG5leHQpO1xuICAgICAgICBsb29rdXAuc2V0KGJsb2NrLmtleSwgYmxvY2spO1xuICAgICAgICBuZXh0ID0gYmxvY2suZmlyc3Q7XG4gICAgICAgIG4tLTtcbiAgICB9XG4gICAgd2hpbGUgKG8gJiYgbikge1xuICAgICAgICBjb25zdCBuZXdfYmxvY2sgPSBuZXdfYmxvY2tzW24gLSAxXTtcbiAgICAgICAgY29uc3Qgb2xkX2Jsb2NrID0gb2xkX2Jsb2Nrc1tvIC0gMV07XG4gICAgICAgIGNvbnN0IG5ld19rZXkgPSBuZXdfYmxvY2sua2V5O1xuICAgICAgICBjb25zdCBvbGRfa2V5ID0gb2xkX2Jsb2NrLmtleTtcbiAgICAgICAgaWYgKG5ld19ibG9jayA9PT0gb2xkX2Jsb2NrKSB7XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICBuZXh0ID0gbmV3X2Jsb2NrLmZpcnN0O1xuICAgICAgICAgICAgby0tO1xuICAgICAgICAgICAgbi0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFuZXdfbG9va3VwLmhhcyhvbGRfa2V5KSkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIG9sZCBibG9ja1xuICAgICAgICAgICAgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWxvb2t1cC5oYXMobmV3X2tleSkgfHwgd2lsbF9tb3ZlLmhhcyhuZXdfa2V5KSkge1xuICAgICAgICAgICAgaW5zZXJ0KG5ld19ibG9jayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGlkX21vdmUuaGFzKG9sZF9rZXkpKSB7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVsdGFzLmdldChuZXdfa2V5KSA+IGRlbHRhcy5nZXQob2xkX2tleSkpIHtcbiAgICAgICAgICAgIGRpZF9tb3ZlLmFkZChuZXdfa2V5KTtcbiAgICAgICAgICAgIGluc2VydChuZXdfYmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgd2lsbF9tb3ZlLmFkZChvbGRfa2V5KTtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3aGlsZSAoby0tKSB7XG4gICAgICAgIGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3Nbb107XG4gICAgICAgIGlmICghbmV3X2xvb2t1cC5oYXMob2xkX2Jsb2NrLmtleSkpXG4gICAgICAgICAgICBkZXN0cm95KG9sZF9ibG9jaywgbG9va3VwKTtcbiAgICB9XG4gICAgd2hpbGUgKG4pXG4gICAgICAgIGluc2VydChuZXdfYmxvY2tzW24gLSAxXSk7XG4gICAgcmV0dXJuIG5ld19ibG9ja3M7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9lYWNoX2tleXMoY3R4LCBsaXN0LCBnZXRfY29udGV4dCwgZ2V0X2tleSkge1xuICAgIGNvbnN0IGtleXMgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGdldF9rZXkoZ2V0X2NvbnRleHQoY3R4LCBsaXN0LCBpKSk7XG4gICAgICAgIGlmIChrZXlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBoYXZlIGR1cGxpY2F0ZSBrZXlzIGluIGEga2V5ZWQgZWFjaCcpO1xuICAgICAgICB9XG4gICAgICAgIGtleXMuYWRkKGtleSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRfc3ByZWFkX3VwZGF0ZShsZXZlbHMsIHVwZGF0ZXMpIHtcbiAgICBjb25zdCB1cGRhdGUgPSB7fTtcbiAgICBjb25zdCB0b19udWxsX291dCA9IHt9O1xuICAgIGNvbnN0IGFjY291bnRlZF9mb3IgPSB7ICQkc2NvcGU6IDEgfTtcbiAgICBsZXQgaSA9IGxldmVscy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBjb25zdCBvID0gbGV2ZWxzW2ldO1xuICAgICAgICBjb25zdCBuID0gdXBkYXRlc1tpXTtcbiAgICAgICAgaWYgKG4pIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG8pIHtcbiAgICAgICAgICAgICAgICBpZiAoIShrZXkgaW4gbikpXG4gICAgICAgICAgICAgICAgICAgIHRvX251bGxfb3V0W2tleV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbikge1xuICAgICAgICAgICAgICAgIGlmICghYWNjb3VudGVkX2ZvcltrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVtrZXldID0gbltrZXldO1xuICAgICAgICAgICAgICAgICAgICBhY2NvdW50ZWRfZm9yW2tleV0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldmVsc1tpXSA9IG47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XG4gICAgICAgICAgICAgICAgYWNjb3VudGVkX2ZvcltrZXldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0b19udWxsX291dCkge1xuICAgICAgICBpZiAoIShrZXkgaW4gdXBkYXRlKSlcbiAgICAgICAgICAgIHVwZGF0ZVtrZXldID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gdXBkYXRlO1xufVxuZnVuY3Rpb24gZ2V0X3NwcmVhZF9vYmplY3Qoc3ByZWFkX3Byb3BzKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzcHJlYWRfcHJvcHMgPT09ICdvYmplY3QnICYmIHNwcmVhZF9wcm9wcyAhPT0gbnVsbCA/IHNwcmVhZF9wcm9wcyA6IHt9O1xufVxuXG4vLyBzb3VyY2U6IGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZGljZXMuaHRtbFxuY29uc3QgYm9vbGVhbl9hdHRyaWJ1dGVzID0gbmV3IFNldChbXG4gICAgJ2FsbG93ZnVsbHNjcmVlbicsXG4gICAgJ2FsbG93cGF5bWVudHJlcXVlc3QnLFxuICAgICdhc3luYycsXG4gICAgJ2F1dG9mb2N1cycsXG4gICAgJ2F1dG9wbGF5JyxcbiAgICAnY2hlY2tlZCcsXG4gICAgJ2NvbnRyb2xzJyxcbiAgICAnZGVmYXVsdCcsXG4gICAgJ2RlZmVyJyxcbiAgICAnZGlzYWJsZWQnLFxuICAgICdmb3Jtbm92YWxpZGF0ZScsXG4gICAgJ2hpZGRlbicsXG4gICAgJ2lzbWFwJyxcbiAgICAnbG9vcCcsXG4gICAgJ211bHRpcGxlJyxcbiAgICAnbXV0ZWQnLFxuICAgICdub21vZHVsZScsXG4gICAgJ25vdmFsaWRhdGUnLFxuICAgICdvcGVuJyxcbiAgICAncGxheXNpbmxpbmUnLFxuICAgICdyZWFkb25seScsXG4gICAgJ3JlcXVpcmVkJyxcbiAgICAncmV2ZXJzZWQnLFxuICAgICdzZWxlY3RlZCdcbl0pO1xuXG5jb25zdCBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlciA9IC9bXFxzJ1wiPi89XFx1e0ZERDB9LVxcdXtGREVGfVxcdXtGRkZFfVxcdXtGRkZGfVxcdXsxRkZGRX1cXHV7MUZGRkZ9XFx1ezJGRkZFfVxcdXsyRkZGRn1cXHV7M0ZGRkV9XFx1ezNGRkZGfVxcdXs0RkZGRX1cXHV7NEZGRkZ9XFx1ezVGRkZFfVxcdXs1RkZGRn1cXHV7NkZGRkV9XFx1ezZGRkZGfVxcdXs3RkZGRX1cXHV7N0ZGRkZ9XFx1ezhGRkZFfVxcdXs4RkZGRn1cXHV7OUZGRkV9XFx1ezlGRkZGfVxcdXtBRkZGRX1cXHV7QUZGRkZ9XFx1e0JGRkZFfVxcdXtCRkZGRn1cXHV7Q0ZGRkV9XFx1e0NGRkZGfVxcdXtERkZGRX1cXHV7REZGRkZ9XFx1e0VGRkZFfVxcdXtFRkZGRn1cXHV7RkZGRkV9XFx1e0ZGRkZGfVxcdXsxMEZGRkV9XFx1ezEwRkZGRn1dL3U7XG4vLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNhdHRyaWJ1dGVzLTJcbi8vIGh0dHBzOi8vaW5mcmEuc3BlYy53aGF0d2cub3JnLyNub25jaGFyYWN0ZXJcbmZ1bmN0aW9uIHNwcmVhZChhcmdzLCBjbGFzc2VzX3RvX2FkZCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCAuLi5hcmdzKTtcbiAgICBpZiAoY2xhc3Nlc190b19hZGQpIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMuY2xhc3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgYXR0cmlidXRlcy5jbGFzcyA9IGNsYXNzZXNfdG9fYWRkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXR0cmlidXRlcy5jbGFzcyArPSAnICcgKyBjbGFzc2VzX3RvX2FkZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3RyID0gJyc7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgaWYgKGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyLnRlc3QobmFtZSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKVxuICAgICAgICAgICAgc3RyICs9ICcgJyArIG5hbWU7XG4gICAgICAgIGVsc2UgaWYgKGJvb2xlYW5fYXR0cmlidXRlcy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKVxuICAgICAgICAgICAgICAgIHN0ciArPSAnICcgKyBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0ciArPSBgICR7bmFtZX09XCIke3ZhbHVlfVwiYDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdHI7XG59XG5jb25zdCBlc2NhcGVkID0ge1xuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiMzOTsnLFxuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7J1xufTtcbmZ1bmN0aW9uIGVzY2FwZShodG1sKSB7XG4gICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC9bXCInJjw+XS9nLCBtYXRjaCA9PiBlc2NhcGVkW21hdGNoXSk7XG59XG5mdW5jdGlvbiBlc2NhcGVfYXR0cmlidXRlX3ZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBlc2NhcGUodmFsdWUpIDogdmFsdWU7XG59XG5mdW5jdGlvbiBlc2NhcGVfb2JqZWN0KG9iaikge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICByZXN1bHRba2V5XSA9IGVzY2FwZV9hdHRyaWJ1dGVfdmFsdWUob2JqW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZWFjaChpdGVtcywgZm4pIHtcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBzdHIgKz0gZm4oaXRlbXNbaV0sIGkpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuY29uc3QgbWlzc2luZ19jb21wb25lbnQgPSB7XG4gICAgJCRyZW5kZXI6ICgpID0+ICcnXG59O1xuZnVuY3Rpb24gdmFsaWRhdGVfY29tcG9uZW50KGNvbXBvbmVudCwgbmFtZSkge1xuICAgIGlmICghY29tcG9uZW50IHx8ICFjb21wb25lbnQuJCRyZW5kZXIpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09ICdzdmVsdGU6Y29tcG9uZW50JylcbiAgICAgICAgICAgIG5hbWUgKz0gJyB0aGlzPXsuLi59JztcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGA8JHtuYW1lfT4gaXMgbm90IGEgdmFsaWQgU1NSIGNvbXBvbmVudC4gWW91IG1heSBuZWVkIHRvIHJldmlldyB5b3VyIGJ1aWxkIGNvbmZpZyB0byBlbnN1cmUgdGhhdCBkZXBlbmRlbmNpZXMgYXJlIGNvbXBpbGVkLCByYXRoZXIgdGhhbiBpbXBvcnRlZCBhcyBwcmUtY29tcGlsZWQgbW9kdWxlc2ApO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50O1xufVxuZnVuY3Rpb24gZGVidWcoZmlsZSwgbGluZSwgY29sdW1uLCB2YWx1ZXMpIHtcbiAgICBjb25zb2xlLmxvZyhge0BkZWJ1Z30gJHtmaWxlID8gZmlsZSArICcgJyA6ICcnfSgke2xpbmV9OiR7Y29sdW1ufSlgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2codmFsdWVzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgcmV0dXJuICcnO1xufVxubGV0IG9uX2Rlc3Ryb3k7XG5mdW5jdGlvbiBjcmVhdGVfc3NyX2NvbXBvbmVudChmbikge1xuICAgIGZ1bmN0aW9uICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cywgY29udGV4dCkge1xuICAgICAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gZXhwb3J0cy5jdXJyZW50X2NvbXBvbmVudDtcbiAgICAgICAgY29uc3QgJCQgPSB7XG4gICAgICAgICAgICBvbl9kZXN0cm95LFxuICAgICAgICAgICAgY29udGV4dDogbmV3IE1hcChwYXJlbnRfY29tcG9uZW50ID8gcGFyZW50X2NvbXBvbmVudC4kJC5jb250ZXh0IDogY29udGV4dCB8fCBbXSksXG4gICAgICAgICAgICAvLyB0aGVzZSB3aWxsIGJlIGltbWVkaWF0ZWx5IGRpc2NhcmRlZFxuICAgICAgICAgICAgb25fbW91bnQ6IFtdLFxuICAgICAgICAgICAgYmVmb3JlX3VwZGF0ZTogW10sXG4gICAgICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxuICAgICAgICAgICAgY2FsbGJhY2tzOiBibGFua19vYmplY3QoKVxuICAgICAgICB9O1xuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoeyAkJCB9KTtcbiAgICAgICAgY29uc3QgaHRtbCA9IGZuKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cyk7XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJlbmRlcjogKHByb3BzID0ge30sIHsgJCRzbG90cyA9IHt9LCBjb250ZXh0ID0gbmV3IE1hcCgpIH0gPSB7fSkgPT4ge1xuICAgICAgICAgICAgb25fZGVzdHJveSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyB0aXRsZTogJycsIGhlYWQ6ICcnLCBjc3M6IG5ldyBTZXQoKSB9O1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9ICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIHt9LCAkJHNsb3RzLCBjb250ZXh0KTtcbiAgICAgICAgICAgIHJ1bl9hbGwob25fZGVzdHJveSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGh0bWwsXG4gICAgICAgICAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IEFycmF5LmZyb20ocmVzdWx0LmNzcykubWFwKGNzcyA9PiBjc3MuY29kZSkuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIG1hcDogbnVsbCAvLyBUT0RPXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoZWFkOiByZXN1bHQudGl0bGUgKyByZXN1bHQuaGVhZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgJCRyZW5kZXJcbiAgICB9O1xufVxuZnVuY3Rpb24gYWRkX2F0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IChib29sZWFuICYmICF2YWx1ZSkpXG4gICAgICAgIHJldHVybiAnJztcbiAgICByZXR1cm4gYCAke25hbWV9JHt2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogYD0ke3R5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBKU09OLnN0cmluZ2lmeShlc2NhcGUodmFsdWUpKSA6IGBcIiR7dmFsdWV9XCJgfWB9YDtcbn1cbmZ1bmN0aW9uIGFkZF9jbGFzc2VzKGNsYXNzZXMpIHtcbiAgICByZXR1cm4gY2xhc3NlcyA/IGAgY2xhc3M9XCIke2NsYXNzZXN9XCJgIDogJyc7XG59XG5cbmZ1bmN0aW9uIGJpbmQoY29tcG9uZW50LCBuYW1lLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGluZGV4ID0gY29tcG9uZW50LiQkLnByb3BzW25hbWVdO1xuICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbXBvbmVudC4kJC5ib3VuZFtpbmRleF0gPSBjYWxsYmFjaztcbiAgICAgICAgY2FsbGJhY2soY29tcG9uZW50LiQkLmN0eFtpbmRleF0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZV9jb21wb25lbnQoYmxvY2spIHtcbiAgICBibG9jayAmJiBibG9jay5jKCk7XG59XG5mdW5jdGlvbiBjbGFpbV9jb21wb25lbnQoYmxvY2ssIHBhcmVudF9ub2Rlcykge1xuICAgIGJsb2NrICYmIGJsb2NrLmwocGFyZW50X25vZGVzKTtcbn1cbmZ1bmN0aW9uIG1vdW50X2NvbXBvbmVudChjb21wb25lbnQsIHRhcmdldCwgYW5jaG9yLCBjdXN0b21FbGVtZW50KSB7XG4gICAgY29uc3QgeyBmcmFnbWVudCwgb25fbW91bnQsIG9uX2Rlc3Ryb3ksIGFmdGVyX3VwZGF0ZSB9ID0gY29tcG9uZW50LiQkO1xuICAgIGZyYWdtZW50ICYmIGZyYWdtZW50Lm0odGFyZ2V0LCBhbmNob3IpO1xuICAgIGlmICghY3VzdG9tRWxlbWVudCkge1xuICAgICAgICAvLyBvbk1vdW50IGhhcHBlbnMgYmVmb3JlIHRoZSBpbml0aWFsIGFmdGVyVXBkYXRlXG4gICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3X29uX2Rlc3Ryb3kgPSBvbl9tb3VudC5tYXAocnVuKS5maWx0ZXIoaXNfZnVuY3Rpb24pO1xuICAgICAgICAgICAgaWYgKG9uX2Rlc3Ryb3kpIHtcbiAgICAgICAgICAgICAgICBvbl9kZXN0cm95LnB1c2goLi4ubmV3X29uX2Rlc3Ryb3kpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRWRnZSBjYXNlIC0gY29tcG9uZW50IHdhcyBkZXN0cm95ZWQgaW1tZWRpYXRlbHksXG4gICAgICAgICAgICAgICAgLy8gbW9zdCBsaWtlbHkgYXMgYSByZXN1bHQgb2YgYSBiaW5kaW5nIGluaXRpYWxpc2luZ1xuICAgICAgICAgICAgICAgIHJ1bl9hbGwobmV3X29uX2Rlc3Ryb3kpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tcG9uZW50LiQkLm9uX21vdW50ID0gW107XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZnRlcl91cGRhdGUuZm9yRWFjaChhZGRfcmVuZGVyX2NhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIGRlc3Ryb3lfY29tcG9uZW50KGNvbXBvbmVudCwgZGV0YWNoaW5nKSB7XG4gICAgY29uc3QgJCQgPSBjb21wb25lbnQuJCQ7XG4gICAgaWYgKCQkLmZyYWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHJ1bl9hbGwoJCQub25fZGVzdHJveSk7XG4gICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LmQoZGV0YWNoaW5nKTtcbiAgICAgICAgLy8gVE9ETyBudWxsIG91dCBvdGhlciByZWZzLCBpbmNsdWRpbmcgY29tcG9uZW50LiQkIChidXQgbmVlZCB0b1xuICAgICAgICAvLyBwcmVzZXJ2ZSBmaW5hbCBzdGF0ZT8pXG4gICAgICAgICQkLm9uX2Rlc3Ryb3kgPSAkJC5mcmFnbWVudCA9IG51bGw7XG4gICAgICAgICQkLmN0eCA9IFtdO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG1ha2VfZGlydHkoY29tcG9uZW50LCBpKSB7XG4gICAgaWYgKGNvbXBvbmVudC4kJC5kaXJ0eVswXSA9PT0gLTEpIHtcbiAgICAgICAgZGlydHlfY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gICAgICAgIHNjaGVkdWxlX3VwZGF0ZSgpO1xuICAgICAgICBjb21wb25lbnQuJCQuZGlydHkuZmlsbCgwKTtcbiAgICB9XG4gICAgY29tcG9uZW50LiQkLmRpcnR5WyhpIC8gMzEpIHwgMF0gfD0gKDEgPDwgKGkgJSAzMSkpO1xufVxuZnVuY3Rpb24gaW5pdChjb21wb25lbnQsIG9wdGlvbnMsIGluc3RhbmNlLCBjcmVhdGVfZnJhZ21lbnQsIG5vdF9lcXVhbCwgcHJvcHMsIGRpcnR5ID0gWy0xXSkge1xuICAgIGNvbnN0IHBhcmVudF9jb21wb25lbnQgPSBleHBvcnRzLmN1cnJlbnRfY29tcG9uZW50O1xuICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpO1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkID0ge1xuICAgICAgICBmcmFnbWVudDogbnVsbCxcbiAgICAgICAgY3R4OiBudWxsLFxuICAgICAgICAvLyBzdGF0ZVxuICAgICAgICBwcm9wcyxcbiAgICAgICAgdXBkYXRlOiBub29wLFxuICAgICAgICBub3RfZXF1YWwsXG4gICAgICAgIGJvdW5kOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgLy8gbGlmZWN5Y2xlXG4gICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgb25fZGVzdHJveTogW10sXG4gICAgICAgIG9uX2Rpc2Nvbm5lY3Q6IFtdLFxuICAgICAgICBiZWZvcmVfdXBkYXRlOiBbXSxcbiAgICAgICAgYWZ0ZXJfdXBkYXRlOiBbXSxcbiAgICAgICAgY29udGV4dDogbmV3IE1hcChwYXJlbnRfY29tcG9uZW50ID8gcGFyZW50X2NvbXBvbmVudC4kJC5jb250ZXh0IDogb3B0aW9ucy5jb250ZXh0IHx8IFtdKSxcbiAgICAgICAgLy8gZXZlcnl0aGluZyBlbHNlXG4gICAgICAgIGNhbGxiYWNrczogYmxhbmtfb2JqZWN0KCksXG4gICAgICAgIGRpcnR5LFxuICAgICAgICBza2lwX2JvdW5kOiBmYWxzZVxuICAgIH07XG4gICAgbGV0IHJlYWR5ID0gZmFsc2U7XG4gICAgJCQuY3R4ID0gaW5zdGFuY2VcbiAgICAgICAgPyBpbnN0YW5jZShjb21wb25lbnQsIG9wdGlvbnMucHJvcHMgfHwge30sIChpLCByZXQsIC4uLnJlc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcmVzdC5sZW5ndGggPyByZXN0WzBdIDogcmV0O1xuICAgICAgICAgICAgaWYgKCQkLmN0eCAmJiBub3RfZXF1YWwoJCQuY3R4W2ldLCAkJC5jdHhbaV0gPSB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoISQkLnNraXBfYm91bmQgJiYgJCQuYm91bmRbaV0pXG4gICAgICAgICAgICAgICAgICAgICQkLmJvdW5kW2ldKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVhZHkpXG4gICAgICAgICAgICAgICAgICAgIG1ha2VfZGlydHkoY29tcG9uZW50LCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0pXG4gICAgICAgIDogW107XG4gICAgJCQudXBkYXRlKCk7XG4gICAgcmVhZHkgPSB0cnVlO1xuICAgIHJ1bl9hbGwoJCQuYmVmb3JlX3VwZGF0ZSk7XG4gICAgLy8gYGZhbHNlYCBhcyBhIHNwZWNpYWwgY2FzZSBvZiBubyBET00gY29tcG9uZW50XG4gICAgJCQuZnJhZ21lbnQgPSBjcmVhdGVfZnJhZ21lbnQgPyBjcmVhdGVfZnJhZ21lbnQoJCQuY3R4KSA6IGZhbHNlO1xuICAgIGlmIChvcHRpb25zLnRhcmdldCkge1xuICAgICAgICBpZiAob3B0aW9ucy5oeWRyYXRlKSB7XG4gICAgICAgICAgICBzdGFydF9oeWRyYXRpbmcoKTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gY2hpbGRyZW4ob3B0aW9ucy50YXJnZXQpO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50Lmwobm9kZXMpO1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChkZXRhY2gpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LmMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pbnRybylcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oY29tcG9uZW50LiQkLmZyYWdtZW50KTtcbiAgICAgICAgbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgb3B0aW9ucy50YXJnZXQsIG9wdGlvbnMuYW5jaG9yLCBvcHRpb25zLmN1c3RvbUVsZW1lbnQpO1xuICAgICAgICBlbmRfaHlkcmF0aW5nKCk7XG4gICAgICAgIGZsdXNoKCk7XG4gICAgfVxuICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcbn1cbmlmICh0eXBlb2YgSFRNTEVsZW1lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBleHBvcnRzLlN2ZWx0ZUVsZW1lbnQgPSBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgICAgICBjb25zdCB7IG9uX21vdW50IH0gPSB0aGlzLiQkO1xuICAgICAgICAgICAgdGhpcy4kJC5vbl9kaXNjb25uZWN0ID0gb25fbW91bnQubWFwKHJ1bikuZmlsdGVyKGlzX2Z1bmN0aW9uKTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLiQkLnNsb3R0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy4kJC5zbG90dGVkW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBfb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzW2F0dHJdID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgICAgICBydW5fYWxsKHRoaXMuJCQub25fZGlzY29ubmVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgJGRlc3Ryb3koKSB7XG4gICAgICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgICAgIHRoaXMuJGRlc3Ryb3kgPSBub29wO1xuICAgICAgICB9XG4gICAgICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gVE9ETyBzaG91bGQgdGhpcyBkZWxlZ2F0ZSB0byBhZGRFdmVudExpc3RlbmVyP1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdIHx8ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSA9IFtdKSk7XG4gICAgICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAkc2V0KCQkcHJvcHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiQkc2V0ICYmICFpc19lbXB0eSgkJHByb3BzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy4kJHNldCgkJHByb3BzKTtcbiAgICAgICAgICAgICAgICB0aGlzLiQkLnNraXBfYm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIFN2ZWx0ZSBjb21wb25lbnRzLiBVc2VkIHdoZW4gZGV2PWZhbHNlLlxuICovXG5jbGFzcyBTdmVsdGVDb21wb25lbnQge1xuICAgICRkZXN0cm95KCkge1xuICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgdGhpcy4kZGVzdHJveSA9IG5vb3A7XG4gICAgfVxuICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gfHwgKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdID0gW10pKTtcbiAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAkc2V0KCQkcHJvcHMpIHtcbiAgICAgICAgaWYgKHRoaXMuJCRzZXQgJiYgIWlzX2VtcHR5KCQkcHJvcHMpKSB7XG4gICAgICAgICAgICB0aGlzLiQkLnNraXBfYm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kJHNldCgkJHByb3BzKTtcbiAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaF9kZXYodHlwZSwgZGV0YWlsKSB7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjdXN0b21fZXZlbnQodHlwZSwgT2JqZWN0LmFzc2lnbih7IHZlcnNpb246ICczLjM4LjMnIH0sIGRldGFpbCkpKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9kZXYodGFyZ2V0LCBub2RlKSB7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01JbnNlcnQnLCB7IHRhcmdldCwgbm9kZSB9KTtcbiAgICBhcHBlbmQodGFyZ2V0LCBub2RlKTtcbn1cbmZ1bmN0aW9uIGluc2VydF9kZXYodGFyZ2V0LCBub2RlLCBhbmNob3IpIHtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTUluc2VydCcsIHsgdGFyZ2V0LCBub2RlLCBhbmNob3IgfSk7XG4gICAgaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9kZXYobm9kZSkge1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NUmVtb3ZlJywgeyBub2RlIH0pO1xuICAgIGRldGFjaChub2RlKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9iZXR3ZWVuX2RldihiZWZvcmUsIGFmdGVyKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZyAmJiBiZWZvcmUubmV4dFNpYmxpbmcgIT09IGFmdGVyKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYmVmb3JlLm5leHRTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRhY2hfYmVmb3JlX2RldihhZnRlcikge1xuICAgIHdoaWxlIChhZnRlci5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgZGV0YWNoX2RldihhZnRlci5wcmV2aW91c1NpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaF9hZnRlcl9kZXYoYmVmb3JlKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZykge1xuICAgICAgICBkZXRhY2hfZGV2KGJlZm9yZS5uZXh0U2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gbGlzdGVuX2Rldihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucywgaGFzX3ByZXZlbnRfZGVmYXVsdCwgaGFzX3N0b3BfcHJvcGFnYXRpb24pIHtcbiAgICBjb25zdCBtb2RpZmllcnMgPSBvcHRpb25zID09PSB0cnVlID8gWydjYXB0dXJlJ10gOiBvcHRpb25zID8gQXJyYXkuZnJvbShPYmplY3Qua2V5cyhvcHRpb25zKSkgOiBbXTtcbiAgICBpZiAoaGFzX3ByZXZlbnRfZGVmYXVsdClcbiAgICAgICAgbW9kaWZpZXJzLnB1c2goJ3ByZXZlbnREZWZhdWx0Jyk7XG4gICAgaWYgKGhhc19zdG9wX3Byb3BhZ2F0aW9uKVxuICAgICAgICBtb2RpZmllcnMucHVzaCgnc3RvcFByb3BhZ2F0aW9uJyk7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01BZGRFdmVudExpc3RlbmVyJywgeyBub2RlLCBldmVudCwgaGFuZGxlciwgbW9kaWZpZXJzIH0pO1xuICAgIGNvbnN0IGRpc3Bvc2UgPSBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NUmVtb3ZlRXZlbnRMaXN0ZW5lcicsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcbiAgICAgICAgZGlzcG9zZSgpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyX2Rldihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01SZW1vdmVBdHRyaWJ1dGUnLCB7IG5vZGUsIGF0dHJpYnV0ZSB9KTtcbiAgICBlbHNlXG4gICAgICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NU2V0QXR0cmlidXRlJywgeyBub2RlLCBhdHRyaWJ1dGUsIHZhbHVlIH0pO1xufVxuZnVuY3Rpb24gcHJvcF9kZXYobm9kZSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgbm9kZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVNldFByb3BlcnR5JywgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBkYXRhc2V0X2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBub2RlLmRhdGFzZXRbcHJvcGVydHldID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01TZXREYXRhc2V0JywgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBzZXRfZGF0YV9kZXYodGV4dCwgZGF0YSkge1xuICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gICAgaWYgKHRleHQud2hvbGVUZXh0ID09PSBkYXRhKVxuICAgICAgICByZXR1cm47XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01TZXREYXRhJywgeyBub2RlOiB0ZXh0LCBkYXRhIH0pO1xuICAgIHRleHQuZGF0YSA9IGRhdGE7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9lYWNoX2FyZ3VtZW50KGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnc3RyaW5nJyAmJiAhKGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBhcmcpKSB7XG4gICAgICAgIGxldCBtc2cgPSAneyNlYWNofSBvbmx5IGl0ZXJhdGVzIG92ZXIgYXJyYXktbGlrZSBvYmplY3RzLic7XG4gICAgICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIGFyZyAmJiBTeW1ib2wuaXRlcmF0b3IgaW4gYXJnKSB7XG4gICAgICAgICAgICBtc2cgKz0gJyBZb3UgY2FuIHVzZSBhIHNwcmVhZCB0byBjb252ZXJ0IHRoaXMgaXRlcmFibGUgaW50byBhbiBhcnJheS4nO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX3Nsb3RzKG5hbWUsIHNsb3QsIGtleXMpIHtcbiAgICBmb3IgKGNvbnN0IHNsb3Rfa2V5IG9mIE9iamVjdC5rZXlzKHNsb3QpKSB7XG4gICAgICAgIGlmICghfmtleXMuaW5kZXhPZihzbG90X2tleSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgPCR7bmFtZX0+IHJlY2VpdmVkIGFuIHVuZXhwZWN0ZWQgc2xvdCBcIiR7c2xvdF9rZXl9XCIuYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIFN2ZWx0ZSBjb21wb25lbnRzIHdpdGggc29tZSBtaW5vciBkZXYtZW5oYW5jZW1lbnRzLiBVc2VkIHdoZW4gZGV2PXRydWUuXG4gKi9cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudERldiBleHRlbmRzIFN2ZWx0ZUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMgfHwgKCFvcHRpb25zLnRhcmdldCAmJiAhb3B0aW9ucy4kJGlubGluZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIid0YXJnZXQnIGlzIGEgcmVxdWlyZWQgb3B0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuICAgICRkZXN0cm95KCkge1xuICAgICAgICBzdXBlci4kZGVzdHJveSgpO1xuICAgICAgICB0aGlzLiRkZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdDb21wb25lbnQgd2FzIGFscmVhZHkgZGVzdHJveWVkJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICB9O1xuICAgIH1cbiAgICAkY2FwdHVyZV9zdGF0ZSgpIHsgfVxuICAgICRpbmplY3Rfc3RhdGUoKSB7IH1cbn1cbi8qKlxuICogQmFzZSBjbGFzcyB0byBjcmVhdGUgc3Ryb25nbHkgdHlwZWQgU3ZlbHRlIGNvbXBvbmVudHMuXG4gKiBUaGlzIG9ubHkgZXhpc3RzIGZvciB0eXBpbmcgcHVycG9zZXMgYW5kIHNob3VsZCBiZSB1c2VkIGluIGAuZC50c2AgZmlsZXMuXG4gKlxuICogIyMjIEV4YW1wbGU6XG4gKlxuICogWW91IGhhdmUgY29tcG9uZW50IGxpYnJhcnkgb24gbnBtIGNhbGxlZCBgY29tcG9uZW50LWxpYnJhcnlgLCBmcm9tIHdoaWNoXG4gKiB5b3UgZXhwb3J0IGEgY29tcG9uZW50IGNhbGxlZCBgTXlDb21wb25lbnRgLiBGb3IgU3ZlbHRlK1R5cGVTY3JpcHQgdXNlcnMsXG4gKiB5b3Ugd2FudCB0byBwcm92aWRlIHR5cGluZ3MuIFRoZXJlZm9yZSB5b3UgY3JlYXRlIGEgYGluZGV4LmQudHNgOlxuICogYGBgdHNcbiAqIGltcG9ydCB7IFN2ZWx0ZUNvbXBvbmVudFR5cGVkIH0gZnJvbSBcInN2ZWx0ZVwiO1xuICogZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50IGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50VHlwZWQ8e2Zvbzogc3RyaW5nfT4ge31cbiAqIGBgYFxuICogVHlwaW5nIHRoaXMgbWFrZXMgaXQgcG9zc2libGUgZm9yIElERXMgbGlrZSBWUyBDb2RlIHdpdGggdGhlIFN2ZWx0ZSBleHRlbnNpb25cbiAqIHRvIHByb3ZpZGUgaW50ZWxsaXNlbnNlIGFuZCB0byB1c2UgdGhlIGNvbXBvbmVudCBsaWtlIHRoaXMgaW4gYSBTdmVsdGUgZmlsZVxuICogd2l0aCBUeXBlU2NyaXB0OlxuICogYGBgc3ZlbHRlXG4gKiA8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuICogXHRpbXBvcnQgeyBNeUNvbXBvbmVudCB9IGZyb20gXCJjb21wb25lbnQtbGlicmFyeVwiO1xuICogPC9zY3JpcHQ+XG4gKiA8TXlDb21wb25lbnQgZm9vPXsnYmFyJ30gLz5cbiAqIGBgYFxuICpcbiAqICMjIyMgV2h5IG5vdCBtYWtlIHRoaXMgcGFydCBvZiBgU3ZlbHRlQ29tcG9uZW50KERldilgP1xuICogQmVjYXVzZVxuICogYGBgdHNcbiAqIGNsYXNzIEFTdWJjbGFzc09mU3ZlbHRlQ29tcG9uZW50IGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50PHtmb286IHN0cmluZ30+IHt9XG4gKiBjb25zdCBjb21wb25lbnQ6IHR5cGVvZiBTdmVsdGVDb21wb25lbnQgPSBBU3ViY2xhc3NPZlN2ZWx0ZUNvbXBvbmVudDtcbiAqIGBgYFxuICogd2lsbCB0aHJvdyBhIHR5cGUgZXJyb3IsIHNvIHdlIG5lZWQgdG8gc2VwZXJhdGUgdGhlIG1vcmUgc3RyaWN0bHkgdHlwZWQgY2xhc3MuXG4gKi9cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudFR5cGVkIGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50RGV2IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGxvb3BfZ3VhcmQodGltZW91dCkge1xuICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIHN0YXJ0ID4gdGltZW91dCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmZpbml0ZSBsb29wIGRldGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnRzLkh0bWxUYWcgPSBIdG1sVGFnO1xuZXhwb3J0cy5TdmVsdGVDb21wb25lbnQgPSBTdmVsdGVDb21wb25lbnQ7XG5leHBvcnRzLlN2ZWx0ZUNvbXBvbmVudERldiA9IFN2ZWx0ZUNvbXBvbmVudERldjtcbmV4cG9ydHMuU3ZlbHRlQ29tcG9uZW50VHlwZWQgPSBTdmVsdGVDb21wb25lbnRUeXBlZDtcbmV4cG9ydHMuYWN0aW9uX2Rlc3Ryb3llciA9IGFjdGlvbl9kZXN0cm95ZXI7XG5leHBvcnRzLmFkZF9hdHRyaWJ1dGUgPSBhZGRfYXR0cmlidXRlO1xuZXhwb3J0cy5hZGRfY2xhc3NlcyA9IGFkZF9jbGFzc2VzO1xuZXhwb3J0cy5hZGRfZmx1c2hfY2FsbGJhY2sgPSBhZGRfZmx1c2hfY2FsbGJhY2s7XG5leHBvcnRzLmFkZF9sb2NhdGlvbiA9IGFkZF9sb2NhdGlvbjtcbmV4cG9ydHMuYWRkX3JlbmRlcl9jYWxsYmFjayA9IGFkZF9yZW5kZXJfY2FsbGJhY2s7XG5leHBvcnRzLmFkZF9yZXNpemVfbGlzdGVuZXIgPSBhZGRfcmVzaXplX2xpc3RlbmVyO1xuZXhwb3J0cy5hZGRfdHJhbnNmb3JtID0gYWRkX3RyYW5zZm9ybTtcbmV4cG9ydHMuYWZ0ZXJVcGRhdGUgPSBhZnRlclVwZGF0ZTtcbmV4cG9ydHMuYXBwZW5kID0gYXBwZW5kO1xuZXhwb3J0cy5hcHBlbmRfZGV2ID0gYXBwZW5kX2RldjtcbmV4cG9ydHMuYXNzaWduID0gYXNzaWduO1xuZXhwb3J0cy5hdHRyID0gYXR0cjtcbmV4cG9ydHMuYXR0cl9kZXYgPSBhdHRyX2RldjtcbmV4cG9ydHMuYXR0cmlidXRlX3RvX29iamVjdCA9IGF0dHJpYnV0ZV90b19vYmplY3Q7XG5leHBvcnRzLmJlZm9yZVVwZGF0ZSA9IGJlZm9yZVVwZGF0ZTtcbmV4cG9ydHMuYmluZCA9IGJpbmQ7XG5leHBvcnRzLmJpbmRpbmdfY2FsbGJhY2tzID0gYmluZGluZ19jYWxsYmFja3M7XG5leHBvcnRzLmJsYW5rX29iamVjdCA9IGJsYW5rX29iamVjdDtcbmV4cG9ydHMuYnViYmxlID0gYnViYmxlO1xuZXhwb3J0cy5jaGVja19vdXRyb3MgPSBjaGVja19vdXRyb3M7XG5leHBvcnRzLmNoaWxkcmVuID0gY2hpbGRyZW47XG5leHBvcnRzLmNsYWltX2NvbXBvbmVudCA9IGNsYWltX2NvbXBvbmVudDtcbmV4cG9ydHMuY2xhaW1fZWxlbWVudCA9IGNsYWltX2VsZW1lbnQ7XG5leHBvcnRzLmNsYWltX2h0bWxfdGFnID0gY2xhaW1faHRtbF90YWc7XG5leHBvcnRzLmNsYWltX3NwYWNlID0gY2xhaW1fc3BhY2U7XG5leHBvcnRzLmNsYWltX3RleHQgPSBjbGFpbV90ZXh0O1xuZXhwb3J0cy5jbGVhcl9sb29wcyA9IGNsZWFyX2xvb3BzO1xuZXhwb3J0cy5jb21wb25lbnRfc3Vic2NyaWJlID0gY29tcG9uZW50X3N1YnNjcmliZTtcbmV4cG9ydHMuY29tcHV0ZV9yZXN0X3Byb3BzID0gY29tcHV0ZV9yZXN0X3Byb3BzO1xuZXhwb3J0cy5jb21wdXRlX3Nsb3RzID0gY29tcHV0ZV9zbG90cztcbmV4cG9ydHMuY3JlYXRlRXZlbnREaXNwYXRjaGVyID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyO1xuZXhwb3J0cy5jcmVhdGVfYW5pbWF0aW9uID0gY3JlYXRlX2FuaW1hdGlvbjtcbmV4cG9ydHMuY3JlYXRlX2JpZGlyZWN0aW9uYWxfdHJhbnNpdGlvbiA9IGNyZWF0ZV9iaWRpcmVjdGlvbmFsX3RyYW5zaXRpb247XG5leHBvcnRzLmNyZWF0ZV9jb21wb25lbnQgPSBjcmVhdGVfY29tcG9uZW50O1xuZXhwb3J0cy5jcmVhdGVfaW5fdHJhbnNpdGlvbiA9IGNyZWF0ZV9pbl90cmFuc2l0aW9uO1xuZXhwb3J0cy5jcmVhdGVfb3V0X3RyYW5zaXRpb24gPSBjcmVhdGVfb3V0X3RyYW5zaXRpb247XG5leHBvcnRzLmNyZWF0ZV9zbG90ID0gY3JlYXRlX3Nsb3Q7XG5leHBvcnRzLmNyZWF0ZV9zc3JfY29tcG9uZW50ID0gY3JlYXRlX3Nzcl9jb21wb25lbnQ7XG5leHBvcnRzLmN1c3RvbV9ldmVudCA9IGN1c3RvbV9ldmVudDtcbmV4cG9ydHMuZGF0YXNldF9kZXYgPSBkYXRhc2V0X2RldjtcbmV4cG9ydHMuZGVidWcgPSBkZWJ1ZztcbmV4cG9ydHMuZGVzdHJveV9ibG9jayA9IGRlc3Ryb3lfYmxvY2s7XG5leHBvcnRzLmRlc3Ryb3lfY29tcG9uZW50ID0gZGVzdHJveV9jb21wb25lbnQ7XG5leHBvcnRzLmRlc3Ryb3lfZWFjaCA9IGRlc3Ryb3lfZWFjaDtcbmV4cG9ydHMuZGV0YWNoID0gZGV0YWNoO1xuZXhwb3J0cy5kZXRhY2hfYWZ0ZXJfZGV2ID0gZGV0YWNoX2FmdGVyX2RldjtcbmV4cG9ydHMuZGV0YWNoX2JlZm9yZV9kZXYgPSBkZXRhY2hfYmVmb3JlX2RldjtcbmV4cG9ydHMuZGV0YWNoX2JldHdlZW5fZGV2ID0gZGV0YWNoX2JldHdlZW5fZGV2O1xuZXhwb3J0cy5kZXRhY2hfZGV2ID0gZGV0YWNoX2RldjtcbmV4cG9ydHMuZGlydHlfY29tcG9uZW50cyA9IGRpcnR5X2NvbXBvbmVudHM7XG5leHBvcnRzLmRpc3BhdGNoX2RldiA9IGRpc3BhdGNoX2RldjtcbmV4cG9ydHMuZWFjaCA9IGVhY2g7XG5leHBvcnRzLmVsZW1lbnQgPSBlbGVtZW50O1xuZXhwb3J0cy5lbGVtZW50X2lzID0gZWxlbWVudF9pcztcbmV4cG9ydHMuZW1wdHkgPSBlbXB0eTtcbmV4cG9ydHMuZW5kX2h5ZHJhdGluZyA9IGVuZF9oeWRyYXRpbmc7XG5leHBvcnRzLmVzY2FwZSA9IGVzY2FwZTtcbmV4cG9ydHMuZXNjYXBlX2F0dHJpYnV0ZV92YWx1ZSA9IGVzY2FwZV9hdHRyaWJ1dGVfdmFsdWU7XG5leHBvcnRzLmVzY2FwZV9vYmplY3QgPSBlc2NhcGVfb2JqZWN0O1xuZXhwb3J0cy5lc2NhcGVkID0gZXNjYXBlZDtcbmV4cG9ydHMuZXhjbHVkZV9pbnRlcm5hbF9wcm9wcyA9IGV4Y2x1ZGVfaW50ZXJuYWxfcHJvcHM7XG5leHBvcnRzLmZpeF9hbmRfZGVzdHJveV9ibG9jayA9IGZpeF9hbmRfZGVzdHJveV9ibG9jaztcbmV4cG9ydHMuZml4X2FuZF9vdXRyb19hbmRfZGVzdHJveV9ibG9jayA9IGZpeF9hbmRfb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2s7XG5leHBvcnRzLmZpeF9wb3NpdGlvbiA9IGZpeF9wb3NpdGlvbjtcbmV4cG9ydHMuZmx1c2ggPSBmbHVzaDtcbmV4cG9ydHMuZ2V0Q29udGV4dCA9IGdldENvbnRleHQ7XG5leHBvcnRzLmdldF9iaW5kaW5nX2dyb3VwX3ZhbHVlID0gZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWU7XG5leHBvcnRzLmdldF9jdXJyZW50X2NvbXBvbmVudCA9IGdldF9jdXJyZW50X2NvbXBvbmVudDtcbmV4cG9ydHMuZ2V0X2N1c3RvbV9lbGVtZW50c19zbG90cyA9IGdldF9jdXN0b21fZWxlbWVudHNfc2xvdHM7XG5leHBvcnRzLmdldF9zbG90X2NoYW5nZXMgPSBnZXRfc2xvdF9jaGFuZ2VzO1xuZXhwb3J0cy5nZXRfc2xvdF9jb250ZXh0ID0gZ2V0X3Nsb3RfY29udGV4dDtcbmV4cG9ydHMuZ2V0X3NwcmVhZF9vYmplY3QgPSBnZXRfc3ByZWFkX29iamVjdDtcbmV4cG9ydHMuZ2V0X3NwcmVhZF91cGRhdGUgPSBnZXRfc3ByZWFkX3VwZGF0ZTtcbmV4cG9ydHMuZ2V0X3N0b3JlX3ZhbHVlID0gZ2V0X3N0b3JlX3ZhbHVlO1xuZXhwb3J0cy5nbG9iYWxzID0gZ2xvYmFscztcbmV4cG9ydHMuZ3JvdXBfb3V0cm9zID0gZ3JvdXBfb3V0cm9zO1xuZXhwb3J0cy5oYW5kbGVfcHJvbWlzZSA9IGhhbmRsZV9wcm9taXNlO1xuZXhwb3J0cy5oYXNDb250ZXh0ID0gaGFzQ29udGV4dDtcbmV4cG9ydHMuaGFzX3Byb3AgPSBoYXNfcHJvcDtcbmV4cG9ydHMuaWRlbnRpdHkgPSBpZGVudGl0eTtcbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG5leHBvcnRzLmluc2VydCA9IGluc2VydDtcbmV4cG9ydHMuaW5zZXJ0X2RldiA9IGluc2VydF9kZXY7XG5leHBvcnRzLmludHJvcyA9IGludHJvcztcbmV4cG9ydHMuaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIgPSBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlcjtcbmV4cG9ydHMuaXNfY2xpZW50ID0gaXNfY2xpZW50O1xuZXhwb3J0cy5pc19jcm9zc29yaWdpbiA9IGlzX2Nyb3Nzb3JpZ2luO1xuZXhwb3J0cy5pc19lbXB0eSA9IGlzX2VtcHR5O1xuZXhwb3J0cy5pc19mdW5jdGlvbiA9IGlzX2Z1bmN0aW9uO1xuZXhwb3J0cy5pc19wcm9taXNlID0gaXNfcHJvbWlzZTtcbmV4cG9ydHMubGlzdGVuID0gbGlzdGVuO1xuZXhwb3J0cy5saXN0ZW5fZGV2ID0gbGlzdGVuX2RldjtcbmV4cG9ydHMubG9vcCA9IGxvb3A7XG5leHBvcnRzLmxvb3BfZ3VhcmQgPSBsb29wX2d1YXJkO1xuZXhwb3J0cy5taXNzaW5nX2NvbXBvbmVudCA9IG1pc3NpbmdfY29tcG9uZW50O1xuZXhwb3J0cy5tb3VudF9jb21wb25lbnQgPSBtb3VudF9jb21wb25lbnQ7XG5leHBvcnRzLm5vb3AgPSBub29wO1xuZXhwb3J0cy5ub3RfZXF1YWwgPSBub3RfZXF1YWw7XG5leHBvcnRzLm51bGxfdG9fZW1wdHkgPSBudWxsX3RvX2VtcHR5O1xuZXhwb3J0cy5vYmplY3Rfd2l0aG91dF9wcm9wZXJ0aWVzID0gb2JqZWN0X3dpdGhvdXRfcHJvcGVydGllcztcbmV4cG9ydHMub25EZXN0cm95ID0gb25EZXN0cm95O1xuZXhwb3J0cy5vbk1vdW50ID0gb25Nb3VudDtcbmV4cG9ydHMub25jZSA9IG9uY2U7XG5leHBvcnRzLm91dHJvX2FuZF9kZXN0cm95X2Jsb2NrID0gb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2s7XG5leHBvcnRzLnByZXZlbnRfZGVmYXVsdCA9IHByZXZlbnRfZGVmYXVsdDtcbmV4cG9ydHMucHJvcF9kZXYgPSBwcm9wX2RldjtcbmV4cG9ydHMucXVlcnlfc2VsZWN0b3JfYWxsID0gcXVlcnlfc2VsZWN0b3JfYWxsO1xuZXhwb3J0cy5ydW4gPSBydW47XG5leHBvcnRzLnJ1bl9hbGwgPSBydW5fYWxsO1xuZXhwb3J0cy5zYWZlX25vdF9lcXVhbCA9IHNhZmVfbm90X2VxdWFsO1xuZXhwb3J0cy5zY2hlZHVsZV91cGRhdGUgPSBzY2hlZHVsZV91cGRhdGU7XG5leHBvcnRzLnNlbGVjdF9tdWx0aXBsZV92YWx1ZSA9IHNlbGVjdF9tdWx0aXBsZV92YWx1ZTtcbmV4cG9ydHMuc2VsZWN0X29wdGlvbiA9IHNlbGVjdF9vcHRpb247XG5leHBvcnRzLnNlbGVjdF9vcHRpb25zID0gc2VsZWN0X29wdGlvbnM7XG5leHBvcnRzLnNlbGVjdF92YWx1ZSA9IHNlbGVjdF92YWx1ZTtcbmV4cG9ydHMuc2VsZiA9IHNlbGY7XG5leHBvcnRzLnNldENvbnRleHQgPSBzZXRDb250ZXh0O1xuZXhwb3J0cy5zZXRfYXR0cmlidXRlcyA9IHNldF9hdHRyaWJ1dGVzO1xuZXhwb3J0cy5zZXRfY3VycmVudF9jb21wb25lbnQgPSBzZXRfY3VycmVudF9jb21wb25lbnQ7XG5leHBvcnRzLnNldF9jdXN0b21fZWxlbWVudF9kYXRhID0gc2V0X2N1c3RvbV9lbGVtZW50X2RhdGE7XG5leHBvcnRzLnNldF9kYXRhID0gc2V0X2RhdGE7XG5leHBvcnRzLnNldF9kYXRhX2RldiA9IHNldF9kYXRhX2RldjtcbmV4cG9ydHMuc2V0X2lucHV0X3R5cGUgPSBzZXRfaW5wdXRfdHlwZTtcbmV4cG9ydHMuc2V0X2lucHV0X3ZhbHVlID0gc2V0X2lucHV0X3ZhbHVlO1xuZXhwb3J0cy5zZXRfbm93ID0gc2V0X25vdztcbmV4cG9ydHMuc2V0X3JhZiA9IHNldF9yYWY7XG5leHBvcnRzLnNldF9zdG9yZV92YWx1ZSA9IHNldF9zdG9yZV92YWx1ZTtcbmV4cG9ydHMuc2V0X3N0eWxlID0gc2V0X3N0eWxlO1xuZXhwb3J0cy5zZXRfc3ZnX2F0dHJpYnV0ZXMgPSBzZXRfc3ZnX2F0dHJpYnV0ZXM7XG5leHBvcnRzLnNwYWNlID0gc3BhY2U7XG5leHBvcnRzLnNwcmVhZCA9IHNwcmVhZDtcbmV4cG9ydHMuc3RhcnRfaHlkcmF0aW5nID0gc3RhcnRfaHlkcmF0aW5nO1xuZXhwb3J0cy5zdG9wX3Byb3BhZ2F0aW9uID0gc3RvcF9wcm9wYWdhdGlvbjtcbmV4cG9ydHMuc3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuZXhwb3J0cy5zdmdfZWxlbWVudCA9IHN2Z19lbGVtZW50O1xuZXhwb3J0cy50ZXh0ID0gdGV4dDtcbmV4cG9ydHMudGljayA9IHRpY2s7XG5leHBvcnRzLnRpbWVfcmFuZ2VzX3RvX2FycmF5ID0gdGltZV9yYW5nZXNfdG9fYXJyYXk7XG5leHBvcnRzLnRvX251bWJlciA9IHRvX251bWJlcjtcbmV4cG9ydHMudG9nZ2xlX2NsYXNzID0gdG9nZ2xlX2NsYXNzO1xuZXhwb3J0cy50cmFuc2l0aW9uX2luID0gdHJhbnNpdGlvbl9pbjtcbmV4cG9ydHMudHJhbnNpdGlvbl9vdXQgPSB0cmFuc2l0aW9uX291dDtcbmV4cG9ydHMudXBkYXRlX2F3YWl0X2Jsb2NrX2JyYW5jaCA9IHVwZGF0ZV9hd2FpdF9ibG9ja19icmFuY2g7XG5leHBvcnRzLnVwZGF0ZV9rZXllZF9lYWNoID0gdXBkYXRlX2tleWVkX2VhY2g7XG5leHBvcnRzLnVwZGF0ZV9zbG90ID0gdXBkYXRlX3Nsb3Q7XG5leHBvcnRzLnVwZGF0ZV9zbG90X3NwcmVhZCA9IHVwZGF0ZV9zbG90X3NwcmVhZDtcbmV4cG9ydHMudmFsaWRhdGVfY29tcG9uZW50ID0gdmFsaWRhdGVfY29tcG9uZW50O1xuZXhwb3J0cy52YWxpZGF0ZV9lYWNoX2FyZ3VtZW50ID0gdmFsaWRhdGVfZWFjaF9hcmd1bWVudDtcbmV4cG9ydHMudmFsaWRhdGVfZWFjaF9rZXlzID0gdmFsaWRhdGVfZWFjaF9rZXlzO1xuZXhwb3J0cy52YWxpZGF0ZV9zbG90cyA9IHZhbGlkYXRlX3Nsb3RzO1xuZXhwb3J0cy52YWxpZGF0ZV9zdG9yZSA9IHZhbGlkYXRlX3N0b3JlO1xuZXhwb3J0cy54bGlua19hdHRyID0geGxpbmtfYXR0cjtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxudmFyIGludGVybmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaW5kZXguanMnKTtcblxuY29uc3Qgc3Vic2NyaWJlcl9xdWV1ZSA9IFtdO1xuLyoqXG4gKiBDcmVhdGVzIGEgYFJlYWRhYmxlYCBzdG9yZSB0aGF0IGFsbG93cyByZWFkaW5nIGJ5IHN1YnNjcmlwdGlvbi5cbiAqIEBwYXJhbSB2YWx1ZSBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyfXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcbiAqL1xuZnVuY3Rpb24gcmVhZGFibGUodmFsdWUsIHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiB3cml0YWJsZSh2YWx1ZSwgc3RhcnQpLnN1YnNjcmliZVxuICAgIH07XG59XG4vKipcbiAqIENyZWF0ZSBhIGBXcml0YWJsZWAgc3RvcmUgdGhhdCBhbGxvd3MgYm90aCB1cGRhdGluZyBhbmQgcmVhZGluZyBieSBzdWJzY3JpcHRpb24uXG4gKiBAcGFyYW0geyo9fXZhbHVlIGluaXRpYWwgdmFsdWVcbiAqIEBwYXJhbSB7U3RhcnRTdG9wTm90aWZpZXI9fXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcbiAqL1xuZnVuY3Rpb24gd3JpdGFibGUodmFsdWUsIHN0YXJ0ID0gaW50ZXJuYWwubm9vcCkge1xuICAgIGxldCBzdG9wO1xuICAgIGNvbnN0IHN1YnNjcmliZXJzID0gW107XG4gICAgZnVuY3Rpb24gc2V0KG5ld192YWx1ZSkge1xuICAgICAgICBpZiAoaW50ZXJuYWwuc2FmZV9ub3RfZXF1YWwodmFsdWUsIG5ld192YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbmV3X3ZhbHVlO1xuICAgICAgICAgICAgaWYgKHN0b3ApIHsgLy8gc3RvcmUgaXMgcmVhZHlcbiAgICAgICAgICAgICAgICBjb25zdCBydW5fcXVldWUgPSAhc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzID0gc3Vic2NyaWJlcnNbaV07XG4gICAgICAgICAgICAgICAgICAgIHNbMV0oKTtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcl9xdWV1ZS5wdXNoKHMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJ1bl9xdWV1ZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJfcXVldWUubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWVbaV1bMF0oc3Vic2NyaWJlcl9xdWV1ZVtpICsgMV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWUubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlKGZuKSB7XG4gICAgICAgIHNldChmbih2YWx1ZSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUocnVuLCBpbnZhbGlkYXRlID0gaW50ZXJuYWwubm9vcCkge1xuICAgICAgICBjb25zdCBzdWJzY3JpYmVyID0gW3J1biwgaW52YWxpZGF0ZV07XG4gICAgICAgIHN1YnNjcmliZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gICAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHN0b3AgPSBzdGFydChzZXQpIHx8IGludGVybmFsLm5vb3A7XG4gICAgICAgIH1cbiAgICAgICAgcnVuKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3Vic2NyaWJlcnMuaW5kZXhPZihzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgICAgICAgICBzdG9wID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgc2V0LCB1cGRhdGUsIHN1YnNjcmliZSB9O1xufVxuZnVuY3Rpb24gZGVyaXZlZChzdG9yZXMsIGZuLCBpbml0aWFsX3ZhbHVlKSB7XG4gICAgY29uc3Qgc2luZ2xlID0gIUFycmF5LmlzQXJyYXkoc3RvcmVzKTtcbiAgICBjb25zdCBzdG9yZXNfYXJyYXkgPSBzaW5nbGVcbiAgICAgICAgPyBbc3RvcmVzXVxuICAgICAgICA6IHN0b3JlcztcbiAgICBjb25zdCBhdXRvID0gZm4ubGVuZ3RoIDwgMjtcbiAgICByZXR1cm4gcmVhZGFibGUoaW5pdGlhbF92YWx1ZSwgKHNldCkgPT4ge1xuICAgICAgICBsZXQgaW5pdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBsZXQgcGVuZGluZyA9IDA7XG4gICAgICAgIGxldCBjbGVhbnVwID0gaW50ZXJuYWwubm9vcDtcbiAgICAgICAgY29uc3Qgc3luYyA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm4oc2luZ2xlID8gdmFsdWVzWzBdIDogdmFsdWVzLCBzZXQpO1xuICAgICAgICAgICAgaWYgKGF1dG8pIHtcbiAgICAgICAgICAgICAgICBzZXQocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsZWFudXAgPSBpbnRlcm5hbC5pc19mdW5jdGlvbihyZXN1bHQpID8gcmVzdWx0IDogaW50ZXJuYWwubm9vcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdW5zdWJzY3JpYmVycyA9IHN0b3Jlc19hcnJheS5tYXAoKHN0b3JlLCBpKSA9PiBpbnRlcm5hbC5zdWJzY3JpYmUoc3RvcmUsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdmFsdWVzW2ldID0gdmFsdWU7XG4gICAgICAgICAgICBwZW5kaW5nICY9IH4oMSA8PCBpKTtcbiAgICAgICAgICAgIGlmIChpbml0ZWQpIHtcbiAgICAgICAgICAgICAgICBzeW5jKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHBlbmRpbmcgfD0gKDEgPDwgaSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgc3luYygpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgICAgIGludGVybmFsLnJ1bl9hbGwodW5zdWJzY3JpYmVycyk7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnZ2V0Jywge1xuXHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gaW50ZXJuYWwuZ2V0X3N0b3JlX3ZhbHVlO1xuXHR9XG59KTtcbmV4cG9ydHMuZGVyaXZlZCA9IGRlcml2ZWQ7XG5leHBvcnRzLnJlYWRhYmxlID0gcmVhZGFibGU7XG5leHBvcnRzLndyaXRhYmxlID0gd3JpdGFibGU7XG4iLCJpbXBvcnQgeyB3cml0YWJsZSB9IGZyb20gJ3N2ZWx0ZS9zdG9yZSc7XG5cbmV4cG9ydCBjb25zdCBCQVNFX1VSTCA9ICdodHRwczovL2dpdGh1Yi5jb20nO1xuZXhwb3J0IGNvbnN0IEFQSV9VUkwgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbSc7XG5cbi8qIGdsb2JhbCBQcm9taXNlLCBmZXRjaCAqL1xudmFyIEFVVEhfSUQ9XCJmY2ZkMGQxNDRjZGRiNmIwNzBlN1wiLCBBVVRIX1NFQ1JFVD1cIjJhYWVlY2ZhYjRkZTQwZDRkYjNmYTdlN2NjNzQ2Njc1MGE1MWRjZGJcIiwgUFJPWFlfVVJMPVwiaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vXCI7XG5cbmNvbnN0IGRhdGEgPSB3aW5kb3cubG9jYWxTdG9yYWdlLl9EQVRBO1xuXG4vLyBzaGFyZWQgc3RhdGVcbmV4cG9ydCBjb25zdCBsb2dnZWRJbiA9IHdyaXRhYmxlKCEhZGF0YSk7XG5leHBvcnQgY29uc3Qgc2Vzc2lvbiA9IHdyaXRhYmxlKGRhdGEgPyBKU09OLnBhcnNlKGRhdGEpIDoge30pO1xuZXhwb3J0IGNvbnN0IHNjaGVtYXMgPSB3cml0YWJsZShbXSk7XG5leHBvcnQgY29uc3QgY3VycmVudCA9IHdyaXRhYmxlKHt9KTtcbmV4cG9ydCBjb25zdCBvcHRpb25zID0gd3JpdGFibGUobnVsbCk7XG5cbi8vIGJ1aWxkcyBhIGZpeGVkIFVSTCBmb3IgZ2l0aHViLmFwaSBjYWxsc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVybCh4LCBwYXRoLCBwYXJhbXMpIHtcbiAgY29uc3QgdXJsID0gYCR7eH0ke3BhdGh9P2NsaWVudF9pZD0ke0FVVEhfSUR9JmNsaWVudF9zZWNyZXQ9JHtBVVRIX1NFQ1JFVH1gO1xuICBjb25zdCByZWRpcmVjdCA9IGByZWRpcmVjdF91cmk9JHtlbmNvZGVVUklDb21wb25lbnQoYCR7bG9jYXRpb24ucHJvdG9jb2x9Ly8ke2xvY2F0aW9uLmhvc3R9L2ApfWA7XG5cbiAgcmV0dXJuIHBhcmFtc1xuICAgID8gYCR7dXJsfSYke09iamVjdC5rZXlzKHBhcmFtcykubWFwKGsgPT4gYCR7a309JHtwYXJhbXNba119YCkuam9pbignJicpfSYke3JlZGlyZWN0fWBcbiAgICA6IGAke3VybH0ke3BhcmFtcyAhPT0gZmFsc2UgPyBgJiR7cmVkaXJlY3R9YCA6ICcnfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRKU09OKHBhdGgsIHBhcmFtcywgX29wdGlvbnMpIHtcbiAgcmV0dXJuIGZldGNoKGAke1BST1hZX1VSTH0ke2dldFVybChBUElfVVJMLCBwYXRoLCBfb3B0aW9ucyl9YCwge1xuICAgIC4uLnBhcmFtcyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgYmVhcmVyICR7d2luZG93LmxvY2FsU3RvcmFnZS5fQVVUSH1gLFxuICAgIH0sXG4gIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEZyb20odXJpKSB7XG4gIGNvbnN0IHRtcCA9IHVyaS5yZXBsYWNlKCcjJywgJycpLnNwbGl0KCcvJyk7XG5cbiAgaWYgKHRtcC5sZW5ndGggPT09IDEpIHtcbiAgICAvLyBvbGQgc3R5bGUgVVJJLWJhc2VkIHNjaGVtYSAtIHN1cHBvcnRlZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgIC8vIGV4YW1wbGU6IGh0dHA6Ly9qc29uLXNjaGVtYS1mYWtlci5qcy5vcmcvIyU3QiUyMnR5cGUlMjIlM0ElMjJzdHJpbmclMjIlMkMlMjJjaGFuY2UlMjIlM0ElN0IlMjJmaXJzdCUyMiUzQSU3QiUyMm5hdGlvbmFsaXR5JTIyJTNBJTIyZW4lMjIlN0QlN0QlN0RcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIGZpbGVzOiB7XG4gICAgICAgIC8vIGxlZ2FjeSBhbmQgdWdseVxuICAgICAgICAnc2NoZW1hLmpzb24nOiB7XG4gICAgICAgICAgY29udGVudDogZGVjb2RlVVJJQ29tcG9uZW50KHRtcFswXSksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgW3R5cGUsIGhhc2hdID0gdG1wO1xuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2dpc3QnOlxuICAgICAgLy8gZXhhbXBsZTogaHR0cDovL2pzb24tc2NoZW1hLWZha2VyLmpzLm9yZy8jZ2lzdC9jMzQ3ZjJmNjA4M2ZlODFhMWZlNDNkMTdiODMxMjVkN1xuICAgICAgcmV0dXJuIGZldGNoKGdldFVybChBUElfVVJMLCBgL2dpc3RzLyR7aGFzaH1gKSlcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xuXG4gICAgY2FzZSAndXJpJzpcbiAgICAgIC8vIGV4YW1wbGU6IGh0dHA6Ly9qc29uLXNjaGVtYS1mYWtlci5qcy5vcmcvI3VyaS8lN0IlMjJ0eXBlJTIyJTNBJTIyc3RyaW5nJTIyJTJDJTIyY2hhbmNlJTIyJTNBJTdCJTIyZmlyc3QlMjIlM0ElN0IlMjJuYXRpb25hbGl0eSUyMiUzQSUyMmVuJTIyJTdEJTdEJTdEXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgZmlsZXM6IHtcbiAgICAgICAgICBFeGFtcGxlOiB7XG4gICAgICAgICAgICBjb250ZW50OiBkZWNvZGVVUklDb21wb25lbnQoaGFzaCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBzdG9yYWdlIHR5cGUnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZShzY2hlbWFzKSB7XG4gIGNvbnN0IF9maWxlcyA9IHtcbiAgICAvLyBmcmVzaCBjb3B5IG9mIGN1cnJlbnQgb3B0aW9uc1xuICAgICdfb3B0aW9ucy5qc29uJzoge1xuICAgICAgY29udGVudDogSlNPTi5zdHJpbmdpZnkoJG9wdGlvbnMpLFxuICAgIH0sXG4gIH07XG5cbiAgLy8gc3RvcmUgZWFjaCBnaXZlbiBzY2hlbWFcbiAgT2JqZWN0LmtleXMoc2NoZW1hcykuZm9yRWFjaChrZXkgPT4ge1xuICAgIF9maWxlc1trZXldID0geyBjb250ZW50OiBzY2hlbWFzW2tleV0udmFsdWUgfTtcbiAgfSk7XG5cbiAgLy8gRklYTUU6IHBhdGNoIGdpc3QgaWYgb3duZXIgbWF0Y2hlcz9cblxuICBjb25zdCB1cmwgPSBnZXRVcmwoQVBJX1VSTCwgJy9naXN0cycsIGZhbHNlKTtcbiAgY29uc3QgZml4ZWRVcmwgPSBgJHtQUk9YWV9VUkx9JHt1cmx9YDtcblxuICByZXR1cm4gZmV0Y2goZml4ZWRVcmwsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgYmVhcmVyICR7dG9rZW5JZH1gLFxuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBkZXNjcmlwdGlvbjogJ1NjaGVtYXMgY3JlYXRlZCBieSBodHRwOi8vanNvbi1zY2hlbWEtZmFrZXIuanMub3JnJyxcbiAgICAgIGZpbGVzOiBfZmlsZXMsXG4gICAgfSksXG4gIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5tZXNzYWdlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLm1lc3NhZ2UpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF1dGgodG9rZW5JZCwgY2FsbGJhY2spIHtcbiAgd2luZG93LmxvY2FsU3RvcmFnZS5fQVVUSCA9ICcnO1xuXG4gIGNvbnN0IHVybCA9IGdldFVybChCQVNFX1VSTCwgJy9sb2dpbi9vYXV0aC9hY2Nlc3NfdG9rZW4nLCB7XG4gICAgY29kZTogdG9rZW5JZCxcbiAgfSk7XG5cbiAgZmV0Y2goYCR7UFJPWFlfVVJMfSR7dXJsfWAsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBpZiAocmVzdWx0LmFjY2Vzc190b2tlbikge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLl9BVVRIID0gcmVzdWx0LmFjY2Vzc190b2tlbjtcbiAgICAgICAgc2V0VGltZW91dChjYWxsYmFjaywgMTIwKTtcbiAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVybCgpIHtcbiAgcmV0dXJuIGdldFVybChCQVNFX1VSTCwgJy9sb2dpbi9vYXV0aC9hdXRob3JpemUnLCB7XG4gICAgc2NvcGU6ICdnaXN0LHJlYWQ6dXNlcicsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxsKCkge1xuICByZXR1cm4gZ2V0SlNPTignL2dpc3RzJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZSgpIHtcbiAgcmV0dXJuIGdldEpTT04oJy91c2VyJyk7XG59XG4iLCJpbXBvcnQgeyBhdXRoIH0gZnJvbSAnLi9saWIvZ2lzdHMnO1xuXG5pbXBvcnQgQXV0aCBmcm9tICcuL2xpYi9BdXRoLnN2ZWx0ZSc7XG5pbXBvcnQgRWRpdG9yIGZyb20gJy4vbGliL0VkaXRvci5zdmVsdGUnO1xuXG5mdW5jdGlvbiBtYWluKCkge1xuICBpZiAodHlwZW9mIHdpbmRvdy5KU09OU2NoZW1hRmFrZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LkpTT05TY2hlbWFGYWtlci5leHRlbmQoJ2Zha2VyJywgKCkgPT4gd2luZG93LmZha2VyKTtcbiAgICB3aW5kb3cuSlNPTlNjaGVtYUZha2VyLmV4dGVuZCgnY2hhbmNlJywgKCkgPT4gd2luZG93LmNoYW5jZSk7XG4gIH1cblxuICAvLyBpbml0aWFsaXplIG1vZHVsZXNcbiAgbmV3IEF1dGgoeyB0YXJnZXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdXRoJykgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgbmV3IEVkaXRvcih7IHRhcmdldDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXRvcicpIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG59XG5cbmZ1bmN0aW9uIGRlYnVnKG1zZykge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGluZy1vdmVybGF5IC5qc2YtbG9nbycpLmNsYXNzTGlzdC5yZW1vdmUoJ2Zsb2F0Jyk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkaW5nLW92ZXJsYXkgLnRhYycpLmlubmVySFRNTCA9IGBcbiAgICA8cCBzdHlsZT1cIm1heC13aWR0aDoyMDBweFwiIGNsYXNzPVwibXQgbWIgY250XCI+JHttc2d9PC9wPlxuICAgIDxidXR0b24gb25jbGljaz1cIndpbmRvdy5jbG9zZSgpXCIgY2xhc3M9XCJidVwiPkNsb3NlIHdpbmRvdzwvYnV0dG9uPlxuICBgO1xufVxuXG4vLyBoYW5kbGVzIGF1dGhvZW50aWNhdGlvbiB0aHJvdWdoIGdpdGh1Yi1hcGlcbmlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCc/Y29kZT0nKSkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGluZy1vdmVybGF5IC50YWMnKS5pbm5lclRleHQgPSAnQXV0aGVudGljYXRpbmcuLi4nO1xuXG4gIGF1dGgod2luZG93LmxvY2F0aW9uLnNlYXJjaC5zcGxpdCgnP2NvZGU9JylbMV0sICgpID0+IHtcbiAgICBjb25zdCBjbGVhblVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCc/JylbMF07XG5cbiAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgJycsIGNsZWFuVXJsKTtcblxuICAgIGlmICh3aW5kb3cub3BlbmVyKSB7XG4gICAgICB3aW5kb3cuY2xvc2UoKTtcbiAgICB9XG4gIH0pO1xufSBlbHNlIGlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCc/ZXJyb3I9JykpIHtcbiAgY29uc3QgbWVzc2FnZSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoJ2Vycm9yX2Rlc2NyaXB0aW9uPScpWzFdO1xuICBjb25zdCBlcnJvciA9IG1lc3NhZ2Uuc3BsaXQoJyYnKVswXS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcblxuICBkZWJ1ZyhlcnJvcik7XG59IGVsc2Uge1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGluZy1vdmVybGF5JykuY2xhc3NMaXN0LmFkZCgnZmFkZS1vdXQnKTtcbiAgICBtYWluKCk7XG4gIH0sIDEyNjApO1xufVxuIiwiZnVuY3Rpb24gbm9vcCgpIHsgfVxuY29uc3QgaWRlbnRpdHkgPSB4ID0+IHg7XG5mdW5jdGlvbiBhc3NpZ24odGFyLCBzcmMpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZm9yIChjb25zdCBrIGluIHNyYylcbiAgICAgICAgdGFyW2tdID0gc3JjW2tdO1xuICAgIHJldHVybiB0YXI7XG59XG5mdW5jdGlvbiBpc19wcm9taXNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBhZGRfbG9jYXRpb24oZWxlbWVudCwgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyKSB7XG4gICAgZWxlbWVudC5fX3N2ZWx0ZV9tZXRhID0ge1xuICAgICAgICBsb2M6IHsgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gcnVuKGZuKSB7XG4gICAgcmV0dXJuIGZuKCk7XG59XG5mdW5jdGlvbiBibGFua19vYmplY3QoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCk7XG59XG5mdW5jdGlvbiBydW5fYWxsKGZucykge1xuICAgIGZucy5mb3JFYWNoKHJ1bik7XG59XG5mdW5jdGlvbiBpc19mdW5jdGlvbih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBzYWZlX25vdF9lcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGIgfHwgKChhICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JykgfHwgdHlwZW9mIGEgPT09ICdmdW5jdGlvbicpO1xufVxuZnVuY3Rpb24gbm90X2VxdWFsKGEsIGIpIHtcbiAgICByZXR1cm4gYSAhPSBhID8gYiA9PSBiIDogYSAhPT0gYjtcbn1cbmZ1bmN0aW9uIGlzX2VtcHR5KG9iaikge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMDtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX3N0b3JlKHN0b3JlLCBuYW1lKSB7XG4gICAgaWYgKHN0b3JlICE9IG51bGwgJiYgdHlwZW9mIHN0b3JlLnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCcke25hbWV9JyBpcyBub3QgYSBzdG9yZSB3aXRoIGEgJ3N1YnNjcmliZScgbWV0aG9kYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gc3Vic2NyaWJlKHN0b3JlLCAuLi5jYWxsYmFja3MpIHtcbiAgICBpZiAoc3RvcmUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbm9vcDtcbiAgICB9XG4gICAgY29uc3QgdW5zdWIgPSBzdG9yZS5zdWJzY3JpYmUoLi4uY2FsbGJhY2tzKTtcbiAgICByZXR1cm4gdW5zdWIudW5zdWJzY3JpYmUgPyAoKSA9PiB1bnN1Yi51bnN1YnNjcmliZSgpIDogdW5zdWI7XG59XG5mdW5jdGlvbiBnZXRfc3RvcmVfdmFsdWUoc3RvcmUpIHtcbiAgICBsZXQgdmFsdWU7XG4gICAgc3Vic2NyaWJlKHN0b3JlLCBfID0+IHZhbHVlID0gXykoKTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiBjb21wb25lbnRfc3Vic2NyaWJlKGNvbXBvbmVudCwgc3RvcmUsIGNhbGxiYWNrKSB7XG4gICAgY29tcG9uZW50LiQkLm9uX2Rlc3Ryb3kucHVzaChzdWJzY3JpYmUoc3RvcmUsIGNhbGxiYWNrKSk7XG59XG5mdW5jdGlvbiBjcmVhdGVfc2xvdChkZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGZuKSB7XG4gICAgaWYgKGRlZmluaXRpb24pIHtcbiAgICAgICAgY29uc3Qgc2xvdF9jdHggPSBnZXRfc2xvdF9jb250ZXh0KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pO1xuICAgICAgICByZXR1cm4gZGVmaW5pdGlvblswXShzbG90X2N0eCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0X3Nsb3RfY29udGV4dChkZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGZuKSB7XG4gICAgcmV0dXJuIGRlZmluaXRpb25bMV0gJiYgZm5cbiAgICAgICAgPyBhc3NpZ24oJCRzY29wZS5jdHguc2xpY2UoKSwgZGVmaW5pdGlvblsxXShmbihjdHgpKSlcbiAgICAgICAgOiAkJHNjb3BlLmN0eDtcbn1cbmZ1bmN0aW9uIGdldF9zbG90X2NoYW5nZXMoZGVmaW5pdGlvbiwgJCRzY29wZSwgZGlydHksIGZuKSB7XG4gICAgaWYgKGRlZmluaXRpb25bMl0gJiYgZm4pIHtcbiAgICAgICAgY29uc3QgbGV0cyA9IGRlZmluaXRpb25bMl0oZm4oZGlydHkpKTtcbiAgICAgICAgaWYgKCQkc2NvcGUuZGlydHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGxldHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBsZXRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3QgbWVyZ2VkID0gW107XG4gICAgICAgICAgICBjb25zdCBsZW4gPSBNYXRoLm1heCgkJHNjb3BlLmRpcnR5Lmxlbmd0aCwgbGV0cy5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZFtpXSA9ICQkc2NvcGUuZGlydHlbaV0gfCBsZXRzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1lcmdlZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJCRzY29wZS5kaXJ0eSB8IGxldHM7XG4gICAgfVxuICAgIHJldHVybiAkJHNjb3BlLmRpcnR5O1xufVxuZnVuY3Rpb24gdXBkYXRlX3Nsb3Qoc2xvdCwgc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGRpcnR5LCBnZXRfc2xvdF9jaGFuZ2VzX2ZuLCBnZXRfc2xvdF9jb250ZXh0X2ZuKSB7XG4gICAgY29uc3Qgc2xvdF9jaGFuZ2VzID0gZ2V0X3Nsb3RfY2hhbmdlcyhzbG90X2RlZmluaXRpb24sICQkc2NvcGUsIGRpcnR5LCBnZXRfc2xvdF9jaGFuZ2VzX2ZuKTtcbiAgICBpZiAoc2xvdF9jaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IHNsb3RfY29udGV4dCA9IGdldF9zbG90X2NvbnRleHQoc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGdldF9zbG90X2NvbnRleHRfZm4pO1xuICAgICAgICBzbG90LnAoc2xvdF9jb250ZXh0LCBzbG90X2NoYW5nZXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZV9zbG90X3NwcmVhZChzbG90LCBzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZGlydHksIGdldF9zbG90X2NoYW5nZXNfZm4sIGdldF9zbG90X3NwcmVhZF9jaGFuZ2VzX2ZuLCBnZXRfc2xvdF9jb250ZXh0X2ZuKSB7XG4gICAgY29uc3Qgc2xvdF9jaGFuZ2VzID0gZ2V0X3Nsb3Rfc3ByZWFkX2NoYW5nZXNfZm4oZGlydHkpIHwgZ2V0X3Nsb3RfY2hhbmdlcyhzbG90X2RlZmluaXRpb24sICQkc2NvcGUsIGRpcnR5LCBnZXRfc2xvdF9jaGFuZ2VzX2ZuKTtcbiAgICBpZiAoc2xvdF9jaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IHNsb3RfY29udGV4dCA9IGdldF9zbG90X2NvbnRleHQoc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGdldF9zbG90X2NvbnRleHRfZm4pO1xuICAgICAgICBzbG90LnAoc2xvdF9jb250ZXh0LCBzbG90X2NoYW5nZXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGV4Y2x1ZGVfaW50ZXJuYWxfcHJvcHMocHJvcHMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGsgaW4gcHJvcHMpXG4gICAgICAgIGlmIChrWzBdICE9PSAnJCcpXG4gICAgICAgICAgICByZXN1bHRba10gPSBwcm9wc1trXTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gY29tcHV0ZV9yZXN0X3Byb3BzKHByb3BzLCBrZXlzKSB7XG4gICAgY29uc3QgcmVzdCA9IHt9O1xuICAgIGtleXMgPSBuZXcgU2V0KGtleXMpO1xuICAgIGZvciAoY29uc3QgayBpbiBwcm9wcylcbiAgICAgICAgaWYgKCFrZXlzLmhhcyhrKSAmJiBrWzBdICE9PSAnJCcpXG4gICAgICAgICAgICByZXN0W2tdID0gcHJvcHNba107XG4gICAgcmV0dXJuIHJlc3Q7XG59XG5mdW5jdGlvbiBjb21wdXRlX3Nsb3RzKHNsb3RzKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2xvdHMpIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gb25jZShmbikge1xuICAgIGxldCByYW4gPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKHJhbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcmFuID0gdHJ1ZTtcbiAgICAgICAgZm4uY2FsbCh0aGlzLCAuLi5hcmdzKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gbnVsbF90b19lbXB0eSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHNldF9zdG9yZV92YWx1ZShzdG9yZSwgcmV0LCB2YWx1ZSA9IHJldCkge1xuICAgIHN0b3JlLnNldCh2YWx1ZSk7XG4gICAgcmV0dXJuIHJldDtcbn1cbmNvbnN0IGhhc19wcm9wID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG5mdW5jdGlvbiBhY3Rpb25fZGVzdHJveWVyKGFjdGlvbl9yZXN1bHQpIHtcbiAgICByZXR1cm4gYWN0aW9uX3Jlc3VsdCAmJiBpc19mdW5jdGlvbihhY3Rpb25fcmVzdWx0LmRlc3Ryb3kpID8gYWN0aW9uX3Jlc3VsdC5kZXN0cm95IDogbm9vcDtcbn1cblxuY29uc3QgaXNfY2xpZW50ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG5sZXQgbm93ID0gaXNfY2xpZW50XG4gICAgPyAoKSA9PiB3aW5kb3cucGVyZm9ybWFuY2Uubm93KClcbiAgICA6ICgpID0+IERhdGUubm93KCk7XG5sZXQgcmFmID0gaXNfY2xpZW50ID8gY2IgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNiKSA6IG5vb3A7XG4vLyB1c2VkIGludGVybmFsbHkgZm9yIHRlc3RpbmdcbmZ1bmN0aW9uIHNldF9ub3coZm4pIHtcbiAgICBub3cgPSBmbjtcbn1cbmZ1bmN0aW9uIHNldF9yYWYoZm4pIHtcbiAgICByYWYgPSBmbjtcbn1cblxuY29uc3QgdGFza3MgPSBuZXcgU2V0KCk7XG5mdW5jdGlvbiBydW5fdGFza3Mobm93KSB7XG4gICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgaWYgKCF0YXNrLmMobm93KSkge1xuICAgICAgICAgICAgdGFza3MuZGVsZXRlKHRhc2spO1xuICAgICAgICAgICAgdGFzay5mKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodGFza3Muc2l6ZSAhPT0gMClcbiAgICAgICAgcmFmKHJ1bl90YXNrcyk7XG59XG4vKipcbiAqIEZvciB0ZXN0aW5nIHB1cnBvc2VzIG9ubHkhXG4gKi9cbmZ1bmN0aW9uIGNsZWFyX2xvb3BzKCkge1xuICAgIHRhc2tzLmNsZWFyKCk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdGFzayB0aGF0IHJ1bnMgb24gZWFjaCByYWYgZnJhbWVcbiAqIHVudGlsIGl0IHJldHVybnMgYSBmYWxzeSB2YWx1ZSBvciBpcyBhYm9ydGVkXG4gKi9cbmZ1bmN0aW9uIGxvb3AoY2FsbGJhY2spIHtcbiAgICBsZXQgdGFzaztcbiAgICBpZiAodGFza3Muc2l6ZSA9PT0gMClcbiAgICAgICAgcmFmKHJ1bl90YXNrcyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvbWlzZTogbmV3IFByb21pc2UoZnVsZmlsbCA9PiB7XG4gICAgICAgICAgICB0YXNrcy5hZGQodGFzayA9IHsgYzogY2FsbGJhY2ssIGY6IGZ1bGZpbGwgfSk7XG4gICAgICAgIH0pLFxuICAgICAgICBhYm9ydCgpIHtcbiAgICAgICAgICAgIHRhc2tzLmRlbGV0ZSh0YXNrKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8vIFRyYWNrIHdoaWNoIG5vZGVzIGFyZSBjbGFpbWVkIGR1cmluZyBoeWRyYXRpb24uIFVuY2xhaW1lZCBub2RlcyBjYW4gdGhlbiBiZSByZW1vdmVkIGZyb20gdGhlIERPTVxuLy8gYXQgdGhlIGVuZCBvZiBoeWRyYXRpb24gd2l0aG91dCB0b3VjaGluZyB0aGUgcmVtYWluaW5nIG5vZGVzLlxubGV0IGlzX2h5ZHJhdGluZyA9IGZhbHNlO1xuZnVuY3Rpb24gc3RhcnRfaHlkcmF0aW5nKCkge1xuICAgIGlzX2h5ZHJhdGluZyA9IHRydWU7XG59XG5mdW5jdGlvbiBlbmRfaHlkcmF0aW5nKCkge1xuICAgIGlzX2h5ZHJhdGluZyA9IGZhbHNlO1xufVxuZnVuY3Rpb24gdXBwZXJfYm91bmQobG93LCBoaWdoLCBrZXksIHZhbHVlKSB7XG4gICAgLy8gUmV0dXJuIGZpcnN0IGluZGV4IG9mIHZhbHVlIGxhcmdlciB0aGFuIGlucHV0IHZhbHVlIGluIHRoZSByYW5nZSBbbG93LCBoaWdoKVxuICAgIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgICAgIGNvbnN0IG1pZCA9IGxvdyArICgoaGlnaCAtIGxvdykgPj4gMSk7XG4gICAgICAgIGlmIChrZXkobWlkKSA8PSB2YWx1ZSkge1xuICAgICAgICAgICAgbG93ID0gbWlkICsgMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhpZ2ggPSBtaWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxvdztcbn1cbmZ1bmN0aW9uIGluaXRfaHlkcmF0ZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0Lmh5ZHJhdGVfaW5pdClcbiAgICAgICAgcmV0dXJuO1xuICAgIHRhcmdldC5oeWRyYXRlX2luaXQgPSB0cnVlO1xuICAgIC8vIFdlIGtub3cgdGhhdCBhbGwgY2hpbGRyZW4gaGF2ZSBjbGFpbV9vcmRlciB2YWx1ZXMgc2luY2UgdGhlIHVuY2xhaW1lZCBoYXZlIGJlZW4gZGV0YWNoZWRcbiAgICBjb25zdCBjaGlsZHJlbiA9IHRhcmdldC5jaGlsZE5vZGVzO1xuICAgIC8qXG4gICAgKiBSZW9yZGVyIGNsYWltZWQgY2hpbGRyZW4gb3B0aW1hbGx5LlxuICAgICogV2UgY2FuIHJlb3JkZXIgY2xhaW1lZCBjaGlsZHJlbiBvcHRpbWFsbHkgYnkgZmluZGluZyB0aGUgbG9uZ2VzdCBzdWJzZXF1ZW5jZSBvZlxuICAgICogbm9kZXMgdGhhdCBhcmUgYWxyZWFkeSBjbGFpbWVkIGluIG9yZGVyIGFuZCBvbmx5IG1vdmluZyB0aGUgcmVzdC4gVGhlIGxvbmdlc3RcbiAgICAqIHN1YnNlcXVlbmNlIHN1YnNlcXVlbmNlIG9mIG5vZGVzIHRoYXQgYXJlIGNsYWltZWQgaW4gb3JkZXIgY2FuIGJlIGZvdW5kIGJ5XG4gICAgKiBjb21wdXRpbmcgdGhlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiAuY2xhaW1fb3JkZXIgdmFsdWVzLlxuICAgICpcbiAgICAqIFRoaXMgYWxnb3JpdGhtIGlzIG9wdGltYWwgaW4gZ2VuZXJhdGluZyB0aGUgbGVhc3QgYW1vdW50IG9mIHJlb3JkZXIgb3BlcmF0aW9uc1xuICAgICogcG9zc2libGUuXG4gICAgKlxuICAgICogUHJvb2Y6XG4gICAgKiBXZSBrbm93IHRoYXQsIGdpdmVuIGEgc2V0IG9mIHJlb3JkZXJpbmcgb3BlcmF0aW9ucywgdGhlIG5vZGVzIHRoYXQgZG8gbm90IG1vdmVcbiAgICAqIGFsd2F5cyBmb3JtIGFuIGluY3JlYXNpbmcgc3Vic2VxdWVuY2UsIHNpbmNlIHRoZXkgZG8gbm90IG1vdmUgYW1vbmcgZWFjaCBvdGhlclxuICAgICogbWVhbmluZyB0aGF0IHRoZXkgbXVzdCBiZSBhbHJlYWR5IG9yZGVyZWQgYW1vbmcgZWFjaCBvdGhlci4gVGh1cywgdGhlIG1heGltYWxcbiAgICAqIHNldCBvZiBub2RlcyB0aGF0IGRvIG5vdCBtb3ZlIGZvcm0gYSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UuXG4gICAgKi9cbiAgICAvLyBDb21wdXRlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZVxuICAgIC8vIG06IHN1YnNlcXVlbmNlIGxlbmd0aCBqID0+IGluZGV4IGsgb2Ygc21hbGxlc3QgdmFsdWUgdGhhdCBlbmRzIGFuIGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2YgbGVuZ3RoIGpcbiAgICBjb25zdCBtID0gbmV3IEludDMyQXJyYXkoY2hpbGRyZW4ubGVuZ3RoICsgMSk7XG4gICAgLy8gUHJlZGVjZXNzb3IgaW5kaWNlcyArIDFcbiAgICBjb25zdCBwID0gbmV3IEludDMyQXJyYXkoY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICBtWzBdID0gLTE7XG4gICAgbGV0IGxvbmdlc3QgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IGNoaWxkcmVuW2ldLmNsYWltX29yZGVyO1xuICAgICAgICAvLyBGaW5kIHRoZSBsYXJnZXN0IHN1YnNlcXVlbmNlIGxlbmd0aCBzdWNoIHRoYXQgaXQgZW5kcyBpbiBhIHZhbHVlIGxlc3MgdGhhbiBvdXIgY3VycmVudCB2YWx1ZVxuICAgICAgICAvLyB1cHBlcl9ib3VuZCByZXR1cm5zIGZpcnN0IGdyZWF0ZXIgdmFsdWUsIHNvIHdlIHN1YnRyYWN0IG9uZVxuICAgICAgICBjb25zdCBzZXFMZW4gPSB1cHBlcl9ib3VuZCgxLCBsb25nZXN0ICsgMSwgaWR4ID0+IGNoaWxkcmVuW21baWR4XV0uY2xhaW1fb3JkZXIsIGN1cnJlbnQpIC0gMTtcbiAgICAgICAgcFtpXSA9IG1bc2VxTGVuXSArIDE7XG4gICAgICAgIGNvbnN0IG5ld0xlbiA9IHNlcUxlbiArIDE7XG4gICAgICAgIC8vIFdlIGNhbiBndWFyYW50ZWUgdGhhdCBjdXJyZW50IGlzIHRoZSBzbWFsbGVzdCB2YWx1ZS4gT3RoZXJ3aXNlLCB3ZSB3b3VsZCBoYXZlIGdlbmVyYXRlZCBhIGxvbmdlciBzZXF1ZW5jZS5cbiAgICAgICAgbVtuZXdMZW5dID0gaTtcbiAgICAgICAgbG9uZ2VzdCA9IE1hdGgubWF4KG5ld0xlbiwgbG9uZ2VzdCk7XG4gICAgfVxuICAgIC8vIFRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2Ygbm9kZXMgKGluaXRpYWxseSByZXZlcnNlZClcbiAgICBjb25zdCBsaXMgPSBbXTtcbiAgICAvLyBUaGUgcmVzdCBvZiB0aGUgbm9kZXMsIG5vZGVzIHRoYXQgd2lsbCBiZSBtb3ZlZFxuICAgIGNvbnN0IHRvTW92ZSA9IFtdO1xuICAgIGxldCBsYXN0ID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGxldCBjdXIgPSBtW2xvbmdlc3RdICsgMTsgY3VyICE9IDA7IGN1ciA9IHBbY3VyIC0gMV0pIHtcbiAgICAgICAgbGlzLnB1c2goY2hpbGRyZW5bY3VyIC0gMV0pO1xuICAgICAgICBmb3IgKDsgbGFzdCA+PSBjdXI7IGxhc3QtLSkge1xuICAgICAgICAgICAgdG9Nb3ZlLnB1c2goY2hpbGRyZW5bbGFzdF0pO1xuICAgICAgICB9XG4gICAgICAgIGxhc3QtLTtcbiAgICB9XG4gICAgZm9yICg7IGxhc3QgPj0gMDsgbGFzdC0tKSB7XG4gICAgICAgIHRvTW92ZS5wdXNoKGNoaWxkcmVuW2xhc3RdKTtcbiAgICB9XG4gICAgbGlzLnJldmVyc2UoKTtcbiAgICAvLyBXZSBzb3J0IHRoZSBub2RlcyBiZWluZyBtb3ZlZCB0byBndWFyYW50ZWUgdGhhdCB0aGVpciBpbnNlcnRpb24gb3JkZXIgbWF0Y2hlcyB0aGUgY2xhaW0gb3JkZXJcbiAgICB0b01vdmUuc29ydCgoYSwgYikgPT4gYS5jbGFpbV9vcmRlciAtIGIuY2xhaW1fb3JkZXIpO1xuICAgIC8vIEZpbmFsbHksIHdlIG1vdmUgdGhlIG5vZGVzXG4gICAgZm9yIChsZXQgaSA9IDAsIGogPSAwOyBpIDwgdG9Nb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdoaWxlIChqIDwgbGlzLmxlbmd0aCAmJiB0b01vdmVbaV0uY2xhaW1fb3JkZXIgPj0gbGlzW2pdLmNsYWltX29yZGVyKSB7XG4gICAgICAgICAgICBqKys7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYW5jaG9yID0gaiA8IGxpcy5sZW5ndGggPyBsaXNbal0gOiBudWxsO1xuICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKHRvTW92ZVtpXSwgYW5jaG9yKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhcHBlbmQodGFyZ2V0LCBub2RlKSB7XG4gICAgaWYgKGlzX2h5ZHJhdGluZykge1xuICAgICAgICBpbml0X2h5ZHJhdGUodGFyZ2V0KTtcbiAgICAgICAgaWYgKCh0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCA9PT0gdW5kZWZpbmVkKSB8fCAoKHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkICE9PSBudWxsKSAmJiAodGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQucGFyZW50RWxlbWVudCAhPT0gdGFyZ2V0KSkpIHtcbiAgICAgICAgICAgIHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkID0gdGFyZ2V0LmZpcnN0Q2hpbGQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUgIT09IHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkKSB7XG4gICAgICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKG5vZGUsIHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkID0gbm9kZS5uZXh0U2libGluZztcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChub2RlLnBhcmVudE5vZGUgIT09IHRhcmdldCkge1xuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG4gICAgaWYgKGlzX2h5ZHJhdGluZyAmJiAhYW5jaG9yKSB7XG4gICAgICAgIGFwcGVuZCh0YXJnZXQsIG5vZGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChub2RlLnBhcmVudE5vZGUgIT09IHRhcmdldCB8fCAoYW5jaG9yICYmIG5vZGUubmV4dFNpYmxpbmcgIT09IGFuY2hvcikpIHtcbiAgICAgICAgdGFyZ2V0Lmluc2VydEJlZm9yZShub2RlLCBhbmNob3IgfHwgbnVsbCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcbiAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2VhY2goaXRlcmF0aW9ucywgZGV0YWNoaW5nKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChpdGVyYXRpb25zW2ldKVxuICAgICAgICAgICAgaXRlcmF0aW9uc1tpXS5kKGRldGFjaGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG59XG5mdW5jdGlvbiBlbGVtZW50X2lzKG5hbWUsIGlzKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSwgeyBpcyB9KTtcbn1cbmZ1bmN0aW9uIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMob2JqLCBleGNsdWRlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0ge307XG4gICAgZm9yIChjb25zdCBrIGluIG9iaikge1xuICAgICAgICBpZiAoaGFzX3Byb3Aob2JqLCBrKVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgJiYgZXhjbHVkZS5pbmRleE9mKGspID09PSAtMSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGFyZ2V0W2tdID0gb2JqW2tdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBzdmdfZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBuYW1lKTtcbn1cbmZ1bmN0aW9uIHRleHQoZGF0YSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkYXRhKTtcbn1cbmZ1bmN0aW9uIHNwYWNlKCkge1xuICAgIHJldHVybiB0ZXh0KCcgJyk7XG59XG5mdW5jdGlvbiBlbXB0eSgpIHtcbiAgICByZXR1cm4gdGV4dCgnJyk7XG59XG5mdW5jdGlvbiBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiAoKSA9PiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcHJldmVudF9kZWZhdWx0KGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gc3RvcF9wcm9wYWdhdGlvbihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBzZWxmKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMpXG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgZWxzZSBpZiAobm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKSAhPT0gdmFsdWUpXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0X2F0dHJpYnV0ZXMobm9kZSwgYXR0cmlidXRlcykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG5vZGUuX19wcm90b19fKTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzW2tleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfX3ZhbHVlJykge1xuICAgICAgICAgICAgbm9kZS52YWx1ZSA9IG5vZGVba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdG9yc1trZXldICYmIGRlc2NyaXB0b3JzW2tleV0uc2V0KSB7XG4gICAgICAgICAgICBub2RlW2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9zdmdfYXR0cmlidXRlcyhub2RlLCBhdHRyaWJ1dGVzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YShub2RlLCBwcm9wLCB2YWx1ZSkge1xuICAgIGlmIChwcm9wIGluIG5vZGUpIHtcbiAgICAgICAgbm9kZVtwcm9wXSA9IHR5cGVvZiBub2RlW3Byb3BdID09PSAnYm9vbGVhbicgJiYgdmFsdWUgPT09ICcnID8gdHJ1ZSA6IHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXR0cihub2RlLCBwcm9wLCB2YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24geGxpbmtfYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUoZ3JvdXAsIF9fdmFsdWUsIGNoZWNrZWQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3VwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChncm91cFtpXS5jaGVja2VkKVxuICAgICAgICAgICAgdmFsdWUuYWRkKGdyb3VwW2ldLl9fdmFsdWUpO1xuICAgIH1cbiAgICBpZiAoIWNoZWNrZWQpIHtcbiAgICAgICAgdmFsdWUuZGVsZXRlKF9fdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZSk7XG59XG5mdW5jdGlvbiB0b19udW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09ICcnID8gbnVsbCA6ICt2YWx1ZTtcbn1cbmZ1bmN0aW9uIHRpbWVfcmFuZ2VzX3RvX2FycmF5KHJhbmdlcykge1xuICAgIGNvbnN0IGFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYXJyYXkucHVzaCh7IHN0YXJ0OiByYW5nZXMuc3RhcnQoaSksIGVuZDogcmFuZ2VzLmVuZChpKSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xufVxuZnVuY3Rpb24gY2hpbGRyZW4oZWxlbWVudCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQuY2hpbGROb2Rlcyk7XG59XG5mdW5jdGlvbiBjbGFpbV9ub2RlKG5vZGVzLCBwcmVkaWNhdGUsIHByb2Nlc3NOb2RlLCBjcmVhdGVOb2RlLCBkb250VXBkYXRlTGFzdEluZGV4ID0gZmFsc2UpIHtcbiAgICAvLyBUcnkgdG8gZmluZCBub2RlcyBpbiBhbiBvcmRlciBzdWNoIHRoYXQgd2UgbGVuZ3RoZW4gdGhlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZVxuICAgIGlmIChub2Rlcy5jbGFpbV9pbmZvID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbm9kZXMuY2xhaW1faW5mbyA9IHsgbGFzdF9pbmRleDogMCwgdG90YWxfY2xhaW1lZDogMCB9O1xuICAgIH1cbiAgICBjb25zdCByZXN1bHROb2RlID0gKCgpID0+IHtcbiAgICAgICAgLy8gV2UgZmlyc3QgdHJ5IHRvIGZpbmQgYW4gZWxlbWVudCBhZnRlciB0aGUgcHJldmlvdXMgb25lXG4gICAgICAgIGZvciAobGV0IGkgPSBub2Rlcy5jbGFpbV9pbmZvLmxhc3RfaW5kZXg7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShub2RlKSkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NOb2RlKG5vZGUpO1xuICAgICAgICAgICAgICAgIG5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBpZiAoIWRvbnRVcGRhdGVMYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSB0cnkgdG8gZmluZCBvbmUgYmVmb3JlXG4gICAgICAgIC8vIFdlIGl0ZXJhdGUgaW4gcmV2ZXJzZSBzbyB0aGF0IHdlIGRvbid0IGdvIHRvbyBmYXIgYmFja1xuICAgICAgICBmb3IgKGxldCBpID0gbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4IC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzTm9kZShub2RlKTtcbiAgICAgICAgICAgICAgICBub2Rlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgaWYgKCFkb250VXBkYXRlTGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLmNsYWltX2luZm8ubGFzdF9pbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB3ZSBzcGxpY2VkIGJlZm9yZSB0aGUgbGFzdF9pbmRleCwgd2UgZGVjcmVhc2UgaXRcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4LS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIGNhbid0IGZpbmQgYW55IG1hdGNoaW5nIG5vZGUsIHdlIGNyZWF0ZSBhIG5ldyBvbmVcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU5vZGUoKTtcbiAgICB9KSgpO1xuICAgIHJlc3VsdE5vZGUuY2xhaW1fb3JkZXIgPSBub2Rlcy5jbGFpbV9pbmZvLnRvdGFsX2NsYWltZWQ7XG4gICAgbm9kZXMuY2xhaW1faW5mby50b3RhbF9jbGFpbWVkICs9IDE7XG4gICAgcmV0dXJuIHJlc3VsdE5vZGU7XG59XG5mdW5jdGlvbiBjbGFpbV9lbGVtZW50KG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzLCBzdmcpIHtcbiAgICByZXR1cm4gY2xhaW1fbm9kZShub2RlcywgKG5vZGUpID0+IG5vZGUubm9kZU5hbWUgPT09IG5hbWUsIChub2RlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5vZGUuYXR0cmlidXRlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlID0gbm9kZS5hdHRyaWJ1dGVzW2pdO1xuICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGVzW2F0dHJpYnV0ZS5uYW1lXSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZS5wdXNoKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZW1vdmUuZm9yRWFjaCh2ID0+IG5vZGUucmVtb3ZlQXR0cmlidXRlKHYpKTtcbiAgICB9LCAoKSA9PiBzdmcgPyBzdmdfZWxlbWVudChuYW1lKSA6IGVsZW1lbnQobmFtZSkpO1xufVxuZnVuY3Rpb24gY2xhaW1fdGV4dChub2RlcywgZGF0YSkge1xuICAgIHJldHVybiBjbGFpbV9ub2RlKG5vZGVzLCAobm9kZSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gMywgKG5vZGUpID0+IHtcbiAgICAgICAgbm9kZS5kYXRhID0gJycgKyBkYXRhO1xuICAgIH0sICgpID0+IHRleHQoZGF0YSksIHRydWUgLy8gVGV4dCBub2RlcyBzaG91bGQgbm90IHVwZGF0ZSBsYXN0IGluZGV4IHNpbmNlIGl0IGlzIGxpa2VseSBub3Qgd29ydGggaXQgdG8gZWxpbWluYXRlIGFuIGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2YgYWN0dWFsIGVsZW1lbnRzXG4gICAgKTtcbn1cbmZ1bmN0aW9uIGNsYWltX3NwYWNlKG5vZGVzKSB7XG4gICAgcmV0dXJuIGNsYWltX3RleHQobm9kZXMsICcgJyk7XG59XG5mdW5jdGlvbiBmaW5kX2NvbW1lbnQobm9kZXMsIHRleHQsIHN0YXJ0KSB7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgbm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gOCAvKiBjb21tZW50IG5vZGUgKi8gJiYgbm9kZS50ZXh0Q29udGVudC50cmltKCkgPT09IHRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2Rlcy5sZW5ndGg7XG59XG5mdW5jdGlvbiBjbGFpbV9odG1sX3RhZyhub2Rlcykge1xuICAgIC8vIGZpbmQgaHRtbCBvcGVuaW5nIHRhZ1xuICAgIGNvbnN0IHN0YXJ0X2luZGV4ID0gZmluZF9jb21tZW50KG5vZGVzLCAnSFRNTF9UQUdfU1RBUlQnLCAwKTtcbiAgICBjb25zdCBlbmRfaW5kZXggPSBmaW5kX2NvbW1lbnQobm9kZXMsICdIVE1MX1RBR19FTkQnLCBzdGFydF9pbmRleCk7XG4gICAgaWYgKHN0YXJ0X2luZGV4ID09PSBlbmRfaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBIdG1sVGFnKCk7XG4gICAgfVxuICAgIGNvbnN0IGh0bWxfdGFnX25vZGVzID0gbm9kZXMuc3BsaWNlKHN0YXJ0X2luZGV4LCBlbmRfaW5kZXggKyAxKTtcbiAgICBkZXRhY2goaHRtbF90YWdfbm9kZXNbMF0pO1xuICAgIGRldGFjaChodG1sX3RhZ19ub2Rlc1todG1sX3RhZ19ub2Rlcy5sZW5ndGggLSAxXSk7XG4gICAgcmV0dXJuIG5ldyBIdG1sVGFnKGh0bWxfdGFnX25vZGVzLnNsaWNlKDEsIGh0bWxfdGFnX25vZGVzLmxlbmd0aCAtIDEpKTtcbn1cbmZ1bmN0aW9uIHNldF9kYXRhKHRleHQsIGRhdGEpIHtcbiAgICBkYXRhID0gJycgKyBkYXRhO1xuICAgIGlmICh0ZXh0Lndob2xlVGV4dCAhPT0gZGF0YSlcbiAgICAgICAgdGV4dC5kYXRhID0gZGF0YTtcbn1cbmZ1bmN0aW9uIHNldF9pbnB1dF92YWx1ZShpbnB1dCwgdmFsdWUpIHtcbiAgICBpbnB1dC52YWx1ZSA9IHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xufVxuZnVuY3Rpb24gc2V0X2lucHV0X3R5cGUoaW5wdXQsIHR5cGUpIHtcbiAgICB0cnkge1xuICAgICAgICBpbnB1dC50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9zdHlsZShub2RlLCBrZXksIHZhbHVlLCBpbXBvcnRhbnQpIHtcbiAgICBub2RlLnN0eWxlLnNldFByb3BlcnR5KGtleSwgdmFsdWUsIGltcG9ydGFudCA/ICdpbXBvcnRhbnQnIDogJycpO1xufVxuZnVuY3Rpb24gc2VsZWN0X29wdGlvbihzZWxlY3QsIHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcbiAgICAgICAgaWYgKG9wdGlvbi5fX3ZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHNlbGVjdF9vcHRpb25zKHNlbGVjdCwgdmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB+dmFsdWUuaW5kZXhPZihvcHRpb24uX192YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2VsZWN0X3ZhbHVlKHNlbGVjdCkge1xuICAgIGNvbnN0IHNlbGVjdGVkX29wdGlvbiA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpIHx8IHNlbGVjdC5vcHRpb25zWzBdO1xuICAgIHJldHVybiBzZWxlY3RlZF9vcHRpb24gJiYgc2VsZWN0ZWRfb3B0aW9uLl9fdmFsdWU7XG59XG5mdW5jdGlvbiBzZWxlY3RfbXVsdGlwbGVfdmFsdWUoc2VsZWN0KSB7XG4gICAgcmV0dXJuIFtdLm1hcC5jYWxsKHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCc6Y2hlY2tlZCcpLCBvcHRpb24gPT4gb3B0aW9uLl9fdmFsdWUpO1xufVxuLy8gdW5mb3J0dW5hdGVseSB0aGlzIGNhbid0IGJlIGEgY29uc3RhbnQgYXMgdGhhdCB3b3VsZG4ndCBiZSB0cmVlLXNoYWtlYWJsZVxuLy8gc28gd2UgY2FjaGUgdGhlIHJlc3VsdCBpbnN0ZWFkXG5sZXQgY3Jvc3NvcmlnaW47XG5mdW5jdGlvbiBpc19jcm9zc29yaWdpbigpIHtcbiAgICBpZiAoY3Jvc3NvcmlnaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjcm9zc29yaWdpbiA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICB2b2lkIHdpbmRvdy5wYXJlbnQuZG9jdW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjcm9zc29yaWdpbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNyb3Nzb3JpZ2luO1xufVxuZnVuY3Rpb24gYWRkX3Jlc2l6ZV9saXN0ZW5lcihub2RlLCBmbikge1xuICAgIGNvbnN0IGNvbXB1dGVkX3N0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBpZiAoY29tcHV0ZWRfc3R5bGUucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIH1cbiAgICBjb25zdCBpZnJhbWUgPSBlbGVtZW50KCdpZnJhbWUnKTtcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBibG9jazsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7ICcgK1xuICAgICAgICAnb3ZlcmZsb3c6IGhpZGRlbjsgYm9yZGVyOiAwOyBvcGFjaXR5OiAwOyBwb2ludGVyLWV2ZW50czogbm9uZTsgei1pbmRleDogLTE7Jyk7XG4gICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIGlmcmFtZS50YWJJbmRleCA9IC0xO1xuICAgIGNvbnN0IGNyb3Nzb3JpZ2luID0gaXNfY3Jvc3NvcmlnaW4oKTtcbiAgICBsZXQgdW5zdWJzY3JpYmU7XG4gICAgaWYgKGNyb3Nzb3JpZ2luKSB7XG4gICAgICAgIGlmcmFtZS5zcmMgPSBcImRhdGE6dGV4dC9odG1sLDxzY3JpcHQ+b25yZXNpemU9ZnVuY3Rpb24oKXtwYXJlbnQucG9zdE1lc3NhZ2UoMCwnKicpfTwvc2NyaXB0PlwiO1xuICAgICAgICB1bnN1YnNjcmliZSA9IGxpc3Rlbih3aW5kb3csICdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBpZnJhbWUuY29udGVudFdpbmRvdylcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmcmFtZS5zcmMgPSAnYWJvdXQ6YmxhbmsnO1xuICAgICAgICBpZnJhbWUub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUgPSBsaXN0ZW4oaWZyYW1lLmNvbnRlbnRXaW5kb3csICdyZXNpemUnLCBmbik7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGFwcGVuZChub2RlLCBpZnJhbWUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChjcm9zc29yaWdpbikge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1bnN1YnNjcmliZSAmJiBpZnJhbWUuY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBkZXRhY2goaWZyYW1lKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdG9nZ2xlX2NsYXNzKGVsZW1lbnQsIG5hbWUsIHRvZ2dsZSkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0W3RvZ2dsZSA/ICdhZGQnIDogJ3JlbW92ZSddKG5hbWUpO1xufVxuZnVuY3Rpb24gY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCkge1xuICAgIGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UsIGRldGFpbCk7XG4gICAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBxdWVyeV9zZWxlY3Rvcl9hbGwoc2VsZWN0b3IsIHBhcmVudCA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xufVxuY2xhc3MgSHRtbFRhZyB7XG4gICAgY29uc3RydWN0b3IoY2xhaW1lZF9ub2Rlcykge1xuICAgICAgICB0aGlzLmUgPSB0aGlzLm4gPSBudWxsO1xuICAgICAgICB0aGlzLmwgPSBjbGFpbWVkX25vZGVzO1xuICAgIH1cbiAgICBtKGh0bWwsIHRhcmdldCwgYW5jaG9yID0gbnVsbCkge1xuICAgICAgICBpZiAoIXRoaXMuZSkge1xuICAgICAgICAgICAgdGhpcy5lID0gZWxlbWVudCh0YXJnZXQubm9kZU5hbWUpO1xuICAgICAgICAgICAgdGhpcy50ID0gdGFyZ2V0O1xuICAgICAgICAgICAgaWYgKHRoaXMubCkge1xuICAgICAgICAgICAgICAgIHRoaXMubiA9IHRoaXMubDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaChodG1sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmkoYW5jaG9yKTtcbiAgICB9XG4gICAgaChodG1sKSB7XG4gICAgICAgIHRoaXMuZS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICB0aGlzLm4gPSBBcnJheS5mcm9tKHRoaXMuZS5jaGlsZE5vZGVzKTtcbiAgICB9XG4gICAgaShhbmNob3IpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm4ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGluc2VydCh0aGlzLnQsIHRoaXMubltpXSwgYW5jaG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwKGh0bWwpIHtcbiAgICAgICAgdGhpcy5kKCk7XG4gICAgICAgIHRoaXMuaChodG1sKTtcbiAgICAgICAgdGhpcy5pKHRoaXMuYSk7XG4gICAgfVxuICAgIGQoKSB7XG4gICAgICAgIHRoaXMubi5mb3JFYWNoKGRldGFjaCk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXR0cmlidXRlX3RvX29iamVjdChhdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBhdHRyaWJ1dGUgb2YgYXR0cmlidXRlcykge1xuICAgICAgICByZXN1bHRbYXR0cmlidXRlLm5hbWVdID0gYXR0cmlidXRlLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZ2V0X2N1c3RvbV9lbGVtZW50c19zbG90cyhlbGVtZW50KSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgcmVzdWx0W25vZGUuc2xvdCB8fCAnZGVmYXVsdCddID0gdHJ1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5jb25zdCBhY3RpdmVfZG9jcyA9IG5ldyBTZXQoKTtcbmxldCBhY3RpdmUgPSAwO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Rhcmtza3lhcHAvc3RyaW5nLWhhc2gvYmxvYi9tYXN0ZXIvaW5kZXguanNcbmZ1bmN0aW9uIGhhc2goc3RyKSB7XG4gICAgbGV0IGhhc2ggPSA1MzgxO1xuICAgIGxldCBpID0gc3RyLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgXiBzdHIuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gaGFzaCA+Pj4gMDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9ydWxlKG5vZGUsIGEsIGIsIGR1cmF0aW9uLCBkZWxheSwgZWFzZSwgZm4sIHVpZCA9IDApIHtcbiAgICBjb25zdCBzdGVwID0gMTYuNjY2IC8gZHVyYXRpb247XG4gICAgbGV0IGtleWZyYW1lcyA9ICd7XFxuJztcbiAgICBmb3IgKGxldCBwID0gMDsgcCA8PSAxOyBwICs9IHN0ZXApIHtcbiAgICAgICAgY29uc3QgdCA9IGEgKyAoYiAtIGEpICogZWFzZShwKTtcbiAgICAgICAga2V5ZnJhbWVzICs9IHAgKiAxMDAgKyBgJXske2ZuKHQsIDEgLSB0KX19XFxuYDtcbiAgICB9XG4gICAgY29uc3QgcnVsZSA9IGtleWZyYW1lcyArIGAxMDAlIHske2ZuKGIsIDEgLSBiKX19XFxufWA7XG4gICAgY29uc3QgbmFtZSA9IGBfX3N2ZWx0ZV8ke2hhc2gocnVsZSl9XyR7dWlkfWA7XG4gICAgY29uc3QgZG9jID0gbm9kZS5vd25lckRvY3VtZW50O1xuICAgIGFjdGl2ZV9kb2NzLmFkZChkb2MpO1xuICAgIGNvbnN0IHN0eWxlc2hlZXQgPSBkb2MuX19zdmVsdGVfc3R5bGVzaGVldCB8fCAoZG9jLl9fc3ZlbHRlX3N0eWxlc2hlZXQgPSBkb2MuaGVhZC5hcHBlbmRDaGlsZChlbGVtZW50KCdzdHlsZScpKS5zaGVldCk7XG4gICAgY29uc3QgY3VycmVudF9ydWxlcyA9IGRvYy5fX3N2ZWx0ZV9ydWxlcyB8fCAoZG9jLl9fc3ZlbHRlX3J1bGVzID0ge30pO1xuICAgIGlmICghY3VycmVudF9ydWxlc1tuYW1lXSkge1xuICAgICAgICBjdXJyZW50X3J1bGVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgc3R5bGVzaGVldC5pbnNlcnRSdWxlKGBAa2V5ZnJhbWVzICR7bmFtZX0gJHtydWxlfWAsIHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICB9XG4gICAgY29uc3QgYW5pbWF0aW9uID0gbm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJyc7XG4gICAgbm9kZS5zdHlsZS5hbmltYXRpb24gPSBgJHthbmltYXRpb24gPyBgJHthbmltYXRpb259LCBgIDogJyd9JHtuYW1lfSAke2R1cmF0aW9ufW1zIGxpbmVhciAke2RlbGF5fW1zIDEgYm90aGA7XG4gICAgYWN0aXZlICs9IDE7XG4gICAgcmV0dXJuIG5hbWU7XG59XG5mdW5jdGlvbiBkZWxldGVfcnVsZShub2RlLCBuYW1lKSB7XG4gICAgY29uc3QgcHJldmlvdXMgPSAobm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJycpLnNwbGl0KCcsICcpO1xuICAgIGNvbnN0IG5leHQgPSBwcmV2aW91cy5maWx0ZXIobmFtZVxuICAgICAgICA/IGFuaW0gPT4gYW5pbS5pbmRleE9mKG5hbWUpIDwgMCAvLyByZW1vdmUgc3BlY2lmaWMgYW5pbWF0aW9uXG4gICAgICAgIDogYW5pbSA9PiBhbmltLmluZGV4T2YoJ19fc3ZlbHRlJykgPT09IC0xIC8vIHJlbW92ZSBhbGwgU3ZlbHRlIGFuaW1hdGlvbnNcbiAgICApO1xuICAgIGNvbnN0IGRlbGV0ZWQgPSBwcmV2aW91cy5sZW5ndGggLSBuZXh0Lmxlbmd0aDtcbiAgICBpZiAoZGVsZXRlZCkge1xuICAgICAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IG5leHQuam9pbignLCAnKTtcbiAgICAgICAgYWN0aXZlIC09IGRlbGV0ZWQ7XG4gICAgICAgIGlmICghYWN0aXZlKVxuICAgICAgICAgICAgY2xlYXJfcnVsZXMoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjbGVhcl9ydWxlcygpIHtcbiAgICByYWYoKCkgPT4ge1xuICAgICAgICBpZiAoYWN0aXZlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBhY3RpdmVfZG9jcy5mb3JFYWNoKGRvYyA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZXNoZWV0ID0gZG9jLl9fc3ZlbHRlX3N0eWxlc2hlZXQ7XG4gICAgICAgICAgICBsZXQgaSA9IHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSlcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0LmRlbGV0ZVJ1bGUoaSk7XG4gICAgICAgICAgICBkb2MuX19zdmVsdGVfcnVsZXMgPSB7fTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFjdGl2ZV9kb2NzLmNsZWFyKCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZV9hbmltYXRpb24obm9kZSwgZnJvbSwgZm4sIHBhcmFtcykge1xuICAgIGlmICghZnJvbSlcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgY29uc3QgdG8gPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChmcm9tLmxlZnQgPT09IHRvLmxlZnQgJiYgZnJvbS5yaWdodCA9PT0gdG8ucmlnaHQgJiYgZnJvbS50b3AgPT09IHRvLnRvcCAmJiBmcm9tLmJvdHRvbSA9PT0gdG8uYm90dG9tKVxuICAgICAgICByZXR1cm4gbm9vcDtcbiAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCBcbiAgICAvLyBAdHMtaWdub3JlIHRvZG86IHNob3VsZCB0aGlzIGJlIHNlcGFyYXRlZCBmcm9tIGRlc3RydWN0dXJpbmc/IE9yIHN0YXJ0L2VuZCBhZGRlZCB0byBwdWJsaWMgYXBpIGFuZCBkb2N1bWVudGF0aW9uP1xuICAgIHN0YXJ0OiBzdGFydF90aW1lID0gbm93KCkgKyBkZWxheSwgXG4gICAgLy8gQHRzLWlnbm9yZSB0b2RvOlxuICAgIGVuZCA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbiwgdGljayA9IG5vb3AsIGNzcyB9ID0gZm4obm9kZSwgeyBmcm9tLCB0byB9LCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcbiAgICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuICAgIGxldCBuYW1lO1xuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICBuYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMCwgMSwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIG5hbWUpO1xuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgaWYgKCFzdGFydGVkICYmIG5vdyA+PSBzdGFydF90aW1lKSB7XG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRlZCAmJiBub3cgPj0gZW5kKSB7XG4gICAgICAgICAgICB0aWNrKDEsIDApO1xuICAgICAgICAgICAgc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydGVkKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gbm93IC0gc3RhcnRfdGltZTtcbiAgICAgICAgICAgIGNvbnN0IHQgPSAwICsgMSAqIGVhc2luZyhwIC8gZHVyYXRpb24pO1xuICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgc3RhcnQoKTtcbiAgICB0aWNrKDAsIDEpO1xuICAgIHJldHVybiBzdG9wO1xufVxuZnVuY3Rpb24gZml4X3Bvc2l0aW9uKG5vZGUpIHtcbiAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgaWYgKHN0eWxlLnBvc2l0aW9uICE9PSAnYWJzb2x1dGUnICYmIHN0eWxlLnBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gc3R5bGU7XG4gICAgICAgIGNvbnN0IGEgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgbm9kZS5zdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICBub2RlLnN0eWxlLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgYWRkX3RyYW5zZm9ybShub2RlLCBhKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRfdHJhbnNmb3JtKG5vZGUsIGEpIHtcbiAgICBjb25zdCBiID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoYS5sZWZ0ICE9PSBiLmxlZnQgfHwgYS50b3AgIT09IGIudG9wKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtID09PSAnbm9uZScgPyAnJyA6IHN0eWxlLnRyYW5zZm9ybTtcbiAgICAgICAgbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgJHt0cmFuc2Zvcm19IHRyYW5zbGF0ZSgke2EubGVmdCAtIGIubGVmdH1weCwgJHthLnRvcCAtIGIudG9wfXB4KWA7XG4gICAgfVxufVxuXG5sZXQgY3VycmVudF9jb21wb25lbnQ7XG5mdW5jdGlvbiBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgY3VycmVudF9jb21wb25lbnQgPSBjb21wb25lbnQ7XG59XG5mdW5jdGlvbiBnZXRfY3VycmVudF9jb21wb25lbnQoKSB7XG4gICAgaWYgKCFjdXJyZW50X2NvbXBvbmVudClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiBjYWxsZWQgb3V0c2lkZSBjb21wb25lbnQgaW5pdGlhbGl6YXRpb24nKTtcbiAgICByZXR1cm4gY3VycmVudF9jb21wb25lbnQ7XG59XG5mdW5jdGlvbiBiZWZvcmVVcGRhdGUoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5iZWZvcmVfdXBkYXRlLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gb25Nb3VudChmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLm9uX21vdW50LnB1c2goZm4pO1xufVxuZnVuY3Rpb24gYWZ0ZXJVcGRhdGUoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5hZnRlcl91cGRhdGUucHVzaChmbik7XG59XG5mdW5jdGlvbiBvbkRlc3Ryb3koZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9kZXN0cm95LnB1c2goZm4pO1xufVxuZnVuY3Rpb24gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCkge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IGdldF9jdXJyZW50X2NvbXBvbmVudCgpO1xuICAgIHJldHVybiAodHlwZSwgZGV0YWlsKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IGNvbXBvbmVudC4kJC5jYWxsYmFja3NbdHlwZV07XG4gICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgIC8vIFRPRE8gYXJlIHRoZXJlIHNpdHVhdGlvbnMgd2hlcmUgZXZlbnRzIGNvdWxkIGJlIGRpc3BhdGNoZWRcbiAgICAgICAgICAgIC8vIGluIGEgc2VydmVyIChub24tRE9NKSBlbnZpcm9ubWVudD9cbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCk7XG4gICAgICAgICAgICBjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgICAgICAgICBmbi5jYWxsKGNvbXBvbmVudCwgZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gc2V0Q29udGV4dChrZXksIGNvbnRleHQpIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LnNldChrZXksIGNvbnRleHQpO1xufVxuZnVuY3Rpb24gZ2V0Q29udGV4dChrZXkpIHtcbiAgICByZXR1cm4gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dC5nZXQoa2V5KTtcbn1cbmZ1bmN0aW9uIGhhc0NvbnRleHQoa2V5KSB7XG4gICAgcmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuaGFzKGtleSk7XG59XG4vLyBUT0RPIGZpZ3VyZSBvdXQgaWYgd2Ugc3RpbGwgd2FudCB0byBzdXBwb3J0XG4vLyBzaG9ydGhhbmQgZXZlbnRzLCBvciBpZiB3ZSB3YW50IHRvIGltcGxlbWVudFxuLy8gYSByZWFsIGJ1YmJsaW5nIG1lY2hhbmlzbVxuZnVuY3Rpb24gYnViYmxlKGNvbXBvbmVudCwgZXZlbnQpIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW2V2ZW50LnR5cGVdO1xuICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKGZuID0+IGZuLmNhbGwodGhpcywgZXZlbnQpKTtcbiAgICB9XG59XG5cbmNvbnN0IGRpcnR5X2NvbXBvbmVudHMgPSBbXTtcbmNvbnN0IGludHJvcyA9IHsgZW5hYmxlZDogZmFsc2UgfTtcbmNvbnN0IGJpbmRpbmdfY2FsbGJhY2tzID0gW107XG5jb25zdCByZW5kZXJfY2FsbGJhY2tzID0gW107XG5jb25zdCBmbHVzaF9jYWxsYmFja3MgPSBbXTtcbmNvbnN0IHJlc29sdmVkX3Byb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbmxldCB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG5mdW5jdGlvbiBzY2hlZHVsZV91cGRhdGUoKSB7XG4gICAgaWYgKCF1cGRhdGVfc2NoZWR1bGVkKSB7XG4gICAgICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICByZXNvbHZlZF9wcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRpY2soKSB7XG4gICAgc2NoZWR1bGVfdXBkYXRlKCk7XG4gICAgcmV0dXJuIHJlc29sdmVkX3Byb21pc2U7XG59XG5mdW5jdGlvbiBhZGRfcmVuZGVyX2NhbGxiYWNrKGZuKSB7XG4gICAgcmVuZGVyX2NhbGxiYWNrcy5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGFkZF9mbHVzaF9jYWxsYmFjayhmbikge1xuICAgIGZsdXNoX2NhbGxiYWNrcy5wdXNoKGZuKTtcbn1cbmxldCBmbHVzaGluZyA9IGZhbHNlO1xuY29uc3Qgc2Vlbl9jYWxsYmFja3MgPSBuZXcgU2V0KCk7XG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgICBpZiAoZmx1c2hpbmcpXG4gICAgICAgIHJldHVybjtcbiAgICBmbHVzaGluZyA9IHRydWU7XG4gICAgZG8ge1xuICAgICAgICAvLyBmaXJzdCwgY2FsbCBiZWZvcmVVcGRhdGUgZnVuY3Rpb25zXG4gICAgICAgIC8vIGFuZCB1cGRhdGUgY29tcG9uZW50c1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpcnR5X2NvbXBvbmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGRpcnR5X2NvbXBvbmVudHNbaV07XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShjb21wb25lbnQuJCQpO1xuICAgICAgICB9XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChudWxsKTtcbiAgICAgICAgZGlydHlfY29tcG9uZW50cy5sZW5ndGggPSAwO1xuICAgICAgICB3aGlsZSAoYmluZGluZ19jYWxsYmFja3MubGVuZ3RoKVxuICAgICAgICAgICAgYmluZGluZ19jYWxsYmFja3MucG9wKCkoKTtcbiAgICAgICAgLy8gdGhlbiwgb25jZSBjb21wb25lbnRzIGFyZSB1cGRhdGVkLCBjYWxsXG4gICAgICAgIC8vIGFmdGVyVXBkYXRlIGZ1bmN0aW9ucy4gVGhpcyBtYXkgY2F1c2VcbiAgICAgICAgLy8gc3Vic2VxdWVudCB1cGRhdGVzLi4uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyX2NhbGxiYWNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSByZW5kZXJfY2FsbGJhY2tzW2ldO1xuICAgICAgICAgICAgaWYgKCFzZWVuX2NhbGxiYWNrcy5oYXMoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgLy8gLi4uc28gZ3VhcmQgYWdhaW5zdCBpbmZpbml0ZSBsb29wc1xuICAgICAgICAgICAgICAgIHNlZW5fY2FsbGJhY2tzLmFkZChjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gICAgfSB3aGlsZSAoZGlydHlfY29tcG9uZW50cy5sZW5ndGgpO1xuICAgIHdoaWxlIChmbHVzaF9jYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICAgIGZsdXNoX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgIH1cbiAgICB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgZmx1c2hpbmcgPSBmYWxzZTtcbiAgICBzZWVuX2NhbGxiYWNrcy5jbGVhcigpO1xufVxuZnVuY3Rpb24gdXBkYXRlKCQkKSB7XG4gICAgaWYgKCQkLmZyYWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICQkLnVwZGF0ZSgpO1xuICAgICAgICBydW5fYWxsKCQkLmJlZm9yZV91cGRhdGUpO1xuICAgICAgICBjb25zdCBkaXJ0eSA9ICQkLmRpcnR5O1xuICAgICAgICAkJC5kaXJ0eSA9IFstMV07XG4gICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LnAoJCQuY3R4LCBkaXJ0eSk7XG4gICAgICAgICQkLmFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xuICAgIH1cbn1cblxubGV0IHByb21pc2U7XG5mdW5jdGlvbiB3YWl0KCkge1xuICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2gobm9kZSwgZGlyZWN0aW9uLCBraW5kKSB7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGN1c3RvbV9ldmVudChgJHtkaXJlY3Rpb24gPyAnaW50cm8nIDogJ291dHJvJ30ke2tpbmR9YCkpO1xufVxuY29uc3Qgb3V0cm9pbmcgPSBuZXcgU2V0KCk7XG5sZXQgb3V0cm9zO1xuZnVuY3Rpb24gZ3JvdXBfb3V0cm9zKCkge1xuICAgIG91dHJvcyA9IHtcbiAgICAgICAgcjogMCxcbiAgICAgICAgYzogW10sXG4gICAgICAgIHA6IG91dHJvcyAvLyBwYXJlbnQgZ3JvdXBcbiAgICB9O1xufVxuZnVuY3Rpb24gY2hlY2tfb3V0cm9zKCkge1xuICAgIGlmICghb3V0cm9zLnIpIHtcbiAgICAgICAgcnVuX2FsbChvdXRyb3MuYyk7XG4gICAgfVxuICAgIG91dHJvcyA9IG91dHJvcy5wO1xufVxuZnVuY3Rpb24gdHJhbnNpdGlvbl9pbihibG9jaywgbG9jYWwpIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2suaSkge1xuICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICBibG9jay5pKGxvY2FsKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uX291dChibG9jaywgbG9jYWwsIGRldGFjaCwgY2FsbGJhY2spIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2subykge1xuICAgICAgICBpZiAob3V0cm9pbmcuaGFzKGJsb2NrKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgb3V0cm9pbmcuYWRkKGJsb2NrKTtcbiAgICAgICAgb3V0cm9zLmMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRldGFjaClcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suZCgxKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYmxvY2subyhsb2NhbCk7XG4gICAgfVxufVxuY29uc3QgbnVsbF90cmFuc2l0aW9uID0geyBkdXJhdGlvbjogMCB9O1xuZnVuY3Rpb24gY3JlYXRlX2luX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gZmFsc2U7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGxldCB0YXNrO1xuICAgIGxldCB1aWQgPSAwO1xuICAgIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ28oKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MsIHVpZCsrKTtcbiAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XG4gICAgICAgIGNvbnN0IGVuZF90aW1lID0gc3RhcnRfdGltZSArIGR1cmF0aW9uO1xuICAgICAgICBpZiAodGFzaylcbiAgICAgICAgICAgIHRhc2suYWJvcnQoKTtcbiAgICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgdHJ1ZSwgJ3N0YXJ0JykpO1xuICAgICAgICB0YXNrID0gbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAobm93ID49IGVuZF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHRydWUsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydCgpIHtcbiAgICAgICAgICAgIGlmIChzdGFydGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUpO1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbihnbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkYXRlKCkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBlbmQoKSB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlX291dF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMpIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IHRydWU7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGNvbnN0IGdyb3VwID0gb3V0cm9zO1xuICAgIGdyb3VwLnIgKz0gMTtcbiAgICBmdW5jdGlvbiBnbygpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMSwgMCwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5O1xuICAgICAgICBjb25zdCBlbmRfdGltZSA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbjtcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ3N0YXJ0JykpO1xuICAgICAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgZmFsc2UsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEtLWdyb3VwLnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgd2lsbCByZXN1bHQgaW4gYGVuZCgpYCBiZWluZyBjYWxsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzbyB3ZSBkb24ndCBuZWVkIHRvIGNsZWFuIHVwIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bl9hbGwoZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSAtIHQsIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgd2FpdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICBnbygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdvKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGVuZChyZXNldCkge1xuICAgICAgICAgICAgaWYgKHJlc2V0ICYmIGNvbmZpZy50aWNrKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLnRpY2soMSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfYmlkaXJlY3Rpb25hbF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMsIGludHJvKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHQgPSBpbnRybyA/IDAgOiAxO1xuICAgIGxldCBydW5uaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBhbmltYXRpb25fbmFtZSA9IG51bGw7XG4gICAgZnVuY3Rpb24gY2xlYXJfYW5pbWF0aW9uKCkge1xuICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQocHJvZ3JhbSwgZHVyYXRpb24pIHtcbiAgICAgICAgY29uc3QgZCA9IHByb2dyYW0uYiAtIHQ7XG4gICAgICAgIGR1cmF0aW9uICo9IE1hdGguYWJzKGQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYTogdCxcbiAgICAgICAgICAgIGI6IHByb2dyYW0uYixcbiAgICAgICAgICAgIGQsXG4gICAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgICAgIHN0YXJ0OiBwcm9ncmFtLnN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBwcm9ncmFtLnN0YXJ0ICsgZHVyYXRpb24sXG4gICAgICAgICAgICBncm91cDogcHJvZ3JhbS5ncm91cFxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBnbyhiKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGNvbnN0IHByb2dyYW0gPSB7XG4gICAgICAgICAgICBzdGFydDogbm93KCkgKyBkZWxheSxcbiAgICAgICAgICAgIGJcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFiKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgcHJvZ3JhbS5ncm91cCA9IG91dHJvcztcbiAgICAgICAgICAgIG91dHJvcy5yICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbSB8fCBwZW5kaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgIHBlbmRpbmdfcHJvZ3JhbSA9IHByb2dyYW07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiB0aGlzIGlzIGFuIGludHJvLCBhbmQgdGhlcmUncyBhIGRlbGF5LCB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAvLyBhbiBpbml0aWFsIHRpY2sgYW5kL29yIGFwcGx5IENTUyBhbmltYXRpb24gaW1tZWRpYXRlbHlcbiAgICAgICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIHQsIGIsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGIpXG4gICAgICAgICAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IGluaXQocHJvZ3JhbSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCBiLCAnc3RhcnQnKSk7XG4gICAgICAgICAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBlbmRpbmdfcHJvZ3JhbSAmJiBub3cgPiBwZW5kaW5nX3Byb2dyYW0uc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gaW5pdChwZW5kaW5nX3Byb2dyYW0sIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgcnVubmluZ19wcm9ncmFtLmIsICdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgdCwgcnVubmluZ19wcm9ncmFtLmIsIHJ1bm5pbmdfcHJvZ3JhbS5kdXJhdGlvbiwgMCwgZWFzaW5nLCBjb25maWcuY3NzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub3cgPj0gcnVubmluZ19wcm9ncmFtLmVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGljayh0ID0gcnVubmluZ19wcm9ncmFtLmIsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHJ1bm5pbmdfcHJvZ3JhbS5iLCAnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBlbmRpbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlJ3JlIGRvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtLmIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW50cm8g4oCUIHdlIGNhbiB0aWR5IHVwIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3V0cm8g4oCUIG5lZWRzIHRvIGJlIGNvb3JkaW5hdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghLS1ydW5uaW5nX3Byb2dyYW0uZ3JvdXAucilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bl9hbGwocnVubmluZ19wcm9ncmFtLmdyb3VwLmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobm93ID49IHJ1bm5pbmdfcHJvZ3JhbS5zdGFydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcCA9IG5vdyAtIHJ1bm5pbmdfcHJvZ3JhbS5zdGFydDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQgPSBydW5uaW5nX3Byb2dyYW0uYSArIHJ1bm5pbmdfcHJvZ3JhbS5kICogZWFzaW5nKHAgLyBydW5uaW5nX3Byb2dyYW0uZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKHJ1bm5pbmdfcHJvZ3JhbSB8fCBwZW5kaW5nX3Byb2dyYW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcnVuKGIpIHtcbiAgICAgICAgICAgIGlmIChpc19mdW5jdGlvbihjb25maWcpKSB7XG4gICAgICAgICAgICAgICAgd2FpdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xuICAgICAgICAgICAgICAgICAgICBnbyhiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvKGIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbmQoKSB7XG4gICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfcHJvbWlzZShwcm9taXNlLCBpbmZvKSB7XG4gICAgY29uc3QgdG9rZW4gPSBpbmZvLnRva2VuID0ge307XG4gICAgZnVuY3Rpb24gdXBkYXRlKHR5cGUsIGluZGV4LCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmIChpbmZvLnRva2VuICE9PSB0b2tlbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaW5mby5yZXNvbHZlZCA9IHZhbHVlO1xuICAgICAgICBsZXQgY2hpbGRfY3R4ID0gaW5mby5jdHg7XG4gICAgICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2hpbGRfY3R4ID0gY2hpbGRfY3R4LnNsaWNlKCk7XG4gICAgICAgICAgICBjaGlsZF9jdHhba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJsb2NrID0gdHlwZSAmJiAoaW5mby5jdXJyZW50ID0gdHlwZSkoY2hpbGRfY3R4KTtcbiAgICAgICAgbGV0IG5lZWRzX2ZsdXNoID0gZmFsc2U7XG4gICAgICAgIGlmIChpbmZvLmJsb2NrKSB7XG4gICAgICAgICAgICBpZiAoaW5mby5ibG9ja3MpIHtcbiAgICAgICAgICAgICAgICBpbmZvLmJsb2Nrcy5mb3JFYWNoKChibG9jaywgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gaW5kZXggJiYgYmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwX291dHJvcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbl9vdXQoYmxvY2ssIDEsIDEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5mby5ibG9ja3NbaV0gPT09IGJsb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzW2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrX291dHJvcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbmZvLmJsb2NrLmQoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBibG9jay5jKCk7XG4gICAgICAgICAgICB0cmFuc2l0aW9uX2luKGJsb2NrLCAxKTtcbiAgICAgICAgICAgIGJsb2NrLm0oaW5mby5tb3VudCgpLCBpbmZvLmFuY2hvcik7XG4gICAgICAgICAgICBuZWVkc19mbHVzaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaW5mby5ibG9jayA9IGJsb2NrO1xuICAgICAgICBpZiAoaW5mby5ibG9ja3MpXG4gICAgICAgICAgICBpbmZvLmJsb2Nrc1tpbmRleF0gPSBibG9jaztcbiAgICAgICAgaWYgKG5lZWRzX2ZsdXNoKSB7XG4gICAgICAgICAgICBmbHVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpc19wcm9taXNlKHByb21pc2UpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfY29tcG9uZW50ID0gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCk7XG4gICAgICAgIHByb21pc2UudGhlbih2YWx1ZSA9PiB7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY3VycmVudF9jb21wb25lbnQpO1xuICAgICAgICAgICAgdXBkYXRlKGluZm8udGhlbiwgMSwgaW5mby52YWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY3VycmVudF9jb21wb25lbnQpO1xuICAgICAgICAgICAgdXBkYXRlKGluZm8uY2F0Y2gsIDIsIGluZm8uZXJyb3IsIGVycm9yKTtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChudWxsKTtcbiAgICAgICAgICAgIGlmICghaW5mby5oYXNDYXRjaCkge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gaWYgd2UgcHJldmlvdXNseSBoYWQgYSB0aGVuL2NhdGNoIGJsb2NrLCBkZXN0cm95IGl0XG4gICAgICAgIGlmIChpbmZvLmN1cnJlbnQgIT09IGluZm8ucGVuZGluZykge1xuICAgICAgICAgICAgdXBkYXRlKGluZm8ucGVuZGluZywgMCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGluZm8uY3VycmVudCAhPT0gaW5mby50aGVuKSB7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby50aGVuLCAxLCBpbmZvLnZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGluZm8ucmVzb2x2ZWQgPSBwcm9taXNlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZV9hd2FpdF9ibG9ja19icmFuY2goaW5mbywgY3R4LCBkaXJ0eSkge1xuICAgIGNvbnN0IGNoaWxkX2N0eCA9IGN0eC5zbGljZSgpO1xuICAgIGNvbnN0IHsgcmVzb2x2ZWQgfSA9IGluZm87XG4gICAgaWYgKGluZm8uY3VycmVudCA9PT0gaW5mby50aGVuKSB7XG4gICAgICAgIGNoaWxkX2N0eFtpbmZvLnZhbHVlXSA9IHJlc29sdmVkO1xuICAgIH1cbiAgICBpZiAoaW5mby5jdXJyZW50ID09PSBpbmZvLmNhdGNoKSB7XG4gICAgICAgIGNoaWxkX2N0eFtpbmZvLmVycm9yXSA9IHJlc29sdmVkO1xuICAgIH1cbiAgICBpbmZvLmJsb2NrLnAoY2hpbGRfY3R4LCBkaXJ0eSk7XG59XG5cbmNvbnN0IGdsb2JhbHMgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IHdpbmRvd1xuICAgIDogdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gZ2xvYmFsVGhpc1xuICAgICAgICA6IGdsb2JhbCk7XG5cbmZ1bmN0aW9uIGRlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmQoMSk7XG4gICAgbG9va3VwLmRlbGV0ZShibG9jay5rZXkpO1xufVxuZnVuY3Rpb24gb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIHRyYW5zaXRpb25fb3V0KGJsb2NrLCAxLCAxLCAoKSA9PiB7XG4gICAgICAgIGxvb2t1cC5kZWxldGUoYmxvY2sua2V5KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZpeF9hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZigpO1xuICAgIGRlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCk7XG59XG5mdW5jdGlvbiBmaXhfYW5kX291dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5mKCk7XG4gICAgb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCk7XG59XG5mdW5jdGlvbiB1cGRhdGVfa2V5ZWRfZWFjaChvbGRfYmxvY2tzLCBkaXJ0eSwgZ2V0X2tleSwgZHluYW1pYywgY3R4LCBsaXN0LCBsb29rdXAsIG5vZGUsIGRlc3Ryb3ksIGNyZWF0ZV9lYWNoX2Jsb2NrLCBuZXh0LCBnZXRfY29udGV4dCkge1xuICAgIGxldCBvID0gb2xkX2Jsb2Nrcy5sZW5ndGg7XG4gICAgbGV0IG4gPSBsaXN0Lmxlbmd0aDtcbiAgICBsZXQgaSA9IG87XG4gICAgY29uc3Qgb2xkX2luZGV4ZXMgPSB7fTtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICBvbGRfaW5kZXhlc1tvbGRfYmxvY2tzW2ldLmtleV0gPSBpO1xuICAgIGNvbnN0IG5ld19ibG9ja3MgPSBbXTtcbiAgICBjb25zdCBuZXdfbG9va3VwID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGRlbHRhcyA9IG5ldyBNYXAoKTtcbiAgICBpID0gbjtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkX2N0eCA9IGdldF9jb250ZXh0KGN0eCwgbGlzdCwgaSk7XG4gICAgICAgIGNvbnN0IGtleSA9IGdldF9rZXkoY2hpbGRfY3R4KTtcbiAgICAgICAgbGV0IGJsb2NrID0gbG9va3VwLmdldChrZXkpO1xuICAgICAgICBpZiAoIWJsb2NrKSB7XG4gICAgICAgICAgICBibG9jayA9IGNyZWF0ZV9lYWNoX2Jsb2NrKGtleSwgY2hpbGRfY3R4KTtcbiAgICAgICAgICAgIGJsb2NrLmMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkeW5hbWljKSB7XG4gICAgICAgICAgICBibG9jay5wKGNoaWxkX2N0eCwgZGlydHkpO1xuICAgICAgICB9XG4gICAgICAgIG5ld19sb29rdXAuc2V0KGtleSwgbmV3X2Jsb2Nrc1tpXSA9IGJsb2NrKTtcbiAgICAgICAgaWYgKGtleSBpbiBvbGRfaW5kZXhlcylcbiAgICAgICAgICAgIGRlbHRhcy5zZXQoa2V5LCBNYXRoLmFicyhpIC0gb2xkX2luZGV4ZXNba2V5XSkpO1xuICAgIH1cbiAgICBjb25zdCB3aWxsX21vdmUgPSBuZXcgU2V0KCk7XG4gICAgY29uc3QgZGlkX21vdmUgPSBuZXcgU2V0KCk7XG4gICAgZnVuY3Rpb24gaW5zZXJ0KGJsb2NrKSB7XG4gICAgICAgIHRyYW5zaXRpb25faW4oYmxvY2ssIDEpO1xuICAgICAgICBibG9jay5tKG5vZGUsIG5leHQpO1xuICAgICAgICBsb29rdXAuc2V0KGJsb2NrLmtleSwgYmxvY2spO1xuICAgICAgICBuZXh0ID0gYmxvY2suZmlyc3Q7XG4gICAgICAgIG4tLTtcbiAgICB9XG4gICAgd2hpbGUgKG8gJiYgbikge1xuICAgICAgICBjb25zdCBuZXdfYmxvY2sgPSBuZXdfYmxvY2tzW24gLSAxXTtcbiAgICAgICAgY29uc3Qgb2xkX2Jsb2NrID0gb2xkX2Jsb2Nrc1tvIC0gMV07XG4gICAgICAgIGNvbnN0IG5ld19rZXkgPSBuZXdfYmxvY2sua2V5O1xuICAgICAgICBjb25zdCBvbGRfa2V5ID0gb2xkX2Jsb2NrLmtleTtcbiAgICAgICAgaWYgKG5ld19ibG9jayA9PT0gb2xkX2Jsb2NrKSB7XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICBuZXh0ID0gbmV3X2Jsb2NrLmZpcnN0O1xuICAgICAgICAgICAgby0tO1xuICAgICAgICAgICAgbi0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFuZXdfbG9va3VwLmhhcyhvbGRfa2V5KSkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIG9sZCBibG9ja1xuICAgICAgICAgICAgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWxvb2t1cC5oYXMobmV3X2tleSkgfHwgd2lsbF9tb3ZlLmhhcyhuZXdfa2V5KSkge1xuICAgICAgICAgICAgaW5zZXJ0KG5ld19ibG9jayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGlkX21vdmUuaGFzKG9sZF9rZXkpKSB7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVsdGFzLmdldChuZXdfa2V5KSA+IGRlbHRhcy5nZXQob2xkX2tleSkpIHtcbiAgICAgICAgICAgIGRpZF9tb3ZlLmFkZChuZXdfa2V5KTtcbiAgICAgICAgICAgIGluc2VydChuZXdfYmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgd2lsbF9tb3ZlLmFkZChvbGRfa2V5KTtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3aGlsZSAoby0tKSB7XG4gICAgICAgIGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3Nbb107XG4gICAgICAgIGlmICghbmV3X2xvb2t1cC5oYXMob2xkX2Jsb2NrLmtleSkpXG4gICAgICAgICAgICBkZXN0cm95KG9sZF9ibG9jaywgbG9va3VwKTtcbiAgICB9XG4gICAgd2hpbGUgKG4pXG4gICAgICAgIGluc2VydChuZXdfYmxvY2tzW24gLSAxXSk7XG4gICAgcmV0dXJuIG5ld19ibG9ja3M7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9lYWNoX2tleXMoY3R4LCBsaXN0LCBnZXRfY29udGV4dCwgZ2V0X2tleSkge1xuICAgIGNvbnN0IGtleXMgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGdldF9rZXkoZ2V0X2NvbnRleHQoY3R4LCBsaXN0LCBpKSk7XG4gICAgICAgIGlmIChrZXlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBoYXZlIGR1cGxpY2F0ZSBrZXlzIGluIGEga2V5ZWQgZWFjaCcpO1xuICAgICAgICB9XG4gICAgICAgIGtleXMuYWRkKGtleSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRfc3ByZWFkX3VwZGF0ZShsZXZlbHMsIHVwZGF0ZXMpIHtcbiAgICBjb25zdCB1cGRhdGUgPSB7fTtcbiAgICBjb25zdCB0b19udWxsX291dCA9IHt9O1xuICAgIGNvbnN0IGFjY291bnRlZF9mb3IgPSB7ICQkc2NvcGU6IDEgfTtcbiAgICBsZXQgaSA9IGxldmVscy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBjb25zdCBvID0gbGV2ZWxzW2ldO1xuICAgICAgICBjb25zdCBuID0gdXBkYXRlc1tpXTtcbiAgICAgICAgaWYgKG4pIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG8pIHtcbiAgICAgICAgICAgICAgICBpZiAoIShrZXkgaW4gbikpXG4gICAgICAgICAgICAgICAgICAgIHRvX251bGxfb3V0W2tleV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbikge1xuICAgICAgICAgICAgICAgIGlmICghYWNjb3VudGVkX2ZvcltrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVtrZXldID0gbltrZXldO1xuICAgICAgICAgICAgICAgICAgICBhY2NvdW50ZWRfZm9yW2tleV0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldmVsc1tpXSA9IG47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XG4gICAgICAgICAgICAgICAgYWNjb3VudGVkX2ZvcltrZXldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0b19udWxsX291dCkge1xuICAgICAgICBpZiAoIShrZXkgaW4gdXBkYXRlKSlcbiAgICAgICAgICAgIHVwZGF0ZVtrZXldID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gdXBkYXRlO1xufVxuZnVuY3Rpb24gZ2V0X3NwcmVhZF9vYmplY3Qoc3ByZWFkX3Byb3BzKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzcHJlYWRfcHJvcHMgPT09ICdvYmplY3QnICYmIHNwcmVhZF9wcm9wcyAhPT0gbnVsbCA/IHNwcmVhZF9wcm9wcyA6IHt9O1xufVxuXG4vLyBzb3VyY2U6IGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZGljZXMuaHRtbFxuY29uc3QgYm9vbGVhbl9hdHRyaWJ1dGVzID0gbmV3IFNldChbXG4gICAgJ2FsbG93ZnVsbHNjcmVlbicsXG4gICAgJ2FsbG93cGF5bWVudHJlcXVlc3QnLFxuICAgICdhc3luYycsXG4gICAgJ2F1dG9mb2N1cycsXG4gICAgJ2F1dG9wbGF5JyxcbiAgICAnY2hlY2tlZCcsXG4gICAgJ2NvbnRyb2xzJyxcbiAgICAnZGVmYXVsdCcsXG4gICAgJ2RlZmVyJyxcbiAgICAnZGlzYWJsZWQnLFxuICAgICdmb3Jtbm92YWxpZGF0ZScsXG4gICAgJ2hpZGRlbicsXG4gICAgJ2lzbWFwJyxcbiAgICAnbG9vcCcsXG4gICAgJ211bHRpcGxlJyxcbiAgICAnbXV0ZWQnLFxuICAgICdub21vZHVsZScsXG4gICAgJ25vdmFsaWRhdGUnLFxuICAgICdvcGVuJyxcbiAgICAncGxheXNpbmxpbmUnLFxuICAgICdyZWFkb25seScsXG4gICAgJ3JlcXVpcmVkJyxcbiAgICAncmV2ZXJzZWQnLFxuICAgICdzZWxlY3RlZCdcbl0pO1xuXG5jb25zdCBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlciA9IC9bXFxzJ1wiPi89XFx1e0ZERDB9LVxcdXtGREVGfVxcdXtGRkZFfVxcdXtGRkZGfVxcdXsxRkZGRX1cXHV7MUZGRkZ9XFx1ezJGRkZFfVxcdXsyRkZGRn1cXHV7M0ZGRkV9XFx1ezNGRkZGfVxcdXs0RkZGRX1cXHV7NEZGRkZ9XFx1ezVGRkZFfVxcdXs1RkZGRn1cXHV7NkZGRkV9XFx1ezZGRkZGfVxcdXs3RkZGRX1cXHV7N0ZGRkZ9XFx1ezhGRkZFfVxcdXs4RkZGRn1cXHV7OUZGRkV9XFx1ezlGRkZGfVxcdXtBRkZGRX1cXHV7QUZGRkZ9XFx1e0JGRkZFfVxcdXtCRkZGRn1cXHV7Q0ZGRkV9XFx1e0NGRkZGfVxcdXtERkZGRX1cXHV7REZGRkZ9XFx1e0VGRkZFfVxcdXtFRkZGRn1cXHV7RkZGRkV9XFx1e0ZGRkZGfVxcdXsxMEZGRkV9XFx1ezEwRkZGRn1dL3U7XG4vLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNhdHRyaWJ1dGVzLTJcbi8vIGh0dHBzOi8vaW5mcmEuc3BlYy53aGF0d2cub3JnLyNub25jaGFyYWN0ZXJcbmZ1bmN0aW9uIHNwcmVhZChhcmdzLCBjbGFzc2VzX3RvX2FkZCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCAuLi5hcmdzKTtcbiAgICBpZiAoY2xhc3Nlc190b19hZGQpIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMuY2xhc3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgYXR0cmlidXRlcy5jbGFzcyA9IGNsYXNzZXNfdG9fYWRkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXR0cmlidXRlcy5jbGFzcyArPSAnICcgKyBjbGFzc2VzX3RvX2FkZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3RyID0gJyc7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgaWYgKGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyLnRlc3QobmFtZSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKVxuICAgICAgICAgICAgc3RyICs9ICcgJyArIG5hbWU7XG4gICAgICAgIGVsc2UgaWYgKGJvb2xlYW5fYXR0cmlidXRlcy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKVxuICAgICAgICAgICAgICAgIHN0ciArPSAnICcgKyBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0ciArPSBgICR7bmFtZX09XCIke3ZhbHVlfVwiYDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdHI7XG59XG5jb25zdCBlc2NhcGVkID0ge1xuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiMzOTsnLFxuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7J1xufTtcbmZ1bmN0aW9uIGVzY2FwZShodG1sKSB7XG4gICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC9bXCInJjw+XS9nLCBtYXRjaCA9PiBlc2NhcGVkW21hdGNoXSk7XG59XG5mdW5jdGlvbiBlc2NhcGVfYXR0cmlidXRlX3ZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBlc2NhcGUodmFsdWUpIDogdmFsdWU7XG59XG5mdW5jdGlvbiBlc2NhcGVfb2JqZWN0KG9iaikge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICByZXN1bHRba2V5XSA9IGVzY2FwZV9hdHRyaWJ1dGVfdmFsdWUob2JqW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZWFjaChpdGVtcywgZm4pIHtcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBzdHIgKz0gZm4oaXRlbXNbaV0sIGkpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuY29uc3QgbWlzc2luZ19jb21wb25lbnQgPSB7XG4gICAgJCRyZW5kZXI6ICgpID0+ICcnXG59O1xuZnVuY3Rpb24gdmFsaWRhdGVfY29tcG9uZW50KGNvbXBvbmVudCwgbmFtZSkge1xuICAgIGlmICghY29tcG9uZW50IHx8ICFjb21wb25lbnQuJCRyZW5kZXIpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09ICdzdmVsdGU6Y29tcG9uZW50JylcbiAgICAgICAgICAgIG5hbWUgKz0gJyB0aGlzPXsuLi59JztcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGA8JHtuYW1lfT4gaXMgbm90IGEgdmFsaWQgU1NSIGNvbXBvbmVudC4gWW91IG1heSBuZWVkIHRvIHJldmlldyB5b3VyIGJ1aWxkIGNvbmZpZyB0byBlbnN1cmUgdGhhdCBkZXBlbmRlbmNpZXMgYXJlIGNvbXBpbGVkLCByYXRoZXIgdGhhbiBpbXBvcnRlZCBhcyBwcmUtY29tcGlsZWQgbW9kdWxlc2ApO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50O1xufVxuZnVuY3Rpb24gZGVidWcoZmlsZSwgbGluZSwgY29sdW1uLCB2YWx1ZXMpIHtcbiAgICBjb25zb2xlLmxvZyhge0BkZWJ1Z30gJHtmaWxlID8gZmlsZSArICcgJyA6ICcnfSgke2xpbmV9OiR7Y29sdW1ufSlgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2codmFsdWVzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgcmV0dXJuICcnO1xufVxubGV0IG9uX2Rlc3Ryb3k7XG5mdW5jdGlvbiBjcmVhdGVfc3NyX2NvbXBvbmVudChmbikge1xuICAgIGZ1bmN0aW9uICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cywgY29udGV4dCkge1xuICAgICAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgICAgIGNvbnN0ICQkID0ge1xuICAgICAgICAgICAgb25fZGVzdHJveSxcbiAgICAgICAgICAgIGNvbnRleHQ6IG5ldyBNYXAocGFyZW50X2NvbXBvbmVudCA/IHBhcmVudF9jb21wb25lbnQuJCQuY29udGV4dCA6IGNvbnRleHQgfHwgW10pLFxuICAgICAgICAgICAgLy8gdGhlc2Ugd2lsbCBiZSBpbW1lZGlhdGVseSBkaXNjYXJkZWRcbiAgICAgICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgICAgIGJlZm9yZV91cGRhdGU6IFtdLFxuICAgICAgICAgICAgYWZ0ZXJfdXBkYXRlOiBbXSxcbiAgICAgICAgICAgIGNhbGxiYWNrczogYmxhbmtfb2JqZWN0KClcbiAgICAgICAgfTtcbiAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHsgJCQgfSk7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBmbihyZXN1bHQsIHByb3BzLCBiaW5kaW5ncywgc2xvdHMpO1xuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQocGFyZW50X2NvbXBvbmVudCk7XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZW5kZXI6IChwcm9wcyA9IHt9LCB7ICQkc2xvdHMgPSB7fSwgY29udGV4dCA9IG5ldyBNYXAoKSB9ID0ge30pID0+IHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3kgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgdGl0bGU6ICcnLCBoZWFkOiAnJywgY3NzOiBuZXcgU2V0KCkgfTtcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCB7fSwgJCRzbG90cywgY29udGV4dCk7XG4gICAgICAgICAgICBydW5fYWxsKG9uX2Rlc3Ryb3kpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBodG1sLFxuICAgICAgICAgICAgICAgIGNzczoge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBBcnJheS5mcm9tKHJlc3VsdC5jc3MpLm1hcChjc3MgPT4gY3NzLmNvZGUpLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBtYXA6IG51bGwgLy8gVE9ET1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGVhZDogcmVzdWx0LnRpdGxlICsgcmVzdWx0LmhlYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgICQkcmVuZGVyXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGFkZF9hdHRyaWJ1dGUobmFtZSwgdmFsdWUsIGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAoYm9vbGVhbiAmJiAhdmFsdWUpKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgcmV0dXJuIGAgJHtuYW1lfSR7dmFsdWUgPT09IHRydWUgPyAnJyA6IGA9JHt0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gSlNPTi5zdHJpbmdpZnkoZXNjYXBlKHZhbHVlKSkgOiBgXCIke3ZhbHVlfVwiYH1gfWA7XG59XG5mdW5jdGlvbiBhZGRfY2xhc3NlcyhjbGFzc2VzKSB7XG4gICAgcmV0dXJuIGNsYXNzZXMgPyBgIGNsYXNzPVwiJHtjbGFzc2VzfVwiYCA6ICcnO1xufVxuXG5mdW5jdGlvbiBiaW5kKGNvbXBvbmVudCwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBpbmRleCA9IGNvbXBvbmVudC4kJC5wcm9wc1tuYW1lXTtcbiAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb21wb25lbnQuJCQuYm91bmRbaW5kZXhdID0gY2FsbGJhY2s7XG4gICAgICAgIGNhbGxiYWNrKGNvbXBvbmVudC4kJC5jdHhbaW5kZXhdKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVfY29tcG9uZW50KGJsb2NrKSB7XG4gICAgYmxvY2sgJiYgYmxvY2suYygpO1xufVxuZnVuY3Rpb24gY2xhaW1fY29tcG9uZW50KGJsb2NrLCBwYXJlbnRfbm9kZXMpIHtcbiAgICBibG9jayAmJiBibG9jay5sKHBhcmVudF9ub2Rlcyk7XG59XG5mdW5jdGlvbiBtb3VudF9jb21wb25lbnQoY29tcG9uZW50LCB0YXJnZXQsIGFuY2hvciwgY3VzdG9tRWxlbWVudCkge1xuICAgIGNvbnN0IHsgZnJhZ21lbnQsIG9uX21vdW50LCBvbl9kZXN0cm95LCBhZnRlcl91cGRhdGUgfSA9IGNvbXBvbmVudC4kJDtcbiAgICBmcmFnbWVudCAmJiBmcmFnbWVudC5tKHRhcmdldCwgYW5jaG9yKTtcbiAgICBpZiAoIWN1c3RvbUVsZW1lbnQpIHtcbiAgICAgICAgLy8gb25Nb3VudCBoYXBwZW5zIGJlZm9yZSB0aGUgaW5pdGlhbCBhZnRlclVwZGF0ZVxuICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld19vbl9kZXN0cm95ID0gb25fbW91bnQubWFwKHJ1bikuZmlsdGVyKGlzX2Z1bmN0aW9uKTtcbiAgICAgICAgICAgIGlmIChvbl9kZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgb25fZGVzdHJveS5wdXNoKC4uLm5ld19vbl9kZXN0cm95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEVkZ2UgY2FzZSAtIGNvbXBvbmVudCB3YXMgZGVzdHJveWVkIGltbWVkaWF0ZWx5LFxuICAgICAgICAgICAgICAgIC8vIG1vc3QgbGlrZWx5IGFzIGEgcmVzdWx0IG9mIGEgYmluZGluZyBpbml0aWFsaXNpbmdcbiAgICAgICAgICAgICAgICBydW5fYWxsKG5ld19vbl9kZXN0cm95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbXBvbmVudC4kJC5vbl9tb3VudCA9IFtdO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWZ0ZXJfdXBkYXRlLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2NvbXBvbmVudChjb21wb25lbnQsIGRldGFjaGluZykge1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkO1xuICAgIGlmICgkJC5mcmFnbWVudCAhPT0gbnVsbCkge1xuICAgICAgICBydW5fYWxsKCQkLm9uX2Rlc3Ryb3kpO1xuICAgICAgICAkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5kKGRldGFjaGluZyk7XG4gICAgICAgIC8vIFRPRE8gbnVsbCBvdXQgb3RoZXIgcmVmcywgaW5jbHVkaW5nIGNvbXBvbmVudC4kJCAoYnV0IG5lZWQgdG9cbiAgICAgICAgLy8gcHJlc2VydmUgZmluYWwgc3RhdGU/KVxuICAgICAgICAkJC5vbl9kZXN0cm95ID0gJCQuZnJhZ21lbnQgPSBudWxsO1xuICAgICAgICAkJC5jdHggPSBbXTtcbiAgICB9XG59XG5mdW5jdGlvbiBtYWtlX2RpcnR5KGNvbXBvbmVudCwgaSkge1xuICAgIGlmIChjb21wb25lbnQuJCQuZGlydHlbMF0gPT09IC0xKSB7XG4gICAgICAgIGRpcnR5X2NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICBzY2hlZHVsZV91cGRhdGUoKTtcbiAgICAgICAgY29tcG9uZW50LiQkLmRpcnR5LmZpbGwoMCk7XG4gICAgfVxuICAgIGNvbXBvbmVudC4kJC5kaXJ0eVsoaSAvIDMxKSB8IDBdIHw9ICgxIDw8IChpICUgMzEpKTtcbn1cbmZ1bmN0aW9uIGluaXQoY29tcG9uZW50LCBvcHRpb25zLCBpbnN0YW5jZSwgY3JlYXRlX2ZyYWdtZW50LCBub3RfZXF1YWwsIHByb3BzLCBkaXJ0eSA9IFstMV0pIHtcbiAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgY29uc3QgJCQgPSBjb21wb25lbnQuJCQgPSB7XG4gICAgICAgIGZyYWdtZW50OiBudWxsLFxuICAgICAgICBjdHg6IG51bGwsXG4gICAgICAgIC8vIHN0YXRlXG4gICAgICAgIHByb3BzLFxuICAgICAgICB1cGRhdGU6IG5vb3AsXG4gICAgICAgIG5vdF9lcXVhbCxcbiAgICAgICAgYm91bmQ6IGJsYW5rX29iamVjdCgpLFxuICAgICAgICAvLyBsaWZlY3ljbGVcbiAgICAgICAgb25fbW91bnQ6IFtdLFxuICAgICAgICBvbl9kZXN0cm95OiBbXSxcbiAgICAgICAgb25fZGlzY29ubmVjdDogW10sXG4gICAgICAgIGJlZm9yZV91cGRhdGU6IFtdLFxuICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxuICAgICAgICBjb250ZXh0OiBuZXcgTWFwKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBvcHRpb25zLmNvbnRleHQgfHwgW10pLFxuICAgICAgICAvLyBldmVyeXRoaW5nIGVsc2VcbiAgICAgICAgY2FsbGJhY2tzOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgZGlydHksXG4gICAgICAgIHNraXBfYm91bmQ6IGZhbHNlXG4gICAgfTtcbiAgICBsZXQgcmVhZHkgPSBmYWxzZTtcbiAgICAkJC5jdHggPSBpbnN0YW5jZVxuICAgICAgICA/IGluc3RhbmNlKGNvbXBvbmVudCwgb3B0aW9ucy5wcm9wcyB8fCB7fSwgKGksIHJldCwgLi4ucmVzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByZXN0Lmxlbmd0aCA/IHJlc3RbMF0gOiByZXQ7XG4gICAgICAgICAgICBpZiAoJCQuY3R4ICYmIG5vdF9lcXVhbCgkJC5jdHhbaV0sICQkLmN0eFtpXSA9IHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghJCQuc2tpcF9ib3VuZCAmJiAkJC5ib3VuZFtpXSlcbiAgICAgICAgICAgICAgICAgICAgJCQuYm91bmRbaV0odmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeSlcbiAgICAgICAgICAgICAgICAgICAgbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSlcbiAgICAgICAgOiBbXTtcbiAgICAkJC51cGRhdGUoKTtcbiAgICByZWFkeSA9IHRydWU7XG4gICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAvLyBgZmFsc2VgIGFzIGEgc3BlY2lhbCBjYXNlIG9mIG5vIERPTSBjb21wb25lbnRcbiAgICAkJC5mcmFnbWVudCA9IGNyZWF0ZV9mcmFnbWVudCA/IGNyZWF0ZV9mcmFnbWVudCgkJC5jdHgpIDogZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmh5ZHJhdGUpIHtcbiAgICAgICAgICAgIHN0YXJ0X2h5ZHJhdGluZygpO1xuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBjaGlsZHJlbihvcHRpb25zLnRhcmdldCk7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQubChub2Rlcyk7XG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKGRldGFjaCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQuYygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmludHJvKVxuICAgICAgICAgICAgdHJhbnNpdGlvbl9pbihjb21wb25lbnQuJCQuZnJhZ21lbnQpO1xuICAgICAgICBtb3VudF9jb21wb25lbnQoY29tcG9uZW50LCBvcHRpb25zLnRhcmdldCwgb3B0aW9ucy5hbmNob3IsIG9wdGlvbnMuY3VzdG9tRWxlbWVudCk7XG4gICAgICAgIGVuZF9oeWRyYXRpbmcoKTtcbiAgICAgICAgZmx1c2goKTtcbiAgICB9XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xufVxubGV0IFN2ZWx0ZUVsZW1lbnQ7XG5pZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgU3ZlbHRlRWxlbWVudCA9IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgb25fbW91bnQgfSA9IHRoaXMuJCQ7XG4gICAgICAgICAgICB0aGlzLiQkLm9uX2Rpc2Nvbm5lY3QgPSBvbl9tb3VudC5tYXAocnVuKS5maWx0ZXIoaXNfZnVuY3Rpb24pO1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBpbXByb3ZlIHR5cGluZ3NcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuJCQuc2xvdHRlZCkge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLiQkLnNsb3R0ZWRba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHIsIF9vbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXNbYXR0cl0gPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIHJ1bl9hbGwodGhpcy4kJC5vbl9kaXNjb25uZWN0KTtcbiAgICAgICAgfVxuICAgICAgICAkZGVzdHJveSgpIHtcbiAgICAgICAgICAgIGRlc3Ryb3lfY29tcG9uZW50KHRoaXMsIDEpO1xuICAgICAgICAgICAgdGhpcy4kZGVzdHJveSA9IG5vb3A7XG4gICAgICAgIH1cbiAgICAgICAgJG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAvLyBUT0RPIHNob3VsZCB0aGlzIGRlbGVnYXRlIHRvIGFkZEV2ZW50TGlzdGVuZXI/XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gfHwgKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdID0gW10pKTtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgICRzZXQoJCRwcm9wcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuJCRzZXQgJiYgIWlzX2VtcHR5KCQkcHJvcHMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kJC5za2lwX2JvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLiQkc2V0KCQkcHJvcHMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgU3ZlbHRlIGNvbXBvbmVudHMuIFVzZWQgd2hlbiBkZXY9ZmFsc2UuXG4gKi9cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudCB7XG4gICAgJGRlc3Ryb3koKSB7XG4gICAgICAgIGRlc3Ryb3lfY29tcG9uZW50KHRoaXMsIDEpO1xuICAgICAgICB0aGlzLiRkZXN0cm95ID0gbm9vcDtcbiAgICB9XG4gICAgJG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSB8fCAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gPSBbXSkpO1xuICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgICRzZXQoJCRwcm9wcykge1xuICAgICAgICBpZiAodGhpcy4kJHNldCAmJiAhaXNfZW1wdHkoJCRwcm9wcykpIHtcbiAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLiQkc2V0KCQkcHJvcHMpO1xuICAgICAgICAgICAgdGhpcy4kJC5za2lwX2JvdW5kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoX2Rldih0eXBlLCBkZXRhaWwpIHtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGN1c3RvbV9ldmVudCh0eXBlLCBPYmplY3QuYXNzaWduKHsgdmVyc2lvbjogJzMuMzguMycgfSwgZGV0YWlsKSkpO1xufVxuZnVuY3Rpb24gYXBwZW5kX2Rldih0YXJnZXQsIG5vZGUpIHtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTUluc2VydCcsIHsgdGFyZ2V0LCBub2RlIH0pO1xuICAgIGFwcGVuZCh0YXJnZXQsIG5vZGUpO1xufVxuZnVuY3Rpb24gaW5zZXJ0X2Rldih0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NSW5zZXJ0JywgeyB0YXJnZXQsIG5vZGUsIGFuY2hvciB9KTtcbiAgICBpbnNlcnQodGFyZ2V0LCBub2RlLCBhbmNob3IpO1xufVxuZnVuY3Rpb24gZGV0YWNoX2Rldihub2RlKSB7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01SZW1vdmUnLCB7IG5vZGUgfSk7XG4gICAgZGV0YWNoKG5vZGUpO1xufVxuZnVuY3Rpb24gZGV0YWNoX2JldHdlZW5fZGV2KGJlZm9yZSwgYWZ0ZXIpIHtcbiAgICB3aGlsZSAoYmVmb3JlLm5leHRTaWJsaW5nICYmIGJlZm9yZS5uZXh0U2libGluZyAhPT0gYWZ0ZXIpIHtcbiAgICAgICAgZGV0YWNoX2RldihiZWZvcmUubmV4dFNpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaF9iZWZvcmVfZGV2KGFmdGVyKSB7XG4gICAgd2hpbGUgKGFmdGVyLnByZXZpb3VzU2libGluZykge1xuICAgICAgICBkZXRhY2hfZGV2KGFmdGVyLnByZXZpb3VzU2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGV0YWNoX2FmdGVyX2RldihiZWZvcmUpIHtcbiAgICB3aGlsZSAoYmVmb3JlLm5leHRTaWJsaW5nKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYmVmb3JlLm5leHRTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBsaXN0ZW5fZGV2KG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zLCBoYXNfcHJldmVudF9kZWZhdWx0LCBoYXNfc3RvcF9wcm9wYWdhdGlvbikge1xuICAgIGNvbnN0IG1vZGlmaWVycyA9IG9wdGlvbnMgPT09IHRydWUgPyBbJ2NhcHR1cmUnXSA6IG9wdGlvbnMgPyBBcnJheS5mcm9tKE9iamVjdC5rZXlzKG9wdGlvbnMpKSA6IFtdO1xuICAgIGlmIChoYXNfcHJldmVudF9kZWZhdWx0KVxuICAgICAgICBtb2RpZmllcnMucHVzaCgncHJldmVudERlZmF1bHQnKTtcbiAgICBpZiAoaGFzX3N0b3BfcHJvcGFnYXRpb24pXG4gICAgICAgIG1vZGlmaWVycy5wdXNoKCdzdG9wUHJvcGFnYXRpb24nKTtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTUFkZEV2ZW50TGlzdGVuZXInLCB7IG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBtb2RpZmllcnMgfSk7XG4gICAgY29uc3QgZGlzcG9zZSA9IGxpc3Rlbihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01SZW1vdmVFdmVudExpc3RlbmVyJywgeyBub2RlLCBldmVudCwgaGFuZGxlciwgbW9kaWZpZXJzIH0pO1xuICAgICAgICBkaXNwb3NlKCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGF0dHJfZGV2KG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBhdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVJlbW92ZUF0dHJpYnV0ZScsIHsgbm9kZSwgYXR0cmlidXRlIH0pO1xuICAgIGVsc2VcbiAgICAgICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01TZXRBdHRyaWJ1dGUnLCB7IG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBwcm9wX2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBub2RlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NU2V0UHJvcGVydHknLCB7IG5vZGUsIHByb3BlcnR5LCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIGRhdGFzZXRfZGV2KG5vZGUsIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIG5vZGUuZGF0YXNldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVNldERhdGFzZXQnLCB7IG5vZGUsIHByb3BlcnR5LCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIHNldF9kYXRhX2Rldih0ZXh0LCBkYXRhKSB7XG4gICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICBpZiAodGV4dC53aG9sZVRleHQgPT09IGRhdGEpXG4gICAgICAgIHJldHVybjtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVNldERhdGEnLCB7IG5vZGU6IHRleHQsIGRhdGEgfSk7XG4gICAgdGV4dC5kYXRhID0gZGF0YTtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX2VhY2hfYXJndW1lbnQoYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdzdHJpbmcnICYmICEoYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIGFyZykpIHtcbiAgICAgICAgbGV0IG1zZyA9ICd7I2VhY2h9IG9ubHkgaXRlcmF0ZXMgb3ZlciBhcnJheS1saWtlIG9iamVjdHMuJztcbiAgICAgICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgYXJnICYmIFN5bWJvbC5pdGVyYXRvciBpbiBhcmcpIHtcbiAgICAgICAgICAgIG1zZyArPSAnIFlvdSBjYW4gdXNlIGEgc3ByZWFkIHRvIGNvbnZlcnQgdGhpcyBpdGVyYWJsZSBpbnRvIGFuIGFycmF5Lic7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gdmFsaWRhdGVfc2xvdHMobmFtZSwgc2xvdCwga2V5cykge1xuICAgIGZvciAoY29uc3Qgc2xvdF9rZXkgb2YgT2JqZWN0LmtleXMoc2xvdCkpIHtcbiAgICAgICAgaWYgKCF+a2V5cy5pbmRleE9mKHNsb3Rfa2V5KSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGA8JHtuYW1lfT4gcmVjZWl2ZWQgYW4gdW5leHBlY3RlZCBzbG90IFwiJHtzbG90X2tleX1cIi5gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgU3ZlbHRlIGNvbXBvbmVudHMgd2l0aCBzb21lIG1pbm9yIGRldi1lbmhhbmNlbWVudHMuIFVzZWQgd2hlbiBkZXY9dHJ1ZS5cbiAqL1xuY2xhc3MgU3ZlbHRlQ29tcG9uZW50RGV2IGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucyB8fCAoIW9wdGlvbnMudGFyZ2V0ICYmICFvcHRpb25zLiQkaW5saW5lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ3RhcmdldCcgaXMgYSByZXF1aXJlZCBvcHRpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG4gICAgJGRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLiRkZXN0cm95KCk7XG4gICAgICAgIHRoaXMuJGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NvbXBvbmVudCB3YXMgYWxyZWFkeSBkZXN0cm95ZWQnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIH07XG4gICAgfVxuICAgICRjYXB0dXJlX3N0YXRlKCkgeyB9XG4gICAgJGluamVjdF9zdGF0ZSgpIHsgfVxufVxuLyoqXG4gKiBCYXNlIGNsYXNzIHRvIGNyZWF0ZSBzdHJvbmdseSB0eXBlZCBTdmVsdGUgY29tcG9uZW50cy5cbiAqIFRoaXMgb25seSBleGlzdHMgZm9yIHR5cGluZyBwdXJwb3NlcyBhbmQgc2hvdWxkIGJlIHVzZWQgaW4gYC5kLnRzYCBmaWxlcy5cbiAqXG4gKiAjIyMgRXhhbXBsZTpcbiAqXG4gKiBZb3UgaGF2ZSBjb21wb25lbnQgbGlicmFyeSBvbiBucG0gY2FsbGVkIGBjb21wb25lbnQtbGlicmFyeWAsIGZyb20gd2hpY2hcbiAqIHlvdSBleHBvcnQgYSBjb21wb25lbnQgY2FsbGVkIGBNeUNvbXBvbmVudGAuIEZvciBTdmVsdGUrVHlwZVNjcmlwdCB1c2VycyxcbiAqIHlvdSB3YW50IHRvIHByb3ZpZGUgdHlwaW5ncy4gVGhlcmVmb3JlIHlvdSBjcmVhdGUgYSBgaW5kZXguZC50c2A6XG4gKiBgYGB0c1xuICogaW1wb3J0IHsgU3ZlbHRlQ29tcG9uZW50VHlwZWQgfSBmcm9tIFwic3ZlbHRlXCI7XG4gKiBleHBvcnQgY2xhc3MgTXlDb21wb25lbnQgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnRUeXBlZDx7Zm9vOiBzdHJpbmd9PiB7fVxuICogYGBgXG4gKiBUeXBpbmcgdGhpcyBtYWtlcyBpdCBwb3NzaWJsZSBmb3IgSURFcyBsaWtlIFZTIENvZGUgd2l0aCB0aGUgU3ZlbHRlIGV4dGVuc2lvblxuICogdG8gcHJvdmlkZSBpbnRlbGxpc2Vuc2UgYW5kIHRvIHVzZSB0aGUgY29tcG9uZW50IGxpa2UgdGhpcyBpbiBhIFN2ZWx0ZSBmaWxlXG4gKiB3aXRoIFR5cGVTY3JpcHQ6XG4gKiBgYGBzdmVsdGVcbiAqIDxzY3JpcHQgbGFuZz1cInRzXCI+XG4gKiBcdGltcG9ydCB7IE15Q29tcG9uZW50IH0gZnJvbSBcImNvbXBvbmVudC1saWJyYXJ5XCI7XG4gKiA8L3NjcmlwdD5cbiAqIDxNeUNvbXBvbmVudCBmb289eydiYXInfSAvPlxuICogYGBgXG4gKlxuICogIyMjIyBXaHkgbm90IG1ha2UgdGhpcyBwYXJ0IG9mIGBTdmVsdGVDb21wb25lbnQoRGV2KWA/XG4gKiBCZWNhdXNlXG4gKiBgYGB0c1xuICogY2xhc3MgQVN1YmNsYXNzT2ZTdmVsdGVDb21wb25lbnQgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnQ8e2Zvbzogc3RyaW5nfT4ge31cbiAqIGNvbnN0IGNvbXBvbmVudDogdHlwZW9mIFN2ZWx0ZUNvbXBvbmVudCA9IEFTdWJjbGFzc09mU3ZlbHRlQ29tcG9uZW50O1xuICogYGBgXG4gKiB3aWxsIHRocm93IGEgdHlwZSBlcnJvciwgc28gd2UgbmVlZCB0byBzZXBlcmF0ZSB0aGUgbW9yZSBzdHJpY3RseSB0eXBlZCBjbGFzcy5cbiAqL1xuY2xhc3MgU3ZlbHRlQ29tcG9uZW50VHlwZWQgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnREZXYge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxufVxuZnVuY3Rpb24gbG9vcF9ndWFyZCh0aW1lb3V0KSB7XG4gICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChEYXRlLm5vdygpIC0gc3RhcnQgPiB0aW1lb3V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luZmluaXRlIGxvb3AgZGV0ZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCB7IEh0bWxUYWcsIFN2ZWx0ZUNvbXBvbmVudCwgU3ZlbHRlQ29tcG9uZW50RGV2LCBTdmVsdGVDb21wb25lbnRUeXBlZCwgU3ZlbHRlRWxlbWVudCwgYWN0aW9uX2Rlc3Ryb3llciwgYWRkX2F0dHJpYnV0ZSwgYWRkX2NsYXNzZXMsIGFkZF9mbHVzaF9jYWxsYmFjaywgYWRkX2xvY2F0aW9uLCBhZGRfcmVuZGVyX2NhbGxiYWNrLCBhZGRfcmVzaXplX2xpc3RlbmVyLCBhZGRfdHJhbnNmb3JtLCBhZnRlclVwZGF0ZSwgYXBwZW5kLCBhcHBlbmRfZGV2LCBhc3NpZ24sIGF0dHIsIGF0dHJfZGV2LCBhdHRyaWJ1dGVfdG9fb2JqZWN0LCBiZWZvcmVVcGRhdGUsIGJpbmQsIGJpbmRpbmdfY2FsbGJhY2tzLCBibGFua19vYmplY3QsIGJ1YmJsZSwgY2hlY2tfb3V0cm9zLCBjaGlsZHJlbiwgY2xhaW1fY29tcG9uZW50LCBjbGFpbV9lbGVtZW50LCBjbGFpbV9odG1sX3RhZywgY2xhaW1fc3BhY2UsIGNsYWltX3RleHQsIGNsZWFyX2xvb3BzLCBjb21wb25lbnRfc3Vic2NyaWJlLCBjb21wdXRlX3Jlc3RfcHJvcHMsIGNvbXB1dGVfc2xvdHMsIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciwgY3JlYXRlX2FuaW1hdGlvbiwgY3JlYXRlX2JpZGlyZWN0aW9uYWxfdHJhbnNpdGlvbiwgY3JlYXRlX2NvbXBvbmVudCwgY3JlYXRlX2luX3RyYW5zaXRpb24sIGNyZWF0ZV9vdXRfdHJhbnNpdGlvbiwgY3JlYXRlX3Nsb3QsIGNyZWF0ZV9zc3JfY29tcG9uZW50LCBjdXJyZW50X2NvbXBvbmVudCwgY3VzdG9tX2V2ZW50LCBkYXRhc2V0X2RldiwgZGVidWcsIGRlc3Ryb3lfYmxvY2ssIGRlc3Ryb3lfY29tcG9uZW50LCBkZXN0cm95X2VhY2gsIGRldGFjaCwgZGV0YWNoX2FmdGVyX2RldiwgZGV0YWNoX2JlZm9yZV9kZXYsIGRldGFjaF9iZXR3ZWVuX2RldiwgZGV0YWNoX2RldiwgZGlydHlfY29tcG9uZW50cywgZGlzcGF0Y2hfZGV2LCBlYWNoLCBlbGVtZW50LCBlbGVtZW50X2lzLCBlbXB0eSwgZW5kX2h5ZHJhdGluZywgZXNjYXBlLCBlc2NhcGVfYXR0cmlidXRlX3ZhbHVlLCBlc2NhcGVfb2JqZWN0LCBlc2NhcGVkLCBleGNsdWRlX2ludGVybmFsX3Byb3BzLCBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2ssIGZpeF9hbmRfb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2ssIGZpeF9wb3NpdGlvbiwgZmx1c2gsIGdldENvbnRleHQsIGdldF9iaW5kaW5nX2dyb3VwX3ZhbHVlLCBnZXRfY3VycmVudF9jb21wb25lbnQsIGdldF9jdXN0b21fZWxlbWVudHNfc2xvdHMsIGdldF9zbG90X2NoYW5nZXMsIGdldF9zbG90X2NvbnRleHQsIGdldF9zcHJlYWRfb2JqZWN0LCBnZXRfc3ByZWFkX3VwZGF0ZSwgZ2V0X3N0b3JlX3ZhbHVlLCBnbG9iYWxzLCBncm91cF9vdXRyb3MsIGhhbmRsZV9wcm9taXNlLCBoYXNDb250ZXh0LCBoYXNfcHJvcCwgaWRlbnRpdHksIGluaXQsIGluc2VydCwgaW5zZXJ0X2RldiwgaW50cm9zLCBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlciwgaXNfY2xpZW50LCBpc19jcm9zc29yaWdpbiwgaXNfZW1wdHksIGlzX2Z1bmN0aW9uLCBpc19wcm9taXNlLCBsaXN0ZW4sIGxpc3Rlbl9kZXYsIGxvb3AsIGxvb3BfZ3VhcmQsIG1pc3NpbmdfY29tcG9uZW50LCBtb3VudF9jb21wb25lbnQsIG5vb3AsIG5vdF9lcXVhbCwgbm93LCBudWxsX3RvX2VtcHR5LCBvYmplY3Rfd2l0aG91dF9wcm9wZXJ0aWVzLCBvbkRlc3Ryb3ksIG9uTW91bnQsIG9uY2UsIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrLCBwcmV2ZW50X2RlZmF1bHQsIHByb3BfZGV2LCBxdWVyeV9zZWxlY3Rvcl9hbGwsIHJhZiwgcnVuLCBydW5fYWxsLCBzYWZlX25vdF9lcXVhbCwgc2NoZWR1bGVfdXBkYXRlLCBzZWxlY3RfbXVsdGlwbGVfdmFsdWUsIHNlbGVjdF9vcHRpb24sIHNlbGVjdF9vcHRpb25zLCBzZWxlY3RfdmFsdWUsIHNlbGYsIHNldENvbnRleHQsIHNldF9hdHRyaWJ1dGVzLCBzZXRfY3VycmVudF9jb21wb25lbnQsIHNldF9jdXN0b21fZWxlbWVudF9kYXRhLCBzZXRfZGF0YSwgc2V0X2RhdGFfZGV2LCBzZXRfaW5wdXRfdHlwZSwgc2V0X2lucHV0X3ZhbHVlLCBzZXRfbm93LCBzZXRfcmFmLCBzZXRfc3RvcmVfdmFsdWUsIHNldF9zdHlsZSwgc2V0X3N2Z19hdHRyaWJ1dGVzLCBzcGFjZSwgc3ByZWFkLCBzdGFydF9oeWRyYXRpbmcsIHN0b3BfcHJvcGFnYXRpb24sIHN1YnNjcmliZSwgc3ZnX2VsZW1lbnQsIHRleHQsIHRpY2ssIHRpbWVfcmFuZ2VzX3RvX2FycmF5LCB0b19udW1iZXIsIHRvZ2dsZV9jbGFzcywgdHJhbnNpdGlvbl9pbiwgdHJhbnNpdGlvbl9vdXQsIHVwZGF0ZV9hd2FpdF9ibG9ja19icmFuY2gsIHVwZGF0ZV9rZXllZF9lYWNoLCB1cGRhdGVfc2xvdCwgdXBkYXRlX3Nsb3Rfc3ByZWFkLCB2YWxpZGF0ZV9jb21wb25lbnQsIHZhbGlkYXRlX2VhY2hfYXJndW1lbnQsIHZhbGlkYXRlX2VhY2hfa2V5cywgdmFsaWRhdGVfc2xvdHMsIHZhbGlkYXRlX3N0b3JlLCB4bGlua19hdHRyIH07XG4iLCJpbXBvcnQgeyBub29wLCBzYWZlX25vdF9lcXVhbCwgc3Vic2NyaWJlLCBydW5fYWxsLCBpc19mdW5jdGlvbiB9IGZyb20gJy4uL2ludGVybmFsL2luZGV4Lm1qcyc7XG5leHBvcnQgeyBnZXRfc3RvcmVfdmFsdWUgYXMgZ2V0IH0gZnJvbSAnLi4vaW50ZXJuYWwvaW5kZXgubWpzJztcblxuY29uc3Qgc3Vic2NyaWJlcl9xdWV1ZSA9IFtdO1xuLyoqXG4gKiBDcmVhdGVzIGEgYFJlYWRhYmxlYCBzdG9yZSB0aGF0IGFsbG93cyByZWFkaW5nIGJ5IHN1YnNjcmlwdGlvbi5cbiAqIEBwYXJhbSB2YWx1ZSBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyfXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcbiAqL1xuZnVuY3Rpb24gcmVhZGFibGUodmFsdWUsIHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiB3cml0YWJsZSh2YWx1ZSwgc3RhcnQpLnN1YnNjcmliZVxuICAgIH07XG59XG4vKipcbiAqIENyZWF0ZSBhIGBXcml0YWJsZWAgc3RvcmUgdGhhdCBhbGxvd3MgYm90aCB1cGRhdGluZyBhbmQgcmVhZGluZyBieSBzdWJzY3JpcHRpb24uXG4gKiBAcGFyYW0geyo9fXZhbHVlIGluaXRpYWwgdmFsdWVcbiAqIEBwYXJhbSB7U3RhcnRTdG9wTm90aWZpZXI9fXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcbiAqL1xuZnVuY3Rpb24gd3JpdGFibGUodmFsdWUsIHN0YXJ0ID0gbm9vcCkge1xuICAgIGxldCBzdG9wO1xuICAgIGNvbnN0IHN1YnNjcmliZXJzID0gW107XG4gICAgZnVuY3Rpb24gc2V0KG5ld192YWx1ZSkge1xuICAgICAgICBpZiAoc2FmZV9ub3RfZXF1YWwodmFsdWUsIG5ld192YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbmV3X3ZhbHVlO1xuICAgICAgICAgICAgaWYgKHN0b3ApIHsgLy8gc3RvcmUgaXMgcmVhZHlcbiAgICAgICAgICAgICAgICBjb25zdCBydW5fcXVldWUgPSAhc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzID0gc3Vic2NyaWJlcnNbaV07XG4gICAgICAgICAgICAgICAgICAgIHNbMV0oKTtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcl9xdWV1ZS5wdXNoKHMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJ1bl9xdWV1ZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJfcXVldWUubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWVbaV1bMF0oc3Vic2NyaWJlcl9xdWV1ZVtpICsgMV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWUubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlKGZuKSB7XG4gICAgICAgIHNldChmbih2YWx1ZSkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUocnVuLCBpbnZhbGlkYXRlID0gbm9vcCkge1xuICAgICAgICBjb25zdCBzdWJzY3JpYmVyID0gW3J1biwgaW52YWxpZGF0ZV07XG4gICAgICAgIHN1YnNjcmliZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gICAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHN0b3AgPSBzdGFydChzZXQpIHx8IG5vb3A7XG4gICAgICAgIH1cbiAgICAgICAgcnVuKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3Vic2NyaWJlcnMuaW5kZXhPZihzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgICAgICAgICBzdG9wID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgc2V0LCB1cGRhdGUsIHN1YnNjcmliZSB9O1xufVxuZnVuY3Rpb24gZGVyaXZlZChzdG9yZXMsIGZuLCBpbml0aWFsX3ZhbHVlKSB7XG4gICAgY29uc3Qgc2luZ2xlID0gIUFycmF5LmlzQXJyYXkoc3RvcmVzKTtcbiAgICBjb25zdCBzdG9yZXNfYXJyYXkgPSBzaW5nbGVcbiAgICAgICAgPyBbc3RvcmVzXVxuICAgICAgICA6IHN0b3JlcztcbiAgICBjb25zdCBhdXRvID0gZm4ubGVuZ3RoIDwgMjtcbiAgICByZXR1cm4gcmVhZGFibGUoaW5pdGlhbF92YWx1ZSwgKHNldCkgPT4ge1xuICAgICAgICBsZXQgaW5pdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBsZXQgcGVuZGluZyA9IDA7XG4gICAgICAgIGxldCBjbGVhbnVwID0gbm9vcDtcbiAgICAgICAgY29uc3Qgc3luYyA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm4oc2luZ2xlID8gdmFsdWVzWzBdIDogdmFsdWVzLCBzZXQpO1xuICAgICAgICAgICAgaWYgKGF1dG8pIHtcbiAgICAgICAgICAgICAgICBzZXQocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsZWFudXAgPSBpc19mdW5jdGlvbihyZXN1bHQpID8gcmVzdWx0IDogbm9vcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdW5zdWJzY3JpYmVycyA9IHN0b3Jlc19hcnJheS5tYXAoKHN0b3JlLCBpKSA9PiBzdWJzY3JpYmUoc3RvcmUsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdmFsdWVzW2ldID0gdmFsdWU7XG4gICAgICAgICAgICBwZW5kaW5nICY9IH4oMSA8PCBpKTtcbiAgICAgICAgICAgIGlmIChpbml0ZWQpIHtcbiAgICAgICAgICAgICAgICBzeW5jKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHBlbmRpbmcgfD0gKDEgPDwgaSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgc3luYygpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgICAgIHJ1bl9hbGwodW5zdWJzY3JpYmVycyk7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7IGRlcml2ZWQsIHJlYWRhYmxlLCB3cml0YWJsZSB9O1xuIiwidmFyIF9fY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcbnZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19nZXRPd25Qcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBfX2dldFByb3RvT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgX19oYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfX21hcmtBc01vZHVsZSA9ICh0YXJnZXQpID0+IF9fZGVmUHJvcCh0YXJnZXQsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIF9fY29tbW9uSlMgPSAoY2IsIG1vZCkgPT4gZnVuY3Rpb24gX19yZXF1aXJlKCkge1xuICByZXR1cm4gbW9kIHx8ICgwLCBjYltPYmplY3Qua2V5cyhjYilbMF1dKSgobW9kID0geyBleHBvcnRzOiB7fSB9KS5leHBvcnRzLCBtb2QpLCBtb2QuZXhwb3J0cztcbn07XG52YXIgX19yZUV4cG9ydCA9ICh0YXJnZXQsIG1vZHVsZSwgZGVzYykgPT4ge1xuICBpZiAobW9kdWxlICYmIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG1vZHVsZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKG1vZHVsZSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRhcmdldCwga2V5KSAmJiBrZXkgIT09IFwiZGVmYXVsdFwiKVxuICAgICAgICBfX2RlZlByb3AodGFyZ2V0LCBrZXksIHsgZ2V0OiAoKSA9PiBtb2R1bGVba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhtb2R1bGUsIGtleSkpIHx8IGRlc2MuZW51bWVyYWJsZSB9KTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufTtcbnZhciBfX3RvTW9kdWxlID0gKG1vZHVsZSkgPT4ge1xuICByZXR1cm4gX19yZUV4cG9ydChfX21hcmtBc01vZHVsZShfX2RlZlByb3AobW9kdWxlICE9IG51bGwgPyBfX2NyZWF0ZShfX2dldFByb3RvT2YobW9kdWxlKSkgOiB7fSwgXCJkZWZhdWx0XCIsIG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSAmJiBcImRlZmF1bHRcIiBpbiBtb2R1bGUgPyB7IGdldDogKCkgPT4gbW9kdWxlLmRlZmF1bHQsIGVudW1lcmFibGU6IHRydWUgfSA6IHsgdmFsdWU6IG1vZHVsZSwgZW51bWVyYWJsZTogdHJ1ZSB9KSksIG1vZHVsZSk7XG59O1xuXG4vLyBub2RlX21vZHVsZXMvc3RyaWN0LXVyaS1lbmNvZGUvaW5kZXguanNcbnZhciByZXF1aXJlX3N0cmljdF91cmlfZW5jb2RlID0gX19jb21tb25KUyh7XG4gIFwibm9kZV9tb2R1bGVzL3N0cmljdC11cmktZW5jb2RlL2luZGV4LmpzXCIoZXhwb3J0cywgbW9kdWxlKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSAoc3RyKSA9PiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKSpdL2csICh4KSA9PiBgJSR7eC5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpfWApO1xuICB9XG59KTtcblxuLy8gbm9kZV9tb2R1bGVzL2RlY29kZS11cmktY29tcG9uZW50L2luZGV4LmpzXG52YXIgcmVxdWlyZV9kZWNvZGVfdXJpX2NvbXBvbmVudCA9IF9fY29tbW9uSlMoe1xuICBcIm5vZGVfbW9kdWxlcy9kZWNvZGUtdXJpLWNvbXBvbmVudC9pbmRleC5qc1wiKGV4cG9ydHMsIG1vZHVsZSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB0b2tlbiA9IFwiJVthLWYwLTldezJ9XCI7XG4gICAgdmFyIHNpbmdsZU1hdGNoZXIgPSBuZXcgUmVnRXhwKHRva2VuLCBcImdpXCIpO1xuICAgIHZhciBtdWx0aU1hdGNoZXIgPSBuZXcgUmVnRXhwKFwiKFwiICsgdG9rZW4gKyBcIikrXCIsIFwiZ2lcIik7XG4gICAgZnVuY3Rpb24gZGVjb2RlQ29tcG9uZW50cyhjb21wb25lbnRzLCBzcGxpdCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChjb21wb25lbnRzLmpvaW4oXCJcIikpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB9XG4gICAgICBpZiAoY29tcG9uZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHM7XG4gICAgICB9XG4gICAgICBzcGxpdCA9IHNwbGl0IHx8IDE7XG4gICAgICB2YXIgbGVmdCA9IGNvbXBvbmVudHMuc2xpY2UoMCwgc3BsaXQpO1xuICAgICAgdmFyIHJpZ2h0ID0gY29tcG9uZW50cy5zbGljZShzcGxpdCk7XG4gICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5jYWxsKFtdLCBkZWNvZGVDb21wb25lbnRzKGxlZnQpLCBkZWNvZGVDb21wb25lbnRzKHJpZ2h0KSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChpbnB1dCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdmFyIHRva2VucyA9IGlucHV0Lm1hdGNoKHNpbmdsZU1hdGNoZXIpO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlucHV0ID0gZGVjb2RlQ29tcG9uZW50cyh0b2tlbnMsIGkpLmpvaW4oXCJcIik7XG4gICAgICAgICAgdG9rZW5zID0gaW5wdXQubWF0Y2goc2luZ2xlTWF0Y2hlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBjdXN0b21EZWNvZGVVUklDb21wb25lbnQoaW5wdXQpIHtcbiAgICAgIHZhciByZXBsYWNlTWFwID0ge1xuICAgICAgICBcIiVGRSVGRlwiOiBcIlxcdUZGRkRcXHVGRkZEXCIsXG4gICAgICAgIFwiJUZGJUZFXCI6IFwiXFx1RkZGRFxcdUZGRkRcIlxuICAgICAgfTtcbiAgICAgIHZhciBtYXRjaCA9IG11bHRpTWF0Y2hlci5leGVjKGlucHV0KTtcbiAgICAgIHdoaWxlIChtYXRjaCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlcGxhY2VNYXBbbWF0Y2hbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzBdKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IGRlY29kZShtYXRjaFswXSk7XG4gICAgICAgICAgaWYgKHJlc3VsdCAhPT0gbWF0Y2hbMF0pIHtcbiAgICAgICAgICAgIHJlcGxhY2VNYXBbbWF0Y2hbMF1dID0gcmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtYXRjaCA9IG11bHRpTWF0Y2hlci5leGVjKGlucHV0KTtcbiAgICAgIH1cbiAgICAgIHJlcGxhY2VNYXBbXCIlQzJcIl0gPSBcIlxcdUZGRkRcIjtcbiAgICAgIHZhciBlbnRyaWVzID0gT2JqZWN0LmtleXMocmVwbGFjZU1hcCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGtleSA9IGVudHJpZXNbaV07XG4gICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZShuZXcgUmVnRXhwKGtleSwgXCJnXCIpLCByZXBsYWNlTWFwW2tleV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVuY29kZWRVUkkpIHtcbiAgICAgIGlmICh0eXBlb2YgZW5jb2RlZFVSSSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgYGVuY29kZWRVUklgIHRvIGJlIG9mIHR5cGUgYHN0cmluZ2AsIGdvdCBgXCIgKyB0eXBlb2YgZW5jb2RlZFVSSSArIFwiYFwiKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGVuY29kZWRVUkkgPSBlbmNvZGVkVVJJLnJlcGxhY2UoL1xcKy9nLCBcIiBcIik7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZFVSSSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIGN1c3RvbURlY29kZVVSSUNvbXBvbmVudChlbmNvZGVkVVJJKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KTtcblxuLy8gbm9kZV9tb2R1bGVzL3NwbGl0LW9uLWZpcnN0L2luZGV4LmpzXG52YXIgcmVxdWlyZV9zcGxpdF9vbl9maXJzdCA9IF9fY29tbW9uSlMoe1xuICBcIm5vZGVfbW9kdWxlcy9zcGxpdC1vbi1maXJzdC9pbmRleC5qc1wiKGV4cG9ydHMsIG1vZHVsZSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIG1vZHVsZS5leHBvcnRzID0gKHN0cmluZywgc2VwYXJhdG9yKSA9PiB7XG4gICAgICBpZiAoISh0eXBlb2Ygc3RyaW5nID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBzZXBhcmF0b3IgPT09IFwic3RyaW5nXCIpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCB0aGUgYXJndW1lbnRzIHRvIGJlIG9mIHR5cGUgYHN0cmluZ2BcIik7XG4gICAgICB9XG4gICAgICBpZiAoc2VwYXJhdG9yID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiBbc3RyaW5nXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNlcGFyYXRvckluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc2VwYXJhdG9yKTtcbiAgICAgIGlmIChzZXBhcmF0b3JJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIFtzdHJpbmddO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgc3RyaW5nLnNsaWNlKDAsIHNlcGFyYXRvckluZGV4KSxcbiAgICAgICAgc3RyaW5nLnNsaWNlKHNlcGFyYXRvckluZGV4ICsgc2VwYXJhdG9yLmxlbmd0aClcbiAgICAgIF07XG4gICAgfTtcbiAgfVxufSk7XG5cbi8vIG5vZGVfbW9kdWxlcy9xdWVyeS1zdHJpbmcvaW5kZXguanNcbnZhciByZXF1aXJlX3F1ZXJ5X3N0cmluZyA9IF9fY29tbW9uSlMoe1xuICBcIm5vZGVfbW9kdWxlcy9xdWVyeS1zdHJpbmcvaW5kZXguanNcIihleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHN0cmljdFVyaUVuY29kZSA9IHJlcXVpcmVfc3RyaWN0X3VyaV9lbmNvZGUoKTtcbiAgICB2YXIgZGVjb2RlQ29tcG9uZW50ID0gcmVxdWlyZV9kZWNvZGVfdXJpX2NvbXBvbmVudCgpO1xuICAgIHZhciBzcGxpdE9uRmlyc3QgPSByZXF1aXJlX3NwbGl0X29uX2ZpcnN0KCk7XG4gICAgZnVuY3Rpb24gZW5jb2RlckZvckFycmF5Rm9ybWF0KG9wdGlvbnMpIHtcbiAgICAgIHN3aXRjaCAob3B0aW9ucy5hcnJheUZvcm1hdCkge1xuICAgICAgICBjYXNlIFwiaW5kZXhcIjpcbiAgICAgICAgICByZXR1cm4gKGtleSkgPT4gKHJlc3VsdCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcmVzdWx0Lmxlbmd0aDtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFsuLi5yZXN1bHQsIFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgXCJbXCIsIGluZGV4LCBcIl1cIl0uam9pbihcIlwiKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAuLi5yZXN1bHQsXG4gICAgICAgICAgICAgIFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgXCJbXCIsIGVuY29kZShpbmRleCwgb3B0aW9ucyksIFwiXT1cIiwgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbihcIlwiKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICB9O1xuICAgICAgICBjYXNlIFwiYnJhY2tldFwiOlxuICAgICAgICAgIHJldHVybiAoa2V5KSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCBcIltdXCJdLmpvaW4oXCJcIildO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFsuLi5yZXN1bHQsIFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgXCJbXT1cIiwgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbihcIlwiKV07XG4gICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBcImNvbW1hXCI6XG4gICAgICAgICAgcmV0dXJuIChrZXkpID0+IChyZXN1bHQsIHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB2b2lkIDAgfHwgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFtbZW5jb2RlKGtleSwgb3B0aW9ucyksIFwiPVwiLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKFwiXCIpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbW3Jlc3VsdCwgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbihcIixcIildO1xuICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIChrZXkpID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBbLi4ucmVzdWx0LCBlbmNvZGUoa2V5LCBvcHRpb25zKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCBcIj1cIiwgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbihcIlwiKV07XG4gICAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VyRm9yQXJyYXlGb3JtYXQob3B0aW9ucykge1xuICAgICAgbGV0IHJlc3VsdDtcbiAgICAgIHN3aXRjaCAob3B0aW9ucy5hcnJheUZvcm1hdCkge1xuICAgICAgICBjYXNlIFwiaW5kZXhcIjpcbiAgICAgICAgICByZXR1cm4gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSA9PiB7XG4gICAgICAgICAgICByZXN1bHQgPSAvXFxbKFxcZCopXFxdJC8uZXhlYyhrZXkpO1xuICAgICAgICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1xcW1xcZCpcXF0kLywgXCJcIik7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICBhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhY2N1bXVsYXRvcltrZXldID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgYWNjdW11bGF0b3Jba2V5XSA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWNjdW11bGF0b3Jba2V5XVtyZXN1bHRbMV1dID0gdmFsdWU7XG4gICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBcImJyYWNrZXRcIjpcbiAgICAgICAgICByZXR1cm4gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSA9PiB7XG4gICAgICAgICAgICByZXN1bHQgPSAvKFxcW1xcXSkkLy5leGVjKGtleSk7XG4gICAgICAgICAgICBrZXkgPSBrZXkucmVwbGFjZSgvXFxbXFxdJC8sIFwiXCIpO1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgYWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSBbdmFsdWVdO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY2N1bXVsYXRvcltrZXldID0gW10uY29uY2F0KGFjY3VtdWxhdG9yW2tleV0sIHZhbHVlKTtcbiAgICAgICAgICB9O1xuICAgICAgICBjYXNlIFwiY29tbWFcIjpcbiAgICAgICAgICByZXR1cm4gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc0FycmF5ID0gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnNwbGl0KFwiXCIpLmluZGV4T2YoXCIsXCIpID4gLTE7XG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGlzQXJyYXkgPyB2YWx1ZS5zcGxpdChcIixcIikgOiB2YWx1ZTtcbiAgICAgICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcbiAgICAgICAgICAgIGlmIChhY2N1bXVsYXRvcltrZXldID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgYWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY2N1bXVsYXRvcltrZXldID0gW10uY29uY2F0KGFjY3VtdWxhdG9yW2tleV0sIHZhbHVlKTtcbiAgICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBlbmNvZGUodmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zLmVuY29kZSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5zdHJpY3QgPyBzdHJpY3RVcmlFbmNvZGUodmFsdWUpIDogZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZGVjb2RlKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucy5kZWNvZGUpIHtcbiAgICAgICAgcmV0dXJuIGRlY29kZUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGtleXNTb3J0ZXIoaW5wdXQpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGlucHV0KSkge1xuICAgICAgICByZXR1cm4gaW5wdXQuc29ydCgpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4ga2V5c1NvcnRlcihPYmplY3Qua2V5cyhpbnB1dCkpLnNvcnQoKGEsIGIpID0+IE51bWJlcihhKSAtIE51bWJlcihiKSkubWFwKChrZXkpID0+IGlucHV0W2tleV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVIYXNoKGlucHV0KSB7XG4gICAgICBjb25zdCBoYXNoU3RhcnQgPSBpbnB1dC5pbmRleE9mKFwiI1wiKTtcbiAgICAgIGlmIChoYXNoU3RhcnQgIT09IC0xKSB7XG4gICAgICAgIGlucHV0ID0gaW5wdXQuc2xpY2UoMCwgaGFzaFN0YXJ0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZXh0cmFjdChpbnB1dCkge1xuICAgICAgaW5wdXQgPSByZW1vdmVIYXNoKGlucHV0KTtcbiAgICAgIGNvbnN0IHF1ZXJ5U3RhcnQgPSBpbnB1dC5pbmRleE9mKFwiP1wiKTtcbiAgICAgIGlmIChxdWVyeVN0YXJ0ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dC5zbGljZShxdWVyeVN0YXJ0ICsgMSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlVmFsdWUodmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zLnBhcnNlTnVtYmVycyAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcih2YWx1ZSkpICYmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUudHJpbSgpICE9PSBcIlwiKSkge1xuICAgICAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMucGFyc2VCb29sZWFucyAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAodmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gXCJ0cnVlXCIgfHwgdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gXCJmYWxzZVwiKSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IFwidHJ1ZVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZTIoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgZGVjb2RlOiB0cnVlLFxuICAgICAgICBzb3J0OiB0cnVlLFxuICAgICAgICBhcnJheUZvcm1hdDogXCJub25lXCIsXG4gICAgICAgIHBhcnNlTnVtYmVyczogZmFsc2UsXG4gICAgICAgIHBhcnNlQm9vbGVhbnM6IGZhbHNlXG4gICAgICB9LCBvcHRpb25zKTtcbiAgICAgIGNvbnN0IGZvcm1hdHRlciA9IHBhcnNlckZvckFycmF5Rm9ybWF0KG9wdGlvbnMpO1xuICAgICAgY29uc3QgcmV0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIGlmICh0eXBlb2YgaW5wdXQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICAgIGlucHV0ID0gaW5wdXQudHJpbSgpLnJlcGxhY2UoL15bPyMmXS8sIFwiXCIpO1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBpbnB1dC5zcGxpdChcIiZcIikpIHtcbiAgICAgICAgbGV0IFtrZXksIHZhbHVlXSA9IHNwbGl0T25GaXJzdChwYXJhbS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpLCBcIj1cIik7XG4gICAgICAgIHZhbHVlID0gdmFsdWUgPT09IHZvaWQgMCA/IG51bGwgOiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICBmb3JtYXR0ZXIoZGVjb2RlKGtleSwgb3B0aW9ucyksIHZhbHVlLCByZXQpO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmV0KSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHJldFtrZXldO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWVba10gPSBwYXJzZVZhbHVlKHZhbHVlW2tdLCBvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0W2tleV0gPSBwYXJzZVZhbHVlKHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMuc29ydCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAob3B0aW9ucy5zb3J0ID09PSB0cnVlID8gT2JqZWN0LmtleXMocmV0KS5zb3J0KCkgOiBPYmplY3Qua2V5cyhyZXQpLnNvcnQob3B0aW9ucy5zb3J0KSkucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHJldFtrZXldO1xuICAgICAgICBpZiAoQm9vbGVhbih2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0ga2V5c1NvcnRlcih2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSwgT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gICAgfVxuICAgIGV4cG9ydHMuZXh0cmFjdCA9IGV4dHJhY3Q7XG4gICAgZXhwb3J0cy5wYXJzZSA9IHBhcnNlMjtcbiAgICBleHBvcnRzLnN0cmluZ2lmeSA9IChvYmplY3QsIG9wdGlvbnMpID0+IHtcbiAgICAgIGlmICghb2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfVxuICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBlbmNvZGU6IHRydWUsXG4gICAgICAgIHN0cmljdDogdHJ1ZSxcbiAgICAgICAgYXJyYXlGb3JtYXQ6IFwibm9uZVwiXG4gICAgICB9LCBvcHRpb25zKTtcbiAgICAgIGNvbnN0IGZvcm1hdHRlciA9IGVuY29kZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKTtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuICAgICAgaWYgKG9wdGlvbnMuc29ydCAhPT0gZmFsc2UpIHtcbiAgICAgICAga2V5cy5zb3J0KG9wdGlvbnMuc29ydCk7XG4gICAgICB9XG4gICAgICByZXR1cm4ga2V5cy5tYXAoKGtleSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9iamVjdFtrZXldO1xuICAgICAgICBpZiAodmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBlbmNvZGUoa2V5LCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUucmVkdWNlKGZvcm1hdHRlcihrZXkpLCBbXSkuam9pbihcIiZcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVuY29kZShrZXksIG9wdGlvbnMpICsgXCI9XCIgKyBlbmNvZGUodmFsdWUsIG9wdGlvbnMpO1xuICAgICAgfSkuZmlsdGVyKCh4KSA9PiB4Lmxlbmd0aCA+IDApLmpvaW4oXCImXCIpO1xuICAgIH07XG4gICAgZXhwb3J0cy5wYXJzZVVybCA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXJsOiByZW1vdmVIYXNoKGlucHV0KS5zcGxpdChcIj9cIilbMF0gfHwgXCJcIixcbiAgICAgICAgcXVlcnk6IHBhcnNlMihleHRyYWN0KGlucHV0KSwgb3B0aW9ucylcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufSk7XG5cbi8vIG5vZGVfbW9kdWxlcy9hYnN0cmFjdC1uZXN0ZWQtcm91dGVyL2Rpc3QvaW5kZXguanNcbnZhciByZXF1aXJlX2Rpc3QgPSBfX2NvbW1vbkpTKHtcbiAgXCJub2RlX21vZHVsZXMvYWJzdHJhY3QtbmVzdGVkLXJvdXRlci9kaXN0L2luZGV4LmpzXCIoZXhwb3J0cywgbW9kdWxlKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIGRlZmF1bHRFeHBvcnQgPSAvKiBAX19QVVJFX18gKi8gZnVuY3Rpb24oRXJyb3IyKSB7XG4gICAgICBmdW5jdGlvbiBkZWZhdWx0RXhwb3J0Mihyb3V0ZSwgcGF0aCkge1xuICAgICAgICB2YXIgbWVzc2FnZSA9IFwiVW5yZWFjaGFibGUgJ1wiICsgKHJvdXRlICE9PSBcIi9cIiA/IHJvdXRlLnJlcGxhY2UoL1xcLyQvLCBcIlwiKSA6IHJvdXRlKSArIFwiJywgc2VnbWVudCAnXCIgKyBwYXRoICsgXCInIGlzIG5vdCBkZWZpbmVkXCI7XG4gICAgICAgIEVycm9yMi5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLnJvdXRlID0gcm91dGU7XG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgICB9XG4gICAgICBpZiAoRXJyb3IyKVxuICAgICAgICBkZWZhdWx0RXhwb3J0Mi5fX3Byb3RvX18gPSBFcnJvcjI7XG4gICAgICBkZWZhdWx0RXhwb3J0Mi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yMiAmJiBFcnJvcjIucHJvdG90eXBlKTtcbiAgICAgIGRlZmF1bHRFeHBvcnQyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGRlZmF1bHRFeHBvcnQyO1xuICAgICAgcmV0dXJuIGRlZmF1bHRFeHBvcnQyO1xuICAgIH0oRXJyb3IpO1xuICAgIGZ1bmN0aW9uIGJ1aWxkTWF0Y2hlcihwYXRoLCBwYXJlbnQpIHtcbiAgICAgIHZhciByZWdleDtcbiAgICAgIHZhciBfaXNTcGxhdDtcbiAgICAgIHZhciBfcHJpb3JpdHkgPSAtMTAwO1xuICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgIHJlZ2V4ID0gcGF0aC5yZXBsYWNlKC9bLSQuXS9nLCBcIlxcXFwkJlwiKS5yZXBsYWNlKC9cXCgvZywgXCIoPzpcIikucmVwbGFjZSgvXFwpL2csIFwiKT9cIikucmVwbGFjZSgvKFs6Kl1cXHcrKSg/OjwoW148Pl0rPyk+KT8vZywgZnVuY3Rpb24oXywga2V5LCBleHByKSB7XG4gICAgICAgIGtleXMucHVzaChrZXkuc3Vic3RyKDEpKTtcbiAgICAgICAgaWYgKGtleS5jaGFyQXQoKSA9PT0gXCI6XCIpIHtcbiAgICAgICAgICBfcHJpb3JpdHkgKz0gMTAwO1xuICAgICAgICAgIHJldHVybiBcIigoPyEjKVwiICsgKGV4cHIgfHwgXCJbXiMvXSs/XCIpICsgXCIpXCI7XG4gICAgICAgIH1cbiAgICAgICAgX2lzU3BsYXQgPSB0cnVlO1xuICAgICAgICBfcHJpb3JpdHkgKz0gNTAwO1xuICAgICAgICByZXR1cm4gXCIoKD8hIylcIiArIChleHByIHx8IFwiW14jXSs/XCIpICsgXCIpXCI7XG4gICAgICB9KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIl5cIiArIHJlZ2V4ICsgXCIkXCIpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCByb3V0ZSBleHByZXNzaW9uLCBnaXZlbiAnXCIgKyBwYXJlbnQgKyBcIidcIik7XG4gICAgICB9XG4gICAgICB2YXIgX2hhc2hlZCA9IHBhdGguaW5jbHVkZXMoXCIjXCIpID8gMC41IDogMTtcbiAgICAgIHZhciBfZGVwdGggPSBwYXRoLmxlbmd0aCAqIF9wcmlvcml0eSAqIF9oYXNoZWQ7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXlzLFxuICAgICAgICByZWdleCxcbiAgICAgICAgX2RlcHRoLFxuICAgICAgICBfaXNTcGxhdFxuICAgICAgfTtcbiAgICB9XG4gICAgdmFyIFBhdGhNYXRjaGVyID0gZnVuY3Rpb24gUGF0aE1hdGNoZXIyKHBhdGgsIHBhcmVudCkge1xuICAgICAgdmFyIHJlZiA9IGJ1aWxkTWF0Y2hlcihwYXRoLCBwYXJlbnQpO1xuICAgICAgdmFyIGtleXMgPSByZWYua2V5cztcbiAgICAgIHZhciByZWdleCA9IHJlZi5yZWdleDtcbiAgICAgIHZhciBfZGVwdGggPSByZWYuX2RlcHRoO1xuICAgICAgdmFyIF9pc1NwbGF0ID0gcmVmLl9pc1NwbGF0O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgX2lzU3BsYXQsXG4gICAgICAgIF9kZXB0aCxcbiAgICAgICAgbWF0Y2g6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgdmFyIG1hdGNoZXMgPSB2YWx1ZS5tYXRjaChyZWdleCk7XG4gICAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXlzLnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXIsIGkpIHtcbiAgICAgICAgICAgICAgcHJldltjdXJdID0gdHlwZW9mIG1hdGNoZXNbaSArIDFdID09PSBcInN0cmluZ1wiID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoZXNbaSArIDFdKSA6IG51bGw7XG4gICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfSwge30pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICAgIFBhdGhNYXRjaGVyLnB1c2ggPSBmdW5jdGlvbiBwdXNoKGtleSwgcHJldiwgbGVhZiwgcGFyZW50KSB7XG4gICAgICB2YXIgcm9vdCA9IHByZXZba2V5XSB8fCAocHJldltrZXldID0ge30pO1xuICAgICAgaWYgKCFyb290LnBhdHRlcm4pIHtcbiAgICAgICAgcm9vdC5wYXR0ZXJuID0gbmV3IFBhdGhNYXRjaGVyKGtleSwgcGFyZW50KTtcbiAgICAgICAgcm9vdC5yb3V0ZSA9IChsZWFmIHx8IFwiXCIpLnJlcGxhY2UoL1xcLyQvLCBcIlwiKSB8fCBcIi9cIjtcbiAgICAgIH1cbiAgICAgIHByZXYua2V5cyA9IHByZXYua2V5cyB8fCBbXTtcbiAgICAgIGlmICghcHJldi5rZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgcHJldi5rZXlzLnB1c2goa2V5KTtcbiAgICAgICAgUGF0aE1hdGNoZXIuc29ydChwcmV2KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByb290O1xuICAgIH07XG4gICAgUGF0aE1hdGNoZXIuc29ydCA9IGZ1bmN0aW9uIHNvcnQocm9vdCkge1xuICAgICAgcm9vdC5rZXlzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gcm9vdFthXS5wYXR0ZXJuLl9kZXB0aCAtIHJvb3RbYl0ucGF0dGVybi5fZGVwdGg7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIG1lcmdlKHBhdGgsIHBhcmVudCkge1xuICAgICAgcmV0dXJuIFwiXCIgKyAocGFyZW50ICYmIHBhcmVudCAhPT0gXCIvXCIgPyBwYXJlbnQgOiBcIlwiKSArIChwYXRoIHx8IFwiXCIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB3YWxrKHBhdGgsIGNiKSB7XG4gICAgICB2YXIgbWF0Y2hlcyA9IHBhdGgubWF0Y2goLzxbXjw+XSpcXC9bXjw+XSo+Lyk7XG4gICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUmVnRXhwIGNhbm5vdCBjb250YWluIHNsYXNoZXMsIGdpdmVuICdcIiArIG1hdGNoZXMgKyBcIidcIik7XG4gICAgICB9XG4gICAgICB2YXIgcGFydHMgPSBwYXRoLnNwbGl0KC8oPz1cXC98IykvKTtcbiAgICAgIHZhciByb290ID0gW107XG4gICAgICBpZiAocGFydHNbMF0gIT09IFwiL1wiKSB7XG4gICAgICAgIHBhcnRzLnVuc2hpZnQoXCIvXCIpO1xuICAgICAgfVxuICAgICAgcGFydHMuc29tZShmdW5jdGlvbih4LCBpKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSByb290LnNsaWNlKDEpLmNvbmNhdCh4KS5qb2luKFwiXCIpIHx8IG51bGw7XG4gICAgICAgIHZhciBzZWdtZW50ID0gcGFydHMuc2xpY2UoaSArIDEpLmpvaW4oXCJcIikgfHwgbnVsbDtcbiAgICAgICAgdmFyIHJldHZhbCA9IGNiKHgsIHBhcmVudCwgc2VnbWVudCA/IFwiXCIgKyAoeCAhPT0gXCIvXCIgPyB4IDogXCJcIikgKyBzZWdtZW50IDogbnVsbCk7XG4gICAgICAgIHJvb3QucHVzaCh4KTtcbiAgICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWR1Y2Uoa2V5LCByb290LCBfc2Vlbikge1xuICAgICAgdmFyIHBhcmFtcyA9IHt9O1xuICAgICAgdmFyIG91dCA9IFtdO1xuICAgICAgdmFyIHNwbGF0O1xuICAgICAgd2FsayhrZXksIGZ1bmN0aW9uKHgsIGxlYWYsIGV4dHJhKSB7XG4gICAgICAgIHZhciBmb3VuZDtcbiAgICAgICAgaWYgKCFyb290LmtleXMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgZGVmYXVsdEV4cG9ydChrZXksIHgpO1xuICAgICAgICB9XG4gICAgICAgIHJvb3Qua2V5cy5zb21lKGZ1bmN0aW9uKGspIHtcbiAgICAgICAgICBpZiAoX3NlZW4uaW5jbHVkZXMoaykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHJlZiA9IHJvb3Rba10ucGF0dGVybjtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSByZWYubWF0Y2g7XG4gICAgICAgICAgdmFyIF9pc1NwbGF0ID0gcmVmLl9pc1NwbGF0O1xuICAgICAgICAgIHZhciBtYXRjaGVzID0gbWF0Y2goX2lzU3BsYXQgPyBleHRyYSB8fCB4IDogeCk7XG4gICAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocGFyYW1zLCBtYXRjaGVzKTtcbiAgICAgICAgICAgIGlmIChyb290W2tdLnJvdXRlKSB7XG4gICAgICAgICAgICAgIHZhciByb3V0ZUluZm8gPSBPYmplY3QuYXNzaWduKHt9LCByb290W2tdLmluZm8pO1xuICAgICAgICAgICAgICB2YXIgaGFzTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgaWYgKHJvdXRlSW5mby5leGFjdCkge1xuICAgICAgICAgICAgICAgIGhhc01hdGNoID0gZXh0cmEgPT09IG51bGw7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFzTWF0Y2ggPSAhKHggJiYgbGVhZiA9PT0gbnVsbCkgfHwgeCA9PT0gbGVhZiB8fCBfaXNTcGxhdCB8fCAhZXh0cmE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcm91dGVJbmZvLm1hdGNoZXMgPSBoYXNNYXRjaDtcbiAgICAgICAgICAgICAgcm91dGVJbmZvLnBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmFtcyk7XG4gICAgICAgICAgICAgIHJvdXRlSW5mby5yb3V0ZSA9IHJvb3Rba10ucm91dGU7XG4gICAgICAgICAgICAgIHJvdXRlSW5mby5wYXRoID0gX2lzU3BsYXQgJiYgZXh0cmEgfHwgbGVhZiB8fCB4O1xuICAgICAgICAgICAgICBvdXQucHVzaChyb3V0ZUluZm8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV4dHJhID09PSBudWxsICYmICFyb290W2tdLmtleXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoayAhPT0gXCIvXCIpIHtcbiAgICAgICAgICAgICAgX3NlZW4ucHVzaChrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwbGF0ID0gX2lzU3BsYXQ7XG4gICAgICAgICAgICByb290ID0gcm9vdFtrXTtcbiAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIShmb3VuZCB8fCByb290LmtleXMuc29tZShmdW5jdGlvbihrKSB7XG4gICAgICAgICAgcmV0dXJuIHJvb3Rba10ucGF0dGVybi5tYXRjaCh4KTtcbiAgICAgICAgfSkpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IGRlZmF1bHRFeHBvcnQoa2V5LCB4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BsYXQgfHwgIWZvdW5kO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBmaW5kKHBhdGgsIHJvdXRlcywgcmV0cmllcykge1xuICAgICAgdmFyIGdldCA9IHJlZHVjZS5iaW5kKG51bGwsIHBhdGgsIHJvdXRlcyk7XG4gICAgICB2YXIgc2V0ID0gW107XG4gICAgICB3aGlsZSAocmV0cmllcyA+IDApIHtcbiAgICAgICAgcmV0cmllcyAtPSAxO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBnZXQoc2V0KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChyZXRyaWVzID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldChzZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZChwYXRoLCByb3V0ZXMsIHBhcmVudCwgcm91dGVJbmZvKSB7XG4gICAgICB2YXIgZnVsbHBhdGggPSBtZXJnZShwYXRoLCBwYXJlbnQpO1xuICAgICAgdmFyIHJvb3QgPSByb3V0ZXM7XG4gICAgICB2YXIga2V5O1xuICAgICAgaWYgKHJvdXRlSW5mbyAmJiByb3V0ZUluZm8ubmVzdGVkICE9PSB0cnVlKSB7XG4gICAgICAgIGtleSA9IHJvdXRlSW5mby5rZXk7XG4gICAgICAgIGRlbGV0ZSByb3V0ZUluZm8ua2V5O1xuICAgICAgfVxuICAgICAgd2FsayhmdWxscGF0aCwgZnVuY3Rpb24oeCwgbGVhZikge1xuICAgICAgICByb290ID0gUGF0aE1hdGNoZXIucHVzaCh4LCByb290LCBsZWFmLCBmdWxscGF0aCk7XG4gICAgICAgIGlmICh4ICE9PSBcIi9cIikge1xuICAgICAgICAgIHJvb3QuaW5mbyA9IHJvb3QuaW5mbyB8fCBPYmplY3QuYXNzaWduKHt9LCByb3V0ZUluZm8pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJvb3QuaW5mbyA9IHJvb3QuaW5mbyB8fCBPYmplY3QuYXNzaWduKHt9LCByb3V0ZUluZm8pO1xuICAgICAgaWYgKGtleSkge1xuICAgICAgICByb290LmluZm8ua2V5ID0ga2V5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bGxwYXRoO1xuICAgIH1cbiAgICBmdW5jdGlvbiBybShwYXRoLCByb3V0ZXMsIHBhcmVudCkge1xuICAgICAgdmFyIGZ1bGxwYXRoID0gbWVyZ2UocGF0aCwgcGFyZW50KTtcbiAgICAgIHZhciByb290ID0gcm91dGVzO1xuICAgICAgdmFyIGxlYWYgPSBudWxsO1xuICAgICAgdmFyIGtleSA9IG51bGw7XG4gICAgICB3YWxrKGZ1bGxwYXRoLCBmdW5jdGlvbih4KSB7XG4gICAgICAgIGlmICghcm9vdCkge1xuICAgICAgICAgIGxlYWYgPSBudWxsO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcm9vdC5rZXlzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IGRlZmF1bHRFeHBvcnQocGF0aCwgeCk7XG4gICAgICAgIH1cbiAgICAgICAga2V5ID0geDtcbiAgICAgICAgbGVhZiA9IHJvb3Q7XG4gICAgICAgIHJvb3QgPSByb290W2tleV07XG4gICAgICB9KTtcbiAgICAgIGlmICghKGxlYWYgJiYga2V5KSkge1xuICAgICAgICB0aHJvdyBuZXcgZGVmYXVsdEV4cG9ydChwYXRoLCBrZXkpO1xuICAgICAgfVxuICAgICAgaWYgKGxlYWYgPT09IHJvdXRlcykge1xuICAgICAgICBsZWFmID0gcm91dGVzW1wiL1wiXTtcbiAgICAgIH1cbiAgICAgIGlmIChsZWFmLnJvdXRlICE9PSBrZXkpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IGxlYWYua2V5cy5pbmRleE9mKGtleSk7XG4gICAgICAgIGlmIChvZmZzZXQgPT09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IGRlZmF1bHRFeHBvcnQocGF0aCwga2V5KTtcbiAgICAgICAgfVxuICAgICAgICBsZWFmLmtleXMuc3BsaWNlKG9mZnNldCwgMSk7XG4gICAgICAgIFBhdGhNYXRjaGVyLnNvcnQobGVhZik7XG4gICAgICAgIGRlbGV0ZSBsZWFmW2tleV07XG4gICAgICB9XG4gICAgICBpZiAocm9vdC5yb3V0ZSA9PT0gbGVhZi5yb3V0ZSAmJiAoIXJvb3QuaW5mbyB8fCByb290LmluZm8ua2V5ID09PSBsZWFmLmluZm8ua2V5KSkge1xuICAgICAgICBkZWxldGUgbGVhZi5pbmZvO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgUm91dGVyID0gZnVuY3Rpb24gUm91dGVyMigpIHtcbiAgICAgIHZhciByb3V0ZXMgPSB7fTtcbiAgICAgIHZhciBzdGFjayA9IFtdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzb2x2ZTogZnVuY3Rpb24ocGF0aCwgY2IpIHtcbiAgICAgICAgICB2YXIgdXJsID0gcGF0aC5zcGxpdChcIj9cIilbMF07XG4gICAgICAgICAgdmFyIHNlZW4gPSBbXTtcbiAgICAgICAgICB3YWxrKHVybCwgZnVuY3Rpb24oeCwgbGVhZiwgZXh0cmEpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNiKG51bGwsIGZpbmQobGVhZiwgcm91dGVzLCAxKS5maWx0ZXIoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICAgIGlmICghc2Vlbi5pbmNsdWRlcyhyLnBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICBzZWVuLnB1c2goci5wYXRoKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgY2IoZSwgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBtb3VudDogZnVuY3Rpb24ocGF0aCwgY2IpIHtcbiAgICAgICAgICBpZiAocGF0aCAhPT0gXCIvXCIpIHtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gocGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbmQ6IGZ1bmN0aW9uKHBhdGgsIHJldHJpZXMpIHtcbiAgICAgICAgICByZXR1cm4gZmluZChwYXRoLCByb3V0ZXMsIHJldHJpZXMgPT09IHRydWUgPyAyIDogcmV0cmllcyB8fCAxKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkOiBmdW5jdGlvbihwYXRoLCByb3V0ZUluZm8pIHtcbiAgICAgICAgICByZXR1cm4gYWRkKHBhdGgsIHJvdXRlcywgc3RhY2suam9pbihcIlwiKSwgcm91dGVJbmZvKTtcbiAgICAgICAgfSxcbiAgICAgICAgcm06IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgICByZXR1cm4gcm0ocGF0aCwgcm91dGVzLCBzdGFjay5qb2luKFwiXCIpKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICAgIFJvdXRlci5tYXRjaGVzID0gZnVuY3Rpb24gbWF0Y2hlcyh1cmksIHBhdGgpIHtcbiAgICAgIHJldHVybiBidWlsZE1hdGNoZXIodXJpLCBwYXRoKS5yZWdleC50ZXN0KHBhdGgpO1xuICAgIH07XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBSb3V0ZXI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGliL3ZlbmRvci5qc1xudmFyIGltcG9ydF9xdWVyeV9zdHJpbmcgPSBfX3RvTW9kdWxlKHJlcXVpcmVfcXVlcnlfc3RyaW5nKCkpO1xudmFyIGltcG9ydF9hYnN0cmFjdF9uZXN0ZWRfcm91dGVyID0gX190b01vZHVsZShyZXF1aXJlX2Rpc3QoKSk7XG52YXIgZXhwb3J0X1JvdXRlciA9IGltcG9ydF9hYnN0cmFjdF9uZXN0ZWRfcm91dGVyLmRlZmF1bHQ7XG52YXIgZXhwb3J0X3BhcnNlID0gaW1wb3J0X3F1ZXJ5X3N0cmluZy5wYXJzZTtcbnZhciBleHBvcnRfc3RyaW5naWZ5ID0gaW1wb3J0X3F1ZXJ5X3N0cmluZy5zdHJpbmdpZnk7XG5leHBvcnQge1xuICBleHBvcnRfUm91dGVyIGFzIFJvdXRlcixcbiAgZXhwb3J0X3BhcnNlIGFzIHBhcnNlLFxuICBleHBvcnRfc3RyaW5naWZ5IGFzIHN0cmluZ2lmeVxufTtcbiIsImltcG9ydCB7IHdyaXRhYmxlIH0gZnJvbSBcInN2ZWx0ZS9zdG9yZVwiO1xuaW1wb3J0IHsgUm91dGVyLCBzdHJpbmdpZnkgfSBmcm9tIFwiLi92ZW5kb3JcIjtcbmNvbnN0IGNhY2hlID0ge307XG5jb25zdCBiYXNlVGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJiYXNlXCIpO1xuY29uc3QgYmFzZVByZWZpeCA9IGJhc2VUYWdbMF0gJiYgYmFzZVRhZ1swXS5ocmVmIHx8IFwiL1wiO1xuY29uc3QgUk9PVF9VUkwgPSBiYXNlUHJlZml4LnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLm9yaWdpbiwgXCJcIik7XG5jb25zdCByb3V0ZXIgPSB3cml0YWJsZSh7XG4gIHBhdGg6IFwiL1wiLFxuICBxdWVyeToge30sXG4gIHBhcmFtczoge30sXG4gIGluaXRpYWw6IHRydWVcbn0pO1xuY29uc3QgQ1RYX1JPVVRFUiA9IHt9O1xuY29uc3QgQ1RYX1JPVVRFID0ge307XG5sZXQgSEFTSENIQU5HRSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gPT09IFwibnVsbFwiO1xuZnVuY3Rpb24gaGFzaGNoYW5nZUVuYWJsZSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikge1xuICAgIEhBU0hDSEFOR0UgPSAhIXZhbHVlO1xuICB9XG4gIHJldHVybiBIQVNIQ0hBTkdFO1xufVxuZnVuY3Rpb24gZml4ZWRMb2NhdGlvbihwYXRoLCBjYWxsYmFjaywgZG9GaW5hbGx5KSB7XG4gIGNvbnN0IGJhc2VVcmkgPSBIQVNIQ0hBTkdFID8gd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZShcIiNcIiwgXCJcIikgOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gIGlmIChwYXRoLmNoYXJBdCgpICE9PSBcIi9cIikge1xuICAgIHBhdGggPSBiYXNlVXJpICsgcGF0aDtcbiAgfVxuICBjb25zdCBjdXJyZW50VVJMID0gYmFzZVVyaSArIHdpbmRvdy5sb2NhdGlvbi5oYXNoICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgaWYgKGN1cnJlbnRVUkwgIT09IHBhdGgpIHtcbiAgICBjYWxsYmFjayhwYXRoKTtcbiAgfVxuICBpZiAodHlwZW9mIGRvRmluYWxseSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZG9GaW5hbGx5KCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGNsZWFuUGF0aCh1cmksIGZpeCkge1xuICByZXR1cm4gdXJpICE9PSBcIi9cIiB8fCBmaXggPyB1cmkucmVwbGFjZSgvXFwvJC8sIFwiXCIpIDogdXJpO1xufVxuZnVuY3Rpb24gbmF2aWdhdGVUbyhwYXRoLCBvcHRpb25zKSB7XG4gIGNvbnN0IHtcbiAgICByZWxvYWQsXG4gICAgcmVwbGFjZSxcbiAgICBwYXJhbXMsXG4gICAgcXVlcnlQYXJhbXNcbiAgfSA9IG9wdGlvbnMgfHwge307XG4gIGlmICghcGF0aCB8fCB0eXBlb2YgcGF0aCAhPT0gXCJzdHJpbmdcIiB8fCBwYXRoWzBdICE9PSBcIi9cIiAmJiBwYXRoWzBdICE9PSBcIiNcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0aW5nICcvJHtwYXRofScgb3IgJyMke3BhdGh9JywgZ2l2ZW4gJyR7cGF0aH0nYCk7XG4gIH1cbiAgaWYgKHBhcmFtcykge1xuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoLzooW2EtekEtWl1bYS16QS1aMC05Xy1dKikvZywgKF8sIGtleSkgPT4gcGFyYW1zW2tleV0pO1xuICB9XG4gIGlmIChxdWVyeVBhcmFtcykge1xuICAgIGNvbnN0IHFzID0gc3RyaW5naWZ5KHF1ZXJ5UGFyYW1zKTtcbiAgICBpZiAocXMpIHtcbiAgICAgIHBhdGggKz0gYD8ke3FzfWA7XG4gICAgfVxuICB9XG4gIGlmIChIQVNIQ0hBTkdFKSB7XG4gICAgbGV0IGZpeGVkVVJMID0gcGF0aC5yZXBsYWNlKC9eI3wjJC9nLCBcIlwiKTtcbiAgICBpZiAoUk9PVF9VUkwgIT09IFwiL1wiKSB7XG4gICAgICBmaXhlZFVSTCA9IGZpeGVkVVJMLnJlcGxhY2UoY2xlYW5QYXRoKFJPT1RfVVJMKSwgXCJcIik7XG4gICAgfVxuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gZml4ZWRVUkwgIT09IFwiL1wiID8gZml4ZWRVUkwgOiBcIlwiO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocmVsb2FkIHx8ICF3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgfHwgIXdpbmRvdy5kaXNwYXRjaEV2ZW50KSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBwYXRoO1xuICAgIHJldHVybjtcbiAgfVxuICBmaXhlZExvY2F0aW9uKHBhdGgsIChuZXh0VVJMKSA9PiB7XG4gICAgd2luZG93Lmhpc3RvcnlbcmVwbGFjZSA/IFwicmVwbGFjZVN0YXRlXCIgOiBcInB1c2hTdGF0ZVwiXShudWxsLCBcIlwiLCBuZXh0VVJMKTtcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwb3BzdGF0ZVwiKSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gZ2V0UHJvcHMoZ2l2ZW4sIHJlcXVpcmVkKSB7XG4gIGNvbnN0IHsgcHJvcHM6IHN1YiwgLi4ub3RoZXJzIH0gPSBnaXZlbjtcbiAgcmVxdWlyZWQuZm9yRWFjaCgoaykgPT4ge1xuICAgIGRlbGV0ZSBvdGhlcnNba107XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIC4uLnN1YixcbiAgICAuLi5vdGhlcnNcbiAgfTtcbn1cbmZ1bmN0aW9uIGlzQWN0aXZlKHVyaSwgcGF0aCwgZXhhY3QpIHtcbiAgaWYgKCFjYWNoZVtbdXJpLCBwYXRoLCBleGFjdF1dKSB7XG4gICAgaWYgKGV4YWN0ICE9PSB0cnVlICYmIHBhdGguaW5kZXhPZih1cmkpID09PSAwKSB7XG4gICAgICBjYWNoZVtbdXJpLCBwYXRoLCBleGFjdF1dID0gL15bIy8/XT8kLy50ZXN0KHBhdGguc3Vic3RyKHVyaS5sZW5ndGgsIDEpKTtcbiAgICB9IGVsc2UgaWYgKHVyaS5pbmNsdWRlcyhcIipcIikgfHwgdXJpLmluY2x1ZGVzKFwiOlwiKSkge1xuICAgICAgY2FjaGVbW3VyaSwgcGF0aCwgZXhhY3RdXSA9IFJvdXRlci5tYXRjaGVzKHVyaSwgcGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlW1t1cmksIHBhdGgsIGV4YWN0XV0gPSBjbGVhblBhdGgocGF0aCkgPT09IHVyaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhY2hlW1t1cmksIHBhdGgsIGV4YWN0XV07XG59XG5mdW5jdGlvbiBpc1Byb21pc2Uob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgJiYgdHlwZW9mIG9iamVjdC50aGVuID09PSBcImZ1bmN0aW9uXCI7XG59XG5mdW5jdGlvbiBpc1N2ZWx0ZUNvbXBvbmVudChvYmplY3QpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBvYmplY3QucHJvdG90eXBlO1xufVxuZXhwb3J0IHtcbiAgQ1RYX1JPVVRFLFxuICBDVFhfUk9VVEVSLFxuICBIQVNIQ0hBTkdFLFxuICBST09UX1VSTCxcbiAgY2xlYW5QYXRoLFxuICBmaXhlZExvY2F0aW9uLFxuICBnZXRQcm9wcyxcbiAgaGFzaGNoYW5nZUVuYWJsZSxcbiAgaXNBY3RpdmUsXG4gIGlzUHJvbWlzZSxcbiAgaXNTdmVsdGVDb21wb25lbnQsXG4gIG5hdmlnYXRlVG8sXG4gIHJvdXRlclxufTtcbiIsImltcG9ydCB7IHdyaXRhYmxlIH0gZnJvbSBcInN2ZWx0ZS9zdG9yZVwiO1xuaW1wb3J0IHsgUm91dGVyLCBwYXJzZSB9IGZyb20gXCIuL3ZlbmRvclwiO1xuaW1wb3J0IHtcbiAgUk9PVF9VUkwsXG4gIEhBU0hDSEFOR0UsXG4gIG5hdmlnYXRlVG8sXG4gIGNsZWFuUGF0aCxcbiAgaXNBY3RpdmUsXG4gIHJvdXRlclxufSBmcm9tIFwiLi91dGlsc1wiO1xuY29uc3QgYmFzZVJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcbmNvbnN0IHJvdXRlSW5mbyA9IHdyaXRhYmxlKHt9KTtcbmNvbnN0IG9uRXJyb3IgPSB7fTtcbmNvbnN0IHNoYXJlZCA9IHt9O1xubGV0IGVycm9ycyA9IFtdO1xubGV0IHJvdXRlcnMgPSAwO1xubGV0IGludGVydmFsO1xubGV0IGN1cnJlbnRVUkw7XG5yb3V0ZXIuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICBzaGFyZWQucm91dGVyID0gdmFsdWU7XG59KTtcbnJvdXRlSW5mby5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gIHNoYXJlZC5yb3V0ZUluZm8gPSB2YWx1ZTtcbn0pO1xuZnVuY3Rpb24gZG9GYWxsYmFjayhmYWlsdXJlLCBmYWxsYmFjaykge1xuICByb3V0ZUluZm8udXBkYXRlKChkZWZhdWx0cykgPT4gKHtcbiAgICAuLi5kZWZhdWx0cyxcbiAgICBbZmFsbGJhY2tdOiB7XG4gICAgICAuLi5zaGFyZWQucm91dGVyLFxuICAgICAgZmFpbHVyZVxuICAgIH1cbiAgfSkpO1xufVxuZnVuY3Rpb24gaGFuZGxlUm91dGVzKG1hcCwgcGFyYW1zKSB7XG4gIGNvbnN0IGtleXMgPSBbXTtcbiAgbWFwLnNvbWUoKHgpID0+IHtcbiAgICBpZiAoeC5rZXkgJiYgeC5tYXRjaGVzICYmICFzaGFyZWQucm91dGVJbmZvW3gua2V5XSkge1xuICAgICAgaWYgKHgucmVkaXJlY3QgJiYgKHguY29uZGl0aW9uID09PSBudWxsIHx8IHguY29uZGl0aW9uKHNoYXJlZC5yb3V0ZXIpICE9PSB0cnVlKSkge1xuICAgICAgICBpZiAoeC5leGFjdCAmJiBzaGFyZWQucm91dGVyLnBhdGggIT09IHgucGF0aClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIG5hdmlnYXRlVG8oeC5yZWRpcmVjdCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHguZXhhY3QpIHtcbiAgICAgICAga2V5cy5wdXNoKHgua2V5KTtcbiAgICAgIH1cbiAgICAgIE9iamVjdC5hc3NpZ24ocGFyYW1zLCB4LnBhcmFtcyk7XG4gICAgICByb3V0ZUluZm8udXBkYXRlKChkZWZhdWx0cykgPT4gKHtcbiAgICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAgIFt4LmtleV06IHtcbiAgICAgICAgICAuLi5zaGFyZWQucm91dGVyLFxuICAgICAgICAgIC4uLnhcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuICByZXR1cm4ga2V5cztcbn1cbmZ1bmN0aW9uIGV2dEhhbmRsZXIoKSB7XG4gIGxldCBiYXNlVXJpID0gIUhBU0hDSEFOR0UgPyB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sIFwiXCIpIDogd2luZG93LmxvY2F0aW9uLmhhc2ggfHwgXCIvXCI7XG4gIGxldCBmYWlsdXJlO1xuICBpZiAoUk9PVF9VUkwgIT09IFwiL1wiKSB7XG4gICAgYmFzZVVyaSA9IGJhc2VVcmkucmVwbGFjZShjbGVhblBhdGgoUk9PVF9VUkwpLCBcIlwiKTtcbiAgfVxuICBpZiAoL14jW1xcdy1dKyQvLnRlc3Qod2luZG93LmxvY2F0aW9uLmhhc2gpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iod2luZG93LmxvY2F0aW9uLmhhc2gpICYmIGN1cnJlbnRVUkwgPT09IGJhc2VVcmkuc3BsaXQoXCIjXCIpWzBdKVxuICAgIHJldHVybjtcbiAgY29uc3QgW2ZpeGVkVXJpLCBxc10gPSBiYXNlVXJpLnJlcGxhY2UoXCIvI1wiLCBcIiNcIikucmVwbGFjZSgvXiNcXC8vLCBcIi9cIikuc3BsaXQoXCI/XCIpO1xuICBjb25zdCBmdWxscGF0aCA9IGZpeGVkVXJpLnJlcGxhY2UoL1xcLz8kLywgXCIvXCIpO1xuICBjb25zdCBxdWVyeSA9IHBhcnNlKHFzKTtcbiAgY29uc3QgcGFyYW1zID0ge307XG4gIGNvbnN0IGtleXMgPSBbXTtcbiAgcm91dGVJbmZvLnNldCh7fSk7XG4gIGlmIChjdXJyZW50VVJMICE9PSBiYXNlVXJpKSB7XG4gICAgY3VycmVudFVSTCA9IGJhc2VVcmk7XG4gICAgcm91dGVyLnNldCh7XG4gICAgICBwYXRoOiBjbGVhblBhdGgoZnVsbHBhdGgpLFxuICAgICAgcXVlcnksXG4gICAgICBwYXJhbXNcbiAgICB9KTtcbiAgfVxuICBiYXNlUm91dGVyLnJlc29sdmUoZnVsbHBhdGgsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGZhaWx1cmUgPSBlcnI7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGtleXMucHVzaCguLi5oYW5kbGVSb3V0ZXMocmVzdWx0LCBwYXJhbXMpKTtcbiAgfSk7XG4gIGNvbnN0IHRvRGVsZXRlID0ge307XG4gIGlmIChmYWlsdXJlICYmIGZhaWx1cmUucGF0aCAhPT0gXCIvXCIpIHtcbiAgICBrZXlzLnJlZHVjZSgocHJldiwgY3VyKSA9PiB7XG4gICAgICBwcmV2W2N1cl0gPSBudWxsO1xuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwgdG9EZWxldGUpO1xuICB9IGVsc2Uge1xuICAgIGZhaWx1cmUgPSBudWxsO1xuICB9XG4gIGVycm9ycy5mb3JFYWNoKChjYikgPT4gY2IoKSk7XG4gIGVycm9ycyA9IFtdO1xuICB0cnkge1xuICAgIGJhc2VSb3V0ZXIuZmluZChjbGVhblBhdGgoZnVsbHBhdGgpKS5mb3JFYWNoKChzdWIpID0+IHtcbiAgICAgIGlmIChzdWIuZXhhY3QgJiYgIXN1Yi5tYXRjaGVzKSB7XG4gICAgICAgIHRvRGVsZXRlW3N1Yi5rZXldID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICB9XG4gIHJvdXRlSW5mby51cGRhdGUoKGRlZmF1bHRzKSA9PiAoe1xuICAgIC4uLmRlZmF1bHRzLFxuICAgIC4uLnRvRGVsZXRlXG4gIH0pKTtcbiAgbGV0IGZhbGxiYWNrO1xuICBPYmplY3Qua2V5cyhvbkVycm9yKS5mb3JFYWNoKChyb290KSA9PiB7XG4gICAgaWYgKGlzQWN0aXZlKHJvb3QsIGZ1bGxwYXRoLCBmYWxzZSkpIHtcbiAgICAgIGNvbnN0IGZuID0gb25FcnJvcltyb290XS5jYWxsYmFjaztcbiAgICAgIGZuKGZhaWx1cmUpO1xuICAgICAgZXJyb3JzLnB1c2goZm4pO1xuICAgIH1cbiAgICBpZiAoIWZhbGxiYWNrICYmIG9uRXJyb3Jbcm9vdF0uZmFsbGJhY2spIHtcbiAgICAgIGZhbGxiYWNrID0gb25FcnJvcltyb290XS5mYWxsYmFjaztcbiAgICB9XG4gIH0pO1xuICBpZiAoZmFpbHVyZSAmJiBmYWxsYmFjaykge1xuICAgIGRvRmFsbGJhY2soZmFpbHVyZSwgZmFsbGJhY2spO1xuICB9XG59XG5mdW5jdGlvbiBmaW5kUm91dGVzKCkge1xuICBjbGVhclRpbWVvdXQoaW50ZXJ2YWwpO1xuICBpbnRlcnZhbCA9IHNldFRpbWVvdXQoZXZ0SGFuZGxlcik7XG59XG5mdW5jdGlvbiBhZGRSb3V0ZXIocm9vdCwgZmFsbGJhY2ssIGNhbGxiYWNrKSB7XG4gIGlmICghcm91dGVycykge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZmluZFJvdXRlcywgZmFsc2UpO1xuICB9XG4gIGlmICghb25FcnJvcltyb290XSB8fCBmYWxsYmFjaykge1xuICAgIG9uRXJyb3Jbcm9vdF0gPSB7IGZhbGxiYWNrLCBjYWxsYmFjayB9O1xuICB9XG4gIHJvdXRlcnMgKz0gMTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICByb3V0ZXJzIC09IDE7XG4gICAgaWYgKCFyb3V0ZXJzKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGZpbmRSb3V0ZXMsIGZhbHNlKTtcbiAgICB9XG4gIH07XG59XG5leHBvcnQge1xuICBhZGRSb3V0ZXIsXG4gIGJhc2VSb3V0ZXIsXG4gIGRvRmFsbGJhY2ssXG4gIGV2dEhhbmRsZXIsXG4gIGZpbmRSb3V0ZXMsXG4gIGhhbmRsZVJvdXRlcyxcbiAgcm91dGVJbmZvXG59O1xuIiwiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XG4gIGltcG9ydCB7IHdyaXRhYmxlIH0gZnJvbSAnc3ZlbHRlL3N0b3JlJztcbiAgaW1wb3J0IHsgQ1RYX1JPVVRFUiwgcm91dGVyIH0gZnJvbSAnLi91dGlscyc7XG4gIGltcG9ydCB7XG4gICAgYmFzZVJvdXRlciwgYWRkUm91dGVyLCBmaW5kUm91dGVzLCBkb0ZhbGxiYWNrLFxuICB9IGZyb20gJy4vcm91dGVyJztcbjwvc2NyaXB0PlxuXG48c2NyaXB0PlxuICBpbXBvcnQge1xuICAgIG9uTW91bnQsIG9uRGVzdHJveSwgZ2V0Q29udGV4dCwgc2V0Q29udGV4dCxcbiAgfSBmcm9tICdzdmVsdGUnO1xuXG4gIGxldCBjbGVhbnVwO1xuICBsZXQgZmFpbHVyZTtcbiAgbGV0IGZhbGxiYWNrO1xuXG4gIGV4cG9ydCBsZXQgcGF0aCA9ICcvJztcbiAgZXhwb3J0IGxldCBwZW5kaW5nID0gbnVsbDtcbiAgZXhwb3J0IGxldCBkaXNhYmxlZCA9IGZhbHNlO1xuICBleHBvcnQgbGV0IGNvbmRpdGlvbiA9IG51bGw7XG5cblxuXG5cblxuICBjb25zdCByb3V0ZXJDb250ZXh0ID0gZ2V0Q29udGV4dChDVFhfUk9VVEVSKTtcbiAgY29uc3QgYmFzZVBhdGggPSByb3V0ZXJDb250ZXh0ID8gcm91dGVyQ29udGV4dC5iYXNlUGF0aCA6IHdyaXRhYmxlKHBhdGgpO1xuXG4gIGNvbnN0IGZpeGVkUm9vdCA9ICRiYXNlUGF0aCAhPT0gcGF0aCAmJiAkYmFzZVBhdGggIT09ICcvJ1xuICAgID8gYCR7JGJhc2VQYXRofSR7cGF0aCAhPT0gJy8nID8gcGF0aCA6ICcnfWBcbiAgICA6IHBhdGg7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4gIGZ1bmN0aW9uIGFzc2lnblJvdXRlKGtleSwgcm91dGUsIGRldGFpbCkge1xuICAgIGtleSA9IGtleSB8fCBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMik7XG5cbiAgICAvLyBjb25zaWRlciBhcyBuZXN0ZWQgcm91dGVzIGlmIHRoZXkgZG9lcyBub3QgaGF2ZSBhbnkgc2VnbWVudFxuICAgIGNvbnN0IG5lc3RlZCA9ICFyb3V0ZS5zdWJzdHIoMSkuaW5jbHVkZXMoJy8nKTtcbiAgICBjb25zdCBoYW5kbGVyID0geyBrZXksIG5lc3RlZCwgLi4uZGV0YWlsIH07XG5cbiAgICBsZXQgZnVsbHBhdGg7XG5cbiAgICBiYXNlUm91dGVyLm1vdW50KGZpeGVkUm9vdCwgKCkgPT4ge1xuICAgICAgZnVsbHBhdGggPSBiYXNlUm91dGVyLmFkZChyb3V0ZSwgaGFuZGxlcik7XG4gICAgICBmYWxsYmFjayA9IChoYW5kbGVyLmZhbGxiYWNrICYmIGtleSkgfHwgZmFsbGJhY2s7XG4gICAgfSk7XG5cbiAgICBmaW5kUm91dGVzKCk7XG5cbiAgICByZXR1cm4gW2tleSwgZnVsbHBhdGhdO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5hc3NpZ25Sb3V0ZShyb3V0ZSkge1xuICAgIHRyeSB7XG4gICAgICBiYXNlUm91dGVyLnJtKHJvdXRlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyDwn5SlIHRoaXMgaXMgZmluZS4uLlxuICAgIH1cbiAgICBmaW5kUm91dGVzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBvbkVycm9yKGVycikge1xuICAgIGZhaWx1cmUgPSBlcnI7XG5cbiAgICBpZiAoZmFpbHVyZSAmJiBmYWxsYmFjaykge1xuICAgICAgZG9GYWxsYmFjayhmYWlsdXJlLCBmYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgY2xlYW51cCA9IGFkZFJvdXRlcihmaXhlZFJvb3QsIGZhbGxiYWNrLCBvbkVycm9yKTtcbiAgfSk7XG5cbiAgb25EZXN0cm95KCgpID0+IHtcbiAgICBpZiAoY2xlYW51cCkgY2xlYW51cCgpO1xuICB9KTtcblxuICBzZXRDb250ZXh0KENUWF9ST1VURVIsIHtcbiAgICBiYXNlUGF0aCxcbiAgICBhc3NpZ25Sb3V0ZSxcbiAgICB1bmFzc2lnblJvdXRlLFxuICAgIHBlbmRpbmdDb21wb25lbnQ6IHBlbmRpbmcsXG4gIH0pO1xuXG4gICQ6IGlmIChjb25kaXRpb24pIHtcbiAgICBkaXNhYmxlZCA9ICFjb25kaXRpb24oJHJvdXRlcik7XG4gIH1cbjwvc2NyaXB0PlxuXG57I2lmICFkaXNhYmxlZH1cbiAgPHNsb3QgLz5cbnsvaWZ9XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCI8c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgaW1wb3J0IHsgd3JpdGFibGUgfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuICBpbXBvcnQgeyByb3V0ZUluZm8gfSBmcm9tICcuL3JvdXRlcic7XG4gIGltcG9ydCB7XG4gICAgQ1RYX1JPVVRFUiwgQ1RYX1JPVVRFLCBnZXRQcm9wcywgaXNQcm9taXNlLCBpc1N2ZWx0ZUNvbXBvbmVudCxcbiAgfSBmcm9tICcuL3V0aWxzJztcbjwvc2NyaXB0PlxuXG48c2NyaXB0PlxuICBpbXBvcnQgeyBvbkRlc3Ryb3ksIGdldENvbnRleHQsIHNldENvbnRleHQgfSBmcm9tICdzdmVsdGUnO1xuXG4gIGV4cG9ydCBsZXQga2V5ID0gbnVsbDtcbiAgZXhwb3J0IGxldCBwYXRoID0gJy8nO1xuICBleHBvcnQgbGV0IGV4YWN0ID0gbnVsbDtcbiAgZXhwb3J0IGxldCBwZW5kaW5nID0gbnVsbDtcbiAgZXhwb3J0IGxldCBkaXNhYmxlZCA9IGZhbHNlO1xuICBleHBvcnQgbGV0IGZhbGxiYWNrID0gbnVsbDtcbiAgZXhwb3J0IGxldCBjb21wb25lbnQgPSBudWxsO1xuICBleHBvcnQgbGV0IGNvbmRpdGlvbiA9IG51bGw7XG4gIGV4cG9ydCBsZXQgcmVkaXJlY3QgPSBudWxsO1xuXG4gIC8vIHJlcGxhY2VtZW50IGZvciBgT2JqZWN0LmtleXMoYXJndW1lbnRzWzBdLiQkLnByb3BzKWBcbiAgY29uc3QgdGhpc1Byb3BzID0gWydrZXknLCAncGF0aCcsICdleGFjdCcsICdwZW5kaW5nJywgJ2Rpc2FibGVkJywgJ2ZhbGxiYWNrJywgJ2NvbXBvbmVudCcsICdjb25kaXRpb24nLCAncmVkaXJlY3QnXTtcblxuICBjb25zdCByb3V0ZUNvbnRleHQgPSBnZXRDb250ZXh0KENUWF9ST1VURSk7XG4gIGNvbnN0IHJvdXRlckNvbnRleHQgPSBnZXRDb250ZXh0KENUWF9ST1VURVIpO1xuXG4gIGNvbnN0IHsgYXNzaWduUm91dGUsIHVuYXNzaWduUm91dGUsIHBlbmRpbmdDb21wb25lbnQgfSA9IHJvdXRlckNvbnRleHQgfHwge307XG5cbiAgY29uc3Qgcm91dGVQYXRoID0gcm91dGVDb250ZXh0ID8gcm91dGVDb250ZXh0LnJvdXRlUGF0aCA6IHdyaXRhYmxlKHBhdGgpO1xuXG4gIGxldCBhY3RpdmVSb3V0ZXIgPSBudWxsO1xuICBsZXQgYWN0aXZlUHJvcHMgPSB7fTtcbiAgbGV0IGZ1bGxwYXRoO1xuICBsZXQgaGFzTG9hZGVkO1xuXG4gIGNvbnN0IGZpeGVkUm9vdCA9ICRyb3V0ZVBhdGggIT09IHBhdGggJiYgJHJvdXRlUGF0aCAhPT0gJy8nXG4gICAgPyBgJHskcm91dGVQYXRofSR7cGF0aCAhPT0gJy8nID8gcGF0aCA6ICcnfWBcbiAgICA6IHBhdGg7XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZSgpIHtcbiAgICBjb25zdCBmaXhlZFJvdXRlID0gcGF0aCAhPT0gZml4ZWRSb290ICYmIGZpeGVkUm9vdC5zdWJzdHIoLTEpICE9PSAnLydcbiAgICAgID8gYCR7Zml4ZWRSb290fS9gXG4gICAgICA6IGZpeGVkUm9vdDtcblxuICAgIFtrZXksIGZ1bGxwYXRoXSA9IGFzc2lnblJvdXRlKGtleSwgZml4ZWRSb3V0ZSwge1xuICAgICAgY29uZGl0aW9uLCByZWRpcmVjdCwgZmFsbGJhY2ssIGV4YWN0LFxuICAgIH0pO1xuICB9XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4gIHJlc29sdmUoKTtcblxuXG4gICQ6IGlmIChrZXkpIHtcbiAgICBhY3RpdmVSb3V0ZXIgPSAhZGlzYWJsZWQgJiYgJHJvdXRlSW5mb1trZXldO1xuICAgIGFjdGl2ZVByb3BzID0gZ2V0UHJvcHMoJCRwcm9wcywgdGhpc1Byb3BzKTtcbiAgICBhY3RpdmVQcm9wcy5yb3V0ZXIgPSBhY3RpdmVSb3V0ZXI7XG4gIH1cblxuICAkOiBpZiAoYWN0aXZlUm91dGVyKSB7XG4gICAgaWYgKCFjb21wb25lbnQpIHsgLy8gY29tcG9uZW50IHBhc3NlZCBhcyBzbG90XG4gICAgICBoYXNMb2FkZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoaXNTdmVsdGVDb21wb25lbnQoY29tcG9uZW50KSkgeyAvLyBjb21wb25lbnQgcGFzc2VkIGFzIFN2ZWx0ZSBjb21wb25lbnRcbiAgICAgIGhhc0xvYWRlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChpc1Byb21pc2UoY29tcG9uZW50KSkgeyAvLyBjb21wb25lbnQgcGFzc2VkIGFzIGltcG9ydCgpXG4gICAgICBjb21wb25lbnQudGhlbihtb2R1bGUgPT4ge1xuICAgICAgICBjb21wb25lbnQgPSBtb2R1bGUuZGVmYXVsdDtcbiAgICAgICAgaGFzTG9hZGVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7IC8vIGNvbXBvbmVudCBwYXNzZWQgYXMgKCkgPT4gaW1wb3J0KClcbiAgICAgIGNvbXBvbmVudCgpLnRoZW4obW9kdWxlID0+IHtcbiAgICAgICAgY29tcG9uZW50ID0gbW9kdWxlLmRlZmF1bHQ7XG4gICAgICAgIGhhc0xvYWRlZCA9IHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbkRlc3Ryb3koKCkgPT4ge1xuICAgIGlmICh1bmFzc2lnblJvdXRlKSB7XG4gICAgICB1bmFzc2lnblJvdXRlKGZ1bGxwYXRoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHNldENvbnRleHQoQ1RYX1JPVVRFLCB7XG4gICAgcm91dGVQYXRoLFxuICB9KTtcbjwvc2NyaXB0PlxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG57I2lmIGFjdGl2ZVJvdXRlcn1cbiAgeyNpZiAhaGFzTG9hZGVkfVxuICAgIHsjaWYgcGVuZGluZyB8fCBwZW5kaW5nQ29tcG9uZW50fVxuICAgICAgeyNpZiBpc1N2ZWx0ZUNvbXBvbmVudChwZW5kaW5nKX1cbiAgICAgICAgPHN2ZWx0ZTpjb21wb25lbnQgdGhpcz17cGVuZGluZ30gey4uLmFjdGl2ZVByb3BzfSAvPlxuICAgICAgezplbHNlIGlmIGlzU3ZlbHRlQ29tcG9uZW50KHBlbmRpbmdDb21wb25lbnQpfVxuICAgICAgICA8c3ZlbHRlOmNvbXBvbmVudCB0aGlzPXtwZW5kaW5nQ29tcG9uZW50fSB7Li4uYWN0aXZlUHJvcHN9IC8+XG4gICAgICB7OmVsc2V9XG4gICAgICAgIHtwZW5kaW5nIHx8IHBlbmRpbmdDb21wb25lbnR9XG4gICAgICB7L2lmfVxuICAgIHsvaWZ9XG4gIHs6ZWxzZX1cbiAgICB7I2lmIGNvbXBvbmVudH1cbiAgICAgIDxzdmVsdGU6Y29tcG9uZW50IHRoaXM9e2NvbXBvbmVudH0gey4uLmFjdGl2ZVByb3BzfSAvPlxuICAgIHs6ZWxzZX1cbiAgICAgIDxzbG90IHsuLi5hY3RpdmVQcm9wc30gLz5cbiAgICB7L2lmfVxuICB7L2lmfVxuey9pZn1cbiIsIjxzY3JpcHQ+XG4gIGltcG9ydCB7IGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciB9IGZyb20gJ3N2ZWx0ZSc7XG5cbiAgaW1wb3J0IHtcbiAgICBST09UX1VSTCwgSEFTSENIQU5HRSwgZml4ZWRMb2NhdGlvbiwgbmF2aWdhdGVUbywgY2xlYW5QYXRoLCBpc0FjdGl2ZSwgZ2V0UHJvcHMsIHJvdXRlcixcbiAgfSBmcm9tICcuL3V0aWxzJztcblxuICBsZXQgcmVmO1xuICBsZXQgYWN0aXZlO1xuICBsZXQgY3NzQ2xhc3MgPSAnJztcbiAgbGV0IGZpeGVkSHJlZiA9IG51bGw7XG5cbiAgZXhwb3J0IGxldCBnbyA9IG51bGw7XG4gIGV4cG9ydCBsZXQgb3BlbiA9IG51bGw7XG4gIGV4cG9ydCBsZXQgaHJlZiA9ICcnO1xuICBleHBvcnQgbGV0IHRpdGxlID0gJyc7XG4gIGV4cG9ydCBsZXQgYnV0dG9uID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgZXhhY3QgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCByZWxvYWQgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCByZXBsYWNlID0gZmFsc2U7XG4gIGV4cG9ydCB7IGNzc0NsYXNzIGFzIGNsYXNzIH07XG5cbiAgLy8gcmVwbGFjZW1lbnQgZm9yIGBPYmplY3Qua2V5cyhhcmd1bWVudHNbMF0uJCQucHJvcHMpYFxuICBjb25zdCB0aGlzUHJvcHMgPSBbJ2dvJywgJ29wZW4nLCAnaHJlZicsICdjbGFzcycsICd0aXRsZScsICdidXR0b24nLCAnZXhhY3QnLCAncmVsb2FkJywgJ3JlcGxhY2UnXTtcblxuICAvLyByZWJhc2UgYWN0aXZlIFVSTFxuICAkOiBpZiAoIS9eKFxcdys6KT9cXC9cXC8vLnRlc3QoaHJlZikpIHtcbiAgICBmaXhlZEhyZWYgPSBjbGVhblBhdGgoUk9PVF9VUkwsIHRydWUpICsgY2xlYW5QYXRoKEhBU0hDSEFOR0UgPyBgIyR7aHJlZn1gIDogaHJlZik7XG4gIH1cblxuICAkOiBpZiAocmVmICYmICRyb3V0ZXIucGF0aCkge1xuICAgIGlmIChpc0FjdGl2ZShocmVmLCAkcm91dGVyLnBhdGgsIGV4YWN0KSkge1xuICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgcmVmLnNldEF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50JywgJ3BhZ2UnKTtcblxuICAgICAgICBpZiAoYnV0dG9uKSB7XG4gICAgICAgICAgcmVmLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYWN0aXZlKSB7XG4gICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICAgIHJlZi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICByZWYucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnKTtcbiAgICB9XG4gIH1cblxuICAvLyBleHRyYWN0IGFkZGl0aW9uYWwgcHJvcHNcbiAgJDogZml4ZWRQcm9wcyA9IGdldFByb3BzKCQkcHJvcHMsIHRoaXNQcm9wcyk7XG5cbiAgY29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXIoKTtcblxuICAvLyB0aGlzIHdpbGwgZW5hYmxlIGA8TGluayBvbjpjbGljaz17Li4ufSAvPmAgY2FsbHNcbiAgZnVuY3Rpb24gaGFuZGxlT25DbGljayhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKHR5cGVvZiBnbyA9PT0gJ3N0cmluZycgJiYgd2luZG93Lmhpc3RvcnkubGVuZ3RoID4gMSkge1xuICAgICAgaWYgKGdvID09PSAnYmFjaycpIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICAgIGVsc2UgaWYgKGdvID09PSAnZndkJykgd2luZG93Lmhpc3RvcnkuZm9yd2FyZCgpO1xuICAgICAgZWxzZSB3aW5kb3cuaGlzdG9yeS5nbyhwYXJzZUludChnbywgMTApKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWZpeGVkSHJlZiAmJiBocmVmICE9PSAnJykge1xuICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgbGV0IHNwZWNzID0gdHlwZW9mIG9wZW4gPT09ICdzdHJpbmcnID8gb3BlbiA6ICcnO1xuXG4gICAgICAgIGNvbnN0IHdtYXRjaCA9IHNwZWNzLm1hdGNoKC93aWR0aD0oXFxkKykvKTtcbiAgICAgICAgY29uc3QgaG1hdGNoID0gc3BlY3MubWF0Y2goL2hlaWdodD0oXFxkKykvKTtcblxuICAgICAgICBpZiAod21hdGNoKSBzcGVjcyArPSBgLGxlZnQ9JHsod2luZG93LnNjcmVlbi53aWR0aCAtIHdtYXRjaFsxXSkgLyAyfWA7XG4gICAgICAgIGlmIChobWF0Y2gpIHNwZWNzICs9IGAsdG9wPSR7KHdpbmRvdy5zY3JlZW4uaGVpZ2h0IC0gaG1hdGNoWzFdKSAvIDJ9YDtcblxuICAgICAgICBpZiAod21hdGNoICYmICFobWF0Y2gpIHtcbiAgICAgICAgICBzcGVjcyArPSBgLGhlaWdodD0ke3dtYXRjaFsxXX0sdG9wPSR7KHdpbmRvdy5zY3JlZW4uaGVpZ2h0IC0gd21hdGNoWzFdKSAvIDJ9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHcgPSB3aW5kb3cub3BlbihocmVmLCAnJywgc3BlY3MpO1xuICAgICAgICBjb25zdCB0ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGlmICh3LmNsb3NlZCkge1xuICAgICAgICAgICAgZGlzcGF0Y2goJ2Nsb3NlJyk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTIwKTtcbiAgICAgIH0gZWxzZSB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhyZWY7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZml4ZWRMb2NhdGlvbihocmVmLCAoKSA9PiB7XG4gICAgICBuYXZpZ2F0ZVRvKGZpeGVkSHJlZiB8fCAnLycsIHsgcmVsb2FkLCByZXBsYWNlIH0pO1xuICAgIH0sICgpID0+IGRpc3BhdGNoKCdjbGljaycsIGUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUFuY2hvck9uQ2xpY2soZSkge1xuICAgIC8vIHVzZXIgdXNlZCBhIGtleWJvYXJkIHNob3J0Y3V0IHRvIGZvcmNlIG9wZW4gbGluayBpbiBhIG5ldyB0YWJcbiAgICBpZiAoZS5tZXRhS2V5IHx8IGUuY3RybEtleSB8fCBlLmJ1dHRvbiAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgXG4gICAgaGFuZGxlT25DbGljayhlKTtcbiAgfVxuPC9zY3JpcHQ+XG5cbnsjaWYgYnV0dG9ufVxuICA8YnV0dG9uIHsuLi5maXhlZFByb3BzfSBiaW5kOnRoaXM9e3JlZn0gY2xhc3M9e2Nzc0NsYXNzfSB7dGl0bGV9IG9uOmNsaWNrPXtoYW5kbGVPbkNsaWNrfT5cbiAgICA8c2xvdCAvPlxuICA8L2J1dHRvbj5cbns6ZWxzZX1cbiAgPGEgey4uLmZpeGVkUHJvcHN9IGhyZWY9e2NsZWFuUGF0aChmaXhlZEhyZWYgfHwgaHJlZil9IGJpbmQ6dGhpcz17cmVmfSBjbGFzcz17Y3NzQ2xhc3N9IHt0aXRsZX0gb246Y2xpY2s9e2hhbmRsZUFuY2hvck9uQ2xpY2t9PlxuICAgIDxzbG90IC8+XG4gIDwvYT5cbnsvaWZ9XG4iLCJpbXBvcnQgUm91dGVyIGZyb20gXCIuL2xpYi9Sb3V0ZXIuc3ZlbHRlXCI7XG5pbXBvcnQgUm91dGUgZnJvbSBcIi4vbGliL1JvdXRlLnN2ZWx0ZVwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIi4vbGliL0xpbmsuc3ZlbHRlXCI7XG5pbXBvcnQgeyBoYXNoY2hhbmdlRW5hYmxlLCBuYXZpZ2F0ZVRvLCByb3V0ZXIgfSBmcm9tIFwiLi9saWIvdXRpbHNcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShSb3V0ZXIsIFwiaGFzaGNoYW5nZVwiLCB7XG4gIHNldDogKHZhbHVlKSA9PiBoYXNoY2hhbmdlRW5hYmxlKHZhbHVlKSxcbiAgZ2V0OiAoKSA9PiBoYXNoY2hhbmdlRW5hYmxlKCksXG4gIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gIGVudW1lcmFibGU6IGZhbHNlXG59KTtcbmV4cG9ydCB7XG4gIExpbmssXG4gIFJvdXRlLFxuICBSb3V0ZXIsXG4gIG5hdmlnYXRlVG8sXG4gIHJvdXRlclxufTtcbiIsIjxzY3JpcHQ+XG4gIGltcG9ydCB7IFJvdXRlciwgUm91dGUsIExpbmssIG5hdmlnYXRlVG8gfSBmcm9tICd5cnYnO1xuICBpbXBvcnQge1xuICAgIG1lLCB1cmwsIHNjaGVtYXMsIGN1cnJlbnQsIHNlc3Npb24sIGxvZ2dlZEluLFxuICB9IGZyb20gJy4vZ2lzdHMnO1xuXG4gIGltcG9ydCBJY29uIGZyb20gJy4vSWNvbi5zdmVsdGUnO1xuICBpbXBvcnQgT3B0cyBmcm9tICcuL09wdHMuc3ZlbHRlJztcbiAgaW1wb3J0IFNhdmUgZnJvbSAnLi9TYXZlLnN2ZWx0ZSc7XG4gIGltcG9ydCBHaXN0cyBmcm9tICcuL0dpc3RzLnN2ZWx0ZSc7XG4gIGltcG9ydCBNb2RhbCBmcm9tICcuL01vZGFsLnN2ZWx0ZSc7XG5cbiAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICBtZSgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoIWRhdGEubG9naW4pIHJldHVybjtcblxuICAgICAgJGxvZ2dlZEluID0gdHJ1ZTtcbiAgICAgICRzZXNzaW9uID0ge1xuICAgICAgICB1c2VybmFtZTogZGF0YS5sb2dpbixcbiAgICAgICAgZnVsbG5hbWU6IGRhdGEubmFtZSxcbiAgICAgIH07XG5cbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuX0RBVEEgPSBKU09OLnN0cmluZ2lmeSgkc2Vzc2lvbik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBleGl0KCkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuX0FVVEggPSAnJztcbiAgICAkbG9nZ2VkSW4gPSBudWxsO1xuICAgIG5hdmlnYXRlVG8oJy8nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZCgpIHtcbiAgICAkc2NoZW1hcyA9IFtdO1xuICAgICRjdXJyZW50ID0gbnVsbDtcbiAgICBuYXZpZ2F0ZVRvKCcvJyk7XG4gIH1cbjwvc2NyaXB0PlxuXG48dWwgY2xhc3M9XCJwIGxyIGxuIG10IHJlbCBqc2YtYWJvdXRcIj5cbiAgPGxpIGNsYXNzPVwic3AgcGQgZGliIG5vc2xcIj5cbiAgICA8TGluayBocmVmPVwiI29wdGlvbnNcIiBjbGFzcz1cImFcIj5cbiAgICAgIDxJY29uIG5hbWU9XCJnZWFyXCIgLz4gT3B0aW9uc1xuICAgIDwvTGluaz5cbiAgPC9saT5cbiAgPGxpIGNsYXNzPVwiYXIgZGliXCI+XG4gICAgeyNpZiAkbG9nZ2VkSW59XG4gICAgICA8TGluayBocmVmPVwiI3Nlc3Npb25cIiBjbGFzcz1cImEgbm9zbFwiIHRpdGxlPXskc2Vzc2lvbi5mdWxsbmFtZX0+XG4gICAgICAgIDxJY29uIG5hbWU9XCJnaXRodWJcIiAvPiB7JHNlc3Npb24udXNlcm5hbWV9XG4gICAgICA8L0xpbms+XG4gICAgezplbHNlfVxuICAgICAgPExpbmsgb3Blbj1cIndpZHRoPTQwMCxoZWlnaHQ9NjQwXCIgaHJlZj17dXJsKCl9IG9uOmNsb3NlPXtkb25lfSBjbGFzcz1cImFcIj5cbiAgICAgICAgPEljb24gbmFtZT1cImdpdGh1YlwiIC8+IFNoYXJlIGxpbms/IExvZyBpblxuICAgICAgPC9MaW5rPlxuICAgIHsvaWZ9XG4gIDwvbGk+XG48L3VsPlxuXG48Um91dGVyPlxuICA8Um91dGUgcGF0aD1cIiNvcHRpb25zXCIgY29tcG9uZW50PXtPcHRzfSAvPlxuICA8Um91dGUgcGF0aD1cIiNzZXNzaW9uXCI+XG4gICAgPE1vZGFsPlxuICAgICAgPExpbmsgaHJlZj1cIi9cIiBvbjpjbGljaz17YWRkfT5OZXcgcHJvamVjdDwvTGluaz4gfFxuICAgICAgPExpbmsgaHJlZj1cIi9sb2dvdXRcIiBvbjpjbGljaz17ZXhpdH0+TG9nIG91dDwvTGluaz5cbiAgICAgIDxMaW5rIGhyZWY9XCIjc2Vzc2lvbi9zYXZlXCI+U2F2ZSBwcm9qZWN0Li4uPC9MaW5rPiB8XG4gICAgICA8TGluayBocmVmPVwiI3Nlc3Npb24vb3BlblwiPlNjaGVtYXM8L0xpbms+IHxcbiAgICAgIDxSb3V0ZSBwYXRoPVwiL29wZW5cIiBjb21wb25lbnQ9e0dpc3RzfSAvPlxuICAgICAgPFJvdXRlIHBhdGg9XCIvc2F2ZVwiIGNvbXBvbmVudD17U2F2ZX0gLz5cbiAgICA8L01vZGFsPlxuICA8L1JvdXRlPlxuPC9Sb3V0ZXI+XG4iLCI8c2NyaXB0PlxuICBleHBvcnQgbGV0IG5hbWUgPSBudWxsO1xuICBleHBvcnQgbGV0IHNpemUgPSAxNjtcbjwvc2NyaXB0PlxuXG48c3ZnIHdpZHRoPXtzaXplfSBoZWlnaHQ9e3NpemV9PlxuICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi17bmFtZX1cIiAvPlxuPC9zdmc+XG4iLCI8c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgY29uc3QgU1RBQ0sgPSBbXTtcblxuICBsZXQgaXM7XG4gIGxldCB0O1xuXG4gIGZ1bmN0aW9uIGlzU2VhcmNoKGUpIHtcbiAgICByZXR1cm4gZS50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBlLnRhcmdldC50eXBlID09PSAnc2VhcmNoJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShlKSB7XG4gICAgaWYgKGlzU2VhcmNoKGUpKSB7XG4gICAgICBpcyA9IGUudGFyZ2V0LnZhbHVlLmxlbmd0aCA9PT0gMDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwdXNoKGVsLCBjbG9zZSwgY3VycmVudCwgZmlyc3RFbGVtZW50LCBsYXN0RWxlbWVudCwgbG9hZGluZ0NhbGxiYWNrKSB7XG4gICAgU1RBQ0sucHVzaCh7XG4gICAgICBlbCwgY2xvc2UsIGN1cnJlbnQsIGZpcnN0RWxlbWVudCwgbGFzdEVsZW1lbnQsIGxvYWRpbmdDYWxsYmFjayxcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvcChlKSB7XG4gICAgaWYgKCFTVEFDSy5sZW5ndGgpIHJldHVybjtcblxuICAgIGNvbnN0IHtcbiAgICAgIGVsLCBjbG9zZSwgY3VycmVudCxcbiAgICB9ID0gU1RBQ0tbU1RBQ0subGVuZ3RoIC0gMV07XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IGN1cnJlbnQuZm9jdXMoKSwgNjApO1xuXG4gICAgaWYgKGUgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICBjbG9zZSh7IHRhcmdldDogZWwgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lb3V0KHQpO1xuICAgIHQgPSBzZXRUaW1lb3V0KCgpID0+IFNUQUNLLnBvcCgpLCAxMjApO1xuICB9XG5cbiAgZnVuY3Rpb24gc3luYyhlKSB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gOSAmJiBTVEFDSy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHsgZmlyc3RFbGVtZW50LCBsYXN0RWxlbWVudCwgbG9hZGluZ0NhbGxiYWNrIH0gPSBTVEFDS1tTVEFDSy5sZW5ndGggLSAxXTtcblxuICAgICAgaWYgKGxvYWRpbmdDYWxsYmFjaygpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5zaGlmdEtleSAmJiBlLnRhcmdldCA9PT0gZmlyc3RFbGVtZW50KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGFzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSBpZiAoIWUuc2hpZnRLZXkgJiYgZS50YXJnZXQgPT09IGxhc3RFbGVtZW50KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZmlyc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICBpZiAoaXNTZWFyY2goZSkpIHtcbiAgICAgICAgaWYgKGlzKSBwb3AoZSk7XG4gICAgICB9IGVsc2UgcG9wKGUpO1xuICAgIH1cbiAgfVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHVwZGF0ZSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc3luYyk7XG48L3NjcmlwdD5cblxuPHNjcmlwdD5cbiAgaW1wb3J0IHsgY3JlYXRlRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnc3ZlbHRlJztcblxuICBsZXQgcmVmID0gbnVsbDtcbiAgbGV0IGNzc0NsYXNzID0gJyc7XG4gIGxldCBmaXhlZENsYXNzID0gJyc7XG5cbiAgZXhwb3J0IGxldCBpZCA9ICcnO1xuICBleHBvcnQgbGV0IG1vZGFsID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgbm9mb3JtID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgdmlzaWJsZSA9IG51bGw7XG4gIGV4cG9ydCBsZXQgbG9hZGluZyA9IGZhbHNlO1xuICBleHBvcnQgbGV0IGF1dG9mb2N1cyA9IGZhbHNlO1xuICBleHBvcnQgeyBjc3NDbGFzcyBhcyBjbGFzcyB9O1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCk7XG5cbiAgZnVuY3Rpb24gaGFuZGxlU3VibWl0KGUpIHtcbiAgICBpZiAoZS50YXJnZXQuY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICBkaXNwYXRjaCgnc3VibWl0JywgZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VNZShlKSB7XG4gICAgaWYgKG1vZGFsICYmIHJlZiA9PT0gZS50YXJnZXQpIHtcbiAgICAgIGRpc3BhdGNoKCdjYW5jZWwnLCBlKTtcbiAgICAgIHBvcChlKTtcbiAgICB9XG4gIH1cblxuICAkOiBpZiAocmVmKSB7XG4gICAgaWYgKHZpc2libGUgPT09IGZhbHNlKSBwb3AoKTtcbiAgICBpZiAodmlzaWJsZSkge1xuICAgICAgY29uc3QgZml4ID0gKCduZXRzY2FwZScgaW4gd2luZG93KSAmJiAvIHJ2Oi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSA/ICcnIDogJyxhJzsgLy8gc2tpcCBsaW5rcyBvbiBmaXJlZm94P1xuICAgICAgY29uc3Qgbm9kZXMgPSByZWYucXVlcnlTZWxlY3RvckFsbChgaW5wdXQsc2VsZWN0LGJ1dHRvbix0ZXh0YXJlYSxzdW1tYXJ5JHtmaXh9YCk7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChub2Rlc1tpXS5nZXRBdHRyaWJ1dGUoJ25vZm9jdXMnKSA9PT0gJycgfHwgbm9kZXNbaV0uZGF0YXNldC5ub2ZvY3VzID09PSAnJykgY29udGludWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgaWYgKG5vZGVzW2ldLnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgbm9kZXNbaV0udHlwZSA9PT0gJ2hpZGRlbicpIGNvbnRpbnVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIGlmIChub2Rlc1tpXS5yZWFkT25seSB8fCBub2Rlc1tpXS5kaXNhYmxlZCkgY29udGludWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgaWYgKG5vZGVzW2ldLnRhYkluZGV4ID09PSAtMSkgY29udGludWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgY2hpbGRyZW4ucHVzaChub2Rlc1tpXSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxhc3ROb2RlID0gY2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoIC0gMV07XG4gICAgICBjb25zdCBmaXJzdE5vZGUgPSBjaGlsZHJlblswXTtcblxuICAgICAgcHVzaChyZWYsIGNsb3NlTWUsIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQsIGZpcnN0Tm9kZSwgbGFzdE5vZGUsICgpID0+IGxvYWRpbmcpO1xuXG4gICAgICBpZiAoYXV0b2ZvY3VzKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmIChmaXJzdE5vZGUgJiYgIWxvYWRpbmcpIGZpcnN0Tm9kZS5mb2N1cygpO1xuICAgICAgICB9LCA2MCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJDogZml4ZWRDbGFzcyA9IG1vZGFsID8gJ292ZXJsYXknIDogJ2lubGluZSc7XG4gICQ6IGZpeGVkUHJvcHMgPSB7IC4uLihpZCA/IHsgaWQgfSA6IG51bGwpLCBjbGFzczogY3NzQ2xhc3MgfHwgbnVsbCB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgLnNtb28tZmVuY2UtLW92ZXJsYXkge1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB6LWluZGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAuMyk7XG4gIH1cblxuICAuc21vby1mZW5jZS0td3JhcHBlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgYm94LXNoYWRvdzogMCAycHggM3B4IHJnYmEoMCwgMCwgMCwgLjIpO1xuICB9XG5cbiAgLnNtb28tZmVuY2UtLWxvYWRpbmcge1xuICAgIG9wYWNpdHk6IC4zO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG5cbiAgLnNtb28tZmVuY2UtLWlubGluZSB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB9XG5cbiAgLnNtb28tZmVuY2UtLWZvcm0ge1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gIH1cbjwvc3R5bGU+XG5cbnsjaWYgdmlzaWJsZX1cbiAgPGRpdiBjbGFzcz1cInNtb28tZmVuY2UtLXtmaXhlZENsYXNzfVwiIG9uOmNsaWNrPXtjbG9zZU1lfSBiaW5kOnRoaXM9e3JlZn0gcm9sZT1cImRpYWxvZ1wiPlxuICAgIDxkaXYgY2xhc3M9XCJzbW9vLWZlbmNlLS13cmFwcGVyXCI+XG4gICAgICA8c2xvdCBuYW1lPVwiYmVmb3JlXCIgLz5cblxuICAgICAgPHNsb3QgbmFtZT1cIm1haW5cIiBwcm9wcz17Zml4ZWRQcm9wc30gLz5cbiAgICAgIHsjaWYgIW5vZm9ybX1cbiAgICAgICAgPGZvcm0gey4uLmZpeGVkUHJvcHN9IG9uOnN1Ym1pdHxwcmV2ZW50RGVmYXVsdD17aGFuZGxlU3VibWl0fSBjbGFzczpzbW9vLWZlbmNlLS1sb2FkaW5nPXtsb2FkaW5nfSBjbGFzcz1cInNtb28tZmVuY2UtLWZvcm1cIj5cbiAgICAgICAgICA8c2xvdCAvPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICB7L2lmfVxuXG4gICAgICA8c2xvdCBuYW1lPVwiYWZ0ZXJcIiAvPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbnsvaWZ9XG4iLCI8c2NyaXB0PlxuICBpbXBvcnQgeyBuYXZpZ2F0ZVRvIH0gZnJvbSAneXJ2JztcbiAgaW1wb3J0IHsgRmVuY2UgfSBmcm9tICdzbW9vJztcblxuICBmdW5jdGlvbiBiYWNrKCkge1xuICAgIGlmICh3aW5kb3cuaGlzdG9yeS5sZW5ndGggPiAxKSB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUbygnLycpO1xuICB9XG48L3NjcmlwdD5cbjxGZW5jZSBub2Zvcm0gYXV0b2ZvY3VzIHZpc2libGUgbW9kYWwgb246Y2FuY2VsPXtiYWNrfT5cbiAgPGRpdiBjbGFzcz1cImZvcm1hdG9yIHBcIiBzbG90PVwibWFpblwiPlxuICAgIDxzbG90IHtiYWNrfSAvPlxuICA8L2Rpdj5cbjwvRmVuY2U+XG4iLCI8c2NyaXB0PlxuICBpbXBvcnQgTW9kYWwgZnJvbSAnLi9Nb2RhbC5zdmVsdGUnO1xuICBpbXBvcnQgeyBvcHRpb25zIH0gZnJvbSAnLi9naXN0cyc7XG5cbiAgLyogZ2xvYmFsIEpTT05TY2hlbWFGYWtlciAqL1xuICBjb25zdCBkZWZhdWx0cyA9IEpTT05TY2hlbWFGYWtlci5vcHRpb24uZ2V0RGVmYXVsdHMoKTtcbiAgY29uc3Qgb3B0cyA9IE9iamVjdC5rZXlzKGRlZmF1bHRzKS5tYXAoa2V5ID0+IGdldFR5cGUoa2V5LCBkZWZhdWx0c1trZXldKSk7XG4gIGNvbnN0IHZhbHMgPSBbdW5kZWZpbmVkLCAwLCAtMSwgbnVsbCwgdHJ1ZSwgZmFsc2UsICdzdHJpbmcnLCAnbnVtYmVyJywgJ2ludGVnZXInLCAnYm9vbGVhbicsICdvYmplY3QnLCAnYXJyYXknXTtcblxuICAvLyBGSVhNRTogY29tcG9uZW50aXplIG9wdGlvbnMsIHN1YnNjcmliZSB0byB0aGVtIGFuZCB1cGRhdGUgZ2xvYmFsIGpzZiBvcHRpb25zIG9uIGNoYW5nZVxuICBmdW5jdGlvbiBnZXRUeXBlKGssIHYpIHtcbiAgICBjb25zdCBleHRyYVByb3BzID0ge307XG4gICAgbGV0IGZpeGVkVHlwZTtcblxuICAgIGlmICh0eXBlb2YgdiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBmaXhlZFR5cGUgPSAnY2hlY2tib3gnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdiA9PT0gJ251bWJlcicpIHtcbiAgICAgIGZpeGVkVHlwZSA9ICdudW1iZXInO1xuICAgIH1cblxuICAgIGlmICh2ID09PSBudWxsIHx8IHR5cGVvZiB2ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoayA9PT0gJ21heEl0ZW1zJyB8fCBrID09PSAnbWF4TGVuZ3RoJykge1xuICAgICAgICBmaXhlZFR5cGUgPSAnbnVtYmVyJztcbiAgICAgIH1cblxuICAgICAgaWYgKGsgPT09ICdyYW5kb20nIHx8IGsgPT09ICdvcHRpb25hbHNQcm9iYWJpbGl0eScpIHtcbiAgICAgICAgZXh0cmFQcm9wcy5zdGVwID0gayA9PT0gJ3JhbmRvbScgPyAnMC4wMScgOiAnMC4xJztcbiAgICAgICAgZml4ZWRUeXBlID0gJ251bWJlcic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodikpIHtcbiAgICAgIGZpeGVkVHlwZSA9ICd0ZXh0JztcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSAoJG9wdGlvbnMgJiYgJG9wdGlvbnNba10pIHx8IGRlZmF1bHRzW2tdO1xuXG4gICAgaWYgKGZpeGVkVHlwZSAhPT0gJ2NoZWNrYm94Jykge1xuICAgICAgZXh0cmFQcm9wcy5jbGFzcyA9ICdmIG51bSc7XG4gICAgICBleHRyYVByb3BzLnZhbHVlID0gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICBleHRyYVByb3BzLmNoZWNrZWQgPSByZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKGZpeGVkVHlwZSkge1xuICAgICAgZXh0cmFQcm9wcy50eXBlID0gZml4ZWRUeXBlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5leHRyYVByb3BzLFxuICAgICAgbmFtZTogayxcbiAgICAgIGlkOiBrLFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoZSwgb3B0aW9uKSB7XG4gICAgaWYgKCEkb3B0aW9ucykgJG9wdGlvbnMgPSB7fTtcbiAgICBpZiAob3B0aW9uLnR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAkb3B0aW9uc1tvcHRpb24ubmFtZV0gPSBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbi50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAkb3B0aW9uc1tvcHRpb24ubmFtZV0gPSBlLnRhcmdldC5jaGVja2VkO1xuICAgIH0gZWxzZSAge1xuICAgICAgJG9wdGlvbnNbb3B0aW9uLm5hbWVdID0gZS50YXJnZXQudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgJG9wdGlvbnMgPSBudWxsO1xuXG4gICAgT2JqZWN0LmtleXMoZGVmYXVsdHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbbmFtZT0ke2tleX1dYCk7XG4gICAgICBjb25zdCB7IHR5cGUsIHZhbHVlIH0gPSBnZXRUeXBlKGtleSwgZGVmYXVsdHNba2V5XSk7XG5cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIG5vZGUudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgbm9kZS52YWx1ZSA9IHZhbHVlLmpvaW4oJywnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUudmFsdWUgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuPC9zY3JpcHQ+XG5cbjxNb2RhbCBsZXQ6YmFjaz5cbiAgUmVmZXJlbmNlOiA8YSBocmVmPVwiLy9naXRodWIuY29tL2pzb24tc2NoZW1hLWZha2VyL2pzb24tc2NoZW1hLWZha2VyL3RyZWUvbWFzdGVyL2RvY3MjYXZhaWxhYmxlLW9wdGlvbnNcIiB0YXJnZXQ9XCJfYmxhbmtcIj5hdmFpbGFibGUgb3B0aW9uczwvYT5cblxuICA8aHIgLz5cblxuICA8aDQ+Rm9ybWF0b3I8L2g0PlxuICA8IS0tIDxmb3JtIG9uOnN1Ym1pdHxwcmV2ZW50RGVmYXVsdD5cbiAgICA8dWwgY2xhc3M9XCJsclwiPlxuICAgICAgeyNlYWNoIG9wdHMgYXMgb3B0aW9ufVxuICAgICAgICA8bGkgY2xhc3M9XCJub3NsIGZseCBtYlwiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9e29wdGlvbi5pZH0gY2xhc3M9XCJjbC02XCI+e29wdGlvbi5uYW1lfTwvbGFiZWw+XG4gICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICB7I2lmIG9wdGlvbi50eXBlfVxuICAgICAgICAgICAgICA8aW5wdXQgey4uLm9wdGlvbn0gb246Y2hhbmdlPXtlID0+IHVwZGF0ZShlLCBvcHRpb24pfT5cbiAgICAgICAgICAgIHs6ZWxzZX1cbiAgICAgICAgICAgICAgPHNlbGVjdCB7Li4ub3B0aW9ufSBvbjpjaGFuZ2U9e2UgPT4gdXBkYXRlKGUsIG9wdGlvbil9PlxuICAgICAgICAgICAgICAgIHsjZWFjaCB2YWxzIGFzIHZhbHVlfVxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB7dmFsdWV9IHNlbGVjdGVkPXt2YWx1ZSA9PT0gb3B0aW9uLnZhbHVlfT57dHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyA/IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6ICcnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIHsvZWFjaH1cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICB7L2lmfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICAgIHsvZWFjaH1cbiAgICA8L3VsPlxuICAgIDxidXR0b24gY2xhc3M9XCJidVwiIG9uOmNsaWNrPXtyZXNldH0gZGlzYWJsZWQ9eyRvcHRpb25zID09PSBudWxsfT5SZXNldCB0byBkZWZhdWx0czwvYnV0dG9uPlxuICAgIDxidXR0b24gY2xhc3M9XCJidVwiIG9uOmNsaWNrPXtiYWNrfT5BcHBseTwvYnV0dG9uPlxuICA8L2Zvcm0+IC0tPlxuXG4gIDxociAvPlxuXG4gIDxhIGhyZWY9XCIjZ2lzdC9kYTBhZjQ2MTFjYjU2MjJiNTRhZmY1NzI4MzU2MGRhM1wiPmJvb2xlYW48L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0LzQxOTljYTkwZmI1Y2QwNTMzNzgyNGIwNjk1ZDE3YjVlXCI+aW50ZWdlcjwvYT4gfFxuICA8YSBocmVmPVwiI2dpc3QvZDllMjc1NDNkODQxNTdjMTY3MmY4N2U5M2FjMjUwY2NcIj5pbm5lci1yZWZlcmVuY2VzPC9hPiB8XG4gIDxhIGhyZWY9XCIjZ2lzdC81ZjgxZjExOGZiZDRlYWMwMWNjYWNmMjNhMDYxYThiOVwiPmV4dGVybmFsLXJlZmVyZW5jZXM8L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0L2NiYjQ4NzFkMWQyZjQ0NzYwZGRhZmRhYTA1NmUxOTI2XCI+ZW51bXM8L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0LzFmMTE5Njg0NGJlYWQ5NmUwMjFmZmJkNTk3ZWRjZmZhXCI+Zml4ZWQgdmFsdWVzPC9hPiB8XG4gIDxhIGhyZWY9XCIjZ2lzdC9mNGFkMTgxODczNWYwZDBiYWJkYzFmMTJiOTIwMTNmMVwiPm4tdGltZXMgcmVwZWF0ZWQ8L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0LzE5MDI3MzdlN2JlZjk1NzNhZjAyYTNmYzQ5NzYxYzEzXCI+ZmFrZXItcHJvcGVydGllczwvYT4gfFxuICA8YSBocmVmPVwiI2dpc3QvMWE3ZGIxNzMzNjJiMTI3YTgyNmE1YzJmYTdkZTc1NjFcIj5mYWtlci5mYWtlKCk8L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0LzVkZDM2NGFhZDJkNDg3MjllZmZmNjg2YzVmN2M0NGIyXCI+Y2hhbmNlLWd1aWQ8L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0LzY4MmY5N2EyZTI4ZTIzMGI1MTgxMGM1NWI5MmY0Y2RjXCI+Y2hhbmNlLW5hbWU8L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0LzQyNmMyZDE3NzI0M2NkMmM1MjU5NGY5MmMxYTc4NjJlXCI+Y2hhbmNlLXByb3BlcnRpZXM8L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0L2QzZTc1YjIyYWQzM2U0NDQwZGYxOWUwY2MwNjBjOWYzLzAuNS4wLXJjM1wiPnJlbW90ZS1zY2hlbWFzICheMC41LngpPC9hPlxuXG4gIDxociAvPlxuXG4gIDxhIGhyZWY9XCJodHRwOi8vanNvbi1zY2hlbWEub3JnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SlNPTi1TY2hlbWEub3JnPC9hPiB8XG4gIDxhIGhyZWY9XCIvL2dpdGh1Yi5jb20vanNvbi1zY2hlbWEtZmFrZXIvanNvbi1zY2hlbWEtZmFrZXIvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+R2l0SHViPC9hPiAvIDxhIGhyZWY9XCIvL3RyYXZpcy1jaS5vcmcvanNvbi1zY2hlbWEtZmFrZXIvanNvbi1zY2hlbWEtZmFrZXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj5DSTwvYT4gfFxuICA8YSBocmVmPVwiLy9naXRodWIuY29tL2pzb24tc2NoZW1hLWZha2VyL2pzb24tc2NoZW1hLWZha2VyL2lzc3Vlcy9uZXdcIiB0YXJnZXQ9XCJfYmxhbmtcIj5Db250cmlidXRpb248L2E+IHxcbiAgPGEgaHJlZj1cIi8vZ2l0aHViLmNvbS9qc29uLXNjaGVtYS1mYWtlci9hbmd1bGFyLWpzZlwiIHRhcmdldD1cIl9ibGFua1wiPkFuZ3VsYXJKUyBtb2R1bGU8L2E+IHxcbiAgPGEgaHJlZj1cIi8vZ2l0aHViLmNvbS9qc29uLXNjaGVtYS1mYWtlci9ncnVudC1qc29uc2NoZW1hLWZha2VyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+R3J1bnQgcGx1Z2luPC9hPiB8XG4gIDxhIGhyZWY9XCIvL2dpdGh1Yi5jb20vanNvbi1zY2hlbWEtZmFrZXIvanNvbi1zY2hlbWEtc2VydmVyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SlNGIFNlcnZlcjwvYT5cbjwvTW9kYWw+XG4iLCI8c2NyaXB0PlxuICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcbiAgaW1wb3J0IHsgbmF2aWdhdGVUbyB9IGZyb20gJ3lydic7XG4gIGltcG9ydCB7IGFsbCwgbG9nZ2VkSW4gfSBmcm9tICcuL2dpc3RzJztcblxuICBsZXQgdGVybSA9ICcnO1xuICBsZXQgZGF0YSA9IFtdO1xuICBsZXQgcGVuZGluZyA9IHRydWU7XG5cbiAgb25Nb3VudChhc3luYyAoKSA9PiB7XG4gICAgaWYgKCRsb2dnZWRJbikgZGF0YSA9IGF3YWl0IGFsbCgpO1xuICAgIHBlbmRpbmcgPSBmYWxzZTtcbiAgfSk7XG5cbiAgJDogZmlsdGVyZWQgPSBkYXRhLmZpbHRlcih4ID0+XG4gICAgIXRlcm1cbiAgICB8fCB4LmRlc2NyaXB0aW9uLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModGVybS50b0xvd2VyQ2FzZSgpKVxuICAgIHx8IE9iamVjdC5rZXlzKHguZmlsZXMpLnNvbWUoayA9PiBrLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModGVybS50b0xvd2VyQ2FzZSgpKSkpO1xuPC9zY3JpcHQ+XG48bGFiZWwgY2xhc3M9XCJtYiBmbHggZmx4LWMgbm9zbFwiPlxuICA8c3Bhbj5GaWx0ZXIgZ2lzdHM6PC9zcGFuPlxuICA8aW5wdXQgY2xhc3M9XCJmIHR4dCBtbCBmbHgtYVwiIHR5cGU9XCJzZWFyY2hcIiBiaW5kOnZhbHVlPXt0ZXJtfSAvPlxuPC9sYWJlbD5cbnsjaWYgJGxvZ2dlZElufVxuICB7I2lmIHBlbmRpbmd9XG4gICAgTG9hZGluZyBnaXN0cy4uLlxuICB7OmVsc2V9XG4gICAgPG9sIGNsYXNzPVwibHIgemIgbWF4XCI+XG4gICAgICB7I2VhY2ggZmlsdGVyZWQgYXMgaXRlbX1cbiAgICAgICAgPGxpIGNsYXNzPVwibWIgbmlcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmx4IGZseC1jXCI+XG4gICAgICAgICAgICA8YSBjbGFzcz1cInRkbiB0ciBmbHgtYVwiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJ7aXRlbS5odG1sX3VybH1cIj57aXRlbS5kZXNjcmlwdGlvbiB8fCBpdGVtLmlkfTwvYT5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidSBtaW4gdHIgbm9zbFwiIG9uOmNsaWNrPXsoKSA9PiBuYXZpZ2F0ZVRvKGAvI2dpc3QvJHtpdGVtLmlkfWApfT5Mb2FkIGdpc3Q8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dWwgY2xhc3M9XCJsclwiPlxuICAgICAgICAgICAgeyNlYWNoIE9iamVjdC5lbnRyaWVzKGl0ZW0uZmlsZXMpIGFzIFtmaWxlLCBpbmZvXX1cbiAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibmlcIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImFyciBibFwiIHRpdGxlPVwiVHlwZToge2luZm8udHlwZX1cIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwie2luZm8ucmF3X3VybH1cIj57ZmlsZX0gJm1kYXNoOyB7KGluZm8uc2l6ZSAvIDEwMjQpLnRvRml4ZWQoMil9S0I8L2E+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9saT5cbiAgICAgIHsvZWFjaH1cbiAgICA8L29sPlxuICB7L2lmfVxuey9pZn1cbiIsIjxzY3JpcHQ+XG4gIGltcG9ydCB7IG9uTW91bnQsIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciB9IGZyb20gJ3N2ZWx0ZSc7XG5cbiAgbGV0IGNzc0NsYXNzID0gJyc7XG5cbiAgZXhwb3J0IGxldCBtb2RlID0gJ2phdmFzY3JpcHQnO1xuICBleHBvcnQgbGV0IHRoZW1lID0gJ2dpdGh1Yic7XG4gIGV4cG9ydCBsZXQgdmFsdWUgPSAnJztcbiAgZXhwb3J0IGxldCByZWFkb25seSA9IGZhbHNlO1xuXG4gIGV4cG9ydCB7IGNzc0NsYXNzIGFzIGNsYXNzIH07XG5cbiAgbGV0IHRhcmdldDtcbiAgbGV0IHRhcmdldEVsZW1lbnQ7XG5cbiAgY29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXIoKTtcblxuICAvKiBnbG9iYWwgYWNlICovXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIHRhcmdldEVsZW1lbnQgPSBhY2UuZWRpdCh0YXJnZXQpO1xuICAgIHRhcmdldEVsZW1lbnQuc2Vzc2lvbi5zZXRUYWJTaXplKDIpO1xuICAgIHRhcmdldEVsZW1lbnQuc2V0U2hvd1ByaW50TWFyZ2luKGZhbHNlKTtcbiAgICB0YXJnZXRFbGVtZW50LnNldE9wdGlvbignc2hvd0xpbmVOdW1iZXJzJywgZmFsc2UpO1xuXG4gICAgaWYgKHJlYWRvbmx5KSB0YXJnZXRFbGVtZW50LnNldFJlYWRPbmx5KHRydWUpO1xuXG4gICAgdGFyZ2V0RWxlbWVudC5zZXNzaW9uLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBkaXNwYXRjaCgnY2hhbmdlJywgdGFyZ2V0RWxlbWVudC5nZXRWYWx1ZSgpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB0YXJnZXRFbGVtZW50LmRlc3Ryb3koKTtcbiAgfSk7XG5cbiAgJDogaWYgKHRhcmdldEVsZW1lbnQpIHtcbiAgICBpZiAodGFyZ2V0RWxlbWVudC5nZXRWYWx1ZSgpICE9PSB2YWx1ZSkge1xuICAgICAgdGFyZ2V0RWxlbWVudC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICB0YXJnZXRFbGVtZW50LmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgdGFyZ2V0RWxlbWVudC5zZXRUaGVtZShgYWNlL3RoZW1lLyR7dGhlbWV9YCk7XG4gICAgdGFyZ2V0RWxlbWVudC5zZXNzaW9uLnNldE1vZGUoYGFjZS9tb2RlLyR7bW9kZX1gKTtcbiAgfVxuPC9zY3JpcHQ+XG5cbjxkaXYgY2xhc3M9XCJBY2Utd3JhcHBlciByZWxcIj5cbiAgPGRpdiBjbGFzcz1cIkFjZSB7Y3NzQ2xhc3N9XCIgYmluZDp0aGlzPXt0YXJnZXR9IC8+XG4gIDxzbG90IC8+XG48L2Rpdj5cbiIsIjxzY3JpcHQ+XG4gIGltcG9ydCB7IHJvdXRlciB9IGZyb20gJ3lydic7XG4gIGltcG9ydCBJY29uIGZyb20gJy4vSWNvbi5zdmVsdGUnO1xuICBpbXBvcnQgQWNlIGZyb20gJy4vQWNlLnN2ZWx0ZSc7XG4gIGltcG9ydCBUb2dnbGUgZnJvbSAnLi9Ub2dnbGUuc3ZlbHRlJztcbiAgaW1wb3J0IHsgc2NoZW1hcywgY3VycmVudCwgb3B0aW9ucywgbG9hZEZyb20gfSBmcm9tICcuL2dpc3RzJztcblxuICBjb25zdCBpbml0aWFsTG9jYXRpb25IYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cbiAgbGV0IGRhdGE7XG4gIGxldCBpbnB1dDtcbiAgbGV0IGJ1ZmZlcjtcbiAgbGV0IHNlbGVjdGVkO1xuICBsZXQgaXNBZGRpbmc7XG4gIGxldCBpc0VkaXRpbmc7XG4gIGxldCBwcmV2aXVzVVJMO1xuXG4gIGxldCB2YWx1ZSA9IG51bGw7XG4gIGxldCBpc1lBTUwgPSBmYWxzZTtcbiAgbGV0IEVuY29kZXIgPSBKU09OO1xuICBsZXQgcGVuZGluZyA9IHRydWU7XG4gIGxldCBlZGl0SW5wdXQgPSAne30nO1xuICBsZXQgb3V0cHV0TW9kZSA9ICdqc29uJztcbiAgbGV0IG9iamVjdE91dHB1dCA9ICd7fSc7XG5cbiAgZnVuY3Rpb24gY2xvc2UoZSkge1xuICAgIGlmIChpbnB1dCAmJiAoaXNBZGRpbmcgfHwgaXNFZGl0aW5nKSkge1xuICAgICAgaWYgKGlzQWRkaW5nKSB7XG4gICAgICAgICRjdXJyZW50ID0gc2VsZWN0ZWQgfHwgJHNjaGVtYXNbJHNjaGVtYXMubGVuZ3RoIC0gMV07XG4gICAgICB9XG5cbiAgICAgIGlzQWRkaW5nID0gZmFsc2U7XG4gICAgICBpc0VkaXRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3QoZSwgZWRpdCkge1xuICAgICRjdXJyZW50ID0gc2VsZWN0ZWQgPSBlO1xuICAgIGlzQWRkaW5nID0gZmFsc2U7XG4gICAgaXNFZGl0aW5nID0gISFlZGl0O1xuXG4gICAgaWYgKGVkaXQpIHNldFRpbWVvdXQoKCkgPT4gaW5wdXQuc2VsZWN0KCksIDYwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZShlKSB7XG4gICAgaWYgKCFjb25maXJtKGBUaGlzIGFjdGlvbiB3aWxsIHJlbW92ZSB0aGUgJyR7ZS5maWxlbmFtZX0nIGZpbGUuXFxuXFxuQXJlIHlvdSBzdXJlP2AudHJpbSgpKSkgcmV0dXJuO1xuXG4gICAgY29uc3Qgb2Zmc2V0ID0gJHNjaGVtYXMuaW5kZXhPZihlKTtcblxuICAgICRzY2hlbWFzID0gJHNjaGVtYXMuZmlsdGVyKHggPT4geCAhPT0gZSk7XG5cbiAgICBpZiAoZS5maWxlbmFtZSA9PT0gJGN1cnJlbnQuZmlsZW5hbWUpIHtcbiAgICAgIGJ1ZmZlciA9IGVkaXRJbnB1dCA9ICcnO1xuICAgICAgJGN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlKGUpIHtcbiAgICBjb25zdCBpc1ZhbGlkID0gL15bYS16QS1aMC05XyMkJV1bXFx3Ll0qPyQvLnRlc3QoZS50YXJnZXQudmFsdWUpO1xuXG4gICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQnKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICghZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnZhbGlkJykpIHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2ludmFsaWQnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoZSkge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSBjbG9zZSgpO1xuICAgIGlmICh2YWxpZGF0ZShlKSAmJiBlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAkY3VycmVudC5maWxlbmFtZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgaXNFZGl0aW5nID0gZmFsc2U7XG4gICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN1Ym1pdChlKSB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIGNsb3NlKCk7XG4gICAgaWYgKHZhbGlkYXRlKGUpICYmIGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICRzY2hlbWFzID0gJHNjaGVtYXMuY29uY2F0KHsgZmlsZW5hbWU6IGUudGFyZ2V0LnZhbHVlLCBjb250ZW50OiBidWZmZXIgfSk7XG4gICAgICAkY3VycmVudCA9ICRzY2hlbWFzWyRzY2hlbWFzLmxlbmd0aCAtIDFdO1xuICAgICAgaXNBZGRpbmcgPSBmYWxzZTtcbiAgICAgIGUudGFyZ2V0LnZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgLy8gRklYTUU6IGhvdyBmb3JtYXR0aW5nIHNob3VsZCB3b3JrP1xuICAvLyBpdCBzaG91bGQgbm90IGFmZmVjdCBjdXJyZW50IHN0YXRlLCBqdXN0IGZvcm1hdHRpbmchXG4gIGZ1bmN0aW9uIHJlZnJlc2goKSB7XG4gICAgdHJ5IHtcbiAgICAgIGVkaXRJbnB1dCA9IEpTT04uc3RyaW5naWZ5KEpTT04ucGFyc2UoJGN1cnJlbnQuY29udGVudCksIG51bGwsIDIpO1xuICAgICAgLy8gaWYgKGlzWUFNTCkge1xuICAgICAgLy8gICAvLyBvdXRwdXRNb2RlID0gJ3lhbWwnO1xuICAgICAgLy8gICAvLyBFbmNvZGVyID0gWUFNTDtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvLyAgIGVkaXRJbnB1dCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlLCBudWxsLCAyKTtcbiAgICAgIC8vICAgLy8gb3V0cHV0TW9kZSA9ICdqc29uJztcbiAgICAgIC8vICAgLy8gRW5jb2RlciA9IEpTT047XG4gICAgICAvLyB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZWRpdElucHV0ID0gJGN1cnJlbnQuY29udGVudDtcbiAgICAgIC8vIG91dHB1dE1vZGUgPSAnanNvbic7XG4gICAgICAvLyBFbmNvZGVyID0gSlNPTjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXQoZSkge1xuICAgIHZhbHVlID0gRW5jb2Rlci5wYXJzZSgkY3VycmVudC5jb250ZW50KTtcbiAgICBpc1lBTUwgPSBlLmRldGFpbDtcbiAgICByZWZyZXNoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBzeW5jKGUpIHtcbiAgICBidWZmZXIgPSBlLmRldGFpbDtcbiAgICBpZiAoJGN1cnJlbnQpICRjdXJyZW50LmNvbnRlbnQgPSBidWZmZXI7XG4gIH1cblxuICBmdW5jdGlvbiBhZGQoKSB7XG4gICAgYnVmZmVyID0gZWRpdElucHV0ID0gJyc7XG4gICAgc2VsZWN0ZWQgPSAkY3VycmVudDtcbiAgICBpc0FkZGluZyA9IHRydWU7XG4gICAgJGN1cnJlbnQgPSBudWxsO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiBpbnB1dC5mb2N1cygpLCA2MCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZW4oKSB7XG4gICAgY29uc3Qgb3B0cyA9IHsgLi4uJG9wdGlvbnMgfTtcbiAgICBjb25zdCB2YWx1ZSA9IG9wdHMucmFuZG9tO1xuXG4gICAgb3B0cy5yYW5kb20gPSB2YWx1ZVxuICAgICAgPyAoKCkgPT4gdmFsdWUpXG4gICAgICA6IE1hdGgucmFuZG9tO1xuXG4gICAgbGV0IHNjaGVtYSA9IHt9O1xuICAgIGxldCByZWZzID0gW107XG5cbiAgICB0cnkge1xuICAgICAgc2NoZW1hID0gRW5jb2Rlci5wYXJzZSgkY3VycmVudC5jb250ZW50KTtcbiAgICAgIHJlZnMgPSAkc2NoZW1hcy5tYXAoeCA9PiBFbmNvZGVyLnBhcnNlKHguY29udGVudCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG5cbiAgICBKU09OU2NoZW1hRmFrZXIub3B0aW9uKG9wdHMpO1xuICAgIEpTT05TY2hlbWFGYWtlci5yZXNvbHZlKHNjaGVtYSwgcmVmcylcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7IG9iamVjdE91dHB1dCA9IEVuY29kZXIuc3RyaW5naWZ5KHJlc3VsdCwgbnVsbCwgMik7IH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gYWxlcnQoZXJyb3IubWVzc2FnZSkpO1xuICB9XG5cbiAgcm91dGVyLnN1YnNjcmliZShhc3luYyBpbmZvID0+IHtcbiAgICBpZiAoIXdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8IHdpbmRvdy5sb2NhdGlvbi5oYXNoLm1hdGNoKC9eIyhvcHRpb25zfHNlc3Npb24pLykpIHtcbiAgICAgIHBlbmRpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5wYXRoID09PSBwcmV2aXVzVVJMKSByZXR1cm47XG4gICAgcHJldml1c1VSTCA9IGluZm8ucGF0aDtcblxuICAgIGRhdGEgPSBhd2FpdCBsb2FkRnJvbShpbmZvLnBhdGguc3Vic3RyKDEpKTtcbiAgICBidWZmZXIgPSBlZGl0SW5wdXQgPSAnJztcbiAgICBwZW5kaW5nID0gZmFsc2U7XG4gICAgaXNBZGRpbmcgPSBmYWxzZTtcbiAgICBpc0VkaXRpbmcgPSBmYWxzZTtcblxuICAgICRzY2hlbWFzID0gT2JqZWN0LmtleXMoZGF0YS5maWxlcylcbiAgICAgIC5maWx0ZXIoeCA9PiBbJ3RleHQvcGxhaW4nLCAnYXBwbGljYXRpb24vanNvbiddLmluY2x1ZGVzKGRhdGEuZmlsZXNbeF0udHlwZSkpXG4gICAgICAucmVkdWNlKChwcmV2LCBjdXIpID0+IHtcbiAgICAgICAgcHJldi5wdXNoKGRhdGEuZmlsZXNbY3VyXSk7XG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgfSwgW10pO1xuXG4gICAgJGN1cnJlbnQgPSAkc2NoZW1hc1swXTtcbiAgfSk7XG5cbiAgJDogaWYgKCRjdXJyZW50KSB7XG4gICAgcmVmcmVzaCgpO1xuICB9IGVsc2Uge1xuICAgIG9iamVjdE91dHB1dCA9ICd7fSc7XG4gICAgYnVmZmVyID0gZWRpdElucHV0ID0gJyc7XG4gICAgJGN1cnJlbnQgPSB7IGNvbnRlbnQ6ICcnIH07XG4gIH1cbjwvc2NyaXB0PlxuXG48ZGl2IGNsYXNzPVwibm9zbFwiPlxuICB7I2lmIHBlbmRpbmd9XG4gICAgTG9hZGluZyBnaXN0Li4uXG4gIHs6ZWxzZX1cbiAgICA8ZGl2IGNsYXNzPVwiZmx4IFRhYnNcIj5cbiAgICAgIHsjZWFjaCAkc2NoZW1hcyBhcyBpbmZvfVxuICAgICAgICB7I2lmICRjdXJyZW50ID09PSBpbmZvfVxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VsXCI+XG4gICAgICAgICAgICB7I2lmIGlzRWRpdGluZ31cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwibmJcIiBvbjpibHVyPXtjbG9zZX0gb246a2V5dXA9e3VwZGF0ZX0gYmluZDp0aGlzPXtpbnB1dH0gdHlwZT1cInRleHRcIiBzcGVsbGNoZWNrPVwiZmFsc2VcIiB2YWx1ZT17aW5mby5maWxlbmFtZX0gLz5cbiAgICAgICAgICAgIHs6ZWxzZX1cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkaWJcIiBvbjpkYmxjbGljaz17KCkgPT4gc2VsZWN0KGluZm8sIHRydWUpfT57aW5mby5maWxlbmFtZX08L3NwYW4+XG4gICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm5iIHgtY2xvc2VcIiBvbjpjbGljaz17KCkgPT4gcmVtb3ZlKGluZm8pfT4mdGltZXM7PC9idXR0b24+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICB7OmVsc2V9XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmbHhcIj5cbiAgICAgICAgICAgIDxidXR0b24gb246Y2xpY2s9eygpID0+IHNlbGVjdChpbmZvKX0+e2luZm8uZmlsZW5hbWV9PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibmIgeC1jbG9zZVwiIG9uOmNsaWNrPXsoKSA9PiByZW1vdmUoaW5mbyl9PiZ0aW1lczs8L2J1dHRvbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIHsvaWZ9XG4gICAgICB7L2VhY2h9XG4gICAgICAgIHsjaWYgaXNBZGRpbmd9XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWxcIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIm5iXCIgb246Ymx1cj17Y2xvc2V9IG9uOmtleXVwPXtzdWJtaXR9IGJpbmQ6dGhpcz17aW5wdXR9IHR5cGU9XCJ0ZXh0XCIgc3BlbGxjaGVjaz1cImZhbHNlXCIgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIHs6ZWxzZX1cbiAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhIG5iIG5ia1wiIG9uOmNsaWNrPXthZGR9PlxuICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwicGx1c1wiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIHsvaWZ9XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1kLWZseFwiPlxuICAgICAgPEFjZSBtb2RlPXtvdXRwdXRNb2RlfSB2YWx1ZT17ZWRpdElucHV0fSBvbjpjaGFuZ2U9e3N5bmN9PlxuICAgICAgICA8IS0tPGRpdiBjbGFzcz1cImFicyByMCB0MFwiPlxuICAgICAgICAgIDxUb2dnbGUgb249XCJZQU1MXCIgb2ZmPVwiSlNPTlwiIG9uOmNoYW5nZT17Zm9ybWF0fSB2YWx1ZT17aXNZQU1MfSAvPlxuICAgICAgICA8L2Rpdj4tLT5cbiAgICAgIDwvQWNlPlxuICAgICAgPEFjZSBtb2RlPXtvdXRwdXRNb2RlfSB2YWx1ZT17b2JqZWN0T3V0cHV0fSByZWFkb25seT5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhYnMgcjAgdDBcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnVcIiBvbjpjbGljaz17Z2VufT5HZW5lcmF0ZTwvYnV0dG9uPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L0FjZT5cbiAgICA8L2Rpdj5cbiAgey9pZn1cbjwvZGl2PlxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUVBLFdBQU8sZUFBZSxTQUFTLGNBQWMsRUFBRSxPQUFPO0FBRXRELHFCQUFnQjtBQUFBO0FBQ2hCLFFBQU0sV0FBVyxPQUFLO0FBQ3RCLHFCQUFnQixLQUFLLEtBQUs7QUFFdEIsaUJBQVcsS0FBSztBQUNaLFlBQUksS0FBSyxJQUFJO0FBQ2pCLGFBQU87QUFBQTtBQUVYLHdCQUFvQixPQUFPO0FBQ3ZCLGFBQU8sU0FBUyxPQUFPLFVBQVUsWUFBWSxPQUFPLE1BQU0sU0FBUztBQUFBO0FBRXZFLDBCQUFzQixVQUFTLE1BQU0sTUFBTSxRQUFRLE1BQU07QUFDckQsZUFBUSxnQkFBZ0I7QUFBQSxRQUNwQixLQUFLLEVBQUUsTUFBTSxNQUFN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
