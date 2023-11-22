import { Redirect, Route } from 'react-router';

// Pages
import PetCardList from '../pages/PetCardList/PetCardList';
import Dashboard from '../pages/Dashboard/Dashboard';
import BottomNav from '../components/BottomNav/BottomNav';
import PageLayout from '../components/Layout/PageLayout';
import PetDetail from '../pages/PetDetail/PetDetail';
import AdoptForm from '../pages/AdoptForm/AdoptForm';
import Requests from '../pages/Requests/Requests';
import RequestDetail from '../pages/RequestDetail/RequestDetail';
import CreatePet from '../pages/CreatePet/CreatePet';
import EditPet from '../pages/EditPet/EditPet';

const AuthRoutes = (role = []) => {
	const adminRoutes = () => {
		return (
			<>
				<Redirect exact path="/" to="/dash" />
				<Route
					path="/dash"
					render={() => (
						<PageLayout>
							<Dashboard />
							<BottomNav role={role} />
						</PageLayout>
					)}
					exact={true}
				/>
				<Route
					path="/admin-pets"
					render={() => (
						<PageLayout>
							<PetCardList />
							<BottomNav role={role} />
						</PageLayout>
					)}
					exact={true}
				/>
				<Route
					path="/request"
					render={() => (
						<PageLayout>
							<Requests />
							<BottomNav role={role} />
						</PageLayout>
					)}
					exact={true}
				/>
				<Route
					path="/application-detail/:id"
					component={RequestDetail}
					exact={true}
				/>
				<Route path="/new-pet" component={CreatePet} exact={true} />
				<Route path="/pet/:id" component={PetDetail} exact={true} />
				<Route path="/edit-pet/:id" component={EditPet} exact={true} />
			</>
		);
	};

	const userRoutes = () => {
		return (
			<>
				<Redirect exact path="/" to="/dash" />
				<Route
					path="/dash"
					render={() => (
						<PageLayout>
							<Dashboard />
							<BottomNav />
						</PageLayout>
					)}
					exact={true}
				/>
				<Route
					path="/pets"
					render={() => (
						<PageLayout>
							<PetCardList />
							<BottomNav />
						</PageLayout>
					)}
					exact={true}
				/>
				<Route
					path="/request"
					render={() => (
						<PageLayout>
							<Requests />
							<BottomNav />
						</PageLayout>
					)}
					exact={true}
				/>
				<Route path="/pet/:id" component={PetDetail} exact={true} />
				<Route path="/adopt/:id" component={AdoptForm} exact={true} />
				<Route
					path="/application-detail/:id"
					component={RequestDetail}
					exact={true}
				/>
			</>
		);
	};

	return !role.includes('ADMIN') ? userRoutes() : adminRoutes();
};

export default AuthRoutes;
