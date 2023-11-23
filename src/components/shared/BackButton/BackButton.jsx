/* eslint-disable react/prop-types */
import { useHistory } from 'react-router';
import { BackWrapper } from './style';
import { IonIcon } from '@ionic/react';
import { arrowBackOutline, logoOctocat } from 'ionicons/icons';

const BackButton = ({ arrow = false }) => {
	const history = useHistory();

	const navigate = (redirect) => {
		history.push(redirect);
	};

	return (
		<BackWrapper>
			<div className="icon">
				<IonIcon icon={logoOctocat}></IonIcon>
			</div>
			{arrow && (
				<div className="icon" onClick={() => navigate('/login')}>
					<IonIcon icon={arrowBackOutline}></IonIcon>
				</div>
			)}
		</BackWrapper>
	);
};

export default BackButton;
