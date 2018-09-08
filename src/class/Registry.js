/**
 * This class defines a registry for custom formats used within JSF.
 */
class Registry {
  constructor() {
    // empty by default
    this.data = {};
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
    for (var name in formats) {
      this.data[name] = formats[name];
    }
  }

  /**
   * Returns element by registry key
   */
  get(name) {
    var format = this.data[name];
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
