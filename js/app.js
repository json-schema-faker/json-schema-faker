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
      return !!value && (typeof value === "object" || typeof value === "function") && typeof value.then === "function";
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
    function split_css_unit(value) {
      const split = typeof value === "string" && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
      return split ? [parseFloat(split[1]), split[2] || "px"] : [value, "px"];
    }
    var contenteditable_truthy_values = ["", true, 1, "true", "contenteditable"];
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
    var globals2 = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
    var ResizeObserverSingleton2 = class _ResizeObserverSingleton {
      constructor(options3) {
        this.options = options3;
        this._listeners = "WeakMap" in globals2 ? /* @__PURE__ */ new WeakMap() : void 0;
      }
      observe(element3, listener) {
        this._listeners.set(element3, listener);
        this._getObserver().observe(element3, this.options);
        return () => {
          this._listeners.delete(element3);
          this._observer.unobserve(element3);
        };
      }
      _getObserver() {
        var _a;
        return (_a = this._observer) !== null && _a !== void 0 ? _a : this._observer = new ResizeObserver((entries) => {
          var _a2;
          for (const entry of entries) {
            _ResizeObserverSingleton.entries.set(entry.target, entry);
            (_a2 = this._listeners.get(entry.target)) === null || _a2 === void 0 ? void 0 : _a2(entry);
          }
        });
      }
    };
    ResizeObserverSingleton2.entries = "WeakMap" in globals2 ? /* @__PURE__ */ new WeakMap() : void 0;
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
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
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
    function comment(content) {
      return document.createComment(content);
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
    function stop_immediate_propagation(fn) {
      return function(event) {
        event.stopImmediatePropagation();
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
    var always_set_through_set_attribute2 = ["width", "height"];
    function set_attributes2(node, attributes) {
      const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
      for (const key in attributes) {
        if (attributes[key] == null) {
          node.removeAttribute(key);
        } else if (key === "style") {
          node.style.cssText = attributes[key];
        } else if (key === "__value") {
          node.value = node[key] = attributes[key];
        } else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute2.indexOf(key) === -1) {
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
    function set_custom_element_data_map(node, data_map) {
      Object.keys(data_map).forEach((key) => {
        set_custom_element_data(node, key, data_map[key]);
      });
    }
    function set_custom_element_data(node, prop, value) {
      if (prop in node) {
        node[prop] = typeof node[prop] === "boolean" && value === "" ? true : value;
      } else {
        attr2(node, prop, value);
      }
    }
    function set_dynamic_element_data(tag) {
      return /-/.test(tag) ? set_custom_element_data_map : set_attributes2;
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
    function init_binding_group(group) {
      let _inputs;
      return {
        /* push */
        p(...inputs) {
          _inputs = inputs;
          _inputs.forEach((input) => group.push(input));
        },
        /* remove */
        r() {
          _inputs.forEach((input) => group.splice(group.indexOf(input), 1));
        }
      };
    }
    function init_binding_group_dynamic(group, indexes) {
      let _group = get_binding_group(group);
      let _inputs;
      function get_binding_group(group2) {
        for (let i = 0; i < indexes.length; i++) {
          group2 = group2[indexes[i]] = group2[indexes[i]] || [];
        }
        return group2;
      }
      function push2() {
        _inputs.forEach((input) => _group.push(input));
      }
      function remove() {
        _inputs.forEach((input) => _group.splice(_group.indexOf(input), 1));
      }
      return {
        /* update */
        u(new_indexes) {
          indexes = new_indexes;
          const new_group = get_binding_group(group);
          if (new_group !== _group) {
            remove();
            _group = new_group;
            push2();
          }
        },
        /* push */
        p(...inputs) {
          _inputs = inputs;
          push2();
        },
        /* remove */
        r: remove
      };
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
    function claim_comment(nodes, data) {
      return claim_node(nodes, (node) => node.nodeType === 8, (node) => {
        node.data = "" + data;
        return void 0;
      }, () => comment(data), true);
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
      if (text3.data === data)
        return;
      text3.data = data;
    }
    function set_data_contenteditable(text3, data) {
      data = "" + data;
      if (text3.wholeText === data)
        return;
      text3.data = data;
    }
    function set_data_maybe_contenteditable(text3, data, attr_value) {
      if (~contenteditable_truthy_values.indexOf(attr_value)) {
        set_data_contenteditable(text3, data);
      } else {
        set_data2(text3, data);
      }
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
      if (value == null) {
        node.style.removeProperty(key);
      } else {
        node.style.setProperty(key, value, important ? "important" : "");
      }
    }
    function select_option2(select, value, mounting) {
      for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
          option.selected = true;
          return;
        }
      }
      if (!mounting || value !== void 0) {
        select.selectedIndex = -1;
      }
    }
    function select_options2(select, value) {
      for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
      }
    }
    function select_value(select) {
      const selected_option = select.querySelector(":checked");
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
    function add_iframe_resize_listener(node, fn) {
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
          fn();
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
    var resize_observer_content_box = /* @__PURE__ */ new ResizeObserverSingleton2({ box: "content-box" });
    var resize_observer_border_box = /* @__PURE__ */ new ResizeObserverSingleton2({ box: "border-box" });
    var resize_observer_device_pixel_content_box = /* @__PURE__ */ new ResizeObserverSingleton2({ box: "device-pixel-content-box" });
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
    function head_selector(nodeId, head) {
      const result = [];
      let started = 0;
      for (const node of head.childNodes) {
        if (node.nodeType === 8) {
          const comment2 = node.textContent.trim();
          if (comment2 === `HEAD_${nodeId}_END`) {
            started -= 1;
            result.push(node);
          } else if (comment2 === `HEAD_${nodeId}_START`) {
            started += 1;
            result.push(node);
          }
        } else if (started > 0) {
          result.push(node);
        }
      }
      return result;
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
            this.e = element2(target.nodeType === 11 ? "TEMPLATE" : target.nodeName);
          this.t = target.tagName !== "TEMPLATE" ? target : target.content;
          this.c(html);
        }
        this.i(anchor);
      }
      h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.nodeName === "TEMPLATE" ? this.e.content.childNodes : this.e.childNodes);
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
    function construct_svelte_component2(component, props) {
      return new component(props);
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
    var resolved_promise2 = /* @__PURE__ */ Promise.resolve();
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
      if (flushidx2 !== 0) {
        return;
      }
      const saved_component = exports.current_component;
      do {
        try {
          while (flushidx2 < dirty_components2.length) {
            const component = dirty_components2[flushidx2];
            flushidx2++;
            set_current_component2(component);
            update3(component.$$);
          }
        } catch (e) {
          dirty_components2.length = 0;
          flushidx2 = 0;
          throw e;
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
    function flush_render_callbacks2(fns) {
      const filtered = [];
      const targets = [];
      render_callbacks2.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
      targets.forEach((c) => c());
      render_callbacks2 = filtered;
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
      const options3 = { direction: "in" };
      let config = fn(node, params, options3);
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
            config = config(options3);
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
      const options3 = { direction: "out" };
      let config = fn(node, params, options3);
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
          config = config(options3);
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
      const options3 = { direction: "both" };
      let config = fn(node, params, options3);
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
              config = config(options3);
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
      const updates = [];
      i = n;
      while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
          block = create_each_block4(key, child_ctx);
          block.c();
        } else if (dynamic) {
          updates.push(() => block.p(child_ctx, dirty));
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
      run_all2(updates);
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
    var _boolean_attributes2 = [
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
      "inert",
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
    ];
    var boolean_attributes2 = /* @__PURE__ */ new Set([..._boolean_attributes2]);
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
        else if (boolean_attributes2.has(name.toLowerCase())) {
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
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
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
      return Object.keys(style_object).filter((key) => style_object[key]).map((key) => `${key}: ${escape_attribute_value(style_object[key])};`).join(" ");
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
      const { fragment, after_update } = component.$$;
      fragment && fragment.m(target, anchor);
      if (!customElement) {
        add_render_callback2(() => {
          const new_on_destroy = component.$$.on_mount.map(run2).filter(is_function2);
          if (component.$$.on_destroy) {
            component.$$.on_destroy.push(...new_on_destroy);
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
        flush_render_callbacks2($$.after_update);
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
        ctx: [],
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
          if (!is_function2(callback)) {
            return noop2;
          }
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
        if (!is_function2(callback)) {
          return noop2;
        }
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
      document.dispatchEvent(custom_event2(type, Object.assign({ version: "3.59.2" }, detail), { bubbles: true }));
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
    function listen_dev(node, event, handler, options3, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
      const modifiers = options3 === true ? ["capture"] : options3 ? Array.from(Object.keys(options3)) : [];
      if (has_prevent_default)
        modifiers.push("preventDefault");
      if (has_stop_propagation)
        modifiers.push("stopPropagation");
      if (has_stop_immediate_propagation)
        modifiers.push("stopImmediatePropagation");
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
      if (text3.data === data)
        return;
      dispatch_dev("SvelteDOMSetData", { node: text3, data });
      text3.data = data;
    }
    function set_data_contenteditable_dev(text3, data) {
      data = "" + data;
      if (text3.wholeText === data)
        return;
      dispatch_dev("SvelteDOMSetData", { node: text3, data });
      text3.data = data;
    }
    function set_data_maybe_contenteditable_dev(text3, data, attr_value) {
      if (~contenteditable_truthy_values.indexOf(attr_value)) {
        set_data_contenteditable_dev(text3, data);
      } else {
        set_data_dev(text3, data);
      }
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
        console.warn(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
      }
    }
    function construct_svelte_component_dev(component, props) {
      const error_message = "this={...} of <svelte:component> should specify a Svelte component.";
      try {
        const instance12 = new component(props);
        if (!instance12.$$ || !instance12.$set || !instance12.$on || !instance12.$destroy) {
          throw new Error(error_message);
        }
        return instance12;
      } catch (err) {
        const { message } = err;
        if (typeof message === "string" && message.indexOf("is not a constructor") !== -1) {
          throw new Error(error_message);
        } else {
          throw err;
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
    exports.HtmlTagHydration = HtmlTagHydration;
    exports.ResizeObserverSingleton = ResizeObserverSingleton2;
    exports.SvelteComponent = SvelteComponent2;
    exports.SvelteComponentDev = SvelteComponentDev2;
    exports.SvelteComponentTyped = SvelteComponentTyped2;
    exports.action_destroyer = action_destroyer;
    exports.add_attribute = add_attribute;
    exports.add_classes = add_classes;
    exports.add_flush_callback = add_flush_callback;
    exports.add_iframe_resize_listener = add_iframe_resize_listener;
    exports.add_location = add_location;
    exports.add_render_callback = add_render_callback2;
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
    exports.claim_comment = claim_comment;
    exports.claim_component = claim_component;
    exports.claim_element = claim_element;
    exports.claim_html_tag = claim_html_tag;
    exports.claim_space = claim_space;
    exports.claim_svg_element = claim_svg_element;
    exports.claim_text = claim_text;
    exports.clear_loops = clear_loops;
    exports.comment = comment;
    exports.component_subscribe = component_subscribe2;
    exports.compute_rest_props = compute_rest_props;
    exports.compute_slots = compute_slots;
    exports.construct_svelte_component = construct_svelte_component2;
    exports.construct_svelte_component_dev = construct_svelte_component_dev;
    exports.contenteditable_truthy_values = contenteditable_truthy_values;
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
    exports.flush_render_callbacks = flush_render_callbacks2;
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
    exports.head_selector = head_selector;
    exports.identity = identity;
    exports.init = init2;
    exports.init_binding_group = init_binding_group;
    exports.init_binding_group_dynamic = init_binding_group_dynamic;
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
    exports.resize_observer_border_box = resize_observer_border_box;
    exports.resize_observer_content_box = resize_observer_content_box;
    exports.resize_observer_device_pixel_content_box = resize_observer_device_pixel_content_box;
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
    exports.set_custom_element_data_map = set_custom_element_data_map;
    exports.set_data = set_data2;
    exports.set_data_contenteditable = set_data_contenteditable;
    exports.set_data_contenteditable_dev = set_data_contenteditable_dev;
    exports.set_data_dev = set_data_dev;
    exports.set_data_maybe_contenteditable = set_data_maybe_contenteditable;
    exports.set_data_maybe_contenteditable_dev = set_data_maybe_contenteditable_dev;
    exports.set_dynamic_element_data = set_dynamic_element_data;
    exports.set_input_type = set_input_type;
    exports.set_input_value = set_input_value2;
    exports.set_now = set_now;
    exports.set_raf = set_raf;
    exports.set_store_value = set_store_value2;
    exports.set_style = set_style;
    exports.set_svg_attributes = set_svg_attributes;
    exports.space = space2;
    exports.split_css_unit = split_css_unit;
    exports.spread = spread;
    exports.src_url_equal = src_url_equal;
    exports.start_hydrating = start_hydrating2;
    exports.stop_immediate_propagation = stop_immediate_propagation;
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
          if (subscribers.size === 0 && stop) {
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
        let started = false;
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
          if (started) {
            sync2();
          }
        }, () => {
          pending |= 1 << i;
        }));
        started = true;
        sync2();
        return function stop() {
          internal.run_all(unsubscribers);
          cleanup();
          started = false;
        };
      });
    }
    function readonly(store) {
      return {
        subscribe: store.subscribe.bind(store)
      };
    }
    Object.defineProperty(exports, "get", {
      enumerable: true,
      get: function() {
        return internal.get_store_value;
      }
    });
    exports.derived = derived;
    exports.readable = readable;
    exports.readonly = readonly;
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
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var ResizeObserverSingleton = class _ResizeObserverSingleton {
  constructor(options3) {
    this.options = options3;
    this._listeners = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
  }
  observe(element2, listener) {
    this._listeners.set(element2, listener);
    this._getObserver().observe(element2, this.options);
    return () => {
      this._listeners.delete(element2);
      this._observer.unobserve(element2);
    };
  }
  _getObserver() {
    var _a;
    return (_a = this._observer) !== null && _a !== void 0 ? _a : this._observer = new ResizeObserver((entries) => {
      var _a2;
      for (const entry of entries) {
        _ResizeObserverSingleton.entries.set(entry.target, entry);
        (_a2 = this._listeners.get(entry.target)) === null || _a2 === void 0 ? void 0 : _a2(entry);
      }
    });
  }
};
ResizeObserverSingleton.entries = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
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
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
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
var always_set_through_set_attribute = ["width", "height"];
function set_attributes(node, attributes) {
  const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
  for (const key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === "style") {
      node.style.cssText = attributes[key];
    } else if (key === "__value") {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
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
  if (text2.data === data)
    return;
  text2.data = data;
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function select_option(select, value, mounting) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
  if (!mounting || value !== void 0) {
    select.selectedIndex = -1;
  }
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
function construct_svelte_component(component, props) {
  return new component(props);
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
var resolved_promise = /* @__PURE__ */ Promise.resolve();
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
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
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
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
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
var _boolean_attributes = [
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
  "inert",
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
];
var boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
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
    flush_render_callbacks($$.after_update);
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
    ctx: [],
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
      if (!is_function(callback)) {
        return noop;
      }
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
    if (!is_function(callback)) {
      return noop;
    }
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
      if (subscribers.size === 0 && stop) {
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
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current3 = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & /*activeProps*/
      8 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
        /*activeProps*/
        ctx2[3]
      )]) : {};
      if (dirty & /*component*/
      1 && switch_value !== (switch_value = /*component*/
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
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
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
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
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
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
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
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert(target, switch_instance_anchor, anchor);
      current3 = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & /*activeProps*/
      8 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(
        /*activeProps*/
        ctx2[3]
      )]) : {};
      if (dirty & /*pending*/
      2 && switch_value !== (switch_value = /*pending*/
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
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
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
  let button_data = {};
  for (let i = 0; i < button_1_levels.length; i += 1) {
    button_data = assign(button_data, button_1_levels[i]);
  }
  return {
    c() {
      button_1 = element("button");
      if (default_slot)
        default_slot.c();
      set_attributes(button_1, button_data);
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
      set_attributes(button_1, button_data = get_spread_update(button_1_levels, [
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
        if (each_blocks[i]) {
          each_blocks[i].m(select, null);
        }
      }
      "value" in select_data && (select_data.multiple ? select_options : select_option)(select, select_data.value);
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
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
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
        if (each_blocks[i]) {
          each_blocks[i].m(ol, null);
        }
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
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
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
      1 && input.value !== /*term*/
      ctx2[0]) {
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
        if (each_blocks[i]) {
          each_blocks[i].m(div0, null);
        }
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
