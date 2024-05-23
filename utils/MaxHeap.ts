type ItemWithPriority<T> = {
  item: T;
  priority: number;
};

class MaxHeap<T extends NonNullable<unknown>> {
  private _array: Array<ItemWithPriority<T>> = [];

  constructor() {}

  public enqueue(item: T, priority: number) {
    this._array.push({
      item: item,
      priority: priority,
    });

    let i = this._array.length - 1;
    let parentIndex = this.getParentIndex(i);
    while (i != 0 && this._array[parentIndex]!.priority < this._array[i]!.priority) {
      this.swap(i, parentIndex);
      i = parentIndex;
      parentIndex = this.getParentIndex(i);
    }
  }

  public dequeue(): T | undefined {
    if (this._array.length == 0)
      return undefined;
    const dequeuedItem = this._array[0]!;

    this._array = this._array.splice(1);
    this.heapify(0);

    return dequeuedItem.item;
  }

  public peek(): T | undefined {
    return this._array[0]?.item;
  }

  public getSize(): number {
    return this._array.length;
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number {
    return index * 2 + 1;
  }

  private getRightChild(index: number): number {
    return index * 2 + 2;
  }

  private swap(firstIndex: number, secondIndex: number) {
    [this._array[firstIndex], this._array[secondIndex]] = [this._array[secondIndex]!, this._array[firstIndex]!];
  }

  private heapify(startIndex: number) {
    const leftIndex = this.getLeftChildIndex(startIndex);
    const rightIndex = this.getRightChild(startIndex);

    let largestIndex = startIndex;
    if (leftIndex < this._array.length && this._array[leftIndex]!.priority >= this._array[largestIndex]!.priority)
      largestIndex = leftIndex;
    if (rightIndex < this._array.length && this._array[rightIndex]!.priority >= this._array[largestIndex]!.priority)
      largestIndex = rightIndex;

    if (largestIndex != startIndex) {
      this.swap(startIndex, largestIndex);
      this.heapify(largestIndex);
    }
  }
}
