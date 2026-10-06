// Demo 1: the simplest possible test. Program and tests in one file.

function add(a, b) {
  return a + b;
}

test('2 + 3 = 5', () => {
  expect(add(2, 3)).toBe(5);
});

test('-1 + 1 = 0', () => {
  expect(add(-1, 1)).toBe(0);
});
