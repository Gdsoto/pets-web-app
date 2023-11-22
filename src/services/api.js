import axios from 'axios';

const PetsApi = axios.create({
	baseURL: 'http://172.21.34.12:19994',
	withCredentials: true,
});

export default PetsApi;
