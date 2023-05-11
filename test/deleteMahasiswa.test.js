const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { deleteMahasiswa } = require('../backend/controller/mahasiswaController');
const {mahasiswaModel} = require('../backend/models/mahasiswaModel');
const userModel = require('../backend/models/userModel');

describe('DELETE /delete/:nim', () => {
  it('should delete a mahasiswa and return the success message', async () => {
    // Create a mock mahasiswa data
    const mockMahasiswa = {
      nim: '123',
      name: 'John Doe',
      prodi: 'Computer Science',
    };

    // Create a mock request and response
    const req = { params: { nim: '123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Create a mock mahasiswa model with a findOneAndDelete method
    const mockMahasiswaModel = {
      findOneAndDelete: jest.fn().mockResolvedValue(mockMahasiswa),
    };
    jest.spyOn(mahasiswaModel, 'findOneAndDelete').mockImplementation(mockMahasiswaModel.findOneAndDelete);

    // Create a mock user model with a findOneAndDelete method
    const mockUserModel = {
      findOneAndDelete: jest.fn().mockResolvedValue({}),
    };
    jest.spyOn(userModel, 'findOneAndDelete').mockImplementation(mockUserModel.findOneAndDelete);

    // Create a mock axios instance
    const mockAxios = new MockAdapter(axios);

    // Mock the axios delete method to return a success response
    mockAxios.onDelete('http://localhost:5000/api/mahasiswa/delete/123').reply(200, mockMahasiswa);

    // Call the deleteMahasiswa function with the mock request and response
    await deleteMahasiswa(req, res);

    // Make sure that the mahasiswa and user were deleted and the response was sent with the correct data
    expect(mahasiswaModel.findOneAndDelete).toHaveBeenCalledWith({ nim: '123' });
    expect(userModel.findOneAndDelete).toHaveBeenCalledWith({ username: '123' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Mahasiswa data deleted successfully',
    });

    // Clean up the mock axios instance and user model
    mockAxios.reset();
    jest.restoreAllMocks();
  });
});
