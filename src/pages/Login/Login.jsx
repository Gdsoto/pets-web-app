import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { INITIAL_VALUES, loginValidations } from './util';
import {
	Button,
	LinkButton,
	OutlineButton,
} from '../../components/shared/Button/Button';
import Input from '../../components/shared/FormComponents/Input/Input';
import { Form, FormLabel, FormWrap } from '../../components/shared/Form/Form';
import { Main, Title } from '../../components/shared/Main/Main';
import { useHistory } from 'react-router';
import BackButton from '../../components/shared/BackButton/BackButton';
import PetsApi from '../../services/api';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { changeLogState } from '../../context/slices/authSlice';
import { updateLoginState } from '../../context/slices/loginSlice';

const Login = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: INITIAL_VALUES,
		resolver: yupResolver(loginValidations),
	});

	const onSubmit = (data) => {
		PetsApi.get(`/person/get/${data?.password}/${data?.email}`)
			.then((res) => {
				toast.success('Bienvenido!');
				dispatch(changeLogState(true));
				dispatch(updateLoginState(res?.data?.persons));
				history.push(`/dash`);
			})
			.catch((error) => {
				toast.error('Usuario o contraseña incorrecta');
				console.log(error);
			});
	};

	const goToRegister = () => {
		history.push('/register');
	};

	return (
		<Main>
			<BackButton />
			<Title>Iniciar sesión</Title>
			<FormWrap>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormLabel>Correo Electronico</FormLabel>
					<Input
						id="email"
						type="text"
						label="Email"
						errors={errors}
						nameValue="email"
						control={control}
					/>
					<FormLabel>Contraseña</FormLabel>
					<Input
						id="pass"
						type="password"
						label="Contraseña"
						errors={errors}
						nameValue="password"
						control={control}
					/>
					<Button type="submit">Iniciar Sesión</Button>
					<OutlineButton onClick={goToRegister}>
						¿No tienes cuenta? Registrate
					</OutlineButton>
					<LinkButton>¿Olvidaste la contraseña?</LinkButton>
				</Form>
			</FormWrap>
		</Main>
	);
};

export default Login;
