export function binaryOperation(f, a, b) {
  return a.map((val, i) => f(val, b[i]))
}

export function sum(a, b) {
  return binaryOperation((a, b) => a + b, a, b)
}

export function neg(arr) {
  return arr.map(x => -x)
}

export function sub(a, b) {
  return sum(a, neg(b))
}
