var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

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
      return /* @__PURE__ */ Object.create(null);
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
    var src_url_equal_anchor;
    function src_url_equal(element_src, url2) {
      if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement("a");
      }
      src_url_equal_anchor.href = url2;
      return element_src === src_url_equal_anchor.href;
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
    function update_slot_base2(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
      if (slot_changes) {
        const slot_context = get_slot_context2(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
      }
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
      const slot_changes = get_slot_changes2(slot_definition, $$scope, dirty, get_slot_changes_fn);
      update_slot_base2(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn);
    }
    function get_all_dirty_from_scope2($$scope) {
      if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
          dirty[i] = -1;
        }
        return dirty;
      }
      return -1;
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
    function set_store_value2(store, ret, value) {
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
    var tasks = /* @__PURE__ */ new Set();
    function run_tasks(now) {
      tasks.forEach((task) => {
        if (!task.c(now)) {
          tasks.delete(task);
          task.f();
        }
      });
      if (tasks.size !== 0)
        exports.raf(run_tasks);
    }
    function clear_loops() {
      tasks.clear();
    }
    function loop(callback) {
      let task;
      if (tasks.size === 0)
        exports.raf(run_tasks);
      return {
        promise: new Promise((fulfill) => {
          tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
          tasks.delete(task);
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
      let children3 = target.childNodes;
      if (target.nodeName === "HEAD") {
        const myChildren = [];
        for (let i = 0; i < children3.length; i++) {
          const node = children3[i];
          if (node.claim_order !== void 0) {
            myChildren.push(node);
          }
        }
        children3 = myChildren;
      }
      const m = new Int32Array(children3.length + 1);
      const p = new Int32Array(children3.length);
      m[0] = -1;
      let longest = 0;
      for (let i = 0; i < children3.length; i++) {
        const current3 = children3[i].claim_order;
        const seqLen = (longest > 0 && children3[m[longest]].claim_order <= current3 ? longest + 1 : upper_bound(1, longest, (idx) => children3[m[idx]].claim_order, current3)) - 1;
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
      target.appendChild(node);
    }
    function append_styles2(target, style_sheet_id, styles) {
      const append_styles_to = get_root_for_style2(target);
      if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = element2("style");
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet2(append_styles_to, style);
      }
    }
    function get_root_for_style2(node) {
      if (!node)
        return document;
      const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
      if (root && root.host) {
        return root;
      }
      return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
      const style_element = element2("style");
      append_stylesheet2(get_root_for_style2(node), style_element);
      return style_element.sheet;
    }
    function append_stylesheet2(node, style) {
      append2(node.head || node, style);
      return style.sheet;
    }
    function append_hydration(target, node) {
      if (is_hydrating2) {
        init_hydrate(target);
        if (target.actual_end_child === void 0 || target.actual_end_child !== null && target.actual_end_child.parentNode !== target) {
          target.actual_end_child = target.firstChild;
        }
        while (target.actual_end_child !== null && target.actual_end_child.claim_order === void 0) {
          target.actual_end_child = target.actual_end_child.nextSibling;
        }
        if (node !== target.actual_end_child) {
          if (node.claim_order !== void 0 || node.parentNode !== target) {
            target.insertBefore(node, target.actual_end_child);
          }
        } else {
          target.actual_end_child = node.nextSibling;
        }
      } else if (node.parentNode !== target || node.nextSibling !== null) {
        target.appendChild(node);
      }
    }
    function insert2(target, node, anchor) {
      target.insertBefore(node, anchor || null);
    }
    function insert_hydration(target, node, anchor) {
      if (is_hydrating2 && !anchor) {
        append_hydration(target, node);
      } else if (node.parentNode !== target || node.nextSibling != anchor) {
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
    function trusted(fn) {
      return function(event) {
        if (event.isTrusted)
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
      const value = /* @__PURE__ */ new Set();
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
    function init_claim_info(nodes) {
      if (nodes.claim_info === void 0) {
        nodes.claim_info = { last_index: 0, total_claimed: 0 };
      }
    }
    function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
      init_claim_info(nodes);
      const resultNode = (() => {
        for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
          const node = nodes[i];
          if (predicate(node)) {
            const replacement = processNode(node);
            if (replacement === void 0) {
              nodes.splice(i, 1);
            } else {
              nodes[i] = replacement;
            }
            if (!dontUpdateLastIndex) {
              nodes.claim_info.last_index = i;
            }
            return node;
          }
        }
        for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
          const node = nodes[i];
          if (predicate(node)) {
            const replacement = processNode(node);
            if (replacement === void 0) {
              nodes.splice(i, 1);
            } else {
              nodes[i] = replacement;
            }
            if (!dontUpdateLastIndex) {
              nodes.claim_info.last_index = i;
            } else if (replacement === void 0) {
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
    function claim_element_base(nodes, name, attributes, create_element) {
      return claim_node(nodes, (node) => node.nodeName === name, (node) => {
        const remove = [];
        for (let j = 0; j < node.attributes.length; j++) {
          const attribute = node.attributes[j];
          if (!attributes[attribute.name]) {
            remove.push(attribute.name);
          }
        }
        remove.forEach((v) => node.removeAttribute(v));
        return void 0;
      }, () => create_element(name));
    }
    function claim_element(nodes, name, attributes) {
      return claim_element_base(nodes, name, attributes, element2);
    }
    function claim_svg_element(nodes, name, attributes) {
      return claim_element_base(nodes, name, attributes, svg_element2);
    }
    function claim_text(nodes, data) {
      return claim_node(
        nodes,
        (node) => node.nodeType === 3,
        (node) => {
          const dataStr = "" + data;
          if (node.data.startsWith(dataStr)) {
            if (node.data.length !== dataStr.length) {
              return node.splitText(dataStr.length);
            }
          } else {
            node.data = dataStr;
          }
        },
        () => text2(data),
        true
        // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
      );
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
    function claim_html_tag(nodes, is_svg) {
      const start_index = find_comment(nodes, "HTML_TAG_START", 0);
      const end_index = find_comment(nodes, "HTML_TAG_END", start_index);
      if (start_index === end_index) {
        return new HtmlTagHydration(void 0, is_svg);
      }
      init_claim_info(nodes);
      const html_tag_nodes = nodes.splice(start_index, end_index - start_index + 1);
      detach2(html_tag_nodes[0]);
      detach2(html_tag_nodes[html_tag_nodes.length - 1]);
      const claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);
      for (const n of claimed_nodes) {
        n.claim_order = nodes.claim_info.total_claimed;
        nodes.claim_info.total_claimed += 1;
      }
      return new HtmlTagHydration(claimed_nodes, is_svg);
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
      if (value === null) {
        node.style.removeProperty(key);
      } else {
        node.style.setProperty(key, value, important ? "important" : "");
      }
    }
    function select_option2(select, value) {
      for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
          option.selected = true;
          return;
        }
      }
      select.selectedIndex = -1;
    }
    function select_options2(select, value) {
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
    function custom_event2(type, detail, { bubbles = false, cancelable = false } = {}) {
      const e = document.createEvent("CustomEvent");
      e.initCustomEvent(type, bubbles, cancelable, detail);
      return e;
    }
    function query_selector_all(selector, parent = document.body) {
      return Array.from(parent.querySelectorAll(selector));
    }
    var HtmlTag = class {
      constructor(is_svg = false) {
        this.is_svg = false;
        this.is_svg = is_svg;
        this.e = this.n = null;
      }
      c(html) {
        this.h(html);
      }
      m(html, target, anchor = null) {
        if (!this.e) {
          if (this.is_svg)
            this.e = svg_element2(target.nodeName);
          else
            this.e = element2(target.nodeName);
          this.t = target;
          this.c(html);
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
    var HtmlTagHydration = class extends HtmlTag {
      constructor(claimed_nodes, is_svg = false) {
        super(is_svg);
        this.e = this.n = null;
        this.l = claimed_nodes;
      }
      c(html) {
        if (this.l) {
          this.n = this.l;
        } else {
          super.c(html);
        }
      }
      i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
          insert_hydration(this.t, this.n[i], anchor);
        }
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
    var managed_styles = /* @__PURE__ */ new Map();
    var active = 0;
    function hash(str) {
      let hash2 = 5381;
      let i = str.length;
      while (i--)
        hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
      return hash2 >>> 0;
    }
    function create_style_information(doc, node) {
      const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
      managed_styles.set(doc, info);
      return info;
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
      const doc = get_root_for_style2(node);
      const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
      if (!rules[name]) {
        rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
      }
      const animation = node.style.animation || "";
      node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
      active += 1;
      return name;
    }
    function delete_rule(node, name) {
      const previous = (node.style.animation || "").split(", ");
      const next = previous.filter(
        name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1
        // remove all Svelte animations
      );
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
        managed_styles.forEach((info) => {
          const { ownerNode } = info.stylesheet;
          if (ownerNode)
            detach2(ownerNode);
        });
        managed_styles.clear();
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
        // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
        start: start_time = exports.now() + delay,
        // @ts-ignore todo:
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
      return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
          const event = custom_event2(type, detail, { cancelable });
          callbacks.slice().forEach((fn) => {
            fn.call(component, event);
          });
          return !event.defaultPrevented;
        }
        return true;
      };
    }
    function setContext2(key, context) {
      get_current_component2().$$.context.set(key, context);
      return context;
    }
    function getContext2(key) {
      return get_current_component2().$$.context.get(key);
    }
    function getAllContexts2() {
      return get_current_component2().$$.context;
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
    var seen_callbacks2 = /* @__PURE__ */ new Set();
    var flushidx2 = 0;
    function flush2() {
      const saved_component = exports.current_component;
      do {
        while (flushidx2 < dirty_components2.length) {
          const component = dirty_components2[flushidx2];
          flushidx2++;
          set_current_component2(component);
          update3(component.$$);
        }
        set_current_component2(null);
        dirty_components2.length = 0;
        flushidx2 = 0;
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
      seen_callbacks2.clear();
      set_current_component2(saved_component);
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
    var outroing2 = /* @__PURE__ */ new Set();
    var outros2;
    function group_outros2() {
      outros2 = {
        r: 0,
        c: [],
        p: outros2
        // parent group
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
      } else if (callback) {
        callback();
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
          started = true;
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
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block4, next, get_context) {
      let o = old_blocks.length;
      let n = list.length;
      let i = o;
      const old_indexes = {};
      while (i--)
        old_indexes[old_blocks[i].key] = i;
      const new_blocks = [];
      const new_lookup = /* @__PURE__ */ new Map();
      const deltas = /* @__PURE__ */ new Map();
      i = n;
      while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
          block = create_each_block4(key, child_ctx);
          block.c();
        } else if (dynamic) {
          block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
          deltas.set(key, Math.abs(i - old_indexes[key]));
      }
      const will_move = /* @__PURE__ */ new Set();
      const did_move = /* @__PURE__ */ new Set();
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
      const keys = /* @__PURE__ */ new Set();
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
    var boolean_attributes = /* @__PURE__ */ new Set([
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
    var void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
    function is_void(name) {
      return void_element_names.test(name) || name.toLowerCase() === "!doctype";
    }
    var invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    function spread(args, attrs_to_add) {
      const attributes = Object.assign({}, ...args);
      if (attrs_to_add) {
        const classes_to_add = attrs_to_add.classes;
        const styles_to_add = attrs_to_add.styles;
        if (classes_to_add) {
          if (attributes.class == null) {
            attributes.class = classes_to_add;
          } else {
            attributes.class += " " + classes_to_add;
          }
        }
        if (styles_to_add) {
          if (attributes.style == null) {
            attributes.style = style_object_to_string(styles_to_add);
          } else {
            attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
          }
        }
      }
      let str = "";
      Object.keys(attributes).forEach((name) => {
        if (invalid_attribute_name_character.test(name))
          return;
        const value = attributes[name];
        if (value === true)
          str += " " + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
          if (value)
            str += " " + name;
        } else if (value != null) {
          str += ` ${name}="${value}"`;
        }
      });
      return str;
    }
    function merge_ssr_styles(style_attribute, style_directive) {
      const style_object = {};
      for (const individual_style of style_attribute.split(";")) {
        const colon_index = individual_style.indexOf(":");
        const name = individual_style.slice(0, colon_index).trim();
        const value = individual_style.slice(colon_index + 1).trim();
        if (!name)
          continue;
        style_object[name] = value;
      }
      for (const name in style_directive) {
        const value = style_directive[name];
        if (value) {
          style_object[name] = value;
        } else {
          delete style_object[name];
        }
      }
      return style_object;
    }
    var ATTR_REGEX = /[&"]/g;
    var CONTENT_REGEX = /[&<]/g;
    function escape(value, is_attr = false) {
      const str = String(value);
      const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
      pattern.lastIndex = 0;
      let escaped = "";
      let last = 0;
      while (pattern.test(str)) {
        const i = pattern.lastIndex - 1;
        const ch = str[i];
        escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
        last = i + 1;
      }
      return escaped + str.substring(last);
    }
    function escape_attribute_value(value) {
      const should_escape = typeof value === "string" || value && typeof value === "object";
      return should_escape ? escape(value, true) : value;
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
          context: new Map(context || (parent_component ? parent_component.$$.context : [])),
          // these will be immediately discarded
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
        render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
          on_destroy = [];
          const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
          const html = $$render(result, props, {}, $$slots, context);
          run_all2(on_destroy);
          return {
            html,
            css: {
              code: Array.from(result.css).map((css) => css.code).join("\n"),
              map: null
              // TODO
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
      const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
      return ` ${name}${assignment}`;
    }
    function add_classes(classes) {
      return classes ? ` class="${classes}"` : "";
    }
    function style_object_to_string(style_object) {
      return Object.keys(style_object).filter((key) => style_object[key]).map((key) => `${key}: ${style_object[key]};`).join(" ");
    }
    function add_styles(style_object) {
      const styles = style_object_to_string(style_object);
      return styles ? ` style="${styles}"` : "";
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
    function init2(component, options3, instance12, create_fragment13, not_equal2, props, append_styles3, dirty = [-1]) {
      const parent_component = exports.current_component;
      set_current_component2(component);
      const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop2,
        not_equal: not_equal2,
        bound: blank_object2(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options3.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object2(),
        dirty,
        skip_bound: false,
        root: options3.target || parent_component.$$.root
      };
      append_styles3 && append_styles3($$.root);
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
      document.dispatchEvent(custom_event2(type, Object.assign({ version: "3.50.1" }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
      dispatch_dev("SvelteDOMInsert", { target, node });
      append2(target, node);
    }
    function append_hydration_dev(target, node) {
      dispatch_dev("SvelteDOMInsert", { target, node });
      append_hydration(target, node);
    }
    function insert_dev(target, node, anchor) {
      dispatch_dev("SvelteDOMInsert", { target, node, anchor });
      insert2(target, node, anchor);
    }
    function insert_hydration_dev(target, node, anchor) {
      dispatch_dev("SvelteDOMInsert", { target, node, anchor });
      insert_hydration(target, node, anchor);
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
    function validate_dynamic_element(tag) {
      const is_string = typeof tag === "string";
      if (tag && !is_string) {
        throw new Error('<svelte:element> expects "this" attribute to be a string.');
      }
    }
    function validate_void_dynamic_element(tag) {
      if (tag && is_void(tag)) {
        throw new Error(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
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
    exports.HtmlTagHydration = HtmlTagHydration;
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
    exports.add_styles = add_styles;
    exports.add_transform = add_transform;
    exports.afterUpdate = afterUpdate2;
    exports.append = append2;
    exports.append_dev = append_dev;
    exports.append_empty_stylesheet = append_empty_stylesheet;
    exports.append_hydration = append_hydration;
    exports.append_hydration_dev = append_hydration_dev;
    exports.append_styles = append_styles2;
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
    exports.claim_svg_element = claim_svg_element;
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
    exports.exclude_internal_props = exclude_internal_props2;
    exports.fix_and_destroy_block = fix_and_destroy_block;
    exports.fix_and_outro_and_destroy_block = fix_and_outro_and_destroy_block;
    exports.fix_position = fix_position;
    exports.flush = flush2;
    exports.getAllContexts = getAllContexts2;
    exports.getContext = getContext2;
    exports.get_all_dirty_from_scope = get_all_dirty_from_scope2;
    exports.get_binding_group_value = get_binding_group_value;
    exports.get_current_component = get_current_component2;
    exports.get_custom_elements_slots = get_custom_elements_slots;
    exports.get_root_for_style = get_root_for_style2;
    exports.get_slot_changes = get_slot_changes2;
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
    exports.insert_hydration = insert_hydration;
    exports.insert_hydration_dev = insert_hydration_dev;
    exports.intros = intros;
    exports.invalid_attribute_name_character = invalid_attribute_name_character;
    exports.is_client = is_client;
    exports.is_crossorigin = is_crossorigin;
    exports.is_empty = is_empty2;
    exports.is_function = is_function2;
    exports.is_promise = is_promise;
    exports.is_void = is_void;
    exports.listen = listen2;
    exports.listen_dev = listen_dev;
    exports.loop = loop;
    exports.loop_guard = loop_guard;
    exports.merge_ssr_styles = merge_ssr_styles;
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
    exports.select_option = select_option2;
    exports.select_options = select_options2;
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
    exports.src_url_equal = src_url_equal;
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
    exports.trusted = trusted;
    exports.update_await_block_branch = update_await_block_branch;
    exports.update_keyed_each = update_keyed_each;
    exports.update_slot = update_slot;
    exports.update_slot_base = update_slot_base2;
    exports.validate_component = validate_component;
    exports.validate_dynamic_element = validate_dynamic_element;
    exports.validate_each_argument = validate_each_argument;
    exports.validate_each_keys = validate_each_keys;
    exports.validate_slots = validate_slots;
    exports.validate_store = validate_store;
    exports.validate_void_dynamic_element = validate_void_dynamic_element;
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
      const subscribers = /* @__PURE__ */ new Set();
      function set(new_value) {
        if (internal.safe_not_equal(value, new_value)) {
          value = new_value;
          if (stop) {
            const run_queue = !subscriber_queue2.length;
            for (const subscriber of subscribers) {
              subscriber[1]();
              subscriber_queue2.push(subscriber, value);
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
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
          stop = start(set) || internal.noop;
        }
        run2(value);
        return () => {
          subscribers.delete(subscriber);
          if (subscribers.size === 0) {
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
    var data = window.localStorage._DATA;
    var loggedIn3 = writable2(!!data);
    var session2 = writable2(data ? JSON.parse(data) : {});
    var schemas3 = writable2([]);
    var current3 = writable2({});
    var options3 = writable2(null);
    function getUrl(x, path, params) {
      const url22 = `${x}${path}?client_id=${"fcfd0d144cddb6b070e7"}&client_secret=${"2aaeecfab4de40d4db3fa7e7cc7466750a51dcdb"}`;
      const redirect = `redirect_uri=${encodeURIComponent(`${location.protocol}//${location.host}/`)}`;
      return params ? `${url22}&${Object.keys(params).map((k) => `${k}=${params[k]}`).join("&")}&${redirect}` : `${url22}${params !== false ? `&${redirect}` : ""}`;
    }
    function getJSON(path, params, _options) {
      return fetch(`${"https://cors-anywhere.herokuapp.com/"}${getUrl(API_URL, path, _options)}`, {
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
            // legacy and ugly
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
        // fresh copy of current options
        "_options.json": {
          content: JSON.stringify($options)
        }
      };
      Object.keys(schemas22).forEach((key) => {
        _files[key] = { content: schemas22[key].value };
      });
      const url22 = getUrl(API_URL, "/gists", false);
      const fixedUrl = `${"https://cors-anywhere.herokuapp.com/"}${url22}`;
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
      fetch(`${"https://cors-anywhere.herokuapp.com/"}${url22}`, {
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

// src/web/js/src/web/js/app.js
var import_gists5 = __toESM(require_gists());

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
  return /* @__PURE__ */ Object.create(null);
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
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function exclude_internal_props(props) {
  const result = {};
  for (const k in props)
    if (k[0] !== "$")
      result[k] = props[k];
  return result;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
var is_hydrating = false;
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function append(target, node) {
  target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
  const append_styles_to = get_root_for_style(target);
  if (!append_styles_to.getElementById(style_sheet_id)) {
    const style = element("style");
    style.id = style_sheet_id;
    style.textContent = styles;
    append_stylesheet(append_styles_to, style);
  }
}
function get_root_for_style(node) {
  if (!node)
    return document;
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root && root.host) {
    return root;
  }
  return node.ownerDocument;
}
function append_stylesheet(node, style) {
  append(node.head || node, style);
  return style.sheet;
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
function select_option(select, value) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
  select.selectedIndex = -1;
}
function select_options(select, value) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    option.selected = ~value.indexOf(option.__value);
  }
}
function toggle_class(element2, name, toggle) {
  element2.classList[toggle ? "add" : "remove"](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
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
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
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
var seen_callbacks = /* @__PURE__ */ new Set();
var flushidx = 0;
function flush() {
  const saved_component = current_component;
  do {
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
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
  seen_callbacks.clear();
  set_current_component(saved_component);
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
var outroing = /* @__PURE__ */ new Set();
var outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
    // parent group
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
  } else if (callback) {
    callback();
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
function init(component, options3, instance12, create_fragment13, not_equal, props, append_styles2, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
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
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options3.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options3.target || parent_component.$$.root
  };
  append_styles2 && append_styles2($$.root);
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
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
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
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
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
var __markAsModule = (target) => __defProp2(target, "__esModule", { value: true });
var __commonJS2 = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames2(module))
      if (!__hasOwnProp2.call(target, key) && key !== "default")
        __defProp2(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc2(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp2(module != null ? __create2(__getProtoOf2(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
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
      const ret = /* @__PURE__ */ Object.create(null);
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
      }, /* @__PURE__ */ Object.create(null));
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
var import_query_string = __toModule(require_query_string());
var import_abstract_nested_router = __toModule(require_dist());
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
  const default_slot_template = (
    /*#slots*/
    ctx[7].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    null
  );
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
        if (default_slot.p && (!current3 || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current3 ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              null
            ),
            null
          );
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
  let if_block = !/*disabled*/
  ctx[0] && create_if_block(ctx);
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
      if (!/*disabled*/
      ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*disabled*/
          1) {
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
  let $router;
  let $basePath;
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
    if ($$self.$$.dirty & /*condition, $router*/
    48) {
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
var get_default_slot_spread_changes = (dirty) => dirty & /*activeProps*/
8;
var get_default_slot_changes = (dirty) => ({});
var get_default_slot_context = (ctx) => ({ .../*activeProps*/
ctx[3] });
function create_if_block2(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current3;
  const if_block_creators = [create_if_block_1, create_if_block_5, create_else_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (!/*hasLoaded*/
    ctx2[4])
      return 0;
    if (
      /*component*/
      ctx2[0]
    )
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
  const default_slot_template = (
    /*#slots*/
    ctx[16].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[15],
    get_default_slot_context
  );
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
        if (default_slot.p && (!current3 || dirty & /*$$scope, activeProps*/
        32776)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[15],
            get_default_slot_spread_changes(dirty) || !current3 ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[15]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[15],
              dirty,
              get_default_slot_changes
            ),
            get_default_slot_context
          );
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
  const switch_instance_spread_levels = [
    /*activeProps*/
    ctx[3]
  ];
  var switch_value = (
    /*component*/
    ctx[0]
  );
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
      const switch_instance_changes = dirty & /*activeProps*/
      8 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
        /*activeProps*/
        ctx2[3]
      )]) : {};
      if (switch_value !== (switch_value = /*component*/
      ctx2[0])) {
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
  let if_block = (
    /*pending*/
    (ctx[1] || /*pendingComponent*/
    ctx[5]) && create_if_block_2(ctx)
  );
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
      if (
        /*pending*/
        ctx2[1] || /*pendingComponent*/
        ctx2[5]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*pending*/
          2) {
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
    if (dirty & /*pending*/
    2)
      show_if = null;
    if (show_if == null)
      show_if = !!isSvelteComponent(
        /*pending*/
        ctx2[1]
      );
    if (show_if)
      return 0;
    if (show_if_1 == null)
      show_if_1 = !!isSvelteComponent(
        /*pendingComponent*/
        ctx2[5]
      );
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
  let t_value = (
    /*pending*/
    (ctx[1] || /*pendingComponent*/
    ctx[5]) + ""
  );
  let t2;
  return {
    c() {
      t2 = text(t_value);
    },
    m(target, anchor) {
      insert(target, t2, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*pending*/
      2 && t_value !== (t_value = /*pending*/
      (ctx2[1] || /*pendingComponent*/
      ctx2[5]) + ""))
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
  const switch_instance_spread_levels = [
    /*activeProps*/
    ctx[3]
  ];
  var switch_value = (
    /*pendingComponent*/
    ctx[5]
  );
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
      const switch_instance_changes = dirty & /*activeProps*/
      8 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
        /*activeProps*/
        ctx2[3]
      )]) : {};
      if (switch_value !== (switch_value = /*pendingComponent*/
      ctx2[5])) {
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
  const switch_instance_spread_levels = [
    /*activeProps*/
    ctx[3]
  ];
  var switch_value = (
    /*pending*/
    ctx[1]
  );
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
      const switch_instance_changes = dirty & /*activeProps*/
      8 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
        /*activeProps*/
        ctx2[3]
      )]) : {};
      if (switch_value !== (switch_value = /*pending*/
      ctx2[1])) {
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
  let if_block = (
    /*activeRouter*/
    ctx[2] && create_if_block2(ctx)
  );
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
      if (
        /*activeRouter*/
        ctx2[2]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*activeRouter*/
          4) {
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
  let $routeInfo;
  let $routePath;
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
    if ($$self.$$.dirty & /*activeRouter, component*/
    5) {
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
  const default_slot_template = (
    /*#slots*/
    ctx[17].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[16],
    null
  );
  let a_levels = [
    /*fixedProps*/
    ctx[6],
    {
      href: a_href_value = cleanPath(
        /*fixedHref*/
        ctx[5] || /*href*/
        ctx[1]
      )
    },
    { class: (
      /*cssClass*/
      ctx[0]
    ) },
    { title: (
      /*title*/
      ctx[2]
    ) }
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
        dispose = listen(
          a,
          "click",
          /*handleAnchorOnClick*/
          ctx[8]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current3 || dirty & /*$$scope*/
        65536)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[16],
            !current3 ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[16]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[16],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(a, a_data = get_spread_update(a_levels, [
        dirty & /*fixedProps*/
        64 && /*fixedProps*/
        ctx2[6],
        (!current3 || dirty & /*fixedHref, href*/
        34 && a_href_value !== (a_href_value = cleanPath(
          /*fixedHref*/
          ctx2[5] || /*href*/
          ctx2[1]
        ))) && { href: a_href_value },
        (!current3 || dirty & /*cssClass*/
        1) && { class: (
          /*cssClass*/
          ctx2[0]
        ) },
        (!current3 || dirty & /*title*/
        4) && { title: (
          /*title*/
          ctx2[2]
        ) }
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
  const default_slot_template = (
    /*#slots*/
    ctx[17].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[16],
    null
  );
  let button_1_levels = [
    /*fixedProps*/
    ctx[6],
    { class: (
      /*cssClass*/
      ctx[0]
    ) },
    { title: (
      /*title*/
      ctx[2]
    ) }
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
      if (button_1.autofocus)
        button_1.focus();
      ctx[18](button_1);
      current3 = true;
      if (!mounted) {
        dispose = listen(
          button_1,
          "click",
          /*handleOnClick*/
          ctx[7]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current3 || dirty & /*$$scope*/
        65536)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[16],
            !current3 ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[16]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[16],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(button_1, button_1_data = get_spread_update(button_1_levels, [
        dirty & /*fixedProps*/
        64 && /*fixedProps*/
        ctx2[6],
        (!current3 || dirty & /*cssClass*/
        1) && { class: (
          /*cssClass*/
          ctx2[0]
        ) },
        (!current3 || dirty & /*title*/
        4) && { title: (
          /*title*/
          ctx2[2]
        ) }
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
    if (
      /*button*/
      ctx2[3]
    )
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
        const t2 = setInterval(
          () => {
            if (w.closed) {
              dispatch("close");
              clearInterval(t2);
            }
          },
          120
        );
      } else
        window.location.href = href;
      return;
    }
    fixedLocation(
      href,
      () => {
        navigateTo(fixedHref || "/", { reload, replace });
      },
      () => dispatch("click", e)
    );
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
    if ($$self.$$.dirty & /*href*/
    2) {
      $:
        if (!/^(\w+:)?\/\//.test(href)) {
          $$invalidate(5, fixedHref = cleanPath(ROOT_URL, true) + cleanPath(HASHCHANGE ? `#${href}` : href));
        }
    }
    if ($$self.$$.dirty & /*ref, $router, href, exact, active, button*/
    51226) {
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
var import_gists3 = __toESM(require_gists());

// src/web/js/lib/Icon.svelte
function create_fragment4(ctx) {
  let svg;
  let use;
  let use_xlink_href_value;
  return {
    c() {
      svg = svg_element("svg");
      use = svg_element("use");
      xlink_attr(use, "xlink:href", use_xlink_href_value = "#icon-" + /*name*/
      ctx[0]);
      attr(
        svg,
        "width",
        /*size*/
        ctx[1]
      );
      attr(
        svg,
        "height",
        /*size*/
        ctx[1]
      );
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, use);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*name*/
      1 && use_xlink_href_value !== (use_xlink_href_value = "#icon-" + /*name*/
      ctx2[0])) {
        xlink_attr(use, "xlink:href", use_xlink_href_value);
      }
      if (dirty & /*size*/
      2) {
        attr(
          svg,
          "width",
          /*size*/
          ctx2[1]
        );
      }
      if (dirty & /*size*/
      2) {
        attr(
          svg,
          "height",
          /*size*/
          ctx2[1]
        );
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
function add_css(target) {
  append_styles(target, "svelte-1fad9tz", ".smoo-fence--overlay.svelte-1fad9tz{top:0;left:0;width:100%;height:100%;z-index:1;display:flex;position:fixed;align-items:center;justify-content:center;background-color:rgba(0, 0, 0, .3)}.smoo-fence--wrapper.svelte-1fad9tz{background-color:white;box-shadow:0 2px 3px rgba(0, 0, 0, .2)}.smoo-fence--loading.svelte-1fad9tz{opacity:.3;pointer-events:none}.smoo-fence--inline.svelte-1fad9tz{display:inline-block}.smoo-fence--form.svelte-1fad9tz{padding:10px}");
}
var get_after_slot_changes = (dirty) => ({});
var get_after_slot_context = (ctx) => ({});
var get_main_slot_changes = (dirty) => ({ props: dirty & /*fixedProps*/
32 });
var get_main_slot_context = (ctx) => ({ props: (
  /*fixedProps*/
  ctx[5]
) });
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
  const before_slot_template = (
    /*#slots*/
    ctx[13].before
  );
  const before_slot = create_slot(
    before_slot_template,
    ctx,
    /*$$scope*/
    ctx[12],
    get_before_slot_context
  );
  const main_slot_template = (
    /*#slots*/
    ctx[13].main
  );
  const main_slot = create_slot(
    main_slot_template,
    ctx,
    /*$$scope*/
    ctx[12],
    get_main_slot_context
  );
  let if_block = !/*noform*/
  ctx[0] && create_if_block_12(ctx);
  const after_slot_template = (
    /*#slots*/
    ctx[13].after
  );
  const after_slot = create_slot(
    after_slot_template,
    ctx,
    /*$$scope*/
    ctx[12],
    get_after_slot_context
  );
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
      attr(div1, "class", div1_class_value = "smoo-fence--" + /*fixedClass*/
      ctx[4] + " svelte-1fad9tz");
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
        dispose = listen(
          div1,
          "click",
          /*closeMe*/
          ctx[7]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (before_slot) {
        if (before_slot.p && (!current3 || dirty & /*$$scope*/
        4096)) {
          update_slot_base(
            before_slot,
            before_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[12],
            !current3 ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[12]
            ) : get_slot_changes(
              before_slot_template,
              /*$$scope*/
              ctx2[12],
              dirty,
              get_before_slot_changes
            ),
            get_before_slot_context
          );
        }
      }
      if (main_slot) {
        if (main_slot.p && (!current3 || dirty & /*$$scope, fixedProps*/
        4128)) {
          update_slot_base(
            main_slot,
            main_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[12],
            !current3 ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[12]
            ) : get_slot_changes(
              main_slot_template,
              /*$$scope*/
              ctx2[12],
              dirty,
              get_main_slot_changes
            ),
            get_main_slot_context
          );
        }
      }
      if (!/*noform*/
      ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*noform*/
          1) {
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
        if (after_slot.p && (!current3 || dirty & /*$$scope*/
        4096)) {
          update_slot_base(
            after_slot,
            after_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[12],
            !current3 ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[12]
            ) : get_slot_changes(
              after_slot_template,
              /*$$scope*/
              ctx2[12],
              dirty,
              get_after_slot_changes
            ),
            get_after_slot_context
          );
        }
      }
      if (!current3 || dirty & /*fixedClass*/
      16 && div1_class_value !== (div1_class_value = "smoo-fence--" + /*fixedClass*/
      ctx2[4] + " svelte-1fad9tz")) {
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
  const default_slot_template = (
    /*#slots*/
    ctx[13].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[12],
    null
  );
  let form_levels = [
    /*fixedProps*/
    ctx[5],
    { class: "smoo-fence--form" }
  ];
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
      toggle_class(
        form,
        "smoo-fence--loading",
        /*loading*/
        ctx[2]
      );
      toggle_class(form, "svelte-1fad9tz", true);
    },
    m(target, anchor) {
      insert(target, form, anchor);
      if (default_slot) {
        default_slot.m(form, null);
      }
      current3 = true;
      if (!mounted) {
        dispose = listen(form, "submit", prevent_default(
          /*handleSubmit*/
          ctx[6]
        ));
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current3 || dirty & /*$$scope*/
        4096)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[12],
            !current3 ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[12]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[12],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(form, form_data = get_spread_update(form_levels, [
        dirty & /*fixedProps*/
        32 && /*fixedProps*/
        ctx2[5],
        { class: "smoo-fence--form" }
      ]));
      toggle_class(
        form,
        "smoo-fence--loading",
        /*loading*/
        ctx2[2]
      );
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
  let if_block = (
    /*visible*/
    ctx[1] && create_if_block4(ctx)
  );
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
      if (
        /*visible*/
        ctx2[1]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*visible*/
          2) {
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
    if ($$self.$$.dirty & /*ref, visible, loading, autofocus*/
    2062) {
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
              setTimeout(
                () => {
                  if (firstNode && !loading)
                    firstNode.focus();
                },
                60
              );
            }
          }
        }
    }
    if ($$self.$$.dirty & /*modal*/
    1024) {
      $:
        $$invalidate(4, fixedClass = modal ? "overlay" : "inline");
    }
    if ($$self.$$.dirty & /*id, cssClass*/
    768) {
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
    init(
      this,
      options3,
      instance5,
      create_fragment5,
      safe_not_equal,
      {
        class: 8,
        id: 9,
        modal: 10,
        noform: 0,
        visible: 1,
        loading: 2,
        autofocus: 11
      },
      add_css
    );
  }
};
var Fence_default = Fence;

// src/web/js/lib/Modal.svelte
var get_default_slot_changes2 = (dirty) => ({});
var get_default_slot_context2 = (ctx) => ({ back: (
  /*back*/
  ctx[0]
) });
function create_main_slot(ctx) {
  let div;
  let current3;
  const default_slot_template = (
    /*#slots*/
    ctx[1].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[2],
    get_default_slot_context2
  );
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
        if (default_slot.p && (!current3 || dirty & /*$$scope*/
        4)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[2],
            !current3 ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[2]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[2],
              dirty,
              get_default_slot_changes2
            ),
            get_default_slot_context2
          );
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
  fence.$on(
    "cancel",
    /*back*/
    ctx[0]
  );
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
      if (dirty & /*$$scope*/
      4) {
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
var import_gists = __toESM(require_gists());
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[11] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[14] = list[i];
  return child_ctx;
}
function create_else_block3(ctx) {
  let select;
  let select_title_value;
  let mounted;
  let dispose;
  let each_value_1 = (
    /*vals*/
    ctx[2]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  let select_levels = [
    /*option*/
    ctx[11],
    {
      title: select_title_value = /*option*/
      ctx[11].name
    }
  ];
  let select_data = {};
  for (let i = 0; i < select_levels.length; i += 1) {
    select_data = assign(select_data, select_levels[i]);
  }
  function change_handler_1(...args) {
    return (
      /*change_handler_1*/
      ctx[7](
        /*option*/
        ctx[11],
        ...args
      )
    );
  }
  return {
    c() {
      select = element("select");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      set_attributes(select, select_data);
    },
    m(target, anchor) {
      insert(target, select, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(select, null);
      }
      (select_data.multiple ? select_options : select_option)(select, select_data.value);
      if (select.autofocus)
        select.focus();
      if (!mounted) {
        dispose = listen(select, "change", change_handler_1);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*vals, opts, JSON*/
      6) {
        each_value_1 = /*vals*/
        ctx[2];
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(select, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
      set_attributes(select, select_data = get_spread_update(select_levels, [
        /*option*/
        ctx[11],
        { title: select_title_value }
      ]));
      if (dirty & /*opts*/
      2 && "value" in select_data)
        (select_data.multiple ? select_options : select_option)(select, select_data.value);
    },
    d(detaching) {
      if (detaching)
        detach(select);
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block5(ctx) {
  let input;
  let input_title_value;
  let mounted;
  let dispose;
  let input_levels = [
    /*option*/
    ctx[11],
    {
      title: input_title_value = /*option*/
      ctx[11].name
    }
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  function change_handler(...args) {
    return (
      /*change_handler*/
      ctx[6](
        /*option*/
        ctx[11],
        ...args
      )
    );
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus)
        input.focus();
      if (!mounted) {
        dispose = listen(input, "change", change_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      set_attributes(input, input_data = get_spread_update(input_levels, [
        /*option*/
        ctx[11],
        { title: input_title_value }
      ]));
    },
    d(detaching) {
      if (detaching)
        detach(input);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_1(ctx) {
  let option;
  let t_value = (typeof /*value*/
  ctx[14] !== "undefined" ? JSON.stringify(
    /*value*/
    ctx[14]
  ) : "") + "";
  let t2;
  let option_value_value;
  let option_selected_value;
  return {
    c() {
      option = element("option");
      t2 = text(t_value);
      option.__value = option_value_value = /*value*/
      ctx[14];
      option.value = option.__value;
      option.selected = option_selected_value = /*value*/
      ctx[14] === /*option*/
      ctx[11].value;
    },
    m(target, anchor) {
      insert(target, option, anchor);
      append(option, t2);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(option);
    }
  };
}
function create_each_block(ctx) {
  let li;
  let label;
  let t0_value = (
    /*option*/
    ctx[11].name + ""
  );
  let t0;
  let label_for_value;
  let t1;
  let span;
  let t2;
  function select_block_type(ctx2, dirty) {
    if (
      /*option*/
      ctx2[11].type
    )
      return create_if_block5;
    return create_else_block3;
  }
  let current_block_type = select_block_type(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      li = element("li");
      label = element("label");
      t0 = text(t0_value);
      t1 = space();
      span = element("span");
      if_block.c();
      t2 = space();
      attr(label, "for", label_for_value = /*option*/
      ctx[11].id);
      attr(label, "class", "tr cl-6");
      attr(span, "class", "flx-gw");
      attr(li, "class", "nosl flx gap");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, label);
      append(label, t0);
      append(li, t1);
      append(li, span);
      if_block.m(span, null);
      append(li, t2);
    },
    p(ctx2, dirty) {
      if_block.p(ctx2, dirty);
    },
    d(detaching) {
      if (detaching)
        detach(li);
      if_block.d();
    }
  };
}
function create_default_slot(ctx) {
  let t0;
  let a0;
  let t2;
  let hr0;
  let t3;
  let form;
  let ul;
  let t4;
  let button0;
  let t5;
  let button0_disabled_value;
  let t6;
  let button1;
  let t8;
  let hr1;
  let t9;
  let a1;
  let t11;
  let a2;
  let t13;
  let a3;
  let t15;
  let a4;
  let t17;
  let a5;
  let t19;
  let a6;
  let t21;
  let a7;
  let t23;
  let a8;
  let t25;
  let a9;
  let t27;
  let a10;
  let t29;
  let a11;
  let t31;
  let a12;
  let t33;
  let a13;
  let t35;
  let hr2;
  let t36;
  let a14;
  let t38;
  let a15;
  let t40;
  let a16;
  let t42;
  let a17;
  let t44;
  let a18;
  let t46;
  let a19;
  let t48;
  let a20;
  let mounted;
  let dispose;
  let each_value = (
    /*opts*/
    ctx[1]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      t0 = text("Reference: ");
      a0 = element("a");
      a0.textContent = "available options";
      t2 = space();
      hr0 = element("hr");
      t3 = space();
      form = element("form");
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t4 = space();
      button0 = element("button");
      t5 = text("Reset to defaults");
      t6 = space();
      button1 = element("button");
      button1.textContent = "Apply";
      t8 = space();
      hr1 = element("hr");
      t9 = space();
      a1 = element("a");
      a1.textContent = "boolean";
      t11 = text(" |\n  ");
      a2 = element("a");
      a2.textContent = "integer";
      t13 = text(" |\n  ");
      a3 = element("a");
      a3.textContent = "inner-references";
      t15 = text(" |\n  ");
      a4 = element("a");
      a4.textContent = "external-references";
      t17 = text(" |\n  ");
      a5 = element("a");
      a5.textContent = "enums";
      t19 = text(" |\n  ");
      a6 = element("a");
      a6.textContent = "fixed values";
      t21 = text(" |\n  ");
      a7 = element("a");
      a7.textContent = "n-times repeated";
      t23 = text(" |\n  ");
      a8 = element("a");
      a8.textContent = "faker-properties";
      t25 = text(" |\n  ");
      a9 = element("a");
      a9.textContent = "faker.fake()";
      t27 = text(" |\n  ");
      a10 = element("a");
      a10.textContent = "chance-guid";
      t29 = text(" |\n  ");
      a11 = element("a");
      a11.textContent = "chance-name";
      t31 = text(" |\n  ");
      a12 = element("a");
      a12.textContent = "chance-properties";
      t33 = text(" |\n  ");
      a13 = element("a");
      a13.textContent = "remote-schemas (^0.5.x)";
      t35 = space();
      hr2 = element("hr");
      t36 = space();
      a14 = element("a");
      a14.textContent = "JSON-Schema.org";
      t38 = text(" |\n  ");
      a15 = element("a");
      a15.textContent = "GitHub";
      t40 = text(" / ");
      a16 = element("a");
      a16.textContent = "CI";
      t42 = text(" |\n  ");
      a17 = element("a");
      a17.textContent = "Contribution";
      t44 = text(" |\n  ");
      a18 = element("a");
      a18.textContent = "AngularJS module";
      t46 = text(" |\n  ");
      a19 = element("a");
      a19.textContent = "Grunt plugin";
      t48 = text(" |\n  ");
      a20 = element("a");
      a20.textContent = "JSF Server";
      attr(a0, "href", "//github.com/json-schema-faker/json-schema-faker/tree/master/docs#available-options");
      attr(a0, "target", "_blank");
      attr(ul, "class", "lr flx flx-wp gap opts");
      attr(button0, "class", "bu");
      button0.disabled = button0_disabled_value = /*$options*/
      ctx[0] === null;
      attr(button1, "class", "bu");
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
      insert(target, form, anchor);
      append(form, ul);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul, null);
      }
      append(form, t4);
      append(form, button0);
      append(button0, t5);
      append(form, t6);
      append(form, button1);
      insert(target, t8, anchor);
      insert(target, hr1, anchor);
      insert(target, t9, anchor);
      insert(target, a1, anchor);
      insert(target, t11, anchor);
      insert(target, a2, anchor);
      insert(target, t13, anchor);
      insert(target, a3, anchor);
      insert(target, t15, anchor);
      insert(target, a4, anchor);
      insert(target, t17, anchor);
      insert(target, a5, anchor);
      insert(target, t19, anchor);
      insert(target, a6, anchor);
      insert(target, t21, anchor);
      insert(target, a7, anchor);
      insert(target, t23, anchor);
      insert(target, a8, anchor);
      insert(target, t25, anchor);
      insert(target, a9, anchor);
      insert(target, t27, anchor);
      insert(target, a10, anchor);
      insert(target, t29, anchor);
      insert(target, a11, anchor);
      insert(target, t31, anchor);
      insert(target, a12, anchor);
      insert(target, t33, anchor);
      insert(target, a13, anchor);
      insert(target, t35, anchor);
      insert(target, hr2, anchor);
      insert(target, t36, anchor);
      insert(target, a14, anchor);
      insert(target, t38, anchor);
      insert(target, a15, anchor);
      insert(target, t40, anchor);
      insert(target, a16, anchor);
      insert(target, t42, anchor);
      insert(target, a17, anchor);
      insert(target, t44, anchor);
      insert(target, a18, anchor);
      insert(target, t46, anchor);
      insert(target, a19, anchor);
      insert(target, t48, anchor);
      insert(target, a20, anchor);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*reset*/
            ctx[4]
          ),
          listen(button1, "click", function() {
            if (is_function(
              /*back*/
              ctx[10]
            ))
              ctx[10].apply(this, arguments);
          }),
          listen(form, "submit", prevent_default(
            /*submit_handler*/
            ctx[5]
          ))
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*opts, update, vals, JSON*/
      14) {
        each_value = /*opts*/
        ctx[1];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty & /*$options*/
      1 && button0_disabled_value !== (button0_disabled_value = /*$options*/
      ctx[0] === null)) {
        button0.disabled = button0_disabled_value;
      }
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
        detach(form);
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(t8);
      if (detaching)
        detach(hr1);
      if (detaching)
        detach(t9);
      if (detaching)
        detach(a1);
      if (detaching)
        detach(t11);
      if (detaching)
        detach(a2);
      if (detaching)
        detach(t13);
      if (detaching)
        detach(a3);
      if (detaching)
        detach(t15);
      if (detaching)
        detach(a4);
      if (detaching)
        detach(t17);
      if (detaching)
        detach(a5);
      if (detaching)
        detach(t19);
      if (detaching)
        detach(a6);
      if (detaching)
        detach(t21);
      if (detaching)
        detach(a7);
      if (detaching)
        detach(t23);
      if (detaching)
        detach(a8);
      if (detaching)
        detach(t25);
      if (detaching)
        detach(a9);
      if (detaching)
        detach(t27);
      if (detaching)
        detach(a10);
      if (detaching)
        detach(t29);
      if (detaching)
        detach(a11);
      if (detaching)
        detach(t31);
      if (detaching)
        detach(a12);
      if (detaching)
        detach(t33);
      if (detaching)
        detach(a13);
      if (detaching)
        detach(t35);
      if (detaching)
        detach(hr2);
      if (detaching)
        detach(t36);
      if (detaching)
        detach(a14);
      if (detaching)
        detach(t38);
      if (detaching)
        detach(a15);
      if (detaching)
        detach(t40);
      if (detaching)
        detach(a16);
      if (detaching)
        detach(t42);
      if (detaching)
        detach(a17);
      if (detaching)
        detach(t44);
      if (detaching)
        detach(a18);
      if (detaching)
        detach(t46);
      if (detaching)
        detach(a19);
      if (detaching)
        detach(t48);
      if (detaching)
        detach(a20);
      mounted = false;
      run_all(dispose);
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
          ({ back }) => ({ 10: back }),
          ({ back }) => back ? 1024 : 0
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
      if (dirty & /*$$scope, back, $options*/
      132097) {
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
    const extraProps = { class: "f" };
    let fixedType;
    if (v instanceof Date) {
      fixedType = "date";
    } else if (Array.isArray(v)) {
      fixedType = "text";
    } else if (typeof v === "boolean") {
      fixedType = "checkbox";
    } else if (typeof v === "number") {
      fixedType = "number";
    } else if (v === null || typeof v === "function") {
      if (k === "maxItems" || k === "maxLength") {
        fixedType = "number";
      }
      if (k === "random" || k === "optionalsProbability") {
        extraProps.step = k === "random" ? "0.01" : "0.1";
        fixedType = "number";
      }
    }
    const result = $options2 && $options2[k] || defaults[k];
    if (fixedType === "checkbox") {
      extraProps.checked = result;
      extraProps.class = "";
    } else if (fixedType === "date") {
      extraProps.value = v.toISOString().substr(0, 10);
    } else if (fixedType === "number") {
      extraProps.value = result;
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
  function submit_handler(event) {
    bubble.call(this, $$self, event);
  }
  const change_handler = (option, e) => update3(e, option);
  const change_handler_1 = (option, e) => update3(e, option);
  return [
    $options2,
    opts,
    vals,
    update3,
    reset,
    submit_handler,
    change_handler,
    change_handler_1
  ];
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
var import_gists2 = __toESM(require_gists());
function get_each_context2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
}
function get_each_context_12(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i][0];
  child_ctx[11] = list[i][1];
  return child_ctx;
}
function create_if_block6(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (
      /*pending*/
      ctx2[1]
    )
      return create_if_block_13;
    return create_else_block4;
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
function create_else_block4(ctx) {
  let ol;
  let each_value = (
    /*filtered*/
    ctx[2]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
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
      if (dirty & /*Object, filtered, navigateTo*/
      4) {
        each_value = /*filtered*/
        ctx2[2];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block2(child_ctx);
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
function create_each_block_12(ctx) {
  let li;
  let a;
  let t0_value = (
    /*file*/
    ctx[10] + ""
  );
  let t0;
  let t1;
  let t2_value = (
    /*info*/
    (ctx[11].size / 1024).toFixed(2) + ""
  );
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
      attr(a, "title", a_title_value = "Type: " + /*info*/
      ctx[11].type);
      attr(a, "target", "_blank");
      attr(a, "href", a_href_value = /*info*/
      ctx[11].raw_url);
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
      if (dirty & /*filtered*/
      4 && t0_value !== (t0_value = /*file*/
      ctx2[10] + ""))
        set_data(t0, t0_value);
      if (dirty & /*filtered*/
      4 && t2_value !== (t2_value = /*info*/
      (ctx2[11].size / 1024).toFixed(2) + ""))
        set_data(t2, t2_value);
      if (dirty & /*filtered*/
      4 && a_title_value !== (a_title_value = "Type: " + /*info*/
      ctx2[11].type)) {
        attr(a, "title", a_title_value);
      }
      if (dirty & /*filtered*/
      4 && a_href_value !== (a_href_value = /*info*/
      ctx2[11].raw_url)) {
        attr(a, "href", a_href_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(li);
    }
  };
}
function create_each_block2(ctx) {
  let li;
  let div;
  let a;
  let t0_value = (
    /*item*/
    (ctx[7].description || /*item*/
    ctx[7].id) + ""
  );
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
    return (
      /*click_handler*/
      ctx[6](
        /*item*/
        ctx[7]
      )
    );
  }
  let each_value_1 = Object.entries(
    /*item*/
    ctx[7].files
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_12(get_each_context_12(ctx, each_value_1, i));
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
      attr(a, "href", a_href_value = /*item*/
      ctx[7].html_url);
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
      if (dirty & /*filtered*/
      4 && t0_value !== (t0_value = /*item*/
      (ctx[7].description || /*item*/
      ctx[7].id) + ""))
        set_data(t0, t0_value);
      if (dirty & /*filtered*/
      4 && a_href_value !== (a_href_value = /*item*/
      ctx[7].html_url)) {
        attr(a, "href", a_href_value);
      }
      if (dirty & /*Object, filtered*/
      4) {
        each_value_1 = Object.entries(
          /*item*/
          ctx[7].files
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_12(ctx, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_12(child_ctx);
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
  let if_block = (
    /*$loggedIn*/
    ctx[3] && create_if_block6(ctx)
  );
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
      attr(input, "class", "f ml flx-a");
      attr(input, "type", "search");
      attr(label, "class", "mb flx flx-c nosl");
    },
    m(target, anchor) {
      insert(target, label, anchor);
      append(label, span);
      append(label, t1);
      append(label, input);
      set_input_value(
        input,
        /*term*/
        ctx[0]
      );
      insert(target, t2, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      if (!mounted) {
        dispose = listen(
          input,
          "input",
          /*input_input_handler*/
          ctx[5]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*term*/
      1) {
        set_input_value(
          input,
          /*term*/
          ctx2[0]
        );
      }
      if (
        /*$loggedIn*/
        ctx2[3]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block6(ctx2);
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
  component_subscribe($$self, import_gists2.loggedIn, ($$value) => $$invalidate(3, $loggedIn = $$value));
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
    if ($$self.$$.dirty & /*data, term*/
    17) {
      $:
        $$invalidate(2, filtered = data.filter((x) => !term || x.description.toLowerCase().includes(term.toLowerCase()) || Object.keys(x.files).some((k) => k.toLowerCase().includes(term.toLowerCase()))));
    }
  };
  return [term, pending, filtered, $loggedIn, data, input_input_handler, click_handler];
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
function create_else_block5(ctx) {
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
  link.$on(
    "close",
    /*done*/
    ctx[2]
  );
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
      if (dirty & /*$$scope*/
      128) {
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
function create_if_block7(ctx) {
  let link;
  let current3;
  link = new Link_default({
    props: {
      href: "#session",
      class: "a nosl",
      title: (
        /*$session*/
        ctx[1].fullname
      ),
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
      if (dirty & /*$session*/
      2)
        link_changes.title = /*$session*/
        ctx2[1].fullname;
      if (dirty & /*$$scope, $session*/
      130) {
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
  let t1_value = (
    /*$session*/
    ctx[1].username + ""
  );
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
      if ((!current3 || dirty & /*$session*/
      2) && t1_value !== (t1_value = /*$session*/
      ctx2[1].username + ""))
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
  link0.$on(
    "click",
    /*add*/
    ctx[4]
  );
  link1 = new Link_default({
    props: {
      href: "/logout",
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    }
  });
  link1.$on(
    "click",
    /*exit*/
    ctx[3]
  );
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
      if (dirty & /*$$scope*/
      128) {
        link0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link0.$set(link0_changes);
      const link1_changes = {};
      if (dirty & /*$$scope*/
      128) {
        link1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link1.$set(link1_changes);
      const link2_changes = {};
      if (dirty & /*$$scope*/
      128) {
        link2_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link2.$set(link2_changes);
      const link3_changes = {};
      if (dirty & /*$$scope*/
      128) {
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
      if (dirty & /*$$scope*/
      128) {
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
      if (dirty & /*$$scope*/
      128) {
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
  const if_block_creators = [create_if_block7, create_else_block5];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*$loggedIn*/
      ctx2[0]
    )
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
      if (dirty & /*$$scope*/
      128) {
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
      if (dirty & /*$$scope*/
      128) {
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
  let $current;
  let $schemas;
  let $loggedIn;
  let $session;
  component_subscribe($$self, import_gists3.current, ($$value) => $$invalidate(5, $current = $$value));
  component_subscribe($$self, import_gists3.schemas, ($$value) => $$invalidate(6, $schemas = $$value));
  component_subscribe($$self, import_gists3.loggedIn, ($$value) => $$invalidate(0, $loggedIn = $$value));
  component_subscribe($$self, import_gists3.session, ($$value) => $$invalidate(1, $session = $$value));
  function done() {
    (0, import_gists3.me)().then((data) => {
      if (!data.login)
        return;
      set_store_value(import_gists3.loggedIn, $loggedIn = true, $loggedIn);
      set_store_value(
        import_gists3.session,
        $session = {
          username: data.login,
          fullname: data.name
        },
        $session
      );
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
  const default_slot_template = (
    /*#slots*/
    ctx[8].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    null
  );
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      t2 = space();
      if (default_slot)
        default_slot.c();
      attr(div0, "class", div0_class_value = "Ace " + /*cssClass*/
      ctx[0]);
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
      if (!current3 || dirty & /*cssClass*/
      1 && div0_class_value !== (div0_class_value = "Ace " + /*cssClass*/
      ctx2[0])) {
        attr(div0, "class", div0_class_value);
      }
      if (default_slot) {
        if (default_slot.p && (!current3 || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current3 ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              null
            ),
            null
          );
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
    if ($$self.$$.dirty & /*targetElement, value, theme, mode*/
    92) {
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
var import_gists4 = __toESM(require_gists());
function get_each_context3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[33] = list[i];
  return child_ctx;
}
function create_else_block6(ctx) {
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
  let each_value = (
    /*$schemas*/
    ctx[7]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block3(get_each_context3(ctx, each_value, i));
  }
  const if_block_creators = [create_if_block_14, create_else_block_12];
  const if_blocks = [];
  function select_block_type_3(ctx2, dirty) {
    if (
      /*isAdding*/
      ctx2[2]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_3(ctx, [-1, -1]);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  ace0 = new Ace_default({
    props: {
      mode: outputMode,
      value: (
        /*editInput*/
        ctx[5]
      )
    }
  });
  ace0.$on(
    "change",
    /*sync*/
    ctx[13]
  );
  ace1 = new Ace_default({
    props: {
      mode: outputMode,
      value: (
        /*objectOutput*/
        ctx[6]
      ),
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
      if (dirty[0] & /*remove, $schemas, input, close, update, isEditing, select, $current*/
      3979) {
        each_value = /*$schemas*/
        ctx2[7];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context3(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block3(child_ctx);
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
      if (dirty[0] & /*editInput*/
      32)
        ace0_changes.value = /*editInput*/
        ctx2[5];
      ace0.$set(ace0_changes);
      const ace1_changes = {};
      if (dirty[0] & /*objectOutput*/
      64)
        ace1_changes.value = /*objectOutput*/
        ctx2[6];
      if (dirty[1] & /*$$scope*/
      32) {
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
function create_if_block8(ctx) {
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
  let t0_value = (
    /*info*/
    ctx[33].filename + ""
  );
  let t0;
  let t1;
  let button1;
  let mounted;
  let dispose;
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[19](
        /*info*/
        ctx[33]
      )
    );
  }
  function click_handler_2() {
    return (
      /*click_handler_2*/
      ctx[20](
        /*info*/
        ctx[33]
      )
    );
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
      if (dirty[0] & /*$schemas*/
      128 && t0_value !== (t0_value = /*info*/
      ctx[33].filename + ""))
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
    if (
      /*isEditing*/
      ctx2[3]
    )
      return create_if_block_32;
    return create_else_block_2;
  }
  let current_block_type = select_block_type_2(ctx, [-1, -1]);
  let if_block = current_block_type(ctx);
  function click_handler() {
    return (
      /*click_handler*/
      ctx[18](
        /*info*/
        ctx[33]
      )
    );
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
  let t_value = (
    /*info*/
    ctx[33].filename + ""
  );
  let t2;
  let mounted;
  let dispose;
  function dblclick_handler() {
    return (
      /*dblclick_handler*/
      ctx[17](
        /*info*/
        ctx[33]
      )
    );
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
      if (dirty[0] & /*$schemas*/
      128 && t_value !== (t_value = /*info*/
      ctx[33].filename + ""))
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
      input_1.value = input_1_value_value = /*info*/
      ctx[33].filename;
    },
    m(target, anchor) {
      insert(target, input_1, anchor);
      ctx[16](input_1);
      if (!mounted) {
        dispose = [
          listen(
            input_1,
            "blur",
            /*close*/
            ctx[8]
          ),
          listen(
            input_1,
            "keyup",
            /*update*/
            ctx[11]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*$schemas*/
      128 && input_1_value_value !== (input_1_value_value = /*info*/
      ctx2[33].filename) && input_1.value !== input_1_value_value) {
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
function create_each_block3(ctx) {
  let if_block_anchor;
  function select_block_type_1(ctx2, dirty) {
    if (
      /*$current*/
      ctx2[0] === /*info*/
      ctx2[33]
    )
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
        dispose = listen(
          button,
          "click",
          /*add*/
          ctx[14]
        );
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
          listen(
            input_1,
            "blur",
            /*close*/
            ctx[8]
          ),
          listen(
            input_1,
            "keyup",
            /*submit*/
            ctx[12]
          )
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
        dispose = listen(
          button,
          "click",
          /*gen*/
          ctx[15]
        );
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
  const if_block_creators = [create_if_block8, create_else_block6];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*pending*/
      ctx2[4]
    )
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
      set_store_value(
        import_gists4.schemas,
        $schemas = $schemas.concat({
          filename: e.target.value,
          content: buffer
        }),
        $schemas
      );
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
    set_store_value(
      import_gists4.schemas,
      $schemas = Object.keys(data.files).filter((x) => ["text/plain", "application/json"].includes(data.files[x].type)).reduce(
        (prev, cur) => {
          prev.push(data.files[cur]);
          return prev;
        },
        []
      ),
      $schemas
    );
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
    if ($$self.$$.dirty[0] & /*$current*/
    1) {
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
    init(this, options3, instance11, create_fragment12, safe_not_equal, {}, null, [-1, -1]);
  }
};
var Editor_default = Editor;

// src/web/js/src/web/js/app.js
function main() {
  if (typeof window.JSONSchemaFaker !== "undefined") {
    JSONSchemaFaker.extend("faker", () => window.faker);
    JSONSchemaFaker.extend("chance", () => window.chance);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9pbnRlcm5hbC9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3N0b3JlL2luZGV4LmpzIiwgIi4uL3NyYy93ZWIvanMvc3JjL3dlYi9qcy9saWIvc3JjL3dlYi9qcy9saWIvZ2lzdHMuanMiLCAiLi4vc3JjL3dlYi9qcy9zcmMvd2ViL2pzL2FwcC5qcyIsICIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL2ludGVybmFsL2luZGV4Lm1qcyIsICIuLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3N0b3JlL2luZGV4Lm1qcyIsICIuLi9ub2RlX21vZHVsZXMveXJ2L2J1aWxkL2Rpc3QvbGliL3ZlbmRvci5qcyIsICIuLi9ub2RlX21vZHVsZXMveXJ2L2J1aWxkL2Rpc3QvbGliL3V0aWxzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy95cnYvYnVpbGQvZGlzdC9saWIvcm91dGVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy95cnYvYnVpbGQvZGlzdC9saWIvUm91dGVyLnN2ZWx0ZSIsICIuLi9ub2RlX21vZHVsZXMveXJ2L2J1aWxkL2Rpc3QvbGliL1JvdXRlLnN2ZWx0ZSIsICIuLi9ub2RlX21vZHVsZXMveXJ2L2J1aWxkL2Rpc3QvbGliL0xpbmsuc3ZlbHRlIiwgIi4uL25vZGVfbW9kdWxlcy95cnYvYnVpbGQvZGlzdC9pbmRleC5qcyIsICIuLi9zcmMvd2ViL2pzL2xpYi9BdXRoLnN2ZWx0ZSIsICIuLi9zcmMvd2ViL2pzL2xpYi9JY29uLnN2ZWx0ZSIsICIuLi9ub2RlX21vZHVsZXMvc21vby9idWlsZC9jb21wb25lbnRzL0ZlbmNlLnN2ZWx0ZSIsICIuLi9zcmMvd2ViL2pzL2xpYi9Nb2RhbC5zdmVsdGUiLCAiLi4vc3JjL3dlYi9qcy9saWIvT3B0cy5zdmVsdGUiLCAiLi4vc3JjL3dlYi9qcy9saWIvU2F2ZS5zdmVsdGUiLCAiLi4vc3JjL3dlYi9qcy9saWIvR2lzdHMuc3ZlbHRlIiwgIi4uL3NyYy93ZWIvanMvbGliL0FjZS5zdmVsdGUiLCAiLi4vc3JjL3dlYi9qcy9saWIvRWRpdG9yLnN2ZWx0ZSJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG5mdW5jdGlvbiBub29wKCkgeyB9XG5jb25zdCBpZGVudGl0eSA9IHggPT4geDtcbmZ1bmN0aW9uIGFzc2lnbih0YXIsIHNyYykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBmb3IgKGNvbnN0IGsgaW4gc3JjKVxuICAgICAgICB0YXJba10gPSBzcmNba107XG4gICAgcmV0dXJuIHRhcjtcbn1cbmZ1bmN0aW9uIGlzX3Byb21pc2UodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGFkZF9sb2NhdGlvbihlbGVtZW50LCBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIpIHtcbiAgICBlbGVtZW50Ll9fc3ZlbHRlX21ldGEgPSB7XG4gICAgICAgIGxvYzogeyBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIgfVxuICAgIH07XG59XG5mdW5jdGlvbiBydW4oZm4pIHtcbiAgICByZXR1cm4gZm4oKTtcbn1cbmZ1bmN0aW9uIGJsYW5rX29iamVjdCgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKTtcbn1cbmZ1bmN0aW9uIHJ1bl9hbGwoZm5zKSB7XG4gICAgZm5zLmZvckVhY2gocnVuKTtcbn1cbmZ1bmN0aW9uIGlzX2Z1bmN0aW9uKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIHNhZmVfbm90X2VxdWFsKGEsIGIpIHtcbiAgICByZXR1cm4gYSAhPSBhID8gYiA9PSBiIDogYSAhPT0gYiB8fCAoKGEgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnKSB8fCB0eXBlb2YgYSA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5sZXQgc3JjX3VybF9lcXVhbF9hbmNob3I7XG5mdW5jdGlvbiBzcmNfdXJsX2VxdWFsKGVsZW1lbnRfc3JjLCB1cmwpIHtcbiAgICBpZiAoIXNyY191cmxfZXF1YWxfYW5jaG9yKSB7XG4gICAgICAgIHNyY191cmxfZXF1YWxfYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIH1cbiAgICBzcmNfdXJsX2VxdWFsX2FuY2hvci5ocmVmID0gdXJsO1xuICAgIHJldHVybiBlbGVtZW50X3NyYyA9PT0gc3JjX3VybF9lcXVhbF9hbmNob3IuaHJlZjtcbn1cbmZ1bmN0aW9uIG5vdF9lcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGI7XG59XG5mdW5jdGlvbiBpc19lbXB0eShvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDA7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9zdG9yZShzdG9yZSwgbmFtZSkge1xuICAgIGlmIChzdG9yZSAhPSBudWxsICYmIHR5cGVvZiBzdG9yZS5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAnJHtuYW1lfScgaXMgbm90IGEgc3RvcmUgd2l0aCBhICdzdWJzY3JpYmUnIG1ldGhvZGApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHN1YnNjcmliZShzdG9yZSwgLi4uY2FsbGJhY2tzKSB7XG4gICAgaWYgKHN0b3JlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfVxuICAgIGNvbnN0IHVuc3ViID0gc3RvcmUuc3Vic2NyaWJlKC4uLmNhbGxiYWNrcyk7XG4gICAgcmV0dXJuIHVuc3ViLnVuc3Vic2NyaWJlID8gKCkgPT4gdW5zdWIudW5zdWJzY3JpYmUoKSA6IHVuc3ViO1xufVxuZnVuY3Rpb24gZ2V0X3N0b3JlX3ZhbHVlKHN0b3JlKSB7XG4gICAgbGV0IHZhbHVlO1xuICAgIHN1YnNjcmliZShzdG9yZSwgXyA9PiB2YWx1ZSA9IF8pKCk7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gY29tcG9uZW50X3N1YnNjcmliZShjb21wb25lbnQsIHN0b3JlLCBjYWxsYmFjaykge1xuICAgIGNvbXBvbmVudC4kJC5vbl9kZXN0cm95LnB1c2goc3Vic2NyaWJlKHN0b3JlLCBjYWxsYmFjaykpO1xufVxuZnVuY3Rpb24gY3JlYXRlX3Nsb3QoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbikge1xuICAgIGlmIChkZWZpbml0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNsb3RfY3R4ID0gZ2V0X3Nsb3RfY29udGV4dChkZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGZuKTtcbiAgICAgICAgcmV0dXJuIGRlZmluaXRpb25bMF0oc2xvdF9jdHgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbikge1xuICAgIHJldHVybiBkZWZpbml0aW9uWzFdICYmIGZuXG4gICAgICAgID8gYXNzaWduKCQkc2NvcGUuY3R4LnNsaWNlKCksIGRlZmluaXRpb25bMV0oZm4oY3R4KSkpXG4gICAgICAgIDogJCRzY29wZS5jdHg7XG59XG5mdW5jdGlvbiBnZXRfc2xvdF9jaGFuZ2VzKGRlZmluaXRpb24sICQkc2NvcGUsIGRpcnR5LCBmbikge1xuICAgIGlmIChkZWZpbml0aW9uWzJdICYmIGZuKSB7XG4gICAgICAgIGNvbnN0IGxldHMgPSBkZWZpbml0aW9uWzJdKGZuKGRpcnR5KSk7XG4gICAgICAgIGlmICgkJHNjb3BlLmRpcnR5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBsZXRzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbGV0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZCA9IFtdO1xuICAgICAgICAgICAgY29uc3QgbGVuID0gTWF0aC5tYXgoJCRzY29wZS5kaXJ0eS5sZW5ndGgsIGxldHMubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBtZXJnZWRbaV0gPSAkJHNjb3BlLmRpcnR5W2ldIHwgbGV0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtZXJnZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICQkc2NvcGUuZGlydHkgfCBsZXRzO1xuICAgIH1cbiAgICByZXR1cm4gJCRzY29wZS5kaXJ0eTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZV9zbG90X2Jhc2Uoc2xvdCwgc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIHNsb3RfY2hhbmdlcywgZ2V0X3Nsb3RfY29udGV4dF9mbikge1xuICAgIGlmIChzbG90X2NoYW5nZXMpIHtcbiAgICAgICAgY29uc3Qgc2xvdF9jb250ZXh0ID0gZ2V0X3Nsb3RfY29udGV4dChzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZ2V0X3Nsb3RfY29udGV4dF9mbik7XG4gICAgICAgIHNsb3QucChzbG90X2NvbnRleHQsIHNsb3RfY2hhbmdlcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlX3Nsb3Qoc2xvdCwgc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGRpcnR5LCBnZXRfc2xvdF9jaGFuZ2VzX2ZuLCBnZXRfc2xvdF9jb250ZXh0X2ZuKSB7XG4gICAgY29uc3Qgc2xvdF9jaGFuZ2VzID0gZ2V0X3Nsb3RfY2hhbmdlcyhzbG90X2RlZmluaXRpb24sICQkc2NvcGUsIGRpcnR5LCBnZXRfc2xvdF9jaGFuZ2VzX2ZuKTtcbiAgICB1cGRhdGVfc2xvdF9iYXNlKHNsb3QsIHNsb3RfZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBzbG90X2NoYW5nZXMsIGdldF9zbG90X2NvbnRleHRfZm4pO1xufVxuZnVuY3Rpb24gZ2V0X2FsbF9kaXJ0eV9mcm9tX3Njb3BlKCQkc2NvcGUpIHtcbiAgICBpZiAoJCRzY29wZS5jdHgubGVuZ3RoID4gMzIpIHtcbiAgICAgICAgY29uc3QgZGlydHkgPSBbXTtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gJCRzY29wZS5jdHgubGVuZ3RoIC8gMzI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRpcnR5W2ldID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpcnR5O1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5mdW5jdGlvbiBleGNsdWRlX2ludGVybmFsX3Byb3BzKHByb3BzKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBrIGluIHByb3BzKVxuICAgICAgICBpZiAoa1swXSAhPT0gJyQnKVxuICAgICAgICAgICAgcmVzdWx0W2tdID0gcHJvcHNba107XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGNvbXB1dGVfcmVzdF9wcm9wcyhwcm9wcywga2V5cykge1xuICAgIGNvbnN0IHJlc3QgPSB7fTtcbiAgICBrZXlzID0gbmV3IFNldChrZXlzKTtcbiAgICBmb3IgKGNvbnN0IGsgaW4gcHJvcHMpXG4gICAgICAgIGlmICgha2V5cy5oYXMoaykgJiYga1swXSAhPT0gJyQnKVxuICAgICAgICAgICAgcmVzdFtrXSA9IHByb3BzW2tdO1xuICAgIHJldHVybiByZXN0O1xufVxuZnVuY3Rpb24gY29tcHV0ZV9zbG90cyhzbG90cykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNsb3RzKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG9uY2UoZm4pIHtcbiAgICBsZXQgcmFuID0gZmFsc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIGlmIChyYW4pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHJhbiA9IHRydWU7XG4gICAgICAgIGZuLmNhbGwodGhpcywgLi4uYXJncyk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG51bGxfdG9fZW1wdHkodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG59XG5mdW5jdGlvbiBzZXRfc3RvcmVfdmFsdWUoc3RvcmUsIHJldCwgdmFsdWUpIHtcbiAgICBzdG9yZS5zZXQodmFsdWUpO1xuICAgIHJldHVybiByZXQ7XG59XG5jb25zdCBoYXNfcHJvcCA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xuZnVuY3Rpb24gYWN0aW9uX2Rlc3Ryb3llcihhY3Rpb25fcmVzdWx0KSB7XG4gICAgcmV0dXJuIGFjdGlvbl9yZXN1bHQgJiYgaXNfZnVuY3Rpb24oYWN0aW9uX3Jlc3VsdC5kZXN0cm95KSA/IGFjdGlvbl9yZXN1bHQuZGVzdHJveSA6IG5vb3A7XG59XG5cbmNvbnN0IGlzX2NsaWVudCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuZXhwb3J0cy5ub3cgPSBpc19jbGllbnRcbiAgICA/ICgpID0+IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgIDogKCkgPT4gRGF0ZS5ub3coKTtcbmV4cG9ydHMucmFmID0gaXNfY2xpZW50ID8gY2IgPT4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNiKSA6IG5vb3A7XG4vLyB1c2VkIGludGVybmFsbHkgZm9yIHRlc3RpbmdcbmZ1bmN0aW9uIHNldF9ub3coZm4pIHtcbiAgICBleHBvcnRzLm5vdyA9IGZuO1xufVxuZnVuY3Rpb24gc2V0X3JhZihmbikge1xuICAgIGV4cG9ydHMucmFmID0gZm47XG59XG5cbmNvbnN0IHRhc2tzID0gbmV3IFNldCgpO1xuZnVuY3Rpb24gcnVuX3Rhc2tzKG5vdykge1xuICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIGlmICghdGFzay5jKG5vdykpIHtcbiAgICAgICAgICAgIHRhc2tzLmRlbGV0ZSh0YXNrKTtcbiAgICAgICAgICAgIHRhc2suZigpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRhc2tzLnNpemUgIT09IDApXG4gICAgICAgIGV4cG9ydHMucmFmKHJ1bl90YXNrcyk7XG59XG4vKipcbiAqIEZvciB0ZXN0aW5nIHB1cnBvc2VzIG9ubHkhXG4gKi9cbmZ1bmN0aW9uIGNsZWFyX2xvb3BzKCkge1xuICAgIHRhc2tzLmNsZWFyKCk7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdGFzayB0aGF0IHJ1bnMgb24gZWFjaCByYWYgZnJhbWVcbiAqIHVudGlsIGl0IHJldHVybnMgYSBmYWxzeSB2YWx1ZSBvciBpcyBhYm9ydGVkXG4gKi9cbmZ1bmN0aW9uIGxvb3AoY2FsbGJhY2spIHtcbiAgICBsZXQgdGFzaztcbiAgICBpZiAodGFza3Muc2l6ZSA9PT0gMClcbiAgICAgICAgZXhwb3J0cy5yYWYocnVuX3Rhc2tzKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlOiBuZXcgUHJvbWlzZShmdWxmaWxsID0+IHtcbiAgICAgICAgICAgIHRhc2tzLmFkZCh0YXNrID0geyBjOiBjYWxsYmFjaywgZjogZnVsZmlsbCB9KTtcbiAgICAgICAgfSksXG4gICAgICAgIGFib3J0KCkge1xuICAgICAgICAgICAgdGFza3MuZGVsZXRlKHRhc2spO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLy8gVHJhY2sgd2hpY2ggbm9kZXMgYXJlIGNsYWltZWQgZHVyaW5nIGh5ZHJhdGlvbi4gVW5jbGFpbWVkIG5vZGVzIGNhbiB0aGVuIGJlIHJlbW92ZWQgZnJvbSB0aGUgRE9NXG4vLyBhdCB0aGUgZW5kIG9mIGh5ZHJhdGlvbiB3aXRob3V0IHRvdWNoaW5nIHRoZSByZW1haW5pbmcgbm9kZXMuXG5sZXQgaXNfaHlkcmF0aW5nID0gZmFsc2U7XG5mdW5jdGlvbiBzdGFydF9oeWRyYXRpbmcoKSB7XG4gICAgaXNfaHlkcmF0aW5nID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGVuZF9oeWRyYXRpbmcoKSB7XG4gICAgaXNfaHlkcmF0aW5nID0gZmFsc2U7XG59XG5mdW5jdGlvbiB1cHBlcl9ib3VuZChsb3csIGhpZ2gsIGtleSwgdmFsdWUpIHtcbiAgICAvLyBSZXR1cm4gZmlyc3QgaW5kZXggb2YgdmFsdWUgbGFyZ2VyIHRoYW4gaW5wdXQgdmFsdWUgaW4gdGhlIHJhbmdlIFtsb3csIGhpZ2gpXG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgICAgY29uc3QgbWlkID0gbG93ICsgKChoaWdoIC0gbG93KSA+PiAxKTtcbiAgICAgICAgaWYgKGtleShtaWQpIDw9IHZhbHVlKSB7XG4gICAgICAgICAgICBsb3cgPSBtaWQgKyAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGlnaCA9IG1pZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbG93O1xufVxuZnVuY3Rpb24gaW5pdF9oeWRyYXRlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuaHlkcmF0ZV9pbml0KVxuICAgICAgICByZXR1cm47XG4gICAgdGFyZ2V0Lmh5ZHJhdGVfaW5pdCA9IHRydWU7XG4gICAgLy8gV2Uga25vdyB0aGF0IGFsbCBjaGlsZHJlbiBoYXZlIGNsYWltX29yZGVyIHZhbHVlcyBzaW5jZSB0aGUgdW5jbGFpbWVkIGhhdmUgYmVlbiBkZXRhY2hlZCBpZiB0YXJnZXQgaXMgbm90IDxoZWFkPlxuICAgIGxldCBjaGlsZHJlbiA9IHRhcmdldC5jaGlsZE5vZGVzO1xuICAgIC8vIElmIHRhcmdldCBpcyA8aGVhZD4sIHRoZXJlIG1heSBiZSBjaGlsZHJlbiB3aXRob3V0IGNsYWltX29yZGVyXG4gICAgaWYgKHRhcmdldC5ub2RlTmFtZSA9PT0gJ0hFQUQnKSB7XG4gICAgICAgIGNvbnN0IG15Q2hpbGRyZW4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG5vZGUuY2xhaW1fb3JkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG15Q2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGlsZHJlbiA9IG15Q2hpbGRyZW47XG4gICAgfVxuICAgIC8qXG4gICAgKiBSZW9yZGVyIGNsYWltZWQgY2hpbGRyZW4gb3B0aW1hbGx5LlxuICAgICogV2UgY2FuIHJlb3JkZXIgY2xhaW1lZCBjaGlsZHJlbiBvcHRpbWFsbHkgYnkgZmluZGluZyB0aGUgbG9uZ2VzdCBzdWJzZXF1ZW5jZSBvZlxuICAgICogbm9kZXMgdGhhdCBhcmUgYWxyZWFkeSBjbGFpbWVkIGluIG9yZGVyIGFuZCBvbmx5IG1vdmluZyB0aGUgcmVzdC4gVGhlIGxvbmdlc3RcbiAgICAqIHN1YnNlcXVlbmNlIHN1YnNlcXVlbmNlIG9mIG5vZGVzIHRoYXQgYXJlIGNsYWltZWQgaW4gb3JkZXIgY2FuIGJlIGZvdW5kIGJ5XG4gICAgKiBjb21wdXRpbmcgdGhlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiAuY2xhaW1fb3JkZXIgdmFsdWVzLlxuICAgICpcbiAgICAqIFRoaXMgYWxnb3JpdGhtIGlzIG9wdGltYWwgaW4gZ2VuZXJhdGluZyB0aGUgbGVhc3QgYW1vdW50IG9mIHJlb3JkZXIgb3BlcmF0aW9uc1xuICAgICogcG9zc2libGUuXG4gICAgKlxuICAgICogUHJvb2Y6XG4gICAgKiBXZSBrbm93IHRoYXQsIGdpdmVuIGEgc2V0IG9mIHJlb3JkZXJpbmcgb3BlcmF0aW9ucywgdGhlIG5vZGVzIHRoYXQgZG8gbm90IG1vdmVcbiAgICAqIGFsd2F5cyBmb3JtIGFuIGluY3JlYXNpbmcgc3Vic2VxdWVuY2UsIHNpbmNlIHRoZXkgZG8gbm90IG1vdmUgYW1vbmcgZWFjaCBvdGhlclxuICAgICogbWVhbmluZyB0aGF0IHRoZXkgbXVzdCBiZSBhbHJlYWR5IG9yZGVyZWQgYW1vbmcgZWFjaCBvdGhlci4gVGh1cywgdGhlIG1heGltYWxcbiAgICAqIHNldCBvZiBub2RlcyB0aGF0IGRvIG5vdCBtb3ZlIGZvcm0gYSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UuXG4gICAgKi9cbiAgICAvLyBDb21wdXRlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZVxuICAgIC8vIG06IHN1YnNlcXVlbmNlIGxlbmd0aCBqID0+IGluZGV4IGsgb2Ygc21hbGxlc3QgdmFsdWUgdGhhdCBlbmRzIGFuIGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2YgbGVuZ3RoIGpcbiAgICBjb25zdCBtID0gbmV3IEludDMyQXJyYXkoY2hpbGRyZW4ubGVuZ3RoICsgMSk7XG4gICAgLy8gUHJlZGVjZXNzb3IgaW5kaWNlcyArIDFcbiAgICBjb25zdCBwID0gbmV3IEludDMyQXJyYXkoY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICBtWzBdID0gLTE7XG4gICAgbGV0IGxvbmdlc3QgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IGNoaWxkcmVuW2ldLmNsYWltX29yZGVyO1xuICAgICAgICAvLyBGaW5kIHRoZSBsYXJnZXN0IHN1YnNlcXVlbmNlIGxlbmd0aCBzdWNoIHRoYXQgaXQgZW5kcyBpbiBhIHZhbHVlIGxlc3MgdGhhbiBvdXIgY3VycmVudCB2YWx1ZVxuICAgICAgICAvLyB1cHBlcl9ib3VuZCByZXR1cm5zIGZpcnN0IGdyZWF0ZXIgdmFsdWUsIHNvIHdlIHN1YnRyYWN0IG9uZVxuICAgICAgICAvLyB3aXRoIGZhc3QgcGF0aCBmb3Igd2hlbiB3ZSBhcmUgb24gdGhlIGN1cnJlbnQgbG9uZ2VzdCBzdWJzZXF1ZW5jZVxuICAgICAgICBjb25zdCBzZXFMZW4gPSAoKGxvbmdlc3QgPiAwICYmIGNoaWxkcmVuW21bbG9uZ2VzdF1dLmNsYWltX29yZGVyIDw9IGN1cnJlbnQpID8gbG9uZ2VzdCArIDEgOiB1cHBlcl9ib3VuZCgxLCBsb25nZXN0LCBpZHggPT4gY2hpbGRyZW5bbVtpZHhdXS5jbGFpbV9vcmRlciwgY3VycmVudCkpIC0gMTtcbiAgICAgICAgcFtpXSA9IG1bc2VxTGVuXSArIDE7XG4gICAgICAgIGNvbnN0IG5ld0xlbiA9IHNlcUxlbiArIDE7XG4gICAgICAgIC8vIFdlIGNhbiBndWFyYW50ZWUgdGhhdCBjdXJyZW50IGlzIHRoZSBzbWFsbGVzdCB2YWx1ZS4gT3RoZXJ3aXNlLCB3ZSB3b3VsZCBoYXZlIGdlbmVyYXRlZCBhIGxvbmdlciBzZXF1ZW5jZS5cbiAgICAgICAgbVtuZXdMZW5dID0gaTtcbiAgICAgICAgbG9uZ2VzdCA9IE1hdGgubWF4KG5ld0xlbiwgbG9uZ2VzdCk7XG4gICAgfVxuICAgIC8vIFRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2Ygbm9kZXMgKGluaXRpYWxseSByZXZlcnNlZClcbiAgICBjb25zdCBsaXMgPSBbXTtcbiAgICAvLyBUaGUgcmVzdCBvZiB0aGUgbm9kZXMsIG5vZGVzIHRoYXQgd2lsbCBiZSBtb3ZlZFxuICAgIGNvbnN0IHRvTW92ZSA9IFtdO1xuICAgIGxldCBsYXN0ID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGxldCBjdXIgPSBtW2xvbmdlc3RdICsgMTsgY3VyICE9IDA7IGN1ciA9IHBbY3VyIC0gMV0pIHtcbiAgICAgICAgbGlzLnB1c2goY2hpbGRyZW5bY3VyIC0gMV0pO1xuICAgICAgICBmb3IgKDsgbGFzdCA+PSBjdXI7IGxhc3QtLSkge1xuICAgICAgICAgICAgdG9Nb3ZlLnB1c2goY2hpbGRyZW5bbGFzdF0pO1xuICAgICAgICB9XG4gICAgICAgIGxhc3QtLTtcbiAgICB9XG4gICAgZm9yICg7IGxhc3QgPj0gMDsgbGFzdC0tKSB7XG4gICAgICAgIHRvTW92ZS5wdXNoKGNoaWxkcmVuW2xhc3RdKTtcbiAgICB9XG4gICAgbGlzLnJldmVyc2UoKTtcbiAgICAvLyBXZSBzb3J0IHRoZSBub2RlcyBiZWluZyBtb3ZlZCB0byBndWFyYW50ZWUgdGhhdCB0aGVpciBpbnNlcnRpb24gb3JkZXIgbWF0Y2hlcyB0aGUgY2xhaW0gb3JkZXJcbiAgICB0b01vdmUuc29ydCgoYSwgYikgPT4gYS5jbGFpbV9vcmRlciAtIGIuY2xhaW1fb3JkZXIpO1xuICAgIC8vIEZpbmFsbHksIHdlIG1vdmUgdGhlIG5vZGVzXG4gICAgZm9yIChsZXQgaSA9IDAsIGogPSAwOyBpIDwgdG9Nb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdoaWxlIChqIDwgbGlzLmxlbmd0aCAmJiB0b01vdmVbaV0uY2xhaW1fb3JkZXIgPj0gbGlzW2pdLmNsYWltX29yZGVyKSB7XG4gICAgICAgICAgICBqKys7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYW5jaG9yID0gaiA8IGxpcy5sZW5ndGggPyBsaXNbal0gOiBudWxsO1xuICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKHRvTW92ZVtpXSwgYW5jaG9yKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhcHBlbmQodGFyZ2V0LCBub2RlKSB7XG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKG5vZGUpO1xufVxuZnVuY3Rpb24gYXBwZW5kX3N0eWxlcyh0YXJnZXQsIHN0eWxlX3NoZWV0X2lkLCBzdHlsZXMpIHtcbiAgICBjb25zdCBhcHBlbmRfc3R5bGVzX3RvID0gZ2V0X3Jvb3RfZm9yX3N0eWxlKHRhcmdldCk7XG4gICAgaWYgKCFhcHBlbmRfc3R5bGVzX3RvLmdldEVsZW1lbnRCeUlkKHN0eWxlX3NoZWV0X2lkKSkge1xuICAgICAgICBjb25zdCBzdHlsZSA9IGVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIHN0eWxlLmlkID0gc3R5bGVfc2hlZXRfaWQ7XG4gICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gc3R5bGVzO1xuICAgICAgICBhcHBlbmRfc3R5bGVzaGVldChhcHBlbmRfc3R5bGVzX3RvLCBzdHlsZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0X3Jvb3RfZm9yX3N0eWxlKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUpXG4gICAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICBjb25zdCByb290ID0gbm9kZS5nZXRSb290Tm9kZSA/IG5vZGUuZ2V0Um9vdE5vZGUoKSA6IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICBpZiAocm9vdCAmJiByb290Lmhvc3QpIHtcbiAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuICAgIHJldHVybiBub2RlLm93bmVyRG9jdW1lbnQ7XG59XG5mdW5jdGlvbiBhcHBlbmRfZW1wdHlfc3R5bGVzaGVldChub2RlKSB7XG4gICAgY29uc3Qgc3R5bGVfZWxlbWVudCA9IGVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgYXBwZW5kX3N0eWxlc2hlZXQoZ2V0X3Jvb3RfZm9yX3N0eWxlKG5vZGUpLCBzdHlsZV9lbGVtZW50KTtcbiAgICByZXR1cm4gc3R5bGVfZWxlbWVudC5zaGVldDtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9zdHlsZXNoZWV0KG5vZGUsIHN0eWxlKSB7XG4gICAgYXBwZW5kKG5vZGUuaGVhZCB8fCBub2RlLCBzdHlsZSk7XG4gICAgcmV0dXJuIHN0eWxlLnNoZWV0O1xufVxuZnVuY3Rpb24gYXBwZW5kX2h5ZHJhdGlvbih0YXJnZXQsIG5vZGUpIHtcbiAgICBpZiAoaXNfaHlkcmF0aW5nKSB7XG4gICAgICAgIGluaXRfaHlkcmF0ZSh0YXJnZXQpO1xuICAgICAgICBpZiAoKHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkID09PSB1bmRlZmluZWQpIHx8ICgodGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgIT09IG51bGwpICYmICh0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZC5wYXJlbnROb2RlICE9PSB0YXJnZXQpKSkge1xuICAgICAgICAgICAgdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgPSB0YXJnZXQuZmlyc3RDaGlsZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBTa2lwIG5vZGVzIG9mIHVuZGVmaW5lZCBvcmRlcmluZ1xuICAgICAgICB3aGlsZSAoKHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkICE9PSBudWxsKSAmJiAodGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQuY2xhaW1fb3JkZXIgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkID0gdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUgIT09IHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkKSB7XG4gICAgICAgICAgICAvLyBXZSBvbmx5IGluc2VydCBpZiB0aGUgb3JkZXJpbmcgb2YgdGhpcyBub2RlIHNob3VsZCBiZSBtb2RpZmllZCBvciB0aGUgcGFyZW50IG5vZGUgaXMgbm90IHRhcmdldFxuICAgICAgICAgICAgaWYgKG5vZGUuY2xhaW1fb3JkZXIgIT09IHVuZGVmaW5lZCB8fCBub2RlLnBhcmVudE5vZGUgIT09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUucGFyZW50Tm9kZSAhPT0gdGFyZ2V0IHx8IG5vZGUubmV4dFNpYmxpbmcgIT09IG51bGwpIHtcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgYW5jaG9yIHx8IG51bGwpO1xufVxuZnVuY3Rpb24gaW5zZXJ0X2h5ZHJhdGlvbih0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIGlmIChpc19oeWRyYXRpbmcgJiYgIWFuY2hvcikge1xuICAgICAgICBhcHBlbmRfaHlkcmF0aW9uKHRhcmdldCwgbm9kZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUucGFyZW50Tm9kZSAhPT0gdGFyZ2V0IHx8IG5vZGUubmV4dFNpYmxpbmcgIT0gYW5jaG9yKSB7XG4gICAgICAgIHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgYW5jaG9yIHx8IG51bGwpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaChub2RlKSB7XG4gICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xufVxuZnVuY3Rpb24gZGVzdHJveV9lYWNoKGl0ZXJhdGlvbnMsIGRldGFjaGluZykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcmF0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoaXRlcmF0aW9uc1tpXSlcbiAgICAgICAgICAgIGl0ZXJhdGlvbnNbaV0uZChkZXRhY2hpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGVsZW1lbnQobmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xufVxuZnVuY3Rpb24gZWxlbWVudF9pcyhuYW1lLCBpcykge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUsIHsgaXMgfSk7XG59XG5mdW5jdGlvbiBvYmplY3Rfd2l0aG91dF9wcm9wZXJ0aWVzKG9iaiwgZXhjbHVkZSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHt9O1xuICAgIGZvciAoY29uc3QgayBpbiBvYmopIHtcbiAgICAgICAgaWYgKGhhc19wcm9wKG9iaiwgaylcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICYmIGV4Y2x1ZGUuaW5kZXhPZihrKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRhcmdldFtrXSA9IG9ialtrXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gc3ZnX2VsZW1lbnQobmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgbmFtZSk7XG59XG5mdW5jdGlvbiB0ZXh0KGRhdGEpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZGF0YSk7XG59XG5mdW5jdGlvbiBzcGFjZSgpIHtcbiAgICByZXR1cm4gdGV4dCgnICcpO1xufVxuZnVuY3Rpb24gZW1wdHkoKSB7XG4gICAgcmV0dXJuIHRleHQoJycpO1xufVxuZnVuY3Rpb24gbGlzdGVuKG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICByZXR1cm4gKCkgPT4gbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHByZXZlbnRfZGVmYXVsdChmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHN0b3BfcHJvcGFnYXRpb24oZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gc2VsZihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzKVxuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHRydXN0ZWQoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKGV2ZW50LmlzVHJ1c3RlZClcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICBlbHNlIGlmIChub2RlLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpICE9PSB2YWx1ZSlcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBzZXRfYXR0cmlidXRlcyhub2RlLCBhdHRyaWJ1dGVzKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMobm9kZS5fX3Byb3RvX18pO1xuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXNba2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ19fdmFsdWUnKSB7XG4gICAgICAgICAgICBub2RlLnZhbHVlID0gbm9kZVtrZXldID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0b3JzW2tleV0gJiYgZGVzY3JpcHRvcnNba2V5XS5zZXQpIHtcbiAgICAgICAgICAgIG5vZGVba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF0dHIobm9kZSwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X3N2Z19hdHRyaWJ1dGVzKG5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGF0dHIobm9kZSwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9jdXN0b21fZWxlbWVudF9kYXRhKG5vZGUsIHByb3AsIHZhbHVlKSB7XG4gICAgaWYgKHByb3AgaW4gbm9kZSkge1xuICAgICAgICBub2RlW3Byb3BdID0gdHlwZW9mIG5vZGVbcHJvcF0gPT09ICdib29sZWFuJyAmJiB2YWx1ZSA9PT0gJycgPyB0cnVlIDogdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhdHRyKG5vZGUsIHByb3AsIHZhbHVlKTtcbiAgICB9XG59XG5mdW5jdGlvbiB4bGlua19hdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBub2RlLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgYXR0cmlidXRlLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBnZXRfYmluZGluZ19ncm91cF92YWx1ZShncm91cCwgX192YWx1ZSwgY2hlY2tlZCkge1xuICAgIGNvbnN0IHZhbHVlID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGdyb3VwW2ldLmNoZWNrZWQpXG4gICAgICAgICAgICB2YWx1ZS5hZGQoZ3JvdXBbaV0uX192YWx1ZSk7XG4gICAgfVxuICAgIGlmICghY2hlY2tlZCkge1xuICAgICAgICB2YWx1ZS5kZWxldGUoX192YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHRvX251bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gJycgPyBudWxsIDogK3ZhbHVlO1xufVxuZnVuY3Rpb24gdGltZV9yYW5nZXNfdG9fYXJyYXkocmFuZ2VzKSB7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBhcnJheS5wdXNoKHsgc3RhcnQ6IHJhbmdlcy5zdGFydChpKSwgZW5kOiByYW5nZXMuZW5kKGkpIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG59XG5mdW5jdGlvbiBjaGlsZHJlbihlbGVtZW50KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKTtcbn1cbmZ1bmN0aW9uIGluaXRfY2xhaW1faW5mbyhub2Rlcykge1xuICAgIGlmIChub2Rlcy5jbGFpbV9pbmZvID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbm9kZXMuY2xhaW1faW5mbyA9IHsgbGFzdF9pbmRleDogMCwgdG90YWxfY2xhaW1lZDogMCB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNsYWltX25vZGUobm9kZXMsIHByZWRpY2F0ZSwgcHJvY2Vzc05vZGUsIGNyZWF0ZU5vZGUsIGRvbnRVcGRhdGVMYXN0SW5kZXggPSBmYWxzZSkge1xuICAgIC8vIFRyeSB0byBmaW5kIG5vZGVzIGluIGFuIG9yZGVyIHN1Y2ggdGhhdCB3ZSBsZW5ndGhlbiB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlXG4gICAgaW5pdF9jbGFpbV9pbmZvKG5vZGVzKTtcbiAgICBjb25zdCByZXN1bHROb2RlID0gKCgpID0+IHtcbiAgICAgICAgLy8gV2UgZmlyc3QgdHJ5IHRvIGZpbmQgYW4gZWxlbWVudCBhZnRlciB0aGUgcHJldmlvdXMgb25lXG4gICAgICAgIGZvciAobGV0IGkgPSBub2Rlcy5jbGFpbV9pbmZvLmxhc3RfaW5kZXg7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VtZW50ID0gcHJvY2Vzc05vZGUobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcGxhY2VtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXNbaV0gPSByZXBsYWNlbWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFkb250VXBkYXRlTGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLmNsYWltX2luZm8ubGFzdF9pbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE90aGVyd2lzZSwgd2UgdHJ5IHRvIGZpbmQgb25lIGJlZm9yZVxuICAgICAgICAvLyBXZSBpdGVyYXRlIGluIHJldmVyc2Ugc28gdGhhdCB3ZSBkb24ndCBnbyB0b28gZmFyIGJhY2tcbiAgICAgICAgZm9yIChsZXQgaSA9IG5vZGVzLmNsYWltX2luZm8ubGFzdF9pbmRleCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZW1lbnQgPSBwcm9jZXNzTm9kZShub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVwbGFjZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2Rlc1tpXSA9IHJlcGxhY2VtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWRvbnRVcGRhdGVMYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmVwbGFjZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB3ZSBzcGxpY2VkIGJlZm9yZSB0aGUgbGFzdF9pbmRleCwgd2UgZGVjcmVhc2UgaXRcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4LS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIGNhbid0IGZpbmQgYW55IG1hdGNoaW5nIG5vZGUsIHdlIGNyZWF0ZSBhIG5ldyBvbmVcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU5vZGUoKTtcbiAgICB9KSgpO1xuICAgIHJlc3VsdE5vZGUuY2xhaW1fb3JkZXIgPSBub2Rlcy5jbGFpbV9pbmZvLnRvdGFsX2NsYWltZWQ7XG4gICAgbm9kZXMuY2xhaW1faW5mby50b3RhbF9jbGFpbWVkICs9IDE7XG4gICAgcmV0dXJuIHJlc3VsdE5vZGU7XG59XG5mdW5jdGlvbiBjbGFpbV9lbGVtZW50X2Jhc2Uobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMsIGNyZWF0ZV9lbGVtZW50KSB7XG4gICAgcmV0dXJuIGNsYWltX25vZGUobm9kZXMsIChub2RlKSA9PiBub2RlLm5vZGVOYW1lID09PSBuYW1lLCAobm9kZSkgPT4ge1xuICAgICAgICBjb25zdCByZW1vdmUgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG5vZGUuYXR0cmlidXRlc1tqXTtcbiAgICAgICAgICAgIGlmICghYXR0cmlidXRlc1thdHRyaWJ1dGUubmFtZV0pIHtcbiAgICAgICAgICAgICAgICByZW1vdmUucHVzaChhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVtb3ZlLmZvckVhY2godiA9PiBub2RlLnJlbW92ZUF0dHJpYnV0ZSh2KSk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSwgKCkgPT4gY3JlYXRlX2VsZW1lbnQobmFtZSkpO1xufVxuZnVuY3Rpb24gY2xhaW1fZWxlbWVudChub2RlcywgbmFtZSwgYXR0cmlidXRlcykge1xuICAgIHJldHVybiBjbGFpbV9lbGVtZW50X2Jhc2Uobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMsIGVsZW1lbnQpO1xufVxuZnVuY3Rpb24gY2xhaW1fc3ZnX2VsZW1lbnQobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMpIHtcbiAgICByZXR1cm4gY2xhaW1fZWxlbWVudF9iYXNlKG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzLCBzdmdfZWxlbWVudCk7XG59XG5mdW5jdGlvbiBjbGFpbV90ZXh0KG5vZGVzLCBkYXRhKSB7XG4gICAgcmV0dXJuIGNsYWltX25vZGUobm9kZXMsIChub2RlKSA9PiBub2RlLm5vZGVUeXBlID09PSAzLCAobm9kZSkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhU3RyID0gJycgKyBkYXRhO1xuICAgICAgICBpZiAobm9kZS5kYXRhLnN0YXJ0c1dpdGgoZGF0YVN0cikpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmRhdGEubGVuZ3RoICE9PSBkYXRhU3RyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlLnNwbGl0VGV4dChkYXRhU3RyLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBub2RlLmRhdGEgPSBkYXRhU3RyO1xuICAgICAgICB9XG4gICAgfSwgKCkgPT4gdGV4dChkYXRhKSwgdHJ1ZSAvLyBUZXh0IG5vZGVzIHNob3VsZCBub3QgdXBkYXRlIGxhc3QgaW5kZXggc2luY2UgaXQgaXMgbGlrZWx5IG5vdCB3b3J0aCBpdCB0byBlbGltaW5hdGUgYW4gaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiBhY3R1YWwgZWxlbWVudHNcbiAgICApO1xufVxuZnVuY3Rpb24gY2xhaW1fc3BhY2Uobm9kZXMpIHtcbiAgICByZXR1cm4gY2xhaW1fdGV4dChub2RlcywgJyAnKTtcbn1cbmZ1bmN0aW9uIGZpbmRfY29tbWVudChub2RlcywgdGV4dCwgc3RhcnQpIHtcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSA4IC8qIGNvbW1lbnQgbm9kZSAqLyAmJiBub2RlLnRleHRDb250ZW50LnRyaW0oKSA9PT0gdGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzLmxlbmd0aDtcbn1cbmZ1bmN0aW9uIGNsYWltX2h0bWxfdGFnKG5vZGVzLCBpc19zdmcpIHtcbiAgICAvLyBmaW5kIGh0bWwgb3BlbmluZyB0YWdcbiAgICBjb25zdCBzdGFydF9pbmRleCA9IGZpbmRfY29tbWVudChub2RlcywgJ0hUTUxfVEFHX1NUQVJUJywgMCk7XG4gICAgY29uc3QgZW5kX2luZGV4ID0gZmluZF9jb21tZW50KG5vZGVzLCAnSFRNTF9UQUdfRU5EJywgc3RhcnRfaW5kZXgpO1xuICAgIGlmIChzdGFydF9pbmRleCA9PT0gZW5kX2luZGV4KSB7XG4gICAgICAgIHJldHVybiBuZXcgSHRtbFRhZ0h5ZHJhdGlvbih1bmRlZmluZWQsIGlzX3N2Zyk7XG4gICAgfVxuICAgIGluaXRfY2xhaW1faW5mbyhub2Rlcyk7XG4gICAgY29uc3QgaHRtbF90YWdfbm9kZXMgPSBub2Rlcy5zcGxpY2Uoc3RhcnRfaW5kZXgsIGVuZF9pbmRleCAtIHN0YXJ0X2luZGV4ICsgMSk7XG4gICAgZGV0YWNoKGh0bWxfdGFnX25vZGVzWzBdKTtcbiAgICBkZXRhY2goaHRtbF90YWdfbm9kZXNbaHRtbF90YWdfbm9kZXMubGVuZ3RoIC0gMV0pO1xuICAgIGNvbnN0IGNsYWltZWRfbm9kZXMgPSBodG1sX3RhZ19ub2Rlcy5zbGljZSgxLCBodG1sX3RhZ19ub2Rlcy5sZW5ndGggLSAxKTtcbiAgICBmb3IgKGNvbnN0IG4gb2YgY2xhaW1lZF9ub2Rlcykge1xuICAgICAgICBuLmNsYWltX29yZGVyID0gbm9kZXMuY2xhaW1faW5mby50b3RhbF9jbGFpbWVkO1xuICAgICAgICBub2Rlcy5jbGFpbV9pbmZvLnRvdGFsX2NsYWltZWQgKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBIdG1sVGFnSHlkcmF0aW9uKGNsYWltZWRfbm9kZXMsIGlzX3N2Zyk7XG59XG5mdW5jdGlvbiBzZXRfZGF0YSh0ZXh0LCBkYXRhKSB7XG4gICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICBpZiAodGV4dC53aG9sZVRleHQgIT09IGRhdGEpXG4gICAgICAgIHRleHQuZGF0YSA9IGRhdGE7XG59XG5mdW5jdGlvbiBzZXRfaW5wdXRfdmFsdWUoaW5wdXQsIHZhbHVlKSB7XG4gICAgaW5wdXQudmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHNldF9pbnB1dF90eXBlKGlucHV0LCB0eXBlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaW5wdXQudHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfc3R5bGUobm9kZSwga2V5LCB2YWx1ZSwgaW1wb3J0YW50KSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIG5vZGUuc3R5bGUucmVtb3ZlUHJvcGVydHkoa2V5KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG5vZGUuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSwgaW1wb3J0YW50ID8gJ2ltcG9ydGFudCcgOiAnJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2VsZWN0X29wdGlvbihzZWxlY3QsIHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcbiAgICAgICAgaWYgKG9wdGlvbi5fX3ZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY3Quc2VsZWN0ZWRJbmRleCA9IC0xOyAvLyBubyBvcHRpb24gc2hvdWxkIGJlIHNlbGVjdGVkXG59XG5mdW5jdGlvbiBzZWxlY3Rfb3B0aW9ucyhzZWxlY3QsIHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gfnZhbHVlLmluZGV4T2Yob3B0aW9uLl9fdmFsdWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNlbGVjdF92YWx1ZShzZWxlY3QpIHtcbiAgICBjb25zdCBzZWxlY3RlZF9vcHRpb24gPSBzZWxlY3QucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKSB8fCBzZWxlY3Qub3B0aW9uc1swXTtcbiAgICByZXR1cm4gc2VsZWN0ZWRfb3B0aW9uICYmIHNlbGVjdGVkX29wdGlvbi5fX3ZhbHVlO1xufVxuZnVuY3Rpb24gc2VsZWN0X211bHRpcGxlX3ZhbHVlKHNlbGVjdCkge1xuICAgIHJldHVybiBbXS5tYXAuY2FsbChzZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnOmNoZWNrZWQnKSwgb3B0aW9uID0+IG9wdGlvbi5fX3ZhbHVlKTtcbn1cbi8vIHVuZm9ydHVuYXRlbHkgdGhpcyBjYW4ndCBiZSBhIGNvbnN0YW50IGFzIHRoYXQgd291bGRuJ3QgYmUgdHJlZS1zaGFrZWFibGVcbi8vIHNvIHdlIGNhY2hlIHRoZSByZXN1bHQgaW5zdGVhZFxubGV0IGNyb3Nzb3JpZ2luO1xuZnVuY3Rpb24gaXNfY3Jvc3NvcmlnaW4oKSB7XG4gICAgaWYgKGNyb3Nzb3JpZ2luID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3Jvc3NvcmlnaW4gPSBmYWxzZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgdm9pZCB3aW5kb3cucGFyZW50LmRvY3VtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY3Jvc3NvcmlnaW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjcm9zc29yaWdpbjtcbn1cbmZ1bmN0aW9uIGFkZF9yZXNpemVfbGlzdGVuZXIobm9kZSwgZm4pIHtcbiAgICBjb25zdCBjb21wdXRlZF9zdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgaWYgKGNvbXB1dGVkX3N0eWxlLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICB9XG4gICAgY29uc3QgaWZyYW1lID0gZWxlbWVudCgnaWZyYW1lJyk7XG4gICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogYmxvY2s7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyAnICtcbiAgICAgICAgJ292ZXJmbG93OiBoaWRkZW47IGJvcmRlcjogMDsgb3BhY2l0eTogMDsgcG9pbnRlci1ldmVudHM6IG5vbmU7IHotaW5kZXg6IC0xOycpO1xuICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBpZnJhbWUudGFiSW5kZXggPSAtMTtcbiAgICBjb25zdCBjcm9zc29yaWdpbiA9IGlzX2Nyb3Nzb3JpZ2luKCk7XG4gICAgbGV0IHVuc3Vic2NyaWJlO1xuICAgIGlmIChjcm9zc29yaWdpbikge1xuICAgICAgICBpZnJhbWUuc3JjID0gXCJkYXRhOnRleHQvaHRtbCw8c2NyaXB0Pm9ucmVzaXplPWZ1bmN0aW9uKCl7cGFyZW50LnBvc3RNZXNzYWdlKDAsJyonKX08L3NjcmlwdD5cIjtcbiAgICAgICAgdW5zdWJzY3JpYmUgPSBsaXN0ZW4od2luZG93LCAnbWVzc2FnZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gaWZyYW1lLmNvbnRlbnRXaW5kb3cpXG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZnJhbWUuc3JjID0gJ2Fib3V0OmJsYW5rJztcbiAgICAgICAgaWZyYW1lLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlID0gbGlzdGVuKGlmcmFtZS5jb250ZW50V2luZG93LCAncmVzaXplJywgZm4pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBhcHBlbmQobm9kZSwgaWZyYW1lKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoY3Jvc3NvcmlnaW4pIHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodW5zdWJzY3JpYmUgJiYgaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZGV0YWNoKGlmcmFtZSk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHRvZ2dsZV9jbGFzcyhlbGVtZW50LCBuYW1lLCB0b2dnbGUpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdFt0b2dnbGUgPyAnYWRkJyA6ICdyZW1vdmUnXShuYW1lKTtcbn1cbmZ1bmN0aW9uIGN1c3RvbV9ldmVudCh0eXBlLCBkZXRhaWwsIHsgYnViYmxlcyA9IGZhbHNlLCBjYW5jZWxhYmxlID0gZmFsc2UgfSA9IHt9KSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIGRldGFpbCk7XG4gICAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBxdWVyeV9zZWxlY3Rvcl9hbGwoc2VsZWN0b3IsIHBhcmVudCA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xufVxuY2xhc3MgSHRtbFRhZyB7XG4gICAgY29uc3RydWN0b3IoaXNfc3ZnID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5pc19zdmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc19zdmcgPSBpc19zdmc7XG4gICAgICAgIHRoaXMuZSA9IHRoaXMubiA9IG51bGw7XG4gICAgfVxuICAgIGMoaHRtbCkge1xuICAgICAgICB0aGlzLmgoaHRtbCk7XG4gICAgfVxuICAgIG0oaHRtbCwgdGFyZ2V0LCBhbmNob3IgPSBudWxsKSB7XG4gICAgICAgIGlmICghdGhpcy5lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc19zdmcpXG4gICAgICAgICAgICAgICAgdGhpcy5lID0gc3ZnX2VsZW1lbnQodGFyZ2V0Lm5vZGVOYW1lKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmUgPSBlbGVtZW50KHRhcmdldC5ub2RlTmFtZSk7XG4gICAgICAgICAgICB0aGlzLnQgPSB0YXJnZXQ7XG4gICAgICAgICAgICB0aGlzLmMoaHRtbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pKGFuY2hvcik7XG4gICAgfVxuICAgIGgoaHRtbCkge1xuICAgICAgICB0aGlzLmUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgdGhpcy5uID0gQXJyYXkuZnJvbSh0aGlzLmUuY2hpbGROb2Rlcyk7XG4gICAgfVxuICAgIGkoYW5jaG9yKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpbnNlcnQodGhpcy50LCB0aGlzLm5baV0sIGFuY2hvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcChodG1sKSB7XG4gICAgICAgIHRoaXMuZCgpO1xuICAgICAgICB0aGlzLmgoaHRtbCk7XG4gICAgICAgIHRoaXMuaSh0aGlzLmEpO1xuICAgIH1cbiAgICBkKCkge1xuICAgICAgICB0aGlzLm4uZm9yRWFjaChkZXRhY2gpO1xuICAgIH1cbn1cbmNsYXNzIEh0bWxUYWdIeWRyYXRpb24gZXh0ZW5kcyBIdG1sVGFnIHtcbiAgICBjb25zdHJ1Y3RvcihjbGFpbWVkX25vZGVzLCBpc19zdmcgPSBmYWxzZSkge1xuICAgICAgICBzdXBlcihpc19zdmcpO1xuICAgICAgICB0aGlzLmUgPSB0aGlzLm4gPSBudWxsO1xuICAgICAgICB0aGlzLmwgPSBjbGFpbWVkX25vZGVzO1xuICAgIH1cbiAgICBjKGh0bWwpIHtcbiAgICAgICAgaWYgKHRoaXMubCkge1xuICAgICAgICAgICAgdGhpcy5uID0gdGhpcy5sO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuYyhodG1sKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpKGFuY2hvcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubi5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaW5zZXJ0X2h5ZHJhdGlvbih0aGlzLnQsIHRoaXMubltpXSwgYW5jaG9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGF0dHJpYnV0ZV90b19vYmplY3QoYXR0cmlidXRlcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3QgYXR0cmlidXRlIG9mIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmVzdWx0W2F0dHJpYnV0ZS5uYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGdldF9jdXN0b21fZWxlbWVudHNfc2xvdHMoZWxlbWVudCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIHJlc3VsdFtub2RlLnNsb3QgfHwgJ2RlZmF1bHQnXSA9IHRydWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gd2UgbmVlZCB0byBzdG9yZSB0aGUgaW5mb3JtYXRpb24gZm9yIG11bHRpcGxlIGRvY3VtZW50cyBiZWNhdXNlIGEgU3ZlbHRlIGFwcGxpY2F0aW9uIGNvdWxkIGFsc28gY29udGFpbiBpZnJhbWVzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlL2lzc3Vlcy8zNjI0XG5jb25zdCBtYW5hZ2VkX3N0eWxlcyA9IG5ldyBNYXAoKTtcbmxldCBhY3RpdmUgPSAwO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Rhcmtza3lhcHAvc3RyaW5nLWhhc2gvYmxvYi9tYXN0ZXIvaW5kZXguanNcbmZ1bmN0aW9uIGhhc2goc3RyKSB7XG4gICAgbGV0IGhhc2ggPSA1MzgxO1xuICAgIGxldCBpID0gc3RyLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgXiBzdHIuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gaGFzaCA+Pj4gMDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9zdHlsZV9pbmZvcm1hdGlvbihkb2MsIG5vZGUpIHtcbiAgICBjb25zdCBpbmZvID0geyBzdHlsZXNoZWV0OiBhcHBlbmRfZW1wdHlfc3R5bGVzaGVldChub2RlKSwgcnVsZXM6IHt9IH07XG4gICAgbWFuYWdlZF9zdHlsZXMuc2V0KGRvYywgaW5mbyk7XG4gICAgcmV0dXJuIGluZm87XG59XG5mdW5jdGlvbiBjcmVhdGVfcnVsZShub2RlLCBhLCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2UsIGZuLCB1aWQgPSAwKSB7XG4gICAgY29uc3Qgc3RlcCA9IDE2LjY2NiAvIGR1cmF0aW9uO1xuICAgIGxldCBrZXlmcmFtZXMgPSAne1xcbic7XG4gICAgZm9yIChsZXQgcCA9IDA7IHAgPD0gMTsgcCArPSBzdGVwKSB7XG4gICAgICAgIGNvbnN0IHQgPSBhICsgKGIgLSBhKSAqIGVhc2UocCk7XG4gICAgICAgIGtleWZyYW1lcyArPSBwICogMTAwICsgYCV7JHtmbih0LCAxIC0gdCl9fVxcbmA7XG4gICAgfVxuICAgIGNvbnN0IHJ1bGUgPSBrZXlmcmFtZXMgKyBgMTAwJSB7JHtmbihiLCAxIC0gYil9fVxcbn1gO1xuICAgIGNvbnN0IG5hbWUgPSBgX19zdmVsdGVfJHtoYXNoKHJ1bGUpfV8ke3VpZH1gO1xuICAgIGNvbnN0IGRvYyA9IGdldF9yb290X2Zvcl9zdHlsZShub2RlKTtcbiAgICBjb25zdCB7IHN0eWxlc2hlZXQsIHJ1bGVzIH0gPSBtYW5hZ2VkX3N0eWxlcy5nZXQoZG9jKSB8fCBjcmVhdGVfc3R5bGVfaW5mb3JtYXRpb24oZG9jLCBub2RlKTtcbiAgICBpZiAoIXJ1bGVzW25hbWVdKSB7XG4gICAgICAgIHJ1bGVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgc3R5bGVzaGVldC5pbnNlcnRSdWxlKGBAa2V5ZnJhbWVzICR7bmFtZX0gJHtydWxlfWAsIHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICB9XG4gICAgY29uc3QgYW5pbWF0aW9uID0gbm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJyc7XG4gICAgbm9kZS5zdHlsZS5hbmltYXRpb24gPSBgJHthbmltYXRpb24gPyBgJHthbmltYXRpb259LCBgIDogJyd9JHtuYW1lfSAke2R1cmF0aW9ufW1zIGxpbmVhciAke2RlbGF5fW1zIDEgYm90aGA7XG4gICAgYWN0aXZlICs9IDE7XG4gICAgcmV0dXJuIG5hbWU7XG59XG5mdW5jdGlvbiBkZWxldGVfcnVsZShub2RlLCBuYW1lKSB7XG4gICAgY29uc3QgcHJldmlvdXMgPSAobm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJycpLnNwbGl0KCcsICcpO1xuICAgIGNvbnN0IG5leHQgPSBwcmV2aW91cy5maWx0ZXIobmFtZVxuICAgICAgICA/IGFuaW0gPT4gYW5pbS5pbmRleE9mKG5hbWUpIDwgMCAvLyByZW1vdmUgc3BlY2lmaWMgYW5pbWF0aW9uXG4gICAgICAgIDogYW5pbSA9PiBhbmltLmluZGV4T2YoJ19fc3ZlbHRlJykgPT09IC0xIC8vIHJlbW92ZSBhbGwgU3ZlbHRlIGFuaW1hdGlvbnNcbiAgICApO1xuICAgIGNvbnN0IGRlbGV0ZWQgPSBwcmV2aW91cy5sZW5ndGggLSBuZXh0Lmxlbmd0aDtcbiAgICBpZiAoZGVsZXRlZCkge1xuICAgICAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IG5leHQuam9pbignLCAnKTtcbiAgICAgICAgYWN0aXZlIC09IGRlbGV0ZWQ7XG4gICAgICAgIGlmICghYWN0aXZlKVxuICAgICAgICAgICAgY2xlYXJfcnVsZXMoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjbGVhcl9ydWxlcygpIHtcbiAgICBleHBvcnRzLnJhZigoKSA9PiB7XG4gICAgICAgIGlmIChhY3RpdmUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIG1hbmFnZWRfc3R5bGVzLmZvckVhY2goaW5mbyA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IG93bmVyTm9kZSB9ID0gaW5mby5zdHlsZXNoZWV0O1xuICAgICAgICAgICAgLy8gdGhlcmUgaXMgbm8gb3duZXJOb2RlIGlmIGl0IHJ1bnMgb24ganNkb20uXG4gICAgICAgICAgICBpZiAob3duZXJOb2RlKVxuICAgICAgICAgICAgICAgIGRldGFjaChvd25lck5vZGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgbWFuYWdlZF9zdHlsZXMuY2xlYXIoKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlX2FuaW1hdGlvbihub2RlLCBmcm9tLCBmbiwgcGFyYW1zKSB7XG4gICAgaWYgKCFmcm9tKVxuICAgICAgICByZXR1cm4gbm9vcDtcbiAgICBjb25zdCB0byA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGZyb20ubGVmdCA9PT0gdG8ubGVmdCAmJiBmcm9tLnJpZ2h0ID09PSB0by5yaWdodCAmJiBmcm9tLnRvcCA9PT0gdG8udG9wICYmIGZyb20uYm90dG9tID09PSB0by5ib3R0b20pXG4gICAgICAgIHJldHVybiBub29wO1xuICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIFxuICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogc2hvdWxkIHRoaXMgYmUgc2VwYXJhdGVkIGZyb20gZGVzdHJ1Y3R1cmluZz8gT3Igc3RhcnQvZW5kIGFkZGVkIHRvIHB1YmxpYyBhcGkgYW5kIGRvY3VtZW50YXRpb24/XG4gICAgc3RhcnQ6IHN0YXJ0X3RpbWUgPSBleHBvcnRzLm5vdygpICsgZGVsYXksIFxuICAgIC8vIEB0cy1pZ25vcmUgdG9kbzpcbiAgICBlbmQgPSBzdGFydF90aW1lICsgZHVyYXRpb24sIHRpY2sgPSBub29wLCBjc3MgfSA9IGZuKG5vZGUsIHsgZnJvbSwgdG8gfSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IHRydWU7XG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICBsZXQgbmFtZTtcbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVsYXkpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBuYW1lKTtcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgIGlmICghc3RhcnRlZCAmJiBub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0ZWQgJiYgbm93ID49IGVuZCkge1xuICAgICAgICAgICAgdGljaygxLCAwKTtcbiAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRlZCkge1xuICAgICAgICAgICAgY29uc3QgcCA9IG5vdyAtIHN0YXJ0X3RpbWU7XG4gICAgICAgICAgICBjb25zdCB0ID0gMCArIDEgKiBlYXNpbmcocCAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIHN0YXJ0KCk7XG4gICAgdGljaygwLCAxKTtcbiAgICByZXR1cm4gc3RvcDtcbn1cbmZ1bmN0aW9uIGZpeF9wb3NpdGlvbihub2RlKSB7XG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIGlmIChzdHlsZS5wb3NpdGlvbiAhPT0gJ2Fic29sdXRlJyAmJiBzdHlsZS5wb3NpdGlvbiAhPT0gJ2ZpeGVkJykge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHN0eWxlO1xuICAgICAgICBjb25zdCBhID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIG5vZGUuc3R5bGUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgbm9kZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGFkZF90cmFuc2Zvcm0obm9kZSwgYSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkX3RyYW5zZm9ybShub2RlLCBhKSB7XG4gICAgY29uc3QgYiA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGEubGVmdCAhPT0gYi5sZWZ0IHx8IGEudG9wICE9PSBiLnRvcCkge1xuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSA9PT0gJ25vbmUnID8gJycgOiBzdHlsZS50cmFuc2Zvcm07XG4gICAgICAgIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gYCR7dHJhbnNmb3JtfSB0cmFuc2xhdGUoJHthLmxlZnQgLSBiLmxlZnR9cHgsICR7YS50b3AgLSBiLnRvcH1weClgO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgIGV4cG9ydHMuY3VycmVudF9jb21wb25lbnQgPSBjb21wb25lbnQ7XG59XG5mdW5jdGlvbiBnZXRfY3VycmVudF9jb21wb25lbnQoKSB7XG4gICAgaWYgKCFleHBvcnRzLmN1cnJlbnRfY29tcG9uZW50KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Z1bmN0aW9uIGNhbGxlZCBvdXRzaWRlIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbicpO1xuICAgIHJldHVybiBleHBvcnRzLmN1cnJlbnRfY29tcG9uZW50O1xufVxuZnVuY3Rpb24gYmVmb3JlVXBkYXRlKGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYmVmb3JlX3VwZGF0ZS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIG9uTW91bnQoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9tb3VudC5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGFmdGVyVXBkYXRlKGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYWZ0ZXJfdXBkYXRlLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gb25EZXN0cm95KGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQub25fZGVzdHJveS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlcigpIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcbiAgICByZXR1cm4gKHR5cGUsIGRldGFpbCwgeyBjYW5jZWxhYmxlID0gZmFsc2UgfSA9IHt9KSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IGNvbXBvbmVudC4kJC5jYWxsYmFja3NbdHlwZV07XG4gICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgIC8vIFRPRE8gYXJlIHRoZXJlIHNpdHVhdGlvbnMgd2hlcmUgZXZlbnRzIGNvdWxkIGJlIGRpc3BhdGNoZWRcbiAgICAgICAgICAgIC8vIGluIGEgc2VydmVyIChub24tRE9NKSBlbnZpcm9ubWVudD9cbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCwgeyBjYW5jZWxhYmxlIH0pO1xuICAgICAgICAgICAgY2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaChmbiA9PiB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbChjb21wb25lbnQsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuICFldmVudC5kZWZhdWx0UHJldmVudGVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG59XG5mdW5jdGlvbiBzZXRDb250ZXh0KGtleSwgY29udGV4dCkge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuc2V0KGtleSwgY29udGV4dCk7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59XG5mdW5jdGlvbiBnZXRDb250ZXh0KGtleSkge1xuICAgIHJldHVybiBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LmdldChrZXkpO1xufVxuZnVuY3Rpb24gZ2V0QWxsQ29udGV4dHMoKSB7XG4gICAgcmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQ7XG59XG5mdW5jdGlvbiBoYXNDb250ZXh0KGtleSkge1xuICAgIHJldHVybiBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LmhhcyhrZXkpO1xufVxuLy8gVE9ETyBmaWd1cmUgb3V0IGlmIHdlIHN0aWxsIHdhbnQgdG8gc3VwcG9ydFxuLy8gc2hvcnRoYW5kIGV2ZW50cywgb3IgaWYgd2Ugd2FudCB0byBpbXBsZW1lbnRcbi8vIGEgcmVhbCBidWJibGluZyBtZWNoYW5pc21cbmZ1bmN0aW9uIGJ1YmJsZShjb21wb25lbnQsIGV2ZW50KSB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1tldmVudC50eXBlXTtcbiAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaChmbiA9PiBmbi5jYWxsKHRoaXMsIGV2ZW50KSk7XG4gICAgfVxufVxuXG5jb25zdCBkaXJ0eV9jb21wb25lbnRzID0gW107XG5jb25zdCBpbnRyb3MgPSB7IGVuYWJsZWQ6IGZhbHNlIH07XG5jb25zdCBiaW5kaW5nX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgcmVuZGVyX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgZmx1c2hfY2FsbGJhY2tzID0gW107XG5jb25zdCByZXNvbHZlZF9wcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5sZXQgdXBkYXRlX3NjaGVkdWxlZCA9IGZhbHNlO1xuZnVuY3Rpb24gc2NoZWR1bGVfdXBkYXRlKCkge1xuICAgIGlmICghdXBkYXRlX3NjaGVkdWxlZCkge1xuICAgICAgICB1cGRhdGVfc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgcmVzb2x2ZWRfcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0aWNrKCkge1xuICAgIHNjaGVkdWxlX3VwZGF0ZSgpO1xuICAgIHJldHVybiByZXNvbHZlZF9wcm9taXNlO1xufVxuZnVuY3Rpb24gYWRkX3JlbmRlcl9jYWxsYmFjayhmbikge1xuICAgIHJlbmRlcl9jYWxsYmFja3MucHVzaChmbik7XG59XG5mdW5jdGlvbiBhZGRfZmx1c2hfY2FsbGJhY2soZm4pIHtcbiAgICBmbHVzaF9jYWxsYmFja3MucHVzaChmbik7XG59XG4vLyBmbHVzaCgpIGNhbGxzIGNhbGxiYWNrcyBpbiB0aGlzIG9yZGVyOlxuLy8gMS4gQWxsIGJlZm9yZVVwZGF0ZSBjYWxsYmFja3MsIGluIG9yZGVyOiBwYXJlbnRzIGJlZm9yZSBjaGlsZHJlblxuLy8gMi4gQWxsIGJpbmQ6dGhpcyBjYWxsYmFja3MsIGluIHJldmVyc2Ugb3JkZXI6IGNoaWxkcmVuIGJlZm9yZSBwYXJlbnRzLlxuLy8gMy4gQWxsIGFmdGVyVXBkYXRlIGNhbGxiYWNrcywgaW4gb3JkZXI6IHBhcmVudHMgYmVmb3JlIGNoaWxkcmVuLiBFWENFUFRcbi8vICAgIGZvciBhZnRlclVwZGF0ZXMgY2FsbGVkIGR1cmluZyB0aGUgaW5pdGlhbCBvbk1vdW50LCB3aGljaCBhcmUgY2FsbGVkIGluXG4vLyAgICByZXZlcnNlIG9yZGVyOiBjaGlsZHJlbiBiZWZvcmUgcGFyZW50cy5cbi8vIFNpbmNlIGNhbGxiYWNrcyBtaWdodCB1cGRhdGUgY29tcG9uZW50IHZhbHVlcywgd2hpY2ggY291bGQgdHJpZ2dlciBhbm90aGVyXG4vLyBjYWxsIHRvIGZsdXNoKCksIHRoZSBmb2xsb3dpbmcgc3RlcHMgZ3VhcmQgYWdhaW5zdCB0aGlzOlxuLy8gMS4gRHVyaW5nIGJlZm9yZVVwZGF0ZSwgYW55IHVwZGF0ZWQgY29tcG9uZW50cyB3aWxsIGJlIGFkZGVkIHRvIHRoZVxuLy8gICAgZGlydHlfY29tcG9uZW50cyBhcnJheSBhbmQgd2lsbCBjYXVzZSBhIHJlZW50cmFudCBjYWxsIHRvIGZsdXNoKCkuIEJlY2F1c2Vcbi8vICAgIHRoZSBmbHVzaCBpbmRleCBpcyBrZXB0IG91dHNpZGUgdGhlIGZ1bmN0aW9uLCB0aGUgcmVlbnRyYW50IGNhbGwgd2lsbCBwaWNrXG4vLyAgICB1cCB3aGVyZSB0aGUgZWFybGllciBjYWxsIGxlZnQgb2ZmIGFuZCBnbyB0aHJvdWdoIGFsbCBkaXJ0eSBjb21wb25lbnRzLiBUaGVcbi8vICAgIGN1cnJlbnRfY29tcG9uZW50IHZhbHVlIGlzIHNhdmVkIGFuZCByZXN0b3JlZCBzbyB0aGF0IHRoZSByZWVudHJhbnQgY2FsbCB3aWxsXG4vLyAgICBub3QgaW50ZXJmZXJlIHdpdGggdGhlIFwicGFyZW50XCIgZmx1c2goKSBjYWxsLlxuLy8gMi4gYmluZDp0aGlzIGNhbGxiYWNrcyBjYW5ub3QgdHJpZ2dlciBuZXcgZmx1c2goKSBjYWxscy5cbi8vIDMuIER1cmluZyBhZnRlclVwZGF0ZSwgYW55IHVwZGF0ZWQgY29tcG9uZW50cyB3aWxsIE5PVCBoYXZlIHRoZWlyIGFmdGVyVXBkYXRlXG4vLyAgICBjYWxsYmFjayBjYWxsZWQgYSBzZWNvbmQgdGltZTsgdGhlIHNlZW5fY2FsbGJhY2tzIHNldCwgb3V0c2lkZSB0aGUgZmx1c2goKVxuLy8gICAgZnVuY3Rpb24sIGd1YXJhbnRlZXMgdGhpcyBiZWhhdmlvci5cbmNvbnN0IHNlZW5fY2FsbGJhY2tzID0gbmV3IFNldCgpO1xubGV0IGZsdXNoaWR4ID0gMDsgLy8gRG8gKm5vdCogbW92ZSB0aGlzIGluc2lkZSB0aGUgZmx1c2goKSBmdW5jdGlvblxuZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgY29uc3Qgc2F2ZWRfY29tcG9uZW50ID0gZXhwb3J0cy5jdXJyZW50X2NvbXBvbmVudDtcbiAgICBkbyB7XG4gICAgICAgIC8vIGZpcnN0LCBjYWxsIGJlZm9yZVVwZGF0ZSBmdW5jdGlvbnNcbiAgICAgICAgLy8gYW5kIHVwZGF0ZSBjb21wb25lbnRzXG4gICAgICAgIHdoaWxlIChmbHVzaGlkeCA8IGRpcnR5X2NvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBkaXJ0eV9jb21wb25lbnRzW2ZsdXNoaWR4XTtcbiAgICAgICAgICAgIGZsdXNoaWR4Kys7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShjb21wb25lbnQuJCQpO1xuICAgICAgICB9XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChudWxsKTtcbiAgICAgICAgZGlydHlfY29tcG9uZW50cy5sZW5ndGggPSAwO1xuICAgICAgICBmbHVzaGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChiaW5kaW5nX2NhbGxiYWNrcy5sZW5ndGgpXG4gICAgICAgICAgICBiaW5kaW5nX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgICAgICAvLyB0aGVuLCBvbmNlIGNvbXBvbmVudHMgYXJlIHVwZGF0ZWQsIGNhbGxcbiAgICAgICAgLy8gYWZ0ZXJVcGRhdGUgZnVuY3Rpb25zLiBUaGlzIG1heSBjYXVzZVxuICAgICAgICAvLyBzdWJzZXF1ZW50IHVwZGF0ZXMuLi5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHJlbmRlcl9jYWxsYmFja3NbaV07XG4gICAgICAgICAgICBpZiAoIXNlZW5fY2FsbGJhY2tzLmhhcyhjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICAvLyAuLi5zbyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGxvb3BzXG4gICAgICAgICAgICAgICAgc2Vlbl9jYWxsYmFja3MuYWRkKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlbmRlcl9jYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICB9IHdoaWxlIChkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCk7XG4gICAgd2hpbGUgKGZsdXNoX2NhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgZmx1c2hfY2FsbGJhY2tzLnBvcCgpKCk7XG4gICAgfVxuICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbiAgICBzZWVuX2NhbGxiYWNrcy5jbGVhcigpO1xuICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChzYXZlZF9jb21wb25lbnQpO1xufVxuZnVuY3Rpb24gdXBkYXRlKCQkKSB7XG4gICAgaWYgKCQkLmZyYWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICQkLnVwZGF0ZSgpO1xuICAgICAgICBydW5fYWxsKCQkLmJlZm9yZV91cGRhdGUpO1xuICAgICAgICBjb25zdCBkaXJ0eSA9ICQkLmRpcnR5O1xuICAgICAgICAkJC5kaXJ0eSA9IFstMV07XG4gICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LnAoJCQuY3R4LCBkaXJ0eSk7XG4gICAgICAgICQkLmFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xuICAgIH1cbn1cblxubGV0IHByb21pc2U7XG5mdW5jdGlvbiB3YWl0KCkge1xuICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2gobm9kZSwgZGlyZWN0aW9uLCBraW5kKSB7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGN1c3RvbV9ldmVudChgJHtkaXJlY3Rpb24gPyAnaW50cm8nIDogJ291dHJvJ30ke2tpbmR9YCkpO1xufVxuY29uc3Qgb3V0cm9pbmcgPSBuZXcgU2V0KCk7XG5sZXQgb3V0cm9zO1xuZnVuY3Rpb24gZ3JvdXBfb3V0cm9zKCkge1xuICAgIG91dHJvcyA9IHtcbiAgICAgICAgcjogMCxcbiAgICAgICAgYzogW10sXG4gICAgICAgIHA6IG91dHJvcyAvLyBwYXJlbnQgZ3JvdXBcbiAgICB9O1xufVxuZnVuY3Rpb24gY2hlY2tfb3V0cm9zKCkge1xuICAgIGlmICghb3V0cm9zLnIpIHtcbiAgICAgICAgcnVuX2FsbChvdXRyb3MuYyk7XG4gICAgfVxuICAgIG91dHJvcyA9IG91dHJvcy5wO1xufVxuZnVuY3Rpb24gdHJhbnNpdGlvbl9pbihibG9jaywgbG9jYWwpIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2suaSkge1xuICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICBibG9jay5pKGxvY2FsKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uX291dChibG9jaywgbG9jYWwsIGRldGFjaCwgY2FsbGJhY2spIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2subykge1xuICAgICAgICBpZiAob3V0cm9pbmcuaGFzKGJsb2NrKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgb3V0cm9pbmcuYWRkKGJsb2NrKTtcbiAgICAgICAgb3V0cm9zLmMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRldGFjaClcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suZCgxKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYmxvY2subyhsb2NhbCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxufVxuY29uc3QgbnVsbF90cmFuc2l0aW9uID0geyBkdXJhdGlvbjogMCB9O1xuZnVuY3Rpb24gY3JlYXRlX2luX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gZmFsc2U7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGxldCB0YXNrO1xuICAgIGxldCB1aWQgPSAwO1xuICAgIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ28oKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MsIHVpZCsrKTtcbiAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IGV4cG9ydHMubm93KCkgKyBkZWxheTtcbiAgICAgICAgY29uc3QgZW5kX3RpbWUgPSBzdGFydF90aW1lICsgZHVyYXRpb247XG4gICAgICAgIGlmICh0YXNrKVxuICAgICAgICAgICAgdGFzay5hYm9ydCgpO1xuICAgICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCB0cnVlLCAnc3RhcnQnKSk7XG4gICAgICAgIHRhc2sgPSBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGljaygxLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgdHJ1ZSwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gZWFzaW5nKChub3cgLSBzdGFydF90aW1lKSAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0KCkge1xuICAgICAgICAgICAgaWYgKHN0YXJ0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlKTtcbiAgICAgICAgICAgIGlmIChpc19mdW5jdGlvbihjb25maWcpKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICAgICAgd2FpdCgpLnRoZW4oZ28pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ28oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZGF0ZSgpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW5kKCkge1xuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9vdXRfdHJhbnNpdGlvbihub2RlLCBmbiwgcGFyYW1zKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHJ1bm5pbmcgPSB0cnVlO1xuICAgIGxldCBhbmltYXRpb25fbmFtZTtcbiAgICBjb25zdCBncm91cCA9IG91dHJvcztcbiAgICBncm91cC5yICs9IDE7XG4gICAgZnVuY3Rpb24gZ28oKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDEsIDAsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xuICAgICAgICBjb25zdCBzdGFydF90aW1lID0gZXhwb3J0cy5ub3coKSArIGRlbGF5O1xuICAgICAgICBjb25zdCBlbmRfdGltZSA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbjtcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ3N0YXJ0JykpO1xuICAgICAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgZmFsc2UsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEtLWdyb3VwLnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgd2lsbCByZXN1bHQgaW4gYGVuZCgpYCBiZWluZyBjYWxsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzbyB3ZSBkb24ndCBuZWVkIHRvIGNsZWFuIHVwIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bl9hbGwoZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSAtIHQsIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgd2FpdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICBnbygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdvKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGVuZChyZXNldCkge1xuICAgICAgICAgICAgaWYgKHJlc2V0ICYmIGNvbmZpZy50aWNrKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLnRpY2soMSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfYmlkaXJlY3Rpb25hbF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMsIGludHJvKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHQgPSBpbnRybyA/IDAgOiAxO1xuICAgIGxldCBydW5uaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBhbmltYXRpb25fbmFtZSA9IG51bGw7XG4gICAgZnVuY3Rpb24gY2xlYXJfYW5pbWF0aW9uKCkge1xuICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQocHJvZ3JhbSwgZHVyYXRpb24pIHtcbiAgICAgICAgY29uc3QgZCA9IChwcm9ncmFtLmIgLSB0KTtcbiAgICAgICAgZHVyYXRpb24gKj0gTWF0aC5hYnMoZCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhOiB0LFxuICAgICAgICAgICAgYjogcHJvZ3JhbS5iLFxuICAgICAgICAgICAgZCxcbiAgICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgICAgc3RhcnQ6IHByb2dyYW0uc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHByb2dyYW0uc3RhcnQgKyBkdXJhdGlvbixcbiAgICAgICAgICAgIGdyb3VwOiBwcm9ncmFtLmdyb3VwXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdvKGIpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgY29uc3QgcHJvZ3JhbSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiBleHBvcnRzLm5vdygpICsgZGVsYXksXG4gICAgICAgICAgICBiXG4gICAgICAgIH07XG4gICAgICAgIGlmICghYikge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBpbXByb3ZlIHR5cGluZ3NcbiAgICAgICAgICAgIHByb2dyYW0uZ3JvdXAgPSBvdXRyb3M7XG4gICAgICAgICAgICBvdXRyb3MuciArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0gfHwgcGVuZGluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICBwZW5kaW5nX3Byb2dyYW0gPSBwcm9ncmFtO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhbiBpbnRybywgYW5kIHRoZXJlJ3MgYSBkZWxheSwgd2UgbmVlZCB0byBkb1xuICAgICAgICAgICAgLy8gYW4gaW5pdGlhbCB0aWNrIGFuZC9vciBhcHBseSBDU1MgYW5pbWF0aW9uIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCB0LCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiKVxuICAgICAgICAgICAgICAgIHRpY2soMCwgMSk7XG4gICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBpbml0KHByb2dyYW0sIGR1cmF0aW9uKTtcbiAgICAgICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgYiwgJ3N0YXJ0JykpO1xuICAgICAgICAgICAgbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nX3Byb2dyYW0gJiYgbm93ID4gcGVuZGluZ19wcm9ncmFtLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IGluaXQocGVuZGluZ19wcm9ncmFtLCBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHJ1bm5pbmdfcHJvZ3JhbS5iLCAnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIHQsIHJ1bm5pbmdfcHJvZ3JhbS5iLCBydW5uaW5nX3Byb2dyYW0uZHVyYXRpb24sIDAsIGVhc2luZywgY29uZmlnLmNzcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm93ID49IHJ1bm5pbmdfcHJvZ3JhbS5lbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2sodCA9IHJ1bm5pbmdfcHJvZ3JhbS5iLCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBydW5uaW5nX3Byb2dyYW0uYiwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwZW5kaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSdyZSBkb25lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbS5iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGludHJvIFx1MjAxNCB3ZSBjYW4gdGlkeSB1cCBpbW1lZGlhdGVseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG91dHJvIFx1MjAxNCBuZWVkcyB0byBiZSBjb29yZGluYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIS0tcnVubmluZ19wcm9ncmFtLmdyb3VwLnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5fYWxsKHJ1bm5pbmdfcHJvZ3JhbS5ncm91cC5jKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5vdyA+PSBydW5uaW5nX3Byb2dyYW0uc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBub3cgLSBydW5uaW5nX3Byb2dyYW0uc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ID0gcnVubmluZ19wcm9ncmFtLmEgKyBydW5uaW5nX3Byb2dyYW0uZCAqIGVhc2luZyhwIC8gcnVubmluZ19wcm9ncmFtLmR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhIShydW5uaW5nX3Byb2dyYW0gfHwgcGVuZGluZ19wcm9ncmFtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJ1bihiKSB7XG4gICAgICAgICAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIHdhaXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgICAgICAgICAgZ28oYik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbyhiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW5kKCkge1xuICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX3Byb21pc2UocHJvbWlzZSwgaW5mbykge1xuICAgIGNvbnN0IHRva2VuID0gaW5mby50b2tlbiA9IHt9O1xuICAgIGZ1bmN0aW9uIHVwZGF0ZSh0eXBlLCBpbmRleCwga2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoaW5mby50b2tlbiAhPT0gdG9rZW4pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGluZm8ucmVzb2x2ZWQgPSB2YWx1ZTtcbiAgICAgICAgbGV0IGNoaWxkX2N0eCA9IGluZm8uY3R4O1xuICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNoaWxkX2N0eCA9IGNoaWxkX2N0eC5zbGljZSgpO1xuICAgICAgICAgICAgY2hpbGRfY3R4W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBibG9jayA9IHR5cGUgJiYgKGluZm8uY3VycmVudCA9IHR5cGUpKGNoaWxkX2N0eCk7XG4gICAgICAgIGxldCBuZWVkc19mbHVzaCA9IGZhbHNlO1xuICAgICAgICBpZiAoaW5mby5ibG9jaykge1xuICAgICAgICAgICAgaWYgKGluZm8uYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgaW5mby5ibG9ja3MuZm9yRWFjaCgoYmxvY2ssIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IGluZGV4ICYmIGJsb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cF9vdXRyb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25fb3V0KGJsb2NrLCAxLCAxLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8uYmxvY2tzW2ldID09PSBibG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvLmJsb2Nrc1tpXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja19vdXRyb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5mby5ibG9jay5kKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmxvY2suYygpO1xuICAgICAgICAgICAgdHJhbnNpdGlvbl9pbihibG9jaywgMSk7XG4gICAgICAgICAgICBibG9jay5tKGluZm8ubW91bnQoKSwgaW5mby5hbmNob3IpO1xuICAgICAgICAgICAgbmVlZHNfZmx1c2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGluZm8uYmxvY2sgPSBibG9jaztcbiAgICAgICAgaWYgKGluZm8uYmxvY2tzKVxuICAgICAgICAgICAgaW5mby5ibG9ja3NbaW5kZXhdID0gYmxvY2s7XG4gICAgICAgIGlmIChuZWVkc19mbHVzaCkge1xuICAgICAgICAgICAgZmx1c2goKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNfcHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICBjb25zdCBjdXJyZW50X2NvbXBvbmVudCA9IGdldF9jdXJyZW50X2NvbXBvbmVudCgpO1xuICAgICAgICBwcm9taXNlLnRoZW4odmFsdWUgPT4ge1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGN1cnJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnRoZW4sIDEsIGluZm8udmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChudWxsKTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGN1cnJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLmNhdGNoLCAyLCBpbmZvLmVycm9yLCBlcnJvcik7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgICAgICBpZiAoIWluZm8uaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGlmIHdlIHByZXZpb3VzbHkgaGFkIGEgdGhlbi9jYXRjaCBibG9jaywgZGVzdHJveSBpdFxuICAgICAgICBpZiAoaW5mby5jdXJyZW50ICE9PSBpbmZvLnBlbmRpbmcpIHtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnBlbmRpbmcsIDApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChpbmZvLmN1cnJlbnQgIT09IGluZm8udGhlbikge1xuICAgICAgICAgICAgdXBkYXRlKGluZm8udGhlbiwgMSwgaW5mby52YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLnJlc29sdmVkID0gcHJvbWlzZTtcbiAgICB9XG59XG5mdW5jdGlvbiB1cGRhdGVfYXdhaXRfYmxvY2tfYnJhbmNoKGluZm8sIGN0eCwgZGlydHkpIHtcbiAgICBjb25zdCBjaGlsZF9jdHggPSBjdHguc2xpY2UoKTtcbiAgICBjb25zdCB7IHJlc29sdmVkIH0gPSBpbmZvO1xuICAgIGlmIChpbmZvLmN1cnJlbnQgPT09IGluZm8udGhlbikge1xuICAgICAgICBjaGlsZF9jdHhbaW5mby52YWx1ZV0gPSByZXNvbHZlZDtcbiAgICB9XG4gICAgaWYgKGluZm8uY3VycmVudCA9PT0gaW5mby5jYXRjaCkge1xuICAgICAgICBjaGlsZF9jdHhbaW5mby5lcnJvcl0gPSByZXNvbHZlZDtcbiAgICB9XG4gICAgaW5mby5ibG9jay5wKGNoaWxkX2N0eCwgZGlydHkpO1xufVxuXG5jb25zdCBnbG9iYWxzID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgPyB3aW5kb3dcbiAgICA6IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IGdsb2JhbFRoaXNcbiAgICAgICAgOiBnbG9iYWwpO1xuXG5mdW5jdGlvbiBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5kKDEpO1xuICAgIGxvb2t1cC5kZWxldGUoYmxvY2sua2V5KTtcbn1cbmZ1bmN0aW9uIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICBsb29rdXAuZGVsZXRlKGJsb2NrLmtleSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmYoKTtcbiAgICBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuZnVuY3Rpb24gZml4X2FuZF9vdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZigpO1xuICAgIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuZnVuY3Rpb24gdXBkYXRlX2tleWVkX2VhY2gob2xkX2Jsb2NrcywgZGlydHksIGdldF9rZXksIGR5bmFtaWMsIGN0eCwgbGlzdCwgbG9va3VwLCBub2RlLCBkZXN0cm95LCBjcmVhdGVfZWFjaF9ibG9jaywgbmV4dCwgZ2V0X2NvbnRleHQpIHtcbiAgICBsZXQgbyA9IG9sZF9ibG9ja3MubGVuZ3RoO1xuICAgIGxldCBuID0gbGlzdC5sZW5ndGg7XG4gICAgbGV0IGkgPSBvO1xuICAgIGNvbnN0IG9sZF9pbmRleGVzID0ge307XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgb2xkX2luZGV4ZXNbb2xkX2Jsb2Nrc1tpXS5rZXldID0gaTtcbiAgICBjb25zdCBuZXdfYmxvY2tzID0gW107XG4gICAgY29uc3QgbmV3X2xvb2t1cCA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBkZWx0YXMgPSBuZXcgTWFwKCk7XG4gICAgaSA9IG47XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBjb25zdCBjaGlsZF9jdHggPSBnZXRfY29udGV4dChjdHgsIGxpc3QsIGkpO1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRfa2V5KGNoaWxkX2N0eCk7XG4gICAgICAgIGxldCBibG9jayA9IGxvb2t1cC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKCFibG9jaykge1xuICAgICAgICAgICAgYmxvY2sgPSBjcmVhdGVfZWFjaF9ibG9jayhrZXksIGNoaWxkX2N0eCk7XG4gICAgICAgICAgICBibG9jay5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZHluYW1pYykge1xuICAgICAgICAgICAgYmxvY2sucChjaGlsZF9jdHgsIGRpcnR5KTtcbiAgICAgICAgfVxuICAgICAgICBuZXdfbG9va3VwLnNldChrZXksIG5ld19ibG9ja3NbaV0gPSBibG9jayk7XG4gICAgICAgIGlmIChrZXkgaW4gb2xkX2luZGV4ZXMpXG4gICAgICAgICAgICBkZWx0YXMuc2V0KGtleSwgTWF0aC5hYnMoaSAtIG9sZF9pbmRleGVzW2tleV0pKTtcbiAgICB9XG4gICAgY29uc3Qgd2lsbF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IGRpZF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGZ1bmN0aW9uIGluc2VydChibG9jaykge1xuICAgICAgICB0cmFuc2l0aW9uX2luKGJsb2NrLCAxKTtcbiAgICAgICAgYmxvY2subShub2RlLCBuZXh0KTtcbiAgICAgICAgbG9va3VwLnNldChibG9jay5rZXksIGJsb2NrKTtcbiAgICAgICAgbmV4dCA9IGJsb2NrLmZpcnN0O1xuICAgICAgICBuLS07XG4gICAgfVxuICAgIHdoaWxlIChvICYmIG4pIHtcbiAgICAgICAgY29uc3QgbmV3X2Jsb2NrID0gbmV3X2Jsb2Nrc1tuIC0gMV07XG4gICAgICAgIGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3NbbyAtIDFdO1xuICAgICAgICBjb25zdCBuZXdfa2V5ID0gbmV3X2Jsb2NrLmtleTtcbiAgICAgICAgY29uc3Qgb2xkX2tleSA9IG9sZF9ibG9jay5rZXk7XG4gICAgICAgIGlmIChuZXdfYmxvY2sgPT09IG9sZF9ibG9jaykge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgbmV4dCA9IG5ld19ibG9jay5maXJzdDtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgICAgIG4tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbmV3X2xvb2t1cC5oYXMob2xkX2tleSkpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvbGQgYmxvY2tcbiAgICAgICAgICAgIGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFsb29rdXAuaGFzKG5ld19rZXkpIHx8IHdpbGxfbW92ZS5oYXMobmV3X2tleSkpIHtcbiAgICAgICAgICAgIGluc2VydChuZXdfYmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRpZF9tb3ZlLmhhcyhvbGRfa2V5KSkge1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlbHRhcy5nZXQobmV3X2tleSkgPiBkZWx0YXMuZ2V0KG9sZF9rZXkpKSB7XG4gICAgICAgICAgICBkaWRfbW92ZS5hZGQobmV3X2tleSk7XG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbGxfbW92ZS5hZGQob2xkX2tleSk7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKG8tLSkge1xuICAgICAgICBjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW29dO1xuICAgICAgICBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9ibG9jay5rZXkpKVxuICAgICAgICAgICAgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG4gICAgfVxuICAgIHdoaWxlIChuKVxuICAgICAgICBpbnNlcnQobmV3X2Jsb2Nrc1tuIC0gMV0pO1xuICAgIHJldHVybiBuZXdfYmxvY2tzO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfZWFjaF9rZXlzKGN0eCwgbGlzdCwgZ2V0X2NvbnRleHQsIGdldF9rZXkpIHtcbiAgICBjb25zdCBrZXlzID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRfa2V5KGdldF9jb250ZXh0KGN0eCwgbGlzdCwgaSkpO1xuICAgICAgICBpZiAoa2V5cy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaGF2ZSBkdXBsaWNhdGUga2V5cyBpbiBhIGtleWVkIGVhY2gnKTtcbiAgICAgICAgfVxuICAgICAgICBrZXlzLmFkZChrZXkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0X3NwcmVhZF91cGRhdGUobGV2ZWxzLCB1cGRhdGVzKSB7XG4gICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgY29uc3QgdG9fbnVsbF9vdXQgPSB7fTtcbiAgICBjb25zdCBhY2NvdW50ZWRfZm9yID0geyAkJHNjb3BlOiAxIH07XG4gICAgbGV0IGkgPSBsZXZlbHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgbyA9IGxldmVsc1tpXTtcbiAgICAgICAgY29uc3QgbiA9IHVwZGF0ZXNbaV07XG4gICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIG4pKVxuICAgICAgICAgICAgICAgICAgICB0b19udWxsX291dFtrZXldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFjY291bnRlZF9mb3Jba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVba2V5XSA9IG5ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudGVkX2ZvcltrZXldID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXZlbHNbaV0gPSBuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbykge1xuICAgICAgICAgICAgICAgIGFjY291bnRlZF9mb3Jba2V5XSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9fbnVsbF9vdXQpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHVwZGF0ZSkpXG4gICAgICAgICAgICB1cGRhdGVba2V5XSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZTtcbn1cbmZ1bmN0aW9uIGdldF9zcHJlYWRfb2JqZWN0KHNwcmVhZF9wcm9wcykge1xuICAgIHJldHVybiB0eXBlb2Ygc3ByZWFkX3Byb3BzID09PSAnb2JqZWN0JyAmJiBzcHJlYWRfcHJvcHMgIT09IG51bGwgPyBzcHJlYWRfcHJvcHMgOiB7fTtcbn1cblxuLy8gc291cmNlOiBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmRpY2VzLmh0bWxcbmNvbnN0IGJvb2xlYW5fYXR0cmlidXRlcyA9IG5ldyBTZXQoW1xuICAgICdhbGxvd2Z1bGxzY3JlZW4nLFxuICAgICdhbGxvd3BheW1lbnRyZXF1ZXN0JyxcbiAgICAnYXN5bmMnLFxuICAgICdhdXRvZm9jdXMnLFxuICAgICdhdXRvcGxheScsXG4gICAgJ2NoZWNrZWQnLFxuICAgICdjb250cm9scycsXG4gICAgJ2RlZmF1bHQnLFxuICAgICdkZWZlcicsXG4gICAgJ2Rpc2FibGVkJyxcbiAgICAnZm9ybW5vdmFsaWRhdGUnLFxuICAgICdoaWRkZW4nLFxuICAgICdpc21hcCcsXG4gICAgJ2xvb3AnLFxuICAgICdtdWx0aXBsZScsXG4gICAgJ211dGVkJyxcbiAgICAnbm9tb2R1bGUnLFxuICAgICdub3ZhbGlkYXRlJyxcbiAgICAnb3BlbicsXG4gICAgJ3BsYXlzaW5saW5lJyxcbiAgICAncmVhZG9ubHknLFxuICAgICdyZXF1aXJlZCcsXG4gICAgJ3JldmVyc2VkJyxcbiAgICAnc2VsZWN0ZWQnXG5dKTtcblxuLyoqIHJlZ2V4IG9mIGFsbCBodG1sIHZvaWQgZWxlbWVudCBuYW1lcyAqL1xuY29uc3Qgdm9pZF9lbGVtZW50X25hbWVzID0gL14oPzphcmVhfGJhc2V8YnJ8Y29sfGNvbW1hbmR8ZW1iZWR8aHJ8aW1nfGlucHV0fGtleWdlbnxsaW5rfG1ldGF8cGFyYW18c291cmNlfHRyYWNrfHdicikkLztcbmZ1bmN0aW9uIGlzX3ZvaWQobmFtZSkge1xuICAgIHJldHVybiB2b2lkX2VsZW1lbnRfbmFtZXMudGVzdChuYW1lKSB8fCBuYW1lLnRvTG93ZXJDYXNlKCkgPT09ICchZG9jdHlwZSc7XG59XG5cbmNvbnN0IGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyID0gL1tcXHMnXCI+Lz1cXHV7RkREMH0tXFx1e0ZERUZ9XFx1e0ZGRkV9XFx1e0ZGRkZ9XFx1ezFGRkZFfVxcdXsxRkZGRn1cXHV7MkZGRkV9XFx1ezJGRkZGfVxcdXszRkZGRX1cXHV7M0ZGRkZ9XFx1ezRGRkZFfVxcdXs0RkZGRn1cXHV7NUZGRkV9XFx1ezVGRkZGfVxcdXs2RkZGRX1cXHV7NkZGRkZ9XFx1ezdGRkZFfVxcdXs3RkZGRn1cXHV7OEZGRkV9XFx1ezhGRkZGfVxcdXs5RkZGRX1cXHV7OUZGRkZ9XFx1e0FGRkZFfVxcdXtBRkZGRn1cXHV7QkZGRkV9XFx1e0JGRkZGfVxcdXtDRkZGRX1cXHV7Q0ZGRkZ9XFx1e0RGRkZFfVxcdXtERkZGRn1cXHV7RUZGRkV9XFx1e0VGRkZGfVxcdXtGRkZGRX1cXHV7RkZGRkZ9XFx1ezEwRkZGRX1cXHV7MTBGRkZGfV0vdTtcbi8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2F0dHJpYnV0ZXMtMlxuLy8gaHR0cHM6Ly9pbmZyYS5zcGVjLndoYXR3Zy5vcmcvI25vbmNoYXJhY3RlclxuZnVuY3Rpb24gc3ByZWFkKGFyZ3MsIGF0dHJzX3RvX2FkZCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCAuLi5hcmdzKTtcbiAgICBpZiAoYXR0cnNfdG9fYWRkKSB7XG4gICAgICAgIGNvbnN0IGNsYXNzZXNfdG9fYWRkID0gYXR0cnNfdG9fYWRkLmNsYXNzZXM7XG4gICAgICAgIGNvbnN0IHN0eWxlc190b19hZGQgPSBhdHRyc190b19hZGQuc3R5bGVzO1xuICAgICAgICBpZiAoY2xhc3Nlc190b19hZGQpIHtcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLmNsYXNzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmNsYXNzID0gY2xhc3Nlc190b19hZGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmNsYXNzICs9ICcgJyArIGNsYXNzZXNfdG9fYWRkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzdHlsZXNfdG9fYWRkKSB7XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlcy5zdHlsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5zdHlsZSA9IHN0eWxlX29iamVjdF90b19zdHJpbmcoc3R5bGVzX3RvX2FkZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnN0eWxlID0gc3R5bGVfb2JqZWN0X3RvX3N0cmluZyhtZXJnZV9zc3Jfc3R5bGVzKGF0dHJpYnV0ZXMuc3R5bGUsIHN0eWxlc190b19hZGQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3RyID0gJyc7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgaWYgKGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyLnRlc3QobmFtZSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKVxuICAgICAgICAgICAgc3RyICs9ICcgJyArIG5hbWU7XG4gICAgICAgIGVsc2UgaWYgKGJvb2xlYW5fYXR0cmlidXRlcy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKVxuICAgICAgICAgICAgICAgIHN0ciArPSAnICcgKyBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0ciArPSBgICR7bmFtZX09XCIke3ZhbHVlfVwiYDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdHI7XG59XG5mdW5jdGlvbiBtZXJnZV9zc3Jfc3R5bGVzKHN0eWxlX2F0dHJpYnV0ZSwgc3R5bGVfZGlyZWN0aXZlKSB7XG4gICAgY29uc3Qgc3R5bGVfb2JqZWN0ID0ge307XG4gICAgZm9yIChjb25zdCBpbmRpdmlkdWFsX3N0eWxlIG9mIHN0eWxlX2F0dHJpYnV0ZS5zcGxpdCgnOycpKSB7XG4gICAgICAgIGNvbnN0IGNvbG9uX2luZGV4ID0gaW5kaXZpZHVhbF9zdHlsZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBpbmRpdmlkdWFsX3N0eWxlLnNsaWNlKDAsIGNvbG9uX2luZGV4KS50cmltKCk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaW5kaXZpZHVhbF9zdHlsZS5zbGljZShjb2xvbl9pbmRleCArIDEpLnRyaW0oKTtcbiAgICAgICAgaWYgKCFuYW1lKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIHN0eWxlX29iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gc3R5bGVfZGlyZWN0aXZlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gc3R5bGVfZGlyZWN0aXZlW25hbWVdO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0eWxlX29iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHN0eWxlX29iamVjdFtuYW1lXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3R5bGVfb2JqZWN0O1xufVxuY29uc3QgQVRUUl9SRUdFWCA9IC9bJlwiXS9nO1xuY29uc3QgQ09OVEVOVF9SRUdFWCA9IC9bJjxdL2c7XG4vKipcbiAqIE5vdGU6IHRoaXMgbWV0aG9kIGlzIHBlcmZvcm1hbmNlIHNlbnNpdGl2ZSBhbmQgaGFzIGJlZW4gb3B0aW1pemVkXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlL3B1bGwvNTcwMVxuICovXG5mdW5jdGlvbiBlc2NhcGUodmFsdWUsIGlzX2F0dHIgPSBmYWxzZSkge1xuICAgIGNvbnN0IHN0ciA9IFN0cmluZyh2YWx1ZSk7XG4gICAgY29uc3QgcGF0dGVybiA9IGlzX2F0dHIgPyBBVFRSX1JFR0VYIDogQ09OVEVOVF9SRUdFWDtcbiAgICBwYXR0ZXJuLmxhc3RJbmRleCA9IDA7XG4gICAgbGV0IGVzY2FwZWQgPSAnJztcbiAgICBsZXQgbGFzdCA9IDA7XG4gICAgd2hpbGUgKHBhdHRlcm4udGVzdChzdHIpKSB7XG4gICAgICAgIGNvbnN0IGkgPSBwYXR0ZXJuLmxhc3RJbmRleCAtIDE7XG4gICAgICAgIGNvbnN0IGNoID0gc3RyW2ldO1xuICAgICAgICBlc2NhcGVkICs9IHN0ci5zdWJzdHJpbmcobGFzdCwgaSkgKyAoY2ggPT09ICcmJyA/ICcmYW1wOycgOiAoY2ggPT09ICdcIicgPyAnJnF1b3Q7JyA6ICcmbHQ7JykpO1xuICAgICAgICBsYXN0ID0gaSArIDE7XG4gICAgfVxuICAgIHJldHVybiBlc2NhcGVkICsgc3RyLnN1YnN0cmluZyhsYXN0KTtcbn1cbmZ1bmN0aW9uIGVzY2FwZV9hdHRyaWJ1dGVfdmFsdWUodmFsdWUpIHtcbiAgICAvLyBrZWVwIGJvb2xlYW5zLCBudWxsLCBhbmQgdW5kZWZpbmVkIGZvciB0aGUgc2FrZSBvZiBgc3ByZWFkYFxuICAgIGNvbnN0IHNob3VsZF9lc2NhcGUgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8ICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKTtcbiAgICByZXR1cm4gc2hvdWxkX2VzY2FwZSA/IGVzY2FwZSh2YWx1ZSwgdHJ1ZSkgOiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGVzY2FwZV9vYmplY3Qob2JqKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gZXNjYXBlX2F0dHJpYnV0ZV92YWx1ZShvYmpba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBlYWNoKGl0ZW1zLCBmbikge1xuICAgIGxldCBzdHIgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHN0ciArPSBmbihpdGVtc1tpXSwgaSk7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5jb25zdCBtaXNzaW5nX2NvbXBvbmVudCA9IHtcbiAgICAkJHJlbmRlcjogKCkgPT4gJydcbn07XG5mdW5jdGlvbiB2YWxpZGF0ZV9jb21wb25lbnQoY29tcG9uZW50LCBuYW1lKSB7XG4gICAgaWYgKCFjb21wb25lbnQgfHwgIWNvbXBvbmVudC4kJHJlbmRlcikge1xuICAgICAgICBpZiAobmFtZSA9PT0gJ3N2ZWx0ZTpjb21wb25lbnQnKVxuICAgICAgICAgICAgbmFtZSArPSAnIHRoaXM9ey4uLn0nO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYDwke25hbWV9PiBpcyBub3QgYSB2YWxpZCBTU1IgY29tcG9uZW50LiBZb3UgbWF5IG5lZWQgdG8gcmV2aWV3IHlvdXIgYnVpbGQgY29uZmlnIHRvIGVuc3VyZSB0aGF0IGRlcGVuZGVuY2llcyBhcmUgY29tcGlsZWQsIHJhdGhlciB0aGFuIGltcG9ydGVkIGFzIHByZS1jb21waWxlZCBtb2R1bGVzYCk7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQ7XG59XG5mdW5jdGlvbiBkZWJ1ZyhmaWxlLCBsaW5lLCBjb2x1bW4sIHZhbHVlcykge1xuICAgIGNvbnNvbGUubG9nKGB7QGRlYnVnfSAke2ZpbGUgPyBmaWxlICsgJyAnIDogJyd9KCR7bGluZX06JHtjb2x1bW59KWApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyh2YWx1ZXMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICByZXR1cm4gJyc7XG59XG5sZXQgb25fZGVzdHJveTtcbmZ1bmN0aW9uIGNyZWF0ZV9zc3JfY29tcG9uZW50KGZuKSB7XG4gICAgZnVuY3Rpb24gJCRyZW5kZXIocmVzdWx0LCBwcm9wcywgYmluZGluZ3MsIHNsb3RzLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHBhcmVudF9jb21wb25lbnQgPSBleHBvcnRzLmN1cnJlbnRfY29tcG9uZW50O1xuICAgICAgICBjb25zdCAkJCA9IHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3ksXG4gICAgICAgICAgICBjb250ZXh0OiBuZXcgTWFwKGNvbnRleHQgfHwgKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSkpLFxuICAgICAgICAgICAgLy8gdGhlc2Ugd2lsbCBiZSBpbW1lZGlhdGVseSBkaXNjYXJkZWRcbiAgICAgICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgICAgIGJlZm9yZV91cGRhdGU6IFtdLFxuICAgICAgICAgICAgYWZ0ZXJfdXBkYXRlOiBbXSxcbiAgICAgICAgICAgIGNhbGxiYWNrczogYmxhbmtfb2JqZWN0KClcbiAgICAgICAgfTtcbiAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHsgJCQgfSk7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBmbihyZXN1bHQsIHByb3BzLCBiaW5kaW5ncywgc2xvdHMpO1xuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQocGFyZW50X2NvbXBvbmVudCk7XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZW5kZXI6IChwcm9wcyA9IHt9LCB7ICQkc2xvdHMgPSB7fSwgY29udGV4dCA9IG5ldyBNYXAoKSB9ID0ge30pID0+IHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3kgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgdGl0bGU6ICcnLCBoZWFkOiAnJywgY3NzOiBuZXcgU2V0KCkgfTtcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCB7fSwgJCRzbG90cywgY29udGV4dCk7XG4gICAgICAgICAgICBydW5fYWxsKG9uX2Rlc3Ryb3kpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBodG1sLFxuICAgICAgICAgICAgICAgIGNzczoge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBBcnJheS5mcm9tKHJlc3VsdC5jc3MpLm1hcChjc3MgPT4gY3NzLmNvZGUpLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICAgICBtYXA6IG51bGwgLy8gVE9ET1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGVhZDogcmVzdWx0LnRpdGxlICsgcmVzdWx0LmhlYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgICQkcmVuZGVyXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGFkZF9hdHRyaWJ1dGUobmFtZSwgdmFsdWUsIGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAoYm9vbGVhbiAmJiAhdmFsdWUpKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgY29uc3QgYXNzaWdubWVudCA9IChib29sZWFuICYmIHZhbHVlID09PSB0cnVlKSA/ICcnIDogYD1cIiR7ZXNjYXBlKHZhbHVlLCB0cnVlKX1cImA7XG4gICAgcmV0dXJuIGAgJHtuYW1lfSR7YXNzaWdubWVudH1gO1xufVxuZnVuY3Rpb24gYWRkX2NsYXNzZXMoY2xhc3Nlcykge1xuICAgIHJldHVybiBjbGFzc2VzID8gYCBjbGFzcz1cIiR7Y2xhc3Nlc31cImAgOiAnJztcbn1cbmZ1bmN0aW9uIHN0eWxlX29iamVjdF90b19zdHJpbmcoc3R5bGVfb2JqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHN0eWxlX29iamVjdClcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gc3R5bGVfb2JqZWN0W2tleV0pXG4gICAgICAgIC5tYXAoa2V5ID0+IGAke2tleX06ICR7c3R5bGVfb2JqZWN0W2tleV19O2ApXG4gICAgICAgIC5qb2luKCcgJyk7XG59XG5mdW5jdGlvbiBhZGRfc3R5bGVzKHN0eWxlX29iamVjdCkge1xuICAgIGNvbnN0IHN0eWxlcyA9IHN0eWxlX29iamVjdF90b19zdHJpbmcoc3R5bGVfb2JqZWN0KTtcbiAgICByZXR1cm4gc3R5bGVzID8gYCBzdHlsZT1cIiR7c3R5bGVzfVwiYCA6ICcnO1xufVxuXG5mdW5jdGlvbiBiaW5kKGNvbXBvbmVudCwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBpbmRleCA9IGNvbXBvbmVudC4kJC5wcm9wc1tuYW1lXTtcbiAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb21wb25lbnQuJCQuYm91bmRbaW5kZXhdID0gY2FsbGJhY2s7XG4gICAgICAgIGNhbGxiYWNrKGNvbXBvbmVudC4kJC5jdHhbaW5kZXhdKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVfY29tcG9uZW50KGJsb2NrKSB7XG4gICAgYmxvY2sgJiYgYmxvY2suYygpO1xufVxuZnVuY3Rpb24gY2xhaW1fY29tcG9uZW50KGJsb2NrLCBwYXJlbnRfbm9kZXMpIHtcbiAgICBibG9jayAmJiBibG9jay5sKHBhcmVudF9ub2Rlcyk7XG59XG5mdW5jdGlvbiBtb3VudF9jb21wb25lbnQoY29tcG9uZW50LCB0YXJnZXQsIGFuY2hvciwgY3VzdG9tRWxlbWVudCkge1xuICAgIGNvbnN0IHsgZnJhZ21lbnQsIG9uX21vdW50LCBvbl9kZXN0cm95LCBhZnRlcl91cGRhdGUgfSA9IGNvbXBvbmVudC4kJDtcbiAgICBmcmFnbWVudCAmJiBmcmFnbWVudC5tKHRhcmdldCwgYW5jaG9yKTtcbiAgICBpZiAoIWN1c3RvbUVsZW1lbnQpIHtcbiAgICAgICAgLy8gb25Nb3VudCBoYXBwZW5zIGJlZm9yZSB0aGUgaW5pdGlhbCBhZnRlclVwZGF0ZVxuICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld19vbl9kZXN0cm95ID0gb25fbW91bnQubWFwKHJ1bikuZmlsdGVyKGlzX2Z1bmN0aW9uKTtcbiAgICAgICAgICAgIGlmIChvbl9kZXN0cm95KSB7XG4gICAgICAgICAgICAgICAgb25fZGVzdHJveS5wdXNoKC4uLm5ld19vbl9kZXN0cm95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEVkZ2UgY2FzZSAtIGNvbXBvbmVudCB3YXMgZGVzdHJveWVkIGltbWVkaWF0ZWx5LFxuICAgICAgICAgICAgICAgIC8vIG1vc3QgbGlrZWx5IGFzIGEgcmVzdWx0IG9mIGEgYmluZGluZyBpbml0aWFsaXNpbmdcbiAgICAgICAgICAgICAgICBydW5fYWxsKG5ld19vbl9kZXN0cm95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbXBvbmVudC4kJC5vbl9tb3VudCA9IFtdO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWZ0ZXJfdXBkYXRlLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2NvbXBvbmVudChjb21wb25lbnQsIGRldGFjaGluZykge1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkO1xuICAgIGlmICgkJC5mcmFnbWVudCAhPT0gbnVsbCkge1xuICAgICAgICBydW5fYWxsKCQkLm9uX2Rlc3Ryb3kpO1xuICAgICAgICAkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5kKGRldGFjaGluZyk7XG4gICAgICAgIC8vIFRPRE8gbnVsbCBvdXQgb3RoZXIgcmVmcywgaW5jbHVkaW5nIGNvbXBvbmVudC4kJCAoYnV0IG5lZWQgdG9cbiAgICAgICAgLy8gcHJlc2VydmUgZmluYWwgc3RhdGU/KVxuICAgICAgICAkJC5vbl9kZXN0cm95ID0gJCQuZnJhZ21lbnQgPSBudWxsO1xuICAgICAgICAkJC5jdHggPSBbXTtcbiAgICB9XG59XG5mdW5jdGlvbiBtYWtlX2RpcnR5KGNvbXBvbmVudCwgaSkge1xuICAgIGlmIChjb21wb25lbnQuJCQuZGlydHlbMF0gPT09IC0xKSB7XG4gICAgICAgIGRpcnR5X2NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICBzY2hlZHVsZV91cGRhdGUoKTtcbiAgICAgICAgY29tcG9uZW50LiQkLmRpcnR5LmZpbGwoMCk7XG4gICAgfVxuICAgIGNvbXBvbmVudC4kJC5kaXJ0eVsoaSAvIDMxKSB8IDBdIHw9ICgxIDw8IChpICUgMzEpKTtcbn1cbmZ1bmN0aW9uIGluaXQoY29tcG9uZW50LCBvcHRpb25zLCBpbnN0YW5jZSwgY3JlYXRlX2ZyYWdtZW50LCBub3RfZXF1YWwsIHByb3BzLCBhcHBlbmRfc3R5bGVzLCBkaXJ0eSA9IFstMV0pIHtcbiAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gZXhwb3J0cy5jdXJyZW50X2NvbXBvbmVudDtcbiAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcbiAgICBjb25zdCAkJCA9IGNvbXBvbmVudC4kJCA9IHtcbiAgICAgICAgZnJhZ21lbnQ6IG51bGwsXG4gICAgICAgIGN0eDogbnVsbCxcbiAgICAgICAgLy8gc3RhdGVcbiAgICAgICAgcHJvcHMsXG4gICAgICAgIHVwZGF0ZTogbm9vcCxcbiAgICAgICAgbm90X2VxdWFsLFxuICAgICAgICBib3VuZDogYmxhbmtfb2JqZWN0KCksXG4gICAgICAgIC8vIGxpZmVjeWNsZVxuICAgICAgICBvbl9tb3VudDogW10sXG4gICAgICAgIG9uX2Rlc3Ryb3k6IFtdLFxuICAgICAgICBvbl9kaXNjb25uZWN0OiBbXSxcbiAgICAgICAgYmVmb3JlX3VwZGF0ZTogW10sXG4gICAgICAgIGFmdGVyX3VwZGF0ZTogW10sXG4gICAgICAgIGNvbnRleHQ6IG5ldyBNYXAob3B0aW9ucy5jb250ZXh0IHx8IChwYXJlbnRfY29tcG9uZW50ID8gcGFyZW50X2NvbXBvbmVudC4kJC5jb250ZXh0IDogW10pKSxcbiAgICAgICAgLy8gZXZlcnl0aGluZyBlbHNlXG4gICAgICAgIGNhbGxiYWNrczogYmxhbmtfb2JqZWN0KCksXG4gICAgICAgIGRpcnR5LFxuICAgICAgICBza2lwX2JvdW5kOiBmYWxzZSxcbiAgICAgICAgcm9vdDogb3B0aW9ucy50YXJnZXQgfHwgcGFyZW50X2NvbXBvbmVudC4kJC5yb290XG4gICAgfTtcbiAgICBhcHBlbmRfc3R5bGVzICYmIGFwcGVuZF9zdHlsZXMoJCQucm9vdCk7XG4gICAgbGV0IHJlYWR5ID0gZmFsc2U7XG4gICAgJCQuY3R4ID0gaW5zdGFuY2VcbiAgICAgICAgPyBpbnN0YW5jZShjb21wb25lbnQsIG9wdGlvbnMucHJvcHMgfHwge30sIChpLCByZXQsIC4uLnJlc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcmVzdC5sZW5ndGggPyByZXN0WzBdIDogcmV0O1xuICAgICAgICAgICAgaWYgKCQkLmN0eCAmJiBub3RfZXF1YWwoJCQuY3R4W2ldLCAkJC5jdHhbaV0gPSB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoISQkLnNraXBfYm91bmQgJiYgJCQuYm91bmRbaV0pXG4gICAgICAgICAgICAgICAgICAgICQkLmJvdW5kW2ldKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVhZHkpXG4gICAgICAgICAgICAgICAgICAgIG1ha2VfZGlydHkoY29tcG9uZW50LCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0pXG4gICAgICAgIDogW107XG4gICAgJCQudXBkYXRlKCk7XG4gICAgcmVhZHkgPSB0cnVlO1xuICAgIHJ1bl9hbGwoJCQuYmVmb3JlX3VwZGF0ZSk7XG4gICAgLy8gYGZhbHNlYCBhcyBhIHNwZWNpYWwgY2FzZSBvZiBubyBET00gY29tcG9uZW50XG4gICAgJCQuZnJhZ21lbnQgPSBjcmVhdGVfZnJhZ21lbnQgPyBjcmVhdGVfZnJhZ21lbnQoJCQuY3R4KSA6IGZhbHNlO1xuICAgIGlmIChvcHRpb25zLnRhcmdldCkge1xuICAgICAgICBpZiAob3B0aW9ucy5oeWRyYXRlKSB7XG4gICAgICAgICAgICBzdGFydF9oeWRyYXRpbmcoKTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gY2hpbGRyZW4ob3B0aW9ucy50YXJnZXQpO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50Lmwobm9kZXMpO1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChkZXRhY2gpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LmMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pbnRybylcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oY29tcG9uZW50LiQkLmZyYWdtZW50KTtcbiAgICAgICAgbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgb3B0aW9ucy50YXJnZXQsIG9wdGlvbnMuYW5jaG9yLCBvcHRpb25zLmN1c3RvbUVsZW1lbnQpO1xuICAgICAgICBlbmRfaHlkcmF0aW5nKCk7XG4gICAgICAgIGZsdXNoKCk7XG4gICAgfVxuICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcbn1cbmlmICh0eXBlb2YgSFRNTEVsZW1lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBleHBvcnRzLlN2ZWx0ZUVsZW1lbnQgPSBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgICAgICBjb25zdCB7IG9uX21vdW50IH0gPSB0aGlzLiQkO1xuICAgICAgICAgICAgdGhpcy4kJC5vbl9kaXNjb25uZWN0ID0gb25fbW91bnQubWFwKHJ1bikuZmlsdGVyKGlzX2Z1bmN0aW9uKTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLiQkLnNsb3R0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy4kJC5zbG90dGVkW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBfb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzW2F0dHJdID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgICAgICBydW5fYWxsKHRoaXMuJCQub25fZGlzY29ubmVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgJGRlc3Ryb3koKSB7XG4gICAgICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgICAgIHRoaXMuJGRlc3Ryb3kgPSBub29wO1xuICAgICAgICB9XG4gICAgICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gVE9ETyBzaG91bGQgdGhpcyBkZWxlZ2F0ZSB0byBhZGRFdmVudExpc3RlbmVyP1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdIHx8ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSA9IFtdKSk7XG4gICAgICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAkc2V0KCQkcHJvcHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiQkc2V0ICYmICFpc19lbXB0eSgkJHByb3BzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy4kJHNldCgkJHByb3BzKTtcbiAgICAgICAgICAgICAgICB0aGlzLiQkLnNraXBfYm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIFN2ZWx0ZSBjb21wb25lbnRzLiBVc2VkIHdoZW4gZGV2PWZhbHNlLlxuICovXG5jbGFzcyBTdmVsdGVDb21wb25lbnQge1xuICAgICRkZXN0cm95KCkge1xuICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgdGhpcy4kZGVzdHJveSA9IG5vb3A7XG4gICAgfVxuICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gfHwgKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdID0gW10pKTtcbiAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAkc2V0KCQkcHJvcHMpIHtcbiAgICAgICAgaWYgKHRoaXMuJCRzZXQgJiYgIWlzX2VtcHR5KCQkcHJvcHMpKSB7XG4gICAgICAgICAgICB0aGlzLiQkLnNraXBfYm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kJHNldCgkJHByb3BzKTtcbiAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaF9kZXYodHlwZSwgZGV0YWlsKSB7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjdXN0b21fZXZlbnQodHlwZSwgT2JqZWN0LmFzc2lnbih7IHZlcnNpb246ICczLjUwLjEnIH0sIGRldGFpbCksIHsgYnViYmxlczogdHJ1ZSB9KSk7XG59XG5mdW5jdGlvbiBhcHBlbmRfZGV2KHRhcmdldCwgbm9kZSkge1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NSW5zZXJ0JywgeyB0YXJnZXQsIG5vZGUgfSk7XG4gICAgYXBwZW5kKHRhcmdldCwgbm9kZSk7XG59XG5mdW5jdGlvbiBhcHBlbmRfaHlkcmF0aW9uX2Rldih0YXJnZXQsIG5vZGUpIHtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTUluc2VydCcsIHsgdGFyZ2V0LCBub2RlIH0pO1xuICAgIGFwcGVuZF9oeWRyYXRpb24odGFyZ2V0LCBub2RlKTtcbn1cbmZ1bmN0aW9uIGluc2VydF9kZXYodGFyZ2V0LCBub2RlLCBhbmNob3IpIHtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTUluc2VydCcsIHsgdGFyZ2V0LCBub2RlLCBhbmNob3IgfSk7XG4gICAgaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKTtcbn1cbmZ1bmN0aW9uIGluc2VydF9oeWRyYXRpb25fZGV2KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01JbnNlcnQnLCB7IHRhcmdldCwgbm9kZSwgYW5jaG9yIH0pO1xuICAgIGluc2VydF9oeWRyYXRpb24odGFyZ2V0LCBub2RlLCBhbmNob3IpO1xufVxuZnVuY3Rpb24gZGV0YWNoX2Rldihub2RlKSB7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01SZW1vdmUnLCB7IG5vZGUgfSk7XG4gICAgZGV0YWNoKG5vZGUpO1xufVxuZnVuY3Rpb24gZGV0YWNoX2JldHdlZW5fZGV2KGJlZm9yZSwgYWZ0ZXIpIHtcbiAgICB3aGlsZSAoYmVmb3JlLm5leHRTaWJsaW5nICYmIGJlZm9yZS5uZXh0U2libGluZyAhPT0gYWZ0ZXIpIHtcbiAgICAgICAgZGV0YWNoX2RldihiZWZvcmUubmV4dFNpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaF9iZWZvcmVfZGV2KGFmdGVyKSB7XG4gICAgd2hpbGUgKGFmdGVyLnByZXZpb3VzU2libGluZykge1xuICAgICAgICBkZXRhY2hfZGV2KGFmdGVyLnByZXZpb3VzU2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGV0YWNoX2FmdGVyX2RldihiZWZvcmUpIHtcbiAgICB3aGlsZSAoYmVmb3JlLm5leHRTaWJsaW5nKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYmVmb3JlLm5leHRTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBsaXN0ZW5fZGV2KG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zLCBoYXNfcHJldmVudF9kZWZhdWx0LCBoYXNfc3RvcF9wcm9wYWdhdGlvbikge1xuICAgIGNvbnN0IG1vZGlmaWVycyA9IG9wdGlvbnMgPT09IHRydWUgPyBbJ2NhcHR1cmUnXSA6IG9wdGlvbnMgPyBBcnJheS5mcm9tKE9iamVjdC5rZXlzKG9wdGlvbnMpKSA6IFtdO1xuICAgIGlmIChoYXNfcHJldmVudF9kZWZhdWx0KVxuICAgICAgICBtb2RpZmllcnMucHVzaCgncHJldmVudERlZmF1bHQnKTtcbiAgICBpZiAoaGFzX3N0b3BfcHJvcGFnYXRpb24pXG4gICAgICAgIG1vZGlmaWVycy5wdXNoKCdzdG9wUHJvcGFnYXRpb24nKTtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTUFkZEV2ZW50TGlzdGVuZXInLCB7IG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBtb2RpZmllcnMgfSk7XG4gICAgY29uc3QgZGlzcG9zZSA9IGxpc3Rlbihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01SZW1vdmVFdmVudExpc3RlbmVyJywgeyBub2RlLCBldmVudCwgaGFuZGxlciwgbW9kaWZpZXJzIH0pO1xuICAgICAgICBkaXNwb3NlKCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGF0dHJfZGV2KG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBhdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVJlbW92ZUF0dHJpYnV0ZScsIHsgbm9kZSwgYXR0cmlidXRlIH0pO1xuICAgIGVsc2VcbiAgICAgICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01TZXRBdHRyaWJ1dGUnLCB7IG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBwcm9wX2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBub2RlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NU2V0UHJvcGVydHknLCB7IG5vZGUsIHByb3BlcnR5LCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIGRhdGFzZXRfZGV2KG5vZGUsIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIG5vZGUuZGF0YXNldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVNldERhdGFzZXQnLCB7IG5vZGUsIHByb3BlcnR5LCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIHNldF9kYXRhX2Rldih0ZXh0LCBkYXRhKSB7XG4gICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICBpZiAodGV4dC53aG9sZVRleHQgPT09IGRhdGEpXG4gICAgICAgIHJldHVybjtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVNldERhdGEnLCB7IG5vZGU6IHRleHQsIGRhdGEgfSk7XG4gICAgdGV4dC5kYXRhID0gZGF0YTtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX2VhY2hfYXJndW1lbnQoYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdzdHJpbmcnICYmICEoYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIGFyZykpIHtcbiAgICAgICAgbGV0IG1zZyA9ICd7I2VhY2h9IG9ubHkgaXRlcmF0ZXMgb3ZlciBhcnJheS1saWtlIG9iamVjdHMuJztcbiAgICAgICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgYXJnICYmIFN5bWJvbC5pdGVyYXRvciBpbiBhcmcpIHtcbiAgICAgICAgICAgIG1zZyArPSAnIFlvdSBjYW4gdXNlIGEgc3ByZWFkIHRvIGNvbnZlcnQgdGhpcyBpdGVyYWJsZSBpbnRvIGFuIGFycmF5Lic7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gdmFsaWRhdGVfc2xvdHMobmFtZSwgc2xvdCwga2V5cykge1xuICAgIGZvciAoY29uc3Qgc2xvdF9rZXkgb2YgT2JqZWN0LmtleXMoc2xvdCkpIHtcbiAgICAgICAgaWYgKCF+a2V5cy5pbmRleE9mKHNsb3Rfa2V5KSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGA8JHtuYW1lfT4gcmVjZWl2ZWQgYW4gdW5leHBlY3RlZCBzbG90IFwiJHtzbG90X2tleX1cIi5gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX2R5bmFtaWNfZWxlbWVudCh0YWcpIHtcbiAgICBjb25zdCBpc19zdHJpbmcgPSB0eXBlb2YgdGFnID09PSAnc3RyaW5nJztcbiAgICBpZiAodGFnICYmICFpc19zdHJpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCc8c3ZlbHRlOmVsZW1lbnQ+IGV4cGVjdHMgXCJ0aGlzXCIgYXR0cmlidXRlIHRvIGJlIGEgc3RyaW5nLicpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX3ZvaWRfZHluYW1pY19lbGVtZW50KHRhZykge1xuICAgIGlmICh0YWcgJiYgaXNfdm9pZCh0YWcpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgPHN2ZWx0ZTplbGVtZW50IHRoaXM9XCIke3RhZ31cIj4gaXMgc2VsZi1jbG9zaW5nIGFuZCBjYW5ub3QgaGF2ZSBjb250ZW50LmApO1xuICAgIH1cbn1cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgU3ZlbHRlIGNvbXBvbmVudHMgd2l0aCBzb21lIG1pbm9yIGRldi1lbmhhbmNlbWVudHMuIFVzZWQgd2hlbiBkZXY9dHJ1ZS5cbiAqL1xuY2xhc3MgU3ZlbHRlQ29tcG9uZW50RGV2IGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucyB8fCAoIW9wdGlvbnMudGFyZ2V0ICYmICFvcHRpb25zLiQkaW5saW5lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ3RhcmdldCcgaXMgYSByZXF1aXJlZCBvcHRpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG4gICAgJGRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLiRkZXN0cm95KCk7XG4gICAgICAgIHRoaXMuJGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NvbXBvbmVudCB3YXMgYWxyZWFkeSBkZXN0cm95ZWQnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIH07XG4gICAgfVxuICAgICRjYXB0dXJlX3N0YXRlKCkgeyB9XG4gICAgJGluamVjdF9zdGF0ZSgpIHsgfVxufVxuLyoqXG4gKiBCYXNlIGNsYXNzIHRvIGNyZWF0ZSBzdHJvbmdseSB0eXBlZCBTdmVsdGUgY29tcG9uZW50cy5cbiAqIFRoaXMgb25seSBleGlzdHMgZm9yIHR5cGluZyBwdXJwb3NlcyBhbmQgc2hvdWxkIGJlIHVzZWQgaW4gYC5kLnRzYCBmaWxlcy5cbiAqXG4gKiAjIyMgRXhhbXBsZTpcbiAqXG4gKiBZb3UgaGF2ZSBjb21wb25lbnQgbGlicmFyeSBvbiBucG0gY2FsbGVkIGBjb21wb25lbnQtbGlicmFyeWAsIGZyb20gd2hpY2hcbiAqIHlvdSBleHBvcnQgYSBjb21wb25lbnQgY2FsbGVkIGBNeUNvbXBvbmVudGAuIEZvciBTdmVsdGUrVHlwZVNjcmlwdCB1c2VycyxcbiAqIHlvdSB3YW50IHRvIHByb3ZpZGUgdHlwaW5ncy4gVGhlcmVmb3JlIHlvdSBjcmVhdGUgYSBgaW5kZXguZC50c2A6XG4gKiBgYGB0c1xuICogaW1wb3J0IHsgU3ZlbHRlQ29tcG9uZW50VHlwZWQgfSBmcm9tIFwic3ZlbHRlXCI7XG4gKiBleHBvcnQgY2xhc3MgTXlDb21wb25lbnQgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnRUeXBlZDx7Zm9vOiBzdHJpbmd9PiB7fVxuICogYGBgXG4gKiBUeXBpbmcgdGhpcyBtYWtlcyBpdCBwb3NzaWJsZSBmb3IgSURFcyBsaWtlIFZTIENvZGUgd2l0aCB0aGUgU3ZlbHRlIGV4dGVuc2lvblxuICogdG8gcHJvdmlkZSBpbnRlbGxpc2Vuc2UgYW5kIHRvIHVzZSB0aGUgY29tcG9uZW50IGxpa2UgdGhpcyBpbiBhIFN2ZWx0ZSBmaWxlXG4gKiB3aXRoIFR5cGVTY3JpcHQ6XG4gKiBgYGBzdmVsdGVcbiAqIDxzY3JpcHQgbGFuZz1cInRzXCI+XG4gKiBcdGltcG9ydCB7IE15Q29tcG9uZW50IH0gZnJvbSBcImNvbXBvbmVudC1saWJyYXJ5XCI7XG4gKiA8L3NjcmlwdD5cbiAqIDxNeUNvbXBvbmVudCBmb289eydiYXInfSAvPlxuICogYGBgXG4gKlxuICogIyMjIyBXaHkgbm90IG1ha2UgdGhpcyBwYXJ0IG9mIGBTdmVsdGVDb21wb25lbnQoRGV2KWA/XG4gKiBCZWNhdXNlXG4gKiBgYGB0c1xuICogY2xhc3MgQVN1YmNsYXNzT2ZTdmVsdGVDb21wb25lbnQgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnQ8e2Zvbzogc3RyaW5nfT4ge31cbiAqIGNvbnN0IGNvbXBvbmVudDogdHlwZW9mIFN2ZWx0ZUNvbXBvbmVudCA9IEFTdWJjbGFzc09mU3ZlbHRlQ29tcG9uZW50O1xuICogYGBgXG4gKiB3aWxsIHRocm93IGEgdHlwZSBlcnJvciwgc28gd2UgbmVlZCB0byBzZXBhcmF0ZSB0aGUgbW9yZSBzdHJpY3RseSB0eXBlZCBjbGFzcy5cbiAqL1xuY2xhc3MgU3ZlbHRlQ29tcG9uZW50VHlwZWQgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnREZXYge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxufVxuZnVuY3Rpb24gbG9vcF9ndWFyZCh0aW1lb3V0KSB7XG4gICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChEYXRlLm5vdygpIC0gc3RhcnQgPiB0aW1lb3V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luZmluaXRlIGxvb3AgZGV0ZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydHMuSHRtbFRhZyA9IEh0bWxUYWc7XG5leHBvcnRzLkh0bWxUYWdIeWRyYXRpb24gPSBIdG1sVGFnSHlkcmF0aW9uO1xuZXhwb3J0cy5TdmVsdGVDb21wb25lbnQgPSBTdmVsdGVDb21wb25lbnQ7XG5leHBvcnRzLlN2ZWx0ZUNvbXBvbmVudERldiA9IFN2ZWx0ZUNvbXBvbmVudERldjtcbmV4cG9ydHMuU3ZlbHRlQ29tcG9uZW50VHlwZWQgPSBTdmVsdGVDb21wb25lbnRUeXBlZDtcbmV4cG9ydHMuYWN0aW9uX2Rlc3Ryb3llciA9IGFjdGlvbl9kZXN0cm95ZXI7XG5leHBvcnRzLmFkZF9hdHRyaWJ1dGUgPSBhZGRfYXR0cmlidXRlO1xuZXhwb3J0cy5hZGRfY2xhc3NlcyA9IGFkZF9jbGFzc2VzO1xuZXhwb3J0cy5hZGRfZmx1c2hfY2FsbGJhY2sgPSBhZGRfZmx1c2hfY2FsbGJhY2s7XG5leHBvcnRzLmFkZF9sb2NhdGlvbiA9IGFkZF9sb2NhdGlvbjtcbmV4cG9ydHMuYWRkX3JlbmRlcl9jYWxsYmFjayA9IGFkZF9yZW5kZXJfY2FsbGJhY2s7XG5leHBvcnRzLmFkZF9yZXNpemVfbGlzdGVuZXIgPSBhZGRfcmVzaXplX2xpc3RlbmVyO1xuZXhwb3J0cy5hZGRfc3R5bGVzID0gYWRkX3N0eWxlcztcbmV4cG9ydHMuYWRkX3RyYW5zZm9ybSA9IGFkZF90cmFuc2Zvcm07XG5leHBvcnRzLmFmdGVyVXBkYXRlID0gYWZ0ZXJVcGRhdGU7XG5leHBvcnRzLmFwcGVuZCA9IGFwcGVuZDtcbmV4cG9ydHMuYXBwZW5kX2RldiA9IGFwcGVuZF9kZXY7XG5leHBvcnRzLmFwcGVuZF9lbXB0eV9zdHlsZXNoZWV0ID0gYXBwZW5kX2VtcHR5X3N0eWxlc2hlZXQ7XG5leHBvcnRzLmFwcGVuZF9oeWRyYXRpb24gPSBhcHBlbmRfaHlkcmF0aW9uO1xuZXhwb3J0cy5hcHBlbmRfaHlkcmF0aW9uX2RldiA9IGFwcGVuZF9oeWRyYXRpb25fZGV2O1xuZXhwb3J0cy5hcHBlbmRfc3R5bGVzID0gYXBwZW5kX3N0eWxlcztcbmV4cG9ydHMuYXNzaWduID0gYXNzaWduO1xuZXhwb3J0cy5hdHRyID0gYXR0cjtcbmV4cG9ydHMuYXR0cl9kZXYgPSBhdHRyX2RldjtcbmV4cG9ydHMuYXR0cmlidXRlX3RvX29iamVjdCA9IGF0dHJpYnV0ZV90b19vYmplY3Q7XG5leHBvcnRzLmJlZm9yZVVwZGF0ZSA9IGJlZm9yZVVwZGF0ZTtcbmV4cG9ydHMuYmluZCA9IGJpbmQ7XG5leHBvcnRzLmJpbmRpbmdfY2FsbGJhY2tzID0gYmluZGluZ19jYWxsYmFja3M7XG5leHBvcnRzLmJsYW5rX29iamVjdCA9IGJsYW5rX29iamVjdDtcbmV4cG9ydHMuYnViYmxlID0gYnViYmxlO1xuZXhwb3J0cy5jaGVja19vdXRyb3MgPSBjaGVja19vdXRyb3M7XG5leHBvcnRzLmNoaWxkcmVuID0gY2hpbGRyZW47XG5leHBvcnRzLmNsYWltX2NvbXBvbmVudCA9IGNsYWltX2NvbXBvbmVudDtcbmV4cG9ydHMuY2xhaW1fZWxlbWVudCA9IGNsYWltX2VsZW1lbnQ7XG5leHBvcnRzLmNsYWltX2h0bWxfdGFnID0gY2xhaW1faHRtbF90YWc7XG5leHBvcnRzLmNsYWltX3NwYWNlID0gY2xhaW1fc3BhY2U7XG5leHBvcnRzLmNsYWltX3N2Z19lbGVtZW50ID0gY2xhaW1fc3ZnX2VsZW1lbnQ7XG5leHBvcnRzLmNsYWltX3RleHQgPSBjbGFpbV90ZXh0O1xuZXhwb3J0cy5jbGVhcl9sb29wcyA9IGNsZWFyX2xvb3BzO1xuZXhwb3J0cy5jb21wb25lbnRfc3Vic2NyaWJlID0gY29tcG9uZW50X3N1YnNjcmliZTtcbmV4cG9ydHMuY29tcHV0ZV9yZXN0X3Byb3BzID0gY29tcHV0ZV9yZXN0X3Byb3BzO1xuZXhwb3J0cy5jb21wdXRlX3Nsb3RzID0gY29tcHV0ZV9zbG90cztcbmV4cG9ydHMuY3JlYXRlRXZlbnREaXNwYXRjaGVyID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyO1xuZXhwb3J0cy5jcmVhdGVfYW5pbWF0aW9uID0gY3JlYXRlX2FuaW1hdGlvbjtcbmV4cG9ydHMuY3JlYXRlX2JpZGlyZWN0aW9uYWxfdHJhbnNpdGlvbiA9IGNyZWF0ZV9iaWRpcmVjdGlvbmFsX3RyYW5zaXRpb247XG5leHBvcnRzLmNyZWF0ZV9jb21wb25lbnQgPSBjcmVhdGVfY29tcG9uZW50O1xuZXhwb3J0cy5jcmVhdGVfaW5fdHJhbnNpdGlvbiA9IGNyZWF0ZV9pbl90cmFuc2l0aW9uO1xuZXhwb3J0cy5jcmVhdGVfb3V0X3RyYW5zaXRpb24gPSBjcmVhdGVfb3V0X3RyYW5zaXRpb247XG5leHBvcnRzLmNyZWF0ZV9zbG90ID0gY3JlYXRlX3Nsb3Q7XG5leHBvcnRzLmNyZWF0ZV9zc3JfY29tcG9uZW50ID0gY3JlYXRlX3Nzcl9jb21wb25lbnQ7XG5leHBvcnRzLmN1c3RvbV9ldmVudCA9IGN1c3RvbV9ldmVudDtcbmV4cG9ydHMuZGF0YXNldF9kZXYgPSBkYXRhc2V0X2RldjtcbmV4cG9ydHMuZGVidWcgPSBkZWJ1ZztcbmV4cG9ydHMuZGVzdHJveV9ibG9jayA9IGRlc3Ryb3lfYmxvY2s7XG5leHBvcnRzLmRlc3Ryb3lfY29tcG9uZW50ID0gZGVzdHJveV9jb21wb25lbnQ7XG5leHBvcnRzLmRlc3Ryb3lfZWFjaCA9IGRlc3Ryb3lfZWFjaDtcbmV4cG9ydHMuZGV0YWNoID0gZGV0YWNoO1xuZXhwb3J0cy5kZXRhY2hfYWZ0ZXJfZGV2ID0gZGV0YWNoX2FmdGVyX2RldjtcbmV4cG9ydHMuZGV0YWNoX2JlZm9yZV9kZXYgPSBkZXRhY2hfYmVmb3JlX2RldjtcbmV4cG9ydHMuZGV0YWNoX2JldHdlZW5fZGV2ID0gZGV0YWNoX2JldHdlZW5fZGV2O1xuZXhwb3J0cy5kZXRhY2hfZGV2ID0gZGV0YWNoX2RldjtcbmV4cG9ydHMuZGlydHlfY29tcG9uZW50cyA9IGRpcnR5X2NvbXBvbmVudHM7XG5leHBvcnRzLmRpc3BhdGNoX2RldiA9IGRpc3BhdGNoX2RldjtcbmV4cG9ydHMuZWFjaCA9IGVhY2g7XG5leHBvcnRzLmVsZW1lbnQgPSBlbGVtZW50O1xuZXhwb3J0cy5lbGVtZW50X2lzID0gZWxlbWVudF9pcztcbmV4cG9ydHMuZW1wdHkgPSBlbXB0eTtcbmV4cG9ydHMuZW5kX2h5ZHJhdGluZyA9IGVuZF9oeWRyYXRpbmc7XG5leHBvcnRzLmVzY2FwZSA9IGVzY2FwZTtcbmV4cG9ydHMuZXNjYXBlX2F0dHJpYnV0ZV92YWx1ZSA9IGVzY2FwZV9hdHRyaWJ1dGVfdmFsdWU7XG5leHBvcnRzLmVzY2FwZV9vYmplY3QgPSBlc2NhcGVfb2JqZWN0O1xuZXhwb3J0cy5leGNsdWRlX2ludGVybmFsX3Byb3BzID0gZXhjbHVkZV9pbnRlcm5hbF9wcm9wcztcbmV4cG9ydHMuZml4X2FuZF9kZXN0cm95X2Jsb2NrID0gZml4X2FuZF9kZXN0cm95X2Jsb2NrO1xuZXhwb3J0cy5maXhfYW5kX291dHJvX2FuZF9kZXN0cm95X2Jsb2NrID0gZml4X2FuZF9vdXRyb19hbmRfZGVzdHJveV9ibG9jaztcbmV4cG9ydHMuZml4X3Bvc2l0aW9uID0gZml4X3Bvc2l0aW9uO1xuZXhwb3J0cy5mbHVzaCA9IGZsdXNoO1xuZXhwb3J0cy5nZXRBbGxDb250ZXh0cyA9IGdldEFsbENvbnRleHRzO1xuZXhwb3J0cy5nZXRDb250ZXh0ID0gZ2V0Q29udGV4dDtcbmV4cG9ydHMuZ2V0X2FsbF9kaXJ0eV9mcm9tX3Njb3BlID0gZ2V0X2FsbF9kaXJ0eV9mcm9tX3Njb3BlO1xuZXhwb3J0cy5nZXRfYmluZGluZ19ncm91cF92YWx1ZSA9IGdldF9iaW5kaW5nX2dyb3VwX3ZhbHVlO1xuZXhwb3J0cy5nZXRfY3VycmVudF9jb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQ7XG5leHBvcnRzLmdldF9jdXN0b21fZWxlbWVudHNfc2xvdHMgPSBnZXRfY3VzdG9tX2VsZW1lbnRzX3Nsb3RzO1xuZXhwb3J0cy5nZXRfcm9vdF9mb3Jfc3R5bGUgPSBnZXRfcm9vdF9mb3Jfc3R5bGU7XG5leHBvcnRzLmdldF9zbG90X2NoYW5nZXMgPSBnZXRfc2xvdF9jaGFuZ2VzO1xuZXhwb3J0cy5nZXRfc3ByZWFkX29iamVjdCA9IGdldF9zcHJlYWRfb2JqZWN0O1xuZXhwb3J0cy5nZXRfc3ByZWFkX3VwZGF0ZSA9IGdldF9zcHJlYWRfdXBkYXRlO1xuZXhwb3J0cy5nZXRfc3RvcmVfdmFsdWUgPSBnZXRfc3RvcmVfdmFsdWU7XG5leHBvcnRzLmdsb2JhbHMgPSBnbG9iYWxzO1xuZXhwb3J0cy5ncm91cF9vdXRyb3MgPSBncm91cF9vdXRyb3M7XG5leHBvcnRzLmhhbmRsZV9wcm9taXNlID0gaGFuZGxlX3Byb21pc2U7XG5leHBvcnRzLmhhc0NvbnRleHQgPSBoYXNDb250ZXh0O1xuZXhwb3J0cy5oYXNfcHJvcCA9IGhhc19wcm9wO1xuZXhwb3J0cy5pZGVudGl0eSA9IGlkZW50aXR5O1xuZXhwb3J0cy5pbml0ID0gaW5pdDtcbmV4cG9ydHMuaW5zZXJ0ID0gaW5zZXJ0O1xuZXhwb3J0cy5pbnNlcnRfZGV2ID0gaW5zZXJ0X2RldjtcbmV4cG9ydHMuaW5zZXJ0X2h5ZHJhdGlvbiA9IGluc2VydF9oeWRyYXRpb247XG5leHBvcnRzLmluc2VydF9oeWRyYXRpb25fZGV2ID0gaW5zZXJ0X2h5ZHJhdGlvbl9kZXY7XG5leHBvcnRzLmludHJvcyA9IGludHJvcztcbmV4cG9ydHMuaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIgPSBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlcjtcbmV4cG9ydHMuaXNfY2xpZW50ID0gaXNfY2xpZW50O1xuZXhwb3J0cy5pc19jcm9zc29yaWdpbiA9IGlzX2Nyb3Nzb3JpZ2luO1xuZXhwb3J0cy5pc19lbXB0eSA9IGlzX2VtcHR5O1xuZXhwb3J0cy5pc19mdW5jdGlvbiA9IGlzX2Z1bmN0aW9uO1xuZXhwb3J0cy5pc19wcm9taXNlID0gaXNfcHJvbWlzZTtcbmV4cG9ydHMuaXNfdm9pZCA9IGlzX3ZvaWQ7XG5leHBvcnRzLmxpc3RlbiA9IGxpc3RlbjtcbmV4cG9ydHMubGlzdGVuX2RldiA9IGxpc3Rlbl9kZXY7XG5leHBvcnRzLmxvb3AgPSBsb29wO1xuZXhwb3J0cy5sb29wX2d1YXJkID0gbG9vcF9ndWFyZDtcbmV4cG9ydHMubWVyZ2Vfc3NyX3N0eWxlcyA9IG1lcmdlX3Nzcl9zdHlsZXM7XG5leHBvcnRzLm1pc3NpbmdfY29tcG9uZW50ID0gbWlzc2luZ19jb21wb25lbnQ7XG5leHBvcnRzLm1vdW50X2NvbXBvbmVudCA9IG1vdW50X2NvbXBvbmVudDtcbmV4cG9ydHMubm9vcCA9IG5vb3A7XG5leHBvcnRzLm5vdF9lcXVhbCA9IG5vdF9lcXVhbDtcbmV4cG9ydHMubnVsbF90b19lbXB0eSA9IG51bGxfdG9fZW1wdHk7XG5leHBvcnRzLm9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMgPSBvYmplY3Rfd2l0aG91dF9wcm9wZXJ0aWVzO1xuZXhwb3J0cy5vbkRlc3Ryb3kgPSBvbkRlc3Ryb3k7XG5leHBvcnRzLm9uTW91bnQgPSBvbk1vdW50O1xuZXhwb3J0cy5vbmNlID0gb25jZTtcbmV4cG9ydHMub3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2sgPSBvdXRyb19hbmRfZGVzdHJveV9ibG9jaztcbmV4cG9ydHMucHJldmVudF9kZWZhdWx0ID0gcHJldmVudF9kZWZhdWx0O1xuZXhwb3J0cy5wcm9wX2RldiA9IHByb3BfZGV2O1xuZXhwb3J0cy5xdWVyeV9zZWxlY3Rvcl9hbGwgPSBxdWVyeV9zZWxlY3Rvcl9hbGw7XG5leHBvcnRzLnJ1biA9IHJ1bjtcbmV4cG9ydHMucnVuX2FsbCA9IHJ1bl9hbGw7XG5leHBvcnRzLnNhZmVfbm90X2VxdWFsID0gc2FmZV9ub3RfZXF1YWw7XG5leHBvcnRzLnNjaGVkdWxlX3VwZGF0ZSA9IHNjaGVkdWxlX3VwZGF0ZTtcbmV4cG9ydHMuc2VsZWN0X211bHRpcGxlX3ZhbHVlID0gc2VsZWN0X211bHRpcGxlX3ZhbHVlO1xuZXhwb3J0cy5zZWxlY3Rfb3B0aW9uID0gc2VsZWN0X29wdGlvbjtcbmV4cG9ydHMuc2VsZWN0X29wdGlvbnMgPSBzZWxlY3Rfb3B0aW9ucztcbmV4cG9ydHMuc2VsZWN0X3ZhbHVlID0gc2VsZWN0X3ZhbHVlO1xuZXhwb3J0cy5zZWxmID0gc2VsZjtcbmV4cG9ydHMuc2V0Q29udGV4dCA9IHNldENvbnRleHQ7XG5leHBvcnRzLnNldF9hdHRyaWJ1dGVzID0gc2V0X2F0dHJpYnV0ZXM7XG5leHBvcnRzLnNldF9jdXJyZW50X2NvbXBvbmVudCA9IHNldF9jdXJyZW50X2NvbXBvbmVudDtcbmV4cG9ydHMuc2V0X2N1c3RvbV9lbGVtZW50X2RhdGEgPSBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YTtcbmV4cG9ydHMuc2V0X2RhdGEgPSBzZXRfZGF0YTtcbmV4cG9ydHMuc2V0X2RhdGFfZGV2ID0gc2V0X2RhdGFfZGV2O1xuZXhwb3J0cy5zZXRfaW5wdXRfdHlwZSA9IHNldF9pbnB1dF90eXBlO1xuZXhwb3J0cy5zZXRfaW5wdXRfdmFsdWUgPSBzZXRfaW5wdXRfdmFsdWU7XG5leHBvcnRzLnNldF9ub3cgPSBzZXRfbm93O1xuZXhwb3J0cy5zZXRfcmFmID0gc2V0X3JhZjtcbmV4cG9ydHMuc2V0X3N0b3JlX3ZhbHVlID0gc2V0X3N0b3JlX3ZhbHVlO1xuZXhwb3J0cy5zZXRfc3R5bGUgPSBzZXRfc3R5bGU7XG5leHBvcnRzLnNldF9zdmdfYXR0cmlidXRlcyA9IHNldF9zdmdfYXR0cmlidXRlcztcbmV4cG9ydHMuc3BhY2UgPSBzcGFjZTtcbmV4cG9ydHMuc3ByZWFkID0gc3ByZWFkO1xuZXhwb3J0cy5zcmNfdXJsX2VxdWFsID0gc3JjX3VybF9lcXVhbDtcbmV4cG9ydHMuc3RhcnRfaHlkcmF0aW5nID0gc3RhcnRfaHlkcmF0aW5nO1xuZXhwb3J0cy5zdG9wX3Byb3BhZ2F0aW9uID0gc3RvcF9wcm9wYWdhdGlvbjtcbmV4cG9ydHMuc3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuZXhwb3J0cy5zdmdfZWxlbWVudCA9IHN2Z19lbGVtZW50O1xuZXhwb3J0cy50ZXh0ID0gdGV4dDtcbmV4cG9ydHMudGljayA9IHRpY2s7XG5leHBvcnRzLnRpbWVfcmFuZ2VzX3RvX2FycmF5ID0gdGltZV9yYW5nZXNfdG9fYXJyYXk7XG5leHBvcnRzLnRvX251bWJlciA9IHRvX251bWJlcjtcbmV4cG9ydHMudG9nZ2xlX2NsYXNzID0gdG9nZ2xlX2NsYXNzO1xuZXhwb3J0cy50cmFuc2l0aW9uX2luID0gdHJhbnNpdGlvbl9pbjtcbmV4cG9ydHMudHJhbnNpdGlvbl9vdXQgPSB0cmFuc2l0aW9uX291dDtcbmV4cG9ydHMudHJ1c3RlZCA9IHRydXN0ZWQ7XG5leHBvcnRzLnVwZGF0ZV9hd2FpdF9ibG9ja19icmFuY2ggPSB1cGRhdGVfYXdhaXRfYmxvY2tfYnJhbmNoO1xuZXhwb3J0cy51cGRhdGVfa2V5ZWRfZWFjaCA9IHVwZGF0ZV9rZXllZF9lYWNoO1xuZXhwb3J0cy51cGRhdGVfc2xvdCA9IHVwZGF0ZV9zbG90O1xuZXhwb3J0cy51cGRhdGVfc2xvdF9iYXNlID0gdXBkYXRlX3Nsb3RfYmFzZTtcbmV4cG9ydHMudmFsaWRhdGVfY29tcG9uZW50ID0gdmFsaWRhdGVfY29tcG9uZW50O1xuZXhwb3J0cy52YWxpZGF0ZV9keW5hbWljX2VsZW1lbnQgPSB2YWxpZGF0ZV9keW5hbWljX2VsZW1lbnQ7XG5leHBvcnRzLnZhbGlkYXRlX2VhY2hfYXJndW1lbnQgPSB2YWxpZGF0ZV9lYWNoX2FyZ3VtZW50O1xuZXhwb3J0cy52YWxpZGF0ZV9lYWNoX2tleXMgPSB2YWxpZGF0ZV9lYWNoX2tleXM7XG5leHBvcnRzLnZhbGlkYXRlX3Nsb3RzID0gdmFsaWRhdGVfc2xvdHM7XG5leHBvcnRzLnZhbGlkYXRlX3N0b3JlID0gdmFsaWRhdGVfc3RvcmU7XG5leHBvcnRzLnZhbGlkYXRlX3ZvaWRfZHluYW1pY19lbGVtZW50ID0gdmFsaWRhdGVfdm9pZF9keW5hbWljX2VsZW1lbnQ7XG5leHBvcnRzLnhsaW5rX2F0dHIgPSB4bGlua19hdHRyO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxudmFyIGludGVybmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaW5kZXguanMnKTtcblxuY29uc3Qgc3Vic2NyaWJlcl9xdWV1ZSA9IFtdO1xuLyoqXG4gKiBDcmVhdGVzIGEgYFJlYWRhYmxlYCBzdG9yZSB0aGF0IGFsbG93cyByZWFkaW5nIGJ5IHN1YnNjcmlwdGlvbi5cbiAqIEBwYXJhbSB2YWx1ZSBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyfXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcbiAqL1xuZnVuY3Rpb24gcmVhZGFibGUodmFsdWUsIHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiB3cml0YWJsZSh2YWx1ZSwgc3RhcnQpLnN1YnNjcmliZVxuICAgIH07XG59XG4vKipcbiAqIENyZWF0ZSBhIGBXcml0YWJsZWAgc3RvcmUgdGhhdCBhbGxvd3MgYm90aCB1cGRhdGluZyBhbmQgcmVhZGluZyBieSBzdWJzY3JpcHRpb24uXG4gKiBAcGFyYW0geyo9fXZhbHVlIGluaXRpYWwgdmFsdWVcbiAqIEBwYXJhbSB7U3RhcnRTdG9wTm90aWZpZXI9fXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcbiAqL1xuZnVuY3Rpb24gd3JpdGFibGUodmFsdWUsIHN0YXJ0ID0gaW50ZXJuYWwubm9vcCkge1xuICAgIGxldCBzdG9wO1xuICAgIGNvbnN0IHN1YnNjcmliZXJzID0gbmV3IFNldCgpO1xuICAgIGZ1bmN0aW9uIHNldChuZXdfdmFsdWUpIHtcbiAgICAgICAgaWYgKGludGVybmFsLnNhZmVfbm90X2VxdWFsKHZhbHVlLCBuZXdfdmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ld192YWx1ZTtcbiAgICAgICAgICAgIGlmIChzdG9wKSB7IC8vIHN0b3JlIGlzIHJlYWR5XG4gICAgICAgICAgICAgICAgY29uc3QgcnVuX3F1ZXVlID0gIXN1YnNjcmliZXJfcXVldWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3Vic2NyaWJlciBvZiBzdWJzY3JpYmVycykge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyWzFdKCk7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWUucHVzaChzdWJzY3JpYmVyLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChydW5fcXVldWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlW2ldWzBdKHN1YnNjcmliZXJfcXVldWVbaSArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZShmbikge1xuICAgICAgICBzZXQoZm4odmFsdWUpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlKHJ1biwgaW52YWxpZGF0ZSA9IGludGVybmFsLm5vb3ApIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaWJlciA9IFtydW4sIGludmFsaWRhdGVdO1xuICAgICAgICBzdWJzY3JpYmVycy5hZGQoc3Vic2NyaWJlcik7XG4gICAgICAgIGlmIChzdWJzY3JpYmVycy5zaXplID09PSAxKSB7XG4gICAgICAgICAgICBzdG9wID0gc3RhcnQoc2V0KSB8fCBpbnRlcm5hbC5ub29wO1xuICAgICAgICB9XG4gICAgICAgIHJ1bih2YWx1ZSk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBzdWJzY3JpYmVycy5kZWxldGUoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICBpZiAoc3Vic2NyaWJlcnMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgICAgICAgICBzdG9wID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgc2V0LCB1cGRhdGUsIHN1YnNjcmliZSB9O1xufVxuZnVuY3Rpb24gZGVyaXZlZChzdG9yZXMsIGZuLCBpbml0aWFsX3ZhbHVlKSB7XG4gICAgY29uc3Qgc2luZ2xlID0gIUFycmF5LmlzQXJyYXkoc3RvcmVzKTtcbiAgICBjb25zdCBzdG9yZXNfYXJyYXkgPSBzaW5nbGVcbiAgICAgICAgPyBbc3RvcmVzXVxuICAgICAgICA6IHN0b3JlcztcbiAgICBjb25zdCBhdXRvID0gZm4ubGVuZ3RoIDwgMjtcbiAgICByZXR1cm4gcmVhZGFibGUoaW5pdGlhbF92YWx1ZSwgKHNldCkgPT4ge1xuICAgICAgICBsZXQgaW5pdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IFtdO1xuICAgICAgICBsZXQgcGVuZGluZyA9IDA7XG4gICAgICAgIGxldCBjbGVhbnVwID0gaW50ZXJuYWwubm9vcDtcbiAgICAgICAgY29uc3Qgc3luYyA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChwZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm4oc2luZ2xlID8gdmFsdWVzWzBdIDogdmFsdWVzLCBzZXQpO1xuICAgICAgICAgICAgaWYgKGF1dG8pIHtcbiAgICAgICAgICAgICAgICBzZXQocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsZWFudXAgPSBpbnRlcm5hbC5pc19mdW5jdGlvbihyZXN1bHQpID8gcmVzdWx0IDogaW50ZXJuYWwubm9vcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdW5zdWJzY3JpYmVycyA9IHN0b3Jlc19hcnJheS5tYXAoKHN0b3JlLCBpKSA9PiBpbnRlcm5hbC5zdWJzY3JpYmUoc3RvcmUsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdmFsdWVzW2ldID0gdmFsdWU7XG4gICAgICAgICAgICBwZW5kaW5nICY9IH4oMSA8PCBpKTtcbiAgICAgICAgICAgIGlmIChpbml0ZWQpIHtcbiAgICAgICAgICAgICAgICBzeW5jKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHBlbmRpbmcgfD0gKDEgPDwgaSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgc3luYygpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgICAgIGludGVybmFsLnJ1bl9hbGwodW5zdWJzY3JpYmVycyk7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgIH07XG4gICAgfSk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnZ2V0Jywge1xuXHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gaW50ZXJuYWwuZ2V0X3N0b3JlX3ZhbHVlO1xuXHR9XG59KTtcbmV4cG9ydHMuZGVyaXZlZCA9IGRlcml2ZWQ7XG5leHBvcnRzLnJlYWRhYmxlID0gcmVhZGFibGU7XG5leHBvcnRzLndyaXRhYmxlID0gd3JpdGFibGU7XG4iLCAiaW1wb3J0IHsgd3JpdGFibGUgfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuXG5leHBvcnQgY29uc3QgQkFTRV9VUkwgPSAnaHR0cHM6Ly9naXRodWIuY29tJztcbmV4cG9ydCBjb25zdCBBUElfVVJMID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20nO1xuXG4vKiB4Z2xvYmFsIFByb21pc2UsIGZldGNoICovXG5cbmNvbnN0IGRhdGEgPSB3aW5kb3cubG9jYWxTdG9yYWdlLl9EQVRBO1xuXG4vLyBzaGFyZWQgc3RhdGVcbmV4cG9ydCBjb25zdCBsb2dnZWRJbiA9IHdyaXRhYmxlKCEhZGF0YSk7XG5leHBvcnQgY29uc3Qgc2Vzc2lvbiA9IHdyaXRhYmxlKGRhdGEgPyBKU09OLnBhcnNlKGRhdGEpIDoge30pO1xuZXhwb3J0IGNvbnN0IHNjaGVtYXMgPSB3cml0YWJsZShbXSk7XG5leHBvcnQgY29uc3QgY3VycmVudCA9IHdyaXRhYmxlKHt9KTtcbmV4cG9ydCBjb25zdCBvcHRpb25zID0gd3JpdGFibGUobnVsbCk7XG5cbi8vIGJ1aWxkcyBhIGZpeGVkIFVSTCBmb3IgZ2l0aHViLmFwaSBjYWxsc1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVybCh4LCBwYXRoLCBwYXJhbXMpIHtcbiAgY29uc3QgdXJsID0gYCR7eH0ke3BhdGh9P2NsaWVudF9pZD0ke3Byb2Nlc3MuZW52LkFVVEhfSUR9JmNsaWVudF9zZWNyZXQ9JHtwcm9jZXNzLmVudi5BVVRIX1NFQ1JFVH1gO1xuICBjb25zdCByZWRpcmVjdCA9IGByZWRpcmVjdF91cmk9JHtlbmNvZGVVUklDb21wb25lbnQoYCR7bG9jYXRpb24ucHJvdG9jb2x9Ly8ke2xvY2F0aW9uLmhvc3R9L2ApfWA7XG5cbiAgcmV0dXJuIHBhcmFtc1xuICAgID8gYCR7dXJsfSYke09iamVjdC5rZXlzKHBhcmFtcykubWFwKGsgPT4gYCR7a309JHtwYXJhbXNba119YCkuam9pbignJicpfSYke3JlZGlyZWN0fWBcbiAgICA6IGAke3VybH0ke3BhcmFtcyAhPT0gZmFsc2UgPyBgJiR7cmVkaXJlY3R9YCA6ICcnfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRKU09OKHBhdGgsIHBhcmFtcywgX29wdGlvbnMpIHtcbiAgcmV0dXJuIGZldGNoKGAke3Byb2Nlc3MuZW52LlBST1hZX1VSTH0ke2dldFVybChBUElfVVJMLCBwYXRoLCBfb3B0aW9ucyl9YCwge1xuICAgIC4uLnBhcmFtcyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgYmVhcmVyICR7d2luZG93LmxvY2FsU3RvcmFnZS5fQVVUSH1gLFxuICAgIH0sXG4gIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEZyb20odXJpKSB7XG4gIGNvbnN0IHRtcCA9IHVyaS5yZXBsYWNlKCcjJywgJycpLnNwbGl0KCcvJyk7XG5cbiAgaWYgKHRtcC5sZW5ndGggPT09IDEpIHtcbiAgICAvLyBvbGQgc3R5bGUgVVJJLWJhc2VkIHNjaGVtYSAtIHN1cHBvcnRlZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgIC8vIGV4YW1wbGU6IGh0dHA6Ly9qc29uLXNjaGVtYS1mYWtlci5qcy5vcmcvIyU3QiUyMnR5cGUlMjIlM0ElMjJzdHJpbmclMjIlMkMlMjJjaGFuY2UlMjIlM0ElN0IlMjJmaXJzdCUyMiUzQSU3QiUyMm5hdGlvbmFsaXR5JTIyJTNBJTIyZW4lMjIlN0QlN0QlN0RcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIGZpbGVzOiB7XG4gICAgICAgIC8vIGxlZ2FjeSBhbmQgdWdseVxuICAgICAgICAnc2NoZW1hLmpzb24nOiB7XG4gICAgICAgICAgY29udGVudDogZGVjb2RlVVJJQ29tcG9uZW50KHRtcFswXSksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgW3R5cGUsIGhhc2hdID0gdG1wO1xuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2dpc3QnOlxuICAgICAgLy8gZXhhbXBsZTogaHR0cDovL2pzb24tc2NoZW1hLWZha2VyLmpzLm9yZy8jZ2lzdC9jMzQ3ZjJmNjA4M2ZlODFhMWZlNDNkMTdiODMxMjVkN1xuICAgICAgcmV0dXJuIGZldGNoKGdldFVybChBUElfVVJMLCBgL2dpc3RzLyR7aGFzaH1gKSlcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xuXG4gICAgY2FzZSAndXJpJzpcbiAgICAgIC8vIGV4YW1wbGU6IGh0dHA6Ly9qc29uLXNjaGVtYS1mYWtlci5qcy5vcmcvI3VyaS8lN0IlMjJ0eXBlJTIyJTNBJTIyc3RyaW5nJTIyJTJDJTIyY2hhbmNlJTIyJTNBJTdCJTIyZmlyc3QlMjIlM0ElN0IlMjJuYXRpb25hbGl0eSUyMiUzQSUyMmVuJTIyJTdEJTdEJTdEXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgZmlsZXM6IHtcbiAgICAgICAgICBFeGFtcGxlOiB7XG4gICAgICAgICAgICBjb250ZW50OiBkZWNvZGVVUklDb21wb25lbnQoaGFzaCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBzdG9yYWdlIHR5cGUnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZShzY2hlbWFzKSB7XG4gIGNvbnN0IF9maWxlcyA9IHtcbiAgICAvLyBmcmVzaCBjb3B5IG9mIGN1cnJlbnQgb3B0aW9uc1xuICAgICdfb3B0aW9ucy5qc29uJzoge1xuICAgICAgY29udGVudDogSlNPTi5zdHJpbmdpZnkoJG9wdGlvbnMpLFxuICAgIH0sXG4gIH07XG5cbiAgLy8gc3RvcmUgZWFjaCBnaXZlbiBzY2hlbWFcbiAgT2JqZWN0LmtleXMoc2NoZW1hcykuZm9yRWFjaChrZXkgPT4ge1xuICAgIF9maWxlc1trZXldID0geyBjb250ZW50OiBzY2hlbWFzW2tleV0udmFsdWUgfTtcbiAgfSk7XG5cbiAgLy8gRklYTUU6IHBhdGNoIGdpc3QgaWYgb3duZXIgbWF0Y2hlcz9cblxuICBjb25zdCB1cmwgPSBnZXRVcmwoQVBJX1VSTCwgJy9naXN0cycsIGZhbHNlKTtcbiAgY29uc3QgZml4ZWRVcmwgPSBgJHtwcm9jZXNzLmVudi5QUk9YWV9VUkx9JHt1cmx9YDtcblxuICByZXR1cm4gZmV0Y2goZml4ZWRVcmwsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgYmVhcmVyICR7dG9rZW5JZH1gLFxuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBkZXNjcmlwdGlvbjogJ1NjaGVtYXMgY3JlYXRlZCBieSBodHRwOi8vanNvbi1zY2hlbWEtZmFrZXIuanMub3JnJyxcbiAgICAgIGZpbGVzOiBfZmlsZXMsXG4gICAgfSksXG4gIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5tZXNzYWdlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLm1lc3NhZ2UpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF1dGgodG9rZW5JZCwgY2FsbGJhY2spIHtcbiAgd2luZG93LmxvY2FsU3RvcmFnZS5fQVVUSCA9ICcnO1xuXG4gIGNvbnN0IHVybCA9IGdldFVybChCQVNFX1VSTCwgJy9sb2dpbi9vYXV0aC9hY2Nlc3NfdG9rZW4nLCB7XG4gICAgY29kZTogdG9rZW5JZCxcbiAgfSk7XG5cbiAgZmV0Y2goYCR7cHJvY2Vzcy5lbnYuUFJPWFlfVVJMfSR7dXJsfWAsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBpZiAocmVzdWx0LmFjY2Vzc190b2tlbikge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLl9BVVRIID0gcmVzdWx0LmFjY2Vzc190b2tlbjtcbiAgICAgICAgc2V0VGltZW91dChjYWxsYmFjaywgMTIwKTtcbiAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVybCgpIHtcbiAgcmV0dXJuIGdldFVybChCQVNFX1VSTCwgJy9sb2dpbi9vYXV0aC9hdXRob3JpemUnLCB7XG4gICAgc2NvcGU6ICdnaXN0LHJlYWQ6dXNlcicsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxsKCkge1xuICByZXR1cm4gZ2V0SlNPTignL2dpc3RzJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZSgpIHtcbiAgcmV0dXJuIGdldEpTT04oJy91c2VyJyk7XG59XG4iLCAiaW1wb3J0IHsgYXV0aCB9IGZyb20gJy4vbGliL2dpc3RzJztcblxuaW1wb3J0IEF1dGggZnJvbSAnLi9saWIvQXV0aC5zdmVsdGUnO1xuaW1wb3J0IEVkaXRvciBmcm9tICcuL2xpYi9FZGl0b3Iuc3ZlbHRlJztcblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cuSlNPTlNjaGVtYUZha2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgIEpTT05TY2hlbWFGYWtlci5leHRlbmQoJ2Zha2VyJywgKCkgPT4gd2luZG93LmZha2VyKTtcbiAgICBKU09OU2NoZW1hRmFrZXIuZXh0ZW5kKCdjaGFuY2UnLCAoKSA9PiB3aW5kb3cuY2hhbmNlKTtcbiAgfVxuXG4gIC8vIGluaXRpYWxpemUgbW9kdWxlc1xuICBuZXcgQXV0aCh7IHRhcmdldDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dGgnKSB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBuZXcgRWRpdG9yKHsgdGFyZ2V0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdG9yJykgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbn1cblxuZnVuY3Rpb24gZGVidWcobXNnKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkaW5nLW92ZXJsYXkgLmpzZi1sb2dvJykuY2xhc3NMaXN0LnJlbW92ZSgnZmxvYXQnKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRpbmctb3ZlcmxheSAudGFjJykuaW5uZXJIVE1MID0gYFxuICAgIDxwIHN0eWxlPVwibWF4LXdpZHRoOjIwMHB4XCIgY2xhc3M9XCJtdCBtYiBjbnRcIj4ke21zZ308L3A+XG4gICAgPGJ1dHRvbiBvbmNsaWNrPVwid2luZG93LmNsb3NlKClcIiBjbGFzcz1cImJ1XCI+Q2xvc2Ugd2luZG93PC9idXR0b24+XG4gIGA7XG59XG5cbi8vIGhhbmRsZXMgYXV0aG9lbnRpY2F0aW9uIHRocm91Z2ggZ2l0aHViLWFwaVxuaWYgKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoJz9jb2RlPScpKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkaW5nLW92ZXJsYXkgLnRhYycpLmlubmVyVGV4dCA9ICdBdXRoZW50aWNhdGluZy4uLic7XG5cbiAgYXV0aCh3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNwbGl0KCc/Y29kZT0nKVsxXSwgKCkgPT4ge1xuICAgIGNvbnN0IGNsZWFuVXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVswXTtcblxuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCAnJywgY2xlYW5VcmwpO1xuXG4gICAgaWYgKHdpbmRvdy5vcGVuZXIpIHtcbiAgICAgIHdpbmRvdy5jbG9zZSgpO1xuICAgIH1cbiAgfSk7XG59IGVsc2UgaWYgKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoJz9lcnJvcj0nKSkge1xuICBjb25zdCBtZXNzYWdlID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zcGxpdCgnZXJyb3JfZGVzY3JpcHRpb249JylbMV07XG4gIGNvbnN0IGVycm9yID0gbWVzc2FnZS5zcGxpdCgnJicpWzBdLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuXG4gIGRlYnVnKGVycm9yKTtcbn0gZWxzZSB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkaW5nLW92ZXJsYXknKS5jbGFzc0xpc3QuYWRkKCdmYWRlLW91dCcpO1xuICAgIG1haW4oKTtcbiAgfSwgMTI2MCk7XG59XG4iLCAiZnVuY3Rpb24gbm9vcCgpIHsgfVxuY29uc3QgaWRlbnRpdHkgPSB4ID0+IHg7XG5mdW5jdGlvbiBhc3NpZ24odGFyLCBzcmMpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZm9yIChjb25zdCBrIGluIHNyYylcbiAgICAgICAgdGFyW2tdID0gc3JjW2tdO1xuICAgIHJldHVybiB0YXI7XG59XG5mdW5jdGlvbiBpc19wcm9taXNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBhZGRfbG9jYXRpb24oZWxlbWVudCwgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyKSB7XG4gICAgZWxlbWVudC5fX3N2ZWx0ZV9tZXRhID0ge1xuICAgICAgICBsb2M6IHsgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gcnVuKGZuKSB7XG4gICAgcmV0dXJuIGZuKCk7XG59XG5mdW5jdGlvbiBibGFua19vYmplY3QoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCk7XG59XG5mdW5jdGlvbiBydW5fYWxsKGZucykge1xuICAgIGZucy5mb3JFYWNoKHJ1bik7XG59XG5mdW5jdGlvbiBpc19mdW5jdGlvbih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBzYWZlX25vdF9lcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGIgfHwgKChhICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JykgfHwgdHlwZW9mIGEgPT09ICdmdW5jdGlvbicpO1xufVxubGV0IHNyY191cmxfZXF1YWxfYW5jaG9yO1xuZnVuY3Rpb24gc3JjX3VybF9lcXVhbChlbGVtZW50X3NyYywgdXJsKSB7XG4gICAgaWYgKCFzcmNfdXJsX2VxdWFsX2FuY2hvcikge1xuICAgICAgICBzcmNfdXJsX2VxdWFsX2FuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB9XG4gICAgc3JjX3VybF9lcXVhbF9hbmNob3IuaHJlZiA9IHVybDtcbiAgICByZXR1cm4gZWxlbWVudF9zcmMgPT09IHNyY191cmxfZXF1YWxfYW5jaG9yLmhyZWY7XG59XG5mdW5jdGlvbiBub3RfZXF1YWwoYSwgYikge1xuICAgIHJldHVybiBhICE9IGEgPyBiID09IGIgOiBhICE9PSBiO1xufVxuZnVuY3Rpb24gaXNfZW1wdHkob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfc3RvcmUoc3RvcmUsIG5hbWUpIHtcbiAgICBpZiAoc3RvcmUgIT0gbnVsbCAmJiB0eXBlb2Ygc3RvcmUuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJyR7bmFtZX0nIGlzIG5vdCBhIHN0b3JlIHdpdGggYSAnc3Vic2NyaWJlJyBtZXRob2RgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzdWJzY3JpYmUoc3RvcmUsIC4uLmNhbGxiYWNrcykge1xuICAgIGlmIChzdG9yZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBub29wO1xuICAgIH1cbiAgICBjb25zdCB1bnN1YiA9IHN0b3JlLnN1YnNjcmliZSguLi5jYWxsYmFja3MpO1xuICAgIHJldHVybiB1bnN1Yi51bnN1YnNjcmliZSA/ICgpID0+IHVuc3ViLnVuc3Vic2NyaWJlKCkgOiB1bnN1Yjtcbn1cbmZ1bmN0aW9uIGdldF9zdG9yZV92YWx1ZShzdG9yZSkge1xuICAgIGxldCB2YWx1ZTtcbiAgICBzdWJzY3JpYmUoc3RvcmUsIF8gPT4gdmFsdWUgPSBfKSgpO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGNvbXBvbmVudF9zdWJzY3JpYmUoY29tcG9uZW50LCBzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBjb21wb25lbnQuJCQub25fZGVzdHJveS5wdXNoKHN1YnNjcmliZShzdG9yZSwgY2FsbGJhY2spKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9zbG90KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvbikge1xuICAgICAgICBjb25zdCBzbG90X2N0eCA9IGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbik7XG4gICAgICAgIHJldHVybiBkZWZpbml0aW9uWzBdKHNsb3RfY3R4KTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRfc2xvdF9jb250ZXh0KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcbiAgICByZXR1cm4gZGVmaW5pdGlvblsxXSAmJiBmblxuICAgICAgICA/IGFzc2lnbigkJHNjb3BlLmN0eC5zbGljZSgpLCBkZWZpbml0aW9uWzFdKGZuKGN0eCkpKVxuICAgICAgICA6ICQkc2NvcGUuY3R4O1xufVxuZnVuY3Rpb24gZ2V0X3Nsb3RfY2hhbmdlcyhkZWZpbml0aW9uLCAkJHNjb3BlLCBkaXJ0eSwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvblsyXSAmJiBmbikge1xuICAgICAgICBjb25zdCBsZXRzID0gZGVmaW5pdGlvblsyXShmbihkaXJ0eSkpO1xuICAgICAgICBpZiAoJCRzY29wZS5kaXJ0eSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbGV0cztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGxldHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBjb25zdCBtZXJnZWQgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IE1hdGgubWF4KCQkc2NvcGUuZGlydHkubGVuZ3RoLCBsZXRzLmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VkW2ldID0gJCRzY29wZS5kaXJ0eVtpXSB8IGxldHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkJHNjb3BlLmRpcnR5IHwgbGV0cztcbiAgICB9XG4gICAgcmV0dXJuICQkc2NvcGUuZGlydHk7XG59XG5mdW5jdGlvbiB1cGRhdGVfc2xvdF9iYXNlKHNsb3QsIHNsb3RfZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBzbG90X2NoYW5nZXMsIGdldF9zbG90X2NvbnRleHRfZm4pIHtcbiAgICBpZiAoc2xvdF9jaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IHNsb3RfY29udGV4dCA9IGdldF9zbG90X2NvbnRleHQoc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGdldF9zbG90X2NvbnRleHRfZm4pO1xuICAgICAgICBzbG90LnAoc2xvdF9jb250ZXh0LCBzbG90X2NoYW5nZXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZV9zbG90KHNsb3QsIHNsb3RfZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBkaXJ0eSwgZ2V0X3Nsb3RfY2hhbmdlc19mbiwgZ2V0X3Nsb3RfY29udGV4dF9mbikge1xuICAgIGNvbnN0IHNsb3RfY2hhbmdlcyA9IGdldF9zbG90X2NoYW5nZXMoc2xvdF9kZWZpbml0aW9uLCAkJHNjb3BlLCBkaXJ0eSwgZ2V0X3Nsb3RfY2hhbmdlc19mbik7XG4gICAgdXBkYXRlX3Nsb3RfYmFzZShzbG90LCBzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgc2xvdF9jaGFuZ2VzLCBnZXRfc2xvdF9jb250ZXh0X2ZuKTtcbn1cbmZ1bmN0aW9uIGdldF9hbGxfZGlydHlfZnJvbV9zY29wZSgkJHNjb3BlKSB7XG4gICAgaWYgKCQkc2NvcGUuY3R4Lmxlbmd0aCA+IDMyKSB7XG4gICAgICAgIGNvbnN0IGRpcnR5ID0gW107XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9ICQkc2NvcGUuY3R4Lmxlbmd0aCAvIDMyO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkaXJ0eVtpXSA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaXJ0eTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuZnVuY3Rpb24gZXhjbHVkZV9pbnRlcm5hbF9wcm9wcyhwcm9wcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3QgayBpbiBwcm9wcylcbiAgICAgICAgaWYgKGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3VsdFtrXSA9IHByb3BzW2tdO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBjb21wdXRlX3Jlc3RfcHJvcHMocHJvcHMsIGtleXMpIHtcbiAgICBjb25zdCByZXN0ID0ge307XG4gICAga2V5cyA9IG5ldyBTZXQoa2V5cyk7XG4gICAgZm9yIChjb25zdCBrIGluIHByb3BzKVxuICAgICAgICBpZiAoIWtleXMuaGFzKGspICYmIGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3Rba10gPSBwcm9wc1trXTtcbiAgICByZXR1cm4gcmVzdDtcbn1cbmZ1bmN0aW9uIGNvbXB1dGVfc2xvdHMoc2xvdHMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzbG90cykge1xuICAgICAgICByZXN1bHRba2V5XSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgbGV0IHJhbiA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICBpZiAocmFuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICByYW4gPSB0cnVlO1xuICAgICAgICBmbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuICAgIH07XG59XG5mdW5jdGlvbiBudWxsX3RvX2VtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xufVxuZnVuY3Rpb24gc2V0X3N0b3JlX3ZhbHVlKHN0b3JlLCByZXQsIHZhbHVlKSB7XG4gICAgc3RvcmUuc2V0KHZhbHVlKTtcbiAgICByZXR1cm4gcmV0O1xufVxuY29uc3QgaGFzX3Byb3AgPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbmZ1bmN0aW9uIGFjdGlvbl9kZXN0cm95ZXIoYWN0aW9uX3Jlc3VsdCkge1xuICAgIHJldHVybiBhY3Rpb25fcmVzdWx0ICYmIGlzX2Z1bmN0aW9uKGFjdGlvbl9yZXN1bHQuZGVzdHJveSkgPyBhY3Rpb25fcmVzdWx0LmRlc3Ryb3kgOiBub29wO1xufVxuXG5jb25zdCBpc19jbGllbnQgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbmxldCBub3cgPSBpc19jbGllbnRcbiAgICA/ICgpID0+IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgIDogKCkgPT4gRGF0ZS5ub3coKTtcbmxldCByYWYgPSBpc19jbGllbnQgPyBjYiA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpIDogbm9vcDtcbi8vIHVzZWQgaW50ZXJuYWxseSBmb3IgdGVzdGluZ1xuZnVuY3Rpb24gc2V0X25vdyhmbikge1xuICAgIG5vdyA9IGZuO1xufVxuZnVuY3Rpb24gc2V0X3JhZihmbikge1xuICAgIHJhZiA9IGZuO1xufVxuXG5jb25zdCB0YXNrcyA9IG5ldyBTZXQoKTtcbmZ1bmN0aW9uIHJ1bl90YXNrcyhub3cpIHtcbiAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBpZiAoIXRhc2suYyhub3cpKSB7XG4gICAgICAgICAgICB0YXNrcy5kZWxldGUodGFzayk7XG4gICAgICAgICAgICB0YXNrLmYoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0YXNrcy5zaXplICE9PSAwKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbn1cbi8qKlxuICogRm9yIHRlc3RpbmcgcHVycG9zZXMgb25seSFcbiAqL1xuZnVuY3Rpb24gY2xlYXJfbG9vcHMoKSB7XG4gICAgdGFza3MuY2xlYXIoKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB0YXNrIHRoYXQgcnVucyBvbiBlYWNoIHJhZiBmcmFtZVxuICogdW50aWwgaXQgcmV0dXJucyBhIGZhbHN5IHZhbHVlIG9yIGlzIGFib3J0ZWRcbiAqL1xuZnVuY3Rpb24gbG9vcChjYWxsYmFjaykge1xuICAgIGxldCB0YXNrO1xuICAgIGlmICh0YXNrcy5zaXplID09PSAwKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlOiBuZXcgUHJvbWlzZShmdWxmaWxsID0+IHtcbiAgICAgICAgICAgIHRhc2tzLmFkZCh0YXNrID0geyBjOiBjYWxsYmFjaywgZjogZnVsZmlsbCB9KTtcbiAgICAgICAgfSksXG4gICAgICAgIGFib3J0KCkge1xuICAgICAgICAgICAgdGFza3MuZGVsZXRlKHRhc2spO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLy8gVHJhY2sgd2hpY2ggbm9kZXMgYXJlIGNsYWltZWQgZHVyaW5nIGh5ZHJhdGlvbi4gVW5jbGFpbWVkIG5vZGVzIGNhbiB0aGVuIGJlIHJlbW92ZWQgZnJvbSB0aGUgRE9NXG4vLyBhdCB0aGUgZW5kIG9mIGh5ZHJhdGlvbiB3aXRob3V0IHRvdWNoaW5nIHRoZSByZW1haW5pbmcgbm9kZXMuXG5sZXQgaXNfaHlkcmF0aW5nID0gZmFsc2U7XG5mdW5jdGlvbiBzdGFydF9oeWRyYXRpbmcoKSB7XG4gICAgaXNfaHlkcmF0aW5nID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGVuZF9oeWRyYXRpbmcoKSB7XG4gICAgaXNfaHlkcmF0aW5nID0gZmFsc2U7XG59XG5mdW5jdGlvbiB1cHBlcl9ib3VuZChsb3csIGhpZ2gsIGtleSwgdmFsdWUpIHtcbiAgICAvLyBSZXR1cm4gZmlyc3QgaW5kZXggb2YgdmFsdWUgbGFyZ2VyIHRoYW4gaW5wdXQgdmFsdWUgaW4gdGhlIHJhbmdlIFtsb3csIGhpZ2gpXG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgICAgY29uc3QgbWlkID0gbG93ICsgKChoaWdoIC0gbG93KSA+PiAxKTtcbiAgICAgICAgaWYgKGtleShtaWQpIDw9IHZhbHVlKSB7XG4gICAgICAgICAgICBsb3cgPSBtaWQgKyAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGlnaCA9IG1pZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbG93O1xufVxuZnVuY3Rpb24gaW5pdF9oeWRyYXRlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuaHlkcmF0ZV9pbml0KVxuICAgICAgICByZXR1cm47XG4gICAgdGFyZ2V0Lmh5ZHJhdGVfaW5pdCA9IHRydWU7XG4gICAgLy8gV2Uga25vdyB0aGF0IGFsbCBjaGlsZHJlbiBoYXZlIGNsYWltX29yZGVyIHZhbHVlcyBzaW5jZSB0aGUgdW5jbGFpbWVkIGhhdmUgYmVlbiBkZXRhY2hlZCBpZiB0YXJnZXQgaXMgbm90IDxoZWFkPlxuICAgIGxldCBjaGlsZHJlbiA9IHRhcmdldC5jaGlsZE5vZGVzO1xuICAgIC8vIElmIHRhcmdldCBpcyA8aGVhZD4sIHRoZXJlIG1heSBiZSBjaGlsZHJlbiB3aXRob3V0IGNsYWltX29yZGVyXG4gICAgaWYgKHRhcmdldC5ub2RlTmFtZSA9PT0gJ0hFQUQnKSB7XG4gICAgICAgIGNvbnN0IG15Q2hpbGRyZW4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG5vZGUuY2xhaW1fb3JkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG15Q2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGlsZHJlbiA9IG15Q2hpbGRyZW47XG4gICAgfVxuICAgIC8qXG4gICAgKiBSZW9yZGVyIGNsYWltZWQgY2hpbGRyZW4gb3B0aW1hbGx5LlxuICAgICogV2UgY2FuIHJlb3JkZXIgY2xhaW1lZCBjaGlsZHJlbiBvcHRpbWFsbHkgYnkgZmluZGluZyB0aGUgbG9uZ2VzdCBzdWJzZXF1ZW5jZSBvZlxuICAgICogbm9kZXMgdGhhdCBhcmUgYWxyZWFkeSBjbGFpbWVkIGluIG9yZGVyIGFuZCBvbmx5IG1vdmluZyB0aGUgcmVzdC4gVGhlIGxvbmdlc3RcbiAgICAqIHN1YnNlcXVlbmNlIHN1YnNlcXVlbmNlIG9mIG5vZGVzIHRoYXQgYXJlIGNsYWltZWQgaW4gb3JkZXIgY2FuIGJlIGZvdW5kIGJ5XG4gICAgKiBjb21wdXRpbmcgdGhlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiAuY2xhaW1fb3JkZXIgdmFsdWVzLlxuICAgICpcbiAgICAqIFRoaXMgYWxnb3JpdGhtIGlzIG9wdGltYWwgaW4gZ2VuZXJhdGluZyB0aGUgbGVhc3QgYW1vdW50IG9mIHJlb3JkZXIgb3BlcmF0aW9uc1xuICAgICogcG9zc2libGUuXG4gICAgKlxuICAgICogUHJvb2Y6XG4gICAgKiBXZSBrbm93IHRoYXQsIGdpdmVuIGEgc2V0IG9mIHJlb3JkZXJpbmcgb3BlcmF0aW9ucywgdGhlIG5vZGVzIHRoYXQgZG8gbm90IG1vdmVcbiAgICAqIGFsd2F5cyBmb3JtIGFuIGluY3JlYXNpbmcgc3Vic2VxdWVuY2UsIHNpbmNlIHRoZXkgZG8gbm90IG1vdmUgYW1vbmcgZWFjaCBvdGhlclxuICAgICogbWVhbmluZyB0aGF0IHRoZXkgbXVzdCBiZSBhbHJlYWR5IG9yZGVyZWQgYW1vbmcgZWFjaCBvdGhlci4gVGh1cywgdGhlIG1heGltYWxcbiAgICAqIHNldCBvZiBub2RlcyB0aGF0IGRvIG5vdCBtb3ZlIGZvcm0gYSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UuXG4gICAgKi9cbiAgICAvLyBDb21wdXRlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZVxuICAgIC8vIG06IHN1YnNlcXVlbmNlIGxlbmd0aCBqID0+IGluZGV4IGsgb2Ygc21hbGxlc3QgdmFsdWUgdGhhdCBlbmRzIGFuIGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2YgbGVuZ3RoIGpcbiAgICBjb25zdCBtID0gbmV3IEludDMyQXJyYXkoY2hpbGRyZW4ubGVuZ3RoICsgMSk7XG4gICAgLy8gUHJlZGVjZXNzb3IgaW5kaWNlcyArIDFcbiAgICBjb25zdCBwID0gbmV3IEludDMyQXJyYXkoY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICBtWzBdID0gLTE7XG4gICAgbGV0IGxvbmdlc3QgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IGNoaWxkcmVuW2ldLmNsYWltX29yZGVyO1xuICAgICAgICAvLyBGaW5kIHRoZSBsYXJnZXN0IHN1YnNlcXVlbmNlIGxlbmd0aCBzdWNoIHRoYXQgaXQgZW5kcyBpbiBhIHZhbHVlIGxlc3MgdGhhbiBvdXIgY3VycmVudCB2YWx1ZVxuICAgICAgICAvLyB1cHBlcl9ib3VuZCByZXR1cm5zIGZpcnN0IGdyZWF0ZXIgdmFsdWUsIHNvIHdlIHN1YnRyYWN0IG9uZVxuICAgICAgICAvLyB3aXRoIGZhc3QgcGF0aCBmb3Igd2hlbiB3ZSBhcmUgb24gdGhlIGN1cnJlbnQgbG9uZ2VzdCBzdWJzZXF1ZW5jZVxuICAgICAgICBjb25zdCBzZXFMZW4gPSAoKGxvbmdlc3QgPiAwICYmIGNoaWxkcmVuW21bbG9uZ2VzdF1dLmNsYWltX29yZGVyIDw9IGN1cnJlbnQpID8gbG9uZ2VzdCArIDEgOiB1cHBlcl9ib3VuZCgxLCBsb25nZXN0LCBpZHggPT4gY2hpbGRyZW5bbVtpZHhdXS5jbGFpbV9vcmRlciwgY3VycmVudCkpIC0gMTtcbiAgICAgICAgcFtpXSA9IG1bc2VxTGVuXSArIDE7XG4gICAgICAgIGNvbnN0IG5ld0xlbiA9IHNlcUxlbiArIDE7XG4gICAgICAgIC8vIFdlIGNhbiBndWFyYW50ZWUgdGhhdCBjdXJyZW50IGlzIHRoZSBzbWFsbGVzdCB2YWx1ZS4gT3RoZXJ3aXNlLCB3ZSB3b3VsZCBoYXZlIGdlbmVyYXRlZCBhIGxvbmdlciBzZXF1ZW5jZS5cbiAgICAgICAgbVtuZXdMZW5dID0gaTtcbiAgICAgICAgbG9uZ2VzdCA9IE1hdGgubWF4KG5ld0xlbiwgbG9uZ2VzdCk7XG4gICAgfVxuICAgIC8vIFRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2Ygbm9kZXMgKGluaXRpYWxseSByZXZlcnNlZClcbiAgICBjb25zdCBsaXMgPSBbXTtcbiAgICAvLyBUaGUgcmVzdCBvZiB0aGUgbm9kZXMsIG5vZGVzIHRoYXQgd2lsbCBiZSBtb3ZlZFxuICAgIGNvbnN0IHRvTW92ZSA9IFtdO1xuICAgIGxldCBsYXN0ID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGxldCBjdXIgPSBtW2xvbmdlc3RdICsgMTsgY3VyICE9IDA7IGN1ciA9IHBbY3VyIC0gMV0pIHtcbiAgICAgICAgbGlzLnB1c2goY2hpbGRyZW5bY3VyIC0gMV0pO1xuICAgICAgICBmb3IgKDsgbGFzdCA+PSBjdXI7IGxhc3QtLSkge1xuICAgICAgICAgICAgdG9Nb3ZlLnB1c2goY2hpbGRyZW5bbGFzdF0pO1xuICAgICAgICB9XG4gICAgICAgIGxhc3QtLTtcbiAgICB9XG4gICAgZm9yICg7IGxhc3QgPj0gMDsgbGFzdC0tKSB7XG4gICAgICAgIHRvTW92ZS5wdXNoKGNoaWxkcmVuW2xhc3RdKTtcbiAgICB9XG4gICAgbGlzLnJldmVyc2UoKTtcbiAgICAvLyBXZSBzb3J0IHRoZSBub2RlcyBiZWluZyBtb3ZlZCB0byBndWFyYW50ZWUgdGhhdCB0aGVpciBpbnNlcnRpb24gb3JkZXIgbWF0Y2hlcyB0aGUgY2xhaW0gb3JkZXJcbiAgICB0b01vdmUuc29ydCgoYSwgYikgPT4gYS5jbGFpbV9vcmRlciAtIGIuY2xhaW1fb3JkZXIpO1xuICAgIC8vIEZpbmFsbHksIHdlIG1vdmUgdGhlIG5vZGVzXG4gICAgZm9yIChsZXQgaSA9IDAsIGogPSAwOyBpIDwgdG9Nb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdoaWxlIChqIDwgbGlzLmxlbmd0aCAmJiB0b01vdmVbaV0uY2xhaW1fb3JkZXIgPj0gbGlzW2pdLmNsYWltX29yZGVyKSB7XG4gICAgICAgICAgICBqKys7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYW5jaG9yID0gaiA8IGxpcy5sZW5ndGggPyBsaXNbal0gOiBudWxsO1xuICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKHRvTW92ZVtpXSwgYW5jaG9yKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhcHBlbmQodGFyZ2V0LCBub2RlKSB7XG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKG5vZGUpO1xufVxuZnVuY3Rpb24gYXBwZW5kX3N0eWxlcyh0YXJnZXQsIHN0eWxlX3NoZWV0X2lkLCBzdHlsZXMpIHtcbiAgICBjb25zdCBhcHBlbmRfc3R5bGVzX3RvID0gZ2V0X3Jvb3RfZm9yX3N0eWxlKHRhcmdldCk7XG4gICAgaWYgKCFhcHBlbmRfc3R5bGVzX3RvLmdldEVsZW1lbnRCeUlkKHN0eWxlX3NoZWV0X2lkKSkge1xuICAgICAgICBjb25zdCBzdHlsZSA9IGVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIHN0eWxlLmlkID0gc3R5bGVfc2hlZXRfaWQ7XG4gICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gc3R5bGVzO1xuICAgICAgICBhcHBlbmRfc3R5bGVzaGVldChhcHBlbmRfc3R5bGVzX3RvLCBzdHlsZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0X3Jvb3RfZm9yX3N0eWxlKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUpXG4gICAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICBjb25zdCByb290ID0gbm9kZS5nZXRSb290Tm9kZSA/IG5vZGUuZ2V0Um9vdE5vZGUoKSA6IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICBpZiAocm9vdCAmJiByb290Lmhvc3QpIHtcbiAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuICAgIHJldHVybiBub2RlLm93bmVyRG9jdW1lbnQ7XG59XG5mdW5jdGlvbiBhcHBlbmRfZW1wdHlfc3R5bGVzaGVldChub2RlKSB7XG4gICAgY29uc3Qgc3R5bGVfZWxlbWVudCA9IGVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgYXBwZW5kX3N0eWxlc2hlZXQoZ2V0X3Jvb3RfZm9yX3N0eWxlKG5vZGUpLCBzdHlsZV9lbGVtZW50KTtcbiAgICByZXR1cm4gc3R5bGVfZWxlbWVudC5zaGVldDtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9zdHlsZXNoZWV0KG5vZGUsIHN0eWxlKSB7XG4gICAgYXBwZW5kKG5vZGUuaGVhZCB8fCBub2RlLCBzdHlsZSk7XG4gICAgcmV0dXJuIHN0eWxlLnNoZWV0O1xufVxuZnVuY3Rpb24gYXBwZW5kX2h5ZHJhdGlvbih0YXJnZXQsIG5vZGUpIHtcbiAgICBpZiAoaXNfaHlkcmF0aW5nKSB7XG4gICAgICAgIGluaXRfaHlkcmF0ZSh0YXJnZXQpO1xuICAgICAgICBpZiAoKHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkID09PSB1bmRlZmluZWQpIHx8ICgodGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgIT09IG51bGwpICYmICh0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZC5wYXJlbnROb2RlICE9PSB0YXJnZXQpKSkge1xuICAgICAgICAgICAgdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgPSB0YXJnZXQuZmlyc3RDaGlsZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBTa2lwIG5vZGVzIG9mIHVuZGVmaW5lZCBvcmRlcmluZ1xuICAgICAgICB3aGlsZSAoKHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkICE9PSBudWxsKSAmJiAodGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQuY2xhaW1fb3JkZXIgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkID0gdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUgIT09IHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkKSB7XG4gICAgICAgICAgICAvLyBXZSBvbmx5IGluc2VydCBpZiB0aGUgb3JkZXJpbmcgb2YgdGhpcyBub2RlIHNob3VsZCBiZSBtb2RpZmllZCBvciB0aGUgcGFyZW50IG5vZGUgaXMgbm90IHRhcmdldFxuICAgICAgICAgICAgaWYgKG5vZGUuY2xhaW1fb3JkZXIgIT09IHVuZGVmaW5lZCB8fCBub2RlLnBhcmVudE5vZGUgIT09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUucGFyZW50Tm9kZSAhPT0gdGFyZ2V0IHx8IG5vZGUubmV4dFNpYmxpbmcgIT09IG51bGwpIHtcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgYW5jaG9yIHx8IG51bGwpO1xufVxuZnVuY3Rpb24gaW5zZXJ0X2h5ZHJhdGlvbih0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIGlmIChpc19oeWRyYXRpbmcgJiYgIWFuY2hvcikge1xuICAgICAgICBhcHBlbmRfaHlkcmF0aW9uKHRhcmdldCwgbm9kZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUucGFyZW50Tm9kZSAhPT0gdGFyZ2V0IHx8IG5vZGUubmV4dFNpYmxpbmcgIT0gYW5jaG9yKSB7XG4gICAgICAgIHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgYW5jaG9yIHx8IG51bGwpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaChub2RlKSB7XG4gICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xufVxuZnVuY3Rpb24gZGVzdHJveV9lYWNoKGl0ZXJhdGlvbnMsIGRldGFjaGluZykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcmF0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoaXRlcmF0aW9uc1tpXSlcbiAgICAgICAgICAgIGl0ZXJhdGlvbnNbaV0uZChkZXRhY2hpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGVsZW1lbnQobmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xufVxuZnVuY3Rpb24gZWxlbWVudF9pcyhuYW1lLCBpcykge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUsIHsgaXMgfSk7XG59XG5mdW5jdGlvbiBvYmplY3Rfd2l0aG91dF9wcm9wZXJ0aWVzKG9iaiwgZXhjbHVkZSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHt9O1xuICAgIGZvciAoY29uc3QgayBpbiBvYmopIHtcbiAgICAgICAgaWYgKGhhc19wcm9wKG9iaiwgaylcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICYmIGV4Y2x1ZGUuaW5kZXhPZihrKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRhcmdldFtrXSA9IG9ialtrXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gc3ZnX2VsZW1lbnQobmFtZSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgbmFtZSk7XG59XG5mdW5jdGlvbiB0ZXh0KGRhdGEpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZGF0YSk7XG59XG5mdW5jdGlvbiBzcGFjZSgpIHtcbiAgICByZXR1cm4gdGV4dCgnICcpO1xufVxuZnVuY3Rpb24gZW1wdHkoKSB7XG4gICAgcmV0dXJuIHRleHQoJycpO1xufVxuZnVuY3Rpb24gbGlzdGVuKG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICByZXR1cm4gKCkgPT4gbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHByZXZlbnRfZGVmYXVsdChmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHN0b3BfcHJvcGFnYXRpb24oZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gc2VsZihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzKVxuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHRydXN0ZWQoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKGV2ZW50LmlzVHJ1c3RlZClcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICBlbHNlIGlmIChub2RlLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpICE9PSB2YWx1ZSlcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBzZXRfYXR0cmlidXRlcyhub2RlLCBhdHRyaWJ1dGVzKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMobm9kZS5fX3Byb3RvX18pO1xuICAgIGZvciAoY29uc3Qga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXNba2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ19fdmFsdWUnKSB7XG4gICAgICAgICAgICBub2RlLnZhbHVlID0gbm9kZVtrZXldID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0b3JzW2tleV0gJiYgZGVzY3JpcHRvcnNba2V5XS5zZXQpIHtcbiAgICAgICAgICAgIG5vZGVba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF0dHIobm9kZSwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0X3N2Z19hdHRyaWJ1dGVzKG5vZGUsIGF0dHJpYnV0ZXMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGF0dHIobm9kZSwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9jdXN0b21fZWxlbWVudF9kYXRhKG5vZGUsIHByb3AsIHZhbHVlKSB7XG4gICAgaWYgKHByb3AgaW4gbm9kZSkge1xuICAgICAgICBub2RlW3Byb3BdID0gdHlwZW9mIG5vZGVbcHJvcF0gPT09ICdib29sZWFuJyAmJiB2YWx1ZSA9PT0gJycgPyB0cnVlIDogdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhdHRyKG5vZGUsIHByb3AsIHZhbHVlKTtcbiAgICB9XG59XG5mdW5jdGlvbiB4bGlua19hdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICBub2RlLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgYXR0cmlidXRlLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBnZXRfYmluZGluZ19ncm91cF92YWx1ZShncm91cCwgX192YWx1ZSwgY2hlY2tlZCkge1xuICAgIGNvbnN0IHZhbHVlID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGdyb3VwW2ldLmNoZWNrZWQpXG4gICAgICAgICAgICB2YWx1ZS5hZGQoZ3JvdXBbaV0uX192YWx1ZSk7XG4gICAgfVxuICAgIGlmICghY2hlY2tlZCkge1xuICAgICAgICB2YWx1ZS5kZWxldGUoX192YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHRvX251bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gJycgPyBudWxsIDogK3ZhbHVlO1xufVxuZnVuY3Rpb24gdGltZV9yYW5nZXNfdG9fYXJyYXkocmFuZ2VzKSB7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBhcnJheS5wdXNoKHsgc3RhcnQ6IHJhbmdlcy5zdGFydChpKSwgZW5kOiByYW5nZXMuZW5kKGkpIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG59XG5mdW5jdGlvbiBjaGlsZHJlbihlbGVtZW50KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKTtcbn1cbmZ1bmN0aW9uIGluaXRfY2xhaW1faW5mbyhub2Rlcykge1xuICAgIGlmIChub2Rlcy5jbGFpbV9pbmZvID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbm9kZXMuY2xhaW1faW5mbyA9IHsgbGFzdF9pbmRleDogMCwgdG90YWxfY2xhaW1lZDogMCB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNsYWltX25vZGUobm9kZXMsIHByZWRpY2F0ZSwgcHJvY2Vzc05vZGUsIGNyZWF0ZU5vZGUsIGRvbnRVcGRhdGVMYXN0SW5kZXggPSBmYWxzZSkge1xuICAgIC8vIFRyeSB0byBmaW5kIG5vZGVzIGluIGFuIG9yZGVyIHN1Y2ggdGhhdCB3ZSBsZW5ndGhlbiB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlXG4gICAgaW5pdF9jbGFpbV9pbmZvKG5vZGVzKTtcbiAgICBjb25zdCByZXN1bHROb2RlID0gKCgpID0+IHtcbiAgICAgICAgLy8gV2UgZmlyc3QgdHJ5IHRvIGZpbmQgYW4gZWxlbWVudCBhZnRlciB0aGUgcHJldmlvdXMgb25lXG4gICAgICAgIGZvciAobGV0IGkgPSBub2Rlcy5jbGFpbV9pbmZvLmxhc3RfaW5kZXg7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VtZW50ID0gcHJvY2Vzc05vZGUobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcGxhY2VtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXNbaV0gPSByZXBsYWNlbWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFkb250VXBkYXRlTGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLmNsYWltX2luZm8ubGFzdF9pbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE90aGVyd2lzZSwgd2UgdHJ5IHRvIGZpbmQgb25lIGJlZm9yZVxuICAgICAgICAvLyBXZSBpdGVyYXRlIGluIHJldmVyc2Ugc28gdGhhdCB3ZSBkb24ndCBnbyB0b28gZmFyIGJhY2tcbiAgICAgICAgZm9yIChsZXQgaSA9IG5vZGVzLmNsYWltX2luZm8ubGFzdF9pbmRleCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZW1lbnQgPSBwcm9jZXNzTm9kZShub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVwbGFjZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2Rlc1tpXSA9IHJlcGxhY2VtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWRvbnRVcGRhdGVMYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmVwbGFjZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB3ZSBzcGxpY2VkIGJlZm9yZSB0aGUgbGFzdF9pbmRleCwgd2UgZGVjcmVhc2UgaXRcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4LS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIGNhbid0IGZpbmQgYW55IG1hdGNoaW5nIG5vZGUsIHdlIGNyZWF0ZSBhIG5ldyBvbmVcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU5vZGUoKTtcbiAgICB9KSgpO1xuICAgIHJlc3VsdE5vZGUuY2xhaW1fb3JkZXIgPSBub2Rlcy5jbGFpbV9pbmZvLnRvdGFsX2NsYWltZWQ7XG4gICAgbm9kZXMuY2xhaW1faW5mby50b3RhbF9jbGFpbWVkICs9IDE7XG4gICAgcmV0dXJuIHJlc3VsdE5vZGU7XG59XG5mdW5jdGlvbiBjbGFpbV9lbGVtZW50X2Jhc2Uobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMsIGNyZWF0ZV9lbGVtZW50KSB7XG4gICAgcmV0dXJuIGNsYWltX25vZGUobm9kZXMsIChub2RlKSA9PiBub2RlLm5vZGVOYW1lID09PSBuYW1lLCAobm9kZSkgPT4ge1xuICAgICAgICBjb25zdCByZW1vdmUgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG5vZGUuYXR0cmlidXRlc1tqXTtcbiAgICAgICAgICAgIGlmICghYXR0cmlidXRlc1thdHRyaWJ1dGUubmFtZV0pIHtcbiAgICAgICAgICAgICAgICByZW1vdmUucHVzaChhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVtb3ZlLmZvckVhY2godiA9PiBub2RlLnJlbW92ZUF0dHJpYnV0ZSh2KSk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSwgKCkgPT4gY3JlYXRlX2VsZW1lbnQobmFtZSkpO1xufVxuZnVuY3Rpb24gY2xhaW1fZWxlbWVudChub2RlcywgbmFtZSwgYXR0cmlidXRlcykge1xuICAgIHJldHVybiBjbGFpbV9lbGVtZW50X2Jhc2Uobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMsIGVsZW1lbnQpO1xufVxuZnVuY3Rpb24gY2xhaW1fc3ZnX2VsZW1lbnQobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMpIHtcbiAgICByZXR1cm4gY2xhaW1fZWxlbWVudF9iYXNlKG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzLCBzdmdfZWxlbWVudCk7XG59XG5mdW5jdGlvbiBjbGFpbV90ZXh0KG5vZGVzLCBkYXRhKSB7XG4gICAgcmV0dXJuIGNsYWltX25vZGUobm9kZXMsIChub2RlKSA9PiBub2RlLm5vZGVUeXBlID09PSAzLCAobm9kZSkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhU3RyID0gJycgKyBkYXRhO1xuICAgICAgICBpZiAobm9kZS5kYXRhLnN0YXJ0c1dpdGgoZGF0YVN0cikpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmRhdGEubGVuZ3RoICE9PSBkYXRhU3RyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlLnNwbGl0VGV4dChkYXRhU3RyLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBub2RlLmRhdGEgPSBkYXRhU3RyO1xuICAgICAgICB9XG4gICAgfSwgKCkgPT4gdGV4dChkYXRhKSwgdHJ1ZSAvLyBUZXh0IG5vZGVzIHNob3VsZCBub3QgdXBkYXRlIGxhc3QgaW5kZXggc2luY2UgaXQgaXMgbGlrZWx5IG5vdCB3b3J0aCBpdCB0byBlbGltaW5hdGUgYW4gaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiBhY3R1YWwgZWxlbWVudHNcbiAgICApO1xufVxuZnVuY3Rpb24gY2xhaW1fc3BhY2Uobm9kZXMpIHtcbiAgICByZXR1cm4gY2xhaW1fdGV4dChub2RlcywgJyAnKTtcbn1cbmZ1bmN0aW9uIGZpbmRfY29tbWVudChub2RlcywgdGV4dCwgc3RhcnQpIHtcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSA4IC8qIGNvbW1lbnQgbm9kZSAqLyAmJiBub2RlLnRleHRDb250ZW50LnRyaW0oKSA9PT0gdGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzLmxlbmd0aDtcbn1cbmZ1bmN0aW9uIGNsYWltX2h0bWxfdGFnKG5vZGVzLCBpc19zdmcpIHtcbiAgICAvLyBmaW5kIGh0bWwgb3BlbmluZyB0YWdcbiAgICBjb25zdCBzdGFydF9pbmRleCA9IGZpbmRfY29tbWVudChub2RlcywgJ0hUTUxfVEFHX1NUQVJUJywgMCk7XG4gICAgY29uc3QgZW5kX2luZGV4ID0gZmluZF9jb21tZW50KG5vZGVzLCAnSFRNTF9UQUdfRU5EJywgc3RhcnRfaW5kZXgpO1xuICAgIGlmIChzdGFydF9pbmRleCA9PT0gZW5kX2luZGV4KSB7XG4gICAgICAgIHJldHVybiBuZXcgSHRtbFRhZ0h5ZHJhdGlvbih1bmRlZmluZWQsIGlzX3N2Zyk7XG4gICAgfVxuICAgIGluaXRfY2xhaW1faW5mbyhub2Rlcyk7XG4gICAgY29uc3QgaHRtbF90YWdfbm9kZXMgPSBub2Rlcy5zcGxpY2Uoc3RhcnRfaW5kZXgsIGVuZF9pbmRleCAtIHN0YXJ0X2luZGV4ICsgMSk7XG4gICAgZGV0YWNoKGh0bWxfdGFnX25vZGVzWzBdKTtcbiAgICBkZXRhY2goaHRtbF90YWdfbm9kZXNbaHRtbF90YWdfbm9kZXMubGVuZ3RoIC0gMV0pO1xuICAgIGNvbnN0IGNsYWltZWRfbm9kZXMgPSBodG1sX3RhZ19ub2Rlcy5zbGljZSgxLCBodG1sX3RhZ19ub2Rlcy5sZW5ndGggLSAxKTtcbiAgICBmb3IgKGNvbnN0IG4gb2YgY2xhaW1lZF9ub2Rlcykge1xuICAgICAgICBuLmNsYWltX29yZGVyID0gbm9kZXMuY2xhaW1faW5mby50b3RhbF9jbGFpbWVkO1xuICAgICAgICBub2Rlcy5jbGFpbV9pbmZvLnRvdGFsX2NsYWltZWQgKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBIdG1sVGFnSHlkcmF0aW9uKGNsYWltZWRfbm9kZXMsIGlzX3N2Zyk7XG59XG5mdW5jdGlvbiBzZXRfZGF0YSh0ZXh0LCBkYXRhKSB7XG4gICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICBpZiAodGV4dC53aG9sZVRleHQgIT09IGRhdGEpXG4gICAgICAgIHRleHQuZGF0YSA9IGRhdGE7XG59XG5mdW5jdGlvbiBzZXRfaW5wdXRfdmFsdWUoaW5wdXQsIHZhbHVlKSB7XG4gICAgaW5wdXQudmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHNldF9pbnB1dF90eXBlKGlucHV0LCB0eXBlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaW5wdXQudHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfc3R5bGUobm9kZSwga2V5LCB2YWx1ZSwgaW1wb3J0YW50KSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIG5vZGUuc3R5bGUucmVtb3ZlUHJvcGVydHkoa2V5KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG5vZGUuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSwgaW1wb3J0YW50ID8gJ2ltcG9ydGFudCcgOiAnJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2VsZWN0X29wdGlvbihzZWxlY3QsIHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcbiAgICAgICAgaWYgKG9wdGlvbi5fX3ZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY3Quc2VsZWN0ZWRJbmRleCA9IC0xOyAvLyBubyBvcHRpb24gc2hvdWxkIGJlIHNlbGVjdGVkXG59XG5mdW5jdGlvbiBzZWxlY3Rfb3B0aW9ucyhzZWxlY3QsIHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gfnZhbHVlLmluZGV4T2Yob3B0aW9uLl9fdmFsdWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNlbGVjdF92YWx1ZShzZWxlY3QpIHtcbiAgICBjb25zdCBzZWxlY3RlZF9vcHRpb24gPSBzZWxlY3QucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKSB8fCBzZWxlY3Qub3B0aW9uc1swXTtcbiAgICByZXR1cm4gc2VsZWN0ZWRfb3B0aW9uICYmIHNlbGVjdGVkX29wdGlvbi5fX3ZhbHVlO1xufVxuZnVuY3Rpb24gc2VsZWN0X211bHRpcGxlX3ZhbHVlKHNlbGVjdCkge1xuICAgIHJldHVybiBbXS5tYXAuY2FsbChzZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnOmNoZWNrZWQnKSwgb3B0aW9uID0+IG9wdGlvbi5fX3ZhbHVlKTtcbn1cbi8vIHVuZm9ydHVuYXRlbHkgdGhpcyBjYW4ndCBiZSBhIGNvbnN0YW50IGFzIHRoYXQgd291bGRuJ3QgYmUgdHJlZS1zaGFrZWFibGVcbi8vIHNvIHdlIGNhY2hlIHRoZSByZXN1bHQgaW5zdGVhZFxubGV0IGNyb3Nzb3JpZ2luO1xuZnVuY3Rpb24gaXNfY3Jvc3NvcmlnaW4oKSB7XG4gICAgaWYgKGNyb3Nzb3JpZ2luID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3Jvc3NvcmlnaW4gPSBmYWxzZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgdm9pZCB3aW5kb3cucGFyZW50LmRvY3VtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY3Jvc3NvcmlnaW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjcm9zc29yaWdpbjtcbn1cbmZ1bmN0aW9uIGFkZF9yZXNpemVfbGlzdGVuZXIobm9kZSwgZm4pIHtcbiAgICBjb25zdCBjb21wdXRlZF9zdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgaWYgKGNvbXB1dGVkX3N0eWxlLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICB9XG4gICAgY29uc3QgaWZyYW1lID0gZWxlbWVudCgnaWZyYW1lJyk7XG4gICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogYmxvY2s7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyAnICtcbiAgICAgICAgJ292ZXJmbG93OiBoaWRkZW47IGJvcmRlcjogMDsgb3BhY2l0eTogMDsgcG9pbnRlci1ldmVudHM6IG5vbmU7IHotaW5kZXg6IC0xOycpO1xuICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBpZnJhbWUudGFiSW5kZXggPSAtMTtcbiAgICBjb25zdCBjcm9zc29yaWdpbiA9IGlzX2Nyb3Nzb3JpZ2luKCk7XG4gICAgbGV0IHVuc3Vic2NyaWJlO1xuICAgIGlmIChjcm9zc29yaWdpbikge1xuICAgICAgICBpZnJhbWUuc3JjID0gXCJkYXRhOnRleHQvaHRtbCw8c2NyaXB0Pm9ucmVzaXplPWZ1bmN0aW9uKCl7cGFyZW50LnBvc3RNZXNzYWdlKDAsJyonKX08L3NjcmlwdD5cIjtcbiAgICAgICAgdW5zdWJzY3JpYmUgPSBsaXN0ZW4od2luZG93LCAnbWVzc2FnZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gaWZyYW1lLmNvbnRlbnRXaW5kb3cpXG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZnJhbWUuc3JjID0gJ2Fib3V0OmJsYW5rJztcbiAgICAgICAgaWZyYW1lLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlID0gbGlzdGVuKGlmcmFtZS5jb250ZW50V2luZG93LCAncmVzaXplJywgZm4pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBhcHBlbmQobm9kZSwgaWZyYW1lKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoY3Jvc3NvcmlnaW4pIHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodW5zdWJzY3JpYmUgJiYgaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZGV0YWNoKGlmcmFtZSk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHRvZ2dsZV9jbGFzcyhlbGVtZW50LCBuYW1lLCB0b2dnbGUpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdFt0b2dnbGUgPyAnYWRkJyA6ICdyZW1vdmUnXShuYW1lKTtcbn1cbmZ1bmN0aW9uIGN1c3RvbV9ldmVudCh0eXBlLCBkZXRhaWwsIHsgYnViYmxlcyA9IGZhbHNlLCBjYW5jZWxhYmxlID0gZmFsc2UgfSA9IHt9KSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIGRldGFpbCk7XG4gICAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBxdWVyeV9zZWxlY3Rvcl9hbGwoc2VsZWN0b3IsIHBhcmVudCA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xufVxuY2xhc3MgSHRtbFRhZyB7XG4gICAgY29uc3RydWN0b3IoaXNfc3ZnID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5pc19zdmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc19zdmcgPSBpc19zdmc7XG4gICAgICAgIHRoaXMuZSA9IHRoaXMubiA9IG51bGw7XG4gICAgfVxuICAgIGMoaHRtbCkge1xuICAgICAgICB0aGlzLmgoaHRtbCk7XG4gICAgfVxuICAgIG0oaHRtbCwgdGFyZ2V0LCBhbmNob3IgPSBudWxsKSB7XG4gICAgICAgIGlmICghdGhpcy5lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc19zdmcpXG4gICAgICAgICAgICAgICAgdGhpcy5lID0gc3ZnX2VsZW1lbnQodGFyZ2V0Lm5vZGVOYW1lKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmUgPSBlbGVtZW50KHRhcmdldC5ub2RlTmFtZSk7XG4gICAgICAgICAgICB0aGlzLnQgPSB0YXJnZXQ7XG4gICAgICAgICAgICB0aGlzLmMoaHRtbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pKGFuY2hvcik7XG4gICAgfVxuICAgIGgoaHRtbCkge1xuICAgICAgICB0aGlzLmUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgdGhpcy5uID0gQXJyYXkuZnJvbSh0aGlzLmUuY2hpbGROb2Rlcyk7XG4gICAgfVxuICAgIGkoYW5jaG9yKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpbnNlcnQodGhpcy50LCB0aGlzLm5baV0sIGFuY2hvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcChodG1sKSB7XG4gICAgICAgIHRoaXMuZCgpO1xuICAgICAgICB0aGlzLmgoaHRtbCk7XG4gICAgICAgIHRoaXMuaSh0aGlzLmEpO1xuICAgIH1cbiAgICBkKCkge1xuICAgICAgICB0aGlzLm4uZm9yRWFjaChkZXRhY2gpO1xuICAgIH1cbn1cbmNsYXNzIEh0bWxUYWdIeWRyYXRpb24gZXh0ZW5kcyBIdG1sVGFnIHtcbiAgICBjb25zdHJ1Y3RvcihjbGFpbWVkX25vZGVzLCBpc19zdmcgPSBmYWxzZSkge1xuICAgICAgICBzdXBlcihpc19zdmcpO1xuICAgICAgICB0aGlzLmUgPSB0aGlzLm4gPSBudWxsO1xuICAgICAgICB0aGlzLmwgPSBjbGFpbWVkX25vZGVzO1xuICAgIH1cbiAgICBjKGh0bWwpIHtcbiAgICAgICAgaWYgKHRoaXMubCkge1xuICAgICAgICAgICAgdGhpcy5uID0gdGhpcy5sO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3VwZXIuYyhodG1sKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpKGFuY2hvcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubi5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaW5zZXJ0X2h5ZHJhdGlvbih0aGlzLnQsIHRoaXMubltpXSwgYW5jaG9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGF0dHJpYnV0ZV90b19vYmplY3QoYXR0cmlidXRlcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3QgYXR0cmlidXRlIG9mIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmVzdWx0W2F0dHJpYnV0ZS5uYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGdldF9jdXN0b21fZWxlbWVudHNfc2xvdHMoZWxlbWVudCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIHJlc3VsdFtub2RlLnNsb3QgfHwgJ2RlZmF1bHQnXSA9IHRydWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gd2UgbmVlZCB0byBzdG9yZSB0aGUgaW5mb3JtYXRpb24gZm9yIG11bHRpcGxlIGRvY3VtZW50cyBiZWNhdXNlIGEgU3ZlbHRlIGFwcGxpY2F0aW9uIGNvdWxkIGFsc28gY29udGFpbiBpZnJhbWVzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlL2lzc3Vlcy8zNjI0XG5jb25zdCBtYW5hZ2VkX3N0eWxlcyA9IG5ldyBNYXAoKTtcbmxldCBhY3RpdmUgPSAwO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Rhcmtza3lhcHAvc3RyaW5nLWhhc2gvYmxvYi9tYXN0ZXIvaW5kZXguanNcbmZ1bmN0aW9uIGhhc2goc3RyKSB7XG4gICAgbGV0IGhhc2ggPSA1MzgxO1xuICAgIGxldCBpID0gc3RyLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgXiBzdHIuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gaGFzaCA+Pj4gMDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9zdHlsZV9pbmZvcm1hdGlvbihkb2MsIG5vZGUpIHtcbiAgICBjb25zdCBpbmZvID0geyBzdHlsZXNoZWV0OiBhcHBlbmRfZW1wdHlfc3R5bGVzaGVldChub2RlKSwgcnVsZXM6IHt9IH07XG4gICAgbWFuYWdlZF9zdHlsZXMuc2V0KGRvYywgaW5mbyk7XG4gICAgcmV0dXJuIGluZm87XG59XG5mdW5jdGlvbiBjcmVhdGVfcnVsZShub2RlLCBhLCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2UsIGZuLCB1aWQgPSAwKSB7XG4gICAgY29uc3Qgc3RlcCA9IDE2LjY2NiAvIGR1cmF0aW9uO1xuICAgIGxldCBrZXlmcmFtZXMgPSAne1xcbic7XG4gICAgZm9yIChsZXQgcCA9IDA7IHAgPD0gMTsgcCArPSBzdGVwKSB7XG4gICAgICAgIGNvbnN0IHQgPSBhICsgKGIgLSBhKSAqIGVhc2UocCk7XG4gICAgICAgIGtleWZyYW1lcyArPSBwICogMTAwICsgYCV7JHtmbih0LCAxIC0gdCl9fVxcbmA7XG4gICAgfVxuICAgIGNvbnN0IHJ1bGUgPSBrZXlmcmFtZXMgKyBgMTAwJSB7JHtmbihiLCAxIC0gYil9fVxcbn1gO1xuICAgIGNvbnN0IG5hbWUgPSBgX19zdmVsdGVfJHtoYXNoKHJ1bGUpfV8ke3VpZH1gO1xuICAgIGNvbnN0IGRvYyA9IGdldF9yb290X2Zvcl9zdHlsZShub2RlKTtcbiAgICBjb25zdCB7IHN0eWxlc2hlZXQsIHJ1bGVzIH0gPSBtYW5hZ2VkX3N0eWxlcy5nZXQoZG9jKSB8fCBjcmVhdGVfc3R5bGVfaW5mb3JtYXRpb24oZG9jLCBub2RlKTtcbiAgICBpZiAoIXJ1bGVzW25hbWVdKSB7XG4gICAgICAgIHJ1bGVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgc3R5bGVzaGVldC5pbnNlcnRSdWxlKGBAa2V5ZnJhbWVzICR7bmFtZX0gJHtydWxlfWAsIHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICB9XG4gICAgY29uc3QgYW5pbWF0aW9uID0gbm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJyc7XG4gICAgbm9kZS5zdHlsZS5hbmltYXRpb24gPSBgJHthbmltYXRpb24gPyBgJHthbmltYXRpb259LCBgIDogJyd9JHtuYW1lfSAke2R1cmF0aW9ufW1zIGxpbmVhciAke2RlbGF5fW1zIDEgYm90aGA7XG4gICAgYWN0aXZlICs9IDE7XG4gICAgcmV0dXJuIG5hbWU7XG59XG5mdW5jdGlvbiBkZWxldGVfcnVsZShub2RlLCBuYW1lKSB7XG4gICAgY29uc3QgcHJldmlvdXMgPSAobm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJycpLnNwbGl0KCcsICcpO1xuICAgIGNvbnN0IG5leHQgPSBwcmV2aW91cy5maWx0ZXIobmFtZVxuICAgICAgICA/IGFuaW0gPT4gYW5pbS5pbmRleE9mKG5hbWUpIDwgMCAvLyByZW1vdmUgc3BlY2lmaWMgYW5pbWF0aW9uXG4gICAgICAgIDogYW5pbSA9PiBhbmltLmluZGV4T2YoJ19fc3ZlbHRlJykgPT09IC0xIC8vIHJlbW92ZSBhbGwgU3ZlbHRlIGFuaW1hdGlvbnNcbiAgICApO1xuICAgIGNvbnN0IGRlbGV0ZWQgPSBwcmV2aW91cy5sZW5ndGggLSBuZXh0Lmxlbmd0aDtcbiAgICBpZiAoZGVsZXRlZCkge1xuICAgICAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IG5leHQuam9pbignLCAnKTtcbiAgICAgICAgYWN0aXZlIC09IGRlbGV0ZWQ7XG4gICAgICAgIGlmICghYWN0aXZlKVxuICAgICAgICAgICAgY2xlYXJfcnVsZXMoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjbGVhcl9ydWxlcygpIHtcbiAgICByYWYoKCkgPT4ge1xuICAgICAgICBpZiAoYWN0aXZlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBtYW5hZ2VkX3N0eWxlcy5mb3JFYWNoKGluZm8gPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBvd25lck5vZGUgfSA9IGluZm8uc3R5bGVzaGVldDtcbiAgICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIG93bmVyTm9kZSBpZiBpdCBydW5zIG9uIGpzZG9tLlxuICAgICAgICAgICAgaWYgKG93bmVyTm9kZSlcbiAgICAgICAgICAgICAgICBkZXRhY2gob3duZXJOb2RlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1hbmFnZWRfc3R5bGVzLmNsZWFyKCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZV9hbmltYXRpb24obm9kZSwgZnJvbSwgZm4sIHBhcmFtcykge1xuICAgIGlmICghZnJvbSlcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgY29uc3QgdG8gPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChmcm9tLmxlZnQgPT09IHRvLmxlZnQgJiYgZnJvbS5yaWdodCA9PT0gdG8ucmlnaHQgJiYgZnJvbS50b3AgPT09IHRvLnRvcCAmJiBmcm9tLmJvdHRvbSA9PT0gdG8uYm90dG9tKVxuICAgICAgICByZXR1cm4gbm9vcDtcbiAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCBcbiAgICAvLyBAdHMtaWdub3JlIHRvZG86IHNob3VsZCB0aGlzIGJlIHNlcGFyYXRlZCBmcm9tIGRlc3RydWN0dXJpbmc/IE9yIHN0YXJ0L2VuZCBhZGRlZCB0byBwdWJsaWMgYXBpIGFuZCBkb2N1bWVudGF0aW9uP1xuICAgIHN0YXJ0OiBzdGFydF90aW1lID0gbm93KCkgKyBkZWxheSwgXG4gICAgLy8gQHRzLWlnbm9yZSB0b2RvOlxuICAgIGVuZCA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbiwgdGljayA9IG5vb3AsIGNzcyB9ID0gZm4obm9kZSwgeyBmcm9tLCB0byB9LCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcbiAgICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuICAgIGxldCBuYW1lO1xuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICBuYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMCwgMSwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIG5hbWUpO1xuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgaWYgKCFzdGFydGVkICYmIG5vdyA+PSBzdGFydF90aW1lKSB7XG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRlZCAmJiBub3cgPj0gZW5kKSB7XG4gICAgICAgICAgICB0aWNrKDEsIDApO1xuICAgICAgICAgICAgc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydGVkKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gbm93IC0gc3RhcnRfdGltZTtcbiAgICAgICAgICAgIGNvbnN0IHQgPSAwICsgMSAqIGVhc2luZyhwIC8gZHVyYXRpb24pO1xuICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgc3RhcnQoKTtcbiAgICB0aWNrKDAsIDEpO1xuICAgIHJldHVybiBzdG9wO1xufVxuZnVuY3Rpb24gZml4X3Bvc2l0aW9uKG5vZGUpIHtcbiAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgaWYgKHN0eWxlLnBvc2l0aW9uICE9PSAnYWJzb2x1dGUnICYmIHN0eWxlLnBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gc3R5bGU7XG4gICAgICAgIGNvbnN0IGEgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgbm9kZS5zdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICBub2RlLnN0eWxlLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgYWRkX3RyYW5zZm9ybShub2RlLCBhKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRfdHJhbnNmb3JtKG5vZGUsIGEpIHtcbiAgICBjb25zdCBiID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoYS5sZWZ0ICE9PSBiLmxlZnQgfHwgYS50b3AgIT09IGIudG9wKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtID09PSAnbm9uZScgPyAnJyA6IHN0eWxlLnRyYW5zZm9ybTtcbiAgICAgICAgbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgJHt0cmFuc2Zvcm19IHRyYW5zbGF0ZSgke2EubGVmdCAtIGIubGVmdH1weCwgJHthLnRvcCAtIGIudG9wfXB4KWA7XG4gICAgfVxufVxuXG5sZXQgY3VycmVudF9jb21wb25lbnQ7XG5mdW5jdGlvbiBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgY3VycmVudF9jb21wb25lbnQgPSBjb21wb25lbnQ7XG59XG5mdW5jdGlvbiBnZXRfY3VycmVudF9jb21wb25lbnQoKSB7XG4gICAgaWYgKCFjdXJyZW50X2NvbXBvbmVudClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiBjYWxsZWQgb3V0c2lkZSBjb21wb25lbnQgaW5pdGlhbGl6YXRpb24nKTtcbiAgICByZXR1cm4gY3VycmVudF9jb21wb25lbnQ7XG59XG5mdW5jdGlvbiBiZWZvcmVVcGRhdGUoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5iZWZvcmVfdXBkYXRlLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gb25Nb3VudChmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLm9uX21vdW50LnB1c2goZm4pO1xufVxuZnVuY3Rpb24gYWZ0ZXJVcGRhdGUoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5hZnRlcl91cGRhdGUucHVzaChmbik7XG59XG5mdW5jdGlvbiBvbkRlc3Ryb3koZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9kZXN0cm95LnB1c2goZm4pO1xufVxuZnVuY3Rpb24gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCkge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IGdldF9jdXJyZW50X2NvbXBvbmVudCgpO1xuICAgIHJldHVybiAodHlwZSwgZGV0YWlsLCB7IGNhbmNlbGFibGUgPSBmYWxzZSB9ID0ge30pID0+IHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1t0eXBlXTtcbiAgICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICAgICAgLy8gVE9ETyBhcmUgdGhlcmUgc2l0dWF0aW9ucyB3aGVyZSBldmVudHMgY291bGQgYmUgZGlzcGF0Y2hlZFxuICAgICAgICAgICAgLy8gaW4gYSBzZXJ2ZXIgKG5vbi1ET00pIGVudmlyb25tZW50P1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBjdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsLCB7IGNhbmNlbGFibGUgfSk7XG4gICAgICAgICAgICBjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgICAgICAgICBmbi5jYWxsKGNvbXBvbmVudCwgZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHNldENvbnRleHQoa2V5LCBjb250ZXh0KSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dC5zZXQoa2V5LCBjb250ZXh0KTtcbiAgICByZXR1cm4gY29udGV4dDtcbn1cbmZ1bmN0aW9uIGdldENvbnRleHQoa2V5KSB7XG4gICAgcmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuZ2V0KGtleSk7XG59XG5mdW5jdGlvbiBnZXRBbGxDb250ZXh0cygpIHtcbiAgICByZXR1cm4gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dDtcbn1cbmZ1bmN0aW9uIGhhc0NvbnRleHQoa2V5KSB7XG4gICAgcmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuaGFzKGtleSk7XG59XG4vLyBUT0RPIGZpZ3VyZSBvdXQgaWYgd2Ugc3RpbGwgd2FudCB0byBzdXBwb3J0XG4vLyBzaG9ydGhhbmQgZXZlbnRzLCBvciBpZiB3ZSB3YW50IHRvIGltcGxlbWVudFxuLy8gYSByZWFsIGJ1YmJsaW5nIG1lY2hhbmlzbVxuZnVuY3Rpb24gYnViYmxlKGNvbXBvbmVudCwgZXZlbnQpIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW2V2ZW50LnR5cGVdO1xuICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKGZuID0+IGZuLmNhbGwodGhpcywgZXZlbnQpKTtcbiAgICB9XG59XG5cbmNvbnN0IGRpcnR5X2NvbXBvbmVudHMgPSBbXTtcbmNvbnN0IGludHJvcyA9IHsgZW5hYmxlZDogZmFsc2UgfTtcbmNvbnN0IGJpbmRpbmdfY2FsbGJhY2tzID0gW107XG5jb25zdCByZW5kZXJfY2FsbGJhY2tzID0gW107XG5jb25zdCBmbHVzaF9jYWxsYmFja3MgPSBbXTtcbmNvbnN0IHJlc29sdmVkX3Byb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbmxldCB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG5mdW5jdGlvbiBzY2hlZHVsZV91cGRhdGUoKSB7XG4gICAgaWYgKCF1cGRhdGVfc2NoZWR1bGVkKSB7XG4gICAgICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICByZXNvbHZlZF9wcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRpY2soKSB7XG4gICAgc2NoZWR1bGVfdXBkYXRlKCk7XG4gICAgcmV0dXJuIHJlc29sdmVkX3Byb21pc2U7XG59XG5mdW5jdGlvbiBhZGRfcmVuZGVyX2NhbGxiYWNrKGZuKSB7XG4gICAgcmVuZGVyX2NhbGxiYWNrcy5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGFkZF9mbHVzaF9jYWxsYmFjayhmbikge1xuICAgIGZsdXNoX2NhbGxiYWNrcy5wdXNoKGZuKTtcbn1cbi8vIGZsdXNoKCkgY2FsbHMgY2FsbGJhY2tzIGluIHRoaXMgb3JkZXI6XG4vLyAxLiBBbGwgYmVmb3JlVXBkYXRlIGNhbGxiYWNrcywgaW4gb3JkZXI6IHBhcmVudHMgYmVmb3JlIGNoaWxkcmVuXG4vLyAyLiBBbGwgYmluZDp0aGlzIGNhbGxiYWNrcywgaW4gcmV2ZXJzZSBvcmRlcjogY2hpbGRyZW4gYmVmb3JlIHBhcmVudHMuXG4vLyAzLiBBbGwgYWZ0ZXJVcGRhdGUgY2FsbGJhY2tzLCBpbiBvcmRlcjogcGFyZW50cyBiZWZvcmUgY2hpbGRyZW4uIEVYQ0VQVFxuLy8gICAgZm9yIGFmdGVyVXBkYXRlcyBjYWxsZWQgZHVyaW5nIHRoZSBpbml0aWFsIG9uTW91bnQsIHdoaWNoIGFyZSBjYWxsZWQgaW5cbi8vICAgIHJldmVyc2Ugb3JkZXI6IGNoaWxkcmVuIGJlZm9yZSBwYXJlbnRzLlxuLy8gU2luY2UgY2FsbGJhY2tzIG1pZ2h0IHVwZGF0ZSBjb21wb25lbnQgdmFsdWVzLCB3aGljaCBjb3VsZCB0cmlnZ2VyIGFub3RoZXJcbi8vIGNhbGwgdG8gZmx1c2goKSwgdGhlIGZvbGxvd2luZyBzdGVwcyBndWFyZCBhZ2FpbnN0IHRoaXM6XG4vLyAxLiBEdXJpbmcgYmVmb3JlVXBkYXRlLCBhbnkgdXBkYXRlZCBjb21wb25lbnRzIHdpbGwgYmUgYWRkZWQgdG8gdGhlXG4vLyAgICBkaXJ0eV9jb21wb25lbnRzIGFycmF5IGFuZCB3aWxsIGNhdXNlIGEgcmVlbnRyYW50IGNhbGwgdG8gZmx1c2goKS4gQmVjYXVzZVxuLy8gICAgdGhlIGZsdXNoIGluZGV4IGlzIGtlcHQgb3V0c2lkZSB0aGUgZnVuY3Rpb24sIHRoZSByZWVudHJhbnQgY2FsbCB3aWxsIHBpY2tcbi8vICAgIHVwIHdoZXJlIHRoZSBlYXJsaWVyIGNhbGwgbGVmdCBvZmYgYW5kIGdvIHRocm91Z2ggYWxsIGRpcnR5IGNvbXBvbmVudHMuIFRoZVxuLy8gICAgY3VycmVudF9jb21wb25lbnQgdmFsdWUgaXMgc2F2ZWQgYW5kIHJlc3RvcmVkIHNvIHRoYXQgdGhlIHJlZW50cmFudCBjYWxsIHdpbGxcbi8vICAgIG5vdCBpbnRlcmZlcmUgd2l0aCB0aGUgXCJwYXJlbnRcIiBmbHVzaCgpIGNhbGwuXG4vLyAyLiBiaW5kOnRoaXMgY2FsbGJhY2tzIGNhbm5vdCB0cmlnZ2VyIG5ldyBmbHVzaCgpIGNhbGxzLlxuLy8gMy4gRHVyaW5nIGFmdGVyVXBkYXRlLCBhbnkgdXBkYXRlZCBjb21wb25lbnRzIHdpbGwgTk9UIGhhdmUgdGhlaXIgYWZ0ZXJVcGRhdGVcbi8vICAgIGNhbGxiYWNrIGNhbGxlZCBhIHNlY29uZCB0aW1lOyB0aGUgc2Vlbl9jYWxsYmFja3Mgc2V0LCBvdXRzaWRlIHRoZSBmbHVzaCgpXG4vLyAgICBmdW5jdGlvbiwgZ3VhcmFudGVlcyB0aGlzIGJlaGF2aW9yLlxuY29uc3Qgc2Vlbl9jYWxsYmFja3MgPSBuZXcgU2V0KCk7XG5sZXQgZmx1c2hpZHggPSAwOyAvLyBEbyAqbm90KiBtb3ZlIHRoaXMgaW5zaWRlIHRoZSBmbHVzaCgpIGZ1bmN0aW9uXG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgICBjb25zdCBzYXZlZF9jb21wb25lbnQgPSBjdXJyZW50X2NvbXBvbmVudDtcbiAgICBkbyB7XG4gICAgICAgIC8vIGZpcnN0LCBjYWxsIGJlZm9yZVVwZGF0ZSBmdW5jdGlvbnNcbiAgICAgICAgLy8gYW5kIHVwZGF0ZSBjb21wb25lbnRzXG4gICAgICAgIHdoaWxlIChmbHVzaGlkeCA8IGRpcnR5X2NvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBkaXJ0eV9jb21wb25lbnRzW2ZsdXNoaWR4XTtcbiAgICAgICAgICAgIGZsdXNoaWR4Kys7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShjb21wb25lbnQuJCQpO1xuICAgICAgICB9XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChudWxsKTtcbiAgICAgICAgZGlydHlfY29tcG9uZW50cy5sZW5ndGggPSAwO1xuICAgICAgICBmbHVzaGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChiaW5kaW5nX2NhbGxiYWNrcy5sZW5ndGgpXG4gICAgICAgICAgICBiaW5kaW5nX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgICAgICAvLyB0aGVuLCBvbmNlIGNvbXBvbmVudHMgYXJlIHVwZGF0ZWQsIGNhbGxcbiAgICAgICAgLy8gYWZ0ZXJVcGRhdGUgZnVuY3Rpb25zLiBUaGlzIG1heSBjYXVzZVxuICAgICAgICAvLyBzdWJzZXF1ZW50IHVwZGF0ZXMuLi5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHJlbmRlcl9jYWxsYmFja3NbaV07XG4gICAgICAgICAgICBpZiAoIXNlZW5fY2FsbGJhY2tzLmhhcyhjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICAvLyAuLi5zbyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGxvb3BzXG4gICAgICAgICAgICAgICAgc2Vlbl9jYWxsYmFja3MuYWRkKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlbmRlcl9jYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICB9IHdoaWxlIChkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCk7XG4gICAgd2hpbGUgKGZsdXNoX2NhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgZmx1c2hfY2FsbGJhY2tzLnBvcCgpKCk7XG4gICAgfVxuICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbiAgICBzZWVuX2NhbGxiYWNrcy5jbGVhcigpO1xuICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChzYXZlZF9jb21wb25lbnQpO1xufVxuZnVuY3Rpb24gdXBkYXRlKCQkKSB7XG4gICAgaWYgKCQkLmZyYWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICQkLnVwZGF0ZSgpO1xuICAgICAgICBydW5fYWxsKCQkLmJlZm9yZV91cGRhdGUpO1xuICAgICAgICBjb25zdCBkaXJ0eSA9ICQkLmRpcnR5O1xuICAgICAgICAkJC5kaXJ0eSA9IFstMV07XG4gICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LnAoJCQuY3R4LCBkaXJ0eSk7XG4gICAgICAgICQkLmFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xuICAgIH1cbn1cblxubGV0IHByb21pc2U7XG5mdW5jdGlvbiB3YWl0KCkge1xuICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2gobm9kZSwgZGlyZWN0aW9uLCBraW5kKSB7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGN1c3RvbV9ldmVudChgJHtkaXJlY3Rpb24gPyAnaW50cm8nIDogJ291dHJvJ30ke2tpbmR9YCkpO1xufVxuY29uc3Qgb3V0cm9pbmcgPSBuZXcgU2V0KCk7XG5sZXQgb3V0cm9zO1xuZnVuY3Rpb24gZ3JvdXBfb3V0cm9zKCkge1xuICAgIG91dHJvcyA9IHtcbiAgICAgICAgcjogMCxcbiAgICAgICAgYzogW10sXG4gICAgICAgIHA6IG91dHJvcyAvLyBwYXJlbnQgZ3JvdXBcbiAgICB9O1xufVxuZnVuY3Rpb24gY2hlY2tfb3V0cm9zKCkge1xuICAgIGlmICghb3V0cm9zLnIpIHtcbiAgICAgICAgcnVuX2FsbChvdXRyb3MuYyk7XG4gICAgfVxuICAgIG91dHJvcyA9IG91dHJvcy5wO1xufVxuZnVuY3Rpb24gdHJhbnNpdGlvbl9pbihibG9jaywgbG9jYWwpIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2suaSkge1xuICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICBibG9jay5pKGxvY2FsKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uX291dChibG9jaywgbG9jYWwsIGRldGFjaCwgY2FsbGJhY2spIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2subykge1xuICAgICAgICBpZiAob3V0cm9pbmcuaGFzKGJsb2NrKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgb3V0cm9pbmcuYWRkKGJsb2NrKTtcbiAgICAgICAgb3V0cm9zLmMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRldGFjaClcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suZCgxKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYmxvY2subyhsb2NhbCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxufVxuY29uc3QgbnVsbF90cmFuc2l0aW9uID0geyBkdXJhdGlvbjogMCB9O1xuZnVuY3Rpb24gY3JlYXRlX2luX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gZmFsc2U7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGxldCB0YXNrO1xuICAgIGxldCB1aWQgPSAwO1xuICAgIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ28oKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MsIHVpZCsrKTtcbiAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XG4gICAgICAgIGNvbnN0IGVuZF90aW1lID0gc3RhcnRfdGltZSArIGR1cmF0aW9uO1xuICAgICAgICBpZiAodGFzaylcbiAgICAgICAgICAgIHRhc2suYWJvcnQoKTtcbiAgICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgdHJ1ZSwgJ3N0YXJ0JykpO1xuICAgICAgICB0YXNrID0gbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAobm93ID49IGVuZF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHRydWUsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydCgpIHtcbiAgICAgICAgICAgIGlmIChzdGFydGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSk7XG4gICAgICAgICAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xuICAgICAgICAgICAgICAgIHdhaXQoKS50aGVuKGdvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWRhdGUoKSB7XG4gICAgICAgICAgICBzdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfb3V0X3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcbiAgICBsZXQgYW5pbWF0aW9uX25hbWU7XG4gICAgY29uc3QgZ3JvdXAgPSBvdXRyb3M7XG4gICAgZ3JvdXAuciArPSAxO1xuICAgIGZ1bmN0aW9uIGdvKCkge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAxLCAwLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XG4gICAgICAgIGNvbnN0IGVuZF90aW1lID0gc3RhcnRfdGltZSArIGR1cmF0aW9uO1xuICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGZhbHNlLCAnc3RhcnQnKSk7XG4gICAgICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBlbmRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIS0tZ3JvdXAucikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyB3aWxsIHJlc3VsdCBpbiBgZW5kKClgIGJlaW5nIGNhbGxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIGRvbid0IG5lZWQgdG8gY2xlYW4gdXAgaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChncm91cC5jKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gZWFzaW5nKChub3cgLSBzdGFydF90aW1lKSAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGljaygxIC0gdCwgdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgIGdvKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ28oKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZW5kKHJlc2V0KSB7XG4gICAgICAgICAgICBpZiAocmVzZXQgJiYgY29uZmlnLnRpY2spIHtcbiAgICAgICAgICAgICAgICBjb25maWcudGljaygxLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9iaWRpcmVjdGlvbmFsX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcywgaW50cm8pIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgdCA9IGludHJvID8gMCA6IDE7XG4gICAgbGV0IHJ1bm5pbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgbGV0IHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lID0gbnVsbDtcbiAgICBmdW5jdGlvbiBjbGVhcl9hbmltYXRpb24oKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdChwcm9ncmFtLCBkdXJhdGlvbikge1xuICAgICAgICBjb25zdCBkID0gKHByb2dyYW0uYiAtIHQpO1xuICAgICAgICBkdXJhdGlvbiAqPSBNYXRoLmFicyhkKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGE6IHQsXG4gICAgICAgICAgICBiOiBwcm9ncmFtLmIsXG4gICAgICAgICAgICBkLFxuICAgICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgICAgICBzdGFydDogcHJvZ3JhbS5zdGFydCxcbiAgICAgICAgICAgIGVuZDogcHJvZ3JhbS5zdGFydCArIGR1cmF0aW9uLFxuICAgICAgICAgICAgZ3JvdXA6IHByb2dyYW0uZ3JvdXBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ28oYikge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBjb25zdCBwcm9ncmFtID0ge1xuICAgICAgICAgICAgc3RhcnQ6IG5vdygpICsgZGVsYXksXG4gICAgICAgICAgICBiXG4gICAgICAgIH07XG4gICAgICAgIGlmICghYikge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBpbXByb3ZlIHR5cGluZ3NcbiAgICAgICAgICAgIHByb2dyYW0uZ3JvdXAgPSBvdXRyb3M7XG4gICAgICAgICAgICBvdXRyb3MuciArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0gfHwgcGVuZGluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICBwZW5kaW5nX3Byb2dyYW0gPSBwcm9ncmFtO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhbiBpbnRybywgYW5kIHRoZXJlJ3MgYSBkZWxheSwgd2UgbmVlZCB0byBkb1xuICAgICAgICAgICAgLy8gYW4gaW5pdGlhbCB0aWNrIGFuZC9vciBhcHBseSBDU1MgYW5pbWF0aW9uIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCB0LCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiKVxuICAgICAgICAgICAgICAgIHRpY2soMCwgMSk7XG4gICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBpbml0KHByb2dyYW0sIGR1cmF0aW9uKTtcbiAgICAgICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgYiwgJ3N0YXJ0JykpO1xuICAgICAgICAgICAgbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nX3Byb2dyYW0gJiYgbm93ID4gcGVuZGluZ19wcm9ncmFtLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IGluaXQocGVuZGluZ19wcm9ncmFtLCBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHJ1bm5pbmdfcHJvZ3JhbS5iLCAnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIHQsIHJ1bm5pbmdfcHJvZ3JhbS5iLCBydW5uaW5nX3Byb2dyYW0uZHVyYXRpb24sIDAsIGVhc2luZywgY29uZmlnLmNzcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm93ID49IHJ1bm5pbmdfcHJvZ3JhbS5lbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2sodCA9IHJ1bm5pbmdfcHJvZ3JhbS5iLCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBydW5uaW5nX3Byb2dyYW0uYiwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwZW5kaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSdyZSBkb25lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbS5iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGludHJvIFx1MjAxNCB3ZSBjYW4gdGlkeSB1cCBpbW1lZGlhdGVseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG91dHJvIFx1MjAxNCBuZWVkcyB0byBiZSBjb29yZGluYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIS0tcnVubmluZ19wcm9ncmFtLmdyb3VwLnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5fYWxsKHJ1bm5pbmdfcHJvZ3JhbS5ncm91cC5jKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5vdyA+PSBydW5uaW5nX3Byb2dyYW0uc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBub3cgLSBydW5uaW5nX3Byb2dyYW0uc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ID0gcnVubmluZ19wcm9ncmFtLmEgKyBydW5uaW5nX3Byb2dyYW0uZCAqIGVhc2luZyhwIC8gcnVubmluZ19wcm9ncmFtLmR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhIShydW5uaW5nX3Byb2dyYW0gfHwgcGVuZGluZ19wcm9ncmFtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJ1bihiKSB7XG4gICAgICAgICAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIHdhaXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgICAgICAgICAgZ28oYik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbyhiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW5kKCkge1xuICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX3Byb21pc2UocHJvbWlzZSwgaW5mbykge1xuICAgIGNvbnN0IHRva2VuID0gaW5mby50b2tlbiA9IHt9O1xuICAgIGZ1bmN0aW9uIHVwZGF0ZSh0eXBlLCBpbmRleCwga2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoaW5mby50b2tlbiAhPT0gdG9rZW4pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGluZm8ucmVzb2x2ZWQgPSB2YWx1ZTtcbiAgICAgICAgbGV0IGNoaWxkX2N0eCA9IGluZm8uY3R4O1xuICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNoaWxkX2N0eCA9IGNoaWxkX2N0eC5zbGljZSgpO1xuICAgICAgICAgICAgY2hpbGRfY3R4W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBibG9jayA9IHR5cGUgJiYgKGluZm8uY3VycmVudCA9IHR5cGUpKGNoaWxkX2N0eCk7XG4gICAgICAgIGxldCBuZWVkc19mbHVzaCA9IGZhbHNlO1xuICAgICAgICBpZiAoaW5mby5ibG9jaykge1xuICAgICAgICAgICAgaWYgKGluZm8uYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgaW5mby5ibG9ja3MuZm9yRWFjaCgoYmxvY2ssIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IGluZGV4ICYmIGJsb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cF9vdXRyb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25fb3V0KGJsb2NrLCAxLCAxLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8uYmxvY2tzW2ldID09PSBibG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvLmJsb2Nrc1tpXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja19vdXRyb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5mby5ibG9jay5kKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmxvY2suYygpO1xuICAgICAgICAgICAgdHJhbnNpdGlvbl9pbihibG9jaywgMSk7XG4gICAgICAgICAgICBibG9jay5tKGluZm8ubW91bnQoKSwgaW5mby5hbmNob3IpO1xuICAgICAgICAgICAgbmVlZHNfZmx1c2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGluZm8uYmxvY2sgPSBibG9jaztcbiAgICAgICAgaWYgKGluZm8uYmxvY2tzKVxuICAgICAgICAgICAgaW5mby5ibG9ja3NbaW5kZXhdID0gYmxvY2s7XG4gICAgICAgIGlmIChuZWVkc19mbHVzaCkge1xuICAgICAgICAgICAgZmx1c2goKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNfcHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICBjb25zdCBjdXJyZW50X2NvbXBvbmVudCA9IGdldF9jdXJyZW50X2NvbXBvbmVudCgpO1xuICAgICAgICBwcm9taXNlLnRoZW4odmFsdWUgPT4ge1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGN1cnJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnRoZW4sIDEsIGluZm8udmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChudWxsKTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGN1cnJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLmNhdGNoLCAyLCBpbmZvLmVycm9yLCBlcnJvcik7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgICAgICBpZiAoIWluZm8uaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGlmIHdlIHByZXZpb3VzbHkgaGFkIGEgdGhlbi9jYXRjaCBibG9jaywgZGVzdHJveSBpdFxuICAgICAgICBpZiAoaW5mby5jdXJyZW50ICE9PSBpbmZvLnBlbmRpbmcpIHtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnBlbmRpbmcsIDApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChpbmZvLmN1cnJlbnQgIT09IGluZm8udGhlbikge1xuICAgICAgICAgICAgdXBkYXRlKGluZm8udGhlbiwgMSwgaW5mby52YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLnJlc29sdmVkID0gcHJvbWlzZTtcbiAgICB9XG59XG5mdW5jdGlvbiB1cGRhdGVfYXdhaXRfYmxvY2tfYnJhbmNoKGluZm8sIGN0eCwgZGlydHkpIHtcbiAgICBjb25zdCBjaGlsZF9jdHggPSBjdHguc2xpY2UoKTtcbiAgICBjb25zdCB7IHJlc29sdmVkIH0gPSBpbmZvO1xuICAgIGlmIChpbmZvLmN1cnJlbnQgPT09IGluZm8udGhlbikge1xuICAgICAgICBjaGlsZF9jdHhbaW5mby52YWx1ZV0gPSByZXNvbHZlZDtcbiAgICB9XG4gICAgaWYgKGluZm8uY3VycmVudCA9PT0gaW5mby5jYXRjaCkge1xuICAgICAgICBjaGlsZF9jdHhbaW5mby5lcnJvcl0gPSByZXNvbHZlZDtcbiAgICB9XG4gICAgaW5mby5ibG9jay5wKGNoaWxkX2N0eCwgZGlydHkpO1xufVxuXG5jb25zdCBnbG9iYWxzID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgPyB3aW5kb3dcbiAgICA6IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IGdsb2JhbFRoaXNcbiAgICAgICAgOiBnbG9iYWwpO1xuXG5mdW5jdGlvbiBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5kKDEpO1xuICAgIGxvb2t1cC5kZWxldGUoYmxvY2sua2V5KTtcbn1cbmZ1bmN0aW9uIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICBsb29rdXAuZGVsZXRlKGJsb2NrLmtleSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmYoKTtcbiAgICBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuZnVuY3Rpb24gZml4X2FuZF9vdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZigpO1xuICAgIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuZnVuY3Rpb24gdXBkYXRlX2tleWVkX2VhY2gob2xkX2Jsb2NrcywgZGlydHksIGdldF9rZXksIGR5bmFtaWMsIGN0eCwgbGlzdCwgbG9va3VwLCBub2RlLCBkZXN0cm95LCBjcmVhdGVfZWFjaF9ibG9jaywgbmV4dCwgZ2V0X2NvbnRleHQpIHtcbiAgICBsZXQgbyA9IG9sZF9ibG9ja3MubGVuZ3RoO1xuICAgIGxldCBuID0gbGlzdC5sZW5ndGg7XG4gICAgbGV0IGkgPSBvO1xuICAgIGNvbnN0IG9sZF9pbmRleGVzID0ge307XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgb2xkX2luZGV4ZXNbb2xkX2Jsb2Nrc1tpXS5rZXldID0gaTtcbiAgICBjb25zdCBuZXdfYmxvY2tzID0gW107XG4gICAgY29uc3QgbmV3X2xvb2t1cCA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBkZWx0YXMgPSBuZXcgTWFwKCk7XG4gICAgaSA9IG47XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBjb25zdCBjaGlsZF9jdHggPSBnZXRfY29udGV4dChjdHgsIGxpc3QsIGkpO1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRfa2V5KGNoaWxkX2N0eCk7XG4gICAgICAgIGxldCBibG9jayA9IGxvb2t1cC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKCFibG9jaykge1xuICAgICAgICAgICAgYmxvY2sgPSBjcmVhdGVfZWFjaF9ibG9jayhrZXksIGNoaWxkX2N0eCk7XG4gICAgICAgICAgICBibG9jay5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZHluYW1pYykge1xuICAgICAgICAgICAgYmxvY2sucChjaGlsZF9jdHgsIGRpcnR5KTtcbiAgICAgICAgfVxuICAgICAgICBuZXdfbG9va3VwLnNldChrZXksIG5ld19ibG9ja3NbaV0gPSBibG9jayk7XG4gICAgICAgIGlmIChrZXkgaW4gb2xkX2luZGV4ZXMpXG4gICAgICAgICAgICBkZWx0YXMuc2V0KGtleSwgTWF0aC5hYnMoaSAtIG9sZF9pbmRleGVzW2tleV0pKTtcbiAgICB9XG4gICAgY29uc3Qgd2lsbF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IGRpZF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGZ1bmN0aW9uIGluc2VydChibG9jaykge1xuICAgICAgICB0cmFuc2l0aW9uX2luKGJsb2NrLCAxKTtcbiAgICAgICAgYmxvY2subShub2RlLCBuZXh0KTtcbiAgICAgICAgbG9va3VwLnNldChibG9jay5rZXksIGJsb2NrKTtcbiAgICAgICAgbmV4dCA9IGJsb2NrLmZpcnN0O1xuICAgICAgICBuLS07XG4gICAgfVxuICAgIHdoaWxlIChvICYmIG4pIHtcbiAgICAgICAgY29uc3QgbmV3X2Jsb2NrID0gbmV3X2Jsb2Nrc1tuIC0gMV07XG4gICAgICAgIGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3NbbyAtIDFdO1xuICAgICAgICBjb25zdCBuZXdfa2V5ID0gbmV3X2Jsb2NrLmtleTtcbiAgICAgICAgY29uc3Qgb2xkX2tleSA9IG9sZF9ibG9jay5rZXk7XG4gICAgICAgIGlmIChuZXdfYmxvY2sgPT09IG9sZF9ibG9jaykge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgbmV4dCA9IG5ld19ibG9jay5maXJzdDtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgICAgIG4tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbmV3X2xvb2t1cC5oYXMob2xkX2tleSkpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvbGQgYmxvY2tcbiAgICAgICAgICAgIGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFsb29rdXAuaGFzKG5ld19rZXkpIHx8IHdpbGxfbW92ZS5oYXMobmV3X2tleSkpIHtcbiAgICAgICAgICAgIGluc2VydChuZXdfYmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRpZF9tb3ZlLmhhcyhvbGRfa2V5KSkge1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlbHRhcy5nZXQobmV3X2tleSkgPiBkZWx0YXMuZ2V0KG9sZF9rZXkpKSB7XG4gICAgICAgICAgICBkaWRfbW92ZS5hZGQobmV3X2tleSk7XG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbGxfbW92ZS5hZGQob2xkX2tleSk7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKG8tLSkge1xuICAgICAgICBjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW29dO1xuICAgICAgICBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9ibG9jay5rZXkpKVxuICAgICAgICAgICAgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG4gICAgfVxuICAgIHdoaWxlIChuKVxuICAgICAgICBpbnNlcnQobmV3X2Jsb2Nrc1tuIC0gMV0pO1xuICAgIHJldHVybiBuZXdfYmxvY2tzO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfZWFjaF9rZXlzKGN0eCwgbGlzdCwgZ2V0X2NvbnRleHQsIGdldF9rZXkpIHtcbiAgICBjb25zdCBrZXlzID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRfa2V5KGdldF9jb250ZXh0KGN0eCwgbGlzdCwgaSkpO1xuICAgICAgICBpZiAoa2V5cy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaGF2ZSBkdXBsaWNhdGUga2V5cyBpbiBhIGtleWVkIGVhY2gnKTtcbiAgICAgICAgfVxuICAgICAgICBrZXlzLmFkZChrZXkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0X3NwcmVhZF91cGRhdGUobGV2ZWxzLCB1cGRhdGVzKSB7XG4gICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgY29uc3QgdG9fbnVsbF9vdXQgPSB7fTtcbiAgICBjb25zdCBhY2NvdW50ZWRfZm9yID0geyAkJHNjb3BlOiAxIH07XG4gICAgbGV0IGkgPSBsZXZlbHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgbyA9IGxldmVsc1tpXTtcbiAgICAgICAgY29uc3QgbiA9IHVwZGF0ZXNbaV07XG4gICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIG4pKVxuICAgICAgICAgICAgICAgICAgICB0b19udWxsX291dFtrZXldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFjY291bnRlZF9mb3Jba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVba2V5XSA9IG5ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudGVkX2ZvcltrZXldID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXZlbHNbaV0gPSBuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbykge1xuICAgICAgICAgICAgICAgIGFjY291bnRlZF9mb3Jba2V5XSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9fbnVsbF9vdXQpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHVwZGF0ZSkpXG4gICAgICAgICAgICB1cGRhdGVba2V5XSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZTtcbn1cbmZ1bmN0aW9uIGdldF9zcHJlYWRfb2JqZWN0KHNwcmVhZF9wcm9wcykge1xuICAgIHJldHVybiB0eXBlb2Ygc3ByZWFkX3Byb3BzID09PSAnb2JqZWN0JyAmJiBzcHJlYWRfcHJvcHMgIT09IG51bGwgPyBzcHJlYWRfcHJvcHMgOiB7fTtcbn1cblxuLy8gc291cmNlOiBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmRpY2VzLmh0bWxcbmNvbnN0IGJvb2xlYW5fYXR0cmlidXRlcyA9IG5ldyBTZXQoW1xuICAgICdhbGxvd2Z1bGxzY3JlZW4nLFxuICAgICdhbGxvd3BheW1lbnRyZXF1ZXN0JyxcbiAgICAnYXN5bmMnLFxuICAgICdhdXRvZm9jdXMnLFxuICAgICdhdXRvcGxheScsXG4gICAgJ2NoZWNrZWQnLFxuICAgICdjb250cm9scycsXG4gICAgJ2RlZmF1bHQnLFxuICAgICdkZWZlcicsXG4gICAgJ2Rpc2FibGVkJyxcbiAgICAnZm9ybW5vdmFsaWRhdGUnLFxuICAgICdoaWRkZW4nLFxuICAgICdpc21hcCcsXG4gICAgJ2xvb3AnLFxuICAgICdtdWx0aXBsZScsXG4gICAgJ211dGVkJyxcbiAgICAnbm9tb2R1bGUnLFxuICAgICdub3ZhbGlkYXRlJyxcbiAgICAnb3BlbicsXG4gICAgJ3BsYXlzaW5saW5lJyxcbiAgICAncmVhZG9ubHknLFxuICAgICdyZXF1aXJlZCcsXG4gICAgJ3JldmVyc2VkJyxcbiAgICAnc2VsZWN0ZWQnXG5dKTtcblxuLyoqIHJlZ2V4IG9mIGFsbCBodG1sIHZvaWQgZWxlbWVudCBuYW1lcyAqL1xuY29uc3Qgdm9pZF9lbGVtZW50X25hbWVzID0gL14oPzphcmVhfGJhc2V8YnJ8Y29sfGNvbW1hbmR8ZW1iZWR8aHJ8aW1nfGlucHV0fGtleWdlbnxsaW5rfG1ldGF8cGFyYW18c291cmNlfHRyYWNrfHdicikkLztcbmZ1bmN0aW9uIGlzX3ZvaWQobmFtZSkge1xuICAgIHJldHVybiB2b2lkX2VsZW1lbnRfbmFtZXMudGVzdChuYW1lKSB8fCBuYW1lLnRvTG93ZXJDYXNlKCkgPT09ICchZG9jdHlwZSc7XG59XG5cbmNvbnN0IGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyID0gL1tcXHMnXCI+Lz1cXHV7RkREMH0tXFx1e0ZERUZ9XFx1e0ZGRkV9XFx1e0ZGRkZ9XFx1ezFGRkZFfVxcdXsxRkZGRn1cXHV7MkZGRkV9XFx1ezJGRkZGfVxcdXszRkZGRX1cXHV7M0ZGRkZ9XFx1ezRGRkZFfVxcdXs0RkZGRn1cXHV7NUZGRkV9XFx1ezVGRkZGfVxcdXs2RkZGRX1cXHV7NkZGRkZ9XFx1ezdGRkZFfVxcdXs3RkZGRn1cXHV7OEZGRkV9XFx1ezhGRkZGfVxcdXs5RkZGRX1cXHV7OUZGRkZ9XFx1e0FGRkZFfVxcdXtBRkZGRn1cXHV7QkZGRkV9XFx1e0JGRkZGfVxcdXtDRkZGRX1cXHV7Q0ZGRkZ9XFx1e0RGRkZFfVxcdXtERkZGRn1cXHV7RUZGRkV9XFx1e0VGRkZGfVxcdXtGRkZGRX1cXHV7RkZGRkZ9XFx1ezEwRkZGRX1cXHV7MTBGRkZGfV0vdTtcbi8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2F0dHJpYnV0ZXMtMlxuLy8gaHR0cHM6Ly9pbmZyYS5zcGVjLndoYXR3Zy5vcmcvI25vbmNoYXJhY3RlclxuZnVuY3Rpb24gc3ByZWFkKGFyZ3MsIGF0dHJzX3RvX2FkZCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCAuLi5hcmdzKTtcbiAgICBpZiAoYXR0cnNfdG9fYWRkKSB7XG4gICAgICAgIGNvbnN0IGNsYXNzZXNfdG9fYWRkID0gYXR0cnNfdG9fYWRkLmNsYXNzZXM7XG4gICAgICAgIGNvbnN0IHN0eWxlc190b19hZGQgPSBhdHRyc190b19hZGQuc3R5bGVzO1xuICAgICAgICBpZiAoY2xhc3Nlc190b19hZGQpIHtcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLmNsYXNzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmNsYXNzID0gY2xhc3Nlc190b19hZGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmNsYXNzICs9ICcgJyArIGNsYXNzZXNfdG9fYWRkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzdHlsZXNfdG9fYWRkKSB7XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlcy5zdHlsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5zdHlsZSA9IHN0eWxlX29iamVjdF90b19zdHJpbmcoc3R5bGVzX3RvX2FkZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnN0eWxlID0gc3R5bGVfb2JqZWN0X3RvX3N0cmluZyhtZXJnZV9zc3Jfc3R5bGVzKGF0dHJpYnV0ZXMuc3R5bGUsIHN0eWxlc190b19hZGQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3RyID0gJyc7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgaWYgKGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyLnRlc3QobmFtZSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKVxuICAgICAgICAgICAgc3RyICs9ICcgJyArIG5hbWU7XG4gICAgICAgIGVsc2UgaWYgKGJvb2xlYW5fYXR0cmlidXRlcy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKVxuICAgICAgICAgICAgICAgIHN0ciArPSAnICcgKyBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0ciArPSBgICR7bmFtZX09XCIke3ZhbHVlfVwiYDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdHI7XG59XG5mdW5jdGlvbiBtZXJnZV9zc3Jfc3R5bGVzKHN0eWxlX2F0dHJpYnV0ZSwgc3R5bGVfZGlyZWN0aXZlKSB7XG4gICAgY29uc3Qgc3R5bGVfb2JqZWN0ID0ge307XG4gICAgZm9yIChjb25zdCBpbmRpdmlkdWFsX3N0eWxlIG9mIHN0eWxlX2F0dHJpYnV0ZS5zcGxpdCgnOycpKSB7XG4gICAgICAgIGNvbnN0IGNvbG9uX2luZGV4ID0gaW5kaXZpZHVhbF9zdHlsZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBpbmRpdmlkdWFsX3N0eWxlLnNsaWNlKDAsIGNvbG9uX2luZGV4KS50cmltKCk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaW5kaXZpZHVhbF9zdHlsZS5zbGljZShjb2xvbl9pbmRleCArIDEpLnRyaW0oKTtcbiAgICAgICAgaWYgKCFuYW1lKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIHN0eWxlX29iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gc3R5bGVfZGlyZWN0aXZlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gc3R5bGVfZGlyZWN0aXZlW25hbWVdO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0eWxlX29iamVjdFtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHN0eWxlX29iamVjdFtuYW1lXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3R5bGVfb2JqZWN0O1xufVxuY29uc3QgQVRUUl9SRUdFWCA9IC9bJlwiXS9nO1xuY29uc3QgQ09OVEVOVF9SRUdFWCA9IC9bJjxdL2c7XG4vKipcbiAqIE5vdGU6IHRoaXMgbWV0aG9kIGlzIHBlcmZvcm1hbmNlIHNlbnNpdGl2ZSBhbmQgaGFzIGJlZW4gb3B0aW1pemVkXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlL3B1bGwvNTcwMVxuICovXG5mdW5jdGlvbiBlc2NhcGUodmFsdWUsIGlzX2F0dHIgPSBmYWxzZSkge1xuICAgIGNvbnN0IHN0ciA9IFN0cmluZyh2YWx1ZSk7XG4gICAgY29uc3QgcGF0dGVybiA9IGlzX2F0dHIgPyBBVFRSX1JFR0VYIDogQ09OVEVOVF9SRUdFWDtcbiAgICBwYXR0ZXJuLmxhc3RJbmRleCA9IDA7XG4gICAgbGV0IGVzY2FwZWQgPSAnJztcbiAgICBsZXQgbGFzdCA9IDA7XG4gICAgd2hpbGUgKHBhdHRlcm4udGVzdChzdHIpKSB7XG4gICAgICAgIGNvbnN0IGkgPSBwYXR0ZXJuLmxhc3RJbmRleCAtIDE7XG4gICAgICAgIGNvbnN0IGNoID0gc3RyW2ldO1xuICAgICAgICBlc2NhcGVkICs9IHN0ci5zdWJzdHJpbmcobGFzdCwgaSkgKyAoY2ggPT09ICcmJyA/ICcmYW1wOycgOiAoY2ggPT09ICdcIicgPyAnJnF1b3Q7JyA6ICcmbHQ7JykpO1xuICAgICAgICBsYXN0ID0gaSArIDE7XG4gICAgfVxuICAgIHJldHVybiBlc2NhcGVkICsgc3RyLnN1YnN0cmluZyhsYXN0KTtcbn1cbmZ1bmN0aW9uIGVzY2FwZV9hdHRyaWJ1dGVfdmFsdWUodmFsdWUpIHtcbiAgICAvLyBrZWVwIGJvb2xlYW5zLCBudWxsLCBhbmQgdW5kZWZpbmVkIGZvciB0aGUgc2FrZSBvZiBgc3ByZWFkYFxuICAgIGNvbnN0IHNob3VsZF9lc2NhcGUgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8ICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKTtcbiAgICByZXR1cm4gc2hvdWxkX2VzY2FwZSA/IGVzY2FwZSh2YWx1ZSwgdHJ1ZSkgOiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGVzY2FwZV9vYmplY3Qob2JqKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gZXNjYXBlX2F0dHJpYnV0ZV92YWx1ZShvYmpba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBlYWNoKGl0ZW1zLCBmbikge1xuICAgIGxldCBzdHIgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHN0ciArPSBmbihpdGVtc1tpXSwgaSk7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5jb25zdCBtaXNzaW5nX2NvbXBvbmVudCA9IHtcbiAgICAkJHJlbmRlcjogKCkgPT4gJydcbn07XG5mdW5jdGlvbiB2YWxpZGF0ZV9jb21wb25lbnQoY29tcG9uZW50LCBuYW1lKSB7XG4gICAgaWYgKCFjb21wb25lbnQgfHwgIWNvbXBvbmVudC4kJHJlbmRlcikge1xuICAgICAgICBpZiAobmFtZSA9PT0gJ3N2ZWx0ZTpjb21wb25lbnQnKVxuICAgICAgICAgICAgbmFtZSArPSAnIHRoaXM9ey4uLn0nO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYDwke25hbWV9PiBpcyBub3QgYSB2YWxpZCBTU1IgY29tcG9uZW50LiBZb3UgbWF5IG5lZWQgdG8gcmV2aWV3IHlvdXIgYnVpbGQgY29uZmlnIHRvIGVuc3VyZSB0aGF0IGRlcGVuZGVuY2llcyBhcmUgY29tcGlsZWQsIHJhdGhlciB0aGFuIGltcG9ydGVkIGFzIHByZS1jb21waWxlZCBtb2R1bGVzYCk7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQ7XG59XG5mdW5jdGlvbiBkZWJ1ZyhmaWxlLCBsaW5lLCBjb2x1bW4sIHZhbHVlcykge1xuICAgIGNvbnNvbGUubG9nKGB7QGRlYnVnfSAke2ZpbGUgPyBmaWxlICsgJyAnIDogJyd9KCR7bGluZX06JHtjb2x1bW59KWApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyh2YWx1ZXMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICByZXR1cm4gJyc7XG59XG5sZXQgb25fZGVzdHJveTtcbmZ1bmN0aW9uIGNyZWF0ZV9zc3JfY29tcG9uZW50KGZuKSB7XG4gICAgZnVuY3Rpb24gJCRyZW5kZXIocmVzdWx0LCBwcm9wcywgYmluZGluZ3MsIHNsb3RzLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHBhcmVudF9jb21wb25lbnQgPSBjdXJyZW50X2NvbXBvbmVudDtcbiAgICAgICAgY29uc3QgJCQgPSB7XG4gICAgICAgICAgICBvbl9kZXN0cm95LFxuICAgICAgICAgICAgY29udGV4dDogbmV3IE1hcChjb250ZXh0IHx8IChwYXJlbnRfY29tcG9uZW50ID8gcGFyZW50X2NvbXBvbmVudC4kJC5jb250ZXh0IDogW10pKSxcbiAgICAgICAgICAgIC8vIHRoZXNlIHdpbGwgYmUgaW1tZWRpYXRlbHkgZGlzY2FyZGVkXG4gICAgICAgICAgICBvbl9tb3VudDogW10sXG4gICAgICAgICAgICBiZWZvcmVfdXBkYXRlOiBbXSxcbiAgICAgICAgICAgIGFmdGVyX3VwZGF0ZTogW10sXG4gICAgICAgICAgICBjYWxsYmFja3M6IGJsYW5rX29iamVjdCgpXG4gICAgICAgIH07XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudCh7ICQkIH0pO1xuICAgICAgICBjb25zdCBodG1sID0gZm4ocmVzdWx0LCBwcm9wcywgYmluZGluZ3MsIHNsb3RzKTtcbiAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xuICAgICAgICByZXR1cm4gaHRtbDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyOiAocHJvcHMgPSB7fSwgeyAkJHNsb3RzID0ge30sIGNvbnRleHQgPSBuZXcgTWFwKCkgfSA9IHt9KSA9PiB7XG4gICAgICAgICAgICBvbl9kZXN0cm95ID0gW107XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7IHRpdGxlOiAnJywgaGVhZDogJycsIGNzczogbmV3IFNldCgpIH07XG4gICAgICAgICAgICBjb25zdCBodG1sID0gJCRyZW5kZXIocmVzdWx0LCBwcm9wcywge30sICQkc2xvdHMsIGNvbnRleHQpO1xuICAgICAgICAgICAgcnVuX2FsbChvbl9kZXN0cm95KTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaHRtbCxcbiAgICAgICAgICAgICAgICBjc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgY29kZTogQXJyYXkuZnJvbShyZXN1bHQuY3NzKS5tYXAoY3NzID0+IGNzcy5jb2RlKS5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgbWFwOiBudWxsIC8vIFRPRE9cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhlYWQ6IHJlc3VsdC50aXRsZSArIHJlc3VsdC5oZWFkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICAkJHJlbmRlclxuICAgIH07XG59XG5mdW5jdGlvbiBhZGRfYXR0cmlidXRlKG5hbWUsIHZhbHVlLCBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwgfHwgKGJvb2xlYW4gJiYgIXZhbHVlKSlcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIGNvbnN0IGFzc2lnbm1lbnQgPSAoYm9vbGVhbiAmJiB2YWx1ZSA9PT0gdHJ1ZSkgPyAnJyA6IGA9XCIke2VzY2FwZSh2YWx1ZSwgdHJ1ZSl9XCJgO1xuICAgIHJldHVybiBgICR7bmFtZX0ke2Fzc2lnbm1lbnR9YDtcbn1cbmZ1bmN0aW9uIGFkZF9jbGFzc2VzKGNsYXNzZXMpIHtcbiAgICByZXR1cm4gY2xhc3NlcyA/IGAgY2xhc3M9XCIke2NsYXNzZXN9XCJgIDogJyc7XG59XG5mdW5jdGlvbiBzdHlsZV9vYmplY3RfdG9fc3RyaW5nKHN0eWxlX29iamVjdCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzdHlsZV9vYmplY3QpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IHN0eWxlX29iamVjdFtrZXldKVxuICAgICAgICAubWFwKGtleSA9PiBgJHtrZXl9OiAke3N0eWxlX29iamVjdFtrZXldfTtgKVxuICAgICAgICAuam9pbignICcpO1xufVxuZnVuY3Rpb24gYWRkX3N0eWxlcyhzdHlsZV9vYmplY3QpIHtcbiAgICBjb25zdCBzdHlsZXMgPSBzdHlsZV9vYmplY3RfdG9fc3RyaW5nKHN0eWxlX29iamVjdCk7XG4gICAgcmV0dXJuIHN0eWxlcyA/IGAgc3R5bGU9XCIke3N0eWxlc31cImAgOiAnJztcbn1cblxuZnVuY3Rpb24gYmluZChjb21wb25lbnQsIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW5kZXggPSBjb21wb25lbnQuJCQucHJvcHNbbmFtZV07XG4gICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29tcG9uZW50LiQkLmJvdW5kW2luZGV4XSA9IGNhbGxiYWNrO1xuICAgICAgICBjYWxsYmFjayhjb21wb25lbnQuJCQuY3R4W2luZGV4XSk7XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlX2NvbXBvbmVudChibG9jaykge1xuICAgIGJsb2NrICYmIGJsb2NrLmMoKTtcbn1cbmZ1bmN0aW9uIGNsYWltX2NvbXBvbmVudChibG9jaywgcGFyZW50X25vZGVzKSB7XG4gICAgYmxvY2sgJiYgYmxvY2subChwYXJlbnRfbm9kZXMpO1xufVxuZnVuY3Rpb24gbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgdGFyZ2V0LCBhbmNob3IsIGN1c3RvbUVsZW1lbnQpIHtcbiAgICBjb25zdCB7IGZyYWdtZW50LCBvbl9tb3VudCwgb25fZGVzdHJveSwgYWZ0ZXJfdXBkYXRlIH0gPSBjb21wb25lbnQuJCQ7XG4gICAgZnJhZ21lbnQgJiYgZnJhZ21lbnQubSh0YXJnZXQsIGFuY2hvcik7XG4gICAgaWYgKCFjdXN0b21FbGVtZW50KSB7XG4gICAgICAgIC8vIG9uTW91bnQgaGFwcGVucyBiZWZvcmUgdGhlIGluaXRpYWwgYWZ0ZXJVcGRhdGVcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdfb25fZGVzdHJveSA9IG9uX21vdW50Lm1hcChydW4pLmZpbHRlcihpc19mdW5jdGlvbik7XG4gICAgICAgICAgICBpZiAob25fZGVzdHJveSkge1xuICAgICAgICAgICAgICAgIG9uX2Rlc3Ryb3kucHVzaCguLi5uZXdfb25fZGVzdHJveSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBFZGdlIGNhc2UgLSBjb21wb25lbnQgd2FzIGRlc3Ryb3llZCBpbW1lZGlhdGVseSxcbiAgICAgICAgICAgICAgICAvLyBtb3N0IGxpa2VseSBhcyBhIHJlc3VsdCBvZiBhIGJpbmRpbmcgaW5pdGlhbGlzaW5nXG4gICAgICAgICAgICAgICAgcnVuX2FsbChuZXdfb25fZGVzdHJveSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21wb25lbnQuJCQub25fbW91bnQgPSBbXTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gZGVzdHJveV9jb21wb25lbnQoY29tcG9uZW50LCBkZXRhY2hpbmcpIHtcbiAgICBjb25zdCAkJCA9IGNvbXBvbmVudC4kJDtcbiAgICBpZiAoJCQuZnJhZ21lbnQgIT09IG51bGwpIHtcbiAgICAgICAgcnVuX2FsbCgkJC5vbl9kZXN0cm95KTtcbiAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQuZChkZXRhY2hpbmcpO1xuICAgICAgICAvLyBUT0RPIG51bGwgb3V0IG90aGVyIHJlZnMsIGluY2x1ZGluZyBjb21wb25lbnQuJCQgKGJ1dCBuZWVkIHRvXG4gICAgICAgIC8vIHByZXNlcnZlIGZpbmFsIHN0YXRlPylcbiAgICAgICAgJCQub25fZGVzdHJveSA9ICQkLmZyYWdtZW50ID0gbnVsbDtcbiAgICAgICAgJCQuY3R4ID0gW107XG4gICAgfVxufVxuZnVuY3Rpb24gbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpIHtcbiAgICBpZiAoY29tcG9uZW50LiQkLmRpcnR5WzBdID09PSAtMSkge1xuICAgICAgICBkaXJ0eV9jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgc2NoZWR1bGVfdXBkYXRlKCk7XG4gICAgICAgIGNvbXBvbmVudC4kJC5kaXJ0eS5maWxsKDApO1xuICAgIH1cbiAgICBjb21wb25lbnQuJCQuZGlydHlbKGkgLyAzMSkgfCAwXSB8PSAoMSA8PCAoaSAlIDMxKSk7XG59XG5mdW5jdGlvbiBpbml0KGNvbXBvbmVudCwgb3B0aW9ucywgaW5zdGFuY2UsIGNyZWF0ZV9mcmFnbWVudCwgbm90X2VxdWFsLCBwcm9wcywgYXBwZW5kX3N0eWxlcywgZGlydHkgPSBbLTFdKSB7XG4gICAgY29uc3QgcGFyZW50X2NvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpO1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkID0ge1xuICAgICAgICBmcmFnbWVudDogbnVsbCxcbiAgICAgICAgY3R4OiBudWxsLFxuICAgICAgICAvLyBzdGF0ZVxuICAgICAgICBwcm9wcyxcbiAgICAgICAgdXBkYXRlOiBub29wLFxuICAgICAgICBub3RfZXF1YWwsXG4gICAgICAgIGJvdW5kOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgLy8gbGlmZWN5Y2xlXG4gICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgb25fZGVzdHJveTogW10sXG4gICAgICAgIG9uX2Rpc2Nvbm5lY3Q6IFtdLFxuICAgICAgICBiZWZvcmVfdXBkYXRlOiBbXSxcbiAgICAgICAgYWZ0ZXJfdXBkYXRlOiBbXSxcbiAgICAgICAgY29udGV4dDogbmV3IE1hcChvcHRpb25zLmNvbnRleHQgfHwgKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSkpLFxuICAgICAgICAvLyBldmVyeXRoaW5nIGVsc2VcbiAgICAgICAgY2FsbGJhY2tzOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgZGlydHksXG4gICAgICAgIHNraXBfYm91bmQ6IGZhbHNlLFxuICAgICAgICByb290OiBvcHRpb25zLnRhcmdldCB8fCBwYXJlbnRfY29tcG9uZW50LiQkLnJvb3RcbiAgICB9O1xuICAgIGFwcGVuZF9zdHlsZXMgJiYgYXBwZW5kX3N0eWxlcygkJC5yb290KTtcbiAgICBsZXQgcmVhZHkgPSBmYWxzZTtcbiAgICAkJC5jdHggPSBpbnN0YW5jZVxuICAgICAgICA/IGluc3RhbmNlKGNvbXBvbmVudCwgb3B0aW9ucy5wcm9wcyB8fCB7fSwgKGksIHJldCwgLi4ucmVzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByZXN0Lmxlbmd0aCA/IHJlc3RbMF0gOiByZXQ7XG4gICAgICAgICAgICBpZiAoJCQuY3R4ICYmIG5vdF9lcXVhbCgkJC5jdHhbaV0sICQkLmN0eFtpXSA9IHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghJCQuc2tpcF9ib3VuZCAmJiAkJC5ib3VuZFtpXSlcbiAgICAgICAgICAgICAgICAgICAgJCQuYm91bmRbaV0odmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeSlcbiAgICAgICAgICAgICAgICAgICAgbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSlcbiAgICAgICAgOiBbXTtcbiAgICAkJC51cGRhdGUoKTtcbiAgICByZWFkeSA9IHRydWU7XG4gICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAvLyBgZmFsc2VgIGFzIGEgc3BlY2lhbCBjYXNlIG9mIG5vIERPTSBjb21wb25lbnRcbiAgICAkJC5mcmFnbWVudCA9IGNyZWF0ZV9mcmFnbWVudCA/IGNyZWF0ZV9mcmFnbWVudCgkJC5jdHgpIDogZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmh5ZHJhdGUpIHtcbiAgICAgICAgICAgIHN0YXJ0X2h5ZHJhdGluZygpO1xuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBjaGlsZHJlbihvcHRpb25zLnRhcmdldCk7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQubChub2Rlcyk7XG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKGRldGFjaCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQuYygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmludHJvKVxuICAgICAgICAgICAgdHJhbnNpdGlvbl9pbihjb21wb25lbnQuJCQuZnJhZ21lbnQpO1xuICAgICAgICBtb3VudF9jb21wb25lbnQoY29tcG9uZW50LCBvcHRpb25zLnRhcmdldCwgb3B0aW9ucy5hbmNob3IsIG9wdGlvbnMuY3VzdG9tRWxlbWVudCk7XG4gICAgICAgIGVuZF9oeWRyYXRpbmcoKTtcbiAgICAgICAgZmx1c2goKTtcbiAgICB9XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xufVxubGV0IFN2ZWx0ZUVsZW1lbnQ7XG5pZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgU3ZlbHRlRWxlbWVudCA9IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgb25fbW91bnQgfSA9IHRoaXMuJCQ7XG4gICAgICAgICAgICB0aGlzLiQkLm9uX2Rpc2Nvbm5lY3QgPSBvbl9tb3VudC5tYXAocnVuKS5maWx0ZXIoaXNfZnVuY3Rpb24pO1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBpbXByb3ZlIHR5cGluZ3NcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuJCQuc2xvdHRlZCkge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLiQkLnNsb3R0ZWRba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHIsIF9vbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXNbYXR0cl0gPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIHJ1bl9hbGwodGhpcy4kJC5vbl9kaXNjb25uZWN0KTtcbiAgICAgICAgfVxuICAgICAgICAkZGVzdHJveSgpIHtcbiAgICAgICAgICAgIGRlc3Ryb3lfY29tcG9uZW50KHRoaXMsIDEpO1xuICAgICAgICAgICAgdGhpcy4kZGVzdHJveSA9IG5vb3A7XG4gICAgICAgIH1cbiAgICAgICAgJG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAvLyBUT0RPIHNob3VsZCB0aGlzIGRlbGVnYXRlIHRvIGFkZEV2ZW50TGlzdGVuZXI/XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gfHwgKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdID0gW10pKTtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgICRzZXQoJCRwcm9wcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuJCRzZXQgJiYgIWlzX2VtcHR5KCQkcHJvcHMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kJC5za2lwX2JvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLiQkc2V0KCQkcHJvcHMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgU3ZlbHRlIGNvbXBvbmVudHMuIFVzZWQgd2hlbiBkZXY9ZmFsc2UuXG4gKi9cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudCB7XG4gICAgJGRlc3Ryb3koKSB7XG4gICAgICAgIGRlc3Ryb3lfY29tcG9uZW50KHRoaXMsIDEpO1xuICAgICAgICB0aGlzLiRkZXN0cm95ID0gbm9vcDtcbiAgICB9XG4gICAgJG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSB8fCAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gPSBbXSkpO1xuICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgICRzZXQoJCRwcm9wcykge1xuICAgICAgICBpZiAodGhpcy4kJHNldCAmJiAhaXNfZW1wdHkoJCRwcm9wcykpIHtcbiAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLiQkc2V0KCQkcHJvcHMpO1xuICAgICAgICAgICAgdGhpcy4kJC5za2lwX2JvdW5kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoX2Rldih0eXBlLCBkZXRhaWwpIHtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGN1c3RvbV9ldmVudCh0eXBlLCBPYmplY3QuYXNzaWduKHsgdmVyc2lvbjogJzMuNTAuMScgfSwgZGV0YWlsKSwgeyBidWJibGVzOiB0cnVlIH0pKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9kZXYodGFyZ2V0LCBub2RlKSB7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01JbnNlcnQnLCB7IHRhcmdldCwgbm9kZSB9KTtcbiAgICBhcHBlbmQodGFyZ2V0LCBub2RlKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9oeWRyYXRpb25fZGV2KHRhcmdldCwgbm9kZSkge1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NSW5zZXJ0JywgeyB0YXJnZXQsIG5vZGUgfSk7XG4gICAgYXBwZW5kX2h5ZHJhdGlvbih0YXJnZXQsIG5vZGUpO1xufVxuZnVuY3Rpb24gaW5zZXJ0X2Rldih0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NSW5zZXJ0JywgeyB0YXJnZXQsIG5vZGUsIGFuY2hvciB9KTtcbiAgICBpbnNlcnQodGFyZ2V0LCBub2RlLCBhbmNob3IpO1xufVxuZnVuY3Rpb24gaW5zZXJ0X2h5ZHJhdGlvbl9kZXYodGFyZ2V0LCBub2RlLCBhbmNob3IpIHtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTUluc2VydCcsIHsgdGFyZ2V0LCBub2RlLCBhbmNob3IgfSk7XG4gICAgaW5zZXJ0X2h5ZHJhdGlvbih0YXJnZXQsIG5vZGUsIGFuY2hvcik7XG59XG5mdW5jdGlvbiBkZXRhY2hfZGV2KG5vZGUpIHtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVJlbW92ZScsIHsgbm9kZSB9KTtcbiAgICBkZXRhY2gobm9kZSk7XG59XG5mdW5jdGlvbiBkZXRhY2hfYmV0d2Vlbl9kZXYoYmVmb3JlLCBhZnRlcikge1xuICAgIHdoaWxlIChiZWZvcmUubmV4dFNpYmxpbmcgJiYgYmVmb3JlLm5leHRTaWJsaW5nICE9PSBhZnRlcikge1xuICAgICAgICBkZXRhY2hfZGV2KGJlZm9yZS5uZXh0U2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGV0YWNoX2JlZm9yZV9kZXYoYWZ0ZXIpIHtcbiAgICB3aGlsZSAoYWZ0ZXIucHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYWZ0ZXIucHJldmlvdXNTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRhY2hfYWZ0ZXJfZGV2KGJlZm9yZSkge1xuICAgIHdoaWxlIChiZWZvcmUubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgZGV0YWNoX2RldihiZWZvcmUubmV4dFNpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGxpc3Rlbl9kZXYobm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMsIGhhc19wcmV2ZW50X2RlZmF1bHQsIGhhc19zdG9wX3Byb3BhZ2F0aW9uKSB7XG4gICAgY29uc3QgbW9kaWZpZXJzID0gb3B0aW9ucyA9PT0gdHJ1ZSA/IFsnY2FwdHVyZSddIDogb3B0aW9ucyA/IEFycmF5LmZyb20oT2JqZWN0LmtleXMob3B0aW9ucykpIDogW107XG4gICAgaWYgKGhhc19wcmV2ZW50X2RlZmF1bHQpXG4gICAgICAgIG1vZGlmaWVycy5wdXNoKCdwcmV2ZW50RGVmYXVsdCcpO1xuICAgIGlmIChoYXNfc3RvcF9wcm9wYWdhdGlvbilcbiAgICAgICAgbW9kaWZpZXJzLnB1c2goJ3N0b3BQcm9wYWdhdGlvbicpO1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NQWRkRXZlbnRMaXN0ZW5lcicsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcbiAgICBjb25zdCBkaXNwb3NlID0gbGlzdGVuKG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVJlbW92ZUV2ZW50TGlzdGVuZXInLCB7IG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBtb2RpZmllcnMgfSk7XG4gICAgICAgIGRpc3Bvc2UoKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gYXR0cl9kZXYobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgIGF0dHIobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NUmVtb3ZlQXR0cmlidXRlJywgeyBub2RlLCBhdHRyaWJ1dGUgfSk7XG4gICAgZWxzZVxuICAgICAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVNldEF0dHJpYnV0ZScsIHsgbm9kZSwgYXR0cmlidXRlLCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIHByb3BfZGV2KG5vZGUsIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIG5vZGVbcHJvcGVydHldID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01TZXRQcm9wZXJ0eScsIHsgbm9kZSwgcHJvcGVydHksIHZhbHVlIH0pO1xufVxuZnVuY3Rpb24gZGF0YXNldF9kZXYobm9kZSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgbm9kZS5kYXRhc2V0W3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NU2V0RGF0YXNldCcsIHsgbm9kZSwgcHJvcGVydHksIHZhbHVlIH0pO1xufVxuZnVuY3Rpb24gc2V0X2RhdGFfZGV2KHRleHQsIGRhdGEpIHtcbiAgICBkYXRhID0gJycgKyBkYXRhO1xuICAgIGlmICh0ZXh0Lndob2xlVGV4dCA9PT0gZGF0YSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NU2V0RGF0YScsIHsgbm9kZTogdGV4dCwgZGF0YSB9KTtcbiAgICB0ZXh0LmRhdGEgPSBkYXRhO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfZWFjaF9hcmd1bWVudChhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ3N0cmluZycgJiYgIShhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgJ2xlbmd0aCcgaW4gYXJnKSkge1xuICAgICAgICBsZXQgbXNnID0gJ3sjZWFjaH0gb25seSBpdGVyYXRlcyBvdmVyIGFycmF5LWxpa2Ugb2JqZWN0cy4nO1xuICAgICAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBhcmcgJiYgU3ltYm9sLml0ZXJhdG9yIGluIGFyZykge1xuICAgICAgICAgICAgbXNnICs9ICcgWW91IGNhbiB1c2UgYSBzcHJlYWQgdG8gY29udmVydCB0aGlzIGl0ZXJhYmxlIGludG8gYW4gYXJyYXkuJztcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9zbG90cyhuYW1lLCBzbG90LCBrZXlzKSB7XG4gICAgZm9yIChjb25zdCBzbG90X2tleSBvZiBPYmplY3Qua2V5cyhzbG90KSkge1xuICAgICAgICBpZiAoIX5rZXlzLmluZGV4T2Yoc2xvdF9rZXkpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYDwke25hbWV9PiByZWNlaXZlZCBhbiB1bmV4cGVjdGVkIHNsb3QgXCIke3Nsb3Rfa2V5fVwiLmApO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gdmFsaWRhdGVfZHluYW1pY19lbGVtZW50KHRhZykge1xuICAgIGNvbnN0IGlzX3N0cmluZyA9IHR5cGVvZiB0YWcgPT09ICdzdHJpbmcnO1xuICAgIGlmICh0YWcgJiYgIWlzX3N0cmluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJzxzdmVsdGU6ZWxlbWVudD4gZXhwZWN0cyBcInRoaXNcIiBhdHRyaWJ1dGUgdG8gYmUgYSBzdHJpbmcuJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gdmFsaWRhdGVfdm9pZF9keW5hbWljX2VsZW1lbnQodGFnKSB7XG4gICAgaWYgKHRhZyAmJiBpc192b2lkKHRhZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGA8c3ZlbHRlOmVsZW1lbnQgdGhpcz1cIiR7dGFnfVwiPiBpcyBzZWxmLWNsb3NpbmcgYW5kIGNhbm5vdCBoYXZlIGNvbnRlbnQuYCk7XG4gICAgfVxufVxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBTdmVsdGUgY29tcG9uZW50cyB3aXRoIHNvbWUgbWlub3IgZGV2LWVuaGFuY2VtZW50cy4gVXNlZCB3aGVuIGRldj10cnVlLlxuICovXG5jbGFzcyBTdmVsdGVDb21wb25lbnREZXYgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zIHx8ICghb3B0aW9ucy50YXJnZXQgJiYgIW9wdGlvbnMuJCRpbmxpbmUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIndGFyZ2V0JyBpcyBhIHJlcXVpcmVkIG9wdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlcigpO1xuICAgIH1cbiAgICAkZGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIuJGRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy4kZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQ29tcG9uZW50IHdhcyBhbHJlYWR5IGRlc3Ryb3llZCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgJGNhcHR1cmVfc3RhdGUoKSB7IH1cbiAgICAkaW5qZWN0X3N0YXRlKCkgeyB9XG59XG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gY3JlYXRlIHN0cm9uZ2x5IHR5cGVkIFN2ZWx0ZSBjb21wb25lbnRzLlxuICogVGhpcyBvbmx5IGV4aXN0cyBmb3IgdHlwaW5nIHB1cnBvc2VzIGFuZCBzaG91bGQgYmUgdXNlZCBpbiBgLmQudHNgIGZpbGVzLlxuICpcbiAqICMjIyBFeGFtcGxlOlxuICpcbiAqIFlvdSBoYXZlIGNvbXBvbmVudCBsaWJyYXJ5IG9uIG5wbSBjYWxsZWQgYGNvbXBvbmVudC1saWJyYXJ5YCwgZnJvbSB3aGljaFxuICogeW91IGV4cG9ydCBhIGNvbXBvbmVudCBjYWxsZWQgYE15Q29tcG9uZW50YC4gRm9yIFN2ZWx0ZStUeXBlU2NyaXB0IHVzZXJzLFxuICogeW91IHdhbnQgdG8gcHJvdmlkZSB0eXBpbmdzLiBUaGVyZWZvcmUgeW91IGNyZWF0ZSBhIGBpbmRleC5kLnRzYDpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBTdmVsdGVDb21wb25lbnRUeXBlZCB9IGZyb20gXCJzdmVsdGVcIjtcbiAqIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudCBleHRlbmRzIFN2ZWx0ZUNvbXBvbmVudFR5cGVkPHtmb286IHN0cmluZ30+IHt9XG4gKiBgYGBcbiAqIFR5cGluZyB0aGlzIG1ha2VzIGl0IHBvc3NpYmxlIGZvciBJREVzIGxpa2UgVlMgQ29kZSB3aXRoIHRoZSBTdmVsdGUgZXh0ZW5zaW9uXG4gKiB0byBwcm92aWRlIGludGVsbGlzZW5zZSBhbmQgdG8gdXNlIHRoZSBjb21wb25lbnQgbGlrZSB0aGlzIGluIGEgU3ZlbHRlIGZpbGVcbiAqIHdpdGggVHlwZVNjcmlwdDpcbiAqIGBgYHN2ZWx0ZVxuICogPHNjcmlwdCBsYW5nPVwidHNcIj5cbiAqIFx0aW1wb3J0IHsgTXlDb21wb25lbnQgfSBmcm9tIFwiY29tcG9uZW50LWxpYnJhcnlcIjtcbiAqIDwvc2NyaXB0PlxuICogPE15Q29tcG9uZW50IGZvbz17J2Jhcid9IC8+XG4gKiBgYGBcbiAqXG4gKiAjIyMjIFdoeSBub3QgbWFrZSB0aGlzIHBhcnQgb2YgYFN2ZWx0ZUNvbXBvbmVudChEZXYpYD9cbiAqIEJlY2F1c2VcbiAqIGBgYHRzXG4gKiBjbGFzcyBBU3ViY2xhc3NPZlN2ZWx0ZUNvbXBvbmVudCBleHRlbmRzIFN2ZWx0ZUNvbXBvbmVudDx7Zm9vOiBzdHJpbmd9PiB7fVxuICogY29uc3QgY29tcG9uZW50OiB0eXBlb2YgU3ZlbHRlQ29tcG9uZW50ID0gQVN1YmNsYXNzT2ZTdmVsdGVDb21wb25lbnQ7XG4gKiBgYGBcbiAqIHdpbGwgdGhyb3cgYSB0eXBlIGVycm9yLCBzbyB3ZSBuZWVkIHRvIHNlcGFyYXRlIHRoZSBtb3JlIHN0cmljdGx5IHR5cGVkIGNsYXNzLlxuICovXG5jbGFzcyBTdmVsdGVDb21wb25lbnRUeXBlZCBleHRlbmRzIFN2ZWx0ZUNvbXBvbmVudERldiB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICB9XG59XG5mdW5jdGlvbiBsb29wX2d1YXJkKHRpbWVvdXQpIHtcbiAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKERhdGUubm93KCkgLSBzdGFydCA+IHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5maW5pdGUgbG9vcCBkZXRlY3RlZCcpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IHsgSHRtbFRhZywgSHRtbFRhZ0h5ZHJhdGlvbiwgU3ZlbHRlQ29tcG9uZW50LCBTdmVsdGVDb21wb25lbnREZXYsIFN2ZWx0ZUNvbXBvbmVudFR5cGVkLCBTdmVsdGVFbGVtZW50LCBhY3Rpb25fZGVzdHJveWVyLCBhZGRfYXR0cmlidXRlLCBhZGRfY2xhc3NlcywgYWRkX2ZsdXNoX2NhbGxiYWNrLCBhZGRfbG9jYXRpb24sIGFkZF9yZW5kZXJfY2FsbGJhY2ssIGFkZF9yZXNpemVfbGlzdGVuZXIsIGFkZF9zdHlsZXMsIGFkZF90cmFuc2Zvcm0sIGFmdGVyVXBkYXRlLCBhcHBlbmQsIGFwcGVuZF9kZXYsIGFwcGVuZF9lbXB0eV9zdHlsZXNoZWV0LCBhcHBlbmRfaHlkcmF0aW9uLCBhcHBlbmRfaHlkcmF0aW9uX2RldiwgYXBwZW5kX3N0eWxlcywgYXNzaWduLCBhdHRyLCBhdHRyX2RldiwgYXR0cmlidXRlX3RvX29iamVjdCwgYmVmb3JlVXBkYXRlLCBiaW5kLCBiaW5kaW5nX2NhbGxiYWNrcywgYmxhbmtfb2JqZWN0LCBidWJibGUsIGNoZWNrX291dHJvcywgY2hpbGRyZW4sIGNsYWltX2NvbXBvbmVudCwgY2xhaW1fZWxlbWVudCwgY2xhaW1faHRtbF90YWcsIGNsYWltX3NwYWNlLCBjbGFpbV9zdmdfZWxlbWVudCwgY2xhaW1fdGV4dCwgY2xlYXJfbG9vcHMsIGNvbXBvbmVudF9zdWJzY3JpYmUsIGNvbXB1dGVfcmVzdF9wcm9wcywgY29tcHV0ZV9zbG90cywgY3JlYXRlRXZlbnREaXNwYXRjaGVyLCBjcmVhdGVfYW5pbWF0aW9uLCBjcmVhdGVfYmlkaXJlY3Rpb25hbF90cmFuc2l0aW9uLCBjcmVhdGVfY29tcG9uZW50LCBjcmVhdGVfaW5fdHJhbnNpdGlvbiwgY3JlYXRlX291dF90cmFuc2l0aW9uLCBjcmVhdGVfc2xvdCwgY3JlYXRlX3Nzcl9jb21wb25lbnQsIGN1cnJlbnRfY29tcG9uZW50LCBjdXN0b21fZXZlbnQsIGRhdGFzZXRfZGV2LCBkZWJ1ZywgZGVzdHJveV9ibG9jaywgZGVzdHJveV9jb21wb25lbnQsIGRlc3Ryb3lfZWFjaCwgZGV0YWNoLCBkZXRhY2hfYWZ0ZXJfZGV2LCBkZXRhY2hfYmVmb3JlX2RldiwgZGV0YWNoX2JldHdlZW5fZGV2LCBkZXRhY2hfZGV2LCBkaXJ0eV9jb21wb25lbnRzLCBkaXNwYXRjaF9kZXYsIGVhY2gsIGVsZW1lbnQsIGVsZW1lbnRfaXMsIGVtcHR5LCBlbmRfaHlkcmF0aW5nLCBlc2NhcGUsIGVzY2FwZV9hdHRyaWJ1dGVfdmFsdWUsIGVzY2FwZV9vYmplY3QsIGV4Y2x1ZGVfaW50ZXJuYWxfcHJvcHMsIGZpeF9hbmRfZGVzdHJveV9ibG9jaywgZml4X2FuZF9vdXRyb19hbmRfZGVzdHJveV9ibG9jaywgZml4X3Bvc2l0aW9uLCBmbHVzaCwgZ2V0QWxsQ29udGV4dHMsIGdldENvbnRleHQsIGdldF9hbGxfZGlydHlfZnJvbV9zY29wZSwgZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUsIGdldF9jdXJyZW50X2NvbXBvbmVudCwgZ2V0X2N1c3RvbV9lbGVtZW50c19zbG90cywgZ2V0X3Jvb3RfZm9yX3N0eWxlLCBnZXRfc2xvdF9jaGFuZ2VzLCBnZXRfc3ByZWFkX29iamVjdCwgZ2V0X3NwcmVhZF91cGRhdGUsIGdldF9zdG9yZV92YWx1ZSwgZ2xvYmFscywgZ3JvdXBfb3V0cm9zLCBoYW5kbGVfcHJvbWlzZSwgaGFzQ29udGV4dCwgaGFzX3Byb3AsIGlkZW50aXR5LCBpbml0LCBpbnNlcnQsIGluc2VydF9kZXYsIGluc2VydF9oeWRyYXRpb24sIGluc2VydF9oeWRyYXRpb25fZGV2LCBpbnRyb3MsIGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyLCBpc19jbGllbnQsIGlzX2Nyb3Nzb3JpZ2luLCBpc19lbXB0eSwgaXNfZnVuY3Rpb24sIGlzX3Byb21pc2UsIGlzX3ZvaWQsIGxpc3RlbiwgbGlzdGVuX2RldiwgbG9vcCwgbG9vcF9ndWFyZCwgbWVyZ2Vfc3NyX3N0eWxlcywgbWlzc2luZ19jb21wb25lbnQsIG1vdW50X2NvbXBvbmVudCwgbm9vcCwgbm90X2VxdWFsLCBub3csIG51bGxfdG9fZW1wdHksIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMsIG9uRGVzdHJveSwgb25Nb3VudCwgb25jZSwgb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2ssIHByZXZlbnRfZGVmYXVsdCwgcHJvcF9kZXYsIHF1ZXJ5X3NlbGVjdG9yX2FsbCwgcmFmLCBydW4sIHJ1bl9hbGwsIHNhZmVfbm90X2VxdWFsLCBzY2hlZHVsZV91cGRhdGUsIHNlbGVjdF9tdWx0aXBsZV92YWx1ZSwgc2VsZWN0X29wdGlvbiwgc2VsZWN0X29wdGlvbnMsIHNlbGVjdF92YWx1ZSwgc2VsZiwgc2V0Q29udGV4dCwgc2V0X2F0dHJpYnV0ZXMsIHNldF9jdXJyZW50X2NvbXBvbmVudCwgc2V0X2N1c3RvbV9lbGVtZW50X2RhdGEsIHNldF9kYXRhLCBzZXRfZGF0YV9kZXYsIHNldF9pbnB1dF90eXBlLCBzZXRfaW5wdXRfdmFsdWUsIHNldF9ub3csIHNldF9yYWYsIHNldF9zdG9yZV92YWx1ZSwgc2V0X3N0eWxlLCBzZXRfc3ZnX2F0dHJpYnV0ZXMsIHNwYWNlLCBzcHJlYWQsIHNyY191cmxfZXF1YWwsIHN0YXJ0X2h5ZHJhdGluZywgc3RvcF9wcm9wYWdhdGlvbiwgc3Vic2NyaWJlLCBzdmdfZWxlbWVudCwgdGV4dCwgdGljaywgdGltZV9yYW5nZXNfdG9fYXJyYXksIHRvX251bWJlciwgdG9nZ2xlX2NsYXNzLCB0cmFuc2l0aW9uX2luLCB0cmFuc2l0aW9uX291dCwgdHJ1c3RlZCwgdXBkYXRlX2F3YWl0X2Jsb2NrX2JyYW5jaCwgdXBkYXRlX2tleWVkX2VhY2gsIHVwZGF0ZV9zbG90LCB1cGRhdGVfc2xvdF9iYXNlLCB2YWxpZGF0ZV9jb21wb25lbnQsIHZhbGlkYXRlX2R5bmFtaWNfZWxlbWVudCwgdmFsaWRhdGVfZWFjaF9hcmd1bWVudCwgdmFsaWRhdGVfZWFjaF9rZXlzLCB2YWxpZGF0ZV9zbG90cywgdmFsaWRhdGVfc3RvcmUsIHZhbGlkYXRlX3ZvaWRfZHluYW1pY19lbGVtZW50LCB4bGlua19hdHRyIH07XG4iLCAiaW1wb3J0IHsgbm9vcCwgc2FmZV9ub3RfZXF1YWwsIHN1YnNjcmliZSwgcnVuX2FsbCwgaXNfZnVuY3Rpb24gfSBmcm9tICcuLi9pbnRlcm5hbC9pbmRleC5tanMnO1xuZXhwb3J0IHsgZ2V0X3N0b3JlX3ZhbHVlIGFzIGdldCB9IGZyb20gJy4uL2ludGVybmFsL2luZGV4Lm1qcyc7XG5cbmNvbnN0IHN1YnNjcmliZXJfcXVldWUgPSBbXTtcbi8qKlxuICogQ3JlYXRlcyBhIGBSZWFkYWJsZWAgc3RvcmUgdGhhdCBhbGxvd3MgcmVhZGluZyBieSBzdWJzY3JpcHRpb24uXG4gKiBAcGFyYW0gdmFsdWUgaW5pdGlhbCB2YWx1ZVxuICogQHBhcmFtIHtTdGFydFN0b3BOb3RpZmllcn1zdGFydCBzdGFydCBhbmQgc3RvcCBub3RpZmljYXRpb25zIGZvciBzdWJzY3JpcHRpb25zXG4gKi9cbmZ1bmN0aW9uIHJlYWRhYmxlKHZhbHVlLCBzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN1YnNjcmliZTogd3JpdGFibGUodmFsdWUsIHN0YXJ0KS5zdWJzY3JpYmVcbiAgICB9O1xufVxuLyoqXG4gKiBDcmVhdGUgYSBgV3JpdGFibGVgIHN0b3JlIHRoYXQgYWxsb3dzIGJvdGggdXBkYXRpbmcgYW5kIHJlYWRpbmcgYnkgc3Vic2NyaXB0aW9uLlxuICogQHBhcmFtIHsqPX12YWx1ZSBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyPX1zdGFydCBzdGFydCBhbmQgc3RvcCBub3RpZmljYXRpb25zIGZvciBzdWJzY3JpcHRpb25zXG4gKi9cbmZ1bmN0aW9uIHdyaXRhYmxlKHZhbHVlLCBzdGFydCA9IG5vb3ApIHtcbiAgICBsZXQgc3RvcDtcbiAgICBjb25zdCBzdWJzY3JpYmVycyA9IG5ldyBTZXQoKTtcbiAgICBmdW5jdGlvbiBzZXQobmV3X3ZhbHVlKSB7XG4gICAgICAgIGlmIChzYWZlX25vdF9lcXVhbCh2YWx1ZSwgbmV3X3ZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBuZXdfdmFsdWU7XG4gICAgICAgICAgICBpZiAoc3RvcCkgeyAvLyBzdG9yZSBpcyByZWFkeVxuICAgICAgICAgICAgICAgIGNvbnN0IHJ1bl9xdWV1ZSA9ICFzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN1YnNjcmliZXIgb2Ygc3Vic2NyaWJlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlclsxXSgpO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlLnB1c2goc3Vic2NyaWJlciwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocnVuX3F1ZXVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcl9xdWV1ZVtpXVswXShzdWJzY3JpYmVyX3F1ZXVlW2kgKyAxXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGUoZm4pIHtcbiAgICAgICAgc2V0KGZuKHZhbHVlKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZShydW4sIGludmFsaWRhdGUgPSBub29wKSB7XG4gICAgICAgIGNvbnN0IHN1YnNjcmliZXIgPSBbcnVuLCBpbnZhbGlkYXRlXTtcbiAgICAgICAgc3Vic2NyaWJlcnMuYWRkKHN1YnNjcmliZXIpO1xuICAgICAgICBpZiAoc3Vic2NyaWJlcnMuc2l6ZSA9PT0gMSkge1xuICAgICAgICAgICAgc3RvcCA9IHN0YXJ0KHNldCkgfHwgbm9vcDtcbiAgICAgICAgfVxuICAgICAgICBydW4odmFsdWUpO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgc3Vic2NyaWJlcnMuZGVsZXRlKHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXJzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgICAgICAgICAgc3RvcCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7IHNldCwgdXBkYXRlLCBzdWJzY3JpYmUgfTtcbn1cbmZ1bmN0aW9uIGRlcml2ZWQoc3RvcmVzLCBmbiwgaW5pdGlhbF92YWx1ZSkge1xuICAgIGNvbnN0IHNpbmdsZSA9ICFBcnJheS5pc0FycmF5KHN0b3Jlcyk7XG4gICAgY29uc3Qgc3RvcmVzX2FycmF5ID0gc2luZ2xlXG4gICAgICAgID8gW3N0b3Jlc11cbiAgICAgICAgOiBzdG9yZXM7XG4gICAgY29uc3QgYXV0byA9IGZuLmxlbmd0aCA8IDI7XG4gICAgcmV0dXJuIHJlYWRhYmxlKGluaXRpYWxfdmFsdWUsIChzZXQpID0+IHtcbiAgICAgICAgbGV0IGluaXRlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgbGV0IHBlbmRpbmcgPSAwO1xuICAgICAgICBsZXQgY2xlYW51cCA9IG5vb3A7XG4gICAgICAgIGNvbnN0IHN5bmMgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAocGVuZGluZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZuKHNpbmdsZSA/IHZhbHVlc1swXSA6IHZhbHVlcywgc2V0KTtcbiAgICAgICAgICAgIGlmIChhdXRvKSB7XG4gICAgICAgICAgICAgICAgc2V0KHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGVhbnVwID0gaXNfZnVuY3Rpb24ocmVzdWx0KSA/IHJlc3VsdCA6IG5vb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVuc3Vic2NyaWJlcnMgPSBzdG9yZXNfYXJyYXkubWFwKChzdG9yZSwgaSkgPT4gc3Vic2NyaWJlKHN0b3JlLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZhbHVlc1tpXSA9IHZhbHVlO1xuICAgICAgICAgICAgcGVuZGluZyAmPSB+KDEgPDwgaSk7XG4gICAgICAgICAgICBpZiAoaW5pdGVkKSB7XG4gICAgICAgICAgICAgICAgc3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBwZW5kaW5nIHw9ICgxIDw8IGkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGluaXRlZCA9IHRydWU7XG4gICAgICAgIHN5bmMoKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICBydW5fYWxsKHVuc3Vic2NyaWJlcnMpO1xuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBkZXJpdmVkLCByZWFkYWJsZSwgd3JpdGFibGUgfTtcbiIsICJ2YXIgX19jcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIF9fZ2V0UHJvdG9PZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciBfX2hhc093blByb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIF9fbWFya0FzTW9kdWxlID0gKHRhcmdldCkgPT4gX19kZWZQcm9wKHRhcmdldCwgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgX19jb21tb25KUyA9IChjYiwgbW9kKSA9PiBmdW5jdGlvbiBfX3JlcXVpcmUoKSB7XG4gIHJldHVybiBtb2QgfHwgKDAsIGNiW09iamVjdC5rZXlzKGNiKVswXV0pKChtb2QgPSB7IGV4cG9ydHM6IHt9IH0pLmV4cG9ydHMsIG1vZCksIG1vZC5leHBvcnRzO1xufTtcbnZhciBfX3JlRXhwb3J0ID0gKHRhcmdldCwgbW9kdWxlLCBkZXNjKSA9PiB7XG4gIGlmIChtb2R1bGUgJiYgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbW9kdWxlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMobW9kdWxlKSlcbiAgICAgIGlmICghX19oYXNPd25Qcm9wLmNhbGwodGFyZ2V0LCBrZXkpICYmIGtleSAhPT0gXCJkZWZhdWx0XCIpXG4gICAgICAgIF9fZGVmUHJvcCh0YXJnZXQsIGtleSwgeyBnZXQ6ICgpID0+IG1vZHVsZVtrZXldLCBlbnVtZXJhYmxlOiAhKGRlc2MgPSBfX2dldE93blByb3BEZXNjKG1vZHVsZSwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59O1xudmFyIF9fdG9Nb2R1bGUgPSAobW9kdWxlKSA9PiB7XG4gIHJldHVybiBfX3JlRXhwb3J0KF9fbWFya0FzTW9kdWxlKF9fZGVmUHJvcChtb2R1bGUgIT0gbnVsbCA/IF9fY3JlYXRlKF9fZ2V0UHJvdG9PZihtb2R1bGUpKSA6IHt9LCBcImRlZmF1bHRcIiwgbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlICYmIFwiZGVmYXVsdFwiIGluIG1vZHVsZSA/IHsgZ2V0OiAoKSA9PiBtb2R1bGUuZGVmYXVsdCwgZW51bWVyYWJsZTogdHJ1ZSB9IDogeyB2YWx1ZTogbW9kdWxlLCBlbnVtZXJhYmxlOiB0cnVlIH0pKSwgbW9kdWxlKTtcbn07XG5cbi8vIG5vZGVfbW9kdWxlcy9zdHJpY3QtdXJpLWVuY29kZS9pbmRleC5qc1xudmFyIHJlcXVpcmVfc3RyaWN0X3VyaV9lbmNvZGUgPSBfX2NvbW1vbkpTKHtcbiAgXCJub2RlX21vZHVsZXMvc3RyaWN0LXVyaS1lbmNvZGUvaW5kZXguanNcIihleHBvcnRzLCBtb2R1bGUpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IChzdHIpID0+IGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpKl0vZywgKHgpID0+IGAlJHt4LmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9YCk7XG4gIH1cbn0pO1xuXG4vLyBub2RlX21vZHVsZXMvZGVjb2RlLXVyaS1jb21wb25lbnQvaW5kZXguanNcbnZhciByZXF1aXJlX2RlY29kZV91cmlfY29tcG9uZW50ID0gX19jb21tb25KUyh7XG4gIFwibm9kZV9tb2R1bGVzL2RlY29kZS11cmktY29tcG9uZW50L2luZGV4LmpzXCIoZXhwb3J0cywgbW9kdWxlKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHRva2VuID0gXCIlW2EtZjAtOV17Mn1cIjtcbiAgICB2YXIgc2luZ2xlTWF0Y2hlciA9IG5ldyBSZWdFeHAodG9rZW4sIFwiZ2lcIik7XG4gICAgdmFyIG11bHRpTWF0Y2hlciA9IG5ldyBSZWdFeHAoXCIoXCIgKyB0b2tlbiArIFwiKStcIiwgXCJnaVwiKTtcbiAgICBmdW5jdGlvbiBkZWNvZGVDb21wb25lbnRzKGNvbXBvbmVudHMsIHNwbGl0KSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGNvbXBvbmVudHMuam9pbihcIlwiKSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIH1cbiAgICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50cztcbiAgICAgIH1cbiAgICAgIHNwbGl0ID0gc3BsaXQgfHwgMTtcbiAgICAgIHZhciBsZWZ0ID0gY29tcG9uZW50cy5zbGljZSgwLCBzcGxpdCk7XG4gICAgICB2YXIgcmlnaHQgPSBjb21wb25lbnRzLnNsaWNlKHNwbGl0KTtcbiAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmNhbGwoW10sIGRlY29kZUNvbXBvbmVudHMobGVmdCksIGRlY29kZUNvbXBvbmVudHMocmlnaHQpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGlucHV0KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB2YXIgdG9rZW5zID0gaW5wdXQubWF0Y2goc2luZ2xlTWF0Y2hlcik7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaW5wdXQgPSBkZWNvZGVDb21wb25lbnRzKHRva2VucywgaSkuam9pbihcIlwiKTtcbiAgICAgICAgICB0b2tlbnMgPSBpbnB1dC5tYXRjaChzaW5nbGVNYXRjaGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGN1c3RvbURlY29kZVVSSUNvbXBvbmVudChpbnB1dCkge1xuICAgICAgdmFyIHJlcGxhY2VNYXAgPSB7XG4gICAgICAgIFwiJUZFJUZGXCI6IFwiXFx1RkZGRFxcdUZGRkRcIixcbiAgICAgICAgXCIlRkYlRkVcIjogXCJcXHVGRkZEXFx1RkZGRFwiXG4gICAgICB9O1xuICAgICAgdmFyIG1hdGNoID0gbXVsdGlNYXRjaGVyLmV4ZWMoaW5wdXQpO1xuICAgICAgd2hpbGUgKG1hdGNoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVwbGFjZU1hcFttYXRjaFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMF0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gZGVjb2RlKG1hdGNoWzBdKTtcbiAgICAgICAgICBpZiAocmVzdWx0ICE9PSBtYXRjaFswXSkge1xuICAgICAgICAgICAgcmVwbGFjZU1hcFttYXRjaFswXV0gPSByZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1hdGNoID0gbXVsdGlNYXRjaGVyLmV4ZWMoaW5wdXQpO1xuICAgICAgfVxuICAgICAgcmVwbGFjZU1hcFtcIiVDMlwiXSA9IFwiXFx1RkZGRFwiO1xuICAgICAgdmFyIGVudHJpZXMgPSBPYmplY3Qua2V5cyhyZXBsYWNlTWFwKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIga2V5ID0gZW50cmllc1tpXTtcbiAgICAgICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKG5ldyBSZWdFeHAoa2V5LCBcImdcIiksIHJlcGxhY2VNYXBba2V5XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZW5jb2RlZFVSSSkge1xuICAgICAgaWYgKHR5cGVvZiBlbmNvZGVkVVJJICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBgZW5jb2RlZFVSSWAgdG8gYmUgb2YgdHlwZSBgc3RyaW5nYCwgZ290IGBcIiArIHR5cGVvZiBlbmNvZGVkVVJJICsgXCJgXCIpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgZW5jb2RlZFVSSSA9IGVuY29kZWRVUkkucmVwbGFjZSgvXFwrL2csIFwiIFwiKTtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVkVVJJKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXR1cm4gY3VzdG9tRGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZWRVUkkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pO1xuXG4vLyBub2RlX21vZHVsZXMvc3BsaXQtb24tZmlyc3QvaW5kZXguanNcbnZhciByZXF1aXJlX3NwbGl0X29uX2ZpcnN0ID0gX19jb21tb25KUyh7XG4gIFwibm9kZV9tb2R1bGVzL3NwbGl0LW9uLWZpcnN0L2luZGV4LmpzXCIoZXhwb3J0cywgbW9kdWxlKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSAoc3RyaW5nLCBzZXBhcmF0b3IpID0+IHtcbiAgICAgIGlmICghKHR5cGVvZiBzdHJpbmcgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHNlcGFyYXRvciA9PT0gXCJzdHJpbmdcIikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIHRoZSBhcmd1bWVudHMgdG8gYmUgb2YgdHlwZSBgc3RyaW5nYFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChzZXBhcmF0b3IgPT09IFwiXCIpIHtcbiAgICAgICAgcmV0dXJuIFtzdHJpbmddO1xuICAgICAgfVxuICAgICAgY29uc3Qgc2VwYXJhdG9ySW5kZXggPSBzdHJpbmcuaW5kZXhPZihzZXBhcmF0b3IpO1xuICAgICAgaWYgKHNlcGFyYXRvckluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gW3N0cmluZ107XG4gICAgICB9XG4gICAgICByZXR1cm4gW1xuICAgICAgICBzdHJpbmcuc2xpY2UoMCwgc2VwYXJhdG9ySW5kZXgpLFxuICAgICAgICBzdHJpbmcuc2xpY2Uoc2VwYXJhdG9ySW5kZXggKyBzZXBhcmF0b3IubGVuZ3RoKVxuICAgICAgXTtcbiAgICB9O1xuICB9XG59KTtcblxuLy8gbm9kZV9tb2R1bGVzL3F1ZXJ5LXN0cmluZy9pbmRleC5qc1xudmFyIHJlcXVpcmVfcXVlcnlfc3RyaW5nID0gX19jb21tb25KUyh7XG4gIFwibm9kZV9tb2R1bGVzL3F1ZXJ5LXN0cmluZy9pbmRleC5qc1wiKGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgc3RyaWN0VXJpRW5jb2RlID0gcmVxdWlyZV9zdHJpY3RfdXJpX2VuY29kZSgpO1xuICAgIHZhciBkZWNvZGVDb21wb25lbnQgPSByZXF1aXJlX2RlY29kZV91cmlfY29tcG9uZW50KCk7XG4gICAgdmFyIHNwbGl0T25GaXJzdCA9IHJlcXVpcmVfc3BsaXRfb25fZmlyc3QoKTtcbiAgICBmdW5jdGlvbiBlbmNvZGVyRm9yQXJyYXlGb3JtYXQob3B0aW9ucykge1xuICAgICAgc3dpdGNoIChvcHRpb25zLmFycmF5Rm9ybWF0KSB7XG4gICAgICAgIGNhc2UgXCJpbmRleFwiOlxuICAgICAgICAgIHJldHVybiAoa2V5KSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSByZXN1bHQubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCBcIltcIiwgaW5kZXgsIFwiXVwiXS5qb2luKFwiXCIpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIC4uLnJlc3VsdCxcbiAgICAgICAgICAgICAgW2VuY29kZShrZXksIG9wdGlvbnMpLCBcIltcIiwgZW5jb2RlKGluZGV4LCBvcHRpb25zKSwgXCJdPVwiLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKFwiXCIpXG4gICAgICAgICAgICBdO1xuICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgXCJicmFja2V0XCI6XG4gICAgICAgICAgcmV0dXJuIChrZXkpID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksIFwiW11cIl0uam9pbihcIlwiKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCBcIltdPVwiLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKFwiXCIpXTtcbiAgICAgICAgICB9O1xuICAgICAgICBjYXNlIFwiY29tbWFcIjpcbiAgICAgICAgICByZXR1cm4gKGtleSkgPT4gKHJlc3VsdCwgdmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHZvaWQgMCB8fCB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICByZXR1cm4gW1tlbmNvZGUoa2V5LCBvcHRpb25zKSwgXCI9XCIsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oXCJcIildO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtbcmVzdWx0LCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKFwiLFwiKV07XG4gICAgICAgICAgfTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gKGtleSkgPT4gKHJlc3VsdCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFsuLi5yZXN1bHQsIGVuY29kZShrZXksIG9wdGlvbnMpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksIFwiPVwiLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKFwiXCIpXTtcbiAgICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKSB7XG4gICAgICBsZXQgcmVzdWx0O1xuICAgICAgc3dpdGNoIChvcHRpb25zLmFycmF5Rm9ybWF0KSB7XG4gICAgICAgIGNhc2UgXCJpbmRleFwiOlxuICAgICAgICAgIHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IC9cXFsoXFxkKilcXF0kLy5leGVjKGtleSk7XG4gICAgICAgICAgICBrZXkgPSBrZXkucmVwbGFjZSgvXFxbXFxkKlxcXSQvLCBcIlwiKTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBhY2N1bXVsYXRvcltrZXldID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY2N1bXVsYXRvcltrZXldW3Jlc3VsdFsxXV0gPSB2YWx1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICBjYXNlIFwiYnJhY2tldFwiOlxuICAgICAgICAgIHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IC8oXFxbXFxdKSQvLmV4ZWMoa2V5KTtcbiAgICAgICAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9cXFtcXF0kLywgXCJcIik7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICBhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhY2N1bXVsYXRvcltrZXldID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgYWNjdW11bGF0b3Jba2V5XSA9IFt2YWx1ZV07XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgXCJjb21tYVwiOlxuICAgICAgICAgIHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzQXJyYXkgPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUuc3BsaXQoXCJcIikuaW5kZXhPZihcIixcIikgPiAtMTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gaXNBcnJheSA/IHZhbHVlLnNwbGl0KFwiLFwiKSA6IHZhbHVlO1xuICAgICAgICAgICAgYWNjdW11bGF0b3Jba2V5XSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuICAgICAgICAgICAgaWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuICAgICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVuY29kZSh2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMuZW5jb2RlKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnN0cmljdCA/IHN0cmljdFVyaUVuY29kZSh2YWx1ZSkgOiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zLmRlY29kZSkge1xuICAgICAgICByZXR1cm4gZGVjb2RlQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24ga2V5c1NvcnRlcihpbnB1dCkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICAgIHJldHVybiBpbnB1dC5zb3J0KCk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGlucHV0ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBrZXlzU29ydGVyKE9iamVjdC5rZXlzKGlucHV0KSkuc29ydCgoYSwgYikgPT4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpKS5tYXAoKGtleSkgPT4gaW5wdXRba2V5XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZUhhc2goaW5wdXQpIHtcbiAgICAgIGNvbnN0IGhhc2hTdGFydCA9IGlucHV0LmluZGV4T2YoXCIjXCIpO1xuICAgICAgaWYgKGhhc2hTdGFydCAhPT0gLTEpIHtcbiAgICAgICAgaW5wdXQgPSBpbnB1dC5zbGljZSgwLCBoYXNoU3RhcnQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBleHRyYWN0KGlucHV0KSB7XG4gICAgICBpbnB1dCA9IHJlbW92ZUhhc2goaW5wdXQpO1xuICAgICAgY29uc3QgcXVlcnlTdGFydCA9IGlucHV0LmluZGV4T2YoXCI/XCIpO1xuICAgICAgaWYgKHF1ZXJ5U3RhcnQgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0LnNsaWNlKHF1ZXJ5U3RhcnQgKyAxKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMucGFyc2VOdW1iZXJzICYmICFOdW1iZXIuaXNOYU4oTnVtYmVyKHZhbHVlKSkgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS50cmltKCkgIT09IFwiXCIpKSB7XG4gICAgICAgIHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5wYXJzZUJvb2xlYW5zICYmIHZhbHVlICE9PSBudWxsICYmICh2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSBcInRydWVcIiB8fCB2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSBcImZhbHNlXCIpKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gXCJ0cnVlXCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlMihpbnB1dCwgb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBkZWNvZGU6IHRydWUsXG4gICAgICAgIHNvcnQ6IHRydWUsXG4gICAgICAgIGFycmF5Rm9ybWF0OiBcIm5vbmVcIixcbiAgICAgICAgcGFyc2VOdW1iZXJzOiBmYWxzZSxcbiAgICAgICAgcGFyc2VCb29sZWFuczogZmFsc2VcbiAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgY29uc3QgZm9ybWF0dGVyID0gcGFyc2VyRm9yQXJyYXlGb3JtYXQob3B0aW9ucyk7XG4gICAgICBjb25zdCByZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgICAgaW5wdXQgPSBpbnB1dC50cmltKCkucmVwbGFjZSgvXls/IyZdLywgXCJcIik7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIGlucHV0LnNwbGl0KFwiJlwiKSkge1xuICAgICAgICBsZXQgW2tleSwgdmFsdWVdID0gc3BsaXRPbkZpcnN0KHBhcmFtLnJlcGxhY2UoL1xcKy9nLCBcIiBcIiksIFwiPVwiKTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gdm9pZCAwID8gbnVsbCA6IGRlY29kZSh2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgIGZvcm1hdHRlcihkZWNvZGUoa2V5LCBvcHRpb25zKSwgdmFsdWUsIHJldCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZXQpKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcmV0W2tleV07XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGsgb2YgT2JqZWN0LmtleXModmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZVtrXSA9IHBhcnNlVmFsdWUodmFsdWVba10sIG9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXRba2V5XSA9IHBhcnNlVmFsdWUodmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5zb3J0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIChvcHRpb25zLnNvcnQgPT09IHRydWUgPyBPYmplY3Qua2V5cyhyZXQpLnNvcnQoKSA6IE9iamVjdC5rZXlzKHJldCkuc29ydChvcHRpb25zLnNvcnQpKS5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcmV0W2tleV07XG4gICAgICAgIGlmIChCb29sZWFuKHZhbHVlKSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSBrZXlzU29ydGVyKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LCBPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAgICB9XG4gICAgZXhwb3J0cy5leHRyYWN0ID0gZXh0cmFjdDtcbiAgICBleHBvcnRzLnBhcnNlID0gcGFyc2UyO1xuICAgIGV4cG9ydHMuc3RyaW5naWZ5ID0gKG9iamVjdCwgb3B0aW9ucykgPT4ge1xuICAgICAgaWYgKCFvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICB9XG4gICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGVuY29kZTogdHJ1ZSxcbiAgICAgICAgc3RyaWN0OiB0cnVlLFxuICAgICAgICBhcnJheUZvcm1hdDogXCJub25lXCJcbiAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgY29uc3QgZm9ybWF0dGVyID0gZW5jb2RlckZvckFycmF5Rm9ybWF0KG9wdGlvbnMpO1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG4gICAgICBpZiAob3B0aW9ucy5zb3J0ICE9PSBmYWxzZSkge1xuICAgICAgICBrZXlzLnNvcnQob3B0aW9ucy5zb3J0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gb2JqZWN0W2tleV07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGVuY29kZShrZXksIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZS5yZWR1Y2UoZm9ybWF0dGVyKGtleSksIFtdKS5qb2luKFwiJlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW5jb2RlKGtleSwgb3B0aW9ucykgKyBcIj1cIiArIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICB9KS5maWx0ZXIoKHgpID0+IHgubGVuZ3RoID4gMCkuam9pbihcIiZcIik7XG4gICAgfTtcbiAgICBleHBvcnRzLnBhcnNlVXJsID0gKGlucHV0LCBvcHRpb25zKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1cmw6IHJlbW92ZUhhc2goaW5wdXQpLnNwbGl0KFwiP1wiKVswXSB8fCBcIlwiLFxuICAgICAgICBxdWVyeTogcGFyc2UyKGV4dHJhY3QoaW5wdXQpLCBvcHRpb25zKVxuICAgICAgfTtcbiAgICB9O1xuICB9XG59KTtcblxuLy8gbm9kZV9tb2R1bGVzL2Fic3RyYWN0LW5lc3RlZC1yb3V0ZXIvZGlzdC9pbmRleC5qc1xudmFyIHJlcXVpcmVfZGlzdCA9IF9fY29tbW9uSlMoe1xuICBcIm5vZGVfbW9kdWxlcy9hYnN0cmFjdC1uZXN0ZWQtcm91dGVyL2Rpc3QvaW5kZXguanNcIihleHBvcnRzLCBtb2R1bGUpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgZGVmYXVsdEV4cG9ydCA9IC8qIEBfX1BVUkVfXyAqLyBmdW5jdGlvbihFcnJvcjIpIHtcbiAgICAgIGZ1bmN0aW9uIGRlZmF1bHRFeHBvcnQyKHJvdXRlLCBwYXRoKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gXCJVbnJlYWNoYWJsZSAnXCIgKyAocm91dGUgIT09IFwiL1wiID8gcm91dGUucmVwbGFjZSgvXFwvJC8sIFwiXCIpIDogcm91dGUpICsgXCInLCBzZWdtZW50ICdcIiArIHBhdGggKyBcIicgaXMgbm90IGRlZmluZWRcIjtcbiAgICAgICAgRXJyb3IyLmNhbGwodGhpcywgbWVzc2FnZSk7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMucm91dGUgPSByb3V0ZTtcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgIH1cbiAgICAgIGlmIChFcnJvcjIpXG4gICAgICAgIGRlZmF1bHRFeHBvcnQyLl9fcHJvdG9fXyA9IEVycm9yMjtcbiAgICAgIGRlZmF1bHRFeHBvcnQyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IyICYmIEVycm9yMi5wcm90b3R5cGUpO1xuICAgICAgZGVmYXVsdEV4cG9ydDIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gZGVmYXVsdEV4cG9ydDI7XG4gICAgICByZXR1cm4gZGVmYXVsdEV4cG9ydDI7XG4gICAgfShFcnJvcik7XG4gICAgZnVuY3Rpb24gYnVpbGRNYXRjaGVyKHBhdGgsIHBhcmVudCkge1xuICAgICAgdmFyIHJlZ2V4O1xuICAgICAgdmFyIF9pc1NwbGF0O1xuICAgICAgdmFyIF9wcmlvcml0eSA9IC0xMDA7XG4gICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgcmVnZXggPSBwYXRoLnJlcGxhY2UoL1stJC5dL2csIFwiXFxcXCQmXCIpLnJlcGxhY2UoL1xcKC9nLCBcIig/OlwiKS5yZXBsYWNlKC9cXCkvZywgXCIpP1wiKS5yZXBsYWNlKC8oWzoqXVxcdyspKD86PChbXjw+XSs/KT4pPy9nLCBmdW5jdGlvbihfLCBrZXksIGV4cHIpIHtcbiAgICAgICAga2V5cy5wdXNoKGtleS5zdWJzdHIoMSkpO1xuICAgICAgICBpZiAoa2V5LmNoYXJBdCgpID09PSBcIjpcIikge1xuICAgICAgICAgIF9wcmlvcml0eSArPSAxMDA7XG4gICAgICAgICAgcmV0dXJuIFwiKCg/ISMpXCIgKyAoZXhwciB8fCBcIlteIy9dKz9cIikgKyBcIilcIjtcbiAgICAgICAgfVxuICAgICAgICBfaXNTcGxhdCA9IHRydWU7XG4gICAgICAgIF9wcmlvcml0eSArPSA1MDA7XG4gICAgICAgIHJldHVybiBcIigoPyEjKVwiICsgKGV4cHIgfHwgXCJbXiNdKz9cIikgKyBcIilcIjtcbiAgICAgIH0pO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVnZXggPSBuZXcgUmVnRXhwKFwiXlwiICsgcmVnZXggKyBcIiRcIik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIHJvdXRlIGV4cHJlc3Npb24sIGdpdmVuICdcIiArIHBhcmVudCArIFwiJ1wiKTtcbiAgICAgIH1cbiAgICAgIHZhciBfaGFzaGVkID0gcGF0aC5pbmNsdWRlcyhcIiNcIikgPyAwLjUgOiAxO1xuICAgICAgdmFyIF9kZXB0aCA9IHBhdGgubGVuZ3RoICogX3ByaW9yaXR5ICogX2hhc2hlZDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleXMsXG4gICAgICAgIHJlZ2V4LFxuICAgICAgICBfZGVwdGgsXG4gICAgICAgIF9pc1NwbGF0XG4gICAgICB9O1xuICAgIH1cbiAgICB2YXIgUGF0aE1hdGNoZXIgPSBmdW5jdGlvbiBQYXRoTWF0Y2hlcjIocGF0aCwgcGFyZW50KSB7XG4gICAgICB2YXIgcmVmID0gYnVpbGRNYXRjaGVyKHBhdGgsIHBhcmVudCk7XG4gICAgICB2YXIga2V5cyA9IHJlZi5rZXlzO1xuICAgICAgdmFyIHJlZ2V4ID0gcmVmLnJlZ2V4O1xuICAgICAgdmFyIF9kZXB0aCA9IHJlZi5fZGVwdGg7XG4gICAgICB2YXIgX2lzU3BsYXQgPSByZWYuX2lzU3BsYXQ7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBfaXNTcGxhdCxcbiAgICAgICAgX2RlcHRoLFxuICAgICAgICBtYXRjaDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2hlcyA9IHZhbHVlLm1hdGNoKHJlZ2V4KTtcbiAgICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuIGtleXMucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1ciwgaSkge1xuICAgICAgICAgICAgICBwcmV2W2N1cl0gPSB0eXBlb2YgbWF0Y2hlc1tpICsgMV0gPT09IFwic3RyaW5nXCIgPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hlc1tpICsgMV0pIDogbnVsbDtcbiAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgUGF0aE1hdGNoZXIucHVzaCA9IGZ1bmN0aW9uIHB1c2goa2V5LCBwcmV2LCBsZWFmLCBwYXJlbnQpIHtcbiAgICAgIHZhciByb290ID0gcHJldltrZXldIHx8IChwcmV2W2tleV0gPSB7fSk7XG4gICAgICBpZiAoIXJvb3QucGF0dGVybikge1xuICAgICAgICByb290LnBhdHRlcm4gPSBuZXcgUGF0aE1hdGNoZXIoa2V5LCBwYXJlbnQpO1xuICAgICAgICByb290LnJvdXRlID0gKGxlYWYgfHwgXCJcIikucmVwbGFjZSgvXFwvJC8sIFwiXCIpIHx8IFwiL1wiO1xuICAgICAgfVxuICAgICAgcHJldi5rZXlzID0gcHJldi5rZXlzIHx8IFtdO1xuICAgICAgaWYgKCFwcmV2LmtleXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICBwcmV2LmtleXMucHVzaChrZXkpO1xuICAgICAgICBQYXRoTWF0Y2hlci5zb3J0KHByZXYpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfTtcbiAgICBQYXRoTWF0Y2hlci5zb3J0ID0gZnVuY3Rpb24gc29ydChyb290KSB7XG4gICAgICByb290LmtleXMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiByb290W2FdLnBhdHRlcm4uX2RlcHRoIC0gcm9vdFtiXS5wYXR0ZXJuLl9kZXB0aDtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgZnVuY3Rpb24gbWVyZ2UocGF0aCwgcGFyZW50KSB7XG4gICAgICByZXR1cm4gXCJcIiArIChwYXJlbnQgJiYgcGFyZW50ICE9PSBcIi9cIiA/IHBhcmVudCA6IFwiXCIpICsgKHBhdGggfHwgXCJcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHdhbGsocGF0aCwgY2IpIHtcbiAgICAgIHZhciBtYXRjaGVzID0gcGF0aC5tYXRjaCgvPFtePD5dKlxcL1tePD5dKj4vKTtcbiAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJSZWdFeHAgY2Fubm90IGNvbnRhaW4gc2xhc2hlcywgZ2l2ZW4gJ1wiICsgbWF0Y2hlcyArIFwiJ1wiKTtcbiAgICAgIH1cbiAgICAgIHZhciBwYXJ0cyA9IHBhdGguc3BsaXQoLyg/PVxcL3wjKS8pO1xuICAgICAgdmFyIHJvb3QgPSBbXTtcbiAgICAgIGlmIChwYXJ0c1swXSAhPT0gXCIvXCIpIHtcbiAgICAgICAgcGFydHMudW5zaGlmdChcIi9cIik7XG4gICAgICB9XG4gICAgICBwYXJ0cy5zb21lKGZ1bmN0aW9uKHgsIGkpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHJvb3Quc2xpY2UoMSkuY29uY2F0KHgpLmpvaW4oXCJcIikgfHwgbnVsbDtcbiAgICAgICAgdmFyIHNlZ21lbnQgPSBwYXJ0cy5zbGljZShpICsgMSkuam9pbihcIlwiKSB8fCBudWxsO1xuICAgICAgICB2YXIgcmV0dmFsID0gY2IoeCwgcGFyZW50LCBzZWdtZW50ID8gXCJcIiArICh4ICE9PSBcIi9cIiA/IHggOiBcIlwiKSArIHNlZ21lbnQgOiBudWxsKTtcbiAgICAgICAgcm9vdC5wdXNoKHgpO1xuICAgICAgICByZXR1cm4gcmV0dmFsO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlZHVjZShrZXksIHJvb3QsIF9zZWVuKSB7XG4gICAgICB2YXIgcGFyYW1zID0ge307XG4gICAgICB2YXIgb3V0ID0gW107XG4gICAgICB2YXIgc3BsYXQ7XG4gICAgICB3YWxrKGtleSwgZnVuY3Rpb24oeCwgbGVhZiwgZXh0cmEpIHtcbiAgICAgICAgdmFyIGZvdW5kO1xuICAgICAgICBpZiAoIXJvb3Qua2V5cykge1xuICAgICAgICAgIHRocm93IG5ldyBkZWZhdWx0RXhwb3J0KGtleSwgeCk7XG4gICAgICAgIH1cbiAgICAgICAgcm9vdC5rZXlzLnNvbWUoZnVuY3Rpb24oaykge1xuICAgICAgICAgIGlmIChfc2Vlbi5pbmNsdWRlcyhrKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgcmVmID0gcm9vdFtrXS5wYXR0ZXJuO1xuICAgICAgICAgIHZhciBtYXRjaCA9IHJlZi5tYXRjaDtcbiAgICAgICAgICB2YXIgX2lzU3BsYXQgPSByZWYuX2lzU3BsYXQ7XG4gICAgICAgICAgdmFyIG1hdGNoZXMgPSBtYXRjaChfaXNTcGxhdCA/IGV4dHJhIHx8IHggOiB4KTtcbiAgICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwYXJhbXMsIG1hdGNoZXMpO1xuICAgICAgICAgICAgaWYgKHJvb3Rba10ucm91dGUpIHtcbiAgICAgICAgICAgICAgdmFyIHJvdXRlSW5mbyA9IE9iamVjdC5hc3NpZ24oe30sIHJvb3Rba10uaW5mbyk7XG4gICAgICAgICAgICAgIHZhciBoYXNNYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAocm91dGVJbmZvLmV4YWN0KSB7XG4gICAgICAgICAgICAgICAgaGFzTWF0Y2ggPSBleHRyYSA9PT0gbnVsbDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoYXNNYXRjaCA9ICEoeCAmJiBsZWFmID09PSBudWxsKSB8fCB4ID09PSBsZWFmIHx8IF9pc1NwbGF0IHx8ICFleHRyYTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByb3V0ZUluZm8ubWF0Y2hlcyA9IGhhc01hdGNoO1xuICAgICAgICAgICAgICByb3V0ZUluZm8ucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zKTtcbiAgICAgICAgICAgICAgcm91dGVJbmZvLnJvdXRlID0gcm9vdFtrXS5yb3V0ZTtcbiAgICAgICAgICAgICAgcm91dGVJbmZvLnBhdGggPSBfaXNTcGxhdCAmJiBleHRyYSB8fCBsZWFmIHx8IHg7XG4gICAgICAgICAgICAgIG91dC5wdXNoKHJvdXRlSW5mbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXh0cmEgPT09IG51bGwgJiYgIXJvb3Rba10ua2V5cykge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChrICE9PSBcIi9cIikge1xuICAgICAgICAgICAgICBfc2Vlbi5wdXNoKGspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BsYXQgPSBfaXNTcGxhdDtcbiAgICAgICAgICAgIHJvb3QgPSByb290W2tdO1xuICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghKGZvdW5kIHx8IHJvb3Qua2V5cy5zb21lKGZ1bmN0aW9uKGspIHtcbiAgICAgICAgICByZXR1cm4gcm9vdFtrXS5wYXR0ZXJuLm1hdGNoKHgpO1xuICAgICAgICB9KSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgZGVmYXVsdEV4cG9ydChrZXksIHgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGxhdCB8fCAhZm91bmQ7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZpbmQocGF0aCwgcm91dGVzLCByZXRyaWVzKSB7XG4gICAgICB2YXIgZ2V0ID0gcmVkdWNlLmJpbmQobnVsbCwgcGF0aCwgcm91dGVzKTtcbiAgICAgIHZhciBzZXQgPSBbXTtcbiAgICAgIHdoaWxlIChyZXRyaWVzID4gMCkge1xuICAgICAgICByZXRyaWVzIC09IDE7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGdldChzZXQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKHJldHJpZXMgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0KHNldCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkKHBhdGgsIHJvdXRlcywgcGFyZW50LCByb3V0ZUluZm8pIHtcbiAgICAgIHZhciBmdWxscGF0aCA9IG1lcmdlKHBhdGgsIHBhcmVudCk7XG4gICAgICB2YXIgcm9vdCA9IHJvdXRlcztcbiAgICAgIHZhciBrZXk7XG4gICAgICBpZiAocm91dGVJbmZvICYmIHJvdXRlSW5mby5uZXN0ZWQgIT09IHRydWUpIHtcbiAgICAgICAga2V5ID0gcm91dGVJbmZvLmtleTtcbiAgICAgICAgZGVsZXRlIHJvdXRlSW5mby5rZXk7XG4gICAgICB9XG4gICAgICB3YWxrKGZ1bGxwYXRoLCBmdW5jdGlvbih4LCBsZWFmKSB7XG4gICAgICAgIHJvb3QgPSBQYXRoTWF0Y2hlci5wdXNoKHgsIHJvb3QsIGxlYWYsIGZ1bGxwYXRoKTtcbiAgICAgICAgaWYgKHggIT09IFwiL1wiKSB7XG4gICAgICAgICAgcm9vdC5pbmZvID0gcm9vdC5pbmZvIHx8IE9iamVjdC5hc3NpZ24oe30sIHJvdXRlSW5mbyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcm9vdC5pbmZvID0gcm9vdC5pbmZvIHx8IE9iamVjdC5hc3NpZ24oe30sIHJvdXRlSW5mbyk7XG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHJvb3QuaW5mby5rZXkgPSBrZXk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVsbHBhdGg7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJtKHBhdGgsIHJvdXRlcywgcGFyZW50KSB7XG4gICAgICB2YXIgZnVsbHBhdGggPSBtZXJnZShwYXRoLCBwYXJlbnQpO1xuICAgICAgdmFyIHJvb3QgPSByb3V0ZXM7XG4gICAgICB2YXIgbGVhZiA9IG51bGw7XG4gICAgICB2YXIga2V5ID0gbnVsbDtcbiAgICAgIHdhbGsoZnVsbHBhdGgsIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgaWYgKCFyb290KSB7XG4gICAgICAgICAgbGVhZiA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyb290LmtleXMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgZGVmYXVsdEV4cG9ydChwYXRoLCB4KTtcbiAgICAgICAgfVxuICAgICAgICBrZXkgPSB4O1xuICAgICAgICBsZWFmID0gcm9vdDtcbiAgICAgICAgcm9vdCA9IHJvb3Rba2V5XTtcbiAgICAgIH0pO1xuICAgICAgaWYgKCEobGVhZiAmJiBrZXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBkZWZhdWx0RXhwb3J0KHBhdGgsIGtleSk7XG4gICAgICB9XG4gICAgICBpZiAobGVhZiA9PT0gcm91dGVzKSB7XG4gICAgICAgIGxlYWYgPSByb3V0ZXNbXCIvXCJdO1xuICAgICAgfVxuICAgICAgaWYgKGxlYWYucm91dGUgIT09IGtleSkge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gbGVhZi5rZXlzLmluZGV4T2Yoa2V5KTtcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gLTEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgZGVmYXVsdEV4cG9ydChwYXRoLCBrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGxlYWYua2V5cy5zcGxpY2Uob2Zmc2V0LCAxKTtcbiAgICAgICAgUGF0aE1hdGNoZXIuc29ydChsZWFmKTtcbiAgICAgICAgZGVsZXRlIGxlYWZba2V5XTtcbiAgICAgIH1cbiAgICAgIGlmIChyb290LnJvdXRlID09PSBsZWFmLnJvdXRlICYmICghcm9vdC5pbmZvIHx8IHJvb3QuaW5mby5rZXkgPT09IGxlYWYuaW5mby5rZXkpKSB7XG4gICAgICAgIGRlbGV0ZSBsZWFmLmluZm87XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBSb3V0ZXIgPSBmdW5jdGlvbiBSb3V0ZXIyKCkge1xuICAgICAgdmFyIHJvdXRlcyA9IHt9O1xuICAgICAgdmFyIHN0YWNrID0gW107XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXNvbHZlOiBmdW5jdGlvbihwYXRoLCBjYikge1xuICAgICAgICAgIHZhciB1cmwgPSBwYXRoLnNwbGl0KFwiP1wiKVswXTtcbiAgICAgICAgICB2YXIgc2VlbiA9IFtdO1xuICAgICAgICAgIHdhbGsodXJsLCBmdW5jdGlvbih4LCBsZWFmLCBleHRyYSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY2IobnVsbCwgZmluZChsZWFmLCByb3V0ZXMsIDEpLmZpbHRlcihmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWVuLmluY2x1ZGVzKHIucGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgIHNlZW4ucHVzaChyLnBhdGgpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBjYihlLCBbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50OiBmdW5jdGlvbihwYXRoLCBjYikge1xuICAgICAgICAgIGlmIChwYXRoICE9PSBcIi9cIikge1xuICAgICAgICAgICAgc3RhY2sucHVzaChwYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2IoKTtcbiAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmluZDogZnVuY3Rpb24ocGF0aCwgcmV0cmllcykge1xuICAgICAgICAgIHJldHVybiBmaW5kKHBhdGgsIHJvdXRlcywgcmV0cmllcyA9PT0gdHJ1ZSA/IDIgOiByZXRyaWVzIHx8IDEpO1xuICAgICAgICB9LFxuICAgICAgICBhZGQ6IGZ1bmN0aW9uKHBhdGgsIHJvdXRlSW5mbykge1xuICAgICAgICAgIHJldHVybiBhZGQocGF0aCwgcm91dGVzLCBzdGFjay5qb2luKFwiXCIpLCByb3V0ZUluZm8pO1xuICAgICAgICB9LFxuICAgICAgICBybTogZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICAgIHJldHVybiBybShwYXRoLCByb3V0ZXMsIHN0YWNrLmpvaW4oXCJcIikpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgUm91dGVyLm1hdGNoZXMgPSBmdW5jdGlvbiBtYXRjaGVzKHVyaSwgcGF0aCkge1xuICAgICAgcmV0dXJuIGJ1aWxkTWF0Y2hlcih1cmksIHBhdGgpLnJlZ2V4LnRlc3QocGF0aCk7XG4gICAgfTtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFJvdXRlcjtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvdmVuZG9yLmpzXG52YXIgaW1wb3J0X3F1ZXJ5X3N0cmluZyA9IF9fdG9Nb2R1bGUocmVxdWlyZV9xdWVyeV9zdHJpbmcoKSk7XG52YXIgaW1wb3J0X2Fic3RyYWN0X25lc3RlZF9yb3V0ZXIgPSBfX3RvTW9kdWxlKHJlcXVpcmVfZGlzdCgpKTtcbnZhciBleHBvcnRfUm91dGVyID0gaW1wb3J0X2Fic3RyYWN0X25lc3RlZF9yb3V0ZXIuZGVmYXVsdDtcbnZhciBleHBvcnRfcGFyc2UgPSBpbXBvcnRfcXVlcnlfc3RyaW5nLnBhcnNlO1xudmFyIGV4cG9ydF9zdHJpbmdpZnkgPSBpbXBvcnRfcXVlcnlfc3RyaW5nLnN0cmluZ2lmeTtcbmV4cG9ydCB7XG4gIGV4cG9ydF9Sb3V0ZXIgYXMgUm91dGVyLFxuICBleHBvcnRfcGFyc2UgYXMgcGFyc2UsXG4gIGV4cG9ydF9zdHJpbmdpZnkgYXMgc3RyaW5naWZ5XG59O1xuIiwgImltcG9ydCB7IHdyaXRhYmxlIH0gZnJvbSBcInN2ZWx0ZS9zdG9yZVwiO1xuaW1wb3J0IHsgUm91dGVyLCBzdHJpbmdpZnkgfSBmcm9tIFwiLi92ZW5kb3JcIjtcbmNvbnN0IGNhY2hlID0ge307XG5jb25zdCBiYXNlVGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJiYXNlXCIpO1xuY29uc3QgYmFzZVByZWZpeCA9IGJhc2VUYWdbMF0gJiYgYmFzZVRhZ1swXS5ocmVmIHx8IFwiL1wiO1xuY29uc3QgUk9PVF9VUkwgPSBiYXNlUHJlZml4LnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLm9yaWdpbiwgXCJcIik7XG5jb25zdCByb3V0ZXIgPSB3cml0YWJsZSh7XG4gIHBhdGg6IFwiL1wiLFxuICBxdWVyeToge30sXG4gIHBhcmFtczoge30sXG4gIGluaXRpYWw6IHRydWVcbn0pO1xuY29uc3QgQ1RYX1JPVVRFUiA9IHt9O1xuY29uc3QgQ1RYX1JPVVRFID0ge307XG5sZXQgSEFTSENIQU5HRSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gPT09IFwibnVsbFwiO1xuZnVuY3Rpb24gaGFzaGNoYW5nZUVuYWJsZSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikge1xuICAgIEhBU0hDSEFOR0UgPSAhIXZhbHVlO1xuICB9XG4gIHJldHVybiBIQVNIQ0hBTkdFO1xufVxuZnVuY3Rpb24gZml4ZWRMb2NhdGlvbihwYXRoLCBjYWxsYmFjaywgZG9GaW5hbGx5KSB7XG4gIGNvbnN0IGJhc2VVcmkgPSBIQVNIQ0hBTkdFID8gd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZShcIiNcIiwgXCJcIikgOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gIGlmIChwYXRoLmNoYXJBdCgpICE9PSBcIi9cIikge1xuICAgIHBhdGggPSBiYXNlVXJpICsgcGF0aDtcbiAgfVxuICBjb25zdCBjdXJyZW50VVJMID0gYmFzZVVyaSArIHdpbmRvdy5sb2NhdGlvbi5oYXNoICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgaWYgKGN1cnJlbnRVUkwgIT09IHBhdGgpIHtcbiAgICBjYWxsYmFjayhwYXRoKTtcbiAgfVxuICBpZiAodHlwZW9mIGRvRmluYWxseSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZG9GaW5hbGx5KCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGNsZWFuUGF0aCh1cmksIGZpeCkge1xuICByZXR1cm4gdXJpICE9PSBcIi9cIiB8fCBmaXggPyB1cmkucmVwbGFjZSgvXFwvJC8sIFwiXCIpIDogdXJpO1xufVxuZnVuY3Rpb24gbmF2aWdhdGVUbyhwYXRoLCBvcHRpb25zKSB7XG4gIGNvbnN0IHtcbiAgICByZWxvYWQsXG4gICAgcmVwbGFjZSxcbiAgICBwYXJhbXMsXG4gICAgcXVlcnlQYXJhbXNcbiAgfSA9IG9wdGlvbnMgfHwge307XG4gIGlmICghcGF0aCB8fCB0eXBlb2YgcGF0aCAhPT0gXCJzdHJpbmdcIiB8fCBwYXRoWzBdICE9PSBcIi9cIiAmJiBwYXRoWzBdICE9PSBcIiNcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0aW5nICcvJHtwYXRofScgb3IgJyMke3BhdGh9JywgZ2l2ZW4gJyR7cGF0aH0nYCk7XG4gIH1cbiAgaWYgKHBhcmFtcykge1xuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoLzooW2EtekEtWl1bYS16QS1aMC05Xy1dKikvZywgKF8sIGtleSkgPT4gcGFyYW1zW2tleV0pO1xuICB9XG4gIGlmIChxdWVyeVBhcmFtcykge1xuICAgIGNvbnN0IHFzID0gc3RyaW5naWZ5KHF1ZXJ5UGFyYW1zKTtcbiAgICBpZiAocXMpIHtcbiAgICAgIHBhdGggKz0gYD8ke3FzfWA7XG4gICAgfVxuICB9XG4gIGlmIChIQVNIQ0hBTkdFKSB7XG4gICAgbGV0IGZpeGVkVVJMID0gcGF0aC5yZXBsYWNlKC9eI3wjJC9nLCBcIlwiKTtcbiAgICBpZiAoUk9PVF9VUkwgIT09IFwiL1wiKSB7XG4gICAgICBmaXhlZFVSTCA9IGZpeGVkVVJMLnJlcGxhY2UoY2xlYW5QYXRoKFJPT1RfVVJMKSwgXCJcIik7XG4gICAgfVxuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gZml4ZWRVUkwgIT09IFwiL1wiID8gZml4ZWRVUkwgOiBcIlwiO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocmVsb2FkIHx8ICF3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgfHwgIXdpbmRvdy5kaXNwYXRjaEV2ZW50KSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBwYXRoO1xuICAgIHJldHVybjtcbiAgfVxuICBmaXhlZExvY2F0aW9uKHBhdGgsIChuZXh0VVJMKSA9PiB7XG4gICAgd2luZG93Lmhpc3RvcnlbcmVwbGFjZSA/IFwicmVwbGFjZVN0YXRlXCIgOiBcInB1c2hTdGF0ZVwiXShudWxsLCBcIlwiLCBuZXh0VVJMKTtcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwb3BzdGF0ZVwiKSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gZ2V0UHJvcHMoZ2l2ZW4sIHJlcXVpcmVkKSB7XG4gIGNvbnN0IHsgcHJvcHM6IHN1YiwgLi4ub3RoZXJzIH0gPSBnaXZlbjtcbiAgcmVxdWlyZWQuZm9yRWFjaCgoaykgPT4ge1xuICAgIGRlbGV0ZSBvdGhlcnNba107XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIC4uLnN1YixcbiAgICAuLi5vdGhlcnNcbiAgfTtcbn1cbmZ1bmN0aW9uIGlzQWN0aXZlKHVyaSwgcGF0aCwgZXhhY3QpIHtcbiAgaWYgKCFjYWNoZVtbdXJpLCBwYXRoLCBleGFjdF1dKSB7XG4gICAgaWYgKGV4YWN0ICE9PSB0cnVlICYmIHBhdGguaW5kZXhPZih1cmkpID09PSAwKSB7XG4gICAgICBjYWNoZVtbdXJpLCBwYXRoLCBleGFjdF1dID0gL15bIy8/XT8kLy50ZXN0KHBhdGguc3Vic3RyKHVyaS5sZW5ndGgsIDEpKTtcbiAgICB9IGVsc2UgaWYgKHVyaS5pbmNsdWRlcyhcIipcIikgfHwgdXJpLmluY2x1ZGVzKFwiOlwiKSkge1xuICAgICAgY2FjaGVbW3VyaSwgcGF0aCwgZXhhY3RdXSA9IFJvdXRlci5tYXRjaGVzKHVyaSwgcGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlW1t1cmksIHBhdGgsIGV4YWN0XV0gPSBjbGVhblBhdGgocGF0aCkgPT09IHVyaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhY2hlW1t1cmksIHBhdGgsIGV4YWN0XV07XG59XG5mdW5jdGlvbiBpc1Byb21pc2Uob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgJiYgdHlwZW9mIG9iamVjdC50aGVuID09PSBcImZ1bmN0aW9uXCI7XG59XG5mdW5jdGlvbiBpc1N2ZWx0ZUNvbXBvbmVudChvYmplY3QpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBvYmplY3QucHJvdG90eXBlO1xufVxuZXhwb3J0IHtcbiAgQ1RYX1JPVVRFLFxuICBDVFhfUk9VVEVSLFxuICBIQVNIQ0hBTkdFLFxuICBST09UX1VSTCxcbiAgY2xlYW5QYXRoLFxuICBmaXhlZExvY2F0aW9uLFxuICBnZXRQcm9wcyxcbiAgaGFzaGNoYW5nZUVuYWJsZSxcbiAgaXNBY3RpdmUsXG4gIGlzUHJvbWlzZSxcbiAgaXNTdmVsdGVDb21wb25lbnQsXG4gIG5hdmlnYXRlVG8sXG4gIHJvdXRlclxufTtcbiIsICJpbXBvcnQgeyB3cml0YWJsZSB9IGZyb20gXCJzdmVsdGUvc3RvcmVcIjtcbmltcG9ydCB7IFJvdXRlciwgcGFyc2UgfSBmcm9tIFwiLi92ZW5kb3JcIjtcbmltcG9ydCB7XG4gIFJPT1RfVVJMLFxuICBIQVNIQ0hBTkdFLFxuICBuYXZpZ2F0ZVRvLFxuICBjbGVhblBhdGgsXG4gIGlzQWN0aXZlLFxuICByb3V0ZXJcbn0gZnJvbSBcIi4vdXRpbHNcIjtcbmNvbnN0IGJhc2VSb3V0ZXIgPSBuZXcgUm91dGVyKCk7XG5jb25zdCByb3V0ZUluZm8gPSB3cml0YWJsZSh7fSk7XG5jb25zdCBvbkVycm9yID0ge307XG5jb25zdCBzaGFyZWQgPSB7fTtcbmxldCBlcnJvcnMgPSBbXTtcbmxldCByb3V0ZXJzID0gMDtcbmxldCBpbnRlcnZhbDtcbmxldCBjdXJyZW50VVJMO1xucm91dGVyLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgc2hhcmVkLnJvdXRlciA9IHZhbHVlO1xufSk7XG5yb3V0ZUluZm8uc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICBzaGFyZWQucm91dGVJbmZvID0gdmFsdWU7XG59KTtcbmZ1bmN0aW9uIGRvRmFsbGJhY2soZmFpbHVyZSwgZmFsbGJhY2spIHtcbiAgcm91dGVJbmZvLnVwZGF0ZSgoZGVmYXVsdHMpID0+ICh7XG4gICAgLi4uZGVmYXVsdHMsXG4gICAgW2ZhbGxiYWNrXToge1xuICAgICAgLi4uc2hhcmVkLnJvdXRlcixcbiAgICAgIGZhaWx1cmVcbiAgICB9XG4gIH0pKTtcbn1cbmZ1bmN0aW9uIGhhbmRsZVJvdXRlcyhtYXAsIHBhcmFtcykge1xuICBjb25zdCBrZXlzID0gW107XG4gIG1hcC5zb21lKCh4KSA9PiB7XG4gICAgaWYgKHgua2V5ICYmIHgubWF0Y2hlcyAmJiAhc2hhcmVkLnJvdXRlSW5mb1t4LmtleV0pIHtcbiAgICAgIGlmICh4LnJlZGlyZWN0ICYmICh4LmNvbmRpdGlvbiA9PT0gbnVsbCB8fCB4LmNvbmRpdGlvbihzaGFyZWQucm91dGVyKSAhPT0gdHJ1ZSkpIHtcbiAgICAgICAgaWYgKHguZXhhY3QgJiYgc2hhcmVkLnJvdXRlci5wYXRoICE9PSB4LnBhdGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBuYXZpZ2F0ZVRvKHgucmVkaXJlY3QpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh4LmV4YWN0KSB7XG4gICAgICAgIGtleXMucHVzaCh4LmtleSk7XG4gICAgICB9XG4gICAgICBPYmplY3QuYXNzaWduKHBhcmFtcywgeC5wYXJhbXMpO1xuICAgICAgcm91dGVJbmZvLnVwZGF0ZSgoZGVmYXVsdHMpID0+ICh7XG4gICAgICAgIC4uLmRlZmF1bHRzLFxuICAgICAgICBbeC5rZXldOiB7XG4gICAgICAgICAgLi4uc2hhcmVkLnJvdXRlcixcbiAgICAgICAgICAuLi54XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgcmV0dXJuIGtleXM7XG59XG5mdW5jdGlvbiBldnRIYW5kbGVyKCkge1xuICBsZXQgYmFzZVVyaSA9ICFIQVNIQ0hBTkdFID8gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSh3aW5kb3cubG9jYXRpb24ub3JpZ2luLCBcIlwiKSA6IHdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8IFwiL1wiO1xuICBsZXQgZmFpbHVyZTtcbiAgaWYgKFJPT1RfVVJMICE9PSBcIi9cIikge1xuICAgIGJhc2VVcmkgPSBiYXNlVXJpLnJlcGxhY2UoY2xlYW5QYXRoKFJPT1RfVVJMKSwgXCJcIik7XG4gIH1cbiAgaWYgKC9eI1tcXHctXSskLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5oYXNoKSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSAmJiBjdXJyZW50VVJMID09PSBiYXNlVXJpLnNwbGl0KFwiI1wiKVswXSlcbiAgICByZXR1cm47XG4gIGNvbnN0IFtmaXhlZFVyaSwgcXNdID0gYmFzZVVyaS5yZXBsYWNlKFwiLyNcIiwgXCIjXCIpLnJlcGxhY2UoL14jXFwvLywgXCIvXCIpLnNwbGl0KFwiP1wiKTtcbiAgY29uc3QgZnVsbHBhdGggPSBmaXhlZFVyaS5yZXBsYWNlKC9cXC8/JC8sIFwiL1wiKTtcbiAgY29uc3QgcXVlcnkgPSBwYXJzZShxcyk7XG4gIGNvbnN0IHBhcmFtcyA9IHt9O1xuICBjb25zdCBrZXlzID0gW107XG4gIHJvdXRlSW5mby5zZXQoe30pO1xuICBpZiAoY3VycmVudFVSTCAhPT0gYmFzZVVyaSkge1xuICAgIGN1cnJlbnRVUkwgPSBiYXNlVXJpO1xuICAgIHJvdXRlci5zZXQoe1xuICAgICAgcGF0aDogY2xlYW5QYXRoKGZ1bGxwYXRoKSxcbiAgICAgIHF1ZXJ5LFxuICAgICAgcGFyYW1zXG4gICAgfSk7XG4gIH1cbiAgYmFzZVJvdXRlci5yZXNvbHZlKGZ1bGxwYXRoLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBmYWlsdXJlID0gZXJyO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBrZXlzLnB1c2goLi4uaGFuZGxlUm91dGVzKHJlc3VsdCwgcGFyYW1zKSk7XG4gIH0pO1xuICBjb25zdCB0b0RlbGV0ZSA9IHt9O1xuICBpZiAoZmFpbHVyZSAmJiBmYWlsdXJlLnBhdGggIT09IFwiL1wiKSB7XG4gICAga2V5cy5yZWR1Y2UoKHByZXYsIGN1cikgPT4ge1xuICAgICAgcHJldltjdXJdID0gbnVsbDtcbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHRvRGVsZXRlKTtcbiAgfSBlbHNlIHtcbiAgICBmYWlsdXJlID0gbnVsbDtcbiAgfVxuICBlcnJvcnMuZm9yRWFjaCgoY2IpID0+IGNiKCkpO1xuICBlcnJvcnMgPSBbXTtcbiAgdHJ5IHtcbiAgICBiYXNlUm91dGVyLmZpbmQoY2xlYW5QYXRoKGZ1bGxwYXRoKSkuZm9yRWFjaCgoc3ViKSA9PiB7XG4gICAgICBpZiAoc3ViLmV4YWN0ICYmICFzdWIubWF0Y2hlcykge1xuICAgICAgICB0b0RlbGV0ZVtzdWIua2V5XSA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgfVxuICByb3V0ZUluZm8udXBkYXRlKChkZWZhdWx0cykgPT4gKHtcbiAgICAuLi5kZWZhdWx0cyxcbiAgICAuLi50b0RlbGV0ZVxuICB9KSk7XG4gIGxldCBmYWxsYmFjaztcbiAgT2JqZWN0LmtleXMob25FcnJvcikuZm9yRWFjaCgocm9vdCkgPT4ge1xuICAgIGlmIChpc0FjdGl2ZShyb290LCBmdWxscGF0aCwgZmFsc2UpKSB7XG4gICAgICBjb25zdCBmbiA9IG9uRXJyb3Jbcm9vdF0uY2FsbGJhY2s7XG4gICAgICBmbihmYWlsdXJlKTtcbiAgICAgIGVycm9ycy5wdXNoKGZuKTtcbiAgICB9XG4gICAgaWYgKCFmYWxsYmFjayAmJiBvbkVycm9yW3Jvb3RdLmZhbGxiYWNrKSB7XG4gICAgICBmYWxsYmFjayA9IG9uRXJyb3Jbcm9vdF0uZmFsbGJhY2s7XG4gICAgfVxuICB9KTtcbiAgaWYgKGZhaWx1cmUgJiYgZmFsbGJhY2spIHtcbiAgICBkb0ZhbGxiYWNrKGZhaWx1cmUsIGZhbGxiYWNrKTtcbiAgfVxufVxuZnVuY3Rpb24gZmluZFJvdXRlcygpIHtcbiAgY2xlYXJUaW1lb3V0KGludGVydmFsKTtcbiAgaW50ZXJ2YWwgPSBzZXRUaW1lb3V0KGV2dEhhbmRsZXIpO1xufVxuZnVuY3Rpb24gYWRkUm91dGVyKHJvb3QsIGZhbGxiYWNrLCBjYWxsYmFjaykge1xuICBpZiAoIXJvdXRlcnMpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGZpbmRSb3V0ZXMsIGZhbHNlKTtcbiAgfVxuICBpZiAoIW9uRXJyb3Jbcm9vdF0gfHwgZmFsbGJhY2spIHtcbiAgICBvbkVycm9yW3Jvb3RdID0geyBmYWxsYmFjaywgY2FsbGJhY2sgfTtcbiAgfVxuICByb3V0ZXJzICs9IDE7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgcm91dGVycyAtPSAxO1xuICAgIGlmICghcm91dGVycykge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBmaW5kUm91dGVzLCBmYWxzZSk7XG4gICAgfVxuICB9O1xufVxuZXhwb3J0IHtcbiAgYWRkUm91dGVyLFxuICBiYXNlUm91dGVyLFxuICBkb0ZhbGxiYWNrLFxuICBldnRIYW5kbGVyLFxuICBmaW5kUm91dGVzLFxuICBoYW5kbGVSb3V0ZXMsXG4gIHJvdXRlSW5mb1xufTtcbiIsICI8c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgaW1wb3J0IHsgd3JpdGFibGUgfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuICBpbXBvcnQgeyBDVFhfUk9VVEVSLCByb3V0ZXIgfSBmcm9tICcuL3V0aWxzJztcbiAgaW1wb3J0IHtcbiAgICBiYXNlUm91dGVyLCBhZGRSb3V0ZXIsIGZpbmRSb3V0ZXMsIGRvRmFsbGJhY2ssXG4gIH0gZnJvbSAnLi9yb3V0ZXInO1xuPC9zY3JpcHQ+XG5cbjxzY3JpcHQ+XG4gIGltcG9ydCB7XG4gICAgb25Nb3VudCwgb25EZXN0cm95LCBnZXRDb250ZXh0LCBzZXRDb250ZXh0LFxuICB9IGZyb20gJ3N2ZWx0ZSc7XG5cbiAgbGV0IGNsZWFudXA7XG4gIGxldCBmYWlsdXJlO1xuICBsZXQgZmFsbGJhY2s7XG5cbiAgZXhwb3J0IGxldCBwYXRoID0gJy8nO1xuICBleHBvcnQgbGV0IHBlbmRpbmcgPSBudWxsO1xuICBleHBvcnQgbGV0IGRpc2FibGVkID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgY29uZGl0aW9uID0gbnVsbDtcblxuXG5cblxuXG4gIGNvbnN0IHJvdXRlckNvbnRleHQgPSBnZXRDb250ZXh0KENUWF9ST1VURVIpO1xuICBjb25zdCBiYXNlUGF0aCA9IHJvdXRlckNvbnRleHQgPyByb3V0ZXJDb250ZXh0LmJhc2VQYXRoIDogd3JpdGFibGUocGF0aCk7XG5cbiAgY29uc3QgZml4ZWRSb290ID0gJGJhc2VQYXRoICE9PSBwYXRoICYmICRiYXNlUGF0aCAhPT0gJy8nXG4gICAgPyBgJHskYmFzZVBhdGh9JHtwYXRoICE9PSAnLycgPyBwYXRoIDogJyd9YFxuICAgIDogcGF0aDtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiAgZnVuY3Rpb24gYXNzaWduUm91dGUoa2V5LCByb3V0ZSwgZGV0YWlsKSB7XG4gICAga2V5ID0ga2V5IHx8IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyKTtcblxuICAgIC8vIGNvbnNpZGVyIGFzIG5lc3RlZCByb3V0ZXMgaWYgdGhleSBkb2VzIG5vdCBoYXZlIGFueSBzZWdtZW50XG4gICAgY29uc3QgbmVzdGVkID0gIXJvdXRlLnN1YnN0cigxKS5pbmNsdWRlcygnLycpO1xuICAgIGNvbnN0IGhhbmRsZXIgPSB7IGtleSwgbmVzdGVkLCAuLi5kZXRhaWwgfTtcblxuICAgIGxldCBmdWxscGF0aDtcblxuICAgIGJhc2VSb3V0ZXIubW91bnQoZml4ZWRSb290LCAoKSA9PiB7XG4gICAgICBmdWxscGF0aCA9IGJhc2VSb3V0ZXIuYWRkKHJvdXRlLCBoYW5kbGVyKTtcbiAgICAgIGZhbGxiYWNrID0gKGhhbmRsZXIuZmFsbGJhY2sgJiYga2V5KSB8fCBmYWxsYmFjaztcbiAgICB9KTtcblxuICAgIGZpbmRSb3V0ZXMoKTtcblxuICAgIHJldHVybiBba2V5LCBmdWxscGF0aF07XG4gIH1cblxuICBmdW5jdGlvbiB1bmFzc2lnblJvdXRlKHJvdXRlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGJhc2VSb3V0ZXIucm0ocm91dGUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIPCflKUgdGhpcyBpcyBmaW5lLi4uXG4gICAgfVxuICAgIGZpbmRSb3V0ZXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRXJyb3IoZXJyKSB7XG4gICAgZmFpbHVyZSA9IGVycjtcblxuICAgIGlmIChmYWlsdXJlICYmIGZhbGxiYWNrKSB7XG4gICAgICBkb0ZhbGxiYWNrKGZhaWx1cmUsIGZhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICBvbk1vdW50KCgpID0+IHtcbiAgICBjbGVhbnVwID0gYWRkUm91dGVyKGZpeGVkUm9vdCwgZmFsbGJhY2ssIG9uRXJyb3IpO1xuICB9KTtcblxuICBvbkRlc3Ryb3koKCkgPT4ge1xuICAgIGlmIChjbGVhbnVwKSBjbGVhbnVwKCk7XG4gIH0pO1xuXG4gIHNldENvbnRleHQoQ1RYX1JPVVRFUiwge1xuICAgIGJhc2VQYXRoLFxuICAgIGFzc2lnblJvdXRlLFxuICAgIHVuYXNzaWduUm91dGUsXG4gICAgcGVuZGluZ0NvbXBvbmVudDogcGVuZGluZyxcbiAgfSk7XG5cbiAgJDogaWYgKGNvbmRpdGlvbikge1xuICAgIGRpc2FibGVkID0gIWNvbmRpdGlvbigkcm91dGVyKTtcbiAgfVxuPC9zY3JpcHQ+XG5cbnsjaWYgIWRpc2FibGVkfVxuICA8c2xvdCAvPlxuey9pZn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsICI8c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgaW1wb3J0IHsgd3JpdGFibGUgfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuICBpbXBvcnQgeyByb3V0ZUluZm8gfSBmcm9tICcuL3JvdXRlcic7XG4gIGltcG9ydCB7XG4gICAgQ1RYX1JPVVRFUiwgQ1RYX1JPVVRFLCBnZXRQcm9wcywgaXNQcm9taXNlLCBpc1N2ZWx0ZUNvbXBvbmVudCxcbiAgfSBmcm9tICcuL3V0aWxzJztcbjwvc2NyaXB0PlxuXG48c2NyaXB0PlxuICBpbXBvcnQgeyBvbkRlc3Ryb3ksIGdldENvbnRleHQsIHNldENvbnRleHQgfSBmcm9tICdzdmVsdGUnO1xuXG4gIGV4cG9ydCBsZXQga2V5ID0gbnVsbDtcbiAgZXhwb3J0IGxldCBwYXRoID0gJy8nO1xuICBleHBvcnQgbGV0IGV4YWN0ID0gbnVsbDtcbiAgZXhwb3J0IGxldCBwZW5kaW5nID0gbnVsbDtcbiAgZXhwb3J0IGxldCBkaXNhYmxlZCA9IGZhbHNlO1xuICBleHBvcnQgbGV0IGZhbGxiYWNrID0gbnVsbDtcbiAgZXhwb3J0IGxldCBjb21wb25lbnQgPSBudWxsO1xuICBleHBvcnQgbGV0IGNvbmRpdGlvbiA9IG51bGw7XG4gIGV4cG9ydCBsZXQgcmVkaXJlY3QgPSBudWxsO1xuXG4gIC8vIHJlcGxhY2VtZW50IGZvciBgT2JqZWN0LmtleXMoYXJndW1lbnRzWzBdLiQkLnByb3BzKWBcbiAgY29uc3QgdGhpc1Byb3BzID0gWydrZXknLCAncGF0aCcsICdleGFjdCcsICdwZW5kaW5nJywgJ2Rpc2FibGVkJywgJ2ZhbGxiYWNrJywgJ2NvbXBvbmVudCcsICdjb25kaXRpb24nLCAncmVkaXJlY3QnXTtcblxuICBjb25zdCByb3V0ZUNvbnRleHQgPSBnZXRDb250ZXh0KENUWF9ST1VURSk7XG4gIGNvbnN0IHJvdXRlckNvbnRleHQgPSBnZXRDb250ZXh0KENUWF9ST1VURVIpO1xuXG4gIGNvbnN0IHsgYXNzaWduUm91dGUsIHVuYXNzaWduUm91dGUsIHBlbmRpbmdDb21wb25lbnQgfSA9IHJvdXRlckNvbnRleHQgfHwge307XG5cbiAgY29uc3Qgcm91dGVQYXRoID0gcm91dGVDb250ZXh0ID8gcm91dGVDb250ZXh0LnJvdXRlUGF0aCA6IHdyaXRhYmxlKHBhdGgpO1xuXG4gIGxldCBhY3RpdmVSb3V0ZXIgPSBudWxsO1xuICBsZXQgYWN0aXZlUHJvcHMgPSB7fTtcbiAgbGV0IGZ1bGxwYXRoO1xuICBsZXQgaGFzTG9hZGVkO1xuXG4gIGNvbnN0IGZpeGVkUm9vdCA9ICRyb3V0ZVBhdGggIT09IHBhdGggJiYgJHJvdXRlUGF0aCAhPT0gJy8nXG4gICAgPyBgJHskcm91dGVQYXRofSR7cGF0aCAhPT0gJy8nID8gcGF0aCA6ICcnfWBcbiAgICA6IHBhdGg7XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZSgpIHtcbiAgICBjb25zdCBmaXhlZFJvdXRlID0gcGF0aCAhPT0gZml4ZWRSb290ICYmIGZpeGVkUm9vdC5zdWJzdHIoLTEpICE9PSAnLydcbiAgICAgID8gYCR7Zml4ZWRSb290fS9gXG4gICAgICA6IGZpeGVkUm9vdDtcblxuICAgIFtrZXksIGZ1bGxwYXRoXSA9IGFzc2lnblJvdXRlKGtleSwgZml4ZWRSb3V0ZSwge1xuICAgICAgY29uZGl0aW9uLCByZWRpcmVjdCwgZmFsbGJhY2ssIGV4YWN0LFxuICAgIH0pO1xuICB9XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4gIHJlc29sdmUoKTtcblxuXG4gICQ6IGlmIChrZXkpIHtcbiAgICBhY3RpdmVSb3V0ZXIgPSAhZGlzYWJsZWQgJiYgJHJvdXRlSW5mb1trZXldO1xuICAgIGFjdGl2ZVByb3BzID0gZ2V0UHJvcHMoJCRwcm9wcywgdGhpc1Byb3BzKTtcbiAgICBhY3RpdmVQcm9wcy5yb3V0ZXIgPSBhY3RpdmVSb3V0ZXI7XG4gIH1cblxuICAkOiBpZiAoYWN0aXZlUm91dGVyKSB7XG4gICAgaWYgKCFjb21wb25lbnQpIHsgLy8gY29tcG9uZW50IHBhc3NlZCBhcyBzbG90XG4gICAgICBoYXNMb2FkZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoaXNTdmVsdGVDb21wb25lbnQoY29tcG9uZW50KSkgeyAvLyBjb21wb25lbnQgcGFzc2VkIGFzIFN2ZWx0ZSBjb21wb25lbnRcbiAgICAgIGhhc0xvYWRlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChpc1Byb21pc2UoY29tcG9uZW50KSkgeyAvLyBjb21wb25lbnQgcGFzc2VkIGFzIGltcG9ydCgpXG4gICAgICBjb21wb25lbnQudGhlbihtb2R1bGUgPT4ge1xuICAgICAgICBjb21wb25lbnQgPSBtb2R1bGUuZGVmYXVsdDtcbiAgICAgICAgaGFzTG9hZGVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7IC8vIGNvbXBvbmVudCBwYXNzZWQgYXMgKCkgPT4gaW1wb3J0KClcbiAgICAgIGNvbXBvbmVudCgpLnRoZW4obW9kdWxlID0+IHtcbiAgICAgICAgY29tcG9uZW50ID0gbW9kdWxlLmRlZmF1bHQ7XG4gICAgICAgIGhhc0xvYWRlZCA9IHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbkRlc3Ryb3koKCkgPT4ge1xuICAgIGlmICh1bmFzc2lnblJvdXRlKSB7XG4gICAgICB1bmFzc2lnblJvdXRlKGZ1bGxwYXRoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHNldENvbnRleHQoQ1RYX1JPVVRFLCB7XG4gICAgcm91dGVQYXRoLFxuICB9KTtcbjwvc2NyaXB0PlxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG57I2lmIGFjdGl2ZVJvdXRlcn1cbiAgeyNpZiAhaGFzTG9hZGVkfVxuICAgIHsjaWYgcGVuZGluZyB8fCBwZW5kaW5nQ29tcG9uZW50fVxuICAgICAgeyNpZiBpc1N2ZWx0ZUNvbXBvbmVudChwZW5kaW5nKX1cbiAgICAgICAgPHN2ZWx0ZTpjb21wb25lbnQgdGhpcz17cGVuZGluZ30gey4uLmFjdGl2ZVByb3BzfSAvPlxuICAgICAgezplbHNlIGlmIGlzU3ZlbHRlQ29tcG9uZW50KHBlbmRpbmdDb21wb25lbnQpfVxuICAgICAgICA8c3ZlbHRlOmNvbXBvbmVudCB0aGlzPXtwZW5kaW5nQ29tcG9uZW50fSB7Li4uYWN0aXZlUHJvcHN9IC8+XG4gICAgICB7OmVsc2V9XG4gICAgICAgIHtwZW5kaW5nIHx8IHBlbmRpbmdDb21wb25lbnR9XG4gICAgICB7L2lmfVxuICAgIHsvaWZ9XG4gIHs6ZWxzZX1cbiAgICB7I2lmIGNvbXBvbmVudH1cbiAgICAgIDxzdmVsdGU6Y29tcG9uZW50IHRoaXM9e2NvbXBvbmVudH0gey4uLmFjdGl2ZVByb3BzfSAvPlxuICAgIHs6ZWxzZX1cbiAgICAgIDxzbG90IHsuLi5hY3RpdmVQcm9wc30gLz5cbiAgICB7L2lmfVxuICB7L2lmfVxuey9pZn1cbiIsICI8c2NyaXB0PlxuICBpbXBvcnQgeyBjcmVhdGVFdmVudERpc3BhdGNoZXIgfSBmcm9tICdzdmVsdGUnO1xuXG4gIGltcG9ydCB7XG4gICAgUk9PVF9VUkwsIEhBU0hDSEFOR0UsIGZpeGVkTG9jYXRpb24sIG5hdmlnYXRlVG8sIGNsZWFuUGF0aCwgaXNBY3RpdmUsIGdldFByb3BzLCByb3V0ZXIsXG4gIH0gZnJvbSAnLi91dGlscyc7XG5cbiAgbGV0IHJlZjtcbiAgbGV0IGFjdGl2ZTtcbiAgbGV0IGNzc0NsYXNzID0gJyc7XG4gIGxldCBmaXhlZEhyZWYgPSBudWxsO1xuXG4gIGV4cG9ydCBsZXQgZ28gPSBudWxsO1xuICBleHBvcnQgbGV0IG9wZW4gPSBudWxsO1xuICBleHBvcnQgbGV0IGhyZWYgPSAnJztcbiAgZXhwb3J0IGxldCB0aXRsZSA9ICcnO1xuICBleHBvcnQgbGV0IGJ1dHRvbiA9IGZhbHNlO1xuICBleHBvcnQgbGV0IGV4YWN0ID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgcmVsb2FkID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgcmVwbGFjZSA9IGZhbHNlO1xuICBleHBvcnQgeyBjc3NDbGFzcyBhcyBjbGFzcyB9O1xuXG4gIC8vIHJlcGxhY2VtZW50IGZvciBgT2JqZWN0LmtleXMoYXJndW1lbnRzWzBdLiQkLnByb3BzKWBcbiAgY29uc3QgdGhpc1Byb3BzID0gWydnbycsICdvcGVuJywgJ2hyZWYnLCAnY2xhc3MnLCAndGl0bGUnLCAnYnV0dG9uJywgJ2V4YWN0JywgJ3JlbG9hZCcsICdyZXBsYWNlJ107XG5cbiAgLy8gcmViYXNlIGFjdGl2ZSBVUkxcbiAgJDogaWYgKCEvXihcXHcrOik/XFwvXFwvLy50ZXN0KGhyZWYpKSB7XG4gICAgZml4ZWRIcmVmID0gY2xlYW5QYXRoKFJPT1RfVVJMLCB0cnVlKSArIGNsZWFuUGF0aChIQVNIQ0hBTkdFID8gYCMke2hyZWZ9YCA6IGhyZWYpO1xuICB9XG5cbiAgJDogaWYgKHJlZiAmJiAkcm91dGVyLnBhdGgpIHtcbiAgICBpZiAoaXNBY3RpdmUoaHJlZiwgJHJvdXRlci5wYXRoLCBleGFjdCkpIHtcbiAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHJlZi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcsICdwYWdlJyk7XG5cbiAgICAgICAgaWYgKGJ1dHRvbikge1xuICAgICAgICAgIHJlZi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGFjdGl2ZSkge1xuICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgICByZWYucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgcmVmLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXh0cmFjdCBhZGRpdGlvbmFsIHByb3BzXG4gICQ6IGZpeGVkUHJvcHMgPSBnZXRQcm9wcygkJHByb3BzLCB0aGlzUHJvcHMpO1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCk7XG5cbiAgLy8gdGhpcyB3aWxsIGVuYWJsZSBgPExpbmsgb246Y2xpY2s9ey4uLn0gLz5gIGNhbGxzXG4gIGZ1bmN0aW9uIGhhbmRsZU9uQ2xpY2soZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICh0eXBlb2YgZ28gPT09ICdzdHJpbmcnICYmIHdpbmRvdy5oaXN0b3J5Lmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmIChnbyA9PT0gJ2JhY2snKSB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgICBlbHNlIGlmIChnbyA9PT0gJ2Z3ZCcpIHdpbmRvdy5oaXN0b3J5LmZvcndhcmQoKTtcbiAgICAgIGVsc2Ugd2luZG93Lmhpc3RvcnkuZ28ocGFyc2VJbnQoZ28sIDEwKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFmaXhlZEhyZWYgJiYgaHJlZiAhPT0gJycpIHtcbiAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgIGxldCBzcGVjcyA9IHR5cGVvZiBvcGVuID09PSAnc3RyaW5nJyA/IG9wZW4gOiAnJztcblxuICAgICAgICBjb25zdCB3bWF0Y2ggPSBzcGVjcy5tYXRjaCgvd2lkdGg9KFxcZCspLyk7XG4gICAgICAgIGNvbnN0IGhtYXRjaCA9IHNwZWNzLm1hdGNoKC9oZWlnaHQ9KFxcZCspLyk7XG5cbiAgICAgICAgaWYgKHdtYXRjaCkgc3BlY3MgKz0gYCxsZWZ0PSR7KHdpbmRvdy5zY3JlZW4ud2lkdGggLSB3bWF0Y2hbMV0pIC8gMn1gO1xuICAgICAgICBpZiAoaG1hdGNoKSBzcGVjcyArPSBgLHRvcD0keyh3aW5kb3cuc2NyZWVuLmhlaWdodCAtIGhtYXRjaFsxXSkgLyAyfWA7XG5cbiAgICAgICAgaWYgKHdtYXRjaCAmJiAhaG1hdGNoKSB7XG4gICAgICAgICAgc3BlY3MgKz0gYCxoZWlnaHQ9JHt3bWF0Y2hbMV19LHRvcD0keyh3aW5kb3cuc2NyZWVuLmhlaWdodCAtIHdtYXRjaFsxXSkgLyAyfWA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB3ID0gd2luZG93Lm9wZW4oaHJlZiwgJycsIHNwZWNzKTtcbiAgICAgICAgY29uc3QgdCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBpZiAody5jbG9zZWQpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKCdjbG9zZScpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEyMCk7XG4gICAgICB9IGVsc2Ugd2luZG93LmxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZpeGVkTG9jYXRpb24oaHJlZiwgKCkgPT4ge1xuICAgICAgbmF2aWdhdGVUbyhmaXhlZEhyZWYgfHwgJy8nLCB7IHJlbG9hZCwgcmVwbGFjZSB9KTtcbiAgICB9LCAoKSA9PiBkaXNwYXRjaCgnY2xpY2snLCBlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVBbmNob3JPbkNsaWNrKGUpIHtcbiAgICAvLyB1c2VyIHVzZWQgYSBrZXlib2FyZCBzaG9ydGN1dCB0byBmb3JjZSBvcGVuIGxpbmsgaW4gYSBuZXcgdGFiXG4gICAgaWYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkgfHwgZS5idXR0b24gIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIFxuICAgIGhhbmRsZU9uQ2xpY2soZSk7XG4gIH1cbjwvc2NyaXB0PlxuXG57I2lmIGJ1dHRvbn1cbiAgPGJ1dHRvbiB7Li4uZml4ZWRQcm9wc30gYmluZDp0aGlzPXtyZWZ9IGNsYXNzPXtjc3NDbGFzc30ge3RpdGxlfSBvbjpjbGljaz17aGFuZGxlT25DbGlja30+XG4gICAgPHNsb3QgLz5cbiAgPC9idXR0b24+XG57OmVsc2V9XG4gIDxhIHsuLi5maXhlZFByb3BzfSBocmVmPXtjbGVhblBhdGgoZml4ZWRIcmVmIHx8IGhyZWYpfSBiaW5kOnRoaXM9e3JlZn0gY2xhc3M9e2Nzc0NsYXNzfSB7dGl0bGV9IG9uOmNsaWNrPXtoYW5kbGVBbmNob3JPbkNsaWNrfT5cbiAgICA8c2xvdCAvPlxuICA8L2E+XG57L2lmfVxuIiwgImltcG9ydCBSb3V0ZXIgZnJvbSBcIi4vbGliL1JvdXRlci5zdmVsdGVcIjtcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9saWIvUm91dGUuc3ZlbHRlXCI7XG5pbXBvcnQgTGluayBmcm9tIFwiLi9saWIvTGluay5zdmVsdGVcIjtcbmltcG9ydCB7IGhhc2hjaGFuZ2VFbmFibGUsIG5hdmlnYXRlVG8sIHJvdXRlciB9IGZyb20gXCIuL2xpYi91dGlsc1wiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFJvdXRlciwgXCJoYXNoY2hhbmdlXCIsIHtcbiAgc2V0OiAodmFsdWUpID0+IGhhc2hjaGFuZ2VFbmFibGUodmFsdWUpLFxuICBnZXQ6ICgpID0+IGhhc2hjaGFuZ2VFbmFibGUoKSxcbiAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgZW51bWVyYWJsZTogZmFsc2Vcbn0pO1xuZXhwb3J0IHtcbiAgTGluayxcbiAgUm91dGUsXG4gIFJvdXRlcixcbiAgbmF2aWdhdGVUbyxcbiAgcm91dGVyXG59O1xuIiwgIjxzY3JpcHQ+XG4gIGltcG9ydCB7IFJvdXRlciwgUm91dGUsIExpbmssIG5hdmlnYXRlVG8gfSBmcm9tICd5cnYnO1xuICBpbXBvcnQge1xuICAgIG1lLCB1cmwsIHNjaGVtYXMsIGN1cnJlbnQsIHNlc3Npb24sIGxvZ2dlZEluLFxuICB9IGZyb20gJy4vZ2lzdHMnO1xuXG4gIGltcG9ydCBJY29uIGZyb20gJy4vSWNvbi5zdmVsdGUnO1xuICBpbXBvcnQgT3B0cyBmcm9tICcuL09wdHMuc3ZlbHRlJztcbiAgaW1wb3J0IFNhdmUgZnJvbSAnLi9TYXZlLnN2ZWx0ZSc7XG4gIGltcG9ydCBHaXN0cyBmcm9tICcuL0dpc3RzLnN2ZWx0ZSc7XG4gIGltcG9ydCBNb2RhbCBmcm9tICcuL01vZGFsLnN2ZWx0ZSc7XG5cbiAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICBtZSgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoIWRhdGEubG9naW4pIHJldHVybjtcblxuICAgICAgJGxvZ2dlZEluID0gdHJ1ZTtcbiAgICAgICRzZXNzaW9uID0ge1xuICAgICAgICB1c2VybmFtZTogZGF0YS5sb2dpbixcbiAgICAgICAgZnVsbG5hbWU6IGRhdGEubmFtZSxcbiAgICAgIH07XG5cbiAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuX0RBVEEgPSBKU09OLnN0cmluZ2lmeSgkc2Vzc2lvbik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBleGl0KCkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuX0FVVEggPSAnJztcbiAgICAkbG9nZ2VkSW4gPSBudWxsO1xuICAgIG5hdmlnYXRlVG8oJy8nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZCgpIHtcbiAgICAkc2NoZW1hcyA9IFtdO1xuICAgICRjdXJyZW50ID0gbnVsbDtcbiAgICBuYXZpZ2F0ZVRvKCcvJyk7XG4gIH1cbjwvc2NyaXB0PlxuXG48dWwgY2xhc3M9XCJwIGxyIGxuIG10IHJlbCBqc2YtYWJvdXRcIj5cbiAgPGxpIGNsYXNzPVwic3AgcGQgZGliIG5vc2xcIj5cbiAgICA8TGluayBocmVmPVwiI29wdGlvbnNcIiBjbGFzcz1cImFcIj5cbiAgICAgIDxJY29uIG5hbWU9XCJnZWFyXCIgLz4gT3B0aW9uc1xuICAgIDwvTGluaz5cbiAgPC9saT5cbiAgPGxpIGNsYXNzPVwiYXIgZGliXCI+XG4gICAgeyNpZiAkbG9nZ2VkSW59XG4gICAgICA8TGluayBocmVmPVwiI3Nlc3Npb25cIiBjbGFzcz1cImEgbm9zbFwiIHRpdGxlPXskc2Vzc2lvbi5mdWxsbmFtZX0+XG4gICAgICAgIDxJY29uIG5hbWU9XCJnaXRodWJcIiAvPiB7JHNlc3Npb24udXNlcm5hbWV9XG4gICAgICA8L0xpbms+XG4gICAgezplbHNlfVxuICAgICAgPExpbmsgb3Blbj1cIndpZHRoPTQwMCxoZWlnaHQ9NjQwXCIgaHJlZj17dXJsKCl9IG9uOmNsb3NlPXtkb25lfSBjbGFzcz1cImFcIj5cbiAgICAgICAgPEljb24gbmFtZT1cImdpdGh1YlwiIC8+IFNoYXJlIGxpbms/IExvZyBpblxuICAgICAgPC9MaW5rPlxuICAgIHsvaWZ9XG4gIDwvbGk+XG48L3VsPlxuXG48Um91dGVyPlxuICA8Um91dGUgcGF0aD1cIiNvcHRpb25zXCIgY29tcG9uZW50PXtPcHRzfSAvPlxuICA8Um91dGUgcGF0aD1cIiNzZXNzaW9uXCI+XG4gICAgPE1vZGFsPlxuICAgICAgPExpbmsgaHJlZj1cIi9cIiBvbjpjbGljaz17YWRkfT5OZXcgcHJvamVjdDwvTGluaz4gfFxuICAgICAgPExpbmsgaHJlZj1cIi9sb2dvdXRcIiBvbjpjbGljaz17ZXhpdH0+TG9nIG91dDwvTGluaz5cbiAgICAgIDxMaW5rIGhyZWY9XCIjc2Vzc2lvbi9zYXZlXCI+U2F2ZSBwcm9qZWN0Li4uPC9MaW5rPiB8XG4gICAgICA8TGluayBocmVmPVwiI3Nlc3Npb24vb3BlblwiPlNjaGVtYXM8L0xpbms+IHxcbiAgICAgIDxSb3V0ZSBwYXRoPVwiL29wZW5cIiBjb21wb25lbnQ9e0dpc3RzfSAvPlxuICAgICAgPFJvdXRlIHBhdGg9XCIvc2F2ZVwiIGNvbXBvbmVudD17U2F2ZX0gLz5cbiAgICA8L01vZGFsPlxuICA8L1JvdXRlPlxuPC9Sb3V0ZXI+XG4iLCAiPHNjcmlwdD5cbiAgZXhwb3J0IGxldCBuYW1lID0gbnVsbDtcbiAgZXhwb3J0IGxldCBzaXplID0gMTY7XG48L3NjcmlwdD5cblxuPHN2ZyB3aWR0aD17c2l6ZX0gaGVpZ2h0PXtzaXplfT5cbiAgPHVzZSB4bGluazpocmVmPVwiI2ljb24te25hbWV9XCIgLz5cbjwvc3ZnPlxuIiwgIjxzY3JpcHQgY29udGV4dD1cIm1vZHVsZVwiPlxuICBjb25zdCBTVEFDSyA9IFtdO1xuXG4gIGxldCBpcztcbiAgbGV0IHQ7XG5cbiAgZnVuY3Rpb24gaXNTZWFyY2goZSkge1xuICAgIHJldHVybiBlLnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnICYmIGUudGFyZ2V0LnR5cGUgPT09ICdzZWFyY2gnO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKGUpIHtcbiAgICBpZiAoaXNTZWFyY2goZSkpIHtcbiAgICAgIGlzID0gZS50YXJnZXQudmFsdWUubGVuZ3RoID09PSAwO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2goZWwsIGNsb3NlLCBjdXJyZW50LCBmaXJzdEVsZW1lbnQsIGxhc3RFbGVtZW50LCBsb2FkaW5nQ2FsbGJhY2spIHtcbiAgICBTVEFDSy5wdXNoKHtcbiAgICAgIGVsLCBjbG9zZSwgY3VycmVudCwgZmlyc3RFbGVtZW50LCBsYXN0RWxlbWVudCwgbG9hZGluZ0NhbGxiYWNrLFxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9wKGUpIHtcbiAgICBpZiAoIVNUQUNLLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgY29uc3Qge1xuICAgICAgZWwsIGNsb3NlLCBjdXJyZW50LFxuICAgIH0gPSBTVEFDS1tTVEFDSy5sZW5ndGggLSAxXTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4gY3VycmVudC5mb2N1cygpLCA2MCk7XG5cbiAgICBpZiAoZSBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpIHtcbiAgICAgIGNsb3NlKHsgdGFyZ2V0OiBlbCB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgdCA9IHNldFRpbWVvdXQoKCkgPT4gU1RBQ0sucG9wKCksIDEyMCk7XG4gIH1cblxuICBmdW5jdGlvbiBzeW5jKGUpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSA5ICYmIFNUQUNLLmxlbmd0aCkge1xuICAgICAgY29uc3QgeyBmaXJzdEVsZW1lbnQsIGxhc3RFbGVtZW50LCBsb2FkaW5nQ2FsbGJhY2sgfSA9IFNUQUNLW1NUQUNLLmxlbmd0aCAtIDFdO1xuXG4gICAgICBpZiAobG9hZGluZ0NhbGxiYWNrKCkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSBlbHNlIGlmIChlLnNoaWZ0S2V5ICYmIGUudGFyZ2V0ID09PSBmaXJzdEVsZW1lbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsYXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgfSBlbHNlIGlmICghZS5zaGlmdEtleSAmJiBlLnRhcmdldCA9PT0gbGFzdEVsZW1lbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBmaXJzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgIGlmIChpc1NlYXJjaChlKSkge1xuICAgICAgICBpZiAoaXMpIHBvcChlKTtcbiAgICAgIH0gZWxzZSBwb3AoZSk7XG4gICAgfVxuICB9XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdXBkYXRlKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBzeW5jKTtcbjwvc2NyaXB0PlxuXG48c2NyaXB0PlxuICBpbXBvcnQgeyBjcmVhdGVFdmVudERpc3BhdGNoZXIgfSBmcm9tICdzdmVsdGUnO1xuXG4gIGxldCByZWYgPSBudWxsO1xuICBsZXQgY3NzQ2xhc3MgPSAnJztcbiAgbGV0IGZpeGVkQ2xhc3MgPSAnJztcblxuICBleHBvcnQgbGV0IGlkID0gJyc7XG4gIGV4cG9ydCBsZXQgbW9kYWwgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBub2Zvcm0gPSBmYWxzZTtcbiAgZXhwb3J0IGxldCB2aXNpYmxlID0gbnVsbDtcbiAgZXhwb3J0IGxldCBsb2FkaW5nID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgYXV0b2ZvY3VzID0gZmFsc2U7XG4gIGV4cG9ydCB7IGNzc0NsYXNzIGFzIGNsYXNzIH07XG5cbiAgY29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXIoKTtcblxuICBmdW5jdGlvbiBoYW5kbGVTdWJtaXQoZSkge1xuICAgIGlmIChlLnRhcmdldC5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgIGRpc3BhdGNoKCdzdWJtaXQnLCBlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZU1lKGUpIHtcbiAgICBpZiAobW9kYWwgJiYgcmVmID09PSBlLnRhcmdldCkge1xuICAgICAgZGlzcGF0Y2goJ2NhbmNlbCcsIGUpO1xuICAgICAgcG9wKGUpO1xuICAgIH1cbiAgfVxuXG4gICQ6IGlmIChyZWYpIHtcbiAgICBpZiAodmlzaWJsZSA9PT0gZmFsc2UpIHBvcCgpO1xuICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICBjb25zdCBmaXggPSAoJ25ldHNjYXBlJyBpbiB3aW5kb3cpICYmIC8gcnY6Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpID8gJycgOiAnLGEnOyAvLyBza2lwIGxpbmtzIG9uIGZpcmVmb3g/XG4gICAgICBjb25zdCBub2RlcyA9IHJlZi5xdWVyeVNlbGVjdG9yQWxsKGBpbnB1dCxzZWxlY3QsYnV0dG9uLHRleHRhcmVhLHN1bW1hcnkke2ZpeH1gKTtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gW107XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKG5vZGVzW2ldLmdldEF0dHJpYnV0ZSgnbm9mb2N1cycpID09PSAnJyB8fCBub2Rlc1tpXS5kYXRhc2V0Lm5vZm9jdXMgPT09ICcnKSBjb250aW51ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBpZiAobm9kZXNbaV0udGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBub2Rlc1tpXS50eXBlID09PSAnaGlkZGVuJykgY29udGludWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgaWYgKG5vZGVzW2ldLnJlYWRPbmx5IHx8IG5vZGVzW2ldLmRpc2FibGVkKSBjb250aW51ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBpZiAobm9kZXNbaV0udGFiSW5kZXggPT09IC0xKSBjb250aW51ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBjaGlsZHJlbi5wdXNoKG5vZGVzW2ldKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbGFzdE5vZGUgPSBjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXTtcbiAgICAgIGNvbnN0IGZpcnN0Tm9kZSA9IGNoaWxkcmVuWzBdO1xuXG4gICAgICBwdXNoKHJlZiwgY2xvc2VNZSwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCwgZmlyc3ROb2RlLCBsYXN0Tm9kZSwgKCkgPT4gbG9hZGluZyk7XG5cbiAgICAgIGlmIChhdXRvZm9jdXMpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKGZpcnN0Tm9kZSAmJiAhbG9hZGluZykgZmlyc3ROb2RlLmZvY3VzKCk7XG4gICAgICAgIH0sIDYwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAkOiBmaXhlZENsYXNzID0gbW9kYWwgPyAnb3ZlcmxheScgOiAnaW5saW5lJztcbiAgJDogZml4ZWRQcm9wcyA9IHsgLi4uKGlkID8geyBpZCB9IDogbnVsbCksIGNsYXNzOiBjc3NDbGFzcyB8fCBudWxsIH07XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAuc21vby1mZW5jZS0tb3ZlcmxheSB7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHotaW5kZXg6IDE7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIC4zKTtcbiAgfVxuXG4gIC5zbW9vLWZlbmNlLS13cmFwcGVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICBib3gtc2hhZG93OiAwIDJweCAzcHggcmdiYSgwLCAwLCAwLCAuMik7XG4gIH1cblxuICAuc21vby1mZW5jZS0tbG9hZGluZyB7XG4gICAgb3BhY2l0eTogLjM7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIH1cblxuICAuc21vby1mZW5jZS0taW5saW5lIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cblxuICAuc21vby1mZW5jZS0tZm9ybSB7XG4gICAgcGFkZGluZzogMTBweDtcbiAgfVxuPC9zdHlsZT5cblxueyNpZiB2aXNpYmxlfVxuICA8ZGl2IGNsYXNzPVwic21vby1mZW5jZS0te2ZpeGVkQ2xhc3N9XCIgb246Y2xpY2s9e2Nsb3NlTWV9IGJpbmQ6dGhpcz17cmVmfSByb2xlPVwiZGlhbG9nXCI+XG4gICAgPGRpdiBjbGFzcz1cInNtb28tZmVuY2UtLXdyYXBwZXJcIj5cbiAgICAgIDxzbG90IG5hbWU9XCJiZWZvcmVcIiAvPlxuXG4gICAgICA8c2xvdCBuYW1lPVwibWFpblwiIHByb3BzPXtmaXhlZFByb3BzfSAvPlxuICAgICAgeyNpZiAhbm9mb3JtfVxuICAgICAgICA8Zm9ybSB7Li4uZml4ZWRQcm9wc30gb246c3VibWl0fHByZXZlbnREZWZhdWx0PXtoYW5kbGVTdWJtaXR9IGNsYXNzOnNtb28tZmVuY2UtLWxvYWRpbmc9e2xvYWRpbmd9IGNsYXNzPVwic21vby1mZW5jZS0tZm9ybVwiPlxuICAgICAgICAgIDxzbG90IC8+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIHsvaWZ9XG5cbiAgICAgIDxzbG90IG5hbWU9XCJhZnRlclwiIC8+XG4gICAgPC9kaXY+XG4gIDwvZGl2Plxuey9pZn1cbiIsICI8c2NyaXB0PlxuICBpbXBvcnQgeyBuYXZpZ2F0ZVRvIH0gZnJvbSAneXJ2JztcbiAgaW1wb3J0IHsgRmVuY2UgfSBmcm9tICdzbW9vJztcblxuICBmdW5jdGlvbiBiYWNrKCkge1xuICAgIGlmICh3aW5kb3cuaGlzdG9yeS5sZW5ndGggPiAxKSB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUbygnLycpO1xuICB9XG48L3NjcmlwdD5cbjxGZW5jZSBub2Zvcm0gYXV0b2ZvY3VzIHZpc2libGUgbW9kYWwgb246Y2FuY2VsPXtiYWNrfT5cbiAgPGRpdiBjbGFzcz1cImZvcm1hdG9yIHBcIiBzbG90PVwibWFpblwiPlxuICAgIDxzbG90IHtiYWNrfSAvPlxuICA8L2Rpdj5cbjwvRmVuY2U+XG4iLCAiPHNjcmlwdD5cbiAgaW1wb3J0IE1vZGFsIGZyb20gJy4vTW9kYWwuc3ZlbHRlJztcbiAgaW1wb3J0IHsgb3B0aW9ucyB9IGZyb20gJy4vZ2lzdHMnO1xuXG4gIC8qIGdsb2JhbCBKU09OU2NoZW1hRmFrZXIgKi9cbiAgY29uc3QgZGVmYXVsdHMgPSBKU09OU2NoZW1hRmFrZXIub3B0aW9uLmdldERlZmF1bHRzKCk7XG4gIGNvbnN0IG9wdHMgPSBPYmplY3Qua2V5cyhkZWZhdWx0cykubWFwKGtleSA9PiBnZXRUeXBlKGtleSwgZGVmYXVsdHNba2V5XSkpO1xuICBjb25zdCB2YWxzID0gW3VuZGVmaW5lZCwgMCwgLTEsIG51bGwsIHRydWUsIGZhbHNlLCAnc3RyaW5nJywgJ251bWJlcicsICdpbnRlZ2VyJywgJ2Jvb2xlYW4nLCAnb2JqZWN0JywgJ2FycmF5J107XG5cbiAgLy8gRklYTUU6IGNvbXBvbmVudGl6ZSBvcHRpb25zLCBzdWJzY3JpYmUgdG8gdGhlbSBhbmQgdXBkYXRlIGdsb2JhbCBqc2Ygb3B0aW9ucyBvbiBjaGFuZ2VcbiAgZnVuY3Rpb24gZ2V0VHlwZShrLCB2KSB7XG4gICAgY29uc3QgZXh0cmFQcm9wcyA9IHsgY2xhc3M6ICdmJyB9O1xuXG4gICAgbGV0IGZpeGVkVHlwZTtcbiAgICBpZiAodiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIGZpeGVkVHlwZSA9ICdkYXRlJztcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodikpIHtcbiAgICAgIGZpeGVkVHlwZSA9ICd0ZXh0JztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ID09PSAnYm9vbGVhbicpIHtcbiAgICAgIGZpeGVkVHlwZSA9ICdjaGVja2JveCc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdiA9PT0gJ251bWJlcicpIHtcbiAgICAgIGZpeGVkVHlwZSA9ICdudW1iZXInO1xuICAgIH0gZWxzZSBpZiAodiA9PT0gbnVsbCB8fCB0eXBlb2YgdiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGsgPT09ICdtYXhJdGVtcycgfHwgayA9PT0gJ21heExlbmd0aCcpIHtcbiAgICAgICAgZml4ZWRUeXBlID0gJ251bWJlcic7XG4gICAgICB9XG5cbiAgICAgIGlmIChrID09PSAncmFuZG9tJyB8fCBrID09PSAnb3B0aW9uYWxzUHJvYmFiaWxpdHknKSB7XG4gICAgICAgIGV4dHJhUHJvcHMuc3RlcCA9IGsgPT09ICdyYW5kb20nID8gJzAuMDEnIDogJzAuMSc7XG4gICAgICAgIGZpeGVkVHlwZSA9ICdudW1iZXInO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9ICgkb3B0aW9ucyAmJiAkb3B0aW9uc1trXSkgfHwgZGVmYXVsdHNba107XG5cbiAgICBpZiAoZml4ZWRUeXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICBleHRyYVByb3BzLmNoZWNrZWQgPSByZXN1bHQ7XG4gICAgICBleHRyYVByb3BzLmNsYXNzID0gJyc7XG4gICAgfSBlbHNlIGlmIChmaXhlZFR5cGUgPT09ICdkYXRlJykge1xuICAgICAgZXh0cmFQcm9wcy52YWx1ZSA9IHYudG9JU09TdHJpbmcoKS5zdWJzdHIoMCwgMTApO1xuICAgIH0gZWxzZSBpZiAoZml4ZWRUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgZXh0cmFQcm9wcy52YWx1ZSA9IHJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoZml4ZWRUeXBlKSB7XG4gICAgICBleHRyYVByb3BzLnR5cGUgPSBmaXhlZFR5cGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmV4dHJhUHJvcHMsXG4gICAgICBuYW1lOiBrLFxuICAgICAgaWQ6IGssXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShlLCBvcHRpb24pIHtcbiAgICBpZiAoISRvcHRpb25zKSAkb3B0aW9ucyA9IHt9O1xuICAgIGlmIChvcHRpb24udHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICRvcHRpb25zW29wdGlvbi5uYW1lXSA9IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpO1xuICAgIH0gZWxzZSBpZiAob3B0aW9uLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICRvcHRpb25zW29wdGlvbi5uYW1lXSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgfSBlbHNlICB7XG4gICAgICAkb3B0aW9uc1tvcHRpb24ubmFtZV0gPSBlLnRhcmdldC52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAkb3B0aW9ucyA9IG51bGw7XG5cbiAgICBPYmplY3Qua2V5cyhkZWZhdWx0cykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtuYW1lPSR7a2V5fV1gKTtcbiAgICAgIGNvbnN0IHsgdHlwZSwgdmFsdWUgfSA9IGdldFR5cGUoa2V5LCBkZWZhdWx0c1trZXldKTtcblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbm9kZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBub2RlLnZhbHVlID0gdmFsdWUuam9pbignLCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG48L3NjcmlwdD5cblxuPE1vZGFsIGxldDpiYWNrPlxuICBSZWZlcmVuY2U6IDxhIGhyZWY9XCIvL2dpdGh1Yi5jb20vanNvbi1zY2hlbWEtZmFrZXIvanNvbi1zY2hlbWEtZmFrZXIvdHJlZS9tYXN0ZXIvZG9jcyNhdmFpbGFibGUtb3B0aW9uc1wiIHRhcmdldD1cIl9ibGFua1wiPmF2YWlsYWJsZSBvcHRpb25zPC9hPlxuXG4gIDxociAvPlxuXG4gIDxmb3JtIG9uOnN1Ym1pdHxwcmV2ZW50RGVmYXVsdD5cbiAgICA8dWwgY2xhc3M9XCJsciBmbHggZmx4LXdwIGdhcCBvcHRzXCI+XG4gICAgICB7I2VhY2ggb3B0cyBhcyBvcHRpb259XG4gICAgICAgIDxsaSBjbGFzcz1cIm5vc2wgZmx4IGdhcFwiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9e29wdGlvbi5pZH0gY2xhc3M9XCJ0ciBjbC02XCI+e29wdGlvbi5uYW1lfTwvbGFiZWw+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmbHgtZ3dcIj5cbiAgICAgICAgICAgIHsjaWYgb3B0aW9uLnR5cGV9XG4gICAgICAgICAgICAgIDxpbnB1dCB7Li4ub3B0aW9ufSBvbjpjaGFuZ2U9e2UgPT4gdXBkYXRlKGUsIG9wdGlvbil9IHRpdGxlPXtvcHRpb24ubmFtZX0+XG4gICAgICAgICAgICB7OmVsc2V9XG4gICAgICAgICAgICAgIDwhLS0gc3ZlbHRlLWlnbm9yZSBhMTF5LW5vLW9uY2hhbmdlIC0tPlxuICAgICAgICAgICAgICA8c2VsZWN0IHsuLi5vcHRpb259IG9uOmNoYW5nZT17ZSA9PiB1cGRhdGUoZSwgb3B0aW9uKX0gdGl0bGU9e29wdGlvbi5uYW1lfT5cbiAgICAgICAgICAgICAgICB7I2VhY2ggdmFscyBhcyB2YWx1ZX1cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24ge3ZhbHVlfSBzZWxlY3RlZD17dmFsdWUgPT09IG9wdGlvbi52YWx1ZX0+e3R5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgOiAnJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvbGk+XG4gICAgICB7L2VhY2h9XG4gICAgPC91bD5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnVcIiBvbjpjbGljaz17cmVzZXR9IGRpc2FibGVkPXskb3B0aW9ucyA9PT0gbnVsbH0+UmVzZXQgdG8gZGVmYXVsdHM8L2J1dHRvbj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnVcIiBvbjpjbGljaz17YmFja30+QXBwbHk8L2J1dHRvbj5cbiAgPC9mb3JtPlxuXG4gIDxociAvPlxuXG4gIDxhIGhyZWY9XCIjZ2lzdC9kYTBhZjQ2MTFjYjU2MjJiNTRhZmY1NzI4MzU2MGRhM1wiPmJvb2xlYW48L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0LzQxOTljYTkwZmI1Y2QwNTMzNzgyNGIwNjk1ZDE3YjVlXCI+aW50ZWdlcjwvYT4gfFxuICA8YSBocmVmPVwiI2dpc3QvZDllMjc1NDNkODQxNTdjMTY3MmY4N2U5M2FjMjUwY2NcIj5pbm5lci1yZWZlcmVuY2VzPC9hPiB8XG4gIDxhIGhyZWY9XCIjZ2lzdC81ZjgxZjExOGZiZDRlYWMwMWNjYWNmMjNhMDYxYThiOVwiPmV4dGVybmFsLXJlZmVyZW5jZXM8L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0L2NiYjQ4NzFkMWQyZjQ0NzYwZGRhZmRhYTA1NmUxOTI2XCI+ZW51bXM8L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0LzFmMTE5Njg0NGJlYWQ5NmUwMjFmZmJkNTk3ZWRjZmZhXCI+Zml4ZWQgdmFsdWVzPC9hPiB8XG4gIDxhIGhyZWY9XCIjZ2lzdC9mNGFkMTgxODczNWYwZDBiYWJkYzFmMTJiOTIwMTNmMVwiPm4tdGltZXMgcmVwZWF0ZWQ8L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0LzE5MDI3MzdlN2JlZjk1NzNhZjAyYTNmYzQ5NzYxYzEzXCI+ZmFrZXItcHJvcGVydGllczwvYT4gfFxuICA8YSBocmVmPVwiI2dpc3QvMWE3ZGIxNzMzNjJiMTI3YTgyNmE1YzJmYTdkZTc1NjFcIj5mYWtlci5mYWtlKCk8L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0LzVkZDM2NGFhZDJkNDg3MjllZmZmNjg2YzVmN2M0NGIyXCI+Y2hhbmNlLWd1aWQ8L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0LzY4MmY5N2EyZTI4ZTIzMGI1MTgxMGM1NWI5MmY0Y2RjXCI+Y2hhbmNlLW5hbWU8L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0LzQyNmMyZDE3NzI0M2NkMmM1MjU5NGY5MmMxYTc4NjJlXCI+Y2hhbmNlLXByb3BlcnRpZXM8L2E+IHxcbiAgPGEgaHJlZj1cIiNnaXN0L2QzZTc1YjIyYWQzM2U0NDQwZGYxOWUwY2MwNjBjOWYzLzAuNS4wLXJjM1wiPnJlbW90ZS1zY2hlbWFzICheMC41LngpPC9hPlxuXG4gIDxociAvPlxuXG4gIDxhIGhyZWY9XCJodHRwOi8vanNvbi1zY2hlbWEub3JnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SlNPTi1TY2hlbWEub3JnPC9hPiB8XG4gIDxhIGhyZWY9XCIvL2dpdGh1Yi5jb20vanNvbi1zY2hlbWEtZmFrZXIvanNvbi1zY2hlbWEtZmFrZXIvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+R2l0SHViPC9hPiAvIDxhIGhyZWY9XCIvL3RyYXZpcy1jaS5vcmcvanNvbi1zY2hlbWEtZmFrZXIvanNvbi1zY2hlbWEtZmFrZXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj5DSTwvYT4gfFxuICA8YSBocmVmPVwiLy9naXRodWIuY29tL2pzb24tc2NoZW1hLWZha2VyL2pzb24tc2NoZW1hLWZha2VyL2lzc3Vlcy9uZXdcIiB0YXJnZXQ9XCJfYmxhbmtcIj5Db250cmlidXRpb248L2E+IHxcbiAgPGEgaHJlZj1cIi8vZ2l0aHViLmNvbS9qc29uLXNjaGVtYS1mYWtlci9hbmd1bGFyLWpzZlwiIHRhcmdldD1cIl9ibGFua1wiPkFuZ3VsYXJKUyBtb2R1bGU8L2E+IHxcbiAgPGEgaHJlZj1cIi8vZ2l0aHViLmNvbS9qc29uLXNjaGVtYS1mYWtlci9ncnVudC1qc29uc2NoZW1hLWZha2VyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+R3J1bnQgcGx1Z2luPC9hPiB8XG4gIDxhIGhyZWY9XCIvL2dpdGh1Yi5jb20vanNvbi1zY2hlbWEtZmFrZXIvanNvbi1zY2hlbWEtc2VydmVyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SlNGIFNlcnZlcjwvYT5cbjwvTW9kYWw+XG4iLCAiTm90IHlldCBpbXBsZW1lbnRlZC4uLlxuIiwgIjxzY3JpcHQ+XG4gIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xuICBpbXBvcnQgeyBuYXZpZ2F0ZVRvIH0gZnJvbSAneXJ2JztcbiAgaW1wb3J0IHsgYWxsLCBsb2dnZWRJbiB9IGZyb20gJy4vZ2lzdHMnO1xuXG4gIGxldCB0ZXJtID0gJyc7XG4gIGxldCBkYXRhID0gW107XG4gIGxldCBwZW5kaW5nID0gdHJ1ZTtcblxuICBvbk1vdW50KGFzeW5jICgpID0+IHtcbiAgICBpZiAoJGxvZ2dlZEluKSBkYXRhID0gYXdhaXQgYWxsKCk7XG4gICAgcGVuZGluZyA9IGZhbHNlO1xuICB9KTtcblxuICAkOiBmaWx0ZXJlZCA9IGRhdGEuZmlsdGVyKHggPT5cbiAgICAhdGVybVxuICAgIHx8IHguZGVzY3JpcHRpb24udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh0ZXJtLnRvTG93ZXJDYXNlKCkpXG4gICAgfHwgT2JqZWN0LmtleXMoeC5maWxlcykuc29tZShrID0+IGsudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh0ZXJtLnRvTG93ZXJDYXNlKCkpKSk7XG48L3NjcmlwdD5cbjxsYWJlbCBjbGFzcz1cIm1iIGZseCBmbHgtYyBub3NsXCI+XG4gIDxzcGFuPkZpbHRlciBnaXN0czo8L3NwYW4+XG4gIDxpbnB1dCBjbGFzcz1cImYgbWwgZmx4LWFcIiB0eXBlPVwic2VhcmNoXCIgYmluZDp2YWx1ZT17dGVybX0gLz5cbjwvbGFiZWw+XG57I2lmICRsb2dnZWRJbn1cbiAgeyNpZiBwZW5kaW5nfVxuICAgIExvYWRpbmcgZ2lzdHMuLi5cbiAgezplbHNlfVxuICAgIDxvbCBjbGFzcz1cImxyIHpiIG1heFwiPlxuICAgICAgeyNlYWNoIGZpbHRlcmVkIGFzIGl0ZW19XG4gICAgICAgIDxsaSBjbGFzcz1cIm1iIG5pXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZseCBmbHgtY1wiPlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJ0ZG4gdHIgZmx4LWFcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwie2l0ZW0uaHRtbF91cmx9XCI+e2l0ZW0uZGVzY3JpcHRpb24gfHwgaXRlbS5pZH08L2E+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnUgbWluIHRyIG5vc2xcIiBvbjpjbGljaz17KCkgPT4gbmF2aWdhdGVUbyhgLyNnaXN0LyR7aXRlbS5pZH1gKX0+TG9hZCBnaXN0PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHVsIGNsYXNzPVwibHJcIj5cbiAgICAgICAgICAgIHsjZWFjaCBPYmplY3QuZW50cmllcyhpdGVtLmZpbGVzKSBhcyBbZmlsZSwgaW5mb119XG4gICAgICAgICAgICAgIDxsaSBjbGFzcz1cIm5pXCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJhcnIgYmxcIiB0aXRsZT1cIlR5cGU6IHtpbmZvLnR5cGV9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIntpbmZvLnJhd191cmx9XCI+e2ZpbGV9ICZtZGFzaDsgeyhpbmZvLnNpemUgLyAxMDI0KS50b0ZpeGVkKDIpfUtCPC9hPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgey9lYWNofVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvbGk+XG4gICAgICB7L2VhY2h9XG4gICAgPC9vbD5cbiAgey9pZn1cbnsvaWZ9XG4iLCAiPHNjcmlwdD5cbiAgaW1wb3J0IHsgb25Nb3VudCwgY3JlYXRlRXZlbnREaXNwYXRjaGVyIH0gZnJvbSAnc3ZlbHRlJztcblxuICBsZXQgY3NzQ2xhc3MgPSAnJztcblxuICBleHBvcnQgbGV0IG1vZGUgPSAnamF2YXNjcmlwdCc7XG4gIGV4cG9ydCBsZXQgdGhlbWUgPSAnZ2l0aHViJztcbiAgZXhwb3J0IGxldCB2YWx1ZSA9ICcnO1xuICBleHBvcnQgbGV0IHJlYWRvbmx5ID0gZmFsc2U7XG5cbiAgZXhwb3J0IHsgY3NzQ2xhc3MgYXMgY2xhc3MgfTtcblxuICBsZXQgdGFyZ2V0O1xuICBsZXQgdGFyZ2V0RWxlbWVudDtcblxuICBjb25zdCBkaXNwYXRjaCA9IGNyZWF0ZUV2ZW50RGlzcGF0Y2hlcigpO1xuXG4gIC8qIGdsb2JhbCBhY2UgKi9cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgdGFyZ2V0RWxlbWVudCA9IGFjZS5lZGl0KHRhcmdldCk7XG4gICAgdGFyZ2V0RWxlbWVudC5zZXNzaW9uLnNldFRhYlNpemUoMik7XG4gICAgdGFyZ2V0RWxlbWVudC5zZXRTaG93UHJpbnRNYXJnaW4oZmFsc2UpO1xuICAgIHRhcmdldEVsZW1lbnQuc2V0T3B0aW9uKCdzaG93TGluZU51bWJlcnMnLCBmYWxzZSk7XG5cbiAgICBpZiAocmVhZG9ubHkpIHRhcmdldEVsZW1lbnQuc2V0UmVhZE9ubHkodHJ1ZSk7XG5cbiAgICB0YXJnZXRFbGVtZW50LnNlc3Npb24ub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKCdjaGFuZ2UnLCB0YXJnZXRFbGVtZW50LmdldFZhbHVlKCkpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHRhcmdldEVsZW1lbnQuZGVzdHJveSgpO1xuICB9KTtcblxuICAkOiBpZiAodGFyZ2V0RWxlbWVudCkge1xuICAgIGlmICh0YXJnZXRFbGVtZW50LmdldFZhbHVlKCkgIT09IHZhbHVlKSB7XG4gICAgICB0YXJnZXRFbGVtZW50LnNldFZhbHVlKHZhbHVlKTtcbiAgICAgIHRhcmdldEVsZW1lbnQuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICB0YXJnZXRFbGVtZW50LnNldFRoZW1lKGBhY2UvdGhlbWUvJHt0aGVtZX1gKTtcbiAgICB0YXJnZXRFbGVtZW50LnNlc3Npb24uc2V0TW9kZShgYWNlL21vZGUvJHttb2RlfWApO1xuICB9XG48L3NjcmlwdD5cblxuPGRpdiBjbGFzcz1cIkFjZS13cmFwcGVyIHJlbFwiPlxuICA8ZGl2IGNsYXNzPVwiQWNlIHtjc3NDbGFzc31cIiBiaW5kOnRoaXM9e3RhcmdldH0gLz5cbiAgPHNsb3QgLz5cbjwvZGl2PlxuIiwgIjxzY3JpcHQ+XG4gIGltcG9ydCB7IHJvdXRlciB9IGZyb20gJ3lydic7XG4gIGltcG9ydCBJY29uIGZyb20gJy4vSWNvbi5zdmVsdGUnO1xuICBpbXBvcnQgQWNlIGZyb20gJy4vQWNlLnN2ZWx0ZSc7XG4gIGltcG9ydCBUb2dnbGUgZnJvbSAnLi9Ub2dnbGUuc3ZlbHRlJztcbiAgaW1wb3J0IHsgc2NoZW1hcywgY3VycmVudCwgb3B0aW9ucywgbG9hZEZyb20gfSBmcm9tICcuL2dpc3RzJztcblxuICBjb25zdCBpbml0aWFsTG9jYXRpb25IYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cbiAgbGV0IGRhdGE7XG4gIGxldCBpbnB1dDtcbiAgbGV0IGJ1ZmZlcjtcbiAgbGV0IHNlbGVjdGVkO1xuICBsZXQgaXNBZGRpbmc7XG4gIGxldCBpc0VkaXRpbmc7XG4gIGxldCBwcmV2aXVzVVJMO1xuXG4gIGxldCB2YWx1ZSA9IG51bGw7XG4gIGxldCBpc1lBTUwgPSBmYWxzZTtcbiAgbGV0IEVuY29kZXIgPSBKU09OO1xuICBsZXQgcGVuZGluZyA9IHRydWU7XG4gIGxldCBlZGl0SW5wdXQgPSAne30nO1xuICBsZXQgb3V0cHV0TW9kZSA9ICdqc29uJztcbiAgbGV0IG9iamVjdE91dHB1dCA9ICd7fSc7XG5cbiAgZnVuY3Rpb24gY2xvc2UoZSkge1xuICAgIGlmIChpbnB1dCAmJiAoaXNBZGRpbmcgfHwgaXNFZGl0aW5nKSkge1xuICAgICAgaWYgKGlzQWRkaW5nKSB7XG4gICAgICAgICRjdXJyZW50ID0gc2VsZWN0ZWQgfHwgJHNjaGVtYXNbJHNjaGVtYXMubGVuZ3RoIC0gMV07XG4gICAgICB9XG5cbiAgICAgIGlzQWRkaW5nID0gZmFsc2U7XG4gICAgICBpc0VkaXRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3QoZSwgZWRpdCkge1xuICAgICRjdXJyZW50ID0gc2VsZWN0ZWQgPSBlO1xuICAgIGlzQWRkaW5nID0gZmFsc2U7XG4gICAgaXNFZGl0aW5nID0gISFlZGl0O1xuXG4gICAgaWYgKGVkaXQpIHNldFRpbWVvdXQoKCkgPT4gaW5wdXQuc2VsZWN0KCksIDYwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZShlKSB7XG4gICAgaWYgKCFjb25maXJtKGBUaGlzIGFjdGlvbiB3aWxsIHJlbW92ZSB0aGUgJyR7ZS5maWxlbmFtZX0nIGZpbGUuXFxuXFxuQXJlIHlvdSBzdXJlP2AudHJpbSgpKSkgcmV0dXJuO1xuXG4gICAgY29uc3Qgb2Zmc2V0ID0gJHNjaGVtYXMuaW5kZXhPZihlKTtcblxuICAgICRzY2hlbWFzID0gJHNjaGVtYXMuZmlsdGVyKHggPT4geCAhPT0gZSk7XG5cbiAgICBpZiAoZS5maWxlbmFtZSA9PT0gJGN1cnJlbnQuZmlsZW5hbWUpIHtcbiAgICAgIGJ1ZmZlciA9IGVkaXRJbnB1dCA9ICcnO1xuICAgICAgJGN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlKGUpIHtcbiAgICBjb25zdCBpc1ZhbGlkID0gL15bYS16QS1aMC05XyMkJV1bXFx3Ll0qPyQvLnRlc3QoZS50YXJnZXQudmFsdWUpO1xuXG4gICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQnKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICghZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnZhbGlkJykpIHtcbiAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2ludmFsaWQnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoZSkge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSBjbG9zZSgpO1xuICAgIGlmICh2YWxpZGF0ZShlKSAmJiBlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAkY3VycmVudC5maWxlbmFtZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgaXNFZGl0aW5nID0gZmFsc2U7XG4gICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN1Ym1pdChlKSB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIGNsb3NlKCk7XG4gICAgaWYgKHZhbGlkYXRlKGUpICYmIGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICRzY2hlbWFzID0gJHNjaGVtYXMuY29uY2F0KHsgZmlsZW5hbWU6IGUudGFyZ2V0LnZhbHVlLCBjb250ZW50OiBidWZmZXIgfSk7XG4gICAgICAkY3VycmVudCA9ICRzY2hlbWFzWyRzY2hlbWFzLmxlbmd0aCAtIDFdO1xuICAgICAgaXNBZGRpbmcgPSBmYWxzZTtcbiAgICAgIGUudGFyZ2V0LnZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgLy8gRklYTUU6IGhvdyBmb3JtYXR0aW5nIHNob3VsZCB3b3JrP1xuICAvLyBpdCBzaG91bGQgbm90IGFmZmVjdCBjdXJyZW50IHN0YXRlLCBqdXN0IGZvcm1hdHRpbmchXG4gIGZ1bmN0aW9uIHJlZnJlc2goKSB7XG4gICAgdHJ5IHtcbiAgICAgIGVkaXRJbnB1dCA9IEpTT04uc3RyaW5naWZ5KEpTT04ucGFyc2UoJGN1cnJlbnQuY29udGVudCksIG51bGwsIDIpO1xuICAgICAgLy8gaWYgKGlzWUFNTCkge1xuICAgICAgLy8gICAvLyBvdXRwdXRNb2RlID0gJ3lhbWwnO1xuICAgICAgLy8gICAvLyBFbmNvZGVyID0gWUFNTDtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvLyAgIGVkaXRJbnB1dCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlLCBudWxsLCAyKTtcbiAgICAgIC8vICAgLy8gb3V0cHV0TW9kZSA9ICdqc29uJztcbiAgICAgIC8vICAgLy8gRW5jb2RlciA9IEpTT047XG4gICAgICAvLyB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZWRpdElucHV0ID0gJGN1cnJlbnQuY29udGVudDtcbiAgICAgIC8vIG91dHB1dE1vZGUgPSAnanNvbic7XG4gICAgICAvLyBFbmNvZGVyID0gSlNPTjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXQoZSkge1xuICAgIHZhbHVlID0gRW5jb2Rlci5wYXJzZSgkY3VycmVudC5jb250ZW50KTtcbiAgICBpc1lBTUwgPSBlLmRldGFpbDtcbiAgICByZWZyZXNoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBzeW5jKGUpIHtcbiAgICBidWZmZXIgPSBlLmRldGFpbDtcbiAgICBpZiAoJGN1cnJlbnQpICRjdXJyZW50LmNvbnRlbnQgPSBidWZmZXI7XG4gIH1cblxuICBmdW5jdGlvbiBhZGQoKSB7XG4gICAgYnVmZmVyID0gZWRpdElucHV0ID0gJyc7XG4gICAgc2VsZWN0ZWQgPSAkY3VycmVudDtcbiAgICBpc0FkZGluZyA9IHRydWU7XG4gICAgJGN1cnJlbnQgPSBudWxsO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiBpbnB1dC5mb2N1cygpLCA2MCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZW4oKSB7XG4gICAgY29uc3Qgb3B0cyA9IHsgLi4uJG9wdGlvbnMgfTtcbiAgICBjb25zdCB2YWx1ZSA9IG9wdHMucmFuZG9tO1xuXG4gICAgb3B0cy5yYW5kb20gPSB2YWx1ZVxuICAgICAgPyAoKCkgPT4gdmFsdWUpXG4gICAgICA6IE1hdGgucmFuZG9tO1xuXG4gICAgbGV0IHNjaGVtYSA9IHt9O1xuICAgIGxldCByZWZzID0gW107XG5cbiAgICB0cnkge1xuICAgICAgc2NoZW1hID0gRW5jb2Rlci5wYXJzZSgkY3VycmVudC5jb250ZW50KTtcbiAgICAgIHJlZnMgPSAkc2NoZW1hcy5tYXAoeCA9PiBFbmNvZGVyLnBhcnNlKHguY29udGVudCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG5cbiAgICBKU09OU2NoZW1hRmFrZXIub3B0aW9uKG9wdHMpO1xuICAgIEpTT05TY2hlbWFGYWtlci5yZXNvbHZlKHNjaGVtYSwgcmVmcylcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7IG9iamVjdE91dHB1dCA9IEVuY29kZXIuc3RyaW5naWZ5KHJlc3VsdCwgbnVsbCwgMik7IH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gYWxlcnQoZXJyb3IubWVzc2FnZSkpO1xuICB9XG5cbiAgcm91dGVyLnN1YnNjcmliZShhc3luYyBpbmZvID0+IHtcbiAgICBpZiAoIXdpbmRvdy5sb2NhdGlvbi5oYXNoIHx8IHdpbmRvdy5sb2NhdGlvbi5oYXNoLm1hdGNoKC9eIyhvcHRpb25zfHNlc3Npb24pLykpIHtcbiAgICAgIHBlbmRpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5wYXRoID09PSBwcmV2aXVzVVJMKSByZXR1cm47XG4gICAgcHJldml1c1VSTCA9IGluZm8ucGF0aDtcblxuICAgIGRhdGEgPSBhd2FpdCBsb2FkRnJvbShpbmZvLnBhdGguc3Vic3RyKDEpKTtcbiAgICBidWZmZXIgPSBlZGl0SW5wdXQgPSAnJztcbiAgICBwZW5kaW5nID0gZmFsc2U7XG4gICAgaXNBZGRpbmcgPSBmYWxzZTtcbiAgICBpc0VkaXRpbmcgPSBmYWxzZTtcblxuICAgICRzY2hlbWFzID0gT2JqZWN0LmtleXMoZGF0YS5maWxlcylcbiAgICAgIC5maWx0ZXIoeCA9PiBbJ3RleHQvcGxhaW4nLCAnYXBwbGljYXRpb24vanNvbiddLmluY2x1ZGVzKGRhdGEuZmlsZXNbeF0udHlwZSkpXG4gICAgICAucmVkdWNlKChwcmV2LCBjdXIpID0+IHtcbiAgICAgICAgcHJldi5wdXNoKGRhdGEuZmlsZXNbY3VyXSk7XG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgfSwgW10pO1xuXG4gICAgJGN1cnJlbnQgPSAkc2NoZW1hc1swXTtcbiAgfSk7XG5cbiAgJDogaWYgKCRjdXJyZW50KSB7XG4gICAgcmVmcmVzaCgpO1xuICB9IGVsc2Uge1xuICAgIG9iamVjdE91dHB1dCA9ICd7fSc7XG4gICAgYnVmZmVyID0gZWRpdElucHV0ID0gJyc7XG4gICAgJGN1cnJlbnQgPSB7IGNvbnRlbnQ6ICcnIH07XG4gIH1cbjwvc2NyaXB0PlxuXG48ZGl2IGNsYXNzPVwibm9zbFwiPlxuICB7I2lmIHBlbmRpbmd9XG4gICAgTG9hZGluZyBnaXN0Li4uXG4gIHs6ZWxzZX1cbiAgICA8ZGl2IGNsYXNzPVwiZmx4IFRhYnNcIj5cbiAgICAgIHsjZWFjaCAkc2NoZW1hcyBhcyBpbmZvfVxuICAgICAgICB7I2lmICRjdXJyZW50ID09PSBpbmZvfVxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VsXCI+XG4gICAgICAgICAgICB7I2lmIGlzRWRpdGluZ31cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwibmJcIiBvbjpibHVyPXtjbG9zZX0gb246a2V5dXA9e3VwZGF0ZX0gYmluZDp0aGlzPXtpbnB1dH0gdHlwZT1cInRleHRcIiBzcGVsbGNoZWNrPVwiZmFsc2VcIiB2YWx1ZT17aW5mby5maWxlbmFtZX0gLz5cbiAgICAgICAgICAgIHs6ZWxzZX1cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkaWJcIiBvbjpkYmxjbGljaz17KCkgPT4gc2VsZWN0KGluZm8sIHRydWUpfT57aW5mby5maWxlbmFtZX08L3NwYW4+XG4gICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm5iIHgtY2xvc2VcIiBvbjpjbGljaz17KCkgPT4gcmVtb3ZlKGluZm8pfT4mdGltZXM7PC9idXR0b24+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICB7OmVsc2V9XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmbHhcIj5cbiAgICAgICAgICAgIDxidXR0b24gb246Y2xpY2s9eygpID0+IHNlbGVjdChpbmZvKX0+e2luZm8uZmlsZW5hbWV9PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibmIgeC1jbG9zZVwiIG9uOmNsaWNrPXsoKSA9PiByZW1vdmUoaW5mbyl9PiZ0aW1lczs8L2J1dHRvbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIHsvaWZ9XG4gICAgICB7L2VhY2h9XG4gICAgICAgIHsjaWYgaXNBZGRpbmd9XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWxcIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIm5iXCIgb246Ymx1cj17Y2xvc2V9IG9uOmtleXVwPXtzdWJtaXR9IGJpbmQ6dGhpcz17aW5wdXR9IHR5cGU9XCJ0ZXh0XCIgc3BlbGxjaGVjaz1cImZhbHNlXCIgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIHs6ZWxzZX1cbiAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhIG5iIG5ia1wiIG9uOmNsaWNrPXthZGR9PlxuICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwicGx1c1wiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIHsvaWZ9XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1kLWZseFwiPlxuICAgICAgPEFjZSBtb2RlPXtvdXRwdXRNb2RlfSB2YWx1ZT17ZWRpdElucHV0fSBvbjpjaGFuZ2U9e3N5bmN9PlxuICAgICAgICA8IS0tPGRpdiBjbGFzcz1cImFicyByMCB0MFwiPlxuICAgICAgICAgIDxUb2dnbGUgb249XCJZQU1MXCIgb2ZmPVwiSlNPTlwiIG9uOmNoYW5nZT17Zm9ybWF0fSB2YWx1ZT17aXNZQU1MfSAvPlxuICAgICAgICA8L2Rpdj4tLT5cbiAgICAgIDwvQWNlPlxuICAgICAgPEFjZSBtb2RlPXtvdXRwdXRNb2RlfSB2YWx1ZT17b2JqZWN0T3V0cHV0fSByZWFkb25seT5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhYnMgcjAgdDBcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnVcIiBvbjpjbGljaz17Z2VufT5HZW5lcmF0ZTwvYnV0dG9uPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L0FjZT5cbiAgICA8L2Rpdj5cbiAgey9pZn1cbjwvZGl2PlxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBRUEsV0FBTyxlQUFlLFNBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBRTVELGFBQVNBLFFBQU87QUFBQSxJQUFFO0FBQ2xCLFFBQU0sV0FBVyxPQUFLO0FBQ3RCLGFBQVND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QUFFLENBQUM7QUFFbEQsV0FBTyxRQUFRLGFBQWEsTUFBTSxJQUFJLFFBQVE7QUFFOUMsUUFBSSxPQUFPLFFBQVE7QUFDakIsYUFBTyxNQUFNO0FBQUEsSUFDZjtBQUFBLEVBQ0YsQ0FBQztBQUNILFdBQVcsT0FBTyxTQUFTLE9BQU8sU0FBUyxTQUFTLEdBQUc7QUFDckQsUUFBTSxVQUFVLE9BQU8sU0FBUyxPQUFPLE1BQU0sb0JBQW9CLEVBQUUsQ0FBQztBQUNwRSxRQUFNLFFBQVEsUUFBUSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsUUFBUSxPQUFPLEdBQUc7QUFFdEQsUUFBTSxLQUFLO0FBQ2IsT0FBTztBQUNMLGFBQVcsTUFBTTtBQUNmLGFBQVMsY0FBYyxrQkFBa0IsRUFBRSxVQUFVLElBQUksVUFBVTtBQUNuRSxTQUFLO0FBQUEsRUFDUCxHQUFHLElBQUk7QUFDVDsiLAogICJuYW1lcyI6IFsibm9vcCIsICJhc3NpZ24iLCAiZWxlbWVudCIsICJydW4iLCAiYmxhbmtfb2JqZWN0IiwgInJ1bl9hbGwiLCAiaXNfZnVuY3Rpb24iLCAic2FmZV9ub3RfZXF1YWwiLCAidXJsIiwgImlzX2VtcHR5IiwgInN1YnNjcmliZSIsICJnZXRfc3RvcmVfdmFsdWUiLCAiY29tcG9uZW50X3N1YnNjcmliZSIsICJjcmVhdGVfc2xvdCIsICJnZXRfc2xvdF9jb250ZXh0IiwgImdldF9zbG90X2NoYW5nZXMiLCAidXBkYXRlX3Nsb3RfYmFzZSIsICJnZXRfYWxsX2RpcnR5X2Zyb21fc2NvcGUiLCAiZXhjbHVkZV9pbnRlcm5hbF9wcm9wcyIsICJzZXRfc3RvcmVfdmFsdWUiLCAiaXNfaHlkcmF0aW5nIiwgInN0YXJ0X2h5ZHJhdGluZyIsICJlbmRfaHlkcmF0aW5nIiwgImNoaWxkcmVuIiwgImN1cnJlbnQiLCAiYXBwZW5kIiwgImFwcGVuZF9zdHlsZXMiLCAiZ2V0X3Jvb3RfZm9yX3N0eWxlIiwgImFwcGVuZF9zdHlsZXNoZWV0IiwgImluc2VydCIsICJkZXRhY2giLCAiZGVzdHJveV9lYWNoIiwgImlzIiwgInN2Z19lbGVtZW50IiwgInRleHQiLCAic3BhY2UiLCAiZW1wdHkiLCAibGlzdGVuIiwgIm9wdGlvbnMiLCAicHJldmVudF9kZWZhdWx0IiwgImF0dHIiLCAic2V0X2F0dHJpYnV0ZXMiLCAieGxpbmtfYXR0ciIsICJzZXRfZGF0YSIsICJzZXRfaW5wdXRfdmFsdWUiLCAic2VsZWN0X29wdGlvbiIsICJzZWxlY3Rfb3B0aW9ucyIsICJjcm9zc29yaWdpbiIsICJ0b2dnbGVfY2xhc3MiLCAiY3VzdG9tX2V2ZW50IiwgImhhc2giLCAidCIsICJ0aWNrIiwgInNldF9jdXJyZW50X2NvbXBvbmVudCIsICJnZXRfY3VycmVudF9jb21wb25lbnQiLCAiYmVmb3JlVXBkYXRlIiwgIm9uTW91bnQiLCAiYWZ0ZXJVcGRhdGUiLCAib25EZXN0cm95IiwgImNyZWF0ZUV2ZW50RGlzcGF0Y2hlciIsICJzZXRDb250ZXh0IiwgImdldENvbnRleHQiLCAiZ2V0QWxsQ29udGV4dHMiLCAiaGFzQ29udGV4dCIsICJidWJibGUiLCAiZGlydHlfY29tcG9uZW50cyIsICJiaW5kaW5nX2NhbGxiYWNrcyIsICJyZW5kZXJfY2FsbGJhY2tzIiwgImZsdXNoX2NhbGxiYWNrcyIsICJyZXNvbHZlZF9wcm9taXNlIiwgInVwZGF0ZV9zY2hlZHVsZWQiLCAic2NoZWR1bGVfdXBkYXRlIiwgImZsdXNoIiwgImFkZF9yZW5kZXJfY2FsbGJhY2siLCAic2Vlbl9jYWxsYmFja3MiLCAiZmx1c2hpZHgiLCAidXBkYXRlIiwgIm91dHJvaW5nIiwgIm91dHJvcyIsICJncm91cF9vdXRyb3MiLCAiY2hlY2tfb3V0cm9zIiwgInRyYW5zaXRpb25faW4iLCAidHJhbnNpdGlvbl9vdXQiLCAiaW5pdCIsICJwcm9taXNlIiwgImJsb2NrIiwgImN1cnJlbnRfY29tcG9uZW50IiwgImdsb2JhbHMiLCAiY3JlYXRlX2VhY2hfYmxvY2siLCAiZ2V0X3NwcmVhZF91cGRhdGUiLCAiZ2V0X3NwcmVhZF9vYmplY3QiLCAiZGVidWciLCAiY3JlYXRlX2NvbXBvbmVudCIsICJtb3VudF9jb21wb25lbnQiLCAib25fZGVzdHJveSIsICJkZXN0cm95X2NvbXBvbmVudCIsICJtYWtlX2RpcnR5IiwgImluc3RhbmNlIiwgImNyZWF0ZV9mcmFnbWVudCIsICJub3RfZXF1YWwiLCAiU3ZlbHRlQ29tcG9uZW50IiwgIlN2ZWx0ZUNvbXBvbmVudERldiIsICJTdmVsdGVDb21wb25lbnRUeXBlZCIsICJzdWJzY3JpYmVyX3F1ZXVlIiwgIndyaXRhYmxlIiwgInVwZGF0ZSIsICJzdWJzY3JpYmUiLCAicnVuIiwgInN5bmMiLCAid3JpdGFibGUiLCAibG9nZ2VkSW4iLCAic2Vzc2lvbiIsICJzY2hlbWFzIiwgImN1cnJlbnQiLCAib3B0aW9ucyIsICJ1cmwiLCAibG9hZEZyb20iLCAiZGF0YSIsICJhdXRoIiwgInRva2VuSWQiLCAiYWxsIiwgIm1lIiwgImltcG9ydF9naXN0cyIsICJvcHRpb25zIiwgImVsZW1lbnQiLCAidGV4dCIsICJlbGVtZW50IiwgImRldGFjaCIsICJ1cGRhdGUiLCAib3B0aW9ucyIsICJpbnN0YW5jZSIsICJjcmVhdGVfZnJhZ21lbnQiLCAiYXBwZW5kX3N0eWxlcyIsICJhdHRyIiwgInVwZGF0ZSIsICJzdWJzY3JpYmUiLCAicnVuIiwgIl9fY3JlYXRlIiwgIl9fZGVmUHJvcCIsICJfX2dldE93blByb3BEZXNjIiwgIl9fZ2V0T3duUHJvcE5hbWVzIiwgIl9fZ2V0UHJvdG9PZiIsICJfX2hhc093blByb3AiLCAiX19jb21tb25KUyIsICJvcHRpb25zIiwgInB1c2giLCAicm91dGVJbmZvIiwgIlJvdXRlciIsICJSb3V0ZXIyIiwgInVybCIsICJjdXJyZW50VVJMIiwgIm9wdGlvbnMiLCAiY3R4IiwgIm9uRXJyb3IiLCAiY3R4IiwgInQiLCAiY3JlYXRlX2lmX2Jsb2NrIiwgInVuYXNzaWduUm91dGUiLCAiY3R4IiwgInQiLCAiY3R4IiwgImNyZWF0ZV9pZl9ibG9ja18xIiwgImN0eCIsICJjcmVhdGVfaWZfYmxvY2siLCAidXBkYXRlIiwgImN1cnJlbnQiLCAiY2hpbGRyZW4iLCAiY3R4IiwgImNyZWF0ZV9pZl9ibG9jayIsICIkb3B0aW9ucyIsICJ1cGRhdGUiLCAiY3R4IiwgImNyZWF0ZV9pZl9ibG9ja18xIiwgImNyZWF0ZV9pZl9ibG9jayIsICJjdHgiLCAiY3R4IiwgImN0eCIsICJjcmVhdGVfaWZfYmxvY2tfMyIsICJ0IiwgImNyZWF0ZV9pZl9ibG9ja18yIiwgInVwZGF0ZSIsICJzeW5jIiwgIiRvcHRpb25zIiwgInZhbHVlIl0KfQo=
