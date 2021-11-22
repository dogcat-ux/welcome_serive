import {get_first_letter} from "./getFirstLetter";

export let classifyByLetter = function (arr, itemName) {
  let listData = {}
  let lettersExist = []
  for (let i = 1; i < arr.length; i++) {
    let firstLetter = get_first_letter(arr[i][itemName][0])
    if (firstLetter in listData) {
      listData[firstLetter].push(arr[i])
    } else {
      listData[firstLetter] = []
      lettersExist.push(firstLetter)
      listData[firstLetter].push(arr[i])
    }
  }
  return [listData, lettersExist]
};
