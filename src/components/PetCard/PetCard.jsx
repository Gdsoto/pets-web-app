/* eslint-disable react/prop-types */
import { CardWrapper } from './style';
import { Fab } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { eyeOutline, heartSharp } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const PetCard = ({ pet }) => {
	const { roles } = useSelector((state) => state.login);
	const history = useHistory();

	const onClick = () => {
		history.push(`/pet/${pet.id}`);
	};

	return (
		<CardWrapper>
			<picture>
				<img src={pet?.img[0]?.url ?? ''} alt="pet" />
			</picture>
			<div className="detail-wrap">
				<div>
					<p className="name-wrap">{pet.name}</p>
					<p className="age-wrap">{pet.age}</p>
				</div>
				<div className="button-wrap">
					<Fab aria-label="add" color="secondary" onClick={onClick}>
						<IonIcon
							icon={!roles.includes('ADMIN') ? heartSharp : eyeOutline}
						></IonIcon>
					</Fab>
				</div>
			</div>
		</CardWrapper>
	);
};

export default PetCard;
