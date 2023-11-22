import { Toaster } from 'react-hot-toast';
import { store } from './context/store';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';

function App() {
	return (
		<>
			<Toaster position="top-center" reverseOrder={true} />
			<Provider store={store}>
				<Routes />
			</Provider>
		</>
	);
}

export default App;
