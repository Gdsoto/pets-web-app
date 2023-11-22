import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/shared/Button/Button';
import Input from '../../components/shared/FormComponents/Input/Input';
import { Form, FormLabel, FormWrap } from '../../components/shared/Form/Form';
import { Main, Title } from '../../components/shared/Main/Main';
import BackButton from '../../components/shared/BackButton/BackButton';
import PetsApi from '../../services/api';
import { toast } from 'react-hot-toast';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import BottomNav from '../../components/BottomNav/BottomNav';
import PageLayout from '../../components/Layout/PageLayout';
import CustomSelect from '../../components/shared/FormComponents/Select/Select';
import { useEffect, useState } from 'react';
import { changeIdToLabel } from '../../utils/functions';
import { Loader } from '../../components/shared/Loader/Loader';
import { INITIAL_VALUES, PetValidations } from './util';

const EditPet = ({ match }) => {
	const petId = match.params.id;
	const { roles } = useSelector((state: RootState) => state.login);
	const history = useHistory();

	const [isLoading, setIsLoading] = useState(false);
	const [formData, setformData] = useState({
		breed: [],
		types: [],
	});

	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: INITIAL_VALUES,
		resolver: yupResolver(PetValidations),
	});

	const onSubmit = async (data) => {
		try {
			await PetsApi.put(`/pet/update/${petId}`, {
				id: petId,
				name: data?.name,
				age: data?.age,
				race: {
					id: data?.race,
				},
				type: {
					id: data?.type,
				},
				sex: data?.sex,
				description: data?.description,
			});

			toast.success('Mascota Actualizada!');
			history.push('/dash');
		} catch (error) {
			toast.error('Error al crear la mascota');
		}
	};

	const getObjectID = (data, name: string): number | undefined => {
		const animal = data.find((item) => item.label === name);
		return animal?.value;
	};

	useEffect(() => {
		const getData = async () => {
			try {
				setIsLoading(true);
				const { data } = await PetsApi.get(`/pet/get/${petId}`);
				const {
					data: { races },
				} = await PetsApi.get('/race/get-all');
				const { data: types } = await PetsApi.get('/type/get-all');

				setValue('name', data?.pet?.name);
				setValue('age', data?.pet?.age);
				setValue('description', data?.pet?.description);
				setValue('sex', data?.pet?.sex);
				setValue(
					'race',
					getObjectID(changeIdToLabel(races), data?.pet?.race.name)
				);
				setValue(
					'type',
					getObjectID(changeIdToLabel(types.types), data?.pet?.type.name)
				);

				setformData({
					breed: changeIdToLabel(races),
					types: changeIdToLabel(types?.types),
				});
			} catch (error) {
				console.log(error);
				toast.error('error al obtener valores');
				history.push('/dash');
			} finally {
				setIsLoading(false);
			}
		};

		getData();
	}, [petId, history]);

	return (
		<PageLayout>
			<Main>
				<BackButton />
				<Title>Mascota 😸</Title>
				<FormWrap>
					{!isLoading ? (
						<Form onSubmit={handleSubmit(onSubmit)}>
							<FormLabel>Nombre</FormLabel>
							<Input
								id="name"
								type="text"
								label="Nombre"
								errors={errors}
								nameValue="name"
								control={control}
							/>
							<FormLabel>Edad</FormLabel>
							<Input
								id="age"
								type="text"
								label="Edad"
								errors={errors}
								nameValue="age"
								control={control}
							/>
							<FormLabel>Descripción</FormLabel>
							<Input
								id="description"
								type="text"
								label="Descripción"
								errors={errors}
								nameValue="description"
								control={control}
								multiline
							/>
							<FormLabel>Raza</FormLabel>
							<CustomSelect
								errors={errors}
								nameValue="race"
								control={control}
								setValue={setValue}
								options={formData.breed}
							/>
							<FormLabel>Tipo</FormLabel>
							<CustomSelect
								errors={errors}
								nameValue="type"
								control={control}
								setValue={setValue}
								options={formData.types}
							/>
							<FormLabel>Sexo</FormLabel>
							<CustomSelect
								errors={errors}
								nameValue="sex"
								control={control}
								setValue={setValue}
								options={[
									{
										label: 'Macho',
										value: 'MACHO',
									},
									{
										label: 'Hembra',
										value: 'HEMBRA',
									},
								]}
							/>
							<Button type="submit">Actualizar mascota</Button>
						</Form>
					) : (
						<div className="loader-wrap">
							<Loader />
						</div>
					)}
				</FormWrap>
			</Main>
			<BottomNav role={roles} />
		</PageLayout>
	);
};

export default EditPet;
