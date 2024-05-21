function binarySearch(array: Array<number>, searchValue: number): number{
    let left = 0;
    let right = array.length - 1;
    let middle;

    while (left <= right) {
        middle = Math.floor((left + right) / 2);

        if (array[middle] < searchValue) {
            left = middle + 1;
        } else if (array[middle] > searchValue) {
            right = middle - 1;
        } else {
            return middle;
        }
    }

    return -1;
}
