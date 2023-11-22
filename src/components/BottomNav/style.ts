import styled from 'styled-components';
import { GRAY_500, WHITE } from '../../utils/constants';

export const NavWrapper = styled.section`
	z-index: 1056;
	box-sizing: border-box;
	display: flex;
	width: 100%;
	position: fixed;
	justify-content: center;
	bottom: 15px;
	background-color: transparent;

	.nav-wrap {
		background-color: ${WHITE};
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-radius: 12px;
		box-shadow: 0 0.4rem 1rem 0 rgba(55, 55, 55, 0.2);
		width: 70%;
		height: 70px;
		padding: 1rem;

		ion-icon {
			width: 26px;
			height: 26px;
			color: ${GRAY_500};
		}
	}
`;
