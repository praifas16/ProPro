// my-integration.test.js
const User = require('../src/User');
const firebase = require('firebase');

jest.mock('firebase', () => ({
  firestore: jest.fn().mockReturnThis(),
  collection: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  get: jest.fn(() => Promise.resolve({ empty: true })),
  add: jest.fn(() => Promise.resolve({ id: 'new_user_id' })),
}));

test('should successfully register a user', async () => {
  const user = new User('testuser', 'test@example.com', 'password123', 'Student');
  const db = firebase.firestore();

  const result = await user.register(db);
  expect(result.id).toBe('new_user_id');
});

test('should throw error if email already exists', async () => {
  const user = new User('testuser', 'existing@example.com', 'password123', 'Student');
  const db = firebase.firestore();
  firebase.firestore().collection().where().get.mockResolvedValueOnce({ empty: false });

  await expect(user.register(db)).rejects.toThrow('Email is already in use');
});
