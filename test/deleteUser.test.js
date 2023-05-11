const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { deleteUser } = require('../backend/controller/userController');
const userModel = require('../backend/models/userModel');

describe('DELETE /delete/:id', () => {
  it('should delete a user and return the deleted user data', async () => {
    // Create a mock user data
    const mockUser = {
      username: 'user123',
      id: '123',
    };

    // Create a mock request and response
    const req = { params: { id: 'user123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Create a mock user model with a findOneAndDelete method
    const mockUserModel = {
      findOneAndDelete: jest.fn().mockResolvedValue(mockUser),
    };
    jest.spyOn(userModel, 'findOneAndDelete').mockImplementation(mockUserModel.findOneAndDelete);

    // Create a mock axios instance
    const mockAxios = new MockAdapter(axios);

    // Mock the axios delete method to return a success response
    mockAxios.onDelete('http://localhost:5000/api/users/delete/user123').reply(200, mockUser);

    // Call the deleteUser function with the mock request and response
    await deleteUser(req, res);

    // Make sure that the user was deleted and the response was sent with the correct data
    expect(userModel.findOneAndDelete).toHaveBeenCalledWith({ username: 'user123' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        user: 'user123',
        id: '123',
      },
    });

    // Clean up the mock axios instance and user model
    mockAxios.reset();
    jest.restoreAllMocks();
  });
});
