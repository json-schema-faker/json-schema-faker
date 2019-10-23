/**
 * This class defines a registry for custom formats used within JSF.
 */
class Registry {
  constructor() {
    // empty by default
    this.data = {};
  }

  /**
   * Unregisters custom format(s)
   * @param name
   */
  unregister(name) {
    if (!name) {
      this.data = {};
    } else {
      delete this.data[name];
    }
  }

  /**
   * Registers custom format
   */
  register(name, callback) {
    this.data[name] = callback;
  }

  /**
   * Register many formats at one shot
   */
  registerMany(formats) {
    Object.keys(formats).forEach(name => {
      this.data[name] = formats[name];
    });
  }

  /**
   * Returns element by registry key
   */
  get(name) {
    const format = this.data[name];

    return format;
  }

  /**
   * Returns the whole registry content
   */
  list() {
    return this.data;
  }
}

export default Registry;
