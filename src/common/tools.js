// 判断一个数组是不是另一个数组的子集
export const subset = (arr1, arr2) => {
    return arr2.every(val => arr1.includes(val));
  }