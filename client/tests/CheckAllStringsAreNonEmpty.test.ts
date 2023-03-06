import CheckAllStringsAreNonEmpty from '../src/CheckAllStringsAreNonEmpty';

describe('CheckAllStringsAreNonEmpty', () => {
  const testCases = [
    {
      args: ['hello', 'world'],
      expected: true
    },
    {
      args: ['a', 'b', 'c'],
      expected: true
    },
    {
      args: [''],
      expected: false
    },
    {
      args: [' ', ' ', ' '],
      expected: true
    },
    {
      args: ['a', '', 'b', 'c'],
      expected: false
    }
  ];

  testCases.forEach(({ args, expected }) => {
    test(`returns ${expected} for [${args.join(', ')}]`, () => {
      expect(CheckAllStringsAreNonEmpty(...args)).toBe(expected);
    });
  });
});
