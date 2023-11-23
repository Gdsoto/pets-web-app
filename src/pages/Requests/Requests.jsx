import { Main, Title } from '../../components/shared/Main/Main';
import BackButton from '../../components/shared/BackButton/BackButton';
import { useEffect, useState } from 'react';
import { ListWrapper } from './style';
import { FormWrap } from '../../components/shared/Form/Form';
import { Loader } from '../../components/shared/Loader/Loader';
import { IonIcon } from '@ionic/react';
import {
	bodyOutline,
	diamondOutline,
	earthOutline,
	settingsOutline,
} from 'ionicons/icons';
import PetsApi from '../../services/api';
import { useSelector } from 'react-redux';
import { Button } from '../../components/shared/Button/Button';
import { Alert } from '@mui/material';
import { useHistory } from 'react-router';

const Requests = () => {
	const history = useHistory();
	const { id, roles } = useSelector((state) => state.login);
	const [error, setError] = useState(true);
	const [applications, setApplications] = useState({
		application: [
			{
				id: 0,
				status: 'PENDING',
				pet: {
					name: '',
					age: '',
				},
				person: {
					firtsName: '',
					lastName: '',
				},
			},
		],
	});
	const [isLoading, setIsLoading] = useState(false);

	const statusTypes = {
		PENDING: {
			type: 'info',
			value: 'Pendiente',
		},
		APPROVED: {
			type: 'success',
			value: 'Aprobado',
		},
		REJECTED: {
			type: 'error',
			value: 'Negado',
		},
		CANCELLED: {
			type: 'warning',
			value: 'Cancelado',
		},
	};

	const onClick = (appId) => {
		history.push(`/application-detail/${appId}`);
	};

	const getPetsComponent = () => {
		if (applications?.application?.length > 0) {
			return (
				<>
					{applications?.application?.map((pet, id) => (
						<div key={id}>
							<section className="detail-wrap">
								<p className="title">
									<IonIcon icon={diamondOutline}></IonIcon> Mascota:
								</p>
								<p className="text">{pet?.pet?.name}</p>

								{roles.includes('ADMIN') ? (
									<>
										<p className="title">
											<IonIcon icon={bodyOutline}></IonIcon> Solicitante:
										</p>
										<p className="text">
											{pet?.person?.firtsName} {pet?.person?.lastName}
										</p>
									</>
								) : (
									<>
										<p className="title">
											<IonIcon icon={bodyOutline}></IonIcon> Edad:
										</p>
										<p className="text">{pet?.pet?.age}</p>
									</>
								)}

								<p className="title">
									<IonIcon icon={settingsOutline}></IonIcon> Estado de
									solicitud:
								</p>
								<div>
									<Alert severity={statusTypes[pet.status].type}>
										{statusTypes[pet.status].value}
									</Alert>
								</div>
								<Button onClick={() => onClick(pet.id)}>Ver más</Button>
							</section>
						</div>
					))}
				</>
			);
		}

		return (
			<FormWrap>
				<div className="not-found">
					<IonIcon icon={earthOutline}></IonIcon>
					<p>No se encontraron mascotas.</p>
				</div>
			</FormWrap>
		);
	};

	useEffect(() => {
		const getApplications = async () => {
			try {
				setIsLoading(true);

				let aplications;

				if (!roles.includes('ADMIN')) {
					const { data } = await PetsApi.get(`/application/get/person/${id}`);

					aplications = data;
				} else {
					const { data } = await PetsApi.get(`/application/get-all`);

					aplications = data;
				}

				setError(false);
				setApplications(aplications);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getApplications();
	}, [id, roles]);

	return (
		<Main>
			<BackButton />
			<Title>Solicitudes 😺</Title>
			<ListWrapper>
				{isLoading ? (
					<FormWrap>
						<div className="loader-wrap">
							<Loader />
						</div>
					</FormWrap>
				) : error ? (
					<FormWrap>
						<div className="not-found">
							<IonIcon icon={earthOutline}></IonIcon>
							<p>No se encontraron solicitudes.</p>
						</div>
					</FormWrap>
				) : (
					getPetsComponent()
				)}
			</ListWrapper>
		</Main>
	);
};

export default Requests;
