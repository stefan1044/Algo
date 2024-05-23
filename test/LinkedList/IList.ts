export interface IList<ElementType> {


    findIndex(element: ElementType, comparator?: (listElement: ElementType) => boolean): number;
    findLastIndex(element: ElementType, comparator?: (listElement: ElementType) => boolean): number;
    find(comparator: (listElement: ElementType) => boolean): ElementType | undefined;
    findLast(comparator: (listElement: ElementType) => boolean): ElementType | undefined;
    get isEmpty(): boolean;
    get length(): number;
}