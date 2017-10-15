/**
 * string => T map object
 */
type DataMap<T> = {
  [s: string]: T;
};

/**
 * This class defines a registry for custom formats used within JSF.
 */
class Registry<T> {
  protected data: DataMap<T>;

  constructor() {
    // empty by default
    this.data = {};
  }

  /**
   * Registers custom format
   */
  public register(name: string, callback: T): void {
    this.data[name] = callback;
  }

  /**
   * Register many formats at one shot
   */
  public registerMany(formats: Object): void {
    for (var name in formats) {
      this.data[name] = formats[name];
    }
  }

  /**
   * Returns element by registry key
   */
  public get(name: string): T {
    var format: T = this.data[name];
    if (typeof format === 'undefined') {
      throw new Error('unknown registry key ' + JSON.stringify(name));
    }
    return format;
  }

  /**
   * Returns the whole registry content
   */
  public list(): DataMap<T> {
    return this.data;
  }

}

export default Registry;
