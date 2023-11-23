import { styled } from 'styled-components';
import { GRAY_500, PINK_700 } from '../../../utils/constants';

export const Loader = styled.span`
	width: 48px;
	height: 48px;
	border: 3px solid ${GRAY_500};
	border-radius: 50%;
	display: inline-block;
	position: relative;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;

	&::after {
		content: '';
		box-sizing: border-box;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 56px;
		height: 56px;
		border-radius: 50%;
		border: 3px solid;
		border-color: ${PINK_700} transparent;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
