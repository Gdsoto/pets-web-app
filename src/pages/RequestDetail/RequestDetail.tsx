import { Main, Title } from '../../components/shared/Main/Main';
import BackButton from '../../components/shared/BackButton/BackButton';
import { useEffect, useState } from 'react';
import { ListWrapper } from './style';
import { FormWrap } from '../../components/shared/Form/Form';
import { Loader } from '../../components/shared/Loader/Loader';
import { IonIcon } from '@ionic/react';
import {
	bodyOutline,
	pawOutline,
	phonePortraitOutline,
	ribbonOutline,
	settingsOutline,
	shirtOutline,
	statsChartOutline,
	todayOutline,
} from 'ionicons/icons';
import PetsApi from '../../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import {
	Alert,
	Chip,
	Divider,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import PageLayout from '../../components/Layout/PageLayout';
import BottomNav from '../../components/BottomNav/BottomNav';
import { Button, OutlineButton } from '../../components/shared/Button/Button';
import { useHistory } from 'react-router';
import { toast } from 'react-hot-toast';

interface Iaplication {
	status: string;
	address: string;
	adoptionMotivation: string;
	alternativePhone: string;
	document: string;
	pet: {
		name: string;
		type: {
			name: string;
		};
		sex: string;
		race: {
			name: string;
		};
		age: number;
	};
	person: {
		firtsName: string;
		lastName: string;
		phone: string;
	};
}

