const {editMahasiswa} = require('../backend/controller/mahasiswaController');
const {mahasiswaModel} = require('../backend/models/mahasiswaModel');

describe('editMahasiswa', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      params: {
        username: 'F1G119031',
      },
      body: {
        name: 'John Doe',
        prodi: 'Teknik Informatika',
        nim: 'F1G119031',
        gol_darah: 'A',
        jenis_kelamin: 'Laki-laki',
        alamat: 'Jl. Raya No. 123',
        status: 'Aktif',
        angkatan: 2020,
      },
    };
    mockRes = {
      json: jest.fn(),
      status: jest.fn(() => mockRes),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update mahasiswa data and return a success message', async () => {
    // Set up mock for findOneAndUpdate
    const findOneAndUpdateMock = jest.spyOn(mahasiswaModel, 'findOneAndUpdate');
    findOneAndUpdateMock.mockResolvedValueOnce(mockReq.body);

    // Make a request to the endpoint
    const response = await editMahasiswa(mockReq, mockRes);

    // Expectations
    expect(findOneAndUpdateMock).toHaveBeenCalledTimes(1);
    expect(findOneAndUpdateMock).toHaveBeenCalledWith(
      { nim: mockReq.params.username },
      mockReq.body,
      { new: true }
    );
    expect(mockRes.status).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledTimes(1);
    expect(mockRes.json).toHaveBeenCalledWith({
      statusCode: 200,
      message: 'The data has been successfully updated',
      data: mockReq.body,
    });
  });

  it('should return a 404 status if mahasiswa is not found', async () => {
    // Set up mock for findOneAndUpdate
    const findOneAndUpdateMock = jest.spyOn(mahasiswaModel, 'findOneAndUpdate');
    findOneAndUpdateMock.mockResolvedValueOnce(null);

    // Make a request to the endpoint
    const response = await editMahasiswa(mockReq, mockRes);

    // Expectations
    expect(findOneAndUpdateMock).toHaveBeenCalledTimes(1);
    expect(findOneAndUpdateMock).toHaveBeenCalledWith(
      { nim: mockReq.params.username },
      mockReq.body,
      { new: true }
    );
    expect(mockRes.status).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledTimes(1);
    expect(mockRes.json).toHaveBeenCalledWith({
      statusCode: 404,
      message: 'Mahasiswa Not Found',
    });
  });

  it('should return a 500 status if there is an error', async () => {
    // Set up mock for findOneAndUpdate
    const findOneAndUpdateMock = jest.spyOn(mahasiswaModel, 'findOneAndUpdate');
    findOneAndUpdateMock.mockRejectedValueOnce(new Error('Database error'));

    // Make a request to the endpoint
    const response = await editMahasiswa(mockReq, mockRes);

    // Expectations
    expect(findOneAndUpdateMock).toHaveBeenCalledTimes(1);
    expect(findOneAndUpdateMock).toHaveBeenCalledWith(
      { nim: mockReq.params.username },
      mockReq.body,
      { new: true }
    );
    expect(mockRes.status).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    // Expectations
    expect(findOneAndUpdateMock).toHaveBeenCalledTimes(1);
    expect(findOneAndUpdateMock).toHaveBeenCalledWith(
      { nim: mockReq.params.username },
      mockReq.body,
      { new: true }
    );
    expect(mockRes.status).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledTimes(1);
    expect(mockRes.json).toHaveBeenCalledWith({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  });
});

