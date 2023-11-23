import { styled } from 'styled-components';
import { GRAY_500, WHITE } from '../../../utils/constants';

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 25px;
`;

export const FormWrap = styled.section`
	box-sizing: border-box;
	background-color: ${WHITE};
	width: 100%;
	display: flex;
	padding: 26px 16px;
	box-shadow: 0px 0px 1px rgba(48, 49, 51, 0.05),
		0px 4px 8px rgba(48, 49, 51, 0.1);
	border-radius: 8px;
	margin-bottom: 150px;

	.files {
		color: ${GRAY_500};
		border: 4px dashed ${GRAY_500};
		border-radius: 8px;
		text-align: center;
		padding: 30px 0;
	}

	.file-list {
		color: ${GRAY_500};
		list-style: none;
		padding: 0;
		margin: 0;
	}
`;

export const FormLabel = styled.p`
	@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
	font-family: 'Rubik', sans-serif;
	color: ${GRAY_500};
	font-size: 24px;
	margin: 12px 0;
`;
