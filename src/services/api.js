import axios from 'axios';

const PetsApi = axios.create({
	baseURL: 'http://186.155.151.14:19994/api',
});

export default PetsApi;