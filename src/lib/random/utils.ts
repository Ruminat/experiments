export function random (from = 0, to = 1) {
  return from + (to - from) * Math.random()
}

export function randomInt (from = 0, to = 1) {
  return Math.round((from - 0.5) + (to - from + 1) * Math.random())
}

export function probabilityCheck(probability: number): boolean {
  return probability > random();
}
