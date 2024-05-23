type DoubleLinkedListNode<ElementType> = {
    value: ElementType,
    next: DoubleLinkedListNode<ElementType> | undefined,
    previous: DoubleLinkedListNode<ElementType> | undefined
}

class LinkedList<ElementType> {

    private _length: number;
    private _first: DoubleLinkedListNode<ElementType> | undefined;
    private _last: DoubleLinkedListNode<ElementType> | undefined;

    constructor() {
        this._length = 0;
    }

    public at(index: number): ElementType | undefined {
        if (!this.isIndexValidForExisting(index))
            return undefined;

        return this.getNodeAtIndex(index).value;
    }

    public insert(element: ElementType, index: number): LinkedList<ElementType> | undefined {
        if (!this.isIndexValidForAdding(index))
            return undefined

        if (index == this._length)
            this.push(element);
        else
            this.linkBefore(this.getNodeAtIndex(index), element);

        return this;
    }

    public remove(index: number): ElementType | undefined {
        if (!this.isIndexValidForExisting(index))
            return undefined;

        return this.unlink(this.getNodeAtIndex(index));
    }

    public discard(index: number): LinkedList<ElementType> | undefined {
        if (!this.isIndexValidForExisting(index))
            return undefined;

        this.unlink(this.getNodeAtIndex(index));

        return this;
    }

    public push(element: ElementType): LinkedList<ElementType> {
        const previousLastNode = this._last;
        const newNode: DoubleLinkedListNode<ElementType> = {
            value: element,
            previous: previousLastNode,
            next: undefined
        }

        this._last = newNode;
        if (previousLastNode == undefined)
            this._first = newNode;
        else
            previousLastNode.next = newNode;

        ++this._length;

        return this;
    }

    public unshift(element: ElementType): LinkedList<ElementType> {
        const previousFirstNode = this._first;
        const newNode: DoubleLinkedListNode<ElementType> = {
            value: element,
            previous: undefined,
            next: previousFirstNode
        }

        this._first = newNode;
        if (previousFirstNode == undefined)
            this._last = newNode;
        else
            previousFirstNode.previous = newNode;

        ++this._length;

        return this;
    }

    public pop(): ElementType | undefined {
        if (this._last == undefined)
            return undefined;

        return this.unlink(this._last);
    }

    public shift(): ElementType | undefined {
        if (this._first == undefined)
            return undefined;

        return this.unlink(this._first);
    }

    public findIndex(element: ElementType, comparator?: (firstElement: ElementType, secondElement: ElementType) => boolean): number {
        if (comparator == undefined)
            return this.findIndexWithDefaultComparator(element);
        else
            return this.findIndexWithCustomComparator(element, comparator);
    }

    public findLastIndex(element: ElementType, comparator?: (firstElement: ElementType, secondElement: ElementType) => boolean): number {
        if (comparator == undefined)
            return this.findLastIndexWithDefaultComparator(element);
        else
            return this.findLastIndexWithCustomComparator(element, comparator);
    }

    public find(comparator: (listElement: ElementType) => boolean): ElementType | undefined {
        var iteratorNode = this._first;

        while (iteratorNode != undefined) {
            if (comparator(iteratorNode.value))
                return iteratorNode.value;

            iteratorNode = iteratorNode.next;
        }

        return undefined;
    }

    public findLast(comparator: (listElement: ElementType) => boolean): ElementType | undefined {
        var iteratorNode = this._last;

        while (iteratorNode != undefined) {
            if (comparator(iteratorNode.value))
                return iteratorNode.value;

            iteratorNode = iteratorNode.previous;
        }

        return undefined;
    }

    get length(): number {
        return this._length;
    }

    get last(): ElementType | undefined {
        if (this._last == undefined)
            return undefined;

        return this._last.value;
    }

    get isEmpty(): boolean {
        return this._length == 0;
    }

    private findIndexWithDefaultComparator(element: ElementType): number {
        var index = 0;
        let iteratorNode = this._first;

        while (iteratorNode != undefined) {
            if (iteratorNode.value == element)
                return index;

            iteratorNode = iteratorNode.next;
            ++index;
        }

        return -1;
    }

    private findIndexWithCustomComparator(element: ElementType, comparator: (firstElement: ElementType, secondElement: ElementType) => boolean): number {
        var index = 0;
        let iteratorNode = this._first;

        while (iteratorNode != undefined) {
            if (comparator(iteratorNode.value, element))
                return index;

            iteratorNode = iteratorNode.next;
            ++index;
        }

        return -1;
    }

    private findLastIndexWithDefaultComparator(element: ElementType): number {
        var index = this._length - 1;
        let iteratorNode = this._last;

        while (iteratorNode != undefined) {
            if (iteratorNode.value == element)
                return index;

            iteratorNode = iteratorNode.previous;
            --index;
        }

        return -1;
    }

    private findLastIndexWithCustomComparator(element: ElementType, comparator: (firstElement: ElementType, secondElement: ElementType) => boolean): number {
        var index = 0;
        let iteratorNode = this._last;

        while (iteratorNode != undefined) {
            if (comparator(iteratorNode.value, element))
                return index;

            iteratorNode = iteratorNode.previous;
            --index;
        }

        return -1;
    }

    private getNodeAtIndex(index: number): DoubleLinkedListNode<ElementType> {
        var iterator;
        if (index * 2 < this._length) {
            let node = this._first;
            for (iterator = 0; iterator < index; ++iterator)
                node = node!.next;

            return node!;
        } else {
            let node = this._last;
            for (iterator = this._length - 1; iterator > index; --iterator)
                node = node!.previous;

            return node!;
        }
    }

    private linkBefore(listNode: DoubleLinkedListNode<ElementType>, valueToAdd: ElementType): void {
        const previousNode = listNode.previous;
        const newNode: DoubleLinkedListNode<ElementType> = {
            value: valueToAdd,
            previous: previousNode,
            next: listNode
        }

        listNode.previous = newNode;
        if (previousNode == undefined)
            this._first = newNode;
        else
            previousNode.next = newNode;

        ++this._length;
    }

    private unlink(listNode: DoubleLinkedListNode<ElementType>): ElementType {
        const previousNode = listNode.previous;
        const nextNode = listNode.next;
        if (previousNode == undefined)
            this._first = nextNode;
        else {
            previousNode.next = nextNode;
            listNode.previous = undefined;
        }

        if (nextNode == undefined)
            this._last = previousNode;
        else {
            nextNode.previous = previousNode;
            listNode.next = undefined;
        }

        --this._length;

        return listNode.value;
    }

    private isIndexValidForAdding(index: number): boolean {
        return index <= this._length && index >= 0 && Number.isSafeInteger(index);
    }

    private isIndexValidForExisting(index: number): boolean {
        return index < this._length && index >= 0 && Number.isSafeInteger(index);
    }
}