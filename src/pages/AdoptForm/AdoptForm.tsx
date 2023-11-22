import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { INITIAL_VALUES, AdoptValidations } from './util';
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

const AdoptForm = ({ match }) => {
	const petId = match.params.id;
	const { id } = useSelector((state: RootState) => state.login);
	const history = useHistory();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: INITIAL_VALUES,
		resolver: yupResolver(AdoptValidations),
	});

	const onSubmit = (data) => {
		PetsApi.post('/api/application/create', {
			person: { id },
			pet: { id: petId },
			document: data?.document,
			alternativePhone: data?.alternativePhone,
			address: data?.address,
			adoptionMotivation: data?.adoptionMotivation,
		})
			.then((response) => {
				// Manejo de la respuesta exitosa
				console.log(response.data);
				toast.success('Solicitud enviada!');
				history.push('/dash');
			})
			.catch((error) => {
				// Manejo del error
				toast.error('se presento un problema!');
				console.log(error);
			});
	};

	return (
		<PageLayout>
			<Main>
				<BackButton />
				<Title>Adopta 😸</Title>
				<FormWrap>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<FormLabel>Documento</FormLabel>
						<Input
							id="document"
							type="text"
							label="Número"
							errors={errors}
							nameValue="document"
							control={control}
						/>
						<FormLabel>Télefono</FormLabel>
						<Input
							id="alternativePhone"
							type="text"
							label="Celular"
							errors={errors}
							nameValue="alternativePhone"
							control={control}
						/>
						<FormLabel>Dirección</FormLabel>
						<Input
							id="address"
							type="text"
							label="Residencia"
							errors={errors}
							nameValue="address"
							control={control}
						/>
						<FormLabel>¿Por que quieres adoptarme?</FormLabel>
						<Input
							id="adoptionMotivation"
							type="text"
							label="motivación"
							errors={errors}
							nameValue="adoptionMotivation"
							control={control}
							multiline
						/>
						<Button type="submit">Enviar solicitud</Button>
					</Form>
				</FormWrap>
			</Main>
			<BottomNav />
		</PageLayout>
	);
};

export default AdoptForm;
