import { styled } from 'styled-components';
import {
	GRAY_500,
	GRAY_800,
	PINK_500,
	PINK_700,
} from '../../../utils/constants';

export const Button = styled.button`
	@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
	font-family: 'Rubik', sans-serif;
	background-color: ${PINK_500};
	border: 1px solid ${PINK_500};
	font-size: 16px;
	border-radius: 8px;
	padding: 14px 20px;
	color: ${GRAY_500};
	cursor: pointer;

	&:focus {
		color: ${GRAY_500};
		background-color: ${PINK_700};
	}
`;

export const OutlineButton = styled.button`
	@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
	font-family: 'Rubik', sans-serif;
	background-color: transparent;
	border: 1px solid ${GRAY_800};
	font-size: 16px;
	cursor: pointer;
	border-radius: 8px;
	padding: 14px 20px;
	color: ${GRAY_800};
`;

export const LinkButton = styled.button`
	@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
	font-family: 'Rubik', sans-serif;
	background-color: transparent;
	border: none;
	font-size: 16px;
	border-radius: 8px;
	padding: 14px 20px;
	color: ${PINK_700};
`;
