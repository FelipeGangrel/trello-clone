export function fakeTimeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
