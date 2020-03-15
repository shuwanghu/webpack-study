export default {
    a: 1
}

function* Y() {
    yield 'generator'
}
const y = Y();
console.log(y.next().value)

console.log([1,2,4].includes(3),"inxludes test")