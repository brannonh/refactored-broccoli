export class ArrayLike<T> {
  protected elements: T[] = [];

  constructor(els: T[] = []) {
    this.elements = els;
  }

  length() {
    return this.elements.length;
  }

  pop() {
    return this.elements.pop();
  }

  push(...items: T[]) {
    return this.elements.push(...items);
  }

  shift() {
    return this.elements.shift();
  }

  unshift(...items: T[]) {
    return this.elements.unshift(...items);
  }
}
