

describe('Sample test... ', () => {
  // example test
  const concat = (...args) => {
    let result = '';
    for (let i = 0; i < args.length; i++) {
      result += args[i] + ' ';
    }
    return result;
  };

  test('concatenates 3 words', () => {
    expect(concat('cow', 'said', 'moooo')).toMatch('cow said moooo');
  });

});

