const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { editPassword } = require('../backend/controller/userController');
const userModel = require('../backend/models/userModel');
const bcrypt = require('bcryptjs');

describe('PUT /edit/password/:username', () => {
    it('should update user password and return a success message', async () => {
      // Create a mock user data
      const mockUser = {
        username: 'user123',
        password: 'oldpassword',
      };
  
      // Create a mock request and response
      const req = { 
        params: { 
          username: 'user123' 
        }, 
        body: { 
          password: 'newpassword'
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
  
      // Create a mock bcrypt hash method
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
  
      // Call the editPassword function with the mock request and response
      await editPassword(req, res);
  
      // Make sure that the user password was updated and the response was sent with the correct data
      expect(userModel.findOneAndUpdate).toHaveBeenCalledWith({ username: 'user123' }, { password: 'hashedPassword' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 200,
        message: 'Password has been successfully updated',
      });
  
      // Clean up the user model and bcrypt mock
      jest.restoreAllMocks();
    });
  });
  