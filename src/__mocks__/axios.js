const mockAxios = jest.genMockFromModule('axios');

// this is the key to fix the axios.create() undefined error!
mockAxios.create = jest.fn(() => mockAxios);
mockAxios.post = jest.fn(() => mockAxios);
mockAxios.get = jest.fn(() => mockAxios);
mockAxios.put = jest.fn(() => mockAxios);
mockAxios.delete = jest.fn(() => mockAxios);

export default mockAxios;
