import {variance} from "./data/stats_helpers";


/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = 0
    for (let v of array){
        sum += v
    }
    return sum
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    let arr = array.sort(function(a,b){
        return a-b;
    })
    let length = array.length;
    if (length % 2 == 0){
        return (arr[Math.floor(length/2 - 1)] + arr[Math.floor(length/2)])/2
    }else{
        return arr[Math.floor(length/2)]

    }

}


// let array = [3,2,5,6,2,7,4,2,7,5];
//  console.log(getMedian(array));

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let arr = array.sort(function(a,b){
        return a-b;
    })
    
    let length = arr.length;
    let sum = getSum(array);
    let mean = sum/length
    let me = getMedian(arr);
    let min = arr[0];
    let max = arr[length-1]
    let var1 = variance(arr,mean)
    let standard_deviation = Math.sqrt(var1);

    let map = {
        'length':length,
        'sum' : sum,
        'mean': mean,
        'median':me,
        'min': min,
        'max':max,
        variance:var1,
        standard_deviation: standard_deviation
    }
    return map

}
console.log(getStatistics([3,2,4,5,5,5,2,6,7]))
