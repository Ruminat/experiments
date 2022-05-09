export function* range (from = 1, to = Infinity, step = 1): Generator<number, void, unknown> {
  for (let i = from; i <= to; i += step)
    yield i;
}
