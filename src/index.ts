class LazyArray<T> {
  private _map_list: Array<[boolean, any]>;

  constructor(private readonly _innerArray: Array<T>) {
    this._map_list = [];
  }

  map(func: (a: any) => any): LazyArray<T> {
    this._map_list.push([false, func]);
    return this;
  }

  filter(func: (a: any) => boolean): LazyArray<T> {
    this._map_list.push([true, func]);
    return this;
  }

  reduce<R>(callback: (a: R, b: T) => R, defaultValue: R): R {
    let pivot: R = defaultValue;

    this._innerArray.forEach((element) => {
      for (const [isFilter, func] of this._map_list) {
        if (isFilter) {
          if (!func(element)) return;
        } else {
          element = func(element);
        }
      }

      pivot = callback(pivot, element);
    });

    return pivot;
  }

  getMany(): Array<T> {
    return this.reduce((a: Array<T>, b: T) => {
      a.push(b);
      return a;
    }, []);
  }
}

declare global {
  interface Array<T> {
    lazy(): LazyArray<T>;
  }
}

export function lazy<T>(a: Array<T>): LazyArray<T> {
  return new LazyArray(a);
}

Array.prototype.lazy = function (): LazyArray<any> {
  return new LazyArray(this);
};
