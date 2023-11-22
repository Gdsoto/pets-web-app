// Colors
export const PINK_700 = '#FCB1A7';
export const PINK_500 = '#FFDACC';
export const PINK_300 = '#FFEEE6';
export const GREEN_700 = '#AECFBA';
export const GREEN_400 = '#83AF93';
export const GRAY_200 = '#A6A6A6';
export const GRAY_500 = '#595959';
export const GRAY_800 = '#262626';
export const BLACK = '#0D0D0D';
export const WHITE = '#FFFF';

// Validations

export const VALIDATIONS = {
	INVALID_FIELD: 'Campo invalido',
	FIELD_REQUIRED: 'Campo requerido',
	DIFFERENT_VALUES: 'Los campos no coinciden',
	MAX_40_CHARACTER: 'Maximo 40 caracteres',
	MAX_160_CHARACTER: 'Maximo 160 caracteres',
	SPECIFIC_VALUE: 'El teléfono debe empezar con 3'
};

export const REGEX_TEXT =
	/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+(s*[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/g;

export const REGEX_PHONE = /^([3|6]{1})([0-9]{9})+$/;
