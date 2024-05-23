class Stack<ElementType> {
    private backingArray: Array<ElementType>;
    private _size: number;

    constructor() {
        this.backingArray = [];
        this._size = 0;
    }

    public push(element: ElementType): void {
        this.backingArray[this._size] = element;
        ++this._size;
    }

    public pop(): ElementType | undefined {
        if (this._size == 0)
            return undefined;

        return this.backingArray[--this._size];
    }

    public peek(): ElementType | undefined {
        if (this._size == 0)
            return undefined;

        return this.backingArray[this._size - 1];
    }

    public clear(): void {
        this._size = 0;
        this.backingArray = [];
    }

    public isEmpty(): boolean {
        return this._size == 0;
    }

    public get size(): number {
        return this._size;
    }
}