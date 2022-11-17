class LazyArray<T> {
  private _map_list: Array<[boolean, any]>;

  constructor(private readonly _innerArray: Array<T>) {
    this._map_list = [];
  }

  lazyMap(func: (a: any) => any): LazyArray<T> {
    this._map_list.push([false, func]);
    return this;
  }

  lazyFilter(func: (a: any) => boolean): LazyArray<T> {
    this._map_list.push([true, func]);
    return this;
  }

  reduce<R>(rFunc: (a: R, b: T) => R, defaultValue: R): R {
    let pivot: R = defaultValue;

    this._innerArray.forEach((element) => {
      for (const [isFilter, func] of this._map_list) {
        if (isFilter) {
          if (!func(element)) return;
        } else {
          element = func(element);
        }
      }

      pivot = rFunc(pivot, element);
    });

    return pivot;
  }
}

declare global {
  interface Array<T> {
    lazyMap(func: (a: T) => any): LazyArray<T>;
    lazyFilter(func: (a: any) => boolean): LazyArray<T>;
  }
}

Array.prototype.lazyMap = function (func: (a: any) => any): LazyArray<any> {
  const result = new LazyArray(this);
  result.lazyMap(func);
  return result;
};

Array.prototype.lazyFilter = function (
  func: (a: any) => boolean
): LazyArray<any> {
  const result = new LazyArray(this);
  result.lazyFilter(func);
  return result;
};

export {};
