function partition<ElementType>(array: Array<ElementType>, startIndex: number, endIndex: number) {
    // const pivotValue = array[Math.floor(Math.random() * (endIndex - startIndex  + 1)) + startIndex];
    const pivotValue = array[startIndex];

    var leftIndex = startIndex - 1;
    var rightIndex = endIndex + 1;

    while (true) {
        ++leftIndex;
        while (array[leftIndex] < pivotValue)
            ++leftIndex;

        --rightIndex;
        while (array[rightIndex] > pivotValue)
            --rightIndex;

        if (leftIndex >= rightIndex)
            return rightIndex;

        const aux = array[leftIndex];
        array[leftIndex] = array[rightIndex];
        array[rightIndex] = aux;
    }
}

function quickSelectRecursively<ElementType>(
    array: Array<ElementType>, startIndex: number, endIndex: number, kIndex: number
): ElementType {
    if (startIndex == endIndex)
        return array[startIndex];

    const partitionIndex = partition(array, startIndex, endIndex);

    if (kIndex == partitionIndex) {
        return array[kIndex];
    } else if (kIndex  < partitionIndex) {
        return quickSelectRecursively(array, startIndex, partitionIndex - 1, kIndex);
    } else {
        return quickSelectRecursively(array, partitionIndex + 1, endIndex, kIndex);
    }
}

export function quickSelect<ElementType>(array: Array<ElementType>, kIndex: number): ElementType {
    return quickSelectRecursively(array, 0, array.length - 1, kIndex - 1);
}



function partitionWithComparator<ElementType>(
    array: Array<ElementType>, startIndex: number, endIndex: number,
    comparator: (a: ElementType, b: ElementType) => number
): number {
    const pivot = array[Math.floor(Math.random() * (endIndex - startIndex) + startIndex + 1)];

    var leftIndex = startIndex - 1;
    var rightIndex = endIndex + 1;
    var comparationResult: number;

    while (true) {
        ++leftIndex;
        comparationResult = comparator(array[leftIndex], pivot);
        while (comparationResult < 0) {
            comparationResult = comparator(array[leftIndex], pivot);
            ++leftIndex;
        }

        --rightIndex;
        comparationResult = comparator(array[rightIndex], pivot);
        while (comparationResult > 0) {
            comparationResult = comparator(array[rightIndex], pivot);
            --rightIndex;
        }

        if (leftIndex >= rightIndex)
            return rightIndex;

        const aux = array[leftIndex];
        array[leftIndex] = array[rightIndex];
        array[rightIndex] = aux;
    }
}

function quickSelectRecursivelyWithComparator<ElementType>(
    array: Array<ElementType>, startIndex: number, endIndex: number, kIndex: number,
    comparator: (a: ElementType, b: ElementType) => number
): ElementType {
    if (startIndex == endIndex)
        return array[startIndex];

    const partitionIndex = partitionWithComparator(array, startIndex, endIndex, comparator);

    if (partitionIndex == kIndex) {
        return array[partitionIndex];
    } else if (kIndex < partitionIndex) {
        return quickSelectRecursivelyWithComparator(array, startIndex, partitionIndex - 1, kIndex, comparator);
    } else {
        return quickSelectRecursivelyWithComparator(array, partitionIndex + 1,
            endIndex, kIndex, comparator);
    }
}

function quickSelectWithComparator<ElementType>(
    array: Array<ElementType>, kIndex: number, comparator: (a: ElementType, b: ElementType) => number
): ElementType {
    return quickSelectRecursivelyWithComparator(array, 0, array.length - 1, kIndex - 1, comparator);
}