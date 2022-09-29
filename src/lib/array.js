export function generate(x, y, fill) {
  return Array.from(
    {length: x},
    () => Array.from(
      {length: y},
      () => fill
    )
  );
}

export function change(arr, i, j, newValue) {
  const copy = [...arr]
  copy[i][j] = newValue
  return copy
}
