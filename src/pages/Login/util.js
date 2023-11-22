import * as Yup from 'yup';
import { VALIDATIONS } from '../../utils/constants';

export const INITIAL_VALUES = {
	email: '',
	password: '',
};

export const loginValidations = Yup.object().shape({
	email: Yup.string()
		.email(VALIDATIONS.INVALID_FIELD)
		.required(VALIDATIONS.FIELD_REQUIRED),
	password: Yup.string().required(VALIDATIONS.FIELD_REQUIRED),
});
