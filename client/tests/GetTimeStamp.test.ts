import GetTimeStamp from '../src/GetTimeStamp';

describe('GetTimeStamp', () => {
  const testCases = [
    {
      date: new Date(2023, 2, 6, 10, 30),
      expected: '10:30 (2023/03/06)',
    },
    {
      date: new Date(2022, 0, 1, 9, 0),
      expected: '09:00 (2022/01/01)',
    },
    {
      date: new Date(2021, 11, 31, 23, 59),
      expected: '23:59 (2021/12/31)',
    },
    {
      date: new Date(2020, 6, 15, 12, 45),
      expected: '12:45 (2020/07/15)',
    },
    {
      date: new Date(2024, 4, 22, 8, 20),
      expected: '08:20 (2024/05/22)',
    },
  ];

  testCases.forEach(({ date, expected }) => {
    test(`returns ${expected} for ${date.toString()}`, () => {
      expect(GetTimeStamp(date)).toBe(expected);
    });
  });
});
