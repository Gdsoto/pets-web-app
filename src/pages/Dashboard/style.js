import styled from 'styled-components';
import { GRAY_200, GRAY_500, PINK_500, WHITE } from '../../utils/constants';

export const DashWrapper = styled.section`
	@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
	display: flex;
	flex-direction: column;
	gap: 25px;
	margin-bottom: 150px;

	font-family: 'Rubik', sans-serif;

	p {
		margin: 0;
		padding: 0;
	}

	.log-wrap {
		display: flex;
		color: ${GRAY_500};
		padding: 16px;
		justify-content: end;

		ion-icon {
			width: 26px;
			height: 26px;
			color: ${GRAY_500};
		}
	}

	.welcome {
		color: ${GRAY_500};
		padding: 16px;
		font-size: 60px;
	}

	.dash-wrap {
		padding-right: 16px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);

		.text {
			color: ${GRAY_200};
		}

		.number {
			font-size: 70px;
			color: ${GRAY_500};
		}

		.pets {
			background-color: ${WHITE};
			grid-column: 1 / 5;
			padding: 16px;
		}

		.request {
			background-color: rgba(255, 255, 255, 0.7);
			grid-column: 1 / 4;
			padding: 16px;
		}

		.adopt {
			background-color: ${PINK_500};
			grid-column: 1 / 3;
			padding: 16px;
		}
	}
`;
