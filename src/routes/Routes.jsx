// Components
import LoaderAnimation from '../components/LoaderAnimation/LoaderAnimation';
import AuthRoutes from './AuthRoutes';
import UnAuthRoutes from './UnAuthRoutes';

// Context
import { useSelector } from 'react-redux';
import useAnimation from '../Hooks/useAnimation';
import { BrowserRouter } from 'react-router-dom';

const Routes = () => {
	const isAuth = useSelector((state) => state.auth.isAuth);
	const { roles } = useSelector((state) => state.login);
	const { animation } = useAnimation(4000);

	if (animation) {
		return <LoaderAnimation />;
	}

	return (
		<BrowserRouter>{isAuth ? AuthRoutes(roles) : UnAuthRoutes()}</BrowserRouter>
	);
};

export default Routes;
