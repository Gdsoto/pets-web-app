/* eslint-disable react/prop-types */
import { Main, Title } from '../../components/shared/Main/Main';
import BackButton from '../../components/shared/BackButton/BackButton';
import { useEffect, useState } from 'react';
import { FormWrap } from '../../components/shared/Form/Form';
import { Loader } from '../../components/shared/Loader/Loader';
import { IonIcon } from '@ionic/react';
import {
	earthOutline,
	handLeftOutline,
	pawOutline,
	ribbonOutline,
	shirtOutline,
	todayOutline,
} from 'ionicons/icons';
import PetsApi from '../../services/api';
import { PetWrapper } from './style';
import PageLayout from '../../components/Layout/PageLayout';
import BottomNav from '../../components/BottomNav/BottomNav';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Button } from '../../components/shared/Button/Button';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const PetCardList = ({ match }) => {
	const history = useHistory();
	const { roles } = useSelector((state) => state.login);
	const petId = match.params.id;
	const [pet, setPet] = useState({
		name: '',
		img: [],
		description: '',
		type: {
			name: '',
		},
		race: {
			name: '',
		},
		sex: '',
		age: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	const createAdoption = () => {
		history.push(`/adopt/${petId}`);
	};
	const updatePet = () => {
		history.push(`/edit-pet/${petId}`);
	};

	const getPetComponent = () => {
		if (Object.keys(pet).length > 0) {
			return (
				<>
					<Carousel
						showArrows={false}
						showThumbs={false}
						showStatus={false}
						dynamicHeight={false}
					>
						{pet?.img.map((img, id) => (
							<div key={id} className="img-wrap">
								<img src={img?.url} alt="pet" />
							</div>
						))}
					</Carousel>
					<section className="detail-wrap">
						<p className="title">
							<IonIcon icon={handLeftOutline}></IonIcon> Hola! me llamo{' '}
							{pet?.name}
						</p>
						<p className="text">{pet?.description}</p>
						<p className="title">
							<IonIcon icon={pawOutline}></IonIcon> Soy un
						</p>
						<p className="text">{pet?.type?.name}</p>
						<p className="title">
							<IonIcon icon={todayOutline}></IonIcon> Tengo
						</p>
						<p className="text">{pet?.age}</p>
						<p className="title">
							<IonIcon icon={ribbonOutline}></IonIcon> Mi raza es
						</p>
						<p className="text">{pet?.race?.name}</p>
						<p className="title">
							<IonIcon icon={shirtOutline}></IonIcon> Soy
						</p>
						<p className="text space">
							{pet?.sex === 'HEMBRA' ? 'Hembra' : 'Macho'}
						</p>
						{!roles.includes('ADMIN') ? (
							<Button onClick={createAdoption}>Adoptame!</Button>
						) : (
							<Button onClick={updatePet}>Actualizar mascota</Button>
						)}
					</section>
				</>
			);
		}

		return (
			<FormWrap>
				<div className="not-found">
					<IonIcon icon={earthOutline}></IonIcon>
					<p>No se encontro detalle de la mascota.</p>
				</div>
			</FormWrap>
		);
	};

	useEffect(() => {
		const getPet = async () => {
			try {
				setIsLoading(true);
				const { data } = await PetsApi.get(`/pet/get/${petId}`);
				setPet(data?.pet);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getPet();
	}, [petId]);

	return (
		<PageLayout>
			<Main>
				<BackButton />
				<Title>{`${pet?.name} 😺`}</Title>
				<PetWrapper>
					{isLoading ? (
						<FormWrap>
							<div className="loader-wrap">
								<Loader />
							</div>
						</FormWrap>
					) : (
						getPetComponent()
					)}
				</PetWrapper>
			</Main>
			<BottomNav role={roles} />
		</PageLayout>
	);
};

export default PetCardList;