const RequestDetail = ({ match }) => {
	const history = useHistory();
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

	const statusData = {
		PENDING: {
			label: 'Pendiente',
			value: 'PENDING',
		},
		APPROVED: {
			label: 'Aprobado',
			value: 'APPROVED',
		},
		REJECTED: {
			label: 'Negado',
			value: 'REJECTED',
		},
		CANCELLED: {
			label: 'Cancelado',
			value: 'CANCELLED',
		},
	};

	const applicationId = match.params.id;
	const { roles } = useSelector((state: RootState) => state.login);
	const [isLoading, setIsLoading] = useState(false);
	const [application, setApplication] = useState<Iaplication>({
		status: 'PENDING',
		address: '',
		adoptionMotivation: '',
		alternativePhone: '',
		document: '',
		pet: {
			name: '',
			type: {
				name: '',
			},
			race: {
				name: '',
			},
			age: 0,
			sex: 'HEMBRA',
		},
		person: {
			firtsName: '',
			lastName: '',
			phone: '',
		},
	});
	const [status, setStatus] = useState(statusData[application.status].value);

	const handleChange = (event: SelectChangeEvent) => {
		setStatus(event.target.value);
	};

	const handleClick = async () => {
		updateStatus('CANCELLED');
	};

	const updateStatus = async (petStatus) => {
		try {
			await PetsApi.put(`/application/update/${applicationId}`, {
				status: petStatus,
			});
			toast.success('Estado actualizado!');
			history.push('/dash');
		} catch (error) {
			toast.error('Algo salio mal!');
		}
	};

	useEffect(() => {
		const getApplication = async () => {
			try {
				setIsLoading(true);
				const { data } = await PetsApi.get(`/application/get/${applicationId}`);
				setApplication(data?.aplication);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getApplication();
	}, [applicationId]);

	const getDetail = () => {
		if (!roles.includes('ADMIN')) {
			return (
				<section className="detail-wrap">
					<p className="title">
						<IonIcon icon={settingsOutline}></IonIcon> Estado de solicitud:
					</p>
					<div className="title">
						<Alert severity={statusTypes[application.status].type}>
							{statusTypes[application.status].value}
						</Alert>
					</div>
					<p className="title">
						<IonIcon icon={pawOutline}></IonIcon> Tipo:
					</p>
					<p className="text">{application?.pet?.type?.name}</p>
					<p className="title">
						<IonIcon icon={todayOutline}></IonIcon> Edad:
					</p>
					<p className="text">{application?.pet?.age}</p>
					<p className="title">
						<IonIcon icon={ribbonOutline}></IonIcon> Raza:
					</p>
					<p className="text">{application?.pet?.race?.name}</p>
					<p className="title">
						<IonIcon icon={shirtOutline}></IonIcon> Sexo:
					</p>
					<p className="text space">
						{application?.pet?.sex === 'HEMBRA' ? 'Hembra' : 'Macho'}
					</p>
					{application?.status !== 'CANCELLED' &&
						application?.status !== 'REJECTED' && (
							<OutlineButton onClick={handleClick}>
								Cancelar solicitud 😿
							</OutlineButton>
						)}
				</section>
			);
		}

		return (
			<section className="detail-wrap">
				<p className="title">
					<IonIcon icon={settingsOutline}></IonIcon> Estado de solicitud:
				</p>
				<div className="title">
					<Alert severity={statusTypes[application.status].type}>
						{statusTypes[application.status].value}
					</Alert>
				</div>
				<Divider>
					<Chip label="Solicitud" />
				</Divider>

				<p className="title">
					<IonIcon icon={bodyOutline}></IonIcon> Solicitante:
				</p>
				<p className="text">
					{application?.person?.firtsName} {application?.person?.lastName}
				</p>

				<p className="title">
					<IonIcon icon={pawOutline}></IonIcon> Dirección de residencia:
				</p>
				<p className="text">{application.address}</p>
				<p className="title">
					<IonIcon icon={phonePortraitOutline}></IonIcon> Teléfono:
				</p>
				<p className="text">{application?.person?.phone}</p>
				<p className="title">
					<IonIcon icon={phonePortraitOutline}></IonIcon> Teléfono Alternativo:
				</p>
				<p className="text">{application?.alternativePhone}</p>
				<p className="title">
					<IonIcon icon={ribbonOutline}></IonIcon> Documento:
				</p>
				<p className="text">{application?.document}</p>
				<p className="title">
					<IonIcon icon={shirtOutline}></IonIcon> Motivo de adopción:
				</p>
				<p className="text space">{application?.adoptionMotivation}</p>

				<Divider>
					<Chip label="Mascota" />
				</Divider>

				<p className="title">
					<IonIcon icon={pawOutline}></IonIcon> Tipo:
				</p>
				<p className="text">{application?.pet?.type?.name}</p>
				<p className="title">
					<IonIcon icon={todayOutline}></IonIcon> Edad:
				</p>
				<p className="text">{application?.pet?.age}</p>
				<p className="title">
					<IonIcon icon={ribbonOutline}></IonIcon> Raza:
				</p>
				<p className="text">{application?.pet?.race?.name}</p>
				<p className="title">
					<IonIcon icon={shirtOutline}></IonIcon> Sexo:
				</p>
				<p className="text space">
					{application?.pet?.sex === 'HEMBRA' ? 'Hembra' : 'Macho'}
				</p>

				<Divider>
					<Chip label="Acciones" />
				</Divider>

				<p className="title">
					<IonIcon icon={statsChartOutline}></IonIcon> Actualizar Estado:
				</p>

				<Select
					id="status-select"
					value={status}
					label="Estado"
					onChange={handleChange}
					color="warning"
				>
					<MenuItem disabled value="">
						<em>Estado</em>
					</MenuItem>
					<MenuItem value={statusData.APPROVED.value}>
						{statusData.APPROVED.label}
					</MenuItem>
					<MenuItem value={statusData.PENDING.value}>
						{statusData.PENDING.label}
					</MenuItem>
					<MenuItem value={statusData.REJECTED.value}>
						{statusData.REJECTED.label}
					</MenuItem>
					<MenuItem value={statusData.CANCELLED.value}>
						{statusData.CANCELLED.label}
					</MenuItem>
				</Select>
				<Button onClick={() => updateStatus(status)}>Actualizar estado</Button>
			</section>
		);
	};

	return (
		<PageLayout>
			<Main>
				<BackButton />
				<Title>{application?.pet?.name} 😺</Title>
				<ListWrapper>
					{isLoading ? (
						<FormWrap>
							<div className="loader-wrap">
								<Loader />
							</div>
						</FormWrap>
					) : (
						getDetail()
					)}
				</ListWrapper>
			</Main>
			<BottomNav role={roles} />
		</PageLayout>
	);
};

export default RequestDetail;
