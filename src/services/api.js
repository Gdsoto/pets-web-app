import axios from 'axios';

const PetsApi = axios.create({
	baseURL: 'http://planb-production.up.railway.app/api',
});

export default PetsApi;
