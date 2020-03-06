import { read } from "fs";

/**
 *
 * @param variable
 * @returns {{type: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"), value: *}}
 * example: identifyVariable(4);
 * returns: { type: 'number', value: 4 }
 */
export function identifyVariable(variable) {
  let map = {};
  map["type"] = typeof variable;
  map["value"] = variable;
  return map;
}
 console.log(identifyVariable(4))

/**
 *
 * @param array
 * @returns {[]}
 * example: identifyArray(['some', 3, [3, 4], false]);
 * returns: [
 { type: 'string', value: 'some' },
 { type: 'number', value: 3 },
 { type: 'object', value: [ 3, 4 ] },
 { type: 'boolean', value: false }
 ]

 */
export function identifyArray(array) {
  let res = [];
  for (let v of array) {
    let map = {};
    map["type"] = typeof v;
    map["value"] = v;
    res.push(map);
  }
  return res;
}
// console.log(identifyArray(["some", 3, [3, 4], false]));

/**
 * mutates the object that is passed in.
 * @param object
 * @param key
 * @returns {*} does not have to return anything
 *
 * example:
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 removeKey(obj, 'password');
 obj now does not contain the `password` field
 */
export function removeKey(object, key) {
  delete object[key];
}
// let obj = {
//    name: 'Mr. Boss',
//    title: 'boss',
//    age: 33,
//    password: 'pass123'
// };
// removeKey(obj, 'password')
// console.log(obj);

/**
 * Does not mutate the object passed in
 * @param object
 * @param key
 * @returns {*} The object with its keys removed
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 obj = removeKeyNonDestructive(obj, 'password');
 obj will not have the `password` field only because it was assigned the result of the function.
 If only `removeKeyNonDestructive` was called, nothing would have changed.
 */
export function removeKeyNonDestructive(object, key) {
  let { [key]: omit, ...res } = object;
  return res;
}

/**
 * Remove and return the listed keys. Without mutating the object passed in.
 * @param object
 * @param {string[]} keyList
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 *
 * example:


 let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
 };
 obj = removeKeys(obj, ['password', 'age']);
 // object not looks like this
 { name: 'Mr. Boss', title: 'boss' }

 * @return {*} The object with its keys removed.
 */

export function removeKeys(object, keyList) {
   let res = [removeKeyNonDestructive(object, keyList[0])]
   let i = 0 
   for(let v of keyList){
      res[i+1] = removeKeyNonDestructive(res[i], v)
      i++
   }
   return res[res.length -1]
}
// let obj = {
//    name: "426 demo",
//    age: 3,
//    description: "A test for removing keys",
//    options: {correct: 1, incorrect: 0},
//    points: [1, 2, 3, 3]

// };
// console.log(obj);
// let modded = removeKeys(obj, ['name']);
// console.log(modded);
