
export class IndexOutOfBoundException extends Error {
    constructor(index: number, size?: number) {
        super(`Index ${index} is out of bounds` + size == undefined ? "!" : ` for size ${size}!`);
    }
}

export class InvalidIndexException extends Error {
    constructor(index: number, size?: number) {
        super(`Index ${index} is invalid` + size == undefined ? "!" : ` for size ${size}!`);
    }
}

export class MissingElementException extends Error {
    constructor(operation: string) {
        super("No element exists to perform specified operation!" + operation == undefined ? "" : ` Operation: ${operation}`);
    }
}
