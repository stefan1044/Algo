function binarySearch(array: Array<number>, searchValue: number): number{
    let left = 0;
    let right = array.length - 1;
    let middle;

    while (left != right) {
        middle = Math.ceil((left + right) / 2);

        if (array[middle] > searchValue)
            right = middle - 1;
        else
            left = middle;
    }

    if (array[left] == searchValue)
        return left;

    return -1;
}
