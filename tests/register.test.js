global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const { registerUser } = require('../src/auth');
const { JSDOM } = require('jsdom');
const firebase = require('firebase');

jest.mock('firebase', () => ({
    firestore: jest.fn().mockReturnThis(),
    collection: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    get: jest.fn(() => Promise.resolve({ empty: true })),
    add: jest.fn(() => Promise.resolve({ id: 'new_user_id' })),
  }));





// ทดสอบการลงทะเบียนสำเร็จและตรวจสอบว่า alert ถูกเรียกด้วยข้อความที่คาดหวัง
test('should successfully register a user', async () => {
  const dom = new JSDOM(`
    <form id="registerForm">
      <input id="username" value="newuser" />
      <input id="email" value="test@example.com" />
      <input id="password" value="password123" />
      <select id="role">
        <option value="Student" selected>Student</option>
      </select>
      <button type="submit">Register</button>
    </form>
  `);

  global.document = dom.window.document;
  global.alert = jest.fn();  // จำลอง alert

  const formData = {
    username: 'newuser',
    email: 'test@example.com',
    password: 'password123',
    role: 'Student',
  };

  const db = firebase.firestore();
  await registerUser(db, formData);
  console.log('Registering user', formData);


  expect(alert).toHaveBeenCalledWith(expect.stringContaining('การลงทะเบียนสำเร็จ! รหัส ID ของคุณ: new_user_id'));
});


// ทดสอบว่าข้อมูลถูกต้องและบันทึกลง Firebase อย่างถูกต้อง
test('should show error if database connection fails', async () => {
    firebase.firestore().add.mockRejectedValueOnce(new Error('Database connection failed'));
  
    const dom = new JSDOM(`
      <form id="registerForm">
        <input id="username" value="newuser" />
        <input id="email" value="test@example.com" />
        <input id="password" value="password123" />
        <select id="role">
          <option value="Student" selected>Student</option>
        </select>
        <button type="submit">Register</button>
      </form>
    `);
  
    global.document = dom.window.document;
    global.alert = jest.fn();  // Mock ฟังก์ชัน alert
  
    const formData = {
      username: 'newuser',
      email: 'test@example.com',
      password: 'password123',
      role: 'Student',
    };
  
    const db = firebase.firestore();
    await registerUser(db, formData);
  
    // ตรวจสอบว่ามีการบันทึกข้อมูลที่ถูกต้องลงใน Firebase
    expect(firebase.firestore().add).toHaveBeenCalledWith({
      Username: 'newuser',
      Email: 'test@example.com',
      Password: 'password123',
      Role: 'Student',
      Time: expect.any(String),
    });
  });
  


  // ทดสอบว่าระบบตรวจสอบอีเมลที่ไม่ถูกต้องและเรียก alert เมื่อรูปแบบอีเมลไม่ถูกต้อง
  test('should show error for invalid email format', async () => {
    const dom = new JSDOM(`
      <form id="registerForm">
        <input id="username" value="newuser" />
        <input id="email" value="invalid-email" />
        <input id="password" value="password123" />
        <select id="role">
          <option value="Student" selected>Student</option>
        </select>
        <button type="submit">Register</button>
      </form>
    `);
  
    global.document = dom.window.document;
    global.alert = jest.fn();  // Mock ฟังก์ชัน alert
  
    const formData = {
      username: 'newuser',
      email: 'invalid-email',
      password: 'password123',
      role: 'Student',
    };
  
    const db = firebase.firestore();
    await registerUser(db, formData);
  
    // ตรวจสอบว่า alert ถูกเรียกเมื่ออีเมลไม่ถูกต้อง
    expect(alert).toHaveBeenCalledWith(expect.stringContaining('รูปแบบอีเมลไม่ถูกต้อง'));
  });

  

  // ทดสอบว่าระบบจัดการกรณีการเชื่อมต่อฐานข้อมูลล้มเหลวและแสดง alert ข้อผิดพลาด
  test('should show error if database connection fails', async () => {
    // จำลอง DOM
    const dom = new JSDOM(`
      <form id="registerForm">
        <input id="username" value="newuser" />
        <input id="email" value="test@example.com" />
        <input id="password" value="password123" />
        <select id="role">
          <option value="Student" selected>Student</option>
        </select>
        <button type="submit">Register</button>
      </form>
    `);
  
    global.document = dom.window.document;
    global.alert = jest.fn();  // Mock ฟังก์ชัน alert
  
    // Mock ให้เกิดการเชื่อมต่อฐานข้อมูลล้มเหลว
    firebase.firestore().add.mockRejectedValueOnce(new Error('Database connection failed'));
  
    const formData = {
      username: 'newuser',
      email: 'test@example.com',
      password: 'password123',
      role: 'Student',
    };
  
    const db = firebase.firestore();
    
    // เรียกใช้งาน registerUser และคาดหวังว่าจะเกิดข้อผิดพลาดในการเชื่อมต่อ
    await registerUser(db, formData);
  
    // ตรวจสอบว่า alert ถูกเรียกเมื่อเกิดปัญหาการเชื่อมต่อฐานข้อมูล
    expect(alert).toHaveBeenCalledWith(expect.stringContaining('Error: Database connection failed'));
  });
   





  //Unit test
  const firebase = require('firebase');

jest.mock('firebase', () => ({
  firestore: jest.fn().mockReturnThis(),
  collection: jest.fn().mockReturnThis(),
  add: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  get: jest.fn().mockResolvedValue({ empty: false, docs: [{ data: () => ({ ClassroomName: 'Test Class' }) }] })
}));

const { createTeam, joinTeam } = require('../src/team');

test('should create team successfully', async () => {
  const mockTeamName = 'Test Classroom';
  const mockSubject = 'Math';
  const mockDescription = 'Mathematics Class';

  // Call the function to create a team
  await createTeam(mockTeamName, mockSubject, mockDescription);

  // Check if firestore add was called
  expect(firebase.firestore().add).toHaveBeenCalledWith({
    ClassroomName: mockTeamName,
    Subject: mockSubject,
    Description: mockDescription,
    CreatedAt: expect.anything()
  });
});

test('should join team successfully', async () => {
  const mockJoinCode = '123456';

  // Call the function to join a team
  await joinTeam(mockJoinCode);

  // Check if firestore get was called
  expect(firebase.firestore().get).toHaveBeenCalled();
});
