import { DashWrapper } from './style';
import { IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { changeLogState } from '../../context/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import { useEffect, useState } from 'react';
import PetsApi from '../../services/api';
import { Fab } from '@mui/material';

const Dashboard = () => {
	const loginData = useSelector((state: RootState) => state.login);
	const { roles } = useSelector((state: RootState) => state.login);
	const dispatch = useDispatch();
	const history = useHistory();
	const [data, setData] = useState({
		pets: 0,
		aplications: 0,
	});

	const logOut = () => {
		dispatch(changeLogState(false));
		history.push('/login');
	};

	useEffect(() => {
		const getPets = async () => {
			try {
				const { data: pets } = await PetsApi.get('/pet/get-all');
				let aplicationsLength = 0;

				if (!roles.includes('ADMIN')) {
					const { data: aplications } = await PetsApi.get(
						`/application/get/person/${loginData.id}`
					);

					aplicationsLength = aplications?.application?.length;
				} else {
					const { data: aplications } = await PetsApi.get(
						`/application/get-all`
					);

					aplicationsLength = aplications?.application?.length;
				}

				setData({
					pets: pets.length,
					aplications: aplicationsLength,
				});
			} catch (error) {
				console.log(error);
			}
		};

		getPets();
	}, [loginData.id, roles]);

	return (
		<DashWrapper>
			<div className="log-wrap">
				<div onClick={logOut}>
					<IonIcon icon={logOutOutline}></IonIcon>
				</div>
			</div>
			<div className="welcome">
				<p>Hola 🐱</p>
				<p>{loginData.firtsName}!</p>
			</div>
			<div className="dash-wrap">
				<div className="pets">
					<p className="number">{data.pets}</p>
					<p className="text">mascotas</p>
				</div>
				<div className="request">
					<p className="number">{data.aplications}</p>
					<p className="text">solicitudes</p>
				</div>
				<div className="adopt">
					<p className="number">0</p>
					<p className="text">adopciones</p>
				</div>
			</div>
		</DashWrapper>
	);
};

export default Dashboard;
