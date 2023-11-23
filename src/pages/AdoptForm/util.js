import * as Yup from 'yup';
import { REGEX_PHONE, REGEX_TEXT, VALIDATIONS } from '../../utils/constants';

export const INITIAL_VALUES = {
	document: '',
	alternativePhone: '',
	address: '',
	adoptionMotivation: '',
};

export const AdoptValidations = Yup.object().shape({
	document: Yup.string()
		.min(2, VALIDATIONS.INVALID_FIELD)
		.max(40, VALIDATIONS.MAX_40_CHARACTER)
		.required(VALIDATIONS.FIELD_REQUIRED),
	address: Yup.string()
		.min(2, VALIDATIONS.INVALID_FIELD)
		.max(40, VALIDATIONS.MAX_40_CHARACTER)
		.required(VALIDATIONS.FIELD_REQUIRED),
	adoptionMotivation: Yup.string()
		.matches(REGEX_TEXT, VALIDATIONS.INVALID_FIELD)
		.min(2, VALIDATIONS.INVALID_FIELD)
		.max(160, VALIDATIONS.MAX_160_CHARACTER)
		.required(VALIDATIONS.FIELD_REQUIRED),
	alternativePhone: Yup.string()
		.matches(REGEX_PHONE, VALIDATIONS.SPECIFIC_VALUE)
		.required(VALIDATIONS.FIELD_REQUIRED),
});
