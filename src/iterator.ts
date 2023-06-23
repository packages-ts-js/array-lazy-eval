export class LazyArray<T> implements Iterable<T> {
  value: IterableIterator<T>;

  constructor(value: T[]) {
    this.value = value[Symbol.iterator]();
  }
  [Symbol.iterator](): Iterator<T, any, undefined> {
    return this.value;
  }

  mapLazy(func: any) {
    this.value = map(func, this.value);
    return this;
  }

  filterLazy(func: any) {
    this.value = filter(func, this.value);
    return this;
  }

  reduce(func: any, defaultValue: any) {
    for (const item of this.value) defaultValue = func(defaultValue, item);

    return defaultValue;
  }
}

function* map(func: any, iter: any) {
  for (const item of iter) {
    yield func(item);
  }
}

function* filter(func: any, iter: any) {
  for (const item of iter) if (func(item)) yield item;
}
