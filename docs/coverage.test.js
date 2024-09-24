// coverage.test.js

// ฟังก์ชันที่เราต้องการทดสอบ
function multiply(a, b) {
    return a * b;
  }
  
  // การทดสอบฟังก์ชัน multiply
  test('multiplies 2 * 3 to equal 6', () => {
    expect(multiply(2, 3)).toBe(6);
  });
  
  // การทดสอบฟังก์ชัน multiply กับค่าต่าง ๆ
  test('multiplies 5 * 4 to equal 20', () => {
    expect(multiply(5, 4)).toBe(20);
  });
  