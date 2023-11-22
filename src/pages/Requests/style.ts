import styled from 'styled-components';
import { GRAY_200, GRAY_500, WHITE } from '../../utils/constants';

export const ListWrapper = styled.section`
	@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
	font-family: 'Rubik', sans-serif;
	box-sizing: border-box;
	color: ${GRAY_500};
	margin-bottom: 90px;

	.loader-wrap {
		width: 100%;
		margin: 24px 0;
		display: flex;
		justify-content: center;
	}

	.not-found {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		color: ${GRAY_200};
		font-weight: 700;

		ion-icon {
			margin-bottom: 20px;
			width: 60px;
			height: 60px;
			color: ${GRAY_200};
		}
	}

	.detail-wrap {
		background-color: ${WHITE};
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 26px 16px;
		box-shadow: 0px 0px 1px rgba(48, 49, 51, 0.05),
			0px 4px 8px rgba(48, 49, 51, 0.1);
		border-radius: 8px;
		margin-bottom: 12px;
	}

	.text {
		font-size: 14px;
		margin-bottom: 12px;
	}

	.title {
		font-size: 16px;
		font-weight: 700;
		margin-bottom: 12px;

		ion-icon {
			width: 16px;
			height: 16px;
		}
	}
`;
