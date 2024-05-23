import {LinkedList} from "./LinkedList";
import {InvalidIndexException, MissingElementException} from "../Exceptions";

describe("LinkedList correctness test", () => {
    let linkedList: LinkedList<number>;

    beforeEach(() => {
        linkedList = new LinkedList<number>();
    });

    describe("Normal Tests", () => {

        // .isEmpty()
        it("should be empty after creation", () => {
            expect(linkedList.isEmpty).toBe(true);
        });

        // .length
        it("should have length 0 after creation", () => {
            expect(linkedList.length).toBe(0);
        });

        // .last
        it("should throw MissingElementException when trying to get last element from empty list", () => {
            expect(() => linkedList.last).toThrow(MissingElementException);
        });

        // .at()
        it("should throw InvalidIndexException when trying to get element at index when size is 0", () => {
            expect(() => linkedList.at(1)).toThrow(InvalidIndexException);
        });

        it("should throw InvalidIndexException when trying to get element at index bigger than size", () => {
            const size = 10;
            for (let i = 0; i < size; i++)
                linkedList.push(i);

            expect(() => linkedList.at(size)).toThrow(InvalidIndexException);
        });

        it("should throw InvalidIndexException when trying to get element at float index", () => {
            expect(() => linkedList.at(0.3)).toThrow(InvalidIndexException);
        });

        it("should throw InvalidIndexException when trying to get element at negative index", () => {
            expect(() => linkedList.at(-1)).toThrow(InvalidIndexException);
        });

        it("should return correct element when getting element at index", () => {
            const size = 10;
            for (let i = 0; i < size; i++)
                linkedList.push(i);

            for (let i = 0; i < size; i++)
                expect(linkedList.at(i)).toBe(i);

        });

        // .insert()
        it('should throw InvalidIndexException when trying to insert at float index', () => {
            expect(() => linkedList.insert(10, 0.3)).toThrow(InvalidIndexException);
        });

        it('should throw InvalidIndexException when trying to insert at negative index', () => {
            expect(() => linkedList.insert(10, -1)).toThrow(InvalidIndexException);
        });

        it("should be able to chain inserts", () => {
            linkedList.insert(0, 0).insert(1, 1).insert(2, 2);
            expect(linkedList.at(0)).toBe(0);
            expect(linkedList.at(1)).toBe(1);
            expect(linkedList.at(2)).toBe(2);
        });

        it("should return a reference to itself after insert", () => {
           expect(linkedList.insert(0, 0)).toBe(linkedList);
        });

        it("should be able to insert at the beginning", () => {
            linkedList.insert(0, 0);
            expect(linkedList.at(0)).toBe(0);
        });

        it("should be able to insert at the end", () => {
            linkedList.insert(0, 0).insert(1, 1);
            expect(linkedList.at(1)).toBe(1);
        });

        // .remove()
        it("should throw InvalidIndexException when trying to insert remove from empty List", () => {
            expect(() => linkedList.remove(0)).toThrow(InvalidIndexException);
        });

        it("should throw InvalidIndexException when trying to remove at float index", () => {
            expect(() => linkedList.remove(0.3)).toThrow(InvalidIndexException);
        });

        it("should throw InvalidIndexException when trying to remove at negative index", () => {
            expect(() => linkedList.remove(-1)).toThrow(InvalidIndexException);
        });

        it("should throw InvalidIndexException when trying to remove at index greater than length", () => {
            expect(() => linkedList.remove(0)).toThrow(InvalidIndexException);
        });

        it("should return correct element when removing", () => {
            linkedList.insert(0, 0).insert(1, 1).insert(2, 2);
            expect(linkedList.remove(1)).toBe(1);
        });

        it("should remove element at index", () => {
            linkedList.insert(0, 0).insert(1, 1).insert(2, 2);
            linkedList.remove(1);
            expect(linkedList.at(1)).toBe(2);
            expect(linkedList.length).toBe(2);
        });

        // .discard()
        it("should throw InvalidIndexException when trying to discard from empty List", () => {
            expect(() => linkedList.discard(0)).toThrow(InvalidIndexException);
        });

        it("should throw InvalidIndexException when trying to discard at float index", () => {
            expect(() => linkedList.discard(0.3)).toThrow(InvalidIndexException);
        });

        it("should throw InvalidIndexException when trying to discard at negative index", () => {
            expect(() => linkedList.discard(-1)).toThrow(InvalidIndexException);
        });


    })


});