import styled from 'styled-components';
import { GRAY_200 } from '../../utils/constants';

export const ListWrapper = styled.section`
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
`;
