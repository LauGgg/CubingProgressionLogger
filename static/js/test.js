function calcAvg(array) {
    let sum = 0;
    let i;
    let minSum = 0
    let maxSum = 0
    for (i = 0; i < array.length; i++) {
        if (array[i] != Math.min(...array) && array[i] != Math.max(...array)) {
            sum += array[i];
        } else {
            if (array[i] == Math.min(...array)) {
                minSum += 1;
                console.log(`${array[i]} is the min`)
                console.log(minSum)
                if (minSum > 1) {
                    console.log(`There are a duplicate of the min in: ${array}`)
                    sum += array[i]
                }
            } else if (array[i] == Math.max(...array)) {
                maxSum += 1;
                console.log(`${array[i]} is the min`)
                if (maxSum > 1) {
                    console.log(`There are a duplicate of the max in: ${array}`)
                    sum += array[i]
                }
            }
        }
    }
    return {time: (sum / (array.length - 2)).toFixed(2), times: array}
}

console.log(calcAvg([1.44, 0.87, 0.86, 0.86, 0.89]))