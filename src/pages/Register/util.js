import * as Yup from 'yup';
import { REGEX_PHONE, REGEX_TEXT, VALIDATIONS } from '../../utils/constants';

export const INITIAL_VALUES = {
	name: '',
	last_name: '',
	role: 'user',
	email: '',
	password: '',
	confirm_password: '',
};

export const RegisterValidations = Yup.object().shape({
	name: Yup.string()
		.matches(REGEX_TEXT, VALIDATIONS.INVALID_FIELD)
		.min(2, VALIDATIONS.INVALID_FIELD)
		.max(40, VALIDATIONS.MAX_40_CHARACTER)
		.required(VALIDATIONS.FIELD_REQUIRED),
	last_name: Yup.string()
		.matches(REGEX_TEXT, VALIDATIONS.INVALID_FIELD)
		.min(2, VALIDATIONS.INVALID_FIELD)
		.max(40, VALIDATIONS.MAX_40_CHARACTER)
		.required(VALIDATIONS.FIELD_REQUIRED),
	phone: Yup.string()
		.matches(REGEX_PHONE, VALIDATIONS.SPECIFIC_VALUE)
		.required(VALIDATIONS.FIELD_REQUIRED),
	email: Yup.string()
		.email(VALIDATIONS.INVALID_FIELD)
		.required(VALIDATIONS.FIELD_REQUIRED),
	password: Yup.string().required(VALIDATIONS.FIELD_REQUIRED),
	confirm_password: Yup.string()
		.oneOf([Yup.ref('password'), null], VALIDATIONS.DIFFERENT_VALUES)
		.required(VALIDATIONS.FIELD_REQUIRED),
});
