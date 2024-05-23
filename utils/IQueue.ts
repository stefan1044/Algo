export interface IQueue<ElementType> {
    length: number;
    push(...items: ElementType[]): number;
    shift(): ElementType | undefined;
}


const queue: IQueue<number> = new Array<number>();
queue.push(1, 2, 3, 4, 5);

class Queue<ElementType> extends Array<ElementType> {

}