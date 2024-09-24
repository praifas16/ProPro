// logout.test.js

// Mock firebase module
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({
      signOut: jest.fn(() => Promise.resolve()) // mock signOut ให้คืนค่า Promise สำเร็จ
    }))
  }));
  
  import logOutUser from './logout';
  
  // Mock window.location และ history
  const mockPushState = jest.fn();
  const mockGo = jest.fn();
  delete window.location;
  window.location = { href: '' };
  window.history.pushState = mockPushState;
  window.history.go = mockGo;
  
  test('should log out the user and clear session', async () => {
    // Spy บนฟังก์ชัน clear ของ sessionStorage และ localStorage
    const mockSessionStorageClear = jest.spyOn(window.sessionStorage.__proto__, 'clear').mockImplementation(() => {});
    const mockLocalStorageClear = jest.spyOn(window.localStorage.__proto__, 'clear').mockImplementation(() => {});
  
    // เรียกใช้ฟังก์ชัน logOutUser
    await logOutUser();
  
    // ตรวจสอบว่า sessionStorage และ localStorage ถูกล้างแล้ว
    expect(mockSessionStorageClear).toHaveBeenCalled();
    expect(mockLocalStorageClear).toHaveBeenCalled();
  
    // ตรวจสอบว่ามีการเปลี่ยนหน้าไปยัง "index.html"
    expect(mockPushState).toHaveBeenCalledWith(null, null, 'index.html');
    expect(mockGo).toHaveBeenCalledWith(1);
    expect(window.location.href).toBe("index.html");
  });
  