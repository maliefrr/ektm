const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { editProfileUser } = require('../backend/controller/userController');
const userModel = require('../backend/models/userModel');

describe('PUT /edit/:username', () => {
  it('should update user email and return the updated user data', async () => {
    // Create a mock user data
    const mockUser = {
      email: 'user123@gmail.com',
    };

    // Create a mock request and response
    const req = { 
      params: { 
        username: 'user123' 
      }, 
      body: { 
        email: 'newemail@gmail.com'
      } 
    };
    const res = { 
      status: jest.fn().mockReturnThis(), 
      json: jest.fn() 
    };

    // Create a mock user model with a findOneAndUpdate method
    const mockUserModel = {
      findOneAndUpdate: jest.fn().mockResolvedValue(mockUser),
    };
    jest.spyOn(userModel, 'findOneAndUpdate').mockImplementation(mockUserModel.findOneAndUpdate);

    // Create a mock axios instance
    const mockAxios = new MockAdapter(axios);

    // Mock the axios put method to return a success response
    mockAxios.onPut(`http://localhost:5000/api/users/edit/user123`, { email: 'newemail@gmail.com' })
      .reply(200, mockUser);

    // Call the editProfileUser function with the mock request and response
    await editProfileUser(req, res);

    // Make sure that the user email was updated and the response was sent with the correct data
    expect(userModel.findOneAndUpdate).toHaveBeenCalledWith({ username: 'user123' }, { email: 'newemail@gmail.com' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 200,
      message: 'The data has been successfully updated',
      data: {
        email: 'user123@gmail.com',
      },
    });

    // Clean up the mock axios instance and user model
    mockAxios.reset();
    jest.restoreAllMocks();
  });
});
