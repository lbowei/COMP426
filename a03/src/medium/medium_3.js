import mpg_data from "./data/mpg_data";

/*
mpg_data is imported for you but that is for testing purposes only. All of the functions should use
a car_data param that is supplied as the first parameter.

As you write these functions notice how they could possibly be chained together to solve more complicated
queries.
 */

/**
 * @param {array} car_data - an instance of mpg_data that should be used for filtering.
 * @param minHorsepower {number}
 * @param minTorque {number}
 *
 * @return {array} An array of car objects with horsepower >= minHorsePower and torque >= minTorque
 * sorted by horsepower in descending order.
 *
 */
export function searchHighPower(car_data, minHorsepower, minTorque) {
  car_data = car_data.sort(function(a, b) {
    return b.horsepower - a.horsepower;
  });
  let res = [];
  for (let v of car_data) {
    if (v.horsepower >= minHorsepower && v.torque >= minTorque) {
      res.push(v);
    }
  }
  return res;
}
// console.log(searchHighPower(mpg_data, 200, 200))

/**
 * @param {array} car_data
 * @param minCity
 * @param minHighway
 *
 *
 * @return {array} An array of car objects with highway_mpg >= minHighway and city_mpg >= minCity
 * sorted by highway_mpg in descending order
 *
 */
export function searchMpg(car_data, minCity, minHighway) {
  car_data = car_data.sort(function(a, b) {
    return b.highway_mpg - a.highway_mpg;
  });
  let res = [];
  for (let v of car_data) {
    if (v.highway_mpg >= minHighway && v.city_mpg >= minCity) {
      res.push(v);
    }
  }
  return res;
}
// console.log(searchMpg(mpg_data, 30, 30))

/**
 * Find all cars where 'id' contains the search term below.
 * Sort the results so that if the term appears earlier in the string
 * it will appear earlier in the list. Make sure searching and sorting ignores case.
 * @param car_data
 * @param searchTerm A string to that is used for searching
 * @returns {[]} array of cars
 */
export function searchName(car_data, searchTerm) {
  let res = [];
  for (let v of car_data) {
    if (v.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      res.push(v);
    }
  }
  res = res.sort(function(a, b) {
    return b.id.toLowerCase().indexOf(searchTerm.toLowerCase()) - a.id.toLowerCase().indexOf(searchTerm.toLowerCase());
  });
  return res;
}

 console.log(searchName(mpg_data, "honda"));

/**
 * Find all cars made in the years asked for.
<<<<<<< HEAD
 * Sort the results by year in descending order.
=======
 * Sort the results by year in descending order. 
>>>>>>> 44b231d1454bdab3c338563b1c0a6c1e2e50ce1c
 *
 * @param car_data
 * @param {number[]} years - array of years to be included in the results e.g. [2010, 2012]
 * @returns {[]} an array of car objects
 */
export function searchByYear(car_data, years) {
  let res = [];
  for (let v of car_data) {
    if (years.includes(v.year)) {
      res.push(v);
    }
  }
  res = res.sort(function(a, b) {
    return b.year - a.year;
  });

  return res;
}

console.log(searchByYear(mpg_data, [2010, 2011, 2012]));
