import * as Yup from 'yup';
import { REGEX_TEXT, VALIDATIONS } from '../../utils/constants';

export const INITIAL_VALUES = {
	name: '',
	age: '',
	description: '',
	race: 0,
	sex: '',
	type: 0,
	files: [],
};

export const PetValidations = Yup.object().shape({
	name: Yup.string()
		.matches(REGEX_TEXT, VALIDATIONS.INVALID_FIELD)
		.min(2, VALIDATIONS.INVALID_FIELD)
		.max(40, VALIDATIONS.MAX_40_CHARACTER)
		.required(VALIDATIONS.FIELD_REQUIRED),
	age: Yup.string()
		.min(2, VALIDATIONS.INVALID_FIELD)
		.max(40, VALIDATIONS.MAX_40_CHARACTER)
		.required(VALIDATIONS.FIELD_REQUIRED),
	description: Yup.string()
		.matches(REGEX_TEXT, VALIDATIONS.INVALID_FIELD)
		.min(18, VALIDATIONS.INVALID_FIELD)
		.max(160, VALIDATIONS.MAX_160_CHARACTER)
		.required(VALIDATIONS.FIELD_REQUIRED),
	race: Yup.number()
		.positive(VALIDATIONS.INVALID_FIELD)
		.min(1, VALIDATIONS.INVALID_FIELD)
		.required(VALIDATIONS.FIELD_REQUIRED),
	type: Yup.number()
		.positive(VALIDATIONS.INVALID_FIELD)
		.min(1, VALIDATIONS.INVALID_FIELD)
		.required(VALIDATIONS.FIELD_REQUIRED),
	sex: Yup.string()
		.min(2, VALIDATIONS.INVALID_FIELD)
		.max(40, VALIDATIONS.MAX_40_CHARACTER)
		.required(VALIDATIONS.FIELD_REQUIRED),
});
