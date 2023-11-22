import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { INITIAL_VALUES, PetValidations } from './util';
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
import Files from 'react-files';

const CreatePet = () => {
	const { roles } = useSelector((state: RootState) => state.login);
	const history = useHistory();

	const [files, setFiles] = useState([]);
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
			const res = await PetsApi.post('/pet/create', {
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

			const petId = res?.data?.pet?.id;

			await files.forEach(async (file) => {
				const formData = new FormData();
				const config = {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				};
				formData.append('imgs', file);
				await PetsApi.post(`/pet/save-imgs/${petId}`, formData, config);
			});

			toast.success('Mascota creada!');
			history.push('/dash');
		} catch (error) {
			toast.error('Error al crear la mascota');
		}
	};

	const handleChange = (files) => {
		setFiles(files);
		setValue('files', files);
	};

	const handleError = (error, file) => {
		console.log('error code ' + error.code + ': ' + error.message);
		toast.error('error al procesar la imagen');
	};

	useEffect(() => {
		const getFormData = async () => {
			try {
				const {
					data: { races },
				} = await PetsApi.get('/race/get-all');
				const { data: types } = await PetsApi.get('/type/get-all');

				setformData({
					breed: changeIdToLabel(races),
					types: changeIdToLabel(types?.types),
				});
			} catch (error) {
				toast.error('error al obtener valores');
				history.push('/dash');
			}
		};

		getFormData();
	}, []);

	return (
		<PageLayout>
			<Main>
				<BackButton />
				<Title>Mascota 😸</Title>
				<FormWrap>
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
						<div className="files">
							<Files
								className="files-dropzone"
								onChange={handleChange}
								onError={handleError}
								accepts={['image/png', 'image/jpeg', 'image/jpg']}
								multiple
								maxFileSize={10000000}
								minFileSize={0}
								clickable
							>
								Seleccionar Imagenes
							</Files>
						</div>
						{files && (
							<ul className="file-list">
								{files.map((file, id) => (
									<li key={id}>{file.name}</li>
								))}
							</ul>
						)}
						<Button type="submit">Crear mascota</Button>
					</Form>
				</FormWrap>
			</Main>
			<BottomNav role={roles} />
		</PageLayout>
	);
};

export default CreatePet;
