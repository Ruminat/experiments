export function* range (from = 1, to = Infinity, step = 1) {
  for (let i = from; i <= to; i += step)
    yield i
}
