/* eslint-disable react/prop-types */
import { NavWrapper } from './style';
import { IonIcon } from '@ionic/react';
import { appsOutline, logoOctocat, documentsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const BottomNav = ({ role = ['USER'] }) => {
	const history = useHistory();

	const navigate = (redirect) => {
		history.push(redirect);
	};

	return (
		<NavWrapper>
			<div className="nav-wrap">
				{!role.includes('ADMIN') ? (
					<>
						<div className="icon" onClick={() => navigate('/dash')}>
							<IonIcon icon={appsOutline}></IonIcon>
						</div>
						<div className="icon" onClick={() => navigate('/pets')}>
							<IonIcon icon={logoOctocat}></IonIcon>
						</div>
						<div className="icon" onClick={() => navigate('/request')}>
							<IonIcon icon={documentsOutline}></IonIcon>
						</div>
					</>
				) : (
					<>
						<div className="icon" onClick={() => navigate('/dash')}>
							<IonIcon icon={appsOutline}></IonIcon>
						</div>
						<div className="icon" onClick={() => navigate('/admin-pets')}>
							<IonIcon icon={logoOctocat}></IonIcon>
						</div>
						<div className="icon" onClick={() => navigate('/request')}>
							<IonIcon icon={documentsOutline}></IonIcon>
						</div>
					</>
				)}
			</div>
		</NavWrapper>
	);
};

export default BottomNav;
