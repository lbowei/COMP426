import mpg_data from "./data/mpg_data";
import { getStatistics } from "./medium_1";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/

/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
let getavgMpg = function getavgMpg() {
  let length = mpg_data.length;
  let city_sum = 0;
  let hi_sum = 0;

  for (let v of mpg_data) {
    hi_sum += v.highway_mpg;
    city_sum += v.city_mpg;
  }
  let m = {};
  m["city"] = city_sum / length;
  m["highway"] = hi_sum / length;
  return m;
};

let getallYearStats = function getallYearStats() {
  let arr = [];
  for (let v of mpg_data) {
    arr.push(v.year);
  }
  return getStatistics(arr);
};
let getratioHybrids = function getratioHybrids() {
  let num_hybrid = 0;
  for (let v of mpg_data) {
    if (v.hybrid) {
      num_hybrid++;
    }
  }
  return num_hybrid / mpg_data.length;
};

export const allCarStats = {
  avgMpg: getavgMpg(),
  allYearStats: getallYearStats(),
  ratioHybrids: getratioHybrids()
};
// console.log(allCarStats.avgMpg);

//  console.log(allCarStats.ratioHybrids)

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

function more(a, b) {
  return b.hybrids.length - a.hybrids.length;
}
function hybridList(make, hybrids) {
  this.make = make;
  this.hybrids = hybrids;
}
function getMakerHybrids(array) {
  let res = [];
  let list = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].hybrid) {
      if (!list.includes(array[i].make)) {
        list.push(array[i].make);
        res.push(new hybridList(array[i].make, []));
      }
      for (let j = 0; j < res.length; j++) {
        if (res[j].make == array[i].make) {
          res[j].hybrids.push(array[i].id);
        }
      }
    }
  }
  res.sort(more);
  return res;
}

function later(a, b) {
  return b.year - a.year;
}
function getAvgMpgByYearAndHybrid(array) {
  array.sort(later);
  let res = new Object();
  let curYear = array[0].year;
  let highwayHybrid = 0;
  let cityHybrid = 0;
  let highwayNonHybrid = 0;
  let cityNonHybrid = 0;
  let hybridCount = 0;
  let nonHybridCount = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].year != curYear) {
      res[curYear] = {
        hybrid: {
          city: cityHybrid / hybridCount,
          highway: highwayHybrid / hybridCount
        },
        notHybrid: {
          city: cityNonHybrid / nonHybridCount,
          highway: highwayNonHybrid / nonHybridCount
        }
      };
      hybridCount = 0;
      nonHybridCount = 0;
      highwayHybrid = 0;
      cityHybrid = 0;
      highwayNonHybrid = 0;
      cityNonHybrid = 0;
      curYear = array[i].year;
    }
    if (array[i].hybrid) {
      highwayHybrid += array[i].highway_mpg;
      cityHybrid += array[i].city_mpg;
      hybridCount++;
    } else {
      highwayNonHybrid += array[i].highway_mpg;
      cityNonHybrid += array[i].city_mpg;
      nonHybridCount++;
    }
  }
  res[curYear] = {
    hybrid: {
      city: cityHybrid / hybridCount,
      highway: highwayHybrid / hybridCount
    },
    notHybrid: {
      city: cityNonHybrid / nonHybridCount,
      highway: highwayNonHybrid / nonHybridCount
    }
  };
  return res;
}

export const moreStats = {
  makerHybrids: getMakerHybrids(mpg_data),
  avgMpgByYearAndHybrid: getAvgMpgByYearAndHybrid(mpg_data)
};
// console.log(moreStats.makerHybrids);
