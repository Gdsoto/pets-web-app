import { Redirect, Route } from 'react-router';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

// Pages

const UnAuthRoutes = () => {
	return (
		<>
			<Redirect exact path="/" to="/login" />
			<Route path="/login" render={() => <Login />} exact={true} />
			<Route path="/register" render={() => <Register />} exact={true} />
		</>
	);
};

export default UnAuthRoutes;
