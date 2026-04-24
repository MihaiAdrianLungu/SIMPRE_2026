const arr = [1,2,3,4];

const forEach = arr.forEach((el, i) => {
    // console.log(el, i);
    return el*2;
})

const map = arr.map((el, i) => {
    // console.log(el, i);
    return el*2;
})

// for (index in arr) - indexi

// for (el of arr) - valori

console.log(forEach);
console.log(map);